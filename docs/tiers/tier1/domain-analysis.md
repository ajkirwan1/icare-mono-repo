# iCare Domain Analysis

**Document Purpose**: Comprehensive domain analysis for the iCare elderly companionship marketplace to support the .NET 10 backend implementation using Domain-Driven Design (DDD).

**Status**: ACTIVE
**Last Updated**: 2026-02-14
**Author**: Product Director (analysis), for use by dotnet-ddd-architect agent

---

## Table of Contents

- [Part 1: Domain Overview](#part-1-domain-overview)
- [Part 2: Bounded Context Deep Dive](#part-2-bounded-context-deep-dive)
- [Part 3: Context Map](#part-3-context-map)
- [Part 4: Domain Events Catalog](#part-4-domain-events-catalog)
- [Part 5: Aggregate Design Decisions](#part-5-aggregate-design-decisions)
- [Part 6: Value Object Catalog](#part-6-value-object-catalog)
- [Part 7: Domain-to-Database Mapping](#part-7-domain-to-database-mapping)
- [Part 8: Risk Areas and Complexity Hotspots](#part-8-risk-areas-and-complexity-hotspots)

---

## Part 1: Domain Overview

### 1.1 What iCare Is

iCare is a UK elderly companionship marketplace operating as an **Introduction Agency** (not a CQC-registered care provider). The platform connects elderly care receivers (65+) and their family members with self-employed caregivers who provide non-regulated companionship services.

**Business Model**: Two-sided marketplace with escrow-based payment.
- Care receivers pay hourly rate + 5% service fee
- Caregivers receive hourly rate minus 15% platform commission
- Platform revenue = service fee + commission (20% of booking value)
- Commission rates are placeholders pending FDR-008 decision

**Regulatory Context**:
- **Introduction Agency model** per FDR-002 (no CQC registration required)
- Caregivers are **self-employed** (not employees)
- **Care Act 2014** safeguarding duties apply
- **UK GDPR** compliance required (standard personal data only at Tier 1; no health data)
- **Immigration Act** right-to-work verification required
- Companionship services are not "regulated activity" under the Safeguarding Vulnerable Groups Act 2006, so DBS is voluntary at Tier 1

### 1.2 Domain Actors

| Actor | Description | DDD Role |
|-------|-------------|----------|
| **Care Receiver** | Elderly person (65+) receiving companionship services | Core domain entity |
| **Family Member** | Proxy user who books on behalf of care receiver | Variant of Care Receiver actor |
| **Caregiver** | Self-employed individual providing companionship | Core domain entity |
| **Platform Admin** | Operations staff managing verifications, disputes, safeguarding | Supporting subdomain actor |
| **Safeguarding Officer** | Specialised admin handling Care Act 2014 incidents | Supporting subdomain actor |
| **Stripe** | External payment processor (Payments, Connect, Identity) | Generic subdomain / Anti-Corruption Layer |
| **UKVI** | UK Visa & Immigration (right-to-work verification) | External system, manual integration |
| **Safeguarding Adults Board (SAB)** | 152 local authority statutory bodies | External system, manual liaison |

### 1.3 Subdomain Classification

| Subdomain | Type | Rationale |
|-----------|------|-----------|
| **Booking** | Core Domain | The economic heart of the marketplace. Booking creation, lifecycle, state machine, cancellation policy, dispute resolution, no-show handling. This is where competitive advantage lies. |
| **Payment** | Core Domain | Escrow model with authorize-then-capture, commission calculation, refund tiers, payout orchestration. Tightly coupled to booking lifecycle. Money flow IS the business. |
| **Verification** | Core Domain | Trust is the product. Identity verification, right-to-work, voluntary DBS, admin review workflow, verification levels (L0/L1/L2). Directly impacts marketplace quality and regulatory compliance. |
| **Search & Discovery** | Supporting | Location-based search with filters. Important but standard matching logic (no AI/ML at Tier 1). PostGIS/Haversine distance calculation. |
| **Identity & Access** | Supporting | User registration, authentication, role-based access, session management. Standard patterns with JWT + refresh tokens. |
| **Messaging** | Supporting | Secure monitored communication. Content moderation, off-platform payment detection, booking-linked threads. |
| **Review** | Supporting | Post-booking ratings and reviews. Simple but important for trust signaling. |
| **Safeguarding** | Supporting (Compliance-Critical) | Care Act 2014 incident management. Not core to the business model but legally mandatory and reputationally critical. |
| **Admin / Operations** | Generic | Admin dashboard, audit logging, analytics, user management. Standard back-office operations. |

### 1.4 Ubiquitous Language Glossary

This glossary defines terms as they are used across the entire iCare domain. Each bounded context may refine these terms within its own language.

| Term | Definition | Context |
|------|-----------|---------|
| **Booking** | A time-bounded arrangement for a caregiver to provide companionship services to a care receiver at a specific location | Booking Context |
| **Booking Request** | The initial state when a care receiver creates a booking; payment is authorized but not captured | Booking Context |
| **Session** | The actual period during which care is being delivered (booking status = `in_progress`) | Booking Context |
| **Escrow** | Funds held by the platform after payment capture, before release to caregiver | Payment Context |
| **Authorization** | Stripe PaymentIntent with `capture_method: manual` -- holds funds without charging | Payment Context |
| **Capture** | Converting an authorization into an actual charge (occurs when caregiver accepts) | Payment Context |
| **Payout** | Transfer of earnings from platform to caregiver's Stripe Connect account | Payment Context |
| **Commission** | 15% deducted from caregiver's gross earnings (placeholder rate, FDR-008 pending) | Payment Context |
| **Service Fee** | 5% added to care receiver's total charge (placeholder rate, FDR-008 pending) | Payment Context |
| **Application Fee** | Stripe term for the combined commission + service fee retained by platform | Payment Context |
| **Verification Level** | L0 (unverified), L1 (ID + Right to Work verified), L2 (L1 + DBS verified) | Verification Context |
| **Identity Verification** | Government ID + selfie check via Stripe Identity or manual admin review | Verification Context |
| **Right to Work** | Legal permission to work in UK; auto-approved for UK passport holders, UKVI share code for others | Verification Context |
| **DBS Certificate** | Disclosure and Barring Service check certificate; voluntary at Tier 1 | Verification Context |
| **Trust Badge** | Visual indicator on caregiver profile: "Identity Verified" (blue), "DBS Verified" (green) | Verification Context |
| **Caregiver Profile** | The searchable public-facing representation of a caregiver | Search Context |
| **Service Type** | Category of companionship service: companionship, light_housework, shopping, meal_prep, transportation | Search Context |
| **Service Radius** | Maximum distance (5-30 miles) a caregiver is willing to travel | Search Context |
| **Conversation** | A message thread between a care receiver and caregiver, typically linked to a booking | Messaging Context |
| **Content Moderation** | Automated and manual review of messages for off-platform payment attempts, profanity, safeguarding keywords | Messaging Context |
| **Safeguarding Incident** | A reported concern about the safety or wellbeing of a care receiver or caregiver | Safeguarding Context |
| **Section 42 Enquiry** | Statutory duty under Care Act 2014 to investigate if: adult has care needs + experiencing abuse/neglect + unable to protect themselves | Safeguarding Context |
| **SAB Referral** | Formal referral to the local Safeguarding Adults Board when Section 42 criteria are met | Safeguarding Context |
| **Suspension** | Temporary account deactivation (7/14/30 days) with profile hidden and bookings cancelled | Admin Context |
| **Ban** | Permanent account deactivation with ban evasion detection | Admin Context |
| **No-Show** | Caregiver or care receiver fails to attend a confirmed booking | Booking + Safeguarding Context |
| **Dispute** | Care receiver challenges booking completion; payment held pending admin resolution (7-day SLA) | Booking Context |
| **Cancellation Window** | Time-based refund tiers: >48h = 100%, 24-48h = 50%, <24h = 0% | Booking Context |

---

## Part 2: Bounded Context Deep Dive

### 2.1 Booking Context (Core Domain)

**Purpose**: Manage the complete lifecycle of care bookings from request through completion, including cancellation, dispute, and no-show handling.

**Why Core**: This is the revenue-generating transaction at the centre of the marketplace. Every booking state transition has financial, legal, and safeguarding implications. The booking state machine encodes the platform's business rules and competitive differentiation.

#### Ubiquitous Language (Booking-Specific)

| Term | Definition |
|------|-----------|
| Booking Request | A pending booking awaiting caregiver response (24h window) |
| Response Window | 24-hour period for caregiver to accept/decline; auto-expires |
| Confirmation Window | 48-hour period for care receiver to confirm completion; auto-confirms |
| Late Cancellation | Cancellation <24h before start time; no refund for care receiver |
| No-Show Investigation | Process triggered when session doesn't start 30 minutes past scheduled time |
| Dispute Resolution | Admin-mediated process with 7-day SLA for resolving contested bookings |

#### Aggregate Root: Booking

**Entity**: `Booking`

**Properties**:
- `BookingId` (strongly-typed ID)
- `CareReceiverId` (reference by ID to Identity context)
- `CaregiverId` (reference by ID to Identity context)
- `BookingDate`, `StartTime`, `EndTime`, `DurationHours`
- `ServiceTypes` (value object collection)
- `SpecialRequests` (string, max 500 chars)
- `Location` (value object: postcode, address)
- `Status` (smart enum / state machine)
- `PricingSnapshot` (value object: hourly rate, duration, service fee, commission, totals)
- `PaymentIntentId` (Stripe reference)
- `CancellationDetails` (value object, nullable)
- `DisputeDetails` (value object, nullable)
- `CompletionDetails` (value object, nullable)
- `ReviewId` (reference by ID, nullable)
- Timestamps: `RequestedAt`, `AcceptedAt`, `StartedAt`, `CompletedAt`, `ConfirmedAt`, `PaymentReleasedAt`, `CancelledAt`, `DisputeRaisedAt`, `DisputeResolvedAt`

**Invariants**:
1. Duration must be between 2 and 8 hours (Tier 1)
2. Minimum advance notice: 2 hours before start time
3. Caregiver must have at least L1 verification level to accept bookings
4. Payment must be authorized before booking request is created
5. Booking can only transition to valid next states per state machine
6. Only one active booking per caregiver per time slot (no overlaps)
7. Cancellation refund percentage is determined by hours until start time
8. Dispute can only be raised within 48 hours of completion
9. Auto-confirmation occurs 48 hours after completion if no dispute
10. Commission and service fee percentages are captured at booking creation time (snapshot)

#### State Machine

```
requested ──(caregiver accepts)──> accepted
requested ──(caregiver declines)──> declined
requested ──(24h timeout)──> expired
requested ──(care receiver cancels)──> cancelled

accepted ──(start time reached)──> in_progress
accepted ──(care receiver cancels)──> cancelled
accepted ──(caregiver cancels)──> cancelled_by_caregiver

in_progress ──(caregiver marks complete)──> completed

completed ──(care receiver confirms)──> payment_released
completed ──(48h timeout, no dispute)──> payment_released
completed ──(care receiver disputes)──> disputed

payment_released ──(care receiver reviews)──> reviewed

disputed ──(admin resolves)──> dispute_resolved

accepted ──(no-show detected, 30min past start)──> [triggers no_show_caregiver or no_show_care_receiver]
```

**14 Booking States**: `requested`, `accepted`, `in_progress`, `completed`, `payment_released`, `reviewed`, `declined`, `expired`, `cancelled`, `cancelled_by_caregiver`, `no_show_caregiver`, `no_show_care_receiver`, `disputed`, `dispute_resolved`

#### Domain Events Produced

| Event | Trigger | Consumers |
|-------|---------|-----------|
| `BookingRequested` | Care receiver creates booking | Payment (authorize), Messaging (create conversation), Notification |
| `BookingAccepted` | Caregiver accepts | Payment (capture), Notification, Messaging (share contact details) |
| `BookingDeclined` | Caregiver declines | Payment (release authorization), Notification |
| `BookingExpired` | 24h timeout | Payment (release authorization), Notification |
| `BookingCancelled` | Either party cancels | Payment (calculate refund), Notification |
| `BookingStarted` | Start time reached / manual start | Notification |
| `BookingCompleted` | Caregiver marks complete | Payment (start confirmation window), Notification |
| `BookingConfirmed` | Care receiver confirms or 48h auto-confirm | Payment (release payout), Review (enable review), Notification |
| `DisputeRaised` | Care receiver disputes | Payment (hold payout), Admin (create dispute case), Notification |
| `DisputeResolved` | Admin resolves | Payment (process resolution: full/partial/no refund), Notification |
| `NoShowDetected` | 30 min past start, no in_progress transition | Safeguarding (create incident), Payment (full refund), Notification |
| `CaregiverNoShow` | Confirmed no-show by admin | Safeguarding (escalate), Admin (suspend/ban), Payment (full refund) |
| `CareReceiverNoShow` | Confirmed by admin | Payment (full payment to caregiver), Notification |

#### Domain Events Consumed

| Event | Source | Effect |
|-------|--------|--------|
| `PaymentAuthorized` | Payment | Allow booking to be created |
| `PaymentCaptured` | Payment | Confirm booking acceptance |
| `PaymentReleased` | Payment | Transition to `payment_released` |
| `RefundProcessed` | Payment | Update cancellation details |

#### Relationships

- **Customer-Supplier** with Payment Context (Booking is upstream; Payment responds to booking lifecycle events)
- **Customer-Supplier** with Verification Context (Booking queries verification status before allowing booking creation)
- **Published Language** with Messaging Context (Booking shares conversation creation protocol)
- **Customer-Supplier** with Safeguarding Context (Booking publishes no-show events; Safeguarding creates incidents)

---

### 2.2 Payment Context (Core Domain)

**Purpose**: Manage all financial transactions including payment authorization, capture, escrow, commission calculation, refunds, and caregiver payouts via Stripe.

**Why Core**: Money flow IS the business model. The escrow pattern, commission structure, refund policy, and payout timing directly determine platform economics and user trust. Incorrect payment handling has legal and financial consequences.

#### Ubiquitous Language (Payment-Specific)

| Term | Definition |
|------|-----------|
| PaymentIntent | Stripe object representing a payment; used for authorize-then-capture |
| Destination Charge | Stripe payment pattern where funds go to Connected Account with application fee |
| Application Fee | Amount retained by platform (service fee + commission) |
| Connected Account | Caregiver's Stripe Express account for receiving payouts |
| SetupIntent | Stripe object for saving a payment method without charging |
| Manual Capture | PaymentIntent created with `capture_method: manual`; authorizes but doesn't charge |
| Payout Schedule | Set to `manual` -- platform controls when caregivers receive funds |

#### Aggregate Root: PaymentTransaction

**Entity**: `PaymentTransaction`

**Properties**:
- `PaymentTransactionId` (strongly-typed ID)
- `BookingId` (reference by ID)
- `CareReceiverId`, `CaregiverId` (references by ID)
- `StripePaymentIntentId` (external reference)
- `StripeConnectAccountId` (external reference)
- `Amount` (Money value object: amount + currency)
- `ServiceFee` (Money value object)
- `Commission` (Money value object)
- `ApplicationFeeAmount` (Money value object: service fee + commission)
- `CaregiverNetEarnings` (Money value object)
- `Status` (enum: authorized, captured, released, refunded, partially_refunded, failed, disputed)
- `RefundDetails` (value object, nullable: amount, percentage, reason, stripe_refund_id)
- Timestamps

**Invariants**:
1. All monetary amounts must be in GBP (Tier 1 is UK-only)
2. Service fee = gross booking amount x service fee percentage
3. Commission = gross booking amount x commission percentage
4. Application fee = service fee + commission
5. Caregiver net = gross booking amount - commission
6. Total care receiver charge = gross booking amount + service fee
7. Refund amount determined by cancellation window rules
8. Payout cannot be released until booking confirmed or auto-confirmed
9. Commission and service fee rates are immutable once captured in a booking (snapshot at creation time)

#### Supporting Entity: PaymentMethod

**Properties**:
- `PaymentMethodId`
- `UserId` (reference by ID)
- `StripePaymentMethodId`
- `CardBrand`, `Last4`, `ExpMonth`, `ExpYear`
- `IsDefault`

#### Supporting Entity: Payout

**Properties**:
- `PayoutId`
- `CaregiverId` (reference by ID)
- `BookingId` (reference by ID)
- `StripeTransferId`
- `Amount` (Money)
- `Status` (enum: pending, initiated, paid, failed)
- Timestamps

#### Domain Events Produced

| Event | Trigger | Consumers |
|-------|---------|-----------|
| `PaymentAuthorized` | Stripe PaymentIntent authorized | Booking (allow creation) |
| `PaymentCaptured` | Stripe PaymentIntent captured on acceptance | Booking (confirm acceptance) |
| `PaymentReleased` | Payout initiated to caregiver | Booking (transition to payment_released) |
| `RefundProcessed` | Stripe refund completed | Booking (update cancellation), Notification |
| `PaymentFailed` | Card declined, insufficient funds | Booking (cancel), Notification |
| `PayoutFailed` | Transfer to caregiver bank failed | Notification, Admin (alert) |

#### Domain Events Consumed

| Event | Source | Effect |
|-------|--------|--------|
| `BookingRequested` | Booking | Create PaymentIntent with manual capture |
| `BookingAccepted` | Booking | Capture PaymentIntent |
| `BookingDeclined` / `BookingExpired` | Booking | Cancel PaymentIntent (release authorization) |
| `BookingCancelled` | Booking | Calculate and process refund per cancellation window |
| `BookingConfirmed` | Booking | Initiate payout to caregiver |
| `DisputeRaised` | Booking | Hold payout |
| `DisputeResolved` | Booking | Process resolution (full/partial/no refund + adjusted payout) |

#### Relationships

- **Anti-Corruption Layer** with Stripe (external payment system; all Stripe API calls go through an ACL)
- **Customer-Supplier** with Booking Context (Payment is downstream; Booking drives payment lifecycle)

---

### 2.3 Verification Context (Core Domain)

**Purpose**: Manage caregiver identity verification, right-to-work checks, voluntary DBS certificate review, and the admin approval workflow that determines a caregiver's verification level and marketplace eligibility.

**Why Core**: Trust is the product. In elderly care, verification quality directly impacts user safety and regulatory compliance. The verification system determines who can appear in search results and accept bookings.

#### Ubiquitous Language (Verification-Specific)

| Term | Definition |
|------|-----------|
| Verification Level | L0 = unverified, L1 = ID + Right to Work, L2 = L1 + DBS |
| Stripe Identity Session | Automated ID verification via Stripe (document + selfie + liveness) |
| Manual Review | Admin manually reviews documents when Stripe Identity fails or flags |
| UKVI Share Code | Government-issued code for checking non-UK nationals' right to work |
| SLA | Verification review must be completed within 48 hours |
| Resubmission | Caregiver corrects rejected documents and resubmits for review |
| Senior Review Escalation | Complex cases escalated to senior admin for decision |

#### Aggregate Root: CaregiverVerification

**Entity**: `CaregiverVerification`

**Properties**:
- `CaregiverVerificationId`
- `CaregiverId` (reference by ID)
- `VerificationLevel` (enum: L0, L1, L2)
- `IdentityVerification` (entity: status, method, stripe_verification_id, documents, admin_reviewer, reviewed_at)
- `RightToWorkVerification` (entity: status, nationality, visa_type, visa_expiry, ukvi_share_code, admin_reviewer)
- `DbsVerification` (entity: status, certificate_number, issue_date, level, update_service_subscriber, admin_reviewer)
- `ProfileApproved` (boolean)
- `ProfileVisibleInSearch` (boolean)
- `OverallStatus` (derived: pending, in_review, approved, rejected, suspended)

**Invariants**:
1. L1 requires both identity AND right-to-work verification approved
2. L2 requires L1 + DBS verification approved
3. Profile cannot be visible in search until L1 achieved (minimum)
4. DBS certificate must not be older than 3 years (recommendation, not hard block)
5. Visa expiry triggers automatic profile deactivation
6. Maximum 5 rejections before account suspension pending video call verification
7. Duplicate DBS certificate number across caregivers triggers fraud investigation
8. UK passport holders auto-approved for right to work (no UKVI check needed)

#### State Machines

**Identity Verification States**:
```
not_started -> document_uploaded -> stripe_processing ->
  stripe_verified -> admin_review_pending -> approved
  stripe_failed -> admin_review_pending -> approved | rejected
  admin_review_pending -> resubmission_requested -> document_uploaded
```

**Right to Work States**:
```
not_started -> submitted ->
  uk_citizen -> auto_approved
  non_uk -> admin_ukvi_check_pending -> approved | rejected
  approved (with visa expiry tracking)
```

**DBS Verification States**:
```
not_uploaded (voluntary) -> uploaded -> admin_review_pending -> approved | rejected
```

#### Domain Events Produced

| Event | Trigger | Consumers |
|-------|---------|-----------|
| `IdentityVerified` | Admin approves identity | Search (update profile visibility), Notification |
| `IdentityRejected` | Admin rejects identity | Notification (with resubmission instructions) |
| `RightToWorkVerified` | Admin approves right to work | Search (update profile), Notification |
| `RightToWorkExpired` | Visa expiry date reached | Search (hide profile), Booking (cancel future bookings), Notification |
| `DbsVerified` | Admin approves DBS | Search (add DBS badge), Notification |
| `VerificationLevelChanged` | Level transitions (L0->L1, L1->L2) | Search (update visibility), Booking (update eligibility) |
| `ProfileApproved` | All required verifications pass | Search (make profile visible), Notification |
| `VerificationSlaBreached` | Review pending > 48 hours | Admin (alert), Notification (to senior admin) |

#### Domain Events Consumed

| Event | Source | Effect |
|-------|--------|--------|
| `CaregiverRegistered` | Identity & Access | Create verification record at L0 |
| `StripeIdentityVerified` | Stripe (via webhook) | Update identity verification status |
| `StripeIdentityFailed` | Stripe (via webhook) | Flag for manual admin review |

#### Relationships

- **Anti-Corruption Layer** with Stripe Identity (external verification system)
- **Customer-Supplier** with Search Context (Verification is upstream; Search reads verification level)
- **Customer-Supplier** with Booking Context (Verification is upstream; Booking checks eligibility)
- **Conformist** with UKVI (manual external system; platform conforms to UKVI portal interface)

---

### 2.4 Identity & Access Context (Supporting)

**Purpose**: Manage user registration, authentication, authorization, and session management for all user types.

**Why Supporting**: Standard patterns (JWT, refresh tokens, RBAC). Important but not competitively differentiating. However, the multi-role model (Care Receiver, Family Member, Caregiver, 4 Admin roles) adds some complexity.

> **Design Decision DEC-001**: This context has **3 separate aggregate roots** (not one). See `/docs/technical/ddd-decisions.md` for full rationale.

#### Aggregate Root 1: User

**Entity**: `User`

**Properties**:
- `UserId` (strongly-typed ID)
- `Email` (value object with validation)
- `PasswordHash`
- `FirstName`, `LastName`
- `Phone` (value object)
- `UserType` (enum: care_receiver, family_member, caregiver, admin)
- `AccountStatus` (enum: active, suspended, banned, deleted)
- `EmailVerified`, `PhoneVerified` (booleans)
- `SuspensionDetails` (value object, nullable: end_date, reason, suspended_by)
- `MarketingConsent`
- Timestamps: `CreatedAt`, `UpdatedAt`, `LastLoginAt`, `DeletedAt`

**User Invariants**:
1. Email must be unique across all users
2. Phone must be verified before account is fully active
3. Account lockout after 10 failed login attempts (15-minute lockout)
4. Suspended users cannot login; banned users cannot create new accounts with same phone
5. Soft delete with 30-day grace period; PII anonymized after grace period

#### Aggregate Root 2: CareReceiverProfile

**Entity**: `CareReceiverProfile` (references User by `UserId` only)

**Properties**:
- `CareReceiverProfileId` (strongly-typed ID)
- `UserId` (reference by ID, not navigation property)
- `IsFamilyMember`, `Relationship`
- `CareReceiverName`
- `Postcode`, `AddressLine1`, `City`
- `EmergencyContact` (value object: name, phone, relationship)
- `PreferredServices`, `PreferredCaregiverGender`, `PreferredLanguages`, `MaxHourlyRate`

**CareReceiverProfile Invariants**:
1. Emergency contact is required once profile is complete
2. Must have valid UK postcode

#### Aggregate Root 3: CaregiverProfile

**Entity**: `CaregiverProfile` (references User by `UserId` only)

**Properties**:
- `CaregiverProfileId` (strongly-typed ID)
- `UserId` (reference by ID, not navigation property)
- `Bio`, `ProfilePhotoUrl`
- `ServicesOffered` (collection of ServiceType)
- `HourlyRate` (Money value object)
- `ServiceRadiusMiles`
- `Postcode`, `Location` (PostGIS point)
- `LanguagesSpoken`
- `Gender`, `HasVehicle`
- `AverageRating`, `TotalReviews`
- `Availability` (collection of AvailabilitySlot entities)

**CaregiverProfile Invariants**:
1. Hourly rate must be between 10 and 100 GBP
2. Must offer at least 4 hours per week availability
3. Availability slots must not overlap
4. Service radius must be between 1 and 50 miles

**Note**: `AdminUser` is a separate entity within the User aggregate (admin-specific auth concerns like 2FA, TOTP, lockout are closely tied to User authentication).

**AdminUser Properties**:
- `UserId`
- `AdminRole` (enum: super_admin, safeguarding_officer, operations_manager, customer_support)
- `TotpSecret`, `TotpEnabled`, `BackupCodes`
- `Permissions` (JSONB overrides)
- `FailedLoginAttempts`, `LockedUntil`

**AdminUser Invariants**:
1. Admin accounts require 2FA (mandatory for super_admin, safeguarding_officer, operations_manager)

#### Why 3 Separate Aggregates?

| Scenario | Aggregates touched |
|---|---|
| User resets password | User only |
| Care receiver updates emergency contact | CareReceiverProfile only |
| Caregiver changes hourly rate | CaregiverProfile only |
| Admin suspends account | User only (other contexts react via domain events) |
| Caregiver updates availability | CaregiverProfile only |

Separate aggregates provide: independent change frequency, different invariants per role, better concurrency, smaller transactions.

#### Domain Events Produced

| Event | Consumers |
|-------|-----------|
| `UserRegistered` | Notification (welcome email), Verification (if caregiver) |
| `CaregiverRegistered` | Verification (create verification record) |
| `UserSuspended` | Booking (cancel active bookings), Search (hide profile), Payment (process refunds) |
| `UserBanned` | Same as suspended + ban evasion detection |
| `UserDeleted` | GDPR anonymization, Stripe (delete customer/account) |
| `PhoneVerified` | Identity (update verified status) |
| `EmailVerified` | Identity (update verified status) |

#### Relationships

- **Shared Kernel** with all contexts (UserId is the shared identity)
- **Published Language** for user type and status (all contexts understand UserType and AccountStatus)

---

### 2.5 Search & Discovery Context (Supporting)

**Purpose**: Enable care receivers to find suitable caregivers based on location, availability, services, rate, verification status, and other filters.

#### Aggregate Root: SearchableCaregiver (Read Model)

This is primarily a **read model** optimized for search queries. It is not a transactional aggregate -- it is a projection built from data in the Identity & Access and Verification contexts.

**Properties (Projected)**:
- `CaregiverId`
- `FirstName`, `LastInitial`
- `ProfilePhotoUrl`, `Bio`
- `ServicesOffered`
- `HourlyRate`
- `Location` (PostGIS point for distance calculation)
- `ServiceRadiusMiles`
- `LanguagesSpoken`, `Gender`, `HasVehicle`
- `AverageRating`, `TotalReviews`
- `VerificationBadges` (identity_verified, dbs_verified)
- `Availability` (recurring weekly patterns + one-off dates + unavailable dates)
- `ProfileStatus` (approved, active)

**Query Operations**:
- Search by postcode + radius (Haversine distance)
- Filter by: service type, rate range, availability (day + time of day), verification level, languages, gender, minimum rating
- Sort by: distance (default), rating, price_low, price_high, newest
- Paginated results (12 per page default)

#### Domain Events Consumed

| Event | Source | Effect |
|-------|--------|--------|
| `ProfileApproved` | Verification | Add caregiver to search index |
| `VerificationLevelChanged` | Verification | Update verification badges |
| `CaregiverProfileUpdated` | Identity & Access | Update searchable fields |
| `AvailabilityUpdated` | Identity & Access | Update availability in search |
| `UserSuspended` / `UserBanned` | Identity & Access | Remove from search index |
| `ReviewSubmitted` | Review | Update average rating |
| `RightToWorkExpired` | Verification | Remove from search index |

#### Relationships

- **Conformist** to Identity & Access Context (reads user profile data, conforms to its data model)
- **Conformist** to Verification Context (reads verification level, conforms to its badge definitions)
- **Conformist** to Review Context (reads average rating)

---

### 2.6 Messaging Context (Supporting)

**Purpose**: Provide secure, monitored communication between care receivers and caregivers, with content moderation to prevent off-platform transactions, safeguarding keyword detection, and profanity filtering.

#### Aggregate Root: Conversation

**Entity**: `Conversation`

**Properties**:
- `ConversationId`
- `BookingId` (reference by ID, nullable for pre-booking inquiries)
- `CareReceiverId`, `CaregiverId` (references by ID)
- `Messages` (ordered collection of Message entities)
- `Status` (enum: active, archived, reported)
- `UnreadCount` (per participant)
- Timestamps

**Entity**: `Message`
- `MessageId`
- `ConversationId`
- `SenderId`
- `Text` (max 2000 chars)
- `SentAt`, `ReadAt`
- `IsSystemMessage`
- `ModerationStatus` (enum: clear, flagged, reviewed, actioned)
- `FlaggedKeywords` (nullable, if flagged)

**Invariants**:
1. Only booking participants can send messages in a conversation
2. Contact information (email, phone) is automatically redacted from messages
3. Off-platform payment keywords trigger automatic flagging for admin review
4. Safeguarding keywords trigger urgent admin notification
5. Maximum message length: 2000 characters
6. Conversations cannot be deleted by users (audit trail requirement)

#### Domain Events Produced

| Event | Consumers |
|-------|-----------|
| `MessageSent` | Notification (push, email), Real-time (WebSocket) |
| `MessageFlagged` | Admin (content moderation queue) |
| `SafeguardingKeywordDetected` | Safeguarding (create incident), Admin (urgent notification) |
| `OffPlatformPaymentDetected` | Admin (high priority moderation) |

#### Domain Events Consumed

| Event | Source | Effect |
|-------|--------|--------|
| `BookingRequested` | Booking | Create conversation linked to booking |
| `BookingAccepted` | Booking | System message: contact details shared |
| `UserSuspended` / `UserBanned` | Identity | Archive conversations, prevent sending |

#### Relationships

- **Customer-Supplier** with Booking Context (Booking creates conversations)
- **Published Language** with Admin Context (flagged content follows standard moderation protocol)

---

### 2.7 Review Context (Supporting)

**Purpose**: Manage post-booking reviews and ratings that build caregiver reputation and inform care receiver decisions.

#### Aggregate Root: Review

**Entity**: `Review`

**Properties**:
- `ReviewId`
- `BookingId` (reference by ID, one review per booking)
- `CareReceiverId` (reviewer)
- `CaregiverId` (reviewed)
- `Rating` (1-5 stars, required)
- `ReviewText` (max 500 chars, optional)
- `ReviewTags` (e.g., punctual, friendly, reliable, professional)
- `CaregiverResponse` (max 300 chars, optional)
- `Status` (enum: published, flagged, removed)
- `CreatedAt`, `CaregiverRespondedAt`

**Invariants**:
1. One review per booking
2. Review window: 14 days after booking completion/confirmation
3. Rating is required (1-5); review text is optional
4. Only care receivers can leave reviews (not caregivers)
5. Caregiver can respond once (max 300 chars)
6. Reviews cannot be edited after submission (can be flagged for moderation)

#### Domain Events Produced

| Event | Consumers |
|-------|-----------|
| `ReviewSubmitted` | Search (update average rating), Notification (to caregiver) |
| `ReviewFlagged` | Admin (moderation queue) |
| `CaregiverResponded` | Notification (to care receiver) |

#### Domain Events Consumed

| Event | Source | Effect |
|-------|--------|--------|
| `BookingConfirmed` | Booking | Enable review submission for this booking |
| `PaymentReleased` | Payment | Send review prompt notification |

#### Relationships

- **Customer-Supplier** with Booking Context (Review is downstream; enabled by booking confirmation)
- **Published Language** with Search Context (average rating calculation)

---

### 2.8 Safeguarding Context (Supporting -- Compliance-Critical)

**Purpose**: Manage safeguarding incident reporting, investigation, and external escalation in compliance with Care Act 2014.

**Why Compliance-Critical**: While not core to the business model, safeguarding is legally mandatory. Failure to comply with Care Act 2014 duties could result in regulatory action, reputational damage, and harm to vulnerable adults. This context handles special category data under GDPR Article 9.

#### Aggregate Root: SafeguardingIncident

**Entity**: `SafeguardingIncident`

**Properties**:
- `IncidentId`
- `IncidentNumber` (human-readable: "SAF-2026-042")
- `ReporterId`, `ReporterType` (enum: care_receiver, caregiver, family_member, admin, external)
- `ReportedUserId`, `ReportedUserType`
- `IncidentType` (enum: 10 primary + 5 secondary types)
- `Severity` (enum: critical, high, medium, low)
- `Description`
- `EvidenceUrls` (collection)
- `RelatedBookingId` (nullable)
- `RelatedMessageIds` (collection)
- `AssignedTo` (admin user ID)
- `Status` (enum: reported, triaging, investigating, escalated, resolved, closed)
- `InvestigationNotes`
- `Resolution`
- `ExternalEscalation` (value object: escalated_to, reference_number, escalated_at)
- Timestamps: `ReportedAt`, `RespondedAt`, `ResolvedAt`

**10 Primary Incident Types** (aligned with Care Act 2014 abuse categories):
1. Physical abuse
2. Emotional/psychological abuse
3. Sexual abuse
4. Financial/material abuse
5. Neglect/acts of omission
6. Discriminatory abuse
7. Domestic abuse
8. Self-neglect
9. Institutional/organisational abuse
10. Modern slavery

**5 Secondary (Platform-Specific) Types**:
1. Off-platform payment request
2. Inappropriate conduct
3. No-show (vulnerability concern)
4. Policy violation
5. Other

**Severity Levels and SLAs**:

| Severity | Response SLA | Investigation SLA | External Escalation SLA |
|----------|-------------|-------------------|------------------------|
| Critical | Immediate | <7 days | <2 hours (SAB/police) |
| High | <2 hours | <14 days | <24 hours |
| Medium | <24 hours | <21 days | <7 days |
| Low | <48 hours | <28 days | N/A |

**Section 42 Criteria** (triggers SAB referral):
1. Adult has needs for care and support (whether or not those needs are being met)
2. Is experiencing, or at risk of, abuse or neglect
3. As a result of their care and support needs, is unable to protect themselves from either the risk of, or the experience of, abuse or neglect

**Invariants**:
1. All incidents must receive a case reference number on creation
2. Critical/High severity incidents trigger immediate notification to on-call Safeguarding Officer
3. Reported user may be auto-suspended on incident creation (for certain types like off-platform payment)
4. SLA breach triggers automatic escalation to Safeguarding Lead
5. Safeguarding data retained for 7 years (cannot be deleted, even if user deletes account)
6. External escalation requires documented reference number
7. Reporter identity protected from reported user (unless legally required)
8. Investigation notes and evidence are immutable (append-only)

#### Domain Events Produced

| Event | Consumers |
|-------|-----------|
| `IncidentCreated` | Admin (dashboard alert), Notification (to safeguarding officer) |
| `IncidentEscalated` | Admin (senior notification), External (SAB/police referral tracking) |
| `IncidentResolved` | Notification (to reporter), Admin (update dashboard) |
| `UserSuspendedForSafeguarding` | Identity & Access (suspend account), Booking (cancel bookings), Payment (refunds) |
| `SlaBreached` | Admin (escalation to Safeguarding Lead) |

#### Domain Events Consumed

| Event | Source | Effect |
|-------|--------|--------|
| `NoShowDetected` | Booking | Create incident (vulnerability concern) |
| `SafeguardingKeywordDetected` | Messaging | Create incident (urgent triage) |
| `OffPlatformPaymentDetected` | Messaging | Create incident + auto-suspend |

#### Relationships

- **Customer-Supplier** with Booking Context (Safeguarding responds to no-show events)
- **Customer-Supplier** with Messaging Context (Safeguarding responds to flagged content)
- **Partnership** with Admin Context (shared safeguarding dashboard, audit logging)
- **Conformist** with SAB (external statutory bodies; platform conforms to their referral processes)

---

### 2.9 Admin / Operations Context (Generic)

**Purpose**: Provide administrative tools for platform management including user management, audit logging, analytics, system configuration, and coordination with other contexts.

#### Key Entities

**AuditLog** (Entity, append-only):
- `AuditLogId`
- `AdminUserId` (nullable for system actions)
- `ActionType` (string: "verification_approved", "user_suspended", etc.)
- `EntityType`, `EntityId`
- `Description`
- `OldValue`, `NewValue` (JSONB)
- `IpAddress`, `UserAgent`
- `Timestamp`
- `Hash` (SHA-256 for integrity verification)

**FlaggedContent** (Entity):
- `FlaggedContentId`
- `ContentType` (enum: message, profile_photo, profile_bio, review)
- `ContentId`
- `FlagType` (enum: automated, user_reported, admin_flagged)
- `FlagReason`, `FlaggedKeywords`
- `Status` (enum: pending, reviewing, dismissed, actioned)
- `ReviewDecision` (enum: approve, warn_user, suspend_user, delete_content, escalate)
- `ReviewedBy`, `ReviewNotes`

**PlatformSettings** (Entity, singleton):
- `CareReceiverServiceFeePercentage` (default 5.0)
- `CaregiverCommissionPercentage` (default 15.0)
- `VatRegistered` (boolean, default false)
- `VatRate` (default 20.0)

**Invariants**:
1. Audit logs are append-only (never modified or deleted)
2. Audit log entries include SHA-256 hash for integrity verification
3. All admin actions must be logged (no untracked admin operations)
4. Sensitive data exports require Super Admin authorisation and documented purpose
5. Platform settings changes take effect on new bookings only (existing bookings retain their snapshot)

#### Domain Events Consumed (from all contexts)

The Admin context is a **consumer** of events from all other contexts. It does not produce domain events; it produces **operational events** (alerts, notifications, reports).

#### Relationships

- **Conformist** to all other contexts (reads data for dashboard, analytics, oversight)
- **Partnership** with Safeguarding Context (shared incident management)

---

## Part 3: Context Map

### 3.1 Visual Map

```
+-------------------+       +-----------------+       +-------------------+
|                   |       |                 |       |                   |
|  Identity &       |  SK   |    Booking      |  CS   |    Payment        |
|  Access           |------>|    (Core)       |------>|    (Core)         |
|  (Supporting)     |       |                 |       |                   |
|                   |       |                 |       |     ACL           |
+--------+----------+       +--------+--------+       +--------+----------+
         |                           |                          |
         | SK                        | CS                       | ACL
         |                           |                          |
+--------v----------+       +--------v--------+       +--------v----------+
|                   |       |                 |       |                   |
|  Verification     |  CS   |  Safeguarding   |       |  Stripe           |
|  (Core)           |------>|  (Compliance)   |       |  (External)       |
|                   |       |                 |       |                   |
|     ACL           |       |   Conformist    |       +-------------------+
+--------+----------+       +--------+--------+
         |                           |
         | CS                        | Partnership
         |                           |
+--------v----------+       +--------v--------+
|                   |       |                 |
|  Search &         |       |  Admin /        |
|  Discovery        |       |  Operations     |
|  (Supporting)     |       |  (Generic)      |
|                   |       |                 |
+-------------------+       +-----------------+

+-------------------+       +-------------------+
|                   |       |                   |
|  Messaging        |  CS   |  Review           |
|  (Supporting)     |------>|  (Supporting)     |
|                   |       |                   |
+-------------------+       +-------------------+
```

### 3.2 Relationship Details

| Upstream | Downstream | Relationship Type | Description |
|----------|------------|-------------------|-------------|
| Identity & Access | ALL | Shared Kernel | `UserId` is the shared identity across all contexts. All contexts reference users by ID only. |
| Booking | Payment | Customer-Supplier | Booking publishes lifecycle events; Payment responds with financial operations. Booking is the customer (sets the rules); Payment is the supplier (executes them). |
| Booking | Messaging | Published Language | Booking publishes a standard protocol for conversation creation. Messaging creates threads linked to bookings. |
| Booking | Safeguarding | Customer-Supplier | Booking publishes no-show events; Safeguarding creates incidents. |
| Booking | Review | Customer-Supplier | Booking publishes confirmation events; Review enables review submission. |
| Verification | Search | Customer-Supplier | Verification publishes level changes; Search updates caregiver visibility and badges. |
| Verification | Booking | Customer-Supplier | Verification provides eligibility checks; Booking queries before allowing creation. |
| Verification | Stripe Identity | Anti-Corruption Layer | Platform translates Stripe Identity webhook payloads into domain events. Stripe API differences are hidden behind ACL. |
| Payment | Stripe | Anti-Corruption Layer | All Stripe API interactions (PaymentIntents, Transfers, Refunds, Connect, Webhooks) go through an ACL. Stripe's data model does not leak into domain. |
| Messaging | Safeguarding | Customer-Supplier | Messaging publishes flagged content events; Safeguarding creates incidents. |
| Safeguarding | SAB | Conformist | Platform conforms to 152 local authority SAB referral processes. No negotiation; platform adapts. |
| Verification | UKVI | Conformist | Platform conforms to UKVI portal for right-to-work checks. Manual process. |
| Safeguarding | Admin | Partnership | Shared incident management. Both contexts contribute to and read from safeguarding dashboards. |
| Admin | ALL | Conformist | Admin reads data from all contexts for dashboards and analytics. Does not modify domain state directly; issues commands through each context's API. |

### 3.3 Integration Patterns

| Integration | Pattern | Technology |
|-------------|---------|------------|
| Booking <-> Payment | Domain Events (in-process via MediatR) | MediatR notifications |
| Booking <-> Messaging | Domain Events (in-process) | MediatR notifications |
| Booking <-> Safeguarding | Domain Events (in-process) | MediatR notifications |
| Verification <-> Search | Domain Events (in-process) | MediatR notifications |
| Payment <-> Stripe | ACL (HTTP API + Webhooks) | Stripe.net SDK |
| Verification <-> Stripe Identity | ACL (HTTP API + Webhooks) | Stripe.net SDK |
| Messaging -> Client | Real-time (WebSocket) | SignalR |
| Background Jobs | Scheduled tasks | Hangfire |
| All -> Audit | Interceptor / Event Handler | EF Core SaveChanges interceptor |

**Note on Integration**: At Tier 1 scale, all bounded contexts live in a single deployment (modular monolith). Domain events are dispatched in-process via MediatR. No message queues or event buses are needed. The architecture should be structured so that extracting a context to a separate service is possible but not done prematurely.

---

## Part 4: Domain Events Catalog

### 4.1 Complete Event Catalog

| # | Event Name | Producer Context | Consumer Context(s) | Trigger | Side Effects |
|---|-----------|-----------------|---------------------|---------|-------------|
| 1 | `UserRegistered` | Identity & Access | Notification | User completes registration | Welcome email |
| 2 | `CaregiverRegistered` | Identity & Access | Verification | Caregiver creates account | Create verification record at L0 |
| 3 | `EmailVerified` | Identity & Access | Identity | User clicks verification link | Update verified status |
| 4 | `PhoneVerified` | Identity & Access | Identity | User enters correct OTP | Update verified status |
| 5 | `UserSuspended` | Identity & Access | Booking, Search, Payment | Admin suspends user | Cancel bookings, hide profile, process refunds |
| 6 | `UserBanned` | Identity & Access | Booking, Search, Payment | Admin permanently bans user | Same as suspended + ban evasion detection |
| 7 | `UserDeleted` | Identity & Access | All | User requests GDPR deletion | Anonymize PII, delete Stripe customer, 30-day grace |
| 8 | `CaregiverProfileUpdated` | Identity & Access | Search | Caregiver updates profile | Update search index |
| 9 | `AvailabilityUpdated` | Identity & Access | Search | Caregiver changes availability | Update search availability data |
| 10 | `BookingRequested` | Booking | Payment, Messaging, Notification | Care receiver creates booking | Authorize payment, create conversation, notify caregiver |
| 11 | `BookingAccepted` | Booking | Payment, Messaging, Notification | Caregiver accepts within 24h | Capture payment, share contacts, notify both |
| 12 | `BookingDeclined` | Booking | Payment, Notification | Caregiver declines | Release authorization, notify care receiver |
| 13 | `BookingExpired` | Booking | Payment, Notification | 24h timeout, no response | Release authorization, notify both |
| 14 | `BookingCancelled` | Booking | Payment, Notification | Either party cancels | Calculate refund per window, notify both |
| 15 | `BookingStarted` | Booking | Notification | Start time reached | Notify both parties |
| 16 | `BookingCompleted` | Booking | Payment, Notification | Caregiver marks complete | Start 48h confirmation window, notify care receiver |
| 17 | `BookingConfirmed` | Booking | Payment, Review, Notification | Care receiver confirms or 48h auto-confirm | Release payout, enable review |
| 18 | `DisputeRaised` | Booking | Payment, Admin, Notification | Care receiver disputes within 48h | Hold payout, create dispute case |
| 19 | `DisputeResolved` | Booking (via Admin) | Payment, Notification | Admin resolves dispute | Process refund/payout per decision |
| 20 | `NoShowDetected` | Booking | Safeguarding, Payment, Notification | 30 min past start, no in_progress | Create incident, full refund |
| 21 | `PaymentAuthorized` | Payment | Booking | Stripe authorizes hold | Allow booking creation |
| 22 | `PaymentCaptured` | Payment | Booking | Stripe captures charge | Confirm acceptance |
| 23 | `PaymentReleased` | Payment | Booking, Review | Payout initiated | Transition to payment_released, send review prompt |
| 24 | `PaymentFailed` | Payment | Booking, Notification | Card declined | Cancel booking, notify care receiver |
| 25 | `RefundProcessed` | Payment | Booking, Notification | Stripe processes refund | Update booking, notify care receiver |
| 26 | `PayoutFailed` | Payment | Notification, Admin | Transfer to caregiver fails | Alert admin, notify caregiver to update bank |
| 27 | `IdentityVerified` | Verification | Search, Notification | Admin approves ID | Update profile visibility |
| 28 | `IdentityRejected` | Verification | Notification | Admin rejects ID | Email with resubmission instructions |
| 29 | `RightToWorkVerified` | Verification | Search, Notification | Admin approves RtW | Update profile |
| 30 | `RightToWorkExpired` | Verification | Search, Booking, Notification | Visa expiry date reached | Hide profile, cancel future bookings |
| 31 | `DbsVerified` | Verification | Search, Notification | Admin approves DBS | Add DBS badge |
| 32 | `VerificationLevelChanged` | Verification | Search, Booking | L0->L1 or L1->L2 | Update visibility, update eligibility |
| 33 | `ProfileApproved` | Verification | Search, Notification | All required verifications pass | Make profile visible in search |
| 34 | `VerificationSlaBreached` | Verification | Admin | Review pending > 48h | Alert senior admin |
| 35 | `MessageSent` | Messaging | Notification | User sends message | Push notification, email if offline |
| 36 | `MessageFlagged` | Messaging | Admin | Content filter triggers | Add to moderation queue |
| 37 | `SafeguardingKeywordDetected` | Messaging | Safeguarding | Safeguarding keywords in message | Create urgent incident |
| 38 | `OffPlatformPaymentDetected` | Messaging | Safeguarding, Admin | Payment bypass keywords | Create incident, flag for immediate review |
| 39 | `ReviewSubmitted` | Review | Search, Notification | Care receiver submits review | Update average rating, notify caregiver |
| 40 | `ReviewFlagged` | Review | Admin | Review content inappropriate | Add to moderation queue |
| 41 | `CaregiverResponded` | Review | Notification | Caregiver responds to review | Notify care receiver |
| 42 | `IncidentCreated` | Safeguarding | Admin, Notification | Safeguarding concern reported | Dashboard alert, officer notification |
| 43 | `IncidentEscalated` | Safeguarding | Admin | SAB/police escalation | Senior notification, track external reference |
| 44 | `IncidentResolved` | Safeguarding | Notification, Admin | Investigation concluded | Notify reporter, update dashboard |
| 45 | `SlaBreached` | Safeguarding | Admin | Response overdue | Escalate to Safeguarding Lead |

### 4.2 Event Flow Diagrams

**Happy Path: Complete Booking Flow**:
```
CareReceiver                    Caregiver                 Platform
    |                               |                        |
    |--- BookingRequested --------->|                        |
    |                               |-- PaymentAuthorized -->|
    |                               |                        |
    |                          BookingAccepted               |
    |<--- PaymentCaptured ---------|                        |
    |                               |                        |
    |                          BookingStarted                |
    |                               |                        |
    |                          BookingCompleted              |
    |                               |                        |
    |--- BookingConfirmed -------->|                        |
    |                               |<-- PaymentReleased ---|
    |                               |                        |
    |--- ReviewSubmitted --------->|                        |
```

**Dispute Flow**:
```
CareReceiver                    Admin                     Caregiver
    |                               |                        |
    |--- DisputeRaised ----------->|                        |
    |    (payment held)             |                        |
    |                               |--- Investigation ----->|
    |                               |                        |
    |<-- DisputeResolved ----------|--- DisputeResolved --->|
    |    (refund per decision)      |    (adjusted payout)   |
```

---

## Part 5: Aggregate Design Decisions

### 5.1 Booking Aggregate

**Boundary Rationale**: The Booking aggregate encapsulates the entire booking lifecycle because all state transitions must be validated against invariants atomically. Pricing snapshot, status, timestamps, and cancellation/dispute details must change together.

**Size Consideration**: The Booking aggregate is moderately large but justified because:
- State machine transitions require checking multiple properties
- Pricing is calculated and snapshotted at creation time (immutable)
- Dispute and cancellation details are part of the booking lifecycle, not separate aggregates
- The booking references external entities (care receiver, caregiver, payment) by ID only

**Cross-Aggregate Consistency**:
- Booking -> Payment: Eventual consistency via domain events. Booking publishes events; Payment responds asynchronously (in practice, within the same transaction at Tier 1 since it is a modular monolith).
- Booking -> Caregiver Availability: The booking must check availability before creation, but availability is owned by the Identity & Access context. This is a query, not a command. Use a domain service to coordinate.

**Design Decision**: Keep review as a separate aggregate (not embedded in Booking) because:
- Review has its own lifecycle (submission, moderation, caregiver response)
- Review window extends beyond booking completion (14 days)
- Reviews affect the caregiver's aggregate rating (cross-aggregate side effect)

### 5.2 CaregiverVerification Aggregate

**Boundary Rationale**: Verification encompasses identity, right-to-work, and DBS as sub-entities within a single aggregate because:
- Verification level (L0/L1/L2) is derived from the combined status of all three checks
- Admin approval decisions often consider all verifications together
- Profile visibility depends on the aggregate verification state

**Size Consideration**: Three sub-entities (identity, right-to-work, DBS) make this aggregate medium-sized. Each has its own state machine but the level transition is an aggregate-level invariant.

**Alternative Considered**: Separate aggregates for each verification type. Rejected because the verification level is a cross-cutting invariant that depends on all three.

### 5.3 SafeguardingIncident Aggregate

**Boundary Rationale**: Each incident is an independent aggregate because:
- Incidents have independent lifecycles
- Multiple incidents can exist for the same user
- External escalations are per-incident
- Retention rules are per-incident (7 years)

**Size Consideration**: Relatively large due to investigation notes, evidence, and external escalation tracking. Justified because all of this data belongs to a single investigation lifecycle.

### 5.4 Conversation Aggregate

**Boundary Rationale**: Conversation is the aggregate root with Messages as child entities because:
- Messages only make sense within a conversation
- Unread count is conversation-level state
- Moderation status affects the conversation as a whole

**Size Consideration**: Messages grow unboundedly. In practice, conversations are paged and not fully loaded into memory. Consider using a separate read model for message history queries.

### 5.5 Cross-Aggregate Consistency Approach

At Tier 1, the system runs as a **modular monolith** with a single database. This means:

1. **Within a bounded context**: Strong consistency via database transactions
2. **Across bounded contexts**: Eventual consistency via MediatR domain events dispatched after `SaveChanges`
3. **With external systems (Stripe)**: Eventual consistency via webhooks + idempotency keys

**Key Consistency Scenarios**:

| Scenario | Aggregates Involved | Consistency Model |
|----------|-------------------|-------------------|
| Booking creation with payment authorization | Booking + Payment | Same transaction (modular monolith) |
| Booking acceptance with payment capture | Booking + Payment | Same transaction, Stripe call in handler |
| Verification approval with search index update | Verification + Search | Eventual via domain event |
| Booking cancellation with refund | Booking + Payment | Same transaction, Stripe call may fail (compensating action) |
| No-show with safeguarding incident | Booking + Safeguarding | Eventual via domain event |
| Review affecting caregiver rating | Review + Search | Eventual via domain event |

---

## Part 6: Value Object Catalog

### 6.1 Money

| Property | Type | Validation |
|----------|------|-----------|
| `Amount` | decimal | >= 0, max 2 decimal places |
| `Currency` | string | Must be "GBP" at Tier 1 |

**Used By**: PaymentTransaction, Booking (PricingSnapshot), Payout, Refund, CaregiverProfile (HourlyRate)

### 6.2 PricingSnapshot

Captured at booking creation time; immutable thereafter.

| Property | Type | Validation |
|----------|------|-----------|
| `HourlyRate` | Money | 10-100 GBP |
| `DurationHours` | decimal | 2-8 hours |
| `GrossAmount` | Money | HourlyRate x DurationHours |
| `ServiceFeePercentage` | decimal | >= 0 |
| `ServiceFeeAmount` | Money | GrossAmount x ServiceFeePercentage/100 |
| `CommissionPercentage` | decimal | >= 0 |
| `CommissionAmount` | Money | GrossAmount x CommissionPercentage/100 |
| `TotalCareReceiverCharge` | Money | GrossAmount + ServiceFeeAmount |
| `CaregiverNetEarnings` | Money | GrossAmount - CommissionAmount |
| `PlatformRevenue` | Money | ServiceFeeAmount + CommissionAmount |

**Used By**: Booking aggregate

### 6.3 EmailAddress

| Property | Type | Validation |
|----------|------|-----------|
| `Value` | string | RFC 5322 compliant, max 255 chars, lowercase |

**Used By**: User

### 6.4 PhoneNumber

| Property | Type | Validation |
|----------|------|-----------|
| `Value` | string | E.164 format, must start with +44 (UK) |

**Used By**: User, EmergencyContact

### 6.5 UkPostcode

| Property | Type | Validation |
|----------|------|-----------|
| `Value` | string | Valid UK postcode format (regex validated) |
| `OutwardCode` | string | First part (e.g., "SW1A") |

**Used By**: CareReceiverProfile, CaregiverProfile, Search queries

### 6.6 Location

| Property | Type | Validation |
|----------|------|-----------|
| `Latitude` | double | -90 to 90 |
| `Longitude` | double | -180 to 180 |
| `Postcode` | UkPostcode | Valid UK postcode |

**Used By**: CaregiverProfile (for PostGIS distance queries)

### 6.7 EmergencyContact

| Property | Type | Validation |
|----------|------|-----------|
| `Name` | string | Max 255 chars, required |
| `Phone` | PhoneNumber | E.164, required |
| `Relationship` | string | Max 100 chars, required |

**Used By**: CareReceiverProfile

### 6.8 DateTimeRange

| Property | Type | Validation |
|----------|------|-----------|
| `Start` | DateTimeOffset | Must be in the future (at booking creation) |
| `End` | DateTimeOffset | Must be after Start |
| `DurationHours` | decimal | Derived: (End - Start).TotalHours, must be 2-8 |

**Used By**: Booking

### 6.9 CancellationDetails

| Property | Type | Validation |
|----------|------|-----------|
| `CancelledBy` | enum | care_receiver, caregiver, admin, system |
| `Reason` | enum | schedule_change, no_longer_needed, emergency, other |
| `Details` | string | Optional, max 500 chars |
| `RefundPercentage` | int | 0, 50, or 100 (determined by cancellation window) |
| `RefundAmount` | Money | Calculated from RefundPercentage |
| `CancelledAt` | DateTimeOffset | Timestamp |

**Used By**: Booking aggregate

### 6.10 DisputeDetails

| Property | Type | Validation |
|----------|------|-----------|
| `DisputeId` | Guid | Unique |
| `Reason` | enum | service_not_provided, duration_shorter, quality_below_standard, safety_concern, other |
| `Description` | string | Required, min 20 chars |
| `EvidenceUrls` | string[] | S3 URLs, max 10 files |
| `CaregiverResponse` | string | Optional |
| `AdminDecision` | enum | full_refund, partial_refund, no_refund |
| `AdminRationale` | string | Required for resolution, min 50 chars |
| `RefundPercentage` | int | 0-100 |
| `RaisedAt` | DateTimeOffset | Timestamp |
| `ResolvedAt` | DateTimeOffset | Nullable |

**Used By**: Booking aggregate

### 6.11 VerificationResult

| Property | Type | Validation |
|----------|------|-----------|
| `Status` | enum | pending, approved, rejected, resubmission_requested |
| `Method` | enum | stripe_identity, manual_admin_review, auto_approved (UK citizens RtW) |
| `ReviewedBy` | Guid? | Admin user ID |
| `ReviewedAt` | DateTimeOffset? | Timestamp |
| `RejectionReason` | enum? | id_expired, id_unclear, name_mismatch, selfie_mismatch, suspected_fake, other |
| `Notes` | string | Admin notes, max 1000 chars |

**Used By**: CaregiverVerification (identity, right-to-work, DBS sub-entities)

### 6.12 SuspensionDetails

| Property | Type | Validation |
|----------|------|-----------|
| `Reason` | string | Required |
| `Duration` | enum | 7_days, 14_days, 30_days, permanent |
| `SuspendedBy` | Guid | Admin user ID |
| `SuspendedAt` | DateTimeOffset | Timestamp |
| `ExpiresAt` | DateTimeOffset? | Null for permanent |

**Used By**: User

### 6.13 ServiceType (Smart Enum)

| Value | Display Name | Tier |
|-------|-------------|------|
| `companionship` | Companionship | T1 |
| `light_housework` | Light Housework | T1 |
| `shopping` | Shopping/Errands | T1 |
| `meal_prep` | Meal Preparation | T1 |
| `transportation` | Transportation | T1 |
| `personal_care` | Personal Care | T2 (deferred) |
| `medication` | Medication Assistance | T2 (deferred) |

**Used By**: CaregiverProfile, Booking, Search

### 6.14 BookingStatus (Smart Enum)

| Value | Display | Can Transition To |
|-------|---------|------------------|
| `requested` | Pending | accepted, declined, expired, cancelled |
| `accepted` | Confirmed | in_progress, cancelled, cancelled_by_caregiver |
| `in_progress` | In Progress | completed |
| `completed` | Completed | payment_released, disputed |
| `payment_released` | Payment Released | reviewed |
| `reviewed` | Reviewed | (terminal) |
| `declined` | Declined | (terminal) |
| `expired` | Expired | (terminal) |
| `cancelled` | Cancelled | (terminal) |
| `cancelled_by_caregiver` | Cancelled by Caregiver | (terminal) |
| `no_show_caregiver` | No-Show (Caregiver) | (terminal) |
| `no_show_care_receiver` | No-Show (Care Receiver) | (terminal) |
| `disputed` | Disputed | dispute_resolved |
| `dispute_resolved` | Dispute Resolved | (terminal) |

**Used By**: Booking aggregate

---

## Part 7: Domain-to-Database Mapping

### 7.1 Current Schema Overview

The existing database schema (`/docs/technical/database-schema-tier1.md`) defines 23 PostgreSQL tables. This section maps those tables to DDD aggregates and identifies alignment and conflicts.

### 7.2 Mapping Table

| Database Table | DDD Aggregate | DDD Context | Alignment | Notes |
|---------------|--------------|-------------|-----------|-------|
| `users` | User | Identity & Access | GOOD | Maps cleanly to User entity |
| `care_receivers` | CareReceiverProfile | Identity & Access | GOOD | Owned entity of User |
| `caregivers` | CaregiverProfile | Identity & Access | NEEDS ADJUSTMENT | Contains verification fields (id_verified, dbs_verified) that belong to Verification context |
| `caregiver_availability` | CaregiverProfile (owned) | Identity & Access | GOOD | Availability is a collection owned by CaregiverProfile |
| `bookings` | Booking | Booking | NEEDS ADJUSTMENT | Wide table (30+ columns) that mixes booking, pricing, payment, and dispute data. Should use EF Core owned types for PricingSnapshot, CancellationDetails, DisputeDetails |
| `booking_state_history` | Booking (child collection) | Booking | GOOD | Maps to domain event log within Booking aggregate |
| `conversations` | Conversation | Messaging | GOOD | Clean mapping |
| `messages` | Message (child of Conversation) | Messaging | GOOD | Clean mapping |
| `verification_documents` | CaregiverVerification | Verification | NEEDS ADJUSTMENT | Currently a flat table; should be restructured for identity, RtW, DBS sub-entities |
| `dbs_checks` | CaregiverVerification (DBS sub-entity) | Verification | GOOD | Already separated |
| `right_to_work_checks` | CaregiverVerification (RtW sub-entity) | Verification | GOOD | Already separated |
| `payment_intents` | PaymentTransaction | Payment | GOOD | Clean mapping |
| `payouts` | Payout | Payment | GOOD | Clean mapping |
| `refunds` | Refund (child of PaymentTransaction) | Payment | GOOD | Clean mapping |
| `reviews` | Review | Review | GOOD | Clean mapping |
| `admin_users` | AdminUser (owned by User) | Identity & Access | NEEDS ADJUSTMENT | Currently separate table; consider if admin_users should be a role-extension of users or remain separate |
| `audit_logs` | AuditLog | Admin | GOOD | Clean mapping, append-only |
| `safeguarding_incidents` | SafeguardingIncident | Safeguarding | GOOD | Clean mapping |
| `flagged_content` | FlaggedContent | Admin | GOOD | Clean mapping |

### 7.3 Schema-to-DDD Adjustments Required

#### Adjustment 1: Booking Table Decomposition

**Current**: Wide `bookings` table with 30+ columns mixing booking data, pricing, payment status, and dispute fields.

**DDD Approach**: Use EF Core owned types to logically separate concerns while keeping a single database table.

```csharp
// Entity Framework Core mapping
public class BookingConfiguration : IEntityTypeConfiguration<Booking>
{
    public void Configure(EntityTypeBuilder<Booking> builder)
    {
        builder.ToTable("bookings");

        builder.OwnsOne(b => b.PricingSnapshot, pricing =>
        {
            pricing.Property(p => p.HourlyRate).HasColumnName("hourly_rate");
            pricing.Property(p => p.DurationHours).HasColumnName("duration_hours");
            pricing.Property(p => p.ServiceFeePercentage).HasColumnName("service_fee_percentage");
            pricing.Property(p => p.CommissionPercentage).HasColumnName("commission_percentage");
            pricing.Property(p => p.TotalCareReceiverCharge).HasColumnName("total_care_receiver_charge");
            pricing.Property(p => p.CaregiverNetEarnings).HasColumnName("caregiver_net_earnings");
        });

        builder.OwnsOne(b => b.CancellationDetails, cancel =>
        {
            cancel.Property(c => c.CancelledBy).HasColumnName("cancelled_by");
            cancel.Property(c => c.Reason).HasColumnName("cancellation_reason");
            cancel.Property(c => c.RefundPercentage).HasColumnName("refund_percentage");
        });

        builder.OwnsOne(b => b.DisputeDetails, dispute =>
        {
            dispute.Property(d => d.Reason).HasColumnName("dispute_reason");
            dispute.Property(d => d.AdminDecision).HasColumnName("dispute_admin_decision");
        });
    }
}
```

#### Adjustment 2: Caregiver Verification Fields

**Current**: `caregivers` table contains `id_verified`, `id_verified_date`, `dbs_verified`, `dbs_verified_date` columns.

**Issue**: These fields belong to the Verification context, not Identity & Access.

**DDD Approach**: The Verification context owns verification state. The Search context reads a projected view that combines caregiver profile data with verification status. The caregiver table should NOT contain verification columns directly.

**EF Core Workaround**: Since we are using a shared database at Tier 1, we can:
1. Keep the columns in the caregiver table for query convenience
2. BUT only the Verification context writes to these columns
3. Other contexts read them as a projected view
4. This is a pragmatic compromise for a modular monolith

#### Adjustment 3: Commission as Configuration, Not Attribute

**Current**: Commission percentage appears as a column on the bookings table.

**DDD Approach**: Commission and service fee percentages come from `PlatformSettings` (a singleton entity in the Admin context). They are captured as a `PricingSnapshot` value object at booking creation time. The Booking aggregate uses a domain service (`PricingCalculator`) that reads current rates from PlatformSettings and creates the snapshot.

```csharp
public class PricingCalculator : IDomainService
{
    private readonly IPlatformSettingsRepository _settings;

    public PricingSnapshot Calculate(decimal hourlyRate, decimal durationHours)
    {
        var settings = _settings.GetCurrent();
        var gross = hourlyRate * durationHours;
        var serviceFee = gross * (settings.ServiceFeePercentage / 100m);
        var commission = gross * (settings.CommissionPercentage / 100m);

        return new PricingSnapshot(
            hourlyRate, durationHours, gross,
            settings.ServiceFeePercentage, serviceFee,
            settings.CommissionPercentage, commission,
            totalCareReceiverCharge: gross + serviceFee,
            caregiverNetEarnings: gross - commission,
            platformRevenue: serviceFee + commission
        );
    }
}
```

#### Adjustment 4: Admin Users Table

**Current**: Separate `admin_users` table with its own columns.

**DDD Approach**: Two options:
1. **Option A (Recommended)**: Keep `admin_users` as a separate table but reference `users.id`. AdminUser is a role-extension entity in the Identity & Access context.
2. **Option B**: Merge into `users` table with admin-specific columns nullable. Simpler but muddies the user model.

**Decision**: Option A. AdminUser is a separate entity that references User by ID. This aligns with the distinct authentication flow (2FA mandatory, different session management).

### 7.4 EF Core Patterns

**Strongly-Typed IDs**:
```csharp
public readonly record struct BookingId(Guid Value);
public readonly record struct UserId(Guid Value);
public readonly record struct PaymentTransactionId(Guid Value);
```

**Domain Event Dispatch**:
```csharp
// In DbContext.SaveChangesAsync override
public override async Task<int> SaveChangesAsync(CancellationToken ct = default)
{
    var domainEvents = ChangeTracker.Entries<IAggregateRoot>()
        .SelectMany(e => e.Entity.DomainEvents)
        .ToList();

    var result = await base.SaveChangesAsync(ct);

    foreach (var domainEvent in domainEvents)
    {
        await _mediator.Publish(domainEvent, ct);
    }

    return result;
}
```

**Value Object Mapping (Owned Types)**:
```csharp
builder.OwnsOne(u => u.Email, email =>
{
    email.Property(e => e.Value)
        .HasColumnName("email")
        .HasMaxLength(255)
        .IsRequired();
});
```

---

## Part 8: Risk Areas and Complexity Hotspots

### 8.1 High-Risk Areas

#### Risk 1: Booking State Machine Complexity

**Risk**: 14 booking states with complex transition rules, side effects on multiple contexts, and time-based automatic transitions. Bugs in state transitions have financial and legal consequences.

**Mitigation**:
- Implement state machine as a smart enum with explicit transition validation
- Use guard clauses on every state transition method
- Comprehensive unit tests for every valid and invalid transition
- Domain event handlers for side effects (not inline in state transitions)
- Integration tests for time-based transitions (auto-expire, auto-confirm)

**Complexity Score**: HIGH

#### Risk 2: Payment / Stripe Integration

**Risk**: Multiple Stripe products (Payments, Connect, Identity) with webhooks, idempotency requirements, failure modes, and financial reconciliation. Incorrect payment handling = lost money.

**Mitigation**:
- Anti-Corruption Layer isolates all Stripe interactions
- Idempotency keys on all Stripe API calls
- Webhook signature verification + event deduplication
- Reconciliation jobs to detect payment/booking state drift
- Test mode with comprehensive test scenarios

**Complexity Score**: HIGH

#### Risk 3: Commission Rate Placeholder (FDR-008)

**Risk**: The 15% caregiver commission + 5% service fee are PLACEHOLDER values. FDR-008 (pricing decision) is PENDING from the founder. Two different placeholder values exist in the system (10% in website content, 15%+5% in feature specs).

**Mitigation**:
- Commission rates stored in `PlatformSettings` (configurable, not hardcoded)
- Rates captured in `PricingSnapshot` at booking creation (existing bookings unaffected by rate changes)
- Website content must be updated when FDR-008 is decided
- Feature specs and wireframes reference the rate but the actual value is configurable

**Complexity Score**: MEDIUM (technically straightforward but operationally important)

#### Risk 4: Safeguarding Compliance

**Risk**: Care Act 2014 duties are legally mandatory. Safeguarding data is GDPR special category data. SLA breaches, missed escalations, or data breaches have regulatory and legal consequences.

**Mitigation**:
- Dedicated Safeguarding bounded context with clear invariants
- SLA tracking with automatic escalation
- Audit trail for all safeguarding actions (append-only)
- 7-year retention policy enforced at database level
- Access controls (only Safeguarding Officer, Lead, Super Admin)
- Encryption at rest for safeguarding data

**Complexity Score**: MEDIUM-HIGH (legally critical, technically standard)

#### Risk 5: Visa Expiry and Right-to-Work Tracking

**Risk**: Non-UK caregivers must have valid right to work. Visa expiry requires automatic profile deactivation and booking cancellation. Missing this creates immigration compliance risk.

**Mitigation**:
- Automated reminder schedule: 60, 30, 7 days before visa expiry
- Automatic profile deactivation on visa expiry date
- Automatic cancellation of future bookings with full refund
- Background job (Hangfire) to check visa expiry daily

**Complexity Score**: MEDIUM

#### Risk 6: Concurrent Admin Operations

**Risk**: Multiple admins reviewing the same caregiver verification, responding to the same safeguarding incident, or resolving the same dispute simultaneously.

**Mitigation**:
- Optimistic concurrency (EF Core concurrency tokens)
- Database-level locking for verification review (assign to admin before review)
- Clear error messaging when concurrent modification detected
- Audit trail records all attempts (including rejected concurrent ones)

**Complexity Score**: LOW-MEDIUM

### 8.2 Complexity Hotspots

| Component | Complexity | Reason |
|-----------|-----------|--------|
| Booking state machine | HIGH | 14 states, time-based transitions, financial side effects |
| Payment flow (authorize-capture-refund-payout) | HIGH | Multiple Stripe API calls, webhook handling, failure modes |
| Cancellation refund calculation | MEDIUM | Time-window-based tiers, partial refunds, caregiver compensation |
| Verification workflow | MEDIUM | 3 verification types with different state machines, admin review |
| Content moderation | MEDIUM | Keyword detection, false positives, multi-priority flagging |
| PostGIS location search | LOW-MEDIUM | Standard spatial queries but requires PostGIS extension and Haversine |
| Messaging real-time | LOW-MEDIUM | SignalR WebSocket management, typing indicators, read receipts |
| Audit logging | LOW | Append-only, interceptor-based, high volume |
| Review system | LOW | Simple CRUD with rating calculation |
| User registration | LOW | Standard flow with email + phone verification |

### 8.3 Cross-Cutting Concerns

| Concern | Approach | Notes |
|---------|----------|-------|
| **Logging** | Serilog with structured logging | Correlation IDs across contexts |
| **Error Handling** | Global exception handler + FluentValidation | Domain exceptions for business rule violations |
| **Authentication** | JWT Bearer (RS256) + Refresh tokens | Access: 24h expiry, Refresh: 7d |
| **Authorization** | Policy-based RBAC | 4 admin roles with granular permissions |
| **Caching** | In-memory for platform settings, search results | Redis if scaling beyond single instance |
| **Background Jobs** | Hangfire | 7+ scheduled tasks (auto-expire, auto-confirm, reminders, visa checks) |
| **Real-time** | SignalR | Messaging, booking status updates, typing indicators |
| **File Storage** | S3-compatible | Verification documents, evidence uploads, profile photos |
| **Email** | SendGrid or similar | Transactional emails for all notifications |
| **SMS** | Twilio or similar | OTP verification, urgent safeguarding alerts |

### 8.4 Known Inconsistencies (from CONSISTENCY_AUDIT.md)

| ID | Description | Impact on DDD |
|----|-------------|---------------|
| FDR-008 | Commission rate placeholder (10% website vs 15%+5% specs) | Commission must be configurable in PlatformSettings, not hardcoded in domain |
| Schema vs Spec | Booking table has `booking_status` ENUM but spec defines 14 states; verify exact values match | Smart enum in domain must exactly match database ENUM |
| Admin roles | Admin spec defines 4 roles; database has `admin_role` ENUM; verify alignment | AdminRole enum in domain must match database |
| Message Inbox R0/R1 | Message Inbox was R1 but gap analysis elevated related list screens to R0 | Does not affect domain model; UI concern only |

### 8.5 Architecture Recommendations

1. **Start with modular monolith**: All 8 bounded contexts in a single solution with clear project boundaries (`ICare.Domain`, `ICare.Application`, `ICare.Infrastructure`, `ICare.WebApi`). Within Domain, separate by context (`ICare.Domain.Booking`, `ICare.Domain.Payment`, etc.).

2. **Use lightweight CQRS**: Same database, but separate command and query paths via MediatR. Commands go through domain model; queries can use Dapper or EF Core projections for performance.

3. **Domain events via MediatR**: In-process event dispatch after `SaveChanges`. No external message bus at Tier 1. Structure handlers so they could be moved to a separate process later.

4. **Anti-Corruption Layers for Stripe**: `ICare.Infrastructure.Stripe` contains all Stripe SDK interactions. Domain contexts never reference Stripe types directly. Use domain interfaces (`IPaymentGateway`, `IIdentityVerifier`) implemented by infrastructure.

5. **PostGIS for search**: Use NetTopologySuite with EF Core Npgsql for geographic queries. The Haversine distance function is already defined in the database schema.

6. **Hangfire for background jobs**: 7+ scheduled tasks for booking lifecycle automation (auto-expire, auto-confirm, no-show detection, reminders, visa expiry checks, SLA monitoring).

7. **SignalR for real-time**: Messaging (new messages, typing indicators, read receipts) and booking status updates. Consider using a SignalR hub per context.

---

## Source Documents Referenced

This domain analysis was derived from cross-referencing the following specification documents:

| Document | Path | Key Information Extracted |
|----------|------|--------------------------|
| Booking Specification | `/docs/product/features/tier1-booking-specification.md` | 14 booking states, state machine, business rules, cancellation policy, dispute resolution, pricing model |
| Verification Specification | `/docs/product/features/tier1-verification-specification.md` | Verification levels (L0/L1/L2), identity/RtW/DBS workflows, admin review, SLA |
| Search Specification | `/docs/product/features/tier1-search-specification.md` | Location search, filters, sort options, availability system, PostGIS |
| Messaging Specification | `/docs/product/features/tier1-messaging-specification.md` | Content moderation, off-platform payment detection, conversation model |
| Admin Specification | `/docs/product/features/tier1-admin-specification.md` | 4 admin roles, verification queue, dispute resolution, content moderation, audit logging, analytics |
| Safeguarding Specification | `/docs/product/features/tier1-safeguarding-specification.md` | Care Act 2014, 10+5 incident types, severity levels, SLAs, SAB liaison, Section 42 criteria |
| Database Schema | `/docs/technical/database-schema-tier1.md` | 23 PostgreSQL tables, ENUMs, PostGIS, audit triggers |
| API Specification | `/docs/technical/api-specification-tier1.md` | REST endpoints, JWT auth, rate limiting, WebSocket events, error handling |
| Stripe Integration | `/docs/technical/stripe-integration-spec.md` | Payment flow, Connect onboarding, Identity verification, webhooks, commission handling |
| Backend Architecture Discussion | `/docs/tiers/tier1/backend-architecture-discussion.md` | 8 bounded contexts, Clean Architecture, CQRS, technology stack |
| DDD Reference Guide | `/docs/tiers/tier1/ddd-reference-guide.md` | DDD patterns, C# examples, anti-patterns |
| Route Map | `/docs/product/tier1-route-map.md` | 47 screens (34 R0), navigation, access matrix |
| Compliance | `/docs/tiers/tier1/compliance.md` | Regulatory requirements, legal documents, data protection |
| Features | `/docs/tiers/tier1/features.md` | 77 Tier 1 features across 11 systems |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-14 | Product Director | Initial domain analysis created from comprehensive spec review |

---

**END OF DOCUMENT**
