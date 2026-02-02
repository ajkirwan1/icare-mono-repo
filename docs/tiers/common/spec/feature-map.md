# Complete Feature Map: UK Elderly Care Marketplace Platform

**Last Updated**: 2026-02-01
**Document Owner**: Product Team
**Version**: 2.2 - Tiered Market Entry

---

## Document Change Log

### Version 2.2 (2026-02-01) - Tiered Market Entry Approach

**Changes Made**: Added tier availability markers throughout document (FDR-003)

**Summary**:
- Platform adopts tiered market entry strategy: Tier 1 (companionship only) → Tier 2 (personal care) → Tier 3 (condition-specific) → Tier 4 (care coordination)
- All features tagged with tier availability markers: [T1], [T2], [T3], [T4]
- Tier 1 features represent launch scope with minimal compliance burden
- Higher tier features require additional compliance and validation

**Tier Legend Added**:
- T1 = Minimal (companionship, standard personal data, voluntary DBS)
- T2 = Standard (personal care, skill matching, mandatory DBS)
- T3 = Enhanced (live-in, condition matching, health data with consent)
- T4 = Comprehensive (care coordination, full health data)

See: [Tiered Market Entry Roadmap](/docs/ROADMAP.md)

### Version 2.1 (2026-02-01) - Introduction Agency Model Alignment

**Changes Made**: Updated to reflect Founder Decisions FDR-001 and FDR-002

**Summary**:
- Platform confirmed as **Introduction Agency** (NOT CQC-registered care service provider)
- CQC registration NOT required (FDR-002)
- Caregivers confirmed as **self-employed independent professionals** (FDR-001)
- Section 13.6 renamed from "CQC Compliance Preparation" to "Care Quality & Safety Standards (Voluntary CQC Alignment)"
- CQC-dependent features removed or reframed as voluntary best practices
- Care Act 2014 safeguarding duties emphasized (mandatory regardless of CQC status)

**What Changed**:
- Section 13.6: CQC compliance changed from regulatory requirement to voluntary best practice
- Section 13.12: CQC submissions noted as NOT required
- Platform Constitution references updated throughout

**What Did NOT Change**:
- All safeguarding features remain mandatory (Care Act 2014 requirements)
- All verification features remain mandatory (due diligence obligations)
- All quality monitoring features remain (marketplace best practice)

---

---

## Tier Availability Legend

The platform launches with **Tier 1 (Minimal)** features and progressively adds higher-tier features as the business validates and compliance requirements are met.

| Tier | Name | Services | Data Scope | Verification | Investment |
|------|------|----------|------------|--------------|------------|
| **T1** | Minimal (Launch) | Companionship only | Standard personal data | ID, right to work, voluntary DBS | 15-25k GBP |
| **T2** | Standard | Personal care | Skill-based matching | Mandatory DBS, qualifications, insurance | 40-60k GBP (cumulative) |
| **T3** | Enhanced | Live-in, condition-specific | Health-inferring with consent | Condition training verification | 80-120k GBP (cumulative) |
| **T4** | Comprehensive | Care coordination | Full health data | Clinical governance | 150k+ GBP (cumulative) |

**Feature Tier Markers**: Each feature section and individual feature is tagged with tier availability:
- `[T1]` = Available at launch (Tier 1)
- `[T2]` = Available from Tier 2 onwards
- `[T3]` = Available from Tier 3 onwards
- `[T4]` = Available from Tier 4 onwards
- `[T1-T2]` = Partial feature at T1, full feature at T2

**See**: [Tiered Market Entry Roadmap](/docs/ROADMAP.md) for complete tier definitions, success metrics, and progression gates.

---

## Document Purpose

This is the **comprehensive, unprioritized feature map** for the UK elderly care marketplace platform. This document represents the **complete conceptual system** as a regulated healthcare marketplace (CQC-relevant) supporting vulnerable adults with medical conditions.

**This is NOT a phased roadmap**. Every feature listed here is part of the complete platform vision. Safety, compliance, and clinical features are **first-class features**, not Phase 2 additions.

The platform enables:
- Personal care services (washing, dressing, toileting, mobility assistance)
- Companionship and social support
- Live-in care arrangements
- Medical condition-specific matching
- Safeguarding vulnerable adults
- CQC-aligned compliance and audit trails

---

## Platform Constitution (Non-Negotiable)

From the marketplace specification, these axioms define the platform:

- **Region**: UK only
- **Category**: Elderly personal care + companionship + health-adjacent support
- **Care receivers**: May have medical conditions (Parkinson's, dementia, stroke, MS, mobility impairment)
- **Services**: May include personal care and live-in care
- **Supply**: Independent individual caregivers (self-employed professionals, NOT employees) - FDR-001
- **Payments**: On-platform only
- **Platform Model**: Introduction Agency (NOT CQC-registered care service provider) - FDR-002
- **Regulatory environment**: Care Act 2014 safeguarding duties (NOT CQC regulatory framework)
- **Primary constraint**: Clinical safety > growth > UX convenience
- **Safeguarding**: Platform has Care Act 2014 safeguarding duties for vulnerable adults

---

## Table of Contents

1. [User Management & Authentication](#1-user-management--authentication)
2. [Caregiver Capability & Verification System](#2-caregiver-capability--verification-system)
3. [Medical Condition & Care Skills Matching](#3-medical-condition--care-skills-matching)
4. [Discovery & Advanced Search](#4-discovery--advanced-search)
5. [Booking System (Hourly, Daily, Live-In)](#5-booking-system-hourly-daily-live-in)
6. [Messaging & Communication](#6-messaging--communication)
7. [Payment System & Escrow](#7-payment-system--escrow)
8. [Reviews, Ratings & Reputation](#8-reviews-ratings--reputation)
9. [Safeguarding & Incident Management](#9-safeguarding--incident-management)
10. [Identity & Background Verification](#10-identity--background-verification)
11. [Clinical Safety Monitoring](#11-clinical-safety-monitoring)
12. [Admin Operations & Oversight](#12-admin-operations--oversight)
13. [Compliance & Audit System](#13-compliance--audit-system)
14. [Emergency Escalation & Response](#14-emergency-escalation--response)
15. [Calendar & Availability Management](#15-calendar--availability-management)
16. [Family & Multi-User Accounts](#16-family--multi-user-accounts)
17. [Caregiver Dashboard & Management](#17-caregiver-dashboard--management)
18. [Care Receiver Dashboard](#18-care-receiver-dashboard)
19. [Notifications & Alerts](#19-notifications--alerts)
20. [Analytics & Reporting](#20-analytics--reporting)
21. [Content Management & Education](#21-content-management--education)
22. [Technical Infrastructure](#22-technical-infrastructure)

---

## 1. User Management & Authentication [TIER 1]

### 1.1 Care Receiver Registration [T1]
- Email + password account creation
- Email verification (double opt-in)
- Age verification (65+ or documented care needs)
- Account type selection (direct user vs family registering on behalf)
- Emergency contact capture (mandatory)
- GDPR consent management
- Password strength requirements and hashing
- Duplicate account detection
- Profile creation (name, DOB, postcode, phone)

### 1.2 Family Member Registration [T1]
- Family member registration on behalf of care receiver
- Relationship verification
- Care receiver consent documentation
- Proxy user permissions and access control
- Shared account management
- Multi-family member invitations
- Role-based access (view-only, booking, full access)

### 1.3 Caregiver Registration [T1-T2]
- Professional caregiver account creation [T1]
- Email and phone verification [T1]
- Profile wizard (personal details, photo, bio, experience) [T1]
- Service definition (companionship at T1, personal care at T2, live-in at T3)
- Medical condition experience declaration [T3]
- Care skills and qualifications listing [T2]
- Hourly rate setting (within platform range) [T1]
- Service radius configuration [T1]
- Bank account setup for payouts [T1]
- Right to work declaration [T1]
- Terms of service acceptance (self-employed status) [T1]

### 1.4 Phone Verification [T1]
- SMS OTP verification for all users
- UK mobile number validation
- Voice call backup option
- Rate limiting (3 attempts per 10 minutes)
- Phone number uniqueness enforcement

### 1.5 Session Management [T1]
- Secure session creation and storage
- HTTP-only cookies with expiry
- Session invalidation on password change
- Multi-device session support
- Session timeout policies
- "Remember me" functionality

### 1.6 Password Management [T1]
- Password reset via email link (1-hour expiry)
- Password change requiring current password
- Account lockout after failed attempts (10-minute lockout)
- Password history (prevent reuse of last 5 passwords)

### 1.7 Multi-Factor Authentication (2FA) [T1]
- TOTP (Time-based One-Time Password) for admin accounts (mandatory)
- Optional 2FA for caregiver accounts
- SMS-based 2FA as backup option
- 2FA recovery codes

### 1.8 Role-Based Access Control (RBAC) [T1]
- User roles: Care Receiver, Family Member, Caregiver, Admin, Safeguarding Officer
- Granular permissions per role
- API-level permission enforcement
- Dynamic permission checking
- Audit logging of permission changes

---

## 2. Caregiver Capability & Verification System [TIER 2-3]

**Tier 2 Features**: Care skills, qualifications, employment history
**Tier 3 Features**: Medical condition experience profile

### 2.1 Medical Condition Experience Profile [T3]
- List of medical conditions caregiver has experience with:
  - Parkinson's disease
  - Dementia / Alzheimer's
  - Stroke recovery
  - Multiple Sclerosis (MS)
  - Arthritis
  - Diabetes management
  - Visual impairment
  - Hearing impairment
  - Respiratory conditions (COPD, etc.)
  - Heart conditions
  - Cancer care support
  - End-of-life care
- Years of experience per condition category
- Specific training for each condition
- Evidence upload (certificates, training records)
- Admin verification of condition experience

### 2.2 Care Skills Profile [T2]
- Technical care skills caregiver can perform:
  - Personal hygiene support (washing, bathing)
  - Dressing and grooming assistance
  - Toileting and continence care
  - Mobility assistance and transfers
  - Hoisting (with training certificate)
  - Feeding assistance and meal preparation
  - Medication prompting (non-clinical)
  - Catheter care
  - Stoma care
  - Wound care (basic)
  - Behavioural support (dementia, learning disabilities)
  - Manual handling techniques
- Skill level (basic, intermediate, advanced)
- Training certificates for technical skills
- Date of last training/refresher
- Admin verification of skills

### 2.3 Qualifications & Training Registry [T2]
- Care Certificate completion
- NVQ Level 2/3 Health & Social Care
- Nursing qualifications (RGN, RMN, etc.)
- Dementia training certifications
- Safeguarding adults training
- First aid certification (valid date)
- Moving and handling training
- Infection control training
- Specialist certifications (PEG feeding, tracheostomy care, etc.)
- Upload and storage of qualification documents
- Expiry date tracking for time-limited certifications
- Automated renewal reminders

### 2.4 Employment History & Experience [T2]
- Previous care roles (care home, private care, hospital, community)
- Years of experience in elderly care
- Specializations (dementia care, palliative care, etc.)
- Employment references
- Gap analysis in employment history

### 2.5 Service Type Definition [T1-T3]
- Services caregiver offers:
  - Companionship (conversation, activities) [T1]
  - Light housework and cleaning [T1]
  - Shopping and errands [T1]
  - Meal preparation (no feeding at T1) [T1]
  - Personal care (washing, dressing, toileting) [T2]
  - Mobility assistance [T2]
  - Feeding assistance [T2]
  - Medication assistance (prompting only, non-clinical) [T2]
  - Overnight care [T2]
  - Live-in care (weekly/monthly bookings) [T3]
  - Dementia support [T3]
  - End-of-life companionship [T3]
  - Transportation (if caregiver has vehicle) [T1]
- Service type risk assessment (personal care flagged for enhanced checks) [T2]

### 2.6 Capability Verification Workflow [T2]
- Admin review queue for caregiver capability claims
- Evidence assessment (certificates, qualifications)
- Verification status per skill/condition
- Verification expiry tracking
- Re-verification cycles (annual or when certificate expires)
- Verification badge display on profile

### 2.7 Capability-Based Search Indexing [T2-T3]
- Searchable/filterable caregiver capabilities [T2]
- Medical condition matching algorithm [T3]
- Care skills matching algorithm [T2]
- Qualification-level filtering [T2]
- Experience-level filtering [T2]

---

## 3. Medical Condition & Care Skills Matching [TIER 2-3]

**Tier 2 Features**: Care skills matching
**Tier 3 Features**: Medical condition matching, care needs profile

### 3.1 Care Receiver Care Needs Profile [T3]
- Medical conditions care receiver has:
  - Same list as caregiver experience (Parkinson's, dementia, stroke, etc.)
  - Severity level (mild, moderate, severe)
  - Specific symptoms and behaviors
  - Medication regimen (for context, not administered by caregiver)
- Care skills required:
  - Personal care needs (washing, dressing, toileting)
  - Mobility assistance required (walking frame, wheelchair, hoist)
  - Feeding assistance level
  - Continence care needs
  - Behavioral support needs (e.g., dementia wandering, aggression)
- Care plan summary (uploaded by family or GP, optional)
- Risk assessment flags (e.g., falls risk, choking risk)

### 3.2 Care Skills Matching Engine [T2]
- Match required care skills to caregiver skills
- Mandatory skill verification for personal care services
- Flag if caregiver lacks required skill (prevent booking)
- Hoisting requirement = mandatory hoisting certification
- Personal care requirement = personal care training verified

### 3.3 Skill Requirement Enforcement [T2]
- Personal care bookings require minimum NVQ Level 2 or Care Certificate
- Certain skills (hoisting, catheter care) require specific training
- System blocks bookings if qualification requirements not met

### 3.4 Medical Condition Matching Engine [T3]
- Match care receiver conditions to caregiver experience
- Prioritize caregivers with relevant condition experience
- Flag mismatches (care receiver needs not met by caregiver experience)
- Condition severity matching (severe conditions require experienced caregivers)
- Algorithm: Weighted scoring based on condition match + experience level

### 3.5 Risk Assessment & Care Plan Upload [T3]
- Care receiver or family uploads care plan (PDF)
- Risk assessment form (falls, medication, behavioral risks)
- Admin review of high-risk care needs
- Caregiver visibility into risk assessment before accepting booking
- Risk flags displayed on booking request

### 3.6 Care Complexity Scoring [T3]
- Automated complexity score (1-10) based on:
  - Number of medical conditions
  - Severity of conditions
  - Number of care skills required
  - Presence of behavioral risks
  - Mobility limitations
- High complexity bookings flagged for admin review
- Complexity score influences caregiver matching

---

## 4. Discovery & Advanced Search [TIER 1-3]

**Tier 1 Features**: Basic location-based search, simple filtering
**Tier 2 Features**: Advanced filtering (skills, qualifications)
**Tier 3 Features**: Condition-based matching, intelligent algorithms

### 4.1 Basic Location-Based Search [T1]
- Postcode + radius search (5, 10, 15, 20, 30 miles)
- Geolocation service integration (Google Maps/Mapbox)
- Distance calculation (Haversine formula)
- Map view showing caregiver approximate locations
- List view with caregiver cards
- Sort by distance (default)

### 4.2 Advanced Filtering [T1-T3]
- Filter by service type (companionship [T1], personal care [T2], live-in [T3])
- Filter by hourly rate range (slider) [T1]
- Filter by availability (day of week + time of day) [T1]
- Filter by languages spoken [T1]
- Filter by gender (if requested by care receiver) [T1]
- Filter by caregiver rating (minimum star rating) [T1]
- Filter by DBS status (DBS verified badge) [T1 - voluntary only, T2 - mandatory]
- Filter by care skills (multi-select) [T2]
- Filter by qualifications (Care Certificate, NVQ 2/3, nursing background) [T2]
- Filter by medical condition experience (multi-select) [T3]

### 4.3 Intelligent Matching Algorithm [T3]
- Beyond basic search, suggest caregivers based on:
  - Care needs profile match
  - Medical condition experience match
  - Care skills match
  - Previous booking history (if repeat bookings)
  - Caregiver acceptance rate and reliability
  - Proximity and availability
- Machine learning model (future enhancement for pattern matching)

### 4.4 Caregiver Profile Visibility Rules [T2-T3]
- Only show caregivers with verified capabilities matching care receiver needs [T2]
- Hide caregivers without required qualifications for personal care [T2]
- Prioritize caregivers with relevant medical condition experience [T3]
- Deactivate profiles if verification expires [T2]

### 4.5 Saved Searches & Alerts [T1]
- Save search criteria for repeat searches
- Email alerts when new caregivers match saved search
- Favorite caregivers for quick access
- Search history (last 10 searches)

### 4.6 Caregiver Recommendations [T2]
- "Caregivers you may like" based on profile views
- "Similar caregivers" on caregiver profile page
- Personalized recommendations based on care needs

---

## 5. Booking System (Hourly, Daily, Live-In) [TIER 1-3]

**Tier 1 Features**: Basic hourly bookings (companionship)
**Tier 2 Features**: Overnight care, recurring bookings
**Tier 3 Features**: Live-in care bookings

### 5.1 Booking Types [T1-T3]
- **Hourly bookings**: Minimum 2 hours, maximum 8 hours per session [T1]
- **Daily care**: Full-day bookings (8-12 hours) [T1]
- **Multi-day bookings**: Consecutive days (e.g., weekend care) [T1]
- **Overnight care**: Single overnight session (10pm-8am example) [T2]
- **Recurring bookings**: Weekly recurring sessions (e.g., every Tuesday 2-5pm) [T1]
- **Live-in care**: Weekly or monthly bookings with overnight stays [T3]

### 5.2 Booking Request Creation [T1]
- Select caregiver from search or profile
- Choose booking type (hourly, daily, live-in at T3)
- Select date(s) from caregiver availability calendar
- Select start time and duration
- Real-time price calculation (duration × rate + platform fee)
- Add special requests/notes (500 char limit)
- Attach care plan or risk assessment (T3 only)
- Specify medical conditions and care skills required (T2-T3)
- Add emergency contact details (shared with caregiver on acceptance)
- Payment authorization (card hold, not charged until acceptance)
- Cancellation policy displayed and accepted
- Booking request sent to caregiver

### 5.3 Booking Request Review (Caregiver) [T1]
- Email + in-app notification of new booking request
- View booking request details:
  - Care receiver name and profile
  - Date, time, duration
  - Location and distance
  - Care needs summary (medical conditions at T3, care skills at T2)
  - Special requests
  - Risk assessment flags (T3)
  - Earnings breakdown (hourly rate × duration - platform commission)
- 24-hour response window with countdown timer
- Accept or decline options
- Decline reasons (scheduling conflict, too far, outside skill set, rate too low, other)
- Optional message to care receiver on decline

### 5.4 Booking Acceptance & Payment Capture [T1]
- Caregiver accepts booking
- Care receiver's card charged immediately
- Funds held in escrow by platform
- Calendar automatically blocks time slot
- Both parties notified via email and in-app
- Care receiver receives caregiver contact details
- Caregiver receives care receiver address and emergency contact

### 5.5 Booking Lifecycle & Status Management [T1]
- **Requested**: Awaiting caregiver response
- **Accepted**: Confirmed, payment captured
- **In Progress**: Start time reached, session ongoing
- **Completed**: End time passed, caregiver marks complete
- **Cancelled**: Either party cancelled before start
- **Disputed**: Issue raised requiring admin intervention
- **No-Show**: Care receiver or caregiver didn't show up
- Status transitions logged for audit trail

### 5.6 Booking Completion Workflow
- Caregiver marks booking complete at end time
- Optional session notes (private, for record)
- Care receiver receives completion confirmation prompt
- Care receiver confirms or disputes completion within 24 hours
- Automatic completion if no dispute after 24 hours
- Payout released to caregiver on confirmation
- Both parties prompted to leave reviews

### 5.7 Booking Cancellation Policies
- **Care Receiver Cancellation**:
  - 48+ hours before: Full refund minus service fee
  - 24-48 hours: 50% refund
  - <24 hours: No refund (caregiver compensated for late cancellation)
- **Caregiver Cancellation**:
  - 48+ hours before: Full refund to care receiver, no penalty to caregiver
  - <48 hours: Full refund to care receiver, caregiver penalty/warning
  - Frequent cancellations by caregiver = profile suspension
- **Emergency Exemptions**: Manual admin review for illness, family emergency
- Cancellation reason capture
- Pattern monitoring for abuse

### 5.8 Live-In Care Booking Special Features
- Weekly or monthly booking duration
- Daily rate negotiation (different from hourly rate)
- Live-in accommodation requirements specified by care receiver
- Break schedules agreed upfront
- Live-in care agreement signed by both parties
- Admin review required for first-time live-in bookings
- Enhanced DBS mandatory for live-in care
- Ongoing check-ins during live-in period (weekly admin contact)

### 5.9 Recurring Booking Management
- Set up recurring weekly sessions (e.g., every Tuesday 2-5pm)
- Define end date or ongoing (until cancelled)
- Both parties can cancel entire series or individual instances
- Automatic payment processing for each instance
- Notification before each recurring session
- Pricing discount for recurring bookings (optional)

### 5.10 No-Show Management
- Care receiver reports caregiver no-show
- Caregiver reports care receiver not home
- No-show verification (attempted contact, evidence)
- Automatic refund on verified no-show
- No-show tracked in user history (quality metric)
- Repeated no-shows = account suspension

---

## 6. Messaging & Communication [TIER 1]

### 6.1 In-App Messaging [T1]
- Text-only messages (2000 char limit)
- Message thread per booking
- Real-time delivery (WebSocket or 30-second polling)
- Unread message count badges
- Read receipts (optional privacy setting)
- Messaging enabled only after booking request sent
- Messaging persists after booking completion
- Character count while typing
- Message sent confirmation

### 6.2 Content Filtering & Moderation
- Contact information (email, phone, address) automatically redacted
- Profanity filter applied
- Keyword monitoring for safeguarding concerns:
  - "Pay me directly", "off platform", "cash payment"
  - Medical emergency keywords ("bleeding", "fallen", "unconscious")
  - Abuse keywords ("hurt", "threatened", "scared")
- Flagged messages alert admin immediately
- Messages cannot be deleted (audit trail)

### 6.3 Message Reporting
- "Report Conversation" button on message thread
- Report reasons: Inappropriate language, off-platform payment request, harassment, safety concern, other
- Optional additional details (500 chars)
- Entire conversation visible to admin (not just reported message)
- Admin notification of new report
- 24-hour SLA for admin review (safety concerns: immediate)

### 6.4 Notification Preferences
- Email notification of new messages (configurable)
- SMS notification option (Phase 2 / premium feature)
- In-app push notification (mobile app)
- Notification frequency settings (immediate, hourly digest, daily digest)

### 6.5 Message Templates (Caregiver Efficiency)
- Pre-written message templates for common scenarios:
  - "Looking forward to our session"
  - "Running 5 minutes late"
  - "Thank you for the booking"
- Caregiver can customize templates
- Quick-reply buttons for simple responses

### 6.6 Admin Messaging Capability
- Admin can send messages to users directly
- Platform announcements via message thread
- Policy updates and guidance
- Dispute resolution communication

---

## 7. Payment System & Escrow [TIER 1]

### 7.1 Care Receiver Payment Setup [T1]
- Credit/debit card via Stripe Payment Intents
- 3D Secure (SCA) authentication
- Save card for future bookings (PCI-compliant tokenization)
- Multiple cards supported (select at checkout)
- Card validation on entry
- Default payment method selection
- Card expiry date tracking with renewal reminders
- Support for UK-issued cards (Visa, Mastercard, Amex)

### 7.2 Payment Authorization & Capture Flow
1. **Booking Request**: Card authorized (funds held, not charged)
2. **Caregiver Accepts**: Card charged, funds held in platform escrow
3. **Booking Completes**: Caregiver marks complete
4. **Care Receiver Confirms**: Platform releases payout to caregiver
5. **Payout Processed**: Funds appear in caregiver bank (2-3 business days)

### 7.3 Platform Fee Structure
- Care receiver service fee: 5% (added to booking total)
- Caregiver commission: 10-15% (deducted from payout)
- Example: £20/hour × 3 hours = £60 caregiver rate
  - Care receiver pays: £60 + £3 (5%) = £63
  - Caregiver receives: £60 - £9 (15%) = £51
  - Platform revenue: £3 + £9 = £12
- Transparent fee breakdown at checkout and in earnings dashboard
- Fee structure configurable per user type or booking type

### 7.4 Caregiver Payout Setup
- Bank account via Stripe Connect (Express or Standard)
- UK bank accounts only (sort code + account number)
- Instant bank account verification
- KYC verification (handled by Stripe)
- Payout schedule: 2-3 business days after booking completion
- Minimum payout threshold: None (pay out each booking)
- Payout failure handling (retry 3x, notify caregiver, update bank details)

### 7.5 Payout Management
- View pending payouts (awaiting completion confirmation)
- View processing payouts (in transit to bank)
- View completed payouts (received)
- Payout history with filters (date range, care receiver)
- Export payout data (CSV for accounting)
- Annual earnings report (for self-assessment tax return)

### 7.6 Refund Processing
- Automatic refunds on cancellation (per policy)
- Refund to original payment method
- Refunds appear in 5-10 business days (bank-dependent)
- Partial refund support (for disputes)
- Refund confirmation email to care receiver
- Admin manual refund capability (exceptional circumstances)

### 7.7 Dispute Resolution & Payment Holds
- Care receiver disputes booking (service not provided, duration incorrect, quality issue)
- Caregiver's payout paused pending dispute resolution
- Admin review with evidence (messages, booking notes, photos)
- Admin decision: Full refund, partial refund, no refund
- Decision rationale provided to both parties
- Appeal process (escalation to senior admin)

### 7.8 Chargeback Handling
- Stripe automatic chargeback notification
- Admin investigation (booking details, evidence)
- Respond to chargeback with evidence
- User account flagged if chargeback abuse detected
- Chargeback fee covered by platform or passed to user (policy decision)

### 7.9 Financial Reporting (Care Receiver)
- Transaction history (all payments and refunds)
- Receipt download (PDF per booking)
- Annual statement for expense claims
- Filter by year, caregiver, booking type
- Export to CSV

### 7.10 Financial Reporting (Caregiver)
- Earnings dashboard (total earned, this month, pending)
- Per-booking earnings breakdown
- Platform commission transparency
- Annual earnings summary (for self-assessment tax)
- Downloadable tax statement (CSV/PDF)
- Tax guidance (self-employed status, HMRC registration)

### 7.11 Payment Security & Compliance
- PCI DSS compliance (Stripe handles card data)
- SCA (Strong Customer Authentication) for transactions >€30
- Anti-Money Laundering (AML) transaction monitoring
- Fraud detection (Stripe Radar)
- Payment Services Regulations 2017 compliance
- Funds held in segregated accounts

---

## 8. Reviews, Ratings & Reputation [TIER 1]

### 8.1 Post-Booking Reviews (Care Receiver → Caregiver) [T1]
- Review enabled after booking completion confirmed
- 5-star rating (required)
- Rating sub-categories (optional):
  - Reliability (on-time, fulfilled commitment)
  - Communication (responsive, clear)
  - Care quality (companionship, personal care)
  - Professionalism
- Written review (optional, 500 char limit)
- Review submission deadline: 14 days after booking
- Review publicly visible on caregiver profile
- Cannot edit review after submission (integrity)
- Cannot include personal contact information
- Profanity filter applied

### 8.2 Caregiver Response to Reviews
- Caregiver can respond to reviews (optional, 300 chars)
- One response per review
- Response visible below review
- Professional tone encouraged (guidance provided)
- Response cannot be edited after submission

### 8.3 Review Moderation
- Admin review of flagged reviews (inappropriate content, abuse)
- Report review button for users
- Admin can hide reviews (policy violation, proven false)
- Review removal requires justification (audit trail)
- User notified if review removed

### 8.4 Caregiver Ratings & Reputation Score
- Average rating displayed on profile (1-5 stars)
- Total number of reviews shown
- Rating distribution (5-star: 70%, 4-star: 20%, etc.)
- Recent reviews prominently displayed (last 10)
- "View All Reviews" link for full history
- Rating influences search ranking and matching

### 8.5 Care Receiver Reviews (Caregiver → Care Receiver)
- Private ratings by caregiver (not public)
- Used for admin investigations and quality control
- Objective factors only:
  - Environment as described
  - Payment processed smoothly
  - Clear communication
  - Respectful behavior
- Cannot rate care receiver's personality or health conditions (discrimination risk)
- Pattern of low ratings by multiple caregivers = admin review

### 8.6 Low Rating Escalation
- Caregiver ratings <3 stars trigger admin review
- Admin investigates booking (messages, booking notes)
- Admin contacts caregiver and care receiver
- Potential actions: Warning, retraining recommendation, suspension
- Pattern of low ratings = profile suspension or removal

### 8.7 Verified Reviews Badge
- Reviews verified as legitimate (actual completed booking)
- Verified badge displayed on review
- Prevents fake reviews

### 8.8 Review Prompts & Timing
- Email reminder 24 hours after booking completion
- In-app prompt on next login after booking
- Gentle reminders (not pushy)
- Explain importance of reviews (help other care receivers, improve caregiver quality)

---

## 9. Safeguarding & Incident Management [TIER 1]

### 9.1 Safeguarding Reporting System [T1]
- "Report Safety Concern" buttons accessible from:
  - User profiles
  - Messages
  - Bookings
  - General platform report
- Report categories:
  - **Urgent - Safety Concern**: Immediate admin alert (SMS/phone)
  - Inappropriate behavior/communication
  - Request for off-platform payment
  - Fake profile/identity fraud
  - Discrimination or harassment
  - Suspected abuse or neglect
  - Financial exploitation
  - Medication error
  - Physical injury
  - Other safeguarding concern
- Detailed description field (500 chars)
- Evidence upload (screenshots, photos, documents)
- Reporter receives case number and status updates
- Urgent reports trigger immediate SMS/phone alert to safeguarding team

### 9.2 Safeguarding Incident Management Workflow
1. **Report Submitted**: Case number generated, reporter notified
2. **Initial Review** (<30 minutes for urgent, <24 hours for standard): Safeguarding officer triages
3. **Investigation**: Contact reporter, reported user, review evidence (messages, bookings, history)
4. **Risk Assessment**: Determine severity and immediate actions required
5. **Action Taken**: Warning, suspension, permanent ban, referral to authorities
6. **Reporter Notified**: Outcome summary (within privacy limits)
7. **Case Closed**: Documentation retained, lessons learned documented

### 9.3 Safeguarding Escalation & External Referral
- Immediate danger: Contact emergency services (999)
- Suspected abuse: Referral to local authority safeguarding team
- Criminal activity: Referral to police
- Regulatory concern: Report to CQC (if applicable)
- Escalation matrix:
  - Level 1 (Low risk): Admin warning, monitoring
  - Level 2 (Medium risk): Temporary suspension, investigation
  - Level 3 (High risk): Permanent ban, external referral
  - Level 4 (Immediate danger): Emergency services, immediate account lockout

### 9.4 Safeguarding Team Structure
- Designated Safeguarding Officer (DSO) role
- 24/7 on-call safeguarding team
- Safeguarding training for all admin staff
- Safeguarding policies and procedures documented
- Regular safeguarding audits and case reviews
- Collaboration with local authority safeguarding teams

### 9.5 User Suspension & Ban System
- Temporary suspension (7, 14, 30 days) for policy violations
- Permanent ban for serious safeguarding concerns
- Account lockout (immediate access revoked)
- Active bookings cancelled with appropriate refunds
- User notified of suspension/ban with reason (fraud cases: silent ban)
- Appeal process for wrongful suspensions
- Ban evasion detection (email, phone, IP, device fingerprinting)

### 9.6 Behavioral Monitoring & Pattern Detection
- Automated monitoring for concerning patterns:
  - Frequent booking cancellations (potential coercion)
  - Off-platform payment requests (financial exploitation)
  - Low ratings across multiple bookings (quality/safety issue)
  - Messages with safeguarding keywords (abuse, harm)
  - Rapid account creation (fake accounts)
  - Geographic clustering of reports (problematic user)
- Admin alerts when patterns detected
- Proactive outreach to at-risk users

### 9.7 Vulnerable Adult Protection Measures
- Age verification ensures elderly users identified
- Cognitive impairment flags (optional, family-reported)
- Enhanced monitoring for vulnerable user bookings
- Family member oversight (shared accounts)
- Regular welfare check-ins for frequent users
- Safeguarding training for caregivers (mandatory)

### 9.8 Financial Exploitation Prevention
- Payment processing on-platform only (no direct payments)
- Contact information filtering in messages (prevents off-platform transactions)
- Alert if caregiver requests payment method change
- Pattern detection for unusual payment requests
- Disputed transaction investigation
- Financial abuse training for admin and caregivers

### 9.9 Safeguarding Documentation & Audit Trail
- All reports retained indefinitely (legal requirement)
- Detailed investigation notes
- Actions taken and rationale documented
- Outcome tracking
- Annual safeguarding report for board/CQC
- Safeguarding case review meetings (monthly)

### 9.10 Safeguarding Training & Policy
- Safeguarding adults training for all caregivers (mandatory before profile activation)
- Safeguarding policy published and accessible
- Care Act 2014 compliance
- Safeguarding refresher training (annual)
- User guidance on recognizing safeguarding concerns
- Reporting made easy (prominent, low-barrier)

---

## 10. Identity & Background Verification [TIER 1-2]

**Tier 1 Features**: Basic ID and right to work verification
**Tier 2 Features**: DBS checks, qualification verification, insurance verification, reference checks

### 10.1 Care Receiver Identity Verification [T1]
- Automated verification via third-party service (Stripe Identity, Onfido, Yoti)
- Government-issued ID photo upload (passport, driving license)
- Selfie photo for liveness check
- Verification required before first booking
- Verification badge displayed to caregivers
- Manual review fallback if automated fails
- Verification status tracked in user profile

### 10.2 Caregiver Enhanced Identity Verification
- Government-issued ID verification (same process)
- Address verification (utility bill or bank statement, <3 months old)
- Selfie + liveness check
- Right to work verification (share code check via UKVI online service)
- Manual admin review of all documents (48-hour SLA)
- Verification required before profile goes live
- Annual re-verification required

### 10.3 Right to Work Verification (Caregivers)
- UK passport holders: Automatically verified
- Non-UK passport holders: Share code entered, checked via UKVI service
- Visa status and expiry tracking
- Work restriction checks (full-time, part-time, hours limited)
- Automated visa expiry reminders
- Profile deactivation if right to work expires

### 10.4 DBS (Disclosure and Barring Service) Checks
- Partner with DBS umbrella organization (Trustid, UKCBC)
- Basic DBS minimum (standard for elderly care)
- Enhanced DBS preferred (especially for personal care and live-in)
- Caregiver pays for own check (industry standard, ~£40-60)
- DBS certificate number verification
- DBS Update Service integration (ongoing checks)
- "DBS Verified" badge on profile
- Care receivers can filter for DBS-verified caregivers
- DBS expiry tracking (3-year recommended re-check)
- Mandatory DBS for personal care and live-in care services

### 10.5 Qualification Verification
- Upload qualification certificates (Care Certificate, NVQ, nursing qualifications, etc.)
- Admin verification of qualification authenticity
- Awarding body verification (check with issuing organization if needed)
- Qualification expiry tracking (e.g., first aid certificates expire)
- Verified qualification badge on profile
- Qualification-specific capabilities unlocked on verification

### 10.6 Professional Reference Checks
- Minimum 2 professional references required for caregivers
- Reference contact information captured
- Admin contacts references (phone or email)
- Reference verification form:
  - Confirm employment dates
  - Role and responsibilities
  - Quality of work
  - Reason for leaving
  - Would you rehire? (yes/no)
  - Safeguarding concerns? (yes/no)
- Reference verification status tracked
- References retained for audit

### 10.7 Insurance Verification
- Public liability insurance requirement (minimum £1M coverage)
- Upload proof of insurance (certificate with policy number)
- Insurance expiry date tracked
- Automated renewal reminders (60 days, 30 days, 7 days before expiry)
- Profile hidden if insurance lapses
- Platform group insurance scheme (optional partnership)

### 10.8 Health & Immunization Verification
- COVID-19 vaccination status (recommended, not mandatory)
- Hepatitis B vaccination (recommended for personal care)
- TB screening (if applicable)
- Annual health declaration
- Fitness to work declaration

### 10.9 Ongoing Verification & Re-Verification
- Annual identity re-verification
- DBS re-check every 3 years (or via Update Service)
- Qualification renewal tracking (first aid, moving & handling)
- Insurance renewal tracking
- Right to work re-verification (if visa-based)
- Automated reminders for expiring verifications
- Profile deactivation if verification expires without renewal

### 10.10 Verification Badge System
- Identity Verified badge
- DBS Verified badge
- Qualifications Verified badge (specific to each qualification)
- Insurance Verified badge
- "Fully Verified" master badge (all verifications complete)
- Badge expiry indicated (e.g., "DBS verified until Dec 2026")

---

## 11. Clinical Safety Monitoring [TIER 3]

### 11.1 Medication Assistance Monitoring
- Caregivers can prompt medication (non-clinical, not administer)
- Medication prompting logged in booking notes
- Missed medication prompt flagged for family/GP
- Medication error reporting (admin immediate alert)
- Caregiver training on medication prompting (mandatory before offering service)

### 11.2 Falls & Injury Reporting
- Incident report form (falls, injuries, near-misses)
- Immediate notification to family/emergency contact
- Admin investigation of incident
- Pattern analysis (frequent falls = increased risk)
- GP notification if serious injury
- Incident retained in care receiver's record

### 11.3 Behavioral Change Monitoring
- Caregiver reports changes in care receiver behavior or health:
  - Confusion, agitation (dementia progression)
  - Weakness, fatigue (health decline)
  - Reduced appetite, weight loss
  - Hygiene decline
  - Social withdrawal
- Family/GP notification of concerning changes
- Care plan review triggered by behavioral changes

### 11.4 Care Receiver Welfare Check-Ins
- Automated welfare check-ins for frequent users (weekly or monthly)
- Family member receives check-in prompt (How is [Care Receiver] doing?)
- Admin follow-up if welfare concerns reported
- Escalation to safeguarding if needed

### 11.5 Caregiver Wellness & Burnout Monitoring
- Caregiver workload tracking (hours per week)
- Burnout risk assessment (excessive hours, frequent bookings)
- Wellness resources and support provided
- Admin outreach if burnout risk detected
- Mandatory rest periods for live-in care (define break schedules)

### 11.6 Emergency Situation Handling
- Caregiver emergency button in app (during active booking)
- Emergency contact notification (care receiver's family)
- Admin immediate alert
- Emergency services dispatch if needed (999)
- Post-emergency incident review
- Caregiver support after emergency incident

### 11.7 Medical Emergency Protocol
- Caregiver training on recognizing medical emergencies (mandatory)
- Emergency protocol guidance in app:
  - Call 999 immediately
  - Notify family/emergency contact
  - Notify platform admin
  - Stay with care receiver until help arrives
- Post-emergency documentation requirement
- Admin review of emergency response

### 11.8 End-of-Life Care Support
- End-of-life care flagged in care receiver profile (with consent)
- Caregiver training on end-of-life support
- Palliative care guidance resources
- Family liaison during end-of-life period
- Bereavement support for caregiver (counseling resources)
- Admin sensitivity in handling end-of-life bookings

### 11.9 Clinical Incident Audit Trail
- All clinical incidents logged (falls, medication errors, health changes)
- Incident investigation documentation
- Corrective actions tracked
- Incident trend analysis (identify systemic issues)
- Annual clinical safety report
- CQC incident reporting (if applicable)

---

## 12. Admin Operations & Oversight [TIER 1]

### 12.1 Admin Dashboard
- Real-time platform metrics (users, bookings, revenue, reports)
- Alerts and notifications (urgent reports, system issues)
- Quick access to key admin functions
- Safeguarding case queue (urgent flagged)
- Caregiver application review queue
- Verification pending queue
- Dispute resolution queue
- System health status

### 12.2 User Management Interface
- User search (by name, email, postcode)
- User detail pages (profile, bookings, messages, payments, reports, actions)
- User status management (active, suspended, banned)
- User action buttons (warn, suspend, ban, require re-verification)
- Activity log (login history, booking history, message activity)
- Internal admin notes (not visible to user)
- User export (bulk data export for analysis)

### 12.3 Caregiver Application Review
- Application queue (pending caregivers)
- Profile review checklist:
  - Photo appropriate (face visible, professional)
  - Bio complete (no contact info, no inappropriate content)
  - Services reasonable
  - Rate within platform range
  - Identity verification complete
  - Bank account connected
- Approve or reject actions
- Rejection reasons (communicated to caregiver)
- Feedback comments for improvements
- Review SLA: 48 hours maximum

### 12.4 Verification Management
- Verification queue (pending verifications)
- Document review interface (view uploaded certificates, IDs, etc.)
- Approve or reject verification
- Verification expiry tracking dashboard
- Bulk verification renewal reminders
- Verification audit log

### 12.5 Booking Oversight
- All bookings viewable (searchable, filterable)
- Filter by status, date range, user, disputed, high-value
- Booking detail view (care receiver, caregiver, date/time, payment, messages)
- Admin actions: Cancel booking (with refund), extend booking, mark complete (override)
- Flagged bookings: Disputed, delayed completion, frequent cancellations, high complexity
- Booking intervention log (audit trail)

### 12.6 Dispute Resolution Interface
- Dispute queue (sorted by urgency)
- Dispute detail view (booking details, messages, evidence, user histories)
- Admin decision tools: Full refund, partial refund, no refund
- Rationale documentation (required for decisions)
- Communication tools (send messages to both parties)
- Dispute outcome tracking
- Appeal handling

### 12.7 Report Management
- Report queue (urgent flagged in red)
- Report detail view (reporter, reported user, reason, description, evidence)
- Investigation tools (view full message threads, booking history, previous reports)
- Action decision interface (warn, suspend, ban, close report)
- Case notes (internal documentation)
- Reporter notification (outcome summary)
- Report closure with rationale

### 12.8 Payment & Financial Oversight
- Transaction monitoring dashboard
- Suspicious transaction flagging (fraud detection)
- Refund management (approve manual refunds)
- Payout management (view pending, processing, failed)
- Chargeback handling interface
- Financial reconciliation reports

### 12.9 Communication Tools (Admin → Users)
- Send email to users (individual or bulk)
- Send in-app notifications
- Platform announcements
- Policy update communications
- Personalized messages (welcome, milestones, re-engagement)
- Email templates for common admin tasks

### 12.10 Admin Audit Log
- All admin actions logged (immutable)
- Who did what, when, and why
- View audit log with filters (date range, admin user, action type)
- Audit log export for compliance
- Admin access tracking (who viewed what data)

### 12.11 Admin User Management
- Multiple admin accounts with role-based access
- Admin roles: Super Admin, Safeguarding Officer, Operations Manager, Customer Support
- Admin permissions per role
- Admin activity monitoring
- 2FA mandatory for all admin accounts
- Admin account lockout after failed login attempts

### 12.12 Content Moderation Tools
- Flagged content queue (messages, reviews, profiles)
- Content review interface
- Approve, hide, or remove content
- Moderation reason documentation
- User notification of moderation actions
- Content moderation audit trail

---

## 13. Compliance & Audit System [TIER 1-3]

### 13.1 Audit Trail & Logging
- All platform actions logged (user actions, admin actions, system events)
- Immutable audit log (append-only)
- Log retention: Minimum 7 years (regulatory requirement)
- Audit log fields: Timestamp, user ID, action type, entity affected, IP address, user agent
- Searchable audit log interface
- Audit log export for regulatory review

### 13.2 GDPR Compliance
- Privacy policy (clear, accessible, reviewed annually)
- Terms of service (clear, accessible, reviewed annually)
- Cookie consent banner (analytics cookies require consent)
- Consent management (granular: service usage vs marketing)
- Right of access (SAR - Subject Access Request): User can download all their data
- Right to erasure ("Right to be Forgotten"): User can request account deletion
- Right to rectification: User can correct inaccurate data
- Right to data portability: User can export data in machine-readable format
- Data retention policy (published)
- Data processing agreements with third parties (Stripe, email provider, SMS provider)
- GDPR-compliant data storage (UK or EU-based servers)
- Data breach notification procedure (<72 hours to ICO)

### 13.3 Data Retention Policies
- Active accounts: Data retained indefinitely
- Deleted accounts: Personal data anonymized after 30 days (booking records anonymized, not deleted)
- Payment records: Retained 7 years (HMRC requirement)
- Safeguarding reports: Retained 7 years (legal requirement)
- Messages: Retained 2 years after last booking (safeguarding evidence)
- Audit logs: Retained 7 years
- Identity verification documents: Deleted after verification (only verification status retained)

### 13.4 Data Subject Rights Interface
- "Download My Data" feature (exports JSON with all user data)
- "Delete My Account" feature (initiates 30-day deletion process)
- "Correct My Data" feature (user can update profile data)
- "Withdraw Consent" feature (marketing consent withdrawal)
- Data portability format: JSON or CSV

### 13.5 ICO (Information Commissioner's Office) Compliance
- Data Protection Impact Assessment (DPIA) for vulnerable adult data processing
- ICO registration (data controller registration)
- Data breach response plan
- Data protection officer (DPO) designated
- Regular compliance audits
- User complaints procedure

### 13.6 Care Quality & Safety Standards (Voluntary CQC Alignment)

**Founder Decision (FDR-002, 2026-02-01)**: Platform does NOT require CQC registration (Introduction Agency model)

**Voluntary CQC-Aligned Policies** (Recommended best practice, NOT regulatory requirement):
- Safeguarding adults policy (Care Act 2014 aligned)
- Dignity and respect policy
- Complaints and compliments policy
- Infection control guidance (COVID-19)
- Quality assurance framework (reviews, verification, incident monitoring)
- Annual quality reports (internal, NOT submitted to CQC)

**Rationale for Voluntary CQC Alignment**:
- Demonstrates quality commitment to families and caregivers
- Provides rapid compliance path if CQC later requires registration
- Aligns with best practice in care sector
- Does NOT create regulatory obligations or CQC inspection liability

### 13.7 Care Act 2014 Compliance
- Duty to respond to safeguarding concerns (6 safeguarding principles)
- Wellbeing principle (promote care receiver wellbeing)
- Information and advice provision
- Safeguarding Adults Boards liaison (local authorities)
- Safeguarding policies aligned with Care Act

### 13.8 Employment Law Compliance
- Caregiver self-employed status (clear guidance)
- IR35 compliance (avoid disguised employment)
- Right to work verification (Immigration Act)
- Tax guidance (self-assessment, HMRC registration)
- National Living Wage compliance (minimum rates)
- Working Time Regulations (maximum hours guidance)

### 13.9 Payment Services Regulations Compliance
- Funds held in segregated accounts
- Payment authorization before charge
- Clear pricing and fee structure
- Terms and conditions for payment services
- Dispute resolution process
- Payment failure handling

### 13.10 Consumer Rights Act Compliance
- Clear cancellation policy
- Fair refund terms
- Accurate service descriptions
- Right to change mind (14-day cooling-off period where applicable)
- Complaints procedure

### 13.11 Equality Act 2010 Compliance
- No discrimination based on protected characteristics:
  - Age, disability, gender, race, religion, sexual orientation
- Accessible platform design (WCAG 2.1 AA)
- Reasonable adjustments for disabled users
- Diversity and inclusion policy
- Anti-discrimination training for caregivers

### 13.12 Compliance Reporting & Audits
- Quarterly compliance review (internal)
- Annual external compliance audit
- Annual safeguarding report
- Annual financial audit
- Annual data protection audit
- Regulatory submissions (ICO, HMRC) - Note: CQC submissions NOT required (FDR-002)

### 13.13 Terms of Service & Legal Agreements
- Care receiver terms of service
- Caregiver terms of service (self-employed contractor agreement)
- Privacy policy
- Cookie policy
- Acceptable use policy
- Community guidelines
- Caregiver professional standards
- Live-in care agreement
- Regular legal review and updates

---

## 14. Emergency Escalation & Response [TIER 1]

### 14.1 Emergency Contact System
- Care receiver emergency contact captured (mandatory)
- Emergency contact notified of:
  - Booking confirmations
  - Caregiver no-show
  - Safety concerns reported
  - Incidents during booking (falls, injuries)
  - Medical emergencies
- Multiple emergency contacts supported
- Emergency contact SMS and phone call capability

### 14.2 Emergency Button (In-App)
- Caregiver emergency button during active booking
- Triggers immediate:
  - Admin alert (SMS, phone call)
  - Emergency contact notification
  - Care receiver emergency contact notification
- Emergency types:
  - Medical emergency (care receiver unresponsive, injury, etc.)
  - Safety threat (caregiver feels unsafe)
  - Urgent assistance needed
- Emergency GPS location sharing (if mobile app)

### 14.3 24/7 Safeguarding Hotline
- Dedicated phone number for urgent safeguarding concerns
- 24/7 staffed by on-call safeguarding officer
- Immediate response protocol (<15 minutes)
- Emergency services coordination (999 if needed)
- Family/emergency contact notification
- Post-emergency follow-up and support

### 14.4 Emergency Services Coordination
- Platform provides information to emergency services:
  - Care receiver name, address, medical conditions
  - Caregiver details
  - Nature of emergency
- Emergency incident documentation
- Collaboration with ambulance, police, fire services as needed
- Liaison with hospital/GP if care receiver hospitalized

### 14.5 Emergency Escalation Matrix
- **Level 1 (Routine)**: Non-urgent inquiry, admin review within 24 hours
- **Level 2 (Priority)**: Safeguarding concern, admin review within 2 hours
- **Level 3 (Urgent)**: Immediate safety risk, admin response within 30 minutes
- **Level 4 (Emergency)**: Medical emergency or immediate danger, response within 5 minutes, emergency services called

### 14.6 Post-Emergency Support
- Caregiver debriefing and support (counseling resources)
- Care receiver welfare check
- Family liaison and updates
- Incident investigation and lessons learned
- Platform improvements based on emergency incidents

### 14.7 Emergency Preparedness Training
- Caregiver training on emergency protocols (mandatory)
- Emergency scenario simulations (training exercises)
- First aid certification encouraged
- CPR training encouraged
- Emergency contact list always accessible in app

---

## 15. Calendar & Availability Management [TIER 1]

### 15.1 Caregiver Availability Configuration
- Recurring weekly availability (e.g., Mon-Fri 9am-5pm)
- One-off availability additions (e.g., available Saturday June 15)
- Unavailability blocking (holidays, appointments)
- Bulk availability updates (next 4 weeks at once)
- Import availability from Google Calendar / iCal (sync)
- Minimum availability recommendation (20 hours/week for visibility)

### 15.2 Availability Status Dashboard (Caregiver)
- Hours available this week
- Availability coverage indicator (low, healthy, high)
- Visual calendar showing available slots vs booked slots
- Low availability warning (encourage adding hours)
- Availability optimization suggestions (fill gaps)

### 15.3 Real-Time Availability Sync
- Booking acceptance immediately blocks time slot
- Booking cancellation reopens time slot
- Double-booking prevention (system-enforced)
- Concurrent booking management (live-in care vs hourly)

### 15.4 Care Receiver Calendar View
- View upcoming bookings
- View past bookings
- Color-coded by status (requested, confirmed, completed, cancelled)
- Month, week, day views
- Click booking to view details
- Quick actions: Cancel, message caregiver, view receipt

### 15.5 Caregiver Calendar View
- View upcoming bookings and availability slots
- Manage availability (add/remove slots)
- Booking list view (chronological)
- Filter by status, care receiver
- Color-coded calendar (availability vs bookings)
- Export calendar to Google Calendar / iCal

### 15.6 Calendar Reminders & Notifications
- Booking reminder 24 hours before (email + in-app)
- Booking reminder 2 hours before (SMS if enabled)
- Availability expiring reminder (no availability set for next week)
- Recurring booking reminder (before each instance)

### 15.7 Timezone Handling
- UK time only for MVP (GMT/BST)
- Timezone conversion for international family members (Phase 2)
- Daylight saving time adjustment (automatic)

---

## 16. Family & Multi-User Accounts [TIER 1]

### 16.1 Family Account Structure
- Primary care receiver account
- Multiple family member sub-accounts
- Family members can be added by care receiver or primary family organizer
- Each family member has own login credentials
- Shared access to care receiver's profile and bookings

### 16.2 Family Member Invitation System
- Primary account holder sends invitation (email)
- Invitee creates account and accepts invitation
- Relationship to care receiver specified (daughter, son, spouse, etc.)
- Invitation expiry (7 days)
- Revoke invitation before acceptance
- Invitation tracking (sent, accepted, expired)

### 16.3 Role-Based Permissions (Family Members)
- **View-Only**: Can view bookings, messages, profile (no changes)
- **Booking Manager**: Can request bookings, message caregivers, view invoices
- **Full Access**: Can do everything including manage family members, update profile, payment methods
- **Emergency Contact**: Receives emergency notifications but no login access
- Permissions configurable per family member
- Permission changes logged in audit trail

### 16.4 Activity & Visibility
- All family members see shared activity log:
  - Bookings requested, accepted, completed
  - Messages sent/received
  - Profile updates
  - Payment transactions
- Timestamp and "by [Family Member]" attribution
- Transparency for all family members

### 16.5 Communication Management
- Messages visible to all family members with messaging permission
- Family members can reply to caregiver (all see conversation)
- Caregiver sees "[Care Receiver Family]" as sender (not individual names)
- Option to tag family member in internal notes (not visible to caregiver)

### 16.6 Payment Method Management
- Primary account holder adds payment methods
- Full Access family members can add/remove payment methods
- All payment transactions visible to all family members
- Receipts sent to primary account holder + Full Access members

### 16.7 Family Member Removal
- Primary account holder can remove family members
- Removed member receives notification
- Removed member loses access immediately
- Audit trail of removal

### 16.8 Identity Verification (Family Members)
- Family members must verify identity (same process as care receiver)
- Verification required before managing bookings or payments
- Relationship verification (proof of relationship to care receiver if high-risk actions)

### 16.9 Caregiver Visibility into Family Structure
- Caregiver sees "Family Account" badge on care receiver profile
- Caregiver knows multiple family members may be involved
- Caregiver messages visible to family (transparency)

### 16.10 Family Account Safeguarding
- Multiple family members reduce risk of coercion (oversight)
- Unusual activity (e.g., sudden family member removal) flagged for admin review
- Family disputes handled by admin mediation
- Safeguarding concerns reported to all family members

---

## 17. Caregiver Dashboard & Management [TIER 1]

### 17.1 Dashboard Overview
- Pending booking requests (urgent, top priority)
- Next upcoming booking (large card, prominent)
- Upcoming bookings (list of next 7 days)
- Earnings summary (total, this month, pending payouts)
- Onboarding checklist (if incomplete)
- Availability status (hours available this week)
- Profile performance (views, acceptance rate, response time)
- Quick actions (manage calendar, view earnings, update profile)

### 17.2 Booking Request Management
- View pending booking requests with countdown timer
- Booking request details (care receiver, date, time, care needs, earnings)
- Accept or decline booking
- Decline reason selection (optional message to care receiver)
- 24-hour response window enforcement
- Auto-decline if no response (with notification)

### 17.3 Upcoming Bookings Management
- View upcoming bookings (next 7, 14, 30 days)
- Booking detail view (care receiver details, address, emergency contact, care needs)
- Quick actions: Message care receiver, get directions, view care plan, report issue
- Booking completion workflow (mark complete, add session notes)

### 17.4 Earnings Dashboard
- Total earnings (all-time)
- This month earnings
- Pending payouts (awaiting completion confirmation)
- Payout history (completed payouts)
- Per-booking earnings breakdown
- Platform commission transparency
- Export earnings data (CSV for accounting)
- Annual earnings report (for self-assessment tax)

### 17.5 Calendar Management
- View calendar (month, week, day views)
- Manage availability (add/remove slots)
- View confirmed bookings
- Availability coverage indicator
- Sync with Google Calendar / iCal

### 17.6 Profile Management
- Edit profile (bio, photo, services, rates)
- Update medical condition experience
- Update care skills and qualifications
- Upload new qualifications/certificates
- View verification status (identity, DBS, qualifications)
- Preview public profile (how care receivers see it)

### 17.7 Message Center
- View all message threads (organized by booking)
- Unread message count badges
- Reply to care receivers
- Message templates for efficiency
- Archive old conversations

### 17.8 Reviews & Ratings
- View received reviews
- Respond to reviews (optional)
- Average rating and rating distribution
- Review insights (common positive/negative themes)

### 17.9 Performance Insights
- Profile views this week
- Booking requests received
- Acceptance rate (target: >70%)
- Response time (target: <6 hours)
- Tips to improve profile performance
- Benchmarking against similar caregivers (optional)

### 17.10 Verification & Compliance Center
- Verification checklist (identity, DBS, qualifications, insurance)
- Upload documents for verification
- View verification status and expiry dates
- Renewal reminders
- Training certificates upload

### 17.11 Settings
- Account settings (email, phone, password)
- Notification preferences (email, SMS, push)
- Payment settings (bank account, payout schedule)
- Privacy settings (profile visibility, read receipts)
- Deactivate account (temporary or permanent)

---

## 18. Care Receiver Dashboard [TIER 1]

### 18.1 Dashboard Overview
- Recommended caregivers (based on care needs)
- Upcoming bookings (next booking large card, then list)
- Recent caregiver searches
- Pending booking requests (awaiting caregiver response)
- Quick actions (search caregivers, view bookings, manage payment methods)
- Onboarding checklist (if incomplete)

### 18.2 Care Needs Profile Management
- Define medical conditions (Parkinson's, dementia, stroke, etc.)
- Specify care skills required (personal care, mobility, feeding, etc.)
- Update care plan (upload PDF from GP/family)
- Risk assessment form
- Care complexity score (system-calculated)
- Share care needs with family members

### 18.3 Caregiver Search & Discovery
- Search by location (postcode + radius)
- Advanced filters (medical condition experience, care skills, qualifications, rate, availability, language)
- View search results (map or list)
- Save searches for repeat use
- Favorite caregivers
- Booking request from search results or profile

### 18.4 Booking Management
- View all bookings (filter by status: requested, confirmed, completed, cancelled)
- Booking detail view (caregiver details, date/time, care plan, messages)
- Cancel booking (per cancellation policy)
- Completion confirmation
- Dispute booking (if issue)

### 18.5 Message Center
- View all message threads with caregivers
- Unread message count badges
- Reply to caregivers
- Archive old conversations

### 18.6 Payment & Transaction History
- View all payments and refunds
- Download receipts (PDF per booking)
- Manage payment methods (add/remove cards)
- View upcoming charges (pending bookings)
- Annual statement for expense claims

### 18.7 Reviews Management
- Leave review after booking completion
- View past reviews you've written
- Edit review (within 24 hours of submission)

### 18.8 Family Account Management (if applicable)
- Invite family members to shared account
- Manage family member permissions
- View family activity log
- Remove family members

### 18.9 Settings
- Account settings (email, phone, password)
- Emergency contact management
- Notification preferences
- Privacy settings
- Delete account

---

## 19. Notifications & Alerts [TIER 1]

### 19.1 Email Notifications (Transactional)
- Email verification (registration)
- Password reset
- Booking request received (caregiver)
- Booking request sent (care receiver)
- Booking accepted (both parties)
- Booking declined (care receiver)
- Booking reminder (24 hours before)
- Booking completed
- Payment receipt (care receiver)
- Refund processed (care receiver)
- Payout completed (caregiver)
- Report submitted (reporter)
- Account suspended/banned (user)
- Verification approved/rejected (caregiver)
- Identity verification required (user)

### 19.2 Email Notifications (Engagement)
- New caregivers in your area (care receiver)
- Incomplete profile reminder (caregiver)
- Review reminder (after booking)
- Low availability prompt (caregiver)
- Verification expiring soon (caregiver)
- Booking anniversary milestones
- Platform updates and new features

### 19.3 In-App Notifications
- Real-time notifications (WebSocket or polling)
- Notification bell icon with unread count badge
- Notification dropdown showing recent notifications
- Notification types:
  - Booking requests
  - Messages
  - Booking reminders
  - Payment confirmations
  - Reports updates
  - Admin announcements
- Mark as read/unread
- Notification history (last 30 days)

### 19.4 SMS Notifications (Optional/Premium)
- Booking reminder (2 hours before)
- Urgent safeguarding alerts (admin to caregiver)
- Emergency escalation alerts (to emergency contacts)
- Caregiver running late notification
- OTP for sensitive actions (password change, payout method change)
- Verification expiry urgent reminders

### 19.5 Push Notifications (Mobile App)
- Native mobile app push notifications (iOS/Android)
- Notification types same as in-app
- Notification settings (enable/disable per type)
- Notification sound customization

### 19.6 Notification Preferences
- Granular notification preferences per user
- Email: Enable/disable per notification type
- SMS: Enable/disable per notification type
- Push: Enable/disable per notification type
- Quiet hours (no notifications between 10pm-8am except emergencies)
- Digest mode (daily or weekly summary instead of real-time)
- Unsubscribe from marketing emails (keep transactional)

### 19.7 Notification Delivery System
- Queue-based notification system
- Retry failed email deliveries (3 attempts)
- Bounce detection and email address validation
- Undeliverable notification logging
- User notification of delivery failure (e.g., "We couldn't send you an email")

---

## 20. Analytics & Reporting [TIER 1-4]

### 20.1 Platform Metrics Dashboard (Admin)
- User metrics: Total users, new registrations, active users, retention cohorts
- Caregiver metrics: Total caregivers, approved caregivers, pending applications, avg approval time
- Booking metrics: Total bookings, booking requests, acceptance rate, completion rate, cancellation rate, avg booking value
- Financial metrics: GMV (Gross Merchandise Value), platform revenue, avg transaction value, refund rate
- Safety metrics: Reports submitted, report resolution time, suspensions/bans, avg review rating
- Compliance metrics: Verification completion rates, DBS uptake, qualification verification status

### 20.2 User Analytics
- User behavior tracking (Google Analytics, Mixpanel)
- User journey funnels:
  - Registration → verification → first booking
  - Search → profile view → booking request
  - Booking request → acceptance → completion → review
- Drop-off analysis (identify friction points)
- Cohort retention analysis (monthly retention rates)
- User segmentation (active vs inactive, high-value vs low-value)

### 20.3 Booking Analytics
- Booking trends over time (daily, weekly, monthly)
- Booking type distribution (hourly vs daily vs live-in)
- Geographic distribution (heatmap of bookings by region)
- Caregiver utilization (bookings per caregiver, hours worked)
- Care receiver usage patterns (bookings per care receiver, frequency)
- Peak booking times (day of week, time of day)

### 20.4 Financial Analytics
- Revenue trends (daily, weekly, monthly)
- Revenue by booking type
- Revenue by region
- Caregiver earnings distribution (avg earnings per caregiver)
- Platform take rate (commission percentage)
- Chargeback and refund analysis
- Payment failure rate
- Outstanding payouts

### 20.5 Safety & Quality Analytics
- Report volume trends (reports per week)
- Report category breakdown (safety, payment, harassment, etc.)
- Resolution time analysis (SLA compliance)
- Suspension/ban trends
- Review rating distribution (caregivers)
- Low-rating caregivers (quality intervention candidates)
- No-show rates (care receiver and caregiver)

### 20.6 Caregiver Performance Analytics
- Caregiver leaderboard (top-rated, most bookings, highest earnings)
- Acceptance rate distribution (identify low accepters)
- Response time distribution (identify slow responders)
- Profile view to booking conversion (profile effectiveness)
- Caregiver churn rate (inactive caregivers)

### 20.7 Care Receiver Insights
- Care receiver satisfaction (NPS surveys)
- Repeat booking rate (retention metric)
- Care receiver churn rate (inactive users)
- Avg bookings per care receiver (engagement)
- Preferred caregiver rate (loyalty to specific caregivers)

### 20.8 A/B Testing & Experimentation
- A/B testing framework for feature experimentation
- Test variants: Onboarding flow, pricing display, search algorithm, etc.
- Experiment tracking and analysis
- Statistical significance testing
- Winner declaration and rollout

### 20.9 Reporting & Exports
- Admin can export reports (CSV, PDF)
- Scheduled reports (weekly, monthly to stakeholders)
- Custom report builder (select metrics, date ranges, filters)
- Annual reports (board, investors, CQC)

### 20.10 Operational Dashboards
- Operations team dashboard (pending verifications, booking issues, disputes)
- Finance team dashboard (revenue, payouts, refunds)
- Safeguarding team dashboard (reports, incidents, high-risk users)
- Customer support dashboard (support tickets, response times)

---

## 21. Content Management & Education [TIER 1]

### 21.1 Public Website Content
- Homepage (value proposition, how it works, CTAs)
- How It Works (care receivers and caregivers)
- Pricing (transparent fee structure)
- Trust & Safety (verification, safeguarding commitments)
- For Caregivers (recruitment page)
- About Us
- Contact Us
- FAQs
- Blog (SEO content marketing, care tips, platform updates)
- Press & Media

### 21.2 SEO Optimization
- Meta titles and descriptions
- Sitemap.xml
- Robots.txt
- Schema.org markup (LocalBusiness, Service, FAQPage)
- Page load speed optimization
- Mobile-responsive design
- Local SEO (UK cities/regions)
- Backlink building
- Content marketing (blog articles, guides)

### 21.3 Educational Resources (Care Receivers & Families)
- Guides: "Choosing the Right Caregiver", "Preparing for Personal Care", "Live-In Care Arrangements"
- Condition-specific resources: "Caring for Someone with Dementia", "Parkinson's Care Tips"
- Video tutorials (how to use platform, safety tips)
- Downloadable PDFs (caregiver interview questions, care plan templates)

### 21.4 Caregiver Training Resources
- Safeguarding adults training (mandatory before activation)
- Medical condition awareness (Parkinson's, dementia, stroke, etc.)
- Personal care best practices
- Communication skills with elderly
- Emergency protocols
- First aid training resources
- CPR training resources
- Infection control (COVID-19 safety)

### 21.5 Help Center & Support Articles
- Knowledge base (searchable articles)
- Categories: Getting Started, Bookings, Payments, Safety, Account Settings
- Step-by-step guides with screenshots
- Video walkthroughs
- Common troubleshooting (login issues, payment failures, etc.)

### 21.6 Community Guidelines
- Code of conduct for care receivers and caregivers
- Respectful communication guidelines
- Prohibited behaviors (harassment, discrimination, off-platform payments)
- Consequences for violations
- How to report violations

### 21.7 Policy & Legal Documents
- Privacy Policy (GDPR-compliant)
- Terms of Service (care receivers and caregivers)
- Cookie Policy
- Acceptable Use Policy
- Safeguarding Policy
- Complaints Policy
- Cancellation & Refund Policy

### 21.8 Blog & Content Marketing
- Regular blog articles (weekly or bi-weekly)
- Topics: Elderly care tips, caregiver stories, platform updates, industry news
- Guest posts from healthcare professionals
- SEO-optimized articles (target keywords)
- Social media sharing

### 21.9 Platform Announcements
- In-app announcements (banner notifications)
- Email announcements (new features, policy changes)
- Platform update notes (release notes for users)

### 21.10 Feedback & Surveys
- User satisfaction surveys (NPS surveys quarterly)
- Feature request mechanism (users can suggest features)
- Bug reporting (users can report issues)
- User interviews (qualitative feedback)
- Feedback analysis and prioritization

---

## 22. Technical Infrastructure [TIER 1]

### 22.1 Database Architecture
- PostgreSQL (primary database for ACID compliance)
- Core tables:
  - users, profiles, caregivers, care_receivers, family_members
  - bookings, booking_notes, booking_cancellations
  - payments, payouts, refunds, transactions
  - messages, message_threads
  - reviews, ratings
  - reports, safeguarding_incidents
  - verifications, qualifications, medical_conditions, care_skills
  - audit_log
- Foreign key constraints enforced
- Indexes on frequently queried columns (email, postcode, created_at, user_id)
- Soft deletes for GDPR compliance
- Encrypted columns for sensitive data (tokenized by Stripe for payments)

### 22.2 API Architecture
- RESTful API (JSON responses)
- API versioning (/api/v1/)
- Authentication: JWT tokens or session cookies
- Rate limiting (100 requests/minute per user)
- Pagination (page/limit, max 100 per page)
- CORS (restrict to platform domain)
- Error responses (consistent JSON format with error codes)
- API documentation (Swagger/OpenAPI)

### 22.3 Authentication & Security
- Password hashing (bcrypt, cost factor 12)
- Session management (HTTP-only cookies, 30-day expiry)
- HTTPS enforced (all traffic encrypted)
- CSRF tokens on state-changing requests
- SQL injection prevention (parameterized queries)
- XSS prevention (input sanitization, output encoding)
- Security headers (HSTS, Content-Security-Policy)
- Penetration testing (annual)

### 22.4 File Storage
- AWS S3 or similar cloud storage
- Secure file upload (virus scanning)
- Encrypted at rest
- Access control (signed URLs for private files)
- File types: Images (profile photos), PDFs (qualifications, care plans), documents

### 22.5 Email Service
- Transactional email provider (SendGrid, AWS SES)
- Email templates (dynamic content)
- Deliverability monitoring
- Bounce and complaint handling
- Unsubscribe management
- Email tracking (open rates, click rates)

### 22.6 SMS Service
- SMS provider (Twilio)
- OTP verification
- Notification SMS
- Rate limiting (prevent abuse)
- SMS delivery confirmation

### 22.7 Payment Processing
- Stripe for payments (PCI DSS compliant)
- Stripe Connect for caregiver payouts
- 3D Secure (SCA) authentication
- Fraud detection (Stripe Radar)
- Webhook handling (payment events)

### 22.8 Geolocation Services
- Google Maps API or Mapbox
- Postcode to lat/long conversion
- Distance calculation (Haversine formula)
- Map rendering (caregiver locations)
- Geocoding (address to coordinates)

### 22.9 Real-Time Messaging Infrastructure
- WebSocket connection (Socket.io or similar)
- Fallback: Long polling (30-second intervals)
- Real-time booking request notifications
- Real-time message delivery
- Connection management (reconnection on disconnect)

### 22.10 Monitoring & Logging
- Application errors (Sentry or Rollbar)
- API performance monitoring (Datadog, New Relic)
- Uptime monitoring (Pingdom, UptimeRobot)
- Database performance monitoring
- User activity analytics (Google Analytics, Mixpanel)
- Application logs (info, warning, error levels)
- Log retention (90 days)
- Log redaction (no PII in logs)

### 22.11 Background Job Processing
- Job queue (Redis, Sidekiq, Bull)
- Async job processing (email sending, notifications, report generation)
- Scheduled jobs (cron jobs):
  - Verification expiry reminders (daily)
  - Booking reminders (hourly check)
  - Payout processing (daily)
  - Analytics aggregation (daily)
  - Cleanup tasks (old sessions, expired tokens)

### 22.12 Caching & Performance
- Redis for caching
- Cache frequently accessed data (user sessions, caregiver search results)
- Cache invalidation strategies
- CDN for static assets (images, CSS, JS)
- Database query optimization (indexes, query analysis)
- Lazy loading for images
- Code minification and bundling

### 22.13 Hosting & Infrastructure
- Cloud hosting (AWS, Google Cloud, Azure)
- Auto-scaling (handle traffic spikes)
- Load balancing (distribute traffic)
- Database replication (read replicas for scalability)
- Backup strategy (daily database backups, retained 30 days)
- Disaster recovery plan (RTO, RPO defined)

### 22.14 CI/CD Pipeline
- Continuous integration (automated testing on commits)
- Continuous deployment (automated deployment to staging/production)
- Code review process (pull requests)
- Automated testing (unit tests, integration tests, E2E tests)
- Test coverage (minimum 80%)

### 22.15 Development & Testing Environments
- Local development environment
- Staging environment (production-like)
- Production environment
- Environment-specific configurations
- Feature flags (gradual rollouts, A/B testing)

### 22.16 Accessibility & Internationalization
- WCAG 2.1 AA compliance
- Screen reader support (semantic HTML, ARIA labels)
- Keyboard navigation
- Color contrast (4.5:1 minimum)
- Font size (minimum 16px)
- Internationalization framework (i18n) for future language support
- UK locale (date formats, currency)

### 22.17 Mobile Responsiveness
- Mobile-first design
- Responsive breakpoints (320px, 768px, 1024px, 1440px)
- Touch-friendly UI (44px minimum tap targets)
- Mobile performance optimization
- Progressive Web App (PWA) capabilities

### 22.18 Third-Party Integrations
- Stripe (payments)
- Twilio (SMS)
- SendGrid/AWS SES (email)
- Onfido/Stripe Identity (identity verification)
- UKVI (right to work checks)
- Google Maps/Mapbox (geolocation)
- Analytics (Google Analytics, Mixpanel)
- Support (Intercom, Zendesk)

---

## System Dependencies & Integration Map

### Critical External Dependencies
1. **Stripe**: Payments, payouts, identity verification
2. **Email Provider**: Transactional and marketing emails
3. **SMS Provider**: OTP verification, urgent notifications
4. **Geolocation API**: Search, distance calculation, maps
5. **Identity Verification**: Automated ID checks (Onfido, Stripe Identity, Yoti)
6. **UKVI Online Service**: Right to work verification
7. **DBS Umbrella Organization**: Background checks (Trustid, UKCBC)

### Internal System Integrations
- User Management ↔ All Systems (authentication, permissions)
- Booking System ↔ Payment System (escrow, refunds)
- Booking System ↔ Calendar System (availability sync)
- Booking System ↔ Messaging System (communication per booking)
- Verification System ↔ Caregiver Profiles (capability unlocking)
- Safeguarding System ↔ Admin Operations (incident management)
- Audit System ↔ All Systems (comprehensive logging)
- Notification System ↔ All Systems (event-driven alerts)

---

## Key Architectural Principles

1. **Clinical Safety First**: Every feature designed with vulnerable adult protection as primary concern
2. **Compliance by Design**: GDPR, Care Act, CQC requirements baked into architecture
3. **Audit Everything**: Immutable audit trail for regulatory compliance and incident investigation
4. **Fail-Safe Mechanisms**: If system fails, fail towards safety (e.g., block bookings if verification expired)
5. **Caregiver Verification Rigor**: Multi-layered verification (identity, DBS, qualifications, references, insurance)
6. **Transparent Trust**: Clear badges, verification status, ratings visible to care receivers
7. **Escrow Protection**: Platform holds funds until care delivered, protecting both parties
8. **Emergency Preparedness**: 24/7 safeguarding hotline, emergency protocols, coordination with services
9. **Family Involvement**: Multi-user accounts reduce coercion risk, increase oversight
10. **Continuous Monitoring**: Behavioral pattern detection, re-verification cycles, ongoing safety checks

---

## Feature Completeness vs Phasing

This document represents the **complete feature set** for a fully-realized regulated elderly care marketplace. Implementation will naturally occur in phases, but every feature here is:

- **Necessary for the complete platform vision**
- **Justified by safety, compliance, or core value proposition**
- **Considered during initial architecture design** (even if built later)

Phasing decisions (MVP vs Phase 2) should be made separately based on:
- Legal requirements (must-have for launch)
- Safety requirements (cannot compromise)
- User feedback validation needs
- Technical complexity and risk
- Resource constraints

This feature map is intentionally comprehensive to ensure nothing critical is overlooked in the regulated care environment.

---

## Document Maintenance

This feature map should be updated when:
- New regulatory requirements emerge (CQC guidance changes, new laws)
- User research reveals critical unmet needs
- Safety incidents require new safeguards
- Technology capabilities enable new features (AI matching, predictive analytics)
- Competitive analysis identifies gaps

---

**Last Updated**: 2026-01-31
**Version**: 2.0 - Regulated Healthcare Marketplace Complete Feature Map
**Document Owner**: Product Team
**Review Cycle**: Quarterly, or as needed for regulatory changes

---

**END OF DOCUMENT**
