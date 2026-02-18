using Microsoft.AspNetCore.Mvc;

namespace ICare.WebApi.Controllers;

public class BookingQueryParameters
{
  public string? Status { get; set; }
  public int Page { get;set; }
  public int limit { get; set; }
  public string? Sort { get; set; }

}

[ApiController]
[Route("api/v1/care-receivers")]
public class CaregiversController : ControllerBase
{
  public CaregiversController()
  {

  }

  [HttpGet("me")]
  public async Task<IActionResult> GetMe()
  {
    return Ok();
  }

  [HttpPost("me/bookings")]
  public async Task<IActionResult> GetMeBookings([FromQuery] BookingQueryParameters queryParameters)
  {
    return Ok();
  }
}
