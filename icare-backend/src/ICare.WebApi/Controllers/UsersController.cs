using System.Security.Claims;
using ICare.Application.Identity.Queries.GetMyDetailsQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ICare.WebApi.Controllers;

[ApiController]
[Route("api/v1/users")]
public class UsersController : ControllerBase
{
  private readonly IMediator _mediator;

  public UsersController(IMediator mediator)
  {
    _mediator = mediator;
  }

  [HttpGet("me")]
  public async Task<IActionResult> Get([FromQuery] string id = "550e8400-e29b-41d4-a716-446655440000")
  {
    var request = new GetMyDetailsQuery(Guid.Parse(id));

    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    // var request = new GetMyDetailsQuery(Guid.Parse(userId));
    _ = await _mediator.Send(request);

    return Ok(new
    {
      success = true,
      data = new
      {
        id,
        email = "user@example.com",
        userType = "care_receiver",
        firstName = "Sarah",
        lastName = "Johnson",
        phone = "+447700900000",
        phoneVerified = true,
        emailVerified = true,
        dateOfBirth = "1960-05-15",
        accountStatus = "active",
        gdprConsent = true,
        marketingConsent = false,
        createdAt = DateTimeOffset.UtcNow.AddDays(-30),
        lastLoginAt = DateTimeOffset.UtcNow
      }
    });
  }
}
