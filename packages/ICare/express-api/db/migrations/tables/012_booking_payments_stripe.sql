ALTER TABLE carereceiver_dashboard_bookings
  ADD COLUMN IF NOT EXISTS payment_provider VARCHAR(32),
  ADD COLUMN IF NOT EXISTS payment_intent_id VARCHAR(128),
  ADD COLUMN IF NOT EXISTS payment_status VARCHAR(40),
  ADD COLUMN IF NOT EXISTS payment_authorized_at TIMESTAMP,
  ADD COLUMN IF NOT EXISTS payment_captured_at TIMESTAMP,
  ADD COLUMN IF NOT EXISTS payment_cancelled_at TIMESTAMP,
  ADD COLUMN IF NOT EXISTS payment_refund_id VARCHAR(128),
  ADD COLUMN IF NOT EXISTS payment_refunded_at TIMESTAMP,
  ADD COLUMN IF NOT EXISTS payment_last_error TEXT;

CREATE INDEX IF NOT EXISTS idx_cr_dash_bookings_payment_intent
  ON carereceiver_dashboard_bookings(payment_intent_id);

CREATE INDEX IF NOT EXISTS idx_cr_dash_bookings_payment_status
  ON carereceiver_dashboard_bookings(payment_status);
