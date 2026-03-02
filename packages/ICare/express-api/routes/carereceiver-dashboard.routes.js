import { Router } from "express";
import { pool } from "../db/db.js";
import {
    sendBookingRequestConfirmationEmail,
    sendBookingRequestNotificationEmail,
    sendBookingCancellationConfirmationEmail,
    sendBookingCancellationNotificationEmail
} from "../services/emails/bookings.js";

const router = Router();
const ALLOWED_SORTS = new Set(["startTime_asc", "completedAt_desc"]);
const ALLOWED_REVIEW_SORTS = new Set(["newest", "highest"]);
const ACCEPTED_BOOKING_STATUSES = ["accepted", "in_progress", "completed", "payment_released", "reviewed"];
const MIN_REQUESTS_FOR_RESPONSE_METRICS = 5;
const MIN_ACCEPTED_FOR_RESPONSE_METRICS = 3;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const DETAIL_STATUS_LABELS = {
    requested: "Requested",
    accepted: "Confirmed",
    confirmed: "Confirmed",
    in_progress: "In Progress",
    completed: "Completed",
    payment_released: "Payment Released",
    reviewed: "Reviewed",
    declined: "Declined",
    expired: "Expired",
    cancelled_by_cr: "Cancelled",
    cancelled_by_cg: "Cancelled",
    cancelled: "Cancelled"
};
const CANCELLATION_REASONS = new Set(["schedule_change", "no_longer_needed", "emergency", "other"]);
const CANCELLATION_REASON_LABELS = {
    schedule_change: "Schedule change",
    no_longer_needed: "No longer needed",
    emergency: "Emergency",
    other: "Other"
};
const CAREGIVER_DIRECTORY = {
    "cg-001": {
        id: "cg-001",
        name: "Sarah Thompson",
        photoUrl: "/images/avatars/female.webp",
        phone: "07700 900321",
        email: "sarah.thompson@example.com",
        hourlyRate: 18,
        rating: 4.8,
        reviewCount: 24,
        verificationBadges: ["Identity Verified", "DBS Verified"]
    },
    "cg-002": {
        id: "cg-002",
        name: "Mary Johnson",
        photoUrl: "/images/avatars/female.webp",
        phone: "07700 900322",
        email: "mary.johnson@example.com",
        hourlyRate: 17,
        rating: 4.7,
        reviewCount: 19,
        verificationBadges: ["Identity Verified", "DBS Verified"]
    },
    "cg-003": {
        id: "cg-003",
        name: "Emma Collins",
        photoUrl: "/images/avatars/female.webp",
        phone: "07700 900323",
        email: "emma.collins@example.com",
        hourlyRate: 20,
        rating: 4.7,
        reviewCount: 14,
        verificationBadges: ["Identity Verified"]
    },
    "cg-004": {
        id: "cg-004",
        name: "Anna Nowak",
        photoUrl: "/images/avatars/female.webp",
        phone: "07700 900324",
        email: "anna.nowak@example.com",
        hourlyRate: 16,
        rating: 4.6,
        reviewCount: 11,
        verificationBadges: ["Identity Verified", "DBS Verified"]
    },
    "cg-005": {
        id: "cg-005",
        name: "Tom Richards",
        photoUrl: "/images/avatars/male.webp",
        phone: "07700 900325",
        email: "tom.richards@example.com",
        hourlyRate: 19,
        rating: 4.8,
        reviewCount: 22,
        verificationBadges: ["Identity Verified", "Right to Work Verified"]
    },
    "cg-006": {
        id: "cg-006",
        name: "Lina Patel",
        photoUrl: "/images/avatars/female.webp",
        phone: "07700 900326",
        email: "lina.patel@example.com",
        hourlyRate: 18,
        rating: 4.9,
        reviewCount: 31,
        verificationBadges: ["Identity Verified", "DBS Verified"]
    },
    "cg-007": {
        id: "cg-007",
        name: "Margaret Shaw",
        photoUrl: "/images/avatars/female.webp",
        phone: "07700 900985",
        email: "maxherbst1985@gmail.com",
        hourlyRate: 19,
        rating: 4.9,
        reviewCount: 16,
        verificationBadges: ["Identity Verified", "DBS Verified", "Right to Work Verified"]
    },
    "cg-emma-wilson": {
        id: "cg-emma-wilson",
        name: "Emma Wilson",
        photoUrl: "/images/avatars/female.webp",
        phone: "07700 900321",
        email: "emma.wilson@example.com",
        hourlyRate: 18,
        rating: 4.7,
        reviewCount: 18,
        verificationBadges: ["Identity Verified", "DBS Verified"]
    },
    "cg-john-anderson": {
        id: "cg-john-anderson",
        name: "John Anderson",
        photoUrl: "/images/avatars/male.webp",
        phone: "07700 900654",
        email: "john.anderson@example.com",
        hourlyRate: 19,
        rating: 4.6,
        reviewCount: 21,
        verificationBadges: ["Identity Verified"]
    },
    "cg-margaret-thompson": {
        id: "cg-margaret-thompson",
        name: "Margaret Thompson",
        photoUrl: "/images/avatars/female.webp",
        phone: "07700 900741",
        email: "margaret.thompson@example.com",
        hourlyRate: 20,
        rating: 4.9,
        reviewCount: 31,
        verificationBadges: ["Identity Verified", "DBS Verified", "Right to Work Verified"]
    },
    "cg-mary-thompson": {
        id: "cg-mary-thompson",
        name: "Mary Thompson",
        photoUrl: "/images/avatars/female.webp",
        phone: "07700 901111",
        email: "mary.thompson@example.com",
        hourlyRate: 18,
        rating: 4.8,
        reviewCount: 24,
        verificationBadges: ["Identity Verified", "DBS Verified"]
    }
};

function parsePositiveInt(value, fallback, max = 100) {
    const parsed = Number.parseInt(String(value ?? ""), 10);
    if (!Number.isFinite(parsed) || parsed <= 0) {
        return fallback;
    }
    return Math.min(parsed, max);
}

async function resolveViewer(req) {
    const headerUserId = String(req.get("x-user-id") || "").trim();
    const headerEmail = String(req.get("x-user-email") || "").trim().toLowerCase();

    if (UUID_RE.test(headerUserId)) {
        const byId = await pool.query(
            `
            SELECT
              id, email, user_type, first_name, last_name,
              account_status, phone_verified, email_verified
            FROM users
            WHERE id = $1 AND deleted_at IS NULL
            LIMIT 1
            `,
            [headerUserId]
        );
        if (byId.rows?.[0]) {
            return byId.rows[0];
        }
    }

    if (headerEmail) {
        const byEmail = await pool.query(
            `
            SELECT
              id, email, user_type, first_name, last_name,
              account_status, phone_verified, email_verified
            FROM users
            WHERE lower(email) = $1 AND deleted_at IS NULL
            LIMIT 1
            `,
            [headerEmail]
        );
        if (byEmail.rows?.[0]) {
            return byEmail.rows[0];
        }
    }

    const fallback = await pool.query(
        `
        SELECT
          id, email, user_type, first_name, last_name,
          account_status, phone_verified, email_verified
        FROM users
        WHERE user_type IN ('care_receiver', 'family') AND deleted_at IS NULL
        ORDER BY created_at DESC
        LIMIT 1
        `
    );
    return fallback.rows?.[0] || null;
}

function buildBookingFilters({ viewerId, statusList, startDate, endDate }) {
    const clauses = [];
    const params = [];
    let idx = 1;

    if (viewerId) {
        clauses.push(`(care_receiver_id IS NULL OR care_receiver_id = $${idx})`);
        params.push(viewerId);
        idx += 1;
    }

    if (statusList.length > 0) {
        clauses.push(`status = ANY($${idx}::text[])`);
        params.push(statusList);
        idx += 1;
    }

    if (startDate) {
        clauses.push(`booking_date >= $${idx}::date`);
        params.push(startDate);
        idx += 1;
    }

    if (endDate) {
        clauses.push(`booking_date <= $${idx}::date`);
        params.push(endDate);
        idx += 1;
    }

    return {
        whereSql: clauses.length > 0 ? `WHERE ${clauses.join(" AND ")}` : "",
        params,
        nextIndex: idx
    };
}

function formatDateLong(isoDate) {
    if (!isoDate) {
        return "";
    }
    const parsed = new Date(`${isoDate}T00:00:00Z`);
    if (Number.isNaN(parsed.getTime())) {
        return String(isoDate);
    }
    return new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC"
    }).format(parsed);
}

function formatTime12(date) {
    return new Intl.DateTimeFormat("en-GB", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "UTC"
    }).format(date);
}

function buildTimeRangeLabel(startTimeRaw, durationHoursRaw) {
    if (!startTimeRaw) {
        return "";
    }

    const matched = String(startTimeRaw).match(/^(\d{1,2}):(\d{2})/);
    if (!matched) {
        return "";
    }

    const start = new Date(Date.UTC(2000, 0, 1, Number(matched[1]), Number(matched[2]), 0));
    const durationHours = Number(durationHoursRaw || 0);
    const durationMinutes = Number.isFinite(durationHours) ? Math.max(0, Math.round(durationHours * 60)) : 0;
    const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

    if (durationMinutes <= 0) {
        return formatTime12(start);
    }
    return `${formatTime12(start)} - ${formatTime12(end)}`;
}

function formatTimelineItems(row) {
    if (Array.isArray(row.timeline_json) && row.timeline_json.length > 0) {
        return row.timeline_json;
    }

    const timeline = [];
    if (row.requested_at) {
        timeline.push({
            timestamp: row.requested_at,
            timestampFormatted: new Date(row.requested_at).toLocaleString("en-GB"),
            title: "Booking Requested",
            description: "You submitted a booking request.",
            isActive: false
        });
    }

    if (row.accepted_at) {
        timeline.push({
            timestamp: row.accepted_at,
            timestampFormatted: new Date(row.accepted_at).toLocaleString("en-GB"),
            title: "Booking Accepted",
            description: `${row.caregiver_name || "Caregiver"} accepted your request.`,
            isActive: true
        });
    }

    if (row.completed_at) {
        timeline.push({
            timestamp: row.completed_at,
            timestampFormatted: new Date(row.completed_at).toLocaleString("en-GB"),
            title: "Service Completed",
            description: "Booking marked as completed.",
            isActive: true
        });
    }

    return timeline;
}

function toTitleFromId(value) {
    return String(value || "")
        .replace(/^cg-/, "")
        .replace(/[-_]+/g, " ")
        .trim()
        .replace(/\b\w/g, (match) => match.toUpperCase());
}

function resolveCaregiverProfile(caregiverId) {
    const normalizedId = String(caregiverId || "").trim();
    const preset = CAREGIVER_DIRECTORY[normalizedId];
    if (preset) {
        return preset;
    }

    const fallbackName = toTitleFromId(normalizedId) || "Caregiver";
    const baseSlug = fallbackName.toLowerCase().replace(/[^a-z0-9]+/g, ".");

    return {
        id: normalizedId || "cg-unknown",
        name: fallbackName,
        photoUrl: "/images/avatars/female.webp",
        phone: "",
        email: baseSlug ? `${baseSlug}@example.com` : "",
        hourlyRate: 18,
        rating: 4.7,
        reviewCount: 0,
        verificationBadges: ["Identity Verified"]
    };
}

function roundMoney(value) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) {
        return 0;
    }
    return Math.round(numeric * 100) / 100;
}

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function isValidEmergencyPhone(value) {
    const normalized = String(value || "").replace(/[^\d+]/g, "");
    return /^\+[1-9]\d{7,14}$/.test(normalized) || /^0\d{9,10}$/.test(normalized);
}

async function getCaregiverResponseMetrics(caregiverId) {
    const normalizedId = String(caregiverId || "").trim();
    if (!normalizedId) {
        return null;
    }

    const metricsQuery = await pool.query(
        `
        SELECT
          COUNT(*) FILTER (WHERE requested_at IS NOT NULL) AS total_requests_received,
          COUNT(*) FILTER (
            WHERE requested_at IS NOT NULL
              AND (status = ANY($2::text[]) OR accepted_at IS NOT NULL)
          ) AS accepted_requests,
          AVG(
            EXTRACT(EPOCH FROM (accepted_at - requested_at)) / 3600.0
          ) FILTER (
            WHERE requested_at IS NOT NULL
              AND accepted_at IS NOT NULL
              AND accepted_at >= requested_at
          ) AS average_response_time_hours
        FROM carereceiver_dashboard_bookings
        WHERE caregiver_id = $1
        `,
        [normalizedId, ACCEPTED_BOOKING_STATUSES]
    );

    const row = metricsQuery.rows?.[0] || {};
    const totalRequestsReceived = Number(row.total_requests_received || 0);
    const acceptedRequests = Number(row.accepted_requests || 0);
    const averageResponseTimeHours = row.average_response_time_hours == null
        ? null
        : Number(row.average_response_time_hours);
    const acceptanceRate = totalRequestsReceived > 0
        ? Number((acceptedRequests / totalRequestsReceived).toFixed(4))
        : null;

    const hasSufficientData = (
        totalRequestsReceived >= MIN_REQUESTS_FOR_RESPONSE_METRICS &&
        acceptedRequests >= MIN_ACCEPTED_FOR_RESPONSE_METRICS &&
        Number.isFinite(averageResponseTimeHours)
    );

    return {
        acceptanceRate: Number.isFinite(acceptanceRate) ? acceptanceRate : null,
        averageResponseTimeHours: Number.isFinite(averageResponseTimeHours) ? Number(averageResponseTimeHours.toFixed(1)) : null,
        totalRequestsReceived,
        acceptedRequests,
        hasSufficientData
    };
}

function normalizeBookingDate(value) {
    const raw = String(value || "").trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
        return "";
    }

    const date = new Date(`${raw}T00:00:00.000Z`);
    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return raw;
}

function normalizeStartTime(value) {
    const raw = String(value || "").trim();
    if (!raw) {
        return "";
    }

    const hhmm = raw.match(/^([01]?\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/);
    if (hhmm) {
        const hours = String(hhmm[1]).padStart(2, "0");
        const minutes = String(hhmm[2]).padStart(2, "0");
        const seconds = String(hhmm[3] || "00").padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
    }

    const ampm = raw.match(/^(\d{1,2}):([0-5]\d)\s*(AM|PM)$/i);
    if (ampm) {
        let hours = Number(ampm[1]);
        const minutes = String(ampm[2]).padStart(2, "0");
        const meridiem = String(ampm[3]).toUpperCase();
        if (meridiem === "PM" && hours < 12) {
            hours += 12;
        }
        if (meridiem === "AM" && hours === 12) {
            hours = 0;
        }
        return `${String(hours).padStart(2, "0")}:${minutes}:00`;
    }

    const parsed = new Date(raw);
    if (!Number.isNaN(parsed.getTime())) {
        return `${String(parsed.getUTCHours()).padStart(2, "0")}:${String(parsed.getUTCMinutes()).padStart(2, "0")}:00`;
    }

    return "";
}

function buildUtcDateTime(bookingDate, startTime) {
    const date = normalizeBookingDate(bookingDate);
    const time = normalizeStartTime(startTime);
    if (!date || !time) {
        return null;
    }

    const parsed = new Date(`${date}T${time}Z`);
    if (Number.isNaN(parsed.getTime())) {
        return null;
    }
    return parsed;
}

function normalizeSqlDate(value) {
    if (!value) {
        return "";
    }

    if (typeof value === "string") {
        const trimmed = value.trim();
        if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
            return trimmed;
        }
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
        return "";
    }
    return parsed.toISOString().slice(0, 10);
}

function normalizeSqlTime(value) {
    const raw = String(value || "").trim();
    const hhmmss = raw.match(/^([01]?\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/);
    if (!hhmmss) {
        return "";
    }

    return `${String(hhmmss[1]).padStart(2, "0")}:${String(hhmmss[2]).padStart(2, "0")}:${String(hhmmss[3] || "00").padStart(2, "0")}`;
}

function calculateCancellationRefund({
    status,
    bookingDate,
    startTime,
    paymentTotal,
    paymentSubtotal,
    paymentServiceFee
}) {
    const total = roundMoney(paymentTotal);
    const subtotal = roundMoney(paymentSubtotal);
    const serviceFee = Math.max(0, roundMoney(paymentServiceFee));
    const refundableBase = subtotal > 0
        ? subtotal
        : Math.max(0, roundMoney(total - serviceFee));
    const normalizedStatus = String(status || "").toLowerCase();

    if (normalizedStatus === "requested") {
        return {
            amount: refundableBase,
            percentage: 100,
            reason: "Cancelled before acceptance (service fee retained)",
            processedAt: new Date().toISOString()
        };
    }

    const date = normalizeSqlDate(bookingDate);
    const time = normalizeSqlTime(startTime);
    if (!date || !time) {
        return {
            amount: refundableBase,
            percentage: 100,
            reason: "Service fee is non-refundable",
            processedAt: new Date().toISOString()
        };
    }

    const startsAt = new Date(`${date}T${time}Z`);
    const diffHours = (startsAt.getTime() - Date.now()) / (60 * 60 * 1000);

    if (!Number.isFinite(diffHours)) {
        return {
            amount: refundableBase,
            percentage: 100,
            reason: "Service fee is non-refundable",
            processedAt: new Date().toISOString()
        };
    }

    if (diffHours >= 24) {
        return {
            amount: refundableBase,
            percentage: 100,
            reason: "Cancelled 24+ hours before start (service fee retained)",
            processedAt: new Date().toISOString()
        };
    }

    if (diffHours >= 2) {
        return {
            amount: roundMoney(refundableBase * 0.5),
            percentage: 50,
            reason: "Cancelled less than 24 hours before start (service fee retained)",
            processedAt: new Date().toISOString()
        };
    }

    return {
        amount: 0,
        percentage: 0,
        reason: "Cancelled within 2 hours of start",
        processedAt: new Date().toISOString()
    };
}

function normalizeServiceTypes(rawServiceTypes, rawServiceType) {
    const arrayValue = Array.isArray(rawServiceTypes)
        ? rawServiceTypes
        : [rawServiceTypes || rawServiceType || "Companionship"];

    const normalized = arrayValue
        .map((entry) => String(entry || "").trim())
        .filter(Boolean)
        .slice(0, 6);

    return normalized.length > 0 ? normalized : ["Companionship"];
}

async function generateBookingId(year) {
    for (let attempt = 0; attempt < 20; attempt += 1) {
        const suffix = String(Math.floor(1000 + Math.random() * 9000));
        const candidate = `bk-${year}-${suffix}`;
        const exists = await pool.query(
            "SELECT 1 FROM carereceiver_dashboard_bookings WHERE id = $1 LIMIT 1",
            [candidate]
        );
        if (!exists.rows?.[0]) {
            return candidate;
        }
    }

    const fallback = await pool.query(
        `
        SELECT COALESCE(MAX(CAST(SUBSTRING(id FROM 9) AS INTEGER)), 999) + 1 AS next_suffix
        FROM carereceiver_dashboard_bookings
        WHERE id LIKE $1
        `,
        [`bk-${year}-%`]
    );

    const nextSuffix = Number(fallback.rows?.[0]?.next_suffix || 1000);
    return `bk-${year}-${String(nextSuffix).padStart(4, "0")}`;
}

function compactConversationPreview(text, maxLength = 180) {
    const compacted = String(text || "").replace(/\s+/g, " ").trim();
    if (!compacted) {
        return "";
    }
    return compacted.length > maxLength ? `${compacted.slice(0, maxLength - 1)}...` : compacted;
}

function buildBookingRequestSystemMessage({
    bookingRef,
    bookingDate,
    startTime,
    durationHours,
    specialRequests
}) {
    const reference = String(bookingRef || "").trim() || "Pending";
    const dateLabel = formatDateLong(normalizeSqlDate(bookingDate)) || "To be confirmed";
    const timeLabel = buildTimeRangeLabel(normalizeSqlTime(startTime), durationHours) || "To be confirmed";
    const notes = String(specialRequests || "").trim();
    const lines = [
        `Booking request created (${reference}).`,
        `Schedule: ${dateLabel}, ${timeLabel}.`
    ];
    if (notes) {
        lines.push("Special requests:");
        lines.push(notes);
    }
    return lines.join("\n");
}

function buildBookingCancellationSystemMessage({
    bookingRef,
    bookingDate,
    startTime,
    durationHours,
    reasonLabel,
    details,
    refundAmount
}) {
    const reference = String(bookingRef || "").trim() || "Pending";
    const dateLabel = formatDateLong(normalizeSqlDate(bookingDate)) || "To be confirmed";
    const timeLabel = buildTimeRangeLabel(normalizeSqlTime(startTime), durationHours) || "To be confirmed";
    const reason = String(reasonLabel || "").trim() || "Other";
    const detailText = String(details || "").trim();
    const lines = [
        `Booking cancelled by care receiver (${reference}).`,
        `Original schedule: ${dateLabel}, ${timeLabel}.`,
        `Reason: ${reason}${detailText ? ` - ${detailText}` : ""}.`
    ];

    if (Number.isFinite(Number(refundAmount))) {
        lines.push(`Refund amount: £${Number(refundAmount).toFixed(2)}.`);
    }

    return lines.join("\n");
}

async function ensureConversationForBooking({
    bookingId,
    conversationId,
    careReceiverId,
    caregiverId,
    caregiverName,
    caregiverPhotoUrl,
    caregiverPhone
}) {
    const safeBookingId = String(bookingId || "").trim();
    if (!safeBookingId) {
        return "";
    }

    const safeConversationId = String(conversationId || "").trim() || `conv-${safeBookingId}`;
    await pool.query(
        `
        UPDATE carereceiver_dashboard_bookings
        SET conversation_id = $2,
            updated_at = NOW()
        WHERE id = $1
        `,
        [safeBookingId, safeConversationId]
    );

    await pool.query(
        `
        INSERT INTO carereceiver_conversations (
          id,
          booking_id,
          care_receiver_id,
          caregiver_id,
          caregiver_name,
          caregiver_photo_url,
          caregiver_phone,
          is_active,
          created_at,
          updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, TRUE, NOW(), NOW())
        ON CONFLICT (id) DO UPDATE SET
          booking_id = EXCLUDED.booking_id,
          care_receiver_id = EXCLUDED.care_receiver_id,
          caregiver_id = EXCLUDED.caregiver_id,
          caregiver_name = EXCLUDED.caregiver_name,
          caregiver_photo_url = EXCLUDED.caregiver_photo_url,
          caregiver_phone = EXCLUDED.caregiver_phone,
          is_active = TRUE,
          updated_at = NOW()
        `,
        [
            safeConversationId,
            safeBookingId,
            careReceiverId || null,
            caregiverId || null,
            caregiverName || "Caregiver",
            caregiverPhotoUrl || null,
            caregiverPhone || null
        ]
    );

    return safeConversationId;
}

async function appendSystemConversationMessage(conversationId, messageText) {
    const safeConversationId = String(conversationId || "").trim();
    const safeMessageText = String(messageText || "").trim();
    if (!safeConversationId || !safeMessageText) {
        return;
    }

    await pool.query(
        `
        INSERT INTO carereceiver_messages (
          conversation_id,
          sender_role,
          sender_name,
          message_text,
          sent_at,
          is_system_message,
          is_flagged
        ) VALUES ($1, 'system', 'ICare System', $2, NOW(), TRUE, FALSE)
        `,
        [safeConversationId, safeMessageText]
    );

    await pool.query(
        `
        UPDATE carereceiver_conversations
        SET
          last_message_preview = $2,
          last_message_at = NOW(),
          updated_at = NOW()
        WHERE id = $1
        `,
        [safeConversationId, compactConversationPreview(safeMessageText)]
    );
}

router.get("/users/me", async (req, res) => {
    try {
        const viewer = await resolveViewer(req);
        if (!viewer) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "RESOURCE_NOT_FOUND",
                    message: "No user profile found."
                }
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                id: viewer.id,
                email: viewer.email,
                userType: viewer.user_type,
                firstName: viewer.first_name,
                lastName: viewer.last_name,
                accountStatus: viewer.account_status || "active",
                phoneVerified: Boolean(viewer.phone_verified),
                emailVerified: Boolean(viewer.email_verified)
            }
        });
    } catch {
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: "Could not load current user profile."
            }
        });
    }
});

router.get("/caregivers/:caregiverId", async (req, res) => {
    const caregiverId = String(req.params?.caregiverId || "").trim();
    if (!caregiverId) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "caregiverId is required."
            }
        });
    }

    try {
        const caregiver = resolveCaregiverProfile(caregiverId);
        const responseMetrics = await getCaregiverResponseMetrics(caregiverId);
        const nameParts = String(caregiver.name || "").trim().split(/\s+/);
        const firstName = nameParts[0] || "Caregiver";
        const lastName = nameParts.slice(1).join(" ");
        const maskedLastName = lastName ? `${lastName[0]}.` : "";

        return res.status(200).json({
            success: true,
            data: {
                id: caregiver.id,
                firstName,
                lastName: maskedLastName,
                profilePhotoUrl: caregiver.photoUrl || "",
                hourlyRate: Number(caregiver.hourlyRate || 0),
                averageRating: Number(caregiver.rating || 0),
                totalReviews: Number(caregiver.reviewCount || 0),
                verification: {
                    idVerified: true,
                    dbsVerified: caregiver.verificationBadges?.includes("DBS Verified") || false,
                    rightToWorkVerified: caregiver.verificationBadges?.includes("Right to Work Verified") || false
                },
                responseMetrics: responseMetrics?.hasSufficientData
                    ? {
                        acceptanceRate: responseMetrics.acceptanceRate,
                        averageResponseTimeHours: responseMetrics.averageResponseTimeHours,
                        totalRequestsReceived: responseMetrics.totalRequestsReceived
                    }
                    : null
            }
        });
    } catch (error) {
        console.error("[carereceiver-dashboard] GET /caregivers/:caregiverId failed:", error);
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: "Could not load caregiver profile."
            }
        });
    }
});

router.post("/bookings", async (req, res) => {
    const caregiverId = String(req.body?.caregiverId || "").trim();
    const bookingDate = normalizeBookingDate(req.body?.bookingDate);
    const startTimeSql = normalizeStartTime(req.body?.startTime);
    const durationHours = Number(req.body?.durationHours);
    const specialRequests = String(req.body?.specialRequests || "").trim();
    const emergencyContact = req.body?.emergencyContact && typeof req.body.emergencyContact === "object"
        ? req.body.emergencyContact
        : {};

    if (!caregiverId) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "caregiverId is required."
            }
        });
    }

    if (!bookingDate) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "bookingDate must use YYYY-MM-DD format."
            }
        });
    }

    if (!startTimeSql) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "startTime is required."
            }
        });
    }

    if (!Number.isFinite(durationHours) || durationHours < 2 || durationHours > 8) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "durationHours must be between 2 and 8."
            }
        });
    }

    if (specialRequests.length > 500) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "specialRequests cannot exceed 500 characters."
            }
        });
    }

    const emergencyName = String(emergencyContact?.name || "").trim();
    const emergencyPhone = String(emergencyContact?.phone || "").trim();
    const emergencyRelationship = String(emergencyContact?.relationship || "").trim();

    if (!emergencyName || !emergencyPhone || !emergencyRelationship) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Emergency contact name, phone and relationship are required."
            }
        });
    }

    if (!isValidEmergencyPhone(emergencyPhone)) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Emergency contact phone must be valid (e.g. +447700900123 or 07700900123)."
            }
        });
    }

    try {
        const viewer = await resolveViewer(req);
        if (!viewer?.id) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "RESOURCE_NOT_FOUND",
                    message: "Care receiver profile not found."
                }
            });
        }

        const caregiver = resolveCaregiverProfile(caregiverId);
        const serviceTypes = normalizeServiceTypes(req.body?.serviceTypes, req.body?.serviceType);
        const serviceType = serviceTypes[0];
        const startAt = buildUtcDateTime(bookingDate, startTimeSql);
        if (!startAt) {
            return res.status(400).json({
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: "Could not parse booking start date/time."
                }
            });
        }

        const endAt = new Date(startAt.getTime() + Math.round(durationHours * 60) * 60000);
        const pricingInput = req.body?.pricing && typeof req.body.pricing === "object" ? req.body.pricing : {};
        const paymentInput = req.body?.payment && typeof req.body.payment === "object" ? req.body.payment : {};

        const hourlyRate = roundMoney(pricingInput.hourlyRate || caregiver.hourlyRate || 18);
        const subtotal = roundMoney(pricingInput.subtotal || (hourlyRate * durationHours));
        const serviceFeePercentage = roundMoney(pricingInput.serviceFeePercent ?? pricingInput.serviceFeePercentage ?? 5);
        const serviceFee = roundMoney(
            pricingInput.serviceFee ||
            pricingInput.platformServiceFee ||
            (subtotal * (serviceFeePercentage / 100))
        );
        const total = roundMoney(pricingInput.total || pricingInput.totalCharge || (subtotal + serviceFee));

        const paymentMethodId = String(paymentInput.paymentMethodId || req.body?.paymentMethodId || "").trim();
        const paymentMethodLabel = paymentMethodId
            ? `Saved card (${paymentMethodId.slice(-6)})`
            : "Saved card";
        const responseDeadline = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const requestedAt = new Date();
        const bookingYear = bookingDate.slice(0, 4);
        const bookingId = await generateBookingId(bookingYear);
        const bookingRef = bookingId.toUpperCase();
        const conversationId = `conv-${bookingId}`;
        const timelineJson = [
            {
                timestamp: requestedAt.toISOString(),
                timestampFormatted: requestedAt.toLocaleString("en-GB"),
                title: "Booking Requested",
                description: "You submitted a booking request.",
                isActive: true
            }
        ];

        await pool.query(
            `
            INSERT INTO carereceiver_dashboard_bookings (
              id,
              booking_ref,
              care_receiver_id,
              caregiver_id,
              caregiver_name,
              caregiver_photo_url,
              caregiver_phone,
              caregiver_email,
              caregiver_rating,
              caregiver_review_count,
              caregiver_verification_badges,
              booking_date,
              start_time,
              duration_hours,
              status,
              response_deadline,
              service_type,
              service_types,
              special_requests,
              address,
              payment_hourly_rate,
              payment_duration,
              payment_subtotal,
              payment_service_fee,
              payment_service_fee_percentage,
              payment_total,
              payment_method,
              payment_refund_amount,
              emergency_contact_name,
              emergency_contact_phone,
              emergency_contact_relationship,
              requested_at,
              timeline_json,
              conversation_id,
              has_review,
              created_at,
              updated_at
            ) VALUES (
              $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::text[], $12::date, $13::time, $14,
              'requested', $15, $16, $17::text[], $18, $19, $20, $21, $22, $23, $24, $25, $26, $27,
              $28, $29, $30, $31, $32::jsonb, $33, FALSE, NOW(), NOW()
            )
            `,
            [
                bookingId,
                bookingRef,
                viewer.id,
                caregiver.id,
                caregiver.name,
                caregiver.photoUrl,
                caregiver.phone,
                caregiver.email,
                Number(caregiver.rating || 0),
                Number(caregiver.reviewCount || 0),
                Array.isArray(caregiver.verificationBadges) ? caregiver.verificationBadges : [],
                bookingDate,
                startTimeSql,
                durationHours,
                responseDeadline.toISOString(),
                serviceType,
                serviceTypes,
                specialRequests,
                String(req.body?.address || "Address to be confirmed").trim(),
                hourlyRate,
                durationHours,
                subtotal,
                serviceFee,
                serviceFeePercentage,
                total,
                paymentMethodLabel,
                0,
                emergencyName,
                emergencyPhone,
                emergencyRelationship,
                requestedAt.toISOString(),
                JSON.stringify(timelineJson),
                conversationId
            ]
        );

        const firstName = caregiver.name.split(" ")[0] || caregiver.name;
        const lastInitial = (caregiver.name.split(" ")[1] || "").slice(0, 1);

        const careReceiverName = [viewer.first_name, viewer.last_name ? `${viewer.last_name[0]}.` : ""]
            .filter(Boolean)
            .join(" ")
            .trim() || "Care receiver";

        try {
            const resolvedConversationId = await ensureConversationForBooking({
                bookingId,
                conversationId,
                careReceiverId: viewer.id,
                caregiverId: caregiver.id,
                caregiverName: caregiver.name,
                caregiverPhotoUrl: caregiver.photoUrl,
                caregiverPhone: caregiver.phone
            });

            await appendSystemConversationMessage(
                resolvedConversationId,
                buildBookingRequestSystemMessage({
                    bookingRef,
                    bookingDate,
                    startTime: startTimeSql,
                    durationHours,
                    specialRequests
                })
            );
        } catch (conversationError) {
            console.error("[carereceiver-dashboard] booking conversation sync failed:", conversationError);
        }

        try {
            if (isValidEmail(viewer.email)) {
                await sendBookingRequestConfirmationEmail(viewer.email, {
                    bookingId,
                    bookingRef,
                    caregiverName: caregiver.name,
                    bookingDate,
                    startTime: startTimeSql,
                    durationHours,
                    specialRequests
                });
            }
        } catch (emailError) {
            console.error("[carereceiver-dashboard] booking confirmation email failed:", emailError);
        }

        try {
            if (isValidEmail(caregiver.email)) {
                await sendBookingRequestNotificationEmail(caregiver.email, {
                    bookingRef,
                    careReceiverName,
                    bookingDate,
                    startTime: startTimeSql,
                    durationHours,
                    specialRequests
                });
            }
        } catch (emailError) {
            console.error("[carereceiver-dashboard] caregiver notification email failed:", emailError);
        }

        return res.status(201).json({
            success: true,
            data: {
                id: bookingId,
                bookingId,
                status: "requested",
                caregiver: {
                    id: caregiver.id,
                    firstName,
                    lastInitial
                },
                bookingDate,
                startTime: startAt.toISOString(),
                endTime: endAt.toISOString(),
                durationHours,
                pricing: {
                    hourlyRate,
                    durationHours,
                    subtotal,
                    platformServiceFee: serviceFee,
                    totalCharge: total
                },
                paymentStatus: paymentInput.authorizationId ? "authorized" : "pending",
                paymentIntentId: paymentInput.authorizationId || null,
                responseDeadline: responseDeadline.toISOString(),
                requestedAt: requestedAt.toISOString()
            }
        });
    } catch (error) {
        console.error("[carereceiver-dashboard] POST /bookings failed:", error);
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: "Could not create booking request."
            }
        });
    }
});

router.get("/care-receivers/me/bookings", async (req, res) => {
    try {
        const viewer = await resolveViewer(req);
        const viewerId = viewer?.id || null;
        const statusList = String(req.query.status || "")
            .split(",")
            .map((value) => value.trim())
            .filter(Boolean);
        const startDate = String(req.query.startDate || "").trim();
        const endDate = String(req.query.endDate || "").trim();
        const limit = parsePositiveInt(req.query.limit, 20, 100);
        const page = parsePositiveInt(req.query.page, 1, 1000);
        const offset = (page - 1) * limit;
        const sort = String(req.query.sort || "").trim();

        const { whereSql, params, nextIndex } = buildBookingFilters({
            viewerId,
            statusList,
            startDate,
            endDate
        });

        let orderSql = "ORDER BY created_at DESC";
        if (ALLOWED_SORTS.has(sort) && sort === "startTime_asc") {
            orderSql = "ORDER BY booking_date ASC NULLS LAST, start_time ASC NULLS LAST, created_at DESC";
        } else if (ALLOWED_SORTS.has(sort) && sort === "completedAt_desc") {
            orderSql = "ORDER BY completed_at DESC NULLS LAST, updated_at DESC";
        }

        const listParams = [...params, limit, offset];
        const listSql = `
            SELECT
              b.id,
              b.status,
              COALESCE(row_json.row_data->>'caregiver_id', '') AS "caregiverId",
              b.caregiver_name AS "caregiverName",
              b.caregiver_photo_url AS "caregiverPhotoUrl",
              to_char(b.booking_date, 'YYYY-MM-DD') AS "bookingDate",
              to_char(b.start_time, 'HH12:MI AM') AS "startTime",
              NULLIF(row_json.row_data->>'duration_hours', '')::numeric AS "durationHours",
              b.response_deadline AS "responseDeadline",
              b.conversation_id AS "conversationId",
              b.completed_at AS "completedAt",
              b.updated_at AS "updatedAt",
              b.created_at AS "createdAt",
              b.has_review AS "hasReview",
              COALESCE(row_json.row_data->>'booking_ref', upper(b.id)) AS "bookingRef",
              NULLIF(row_json.row_data->>'service_type', '') AS "serviceType",
              ARRAY(
                SELECT jsonb_array_elements_text(
                  CASE
                    WHEN jsonb_typeof(row_json.row_data->'service_types') = 'array'
                      THEN row_json.row_data->'service_types'
                    ELSE '[]'::jsonb
                  END
                )
              ) AS "serviceTypes",
              NULLIF(row_json.row_data->>'payment_hourly_rate', '')::numeric AS "hourlyRate",
              NULLIF(row_json.row_data->>'payment_total', '')::numeric AS "paymentTotal"
            FROM carereceiver_dashboard_bookings b
            CROSS JOIN LATERAL (
              SELECT to_jsonb(b) AS row_data
            ) row_json
            ${whereSql}
            ${orderSql}
            LIMIT $${nextIndex}
            OFFSET $${nextIndex + 1}
        `;

        const countSql = `
            SELECT COUNT(*)::int AS total
            FROM carereceiver_dashboard_bookings
            ${whereSql}
        `;

        const [listResult, countResult] = await Promise.all([
            pool.query(listSql, listParams),
            pool.query(countSql, params)
        ]);

        return res.status(200).json({
            success: true,
            data: {
                bookings: listResult.rows || [],
                pagination: {
                    totalCount: Number(countResult.rows?.[0]?.total || 0),
                    page,
                    limit
                }
            }
        });
    } catch (error) {
        console.error("[carereceiver-dashboard] GET /care-receivers/me/bookings failed:", error);
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: "Could not load bookings."
            }
        });
    }
});

router.get("/bookings/:bookingId", async (req, res) => {
    const bookingId = String(req.params.bookingId || "").trim();
    if (!bookingId) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Booking id is required."
            }
        });
    }

    try {
        const viewer = await resolveViewer(req);
        const viewerId = viewer?.id || null;

        const detailQuery = viewerId
            ? `
              SELECT
                b.*,
                to_char(b.booking_date, 'YYYY-MM-DD') AS "bookingDateText",
                to_char(b.cancelled_date, 'YYYY-MM-DD') AS "cancelledDateText"
              FROM carereceiver_dashboard_bookings b
              WHERE id = $1
                AND (care_receiver_id IS NULL OR care_receiver_id = $2)
              LIMIT 1
            `
            : `
              SELECT
                b.*,
                to_char(b.booking_date, 'YYYY-MM-DD') AS "bookingDateText",
                to_char(b.cancelled_date, 'YYYY-MM-DD') AS "cancelledDateText"
              FROM carereceiver_dashboard_bookings b
              WHERE id = $1
              LIMIT 1
            `;
        const detailParams = viewerId ? [bookingId, viewerId] : [bookingId];
        const result = await pool.query(detailQuery, detailParams);
        const row = result.rows?.[0];

        if (!row) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "RESOURCE_NOT_FOUND",
                    message: "Booking not found."
                }
            });
        }

        const bookingDate = String(row.bookingDateText || "").trim() || normalizeSqlDate(row.booking_date);
        const durationHours = Number(row.duration_hours || 0);
        const paymentDuration = Number(row.payment_duration || durationHours || 0);

        return res.status(200).json({
            success: true,
            data: {
                booking: {
                    id: row.id,
                    ref: row.booking_ref || String(row.id || "").toUpperCase(),
                    status: row.status,
                    statusLabel: DETAIL_STATUS_LABELS[row.status] || row.status || "Status",
                    date: bookingDate,
                    dateFormatted: formatDateLong(bookingDate),
                    timeFormatted: buildTimeRangeLabel(row.start_time, durationHours),
                    duration: durationHours > 0 ? `${durationHours} hours` : "",
                    serviceType: row.service_type || "Companionship",
                    serviceTypes: Array.isArray(row.service_types) && row.service_types.length > 0
                        ? row.service_types
                        : [row.service_type || "Companionship"],
                    specialRequests: row.special_requests || "",
                    address: row.address || "",
                    responseDeadline: row.response_deadline || null,
                    confirmationDeadline: row.confirmation_deadline || null,
                    requestedAt: row.requested_at || null,
                    acceptedAt: row.accepted_at || null,
                    declineReason: row.decline_reason || "",
                    cancelledDate: String(row.cancelledDateText || "").trim() || null,
                    timeline: formatTimelineItems(row)
                },
                caregiver: {
                    id: row.caregiver_id || "",
                    name: row.caregiver_name || "Caregiver",
                    photo: row.caregiver_photo_url || "",
                    phone: row.caregiver_phone || "",
                    email: row.caregiver_email || "",
                    rating: Number(row.caregiver_rating || 0),
                    reviewCount: Number(row.caregiver_review_count || 0),
                    verificationBadges: Array.isArray(row.caregiver_verification_badges)
                        ? row.caregiver_verification_badges
                        : []
                },
                payment: {
                    hourlyRate: Number(row.payment_hourly_rate || 0),
                    duration: paymentDuration,
                    subtotal: Number(row.payment_subtotal || 0),
                    serviceFee: Number(row.payment_service_fee || 0),
                    serviceFeePercentage: Number(row.payment_service_fee_percentage || 0),
                    total: Number(row.payment_total || 0),
                    paymentMethod: row.payment_method || "",
                    refundAmount: Number(row.payment_refund_amount || 0)
                }
            }
        });
    } catch {
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: "Could not load booking detail."
            }
        });
    }
});

router.post("/bookings/:bookingId/review", async (req, res) => {
    const bookingId = String(req.params.bookingId || "").trim();
    const ratingRaw = Number(req.body?.rating);
    const reviewTextRaw = String(req.body?.reviewText || "").trim();
    const reviewTagsRaw = Array.isArray(req.body?.reviewTags) ? req.body.reviewTags : [];

    if (!bookingId) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Booking id is required."
            }
        });
    }

    if (!Number.isFinite(ratingRaw) || ratingRaw < 1 || ratingRaw > 5) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Rating must be between 1 and 5."
            }
        });
    }

    if (reviewTextRaw.length > 500) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Review text cannot exceed 500 characters."
            }
        });
    }

    const reviewTags = reviewTagsRaw
        .map((item) => String(item || "").trim())
        .filter(Boolean)
        .slice(0, 10);

    try {
        const viewer = await resolveViewer(req);
        const viewerId = viewer?.id || null;
        const bookingQuery = viewerId
            ? `
              SELECT id, status, has_review
              FROM carereceiver_dashboard_bookings
              WHERE id = $1
                AND (care_receiver_id IS NULL OR care_receiver_id = $2)
              LIMIT 1
            `
            : `
              SELECT id, status, has_review
              FROM carereceiver_dashboard_bookings
              WHERE id = $1
              LIMIT 1
            `;
        const bookingParams = viewerId ? [bookingId, viewerId] : [bookingId];
        const bookingResult = await pool.query(bookingQuery, bookingParams);
        const booking = bookingResult.rows?.[0];

        if (!booking) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "RESOURCE_NOT_FOUND",
                    message: "Booking not found."
                }
            });
        }

        if (booking.has_review === true) {
            return res.status(409).json({
                success: false,
                error: {
                    code: "CONFLICT",
                    message: "Review was already submitted for this booking."
                }
            });
        }

        const supportedStatuses = new Set(["completed", "payment_released", "reviewed"]);
        if (!supportedStatuses.has(String(booking.status || ""))) {
            return res.status(409).json({
                success: false,
                error: {
                    code: "CONFLICT",
                    message: "Review is available only after booking completion."
                }
            });
        }

        const existingReview = await pool.query(
            `
            SELECT id
            FROM carereceiver_booking_reviews
            WHERE booking_id = $1
            LIMIT 1
            `,
            [bookingId]
        );

        if (existingReview.rows?.[0]) {
            await pool.query(
                `
                UPDATE carereceiver_dashboard_bookings
                SET has_review = TRUE, updated_at = NOW()
                WHERE id = $1
                `,
                [bookingId]
            );

            return res.status(409).json({
                success: false,
                error: {
                    code: "CONFLICT",
                    message: "Review was already submitted for this booking."
                }
            });
        }

        const inserted = await pool.query(
            `
            INSERT INTO carereceiver_booking_reviews (
              booking_id,
              care_receiver_id,
              rating,
              review_text,
              review_tags
            ) VALUES ($1, $2, $3, $4, $5::text[])
            RETURNING id, booking_id AS "bookingId", rating, review_text AS "reviewText", created_at AS "createdAt"
            `,
            [bookingId, viewerId, ratingRaw, reviewTextRaw, reviewTags]
        );
        const review = inserted.rows?.[0];

        await pool.query(
            `
            UPDATE carereceiver_dashboard_bookings
            SET has_review = TRUE, updated_at = NOW()
            WHERE id = $1
            `,
            [bookingId]
        );

        return res.status(201).json({
            success: true,
            data: {
                reviewId: review.id,
                bookingId: review.bookingId,
                rating: Number(review.rating || ratingRaw),
                reviewText: review.reviewText || "",
                reviewTags,
                createdAt: review.createdAt,
                status: "published"
            }
        });
    } catch {
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: "Could not submit review."
            }
        });
    }
});

router.get("/caregivers/:caregiverId/reviews", async (req, res) => {
    const caregiverId = String(req.params.caregiverId || "").trim();
    if (!caregiverId) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Caregiver id is required."
            }
        });
    }

    const limit = parsePositiveInt(req.query.limit, 20, 100);
    const page = parsePositiveInt(req.query.page, 1, 1000);
    const offset = (page - 1) * limit;
    const sort = String(req.query.sort || "newest").trim().toLowerCase();
    const orderSql = ALLOWED_REVIEW_SORTS.has(sort) && sort === "highest"
        ? "ORDER BY r.rating DESC, r.created_at DESC"
        : "ORDER BY r.created_at DESC";

    try {
        const tableCheck = await pool.query(
            "SELECT to_regclass('public.carereceiver_booking_reviews') IS NOT NULL AS exists"
        );
        if (!tableCheck.rows?.[0]?.exists) {
            return res.status(200).json({
                success: true,
                data: {
                    summary: {
                        averageRating: 0,
                        reviewCount: 0,
                        distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
                    },
                    reviews: [],
                    pagination: { page, limit, totalCount: 0, totalPages: 1 }
                }
            });
        }

        const reviewsQuery = `
            SELECT
              r.id,
              r.rating,
              r.review_text AS "reviewText",
              r.created_at AS "createdAt",
              COALESCE(NULLIF(TRIM(CONCAT(u.first_name, ' ', u.last_name)), ''), 'Family member') AS "reviewerName"
            FROM carereceiver_booking_reviews r
            JOIN carereceiver_dashboard_bookings b ON b.id = r.booking_id
            LEFT JOIN users u ON u.id = r.care_receiver_id
            WHERE COALESCE(to_jsonb(b)->>'caregiver_id', '') = $1
            ${orderSql}
            LIMIT $2
            OFFSET $3
        `;

        const summaryQuery = `
            SELECT
              COUNT(*)::int AS total,
              COALESCE(AVG(r.rating), 0)::numeric(4,2) AS avg,
              COUNT(*) FILTER (WHERE r.rating = 5)::int AS star5,
              COUNT(*) FILTER (WHERE r.rating = 4)::int AS star4,
              COUNT(*) FILTER (WHERE r.rating = 3)::int AS star3,
              COUNT(*) FILTER (WHERE r.rating = 2)::int AS star2,
              COUNT(*) FILTER (WHERE r.rating = 1)::int AS star1
            FROM carereceiver_booking_reviews r
            JOIN carereceiver_dashboard_bookings b ON b.id = r.booking_id
            WHERE COALESCE(to_jsonb(b)->>'caregiver_id', '') = $1
        `;

        const [reviewsResult, summaryResult] = await Promise.all([
            pool.query(reviewsQuery, [caregiverId, limit, offset]),
            pool.query(summaryQuery, [caregiverId])
        ]);

        const summaryRow = summaryResult.rows?.[0] || {};
        const reviewCount = Number(summaryRow.total || 0);
        const toPercent = (count) => {
            if (reviewCount <= 0) {
                return 0;
            }
            return Math.round((Number(count || 0) / reviewCount) * 100);
        };

        const reviews = (reviewsResult.rows || []).map((row) => {
            const createdAt = row.createdAt ? new Date(row.createdAt) : null;
            return {
                id: String(row.id),
                name: String(row.reviewerName || "Family member"),
                rating: Number(row.rating || 0),
                text: String(row.reviewText || ""),
                createdAt: createdAt ? createdAt.toISOString() : null,
                dateISO: createdAt ? createdAt.toISOString().slice(0, 10) : "",
                date: createdAt
                    ? new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(createdAt)
                    : ""
            };
        });

        return res.status(200).json({
            success: true,
            data: {
                summary: {
                    averageRating: Number(summaryRow.avg || 0),
                    reviewCount,
                    distribution: {
                        1: toPercent(summaryRow.star1),
                        2: toPercent(summaryRow.star2),
                        3: toPercent(summaryRow.star3),
                        4: toPercent(summaryRow.star4),
                        5: toPercent(summaryRow.star5)
                    }
                },
                reviews,
                pagination: {
                    page,
                    limit,
                    totalCount: reviewCount,
                    totalPages: Math.max(1, Math.ceil(reviewCount / limit))
                }
            }
        });
    } catch (error) {
        console.error("[carereceiver-dashboard] GET /caregivers/:caregiverId/reviews failed:", error);
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: "Could not load caregiver reviews."
            }
        });
    }
});

router.put("/bookings/:bookingId/cancel", async (req, res) => {
    const bookingId = String(req.params.bookingId || "").trim();
    const reason = String(req.body?.reason || "no_longer_needed").trim().toLowerCase();
    const details = String(req.body?.details || "").trim();

    if (!bookingId) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Booking id is required."
            }
        });
    }

    if (!CANCELLATION_REASONS.has(reason)) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Invalid cancellation reason."
            }
        });
    }

    if (details.length > 300) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Cancellation details cannot exceed 300 characters."
            }
        });
    }

    try {
        const viewer = await resolveViewer(req);
        const viewerId = viewer?.id || null;

        const findSql = viewerId
            ? `
              SELECT
                id,
                status,
                booking_ref AS "bookingRef",
                  caregiver_name AS "caregiverName",
                  caregiver_email AS "caregiverEmail",
                  caregiver_id AS "caregiverId",
                  caregiver_photo_url AS "caregiverPhotoUrl",
                  caregiver_phone AS "caregiverPhone",
                  care_receiver_id AS "careReceiverId",
                  conversation_id AS "conversationId",
                  booking_date AS "bookingDate",
                  start_time AS "startTime",
                  duration_hours AS "durationHours",
                  special_requests AS "specialRequests",
                  payment_subtotal AS "paymentSubtotal",
                  payment_service_fee AS "paymentServiceFee",
                  payment_total AS "paymentTotal"
              FROM carereceiver_dashboard_bookings
              WHERE id = $1
                AND (care_receiver_id IS NULL OR care_receiver_id = $2)
              LIMIT 1
            `
            : `
              SELECT
                id,
                status,
                booking_ref AS "bookingRef",
                  caregiver_name AS "caregiverName",
                  caregiver_email AS "caregiverEmail",
                  caregiver_id AS "caregiverId",
                  caregiver_photo_url AS "caregiverPhotoUrl",
                  caregiver_phone AS "caregiverPhone",
                  care_receiver_id AS "careReceiverId",
                  conversation_id AS "conversationId",
                  booking_date AS "bookingDate",
                  start_time AS "startTime",
                  duration_hours AS "durationHours",
                  special_requests AS "specialRequests",
                  payment_subtotal AS "paymentSubtotal",
                  payment_service_fee AS "paymentServiceFee",
                  payment_total AS "paymentTotal"
              FROM carereceiver_dashboard_bookings
              WHERE id = $1
              LIMIT 1
            `;
        const findParams = viewerId ? [bookingId, viewerId] : [bookingId];
        const found = await pool.query(findSql, findParams);
        const booking = found.rows?.[0];

        if (!booking) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "RESOURCE_NOT_FOUND",
                    message: "Booking not found."
                }
            });
        }

        const currentStatus = String(booking.status || "").toLowerCase();
        const allowedStatuses = new Set(["requested", "accepted"]);
        if (!allowedStatuses.has(currentStatus)) {
            return res.status(400).json({
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: "Booking cannot be cancelled in current state."
                }
            });
        }

        const refund = calculateCancellationRefund({
            status: currentStatus,
            bookingDate: booking.bookingDate,
            startTime: booking.startTime,
            paymentTotal: booking.paymentTotal,
            paymentSubtotal: booking.paymentSubtotal,
            paymentServiceFee: booking.paymentServiceFee
        });
        const refundAmount = roundMoney(refund.amount);
        const cancellationNote = details ? `${reason}: ${details}` : reason;
        const query = viewerId
            ? `
              UPDATE carereceiver_dashboard_bookings
              SET
                status = 'cancelled',
                cancelled_date = CURRENT_DATE,
                decline_reason = $3,
                payment_refund_amount = $4,
                updated_at = NOW()
              WHERE id = $1
                AND (care_receiver_id IS NULL OR care_receiver_id = $2)
              RETURNING id, status, updated_at AS "updatedAt"
            `
            : `
              UPDATE carereceiver_dashboard_bookings
              SET
                status = 'cancelled',
                cancelled_date = CURRENT_DATE,
                decline_reason = $2,
                payment_refund_amount = $3,
                updated_at = NOW()
              WHERE id = $1
              RETURNING id, status, updated_at AS "updatedAt"
            `;
        const params = viewerId
            ? [bookingId, viewerId, cancellationNote, refundAmount]
            : [bookingId, cancellationNote, refundAmount];

        const updated = await pool.query(query, params);
        const row = updated.rows?.[0];
        if (!row) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "RESOURCE_NOT_FOUND",
                    message: "Booking not found."
                }
            });
        }

        const cancelledAt = row.updatedAt ? new Date(row.updatedAt).toISOString() : new Date().toISOString();
        const bookingRef = String(booking.bookingRef || bookingId).toUpperCase();
        const reasonLabel = CANCELLATION_REASON_LABELS[reason] || "Other";
        const careReceiverName = [viewer?.first_name, viewer?.last_name ? `${viewer.last_name[0]}.` : ""]
            .filter(Boolean)
            .join(" ")
            .trim() || "Care receiver";

        try {
            if (isValidEmail(viewer?.email)) {
                await sendBookingCancellationConfirmationEmail(viewer.email, {
                    bookingId,
                    bookingRef,
                    caregiverName: booking.caregiverName || "caregiver",
                    bookingDate: normalizeSqlDate(booking.bookingDate),
                    startTime: normalizeSqlTime(booking.startTime),
                    durationHours: Number(booking.durationHours || 0),
                    reason: reasonLabel,
                    refundAmount: refund?.amount,
                    specialRequests: String(booking.specialRequests || "").trim()
                });
            }
        } catch (emailError) {
            console.error("[carereceiver-dashboard] booking cancellation confirmation email failed:", emailError);
        }

        try {
            if (isValidEmail(booking.caregiverEmail)) {
                await sendBookingCancellationNotificationEmail(booking.caregiverEmail, {
                    bookingRef,
                    careReceiverName,
                    bookingDate: normalizeSqlDate(booking.bookingDate),
                    startTime: normalizeSqlTime(booking.startTime),
                    durationHours: Number(booking.durationHours || 0),
                    reason: reasonLabel,
                    specialRequests: String(booking.specialRequests || "").trim()
                });
            }
        } catch (emailError) {
            console.error("[carereceiver-dashboard] booking cancellation notification email failed:", emailError);
        }

        try {
            const resolvedConversationId = await ensureConversationForBooking({
                bookingId,
                conversationId: booking.conversationId,
                careReceiverId: booking.careReceiverId || viewerId,
                caregiverId: booking.caregiverId,
                caregiverName: booking.caregiverName,
                caregiverPhotoUrl: booking.caregiverPhotoUrl,
                caregiverPhone: booking.caregiverPhone
            });
            await appendSystemConversationMessage(
                resolvedConversationId,
                buildBookingCancellationSystemMessage({
                    bookingRef,
                    bookingDate: normalizeSqlDate(booking.bookingDate),
                    startTime: normalizeSqlTime(booking.startTime),
                    durationHours: Number(booking.durationHours || 0),
                    reasonLabel,
                    details,
                    refundAmount
                })
            );
        } catch (conversationError) {
            console.error("[carereceiver-dashboard] booking cancellation conversation sync failed:", conversationError);
        }

        return res.status(200).json({
            success: true,
            data: {
                bookingId: row.id,
                status: row.status,
                cancelledAt,
                cancelledBy: "care_receiver",
                reason,
                refund
            }
        });
    } catch {
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: "Could not cancel booking request."
            }
        });
    }
});

export default router;
