import {
    isAbortError,
    requestApiJson
} from "../../services/api/http-client.js";

export { isAbortError };

async function requestJsonWithOptions(path, {
    signal,
    method = "GET",
    body = null,
    errorLabel = "Admin request failed."
} = {}) {
    return requestApiJson(path, {
        signal,
        method,
        ...(body ? { body } : {}),
        errorLabel,
        networkErrorHint: "Could not connect to admin API on http://localhost:4001. Start API server and retry."
    });
}

export async function getAdminVerificationQueue({ type = "", status = "pending", limit = 100, signal } = {}) {
    const params = new URLSearchParams();
    if (type) {
        params.set("type", String(type).trim().toLowerCase());
    }
    if (status) {
        params.set("status", String(status).trim().toLowerCase());
    }
    if (limit) {
        params.set("limit", String(limit));
    }

    const suffix = params.toString();
    const path = suffix ? `/api/v1/admin/verifications?${suffix}` : "/api/v1/admin/verifications";

    return requestJsonWithOptions(path, {
        signal,
        method: "GET",
        errorLabel: "Admin verifications request failed."
    });
}

export async function getAdminDashboardSummary({ signal } = {}) {
    return requestJsonWithOptions("/api/v1/admin/dashboard-summary", {
        signal,
        method: "GET",
        errorLabel: "Admin dashboard request failed."
    });
}

export async function getAdminUsers({ q = "", role = "", status = "", limit = 100, signal } = {}) {
    const params = new URLSearchParams();
    if (q) {
        params.set("q", String(q).trim());
    }
    if (role) {
        params.set("role", String(role).trim().toLowerCase());
    }
    if (status) {
        params.set("status", String(status).trim().toLowerCase());
    }
    if (limit) {
        params.set("limit", String(limit));
    }

    const suffix = params.toString();
    const path = suffix ? `/api/v1/admin/users?${suffix}` : "/api/v1/admin/users";
    return requestJsonWithOptions(path, {
        signal,
        method: "GET",
        errorLabel: "Admin users request failed."
    });
}

export async function getAdminBookings({ status = "", limit = 100, signal } = {}) {
    const params = new URLSearchParams();
    if (status) {
        params.set("status", String(status).trim().toLowerCase());
    }
    if (limit) {
        params.set("limit", String(limit));
    }

    const suffix = params.toString();
    const path = suffix ? `/api/v1/admin/bookings?${suffix}` : "/api/v1/admin/bookings";
    return requestJsonWithOptions(path, {
        signal,
        method: "GET",
        errorLabel: "Admin bookings request failed."
    });
}

export async function getAdminAnalytics({ days = 30, signal } = {}) {
    const params = new URLSearchParams();
    if (days) {
        params.set("days", String(days));
    }
    const suffix = params.toString();
    const path = suffix ? `/api/v1/admin/analytics?${suffix}` : "/api/v1/admin/analytics";
    return requestJsonWithOptions(path, {
        signal,
        method: "GET",
        errorLabel: "Admin analytics request failed."
    });
}

export async function getAdminReportedIssues({ severity = "", source = "", limit = 100, signal } = {}) {
    const params = new URLSearchParams();
    if (severity) {
        params.set("severity", String(severity).trim().toLowerCase());
    }
    if (source) {
        params.set("source", String(source).trim().toLowerCase());
    }
    if (limit) {
        params.set("limit", String(limit));
    }
    const suffix = params.toString();
    const path = suffix ? `/api/v1/admin/reported-issues?${suffix}` : "/api/v1/admin/reported-issues";
    return requestJsonWithOptions(path, {
        signal,
        method: "GET",
        errorLabel: "Admin reported issues request failed."
    });
}

export async function getAdminAuditLog({ limit = 100, signal } = {}) {
    const params = new URLSearchParams();
    if (limit) {
        params.set("limit", String(limit));
    }
    const suffix = params.toString();
    const path = suffix ? `/api/v1/admin/audit-log?${suffix}` : "/api/v1/admin/audit-log";
    return requestJsonWithOptions(path, {
        signal,
        method: "GET",
        errorLabel: "Admin audit log request failed."
    });
}

export async function getAdminSystemSettings({ signal } = {}) {
    return requestJsonWithOptions("/api/v1/admin/system-settings", {
        signal,
        method: "GET",
        errorLabel: "Admin system settings request failed."
    });
}

export async function updateAdminSystemSettings(payload, { signal } = {}) {
    return requestJsonWithOptions("/api/v1/admin/system-settings", {
        signal,
        method: "PATCH",
        body: payload || {},
        errorLabel: "Admin system settings update request failed."
    });
}

export async function getAdminUserDetail(userId, { signal } = {}) {
    const safeUserId = String(userId || "").trim();
    if (!safeUserId) {
        throw new Error("Admin user detail request failed. userId is required.");
    }

    return requestJsonWithOptions(`/api/v1/admin/users/${encodeURIComponent(safeUserId)}`, {
        signal,
        method: "GET",
        errorLabel: "Admin user detail request failed."
    });
}

export async function getAdminVerificationDetail(verificationId, { signal } = {}) {
    const safeVerificationId = String(verificationId || "").trim();
    if (!safeVerificationId) {
        throw new Error("Admin verification detail request failed. verificationId is required.");
    }

    return requestJsonWithOptions(`/api/v1/admin/verifications/${encodeURIComponent(safeVerificationId)}`, {
        signal,
        method: "GET",
        errorLabel: "Admin verification detail request failed."
    });
}

export async function updateAdminVerificationStatus(verificationId, payload, { signal } = {}) {
    const safeVerificationId = String(verificationId || "").trim();
    if (!safeVerificationId) {
        throw new Error("Admin verification update request failed. verificationId is required.");
    }

    return requestJsonWithOptions(`/api/v1/admin/verifications/${encodeURIComponent(safeVerificationId)}/status`, {
        signal,
        method: "PATCH",
        body: payload || {},
        errorLabel: "Admin verification update request failed."
    });
}
