using ICare.Domain.Identity.Enums;

namespace ICare.Domain.Identity.Events;

public record UserRegisteredEvent(
  UserId UserId,
  string Email,
  UserType UserType) : IDomainEvent
{
  public DateTime OccurredAt { get; } = DateTime.UtcNow;
}
