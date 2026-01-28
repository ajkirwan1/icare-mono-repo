import { Resend } from "resend";
import fs from "fs/promises";
import path from "path";

async function loadLogoPngBase64() {
  const filePath = path.join(
    process.cwd(),
    "public",
    "images",
    "logo",
    "icareblack.png"
  );
  const buf = await fs.readFile(filePath);
  return buf.toString("base64");
}

async function loadLogoPngBase64White() {
  const filePath = path.join(
    process.cwd(),
    "public",
    "images",
    "logo",
    "icarelogo-white.png"
  );
  const buf = await fs.readFile(filePath);
  return buf.toString("base64");
}

console.log("[email] cwd", process.cwd());

let resendClient;

function getResend() {
  if (resendClient) { return resendClient; }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("[email] RESEND_API_KEY missing", {
      cwd: process.cwd(),
      nodeEnv: process.env.NODE_ENV
    });
    throw new Error("Missing RESEND_API_KEY");
  }

  resendClient = new Resend(key);
  return resendClient;
}

function getSiteUrl() {
  const site = process.env.PUBLIC_SITE_URL || "http://localhost:5173";
  return site.replace(/\/$/, "");
}

function emailFooterHtml({ unsubscribeUrl } = {}) {
  const siteUrl = getSiteUrl();

  return `
    <hr style="margin:24px 0;border:none;border-top:1px solid #eee;" />
    <p style="margin:0;font-size:12px;line-height:1.5;color:#666;">
      You’re receiving this email because you subscribed to ICare updates.
      ${unsubscribeUrl ? ` <a href="${unsubscribeUrl}">Unsubscribe</a>.` : ""}
    </p>
    <p style="margin:8px 0 0;font-size:12px;line-height:1.5;color:#666;">
      <a href="${siteUrl}/privacy">Privacy</a> · <a href="${siteUrl}/contact-us">Contact</a>
    </p>
    <p style="margin:8px 0 0;font-size:12px;line-height:1.5;color:#666;">
      ICare · London, UK
    </p>
  `;
}

function wrapEmailHtml(bodyHtml, { unsubscribeUrl, logoCids } = {}) {
  const siteUrl = getSiteUrl();

  // logoCids: { light: "icare-logo-light", dark: "icare-logo-dark" }
  const hasLogos = logoCids?.light && logoCids?.dark;

  const logoHtml = hasLogos
    ? `
      <div style="margin:0 0 18px;">
        <a href="${siteUrl}" style="display:inline-block;text-decoration:none;">
          <img
            class="logo-dark"
            src="cid:${logoCids.dark}"
            width="120"
            alt="ICare"
            style="display:block;height:auto;max-width:120px;border:0;"
          />
          <img
            class="logo-light"
            src="cid:${logoCids.light}"
            width="120"
            alt="ICare"
            style="display:none;height:auto;max-width:120px;border:0;"
          />
        </a>
      </div>
    `
    : "";

  return `
    <html>
      <head>
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        <style>
          .logo-light { display:none !important; }
          .logo-dark  { display:block !important; }

          @media (prefers-color-scheme: dark) {
            .logo-dark  { display:none !important; }
            .logo-light { display:block !important; }
          }
        </style>
      </head>
      <body>
        <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial;max-width:640px;margin:0 auto;padding:24px;">
          ${logoHtml}
          ${bodyHtml}
          ${emailFooterHtml({ unsubscribeUrl })}
        </div>
      </body>
    </html>
  `;
}

export async function sendConfirmationEmail(email, confirmUrl) {
  const resend = getResend();

  // For confirmation emails we can still use both logos (so it looks good in dark mode too)
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
        If you didn’t request this, you can ignore this email.
      </p>
      <p style="margin:16px 0 0;font-size:12px;color:#666;">
        Having trouble? Copy and paste this link into your browser:<br/>
        <a href="${confirmUrl}">${confirmUrl}</a>
      </p>
    `,
    {
      unsubscribeUrl: null,
      logoCids: { dark: "icare-logo-dark", light: "icare-logo-light" }
    }
  );

  const result = await resend.emails.send({
    from: process.env.EMAIL_FROM || "ICare <onboarding@resend.dev>",
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

  if (result?.error) {
    throw new Error(result.error.message || "Email failed");
  }
  return result;
}

export async function sendWelcomeEmail(email, { unsubscribeUrl }) {
  const resend = getResend();
  const siteUrl = getSiteUrl();

  const [blackBase64, whiteBase64] = await Promise.all([
    loadLogoPngBase64(),
    loadLogoPngBase64White()
  ]);

  const html = wrapEmailHtml(
    `
      <h2 style="margin:0 0 12px;">Welcome — you’re subscribed</h2>
      <p style="margin:0 0 12px;line-height:1.6;">
        Thanks for subscribing to ICare. You’ll receive monthly updates on ageing,
        in-home care, workforce pressures, and care costs across the UK and Europe.
      </p>
      <p style="margin:0 0 16px;line-height:1.6;">
        In the meantime, you can read the latest articles here:
        <a href="${siteUrl}/news-and-articles">ICare News and articles</a>.
      </p>
    `,
    {
      unsubscribeUrl,
      logoCids: { dark: "icare-logo-dark", light: "icare-logo-light" }
    }
  );

  const result = await resend.emails.send({
    from: process.env.EMAIL_FROM || "ICare <onboarding@resend.dev>",
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

  if (result?.error) {
    throw new Error(result.error.message || "Email failed");
  }
  return result;
}
