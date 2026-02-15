# .NET Core Concepts Lecture

## The .NET Features That Power the iCare Backend

> **Audience**: Developers new to .NET or coming from a JavaScript/Node.js background.
>
> **Scope**: Covers the .NET 10, C# 12+, ASP.NET Core, and Entity Framework Core concepts directly used in the iCare backend.

---

## 1. The .NET Ecosystem in 60 Seconds

**.NET** is the runtime and base class library. It runs your code.

**C#** is the language. It compiles to Intermediate Language (IL), which the .NET runtime executes.

**ASP.NET Core** is the web framework built on .NET. It handles HTTP requests, routing, middleware, and responses.

**Entity Framework Core (EF Core)** is the ORM. It maps C# classes to database tables and generates SQL.

**NuGet** is the package manager (like npm for Node.js).

**The `.csproj` file** is like `package.json` — it declares dependencies, build settings, and target framework.

**The `.sln` file** groups multiple projects together (like a Lerna monorepo).

### JavaScript to .NET Translation Table

| JavaScript/Node.js | .NET Equivalent |
|---|---|
| `npm install express` | `dotnet add package` (ASP.NET Core is built-in) |
| `package.json` | `*.csproj` |
| `node_modules/` | `~/.nuget/packages/` (global cache) |
| `npm run dev` | `dotnet run` or `dotnet watch` |
| `npm run build` | `dotnet build` or `dotnet publish` |
| Express.js | ASP.NET Core |
| Prisma / TypeORM | Entity Framework Core |
| Socket.IO | SignalR |
| Passport.js | ASP.NET Identity |
| Jest / Vitest | xUnit / NUnit |
| `async/await` | `async/await` (nearly identical syntax) |
| TypeScript interfaces | C# interfaces (enforced at runtime too) |
| `export default` | `public class` (everything public is accessible) |

---

## 2. C# Language Features You'll Use Daily

### 2.1 Records — Immutable Data Types

Records give you immutability and value equality for free. Perfect for value objects, DTOs, commands, queries, and events.

```csharp
// Positional record (concise — properties auto-generated)
public record BookingRequestedEvent(
    BookingId BookingId,
    CareReceiverProfileId CareReceiverId,
    CaregiverProfileId CaregiverId,
    BookingPeriod Period);

// Usage:
var evt = new BookingRequestedEvent(bookingId, receiverId, giverId, period);
Console.WriteLine(evt.BookingId);  // access like a property

// Value equality (built in):
var a = new BookingRequestedEvent(id, r, g, p);
var b = new BookingRequestedEvent(id, r, g, p);
Console.WriteLine(a == b);  // true — same values

// Immutability:
// evt.BookingId = newId;  // compile error!

// "with" expression — create a copy with one field changed:
var modified = evt with { CareReceiverId = differentReceiverId };
```

**When to use**: Value objects, domain events, DTOs, commands, queries.
**When NOT to use**: Aggregate roots and entities (they have identity and mutable state).

### 2.2 Readonly Record Structs — Lightweight Value Types

For strongly-typed IDs — allocated on the stack (no heap allocation), immutable, value equality:

```csharp
public readonly record struct BookingId(Guid Value)
{
    public static BookingId New() => new(Guid.NewGuid());
    public static BookingId From(Guid value) => new(value);
}

var id = BookingId.New();
var same = BookingId.From(id.Value);
Console.WriteLine(id == same);  // true
```

### 2.3 Pattern Matching — Expressive Conditionals

```csharp
// Switch expression (returns a value):
var refundPolicy = hoursUntilStart switch
{
    >= 48 => "full",
    >= 24 => "partial_50",
    _ => "none"
};

// Type pattern (check and cast in one step):
if (domainEvent is BookingCancelledEvent cancelled)
{
    ProcessRefund(cancelled.RefundAmount);
}
```

### 2.4 Nullable Reference Types — Compile-Time Null Safety

```csharp
// Non-nullable (default):
string name = "Alice";
// name = null;  // compiler warning

// Nullable (explicit):
string? optionalNote = null;  // OK — the ? says "nullable"

// Compiler forces null handling:
Console.WriteLine(optionalNote.Length);   // warning: possible null reference
Console.WriteLine(optionalNote?.Length);  // OK — null-conditional operator

// In the domain model:
public class Booking
{
    public CancellationDetails? CancellationDetails { get; private set; }  // nullable
    public BookingPeriod Period { get; private set; }                       // non-nullable
}
```

### 2.5 Collection Expressions (C# 12)

```csharp
// Old:
var list = new List<string> { "companionship", "housework", "errands" };

// C# 12:
List<string> list = ["companionship", "housework", "errands"];

// Spread operator:
int[] first = [1, 2, 3];
int[] second = [..first, 4, 5, 6];  // [1, 2, 3, 4, 5, 6]
```

### 2.6 Primary Constructors (C# 12)

Reduce boilerplate for constructor parameter injection:

```csharp
// Old:
public class BookingRepository
{
    private readonly AppDbContext _db;
    public BookingRepository(AppDbContext db) { _db = db; }
}

// C# 12:
public class BookingRepository(AppDbContext db)
{
    public async Task<Booking?> GetByIdAsync(BookingId id, CancellationToken ct)
        => await db.Bookings.FirstOrDefaultAsync(b => b.Id == id, ct);
}
```

### 2.7 Interfaces — Contracts Without Implementation

Used everywhere in DDD for dependency inversion:

```csharp
// Domain layer defines the interface (the WHAT):
public interface IBookingRepository
{
    Task<Booking?> GetByIdAsync(BookingId id, CancellationToken ct);
    Task AddAsync(Booking booking, CancellationToken ct);
    Task SaveChangesAsync(CancellationToken ct);
}

// Infrastructure layer provides the implementation (the HOW):
public class BookingRepository : IBookingRepository
{
    private readonly AppDbContext _db;

    public async Task<Booking?> GetByIdAsync(BookingId id, CancellationToken ct)
        => await _db.Bookings.FirstOrDefaultAsync(b => b.Id == id, ct);

    public async Task AddAsync(Booking booking, CancellationToken ct)
        => await _db.Bookings.AddAsync(booking, ct);

    public async Task SaveChangesAsync(CancellationToken ct)
        => await _db.SaveChangesAsync(ct);
}
```

The domain layer depends on `IBookingRepository` (the interface). It never knows about `AppDbContext` or EF Core. This is **Dependency Inversion** — the D in SOLID.

### 2.8 Async/Await

Nearly identical to JavaScript, with one addition — `CancellationToken`:

```csharp
public async Task<Booking?> GetByIdAsync(BookingId id, CancellationToken ct)
{
    return await _db.Bookings.FirstOrDefaultAsync(b => b.Id == id, ct);
}
```

**Key rule**: Always pass `CancellationToken` through the call chain. It lets the caller cancel the operation (e.g., user navigates away, HTTP request times out).

### 2.9 Generics — Type-Safe Reusable Code

```csharp
// Base class that works with any ID type:
public abstract class Entity<TId> where TId : struct
{
    public TId Id { get; protected set; }
}

// Concrete entities specify their ID type:
public class Booking : Entity<BookingId> { }
public class User : Entity<UserId> { }
```

### 2.10 LINQ — Querying Collections and Databases

LINQ works on both in-memory collections and database queries:

```csharp
var upcoming = await _db.Bookings
    .Where(b => b.CaregiverId == caregiverId)
    .Where(b => b.Status == BookingStatus.Confirmed)
    .Where(b => b.Period.Start > DateTime.UtcNow)
    .OrderBy(b => b.Period.Start)
    .Take(10)
    .ToListAsync(ct);
// Generates: SELECT TOP 10 ... FROM bookings WHERE ... ORDER BY ...
```

| JavaScript | C# LINQ |
|---|---|
| `.filter(x => x.active)` | `.Where(x => x.Active)` |
| `.map(x => x.name)` | `.Select(x => x.Name)` |
| `.find(x => x.id === id)` | `.FirstOrDefault(x => x.Id == id)` |
| `.some(x => x.active)` | `.Any(x => x.Active)` |
| `.every(x => x.valid)` | `.All(x => x.Valid)` |
| `.reduce((a, x) => a + x, 0)` | `.Sum(x => x.Amount)` |
| `.sort((a, b) => a - b)` | `.OrderBy(x => x.Value)` |
| `.slice(0, 10)` | `.Take(10)` |
| `.slice(5)` | `.Skip(5)` |

---

## 3. Dependency Injection — The Backbone

### 3.1 Registration

In `Program.cs`, you register services with the DI container:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<IBookingRepository, BookingRepository>();
builder.Services.AddScoped<ICaregiverProfileRepository, CaregiverProfileRepository>();
builder.Services.AddSingleton<IPricingCalculator, PricingCalculator>();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddMediatR(cfg =>
    cfg.RegisterServicesFromAssembly(typeof(RequestBookingHandler).Assembly));

builder.Services.AddSignalR();
```

### 3.2 Lifetimes

| Lifetime | Meaning | Use For |
|----------|---------|---------|
| `Singleton` | One instance for the entire application | Stateless services, config, caches |
| `Scoped` | One instance per HTTP request | DbContext, repositories, unit-of-work |
| `Transient` | New instance every time requested | Lightweight stateless helpers |

**Critical**: `DbContext` must be `Scoped`. Singleton = shared connection (concurrency bugs). Transient = different instances (transactions break).

### 3.3 Injection

Services are injected via constructor parameters:

```csharp
public class RequestBookingHandler(
    IBookingRepository bookings,
    ICaregiverProfileRepository caregivers,
    IBookingOverlapChecker overlapChecker)
    : IRequestHandler<RequestBookingCommand, BookingId>
{
    public async Task<BookingId> Handle(
        RequestBookingCommand cmd, CancellationToken ct)
    {
        var caregiver = await caregivers.GetByIdAsync(cmd.CaregiverId, ct);
        // ...
    }
}
```

You never write `new BookingRepository(...)`. The DI container creates it, injects `AppDbContext` into it, and injects the repository into your handler.

---

## 4. ASP.NET Core — The Web Framework

### 4.1 Request Pipeline

Every HTTP request flows through middleware:

```
HTTP Request → Exception Handler → CORS → Authentication → Authorization → Routing → Controller → Response
```

### 4.2 Controllers

```csharp
[ApiController]
[Route("api/bookings")]
[Authorize]
public sealed class BookingsController(IMediator mediator) : ControllerBase
{
    [HttpPost]                                    // POST /api/bookings
    public async Task<IActionResult> Create(
        [FromBody] CreateBookingRequest request,  // deserialized from JSON body
        CancellationToken ct)
    {
        var command = new RequestBookingCommand(/* map request to command */);
        var bookingId = await mediator.Send(command, ct);
        return CreatedAtAction(nameof(GetById), new { id = bookingId.Value },
            new { id = bookingId.Value });
    }

    [HttpGet("{id:guid}")]                        // GET /api/bookings/{id}
    public async Task<IActionResult> GetById(Guid id, CancellationToken ct)
    {
        var query = new GetBookingByIdQuery(BookingId.From(id));
        var result = await mediator.Send(query, ct);
        return result is null ? NotFound() : Ok(result);
    }

    [HttpPost("{id:guid}/accept")]                // POST /api/bookings/{id}/accept
    [Authorize(Roles = "Caregiver")]
    public async Task<IActionResult> Accept(Guid id, CancellationToken ct)
    {
        await mediator.Send(new AcceptBookingCommand(BookingId.From(id)), ct);
        return NoContent();
    }
}
```

**Key conventions**:
- Controllers are thin — map HTTP to commands/queries, return HTTP responses
- No business logic in controllers — delegate to MediatR
- `[FromBody]` deserializes JSON to C# (like Express `req.body`)
- `[Authorize(Roles = "Caregiver")]` restricts access by role
- Return types: `Ok()`, `NotFound()`, `CreatedAtAction()`, `BadRequest()`, `NoContent()`

### 4.3 Middleware Setup

```csharp
var app = builder.Build();

app.UseExceptionHandler("/error");
app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapHub<MessagingHub>("/hubs/messaging");

app.Run();
```

---

## 5. Entity Framework Core — The ORM

### 5.1 DbContext

```csharp
public class AppDbContext : DbContext
{
    public DbSet<Booking> Bookings => Set<Booking>();
    public DbSet<User> Users => Set<User>();
    public DbSet<CaregiverProfile> CaregiverProfiles => Set<CaregiverProfile>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
}
```

### 5.2 Entity Configuration — Mapping Classes to Tables

Instead of attributes on domain classes (which violates DDD), use Fluent API:

```csharp
public class BookingConfiguration : IEntityTypeConfiguration<Booking>
{
    public void Configure(EntityTypeBuilder<Booking> builder)
    {
        builder.ToTable("bookings");
        builder.HasKey(b => b.Id);

        builder.Property(b => b.Id)
            .HasColumnName("id")
            .HasConversion(id => id.Value, v => BookingId.From(v));

        // Value object as owned entity:
        builder.OwnsOne(b => b.Period, period =>
        {
            period.Property(p => p.Start).HasColumnName("start_time");
            period.Property(p => p.End).HasColumnName("end_time");
        });
    }
}
```

### 5.3 Change Tracking

EF Core tracks changes automatically:

```csharp
var booking = await _db.Bookings.FirstOrDefaultAsync(b => b.Id == id, ct);
booking.Accept();  // changes Status
await _db.SaveChangesAsync(ct);
// Generates: UPDATE bookings SET status = 'Accepted' WHERE id = @id
```

This is why repositories don't need an `Update()` method.

### 5.4 Migrations

```bash
# Create a migration:
dotnet ef migrations add AddCancellationDetails \
    --project src/ICare.Infrastructure \
    --startup-project src/ICare.WebApi

# Apply to database:
dotnet ef database update
```

### 5.5 Value Converters

For strongly-typed IDs and smart enums:

```csharp
builder.Property(b => b.Id)
    .HasConversion(
        id => id.Value,                // C# → Database
        value => BookingId.From(value) // Database → C#
    );

builder.Property(b => b.Status)
    .HasConversion(
        status => status.Name,
        name => BookingStatus.FromName(name)
    );
```

---

## 6. MediatR — CQRS Without the Infrastructure

### 6.1 Commands (Writes)

```csharp
// Command:
public sealed record RequestBookingCommand(
    CareReceiverProfileId CareReceiverId,
    CaregiverProfileId CaregiverId,
    DateTime StartTime,
    DateTime EndTime,
    string? Notes) : IRequest<BookingId>;

// Handler:
public sealed class RequestBookingHandler
    : IRequestHandler<RequestBookingCommand, BookingId>
{
    public async Task<BookingId> Handle(
        RequestBookingCommand cmd, CancellationToken ct)
    {
        // ... domain logic ...
        return booking.Id;
    }
}

// Usage:
var bookingId = await _mediator.Send(command, ct);
```

### 6.2 Queries (Reads)

```csharp
public sealed record GetBookingByIdQuery(BookingId Id)
    : IRequest<BookingDetailDto?>;

public sealed class GetBookingByIdHandler
    : IRequestHandler<GetBookingByIdQuery, BookingDetailDto?>
{
    public async Task<BookingDetailDto?> Handle(
        GetBookingByIdQuery query, CancellationToken ct)
    {
        return await _db.Bookings
            .Where(b => b.Id == query.Id)
            .Select(b => new BookingDetailDto(b.Id.Value, b.Status.Name))
            .FirstOrDefaultAsync(ct);
    }
}
```

### 6.3 Notifications (Domain Events)

```csharp
// Multiple handlers react to the same event:
public sealed class ReleasePaymentHandler
    : INotificationHandler<BookingCompletedEvent>
{
    public async Task Handle(BookingCompletedEvent evt, CancellationToken ct)
    {
        // Release payment from escrow
    }
}

public sealed class PromptReviewHandler
    : INotificationHandler<BookingCompletedEvent>
{
    public async Task Handle(BookingCompletedEvent evt, CancellationToken ct)
    {
        // Send review prompt
    }
}
```

### 6.4 Pipeline Behaviours

Cross-cutting concerns that run before/after every handler (like Express middleware):

```csharp
public sealed class ValidationBehaviour<TRequest, TResponse>(
    IEnumerable<IValidator<TRequest>> validators)
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : notnull
{
    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken ct)
    {
        var failures = validators
            .Select(v => v.Validate(new ValidationContext<TRequest>(request)))
            .SelectMany(result => result.Errors)
            .Where(f => f is not null)
            .ToList();

        if (failures.Count > 0)
            throw new ValidationException(failures);

        return await next();  // call the actual handler
    }
}
```

Every command is automatically validated before the handler runs.

---

## 7. SignalR — Real-Time Communication

Used for chat messaging and booking status updates.

### 7.1 Hub (Server)

```csharp
[Authorize]
public sealed class MessagingHub : Hub
{
    public async Task SendMessage(Guid conversationId, string content)
    {
        var userId = Context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value;

        // Save via MediatR, then broadcast:
        await Clients.Group(conversationId.ToString())
            .SendAsync("ReceiveMessage", new
            {
                conversationId, senderId = userId, content,
                sentAt = DateTime.UtcNow
            });
    }

    public override async Task OnConnectedAsync()
    {
        // Join user's conversation groups on connect
        var conversations = await GetUserConversations();
        foreach (var convo in conversations)
            await Groups.AddToGroupAsync(Context.ConnectionId, convo.Id.ToString());

        await base.OnConnectedAsync();
    }
}
```

### 7.2 Client (JavaScript/React)

```javascript
import { HubConnectionBuilder } from "@microsoft/signalr";

const connection = new HubConnectionBuilder()
    .withUrl("/hubs/messaging", {
        accessTokenFactory: () => getJwtToken()
    })
    .withAutomaticReconnect()
    .build();

connection.on("ReceiveMessage", (message) => {
    // Update UI
});

await connection.start();
await connection.invoke("SendMessage", conversationId, "Hello!");
```

---

## 8. ASP.NET Identity — Authentication and Authorization

### What It Provides

- User registration with password hashing (bcrypt)
- Login with JWT token generation
- Role-based authorization (CareReceiver, Caregiver, Admin)
- Email/phone confirmation
- Password reset
- Account lockout after failed attempts
- Two-factor authentication (TOTP — for admin accounts)

### JWT Flow

```
1. POST /api/auth/login { email, password }
2. Server validates → generates JWT { sub, email, roles, exp }
3. Returns { accessToken: "eyJhbG...", refreshToken: "..." }
4. Client sends: Authorization: Bearer eyJhbG...
5. ASP.NET middleware validates automatically
```

### Role-Based Access

```csharp
[Authorize(Roles = "Caregiver")]
[HttpPost("{id}/accept")]
public async Task<IActionResult> Accept(Guid id) { }

[Authorize(Roles = "Admin")]
[HttpPost("{id}/resolve-dispute")]
public async Task<IActionResult> ResolveDispute(Guid id) { }
```

---

## 9. Background Jobs and Hosted Services

### IHostedService — Simple Background Tasks

```csharp
public sealed class BookingExpirationService(
    IServiceProvider services) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken ct)
    {
        while (!ct.IsCancellationRequested)
        {
            using var scope = services.CreateScope();
            var mediator = scope.ServiceProvider.GetRequiredService<IMediator>();
            await mediator.Send(new ExpireStaleBookingsCommand(), ct);
            await Task.Delay(TimeSpan.FromMinutes(5), ct);
        }
    }
}
```

### Hangfire — Scheduled and Delayed Jobs

```csharp
// Delayed (48-hour auto-confirm):
BackgroundJob.Schedule<BookingAutoConfirmJob>(
    job => job.Execute(bookingId),
    TimeSpan.FromHours(48));

// Recurring (daily payouts):
RecurringJob.AddOrUpdate<PayoutProcessingJob>(
    "daily-payouts",
    job => job.Execute(),
    Cron.Daily(9, 0));
```

---

## 10. Configuration and Environments

### appsettings.json

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=icare_dev;Username=icare;Password=icare_password"
  },
  "Jwt": { "Issuer": "icare-api", "Audience": "icare-app", "ExpiryMinutes": 60 },
  "Stripe": { "SecretKey": "", "WebhookSecret": "" }
}
```

### Environment Overrides

```
appsettings.json                 ← base
appsettings.Development.json     ← dev overrides
appsettings.Production.json      ← prod overrides
```

### Options Pattern — Typed Configuration

```csharp
public sealed class JwtSettings
{
    public string Issuer { get; init; } = string.Empty;
    public string Audience { get; init; } = string.Empty;
    public int ExpiryMinutes { get; init; }
}

// Registration:
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("Jwt"));

// Usage:
public class TokenService(IOptions<JwtSettings> jwtOptions)
{
    private readonly JwtSettings _jwt = jwtOptions.Value;
}
```

---

## 11. Error Handling Patterns

### Exception Hierarchy

```csharp
public sealed class DomainException : Exception
{
    public DomainException(string message) : base(message) { }
}

public sealed class NotFoundException : Exception
{
    public NotFoundException(string entity, object id)
        : base($"{entity} with ID {id} was not found.") { }
}
```

### Global Exception Handler

Maps exceptions to HTTP responses — controllers never need try/catch:

```csharp
public sealed class GlobalExceptionHandler : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext context, Exception exception, CancellationToken ct)
    {
        var (statusCode, message) = exception switch
        {
            DomainException e => (400, e.Message),
            ValidationException e => (400, string.Join("; ",
                e.Errors.Select(e => e.ErrorMessage))),
            NotFoundException e => (404, e.Message),
            _ => (500, "An unexpected error occurred.")
        };

        context.Response.StatusCode = statusCode;
        await context.Response.WriteAsJsonAsync(new { error = message }, ct);
        return true;
    }
}
```

Throw `DomainException` from any layer and it automatically becomes a 400 response.

---

## 12. Testing in .NET

### xUnit

```csharp
public class MoneyTests
{
    [Fact]
    public void Create_WithValidAmount_Succeeds()
    {
        var money = new Money(15.50m);
        Assert.Equal(15.50m, money.Amount);
    }

    [Theory]
    [InlineData(-5)]
    [InlineData(-0.01)]
    public void Create_WithNegativeAmount_Throws(decimal amount)
    {
        Assert.Throws<DomainException>(() => new Money(amount));
    }
}
```

### FluentAssertions

```csharp
booking.Status.Should().Be(BookingStatus.Accepted);
booking.DomainEvents.Should().ContainSingle()
    .Which.Should().BeOfType<BookingAcceptedEvent>();
```

### NSubstitute — Mocking

```csharp
var bookings = Substitute.For<IBookingRepository>();
var caregivers = Substitute.For<ICaregiverProfileRepository>();

caregivers.GetByIdAsync(Arg.Any<CaregiverProfileId>(), Arg.Any<CancellationToken>())
    .Returns(testCaregiver);

var handler = new RequestBookingHandler(bookings, caregivers, overlap, pricing);
var result = await handler.Handle(command, CancellationToken.None);

await bookings.Received(1).AddAsync(Arg.Any<Booking>(), Arg.Any<CancellationToken>());
```

### Integration Tests

```csharp
public class BookingsApiTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public BookingsApiTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                services.RemoveAll<DbContextOptions<AppDbContext>>();
                services.AddDbContext<AppDbContext>(options =>
                    options.UseInMemoryDatabase("TestDb"));
            });
        }).CreateClient();
    }

    [Fact]
    public async Task CreateBooking_ReturnsCreated()
    {
        var request = new { careReceiverId = Guid.NewGuid() /* ... */ };
        var response = await _client.PostAsJsonAsync("/api/bookings", request);
        response.StatusCode.Should().Be(HttpStatusCode.Created);
    }
}
```

---

## Quick Reference: The iCare Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Runtime | .NET 10 (LTS) | Application runtime |
| Language | C# 12+ | Primary language |
| Web | ASP.NET Core | HTTP API, middleware, routing |
| Real-Time | SignalR | WebSocket messaging |
| ORM | EF Core + Npgsql | Database access, migrations |
| Database | PostgreSQL 14+ / PostGIS | Storage, geographic queries |
| CQRS | MediatR | Command/query dispatch |
| Validation | FluentValidation | Input validation pipeline |
| Auth | ASP.NET Identity + JWT | Registration, login, roles, 2FA |
| Payments | Stripe.net | Connect, Identity, Payments |
| Jobs | Hangfire | Scheduled/delayed tasks |
| Testing | xUnit + FluentAssertions + NSubstitute | Unit, integration, mocking |
| API Docs | Swashbuckle (Swagger) | OpenAPI documentation |
