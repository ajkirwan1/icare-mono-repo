/* global Buffer */
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOAD_DIR = path.resolve(__dirname, "../../../public/uploads/intro-videos");
const PHOTO_UPLOAD_DIR = path.resolve(__dirname, "../../../public/uploads/profile-photos");
const MAX_PHOTO_SIZE_BYTES = 5 * 1024 * 1024;
const PHOTO_MIME_TO_EXTENSION = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp"
};

function toProfilePayload(profileId, row) {
  const profileData = row?.profile_data && typeof row.profile_data === "object"
    ? row.profile_data
    : {};

  return {
    id: profileId,
    introVideoUrl: row?.intro_video_url || null,
    introVideoDurationSec: row?.intro_video_duration_sec ?? null,
    introVideoMime: row?.intro_video_mime || null,
    introVideoSizeBytes: row?.intro_video_size_bytes ?? null,
    profilePhotoUrl: row?.profile_photo_url || null,
    profileData
  };
}

function canEditProfile(req, profileId) {
  const role = String(req.headers["x-user-role"] || "").toLowerCase();
  const userId = String(req.headers["x-user-id"] || "").trim();

  if (role === "admin") {
    return true;
  }

  if (role === "caregiver" && userId && userId === profileId) {
    return true;
  }

  return false;
}

function urlToUploadPath(url) {
  if (!url || !url.startsWith("/uploads/intro-videos/")) {
    return null;
  }

  const filename = path.basename(url);
  return path.join(UPLOAD_DIR, filename);
}

function photoUrlToUploadPath(url) {
  if (!url || !url.startsWith("/uploads/profile-photos/")) {
    return null;
  }

  const filename = path.basename(url);
  return path.join(PHOTO_UPLOAD_DIR, filename);
}

function readRequestActor(req, fallbackProfileId) {
  const role = String(req.headers["x-user-role"] || "").trim().toLowerCase();
  const userId = String(req.headers["x-user-id"] || "").trim();
  if (userId) {
    return userId;
  }
  if (role) {
    return role;
  }
  return fallbackProfileId;
}

function sanitizeProfileData(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return {};
  }

  return input;
}

export {
  UPLOAD_DIR,
  PHOTO_UPLOAD_DIR,
  MAX_PHOTO_SIZE_BYTES,
  PHOTO_MIME_TO_EXTENSION,
  toProfilePayload,
  canEditProfile,
  urlToUploadPath,
  photoUrlToUploadPath,
  readRequestActor,
  sanitizeProfileData
};
