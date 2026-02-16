# DDD Tutorial: Building the Identity & Access Domain

> **Context**: This tutorial walks you through implementing the User, CareReceiverProfile, and CaregiverProfile aggregate roots — the three aggregates in the Identity & Access bounded context (DEC-001).
>
> **Prerequisites**: Read [ddd-tutorial.md](ddd-tutorial.md) tutorials 1-5 first. You should understand value objects, strongly-typed IDs, entities, aggregate roots, and domain events.
>
> **What you'll build**: Real production code that goes into `ICare.Domain/Identity/`.

---

## Table of Contents
1. [Context: Why 3 Aggregates?](#1-context-why-3-aggregates)
2. [Folder Structure](#2-folder-structure)
3. [Shared Building Blocks](#3-shared-building-blocks)P
4. [The User Aggregate](#4-the-user-aggregate)
5. [The CareReceiverProfile Aggregate](#5-the-carereceiverprofile-aggregate)
6. [The CaregiverProfile Aggregate](#6-the-caregiverprofile-aggregate)
7. [Repository Interfaces](#7-repository-interfaces)
8. [Domain Events](#8-domain-events)
9. [How the 3 Aggregates Interact](#9-how-the-3-aggregates-interact)
10. [Unit Tests](#10-unit-tests)
11. [EF Core Mapping](#11-ef-core-mapping)
12. [Common Mistakes](#12-common-mistakes)

---

## 1. Context: Why 3 Aggregates?

Per DEC-001, the Identity & Access context has 3 separate aggregate roots, not one:

| Aggregate | Why It's Separate |
|-----------|-------------------|
| **User** | Authentication concerns: email, password, phone, account status, login attempts |
| **CareReceiverProfile** | Changes independently (emergency contacts, preferences). Different invariants than auth. |
| **CaregiverProfile** | Changes 10x more frequently (availability, rates). Concurrency would conflict with User. |

The key insight: a caregiver updating their hourly rate shouldn't lock the row where their password hash lives. These are different change frequencies, different invariants, and different reasons to change.

**Cross-aggregate rule**: CareReceiverProfile and CaregiverProfile reference User by `UserId` only — never a navigation property. Creating a profile requires a valid User to exist, but that's enforced at the application layer, not inside the aggregate.

---

## 2. Folder Structure

```
ICare.Domain/
├── Common/
│   ├── Entity.cs              -- Base entity class
│   ├── AggregateRoot.cs       -- Base aggregate root class
│   ├── IDomainEvent.cs        -- Domain event marker interface
│   └── ValueObjects/
│       ├── Money.cs
│       ├── Email.cs
│       └── PhoneNumber.cs
├── Identity/
│   ├── UserId.cs              -- Strongly-typed ID
│   ├── User.cs                -- Aggregate root
│   ├── UserType.cs            -- Enum
│   ├── AccountStatus.cs       -- Enum
│   ├── SuspensionDetails.cs   -- Value object
│   ├── IUserRepository.cs     -- Repository interface
│   ├── CareReceiverProfileId.cs
│   ├── CareReceiverProfile.cs -- Aggregate root
│   ├── EmergencyContact.cs    -- Value object
│   ├── ICareReceiverProfileRepository.cs
│   ├── CaregiverProfileId.cs
│   ├── CaregiverProfile.cs   -- Aggregate root
│   ├── ServiceType.cs        -- Enum
│   ├── AvailabilitySlot.cs   -- Entity (child of CaregiverProfile)
│   ├── ICaregiverProfileRepository.cs
│   └── Events/
│       ├── UserRegisteredEvent.cs
│       ├── UserSuspendedEvent.cs
│       ├── CaregiverProfileCreatedEvent.cs
│       └── CaregiverRateChangedEvent.cs
```

---

## 3. Shared Building Blocks

Before building the Identity aggregates, we need base classes that all aggregates in every bounded context will share.

### 3.1 Domain Event Interface

Every domain event implements this marker interface. MediatR will use it for dispatch.

```csharp
namespace ICare.Domain.Common;

/// <summary>
/// Marker interface for domain events.
/// MediatR INotification is intentionally NOT referenced here —
/// the Domain layer has zero external dependencies.
/// The Application layer wraps these in MediatR notifications.
/// </summary>
public interface IDomainEvent
{
    DateTime OccurredAt { get; }
}
```

**Why no MediatR reference?** The Domain project has zero NuGet packages (DEC-003). MediatR lives in the Application layer. We'll bridge the gap with an adapter in Application.

### 3.2 Base Entity

```csharp
namespace ICare.Domain.Common;

public abstract class Entity<TId> where TId : struct
{
    public TId Id { get; protected set; }

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

**What this gives you**: Identity-based equality. Two entities with the same ID are the same entity, regardless of their other properties. This is fundamental to DDD — entities are defined by identity, value objects by attributes.

### 3.3 Base Aggregate Root

```csharp
namespace ICare.Domain.Common;

public abstract class AggregateRoot<TId> : Entity<TId> where TId : struct
{
    private readonly List<IDomainEvent> _domainEvents = [];

    public IReadOnlyCollection<IDomainEvent> DomainEvents => _domainEvents.AsReadOnly();

    protected void RaiseDomainEvent(IDomainEvent domainEvent)
    {
        _domainEvents.Add(domainEvent);
    }

    public void ClearDomainEvents()
    {
        _domainEvents.Clear();
    }
}
```

**What this gives you**: Every aggregate root can accumulate domain events during a business operation. After `SaveChangesAsync`, the EF Core DbContext override dispatches them. Then it calls `ClearDomainEvents()`.

**Why is `ClearDomainEvents()` public?** The Infrastructure layer (DbContext) needs to call it after dispatching. The Domain layer doesn't reference Infrastructure, so we expose it.

### 3.4 Email Value Object

```csharp
namespace ICare.Domain.Common.ValueObjects;

public record Email
{
    public string Value { get; }

    private Email(string value) => Value = value;

    public static Email Create(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
            throw new ArgumentException("Email cannot be empty.");

        email = email.Trim().ToLowerInvariant();

        if (email.Length > 255)
            throw new ArgumentException("Email cannot exceed 255 characters.");

        if (!email.Contains('@') || !email.Contains('.'))
            throw new ArgumentException("Email format is invalid.");

        return new Email(email);
    }

    public override string ToString() => Value;
}
```

**Design choice**: We normalise to lowercase in `Create`. This means `User@Example.com` and `user@example.com` always produce the same Email value object — which is what you want for uniqueness checks.

**Why throw exceptions?** In the Domain layer, an invalid email is a programmer error — it should never reach here because the Application layer validates first (FluentValidation). Domain exceptions are guardrails, not user-facing messages.

### 3.5 PhoneNumber Value Object

```csharp
namespace ICare.Domain.Common.ValueObjects;

public record PhoneNumber
{
    public string CountryCode { get; }
    public string Number { get; }

    private PhoneNumber(string countryCode, string number)
    {
        CountryCode = countryCode;
        Number = number;
    }

    public static PhoneNumber Create(string countryCode, string number)
    {
        if (string.IsNullOrWhiteSpace(number))
            throw new ArgumentException("Phone number cannot be empty.");

        // Strip spaces and dashes for storage
        number = number.Replace(" ", "").Replace("-", "");

        if (string.IsNullOrWhiteSpace(countryCode))
            countryCode = "+44"; // UK default

        return new PhoneNumber(countryCode, number);
    }

    public string FullNumber => $"{CountryCode}{Number}";

    public override string ToString() => FullNumber;
}
```

### 3.6 Money Value Object

```csharp
namespace ICare.Domain.Common.ValueObjects;

public record Money
{
    public decimal Amount { get; }
    public string Currency { get; }

    private Money(decimal amount, string currency)
    {
        Amount = amount;
        Currency = currency;
    }

    public static Money Create(decimal amount, string currency = "GBP")
    {
        if (amount < 0)
            throw new ArgumentException("Amount cannot be negative.");

        // Round to 2 decimal places
        amount = Math.Round(amount, 2, MidpointRounding.AwayFromZero);

        return new Money(amount, currency.ToUpperInvariant());
    }

    public static Money Zero(string currency = "GBP") => new(0m, currency);

    public Money Add(Money other)
    {
        if (Currency != other.Currency)
            throw new InvalidOperationException("Cannot add different currencies.");
        return new Money(Amount + other.Amount, Currency);
    }

    public Money Subtract(Money other)
    {
        if (Currency != other.Currency)
            throw new InvalidOperationException("Cannot subtract different currencies.");
        if (Amount - other.Amount < 0)
            throw new InvalidOperationException("Result cannot be negative.");
        return new Money(Amount - other.Amount, Currency);
    }

    public Money MultiplyBy(decimal factor)
        => new(Math.Round(Amount * factor, 2, MidpointRounding.AwayFromZero), Currency);
}
```

---

## 4. The User Aggregate

This is the authentication aggregate. It knows about emails, passwords, phone verification, account status, and login attempts. It does NOT know about care preferences, hourly rates, or availability.

### 4.1 Strongly-Typed ID

```csharp
namespace ICare.Domain.Identity;

public readonly record struct UserId(Guid Value)
{
    public static UserId New() => new(Guid.NewGuid());
}
```

**Why `readonly record struct`?** Per DEC-007:
- `readonly` — immutable, no field mutation after creation
- `record` — value equality (two `UserId` with same `Guid` are equal)
- `struct` — stack-allocated, no heap pressure for IDs passed everywhere

### 4.2 Enums

```csharp
namespace ICare.Domain.Identity;

public enum UserType
{
    CareReceiver,
    FamilyMember,
    Caregiver,
    Admin
}
```

```csharp
namespace ICare.Domain.Identity;

public enum AccountStatus
{
    Active,
    Suspended,
    Banned,
    Deactivated
}
```

### 4.3 SuspensionDetails Value Object

```csharp
namespace ICare.Domain.Identity;

public record SuspensionDetails
{
    public DateTime SuspendedAt { get; }
    public DateTime SuspensionEndDate { get; }
    public string Reason { get; }
    public UserId SuspendedBy { get; }

    private SuspensionDetails(DateTime suspendedAt, DateTime suspensionEndDate,
        string reason, UserId suspendedBy)
    {
        SuspendedAt = suspendedAt;
        SuspensionEndDate = suspensionEndDate;
        Reason = reason;
        SuspendedBy = suspendedBy;
    }

    public static SuspensionDetails Create(int durationDays, string reason, UserId adminId)
    {
        if (durationDays is not (7 or 14 or 30))
            throw new ArgumentException("Suspension must be 7, 14, or 30 days.");

        if (string.IsNullOrWhiteSpace(reason))
            throw new ArgumentException("Suspension reason is required.");

        return new SuspensionDetails(
            DateTime.UtcNow,
            DateTime.UtcNow.AddDays(durationDays),
            reason,
            adminId);
    }

    public bool IsExpired => DateTime.UtcNow > SuspensionEndDate;
}
```

**Notice**: Suspension is only 7, 14, or 30 days. That business rule lives in the value object — not in a controller, not in a service, not in a database constraint. If someone tries to create a 5-day suspension, it fails at the domain level.

### 4.4 The User Aggregate Root

```csharp
namespace ICare.Domain.Identity;

using ICare.Domain.Common;
using ICare.Domain.Common.ValueObjects;
using ICare.Domain.Identity.Events;

public class User : AggregateRoot<UserId>
{
    public Email Email { get; private set; }
    public string PasswordHash { get; private set; }
    public string FirstName { get; private set; }
    public string LastName { get; private set; }
    public PhoneNumber? Phone { get; private set; }
    public UserType UserType { get; private set; }
    public AccountStatus AccountStatus { get; private set; }
    public bool EmailVerified { get; private set; }
    public bool PhoneVerified { get; private set; }
    public SuspensionDetails? SuspensionDetails { get; private set; }
    public bool GdprConsent { get; private set; }
    public bool MarketingConsent { get; private set; }
    public int FailedLoginAttempts { get; private set; }
    public DateTime? AccountLockedUntil { get; private set; }
    public DateTime? LastLoginAt { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public DateTime UpdatedAt { get; private set; }
    public DateTime? DeletedAt { get; private set; }

    // EF Core needs a private parameterless constructor
    private User() { }

    /// <summary>
    /// Factory method — the ONLY way to create a User.
    /// </summary>
    public static User Register(
        Email email,
        string passwordHash,
        string firstName,
        string lastName,
        UserType userType,
        bool gdprConsent)
    {
        if (string.IsNullOrWhiteSpace(passwordHash))
            throw new ArgumentException("Password hash is required.");

        if (string.IsNullOrWhiteSpace(firstName))
            throw new ArgumentException("First name is required.");

        if (string.IsNullOrWhiteSpace(lastName))
            throw new ArgumentException("Last name is required.");

        if (!gdprConsent)
            throw new InvalidOperationException("GDPR consent is required to create an account.");

        var user = new User
        {
            Id = UserId.New(),
            Email = email,
            PasswordHash = passwordHash,
            FirstName = firstName.Trim(),
            LastName = lastName.Trim(),
            UserType = userType,
            AccountStatus = AccountStatus.Active,
            EmailVerified = false,
            PhoneVerified = false,
            GdprConsent = true,
            MarketingConsent = false,
            FailedLoginAttempts = 0,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        user.RaiseDomainEvent(new UserRegisteredEvent(
            user.Id, user.Email.Value, user.UserType));

        return user;
    }

    // ── Email Verification ──

    public void VerifyEmail()
    {
        if (EmailVerified)
            throw new InvalidOperationException("Email is already verified.");

        EmailVerified = true;
        UpdatedAt = DateTime.UtcNow;
    }

    // ── Phone ──

    public void SetPhone(PhoneNumber phone)
    {
        Phone = phone;
        PhoneVerified = false; // Must re-verify when phone changes
        UpdatedAt = DateTime.UtcNow;
    }

    public void VerifyPhone()
    {
        if (Phone is null)
            throw new InvalidOperationException("No phone number to verify.");

        PhoneVerified = true;
        UpdatedAt = DateTime.UtcNow;
    }

    // ── Login Tracking ──

    public void RecordSuccessfulLogin()
    {
        FailedLoginAttempts = 0;
        AccountLockedUntil = null;
        LastLoginAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
    }

    public void RecordFailedLogin()
    {
        FailedLoginAttempts++;

        if (FailedLoginAttempts >= 10)
        {
            AccountLockedUntil = DateTime.UtcNow.AddMinutes(15);
        }

        UpdatedAt = DateTime.UtcNow;
    }

    public bool IsLockedOut =>
        AccountLockedUntil.HasValue && AccountLockedUntil.Value > DateTime.UtcNow;

    // ── Account Status ──

    public void Suspend(int durationDays, string reason, UserId adminId)
    {
        if (AccountStatus == AccountStatus.Banned)
            throw new InvalidOperationException("Cannot suspend a banned user.");

        AccountStatus = AccountStatus.Suspended;
        SuspensionDetails = SuspensionDetails.Create(durationDays, reason, adminId);
        UpdatedAt = DateTime.UtcNow;

        RaiseDomainEvent(new UserSuspendedEvent(
            Id, durationDays, reason));
    }

    public void Unsuspend()
    {
        if (AccountStatus != AccountStatus.Suspended)
            throw new InvalidOperationException("User is not suspended.");

        AccountStatus = AccountStatus.Active;
        SuspensionDetails = null;
        UpdatedAt = DateTime.UtcNow;
    }

    public void Ban(string reason, UserId adminId)
    {
        AccountStatus = AccountStatus.Banned;
        SuspensionDetails = null; // Clear suspension if any
        UpdatedAt = DateTime.UtcNow;

        RaiseDomainEvent(new UserBannedEvent(Id, reason));
    }

    public void Deactivate()
    {
        AccountStatus = AccountStatus.Deactivated;
        UpdatedAt = DateTime.UtcNow;
    }

    // ── GDPR ──

    public void SoftDelete()
    {
        DeletedAt = DateTime.UtcNow;
        AccountStatus = AccountStatus.Deactivated;
        UpdatedAt = DateTime.UtcNow;
    }

    public bool IsDeleted => DeletedAt.HasValue;

    public bool CanLogin =>
        AccountStatus == AccountStatus.Active
        && !IsLockedOut
        && !IsDeleted;

    // ── Name Update ──

    public void UpdateName(string firstName, string lastName)
    {
        if (string.IsNullOrWhiteSpace(firstName))
            throw new ArgumentException("First name is required.");
        if (string.IsNullOrWhiteSpace(lastName))
            throw new ArgumentException("Last name is required.");

        FirstName = firstName.Trim();
        LastName = lastName.Trim();
        UpdatedAt = DateTime.UtcNow;
    }

    public void UpdatePassword(string newPasswordHash)
    {
        if (string.IsNullOrWhiteSpace(newPasswordHash))
            throw new ArgumentException("Password hash is required.");

        PasswordHash = newPasswordHash;
        UpdatedAt = DateTime.UtcNow;
    }

    public void SetMarketingConsent(bool consent)
    {
        MarketingConsent = consent;
        UpdatedAt = DateTime.UtcNow;
    }
}
```

### 4.5 Key Design Decisions Explained

**Private parameterless constructor**: EF Core needs it to hydrate entities from the database. Making it `private` means nobody else can use it — the only public way to create a User is `User.Register()`.

**Private setters on everything**: External code cannot set `AccountStatus = AccountStatus.Banned` directly. They must call `user.Ban(reason, adminId)`, which enforces invariants and raises domain events. This is the core of "rich domain model" vs "anemic domain model".

**Factory method `Register` returns a `User`**: No `new User()` from outside. The factory method enforces that every User starts with GDPR consent, active status, and raises a `UserRegisteredEvent`.

**`CanLogin` is a computed property**: It combines multiple checks (status, lockout, deletion) into a single readable property. The Application layer uses it — the Domain layer defines it.

**No password validation**: The User aggregate receives a `passwordHash`, not a plaintext password. Hashing happens in the Application/Infrastructure layer. The domain doesn't know about bcrypt — it just stores a hash.

---

## 5. The CareReceiverProfile Aggregate

This aggregate owns care receiver preferences, emergency contacts, and location. It references User by ID only.

### 5.1 Strongly-Typed ID

```csharp
namespace ICare.Domain.Identity;

public readonly record struct CareReceiverProfileId(Guid Value)
{
    public static CareReceiverProfileId New() => new(Guid.NewGuid());
}
```

### 5.2 EmergencyContact Value Object

```csharp
namespace ICare.Domain.Identity;

public record EmergencyContact
{
    public string Name { get; }
    public string Phone { get; }
    public string Relationship { get; }

    private EmergencyContact(string name, string phone, string relationship)
    {
        Name = name;
        Phone = phone;
        Relationship = relationship;
    }

    public static EmergencyContact Create(string name, string phone, string relationship)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Emergency contact name is required.");

        if (string.IsNullOrWhiteSpace(phone))
            throw new ArgumentException("Emergency contact phone is required.");

        if (string.IsNullOrWhiteSpace(relationship))
            throw new ArgumentException("Emergency contact relationship is required.");

        return new EmergencyContact(name.Trim(), phone.Trim(), relationship.Trim());
    }
}
```

**Why a value object?** An emergency contact doesn't have its own identity. You don't say "update emergency contact #7" — you say "change my emergency contact to Sarah, 07700900123, daughter". The whole thing is replaced atomically. That's value object semantics.

### 5.3 The CareReceiverProfile Aggregate Root

```csharp
namespace ICare.Domain.Identity;

using ICare.Domain.Common;

public class CareReceiverProfile : AggregateRoot<CareReceiverProfileId>
{
    public UserId UserId { get; private set; }
    public bool IsFamilyMember { get; private set; }
    public string? Relationship { get; private set; }
    public string? CareReceiverName { get; private set; }
    public string Postcode { get; private set; }
    public string? AddressLine1 { get; private set; }
    public string? City { get; private set; }
    public double? Latitude { get; private set; }
    public double? Longitude { get; private set; }
    public EmergencyContact? EmergencyContact { get; private set; }
    public List<string> PreferredServices { get; private set; } = [];
    public string? PreferredCaregiverGender { get; private set; }
    public List<string> PreferredLanguages { get; private set; } = [];
    public decimal? MaxHourlyRate { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public DateTime UpdatedAt { get; private set; }
    public DateTime? DeletedAt { get; private set; }

    private CareReceiverProfile() { }

    /// <summary>
    /// Create a profile for someone registering directly (not a family member).
    /// </summary>
    public static CareReceiverProfile CreateDirect(
        UserId userId,
        string postcode,
        EmergencyContact emergencyContact)
    {
        ValidatePostcode(postcode);

        return new CareReceiverProfile
        {
            Id = CareReceiverProfileId.New(),
            UserId = userId,
            IsFamilyMember = false,
            Postcode = postcode.Trim().ToUpperInvariant(),
            EmergencyContact = emergencyContact,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
    }

    /// <summary>
    /// Create a profile for a family member registering on behalf of a care receiver.
    /// </summary>
    public static CareReceiverProfile CreateForFamilyMember(
        UserId userId,
        string careReceiverName,
        string relationship,
        string postcode,
        EmergencyContact emergencyContact)
    {
        if (string.IsNullOrWhiteSpace(careReceiverName))
            throw new ArgumentException("Care receiver name is required for family member registration.");

        if (string.IsNullOrWhiteSpace(relationship))
            throw new ArgumentException("Relationship is required for family member registration.");

        ValidatePostcode(postcode);

        return new CareReceiverProfile
        {
            Id = CareReceiverProfileId.New(),
            UserId = userId,
            IsFamilyMember = true,
            CareReceiverName = careReceiverName.Trim(),
            Relationship = relationship.Trim(),
            Postcode = postcode.Trim().ToUpperInvariant(),
            EmergencyContact = emergencyContact,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
    }

    public void UpdateAddress(string postcode, string? addressLine1, string? city,
        double? latitude, double? longitude)
    {
        ValidatePostcode(postcode);

        Postcode = postcode.Trim().ToUpperInvariant();
        AddressLine1 = addressLine1?.Trim();
        City = city?.Trim();
        Latitude = latitude;
        Longitude = longitude;
        UpdatedAt = DateTime.UtcNow;
    }

    public void UpdateEmergencyContact(EmergencyContact contact)
    {
        EmergencyContact = contact ?? throw new ArgumentNullException(nameof(contact));
        UpdatedAt = DateTime.UtcNow;
    }

    public void UpdatePreferences(
        List<string>? preferredServices,
        string? preferredGender,
        List<string>? preferredLanguages,
        decimal? maxHourlyRate)
    {
        if (maxHourlyRate.HasValue && maxHourlyRate.Value <= 0)
            throw new ArgumentException("Max hourly rate must be positive.");

        PreferredServices = preferredServices ?? [];
        PreferredCaregiverGender = preferredGender;
        PreferredLanguages = preferredLanguages ?? [];
        MaxHourlyRate = maxHourlyRate;
        UpdatedAt = DateTime.UtcNow;
    }

    public void SoftDelete()
    {
        DeletedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
    }

    public bool IsComplete =>
        EmergencyContact is not null
        && !string.IsNullOrWhiteSpace(Postcode);

    private static void ValidatePostcode(string postcode)
    {
        if (string.IsNullOrWhiteSpace(postcode))
            throw new ArgumentException("Postcode is required.");
    }
}
```

**Two factory methods**: `CreateDirect` and `CreateForFamilyMember`. A family member profile requires extra fields (care receiver name, relationship). Rather than having a single constructor with optional parameters and hoping callers get it right, we make two explicit paths. You can't accidentally create a family member profile without a care receiver name.

**`IsComplete` property**: The profile might be created in stages (registration first, emergency contact later). This property lets the Application layer check completeness without knowing the rules.

---

## 6. The CaregiverProfile Aggregate

The most complex of the three. It owns services, pricing, location, availability, and rating aggregation.

### 6.1 Strongly-Typed ID

```csharp
namespace ICare.Domain.Identity;

public readonly record struct CaregiverProfileId(Guid Value)
{
    public static CaregiverProfileId New() => new(Guid.NewGuid());
}
```

### 6.2 ServiceType Enum

```csharp
namespace ICare.Domain.Identity;

public enum ServiceType
{
    Companionship,
    LightHousework,
    Shopping,
    MealPrep,
    Transportation
}
```

### 6.3 AvailabilitySlot Entity

This is a **child entity** inside the CaregiverProfile aggregate. It has its own identity (so you can update a specific slot) but can only be accessed through CaregiverProfile.

```csharp
namespace ICare.Domain.Identity;

using ICare.Domain.Common;

public class AvailabilitySlot : Entity<Guid>
{
    public DayOfWeek DayOfWeek { get; private set; }
    public TimeOnly StartTime { get; private set; }
    public TimeOnly EndTime { get; private set; }

    private AvailabilitySlot() { }

    internal static AvailabilitySlot Create(DayOfWeek day, TimeOnly start, TimeOnly end)
    {
        if (end <= start)
            throw new ArgumentException("End time must be after start time.");

        return new AvailabilitySlot
        {
            Id = Guid.NewGuid(),
            DayOfWeek = day,
            StartTime = start,
            EndTime = end
        };
    }

    public decimal DurationHours =>
        (decimal)(EndTime.ToTimeSpan() - StartTime.ToTimeSpan()).TotalHours;

    internal bool OverlapsWith(AvailabilitySlot other)
    {
        if (DayOfWeek != other.DayOfWeek) return false;
        return StartTime < other.EndTime && EndTime > other.StartTime;
    }
}
```

**`internal` constructor**: Only code within `ICare.Domain` can create an AvailabilitySlot. Outside callers go through `CaregiverProfile.AddAvailabilitySlot()`. This enforces that the aggregate root is the gatekeeper.

### 6.4 ProfileStatus Enum

```csharp
namespace ICare.Domain.Identity;

public enum ProfileStatus
{
    Draft,
    PendingVerification,
    Approved,
    Suspended,
    Deactivated
}
```

### 6.5 The CaregiverProfile Aggregate Root

```csharp
namespace ICare.Domain.Identity;

using ICare.Domain.Common;
using ICare.Domain.Common.ValueObjects;
using ICare.Domain.Identity.Events;

public class CaregiverProfile : AggregateRoot<CaregiverProfileId>
{
    private readonly List<AvailabilitySlot> _availabilitySlots = [];
    private readonly List<ServiceType> _servicesOffered = [];
    private readonly List<string> _languagesSpoken = [];

    public UserId UserId { get; private set; }
    public string? Bio { get; private set; }
    public string? ProfilePhotoUrl { get; private set; }
    public IReadOnlyCollection<ServiceType> ServicesOffered => _servicesOffered.AsReadOnly();
    public Money HourlyRate { get; private set; }
    public int ServiceRadiusMiles { get; private set; }
    public string Postcode { get; private set; }
    public double Latitude { get; private set; }
    public double Longitude { get; private set; }
    public IReadOnlyCollection<string> LanguagesSpoken => _languagesSpoken.AsReadOnly();
    public string? Gender { get; private set; }
    public bool HasVehicle { get; private set; }
    public decimal AverageRating { get; private set; }
    public int TotalReviews { get; private set; }
    public int MinimumBookingHours { get; private set; }
    public ProfileStatus ProfileStatus { get; private set; }
    public string? StripeConnectAccountId { get; private set; }
    public bool StripeOnboardingComplete { get; private set; }
    public IReadOnlyCollection<AvailabilitySlot> AvailabilitySlots => _availabilitySlots.AsReadOnly();
    public DateTime CreatedAt { get; private set; }
    public DateTime UpdatedAt { get; private set; }
    public DateTime? DeletedAt { get; private set; }

    private CaregiverProfile() { }

    public static CaregiverProfile Create(
        UserId userId,
        Money hourlyRate,
        string postcode,
        double latitude,
        double longitude,
        int serviceRadiusMiles)
    {
        ValidateHourlyRate(hourlyRate);
        ValidateServiceRadius(serviceRadiusMiles);

        if (string.IsNullOrWhiteSpace(postcode))
            throw new ArgumentException("Postcode is required.");

        var profile = new CaregiverProfile
        {
            Id = CaregiverProfileId.New(),
            UserId = userId,
            HourlyRate = hourlyRate,
            Postcode = postcode.Trim().ToUpperInvariant(),
            Latitude = latitude,
            Longitude = longitude,
            ServiceRadiusMiles = serviceRadiusMiles,
            MinimumBookingHours = 2, // Tier 1 default
            ProfileStatus = ProfileStatus.Draft,
            AverageRating = 0m,
            TotalReviews = 0,
            HasVehicle = false,
            StripeOnboardingComplete = false,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        profile.RaiseDomainEvent(new CaregiverProfileCreatedEvent(profile.Id, userId));

        return profile;
    }

    // ── Services ──

    public void SetServicesOffered(IEnumerable<ServiceType> services)
    {
        var serviceList = services.Distinct().ToList();
        if (serviceList.Count == 0)
            throw new ArgumentException("At least one service must be offered.");

        _servicesOffered.Clear();
        _servicesOffered.AddRange(serviceList);
        UpdatedAt = DateTime.UtcNow;
    }

    // ── Pricing ──

    public void UpdateHourlyRate(Money newRate)
    {
        ValidateHourlyRate(newRate);

        var oldRate = HourlyRate;
        HourlyRate = newRate;
        UpdatedAt = DateTime.UtcNow;

        RaiseDomainEvent(new CaregiverRateChangedEvent(
            Id, oldRate.Amount, newRate.Amount));
    }

    // ── Bio & Photo ──

    public void UpdateBio(string bio)
    {
        if (bio?.Length > 500)
            throw new ArgumentException("Bio cannot exceed 500 characters.");

        Bio = bio?.Trim();
        UpdatedAt = DateTime.UtcNow;
    }

    public void SetProfilePhoto(string url)
    {
        ProfilePhotoUrl = url;
        UpdatedAt = DateTime.UtcNow;
    }

    // ── Location ──

    public void UpdateLocation(string postcode, double latitude, double longitude,
        int serviceRadiusMiles)
    {
        ValidateServiceRadius(serviceRadiusMiles);

        Postcode = postcode.Trim().ToUpperInvariant();
        Latitude = latitude;
        Longitude = longitude;
        ServiceRadiusMiles = serviceRadiusMiles;
        UpdatedAt = DateTime.UtcNow;
    }

    // ── Languages ──

    public void SetLanguages(IEnumerable<string> languages)
    {
        _languagesSpoken.Clear();
        _languagesSpoken.AddRange(languages.Select(l => l.Trim().ToLowerInvariant()).Distinct());
        UpdatedAt = DateTime.UtcNow;
    }

    // ── Demographics ──

    public void SetGender(string? gender)
    {
        Gender = gender;
        UpdatedAt = DateTime.UtcNow;
    }

    public void SetVehicleStatus(bool hasVehicle)
    {
        HasVehicle = hasVehicle;
        UpdatedAt = DateTime.UtcNow;
    }

    // ── Availability ──

    public void AddAvailabilitySlot(DayOfWeek day, TimeOnly start, TimeOnly end)
    {
        var newSlot = AvailabilitySlot.Create(day, start, end);

        // Invariant: slots must not overlap
        if (_availabilitySlots.Any(existing => existing.OverlapsWith(newSlot)))
            throw new InvalidOperationException(
                $"Availability slot overlaps with an existing slot on {day}.");

        _availabilitySlots.Add(newSlot);
        UpdatedAt = DateTime.UtcNow;
    }

    public void RemoveAvailabilitySlot(Guid slotId)
    {
        var slot = _availabilitySlots.FirstOrDefault(s => s.Id == slotId)
            ?? throw new InvalidOperationException("Availability slot not found.");

        _availabilitySlots.Remove(slot);
        UpdatedAt = DateTime.UtcNow;
    }

    public void ClearAvailability()
    {
        _availabilitySlots.Clear();
        UpdatedAt = DateTime.UtcNow;
    }

    public decimal TotalWeeklyHours =>
        _availabilitySlots.Sum(s => s.DurationHours);

    // ── Ratings ──

    public void UpdateRating(decimal newAverageRating, int newTotalReviews)
    {
        if (newAverageRating < 0 || newAverageRating > 5)
            throw new ArgumentException("Average rating must be between 0 and 5.");

        AverageRating = Math.Round(newAverageRating, 2);
        TotalReviews = newTotalReviews;
        UpdatedAt = DateTime.UtcNow;
    }

    // ── Stripe ──

    public void SetStripeConnectAccountId(string stripeAccountId)
    {
        if (string.IsNullOrWhiteSpace(stripeAccountId))
            throw new ArgumentException("Stripe account ID is required.");

        StripeConnectAccountId = stripeAccountId;
        UpdatedAt = DateTime.UtcNow;
    }

    public void CompleteStripeOnboarding()
    {
        if (string.IsNullOrWhiteSpace(StripeConnectAccountId))
            throw new InvalidOperationException("Stripe account must be set before completing onboarding.");

        StripeOnboardingComplete = true;
        UpdatedAt = DateTime.UtcNow;
    }

    // ── Profile Status ──

    public void SubmitForVerification()
    {
        if (ProfileStatus != ProfileStatus.Draft)
            throw new InvalidOperationException("Only draft profiles can be submitted for verification.");

        if (_servicesOffered.Count == 0)
            throw new InvalidOperationException("Must offer at least one service before submitting.");

        ProfileStatus = ProfileStatus.PendingVerification;
        UpdatedAt = DateTime.UtcNow;
    }

    public void Approve()
    {
        if (ProfileStatus != ProfileStatus.PendingVerification)
            throw new InvalidOperationException("Only pending profiles can be approved.");

        ProfileStatus = ProfileStatus.Approved;
        UpdatedAt = DateTime.UtcNow;
    }

    public void SuspendProfile()
    {
        ProfileStatus = ProfileStatus.Suspended;
        UpdatedAt = DateTime.UtcNow;
    }

    public void ReactivateProfile()
    {
        if (ProfileStatus != ProfileStatus.Suspended)
            throw new InvalidOperationException("Only suspended profiles can be reactivated.");

        ProfileStatus = ProfileStatus.Approved;
        UpdatedAt = DateTime.UtcNow;
    }

    public void Deactivate()
    {
        ProfileStatus = ProfileStatus.Deactivated;
        UpdatedAt = DateTime.UtcNow;
    }

    public void SoftDelete()
    {
        DeletedAt = DateTime.UtcNow;
        ProfileStatus = ProfileStatus.Deactivated;
        UpdatedAt = DateTime.UtcNow;
    }

    public bool IsSearchable =>
        ProfileStatus == ProfileStatus.Approved
        && !DeletedAt.HasValue;

    // ── Validation Helpers ──

    private static void ValidateHourlyRate(Money rate)
    {
        if (rate.Amount < 10m || rate.Amount > 100m)
            throw new ArgumentException("Hourly rate must be between £10 and £100.");
    }

    private static void ValidateServiceRadius(int miles)
    {
        if (miles < 1 || miles > 50)
            throw new ArgumentException("Service radius must be between 1 and 50 miles.");
    }
}
```

### 6.6 Key Design Decisions Explained

**Private backing collections with public `IReadOnlyCollection`**: `_servicesOffered` is a `List<ServiceType>` internally, but exposed as `IReadOnlyCollection<ServiceType>`. External code cannot call `.Add()` on the collection — they must go through `SetServicesOffered()`, which enforces "at least one service" and deduplication.

**`AddAvailabilitySlot` enforces no-overlap**: The overlap check happens inside the aggregate, not in a service or controller. If you try to add a Monday 9-12 slot when Monday 10-14 already exists, the aggregate refuses. This is an invariant — it must always be true.

**`TotalWeeklyHours` is computed**: Rather than storing this separately (and risking it getting out of sync), we derive it from the actual slots. The Application layer can use this to enforce the "minimum 4 hours per week" rule before submission.

**Rating is updated externally**: The CaregiverProfile doesn't calculate its own rating — the Review context does that and passes the result here. The profile just validates the range and stores it. This respects bounded context boundaries.

---

## 7. Repository Interfaces

Repository interfaces live in the Domain layer. Implementations live in Infrastructure.

```csharp
namespace ICare.Domain.Identity;

public interface IUserRepository
{
    Task<User?> GetByIdAsync(UserId id, CancellationToken ct = default);
    Task<User?> GetByEmailAsync(string email, CancellationToken ct = default);
    Task<bool> ExistsWithEmailAsync(string email, CancellationToken ct = default);
    Task AddAsync(User user, CancellationToken ct = default);
    void Update(User user);
}
```

```csharp
namespace ICare.Domain.Identity;

public interface ICareReceiverProfileRepository
{
    Task<CareReceiverProfile?> GetByIdAsync(CareReceiverProfileId id, CancellationToken ct = default);
    Task<CareReceiverProfile?> GetByUserIdAsync(UserId userId, CancellationToken ct = default);
    Task AddAsync(CareReceiverProfile profile, CancellationToken ct = default);
    void Update(CareReceiverProfile profile);
}
```

```csharp
namespace ICare.Domain.Identity;

public interface ICaregiverProfileRepository
{
    Task<CaregiverProfile?> GetByIdAsync(CaregiverProfileId id, CancellationToken ct = default);
    Task<CaregiverProfile?> GetByUserIdAsync(UserId userId, CancellationToken ct = default);
    Task AddAsync(CaregiverProfile profile, CancellationToken ct = default);
    void Update(CaregiverProfile profile);
}
```

**Why `void Update()`?** EF Core tracks changes automatically. You load an entity, call methods on it, and `SaveChangesAsync` persists the changes. The `Update` method is there to make intent explicit and to support non-EF Core implementations.

**Why no `Delete`?** We use soft deletes (`.SoftDelete()` on the aggregate). The entity stays in the database with a `DeletedAt` timestamp. The repository's `GetById` should filter out soft-deleted records.

---

## 8. Domain Events

Domain events notify other parts of the system that something happened. They are raised inside aggregate methods and dispatched after `SaveChangesAsync`.

```csharp
namespace ICare.Domain.Identity.Events;

using ICare.Domain.Common;

public record UserRegisteredEvent(
    UserId UserId,
    string Email,
    UserType UserType) : IDomainEvent
{
    public DateTime OccurredAt { get; } = DateTime.UtcNow;
}
```

```csharp
namespace ICare.Domain.Identity.Events;

using ICare.Domain.Common;

public record UserSuspendedEvent(
    UserId UserId,
    int DurationDays,
    string Reason) : IDomainEvent
{
    public DateTime OccurredAt { get; } = DateTime.UtcNow;
}
```

```csharp
namespace ICare.Domain.Identity.Events;

using ICare.Domain.Common;

public record UserBannedEvent(
    UserId UserId,
    string Reason) : IDomainEvent
{
    public DateTime OccurredAt { get; } = DateTime.UtcNow;
}
```

```csharp
namespace ICare.Domain.Identity.Events;

using ICare.Domain.Common;

public record CaregiverProfileCreatedEvent(
    CaregiverProfileId ProfileId,
    UserId UserId) : IDomainEvent
{
    public DateTime OccurredAt { get; } = DateTime.UtcNow;
}
```

```csharp
namespace ICare.Domain.Identity.Events;

using ICare.Domain.Common;

public record CaregiverRateChangedEvent(
    CaregiverProfileId ProfileId,
    decimal OldRate,
    decimal NewRate) : IDomainEvent
{
    public DateTime OccurredAt { get; } = DateTime.UtcNow;
}
```

**Why records?** Events are immutable facts. A record gives you immutability, value equality, and clean `ToString()` output for logging — all for free.

**Who consumes these?** Event handlers in the Application layer. For example:
- `UserRegisteredEvent` → send welcome email, create verification record at L0
- `UserSuspendedEvent` → cancel active bookings, hide profile from search, send notification
- `CaregiverProfileCreatedEvent` → create verification record in Verification context

---

## 9. How the 3 Aggregates Interact

They don't — not directly. That's the point.

```
┌─────────────────────────────────────────────────┐
│                Application Layer                 │
│                                                  │
│  RegisterCaregiverCommandHandler:                │
│    1. Check email uniqueness (IUserRepository)   │
│    2. user = User.Register(...)                  │
│    3. profile = CaregiverProfile.Create(...)     │
│    4. await _userRepo.AddAsync(user)             │
│    5. await _profileRepo.AddAsync(profile)       │
│    6. await _unitOfWork.SaveChangesAsync()        │
│       ↓                                          │
│    Events dispatched:                            │
│    - UserRegisteredEvent                         │
│    - CaregiverProfileCreatedEvent                │
└─────────────────────────────────────────────────┘
```

**Key rule**: The Application layer coordinates across aggregates. The aggregates themselves only know their own data and reference other aggregates by ID.

**Same transaction?** Yes, at Tier 1. Both `User` and `CaregiverProfile` are saved in the same `SaveChangesAsync` call. If either fails, both roll back. This is acceptable because they're in the same bounded context and same database.

**What about cross-context?** When `UserSuspendedEvent` needs to cancel bookings (Booking context) and hide the profile (Search context), those handlers run in-process via MediatR after the User save succeeds. If a handler fails, it doesn't roll back the suspension — it's eventually consistent.

---

## 10. Unit Tests

### 10.1 User Tests

```csharp
namespace ICare.Domain.Tests.Identity;

using FluentAssertions;
using ICare.Domain.Common.ValueObjects;
using ICare.Domain.Identity;

public class UserTests
{
    [Fact]
    public void Register_WithValidData_CreatesActiveUser()
    {
        var email = Email.Create("test@example.com");

        var user = User.Register(email, "hashed_pw", "John", "Doe",
            UserType.CareReceiver, gdprConsent: true);

        user.Id.Value.Should().NotBeEmpty();
        user.Email.Should().Be(email);
        user.FirstName.Should().Be("John");
        user.AccountStatus.Should().Be(AccountStatus.Active);
        user.EmailVerified.Should().BeFalse();
        user.PhoneVerified.Should().BeFalse();
    }

    [Fact]
    public void Register_WithoutGdprConsent_Throws()
    {
        var email = Email.Create("test@example.com");

        var act = () => User.Register(email, "hashed_pw", "John", "Doe",
            UserType.CareReceiver, gdprConsent: false);

        act.Should().Throw<InvalidOperationException>()
            .WithMessage("*GDPR consent*");
    }

    [Fact]
    public void Register_RaisesUserRegisteredEvent()
    {
        var email = Email.Create("test@example.com");

        var user = User.Register(email, "hashed_pw", "John", "Doe",
            UserType.Caregiver, gdprConsent: true);

        user.DomainEvents.Should().ContainSingle()
            .Which.Should().BeOfType<Events.UserRegisteredEvent>()
            .Which.UserType.Should().Be(UserType.Caregiver);
    }

    [Fact]
    public void RecordFailedLogin_After10Attempts_LocksAccount()
    {
        var user = CreateTestUser();

        for (int i = 0; i < 10; i++)
            user.RecordFailedLogin();

        user.IsLockedOut.Should().BeTrue();
        user.CanLogin.Should().BeFalse();
    }

    [Fact]
    public void Suspend_BannedUser_Throws()
    {
        var user = CreateTestUser();
        var adminId = UserId.New();
        user.Ban("violating terms", adminId);

        var act = () => user.Suspend(7, "repeated offence", adminId);

        act.Should().Throw<InvalidOperationException>()
            .WithMessage("*Cannot suspend a banned user*");
    }

    [Fact]
    public void Suspend_RaisesUserSuspendedEvent()
    {
        var user = CreateTestUser();
        var adminId = UserId.New();

        user.Suspend(14, "spam reports", adminId);

        user.AccountStatus.Should().Be(AccountStatus.Suspended);
        user.DomainEvents.Should().HaveCount(2); // Registered + Suspended
        user.DomainEvents.Last().Should().BeOfType<Events.UserSuspendedEvent>();
    }

    [Fact]
    public void CanLogin_WhenActive_ReturnsTrue()
    {
        var user = CreateTestUser();
        user.CanLogin.Should().BeTrue();
    }

    [Fact]
    public void CanLogin_WhenSuspended_ReturnsFalse()
    {
        var user = CreateTestUser();
        user.Suspend(7, "test", UserId.New());
        user.CanLogin.Should().BeFalse();
    }

    private static User CreateTestUser()
    {
        return User.Register(
            Email.Create("test@example.com"),
            "hashed_password",
            "John", "Doe",
            UserType.CareReceiver,
            gdprConsent: true);
    }
}
```

### 10.2 CaregiverProfile Tests

```csharp
namespace ICare.Domain.Tests.Identity;

using FluentAssertions;
using ICare.Domain.Common.ValueObjects;
using ICare.Domain.Identity;

public class CaregiverProfileTests
{
    [Fact]
    public void Create_WithValidData_CreatesDraftProfile()
    {
        var profile = CreateTestProfile();

        profile.ProfileStatus.Should().Be(ProfileStatus.Draft);
        profile.HourlyRate.Amount.Should().Be(20m);
        profile.ServiceRadiusMiles.Should().Be(15);
        profile.AverageRating.Should().Be(0m);
    }

    [Fact]
    public void Create_WithRateBelow10_Throws()
    {
        var act = () => CaregiverProfile.Create(
            UserId.New(), Money.Create(5m), "SW1A 1AA",
            51.5014, -0.1419, 15);

        act.Should().Throw<ArgumentException>()
            .WithMessage("*between £10 and £100*");
    }

    [Fact]
    public void Create_WithRateAbove100_Throws()
    {
        var act = () => CaregiverProfile.Create(
            UserId.New(), Money.Create(150m), "SW1A 1AA",
            51.5014, -0.1419, 15);

        act.Should().Throw<ArgumentException>()
            .WithMessage("*between £10 and £100*");
    }

    [Fact]
    public void AddAvailabilitySlot_NoOverlap_Succeeds()
    {
        var profile = CreateTestProfile();

        profile.AddAvailabilitySlot(DayOfWeek.Monday,
            new TimeOnly(9, 0), new TimeOnly(12, 0));
        profile.AddAvailabilitySlot(DayOfWeek.Monday,
            new TimeOnly(14, 0), new TimeOnly(17, 0));

        profile.AvailabilitySlots.Should().HaveCount(2);
        profile.TotalWeeklyHours.Should().Be(6m);
    }

    [Fact]
    public void AddAvailabilitySlot_WithOverlap_Throws()
    {
        var profile = CreateTestProfile();
        profile.AddAvailabilitySlot(DayOfWeek.Monday,
            new TimeOnly(9, 0), new TimeOnly(12, 0));

        var act = () => profile.AddAvailabilitySlot(DayOfWeek.Monday,
            new TimeOnly(11, 0), new TimeOnly(14, 0));

        act.Should().Throw<InvalidOperationException>()
            .WithMessage("*overlaps*");
    }

    [Fact]
    public void SubmitForVerification_WithoutServices_Throws()
    {
        var profile = CreateTestProfile();
        // No services set

        var act = () => profile.SubmitForVerification();

        act.Should().Throw<InvalidOperationException>()
            .WithMessage("*at least one service*");
    }

    [Fact]
    public void SubmitForVerification_WithServices_TransitionsToPending()
    {
        var profile = CreateTestProfile();
        profile.SetServicesOffered([ServiceType.Companionship]);

        profile.SubmitForVerification();

        profile.ProfileStatus.Should().Be(ProfileStatus.PendingVerification);
    }

    [Fact]
    public void UpdateHourlyRate_RaisesEvent()
    {
        var profile = CreateTestProfile();

        profile.UpdateHourlyRate(Money.Create(25m));

        profile.HourlyRate.Amount.Should().Be(25m);
        profile.DomainEvents.Should().HaveCount(2); // Created + RateChanged
    }

    [Fact]
    public void UpdateBio_Over500Characters_Throws()
    {
        var profile = CreateTestProfile();
        var longBio = new string('x', 501);

        var act = () => profile.UpdateBio(longBio);

        act.Should().Throw<ArgumentException>()
            .WithMessage("*500 characters*");
    }

    private static CaregiverProfile CreateTestProfile()
    {
        return CaregiverProfile.Create(
            UserId.New(),
            Money.Create(20m),
            "SW1A 1AA",
            51.5014,
            -0.1419,
            15);
    }
}
```

**Pattern**: Each test follows Arrange-Act-Assert. We test invariants (rate bounds, overlap detection, service requirements), state transitions (draft → pending), and event raising. No mocking needed — domain tests are pure logic.

---

## 11. EF Core Mapping

This goes in `ICare.Infrastructure`. Each aggregate root gets its own `IEntityTypeConfiguration<T>`.

### 11.1 User Mapping

```csharp
namespace ICare.Infrastructure.Identity;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ICare.Domain.Identity;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("users");

        // Strongly-typed ID
        builder.HasKey(u => u.Id);
        builder.Property(u => u.Id)
            .HasConversion(
                id => id.Value,           // UserId → Guid (to database)
                guid => new UserId(guid)) // Guid → UserId (from database)
            .HasColumnName("id");

        // Email value object → single column
        builder.Property(u => u.Email)
            .HasConversion(
                email => email.Value,
                value => Email.Create(value))
            .HasColumnName("email")
            .HasMaxLength(255)
            .IsRequired();

        builder.HasIndex(u => u.Email).IsUnique();

        // Phone value object → owned entity (two columns)
        builder.OwnsOne(u => u.Phone, phone =>
        {
            phone.Property(p => p.CountryCode).HasColumnName("phone_country_code").HasMaxLength(5);
            phone.Property(p => p.Number).HasColumnName("phone").HasMaxLength(20);
        });

        // SuspensionDetails → owned entity
        builder.OwnsOne(u => u.SuspensionDetails, sd =>
        {
            sd.Property(s => s.SuspendedAt).HasColumnName("suspended_at");
            sd.Property(s => s.SuspensionEndDate).HasColumnName("suspension_end_date");
            sd.Property(s => s.Reason).HasColumnName("suspension_reason");
            sd.Property(s => s.SuspendedBy)
                .HasConversion(id => id.Value, guid => new UserId(guid))
                .HasColumnName("suspended_by");
        });

        // Enums as strings
        builder.Property(u => u.UserType)
            .HasConversion<string>()
            .HasColumnName("user_type")
            .HasMaxLength(20);

        builder.Property(u => u.AccountStatus)
            .HasConversion<string>()
            .HasColumnName("account_status")
            .HasMaxLength(20);

        // Simple properties
        builder.Property(u => u.PasswordHash).HasColumnName("password_hash").HasMaxLength(255).IsRequired();
        builder.Property(u => u.FirstName).HasColumnName("first_name").HasMaxLength(100).IsRequired();
        builder.Property(u => u.LastName).HasColumnName("last_name").HasMaxLength(100).IsRequired();
        builder.Property(u => u.EmailVerified).HasColumnName("email_verified");
        builder.Property(u => u.PhoneVerified).HasColumnName("phone_verified");
        builder.Property(u => u.GdprConsent).HasColumnName("gdpr_consent");
        builder.Property(u => u.MarketingConsent).HasColumnName("marketing_consent");
        builder.Property(u => u.FailedLoginAttempts).HasColumnName("failed_login_attempts");
        builder.Property(u => u.AccountLockedUntil).HasColumnName("account_locked_until");
        builder.Property(u => u.LastLoginAt).HasColumnName("last_login_at");
        builder.Property(u => u.CreatedAt).HasColumnName("created_at");
        builder.Property(u => u.UpdatedAt).HasColumnName("updated_at");
        builder.Property(u => u.DeletedAt).HasColumnName("deleted_at");

        // Global query filter: exclude soft-deleted
        builder.HasQueryFilter(u => u.DeletedAt == null);

        // Ignore domain events (not persisted)
        builder.Ignore(u => u.DomainEvents);
    }
}
```

**Key mappings**:
- `UserId` uses a **value converter** (struct → Guid → database UUID)
- `Email` uses a **value converter** (value object → string)
- `PhoneNumber` uses **OwnsOne** (value object → two columns in the same table)
- `SuspensionDetails` uses **OwnsOne** (nullable value object → columns with NULL when no suspension)
- Enums are stored as **strings** (readable in the database, survives enum reordering)
- `HasQueryFilter` automatically excludes soft-deleted users from all queries

---

## 12. Common Mistakes

### Mistake 1: Navigation Properties Between Aggregates

```csharp
// WRONG — creates coupling between aggregates
public class CaregiverProfile : AggregateRoot<CaregiverProfileId>
{
    public User User { get; private set; } // ← NO! This is a navigation property
}

// RIGHT — reference by ID only
public class CaregiverProfile : AggregateRoot<CaregiverProfileId>
{
    public UserId UserId { get; private set; } // ← Just the ID
}
```

If you add a navigation property, EF Core will load the User when you load the CaregiverProfile. That defeats the purpose of separate aggregates — you wanted smaller transactions and independent change frequency.

### Mistake 2: Enforcing Cross-Aggregate Rules Inside an Aggregate

```csharp
// WRONG — CaregiverProfile shouldn't know about User
public static CaregiverProfile Create(User user, ...)
{
    if (user.AccountStatus != AccountStatus.Active)
        throw new Exception("User must be active");
    // ...
}

// RIGHT — Application layer checks this
public class CreateCaregiverProfileHandler
{
    public async Task Handle(CreateCaregiverProfileCommand cmd)
    {
        var user = await _userRepo.GetByIdAsync(cmd.UserId);
        if (user is null || !user.CanLogin)
            throw new ApplicationException("User not found or inactive.");

        var profile = CaregiverProfile.Create(cmd.UserId, ...);
        // ...
    }
}
```

### Mistake 3: Anemic Domain Model

```csharp
// WRONG — public setters, no invariants
public class User
{
    public AccountStatus AccountStatus { get; set; }
    public SuspensionDetails? SuspensionDetails { get; set; }
}

// Anyone can write:
user.AccountStatus = AccountStatus.Banned;
user.SuspensionDetails = null;
// No event raised, no validation, no audit trail

// RIGHT — behaviour through methods
user.Ban("reason", adminId); // Validates, sets status, raises event
```

### Mistake 4: Storing Computed Values

```csharp
// WRONG — stored separately, can get out of sync
public decimal TotalWeeklyHours { get; private set; }

public void AddAvailabilitySlot(...)
{
    _slots.Add(slot);
    TotalWeeklyHours = _slots.Sum(s => s.DurationHours); // Easy to forget!
}

// RIGHT — always derive from source data
public decimal TotalWeeklyHours => _availabilitySlots.Sum(s => s.DurationHours);
```

### Mistake 5: Putting Business Logic in Event Handlers

```csharp
// WRONG — critical business rule outside the aggregate
public class UserSuspendedEventHandler
{
    public async Task Handle(UserSuspendedEvent e)
    {
        var profile = await _profileRepo.GetByUserIdAsync(e.UserId);
        profile.ProfileStatus = ProfileStatus.Suspended; // Direct set!
    }
}

// RIGHT — the handler calls a method on the other aggregate
public class UserSuspendedEventHandler
{
    public async Task Handle(UserSuspendedEvent e)
    {
        var profile = await _profileRepo.GetByUserIdAsync(e.UserId);
        if (profile is not null)
        {
            profile.SuspendProfile(); // Method with invariants
            _profileRepo.Update(profile);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}
```

---

## Next Steps

Now that you have the Identity & Access domain implemented:

1. **Create the actual files** in `ICare.Domain/Common/` and `ICare.Domain/Identity/` following the folder structure in section 2
2. **Write the EF Core mappings** in `ICare.Infrastructure/Identity/`
3. **Write command handlers** in `ICare.Application/Identity/` (e.g., `RegisterUserCommand`, `CreateCaregiverProfileCommand`)
4. **Move to the Booking context** — the next tutorial will cover the 14-state booking aggregate
