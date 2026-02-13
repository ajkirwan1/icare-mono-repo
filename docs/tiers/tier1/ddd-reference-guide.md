# Domain-Driven Design: Comprehensive Reference Guide

> Written in the context of the iCare elderly companionship marketplace. All examples use C# / .NET 10.

---

## Table of Contents

1. [What Is Domain-Driven Design?](#1-what-is-domain-driven-design)
2. [The Two Halves: Strategic vs Tactical](#2-the-two-halves-strategic-vs-tactical)
3. [Strategic Design](#3-strategic-design)
4. [Tactical Design](#4-tactical-design)
5. [Aggregates In Depth](#5-aggregates-in-depth)
6. [Domain Events](#6-domain-events)
7. [Repositories](#7-repositories)
8. [Domain Services vs Application Services](#8-domain-services-vs-application-services)
9. [Architecture Patterns That Support DDD](#9-architecture-patterns-that-support-ddd)
10. [DDD and Persistence (EF Core)](#10-ddd-and-persistence-ef-core)
11. [DDD and CQRS](#11-ddd-and-cqrs)
12. [Anti-Patterns and Common Mistakes](#12-anti-patterns-and-common-mistakes)
13. [When Not To Use DDD](#13-when-not-to-use-ddd)
14. [Glossary](#14-glossary)

---

## 1. What Is Domain-Driven Design?

Domain-Driven Design is a software development philosophy introduced by Eric Evans in his 2003 book *Domain-Driven Design: Tackling Complexity in the Heart of Software*. It was later expanded by Vaughn Vernon in *Implementing Domain-Driven Design* (2013).

The central thesis is simple:

> **The most significant complexity in most software projects is not technical — it is in the domain itself.** Therefore, the primary focus of the design should be on the domain and domain logic, and complex domain designs should be based on a model.

DDD is NOT:
- A framework or library
- A specific architecture (though certain architectures support it better)
- A set of patterns to apply mechanically
- Something you need for every project

DDD IS:
- A way of thinking about software design
- A collection of principles, patterns, and practices
- A collaboration approach between developers and domain experts
- A strategy for managing complexity in large, behaviour-rich domains

### The Three Pillars

1. **Focus on the core domain** — Invest your best talent and effort on the parts of the system that are most valuable to the business. Not everything deserves DDD treatment.

2. **Model-driven design** — The code IS the model. There is no separate "design document" that drifts from the code. The domain model in code should directly reflect the team's understanding of the domain.

3. **Ubiquitous language** — Developers and domain experts share a common language. If a domain expert says "booking", the code has a `Booking` class. If the code has a `ServiceRequest`, but the business calls it a "booking", one of them is wrong.

---

## 2. The Two Halves: Strategic vs Tactical

DDD has two complementary halves that operate at different scales:

```
STRATEGIC DESIGN (the big picture)
├── Bounded Contexts
├── Context Mapping
├── Ubiquitous Language
├── Core / Supporting / Generic subdomains
└── Distillation (what matters most?)

TACTICAL DESIGN (the implementation)
├── Entities
├── Value Objects
├── Aggregates & Aggregate Roots
├── Domain Events
├── Repositories
├── Domain Services
├── Application Services
├── Factories
└── Specifications
```

A common mistake is to jump straight to tactical patterns (entities, value objects, aggregates) without doing the strategic work first. Strategic design tells you WHERE the boundaries are. Tactical design tells you HOW to implement within those boundaries.

**You can benefit from strategic design alone.** Many teams successfully use bounded contexts and ubiquitous language without going deep into tactical patterns. The reverse — using tactical patterns without strategic design — often fails, because you end up with a "Big Ball of Mud" dressed up with DDD class names.

---

## 3. Strategic Design

### 3.1 Ubiquitous Language

The ubiquitous language is the single most important concept in DDD. It is a shared vocabulary between developers and domain experts that is:

- **Used in conversations** — When discussing features, bugs, or requirements
- **Used in the code** — Class names, method names, property names, namespaces
- **Used in documentation** — Specs, stories, acceptance criteria
- **Bounded to a context** — The same word can mean different things in different contexts

Example from iCare:

| Term | Meaning in Booking Context | Meaning in Payment Context |
|------|---------------------------|---------------------------|
| "Booking" | A scheduled companionship session with a lifecycle (requested → confirmed → completed) | A billable event that triggers a charge and a payout |
| "Cancellation" | A state transition with policies (24-hour rule, reason required) | A refund calculation with different rules depending on timing |
| "Rate" | The caregiver's hourly price used to calculate booking cost | A financial value subject to commission splits and VAT |

If you find yourself constantly translating between what the business says and what the code says, your ubiquitous language is broken.

**Building the language:**
- Hold "Event Storming" workshops with domain experts
- Write a domain glossary (and keep it alive, not as a one-time document)
- Reject code that uses developer jargon where domain terms exist
- Challenge domain experts when their language is ambiguous

Bad:
```csharp
// Developer jargon — what is a "handler"? What does "process" mean?
public class BookingProcessHandler
{
    public void Process(BookingDTO dto) { ... }
}
```

Good:
```csharp
// Domain language — a care receiver requests a booking
public class Booking
{
    public static Booking Request(
        CareReceiverId requestedBy,
        CaregiverId caregiverId,
        BookingPeriod period,
        CompanionshipType serviceType) { ... }
}
```

### 3.2 Bounded Contexts

A bounded context is a linguistic and model boundary. Within a bounded context:
- Every term has exactly one meaning
- The model is internally consistent
- The code is cohesive

**Why not one big model?**

In a naive design, you might try to create a single `User` class that serves the entire system. But:

| Context | What "User" means |
|---------|-------------------|
| Identity & Access | Authentication credentials, roles, account status |
| Booking | A participant in a booking (care receiver or caregiver), identified by ID |
| Payments | A Stripe customer or connected account, identified by Stripe IDs |
| Messaging | A conversation participant with an online/offline status |
| Admin | A record to moderate, with flags, incidents, and audit history |

If you try to put all of this into one `User` class, you get a God Object with 50+ properties, tangled dependencies, and every change risks breaking unrelated features. Bounded contexts solve this by letting each context have its own model of a "user" — tailored to that context's needs.

```
Identity Context          Booking Context          Payment Context
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│ User         │         │ Participant  │         │ PaymentActor │
│ - Email      │         │ - Id         │         │ - Id         │
│ - Password   │         │ - Name       │         │ - StripeId   │
│ - Phone      │         │ - Role       │         │ - AccountType│
│ - Status     │         │              │         │              │
│ - Roles      │         │              │         │              │
└──────────────┘         └──────────���───┘         └──────────────┘
```

Each context only knows what it needs. The Booking context doesn't know or care about password hashes. The Payment context doesn't know about phone numbers.

### 3.3 Context Mapping

Bounded contexts don't exist in isolation — they interact. A context map describes these relationships. The key relationship patterns are:

**Partnership** — Two contexts evolve together, with coordinated planning. Changes in one context are planned with the other.
```
Booking ←→ Payments (partnership)
When booking states change, payment states must follow. Both teams coordinate.
```

**Customer-Supplier** — One context (upstream/supplier) provides data or services to another (downstream/customer). The supplier considers the customer's needs but makes final decisions.
```
Identity (supplier) → Booking (customer)
Identity publishes UserRegistered events. Booking consumes them to create participants.
```

**Conformist** — The downstream context conforms to the upstream context's model with no negotiation. Common with external systems.
```
Stripe API (upstream) → Payments (conformist)
We adapt to Stripe's model, not the other way around.
```

**Anti-Corruption Layer (ACL)** — The downstream context translates the upstream model into its own language. Prevents external models from leaking in.
```
Stripe API → [ACL: StripePaymentAdapter] → Payments Context
We never expose Stripe DTOs to our domain. The ACL translates.
```

**Shared Kernel** — Two contexts share a small, explicitly defined subset of the model. Dangerous — changes affect both contexts.
```
Identity ←kernel→ all contexts: UserId, CaregiverProfileId, CareReceiverProfileId
Only strongly-typed IDs are shared. Nothing else.
```

**Published Language** — A context publishes a well-documented language (events, DTOs) for others to consume. The publisher commits to backwards compatibility.
```
Booking publishes: BookingRequestedEvent, BookingConfirmedEvent, BookingCompletedEvent
Other contexts subscribe without coupling to Booking internals.
```

### 3.4 Subdomains: Core, Supporting, and Generic

Not all parts of your domain are equally important. DDD classifies subdomains into three types:

| Type | Definition | iCare Example | Investment Level |
|------|-----------|---------------|-----------------|
| **Core Domain** | The thing that makes your business unique. This is where competitive advantage lives. | Booking lifecycle, caregiver matching, trust/verification system | Highest. Best developers, DDD tactical patterns, rich domain model. |
| **Supporting Subdomain** | Necessary for the business but not differentiating. Custom-built because off-the-shelf doesn't fit. | Messaging, reviews, admin moderation tools | Medium. Simpler models acceptable. |
| **Generic Subdomain** | Solved problems. Buy or use an existing solution. | Authentication (ASP.NET Identity), payments (Stripe), email (SendGrid) | Lowest. Use existing solutions. Don't reinvent. |

This classification directly impacts how much DDD rigour you apply:

- **Core domain**: Full tactical DDD — aggregates, domain events, rich behaviour, exhaustive tests
- **Supporting**: Lighter DDD — maybe just entities and value objects, simpler structure
- **Generic**: No DDD — use the library/service's own model, wrap with an anti-corruption layer

**For iCare Tier 1**, the core domain is the **Booking** and **Verification** contexts. This is where the business logic is richest (14 booking states, cancellation policies, verification levels, safeguarding rules). The Identity context is largely generic (ASP.NET Identity handles most of it). Payments is a thin layer over Stripe.

---

## 4. Tactical Design

Tactical patterns are the building blocks you use inside a bounded context.

### 4.1 Entities

An entity is an object defined by its **identity**, not its attributes. Two entities with the same attributes but different IDs are different objects. Entities have a lifecycle — they are created, modified over time, and eventually archived or deleted.

```csharp
public class Booking : Entity<BookingId>  // identity matters
{
    public BookingId Id { get; private set; }
    public BookingStatus Status { get; private set; }
    public CareReceiverId CareReceiverId { get; private set; }
    public CaregiverId CaregiverId { get; private set; }
    public BookingPeriod Period { get; private set; }
    // ...
}
```

Key properties of entities:
- **Identity**: Has a unique identifier that persists across state changes
- **Mutability**: State changes over time (a booking goes from Requested → Confirmed → Completed)
- **Lifecycle**: Created, modified, possibly deleted
- **Equality**: Two entities are equal if their IDs match, regardless of attribute values

### 4.2 Value Objects

A value object is defined by its **attributes**, not identity. Two value objects with the same attributes are interchangeable. Value objects are immutable — to "change" one, you create a new one.

```csharp
public record Address(
    string Line1,
    string Line2,
    string City,
    string County,
    string PostCode,
    double Latitude,
    double Longitude)
{
    // Validation in constructor
    public Address
    {
        if (string.IsNullOrWhiteSpace(PostCode))
            throw new DomainException("Post code is required.");
        if (!UkPostCodeValidator.IsValid(PostCode))
            throw new DomainException($"Invalid UK post code: {PostCode}");
    }
}

public record HourlyRate(decimal Amount, string Currency = "GBP")
{
    public HourlyRate
    {
        if (Amount < 10m || Amount > 100m)
            throw new DomainException("Hourly rate must be between £10 and £100.");
        if (Currency != "GBP")
            throw new DomainException("Only GBP is supported.");
    }

    public Money CalculateTotal(TimeSpan duration)
        => new Money(Amount * (decimal)duration.TotalHours, Currency);
}

public record BookingPeriod(DateTime Start, DateTime End)
{
    public BookingPeriod
    {
        if (End <= Start)
            throw new DomainException("End must be after start.");
        if ((End - Start).TotalHours < 1)
            throw new DomainException("Minimum booking is 1 hour.");
        if ((End - Start).TotalHours > 12)
            throw new DomainException("Maximum booking is 12 hours.");
        if (Start < DateTime.UtcNow.AddHours(24))
            throw new DomainException("Bookings must be at least 24 hours in advance.");
    }

    public TimeSpan Duration => End - Start;
}
```

Key properties of value objects:
- **No identity**: No ID field. Defined entirely by attributes.
- **Immutable**: Once created, never modified. Use `with` expressions to create variants.
- **Self-validating**: Invalid states are unrepresentable. You can never have an `HourlyRate` of -£5.
- **Equality**: Two value objects are equal if all their attributes match.
- **Side-effect free**: Methods return new values, never modify state.

**Use C# `record` types for value objects.** Records give you immutability, value equality, and `with` expressions for free.

**When to use a value object vs an entity:**

Ask: "Do I need to track this thing over time by identity, or do I only care about its attributes?"

| Thing | Entity or Value Object? | Why? |
|-------|------------------------|------|
| Booking | Entity | Has a lifecycle, tracked by ID across state changes |
| Address | Value Object | "123 High Street" is "123 High Street" — no identity needed |
| Hourly Rate | Value Object | £15/hr is £15/hr. If a caregiver changes rate, you create a new value. |
| Phone Number | Value Object | A phone number is just a string with validation |
| Caregiver Profile | Entity | Has a lifecycle, tracked by ID, changes over time |
| Emergency Contact | Value Object | Just a name + phone number. No independent lifecycle. |
| Safeguarding Incident | Entity | Tracked by ID, has its own lifecycle (reported → investigated → resolved) |

**Favour value objects.** A well-designed domain model is typically 60-70% value objects and 30-40% entities. Value objects are simpler, testable, and immutable, so they reduce bugs.

### 4.3 Strongly-Typed IDs

Instead of using `Guid` or `int` everywhere (which lets you accidentally pass a `BookingId` where a `UserId` is expected), use strongly-typed IDs:

```csharp
public readonly record struct UserId(Guid Value)
{
    public static UserId New() => new(Guid.NewGuid());
    public static UserId From(Guid value) => new(value);
    public override string ToString() => Value.ToString();
}

public readonly record struct BookingId(Guid Value)
{
    public static BookingId New() => new(Guid.NewGuid());
}

public readonly record struct CaregiverId(Guid Value)
{
    public static CaregiverId New() => new(Guid.NewGuid());
}
```

Now the compiler prevents this mistake:
```csharp
// Compile error — type safety prevents passing wrong ID
bookingRepository.GetById(userId);  // Cannot convert UserId to BookingId
```

### 4.4 Enumerations as Classes (Smart Enums)

Instead of C# `enum` (which is just an integer), use enumeration classes when behaviour is attached:

```csharp
public class BookingStatus : Enumeration
{
    public static readonly BookingStatus Requested = new(1, "Requested");
    public static readonly BookingStatus Confirmed = new(2, "Confirmed");
    public static readonly BookingStatus InProgress = new(3, "InProgress");
    public static readonly BookingStatus Completed = new(4, "Completed");
    public static readonly BookingStatus CancelledByReceiver = new(5, "CancelledByReceiver");
    public static readonly BookingStatus CancelledByCaregiver = new(6, "CancelledByCaregiver");
    public static readonly BookingStatus Disputed = new(7, "Disputed");

    private BookingStatus(int id, string name) : base(id, name) { }

    // Behaviour: which transitions are legal?
    public bool CanTransitionTo(BookingStatus target) => (this, target) switch
    {
        (_, _) when this == Requested && target == Confirmed => true,
        (_, _) when this == Requested && target == CancelledByReceiver => true,
        (_, _) when this == Requested && target == CancelledByCaregiver => true,
        (_, _) when this == Confirmed && target == InProgress => true,
        (_, _) when this == Confirmed && target == CancelledByReceiver => true,
        (_, _) when this == Confirmed && target == CancelledByCaregiver => true,
        (_, _) when this == InProgress && target == Completed => true,
        (_, _) when this == InProgress && target == Disputed => true,
        (_, _) when this == Completed && target == Disputed => true,
        _ => false
    };
}
```

---

## 5. Aggregates In Depth

The aggregate is arguably the most important and most misunderstood tactical pattern.

### 5.1 What Is an Aggregate?

An aggregate is a cluster of entities and value objects that are treated as a single unit for data changes. The aggregate has:

- **One root entity** (the aggregate root) — the only entry point from outside
- **A consistency boundary** — all invariants within the aggregate are guaranteed after every operation
- **A transactional boundary** — one aggregate = one database transaction

```
┌─────────────────────────────────────────┐
│ Booking Aggregate                       │
│                                         │
│  ┌──────────────────────────────────┐   │
│  │ Booking (Aggregate Root)         │   │
│  │ - Id: BookingId                  │   │
│  │ - Status: BookingStatus          │   │
│  │ - CareReceiverId                 │   │
│  │ - CaregiverId                    │   │
│  │ - Period: BookingPeriod (VO)     │   │
│  │ - Pricing: BookingPricing (VO)   │   │
│  │ - CancellationDetails (VO|null)  │   │
│  └──────────────────────────────────┘   │
│                                         │
│  Internal entities/VOs:                 │
│  - BookingPricing (hourly rate,         │
│    total, commission, VAT)              │
│  - CancellationDetails (reason,         │
│    cancelledBy, refundAmount, policy)   │
│  - BookingPeriod (start, end)           │
│                                         │
│  Invariants enforced:                   │
│  - Status transitions follow state      │
│    machine                              │
│  - Period minimum 1hr, maximum 12hr     │
│  - Cancellation reason required         │
│  - Only confirmed bookings can start    │
└─────────────────────────────────────────┘
```

### 5.2 Rules for Designing Aggregates

**Rule 1: Protect business invariants inside aggregate boundaries.**

An invariant is a business rule that must always be true. The aggregate is responsible for enforcing its own invariants.

```csharp
public class Booking : AggregateRoot<BookingId>
{
    public void Cancel(UserId cancelledBy, string reason)
    {
        // Invariant: Can only cancel if in a cancellable state
        if (Status != BookingStatus.Requested && Status != BookingStatus.Confirmed)
            throw new DomainException($"Cannot cancel a booking in {Status} state.");

        // Invariant: Reason is required
        if (string.IsNullOrWhiteSpace(reason))
            throw new DomainException("Cancellation reason is required.");

        // Invariant: Calculate refund based on cancellation timing policy
        var refund = CancellationPolicy.Calculate(this, DateTime.UtcNow);

        CancellationDetails = new CancellationDetails(
            cancelledBy, reason, DateTime.UtcNow, refund);

        Status = cancelledBy == CareReceiverId
            ? BookingStatus.CancelledByReceiver
            : BookingStatus.CancelledByCaregiver;

        AddDomainEvent(new BookingCancelledEvent(
            Id, cancelledBy, reason, refund));
    }
}
```

**Rule 2: Design small aggregates.**

A common mistake is making aggregates too large. The canonical guidance from Vaughn Vernon:

> "Design small aggregates. Ideally, an aggregate has only one entity — the root — plus value objects."

Why small?
- **Performance**: Loading a giant aggregate is slow
- **Concurrency**: Large aggregates = more conflicts when multiple users modify them
- **Complexity**: Harder to understand and test

Bad (too large):
```csharp
// DON'T: Caregiver aggregate that owns everything
public class Caregiver : AggregateRoot
{
    public List<Booking> Bookings { get; }       // Could be thousands
    public List<Review> Reviews { get; }          // Could be hundreds
    public List<Message> Messages { get; }        // Could be thousands
    public List<PaymentRecord> Payments { get; }  // Could be hundreds
    public VerificationRecord Verification { get; }
}
```

Good (small, focused):
```csharp
// DO: Caregiver profile aggregate owns only profile-related data
public class CaregiverProfile : AggregateRoot
{
    public PersonalName Name { get; }
    public string Bio { get; }
    public HourlyRate Rate { get; }
    public Address ServiceArea { get; }
    public int ServiceRadiusMiles { get; }
    public VerificationLevel VerificationLevel { get; }
    public IReadOnlyCollection<AvailabilitySlot> Availability { get; }
    public IReadOnlyCollection<ServiceOffering> Services { get; }
    // Bookings, reviews, messages, payments are SEPARATE aggregates
    // referenced by CaregiverId, not owned by this aggregate
}
```

**Rule 3: Reference other aggregates by identity only.**

Aggregates should never hold direct object references to other aggregates. Use IDs.

```csharp
// BAD: Direct reference creates coupling and loading issues
public class Booking
{
    public CaregiverProfile Caregiver { get; set; }  // Full object loaded
    public CareReceiverProfile CareReceiver { get; set; }
}

// GOOD: Reference by ID
public class Booking
{
    public CaregiverId CaregiverId { get; private set; }        // Just the ID
    public CareReceiverId CareReceiverId { get; private set; }  // Just the ID
}
```

Why? Because if `Booking` holds a reference to `CaregiverProfile`, then:
- Loading a booking loads the entire caregiver profile (and its availability, services, etc.)
- You might accidentally modify the caregiver through the booking, bypassing invariants
- It creates a transactional coupling — does saving a booking also save caregiver changes?

**Rule 4: Use eventual consistency across aggregates.**

If a business rule spans two aggregates, use domain events and eventual consistency rather than trying to modify both in one transaction.

```csharp
// When a booking is completed, the caregiver's stats should update.
// DON'T do this in one transaction:
public void CompleteBooking()
{
    Status = BookingStatus.Completed;
    caregiver.IncrementCompletedBookings();  // BAD: cross-aggregate modification
}

// DO this with domain events:
public void Complete()
{
    Status = BookingStatus.Completed;
    AddDomainEvent(new BookingCompletedEvent(Id, CaregiverId, Period));
    // An event handler will update caregiver stats in a separate transaction
}
```

### 5.3 How Many Aggregates Per Bounded Context?

There is no "one aggregate per context" rule. A bounded context contains as many aggregates as the domain requires. The number depends on how many independent consistency boundaries exist.

| Bounded Context | Aggregates | Rationale |
|----------------|-----------|-----------|
| Identity & Access | User, CareReceiverProfile, CaregiverProfile | Three independent lifecycles, different invariants |
| Booking | Booking, CancellationPolicy | Bookings change independently; policies are referenced, not embedded |
| Payments | Payment, PayoutBatch | Individual payments vs batch payout processing |
| Verification | VerificationCase | Each verification is independent |
| Messaging | Conversation, Message | Conversations have metadata; messages are the content (could be modelled as one aggregate with Message as entity inside Conversation) |
| Reviews | Review | Each review is independent |
| Safeguarding | SafeguardingIncident | Each incident is independent |
| Admin | PlatformSettings, AuditLogEntry | Settings are a singleton; audit entries are independent |

---

## 6. Domain Events

A domain event represents something meaningful that happened in the domain. It is named in past tense using the ubiquitous language.

### 6.1 Why Domain Events?

Without domain events, you get this:
```csharp
// BAD: BookingService knows about payments, messaging, notifications, analytics...
public class BookingService
{
    public void ConfirmBooking(BookingId id)
    {
        var booking = _bookingRepo.GetById(id);
        booking.Confirm();
        _bookingRepo.Save(booking);

        _paymentService.CreateHold(booking);           // coupling
        _messagingService.SendConfirmation(booking);   // coupling
        _notificationService.NotifyReceiver(booking);  // coupling
        _analyticsService.TrackConfirmation(booking);  // coupling
    }
}
```

This violates the Single Responsibility Principle and creates a web of dependencies. With domain events:

```csharp
// GOOD: Booking aggregate raises event, handlers react independently
public class Booking : AggregateRoot
{
    public void Confirm(CaregiverId confirmedBy)
    {
        if (Status != BookingStatus.Requested)
            throw new DomainException("Only requested bookings can be confirmed.");
        if (confirmedBy != CaregiverId)
            throw new DomainException("Only the assigned caregiver can confirm.");

        Status = BookingStatus.Confirmed;
        ConfirmedAt = DateTime.UtcNow;
        AddDomainEvent(new BookingConfirmedEvent(Id, CareReceiverId, CaregiverId, Period));
    }
}

// Separate handlers — each does one thing
public class CreatePaymentHoldHandler : INotificationHandler<BookingConfirmedEvent> { ... }
public class SendConfirmationMessageHandler : INotificationHandler<BookingConfirmedEvent> { ... }
public class NotifyCareReceiverHandler : INotificationHandler<BookingConfirmedEvent> { ... }
```

### 6.2 Event Structure

```csharp
public abstract record DomainEvent
{
    public Guid EventId { get; } = Guid.NewGuid();
    public DateTime OccurredAt { get; } = DateTime.UtcNow;
}

public record BookingConfirmedEvent(
    BookingId BookingId,
    CareReceiverId CareReceiverId,
    CaregiverId CaregiverId,
    BookingPeriod Period) : DomainEvent;

public record BookingCancelledEvent(
    BookingId BookingId,
    UserId CancelledBy,
    string Reason,
    RefundCalculation Refund) : DomainEvent;

public record CaregiverVerificationCompletedEvent(
    CaregiverId CaregiverId,
    VerificationLevel NewLevel,
    VerificationType Type) : DomainEvent;
```

### 6.3 In-Process vs Out-of-Process Events

| Approach | Mechanism | When to Use |
|----------|-----------|-------------|
| In-process (MediatR) | `INotificationHandler<T>` | Same bounded context, same process. Fast, simple, transactional. |
| Out-of-process (message broker) | RabbitMQ, Azure Service Bus | Cross-service, cross-process. Needed for microservices, not for Tier 1 monolith. |

**For iCare Tier 1**: Use MediatR for all domain events. The system is a modular monolith — all bounded contexts run in one process. If you later split into microservices, replace MediatR notifications with a message broker at the context boundary.

---

## 7. Repositories

A repository provides the illusion of an in-memory collection of aggregates. It abstracts away the database.

### 7.1 Key Principles

- **One repository per aggregate root** — never per entity, never per table
- **Defined in the domain layer** — as an interface
- **Implemented in the infrastructure layer** — using EF Core
- **Works with whole aggregates** — you load the entire aggregate, modify it, save it back

```csharp
// Domain layer — interface
public interface IBookingRepository
{
    Task<Booking?> GetByIdAsync(BookingId id, CancellationToken ct);
    Task AddAsync(Booking booking, CancellationToken ct);
    Task SaveChangesAsync(CancellationToken ct);
}

// Infrastructure layer — implementation
public class BookingRepository : IBookingRepository
{
    private readonly AppDbContext _db;

    public BookingRepository(AppDbContext db) => _db = db;

    public async Task<Booking?> GetByIdAsync(BookingId id, CancellationToken ct)
        => await _db.Bookings
            .Include(b => b.CancellationDetails)
            .FirstOrDefaultAsync(b => b.Id == id, ct);

    public async Task AddAsync(Booking booking, CancellationToken ct)
        => await _db.Bookings.AddAsync(booking, ct);

    public async Task SaveChangesAsync(CancellationToken ct)
        => await _db.SaveChangesAsync(ct);
}
```

### 7.2 What Repositories Are NOT

Repositories are not:
- Generic `IRepository<T>` with CRUD methods (this is an anti-pattern that leaks persistence concerns)
- Query services (use read models or query objects for complex queries)
- A place to put business logic

```csharp
// BAD: Generic repository — too abstract, doesn't express domain intent
public interface IRepository<T>
{
    Task<T> GetByIdAsync(Guid id);
    Task<IEnumerable<T>> GetAllAsync();
    Task AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(Guid id);
}

// GOOD: Domain-specific repository — expresses intent
public interface IBookingRepository
{
    Task<Booking?> GetByIdAsync(BookingId id, CancellationToken ct);
    Task<IReadOnlyList<Booking>> GetUpcomingForCaregiverAsync(
        CaregiverId id, CancellationToken ct);
    Task AddAsync(Booking booking, CancellationToken ct);
    Task SaveChangesAsync(CancellationToken ct);
    // No Update — EF Core tracks changes. No Delete — bookings are never deleted.
}
```

---

## 8. Domain Services vs Application Services

This is a frequent source of confusion. The distinction matters.

### 8.1 Domain Services

A domain service contains **domain logic that doesn't naturally belong to a single aggregate**. It operates on domain objects and enforces business rules.

```csharp
// Domain service: booking overlap check spans multiple bookings
public class BookingOverlapChecker : IBookingOverlapChecker
{
    private readonly IBookingRepository _bookings;

    public async Task<bool> HasOverlapAsync(
        CaregiverId caregiverId, BookingPeriod period, CancellationToken ct)
    {
        var existingBookings = await _bookings
            .GetActiveForCaregiverInPeriodAsync(caregiverId, period, ct);

        return existingBookings.Any(b => b.Period.OverlapsWith(period));
    }
}

// Domain service: cancellation refund calculation
public class CancellationPolicy
{
    public static RefundCalculation Calculate(Booking booking, DateTime cancelledAt)
    {
        var hoursUntilStart = (booking.Period.Start - cancelledAt).TotalHours;

        return hoursUntilStart switch
        {
            >= 48 => RefundCalculation.Full(booking.Pricing.Total),
            >= 24 => RefundCalculation.Partial(booking.Pricing.Total, 0.5m),
            _ => RefundCalculation.None()
        };
    }
}
```

Domain services:
- Contain **business logic** (rules, calculations, validations)
- Depend on **domain interfaces** (repositories, other domain services)
- Are **stateless**
- Live in the **domain layer**

### 8.2 Application Services

An application service orchestrates a use case. It coordinates domain objects, infrastructure services, and cross-cutting concerns (transactions, authorization, logging). It contains **no business logic**.

```csharp
// Application service: orchestrates the "request a booking" use case
public class RequestBookingHandler
    : IRequestHandler<RequestBookingCommand, BookingId>
{
    private readonly IBookingRepository _bookings;
    private readonly IBookingOverlapChecker _overlapChecker;
    private readonly ICaregiverProfileRepository _caregivers;

    public async Task<BookingId> Handle(
        RequestBookingCommand cmd, CancellationToken ct)
    {
        // 1. Load data
        var caregiver = await _caregivers.GetByIdAsync(cmd.CaregiverId, ct)
            ?? throw new NotFoundException("Caregiver not found.");

        // 2. Check preconditions (using domain service)
        if (await _overlapChecker.HasOverlapAsync(
            cmd.CaregiverId, cmd.Period, ct))
            throw new DomainException("Caregiver has a conflicting booking.");

        // 3. Execute domain logic (on the aggregate)
        var booking = Booking.Request(
            cmd.CareReceiverId,
            cmd.CaregiverId,
            cmd.Period,
            cmd.ServiceType,
            caregiver.Rate);

        // 4. Persist
        await _bookings.AddAsync(booking, ct);
        await _bookings.SaveChangesAsync(ct);

        // 5. Domain events are dispatched by infrastructure (SaveChanges interceptor)
        return booking.Id;
    }
}
```

Application services:
- **Orchestrate** use cases (load, validate, delegate to domain, persist)
- Contain **no business logic** — they delegate everything to domain objects
- Handle **cross-cutting concerns** (authorization, transactions, logging)
- Are typically **one class per use case** (or per command/query with MediatR)
- Live in the **application layer**

### 8.3 The Litmus Test

> "If I moved this logic to a different application (e.g., a CLI tool instead of a web API), would the rule still apply?"

- **Yes** → It's domain logic. Put it in a domain service or aggregate.
- **No** → It's application logic. Put it in an application service.

"A booking cannot overlap with another booking" — true regardless of whether the request comes from a web form, an API call, or an admin script. **Domain logic.**

"Log the request and return an HTTP 201 response" — specific to the web API application. **Application logic.**

---

## 9. Architecture Patterns That Support DDD

### 9.1 Clean Architecture (Onion Architecture)

This is the recommended pattern for iCare. Dependencies point inward — the domain layer depends on nothing.

```
┌──────────────────────────────────────────────────────┐
│                    WebApi Layer                       │
│  (Controllers, SignalR Hubs, Middleware, DTOs)        │
│                                                      │
│  ┌──────────────────────────────────────────────┐    │
│  │              Application Layer                │    │
│  │  (Commands, Queries, Handlers, Validators,    │    │
│  │   Event Handlers, Interfaces for Infra)       │    │
│  │                                               │    │
│  │  ┌──────────────────────────────────────┐     │    │
│  │  │           Domain Layer               │     │    │
│  │  │  (Entities, Value Objects,           │     │    │
│  │  │   Aggregates, Domain Events,         │     │    │
│  │  │   Domain Services, Repository        │     │    │
│  │  │   Interfaces, Specifications)        │     │    │
│  │  │                                      │     │    │
│  │  │  *** DEPENDS ON NOTHING ***          │     │    │
│  │  └──────────────────────────────────────┘     │    │
│  └──────────────────────────────────────────────┘    │
│                                                      │
│  ┌──────────────────────────────────────────────┐    │
│  │           Infrastructure Layer                │    │
│  │  (EF Core DbContext, Repository Impls,        │    │
│  │   Stripe Client, SendGrid, SignalR,           │    │
│  │   Background Jobs, External APIs)             │    │
│  └──────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────┘
```

**Dependency rule**: Each layer may only depend on layers inside it. The domain layer is at the centre and depends on nothing. The infrastructure layer implements interfaces defined in the domain or application layer.

### 9.2 Project Structure for .NET

```
ICare.sln
│
├── src/
│   ├── ICare.Domain/                    # Domain layer
│   │   ├── Common/
│   │   │   ├── AggregateRoot.cs
│   │   │   ├── Entity.cs
│   │   │   ├── ValueObject.cs
│   │   │   ├── DomainEvent.cs
│   │   │   └── DomainException.cs
│   │   ├── Identity/                    # Identity bounded context
│   │   │   ├── User.cs
│   │   │   ├── CareReceiverProfile.cs
│   │   │   ├── CaregiverProfile.cs
│   │   │   ├── ValueObjects/
│   │   │   ├── Events/
│   │   │   └── IUserRepository.cs       # Interface only
│   │   ├── Bookings/                    # Booking bounded context
│   │   │   ├── Booking.cs
│   │   │   ├── BookingStatus.cs
│   │   │   ├── ValueObjects/
│   │   │   ├── Events/
│   │   │   ├── Services/
│   │   │   │   └── BookingOverlapChecker.cs
│   │   │   └── IBookingRepository.cs
│   │   ├── Payments/
│   │   ├── Messaging/
│   │   ├── Reviews/
│   │   ├── Verification/
│   │   ├── Safeguarding/
│   │   └── Admin/
│   │
│   ├── ICare.Application/              # Application layer
│   │   ├── Common/
│   │   │   ├── Behaviours/             # MediatR pipeline (validation, logging)
│   │   │   └── Interfaces/             # IEmailSender, ISmsService, etc.
│   │   ├── Bookings/
│   │   │   ├── Commands/
│   │   │   │   ├── RequestBooking/
│   │   │   │   │   ├── RequestBookingCommand.cs
│   │   │   │   │   ├── RequestBookingHandler.cs
│   │   │   │   │   └── RequestBookingValidator.cs
│   │   │   │   ├── ConfirmBooking/
│   │   │   │   └── CancelBooking/
│   │   │   ├── Queries/
│   │   │   │   ├── GetBookingById/
│   │   │   │   └── GetUpcomingBookings/
│   │   │   └── EventHandlers/
│   │   │       └── BookingConfirmedEventHandler.cs
│   │   ├── Identity/
│   │   ├── Payments/
│   │   └── ...
│   │
│   ├── ICare.Infrastructure/           # Infrastructure layer
│   │   ├── Persistence/
│   │   │   ├── AppDbContext.cs
│   │   │   ├── Configurations/         # EF Core entity configurations
│   │   │   ├── Repositories/           # Repository implementations
│   │   │   └── Migrations/
│   │   ├── ExternalServices/
│   │   │   ├── Stripe/
│   │   │   ├── SendGrid/
│   │   │   └── Twilio/
│   │   └── BackgroundJobs/
│   │
│   └── ICare.WebApi/                   # Presentation layer
│       ├── Controllers/
│       ├── Hubs/                       # SignalR
│       ├── Middleware/
│       ├── DTOs/                       # Request/Response models
│       └── Program.cs
│
└── tests/
    ├── ICare.Domain.Tests/
    ├── ICare.Application.Tests/
    ├── ICare.Infrastructure.Tests/
    └── ICare.WebApi.Tests/
```

---

## 10. DDD and Persistence (EF Core)

### 10.1 The Tension: DDD vs ORM

DDD says: "Design the domain model first. Persistence is an implementation detail."

EF Core says: "I need to map your objects to tables. Let me influence your design."

This tension is real, but manageable. The key principles:

1. **Domain model drives the design** — never add a property to a domain class just because EF Core needs it
2. **Use EF Core Fluent Configuration** — keep all mapping in `IEntityTypeConfiguration<T>` classes, not in the domain entities
3. **Private setters** — domain objects control their own state; EF Core can still hydrate them using reflection
4. **Owned entities for value objects** — EF Core's owned entity feature maps value objects to columns within the parent table

### 10.2 Mapping Aggregates to Tables

```csharp
public class BookingConfiguration : IEntityTypeConfiguration<Booking>
{
    public void Configure(EntityTypeBuilder<Booking> builder)
    {
        builder.ToTable("bookings");

        // Strongly-typed ID
        builder.HasKey(b => b.Id);
        builder.Property(b => b.Id)
            .HasConversion(id => id.Value, value => BookingId.From(value))
            .HasColumnName("id");

        // Status as smart enum
        builder.Property(b => b.Status)
            .HasConversion(
                s => s.Name,
                name => BookingStatus.FromName(name))
            .HasColumnName("status");

        // Value object as owned entity (maps to columns in bookings table)
        builder.OwnsOne(b => b.Period, period =>
        {
            period.Property(p => p.Start).HasColumnName("start_time");
            period.Property(p => p.End).HasColumnName("end_time");
        });

        builder.OwnsOne(b => b.Pricing, pricing =>
        {
            pricing.Property(p => p.HourlyRate).HasColumnName("hourly_rate");
            pricing.Property(p => p.TotalAmount).HasColumnName("total_amount");
            pricing.Property(p => p.CommissionAmount).HasColumnName("commission_amount");
        });

        // Optional value object (cancellation may not exist)
        builder.OwnsOne(b => b.CancellationDetails, cancel =>
        {
            cancel.Property(c => c.Reason).HasColumnName("cancellation_reason");
            cancel.Property(c => c.CancelledAt).HasColumnName("cancelled_at");
            cancel.Property(c => c.RefundAmount).HasColumnName("refund_amount");
        });

        // Foreign keys by ID (not navigation properties)
        builder.Property(b => b.CareReceiverId)
            .HasConversion(id => id.Value, v => CareReceiverId.From(v))
            .HasColumnName("care_receiver_id");

        builder.Property(b => b.CaregiverId)
            .HasConversion(id => id.Value, v => CaregiverId.From(v))
            .HasColumnName("caregiver_id");

        // Ignore domain events (not persisted to booking table)
        builder.Ignore(b => b.DomainEvents);
    }
}
```

### 10.3 Dispatching Domain Events on Save

A powerful pattern: intercept `SaveChangesAsync` to automatically dispatch domain events after persistence.

```csharp
public class AppDbContext : DbContext
{
    private readonly IMediator _mediator;

    public override async Task<int> SaveChangesAsync(CancellationToken ct = default)
    {
        // Collect domain events from all tracked aggregates
        var aggregatesWithEvents = ChangeTracker.Entries<AggregateRoot>()
            .Where(e => e.Entity.DomainEvents.Any())
            .Select(e => e.Entity)
            .ToList();

        var domainEvents = aggregatesWithEvents
            .SelectMany(a => a.DomainEvents)
            .ToList();

        // Clear events before saving (prevent re-dispatch)
        aggregatesWithEvents.ForEach(a => a.ClearDomainEvents());

        // Save to database first
        var result = await base.SaveChangesAsync(ct);

        // Then dispatch events (after successful save)
        foreach (var domainEvent in domainEvents)
        {
            await _mediator.Publish(domainEvent, ct);
        }

        return result;
    }
}
```

### 10.4 Data-First vs Domain-First (Your Situation)

You have already prepared the database schema. This is a "data-first" approach, which is the opposite of what DDD prescribes (domain-first). This is not a deal-breaker, but requires careful reconciliation:

**What to watch for:**

| Schema Pattern | DDD Concern | Action |
|---|---|---|
| Tables named after data structures, not domain concepts | Language mismatch | Rename tables/columns to match ubiquitous language, or use EF Core `ToTable()` / `HasColumnName()` mapping |
| Foreign keys everywhere | Aggregates should reference by ID, not by navigation | Use ID-only references in domain model; EF Core can still enforce FK constraints at the DB level |
| Nullable columns representing optional state | May indicate missing value objects or state machines | Model as proper value objects; null becomes "not yet provided" as an explicit domain concept |
| One wide table with many columns | May cross aggregate boundaries | Check if the table mixes concerns from multiple aggregates; split the domain model even if the table stays as-is (EF Core can map multiple entities to one table) |
| ENUMs for status fields | State transitions not enforced at DB level | Model as state machines in domain; DB stores the result, domain enforces the rules |

The good news: **EF Core is flexible enough to map a rich domain model to an existing schema**. You don't have to change the database to use DDD — you change the code and configure EF Core to bridge the gap.

---

## 11. DDD and CQRS

### 11.1 What Is CQRS?

Command Query Responsibility Segregation separates the model into two sides:

- **Command side (write)**: Uses the full DDD model (aggregates, domain events, repositories). Enforces invariants.
- **Query side (read)**: Uses lightweight read models (DTOs, projections). Optimised for display.

```
                    ┌─────────────────────────────┐
  Commands          │      Write Model             │
  (RequestBooking,  │  (Aggregates, Repositories,  │  ──→  Database
   CancelBooking)   │   Domain Events)             │       (tables)
                    └─────────────────────────────┘
                                                          │
                    ┌─────────────────────────────┐       │
  Queries           │      Read Model              │       │
  (GetBookings,     │  (Dapper queries, DTOs,      │  ←────
   SearchCaregivers)│   optimised projections)     │
                    └─────────────────────────────┘
```

### 11.2 Why CQRS Works Well With DDD

DDD aggregates are designed for **enforcing invariants on writes**. They are deliberately NOT designed for efficient reads. Loading an aggregate to display a list of bookings is wasteful — you'd hydrate all the value objects, domain logic, and invariant checks just to display a table.

CQRS lets you:
- **Write** through the rich domain model (correctness, invariants, events)
- **Read** through lightweight queries (performance, flexibility)

```csharp
// WRITE: Full domain model
public class ConfirmBookingHandler : IRequestHandler<ConfirmBookingCommand>
{
    public async Task Handle(ConfirmBookingCommand cmd, CancellationToken ct)
    {
        var booking = await _bookings.GetByIdAsync(cmd.BookingId, ct);
        booking.Confirm(cmd.CaregiverId);  // Domain logic, invariants, events
        await _bookings.SaveChangesAsync(ct);
    }
}

// READ: Lightweight query — no aggregates, no domain logic
public class GetUpcomingBookingsHandler
    : IRequestHandler<GetUpcomingBookingsQuery, IReadOnlyList<BookingListDto>>
{
    private readonly ISqlConnectionFactory _sql;

    public async Task<IReadOnlyList<BookingListDto>> Handle(
        GetUpcomingBookingsQuery query, CancellationToken ct)
    {
        using var connection = _sql.CreateConnection();
        return (await connection.QueryAsync<BookingListDto>(
            @"SELECT b.id, b.start_time, b.end_time, b.status,
                     c.first_name as caregiver_name, c.photo_url
              FROM bookings b
              JOIN caregivers c ON c.id = b.caregiver_id
              WHERE b.care_receiver_id = @UserId
                AND b.start_time > @Now
              ORDER BY b.start_time",
            new { query.UserId, Now = DateTime.UtcNow })).ToList();
    }
}
```

### 11.3 Lightweight CQRS (Recommended for Tier 1)

Full CQRS uses separate databases for reads and writes, with event sourcing to synchronise them. This is overkill for Tier 1. Instead, use **lightweight CQRS**:

- Same database for reads and writes
- **Writes** go through EF Core + aggregates
- **Reads** use Dapper (or EF Core projections) for performance
- MediatR separates commands and queries in the codebase

This gives you the architectural benefit (separation of concerns, optimised reads) without the operational complexity (event stores, eventual consistency, projections).

---

## 12. Anti-Patterns and Common Mistakes

### 12.1 Anaemic Domain Model

The most common DDD anti-pattern. The domain objects are just data bags — all logic lives in services.

```csharp
// ANAEMIC: Entity is just a data bag
public class Booking
{
    public Guid Id { get; set; }
    public string Status { get; set; }        // public setter!
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public Guid CaregiverId { get; set; }
}

// All logic in a service
public class BookingService
{
    public void ConfirmBooking(Booking booking)
    {
        if (booking.Status != "Requested")    // Business rule outside the entity
            throw new Exception("Invalid state");
        booking.Status = "Confirmed";         // Direct mutation
    }
}
```

```csharp
// RICH: Entity encapsulates behaviour and protects its invariants
public class Booking : AggregateRoot
{
    public BookingId Id { get; private set; }              // private setter
    public BookingStatus Status { get; private set; }      // private setter
    public BookingPeriod Period { get; private set; }       // value object

    public void Confirm(CaregiverId confirmedBy)
    {
        if (Status != BookingStatus.Requested)
            throw new DomainException("Only requested bookings can be confirmed.");
        if (confirmedBy != CaregiverId)
            throw new DomainException("Only the assigned caregiver can confirm.");

        Status = BookingStatus.Confirmed;
        AddDomainEvent(new BookingConfirmedEvent(Id, CareReceiverId, CaregiverId));
    }
    // No public setters. State changes only through domain methods.
}
```

The litmus test: **if you can remove all methods from your domain classes and the system still works (because services do everything), you have an anaemic model.**

### 12.2 God Aggregate

An aggregate that owns too much. It loads slowly, causes concurrency conflicts, and is hard to understand.

Signs:
- Aggregate has more than 3-4 entity collections
- Loading the aggregate requires multiple JOINs
- Saving the aggregate takes a long time
- Concurrent users frequently get conflicts

Fix: Split into smaller aggregates connected by IDs and domain events.

### 12.3 CRUD Thinking Disguised as DDD

```csharp
// CRUD dressed up as DDD — still just data manipulation
public class BookingService
{
    public void UpdateBooking(UpdateBookingDto dto)
    {
        var booking = _repo.GetById(dto.Id);
        booking.Status = dto.Status;           // arbitrary status changes
        booking.StartTime = dto.StartTime;     // no invariant checking
        booking.Notes = dto.Notes;
        _repo.Save(booking);
    }
}
```

In DDD, there is no "update". There are specific domain operations with specific business meaning:

```csharp
booking.Confirm(caregiverId);
booking.Cancel(cancelledBy, reason);
booking.Reschedule(newPeriod);
booking.MarkAsStarted();
booking.Complete();
```

Each method enforces its own preconditions and raises its own events.

### 12.4 Leaking Infrastructure Into the Domain

```csharp
// BAD: Domain entity depends on EF Core
public class Booking
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string Status { get; set; }

    [ForeignKey("CaregiverId")]
    public virtual Caregiver Caregiver { get; set; }  // Navigation property
}
```

The domain layer must have **zero dependency on EF Core, ASP.NET, or any infrastructure library**. All mapping goes in `IEntityTypeConfiguration<T>` in the infrastructure layer.

```csharp
// GOOD: Pure domain entity — no framework attributes
public class Booking : AggregateRoot<BookingId>
{
    public BookingId Id { get; private set; }
    public BookingStatus Status { get; private set; }
    public CaregiverId CaregiverId { get; private set; }  // ID only, no navigation
}
```

### 12.5 Shared Kernel Creep

Starting with a small shared kernel (just IDs) and gradually adding more until it becomes a shared domain model. This defeats the purpose of bounded contexts.

Shared kernel should contain ONLY:
- Strongly-typed IDs (`UserId`, `BookingId`, etc.)
- Base classes (`AggregateRoot`, `Entity`, `ValueObject`, `DomainEvent`)
- Common exceptions (`DomainException`, `NotFoundException`)

Nothing else. No domain logic, no business rules, no services.

### 12.6 Repository Per Table

```csharp
// BAD: Repository per table — this is a DAO, not a DDD repository
public interface IBookingPricingRepository { ... }
public interface ICancellationDetailsRepository { ... }
public interface IBookingNoteRepository { ... }
```

`BookingPricing`, `CancellationDetails`, and `BookingNote` are all part of the `Booking` aggregate. There is one repository: `IBookingRepository`. Internal entities and value objects are loaded and saved through the aggregate root.

---

## 13. When Not To Use DDD

DDD adds complexity. It is not always justified.

### Use DDD When:
- The domain is genuinely complex (many business rules, state machines, calculations)
- Business rules change frequently and need to be easy to modify
- The project is long-lived and maintained by a team
- Domain experts are available to collaborate with
- Getting the business logic wrong has serious consequences (financial, safety, compliance)

### Don't Use DDD When:
- The application is primarily CRUD (forms over data)
- The domain is simple or well-understood (no real "logic", just data in and out)
- The project is a prototype or throwaway
- The team is small and the codebase is small
- There are no domain experts to collaborate with

### For iCare Specifically:
DDD is justified for the **Booking** and **Verification/Safeguarding** contexts (complex state machines, compliance requirements, financial calculations). It is less justified for **Messaging** (essentially a chat feature — well-solved problem) and **Reviews** (simple CRUD with a rating constraint). The Identity context is largely handled by ASP.NET Identity (generic subdomain) with a thin DDD layer for profile management.

---

## 14. Glossary

| Term | Definition |
|------|-----------|
| **Aggregate** | A cluster of entities and value objects treated as a single unit for data changes, with one entity designated as the root. |
| **Aggregate Root** | The single entity through which all external access to an aggregate passes. The consistency boundary. |
| **Anti-Corruption Layer (ACL)** | A translation layer that prevents one context's model from leaking into another. |
| **Application Service** | Orchestrates use cases. Loads aggregates, calls domain methods, persists results. Contains no business logic. |
| **Bounded Context** | A linguistic and model boundary within which a particular domain model applies consistently. |
| **Context Map** | A diagram and description of the relationships between bounded contexts. |
| **Core Domain** | The subdomain that provides competitive advantage. Receives the highest investment. |
| **CQRS** | Command Query Responsibility Segregation. Separate models for reading and writing. |
| **Domain Event** | A record of something that happened in the domain. Named in past tense. Used for cross-aggregate and cross-context communication. |
| **Domain Service** | Contains domain logic that doesn't belong to a single aggregate. Stateless. |
| **Entity** | An object defined by its identity rather than its attributes. Has a lifecycle. |
| **Factory** | Creates complex aggregates or entities. Encapsulates construction logic. |
| **Generic Subdomain** | A subdomain that is not unique to the business. Use existing solutions. |
| **Invariant** | A business rule that must always be true within an aggregate. |
| **Repository** | Provides the illusion of an in-memory collection of aggregates. Interface in domain, implementation in infrastructure. |
| **Shared Kernel** | A small, explicitly shared subset of the domain model used by multiple contexts. Keep minimal. |
| **Specification** | An object that encapsulates a business rule as a predicate. Can be composed. |
| **Subdomain** | A logical partition of the problem space. Can be core, supporting, or generic. |
| **Supporting Subdomain** | Necessary for the business but not differentiating. Custom-built but simpler. |
| **Ubiquitous Language** | The shared vocabulary between developers and domain experts within a bounded context. |
| **Value Object** | An object defined by its attributes, not identity. Immutable. Two instances with the same attributes are equal. |

---

## Recommended Reading

1. **Eric Evans** — *Domain-Driven Design: Tackling Complexity in the Heart of Software* (2003). The original book. Dense but authoritative.
2. **Vaughn Vernon** — *Implementing Domain-Driven Design* (2013). More practical, with code examples. The most useful for implementation.
3. **Vaughn Vernon** — *Domain-Driven Design Distilled* (2016). Short (180 pages). Good starting point if Evans is too dense.
4. **Scott Millett & Nick Tune** — *Patterns, Principles, and Practices of Domain-Driven Design* (2015). Excellent .NET-focused DDD book.
5. **Jimmy Bogard** — MediatR library and blog posts on CQRS in .NET.
6. **Steve Smith (Ardalis)** — Clean Architecture template for ASP.NET Core.
