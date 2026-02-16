namespace ICare.Domain;

/// <summary>
/// Marker interface for domain events.
/// MediatR INotification is intentionally NOT referenced here —
/// the Domain layer has zero external dependencies.
/// The Application layer wraps these in MediatR notifications.
/// </summary>
public interface IDomainEvent
{
  DateTime OccurredAt { get; }
}
