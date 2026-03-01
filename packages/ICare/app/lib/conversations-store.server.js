import { sanitizeMessage } from "~/utils/contact-protection";

const conversationStore = new Map();

function nowIso() {
  return new Date().toISOString();
}

function toMessage({ id, conversationId, senderRole, bodyPlain, metadata, createdAt }) {
  return {
    id,
    conversationId,
    senderRole,
    bodyPlain: sanitizeMessage(bodyPlain || "").sanitizedText,
    metadata: metadata || {},
    createdAt: createdAt || nowIso()
  };
}

function seedConversation(conversationId) {
  if (conversationStore.has(conversationId)) {
    return conversationStore.get(conversationId);
  }

  const seeded = {
    id: conversationId,
    protectionMode: "contact-protection",
    contactProtectionEnabled: true,
    participantName: "Mary Thompson",
    createdAt: nowIso(),
    updatedAt: nowIso(),
    messages: []
  };

  conversationStore.set(conversationId, seeded);
  return seeded;
}

export function getConversationThread(conversationId) {
  const conversation = seedConversation(conversationId);

  return {
    conversation: {
      id: conversation.id,
      protectionMode: conversation.protectionMode,
      contactProtectionEnabled: conversation.contactProtectionEnabled,
      participantName: conversation.participantName,
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt
    },
    messages: conversation.messages.map(toMessage)
  };
}

export function addConversationMessage(conversationId, { senderRole, bodyPlain, metadata }) {
  const conversation = seedConversation(conversationId);
  const nextMessage = {
    id: `${conversationId}-${conversation.messages.length + 1}`,
    conversationId,
    senderRole,
    bodyPlain: sanitizeMessage(bodyPlain || "").sanitizedText,
    metadata: metadata || {},
    createdAt: nowIso()
  };

  conversation.messages.push(nextMessage);
  conversation.updatedAt = nowIso();

  return toMessage(nextMessage);
}
