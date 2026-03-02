import { addConversationMessage } from "~/lib/conversations-store.server";

const VALID_SENDER_ROLES = new Set(["caregiver", "carereceiver"]);

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

export async function action({ params, request }) {
  const conversationId = String(params.id || "").trim();

  if (!conversationId) {
    return jsonResponse({ error: "conversation_id_required" }, 400);
  }

  let body = null;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "invalid_json_body" }, 400);
  }

  const senderRole = String(body?.senderRole || "").trim();
  const bodyPlain = typeof body?.bodyPlain === "string" ? body.bodyPlain : "";
  const metadata = body?.metadata && typeof body.metadata === "object" ? body.metadata : {};

  if (!VALID_SENDER_ROLES.has(senderRole)) {
    return jsonResponse({ error: "invalid_sender_role" }, 400);
  }

  if (!bodyPlain.trim()) {
    return jsonResponse({ error: "message_body_required" }, 400);
  }

  const message = addConversationMessage(conversationId, {
    senderRole,
    bodyPlain,
    metadata
  });

  return jsonResponse({ message }, 201);
}
