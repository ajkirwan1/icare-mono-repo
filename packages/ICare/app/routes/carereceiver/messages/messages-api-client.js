const API_BASE = String(import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const API_PREFIX = "/api/v1";

function readStoredViewer() {
    if (typeof window === "undefined") {
        return { id: "", email: "", token: "" };
    }

    let id = "";
    let email = "";
    let token = "";

    try {
        const rawUser = window.localStorage.getItem("icare_user");
        if (rawUser) {
            const parsedUser = JSON.parse(rawUser);
            id = String(parsedUser?.id || "").trim();
            email = String(parsedUser?.email || "").trim().toLowerCase();
        }
    } catch {
        // ignore malformed storage payload
    }

    try {
        token = String(window.localStorage.getItem("icare_access_token") || "").trim();
    } catch {
        token = "";
    }

    return { id, email, token };
}

function resolveUrl(path) {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;

    if (!API_BASE) {
        return normalizedPath;
    }

    if (API_BASE.endsWith(API_PREFIX) && normalizedPath.startsWith(API_PREFIX)) {
        return `${API_BASE}${normalizedPath.slice(API_PREFIX.length)}`;
    }

    return `${API_BASE}${normalizedPath}`;
}

function resolveCandidateUrls(path) {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const candidates = [];

    const pushUnique = (url) => {
        if (url && !candidates.includes(url)) {
            candidates.push(url);
        }
    };

    pushUnique(resolveUrl(normalizedPath));

    if (typeof window !== "undefined") {
        const isLocalhost = ["localhost", "127.0.0.1"].includes(window.location.hostname);
        if (isLocalhost) {
            pushUnique(`http://localhost:4001${normalizedPath}`);
        }
    }

    return candidates;
}

async function requestJson(path, { signal, method = "GET", body } = {}) {
    const viewer = readStoredViewer();

    const headers = {
        Accept: "application/json",
        ...(body ? { "Content-Type": "application/json" } : {}),
        ...(viewer.id ? { "X-User-Id": viewer.id } : {}),
        ...(viewer.email ? { "X-User-Email": viewer.email } : {}),
        ...(viewer.token ? { Authorization: `Bearer ${viewer.token}` } : {})
    };

    const errors = [];
    const urls = resolveCandidateUrls(path);

    for (const url of urls) {
        try {
            const response = await fetch(url, {
                method,
                signal,
                cache: "no-store",
                headers,
                ...(body ? { body: JSON.stringify(body) } : {})
            });

            const text = await response.text();
            let payload = null;
            if (text) {
                try {
                    payload = JSON.parse(text);
                } catch {
                    payload = { message: text };
                }
            }

            if (!response.ok) {
                const message = payload?.error?.message || payload?.error || payload?.message || `HTTP ${response.status}`;
                errors.push(`${url} -> HTTP ${response.status}: ${String(message)}`);
                continue;
            }

            return payload?.data ?? payload;
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            errors.push(`${url} -> ${message}`);
        }
    }

    const hasNetworkError = errors.some((item) => /failed to fetch|networkerror|load failed|econnrefused|couldn't connect/i.test(item));
    if (hasNetworkError) {
        throw new Error(`Could not connect to messages API on http://localhost:4001. Start API server and retry. Details: ${errors.join(" | ")}`);
    }

    throw new Error(`Messages API request failed. ${errors.join(" | ")}`);
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

    return requestJson(`/api/v1/messages/${encodeURIComponent(String(messageId))}/read`, {
        signal,
        method: "PUT"
    });
}

export async function getConversations({ signal, page = 1, limit = 50 } = {}) {
    const query = new URLSearchParams({ page: String(page), limit: String(limit) }).toString();
    const payload = await requestJson(`/api/v1/conversations?${query}`, { signal });

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
    const payload = await requestJson(`/api/v1/conversations/${conversationId}/messages?${query}`, { signal });

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

    return requestJson(`/api/v1/conversations/${conversationId}/messages`, {
        signal,
        method: "POST",
        body: { text: cleanText }
    });
}
