import { pool } from "../../db/db.js";

export async function findProfile(profileId) {
  const result = await pool.query(
    `
      SELECT
        profile_id,
        intro_video_url,
        intro_video_duration_sec,
        intro_video_mime,
        intro_video_size_bytes,
        profile_photo_url,
        profile_data,
        updated_by,
        created_at,
        updated_at
      FROM caregiver_profiles
      WHERE profile_id = $1
      LIMIT 1
    `,
    [profileId]
  );

  return result.rows[0] || null;
}
