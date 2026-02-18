using Microsoft.AspNetCore.Mvc;

namespace ICare.WebApi.Controllers;

[ApiController]
[Route("api/v1/bookings")]
public class BookingsController : ControllerBase
{
  public BookingsController()
  {

  }

  [HttpGet("{id:guid}/cancel")]
  public async Task<IActionResult> Cancel(Guid id)
  {
    return Ok();
  }
}
