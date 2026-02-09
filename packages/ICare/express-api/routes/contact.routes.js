import { Router } from "express";
import { newsletterSubscribeLimiter } from "../middleware/rate-limit.js"; // rename later if you want: contactLimiter
import { pool } from "../db/db.js";
import { ContactSchema } from "../schemas/contact.schemea.js";

import {
    sendContactReceiptEmail,
    sendContactInternalEmail
} from "../services/emails/contact.js";

const router = Router();

function zodErrorsToFieldErrors(zodError) {
    const errors = {};
    for (const issue of zodError.issues || []) {
        const key = issue.path?.[0];
        if (!key) { continue; }
        if (!errors[key]) { errors[key] = issue.message; }
    }
    return errors;
}

/**
 * POST /api/contact
 * Body: { email, subject, topic, message, company? }
 */
router.post("/", newsletterSubscribeLimiter, async (req, res) => {
    try {
        const raw = req.body || {};

        // Honeypot (anti-spam): if filled, pretend success
        if (raw.company) {
            return res.json({ ok: true, message: "Message received." });
        }

        const parsed = ContactSchema.safeParse(raw);
        if (!parsed.success) {
            return res.status(400).json({
                ok: false,
                error: "Please check the highlighted fields.",
                errors: zodErrorsToFieldErrors(parsed.error)
            });
        }

        const data = parsed.data;

        // Optional: store message (recommended)
        // Create a table if you want (see note below).
        try {
            await pool.query(
                `
        INSERT INTO contact_messages (
          email, subject, topic, message
        )
        VALUES ($1, $2, $3, $4)
        `,
                [data.email, data.subject, data.topic, data.message]
            );
        } catch (e) {
            // If table doesn't exist yet, don't fail the contact form
            console.warn("Contact message DB insert skipped/failed:", e?.message || e);
        }

        // Send receipt to user (don’t fail if email sending fails)
        try {
            await sendContactReceiptEmail(data.email, {
                subject: data.subject,
                topic: data.topic
            });
        } catch (e) {
            console.error("Contact receipt email failed:", e);
        }

        // Optional: send internal notification to your team
        try {
            await sendContactInternalEmail({
                email: data.email,
                subject: data.subject,
                topic: data.topic,
                message: data.message
            });
        } catch (e) {
            console.error("Contact internal email failed:", e);
        }

        return res.json({
            ok: true,
            message: "Thanks — your message has been sent."
        });
    } catch (err) {
        console.error("Contact form error:", err);
        return res.status(500).json({ ok: false, error: "Server error." });
    }
});

export default router;
