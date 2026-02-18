namespace ICare.Domain.Identity.Events;

public record UserBannedEvent(
  UserId UserId,
  string Reason) : IDomainEvent
{
  public DateTime OccurredAt { get; } = DateTime.UtcNow;
}
