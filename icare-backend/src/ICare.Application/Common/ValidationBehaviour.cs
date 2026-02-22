using FluentValidation;
using MediatR;

namespace ICare.Application.Common;

public sealed class ValidationBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest : IRequest<TResponse>
{
  private readonly IEnumerable<IValidator<TRequest>> _validators;

  public ValidationBehaviour(IEnumerable<IValidator<TRequest>> validators)
  {
    _validators = validators;
  }
  public Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
  {
    Console.WriteLine("Validation behaviour");
    return next();
  }
}
