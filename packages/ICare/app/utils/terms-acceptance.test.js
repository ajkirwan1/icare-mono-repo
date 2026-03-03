import test from "node:test";
import assert from "node:assert/strict";
import {
    TERMS_ACCEPTED_AT_KEY,
    createTermsAcceptedAt,
    isTermsAccepted,
    persistTermsAcceptedAt
} from "./terms-acceptance.js";

test("isTermsAccepted validates required acceptance", () => {
    assert.equal(isTermsAccepted(true), true);
    assert.equal(isTermsAccepted(false), false);
    assert.equal(isTermsAccepted(null), false);
});

test("createTermsAcceptedAt returns stable ISO timestamp", () => {
    assert.equal(createTermsAcceptedAt("2026-03-02T10:00:00.000Z"), "2026-03-02T10:00:00.000Z");
});

test("persistTermsAcceptedAt stores timestamp with expected key", () => {
    const calls = [];
    const storage = {
        setItem(key, value) {
            calls.push([key, value]);
        }
    };

    const ok = persistTermsAcceptedAt("2026-03-02T10:00:00.000Z", storage);

    assert.equal(ok, true);
    assert.deepEqual(calls, [[TERMS_ACCEPTED_AT_KEY, "2026-03-02T10:00:00.000Z"]]);
});
