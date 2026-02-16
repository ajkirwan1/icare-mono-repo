namespace ICare.Domain.Identity.ValueObjects;

public record SuspensionDetails
{
  public DateTime SuspendedAt { get; }
  public DateTime SuspensionEndDate { get; }
  public string Reason { get; }
  public UserId SuspendedBy { get; }

  private SuspensionDetails(DateTime suspendedAt, DateTime suspensionEndDate, string reason, UserId suspendedBy)
  {
    SuspendedAt = suspendedAt;
    SuspensionEndDate = suspensionEndDate;
    Reason = reason;
    SuspendedBy = suspendedBy;
  }

  public static SuspensionDetails Create(int durationDays, string reason, UserId adminId)
  {
    if (durationDays is not (7 or 14 or 30))
      throw new ArgumentException("Duration days must be between 7 and 14 or 30", nameof(durationDays));

    if (string.IsNullOrWhiteSpace(reason))
      throw new ArgumentException("Suspension reason is required.");

    return new SuspensionDetails(
      DateTime.UtcNow,
      DateTime.UtcNow.AddDays(durationDays),
      reason,
      adminId);
  }
  public bool IsExpired => DateTime.UtcNow > SuspensionEndDate;
}
