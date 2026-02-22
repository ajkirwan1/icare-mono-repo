using ICare.Domain;
using ICare.Domain.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ICare.Infrastructure.Persistence.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
  public void Configure(EntityTypeBuilder<User> builder)
  {
    builder.ToTable("Users");

    builder.HasKey(x => x.Id);

    builder.Property(x => x.Id).HasConversion(
        id => id.Value,
        guid => new UserId(guid))
      .HasColumnName("id");

    builder.Property(x => x.Email).HasMaxLength(250)
      .HasConversion(
        email => email.Value,
        value => Email.Create(value))
      .HasColumnName("email")
      .HasMaxLength(255)
      .IsRequired();

    builder.HasIndex(x => x.Email).IsUnique();

    builder.OwnsOne(x => x.Phone, phone =>
    {
      phone.Property(p => p.CountryCode).HasColumnName("phone_country_code").HasMaxLength(2).IsRequired();
      phone.Property(p => p.Number).HasColumnName("phone_number").HasMaxLength(25).IsRequired();
    });

    builder.OwnsOne(x => x.SuspensionDetails, suspensionDetails =>
    {
      suspensionDetails.Property(property => property.SuspendedAt).HasColumnName("suspended_at");
      suspensionDetails.Property(property => property.Reason).HasColumnName("suspension_reason");
      suspensionDetails.Property(property => property.SuspensionEndDate).HasColumnName("suspension_end_date");
      suspensionDetails.Property(property => property.SuspendedBy)
        .HasConversion(id => id.Value, id => new UserId(id))
        .HasColumnName("suspended_by");
    });

    builder.Property(x => x.LastName).HasMaxLength(30);
    builder.Property(x => x.Email).HasMaxLength(30);
    builder.Property(x => x.Phone).HasMaxLength(30);
  }
}
