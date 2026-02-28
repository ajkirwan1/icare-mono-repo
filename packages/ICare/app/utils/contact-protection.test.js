import test from "node:test";
import assert from "node:assert/strict";
import { sanitizeMessage } from "./contact-protection.js";

test("masks email", () => {
  const result = sanitizeMessage("Napisz na anna@example.com");
  assert.equal(result.blocked, true);
  assert.equal(result.flags.email, true);
  assert.match(result.sanitizedText, /\[email ukryty\]/);
});

test("masks uk phone", () => {
  const result = sanitizeMessage("Call me on +44 7700 900123");
  assert.equal(result.flags.phone, true);
  assert.match(result.sanitizedText, /\[telefon ukryty\]/);
});

test("masks generic phone with separators", () => {
  const result = sanitizeMessage("my number is (020) 7946-0958");
  assert.equal(result.flags.phone, true);
  assert.match(result.sanitizedText, /\[telefon ukryty\]/);
});

test("does not mask short numbers as phone", () => {
  const result = sanitizeMessage("I need 12345 steps");
  assert.equal(result.flags.phone, false);
  assert.equal(result.blocked, false);
});

test("masks http link", () => {
  const result = sanitizeMessage("visit https://example.com/profile");
  assert.equal(result.flags.link, true);
  assert.match(result.sanitizedText, /\[link ukryty\]/);
});

test("masks www link", () => {
  const result = sanitizeMessage("www.example.com is my page");
  assert.equal(result.flags.link, true);
  assert.match(result.sanitizedText, /\[link ukryty\]/);
});

test("masks short link", () => {
  const result = sanitizeMessage("bit.ly/abc123");
  assert.equal(result.flags.link, true);
  assert.match(result.sanitizedText, /\[link ukryty\]/);
});

test("masks uk postcode with address context", () => {
  const result = sanitizeMessage("My address is 12 King Street, SW1A 1AA");
  assert.equal(result.flags.address, true);
  assert.match(result.sanitizedText, /\[adres ukryty\]/);
});

test("does not trigger address on standalone postcode", () => {
  const result = sanitizeMessage("Weather in SW1A 1AA is fine");
  assert.equal(result.flags.address, false);
});

test("detects paypal as payment", () => {
  const result = sanitizeMessage("pay me on PayPal");
  assert.equal(result.flags.payment, true);
  assert.match(result.sanitizedText, /\[dane płatności ukryte\]/);
});

test("detects revolut as payment", () => {
  const result = sanitizeMessage("send by revolut please");
  assert.equal(result.flags.payment, true);
  assert.match(result.sanitizedText, /\[dane płatności ukryte\]/);
});

test("detects bank transfer phrase", () => {
  const result = sanitizeMessage("bank transfer with sort code and account number");
  assert.equal(result.flags.payment, true);
  assert.match(result.sanitizedText, /\[dane płatności ukryte\]/);
});

test("detects social off-platform cues", () => {
  const result = sanitizeMessage("message me on whatsapp");
  assert.equal(result.flags.social, true);
  assert.match(result.sanitizedText, /\[kontakt poza platformą ukryty\]/);
});

test("detects DM phrase", () => {
  const result = sanitizeMessage("DM me on instagram");
  assert.equal(result.flags.social, true);
});

test("safe text remains unchanged", () => {
  const source = "Can we confirm the visit time for tomorrow?";
  const result = sanitizeMessage(source);
  assert.equal(result.blocked, false);
  assert.equal(result.sanitizedText, source);
});
