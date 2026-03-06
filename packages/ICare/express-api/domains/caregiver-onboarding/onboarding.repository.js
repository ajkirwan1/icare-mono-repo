/* global console */
import { pool } from "../../db/db.js";
import { UUID_RE } from "../../utils/identity.js";
import { getStripeClientIfConfigured } from "../../utils/stripe-client.js";
import { CAREGIVER_EMAIL_ALIAS_TO_ID, asPounds } from "./onboarding.service.js";

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

export {
    isMissingSchemaError,
    querySafe,
    resolveCaregiverIdentity,
    ensureCaregiverRow,
    enqueueAdminVerification,
    syncStripeAccountStatus,
    getEarningsSummary
};
