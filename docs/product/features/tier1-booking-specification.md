# Tier 1 Booking Flow Specification

**Document Purpose**: Comprehensive specification for the Tier 1 booking system enabling companionship-only services on the UK elderly care marketplace.

**Document Owner**: Product Team
**Created**: 2026-02-06
**Status**: ACTIVE
**Tier**: Tier 1 (Companionship MVP)

---

## Table of Contents

1. [Overview](#1-overview)
2. [User Stories](#2-user-stories)
3. [Functional Requirements](#3-functional-requirements)
4. [State Machine](#4-state-machine)
5. [Business Rules](#5-business-rules)
6. [Data Requirements](#6-data-requirements)
7. [Edge Cases](#7-edge-cases)
8. [Integration Points](#8-integration-points)
9. [Acceptance Criteria](#9-acceptance-criteria)
10. [Out of Scope](#10-out-of-scope)

---

## 1. Overview

### 1.1 Purpose

The Tier 1 booking system enables care receivers and their families to request, confirm, and complete companionship-only bookings with verified independent caregivers. The system prioritizes safety, transparency, and payment protection while maintaining the Introduction Agency model (caregivers are self-employed, not employees).

### 1.2 Scope

**Services Enabled at Tier 1:**
- Companionship (conversation, activities, social interaction)
- Light housework and cleaning
- Shopping and errands (accompanied)
- Meal preparation (NO feeding assistance)
- Transportation (if caregiver has vehicle)

**Services NOT Available at Tier 1:**
- Personal care (washing, dressing, toileting) - deferred to Tier 2
- Mobility assistance requiring physical contact - deferred to Tier 2
- Medication assistance or prompting - deferred to Tier 2
- Overnight care - deferred to Tier 2
- Live-in care - deferred to Tier 3
- Condition-specific care matching - deferred to Tier 3

### 1.3 Tier 1 Constraints

**Data Collected:**
- Standard personal data only (name, email, phone, postcode, booking details)
- Generic service preferences (companionship, light housework, etc.)
- NO medical conditions or health data
- NO care skills requirements (health-inferring)

**Verification Requirements:**
- Identity verification (mandatory)
- Right to work verification (mandatory)
- DBS verification (VOLUNTARY at Tier 1 - becomes mandatory at Tier 2)
- Phone/email verification (mandatory)

**Business Model:**
- Platform operates as Introduction Agency (NOT CQC-registered care provider)
- Caregivers are self-employed independent professionals
- Platform takes commission on bookings (e.g., 15% from caregiver + 5% service fee from care receiver)
- Escrow payment model (funds held until service completion)

### 1.4 Terminology Standards

The following terminology is canonical across all Tier 1 documentation:

| Term | Definition | Applied To |
|------|------------|-----------|
| **Service Fee** | Percentage added to booking total, charged to care receiver | Care receiver payment |
| **Commission** | Percentage deducted from booking total, taken from caregiver earnings | Caregiver payout |
| **Platform Revenue** | Combined Service Fee + Commission | Business metrics |
| **Earnings** | Money owed to caregiver (booking total minus commission) | Caregiver dashboard |
| **Payout** | Money transferred to caregiver's bank account | Stripe transfers |

> **Terminology Note**: "Platform fee" should NOT be used in user-facing contexts as it is ambiguous.
> Use "Service Fee" (care receiver charge) or "Commission" (caregiver deduction) specifically.

---

## 2. User Stories

### 2.1 Care Receiver User Stories

**US-CR-01: Search and Discover Caregivers**
- **As a** care receiver or family member
- **I want to** search for caregivers by location and availability
- **So that** I can find suitable companionship support near me

**US-CR-02: View Caregiver Profiles**
- **As a** care receiver or family member
- **I want to** view detailed caregiver profiles including experience, rates, reviews, and verification status
- **So that** I can make an informed decision about who to book

**US-CR-03: Request a Booking**
- **As a** care receiver or family member
- **I want to** request a booking for a specific date, time, and duration
- **So that** I can arrange companionship services when needed

**US-CR-04: Receive Booking Confirmation**
- **As a** care receiver or family member
- **I want to** receive immediate notification when a caregiver accepts my booking
- **So that** I have certainty about my upcoming care arrangement

**US-CR-05: Communicate with Caregiver**
- **As a** care receiver or family member
- **I want to** message the caregiver before and after the booking
- **So that** I can coordinate details and ask questions

**US-CR-06: Cancel Bookings**
- **As a** care receiver or family member
- **I want to** cancel a booking with appropriate notice
- **So that** I can adapt to changing circumstances while understanding the refund policy

**US-CR-07: Confirm Service Completion**
- **As a** care receiver or family member
- **I want to** confirm that the service was delivered as expected
- **So that** the caregiver receives payment and I can leave a review

**US-CR-08: Dispute Service Quality**
- **As a** care receiver or family member
- **I want to** raise a dispute if the service was not provided as agreed
- **So that** I can receive a fair resolution and refund if appropriate

**US-CR-09: Leave Reviews**
- **As a** care receiver or family member
- **I want to** leave a rating and review after the booking
- **So that** I can help other care receivers make informed decisions

### 2.2 Caregiver User Stories

**US-CG-01: Receive Booking Requests**
- **As a** caregiver
- **I want to** receive notifications of new booking requests matching my availability
- **So that** I can evaluate opportunities and respond promptly

**US-CG-02: Review Booking Details**
- **As a** caregiver
- **I want to** see the care receiver's location, booking date/time, special requests, and earnings before accepting
- **So that** I can make an informed decision about whether to accept

**US-CG-03: Accept or Decline Bookings**
- **As a** caregiver
- **I want to** accept bookings that suit my schedule and decline those that don't
- **So that** I maintain control over my independent work schedule

**US-CG-04: View Confirmed Bookings**
- **As a** caregiver
- **I want to** see all my upcoming bookings with care receiver contact details
- **So that** I can plan my schedule and prepare for sessions

**US-CG-05: Mark Sessions Complete**
- **As a** caregiver
- **I want to** mark a booking as complete when the session ends
- **So that** I receive payment promptly

**US-CG-06: Cancel Bookings When Necessary**
- **As a** caregiver
- **I want to** cancel bookings in emergency situations
- **So that** I can manage unforeseen circumstances while minimizing impact on care receivers

**US-CG-07: Track Earnings**
- **As a** caregiver
- **I want to** see my pending and completed earnings
- **So that** I can manage my self-employed income and plan for taxes

**US-CG-08: Respond to Reviews**
- **As a** caregiver
- **I want to** respond professionally to reviews
- **So that** I can address feedback and maintain my professional reputation

### 2.3 Admin User Stories

**US-AD-01: Oversee All Bookings**
- **As an** admin
- **I want to** view all bookings across the platform with filter and search capabilities
- **So that** I can monitor platform activity and identify issues

**US-AD-02: Resolve Disputes**
- **As an** admin
- **I want to** review dispute evidence and make refund decisions
- **So that** I can ensure fair outcomes for both parties

**US-AD-03: Handle No-Shows**
- **As an** admin
- **I want to** investigate no-show reports and take appropriate action
- **So that** I can maintain platform quality and handle unreliable users

**US-AD-04: Override Booking States**
- **As an** admin
- **I want to** manually override booking states when necessary (e.g., mark complete, force cancel)
- **So that** I can resolve exceptional situations

**US-AD-05: Monitor Booking Patterns**
- **As an** admin
- **I want to** identify users with concerning booking patterns (frequent cancellations, disputes, no-shows)
- **So that** I can proactively address quality and safeguarding concerns

---

## 3. Functional Requirements

### 3.1 Booking Request Creation

**REQ-BR-001: Booking Request Form**
- Care receiver must be able to create a booking request from a caregiver's profile or search results
- Form must collect: date, start time, duration (minimum 2 hours at Tier 1), service type, special requests
- System must validate that selected date/time falls within caregiver's available slots
- System must display real-time price calculation as duration is adjusted
- System must capture emergency contact details (auto-populated from profile)

**REQ-BR-002: Service Type Selection**
- At Tier 1, only companionship-related services can be selected
- Service type options: Companionship, Light housework, Shopping/errands, Meal preparation, Transportation
- Multiple service types can be selected per booking
- System must display "Companionship Services Only" badge on booking confirmation
- Personal care options must be disabled with tooltip: "Available from Tier 2 onwards"

**REQ-BR-003: Pricing Transparency**
- System must display breakdown: (Hourly rate × Duration) + Platform service fee (e.g., 5%)
- Total amount shown before payment authorization
- Cancellation policy link displayed prominently before submission
- No hidden fees or charges

**REQ-BR-004: Payment Authorization**
- System must authorize payment method before sending booking request to caregiver
- Authorization must hold funds (NOT charge) until caregiver accepts
- Authorization must be valid for 24 hours (caregiver response window)
- If authorization fails, booking request must not be sent
- Care receiver must be notified of authorization failure with clear next steps

**REQ-BR-005: Special Requests Field**
- Optional text field (500 character limit)
- Free-text input for care receiver to provide context (e.g., "I'd like to go to the park if weather is nice")
- Must NOT collect medical information at Tier 1 (system flags health-related keywords for admin review)
- Visible to caregiver upon viewing booking request

**REQ-BR-006: Booking Confirmation Summary**
- Before final submission, display confirmation page with all booking details
- Care receiver must explicitly accept Terms of Service and Cancellation Policy (checkbox)
- "Request Booking" button triggers request submission

### 3.2 Booking Request Review (Caregiver Side)

**REQ-BRR-001: Notification Delivery**
- Caregiver receives email notification immediately upon booking request
- Caregiver receives in-app notification (real-time if online)
- Email includes: care receiver first name, date/time, location (postcode only), earnings amount, link to view request
- Notification emphasizes 24-hour response deadline

**REQ-BRR-002: Request Detail View**
- Caregiver views: Care receiver name and profile summary, date/time/duration, location (postcode) with distance from caregiver, service types requested, special requests, earnings breakdown (hourly rate × duration - platform commission)
- Risk assessment flags NOT displayed at Tier 1 (deferred to Tier 3)
- Medical conditions NOT displayed at Tier 1 (deferred to Tier 3)

**REQ-BRR-003: Response Window**
- Caregiver has 24 hours to respond (accept or decline)
- Countdown timer displayed prominently in UI
- Automated reminders sent at 12 hours and 2 hours before deadline
- If no response after 24 hours, system auto-declines and releases payment authorization

**REQ-BRR-004: Accept Booking**
- Caregiver clicks "Accept Booking"
- System immediately blocks caregiver's calendar for the booking duration
- System captures payment from care receiver (charge card, move to escrow)
- System sends confirmation notifications to both parties
- System shares contact details (caregiver full name and phone; care receiver full address and emergency contact)

**REQ-BRR-005: Decline Booking**
- Caregiver clicks "Decline Booking"
- System prompts for decline reason (dropdown): Scheduling conflict, Too far from my location, Outside my service capability, Rate too low, Other
- Optional message to care receiver (300 character limit)
- System releases payment authorization
- System notifies care receiver with decline reason
- Declined booking logged in caregiver's history (admin oversight)

**REQ-BRR-006: Auto-Decline**
- If caregiver doesn't respond within 24 hours, system automatically declines
- System sends notification to caregiver: "You did not respond to this booking request within 24 hours. It has been automatically declined."
- System notifies care receiver: "Caregiver did not respond to your request. Your payment authorization has been released."
- Pattern of auto-declines triggers admin review (potential inactive caregiver)

### 3.3 Booking Lifecycle Management

**REQ-BL-001: Booking Status States**
- System must support the following states:
  - `requested`: Awaiting caregiver response
  - `accepted`: Confirmed, payment captured in escrow
  - `in_progress`: Start time reached, session ongoing
  - `completed`: Session finished, awaiting confirmation
  - `payment_released`: Payment released to caregiver
  - `reviewed`: Care receiver left review
  - `declined`: Caregiver declined request
  - `expired`: Caregiver did not respond within 24 hours
  - `cancelled`: Either party cancelled before start
  - `cancelled_by_caregiver`: Caregiver cancelled (tracked separately for penalties)
  - `no_show_caregiver`: Caregiver no-show confirmed
  - `no_show_care_receiver`: Care receiver no-show confirmed
  - `disputed`: Dispute raised, admin review required
  - `dispute_resolved`: Dispute resolved by admin (terminal state after `disputed`)

**REQ-BL-002: Status Transitions**
- All state transitions must be validated (e.g., cannot move from `completed` to `requested`)
- State transitions must trigger appropriate actions (notifications, payment processing, calendar updates)
- Invalid state transitions must return error with explanation

**REQ-BL-003: Automated Status Updates**
- When start time reached: Status automatically changes from `accepted` to `in_progress`
- When end time reached + caregiver marks complete: Status changes to `completed`
- 48 hours after completion with no dispute: Status changes to `payment_released` and funds transfer to caregiver

### 3.4 Booking Completion

**REQ-BC-001: Caregiver Marks Complete**
- Caregiver can mark booking complete any time after start time
- Optional session notes field (500 characters, private to admin - not visible to care receiver)
- System logs completion timestamp
- System notifies care receiver: "Your booking has been completed. Please confirm within 48 hours."

**REQ-BC-002: Care Receiver Confirmation**
- Care receiver has 48-hour window to either confirm completion or raise dispute
- Confirm option: "Yes, service was provided as expected"
- Dispute option: "No, I have an issue to report" (opens dispute flow)
- If no action after 48 hours, system auto-confirms completion

**REQ-BC-003: Payment Release**
- Upon confirmation (or 48-hour auto-confirm), system releases payment from escrow to caregiver
- Payment appears in caregiver's bank account within 2-3 business days (Stripe Standard transfer)
- System sends notification to caregiver: "Payment released for [Booking ID]. Funds will arrive in 2-3 business days."
- System prompts care receiver to leave review

**REQ-BC-004: Review Prompts**
- Care receiver receives review prompt 24 hours after booking completion
- Email reminder with direct link to review form
- In-app prompt on next login
- Review deadline: 14 days after booking completion

### 3.5 Booking Cancellation

**REQ-CANC-001: Cancellation Policy (Care Receiver)**
- Care receiver can cancel any `requested` or `accepted` booking before start time
- Cancellation triggers refund calculation based on cancellation policy
- Policy (configurable, example):
  - 48+ hours before start: 100% refund (minus non-refundable service fee if applicable)
  - 24-48 hours before: 50% refund (caregiver compensated 50%)
  - <24 hours before: 0% refund (caregiver compensated 100%)
- System displays refund amount before confirming cancellation
- Refund processed to original payment method within 5-10 business days

**REQ-CANC-002: Cancellation Reason Capture**
- Care receiver must select cancellation reason (dropdown): Schedule change, No longer needed, Caregiver not suitable, Emergency, Other
- Optional additional details (300 characters)
- Cancellation reason logged for analytics and patterns

**REQ-CANC-003: Caregiver Cancellation**
- Caregiver can cancel any `accepted` booking before start time
- Cancellation always triggers 100% refund to care receiver (regardless of timing)
- Late cancellation (<24 hours before start) triggers warning flag for caregiver
- 3 late cancellations within 30 days = temporary account suspension (admin review)
- Caregiver must select cancellation reason: Emergency, Illness, Family commitment, Scheduling conflict, Other
- Optional message to care receiver (300 characters)

**REQ-CANC-004: Mutual Agreement Cancellation**
- If both parties agree to cancel (e.g., via messaging), either party can initiate cancellation
- System asks if cancellation is mutually agreed (checkbox)
- If mutually agreed, standard cancellation penalties do not apply (full refund, no caregiver penalty)
- Admin reviews mutual cancellation claims if pattern detected

**REQ-CANC-005: Calendar Updates**
- Upon cancellation, caregiver's calendar slot is reopened (becomes available again)
- Cancelled booking remains visible in both users' booking history (for audit trail)
- Cancelled bookings excluded from caregiver acceptance rate calculations

### 3.6 No-Show Handling

**REQ-NS-001: Caregiver No-Show Detection**
- If booking status is still `accepted` 30 minutes after start time, system triggers no-show alert to care receiver
- Alert: "Your caregiver hasn't marked the session as started. Are they late or did they not show up?"
- Options: "Caregiver is here (running late)", "Caregiver did not show up", "Cancel no-show alert"

**REQ-NS-002: Caregiver No-Show Reporting**
- Care receiver reports caregiver no-show
- System asks for confirmation: "Are you sure the caregiver did not arrive?"
- Optional evidence upload (e.g., screenshot of attempted contact)
- System immediately suspends caregiver account pending investigation
- System triggers full refund to care receiver
- System creates safeguarding incident for admin review (vulnerable adult left without care)
- Admin contacts both parties within 2 hours to investigate

**REQ-NS-003: Caregiver No-Show Investigation**
- Admin reviews evidence: messages between parties, caregiver GPS location (if mobile app), caregiver's explanation
- Possible outcomes:
  - No-show confirmed: Permanent ban or extended suspension, refund confirmed
  - Miscommunication: Warning to both parties, partial refund
  - Care receiver error: No penalty to caregiver, care receiver warned
- Admin decision documented with rationale

**REQ-NS-004: Care Receiver No-Show Reporting**
- Caregiver marks booking as no-show if care receiver not present
- Caregiver must provide evidence: Photo of location showing they arrived, timestamp, attempted contact proof
- System holds payment pending investigation
- Admin reviews evidence within 24 hours
- If confirmed: Caregiver receives full payment, care receiver warned (3 strikes = account suspension)
- If unconfirmed: Caregiver warned, care receiver not charged

### 3.7 Dispute Resolution

**REQ-DISP-001: Dispute Initiation**
- Care receiver can raise dispute within 48 hours of booking completion
- Dispute reasons: Service not provided as agreed, Duration shorter than booked, Quality below standard, Safety concern, Other
- Required: Detailed description (minimum 100 characters)
- Optional: Evidence upload (photos, screenshots)
- System immediately holds payment (prevents release to caregiver)

**REQ-DISP-002: Dispute Notification**
- System notifies caregiver of dispute immediately
- Caregiver has 48 hours to provide their side of the story
- Required: Detailed response (minimum 100 characters)
- Optional: Counter-evidence upload
- Both parties' statements visible to admin only (not to each other during investigation)

**REQ-DISP-003: Admin Review**
- Admin reviews within 7 days (SLA)
- Admin evaluates: Booking details, messages between parties, session notes, evidence from both parties, user booking history
- Admin makes decision: Full refund to care receiver, Partial refund (25%, 50%, 75%), No refund (caregiver receives full payment)
- Admin documents decision rationale (required)

**REQ-DISP-004: Dispute Outcome Notification**
- System notifies both parties of admin decision
- Decision includes: Outcome, refund amount (if applicable), brief rationale, appeal process info
- Refunds processed within 5-10 business days
- If full or partial refund, caregiver's earnings adjusted accordingly
- Decision logged in booking audit trail

**REQ-DISP-005: Appeal Process**
- Either party can appeal admin decision within 7 days
- Appeal requires new evidence or identification of procedural error
- Senior admin reviews appeal within 14 days
- Appeal decision is final

### 3.8 Recurring Bookings (Future Enhancement - Out of Scope for Tier 1 MVP)

**Note**: Recurring bookings deferred to post-Tier 1 launch. Care receivers can manually rebook the same caregiver for consistent weekly sessions at Tier 1.

---

## 4. State Machine

### 4.1 Complete Booking State Diagram

Reference: `/docs/tiers/common/spec/state-maps.md` - Section 2: Booking Flow

```
[requested]
    |
    | Trigger: Care receiver submits booking request
    | Guard: Payment method valid, caregiver available, date in future
    | Action: Create booking record, authorize payment (hold), notify caregiver
    |
    v
[requested] (awaiting caregiver response, 24-hour window)
    |
    |--- ACCEPT PATH --->
    |   | Trigger: Caregiver clicks "Accept"
    |   | Guard: Payment authorization successful, caregiver still available
    |   | Action: Capture payment to escrow, block calendar, share contact details
    |   v
    | [accepted]
    |   | Trigger: Start time reached OR caregiver marks "Start Session"
    |   | Action: Update status to in_progress, log start timestamp
    |   v
    | [in_progress]
    |   | Trigger: Caregiver marks "Complete Session"
    |   | Guard: End time reached or manual completion
    |   | Action: Log completion timestamp, notify care receiver
    |   v
    | [completed]
    |   | Trigger: Care receiver confirms OR 48 hours elapsed
    |   | Guard: No dispute raised
    |   | Action: Release payment to caregiver, prompt review
    |   v
    | [payment_released]
    |   | Trigger: Care receiver submits review
    |   | Action: Display review on profile
    |   v
    | [reviewed] (terminal state)
    |
    |--- DECLINE PATH --->
    |   | Trigger: Caregiver clicks "Decline" OR 24 hours elapsed
    |   | Action: Release payment authorization, notify care receiver
    |   v
    | [declined] or [expired] (terminal state)
    |
    |--- CANCEL PATH (from requested or accepted) --->
    |   | Trigger: Care receiver or caregiver cancels
    |   | Guard: Before start time
    |   | Action: Apply refund per policy, notify parties, reopen calendar
    |   v
    | [cancelled] or [cancelled_by_caregiver] (terminal state)
    |
    |--- NO-SHOW PATH (from accepted) --->
    |   | Trigger: Start time + 30 min elapsed, not in_progress
    |   | Action: Alert care receiver, allow no-show report
    |   v
    | [possible_no_show]
    |   | Trigger: Care receiver reports no-show
    |   | Action: Suspend caregiver, full refund, admin investigation
    |   v
    | [no_show_caregiver] (terminal state)
    |
    |--- DISPUTE PATH (from completed) --->
    |   | Trigger: Care receiver raises dispute within 48 hours
    |   | Guard: Dispute window still open
    |   | Action: Hold payment, notify admin and caregiver
    |   v
    | [disputed]
    |   | Trigger: Admin resolves dispute
    |   | Action: Process refund per decision, update status
    |   v
    | [dispute_resolved] (terminal state)
```

### 4.2 State Definitions

| State | Description | Care Receiver View | Caregiver View | Payment Status |
|-------|-------------|-------------------|----------------|----------------|
| `requested` | Awaiting caregiver response | "Pending caregiver response" banner | "Accept or Decline" prominent buttons | Payment authorized (held) |
| `accepted` | Confirmed, awaiting start | "Confirmed" badge, date/time, caregiver contact | "Upcoming Booking", care receiver contact | Payment captured (escrow) |
| `in_progress` | Session ongoing | "Session in progress", emergency button visible | "Mark Complete" button | Payment in escrow |
| `completed` | Finished, awaiting confirmation | "Confirm completion" or "Raise dispute" (48h window) | "Awaiting payment release" | Payment in escrow (48h hold) |
| `payment_released` | Payment to caregiver | "Leave review" prompt | Payment released, "Thank care receiver" | Payment released |
| `reviewed` | Review left | Booking history | Booking history, review visible | Payment complete |
| `declined` | Caregiver declined | "Booking declined: [reason]", search alternative | "Declined booking" in history | Payment authorization released |
| `expired` | No caregiver response | "Booking expired: no response", search alternative | "Missed booking request" | Payment authorization released |
| `cancelled` | Cancelled by care receiver | "Booking cancelled", refund amount shown | "Booking cancelled by care receiver" | Refund per cancellation policy |
| `cancelled_by_caregiver` | Cancelled by caregiver | "Booking cancelled by caregiver", full refund | "You cancelled this booking" (flagged if late) | Full refund |
| `no_show_caregiver` | Caregiver no-show confirmed | "Caregiver no-show confirmed", full refund | "No-show report under investigation" | Full refund |
| `no_show_care_receiver` | Care receiver no-show confirmed | "You were marked as no-show" | "Care receiver no-show confirmed", full payment | Full payment to caregiver |
| `disputed` | Dispute raised | "Dispute under admin review" | "Dispute raised, awaiting admin decision" | Payment held pending resolution |
| `dispute_resolved` | Admin resolved dispute | "Dispute resolved: [outcome]" | "Dispute resolved: [outcome]" | Refund processed per decision |

---

## 5. Business Rules

### 5.1 Booking Duration & Timing

**BR-DUR-001: Minimum Booking Duration**
- Minimum booking duration: 2 hours
- Rationale: Ensures caregivers earn viable income for travel time and setup

**BR-DUR-002: Maximum Booking Duration (Tier 1)**
- Maximum single booking duration: 8 hours
- Rationale: Overnight care and extended sessions deferred to Tier 2
- Multi-day bookings allowed (e.g., 3 hours on Monday + 3 hours on Wednesday)

**BR-DUR-003: Booking Advance Notice**
- Minimum advance notice: 2 hours from request time to start time
- Rationale: Allows caregiver response window and preparation time
- System blocks booking requests for start times <2 hours away

**BR-DUR-004: Booking Lead Time**
- Maximum advance booking: 90 days
- Rationale: Prevents calendar congestion and ensures availability accuracy

### 5.2 Cancellation Policies

**BR-CANC-001: Care Receiver Cancellation Refund Matrix**

| Cancellation Time Before Start | Care Receiver Refund | Caregiver Compensation | Platform Fee |
|-------------------------------|---------------------|----------------------|--------------|
| 48+ hours | 100% refund | £0 | Service fee may not be refunded |
| 24-48 hours | 50% refund | 50% booking value | Platform keeps commission on paid portion |
| <24 hours | 0% refund | 100% booking value | Platform keeps commission |

**BR-CANC-002: Caregiver Cancellation Policy**
- All caregiver cancellations: 100% refund to care receiver
- Late cancellation (<24 hours): Warning flag added to caregiver account
- 3 late cancellations within 30 days: Temporary suspension (7 days)
- Pattern of cancellations: Profile review and potential permanent suspension

**BR-CANC-003: Emergency Exception**
- Documented emergencies (illness with medical note, family bereavement, etc.) may waive penalties
- Requires admin review and documentation
- Emergency exemptions logged and monitored for abuse

**BR-CANC-004: Mutual Cancellation**
- If both parties agree to cancel (documented in messages or mutual cancellation form), standard penalties waived
- Full refund to care receiver, no penalty to caregiver
- Admin reviews mutual cancellation claims if user has >3 per month

### 5.3 Payment & Pricing Rules

**BR-PAY-001: Payment Authorization Window**
- Payment authorized (not charged) when booking request submitted
- Authorization valid for 24 hours (caregiver response window)
- If not accepted within 24 hours, authorization released automatically

**BR-PAY-002: Payment Capture Timing**
- Payment captured (charged) immediately upon caregiver acceptance
- Funds held in platform escrow (Stripe Connect)
- Not released to caregiver until service confirmed

**BR-PAY-003: Platform Fee Structure (Example - Configurable)**
- Care receiver service fee: 5% of booking total (added to total)
- Caregiver commission: 15% of booking total (deducted from payout)
- Example: £20/hour × 3 hours = £60 caregiver rate
  - Care receiver pays: £60 + £3 (5%) = £63
  - Caregiver receives: £60 - £9 (15%) = £51
  - Platform revenue: £3 + £9 = £12

**BR-PAY-004: Payment Release Window**
- Payment held in escrow until:
  - Care receiver confirms completion, OR
  - 48 hours elapsed after booking end time with no dispute
- Automatic release to caregiver account after confirmation
- Funds appear in caregiver bank within 2-3 business days (Stripe Standard)

**BR-PAY-005: Refund Processing**
- Refunds processed to original payment method
- Refunds appear in care receiver account within 5-10 business days (bank-dependent)
- Platform service fee may not be refunded (configurable policy)

### 5.4 Response & Completion Timeouts

**BR-TIME-001: Caregiver Response Window**
- Caregiver has 24 hours to respond to booking request
- Automated reminders sent at 12 hours and 2 hours before deadline
- Auto-decline after 24 hours if no response
- Pattern of auto-declines triggers admin review (potential inactive account)

**BR-TIME-002: Completion Confirmation Window**
- Care receiver has 48 hours to confirm or dispute completion
- Auto-confirm if no action within 48 hours
- Payment automatically releases upon auto-confirm

**BR-TIME-003: Dispute Filing Window**
- Care receiver can raise dispute within 48 hours of completion
- After 48 hours, dispute option disabled (payment already released)
- Exception: Safety/safeguarding concerns can be reported anytime (separate flow)

**BR-TIME-004: Admin Review SLA**
- Disputes reviewed within 7 calendar days
- No-show investigations: 24 hours
- Safeguarding escalations: 2 hours
- Appeals: 14 calendar days

### 5.5 No-Show Definitions & Penalties

**BR-NS-001: Caregiver No-Show Definition**
- Booking status still `accepted` 30 minutes after start time
- Caregiver has not marked session as started
- Care receiver confirms caregiver did not arrive

**BR-NS-002: Caregiver No-Show Consequences**
- Immediate account suspension pending investigation
- Full refund to care receiver
- If confirmed: Permanent ban or extended suspension (30+ days) depending on circumstances
- Safeguarding incident created (vulnerable adult left without care)

**BR-NS-003: Care Receiver No-Show Definition**
- Caregiver arrives at location and care receiver not present
- Caregiver attempts contact (phone, doorbell) with no response
- Caregiver provides evidence (photo, timestamp, attempted contact log)

**BR-NS-004: Care Receiver No-Show Consequences**
- Caregiver receives full payment (100% booking value)
- Care receiver warned via email and in-app notification
- 3 confirmed no-shows within 90 days: Account suspension
- Chronic no-shows: Permanent ban (safeguarding concern - may indicate coercion or cognitive decline)

### 5.6 Quality & Safety Enforcement

**BR-QUAL-001: Minimum Caregiver Standards**
- Caregiver must have verified identity and right to work before booking requests sent
- At Tier 1, DBS is voluntary (encouraged with badge display)
- Caregiver profile must be admin-approved before appearing in search

**BR-QUAL-002: Low Rating Intervention**
- Caregiver with average rating <3.0 stars: Profile hidden pending review
- Admin reviews low-rated caregiver within 7 days
- Potential outcomes: Retraining recommendation, warning, suspension, or ban

**BR-QUAL-003: Repeat Dispute Pattern**
- User (caregiver or care receiver) with 3+ disputes in 30 days: Admin review
- Pattern of substantiated disputes against user: Account suspension or ban
- False dispute pattern (abuse of system): Warning and potential suspension

**BR-QUAL-004: Off-Platform Payment Enforcement**
- Requesting payment outside platform: Immediate permanent ban
- Detected via message keyword monitoring
- Zero tolerance policy (safeguarding and financial exploitation risk)

---

## 6. Data Requirements

### 6.1 Booking Entity Data Model

**Primary Booking Table:**

```
bookings {
  id: UUID (primary key)
  care_receiver_id: UUID (foreign key -> users)
  caregiver_id: UUID (foreign key -> users)
  status: ENUM (requested, accepted, in_progress, completed, payment_released, reviewed, declined, expired, cancelled, cancelled_by_caregiver, no_show_caregiver, no_show_care_receiver, disputed, dispute_resolved)

  // Booking Details
  booking_date: DATE
  start_time: TIMESTAMP WITH TIME ZONE
  end_time: TIMESTAMP WITH TIME ZONE
  duration_hours: DECIMAL(4,2)

  // Service Details
  service_types: JSONB (array of selected services: ["companionship", "light_housework", "shopping"])
  special_requests: TEXT (max 500 chars)

  // Location
  care_receiver_postcode: VARCHAR(10)
  care_receiver_full_address: TEXT (visible to caregiver only after acceptance)

  // Emergency Contact
  emergency_contact_name: VARCHAR(255)
  emergency_contact_phone: VARCHAR(20)
  emergency_contact_relationship: VARCHAR(100)

  // Pricing
  hourly_rate: DECIMAL(10,2) (caregiver's rate at time of booking)
  platform_service_fee: DECIMAL(10,2) (care receiver pays)
  platform_commission_rate: DECIMAL(5,2) (percentage deducted from caregiver)
  total_care_receiver_charge: DECIMAL(10,2)
  caregiver_earnings: DECIMAL(10,2) (after commission)

  // Payment
  payment_intent_id: VARCHAR(255) (Stripe Payment Intent ID)
  payment_status: ENUM (authorized, captured, refunded, disputed)
  refund_amount: DECIMAL(10,2) (if applicable)

  // State Tracking
  requested_at: TIMESTAMP
  accepted_at: TIMESTAMP
  declined_at: TIMESTAMP
  started_at: TIMESTAMP
  completed_at: TIMESTAMP
  confirmed_at: TIMESTAMP
  payment_released_at: TIMESTAMP
  reviewed_at: TIMESTAMP
  cancelled_at: TIMESTAMP

  // Cancellation Data
  cancelled_by: UUID (user_id who cancelled)
  cancellation_reason: VARCHAR(255)
  cancellation_details: TEXT

  // Decline Data
  decline_reason: VARCHAR(255)
  decline_message: TEXT (optional message from caregiver)

  // Completion Data
  caregiver_session_notes: TEXT (private, admin-visible only)

  // Dispute Data
  dispute_raised_at: TIMESTAMP
  dispute_reason: VARCHAR(255)
  dispute_description: TEXT
  dispute_resolution: TEXT (admin decision rationale)
  dispute_outcome: ENUM (full_refund, partial_refund, no_refund)

  // Metadata
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
  deleted_at: TIMESTAMP (soft delete for GDPR)
}
```

**Supporting Tables:**

```
booking_state_history {
  id: UUID
  booking_id: UUID (foreign key)
  from_status: VARCHAR(50)
  to_status: VARCHAR(50)
  triggered_by: UUID (user_id or system)
  trigger_reason: TEXT
  timestamp: TIMESTAMP
}

booking_messages {
  // Messages linked to bookings (see messaging system spec)
  id: UUID
  booking_id: UUID (foreign key)
  sender_id: UUID
  recipient_id: UUID
  message_text: TEXT
  sent_at: TIMESTAMP
}

booking_reviews {
  // Reviews linked to bookings (see review system spec)
  id: UUID
  booking_id: UUID (foreign key)
  reviewer_id: UUID (care receiver)
  caregiver_id: UUID
  rating: INTEGER (1-5)
  review_text: TEXT
  created_at: TIMESTAMP
}
```

### 6.2 Data Retention

**Active Bookings:**
- Retained indefinitely while accounts active

**Completed Bookings:**
- Booking records: 7 years (financial audit requirement)
- Personal data (names, addresses): Anonymized after user account deletion (30-day grace period)
- Anonymized booking data (user IDs replaced with pseudonyms): Retained indefinitely for analytics

**Cancelled/Declined Bookings:**
- Retained 2 years (pattern analysis, dispute evidence)
- Anonymized after 2 years

**Disputed Bookings:**
- Retained 7 years (legal defense, regulatory compliance)

### 6.3 Data Access Controls

**Care Receiver Access:**
- Can view: Own bookings (all statuses), caregiver contact details (after acceptance), payment receipts
- Cannot view: Caregiver session notes, admin investigation notes

**Caregiver Access:**
- Can view: Own bookings (all statuses), care receiver contact details (after acceptance), earnings breakdown
- Cannot view: Care receiver payment method details, admin investigation notes

**Admin Access:**
- Can view: All booking data across all users, session notes, dispute evidence, payment details, state history
- Access logged in audit trail

**Family Member Access:**
- Same as care receiver (if permissions granted)
- Access controlled via role-based permissions

---

## 7. Edge Cases

### 7.1 Payment & Financial Edge Cases

**EC-PAY-001: Payment Authorization Failure**
- **Scenario**: Care receiver's card declines during booking request
- **Handling**: Booking request not sent to caregiver. User prompted to update payment method and retry.

**EC-PAY-002: Payment Capture Failure After Acceptance**
- **Scenario**: Caregiver accepts, but payment capture fails (card expired, insufficient funds)
- **Handling**: Booking immediately cancelled. Care receiver notified to update payment method. Caregiver notified of technical issue (not payment failure). Caregiver's calendar reopened.

**EC-PAY-003: Payment Release Failure**
- **Scenario**: Caregiver's bank account invalid or closed when releasing payout
- **Handling**: Stripe retries 3 times over 7 days. Caregiver notified to update bank details. Funds held until valid account provided.

**EC-PAY-004: Refund Failure**
- **Scenario**: Care receiver's original payment method no longer valid
- **Handling**: Platform contacts care receiver for updated payment method. Refund issued as platform credit if user cannot provide valid method.

**EC-PAY-005: Chargeback Dispute**
- **Scenario**: Care receiver disputes charge with bank directly (chargeback)
- **Handling**: Stripe notifies platform. Admin investigates and responds with evidence (booking details, messages, completion confirmation). If chargeback succeeds, caregiver's payout clawed back. Account flagged for chargeback abuse.

### 7.2 Booking Lifecycle Edge Cases

**EC-LIFE-001: Caregiver Accepts Multiple Overlapping Bookings**
- **Scenario**: Caregiver accepts two bookings with overlapping times (race condition)
- **Handling**: System prevents this via database transaction locks. If somehow occurs, later booking auto-cancelled with full refund and apology. Caregiver warned about double-booking attempt.

**EC-LIFE-002: Caregiver Profile Deactivated After Booking Accepted**
- **Scenario**: Caregiver suspended/banned/deactivated after accepting booking but before start time
- **Handling**: Booking automatically cancelled with full refund. Care receiver notified with reason ("Caregiver no longer available"). Platform assists care receiver in finding alternative caregiver.

**EC-LIFE-003: Care Receiver Deletes Account Before Booking Start**
- **Scenario**: Care receiver requests account deletion with pending bookings
- **Handling**: Account deletion blocked if active bookings exist. User must cancel bookings first. Deletion allowed only after all bookings completed or cancelled.

**EC-LIFE-004: Booking Start Time Already Passed When Caregiver Responds**
- **Scenario**: Caregiver tries to accept booking but start time already passed
- **Handling**: System prevents acceptance. Booking auto-declined. Care receiver notified. Rationale: Cannot book past services.

**EC-LIFE-005: Both Parties Report No-Show**
- **Scenario**: Caregiver reports care receiver no-show AND care receiver reports caregiver no-show
- **Handling**: Immediate admin escalation (conflicting reports). Both parties' evidence reviewed. Decision made based on evidence (GPS, photos, messages, timestamps). Liar penalized (warning, suspension, or ban depending on severity).

### 7.3 Communication & Coordination Edge Cases

**EC-COMM-001: Caregiver Running Late**
- **Scenario**: Caregiver will arrive late but care receiver hasn't been notified
- **Handling**: Caregiver sends message via platform. System does NOT automatically extend booking duration or adjust payment. Duration adjustment requires mutual agreement and admin approval.

**EC-COMM-002: Care Receiver Changes Address After Booking Accepted**
- **Scenario**: Care receiver moves or wants service at different address
- **Handling**: Address change request sent to caregiver. Caregiver must accept address change (distance may have increased). If caregiver declines, booking cancelled with no penalty. If accepted, booking updated with new address.

**EC-COMM-003: Caregiver Arrives But Care Receiver Unresponsive (Not Answering Door)**
- **Scenario**: Caregiver arrives on time but care receiver not answering door/phone
- **Handling**: Caregiver attempts contact (doorbell, phone call). After 15 minutes, caregiver contacts platform emergency line. Platform attempts to contact care receiver and emergency contact. If still no response, emergency services may be contacted (wellness check). Caregiver compensated for time (minimum 1 hour). Safeguarding incident created.

### 7.4 Dispute & Resolution Edge Cases

**EC-DISP-001: Dispute Raised After Payment Released**
- **Scenario**: Care receiver tries to dispute after 48-hour window (payment already released)
- **Handling**: Standard dispute system disabled. Safeguarding report system still available. If genuine safeguarding concern, admin investigates and may issue discretionary refund. Non-safety quality disputes not accepted after payment release.

**EC-DISP-002: Caregiver Provides Service But Marks Wrong Completion Time**
- **Scenario**: Caregiver marks booking complete 2 hours early (service actually provided for full duration)
- **Handling**: Care receiver confirms or disputes. If disputed, admin reviews messages and adjusts completion time. Payment adjusted if duration changed. Caregiver warned about accurate completion logging.

**EC-DISP-003: Care Receiver Claims Service Quality Poor But Caregiver Has Perfect Rating**
- **Scenario**: Single poor review/dispute against highly-rated caregiver
- **Handling**: Admin investigates thoroughly (possible personal conflict, unrealistic expectations, or genuine one-off issue). Decision based on evidence. If care receiver has pattern of complaints, their credibility questioned. If isolated incident for both parties, likely mediation or partial refund.

**EC-DISP-004: Caregiver Disputes No-Show Claim**
- **Scenario**: Care receiver reports no-show but caregiver claims they arrived
- **Handling**: Admin requires evidence from caregiver (photo of location, GPS timestamp, attempted contact log). If caregiver provides convincing evidence, no-show claim rejected. If evidence weak or absent, no-show confirmed. False no-show claim by care receiver results in warning.

### 7.5 System & Technical Edge Cases

**EC-SYS-001: Platform Downtime During Booking Window**
- **Scenario**: Platform down when caregiver tries to accept booking or mark complete
- **Handling**: Response/completion window automatically extended by downtime duration. Users notified of extension via email when platform restored.

**EC-SYS-002: Notification Delivery Failure**
- **Scenario**: Caregiver doesn't receive booking request email due to email delivery issue
- **Handling**: In-app notification as backup. SMS notification option (if enabled). User can enable backup notification methods in settings. Undelivered email logged and user notified to check notification settings.

**EC-SYS-003: Timezone Confusion**
- **Scenario**: User in different timezone books for wrong time
- **Handling**: All times displayed in UK time (GMT/BST) with timezone indicator. Confirmation screens prominently display timezone. Post-booking confirmation emails include timezone clarification.

**EC-SYS-004: Concurrent Booking State Changes**
- **Scenario**: Care receiver tries to cancel while caregiver is accepting
- **Handling**: Database transaction locks prevent conflicting state changes. First action to commit wins. User attempting second action receives error: "Booking status changed. Please refresh and try again."

---

## 8. Integration Points

### 8.1 Payment System Integration (Stripe)

**INT-PAY-001: Payment Authorization Flow**
- Booking request creation triggers Stripe Payment Intent creation (capture_method: manual)
- Payment Intent amount calculated: (hourly_rate × duration) + platform_service_fee
- Payment Intent stored in booking record
- If authorization succeeds, booking request sent to caregiver
- If authorization fails, user prompted to update payment method

**INT-PAY-002: Payment Capture Flow**
- Caregiver acceptance triggers Payment Intent capture
- Funds moved from care receiver's card to platform Stripe account (escrow)
- Capture confirmation updates booking.payment_status to 'captured'

**INT-PAY-003: Payout Processing (Stripe Connect)**
- Booking confirmation triggers Stripe Transfer creation
- Funds transferred from platform account to caregiver's Connect account
- Transfer amount: caregiver_earnings (after commission deduction)
- Payout appears in caregiver bank within 2-3 business days (Standard payout)

**INT-PAY-004: Refund Processing**
- Cancellation or dispute resolution triggers Stripe Refund creation
- Refund amount calculated per business rules
- Refund processed to original payment method
- Refund confirmation updates booking.payment_status to 'refunded'

**INT-PAY-005: Webhook Handling**
- Platform subscribes to Stripe webhooks: payment_intent.succeeded, payment_intent.payment_failed, charge.refunded, transfer.created, transfer.failed, charge.dispute.created
- Webhook events update booking payment status in real-time
- Failed payment events trigger user notifications and retry logic

### 8.2 Messaging System Integration

**INT-MSG-001: Booking-Linked Messaging**
- Each booking has dedicated message thread
- Thread created when booking request sent
- Care receiver and caregiver can message before and after booking
- Messages visible to both parties and admin (safeguarding oversight)

**INT-MSG-002: Automated Messages**
- System sends automated messages for key events: "Booking request sent", "Booking accepted", "Booking reminder (24h)", "Session completed"
- Automated messages appear in booking thread
- Users can reply to automated messages (response visible to counterparty)

**INT-MSG-003: Content Filtering Integration**
- Messages scanned for prohibited content (contact info redaction, safeguarding keywords)
- Flagged messages create admin alerts
- Off-platform payment requests trigger immediate account suspension investigation

### 8.3 Calendar & Availability Integration

**INT-CAL-001: Caregiver Availability Check**
- Booking request form queries caregiver availability before allowing submission
- Real-time availability displayed (available time slots highlighted)
- Unavailable times greyed out with tooltip explanation

**INT-CAL-002: Calendar Blocking on Acceptance**
- Caregiver acceptance immediately blocks booking time in caregiver's calendar
- Blocked time prevents double-booking
- Calendar block includes buffer time (e.g., 30 min before/after for travel)

**INT-CAL-003: Calendar Unblocking on Cancellation**
- Cancellation reopens time slot in caregiver's calendar
- Reopened slot becomes available for new bookings
- System prevents rapid re-booking abuse (rate limit: max 3 cancellations per day)

### 8.4 Notification System Integration

**INT-NOTIF-001: Booking Request Notifications**
- Caregiver receives: Email (immediate), In-app notification (real-time), SMS (if enabled)
- Email includes booking summary and direct link to review request
- Reminders sent at 12h and 2h before 24h deadline

**INT-NOTIF-002: Booking Lifecycle Notifications**
- Acceptance: Both parties notified immediately
- 24h reminder: Both parties receive booking reminder
- Completion: Care receiver prompted to confirm
- Payment release: Caregiver notified of payout
- All notifications include deep links to relevant booking page

**INT-NOTIF-003: Escalation Notifications**
- No-show alerts: Care receiver notified 30min after start time
- Dispute notifications: Both parties and admin team
- Cancellation notifications: Both parties with refund details
- Notifications include appropriate urgency level (info, warning, urgent)

### 8.5 Review & Rating System Integration

**INT-REV-001: Review Prompt Trigger**
- Booking completion + confirmation triggers review prompt (24h delay)
- Review form pre-filled with booking details
- Reminder sent after 7 days if review not submitted
- Review deadline: 14 days after booking completion

**INT-REV-002: Review Display on Profile**
- Submitted review appears on caregiver profile immediately (after moderation)
- Review includes: rating, review text, booking date, service type
- Caregiver's average rating recalculated automatically

**INT-REV-003: Low Rating Alert**
- Rating <3 stars triggers admin alert
- Admin reviews booking details and messages for context
- Admin may contact both parties for feedback

### 8.6 Admin Dashboard Integration

**INT-ADMIN-001: Booking Oversight**
- All bookings visible in admin dashboard with filter/search
- Real-time booking status updates
- Flagged bookings (disputed, no-show, high-value) highlighted

**INT-ADMIN-002: Dispute Resolution Interface**
- Disputed bookings appear in queue with evidence attached
- Admin can view: booking details, messages, user histories, evidence uploads
- Admin decision updates booking status and triggers refund processing

**INT-ADMIN-003: Safeguarding Integration**
- No-show reports create safeguarding incidents automatically
- Off-platform payment detection in messages creates safeguarding alerts
- Admin can suspend users directly from booking view

### 8.7 Analytics & Reporting Integration

**INT-ANALY-001: Booking Metrics**
- Booking created/accepted/completed events sent to analytics platform
- Conversion funnel tracking: Request → Accept → Complete → Review
- Drop-off analysis at each stage

**INT-ANALY-002: Financial Reporting**
- Booking completion triggers revenue calculation
- Daily/weekly/monthly revenue aggregation
- Refund and chargeback tracking

---

## 9. Acceptance Criteria

### 9.1 Core Booking Flow

**AC-CORE-001: Care Receiver Can Request Booking**
- [ ] Care receiver can access booking form from caregiver profile
- [ ] Form displays caregiver availability calendar with available slots highlighted
- [ ] Care receiver can select date, time, duration (min 2 hours, max 8 hours)
- [ ] Care receiver can select multiple service types (companionship, light housework, shopping, meal prep, transportation)
- [ ] Care receiver can enter special requests (500 char limit)
- [ ] System calculates and displays total price in real-time
- [ ] System displays cancellation policy before submission
- [ ] Payment method authorized (funds held) before request sent
- [ ] Caregiver receives notification within 1 minute of request submission

**AC-CORE-002: Caregiver Can Review and Accept Booking Request**
- [ ] Caregiver receives email notification of new request
- [ ] Caregiver receives in-app notification (real-time)
- [ ] Request detail page shows: care receiver name, location, date/time, duration, service types, special requests, earnings breakdown
- [ ] 24-hour countdown timer displayed prominently
- [ ] Caregiver can click "Accept" and booking confirmed instantly
- [ ] Care receiver receives acceptance notification within 1 minute
- [ ] Payment captured from care receiver's card on acceptance
- [ ] Contact details shared with both parties after acceptance
- [ ] Caregiver's calendar automatically blocked for booking duration

**AC-CORE-003: Caregiver Can Decline Booking Request**
- [ ] Caregiver can click "Decline"
- [ ] System prompts for decline reason (dropdown)
- [ ] Optional message to care receiver (300 char limit)
- [ ] Payment authorization released immediately
- [ ] Care receiver notified of decline with reason
- [ ] Declined booking appears in caregiver history

**AC-CORE-004: Auto-Decline After 24 Hours**
- [ ] If caregiver doesn't respond within 24 hours, booking auto-declined
- [ ] Payment authorization released
- [ ] Care receiver notified of expiration
- [ ] Caregiver notified of missed opportunity

**AC-CORE-005: Booking Completion and Payment Release**
- [ ] Caregiver can mark booking complete after start time
- [ ] Care receiver receives completion notification
- [ ] Care receiver has 48 hours to confirm or dispute
- [ ] If no action after 48 hours, booking auto-confirmed
- [ ] Payment released to caregiver upon confirmation
- [ ] Care receiver prompted to leave review
- [ ] Payout appears in caregiver account within 2-3 business days

### 9.2 Cancellation Flow

**AC-CANC-001: Care Receiver Cancellation >48 Hours**
- [ ] Care receiver can cancel booking with >48h notice
- [ ] System calculates 100% refund (minus service fee if applicable)
- [ ] Refund amount displayed before confirmation
- [ ] Cancellation reason captured
- [ ] Caregiver notified of cancellation
- [ ] Caregiver's calendar reopened
- [ ] Refund processed within 5-10 business days

**AC-CANC-002: Care Receiver Cancellation <24 Hours**
- [ ] Care receiver can cancel booking with <24h notice
- [ ] System calculates 0% refund (caregiver compensated 100%)
- [ ] Refund amount (£0) displayed before confirmation
- [ ] Caregiver receives full payment
- [ ] Care receiver notified of no-refund policy

**AC-CANC-003: Caregiver Cancellation (Late)**
- [ ] Caregiver can cancel booking before start time
- [ ] If <24h notice, warning flag added to account
- [ ] Care receiver receives 100% refund regardless of timing
- [ ] Care receiver notified immediately
- [ ] Platform assists care receiver in finding alternative caregiver

### 9.3 No-Show Handling

**AC-NS-001: Caregiver No-Show Detection**
- [ ] If booking not started 30min after start time, care receiver receives alert
- [ ] Care receiver can report no-show
- [ ] Caregiver account immediately suspended
- [ ] Care receiver receives full refund
- [ ] Admin investigation triggered within 2 hours
- [ ] Safeguarding incident created (vulnerable adult left without care)

**AC-NS-002: Care Receiver No-Show**
- [ ] Caregiver can report care receiver no-show with evidence
- [ ] Admin reviews evidence within 24 hours
- [ ] If confirmed, caregiver receives full payment
- [ ] Care receiver warned (3 strikes = suspension)

### 9.4 Dispute Resolution

**AC-DISP-001: Care Receiver Raises Dispute**
- [ ] Care receiver can raise dispute within 48h of completion
- [ ] Dispute form requires reason and description (min 100 chars)
- [ ] Optional evidence upload
- [ ] Payment held (not released to caregiver)
- [ ] Caregiver notified immediately and prompted for response
- [ ] Admin receives dispute notification

**AC-DISP-002: Admin Reviews Dispute**
- [ ] Admin can view all dispute details and evidence
- [ ] Admin can view booking history and messages
- [ ] Admin makes decision: full refund, partial refund, or no refund
- [ ] Admin documents rationale (required)
- [ ] Both parties notified of decision within 7 days
- [ ] Refund processed automatically based on decision

### 9.5 Payment & Financial

**AC-PAY-001: Payment Authorization**
- [ ] Care receiver payment method authorized (not charged) on booking request
- [ ] Authorization valid for 24 hours
- [ ] Authorization released if booking declined or expired
- [ ] Care receiver notified if authorization fails

**AC-PAY-002: Payment Capture**
- [ ] Payment captured (charged) when caregiver accepts
- [ ] Funds held in platform escrow (Stripe Connect)
- [ ] Care receiver receives payment confirmation email with receipt

**AC-PAY-003: Payment Release**
- [ ] Payment released to caregiver after confirmation
- [ ] Caregiver notified of payout
- [ ] Funds appear in bank within 2-3 business days
- [ ] Transaction appears in caregiver earnings dashboard

**AC-PAY-004: Refund Processing**
- [ ] Refunds processed to original payment method
- [ ] Refund amount calculated correctly per policy
- [ ] Care receiver receives refund confirmation email
- [ ] Refund appears in account within 5-10 business days

### 9.6 Communication & Notifications

**AC-COMM-001: Booking Notifications**
- [ ] Caregiver receives email + in-app notification for new request
- [ ] Care receiver receives notification when caregiver accepts/declines
- [ ] Both parties receive 24h booking reminder
- [ ] Both parties receive completion notifications
- [ ] All notifications include deep links to booking page

**AC-COMM-002: Messaging**
- [ ] Care receiver can message caregiver after booking request sent
- [ ] Caregiver can message care receiver after viewing request
- [ ] Messages visible in dedicated booking thread
- [ ] Prohibited content automatically filtered
- [ ] Admin can view all messages for safeguarding oversight

### 9.7 Admin Oversight

**AC-ADMIN-001: Booking Dashboard**
- [ ] Admin can view all bookings with status filters
- [ ] Admin can search bookings by user, date, or ID
- [ ] Flagged bookings (disputed, no-show) highlighted
- [ ] Admin can click booking to view full details

**AC-ADMIN-002: Dispute Management**
- [ ] Disputed bookings appear in admin queue
- [ ] Admin can view evidence from both parties
- [ ] Admin can make refund decision with rationale
- [ ] Decision triggers automatic refund processing

**AC-ADMIN-003: Manual Overrides**
- [ ] Admin can manually mark booking complete (exceptional circumstances)
- [ ] Admin can force cancel booking with reason
- [ ] Admin can issue manual refunds
- [ ] All admin actions logged in audit trail

### 9.8 State Machine Compliance

**AC-STATE-001: Valid State Transitions Only**
- [ ] System prevents invalid state transitions (e.g., completed → requested)
- [ ] Attempting invalid transition returns clear error message
- [ ] All state changes logged in booking_state_history table

**AC-STATE-002: State-Triggered Actions**
- [ ] Acceptance triggers payment capture, calendar block, contact sharing
- [ ] Completion triggers confirmation prompt, review prompt
- [ ] Confirmation triggers payment release
- [ ] Cancellation triggers refund, calendar unblock
- [ ] Dispute triggers payment hold, admin notification

---

## 10. Out of Scope (Tier 1)

### 10.1 Features Explicitly Deferred to Tier 2

**Personal Care Services:**
- Personal care bookings (washing, dressing, toileting)
- Mobility assistance requiring physical contact
- Medication assistance or prompting
- Overnight care (10pm-8am example)
- Care skills matching and requirements

**Verification & Compliance:**
- Mandatory DBS verification (voluntary at Tier 1)
- Qualification verification (Care Certificate, NVQ)
- Insurance verification (public liability)
- Reference checks (professional references)

### 10.2 Features Deferred to Tier 3

**Condition-Specific Features:**
- Medical condition profile (care receiver)
- Medical condition experience profile (caregiver)
- Condition-specific matching algorithm
- Risk assessment and care plan upload
- Care complexity scoring
- Live-in care bookings (weekly/monthly)

**Clinical Safety:**
- Medication assistance logging
- Falls and injury reporting
- Behavioral change monitoring
- Clinical incident management

### 10.3 Features Deferred to Post-Launch (Optimizations)

**Recurring Bookings:**
- Automated weekly recurring sessions
- Recurring booking discounts
- Series cancellation management
- Recurring payment processing

**Advanced Matching:**
- AI/ML matching algorithm
- Intelligent caregiver recommendations
- Predictive availability matching
- Dynamic pricing based on demand

**Mobile App Features:**
- Native iOS/Android apps
- GPS location sharing
- Push notifications
- Offline mode

**Advanced Calendar:**
- Google Calendar sync (two-way)
- Availability templates (copy week)
- Bulk availability updates (multi-week)
- Time zone support for international family members

### 10.4 Out of Scope (Platform Model)

**Employee Management:**
- Platform does NOT employ caregivers (self-employed model)
- Platform does NOT provide caregiver training (resources only)
- Platform does NOT assign bookings (caregivers accept/decline)
- Platform does NOT set mandatory rates (caregivers set own rates)

**CQC Registration:**
- Platform operates as Introduction Agency (NOT CQC-registered)
- Platform does NOT provide care services directly
- Platform does NOT conduct care assessments
- CQC compliance features are voluntary best practices (FDR-002)

**Healthcare Integration:**
- No NHS/GP integration at Tier 1
- No electronic health record (EHR) integration
- No care plan management system
- No multi-professional coordination

---

## Appendix A: Business Rule Configuration

The following business rules are configurable via admin settings (not hardcoded):

| Rule | Default Value | Configurable Range |
|------|---------------|-------------------|
| Minimum booking duration | 2 hours | 1-4 hours |
| Maximum booking duration (Tier 1) | 8 hours | 6-12 hours |
| Caregiver response window | 24 hours | 12-48 hours |
| Care receiver confirmation window | 48 hours | 24-72 hours |
| Platform service fee (care receiver) | 5% | 0-10% |
| Platform commission (caregiver) | 15% | 10-20% |
| Cancellation refund (48h+) | 100% | 75-100% |
| Cancellation refund (24-48h) | 50% | 25-75% |
| Cancellation refund (<24h) | 0% | 0-25% |
| Late cancellation warning threshold | 3 in 30 days | 2-5 |
| Review prompt delay | 24 hours | 6-48 hours |
| Review deadline | 14 days | 7-30 days |
| Dispute filing window | 48 hours | 24-72 hours |

**Rationale for Configurability**: Business rules may need adjustment based on market feedback, competitive landscape, and caregiver/care receiver behavior patterns. Configurability allows rapid iteration without code changes.

---

## Appendix B: User Journey Maps

### B.1 Happy Path: First-Time Booking (Care Receiver)

1. Care receiver searches for caregivers by postcode
2. Browses caregiver profiles, reads reviews
3. Selects preferred caregiver
4. Clicks "Request Booking" on caregiver profile
5. Selects date from availability calendar (e.g., next Tuesday 2-5pm)
6. Selects service types: Companionship, Light housework
7. Enters special request: "I'd like help organizing my photo albums"
8. Reviews price calculation: £20/hour × 3 hours = £60 + £3 service fee = £63 total
9. Confirms emergency contact details pre-filled from profile
10. Accepts Terms of Service and Cancellation Policy
11. Clicks "Request Booking" → Payment authorized (£63 held on card)
12. Receives confirmation: "Your booking request has been sent to [Caregiver Name]. They have 24 hours to respond."
13. Waits for caregiver response (receives reminder at 12h mark)
14. Caregiver accepts after 6 hours
15. Care receiver receives email: "Your booking is confirmed! [Caregiver Name] will arrive Tuesday at 2pm."
16. Care receiver receives booking reminder 24 hours before
17. Caregiver arrives on time Tuesday 2pm
18. Session goes well, caregiver marks complete at 5pm
19. Care receiver receives prompt: "Please confirm your booking is complete"
20. Care receiver confirms completion
21. Payment released to caregiver
22. Care receiver receives review prompt next day
23. Care receiver leaves 5-star review: "Wonderful companionship, very patient with photo organizing!"
24. Review appears on caregiver profile

### B.2 Decline Path: Caregiver Declines Request

1-11. (Same as Happy Path)
12. Caregiver views request, realizes date conflicts with existing commitment
13. Caregiver clicks "Decline"
14. Selects decline reason: "Scheduling conflict"
15. Optionally writes message: "I'm so sorry, I have a prior commitment that day. I'd love to work with you another time!"
16. Clicks "Confirm Decline"
17. Care receiver receives notification: "Unfortunately, [Caregiver Name] declined your request due to scheduling conflict. Your payment authorization has been released."
18. Care receiver searches for alternative caregiver
19. Repeats booking request with different caregiver

### B.3 Cancellation Path: Care Receiver Cancels Late

1-15. (Same as Happy Path through acceptance)
16. Monday evening (18 hours before booking), care receiver realizes conflict
17. Care receiver navigates to booking details
18. Clicks "Cancel Booking"
19. System displays warning: "Cancelling less than 24 hours before start time results in 0% refund. The caregiver will be compensated in full."
20. Care receiver selects cancellation reason: "Schedule change"
21. Confirms cancellation despite no refund
22. Caregiver receives notification: "Your booking for Tuesday has been cancelled by the care receiver. You will receive full payment (£51 after commission)."
23. Care receiver charged £63 (no refund)
24. Caregiver compensated £51
25. Caregiver's Tuesday 2-5pm slot reopened for new bookings

### B.4 Dispute Path: Service Quality Issue

1-17. (Same as Happy Path through session)
18. Session only lasts 2 hours instead of 3 hours (caregiver left early due to emergency)
19. Caregiver marks complete at 4pm
20. Care receiver receives completion prompt
21. Care receiver clicks "I have an issue to report" instead of confirming
22. Dispute form opens, care receiver selects reason: "Duration shorter than booked"
23. Care receiver writes description: "Caregiver left after 2 hours due to family emergency. Service was excellent but I paid for 3 hours."
24. Care receiver submits dispute
25. Caregiver receives notification: "A dispute has been raised. Please provide your side of the story within 48 hours."
26. Caregiver responds: "I sincerely apologize. I had a family emergency and had to leave early. I should have communicated this better."
27. Admin reviews dispute within 3 days
28. Admin decides: 33% refund (£20 refunded to care receiver, caregiver keeps payment for 2 hours worked)
29. Admin documents rationale: "Caregiver left early due to emergency. Care receiver entitled to refund for undelivered hour. Caregiver acted reasonably given circumstances."
30. Both parties notified of decision
31. Care receiver receives £20 refund within 5-10 days
32. Care receiver leaves 4-star review acknowledging caregiver's professionalism despite emergency

---

## Appendix C: Error Messages & User-Facing Copy

### Booking Request Errors

**Payment Authorization Failed:**
> "We couldn't authorize your payment method. Please update your payment details and try again."

**Caregiver No Longer Available:**
> "This caregiver is no longer available for the selected time. Please choose a different time or caregiver."

**Booking Too Soon:**
> "Bookings must be requested at least 2 hours in advance to allow caregivers time to respond. Please select a later time."

**Invalid Duration:**
> "Booking duration must be between 2 and 8 hours for companionship services. For longer sessions, please contact support."

### Cancellation Confirmations

**Late Cancellation Warning (Care Receiver):**
> "⚠️ Cancelling less than 24 hours before start time results in 0% refund. The caregiver will be compensated in full for the cancelled booking. Do you want to proceed?"

**Caregiver Late Cancellation Warning:**
> "⚠️ Cancelling less than 24 hours before start time will add a warning to your account. 3 late cancellations within 30 days may result in account suspension. If this is an emergency, please provide details."

### No-Show Alerts

**Caregiver No-Show Alert (to Care Receiver):**
> "Your caregiver hasn't marked the session as started yet. They may be running late. If they don't arrive within the next 15 minutes, please report a no-show."

**No-Show Report Confirmation:**
> "We've received your no-show report and suspended the caregiver's account pending investigation. You will receive a full refund within 5-10 business days. We sincerely apologize for this experience."

### Dispute Messages

**Dispute Confirmation:**
> "Your dispute has been submitted. We'll review the details and make a decision within 7 days. Payment to the caregiver has been paused pending resolution."

**Dispute Outcome (Full Refund):**
> "After reviewing your dispute, we've determined that a full refund is appropriate. You'll receive £63 back within 5-10 business days. Thank you for your patience."

---

## Appendix D: Testing Scenarios

### Critical Path Testing

**T-001: End-to-End Happy Path**
- Create care receiver account → verify identity → add payment method → search caregivers → request booking → caregiver accepts → complete booking → confirm completion → payment released → leave review

**T-002: Decline Path**
- Request booking → caregiver declines → payment authorization released → search alternative caregiver

**T-003: Cancellation Paths**
- Request booking → caregiver accepts → care receiver cancels >48h → full refund
- Request booking → caregiver accepts → care receiver cancels <24h → no refund
- Request booking → caregiver accepts → caregiver cancels → full refund + warning

**T-004: No-Show Scenarios**
- Caregiver no-show → care receiver reports → admin investigates → confirmed → full refund + ban
- Care receiver no-show → caregiver reports with evidence → admin confirms → caregiver full payment

**T-005: Dispute Resolution**
- Complete booking → care receiver disputes → caregiver responds → admin reviews → partial refund → both parties notified

### Edge Case Testing

**T-006: Payment Failures**
- Authorization failure on request → user updates card → retry successful
- Capture failure on acceptance → booking cancelled → user notified

**T-007: Concurrent Actions**
- Caregiver accepts while care receiver cancels → first action wins, second blocked
- Caregiver accepts overlapping bookings → second acceptance blocked (double-booking prevention)

**T-008: Timeout Scenarios**
- Caregiver doesn't respond within 24h → auto-decline → payment released
- Care receiver doesn't confirm within 48h → auto-confirm → payment released

**T-009: State Transition Validation**
- Attempt invalid transitions (e.g., completed → requested) → blocked with error
- Attempt to cancel after completion → blocked with error

### Load & Performance Testing

**T-010: High Booking Volume**
- 1000 concurrent booking requests → all processed within 3 seconds
- 500 caregiver acceptances per minute → all payments captured successfully

**T-011: Notification Delivery**
- 10,000 booking reminder emails sent → 95%+ delivery rate within 5 minutes

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-06 | Product Team | Initial Tier 1 booking specification created |

---

**END OF DOCUMENT**
