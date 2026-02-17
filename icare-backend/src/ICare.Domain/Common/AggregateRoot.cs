namespace ICare.Domain.Common;

public abstract class AggregateRoot<TId> : BaseEntity<TId> where TId : struct
{
  private readonly List<IDomainEvent> _domainEvents = new List<IDomainEvent>();

  public IReadOnlyCollection<IDomainEvent> DomainEvents => _domainEvents.AsReadOnly();

  protected void RaiseDomainEvent(IDomainEvent domainEvent)
  {
    _domainEvents.Add(domainEvent);
  }

  public void ClearDomainEvents()
  {
    _domainEvents.Clear();
  }
}
