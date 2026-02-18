using Microsoft.AspNetCore.Mvc;

namespace ICare.WebApi.Controllers;

[ApiController]
public class VerificationController : ControllerBase
{
  public VerificationController()
  {

  }

  [HttpGet("status")]
  public IActionResult GetStatus()
  {
    return Ok();
  }
}
