namespace ICare.Domain.Identity.RepositoryInterfaces;

public interface IUserRepository
{
  Task<User?> GetByIdAsync(UserId id, CancellationToken ct = default);
  Task<User?> GetByEmailAsync(string email, CancellationToken ct = default);
  Task<bool> ExistsWithEmailAsync(string email, CancellationToken ct = default);
  Task AddAsync(User user, CancellationToken ct = default);
  void Update(User user);
}
