using MediatR;

namespace ICare.Application.Identity.Queries.GetMyDetailsQuery;

public sealed record GetMyDetailsQuery(Guid Id) : IRequest<string>;
