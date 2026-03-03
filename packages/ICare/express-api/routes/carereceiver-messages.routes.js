import { Router } from "express";
import { pool } from "../db/db.js";
import { sanitizeMessage } from "../../app/utils/contact-protection.js";
import { hasAcceptedTerms, termsNotAcceptedError } from "../utils/terms-acceptance.js";

const router = Router();
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
let schemaReady = false;
let seedBackfillDone = false;

async function ensureMessagingSchema() {
    if (schemaReady) {
        return;
    }

    await pool.query(`
        CREATE TABLE IF NOT EXISTS carereceiver_conversations (
          id VARCHAR(64) PRIMARY KEY,
          booking_id VARCHAR(32) REFERENCES carereceiver_dashboard_bookings(id) ON DELETE SET NULL,
          care_receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
          caregiver_id VARCHAR(64),
          caregiver_name VARCHAR(200) NOT NULL DEFAULT 'Caregiver',
          caregiver_photo_url TEXT,
          caregiver_phone VARCHAR(40),
          is_active BOOLEAN DEFAULT TRUE,
          care_receiver_unread_count INTEGER DEFAULT 0,
          caregiver_unread_count INTEGER DEFAULT 0,
          last_message_preview TEXT,
          last_message_at TIMESTAMP,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
    `);

    await pool.query(`
        ALTER TABLE carereceiver_conversations
          ADD COLUMN IF NOT EXISTS booking_id VARCHAR(32),
          ADD COLUMN IF NOT EXISTS care_receiver_id UUID,
          ADD COLUMN IF NOT EXISTS caregiver_id VARCHAR(64),
          ADD COLUMN IF NOT EXISTS caregiver_name VARCHAR(200) NOT NULL DEFAULT 'Caregiver',
          ADD COLUMN IF NOT EXISTS caregiver_photo_url TEXT,
          ADD COLUMN IF NOT EXISTS caregiver_phone VARCHAR(40),
          ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE,
          ADD COLUMN IF NOT EXISTS care_receiver_unread_count INTEGER DEFAULT 0,
          ADD COLUMN IF NOT EXISTS caregiver_unread_count INTEGER DEFAULT 0,
          ADD COLUMN IF NOT EXISTS last_message_preview TEXT,
          ADD COLUMN IF NOT EXISTS last_message_at TIMESTAMP,
          ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW(),
          ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW();
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS carereceiver_messages (
          id BIGSERIAL PRIMARY KEY,
          message_uid VARCHAR(64) UNIQUE,
          conversation_id VARCHAR(64) NOT NULL REFERENCES carereceiver_conversations(id) ON DELETE CASCADE,
          sender_role VARCHAR(20) NOT NULL
            CHECK (sender_role IN ('care_receiver', 'caregiver', 'system')),
          sender_name VARCHAR(200) NOT NULL DEFAULT 'Unknown',
          message_text TEXT NOT NULL,
          read_at TIMESTAMP,
          sent_at TIMESTAMP DEFAULT NOW(),
          is_system_message BOOLEAN DEFAULT FALSE,
          is_flagged BOOLEAN DEFAULT FALSE,
          deleted_at TIMESTAMP
        );
    `);

    await pool.query(`
        ALTER TABLE carereceiver_messages
          ADD COLUMN IF NOT EXISTS message_uid VARCHAR(64),
          ADD COLUMN IF NOT EXISTS sender_role VARCHAR(20) NOT NULL DEFAULT 'caregiver',
          ADD COLUMN IF NOT EXISTS sender_name VARCHAR(200) NOT NULL DEFAULT 'Unknown',
          ADD COLUMN IF NOT EXISTS message_text TEXT NOT NULL DEFAULT '',
          ADD COLUMN IF NOT EXISTS read_at TIMESTAMP,
          ADD COLUMN IF NOT EXISTS sent_at TIMESTAMP DEFAULT NOW(),
          ADD COLUMN IF NOT EXISTS is_system_message BOOLEAN DEFAULT FALSE,
          ADD COLUMN IF NOT EXISTS is_flagged BOOLEAN DEFAULT FALSE,
          ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP;
    `);

    await pool.query(`
        CREATE INDEX IF NOT EXISTS idx_cr_conversations_receiver
          ON carereceiver_conversations(care_receiver_id, last_message_at DESC);
    `);
    await pool.query(`
        CREATE INDEX IF NOT EXISTS idx_cr_conversations_booking
          ON carereceiver_conversations(booking_id);
    `);
    await pool.query(`
        CREATE INDEX IF NOT EXISTS idx_cr_messages_conversation_sent
          ON carereceiver_messages(conversation_id, sent_at DESC);
    `);

    schemaReady = true;
}

async function ensureBackfilledConversationsAndMessages() {
    if (seedBackfillDone) {
        return;
    }
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

        seedBackfillDone = true;
    } catch (error) {
        seedBackfillDone = true;
        console.error("[carereceiver-messages] backfill skipped due to error:", error);
    }
}

function parsePositiveInt(value, fallback, max = 100) {
    const parsed = Number.parseInt(String(value ?? ""), 10);
    if (!Number.isFinite(parsed) || parsed <= 0) {
        return fallback;
    }
    return Math.min(parsed, max);
}

function compactMessagePreview(text, maxLength = 100) {
    const compact = String(text || "").replace(/\s+/g, " ").trim();
    if (compact.length <= maxLength) {
        return compact;
    }
    return `${compact.slice(0, maxLength - 1)}…`;
}

function sanitizeMessagePayload(text) {
    const sanitized = sanitizeMessage(String(text || ""));
    const hasMaskedContent = Object.values(sanitized.flags).some(Boolean);

    return {
        text: sanitized.sanitizedText,
        flags: sanitized.flags,
        hasMaskedContent
    };
}

function mapMessageForResponse(message, conversation, viewer, opts = {}) {
    const sanitized = sanitizeMessagePayload(message.text);
    const explicitFlag = Boolean(message.isFlagged);
    const isMasked = explicitFlag || sanitized.hasMaskedContent;
    const caregiverSenderId = opts.caregiverSenderId || conversation.caregiverId || "caregiver";
    const careReceiverSenderId = opts.careReceiverSenderId || conversation.careReceiverId || viewer?.id || "care_receiver";

    return {
        id: String(message.id),
        senderId: message.senderRole === "caregiver"
            ? caregiverSenderId
            : careReceiverSenderId,
        senderName: message.senderName,
        senderRole: message.senderRole,
        text: sanitized.text,
        sentAt: message.sentAt,
        readAt: message.readAt,
        isSystemMessage: Boolean(message.isSystemMessage),
        isFlagged: isMasked,
        metadata: {
            contactProtection: {
                masked: isMasked,
                flags: sanitized.flags
            },
            ...(opts.metadata || {})
        }
    };
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

function bookingContextLabel(row) {
    const bookingRef = String(row?.bookingRef || row?.bookingId || "").toUpperCase();
    const status = String(row?.bookingStatus || "").replaceAll("_", " ").trim();

    if (!bookingRef && !status) {
        return "Booking conversation";
    }
    if (!status) {
        return `Booking #${bookingRef}`;
    }
    if (!bookingRef) {
        return status.charAt(0).toUpperCase() + status.slice(1);
    }

    return `Booking #${bookingRef} - ${status.charAt(0).toUpperCase()}${status.slice(1)}`;
}

async function resolveViewer(req, preferredUserTypes = ["care_receiver", "family"]) {
    await ensureMessagingSchema();
    await ensureBackfilledConversationsAndMessages();

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

function ensureTermsAccepted(res, viewer) {
    if (hasAcceptedTerms(viewer)) {
        return true;
    }

    res.status(403).json(termsNotAcceptedError());
    return false;
}

function makeScopeClause(viewerId, alias = "c", startAt = 1) {
    if (!viewerId) {
        return {
            sql: "",
            params: [],
            nextIndex: startAt
        };
    }

    return {
        sql: `WHERE (${alias}.care_receiver_id IS NULL OR ${alias}.care_receiver_id = $${startAt})`,
        params: [viewerId],
        nextIndex: startAt + 1
    };
}

async function resolveConversationByIdOrBooking(identifier, viewerId) {
    await ensureMessagingSchema();
    await ensureBackfilledConversationsAndMessages();

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
        WHERE (b.id = $1 OR b.conversation_id = $1)
          ${bookingScope}
        LIMIT 1
        `,
        bookingParams
    );

    const booking = bookingRow.rows?.[0];
    if (!booking) {
        if (/^conv-[a-z0-9-]+$/i.test(cleanId)) {
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
                [cleanId, viewerId || null]
            );

            const orphanConversation = await pool.query(conversationSql, [cleanId, ...scope.params]);
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

function buildConversationDto(row) {
    const safeLastMessage = sanitizeMessagePayload(row.lastMessageText || row.lastMessagePreview || "");

    return {
        id: row.id,
        bookingId: row.bookingId || null,
        otherParty: {
            id: row.caregiverId || "",
            name: row.caregiverName || "Caregiver",
            profilePhotoUrl: row.caregiverPhotoUrl || "",
            phone: row.caregiverPhone || ""
        },
        bookingContext: {
            label: bookingContextLabel(row),
            status: row.bookingStatus || null,
            bookingDate: row.bookingDate || null,
            bookingStartTime: row.bookingStartTime || null
        },
        lastMessage: {
            id: row.lastMessageId ? String(row.lastMessageId) : null,
            senderName: row.lastMessageSenderName || row.caregiverName || "",
            text: safeLastMessage.text,
            sentAt: row.lastMessageSentAt || row.lastMessageAt || null,
            read: Boolean(row.lastMessageReadAt)
        },
        unreadCount: Number(row.unreadCount || 0),
        isActive: row.isActive !== false,
        createdAt: row.createdAt || null,
        updatedAt: row.updatedAt || null,
        threadType: row.bookingId ? "booking-linked" : "inquiry"
    };
}

function buildCaregiverConversationDto(row) {
    const careReceiverName = row.careReceiverName || "Care receiver";
    const safeLastMessage = sanitizeMessagePayload(row.lastMessageText || row.lastMessagePreview || "");

    return {
        id: row.id,
        bookingId: row.bookingId || null,
        otherParty: {
            id: row.careReceiverId || "",
            name: careReceiverName,
            profilePhotoUrl: row.careReceiverPhotoUrl || "",
            phone: row.careReceiverPhone || ""
        },
        bookingContext: {
            label: bookingContextLabel(row),
            status: row.bookingStatus || null,
            bookingDate: row.bookingDate || null,
            bookingStartTime: row.bookingStartTime || null
        },
        lastMessage: {
            id: row.lastMessageId ? String(row.lastMessageId) : null,
            senderName: row.lastMessageSenderName || careReceiverName,
            text: safeLastMessage.text,
            sentAt: row.lastMessageSentAt || row.lastMessageAt || null,
            read: Boolean(row.lastMessageReadAt)
        },
        unreadCount: Number(row.unreadCount || 0),
        isActive: row.isActive !== false,
        createdAt: row.createdAt || null,
        updatedAt: row.updatedAt || null,
        threadType: row.bookingId ? "booking-linked" : "inquiry"
    };
}

router.get("/conversations/unread-count", async (req, res) => {
    try {
        await ensureMessagingSchema();
        await ensureBackfilledConversationsAndMessages();
        const viewer = await resolveViewer(req, ["care_receiver", "family"]);
        const scope = makeScopeClause(viewer?.id || null, "c", 1);

        const totals = await pool.query(
            `
            SELECT COALESCE(SUM(c.care_receiver_unread_count), 0)::int AS total
            FROM carereceiver_conversations c
            ${scope.sql}
            `,
            scope.params
        );

        return res.status(200).json({
            success: true,
            data: {
                total: Number(totals.rows?.[0]?.total || 0)
            }
        });
    } catch (error) {
        console.error("[carereceiver-messages] GET /conversations/unread-count failed:", error);
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: "Could not load unread message count."
            }
        });
    }
});

router.get("/conversations", async (req, res) => {
    try {
        await ensureMessagingSchema();
        await ensureBackfilledConversationsAndMessages();
        const viewer = await resolveViewer(req, ["care_receiver", "family"]);
        const page = parsePositiveInt(req.query.page, 1, 1000);
        const limit = parsePositiveInt(req.query.limit, 25, 100);
        const offset = (page - 1) * limit;
        const scope = makeScopeClause(viewer?.id || null, "c", 1);

        const listQuery = `
            SELECT
              c.id,
              c.booking_id AS "bookingId",
              c.care_receiver_unread_count AS "unreadCount",
              c.caregiver_id AS "caregiverId",
              c.caregiver_name AS "caregiverName",
              c.caregiver_photo_url AS "caregiverPhotoUrl",
              c.caregiver_phone AS "caregiverPhone",
              c.is_active AS "isActive",
              c.last_message_at AS "lastMessageAt",
              c.last_message_preview AS "lastMessagePreview",
              c.created_at AS "createdAt",
              c.updated_at AS "updatedAt",
              b.status AS "bookingStatus",
              COALESCE(to_jsonb(b)->>'booking_ref', UPPER(b.id)) AS "bookingRef",
              to_char(b.booking_date, 'YYYY-MM-DD') AS "bookingDate",
              to_char(b.start_time, 'HH12:MI AM') AS "bookingStartTime",
              lm.id AS "lastMessageId",
              lm.sender_name AS "lastMessageSenderName",
              lm.message_text AS "lastMessageText",
              lm.sent_at AS "lastMessageSentAt",
              lm.read_at AS "lastMessageReadAt"
            FROM carereceiver_conversations c
            LEFT JOIN carereceiver_dashboard_bookings b ON b.id = c.booking_id
            LEFT JOIN LATERAL (
              SELECT id, sender_name, message_text, sent_at, read_at
              FROM carereceiver_messages m
              WHERE m.conversation_id = c.id AND m.deleted_at IS NULL
              ORDER BY m.sent_at DESC
              LIMIT 1
            ) lm ON TRUE
            ${scope.sql}
            ORDER BY COALESCE(lm.sent_at, c.last_message_at, c.updated_at, c.created_at) DESC
            LIMIT $${scope.nextIndex}
            OFFSET $${scope.nextIndex + 1}
        `;

        const countQuery = `
            SELECT
              COUNT(*)::int AS total,
              COALESCE(SUM(c.care_receiver_unread_count), 0)::int AS unread_total
            FROM carereceiver_conversations c
            ${scope.sql}
        `;

        const [listResult, countResult] = await Promise.all([
            pool.query(listQuery, [...scope.params, limit, offset]),
            pool.query(countQuery, scope.params)
        ]);

        let conversations = (listResult.rows || []).map(buildConversationDto);
        let totalCount = Number(countResult.rows?.[0]?.total || 0);
        let unreadCountTotal = Number(countResult.rows?.[0]?.unread_total || 0);
        let totalPages = Math.max(1, Math.ceil(totalCount / limit));

        // Fallback: if conversation table is empty, derive list directly from bookings.
        if (conversations.length === 0) {
            const fallbackFilters = ["b.conversation_id IS NOT NULL"];
            const fallbackParams = [];
            if (viewer?.id) {
                fallbackParams.push(viewer.id);
                fallbackFilters.push(`(b.care_receiver_id IS NULL OR b.care_receiver_id = $${fallbackParams.length})`);
            }
            const fallbackWhereSql = `WHERE ${fallbackFilters.join(" AND ")}`;
            const fallbackLimitParam = fallbackParams.length + 1;
            const fallbackOffsetParam = fallbackParams.length + 2;

            const fallbackList = await pool.query(
                `
                SELECT
                  b.conversation_id AS id,
                  b.id AS "bookingId",
                  COALESCE(to_jsonb(b)->>'caregiver_id', '') AS "caregiverId",
                  b.caregiver_name AS "caregiverName",
                  b.caregiver_photo_url AS "caregiverPhotoUrl",
                  COALESCE(to_jsonb(b)->>'caregiver_phone', '') AS "caregiverPhone",
                  TRUE AS "isActive",
                  NULL::int AS "unreadCount",
                  b.updated_at AS "updatedAt",
                  b.created_at AS "createdAt",
                  b.status AS "bookingStatus",
                  COALESCE(to_jsonb(b)->>'booking_ref', UPPER(b.id)) AS "bookingRef",
                  to_char(b.booking_date, 'YYYY-MM-DD') AS "bookingDate",
                  to_char(b.start_time, 'HH12:MI AM') AS "bookingStartTime",
                  NULL::bigint AS "lastMessageId",
                  b.caregiver_name AS "lastMessageSenderName",
                  '' AS "lastMessageText",
                  b.updated_at AS "lastMessageSentAt",
                  NULL::timestamp AS "lastMessageReadAt"
                FROM carereceiver_dashboard_bookings b
                ${fallbackWhereSql}
                ORDER BY COALESCE(b.updated_at, b.created_at) DESC
                LIMIT $${fallbackLimitParam}
                OFFSET $${fallbackOffsetParam}
                `,
                [...fallbackParams, limit, offset]
            );

            const fallbackCount = await pool.query(
                `
                SELECT COUNT(*)::int AS total
                FROM carereceiver_dashboard_bookings b
                ${fallbackWhereSql}
                `,
                fallbackParams
            );

            conversations = (fallbackList.rows || []).map(buildConversationDto);
            totalCount = Number(fallbackCount.rows?.[0]?.total || conversations.length);
            unreadCountTotal = 0;
            totalPages = Math.max(1, Math.ceil(totalCount / limit));
        }

        return res.status(200).json({
            success: true,
            data: {
                conversations,
                unreadCountTotal,
                pagination: {
                    page,
                    limit,
                    totalPages,
                    totalCount
                }
            }
        });
    } catch (error) {
        console.error("[carereceiver-messages] GET /conversations failed:", error);
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: process.env.NODE_ENV === "production"
                    ? "Could not load conversations."
                    : `Could not load conversations. ${error?.message || ""}`.trim()
            }
        });
    }
});

router.get("/conversations/:conversationId/messages", async (req, res) => {
    const identifier = String(req.params.conversationId || "").trim();
    if (!identifier) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Conversation id is required."
            }
        });
    }

    try {
        await ensureMessagingSchema();
        await ensureBackfilledConversationsAndMessages();
        const viewer = await resolveViewer(req, ["care_receiver", "family"]);
        const conversation = await resolveConversationByIdOrBooking(identifier, viewer?.id || null);
        if (!conversation) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "RESOURCE_NOT_FOUND",
                    message: "Conversation not found."
                }
            });
        }

        const page = parsePositiveInt(req.query.page, 1, 1000);
        const limit = parsePositiveInt(req.query.limit, 50, 200);
        const offset = (page - 1) * limit;

        try {
            await pool.query(
                `
                UPDATE carereceiver_messages
                SET read_at = NOW()
                WHERE conversation_id = $1
                  AND sender_role = 'caregiver'
                  AND read_at IS NULL
                  AND deleted_at IS NULL
                `,
                [conversation.id]
            );

            await pool.query(
                `
                UPDATE carereceiver_conversations
                SET care_receiver_unread_count = 0, updated_at = NOW()
                WHERE id = $1
                `,
                [conversation.id]
            );

            // If caregiver has already replied to a care receiver message,
            // mark that earlier outgoing message as read.
            await backfillReadReceiptsFromReplies(conversation.id);
        } catch (readStateError) {
            console.error("[carereceiver-messages] read state sync skipped:", readStateError);
        }

        const [messagesResult, countResult] = await Promise.all([
            pool.query(
                `
                SELECT
                  id,
                  sender_role AS "senderRole",
                  sender_name AS "senderName",
                  message_text AS text,
                  sent_at AS "sentAt",
                  read_at AS "readAt",
                  is_system_message AS "isSystemMessage",
                  is_flagged AS "isFlagged"
                FROM carereceiver_messages
                WHERE conversation_id = $1
                  AND deleted_at IS NULL
                ORDER BY sent_at ASC
                LIMIT $2
                OFFSET $3
                `,
                [conversation.id, limit, offset]
            ),
            pool.query(
                `
                SELECT COUNT(*)::int AS total
                FROM carereceiver_messages
                WHERE conversation_id = $1
                  AND deleted_at IS NULL
                `,
                [conversation.id]
            )
        ]);

        const totalCount = Number(countResult.rows?.[0]?.total || 0);
        const totalPages = Math.max(1, Math.ceil(totalCount / limit));

        return res.status(200).json({
            success: true,
            data: {
                conversation: buildConversationDto(conversation),
                conversationId: conversation.id,
                bookingId: conversation.bookingId || null,
                messages: (messagesResult.rows || []).map((message) => ({
                    ...mapMessageForResponse(message, conversation, viewer)
                })),
                pagination: {
                    page,
                    limit,
                    totalPages,
                    totalCount
                }
            }
        });
    } catch (error) {
        console.error("[carereceiver-messages] GET /conversations/:id/messages failed:", error);
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: "Could not load conversation messages."
            }
        });
    }
});

router.post("/conversations/:conversationId/messages", async (req, res) => {
    const identifier = String(req.params.conversationId || "").trim();
    const text = String(req.body?.text || "").trim();

    if (!identifier) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Conversation id is required."
            }
        });
    }

    if (!text) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Message text is required."
            }
        });
    }

    if (text.length > 2000) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Message exceeds 2000 characters."
            }
        });
    }

    try {
        await ensureMessagingSchema();
        await ensureBackfilledConversationsAndMessages();
        const viewer = await resolveViewer(req, ["care_receiver", "family"]);
        if (!ensureTermsAccepted(res, viewer)) {
            return;
        }
        const conversation = await resolveConversationByIdOrBooking(identifier, viewer?.id || null);

        if (!conversation) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "RESOURCE_NOT_FOUND",
                    message: "Conversation not found."
                }
            });
        }

        const senderName = [viewer?.first_name, viewer?.last_name].filter(Boolean).join(" ").trim() || "You";
        const protectedMessage = sanitizeMessagePayload(text);

        const inserted = await pool.query(
            `
            INSERT INTO carereceiver_messages (
              conversation_id,
              sender_role,
              sender_name,
              message_text,
              sent_at,
              is_system_message,
              is_flagged
            ) VALUES ($1, 'care_receiver', $2, $3, NOW(), FALSE, $4)
            RETURNING id, sent_at AS "sentAt", is_flagged AS "isFlagged"
            `,
            [conversation.id, senderName, protectedMessage.text, protectedMessage.hasMaskedContent]
        );

        const message = inserted.rows?.[0];
        await pool.query(
            `
            UPDATE carereceiver_conversations
            SET
              last_message_preview = $2,
              last_message_at = NOW(),
              caregiver_unread_count = COALESCE(caregiver_unread_count, 0) + 1,
              updated_at = NOW()
            WHERE id = $1
            `,
            [conversation.id, compactMessagePreview(protectedMessage.text)]
        );

        return res.status(201).json({
            success: true,
            data: {
                messageId: String(message.id),
                conversationId: conversation.id,
                text: protectedMessage.text,
                sentAt: message.sentAt,
                isFlagged: Boolean(message.isFlagged)
            }
        });
    } catch (error) {
        console.error("[carereceiver-messages] POST /conversations/:id/messages failed:", error);
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: "Could not send message."
            }
        });
    }
});

router.put("/messages/:messageId/read", async (req, res) => {
    const messageId = String(req.params.messageId || "").trim();
    if (!messageId) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Message id is required."
            }
        });
    }

    try {
        await ensureMessagingSchema();
        await ensureBackfilledConversationsAndMessages();
        const viewer = await resolveViewer(req, ["care_receiver", "family"]);
        const scope = makeScopeClause(viewer?.id || null, "c", 2);

        const messageQuery = `
            SELECT
              m.id,
              m.sender_role AS "senderRole",
              m.read_at AS "readAt",
              m.conversation_id AS "conversationId"
            FROM carereceiver_messages m
            JOIN carereceiver_conversations c ON c.id = m.conversation_id
            WHERE m.id = $1
              ${scope.sql ? `AND (${scope.sql.replace(/^WHERE\s+/i, "")})` : ""}
              AND m.deleted_at IS NULL
            LIMIT 1
        `;

        const messageResult = await pool.query(messageQuery, [messageId, ...scope.params]);
        const row = messageResult.rows?.[0];
        if (!row) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "RESOURCE_NOT_FOUND",
                    message: "Message not found."
                }
            });
        }

        // Care receiver can mark caregiver messages as read.
        if (String(row.senderRole || "") !== "caregiver") {
            return res.status(403).json({
                success: false,
                error: {
                    code: "FORBIDDEN",
                    message: "Only received messages can be marked as read."
                }
            });
        }

        if (row.readAt) {
            return res.status(200).json({
                success: true,
                data: {
                    messageId: String(row.id),
                    readAt: row.readAt
                }
            });
        }

        const updated = await pool.query(
            `
            UPDATE carereceiver_messages
            SET read_at = NOW()
            WHERE id = $1
            RETURNING id, read_at AS "readAt", conversation_id AS "conversationId"
            `,
            [messageId]
        );

        const readMessage = updated.rows?.[0];

        await pool.query(
            `
            UPDATE carereceiver_conversations
            SET care_receiver_unread_count = GREATEST(0, COALESCE(care_receiver_unread_count, 0) - 1),
                updated_at = NOW()
            WHERE id = $1
            `,
            [readMessage.conversationId]
        );

        return res.status(200).json({
            success: true,
            data: {
                messageId: String(readMessage.id),
                readAt: readMessage.readAt
            }
        });
    } catch (error) {
        console.error("[carereceiver-messages] PUT /messages/:id/read failed:", error);
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: "Could not mark message as read."
            }
        });
    }
});

router.get("/caregiver/conversations/unread-count", async (req, res) => {
    try {
        await ensureMessagingSchema();
        await ensureBackfilledConversationsAndMessages();

        const totals = await pool.query(
            `
            SELECT COALESCE(SUM(c.caregiver_unread_count), 0)::int AS total
            FROM carereceiver_conversations c
            `
        );

        return res.status(200).json({
            success: true,
            data: {
                total: Number(totals.rows?.[0]?.total || 0)
            }
        });
    } catch (error) {
        console.error("[caregiver-messages] GET /caregiver/conversations/unread-count failed:", error);
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: "Could not load unread message count."
            }
        });
    }
});

router.get("/caregiver/conversations", async (req, res) => {
    try {
        await ensureMessagingSchema();
        await ensureBackfilledConversationsAndMessages();
        const page = parsePositiveInt(req.query.page, 1, 1000);
        const limit = parsePositiveInt(req.query.limit, 25, 100);
        const offset = (page - 1) * limit;

        const listQuery = `
            SELECT
              c.id,
              c.booking_id AS "bookingId",
              c.caregiver_unread_count AS "unreadCount",
              c.care_receiver_id AS "careReceiverId",
              c.is_active AS "isActive",
              c.last_message_at AS "lastMessageAt",
              c.last_message_preview AS "lastMessagePreview",
              c.created_at AS "createdAt",
              c.updated_at AS "updatedAt",
              b.status AS "bookingStatus",
              COALESCE(to_jsonb(b)->>'booking_ref', UPPER(b.id)) AS "bookingRef",
              to_char(b.booking_date, 'YYYY-MM-DD') AS "bookingDate",
              to_char(b.start_time, 'HH12:MI AM') AS "bookingStartTime",
              TRIM(CONCAT(COALESCE(u.first_name, ''), ' ', COALESCE(u.last_name, ''))) AS "careReceiverName",
              u.phone AS "careReceiverPhone",
              lm.id AS "lastMessageId",
              lm.sender_name AS "lastMessageSenderName",
              lm.message_text AS "lastMessageText",
              lm.sent_at AS "lastMessageSentAt",
              lm.read_at AS "lastMessageReadAt"
            FROM carereceiver_conversations c
            LEFT JOIN users u ON u.id = c.care_receiver_id
            LEFT JOIN carereceiver_dashboard_bookings b ON b.id = c.booking_id
            LEFT JOIN LATERAL (
              SELECT id, sender_name, message_text, sent_at, read_at
              FROM carereceiver_messages m
              WHERE m.conversation_id = c.id AND m.deleted_at IS NULL
              ORDER BY m.sent_at DESC
              LIMIT 1
            ) lm ON TRUE
            ORDER BY COALESCE(lm.sent_at, c.last_message_at, c.updated_at, c.created_at) DESC
            LIMIT $1
            OFFSET $2
        `;

        const countQuery = `
            SELECT
              COUNT(*)::int AS total,
              COALESCE(SUM(c.caregiver_unread_count), 0)::int AS unread_total
            FROM carereceiver_conversations c
        `;

        const [listResult, countResult] = await Promise.all([
            pool.query(listQuery, [limit, offset]),
            pool.query(countQuery)
        ]);

        const conversations = (listResult.rows || []).map(buildCaregiverConversationDto);
        const totalCount = Number(countResult.rows?.[0]?.total || 0);
        const unreadCountTotal = Number(countResult.rows?.[0]?.unread_total || 0);
        const totalPages = Math.max(1, Math.ceil(totalCount / limit));

        return res.status(200).json({
            success: true,
            data: {
                conversations,
                unreadCountTotal,
                pagination: {
                    page,
                    limit,
                    totalPages,
                    totalCount
                }
            }
        });
    } catch (error) {
        console.error("[caregiver-messages] GET /caregiver/conversations failed:", error);
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: process.env.NODE_ENV === "production"
                    ? "Could not load conversations."
                    : `Could not load conversations. ${error?.message || ""}`.trim()
            }
        });
    }
});

router.get("/caregiver/conversations/:conversationId/messages", async (req, res) => {
    const identifier = String(req.params.conversationId || "").trim();
    if (!identifier) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Conversation id is required."
            }
        });
    }

    try {
        await ensureMessagingSchema();
        await ensureBackfilledConversationsAndMessages();
        const viewer = await resolveViewer(req, ["caregiver"]);
        const conversation = await resolveConversationByIdOrBooking(identifier, null);
        if (!conversation) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "RESOURCE_NOT_FOUND",
                    message: "Conversation not found."
                }
            });
        }

        const page = parsePositiveInt(req.query.page, 1, 1000);
        const limit = parsePositiveInt(req.query.limit, 50, 200);
        const offset = (page - 1) * limit;

        try {
            await pool.query(
                `
                UPDATE carereceiver_messages
                SET read_at = NOW()
                WHERE conversation_id = $1
                  AND sender_role = 'care_receiver'
                  AND read_at IS NULL
                  AND deleted_at IS NULL
                `,
                [conversation.id]
            );

            await pool.query(
                `
                UPDATE carereceiver_conversations
                SET caregiver_unread_count = 0, updated_at = NOW()
                WHERE id = $1
                `,
                [conversation.id]
            );

            // If care receiver has already replied to a caregiver message,
            // mark that earlier outgoing caregiver message as read.
            await backfillReadReceiptsFromCareReceiverReplies(conversation.id);
        } catch (readStateError) {
            console.error("[caregiver-messages] read state sync skipped:", readStateError);
        }

        const [messagesResult, countResult] = await Promise.all([
            pool.query(
                `
                SELECT
                  id,
                  sender_role AS "senderRole",
                  sender_name AS "senderName",
                  message_text AS text,
                  sent_at AS "sentAt",
                  read_at AS "readAt",
                  is_system_message AS "isSystemMessage",
                  is_flagged AS "isFlagged"
                FROM carereceiver_messages
                WHERE conversation_id = $1
                  AND deleted_at IS NULL
                ORDER BY sent_at ASC
                LIMIT $2
                OFFSET $3
                `,
                [conversation.id, limit, offset]
            ),
            pool.query(
                `
                SELECT COUNT(*)::int AS total
                FROM carereceiver_messages
                WHERE conversation_id = $1
                  AND deleted_at IS NULL
                `,
                [conversation.id]
            )
        ]);

        const totalCount = Number(countResult.rows?.[0]?.total || 0);
        const totalPages = Math.max(1, Math.ceil(totalCount / limit));

        let careReceiverName = "Care receiver";
        let careReceiverPhone = "";
        if (conversation.careReceiverId) {
            const careReceiverResult = await pool.query(
                `
                SELECT first_name, last_name, phone
                FROM users
                WHERE id = $1
                LIMIT 1
                `,
                [conversation.careReceiverId]
            );
            const careReceiver = careReceiverResult.rows?.[0];
            if (careReceiver) {
                careReceiverName = [careReceiver.first_name, careReceiver.last_name].filter(Boolean).join(" ").trim() || careReceiverName;
                careReceiverPhone = String(careReceiver.phone || "");
            }
        }

        return res.status(200).json({
            success: true,
            data: {
                conversation: buildCaregiverConversationDto({
                    ...conversation,
                    careReceiverName,
                    careReceiverId: conversation.careReceiverId,
                    careReceiverPhone
                }),
                conversationId: conversation.id,
                bookingId: conversation.bookingId || null,
                messages: (messagesResult.rows || []).map((message) => ({
                    ...mapMessageForResponse(message, conversation, viewer, {
                        careReceiverSenderId: conversation.careReceiverId || "care_receiver"
                    })
                })),
                pagination: {
                    page,
                    limit,
                    totalPages,
                    totalCount
                }
            }
        });
    } catch (error) {
        console.error("[caregiver-messages] GET /caregiver/conversations/:id/messages failed:", error);
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: "Could not load conversation messages."
            }
        });
    }
});

router.post("/caregiver/conversations/:conversationId/messages", async (req, res) => {
    const identifier = String(req.params.conversationId || "").trim();
    const text = String(req.body?.text || "").trim();

    if (!identifier) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Conversation id is required."
            }
        });
    }

    if (!text) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Message text is required."
            }
        });
    }

    if (text.length > 2000) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Message exceeds 2000 characters."
            }
        });
    }

    try {
        await ensureMessagingSchema();
        await ensureBackfilledConversationsAndMessages();
        const viewer = await resolveViewer(req, ["caregiver"]);
        if (!ensureTermsAccepted(res, viewer)) {
            return;
        }
        const conversation = await resolveConversationByIdOrBooking(identifier, null);

        if (!conversation) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "RESOURCE_NOT_FOUND",
                    message: "Conversation not found."
                }
            });
        }

        const senderName = [viewer?.first_name, viewer?.last_name].filter(Boolean).join(" ").trim() || "Caregiver";
        const protectedMessage = sanitizeMessagePayload(text);

        const inserted = await pool.query(
            `
            INSERT INTO carereceiver_messages (
              conversation_id,
              sender_role,
              sender_name,
              message_text,
              sent_at,
              is_system_message,
              is_flagged
            ) VALUES ($1, 'caregiver', $2, $3, NOW(), FALSE, $4)
            RETURNING id, sent_at AS "sentAt", is_flagged AS "isFlagged"
            `,
            [conversation.id, senderName, protectedMessage.text, protectedMessage.hasMaskedContent]
        );

        const message = inserted.rows?.[0];
        await pool.query(
            `
            UPDATE carereceiver_conversations
            SET
              last_message_preview = $2,
              last_message_at = NOW(),
              care_receiver_unread_count = COALESCE(care_receiver_unread_count, 0) + 1,
              updated_at = NOW()
            WHERE id = $1
            `,
            [conversation.id, compactMessagePreview(protectedMessage.text)]
        );

        return res.status(201).json({
            success: true,
            data: {
                messageId: String(message.id),
                conversationId: conversation.id,
                text: protectedMessage.text,
                sentAt: message.sentAt,
                isFlagged: Boolean(message.isFlagged)
            }
        });
    } catch (error) {
        console.error("[caregiver-messages] POST /caregiver/conversations/:id/messages failed:", error);
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: "Could not send message."
            }
        });
    }
});

router.put("/caregiver/messages/:messageId/read", async (req, res) => {
    const messageId = String(req.params.messageId || "").trim();
    if (!messageId) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Message id is required."
            }
        });
    }

    try {
        await ensureMessagingSchema();
        await ensureBackfilledConversationsAndMessages();

        const messageResult = await pool.query(
            `
            SELECT
              m.id,
              m.sender_role AS "senderRole",
              m.read_at AS "readAt",
              m.conversation_id AS "conversationId"
            FROM carereceiver_messages m
            WHERE m.id = $1
              AND m.deleted_at IS NULL
            LIMIT 1
            `,
            [messageId]
        );

        const row = messageResult.rows?.[0];
        if (!row) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "RESOURCE_NOT_FOUND",
                    message: "Message not found."
                }
            });
        }

        // Caregiver can mark care receiver messages as read.
        if (String(row.senderRole || "") !== "care_receiver") {
            return res.status(403).json({
                success: false,
                error: {
                    code: "FORBIDDEN",
                    message: "Only received messages can be marked as read."
                }
            });
        }

        if (row.readAt) {
            return res.status(200).json({
                success: true,
                data: {
                    messageId: String(row.id),
                    readAt: row.readAt
                }
            });
        }

        const updated = await pool.query(
            `
            UPDATE carereceiver_messages
            SET read_at = NOW()
            WHERE id = $1
            RETURNING id, read_at AS "readAt", conversation_id AS "conversationId"
            `,
            [messageId]
        );

        const readMessage = updated.rows?.[0];

        await pool.query(
            `
            UPDATE carereceiver_conversations
            SET caregiver_unread_count = GREATEST(0, COALESCE(caregiver_unread_count, 0) - 1),
                updated_at = NOW()
            WHERE id = $1
            `,
            [readMessage.conversationId]
        );

        return res.status(200).json({
            success: true,
            data: {
                messageId: String(readMessage.id),
                readAt: readMessage.readAt
            }
        });
    } catch (error) {
        console.error("[caregiver-messages] PUT /caregiver/messages/:id/read failed:", error);
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: "Could not mark message as read."
            }
        });
    }
});

export default router;
