import { requestApiJson } from "../../services/api/http-client.js";

async function requestJson(path, { signal, method = "GET", body } = {}) {
    return requestApiJson(path, {
        signal,
        method,
        ...(body ? { body } : {}),
        errorLabel: "Caregiver onboarding request failed.",
        networkErrorHint: "Could not connect to caregiver onboarding API on http://localhost:4001. Start API server and retry."
    });
}

export function onboardingStatusLabel(status) {
    const normalized = String(status || "").trim().toLowerCase();

    if (normalized === "pending_review") {
        return "Pending Review";
    }
    if (normalized === "verified") {
        return "Verified";
    }
    if (normalized === "rejected") {
        return "Rejected";
    }
    if (normalized === "connected") {
        return "Connected";
    }
    if (normalized === "pending") {
        return "Pending";
    }

    return "Not Submitted";
}

export async function getCaregiverOnboardingSummary({ signal } = {}) {
    return requestJson("/api/v1/caregiver/onboarding/summary", { signal });
}

export async function submitCaregiverIdentityVerification(payload, { signal } = {}) {
    return requestJson("/api/v1/caregiver/onboarding/identity-verification", {
        signal,
        method: "PUT",
        body: payload
    });
}

export async function submitCaregiverRightToWork(payload, { signal } = {}) {
    return requestJson("/api/v1/caregiver/onboarding/right-to-work", {
        signal,
        method: "PUT",
        body: payload
    });
}

export async function submitCaregiverDbs(payload, { signal } = {}) {
    return requestJson("/api/v1/caregiver/onboarding/dbs-submission", {
        signal,
        method: "PUT",
        body: payload
    });
}

export async function getCaregiverPayoutSetup({ signal } = {}) {
    return requestJson("/api/v1/caregiver/payout-setup", { signal });
}

export async function saveCaregiverPayoutAccount(payload, { signal } = {}) {
    return requestJson("/api/v1/caregiver/payout-setup/connect-account", {
        signal,
        method: "PUT",
        body: payload
    });
}

export async function createCaregiverConnectAccount(payload, { signal } = {}) {
    return requestJson("/api/stripe/connect/account", {
        signal,
        method: "POST",
        body: payload
    });
}

export async function getCaregiverStripeDashboardLink(accountId, { signal } = {}) {
    return requestJson("/api/stripe/connect/dashboard-link", {
        signal,
        method: "POST",
        body: { accountId }
    });
}
