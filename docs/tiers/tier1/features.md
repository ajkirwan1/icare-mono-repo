# Tier 1 Features

**Document Purpose**: Comprehensive list of all features enabled at Tier 1 (Companionship MVP).

**Status**: ACTIVE
**Last Updated**: 2026-02-01

---

## Overview

Tier 1 features are tagged with `[T1]` in the master [Feature Map](../common/spec/feature-map.md). This document extracts and organizes all Tier 1 features for reference.

---

## Services Enabled at Tier 1

| Service Type | Available | Notes |
|--------------|-----------|-------|
| Companionship | Yes | Core Tier 1 service |
| Light housework | Yes | Cleaning, tidying |
| Shopping/errands | Yes | Accompanied shopping |
| Meal preparation | Yes | NO feeding assistance |
| Transportation | Yes | If caregiver has vehicle |
| Personal care | No | Deferred to Tier 2 |
| Medication assistance | No | Deferred to Tier 2 |
| Live-in care | No | Deferred to Tier 3 |

---

## Feature Systems (Tier 1)

### 1. User Management & Authentication [T1]

- Care receiver registration (email + password)
- Caregiver registration (email + password)
- Family member proxy registration
- Email verification (double opt-in)
- Phone verification (SMS OTP)
- Password management (reset, change)
- Session management (secure cookies, expiry)
- Role-based access control (Care Receiver, Caregiver, Admin)

### 2. Caregiver Profile System [T1]

- Professional profile creation (name, photo, bio, experience)
- Service type selection (companionship only at T1)
- Hourly rate setting (caregiver-controlled)
- Service radius configuration (5-30 miles)
- Availability calendar
- Bank account setup (Stripe Connect)
- "Companionship Services Only" badge

**NOT at Tier 1**:
- Medical condition experience profile (Tier 3)
- Care skills profile (Tier 2)
- Qualification verification (Tier 2)

### 3. Verification System [T1]

- ID verification (Stripe Identity)
- Right to work verification (UKVI share code)
- Admin approval workflow
- Verification status tracking
- Voluntary DBS certificate upload
- "DBS Verified" badge (if caregiver submits certificate)

**NOT at Tier 1**:
- Mandatory DBS verification (Tier 2)
- Qualification verification (Tier 2)
- Insurance verification (Tier 2)

### 4. Care Receiver Profile System [T1]

- Basic registration (name, email, phone, postcode)
- Age verification (65+ or documented care needs)
- Emergency contact capture
- GDPR consent management
- Family member proxy registration

**NOT at Tier 1**:
- Medical condition profile (Tier 3)
- Care needs assessment (Tier 3)
- Risk assessment (Tier 3)

### 5. Discovery & Search System [T1]

- Postcode-based location search
- Radius selection (5-30 miles)
- Caregiver results list (sorted by distance)
- Caregiver profile cards
- Filter by availability
- Filter by hourly rate range
- Filter by "DBS Verified" status

**NOT at Tier 1**:
- Filter by care skills (Tier 2)
- Filter by medical condition experience (Tier 3)
- Condition-specific matching (Tier 3)

### 6. Booking System [T1]

- Hourly booking request creation
- Date/time selection
- Service type confirmation (companionship only)
- Caregiver accept/decline workflow
- Payment capture on acceptance (Stripe escrow)
- Booking lifecycle management
- Booking completion workflow
- Cancellation policy enforcement
- No-show management

**NOT at Tier 1**:
- Care needs summary (Tier 2)
- Live-in care bookings (Tier 3)
- Multi-day bookings (Tier 2)

### 7. Messaging System [T1]

- In-app messaging (care receiver ↔ caregiver)
- Message history persistence
- Email notifications for new messages
- Content filtering (off-platform payment keywords)
- Message reporting mechanism

### 8. Payment System [T1]

- Stripe payment processing
- Stripe Connect (caregiver payouts)
- Escrow workflow (hold → release on completion)
- Commission deduction
- Refund processing (cancellations)
- Caregiver earnings dashboard
- Care receiver payment history

### 9. Reviews & Ratings System [T1]

- Post-booking review prompt
- 5-star rating system
- Written review submission
- Review display on caregiver profile
- Average rating calculation
- Review moderation queue (admin)

### 10. Safeguarding & Incident Management [T1]

- Incident reporting form
- Incident categorization
- Admin incident review dashboard
- Incident escalation workflow
- Emergency escalation (999 guidance)
- SAB contact list

### 11. Admin Dashboard [T1]

- User management (view, suspend, delete)
- Caregiver verification queue
- Booking oversight
- Dispute resolution tools
- Incident management dashboard
- Safeguarding reporting interface
- Basic analytics

---

## Feature Count Summary

| Category | Tier 1 Features | Deferred |
|----------|-----------------|----------|
| Authentication | 8 | 0 |
| Caregiver Profile | 7 | 3 |
| Verification | 6 | 3 |
| Care Receiver Profile | 5 | 3 |
| Discovery | 7 | 3 |
| Booking | 9 | 3 |
| Messaging | 5 | 0 |
| Payments | 7 | 0 |
| Reviews | 6 | 0 |
| Safeguarding | 6 | 0 |
| Admin | 7 | 0 |
| **Total** | **73** | **15** |

---

## Related Documents

- [Feature Map (Master)](../common/spec/feature-map.md)
- [Build Sequence](planning/build-sequence.md)
- [Launch Checklist](planning/launch-checklist.md)
- [MVP Classification](../../planning/mvp-classification.md)

---

**Last Updated**: 2026-02-01
