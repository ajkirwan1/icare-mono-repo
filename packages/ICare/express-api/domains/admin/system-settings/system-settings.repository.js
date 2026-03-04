/* global process */
import { pool } from "../../../db/db.js";

let adminSystemSettingsTableReady = false;

function isMissingSchemaError(error) {
    return Boolean(error && (error.code === "42P01" || error.code === "42703"));
}

export function clampPercent(value, fallback = 0) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
        return fallback;
    }
    return Math.max(0, Math.min(100, Math.round(parsed * 100) / 100));
}

export function getPlatformFeePercentFromEnv() {
    const parsed = Number(process.env.STRIPE_PLATFORM_FEE_PERCENT || 15);
    if (!Number.isFinite(parsed) || parsed < 0 || parsed > 100) {
        return 15;
    }
    return Math.round(parsed * 100) / 100;
}

export function buildDefaultSystemSettings() {
    return {
        payments: {
            platformFeePercent: clampPercent(getPlatformFeePercentFromEnv(), 15),
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

export async function ensureAdminSystemSettingsTable() {
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
        [clampPercent(getPlatformFeePercentFromEnv(), 15)]
    );

    adminSystemSettingsTableReady = true;
}

export async function readAdminSystemSettings() {
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
        throw error;
    }
}

export async function updateAdminSystemSettings({
    platformFeePercent,
    bookingServiceFeePercent,
    identityRequired,
    rightToWorkRequired,
    dbsRequired,
    updatedBy
}) {
    await ensureAdminSystemSettingsTable();

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
        WHERE id = $1
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
            platformFeePercent,
            bookingServiceFeePercent,
            identityRequired,
            rightToWorkRequired,
            dbsRequired,
            updatedBy
        ]
    );

    return mapSystemSettingsRecord(updated.rows?.[0] || null);
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

function asInteger(value) {
    const parsed = Number.parseInt(String(value ?? ""), 10);
    return Number.isFinite(parsed) ? parsed : 0;
}

export async function readAdminPlatformSnapshot() {
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

    return {
        totalUsers: asInteger(usersRow.total_users),
        activeUsers: asInteger(usersRow.active_users),
        pendingVerifications: asInteger(queueRow.pending_verifications),
        approvedVerifications: asInteger(queueRow.approved_verifications),
        rejectedVerifications: asInteger(queueRow.rejected_verifications)
    };
}
