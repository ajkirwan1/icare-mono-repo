CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS waitinglist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  email TEXT NOT NULL,
  postcode TEXT NOT NULL,
  name TEXT NOT NULL,
  client_type TEXT NOT NULL,
  type_of_care TEXT NOT NULL,
  years_of_experience INTEGER NOT NULL CHECK (years_of_experience >= 0),

  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_waitinglist_email_ci
  ON waitinglist (lower(email));
