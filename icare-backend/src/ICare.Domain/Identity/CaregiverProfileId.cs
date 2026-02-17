namespace ICare.Domain.Identity;

public readonly record struct CaregiverProfileId(Guid Value)
{
  public static CaregiverProfileId New() => new(Guid.NewGuid());
}
