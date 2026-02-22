using ICare.Domain.Identity;
using Microsoft.EntityFrameworkCore;

namespace ICare.Infrastructure.Persistence;

public class ICareDbContext : DbContext
{

  public ICareDbContext(DbContextOptions<ICareDbContext> options) : base(options)
  {

  }
  public DbSet<User> Users => Set<User>();

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);
    modelBuilder.ApplyConfigurationsFromAssembly(GetType().Assembly);
  }

  // private static void SeedUsers(ModelBuilder modelBuilder)
  // {
  //   modelBuilder.Entit
  // }

}
