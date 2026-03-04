const API_BASE = String(import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const API_PREFIX = "/api/v1";

export function readStoredViewer() {
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
        // ignore malformed storage payload
    }

    try {
        token = String(window.localStorage.getItem("icare_access_token") || "").trim();
    } catch {
        token = "";
    }

    return { id, email, token };
}

export function resolveApiUrl(path) {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;

    if (!API_BASE) {
        return normalizedPath;
    }

    if (API_BASE.endsWith(API_PREFIX) && normalizedPath.startsWith(API_PREFIX)) {
        return `${API_BASE}${normalizedPath.slice(API_PREFIX.length)}`;
    }

    return `${API_BASE}${normalizedPath}`;
}

export function resolveCandidateUrls(path, {
    includeLocalhostFallback = true,
    localhostOrigins = ["http://localhost:4001"]
} = {}) {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const candidates = [];

    const pushUnique = (url) => {
        if (url && !candidates.includes(url)) {
            candidates.push(url);
        }
    };

    pushUnique(resolveApiUrl(normalizedPath));

    if (typeof window !== "undefined" && includeLocalhostFallback) {
        const isLocalhostHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);
        if (isLocalhostHost) {
            for (const origin of localhostOrigins) {
                const cleanOrigin = String(origin || "").replace(/\/$/, "");
                if (cleanOrigin) {
                    pushUnique(`${cleanOrigin}${normalizedPath}`);
                }
            }
        }
    }

    return candidates;
}

function parsePayload(text) {
    if (!text) {
        return null;
    }
    try {
        return JSON.parse(text);
    } catch {
        return { message: text };
    }
}

function isNetworkFailure(message) {
    return /failed to fetch|networkerror|load failed|econnrefused|couldn't connect/i.test(String(message || ""));
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

export async function requestApiJson(path, {
    signal,
    method = "GET",
    body,
    headers = {},
    includeCredentials = true,
    useViewerHeaders = true,
    includeLocalhostFallback = true,
    localhostOrigins = ["http://localhost:4001"],
    errorLabel = "API request failed.",
    networkErrorHint = "Could not connect to API.",
    onUnauthorized
} = {}) {
    const viewer = useViewerHeaders ? readStoredViewer() : { id: "", email: "", token: "" };
    const requestHeaders = {
        Accept: "application/json",
        ...(body ? { "Content-Type": "application/json" } : {}),
        ...(viewer.id ? { "X-User-Id": viewer.id } : {}),
        ...(viewer.email ? { "X-User-Email": viewer.email } : {}),
        ...(viewer.token ? { Authorization: `Bearer ${viewer.token}` } : {}),
        ...headers
    };

    const urls = resolveCandidateUrls(path, { includeLocalhostFallback, localhostOrigins });
    const errors = [];

    for (const url of urls) {
        try {
            const response = await fetch(url, {
                method,
                signal,
                cache: "no-store",
                ...(includeCredentials ? { credentials: "include" } : {}),
                headers: requestHeaders,
                ...(body ? { body: JSON.stringify(body) } : {})
            });

            if (response.status === 401 && typeof onUnauthorized === "function") {
                onUnauthorized();
            }

            const text = await response.text();
            const payload = parsePayload(text);

            if (!response.ok) {
                const message = payload?.error?.message || payload?.error || payload?.message || `HTTP ${response.status}`;
                errors.push(`${url} -> HTTP ${response.status}: ${String(message)}`);
                continue;
            }

            return payload?.data ?? payload;
        } catch (error) {
            if (isAbortError(error)) {
                throw error;
            }
            const message = error instanceof Error ? error.message : String(error);
            errors.push(`${url} -> ${message}`);
        }
    }

    const hasNetworkError = errors.some((item) => isNetworkFailure(item));
    if (hasNetworkError) {
        throw new Error(`${networkErrorHint} Details: ${errors.join(" | ")}`);
    }

    throw new Error(`${errorLabel} ${errors.join(" | ")}`);
}
