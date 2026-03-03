import test from "node:test";
import assert from "node:assert/strict";
import {
    hasAcceptedTerms,
    normalizeTermsAcceptedAt,
    termsNotAcceptedError
} from "./terms-acceptance.js";

test("normalizeTermsAcceptedAt keeps valid ISO input", () => {
    const value = normalizeTermsAcceptedAt("2026-03-02T10:00:00.000Z");
    assert.equal(value, "2026-03-02T10:00:00.000Z");
});

test("normalizeTermsAcceptedAt falls back for invalid values", () => {
    const value = normalizeTermsAcceptedAt("not-a-date", "2026-03-02T09:00:00.000Z");
    assert.equal(value, "2026-03-02T09:00:00.000Z");
});

test("hasAcceptedTerms is true when timestamp exists", () => {
    assert.equal(hasAcceptedTerms({ termsAcceptedAt: "2026-03-02T10:00:00.000Z" }), true);
    assert.equal(hasAcceptedTerms({ terms_accepted_at: new Date("2026-03-02T10:00:00.000Z") }), true);
    assert.equal(hasAcceptedTerms({}), false);
});

test("hasAcceptedTerms falls back to gdpr consent signals", () => {
    assert.equal(hasAcceptedTerms({ gdprConsent: true }), true);
    assert.equal(hasAcceptedTerms({ gdpr_consent: true }), true);
    assert.equal(hasAcceptedTerms({ gdprConsentDate: "2026-03-02T10:00:00.000Z" }), true);
});

test("termsNotAcceptedError returns expected API payload", () => {
    const payload = termsNotAcceptedError();
    assert.equal(payload.success, false);
    assert.equal(payload.error.code, "TERMS_NOT_ACCEPTED");
    assert.equal(payload.error.details.termsUrl, "/terms");
});
