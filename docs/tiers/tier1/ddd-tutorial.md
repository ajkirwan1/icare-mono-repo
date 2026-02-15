# Domain-Driven Design: Hands-On Tutorial

> **Companion to**: [ddd-reference-guide.md](ddd-reference-guide.md) (theory) and [domain-analysis.md](domain-analysis.md) (iCare domain model)
>
> **What this is**: A step-by-step, build-it-yourself tutorial. You'll implement real iCare domain code from scratch.
>
> **Prerequisites**: Basic C# knowledge, .NET SDK installed, understanding of classes/interfaces/records.

---

## Table of Contents

1. [Tutorial 1: Your First Value Object](#tutorial-1-your-first-value-object)
2. [Tutorial 2: Strongly-Typed IDs](#tutorial-2-strongly-typed-ids)
3. [Tutorial 3: Building an Entity](#tutorial-3-building-an-entity)
4. [Tutorial 4: Your First Aggregate Root](#tutorial-4-your-first-aggregate-root)
5. [Tutorial 5: Domain Events](#tutorial-5-domain-events)
6. [Tutorial 6: A Complete Aggregate — Booking](#tutorial-6-a-complete-aggregate--booking)
7. [Tutorial 7: Domain Services](#tutorial-7-domain-services)
8. [Tutorial 8: Repository Interface](#tutorial-8-repository-interface)
9. [Tutorial 9: Application Layer — Command Handler](#tutorial-9-application-layer--command-handler)
10. [Tutorial 10: EF Core Mapping](#tutorial-10-ef-core-mapping)
11. [Tutorial 11: Unit Testing Your Domain](#tutorial-11-unit-testing-your-domain)
12. [Tutorial 12: Putting It All Together — A Full Vertical Slice](#tutorial-12-putting-it-all-together--a-full-vertical-slice)

---

## Tutorial 1: Your First Value Object

A value object is defined by its attributes, not an identity. Two value objects with the same attributes are equal. They are immutable.

### Exercise 1.1: Build a Money Value Object

The iCare platform deals with money everywhere — hourly rates, booking totals, refunds, commissions. Let's model it.

**Requirements**:
- Amount must be >= 0
- Currency is always GBP at Tier 1
- Maximum 2 decimal places
- Two Money objects with the same amount and currency are equal

**Step 1**: Start with a C# record (records give you immutability and value equality for free):

```csharp
namespace ICare.Domain.Common.ValueObjects;

public record Money
{
    public decimal Amount { get; }
    public string Currency { get; }

    public Money(decimal amount, string currency = "GBP")
    {
        if (amount < 0)
            throw new DomainException("Amount cannot be negative.");
        if (currency != "GBP")
            throw new DomainException("Only GBP is supported at Tier 1.");
        if (decimal.Round(amount, 2) != amount)
            throw new DomainException("Amount cannot have more than 2 decimal places.");

        Amount = amount;
        Currency = currency;
    }

    // Arithmetic operations return NEW Money objects (immutability)
    public Money Add(Money other)
    {
        if (Currency != other.Currency)
            throw new DomainException("Cannot add different currencies.");
        return new Money(Amount + other.Amount, Currency);
    }

    public Money Subtract(Money other)
    {
        if (Currency != other.Currency)
            throw new DomainException("Cannot subtract different currencies.");
        return new Money(Amount - other.Amount, Currency);
    }

    public Money MultiplyBy(decimal factor)
        => new Money(Math.Round(Amount * factor, 2), Currency);

    public override string ToString() => $"£{Amount:F2}";
}
```

**Step 2**: Test it. Try creating invalid Money:

```csharp
// These should all throw DomainException:
var negative = new Money(-5m);          // "Amount cannot be negative."
var dollars = new Money(10m, "USD");    // "Only GBP is supported at Tier 1."
var tooMany = new Money(10.123m);       // "Amount cannot have more than 2 decimal places."

// These should work:
var a = new Money(15.50m);
var b = new Money(10.00m);
var total = a.Add(b);                   // £25.50
var commission = total.MultiplyBy(0.15m); // £3.83 (rounded)

// Value equality (built into records):
var x = new Money(10m);
var y = new Money(10m);
Console.WriteLine(x == y);  // true — same value, equal
```

**Key lesson**: You can never create an invalid `Money`. The constructor guarantees it. Every method returns a new object — the original is never mutated.

### Exercise 1.2: Build an HourlyRate Value Object

Now build one that wraps Money with additional business rules.

**Requirements** (from the domain analysis):
- Must be between £10 and £100
- Can calculate a total for a given duration

```csharp
namespace ICare.Domain.Identity.ValueObjects;

public record HourlyRate
{
    public Money Rate { get; }

    public HourlyRate(Money rate)
    {
        if (rate.Amount < 10m)
            throw new DomainException("Hourly rate must be at least £10.");
        if (rate.Amount > 100m)
            throw new DomainException("Hourly rate cannot exceed £100.");

        Rate = rate;
    }

    // Convenience constructor
    public HourlyRate(decimal amount) : this(new Money(amount)) { }

    public Money CalculateTotal(TimeSpan duration)
    {
        var hours = (decimal)duration.TotalHours;
        return Rate.MultiplyBy(hours);
    }

    public override string ToString() => $"{Rate}/hr";
}
```

**Try it**:
```csharp
var rate = new HourlyRate(18.50m);
var total = rate.CalculateTotal(TimeSpan.FromHours(3));
Console.WriteLine(total); // £55.50

// Invalid:
var tooLow = new HourlyRate(5m);    // throws: "Hourly rate must be at least £10."
var tooHigh = new HourlyRate(150m);  // throws: "Hourly rate cannot exceed £100."
```

### Exercise 1.3: Build It Yourself — EmailAddress

Now you try. Build an `EmailAddress` value object with these rules:
- Cannot be null or empty
- Must contain exactly one `@` symbol
- Must have content before and after the `@`
- Store it lowercase (normalised)
- Two EmailAddress objects with the same normalised value are equal

<details>
<summary>Click to reveal solution</summary>

```csharp
namespace ICare.Domain.Common.ValueObjects;

public record EmailAddress
{
    public string Value { get; }

    public EmailAddress(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new DomainException("Email address is required.");

        var normalised = value.Trim().ToLowerInvariant();

        var parts = normalised.Split('@');
        if (parts.Length != 2 || string.IsNullOrWhiteSpace(parts[0]) || string.IsNullOrWhiteSpace(parts[1]))
            throw new DomainException($"Invalid email address: {value}");

        if (!parts[1].Contains('.'))
            throw new DomainException($"Invalid email domain: {parts[1]}");

        Value = normalised;
    }

    public override string ToString() => Value;
}
```

</details>

---

## Tutorial 2: Strongly-Typed IDs

Using `Guid` everywhere is dangerous — you can accidentally pass a `BookingId` where a `UserId` is expected and the compiler won't catch it.

### Exercise 2.1: Create Typed IDs

```csharp
namespace ICare.Domain.Common;

// Base pattern — each ID is a readonly record struct wrapping a Guid
public readonly record struct UserId(Guid Value)
{
    public static UserId New() => new(Guid.NewGuid());
    public static UserId From(Guid value) => new(value);
    public override string ToString() => Value.ToString();
}

public readonly record struct BookingId(Guid Value)
{
    public static BookingId New() => new(Guid.NewGuid());
    public static BookingId From(Guid value) => new(value);
    public override string ToString() => Value.ToString();
}

public readonly record struct CaregiverProfileId(Guid Value)
{
    public static CaregiverProfileId New() => new(Guid.NewGuid());
    public static CaregiverProfileId From(Guid value) => new(value);
    public override string ToString() => Value.ToString();
}

public readonly record struct CareReceiverProfileId(Guid Value)
{
    public static CareReceiverProfileId New() => new(Guid.NewGuid());
    public static CareReceiverProfileId From(Guid value) => new(value);
    public override string ToString() => Value.ToString();
}
```

**Why `readonly record struct`?**
- `readonly` — cannot be mutated after creation
- `record` — value equality (two `UserId` with the same Guid are equal)
- `struct` — allocated on the stack, no heap allocation, no null

**The payoff — compile-time safety**:
```csharp
UserId userId = UserId.New();
BookingId bookingId = BookingId.New();

// Compile error! Cannot convert BookingId to UserId
DoSomethingWithUser(bookingId);  // ❌ won't compile

void DoSomethingWithUser(UserId id) { }
```

Without strongly-typed IDs, both would be `Guid` and this bug would only be caught at runtime (or never).

---

## Tutorial 3: Building an Entity

An entity has identity (an ID) and a lifecycle (it changes over time). Unlike value objects, two entities with the same attributes but different IDs are different objects.

### Exercise 3.1: Base Entity Class

First, create the base class that all entities inherit from:

```csharp
namespace ICare.Domain.Common;

public abstract class Entity<TId> where TId : struct
{
    public TId Id { get; protected set; }

    // Entities are equal if their IDs match
    public override bool Equals(object? obj)
    {
        if (obj is not Entity<TId> other) return false;
        if (ReferenceEquals(this, other)) return true;
        return Id.Equals(other.Id);
    }

    public override int GetHashCode() => Id.GetHashCode();

    public static bool operator ==(Entity<TId>? left, Entity<TId>? right)
        => Equals(left, right);

    public static bool operator !=(Entity<TId>? left, Entity<TId>? right)
        => !Equals(left, right);
}
```

### Exercise 3.2: Base Aggregate Root Class

An aggregate root is an entity that also collects domain events:

```csharp
namespace ICare.Domain.Common;

public abstract class AggregateRoot<TId> : Entity<TId> where TId : struct
{
    private readonly List<DomainEvent> _domainEvents = new();

    public IReadOnlyCollection<DomainEvent> DomainEvents
        => _domainEvents.AsReadOnly();

    protected void AddDomainEvent(DomainEvent domainEvent)
        => _domainEvents.Add(domainEvent);

    public void ClearDomainEvents()
        => _domainEvents.Clear();
}
```

And the base domain event:

```csharp
namespace ICare.Domain.Common;

public abstract record DomainEvent
{
    public Guid EventId { get; } = Guid.NewGuid();
    public DateTime OccurredAt { get; } = DateTime.UtcNow;
}
```

And the common exception:

```csharp
namespace ICare.Domain.Common;

public sealed class DomainException : Exception
{
    public DomainException(string message) : base(message) { }
}
```

**These four classes are the entire foundation of your domain layer.** Everything else builds on top of them.

---

## Tutorial 4: Your First Aggregate Root

Let's build the `CaregiverProfile` aggregate — it has the richest behaviour in the Identity & Access context.

### Exercise 4.1: Define the Aggregate

```csharp
namespace ICare.Domain.Identity;

using ICare.Domain.Common;
using ICare.Domain.Common.ValueObjects;
using ICare.Domain.Identity.ValueObjects;
using ICare.Domain.Identity.Events;

public sealed class CaregiverProfile : AggregateRoot<CaregiverProfileId>
{
    // References User by ID only (DEC-001: separate aggregates)
    public UserId UserId { get; private set; }

    public string FirstName { get; private set; } = string.Empty;
    public string LastName { get; private set; } = string.Empty;
    public string Bio { get; private set; } = string.Empty;
    public string? ProfilePhotoUrl { get; private set; }
    public HourlyRate Rate { get; private set; } = null!;
    public int ServiceRadiusMiles { get; private set; }
    public UkPostcode Postcode { get; private set; } = null!;

    // Collections (owned by this aggregate)
    private readonly List<ServiceType> _servicesOffered = new();
    public IReadOnlyCollection<ServiceType> ServicesOffered
        => _servicesOffered.AsReadOnly();

    private readonly List<AvailabilitySlot> _availability = new();
    public IReadOnlyCollection<AvailabilitySlot> Availability
        => _availability.AsReadOnly();

    // Private constructor for EF Core
    private CaregiverProfile() { }

    // Factory method — the only way to create a CaregiverProfile
    public static CaregiverProfile Create(
        UserId userId,
        string firstName,
        string lastName,
        HourlyRate rate,
        UkPostcode postcode,
        int serviceRadiusMiles)
    {
        if (serviceRadiusMiles < 1 || serviceRadiusMiles > 50)
            throw new DomainException("Service radius must be between 1 and 50 miles.");

        var profile = new CaregiverProfile
        {
            Id = CaregiverProfileId.New(),
            UserId = userId,
            FirstName = firstName,
            LastName = lastName,
            Rate = rate,
            Postcode = postcode,
            ServiceRadiusMiles = serviceRadiusMiles
        };

        profile.AddDomainEvent(new CaregiverProfileCreatedEvent(
            profile.Id, userId));

        return profile;
    }

    // Domain behaviour — not just setters!

    public void UpdateRate(HourlyRate newRate)
    {
        if (Rate == newRate) return; // No change, no event

        var oldRate = Rate;
        Rate = newRate;

        AddDomainEvent(new CaregiverRateChangedEvent(Id, oldRate, newRate));
    }

    public void UpdateBio(string bio)
    {
        if (bio.Length > 2000)
            throw new DomainException("Bio cannot exceed 2000 characters.");
        Bio = bio;
    }

    public void SetAvailability(List<AvailabilitySlot> slots)
    {
        // Invariant: minimum 4 hours per week
        var totalHours = slots.Sum(s => s.Duration.TotalHours);
        if (totalHours < 4)
            throw new DomainException("Must offer at least 4 hours per week.");

        // Invariant: no overlapping slots
        for (int i = 0; i < slots.Count; i++)
        {
            for (int j = i + 1; j < slots.Count; j++)
            {
                if (slots[i].OverlapsWith(slots[j]))
                    throw new DomainException("Availability slots must not overlap.");
            }
        }

        _availability.Clear();
        _availability.AddRange(slots);

        AddDomainEvent(new AvailabilityUpdatedEvent(Id));
    }

    public void AddService(ServiceType service)
    {
        if (_servicesOffered.Contains(service))
            return; // Idempotent

        _servicesOffered.Add(service);
        AddDomainEvent(new CaregiverProfileUpdatedEvent(Id));
    }

    public void RemoveService(ServiceType service)
    {
        if (!_servicesOffered.Remove(service))
            return; // Wasn't there

        if (_servicesOffered.Count == 0)
            throw new DomainException("Must offer at least one service.");

        AddDomainEvent(new CaregiverProfileUpdatedEvent(Id));
    }
}
```

**Key things to notice**:
1. **All setters are `private set`** — no external code can modify state directly
2. **Factory method `Create()`** — the constructor is private; creation goes through a method that enforces invariants and raises events
3. **Private constructor for EF Core** — EF Core needs a parameterless constructor but it's private so your code can't use it
4. **Collections exposed as `IReadOnlyCollection`** — outside code can read but not modify
5. **Every mutation method enforces invariants** and raises appropriate domain events
6. **No "Update" method with a DTO parameter** — each operation is a named domain action

### Exercise 4.2: Build It Yourself — CareReceiverProfile

Build the `CareReceiverProfile` aggregate with:
- `CareReceiverProfileId`, `UserId` (reference by ID)
- `FirstName`, `LastName`
- `Postcode` (UkPostcode value object)
- `EmergencyContact` (value object — nullable until profile is complete)
- `PreferredServices` (collection of ServiceType)

Invariants:
- Emergency contact is required once profile is marked complete
- Must have a valid UK postcode

<details>
<summary>Click to reveal solution</summary>

```csharp
namespace ICare.Domain.Identity;

public sealed class CareReceiverProfile : AggregateRoot<CareReceiverProfileId>
{
    public UserId UserId { get; private set; }
    public string FirstName { get; private set; } = string.Empty;
    public string LastName { get; private set; } = string.Empty;
    public UkPostcode Postcode { get; private set; } = null!;
    public EmergencyContact? EmergencyContact { get; private set; }
    public bool IsProfileComplete { get; private set; }
    public bool IsFamilyMember { get; private set; }
    public UserId? FamilyMemberId { get; private set; }

    private readonly List<ServiceType> _preferredServices = new();
    public IReadOnlyCollection<ServiceType> PreferredServices
        => _preferredServices.AsReadOnly();

    private CareReceiverProfile() { }

    public static CareReceiverProfile Create(
        UserId userId, string firstName, string lastName, UkPostcode postcode)
    {
        var profile = new CareReceiverProfile
        {
            Id = CareReceiverProfileId.New(),
            UserId = userId,
            FirstName = firstName,
            LastName = lastName,
            Postcode = postcode,
            IsProfileComplete = false
        };

        profile.AddDomainEvent(new CareReceiverRegisteredEvent(profile.Id, userId));
        return profile;
    }

    public void SetEmergencyContact(EmergencyContact contact)
    {
        EmergencyContact = contact ?? throw new DomainException("Emergency contact cannot be null.");
    }

    public void MarkProfileComplete()
    {
        if (EmergencyContact is null)
            throw new DomainException("Emergency contact is required to complete profile.");

        IsProfileComplete = true;
    }
}
```

</details>

---

## Tutorial 5: Domain Events

Domain events decouple bounded contexts. When something happens in one context, other contexts react without direct coupling.

### Exercise 5.1: Define Events for the Identity Context

```csharp
namespace ICare.Domain.Identity.Events;

using ICare.Domain.Common;

// Raised when a new caregiver profile is created
public sealed record CaregiverProfileCreatedEvent(
    CaregiverProfileId ProfileId,
    UserId UserId) : DomainEvent;

// Raised when a caregiver changes their hourly rate
public sealed record CaregiverRateChangedEvent(
    CaregiverProfileId ProfileId,
    HourlyRate OldRate,
    HourlyRate NewRate) : DomainEvent;

// Raised when availability is updated
public sealed record AvailabilityUpdatedEvent(
    CaregiverProfileId ProfileId) : DomainEvent;

// Generic update (bio, services, photo, etc.)
public sealed record CaregiverProfileUpdatedEvent(
    CaregiverProfileId ProfileId) : DomainEvent;

// Raised when a care receiver completes registration
public sealed record CareReceiverRegisteredEvent(
    CareReceiverProfileId ProfileId,
    UserId UserId) : DomainEvent;
```

**Key rules for events**:
- Named in **past tense** (something *happened*)
- Contain only the **data consumers need** (IDs + relevant values)
- Are **immutable** (records are ideal)
- Carry **no behaviour** — they are pure data

### Exercise 5.2: Who Consumes These Events?

Think about what should happen when each event fires:

| Event | Consumer Context | What Happens |
|-------|-----------------|--------------|
| `CaregiverProfileCreatedEvent` | Verification | Create a verification record for this caregiver |
| `CaregiverProfileCreatedEvent` | Search | Add caregiver to search index |
| `CaregiverRateChangedEvent` | Search | Update rate in search index |
| `AvailabilityUpdatedEvent` | Search | Update availability in search index |
| `CareReceiverRegisteredEvent` | Notification | Send welcome email |

The Caregiver Profile aggregate doesn't know about any of these consumers. It just raises the event. This is the power of domain events — zero coupling.

---

## Tutorial 6: A Complete Aggregate — Booking

The Booking aggregate is the most complex in the system — 14 states, cancellation policies, pricing calculations. Let's build it step by step.

### Exercise 6.1: The Booking State Machine

First, model the states. This is the heart of the business logic.

```csharp
namespace ICare.Domain.Bookings;

using ICare.Domain.Common;

public sealed class BookingStatus
{
    public string Name { get; }
    public int Value { get; }

    private BookingStatus(int value, string name)
    {
        Value = value;
        Name = name;
    }

    // All possible states
    public static readonly BookingStatus Requested = new(1, "Requested");
    public static readonly BookingStatus Accepted = new(2, "Accepted");
    public static readonly BookingStatus PaymentAuthorized = new(3, "PaymentAuthorized");
    public static readonly BookingStatus Confirmed = new(4, "Confirmed");
    public static readonly BookingStatus InProgress = new(5, "InProgress");
    public static readonly BookingStatus PendingCompletion = new(6, "PendingCompletion");
    public static readonly BookingStatus Completed = new(7, "Completed");
    public static readonly BookingStatus CancelledByReceiver = new(8, "CancelledByReceiver");
    public static readonly BookingStatus CancelledByCaregiver = new(9, "CancelledByCaregiver");
    public static readonly BookingStatus Expired = new(10, "Expired");
    public static readonly BookingStatus Disputed = new(11, "Disputed");
    public static readonly BookingStatus DisputeResolved = new(12, "DisputeResolved");
    public static readonly BookingStatus NoShow = new(13, "NoShow");
    public static readonly BookingStatus RefundIssued = new(14, "RefundIssued");

    // State transition rules — the CORE business logic
    public bool CanTransitionTo(BookingStatus target) => (this, target) switch
    {
        _ when this == Requested && target == Accepted => true,
        _ when this == Requested && target == CancelledByReceiver => true,
        _ when this == Requested && target == CancelledByCaregiver => true,
        _ when this == Requested && target == Expired => true,
        _ when this == Accepted && target == PaymentAuthorized => true,
        _ when this == Accepted && target == CancelledByReceiver => true,
        _ when this == Accepted && target == CancelledByCaregiver => true,
        _ when this == PaymentAuthorized && target == Confirmed => true,
        _ when this == Confirmed && target == InProgress => true,
        _ when this == Confirmed && target == CancelledByReceiver => true,
        _ when this == Confirmed && target == CancelledByCaregiver => true,
        _ when this == InProgress && target == PendingCompletion => true,
        _ when this == InProgress && target == NoShow => true,
        _ when this == PendingCompletion && target == Completed => true,
        _ when this == PendingCompletion && target == Disputed => true,
        _ when this == Completed && target == Disputed => true,
        _ when this == Disputed && target == DisputeResolved => true,
        _ when this == CancelledByReceiver && target == RefundIssued => true,
        _ when this == CancelledByCaregiver && target == RefundIssued => true,
        _ => false
    };

    // Equality by value
    public override bool Equals(object? obj)
        => obj is BookingStatus other && Value == other.Value;
    public override int GetHashCode() => Value;
    public static bool operator ==(BookingStatus a, BookingStatus b) => a.Value == b.Value;
    public static bool operator !=(BookingStatus a, BookingStatus b) => a.Value != b.Value;
    public override string ToString() => Name;
}
```

### Exercise 6.2: Booking Value Objects

```csharp
namespace ICare.Domain.Bookings.ValueObjects;

// The time period of a booking
public record BookingPeriod
{
    public DateTime Start { get; }
    public DateTime End { get; }

    public BookingPeriod(DateTime start, DateTime end)
    {
        if (end <= start)
            throw new DomainException("End must be after start.");
        if ((end - start).TotalHours < 1)
            throw new DomainException("Minimum booking duration is 1 hour.");
        if ((end - start).TotalHours > 12)
            throw new DomainException("Maximum booking duration is 12 hours.");

        Start = start;
        End = end;
    }

    public TimeSpan Duration => End - Start;

    public bool OverlapsWith(BookingPeriod other)
        => Start < other.End && End > other.Start;

    public bool IsInFuture(DateTime now)
        => Start > now;

    public double HoursUntilStart(DateTime now)
        => (Start - now).TotalHours;
}

// Pricing snapshot — captured at booking creation time
public record PricingSnapshot
{
    public Money HourlyRate { get; }
    public Money TotalAmount { get; }
    public Money PlatformFee { get; }
    public Money CaregiverPayout { get; }
    public decimal CommissionRate { get; }

    public PricingSnapshot(
        Money hourlyRate,
        TimeSpan duration,
        decimal commissionRate)
    {
        HourlyRate = hourlyRate;
        CommissionRate = commissionRate;
        TotalAmount = hourlyRate.MultiplyBy((decimal)duration.TotalHours);
        PlatformFee = TotalAmount.MultiplyBy(commissionRate);
        CaregiverPayout = TotalAmount.Subtract(PlatformFee);
    }
}

// Cancellation details — attached when a booking is cancelled
public record CancellationDetails(
    UserId CancelledBy,
    string Reason,
    DateTime CancelledAt,
    Money RefundAmount,
    string RefundPolicy);  // "full", "partial_50", "none"
```

### Exercise 6.3: The Booking Aggregate Root

Now the main event — the Booking aggregate that ties it all together:

```csharp
namespace ICare.Domain.Bookings;

using ICare.Domain.Common;
using ICare.Domain.Bookings.ValueObjects;
using ICare.Domain.Bookings.Events;

public sealed class Booking : AggregateRoot<BookingId>
{
    public CareReceiverProfileId CareReceiverId { get; private set; }
    public CaregiverProfileId CaregiverId { get; private set; }
    public BookingStatus Status { get; private set; } = null!;
    public BookingPeriod Period { get; private set; } = null!;
    public PricingSnapshot Pricing { get; private set; } = null!;
    public string? CareReceiverNotes { get; private set; }
    public CancellationDetails? CancellationDetails { get; private set; }
    public DateTime CreatedAt { get; private set; }

    private Booking() { } // EF Core

    /// <summary>
    /// A care receiver requests a booking with a caregiver.
    /// This is the ONLY way to create a Booking.
    /// </summary>
    public static Booking Request(
        CareReceiverProfileId careReceiverId,
        CaregiverProfileId caregiverId,
        BookingPeriod period,
        PricingSnapshot pricing,
        string? notes = null)
    {
        // Invariant: booking must be at least 24 hours in advance
        if (period.HoursUntilStart(DateTime.UtcNow) < 24)
            throw new DomainException("Bookings must be at least 24 hours in advance.");

        var booking = new Booking
        {
            Id = BookingId.New(),
            CareReceiverId = careReceiverId,
            CaregiverId = caregiverId,
            Status = BookingStatus.Requested,
            Period = period,
            Pricing = pricing,
            CareReceiverNotes = notes,
            CreatedAt = DateTime.UtcNow
        };

        booking.AddDomainEvent(new BookingRequestedEvent(
            booking.Id, careReceiverId, caregiverId, period, pricing));

        return booking;
    }

    /// <summary>
    /// Caregiver accepts the booking request. Must happen within 24 hours.
    /// </summary>
    public void Accept()
    {
        EnsureTransition(BookingStatus.Accepted);

        // Invariant: must accept within 24 hours of request
        var hoursSinceRequest = (DateTime.UtcNow - CreatedAt).TotalHours;
        if (hoursSinceRequest > 24)
            throw new DomainException("Booking request has expired. Must accept within 24 hours.");

        Status = BookingStatus.Accepted;
        AddDomainEvent(new BookingAcceptedEvent(Id, CareReceiverId, CaregiverId));
    }

    /// <summary>
    /// Payment has been authorized (hold placed). Transitions to Confirmed.
    /// Called by the Payment context event handler.
    /// </summary>
    public void ConfirmPayment()
    {
        EnsureTransition(BookingStatus.PaymentAuthorized);
        Status = BookingStatus.PaymentAuthorized;

        // Auto-transition to Confirmed
        EnsureTransition(BookingStatus.Confirmed);
        Status = BookingStatus.Confirmed;

        AddDomainEvent(new BookingConfirmedEvent(Id, CareReceiverId, CaregiverId, Period));
    }

    /// <summary>
    /// Booking session starts (at the scheduled start time).
    /// </summary>
    public void Start()
    {
        EnsureTransition(BookingStatus.InProgress);
        Status = BookingStatus.InProgress;

        AddDomainEvent(new BookingStartedEvent(Id));
    }

    /// <summary>
    /// Caregiver marks the session as finished. Enters 48-hour confirmation window.
    /// </summary>
    public void MarkPendingCompletion()
    {
        EnsureTransition(BookingStatus.PendingCompletion);
        Status = BookingStatus.PendingCompletion;

        AddDomainEvent(new BookingPendingCompletionEvent(Id, CareReceiverId));
    }

    /// <summary>
    /// Care receiver confirms completion (or auto-confirmed after 48 hours).
    /// </summary>
    public void Complete()
    {
        EnsureTransition(BookingStatus.Completed);
        Status = BookingStatus.Completed;

        AddDomainEvent(new BookingCompletedEvent(
            Id, CareReceiverId, CaregiverId, Pricing));
    }

    /// <summary>
    /// Cancel the booking. Refund depends on timing.
    /// </summary>
    public void Cancel(UserId cancelledBy, string reason)
    {
        if (string.IsNullOrWhiteSpace(reason))
            throw new DomainException("Cancellation reason is required.");

        // Determine which cancel state based on who's cancelling
        var targetStatus = cancelledBy == CareReceiverId.Value
            ? BookingStatus.CancelledByReceiver   // simplified — in real code
            : BookingStatus.CancelledByCaregiver;  // you'd check by role

        EnsureTransition(targetStatus);

        // Calculate refund based on timing
        var hoursUntilStart = Period.HoursUntilStart(DateTime.UtcNow);
        var (refundAmount, policy) = hoursUntilStart switch
        {
            >= 48 => (Pricing.TotalAmount, "full"),
            >= 24 => (Pricing.TotalAmount.MultiplyBy(0.5m), "partial_50"),
            _ => (new Money(0m), "none")
        };

        CancellationDetails = new CancellationDetails(
            cancelledBy, reason, DateTime.UtcNow, refundAmount, policy);

        Status = targetStatus;

        AddDomainEvent(new BookingCancelledEvent(
            Id, cancelledBy, reason, refundAmount, policy));
    }

    /// <summary>
    /// Raise a dispute about a completed or pending-completion booking.
    /// </summary>
    public void Dispute(UserId raisedBy, string reason)
    {
        if (string.IsNullOrWhiteSpace(reason))
            throw new DomainException("Dispute reason is required.");

        EnsureTransition(BookingStatus.Disputed);
        Status = BookingStatus.Disputed;

        AddDomainEvent(new BookingDisputedEvent(Id, raisedBy, reason));
    }

    // Private helper — enforces the state machine
    private void EnsureTransition(BookingStatus target)
    {
        if (!Status.CanTransitionTo(target))
            throw new DomainException(
                $"Cannot transition from {Status} to {target}.");
    }
}
```

**Study this carefully.** Notice:
- **Every public method is a named domain operation** — `Accept()`, `Cancel()`, `Dispute()`, not `SetStatus()`
- **The state machine is enforced** by `EnsureTransition()` — illegal transitions throw
- **Cancellation policy is domain logic** — the refund calculation lives in the aggregate, not in a service
- **Events carry just enough data** for consumers to react

---

## Tutorial 7: Domain Services

A domain service contains logic that doesn't belong to a single aggregate.

### Exercise 7.1: Booking Overlap Checker

Checking if a caregiver has a conflicting booking requires looking across multiple Booking aggregates. This can't live inside a single Booking.

```csharp
namespace ICare.Domain.Bookings.Services;

public interface IBookingOverlapChecker
{
    Task<bool> HasOverlapAsync(
        CaregiverProfileId caregiverId,
        BookingPeriod period,
        CancellationToken ct);
}

// Implementation lives in Infrastructure (it needs database access)
// But the INTERFACE lives in Domain
```

### Exercise 7.2: Pricing Calculator

Commission rates come from PlatformSettings (Admin context). The Booking context needs to calculate pricing without depending on Admin internals.

```csharp
namespace ICare.Domain.Bookings.Services;

public interface IPricingCalculator
{
    Task<PricingSnapshot> CalculateAsync(
        Money hourlyRate,
        TimeSpan duration,
        CancellationToken ct);
}

// Infrastructure implementation would read PlatformSettings
// and apply the current commission rate
```

**Key insight**: The domain layer defines the *interface*. The infrastructure layer provides the *implementation*. The domain never knows about databases, Stripe, or configuration files.

---

## Tutorial 8: Repository Interface

A repository provides the illusion of an in-memory collection. One per aggregate root.

### Exercise 8.1: Booking Repository

```csharp
namespace ICare.Domain.Bookings;

public interface IBookingRepository
{
    Task<Booking?> GetByIdAsync(BookingId id, CancellationToken ct);

    Task<IReadOnlyList<Booking>> GetActiveForCaregiverAsync(
        CaregiverProfileId caregiverId, CancellationToken ct);

    Task<IReadOnlyList<Booking>> GetUpcomingForCareReceiverAsync(
        CareReceiverProfileId careReceiverId, CancellationToken ct);

    Task AddAsync(Booking booking, CancellationToken ct);

    // No Update method — EF Core tracks changes automatically
    // No Delete method — bookings are never deleted (soft delete via status)

    Task SaveChangesAsync(CancellationToken ct);
}
```

**Notice what's NOT here**:
- No `GetAll()` — loading every booking is never correct
- No `Update()` — EF Core's change tracker handles this
- No `Delete()` — bookings have a lifecycle, they don't get deleted
- No generic `IRepository<T>` — each repository expresses domain-specific queries

---

## Tutorial 9: Application Layer — Command Handler

The application layer orchestrates use cases. It loads aggregates, calls domain methods, and persists results.

### Exercise 9.1: Request Booking Command

```csharp
namespace ICare.Application.Bookings.Commands.RequestBooking;

using MediatR;

// The command — what the caller wants to do
public sealed record RequestBookingCommand(
    CareReceiverProfileId CareReceiverId,
    CaregiverProfileId CaregiverId,
    DateTime StartTime,
    DateTime EndTime,
    string? Notes) : IRequest<BookingId>;

// The validator — input validation (NOT business rules)
public sealed class RequestBookingValidator
    : AbstractValidator<RequestBookingCommand>
{
    public RequestBookingValidator()
    {
        RuleFor(x => x.CareReceiverId)
            .NotEmpty().WithMessage("Care receiver is required.");
        RuleFor(x => x.CaregiverId)
            .NotEmpty().WithMessage("Caregiver is required.");
        RuleFor(x => x.StartTime)
            .GreaterThan(DateTime.UtcNow)
            .WithMessage("Start time must be in the future.");
        RuleFor(x => x.EndTime)
            .GreaterThan(x => x.StartTime)
            .WithMessage("End time must be after start time.");
        RuleFor(x => x.Notes)
            .MaximumLength(1000).When(x => x.Notes is not null);
    }
}

// The handler — orchestrates the use case
public sealed class RequestBookingHandler
    : IRequestHandler<RequestBookingCommand, BookingId>
{
    private readonly IBookingRepository _bookings;
    private readonly ICaregiverProfileRepository _caregivers;
    private readonly IBookingOverlapChecker _overlapChecker;
    private readonly IPricingCalculator _pricingCalculator;

    public RequestBookingHandler(
        IBookingRepository bookings,
        ICaregiverProfileRepository caregivers,
        IBookingOverlapChecker overlapChecker,
        IPricingCalculator pricingCalculator)
    {
        _bookings = bookings;
        _caregivers = caregivers;
        _overlapChecker = overlapChecker;
        _pricingCalculator = pricingCalculator;
    }

    public async Task<BookingId> Handle(
        RequestBookingCommand cmd, CancellationToken ct)
    {
        // 1. Load the caregiver to get their rate
        var caregiver = await _caregivers.GetByIdAsync(cmd.CaregiverId, ct)
            ?? throw new NotFoundException("Caregiver not found.");

        // 2. Build value objects (validation happens here)
        var period = new BookingPeriod(cmd.StartTime, cmd.EndTime);

        // 3. Check for overlaps (domain service)
        if (await _overlapChecker.HasOverlapAsync(cmd.CaregiverId, period, ct))
            throw new DomainException("Caregiver has a conflicting booking.");

        // 4. Calculate pricing (domain service)
        var pricing = await _pricingCalculator.CalculateAsync(
            caregiver.Rate.Rate, period.Duration, ct);

        // 5. Create the aggregate (domain logic + events)
        var booking = Booking.Request(
            cmd.CareReceiverId, cmd.CaregiverId, period, pricing, cmd.Notes);

        // 6. Persist
        await _bookings.AddAsync(booking, ct);
        await _bookings.SaveChangesAsync(ct);
        // Domain events dispatched by SaveChangesAsync override

        return booking.Id;
    }
}
```

**Study the separation of concerns**:
- **Validator**: Is the input well-formed? (not null, not empty, correct types)
- **Handler**: Orchestration only — load, delegate, persist
- **Domain objects**: All business rules (booking period constraints, overlap check, pricing, state machine)
- **Handler has ZERO business logic** — it's pure plumbing

---

## Tutorial 10: EF Core Mapping

The domain model drives the design. EF Core maps it to the existing database schema.

### Exercise 10.1: Booking Entity Configuration

```csharp
namespace ICare.Infrastructure.Persistence.Configurations;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ICare.Domain.Bookings;

public sealed class BookingConfiguration : IEntityTypeConfiguration<Booking>
{
    public void Configure(EntityTypeBuilder<Booking> builder)
    {
        builder.ToTable("bookings");

        // Strongly-typed ID with value converter
        builder.HasKey(b => b.Id);
        builder.Property(b => b.Id)
            .HasConversion(id => id.Value, v => BookingId.From(v))
            .HasColumnName("id");

        // Status as string (smart enum)
        builder.Property(b => b.Status)
            .HasConversion(
                s => s.Name,
                name => BookingStatus.FromName(name))
            .HasColumnName("status")
            .HasMaxLength(50);

        // Foreign key IDs (no navigation properties — DDD rule)
        builder.Property(b => b.CareReceiverId)
            .HasConversion(id => id.Value, v => CareReceiverProfileId.From(v))
            .HasColumnName("care_receiver_id");

        builder.Property(b => b.CaregiverId)
            .HasConversion(id => id.Value, v => CaregiverProfileId.From(v))
            .HasColumnName("caregiver_id");

        // Value object as owned entity (BookingPeriod maps to columns in bookings table)
        builder.OwnsOne(b => b.Period, period =>
        {
            period.Property(p => p.Start).HasColumnName("start_time");
            period.Property(p => p.End).HasColumnName("end_time");
        });

        // Value object as owned entity (PricingSnapshot)
        builder.OwnsOne(b => b.Pricing, pricing =>
        {
            pricing.OwnsOne(p => p.HourlyRate, hr =>
            {
                hr.Property(m => m.Amount).HasColumnName("hourly_rate");
                hr.Property(m => m.Currency).HasColumnName("currency");
            });
            pricing.OwnsOne(p => p.TotalAmount, ta =>
            {
                ta.Property(m => m.Amount).HasColumnName("total_amount");
            });
            pricing.OwnsOne(p => p.PlatformFee, pf =>
            {
                pf.Property(m => m.Amount).HasColumnName("platform_fee");
            });
            pricing.OwnsOne(p => p.CaregiverPayout, cp =>
            {
                cp.Property(m => m.Amount).HasColumnName("caregiver_payout");
            });
            pricing.Property(p => p.CommissionRate).HasColumnName("commission_rate");
        });

        // Optional value object (may be null if not cancelled)
        builder.OwnsOne(b => b.CancellationDetails, cancel =>
        {
            cancel.Property(c => c.Reason).HasColumnName("cancellation_reason");
            cancel.Property(c => c.CancelledAt).HasColumnName("cancelled_at");
            cancel.Property(c => c.RefundPolicy).HasColumnName("refund_policy");
            cancel.OwnsOne(c => c.RefundAmount, ra =>
            {
                ra.Property(m => m.Amount).HasColumnName("refund_amount");
            });
        });

        builder.Property(b => b.CareReceiverNotes)
            .HasColumnName("care_receiver_notes")
            .HasMaxLength(1000);

        builder.Property(b => b.CreatedAt)
            .HasColumnName("created_at");

        // Domain events are NOT persisted — ignore them
        builder.Ignore(b => b.DomainEvents);
    }
}
```

**Key pattern**: The domain model has rich value objects (`BookingPeriod`, `PricingSnapshot`, `Money`). The database has flat columns (`start_time`, `end_time`, `hourly_rate`). EF Core's `OwnsOne` bridges the gap without compromising either side.

---

## Tutorial 11: Unit Testing Your Domain

Domain logic is the easiest code to test — no database, no HTTP, no external services. Pure C#.

### Exercise 11.1: Testing Value Objects

```csharp
namespace ICare.Domain.Tests.ValueObjects;

public class MoneyTests
{
    [Fact]
    public void Create_WithValidAmount_Succeeds()
    {
        var money = new Money(15.50m);
        Assert.Equal(15.50m, money.Amount);
        Assert.Equal("GBP", money.Currency);
    }

    [Fact]
    public void Create_WithNegativeAmount_Throws()
    {
        var ex = Assert.Throws<DomainException>(() => new Money(-5m));
        Assert.Equal("Amount cannot be negative.", ex.Message);
    }

    [Fact]
    public void Add_TwoMoney_ReturnsCorrectSum()
    {
        var a = new Money(10m);
        var b = new Money(5.50m);
        var result = a.Add(b);
        Assert.Equal(15.50m, result.Amount);
    }

    [Fact]
    public void Equality_SameValues_AreEqual()
    {
        var a = new Money(10m);
        var b = new Money(10m);
        Assert.Equal(a, b);
        Assert.True(a == b);
    }
}
```

### Exercise 11.2: Testing the Booking State Machine

```csharp
namespace ICare.Domain.Tests.Bookings;

public class BookingTests
{
    private Booking CreateTestBooking()
    {
        var period = new BookingPeriod(
            DateTime.UtcNow.AddDays(3),
            DateTime.UtcNow.AddDays(3).AddHours(2));

        var pricing = new PricingSnapshot(
            new Money(20m), period.Duration, 0.15m);

        return Booking.Request(
            CareReceiverProfileId.New(),
            CaregiverProfileId.New(),
            period,
            pricing);
    }

    [Fact]
    public void Request_CreatesBookingInRequestedState()
    {
        var booking = CreateTestBooking();
        Assert.Equal(BookingStatus.Requested, booking.Status);
    }

    [Fact]
    public void Request_RaisesBookingRequestedEvent()
    {
        var booking = CreateTestBooking();
        Assert.Single(booking.DomainEvents);
        Assert.IsType<BookingRequestedEvent>(booking.DomainEvents.First());
    }

    [Fact]
    public void Accept_FromRequested_TransitionsToAccepted()
    {
        var booking = CreateTestBooking();
        booking.Accept();
        Assert.Equal(BookingStatus.Accepted, booking.Status);
    }

    [Fact]
    public void Accept_FromCompleted_Throws()
    {
        var booking = CreateTestBooking();
        booking.Accept();
        booking.ConfirmPayment();
        booking.Start();
        booking.MarkPendingCompletion();
        booking.Complete();

        var ex = Assert.Throws<DomainException>(() => booking.Accept());
        Assert.Contains("Cannot transition", ex.Message);
    }

    [Fact]
    public void Cancel_MoreThan48Hours_FullRefund()
    {
        var booking = CreateTestBooking(); // 3 days from now
        var userId = UserId.New();

        booking.Cancel(userId, "Changed my mind");

        Assert.Equal(booking.Pricing.TotalAmount, booking.CancellationDetails!.RefundAmount);
        Assert.Equal("full", booking.CancellationDetails.RefundPolicy);
    }

    [Fact]
    public void Cancel_WithoutReason_Throws()
    {
        var booking = CreateTestBooking();
        var ex = Assert.Throws<DomainException>(
            () => booking.Cancel(UserId.New(), ""));
        Assert.Equal("Cancellation reason is required.", ex.Message);
    }
}
```

**These tests run in milliseconds** — no database, no startup, no configuration. This is the payoff of keeping business logic in the domain layer.

---

## Tutorial 12: Putting It All Together — A Full Vertical Slice

Let's trace a complete request from HTTP to database and back.

### The Flow

```
HTTP POST /api/bookings
    │
    ▼
BookingsController.Create(dto)
    │
    ▼
MediatR.Send(new RequestBookingCommand(...))
    │
    ▼
RequestBookingValidator.Validate()     ← input validation
    │
    ▼
RequestBookingHandler.Handle()         ← orchestration
    │
    ├── CaregiverRepo.GetById()        ← load data
    ├── new BookingPeriod(...)          ← value object validation
    ├── OverlapChecker.HasOverlap()    ← domain service
    ├── PricingCalculator.Calculate()  ← domain service
    ├── Booking.Request(...)           ← domain logic + events
    ├── BookingRepo.Add()              ← persist
    └── BookingRepo.SaveChanges()      ← commit + dispatch events
         │
         ├── BookingRequestedEvent dispatched
         │   ├── CreatePaymentHoldHandler   ← Payment context
         │   ├── NotifyCaregiverHandler     ← Notification
         │   └── CreateConversationHandler  ← Messaging context
         │
         ▼
    Return BookingId
    │
    ▼
HTTP 201 Created { "id": "..." }
```

### The Controller

```csharp
namespace ICare.WebApi.Controllers;

[ApiController]
[Route("api/bookings")]
[Authorize]
public sealed class BookingsController : ControllerBase
{
    private readonly IMediator _mediator;

    public BookingsController(IMediator mediator) => _mediator = mediator;

    [HttpPost]
    [ProducesResponseType(typeof(BookingCreatedResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create(
        [FromBody] CreateBookingRequest request,
        CancellationToken ct)
    {
        var command = new RequestBookingCommand(
            CareReceiverId: CareReceiverProfileId.From(request.CareReceiverId),
            CaregiverId: CaregiverProfileId.From(request.CaregiverId),
            StartTime: request.StartTime,
            EndTime: request.EndTime,
            Notes: request.Notes);

        var bookingId = await _mediator.Send(command, ct);

        return CreatedAtAction(
            nameof(GetById),
            new { id = bookingId.Value },
            new BookingCreatedResponse(bookingId.Value));
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id, CancellationToken ct)
    {
        var query = new GetBookingByIdQuery(BookingId.From(id));
        var result = await _mediator.Send(query, ct);
        return result is null ? NotFound() : Ok(result);
    }
}

// DTOs — never expose domain objects
public record CreateBookingRequest(
    Guid CareReceiverId,
    Guid CaregiverId,
    DateTime StartTime,
    DateTime EndTime,
    string? Notes);

public record BookingCreatedResponse(Guid Id);
```

**Notice**:
- Controller is thin — maps DTOs to commands, sends via MediatR, returns HTTP responses
- Domain objects (`Booking`, `BookingPeriod`, etc.) are never exposed to the API
- `[Authorize]` handles authentication — the domain doesn't care about HTTP

---

## Summary: The DDD Layer Cake

```
┌─────────────────────────────────────────────────┐
│  What You Built              Where It Lives      │
├─────────────────────────────────────────────────┤
│  Money, HourlyRate,          ICare.Domain        │
│  BookingPeriod,              (value objects)      │
│  PricingSnapshot                                 │
│                                                  │
│  UserId, BookingId,          ICare.Domain        │
│  CaregiverProfileId         (strongly-typed IDs) │
│                                                  │
│  CaregiverProfile,          ICare.Domain         │
│  Booking                    (aggregate roots)    │
│                                                  │
│  BookingStatus              ICare.Domain         │
│                             (smart enum)         │
│                                                  │
│  BookingRequestedEvent,     ICare.Domain         │
│  BookingCancelledEvent      (domain events)      │
│                                                  │
│  IBookingRepository,        ICare.Domain         │
│  IBookingOverlapChecker     (interfaces)         │
│                                                  │
│  RequestBookingCommand,     ICare.Application    │
│  RequestBookingHandler      (use case)           │
│                                                  │
│  BookingConfiguration,      ICare.Infrastructure │
│  BookingRepository          (persistence)        │
│                                                  │
│  BookingsController         ICare.WebApi         │
│                             (HTTP)               │
└─────────────────────────────────────────────────┘
```

The domain layer has **zero dependencies** on anything else. You can test it without a database, without a web server, without any framework. That's the promise of DDD — your business logic is isolated, testable, and expressed in the language of the business.

---

## Next Steps

After completing these tutorials:

1. **Build the remaining aggregates** — User, CareReceiverProfile, PaymentTransaction, Conversation, Review, SafeguardingIncident
2. **Implement the event handlers** — what happens when BookingRequestedEvent fires?
3. **Add the EF Core DbContext** — with the SaveChangesAsync override that dispatches domain events
4. **Set up the MediatR pipeline** — validation behaviour, logging behaviour
5. **Write integration tests** — test the full vertical slice with a real database

All of this follows the exact same patterns you learned in these tutorials. The Booking aggregate is the most complex — if you can build that, you can build anything in the system.
