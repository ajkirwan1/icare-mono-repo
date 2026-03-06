/* global console */
import { pool } from "../../db/db.js";
import { UUID_RE } from "../../utils/identity.js";
import { makeScopeClause } from "./messaging.service.js";

async function resolveViewer(req, preferredUserTypes = ["care_receiver", "family"]) {
    const headerUserId = String(req.get("x-user-id") || "").trim();
    const headerEmail = String(req.get("x-user-email") || "").trim().toLowerCase();
    const allowedTypes = Array.isArray(preferredUserTypes) && preferredUserTypes.length > 0
        ? preferredUserTypes
        : ["care_receiver", "family"];

    if (UUID_RE.test(headerUserId)) {
        const byId = await pool.query(
            `
            SELECT id, email, user_type, first_name, last_name
                 , gdpr_consent AS "gdprConsent"
                 , gdpr_consent_date AS "gdprConsentDate"
                 , NULLIF(to_jsonb(users)->>'terms_accepted_at', '') AS "termsAcceptedAt"
            FROM users
            WHERE id = $1
              AND deleted_at IS NULL
              AND user_type = ANY($2::text[])
            LIMIT 1
            `,
            [headerUserId, allowedTypes]
        );
        if (byId.rows?.[0]) {
            return byId.rows[0];
        }
    }

    if (headerEmail) {
        const byEmail = await pool.query(
            `
            SELECT id, email, user_type, first_name, last_name
                 , gdpr_consent AS "gdprConsent"
                 , gdpr_consent_date AS "gdprConsentDate"
                 , NULLIF(to_jsonb(users)->>'terms_accepted_at', '') AS "termsAcceptedAt"
            FROM users
            WHERE lower(email) = $1
              AND deleted_at IS NULL
              AND user_type = ANY($2::text[])
            LIMIT 1
            `,
            [headerEmail, allowedTypes]
        );
        if (byEmail.rows?.[0]) {
            return byEmail.rows[0];
        }
    }

    const fallback = await pool.query(
        `
        SELECT id, email, user_type, first_name, last_name
             , gdpr_consent AS "gdprConsent"
             , gdpr_consent_date AS "gdprConsentDate"
             , NULLIF(to_jsonb(users)->>'terms_accepted_at', '') AS "termsAcceptedAt"
        FROM users
        WHERE user_type = ANY($1::text[])
          AND deleted_at IS NULL
        ORDER BY created_at DESC
        LIMIT 1
        `,
        [allowedTypes]
    );

    return fallback.rows?.[0] || null;
}

async function resolveConversationByIdOrBooking(identifier, viewerId) {


    const cleanId = String(identifier || "").trim();
    if (!cleanId) {
        return null;
    }

    const scope = makeScopeClause(viewerId, "c", 2);
    const conversationSql = `
        SELECT
          c.id,
          c.booking_id AS "bookingId",
          c.care_receiver_id AS "careReceiverId",
          c.caregiver_id AS "caregiverId",
          c.caregiver_name AS "caregiverName",
          c.caregiver_photo_url AS "caregiverPhotoUrl",
          c.caregiver_phone AS "caregiverPhone",
          c.is_active AS "isActive",
          c.care_receiver_unread_count AS "unreadCount",
          c.last_message_at AS "lastMessageAt",
          c.last_message_preview AS "lastMessagePreview",
          c.created_at AS "createdAt",
          c.updated_at AS "updatedAt",
          b.status AS "bookingStatus",
          COALESCE(to_jsonb(b)->>'booking_ref', UPPER(b.id)) AS "bookingRef",
          to_char(b.booking_date, 'YYYY-MM-DD') AS "bookingDate",
          to_char(b.start_time, 'HH12:MI AM') AS "bookingStartTime"
        FROM carereceiver_conversations c
        LEFT JOIN carereceiver_dashboard_bookings b ON b.id = c.booking_id
        WHERE (c.id = $1 OR c.booking_id = $1)
          ${scope.sql ? `AND (${scope.sql.replace(/^WHERE\s+/i, "")})` : ""}
        LIMIT 1
    `;

    const conversation = await pool.query(conversationSql, [cleanId, ...scope.params]);
    if (conversation.rows?.[0]) {
        return conversation.rows[0];
    }

    const bookingScope = viewerId ? "AND (b.care_receiver_id IS NULL OR b.care_receiver_id = $2)" : "";
    const bookingParams = viewerId ? [cleanId, viewerId] : [cleanId];
    const bookingRow = await pool.query(
        `
        SELECT
          b.id,
          b.conversation_id AS "conversationId",
          b.care_receiver_id AS "careReceiverId",
          COALESCE(to_jsonb(b)->>'caregiver_id', '') AS "caregiverId",
          b.caregiver_name AS "caregiverName",
          b.caregiver_photo_url AS "caregiverPhotoUrl",
          COALESCE(to_jsonb(b)->>'caregiver_phone', '') AS "caregiverPhone"
        FROM carereceiver_dashboard_bookings b
        WHERE (
          b.id = $1
          OR b.conversation_id = $1
          OR lower(COALESCE(to_jsonb(b)->>'booking_ref', '')) = lower($1)
        )
          ${bookingScope}
        LIMIT 1
        `,
        bookingParams
    );

    const booking = bookingRow.rows?.[0];
    if (!booking) {
        const syntheticConversationId = /^conv-[a-z0-9-]+$/i.test(cleanId)
            ? cleanId
            : (/^bk-[a-z0-9-]+$/i.test(cleanId) ? `conv-${cleanId.toLowerCase()}` : "");

        if (syntheticConversationId) {
            await pool.query(
                `
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
                ) VALUES ($1, NULL, $2, '', 'Caregiver', NULL, '', TRUE, NOW(), NOW())
                ON CONFLICT (id) DO NOTHING
                `,
                [syntheticConversationId, viewerId || null]
            );

            const orphanConversation = await pool.query(conversationSql, [syntheticConversationId, ...scope.params]);
            if (orphanConversation.rows?.[0]) {
                return orphanConversation.rows[0];
            }
        }

        return null;
    }

    const conversationId = String(booking.conversationId || "").trim() || `conv-${booking.id}`;

    await pool.query(
        `
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
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, TRUE, NOW(), NOW())
        ON CONFLICT (id) DO UPDATE SET
          booking_id = EXCLUDED.booking_id,
          care_receiver_id = EXCLUDED.care_receiver_id,
          caregiver_id = EXCLUDED.caregiver_id,
          caregiver_name = EXCLUDED.caregiver_name,
          caregiver_photo_url = EXCLUDED.caregiver_photo_url,
          caregiver_phone = EXCLUDED.caregiver_phone,
          updated_at = NOW()
        `,
        [
            conversationId,
            booking.id,
            booking.careReceiverId || null,
            booking.caregiverId || null,
            booking.caregiverName || "Caregiver",
            booking.caregiverPhotoUrl || null,
            booking.caregiverPhone || null
        ]
    );

    const createdConversation = await pool.query(conversationSql, [conversationId, ...scope.params]);
    return createdConversation.rows?.[0] || null;
}

async function backfillReadReceiptsFromReplies(conversationId) {
    await pool.query(
        `
        UPDATE carereceiver_messages m
        SET read_at = (
          SELECT MIN(cg.sent_at)
          FROM carereceiver_messages cg
          WHERE cg.conversation_id = m.conversation_id
            AND cg.sender_role = 'caregiver'
            AND cg.deleted_at IS NULL
            AND cg.sent_at >= m.sent_at
        )
        WHERE m.conversation_id = $1
          AND m.sender_role = 'care_receiver'
          AND m.read_at IS NULL
          AND m.deleted_at IS NULL
          AND EXISTS (
            SELECT 1
            FROM carereceiver_messages cg
            WHERE cg.conversation_id = m.conversation_id
              AND cg.sender_role = 'caregiver'
              AND cg.deleted_at IS NULL
              AND cg.sent_at >= m.sent_at
          )
        `,
        [conversationId]
    );
}

async function backfillReadReceiptsFromCareReceiverReplies(conversationId) {
    await pool.query(
        `
        UPDATE carereceiver_messages m
        SET read_at = (
          SELECT MIN(cr.sent_at)
          FROM carereceiver_messages cr
          WHERE cr.conversation_id = m.conversation_id
            AND cr.sender_role = 'care_receiver'
            AND cr.deleted_at IS NULL
            AND cr.sent_at >= m.sent_at
        )
        WHERE m.conversation_id = $1
          AND m.sender_role = 'caregiver'
          AND m.read_at IS NULL
          AND m.deleted_at IS NULL
          AND EXISTS (
            SELECT 1
            FROM carereceiver_messages cr
            WHERE cr.conversation_id = m.conversation_id
              AND cr.sender_role = 'care_receiver'
              AND cr.deleted_at IS NULL
              AND cr.sent_at >= m.sent_at
          )
        `,
        [conversationId]
    );
}

export {
    resolveViewer,
    resolveConversationByIdOrBooking,
    backfillReadReceiptsFromReplies,
    backfillReadReceiptsFromCareReceiverReplies
};
