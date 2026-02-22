using MediatR;

namespace ICare.Application.Identity.Queries.GetAllCaregiversQuery;

public sealed record GetAllCaregiversQuery(Guid Id) : IRequest<string>;
