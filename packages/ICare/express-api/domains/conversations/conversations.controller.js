/* global console */
import { pool } from "../../db/db.js";
import {
  VALID_SENDER_ROLES,
  toConversation,
  toMessage,
  sanitizeMessage
} from "./conversations.service.js";
import { ensureConversation } from "./conversations.repository.js";

export async function getConversation(req, res) {
  try {
    const conversationId = String(req.params.id || "").trim();
    if (!conversationId) {
      return res.status(400).json({ error: "conversation_id_required" });
    }

    const conversationRow = await ensureConversation(conversationId);
    const messagesResult = await pool.query(
      `
        SELECT
          id,
          conversation_id,
          sender_role,
          body_plain,
          metadata,
          created_at
        FROM conversation_messages
        WHERE conversation_id = $1
        ORDER BY created_at ASC
      `,
      [conversationId]
    );

    return res.json({
      conversation: toConversation(conversationRow),
      messages: messagesResult.rows.map(toMessage)
    });
  } catch (error) {
    console.error("[conversations] GET failed:", error);
    return res.status(500).json({ error: "conversation_fetch_failed" });
  }
}

export async function postMessage(req, res) {
  try {
    const conversationId = String(req.params.id || "").trim();
    const senderRole = String(req.body?.senderRole || "").trim();
    const bodyPlain = typeof req.body?.bodyPlain === "string" ? req.body.bodyPlain : "";
    const metadata = req.body?.metadata && typeof req.body.metadata === "object" ? req.body.metadata : {};

    if (!conversationId) {
      return res.status(400).json({ error: "conversation_id_required" });
    }

    if (!VALID_SENDER_ROLES.has(senderRole)) {
      return res.status(400).json({ error: "invalid_sender_role" });
    }

    if (!bodyPlain.trim()) {
      return res.status(400).json({ error: "message_body_required" });
    }

    await ensureConversation(conversationId);

    const sanitized = sanitizeMessage(bodyPlain);
    const hasMaskedContent = Object.values(sanitized.flags).some(Boolean);

    const inserted = await pool.query(
      `
        INSERT INTO conversation_messages (
          conversation_id,
          sender_role,
          body_plain,
          metadata
        )
        VALUES ($1, $2, $3, $4::jsonb)
        RETURNING
          id,
          conversation_id,
          sender_role,
          body_plain,
          metadata,
          created_at
      `,
      [
        conversationId,
        senderRole,
        sanitized.sanitizedText,
        JSON.stringify({
          ...metadata,
          contactProtection: {
            masked: hasMaskedContent,
            flags: sanitized.flags
          }
        })
      ]
    );

    await pool.query(
      `UPDATE conversations SET updated_at = now() WHERE id = $1`,
      [conversationId]
    );

    return res.status(201).json({ message: toMessage(inserted.rows[0]) });
  } catch (error) {
    console.error("[conversations] POST message failed:", error);
    return res.status(500).json({ error: "message_create_failed" });
  }
}
