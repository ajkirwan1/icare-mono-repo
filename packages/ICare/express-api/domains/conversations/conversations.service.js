import { sanitizeMessage } from "../../../app/utils/contact-protection.js";

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

export {
  VALID_SENDER_ROLES,
  toConversation,
  toMessage,
  sanitizeMessage
};
