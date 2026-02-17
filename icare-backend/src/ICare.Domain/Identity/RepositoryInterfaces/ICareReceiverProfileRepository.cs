namespace ICare.Domain.Identity.RepositoryInterfaces;

public interface ICareReceiverProfileRepository
{
  Task<CareReceiverProfile?> GetByIdAsync(CareReceiverProfileId id, CancellationToken ct = default);
  Task<CareReceiverProfile?> GetByUserIdAsync(UserId userId, CancellationToken ct = default);
  Task AddAsync(CareReceiverProfile profile, CancellationToken ct = default);
  void Update(CareReceiverProfile profile);
}
