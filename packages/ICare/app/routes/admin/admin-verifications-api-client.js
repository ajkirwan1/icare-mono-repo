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
        // ignore malformed local payloads
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

    const pushUnique = (value) => {
        if (value && !candidates.includes(value)) {
            candidates.push(value);
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

export function isAbortError(error) {
    return Boolean(
        error &&
        (
            error.name === "AbortError" ||
            error.code === 20 ||
            /abort(ed)?/i.test(String(error.message || ""))
        )
    );
}

async function requestJsonWithOptions(path, {
    signal,
    method = "GET",
    body = null,
    errorLabel = "Admin request failed."
} = {}) {
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
        if (signal?.aborted) {
            throw new DOMException("The operation was aborted.", "AbortError");
        }

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
            if (isAbortError(error) || signal?.aborted) {
                throw error;
            }

            const message = error instanceof Error ? error.message : String(error);
            errors.push(`${url} -> ${message}`);
        }
    }

    if (signal?.aborted) {
        throw new DOMException("The operation was aborted.", "AbortError");
    }

    throw new Error(`${errorLabel} ${errors.join(" | ")}`);
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
