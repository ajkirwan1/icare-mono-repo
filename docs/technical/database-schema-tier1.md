# Tier 1 Database Schema Design

**Document Purpose**: Complete PostgreSQL database schema specification for the Tier 1 UK elderly care marketplace (companionship-only services).

**Document Owner**: Technical Architect
**Created**: 2026-02-06
**Status**: CANONICAL
**Tier**: Tier 1 (Companionship MVP)
**Database**: PostgreSQL 14+ with PostGIS extension

---

## Table of Contents

1. [Overview](#1-overview)
2. [Schema Design Principles](#2-schema-design-principles)
3. [Core Tables](#3-core-tables)
4. [Booking Tables](#4-booking-tables)
5. [Messaging Tables](#5-messaging-tables)
6. [Verification Tables](#6-verification-tables)
7. [Payment Tables](#7-payment-tables)
8. [Admin Tables](#8-admin-tables)
9. [Review Tables](#9-review-tables)
10. [PostGIS Integration](#10-postgis-integration)
11. [Migration Strategy](#11-migration-strategy)
12. [Sample SQL](#12-sample-sql)

---

## 1. Overview

### 1.1 Purpose

This schema supports a **companionship-only marketplace** (Tier 1) where care receivers and family members connect with independent caregivers for non-medical services. The schema is designed to:

- Handle standard personal data only (GDPR Article 6 lawful basis)
- Support tier progression without breaking changes
- Enable geographic search via PostGIS
- Maintain comprehensive audit trails for safeguarding
- Support Stripe payment processing and payouts

### 1.2 Tier 1 Scope

**Services at Tier 1**:
- Companionship (conversation, activities)
- Light housework and cleaning
- Shopping and errands
- Meal preparation (no feeding assistance)
- Transportation (if caregiver has vehicle)

**Data Constraints**:
- NO health data (special category)
- NO medical conditions
- NO care skills requirements
- NO health-inferring service preferences
- DBS checks VOLUNTARY (not regulated activity)

**See**: `/docs/ROADMAP.md` for complete tier definitions (FDR-003)

### 1.3 Technology Stack

- **Database**: PostgreSQL 14+
- **Extensions**: PostGIS (geographic search), uuid-ossp (UUID generation)
- **ORM**: Prisma (recommended) or TypeORM
- **Hosting**: AWS RDS PostgreSQL or equivalent (UK/EU data residency)
- **Backup**: Automated daily backups with 7-day retention minimum

---

## 2. Schema Design Principles

### 2.1 Tier Isolation

**Principle**: Tier 1 schema must NOT require Tier 2+ infrastructure.

**Implementation**:
- No `medical_conditions` table at Tier 1
- No `care_skills` or `qualification_verifications` tables at Tier 1
- Service type filtering via ENUM (companionship values only)
- Schema can expand via ALTER TABLE (add nullable columns for Tier 2+)

**Example**:
```sql
-- Tier 1: Simple service type ENUM
CREATE TYPE service_type AS ENUM ('companionship', 'light_housework', 'shopping', 'meal_prep', 'transportation');

-- Tier 2: Add new values to existing ENUM
ALTER TYPE service_type ADD VALUE 'personal_care';
ALTER TYPE service_type ADD VALUE 'medication_assistance';
```

### 2.2 Data Protection by Design

**Principle**: GDPR compliance built into schema structure.

**Implementation**:
- `deleted_at` columns for soft deletes (GDPR right to erasure)
- Audit logging for all sensitive operations
- Encrypted columns for PII (name, email, phone via application layer)
- Data minimization: Only store what's legally required
- Retention policies enforced via cron jobs

**GDPR Compliance Features**:
- All personal data encrypted at rest (AWS RDS encryption)
- Data retention periods defined per table
- Anonymization on user deletion (replace PII with pseudonyms)
- Audit trail retained 7 years (financial/safeguarding compliance)

### 2.3 Self-Employed Caregiver Model

**Principle**: Caregivers are independent contractors, NOT employees.

**Implementation**:
- No employment-related fields (payroll, employee ID, scheduling control)
- Caregivers set own rates (`hourly_rate_gbp`)
- Caregivers control availability (`caregiver_availability` table)
- Platform does NOT assign bookings (caregivers accept/decline)
- Commission model tracked in `platform_commission_rate`

### 2.4 Performance Optimization

**Indexes**:
- Geographic search: PostGIS GIST index on location
- Booking queries: Composite indexes on `(care_receiver_id, status)`, `(caregiver_id, status)`
- Verification queue: Index on `verification_status` and `created_at`
- Message queries: Index on `conversation_id` and `created_at`

**Partitioning** (future):
- Partition `audit_logs` by year (reduce query load)
- Partition `bookings` by year after 100K+ bookings

---

## 3. Core Tables

### 3.1 users (Base User Table)

**Purpose**: Shared authentication table for all user types.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Authentication
  email VARCHAR(255) NOT NULL UNIQUE,
  email_verified BOOLEAN DEFAULT FALSE,
  email_verified_at TIMESTAMP,
  password_hash VARCHAR(255) NOT NULL, -- bcrypt

  -- Phone Verification (Tier 1 requirement)
  phone VARCHAR(20),
  phone_verified BOOLEAN DEFAULT FALSE,
  phone_verified_at TIMESTAMP,
  phone_country_code VARCHAR(5) DEFAULT '+44', -- UK default

  -- User Type
  user_type VARCHAR(20) NOT NULL, -- 'care_receiver', 'family', 'caregiver', 'admin'

  -- Profile
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  date_of_birth DATE,

  -- Account Status
  account_status VARCHAR(20) DEFAULT 'active', -- 'active', 'suspended', 'banned', 'deactivated'
  suspension_end_date TIMESTAMP, -- NULL if not suspended
  ban_reason TEXT,

  -- Security
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  two_factor_secret VARCHAR(255), -- TOTP secret (encrypted)
  failed_login_attempts INTEGER DEFAULT 0,
  last_failed_login TIMESTAMP,
  account_locked_until TIMESTAMP,

  -- Session Management
  last_login_at TIMESTAMP,
  last_login_ip INET,

  -- GDPR
  gdpr_consent BOOLEAN DEFAULT FALSE,
  gdpr_consent_date TIMESTAMP,
  marketing_consent BOOLEAN DEFAULT FALSE,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP -- soft delete
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_user_type ON users(user_type);
CREATE INDEX idx_users_account_status ON users(account_status);
CREATE INDEX idx_users_phone ON users(phone);
```

**GDPR Considerations**:
- On user deletion: Set `deleted_at`, anonymize PII (replace name with "User [ID]", hash email)
- Retain audit logs with pseudonymized user ID
- Delete encrypted data (2FA secret, phone) after 30-day grace period

---

### 3.2 care_receivers (Care Receiver Profiles)

**Purpose**: Profiles for care receivers and family members acting as proxies.

```sql
CREATE TABLE care_receivers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Profile Type
  is_family_member BOOLEAN DEFAULT FALSE, -- TRUE if registering on behalf of someone
  care_receiver_name VARCHAR(200), -- If family member, name of actual care receiver
  relationship VARCHAR(50), -- If family member: 'daughter', 'son', 'spouse', 'friend', etc.

  -- Location (for search)
  postcode VARCHAR(10) NOT NULL,
  latitude DECIMAL(10, 8), -- PostGIS
  longitude DECIMAL(11, 8), -- PostGIS
  address_line1 VARCHAR(255), -- Shared with caregiver AFTER booking accepted
  address_line2 VARCHAR(255),
  city VARCHAR(100),
  county VARCHAR(100),

  -- Emergency Contact
  emergency_contact_name VARCHAR(200) NOT NULL,
  emergency_contact_phone VARCHAR(20) NOT NULL,
  emergency_contact_relationship VARCHAR(50),

  -- Service Preferences (Tier 1: Generic only)
  preferred_services TEXT[], -- ['companionship', 'light_housework', 'shopping']
  preferred_caregiver_gender VARCHAR(20), -- 'male', 'female', 'no_preference'
  preferred_languages TEXT[], -- ['english', 'polish', 'welsh']

  -- Booking Preferences
  max_hourly_rate DECIMAL(5, 2), -- Search filter default
  preferred_availability JSONB, -- {'monday': ['morning', 'afternoon'], 'wednesday': ['evening']}

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_care_receivers_user_id ON care_receivers(user_id);
CREATE INDEX idx_care_receivers_postcode ON care_receivers(postcode);

-- PostGIS Index (geographic search)
CREATE INDEX idx_care_receivers_location ON care_receivers USING GIST (ST_MakePoint(longitude, latitude));
```

**Tier 1 Constraints**:
- NO `medical_conditions` field (special category data)
- NO `care_needs_assessment` field (health data)
- NO `risk_level` field (health-inferring)
- `preferred_services` limited to companionship types only

**Tier 2+ Migration**:
- Add `care_skills_required TEXT[]` (Tier 2: personal care skills)
- Add `insurance_preferences JSONB` (Tier 2: caregiver insurance requirements)

---

### 3.3 caregivers (Caregiver Profiles)

**Purpose**: Professional caregiver profiles with verification status and service offerings.

```sql
CREATE TABLE caregivers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Profile
  profile_photo_url TEXT, -- S3 URL
  bio TEXT, -- Max 500 characters (enforced at application level)
  years_experience INTEGER, -- e.g., 5

  -- Location (for search)
  postcode VARCHAR(10) NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  service_radius_miles INTEGER DEFAULT 15, -- How far caregiver will travel

  -- Services Offered (Tier 1: Companionship only)
  services_offered TEXT[] DEFAULT '{}', -- ['companionship', 'light_housework', 'shopping', 'meal_prep', 'transportation']

  -- Pricing
  hourly_rate_gbp DECIMAL(5, 2) NOT NULL, -- e.g., 20.00
  platform_commission_rate DECIMAL(5, 2) DEFAULT 15.00, -- Percentage deducted by platform

  -- Verification Status (Tier 1)
  id_verified BOOLEAN DEFAULT FALSE,
  id_verified_date TIMESTAMP,
  right_to_work_verified BOOLEAN DEFAULT FALSE,
  right_to_work_verified_date TIMESTAMP,
  dbs_verified BOOLEAN DEFAULT FALSE, -- VOLUNTARY at Tier 1
  dbs_verified_date TIMESTAMP,
  phone_verified BOOLEAN DEFAULT FALSE,

  -- Languages
  languages_spoken TEXT[] DEFAULT '{"english"}',

  -- Demographics
  gender VARCHAR(20), -- 'male', 'female', 'non_binary', 'prefer_not_to_say'

  -- Transportation
  has_vehicle BOOLEAN DEFAULT FALSE,
  has_vehicle_insurance BOOLEAN DEFAULT FALSE, -- Required if transportation offered

  -- Ratings & Reviews
  average_rating DECIMAL(3, 2) DEFAULT 0.0, -- e.g., 4.75 (calculated from reviews)
  total_reviews INTEGER DEFAULT 0,

  -- Availability Requirements
  minimum_booking_hours INTEGER DEFAULT 2, -- Tier 1 default: 2 hours minimum

  -- Profile Status
  profile_status VARCHAR(20) DEFAULT 'draft', -- 'draft', 'pending_verification', 'approved', 'suspended', 'deactivated'
  profile_approved_date TIMESTAMP,
  profile_approved_by UUID REFERENCES users(id), -- Admin who approved

  -- Stripe Connect
  stripe_connect_account_id VARCHAR(255), -- Stripe Connected Account ID
  stripe_onboarding_complete BOOLEAN DEFAULT FALSE,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_caregivers_user_id ON caregivers(user_id);
CREATE INDEX idx_caregivers_postcode ON caregivers(postcode);
CREATE INDEX idx_caregivers_hourly_rate ON caregivers(hourly_rate_gbp);
CREATE INDEX idx_caregivers_profile_status ON caregivers(profile_status);
CREATE INDEX idx_caregivers_average_rating ON caregivers(average_rating);
CREATE INDEX idx_caregivers_verification ON caregivers(id_verified, right_to_work_verified, dbs_verified);

-- PostGIS Index (geographic search)
CREATE INDEX idx_caregivers_location ON caregivers USING GIST (ST_MakePoint(longitude, latitude));
```

**Search Query Pattern** (distance-based):
```sql
-- Find caregivers within 10 miles of care receiver at SW1A 1AA (51.5014, -0.1419)
SELECT
  c.*,
  ST_Distance(
    ST_MakePoint(c.longitude, c.latitude)::geography,
    ST_MakePoint(-0.1419, 51.5014)::geography
  ) / 1609.34 AS distance_miles -- Convert meters to miles
FROM caregivers c
WHERE
  c.profile_status = 'approved'
  AND ST_DWithin(
    ST_MakePoint(c.longitude, c.latitude)::geography,
    ST_MakePoint(-0.1419, 51.5014)::geography,
    16093.4 -- 10 miles in meters
  )
ORDER BY distance_miles ASC
LIMIT 12;
```

**Tier 2+ Migration**:
- Add `qualifications TEXT[]` (Tier 2: 'NVQ Level 2', 'Care Certificate')
- Add `care_skills TEXT[]` (Tier 2: 'personal_care', 'dementia_support')
- Add `insurance_verified BOOLEAN` (Tier 2: public liability insurance)

---

### 3.4 caregiver_availability (Weekly Availability)

**Purpose**: Store caregiver availability patterns for search filtering and booking validation.

```sql
CREATE TABLE caregiver_availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  caregiver_id UUID NOT NULL REFERENCES caregivers(id) ON DELETE CASCADE,

  -- Recurring Availability (weekly pattern)
  day_of_week INTEGER, -- 0=Sunday, 1=Monday, ..., 6=Saturday (NULL for one-off dates)
  start_time TIME NOT NULL, -- e.g., 09:00:00
  end_time TIME NOT NULL, -- e.g., 17:00:00
  is_recurring BOOLEAN DEFAULT TRUE, -- TRUE for weekly pattern

  -- One-Off Availability (specific dates)
  specific_date DATE, -- Non-NULL for one-off availability

  -- Unavailability Blocks (holidays, appointments)
  is_unavailable BOOLEAN DEFAULT FALSE, -- TRUE to block time
  unavailable_reason VARCHAR(255), -- 'holiday', 'personal', 'booked'

  -- Linked Booking (if time blocked by booking)
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_availability_caregiver ON caregiver_availability(caregiver_id);
CREATE INDEX idx_availability_day ON caregiver_availability(day_of_week);
CREATE INDEX idx_availability_date ON caregiver_availability(specific_date);
CREATE INDEX idx_availability_booking ON caregiver_availability(booking_id);
```

**Availability Query Pattern**:
```sql
-- Check if caregiver available on Monday mornings
SELECT * FROM caregiver_availability
WHERE caregiver_id = '...'
  AND day_of_week = 1 -- Monday
  AND start_time <= '12:00:00'
  AND end_time >= '09:00:00'
  AND is_unavailable = FALSE;
```

---

## 4. Booking Tables

### 4.1 bookings (Core Booking Records)

**Purpose**: Central booking table tracking lifecycle from request to completion.

```sql
CREATE TYPE booking_status AS ENUM (
  'requested',                 -- Awaiting caregiver response (24h window)
  'accepted',                  -- Confirmed, payment captured
  'in_progress',               -- Session started
  'completed',                 -- Session finished, awaiting confirmation
  'payment_released',          -- Payment released to caregiver
  'reviewed',                  -- Care receiver left review
  'declined',                  -- Caregiver declined request
  'expired',                   -- No caregiver response after 24h
  'cancelled',                 -- Cancelled by care receiver
  'cancelled_by_caregiver',    -- Cancelled by caregiver
  'no_show_caregiver',         -- Caregiver no-show confirmed
  'no_show_care_receiver',     -- Care receiver no-show confirmed
  'disputed',                  -- Dispute raised, admin review required
  'dispute_resolved'           -- Dispute resolved by admin
);

CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Parties
  care_receiver_id UUID NOT NULL REFERENCES care_receivers(id),
  caregiver_id UUID NOT NULL REFERENCES caregivers(id),

  -- Status
  status booking_status DEFAULT 'requested',

  -- Booking Details
  booking_date DATE NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_hours DECIMAL(4, 2) NOT NULL, -- e.g., 3.5

  -- Service Details (Tier 1: Companionship only)
  service_types TEXT[] NOT NULL, -- ['companionship', 'light_housework']
  special_requests TEXT, -- Max 500 chars

  -- Location
  care_receiver_postcode VARCHAR(10) NOT NULL,
  care_receiver_full_address TEXT, -- Shared with caregiver AFTER acceptance

  -- Emergency Contact (shared AFTER acceptance)
  emergency_contact_name VARCHAR(255),
  emergency_contact_phone VARCHAR(20),
  emergency_contact_relationship VARCHAR(100),

  -- Pricing
  hourly_rate DECIMAL(10, 2) NOT NULL, -- Caregiver rate at time of booking
  platform_service_fee DECIMAL(10, 2) NOT NULL, -- Care receiver pays (e.g., 5%)
  platform_commission_rate DECIMAL(5, 2) NOT NULL, -- % deducted from caregiver
  total_care_receiver_charge DECIMAL(10, 2) NOT NULL, -- Total charged to care receiver
  caregiver_earnings DECIMAL(10, 2) NOT NULL, -- After commission

  -- Payment (Stripe)
  payment_intent_id VARCHAR(255), -- Stripe Payment Intent ID
  payment_status VARCHAR(20) DEFAULT 'pending', -- 'authorized', 'captured', 'refunded', 'disputed'
  refund_amount DECIMAL(10, 2),
  stripe_transfer_id VARCHAR(255), -- Stripe Transfer ID (payout to caregiver)

  -- State Tracking Timestamps
  requested_at TIMESTAMP DEFAULT NOW(),
  accepted_at TIMESTAMP,
  declined_at TIMESTAMP,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  confirmed_at TIMESTAMP,
  payment_released_at TIMESTAMP,
  reviewed_at TIMESTAMP,
  cancelled_at TIMESTAMP,

  -- Cancellation Data
  cancelled_by UUID REFERENCES users(id), -- User who cancelled
  cancellation_reason VARCHAR(255),
  cancellation_details TEXT,

  -- Decline Data
  decline_reason VARCHAR(255),
  decline_message TEXT,

  -- Completion Data
  caregiver_session_notes TEXT, -- Private, admin-visible only

  -- Dispute Data
  dispute_raised_at TIMESTAMP,
  dispute_reason VARCHAR(255),
  dispute_description TEXT,
  dispute_resolution TEXT, -- Admin decision rationale
  dispute_outcome VARCHAR(50), -- 'full_refund', 'partial_refund', 'no_refund'
  dispute_resolved_by UUID REFERENCES users(id), -- Admin who resolved

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_bookings_care_receiver ON bookings(care_receiver_id, status);
CREATE INDEX idx_bookings_caregiver ON bookings(caregiver_id, status);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_start_time ON bookings(start_time);
CREATE INDEX idx_bookings_payment_status ON bookings(payment_status);

-- Composite index for admin queries
CREATE INDEX idx_bookings_admin_queue ON bookings(status, created_at DESC) WHERE status IN ('disputed', 'no_show_caregiver', 'no_show_care_receiver');
```

**Business Rules**:
- Minimum booking duration: 2 hours (Tier 1)
- Maximum booking duration: 8 hours (Tier 1, no overnight care)
- Caregiver response window: 24 hours (auto-decline after)
- Payment release window: 48 hours after completion (auto-release if no dispute)

---

### 4.2 booking_state_history (Audit Trail)

**Purpose**: Immutable audit trail of all booking state transitions for safeguarding investigations.

```sql
CREATE TABLE booking_state_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,

  -- State Transition
  from_status VARCHAR(50),
  to_status VARCHAR(50) NOT NULL,

  -- Who/What Triggered Change
  triggered_by UUID REFERENCES users(id), -- NULL if system-triggered
  trigger_reason TEXT,

  -- Metadata
  timestamp TIMESTAMP DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT
);

-- Indexes
CREATE INDEX idx_state_history_booking ON booking_state_history(booking_id, timestamp DESC);
CREATE INDEX idx_state_history_timestamp ON booking_state_history(timestamp);
```

**Retention**: 7 years (financial audit and safeguarding compliance)

---

## 5. Messaging Tables

### 5.1 conversations (Message Thread Metadata)

**Purpose**: Group messages by booking context.

```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Participants
  care_receiver_id UUID NOT NULL REFERENCES care_receivers(id),
  caregiver_id UUID NOT NULL REFERENCES caregivers(id),

  -- Context
  booking_id UUID REFERENCES bookings(id), -- NULL for pre-booking inquiries

  -- Status
  is_active BOOLEAN DEFAULT TRUE, -- FALSE if archived

  -- Last Activity
  last_message_at TIMESTAMP,
  last_message_preview TEXT, -- First 100 chars for inbox display

  -- Unread Counts
  care_receiver_unread_count INTEGER DEFAULT 0,
  caregiver_unread_count INTEGER DEFAULT 0,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_conversations_care_receiver ON conversations(care_receiver_id, last_message_at DESC);
CREATE INDEX idx_conversations_caregiver ON conversations(caregiver_id, last_message_at DESC);
CREATE INDEX idx_conversations_booking ON conversations(booking_id);
```

---

### 5.2 messages (Individual Messages)

**Purpose**: Store message content with safeguarding moderation flags.

```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,

  -- Sender/Recipient
  sender_id UUID NOT NULL REFERENCES users(id),
  recipient_id UUID NOT NULL REFERENCES users(id),

  -- Content
  message_text TEXT NOT NULL, -- Max 2000 chars

  -- Moderation
  is_flagged BOOLEAN DEFAULT FALSE, -- TRUE if content filter triggered
  flag_reason TEXT, -- 'off_platform_payment', 'safeguarding_keyword', 'profanity'
  reviewed_by_admin UUID REFERENCES users(id),
  reviewed_at TIMESTAMP,

  -- Read Status
  read_at TIMESTAMP, -- NULL if unread

  -- System Message
  is_system_message BOOLEAN DEFAULT FALSE, -- TRUE for automated messages

  -- Metadata
  sent_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_messages_conversation ON messages(conversation_id, sent_at DESC);
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_flagged ON messages(is_flagged) WHERE is_flagged = TRUE;
```

**Content Filtering**:
- Application-layer filters check for prohibited content (email addresses, phone numbers, payment keywords)
- Flagged messages visible to admin for review
- Off-platform payment requests trigger safeguarding alerts

**Retention**: Messages retained 2 years after conversation closure, then anonymized (replace text with "[DELETED]")

---

## 6. Verification Tables

### 6.1 verification_documents (Temporary Document Storage)

**Purpose**: Store uploaded verification documents temporarily during admin review.

```sql
CREATE TYPE document_type AS ENUM (
  'id_document',           -- Passport, driving license
  'selfie',                -- Liveness check photo
  'dbs_certificate',       -- DBS certificate (voluntary at Tier 1)
  'right_to_work_document' -- UKVI share code proof
);

CREATE TABLE verification_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  caregiver_id UUID NOT NULL REFERENCES caregivers(id) ON DELETE CASCADE,

  -- Document Details
  document_type document_type NOT NULL,
  file_url TEXT NOT NULL, -- S3 encrypted URL
  file_size_bytes INTEGER,
  mime_type VARCHAR(50),

  -- Verification Status
  verification_status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  verified_by UUID REFERENCES users(id), -- Admin who reviewed
  verified_at TIMESTAMP,
  rejection_reason TEXT,

  -- Automated Verification (Stripe Identity)
  stripe_verification_id VARCHAR(255),
  stripe_verification_result JSONB, -- Stripe Identity response

  -- Metadata
  uploaded_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP -- Auto-deleted 7 days after verification (GDPR data minimization)
);

-- Indexes
CREATE INDEX idx_verification_docs_caregiver ON verification_documents(caregiver_id);
CREATE INDEX idx_verification_docs_status ON verification_documents(verification_status);
CREATE INDEX idx_verification_docs_type ON verification_documents(document_type);
```

**Retention Policy**:
- Document images deleted 7 days after verification (approved or rejected)
- Verification status (TRUE/FALSE) retained indefinitely
- Verification dates retained indefinitely (audit trail)

---

### 6.2 dbs_checks (DBS Certificate Records)

**Purpose**: Track voluntary DBS submissions at Tier 1.

```sql
CREATE TYPE dbs_level AS ENUM ('basic', 'standard', 'enhanced');

CREATE TABLE dbs_checks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  caregiver_id UUID NOT NULL REFERENCES caregivers(id) ON DELETE CASCADE,

  -- Certificate Details
  certificate_number VARCHAR(50) NOT NULL UNIQUE,
  issue_date DATE NOT NULL,
  dbs_level dbs_level NOT NULL,

  -- DBS Update Service
  dbs_update_service_subscribed BOOLEAN DEFAULT FALSE,
  dbs_update_service_last_checked TIMESTAMP,

  -- Verification
  verified_by UUID REFERENCES users(id),
  verified_at TIMESTAMP,
  verification_notes TEXT,

  -- Expiry Tracking (3-year best practice)
  recommended_renewal_date DATE, -- issue_date + 3 years
  renewal_reminder_sent BOOLEAN DEFAULT FALSE,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_dbs_checks_caregiver ON dbs_checks(caregiver_id);
CREATE INDEX idx_dbs_checks_certificate_number ON dbs_checks(certificate_number);
CREATE INDEX idx_dbs_checks_renewal_date ON dbs_checks(recommended_renewal_date);
```

**Business Rules**:
- DBS checks VOLUNTARY at Tier 1 (companionship not regulated activity)
- DBS becomes MANDATORY at Tier 2 (personal care services)
- 3-year renewal recommended (industry best practice)
- Admin verifies certificate authenticity manually

---

### 6.3 right_to_work_checks (UKVI Verification)

**Purpose**: Track right to work verification for Immigration Act compliance.

```sql
CREATE TABLE right_to_work_checks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  caregiver_id UUID NOT NULL REFERENCES caregivers(id) ON DELETE CASCADE,

  -- Verification Details
  ukvi_share_code VARCHAR(9), -- UKVI share code (deleted after verification)
  visa_type VARCHAR(100), -- 'Skilled Worker', 'Spouse', 'Graduate', etc.
  visa_expiry_date DATE,
  work_restrictions TEXT, -- 'Full-time', 'Part-time (20h/week)', 'No restrictions'

  -- Verification
  verified_by UUID REFERENCES users(id),
  verified_at TIMESTAMP,
  verification_notes TEXT,

  -- Renewal Tracking
  renewal_reminder_60_days BOOLEAN DEFAULT FALSE,
  renewal_reminder_30_days BOOLEAN DEFAULT FALSE,
  renewal_reminder_7_days BOOLEAN DEFAULT FALSE,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_rtw_checks_caregiver ON right_to_work_checks(caregiver_id);
CREATE INDEX idx_rtw_checks_expiry ON right_to_work_checks(visa_expiry_date);
```

**Auto-Deactivation Rule**:
- If `visa_expiry_date` < NOW(), set `caregivers.profile_status = 'deactivated'`
- Cron job runs daily to check expiry dates and deactivate profiles

---

## 7. Payment Tables

### 7.1 payment_intents (Stripe Payment Tracking)

**Purpose**: Track Stripe Payment Intents for booking payments.

```sql
CREATE TABLE payment_intents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id),

  -- Stripe Details
  stripe_payment_intent_id VARCHAR(255) NOT NULL UNIQUE,
  amount_gbp DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'GBP',

  -- Status
  status VARCHAR(20) NOT NULL, -- 'requires_payment_method', 'requires_confirmation', 'requires_action', 'processing', 'requires_capture', 'canceled', 'succeeded'

  -- Payment Method
  payment_method_id VARCHAR(255),
  payment_method_type VARCHAR(50), -- 'card', 'bank_transfer'

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_payment_intents_booking ON payment_intents(booking_id);
CREATE INDEX idx_payment_intents_stripe_id ON payment_intents(stripe_payment_intent_id);
```

---

### 7.2 payouts (Caregiver Payouts)

**Purpose**: Track payouts to caregivers via Stripe Connect.

```sql
CREATE TABLE payouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id),
  caregiver_id UUID NOT NULL REFERENCES caregivers(id),

  -- Stripe Transfer
  stripe_transfer_id VARCHAR(255) NOT NULL UNIQUE,
  amount_gbp DECIMAL(10, 2) NOT NULL, -- Caregiver earnings (after commission)

  -- Status
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'paid', 'failed', 'canceled'

  -- Timeline
  payout_initiated_at TIMESTAMP,
  payout_completed_at TIMESTAMP,
  expected_arrival_date DATE, -- Stripe Standard: 2-3 business days

  -- Failure Handling
  failure_reason TEXT,
  retry_count INTEGER DEFAULT 0,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_payouts_booking ON payouts(booking_id);
CREATE INDEX idx_payouts_caregiver ON payouts(caregiver_id);
CREATE INDEX idx_payouts_status ON payouts(status);
CREATE INDEX idx_payouts_expected_arrival ON payouts(expected_arrival_date);
```

---

### 7.3 refunds (Refund Records)

**Purpose**: Track refunds for cancelled or disputed bookings.

```sql
CREATE TABLE refunds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id),

  -- Stripe Refund
  stripe_refund_id VARCHAR(255) NOT NULL UNIQUE,
  amount_gbp DECIMAL(10, 2) NOT NULL,

  -- Reason
  refund_reason VARCHAR(50) NOT NULL, -- 'cancellation', 'dispute_resolved', 'no_show', 'error'
  refund_notes TEXT,

  -- Status
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'succeeded', 'failed', 'canceled'

  -- Timeline
  refund_initiated_at TIMESTAMP DEFAULT NOW(),
  refund_completed_at TIMESTAMP,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_refunds_booking ON refunds(booking_id);
CREATE INDEX idx_refunds_stripe_id ON refunds(stripe_refund_id);
```

---

## 8. Admin Tables

### 8.1 admin_users (Admin Accounts)

**Purpose**: Separate admin user management with role-based permissions.

```sql
CREATE TYPE admin_role AS ENUM (
  'super_admin',          -- Full platform access
  'safeguarding_officer', -- Safeguarding focus, user management
  'operations_manager',   -- Verification, bookings, disputes
  'customer_support'      -- Read-only, basic user support
);

CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Role
  role admin_role NOT NULL,

  -- Permissions (JSONB for flexibility)
  permissions JSONB, -- {'can_approve_verifications': true, 'can_suspend_users': true}

  -- 2FA (Mandatory for admin)
  two_factor_required BOOLEAN DEFAULT TRUE,

  -- Activity Tracking
  last_login_at TIMESTAMP,
  last_action_at TIMESTAMP,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deactivated_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_admin_users_user_id ON admin_users(user_id);
CREATE INDEX idx_admin_users_role ON admin_users(role);
```

---

### 8.2 audit_logs (Admin Action Audit Trail)

**Purpose**: Immutable log of all admin actions for compliance and investigations.

```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Who
  admin_user_id UUID NOT NULL REFERENCES admin_users(id),

  -- What
  action VARCHAR(100) NOT NULL, -- 'approved_verification', 'suspended_user', 'resolved_dispute', 'escalated_to_sab'
  entity_type VARCHAR(50) NOT NULL, -- 'caregiver', 'booking', 'safeguarding_incident'
  entity_id UUID NOT NULL, -- ID of affected entity

  -- Details
  action_description TEXT,
  changes JSONB, -- Before/after state for data changes

  -- Context
  ip_address INET,
  user_agent TEXT,

  -- Metadata
  timestamp TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_audit_logs_admin ON audit_logs(admin_user_id, timestamp DESC);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp DESC);
```

**Retention**: 7 years (legal requirement for safeguarding and financial compliance)

---

### 8.3 safeguarding_incidents (Incident Records)

**Purpose**: Track safeguarding reports and investigations.

```sql
CREATE TYPE incident_type AS ENUM (
  'physical_abuse',
  'emotional_abuse',
  'sexual_abuse',
  'financial_abuse',
  'neglect',
  'discriminatory_abuse',
  'domestic_abuse',
  'self_neglect',
  'institutional_abuse',
  'modern_slavery',
  'off_platform_payment',
  'inappropriate_conduct',
  'policy_violation'
);

CREATE TYPE incident_severity AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE incident_status AS ENUM ('open', 'investigating', 'escalated_sab', 'escalated_police', 'resolved', 'dismissed');

CREATE TABLE safeguarding_incidents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Reporter
  reported_by UUID REFERENCES users(id), -- NULL if anonymous
  reporter_role VARCHAR(20), -- 'care_receiver', 'caregiver', 'family', 'public'

  -- Reported User
  reported_user_id UUID NOT NULL REFERENCES users(id),
  reported_user_type VARCHAR(20), -- 'caregiver', 'care_receiver', 'family'

  -- Incident Details
  incident_type incident_type NOT NULL,
  severity incident_severity NOT NULL,
  incident_description TEXT NOT NULL,
  incident_date DATE,

  -- Evidence
  evidence_urls TEXT[], -- S3 URLs for uploaded evidence

  -- Investigation
  status incident_status DEFAULT 'open',
  assigned_to UUID REFERENCES admin_users(id),
  investigation_notes TEXT,

  -- Section 42 Assessment (Care Act 2014)
  section_42_criteria_met BOOLEAN, -- TRUE if all 3 criteria met (adult with care needs, experiencing abuse, unable to protect self)

  -- External Escalation
  escalated_to_sab BOOLEAN DEFAULT FALSE,
  sab_local_authority VARCHAR(100), -- e.g., 'Westminster', 'Manchester'
  sab_reference_number VARCHAR(50),
  sab_escalation_date TIMESTAMP,
  sab_outcome TEXT,

  escalated_to_police BOOLEAN DEFAULT FALSE,
  police_force VARCHAR(100),
  police_crime_reference VARCHAR(50),
  police_escalation_date TIMESTAMP,
  police_outcome TEXT,

  -- Actions Taken
  user_suspended BOOLEAN DEFAULT FALSE,
  suspension_date TIMESTAMP,
  user_banned BOOLEAN DEFAULT FALSE,
  ban_date TIMESTAMP,

  -- Resolution
  investigation_outcome TEXT, -- 'Substantiated', 'Unsubstantiated', 'Inconclusive'
  resolution_notes TEXT,
  resolved_by UUID REFERENCES admin_users(id),
  resolved_at TIMESTAMP,

  -- Reporter Notification
  reporter_notified BOOLEAN DEFAULT FALSE,
  reporter_notification_date TIMESTAMP,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_safeguarding_reported_user ON safeguarding_incidents(reported_user_id);
CREATE INDEX idx_safeguarding_status ON safeguarding_incidents(status);
CREATE INDEX idx_safeguarding_severity ON safeguarding_incidents(severity);
CREATE INDEX idx_safeguarding_assigned_to ON safeguarding_incidents(assigned_to);
CREATE INDEX idx_safeguarding_section_42 ON safeguarding_incidents(section_42_criteria_met) WHERE section_42_criteria_met = TRUE;
```

**Retention**: 7 years minimum (safeguarding compliance), potentially indefinite for serious cases

---

## 9. Review Tables

### 9.1 reviews (Post-Booking Reviews)

**Purpose**: Care receiver feedback on caregiver service quality.

```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id),

  -- Reviewer
  reviewer_id UUID NOT NULL REFERENCES users(id), -- Care receiver
  caregiver_id UUID NOT NULL REFERENCES caregivers(id),

  -- Rating
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),

  -- Written Review
  review_text TEXT, -- Max 500 chars

  -- Tags (optional)
  review_tags TEXT[], -- ['punctual', 'friendly', 'reliable', 'professional']

  -- Moderation
  is_flagged BOOLEAN DEFAULT FALSE,
  flag_reason TEXT,
  is_published BOOLEAN DEFAULT TRUE, -- FALSE if moderated out
  moderated_by UUID REFERENCES admin_users(id),
  moderated_at TIMESTAMP,

  -- Caregiver Response
  caregiver_response TEXT, -- Max 300 chars
  caregiver_responded_at TIMESTAMP,

  -- Helpful Votes (future enhancement)
  helpful_count INTEGER DEFAULT 0,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_reviews_booking ON reviews(booking_id);
CREATE INDEX idx_reviews_caregiver ON reviews(caregiver_id, created_at DESC);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_flagged ON reviews(is_flagged) WHERE is_flagged = TRUE;
```

**Trigger**: Update `caregivers.average_rating` and `caregivers.total_reviews` when review inserted/updated/deleted.

```sql
CREATE OR REPLACE FUNCTION update_caregiver_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE caregivers
  SET
    average_rating = (SELECT AVG(rating) FROM reviews WHERE caregiver_id = NEW.caregiver_id AND is_published = TRUE),
    total_reviews = (SELECT COUNT(*) FROM reviews WHERE caregiver_id = NEW.caregiver_id AND is_published = TRUE)
  WHERE id = NEW.caregiver_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_caregiver_rating
AFTER INSERT OR UPDATE OR DELETE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_caregiver_rating();
```

---

## 10. PostGIS Integration

### 10.1 PostGIS Extension Setup

```sql
-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;
```

### 10.2 Geographic Search Implementation

**Haversine Distance Calculation** (miles):

```sql
-- Function to calculate distance between two points (returns miles)
CREATE OR REPLACE FUNCTION calculate_distance_miles(
  lat1 DECIMAL, lon1 DECIMAL,
  lat2 DECIMAL, lon2 DECIMAL
) RETURNS DECIMAL AS $$
BEGIN
  RETURN ST_Distance(
    ST_MakePoint(lon1, lat1)::geography,
    ST_MakePoint(lon2, lat2)::geography
  ) / 1609.34; -- Convert meters to miles
END;
$$ LANGUAGE plpgsql IMMUTABLE;
```

**Search Query Example**:

```sql
-- Find caregivers within 10 miles of SW1A 1AA (51.5014, -0.1419)
-- Filters: Companionship service, £15-25/hour, DBS verified
SELECT
  c.id,
  c.first_name,
  c.last_name,
  c.hourly_rate_gbp,
  c.average_rating,
  c.total_reviews,
  calculate_distance_miles(c.latitude, c.longitude, 51.5014, -0.1419) AS distance_miles
FROM caregivers c
WHERE
  c.profile_status = 'approved'
  AND 'companionship' = ANY(c.services_offered)
  AND c.hourly_rate_gbp BETWEEN 15 AND 25
  AND c.dbs_verified = TRUE
  AND ST_DWithin(
    ST_MakePoint(c.longitude, c.latitude)::geography,
    ST_MakePoint(-0.1419, 51.5014)::geography,
    16093.4 -- 10 miles in meters
  )
ORDER BY distance_miles ASC
LIMIT 12;
```

---

## 11. Migration Strategy

### 11.1 Tier Progression Planning

**Tier 1 → Tier 2 Migration**:

```sql
-- Add personal care service types
ALTER TYPE service_type ADD VALUE 'personal_care';
ALTER TYPE service_type ADD VALUE 'medication_assistance';
ALTER TYPE service_type ADD VALUE 'mobility_assistance';
ALTER TYPE service_type ADD VALUE 'overnight_care';

-- Add care skills to caregivers (Tier 2 requirement)
ALTER TABLE caregivers ADD COLUMN care_skills TEXT[];
ALTER TABLE caregivers ADD COLUMN qualifications TEXT[];
ALTER TABLE caregivers ADD COLUMN insurance_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE caregivers ADD COLUMN insurance_expiry_date DATE;

-- DBS becomes mandatory at Tier 2 for personal care
-- Constraint: If 'personal_care' in services_offered, dbs_verified must be TRUE
ALTER TABLE caregivers ADD CONSTRAINT check_personal_care_dbs
  CHECK (
    NOT ('personal_care' = ANY(services_offered)) OR dbs_verified = TRUE
  );
```

**Tier 2 → Tier 3 Migration**:

```sql
-- Add health-inferring data (requires explicit consent)
ALTER TABLE care_receivers ADD COLUMN medical_conditions TEXT[]; -- Special category data
ALTER TABLE care_receivers ADD COLUMN care_complexity_level INTEGER; -- 1-10 scale
ALTER TABLE care_receivers ADD COLUMN risk_assessment_url TEXT; -- S3 URL for uploaded care plan

-- Add condition-specific experience to caregivers
ALTER TABLE caregivers ADD COLUMN condition_experience TEXT[]; -- ['dementia', 'parkinsons', 'stroke']

-- Consent tracking for health data
CREATE TABLE health_data_consents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  care_receiver_id UUID NOT NULL REFERENCES care_receivers(id),
  consent_given BOOLEAN DEFAULT FALSE,
  consent_date TIMESTAMP,
  consent_withdrawn_date TIMESTAMP,
  data_categories TEXT[] -- ['medical_conditions', 'risk_assessment']
);
```

### 11.2 Data Migration Scripts

**Anonymization on User Deletion** (GDPR Right to Erasure):

```sql
CREATE OR REPLACE FUNCTION anonymize_user_data(user_uuid UUID)
RETURNS VOID AS $$
BEGIN
  -- Update users table
  UPDATE users
  SET
    email = 'deleted_' || id || '@anonymized.local',
    phone = NULL,
    first_name = 'User',
    last_name = substring(id::text, 1, 8),
    two_factor_secret = NULL,
    deleted_at = NOW()
  WHERE id = user_uuid;

  -- Anonymize care receiver if applicable
  UPDATE care_receivers
  SET
    address_line1 = '[DELETED]',
    address_line2 = NULL,
    emergency_contact_name = '[DELETED]',
    emergency_contact_phone = '[DELETED]'
  WHERE user_id = user_uuid;

  -- Anonymize caregiver if applicable
  UPDATE caregivers
  SET
    bio = '[Profile deleted by user]',
    profile_photo_url = NULL
  WHERE user_id = user_uuid;

  -- Anonymize messages (retain structure for investigations)
  UPDATE messages
  SET message_text = '[Message deleted by user]'
  WHERE sender_id = user_uuid;

  -- NOTE: Bookings, audit logs, and safeguarding incidents retained with pseudonymized user ID
  -- for legal compliance (7-year retention)
END;
$$ LANGUAGE plpgsql;
```

---

## 12. Sample SQL

### 12.1 Complete Schema Creation Script

```sql
-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS postgis;

-- Create ENUMs
CREATE TYPE service_type AS ENUM ('companionship', 'light_housework', 'shopping', 'meal_prep', 'transportation');
CREATE TYPE booking_status AS ENUM ('requested', 'accepted', 'in_progress', 'completed', 'payment_released', 'reviewed', 'declined', 'expired', 'cancelled', 'cancelled_by_caregiver', 'no_show_caregiver', 'no_show_care_receiver', 'disputed', 'dispute_resolved');
CREATE TYPE document_type AS ENUM ('id_document', 'selfie', 'dbs_certificate', 'right_to_work_document');
CREATE TYPE dbs_level AS ENUM ('basic', 'standard', 'enhanced');
CREATE TYPE admin_role AS ENUM ('super_admin', 'safeguarding_officer', 'operations_manager', 'customer_support');
CREATE TYPE incident_type AS ENUM ('physical_abuse', 'emotional_abuse', 'sexual_abuse', 'financial_abuse', 'neglect', 'discriminatory_abuse', 'domestic_abuse', 'self_neglect', 'institutional_abuse', 'modern_slavery', 'off_platform_payment', 'inappropriate_conduct', 'policy_violation');
CREATE TYPE incident_severity AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE incident_status AS ENUM ('open', 'investigating', 'escalated_sab', 'escalated_police', 'resolved', 'dismissed');

-- Core tables (order matters for foreign keys)
-- [Paste table creation SQL from sections 3-9 above]

-- See sections 3-9 for complete table definitions
```

### 12.2 Seed Data for Development

```sql
-- Sample admin user
INSERT INTO users (id, email, email_verified, password_hash, user_type, first_name, last_name, phone, phone_verified, account_status, gdpr_consent, gdpr_consent_date)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'admin@example.com',
  TRUE,
  '$2b$10$...', -- bcrypt hash of 'password123'
  'admin',
  'Admin',
  'User',
  '+447700900000',
  TRUE,
  'active',
  TRUE,
  NOW()
);

INSERT INTO admin_users (user_id, role)
VALUES ('00000000-0000-0000-0000-000000000001', 'super_admin');

-- Sample caregiver
INSERT INTO users (id, email, email_verified, password_hash, user_type, first_name, last_name, phone, phone_verified, account_status)
VALUES (
  '00000000-0000-0000-0000-000000000002',
  'caregiver@example.com',
  TRUE,
  '$2b$10$...',
  'caregiver',
  'Sarah',
  'Johnson',
  '+447700900001',
  TRUE,
  'active'
);

INSERT INTO caregivers (id, user_id, postcode, latitude, longitude, hourly_rate_gbp, services_offered, bio, id_verified, right_to_work_verified, phone_verified, profile_status)
VALUES (
  uuid_generate_v4(),
  '00000000-0000-0000-0000-000000000002',
  'SW1A 1AA',
  51.5014,
  -0.1419,
  20.00,
  ARRAY['companionship', 'light_housework', 'shopping'],
  'Experienced caregiver with 5 years in elderly care. I love providing companionship and helping with daily tasks.',
  TRUE,
  TRUE,
  TRUE,
  'approved'
);

-- Sample care receiver
INSERT INTO users (id, email, email_verified, password_hash, user_type, first_name, last_name, phone, phone_verified, account_status)
VALUES (
  '00000000-0000-0000-0000-000000000003',
  'family@example.com',
  TRUE,
  '$2b$10$...',
  'family',
  'Margaret',
  'Smith',
  '+447700900002',
  TRUE,
  'active'
);

INSERT INTO care_receivers (id, user_id, postcode, latitude, longitude, is_family_member, care_receiver_name, relationship, emergency_contact_name, emergency_contact_phone, emergency_contact_relationship)
VALUES (
  uuid_generate_v4(),
  '00000000-0000-0000-0000-000000000003',
  'SW1A 2AA',
  51.5022,
  -0.1395,
  TRUE,
  'Elizabeth Smith',
  'daughter',
  'Margaret Smith',
  '+447700900002',
  'daughter'
);
```

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-06 | Technical Architect | Initial Tier 1 database schema design |

---

**Related Documents**:
- `/docs/ROADMAP.md` - Tiered market entry strategy (FDR-003)
- `/docs/product/features/tier1-booking-specification.md` - Booking data requirements
- `/docs/product/features/tier1-verification-specification.md` - Verification data model
- `/docs/product/features/tier1-search-specification.md` - Search and geographic data
- `/docs/product/features/tier1-messaging-specification.md` - Messaging data model
- `/docs/product/features/tier1-admin-specification.md` - Admin and audit data
- `/docs/product/features/tier1-safeguarding-specification.md` - Safeguarding incident data
- `/docs/compliance/dpia.md` - Data protection requirements

---

**END OF DOCUMENT**
