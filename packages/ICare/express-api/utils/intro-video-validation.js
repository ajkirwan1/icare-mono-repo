export const MAX_INTRO_VIDEO_SECONDS = 30;
export const MAX_INTRO_VIDEO_SIZE_BYTES = 40 * 1024 * 1024;

export const ALLOWED_INTRO_VIDEO_MIME_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime"
];

const EXTENSION_BY_MIME = {
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/quicktime": "mov"
};

export function isAllowedMimeType(mime) {
  return ALLOWED_INTRO_VIDEO_MIME_TYPES.includes(String(mime || "").toLowerCase());
}

export function extensionFromMimeType(mime) {
  return EXTENSION_BY_MIME[String(mime || "").toLowerCase()] || null;
}

export function validateVideoUploadRequest({ mimeType, sizeBytes, durationSeconds }) {
  if (!isAllowedMimeType(mimeType)) {
    return "Unsupported video format. Please upload MP4, WebM, or MOV.";
  }

  if (!Number.isFinite(sizeBytes) || sizeBytes <= 0) {
    return "Video file is empty or invalid.";
  }

  if (sizeBytes > MAX_INTRO_VIDEO_SIZE_BYTES) {
    return "Video file is too large. Please upload a file up to 40 MB.";
  }

  if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) {
    return "Could not read video length. Please choose a different file.";
  }

  if (durationSeconds > MAX_INTRO_VIDEO_SECONDS) {
    return "Video is too long. Please upload a clip up to 30 seconds.";
  }

  return null;
}
