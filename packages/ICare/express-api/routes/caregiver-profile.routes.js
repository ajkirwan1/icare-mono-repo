import express, { Router } from "express";
import { randomUUID } from "crypto";
import path from "path";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { pool } from "../db/db.js";
import {
  extensionFromMimeType,
  validateVideoUploadRequest
} from "../utils/intro-video-validation.js";

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOAD_DIR = path.resolve(__dirname, "../../public/uploads/intro-videos");

function toProfilePayload(profileId, row) {
  return {
    id: profileId,
    introVideoUrl: row?.intro_video_url || null,
    introVideoDurationSec: row?.intro_video_duration_sec ?? null,
    introVideoMime: row?.intro_video_mime || null,
    introVideoSizeBytes: row?.intro_video_size_bytes ?? null
  };
}

async function findProfile(profileId) {
  const result = await pool.query(
    `
      SELECT
        profile_id,
        intro_video_url,
        intro_video_duration_sec,
        intro_video_mime,
        intro_video_size_bytes
      FROM caregiver_profiles
      WHERE profile_id = $1
      LIMIT 1
    `,
    [profileId]
  );

  return result.rows[0] || null;
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

router.get("/caregiver-profiles/:id/public", async (req, res) => {
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
});

router.put(
  "/caregiver-profiles/:id/intro-video",
  express.raw({ type: ["video/mp4", "video/webm", "video/quicktime"], limit: "40mb" }),
  async (req, res) => {
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
);

router.delete("/caregiver-profiles/:id/intro-video", async (req, res) => {
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
});

export default router;
