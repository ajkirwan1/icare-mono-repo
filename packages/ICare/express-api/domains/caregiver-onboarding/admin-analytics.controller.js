/* global console */
import { pool } from "../../db/db.js";
import { UUID_RE } from "../../utils/identity.js";
import { parseLimitParam, parseDaysParam } from "../../utils/pagination.js";
import {
    clampPercent,
    readAdminSystemSettings
} from "../admin/system-settings/system-settings.repository.js";
import {
    verificationDecisionSchema,
    getPlatformFeePercent,
    asPounds,
    asInteger,
    asHours,
    asPercent,
    mapQueueItem,
    mapSummaryPayload
} from "./onboarding.service.js";
import {
    isMissingSchemaError,
    querySafe
} from "./onboarding.repository.js";

export async function listVerifications(req, res) {
    try {


        const requestedType = String(req.query.type || "").trim().toLowerCase();
        const requestedStatus = String(req.query.status || "").trim().toLowerCase();
        const limit = parseLimitParam(req.query.limit, 50, 200);

        const type = ["identity", "right_to_work", "dbs"].includes(requestedType) ? requestedType : "";
        const status = ["pending", "approved", "rejected"].includes(requestedStatus) ? requestedStatus : "pending";

        const rows = await pool.query(
            `
            SELECT
              q.id,
              q.caregiver_key,
              q.caregiver_id,
              q.caregiver_email,
              q.caregiver_name,
              q.verification_type,
              q.status,
              q.payload,
              q.source_status,
              q.submitted_at,
              q.reviewed_at,
              q.reviewed_by,
              q.review_notes,
              q.created_at,
              q.updated_at
            FROM admin_verification_queue q
            WHERE ($1::text = '' OR q.verification_type = $1)
              AND ($2::text = '' OR q.status = $2)
            ORDER BY q.submitted_at DESC
            LIMIT $3
            `,
            [type, status, limit]
        );

        return res.json({
            data: {
                items: rows.rows.map((row) => mapQueueItem(row)),
                filters: {
                    type: type || null,
                    status
                }
            }
        });
    } catch (error) {
        console.error("[caregiver-onboarding] GET admin verifications failed:", error);
        return res.status(500).json({
            error: {
                code: "admin_verification_queue_fetch_failed",
                message: "Could not load verification queue."
            }
        });
    }
}

export async function getVerificationDetail(req, res) {
    try {



        const verificationId = asInteger(req.params.verificationId);
        if (!verificationId || verificationId < 1) {
            return res.status(400).json({
                error: {
                    code: "invalid_verification_id",
                    message: "verificationId must be a positive integer."
                }
            });
        }

        const verification = await pool.query(
            `
            SELECT
              q.id,
              q.caregiver_key,
              q.caregiver_id,
              q.caregiver_email,
              q.caregiver_name,
              q.verification_type,
              q.status,
              q.payload,
              q.source_status,
              q.submitted_at,
              q.reviewed_at,
              q.reviewed_by,
              q.review_notes,
              q.created_at,
              q.updated_at
            FROM admin_verification_queue q
            WHERE q.id = $1
            LIMIT 1
            `,
            [verificationId]
        );

        const row = verification.rows?.[0];
        if (!row) {
            return res.status(404).json({
                error: {
                    code: "verification_not_found",
                    message: "Verification item was not found."
                }
            });
        }

        const onboarding = await querySafe(
            `
            SELECT
              caregiver_key,
              caregiver_id,
              caregiver_email,
              identity_status,
              identity_document_type,
              identity_file_name,
              identity_file_size,
              identity_submitted_at,
              right_to_work_status,
              right_to_work_method,
              right_to_work_file_name,
              right_to_work_file_size,
              right_to_work_submitted_at,
              dbs_status,
              dbs_certificate_number,
              dbs_issue_date,
              dbs_file_name,
              dbs_file_size,
              dbs_submitted_at,
              payout_status,
              stripe_account_id,
              payouts_enabled,
              charges_enabled,
              created_at,
              updated_at
            FROM caregiver_onboarding_status
            WHERE caregiver_key = $1
            LIMIT 1
            `,
            [row.caregiver_key]
        );

        return res.json({
            data: {
                item: mapQueueItem(row),
                onboarding: mapSummaryPayload(onboarding.rows?.[0] || null)
            }
        });
    } catch (error) {
        console.error("[caregiver-onboarding] GET admin verification detail failed:", error);
        return res.status(500).json({
            error: {
                code: "admin_verification_detail_fetch_failed",
                message: "Could not load verification details."
            }
        });
    }
}

export async function updateVerificationStatus(req, res) {
    try {



        const verificationId = asInteger(req.params.verificationId);
        if (!verificationId || verificationId < 1) {
            return res.status(400).json({
                error: {
                    code: "invalid_verification_id",
                    message: "verificationId must be a positive integer."
                }
            });
        }

        const parsed = verificationDecisionSchema.safeParse(req.body || {});
        if (!parsed.success) {
            return res.status(400).json({
                error: {
                    code: "invalid_payload",
                    message: "Verification decision payload is invalid.",
                    details: parsed.error.flatten()
                }
            });
        }

        const current = await pool.query(
            `
            SELECT id, caregiver_key, verification_type, status
            FROM admin_verification_queue
            WHERE id = $1
            LIMIT 1
            `,
            [verificationId]
        );

        const currentRow = current.rows?.[0];
        if (!currentRow) {
            return res.status(404).json({
                error: {
                    code: "verification_not_found",
                    message: "Verification item was not found."
                }
            });
        }

        const payload = parsed.data;
        const fallbackReviewer = String(req.get("x-user-email") || req.get("x-user-id") || "").trim();
        const reviewedBy = String(payload.reviewedBy || fallbackReviewer || "admin").trim();
        const reviewNotes = String(payload.reviewNotes || "").trim();

        await pool.query(
            `
            DELETE FROM admin_verification_queue
            WHERE caregiver_key = $1
              AND verification_type = $2
              AND status = $3
              AND id <> $4
            `,
            [
                String(currentRow.caregiver_key || ""),
                String(currentRow.verification_type || ""),
                String(payload.status || ""),
                verificationId
            ]
        );

        const updated = await pool.query(
            `
            UPDATE admin_verification_queue
            SET
              status = $2,
              reviewed_at = NOW(),
              reviewed_by = $3,
              review_notes = $4,
              updated_at = NOW()
            WHERE id = $1
            RETURNING *
            `,
            [verificationId, payload.status, reviewedBy, reviewNotes]
        );

        const type = String(currentRow.verification_type || "").trim().toLowerCase();
        const onboardingStatus = payload.status === "approved" ? "verified" : "rejected";
        if (type === "identity" || type === "right_to_work" || type === "dbs") {
            const columnName = (
                type === "identity"
                    ? "identity_status"
                    : type === "right_to_work"
                        ? "right_to_work_status"
                        : "dbs_status"
            );

            await pool.query(
                `
                UPDATE caregiver_onboarding_status
                SET ${columnName} = $2, updated_at = NOW()
                WHERE caregiver_key = $1
                `,
                [String(currentRow.caregiver_key || ""), onboardingStatus]
            );
        }

        return res.json({
            data: {
                item: mapQueueItem(updated.rows?.[0] || null),
                changed: String(currentRow.status || "") !== String(payload.status || "")
            }
        });
    } catch (error) {
        console.error("[caregiver-onboarding] PATCH admin verification status failed:", error);
        return res.status(500).json({
            error: {
                code: "admin_verification_status_update_failed",
                message: "Could not update verification status."
            }
        });
    }
}

export async function getDashboardSummary(req, res) {
    try {


        const [
            queueTotals,
            queueAverage,
            recentVerifications,
            usersSummary,
            bookingsSummary
        ] = await Promise.all([
            pool.query(
                `
                SELECT
                  COUNT(*)::int AS pending_total,
                  COUNT(*) FILTER (WHERE verification_type = 'identity')::int AS pending_identity,
                  COUNT(*) FILTER (WHERE verification_type = 'right_to_work')::int AS pending_right_to_work,
                  COUNT(*) FILTER (WHERE verification_type = 'dbs')::int AS pending_dbs
                FROM admin_verification_queue
                WHERE status = 'pending'
                `
            ),
            pool.query(
                `
                SELECT COALESCE(EXTRACT(EPOCH FROM AVG(NOW() - submitted_at)) / 3600.0, 0) AS avg_wait_hours
                FROM admin_verification_queue
                WHERE status = 'pending'
                `
            ),
            pool.query(
                `
                SELECT
                  id,
                  caregiver_key,
                  caregiver_id,
                  caregiver_email,
                  caregiver_name,
                  verification_type,
                  status,
                  submitted_at
                FROM admin_verification_queue
                WHERE status = 'pending'
                ORDER BY submitted_at DESC
                LIMIT 5
                `
            ),
            pool.query(
                `
                SELECT
                  COUNT(*)::int AS total_users,
                  COUNT(*) FILTER (WHERE user_type = 'caregiver')::int AS caregivers,
                  COUNT(*) FILTER (WHERE user_type = 'care_receiver')::int AS care_receivers,
                  COUNT(*) FILTER (WHERE user_type = 'family')::int AS family_members,
                  COUNT(*) FILTER (WHERE account_status = 'active')::int AS active_users
                FROM users
                WHERE deleted_at IS NULL
                `
            ),
            pool.query(
                `
                SELECT
                  COUNT(*)::int AS total_bookings,
                  COUNT(*) FILTER (WHERE status = 'requested')::int AS requested,
                  COUNT(*) FILTER (WHERE status = 'accepted')::int AS accepted,
                  COUNT(*) FILTER (WHERE status = 'in_progress')::int AS in_progress,
                  COUNT(*) FILTER (WHERE status = 'completed')::int AS completed,
                  COUNT(*) FILTER (WHERE status = 'payment_released')::int AS payment_released,
                  COUNT(*) FILTER (WHERE status = 'cancelled')::int AS cancelled
                FROM carereceiver_dashboard_bookings
                WHERE care_receiver_id IS NOT NULL
                `
            )
        ]);

        const queueRow = queueTotals.rows?.[0] || {};
        const waitRow = queueAverage.rows?.[0] || {};
        const usersRow = usersSummary.rows?.[0] || {};
        const bookingsRow = bookingsSummary.rows?.[0] || {};

        return res.json({
            data: {
                verificationQueue: {
                    pendingTotal: asInteger(queueRow.pending_total),
                    pendingIdentity: asInteger(queueRow.pending_identity),
                    pendingRightToWork: asInteger(queueRow.pending_right_to_work),
                    pendingDbs: asInteger(queueRow.pending_dbs),
                    averageWaitHours: asHours(waitRow.avg_wait_hours)
                },
                recentVerifications: recentVerifications.rows.map((row) => ({
                    id: asInteger(row.id, null),
                    caregiverKey: String(row.caregiver_key || ""),
                    caregiverId: String(row.caregiver_id || ""),
                    caregiverEmail: String(row.caregiver_email || ""),
                    caregiverName: String(row.caregiver_name || ""),
                    verificationType: String(row.verification_type || ""),
                    status: String(row.status || ""),
                    submittedAt: row.submitted_at || null
                })),
                users: {
                    total: asInteger(usersRow.total_users),
                    active: asInteger(usersRow.active_users),
                    caregivers: asInteger(usersRow.caregivers),
                    careReceivers: asInteger(usersRow.care_receivers),
                    familyMembers: asInteger(usersRow.family_members)
                },
                bookings: {
                    total: asInteger(bookingsRow.total_bookings),
                    requested: asInteger(bookingsRow.requested),
                    accepted: asInteger(bookingsRow.accepted),
                    inProgress: asInteger(bookingsRow.in_progress),
                    completed: asInteger(bookingsRow.completed),
                    paymentReleased: asInteger(bookingsRow.payment_released),
                    cancelled: asInteger(bookingsRow.cancelled)
                }
            }
        });
    } catch (error) {
        const missingTable = isMissingSchemaError(error);
        if (missingTable) {
            return res.json({
                data: {
                    verificationQueue: {
                        pendingTotal: 0,
                        pendingIdentity: 0,
                        pendingRightToWork: 0,
                        pendingDbs: 0,
                        averageWaitHours: 0
                    },
                    recentVerifications: [],
                    users: {
                        total: 0,
                        active: 0,
                        caregivers: 0,
                        careReceivers: 0,
                        familyMembers: 0
                    },
                    bookings: {
                        total: 0,
                        requested: 0,
                        accepted: 0,
                        inProgress: 0,
                        completed: 0,
                        paymentReleased: 0,
                        cancelled: 0
                    }
                }
            });
        }

        console.error("[caregiver-onboarding] GET admin dashboard summary failed:", error);
        return res.status(500).json({
            error: {
                code: "admin_dashboard_summary_fetch_failed",
                message: "Could not load admin dashboard summary."
            }
        });
    }
}

export async function listUsers(req, res) {
    try {
        const queryText = String(req.query.q || "").trim().toLowerCase();
        const roleFilter = String(req.query.role || "").trim().toLowerCase();
        const statusFilter = String(req.query.status || "").trim().toLowerCase();
        const limit = parseLimitParam(req.query.limit, 100, 500);

        const role = ["caregiver", "care_receiver", "family", "admin"].includes(roleFilter) ? roleFilter : "";
        const accountStatus = ["active", "suspended", "banned", "deactivated"].includes(statusFilter) ? statusFilter : "";

        const rows = await pool.query(
            `
            SELECT
              id,
              email,
              user_type,
              first_name,
              last_name,
              account_status,
              email_verified,
              phone_verified,
              created_at,
              last_login_at
            FROM users
            WHERE deleted_at IS NULL
              AND ($1::text = '' OR user_type = $1)
              AND ($2::text = '' OR account_status = $2)
              AND (
                $3::text = '' OR
                lower(email) LIKE '%' || $3 || '%' OR
                lower(concat_ws(' ', first_name, last_name)) LIKE '%' || $3 || '%'
              )
            ORDER BY created_at DESC
            LIMIT $4
            `,
            [role, accountStatus, queryText, limit]
        );

        return res.json({
            data: {
                items: rows.rows.map((row) => ({
                    id: String(row.id || ""),
                    email: String(row.email || ""),
                    userType: String(row.user_type || ""),
                    firstName: String(row.first_name || ""),
                    lastName: String(row.last_name || ""),
                    accountStatus: String(row.account_status || "active"),
                    emailVerified: Boolean(row.email_verified),
                    phoneVerified: Boolean(row.phone_verified),
                    createdAt: row.created_at || null,
                    lastLoginAt: row.last_login_at || null
                })),
                filters: {
                    q: queryText || null,
                    role: role || null,
                    status: accountStatus || null
                }
            }
        });
    } catch (error) {
        const missingTable = isMissingSchemaError(error);
        if (missingTable) {
            return res.json({
                data: {
                    items: [],
                    filters: {
                        q: null,
                        role: null,
                        status: null
                    }
                }
            });
        }

        console.error("[caregiver-onboarding] GET admin users failed:", error);
        return res.status(500).json({
            error: {
                code: "admin_users_fetch_failed",
                message: "Could not load admin users."
            }
        });
    }
}

export async function listBookings(req, res) {
    try {
        const statusFilter = String(req.query.status || "").trim().toLowerCase();
        const limit = parseLimitParam(req.query.limit, 100, 500);
        const status = ["requested", "accepted", "in_progress", "completed", "payment_released", "cancelled"].includes(statusFilter)
            ? statusFilter
            : "";

        const rows = await pool.query(
            `
            SELECT
              id,
              booking_ref,
              care_receiver_id,
              caregiver_id,
              caregiver_name,
              caregiver_email,
              service_type,
              booking_date,
              start_time,
              status,
              payment_total,
              requested_at,
              created_at
            FROM carereceiver_dashboard_bookings
            WHERE care_receiver_id IS NOT NULL
              AND ($1::text = '' OR status = $1)
            ORDER BY COALESCE(requested_at, created_at) DESC
            LIMIT $2
            `,
            [status, limit]
        );

        return res.json({
            data: {
                items: rows.rows.map((row) => ({
                    id: String(row.id || ""),
                    bookingRef: String(row.booking_ref || ""),
                    careReceiverId: String(row.care_receiver_id || ""),
                    caregiverId: String(row.caregiver_id || ""),
                    caregiverName: String(row.caregiver_name || ""),
                    caregiverEmail: String(row.caregiver_email || ""),
                    serviceType: String(row.service_type || ""),
                    bookingDate: row.booking_date || null,
                    startTime: row.start_time || null,
                    status: String(row.status || ""),
                    paymentTotal: asPounds(row.payment_total),
                    requestedAt: row.requested_at || null,
                    createdAt: row.created_at || null
                })),
                filters: {
                    status: status || null
                }
            }
        });
    } catch (error) {
        const missingTable = isMissingSchemaError(error);
        if (missingTable) {
            return res.json({
                data: {
                    items: [],
                    filters: {
                        status: null
                    }
                }
            });
        }

        console.error("[caregiver-onboarding] GET admin bookings failed:", error);
        return res.status(500).json({
            error: {
                code: "admin_bookings_fetch_failed",
                message: "Could not load admin bookings."
            }
        });
    }
}

export async function getUserDetail(req, res) {
    try {
        const userId = String(req.params.userId || "").trim();
        if (!UUID_RE.test(userId)) {
            return res.status(400).json({
                error: {
                    code: "invalid_user_id",
                    message: "userId must be a valid UUID."
                }
            });
        }

        const userRows = await pool.query(
            `
            SELECT
              id,
              email,
              user_type,
              first_name,
              last_name,
              account_status,
              email_verified,
              phone_verified,
              created_at,
              updated_at,
              last_login_at
            FROM users
            WHERE id = $1
              AND deleted_at IS NULL
            LIMIT 1
            `,
            [userId]
        );

        const userRow = userRows.rows?.[0];
        if (!userRow) {
            return res.status(404).json({
                error: {
                    code: "admin_user_not_found",
                    message: "User was not found."
                }
            });
        }

        const userEmail = String(userRow.email || "").trim().toLowerCase();

        const [bookingStats, recentBookings, conversationStats, givenReviews, receivedReviews, onboardingRows, verificationRows] = await Promise.all([
            querySafe(
                `
                SELECT
                  COUNT(*)::int AS total,
                  COUNT(*) FILTER (WHERE status = 'requested')::int AS requested,
                  COUNT(*) FILTER (WHERE status = 'accepted')::int AS accepted,
                  COUNT(*) FILTER (WHERE status = 'in_progress')::int AS in_progress,
                  COUNT(*) FILTER (WHERE status = 'completed')::int AS completed,
                  COUNT(*) FILTER (WHERE status = 'payment_released')::int AS payment_released,
                  COUNT(*) FILTER (WHERE status = 'cancelled')::int AS cancelled,
                  MAX(COALESCE(NULLIF(to_jsonb(b)->>'requested_at', '')::timestamp, b.created_at)) AS last_activity_at
                FROM carereceiver_dashboard_bookings b
                WHERE COALESCE(b.care_receiver_id::text, '') = $1
                  OR COALESCE(to_jsonb(b)->>'caregiver_id', '') = $1
                  OR lower(COALESCE(b.caregiver_email, '')) = $2
                `,
                [userId, userEmail]
            ),
            querySafe(
                `
                SELECT
                  id,
                  COALESCE(to_jsonb(b)->>'booking_ref', upper(id)) AS booking_ref,
                  COALESCE(to_jsonb(b)->>'caregiver_id', '') AS caregiver_id,
                  caregiver_name,
                  caregiver_email,
                  service_type,
                  booking_date,
                  start_time,
                  status,
                  CASE
                    WHEN NULLIF(to_jsonb(b)->>'payment_total', '') ~ '^-?[0-9]+(\\.[0-9]+)?$'
                      THEN (to_jsonb(b)->>'payment_total')::numeric
                    ELSE 0
                  END AS payment_total,
                  COALESCE(NULLIF(to_jsonb(b)->>'requested_at', '')::timestamp, b.created_at) AS activity_at
                FROM carereceiver_dashboard_bookings b
                WHERE COALESCE(b.care_receiver_id::text, '') = $1
                  OR COALESCE(to_jsonb(b)->>'caregiver_id', '') = $1
                  OR lower(COALESCE(b.caregiver_email, '')) = $2
                ORDER BY activity_at DESC
                LIMIT 10
                `,
                [userId, userEmail]
            ),
            querySafe(
                `
                SELECT
                  COUNT(*)::int AS total,
                  MAX(last_message_at) AS last_message_at
                FROM carereceiver_conversations c
                WHERE COALESCE(c.care_receiver_id::text, '') = $1
                  OR COALESCE(c.caregiver_id, '') = $1
                `,
                [userId]
            ),
            querySafe(
                `
                SELECT
                  COUNT(*)::int AS total,
                  AVG(rating) AS avg_rating
                FROM carereceiver_booking_reviews
                WHERE COALESCE(care_receiver_id::text, '') = $1
                `,
                [userId]
            ),
            querySafe(
                `
                SELECT
                  COUNT(*)::int AS total,
                  AVG(r.rating) AS avg_rating
                FROM carereceiver_booking_reviews r
                INNER JOIN carereceiver_dashboard_bookings b ON b.id = r.booking_id
                WHERE COALESCE(to_jsonb(b)->>'caregiver_id', '') = $1
                  OR lower(COALESCE(b.caregiver_email, '')) = $2
                `,
                [userId, userEmail]
            ),
            querySafe(
                `
                SELECT
                  caregiver_key,
                  caregiver_id,
                  caregiver_email,
                  identity_status,
                  identity_document_type,
                  identity_file_name,
                  identity_file_size,
                  identity_submitted_at,
                  right_to_work_status,
                  right_to_work_method,
                  right_to_work_file_name,
                  right_to_work_file_size,
                  right_to_work_submitted_at,
                  dbs_status,
                  dbs_certificate_number,
                  dbs_issue_date,
                  dbs_file_name,
                  dbs_file_size,
                  dbs_submitted_at,
                  payout_status,
                  stripe_account_id,
                  payouts_enabled,
                  charges_enabled,
                  created_at,
                  updated_at
                FROM caregiver_onboarding_status
                WHERE caregiver_id = $1
                  OR lower(caregiver_email) = $2
                ORDER BY updated_at DESC
                LIMIT 1
                `,
                [userId, userEmail]
            ),
            querySafe(
                `
                SELECT
                  q.id,
                  q.caregiver_key,
                  q.caregiver_id,
                  q.caregiver_email,
                  q.caregiver_name,
                  q.verification_type,
                  q.status,
                  q.payload,
                  q.source_status,
                  q.submitted_at,
                  q.reviewed_at,
                  q.reviewed_by,
                  q.review_notes,
                  q.created_at,
                  q.updated_at
                FROM admin_verification_queue q
                WHERE q.caregiver_id = $1
                  OR lower(COALESCE(q.caregiver_email, '')) = $2
                ORDER BY q.submitted_at DESC
                LIMIT 10
                `,
                [userId, userEmail]
            )
        ]);

        const bookingRow = bookingStats.rows?.[0] || {};
        const conversationRow = conversationStats.rows?.[0] || {};
        const givenReviewRow = givenReviews.rows?.[0] || {};
        const receivedReviewRow = receivedReviews.rows?.[0] || {};

        return res.json({
            data: {
                user: {
                    id: String(userRow.id || ""),
                    email: String(userRow.email || ""),
                    userType: String(userRow.user_type || ""),
                    firstName: String(userRow.first_name || ""),
                    lastName: String(userRow.last_name || ""),
                    accountStatus: String(userRow.account_status || "active"),
                    emailVerified: Boolean(userRow.email_verified),
                    phoneVerified: Boolean(userRow.phone_verified),
                    createdAt: userRow.created_at || null,
                    updatedAt: userRow.updated_at || null,
                    lastLoginAt: userRow.last_login_at || null
                },
                activity: {
                    bookings: {
                        total: asInteger(bookingRow.total),
                        requested: asInteger(bookingRow.requested),
                        accepted: asInteger(bookingRow.accepted),
                        inProgress: asInteger(bookingRow.in_progress),
                        completed: asInteger(bookingRow.completed),
                        paymentReleased: asInteger(bookingRow.payment_released),
                        cancelled: asInteger(bookingRow.cancelled),
                        lastActivityAt: bookingRow.last_activity_at || null
                    },
                    conversations: {
                        total: asInteger(conversationRow.total),
                        lastMessageAt: conversationRow.last_message_at || null
                    },
                    reviews: {
                        givenCount: asInteger(givenReviewRow.total),
                        givenAverageRating: Number(givenReviewRow.avg_rating || 0),
                        receivedCount: asInteger(receivedReviewRow.total),
                        receivedAverageRating: Number(receivedReviewRow.avg_rating || 0)
                    }
                },
                onboarding: mapSummaryPayload(onboardingRows.rows?.[0] || null),
                recentBookings: recentBookings.rows.map((row) => ({
                    id: String(row.id || ""),
                    bookingRef: String(row.booking_ref || ""),
                    caregiverId: String(row.caregiver_id || ""),
                    caregiverName: String(row.caregiver_name || ""),
                    caregiverEmail: String(row.caregiver_email || ""),
                    serviceType: String(row.service_type || ""),
                    bookingDate: row.booking_date || null,
                    startTime: row.start_time || null,
                    status: String(row.status || ""),
                    paymentTotal: asPounds(row.payment_total),
                    activityAt: row.activity_at || null
                })),
                verificationHistory: verificationRows.rows.map((row) => mapQueueItem(row))
            }
        });
    } catch (error) {
        const missingTable = isMissingSchemaError(error);
        if (missingTable) {
            return res.status(404).json({
                error: {
                    code: "admin_user_not_found",
                    message: "User data is not available yet."
                }
            });
        }

        console.error("[caregiver-onboarding] GET admin user detail failed:", error);
        return res.status(500).json({
            error: {
                code: "admin_user_detail_fetch_failed",
                message: "Could not load admin user detail."
            }
        });
    }
}

export async function getAnalytics(req, res) {
    try {
        const days = parseDaysParam(req.query.days, 30, 365);
        const systemSettings = await readAdminSystemSettings();
        const platformFeePercent = clampPercent(systemSettings?.payments?.platformFeePercent, getPlatformFeePercent());

        const [usersSummary, bookingsSummary, reviewsSummary, verificationSummary, onboardingSummary] = await Promise.all([
            querySafe(
                `
                SELECT
                  COUNT(*)::int AS total_users,
                  COUNT(*) FILTER (WHERE account_status = 'active')::int AS active_users,
                  COUNT(*) FILTER (WHERE user_type = 'caregiver')::int AS caregivers,
                  COUNT(*) FILTER (WHERE user_type = 'care_receiver')::int AS care_receivers,
                  COUNT(*) FILTER (WHERE user_type = 'family')::int AS family_members,
                  COUNT(*) FILTER (
                    WHERE created_at >= NOW() - make_interval(days => $1)
                  )::int AS new_users_current,
                  COUNT(*) FILTER (
                    WHERE created_at >= NOW() - make_interval(days => ($1 * 2))
                      AND created_at < NOW() - make_interval(days => $1)
                  )::int AS new_users_previous
                FROM users
                WHERE deleted_at IS NULL
                `,
                [days]
            ),
            querySafe(
                `
                SELECT
                  COUNT(*) FILTER (
                    WHERE COALESCE(NULLIF(to_jsonb(b)->>'requested_at', '')::timestamp, b.created_at)
                      >= NOW() - make_interval(days => $1)
                  )::int AS bookings_current,
                  COUNT(*) FILTER (
                    WHERE COALESCE(NULLIF(to_jsonb(b)->>'requested_at', '')::timestamp, b.created_at)
                      >= NOW() - make_interval(days => ($1 * 2))
                      AND COALESCE(NULLIF(to_jsonb(b)->>'requested_at', '')::timestamp, b.created_at)
                        < NOW() - make_interval(days => $1)
                  )::int AS bookings_previous,
                  COUNT(*) FILTER (WHERE status = 'requested')::int AS requested,
                  COUNT(*) FILTER (WHERE status = 'accepted')::int AS accepted,
                  COUNT(*) FILTER (WHERE status = 'in_progress')::int AS in_progress,
                  COUNT(*) FILTER (WHERE status = 'completed')::int AS completed,
                  COUNT(*) FILTER (WHERE status = 'payment_released')::int AS payment_released,
                  COUNT(*) FILTER (WHERE status = 'cancelled')::int AS cancelled,
                  COALESCE(SUM(
                    CASE
                      WHEN status IN ('completed', 'payment_released')
                        AND NULLIF(to_jsonb(b)->>'payment_total', '') ~ '^-?[0-9]+(\\.[0-9]+)?$'
                        THEN (to_jsonb(b)->>'payment_total')::numeric
                      ELSE 0
                    END
                  ), 0) AS gmv_total,
                  COALESCE(SUM(
                    CASE
                      WHEN COALESCE(NULLIF(to_jsonb(b)->>'requested_at', '')::timestamp, b.created_at) >= NOW() - make_interval(days => $1)
                        AND status IN ('completed', 'payment_released')
                        AND NULLIF(to_jsonb(b)->>'payment_total', '') ~ '^-?[0-9]+(\\.[0-9]+)?$'
                        THEN (to_jsonb(b)->>'payment_total')::numeric
                      ELSE 0
                    END
                  ), 0) AS gmv_current,
                  COALESCE(AVG(
                    CASE
                      WHEN NULLIF(to_jsonb(b)->>'payment_total', '') ~ '^-?[0-9]+(\\.[0-9]+)?$'
                        THEN (to_jsonb(b)->>'payment_total')::numeric
                      ELSE NULL
                    END
                  ), 0) AS avg_booking_value
                FROM carereceiver_dashboard_bookings b
                WHERE b.care_receiver_id IS NOT NULL
                `,
                [days]
            ),
            querySafe(
                `
                SELECT
                  COUNT(*)::int AS total_reviews,
                  AVG(rating) AS avg_rating,
                  COUNT(*) FILTER (WHERE rating <= 2)::int AS low_ratings
                FROM carereceiver_booking_reviews
                `,
                []
            ),
            querySafe(
                `
                SELECT
                  COUNT(*) FILTER (WHERE status = 'pending')::int AS pending,
                  COUNT(*) FILTER (WHERE status = 'approved')::int AS approved,
                  COUNT(*) FILTER (WHERE status = 'rejected')::int AS rejected,
                  COUNT(*) FILTER (
                    WHERE submitted_at >= NOW() - make_interval(days => $1)
                  )::int AS submitted_current
                FROM admin_verification_queue
                `,
                [days]
            ),
            querySafe(
                `
                SELECT
                  COUNT(*)::int AS onboarding_total,
                  COUNT(*) FILTER (
                    WHERE identity_status = 'verified'
                      AND right_to_work_status = 'verified'
                  )::int AS onboarding_ready,
                  COUNT(*) FILTER (WHERE dbs_status = 'verified')::int AS dbs_verified
                FROM caregiver_onboarding_status
                `,
                []
            )
        ]);

        const usersRow = usersSummary.rows?.[0] || {};
        const bookingsRow = bookingsSummary.rows?.[0] || {};
        const reviewsRow = reviewsSummary.rows?.[0] || {};
        const verificationRow = verificationSummary.rows?.[0] || {};
        const onboardingRow = onboardingSummary.rows?.[0] || {};

        const newUsersCurrent = asInteger(usersRow.new_users_current);
        const newUsersPrevious = asInteger(usersRow.new_users_previous);
        const usersGrowthPct = newUsersPrevious > 0
            ? ((newUsersCurrent - newUsersPrevious) / newUsersPrevious) * 100
            : (newUsersCurrent > 0 ? 100 : 0);

        const bookingsCurrent = asInteger(bookingsRow.bookings_current);
        const bookingsPrevious = asInteger(bookingsRow.bookings_previous);
        const bookingsGrowthPct = bookingsPrevious > 0
            ? ((bookingsCurrent - bookingsPrevious) / bookingsPrevious) * 100
            : (bookingsCurrent > 0 ? 100 : 0);

        const onboardingTotal = asInteger(onboardingRow.onboarding_total);
        const onboardingReady = asInteger(onboardingRow.onboarding_ready);
        const onboardingCompletionRate = onboardingTotal > 0
            ? (onboardingReady / onboardingTotal) * 100
            : 0;

        return res.json({
            data: {
                windowDays: days,
                users: {
                    total: asInteger(usersRow.total_users),
                    active: asInteger(usersRow.active_users),
                    caregivers: asInteger(usersRow.caregivers),
                    careReceivers: asInteger(usersRow.care_receivers),
                    familyMembers: asInteger(usersRow.family_members),
                    newCurrent: newUsersCurrent,
                    newPrevious: newUsersPrevious,
                    growthPct: asPercent(usersGrowthPct)
                },
                bookings: {
                    current: bookingsCurrent,
                    previous: bookingsPrevious,
                    growthPct: asPercent(bookingsGrowthPct),
                    requested: asInteger(bookingsRow.requested),
                    accepted: asInteger(bookingsRow.accepted),
                    inProgress: asInteger(bookingsRow.in_progress),
                    completed: asInteger(bookingsRow.completed),
                    paymentReleased: asInteger(bookingsRow.payment_released),
                    cancelled: asInteger(bookingsRow.cancelled),
                    averageValue: asPounds(bookingsRow.avg_booking_value),
                    gmvCurrent: asPounds(bookingsRow.gmv_current),
                    gmvTotal: asPounds(bookingsRow.gmv_total),
                    platformFeesCurrent: asPounds((Number(bookingsRow.gmv_current || 0) * platformFeePercent) / 100),
                    serviceFeePercent: clampPercent(systemSettings?.payments?.bookingServiceFeePercent, 5)
                },
                reviews: {
                    total: asInteger(reviewsRow.total_reviews),
                    averageRating: Number(Number(reviewsRow.avg_rating || 0).toFixed(2)),
                    lowRatings: asInteger(reviewsRow.low_ratings)
                },
                verificationQueue: {
                    pending: asInteger(verificationRow.pending),
                    approved: asInteger(verificationRow.approved),
                    rejected: asInteger(verificationRow.rejected),
                    submittedCurrent: asInteger(verificationRow.submitted_current)
                },
                onboarding: {
                    total: onboardingTotal,
                    readyForActivation: onboardingReady,
                    dbsVerified: asInteger(onboardingRow.dbs_verified),
                    completionRatePct: asPercent(onboardingCompletionRate)
                }
            }
        });
    } catch (error) {
        console.error("[caregiver-onboarding] GET admin analytics failed:", error);
        return res.status(500).json({
            error: {
                code: "admin_analytics_fetch_failed",
                message: "Could not load admin analytics."
            }
        });
    }
}

export async function getReportedIssues(req, res) {
    try {
        const severityFilter = String(req.query.severity || "").trim().toLowerCase();
        const sourceFilter = String(req.query.source || "").trim().toLowerCase();
        const limit = parseLimitParam(req.query.limit, 50, 200);
        const severity = ["critical", "high", "medium", "low"].includes(severityFilter) ? severityFilter : "";
        const source = ["moderation_event", "flagged_message", "low_rating"].includes(sourceFilter) ? sourceFilter : "";

        const [moderationEvents, flaggedMessages, lowRatings] = await Promise.all([
            querySafe(
                `
                SELECT
                  e.id::text AS source_id,
                  e.conversation_id,
                  e.rule_triggered,
                  e.created_at,
                  COALESCE(c.caregiver_name, '') AS caregiver_name,
                  COALESCE(c.booking_id, '') AS booking_id
                FROM conversation_moderation_events e
                LEFT JOIN carereceiver_conversations c ON c.id = e.conversation_id
                ORDER BY e.created_at DESC
                LIMIT $1
                `,
                [limit]
            ),
            querySafe(
                `
                SELECT
                  m.id::text AS source_id,
                  m.conversation_id,
                  m.message_text,
                  m.sent_at,
                  COALESCE(c.caregiver_name, '') AS caregiver_name,
                  COALESCE(c.booking_id, '') AS booking_id
                FROM carereceiver_messages m
                LEFT JOIN carereceiver_conversations c ON c.id = m.conversation_id
                WHERE m.is_flagged = TRUE
                  AND m.deleted_at IS NULL
                ORDER BY m.sent_at DESC
                LIMIT $1
                `,
                [limit]
            ),
            querySafe(
                `
                SELECT
                  r.id::text AS source_id,
                  r.booking_id,
                  r.rating,
                  r.review_text,
                  r.created_at,
                  COALESCE(b.booking_ref, upper(b.id)) AS booking_ref,
                  COALESCE(b.caregiver_name, '') AS caregiver_name
                FROM carereceiver_booking_reviews r
                LEFT JOIN carereceiver_dashboard_bookings b ON b.id = r.booking_id
                WHERE r.rating <= 2
                ORDER BY r.created_at DESC
                LIMIT $1
                `,
                [limit]
            )
        ]);

        const toSeverityFromRule = (ruleTriggered) => {
            const rule = String(ruleTriggered || "").trim().toLowerCase();
            if (/harm|violence|threat|abuse|sexual/.test(rule)) {
                return "critical";
            }
            if (/payment|bank|off[_ -]?platform|contact/.test(rule)) {
                return "high";
            }
            return "medium";
        };

        const moderationItems = moderationEvents.rows.map((row) => {
            const issueSeverity = toSeverityFromRule(row.rule_triggered);
            return {
                id: `moderation-${String(row.source_id || "")}`,
                source: "moderation_event",
                severity: issueSeverity,
                status: "open",
                title: `Moderation rule triggered: ${String(row.rule_triggered || "unknown")}`,
                description: `Conversation ${String(row.conversation_id || "-")} flagged by message safety rules.`,
                conversationId: String(row.conversation_id || ""),
                bookingId: String(row.booking_id || ""),
                bookingRef: "",
                caregiverName: String(row.caregiver_name || ""),
                createdAt: row.created_at || null
            };
        });

        const flaggedItems = flaggedMessages.rows.map((row) => ({
            id: `flagged-${String(row.source_id || "")}`,
            source: "flagged_message",
            severity: "high",
            status: "open",
            title: "Flagged message requires review",
            description: String(row.message_text || "").trim().slice(0, 180),
            conversationId: String(row.conversation_id || ""),
            bookingId: String(row.booking_id || ""),
            bookingRef: "",
            caregiverName: String(row.caregiver_name || ""),
            createdAt: row.sent_at || null
        }));

        const lowRatingItems = lowRatings.rows.map((row) => ({
            id: `rating-${String(row.source_id || "")}`,
            source: "low_rating",
            severity: Number(row.rating || 0) <= 1 ? "high" : "medium",
            status: "open",
            title: `Low review rating (${Number(row.rating || 0)}/5)`,
            description: String(row.review_text || "").trim().slice(0, 180),
            conversationId: "",
            bookingId: String(row.booking_id || ""),
            bookingRef: String(row.booking_ref || ""),
            caregiverName: String(row.caregiver_name || ""),
            createdAt: row.created_at || null
        }));

        const mergedItems = [...moderationItems, ...flaggedItems, ...lowRatingItems]
            .filter((item) => (source ? item.source === source : true))
            .filter((item) => (severity ? item.severity === severity : true))
            .sort((a, b) => {
                const aTime = new Date(a.createdAt || 0).getTime();
                const bTime = new Date(b.createdAt || 0).getTime();
                return bTime - aTime;
            })
            .slice(0, limit);

        const summary = mergedItems.reduce(
            (acc, item) => {
                acc.total += 1;
                acc.bySeverity[item.severity] = (acc.bySeverity[item.severity] || 0) + 1;
                acc.bySource[item.source] = (acc.bySource[item.source] || 0) + 1;
                return acc;
            },
            {
                total: 0,
                bySeverity: { critical: 0, high: 0, medium: 0, low: 0 },
                bySource: { moderation_event: 0, flagged_message: 0, low_rating: 0 }
            }
        );

        return res.json({
            data: {
                items: mergedItems,
                summary,
                filters: {
                    severity: severity || null,
                    source: source || null
                }
            }
        });
    } catch (error) {
        console.error("[caregiver-onboarding] GET admin reported issues failed:", error);
        return res.status(500).json({
            error: {
                code: "admin_reported_issues_fetch_failed",
                message: "Could not load reported issues."
            }
        });
    }
}

export async function getAuditLog(req, res) {
    try {
        const limit = parseLimitParam(req.query.limit, 120, 500);

        const [userEvents, bookingEvents, verificationEvents, reviewEvents] = await Promise.all([
            querySafe(
                `
                SELECT
                  id,
                  email,
                  user_type,
                  account_status,
                  created_at
                FROM users
                WHERE deleted_at IS NULL
                ORDER BY created_at DESC
                LIMIT $1
                `,
                [limit]
            ),
            querySafe(
                `
                SELECT
                  id,
                  COALESCE(to_jsonb(b)->>'booking_ref', upper(id)) AS booking_ref,
                  status,
                  COALESCE(NULLIF(to_jsonb(b)->>'requested_at', '')::timestamp, b.created_at) AS activity_at
                FROM carereceiver_dashboard_bookings b
                WHERE b.care_receiver_id IS NOT NULL
                ORDER BY activity_at DESC
                LIMIT $1
                `,
                [limit]
            ),
            querySafe(
                `
                SELECT
                  id,
                  verification_type,
                  status,
                  caregiver_email,
                  caregiver_name,
                  submitted_at,
                  reviewed_at,
                  reviewed_by
                FROM admin_verification_queue
                ORDER BY COALESCE(reviewed_at, submitted_at) DESC
                LIMIT $1
                `,
                [limit]
            ),
            querySafe(
                `
                SELECT
                  r.id,
                  r.rating,
                  r.created_at,
                  COALESCE(b.booking_ref, upper(b.id)) AS booking_ref
                FROM carereceiver_booking_reviews r
                LEFT JOIN carereceiver_dashboard_bookings b ON b.id = r.booking_id
                ORDER BY r.created_at DESC
                LIMIT $1
                `,
                [limit]
            )
        ]);

        const events = [];

        for (const row of userEvents.rows) {
            events.push({
                id: `user-created-${String(row.id || "")}`,
                eventType: "user_registered",
                severity: "info",
                message: `New ${String(row.user_type || "user")} account registered (${String(row.email || "-")}).`,
                actor: "system",
                createdAt: row.created_at || null
            });
        }

        for (const row of bookingEvents.rows) {
            events.push({
                id: `booking-${String(row.id || "")}-${String(row.status || "")}`,
                eventType: "booking_activity",
                severity: "info",
                message: `Booking ${String(row.booking_ref || "").toUpperCase()} is ${String(row.status || "updated")}.`,
                actor: "system",
                createdAt: row.activity_at || null
            });
        }

        for (const row of verificationEvents.rows) {
            const caregiver = String(row.caregiver_name || row.caregiver_email || "caregiver");
            events.push({
                id: `verification-submitted-${String(row.id || "")}`,
                eventType: "verification_submitted",
                severity: "info",
                message: `${String(row.verification_type || "verification")} submitted by ${caregiver}.`,
                actor: caregiver,
                createdAt: row.submitted_at || null
            });

            if (row.reviewed_at) {
                events.push({
                    id: `verification-reviewed-${String(row.id || "")}`,
                    eventType: "verification_reviewed",
                    severity: String(row.status || "") === "approved" ? "info" : "warning",
                    message: `${String(row.verification_type || "verification")} marked as ${String(row.status || "")} by ${String(row.reviewed_by || "admin")}.`,
                    actor: String(row.reviewed_by || "admin"),
                    createdAt: row.reviewed_at || null
                });
            }
        }

        for (const row of reviewEvents.rows) {
            const rating = Number(row.rating || 0);
            events.push({
                id: `review-${String(row.id || "")}`,
                eventType: "review_submitted",
                severity: rating <= 2 ? "warning" : "info",
                message: `Review submitted for ${String(row.booking_ref || "")}: ${rating}/5.`,
                actor: "care_receiver",
                createdAt: row.created_at || null
            });
        }

        const sorted = events
            .sort((a, b) => {
                const aTime = new Date(a.createdAt || 0).getTime();
                const bTime = new Date(b.createdAt || 0).getTime();
                return bTime - aTime;
            })
            .slice(0, limit);

        return res.json({
            data: {
                items: sorted
            }
        });
    } catch (error) {
        console.error("[caregiver-onboarding] GET admin audit log failed:", error);
        return res.status(500).json({
            error: {
                code: "admin_audit_log_fetch_failed",
                message: "Could not load audit log."
            }
        });
    }
}
