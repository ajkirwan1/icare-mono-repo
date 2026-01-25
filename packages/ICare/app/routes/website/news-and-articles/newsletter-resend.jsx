import { useFetcher } from "react-router";

export default function NewsletterResend() {
  const fetcher = useFetcher();

  return (
    <main>
      <h1>Resend confirmation</h1>

      <fetcher.Form method="post" action="/api/newsletter/newsletter-resend-confirmation">
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          required
        />
        <button type="submit">Resend</button>
      </fetcher.Form>

      {fetcher.data?.ok && (
        <p>If the email exists, a new confirmation has been sent.</p>
      )}
    </main>
  );
}
