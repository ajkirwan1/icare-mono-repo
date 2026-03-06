import { pool } from "../../db/db.js";

export async function readSettingsRow(userId) {
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
