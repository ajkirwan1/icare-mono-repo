using Microsoft.AspNetCore.Mvc;

namespace ICare.WebApi.Controllers;

[ApiController]
[Route("api/v1/care-receivers")]
public class CareReceiversController : ControllerBase
{
  public CareReceiversController()
  {

  }

  [HttpGet("me/bookings")]
  public async Task<ActionResult> Get()
  {
    return Ok();
  }
}
