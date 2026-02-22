using ICare.Domain.Identity;
using MediatR;

namespace ICare.Application.Bookings.Queries;

public sealed record MyBookingsQuery(
  CareReceiverProfileId CareReceiverId,
  CaregiverProfileId CaregiverId,
  DateTime StartTime,
  DateTime EndTime,
  string? Notes): IRequest<int>;
