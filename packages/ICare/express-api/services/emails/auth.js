import {
    sendEmail,
    getSiteUrl,
    escapeHtml,
    loadLogoPngBase64,
    loadLogoPngBase64White,
    wrapEmailHtml
} from "./shared.js";

export async function sendPasswordResetEmail(toEmail, resetToken) {
    const siteUrl = getSiteUrl();
    const [blackBase64, whiteBase64] = await Promise.all([
        loadLogoPngBase64(),
        loadLogoPngBase64White()
    ]);

    const safeToken = encodeURIComponent(String(resetToken || "").trim());
    const resetUrl = `${siteUrl}/reset-password?token=${safeToken}`;

    const html = wrapEmailHtml(
        `
      <h2 style="margin:0 0 12px;">Reset your ICare password</h2>
      <p style="margin:0 0 12px;line-height:1.6;">
        We received a request to reset your password.
      </p>
      <p style="margin:0 0 12px;line-height:1.6;">
        <a href="${escapeHtml(resetUrl)}" style="font-weight:600;">Open secure reset page</a>
      </p>
      <p style="margin:0 0 12px;line-height:1.6;color:#555;">
        This link expires in 60 minutes. If you didn’t request this, you can ignore this email.
      </p>
    `,
        {
            unsubscribeUrl: null,
            logoCids: { dark: "icare-logo-dark", light: "icare-logo-light" }
        }
    );

    return sendEmail({
        from: process.env.EMAIL_FROM,
        to: toEmail,
        subject: "Reset your password — ICare",
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
