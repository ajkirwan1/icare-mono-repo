namespace ICare.Domain;

public record PhoneNumber
{
  public string CountryCode { get; }
  public string Number { get; }

  private PhoneNumber(string countryCode, string number)
  {
    CountryCode = countryCode;
    Number = number;
  }

  public static PhoneNumber Create(string countryCode, string number)
  {
    if (string.IsNullOrWhiteSpace(number))
      throw new ArgumentException("Phone number cannot be empty.");

    // Strip spaces and dashes for storage
    number = number.Replace(" ", "").Replace("-", "");

    if (string.IsNullOrWhiteSpace(countryCode))
      countryCode = "+44"; // UK default

    return new PhoneNumber(countryCode, number);
  }

  public string FullNumber => $"{CountryCode}{Number}";

  public override string ToString() => FullNumber;
}
