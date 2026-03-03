CREATE TABLE IF NOT EXISTS admin_verification_queue (
  id BIGSERIAL PRIMARY KEY,
  caregiver_key TEXT NOT NULL,
  caregiver_id TEXT,
  caregiver_email TEXT,
  caregiver_name TEXT,
  verification_type VARCHAR(32) NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'pending',
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  source_status VARCHAR(32) NOT NULL DEFAULT 'pending_review',
  submitted_at TIMESTAMP NOT NULL DEFAULT NOW(),
  reviewed_at TIMESTAMP,
  reviewed_by TEXT,
  review_notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT admin_verification_queue_unique_open_item UNIQUE (caregiver_key, verification_type, status)
);

CREATE INDEX IF NOT EXISTS idx_admin_verification_queue_status_submitted
  ON admin_verification_queue (status, submitted_at DESC);

CREATE INDEX IF NOT EXISTS idx_admin_verification_queue_type_status
  ON admin_verification_queue (verification_type, status);

