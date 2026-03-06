import { pool } from "./db.js";

export async function seedMessagingData() {
    try {
        await pool.query(`
        INSERT INTO carereceiver_conversations (
          id,
          booking_id,
          care_receiver_id,
          caregiver_id,
          caregiver_name,
          caregiver_photo_url,
          caregiver_phone,
          is_active,
          created_at,
          updated_at
        )
        SELECT DISTINCT ON (b.conversation_id)
          b.conversation_id,
          b.id,
          b.care_receiver_id,
          COALESCE(to_jsonb(b)->>'caregiver_id', ''),
          COALESCE(b.caregiver_name, 'Caregiver'),
          b.caregiver_photo_url,
          COALESCE(to_jsonb(b)->>'caregiver_phone', ''),
          TRUE,
          COALESCE(b.created_at, NOW()),
          COALESCE(b.updated_at, NOW())
        FROM carereceiver_dashboard_bookings b
        WHERE b.conversation_id IS NOT NULL
        ORDER BY
          b.conversation_id,
          (COALESCE(to_jsonb(b)->>'caregiver_id', '') <> '') DESC,
          (COALESCE(to_jsonb(b)->>'caregiver_phone', '') <> '') DESC,
          COALESCE(b.updated_at, b.created_at, NOW()) DESC,
          b.id DESC
        ON CONFLICT (id) DO UPDATE SET
          booking_id = EXCLUDED.booking_id,
          care_receiver_id = EXCLUDED.care_receiver_id,
          caregiver_id = EXCLUDED.caregiver_id,
          caregiver_name = EXCLUDED.caregiver_name,
          caregiver_photo_url = EXCLUDED.caregiver_photo_url,
          caregiver_phone = EXCLUDED.caregiver_phone,
          updated_at = NOW();
    `);

        await pool.query(`
        WITH seed(message_uid, conversation_id, sender_role, sender_name, message_text, read_at, sent_at) AS (
          VALUES
            ('seed-conv-1011-1', 'conv-1011', 'caregiver', 'John Anderson', 'Hi, I am on my way and should arrive in around 10 minutes.', NOW() - INTERVAL '2 hours 20 minutes', NOW() - INTERVAL '2 hours 25 minutes'),
            ('seed-conv-1011-2', 'conv-1011', 'care_receiver', 'You', 'Perfect, thank you. Please ring the front bell when you arrive.', NOW() - INTERVAL '2 hours 15 minutes', NOW() - INTERVAL '2 hours 18 minutes'),
            ('seed-conv-1011-3', 'conv-1011', 'caregiver', 'John Anderson', 'Will do. Looking forward to this afternoon session.', NULL, NOW() - INTERVAL '2 hours 10 minutes'),
            ('seed-conv-1002-1', 'conv-1002', 'caregiver', 'Mary Thompson', 'Thank you again for the lovely visit yesterday.', NOW() - INTERVAL '1 day 3 hours', NOW() - INTERVAL '1 day 3 hours 5 minutes'),
            ('seed-conv-1002-2', 'conv-1002', 'care_receiver', 'You', 'Thank you Mary, mum was very happy. See you next week.', NOW() - INTERVAL '1 day 2 hours 50 minutes', NOW() - INTERVAL '1 day 3 hours 1 minute'),
            ('seed-conv-1012-1', 'conv-1012', 'caregiver', 'Emma Wilson', 'I can help with light housework on Friday at 2 PM.', NULL, NOW() - INTERVAL '5 hours')
        )
        INSERT INTO carereceiver_messages (
          message_uid,
          conversation_id,
          sender_role,
          sender_name,
          message_text,
          read_at,
          sent_at,
          is_system_message,
          is_flagged
        )
        SELECT
          s.message_uid,
          s.conversation_id,
          s.sender_role,
          s.sender_name,
          s.message_text,
          s.read_at,
          s.sent_at,
          FALSE,
          FALSE
        FROM seed s
        INNER JOIN carereceiver_conversations c ON c.id = s.conversation_id
        ON CONFLICT (message_uid) DO NOTHING;
    `);

        await pool.query(`
        UPDATE carereceiver_conversations c
        SET
          last_message_preview = latest.message_text,
          last_message_at = latest.sent_at,
          care_receiver_unread_count = unread.unread_count,
          updated_at = NOW()
        FROM LATERAL (
          SELECT m.message_text, m.sent_at
          FROM carereceiver_messages m
          WHERE m.conversation_id = c.id
            AND m.deleted_at IS NULL
          ORDER BY m.sent_at DESC
          LIMIT 1
        ) latest,
        LATERAL (
          SELECT COUNT(*)::int AS unread_count
          FROM carereceiver_messages m
          WHERE m.conversation_id = c.id
            AND m.sender_role = 'caregiver'
            AND m.read_at IS NULL
            AND m.deleted_at IS NULL
        ) unread
        WHERE c.id IS NOT NULL;
    `);
    } catch (error) {
        console.error("[seed-messaging] backfill skipped due to error:", error);
    }
}
