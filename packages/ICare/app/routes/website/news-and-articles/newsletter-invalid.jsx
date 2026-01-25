export default function NewsletterInvalid() {
  return (
    <main>
      <h1>Link not valid</h1>
      <p>
        This confirmation link is invalid or has expired.
      </p>
      <a href="/newsletter/resend">Resend confirmation email</a>
    </main>
  );
}
