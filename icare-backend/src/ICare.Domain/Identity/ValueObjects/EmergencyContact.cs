namespace ICare.Domain.Identity.ValueObjects;

public record EmergencyContact
{
  public string Name { get; }
  public string PhoneNumber { get; }
  public string RelationShip { get; }

  private EmergencyContact(string name, string phoneNumber, string relationShip)
  {
    Name = name;
    PhoneNumber = phoneNumber;
    RelationShip = relationShip;
  }

  public static EmergencyContact Create(string name, string phoneNumber, string relationShip)
  {
    if (string.IsNullOrWhiteSpace(name))
      throw new ArgumentException("Value cannot be null or whitespace.");

    if (string.IsNullOrWhiteSpace(phoneNumber))
      throw new ArgumentException("Value cannot be null or whitespace.");

    if (string.IsNullOrWhiteSpace(relationShip))
      throw new ArgumentException("Value cannot be null or whitespace.");

    return new EmergencyContact(name.Trim(), phoneNumber.Trim(), relationShip.Trim());
  }
}
