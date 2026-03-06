/* global console, process */
import crypto from "crypto";
import { pool } from "../../db/db.js";
import { isValidEmail } from "../../utils/validation.js";
import { sendConfirmationEmail, sendWelcomeEmail } from "../../services/emails/newsletter.js";
import { getPublicApiBaseUrl, safeRedirect } from "./newsletter.service.js";

export async function subscribe(req, res) {
    try {
        const { email, source } = req.body || {};
        const cleanEmail = String(email || "").trim().toLowerCase();
        const cleanSource = String(source || "unknown").trim();

        if (!cleanEmail || !isValidEmail(cleanEmail)) {
            return res
                .status(400)
                .json({ ok: false, error: "Please enter a valid email address." });
        }

        const exists = await pool.query(
            "SELECT 1 FROM newsletter_subscribers WHERE email=$1 AND unsubscribed_at IS NULL",
            [cleanEmail]
        );
        if (exists.rowCount > 0) {
            return res.json({ ok: true });
        }

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

        const apiBase = getPublicApiBaseUrl(req);
        const confirmUrl = `${apiBase}/api/newsletter/confirm?token=${token}`;

        await sendConfirmationEmail(cleanEmail, confirmUrl);

        return res.json({ ok: true });
    } catch (err) {
        console.error("Newsletter subscribe error:", err);
        return res.status(500).json({ ok: false, error: "Server error." });
    }
}

export async function confirm(req, res) {
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

        const existing = await client.query(
            "SELECT unsubscribe_token FROM newsletter_subscribers WHERE email=$1",
            [email]
        );

        const unsubscribeToken =
            existing.rowCount && existing.rows[0].unsubscribe_token
                ? existing.rows[0].unsubscribe_token
                : crypto.randomBytes(32).toString("hex");

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
}

export async function unsubscribe(req, res) {
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
}

export async function resendConfirmation(req, res) {
    try {
        const cleanEmail = String(req.body.email || "").trim().toLowerCase();

        if (!isValidEmail(cleanEmail)) {
            return res.status(400).json({ ok: false, error: "Invalid email." });
        }

        const sub = await pool.query(
            "SELECT 1 FROM newsletter_subscribers WHERE email=$1 AND unsubscribed_at IS NULL",
            [cleanEmail]
        );
        if (sub.rowCount) { return res.json({ ok: true }); }

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
}
