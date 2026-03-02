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

async function requestJson(path, { signal, method = "GET", body } = {}) {
    const viewer = readStoredViewer();
    const headers = {
        Accept: "application/json",
        ...(body ? { "Content-Type": "application/json" } : {}),
        ...(viewer.id ? { "X-User-Id": viewer.id } : {}),
        ...(viewer.email ? { "X-User-Email": viewer.email } : {}),
        ...(viewer.token ? { Authorization: `Bearer ${viewer.token}` } : {})
    };

    const response = await fetch(resolveUrl(path), {
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
        throw new Error(String(message));
    }

    return payload?.data ?? payload;
}

export async function getCarereceiverBookings({ signal, page = 1, limit = 200 } = {}) {
    const query = new URLSearchParams({ page: String(page), limit: String(limit) });
    const payload = await requestJson(`/api/v1/care-receivers/me/bookings?${query.toString()}`, { signal });

    return {
        bookings: Array.isArray(payload?.bookings) ? payload.bookings : [],
        pagination: payload?.pagination || { page, limit, totalCount: 0 }
    };
}

export async function getCarereceiverBookingDetail(bookingId, { signal } = {}) {
    if (!bookingId) {
        throw new Error("Booking id is required.");
    }

    const payload = await requestJson(`/api/v1/bookings/${bookingId}`, { signal });
    return payload;
}

export async function submitCarereceiverBookingReview(bookingId, { rating, reviewText, reviewTags = [] }, { signal } = {}) {
    if (!bookingId) {
        throw new Error("Booking id is required.");
    }

    return requestJson(`/api/v1/bookings/${bookingId}/review`, {
        signal,
        method: "POST",
        body: {
            rating,
            reviewText: String(reviewText || ""),
            reviewTags: Array.isArray(reviewTags) ? reviewTags : []
        }
    });
}

export async function cancelCarereceiverBooking(bookingId, { reason = "no_longer_needed", details = "" } = {}, { signal } = {}) {
    if (!bookingId) {
        throw new Error("Booking id is required.");
    }

    return requestJson(`/api/v1/bookings/${bookingId}/cancel`, {
        signal,
        method: "PUT",
        body: {
            reason: String(reason || "no_longer_needed"),
            details: String(details || "").trim()
        }
    });
}

export async function getCaregiverReviews(caregiverId, { signal, page = 1, limit = 50, sort = "newest" } = {}) {
    const normalizedId = String(caregiverId || "").trim();
    if (!normalizedId) {
        throw new Error("Caregiver id is required.");
    }

    const query = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        sort: String(sort || "newest")
    });

    return requestJson(`/api/v1/caregivers/${encodeURIComponent(normalizedId)}/reviews?${query.toString()}`, { signal });
}

export async function getCaregiverPublicProfile(caregiverId, { signal } = {}) {
    const normalizedId = String(caregiverId || "").trim();
    if (!normalizedId) {
        throw new Error("Caregiver id is required.");
    }

    return requestJson(`/api/v1/caregivers/${encodeURIComponent(normalizedId)}`, { signal });
}
