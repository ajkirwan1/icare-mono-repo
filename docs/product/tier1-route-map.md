# Tier 1 Route Map and Screen Inventory

**Document Purpose**: Complete route map and screen inventory for Tier 1 (Companionship Only) UK elderly care marketplace.

**Document Owner**: Product Team
**Created**: 2026-02-06
**Status**: CANONICAL
**Tier**: Tier 1 (Companionship MVP)

---

## Table of Contents

1. [Overview](#1-overview)
2. [Route Structure](#2-route-structure)
3. [Complete Route Table](#3-complete-route-table)
4. [Screen Inventory by Category](#4-screen-inventory-by-category)
5. [Navigation Structure](#5-navigation-structure)
6. [Role-Based Access Matrix](#6-role-based-access-matrix)
7. [Authentication Requirements](#7-authentication-requirements)
8. [URL Parameters](#8-url-parameters)
9. [Query Parameters](#9-query-parameters)
10. [Screen States](#10-screen-states)

---

## 1. Overview

### 1.1 Tier 1 Scope

This route map covers **Tier 1 (Companionship Only)** features:

**Services Enabled**:
- Companionship (conversation, activities)
- Light housework and cleaning
- Shopping and errands
- Meal preparation (no feeding assistance)
- Transportation (if caregiver has vehicle)

**Services NOT Available at Tier 1**:
- Personal care (washing, dressing, toileting) - Tier 2
- Medication assistance - Tier 2
- Overnight care - Tier 2
- Live-in care - Tier 3
- Medical condition-specific matching - Tier 3

**Verification at Tier 1**:
- Identity verification: MANDATORY
- Right to work verification: MANDATORY
- Phone verification: MANDATORY
- DBS checks: VOLUNTARY (companionship is not a regulated activity)

### 1.2 Document Sources

This route map is derived from:
- `/docs/ROADMAP.md` - Tier definitions (FDR-003)
- `/docs/tiers/tier1/planning/r0-launch-scope.md` - R0 launch-critical screens (30 screens)
- `/docs/tiers/tier1/planning/r1-launch-scope.md` - Full Tier 1 MVP (45 screens)
- `/docs/product/features/tier1-booking-specification.md` - Booking system
- `/docs/product/features/tier1-verification-specification.md` - Verification workflows
- `/docs/product/features/tier1-search-specification.md` - Search and discovery
- `/docs/product/features/tier1-messaging-specification.md` - Messaging system
- `/docs/product/features/tier1-admin-specification.md` - Admin dashboard
- `/docs/product/features/tier1-safeguarding-specification.md` - Safeguarding system
- `/docs/tiers/common/spec/feature-map.md` - Complete system overview

### 1.3 Total Screen Count

| Release | Screen Count | Purpose |
|---------|--------------|---------|
| **R0** | 30 screens | Launch-critical minimum |
| **R1** | 47 screens | Full Tier 1 MVP |

---

## 2. Route Structure

### 2.1 Route Hierarchy

```
/                                    (Public Homepage)
│
├── /register                        (Registration flows)
│   ├── /care-receiver
│   ├── /family
│   └── /caregiver
│
├── /login                           (Authentication)
├── /forgot-password
├── /verify                          (Verification flows)
│
├── /search                          (Discovery)
├── /caregivers/:id                  (Caregiver profiles)
│
├── /dashboard                       (Care Receiver)
│   ├── /bookings
│   ├── /messages
│   ├── /profile
│   └── /settings
│
├── /caregiver                       (Caregiver Dashboard)
│   ├── /dashboard
│   ├── /onboarding
│   ├── /profile
│   ├── /bookings
│   ├── /earnings
│   ├── /availability
│   └── /verify
│
├── /bookings/:id                    (Shared booking detail)
│   ├── /new/:caregiverId
│   ├── /cancel
│   └── /review
│
├── /messages                        (Messaging)
│   └── /:conversationId
│
├── /admin                           (Admin Dashboard)
│   ├── /dashboard
│   ├── /verifications
│   ├── /bookings
│   ├── /users
│   ├── /safeguarding
│   ├── /disputes
│   └── /analytics
│
└── /legal                           (Compliance pages)
    ├── /terms
    ├── /privacy
    ├── /safeguarding-policy
    └── /how-it-works
```

---

## 3. Complete Route Table

### 3.1 Public & Authentication Routes (R0)

| Screen ID | Screen Name | Route | Access | R0/R1 | Feature Reference |
|-----------|-------------|-------|--------|-------|-------------------|
| **SCR-PUB-001** | Homepage | `/` | Public | R0 | Search spec |
| **SCR-PUB-002** | How It Works - Families | `/how-it-works/families` | Public | R1 | Marketing |
| **SCR-PUB-003** | How It Works - Caregivers | `/how-it-works/caregivers` | Public | R1 | Marketing |
| **SCR-PUB-006** | Terms of Service | `/terms` | Public | R0 | Legal |
| **SCR-PUB-007** | Privacy Policy | `/privacy` | Public | R0 | Legal |
| **SCR-PUB-008** | Safeguarding Policy | `/safeguarding-policy` | Public | R0 | Safeguarding spec |
| **SCR-AUTH-001** | Care Receiver Registration | `/register/care-receiver` | Public | R0 | Feature map 1.1 |
| **SCR-AUTH-002** | Family Member Registration | `/register/family` | Public | R0 | Feature map 1.2 |
| **SCR-AUTH-003** | Caregiver Registration | `/register/caregiver` | Public | R0 | Feature map 1.3 |
| **SCR-AUTH-004** | Phone Verification | `/verify/phone` | Public | R0 | Feature map 1.4 |
| **SCR-AUTH-005** | Login | `/login` | Public | R0 | Feature map 1.5 |
| **SCR-AUTH-006** | Password Reset Request | `/forgot-password` | Public | R0 | Feature map 1.6 |

### 3.2 Search & Discovery Routes (R0)

| Screen ID | Screen Name | Route | Access | R0/R1 | Feature Reference |
|-----------|-------------|-------|--------|-------|-------------------|
| **SCR-CR-003** | Caregiver Search | `/search` | Authenticated | R0 | Search spec 4.1-4.4 |
| **SCR-CR-005** | Caregiver Profile (Public View) | `/caregivers/:caregiverId` | Authenticated | R0 | Search spec 5.1-5.4 |

### 3.3 Booking Routes (R0)

| Screen ID | Screen Name | Route | Access | R0/R1 | Feature Reference |
|-----------|-------------|-------|--------|-------|-------------------|
| **SCR-CR-006** | Booking Request Form | `/bookings/new/:caregiverId` | Family | R0 | Booking spec 3.1 |
| **SCR-CR-008** | Booking Detail | `/bookings/:bookingId` | Family/Caregiver | R0 | Booking spec 3.3 |
| **SCR-CR-009** | Booking Cancellation | `/bookings/:bookingId/cancel` | Family/Caregiver | R1 | Booking spec 3.5 |
| **SCR-CR-015** | Leave Review | `/bookings/:bookingId/review` | Family | R0 | Booking spec, Review system |
| **SCR-CG-013** | Booking Request Detail (Caregiver) | `/caregiver/bookings/:bookingId` | Caregiver | R0 | Booking spec 3.2 |

### 3.4 Payment Routes (R0)

| Screen ID | Screen Name | Route | Access | R0/R1 | Feature Reference |
|-----------|-------------|-------|--------|-------|-------------------|
| **SCR-CR-013** | Payment Methods | `/settings/payment` | Family | R0 | Feature map 7.1 |
| **SCR-CG-020** | Payout Setup (Stripe Connect) | `/caregiver/earnings/setup` | Caregiver | R0 | Feature map 7.4 |

### 3.5 Messaging Routes (R0/R1)

| Screen ID | Screen Name | Route | Access | R0/R1 | Feature Reference |
|-----------|-------------|-------|--------|-------|-------------------|
| **SCR-CR-011** | Message Thread | `/messages/:conversationId` | Family/Caregiver | R0 | Messaging spec 4.4-4.6 |
| **SCR-CR-012** | Message Inbox | `/messages` | Family/Caregiver | R1 | Messaging spec 4.1-4.3 |

### 3.6 Care Receiver Dashboard Routes (R0/R1)

| Screen ID | Screen Name | Route | Access | R0/R1 | Feature Reference |
|-----------|-------------|-------|--------|-------|-------------------|
| **SCR-CR-001** | Care Receiver Dashboard | `/dashboard` | Family | R0 | Feature map 18 |
| **SCR-CR-002** | Care Needs Profile | `/profile/care-needs` | Family | R1 | Feature map 18 |
| **SCR-CR-017** | Account Settings | `/settings` | Family | R1 | Feature map 1 |
| **SCR-CR-020** | Safeguarding Report | `/report/safeguarding` | Family | R1 | Safeguarding spec 5.1 |

### 3.7 Caregiver Onboarding & Verification Routes (R0)

| Screen ID | Screen Name | Route | Access | R0/R1 | Feature Reference |
|-----------|-------------|-------|--------|-------|-------------------|
| **SCR-CG-002** | Caregiver Onboarding | `/caregiver/onboarding` | Caregiver | R0 | Verification spec 7.1 |
| **SCR-CG-008** | Identity Verification | `/caregiver/verify/identity` | Caregiver | R0 | Verification spec 4.1 |
| **SCR-CG-009** | Right to Work Verification | `/caregiver/verify/right-to-work` | Caregiver | R0 | Verification spec 5.1 |
| **SCR-CG-010** | DBS Check Submission (Voluntary) | `/caregiver/verify/dbs` | Caregiver | R0 | Verification spec 6.1 |

### 3.8 Caregiver Dashboard Routes (R0/R1)

| Screen ID | Screen Name | Route | Access | R0/R1 | Feature Reference |
|-----------|-------------|-------|--------|-------|-------------------|
| **SCR-CG-001** | Caregiver Dashboard | `/caregiver/dashboard` | Caregiver | R0 | Feature map 17 |
| **SCR-CG-003** | Profile Management | `/caregiver/profile/edit` | Caregiver | R1 | Verification spec 7.3 |
| **SCR-CG-011** | Availability Calendar | `/caregiver/availability` | Caregiver | R1 | Feature map 15.2 |
| **SCR-CG-015** | Earnings Dashboard | `/caregiver/earnings` | Caregiver | R1 | Feature map 7.5 |
| **SCR-CG-016** | Payout History | `/caregiver/earnings/history` | Caregiver | R1 | Feature map 7.5 |

### 3.9 Admin Routes (R0)

| Screen ID | Screen Name | Route | Access | R0/R1 | Feature Reference |
|-----------|-------------|-------|--------|-------|-------------------|
| **SCR-ADM-001** | Admin Dashboard | `/admin` | Admin | R0 | Admin spec 4.1 |
| **SCR-ADM-005** | Caregiver Application Review | `/admin/applications/:applicationId` | Admin | R0 | Admin spec 2.1 |
| **SCR-ADM-007** | Verification Review | `/admin/verifications/:verificationId` | Admin | R0 | Admin spec 2.1 |
| **SCR-ADM-008** | DBS Review | `/admin/verifications/dbs/:verificationId` | Admin | R0 | Admin spec 2.1 |
| **SCR-ADM-010** | Booking Management | `/admin/bookings` | Admin | R1 | Admin spec 2.3 |
| **SCR-ADM-012** | Dispute Queue | `/admin/disputes` | Admin | R1 | Admin spec 2.3 |
| **SCR-ADM-014** | Safeguarding Reports Queue | `/admin/safeguarding` | Admin | R0 | Safeguarding spec 3.2 |
| **SCR-ADM-015** | Safeguarding Report Detail | `/admin/safeguarding/:reportId` | Admin | R0 | Safeguarding spec 3.2 |
| **SCR-ADM-016** | User Detail View | `/admin/users/:userId` | Admin | R1 | Admin spec 2.2 |
| **SCR-ADM-019** | Incident Reports | `/admin/incidents` | Admin | R1 | Admin spec 2.4 |
| **SCR-ADM-020** | Analytics Dashboard | `/admin/analytics` | Admin | R1 | Admin spec 9 |
| **SCR-ADM-023** | Audit Log | `/admin/audit` | Admin | R1 | Admin spec 10 |

---

## 4. Screen Inventory by Category

### 4.1 Authentication & Registration (6 screens - R0)

#### SCR-AUTH-001: Care Receiver Registration
- **Route**: `/register/care-receiver`
- **Access**: Public
- **Purpose**: Enable care receivers (65+) to create accounts
- **R0/R1**: R0 (launch-critical)
- **Key States**: Form entry, email sent, email verified, account created
- **Components**: Email/password form, age verification, emergency contact capture, GDPR consent
- **Navigation**: → Phone verification → Dashboard
- **Preconditions**: None
- **Feature Reference**: Feature map 1.1
- **Data Sensitivity**: High (email, DOB, emergency contact)

#### SCR-AUTH-002: Family Member Registration
- **Route**: `/register/family`
- **Access**: Public
- **Purpose**: Enable family members to register on behalf of care receiver
- **R0/R1**: R0 (safeguarding critical - proxy users essential)
- **Key States**: Form entry, relationship verification, care receiver consent documented, account created
- **Components**: Name/email/phone form, relationship to care receiver field, care receiver details, consent checkbox
- **Navigation**: → Phone verification → Link to care receiver account → Dashboard
- **Preconditions**: None
- **Feature Reference**: Feature map 1.2
- **Data Sensitivity**: High (care receiver details, relationship)

#### SCR-AUTH-003: Caregiver Registration
- **Route**: `/register/caregiver`
- **Access**: Public
- **Purpose**: Enable professional caregivers to create accounts
- **R0/R1**: R0 (supply-side critical)
- **Key States**: Form entry, email verified, phone verified, account created (pending verification)
- **Components**: Name/email/phone form, postcode, hourly rate, services offered (companionship only at T1), bank account connection prompt, self-employed status acknowledgment
- **Navigation**: → Phone verification → Caregiver onboarding wizard
- **Preconditions**: None
- **Feature Reference**: Feature map 1.3
- **Data Sensitivity**: High (contact info, bank details)

#### SCR-AUTH-004: Phone Verification
- **Route**: `/verify/phone`
- **Access**: Public (post-registration)
- **Purpose**: Verify phone number via SMS OTP to prevent fraud
- **R0/R1**: R0 (safeguarding critical)
- **Key States**: OTP sent, OTP entered, verification success, verification failed (retry), max attempts reached
- **Components**: Phone number display, OTP input (6 digits), resend button, countdown timer, verify button
- **Navigation**: → Registration success → User type-specific dashboard
- **Preconditions**: User registered with email
- **Feature Reference**: Feature map 1.4
- **Data Sensitivity**: Medium (phone number)

#### SCR-AUTH-005: Login
- **Route**: `/login`
- **Access**: Public
- **Purpose**: Authenticate existing users
- **R0/R1**: R0 (access critical)
- **Key States**: Form entry, authenticating, login success, login failed (invalid credentials), account locked
- **Components**: Email/password form, "Remember me" checkbox, "Forgot password" link, login button, 2FA prompt (if enabled)
- **Navigation**: → User type-specific dashboard OR 2FA screen
- **Preconditions**: User has registered account
- **Feature Reference**: Feature map 1.5
- **Data Sensitivity**: High (credentials, session creation)

#### SCR-AUTH-006: Password Reset Request
- **Route**: `/forgot-password`
- **Access**: Public
- **Purpose**: Allow users to reset forgotten passwords
- **R0/R1**: R0 (high volume - elderly users forget passwords)
- **Key States**: Email entry, reset email sent, email link clicked, new password set, success
- **Components**: Email input field, submit button, confirmation message, link expiry notice (1 hour)
- **Navigation**: → Email sent confirmation → Password reset form (from email link) → Login
- **Preconditions**: User has registered email
- **Feature Reference**: Feature map 1.6
- **Data Sensitivity**: High (account security)

---

### 4.2 Public & Compliance Pages (4 screens - R0)

#### SCR-PUB-001: Homepage
- **Route**: `/`
- **Access**: Public
- **Purpose**: Primary entry point explaining platform and driving registration
- **R0/R1**: R0 (user acquisition critical)
- **Key States**: Default view, logged-in view (redirect to dashboard)
- **Components**: Hero section (search form teaser), value proposition, how it works summary, caregiver testimonials, CTA buttons (Find Care, Become a Caregiver), trust signals (verification badges)
- **Navigation**: → Search (if logged in), → Registration flows, → How it works pages
- **Preconditions**: None
- **Feature Reference**: Search spec
- **Data Sensitivity**: Low (public marketing content)

#### SCR-PUB-006: Terms of Service
- **Route**: `/terms`
- **Access**: Public
- **Purpose**: Display legally required Terms of Service
- **R0/R1**: R0 (regulatory compliance - Consumer Rights Act)
- **Key States**: Default view
- **Components**: Full terms text, last updated date, table of contents (for long terms), acceptance requirement noted, Introduction Agency model clarified, self-employed caregiver status
- **Navigation**: → Homepage, → Registration (linked from registration forms)
- **Preconditions**: None
- **Feature Reference**: Legal compliance
- **Data Sensitivity**: Low (public legal document)

#### SCR-PUB-007: Privacy Policy
- **Route**: `/privacy`
- **Access**: Public
- **Purpose**: Display GDPR-compliant privacy policy
- **R0/R1**: R0 (regulatory compliance - GDPR Article 13)
- **Key States**: Default view
- **Components**: Full privacy policy text, data collection details, data retention periods, user rights (access, erasure, portability), contact details for DPO, cookie policy reference, lawful basis explanations
- **Navigation**: → Homepage, → GDPR subject access request form
- **Preconditions**: None
- **Feature Reference**: Legal compliance
- **Data Sensitivity**: Low (public legal document)

#### SCR-PUB-008: Safeguarding Policy
- **Route**: `/safeguarding-policy`
- **Access**: Public
- **Purpose**: Display Care Act 2014-aligned safeguarding policy
- **R0/R1**: R0 (regulatory compliance - Care Act 2014)
- **Key States**: Default view
- **Components**: Safeguarding principles, reporting mechanisms, incident response procedures, external escalation protocols, safeguarding officer contact, Care Act 2014 duty explanation
- **Navigation**: → Homepage, → Safeguarding report form
- **Preconditions**: None
- **Feature Reference**: Safeguarding spec
- **Data Sensitivity**: Low (public policy document)

---

### 4.3 Search & Discovery (2 screens - R0)

#### SCR-CR-003: Caregiver Search
- **Route**: `/search`
- **Access**: Authenticated (Family)
- **Purpose**: Primary discovery mechanism - find suitable caregivers
- **R0/R1**: R0 (core economic loop)
- **Key States**: Initial search (postcode entry), results loading, results displayed, no results, filters applied, sorted
- **Components**: Postcode input + radius selector, filter sidebar (service type, rate range, availability, languages, gender, DBS verified), sort dropdown (distance, rating, price), result cards (12 per page), pagination, map view toggle
- **Navigation**: → Caregiver profile (click card), → Booking request form (direct CTA on card), → Filters refinement
- **Preconditions**: User authenticated as Family/Care Receiver
- **Feature Reference**: Search spec 4.1-4.4
- **Data Sensitivity**: Medium (user search behavior tracked)

#### SCR-CR-005: Caregiver Profile (Public View)
- **Route**: `/caregivers/:caregiverId`
- **Access**: Authenticated (Family)
- **Purpose**: Detailed caregiver profile for evaluation before booking
- **R0/R1**: R0 (trust and decision-making critical)
- **Key States**: Profile loading, profile displayed, verification status visible, availability calendar displayed, reviews loaded
- **Components**: Profile header (photo, name, verification badges, rating, rate), about me (bio, experience, languages, interests), services offered (companionship only at T1), availability calendar (visual), verification details (ID verified date, DBS status), reviews section (recent reviews, rating distribution), CTA button (Request Booking)
- **Navigation**: → Booking request form, → Back to search, → Message caregiver (post-booking request)
- **Preconditions**: Caregiver profile approved by admin
- **Feature Reference**: Search spec 5.1-5.4
- **Data Sensitivity**: Medium (caregiver profile data)

---

### 4.4 Booking System (5 screens - 2 R0, 3 R1)

#### SCR-CR-006: Booking Request Form
- **Route**: `/bookings/new/:caregiverId`
- **Access**: Authenticated (Family)
- **Purpose**: Create booking request for companionship services
- **R0/R1**: R0 (core economic loop)
- **Key States**: Form entry, date/time selection, price calculation, payment authorization pending, payment authorized, booking request sent
- **Components**: Caregiver summary (photo, name, rate), date picker (from caregiver availability), time picker, duration selector (min 2h, max 8h), service type checkboxes (companionship, light housework, shopping, meal prep, transportation), special requests field (500 chars), emergency contact (auto-populated), price breakdown (rate × duration + platform fee), cancellation policy display, payment method selector, payment authorization button, confirm booking button
- **Navigation**: → Booking detail page (after submission), → Payment method setup (if not added)
- **Preconditions**: User has payment method added, caregiver available on selected date
- **Feature Reference**: Booking spec 3.1
- **Data Sensitivity**: High (payment authorization, booking details)

#### SCR-CR-008: Booking Detail
- **Route**: `/bookings/:bookingId`
- **Access**: Authenticated (Family/Caregiver)
- **Purpose**: Central page for booking management across lifecycle
- **R0/R1**: R0 (booking management critical)
- **Key States**: Requested (awaiting caregiver response), accepted (confirmed), in_progress (session ongoing), completed (awaiting confirmation), payment_released (payout processed), cancelled, disputed, no_show, reviewed
- **Components**: Booking status banner, care receiver/caregiver details (shared after acceptance), date/time/duration, service types, special requests, emergency contact (shared after acceptance), message caregiver button, cancel booking button (if before start), confirm completion button (care receiver), mark complete button (caregiver), raise dispute button (if within 48h window), review prompt (after completion)
- **Navigation**: → Message thread, → Cancellation screen, → Review form, → Dispute form
- **Preconditions**: Booking exists and user is party to booking
- **Feature Reference**: Booking spec 3.3
- **Data Sensitivity**: High (booking details, contact info shared)

#### SCR-CR-009: Booking Cancellation (R1)
- **Route**: `/bookings/:bookingId/cancel`
- **Access**: Authenticated (Family/Caregiver)
- **Purpose**: Self-service cancellation with refund calculation
- **R0/R1**: R1 (manual admin workaround acceptable at R0)
- **Key States**: Cancellation form, refund calculated, cancellation confirmed, refund processing
- **Components**: Cancellation policy display (48h+, 24-48h, <24h refund rules), refund amount display, cancellation reason dropdown (schedule change, no longer needed, emergency, other), additional details field (optional), confirm cancellation button
- **Navigation**: → Booking detail page (cancellation confirmed), → Dashboard
- **Preconditions**: Booking in requested/accepted status, before start time
- **Feature Reference**: Booking spec 3.5
- **Data Sensitivity**: High (refund processing)

#### SCR-CR-015: Leave Review (R0)
- **Route**: `/bookings/:bookingId/review`
- **Access**: Authenticated (Family)
- **Purpose**: Self-service review submission (quality feedback loop)
- **R0/R1**: R0 (critical for trust and caregiver reputation)
- **Key States**: Form entry, review submitted, review visible on caregiver profile
- **Components**: Star rating selector (1-5 stars), written review textarea (500 chars max), tags/checkboxes (punctual, friendly, reliable, professional), submit button
- **Navigation**: → Booking detail page, → Caregiver profile (review now visible)
- **Preconditions**: Booking status = completed or payment_released, within 14-day review window
- **Feature Reference**: Booking spec, Feature map 8.1
- **Data Sensitivity**: Medium (review content)

#### SCR-CG-013: Booking Request Detail (Caregiver View) (R0)
- **Route**: `/caregiver/bookings/:bookingId`
- **Access**: Authenticated (Caregiver)
- **Purpose**: Caregiver reviews booking request and accepts/declines
- **R0/R1**: R0 (supply-side decision critical)
- **Key States**: New request (countdown timer), accepted (confirmed), declined, expired (no response after 24h)
- **Components**: Care receiver name and profile summary, date/time/duration, location (postcode with distance), service types requested, special requests, earnings breakdown (rate × duration - commission), 24-hour countdown timer, accept button, decline button, decline reason dropdown (scheduling conflict, too far, outside scope, rate too low, other), optional decline message field
- **Navigation**: → Accepted bookings list, → Declined bookings history
- **Preconditions**: Booking request sent to caregiver
- **Feature Reference**: Booking spec 3.2
- **Data Sensitivity**: High (care receiver details shared after acceptance)

---

### 4.5 Payment System (2 screens - R0)

#### SCR-CR-013: Payment Methods
- **Route**: `/settings/payment`
- **Access**: Authenticated (Family)
- **Purpose**: Manage payment methods for bookings
- **R0/R1**: R0 (revenue critical)
- **Key States**: No payment method added, payment method(s) added, default method selected, card expired
- **Components**: Saved cards list (last 4 digits, expiry date), add new card button (Stripe Elements), set as default button, remove card button, card expiry warning banner (if <30 days)
- **Navigation**: → Add card (Stripe Elements modal), → Dashboard, → Booking request form (if adding during booking)
- **Preconditions**: User authenticated as Family/Care Receiver
- **Feature Reference**: Feature map 7.1
- **Data Sensitivity**: High (payment card details via Stripe)

#### SCR-CG-020: Payout Setup (Stripe Connect)
- **Route**: `/caregiver/earnings/setup`
- **Access**: Authenticated (Caregiver)
- **Purpose**: Connect bank account for receiving payouts
- **R0/R1**: R0 (supply-side revenue critical)
- **Key States**: Bank account not connected, Stripe Connect flow initiated, bank account verified, payout account active, account verification failed (retry)
- **Components**: Stripe Connect onboarding iframe, bank details form (sort code, account number), account verification status, KYC requirements notice (Stripe handles), expected payout timeline display (2-3 business days), help text for self-employed caregivers
- **Navigation**: → Earnings dashboard (after setup), → Caregiver onboarding (if during setup)
- **Preconditions**: Caregiver account created, identity verification pending/complete
- **Feature Reference**: Feature map 7.4
- **Data Sensitivity**: High (bank account details via Stripe)

---

### 4.6 Messaging System (2 screens - R0/R1)

#### SCR-CR-011: Message Thread (R0)
- **Route**: `/messages/:conversationId`
- **Access**: Authenticated (Family/Caregiver)
- **Purpose**: Full conversation history and messaging interface
- **R0/R1**: R0 (critical for pre-booking communication and booking coordination)
- **Key States**: Messages loaded, typing indicator (real-time), message sent, message delivery failed
- **Components**: Message history (oldest first, infinite scroll/pagination), send message form (textarea, 2000 char limit), booking details sidebar (date, caregiver/care receiver info), report conversation button, profanity/contact info filter active (auto-redaction notice)
- **Navigation**: → Message inbox, → Booking detail page, → Report conversation form
- **Preconditions**: Conversation exists (booking request sent creates conversation)
- **Feature Reference**: Messaging spec 4.4-4.6
- **Data Sensitivity**: High (message content)

#### SCR-CR-012: Message Inbox (R1)
- **Route**: `/messages`
- **Access**: Authenticated (Family/Caregiver)
- **Purpose**: Centralized messaging (better than scattered email at scale)
- **R0/R1**: R1 (email acceptable at R0 low volume)
- **Key States**: No messages, messages loaded, unread messages highlighted, conversation selected
- **Components**: Conversation list (sorted by recency), unread indicator badges, booking context per conversation (date, caregiver name), quick reply preview, search conversations field
- **Navigation**: → Message thread (click conversation), → Booking detail page (via context link)
- **Preconditions**: User has at least one booking request sent/received
- **Feature Reference**: Messaging spec 4.1-4.3
- **Data Sensitivity**: High (message content, conversation history)

---

### 4.7 Caregiver Onboarding & Verification (4 screens - R0)

#### SCR-CG-002: Caregiver Onboarding
- **Route**: `/caregiver/onboarding`
- **Access**: Authenticated (Caregiver)
- **Purpose**: Guided onboarding wizard ensuring verification completion
- **R0/R1**: R0 (supply-side quality critical)
- **Key States**: Step 1 (Profile photo & bio), Step 2 (Services & rate), Step 3 (Availability), Step 4 (Bank account), Step 5 (Verification documents), onboarding complete (pending admin approval)
- **Components**: Progress indicator (5 steps), profile photo upload, bio textarea (min 100 chars), service type checkboxes (companionship only at T1), hourly rate input (10-100 GBP), weekly availability calendar, Stripe Connect bank setup link, identity verification upload prompt, right to work verification prompt, voluntary DBS upload prompt, save & continue button, skip for now option (availability, bank can be added later)
- **Navigation**: → Identity verification screen, → Right to work screen, → DBS screen, → Dashboard (after completion)
- **Preconditions**: Caregiver account created, phone verified
- **Feature Reference**: Verification spec 7.1
- **Data Sensitivity**: High (profile data, documents)

#### SCR-CG-008: Identity Verification (Caregiver)
- **Route**: `/caregiver/verify/identity`
- **Access**: Authenticated (Caregiver)
- **Purpose**: Upload government ID and selfie for identity verification
- **R0/R1**: R0 (safeguarding critical)
- **Key States**: Document upload pending, document uploaded (awaiting Stripe Identity), Stripe Identity result (success/failed), admin manual review pending, verification approved, verification rejected (resubmission required)
- **Components**: Stripe Identity iframe (automated ID verification), ID document upload (passport/driving license), selfie upload (liveness check), photo guidelines, upload progress indicator, verification status display, estimated review time (24-48h), resubmission option (if rejected)
- **Navigation**: → Onboarding wizard (next step), → Admin review queue (backend), → Dashboard (verification complete)
- **Preconditions**: Caregiver onboarding initiated
- **Feature Reference**: Verification spec 4.1-4.2
- **Data Sensitivity**: High (ID documents, selfie photo)

#### SCR-CG-009: Right to Work Verification
- **Route**: `/caregiver/verify/right-to-work`
- **Access**: Authenticated (Caregiver)
- **Purpose**: Verify legal right to work in UK (Immigration Act compliance)
- **R0/R1**: R0 (legal compliance critical)
- **Key States**: UK passport (auto-approved), non-UK passport (UKVI share code required), share code submitted (admin check pending), verification approved, verification failed (visa expired/no work permission)
- **Components**: Nationality selector, UK passport auto-approval notice, UKVI share code input field (non-UK nationals), date of birth input, link to UKVI online service (guidance), visa type display (after admin check), visa expiry date display, work restrictions notice (if applicable), resubmit button (if rejected)
- **Navigation**: → Onboarding wizard (next step), → Dashboard (verification complete)
- **Preconditions**: Identity verification complete or pending
- **Feature Reference**: Verification spec 5.1-5.3
- **Data Sensitivity**: High (immigration status, visa details)

#### SCR-CG-010: DBS Check Submission (Voluntary)
- **Route**: `/caregiver/verify/dbs`
- **Access**: Authenticated (Caregiver)
- **Purpose**: Voluntary DBS submission for "DBS Verified" badge (trust signal)
- **R0/R1**: R0 (competitive advantage for caregivers)
- **Key States**: No DBS uploaded (optional skip), DBS certificate uploaded (admin review pending), DBS verified (badge awarded), DBS rejected (expired/name mismatch), certificate expiry warning (>3 years old)
- **Components**: "Why upload DBS?" explanation ("Stand out to families, prepare for Tier 2 personal care"), DBS certificate upload (PDF/image), certificate number input, issue date input, DBS level selector (Basic/Standard/Enhanced), DBS Update Service checkbox (if subscribed), upload guidelines, estimated review time (48h), verification status display, "DBS Verified" badge preview
- **Navigation**: → Onboarding wizard (next step/skip), → Dashboard (verification complete)
- **Preconditions**: Identity verification complete
- **Feature Reference**: Verification spec 6.1-6.4
- **Data Sensitivity**: High (DBS certificate = criminal conviction data)

---

### 4.8 Care Receiver Dashboard (4 screens - R0/R1)

#### SCR-CR-001: Care Receiver Dashboard (R0)
- **Route**: `/dashboard`
- **Access**: Authenticated (Family)
- **Purpose**: Central navigation hub for care receivers
- **R0/R1**: R0 (critical for user orientation and booking management)
- **Key States**: Default view, upcoming bookings visible, recent messages indicator
- **Components**: Upcoming bookings summary (next 3 bookings), recent messages indicator (unread count), quick actions (Search, Book, Message), account status, booking history link
- **Navigation**: → Search, → Booking detail, → Messages, → Account settings, → Care needs profile
- **Preconditions**: User authenticated as Family/Care Receiver
- **Feature Reference**: Feature map 18
- **Data Sensitivity**: Medium (personal dashboard)

#### SCR-CR-002: Care Needs Profile (R1)
- **Route**: `/profile/care-needs`
- **Access**: Authenticated (Family)
- **Purpose**: Save care receiver needs (avoid re-entry each booking)
- **R0/R1**: R1 (needs captured in booking form at R0)
- **Key States**: Profile empty (first visit), profile saved, profile updated
- **Components**: Preferred services checkboxes (companionship, housework, shopping, meal prep), preferred times selector (morning/afternoon/evening), special considerations textarea (mobility aids, pets, access instructions), emergency contact details (auto-populated), save profile button
- **Navigation**: → Dashboard, → Booking request form (pre-fills from profile)
- **Preconditions**: User authenticated as Family/Care Receiver
- **Feature Reference**: Feature map 18
- **Data Sensitivity**: High (care needs)

#### SCR-CR-017: Account Settings (R1)
- **Route**: `/settings`
- **Access**: Authenticated (Family)
- **Purpose**: Self-service account management
- **R0/R1**: R1 (support handles changes at R0)
- **Key States**: Default view, editing personal details, password change modal, notification preferences updated
- **Components**: Personal details form (name, email, phone), password change section (current password, new password), notification preferences (email, SMS), payment methods link, delete account button (GDPR), save changes button
- **Navigation**: → Payment methods screen, → Dashboard
- **Preconditions**: User authenticated
- **Feature Reference**: Feature map 1
- **Data Sensitivity**: High (personal details, password change)

#### SCR-CR-020: Safeguarding Report (R1)
- **Route**: `/report/safeguarding`
- **Access**: Authenticated (Family)
- **Purpose**: Self-service safeguarding concern reporting
- **R0/R1**: R1 (email/phone reporting acceptable at R0)
- **Key States**: Form entry, report submitted, case number assigned, acknowledgment displayed
- **Components**: Incident type dropdown (physical abuse, emotional abuse, sexual abuse, financial abuse, neglect, other), severity selector (urgent/non-urgent), description textarea (min 50 chars), date/time of incident, evidence upload (photos, documents), emergency guidance ("If immediate danger, call 999"), submit button
- **Navigation**: → Dashboard, → Safeguarding policy page
- **Preconditions**: User authenticated
- **Feature Reference**: Safeguarding spec 5.1
- **Data Sensitivity**: High (safeguarding report = special category data)

---

### 4.9 Caregiver Dashboard (6 screens - R0/R1)

#### SCR-CG-001: Caregiver Dashboard (R0)
- **Route**: `/caregiver/dashboard`
- **Access**: Authenticated (Caregiver)
- **Purpose**: Central hub for active caregivers
- **R0/R1**: R0 (critical for booking requests and supply-side engagement)
- **Key States**: Default view, pending booking requests visible, upcoming bookings displayed
- **Components**: Pending booking requests widget (count + countdown timers), upcoming bookings summary (next 3), earnings summary (this month, pending payouts), profile completion status bar (if <100%), verification status badges, profile visibility toggle (active/inactive), quick actions (Manage availability, View earnings)
- **Navigation**: → Booking requests, → Upcoming bookings, → Earnings dashboard, → Profile management, → Availability calendar
- **Preconditions**: Caregiver account created
- **Feature Reference**: Feature map 17
- **Data Sensitivity**: Medium (personal dashboard)

#### SCR-CG-003: Profile Management (R1)
- **Route**: `/caregiver/profile/edit`
- **Access**: Authenticated (Caregiver)
- **Purpose**: Self-service profile updates
- **R0/R1**: R1 (support handles edits at R0)
- **Key States**: Editing profile, profile saved, profile changes pending admin review (if significant changes)
- **Components**: Profile photo upload/change, bio textarea (max 500 chars), services offered checkboxes (companionship only at T1), hourly rate input (10-100 GBP), languages spoken selector, interests/hobbies textarea, transportation checkbox (has vehicle), save profile button
- **Navigation**: → Dashboard, → Preview public profile
- **Preconditions**: Caregiver account created
- **Feature Reference**: Verification spec 7.3
- **Data Sensitivity**: Medium (profile data)

#### SCR-CG-011: Availability Calendar (R1)
- **Route**: `/caregiver/availability`
- **Access**: Authenticated (Caregiver)
- **Purpose**: Visual availability management
- **R0/R1**: R1 (manual email coordination at R0)
- **Key States**: Calendar default view (week), recurring availability set, one-off availability added, unavailable dates blocked
- **Components**: Weekly calendar view, drag-to-select time blocks, recurring pattern button (e.g., "Set Mon-Fri 9am-5pm"), add one-off availability button, block dates button (holidays), booked slots displayed (read-only, gray), save availability button
- **Navigation**: → Dashboard, → Booking requests (check conflicting bookings)
- **Preconditions**: Caregiver account created
- **Feature Reference**: Feature map 15.2
- **Data Sensitivity**: Low (availability schedule)

#### SCR-CG-015: Earnings Dashboard (R1)
- **Route**: `/caregiver/earnings`
- **Access**: Authenticated (Caregiver)
- **Purpose**: Earnings visibility and payout tracking
- **R0/R1**: R1 (email notifications acceptable at R0)
- **Key States**: Default view, payouts pending, payouts processing, payouts completed
- **Components**: Total earnings summary (month, all-time), pending payouts table (awaiting completion confirmation), processing payouts table (in transit to bank), completed payouts table (received), booking earnings breakdown (per booking), platform commission display (transparent), download earnings report button (CSV)
- **Navigation**: → Payout history, → Booking detail (click booking), → Tax guidance link
- **Preconditions**: Caregiver has completed at least one booking
- **Feature Reference**: Feature map 7.5
- **Data Sensitivity**: High (financial data)

#### SCR-CG-016: Payout History (R1)
- **Route**: `/caregiver/earnings/history`
- **Access**: Authenticated (Caregiver)
- **Purpose**: Historical payout records (tax purposes)
- **R0/R1**: R1 (Stripe dashboard acceptable at R0)
- **Key States**: History loaded, date range filtered, exported to CSV
- **Components**: Payout list (date, amount, status), payout detail view (booking breakdown), filter by date range, export button (CSV for tax), total annual earnings display
- **Navigation**: → Earnings dashboard, → Booking detail (via payout)
- **Preconditions**: Caregiver has received at least one payout
- **Feature Reference**: Feature map 7.5
- **Data Sensitivity**: High (financial history)

---

### 4.10 Admin Dashboard (12 screens - 6 R0, 6 R1)

#### SCR-ADM-001: Admin Dashboard (R0)
- **Route**: `/admin`
- **Access**: Admin
- **Purpose**: Central operations hub for platform administrators
- **R0/R1**: R0 (admin oversight critical)
- **Key States**: Default view, urgent alerts visible, SLA breaches flagged
- **Components**: Key metrics row (pending verifications, active bookings, today's bookings, urgent reports), SLA breach alerts (verifications >48h), safeguarding escalation banners (urgent reports <2h old), dispute resolution queue widget, recent activity feed (last 24h), quick actions sidebar (review next verification, search user, view today's bookings)
- **Navigation**: → Verification queue, → Booking management, → Safeguarding reports, → User detail, → Analytics
- **Preconditions**: Admin account with 2FA enabled
- **Feature Reference**: Admin spec 4.1
- **Data Sensitivity**: High (aggregated platform data)

#### SCR-ADM-005: Caregiver Application Review (R0)
- **Route**: `/admin/applications/:applicationId`
- **Access**: Admin (Operations Manager)
- **Purpose**: Review caregiver application before approval
- **R0/R1**: R0 (verification critical)
- **Key States**: Application pending review, admin reviewing, application approved, application rejected
- **Components**: Caregiver profile summary (name, photo, bio), profile completeness indicator, verification status (identity, right to work, DBS), admin review checklist (profile photo appropriate, bio complete, services selected, rate reasonable), approve button, reject button (with reason dropdown), admin notes field (internal), audit trail (previous actions)
- **Navigation**: → Verification review screens (ID, right to work, DBS), → User detail view, → Verification queue
- **Preconditions**: Caregiver completed onboarding, submitted verification documents
- **Feature Reference**: Admin spec 2.1
- **Data Sensitivity**: High (caregiver application data, admin decisions)

#### SCR-ADM-007: Verification Review (R0)
- **Route**: `/admin/verifications/:verificationId`
- **Access**: Admin (Operations Manager)
- **Purpose**: Verify identity, qualifications, skills documents
- **R0/R1**: R0 (safeguarding critical)
- **Key States**: Document uploaded (awaiting review), admin reviewing, verification approved, verification rejected (resubmission required)
- **Components**: Document viewer (ID images, selfie, certificates), Stripe Identity result display (if automated verification attempted), verification checklist (photo clear, ID not expired, name matches profile, selfie matches ID), approve button, reject button (with reason dropdown), request resubmission button, admin notes field, audit trail
- **Navigation**: → Caregiver application review, → DBS review (if applicable), → Verification queue
- **Preconditions**: Caregiver uploaded verification documents
- **Feature Reference**: Admin spec 2.1
- **Data Sensitivity**: High (ID documents, verification decisions)

#### SCR-ADM-008: DBS Review (R0)
- **Route**: `/admin/verifications/dbs/:verificationId`
- **Access**: Admin (Operations Manager)
- **Purpose**: Verify DBS certificate authenticity (voluntary at T1)
- **R0/R1**: R0 (trust signal quality critical)
- **Key States**: DBS certificate uploaded, admin reviewing, DBS verified (badge awarded), DBS rejected (expired/invalid)
- **Components**: DBS certificate viewer (PDF/image), DBS details form (certificate number, issue date, level), DBS verification checklist (certificate not expired, name matches, certificate number present, looks authentic), DBS Update Service check link (if caregiver subscribed), approve button (awards "DBS Verified" badge), reject button (with reason dropdown), admin notes field
- **Navigation**: → Verification review, → Caregiver application review, → Verification queue
- **Preconditions**: Caregiver uploaded DBS certificate
- **Feature Reference**: Admin spec 2.1, Verification spec 6.4
- **Data Sensitivity**: High (DBS certificate = criminal conviction data)

#### SCR-ADM-010: Booking Management (R1)
- **Route**: `/admin/bookings`
- **Access**: Admin (Operations Manager)
- **Purpose**: Platform-wide booking oversight
- **R0/R1**: R1 (manual tracking at R0)
- **Key States**: Booking list loaded, filters applied, booking detail viewed
- **Components**: Booking list table (ID, care receiver, caregiver, date, status, amount), filters (status, date range, disputed only, high-value), search by user name/booking ID, sort options (date, amount, status), booking detail modal/page, status override button (admin action), refund initiation button, dispute flag button, export to CSV
- **Navigation**: → Booking detail page, → User detail view, → Dispute queue
- **Preconditions**: Admin account
- **Feature Reference**: Admin spec 2.3
- **Data Sensitivity**: High (all platform bookings)

#### SCR-ADM-012: Dispute Queue (R1)
- **Route**: `/admin/disputes`
- **Access**: Admin (Operations Manager)
- **Purpose**: Structured dispute handling and resolution
- **R0/R1**: R1 (manual tracking at R0)
- **Key States**: Dispute list loaded, dispute under review, dispute resolved
- **Components**: Dispute list (booking ID, care receiver, caregiver, dispute reason, age, SLA warning), dispute detail view (booking details, care receiver claim, caregiver response, evidence uploads, message history), resolution interface (full refund, partial refund 25/50/75%, no refund), rationale textarea (required, min 50 chars), resolve button
- **Navigation**: → Booking detail page, → User detail view, → Booking management
- **Preconditions**: At least one disputed booking exists
- **Feature Reference**: Admin spec 2.3
- **Data Sensitivity**: High (dispute evidence, financial decisions)

#### SCR-ADM-014: Safeguarding Reports Queue (R0)
- **Route**: `/admin/safeguarding`
- **Access**: Admin (Safeguarding Officer)
- **Purpose**: Safeguarding incident triage and response
- **R0/R1**: R0 (Care Act 2014 compliance critical)
- **Key States**: Report list loaded (sorted by urgency), report under investigation, report resolved
- **Components**: Report list (case ID, reporter, reported user, incident type, severity, age, status), urgency flags (red for urgent, yellow for standard), SLA breach warnings (>2h for urgent, >48h for standard), report detail modal/page link, filter by status/urgency/incident type, search by user
- **Navigation**: → Safeguarding report detail, → User detail view (reported user), → External escalation forms
- **Preconditions**: At least one safeguarding report submitted
- **Feature Reference**: Safeguarding spec 3.2
- **Data Sensitivity**: High (safeguarding reports = special category data)

#### SCR-ADM-015: Safeguarding Report Detail (R0)
- **Route**: `/admin/safeguarding/:reportId`
- **Access**: Admin (Safeguarding Officer)
- **Purpose**: Investigate and resolve safeguarding incidents
- **R0/R1**: R0 (Care Act 2014 duty)
- **Key States**: Report submitted, triage complete, investigation ongoing, external escalation completed, report resolved
- **Components**: Report details (reporter info, reported user, incident description, evidence uploads), reported user history (bookings, messages, previous reports, verification status), triage checklist (immediate danger?, Section 42 criteria met?, police notification required?), severity classification dropdown (Low/Medium/High/Critical), investigation notes textarea, suspend user button (immediate action), escalate to SAB button, escalate to police button, resolve incident button (with outcome selection)
- **Navigation**: → User detail view (reported user, reporter), → SAB escalation form, → Police escalation form, → Safeguarding queue
- **Preconditions**: Safeguarding report submitted
- **Feature Reference**: Safeguarding spec 3.2
- **Data Sensitivity**: High (safeguarding investigation data)

#### SCR-ADM-016: User Detail View (R1)
- **Route**: `/admin/users/:userId`
- **Access**: Admin
- **Purpose**: Comprehensive user profile for admin oversight
- **R0/R1**: R1 (database queries acceptable at R0)
- **Key States**: User profile loaded, history displayed, admin actions available
- **Components**: User profile data (name, email, phone, address, registration date), verification status (all badges), booking history table (with status and dates), review history, incident history (safeguarding reports, disputes), account status (active/suspended/banned), suspend button (duration selector), ban button (with reason), delete account button (GDPR), admin notes field, audit trail (admin actions on this user)
- **Navigation**: → Booking detail (via history), → Safeguarding report (via incidents), → User list
- **Preconditions**: User exists in system
- **Feature Reference**: Admin spec 2.2
- **Data Sensitivity**: High (full user data access)

#### SCR-ADM-019: Incident Reports (R1)
- **Route**: `/admin/incidents`
- **Access**: Admin
- **Purpose**: Structured incident logging (quality/safety tracking)
- **R0/R1**: R1 (spreadsheet acceptable at R0, required for CQC readiness)
- **Key States**: Incident list loaded, incident detail viewed, incident resolved
- **Components**: Incident list (ID, incident type, user involved, date, severity, status), incident detail view (category, severity, investigation notes, resolution tracking), filter by category/severity/status, export to CSV (compliance reporting), incident trends dashboard link
- **Navigation**: → Incident detail, → User detail view, → Safeguarding reports (if related)
- **Preconditions**: At least one incident logged
- **Feature Reference**: Admin spec 2.4
- **Data Sensitivity**: High (incident data for compliance)

#### SCR-ADM-020: Analytics Dashboard (R1)
- **Route**: `/admin/analytics`
- **Access**: Admin
- **Purpose**: Business intelligence and reporting
- **R0/R1**: R1 (manual reporting acceptable at R0)
- **Key States**: Dashboard loaded, date range filtered, metrics displayed
- **Components**: Registration trends chart (care receivers, caregivers), booking trends chart (volume, value), revenue trends (GMV, commission), geographic distribution map (postcode heatmap), caregiver supply/demand ratio, verification completion rates, average booking value, repeat booking rate, filter by date range (7d, 30d, 90d, 1y), export reports button (PDF/CSV)
- **Navigation**: → Detailed metric views, → Export reports
- **Preconditions**: Platform has operational data
- **Feature Reference**: Admin spec 9
- **Data Sensitivity**: Medium (aggregated business data)

#### SCR-ADM-023: Audit Log (R1)
- **Route**: `/admin/audit`
- **Access**: Admin (Super Admin, Safeguarding Officer)
- **Purpose**: Compliance audit trail
- **R0/R1**: R1 (database logs acceptable at R0, required for GDPR/Care Act)
- **Key States**: Log loaded, filtered by action/user/date
- **Components**: Audit log table (timestamp, admin user, action type, target user, details, IP address), filter by action type (user suspended, booking refunded, verification approved, safeguarding escalated, etc.), filter by admin user, filter by date range, search by user, export for compliance review (CSV), data access log section (GDPR subject access tracking)
- **Navigation**: → User detail view (via target user), → Booking detail (via action)
- **Preconditions**: Admin actions have occurred
- **Feature Reference**: Admin spec 10
- **Data Sensitivity**: High (audit trail for compliance)

---

## 5. Navigation Structure

### 5.1 Public Navigation (Unauthenticated)

**Header Navigation**:
- Logo (→ Homepage)
- How It Works
- Find Care (→ Login if not authenticated)
- Become a Caregiver (→ Caregiver registration)
- Login
- Sign Up (→ Registration type selector)

**Footer Navigation**:
- About Us
- How It Works (Families)
- How It Works (Caregivers)
- Safety & Support
- Terms of Service
- Privacy Policy
- Safeguarding Policy
- Contact Us
- Report Safeguarding Concern

---

### 5.2 Family Dashboard Navigation (Authenticated Care Receiver/Family)

**Main Navigation**:
- Dashboard (→ `/dashboard`)
- Search Caregivers (→ `/search`)
- My Bookings (→ `/dashboard/bookings`)
- Messages (→ `/messages`)
- Account Settings (→ `/settings`)
- Help & Support

**User Menu** (top right):
- Profile
- Payment Methods
- Notification Settings
- Safeguarding Resources
- Logout

**Quick Actions** (Dashboard sidebar):
- Find Caregiver (→ `/search`)
- View Upcoming Bookings (→ `/dashboard/bookings`)
- Check Messages (→ `/messages`)

---

### 5.3 Caregiver Dashboard Navigation (Authenticated Caregiver)

**Main Navigation**:
- Dashboard (→ `/caregiver/dashboard`)
- Booking Requests (→ `/caregiver/bookings?status=requested`)
- My Bookings (→ `/caregiver/bookings`)
- Earnings (→ `/caregiver/earnings`)
- Availability (→ `/caregiver/availability`)
- My Profile (→ `/caregiver/profile/edit`)

**User Menu** (top right):
- View Public Profile (→ `/caregivers/:myId`)
- Account Settings
- Bank Account (→ `/caregiver/earnings/setup`)
- Verification Status (→ `/caregiver/verify`)
- Help & Resources
- Logout

**Quick Actions** (Dashboard sidebar):
- Review Pending Requests (→ `/caregiver/bookings?status=requested`)
- Manage Availability (→ `/caregiver/availability`)
- View Earnings (→ `/caregiver/earnings`)

---

### 5.4 Admin Dashboard Navigation (Authenticated Admin)

**Main Navigation**:
- Dashboard (→ `/admin`)
- Verifications (→ `/admin/verifications`)
- Bookings (→ `/admin/bookings`)
- Users (→ `/admin/users`)
- Safeguarding (→ `/admin/safeguarding`)
- Disputes (→ `/admin/disputes`)
- Analytics (→ `/admin/analytics`)
- Audit Log (→ `/admin/audit`)

**Urgent Alerts** (Top banner):
- SLA Breach Alerts (→ `/admin/verifications?overdue=true`)
- Urgent Safeguarding Reports (→ `/admin/safeguarding?urgent=true`)
- No-Show Investigations (→ `/admin/incidents?type=no_show`)

**User Menu** (top right):
- Admin Settings
- Safeguarding Resources
- Platform Configuration (Super Admin only)
- Logout

---

## 6. Role-Based Access Matrix

| Route | Public | Family | Caregiver | Admin | Safeguarding Officer |
|-------|--------|--------|-----------|-------|---------------------|
| **Public & Auth** | | | | | |
| `/` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `/register/*` | ✓ | - | - | - | - |
| `/login` | ✓ | - | - | - | - |
| `/terms`, `/privacy`, `/safeguarding-policy` | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Search & Discovery** | | | | | |
| `/search` | - | ✓ | - | ✓ (view only) | ✓ (view only) |
| `/caregivers/:id` | - | ✓ | ✓ (own profile) | ✓ | ✓ |
| **Bookings** | | | | | |
| `/bookings/new/:caregiverId` | - | ✓ | - | - | - |
| `/bookings/:bookingId` | - | ✓ (if party) | ✓ (if party) | ✓ | ✓ |
| `/bookings/:bookingId/cancel` | - | ✓ (if party) | ✓ (if party) | ✓ | ✓ |
| `/bookings/:bookingId/review` | - | ✓ (if care receiver) | - | - | - |
| **Payments** | | | | | |
| `/settings/payment` | - | ✓ | - | - | - |
| `/caregiver/earnings/*` | - | - | ✓ | ✓ (view only) | ✓ (view only) |
| **Messaging** | | | | | |
| `/messages` | - | ✓ | ✓ | ✓ (view all) | ✓ (view all) |
| `/messages/:conversationId` | - | ✓ (if party) | ✓ (if party) | ✓ | ✓ |
| **Care Receiver Dashboard** | | | | | |
| `/dashboard` | - | ✓ | - | - | - |
| `/profile/care-needs` | - | ✓ | - | ✓ (view only) | ✓ (view only) |
| `/settings` | - | ✓ | - | - | - |
| `/report/safeguarding` | - | ✓ | ✓ | - | - |
| **Caregiver Dashboard** | | | | | |
| `/caregiver/dashboard` | - | - | ✓ | ✓ (view only) | ✓ (view only) |
| `/caregiver/onboarding` | - | - | ✓ (pending verification) | - | - |
| `/caregiver/profile/edit` | - | - | ✓ | - | - |
| `/caregiver/availability` | - | - | ✓ | ✓ (view only) | - |
| `/caregiver/verify/*` | - | - | ✓ (pending verification) | - | - |
| **Admin Dashboard** | | | | | |
| `/admin` | - | - | - | ✓ | ✓ |
| `/admin/verifications/*` | - | - | - | ✓ | ✓ |
| `/admin/bookings` | - | - | - | ✓ | ✓ |
| `/admin/users/:userId` | - | - | - | ✓ | ✓ |
| `/admin/safeguarding/*` | - | - | - | ✓ (read-only) | ✓ (full access) |
| `/admin/disputes` | - | - | - | ✓ | ✓ |
| `/admin/incidents` | - | - | - | ✓ | ✓ |
| `/admin/analytics` | - | - | - | ✓ | ✓ |
| `/admin/audit` | - | - | - | ✓ (own actions) | ✓ (all actions) |

---

## 7. Authentication Requirements

### 7.1 Routes Requiring Authentication

**Public Routes** (No authentication required):
- `/` (Homepage)
- `/register/*` (Registration flows)
- `/login`
- `/forgot-password`
- `/terms`, `/privacy`, `/safeguarding-policy` (Legal pages)
- `/how-it-works/*` (Marketing pages)

**Authenticated Routes** (Login required):
- All `/dashboard` routes
- All `/caregiver` routes
- All `/bookings` routes (except public caregiver profile view)
- All `/messages` routes
- All `/settings` routes
- All `/admin` routes

### 7.2 Redirect Behavior

**Unauthenticated User**:
- Accessing authenticated route → Redirect to `/login?redirect=/original-path`
- After login → Redirect to original path (if safe) or role-specific dashboard

**Authenticated User**:
- Accessing `/login` or `/register` → Redirect to role-specific dashboard
- Accessing route for wrong role → Redirect to own dashboard with error message

**Role-Specific Redirects**:
- Family login → `/dashboard`
- Caregiver login → `/caregiver/dashboard`
- Admin login → `/admin`

---

## 8. URL Parameters

### 8.1 Dynamic Route Segments

| Parameter | Routes Using It | Format | Validation |
|-----------|----------------|--------|------------|
| `:caregiverId` | `/caregivers/:caregiverId` | UUID | Valid UUID, caregiver exists, profile approved |
| | `/bookings/new/:caregiverId` | UUID | Valid UUID, caregiver available |
| `:bookingId` | `/bookings/:bookingId` | UUID | Valid UUID, user is party to booking OR admin |
| | `/bookings/:bookingId/cancel` | UUID | Same as above |
| | `/bookings/:bookingId/review` | UUID | Same + booking completed |
| | `/caregiver/bookings/:bookingId` | UUID | Valid UUID, caregiver is party to booking |
| `:conversationId` | `/messages/:conversationId` | UUID | Valid UUID, user is party to conversation OR admin |
| `:applicationId` | `/admin/applications/:applicationId` | UUID | Valid UUID, admin access |
| `:verificationId` | `/admin/verifications/:verificationId` | UUID | Valid UUID, admin access |
| | `/admin/verifications/dbs/:verificationId` | UUID | Same as above |
| `:reportId` | `/admin/safeguarding/:reportId` | UUID | Valid UUID, safeguarding officer access |
| `:userId` | `/admin/users/:userId` | UUID | Valid UUID, admin access |

### 8.2 Parameter Security

**Authorization Checks**:
- All dynamic parameters validated against user's access rights
- Attempting to access another user's resource → 403 Forbidden OR 404 Not Found (security by obscurity)
- Admin access logged in audit trail

**Input Validation**:
- UUID format validation (36 chars, hyphen-separated)
- SQL injection prevention (parameterized queries)
- Path traversal prevention (no `../` allowed)

---

## 9. Query Parameters

### 9.1 Search Query Parameters

**Route**: `/search`

| Parameter | Type | Values | Default | Purpose |
|-----------|------|--------|---------|---------|
| `postcode` | string | UK postcode (e.g., SW1A1AA) | - | Search location |
| `radius` | integer | 5, 10, 15, 20, 30 (miles) | 10 | Search radius |
| `services` | array | companionship, light_housework, shopping, meal_prep, transportation | all | Service types filter |
| `rate_min` | decimal | 10-100 GBP | 10 | Minimum hourly rate |
| `rate_max` | decimal | 10-100 GBP | 40 | Maximum hourly rate |
| `days` | array | monday, tuesday, ..., sunday | all | Availability days |
| `times` | array | morning, afternoon, evening | all | Availability times |
| `dbs_verified` | boolean | true, false | false | Show only DBS verified |
| `languages` | array | english, polish, romanian, etc. | english | Languages spoken |
| `gender` | string | male, female, no_preference | no_preference | Gender preference |
| `min_rating` | decimal | 0-5 | 0 | Minimum average rating |
| `sort` | string | distance, rating, price_low, price_high, newest | distance | Sort order |
| `page` | integer | 1+ | 1 | Pagination page number |
| `limit` | integer | 6, 12, 24 | 12 | Results per page |

**Example URL**:
```
/search?postcode=SW1A1AA&radius=10&services=companionship,light_housework&rate_min=15&rate_max=25&dbs_verified=true&days=monday,wednesday,friday&times=morning&sort=distance&page=1
```

---

### 9.2 Booking Query Parameters

**Route**: `/admin/bookings`

| Parameter | Type | Values | Default | Purpose |
|-----------|------|--------|---------|---------|
| `status` | string | requested, accepted, in_progress, completed, cancelled, disputed | all | Filter by booking status |
| `start_date` | date | YYYY-MM-DD | - | Filter by start date (from) |
| `end_date` | date | YYYY-MM-DD | - | Filter by start date (to) |
| `disputed_only` | boolean | true, false | false | Show only disputed bookings |
| `high_value` | boolean | true, false | false | Show only >£100 bookings |
| `search` | string | name, email, booking ID | - | Search user or booking |
| `sort` | string | date_asc, date_desc, amount_asc, amount_desc | date_desc | Sort order |
| `page` | integer | 1+ | 1 | Pagination |
| `limit` | integer | 10, 25, 50 | 25 | Results per page |

---

### 9.3 Caregiver Booking Query Parameters

**Route**: `/caregiver/bookings`

| Parameter | Type | Values | Default | Purpose |
|-----------|------|--------|---------|---------|
| `status` | string | requested, accepted, in_progress, completed | all | Filter by booking status |
| `start_date` | date | YYYY-MM-DD | - | Filter by start date (from) |
| `end_date` | date | YYYY-MM-DD | - | Filter by start date (to) |
| `sort` | string | date_asc, date_desc | date_desc | Sort order |
| `page` | integer | 1+ | 1 | Pagination |

---

### 9.4 Admin Verification Queue Query Parameters

**Route**: `/admin/verifications`

| Parameter | Type | Values | Default | Purpose |
|-----------|------|--------|---------|---------|
| `status` | string | pending, in_review, approved, rejected | pending | Filter by verification status |
| `type` | string | identity, right_to_work, dbs | all | Verification type |
| `overdue` | boolean | true, false | false | Show only SLA breaches (>48h) |
| `assigned_to` | UUID | Admin user ID | - | Show only assigned to specific admin |
| `days_pending` | integer | 0, 1, 2, 3+ | all | Filter by days pending |
| `sort` | string | date_asc, date_desc, days_pending_desc | date_asc | Sort order (oldest first default) |
| `page` | integer | 1+ | 1 | Pagination |
| `limit` | integer | 10, 25, 50 | 25 | Results per page |

---

### 9.5 Safeguarding Queue Query Parameters

**Route**: `/admin/safeguarding`

| Parameter | Type | Values | Default | Purpose |
|-----------|------|--------|---------|---------|
| `status` | string | open, investigating, resolved, escalated | open | Filter by case status |
| `urgency` | string | urgent, standard | all | Filter by urgency level |
| `incident_type` | string | physical_abuse, emotional_abuse, sexual_abuse, financial_abuse, neglect, other | all | Filter by incident type |
| `start_date` | date | YYYY-MM-DD | - | Filter by report date (from) |
| `end_date` | date | YYYY-MM-DD | - | Filter by report date (to) |
| `sla_breach` | boolean | true, false | false | Show only SLA breaches (>2h for urgent, >48h standard) |
| `sort` | string | date_desc, urgency_desc | urgency_desc | Sort order (urgent first default) |
| `page` | integer | 1+ | 1 | Pagination |

---

## 10. Screen States

### 10.1 Common Screen States (All Screens)

**Loading States**:
- `loading` - Initial data fetch, skeleton screens, spinners
- `loading_more` - Pagination/infinite scroll loading next page
- `refreshing` - Pull-to-refresh or manual refresh

**Success States**:
- `success` - Data loaded successfully, default view
- `empty` - No data available (e.g., no bookings, no messages)

**Error States**:
- `error` - API error, network error, unexpected error
- `error_recoverable` - Error with retry option (e.g., network timeout)
- `error_fatal` - Error requiring user action (e.g., expired session, account suspended)

**Permission States**:
- `unauthorized` - User not logged in (redirect to login)
- `forbidden` - User logged in but lacks permission (403)
- `not_found` - Resource not found (404)

---

### 10.2 Booking-Specific States

**SCR-CR-006: Booking Request Form**:
- `form_entry` - User filling out form
- `date_selection` - User selecting date from caregiver availability
- `price_calculating` - Real-time price calculation updating
- `payment_authorizing` - Authorizing payment method (Stripe call)
- `payment_authorized` - Payment authorized, ready to submit
- `payment_failed` - Payment authorization failed (card declined, expired)
- `submitting` - Submitting booking request
- `submitted` - Booking request sent to caregiver

**SCR-CR-008: Booking Detail**:
- `requested` - Awaiting caregiver response (countdown timer visible)
- `accepted` - Confirmed, payment captured (contact details shared)
- `in_progress` - Session started (emergency contact visible)
- `completed` - Caregiver marked complete (confirm/dispute buttons visible)
- `payment_released` - Payout processed (review prompt visible)
- `reviewed` - Care receiver left review
- `cancelled` - Booking cancelled (refund status visible)
- `disputed` - Dispute raised (admin review pending)
- `no_show` - No-show reported (investigation pending)

---

### 10.3 Verification-Specific States

**SCR-CG-008: Identity Verification**:
- `not_started` - No documents uploaded
- `document_uploading` - Upload in progress
- `document_uploaded` - Awaiting Stripe Identity result
- `automated_verification_pending` - Stripe Identity processing
- `automated_verification_success` - Stripe Identity approved (admin final check)
- `automated_verification_failed` - Stripe Identity failed (manual admin review)
- `admin_review_pending` - Admin manual review queue
- `admin_reviewing` - Admin actively reviewing documents
- `verification_approved` - Verification complete (badge awarded)
- `verification_rejected` - Verification rejected (resubmission required)
- `resubmission_requested` - Admin requested clearer documents

**SCR-ADM-007: Verification Review (Admin)**:
- `queue_loading` - Verification queue loading
- `queue_loaded` - Queue displayed, sorted by age
- `reviewing_application` - Admin viewing verification documents
- `documents_displayed` - ID images, selfie, Stripe result visible
- `checklist_completing` - Admin completing verification checklist
- `decision_submitted` - Admin approved/rejected, notification sent
- `audit_logged` - Decision logged in audit trail

---

### 10.4 Messaging-Specific States

**SCR-CR-011: Message Inbox**:
- `no_messages` - No conversations yet (empty state)
- `messages_loading` - Loading conversation list
- `messages_loaded` - Conversation list displayed
- `unread_indicator` - Unread message count badges visible
- `conversation_selected` - User clicked conversation (navigate to thread)

**SCR-CR-012: Message Thread**:
- `thread_loading` - Loading message history
- `thread_loaded` - Messages displayed (oldest first)
- `typing` - User typing message (character count visible)
- `sending` - Message being sent to server
- `sent` - Message sent successfully
- `send_failed` - Message send failed (retry button)
- `content_filtered` - Contact info redacted, profanity filtered (notice displayed)
- `real_time_update` - New message received from counterparty (WebSocket)

---

### 10.5 Admin Dashboard States

**SCR-ADM-001: Admin Dashboard**:
- `dashboard_loading` - Loading metrics and widgets
- `dashboard_loaded` - Default view with metrics
- `urgent_alerts_visible` - SLA breaches or safeguarding alerts displayed
- `no_urgent_alerts` - All queues within SLA, no urgent reports
- `metrics_refreshing` - Real-time metric refresh

**SCR-ADM-015: Safeguarding Report Detail**:
- `report_loading` - Loading report details
- `report_loaded` - Report displayed with evidence
- `triaging` - Safeguarding officer completing triage checklist
- `investigating` - Investigation in progress (notes being added)
- `suspending_user` - Admin suspending reported user immediately
- `escalating_to_sab` - Admin completing SAB referral form
- `escalating_to_police` - Admin completing police escalation form
- `resolving` - Admin completing resolution form (outcome, rationale)
- `resolved` - Case closed, reporter and reported user notified

---

### 10.6 Payment States

**SCR-CR-013: Payment Methods**:
- `no_cards` - No payment methods added (empty state)
- `cards_loaded` - Saved cards displayed
- `adding_card` - Stripe Elements modal open
- `card_validating` - Stripe validating card details
- `card_added` - Card successfully saved
- `card_add_failed` - Card validation failed (error displayed)
- `card_expired_warning` - Card expiry <30 days (banner visible)
- `removing_card` - Deleting card confirmation
- `card_removed` - Card deleted

**SCR-CG-020: Payout Setup**:
- `bank_not_connected` - No bank account linked
- `stripe_connect_loading` - Stripe Connect iframe loading
- `bank_details_entering` - User entering sort code/account number
- `account_verifying` - Stripe verifying bank account
- `account_verified` - Bank account connected successfully
- `account_verification_failed` - Verification failed (retry or contact Stripe)
- `kyc_required` - Additional KYC documents required by Stripe
- `payout_active` - Payouts enabled, ready to receive earnings

---

## 11. Cross-References

**Source Documents**:
- [Tiered Market Entry Roadmap](/docs/ROADMAP.md) - FDR-003: Tier definitions
- [R0 Launch Scope](/docs/tiers/tier1/planning/r0-launch-scope.md) - 30 launch-critical screens
- [R1 Launch Scope](/docs/tiers/tier1/planning/r1-launch-scope.md) - Full Tier 1 MVP (47 screens)
- [Booking Specification](/docs/product/features/tier1-booking-specification.md) - Booking system
- [Verification Specification](/docs/product/features/tier1-verification-specification.md) - Verification workflows
- [Search Specification](/docs/product/features/tier1-search-specification.md) - Search and discovery
- [Messaging Specification](/docs/product/features/tier1-messaging-specification.md) - Messaging system
- [Admin Specification](/docs/product/features/tier1-admin-specification.md) - Admin dashboard
- [Safeguarding Specification](/docs/product/features/tier1-safeguarding-specification.md) - Safeguarding system
- [Feature Map](/docs/tiers/common/spec/feature-map.md) - Complete system overview

**Related Documents**:
- [Marketplace Specification](/docs/tiers/common/spec/marketplace-spec.md) - Constitutional baseline
- [Build Sequence](/docs/tiers/tier1/planning/build-sequence.md) - Development phases
- [Launch Checklist](/docs/tiers/tier1/planning/launch-checklist.md) - Launch readiness

---

## 12. Document Maintenance

**Review Triggers**:
- Tier progression (moving from Tier 1 to Tier 2 adds routes)
- New feature specifications added
- Screen consolidation or splitting
- Regulatory changes requiring new screens
- User feedback identifying missing screens

**Ownership**: Product Manager owns this route map. Engineering Lead reviews technical routing implementation.

**Update Cycle**: Updated whenever new screens are added or existing screens modified.

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-06 | Product Team | Initial Tier 1 route map and screen inventory created |
| 1.1 | 2026-02-07 | Product Team | **QA-1 Fix**: Updated R0 count from 26 to 30 screens; reclassified SCR-CR-001 (Dashboard), SCR-CG-001 (Dashboard), SCR-CR-015 (Leave Review) from R1 to R0 per CB-001, CB-002, CB-006; fixed SCR-CR-011/012 ID/name swap per CB-005 |

---

## Source Dependencies

**Purpose**: Track which source documents this route map was derived from. If these sources change, this route map MUST be reviewed for updates.

**Last Validated**: 2026-02-07

| Source Document | Path | Version/Date | What This Route Map Uses |
|----------------|------|--------------|--------------------------|
| R0 Launch Scope | `/docs/tiers/tier1/planning/r0-launch-scope.md` | v1.2 (2026-02-06) | 30 R0 screen classifications |
| R1 Launch Scope | `/docs/tiers/tier1/planning/r1-launch-scope.md` | 2026-02-06 | 47 total screen definitions |
| Booking Specification | `/docs/product/features/tier1-booking-specification.md` | 2026-02-06 | Booking screen states, routes, components |
| Verification Specification | `/docs/product/features/tier1-verification-specification.md` | 2026-02-06 | Verification screen states, routes, workflows |
| Search Specification | `/docs/product/features/tier1-search-specification.md` | 2026-02-06 | Search screen routes, query params, filters |
| Messaging Specification | `/docs/product/features/tier1-messaging-specification.md` | 2026-02-06 | Message screen routes, states, moderation rules |
| Admin Specification | `/docs/product/features/tier1-admin-specification.md` | 2026-02-06 | Admin screen routes, dashboard widgets, metrics |
| Safeguarding Specification | `/docs/product/features/tier1-safeguarding-specification.md` | 2026-02-06 | Safeguarding screen routes, states, workflows |
| Feature Map | `/docs/tiers/common/spec/feature-map.md` | 2026-02-01 | Overall feature context and tier tags |
| Tiered Roadmap | `/docs/ROADMAP.md` | 2026-01-31 | Tier 1 scope definition (FDR-003) |

**⚠️ Update Protocol**: If ANY source document above is modified, check `/docs/tiers/tier1/decision-impact-log.md` to determine if this route map requires updates. Add any pending updates to `/docs/tiers/tier1/TIER1_STATUS_LOG.md` Section 8 (Pending Updates Tracker).

---

**END OF DOCUMENT**
