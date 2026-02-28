import { Router } from "express";
import { pool } from "../db/db.js";
import { sanitizeMessage } from "../../app/utils/contact-protection.js";

const router = Router();

const VALID_SENDER_ROLES = new Set(["caregiver", "carereceiver"]);
const FIVE_MINUTES_WINDOW = "5 minutes";
const TEN_MINUTES_LOCK = "10 minutes";

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

async function getActiveLock(conversationId, senderRole) {
  const lockResult = await pool.query(
    `
      SELECT blocked_until
      FROM conversation_participant_locks
      WHERE conversation_id = $1
        AND sender_role = $2
        AND blocked_until > now()
      LIMIT 1
    `,
    [conversationId, senderRole]
  );

  return lockResult.rows[0]?.blocked_until || null;
}

async function registerModerationAttempt({ conversationId, senderRole, userId, flags }) {
  const triggeredRules = Object.entries(flags || {})
    .filter(([, value]) => value)
    .map(([rule]) => rule);

  const ruleTriggered = triggeredRules.length ? triggeredRules.join(",") : "unknown";

  await pool.query(
    `
      INSERT INTO conversation_moderation_events (
        conversation_id,
        sender_role,
        user_id,
        rule_triggered
      )
      VALUES ($1, $2, $3, $4)
    `,
    [conversationId, senderRole, userId || null, ruleTriggered]
  );

  const attemptsResult = await pool.query(
    `
      SELECT COUNT(*)::int AS attempts
      FROM conversation_moderation_events
      WHERE conversation_id = $1
        AND sender_role = $2
        AND created_at >= now() - interval '${FIVE_MINUTES_WINDOW}'
    `,
    [conversationId, senderRole]
  );

  const attempts = attemptsResult.rows[0]?.attempts || 0;
  let blockedUntil = null;

  if (attempts >= 3) {
    const lockResult = await pool.query(
      `
        INSERT INTO conversation_participant_locks (
          conversation_id,
          sender_role,
          blocked_until,
          updated_at
        )
        VALUES ($1, $2, now() + interval '${TEN_MINUTES_LOCK}', now())
        ON CONFLICT (conversation_id, sender_role)
        DO UPDATE
          SET blocked_until = now() + interval '${TEN_MINUTES_LOCK}',
              updated_at = now()
        RETURNING blocked_until
      `,
      [conversationId, senderRole]
    );

    blockedUntil = lockResult.rows[0]?.blocked_until || null;
  }

  return {
    attempts,
    blockedUntil,
    triggeredRules
  };
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

router.post("/conversations/:id/moderation-attempt", async (req, res) => {
  try {
    const conversationId = String(req.params.id || "").trim();
    const senderRole = String(req.body?.senderRole || "").trim();
    const userId = typeof req.body?.userId === "string" ? req.body.userId : null;
    const flags = req.body?.flags && typeof req.body.flags === "object" ? req.body.flags : {};

    if (!conversationId) {
      return res.status(400).json({ error: "conversation_id_required" });
    }

    if (!VALID_SENDER_ROLES.has(senderRole)) {
      return res.status(400).json({ error: "invalid_sender_role" });
    }

    await ensureConversation(conversationId);

    const activeLock = await getActiveLock(conversationId, senderRole);
    if (activeLock) {
      return res.status(429).json({
        error: "contact_protection_temporarily_locked",
        blockedUntil: activeLock,
        message: "Sending is temporarily paused after repeated attempts to share contact details."
      });
    }

    const moderation = await registerModerationAttempt({
      conversationId,
      senderRole,
      userId,
      flags
    });

    return res.status(202).json({
      blocked: true,
      attempts: moderation.attempts,
      blockedUntil: moderation.blockedUntil,
      triggeredRules: moderation.triggeredRules,
      message: "For everyone’s safety, phone numbers, email addresses, physical addresses and links are automatically hidden. Please keep the conversation within ICare."
    });
  } catch (error) {
    console.error("[conversations] moderation attempt failed:", error);
    return res.status(500).json({ error: "moderation_attempt_failed" });
  }
});

router.post("/conversations/:id/messages", async (req, res) => {
  try {
    const conversationId = String(req.params.id || "").trim();
    const senderRole = String(req.body?.senderRole || "").trim();
    const userId = typeof req.body?.userId === "string" ? req.body.userId : null;
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

    const activeLock = await getActiveLock(conversationId, senderRole);
    if (activeLock) {
      return res.status(429).json({
        error: "contact_protection_temporarily_locked",
        blockedUntil: activeLock,
        message: "Sending is temporarily paused after repeated attempts to share contact details."
      });
    }

    const sanitized = sanitizeMessage(bodyPlain);

    if (sanitized.blocked) {
      const moderation = await registerModerationAttempt({
        conversationId,
        senderRole,
        userId,
        flags: sanitized.flags
      });

      return res.status(moderation.blockedUntil ? 429 : 422).json({
        error: "contact_protection_blocked",
        blockedUntil: moderation.blockedUntil,
        flags: sanitized.flags,
        message: "For everyone’s safety, phone numbers, email addresses, physical addresses and links are automatically hidden. Please keep the conversation within ICare."
      });
    }

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
            blocked: sanitized.blocked,
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
