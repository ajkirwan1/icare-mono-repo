using Microsoft.AspNetCore.Mvc;

namespace ICare.WebApi.Controllers;

public sealed record CancelBookingRequest(string Reason, string? Details);

[ApiController]
[Route("api/v1/bookings")]
public class BookingsController : ControllerBase
{
  public BookingsController()
  {

  }

  [HttpPut("{id:guid}/cancel")]
  public IActionResult Cancel(Guid id, [FromBody] CancelBookingRequest request)
  {
    var allowedReasons = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
    {
      "schedule_change",
      "no_longer_needed",
      "emergency",
      "other"
    };

    if (!allowedReasons.Contains(request.Reason))
    {
      return BadRequest(new
      {
        success = false,
        error = "Invalid cancellation reason."
      });
    }

    return Ok(new
    {
      success = true,
      data = new
      {
        bookingId = id,
        status = "cancelled",
        cancelledAt = DateTimeOffset.UtcNow,
        cancelledBy = "care_receiver",
        refund = new
        {
          amount = 0m,
          percentage = 0,
          reason = "Calculated by cancellation policy",
          processedAt = DateTimeOffset.UtcNow
        }
      }
    });
  }
}
