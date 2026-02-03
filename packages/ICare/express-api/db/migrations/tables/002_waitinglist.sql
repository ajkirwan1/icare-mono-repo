CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS waitinglist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Shared fields
  user_type TEXT NOT NULL CHECK (user_type IN ('receiver', 'caregiver')),
  first_name TEXT NOT NULL,
  last_name  TEXT NOT NULL,
  email      TEXT NOT NULL,
  email_ci   TEXT GENERATED ALWAYS AS (lower(email)) STORED,
  postcode   TEXT NOT NULL,

  -- Receiver-only fields (nullable for caregivers)
  care_for     TEXT NULL CHECK (care_for IS NULL OR care_for IN ('self', 'family', 'friend')),
  need_when    TEXT NULL CHECK (need_when IS NULL OR need_when IN ('soon', '1_3m', '3m_plus', 'not_sure')),
  type_of_care TEXT NULL CHECK (type_of_care IS NULL OR type_of_care IN ('hourly', 'live_in', 'night', 'dementia', 'companion')),

  -- Caregiver-only fields (nullable for receivers)
  years_of_experience TEXT NULL CHECK (years_of_experience IS NULL OR years_of_experience IN ('0_1', '1_3', '3_5', '5_plus')),
  caregiver_role TEXT NULL CHECK (caregiver_role IS NULL OR caregiver_role IN (
    'care_assistant',
    'support_worker',
    'live_in_carer',
    'home_carer',
    'nurse',
    'companion',
    'other'
  )),
  hours_per_week TEXT NULL CHECK (hours_per_week IS NULL OR hours_per_week IN ('lt_10', '10_20', '20_35', '35_plus')),

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Ensure the correct set of fields is present per user_type
  CONSTRAINT waitinglist_receiver_fields_chk CHECK (
    (user_type = 'receiver'
      AND care_for IS NOT NULL AND need_when IS NOT NULL AND type_of_care IS NOT NULL
      AND years_of_experience IS NULL AND caregiver_role IS NULL AND hours_per_week IS NULL)
    OR
    (user_type = 'caregiver'
      AND years_of_experience IS NOT NULL AND caregiver_role IS NOT NULL AND hours_per_week IS NOT NULL
      AND care_for IS NULL AND need_when IS NULL AND type_of_care IS NULL)
  )
);

-- Case-insensitive uniqueness by email + user type (supports ON CONFLICT)
CREATE UNIQUE INDEX IF NOT EXISTS waitinglist_email_ci_user_type_ux
  ON waitinglist (email_ci, user_type);

-- Optional: helpful index for ops/analytics
CREATE INDEX IF NOT EXISTS waitinglist_created_at_idx
  ON waitinglist (created_at DESC);
