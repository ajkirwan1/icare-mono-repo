import test from "node:test";
import assert from "node:assert/strict";
import {
  extensionFromMimeType,
  validateVideoUploadRequest,
  MAX_INTRO_VIDEO_SIZE_BYTES
} from "./intro-video-validation.js";

test("accepts valid upload payload", () => {
  const result = validateVideoUploadRequest({
    mimeType: "video/mp4",
    sizeBytes: 4 * 1024 * 1024,
    durationSeconds: 28
  });

  assert.equal(result, null);
});

test("rejects video longer than 30 seconds", () => {
  const result = validateVideoUploadRequest({
    mimeType: "video/mp4",
    sizeBytes: 4 * 1024 * 1024,
    durationSeconds: 31
  });

  assert.equal(result, "Video is too long. Please upload a clip up to 30 seconds.");
});

test("rejects oversized upload", () => {
  const result = validateVideoUploadRequest({
    mimeType: "video/mp4",
    sizeBytes: MAX_INTRO_VIDEO_SIZE_BYTES + 1,
    durationSeconds: 20
  });

  assert.equal(result, "Video file is too large. Please upload a file up to 40 MB.");
});

test("maps mime type to extension", () => {
  assert.equal(extensionFromMimeType("video/mp4"), "mp4");
  assert.equal(extensionFromMimeType("video/webm"), "webm");
  assert.equal(extensionFromMimeType("video/quicktime"), "mov");
});
