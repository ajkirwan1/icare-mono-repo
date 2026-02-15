import {
  sendEmail,
  getSiteUrl,
  loadLogoPngBase64,
  loadLogoPngBase64White,
  wrapEmailHtml
} from "./shared.js";

export async function sendConfirmationEmail(email, confirmUrl) {
  const [blackBase64, whiteBase64] = await Promise.all([
    loadLogoPngBase64(),
    loadLogoPngBase64White()
  ]);

  const html = wrapEmailHtml(
    `
      <h2 style="margin:0 0 12px;">Confirm your subscription</h2>
      <p style="margin:0 0 16px;line-height:1.6;">
        Please confirm by clicking the link below:
      </p>
      <p style="margin:0 0 16px;">
        <a href="${confirmUrl}" style="display:inline-block;padding:12px 18px;background:#2563eb;color:#fff;border-radius:10px;text-decoration:none;font-weight:600;">
          Confirm subscription
        </a>
      </p>
      <p style="margin:0;line-height:1.6;color:#555;">
        If you didn't request this, you can ignore this email.
      </p>
      <p style="margin:16px 0 0;font-size:12px;color:#666;">
        Having trouble? Copy and paste this link into your browser:<br/>
        <a href="${confirmUrl}">${confirmUrl}</a>
      </p>
    `,
    {
      unsubscribeUrl: null,
      logoCids: { dark: "icare-logo-dark", light: "icare-logo-light" },
      footer: "newsletter"
    }
  );

  return await sendEmail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Confirm your ICare newsletter subscription",
    html,
    attachments: [
      {
        filename: "icareblack.png",
        content: blackBase64,
        contentType: "image/png",
        contentId: "icare-logo-dark"
      },
      {
        filename: "icarelogo-white.png",
        content: whiteBase64,
        contentType: "image/png",
        contentId: "icare-logo-light"
      }
    ]
  });
}

export async function sendWelcomeEmail(email, { unsubscribeUrl }) {
  const siteUrl = getSiteUrl();

  const [blackBase64, whiteBase64] = await Promise.all([
    loadLogoPngBase64(),
    loadLogoPngBase64White()
  ]);

  const html = wrapEmailHtml(
    `
      <h2 style="margin:0 0 12px;">Welcome — you're subscribed</h2>
      <p style="margin:0 0 12px;line-height:1.6;">
        Thanks for subscribing to ICare. You'll receive monthly updates on ageing,
        in-home care, workforce pressures, and care costs across the UK and Europe.
      </p>
      <p style="margin:0 0 16px;line-height:1.6;">
        In the meantime, you can read the latest articles here:
        <a href="${siteUrl}/care-knowledge">ICare News and articles</a>.
      </p>
    `,
    {
      unsubscribeUrl,
      logoCids: { dark: "icare-logo-dark", light: "icare-logo-light" },
      footer: "newsletter"
    }
  );

  return await sendEmail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Welcome to ICare — subscription confirmed",
    html,
    attachments: [
      {
        filename: "icareblack.png",
        content: blackBase64,
        contentType: "image/png",
        contentId: "icare-logo-dark"
      },
      {
        filename: "icarelogo-white.png",
        content: whiteBase64,
        contentType: "image/png",
        contentId: "icare-logo-light"
      }
    ]
  });
}
