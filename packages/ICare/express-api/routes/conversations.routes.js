import { Router } from "express";
import { pool } from "../db/db.js";
import { sanitizeMessage } from "../../app/utils/contact-protection.js";

const router = Router();

const VALID_SENDER_ROLES = new Set(["caregiver", "carereceiver"]);

function toConversation(row) {
  return {
    id: row.id,
    protectionMode: "contact-protection",
    contactProtectionEnabled: row.contact_protection_enabled !== false,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function toMessage(row) {
  const fallbackText = row.body_plain || "";
  const safeMessage = sanitizeMessage(fallbackText);

  return {
    id: row.id,
    conversationId: row.conversation_id,
    senderRole: row.sender_role,
    bodyPlain: safeMessage.sanitizedText,
    metadata: row.metadata || {},
    createdAt: row.created_at
  };
}

async function ensureConversation(conversationId) {
  const result = await pool.query(
    `
      INSERT INTO conversations (id)
      VALUES ($1)
      ON CONFLICT (id) DO NOTHING
      RETURNING *
    `,
    [conversationId]
  );

  if (result.rows[0]) {
    return result.rows[0];
  }

  const existing = await pool.query(
    `SELECT * FROM conversations WHERE id = $1`,
    [conversationId]
  );

  return existing.rows[0];
}

router.get("/conversations/:id", async (req, res) => {
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
});

router.post("/conversations/:id/messages", async (req, res) => {
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
});

export default router;
