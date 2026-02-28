using ICare.Application.Identity.Queries.GetAllCaregiversQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ICare.WebApi.Controllers;

public class BookingQueryParameters
{
  public string? Status { get; set; }
  public DateOnly? StartDate { get; set; }
  public DateOnly? EndDate { get; set; }
  public DateOnly? CompletedAfter { get; set; }
  public int Page { get; set; } = 1;
  public int Limit { get; set; } = 25;
  public string? Sort { get; set; }
}

[ApiController]
[Route("api/v1/caregivers")]
public class CaregiversController : ControllerBase
{
  private readonly IMediator _mediator;

  public CaregiversController(IMediator mediator)
  {
    _mediator = mediator;
  }

  [HttpGet]
  public async Task<IActionResult> Search()
  {
    var guid = Guid.NewGuid();
    var request = new GetAllCaregiversQuery(guid);

    var result = await _mediator.Send(request);

    if (result == null)
    {
      return NotFound();
    }

    return Ok(new
    {
      success = true,
      data = new
      {
        caregivers = result
      }
    });
  }

  [HttpGet("{id:guid}")]
  public IActionResult GetById(Guid id)
  {
    return Ok(new
    {
      success = true,
      data = new
      {
        id
      }
    });
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

  [HttpPost("me/availability")]
  public IActionResult UpsertAvailability()
  {
    return Created(string.Empty, new
    {
      success = true,
      data = new
      {
        availability = new
        {
          recurring = Array.Empty<object>(),
          oneOff = Array.Empty<object>(),
          unavailable = Array.Empty<object>()
        },
        totalHoursPerWeek = 0,
        profileVisible = false
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

  [HttpGet("me/earnings")]
  public IActionResult GetMyEarnings()
  {
    return Ok(new
    {
      success = true,
      data = new
      {
        summary = new
        {
          totalEarnings = 0m,
          thisMonth = 0m,
          pending = 0m,
          paid = 0m
        },
        pendingPayouts = Array.Empty<object>(),
        payoutHistory = Array.Empty<object>()
      }
    });
  }
}
