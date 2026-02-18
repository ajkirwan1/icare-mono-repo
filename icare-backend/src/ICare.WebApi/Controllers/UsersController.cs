using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace ICare.WebApi.Controllers;

[ApiController]
[Route("api/v1/users")]
public class UsersController : ControllerBase
{
  public UsersController()
  { }

  [HttpGet("me")]
  public async Task<IActionResult> Get()
  {
    return Ok();
  }
}
