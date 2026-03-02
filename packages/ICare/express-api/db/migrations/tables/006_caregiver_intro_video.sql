CREATE TABLE IF NOT EXISTS caregiver_profiles (
  profile_id TEXT PRIMARY KEY,
  intro_video_url TEXT,
  intro_video_duration_sec INTEGER
    CONSTRAINT caregiver_intro_video_duration_chk
    CHECK (intro_video_duration_sec IS NULL OR (intro_video_duration_sec >= 0 AND intro_video_duration_sec <= 30)),
  intro_video_mime TEXT,
  intro_video_size_bytes BIGINT
    CONSTRAINT caregiver_intro_video_size_chk
    CHECK (intro_video_size_bytes IS NULL OR intro_video_size_bytes >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE caregiver_profiles
  ADD COLUMN IF NOT EXISTS intro_video_url TEXT,
  ADD COLUMN IF NOT EXISTS intro_video_duration_sec INTEGER,
  ADD COLUMN IF NOT EXISTS intro_video_mime TEXT,
  ADD COLUMN IF NOT EXISTS intro_video_size_bytes BIGINT,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'caregiver_intro_video_duration_chk'
  ) THEN
    ALTER TABLE caregiver_profiles
      ADD CONSTRAINT caregiver_intro_video_duration_chk
      CHECK (intro_video_duration_sec IS NULL OR (intro_video_duration_sec >= 0 AND intro_video_duration_sec <= 30));
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'caregiver_intro_video_size_chk'
  ) THEN
    ALTER TABLE caregiver_profiles
      ADD CONSTRAINT caregiver_intro_video_size_chk
      CHECK (intro_video_size_bytes IS NULL OR intro_video_size_bytes >= 0);
  END IF;
END $$;
