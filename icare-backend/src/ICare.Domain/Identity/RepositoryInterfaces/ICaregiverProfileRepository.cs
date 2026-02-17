namespace ICare.Domain.Identity.RepositoryInterfaces;

public interface ICaregiverProfileRepository
{
  Task<CaregiverProfile?> GetByIdAsync(CaregiverProfileId id, CancellationToken ct = default);
  Task<CaregiverProfile?> GetByUserIdAsync(UserId userId, CancellationToken ct = default);
  Task AddAsync(CaregiverProfile profile, CancellationToken ct = default);
  void Update(CaregiverProfile profile);
}
