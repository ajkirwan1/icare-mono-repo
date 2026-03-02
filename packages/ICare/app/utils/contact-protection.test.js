import test from "node:test";
import assert from "node:assert/strict";
import { sanitizeMessage } from "./contact-protection.js";

test("masks a single phone number inline and keeps sentence readable", () => {
  const result = sanitizeMessage("Please call me on +44 7700 900123 tomorrow.");
  assert.equal(result.sanitizedText, "Please call me on [phone number hidden] tomorrow.");
  assert.equal(result.flags.phone, true);
});

test("masks a single email inline and keeps surrounding text", () => {
  const result = sanitizeMessage("You can email me at anna@example.com or message me here.");
  assert.equal(result.sanitizedText, "You can email me at [email hidden] or message me here.");
  assert.equal(result.flags.email, true);
});

test("masks an address inline when clear address context is present", () => {
  const result = sanitizeMessage("My address is 12 King Street, SW1A 1AA");
  assert.equal(result.sanitizedText, "My address is [address hidden]");
  assert.equal(result.flags.address, true);
});

test("masks payment references inline", () => {
  const result = sanitizeMessage("Please pay me on PayPal after the shift.");
  assert.equal(result.sanitizedText, "Please pay me on [payment details hidden] after the shift.");
  assert.equal(result.flags.payment, true);
});

test("supports multiple replacements in one message", () => {
  const result = sanitizeMessage(
    "Email me at anna@example.com, call +44 7700 900123, or visit https://example.com now."
  );
  assert.equal(
    result.sanitizedText,
    "Email me at [email hidden], call [phone number hidden], or visit [link hidden] now."
  );
  assert.equal(result.flags.email, true);
  assert.equal(result.flags.phone, true);
  assert.equal(result.flags.link, true);
});

test("masks social platform mentions inline", () => {
  const result = sanitizeMessage("You can find me on facebook or instagram.");
  assert.equal(result.sanitizedText, "You can find me on [link hidden] or [link hidden].");
  assert.equal(result.flags.link, true);
});

test("keeps mixed normal text and masked content readable", () => {
  const source = "I can do Tuesday at 10:00, my address is 21 Baker Street, London NW1 6XE.";
  const result = sanitizeMessage(source);
  assert.equal(result.sanitizedText, "I can do Tuesday at 10:00, my address is [address hidden].");
  assert.equal(result.flags.address, true);
});

test("does not mask digits that are not phone numbers", () => {
  const source = "I walked 12345 steps and completed 3 tasks.";
  const result = sanitizeMessage(source);
  assert.equal(result.sanitizedText, source);
  assert.equal(result.flags.phone, false);
});

test("is deterministic for the same input", () => {
  const source = "Contact me on +44 7700 900123 and anna@example.com";
  const first = sanitizeMessage(source);
  const second = sanitizeMessage(source);
  assert.deepEqual(first, second);
});
