import { requestApiJson } from "../../../services/api/http-client.js";

function requestMessagesApi(path, options = {}) {
    return requestApiJson(path, {
        errorLabel: "Messages API request failed.",
        networkErrorHint: "Could not connect to messages API on http://localhost:4001. Start API server and retry.",
        ...options
    });
}

export function relativeTimeLabel(isoDate) {
    if (!isoDate) {
        return "Just now";
    }

    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) {
        return "Just now";
    }

    const deltaMs = Date.now() - date.getTime();
    const minutes = Math.max(0, Math.floor(deltaMs / 60000));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) {
        return `${minutes || 1} min ago`;
    }

    if (hours < 24) {
        return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    }

    if (days === 1) {
        return "Yesterday";
    }

    return `${days} days ago`;
}

export function threadTimeLabel(isoDate) {
    if (!isoDate) {
        return "Now";
    }

    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) {
        return "Now";
    }

    return new Intl.DateTimeFormat("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    }).format(date).replace(",", "");
}

export async function markMessageRead(messageId, { signal } = {}) {
    if (!messageId) {
        throw new Error("Message id is required.");
    }

    return requestMessagesApi(`/api/v1/messages/${encodeURIComponent(String(messageId))}/read`, {
        signal,
        method: "PUT"
    });
}

export async function getConversations({ signal, page = 1, limit = 50 } = {}) {
    const query = new URLSearchParams({ page: String(page), limit: String(limit) }).toString();
    const payload = await requestMessagesApi(`/api/v1/conversations?${query}`, { signal });

    return {
        conversations: Array.isArray(payload?.conversations) ? payload.conversations : [],
        unreadCountTotal: Number(payload?.unreadCountTotal || 0),
        pagination: payload?.pagination || {
            page,
            limit,
            totalPages: 1,
            totalCount: 0
        }
    };
}

export async function getConversationMessages(conversationId, { signal, page = 1, limit = 50 } = {}) {
    if (!conversationId) {
        throw new Error("Conversation id is required.");
    }

    const query = new URLSearchParams({ page: String(page), limit: String(limit) }).toString();
    const payload = await requestMessagesApi(`/api/v1/conversations/${conversationId}/messages?${query}`, { signal });

    return {
        conversationId: String(payload?.conversationId || conversationId),
        bookingId: payload?.bookingId || payload?.conversation?.bookingId || null,
        conversation: payload?.conversation || null,
        messages: Array.isArray(payload?.messages) ? payload.messages : [],
        pagination: payload?.pagination || {
            page,
            limit,
            totalPages: 1,
            totalCount: 0
        }
    };
}

export async function sendConversationMessage(conversationId, text, { signal } = {}) {
    if (!conversationId) {
        throw new Error("Conversation id is required.");
    }

    const cleanText = String(text || "").trim();
    if (!cleanText) {
        throw new Error("Message text is required.");
    }

    return requestMessagesApi(`/api/v1/conversations/${conversationId}/messages`, {
        signal,
        method: "POST",
        body: { text: cleanText }
    });
}
