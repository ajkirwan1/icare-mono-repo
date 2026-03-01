import { Router } from "express";
import { pool } from "../db/db.js";

const router = Router();
const ALLOWED_SORTS = new Set(["startTime_asc", "completedAt_desc"]);
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
        day: "numeric"
    }).format(parsed);
}

function formatTime12(date) {
    return new Intl.DateTimeFormat("en-GB", {
        hour: "numeric",
        minute: "2-digit"
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

function calculateCancellationRefund({ status, bookingDate, startTime, paymentTotal }) {
    const total = roundMoney(paymentTotal);
    const normalizedStatus = String(status || "").toLowerCase();

    if (normalizedStatus === "requested") {
        return {
            amount: total,
            percentage: 100,
            reason: "Payment authorisation released",
            processedAt: new Date().toISOString()
        };
    }

    const date = normalizeSqlDate(bookingDate);
    const time = normalizeSqlTime(startTime);
    if (!date || !time) {
        return {
            amount: total,
            percentage: 100,
            reason: "Full refund",
            processedAt: new Date().toISOString()
        };
    }

    const startsAt = new Date(`${date}T${time}Z`);
    const diffHours = (startsAt.getTime() - Date.now()) / (60 * 60 * 1000);

    if (!Number.isFinite(diffHours)) {
        return {
            amount: total,
            percentage: 100,
            reason: "Full refund",
            processedAt: new Date().toISOString()
        };
    }

    if (diffHours >= 24) {
        return {
            amount: total,
            percentage: 100,
            reason: "Cancelled 24+ hours before start",
            processedAt: new Date().toISOString()
        };
    }

    if (diffHours >= 2) {
        return {
            amount: roundMoney(total * 0.5),
            percentage: 50,
            reason: "Cancelled less than 24 hours before start",
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
              has_review,
              created_at,
              updated_at
            ) VALUES (
              $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::text[], $12::date, $13::time, $14,
              'requested', $15, $16, $17::text[], $18, $19, $20, $21, $22, $23, $24, $25, $26, $27,
              $28, $29, $30, $31, $32::jsonb, FALSE, NOW(), NOW()
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
                total,
                emergencyName,
                emergencyPhone,
                emergencyRelationship,
                requestedAt.toISOString(),
                JSON.stringify(timelineJson)
            ]
        );

        const firstName = caregiver.name.split(" ")[0] || caregiver.name;
        const lastInitial = (caregiver.name.split(" ")[1] || "").slice(0, 1);

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
              COALESCE(to_jsonb(b)->>'caregiver_id', '') AS "caregiverId",
              b.caregiver_name AS "caregiverName",
              b.caregiver_photo_url AS "caregiverPhotoUrl",
              to_char(b.booking_date, 'YYYY-MM-DD') AS "bookingDate",
              to_char(b.start_time, 'HH12:MI AM') AS "startTime",
              b.duration_hours AS "durationHours",
              b.response_deadline AS "responseDeadline",
              b.conversation_id AS "conversationId",
              b.completed_at AS "completedAt",
              b.updated_at AS "updatedAt",
              b.created_at AS "createdAt",
              b.has_review AS "hasReview",
              COALESCE(to_jsonb(b)->>'booking_ref', upper(b.id)) AS "bookingRef",
              b.service_type AS "serviceType",
              b.service_types AS "serviceTypes",
              b.payment_hourly_rate AS "hourlyRate",
              b.payment_total AS "paymentTotal"
            FROM carereceiver_dashboard_bookings b
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
    } catch {
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
              SELECT *
              FROM carereceiver_dashboard_bookings
              WHERE id = $1
                AND (care_receiver_id IS NULL OR care_receiver_id = $2)
              LIMIT 1
            `
            : `
              SELECT *
              FROM carereceiver_dashboard_bookings
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

        const bookingDate = row.booking_date ? new Date(row.booking_date).toISOString().slice(0, 10) : "";
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
                    cancelledDate: row.cancelled_date || null,
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
                booking_date AS "bookingDate",
                start_time AS "startTime",
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
                booking_date AS "bookingDate",
                start_time AS "startTime",
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

        const cancellationNote = details ? `${reason}: ${details}` : reason;
        const query = viewerId
            ? `
              UPDATE carereceiver_dashboard_bookings
              SET
                status = 'cancelled',
                cancelled_date = CURRENT_DATE,
                decline_reason = $3,
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
                updated_at = NOW()
              WHERE id = $1
              RETURNING id, status, updated_at AS "updatedAt"
            `;
        const params = viewerId ? [bookingId, viewerId, cancellationNote] : [bookingId, cancellationNote];

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

        const refund = calculateCancellationRefund({
            status: currentStatus,
            bookingDate: booking.bookingDate,
            startTime: booking.startTime,
            paymentTotal: booking.paymentTotal
        });
        const cancelledAt = row.updatedAt ? new Date(row.updatedAt).toISOString() : new Date().toISOString();

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
