import { Resend } from "resend";
import fs from "fs/promises";
import path from "path";

async function loadLogoPngBase64() {
  const filePath = path.join(
    process.cwd(),
    "..",
    "public",
    "images",
    "logo",
    "icareblack.png"
  );
  const buf = await fs.readFile(filePath);
  return buf.toString("base64");
}

/**
 * Topic label for nicer display
 */
function topicLabel(topic) {
  const map = {
    general: "General question",
    care: "Care needs",
    caregiver: "Caregiver onboarding",
    safety: "Trust & safety",
    billing: "Billing / payments",
    other: "Other"
  };
  return map[topic] || topic || "General";
}

async function loadLogoPngBase64White() {
  const filePath = path.join(
    process.cwd(),
    "..",
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

// Tiny HTML escaper for user-provided fields (firstName/postcode)
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#039;");
}

function newsletterFooterHtml({ unsubscribeUrl } = {}) {
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

function waitinglistFooterHtml() {
  const siteUrl = getSiteUrl();

  return `
    <hr style="margin:24px 0;border:none;border-top:1px solid #eee;" />
    <p style="margin:0;font-size:12px;line-height:1.5;color:#666;">
      You’re receiving this email because you joined the ICare waiting list.
    </p>
    <p style="margin:8px 0 0;font-size:12px;line-height:1.5;color:#666;">
      <a href="${siteUrl}/privacy">Privacy</a> · <a href="${siteUrl}/terms">Terms</a> · <a href="${siteUrl}/contact-us">Contact</a>
    </p>
    <p style="margin:8px 0 0;font-size:12px;line-height:1.5;color:#666;">
      ICare · London, UK
    </p>
  `;
}


function wrapEmailHtml(bodyHtml, { unsubscribeUrl, logoCids, footer = "newsletter" } = {}) {
  const siteUrl = getSiteUrl();

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

  const footerHtml =
    footer === "waitinglist"
      ? waitinglistFooterHtml()
      : newsletterFooterHtml({ unsubscribeUrl });

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
          ${footerHtml}
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
      logoCids: { dark: "icare-logo-dark", light: "icare-logo-light" },
      footer: "newsletter"
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
      logoCids: { dark: "icare-logo-dark", light: "icare-logo-light" },
      footer: "newsletter"
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

/**
 * Sends "You're on the waiting list" email (not a confirmation flow).
 *
 * @param {string} email
 * @param {{
*   firstName?: string,
*   userType?: "receiver" | "caregiver",
*   postcode?: string,
*   manageUrl?: string | null
* }} meta
*/
export async function sendWaitinglistConfirmationEmail(email, meta = {}) {
  const resend = getResend();
  const siteUrl = getSiteUrl();

  const [blackBase64, whiteBase64] = await Promise.all([
    loadLogoPngBase64(),
    loadLogoPngBase64White()
  ]);

  const firstName = (meta.firstName || "").trim();
  const greeting = firstName ? `Hi ${escapeHtml(firstName)},` : "Hi,";

  const userTypeLine =
    meta.userType === "caregiver"
      ? "Thanks for raising your hand to support families as a caregiver."
      : meta.userType === "receiver"
        ? "Thanks for joining — we’ll let you know when ICare is available in your area."
        : "Thanks for joining — we’ll notify you when ICare launches near you.";

  const manageUrl = meta.manageUrl || null;

  const html = wrapEmailHtml(
    `
     <p style="margin:0 0 12px;line-height:1.6;">${greeting}</p>

     <h2 style="margin:0 0 12px;">You’re on the ICare waiting list</h2>

     <p style="margin:0 0 12px;line-height:1.6;">
       ${userTypeLine}
     </p>

     ${meta.postcode
      ? `
           <p style="margin:0 0 16px;line-height:1.6;color:#555;">
             Area: <strong>${escapeHtml(meta.postcode)}</strong>
           </p>
         `
      : ""
    }

     <div style="margin:18px 0 0;padding:14px 16px;border:1px solid #eee;border-radius:12px;background:#fafafa;">
       <p style="margin:0;line-height:1.6;">
         We’ll email you when we’re ready to launch in your area.
       </p>
       <p style="margin:10px 0 0;line-height:1.6;">
         In the meantime, you can learn more about ICare here:
         <a href="${siteUrl}" style="font-weight:600;">${siteUrl}</a>
       </p>
     </div>

     ${manageUrl
      ? `
           <p style="margin:16px 0 0;line-height:1.6;">
             Want to update your details? <a href="${manageUrl}">Manage your waiting list preferences</a>.
           </p>
         `
      : ""
    }
   `,
    {
      logoCids: { dark: "icare-logo-dark", light: "icare-logo-light" },
      footer: "waitinglist"
    }
  );

  const result = await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "You’re on the ICare waiting list",
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

/**
 * Sends a "we received your message" receipt email to the user.
 *
 * @param {string} toEmail
 * @param {{
*   subject?: string,
*   topic?: string,
*   ticketId?: string | null
* }} meta
*/
export async function sendContactReceiptEmail(toEmail, meta = {}) {
  const resend = getResend();
  const siteUrl = getSiteUrl();

  const [blackBase64, whiteBase64] = await Promise.all([
    loadLogoPngBase64(),
    loadLogoPngBase64White()
  ]);

  const safeSubject = escapeHtml((meta.subject || "").trim());
  const safeTopic = escapeHtml(topicLabel((meta.topic || "").trim()));
  const ticketId = meta.ticketId ? escapeHtml(String(meta.ticketId)) : null;

  const html = wrapEmailHtml(
    `
     <h2 style="margin:0 0 12px;">We received your message</h2>

     <p style="margin:0 0 12px;line-height:1.6;">
       Thanks for contacting ICare — we’ll reply as soon as we can.
     </p>

     <div style="margin:16px 0 0;padding:14px 16px;border:1px solid #eee;border-radius:12px;background:#fafafa;">
       <p style="margin:0;line-height:1.6;">
         <strong>Topic:</strong> ${safeTopic}<br/>
         <strong>Subject:</strong> ${safeSubject || "—"}
         ${ticketId ? `<br/><strong>Reference:</strong> ${ticketId}` : ""}
       </p>
     </div>

     <p style="margin:16px 0 0;line-height:1.6;color:#555;">
       In the meantime, you can find more information here:
       <a href="${siteUrl}" style="font-weight:600;">${siteUrl}</a>
     </p>
   `,
    {
      // Contact receipts are transactional — no unsubscribe link needed
      unsubscribeUrl: null,
      logoCids: { dark: "icare-logo-dark", light: "icare-logo-light" }
    }
  );

  const result = await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: toEmail,
    subject: "We received your message — ICare",
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

/**
* Sends an internal notification email to your team inbox.
*
* @param {{
*  email: string,
*  subject: string,
*  topic: string,
*  message: string
* }} payload
*/
export async function sendContactInternalEmail(payload) {
  const resend = getResend();

  const inbox = process.env.CONTACT_INBOX_EMAIL;
  if (!inbox) {
    throw new Error("Missing CONTACT_INBOX_EMAIL env var");
  }

  const [blackBase64, whiteBase64] = await Promise.all([
    loadLogoPngBase64(),
    loadLogoPngBase64White()
  ]);

  const safeFromEmail = escapeHtml((payload.email || "").trim());
  const safeSubject = escapeHtml((payload.subject || "").trim());
  const safeTopic = escapeHtml(topicLabel((payload.topic || "").trim()));

  // Preserve new lines (basic) for HTML email display
  const safeMessage = escapeHtml((payload.message || "").trim()).replaceAll("\n", "<br/>");

  const html = wrapEmailHtml(
    `
     <h2 style="margin:0 0 12px;">New Contact Us message</h2>

     <div style="margin:0 0 16px;padding:14px 16px;border:1px solid #eee;border-radius:12px;background:#fafafa;">
       <p style="margin:0;line-height:1.6;">
         <strong>From:</strong> ${safeFromEmail}<br/>
         <strong>Topic:</strong> ${safeTopic}<br/>
         <strong>Subject:</strong> ${safeSubject || "—"}
       </p>
     </div>

     <h3 style="margin:0 0 8px;font-size:14px;color:#111;">Message</h3>
     <p style="margin:0;line-height:1.7;color:#222;">
       ${safeMessage || "—"}
     </p>
   `,
    {
      // Internal emails: no unsubscribe link
      unsubscribeUrl: null,
      logoCids: { dark: "icare-logo-dark", light: "icare-logo-light" }
    }
  );

  const result = await resend.emails.send({
    from: process.env.EMAIL_FROM || "ICare <onboarding@resend.dev>",
    to: inbox,
    // Nice for triage + email threading
    reply_to: payload.email,
    subject: `Contact Us: ${topicLabel(payload.topic)} — ${payload.subject || "No subject"}`,
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
