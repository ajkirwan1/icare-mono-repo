using Microsoft.AspNetCore.Mvc;

namespace ICare.WebApi.Controllers;

[ApiController]
[Route("api/v1/care-receivers")]
public class CareReceiversController : ControllerBase
{
  public CareReceiversController()
  {

  }

  [HttpPut("me")]
  public IActionResult UpdateMe()
  {
    return Ok(new
    {
      success = true,
      data = new
      {
        updatedAt = DateTimeOffset.UtcNow
      }
    });
  }

  [HttpGet("me/bookings")]
  public IActionResult GetMeBookings([FromQuery] BookingQueryParameters queryParameters)
  {
    return Ok(new
    {
      success = true,
      data = new
      {
        bookings = Array.Empty<object>(),
        pagination = new
        {
          page = queryParameters.Page,
          limit = queryParameters.Limit,
          totalPages = 0,
          totalCount = 0
        }
      }
    });
  }
}
