CREATE TABLE IF NOT EXISTS caregiver_onboarding_status (
  caregiver_key TEXT PRIMARY KEY,
  caregiver_id TEXT,
  caregiver_email TEXT,

  identity_status VARCHAR(32) NOT NULL DEFAULT 'not_submitted',
  identity_document_type VARCHAR(64),
  identity_file_name TEXT,
  identity_file_size INTEGER,
  identity_submitted_at TIMESTAMP,

  right_to_work_status VARCHAR(32) NOT NULL DEFAULT 'not_submitted',
  right_to_work_method VARCHAR(32),
  right_to_work_file_name TEXT,
  right_to_work_file_size INTEGER,
  right_to_work_submitted_at TIMESTAMP,

  dbs_status VARCHAR(32) NOT NULL DEFAULT 'not_submitted',
  dbs_certificate_number VARCHAR(128),
  dbs_issue_date DATE,
  dbs_file_name TEXT,
  dbs_file_size INTEGER,
  dbs_submitted_at TIMESTAMP,

  payout_status VARCHAR(32) NOT NULL DEFAULT 'not_connected',
  stripe_account_id VARCHAR(128),
  payouts_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  charges_enabled BOOLEAN NOT NULL DEFAULT FALSE,

  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_caregiver_onboarding_status_email
  ON caregiver_onboarding_status (lower(caregiver_email));

CREATE INDEX IF NOT EXISTS idx_caregiver_onboarding_status_caregiver_id
  ON caregiver_onboarding_status (caregiver_id);
