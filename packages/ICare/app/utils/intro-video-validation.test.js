import test from "node:test";
import assert from "node:assert/strict";
import {
  ALLOWED_INTRO_VIDEO_MIME_TYPES,
  MAX_INTRO_VIDEO_SIZE_BYTES,
  validateIntroVideoDuration,
  validateIntroVideoFileBasics
} from "./intro-video-validation.js";

test("accepts valid video file basics", () => {
  const result = validateIntroVideoFileBasics({
    type: "video/mp4",
    size: 5 * 1024 * 1024
  });
  assert.equal(result, null);
});

test("rejects unsupported type", () => {
  const result = validateIntroVideoFileBasics({
    type: "video/avi",
    size: 5 * 1024 * 1024
  });
  assert.equal(result, "Unsupported video format. Please upload MP4, WebM, or MOV.");
});

test("rejects oversized file", () => {
  const result = validateIntroVideoFileBasics({
    type: "video/webm",
    size: MAX_INTRO_VIDEO_SIZE_BYTES + 1
  });
  assert.equal(result, "Video file is too large. Please upload a file up to 40 MB.");
});

test("rejects duration above 30 seconds", () => {
  const result = validateIntroVideoDuration(30.1);
  assert.equal(result, "Video is too long. Please upload a clip up to 30 seconds.");
});

test("accepts duration at hard limit", () => {
  const result = validateIntroVideoDuration(30);
  assert.equal(result, null);
});

test("exports required mvp mime types", () => {
  assert.deepEqual(ALLOWED_INTRO_VIDEO_MIME_TYPES, ["video/mp4", "video/webm", "video/quicktime"]);
});
