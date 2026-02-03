import { Router } from "express";
import crypto from "crypto";
import { newsletterSubscribeLimiter } from "../middleware/rate-limit.js";
import { sendConfirmationEmail, sendWelcomeEmail } from "../services/send-emails.js";
import { pool } from "../db/db.js";

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

function safeRedirect(res, path) {
    // Redirect to your FRONTEND pages (Pattern A: API does work, frontend shows UX).
    // If frontend is on a different domain, set PUBLIC_SITE_URL.
    const site = (process.env.PUBLIC_SITE_URL || "").replace(/\/$/, "");
    if (site) { return res.redirect(`${site}${path}`); }
    return res.redirect(path);
}

/**
 * POST /api/newsletter/subscribe
 * Body: { email, source }
 */
router.post("/subscribe", newsletterSubscribeLimiter, async (req, res) => {

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

/**
 * GET /api/newsletter/confirm?token=...
 * Confirms subscription, then redirects to frontend success page
 */
router.get("/confirm", async (req, res) => {

    const token = String(req.query.token || "");
    if (!token) { return safeRedirect(res, "/newsletter/invalid"); }

    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        const pending = await client.query(
            "SELECT email, source FROM newsletter_pending WHERE token=$1",
            [token]
        );

        if (!pending.rowCount) {
            await client.query("ROLLBACK");
            return safeRedirect(res, "/newsletter/invalid");
        }

        const { email, source } = pending.rows[0];

        // Check if subscriber already exists and has an unsubscribe_token
        const existing = await client.query(
            "SELECT unsubscribe_token FROM newsletter_subscribers WHERE email=$1",
            [email]
        );

        const unsubscribeToken =
            existing.rowCount && existing.rows[0].unsubscribe_token
                ? existing.rows[0].unsubscribe_token
                : crypto.randomBytes(32).toString("hex");

        // Upsert subscriber, keep unsubscribe_token stable if it exists
        await client.query(
            `
      INSERT INTO newsletter_subscribers (email, source, unsubscribe_token, unsubscribed_at)
      VALUES ($1, $2, $3, NULL)
      ON CONFLICT (email) DO UPDATE
      SET source = EXCLUDED.source,
          unsubscribed_at = NULL,
          unsubscribe_token = COALESCE(newsletter_subscribers.unsubscribe_token, EXCLUDED.unsubscribe_token)
      `,
            [email, source || null, unsubscribeToken]
        );

        await client.query("DELETE FROM newsletter_pending WHERE email=$1", [email]);

        await client.query("COMMIT");

        // Build unsubscribe URL for emails (API route)
        const apiBase = getPublicApiBaseUrl(req);
        const unsubscribeUrl = `${apiBase}/api/newsletter/unsubscribe?token=${unsubscribeToken}`;

        console.log("[newsletter] confirm: about to send welcome", {
            email,
            unsubscribeUrl,
            pid: process.pid
        });

        try {
            const r = await sendWelcomeEmail(email, { unsubscribeUrl });
            console.log("[newsletter] confirm: welcome email sent", r?.data || r);
        } catch (e) {
            console.error("[newsletter] confirm: welcome email FAILED", e);
            // IMPORTANT: show failure instead of redirecting silently
            return res.status(500).send("Welcome email failed. Check server logs.");
        }

        return safeRedirect(res, "/newsletter/confirmed");
    } catch (err) {
        await client.query("ROLLBACK");
        console.error("Newsletter confirm error:", err);
        return safeRedirect(res, "/newsletter/invalid");
    } finally {
        client.release();
    }
});

/**
 * GET /api/newsletter/unsubscribe?token=...
 * Marks unsubscribed and redirects to frontend page
 */
router.get("/unsubscribe", async (req, res) => {
    const token = String(req.query.token || "");
    if (!token) { return safeRedirect(res, "/newsletter/invalid"); }

    try {
        const r = await pool.query(
            `
      UPDATE newsletter_subscribers
      SET unsubscribed_at = now()
      WHERE unsubscribe_token = $1 AND unsubscribed_at IS NULL
      RETURNING email
      `,
            [token]
        );

        if (!r.rowCount) { return safeRedirect(res, "/newsletter/invalid"); }

        return safeRedirect(res, "/newsletter/unsubscribed");
    } catch (err) {
        console.error("Newsletter unsubscribe error:", err);
        return safeRedirect(res, "/newsletter/invalid");
    }
});

/**
 * POST /api/newsletter/resend
 * Body: { email }
 */
router.post("/resend", newsletterSubscribeLimiter, async (req, res) => {
    try {
        const cleanEmail = String(req.body.email || "").trim().toLowerCase();

        if (!isValidEmail(cleanEmail)) {
            return res.status(400).json({ ok: false, error: "Invalid email." });
        }

        // If already subscribed, pretend ok
        const sub = await pool.query(
            "SELECT 1 FROM newsletter_subscribers WHERE email=$1 AND unsubscribed_at IS NULL",
            [cleanEmail]
        );
        if (sub.rowCount) { return res.json({ ok: true }); }

        // Must exist in pending to resend
        const token = crypto.randomBytes(32).toString("hex");

        const up = await pool.query(
            `
      UPDATE newsletter_pending
      SET token=$2, created_at=now()
      WHERE email=$1
      RETURNING email
      `,
            [cleanEmail, token]
        );

        if (!up.rowCount) {
            // pretend ok (don't allow enumeration)
            return res.json({ ok: true });
        }

        const apiBase = getPublicApiBaseUrl(req);
        const confirmUrl = `${apiBase}/api/newsletter/confirm?token=${token}`;

        await sendConfirmationEmail(cleanEmail, confirmUrl);

        return res.json({ ok: true });
    } catch (err) {
        console.error("Newsletter resend error:", err);
        return res.status(500).json({ ok: false, error: "Server error." });
    }
});

export default router;
