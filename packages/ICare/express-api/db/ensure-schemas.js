import { pool } from "./db.js";

export async function ensureAllSchemas() {
    // 1. Booking payment columns (depends on carereceiver_dashboard_bookings)
    await pool.query(`
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
    `);

    // 2. Messaging schema (depends on carereceiver_dashboard_bookings, users)
    await pool.query(`
        CREATE TABLE IF NOT EXISTS carereceiver_conversations (
          id VARCHAR(64) PRIMARY KEY,
          booking_id VARCHAR(32) REFERENCES carereceiver_dashboard_bookings(id) ON DELETE SET NULL,
          care_receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
          caregiver_id VARCHAR(64),
          caregiver_name VARCHAR(200) NOT NULL DEFAULT 'Caregiver',
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
    `);

    await pool.query(`
        ALTER TABLE carereceiver_conversations
          ADD COLUMN IF NOT EXISTS booking_id VARCHAR(32),
          ADD COLUMN IF NOT EXISTS care_receiver_id UUID,
          ADD COLUMN IF NOT EXISTS caregiver_id VARCHAR(64),
          ADD COLUMN IF NOT EXISTS caregiver_name VARCHAR(200) NOT NULL DEFAULT 'Caregiver',
          ADD COLUMN IF NOT EXISTS caregiver_photo_url TEXT,
          ADD COLUMN IF NOT EXISTS caregiver_phone VARCHAR(40),
          ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE,
          ADD COLUMN IF NOT EXISTS care_receiver_unread_count INTEGER DEFAULT 0,
          ADD COLUMN IF NOT EXISTS caregiver_unread_count INTEGER DEFAULT 0,
          ADD COLUMN IF NOT EXISTS last_message_preview TEXT,
          ADD COLUMN IF NOT EXISTS last_message_at TIMESTAMP,
          ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW(),
          ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW();
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS carereceiver_messages (
          id BIGSERIAL PRIMARY KEY,
          message_uid VARCHAR(64) UNIQUE,
          conversation_id VARCHAR(64) NOT NULL REFERENCES carereceiver_conversations(id) ON DELETE CASCADE,
          sender_role VARCHAR(20) NOT NULL
            CHECK (sender_role IN ('care_receiver', 'caregiver', 'system')),
          sender_name VARCHAR(200) NOT NULL DEFAULT 'Unknown',
          message_text TEXT NOT NULL,
          read_at TIMESTAMP,
          sent_at TIMESTAMP DEFAULT NOW(),
          is_system_message BOOLEAN DEFAULT FALSE,
          is_flagged BOOLEAN DEFAULT FALSE,
          deleted_at TIMESTAMP
        );
    `);

    await pool.query(`
        ALTER TABLE carereceiver_messages
          ADD COLUMN IF NOT EXISTS message_uid VARCHAR(64),
          ADD COLUMN IF NOT EXISTS sender_role VARCHAR(20) NOT NULL DEFAULT 'caregiver',
          ADD COLUMN IF NOT EXISTS sender_name VARCHAR(200) NOT NULL DEFAULT 'Unknown',
          ADD COLUMN IF NOT EXISTS message_text TEXT NOT NULL DEFAULT '',
          ADD COLUMN IF NOT EXISTS read_at TIMESTAMP,
          ADD COLUMN IF NOT EXISTS sent_at TIMESTAMP DEFAULT NOW(),
          ADD COLUMN IF NOT EXISTS is_system_message BOOLEAN DEFAULT FALSE,
          ADD COLUMN IF NOT EXISTS is_flagged BOOLEAN DEFAULT FALSE,
          ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP;
    `);

    await pool.query(`
        CREATE INDEX IF NOT EXISTS idx_cr_conversations_receiver
          ON carereceiver_conversations(care_receiver_id, last_message_at DESC);
    `);
    await pool.query(`
        CREATE INDEX IF NOT EXISTS idx_cr_conversations_booking
          ON carereceiver_conversations(booking_id);
    `);
    await pool.query(`
        CREATE INDEX IF NOT EXISTS idx_cr_messages_conversation_sent
          ON carereceiver_messages(conversation_id, sent_at DESC);
    `);

    // 3. Caregiver onboarding status table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS caregiver_onboarding_status (
        caregiver_key TEXT PRIMARY KEY,
        caregiver_id TEXT,
        caregiver_email TEXT,

        identity_status VARCHAR(32) NOT NULL DEFAULT 'not_submitted',
        identity_document_type VARCHAR(64),
        identity_file_name TEXT,
        identity_file_size INTEGER,
        identity_submitted_at TIMESTAMP,

        right_to_work_status VARCHAR(32) NOT NULL DEFAULT 'not_submitted',
        right_to_work_method VARCHAR(32),
        right_to_work_file_name TEXT,
        right_to_work_file_size INTEGER,
        right_to_work_submitted_at TIMESTAMP,

        dbs_status VARCHAR(32) NOT NULL DEFAULT 'not_submitted',
        dbs_certificate_number VARCHAR(128),
        dbs_issue_date DATE,
        dbs_file_name TEXT,
        dbs_file_size INTEGER,
        dbs_submitted_at TIMESTAMP,

        payout_status VARCHAR(32) NOT NULL DEFAULT 'not_connected',
        stripe_account_id VARCHAR(128),
        payouts_enabled BOOLEAN NOT NULL DEFAULT FALSE,
        charges_enabled BOOLEAN NOT NULL DEFAULT FALSE,

        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_caregiver_onboarding_status_email
      ON caregiver_onboarding_status (lower(caregiver_email));
    `);

    // 4. Admin verification queue table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_verification_queue (
        id BIGSERIAL PRIMARY KEY,
        caregiver_key TEXT NOT NULL,
        caregiver_id TEXT,
        caregiver_email TEXT,
        caregiver_name TEXT,
        verification_type VARCHAR(32) NOT NULL,
        status VARCHAR(32) NOT NULL DEFAULT 'pending',
        payload JSONB NOT NULL DEFAULT '{}'::jsonb,
        source_status VARCHAR(32) NOT NULL DEFAULT 'pending_review',
        submitted_at TIMESTAMP NOT NULL DEFAULT NOW(),
        reviewed_at TIMESTAMP,
        reviewed_by TEXT,
        review_notes TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        CONSTRAINT admin_verification_queue_unique_open_item UNIQUE (caregiver_key, verification_type, status)
      )
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_admin_verification_queue_status_submitted
      ON admin_verification_queue (status, submitted_at DESC);
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_admin_verification_queue_type_status
      ON admin_verification_queue (verification_type, status);
    `);

    // 5. Caregiver profile schema
    await pool.query(`
      CREATE TABLE IF NOT EXISTS caregiver_profiles (
        profile_id TEXT PRIMARY KEY,
        intro_video_url TEXT,
        intro_video_duration_sec INTEGER
          CONSTRAINT caregiver_intro_video_duration_chk
          CHECK (intro_video_duration_sec IS NULL OR (intro_video_duration_sec >= 0 AND intro_video_duration_sec <= 30)),
        intro_video_mime TEXT,
        intro_video_size_bytes BIGINT
          CONSTRAINT caregiver_intro_video_size_chk
          CHECK (intro_video_size_bytes IS NULL OR intro_video_size_bytes >= 0),
        profile_photo_url TEXT,
        profile_data JSONB NOT NULL DEFAULT '{}'::jsonb,
        updated_by TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);

    await pool.query(`
      ALTER TABLE caregiver_profiles
        ADD COLUMN IF NOT EXISTS intro_video_url TEXT,
        ADD COLUMN IF NOT EXISTS intro_video_duration_sec INTEGER,
        ADD COLUMN IF NOT EXISTS intro_video_mime TEXT,
        ADD COLUMN IF NOT EXISTS intro_video_size_bytes BIGINT,
        ADD COLUMN IF NOT EXISTS profile_photo_url TEXT,
        ADD COLUMN IF NOT EXISTS profile_data JSONB NOT NULL DEFAULT '{}'::jsonb,
        ADD COLUMN IF NOT EXISTS updated_by TEXT,
        ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    `);

    // 6. Care receiver settings schema
    await pool.query(`
      CREATE TABLE IF NOT EXISTS carereceiver_settings (
        user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        booking_updates_email BOOLEAN NOT NULL DEFAULT TRUE,
        booking_reminders_email BOOLEAN NOT NULL DEFAULT TRUE,
        new_messages_email BOOLEAN NOT NULL DEFAULT TRUE,
        product_announcements_email BOOLEAN NOT NULL DEFAULT FALSE,
        stripe_customer_id VARCHAR(128),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    await pool.query(`
      ALTER TABLE carereceiver_settings
        ADD COLUMN IF NOT EXISTS booking_updates_email BOOLEAN NOT NULL DEFAULT TRUE,
        ADD COLUMN IF NOT EXISTS booking_reminders_email BOOLEAN NOT NULL DEFAULT TRUE,
        ADD COLUMN IF NOT EXISTS new_messages_email BOOLEAN NOT NULL DEFAULT TRUE,
        ADD COLUMN IF NOT EXISTS product_announcements_email BOOLEAN NOT NULL DEFAULT FALSE,
        ADD COLUMN IF NOT EXISTS stripe_customer_id VARCHAR(128),
        ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    `);

    // 7. Admin system settings table + seed
    await pool.query(`
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
      )
    `);

    const feePercent = parseFeePercent();
    await pool.query(
        `
        INSERT INTO admin_system_settings (
          id,
          platform_fee_percent,
          booking_service_fee_percent,
          identity_required,
          right_to_work_required,
          dbs_required,
          updated_by
        ) VALUES (1, $1, 5, TRUE, TRUE, FALSE, 'system:init')
        ON CONFLICT (id) DO NOTHING
        `,
        [feePercent]
    );
}

function parseFeePercent() {
    const parsed = Number(process.env.STRIPE_PLATFORM_FEE_PERCENT || 15);
    if (!Number.isFinite(parsed) || parsed < 0 || parsed > 100) {
        return 15;
    }
    return Math.round(parsed * 100) / 100;
}
