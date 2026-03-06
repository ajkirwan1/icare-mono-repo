import { pool } from "../../db/db.js";
import { UUID_RE } from "../../utils/identity.js";
import {
    CAREGIVER_DIRECTORY,
    CAREGIVER_EMAIL_ALIAS_TO_ID,
    clampPercent
} from "./bookings.service.js";

const ACCEPTED_BOOKING_STATUSES = ["accepted", "in_progress", "completed", "payment_released", "reviewed"];
const MIN_REQUESTS_FOR_RESPONSE_METRICS = 5;
const MIN_ACCEPTED_FOR_RESPONSE_METRICS = 3;

export async function getDefaultBookingServiceFeePercent() {
    try {
        const settings = await pool.query(
            `
            SELECT booking_service_fee_percent
            FROM admin_system_settings
            WHERE id = 1
            LIMIT 1
            `
        );
        return clampPercent(settings.rows?.[0]?.booking_service_fee_percent, 5);
    } catch (error) {
        if (error?.code === "42P01" || error?.code === "42703") {
            return 5;
        }

        console.warn("[bookings] booking service fee settings fallback:", error?.message || error);
        return 5;
    }
}

export async function resolveViewer(req, preferredUserTypes = ["care_receiver", "family"]) {
    const headerUserId = String(req.get("x-user-id") || "").trim();
    const headerEmail = String(req.get("x-user-email") || "").trim().toLowerCase();
    const allowedTypes = Array.isArray(preferredUserTypes) && preferredUserTypes.length > 0
        ? preferredUserTypes
        : ["care_receiver", "family"];

    if (UUID_RE.test(headerUserId)) {
        const byId = await pool.query(
            `
            SELECT
              id, email, user_type, first_name, last_name,
              account_status, phone_verified, email_verified,
              gdpr_consent AS "gdprConsent",
              gdpr_consent_date AS "gdprConsentDate",
              NULLIF(to_jsonb(users)->>'terms_accepted_at', '') AS "termsAcceptedAt"
            FROM users
            WHERE id = $1
              AND user_type = ANY($2::text[])
              AND deleted_at IS NULL
            LIMIT 1
            `,
            [headerUserId, allowedTypes]
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
              account_status, phone_verified, email_verified,
              gdpr_consent AS "gdprConsent",
              gdpr_consent_date AS "gdprConsentDate",
              NULLIF(to_jsonb(users)->>'terms_accepted_at', '') AS "termsAcceptedAt"
            FROM users
            WHERE lower(email) = $1
              AND user_type = ANY($2::text[])
              AND deleted_at IS NULL
            LIMIT 1
            `,
            [headerEmail, allowedTypes]
        );
        if (byEmail.rows?.[0]) {
            return byEmail.rows[0];
        }
    }

    const fallback = await pool.query(
        `
        SELECT
          id, email, user_type, first_name, last_name,
          account_status, phone_verified, email_verified,
          gdpr_consent AS "gdprConsent",
          gdpr_consent_date AS "gdprConsentDate",
          NULLIF(to_jsonb(users)->>'terms_accepted_at', '') AS "termsAcceptedAt"
        FROM users
        WHERE user_type = ANY($1::text[]) AND deleted_at IS NULL
        ORDER BY created_at DESC
        LIMIT 1
        `,
        [allowedTypes]
    );
    return fallback.rows?.[0] || null;
}

export function buildBookingFilters({ viewerId, statusList, startDate, endDate }) {
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

export function buildCaregiverIdentityMatcher({ viewer, headerUserEmail = "", caregiverIdHint = "" } = {}, alias = "b") {
    const viewerEmail = String(viewer?.email || "").trim().toLowerCase();
    const viewerFullName = [viewer?.first_name, viewer?.last_name]
        .map((value) => String(value || "").trim())
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
    const normalizedHeaderEmail = String(headerUserEmail || "").trim().toLowerCase();
    const normalizedHint = String(caregiverIdHint || "").trim();

    const caregiverIds = new Set();
    if (viewer?.id) {
        caregiverIds.add(String(viewer.id));
    }
    if (normalizedHint) {
        caregiverIds.add(normalizedHint);
    }
    if (viewerEmail && CAREGIVER_EMAIL_ALIAS_TO_ID[viewerEmail]) {
        caregiverIds.add(CAREGIVER_EMAIL_ALIAS_TO_ID[viewerEmail]);
    }
    if (normalizedHeaderEmail && CAREGIVER_EMAIL_ALIAS_TO_ID[normalizedHeaderEmail]) {
        caregiverIds.add(CAREGIVER_EMAIL_ALIAS_TO_ID[normalizedHeaderEmail]);
    }

    for (const profile of Object.values(CAREGIVER_DIRECTORY)) {
        const profileEmail = String(profile?.email || "").trim().toLowerCase();
        const profileName = String(profile?.name || "").trim().toLowerCase();

        if (viewerEmail && profileEmail && profileEmail === viewerEmail) {
            caregiverIds.add(String(profile.id));
        }
        if (viewerFullName && profileName && profileName === viewerFullName) {
            caregiverIds.add(String(profile.id));
        }
    }

    const clauses = [];
    const params = [];

    if (caregiverIds.size > 0) {
        clauses.push(`COALESCE(to_jsonb(${alias})->>'caregiver_id', '') = ANY($${params.length + 1}::text[])`);
        params.push(Array.from(caregiverIds));
    }
    if (viewerEmail) {
        clauses.push(`lower(COALESCE(${alias}.caregiver_email, '')) = $${params.length + 1}`);
        params.push(viewerEmail);
    }
    if (viewerFullName) {
        clauses.push(`lower(COALESCE(${alias}.caregiver_name, '')) = $${params.length + 1}`);
        params.push(viewerFullName);
    }

    return {
        clauses,
        params
    };
}

export async function getCaregiverResponseMetrics(caregiverId) {
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

export async function generateBookingId(year) {
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
