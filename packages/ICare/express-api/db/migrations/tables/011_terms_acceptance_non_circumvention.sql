ALTER TABLE users
  ADD COLUMN IF NOT EXISTS terms_accepted_at TIMESTAMP;

UPDATE users
SET terms_accepted_at = COALESCE(terms_accepted_at, gdpr_consent_date, created_at, NOW())
WHERE terms_accepted_at IS NULL
  AND gdpr_consent = TRUE;

CREATE INDEX IF NOT EXISTS idx_users_terms_accepted_at ON users(terms_accepted_at);
