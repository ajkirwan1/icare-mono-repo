export const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function normalizeUserId(value) {
    const userId = String(value || "").trim();
    return UUID_RE.test(userId) ? userId : "";
}

export function extractRequestIdentity(req) {
    const rawUserId = String(req.get("x-user-id") || "").trim();
    const userId = UUID_RE.test(rawUserId) ? rawUserId : "";
    const email = String(req.get("x-user-email") || "").trim().toLowerCase();
    return { userId, email };
}
