CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS conversations (
  id TEXT PRIMARY KEY,
  encryption_mode TEXT NOT NULL DEFAULT 'none'
    CONSTRAINT conversations_encryption_mode_chk
    CHECK (encryption_mode IN ('none', 'e2ee')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE conversations
  ADD COLUMN IF NOT EXISTS encryption_mode TEXT NOT NULL DEFAULT 'none';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'conversations_encryption_mode_chk'
  ) THEN
    ALTER TABLE conversations
      ADD CONSTRAINT conversations_encryption_mode_chk
      CHECK (encryption_mode IN ('none', 'e2ee'));
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS conversation_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_role TEXT NOT NULL CHECK (sender_role IN ('caregiver', 'carereceiver')),
  body_encrypted TEXT,
  iv TEXT,
  body_plain TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT conversation_message_content_chk
    CHECK (
      (body_encrypted IS NOT NULL AND iv IS NOT NULL)
      OR body_plain IS NOT NULL
    )
);

CREATE INDEX IF NOT EXISTS idx_conversation_messages_conversation_created_at
  ON conversation_messages (conversation_id, created_at ASC);
