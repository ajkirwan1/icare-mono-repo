namespace ICare.WebApi.Dtos.Responses;

public sealed record MyDetailsResponseDto(string FirstName, string LastName, bool PhoneVerified, bool EmailVerified);
