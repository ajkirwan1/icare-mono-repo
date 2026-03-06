/* global console, Buffer */
import { randomUUID } from "crypto";
import path from "path";
import { promises as fs } from "fs";
import { pool } from "../../db/db.js";
import {
  extensionFromMimeType,
  validateVideoUploadRequest
} from "../../utils/intro-video-validation.js";
import {
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
} from "./caregiver-profile.service.js";
import { findProfile } from "./caregiver-profile.repository.js";

export async function getPublicProfile(req, res) {
  try {
    const profileId = String(req.params.id || "").trim();
    if (!profileId) {
      return res.status(400).json({ error: "profile_id_required" });
    }

    const row = await findProfile(profileId);
    return res.json({ profile: toProfilePayload(profileId, row) });
  } catch (error) {
    console.error("[caregiver-profile] public fetch failed:", error);
    return res.status(500).json({ error: "caregiver_profile_fetch_failed" });
  }
}

export async function updateProfile(req, res) {
  try {
    const profileId = String(req.params.id || "").trim();
    if (!profileId) {
      return res.status(400).json({ error: "profile_id_required" });
    }

    if (!canEditProfile(req, profileId)) {
      return res.status(403).json({ error: "forbidden", message: "You do not have permission to update this profile." });
    }

    const rawPayload = req.body?.profileData ?? req.body?.profile ?? req.body;
    const profileData = sanitizeProfileData(rawPayload);
    const actor = readRequestActor(req, profileId);

    await pool.query(
      `
        INSERT INTO caregiver_profiles (
          profile_id,
          profile_data,
          updated_by,
          updated_at
        )
        VALUES ($1, $2::jsonb, $3, now())
        ON CONFLICT (profile_id)
        DO UPDATE SET
          profile_data = EXCLUDED.profile_data,
          updated_by = EXCLUDED.updated_by,
          updated_at = now()
      `,
      [profileId, JSON.stringify(profileData), actor]
    );

    const updated = await findProfile(profileId);
    return res.json({ profile: toProfilePayload(profileId, updated) });
  } catch (error) {
    console.error("[caregiver-profile] profile update failed:", error);
    return res.status(500).json({ error: "caregiver_profile_update_failed" });
  }
}

export async function uploadPhoto(req, res) {
  try {
    const profileId = String(req.params.id || "").trim();
    if (!profileId) {
      return res.status(400).json({ error: "profile_id_required" });
    }

    if (!canEditProfile(req, profileId)) {
      return res.status(403).json({ error: "forbidden", message: "You do not have permission to upload this profile photo." });
    }

    const body = Buffer.isBuffer(req.body) ? req.body : Buffer.alloc(0);
    const mimeType = String(req.headers["content-type"] || "").split(";")[0].trim().toLowerCase();
    const extension = PHOTO_MIME_TO_EXTENSION[mimeType];

    if (!extension) {
      return res.status(400).json({ error: "invalid_profile_photo", message: "Unsupported image format. Please upload JPG, PNG, or WebP." });
    }

    if (!body.length) {
      return res.status(400).json({ error: "invalid_profile_photo", message: "Profile photo file is empty." });
    }

    if (body.length > MAX_PHOTO_SIZE_BYTES) {
      return res.status(400).json({ error: "invalid_profile_photo", message: "Profile photo is too large. Maximum size is 5 MB." });
    }

    const previous = await findProfile(profileId);
    await fs.mkdir(PHOTO_UPLOAD_DIR, { recursive: true });

    const fileName = `${profileId}-${randomUUID()}.${extension}`;
    const absolutePath = path.join(PHOTO_UPLOAD_DIR, fileName);
    await fs.writeFile(absolutePath, body);

    const profilePhotoUrl = `/uploads/profile-photos/${fileName}`;
    const actor = readRequestActor(req, profileId);

    await pool.query(
      `
        INSERT INTO caregiver_profiles (
          profile_id,
          profile_photo_url,
          updated_by,
          updated_at
        )
        VALUES ($1, $2, $3, now())
        ON CONFLICT (profile_id)
        DO UPDATE SET
          profile_photo_url = EXCLUDED.profile_photo_url,
          updated_by = EXCLUDED.updated_by,
          updated_at = now()
      `,
      [profileId, profilePhotoUrl, actor]
    );

    const previousFilePath = photoUrlToUploadPath(previous?.profile_photo_url);
    if (previousFilePath && previousFilePath !== absolutePath) {
      await fs.rm(previousFilePath, { force: true });
    }

    const updated = await findProfile(profileId);
    return res.status(201).json({ profile: toProfilePayload(profileId, updated) });
  } catch (error) {
    console.error("[caregiver-profile] profile photo upload failed:", error);
    return res.status(500).json({ error: "profile_photo_upload_failed" });
  }
}

export async function uploadIntroVideo(req, res) {
  try {
    const profileId = String(req.params.id || "").trim();
    if (!profileId) {
      return res.status(400).json({ error: "profile_id_required" });
    }

    if (!canEditProfile(req, profileId)) {
      return res.status(403).json({ error: "forbidden", message: "You do not have permission to upload this video." });
    }

    const body = Buffer.isBuffer(req.body) ? req.body : Buffer.alloc(0);
    const mimeType = String(req.headers["content-type"] || "").split(";")[0].trim().toLowerCase();
    const durationHeader = Number(req.headers["x-video-duration-sec"]);

    const validationError = validateVideoUploadRequest({
      mimeType,
      sizeBytes: body.length,
      durationSeconds: durationHeader
    });

    if (validationError) {
      return res.status(400).json({ error: "invalid_intro_video", message: validationError });
    }

    const extension = extensionFromMimeType(mimeType);
    if (!extension) {
      return res.status(400).json({ error: "invalid_intro_video", message: "Unsupported video format. Please upload MP4, WebM, or MOV." });
    }

    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    const fileName = `${profileId}-${randomUUID()}.${extension}`;
    const absolutePath = path.join(UPLOAD_DIR, fileName);
    await fs.writeFile(absolutePath, body);

    const previous = await findProfile(profileId);
    const introVideoUrl = `/uploads/intro-videos/${fileName}`;

    await pool.query(
      `
        INSERT INTO caregiver_profiles (
          profile_id,
          intro_video_url,
          intro_video_duration_sec,
          intro_video_mime,
          intro_video_size_bytes,
          updated_at
        )
        VALUES ($1, $2, $3, $4, $5, now())
        ON CONFLICT (profile_id)
        DO UPDATE SET
          intro_video_url = EXCLUDED.intro_video_url,
          intro_video_duration_sec = EXCLUDED.intro_video_duration_sec,
          intro_video_mime = EXCLUDED.intro_video_mime,
          intro_video_size_bytes = EXCLUDED.intro_video_size_bytes,
          updated_at = now()
      `,
      [profileId, introVideoUrl, Math.round(durationHeader), mimeType, body.length]
    );

    const previousFilePath = urlToUploadPath(previous?.intro_video_url);
    if (previousFilePath && previousFilePath !== absolutePath) {
      await fs.rm(previousFilePath, { force: true });
    }

    // TODO: Add server-side media duration verification using ffprobe during production hardening.
    const updated = await findProfile(profileId);
    return res.status(201).json({ profile: toProfilePayload(profileId, updated) });
  } catch (error) {
    console.error("[caregiver-profile] intro video upload failed:", error);
    return res.status(500).json({ error: "intro_video_upload_failed" });
  }
}

export async function removeIntroVideo(req, res) {
  try {
    const profileId = String(req.params.id || "").trim();
    if (!profileId) {
      return res.status(400).json({ error: "profile_id_required" });
    }

    if (!canEditProfile(req, profileId)) {
      return res.status(403).json({ error: "forbidden", message: "You do not have permission to remove this video." });
    }

    const previous = await findProfile(profileId);

    await pool.query(
      `
        INSERT INTO caregiver_profiles (
          profile_id,
          intro_video_url,
          intro_video_duration_sec,
          intro_video_mime,
          intro_video_size_bytes,
          updated_at
        )
        VALUES ($1, NULL, NULL, NULL, NULL, now())
        ON CONFLICT (profile_id)
        DO UPDATE SET
          intro_video_url = NULL,
          intro_video_duration_sec = NULL,
          intro_video_mime = NULL,
          intro_video_size_bytes = NULL,
          updated_at = now()
      `,
      [profileId]
    );

    const previousFilePath = urlToUploadPath(previous?.intro_video_url);
    if (previousFilePath) {
      await fs.rm(previousFilePath, { force: true });
    }

    const updated = await findProfile(profileId);
    return res.json({ profile: toProfilePayload(profileId, updated) });
  } catch (error) {
    console.error("[caregiver-profile] intro video remove failed:", error);
    return res.status(500).json({ error: "intro_video_remove_failed" });
  }
}
