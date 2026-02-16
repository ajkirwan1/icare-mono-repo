namespace ICare.Domain;

public record Money
{
  public decimal Amount { get; }
  public string Currency { get; }

  private Money(decimal amount, string currency)
  {
    Amount = amount;
    Currency = currency;
  }

  public static Money Create(decimal amount, string currency = "GBP")
  {
    if (amount < 0)
      throw new ArgumentException("Amount cannot be negative.");

    // Round to 2 decimal places
    amount = Math.Round(amount, 2, MidpointRounding.AwayFromZero);

    return new Money(amount, currency.ToUpperInvariant());
  }

  public static Money Zero(string currency = "GBP") => new(0m, currency);

  public Money Add(Money other)
  {
    if (Currency != other.Currency)
      throw new InvalidOperationException("Cannot add different currencies.");
    return new Money(Amount + other.Amount, Currency);
  }

  public Money Subtract(Money other)
  {
    if (Currency != other.Currency)
      throw new InvalidOperationException("Cannot subtract different currencies.");
    if (Amount - other.Amount < 0)
      throw new InvalidOperationException("Result cannot be negative.");
    return new Money(Amount - other.Amount, Currency);
  }

  public Money MultiplyBy(decimal factor)
    => new(Math.Round(Amount * factor, 2, MidpointRounding.AwayFromZero), Currency);
}
