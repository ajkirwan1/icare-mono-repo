const API_BASE = String(import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const API_PREFIX = "/api/v1";

function readStoredViewer() {
    if (typeof window === "undefined") {
        return { id: "", email: "", token: "" };
    }

    let id = "";
    let email = "";
    let token = "";

    try {
        const rawUser = window.localStorage.getItem("icare_user");
        if (rawUser) {
            const parsedUser = JSON.parse(rawUser);
            id = String(parsedUser?.id || "").trim();
            email = String(parsedUser?.email || "").trim().toLowerCase();
        }
    } catch {
        // ignore malformed payload
    }

    try {
        token = String(window.localStorage.getItem("icare_access_token") || "").trim();
    } catch {
        token = "";
    }

    return { id, email, token };
}

function resolveUrl(path) {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;

    if (!API_BASE) {
        return normalizedPath;
    }

    if (API_BASE.endsWith(API_PREFIX) && normalizedPath.startsWith(API_PREFIX)) {
        return `${API_BASE}${normalizedPath.slice(API_PREFIX.length)}`;
    }

    return `${API_BASE}${normalizedPath}`;
}

function resolveCandidateUrls(path) {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const candidates = [];

    const pushUnique = (url) => {
        if (url && !candidates.includes(url)) {
            candidates.push(url);
        }
    };

    pushUnique(resolveUrl(normalizedPath));

    if (typeof window !== "undefined") {
        const isLocalhost = ["localhost", "127.0.0.1"].includes(window.location.hostname);
        if (isLocalhost) {
            pushUnique(`http://localhost:4001${normalizedPath}`);
        }
    }

    return candidates;
}

async function requestJson(path, { signal, method = "GET", body } = {}) {
    const viewer = readStoredViewer();

    const headers = {
        Accept: "application/json",
        ...(body ? { "Content-Type": "application/json" } : {}),
        ...(viewer.id ? { "X-User-Id": viewer.id } : {}),
        ...(viewer.email ? { "X-User-Email": viewer.email } : {}),
        ...(viewer.token ? { Authorization: `Bearer ${viewer.token}` } : {})
    };

    const urls = resolveCandidateUrls(path);
    const errors = [];

    for (const url of urls) {
        try {
            const response = await fetch(url, {
                method,
                signal,
                cache: "no-store",
                credentials: "include",
                headers,
                ...(body ? { body: JSON.stringify(body) } : {})
            });

            const text = await response.text();
            const payload = text ? JSON.parse(text) : null;

            if (!response.ok) {
                const message = payload?.error?.message || payload?.error || payload?.message || `HTTP ${response.status}`;
                errors.push(`${url} -> HTTP ${response.status}: ${String(message)}`);
                continue;
            }

            return payload?.data ?? payload;
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            errors.push(`${url} -> ${message}`);
        }
    }

    throw new Error(`Caregiver onboarding request failed. ${errors.join(" | ")}`);
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
