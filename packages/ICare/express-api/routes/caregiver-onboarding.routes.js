/* global console, process */
import { Router } from "express";
import Stripe from "stripe";
import { z } from "zod";
import { pool } from "../db/db.js";

const router = Router();

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const ONBOARDING_STATUS_VALUES = new Set(["not_submitted", "pending_review", "verified", "rejected"]);
const CAREGIVER_EMAIL_ALIAS_TO_ID = {
    "maxax85@gmail.com": "cg-007",
    "maxherbst1985@gmail.com": "cg-007"
};

let onboardingTableReady = false;
let adminVerificationQueueTableReady = false;
let adminSystemSettingsTableReady = false;

const identitySchema = z.object({
    documentType: z.enum(["uk_passport", "driving_licence", "residence_permit", "other"]).default("uk_passport"),
    fileName: z.string().trim().min(1).max(255),
    fileSize: z.number().int().positive().max(MAX_UPLOAD_BYTES).optional()
});

const rightToWorkSchema = z.object({
    method: z.enum(["passport", "ukvi"]).default("passport"),
    confirmed: z.boolean().optional(),
    fileName: z.string().trim().max(255).optional(),
    fileSize: z.number().int().nonnegative().max(MAX_UPLOAD_BYTES).optional()
});

const dbsSchema = z.object({
    fileName: z.string().trim().min(1).max(255),
    fileSize: z.number().int().positive().max(MAX_UPLOAD_BYTES).optional(),
    certificateNumber: z.string().trim().max(128).optional(),
    issueDate: z.string().trim().min(1)
});

const payoutAccountSchema = z.object({
    accountId: z.string().trim().min(1),
    payoutsEnabled: z.boolean().optional(),
    chargesEnabled: z.boolean().optional(),
    payoutStatus: z.enum(["not_connected", "pending", "connected"]).optional()
});

const verificationDecisionSchema = z.object({
    status: z.enum(["approved", "rejected"]),
    reviewNotes: z.string().trim().max(2000).optional(),
    reviewedBy: z.string().trim().max(255).optional()
});

const systemSettingsUpdateSchema = z.object({
    platformFeePercent: z.number().min(0).max(100).optional(),
    bookingServiceFeePercent: z.number().min(0).max(100).optional(),
    identityRequired: z.boolean().optional(),
    rightToWorkRequired: z.boolean().optional(),
    dbsRequired: z.boolean().optional()
}).refine(
    (value) => Object.values(value).some((entry) => entry !== undefined),
    { message: "At least one system setting field must be provided." }
);

function getStripeClientIfConfigured() {
    const secretKey = String(process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY_TEST || "").trim();
    if (!secretKey) {
        return null;
    }

    return new Stripe(secretKey, { apiVersion: "2024-06-20" });
}

function getPlatformFeePercent() {
    const parsed = Number(process.env.STRIPE_PLATFORM_FEE_PERCENT || 15);
    if (!Number.isFinite(parsed) || parsed < 0 || parsed > 100) {
        return 15;
    }
    return Math.round(parsed * 100) / 100;
}

function clampPercent(value, fallback = 0) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
        return fallback;
    }
    return Math.max(0, Math.min(100, Math.round(parsed * 100) / 100));
}

function buildDefaultSystemSettings() {
    return {
        payments: {
            platformFeePercent: clampPercent(getPlatformFeePercent(), 15),
            bookingServiceFeePercent: 5
        },
        verification: {
            identityRequired: true,
            rightToWorkRequired: true,
            dbsRequired: false
        },
        meta: {
            updatedAt: null,
            updatedBy: ""
        }
    };
}

function mapSystemSettingsRecord(row) {
    const defaults = buildDefaultSystemSettings();
    if (!row) {
        return defaults;
    }

    return {
        payments: {
            platformFeePercent: clampPercent(row.platform_fee_percent, defaults.payments.platformFeePercent),
            bookingServiceFeePercent: clampPercent(row.booking_service_fee_percent, defaults.payments.bookingServiceFeePercent)
        },
        verification: {
            identityRequired: row.identity_required == null ? defaults.verification.identityRequired : Boolean(row.identity_required),
            rightToWorkRequired: row.right_to_work_required == null ? defaults.verification.rightToWorkRequired : Boolean(row.right_to_work_required),
            dbsRequired: row.dbs_required == null ? defaults.verification.dbsRequired : Boolean(row.dbs_required)
        },
        meta: {
            updatedAt: row.updated_at || null,
            updatedBy: String(row.updated_by || "")
        }
    };
}

function normalizeStatus(value) {
    const candidate = String(value || "").trim().toLowerCase();
    if (ONBOARDING_STATUS_VALUES.has(candidate)) {
        return candidate;
    }
    return "not_submitted";
}

function normalizePayoutStatus(value, payoutsEnabled) {
    const candidate = String(value || "").trim().toLowerCase();
    if (candidate === "connected" || candidate === "pending" || candidate === "not_connected") {
        return candidate;
    }
    return payoutsEnabled ? "connected" : "pending";
}

function asPounds(value) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) {
        return 0;
    }
    return Math.round(numeric * 100) / 100;
}

async function ensureCaregiverOnboardingTable() {
    if (onboardingTableReady) {
        return;
    }

    await pool.query(`
      CREATE TABLE IF NOT EXISTS caregiver_onboarding_status (
        caregiver_key TEXT PRIMARY KEY,
        caregiver_id TEXT,
        caregiver_email TEXT,

        identity_status VARCHAR(32) NOT NULL DEFAULT 'not_submitted',
        identity_document_type VARCHAR(64),
        identity_file_name TEXT,
        identity_file_size INTEGER,
        identity_submitted_at TIMESTAMP,

        right_to_work_status VARCHAR(32) NOT NULL DEFAULT 'not_submitted',
        right_to_work_method VARCHAR(32),
        right_to_work_file_name TEXT,
        right_to_work_file_size INTEGER,
        right_to_work_submitted_at TIMESTAMP,

        dbs_status VARCHAR(32) NOT NULL DEFAULT 'not_submitted',
        dbs_certificate_number VARCHAR(128),
        dbs_issue_date DATE,
        dbs_file_name TEXT,
        dbs_file_size INTEGER,
        dbs_submitted_at TIMESTAMP,

        payout_status VARCHAR(32) NOT NULL DEFAULT 'not_connected',
        stripe_account_id VARCHAR(128),
        payouts_enabled BOOLEAN NOT NULL DEFAULT FALSE,
        charges_enabled BOOLEAN NOT NULL DEFAULT FALSE,

        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_caregiver_onboarding_status_email
      ON caregiver_onboarding_status (lower(caregiver_email));
    `);

    onboardingTableReady = true;
}

async function ensureAdminVerificationQueueTable() {
    if (adminVerificationQueueTableReady) {
        return;
    }

    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_verification_queue (
        id BIGSERIAL PRIMARY KEY,
        caregiver_key TEXT NOT NULL,
        caregiver_id TEXT,
        caregiver_email TEXT,
        caregiver_name TEXT,
        verification_type VARCHAR(32) NOT NULL,
        status VARCHAR(32) NOT NULL DEFAULT 'pending',
        payload JSONB NOT NULL DEFAULT '{}'::jsonb,
        source_status VARCHAR(32) NOT NULL DEFAULT 'pending_review',
        submitted_at TIMESTAMP NOT NULL DEFAULT NOW(),
        reviewed_at TIMESTAMP,
        reviewed_by TEXT,
        review_notes TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        CONSTRAINT admin_verification_queue_unique_open_item UNIQUE (caregiver_key, verification_type, status)
      )
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_admin_verification_queue_status_submitted
      ON admin_verification_queue (status, submitted_at DESC);
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_admin_verification_queue_type_status
      ON admin_verification_queue (verification_type, status);
    `);

    adminVerificationQueueTableReady = true;
}

async function ensureAdminSystemSettingsTable() {
    if (adminSystemSettingsTableReady) {
        return;
    }

    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_system_settings (
        id SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
        platform_fee_percent NUMERIC(5, 2) NOT NULL DEFAULT 15,
        booking_service_fee_percent NUMERIC(5, 2) NOT NULL DEFAULT 5,
        identity_required BOOLEAN NOT NULL DEFAULT TRUE,
        right_to_work_required BOOLEAN NOT NULL DEFAULT TRUE,
        dbs_required BOOLEAN NOT NULL DEFAULT FALSE,
        updated_by TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);

    await pool.query(
        `
        INSERT INTO admin_system_settings (
          id,
          platform_fee_percent,
          booking_service_fee_percent,
          identity_required,
          right_to_work_required,
          dbs_required,
          updated_by
        ) VALUES (1, $1, 5, TRUE, TRUE, FALSE, 'system:init')
        ON CONFLICT (id) DO NOTHING
        `,
        [clampPercent(getPlatformFeePercent(), 15)]
    );

    adminSystemSettingsTableReady = true;
}

async function readAdminSystemSettings() {
    const defaults = buildDefaultSystemSettings();

    try {
        await ensureAdminSystemSettingsTable();

        const result = await pool.query(
            `
            SELECT
              id,
              platform_fee_percent,
              booking_service_fee_percent,
              identity_required,
              right_to_work_required,
              dbs_required,
              updated_by,
              created_at,
              updated_at
            FROM admin_system_settings
            WHERE id = 1
            LIMIT 1
            `
        );

        return mapSystemSettingsRecord(result.rows?.[0] || null);
    } catch (error) {
        if (isMissingSchemaError(error)) {
            return defaults;
        }

        console.warn("[caregiver-onboarding] read admin system settings fallback:", error?.message || error);
        return defaults;
    }
}

async function resolveCaregiverIdentity(req) {
    const headerUserId = String(req.get("x-user-id") || "").trim();
    const headerEmail = String(req.get("x-user-email") || "").trim().toLowerCase();

    let viewer = null;

    if (UUID_RE.test(headerUserId)) {
        const byId = await pool.query(
            `
            SELECT id, email, first_name, last_name
            FROM users
            WHERE id = $1
              AND user_type = 'caregiver'
              AND deleted_at IS NULL
            LIMIT 1
            `,
            [headerUserId]
        );
        viewer = byId.rows?.[0] || null;
    }

    if (!viewer && headerEmail) {
        const byEmail = await pool.query(
            `
            SELECT id, email, first_name, last_name
            FROM users
            WHERE lower(email) = $1
              AND user_type = 'caregiver'
              AND deleted_at IS NULL
            LIMIT 1
            `,
            [headerEmail]
        );
        viewer = byEmail.rows?.[0] || null;
    }

    const email = String(viewer?.email || headerEmail || "").trim().toLowerCase();
    const inferredAliasId = email && CAREGIVER_EMAIL_ALIAS_TO_ID[email] ? CAREGIVER_EMAIL_ALIAS_TO_ID[email] : "";
    const id = String(viewer?.id || headerUserId || inferredAliasId || "cg-007").trim();
    const key = id || (email ? `email:${email}` : "cg-007");
    const fullName = [viewer?.first_name, viewer?.last_name]
        .map((value) => String(value || "").trim())
        .filter(Boolean)
        .join(" ");

    return {
        id,
        email,
        key,
        fullName
    };
}

async function ensureCaregiverRow(identity) {
    await ensureCaregiverOnboardingTable();

    await pool.query(
        `
        INSERT INTO caregiver_onboarding_status (
          caregiver_key,
          caregiver_id,
          caregiver_email
        ) VALUES ($1, $2, $3)
        ON CONFLICT (caregiver_key) DO UPDATE SET
          caregiver_id = COALESCE(NULLIF(EXCLUDED.caregiver_id, ''), caregiver_onboarding_status.caregiver_id),
          caregiver_email = COALESCE(NULLIF(EXCLUDED.caregiver_email, ''), caregiver_onboarding_status.caregiver_email),
          updated_at = NOW()
        `,
        [identity.key, identity.id || null, identity.email || null]
    );

    const result = await pool.query(
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
        [identity.key]
    );

    return result.rows?.[0] || null;
}

async function enqueueAdminVerification({
    identity,
    verificationType,
    sourceStatus = "pending_review",
    payload = {}
}) {
    await ensureAdminVerificationQueueTable();

    const queued = await pool.query(
        `
        INSERT INTO admin_verification_queue (
          caregiver_key,
          caregiver_id,
          caregiver_email,
          caregiver_name,
          verification_type,
          status,
          payload,
          source_status,
          submitted_at,
          updated_at
        ) VALUES ($1, $2, $3, $4, $5, 'pending', $6::jsonb, $7, NOW(), NOW())
        ON CONFLICT (caregiver_key, verification_type, status) DO UPDATE SET
          caregiver_id = COALESCE(NULLIF(EXCLUDED.caregiver_id, ''), admin_verification_queue.caregiver_id),
          caregiver_email = COALESCE(NULLIF(EXCLUDED.caregiver_email, ''), admin_verification_queue.caregiver_email),
          caregiver_name = COALESCE(NULLIF(EXCLUDED.caregiver_name, ''), admin_verification_queue.caregiver_name),
          payload = EXCLUDED.payload,
          source_status = EXCLUDED.source_status,
          submitted_at = NOW(),
          updated_at = NOW()
        RETURNING *
        `,
        [
            identity.key,
            String(identity.id || ""),
            String(identity.email || ""),
            String(identity.fullName || ""),
            verificationType,
            JSON.stringify(payload || {}),
            sourceStatus
        ]
    );

    return queued.rows?.[0] || null;
}

function asInteger(value, fallback = 0) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
        return fallback;
    }
    return Math.trunc(parsed);
}

function asHours(value) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed < 0) {
        return 0;
    }
    return Math.round(parsed * 10) / 10;
}

function parseLimitParam(value, defaultLimit = 50, maxLimit = 200) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
        return defaultLimit;
    }
    return Math.max(1, Math.min(maxLimit, Math.trunc(parsed)));
}

function parseDaysParam(value, defaultDays = 30, maxDays = 365) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
        return defaultDays;
    }
    return Math.max(1, Math.min(maxDays, Math.trunc(parsed)));
}

function asPercent(value) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
        return 0;
    }
    return Math.round(parsed * 10) / 10;
}

function isMissingSchemaError(error) {
    return Boolean(error && (error.code === "42P01" || error.code === "42703"));
}

async function querySafe(sql, params = []) {
    try {
        return await pool.query(sql, params);
    } catch (error) {
        if (isMissingSchemaError(error)) {
            return { rows: [] };
        }
        throw error;
    }
}

function mapQueueItem(row) {
    return {
        id: Number(row?.id || 0) || null,
        caregiverKey: String(row?.caregiver_key || ""),
        caregiverId: String(row?.caregiver_id || ""),
        caregiverEmail: String(row?.caregiver_email || ""),
        caregiverName: String(row?.caregiver_name || ""),
        verificationType: String(row?.verification_type || ""),
        status: String(row?.status || ""),
        sourceStatus: String(row?.source_status || ""),
        payload: row?.payload || {},
        submittedAt: row?.submitted_at || null,
        reviewedAt: row?.reviewed_at || null,
        reviewedBy: String(row?.reviewed_by || ""),
        reviewNotes: String(row?.review_notes || ""),
        createdAt: row?.created_at || null,
        updatedAt: row?.updated_at || null
    };
}

async function syncStripeAccountStatus(identity, row) {
    const stripe = getStripeClientIfConfigured();
    const accountId = String(row?.stripe_account_id || "").trim();

    if (!stripe || !accountId) {
        return row;
    }

    try {
        const account = await stripe.accounts.retrieve(accountId);
        const payoutsEnabled = Boolean(account?.payouts_enabled);
        const chargesEnabled = Boolean(account?.charges_enabled);
        const payoutStatus = payoutsEnabled ? "connected" : "pending";

        const changed = (
            payoutsEnabled !== Boolean(row?.payouts_enabled) ||
            chargesEnabled !== Boolean(row?.charges_enabled) ||
            payoutStatus !== String(row?.payout_status || "")
        );

        if (changed) {
            const updated = await pool.query(
                `
                UPDATE caregiver_onboarding_status
                SET
                  payouts_enabled = $2,
                  charges_enabled = $3,
                  payout_status = $4,
                  updated_at = NOW()
                WHERE caregiver_key = $1
                RETURNING *
                `,
                [identity.key, payoutsEnabled, chargesEnabled, payoutStatus]
            );
            return updated.rows?.[0] || row;
        }
    } catch (error) {
        console.warn("[caregiver-onboarding] stripe status sync failed:", error?.message || error);
    }

    return row;
}

async function getEarningsSummary(identity) {
    const ids = [];
    const pushUnique = (value) => {
        const normalized = String(value || "").trim();
        if (normalized && !ids.includes(normalized)) {
            ids.push(normalized);
        }
    };

    pushUnique(identity.id);
    if (identity.email && CAREGIVER_EMAIL_ALIAS_TO_ID[identity.email]) {
        pushUnique(CAREGIVER_EMAIL_ALIAS_TO_ID[identity.email]);
    }

    const params = [];
    const clauses = [];

    if (ids.length > 0) {
        params.push(ids);
        clauses.push(`COALESCE(to_jsonb(b)->>'caregiver_id', '') = ANY($${params.length}::text[])`);
    }

    if (identity.email) {
        params.push(identity.email);
        clauses.push(`lower(COALESCE(b.caregiver_email, '')) = $${params.length}`);
    }

    if (identity.fullName) {
        params.push(identity.fullName.toLowerCase());
        clauses.push(`lower(COALESCE(b.caregiver_name, '')) = $${params.length}`);
    }

    if (clauses.length === 0) {
        return {
            totalEarned: 0,
            pendingPayouts: 0,
            nextPayoutDate: null
        };
    }

    try {
        const summary = await pool.query(
            `
            SELECT
              COALESCE(SUM(CASE
                WHEN b.status IN ('completed', 'payment_released', 'reviewed')
                THEN COALESCE(b.payment_subtotal, 0) * 0.85
                ELSE 0
              END), 0) AS total_earned,
              COALESCE(SUM(CASE
                WHEN b.status IN ('accepted', 'in_progress')
                THEN COALESCE(b.payment_subtotal, 0) * 0.85
                ELSE 0
              END), 0) AS pending_payouts,
              MIN(CASE
                WHEN b.status IN ('accepted', 'in_progress')
                THEN b.booking_date
                ELSE NULL
              END) AS next_payout_date
            FROM carereceiver_dashboard_bookings b
            WHERE ${clauses.join(" OR ")}
            `,
            params
        );

        const row = summary.rows?.[0] || {};

        return {
            totalEarned: asPounds(row.total_earned),
            pendingPayouts: asPounds(row.pending_payouts),
            nextPayoutDate: row.next_payout_date || null
        };
    } catch (error) {
        const missingColumns = error?.code === "42703";
        if (!missingColumns) {
            throw error;
        }

        return {
            totalEarned: 0,
            pendingPayouts: 0,
            nextPayoutDate: null
        };
    }
}

function mapSummaryPayload(row) {
    const identityStatus = normalizeStatus(row?.identity_status);
    const rightToWorkStatus = normalizeStatus(row?.right_to_work_status);
    const dbsStatus = normalizeStatus(row?.dbs_status);

    return {
        identity: {
            status: identityStatus,
            documentType: String(row?.identity_document_type || "uk_passport"),
            fileName: String(row?.identity_file_name || ""),
            fileSize: Number(row?.identity_file_size || 0),
            submittedAt: row?.identity_submitted_at || null
        },
        rightToWork: {
            status: rightToWorkStatus,
            method: String(row?.right_to_work_method || "passport"),
            fileName: String(row?.right_to_work_file_name || ""),
            fileSize: Number(row?.right_to_work_file_size || 0),
            submittedAt: row?.right_to_work_submitted_at || null
        },
        dbs: {
            status: dbsStatus,
            certificateNumber: String(row?.dbs_certificate_number || ""),
            issueDate: row?.dbs_issue_date || "",
            fileName: String(row?.dbs_file_name || ""),
            fileSize: Number(row?.dbs_file_size || 0),
            submittedAt: row?.dbs_submitted_at || null
        },
        isProfilePreviewReady: identityStatus !== "not_submitted" && rightToWorkStatus !== "not_submitted"
    };
}

router.get("/caregiver/onboarding/summary", async (req, res) => {
    try {
        const identity = await resolveCaregiverIdentity(req);
        const row = await ensureCaregiverRow(identity);

        return res.json({
            data: {
                ...mapSummaryPayload(row),
                caregiver: {
                    id: identity.id,
                    email: identity.email
                }
            }
        });
    } catch (error) {
        console.error("[caregiver-onboarding] GET summary failed:", error);
        return res.status(500).json({
            error: {
                code: "caregiver_onboarding_summary_failed",
                message: "Could not load onboarding summary."
            }
        });
    }
});

router.put("/caregiver/onboarding/identity-verification", async (req, res) => {
    try {
        const parsed = identitySchema.safeParse(req.body || {});
        if (!parsed.success) {
            return res.status(400).json({
                error: {
                    code: "invalid_payload",
                    message: "Identity verification payload is invalid.",
                    details: parsed.error.flatten()
                }
            });
        }

        const identity = await resolveCaregiverIdentity(req);
        await ensureCaregiverRow(identity);

        const { documentType, fileName, fileSize } = parsed.data;

        const updated = await pool.query(
            `
            UPDATE caregiver_onboarding_status
            SET
              identity_status = 'pending_review',
              identity_document_type = $2,
              identity_file_name = $3,
              identity_file_size = $4,
              identity_submitted_at = NOW(),
              updated_at = NOW()
            WHERE caregiver_key = $1
            RETURNING *
            `,
            [identity.key, documentType, fileName, Number(fileSize || 0)]
        );

        return res.json({
            data: mapSummaryPayload(updated.rows?.[0])
        });
    } catch (error) {
        console.error("[caregiver-onboarding] PUT identity failed:", error);
        return res.status(500).json({
            error: {
                code: "caregiver_identity_submission_failed",
                message: "Could not submit identity verification."
            }
        });
    }
});

router.put("/caregiver/onboarding/right-to-work", async (req, res) => {
    try {
        const parsed = rightToWorkSchema.safeParse(req.body || {});
        if (!parsed.success) {
            return res.status(400).json({
                error: {
                    code: "invalid_payload",
                    message: "Right to Work payload is invalid.",
                    details: parsed.error.flatten()
                }
            });
        }

        const payload = parsed.data;
        if (payload.method === "passport") {
            if (!payload.confirmed) {
                return res.status(400).json({
                    error: {
                        code: "confirmation_required",
                        message: "Passport confirmation is required."
                    }
                });
            }

            if (!String(payload.fileName || "").trim()) {
                return res.status(400).json({
                    error: {
                        code: "file_required",
                        message: "Upload is required for passport verification."
                    }
                });
            }
        }

        const identity = await resolveCaregiverIdentity(req);
        await ensureCaregiverRow(identity);

        const updated = await pool.query(
            `
            UPDATE caregiver_onboarding_status
            SET
              right_to_work_status = 'pending_review',
              right_to_work_method = $2,
              right_to_work_file_name = $3,
              right_to_work_file_size = $4,
              right_to_work_submitted_at = NOW(),
              updated_at = NOW()
            WHERE caregiver_key = $1
            RETURNING *
            `,
            [
                identity.key,
                payload.method,
                payload.method === "passport" ? String(payload.fileName || "").trim() : "",
                payload.method === "passport" ? Number(payload.fileSize || 0) : 0
            ]
        );

        const queueItem = await enqueueAdminVerification({
            identity,
            verificationType: "right_to_work",
            sourceStatus: "pending_review",
            payload: {
                method: payload.method,
                confirmed: Boolean(payload.confirmed),
                fileName: payload.method === "passport" ? String(payload.fileName || "").trim() : "",
                fileSize: payload.method === "passport" ? Number(payload.fileSize || 0) : 0
            }
        });

        return res.json({
            data: {
                ...mapSummaryPayload(updated.rows?.[0]),
                adminReview: {
                    queued: Boolean(queueItem),
                    queueId: Number(queueItem?.id || 0) || null,
                    status: String(queueItem?.status || "pending"),
                    verificationType: "right_to_work"
                }
            }
        });
    } catch (error) {
        console.error("[caregiver-onboarding] PUT right-to-work failed:", error);
        return res.status(500).json({
            error: {
                code: "caregiver_right_to_work_submission_failed",
                message: "Could not submit right to work verification."
            }
        });
    }
});

router.put("/caregiver/onboarding/dbs-submission", async (req, res) => {
    try {
        const parsed = dbsSchema.safeParse(req.body || {});
        if (!parsed.success) {
            return res.status(400).json({
                error: {
                    code: "invalid_payload",
                    message: "DBS payload is invalid.",
                    details: parsed.error.flatten()
                }
            });
        }

        const payload = parsed.data;
        const issueDate = new Date(payload.issueDate);
        if (Number.isNaN(issueDate.getTime())) {
            return res.status(400).json({
                error: {
                    code: "invalid_issue_date",
                    message: "Issue date is invalid."
                }
            });
        }

        const identity = await resolveCaregiverIdentity(req);
        await ensureCaregiverRow(identity);

        const updated = await pool.query(
            `
            UPDATE caregiver_onboarding_status
            SET
              dbs_status = 'pending_review',
              dbs_certificate_number = $2,
              dbs_issue_date = $3::date,
              dbs_file_name = $4,
              dbs_file_size = $5,
              dbs_submitted_at = NOW(),
              updated_at = NOW()
            WHERE caregiver_key = $1
            RETURNING *
            `,
            [
                identity.key,
                String(payload.certificateNumber || "").trim(),
                payload.issueDate,
                payload.fileName,
                Number(payload.fileSize || 0)
            ]
        );

        const queueItem = await enqueueAdminVerification({
            identity,
            verificationType: "dbs",
            sourceStatus: "pending_review",
            payload: {
                fileName: String(payload.fileName || "").trim(),
                fileSize: Number(payload.fileSize || 0),
                certificateNumber: String(payload.certificateNumber || "").trim(),
                issueDate: payload.issueDate
            }
        });

        return res.json({
            data: {
                ...mapSummaryPayload(updated.rows?.[0]),
                adminReview: {
                    queued: Boolean(queueItem),
                    queueId: Number(queueItem?.id || 0) || null,
                    status: String(queueItem?.status || "pending"),
                    verificationType: "dbs"
                }
            }
        });
    } catch (error) {
        console.error("[caregiver-onboarding] PUT dbs failed:", error);
        return res.status(500).json({
            error: {
                code: "caregiver_dbs_submission_failed",
                message: "Could not submit DBS verification."
            }
        });
    }
});

router.get("/admin/verifications", async (req, res) => {
    try {
        await ensureAdminVerificationQueueTable();

        const requestedType = String(req.query.type || "").trim().toLowerCase();
        const requestedStatus = String(req.query.status || "").trim().toLowerCase();
        const requestedLimit = Number(req.query.limit || 50);

        const type = ["identity", "right_to_work", "dbs"].includes(requestedType) ? requestedType : "";
        const status = ["pending", "approved", "rejected"].includes(requestedStatus) ? requestedStatus : "pending";
        const limit = Number.isFinite(requestedLimit) ? Math.max(1, Math.min(200, Math.trunc(requestedLimit))) : 50;

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
});

router.get("/admin/verifications/:verificationId", async (req, res) => {
    try {
        await ensureAdminVerificationQueueTable();
        await ensureCaregiverOnboardingTable();

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
});

router.patch("/admin/verifications/:verificationId/status", async (req, res) => {
    try {
        await ensureAdminVerificationQueueTable();
        await ensureCaregiverOnboardingTable();

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
});

router.get("/admin/dashboard-summary", async (req, res) => {
    try {
        await ensureAdminVerificationQueueTable();

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
});

router.get("/admin/users", async (req, res) => {
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
});

router.get("/admin/bookings", async (req, res) => {
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
});

router.get("/admin/users/:userId", async (req, res) => {
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
});

router.get("/admin/analytics", async (req, res) => {
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
});

router.get("/admin/reported-issues", async (req, res) => {
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
});

router.get("/admin/audit-log", async (req, res) => {
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
});

router.get("/admin/system-settings", async (req, res) => {
    try {
        const settings = await readAdminSystemSettings();
        const [queueSummary, usersSummary] = await Promise.all([
            querySafe(
                `
                SELECT
                  COUNT(*) FILTER (WHERE status = 'pending')::int AS pending_verifications,
                  COUNT(*) FILTER (WHERE status = 'approved')::int AS approved_verifications,
                  COUNT(*) FILTER (WHERE status = 'rejected')::int AS rejected_verifications
                FROM admin_verification_queue
                `,
                []
            ),
            querySafe(
                `
                SELECT
                  COUNT(*)::int AS total_users,
                  COUNT(*) FILTER (WHERE account_status = 'active')::int AS active_users
                FROM users
                WHERE deleted_at IS NULL
                `,
                []
            )
        ]);

        const queueRow = queueSummary.rows?.[0] || {};
        const usersRow = usersSummary.rows?.[0] || {};

        return res.json({
            data: {
                payments: settings.payments,
                verification: settings.verification,
                meta: settings.meta,
                platform: {
                    stripeConfigured: Boolean(getStripeClientIfConfigured()),
                    apiEnvironment: String(process.env.NODE_ENV || "development"),
                    totalUsers: asInteger(usersRow.total_users),
                    activeUsers: asInteger(usersRow.active_users),
                    pendingVerifications: asInteger(queueRow.pending_verifications),
                    approvedVerifications: asInteger(queueRow.approved_verifications),
                    rejectedVerifications: asInteger(queueRow.rejected_verifications)
                }
            }
        });
    } catch (error) {
        console.error("[caregiver-onboarding] GET admin system settings failed:", error);
        return res.status(500).json({
            error: {
                code: "admin_system_settings_fetch_failed",
                message: "Could not load system settings."
            }
        });
    }
});

router.patch("/admin/system-settings", async (req, res) => {
    try {
        const parsed = systemSettingsUpdateSchema.safeParse(req.body || {});
        if (!parsed.success) {
            return res.status(400).json({
                error: {
                    code: "invalid_payload",
                    message: "System settings payload is invalid.",
                    details: parsed.error.flatten()
                }
            });
        }

        await ensureAdminSystemSettingsTable();
        const current = await readAdminSystemSettings();
        const payload = parsed.data;

        const nextPlatformFeePercent = payload.platformFeePercent === undefined
            ? clampPercent(current?.payments?.platformFeePercent, getPlatformFeePercent())
            : clampPercent(payload.platformFeePercent, getPlatformFeePercent());

        const nextBookingServiceFeePercent = payload.bookingServiceFeePercent === undefined
            ? clampPercent(current?.payments?.bookingServiceFeePercent, 5)
            : clampPercent(payload.bookingServiceFeePercent, 5);

        const nextIdentityRequired = payload.identityRequired === undefined
            ? Boolean(current?.verification?.identityRequired)
            : Boolean(payload.identityRequired);

        const nextRightToWorkRequired = payload.rightToWorkRequired === undefined
            ? Boolean(current?.verification?.rightToWorkRequired)
            : Boolean(payload.rightToWorkRequired);

        const nextDbsRequired = payload.dbsRequired === undefined
            ? Boolean(current?.verification?.dbsRequired)
            : Boolean(payload.dbsRequired);

        const updatedBy = String(req.get("x-user-email") || req.get("x-user-id") || "admin").trim();

        const updated = await pool.query(
            `
            UPDATE admin_system_settings
            SET
              platform_fee_percent = $2,
              booking_service_fee_percent = $3,
              identity_required = $4,
              right_to_work_required = $5,
              dbs_required = $6,
              updated_by = $7,
              updated_at = NOW()
            WHERE id = 1
            RETURNING
              id,
              platform_fee_percent,
              booking_service_fee_percent,
              identity_required,
              right_to_work_required,
              dbs_required,
              updated_by,
              created_at,
              updated_at
            `,
            [
                1,
                nextPlatformFeePercent,
                nextBookingServiceFeePercent,
                nextIdentityRequired,
                nextRightToWorkRequired,
                nextDbsRequired,
                updatedBy
            ]
        );

        const mapped = mapSystemSettingsRecord(updated.rows?.[0] || null);

        return res.json({
            data: {
                payments: mapped.payments,
                verification: mapped.verification,
                meta: mapped.meta
            }
        });
    } catch (error) {
        console.error("[caregiver-onboarding] PATCH admin system settings failed:", error);
        return res.status(500).json({
            error: {
                code: "admin_system_settings_update_failed",
                message: "Could not update system settings."
            }
        });
    }
});

router.get("/platform/settings", async (req, res) => {
    try {
        const settings = await readAdminSystemSettings();
        return res.json({
            data: {
                payments: settings.payments,
                verification: settings.verification,
                meta: settings.meta
            }
        });
    } catch (error) {
        console.error("[caregiver-onboarding] GET platform settings failed:", error);
        return res.status(500).json({
            error: {
                code: "platform_settings_fetch_failed",
                message: "Could not load platform settings."
            }
        });
    }
});

router.get("/caregiver/payout-setup", async (req, res) => {
    try {
        const identity = await resolveCaregiverIdentity(req);
        let row = await ensureCaregiverRow(identity);
        row = await syncStripeAccountStatus(identity, row);
        const settings = await readAdminSystemSettings();
        const platformFeePercent = clampPercent(settings?.payments?.platformFeePercent, getPlatformFeePercent());

        const earnings = await getEarningsSummary(identity);

        return res.json({
            data: {
                caregiver: {
                    id: identity.id,
                    email: identity.email
                },
                payout: {
                    status: String(row?.payout_status || "not_connected"),
                    stripeAccountId: String(row?.stripe_account_id || ""),
                    payoutsEnabled: Boolean(row?.payouts_enabled),
                    chargesEnabled: Boolean(row?.charges_enabled)
                },
                earnings: {
                    totalEarned: earnings.totalEarned,
                    pendingPayouts: earnings.pendingPayouts,
                    nextPayoutDate: earnings.nextPayoutDate
                },
                platformFeePercent
            }
        });
    } catch (error) {
        console.error("[caregiver-onboarding] GET payout setup failed:", error);
        return res.status(500).json({
            error: {
                code: "caregiver_payout_setup_fetch_failed",
                message: "Could not load payout setup."
            }
        });
    }
});

router.put("/caregiver/payout-setup/connect-account", async (req, res) => {
    try {
        const parsed = payoutAccountSchema.safeParse(req.body || {});
        if (!parsed.success) {
            return res.status(400).json({
                error: {
                    code: "invalid_payload",
                    message: "Payout account payload is invalid.",
                    details: parsed.error.flatten()
                }
            });
        }

        const identity = await resolveCaregiverIdentity(req);
        await ensureCaregiverRow(identity);

        const payload = parsed.data;
        const payoutsEnabled = Boolean(payload.payoutsEnabled);
        const chargesEnabled = Boolean(payload.chargesEnabled);
        const payoutStatus = payload.payoutStatus || normalizePayoutStatus("", payoutsEnabled);

        const updated = await pool.query(
            `
            UPDATE caregiver_onboarding_status
            SET
              stripe_account_id = $2,
              payout_status = $3,
              payouts_enabled = $4,
              charges_enabled = $5,
              updated_at = NOW()
            WHERE caregiver_key = $1
            RETURNING *
            `,
            [identity.key, payload.accountId, payoutStatus, payoutsEnabled, chargesEnabled]
        );

        return res.json({
            data: {
                status: String(updated.rows?.[0]?.payout_status || payoutStatus),
                stripeAccountId: String(updated.rows?.[0]?.stripe_account_id || payload.accountId),
                payoutsEnabled: Boolean(updated.rows?.[0]?.payouts_enabled),
                chargesEnabled: Boolean(updated.rows?.[0]?.charges_enabled)
            }
        });
    } catch (error) {
        console.error("[caregiver-onboarding] PUT payout connect failed:", error);
        return res.status(500).json({
            error: {
                code: "caregiver_payout_setup_save_failed",
                message: "Could not save payout setup."
            }
        });
    }
});

export default router;
