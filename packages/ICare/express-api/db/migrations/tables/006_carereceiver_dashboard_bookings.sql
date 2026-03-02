CREATE TABLE IF NOT EXISTS carereceiver_dashboard_bookings (
  id VARCHAR(32) PRIMARY KEY,
  care_receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
  caregiver_name VARCHAR(200) NOT NULL,
  caregiver_photo_url TEXT,
  booking_date DATE,
  start_time TIME,
  status VARCHAR(30) NOT NULL
    CHECK (status IN ('requested', 'accepted', 'in_progress', 'completed', 'payment_released', 'cancelled')),
  response_deadline TIMESTAMP,
  conversation_id VARCHAR(64),
  completed_at TIMESTAMP,
  has_review BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cr_dash_bookings_status
  ON carereceiver_dashboard_bookings(status);

CREATE INDEX IF NOT EXISTS idx_cr_dash_bookings_receiver
  ON carereceiver_dashboard_bookings(care_receiver_id);

CREATE INDEX IF NOT EXISTS idx_cr_dash_bookings_dates
  ON carereceiver_dashboard_bookings(booking_date, start_time);

CREATE INDEX IF NOT EXISTS idx_cr_dash_bookings_completed
  ON carereceiver_dashboard_bookings(completed_at DESC);

INSERT INTO carereceiver_dashboard_bookings (
  id,
  care_receiver_id,
  caregiver_name,
  caregiver_photo_url,
  booking_date,
  start_time,
  status,
  response_deadline,
  conversation_id,
  completed_at,
  has_review,
  created_at,
  updated_at
)
VALUES
  (
    'bk-2026-2101',
    NULL,
    'Emma Wilson',
    '/images/avatars/female.webp',
    CURRENT_DATE + INTERVAL '1 day',
    TIME '14:00',
    'requested',
    NOW() + INTERVAL '20 hours',
    NULL,
    NULL,
    FALSE,
    NOW(),
    NOW()
  ),
  (
    'bk-2026-2102',
    NULL,
    'John Anderson',
    '/images/avatars/male.webp',
    CURRENT_DATE + INTERVAL '2 days',
    TIME '10:00',
    'requested',
    NOW() + INTERVAL '5 hours',
    NULL,
    NULL,
    FALSE,
    NOW(),
    NOW()
  ),
  (
    'bk-2026-2103',
    NULL,
    'Margaret Thompson',
    '/images/avatars/female.webp',
    CURRENT_DATE + INTERVAL '3 days',
    TIME '09:00',
    'requested',
    NOW() + INTERVAL '12 hours',
    NULL,
    NULL,
    FALSE,
    NOW(),
    NOW()
  ),
  (
    'bk-2026-2201',
    NULL,
    'Mary Thompson',
    '/images/avatars/female.webp',
    CURRENT_DATE + INTERVAL '2 days',
    TIME '10:00',
    'accepted',
    NULL,
    'conv-1002',
    NULL,
    FALSE,
    NOW(),
    NOW()
  ),
  (
    'bk-2026-2202',
    NULL,
    'Emma Wilson',
    '/images/avatars/female.webp',
    CURRENT_DATE + INTERVAL '4 days',
    TIME '14:00',
    'accepted',
    NULL,
    'conv-1012',
    NULL,
    FALSE,
    NOW(),
    NOW()
  ),
  (
    'bk-2026-2203',
    NULL,
    'John Anderson',
    '/images/avatars/male.webp',
    CURRENT_DATE,
    TIME '14:00',
    'in_progress',
    NULL,
    'conv-1011',
    NULL,
    FALSE,
    NOW(),
    NOW()
  ),
  (
    'bk-2026-0151',
    NULL,
    'Mary Thompson',
    '/images/avatars/female.webp',
    CURRENT_DATE - INTERVAL '2 days',
    TIME '14:00',
    'completed',
    NULL,
    'conv-1002',
    NOW() - INTERVAL '2 hours',
    FALSE,
    NOW(),
    NOW()
  ),
  (
    'bk-2026-0128',
    NULL,
    'Emma Wilson',
    '/images/avatars/female.webp',
    CURRENT_DATE - INTERVAL '3 days',
    TIME '10:00',
    'payment_released',
    NULL,
    'conv-1012',
    NOW() - INTERVAL '26 hours',
    FALSE,
    NOW(),
    NOW()
  )
ON CONFLICT (id) DO UPDATE SET
  caregiver_name = EXCLUDED.caregiver_name,
  caregiver_photo_url = EXCLUDED.caregiver_photo_url,
  booking_date = EXCLUDED.booking_date,
  start_time = EXCLUDED.start_time,
  status = EXCLUDED.status,
  response_deadline = EXCLUDED.response_deadline,
  conversation_id = EXCLUDED.conversation_id,
  completed_at = EXCLUDED.completed_at,
  has_review = EXCLUDED.has_review,
  updated_at = NOW();
