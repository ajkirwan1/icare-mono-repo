using FluentValidation;
using ICare.Application.Bookings.Queries;

namespace ICare.Application.Bookings.Validators;

public sealed class MyBookingsValidator : AbstractValidator<MyBookingsQuery>
{
  public MyBookingsValidator()
  {
    RuleFor(x => x.CareReceiverId)
      .NotEmpty().WithMessage("Care receiver is required.");
    RuleFor(x => x.CaregiverId)
      .NotEmpty().WithMessage("Caregiver is required.");
    RuleFor(x => x.StartTime)
      .GreaterThan(DateTime.UtcNow)
      .WithMessage("Start time must be in the future.");
    RuleFor(x => x.EndTime)
      .GreaterThan(x => x.StartTime)
      .WithMessage("End time must be after start time.");
    RuleFor(x => x.Notes)
      .MaximumLength(1000).When(x => x.Notes is not null);
  }
}
