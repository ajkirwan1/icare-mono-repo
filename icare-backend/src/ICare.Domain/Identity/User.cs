using ICare.Domain.Identity.Enums;
using ICare.Domain.Identity.ValueObjects;
using ICare.Domain.Common;

namespace ICare.Domain.Identity;

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
  private User()
  {
  }

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
