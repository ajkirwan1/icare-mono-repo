namespace ICare.Domain;

public record Email
{
  public string Value { get; }

  private Email(string value) => Value = value;

  public static Email Create(string email)
  {
    if (string.IsNullOrWhiteSpace(email))
    {
      throw new ArgumentException("Email cannot be empty.");
    }
    email = email.Trim().ToLowerInvariant();

    if (email.Length > 255)
    {
      throw new ArgumentException("Email cannot exceed 255 characters.");
    }

    if (!email.Contains("@") || !email.Contains("."))
      throw new ArgumentException("Invalid email format.");

    return new Email(email);
  }

  public override string ToString() => Value;
}
