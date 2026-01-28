import { Router } from "express";
import crypto from "crypto";
import { newsletterSubscribeLimiter } from "../middleware/rate-limit.js";
import { sendConfirmationEmail } from "../services/send-emails.js";
import { pool } from "../db.js";

const router = Router();

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Helpers
 */
function getPublicApiBaseUrl(req) {
  // Prefer explicit env for production (recommended).
  // Example: https://api.icare.com
  const envBase = process.env.PUBLIC_API_URL;
  if (envBase) { return envBase.replace(/\/$/, ""); }

  // Fallback: derive from request (ok for dev)
  return `${req.protocol}://${req.get("host")}`;
}

// function safeRedirect(res, path) {
//   // Redirect to your FRONTEND pages (Pattern A: API does work, frontend shows UX).
//   // If frontend is on a different domain, set PUBLIC_SITE_URL.
//   const site = (process.env.PUBLIC_SITE_URL || "").replace(/\/$/, "");
//   if (site) { return res.redirect(`${site}${path}`); }
//   return res.redirect(path);
// }

/**
 * POST /api/waitinglist
 * Body: { email, source }
 */
router.post("/", newsletterSubscribeLimiter, async (req, res) => {

  try {
    const { email, source } = req.body || {};
    const cleanEmail = String(email || "").trim().toLowerCase();
    const cleanSource = String(source || "unknown").trim();

    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      return res
        .status(400)
        .json({ ok: false, error: "Please enter a valid email address." });
    }

    // Already subscribed (and not unsubscribed)
    const exists = await pool.query(
      "SELECT 1 FROM newsletter_subscribers WHERE email=$1 AND unsubscribed_at IS NULL",
      [cleanEmail]
    );
    if (exists.rowCount > 0) {
      return res.json({ ok: true }); // don't leak
    }

    // Create/refresh pending token
    const token = crypto.randomBytes(32).toString("hex");

    await pool.query(
      `
      INSERT INTO newsletter_pending (email, token, source)
      VALUES ($1, $2, $3)
      ON CONFLICT (email) DO UPDATE
      SET token=$2, source=$3, created_at=now()
      `,
      [cleanEmail, token, cleanSource]
    );

    // Pattern A: confirmation link hits the API
    const apiBase = getPublicApiBaseUrl(req);
    const confirmUrl = `${apiBase}/api/newsletter/confirm?token=${token}`;

    await sendConfirmationEmail(cleanEmail, confirmUrl);

    return res.json({ ok: true });
  } catch (err) {
    console.error("Newsletter subscribe error:", err);
    return res.status(500).json({ ok: false, error: "Server error." });
  }
});

export default router;
