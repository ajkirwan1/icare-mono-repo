using ICare.Application.Identity.Queries.GetAllCaregiversQuery;
using MediatR;
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
  private readonly IMediator _mediator;

  public CaregiversController(IMediator mediator)
  {
    _mediator = mediator;
  }

  [HttpGet("me")]
  public async Task<IActionResult> GetMe()
  {
    var guid = Guid.NewGuid();
    var request = new GetAllCaregiversQuery(guid);

    var result = await _mediator.Send(request);

    if (result == null)
    {
      return NotFound();
    }
    return Ok();
  }

  [HttpPost("me/bookings")]
  public async Task<IActionResult> GetMeBookings([FromQuery] BookingQueryParameters queryParameters)
  {
    return Ok();
  }
}
