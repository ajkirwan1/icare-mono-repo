CREATE TABLE IF NOT EXISTS carereceiver_conversations (
  id VARCHAR(64) PRIMARY KEY,
  booking_id VARCHAR(32) REFERENCES carereceiver_dashboard_bookings(id) ON DELETE SET NULL,
  care_receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
  caregiver_id VARCHAR(64),
  caregiver_name VARCHAR(200) NOT NULL,
  caregiver_photo_url TEXT,
  caregiver_phone VARCHAR(40),
  is_active BOOLEAN DEFAULT TRUE,
  care_receiver_unread_count INTEGER DEFAULT 0,
  caregiver_unread_count INTEGER DEFAULT 0,
  last_message_preview TEXT,
  last_message_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cr_conversations_receiver
  ON carereceiver_conversations(care_receiver_id, last_message_at DESC);

CREATE INDEX IF NOT EXISTS idx_cr_conversations_booking
  ON carereceiver_conversations(booking_id);

CREATE TABLE IF NOT EXISTS carereceiver_messages (
  id BIGSERIAL PRIMARY KEY,
  message_uid VARCHAR(64) UNIQUE,
  conversation_id VARCHAR(64) NOT NULL REFERENCES carereceiver_conversations(id) ON DELETE CASCADE,
  sender_role VARCHAR(20) NOT NULL
    CHECK (sender_role IN ('care_receiver', 'caregiver', 'system')),
  sender_name VARCHAR(200) NOT NULL,
  message_text TEXT NOT NULL,
  read_at TIMESTAMP,
  sent_at TIMESTAMP DEFAULT NOW(),
  is_system_message BOOLEAN DEFAULT FALSE,
  is_flagged BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_cr_messages_conversation_sent
  ON carereceiver_messages(conversation_id, sent_at DESC);

INSERT INTO carereceiver_conversations (
  id,
  booking_id,
  care_receiver_id,
  caregiver_id,
  caregiver_name,
  caregiver_photo_url,
  caregiver_phone,
  is_active,
  created_at,
  updated_at
)
SELECT DISTINCT ON (b.conversation_id)
  b.conversation_id,
  b.id,
  b.care_receiver_id,
  b.caregiver_id,
  b.caregiver_name,
  b.caregiver_photo_url,
  b.caregiver_phone,
  TRUE,
  COALESCE(b.requested_at, b.created_at, NOW()),
  COALESCE(b.updated_at, NOW())
FROM carereceiver_dashboard_bookings b
WHERE b.conversation_id IS NOT NULL
ORDER BY
  b.conversation_id,
  (COALESCE(to_jsonb(b)->>'caregiver_id', '') <> '') DESC,
  (COALESCE(to_jsonb(b)->>'caregiver_phone', '') <> '') DESC,
  COALESCE(b.updated_at, b.created_at, NOW()) DESC,
  b.id DESC
ON CONFLICT (id) DO UPDATE SET
  booking_id = EXCLUDED.booking_id,
  care_receiver_id = EXCLUDED.care_receiver_id,
  caregiver_id = EXCLUDED.caregiver_id,
  caregiver_name = EXCLUDED.caregiver_name,
  caregiver_photo_url = EXCLUDED.caregiver_photo_url,
  caregiver_phone = EXCLUDED.caregiver_phone,
  updated_at = NOW();

INSERT INTO carereceiver_messages (
  message_uid,
  conversation_id,
  sender_role,
  sender_name,
  message_text,
  read_at,
  sent_at,
  is_system_message,
  is_flagged
)
VALUES
  ('seed-conv-1011-1', 'conv-1011', 'caregiver', 'John Anderson', 'Hi, I am on my way and should arrive in around 10 minutes.', NOW() - INTERVAL '2 hours 20 minutes', NOW() - INTERVAL '2 hours 25 minutes', FALSE, FALSE),
  ('seed-conv-1011-2', 'conv-1011', 'care_receiver', 'You', 'Perfect, thank you. Please ring the front bell when you arrive.', NOW() - INTERVAL '2 hours 15 minutes', NOW() - INTERVAL '2 hours 18 minutes', FALSE, FALSE),
  ('seed-conv-1011-3', 'conv-1011', 'caregiver', 'John Anderson', 'Will do. Looking forward to this afternoon session.', NULL, NOW() - INTERVAL '2 hours 10 minutes', FALSE, FALSE),

  ('seed-conv-1002-1', 'conv-1002', 'caregiver', 'Mary Thompson', 'Thank you again for the lovely visit yesterday.', NOW() - INTERVAL '1 day 3 hours', NOW() - INTERVAL '1 day 3 hours 5 minutes', FALSE, FALSE),
  ('seed-conv-1002-2', 'conv-1002', 'care_receiver', 'You', 'Thank you Mary, mum was very happy. See you next week.', NOW() - INTERVAL '1 day 2 hours 50 minutes', NOW() - INTERVAL '1 day 3 hours 1 minute', FALSE, FALSE),

  ('seed-conv-1012-1', 'conv-1012', 'caregiver', 'Emma Wilson', 'I can help with light housework on Friday at 2 PM.', NULL, NOW() - INTERVAL '5 hours', FALSE, FALSE)
ON CONFLICT (message_uid) DO NOTHING;

UPDATE carereceiver_conversations c
SET
  last_message_preview = COALESCE((
    SELECT m.message_text
    FROM carereceiver_messages m
    WHERE m.conversation_id = c.id
      AND m.deleted_at IS NULL
    ORDER BY m.sent_at DESC
    LIMIT 1
  ), c.last_message_preview),
  last_message_at = COALESCE((
    SELECT m.sent_at
    FROM carereceiver_messages m
    WHERE m.conversation_id = c.id
      AND m.deleted_at IS NULL
    ORDER BY m.sent_at DESC
    LIMIT 1
  ), c.last_message_at),
  care_receiver_unread_count = (
    SELECT COUNT(*)::int
    FROM carereceiver_messages m
    WHERE m.conversation_id = c.id
      AND m.sender_role = 'caregiver'
      AND m.read_at IS NULL
      AND m.deleted_at IS NULL
  ),
  updated_at = NOW()
WHERE c.id IN ('conv-1011', 'conv-1002', 'conv-1012');
