CREATE TABLE IF NOT EXISTS carereceiver_settings (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  booking_updates_email BOOLEAN NOT NULL DEFAULT TRUE,
  booking_reminders_email BOOLEAN NOT NULL DEFAULT TRUE,
  new_messages_email BOOLEAN NOT NULL DEFAULT TRUE,
  product_announcements_email BOOLEAN NOT NULL DEFAULT FALSE,
  stripe_customer_id VARCHAR(128),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE carereceiver_settings
  ADD COLUMN IF NOT EXISTS booking_updates_email BOOLEAN NOT NULL DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS booking_reminders_email BOOLEAN NOT NULL DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS new_messages_email BOOLEAN NOT NULL DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS product_announcements_email BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS stripe_customer_id VARCHAR(128),
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

CREATE INDEX IF NOT EXISTS idx_carereceiver_settings_stripe_customer_id
  ON carereceiver_settings (stripe_customer_id);
