CREATE EXTENSION IF NOT EXISTS "pgcrypto";

ALTER TABLE conversations
  ADD COLUMN IF NOT EXISTS contact_protection_enabled BOOLEAN NOT NULL DEFAULT TRUE;

CREATE TABLE IF NOT EXISTS conversation_moderation_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_role TEXT NOT NULL CHECK (sender_role IN ('caregiver', 'carereceiver')),
  user_id TEXT,
  rule_triggered TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_moderation_events_conversation_sender_created
  ON conversation_moderation_events (conversation_id, sender_role, created_at DESC);

CREATE TABLE IF NOT EXISTS conversation_participant_locks (
  conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_role TEXT NOT NULL CHECK (sender_role IN ('caregiver', 'carereceiver')),
  blocked_until TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (conversation_id, sender_role)
);
