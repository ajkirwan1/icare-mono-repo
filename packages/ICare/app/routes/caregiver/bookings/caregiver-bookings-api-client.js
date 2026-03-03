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
        // ignore malformed payload
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
                credentials: "include",
                headers,
                ...(body ? { body: JSON.stringify(body) } : {})
            });

            const text = await response.text();
            const payload = text ? JSON.parse(text) : null;
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

    throw new Error(`Caregiver bookings API request failed. ${errors.join(" | ")}`);
}

export async function getCaregiverBookings({ signal, page = 1, limit = 200, sort = "newest" } = {}) {
    const query = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        sort: String(sort || "newest")
    });
    const payload = await requestJson(`/api/v1/caregivers/me/bookings?${query.toString()}`, { signal });

    return {
        bookings: Array.isArray(payload?.bookings) ? payload.bookings : [],
        pagination: payload?.pagination || { page, limit, totalCount: 0 }
    };
}

export async function acceptCaregiverBooking(bookingId, { signal, termsAcceptedAt = "" } = {}) {
    const normalizedId = String(bookingId || "").trim();
    if (!normalizedId) {
        throw new Error("Booking id is required.");
    }

    return requestJson(`/api/v1/caregiver/bookings/${encodeURIComponent(normalizedId)}/accept`, {
        signal,
        method: "PUT",
        body: termsAcceptedAt ? { termsAcceptedAt: String(termsAcceptedAt) } : undefined
    });
}
