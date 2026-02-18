namespace ICare.Domain.Identity.Events;

public record CaregiverProfileCreatedEvent(
  CaregiverProfileId ProfileId,
  UserId UserId) : IDomainEvent
{
  public DateTime OccurredAt { get; } = DateTime.UtcNow;
}
