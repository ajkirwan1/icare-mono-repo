import {
  getResend,
  getSiteUrl,
  escapeHtml,
  topicLabel,
  loadLogoPngBase64,
  loadLogoPngBase64White,
  wrapEmailHtml
} from "./shared.js";

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
       Thanks for contacting ICare — we'll reply as soon as we can.
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
 *   email: string,
 *   subject: string,
 *   topic: string,
 *   message: string
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
      unsubscribeUrl: null,
      logoCids: { dark: "icare-logo-dark", light: "icare-logo-light" }
    }
  );

  const result = await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: inbox,
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
