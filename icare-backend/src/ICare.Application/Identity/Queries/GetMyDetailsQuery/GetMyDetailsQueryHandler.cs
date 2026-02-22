using MediatR;

namespace ICare.Application.Identity.Queries.GetMyDetailsQuery;

public class GetMyDetailsQueryHandler : IRequestHandler<GetMyDetailsQuery, string>
{
  public Task<string> Handle(GetMyDetailsQuery request, CancellationToken cancellationToken)
  {
    var id = request.Id;
    var result = "result";
    Console.WriteLine("GetMyDetailsQueryHandler");
    return Task.FromResult(result);
  }
}
