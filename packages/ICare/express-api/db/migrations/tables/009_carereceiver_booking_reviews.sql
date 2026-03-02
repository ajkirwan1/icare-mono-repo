CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS carereceiver_booking_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id VARCHAR(32) NOT NULL UNIQUE REFERENCES carereceiver_dashboard_bookings(id) ON DELETE CASCADE,
  care_receiver_id UUID REFERENCES users(id) ON DELETE SET NULL,
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text VARCHAR(500) NOT NULL DEFAULT '',
  review_tags TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cr_booking_reviews_receiver
  ON carereceiver_booking_reviews(care_receiver_id, created_at DESC);
