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
  public IActionResult GetMethods()
  {
    return Ok(new
    {
      success = true,
      data = new
      {
        paymentMethods = Array.Empty<object>(),
        defaultPaymentMethodId = (string?)null
      }
    });
  }

}
