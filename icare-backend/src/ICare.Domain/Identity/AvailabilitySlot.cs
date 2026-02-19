using ICare.Domain.Common;

namespace ICare.Domain.Identity;

public class AvailabilitySlot : BaseEntity<Guid>
{
  public DayOfWeek DayOfWeek { get; private set; }
  public TimeOnly StartTime { get; private set; }
  public TimeOnly EndTime { get; private set; }

  private AvailabilitySlot() { }

  internal static AvailabilitySlot Create(DayOfWeek day, TimeOnly start, TimeOnly end)
  {
    if (end <= start)
      throw new ArgumentException("End time must be after start time.");

    return new AvailabilitySlot
    {
      Id = Guid.NewGuid(),
      DayOfWeek = day,
      StartTime = start,
      EndTime = end
    };
  }

  public decimal DurationHours =>
    (decimal)(EndTime.ToTimeSpan() - StartTime.ToTimeSpan()).TotalHours;

  internal bool OverlapsWith(AvailabilitySlot other)
  {
    if (DayOfWeek != other.DayOfWeek) return false;
    return StartTime < other.EndTime && EndTime > other.StartTime;
  }
}
