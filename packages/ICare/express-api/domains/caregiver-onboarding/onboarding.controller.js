/* global console */
import { pool } from "../../db/db.js";
import {
    clampPercent,
    readAdminSystemSettings
} from "../admin/system-settings/system-settings.repository.js";
import {
    identitySchema,
    rightToWorkSchema,
    dbsSchema,
    payoutAccountSchema,
    normalizePayoutStatus,
    getPlatformFeePercent,
    mapSummaryPayload
} from "./onboarding.service.js";
import {
    resolveCaregiverIdentity,
    ensureCaregiverRow,
    enqueueAdminVerification,
    syncStripeAccountStatus,
    getEarningsSummary
} from "./onboarding.repository.js";

export async function getSummary(req, res) {
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
}

export async function submitIdentity(req, res) {
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
}

export async function submitRightToWork(req, res) {
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
}

export async function submitDbs(req, res) {
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
}

export async function getPayoutSetup(req, res) {
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
}

export async function connectPayoutAccount(req, res) {
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
}
