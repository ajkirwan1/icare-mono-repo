CREATE TABLE IF NOT EXISTS admin_system_settings (
  id SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  platform_fee_percent NUMERIC(5, 2) NOT NULL DEFAULT 15,
  booking_service_fee_percent NUMERIC(5, 2) NOT NULL DEFAULT 5,
  identity_required BOOLEAN NOT NULL DEFAULT TRUE,
  right_to_work_required BOOLEAN NOT NULL DEFAULT TRUE,
  dbs_required BOOLEAN NOT NULL DEFAULT FALSE,
  updated_by TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO admin_system_settings (
  id,
  platform_fee_percent,
  booking_service_fee_percent,
  identity_required,
  right_to_work_required,
  dbs_required,
  updated_by
)
VALUES (1, 15, 5, TRUE, TRUE, FALSE, 'migration:015')
ON CONFLICT (id) DO NOTHING;
