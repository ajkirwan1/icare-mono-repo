# Tier 1 Priority Actions: Agent Execution Plan

**Document Purpose**: Prioritized action lists with specific agent instructions for Tier 1 execution.

**Document Owner**: Product Director
**Created**: 2026-02-01
**Status**: ACTIVE - Founder Priority: Tier 1 Execution

---

## Executive Summary

This document provides two prioritized action lists for Tier 1 execution:

1. **LIST 1: APPLICATION** - Technical specifications and development enablers
2. **LIST 2: WEBSITE** - Content and copy for public-facing website

Each action includes specific agent prompts that are executable immediately.

**Reference Documents**:
- `/docs/ROADMAP.md` - Tiered Market Entry Strategy
- `/docs/tiers/tier1/planning/build-sequence.md` - Development sequence
- `/docs/tiers/tier1/planning/launch-checklist.md` - Launch readiness
- `/docs/tiers/tier1/status/implementation-status.md` - Current status
- `/docs/tiers/common/website/roadmap.md` - Website planning
- `/docs/governance/founder-decisions-responses.md` - Founder decisions

---

## LIST 1: APPLICATION (Tier 1)

Focus: Technical specifications and development enablers for Tier 1 application.

> **Execution Philosophy**: Feature specifications FIRST, then technical architecture.
> Rationale: Define WHAT we're building before designing HOW to build it.
> This ensures database schema, API, and routes are informed by actual feature requirements.

---

### APP-005: Detailed Feature Specifications for Core Booking Flow

**Priority**: 1 (Critical Path - Start Here)
**Assigned Agent**: `product-requirements-specialist`
**Dependencies**: None (references existing features.md)

**Agent Prompt**:
```
Create detailed feature specifications for the Tier 1 booking flow.

CONTEXT:
- Read /docs/ROADMAP.md for tier definitions
- Read /docs/tiers/tier1/features.md Section 6 (Booking System)
- Read /docs/tiers/common/spec/state-maps.md for booking state machine
- Read /docs/tiers/tier1/planning/build-sequence.md Phase 6

REQUIREMENTS:
1. Define complete booking flow for companionship services:

   BOOKING REQUEST:
   - Service type selection (companionship only at T1)
   - Date and time selection (from caregiver availability)
   - Duration selection (minimum 2 hours)
   - Special requests (500 char limit)
   - Emergency contact confirmation
   - Price calculation display
   - Payment authorization
   - Request submission

   CAREGIVER RESPONSE:
   - Notification of new request
   - Request details view
   - Accept/decline workflow
   - Decline reason capture
   - 24-hour response window
   - Auto-decline on expiry

   POST-ACCEPTANCE:
   - Payment capture
   - Contact details exchange
   - Calendar blocking
   - Confirmation notifications

   BOOKING LIFECYCLE:
   - Status transitions (see state-maps.md)
   - In-progress tracking
   - Completion workflow
   - Payment release trigger

   CANCELLATION:
   - Cancellation request flow
   - Refund policy application (>24h full, <24h 50%)
   - Notification to both parties
   - Calendar release

   NO-SHOW:
   - No-show reporting
   - Admin review trigger
   - Refund decision

2. For each feature provide:
   - User story format
   - Acceptance criteria (testable)
   - UI requirements
   - API requirements
   - Error states and edge cases
   - Safeguarding considerations

3. Define validation rules:
   - Minimum booking duration
   - Maximum advance booking time
   - Booking overlap prevention
   - Rate limits on requests

OUTPUT: Create /docs/product/features/tier1-booking-specification.md with:
- Complete user stories
- Acceptance criteria
- Flow diagrams (text-based)
- Validation rules
- Error handling
- Safeguarding considerations
```

**Expected Output**: `/docs/product/features/tier1-booking-specification.md`

---

### APP-002: Tier 1 API Specification

**Priority**: 9 (Phase 4 - API Layer)
**Assigned Agent**: `technical-architect`
**Dependencies**: APP-001 (Database Schema), APP-004 (Route Map)

**Agent Prompt**:
```
Design the complete Tier 1 REST API specification.

CONTEXT:
- Read /docs/ROADMAP.md for tier definitions
- Read /docs/tiers/tier1/features.md for Tier 1 feature scope
- Read /docs/technical/database-schema-tier1.md for data model (APP-001)
- Read /docs/product/tier1-route-map.md for screen inventory (APP-004)
- Read /docs/product/features/tier1-booking-specification.md for booking API needs (APP-005)
- Read /docs/product/features/tier1-verification-specification.md for verification API needs (APP-006)
- Read /docs/product/features/tier1-search-specification.md for search API needs (APP-007)

REQUIREMENTS:
1. Design RESTful API endpoints for all Tier 1 systems:

   AUTHENTICATION:
   - POST /auth/register (care receiver, caregiver, family)
   - POST /auth/login
   - POST /auth/logout
   - POST /auth/password-reset-request
   - POST /auth/password-reset
   - POST /auth/verify-email
   - POST /auth/verify-phone

   USERS:
   - GET /users/me
   - PATCH /users/me
   - DELETE /users/me (GDPR deletion)

   CAREGIVER PROFILES:
   - POST /caregivers/profile
   - GET /caregivers/profile
   - PATCH /caregivers/profile
   - GET /caregivers/:id (public view)
   - GET /caregivers/search (with location, filters)

   CARE RECEIVER PROFILES:
   - POST /care-receivers/profile
   - GET /care-receivers/profile
   - PATCH /care-receivers/profile

   VERIFICATION:
   - POST /verification/identity (initiate Stripe Identity)
   - GET /verification/identity/status
   - POST /verification/right-to-work
   - POST /verification/dbs (voluntary upload)
   - GET /verification/status

   BOOKINGS:
   - POST /bookings (create request)
   - GET /bookings (list user's bookings)
   - GET /bookings/:id
   - PATCH /bookings/:id/accept (caregiver)
   - PATCH /bookings/:id/decline (caregiver)
   - PATCH /bookings/:id/cancel
   - PATCH /bookings/:id/complete (caregiver)

   MESSAGING:
   - GET /conversations
   - GET /conversations/:id/messages
   - POST /conversations/:id/messages
   - POST /conversations/:id/report

   REVIEWS:
   - POST /bookings/:id/review
   - GET /caregivers/:id/reviews

   PAYMENTS:
   - POST /payments/methods (add card)
   - GET /payments/methods
   - DELETE /payments/methods/:id
   - POST /caregivers/payout-setup (Stripe Connect onboarding)
   - GET /caregivers/earnings

   SAFEGUARDING:
   - POST /safeguarding/report
   - GET /safeguarding/reports (admin)
   - PATCH /safeguarding/reports/:id (admin)

   ADMIN:
   - GET /admin/users
   - GET /admin/verification-queue
   - PATCH /admin/verification/:id/approve
   - PATCH /admin/verification/:id/reject
   - GET /admin/bookings
   - GET /admin/incidents
   - PATCH /admin/users/:id/suspend
   - PATCH /admin/users/:id/unsuspend

2. For each endpoint specify:
   - HTTP method and path
   - Request body schema (JSON)
   - Response body schema (JSON)
   - Authentication required (JWT)
   - Role-based authorization
   - Rate limiting
   - Error responses

3. Include:
   - Pagination for list endpoints
   - Filtering and sorting parameters
   - Webhook endpoints for Stripe

OUTPUT: Create /docs/technical/api-specification-tier1.md with:
- Complete endpoint inventory
- Request/response schemas
- Authentication requirements
- Error handling conventions
- Rate limiting rules
```

**Expected Output**: `/docs/technical/api-specification-tier1.md`

---

### APP-003: Stripe Integration Specification

**Priority**: 10 (Phase 4 - API Layer)
**Assigned Agent**: `technical-architect`
**Dependencies**: APP-002 (API Specification), APP-005 (Booking Flow)

**Agent Prompt**:
```
Design the complete Stripe integration specification for Tier 1.

CONTEXT:
- Read /docs/ROADMAP.md for tier definitions
- Read /docs/tiers/tier1/planning/build-sequence.md Section 8 (Payments)
- Read /docs/tiers/tier1/planning/launch-checklist.md Section 5.2 (Stripe)
- Read /docs/governance/gating-decisions.md for pricing status (GD-11)

REQUIREMENTS:
1. Stripe Products to integrate:
   - Stripe Payments (card processing)
   - Stripe Connect (caregiver payouts)
   - Stripe Identity (ID verification)

2. Payment Flow:
   - Care receiver adds payment method (SetupIntent)
   - Booking request creates PaymentIntent with capture_method=manual
   - Caregiver acceptance triggers payment capture
   - Funds held in platform account (escrow)
   - Booking completion triggers transfer to caregiver
   - Commission deduction (use placeholder 15% until FDR-008 resolved)

3. Stripe Connect Setup:
   - Express account type for caregivers
   - Onboarding flow (OAuth redirect)
   - Payout schedule (2 business days after completion)
   - Transfer creation on booking completion

4. Stripe Identity Setup:
   - Verification session creation
   - Document verification flow
   - Webhook handling for verification results
   - Admin review integration

5. Webhook Events to handle:
   - payment_intent.succeeded
   - payment_intent.payment_failed
   - transfer.created
   - transfer.failed
   - account.updated (Connect)
   - identity.verification_session.verified
   - identity.verification_session.requires_input

6. Refund Handling:
   - Full refund (>24h cancellation)
   - Partial refund (<24h cancellation, placeholder 50%)
   - Dispute handling

7. Error Handling:
   - Card declined scenarios
   - Insufficient funds
   - 3D Secure failures
   - Transfer failures

OUTPUT: Create /docs/technical/stripe-integration-spec.md with:
- Integration architecture diagram (text)
- API flow sequences
- Webhook handling specifications
- Error handling matrix
- Test mode vs live mode checklist
- Commission configuration (placeholder values)
```

**Expected Output**: `/docs/technical/stripe-integration-spec.md`

---

### APP-004: Tier 1 Route Map and Screen Definitions

**Priority**: 8 (Phase 3 - Technical Architecture)
**Assigned Agent**: `route-map-architect`
**Dependencies**: APP-005, APP-006, APP-007, APP-008, APP-009, APP-010 (All feature specs inform screen inventory)

**Agent Prompt**:
```
Create the complete Tier 1 route map and screen inventory.

CONTEXT:
- Read /docs/ROADMAP.md for tier definitions
- Read /docs/tiers/tier1/planning/r0-launch-scope.md for R0 screens (26 screens)
- Read /docs/tiers/tier1/features.md for Tier 1 feature scope
- Read /docs/product/features/tier1-booking-specification.md for booking screens (APP-005)
- Read /docs/product/features/tier1-verification-specification.md for verification screens (APP-006)
- Read /docs/product/features/tier1-search-specification.md for search screens (APP-007)
- Read /docs/product/features/tier1-messaging-specification.md for messaging screens (APP-008)
- Read /docs/product/features/tier1-admin-specification.md for admin screens (APP-009)
- Read /docs/product/features/tier1-safeguarding-specification.md for safeguarding screens (APP-010)

REQUIREMENTS:
1. Create complete screen inventory for Tier 1 including:
   - All 28 R0 launch-critical screens
   - Post-R0 MVP screens (messaging, calendar, dashboards)
   - Total target: 40-50 screens for full Tier 1

2. For each screen provide:
   - Screen ID (SCR-[CATEGORY]-[NUMBER])
   - Screen name
   - Route path (e.g., /caregivers/:id)
   - Accessible roles (Care Receiver, Family Member, Caregiver, Admin)
   - Purpose (1 sentence)
   - Feature references (system IDs from feature-map)
   - Preconditions (authentication, verification status, etc.)
   - Key states (loading, empty, error, success)
   - Data sensitivity (low/medium/high)
   - Tier availability [T1]

3. Organize screens by category:
   - Authentication (6 screens)
   - Public/Compliance (4 screens)
   - Care Receiver (15 screens)
   - Caregiver (15 screens)
   - Admin (10 screens)

4. Create route tree showing:
   - Public routes (no auth)
   - Protected routes (auth required)
   - Role-specific routes
   - Nested routes (e.g., /admin/*)

5. Map screens to build phases:
   - Phase 1: Authentication + Public
   - Phase 2: Caregiver onboarding
   - Phase 3: Care receiver + Search
   - Phase 4: Booking + Messaging
   - Phase 5: Payments + Reviews
   - Phase 6: Admin + Safeguarding

OUTPUT: Create /docs/product/tier1-route-map.md with:
- Complete screen inventory table
- Route tree (hierarchical)
- Role-based access matrix
- Build phase mapping
- Product gaps identified
```

**Expected Output**: `/docs/product/tier1-route-map.md`

---

### APP-001: Tier 1 Database Schema Design

**Priority**: 7 (Phase 3 - Technical Architecture)
**Assigned Agent**: `technical-architect`
**Dependencies**: APP-005, APP-006, APP-007 (Core feature specs inform data model)

**Agent Prompt**:
```
Design the complete Tier 1 database schema for the elderly care marketplace.

CONTEXT:
- Read /docs/ROADMAP.md for tier definitions
- Read /docs/tiers/tier1/features.md for Tier 1 feature scope
- Read /docs/product/features/tier1-booking-specification.md for booking data requirements (APP-005)
- Read /docs/product/features/tier1-verification-specification.md for verification data requirements (APP-006)
- Read /docs/product/features/tier1-search-specification.md for search data requirements (APP-007)
- Read /docs/tiers/tier1/planning/build-sequence.md for additional requirements

REQUIREMENTS:
1. Design PostgreSQL schema for Tier 1 data ONLY:
   - Users (care receivers, caregivers, family members, admin)
   - Caregiver profiles (bio, photo, rate, radius, availability)
   - Care receiver profiles (basic info, emergency contacts)
   - Bookings (companionship only, hourly)
   - Messages (threaded conversations)
   - Reviews and ratings
   - Verification records (ID, right to work, voluntary DBS)
   - Safeguarding incidents
   - Audit logs

2. Data NOT included at Tier 1 (no columns for):
   - Medical conditions
   - Health-related care skills
   - Care plans or clinical documents
   - Risk assessments

3. Design for tier progression:
   - Use nullable columns or separate tables for Tier 2+ data
   - Schema should not require migration to add Tier 2 features
   - Include tier availability flags where appropriate

4. Include:
   - Primary and foreign keys
   - Indexes for common queries (location search, availability)
   - Audit columns (created_at, updated_at, deleted_at)
   - GDPR-compliant soft delete support
   - Consent tracking fields

OUTPUT: Create /docs/technical/database-schema-tier1.md with:
- Entity-relationship diagram (text-based)
- Table definitions with columns, types, constraints
- Index definitions
- Data retention notes
- Tier progression notes
```

**Expected Output**: `/docs/technical/database-schema-tier1.md`

---

### APP-006: Verification System Specification

**Priority**: 2 (Phase 1 - Core Feature Specs)
**Assigned Agent**: `product-requirements-specialist`
**Dependencies**: None (references existing features.md, compliance.md)

**Agent Prompt**:
```
Create detailed specifications for the Tier 1 verification system.

CONTEXT:
- Read /docs/ROADMAP.md for tier definitions
- Read /docs/tiers/tier1/features.md Section 3 (Verification System)
- Read /docs/tiers/tier1/compliance.md for verification requirements
- Read /docs/tiers/tier1/planning/build-sequence.md Phase 3
- Read /docs/technical/stripe-integration-spec.md for Stripe Identity

REQUIREMENTS:
1. Define verification levels for Tier 1:

   MANDATORY (Required for profile visibility):
   - Email verification (double opt-in)
   - Phone verification (SMS OTP)
   - ID verification (Stripe Identity)
   - Right to work verification (UKVI share code)

   VOLUNTARY (Trust signal, not required):
   - DBS certificate upload
   - "DBS Verified" badge display

2. For each verification type:

   EMAIL VERIFICATION:
   - Registration triggers verification email
   - Verification link with token
   - Token expiry (24 hours)
   - Resend mechanism
   - Success/failure states

   PHONE VERIFICATION:
   - SMS OTP delivery
   - 6-digit code entry
   - Code expiry (10 minutes)
   - Resend mechanism (rate limited)
   - Maximum attempts (3)

   ID VERIFICATION:
   - Stripe Identity session creation
   - Document upload flow
   - Selfie capture
   - Automated verification
   - Manual review trigger (if automated fails)
   - Admin review queue

   RIGHT TO WORK:
   - UKVI share code entry
   - Document upload (passport, visa)
   - Admin verification workflow
   - Expiry tracking for time-limited visas
   - Renewal reminders

   VOLUNTARY DBS:
   - Certificate upload (PDF)
   - Certificate number capture
   - Issue date capture
   - Admin verification
   - "DBS Verified" badge award
   - No Update Service integration at T1

3. Admin verification workflow:
   - Verification queue (prioritized)
   - Review interface requirements
   - Approve/reject with reason
   - Notification to caregiver
   - Appeal/resubmission process

4. Verification status management:
   - Status values (pending, verified, rejected, expired)
   - Status display on profile
   - Status impact on profile visibility
   - Re-verification triggers

OUTPUT: Create /docs/product/features/tier1-verification-specification.md with:
- Complete verification flows
- Acceptance criteria
- Admin workflow details
- Integration requirements
- Security considerations
```

**Expected Output**: `/docs/product/features/tier1-verification-specification.md`

---

### APP-007: Search and Discovery Specification

**Priority**: 3 (Phase 1 - Core Feature Specs)
**Assigned Agent**: `product-requirements-specialist`
**Dependencies**: None (references existing features.md)

**Agent Prompt**:
```
Create detailed specifications for the Tier 1 search and discovery system.

CONTEXT:
- Read /docs/ROADMAP.md for tier definitions
- Read /docs/tiers/tier1/features.md Section 5 (Discovery & Search)
- Read /docs/tiers/tier1/planning/build-sequence.md Phase 5
- Read /docs/technical/database-schema-tier1.md for data model

REQUIREMENTS:
1. Define search functionality:

   LOCATION SEARCH:
   - Postcode input (UK postcodes)
   - Postcode validation
   - Geocoding (postcode to lat/long)
   - Radius selection (5, 10, 15, 20, 30 miles)
   - Distance calculation (haversine formula)
   - Results sorted by distance

   FILTERING (Tier 1 only):
   - Hourly rate range (slider, min/max)
   - Availability (day of week, time of day)
   - Gender preference (male/female/no preference)
   - DBS Verified status (filter toggle)
   - Service type (companionship only at T1)

   SORTING:
   - Distance (default)
   - Price (low to high, high to low)
   - Rating (highest first)
   - Reviews count

   NOT AVAILABLE AT TIER 1:
   - Care skills filtering (Tier 2)
   - Medical condition experience (Tier 3)
   - Qualification filtering (Tier 2)

2. Search results display:
   - Caregiver cards (photo, name, bio preview, rate, distance, rating)
   - Pagination (20 results per page)
   - Total results count
   - Empty state (no caregivers found)
   - Loading state

3. Caregiver profile view:
   - Full profile display
   - Photo gallery (1-5 photos)
   - Bio (500 chars)
   - Service types offered
   - Hourly rate
   - Availability calendar
   - Reviews and ratings
   - Verification badges (ID Verified, DBS Verified if applicable)
   - "Request Booking" CTA

4. Performance requirements:
   - Search response time <2 seconds
   - Indexed queries
   - Caching strategy for common searches
   - Mobile-optimized results

OUTPUT: Create /docs/product/features/tier1-search-specification.md with:
- Complete search flows
- Filter specifications
- Results display requirements
- Performance requirements
- Empty states and edge cases
```

**Expected Output**: `/docs/product/features/tier1-search-specification.md`

---

### APP-008: Messaging System Specification

**Priority**: 4 (Phase 2 - Supporting Feature Specs)
**Assigned Agent**: `product-requirements-specialist`
**Dependencies**: APP-005 (Booking Flow - messaging tied to bookings)

**Agent Prompt**:
```
Create detailed specifications for the Tier 1 messaging system.

CONTEXT:
- Read /docs/ROADMAP.md for tier definitions
- Read /docs/tiers/tier1/features.md Section 7 (Messaging System)
- Read /docs/tiers/tier1/planning/build-sequence.md Phase 7
- Read /docs/tiers/tier1/planning/launch-checklist.md messaging requirements

REQUIREMENTS:
1. Define messaging functionality:

   CONVERSATION INITIATION:
   - Triggered by booking request
   - Care receiver and caregiver paired
   - Conversation persists across booking lifecycle

   MESSAGE SENDING:
   - Text messages (500 char limit)
   - Real-time delivery (WebSocket or polling)
   - Email notification for new messages
   - Push notification (if mobile app, post-MVP)

   MESSAGE HISTORY:
   - Full conversation thread
   - Oldest-first ordering
   - Infinite scroll pagination
   - Timestamps displayed

   CONTENT FILTERING:
   - Phone number detection and redaction
   - Email address detection and redaction
   - Off-platform payment keyword detection ("pay me directly", "cash", etc.)
   - Profanity filter
   - Safeguarding keyword detection ("hurt", "scared", "fallen")

   FLAGGED MESSAGES:
   - Auto-flag for safeguarding keywords
   - Admin notification for flagged messages
   - Admin review queue

   MESSAGE REPORTING:
   - "Report Conversation" button
   - Report reasons: inappropriate, off-platform payment, harassment, safety concern, other
   - Report submitted to admin queue
   - 24-hour admin review SLA

   AUDIT TRAIL:
   - Messages cannot be deleted by users
   - All messages logged for safeguarding
   - Admin can view any conversation

2. Notification preferences:
   - Email notification toggle
   - Notification frequency (instant, digest)
   - Do not disturb hours

3. Security requirements:
   - Messages encrypted at rest
   - No contact details exposed pre-booking acceptance
   - Rate limiting (prevent spam)

OUTPUT: Create /docs/product/features/tier1-messaging-specification.md with:
- Complete messaging flows
- Content filtering rules
- Notification specifications
- Safeguarding integration
- Security requirements
```

**Expected Output**: `/docs/product/features/tier1-messaging-specification.md`

---

### APP-009: Admin Dashboard Specification

**Priority**: 5 (Phase 2 - Supporting Feature Specs)
**Assigned Agent**: `product-requirements-specialist`
**Dependencies**: APP-006 (Verification Spec - admin verifies caregivers)

**Agent Prompt**:
```
Create detailed specifications for the Tier 1 admin dashboard.

CONTEXT:
- Read /docs/ROADMAP.md for tier definitions
- Read /docs/tiers/tier1/features.md Section 11 (Admin Dashboard)
- Read /docs/tiers/tier1/planning/build-sequence.md Phase 10
- Read /docs/tiers/tier1/planning/r0-launch-scope.md for R0 admin screens

REQUIREMENTS:
1. Define admin dashboard modules:

   DASHBOARD HOME:
   - Key metrics summary (users, bookings, revenue)
   - Pending verification count
   - Open safeguarding incidents count
   - Flagged messages count
   - Quick links to queues

   USER MANAGEMENT:
   - User list (all types: care receivers, caregivers, family)
   - Search and filter users
   - User detail view
   - Suspend/unsuspend user
   - Delete user (GDPR)
   - User activity log

   VERIFICATION QUEUE:
   - Pending verifications list (prioritized)
   - Verification detail view (documents, photos)
   - Approve/reject workflow
   - Rejection reason capture
   - Verification history

   BOOKING MANAGEMENT:
   - Booking list (all bookings, filterable)
   - Booking detail view
   - Booking status tracking
   - Dispute flag
   - Refund initiation

   SAFEGUARDING DASHBOARD:
   - Incident queue (prioritized by severity)
   - Incident detail view
   - Investigation workflow
   - Escalation to SAB
   - Incident resolution
   - Audit trail of actions

   FLAGGED MESSAGES:
   - Flagged message queue
   - Message thread view
   - Action options (dismiss, warn user, suspend user, escalate)

   FINANCIAL OVERVIEW:
   - Revenue summary
   - Payout summary
   - Refund summary
   - Commission tracking

   ANALYTICS:
   - Registration trends
   - Booking trends
   - Revenue trends
   - Caregiver supply metrics
   - Care receiver demand metrics

2. Admin roles and permissions:
   - Super Admin (full access)
   - Support Admin (user management, bookings)
   - Safeguarding Admin (incidents, flagged messages)
   - Finance Admin (financial overview)

3. Audit logging:
   - All admin actions logged
   - Action, user, timestamp, details
   - Audit log viewable by Super Admin

OUTPUT: Create /docs/product/features/tier1-admin-specification.md with:
- Dashboard module specifications
- Role and permission matrix
- Workflow definitions
- Audit requirements
- UI requirements
```

**Expected Output**: `/docs/product/features/tier1-admin-specification.md`

---

### APP-010: Safeguarding and Incident Specification

**Priority**: 6 (Phase 2 - Supporting Feature Specs, Compliance Critical)
**Assigned Agent**: `compliance-specialist`
**Dependencies**: APP-009 (Admin Dashboard Spec - safeguarding is admin function)

**Agent Prompt**:
```
Create detailed specifications for the Tier 1 safeguarding system.

CONTEXT:
- Read /docs/ROADMAP.md for tier definitions
- Read /docs/tiers/tier1/compliance.md for safeguarding requirements
- Read /docs/compliance/legal-framework.md for Care Act 2014 requirements
- Read /docs/tiers/tier1/features.md Section 10 (Safeguarding)

REQUIREMENTS:
1. Define safeguarding reporting system:

   INCIDENT REPORTING:
   - Report form accessible to all users
   - Incident categories:
     - Suspected abuse or neglect
     - Financial exploitation
     - Safety concern
     - Unprofessional conduct
     - Platform misuse
     - Other
   - Severity levels (low, medium, high, critical)
   - Details field (1000 chars)
   - Evidence upload (optional screenshots, photos)
   - Anonymous reporting option

   ADMIN TRIAGE:
   - Incident queue (sorted by severity, time)
   - Auto-escalation rules (critical = immediate notification)
   - Triage workflow (review, categorize, assign)
   - SLA tracking (24h response for non-critical, immediate for critical)

   INVESTIGATION:
   - Investigation checklist
   - Contact reporter option
   - Contact involved parties
   - Evidence collection
   - Notes and documentation
   - Account suspension (if needed)

   ESCALATION:
   - Criteria for SAB escalation
   - SAB contact information (by region)
   - Escalation notification template
   - Documentation requirements

   RESOLUTION:
   - Resolution categories (substantiated, unsubstantiated, inconclusive)
   - Actions taken (warning, suspension, ban, no action)
   - Outcome notification to reporter
   - Closure documentation

2. Emergency escalation:
   - 999 guidance display
   - Emergency contact information
   - Critical incident immediate notification

3. Safeguarding policy integration:
   - Policy publication requirements
   - Policy acknowledgment during registration
   - Policy link in reporting flow

4. Compliance requirements:
   - Care Act 2014 alignment
   - Audit trail requirements
   - Data retention for incidents (7 years)
   - SAB liaison procedures

5. Staff training requirements:
   - Safeguarding lead role
   - Training checklist
   - Escalation authority

OUTPUT: Create /docs/product/features/tier1-safeguarding-specification.md with:
- Complete incident workflow
- Escalation criteria
- SAB liaison procedures
- Audit requirements
- Staff role definitions
- Care Act 2014 compliance mapping
```

**Expected Output**: `/docs/product/features/tier1-safeguarding-specification.md`

---

## LIST 2: WEBSITE (Tier 1)

Focus: Content and copy for public-facing website pages.

### WEB-001: Homepage Content and Copy

**Priority**: 1 (Critical Path)
**Assigned Agent**: `content-architect`
**Dependencies**: None (can start immediately)

**Agent Prompt**:
```
Create complete homepage content for the Tier 1 website.

CONTEXT:
- Read /docs/ROADMAP.md for Tier 1 scope (companionship only)
- Read /docs/tiers/common/website/roadmap.md for website requirements
- Read /docs/governance/founder-decisions-responses.md for FDR-001, FDR-002
- Tier 1 services: Companionship, light housework, shopping, meal preparation
- Tier 1 verification: ID verified, right to work verified, voluntary DBS

REQUIREMENTS:
1. Create complete homepage copy including:

   HERO SECTION:
   - Primary headline (10-15 words)
   - Subheadline (20-30 words)
   - Trust statement
   - Primary CTA (families)
   - Secondary CTA (caregivers)

   SERVICES SECTION:
   - Section headline
   - 4-5 service cards with:
     - Service name
     - Service description (50-75 words each)
     - Icon/image suggestion
   - Services: Companionship, Light Housework, Shopping & Errands, Meal Preparation, Transportation (optional)

   HOW IT WORKS SECTION:
   - Section headline
   - 4-step process for families:
     - Step 1: Create profile
     - Step 2: Search caregivers
     - Step 3: Request booking
     - Step 4: Pay securely
   - Supporting copy for each step

   TRUST SIGNALS SECTION:
   - Section headline
   - Trust points (4-6):
     - ID Verified (NOT "DBS Verified" as mandatory)
     - Right to Work Verified
     - Admin Approved Profiles
     - Secure Payments
     - 24/7 Safeguarding Support
     - Reviews & Ratings
   - Copy for each trust point (25-40 words)

   CAREGIVER RECRUITMENT SECTION:
   - Section headline
   - Value proposition for caregivers (100-150 words)
   - Benefits list (3-5 points)
   - CTA to caregiver signup

   COMING SOON SECTION (Optional but recommended):
   - Transparency about roadmap
   - "Personal care services coming soon"
   - Waitlist capture option

   FINAL CTA SECTION:
   - Compelling closing statement
   - Dual CTAs (families and caregivers)

2. Tone requirements:
   - Warm and empathetic
   - Professional but not clinical
   - Builds trust for vulnerable adult families
   - Honest about service limitations (companionship only)

3. Compliance requirements:
   - Introduction Agency model clearly communicated
   - No claims of CQC registration
   - No DBS as mandatory (it's voluntary at T1)
   - No personal care service mentions
   - Clear that caregivers are self-employed

4. SEO considerations:
   - Target keywords: elderly companionship, care companion, senior companion UK
   - Meta title (60 chars)
   - Meta description (160 chars)

OUTPUT: Create /docs/tiers/tier1/website-content/homepage.md with:
- All section copy (ready for implementation)
- Image/asset suggestions
- SEO metadata
- Compliance notes
```

**Expected Output**: `/docs/tiers/tier1/website-content/homepage.md`

---

### WEB-002: How It Works - Families Page

**Priority**: 2 (Critical Path)
**Assigned Agent**: `content-architect`
**Dependencies**: WEB-001 (Homepage)

**Agent Prompt**:
```
Create complete "How It Works" page content for families/care receivers.

CONTEXT:
- Read /docs/ROADMAP.md for Tier 1 scope
- Read /docs/tiers/common/website/roadmap.md Section "How It Works - Families"
- Read /docs/tiers/tier1/features.md for care receiver features
- This page targets: elderly adults, family members arranging care, adult children

REQUIREMENTS:
1. Create complete page copy:

   PAGE HERO:
   - Headline: Focus on ease and safety
   - Subheadline: What families can expect
   - Trust statement

   STEP-BY-STEP PROCESS:
   - Step 1: Create Your Profile
     - What information is needed
     - Emergency contact importance
     - Time to complete (5 minutes)

   - Step 2: Search for Caregivers
     - Location-based search explanation
     - Filtering options (rate, availability, gender, DBS)
     - What caregiver profiles show

   - Step 3: Request a Booking
     - Choosing date and time
     - Specifying needs (within companionship scope)
     - Payment authorization
     - 24-hour caregiver response window

   - Step 4: Confirm and Meet
     - Booking acceptance process
     - Contact details exchange
     - What to expect on the day

   - Step 5: Pay Securely
     - Payment held in escrow
     - Release on completion
     - Platform payment protection

   - Step 6: Leave a Review
     - Review process
     - Helping others choose

   WHAT'S INCLUDED SECTION:
   - Service scope (companionship, light housework, shopping, meals)
   - Clear statement: "NOT personal care at this time"

   VERIFICATION EXPLAINED:
   - What "ID Verified" means
   - What "Right to Work Verified" means
   - What "DBS Verified" means (voluntary)
   - Admin approval process

   SAFETY & SAFEGUARDING:
   - 24/7 safeguarding reporting
   - Emergency contact system
   - Care Act 2014 compliance statement
   - Introduction Agency explanation

   PRICING SECTION:
   - Caregiver sets own rates
   - Platform fee explanation (placeholder until FDR-008)
   - Payment protection
   - Cancellation policy overview

   FAQ PREVIEW:
   - 3-5 most common family questions
   - Link to full FAQ

   CTA SECTION:
   - "Find a Caregiver" primary CTA
   - Support contact information

2. Tone: Reassuring, clear, builds confidence

3. Accessibility: Simple language, clear structure

OUTPUT: Create /docs/tiers/tier1/website-content/how-it-works-families.md with:
- Complete page copy
- Section structure
- FAQ content
- CTA copy
```

**Expected Output**: `/docs/tiers/tier1/website-content/how-it-works-families.md`

---

### WEB-003: How It Works - Caregivers Page

**Priority**: 3 (Critical Path)
**Assigned Agent**: `content-architect`
**Dependencies**: WEB-001 (Homepage)

**Agent Prompt**:
```
Create complete "How It Works" page content for caregivers.

CONTEXT:
- Read /docs/ROADMAP.md for Tier 1 scope
- Read /docs/tiers/common/website/roadmap.md Section "How It Works - Caregivers"
- Read /docs/tiers/tier1/features.md for caregiver features
- Read /docs/governance/founder-decisions-responses.md for FDR-001 (self-employed)
- Target audience: Professional caregivers, companions, support workers

REQUIREMENTS:
1. Create complete page copy:

   PAGE HERO:
   - Headline: Focus on flexibility and earnings
   - Subheadline: Value proposition for caregivers
   - "Join Now" CTA

   WHY JOIN SECTION:
   - Benefit 1: Set Your Own Rates
   - Benefit 2: Control Your Schedule
   - Benefit 3: Get Paid On Time
   - Benefit 4: Build Your Reputation
   - Benefit 5: Flexible Companionship Work
   - Each benefit: 50-75 word description

   GETTING STARTED PROCESS:
   - Step 1: Create Your Profile
     - What to include (bio, photo, experience)
     - Profile tips for success
     - Time to complete

   - Step 2: Complete Verification
     - ID verification (mandatory)
     - Right to work verification (mandatory)
     - DBS upload (voluntary but encouraged)
     - Timeline expectations (3-5 days)

   - Step 3: Set Availability & Rates
     - Availability calendar explanation
     - Rate setting guidance (market rates: 12-25 GBP/hour)
     - Service radius

   - Step 4: Receive Booking Requests
     - Notification system
     - Request review
     - Accept/decline rights
     - 24-hour response window

   - Step 5: Deliver Great Care
     - Service scope (companionship only at T1)
     - Professional standards
     - Safeguarding responsibilities

   - Step 6: Get Paid
     - Payment after booking completion
     - Payout timeline (2 business days)
     - Earnings dashboard

   SERVICES YOU CAN OFFER:
   - Companionship visits
   - Light housework
   - Shopping and errands
   - Meal preparation
   - Transportation (if applicable)
   - Coming soon: Personal care, live-in care (Tier 2+)

   VERIFICATION REQUIREMENTS:
   - Mandatory at Tier 1: ID, Right to Work, Phone, Email
   - Voluntary at Tier 1: DBS certificate
   - Why DBS is voluntary (companionship is not regulated activity)
   - DBS becomes mandatory at Tier 2

   SELF-EMPLOYMENT STATUS:
   - Clear statement: "You are self-employed"
   - What this means (set rates, control schedule, tax responsibility)
   - NOT an employee of the platform
   - HMRC self-assessment responsibility

   EARNINGS & FEES:
   - You set your rate
   - Platform commission (placeholder until FDR-008)
   - Payout process
   - No hidden fees

   FAQ PREVIEW:
   - 3-5 most common caregiver questions
   - Link to full FAQ

   CTA SECTION:
   - "Apply Now" primary CTA
   - Support contact information

2. Tone: Professional, empowering, opportunity-focused

3. Compliance: Self-employment clearly stated, no employment relationship implied

OUTPUT: Create /docs/tiers/tier1/website-content/how-it-works-caregivers.md with:
- Complete page copy
- Section structure
- FAQ content
- CTA copy
- Self-employment disclaimers
```

**Expected Output**: `/docs/tiers/tier1/website-content/how-it-works-caregivers.md`

---

### WEB-004: Trust & Safety Page

**Priority**: 4 (Critical Path)
**Assigned Agent**: `content-architect`
**Dependencies**: WEB-001 (Homepage)

**Agent Prompt**:
```
Create complete Trust & Safety page content.

CONTEXT:
- Read /docs/ROADMAP.md for Tier 1 scope and trust approach
- Read /docs/tiers/common/website/roadmap.md Section "Trust & Safety Page"
- Read /docs/tiers/tier1/compliance.md for verification requirements
- Read /docs/governance/founder-decisions-responses.md for FDR-001, FDR-002

REQUIREMENTS:
1. Create complete page copy:

   PAGE HERO:
   - Headline: Focus on safety commitment
   - Subheadline: How we protect vulnerable adults
   - Trust statement

   INTRODUCTION AGENCY MODEL:
   - What an Introduction Agency is
   - Self-employed caregivers (not employees)
   - Platform's role (verification, payments, safeguarding)
   - Care receiver's role (choosing and engaging caregivers)
   - Important: We do NOT provide care directly

   VERIFICATION AT TIER 1:

   Mandatory Verification:
   - Government ID Verification
     - What it involves (Stripe Identity)
     - Photo matching
     - Document authenticity
   - Right to Work Verification
     - UKVI share code or document
     - Why it matters
   - Phone Verification
     - SMS code confirmation
   - Email Verification
     - Double opt-in
   - Admin Approval
     - Profile review process
     - Quality checks

   Voluntary Verification:
   - DBS Certificate Upload
     - Why DBS is voluntary at Tier 1
     - "Companionship services do not legally require DBS checks"
     - Caregivers with existing DBS can upload
     - "DBS Verified" badge if verified
     - DBS becomes mandatory when personal care launches (Tier 2)

   SAFEGUARDING COMMITMENT:
   - Care Act 2014 compliance
   - 24/7 incident reporting system
   - Admin oversight
   - Emergency escalation procedures
   - SAB (Safeguarding Adults Board) liaison
   - What to do if you have concerns

   PAYMENT PROTECTION:
   - Secure payment processing (Stripe)
   - Escrow system explanation
   - Refund policy
   - No off-platform payments

   REVIEWS & RATINGS:
   - Review system overview
   - Moderation process
   - How reviews build trust

   OUR ROADMAP - BUILDING TRUST:
   - Tier 1 (Now): ID Verification, Voluntary DBS
   - Tier 2 (Coming): Mandatory DBS, Qualification Verification, Insurance
   - Tier 3 (Future): Enhanced Verification, Live-In Safeguards
   - "We're starting safe and getting safer"

   HOW TO REPORT CONCERNS:
   - In-app reporting
   - Email contact
   - Emergency: Call 999
   - Local authority safeguarding teams

   FAQ:
   - 5-7 trust and safety questions
   - Link to full FAQ

2. Tone: Reassuring, transparent, professional

3. Key messages:
   - We take safety seriously
   - Verification is real and meaningful
   - DBS voluntary at Tier 1 is a legitimate legal position
   - Safeguarding infrastructure in place
   - Building trust progressively

OUTPUT: Create /docs/tiers/tier1/website-content/trust-and-safety.md with:
- Complete page copy
- Verification explanations
- Safeguarding content
- Roadmap messaging
- Emergency contact information
```

**Expected Output**: `/docs/tiers/tier1/website-content/trust-and-safety.md`

---

### WEB-005: Pricing Page

**Priority**: 5 (Critical Path)
**Assigned Agent**: `content-architect`
**Dependencies**: WEB-001 (Homepage)

**Agent Prompt**:
```
Create complete Pricing page content.

CONTEXT:
- Read /docs/ROADMAP.md for Tier 1 scope
- Read /docs/tiers/common/website/roadmap.md for pricing page requirements
- Read /docs/governance/gating-decisions.md GD-11 for pricing status
- NOTE: Commission structure is PENDING (use 10% placeholder per website roadmap)
- Pricing page is now MANDATORY per website roadmap update

REQUIREMENTS:
1. Create complete page copy:

   PAGE HERO:
   - Headline: Focus on transparency and simplicity
   - Subheadline: No hidden fees
   - Trust statement

   HOW PRICING WORKS:
   - Caregivers set their own hourly rates
   - Typical market range (12-25 GBP/hour)
   - Platform commission structure (10% placeholder)
   - Who pays commission (caregiver side)

   EXAMPLE TRANSACTION:
   - Worked example showing:
     - Caregiver hourly rate: 15 GBP/hour
     - 3-hour booking: 45 GBP
     - Platform fee (10%): 4.50 GBP
     - Caregiver receives: 40.50 GBP
     - Care receiver pays: 45 GBP

   FOR FAMILIES:
   - What you pay
   - When payment is taken
   - Payment methods accepted (card via Stripe)
   - Cancellation policy and refunds:
     - >24 hours before: Full refund
     - <24 hours before: 50% refund
     - No-show: No refund
   - No off-platform payments (for your protection)

   FOR CAREGIVERS:
   - How you set your rate
   - Platform commission (10%)
   - When you get paid (2 business days after completion)
   - How you get paid (direct to bank)
   - Tax responsibility (self-employed)

   MINIMUM BOOKING:
   - Minimum booking duration (2 hours recommended)
   - Why minimums exist (travel time, care continuity)

   EARLY ADOPTER PROGRAM (if applicable):
   - Founding caregiver benefits (placeholder)
   - Limited time offers
   - How to qualify

   FAQ:
   - Are there any hidden fees?
   - Why do caregivers pay commission?
   - Can I pay the caregiver directly?
   - What if I need to cancel?
   - When do caregivers get paid?
   - Do caregivers pay tax?

   CTA SECTION:
   - Families: "Find a Caregiver"
   - Caregivers: "Start Earning"

2. Tone: Transparent, straightforward, fair

3. Compliance:
   - Self-employment status clear
   - Tax responsibility mentioned
   - No misleading pricing claims

4. Note: Mark all commission percentages as [PLACEHOLDER: 10%] for easy update when FDR-008 is resolved

OUTPUT: Create /docs/tiers/tier1/website-content/pricing.md with:
- Complete page copy
- Transaction examples
- FAQ content
- Placeholder markers for commission
```

**Expected Output**: `/docs/tiers/tier1/website-content/pricing.md`

---

### WEB-006: About Us Page

**Priority**: 6 (High)
**Assigned Agent**: `content-architect`
**Dependencies**: WEB-001 (Homepage)

**Agent Prompt**:
```
Create complete About Us page content.

CONTEXT:
- Read /docs/ROADMAP.md for company vision
- Read /docs/tiers/common/website/roadmap.md Section "About Us"
- Read /docs/governance/founder-decisions-responses.md for strategic direction

REQUIREMENTS:
1. Create complete page copy:

   PAGE HERO:
   - Headline: Mission-focused
   - Subheadline: What we're building

   OUR MISSION:
   - Core mission statement (50-75 words)
   - Focus on: Safe companionship, dignified care, fair opportunity
   - "Technology that connects, not replaces, human care"

   OUR STORY:
   - Brief origin story (100-150 words)
   - Why we started this
   - The problem we're solving
   - Our approach

   OUR VALUES:
   - Safety First: Protecting vulnerable adults
   - Dignity: Respectful care relationships
   - Transparency: Honest about what we are (and aren't)
   - Empowerment: Giving caregivers control
   - Quality: Building trust through verification

   OUR APPROACH:
   - Introduction Agency model explanation
   - Self-employed professionals
   - Progressive rollout (Tier 1 to Tier 4)
   - Building trust step by step

   WHERE WE ARE NOW:
   - Tier 1: Companionship services
   - What's available now
   - What's coming next (Tier 2: Personal care)

   OUR COMMITMENT:
   - UK-focused platform
   - Compliance with UK regulations
   - Safeguarding as priority
   - Fair treatment of caregivers

   CONTACT:
   - How to reach us
   - Support email
   - Feedback welcome

   CTA SECTION:
   - "Join us" message
   - Links to family and caregiver signup

2. Tone: Authentic, mission-driven, humble

3. Compliance:
   - No CQC claims
   - Introduction Agency clearly stated
   - UK regulatory alignment mentioned

OUTPUT: Create /docs/tiers/tier1/website-content/about-us.md with:
- Complete page copy
- Mission and values content
- Contact information
```

**Expected Output**: `/docs/tiers/tier1/website-content/about-us.md`

---

### WEB-007: FAQ Page (Comprehensive)

**Priority**: 7 (High)
**Assigned Agent**: `content-architect`
**Dependencies**: WEB-001 through WEB-006

**Agent Prompt**:
```
Create comprehensive FAQ page content.

CONTEXT:
- Read /docs/ROADMAP.md for Tier 1 scope
- Read /docs/tiers/common/website/roadmap.md FAQ section
- Read all website content created (homepage, how it works, trust, pricing, about)
- Consolidate questions from all pages

REQUIREMENTS:
1. Create comprehensive FAQ (minimum 30 questions):

   GENERAL (5-7 questions):
   - What services are available at launch?
   - What is an Introduction Agency?
   - When will personal care services be available?
   - Is this a CQC-registered service?
   - What areas do you cover?
   - How is this different from a care agency?

   FOR FAMILIES (8-10 questions):
   - How are caregivers verified?
   - Is DBS required for companionship services?
   - How much does it cost?
   - How do I pay?
   - Can I choose my caregiver?
   - What if I need to cancel?
   - What if I'm not happy with the service?
   - What if I need personal care now?
   - Can a family member book on behalf of someone else?
   - What happens in an emergency?

   FOR CAREGIVERS (8-10 questions):
   - Do I need a DBS check to join?
   - How do I get paid?
   - What commission do you charge?
   - Can I set my own rates?
   - What if I already work for an agency?
   - What services can I offer?
   - How do I get more bookings?
   - What are my tax responsibilities?
   - Can I decline booking requests?
   - How long does verification take?

   SAFETY & SAFEGUARDING (5-7 questions):
   - How do you protect vulnerable adults?
   - What if there's an emergency?
   - How do I report a concern?
   - What safeguarding policies are in place?
   - What should I do if I witness abuse or neglect?

   PAYMENTS (5-7 questions):
   - How does the payment system work?
   - When is payment taken?
   - How are caregivers paid?
   - What if there's a payment dispute?
   - Can I pay the caregiver directly?
   - Are there any hidden fees?

2. For each question provide:
   - Clear, concise answer (50-150 words)
   - Relevant links to other pages
   - Contact information where appropriate

3. Organization:
   - Grouped by category
   - Most common questions first within each category
   - Expandable/collapsible format suggested

4. Tone: Helpful, clear, reassuring

OUTPUT: Create /docs/tiers/tier1/website-content/faq.md with:
- Complete FAQ content
- Categorized organization
- Cross-links to relevant pages
```

**Expected Output**: `/docs/tiers/tier1/website-content/faq.md`

---

### WEB-008: Legal Pages - Terms of Service (Care Receivers)

**Priority**: 8 (Critical - Legal)
**Assigned Agent**: `compliance-specialist`
**Dependencies**: None (legal foundation)

**Agent Prompt**:
```
Draft Terms of Service for Care Receivers (families booking care).

CONTEXT:
- Read /docs/ROADMAP.md for Tier 1 scope
- Read /docs/governance/founder-decisions-responses.md for FDR-001, FDR-002
- Read /docs/compliance/legal-framework.md for legal requirements
- Read /docs/tiers/tier1/compliance.md for Tier 1 compliance
- NOTE: This is a DRAFT for legal review, not final legal advice

REQUIREMENTS:
1. Draft complete Terms of Service including:

   INTRODUCTION:
   - Company details (placeholder)
   - Platform description
   - Introduction Agency model explanation

   DEFINITIONS:
   - Platform, Care Receiver, Caregiver, Booking, Services
   - Clear terminology

   SCOPE OF SERVICES:
   - What platform provides (introduction, payment processing, verification)
   - What platform does NOT provide (direct care, employment)
   - Tier 1 services only (companionship)
   - Self-employed caregiver status

   USER REGISTRATION:
   - Eligibility requirements
   - Account creation
   - Accuracy of information
   - Account security

   BOOKING PROCESS:
   - How bookings work
   - Request, acceptance, confirmation
   - No guarantee of availability
   - Right to refuse

   PAYMENT TERMS:
   - Payment authorization
   - Escrow system
   - Commission (placeholder)
   - Refund policy
   - Cancellation terms

   USER RESPONSIBILITIES:
   - Accurate information
   - Respectful conduct
   - Safeguarding cooperation
   - Emergency contact maintenance

   PLATFORM RESPONSIBILITIES:
   - Verification (as described)
   - Payment processing
   - Safeguarding reporting
   - Data protection

   LIABILITY:
   - Limitation of liability
   - Platform NOT liable for care quality
   - Caregiver responsibility for care delivery
   - Indemnification

   CANCELLATION AND TERMINATION:
   - Booking cancellation
   - Account termination
   - Platform's right to suspend

   DISPUTE RESOLUTION:
   - Internal dispute process
   - Complaints procedure
   - Governing law (England and Wales)

   DATA PROTECTION:
   - Reference to Privacy Policy
   - GDPR compliance

   CHANGES TO TERMS:
   - Right to modify
   - Notification of changes

   CONTACT:
   - How to reach platform

2. Legal notes:
   - Mark all sections requiring legal review
   - Flag placeholders (company name, commission)
   - Note where solicitor input is essential

3. Language:
   - Clear but legally precise
   - Consumer-friendly where possible
   - GDPR-compliant consent language

OUTPUT: Create /docs/tiers/tier1/website-content/legal/terms-of-service-care-receivers.md with:
- Complete draft Terms
- Legal review markers
- Placeholders clearly marked
- Compliance notes
```

**Expected Output**: `/docs/tiers/tier1/website-content/legal/terms-of-service-care-receivers.md`

---

### WEB-009: Legal Pages - Terms of Service (Caregivers)

**Priority**: 9 (Critical - Legal)
**Assigned Agent**: `compliance-specialist`
**Dependencies**: WEB-008 (Care Receiver Terms)

**Agent Prompt**:
```
Draft Terms of Service for Caregivers (self-employed professionals).

CONTEXT:
- Read /docs/ROADMAP.md for Tier 1 scope
- Read /docs/governance/founder-decisions-responses.md for FDR-001 (self-employed model)
- Read /docs/compliance/legal-framework.md for legal requirements
- Read /docs/tiers/tier1/compliance.md for Tier 1 compliance
- NOTE: This is a DRAFT for legal review, not final legal advice

REQUIREMENTS:
1. Draft complete Terms of Service including:

   INTRODUCTION:
   - Company details (placeholder)
   - Platform description
   - Introduction Agency model
   - Self-employment relationship

   SELF-EMPLOYMENT STATUS:
   - YOU ARE SELF-EMPLOYED (prominent statement)
   - NOT an employee, worker, or agent
   - Control over rates, schedule, methods
   - Tax responsibility (HMRC self-assessment)
   - National Insurance responsibility
   - No employment rights from platform
   - Substitution rights

   REGISTRATION AND VERIFICATION:
   - Eligibility requirements
   - Verification requirements (ID, right to work)
   - Voluntary DBS at Tier 1
   - Accuracy of information
   - Profile approval process
   - Right to refuse registration

   SERVICES:
   - Tier 1 services (companionship only)
   - Service standards expected
   - Safeguarding responsibilities
   - Professional conduct
   - Right to accept/decline bookings

   BOOKINGS:
   - Booking request process
   - Response requirements (24 hours)
   - Acceptance/decline rights
   - Cancellation terms
   - No-show policy

   PAYMENT AND COMMISSION:
   - Commission structure (placeholder 10%)
   - Payment timing (2 business days)
   - Payout method (bank transfer)
   - Tax invoicing responsibility
   - No off-platform payments

   INSURANCE:
   - Recommended: Public Liability
   - Self-declaration at Tier 1
   - Platform not providing insurance
   - Tier 2 requirements preview

   INTELLECTUAL PROPERTY:
   - Profile content ownership
   - Platform license to display profile
   - Review ownership

   PLATFORM RESPONSIBILITIES:
   - Verification services
   - Payment processing
   - Safeguarding infrastructure
   - Technical support

   LIABILITY AND INDEMNITY:
   - Caregiver responsible for care quality
   - Caregiver indemnifies platform
   - Limitation of platform liability
   - Insurance recommendation

   SUSPENSION AND TERMINATION:
   - Grounds for suspension
   - Termination process
   - Effect of termination

   DISPUTE RESOLUTION:
   - Internal dispute process
   - Complaints procedure
   - Governing law

   DATA PROTECTION:
   - Reference to Privacy Policy
   - GDPR rights

   CHANGES TO TERMS:
   - Right to modify
   - Notification of changes

2. Critical legal elements:
   - IR35-compliant self-employment language
   - No mutuality of obligation
   - Control rests with caregiver
   - Substitution clause
   - No employment benefits

3. Legal notes:
   - Mark sections requiring legal review
   - Flag employment law scrutiny points
   - Note HMRC considerations

OUTPUT: Create /docs/tiers/tier1/website-content/legal/terms-of-service-caregivers.md with:
- Complete draft Terms
- Self-employment provisions (highlighted)
- Legal review markers
- Placeholders clearly marked
- IR35 considerations
```

**Expected Output**: `/docs/tiers/tier1/website-content/legal/terms-of-service-caregivers.md`

---

### WEB-010: Legal Pages - Privacy Policy

**Priority**: 10 (Critical - Legal)
**Assigned Agent**: `compliance-specialist`
**Dependencies**: None (legal foundation)

**Agent Prompt**:
```
Draft Privacy Policy for Tier 1 (standard personal data only).

CONTEXT:
- Read /docs/ROADMAP.md for Tier 1 data scope
- Read /docs/compliance/dpia.md for data processing details
- Read /docs/compliance/legal-framework.md for GDPR requirements
- Read /docs/tiers/tier1/compliance.md for data categories
- Tier 1: NO health data, NO special category data
- NOTE: This is a DRAFT for legal review

REQUIREMENTS:
1. Draft complete Privacy Policy including:

   INTRODUCTION:
   - Data controller details (placeholder)
   - ICO registration number (placeholder)
   - Contact for data protection queries

   DATA WE COLLECT:

   Account Data:
   - Name, email, phone, postcode
   - Password (hashed, never stored plain)
   - Role (care receiver, caregiver, family)

   Profile Data:
   - Caregiver: Bio, photo, experience, rates, availability
   - Care receiver: Basic profile, emergency contacts
   - Family member: Relationship to care receiver

   Verification Data:
   - ID document images (processed by Stripe)
   - Right to work documents
   - DBS certificate (if voluntarily provided)
   - Verification status

   Transaction Data:
   - Booking records
   - Payment records (card data held by Stripe)
   - Payout records

   Communication Data:
   - Messages between users
   - Support communications

   Technical Data:
   - IP address, browser type, device
   - Cookies (see Cookie Policy)

   DATA WE DO NOT COLLECT AT TIER 1:
   - Medical conditions
   - Health-related care requirements
   - Care plans or clinical documents
   - Risk assessments

   HOW WE USE DATA:
   - Provide platform services
   - Process bookings and payments
   - Verify identity and right to work
   - Safeguarding purposes
   - Improve services
   - Communicate with users
   - Legal compliance

   LEGAL BASIS:
   - Contract performance
   - Legitimate interests
   - Legal obligation
   - Consent (where applicable)

   DATA SHARING:
   - Between care receivers and caregivers (booking context)
   - Payment processors (Stripe)
   - Identity verification (Stripe Identity)
   - Safeguarding authorities (if required)
   - Legal requirements

   DATA RETENTION:
   - Active accounts: Duration of relationship
   - Booking records: 7 years (financial)
   - Safeguarding records: 7 years
   - Deleted accounts: 30 days then permanent deletion

   YOUR RIGHTS:
   - Access (Subject Access Request)
   - Rectification
   - Erasure (right to be forgotten)
   - Data portability
   - Objection
   - Restriction
   - Withdraw consent
   - Complain to ICO

   SECURITY:
   - Encryption at rest and in transit
   - Access controls
   - Regular security reviews

   INTERNATIONAL TRANSFERS:
   - Data stored in UK/EU
   - Third-party processors (Stripe - adequacy decision)

   COOKIES:
   - Reference to Cookie Policy
   - Essential vs non-essential

   CHANGES:
   - Right to update
   - Notification of material changes

   CONTACT:
   - Data protection contact
   - ICO contact details

2. GDPR compliance checklist:
   - Lawful basis for each processing activity
   - Data subject rights clearly explained
   - Retention periods specified
   - Third-party processors identified

3. Legal notes:
   - Mark sections requiring legal review
   - Note placeholder for ICO registration number
   - Flag data mapping verification needed

OUTPUT: Create /docs/tiers/tier1/website-content/legal/privacy-policy.md with:
- Complete draft Privacy Policy
- GDPR compliance mapping
- Legal review markers
- Placeholders clearly marked
```

**Expected Output**: `/docs/tiers/tier1/website-content/legal/privacy-policy.md`

---

### WEB-011: Legal Pages - Safeguarding Policy

**Priority**: 11 (Critical - Compliance)
**Assigned Agent**: `compliance-specialist`
**Dependencies**: APP-010 (Safeguarding Specification)

**Agent Prompt**:
```
Draft public-facing Safeguarding Policy for Tier 1.

CONTEXT:
- Read /docs/ROADMAP.md for Tier 1 scope
- Read /docs/compliance/legal-framework.md for Care Act 2014 requirements
- Read /docs/tiers/tier1/compliance.md for safeguarding requirements
- Read /docs/product/features/tier1-safeguarding-specification.md for system details
- NOTE: This is a DRAFT for legal review

REQUIREMENTS:
1. Draft complete Safeguarding Policy including:

   INTRODUCTION:
   - Our commitment to safeguarding
   - Scope of policy
   - Care Act 2014 compliance statement

   DEFINITIONS:
   - Safeguarding
   - Abuse (types: physical, emotional, financial, neglect, etc.)
   - Vulnerable adult
   - Safeguarding concern

   OUR RESPONSIBILITIES:
   - As an Introduction Agency
   - Verification of caregivers
   - Reporting mechanisms
   - Cooperation with authorities
   - Staff training

   CAREGIVER RESPONSIBILITIES:
   - Duty to report concerns
   - Professional conduct
   - Recognizing signs of abuse
   - Emergency procedures

   CARE RECEIVER/FAMILY RESPONSIBILITIES:
   - Reporting concerns
   - Providing accurate information
   - Emergency contact maintenance

   HOW TO REPORT A CONCERN:
   - In-app reporting
   - Email reporting
   - Phone reporting (if applicable)
   - What information to provide
   - Anonymous reporting option

   WHAT HAPPENS WHEN YOU REPORT:
   - Acknowledgment (24 hours)
   - Investigation process
   - Confidentiality
   - Outcome notification
   - Escalation to authorities

   SAFEGUARDING ADULTS BOARD (SAB) LIAISON:
   - When we escalate to SAB
   - Cooperation with investigations
   - Information sharing

   EMERGENCY SITUATIONS:
   - Call 999 for immediate danger
   - Platform emergency response
   - After-hours procedures

   TYPES OF ABUSE WE MONITOR:
   - Physical abuse
   - Emotional/psychological abuse
   - Financial exploitation
   - Neglect
   - Domestic abuse
   - Discriminatory abuse

   PREVENTION:
   - Verification processes
   - Payment protection (anti-exploitation)
   - Content monitoring
   - Review system
   - Training resources

   RECORD KEEPING:
   - What we record
   - Retention period (7 years)
   - Confidentiality

   REVIEW:
   - Annual policy review
   - Last updated date

   CONTACT:
   - Safeguarding lead contact
   - Support contact
   - SAB contact (general guidance)

2. Care Act 2014 alignment:
   - Section 42 duties referenced
   - Six safeguarding principles incorporated
   - SAB liaison procedures

3. Language:
   - Clear and accessible
   - Non-alarming but serious
   - Action-oriented

OUTPUT: Create /docs/tiers/tier1/website-content/legal/safeguarding-policy.md with:
- Complete draft Safeguarding Policy
- Care Act 2014 compliance mapping
- Legal review markers
- Emergency contact placeholders
```

**Expected Output**: `/docs/tiers/tier1/website-content/legal/safeguarding-policy.md`

---

### WEB-012: Legal Pages - Cookie Policy

**Priority**: 12 (High - Compliance)
**Assigned Agent**: `compliance-specialist`
**Dependencies**: None

**Agent Prompt**:
```
Draft Cookie Policy for Tier 1 website (PECR compliance).

CONTEXT:
- Read /docs/tiers/tier1/compliance.md for PECR requirements
- Read /docs/compliance/legal-framework.md for cookie requirements
- NOTE: This is a DRAFT for legal review

REQUIREMENTS:
1. Draft complete Cookie Policy including:

   INTRODUCTION:
   - What cookies are
   - Why we use them
   - PECR compliance statement

   TYPES OF COOKIES WE USE:

   Essential Cookies (Required):
   - Session cookies
   - Authentication cookies
   - Security cookies
   - Load balancing
   - Cannot be disabled

   Functional Cookies:
   - Language preferences
   - User preferences
   - Can be disabled

   Analytics Cookies:
   - Google Analytics (or alternative)
   - Usage patterns
   - Performance monitoring
   - Require consent

   Marketing Cookies (if any):
   - Third-party advertising
   - Tracking pixels
   - Require consent
   - May not be used at Tier 1 launch

   COOKIE TABLE:
   - Cookie name
   - Purpose
   - Duration
   - Type (essential/functional/analytics/marketing)
   - First or third party

   HOW TO MANAGE COOKIES:
   - Cookie consent banner
   - Cookie preferences
   - Browser settings
   - Impact of blocking cookies

   THIRD-PARTY COOKIES:
   - Stripe (payment processing)
   - Google Analytics (if used)
   - Other integrations

   CHANGES:
   - Right to update
   - Notification of changes

   CONTACT:
   - Questions about cookies

2. PECR compliance:
   - Prior consent for non-essential cookies
   - Clear information about cookies
   - Easy way to refuse

3. Technical implementation notes:
   - Cookie consent banner requirements
   - Preference storage
   - Analytics blocking until consent

OUTPUT: Create /docs/tiers/tier1/website-content/legal/cookie-policy.md with:
- Complete draft Cookie Policy
- Cookie inventory table
- PECR compliance notes
- Implementation guidance
```

**Expected Output**: `/docs/tiers/tier1/website-content/legal/cookie-policy.md`

---

### WEB-013: Contact Page

**Priority**: 13 (Medium)
**Assigned Agent**: `content-architect`
**Dependencies**: WEB-001 (Homepage)

**Agent Prompt**:
```
Create Contact page content.

CONTEXT:
- Read /docs/tiers/common/website/roadmap.md for contact requirements

REQUIREMENTS:
1. Create complete Contact page copy:

   PAGE HERO:
   - Headline: Welcoming contact
   - Subheadline: How can we help?

   CONTACT METHODS:

   General Inquiries:
   - Email: [placeholder]
   - Response time: 24-48 hours

   Support:
   - Email: support@[placeholder]
   - For account issues, booking questions, technical help

   Safeguarding:
   - Email: safeguarding@[placeholder]
   - For safety concerns (24-hour response)

   Caregiver Applications:
   - Email: [placeholder]
   - For application status, verification questions

   CONTACT FORM:
   - Name
   - Email
   - Subject (dropdown: General, Support, Caregiver Application, Safeguarding, Other)
   - Message
   - Submit button
   - Confirmation message

   FAQ REFERENCE:
   - "Check our FAQ for quick answers"
   - Link to FAQ

   EMERGENCY:
   - "For emergencies, call 999"
   - Platform is NOT emergency services

   BUSINESS ADDRESS:
   - Company address (placeholder)
   - Registered company number (placeholder)

2. Tone: Helpful, accessible, responsive

OUTPUT: Create /docs/tiers/tier1/website-content/contact.md with:
- Complete page copy
- Contact form fields
- Response time expectations
```

**Expected Output**: `/docs/tiers/tier1/website-content/contact.md`

---

## Execution Sequence Summary

### Application (LIST 1) - Feature-Specs-First Sequence:

> **Philosophy**: Define WHAT we're building (feature specs) before designing HOW to build it (technical architecture).

```
Phase 1 - Core Feature Specifications (Week 1):
  APP-005: Booking Flow Spec (product-requirements-specialist) [No dependencies]
  APP-006: Verification System Spec (product-requirements-specialist) [No dependencies]
  APP-007: Search & Discovery Spec (product-requirements-specialist) [No dependencies]

Phase 2 - Supporting Feature Specifications (Week 2):
  APP-008: Messaging System Spec (product-requirements-specialist) [Depends: APP-005]
  APP-009: Admin Dashboard Spec (product-requirements-specialist) [Depends: APP-006]
  APP-010: Safeguarding Spec (compliance-specialist) [Depends: APP-009]

Phase 3 - Technical Architecture (Week 3):
  APP-001: Database Schema (technical-architect) [Depends: APP-005, APP-006, APP-007]
  APP-004: Route Map (route-map-architect) [Depends: APP-005 through APP-010]

Phase 4 - API Layer (Week 4):
  APP-002: API Specification (technical-architect) [Depends: APP-001, APP-004]
  APP-003: Stripe Integration (technical-architect) [Depends: APP-002, APP-005]
```

**Rationale**: Feature specifications reveal data requirements, screen needs, and API contracts.
Building technical architecture on this foundation reduces rework and ensures alignment.

### Website (LIST 2) - Recommended Sequence:

```
Week 1:
  WEB-001: Homepage (content-architect) [No dependencies]
  WEB-008: Terms - Care Receivers (compliance-specialist) [No dependencies]
  WEB-010: Privacy Policy (compliance-specialist) [No dependencies]

Week 2:
  WEB-002: How It Works - Families (content-architect) [Depends: WEB-001]
  WEB-003: How It Works - Caregivers (content-architect) [Depends: WEB-001]
  WEB-004: Trust & Safety (content-architect) [Depends: WEB-001]
  WEB-009: Terms - Caregivers (compliance-specialist) [Depends: WEB-008]
  WEB-012: Cookie Policy (compliance-specialist) [No dependencies]

Week 3:
  WEB-005: Pricing (content-architect) [Depends: WEB-001]
  WEB-006: About Us (content-architect) [Depends: WEB-001]
  WEB-011: Safeguarding Policy (compliance-specialist) [Depends: APP-010]

Week 4:
  WEB-007: FAQ (content-architect) [Depends: WEB-001 through WEB-006]
  WEB-013: Contact (content-architect) [Depends: WEB-001]
```

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-01 | Product Director | Initial priority actions document |
| 1.1 | 2026-02-01 | Product Director | Reordered to feature-specs-first approach |

---

**END OF DOCUMENT**
