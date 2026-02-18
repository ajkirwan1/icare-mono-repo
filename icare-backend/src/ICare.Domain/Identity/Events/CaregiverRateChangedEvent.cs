namespace ICare.Domain.Identity.Events;

public record CaregiverRateChangedEvent(
  CaregiverProfileId ProfileId,
  decimal OldRate,
  decimal NewRate) : IDomainEvent
{
  public DateTime OccurredAt { get; } = DateTime.UtcNow;
}
