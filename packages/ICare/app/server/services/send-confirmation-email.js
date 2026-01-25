import { Resend } from "resend";

let resendClient;

function getResend() {
  if (resendClient) { return resendClient; }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // This log will tell you what runtime you're in
    console.error("[email] RESEND_API_KEY missing at runtime", {
      cwd: process.cwd(),
      hasKey: Boolean(process.env.RESEND_API_KEY),
      nodeEnv: process.env.NODE_ENV
    });
    throw new Error("Missing RESEND_API_KEY");
  }

  resendClient = new Resend(key);
  return resendClient;
}

export async function sendConfirmationEmail(email, confirmUrl) {
  const resend = getResend();

  const result = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Confirm your ICare newsletter subscription",
    html: `
      <h2>Confirm your subscription</h2>
      <p>Please confirm by clicking the link below:</p>
      <p><a href="${confirmUrl}">Confirm subscription</a></p>
    `
  });

  if (result?.error) {
    console.error("[email] Resend error:", result.error);
    throw new Error("Email failed");
  }

  return result;
}

