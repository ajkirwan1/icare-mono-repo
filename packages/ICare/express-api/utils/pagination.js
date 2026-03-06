export function parsePositiveInt(value, fallback, max = 100) {
    const parsed = Number.parseInt(String(value ?? ""), 10);
    if (!Number.isFinite(parsed) || parsed <= 0) {
        return fallback;
    }
    return Math.min(parsed, max);
}

export function parseLimitParam(value, defaultLimit = 50, maxLimit = 200) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
        return defaultLimit;
    }
    return Math.max(1, Math.min(maxLimit, Math.trunc(parsed)));
}

export function parseDaysParam(value, defaultDays = 30, maxDays = 365) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
        return defaultDays;
    }
    return Math.max(1, Math.min(maxDays, Math.trunc(parsed)));
}
