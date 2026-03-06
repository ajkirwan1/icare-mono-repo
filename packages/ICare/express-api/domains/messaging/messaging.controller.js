/* global console, process */
import { pool } from "../../db/db.js";
import { ensureTermsAccepted } from "../../utils/terms-acceptance.js";
import { parsePositiveInt } from "../../utils/pagination.js";
import {
    compactMessagePreview,
    sanitizeMessagePayload,
    mapMessageForResponse,
    buildConversationDto,
    buildCaregiverConversationDto,
    makeScopeClause
} from "./messaging.service.js";
import {
    resolveViewer,
    resolveConversationByIdOrBooking,
    backfillReadReceiptsFromReplies,
    backfillReadReceiptsFromCareReceiverReplies
} from "./messaging.repository.js";

export async function getUnreadCount(req, res) {
    try {

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
}

export async function listConversations(req, res) {
    try {

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
}

export async function getConversationMessages(req, res) {
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
}

export async function sendMessage(req, res) {
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
}

export async function markMessageRead(req, res) {
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
}

export async function getCaregiverUnreadCount(req, res) {
    try {


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
}

export async function listCaregiverConversations(req, res) {
    try {

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
}

export async function getCaregiverConversationMessages(req, res) {
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
}

export async function sendCaregiverMessage(req, res) {
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
}

export async function markCaregiverMessageRead(req, res) {
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
}
