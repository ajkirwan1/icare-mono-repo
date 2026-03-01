import { z } from "zod";

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
        // ignore malformed local storage user payload
    }

    try {
        token = String(window.localStorage.getItem("icare_access_token") || "").trim();
    } catch {
        token = "";
    }

    return { id, email, token };
}

const fallbackPendingBookings = [
    {
        id: "bk-2026-1101",
        caregiverName: "Emma Wilson",
        caregiverPhotoUrl: "/images/avatars/female.webp",
        dateLabel: "Tuesday, March 5 • 2:00 PM",
        status: "requested",
        responseDeadline: new Date(Date.now() + 20 * 60 * 60 * 1000).toISOString()
    },
    {
        id: "bk-2026-1102",
        caregiverName: "John Anderson",
        caregiverPhotoUrl: "/images/avatars/male.webp",
        dateLabel: "Wednesday, March 6 • 10:00 AM",
        status: "requested",
        responseDeadline: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString()
    },
    {
        id: "bk-2026-1103",
        caregiverName: "Margaret Thompson",
        caregiverPhotoUrl: "/images/avatars/female.webp",
        dateLabel: "Thursday, March 7 • 9:00 AM",
        status: "requested",
        responseDeadline: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString()
    }
];

const fallbackUpcomingBookings = [
    {
        id: "bk-2026-1201",
        caregiverName: "Mary Thompson",
        caregiverPhotoUrl: "/images/avatars/female.webp",
        dateLabel: "Wednesday, March 6 • 10:00 AM",
        status: "accepted",
        conversationId: "conv-1002"
    },
    {
        id: "bk-2026-1202",
        caregiverName: "Emma Wilson",
        caregiverPhotoUrl: "/images/avatars/female.webp",
        dateLabel: "Friday, March 8 • 2:00 PM",
        status: "accepted",
        conversationId: "conv-1012"
    },
    {
        id: "bk-2026-1203",
        caregiverName: "John Anderson",
        caregiverPhotoUrl: "/images/avatars/male.webp",
        dateLabel: "Today • 2:00 PM",
        status: "in_progress",
        conversationId: "conv-1011"
    }
];

const fallbackRecentActivity = [
    {
        id: "bk-2026-0151",
        caregiverName: "Mary Thompson",
        bookingDate: "2026-03-04",
        completedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        hasReview: false
    },
    {
        id: "bk-2026-0128",
        caregiverName: "Emma Wilson",
        bookingDate: "2026-03-03",
        completedAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
        hasReview: false
    }
];

const caregiverSummarySchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    name: z.string().optional(),
    photoUrl: z.string().optional(),
    avatarUrl: z.string().optional()
}).passthrough();

const bookingSchema = z.object({
    id: z.union([z.string(), z.number()]).optional(),
    status: z.string().optional(),
    caregiverName: z.string().optional(),
    caregiverPhotoUrl: z.string().optional(),
    bookingDate: z.string().optional(),
    date: z.string().optional(),
    startTime: z.string().optional(),
    time: z.string().optional(),
    responseDeadline: z.string().optional(),
    conversationId: z.union([z.string(), z.number()]).optional(),
    completedAt: z.string().optional(),
    updatedAt: z.string().optional(),
    hasReview: z.boolean().optional(),
    caregiver: caregiverSummarySchema.optional()
}).passthrough();

const bookingsResponseSchema = z.object({
    bookings: z.array(bookingSchema).default([]),
    pagination: z.object({
        totalCount: z.number().int().nonnegative().optional()
    }).optional()
}).passthrough();

const userProfileSchema = z.object({
    firstName: z.string().optional(),
    first_name: z.string().optional(),
    name: z.string().optional(),
    accountStatus: z.string().optional(),
    account_status: z.string().optional(),
    phoneVerified: z.boolean().optional(),
    emailVerified: z.boolean().optional()
}).passthrough();

const paymentMethodSchema = z.object({
    id: z.union([z.string(), z.number()]).optional()
}).passthrough();

const paymentMethodsResponseSchema = z.object({
    paymentMethods: z.array(paymentMethodSchema).optional(),
    cards: z.array(paymentMethodSchema).optional(),
    defaultPaymentMethodId: z.union([z.string(), z.number()]).nullable().optional()
}).passthrough();

const conversationsResponseSchema = z.object({
    conversations: z.array(z.object({
        unreadCount: z.number().int().nonnegative().optional()
    }).passthrough()).optional(),
    unreadCountTotal: z.number().int().nonnegative().optional(),
    totalUnreadCount: z.number().int().nonnegative().optional(),
    summary: z.object({
        unreadCount: z.number().int().nonnegative().optional()
    }).passthrough().optional()
}).passthrough();

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

    if (response.status === 401 && typeof window !== "undefined") {
        const redirectTarget = encodeURIComponent("/carereceiver/dashboard");
        window.location.assign(`/login?redirect=${redirectTarget}`);
        throw new Error("Unauthorized");
    }

    const text = await response.text();
    const payload = text ? JSON.parse(text) : null;

    if (!response.ok) {
        const message = payload?.error || payload?.message || `HTTP ${response.status}`;
        throw new Error(message);
    }

    return payload?.data ?? payload;
}

function buildBookingsPath(query) {
    const search = new URLSearchParams(query).toString();
    return `/api/v1/care-receivers/me/bookings?${search}`;
}

function caregiverName(rawBooking) {
    const direct = String(rawBooking?.caregiverName || "").trim();
    if (direct) {
        return direct;
    }

    const caregiver = rawBooking?.caregiver;
    if (!caregiver || typeof caregiver !== "object") {
        return "Caregiver";
    }

    const first = String(caregiver.firstName || caregiver.name || "").trim();
    const last = String(caregiver.lastName || "").trim();
    return [first, last].filter(Boolean).join(" ") || "Caregiver";
}

function caregiverAvatar(rawBooking) {
    return (
        rawBooking?.caregiverPhotoUrl ||
        rawBooking?.caregiver?.photoUrl ||
        rawBooking?.caregiver?.avatarUrl ||
        "/images/avatars/female.webp"
    );
}

function bookingDateLabel(rawBooking) {
    if (rawBooking?.dateLabel) {
        return rawBooking.dateLabel;
    }

    const date = rawBooking?.bookingDate || rawBooking?.date;
    const startTime = rawBooking?.startTime || rawBooking?.time;

    if (date && startTime) {
        return `${date} • ${startTime}`;
    }

    return date || startTime || "Date TBD";
}

function relativeTime(isoDate) {
    if (!isoDate) {
        return "Just now";
    }

    const timestamp = new Date(isoDate).getTime();
    if (!Number.isFinite(timestamp)) {
        return "Just now";
    }

    const deltaMs = Date.now() - timestamp;
    const deltaMinutes = Math.max(0, Math.floor(deltaMs / 60000));
    const deltaHours = Math.floor(deltaMinutes / 60);
    const deltaDays = Math.floor(deltaHours / 24);

    if (deltaMinutes < 60) {
        return `${deltaMinutes || 1} min ago`;
    }

    if (deltaHours < 24) {
        return `${deltaHours} hour${deltaHours === 1 ? "" : "s"} ago`;
    }

    return `${deltaDays} day${deltaDays === 1 ? "" : "s"} ago`;
}

function countdownLabel(deadlineIso) {
    if (!deadlineIso) {
        return "Awaiting response";
    }

    const deadline = new Date(deadlineIso).getTime();
    if (!Number.isFinite(deadline)) {
        return "Awaiting response";
    }

    const hours = Math.max(0, Math.ceil((deadline - Date.now()) / 3600000));
    if (hours === 0) {
        return "Response window ending soon";
    }

    return `${hours} hour${hours === 1 ? "" : "s"} remaining`;
}

function normalizeBookingsResponse(rawPayload) {
    const parsed = bookingsResponseSchema.safeParse(rawPayload);
    if (parsed.success) {
        const total = parsed.data.pagination?.totalCount;
        return {
            bookings: parsed.data.bookings,
            totalCount: Number.isFinite(total) ? total : parsed.data.bookings.length
        };
    }

    if (Array.isArray(rawPayload?.bookings)) {
        return {
            bookings: rawPayload.bookings,
            totalCount: rawPayload.bookings.length
        };
    }

    return { bookings: [], totalCount: 0 };
}

function readStoredUserFirstName() {
    if (typeof window === "undefined") {
        return "";
    }

    try {
        const raw = window.localStorage.getItem("icare_user");
        if (!raw) {
            return "";
        }

        const parsed = JSON.parse(raw);
        const firstName = String(parsed?.firstName || parsed?.first_name || "").trim();
        return firstName;
    } catch {
        return "";
    }
}

export async function getCurrentUserProfile({ signal } = {}) {
    const storedFirstName = readStoredUserFirstName();

    try {
        const rawPayload = await requestJson("/api/v1/users/me", { signal });
        const payload = userProfileSchema.parse(rawPayload);
        const firstName = String(payload?.firstName || payload?.first_name || payload?.name || "").trim();
        return {
            firstName: firstName || storedFirstName,
            accountStatus: String(payload?.accountStatus || payload?.account_status || "active")
        };
    } catch {
        return { firstName: storedFirstName, accountStatus: "active", isFallback: true };
    }
}

export async function getPaymentMethodStatus({ signal } = {}) {
    try {
        const rawPayload = await requestJson("/api/v1/payments/methods", { signal });
        const payload = paymentMethodsResponseSchema.parse(rawPayload);
        const paymentMethods = Array.isArray(payload?.paymentMethods)
            ? payload.paymentMethods
            : Array.isArray(payload?.cards)
                ? payload.cards
                : [];

        return {
            paymentMethods,
            paymentMethodMissing: paymentMethods.length === 0,
            defaultPaymentMethodId: payload?.defaultPaymentMethodId ? String(payload.defaultPaymentMethodId) : null
        };
    } catch {
        return {
            paymentMethods: [],
            paymentMethodMissing: true,
            defaultPaymentMethodId: null,
            isFallback: true
        };
    }
}

export async function getUnreadMessagesCount({ signal } = {}) {
    try {
        const unreadCountPayload = await requestJson("/api/v1/conversations/unread-count", { signal });
        const total = Number(unreadCountPayload?.total ?? NaN);
        if (Number.isFinite(total)) {
            return { unreadCount: total };
        }
    } catch {
        // fallback to conversations list query
    }

    try {
        const rawPayload = await requestJson("/api/v1/conversations?page=1&limit=1", { signal });
        const payload = conversationsResponseSchema.parse(rawPayload);
        const conversations = Array.isArray(payload?.conversations) ? payload.conversations : [];
        const explicitTotal = Number(
            payload?.unreadCountTotal ??
            payload?.totalUnreadCount ??
            payload?.summary?.unreadCount ??
            NaN
        );
        const unreadCount = Number.isFinite(explicitTotal)
            ? explicitTotal
            : conversations.reduce((sum, conversation) => sum + Number(conversation?.unreadCount || 0), 0);
        return { unreadCount };
    } catch {
        return { unreadCount: 0, isFallback: true };
    }
}

export async function getPendingBookingRequests({ signal } = {}) {
    try {
        const raw = await requestJson(buildBookingsPath({ status: "requested", limit: 3, page: 1 }), { signal });
        const normalized = normalizeBookingsResponse(raw);

        return {
            bookings: normalized.bookings.map((booking) => ({
                id: String(booking.id || ""),
                caregiverName: caregiverName(booking),
                caregiverPhotoUrl: caregiverAvatar(booking),
                dateLabel: bookingDateLabel(booking),
                status: booking.status || "requested",
                responseDeadline: booking.responseDeadline,
                countdownLabel: countdownLabel(booking.responseDeadline)
            })).filter((booking) => booking.id),
            totalCount: normalized.totalCount
        };
    } catch {
        return {
            bookings: fallbackPendingBookings.map((booking) => ({
                ...booking,
                countdownLabel: countdownLabel(booking.responseDeadline)
            })),
            totalCount: fallbackPendingBookings.length,
            isFallback: true
        };
    }
}

export async function getUpcomingBookings({ signal } = {}) {
    const today = new Date();
    const inSevenDays = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    const query = {
        status: "accepted,in_progress",
        startDate: today.toISOString().slice(0, 10),
        endDate: inSevenDays.toISOString().slice(0, 10),
        limit: 3,
        page: 1,
        sort: "startTime_asc"
    };

    try {
        const raw = await requestJson(buildBookingsPath(query), { signal });
        const normalized = normalizeBookingsResponse(raw);

        return {
            bookings: normalized.bookings.map((booking) => ({
                id: String(booking.id || ""),
                caregiverName: caregiverName(booking),
                caregiverPhotoUrl: caregiverAvatar(booking),
                dateLabel: bookingDateLabel(booking),
                status: booking.status || "accepted",
                conversationId: booking.conversationId ? String(booking.conversationId) : null
            })).filter((booking) => booking.id),
            totalCount: normalized.totalCount
        };
    } catch {
        return {
            bookings: fallbackUpcomingBookings,
            totalCount: fallbackUpcomingBookings.length,
            isFallback: true
        };
    }
}

export async function getRecentActivity({ signal } = {}) {
    const query = {
        status: "completed,payment_released",
        limit: 3,
        page: 1,
        sort: "completedAt_desc"
    };

    try {
        const raw = await requestJson(buildBookingsPath(query), { signal });
        const normalized = normalizeBookingsResponse(raw);

        const bookings = normalized.bookings
            .filter((booking) => booking.hasReview !== true)
            .map((booking) => ({
                id: String(booking.id || ""),
                caregiverName: caregiverName(booking),
                bookingDate: booking.bookingDate || booking.date || null,
                completedAt: booking.completedAt || booking.updatedAt || null,
                actionLabel: "Leave Review"
            }))
            .filter((booking) => booking.id);

        return {
            items: bookings.map((booking) => ({
                id: booking.id,
                text: `${booking.caregiverName}'s visit on ${booking.bookingDate || "recent date"} is complete`,
                time: relativeTime(booking.completedAt),
                to: `/carereceiver/bookings/${booking.id}/review`,
                actionLabel: booking.actionLabel
            })),
            totalCount: bookings.length
        };
    } catch {
        return {
            items: fallbackRecentActivity.map((booking) => ({
                id: booking.id,
                text: `${booking.caregiverName}'s visit on ${booking.bookingDate} is complete`,
                time: relativeTime(booking.completedAt),
                to: `/carereceiver/bookings/${booking.id}/review`,
                actionLabel: "Leave Review"
            })),
            totalCount: fallbackRecentActivity.length,
            isFallback: true
        };
    }
}

export async function cancelBookingRequest(bookingId, { signal } = {}) {
    if (!bookingId) {
        throw new Error("Missing booking id.");
    }

    await requestJson(`/api/v1/bookings/${bookingId}/cancel`, {
        signal,
        method: "PUT",
        body: { reason: "no_longer_needed" }
    });
}
