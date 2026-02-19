# Domain Events in .NET — Patterns, Handling Strategies & Packages

## What Are Domain Events?

Domain events represent **something meaningful that happened** in your domain. They are past-tense facts — `BookingRequested`, `CaregiverVerified`, `PaymentCaptured` — that other parts of the system care about. They are a core building block of Domain-Driven Design because they:

1. **Decouple aggregates** — Aggregate A doesn't need to know about Aggregate B; it just publishes an event.
2. **Capture business intent** — The event name itself documents *why* something changed.
3. **Enable eventual consistency** — Side effects (emails, notifications, projections) happen asynchronously without polluting the core transaction.
4. **Provide an audit trail** — Events are a natural log of everything that happened.

---

## Anatomy of a Domain Event

```csharp
public interface IDomainEvent
{
    DateTime OccurredOn { get; }
    Guid EventId { get; }
}

public sealed record BookingRequested(
    Guid BookingId,
    Guid CareReceiverId,
    Guid CaregiverId,
    DateTimeOffset RequestedAt
) : IDomainEvent
{
    public DateTime OccurredOn { get; } = DateTime.UtcNow;
    public Guid EventId { get; } = Guid.NewGuid();
}
```

Key characteristics:

- **Immutable** — once raised, the fact cannot change. Records or sealed classes enforce this.
- **Named in past tense** — they describe what *already happened*.
- **Carry only the data consumers need** — avoid stuffing the entire aggregate state into the event.

---

## Pattern 1: In-Process / Same-Transaction Dispatch (Mediator Pattern)

This is the most common starting point. Domain events are collected on the aggregate root and dispatched **before or after** `SaveChanges()` within the same database transaction.

### How It Works

```
Aggregate raises event → EF Core SaveChanges interceptor →
MediatR publishes event → Handlers run in same transaction → Commit
```

### Aggregate Root Collects Events

```csharp
public abstract class AggregateRoot
{
    private readonly List<IDomainEvent> _domainEvents = [];

    public IReadOnlyList<IDomainEvent> DomainEvents => _domainEvents.AsReadOnly();

    protected void RaiseDomainEvent(IDomainEvent domainEvent)
        => _domainEvents.Add(domainEvent);

    public void ClearDomainEvents()
        => _domainEvents.Clear();
}
```

### EF Core Interceptor / SaveChanges Override

```csharp
public override async Task<int> SaveChangesAsync(CancellationToken ct = default)
{
    // Collect all events from tracked aggregates
    var aggregatesWithEvents = ChangeTracker
        .Entries<AggregateRoot>()
        .Where(e => e.Entity.DomainEvents.Any())
        .Select(e => e.Entity)
        .ToList();

    var domainEvents = aggregatesWithEvents
        .SelectMany(a => a.DomainEvents)
        .ToList();

    // Clear before dispatch to avoid infinite loops
    aggregatesWithEvents.ForEach(a => a.ClearDomainEvents());

    // Save first (so IDs are generated, state is persisted)
    var result = await base.SaveChangesAsync(ct);

    // Dispatch after save
    foreach (var domainEvent in domainEvents)
    {
        await _mediator.Publish(domainEvent, ct);
    }

    return result;
}
```

### Handler

```csharp
public sealed class SendBookingNotificationHandler
    : INotificationHandler<BookingRequested>
{
    public async Task Handle(BookingRequested notification, CancellationToken ct)
    {
        // Send email, push notification, etc.
    }
}
```

### Dispatch Timing: Before vs After SaveChanges

| Timing | Pros | Cons |
|--------|------|------|
| **Before save** | Handlers can modify state in the same transaction; strong consistency | If a handler fails, the entire save fails — tight coupling |
| **After save** | Core state is already persisted; handler failure doesn't roll back business state | Handlers run outside the transaction unless you wrap everything in a `TransactionScope` |

**Jimmy Bogard's recommendation** (MediatR author): dispatch **after** save. The aggregate's state change is the primary concern; side effects are secondary.

### Packages for This Pattern

| Package | Role | Notes |
|---------|------|-------|
| **MediatR** | In-process mediator | `INotification` + `INotificationHandler<T>`. The de facto standard. |
| **Mediator (martinothamar)** | Source-generated mediator | Faster than MediatR (no reflection). Drop-in replacement API. |
| **Wolverine** | Mediator + messaging | Can dispatch in-process AND to queues. More opinionated but very powerful. |

---

## Pattern 2: Outbox Pattern (Transactional Outbox)

The in-process pattern has a critical flaw: if your app crashes *after* `SaveChanges()` but *before* handlers finish, side effects are lost. The **outbox pattern** solves this by persisting events to a database table in the same transaction as the aggregate state change, then processing them asynchronously.

### How It Works

```
Aggregate raises event → SaveChanges writes entity state + event rows
in ONE transaction → Background worker polls outbox table →
Dispatches to handlers/message broker → Marks event as processed
```

### Outbox Table

```sql
CREATE TABLE OutboxMessages (
    Id              UNIQUEIDENTIFIER PRIMARY KEY,
    Type            NVARCHAR(500)    NOT NULL,
    Content         NVARCHAR(MAX)    NOT NULL,   -- JSON-serialized event
    OccurredOnUtc   DATETIME2        NOT NULL,
    ProcessedOnUtc  DATETIME2        NULL
);
```

### EF Core Integration

```csharp
public override async Task<int> SaveChangesAsync(CancellationToken ct = default)
{
    var events = ChangeTracker
        .Entries<AggregateRoot>()
        .SelectMany(e => e.Entity.DomainEvents)
        .Select(e => new OutboxMessage
        {
            Id = e.EventId,
            Type = e.GetType().AssemblyQualifiedName!,
            Content = JsonSerializer.Serialize(e, e.GetType()),
            OccurredOnUtc = e.OccurredOn
        })
        .ToList();

    // Add outbox rows to the same transaction
    await Set<OutboxMessage>().AddRangeAsync(events, ct);

    // Clear events from aggregates
    ChangeTracker.Entries<AggregateRoot>()
        .ToList()
        .ForEach(e => e.Entity.ClearDomainEvents());

    return await base.SaveChangesAsync(ct);
}
```

### Background Processor

```csharp
public sealed class OutboxProcessor : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken ct)
    {
        while (!ct.IsCancellationRequested)
        {
            var messages = await _db.OutboxMessages
                .Where(m => m.ProcessedOnUtc == null)
                .OrderBy(m => m.OccurredOnUtc)
                .Take(20)
                .ToListAsync(ct);

            foreach (var message in messages)
            {
                var eventType = Type.GetType(message.Type)!;
                var domainEvent = (IDomainEvent)JsonSerializer
                    .Deserialize(message.Content, eventType)!;

                await _mediator.Publish(domainEvent, ct);

                message.ProcessedOnUtc = DateTime.UtcNow;
            }

            await _db.SaveChangesAsync(ct);
            await Task.Delay(TimeSpan.FromSeconds(5), ct);
        }
    }
}
```

### Packages for This Pattern

| Package | How It Helps |
|---------|-------------|
| **MassTransit** | Built-in EF Core outbox (`AddEntityFrameworkOutbox<TDbContext>()`). Handles serialization, retry, and delivery to RabbitMQ/Azure Service Bus/Amazon SQS. |
| **Wolverine** | First-class outbox support with EF Core and Marten. Outbox is deeply integrated — not bolted on. |
| **NServiceBus** | Enterprise-grade outbox. Supports SQL Server, PostgreSQL, RabbitMQ, Azure. Commercial license. |
| **CAP (DotNetCore.CAP)** | Lightweight outbox library. Supports EF Core + RabbitMQ/Kafka/Azure Service Bus. Popular in the Chinese .NET community but well-documented in English. |
| **Brighter** | Outbox + command processor. Less popular but solid, maintained by Ian Cooper. |

---

## Pattern 3: Event Sourcing

Instead of storing *current state*, you store **every domain event** as the source of truth. The current state is derived by replaying events.

### How It Works

```
Command → Aggregate loads event stream → Applies business logic →
Appends new events to stream → Projections read events → Build read models
```

### Aggregate With Event Sourcing

```csharp
public sealed class Booking : EventSourcedAggregate
{
    public BookingStatus Status { get; private set; }
    public Guid CareReceiverId { get; private set; }
    public Guid CaregiverId { get; private set; }

    // Command method
    public void Request(Guid careReceiverId, Guid caregiverId, DateTimeOffset when)
    {
        if (Status != BookingStatus.None)
            throw new InvalidOperationException("Booking already exists.");

        // Raise event — this IS the state change
        RaiseEvent(new BookingRequested(Id, careReceiverId, caregiverId, when));
    }

    // Apply method — called during replay AND after raising
    private void Apply(BookingRequested e)
    {
        Status = BookingStatus.Requested;
        CareReceiverId = e.CareReceiverId;
        CaregiverId = e.CaregiverId;
    }

    public void Accept()
    {
        if (Status != BookingStatus.Requested)
            throw new InvalidOperationException("Can only accept requested bookings.");

        RaiseEvent(new BookingAccepted(Id, DateTime.UtcNow));
    }

    private void Apply(BookingAccepted e)
    {
        Status = BookingStatus.Accepted;
    }
}
```

### When to Use Event Sourcing

**Good fit:**

- Complex business workflows with many state transitions (booking lifecycle, verification pipelines)
- Audit trail is a hard requirement (financial transactions, compliance)
- You need temporal queries ("what was the booking status at 3pm last Tuesday?")
- CQRS is already in play

**Bad fit:**

- Simple CRUD with no complex transitions
- Teams unfamiliar with the pattern (steep learning curve)
- When you need ad-hoc SQL queries against current state (projections add complexity)

### Packages for Event Sourcing

| Package | Description |
|---------|-------------|
| **Marten** | PostgreSQL-based document DB + event store. Excellent .NET integration. Uses `jsonb` columns. Maintained by Jeremy Miller. Pairs beautifully with Wolverine. |
| **EventStoreDB** (client: `EventStore.Client.Grpc`) | Purpose-built event store database. Gold standard for event sourcing. Runs as a separate service. gRPC client for .NET. |
| **Eventuous** | Lightweight event sourcing library. Works with EventStoreDB, PostgreSQL, or SQL Server. Provides aggregate base classes, subscriptions, and projections. |
| **Equinox** | F#-first but usable from C#. Supports CosmosDB, DynamoDB, EventStoreDB, SQL Server, MessageDB. |

---

## Pattern 4: Integration Events (Cross-Boundary / Cross-Service)

Domain events are **internal** to a bounded context. When you need to notify *other* bounded contexts or *other* services, you publish **integration events** through a message broker.

### Domain Event vs Integration Event

| Aspect | Domain Event | Integration Event |
|--------|-------------|-------------------|
| Scope | Within a bounded context | Across bounded contexts / services |
| Coupling | Can reference domain types | Must use primitive/shared contract types |
| Delivery | In-process or outbox | Message broker (RabbitMQ, Azure Service Bus, etc.) |
| Schema | Can change freely | Must be versioned carefully |

### Typical Flow

```
Domain Event raised → Handler converts to Integration Event →
Published to message broker via outbox → Other service(s) consume
```

```csharp
// Domain event handler that publishes an integration event
public sealed class BookingRequestedIntegrationHandler
    : INotificationHandler<BookingRequested>
{
    private readonly IPublishEndpoint _bus;

    public async Task Handle(BookingRequested notification, CancellationToken ct)
    {
        // Integration event — uses only primitive types, no domain references
        await _bus.Publish(new BookingRequestedIntegration
        {
            BookingId = notification.BookingId,
            CaregiverId = notification.CaregiverId,
            RequestedAt = notification.RequestedAt
        }, ct);
    }
}
```

### Packages for Messaging / Integration Events

| Package | Transport Support | Notes |
|---------|-------------------|-------|
| **MassTransit** | RabbitMQ, Azure Service Bus, Amazon SQS, Kafka, gRPC, in-memory | Most popular. Mature. Excellent EF Core outbox. Free & open source. |
| **Wolverine** | RabbitMQ, Azure Service Bus, Amazon SQS, Kafka | Newer, opinionated. Built by Jeremy Miller (Marten author). Deeply integrated with Marten for event-sourced systems. |
| **NServiceBus** | RabbitMQ, Azure Service Bus, Amazon SQS, SQL Server, MSMQ | Enterprise. Commercial license. Very mature. Saga support is excellent. |
| **Rebus** | RabbitMQ, Azure Service Bus, Amazon SQS, SQL Server, in-memory | Lightweight. Free. Good middle ground between MassTransit and rolling your own. |
| **Brighter** | RabbitMQ, Kafka, SNS/SQS, Redis | Command processor + message broker. Outbox included. |
| **Azure.Messaging.ServiceBus** (raw SDK) | Azure Service Bus only | No abstraction. Full control. Good if you only ever use ASB. |

---

## Pattern 5: MediatR Pipeline Behaviors for Cross-Cutting Concerns

MediatR's `IPipelineBehavior<TRequest, TResponse>` lets you wrap domain event dispatch with logging, validation, retry, or transaction management.

```csharp
public sealed class DomainEventDispatchBehavior<TRequest, TResponse>
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    private readonly AppDbContext _db;
    private readonly IMediator _mediator;

    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken ct)
    {
        var response = await next();

        // After the command handler runs, dispatch domain events
        var events = _db.ChangeTracker
            .Entries<AggregateRoot>()
            .SelectMany(e => e.Entity.DomainEvents)
            .ToList();

        foreach (var domainEvent in events)
        {
            await _mediator.Publish(domainEvent, ct);
        }

        return response;
    }
}
```

This keeps event dispatch out of your `DbContext` and makes it configurable per pipeline.

---

## Worked Example: BookingRequested — From Aggregate to Multiple Handlers

This section traces a single domain event end-to-end through the Clean Architecture layers, demonstrating how **multiple independent handlers** respond to the same event.

### The Scenario

A care receiver submits a booking request. When this happens, the system must:

1. Send an email notification to the caregiver
2. Send a push notification to the caregiver's mobile device
3. Write an audit log entry
4. Update the caregiver's dashboard read model (unread request count)

Each of these is a **separate handler**. They are independent, have different dependencies, and can succeed or fail independently of each other.

### Layer Map

```
┌─────────────────────────────────────────────────────────────────────┐
│  WebApi Layer (Presentation)                                        │
│  POST /api/bookings → RequestBookingEndpoint                        │
│  Sends MediatR command: RequestBookingCommand                       │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│  Application Layer                                                  │
│                                                                     │
│  Commands/                                                          │
│    RequestBookingCommand.cs          ← IRequest<Guid>               │
│    RequestBookingCommandHandler.cs   ← IRequestHandler              │
│                                                                     │
│  DomainEventHandlers/                                               │
│    SendCaregiverEmailHandler.cs      ← INotificationHandler         │
│    SendCaregiverPushHandler.cs       ← INotificationHandler         │
│    WriteBookingAuditLogHandler.cs    ← INotificationHandler         │
│    UpdateCaregiverDashboardHandler.cs← INotificationHandler         │
│                                                                     │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│  Domain Layer                                                       │
│                                                                     │
│  Aggregates/                                                        │
│    Booking.cs                ← AggregateRoot (raises events)        │
│                                                                     │
│  Events/                                                            │
│    BookingRequested.cs       ← IDomainEvent                         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Step 1 — Domain Layer: The Aggregate Raises the Event

The `Booking` aggregate is the **only place** the event is created. No other layer decides whether to raise it — that's domain logic.

```csharp
// Domain/Aggregates/Booking.cs
public sealed class Booking : AggregateRoot
{
    public Guid CareReceiverId { get; private set; }
    public Guid CaregiverId { get; private set; }
    public BookingStatus Status { get; private set; }
    public DateTimeOffset RequestedAt { get; private set; }
    public DateRange ScheduledPeriod { get; private set; }
    public string Notes { get; private set; } = string.Empty;

    private Booking() { } // EF Core

    public static Booking Create(
        Guid careReceiverId,
        Guid caregiverId,
        DateRange scheduledPeriod,
        string notes)
    {
        var booking = new Booking
        {
            Id = Guid.NewGuid(),
            CareReceiverId = careReceiverId,
            CaregiverId = caregiverId,
            Status = BookingStatus.PendingApproval,
            RequestedAt = DateTimeOffset.UtcNow,
            ScheduledPeriod = scheduledPeriod,
            Notes = notes
        };

        // ✅ The aggregate raises the event — this is domain logic
        booking.RaiseDomainEvent(new BookingRequested(
            BookingId: booking.Id,
            CareReceiverId: careReceiverId,
            CaregiverId: caregiverId,
            ScheduledStart: scheduledPeriod.Start,
            ScheduledEnd: scheduledPeriod.End,
            RequestedAt: booking.RequestedAt
        ));

        return booking;
    }
}
```

```csharp
// Domain/Events/BookingRequested.cs
public sealed record BookingRequested(
    Guid BookingId,
    Guid CareReceiverId,
    Guid CaregiverId,
    DateTimeOffset ScheduledStart,
    DateTimeOffset ScheduledEnd,
    DateTimeOffset RequestedAt
) : IDomainEvent
{
    public Guid EventId { get; } = Guid.NewGuid();
    public DateTime OccurredOn { get; } = DateTime.UtcNow;
}
```

Note: the event lives in the **Domain layer**. It's a domain concept. But the *handlers* live in the **Application layer** — this is the key architectural split.

### Step 2 — Application Layer: The Command Handler Triggers the Aggregate

The command handler orchestrates the use case. It does **not** publish events itself — it just calls domain methods and saves. The infrastructure (DbContext/interceptor) handles dispatch.

```csharp
// Application/Commands/RequestBookingCommand.cs
public sealed record RequestBookingCommand(
    Guid CareReceiverId,
    Guid CaregiverId,
    DateTimeOffset ScheduledStart,
    DateTimeOffset ScheduledEnd,
    string Notes
) : IRequest<Guid>;
```

```csharp
// Application/Commands/RequestBookingCommandHandler.cs
public sealed class RequestBookingCommandHandler
    : IRequestHandler<RequestBookingCommand, Guid>
{
    private readonly IBookingRepository _bookings;
    private readonly IUnitOfWork _unitOfWork;

    public RequestBookingCommandHandler(
        IBookingRepository bookings,
        IUnitOfWork unitOfWork)
    {
        _bookings = bookings;
        _unitOfWork = unitOfWork;
    }

    public async Task<Guid> Handle(
        RequestBookingCommand request,
        CancellationToken ct)
    {
        var scheduledPeriod = new DateRange(request.ScheduledStart, request.ScheduledEnd);

        // Domain method creates aggregate + raises BookingRequested event internally
        var booking = Booking.Create(
            request.CareReceiverId,
            request.CaregiverId,
            scheduledPeriod,
            request.Notes);

        _bookings.Add(booking);

        // SaveChanges persists the booking AND dispatches domain events
        await _unitOfWork.SaveChangesAsync(ct);

        return booking.Id;
    }
}
```

The command handler's job is simple: validate inputs, call the domain, save. It has **no knowledge** of what side effects happen when a booking is requested. That decoupling is the whole point.

### Step 3 — Application Layer: Multiple Handlers React to the Same Event

This is where the power of domain events shines. MediatR's `INotificationHandler<T>` allows **unlimited handlers** per event. Each handler is a separate class with its own dependencies, its own error handling, and its own single responsibility.

MediatR discovers all `INotificationHandler<BookingRequested>` implementations at startup via DI container scanning. When `_mediator.Publish(bookingRequestedEvent)` is called, it invokes **every registered handler** for that event type.

#### Handler 1: Send Email to Caregiver

```csharp
// Application/DomainEventHandlers/Booking/SendCaregiverBookingEmailHandler.cs
public sealed class SendCaregiverBookingEmailHandler
    : INotificationHandler<BookingRequested>
{
    private readonly IEmailService _emailService;
    private readonly IUserRepository _users;

    public SendCaregiverBookingEmailHandler(
        IEmailService emailService,
        IUserRepository users)
    {
        _emailService = emailService;
        _users = users;
    }

    public async Task Handle(BookingRequested notification, CancellationToken ct)
    {
        var caregiver = await _users.GetByIdAsync(notification.CaregiverId, ct);

        await _emailService.SendAsync(new BookingRequestEmail
        {
            To = caregiver.Email,
            CaregiverName = caregiver.FullName,
            ScheduledStart = notification.ScheduledStart,
            ScheduledEnd = notification.ScheduledEnd,
            BookingId = notification.BookingId
        }, ct);
    }
}
```

#### Handler 2: Send Push Notification

```csharp
// Application/DomainEventHandlers/Booking/SendCaregiverPushNotificationHandler.cs
public sealed class SendCaregiverPushNotificationHandler
    : INotificationHandler<BookingRequested>
{
    private readonly IPushNotificationService _pushService;
    private readonly IUserRepository _users;

    public SendCaregiverPushNotificationHandler(
        IPushNotificationService pushService,
        IUserRepository users)
    {
        _pushService = pushService;
        _users = users;
    }

    public async Task Handle(BookingRequested notification, CancellationToken ct)
    {
        var caregiver = await _users.GetByIdAsync(notification.CaregiverId, ct);

        if (caregiver.DeviceToken is null)
            return; // No device registered — silently skip

        await _pushService.SendAsync(new PushMessage
        {
            DeviceToken = caregiver.DeviceToken,
            Title = "New Booking Request",
            Body = $"You have a new booking request for {notification.ScheduledStart:dd MMM}",
            Data = new { bookingId = notification.BookingId }
        }, ct);
    }
}
```

#### Handler 3: Write Audit Log

```csharp
// Application/DomainEventHandlers/Booking/WriteBookingAuditLogHandler.cs
public sealed class WriteBookingAuditLogHandler
    : INotificationHandler<BookingRequested>
{
    private readonly IAuditLogRepository _auditLog;

    public WriteBookingAuditLogHandler(IAuditLogRepository auditLog)
    {
        _auditLog = auditLog;
    }

    public async Task Handle(BookingRequested notification, CancellationToken ct)
    {
        await _auditLog.WriteAsync(new AuditEntry
        {
            Action = "BookingRequested",
            EntityType = "Booking",
            EntityId = notification.BookingId,
            PerformedBy = notification.CareReceiverId,
            Timestamp = notification.OccurredOn,
            Details = $"Booking requested for caregiver {notification.CaregiverId}, " +
                      $"scheduled {notification.ScheduledStart:u} to {notification.ScheduledEnd:u}"
        }, ct);
    }
}
```

#### Handler 4: Update Dashboard Read Model

```csharp
// Application/DomainEventHandlers/Booking/UpdateCaregiverDashboardHandler.cs
public sealed class UpdateCaregiverDashboardHandler
    : INotificationHandler<BookingRequested>
{
    private readonly ICaregiverDashboardReadModel _dashboard;

    public UpdateCaregiverDashboardHandler(ICaregiverDashboardReadModel dashboard)
    {
        _dashboard = dashboard;
    }

    public async Task Handle(BookingRequested notification, CancellationToken ct)
    {
        await _dashboard.IncrementPendingRequestCountAsync(
            notification.CaregiverId, ct);
    }
}
```

### Why Handlers Belong in the Application Layer (Not Domain)

This is an important architectural question. Here's the reasoning:

| Concern | Layer | Why |
|---------|-------|-----|
| **Raising the event** | Domain | The event represents a domain fact. Only the aggregate knows when its invariants have been satisfied. |
| **Defining the event** | Domain | The event type (`BookingRequested`) is part of the ubiquitous language. |
| **Handling the event** | Application | Handlers coordinate **infrastructure** (email, push, database writes). They depend on `IEmailService`, `IPushNotificationService`, `IAuditLogRepository` — all of which are infrastructure concerns orchestrated by the application layer. |

The domain layer must have **zero dependencies** on infrastructure. If you put handlers in the domain, you'd need to inject email services and push notification clients into the domain — violating the dependency rule of Clean Architecture.

The one exception: a handler that modifies **another aggregate** in the same bounded context might *feel* like domain logic. Even then, the handler itself lives in the Application layer, but it calls domain methods on the other aggregate:

```csharp
// Application/DomainEventHandlers/Booking/UpdateCaregiverAvailabilityHandler.cs
public sealed class UpdateCaregiverAvailabilityHandler
    : INotificationHandler<BookingAccepted>
{
    private readonly ICaregiverRepository _caregivers;
    private readonly IUnitOfWork _unitOfWork;

    public async Task Handle(BookingAccepted notification, CancellationToken ct)
    {
        var caregiver = await _caregivers.GetByIdAsync(notification.CaregiverId, ct);

        // Calls a DOMAIN method — the logic is still in the domain layer
        caregiver.BlockAvailability(notification.ScheduledStart, notification.ScheduledEnd);

        await _unitOfWork.SaveChangesAsync(ct);
        // Note: this SaveChanges may itself dispatch further domain events
        // raised by caregiver.BlockAvailability() — cascading events
    }
}
```

### How MediatR Discovers and Invokes Multiple Handlers

When you register MediatR in DI:

```csharp
// Program.cs or DI registration
services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssembly(typeof(RequestBookingCommandHandler).Assembly);
});
```

MediatR scans the assembly for every class implementing `INotificationHandler<T>`. For `BookingRequested`, it finds all four handlers and registers them. When `Publish()` is called:

```csharp
// Inside your DbContext or pipeline behavior
await _mediator.Publish(bookingRequestedEvent, ct);
```

MediatR resolves all `INotificationHandler<BookingRequested>` from the DI container and calls `Handle()` on each one.

### Handler Execution Order and Error Strategy

By default, MediatR publishes notifications **sequentially** in registration order. If handler 2 throws, handlers 3 and 4 never execute. You can control this:

#### Option A: Default Sequential (Fail-Fast)

```csharp
// MediatR default — if any handler throws, the exception propagates immediately
// Remaining handlers do NOT execute
await _mediator.Publish(notification, ct);
```

Use when: all handlers are critical, and you want the whole operation to fail if any side effect fails.

#### Option B: Custom Publisher — Continue on Failure

```csharp
// Application/Infrastructure/ResilientNotificationPublisher.cs
public sealed class ResilientNotificationPublisher : INotificationPublisher
{
    private readonly ILogger<ResilientNotificationPublisher> _logger;

    public async Task Publish(
        IEnumerable<NotificationHandlerExecutor> handlerExecutors,
        INotification notification,
        CancellationToken ct)
    {
        var exceptions = new List<Exception>();

        foreach (var handler in handlerExecutors)
        {
            try
            {
                await handler.HandlerCallback(notification, ct);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Handler {Handler} failed for {Event}",
                    handler.HandlerInstance.GetType().Name,
                    notification.GetType().Name);
                exceptions.Add(ex);
            }
        }

        if (exceptions.Count > 0)
        {
            throw new AggregateException(
                "One or more notification handlers failed", exceptions);
        }
    }
}

// Registration
services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssembly(typeof(RequestBookingCommandHandler).Assembly);
    cfg.NotificationPublisher = new ResilientNotificationPublisher(logger);
    // or: cfg.NotificationPublisherType = typeof(ResilientNotificationPublisher);
});
```

Use when: you want all handlers to run even if some fail (e.g., email failing shouldn't prevent the audit log from being written).

#### Option C: Parallel Execution

```csharp
// MediatR v12+ has a built-in TaskWhenAllPublisher
services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssembly(typeof(RequestBookingCommandHandler).Assembly);
    cfg.NotificationPublisher = new TaskWhenAllPublisher();
});
```

Use when: handlers are independent and you want maximum throughput. Be cautious with DbContext (it's not thread-safe — each handler would need its own scope).

### The Full Request Lifecycle — Summary

```
1. HTTP POST /api/bookings
   └─ Controller/Endpoint sends RequestBookingCommand via MediatR

2. RequestBookingCommandHandler.Handle()
   ├─ Calls Booking.Create()                    [Domain Layer]
   │   └─ Aggregate raises BookingRequested      [Domain Layer]
   ├─ Adds booking to repository
   └─ Calls _unitOfWork.SaveChangesAsync()

3. SaveChangesAsync() override in DbContext      [Infrastructure Layer]
   ├─ Persists Booking entity to database
   ├─ Collects domain events from tracked aggregates
   ├─ Clears events from aggregates
   └─ Calls _mediator.Publish(bookingRequested)

4. MediatR dispatches to ALL registered handlers [Application Layer]
   ├─ SendCaregiverBookingEmailHandler       → sends email
   ├─ SendCaregiverPushNotificationHandler   → sends push notification
   ├─ WriteBookingAuditLogHandler            → writes audit record
   └─ UpdateCaregiverDashboardHandler        → updates read model

5. Control returns to the command handler
   └─ Returns booking.Id to the endpoint

6. HTTP 201 Created with booking ID
```

### Folder Structure in the Application Layer

```
Application/
├── Commands/
│   └── Bookings/
│       ├── RequestBookingCommand.cs
│       └── RequestBookingCommandHandler.cs
│
├── Queries/
│   └── Bookings/
│       ├── GetBookingByIdQuery.cs
│       └── GetBookingByIdQueryHandler.cs
│
├── DomainEventHandlers/
│   ├── Booking/
│   │   ├── SendCaregiverBookingEmailHandler.cs
│   │   ├── SendCaregiverPushNotificationHandler.cs
│   │   ├── WriteBookingAuditLogHandler.cs
│   │   └── UpdateCaregiverDashboardHandler.cs
│   │
│   ├── CaregiverVerified/
│   │   ├── SendVerificationConfirmationEmailHandler.cs
│   │   └── UpdateCaregiverSearchIndexHandler.cs
│   │
│   └── PaymentCaptured/
│       ├── SendPaymentReceiptEmailHandler.cs
│       ├── RecordRevenueHandler.cs
│       └── ReleaseCaregiverPayoutHandler.cs
│
└── Interfaces/
    ├── IEmailService.cs
    ├── IPushNotificationService.cs
    ├── IAuditLogRepository.cs
    └── ICaregiverDashboardReadModel.cs
```

Each domain event gets its own subfolder under `DomainEventHandlers/`. Each handler is a single class with a single responsibility. This makes it trivial to:

- **Add a new side effect** — create a new handler class. No existing code changes.
- **Remove a side effect** — delete the handler class. No existing code changes.
- **Test a side effect** — unit test the handler in isolation with mocked dependencies.
- **Find all side effects for an event** — look in the folder, or search for `INotificationHandler<BookingRequested>`.

This is the **Open/Closed Principle** in action: the system is open for extension (add handlers) but closed for modification (existing handlers and the aggregate don't change).

---

## Comparing the Patterns — Decision Matrix

| Factor | In-Process (MediatR) | Outbox | Event Sourcing | Integration Events |
|--------|---------------------|--------|----------------|-------------------|
| **Complexity** | Low | Medium | High | Medium-High |
| **Consistency** | Strong (same transaction) | Eventual (guaranteed delivery) | Strong (events ARE state) | Eventual |
| **Durability** | Events lost on crash | Events survive crashes | Events are the source of truth | Events survive crashes |
| **Scalability** | Single process | Multiple consumers | Multiple projections | Multiple services |
| **When to use** | Monolith, simple side effects | Monolith needing reliable async processing | Complex domains, audit requirements | Microservices, cross-context |

---

## Recommended Approach for iCare

Given a .NET 10 monolith with Clean Architecture and DDD:

### Phase 1 — Start Simple (Tier 1 Launch)

- **MediatR** for in-process domain event dispatch
- Domain events raised on aggregate roots, dispatched after `SaveChanges()`
- Handlers for: email notifications, read model updates, audit logging

### Phase 2 — Add Reliability

- **MassTransit + EF Core Outbox** for events that must not be lost (payment events, booking state changes)
- In-memory transport initially (no broker needed), upgrade to RabbitMQ when scaling

### Phase 3 — Consider Event Sourcing (Selective)

- **Marten** for aggregates with complex lifecycles (Booking, Verification pipeline)
- Keep simple CRUD aggregates on EF Core — not everything needs event sourcing
- **Wolverine + Marten** combination gives you in-process dispatch, outbox, and event sourcing in one stack

---

## Package Comparison Summary

| Package | License | Maturity | Best For |
|---------|---------|----------|----------|
| **MediatR** | MIT | Very mature | In-process CQRS + domain events. The default choice. |
| **Mediator** (source-gen) | MIT | Newer | Performance-sensitive apps. API-compatible with MediatR. |
| **MassTransit** | Apache 2.0 | Very mature | Outbox + messaging. Best ecosystem for message-based architectures. |
| **Wolverine** | MIT | Maturing | All-in-one: mediator + outbox + messaging. Best with Marten. |
| **NServiceBus** | Commercial | Very mature | Enterprise with budget. Best saga implementation. |
| **Marten** | MIT | Mature | PostgreSQL event sourcing + document store. |
| **EventStoreDB** | Server: BSL, Client: Apache 2.0 | Very mature | Dedicated event store. Best if event sourcing is central to architecture. |
| **CAP** | MIT | Mature | Lightweight outbox. Easy setup. |
| **Rebus** | MIT | Mature | Simple messaging without MassTransit's ceremony. |

---

## Key Takeaways

1. **Start with in-process MediatR dispatch** — it's simple, well-understood, and sufficient for most monoliths.
2. **Add an outbox when you can't afford to lose events** — MassTransit's EF Core outbox is the easiest path.
3. **Domain events stay internal; integration events cross boundaries** — never expose your domain types to other contexts.
4. **Event sourcing is powerful but not mandatory** — apply it selectively to aggregates that benefit from full history.
5. **Wolverine + Marten is the emerging "best of breed"** stack for .NET event-driven systems, but MediatR + MassTransit is the battle-tested mainstream choice.
