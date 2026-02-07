# Tier 1 Verification System Specification

**Document Purpose**: Complete specification for the Tier 1 verification system for the UK elderly care marketplace, covering identity verification, right to work checks, and voluntary DBS processes for companionship-only services.

**Document Owner**: Product Manager
**Status**: ACTIVE - Tier 1 Launch Specification
**Last Updated**: 2026-02-06
**Tier**: Tier 1 (Minimal) - Companionship Only

---

## Table of Contents

1. [Overview](#1-overview)
2. [Verification Levels](#2-verification-levels)
3. [User Stories](#3-user-stories)
4. [Identity Verification](#4-identity-verification)
5. [Right to Work Verification](#5-right-to-work-verification)
6. [DBS Check Process (Voluntary)](#6-dbs-check-process-voluntary)
7. [Profile Verification](#7-profile-verification)
8. [Admin Review Workflows](#8-admin-review-workflows)
9. [Trust Badges & Display](#9-trust-badges--display)
10. [Data Requirements](#10-data-requirements)
11. [Edge Cases](#11-edge-cases)
12. [Acceptance Criteria](#12-acceptance-criteria)
13. [Out of Scope (Tier 1)](#13-out-of-scope-tier-1)

---

## 1. Overview

### 1.1 Purpose

The Tier 1 verification system establishes trust and safety for companionship-only services while minimizing onboarding friction and compliance costs. It balances vulnerable adult protection with pragmatic market entry constraints.

**Primary Objectives**:
- Verify caregiver identity to prevent fraud and impersonation
- Confirm legal right to work in the UK
- Enable voluntary DBS disclosure as a trust signal
- Provide care receivers with transparent verification status
- Create admin workflows for quality control

**Key Constraints**:
- Companionship services only (no personal care)
- DBS checks NOT legally mandatory at Tier 1
- Keep onboarding under 48 hours for verified caregivers
- Minimize manual admin workload

### 1.2 Tier 1 Service Scope

**Services Permitted**:
- Companionship (conversation, activities)
- Light housework (cleaning, tidying)
- Shopping and errands (accompanied)
- Meal preparation (no feeding assistance)
- Transportation (if caregiver has vehicle)

**NOT Permitted at Tier 1**:
- Personal care (washing, dressing, toileting)
- Mobility assistance requiring physical support
- Medication assistance (even prompting)
- Overnight care
- Live-in care
- Dementia-specific care requiring specialist skills

**Regulatory Rationale**: Tier 1 services do NOT constitute "regulated activity" under the Safeguarding Vulnerable Groups Act 2006, therefore DBS checks are not legally mandatory.

### 1.3 Introduction Agency Model

**Platform Role**: Introduction Agency (NOT employer, NOT care provider)
**Caregiver Status**: Self-employed independent contractors
**CQC Registration**: NOT REQUIRED (FDR-002)
**Compliance Framework**: Care Act 2014 safeguarding duties, NOT CQC regulatory framework

**Implication**: Platform performs due diligence on caregivers but does NOT employ them. Verification standards reflect duty of care to vulnerable adults while respecting independent contractor relationship.

### 1.4 Strategic Context

**Tiered Market Entry** (FDR-003):
- Tier 1 launches with minimal viable verification
- DBS mandatory at Tier 2 (personal care services)
- Qualification verification at Tier 2 (care skills)
- Insurance verification at Tier 2 (liability coverage)

**Success Metrics for Tier 1**:
- 50+ verified caregivers within 3 months
- Average onboarding time <48 hours
- <5% rejection rate (minimize caregiver attrition)
- Zero safeguarding incidents related to identity fraud
- 30%+ of caregivers voluntarily submit DBS (trust signal adoption)

---

## 2. Verification Levels

### 2.1 Verification Tier Structure

Tier 1 verification consists of three levels, each unlocking different platform capabilities:

| Level | Name | Requirements | Capabilities Unlocked | Profile Status |
|-------|------|--------------|---------------------|----------------|
| **L0** | Unverified | Email + phone verified only | Profile creation, no visibility | "Profile Under Review" |
| **L1** | Identity Verified | ID + Right to Work verified | Profile searchable, bookings enabled | "Identity Verified" badge |
| **L2** | Enhanced (Optional) | L1 + Voluntary DBS | Higher search priority, trust signal | "DBS Verified" badge (additional) |

### 2.2 Level 0: Unverified (Registration Complete)

**Requirements Met**:
- Email address verified (double opt-in)
- Phone number verified (SMS OTP)
- Profile created (name, bio, photo, services, rate)
- Bank account connected (Stripe Connect)
- Terms of Service accepted (self-employed status)

**Platform Access**:
- Complete profile wizard
- View dashboard (no bookings yet)
- Upload verification documents
- See onboarding checklist

**Care Receiver Visibility**: Profile NOT searchable, NOT visible in discovery

**Admin View**: Visible in "Pending Verification" queue

**Expected Duration**: 0-7 days (caregiver completes documents)

### 2.3 Level 1: Identity Verified (Minimum to Go Live)

**Requirements Met** (all L0 + following):
- Government-issued ID verified (passport or driving license)
- Right to work confirmed (UK passport or UKVI share code)
- Admin review approved

**Platform Access**:
- Profile goes live (searchable by care receivers)
- Can receive and accept booking requests
- Can message care receivers (after booking request)
- Earnings visible in dashboard

**Care Receiver Visibility**:
- Profile appears in search results
- "Identity Verified" badge displayed
- No DBS status shown (no badge)

**Admin View**: Moved from "Pending" to "Active Caregivers"

**Expected Duration**: 24-48 hours from document submission

### 2.4 Level 2: Enhanced Verification (Voluntary DBS)

**Requirements Met** (all L1 + following):
- Existing DBS certificate uploaded (Basic, Standard, or Enhanced)
- DBS certificate number verified by admin
- Certificate valid (not expired - recommend 3-year cycle)
- Certificate matches caregiver name and DOB

**Platform Access** (same as L1 + following enhancements):
- Higher priority in search results (care receivers can filter by DBS)
- "DBS Verified" badge displayed on profile
- Featured in "Top Caregivers" recommendations

**Care Receiver Visibility**:
- "Identity Verified" badge
- "DBS Verified" badge (additional)
- Filter: "Show only DBS verified caregivers"

**Admin View**: DBS verification status tracked, expiry date monitored

**Expected Duration**: 48 hours from DBS certificate upload

**Strategic Note**: At Tier 2, DBS becomes mandatory for personal care. Tier 1 voluntary DBS creates path to Tier 2 and competitive advantage.

---

## 3. User Stories

### 3.1 Caregiver Onboarding Journey

**US-01: New Caregiver Registration**
- **As a** professional caregiver
- **I want** to register on the platform quickly and easily
- **So that** I can start receiving booking requests and earning income

**Acceptance Criteria**:
- [ ] Registration form requires: Name, email, phone, postcode, password
- [ ] Email verification link sent immediately (10-minute expiry)
- [ ] Phone verification SMS sent immediately (3 attempts allowed)
- [ ] Account created in "Unverified" status after phone verification
- [ ] Redirected to onboarding wizard after verification

---

**US-02: Profile Creation Wizard**
- **As a** new caregiver
- **I want** a guided profile setup process
- **So that** I know what information is required and why

**Acceptance Criteria**:
- [ ] Wizard steps: Photo → Bio → Services → Rate → Availability → Bank Account
- [ ] Progress indicator shows completion percentage
- [ ] Validation prevents skipping required fields
- [ ] "Save and Continue Later" option available
- [ ] "Why do we need this?" tooltips for each field
- [ ] Companionship services only at Tier 1 (personal care greyed out with "Available at Tier 2" message)

---

**US-03: Identity Verification Upload**
- **As a** new caregiver
- **I want** to upload my ID document securely
- **So that** the platform verifies my identity

**Acceptance Criteria**:
- [ ] Accepts: UK Passport (photo page), UK Driving License (front and back), EU National ID Card
- [ ] Photo upload via file picker or camera (mobile)
- [ ] Image quality validation (minimum 800x600px, clear and readable)
- [ ] Selfie photo required for liveness check
- [ ] Integration with Stripe Identity or similar (automated verification)
- [ ] Fallback: Manual admin review if automated verification fails
- [ ] Upload progress indicator and success confirmation
- [ ] Estimated verification time displayed: "Usually verified within 24 hours"

---

**US-04: Right to Work Verification**
- **As a** new caregiver
- **I want** to prove I can legally work in the UK
- **So that** the platform approves my profile

**Acceptance Criteria**:
- [ ] UK passport holders: Automatic right to work (from ID verification)
- [ ] Non-UK passport holders: Required to enter UKVI share code
- [ ] Share code entered, admin checks via UKVI online service (within 24 hours)
- [ ] Visa status displayed to admin: Full-time, part-time, hours limited, expiry date
- [ ] Visa expiry tracked, automated reminders sent 60/30/7 days before expiry
- [ ] Profile auto-deactivated if visa expires without renewal

---

**US-05: Voluntary DBS Certificate Upload**
- **As a** caregiver with an existing DBS certificate
- **I want** to upload it to gain a competitive advantage
- **So that** care receivers see I'm DBS verified

**Acceptance Criteria**:
- [ ] "Do you have a DBS certificate?" prompt (optional, not required)
- [ ] Accepts: Basic, Standard, or Enhanced DBS certificate (PDF or image)
- [ ] Certificate number and issue date captured
- [ ] "Why upload DBS?" explanation: "Stand out to families, prepare for personal care services (Tier 2)"
- [ ] Admin verifies certificate authenticity (manual check)
- [ ] "DBS Verified" badge added to profile after approval
- [ ] DBS expiry tracked (3-year recommendation), renewal reminders sent

---

**US-06: Admin Approval Notification**
- **As a** caregiver awaiting verification
- **I want** to be notified when my profile is approved
- **So that** I know I can start receiving bookings

**Acceptance Criteria**:
- [ ] Email notification sent immediately when profile approved
- [ ] In-app notification visible on dashboard
- [ ] Email includes: "Your profile is now live" + link to view public profile + next steps (set availability, respond to bookings within 24h)
- [ ] SMS notification (optional, if enabled)
- [ ] Push notification (if mobile app)

---

**US-07: Verification Rejection and Resubmission**
- **As a** caregiver whose verification failed
- **I want** to understand why and resubmit
- **So that** I can correct issues and get approved

**Acceptance Criteria**:
- [ ] Email notification sent with rejection reason (ID unclear, expired, name mismatch, etc.)
- [ ] In-app notification with actionable guidance: "Please upload a clearer photo of your passport"
- [ ] Resubmission allowed (no limit on attempts)
- [ ] Admin review SLA: 24-48 hours per submission
- [ ] "Need help?" link to support for complex cases

---

### 3.2 Care Receiver Trust Journey

**US-08: View Caregiver Verification Status**
- **As a** care receiver searching for caregivers
- **I want** to see verification badges clearly
- **So that** I know which caregivers are trustworthy

**Acceptance Criteria**:
- [ ] "Identity Verified" badge displayed prominently on profile card
- [ ] "DBS Verified" badge displayed if caregiver has DBS
- [ ] Tooltip on badge hover: "What does this mean?" with explanation
- [ ] Verification status shown in search filters: "Show only Identity Verified" (always checked, cannot uncheck), "Show only DBS Verified" (optional filter)
- [ ] Profile page has "Verification Details" section showing: Identity Verified (checkmark + date), Right to Work Verified (checkmark + date), DBS Verified (checkmark + date + certificate level: Basic/Standard/Enhanced)

---

**US-09: Filter by DBS Verification**
- **As a** care receiver concerned about safety
- **I want** to filter caregivers by DBS status
- **So that** I only see caregivers with background checks

**Acceptance Criteria**:
- [ ] "DBS Verified" checkbox filter in search sidebar
- [ ] Filter reduces results to only caregivers with verified DBS
- [ ] Badge count shows how many DBS-verified caregivers in area: "12 DBS-verified caregivers within 10 miles"
- [ ] If no DBS-verified caregivers in area, show message: "No DBS-verified caregivers found. DBS checks are voluntary at Tier 1 (companionship services). All caregivers are identity verified."

---

**US-10: Understand Verification Badges**
- **As a** care receiver unfamiliar with DBS checks
- **I want** to understand what verification badges mean
- **So that** I can make informed booking decisions

**Acceptance Criteria**:
- [ ] "About Verification" link in search results header
- [ ] Modal or page explaining: Identity Verified (ID + right to work checked), DBS Verified (criminal record check, voluntary at Tier 1), Why DBS is voluntary (companionship services, not personal care)
- [ ] "Is this safe?" FAQ: Platform performs identity checks, DBS is optional for companionship, DBS mandatory for personal care (Tier 2)
- [ ] Link to Safeguarding Policy and Trust & Safety resources

---

### 3.3 Admin Verification Workflows

**US-11: Admin Verification Queue Management**
- **As an** admin verifying caregivers
- **I want** a prioritized queue of pending verifications
- **So that** I can approve caregivers efficiently

**Acceptance Criteria**:
- [ ] "Caregiver Verification Queue" dashboard with tabs: Pending (newest first), In Review (assigned to me), Rejected (last 30 days), Approved (last 7 days)
- [ ] Queue displays: Caregiver name, registration date, days pending, assigned admin, priority flag (older than 48h)
- [ ] Click caregiver to open verification review interface
- [ ] Bulk actions: Assign to me, Flag for senior review, Mark as urgent
- [ ] Filters: Registration date range, days pending, assigned admin
- [ ] SLA tracking: Red flag if pending >48 hours

---

**US-12: Admin Identity Verification Review**
- **As an** admin reviewing identity documents
- **I want** to see all uploaded documents and verification results
- **So that** I can approve or reject with confidence

**Acceptance Criteria**:
- [ ] Verification review panel shows: Caregiver name, email, phone, registration date, profile completeness
- [ ] Document viewer: ID document images (passport, driving license), Selfie photo
- [ ] Stripe Identity result displayed (if automated verification succeeded or failed)
- [ ] Checklist: Photo clear and readable (yes/no), Name matches profile (yes/no), ID not expired (yes/no), Selfie matches ID photo (yes/no)
- [ ] Right to work status: UK passport (auto-approved), UKVI share code (pending check or verified)
- [ ] Admin actions: Approve, Reject with reason, Request resubmission
- [ ] Rejection reasons dropdown: ID expired, ID unclear, Name mismatch, Selfie doesn't match, Suspected fake ID, Other (free text)
- [ ] Notes field for internal documentation
- [ ] Audit trail logs all admin actions (who approved/rejected, when, reason)

---

**US-13: Admin UKVI Right to Work Check**
- **As an** admin verifying right to work
- **I want** to check UKVI share codes efficiently
- **So that** non-UK nationals are verified correctly

**Acceptance Criteria**:
- [ ] Non-UK passport caregivers flagged in queue with "Right to Work Check Required"
- [ ] UKVI share code displayed, link to UKVI online checking service
- [ ] Admin enters caregiver DOB + share code on UKVI portal
- [ ] Admin records result: Visa type, expiry date, work restrictions (full-time/part-time/hours limited)
- [ ] Visa expiry date saved, system sends automated renewal reminders
- [ ] If visa expired: Admin marks "Right to Work Expired", profile auto-deactivated
- [ ] If visa restricts hours: Admin notes restriction, caregiver notified of limitation

---

**US-14: Admin DBS Certificate Verification**
- **As an** admin verifying voluntary DBS certificates
- **I want** to confirm certificate authenticity
- **So that** only valid DBS checks earn the badge

**Acceptance Criteria**:
- [ ] DBS verification queue separate from identity verification (optional)
- [ ] DBS certificate PDF/image displayed for review
- [ ] Checklist: Certificate not expired (issue date within 3 years recommended), Certificate number present, Name matches caregiver profile, DOB matches caregiver profile, Certificate level (Basic/Standard/Enhanced) recorded
- [ ] Admin searches DBS Update Service (if caregiver subscribed) to confirm validity
- [ ] If certificate valid: Approve, add "DBS Verified" badge, record certificate number + issue date + level
- [ ] If certificate invalid: Reject with reason (expired, name mismatch, suspected fake)
- [ ] Notes field for internal documentation
- [ ] Audit trail logs all DBS verification actions

---

**US-15: Admin Verification Rejection Communication**
- **As an** admin rejecting a verification
- **I want** to send clear feedback to the caregiver
- **So that** they can correct issues and resubmit

**Acceptance Criteria**:
- [ ] Rejection reason required (cannot reject without reason)
- [ ] Rejection email template auto-populated with reason
- [ ] Email includes: Specific reason (e.g., "Your passport photo is unclear, please upload a clearer image"), Resubmission instructions, Estimated review time for resubmission (24-48 hours), Support contact if assistance needed
- [ ] Caregiver receives email + in-app notification
- [ ] Admin can add custom message to template (for complex cases)
- [ ] Rejection logged in audit trail with admin name + timestamp

---

## 4. Identity Verification

### 4.1 Automated Identity Verification (Primary Method)

**Provider**: Stripe Identity (or equivalent: Onfido, Yoti)

**Rationale**:
- PCI DSS compliant (required for payment processing)
- Integrated with Stripe Connect (already used for payouts)
- Covers 95%+ of UK ID documents
- Liveness detection prevents photo fraud
- Automated verification reduces admin workload

**Process Flow**:
1. Caregiver uploads government-issued ID (passport or driving license)
2. Caregiver takes selfie photo (liveness check)
3. Stripe Identity API analyzes documents and selfie
4. Result returned: Verified, Failed, or Manual Review Required
5. If Verified: Move to admin queue for final approval
6. If Failed: Notify caregiver to resubmit
7. If Manual Review Required: Admin reviews documents manually

**Accepted Documents** (Tier 1):
- UK Passport (photo page)
- UK Driving License (photocard, front and back)
- EU National ID Card (for EU citizens with right to work)
- Non-UK Passport (requires UKVI share code for right to work)

**NOT Accepted**:
- Birth certificates (not photo ID)
- Utility bills (not identity proof)
- Paper driving licenses (expired format)
- Work permits alone (must have photo ID)

**Data Captured**:
- Full name (as on ID)
- Date of birth
- Document number (passport/license number)
- Document type (passport/driving license/EU ID)
- Document expiry date
- Nationality
- Selfie photo (for comparison)

**Verification Checks**:
- Document authenticity (security features, holograms)
- Document validity (not expired, not fake)
- Name match (ID name = profile name)
- Liveness detection (selfie is live person, not photo of photo)
- Face match (selfie matches ID photo)

**Success Rate Target**: >90% automated verification success (based on Stripe Identity benchmarks)

**Fallback**: Manual admin review if automated verification fails

### 4.2 Manual Identity Verification (Fallback)

**Trigger Conditions**:
- Stripe Identity returns "Manual Review Required"
- Automated verification failed (unclear photo, document damaged)
- Caregiver appeals automated rejection
- Edge case ID documents (non-standard)

**Admin Review Checklist**:
- [ ] Photo clear and legible
- [ ] ID not expired (expiry date in future)
- [ ] Name on ID matches caregiver profile name
- [ ] Date of birth consistent with profile
- [ ] ID appears genuine (no obvious signs of tampering)
- [ ] Selfie shows same person as ID photo (visual comparison)

**Admin Decision**:
- **Approve**: ID verification passed, move to right to work check
- **Reject**: ID verification failed, reason documented, caregiver notified
- **Request Resubmission**: Photo unclear, ask caregiver to upload clearer image

**SLA**: 24 hours for manual reviews (weekdays), 48 hours (weekends)

**Quality Control**: Random 10% sample reviewed by senior admin for consistency

### 4.3 Identity Verification State Machine

**States**: `not_started` → `documents_uploaded` → `automated_verification` → `admin_review` → `verified` OR `rejected`

```
[not_started]
    |
    | Event: Caregiver uploads ID + selfie
    | Action: Send to Stripe Identity API
    |
    v
[automated_verification]
    |
    | IF Stripe result = "verified":
    |     v
    |   [admin_review] (final quality check)
    |       |
    |       | Event: Admin approves
    |       | Action: Set identity_verified = true, unlock profile
    |       v
    |   [verified]
    |
    | IF Stripe result = "failed" OR "manual_review_required":
    |     v
    |   [admin_review] (detailed manual check)
    |       |
    |       | IF admin approves:
    |           v
    |       [verified]
    |       |
    |       | IF admin rejects:
    |           v
    |       [rejected]
    |           |
    |           | Event: Caregiver resubmits documents
    |           | Action: Reset to [automated_verification]
```

### 4.4 Identity Verification Data Storage

**Secure Storage Requirements**:
- ID document images stored in encrypted cloud storage (AWS S3 with KMS)
- Selfie photos stored separately (deleted after verification)
- Access restricted to admin users with 2FA enabled
- Audit log tracks all document access (who viewed, when)

**Data Retention**:
- ID document images: Retained 7 days after verification (for appeals), then deleted
- Verification status: Retained indefinitely (verified = true/false)
- Verification date: Retained indefinitely (for audit trail)
- Verification method: Retained (automated vs manual)

**GDPR Compliance**:
- ID images considered "special category data" (not health data, but sensitive personal data)
- Legal basis: Contract performance (identity verification required for platform use)
- Data minimization: Only store verification status long-term, delete images
- Subject access requests: Caregivers can download verification status report

---

## 5. Right to Work Verification

### 5.1 Purpose and Legal Context

**Legal Requirement**: Employers and agencies have a statutory duty to prevent illegal working (Immigration, Asylum and Nationality Act 2006, Section 15).

**Platform Duty**: As an Introduction Agency, the platform has a duty of care to ensure caregivers are legally permitted to work in the UK.

**Penalties for Non-Compliance**: Civil penalty up to £20,000 per illegal worker (employing illegal workers).

**Introduction Agency Status**: Platform does NOT employ caregivers, but performs due diligence checks.

### 5.2 Right to Work Check Process

**UK Nationals (British Citizens)**:
- UK passport = automatic right to work (no further checks needed)
- UK birth certificate + National Insurance number = manual admin review required

**EU/EEA/Swiss Nationals**:
- EU Settlement Scheme status required (Settled or Pre-Settled)
- UKVI share code entered by caregiver
- Admin checks UKVI online service: https://www.gov.uk/view-right-to-work

**Non-EU Nationals**:
- Valid UK visa with work permission required
- UKVI share code entered by caregiver
- Admin checks UKVI online service for visa status, work restrictions, expiry date

**Share Code Check Workflow**:
1. Caregiver enters UKVI share code (9-character code)
2. Caregiver enters date of birth (required for UKVI check)
3. Admin navigates to UKVI online checking service
4. Admin enters share code + DOB
5. UKVI service displays: Visa type, work restrictions (full-time/part-time/hours limited), visa expiry date
6. Admin records results in platform
7. If visa valid: Approve right to work
8. If visa expired or no work permission: Reject right to work

### 5.3 Visa Types and Work Restrictions

**Common Visa Types for Caregivers**:
- **Skilled Worker Visa**: Full-time work permitted (unrestricted)
- **Health and Care Worker Visa**: Full-time work in health/care sector (permitted)
- **Graduate Visa**: Full-time work permitted, 2-year duration (eligible)
- **Spouse/Partner Visa**: Full-time work permitted (eligible)
- **Student Visa**: Part-time work only (20 hours/week during term, full-time during holidays) - RESTRICTED

**Work Restrictions**:
- **Full-time permitted**: No platform restrictions, caregiver can accept unlimited bookings
- **Part-time permitted (hours limited)**: Admin notes restriction, caregiver notified, platform does NOT enforce (caregiver responsible for managing hours)
- **No work permission**: Right to work rejected, profile not approved

**Visa Expiry Tracking**:
- Visa expiry date stored in caregiver profile
- Automated email reminders sent: 60 days, 30 days, 7 days before expiry
- Email content: "Your visa expires soon. Please renew and update your share code to keep your profile active."
- If visa expires without renewal: Profile auto-deactivated, bookings cancelled, caregiver notified

### 5.4 Right to Work Verification Data Storage

**Data Captured**:
- UKVI share code (9-character code)
- Visa type (Skilled Worker, Spouse, Graduate, etc.)
- Visa expiry date
- Work restrictions (full-time, part-time, hours limited)
- Verification date (when checked)
- Admin notes (any special conditions)

**Data Retention**:
- Share code: Deleted after verification (not needed long-term)
- Verification status: Retained indefinitely (right_to_work_verified = true/false)
- Visa expiry date: Retained until expiry (for renewal reminders)
- Verification date: Retained indefinitely (audit trail)

**Re-Verification Cycle**:
- Right to work re-verified when visa renewed (caregiver submits new share code)
- Annual re-verification for UK nationals (low risk, spot-check only)
- No re-verification needed for British citizens (permanent right to work)

### 5.5 Right to Work Verification State Machine

**States**: `not_started` → `share_code_submitted` → `admin_checking` → `verified` OR `rejected`

```
[not_started]
    |
    | Event: Caregiver submits UKVI share code + DOB
    | Action: Assign to admin queue for checking
    |
    v
[admin_checking]
    |
    | Event: Admin checks UKVI online service
    | Action: Record visa status, expiry date, work restrictions
    |
    | IF visa valid + work permitted:
    |     v
    |   [verified]
    |       |
    |       | Action: Set right_to_work_verified = true, unlock profile
    |
    | IF visa expired OR no work permission:
    |     v
    |   [rejected]
    |       |
    |       | Action: Notify caregiver, provide reason, offer resubmission
    |
    | IF visa expires in future:
    |     v
    |   [verified_expiring]
    |       |
    |       | Action: Set renewal reminder schedule (60d, 30d, 7d before expiry)
```

---

## 6. DBS Check Process (Voluntary)

### 6.1 Purpose and Legal Context at Tier 1

**Legal Status**: DBS checks are NOT mandatory for companionship-only services at Tier 1.

**Rationale**:
- Companionship services do NOT constitute "regulated activity" under the Safeguarding Vulnerable Groups Act 2006
- Personal care (washing, dressing, toileting) = regulated activity (requires DBS)
- Companionship (conversation, light housework, shopping) = NOT regulated activity (DBS optional)

**Platform Strategy**:
- Voluntary DBS at Tier 1 provides competitive advantage for caregivers
- Care receivers can filter by DBS status (trust signal)
- Prepares caregivers for Tier 2 (personal care requires mandatory DBS)
- Demonstrates platform commitment to safety

**Tier 2 Transition**: DBS becomes mandatory when personal care services enabled (Tier 2+)

### 6.2 Voluntary DBS Submission Process

**Eligibility**:
- Caregivers with existing DBS certificates (from previous care roles)
- Caregivers who obtain DBS through umbrella body (self-funded)
- Any level accepted: Basic, Standard, or Enhanced DBS

**Platform Does NOT**:
- Apply for DBS on caregiver's behalf (Tier 1)
- Fund DBS checks for caregivers (self-funded at Tier 1)
- Require DBS for companionship services (voluntary only)

**Platform DOES**:
- Accept existing DBS certificates for verification
- Verify certificate authenticity (manual admin review)
- Display "DBS Verified" badge if valid
- Track DBS expiry and send renewal reminders
- Provide guidance on obtaining DBS (link to umbrella bodies)

**Caregiver Workflow**:
1. Caregiver sees "Do you have a DBS certificate?" prompt in onboarding
2. Caregiver clicks "Yes" or "Skip for now"
3. If "Yes": Upload DBS certificate (PDF or image)
4. Enter certificate details: Certificate number, issue date, level (Basic/Standard/Enhanced)
5. Admin reviews certificate (48-hour SLA)
6. If approved: "DBS Verified" badge added to profile
7. If rejected: Caregiver notified of reason (expired, name mismatch, etc.)

**Obtaining DBS (Guidance for Caregivers)**:
Platform provides educational resources:
- "How to Get a DBS Check" article
- Links to umbrella bodies: Trustid, UKCBC, Disclosure Scotland
- Cost: £40-60 (caregiver pays)
- Processing time: 2-4 weeks (Basic), 4-8 weeks (Enhanced)
- "Why Get DBS?" section: Stand out to families, prepare for personal care (Tier 2), meet care sector standards

### 6.3 DBS Certificate Levels

| Level | Coverage | Suitable For | Tier 1 Acceptance |
|-------|----------|--------------|-------------------|
| **Basic DBS** | Unspent criminal convictions only | General employment | Accepted |
| **Standard DBS** | Spent + unspent convictions, cautions, reprimands, warnings | Certain professions (not care) | Accepted (better than Basic) |
| **Enhanced DBS** | Standard + local police records, checks against barred lists | Regulated activity (personal care, work with children) | Accepted (best level) |

**Platform Preference**: Enhanced DBS preferred (best practice for care sector), but all levels accepted at Tier 1 (voluntary).

**Barred List Check**: Enhanced DBS for "regulated activity" includes Adult Barred List check. At Tier 1, this is not required (companionship not regulated activity), but accepted if caregiver provides.

### 6.4 DBS Certificate Verification Process

**Admin Review Checklist**:
- [ ] Certificate image clear and legible
- [ ] Certificate not expired (issue date within 3 years recommended, not statutory)
- [ ] Certificate number present (unique identifier)
- [ ] Applicant name matches caregiver profile name
- [ ] Date of birth matches caregiver profile DOB
- [ ] Certificate level identified (Basic, Standard, Enhanced)
- [ ] Certificate appears genuine (no signs of tampering)

**DBS Update Service Check** (if applicable):
- Some caregivers subscribe to DBS Update Service (annual fee, allows employers to check certificate validity online)
- Admin checks Update Service: https://www.gov.uk/dbs-update-service
- Requires: Certificate number + caregiver consent
- If subscribed: Admin confirms certificate still valid (no changes since issue)
- If NOT subscribed: Accept certificate if issued within 3 years (recommended best practice)

**Admin Decision**:
- **Approve**: Certificate valid, add "DBS Verified" badge, record certificate number + issue date + level
- **Reject**: Certificate invalid (expired, name mismatch, suspected fake), notify caregiver
- **Request Resubmission**: Image unclear, ask for clearer upload

**SLA**: 48 hours for DBS verification (lower priority than identity verification)

### 6.5 DBS Expiry and Renewal

**Expiry Policy**:
- DBS certificates do NOT have statutory expiry date
- Industry best practice: Re-check every 3 years
- Platform recommendation: 3-year cycle for DBS renewal

**Expiry Tracking**:
- Platform tracks DBS issue date
- Automated email reminders sent: 90 days, 60 days, 30 days before 3-year anniversary
- Email content: "Your DBS certificate is 3 years old. We recommend renewing to maintain trust with families."
- If DBS >3 years old: "DBS Verified" badge remains, but profile shows "Last checked: [Date]"

**DBS Update Service Subscribers**:
- Admin checks Update Service annually
- If status changed (new conviction): "DBS Verified" badge removed, caregiver notified, profile suspended pending investigation
- If status unchanged: Badge remains, no caregiver action needed

**Non-Renewal Impact**:
- "DBS Verified" badge does NOT expire (voluntary at Tier 1)
- Care receivers see DBS issue date (transparency)
- At Tier 2 (personal care), DBS renewal becomes mandatory

### 6.6 DBS Verification State Machine

**States**: `not_started` → `certificate_uploaded` → `admin_review` → `verified` OR `rejected`

```
[not_started]
    |
    | Event: Caregiver uploads DBS certificate + enters details
    | Action: Assign to admin DBS verification queue
    |
    v
[admin_review]
    |
    | Event: Admin reviews certificate
    | Action: Check certificate number, name, DOB, issue date, level
    |
    | IF certificate valid:
    |     v
    |   [verified]
    |       |
    |       | Action: Set dbs_verified = true, add "DBS Verified" badge, record issue date
    |       | Action: Schedule 3-year renewal reminders
    |
    | IF certificate invalid:
    |     v
    |   [rejected]
    |       |
    |       | Action: Notify caregiver of reason, allow resubmission
```

### 6.7 DBS Data Storage

**Data Captured**:
- DBS certificate number (unique identifier)
- Issue date
- Certificate level (Basic, Standard, Enhanced)
- Verification date (when admin approved)
- DBS Update Service subscriber (yes/no)

**Data NOT Captured**:
- Certificate content (convictions, cautions) - NOT stored by platform
- Barred list status - NOT stored (only relevant for regulated activity)

**Data Retention**:
- Certificate image: Deleted 7 days after verification (not needed long-term)
- Verification status: Retained indefinitely (dbs_verified = true/false)
- Issue date: Retained (for renewal reminders)
- Certificate number: Retained (for Update Service checks)

**GDPR Compliance**:
- DBS certificate images are "special category data" (criminal conviction data, Article 10)
- Legal basis: Explicit consent (caregiver voluntarily uploads for verification)
- Data minimization: Delete certificate image after verification, retain only verification status

---

## 7. Profile Verification

### 7.1 Profile Completeness Requirements

Before profile goes live, caregiver must complete:

**Required Fields**:
- [ ] Profile photo (clear face photo, professional)
- [ ] Full name (as on ID)
- [ ] Postcode (for location-based search)
- [ ] Bio (minimum 100 characters, maximum 1000 characters)
- [ ] Services offered (at least one companionship service selected)
- [ ] Hourly rate (within platform range: £12-30/hour)
- [ ] Availability (at least 10 hours/week recommended)
- [ ] Bank account connected (Stripe Connect for payouts)

**Optional Fields**:
- Experience summary (years in care)
- Languages spoken
- Transportation (vehicle available yes/no)
- Hobbies and interests (for companionship matching)
- DBS certificate (voluntary at Tier 1)

**Profile Completeness Indicator**:
- Progress bar showing % complete
- "Your profile is 80% complete. Add availability to finish."
- Profile NOT searchable until 100% complete + admin approved

### 7.2 Profile Photo Requirements

**Purpose**: Trust and recognition (care receivers see caregiver before booking)

**Requirements**:
- Clear face photo (face visible, no sunglasses, no hats)
- Professional appearance (no party photos, no group photos)
- Recent photo (taken within 1 year)
- High quality (minimum 400x400px, recommended 800x800px)
- Appropriate content (no offensive gestures, no children in photo)

**NOT Accepted**:
- Cartoon avatars or illustrations
- Group photos (must be solo photo)
- Photos with heavy filters (face must be recognizable)
- Photos with face obscured (sunglasses, masks, hats)
- Photos of celebrities or other people (impersonation)

**Admin Review Checklist**:
- [ ] Face clearly visible
- [ ] Professional appearance
- [ ] Matches ID photo (if available for comparison)
- [ ] No inappropriate content

**Rejection Reasons**:
- Face not visible (sunglasses, hat, mask)
- Group photo (multiple people)
- Inappropriate content (offensive, party photo)
- Low quality (blurry, pixelated)
- Does not match ID photo (suspected fake profile)

### 7.3 Bio and Service Description

**Bio Purpose**: Help care receivers understand caregiver's personality, experience, and approach.

**Requirements**:
- Minimum 100 characters (enforce quality)
- Maximum 1000 characters (keep concise)
- Must be in English (UK marketplace)
- No contact information (phone, email, address) - filtered by platform
- No external links (website, social media) - filtered by platform
- Professional tone (no profanity, no aggressive language)

**Bio Guidance** (shown to caregiver during profile creation):
- Introduce yourself: "Hi, I'm [Name]..."
- Share your experience: "I've been providing care for [X] years..."
- Describe your approach: "I believe in treating each person with dignity and respect..."
- Mention companionship services: "I enjoy conversation, light housework, and accompanying clients on errands."
- Avoid: Medical claims ("I can treat dementia"), personal contact info, external links

**Admin Review Checklist**:
- [ ] Meets minimum length (100 chars)
- [ ] No contact information (phone, email)
- [ ] No external links (website, social media)
- [ ] No inappropriate content (profanity, offensive language)
- [ ] No medical claims (Tier 1 is companionship only)
- [ ] No false or misleading statements

**Rejection Reasons**:
- Bio too short (<100 chars)
- Contains contact information (attempts off-platform payments)
- Contains external links
- Inappropriate content or language
- False medical claims

### 7.4 Service Selection and Rate Setting

**Services Available at Tier 1**:
- Companionship (conversation, activities)
- Light housework (cleaning, tidying)
- Shopping and errands (accompanied)
- Meal preparation (no feeding assistance)
- Transportation (if vehicle available)

**Services NOT Available at Tier 1** (greyed out with "Tier 2" label):
- Personal care (washing, dressing, toileting)
- Mobility assistance (physical support)
- Medication assistance (even prompting)
- Overnight care
- Live-in care

**Rate Setting**:
- Caregiver sets own hourly rate (self-employed)
- Platform recommended range: £12-30/hour
- Platform displays average rate in area: "Most caregivers charge £18-22/hour in [City]"
- No minimum or maximum enforced (caregiver freedom)
- Rate displayed clearly to care receivers in search results

**Admin Review**:
- No rate approval required (caregiver freedom)
- Extreme rates (e.g., £100/hour) may trigger admin review (suspected error or fraud)
- Admin can contact caregiver to confirm rate is intentional

### 7.5 Reference Checks (Optional at Tier 1)

**Tier 1 Status**: References NOT required at Tier 1 (minimize friction)

**Tier 2 Requirement**: Minimum 2 professional references required for personal care

**Tier 1 Voluntary References**:
- Caregivers can optionally add references (competitive advantage)
- Reference contact information captured (name, phone, email, relationship)
- Admin contacts references (phone or email verification)
- Verified references displayed on profile: "2 references verified"

**Reference Verification Process** (if provided):
1. Caregiver provides reference contact details
2. Admin emails/calls reference
3. Admin asks: Employment dates, role, quality of work, reason for leaving, would you rehire?
4. Admin records reference notes (internal, not public)
5. If reference positive: Mark "Reference Verified" on profile
6. If reference negative or unreachable: Do NOT display on profile (no badge)

---

## 8. Admin Review Workflows

### 8.1 Verification Queue Dashboard

**Admin Dashboard Components**:

**Queue Tabs**:
- **Pending** (default view): Caregivers awaiting first review, sorted by registration date (oldest first)
- **In Review**: Caregivers assigned to current admin, sorted by days pending
- **Action Required**: Caregivers awaiting resubmission or additional documents
- **Rejected**: Recently rejected profiles (last 30 days), for tracking and quality control
- **Approved**: Recently approved profiles (last 7 days), for audit trail

**Queue Metrics**:
- Total pending: 12 caregivers
- Average waiting time: 18 hours
- SLA breaches (>48 hours): 2 (flagged in red)
- My assigned reviews: 5
- Approved this week: 23
- Rejected this week: 4 (rejection rate: 15%)

**Queue Filters**:
- Registration date range (last 7 days, last 30 days, custom)
- Days pending (0-24h, 24-48h, >48h)
- Assigned admin (me, unassigned, specific admin)
- Verification status (identity pending, right to work pending, DBS pending, profile incomplete)
- Priority flag (urgent, standard)

**Queue Actions**:
- Assign to me (claim caregiver for review)
- Flag as urgent (if caregiver needs expedited review)
- Bulk assign (assign multiple caregivers to admin)
- Export queue (CSV for reporting)

### 8.2 Caregiver Verification Review Interface

**Review Panel Layout**:

**Left Panel: Caregiver Details**
- Profile photo thumbnail
- Name, email, phone
- Registration date, days pending
- Profile completeness: 100% (or incomplete fields listed)
- Services selected: Companionship, Light housework, Shopping
- Hourly rate: £20/hour
- Availability: 20 hours/week
- Bank account: Connected (Stripe)

**Center Panel: Document Viewer**
- Tabs: Identity Documents | Right to Work | DBS Certificate (if uploaded) | Profile Bio
- Identity Documents tab:
  - ID document images (passport photo page, driving license front/back)
  - Selfie photo
  - Stripe Identity result: Verified / Failed / Manual Review Required
  - Automated checks: Document valid (checkmark), Face match (checkmark), Liveness (checkmark)
- Right to Work tab:
  - UK passport: Right to work confirmed (automatic)
  - OR UKVI share code: [9-character code], DOB: [date], Link to UKVI online service
  - Visa type (if applicable): [Skilled Worker, Spouse, etc.]
  - Visa expiry: [date]
  - Work restrictions: [Full-time, Part-time, Hours limited]
- DBS Certificate tab (if uploaded):
  - Certificate image (PDF or photo)
  - Certificate number: [number]
  - Issue date: [date]
  - Level: [Basic, Standard, Enhanced]
  - DBS Update Service subscriber: [Yes/No]
- Profile Bio tab:
  - Bio text with character count
  - Content filters applied: No contact info detected (checkmark), No external links (checkmark), No profanity (checkmark)

**Right Panel: Admin Actions**
- **Verification Checklist** (checkboxes):
  - [ ] ID document clear and readable
  - [ ] ID not expired
  - [ ] Name matches profile
  - [ ] Selfie matches ID photo
  - [ ] Right to work verified
  - [ ] Profile photo appropriate
  - [ ] Bio complete and appropriate
  - [ ] Services selected (companionship only at Tier 1)
  - [ ] Rate set within reasonable range
  - [ ] Bank account connected
- **Admin Decision Buttons**:
  - **Approve Profile** (green, primary action)
  - **Reject with Reason** (red, opens rejection modal)
  - **Request Resubmission** (yellow, for unclear documents)
  - **Flag for Senior Review** (grey, if uncertain)
- **Notes Field** (internal documentation):
  - Free-text notes visible to all admins
  - Auto-saves on typing
  - Timestamped with admin name
- **Audit Trail** (read-only):
  - All admin actions logged: "John (admin) approved identity verification on 2026-02-05 at 14:32"
  - Caregiver actions logged: "Caregiver uploaded ID documents on 2026-02-04 at 09:15"

### 8.3 Approval Workflow

**Admin Clicks "Approve Profile"**:
1. System validates all checkboxes checked (or admin confirms override)
2. Caregiver status updated: `pending_verification` → `active`
3. Profile goes live (searchable by care receivers)
4. Email notification sent to caregiver: "Your profile is now live!"
5. In-app notification visible on caregiver dashboard
6. SMS notification sent (if enabled)
7. Admin dashboard shows approval confirmation: "Profile approved for [Caregiver Name]"
8. Audit log entry created: "Admin [Name] approved profile on [Date]"

**Approval Email Template**:
```
Subject: Your Profile is Now Live on [Platform Name]!

Hi [Caregiver Name],

Great news! Your profile has been approved and is now live on [Platform Name].

What happens next:
1. Care receivers can now find your profile in search results
2. You'll receive booking requests via email and in-app notifications
3. Respond to booking requests within 24 hours for best results
4. Complete your first booking and start earning!

Your profile: [Link to public profile]

Tips for success:
- Keep your availability up to date
- Respond to booking requests quickly
- Provide excellent service and build your reputation
- Consider adding a DBS certificate for higher visibility (voluntary at Tier 1)

Need help? Visit our Help Center: [Link]

Welcome to the [Platform Name] community!

[Platform Name] Team
```

### 8.4 Rejection Workflow

**Admin Clicks "Reject with Reason"**:
1. Rejection modal opens with dropdown: "Select rejection reason"
2. **Rejection Reasons** (predefined):
   - ID expired (please upload valid ID)
   - ID unclear (please upload clearer photo)
   - Name mismatch (ID name does not match profile)
   - Selfie doesn't match ID photo (possible impersonation)
   - Right to work not confirmed (visa expired or no work permission)
   - Profile photo inappropriate (not professional)
   - Bio contains contact information (please remove phone/email)
   - Bio too short (minimum 100 characters required)
   - Suspected fake profile (multiple red flags)
   - Other (admin enters custom reason)
3. Admin enters additional notes (optional, included in email)
4. Admin clicks "Confirm Rejection"
5. Caregiver status remains `pending_verification`
6. Email notification sent to caregiver with rejection reason + resubmission instructions
7. In-app notification visible on caregiver dashboard
8. Audit log entry created: "Admin [Name] rejected profile on [Date]: [Reason]"

**Rejection Email Template**:
```
Subject: Profile Verification - Additional Information Needed

Hi [Caregiver Name],

We've reviewed your profile, but we need additional information before we can approve it.

Reason: [Rejection Reason]

What to do next:
[Specific instructions based on reason, e.g., "Please upload a clearer photo of your passport. Ensure the photo is well-lit and all text is readable."]

How to resubmit:
1. Log in to your account
2. Go to Profile > Verification
3. Upload new documents or make corrections
4. Submit for review

We'll review your resubmission within 24-48 hours.

Need help? Contact support at [Email] or visit our Help Center: [Link]

[Platform Name] Team
```

### 8.5 Request Resubmission Workflow

**Purpose**: When documents are unclear but not definitively invalid (softer than rejection).

**Admin Clicks "Request Resubmission"**:
1. Similar to rejection, but tone is "please clarify" rather than "rejected"
2. Admin selects issue: "ID photo unclear", "Bio needs revision", "Missing document"
3. Admin enters specific guidance: "Your passport photo is too dark. Please take a photo in good lighting."
4. Email sent to caregiver with instructions
5. Caregiver status remains `pending_verification` with flag: "Resubmission requested"
6. Caregiver dashboard shows: "Action Required: Upload clearer ID photo"

**Resubmission Email Template**:
```
Subject: Profile Verification - Please Resubmit Document

Hi [Caregiver Name],

We're reviewing your profile, but we need a clearer document to complete verification.

Issue: [Specific issue, e.g., "Passport photo too dark"]

Please resubmit:
[Specific instructions, e.g., "Take a new photo of your passport in good lighting. Ensure all text is clearly readable."]

How to resubmit:
1. Log in to your account
2. Go to Profile > Verification
3. Upload new photo
4. Submit for review

We'll review your resubmission within 24 hours.

[Platform Name] Team
```

### 8.6 Senior Admin Review (Escalation)

**Trigger Conditions**:
- Admin unsure of decision (complex case)
- Suspected fraud or impersonation
- Multiple resubmissions with unclear documents
- Caregiver appeals rejection

**Admin Clicks "Flag for Senior Review"**:
1. Caregiver moved to "Senior Review Queue"
2. Senior admin receives notification: "Flagged for review: [Caregiver Name]"
3. Admin enters escalation reason: "Suspected fake ID" or "Unclear visa status"
4. Senior admin reviews case within 24 hours
5. Senior admin makes final decision: Approve, Reject, Request external verification (e.g., DBS Barring List check)

**Senior Admin Actions**:
- Approve with notes (if complex case but ultimately valid)
- Reject with detailed justification
- Request external verification (e.g., contact UKVI for visa status confirmation)
- Suspend account pending investigation (if suspected fraud)

### 8.7 Admin Quality Control

**Random Sampling**:
- 10% of approved profiles randomly sampled for senior admin review
- Purpose: Ensure verification consistency and quality across admin team
- Senior admin re-reviews documents and checks admin decision was correct
- If error found: Admin receives feedback and retraining

**Admin Performance Metrics**:
- Approval rate (% of reviews resulting in approval)
- Average review time (hours from assignment to decision)
- Rejection rate (% of reviews resulting in rejection)
- Resubmission rate (% of reviews requiring resubmission)
- Error rate (% of approvals overturned in quality control sampling)

**Target Metrics**:
- Average review time: <24 hours
- Approval rate: 80-90% (indicates clear requirements and caregiver quality)
- Error rate: <5% (high accuracy)

---

## 9. Trust Badges & Display

### 9.1 Badge Hierarchy

**Tier 1 Verification Badges**:

| Badge | Meaning | Requirements | Display Location |
|-------|---------|--------------|------------------|
| **Identity Verified** | ID and right to work confirmed | ID verification + right to work | Profile card, profile page, search results |
| **DBS Verified** | Criminal record check completed (voluntary) | Valid DBS certificate uploaded and verified | Profile card, profile page, search results (filter) |
| **Phone Verified** | Phone number confirmed | SMS OTP verification | Not displayed (baseline requirement) |
| **Email Verified** | Email confirmed | Email double opt-in | Not displayed (baseline requirement) |

**Badge Display Priority** (if multiple badges):
1. DBS Verified (most trusted)
2. Identity Verified (baseline trust)

### 9.2 Badge Visual Design

**Identity Verified Badge**:
- Icon: Shield with checkmark
- Color: Blue (#0066CC)
- Text: "Identity Verified"
- Tooltip on hover: "This caregiver's identity and right to work have been verified by [Platform Name]."

**DBS Verified Badge**:
- Icon: Shield with star
- Color: Green (#00AA66)
- Text: "DBS Verified"
- Tooltip on hover: "This caregiver has completed a DBS background check. DBS checks are voluntary at Tier 1 (companionship services)."

**Badge Placement**:
- Profile card (search results): Badge icon + text below caregiver photo
- Profile page: Badge section in sidebar with full verification details
- Booking request: Verification status shown to care receiver

### 9.3 Verification Details Section (Profile Page)

**Verification Details Panel** (sidebar on caregiver profile):

```
Verification Status

[Shield icon] Identity Verified
Checked on: 5 Feb 2026

[Shield icon] DBS Verified (Enhanced)
Checked on: 6 Feb 2026
Last checked: 6 Feb 2026

What does this mean?
[Link to Trust & Safety page]
```

**Detailed Verification Modal** (click "What does this mean?"):
- Identity Verified: "We have verified this caregiver's government-issued ID and confirmed their legal right to work in the UK."
- DBS Verified: "This caregiver has voluntarily submitted a DBS (Disclosure and Barring Service) certificate. DBS checks are criminal record checks used in the UK care sector. DBS checks are voluntary for companionship services but demonstrate the caregiver's commitment to safety."
- Link to full Trust & Safety policy

### 9.4 Care Receiver Filter Interface

**Search Filters Sidebar**:

```
Filters

Verification
[x] Identity Verified (required)
[ ] DBS Verified (optional)

[12 caregivers found]
```

**Identity Verified Filter**:
- Always checked, cannot be unchecked (all caregivers must be identity verified)
- Greyed out with tooltip: "All caregivers on [Platform Name] are identity verified. This filter is always active."

**DBS Verified Filter**:
- Optional checkbox
- When checked: Reduces results to only DBS-verified caregivers
- Badge count updates: "4 DBS-verified caregivers found"
- If no DBS caregivers in area: "No DBS-verified caregivers found in your area. DBS checks are voluntary at Tier 1. All caregivers are identity verified."

### 9.5 Verification Status Transparency

**On Caregiver Profile Page**:
- Verification badges prominently displayed
- Date of last verification shown (e.g., "Identity verified on 5 Feb 2026")
- DBS issue date shown (if applicable): "DBS certificate issued on 15 Jan 2023" (transparency on certificate age)
- No verification: No badges shown (implies not verified, profile should not be live)

**Care Receiver Education**:
- "About Verification" link in search results header
- Modal or page explaining verification process
- FAQ: "What is DBS?", "Why is DBS voluntary?", "Is this safe?"
- Link to Safeguarding Policy
- Reassurance: "All caregivers are identity verified. DBS checks are voluntary for companionship services but required for personal care (Tier 2)."

### 9.6 Verification Badge Removal

**Conditions for Badge Removal**:
- Identity verification expires or becomes invalid (e.g., visa expired, ID reported stolen)
- DBS certificate found to be fake or expired (>3 years old with negative Update Service check)
- Caregiver suspended or banned (all badges removed, profile hidden)

**Process**:
1. Admin identifies issue (e.g., visa expired, fake DBS certificate)
2. Admin removes badge: "Remove DBS Verified badge" button
3. Badge removed from profile (no longer visible to care receivers)
4. Caregiver notified: "Your DBS badge has been removed. Reason: [e.g., Certificate expired]. Please resubmit to restore badge."
5. Audit log entry: "Admin [Name] removed DBS badge on [Date]: [Reason]"

**Caregiver Appeal**:
- Caregiver can contact support if badge removed incorrectly
- Admin reviews case, restores badge if error confirmed

---

## 10. Data Requirements

### 10.1 Database Schema

**`caregiver_verifications` Table**:

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `caregiver_id` | UUID | Foreign key to users table |
| `identity_verified` | Boolean | Identity verification status (true/false) |
| `identity_verified_at` | Timestamp | Date identity verified |
| `identity_verification_method` | Enum | Automated (Stripe Identity) / Manual (Admin Review) |
| `right_to_work_verified` | Boolean | Right to work status (true/false) |
| `right_to_work_verified_at` | Timestamp | Date right to work verified |
| `visa_type` | String | Visa type (if applicable): Skilled Worker, Spouse, Graduate, etc. |
| `visa_expiry_date` | Date | Visa expiry date (if applicable) |
| `work_restrictions` | String | Full-time / Part-time / Hours limited |
| `dbs_verified` | Boolean | DBS verification status (true/false) |
| `dbs_verified_at` | Timestamp | Date DBS verified |
| `dbs_certificate_number` | String | DBS certificate number |
| `dbs_issue_date` | Date | DBS certificate issue date |
| `dbs_level` | Enum | Basic / Standard / Enhanced |
| `dbs_update_service` | Boolean | DBS Update Service subscriber (true/false) |
| `created_at` | Timestamp | Record creation timestamp |
| `updated_at` | Timestamp | Record last updated timestamp |

**`verification_documents` Table** (temporary storage):

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `caregiver_id` | UUID | Foreign key to users table |
| `document_type` | Enum | ID_Document / Selfie / DBS_Certificate / Right_to_Work_Document |
| `file_url` | String | Encrypted S3 URL |
| `uploaded_at` | Timestamp | Upload timestamp |
| `verified_at` | Timestamp | Admin verification timestamp (null if pending) |
| `verification_status` | Enum | Pending / Approved / Rejected |
| `rejection_reason` | String | Admin rejection reason (if applicable) |
| `deleted_at` | Timestamp | Document deletion timestamp (7 days after verification) |

**`verification_audit_log` Table**:

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `caregiver_id` | UUID | Foreign key to users table |
| `admin_id` | UUID | Admin who performed action |
| `action` | Enum | Approved / Rejected / Resubmission_Requested / Badge_Added / Badge_Removed |
| `verification_type` | Enum | Identity / Right_to_Work / DBS / Profile |
| `reason` | String | Action reason or notes |
| `timestamp` | Timestamp | Action timestamp |

### 10.2 Data Retention Policies

**Identity Verification Documents**:
- Retention period: 7 days after verification approved or rejected
- Purpose: Allow caregiver appeals or admin re-review
- After 7 days: Documents auto-deleted from S3 (GDPR data minimization)
- Verification status retained indefinitely (true/false flag)

**DBS Certificate Images**:
- Retention period: 7 days after verification approved or rejected
- Purpose: Allow admin re-review if needed
- After 7 days: Certificate image auto-deleted
- Certificate number, issue date, and level retained (for expiry tracking)

**Right to Work Documents**:
- UKVI share codes: Deleted after verification (not needed long-term)
- Visa expiry date: Retained until expiry (for renewal reminders)
- Verification status: Retained indefinitely

**Audit Logs**:
- Retention period: 7 years (legal requirement for safeguarding and compliance)
- Purpose: Legal defense, regulatory audits, investigation evidence

### 10.3 GDPR Compliance

**Legal Basis for Processing**:
- Identity verification: Contract performance (Article 6(1)(b)) - required to use platform
- DBS verification: Explicit consent (Article 9(2)(a)) - voluntary submission
- Right to work: Legal obligation (Article 6(1)(c)) - Immigration Act requirement

**Data Subject Rights**:
- Right to access: Caregivers can download verification status report (SAR)
- Right to rectification: Caregivers can resubmit documents if incorrect
- Right to erasure: Verification documents deleted after 7 days (automated), status retained for audit trail
- Right to data portability: Verification data included in account export

**Data Minimization**:
- Platform does NOT store: Full ID documents long-term, DBS certificate content (convictions), selfie photos (deleted after verification)
- Platform DOES store: Verification status (true/false), verification dates, certificate numbers (for renewal tracking)

### 10.4 Security Requirements

**Encryption**:
- All verification documents encrypted at rest (AWS S3 with KMS)
- All verification documents transmitted over HTTPS (TLS 1.2+)
- Database columns containing sensitive data (DBS certificate number, visa expiry) encrypted

**Access Control**:
- Verification documents accessible only to admin users with 2FA enabled
- Role-based access: Admin (full access), Safeguarding Officer (full access), Customer Support (view-only, no document access)
- Audit log tracks all document access: Who viewed what document, when

**Data Breach Response**:
- If verification documents leaked: Notify affected caregivers within 72 hours (GDPR requirement)
- Notify ICO within 72 hours if high risk to caregivers
- Immediate document deletion, investigation, security patch

---

## 11. Edge Cases

### 11.1 Expired ID Documents

**Scenario**: Caregiver uploads expired passport or driving license.

**Detection**:
- Automated verification (Stripe Identity) flags expired document
- Admin manual review checks expiry date

**Action**:
- Reject verification with reason: "ID expired (expiry date: [Date]). Please upload a valid ID."
- Email caregiver: "Your passport expired on [Date]. Please upload a current passport or driving license."
- Allow resubmission with valid ID

**Prevention**:
- Upload form shows warning: "Ensure your ID is not expired. Check the expiry date."

---

### 11.2 Name Mismatch (ID vs Profile)

**Scenario**: Name on ID (e.g., "Elizabeth Smith") does not match profile name (e.g., "Liz Smith").

**Detection**:
- Automated verification may flag mismatch
- Admin manual review confirms mismatch

**Action**:
- Admin investigates: Is this a nickname? Married name change? Typo?
- If nickname (e.g., Liz = Elizabeth): Admin approves, notes in system
- If married name change: Admin requests marriage certificate or deed poll (proof of name change)
- If typo: Admin asks caregiver to correct profile name to match ID

**Guidance to Caregivers**:
- "Use your legal name (as on ID) when registering. You can add a preferred name in your bio."

---

### 11.3 Poor Photo Quality (Unclear ID)

**Scenario**: Caregiver uploads blurry or dark photo of ID document.

**Detection**:
- Automated verification fails due to low image quality
- Admin cannot read document details

**Action**:
- Request resubmission: "Your ID photo is unclear. Please take a new photo in good lighting with all text readable."
- Provide photo tips: "Hold camera directly above ID, avoid shadows, ensure all text is in focus."

**Prevention**:
- Upload form shows photo tips before upload
- Real-time image quality check: "Photo quality low. Please retake."

---

### 11.4 Visa Expiry During Verification

**Scenario**: Caregiver submits documents, visa expires before admin reviews.

**Detection**:
- Admin checks visa expiry date on UKVI portal, discovers visa expired

**Action**:
- Reject right to work: "Your visa expired on [Date]. Please renew your visa and provide a new share code."
- Profile remains in pending_verification status until renewed

**Prevention**:
- Registration form checks visa expiry: "Your visa expires in 30 days. Please renew before completing registration."

---

### 11.5 DBS Certificate Shared by Multiple Caregivers (Fraud)

**Scenario**: Two caregivers upload the same DBS certificate (one stole another's certificate).

**Detection**:
- Admin checks DBS certificate number against database
- Duplicate certificate number flagged

**Action**:
- Suspend both caregivers' accounts pending investigation
- Admin contacts both caregivers: "We've detected duplicate DBS certificates. Please provide proof of your certificate (e.g., confirmation email from DBS provider)."
- If fraud confirmed: Ban fraudulent caregiver, reinstate legitimate owner

**Prevention**:
- DBS certificate number stored in database, checked for uniqueness
- Selfie comparison (does caregiver photo match DBS certificate photo?)

---

### 11.6 Caregiver Appeals Rejection

**Scenario**: Caregiver believes rejection was incorrect (e.g., "My ID is not expired, admin made a mistake").

**Action**:
- Caregiver contacts support: "I believe my verification was rejected incorrectly."
- Support escalates to senior admin for re-review
- Senior admin re-examines documents and original rejection reason
- If error confirmed: Approve verification, apologize, compensate (e.g., priority support)
- If rejection correct: Explain reason clearly, offer guidance on resubmission

**Appeal SLA**: 48 hours for senior admin re-review

---

### 11.7 Automated Verification False Negative

**Scenario**: Stripe Identity incorrectly rejects valid ID (rare but possible).

**Detection**:
- Caregiver contacts support: "My ID is valid but verification failed."
- Admin manually reviews documents

**Action**:
- Admin performs manual review (fallback)
- If ID valid: Approve manually, flag to Stripe for feedback (improve algorithm)
- Caregiver approved despite automated failure

**Quality Control**:
- Track false negative rate (Stripe Identity rejections overturned by admin)
- If rate >5%: Re-evaluate Stripe Identity vs alternative providers

---

### 11.8 DBS Update Service Subscription Lapsed

**Scenario**: Caregiver subscribed to DBS Update Service, but subscription lapsed (annual fee not paid).

**Detection**:
- Admin checks DBS Update Service, discovers subscription inactive
- Cannot verify certificate validity online

**Action**:
- Admin contacts caregiver: "Your DBS Update Service subscription lapsed. Please renew or provide a new DBS certificate."
- "DBS Verified" badge remains until certificate >3 years old (best practice threshold)
- If certificate >3 years old without Update Service: Remove badge, request new DBS

---

### 11.9 Caregiver Loses Right to Work Mid-Platform Use

**Scenario**: Caregiver's visa expires while profile is active, but caregiver doesn't renew.

**Detection**:
- Automated reminder emails sent 60d, 30d, 7d before expiry (caregiver ignores)
- Visa expiry date reached, system auto-deactivates profile

**Action**:
- Profile auto-deactivated on visa expiry date
- Active bookings cancelled, care receivers refunded
- Email sent to caregiver: "Your visa expired on [Date]. Your profile has been deactivated. Please renew your visa and update your share code to reactivate."
- Caregiver can reactivate by submitting renewed visa share code

**Safeguarding Consideration**:
- If active booking when visa expires: Admin contacts caregiver urgently, offers alternative caregiver to care receiver

---

### 11.10 Fake ID Detected

**Scenario**: Admin suspects fake ID (poor quality forgery, suspicious details).

**Detection**:
- Admin trained to spot fake IDs (hologram missing, font incorrect, etc.)
- Admin uses ID verification checklist

**Action**:
- Reject verification immediately: "We cannot verify your ID. Please contact support."
- Flag account for senior review: "Suspected fake ID"
- Senior admin investigates, may request video call with caregiver (liveness check)
- If confirmed fake: Ban account permanently, report to police (identity fraud), log in safeguarding system
- If false alarm: Apologize, approve manually, note in system

**Legal Obligation**: Report suspected identity fraud to Action Fraud (UK national fraud reporting center).

---

## 12. Acceptance Criteria

### 12.1 MVP Launch Blockers (Critical)

**Registration and Onboarding**:
- [ ] Caregiver registration flow complete (email, phone, profile wizard)
- [ ] Email verification (double opt-in) working
- [ ] Phone verification (SMS OTP) working
- [ ] Profile completeness validation (cannot submit incomplete profile)
- [ ] Bank account connection (Stripe Connect) working

**Identity Verification**:
- [ ] Stripe Identity integration functional (automated ID verification)
- [ ] Manual admin review fallback working (if automated fails)
- [ ] Selfie photo upload and liveness check working
- [ ] ID document upload (passport, driving license) accepting UK formats
- [ ] Admin can approve/reject identity verification
- [ ] "Identity Verified" badge displays on approved profiles

**Right to Work Verification**:
- [ ] UK passport holders automatically approved (no UKVI check needed)
- [ ] UKVI share code entry field functional
- [ ] Admin UKVI online service check workflow documented
- [ ] Visa expiry tracking and reminder emails functional
- [ ] Profile auto-deactivation on visa expiry working

**Admin Workflows**:
- [ ] Caregiver verification queue displays pending caregivers
- [ ] Admin can view uploaded documents (ID, selfie, DBS if uploaded)
- [ ] Admin can approve, reject, or request resubmission
- [ ] Rejection email sent to caregiver with reason
- [ ] Audit log records all admin actions

**Care Receiver Visibility**:
- [ ] Verified profiles searchable by care receivers
- [ ] "Identity Verified" badge visible on profile card and profile page
- [ ] Unverified profiles NOT searchable (hidden until approved)

**Data Security**:
- [ ] Verification documents encrypted at rest (S3 with KMS)
- [ ] Verification documents transmitted over HTTPS
- [ ] Document auto-deletion after 7 days functional
- [ ] Admin access restricted (2FA required)

### 12.2 Tier 1 Feature Complete (High Priority)

**Voluntary DBS**:
- [ ] DBS certificate upload functional (PDF or image)
- [ ] Admin DBS verification workflow working
- [ ] "DBS Verified" badge displays on approved profiles
- [ ] Care receivers can filter by "DBS Verified"
- [ ] DBS expiry tracking and renewal reminders functional

**Profile Verification**:
- [ ] Profile photo validation (face visible, professional)
- [ ] Bio content filtering (no contact info, no external links)
- [ ] Service selection (companionship only at Tier 1)
- [ ] Hourly rate setting by caregiver

**Admin Tools**:
- [ ] Senior admin escalation workflow functional
- [ ] Admin performance metrics visible (approval rate, review time)
- [ ] Queue filters (date range, assigned admin, days pending)
- [ ] SLA breach alerts (>48 hours pending) working

**Caregiver Experience**:
- [ ] Caregiver onboarding wizard guides through verification steps
- [ ] Progress indicator shows verification completeness
- [ ] Caregiver can resubmit rejected documents
- [ ] Caregiver receives notifications (approval, rejection, resubmission request)

**Care Receiver Experience**:
- [ ] "About Verification" educational content available
- [ ] Verification badges clearly visible in search results
- [ ] Verification details section on caregiver profile page
- [ ] Filter interface functional (DBS Verified checkbox)

### 12.3 Quality Assurance (Medium Priority)

**Testing**:
- [ ] End-to-end test: Caregiver registers → uploads docs → admin approves → profile goes live
- [ ] Rejection flow test: Admin rejects → caregiver resubmits → admin approves
- [ ] DBS voluntary flow test: Caregiver uploads DBS → admin verifies → badge appears
- [ ] Visa expiry test: Visa expires → profile auto-deactivates → email sent
- [ ] Security test: Non-admin cannot access verification documents
- [ ] Load test: 100 caregivers in verification queue, admin performance acceptable

**Compliance Verification**:
- [ ] GDPR compliance review: Data retention, deletion, subject access rights
- [ ] Immigration Act compliance: Right to work checks meet statutory requirements
- [ ] Care Act 2014 alignment: Safeguarding duties documented

**Admin Training**:
- [ ] Admin training guide created (how to verify ID, DBS, right to work)
- [ ] Admin can identify fake IDs (training materials provided)
- [ ] Admin understands rejection reasons and communication templates

### 12.4 Post-Launch Optimization (Low Priority)

**Performance Metrics**:
- [ ] Average verification time <24 hours (track weekly)
- [ ] Approval rate 80-90% (indicates clear requirements)
- [ ] Rejection rate <15% (minimize caregiver attrition)
- [ ] Voluntary DBS uptake >30% (competitive advantage)

**User Feedback**:
- [ ] Caregiver satisfaction survey (onboarding experience)
- [ ] Care receiver trust survey (verification badges increase trust)
- [ ] Admin feedback (verification workflow efficiency)

**Continuous Improvement**:
- [ ] Monthly review of rejection reasons (identify common issues)
- [ ] Quarterly review of verification policies (update if needed)
- [ ] Annual security audit (penetration testing, access controls)

---

## 13. Out of Scope (Tier 1)

### 13.1 Features Deferred to Tier 2

**Mandatory DBS Checks**:
- At Tier 1, DBS is voluntary (companionship services)
- At Tier 2, DBS becomes mandatory (personal care services)
- Platform will apply for DBS on caregiver's behalf (via umbrella body integration)

**Qualification Verification**:
- Care Certificate, NVQ Level 2/3, nursing qualifications NOT required at Tier 1
- Required at Tier 2 (personal care requires skill verification)

**Insurance Verification**:
- Public liability insurance NOT required at Tier 1
- Required at Tier 2 (personal care liability coverage)

**Reference Checks**:
- Professional references optional at Tier 1 (minimize friction)
- Minimum 2 references required at Tier 2 (personal care quality assurance)

**Employment History Verification**:
- No employment history verification at Tier 1
- Employment history review at Tier 2 (care role experience)

### 13.2 Features Not Applicable at Tier 1

**Personal Care Services**:
- Washing, dressing, toileting, feeding assistance NOT offered at Tier 1
- Care skills matching NOT needed (companionship only)

**Medical Condition Matching**:
- No medical condition data collected at Tier 1 (standard personal data only)
- Condition-specific matching deferred to Tier 3

**Live-In Care Verification**:
- Live-in care bookings NOT offered at Tier 1
- Enhanced verification for live-in care at Tier 3

**CQC Registration Requirements**:
- Platform NOT CQC-registered (Introduction Agency model)
- CQC compliance features (incident reporting, quality monitoring) NOT required at Tier 1

### 13.3 Technical Enhancements Deferred

**Automated DBS Integration**:
- No DBS umbrella body API integration at Tier 1 (manual admin verification only)
- DBS API integration at Tier 2 (for mandatory DBS checks)

**Biometric Verification**:
- No fingerprint or facial recognition verification at Tier 1
- Selfie + liveness check sufficient for Tier 1

**Real-Time Right to Work API**:
- Admin manually checks UKVI online service (no API integration)
- UKVI API integration considered for Tier 2 (if available)

**Machine Learning Fraud Detection**:
- No ML-based fake ID detection at Tier 1 (admin manual review)
- ML fraud detection considered post-launch (if high fraud rate)

**Video Call Identity Verification**:
- No video call verification at Tier 1 (Stripe Identity + admin review sufficient)
- Video call verification for complex cases or appeals (post-launch)

---

## Appendix A: Key Decision Log

| Decision ID | Date | Decision | Rationale |
|-------------|------|----------|-----------|
| **VER-001** | 2026-02-06 | DBS voluntary at Tier 1 | Companionship services NOT regulated activity (Safeguarding Vulnerable Groups Act 2006). Mandatory at Tier 2 (personal care). |
| **VER-002** | 2026-02-06 | Stripe Identity for automated verification | PCI DSS compliant, integrated with Stripe Connect, 95%+ UK ID coverage, reduces admin workload. |
| **VER-003** | 2026-02-06 | Manual admin review fallback | If Stripe Identity fails, admin reviews documents manually (quality control). |
| **VER-004** | 2026-02-06 | 7-day document retention | GDPR data minimization: Delete ID images after 7 days, retain verification status only. |
| **VER-005** | 2026-02-06 | No reference checks at Tier 1 | Minimize onboarding friction, optional for competitive advantage, mandatory at Tier 2. |
| **VER-006** | 2026-02-06 | Admin 2FA mandatory | Security: Verification documents accessible only to 2FA-enabled admin users. |
| **VER-007** | 2026-02-06 | 48-hour admin SLA | Target: Approve/reject within 48 hours of document submission (minimize caregiver waiting time). |
| **VER-008** | 2026-02-06 | Visa expiry auto-deactivation | Legal compliance: Profile auto-deactivated if right to work expires (Immigration Act). |

---

## Appendix B: Verification Workflow Diagram

```
CAREGIVER REGISTRATION & VERIFICATION FLOW

[Registration]
     |
     v
[Email Verification] (double opt-in)
     |
     v
[Phone Verification] (SMS OTP)
     |
     v
[Profile Creation Wizard]
     |
     v
[Document Upload]
  - ID (passport/driving license)
  - Selfie (liveness check)
  - UKVI share code (if non-UK national)
  - DBS certificate (optional)
     |
     v
[Automated Verification] (Stripe Identity)
     |
     +-- Success --> [Admin Review Queue] (final quality check)
     |
     +-- Failed --> [Admin Manual Review]
     |
     v
[Admin Review]
  - Check ID, selfie, right to work, DBS
  - Approve / Reject / Request Resubmission
     |
     +-- Approved --> [Profile Goes Live]
     |                  - "Identity Verified" badge
     |                  - "DBS Verified" badge (if applicable)
     |                  - Searchable by care receivers
     |
     +-- Rejected --> [Email Notification]
     |                  - Rejection reason
     |                  - Resubmission instructions
     |                  - Allow caregiver to resubmit
     |
     v
[Active Caregiver Profile]
  - Can receive booking requests
  - Earnings dashboard visible
  - Verification badges displayed
```

---

## Appendix C: Regulatory References

**Safeguarding Vulnerable Groups Act 2006**:
- Section 5: Regulated activity (personal care = regulated, companionship = NOT regulated)
- DBS checks mandatory for regulated activity, voluntary otherwise

**Immigration, Asylum and Nationality Act 2006, Section 15**:
- Employers and agencies must prevent illegal working
- Right to work checks required for all workers

**Care Act 2014**:
- Section 42: Local authority safeguarding enquiry duty
- Platform has safeguarding duty for vulnerable adults (reporting concerns)

**Data Protection Act 2018 / GDPR**:
- Article 6: Lawful basis for processing (contract performance, legal obligation)
- Article 9: Special category data (health data, criminal conviction data)
- Article 17: Right to erasure (data minimization)

**DBS Code of Practice**:
- DBS certificates should be re-checked every 3 years (best practice, not statutory)
- DBS Update Service allows ongoing certificate validity checks

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-06 | Product Manager | Initial Tier 1 verification specification created |

---

**END OF DOCUMENT**
