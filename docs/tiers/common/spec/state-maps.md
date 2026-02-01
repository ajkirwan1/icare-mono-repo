# State Maps for High-Risk Flows

**Document Purpose**: Define complete state machines for critical flows involving vulnerable adults, regulatory compliance, and financial transactions. These state maps are binding for engineering implementation.

**Document Owner**: Product Manager + Engineering Lead
**Last Updated**: 2026-01-31
**Status**: Canonical - Engineering Reference
**Tier Applicability**: All Tiers (T1-T4) - These core flows apply across all tiers. Tier-specific variations (e.g., DBS verification at T2+) are noted where applicable.

---

## How to Use This Document

- **State Diagrams**: Text-based state machines with all possible states and transitions
- **Trigger Events**: What causes state transitions
- **Guard Conditions**: Conditions that must be met for transition to occur
- **Actions**: Side effects executed on transition (notifications, payments, logs)
- **Timeout Rules**: Automatic state transitions after time elapsed
- **Compliance Requirements**: Regulatory obligations per state

---

## State Map Index

1. [Registration Flow (All User Types)](#1-registration-flow)
2. [Booking Flow](#2-booking-flow)
3. [Emergency Flow](#3-emergency-flow)
4. [Safeguarding Incident Flow](#4-safeguarding-incident-flow)
5. [Dispute Flow](#5-dispute-flow)
6. [Account Suspension Flow](#6-account-suspension-flow)
7. [GDPR Deletion Flow](#7-gdpr-deletion-flow)

---

## 1. Registration Flow

**Scope**: Care Receiver, Family Member, Caregiver registration

**States**: `unregistered` → `pending_phone_verification` → `phone_verified` → `active` (Care Receiver/Family) OR `pending_verification` (Caregiver)

---

### State Diagram

```
[unregistered]
    |
    | Event: User submits registration form
    | Guard: Email not already registered, password meets requirements
    | Action: Create user record (status: pending_phone_verification), send SMS code, log registration event
    |
    v
[pending_phone_verification]
    |
    | Event: User enters correct SMS code
    | Guard: Code matches, not expired (10 min), attempts < 3
    | Action: Mark phone_verified = true, send welcome email
    |
    v
[phone_verified]
    |
    | IF user_type = care_receiver OR family_member:
    |     Event: Phone verification complete
    |     Action: Set status = active, redirect to dashboard
    |     v
    |   [active]
    |
    | IF user_type = caregiver:
    |     Event: Phone verification complete
    |     Action: Set status = pending_verification, redirect to onboarding
    |     v
    |   [pending_verification]
    |       |
    |       | Event: Admin approves all verifications (identity, DBS, qualifications)
    |       | Guard: All verification statuses = verified
    |       | Action: Set status = active, send approval email, make profile searchable
    |       |
    |       v
    |   [active]
    |
    | FROM ANY STATE:
    |   Event: Admin suspends account (safeguarding concern)
    |   Action: Set status = suspended, invalidate sessions, hide profile
    |   v
    | [suspended]
    |       |
    |       | Event: Admin reinstates account (investigation complete, no violation)
    |       | Action: Set status = active (or pending_verification if caregiver), notify user
    |       |
    |       v
    |   [active] or [pending_verification]
    |
    | FROM ANY STATE:
    |   Event: Admin permanently bans account (serious safeguarding violation)
    |   Action: Set status = banned, invalidate sessions, delete profile, log reason
    |   v
    | [banned] (terminal state)
```

---

### State Definitions

| State | Description | User Experience | Admin View |
|-------|-------------|-----------------|------------|
| `unregistered` | User does not exist in system | N/A | N/A |
| `pending_phone_verification` | User registered but phone not verified | "Check your phone for SMS code" screen | Not visible in admin |
| `phone_verified` | Phone verified, account creation complete | Care Receiver/Family: Dashboard access. Caregiver: Onboarding flow | Caregiver visible in "Pending Verification" queue |
| `pending_verification` | Caregiver awaiting admin verification | "Your profile is under review. You'll be notified when verified." Cannot receive bookings. | Visible in "Caregiver Applications" queue |
| `active` | Full account access | Full platform features | Normal user status |
| `suspended` | Temporary suspension (investigation) | "Your account is suspended. Contact support." Cannot login. | "Suspended" badge, access to investigation notes |
| `banned` | Permanent ban | "Your account has been permanently banned." Cannot login. | "Banned" badge, reason logged |

---

### Transition Events

| Event | Trigger | Guard Conditions | Actions |
|-------|---------|------------------|---------|
| `submit_registration_form` | User clicks "Create Account" | Email not already registered, password valid, phone valid | Create user record, send SMS code, create audit log entry |
| `verify_phone_code` | User enters SMS code | Code matches, not expired (10 min), attempts < 3 | Mark phone_verified = true, send welcome email |
| `phone_code_expired` | 10 minutes elapsed | Code not yet verified | Allow user to request new code (max 3 per hour) |
| `admin_approve_verification` | Admin clicks "Approve" | All verifications verified (identity, DBS, qualifications) | Set status = active, send approval email, make profile searchable |
| `admin_reject_verification` | Admin clicks "Reject" with reason | At least one verification failed | Send rejection email with reason, allow resubmission |
| `admin_suspend_account` | Admin clicks "Suspend" with reason | Any state except banned | Set status = suspended, invalidate sessions, hide profile, notify user |
| `admin_reinstate_account` | Admin clicks "Reinstate" after investigation | Currently suspended | Restore previous status, notify user, restore profile visibility |
| `admin_ban_account` | Admin clicks "Permanent Ban" with reason | Any state | Set status = banned, invalidate sessions, delete profile, log reason |

---

### Timeout/Escalation Rules

| Scenario | Timeout | Action |
|----------|---------|--------|
| Phone verification not completed | 24 hours | Delete pending user record (allows re-registration) |
| Caregiver verification pending | 14 days | Send reminder email to caregiver ("Upload missing documents") |
| Caregiver verification pending | 30 days | Admin escalation alert ("Application stalled") |

---

### Compliance Requirements

**GDPR (Article 5 - Data Minimization)**:
- Delete pending user records if phone not verified within 24 hours (no legitimate interest in storing unverified data)

**Care Act 2014 (Safeguarding Duty)**:
- Suspended accounts must have investigation notes documenting reason and outcome
- Banned accounts must have audit log entry with permanent record of safeguarding violation

**Equality Act 2010**:
- Rejection of caregiver verification must be based on objective criteria (e.g., expired DBS, fake qualification), not discriminatory grounds

---

---

## 2. Booking Flow

**Scope**: Hourly, daily, and multi-day bookings (NOT live-in care - separate flow)

**States**: `draft` → `requested` → `accepted` → `in_progress` → `completed` → `reviewed`

**Terminal States**: `cancelled`, `declined`, `disputed`, `no_show`

---

### State Diagram

```
[draft]
    |
    | Event: Care receiver submits booking request
    | Guard: Care receiver has payment method, caregiver available, date in future
    | Action: Create booking record (status: requested), notify caregiver, authorize payment (hold)
    |
    v
[requested]
    |
    | Event: Caregiver accepts booking
    | Guard: Caregiver still available, payment authorization successful
    | Action: Capture payment (hold in escrow), set status = accepted, notify care receiver, share contact details
    |
    v
[accepted]
    |
    | Event: Start time reached, caregiver marks "Start Session"
    | Guard: Current time >= start time, caregiver on-site (optional: GPS check)
    | Action: Set status = in_progress, log start time
    |
    v
[in_progress]
    |
    | Event: End time reached, caregiver marks "Complete Session"
    | Guard: Current time >= end time (or manual completion before end time)
    | Action: Set status = completed, log end time, prompt both parties for review
    |
    v
[completed]
    |
    | Event: 48 hours elapsed OR care receiver confirms completion
    | Guard: No dispute raised
    | Action: Release payment to caregiver, set status = payment_released
    |
    v
[payment_released]
    |
    | Event: Care receiver leaves review
    | Action: Set status = reviewed, display review on caregiver profile
    |
    v
[reviewed] (terminal state)

--- Alternative Paths ---

FROM [requested]:
    | Event: Caregiver declines booking
    | Action: Set status = declined, release payment authorization, notify care receiver, log decline reason
    v
[declined] (terminal state)

FROM [requested]:
    | Event: 24 hours elapsed, no caregiver response
    | Action: Auto-decline booking, set status = expired, release payment authorization, notify care receiver
    v
[expired] (terminal state)

FROM [requested] OR [accepted]:
    | Event: Care receiver cancels booking
    | Guard: Cancellation policy check (time before start)
    | Action: Set status = cancelled, apply refund per policy, notify caregiver, log cancellation reason
    v
[cancelled] (terminal state)

FROM [accepted]:
    | Event: Caregiver cancels booking
    | Guard: Before start time
    | Action: Set status = cancelled_by_caregiver, full refund to care receiver, notify care receiver, flag caregiver (if <24h notice)
    v
[cancelled_by_caregiver] (terminal state)

FROM [accepted]:
    | Event: Start time + 30 min elapsed, not marked in_progress
    | Action: Trigger no-show alert to care receiver, allow no-show report
    v
[possible_no_show]
        |
        | Event: Care receiver reports caregiver no-show
        | Action: Set status = no_show, full refund, suspend caregiver pending investigation
        v
    [no_show_caregiver] (terminal state)
        |
        | Event: Caregiver disputes no-show (provides evidence)
        | Action: Set status = disputed, admin reviews
        v
    [disputed]

FROM [completed]:
    | Event: Care receiver raises dispute ("Service not provided as agreed")
    | Guard: Within 48 hours of completion
    | Action: Set status = disputed, hold payment, notify admin and caregiver
    v
[disputed]
        |
        | Event: Admin resolves dispute (full refund, partial refund, or no refund)
        | Action: Process refund per admin decision, set status = dispute_resolved, log outcome
        v
    [dispute_resolved] (terminal state)
```

---

### State Definitions

| State | Description | Care Receiver View | Caregiver View | Payment Status |
|-------|-------------|-------------------|----------------|----------------|
| `draft` | Booking being created | Booking form | N/A | No authorization |
| `requested` | Awaiting caregiver response | "Pending caregiver response" | "Accept or Decline" button | Payment authorized (held) |
| `accepted` | Confirmed, awaiting start | "Confirmed" badge, date/time, caregiver contact | "Upcoming Booking", care receiver contact | Payment captured (escrow) |
| `in_progress` | Session ongoing | "Session in progress", emergency button visible | "Mark Complete" button, emergency button | Payment in escrow |
| `completed` | Session finished, awaiting confirmation | "Confirm completion" or "Raise dispute" (48h window) | "Awaiting payment release" | Payment in escrow (48h hold) |
| `payment_released` | Payment to caregiver | "Leave review" prompt | Payment released, "Thank care receiver" | Payment released |
| `reviewed` | Review left | Booking history | Booking history, review visible on profile | Payment complete |
| `declined` | Caregiver declined | "Booking declined: [reason]", search for alternative | "Declined booking" in history | Payment authorization released |
| `cancelled` | Cancelled by care receiver | "Booking cancelled", refund amount shown | "Booking cancelled by care receiver" | Refund per cancellation policy |
| `cancelled_by_caregiver` | Cancelled by caregiver | "Booking cancelled by caregiver", full refund | "You cancelled this booking" (flagged if late) | Full refund |
| `no_show_caregiver` | Caregiver no-show | "Caregiver no-show confirmed", full refund | "No-show report under investigation" | Full refund |
| `disputed` | Dispute raised | "Dispute under admin review" | "Dispute raised, awaiting admin decision" | Payment held pending resolution |
| `dispute_resolved` | Admin resolved dispute | "Dispute resolved: [outcome]" | "Dispute resolved: [outcome]" | Refund processed per decision |

---

### Transition Events

| Event | Trigger | Guard Conditions | Actions |
|-------|---------|------------------|---------|
| `submit_booking_request` | Care receiver clicks "Request Booking" | Payment method on file, caregiver available, date in future | Create booking record, authorize payment, send notification to caregiver |
| `accept_booking` | Caregiver clicks "Accept" | Payment authorization successful, caregiver still available | Capture payment to escrow, update status, share contact details |
| `decline_booking` | Caregiver clicks "Decline" | Within 24h response window | Release payment authorization, notify care receiver, log reason |
| `auto_decline_booking` | 24 hours elapsed | No caregiver response | Release payment authorization, notify care receiver |
| `cancel_booking_care_receiver` | Care receiver clicks "Cancel" | Before start time | Calculate refund per policy, process refund, notify caregiver |
| `cancel_booking_caregiver` | Caregiver clicks "Cancel" | Before start time | Full refund to care receiver, flag caregiver if <24h notice |
| `start_session` | Caregiver clicks "Start Session" | Current time >= start time | Update status, log start timestamp |
| `complete_session` | Caregiver clicks "Complete Session" | Current time >= end time OR manual early completion | Update status, log end timestamp, prompt reviews |
| `confirm_completion` | Care receiver clicks "Confirm" OR 48h elapsed | Within 48h of completion | Release payment to caregiver, update status |
| `report_no_show` | Care receiver clicks "Report No-Show" | Start time + 30 min elapsed, not in_progress | Full refund, suspend caregiver, create safeguarding alert |
| `raise_dispute` | Care receiver clicks "Raise Dispute" | Within 48h of completion | Hold payment, notify admin and caregiver, create dispute ticket |
| `resolve_dispute` | Admin selects resolution | Admin reviewed evidence | Process refund per decision, update status, notify parties |

---

### Timeout/Escalation Rules

| Scenario | Timeout | Action |
|----------|---------|--------|
| Caregiver no response to booking request | 24 hours | Auto-decline, release payment authorization |
| Booking not started 30 min after start time | 30 minutes | Trigger no-show alert to care receiver |
| Completion not confirmed | 48 hours | Auto-confirm completion, release payment |
| Dispute not resolved by admin | 7 days | Escalate to senior admin (SLA breach) |

---

### Cancellation Policy Logic

| Cancellation Time Before Start | Care Receiver Refund | Caregiver Compensation | Caregiver Penalty |
|-------------------------------|---------------------|----------------------|------------------|
| 48+ hours | 100% refund | £0 | None |
| 24-48 hours | 50% refund | 50% booking value | None |
| <24 hours | 0% refund | 100% booking value | None |
| Caregiver cancels (48+ hours) | 100% refund | £0 | None |
| Caregiver cancels (<48 hours) | 100% refund | £0 | Warning flag (3 strikes = suspension) |
| No-show (caregiver) | 100% refund | £0 | Suspension pending investigation |
| No-show (care receiver) | 0% refund | 100% booking value | Warning flag |

---

### Compliance Requirements

**Consumer Rights Act 2015**:
- Cancellation policy must be displayed BEFORE booking request submitted
- Refund processed within 14 days of cancellation

**Payment Services Regulations 2017**:
- Payment authorization must expire if booking not accepted within 24 hours
- Escrow funds released to caregiver only after service confirmed

**Care Act 2014 (Safeguarding)**:
- No-show by caregiver triggers safeguarding check (vulnerable adult left without care)
- Repeated no-shows = account suspension (unreliable care provision)

---

---

## 3. Emergency Flow

**Scope**: Active booking emergencies (falls, medical emergencies, safeguarding concerns)

**States**: `normal` → `emergency_triggered` → `emergency_services_contacted` → `resolved`

**Escalation Paths**: Emergency services, family emergency contact, admin safeguarding team

---

### State Diagram

```
[normal] (booking in_progress state)
    |
    | Event: Caregiver presses "Emergency" button
    | Guard: Booking is in_progress status
    | Action: Set emergency_status = triggered, send immediate alerts (admin, family emergency contact), log GPS location, display emergency protocol
    |
    v
[emergency_triggered]
    |
    | IF emergency type = "Life-threatening" (ambulance required):
    |     Action: Display "CALL 999 IMMEDIATELY" protocol, auto-send alert to admin and emergency contact with booking details
    |     v
    |   [emergency_services_contacted]
    |       |
    |       | Event: Caregiver confirms "999 called, ambulance on way"
    |       | Action: Log emergency services confirmation, notify admin for follow-up
    |       |
    |       v
    |   [awaiting_emergency_resolution]
    |           |
    |           | Event: Caregiver marks "Emergency resolved" (or admin marks after investigation)
    |           | Action: Set emergency_status = resolved, create incident report, notify admin for safeguarding review
    |           |
    |           v
    |       [resolved]
    |           |
    |           | Action: Admin reviews incident report, determines safeguarding actions
    |           v
    |       [safeguarding_review] → (See Safeguarding Incident Flow)
    |
    | IF emergency type = "Non-life-threatening" (fall without injury, behavioral concern):
    |     Action: Display emergency protocol, notify admin and emergency contact, offer "Call Emergency Services" button
    |     v
    |   [emergency_assessment]
    |       |
    |       | Event: Caregiver assesses situation, determines no emergency services needed
    |       | Action: Caregiver marks "Situation under control", log incident details
    |       |
    |       v
    |   [resolved]
    |       |
    |       | Action: Create incident report, admin reviews for safeguarding
    |       v
    |   [safeguarding_review]
    |
    | IF emergency type = "Safeguarding concern" (abuse suspected, financial exploitation):
    |     Action: Display safeguarding protocol, notify admin immediately (URGENT alert), DO NOT confront suspected abuser
    |     v
    |   [safeguarding_emergency]
    |       |
    |       | Action: Admin contacts caregiver immediately (phone), assesses situation, contacts local authority safeguarding team if needed
    |       v
    |   [safeguarding_escalated] → (See Safeguarding Incident Flow)
```

---

### Emergency Types

| Type | Examples | Protocol | Escalation |
|------|----------|----------|------------|
| **Life-Threatening** | Chest pain, unconscious, severe bleeding, stroke symptoms | CALL 999 IMMEDIATELY. Stay with care receiver. Do NOT move unless danger. | Ambulance, family notified, admin follows up |
| **Medical (Non-Life-Threatening)** | Fall without injury, skin tear, minor bleeding, confusion | Assess injury. Contact family emergency contact. Call 111 if unsure. | Family contacted, admin creates incident report |
| **Behavioral** | Dementia aggression, refusing care, wandering | De-escalate. Do NOT restrain. Contact family. Consider ending session if unsafe. | Family contacted, safeguarding review if pattern |
| **Safeguarding Concern** | Suspected abuse, unexplained injury, financial exploitation | DO NOT confront. Document evidence. Contact admin IMMEDIATELY. | Admin contacts caregiver, local authority safeguarding team, police if criminal |

---

### Transition Events

| Event | Trigger | Guard Conditions | Actions |
|-------|---------|------------------|---------|
| `trigger_emergency` | Caregiver presses "Emergency" button | Booking status = in_progress | Set emergency_status = triggered, send immediate alerts, display protocol |
| `call_999` | Caregiver confirms "999 called" | Emergency type = life-threatening | Log confirmation, notify admin and family, escalate to post-emergency review |
| `emergency_resolved` | Caregiver marks "Resolved" OR admin marks | Emergency addressed, care receiver safe | Create incident report, set emergency_status = resolved, trigger safeguarding review |
| `escalate_to_safeguarding` | Admin or caregiver flags safeguarding concern | Evidence of abuse, neglect, exploitation | Create safeguarding incident (separate flow), suspend suspected abuser |

---

### Emergency Protocol Display

When emergency triggered, caregiver sees:

**Life-Threatening Emergency**:
```
CALL 999 IMMEDIATELY

1. Call 999 and request ambulance
2. Stay with [Care Receiver Name] until ambulance arrives
3. Do NOT move them unless in immediate danger
4. If unconscious, check breathing and pulse
5. If not breathing, begin CPR if trained

Emergency services and [Emergency Contact Name] have been notified.

Admin support line: [PHONE NUMBER]

[Mark: 999 Called]
```

**Non-Life-Threatening Emergency**:
```
Emergency Protocol: Medical Incident

1. Assess [Care Receiver Name]'s condition
2. If injury: Apply first aid if trained
3. If unsure whether to call 999: Call 111 (NHS non-emergency)
4. Contact emergency contact: [Name] [Phone]

[Emergency Contact Name] has been notified.

[Call Emergency Services] [Situation Under Control]
```

**Safeguarding Emergency**:
```
SAFEGUARDING CONCERN

DO NOT confront the suspected individual.

1. Ensure [Care Receiver Name] is safe
2. Document what you observed (take photos if safe to do so)
3. Admin has been alerted and will contact you immediately
4. Do NOT discuss your concerns with anyone except admin

DO NOT end session unless you or care receiver are in danger.

Admin emergency line: [PHONE NUMBER] (call now if urgent)

[Awaiting Admin Contact]
```

---

### Compliance Requirements

**Care Act 2014 (Safeguarding Duty)**:
- Safeguarding emergencies must be escalated to admin within 1 hour
- Admin must contact local authority safeguarding team same day if abuse suspected

**CQC (Notification of Incidents)**:
- Life-threatening emergencies (ambulance called) must be reported to CQC (if registered)
- Death or serious injury must be reported to CQC within statutory timescales

**Health and Safety at Work Act 1974**:
- Incident reports required for all emergencies involving injury or risk to caregiver/care receiver

---

---

## 4. Safeguarding Incident Flow

**Scope**: Safeguarding concerns reported by users or detected by platform (abuse, neglect, exploitation, self-neglect)

**States**: `reported` → `triaged` → `investigating` → `resolved` OR `escalated_to_sab`

**Mandatory Escalation**: Immediate danger, suspected criminal abuse, vulnerable adult at risk

---

### State Diagram

```
[reported]
    |
    | Event: User submits safeguarding report OR admin creates report (from emergency, low rating, message flag)
    | Action: Create safeguarding incident record, assign to safeguarding officer, send acknowledgment to reporter
    |
    v
[triaged]
    |
    | Guard: Safeguarding officer reviews report within 4 hours (SLA)
    | Action: Assign severity (low, medium, high, critical), assign investigator
    |
    v
[investigating]
    |
    | Action: Admin contacts reporter for details, reviews booking history, messages, incident reports
    | Action: Admin may contact reported user (if safe to do so)
    | Action: Admin documents investigation notes (timestamped)
    |
    v
| IF severity = critical OR immediate danger:
|     Action: Escalate to Safeguarding Adults Board (SAB) and/or police immediately
|     v
|   [escalated_to_sab]
|       |
|       | Action: Admin completes SAB referral form, contacts local authority safeguarding team (phone + email)
|       | Action: Admin may suspend reported user's account pending SAB investigation
|       |
|       v
|   [awaiting_sab_outcome]
|       |
|       | Event: SAB provides outcome (investigation complete, action plan, NFA)
|       | Action: Log SAB outcome, implement recommendations (e.g., permanent ban, caregiver retraining)
|       |
|       v
|   [resolved_sab_escalation]
|
| IF severity = low/medium:
|     Action: Admin determines outcome internally (no external escalation needed)
|     v
|   [internal_resolution]
|       |
|       | Outcomes:
|       | - No action required (concern not substantiated)
|       | - User warning (first-time minor violation)
|       | - Temporary suspension (investigation needed, user cooperation)
|       | - Permanent ban (safeguarding violation confirmed)
|       | - Retraining required (caregiver boundary violation)
|       |
|       v
|   [resolved_internal]

FROM ANY STATE:
    | Event: Reporter requests update on investigation
    | Action: Admin provides status update (within legal limits of confidentiality)
```

---

### Severity Levels

| Severity | Examples | Response Time | Escalation |
|----------|----------|---------------|------------|
| **Critical** | Physical abuse, sexual abuse, criminal exploitation, immediate danger to life | Immediate (within 1 hour) | SAB + Police (999 if immediate danger) |
| **High** | Financial exploitation (large sums), serious neglect, repeated abuse, vulnerable adult refuses help | Within 4 hours | SAB referral same day |
| **Medium** | Suspected neglect, boundary violations, concerning behavior pattern, financial exploitation (small sums) | Within 24 hours | Internal investigation, may escalate to SAB |
| **Low** | Single instance of poor care, minor boundary issue, user complaint without safeguarding element | Within 7 days | Internal investigation, user warning |

---

### Transition Events

| Event | Trigger | Guard Conditions | Actions |
|-------|---------|------------------|---------|
| `submit_safeguarding_report` | User clicks "Report Safeguarding Concern" | None (always accepted) | Create incident record, notify safeguarding officer, acknowledge reporter |
| `triage_incident` | Safeguarding officer reviews report | Within 4 hours of report | Assign severity, assign investigator, log triage decision |
| `escalate_to_sab` | Safeguarding officer determines SAB escalation needed | Severity = critical or high, meets SAB threshold | Complete SAB referral form, contact local authority, suspend reported user if needed |
| `resolve_internally` | Admin determines no external escalation needed | Severity = low or medium, evidence reviewed | Determine outcome (no action, warning, suspension, ban), notify parties |
| `log_sab_outcome` | SAB provides investigation outcome | SAB investigation complete | Implement SAB recommendations, update incident record, notify reporter (if appropriate) |
| `close_incident` | Investigation complete, actions taken | All actions completed | Archive incident, update user records, log final outcome |

---

### Safeguarding Escalation Thresholds (SAB Referral Required)

Report to Safeguarding Adults Board if:
1. **Abuse suspected**: Physical, sexual, psychological, financial, neglect, discriminatory, institutional
2. **Vulnerable adult at risk**: Adult lacks capacity to protect themselves, or is at risk of serious harm
3. **Criminal act suspected**: Assault, theft, fraud, sexual offence
4. **Immediate danger**: Adult's life or health is at immediate risk
5. **Pattern of abuse**: Repeated incidents suggesting systemic abuse or neglect
6. **Adult refuses help**: Adult at risk but declines intervention (SAB assesses capacity and best interests)

---

### SAB Referral Process

**Step 1**: Safeguarding officer completes SAB referral form:
- Adult's details (name, address, DOB, capacity status)
- Nature of concern (abuse type, severity, evidence)
- Alleged perpetrator details (if known)
- Actions taken by platform (suspension, investigation)
- Contact details for further information

**Step 2**: Submit referral to local authority:
- **Phone**: Call local authority safeguarding team (immediate danger: same day)
- **Email**: Send completed referral form (follow up within 24 hours)
- **Online**: Use local authority's online safeguarding referral portal (if available)

**Step 3**: Await SAB response:
- SAB acknowledges receipt (within 24 hours)
- SAB conducts Section 42 enquiry (if statutory threshold met)
- SAB provides outcome and recommendations

**Step 4**: Implement SAB recommendations:
- Permanent ban if SAB confirms abuse
- Retraining or supervision if caregiver boundary violation
- No action if SAB determines concern not substantiated

---

### Compliance Requirements

**Care Act 2014 (Section 42 - Safeguarding Enquiry)**:
- Local authority has duty to make enquiries if adult at risk of abuse or neglect
- Platform has duty to report concerns to local authority

**Care Act 2014 (Section 43 - Safeguarding Adults Boards)**:
- Platform must cooperate with SAB investigations
- Platform must participate in Safeguarding Adult Reviews (SARs) if serious case

**GDPR (Article 6 - Lawful Basis for Processing)**:
- Safeguarding investigations have lawful basis: "Vital interests" (Article 6(1)(d)) or "Legal obligation" (Article 6(1)(c))
- Can share personal data with SAB and police without consent if safeguarding concern

**Data Protection Act 2018 (Schedule 2, Part 2)**:
- Health and social care data can be processed for safeguarding purposes without consent

---

---

## 5. Dispute Flow

**Scope**: Payment disputes raised by care receiver or caregiver (service quality, no-show disputes, payment errors)

**States**: `raised` → `under_review` → `mediation` → `resolved` OR `escalated_to_court`

**Refund Triggers**: Service not provided, quality below reasonable standard, booking error

---

### State Diagram

```
[raised]
    |
    | Event: Care receiver clicks "Raise Dispute" OR caregiver disputes no-show
    | Guard: Within 48 hours of booking completion (care receiver) OR within 7 days (caregiver)
    | Action: Create dispute record, hold payment (if not yet released), notify counterparty, assign to admin
    |
    v
[under_review]
    |
    | Action: Admin reviews dispute details, booking notes, messages, incident reports
    | Action: Admin contacts both parties for evidence (within 24 hours)
    | Guard: Admin has all evidence needed
    |
    v
[evidence_gathering]
    |
    | Action: Admin requests evidence from both parties (photos, witness statements, medical records)
    | Action: Both parties have 48 hours to submit evidence
    |
    v
[mediation]
    |
    | Action: Admin proposes resolution (full refund, partial refund, no refund)
    | Action: Both parties have 48 hours to accept or reject
    |
    | IF both parties accept:
    |     v
    |   [resolved]
    |       |
    |       | Action: Process refund per agreement, release payment to caregiver (if applicable), close dispute
    |       v
    |   [closed]
    |
    | IF one party rejects:
    |     v
    |   [mediation_failed]
    |       |
    |       | Action: Admin makes final binding decision (based on evidence and platform policies)
    |       v
    |   [admin_final_decision]
    |       |
    |       | Action: Process refund per admin decision, notify parties, close dispute
    |       | Action: Either party can escalate to small claims court (outside platform)
    |       v
    |   [resolved_admin_decision]
    |
    | IF dispute involves potential fraud or safeguarding:
    |     v
    |   [escalated_to_investigation]
    |       |
    |       | Action: Create safeguarding incident, suspend suspected fraudulent user, refer to police if criminal
    |       v
    |   [safeguarding_investigation] → (See Safeguarding Incident Flow)
```

---

### Dispute Types

| Dispute Type | Raised By | Common Reasons | Typical Resolution |
|-------------|-----------|----------------|-------------------|
| **Service Not Provided** | Care Receiver | Caregiver no-show, left early, didn't perform agreed tasks | Full refund, caregiver warning/suspension |
| **Service Quality Below Standard** | Care Receiver | Caregiver unprofessional, tasks not completed properly, safety concern | Partial refund (25-50%), caregiver warning |
| **Payment Error** | Care Receiver | Overcharged, duplicate charge, incorrect rate applied | Full refund of error amount |
| **No-Show Dispute** | Caregiver | Care receiver not home, wrong address, cancelled last minute without notice | Caregiver compensated (if legitimate), care receiver warning |
| **False Review** | Caregiver | Care receiver left unfair or false review | Review removed if false, no payment impact |
| **Wrongful Suspension** | Caregiver | Account suspended unfairly, no safeguarding concern | Account reinstated, compensation for lost bookings (rare) |

---

### Refund Decision Matrix

| Evidence | Admin Decision | Refund Amount | Caregiver Impact |
|----------|---------------|---------------|------------------|
| Caregiver no-show confirmed (care receiver has evidence) | Full refund | 100% | Suspension pending investigation |
| Caregiver arrived but left early without cause | Partial refund | 50-75% | Warning, caregiver keeps partial payment |
| Service quality below standard (tasks incomplete) | Partial refund | 25-50% | Warning, retraining required |
| Minor quality issue (late arrival, small task missed) | No refund | 0% | Verbal warning |
| Care receiver not home (caregiver has evidence) | No refund, caregiver compensated | 0% (care receiver pays) | No impact |
| Care receiver cancelled last minute (<24h) | No refund, caregiver compensated | 0% (care receiver pays) | No impact |
| Both parties disagree on facts, no clear evidence | Split difference | 50% refund | No penalty |
| Fraudulent claim (e.g., care receiver claims no-show but caregiver has proof of service) | No refund, warning to care receiver | 0% | No impact, care receiver warned |

---

### Transition Events

| Event | Trigger | Guard Conditions | Actions |
|-------|---------|------------------|---------|
| `raise_dispute` | User clicks "Raise Dispute" | Within dispute window (48h for care receiver, 7d for caregiver) | Create dispute, hold payment, notify counterparty |
| `admin_review_dispute` | Admin assigned to dispute | Within 24 hours | Review booking details, messages, incident reports |
| `request_evidence` | Admin needs more information | Admin determines evidence needed | Contact both parties, set 48h deadline |
| `propose_resolution` | Admin has sufficient evidence | Evidence reviewed | Propose refund amount, notify parties |
| `accept_resolution` | Both parties click "Accept" | Within 48 hours | Process refund, close dispute |
| `reject_resolution` | One party clicks "Reject" | Within 48 hours | Admin makes final binding decision |
| `final_decision` | Admin determines outcome | Mediation failed or immediate decision needed | Process refund per decision, notify parties, close dispute |
| `escalate_to_safeguarding` | Admin identifies fraud or abuse | Evidence of fraud, exploitation, or safeguarding concern | Create safeguarding incident, suspend user |

---

### Compliance Requirements

**Consumer Rights Act 2015 (Part 1, Chapter 4)**:
- Service must be performed with reasonable care and skill
- Care receiver entitled to refund if service not as described or substandard

**Alternative Dispute Resolution (ADR) Regulations 2015**:
- Platform must provide internal dispute resolution mechanism
- If internal resolution fails, parties can use independent ADR service (e.g., Centre for Effective Dispute Resolution)

**Payment Services Regulations 2017**:
- Refunds must be processed within 14 days of dispute resolution
- Payment held in escrow during dispute

---

---

## 6. Account Suspension Flow

**Scope**: Temporary or permanent account suspension for safeguarding, fraud, or policy violations

**States**: `active` → `suspended` → `under_review` → `reinstated` OR `terminated`

**Suspension Triggers**: Safeguarding concern, fraud, repeated policy violations, criminal investigation

---

### State Diagram

```
[active]
    |
    | Event: Admin clicks "Suspend Account" with reason
    | Guard: Safeguarding concern, fraud, repeated violations, or criminal investigation
    | Action: Set account_status = suspended, invalidate all sessions, hide profile, cancel pending bookings, notify user
    |
    v
[suspended]
    |
    | Action: Admin documents suspension reason, expected duration, investigation plan
    | Action: User receives suspension email with reason and appeal instructions
    |
    v
[under_review]
    |
    | Action: Admin investigates suspension reason (review evidence, contact parties, await external investigation outcome)
    | Guard: Investigation complete (typically 7-30 days)
    |
    | IF investigation finds no violation:
    |     v
    |   [reinstated]
    |       |
    |       | Action: Set account_status = active, restore profile, notify user, compensate if wrongful suspension
    |       v
    |   [active]
    |
    | IF investigation confirms violation but not severe:
    |     v
    |   [reinstated_with_warning]
    |       |
    |       | Action: Set account_status = active, add warning flag (3 strikes = permanent ban), notify user of conditions
    |       v
    |   [active_warned]
    |
    | IF investigation confirms serious violation:
    |     v
    |   [terminated]
    |       |
    |       | Action: Set account_status = banned, invalidate sessions, delete profile, log reason, no appeal
    |       v
    |   [banned] (terminal state)
    |
    | IF user appeals suspension:
    |     v
    |   [appeal_review]
    |       |
    |       | Action: Senior admin reviews suspension decision, evaluates new evidence
    |       | Guard: Appeal reviewed within 14 days
    |       |
    |       | IF appeal upheld:
    |           v
    |       [reinstated]
    |       |
    |       | IF appeal denied:
    |           v
    |       [appeal_denied] → Return to [suspended] or [terminated]
```

---

### Suspension Reasons

| Reason | Severity | Typical Duration | Outcome |
|--------|----------|------------------|---------|
| **Safeguarding Investigation** | High | 7-30 days | Reinstate if no violation, ban if confirmed |
| **Fraud (Payment)** | High | Permanent | Banned, reported to police |
| **Fraud (Identity/Qualifications)** | High | Permanent | Banned, reported to DBS (if applicable) |
| **Repeated No-Shows** | Medium | 7-14 days | Reinstate with warning (3 strikes = permanent) |
| **Policy Violation (First Offense)** | Low | 3-7 days | Reinstate with warning |
| **Policy Violation (Repeated)** | Medium | 14-30 days | Reinstate with final warning |
| **Policy Violation (3+ Offenses)** | High | Permanent | Banned |
| **Criminal Investigation** | High | Until investigation complete | Depends on outcome |
| **Off-Platform Payments** | High | Permanent (first offense) | Banned (financial exploitation risk) |

---

### Transition Events

| Event | Trigger | Guard Conditions | Actions |
|-------|---------|------------------|---------|
| `suspend_account` | Admin clicks "Suspend" | Safeguarding concern, fraud, or policy violation | Invalidate sessions, hide profile, cancel bookings, notify user |
| `investigate_suspension` | Admin reviews suspension | Within 7 days of suspension | Document investigation plan, gather evidence, contact parties |
| `reinstate_account` | Investigation finds no violation | Investigation complete | Restore account, notify user, compensate if applicable |
| `reinstate_with_warning` | Investigation finds minor violation | Investigation complete | Restore account with warning flag, notify conditions |
| `terminate_account` | Investigation confirms serious violation | Investigation complete | Permanently ban, delete profile, log reason |
| `appeal_suspension` | User submits appeal | Within 14 days of suspension | Senior admin reviews, evaluates new evidence |
| `uphold_appeal` | Appeal review finds wrongful suspension | Appeal reviewed | Reinstate account, compensate, update suspension policies |
| `deny_appeal` | Appeal review confirms suspension justified | Appeal reviewed | Notify user, suspension remains |

---

### User Communication

**Suspension Email**:
```
Subject: Account Suspended - [Platform Name]

Dear [User Name],

Your account has been temporarily suspended pending investigation.

Reason: [Suspension Reason]
Expected Duration: [Duration]
Reference Number: [Suspension ID]

What happens next:
- We will investigate the matter and contact you if we need more information
- You will receive an update within [Duration]
- You can appeal this suspension by contacting [Email] with reference number [ID]

If this suspension is related to a safeguarding concern, we have a legal duty to investigate and may share information with external authorities (local authority safeguarding team, police).

For more information, see our Safeguarding Policy: [Link]

[Platform Name] Team
```

**Reinstatement Email**:
```
Subject: Account Reinstated - [Platform Name]

Dear [User Name],

Your account suspension has been lifted.

After investigation, we have determined that [Outcome].

Your account is now active. You can log in and use the platform as normal.

[If warning]: Please note that this is a formal warning. Future violations may result in permanent account termination.

Thank you for your cooperation.

[Platform Name] Team
```

**Termination Email**:
```
Subject: Account Permanently Terminated - [Platform Name]

Dear [User Name],

Your account has been permanently terminated.

Reason: [Termination Reason]
Reference Number: [Termination ID]

This decision is final. You will not be able to create a new account on [Platform Name].

If you believe this decision was made in error, you may contact [Email] within 28 days to request a review.

[Platform Name] Team
```

---

### Compliance Requirements

**GDPR (Article 17 - Right to Erasure)**:
- Suspended users retain right to data deletion (unless legal hold for investigation)
- Banned users' data retained for 7 years (safeguarding audit trail, legal defense)

**Care Act 2014 (Safeguarding Duty)**:
- Suspension decisions must be documented with rationale
- Users suspended for safeguarding concerns must have investigation outcome logged

**Equality Act 2010 (Non-Discrimination)**:
- Suspension decisions must be based on objective evidence, not discriminatory grounds

---

---

## 7. GDPR Deletion Flow

**Scope**: User exercises right to erasure (GDPR Article 17)

**States**: `requested` → `verified` → `processing` → `completed`

**Data Retained**: Legal hold for safeguarding/financial audit (7 years), anonymized data for analytics

---

### State Diagram

```
[requested]
    |
    | Event: User clicks "Delete My Account" and confirms
    | Guard: No active bookings, no pending payments
    | Action: Set deletion_status = requested, send confirmation email with 14-day cooling-off period
    |
    v
[cooling_off]
    |
    | Event: 14 days elapsed, no cancellation
    | Guard: User did not cancel deletion request
    | Action: Set deletion_status = verified, assign to data protection team
    |
    v
[verified]
    |
    | Action: Data protection team verifies identity, checks for legal holds (ongoing safeguarding investigations, financial disputes)
    | Guard: No legal holds
    |
    v
[processing]
    |
    | Action: Delete or pseudonymize data per GDPR retention policy
    | Action: Notify third parties (Stripe, email provider) to delete data
    |
    | Data Deletion Steps:
    | 1. Delete personal data (name, email, phone, address, DOB)
    | 2. Delete profile photos and uploaded documents
    | 3. Delete payment methods (Stripe handles card deletion)
    | 4. Pseudonymize booking history (replace name with "User #123456")
    | 5. Pseudonymize messages (replace name with "User #123456")
    | 6. Pseudonymize reviews (anonymize reviewer name)
    | 7. Delete login credentials (password hash, sessions)
    | 8. Retain anonymized data for analytics (no PII)
    |
    | Data Retained (Legal Basis):
    | - Safeguarding incident records (7 years, vital interests)
    | - Financial transactions (7 years, legal obligation - HMRC)
    | - Audit logs (7 years, legitimate interest - legal defense)
    | - Anonymized booking/review data (indefinite, analytics)
    |
    v
[completed]
    |
    | Action: Send deletion confirmation email, log completion date, archive deletion request
    v
[deleted] (terminal state)

--- Exception Path ---

FROM [verified]:
    | IF legal hold detected (safeguarding investigation, financial dispute, court order):
    |     Action: Set deletion_status = on_hold, notify user of legal hold reason and expected resolution date
    |     v
    |   [on_hold]
    |       |
    |       | Event: Legal hold released (investigation complete, dispute resolved)
    |       | Action: Resume deletion process
    |       v
    |   [processing]
```

---

### Data Deletion Categories

| Data Category | Deletion Action | Retention Basis | Retention Period |
|--------------|----------------|-----------------|------------------|
| **Personal Identifiers** | DELETE | None | N/A |
| (Name, email, phone, address, DOB) | | | |
| **Authentication Data** | DELETE | None | N/A |
| (Password hash, sessions, 2FA tokens) | | | |
| **Profile Data** | DELETE | None | N/A |
| (Bio, photo, qualifications, skills) | | | |
| **Payment Methods** | DELETE (via Stripe API) | None | N/A |
| (Card details, bank account) | | | |
| **Booking History** | PSEUDONYMIZE | Legal obligation (HMRC) | 7 years |
| (Replace name with User ID) | | Financial audit trail | |
| **Messages** | PSEUDONYMIZE | Safeguarding (evidence) | 7 years |
| (Replace name with User ID) | | Legitimate interest | |
| **Reviews** | PSEUDONYMIZE | Legitimate interest | 7 years |
| (Anonymize reviewer name, keep content) | | Quality monitoring | |
| **Safeguarding Records** | RETAIN | Vital interests | 7 years |
| (Incident reports, SAB referrals) | | Legal defense | |
| **Financial Transactions** | RETAIN | Legal obligation (HMRC) | 7 years |
| (Invoices, refunds, payouts) | | Tax audit | |
| **Audit Logs** | RETAIN (pseudonymize) | Legitimate interest | 7 years |
| (User actions, admin actions) | | Legal defense | |
| **Anonymized Analytics** | RETAIN | Legitimate interest | Indefinite |
| (No PII, aggregate statistics) | | Platform improvement | |

---

### Legal Holds (Deletion Blocked)

Deletion request blocked if:
1. **Active safeguarding investigation**: Retain data until investigation complete (Care Act 2014 duty)
2. **Ongoing financial dispute**: Retain data until dispute resolved (legitimate interest)
3. **Court order or legal claim**: Retain data until legal matter resolved (legal obligation)
4. **Active bookings or pending payments**: Retain data until transactions complete (contract fulfillment)
5. **Tax investigation (HMRC)**: Retain financial data for 7 years (legal obligation)

---

### Transition Events

| Event | Trigger | Guard Conditions | Actions |
|-------|---------|------------------|---------|
| `request_deletion` | User clicks "Delete My Account" | No active bookings, no pending payments | Set deletion_status = requested, send confirmation email with 14-day cooling-off |
| `cancel_deletion` | User clicks "Cancel Deletion" | Within 14-day cooling-off period | Cancel deletion request, restore account |
| `verify_deletion` | 14 days elapsed | No cancellation | Verify identity, check legal holds, assign to data protection team |
| `place_legal_hold` | Legal hold detected | Safeguarding investigation, dispute, court order | Notify user of hold, expected release date |
| `release_legal_hold` | Legal hold resolved | Investigation complete, dispute resolved | Resume deletion process |
| `process_deletion` | No legal holds | Identity verified | Delete personal data, pseudonymize retained data, notify third parties |
| `complete_deletion` | Deletion processed | All data deleted or pseudonymized | Send confirmation email, log completion, archive request |

---

### User Communication

**Deletion Request Confirmation Email**:
```
Subject: Account Deletion Request Received - [Platform Name]

Dear [User Name],

We have received your request to delete your account.

14-Day Cooling-Off Period:
You have 14 days to cancel this request. If you do not cancel, your account will be permanently deleted.

What will be deleted:
- Your personal information (name, email, phone, address)
- Your profile, photos, and uploaded documents
- Your login credentials

What will be retained:
- Anonymized booking and review history (for platform quality monitoring)
- Financial records (required by law for 7 years)
- Safeguarding incident records (if applicable, required by law for 7 years)

To cancel this request, log in and go to Settings > Cancel Account Deletion.

If you have any questions, contact [Email].

[Platform Name] Team
```

**Deletion Completion Email**:
```
Subject: Account Deleted - [Platform Name]

Dear [User Name],

Your account has been permanently deleted.

Your personal data has been removed from our systems. Anonymized data has been retained as explained in our Privacy Policy.

If you believe this deletion was made in error, contact [Email] within 28 days.

Thank you for using [Platform Name].

[Platform Name] Team
```

**Legal Hold Email**:
```
Subject: Account Deletion On Hold - [Platform Name]

Dear [User Name],

Your account deletion request is temporarily on hold.

Reason: [Legal Hold Reason]
Expected Resolution: [Date]

We are legally required to retain your data while [Reason]. Once resolved, your deletion request will be processed automatically.

For more information, contact [Email].

[Platform Name] Team
```

---

### Compliance Requirements

**GDPR (Article 17 - Right to Erasure)**:
- User has right to deletion unless legal basis for retention (legal obligation, vital interests, legitimate interest)
- Deletion must be processed "without undue delay" (typically within 30 days)

**GDPR (Article 5 - Storage Limitation)**:
- Data retained only as long as necessary for purpose
- Legal holds must be documented with retention basis and period

**HMRC (Tax Retention)**:
- Financial records must be retained for 6 years (UK) or 7 years (best practice)

**Care Act 2014 (Safeguarding Records)**:
- Safeguarding records retained for 7 years (or longer if ongoing legal case)

---

---

## State Map Maintenance

**Review Triggers**:
- Regulatory guidance changes (CQC, ICO, HMRC)
- User feedback identifies missing states or transitions
- Incident occurs that exposes state machine gap
- Legal counsel advises changes to compliance requirements

**Ownership**: Product Manager reviews state maps quarterly or when regulations change

---

**END OF DOCUMENT**