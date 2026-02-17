using ICare.Domain.Common;
using ICare.Domain.Identity.ValueObjects;

namespace ICare.Domain.Identity;

public class CareReceiverProfile : AggregateRoot<CareReceiverProfileId>
{
  public UserId UserId { get; private set; }
  public bool IsFamilyMember { get; private set; }
  public string? Relationship { get; private set; }
  public string CareReceiverName { get; private set; }
  public string Postcode { get; private set; }
  public string AddressLine1 { get; private set; }
  public string AddressLine2 { get; private set; }
  public string City { get; private set; }
  public double? Latitude { get; private set; }
  public double? Longitude { get; private set; }
  public EmergencyContact? EmergencyContact { get; private set; }
  public List<string> PreferredServices { get; private set; } = [];
  public string? PreferredCaregiverGender { get; private set; }
  public List<string> PreferredLanguages { get; private set; } = [];
  public decimal? MaxHourlyRate { get; private set; }
  public DateTime UpdatedAt { get; private set; }
  public DateTime CreatedAt { get; private set; }
  public DateTime? DeletedAt { get; private set; }

  private CareReceiverProfile() { }

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
