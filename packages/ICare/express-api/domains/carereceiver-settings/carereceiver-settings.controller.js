/* global console */
import { pool } from "../../db/db.js";
import {
    STRIPE_CUSTOMER_ID_RE,
    resolveViewerId,
    toNotificationSettings
} from "./carereceiver-settings.service.js";
import { readSettingsRow } from "./carereceiver-settings.repository.js";

export async function getNotifications(req, res) {
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
}

export async function putNotifications(req, res) {
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
}

export async function getPayments(req, res) {
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
}

export async function putStripeCustomer(req, res) {
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
}
