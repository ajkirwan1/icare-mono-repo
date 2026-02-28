using Microsoft.AspNetCore.Mvc;

namespace ICare.WebApi.Controllers;

[ApiController]
[Route("api/v1/conversations")]
public class ConversationsController : ControllerBase
{
  public ConversationsController()
  {

  }

  [HttpGet]
  public IActionResult GetConversations([FromQuery] int page = 1, [FromQuery] int limit = 25)
  {
    return Ok(new
    {
      success = true,
      data = new
      {
        conversations = Array.Empty<object>(),
        pagination = new
        {
          page,
          limit,
          totalPages = 0,
          totalCount = 0
        }
      }
    });
  }

  [HttpGet("unread-count")]
  public IActionResult GetUnreadCount()
  {
    return Ok(new
    {
      success = true,
      data = new
      {
        unreadCount = 0
      }
    });
  }
}
