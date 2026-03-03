export const TERMS_ACCEPTED_AT_KEY = "icare_terms_accepted_at";

export function isTermsAccepted(accepted) {
    return Boolean(accepted);
}

export function createTermsAcceptedAt(now = new Date()) {
    const date = now instanceof Date ? now : new Date(now);
    if (Number.isNaN(date.getTime())) {
        return new Date().toISOString();
    }
    return date.toISOString();
}

export function persistTermsAcceptedAt(timestamp, storage = null) {
    if (!timestamp) {
        return false;
    }

    const targetStorage = storage || (typeof window !== "undefined" ? window.localStorage : null);
    if (!targetStorage) {
        return false;
    }

    try {
        targetStorage.setItem(TERMS_ACCEPTED_AT_KEY, String(timestamp));
        return true;
    } catch {
        return false;
    }
}
