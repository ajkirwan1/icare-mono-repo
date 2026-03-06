export function normalizeTermsAcceptedAt(value, fallbackDate = new Date()) {
    const raw = typeof value === "string" ? value.trim() : "";
    const fallback = fallbackDate instanceof Date ? fallbackDate : new Date(fallbackDate);
    const safeFallback = Number.isNaN(fallback.getTime()) ? new Date() : fallback;

    if (!raw) {
        return safeFallback.toISOString();
    }

    const parsed = new Date(raw);
    if (Number.isNaN(parsed.getTime())) {
        return safeFallback.toISOString();
    }

    return parsed.toISOString();
}

export function hasAcceptedTerms(viewer) {
    const value = viewer?.termsAcceptedAt ?? viewer?.terms_accepted_at ?? null;
    if (value) {
        const parsed = value instanceof Date ? value : new Date(value);
        if (!Number.isNaN(parsed.getTime())) {
            return true;
        }
    }

    // Backward-compatible fallback for environments/accounts that only persisted GDPR consent.
    const gdprConsent = viewer?.gdprConsent ?? viewer?.gdpr_consent ?? false;
    if (Boolean(gdprConsent)) {
        return true;
    }

    const gdprDateValue = viewer?.gdprConsentDate ?? viewer?.gdpr_consent_date ?? null;
    if (!gdprDateValue) {
        return false;
    }

    const gdprDate = gdprDateValue instanceof Date ? gdprDateValue : new Date(gdprDateValue);
    return !Number.isNaN(gdprDate.getTime());
}

export function termsNotAcceptedError() {
    return {
        success: false,
        error: {
            code: "TERMS_NOT_ACCEPTED",
            message: "Please accept the Terms of Service before continuing.",
            details: {
                termsUrl: "/terms",
                section: "Introduction & Fair Use (Non-Circumvention)"
            }
        }
    };
}

export function ensureTermsAccepted(res, viewer) {
    if (hasAcceptedTerms(viewer)) {
        return true;
    }

    res.status(403).json(termsNotAcceptedError());
    return false;
}
