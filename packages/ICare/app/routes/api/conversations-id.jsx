import { getConversationThread } from "~/lib/conversations-store.server";

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

export async function loader({ params }) {
  const conversationId = String(params.id || "").trim();

  if (!conversationId) {
    return jsonResponse({ error: "conversation_id_required" }, 400);
  }

  const payload = getConversationThread(conversationId);
  return jsonResponse(payload, 200);
}
