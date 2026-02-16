import {
  sendEmail,
  getSiteUrl,
  escapeHtml,
  loadLogoPngBase64,
  loadLogoPngBase64White,
  wrapEmailHtml
} from "./shared.js";

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
        ? "Thanks for joining — we'll let you know when ICare is available in your area."
        : "Thanks for joining — we'll notify you when ICare launches near you.";

  const manageUrl = meta.manageUrl || null;

  const html = wrapEmailHtml(
    `
     <p style="margin:0 0 12px;line-height:1.6;">${greeting}</p>

     <h2 style="margin:0 0 12px;">You're on the ICare waiting list</h2>

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
         We'll email you when we're ready to launch in your area.
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

  return await sendEmail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "You're on the ICare waiting list",
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
