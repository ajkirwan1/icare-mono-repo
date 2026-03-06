const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value) {
    return EMAIL_RE.test(String(value || "").trim());
}

export function zodErrorsToFieldErrors(zodError) {
    const errors = {};
    for (const issue of zodError.issues || []) {
        const key = issue.path?.[0];
        if (!key) { continue; }
        if (!errors[key]) { errors[key] = issue.message; }
    }
    return errors;
}
