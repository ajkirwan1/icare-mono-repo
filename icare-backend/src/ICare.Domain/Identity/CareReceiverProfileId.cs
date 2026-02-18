namespace ICare.Domain.Identity;

public readonly record struct CareReceiverProfileId(Guid Value)
{
  public static CareReceiverProfileId New() => new(Guid.NewGuid());
}
