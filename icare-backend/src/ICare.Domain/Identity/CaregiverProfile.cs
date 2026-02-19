using ICare.Domain.Common;
using ICare.Domain.Identity.Enums;
using ICare.Domain.Identity.Events;

namespace ICare.Domain.Identity;

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
