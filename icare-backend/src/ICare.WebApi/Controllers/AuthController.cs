using System.Text.RegularExpressions;
using BCrypt.Net;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace ICare.WebApi.Controllers;

public sealed record RegisterRequest(
  string? UserType,
  string? Email,
  string? Password,
  string? FirstName,
  string? LastName,
  string? Phone,
  string? PhoneCountryCode,
  DateOnly? DateOfBirth,
  bool GdprConsent,
  bool MarketingConsent
);

[ApiController]
[Route("api/v1/auth")]
public class AuthController : ControllerBase
{
  private static readonly Regex EmailRegex = new(@"^[^\s@]+@[^\s@]+\.[^\s@]+$", RegexOptions.Compiled);
  private static readonly Regex UkPhoneRegex = new(@"^\+447\d{9}$", RegexOptions.Compiled);
  private static readonly Regex PasswordRegex = new(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$", RegexOptions.Compiled);
  private static readonly HashSet<string> AllowedUserTypes = new(StringComparer.Ordinal)
  {
    "care_receiver",
    "family",
    "caregiver"
  };

  private readonly NpgsqlDataSource _dataSource;

  public AuthController(NpgsqlDataSource dataSource)
  {
    _dataSource = dataSource;
  }

  [HttpPost("register")]
  public async Task<IActionResult> Register([FromBody] RegisterRequest request, CancellationToken cancellationToken)
  {
    var errors = Validate(request);
    if (errors.Count > 0)
    {
      return BadRequest(new
      {
        success = false,
        error = new
        {
          code = "VALIDATION_ERROR",
          message = "Please fix validation errors.",
          details = errors
        }
      });
    }

    var userId = Guid.NewGuid();
    var userType = request.UserType!.Trim();
    var email = request.Email!.Trim().ToLowerInvariant();
    var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password!.Trim());
    var phone = NormalizePhone(request.Phone!);
    var phoneCountryCode = string.IsNullOrWhiteSpace(request.PhoneCountryCode) ? "+44" : request.PhoneCountryCode.Trim();

    try
    {
      await using var connection = await _dataSource.OpenConnectionAsync(cancellationToken);
      await using var command = new NpgsqlCommand(
        """
        INSERT INTO users (
          id, email, email_verified, email_verified_at, password_hash,
          phone, phone_verified, phone_verified_at, phone_country_code,
          user_type, first_name, last_name, date_of_birth,
          account_status, gdpr_consent, gdpr_consent_date, marketing_consent,
          created_at, updated_at
        ) VALUES (
          @id, @email, FALSE, NULL, @password_hash,
          @phone, FALSE, NULL, @phone_country_code,
          @user_type, @first_name, @last_name, @date_of_birth,
          'active', @gdpr_consent, NOW(), @marketing_consent,
          NOW(), NOW()
        );
        """,
        connection
      );

      command.Parameters.AddWithValue("id", userId);
      command.Parameters.AddWithValue("email", email);
      command.Parameters.AddWithValue("password_hash", passwordHash);
      command.Parameters.AddWithValue("phone", phone);
      command.Parameters.AddWithValue("phone_country_code", phoneCountryCode);
      command.Parameters.AddWithValue("user_type", userType);
      command.Parameters.AddWithValue("first_name", request.FirstName!.Trim());
      command.Parameters.AddWithValue("last_name", request.LastName!.Trim());
      command.Parameters.AddWithValue("date_of_birth", request.DateOfBirth is null ? DBNull.Value : request.DateOfBirth.Value);
      command.Parameters.AddWithValue("gdpr_consent", request.GdprConsent);
      command.Parameters.AddWithValue("marketing_consent", request.MarketingConsent);

      await command.ExecuteNonQueryAsync(cancellationToken);
    }
    catch (PostgresException ex) when (ex.SqlState == PostgresErrorCodes.UniqueViolation)
    {
      return Conflict(new
      {
        success = false,
        error = new
        {
          code = "RESOURCE_CONFLICT",
          message = "Email already registered."
        }
      });
    }
    catch (PostgresException ex) when (ex.SqlState == PostgresErrorCodes.UndefinedTable)
    {
      return StatusCode(500, new
      {
        success = false,
        error = new
        {
          code = "DATABASE_NOT_READY",
          message = "Users table does not exist. Run Tier1 migrations first."
        }
      });
    }

    return StatusCode(201, new
    {
      success = true,
      data = new
      {
        userId,
        email,
        userType,
        emailVerificationSent = true,
        phoneVerificationSent = true
      }
    });
  }

  private static Dictionary<string, string> Validate(RegisterRequest request)
  {
    var errors = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);

    var userType = request.UserType?.Trim() ?? "";
    if (!AllowedUserTypes.Contains(userType))
    {
      errors["userType"] = "userType must be one of: care_receiver, family, caregiver.";
    }

    var email = request.Email?.Trim() ?? "";
    if (!EmailRegex.IsMatch(email))
    {
      errors["email"] = "Valid email is required.";
    }

    var password = request.Password?.Trim() ?? "";
    if (!PasswordRegex.IsMatch(password))
    {
      errors["password"] = "Password must contain upper, lower, number, special character and be at least 8 chars.";
    }

    if (string.IsNullOrWhiteSpace(request.FirstName))
    {
      errors["firstName"] = "First name is required.";
    }

    if (string.IsNullOrWhiteSpace(request.LastName))
    {
      errors["lastName"] = "Last name is required.";
    }

    var normalizedPhone = NormalizePhone(request.Phone ?? "");
    if (!UkPhoneRegex.IsMatch(normalizedPhone))
    {
      errors["phone"] = "Phone must be a valid UK number in +447XXXXXXXXX format.";
    }

    if (!request.GdprConsent)
    {
      errors["gdprConsent"] = "GDPR consent is required.";
    }

    if ((userType is "care_receiver" or "family") && request.DateOfBirth is not null)
    {
      if (!IsAdult(request.DateOfBirth.Value))
      {
        errors["dateOfBirth"] = "Care receiver/family account holder must be 18+.";
      }
    }

    return errors;
  }

  private static bool IsAdult(DateOnly dateOfBirth)
  {
    var today = DateOnly.FromDateTime(DateTime.UtcNow);
    var age = today.Year - dateOfBirth.Year;
    if (dateOfBirth > today.AddYears(-age))
    {
      age--;
    }

    return age >= 18;
  }

  private static string NormalizePhone(string phone)
  {
    return (phone ?? string.Empty).Replace(" ", "").Replace("-", "").Replace("(", "").Replace(")", "");
  }
}
