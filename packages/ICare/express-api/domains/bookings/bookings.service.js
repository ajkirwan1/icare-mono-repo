export const CAREGIVER_EMAIL_ALIAS_TO_ID = {
    "maxax85@gmail.com": "cg-007",
    "maxherbst1985@gmail.com": "cg-007"
};

export const CAREGIVER_DIRECTORY = {
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

export const DETAIL_STATUS_LABELS = {
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

export const CANCELLATION_REASONS = new Set(["schedule_change", "no_longer_needed", "emergency", "other"]);

export const CANCELLATION_REASON_LABELS = {
    schedule_change: "Schedule change",
    no_longer_needed: "No longer needed",
    emergency: "Emergency",
    other: "Other"
};

export function clampPercent(value, fallback = 5) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
        return fallback;
    }
    return Math.max(0, Math.min(100, Math.round(parsed * 100) / 100));
}

export function formatDateLong(isoDate) {
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

export function buildTimeRangeLabel(startTimeRaw, durationHoursRaw) {
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

export function formatTimelineItems(row) {
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

export function resolveCaregiverProfile(caregiverId) {
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

export function roundMoney(value) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) {
        return 0;
    }
    return Math.round(numeric * 100) / 100;
}

export function isValidEmergencyPhone(value) {
    const normalized = String(value || "").replace(/[^\d+]/g, "");
    return /^\+[1-9]\d{7,14}$/.test(normalized) || /^0\d{9,10}$/.test(normalized);
}

export function normalizeBookingDate(value) {
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

export function normalizeStartTime(value) {
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

export function buildUtcDateTime(bookingDate, startTime) {
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

export function normalizeSqlDate(value) {
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

export function normalizeSqlTime(value) {
    const raw = String(value || "").trim();
    const hhmmss = raw.match(/^([01]?\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/);
    if (!hhmmss) {
        return "";
    }

    return `${String(hhmmss[1]).padStart(2, "0")}:${String(hhmmss[2]).padStart(2, "0")}:${String(hhmmss[3] || "00").padStart(2, "0")}`;
}

export function calculateCancellationRefund({
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

export function normalizeServiceTypes(rawServiceTypes, rawServiceType) {
    const arrayValue = Array.isArray(rawServiceTypes)
        ? rawServiceTypes
        : [rawServiceTypes || rawServiceType || "Companionship"];

    const normalized = arrayValue
        .map((entry) => String(entry || "").trim())
        .filter(Boolean)
        .slice(0, 6);

    return normalized.length > 0 ? normalized : ["Companionship"];
}
