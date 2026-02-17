namespace ICare.Domain.Identity.Events;

public record UserSuspendedEvent(
  UserId UserId,
  int DurationDays,
  string Reason) : IDomainEvent
{
  public DateTime OccurredAt { get; } = DateTime.UtcNow;
}
