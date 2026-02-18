using Microsoft.AspNetCore.Mvc;

namespace ICare.WebApi.Controllers;

[ApiController]
[Route("api/v1/payments")]
public class PaymentsController : ControllerBase
{
  public PaymentsController()
  {

  }

  [HttpGet("methods")]
  public async Task<IActionResult> GetMethods()
  {
    return Ok();
  }

}
