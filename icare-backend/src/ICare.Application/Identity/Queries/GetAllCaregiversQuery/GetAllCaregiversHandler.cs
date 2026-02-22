using MediatR;

namespace ICare.Application.Identity.Queries.GetAllCaregiversQuery;

public class GetAllCaregiversHandler : IRequestHandler<GetAllCaregiversQuery, string>
{
  public Task<string> Handle(GetAllCaregiversQuery request, CancellationToken cancellationToken)
  {
    throw new NotImplementedException();
  }
}
