import { Resend } from "resend";
import fs from "fs/promises";
import path from "path";

export async function loadLogoPngBase64() {
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

export async function loadLogoPngBase64White() {
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

export function topicLabel(topic) {
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

let resendClient;

export function getResend() {
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

export function getSiteUrl() {
  const site = process.env.PUBLIC_SITE_URL || "http://localhost:5173";
  return site.replace(/\/$/, "");
}

export function escapeHtml(str) {
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
      You're receiving this email because you subscribed to ICare updates.
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
      You're receiving this email because you joined the ICare waiting list.
    </p>
    <p style="margin:8px 0 0;font-size:12px;line-height:1.5;color:#666;">
      <a href="${siteUrl}/privacy">Privacy</a> · <a href="${siteUrl}/terms">Terms</a> · <a href="${siteUrl}/contact-us">Contact</a>
    </p>
    <p style="margin:8px 0 0;font-size:12px;line-height:1.5;color:#666;">
      ICare · London, UK
    </p>
  `;
}

export function wrapEmailHtml(bodyHtml, { unsubscribeUrl, logoCids, footer = "newsletter" } = {}) {
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
        <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial;margin:0 auto;padding:24px;">
          ${logoHtml}
          ${bodyHtml}
          ${footerHtml}
        </div>
      </body>
    </html>
  `;
}
