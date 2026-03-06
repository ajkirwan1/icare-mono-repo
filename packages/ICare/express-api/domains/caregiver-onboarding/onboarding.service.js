/* global console */
import { z } from "zod";
import { getPlatformFeePercentFromEnv } from "../admin/system-settings/system-settings.repository.js";

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const ONBOARDING_STATUS_VALUES = new Set(["not_submitted", "pending_review", "verified", "rejected"]);
const CAREGIVER_EMAIL_ALIAS_TO_ID = {
    "maxax85@gmail.com": "cg-007",
    "maxherbst1985@gmail.com": "cg-007"
};

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

function getPlatformFeePercent() {
    return getPlatformFeePercentFromEnv();
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

function asPercent(value) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
        return 0;
    }
    return Math.round(parsed * 10) / 10;
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

export {
    MAX_UPLOAD_BYTES,
    ONBOARDING_STATUS_VALUES,
    CAREGIVER_EMAIL_ALIAS_TO_ID,
    identitySchema,
    rightToWorkSchema,
    dbsSchema,
    payoutAccountSchema,
    verificationDecisionSchema,
    getPlatformFeePercent,
    normalizeStatus,
    normalizePayoutStatus,
    asPounds,
    asInteger,
    asHours,
    asPercent,
    mapQueueItem,
    mapSummaryPayload
};
