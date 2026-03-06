/* global console */
import { Router } from "express";
import { pool } from "../db/db.js";
import { normalizeUserId } from "../utils/identity.js";

const router = Router();
const STRIPE_CUSTOMER_ID_RE = /^cus_[A-Za-z0-9]+$/;
const defaultNotificationSettings = {
    bookingUpdatesEmail: true,
    bookingRemindersEmail: true,
    newMessagesEmail: true,
    productAnnouncementsEmail: false
};

function resolveViewerId(req) {
    const fromHeader = normalizeUserId(req.get("x-user-id"));
    if (fromHeader) {
        return fromHeader;
    }

    const fromQuery = normalizeUserId(req.query.userId || req.query.uid);
    if (fromQuery) {
        return fromQuery;
    }

    const fromBody = normalizeUserId(req.body?.userId || req.body?.uid);
    if (fromBody) {
        return fromBody;
    }

    return "";
}

function toNotificationSettings(row) {
    return {
        bookingUpdatesEmail: row ? Boolean(row.booking_updates_email) : defaultNotificationSettings.bookingUpdatesEmail,
        bookingRemindersEmail: row ? Boolean(row.booking_reminders_email) : defaultNotificationSettings.bookingRemindersEmail,
        newMessagesEmail: row ? Boolean(row.new_messages_email) : defaultNotificationSettings.newMessagesEmail,
        productAnnouncementsEmail: row ? Boolean(row.product_announcements_email) : defaultNotificationSettings.productAnnouncementsEmail
    };
}

async function readSettingsRow(userId) {

    const result = await pool.query(
        `
          SELECT
            user_id,
            booking_updates_email,
            booking_reminders_email,
            new_messages_email,
            product_announcements_email,
            stripe_customer_id,
            updated_at
          FROM carereceiver_settings
          WHERE user_id = $1
          LIMIT 1
        `,
        [userId]
    );
    return result.rows?.[0] || null;
}

router.get("/carereceiver/settings/notifications", async (req, res) => {
    const userId = resolveViewerId(req);
    if (!userId) {
        return res.status(401).json({
            error: { message: "Missing or invalid user context." }
        });
    }

    try {
        const row = await readSettingsRow(userId);
        return res.json({
            data: {
                userId,
                settings: toNotificationSettings(row),
                updatedAt: row?.updated_at || null
            }
        });
    } catch (error) {
        console.error("[carereceiver-settings] GET notifications failed:", error);
        return res.status(500).json({
            error: { message: "Could not load notification settings." }
        });
    }
});

router.put("/carereceiver/settings/notifications", async (req, res) => {
    const userId = resolveViewerId(req);
    if (!userId) {
        return res.status(401).json({
            error: { message: "Missing or invalid user context." }
        });
    }

    const input = req.body?.settings || req.body || {};
    const nextSettings = {
        bookingUpdatesEmail: Boolean(input.bookingUpdatesEmail),
        bookingRemindersEmail: Boolean(input.bookingRemindersEmail),
        newMessagesEmail: Boolean(input.newMessagesEmail),
        productAnnouncementsEmail: Boolean(input.productAnnouncementsEmail)
    };

    try {
    
        const updated = await pool.query(
            `
              INSERT INTO carereceiver_settings (
                user_id,
                booking_updates_email,
                booking_reminders_email,
                new_messages_email,
                product_announcements_email,
                updated_at
              )
              VALUES ($1, $2, $3, $4, $5, NOW())
              ON CONFLICT (user_id)
              DO UPDATE SET
                booking_updates_email = EXCLUDED.booking_updates_email,
                booking_reminders_email = EXCLUDED.booking_reminders_email,
                new_messages_email = EXCLUDED.new_messages_email,
                product_announcements_email = EXCLUDED.product_announcements_email,
                updated_at = NOW()
              RETURNING updated_at
            `,
            [
                userId,
                nextSettings.bookingUpdatesEmail,
                nextSettings.bookingRemindersEmail,
                nextSettings.newMessagesEmail,
                nextSettings.productAnnouncementsEmail
            ]
        );

        return res.json({
            data: {
                userId,
                settings: nextSettings,
                updatedAt: updated.rows?.[0]?.updated_at || null
            }
        });
    } catch (error) {
        console.error("[carereceiver-settings] PUT notifications failed:", error);
        return res.status(500).json({
            error: { message: "Could not save notification settings." }
        });
    }
});

router.get("/carereceiver/settings/payments", async (req, res) => {
    const userId = resolveViewerId(req);
    if (!userId) {
        return res.status(401).json({
            error: { message: "Missing or invalid user context." }
        });
    }

    try {
        const row = await readSettingsRow(userId);
        return res.json({
            data: {
                userId,
                stripeCustomerId: String(row?.stripe_customer_id || "").trim(),
                updatedAt: row?.updated_at || null
            }
        });
    } catch (error) {
        console.error("[carereceiver-settings] GET payments failed:", error);
        return res.status(500).json({
            error: { message: "Could not load payment settings." }
        });
    }
});

router.put("/carereceiver/settings/payments/stripe-customer", async (req, res) => {
    const userId = resolveViewerId(req);
    if (!userId) {
        return res.status(401).json({
            error: { message: "Missing or invalid user context." }
        });
    }

    const stripeCustomerId = String(req.body?.stripeCustomerId || "").trim();
    if (stripeCustomerId && !STRIPE_CUSTOMER_ID_RE.test(stripeCustomerId)) {
        return res.status(400).json({
            error: { message: "Invalid Stripe customer id." }
        });
    }

    try {
    
        const updated = await pool.query(
            `
              INSERT INTO carereceiver_settings (
                user_id,
                stripe_customer_id,
                updated_at
              )
              VALUES ($1, NULLIF($2, ''), NOW())
              ON CONFLICT (user_id)
              DO UPDATE SET
                stripe_customer_id = EXCLUDED.stripe_customer_id,
                updated_at = NOW()
              RETURNING updated_at
            `,
            [userId, stripeCustomerId]
        );

        return res.json({
            data: {
                userId,
                stripeCustomerId,
                updatedAt: updated.rows?.[0]?.updated_at || null
            }
        });
    } catch (error) {
        console.error("[carereceiver-settings] PUT stripe customer failed:", error);
        return res.status(500).json({
            error: { message: "Could not save Stripe customer mapping." }
        });
    }
});

export default router;
