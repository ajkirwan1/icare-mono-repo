# Application Screen Inventory

**Document Version**: 1.0
**Last Updated**: 2026-01-31
**Document Owner**: Information Architecture
**Status**: Canonical Reference

---

## Overview

### Purpose of This Document

This document provides the complete application route map and screen inventory for the UK Elderly Care Marketplace platform. It serves as the canonical reference for:

- **Engineering**: Route definitions, URL parameters, authentication requirements
- **Design**: Screen list for wireframing and UI design
- **QA**: Test surface coverage and state enumeration
- **Compliance**: Verification that all legal/regulatory screens exist

### Source Documents Used

All screens in this inventory are derived exclusively from:

1. `docs/product/spec/marketplace-spec.md` - Platform specification and user roles
2. `docs/product/complete-feature-map.md` - Complete feature set (22 systems)
3. `docs/product/mvp-classification-analysis.md` - MVP vs Post-MVP classification
4. `docs/product/backlog/backlog.yml` - 22 epics, 134 user stories

### Screen Derivation Rules

1. A screen is included only if strictly necessary for a documented feature
2. Multiple interpretations are flagged as Product Gaps
3. Screens marked "blocked" cannot be defined without additional product decisions
4. MVP screens align with MVP classification analysis

---

## Role-Based Screen Inventory

### Role: Public (Unauthenticated)

#### SCR-PUB-001: Homepage
| Field | Value |
|-------|-------|
| **Screen Name** | Homepage |
| **Route** | `/` |
| **Roles** | Public |
| **Purpose** | Communicate platform value proposition and drive registration |
| **Feature References** | STORY-21-01, Feature Map 21.1 |
| **Preconditions** | None |
| **Key States** | Default |
| **Data Sensitivity** | Low |
| **Status** | Confirmed (MVP) |

#### SCR-PUB-002: How It Works - Care Receivers
| Field | Value |
|-------|-------|
| **Screen Name** | How It Works (Care Receivers) |
| **Route** | `/how-it-works/care-receivers` |
| **Roles** | Public |
| **Purpose** | Explain platform process for care receivers and families |
| **Feature References** | STORY-21-01, Feature Map 21.1 |
| **Preconditions** | None |
| **Key States** | Default |
| **Data Sensitivity** | Low |
| **Status** | Confirmed (MVP) |

#### SCR-PUB-003: How It Works - Caregivers
| Field | Value |
|-------|-------|
| **Screen Name** | How It Works (Caregivers) |
| **Route** | `/how-it-works/caregivers` |
| **Roles** | Public |
| **Purpose** | Explain platform process for professional caregivers |
| **Feature References** | STORY-21-01, Feature Map 21.1 |
| **Preconditions** | None |
| **Key States** | Default |
| **Data Sensitivity** | Low |
| **Status** | Confirmed (MVP) |

#### SCR-PUB-004: Pricing
| Field | Value |
|-------|-------|
| **Screen Name** | Pricing |
| **Route** | `/pricing` |
| **Roles** | Public |
| **Purpose** | Display transparent fee structure for care receivers and caregivers |
| **Feature References** | STORY-21-01, Feature Map 7.3, 21.1 |
| **Preconditions** | None |
| **Key States** | Default |
| **Data Sensitivity** | Low |
| **Status** | Confirmed (MVP) |

#### SCR-PUB-005: FAQs
| Field | Value |
|-------|-------|
| **Screen Name** | Frequently Asked Questions |
| **Route** | `/faqs` |
| **Roles** | Public |
| **Purpose** | Answer common questions about DBS, cancellation, payments, safeguarding |
| **Feature References** | STORY-21-01, Feature Map 21.5 |
| **Preconditions** | None |
| **Key States** | Default |
| **Data Sensitivity** | Low |
| **Status** | Confirmed (MVP) |

#### SCR-PUB-006: Terms of Service
| Field | Value |
|-------|-------|
| **Screen Name** | Terms of Service |
| **Route** | `/terms` |
| **Roles** | Public |
| **Purpose** | Display platform terms, cancellation policy, user obligations |
| **Feature References** | STORY-21-02, Feature Map 13.13 |
| **Preconditions** | None |
| **Key States** | Default |
| **Data Sensitivity** | Low |
| **Status** | Confirmed (MVP - Regulatory Required) |

#### SCR-PUB-007: Privacy Policy
| Field | Value |
|-------|-------|
| **Screen Name** | Privacy Policy |
| **Route** | `/privacy` |
| **Roles** | Public |
| **Purpose** | Explain data collection, processing, sharing, retention, and user rights (GDPR) |
| **Feature References** | STORY-21-03, Feature Map 13.2 |
| **Preconditions** | None |
| **Key States** | Default |
| **Data Sensitivity** | Low |
| **Status** | Confirmed (MVP - GDPR Required) |

#### SCR-PUB-008: Safeguarding Policy
| Field | Value |
|-------|-------|
| **Screen Name** | Safeguarding Policy |
| **Route** | `/safeguarding-policy` |
| **Roles** | Public |
| **Purpose** | Document safeguarding commitment, reporting mechanisms, investigation procedures |
| **Feature References** | STORY-21-04, Feature Map 9.10, 13.7 |
| **Preconditions** | None |
| **Key States** | Default |
| **Data Sensitivity** | Low |
| **Status** | Confirmed (MVP - Care Act Required) |

#### SCR-PUB-009: Contact Us
| Field | Value |
|-------|-------|
| **Screen Name** | Contact Us |
| **Route** | `/contact` |
| **Roles** | Public |
| **Purpose** | Provide email and phone contact for support inquiries |
| **Feature References** | STORY-21-01 |
| **Preconditions** | None |
| **Key States** | Default, Form Submitted |
| **Data Sensitivity** | Low |
| **Status** | Confirmed (MVP) |

---

### Role: Authentication (All Users)

#### SCR-AUTH-001: Care Receiver Registration
| Field | Value |
|-------|-------|
| **Screen Name** | Care Receiver Registration |
| **Route** | `/register/care-receiver` |
| **Roles** | Public |
| **Purpose** | Register new care receiver account with email, phone, password |
| **Feature References** | STORY-01-01, Feature Map 1.1 |
| **Preconditions** | None |
| **Key States** | Default, Validation Error, Phone Verification Pending, Registration Complete |
| **Data Sensitivity** | High (PII collection) |
| **Status** | Confirmed (MVP) |

#### SCR-AUTH-002: Family Member Registration
| Field | Value |
|-------|-------|
| **Screen Name** | Family Member Registration |
| **Route** | `/register/family` |
| **Roles** | Public |
| **Purpose** | Register family member account to manage care on behalf of relative |
| **Feature References** | STORY-01-02, Feature Map 1.2 |
| **Preconditions** | None |
| **Key States** | Default, Validation Error, Phone Verification Pending, Registration Complete |
| **Data Sensitivity** | High (PII collection) |
| **Status** | Confirmed (MVP) |

#### SCR-AUTH-003: Caregiver Registration
| Field | Value |
|-------|-------|
| **Screen Name** | Caregiver Registration |
| **Route** | `/register/caregiver` |
| **Roles** | Public |
| **Purpose** | Register professional caregiver account (triggers verification workflow) |
| **Feature References** | STORY-01-03, Feature Map 1.3 |
| **Preconditions** | None |
| **Key States** | Default, Validation Error, Phone Verification Pending, Registration Complete (Pending Verification) |
| **Data Sensitivity** | High (PII collection) |
| **Status** | Confirmed (MVP) |

#### SCR-AUTH-004: Phone Verification
| Field | Value |
|-------|-------|
| **Screen Name** | Phone Verification |
| **Route** | `/verify/phone` |
| **Roles** | Partially Authenticated |
| **Purpose** | Verify phone number via SMS code during registration |
| **Feature References** | STORY-01-04, Feature Map 1.4 |
| **Preconditions** | Registration form submitted |
| **Key States** | Awaiting Code Entry, Code Expired, Max Attempts Reached, Verified |
| **Data Sensitivity** | Medium |
| **Status** | Confirmed (MVP) |

#### SCR-AUTH-005: Login
| Field | Value |
|-------|-------|
| **Screen Name** | Login |
| **Route** | `/login` |
| **Roles** | Public |
| **Purpose** | Authenticate existing users with email and password |
| **Feature References** | STORY-01-05, Feature Map 1.5 |
| **Preconditions** | None |
| **Key States** | Default, Validation Error, Account Locked, Login Success |
| **Data Sensitivity** | High (Credentials) |
| **Status** | Confirmed (MVP) |

#### SCR-AUTH-006: Password Reset Request
| Field | Value |
|-------|-------|
| **Screen Name** | Password Reset Request |
| **Route** | `/forgot-password` |
| **Roles** | Public |
| **Purpose** | Request password reset link via email |
| **Feature References** | STORY-01-06, Feature Map 1.6 |
| **Preconditions** | None |
| **Key States** | Default, Email Sent, Email Not Found |
| **Data Sensitivity** | Low |
| **Status** | Confirmed (MVP) |

#### SCR-AUTH-007: Password Reset Form
| Field | Value |
|-------|-------|
| **Screen Name** | Password Reset Form |
| **Route** | `/reset-password/:token` |
| **Roles** | Public |
| **Purpose** | Set new password using reset token |
| **Feature References** | STORY-01-06, Feature Map 1.6 |
| **Preconditions** | Valid reset token (not expired) |
| **Key States** | Default, Token Expired, Validation Error, Password Reset Success |
| **Data Sensitivity** | High (New Credentials) |
| **Status** | Confirmed (MVP) |

#### SCR-AUTH-008: Email Verification
| Field | Value |
|-------|-------|
| **Screen Name** | Email Verification |
| **Route** | `/verify/email/:token` |
| **Roles** | Partially Authenticated |
| **Purpose** | Confirm email address via verification link |
| **Feature References** | Feature Map 1.1 (double opt-in) |
| **Preconditions** | Registration complete, email sent |
| **Key States** | Verifying, Verified, Token Expired, Already Verified |
| **Data Sensitivity** | Low |
| **Status** | Confirmed (MVP) |

#### SCR-AUTH-009: Account Suspended
| Field | Value |
|-------|-------|
| **Screen Name** | Account Suspended |
| **Route** | `/suspended` |
| **Roles** | Suspended User |
| **Purpose** | Inform user their account is suspended with reason and appeal instructions |
| **Feature References** | STORY-09-04, Feature Map 9.5 |
| **Preconditions** | User account suspended by admin |
| **Key States** | Temporary Suspension, Permanent Ban |
| **Data Sensitivity** | Low |
| **Status** | Confirmed (MVP) |

---

### Role: Care Receiver / Family

#### SCR-CR-001: Care Receiver Dashboard
| Field | Value |
|-------|-------|
| **Screen Name** | Care Receiver Dashboard |
| **Route** | `/dashboard` |
| **Roles** | Care Receiver, Family Member |
| **Purpose** | Overview of upcoming bookings, messages, quick actions |
| **Feature References** | STORY-18-01, Feature Map 18.1 |
| **Preconditions** | Authenticated as Care Receiver or linked Family Member |
| **Key States** | Default, No Bookings, Pending Requests, Unread Messages |
| **Data Sensitivity** | Medium |
| **Status** | Confirmed (MVP) |

#### SCR-CR-002: Care Needs Profile
| Field | Value |
|-------|-------|
| **Screen Name** | Care Needs Profile |
| **Route** | `/profile/care-needs` |
| **Roles** | Care Receiver, Family Member (with permission) |
| **Purpose** | Document medical conditions, required care skills, mobility status |
| **Feature References** | STORY-03-01, STORY-18-02, Feature Map 3.1 |
| **Preconditions** | Authenticated |
| **Key States** | Default, Editing, Save Success, Validation Error |
| **Data Sensitivity** | High (Health Data - GDPR Special Category) |
| **Status** | Confirmed (MVP) |

#### SCR-CR-003: Caregiver Search
| Field | Value |
|-------|-------|
| **Screen Name** | Caregiver Search |
| **Route** | `/search` |
| **Roles** | Care Receiver, Family Member |
| **Purpose** | Search caregivers by location, medical conditions, skills, DBS status, availability |
| **Feature References** | STORY-04-01, STORY-04-02, STORY-18-03, Feature Map 4.1, 4.2 |
| **Preconditions** | Authenticated |
| **Key States** | Default, No Results, Results Loading, Results Displayed |
| **Data Sensitivity** | Medium |
| **Status** | Confirmed (MVP) |

#### SCR-CR-004: Caregiver Search Results
| Field | Value |
|-------|-------|
| **Screen Name** | Caregiver Search Results |
| **Route** | `/search/results` |
| **Roles** | Care Receiver, Family Member |
| **Purpose** | Display caregivers matching search criteria with verification badges |
| **Feature References** | STORY-04-01, STORY-04-02, STORY-04-03, Feature Map 4.1, 4.2, 4.4 |
| **Preconditions** | Search executed |
| **Key States** | Results List, Empty Results, Filter Applied |
| **Data Sensitivity** | Medium |
| **Status** | Confirmed (MVP) |

#### SCR-CR-005: Caregiver Profile (Public View)
| Field | Value |
|-------|-------|
| **Screen Name** | Caregiver Profile |
| **Route** | `/caregivers/:caregiverId` |
| **Roles** | Care Receiver, Family Member |
| **Purpose** | View caregiver details: bio, conditions, skills, qualifications, DBS, ratings, availability |
| **Feature References** | STORY-04-04, Feature Map 4.4 |
| **Preconditions** | Caregiver profile exists and is visible (verified) |
| **Key States** | Default, Not Found, Profile Hidden (Unverified) |
| **Data Sensitivity** | Medium |
| **Status** | Confirmed (MVP) |

#### SCR-CR-006: Booking Request Form
| Field | Value |
|-------|-------|
| **Screen Name** | Booking Request |
| **Route** | `/bookings/new/:caregiverId` |
| **Roles** | Care Receiver, Family Member (with booking permission) |
| **Purpose** | Create booking request specifying date, time, care needs, emergency contact |
| **Feature References** | STORY-05-01, Feature Map 5.2 |
| **Preconditions** | Caregiver available for requested time, Care Receiver has payment method |
| **Key States** | Default, Date Selection, Time Selection, Care Needs Entry, Emergency Contact, Payment Authorization, Confirmation |
| **Data Sensitivity** | High (PII, Health Data, Payment) |
| **Status** | Confirmed (MVP) |

#### SCR-CR-007: Booking List
| Field | Value |
|-------|-------|
| **Screen Name** | My Bookings |
| **Route** | `/bookings` |
| **Roles** | Care Receiver, Family Member |
| **Purpose** | View all bookings filtered by status (requested, accepted, completed, cancelled) |
| **Feature References** | STORY-18-04, Feature Map 18.4 |
| **Preconditions** | Authenticated |
| **Key States** | Default, Empty, Filtered by Status |
| **Data Sensitivity** | Medium |
| **Status** | Confirmed (MVP) |

#### SCR-CR-008: Booking Detail
| Field | Value |
|-------|-------|
| **Screen Name** | Booking Detail |
| **Route** | `/bookings/:bookingId` |
| **Roles** | Care Receiver, Family Member |
| **Purpose** | View booking details, cancel booking, confirm completion, leave review, report issue |
| **Feature References** | STORY-05-04, STORY-05-05, Feature Map 5.5, 5.6, 5.7 |
| **Preconditions** | Booking exists, user is associated party |
| **Key States** | Requested, Accepted, In Progress, Completed, Cancelled, Disputed |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP) |

#### SCR-CR-009: Booking Cancellation
| Field | Value |
|-------|-------|
| **Screen Name** | Cancel Booking |
| **Route** | `/bookings/:bookingId/cancel` |
| **Roles** | Care Receiver, Family Member (with booking permission) |
| **Purpose** | Cancel booking with cancellation policy displayed |
| **Feature References** | STORY-05-05, Feature Map 5.7 |
| **Preconditions** | Booking in cancellable state (requested or accepted, before start time) |
| **Key States** | Cancellation Policy Display, Confirm Cancellation, Cancellation Complete |
| **Data Sensitivity** | Medium |
| **Status** | Confirmed (MVP) |

#### SCR-CR-010: Calendar View
| Field | Value |
|-------|-------|
| **Screen Name** | Care Calendar |
| **Route** | `/calendar` |
| **Roles** | Care Receiver, Family Member |
| **Purpose** | View upcoming bookings in calendar format |
| **Feature References** | STORY-15-03, Feature Map 15.4 |
| **Preconditions** | Authenticated |
| **Key States** | Month View, Week View, List View, Empty Calendar |
| **Data Sensitivity** | Medium |
| **Status** | Confirmed (MVP) |

#### SCR-CR-011: Message Inbox
| Field | Value |
|-------|-------|
| **Screen Name** | Messages |
| **Route** | `/messages` |
| **Roles** | Care Receiver, Family Member |
| **Purpose** | View all message threads with caregivers |
| **Feature References** | STORY-18-05, Feature Map 6.1 |
| **Preconditions** | Authenticated |
| **Key States** | Default, No Messages, Unread Messages |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP) |

#### SCR-CR-012: Message Thread
| Field | Value |
|-------|-------|
| **Screen Name** | Message Thread |
| **Route** | `/messages/:threadId` |
| **Roles** | Care Receiver, Family Member |
| **Purpose** | View and send messages in conversation with specific caregiver |
| **Feature References** | STORY-06-01, Feature Map 6.1 |
| **Preconditions** | Thread exists |
| **Key States** | Default, Message Blocked (Payment Keywords), Message Flagged (Safeguarding Keywords) |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP) |

#### SCR-CR-013: Payment Methods
| Field | Value |
|-------|-------|
| **Screen Name** | Payment Methods |
| **Route** | `/settings/payment` |
| **Roles** | Care Receiver, Family Member (with payment permission) |
| **Purpose** | Add, update, remove payment cards (Stripe Elements) |
| **Feature References** | STORY-07-01, Feature Map 7.1 |
| **Preconditions** | Authenticated |
| **Key States** | Default, Add Card Form, Card Added, Card Removed |
| **Data Sensitivity** | High (Payment Card - PCI Scope) |
| **Status** | Confirmed (MVP) |

#### SCR-CR-014: Transaction History
| Field | Value |
|-------|-------|
| **Screen Name** | Transaction History |
| **Route** | `/payments/history` |
| **Roles** | Care Receiver, Family Member |
| **Purpose** | View all payments and refunds with downloadable receipts |
| **Feature References** | STORY-18-06, Feature Map 7.9 |
| **Preconditions** | Authenticated |
| **Key States** | Default, Empty, Filtered |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP) |

#### SCR-CR-015: Leave Review
| Field | Value |
|-------|-------|
| **Screen Name** | Leave Review |
| **Route** | `/bookings/:bookingId/review` |
| **Roles** | Care Receiver, Family Member |
| **Purpose** | Submit star rating and written review after booking completion |
| **Feature References** | STORY-08-01, Feature Map 8.1 |
| **Preconditions** | Booking completed, within 14-day review window |
| **Key States** | Default, Review Submitted, Review Window Expired |
| **Data Sensitivity** | Medium |
| **Status** | Confirmed (MVP) |

#### SCR-CR-016: Emergency Contacts
| Field | Value |
|-------|-------|
| **Screen Name** | Emergency Contacts |
| **Route** | `/settings/emergency-contacts` |
| **Roles** | Care Receiver, Family Member (with full access) |
| **Purpose** | Add and manage emergency contact details |
| **Feature References** | STORY-14-01, Feature Map 14.1 |
| **Preconditions** | Authenticated |
| **Key States** | Default, Add Contact, Edit Contact, Verify Contact Phone |
| **Data Sensitivity** | High (PII) |
| **Status** | Confirmed (MVP) |

#### SCR-CR-017: Account Settings
| Field | Value |
|-------|-------|
| **Screen Name** | Account Settings |
| **Route** | `/settings/account` |
| **Roles** | Care Receiver, Family Member |
| **Purpose** | Update email, phone, password, notification preferences |
| **Feature References** | Feature Map 18.9, 19.6 |
| **Preconditions** | Authenticated |
| **Key States** | Default, Editing, Save Success |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP) |

#### SCR-CR-018: Identity Verification
| Field | Value |
|-------|-------|
| **Screen Name** | Identity Verification |
| **Route** | `/verify/identity` |
| **Roles** | Care Receiver |
| **Purpose** | Upload photo ID for identity verification |
| **Feature References** | STORY-10-01, Feature Map 10.1 |
| **Preconditions** | Authenticated, not yet verified |
| **Key States** | Default, Upload in Progress, Pending Admin Review, Verified, Rejected |
| **Data Sensitivity** | High (Identity Documents) |
| **Status** | Confirmed (MVP) |

#### SCR-CR-019: Family Member Management
| Field | Value |
|-------|-------|
| **Screen Name** | Family Members |
| **Route** | `/settings/family` |
| **Roles** | Care Receiver |
| **Purpose** | Invite family members, set permissions, revoke access |
| **Feature References** | STORY-16-01, STORY-16-02, Feature Map 16.2, 16.3 |
| **Preconditions** | Authenticated as Care Receiver |
| **Key States** | Default, Invite Sent, Member Linked, Permissions Editing |
| **Data Sensitivity** | Medium |
| **Status** | Confirmed (MVP) |

#### SCR-CR-020: Safeguarding Report
| Field | Value |
|-------|-------|
| **Screen Name** | Report Safeguarding Concern |
| **Route** | `/report/safeguarding` |
| **Roles** | Care Receiver, Family Member, Caregiver |
| **Purpose** | Report abuse, neglect, exploitation, or other safeguarding concern |
| **Feature References** | STORY-09-01, Feature Map 9.1 |
| **Preconditions** | Authenticated |
| **Key States** | Default, Concern Type Selection, Details Entry, Evidence Upload, Submitted |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP - Care Act Required) |

#### SCR-CR-021: GDPR Data Export Request
| Field | Value |
|-------|-------|
| **Screen Name** | Download My Data |
| **Route** | `/settings/data-export` |
| **Roles** | Care Receiver, Family Member, Caregiver |
| **Purpose** | Request export of all personal data (GDPR right of access) |
| **Feature References** | STORY-13-03, Feature Map 13.4 |
| **Preconditions** | Authenticated |
| **Key States** | Default, Request Submitted, Export Ready, Download Complete |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP - GDPR Required) |

#### SCR-CR-022: Account Deletion Request
| Field | Value |
|-------|-------|
| **Screen Name** | Delete My Account |
| **Route** | `/settings/delete-account` |
| **Roles** | Care Receiver, Family Member, Caregiver |
| **Purpose** | Request account deletion (GDPR right to erasure) |
| **Feature References** | STORY-13-03, Feature Map 13.4 |
| **Preconditions** | Authenticated, no active bookings |
| **Key States** | Default, Confirmation Required, Deletion Scheduled, Active Bookings Warning |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP - GDPR Required) |

---

### Role: Caregiver

#### SCR-CG-001: Caregiver Dashboard
| Field | Value |
|-------|-------|
| **Screen Name** | Caregiver Dashboard |
| **Route** | `/caregiver/dashboard` |
| **Roles** | Caregiver |
| **Purpose** | Overview of today's bookings, pending requests, earnings, verification status |
| **Feature References** | STORY-17-01, Feature Map 17.1 |
| **Preconditions** | Authenticated as Caregiver |
| **Key States** | Default, Pending Verification, Verification Complete, Booking Requests Pending |
| **Data Sensitivity** | Medium |
| **Status** | Confirmed (MVP) |

#### SCR-CG-002: Caregiver Onboarding
| Field | Value |
|-------|-------|
| **Screen Name** | Caregiver Onboarding |
| **Route** | `/caregiver/onboarding` |
| **Roles** | Caregiver (Pending Verification) |
| **Purpose** | Guide caregiver through profile setup, verification document uploads |
| **Feature References** | Feature Map 2.1-2.6, 10.2-10.5 |
| **Preconditions** | Registered, not yet verified |
| **Key States** | Profile Setup, Document Upload, DBS Upload, Qualification Upload, Pending Review |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP) |

#### SCR-CG-003: Profile Management
| Field | Value |
|-------|-------|
| **Screen Name** | My Profile |
| **Route** | `/caregiver/profile` |
| **Roles** | Caregiver |
| **Purpose** | Update bio, photo, hourly rate, service radius |
| **Feature References** | STORY-17-05, Feature Map 17.6 |
| **Preconditions** | Authenticated |
| **Key States** | Default, Editing, Save Success, Photo Upload |
| **Data Sensitivity** | Medium |
| **Status** | Confirmed (MVP) |

#### SCR-CG-004: Medical Condition Experience
| Field | Value |
|-------|-------|
| **Screen Name** | Medical Condition Experience |
| **Route** | `/caregiver/profile/conditions` |
| **Roles** | Caregiver |
| **Purpose** | Declare experience with specific medical conditions (dementia, Parkinson's, etc.) |
| **Feature References** | STORY-02-01, Feature Map 2.1 |
| **Preconditions** | Authenticated |
| **Key States** | Default, Adding Condition, Pending Verification, Verified |
| **Data Sensitivity** | Medium |
| **Status** | Confirmed (MVP) |

#### SCR-CG-005: Care Skills Profile
| Field | Value |
|-------|-------|
| **Screen Name** | Care Skills |
| **Route** | `/caregiver/profile/skills` |
| **Roles** | Caregiver |
| **Purpose** | Declare care skills (personal care, mobility assistance, medication prompting, etc.) |
| **Feature References** | STORY-02-02, Feature Map 2.2 |
| **Preconditions** | Authenticated |
| **Key States** | Default, Adding Skill, Pending Verification, Verified |
| **Data Sensitivity** | Medium |
| **Status** | Confirmed (MVP) |

#### SCR-CG-006: Qualifications & Training
| Field | Value |
|-------|-------|
| **Screen Name** | Qualifications & Training |
| **Route** | `/caregiver/profile/qualifications` |
| **Roles** | Caregiver |
| **Purpose** | Upload qualification certificates (NVQ, First Aid, Safeguarding, etc.) |
| **Feature References** | STORY-02-03, Feature Map 2.3 |
| **Preconditions** | Authenticated |
| **Key States** | Default, Upload in Progress, Pending Verification, Verified, Expired |
| **Data Sensitivity** | Medium |
| **Status** | Confirmed (MVP) |

#### SCR-CG-007: Service Types
| Field | Value |
|-------|-------|
| **Screen Name** | Service Types |
| **Route** | `/caregiver/profile/services` |
| **Roles** | Caregiver |
| **Purpose** | Define services offered (companionship, personal care, medical condition support) |
| **Feature References** | STORY-02-04, Feature Map 2.5 |
| **Preconditions** | Authenticated, DBS verified for personal care |
| **Key States** | Default, Service Enabled, Service Blocked (Verification Required) |
| **Data Sensitivity** | Low |
| **Status** | Confirmed (MVP) |

#### SCR-CG-008: Identity Verification (Caregiver)
| Field | Value |
|-------|-------|
| **Screen Name** | Identity Verification |
| **Route** | `/caregiver/verify/identity` |
| **Roles** | Caregiver |
| **Purpose** | Upload photo ID, proof of address, selfie for liveness check |
| **Feature References** | STORY-10-02, Feature Map 10.2 |
| **Preconditions** | Authenticated, not yet identity verified |
| **Key States** | Default, ID Upload, Address Upload, Selfie Capture, Pending Review, Verified, Rejected |
| **Data Sensitivity** | High (Identity Documents) |
| **Status** | Confirmed (MVP) |

#### SCR-CG-009: Right to Work Verification
| Field | Value |
|-------|-------|
| **Screen Name** | Right to Work |
| **Route** | `/caregiver/verify/right-to-work` |
| **Roles** | Caregiver |
| **Purpose** | Submit right to work evidence (UK passport or UKVI share code) |
| **Feature References** | STORY-10-03, Feature Map 10.3 |
| **Preconditions** | Authenticated, not yet right to work verified |
| **Key States** | Default, UK/Irish Citizen, Non-UK Citizen (Share Code Entry), Pending Review, Verified, Rejected, Visa Expiring |
| **Data Sensitivity** | High (Immigration Status) |
| **Status** | Confirmed (MVP) |

#### SCR-CG-010: DBS Check Submission
| Field | Value |
|-------|-------|
| **Screen Name** | DBS Check |
| **Route** | `/caregiver/verify/dbs` |
| **Roles** | Caregiver |
| **Purpose** | Upload Enhanced DBS certificate for verification |
| **Feature References** | STORY-10-04, Feature Map 10.4 |
| **Preconditions** | Authenticated, not yet DBS verified |
| **Key States** | Default, Certificate Upload, Pending Review, Verified, Rejected, Expired |
| **Data Sensitivity** | High (Criminal Record Check) |
| **Status** | Confirmed (MVP - Safeguarding Required) |

#### SCR-CG-011: Availability Calendar
| Field | Value |
|-------|-------|
| **Screen Name** | Availability Calendar |
| **Route** | `/caregiver/calendar` |
| **Roles** | Caregiver |
| **Purpose** | Set recurring availability, block dates, view bookings |
| **Feature References** | STORY-15-01, STORY-15-04, Feature Map 15.1, 15.5 |
| **Preconditions** | Authenticated |
| **Key States** | Default, Setting Availability, Blocking Date, Booking Displayed |
| **Data Sensitivity** | Low |
| **Status** | Confirmed (MVP) |

#### SCR-CG-012: Booking Requests
| Field | Value |
|-------|-------|
| **Screen Name** | Booking Requests |
| **Route** | `/caregiver/bookings/requests` |
| **Roles** | Caregiver |
| **Purpose** | View and respond to pending booking requests |
| **Feature References** | STORY-05-02, STORY-17-02, Feature Map 5.3 |
| **Preconditions** | Authenticated, verified |
| **Key States** | Default, No Requests, Request Detail View, Accept/Decline Modal |
| **Data Sensitivity** | High (Care Receiver Health Data) |
| **Status** | Confirmed (MVP) |

#### SCR-CG-013: Booking Request Detail
| Field | Value |
|-------|-------|
| **Screen Name** | Booking Request Detail |
| **Route** | `/caregiver/bookings/requests/:requestId` |
| **Roles** | Caregiver |
| **Purpose** | Review request details, care needs, accept or decline with reason |
| **Feature References** | STORY-05-02, Feature Map 5.3 |
| **Preconditions** | Request exists, not expired |
| **Key States** | Default, Accepting, Declining (Reason Entry), Accepted, Declined, Expired |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP) |

#### SCR-CG-014: Upcoming Bookings
| Field | Value |
|-------|-------|
| **Screen Name** | Upcoming Bookings |
| **Route** | `/caregiver/bookings/upcoming` |
| **Roles** | Caregiver |
| **Purpose** | View accepted bookings with care receiver details |
| **Feature References** | STORY-17-03, Feature Map 17.3 |
| **Preconditions** | Authenticated |
| **Key States** | Default, No Bookings, Booking List |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP) |

#### SCR-CG-015: Booking Detail (Caregiver)
| Field | Value |
|-------|-------|
| **Screen Name** | Booking Detail |
| **Route** | `/caregiver/bookings/:bookingId` |
| **Roles** | Caregiver |
| **Purpose** | View booking details, mark in-progress/completed, report incident, cancel |
| **Feature References** | STORY-05-04, STORY-05-06, Feature Map 5.4, 5.5, 5.6 |
| **Preconditions** | Booking exists, caregiver is assigned |
| **Key States** | Accepted, In Progress, Completed, Cancelled, Emergency |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP) |

#### SCR-CG-016: Active Booking View
| Field | Value |
|-------|-------|
| **Screen Name** | Active Booking |
| **Route** | `/caregiver/bookings/:bookingId/active` |
| **Roles** | Caregiver |
| **Purpose** | In-progress booking view with emergency button, incident reporting |
| **Feature References** | STORY-11-02, STORY-14-02, Feature Map 11.6, 14.2 |
| **Preconditions** | Booking is in "in_progress" status |
| **Key States** | Active, Emergency Triggered, Incident Reporting |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP) |

#### SCR-CG-017: Incident Report Form
| Field | Value |
|-------|-------|
| **Screen Name** | Report Incident |
| **Route** | `/caregiver/bookings/:bookingId/incident` |
| **Roles** | Caregiver |
| **Purpose** | Report falls, injuries, medical emergencies during booking |
| **Feature References** | STORY-11-01, Feature Map 11.2 |
| **Preconditions** | Active or recently completed booking |
| **Key States** | Default, Incident Type Selection, Details Entry, Actions Taken, Evidence Upload, Submitted |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP - CQC Required) |

#### SCR-CG-018: Emergency Screen
| Field | Value |
|-------|-------|
| **Screen Name** | Emergency |
| **Route** | `/caregiver/emergency/:bookingId` |
| **Roles** | Caregiver |
| **Purpose** | Emergency button triggered - display protocol, notify admin and emergency contacts |
| **Feature References** | STORY-11-02, STORY-14-02, Feature Map 11.6, 14.2 |
| **Preconditions** | Emergency button pressed during active booking |
| **Key States** | Emergency Protocol Display, Notifications Sent, Post-Emergency |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP - Safeguarding Required) |

#### SCR-CG-019: Earnings Dashboard
| Field | Value |
|-------|-------|
| **Screen Name** | Earnings |
| **Route** | `/caregiver/earnings` |
| **Roles** | Caregiver |
| **Purpose** | View total earnings, pending payouts, payout history |
| **Feature References** | STORY-17-04, Feature Map 17.4 |
| **Preconditions** | Authenticated, Stripe Connect setup |
| **Key States** | Default, No Earnings, Payout Pending, Payout History |
| **Data Sensitivity** | High (Financial) |
| **Status** | Confirmed (MVP) |

#### SCR-CG-020: Payout Setup (Stripe Connect)
| Field | Value |
|-------|-------|
| **Screen Name** | Payout Setup |
| **Route** | `/caregiver/earnings/setup` |
| **Roles** | Caregiver |
| **Purpose** | Complete Stripe Connect onboarding for payouts |
| **Feature References** | STORY-07-04, Feature Map 7.4 |
| **Preconditions** | Authenticated, not yet Stripe Connect verified |
| **Key States** | Default, Stripe Onboarding Redirect, Pending Verification, Verified, Failed |
| **Data Sensitivity** | High (Bank Account, National Insurance) |
| **Status** | Confirmed (MVP) |

#### SCR-CG-021: Message Inbox (Caregiver)
| Field | Value |
|-------|-------|
| **Screen Name** | Messages |
| **Route** | `/caregiver/messages` |
| **Roles** | Caregiver |
| **Purpose** | View all message threads with care receivers |
| **Feature References** | STORY-17-06, Feature Map 17.7 |
| **Preconditions** | Authenticated |
| **Key States** | Default, No Messages, Unread Messages |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP) |

#### SCR-CG-022: Message Thread (Caregiver)
| Field | Value |
|-------|-------|
| **Screen Name** | Message Thread |
| **Route** | `/caregiver/messages/:threadId` |
| **Roles** | Caregiver |
| **Purpose** | View and send messages with specific care receiver |
| **Feature References** | STORY-06-01, Feature Map 6.1 |
| **Preconditions** | Thread exists |
| **Key States** | Default, Message Blocked, Message Flagged |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP) |

#### SCR-CG-023: Emergency Training
| Field | Value |
|-------|-------|
| **Screen Name** | Emergency Training |
| **Route** | `/caregiver/training/emergency` |
| **Roles** | Caregiver |
| **Purpose** | Complete mandatory emergency preparedness training module |
| **Feature References** | STORY-14-05, Feature Map 14.7 |
| **Preconditions** | Authenticated |
| **Key States** | Training Module, Quiz, Pass, Fail (Retry), Certificate |
| **Data Sensitivity** | Low |
| **Status** | Confirmed (MVP - Safeguarding Required) |

#### SCR-CG-024: Account Settings (Caregiver)
| Field | Value |
|-------|-------|
| **Screen Name** | Account Settings |
| **Route** | `/caregiver/settings` |
| **Roles** | Caregiver |
| **Purpose** | Update email, phone, password, notification preferences |
| **Feature References** | Feature Map 17.11 |
| **Preconditions** | Authenticated |
| **Key States** | Default, Editing, Save Success |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP) |

---

### Role: Admin

#### SCR-ADM-001: Admin Dashboard
| Field | Value |
|-------|-------|
| **Screen Name** | Admin Dashboard |
| **Route** | `/admin` |
| **Roles** | Admin, Safeguarding Officer |
| **Purpose** | Platform health metrics, pending tasks, urgent items |
| **Feature References** | STORY-12-01, STORY-20-01, Feature Map 12.1, 20.1 |
| **Preconditions** | Authenticated as Admin with 2FA |
| **Key States** | Default, Urgent Alerts, Task Queues |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP) |

#### SCR-ADM-002: User Search
| Field | Value |
|-------|-------|
| **Screen Name** | User Search |
| **Route** | `/admin/users` |
| **Roles** | Admin |
| **Purpose** | Search users by name, email, phone, user ID |
| **Feature References** | STORY-12-02, Feature Map 12.2 |
| **Preconditions** | Authenticated as Admin |
| **Key States** | Default, Search Results |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP) |

#### SCR-ADM-003: User Detail
| Field | Value |
|-------|-------|
| **Screen Name** | User Detail |
| **Route** | `/admin/users/:userId` |
| **Roles** | Admin |
| **Purpose** | View full user profile, bookings, messages, payments, verification status |
| **Feature References** | STORY-12-02, Feature Map 12.2 |
| **Preconditions** | Authenticated as Admin |
| **Key States** | Default, Edit Mode, Action Modal (Suspend/Ban) |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP) |

#### SCR-ADM-004: Caregiver Application Queue
| Field | Value |
|-------|-------|
| **Screen Name** | Caregiver Applications |
| **Route** | `/admin/applications` |
| **Roles** | Admin |
| **Purpose** | Review pending caregiver applications |
| **Feature References** | STORY-12-03, Feature Map 12.3 |
| **Preconditions** | Authenticated as Admin |
| **Key States** | Default, Empty Queue, Application List |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP) |

#### SCR-ADM-005: Caregiver Application Review
| Field | Value |
|-------|-------|
| **Screen Name** | Application Review |
| **Route** | `/admin/applications/:applicationId` |
| **Roles** | Admin |
| **Purpose** | Review uploaded documents, approve or reject application |
| **Feature References** | STORY-12-03, Feature Map 12.3 |
| **Preconditions** | Application exists |
| **Key States** | Document Review, Approve Modal, Reject Modal (Reason Required) |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP) |

#### SCR-ADM-006: Verification Queue
| Field | Value |
|-------|-------|
| **Screen Name** | Verification Queue |
| **Route** | `/admin/verifications` |
| **Roles** | Admin |
| **Purpose** | Manage pending verifications (identity, DBS, qualifications, right to work) |
| **Feature References** | STORY-12-04, Feature Map 12.4 |
| **Preconditions** | Authenticated as Admin |
| **Key States** | Default, Filtered by Type, Empty Queue |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP) |

#### SCR-ADM-007: Verification Review
| Field | Value |
|-------|-------|
| **Screen Name** | Verification Review |
| **Route** | `/admin/verifications/:verificationId` |
| **Roles** | Admin |
| **Purpose** | Review verification documents, approve or reject |
| **Feature References** | STORY-10-05, Feature Map 10.5 |
| **Preconditions** | Verification request exists |
| **Key States** | Document Viewer, Approve, Reject (Reason Required), Request More Info |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP) |

#### SCR-ADM-008: DBS Review
| Field | Value |
|-------|-------|
| **Screen Name** | DBS Review |
| **Route** | `/admin/verifications/dbs/:verificationId` |
| **Roles** | Admin |
| **Purpose** | Verify DBS certificate authenticity, level, barred list check |
| **Feature References** | STORY-10-04, Feature Map 10.4 |
| **Preconditions** | DBS verification request exists |
| **Key States** | Certificate Review, Verify Details, Criminal Record Found (Risk Assessment), Approve, Reject |
| **Data Sensitivity** | High (Criminal Records) |
| **Status** | Confirmed (MVP - Safeguarding Critical) |

#### SCR-ADM-009: Right to Work Review
| Field | Value |
|-------|-------|
| **Screen Name** | Right to Work Review |
| **Route** | `/admin/verifications/rtw/:verificationId` |
| **Roles** | Admin |
| **Purpose** | Verify right to work via UKVI share code check |
| **Feature References** | STORY-10-03, Feature Map 10.3 |
| **Preconditions** | Right to work verification request exists |
| **Key States** | Share Code Entry, Gov.uk Check, Visa Conditions Review, Approve, Reject |
| **Data Sensitivity** | High (Immigration Status) |
| **Status** | Confirmed (MVP - Immigration Act Required) |

#### SCR-ADM-010: Booking Management
| Field | Value |
|-------|-------|
| **Screen Name** | Booking Management |
| **Route** | `/admin/bookings` |
| **Roles** | Admin |
| **Purpose** | Search and view all bookings |
| **Feature References** | STORY-12-05, Feature Map 12.5 |
| **Preconditions** | Authenticated as Admin |
| **Key States** | Default, Search Results, Filtered |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP) |

#### SCR-ADM-011: Booking Detail (Admin)
| Field | Value |
|-------|-------|
| **Screen Name** | Booking Detail |
| **Route** | `/admin/bookings/:bookingId` |
| **Roles** | Admin |
| **Purpose** | View full booking details, messages, payment status, take admin actions |
| **Feature References** | STORY-12-05, Feature Map 12.5 |
| **Preconditions** | Booking exists |
| **Key States** | Default, Cancel Modal, Refund Modal, Override Completion |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP) |

#### SCR-ADM-012: Dispute Queue
| Field | Value |
|-------|-------|
| **Screen Name** | Disputes |
| **Route** | `/admin/disputes` |
| **Roles** | Admin |
| **Purpose** | View and manage payment disputes |
| **Feature References** | STORY-12-05, STORY-07-06, Feature Map 12.6, 7.7 |
| **Preconditions** | Authenticated as Admin |
| **Key States** | Default, Empty Queue, Dispute List |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP) |

#### SCR-ADM-013: Dispute Resolution
| Field | Value |
|-------|-------|
| **Screen Name** | Dispute Resolution |
| **Route** | `/admin/disputes/:disputeId` |
| **Roles** | Admin |
| **Purpose** | Investigate dispute, review evidence, decide refund/payment outcome |
| **Feature References** | STORY-07-06, Feature Map 7.7 |
| **Preconditions** | Dispute exists |
| **Key States** | Evidence Review, Contact Parties, Full Refund, Partial Refund, No Refund, Escalate |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP) |

#### SCR-ADM-014: Safeguarding Reports Queue
| Field | Value |
|-------|-------|
| **Screen Name** | Safeguarding Reports |
| **Route** | `/admin/safeguarding` |
| **Roles** | Admin, Safeguarding Officer |
| **Purpose** | View all safeguarding reports, prioritized by severity |
| **Feature References** | STORY-09-02, STORY-12-06, STORY-20-02, Feature Map 9.2, 12.7, 20.2 |
| **Preconditions** | Authenticated as Admin |
| **Key States** | Default, Critical Highlighted, Filtered by Severity/Type |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP - Care Act Required) |

#### SCR-ADM-015: Safeguarding Report Detail
| Field | Value |
|-------|-------|
| **Screen Name** | Safeguarding Report Detail |
| **Route** | `/admin/safeguarding/:reportId` |
| **Roles** | Admin, Safeguarding Officer |
| **Purpose** | Investigate safeguarding report, document actions, escalate if needed |
| **Feature References** | STORY-09-02, Feature Map 9.2 |
| **Preconditions** | Report exists |
| **Key States** | Under Investigation, Contact Reporter, Contact Reported User, Add Notes, Close Report |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP - Care Act Required) |

#### SCR-ADM-016: SAB Referral Form
| Field | Value |
|-------|-------|
| **Screen Name** | SAB Referral |
| **Route** | `/admin/safeguarding/:reportId/referral` |
| **Roles** | Admin, Safeguarding Officer |
| **Purpose** | Complete external referral to Safeguarding Adults Board |
| **Feature References** | STORY-09-03, Feature Map 9.3 |
| **Preconditions** | Safeguarding report escalated |
| **Key States** | Referral Form, Local Authority Selection, Submit to SAB, Response Tracking |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP - Care Act Required) |

#### SCR-ADM-017: User Suspension Modal
| Field | Value |
|-------|-------|
| **Screen Name** | User Suspension |
| **Route** | `/admin/users/:userId/suspend` (modal) |
| **Roles** | Admin |
| **Purpose** | Suspend user account with reason and duration |
| **Feature References** | STORY-09-04, Feature Map 9.5 |
| **Preconditions** | User exists, not already suspended |
| **Key States** | Reason Entry, Duration Selection (7/30 days/Indefinite), Confirm |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP) |

#### SCR-ADM-018: User Ban Modal
| Field | Value |
|-------|-------|
| **Screen Name** | User Ban |
| **Route** | `/admin/users/:userId/ban` (modal) |
| **Roles** | Admin |
| **Purpose** | Permanently ban user account |
| **Feature References** | STORY-09-04, Feature Map 9.5 |
| **Preconditions** | User exists |
| **Key States** | Reason Entry, Confirm Permanent Ban |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP) |

#### SCR-ADM-019: Incident Reports
| Field | Value |
|-------|-------|
| **Screen Name** | Incident Reports |
| **Route** | `/admin/incidents` |
| **Roles** | Admin |
| **Purpose** | View all clinical incident reports (falls, injuries, emergencies) |
| **Feature References** | STORY-11-04, Feature Map 11.9 |
| **Preconditions** | Authenticated as Admin |
| **Key States** | Default, Filtered by Severity, Filtered by Type |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP - CQC Required) |

#### SCR-ADM-020: Incident Report Detail
| Field | Value |
|-------|-------|
| **Screen Name** | Incident Report Detail |
| **Route** | `/admin/incidents/:incidentId` |
| **Roles** | Admin |
| **Purpose** | Review incident, add follow-up notes, escalate serious incidents |
| **Feature References** | STORY-11-04, Feature Map 11.9 |
| **Preconditions** | Incident exists |
| **Key States** | Under Review, Follow-Up Notes, Escalate to Senior Admin, Close Incident |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP - CQC Required) |

#### SCR-ADM-021: Low Rating Escalations
| Field | Value |
|-------|-------|
| **Screen Name** | Low Rating Reviews |
| **Route** | `/admin/reviews/low-ratings` |
| **Roles** | Admin |
| **Purpose** | Review caregivers with low ratings (2 stars or below) |
| **Feature References** | STORY-08-03, Feature Map 8.6 |
| **Preconditions** | Authenticated as Admin |
| **Key States** | Default, Empty Queue, Review List |
| **Data Sensitivity** | Medium |
| **Status** | Confirmed (MVP) |

#### SCR-ADM-022: Message Reports
| Field | Value |
|-------|-------|
| **Screen Name** | Reported Messages |
| **Route** | `/admin/messages/reports` |
| **Roles** | Admin |
| **Purpose** | Review reported messages for safeguarding, harassment, off-platform payments |
| **Feature References** | STORY-06-04, Feature Map 6.3 |
| **Preconditions** | Authenticated as Admin |
| **Key States** | Default, Message Review, Take Action |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP) |

#### SCR-ADM-023: Audit Log
| Field | Value |
|-------|-------|
| **Screen Name** | Audit Log |
| **Route** | `/admin/audit` |
| **Roles** | Admin |
| **Purpose** | View immutable audit trail of all admin actions |
| **Feature References** | STORY-12-07, STORY-13-01, Feature Map 12.10, 13.1 |
| **Preconditions** | Authenticated as Admin |
| **Key States** | Default, Search Results, Filtered by Admin/Action Type/Date |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP - GDPR/CQC Required) |

#### SCR-ADM-024: Platform Metrics
| Field | Value |
|-------|-------|
| **Screen Name** | Platform Metrics |
| **Route** | `/admin/metrics` |
| **Roles** | Admin |
| **Purpose** | View basic platform metrics (users, bookings, revenue, safeguarding reports) |
| **Feature References** | STORY-20-01, STORY-20-02, Feature Map 20.1 |
| **Preconditions** | Authenticated as Admin |
| **Key States** | Default, Date Range Filter |
| **Data Sensitivity** | Medium |
| **Status** | Confirmed (MVP) |

#### SCR-ADM-025: Admin User Management
| Field | Value |
|-------|-------|
| **Screen Name** | Admin Users |
| **Route** | `/admin/team` |
| **Roles** | Super Admin |
| **Purpose** | Manage admin accounts and roles |
| **Feature References** | Feature Map 12.11 |
| **Preconditions** | Authenticated as Super Admin |
| **Key States** | Default, Add Admin, Edit Permissions |
| **Data Sensitivity** | High |
| **Status** | Confirmed (MVP) |

---

## Route Tree (by System Domain)

### Auth Domain
```
/                                       # SCR-PUB-001 Homepage
/register/care-receiver                 # SCR-AUTH-001
/register/family                        # SCR-AUTH-002
/register/caregiver                     # SCR-AUTH-003
/verify/phone                           # SCR-AUTH-004
/verify/email/:token                    # SCR-AUTH-008
/login                                  # SCR-AUTH-005
/forgot-password                        # SCR-AUTH-006
/reset-password/:token                  # SCR-AUTH-007
/suspended                              # SCR-AUTH-009
```

### Public/Content Domain
```
/how-it-works/care-receivers            # SCR-PUB-002
/how-it-works/caregivers                # SCR-PUB-003
/pricing                                # SCR-PUB-004
/faqs                                   # SCR-PUB-005
/terms                                  # SCR-PUB-006
/privacy                                # SCR-PUB-007
/safeguarding-policy                    # SCR-PUB-008
/contact                                # SCR-PUB-009
```

### Discovery Domain
```
/search                                 # SCR-CR-003
/search/results                         # SCR-CR-004
/caregivers/:caregiverId                # SCR-CR-005
```

### Booking Domain (Care Receiver)
```
/bookings                               # SCR-CR-007
/bookings/new/:caregiverId              # SCR-CR-006
/bookings/:bookingId                    # SCR-CR-008
/bookings/:bookingId/cancel             # SCR-CR-009
/bookings/:bookingId/review             # SCR-CR-015
/calendar                               # SCR-CR-010
```

### Booking Domain (Caregiver)
```
/caregiver/calendar                     # SCR-CG-011
/caregiver/bookings/requests            # SCR-CG-012
/caregiver/bookings/requests/:requestId # SCR-CG-013
/caregiver/bookings/upcoming            # SCR-CG-014
/caregiver/bookings/:bookingId          # SCR-CG-015
/caregiver/bookings/:bookingId/active   # SCR-CG-016
/caregiver/bookings/:bookingId/incident # SCR-CG-017
/caregiver/emergency/:bookingId         # SCR-CG-018
```

### Payments Domain
```
/settings/payment                       # SCR-CR-013
/payments/history                       # SCR-CR-014
/caregiver/earnings                     # SCR-CG-019
/caregiver/earnings/setup               # SCR-CG-020
```

### Messaging Domain
```
/messages                               # SCR-CR-011
/messages/:threadId                     # SCR-CR-012
/caregiver/messages                     # SCR-CG-021
/caregiver/messages/:threadId           # SCR-CG-022
```

### Verification Domain
```
/verify/identity                        # SCR-CR-018
/caregiver/verify/identity              # SCR-CG-008
/caregiver/verify/right-to-work         # SCR-CG-009
/caregiver/verify/dbs                   # SCR-CG-010
```

### Safeguarding Domain
```
/report/safeguarding                    # SCR-CR-020
/admin/safeguarding                     # SCR-ADM-014
/admin/safeguarding/:reportId           # SCR-ADM-015
/admin/safeguarding/:reportId/referral  # SCR-ADM-016
/admin/incidents                        # SCR-ADM-019
/admin/incidents/:incidentId            # SCR-ADM-020
```

### Compliance Domain (GDPR)
```
/settings/data-export                   # SCR-CR-021
/settings/delete-account                # SCR-CR-022
```

### Dashboards Domain
```
/dashboard                              # SCR-CR-001
/caregiver/dashboard                    # SCR-CG-001
/admin                                  # SCR-ADM-001
```

### Profile/Settings Domain (Care Receiver)
```
/profile/care-needs                     # SCR-CR-002
/settings/emergency-contacts            # SCR-CR-016
/settings/account                       # SCR-CR-017
/settings/family                        # SCR-CR-019
```

### Profile/Settings Domain (Caregiver)
```
/caregiver/onboarding                   # SCR-CG-002
/caregiver/profile                      # SCR-CG-003
/caregiver/profile/conditions           # SCR-CG-004
/caregiver/profile/skills               # SCR-CG-005
/caregiver/profile/qualifications       # SCR-CG-006
/caregiver/profile/services             # SCR-CG-007
/caregiver/training/emergency           # SCR-CG-023
/caregiver/settings                     # SCR-CG-024
```

### Admin Domain
```
/admin                                  # SCR-ADM-001
/admin/users                            # SCR-ADM-002
/admin/users/:userId                    # SCR-ADM-003
/admin/users/:userId/suspend            # SCR-ADM-017 (modal)
/admin/users/:userId/ban                # SCR-ADM-018 (modal)
/admin/applications                     # SCR-ADM-004
/admin/applications/:applicationId      # SCR-ADM-005
/admin/verifications                    # SCR-ADM-006
/admin/verifications/:verificationId    # SCR-ADM-007
/admin/verifications/dbs/:verificationId # SCR-ADM-008
/admin/verifications/rtw/:verificationId # SCR-ADM-009
/admin/bookings                         # SCR-ADM-010
/admin/bookings/:bookingId              # SCR-ADM-011
/admin/disputes                         # SCR-ADM-012
/admin/disputes/:disputeId              # SCR-ADM-013
/admin/reviews/low-ratings              # SCR-ADM-021
/admin/messages/reports                 # SCR-ADM-022
/admin/audit                            # SCR-ADM-023
/admin/metrics                          # SCR-ADM-024
/admin/team                             # SCR-ADM-025
```

---

## MVP Route Subset

The following screens are classified as MVP based on `mvp-classification-analysis.md`:

### Authentication (9 screens)
- SCR-AUTH-001 through SCR-AUTH-009

### Public/Content (9 screens)
- SCR-PUB-001 through SCR-PUB-009

### Care Receiver/Family (22 screens)
- SCR-CR-001 through SCR-CR-022

### Caregiver (24 screens)
- SCR-CG-001 through SCR-CG-024

### Admin (25 screens)
- SCR-ADM-001 through SCR-ADM-025

**Total MVP Screens: 89**

---

## Compliance & Safeguarding Coverage

### GDPR Required Screens

| Requirement | Screen(s) | Status |
|-------------|-----------|--------|
| Privacy Policy publication | SCR-PUB-007 | Confirmed |
| Consent capture at registration | SCR-AUTH-001, SCR-AUTH-002, SCR-AUTH-003 | Confirmed |
| Right of access (data export) | SCR-CR-021 | Confirmed |
| Right to erasure (account deletion) | SCR-CR-022 | Confirmed |
| Audit log for data access | SCR-ADM-023 | Confirmed |
| Secure authentication | SCR-AUTH-005, SCR-AUTH-006, SCR-AUTH-007 | Confirmed |

### Care Act 2014 Required Screens

| Requirement | Screen(s) | Status |
|-------------|-----------|--------|
| Safeguarding policy publication | SCR-PUB-008 | Confirmed |
| Safeguarding concern reporting | SCR-CR-020 | Confirmed |
| Safeguarding incident management | SCR-ADM-014, SCR-ADM-015 | Confirmed |
| SAB referral capability | SCR-ADM-016 | Confirmed |
| User suspension for safeguarding | SCR-ADM-017, SCR-ADM-018 | Confirmed |
| Safeguarding audit trail | SCR-ADM-023 | Confirmed |

### Safeguarding Policies Required Screens

| Requirement | Screen(s) | Status |
|-------------|-----------|--------|
| DBS verification | SCR-CG-010, SCR-ADM-008 | Confirmed |
| Identity verification | SCR-CR-018, SCR-CG-008 | Confirmed |
| Right to work verification | SCR-CG-009, SCR-ADM-009 | Confirmed |
| Emergency response | SCR-CG-016, SCR-CG-018 | Confirmed |
| Incident reporting | SCR-CG-017, SCR-ADM-019, SCR-ADM-020 | Confirmed |
| Emergency training | SCR-CG-023 | Confirmed |
| Content filtering (off-platform payments) | SCR-CR-012, SCR-CG-022 | Confirmed |
| Message reporting | SCR-ADM-022 | Confirmed |

### CQC Readiness Required Screens

| Requirement | Screen(s) | Status |
|-------------|-----------|--------|
| Caregiver qualification verification | SCR-CG-006, SCR-ADM-007 | Confirmed |
| Clinical incident tracking | SCR-ADM-019, SCR-ADM-020 | Confirmed |
| Safeguarding reports | SCR-ADM-014, SCR-ADM-015 | Confirmed |
| Audit trail for compliance | SCR-ADM-023 | Confirmed |

### Consumer Rights Act Required Screens

| Requirement | Screen(s) | Status |
|-------------|-----------|--------|
| Terms of Service | SCR-PUB-006 | Confirmed |
| Clear pricing | SCR-PUB-004 | Confirmed |
| Booking cancellation with policy | SCR-CR-009 | Confirmed |
| Dispute resolution | SCR-ADM-012, SCR-ADM-013 | Confirmed |

### Equality Act 2010 Required Screens

| Requirement | Screen(s) | Status |
|-------------|-----------|--------|
| WCAG 2.1 AA accessible design | All screens | Confirmed (requirement) |
| Family accounts for cognitively impaired | SCR-CR-019, SCR-AUTH-002 | Confirmed |

---

## Product Gaps & Blockers

### GAP-01: Live-In Care Booking Flow
**Status**: Implied but not fully specified
**Issue**: Feature Map 5.8 describes live-in care special features (weekly/monthly, daily rates, accommodation requirements, break schedules), but MVP classification marks this as Post-MVP.
**Impact**: No dedicated live-in booking screens defined.
**Decision Required**: Confirm live-in care excluded from MVP, or define minimal live-in booking screens.

### GAP-02: Family Member LPA Upload
**Status**: Implied by Feature Map 16.10 and STORY-16-03
**Issue**: Mental Capacity Act compliance requires LPA verification for cognitively impaired care receivers, but no dedicated upload screen is defined.
**Impact**: Cannot verify family member authority for care receivers lacking capacity.
**Decision Required**: Add LPA upload screen or integrate into family member invitation flow.

### GAP-03: Gender Preference Justification
**Status**: Flagged in MVP Analysis (Equality Act section)
**Issue**: Feature Map 4.2 allows gender filtering "if requested by care receiver for personal care", but requires justification per Equality Act 2010.
**Impact**: No screen for capturing legitimate gender preference reason.
**Decision Required**: Add justification capture to search or booking flow, or remove gender filter.

### GAP-04: Cookie Consent Banner
**Status**: Implied by PECR compliance requirement
**Issue**: No dedicated cookie consent component defined.
**Impact**: Analytics cookies cannot be placed without consent.
**Decision Required**: Add cookie consent banner component (not a full screen, but required UI element).

### GAP-05: No-Show Dispute by Caregiver
**Status**: Implied by STORY-05-07
**Issue**: Story mentions caregiver can dispute no-show claim, but no dedicated caregiver dispute screen exists.
**Impact**: Caregiver has no mechanism to challenge unfair no-show reports.
**Decision Required**: Integrate into booking detail screen or create separate dispute submission flow.

### GAP-06: Caregiver Profile Preview
**Status**: Implied by Feature Map 17.6
**Issue**: Caregivers should be able to preview how care receivers see their profile, but no dedicated preview screen defined.
**Impact**: Caregivers cannot verify profile appearance before publishing.
**Decision Required**: Add "Preview Profile" action to caregiver profile management.

### GAP-07: Admin Refund Processing Screen
**Status**: Implied by Feature Map 7.6, 12.8
**Issue**: Manual refund capability mentioned but no dedicated admin refund screen defined.
**Impact**: Admin cannot process exceptional refunds outside standard cancellation flow.
**Decision Required**: Integrate into booking detail or create dedicated refund screen.

### GAP-08: Verification Expiry Management
**Status**: Implied by Feature Map 10.9
**Issue**: Ongoing verification and re-verification cycles mentioned as Post-MVP, but admin needs visibility into expiring verifications.
**Impact**: No proactive tracking of DBS/qualification expiry dates.
**Decision Required**: Add expiry alerts to admin dashboard or verification queue.

### GAP-09: CQC Registration Decision
**Status**: BLOCKED - Pre-launch legal decision required
**Issue**: MVP Analysis identifies HIGH PROBABILITY of CQC registration requirement, but decision not finalized.
**Impact**: May require additional CQC-specific admin screens not yet defined.
**Decision Required**: Legal opinion on CQC registration before finalizing screen inventory.

### GAP-10: Medication Assistance Boundaries
**Status**: BLOCKED - Clinical governance required
**Issue**: MVP Analysis identifies unclear boundaries between medication prompting and administration.
**Impact**: May require additional warnings or confirmations in booking flow.
**Decision Required**: Clinical governance policy before defining UI requirements.

---

## Screen Count Summary

| Role | MVP Screens |
|------|-------------|
| Public | 9 |
| Authentication | 9 |
| Care Receiver / Family | 22 |
| Caregiver | 24 |
| Admin | 25 |
| **Total** | **89** |

---

## Document Maintenance

This document should be updated when:
- New features are added to product backlog
- MVP classification changes
- Regulatory requirements change (CQC, GDPR, Care Act)
- Product gaps are resolved
- User research reveals missing screens
- Engineering identifies technical routing constraints

**Review Cycle**: Bi-weekly during active development, or as needed for regulatory changes.

---

## Appendix: Screen ID Reference

| ID Range | Domain |
|----------|--------|
| SCR-PUB-001 to SCR-PUB-009 | Public/Content |
| SCR-AUTH-001 to SCR-AUTH-009 | Authentication |
| SCR-CR-001 to SCR-CR-022 | Care Receiver/Family |
| SCR-CG-001 to SCR-CG-024 | Caregiver |
| SCR-ADM-001 to SCR-ADM-025 | Admin |

---

**END OF DOCUMENT**
