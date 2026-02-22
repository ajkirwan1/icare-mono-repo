using MediatR;

namespace ICare.Application.Identity.Commands.GetAllCaregiversQuery;

public sealed record GetAllCaregiversCommand(Guid Id) : IRequest<string>;
