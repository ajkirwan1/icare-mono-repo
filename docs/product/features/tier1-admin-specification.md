# Tier 1 Admin Dashboard Specification

**Document Purpose**: Complete specification for the Tier 1 admin dashboard for the UK elderly care marketplace, focusing on verification review workflows, user management, booking oversight, and platform safety.

**Document Owner**: Product Manager
**Created**: 2026-02-06
**Status**: ACTIVE - Tier 1 Launch Specification
**Tier**: Tier 1 (Companionship MVP)

---

## Table of Contents

1. [Overview](#1-overview)
2. [User Stories](#2-user-stories)
3. [Admin Roles & Permissions](#3-admin-roles--permissions)
4. [Dashboard Home](#4-dashboard-home)
5. [User Management](#5-user-management)
6. [Verification Queue](#6-verification-queue)
7. [Booking Oversight](#7-booking-oversight)
8. [Content Moderation](#8-content-moderation)
9. [Reporting & Analytics](#9-reporting--analytics)
10. [Audit Logging](#10-audit-logging)
11. [Safeguarding Tools](#11-safeguarding-tools)
12. [Data Requirements](#12-data-requirements)
13. [Edge Cases](#13-edge-cases)
14. [Acceptance Criteria](#14-acceptance-criteria)
15. [Out of Scope](#15-out-of-scope)

---

## 1. Overview

### 1.1 Purpose

The Tier 1 admin dashboard is the central operational interface for platform administrators to manage caregiver verification, oversee bookings, handle disputes, moderate content, and respond to safeguarding concerns. The primary Tier 1 function is **caregiver verification review workflows** to ensure only identity-verified, right-to-work confirmed caregivers can offer companionship services.

### 1.2 Tier 1 Scope

**Primary Functions**:
- Caregiver verification queue management (identity, right to work, voluntary DBS)
- User management (view, suspend, ban care receivers and caregivers)
- Booking oversight (view all bookings, intervene in disputes)
- Content moderation (flagged messages, inappropriate profiles)
- Safeguarding incident management (reports, escalations)
- Basic analytics (platform health, verification metrics)

**Tier 1 Constraints**:
- Companionship services only (no personal care features)
- Voluntary DBS verification (not mandatory)
- No qualification verification workflows (deferred to Tier 2)
- No insurance verification (deferred to Tier 2)
- No medical condition data (deferred to Tier 3)
- No care plan management (deferred to Tier 4)

### 1.3 Strategic Context

**Market Entry Strategy** (FDR-003):
- Tier 1: Minimal compliance, rapid market validation
- Admin dashboard must support 50+ caregiver verifications in first 3 months
- Target: <48-hour verification SLA (average 24 hours)
- Target: <5% caregiver rejection rate (minimize attrition)

**Introduction Agency Model** (FDR-002):
- Platform is NOT CQC-registered (no CQC compliance workflows at Tier 1)
- Platform has Care Act 2014 safeguarding duties (mandatory features)
- Caregivers are self-employed (not employees)

### 1.4 Admin User Types

| Role | Primary Responsibility | Access Level | Tier 1 Headcount |
|------|----------------------|--------------|------------------|
| **Super Admin** | Platform management, configuration, all permissions | Full access | 1-2 (founders) |
| **Safeguarding Officer** | Incident response, user safety, emergency escalations | Full safeguarding + user access | 1 (dedicated) |
| **Operations Manager** | Verification queue, booking oversight, disputes | Verification + booking access | 1-2 (scale with volume) |
| **Customer Support** | User inquiries, basic issues, no sensitive data | Read-only, limited edit | 0 at Tier 1 (founders handle) |

**Tier 1 Launch Team**: 2-3 admins (founders + 1 operations hire)

---

## 2. User Stories

### 2.1 Verification Management

**US-ADMIN-VER-01: Review Pending Caregiver Verifications**
- **As an** Operations Manager
- **I want to** see a prioritized queue of caregivers awaiting verification
- **So that** I can approve profiles efficiently and meet the 48-hour SLA

**Acceptance Criteria**:
- [ ] Queue displays pending caregivers sorted by registration date (oldest first)
- [ ] SLA breaches (>48h pending) flagged in red
- [ ] Queue shows: name, registration date, days pending, verification status
- [ ] Click caregiver to open verification review interface
- [ ] Average queue wait time displayed at top

---

**US-ADMIN-VER-02: Approve or Reject Identity Verification**
- **As an** Operations Manager
- **I want to** review uploaded ID documents and approve or reject verification
- **So that** only legitimate caregivers can offer services

**Acceptance Criteria**:
- [ ] View ID document images (passport, driving license) in high resolution
- [ ] View selfie photo side-by-side with ID photo
- [ ] See Stripe Identity automated verification result
- [ ] Checklist: ID clear, not expired, name matches, selfie matches
- [ ] Approve button creates "Identity Verified" badge
- [ ] Reject button requires reason selection and sends email to caregiver
- [ ] Decision logged in audit trail with admin name and timestamp

---

**US-ADMIN-VER-03: Verify Right to Work**
- **As an** Operations Manager
- **I want to** check UKVI share codes for non-UK nationals
- **So that** the platform complies with Immigration Act requirements

**Acceptance Criteria**:
- [ ] UK passport holders auto-approved (no UKVI check needed)
- [ ] Non-UK nationals display UKVI share code field
- [ ] Link to UKVI online service opens in new tab
- [ ] Admin records: visa type, expiry date, work restrictions
- [ ] Visa expiry date saved, automated reminders scheduled
- [ ] Profile auto-deactivates if visa expires without renewal

---

**US-ADMIN-VER-04: Review Voluntary DBS Certificates**
- **As an** Operations Manager
- **I want to** verify uploaded DBS certificates for caregivers who voluntarily submit them
- **So that** caregivers can earn "DBS Verified" badges as a trust signal

**Acceptance Criteria**:
- [ ] DBS verification queue separate from identity queue
- [ ] View DBS certificate PDF/image
- [ ] Checklist: certificate number present, name matches, not expired (3yr recommended)
- [ ] Optional: Check DBS Update Service for validity
- [ ] Approve adds "DBS Verified" badge to profile
- [ ] Reject sends email with reason (expired, name mismatch, suspected fake)

---

### 2.2 User Management

**US-ADMIN-USER-01: Search and View User Profiles**
- **As an** admin
- **I want to** search for users by name, email, or postcode
- **So that** I can quickly access user details for support or investigations

**Acceptance Criteria**:
- [ ] Search bar supports: name, email, phone, postcode, user ID
- [ ] Search results display: user type (care receiver/caregiver), registration date, status
- [ ] Click user to open detailed profile view
- [ ] Recent activity visible: last login, recent bookings, recent messages

---

**US-ADMIN-USER-02: Suspend or Ban Users**
- **As a** Safeguarding Officer
- **I want to** suspend or permanently ban users for safety violations
- **So that** vulnerable adults are protected from unsafe caregivers or abusive care receivers

**Acceptance Criteria**:
- [ ] "Suspend" button on user profile with duration options (7, 14, 30 days)
- [ ] "Ban Permanently" button requires confirmation + reason
- [ ] Suspension/ban immediately locks user out of account
- [ ] Active bookings cancelled with appropriate refunds
- [ ] User receives notification explaining suspension/ban
- [ ] Ban evasion detection (email, phone, IP flagging)
- [ ] Appeal process documented in notification

---

**US-ADMIN-USER-03: View User Booking History**
- **As an** admin
- **I want to** see all bookings for a specific user
- **So that** I can identify patterns (frequent cancellations, disputes, quality issues)

**Acceptance Criteria**:
- [ ] User profile displays booking history table
- [ ] Filters: status (all, completed, cancelled, disputed), date range
- [ ] Table shows: date, counterparty, service type, status, amount, rating (if reviewed)
- [ ] Click booking to view full details
- [ ] Warning indicators for negative patterns (3+ cancellations, 2+ disputes, <3 avg rating)

---

### 2.3 Booking Oversight

**US-ADMIN-BOOK-01: View All Platform Bookings**
- **As an** Operations Manager
- **I want to** see all bookings across the platform with filters
- **So that** I can monitor platform activity and identify issues

**Acceptance Criteria**:
- [ ] Booking list with columns: ID, care receiver, caregiver, date, status, amount
- [ ] Filters: status, date range, disputed only, high-value (>£100)
- [ ] Search by user name, booking ID
- [ ] Sort by: date, amount, status
- [ ] Export to CSV for reporting

---

**US-ADMIN-BOOK-02: Intervene in Disputed Bookings**
- **As an** Operations Manager
- **I want to** review dispute evidence and make refund decisions
- **So that** disputes are resolved fairly within 7 days

**Acceptance Criteria**:
- [ ] Disputed bookings appear in dedicated queue
- [ ] Dispute view shows: booking details, care receiver claim, caregiver response, evidence uploads
- [ ] View full message thread between parties
- [ ] Decision interface: full refund, partial refund (25%, 50%, 75%), no refund
- [ ] Rationale text field (required, minimum 50 characters)
- [ ] Decision triggers automatic refund processing
- [ ] Both parties notified via email with decision summary

---

**US-ADMIN-BOOK-03: Handle No-Show Reports**
- **As a** Safeguarding Officer
- **I want to** investigate no-show reports within 24 hours
- **So that** genuine no-shows are penalized and false reports dismissed

**Acceptance Criteria**:
- [ ] No-show reports flagged as urgent in queue
- [ ] View evidence: timestamps, GPS location (if available), attempted contact proof
- [ ] Contact both parties via platform messaging or phone
- [ ] Decision options: confirm no-show, dismiss report, needs more evidence
- [ ] Confirmed caregiver no-show: full refund + account suspension/ban
- [ ] Confirmed care receiver no-show: full payment to caregiver + warning
- [ ] False report: warn reporter about abuse of system

---

### 2.4 Content Moderation

**US-ADMIN-MOD-01: Review Flagged Messages**
- **As an** admin
- **I want to** see messages flagged by content filters
- **So that** I can identify safeguarding concerns or policy violations

**Acceptance Criteria**:
- [ ] Flagged message queue with priority indicators (urgent for safeguarding keywords)
- [ ] View full message thread for context
- [ ] Flag reasons visible: off-platform payment keywords, profanity, safeguarding keywords
- [ ] Actions: dismiss flag, warn user, suspend user, escalate to safeguarding officer
- [ ] Decision logged with rationale

---

**US-ADMIN-MOD-02: Review Flagged Profiles**
- **As an** Operations Manager
- **I want to** review profiles flagged for inappropriate content
- **So that** only professional profiles are visible to care receivers

**Acceptance Criteria**:
- [ ] Flagged profile queue (inappropriate photos, bio content issues)
- [ ] View profile with flag reason
- [ ] Actions: approve (dismiss flag), request changes, suspend profile
- [ ] Request changes sends email to caregiver with specific guidance
- [ ] Profile hidden until changes made and re-approved

---

### 2.5 Safeguarding

**US-ADMIN-SAFE-01: Respond to Safety Reports**
- **As a** Safeguarding Officer
- **I want to** see urgent safety reports immediately
- **So that** I can protect vulnerable adults within 2 hours

**Acceptance Criteria**:
- [ ] Urgent safety reports trigger email + SMS alert to on-call safeguarding officer
- [ ] Report view shows: reporter, reported user, reason, description, evidence
- [ ] View reported user's full history: bookings, messages, previous reports
- [ ] Actions: investigate, suspend immediately, contact emergency services, escalate to external authorities
- [ ] Investigation notes field (required for documentation)
- [ ] Case status tracking: open, investigating, resolved, escalated

---

**US-ADMIN-SAFE-02: Escalate to External Authorities**
- **As a** Safeguarding Officer
- **I want to** document external escalations (police, safeguarding boards)
- **So that** the platform fulfills Care Act 2014 duties

**Acceptance Criteria**:
- [ ] Escalation form captures: authority contacted (police, local safeguarding board), contact person, reference number, date/time
- [ ] Escalation automatically linked to safeguarding incident record
- [ ] Follow-up reminders scheduled (7 days, 14 days)
- [ ] Outcome field (pending, resolved, ongoing)

---

## 3. Admin Roles & Permissions

### 3.1 Role Hierarchy

```
Super Admin (Full Platform Access)
    |
    +-- Safeguarding Officer (User Safety Focus)
    |     - Full access to safeguarding incidents, reports, user data
    |     - Can suspend/ban users immediately
    |     - Can contact emergency services
    |     - Cannot modify platform configuration
    |
    +-- Operations Manager (Daily Operations)
    |     - Verification queue management
    |     - Booking oversight and dispute resolution
    |     - Content moderation
    |     - Cannot access platform configuration
    |     - Cannot handle urgent safeguarding (escalates to officer)
    |
    +-- Customer Support (Read-Only)
          - View user profiles (limited fields)
          - View booking details
          - Cannot modify data, suspend users, or access sensitive info
          - NOT ACTIVE at Tier 1 (founders handle support)
```

### 3.2 Permission Matrix

| Permission | Super Admin | Safeguarding Officer | Operations Manager | Customer Support |
|-----------|-------------|---------------------|-------------------|------------------|
| **Verification Queue** |  |  |  |  |
| View verification queue | Yes | Yes | Yes | No |
| Approve/reject verifications | Yes | Yes | Yes | No |
| Upload documents on behalf of user | Yes | Yes | No | No |
| **User Management** |  |  |  |  |
| Search users | Yes | Yes | Yes | Yes (limited) |
| View full user profiles | Yes | Yes | Yes | No (basic only) |
| View sensitive data (ID docs, bank) | Yes | Yes | No | No |
| Edit user profiles | Yes | Yes | No | No |
| Suspend users (7-30 days) | Yes | Yes | Yes (7 days only) | No |
| Ban users permanently | Yes | Yes | No | No |
| Delete user accounts | Yes | No | No | No |
| **Booking Oversight** |  |  |  |  |
| View all bookings | Yes | Yes | Yes | Yes |
| View booking messages | Yes | Yes | Yes | No |
| Cancel bookings | Yes | Yes | Yes (with approval) | No |
| Resolve disputes | Yes | Yes | Yes | No |
| Issue manual refunds | Yes | Yes | Yes (up to £100) | No |
| **Content Moderation** |  |  |  |  |
| View flagged content | Yes | Yes | Yes | No |
| Moderate messages | Yes | Yes | Yes | No |
| Moderate profiles | Yes | Yes | Yes | No |
| Delete content | Yes | Yes | No | No |
| **Safeguarding** |  |  |  |  |
| View safety reports | Yes | Yes | Yes (non-urgent) | No |
| Respond to urgent reports | Yes | Yes | No (must escalate) | No |
| Suspend users immediately | Yes | Yes | No | No |
| Contact emergency services | Yes | Yes | No | No |
| Escalate to external authorities | Yes | Yes | No | No |
| **System & Configuration** |  |  |  |  |
| View audit logs | Yes | Yes (own actions) | Yes (own actions) | No |
| Modify platform settings | Yes | No | No | No |
| Manage admin users | Yes | No | No | No |
| View analytics | Yes | Yes | Yes | No |
| Export data | Yes | Yes | Yes | No |

### 3.3 2FA Requirements

**Mandatory 2FA** (cannot be disabled):
- Super Admin: TOTP (authenticator app) required
- Safeguarding Officer: TOTP required
- Operations Manager: TOTP required

**Optional 2FA**:
- Customer Support: Recommended but not required (Tier 1: role not active)

**2FA Enforcement**:
- Admin accounts locked after 10 failed login attempts (15-minute lockout)
- 2FA backup codes generated on setup (10 single-use codes)
- Lost 2FA device: Super Admin can reset after identity verification

---

## 4. Dashboard Home

### 4.1 Dashboard Layout

**Header**:
- Platform logo
- Admin user name and role
- Notifications bell icon (unread count badge)
- Admin menu: Profile, Settings, Logout

**Main Content Area**:
- Overview metrics (top)
- Urgent action cards (middle)
- Recent activity feed (bottom)

**Sidebar** (collapsible):
- Navigation menu
- Quick actions
- Support shortcuts

### 4.2 Overview Metrics (Dashboard Top)

**Key Metrics Row** (4 cards, real-time):

```
+------------------+  +------------------+  +------------------+  +------------------+
| Pending          |  | Active           |  | Today's          |  | Urgent           |
| Verifications    |  | Bookings         |  | Bookings         |  | Reports          |
|                  |  |                  |  |                  |  |                  |
| 12 caregivers    |  | 45 in progress   |  | 23 scheduled     |  | 2 safety         |
| Avg wait: 18h    |  | 0 issues         |  | 8 completed      |  | 1 dispute        |
+------------------+  +------------------+  +------------------+  +------------------+
   [View Queue]         [View All]           [View Today]          [View Urgent]
```

**Metric Definitions**:
- **Pending Verifications**: Caregivers in "pending_verification" status, awaiting admin review
- **Active Bookings**: Bookings in "accepted" or "in_progress" status (real-time monitoring)
- **Today's Bookings**: All bookings with start_time = today
- **Urgent Reports**: Safeguarding reports marked "urgent" + no-show reports + disputes >5 days old

### 4.3 Urgent Action Cards

**Dynamic Priority Cards** (only shown if items exist):

**SLA Breach Alert** (red, critical):
```
⚠️ SLA BREACH ALERT
3 caregiver verifications pending >48 hours
Action: Review immediately to meet platform SLA
[View Overdue Queue]
```

**Safeguarding Escalation** (red, critical):
```
🚨 URGENT SAFEGUARDING REPORT
Reported 35 minutes ago by Care Receiver #4521
Reason: Caregiver no-show, care receiver left alone
[Review Report Now]
```

**Dispute Resolution Needed** (yellow, high priority):
```
⚖️ DISPUTE RESOLUTION NEEDED
5 disputed bookings awaiting admin decision
Oldest: 6 days ago (7-day SLA approaching)
[Review Disputes]
```

**No-Show Investigation** (yellow, high priority):
```
👤 NO-SHOW REPORT
Caregiver reported care receiver no-show 2 hours ago
Evidence uploaded, requires investigation
[Investigate Now]
```

### 4.4 Recent Activity Feed

**Activity Timeline** (last 24 hours, max 20 items):

```
Recent Platform Activity

Today, 14:32 | Admin Sarah approved caregiver verification: John Smith (#4523)
Today, 14:15 | Booking #7821 completed successfully (Care Receiver Jane D. → Caregiver Mary K.)
Today, 13:47 | Admin Sarah rejected caregiver verification: David Jones (#4522) - ID expired
Today, 12:05 | Dispute raised on Booking #7803 by Care Receiver Tom H.
Today, 11:23 | Admin Sarah resolved dispute on Booking #7789 - Partial refund (50%)
Today, 10:15 | Caregiver Emma T. cancelled booking #7811 (late cancellation warning issued)
Yesterday, 18:40 | Safeguarding report #42 resolved - No action required
...
```

**Activity Filters**:
- All activity (default)
- My actions only
- Verifications only
- Bookings only
- Safeguarding only

### 4.5 Quick Actions Sidebar

**Verification Actions**:
- [+] Review next pending verification
- [📋] View full verification queue
- [🔍] Search caregiver by name

**User Management**:
- [🔍] Search user
- [👤] View all caregivers
- [🏠] View all care receivers

**Booking Management**:
- [📅] View today's bookings
- [⚠️] View disputed bookings
- [🚫] View cancelled bookings

**Safeguarding**:
- [🚨] View urgent reports
- [📞] Emergency contact list
- [📋] Safeguarding policy (quick reference)

---

## 5. User Management

### 5.1 User Search Interface

**Search Bar** (global, accessible from all pages):
- Input field: "Search users by name, email, phone, postcode, or ID"
- Search triggers on Enter or click magnifying glass icon
- Real-time suggestions dropdown (show top 5 matches as user types)

**Search Results Page**:

```
Search Results for "john smith"

Found 3 users:

+-----------------------------------------------------------------------+
| [Photo] John Smith (Caregiver) #4523                                 |
| Email: john.smith@email.com | Phone: 07700 900123                     |
| Status: Active | Verified ✓ | DBS Verified ✓                          |
| Registered: 5 Feb 2026 | Last Login: Today, 10:32                    |
| [View Profile] [View Bookings] [Suspend]                             |
+-----------------------------------------------------------------------+

| [Photo] John Smith (Care Receiver) #2341                             |
| Email: j.smith@gmail.com | Phone: 07700 900456                        |
| Status: Active | Identity Verified ✓                                  |
| Registered: 12 Jan 2026 | Last Login: Yesterday, 15:20               |
| [View Profile] [View Bookings]                                       |
+-----------------------------------------------------------------------+

| [Photo] Johnny Smithson (Caregiver) #4501                            |
| Status: Pending Verification | Not yet live                           |
| Registered: 3 Feb 2026 | Last Login: Today, 09:15                    |
| [View Profile] [Review Verification]                                 |
+-----------------------------------------------------------------------+
```

### 5.2 User Detail View

**User Profile Page** (accessible from search results or verification queue):

**Header Section**:
```
[Profile Photo] John Smith (Caregiver) #4523
Status: Active ✓ | Identity Verified ✓ | DBS Verified ✓
Registered: 5 Feb 2026 | Last Login: Today, 10:32

Quick Actions:
[Edit Profile] [Suspend Account] [Ban Permanently] [View Verification Docs] [Send Message]
```

**Tabs**:
1. **Overview** (default)
2. **Verification Details**
3. **Booking History**
4. **Messages**
5. **Reports & Incidents**
6. **Admin Notes**
7. **Audit Log**

**Tab 1: Overview**

```
Personal Information:
  Full Name: John Smith
  Email: john.smith@email.com (verified ✓)
  Phone: +44 7700 900123 (verified ✓)
  Date of Birth: 15 March 1985 (age 40)
  Postcode: SW1A 1AA
  Full Address: [View] (visible after booking acceptance)

Caregiver Profile:
  Hourly Rate: £20/hour
  Service Radius: 10 miles
  Services Offered: Companionship, Light housework, Shopping/errands
  Bio: "Experienced companion with 5 years in elderly care..." [Read More]
  Languages: English
  Transportation: Yes (vehicle available)

Platform Activity:
  Total Bookings: 23 completed, 2 in progress, 1 pending
  Average Rating: 4.8 stars (18 reviews)
  Response Rate: 95% (within 24 hours)
  Acceptance Rate: 78%
  Cancellation Rate: 4% (1 late cancellation in last 30 days)
  Total Earnings: £1,840.50
  Last Booking: Today, 10:00-13:00 with Jane Doe

Account Status:
  Status: Active
  Warnings: 1 (late cancellation on 1 Feb 2026)
  Suspensions: None
  Reports Against User: 0
```

**Tab 2: Verification Details**

```
Identity Verification:
  Status: Verified ✓
  Verified By: Admin Sarah
  Verified Date: 5 Feb 2026, 14:32
  Method: Automated (Stripe Identity) + Manual Review
  ID Document: UK Passport (#123456789)
  ID Expiry: 1 Mar 2030
  Selfie Photo: Verified ✓
  [View ID Documents] (admin only)

Right to Work:
  Status: Verified ✓
  Verified By: Admin Sarah
  Verified Date: 5 Feb 2026, 14:35
  Method: UK Passport (British Citizen)
  No UKVI check required

DBS Verification (Voluntary):
  Status: Verified ✓
  Verified By: Admin Sarah
  Verified Date: 6 Feb 2026, 10:15
  Certificate Number: 001234567890
  Issue Date: 15 Jan 2026
  Certificate Level: Enhanced
  DBS Update Service: No
  Expiry Reminder: 15 Jan 2029 (3-year cycle)
  [View DBS Certificate] (admin only)

Bank Account:
  Status: Connected ✓ (Stripe Connect)
  Connected Date: 5 Feb 2026, 11:20
  Last 4 Digits: •••• 4242
  Account Valid: Yes
```

**Tab 3: Booking History**

(See Section 7.2 for detailed booking oversight interface)

**Tab 4: Messages**

```
Message Threads (5):

Thread #1: Booking #7821 with Jane Doe
Last message: Today, 09:45 by John Smith
Status: Active booking
[View Thread]

Thread #2: Booking #7803 with Tom Harris
Last message: Yesterday, 16:30 by Tom Harris
Status: Disputed (admin reviewing)
Flagged: Yes (dispute raised)
[View Thread]

...

[View All Messages]
```

**Tab 5: Reports & Incidents**

```
Reports Against This User: 0
Reports Filed By This User: 1

Report #1: Filed by John Smith (this caregiver)
Date: 3 Feb 2026, 11:20
Type: Care Receiver No-Show
Status: Resolved (care receiver warned)
Outcome: Caregiver compensated full amount
[View Report Details]
```

**Tab 6: Admin Notes**

```
Internal Notes (visible to admins only):

6 Feb 2026, 10:20 by Admin Sarah:
"Verified DBS certificate. Everything looks good. Caregiver has excellent reviews so far."

5 Feb 2026, 14:35 by Admin Sarah:
"Approved identity verification. UK passport valid, selfie matches. No concerns."

[Add New Note]
```

**Tab 7: Audit Log**

```
Account Activity Log:

Today, 14:32 | Booking #7821 marked complete by John Smith
Today, 10:00 | Booking #7821 started (status: in_progress)
Today, 09:45 | Message sent to Jane Doe (booking #7821)
Yesterday, 18:20 | Booking #7825 accepted
Yesterday, 16:30 | Booking #7826 declined (reason: scheduling conflict)
6 Feb 2026, 10:15 | DBS verification approved by Admin Sarah
5 Feb 2026, 14:35 | Identity verification approved by Admin Sarah
5 Feb 2026, 14:32 | Right to work verified by Admin Sarah
5 Feb 2026, 11:20 | Bank account connected (Stripe Connect)
5 Feb 2026, 09:15 | Account created

[Export Full Log (CSV)]
```

### 5.3 Suspend User Interface

**Suspend Account Modal** (triggered by "Suspend Account" button):

```
Suspend Account: John Smith (Caregiver #4523)

Suspension Duration:
( ) 7 days
( ) 14 days
( ) 30 days
(*) Custom: [____] days

Suspension Reason (required):
[Dropdown: Late cancellation pattern | Quality concerns | Policy violation |
Safeguarding concern | Under investigation | Other]

Additional Details (optional, 500 chars):
[Text area]

Impact Summary:
- User will be immediately logged out and unable to access account
- Active bookings (2): Will be cancelled with full refunds to care receivers
- Pending bookings (1): Will be cancelled with full refunds
- Profile will be hidden from search during suspension
- User will receive email notification explaining suspension
- Suspension will appear on user's record permanently

[Cancel] [Confirm Suspension]
```

**Suspension Confirmation**:
```
✓ Account Suspended Successfully

John Smith has been suspended for 7 days.
- Suspension ends: 13 Feb 2026, 14:45
- Active bookings cancelled: 3
- Refunds processed: £180.50 total
- Email notification sent to user

[View User Profile] [Dismiss]
```

### 5.4 Ban User Interface

**Ban Permanently Modal** (triggered by "Ban Permanently" button):

```
⚠️ PERMANENT BAN WARNING

You are about to PERMANENTLY ban: John Smith (Caregiver #4523)

This action:
- Cannot be undone (requires Super Admin approval to reverse)
- Immediately locks user out of account
- Cancels all active and pending bookings with refunds
- Prevents user from creating new accounts (email, phone, IP flagged)
- Sends ban notification email to user with appeal instructions

Ban Reason (required):
[Dropdown: Caregiver no-show | Serious safeguarding concern | Identity fraud |
Off-platform payment request | Abuse/harassment | Repeated policy violations | Other]

Detailed Justification (required, min 100 chars):
[Text area]

Evidence Attached:
[Upload Files] (screenshots, reports, etc.)

Escalate to External Authorities?
[ ] Yes, contact police
[ ] Yes, contact local safeguarding board
[ ] No external escalation needed

Type "BAN USER #4523" to confirm:
[_____________________]

[Cancel] [Confirm Permanent Ban]
```

---

## 6. Verification Queue

### 6.1 Verification Queue Dashboard

**Queue Overview** (top metrics):

```
Caregiver Verification Queue

+----------------------+  +----------------------+  +----------------------+
| Pending              |  | Reviewed Today       |  | Average Review Time  |
| 12 caregivers        |  | 8 approved           |  | 18 hours             |
| Oldest: 42 hours     |  | 2 rejected           |  | SLA: <48 hours ✓     |
+----------------------+  +----------------------+  +----------------------+

SLA Status: ✓ On Track | ⚠️ 2 approaching SLA (>36h) | ❌ 1 SLA breach (>48h)
```

**Queue Tabs**:
1. **Pending** (default) - Caregivers awaiting first review
2. **In Review** - Caregivers assigned to current admin
3. **Action Required** - Resubmissions needed, additional docs requested
4. **Rejected** (last 30 days) - Quality control and pattern tracking
5. **Approved** (last 7 days) - Recent approvals for audit trail

**Tab 1: Pending Queue**

```
Pending Verification Queue (12 caregivers) | Sort by: Registration Date (oldest) ▼

+---------------------------------------------------------------------------------+
| ❌ SLA BREACH | Jane Wilson #4525 | 52 hours pending                          |
| Registered: 3 Feb 2026, 10:15 | Identity: Docs uploaded | Right to Work: UK    |
| [Assign to Me] [Review Now]                                                    |
+---------------------------------------------------------------------------------+

| ⚠️ APPROACHING | David Brown #4524 | 38 hours pending                         |
| Registered: 4 Feb 2026, 00:30 | Identity: Docs uploaded | Right to Work: UKVI  |
| [Assign to Me] [Review Now]                                                    |
+---------------------------------------------------------------------------------+

| Mary Johnson #4523 | 24 hours pending                                          |
| Registered: 5 Feb 2026, 14:20 | Identity: Docs uploaded | DBS: Uploaded       |
| [Assign to Me] [Review Now]                                                    |
+---------------------------------------------------------------------------------+

| Tom Harris #4522 | 18 hours pending                                             |
| Registered: 5 Feb 2026, 20:15 | Identity: Pending upload | Right to Work: UK    |
| Profile incomplete - caregiver has not uploaded documents yet                   |
+---------------------------------------------------------------------------------+

...

[Load More]
```

**Queue Filters** (sidebar):
```
Filters:
[ ] Show only SLA breaches (>48h)
[ ] Show only approaching SLA (>36h)
[ ] Show only with DBS certificates
[ ] Show only non-UK nationals (UKVI check)
[ ] Show assigned to me only

Registration Date Range:
From: [____] To: [____]

[Apply Filters] [Clear All]
```

**Bulk Actions** (select multiple caregivers):
```
Select All | Selected: 3 caregivers

Bulk Actions:
[Assign to Me] [Assign to...] [Flag for Senior Review] [Export Selected (CSV)]
```

### 6.2 Verification Review Interface

**Review Panel Layout** (opens when admin clicks "Review Now"):

**Left Sidebar - Caregiver Summary**:
```
[Profile Photo]

John Smith #4523
Caregiver | Pending Verification
Registered: 5 Feb 2026, 09:15
Time Pending: 24 hours

Contact:
📧 john.smith@email.com ✓
📱 +44 7700 900123 ✓

Profile Completeness: 100% ✓
- Photo uploaded ✓
- Bio complete (250 chars) ✓
- Services selected (3) ✓
- Hourly rate set (£20) ✓
- Availability configured ✓
- Bank account connected ✓

Quick Actions:
[Send Message to Caregiver]
[View Public Profile]
[Flag for Senior Review]
```

**Center Panel - Document Viewer** (tabbed interface):

**Tab 1: Identity Documents**

```
Identity Verification

Stripe Identity Result: ✓ Verified
- Document authenticity: Pass ✓
- Face match (selfie vs ID): Pass ✓
- Liveness detection: Pass ✓

Uploaded Documents:
┌─────────────────────────────────────┐
│                                     │
│  [ID Document Image - Passport]     │
│  Photo page shown in high resolution│
│  Zoom controls: [+] [-] [Reset]     │
│                                     │
│  Name: JOHN SMITH                   │
│  DOB: 15 MAR 1985                   │
│  Passport #: 123456789              │
│  Expiry: 01 MAR 2030                │
│                                     │
└─────────────────────────────────────┘

┌──────────────────────────────────┐
│  [Selfie Photo]                  │
│  Liveness check: Pass ✓          │
│                                  │
│  [Compare Side-by-Side with ID]  │
└──────────────────────────────────┘

Admin Review Checklist:
[ ] Photo clear and readable
[ ] ID not expired (expiry: 01 Mar 2030)
[ ] Name matches profile: "John Smith" ✓
[ ] Date of birth consistent
[ ] Selfie matches ID photo
[ ] ID appears genuine (no tampering)

Notes (optional):
[Text area for admin notes]
```

**Tab 2: Right to Work**

```
Right to Work Verification

Document Type: UK Passport
Status: British Citizen → Automatic Right to Work ✓

No UKVI share code check required for British citizens.

Admin Actions:
(*) Approve right to work (British citizen)
( ) Requires UKVI check (non-UK national)

[If non-UK national selected, show UKVI interface]:

UKVI Share Code: [_________]
Date of Birth: [DD/MM/YYYY]

[Open UKVI Online Service] (opens gov.uk in new tab)

After checking UKVI portal, record details:
Visa Type: [Dropdown: Skilled Worker | Spouse | Graduate | Student | Other]
Visa Expiry: [DD/MM/YYYY]
Work Restrictions: [Dropdown: Full-time | Part-time | Hours limited | No work permitted]

Admin Notes:
[Text area]
```

**Tab 3: DBS Certificate** (if uploaded):

```
DBS Verification (Voluntary at Tier 1)

Certificate Uploaded: Yes ✓

┌─────────────────────────────────────┐
│                                     │
│  [DBS Certificate PDF/Image]        │
│  Displayed in viewer                │
│                                     │
│  Certificate Number: 001234567890   │
│  Issue Date: 15 Jan 2026            │
│  Applicant: JOHN SMITH              │
│  DOB: 15/03/1985                    │
│                                     │
└─────────────────────────────────────┘

Admin Review Checklist:
[ ] Certificate number present and readable
[ ] Issue date within 3 years (recommended)
[ ] Name matches caregiver profile
[ ] Date of birth matches caregiver profile
[ ] Certificate level identified

Certificate Level:
(*) Basic DBS
( ) Standard DBS
( ) Enhanced DBS

DBS Update Service Subscriber?
( ) Yes - provide certificate number to check: [__________]
(*) No - accept certificate as static verification

Admin Notes:
[Text area]

[Check DBS Update Service] (link to gov.uk)
```

**Tab 4: Profile Review**

```
Profile Bio Review

Bio (250 characters):
"Experienced companion with 5 years supporting elderly individuals.
I enjoy meaningful conversations, light housework, and accompanying
clients on shopping trips. Patient, reliable, and DBS-checked."

Content Review:
✓ No contact information detected
✓ No external links detected
✓ No profanity detected
✓ No medical claims (Tier 1 = companionship only)
✓ Appropriate professional tone

Profile Photo:
[Thumbnail]

Photo Review:
[ ] Face clearly visible
[ ] Professional appearance
[ ] Matches ID photo (if available for comparison)
[ ] No inappropriate content

Services Selected:
✓ Companionship
✓ Light housework
✓ Shopping/errands
( ) Meal preparation
( ) Transportation

Hourly Rate: £20/hour
(Platform average: £18-22/hour in SW1A area)

Admin Notes:
[Text area]
```

**Right Sidebar - Admin Actions**:

```
Verification Decision

All Checks Complete:
[ ] Identity verification reviewed
[ ] Right to work confirmed
[ ] DBS certificate verified (if applicable)
[ ] Profile content appropriate

Admin Decision:
(*) Approve Profile
    - Creates "Identity Verified" badge
    - Creates "DBS Verified" badge (if DBS approved)
    - Makes profile searchable by care receivers
    - Sends approval email to caregiver

( ) Reject with Reason
    - Keeps profile in pending status
    - Sends email with specific reason and resubmission instructions
    - Allows caregiver to correct and resubmit

( ) Request Resubmission
    - Softer than rejection, for unclear documents
    - Sends guidance email on what to fix
    - Extends review window

Rejection Reason (if rejecting):
[Dropdown: ID expired | ID unclear | Name mismatch | Selfie doesn't match |
Right to work not confirmed | DBS certificate invalid | Profile inappropriate | Other]

Custom Message to Caregiver (optional):
[Text area, 500 chars]

[Cancel Review] [Save Draft] [Submit Decision]
```

**Approval Confirmation**:
```
✓ Verification Approved

John Smith #4523 has been approved!
- Identity Verified badge added ✓
- DBS Verified badge added ✓
- Profile is now live and searchable
- Approval email sent to john.smith@email.com

Next caregiver in queue: Mary Johnson #4524

[Review Next] [Return to Queue] [View Approved Profile]
```

### 6.3 Senior Review Escalation

**When admin clicks "Flag for Senior Review"**:

```
Escalate to Senior Admin

Caregiver: John Smith #4523

Escalation Reason (required):
[Dropdown: Suspected fake ID | Unclear visa status | Complex case |
Unusual documentation | Policy clarification needed | Other]

Details (required, min 50 chars):
[Text area: "ID photo quality is borderline. Passport appears genuine but
resolution is low and some text is unclear. Request senior admin confirmation."]

Priority:
(*) Standard (reviewed within 24 hours)
( ) Urgent (reviewed within 4 hours)

Assign to:
[Dropdown: Any available senior admin | Specific senior admin name]

[Cancel] [Submit Escalation]
```

**Escalation creates notification for senior admin**:
- Email sent to senior admin
- Case appears in senior admin's "Escalated Reviews" queue
- Original admin notified when senior makes decision

---

## 7. Booking Oversight

### 7.1 Booking List View

**All Bookings Dashboard**:

```
Platform Bookings | Total: 234 | Showing: 50 per page

Filters:
Status: [All ▼] | Date Range: [Last 30 days ▼] | Amount: [All ▼]
[✓] Show disputed only | [ ] Show high-value only (>£100)

Search: [Search by booking ID, user name, or postcode] 🔍

+---------------------------------------------------------------------------------+
| Booking #7821 | Completed ✓                                                    |
| Today, 10:00-13:00 (3 hours) | £63.00                                         |
| Care Receiver: Jane Doe #2341 → Caregiver: John Smith #4523                   |
| Service: Companionship, Light housework                                        |
| [View Details] [View Messages]                                                 |
+---------------------------------------------------------------------------------+

| Booking #7820 | In Progress 🔄                                                 |
| Today, 14:00-17:00 (3 hours) | £63.00                                         |
| Care Receiver: Mary White #2340 → Caregiver: Emma Taylor #4522                |
| Service: Companionship, Shopping/errands                                       |
| Started: 14:05 (5 min ago)                                                     |
| [View Details] [Contact Parties]                                               |
+---------------------------------------------------------------------------------+

| Booking #7819 | Disputed ⚠️                                                   |
| Yesterday, 10:00-14:00 (4 hours) | £84.00                                     |
| Care Receiver: Tom Harris #2339 → Caregiver: Sarah Lee #4521                  |
| Dispute raised: Yesterday, 16:30 by Tom Harris                                 |
| Reason: Duration shorter than booked                                            |
| Admin decision due: 3 Feb 2026 (5 days remaining)                              |
| [Review Dispute]                                                                |
+---------------------------------------------------------------------------------+

| Booking #7818 | Cancelled ❌ (Late cancellation)                              |
| Yesterday, 14:00-17:00 (3 hours) | £63.00 refunded                            |
| Care Receiver: Lisa Brown #2338 → Caregiver: David King #4520                 |
| Cancelled by: Caregiver (18 hours before start)                                |
| Warning issued: Yes (late cancellation)                                        |
| [View Details]                                                                  |
+---------------------------------------------------------------------------------+

...

[Previous] [1] [2] [3] [4] [5] ... [15] [Next]
```

**Sort Options**:
- Date (newest first / oldest first)
- Amount (highest first / lowest first)
- Status (disputed first / active first)

**Export Options**:
```
[Export Current View (CSV)] [Export All Bookings (Date Range)]
```

### 7.2 Booking Detail View

**Booking Detail Page** (opens when admin clicks "View Details"):

**Header**:
```
Booking #7821 | Status: Completed ✓
Today, 5 Feb 2026, 10:00-13:00 (3 hours)

Quick Actions:
[Cancel Booking] [Issue Refund] [Contact Care Receiver] [Contact Caregiver]
[View Messages] [View Dispute] [Mark Complete (Override)]
```

**Booking Information** (tabbed interface):

**Tab 1: Overview**

```
Booking Details:
  Booking ID: #7821
  Date: Today, 5 Feb 2026
  Start Time: 10:00
  End Time: 13:00
  Duration: 3 hours
  Status: Completed ✓
  Confirmed by Care Receiver: Today, 13:15

Service Details:
  Services: Companionship, Light housework
  Special Requests: "I'd like help organizing my photo albums"
  Location: SW1A 1AA (care receiver's home)

Care Receiver:
  Name: Jane Doe #2341
  Email: jane.doe@email.com
  Phone: +44 7700 900111
  Address: 123 Main Street, London, SW1A 1AA
  Emergency Contact: John Doe (Son) +44 7700 900112
  [View Care Receiver Profile]

Caregiver:
  Name: John Smith #4523
  Email: john.smith@email.com
  Phone: +44 7700 900123
  Identity Verified ✓ | DBS Verified ✓
  Average Rating: 4.8 stars
  [View Caregiver Profile]

Financial:
  Caregiver Hourly Rate: £20.00
  Duration: 3 hours
  Subtotal: £60.00
  Platform Service Fee (5%): £3.00
  Total Charged to Care Receiver: £63.00

  Platform Commission (15%): £9.00
  Caregiver Earnings: £51.00
  Platform Revenue: £12.00

Payment Status:
  Authorization: 5 Feb 2026, 09:15 (approved)
  Capture: 5 Feb 2026, 09:30 (after caregiver acceptance)
  Release to Caregiver: 5 Feb 2026, 13:20 (after confirmation)
  Stripe Payment Intent ID: pi_1234567890
```

**Tab 2: Timeline**

```
Booking Timeline:

5 Feb 2026, 09:15 | Booking requested by Jane Doe
                  | Payment authorized (£63.00 held)

5 Feb 2026, 09:30 | Booking accepted by John Smith
                  | Payment captured to escrow
                  | Contact details shared with both parties

5 Feb 2026, 09:45 | Booking reminder email sent (24h before)
                  | [Skipped - booking within 24h of request]

5 Feb 2026, 10:05 | Session started (status: in_progress)
                  | Marked by John Smith

5 Feb 2026, 13:05 | Session completed
                  | Marked by John Smith
                  | Completion confirmation sent to Jane Doe

5 Feb 2026, 13:15 | Completion confirmed by Jane Doe
                  | Payment released to John Smith

5 Feb 2026, 13:16 | Review prompt sent to Jane Doe

5 Feb 2026, 14:30 | Review submitted by Jane Doe
                  | Rating: 5 stars
                  | "Wonderful companionship, very patient!"
```

**Tab 3: Messages**

(See Section 8 for detailed message moderation interface)

```
Message Thread: 3 messages

5 Feb 2026, 09:20 | Jane Doe:
"Hi John, looking forward to our session! I have lots of photos to organize."

5 Feb 2026, 09:35 | John Smith:
"Hi Jane, I'll be there at 10am. Happy to help with your photos!"

5 Feb 2026, 09:45 | Jane Doe:
"Perfect, see you soon!"

[View Full Thread]
```

**Tab 4: Admin Actions Log**

```
Admin Actions on This Booking: None

No admin intervention required. Booking completed successfully.
```

### 7.3 Dispute Resolution Interface

**Disputed Booking View** (accessed from booking detail or dispute queue):

```
Dispute Resolution: Booking #7819

Dispute Status: Under Review (6 days old | 1 day until 7-day SLA)
Raised by: Care Receiver Tom Harris #2339
Raised on: 4 Feb 2026, 16:30

+---------------------------------------------------------------------------------+
| Booking Details                                                                 |
| Date: 4 Feb 2026, 10:00-14:00 (4 hours booked)                                |
| Care Receiver: Tom Harris → Caregiver: Sarah Lee                               |
| Amount: £84.00 (£80 service + £4 platform fee)                                 |
| Caregiver Earnings: £68.00 (after 15% commission)                              |
| Payment Status: Held in escrow (not released to caregiver)                     |
+---------------------------------------------------------------------------------+

Care Receiver's Claim:
  Dispute Reason: Duration shorter than booked
  Description: "Sarah only stayed for 2.5 hours instead of 4 hours. She left early
  saying she had another commitment. The service she provided was good, but I paid
  for 4 hours and only received 2.5 hours."

  Evidence Uploaded:
  - Screenshot of text exchange showing departure time

  [View Evidence]

Caregiver's Response:
  Response Submitted: 4 Feb 2026, 18:45 (2 hours 15 min after dispute raised)
  Description: "I sincerely apologize. I received an urgent call about a family
  emergency and had to leave early. I should have communicated this better and
  offered to reschedule the remaining time. Tom was understanding at the time."

  Evidence Uploaded:
  - None

  [View Response]

Booking History Context:
  - Messages between parties: 4 messages (view below)
  - Completion marked by: Caregiver (Sarah Lee) at 12:35 (2h 35min into booking)
  - Care receiver confirmed initially, then raised dispute 4 hours later
  - Caregiver has 4.9-star average rating (32 reviews)
  - Care receiver has 2 completed bookings, no previous disputes

Message Thread:
  [View full thread for context]
  Summary: Caregiver messaged at 12:20 saying "family emergency, need to leave soon"
  Care receiver replied: "ok, I understand, hope everything is ok"

Admin Decision Interface:
(*) Full Refund (£84.00 to care receiver, £0 to caregiver)
( ) Partial Refund: [___]% = £[___] to care receiver, £[___] to caregiver
    Quick options: [25%] [50%] [75%]
( ) No Refund (£0 to care receiver, £68.00 to caregiver as planned)

Recommended Decision (AI suggestion): Partial Refund (40%)
Rationale: Caregiver provided 2.5 of 4 hours (62.5% of service). Emergency was
legitimate. Recommend refunding 1.5 hours worth: 40% refund.

Decision Rationale (required, min 50 chars):
[Text area: "Caregiver left early due to genuine family emergency after providing
2.5 hours of 4-hour booking. Care receiver entitled to refund for undelivered
1.5 hours (37.5% of service). Rounding to 40% refund (£33.60 to care receiver,
£50.40 to caregiver). Caregiver should have proactively offered partial refund."]

Notify Both Parties:
[✓] Send decision email to care receiver
[✓] Send decision email to caregiver
[✓] Include rationale summary in emails

[Cancel] [Save Draft] [Submit Decision]
```

**Decision Confirmation**:
```
✓ Dispute Resolved

Booking #7819 dispute resolved: Partial Refund (40%)

Financial Outcome:
- Care receiver refund: £33.60 (processed in 5-10 business days)
- Caregiver payment: £50.40 (released immediately)
- Platform adjusts commission accordingly

Notifications Sent:
✓ Email sent to Tom Harris (care receiver)
✓ Email sent to Sarah Lee (caregiver)

Both parties have 7 days to appeal this decision.

[View Booking] [Return to Dispute Queue] [Close]
```

---

## 8. Content Moderation

### 8.1 Flagged Messages Queue

**Message Moderation Dashboard**:

```
Flagged Messages Queue | Total: 5 flagged | Showing: All

Priority Filters:
[✓] Urgent (safeguarding keywords) | [ ] High (off-platform payment) |
[ ] Medium (profanity) | [ ] Low (other)

+---------------------------------------------------------------------------------+
| 🚨 URGENT | Booking #7823 | Flagged: 15 minutes ago                          |
| Keyword detected: "hurt", "scared"                                              |
| From: Care Receiver Emma Wilson #2345 → Caregiver Tom Brown #4526              |
| Message: "I felt uncomfortable when he arrived. He seemed angry and I was      |
| a bit scared. He didn't hurt me but his tone was aggressive."                  |
| [Review Message] [Contact Safeguarding Officer] [Suspend Caregiver]           |
+---------------------------------------------------------------------------------+

| ⚠️ HIGH | Booking #7822 | Flagged: 2 hours ago                               |
| Keyword detected: "pay me directly", "cash"                                    |
| From: Caregiver Sarah Lee #4521 → Care Receiver Jane Doe #2341                |
| Message: "If you pay me directly in cash next time, I can offer you a         |
| discount and we can avoid the platform fees."                                  |
| [Review Message] [Warn User] [Suspend Caregiver]                              |
+---------------------------------------------------------------------------------+

| 🔶 MEDIUM | Booking #7821 | Flagged: 5 hours ago                             |
| Keyword detected: Profanity filter                                             |
| From: Care Receiver Tom Harris #2339 → Caregiver David King #4520             |
| Message: "This is bloody ridiculous, you were supposed to be here 30 min ago!"|
| [Review Message] [Dismiss Flag] [Warn User]                                   |
+---------------------------------------------------------------------------------+

...
```

**Message Review Interface**:

```
Flagged Message Review: Booking #7822

Flag Type: High Priority - Off-Platform Payment Request
Flagged: 2 hours ago by automated content filter

Full Message Thread (5 messages):

4 Feb 2026, 14:30 | Care Receiver Jane Doe:
"Thank you for the wonderful session today! You were so helpful."

4 Feb 2026, 14:35 | Caregiver Sarah Lee:
"You're very welcome! I really enjoyed our time together."

4 Feb 2026, 15:00 | Care Receiver Jane Doe:
"I'd love to book you again next week. Same time?"

4 Feb 2026, 15:10 | Caregiver Sarah Lee:
"Absolutely! I'd be happy to. Just a thought - if you pay me directly in
cash next time, I can offer you a discount and we can avoid the platform fees."
[🚩 FLAGGED MESSAGE]

4 Feb 2026, 15:15 | Care Receiver Jane Doe:
"Oh, that sounds good. How would we arrange that?"

User Context:
- Caregiver: Sarah Lee #4521 | Joined: 1 Feb 2026 | 5 completed bookings
- Average rating: 4.9 stars | No previous reports
- Care Receiver: Jane Doe #2341 | Joined: 15 Jan 2026 | 8 completed bookings

Platform Policy Violation:
⚠️ Severe Violation: Requesting off-platform payment
Policy: Zero tolerance - immediate suspension

Admin Decision:
(*) Suspend caregiver immediately (platform bypass attempt)
    Duration: [Permanent ban ▼] (recommended for off-platform payment requests)

( ) Warn caregiver (first-time policy education)
    Send warning email explaining policy violation

( ) Dismiss flag (false positive)
    Document reason for dismissal

Rationale (required):
[Text area: "Clear attempt to bypass platform payment system and avoid fees.
This is a zero-tolerance violation per platform policy. Care receiver was
receptive which indicates financial exploitation risk for vulnerable adults."]

Notify Care Receiver:
[✓] Send email to Jane Doe explaining situation
    Message: "We've identified that your caregiver requested off-platform payment,
    which violates our Terms of Service and removes payment protections. We've
    suspended the caregiver's account. Please continue using the platform for all
    bookings to ensure your safety and payment security."

[Cancel] [Submit Decision]
```

### 8.2 Flagged Profiles Queue

**Profile Moderation Dashboard**:

```
Flagged Caregiver Profiles | Total: 3 flagged

+---------------------------------------------------------------------------------+
| Caregiver: Emma Taylor #4522 | Flagged: Yesterday, 16:30                      |
| Flag Reason: Inappropriate profile photo                                        |
| Flagged by: Automated content filter (manual review required)                  |
| Status: Profile hidden pending review                                           |
| [Review Profile]                                                                |
+---------------------------------------------------------------------------------+

| Caregiver: David King #4520 | Flagged: 2 days ago                              |
| Flag Reason: Bio contains contact information                                   |
| Flagged by: Automated content filter                                            |
| Detected: Phone number pattern in bio                                           |
| [Review Profile]                                                                |
+---------------------------------------------------------------------------------+

...
```

**Profile Review Interface**:

```
Flagged Profile Review: Emma Taylor #4522

Flag Type: Inappropriate Profile Photo
Flagged: 4 Feb 2026, 16:30

Current Profile Photo:
[Photo displayed]

Issue: Photo appears to be a group photo (multiple people visible)
Platform Policy: Profile photos must show only the caregiver, face clearly visible

Admin Decision:
(*) Request new photo
    Send email to caregiver: "Please upload a solo photo showing your face clearly"
    Hide profile until new photo uploaded and approved

( ) Approve photo (false flag)
    Document reason for approval

( ) Suspend profile (serious violation)
    If photo is offensive, inappropriate, or not of the caregiver

Message to Caregiver (auto-populated, editable):
"Hi Emma, we've noticed your profile photo shows multiple people. Platform policy
requires profile photos to show only you, with your face clearly visible. This helps
care receivers recognize you and builds trust. Please upload a new solo photo, and
we'll review it within 24 hours. Your profile is temporarily hidden until approved."

[Cancel] [Send Request]
```

---

## 9. Reporting & Analytics

### 9.1 Platform Metrics Dashboard

**Analytics Home** (accessible to all admin roles):

```
Platform Analytics | Last Updated: Today, 15:00

Date Range: [Last 30 days ▼] | Compare to: [Previous 30 days]

+---------------------------------------------------------------------------------+
| Key Metrics Overview                                                            |
+---------------------------------------------------------------------------------+

| Total Users: 234 (+15% vs previous period)                                     |
|   - Care Receivers: 145 (+12%)                                                  |
|   - Caregivers: 89 (+20%)                                                       |
|                                                                                 |
| Active Users (last 7 days): 112 (+8%)                                          |
|   - Care Receiver activity: 78 users                                            |
|   - Caregiver activity: 34 users                                                |
|                                                                                 |
| Total Bookings: 156 (+25%)                                                     |
|   - Completed: 134 (86%)                                                        |
|   - In Progress: 8 (5%)                                                         |
|   - Cancelled: 12 (8%)                                                          |
|   - Disputed: 2 (1%)                                                            |
|                                                                                 |
| Revenue (GMV): £3,120 (+28%)                                                   |
|   - Platform fees: £468 (15% take rate)                                        |
|   - Refunds issued: £126 (4% of GMV)                                           |
+---------------------------------------------------------------------------------+

[View Detailed Analytics]
```

### 9.2 Verification Metrics

```
Caregiver Verification Analytics | Last 30 days

+---------------------------------------------------------------------------------+
| Verification Performance                                                        |
+---------------------------------------------------------------------------------+

Total Applications: 89 caregivers
  - Approved: 72 (81%)
  - Rejected: 12 (13%)
  - Pending: 5 (6%)

Average Review Time: 22 hours (Target: <48h) ✓
SLA Compliance: 96% (85 of 89 reviewed within 48h)
SLA Breaches: 4 (flagged for process review)

Verification Method Breakdown:
  - Automated (Stripe Identity): 68 (76% success rate)
  - Manual Review: 21 (24% required fallback)

Rejection Reasons:
  1. ID expired: 5 (42%)
  2. ID unclear/poor quality: 3 (25%)
  3. Name mismatch: 2 (17%)
  4. Suspected fake ID: 1 (8%)
  5. Right to work not confirmed: 1 (8%)

Voluntary DBS Uptake: 25 of 72 approved caregivers (35%)
  - Basic DBS: 8
  - Standard DBS: 5
  - Enhanced DBS: 12

[Export Verification Report (CSV)]
```

### 9.3 Booking Analytics

```
Booking Analytics | Last 30 days

+---------------------------------------------------------------------------------+
| Booking Performance                                                             |
+---------------------------------------------------------------------------------+

Booking Conversion Funnel:
1. Booking Requests Sent: 180
2. Accepted by Caregiver: 162 (90% acceptance rate)
3. Started (not cancelled): 156 (96% show rate)
4. Completed: 134 (86% of started)
5. Reviewed: 98 (73% review rate)

Cancellations:
  - By Care Receiver: 8 (6 within policy, 2 late cancellations)
  - By Caregiver: 4 (all refunded, 1 late cancellation warning issued)

No-Shows:
  - Caregiver no-show: 0 ✓
  - Care receiver no-show: 0 ✓

Disputes:
  - Disputes raised: 2 (1% of completed bookings)
  - Resolved: 1 (within 7-day SLA)
  - Pending: 1 (3 days old)

Average Booking Value: £63
Average Session Duration: 3.2 hours
Most Popular Services: Companionship (100%), Light housework (45%), Shopping (30%)

[View Detailed Booking Analytics]
```

### 9.4 Safeguarding Analytics

```
Safeguarding Reports | Last 30 days

Total Reports: 5
  - Urgent: 1 (responded within 2 hours)
  - High Priority: 2 (responded within 24 hours)
  - Medium: 2 (responded within 48 hours)

Report Categories:
  - Off-platform payment request: 2 (both resulted in suspensions)
  - Inappropriate behavior: 1 (resolved with warning)
  - No-show concern: 1 (caregiver no-show, account banned)
  - Other: 1 (dismissed as misunderstanding)

Actions Taken:
  - Warnings issued: 1
  - Temporary suspensions: 1
  - Permanent bans: 2
  - No action (false report): 1

External Escalations:
  - Police: 0
  - Local safeguarding board: 0
  - ICO (data breach): 0

Average Response Time: 4.5 hours (Target: Urgent <2h, others <24h) ✓

[View Safeguarding Incident Log]
```

### 9.5 User Quality Metrics

```
User Quality Analytics | Last 30 days

+---------------------------------------------------------------------------------+
| Caregiver Quality                                                               |
+---------------------------------------------------------------------------------+

Average Caregiver Rating: 4.7 stars (across 98 reviews)
Rating Distribution:
  - 5 stars: 72%
  - 4 stars: 23%
  - 3 stars: 4%
  - 2 stars: 1%
  - 1 star: 0%

Low-Rated Caregivers (<3.5 stars): 2 (flagged for admin review)

Caregiver Response Metrics:
  - Average response time: 6.2 hours (Target: <12h)
  - Acceptance rate: 90%
  - Auto-decline rate (no response): 8%
  - Manual decline rate: 2%

Top-Rated Caregivers (>4.9 stars, 10+ bookings): 5
  [View Top Caregivers]

+---------------------------------------------------------------------------------+
| Care Receiver Quality                                                           |
+---------------------------------------------------------------------------------+

Care Receiver Issues:
  - No-shows reported: 0
  - Payment disputes: 2
  - Late cancellations: 2

High-Quality Care Receivers (5+ bookings, no issues): 34

[Export Quality Report (CSV)]
```

### 9.6 Export & Custom Reports

```
Custom Report Builder

Report Type:
(*) Verifications
( ) Bookings
( ) Users
( ) Financial
( ) Safeguarding

Date Range:
From: [DD/MM/YYYY] To: [DD/MM/YYYY]

Fields to Include:
[✓] User ID
[✓] Name
[✓] Registration Date
[✓] Verification Status
[✓] Verification Date
[✓] Admin Reviewer
[ ] Rejection Reason
[ ] DBS Status

Filters:
Status: [All ▼]
Admin Reviewer: [All ▼]

Format:
(*) CSV
( ) Excel (XLSX)
( ) PDF

[Preview Report] [Generate & Download]
```

---

## 10. Audit Logging

### 10.1 Audit Log Viewer

**Audit Log Dashboard** (accessible to Super Admin and Safeguarding Officer):

```
Platform Audit Log | Last 500 events | All admin actions logged

Date Range: [Last 7 days ▼]

Filters:
Admin User: [All ▼] | Action Type: [All ▼] | Entity: [All ▼]

+---------------------------------------------------------------------------------+
| Timestamp | Admin User | Action | Entity | Details                             |
+---------------------------------------------------------------------------------+
| Today 15:30 | Admin Sarah | Approved | Caregiver #4523 | Identity verification |
| Today 15:15 | Admin Sarah | Viewed | Care Receiver #2341 | Profile viewed     |
| Today 14:45 | Admin John | Suspended | Caregiver #4521 | 7 days (policy violation) |
| Today 14:30 | Admin Sarah | Resolved | Dispute #42 | Partial refund (50%)   |
| Today 14:00 | Admin Sarah | Rejected | Caregiver #4522 | ID expired          |
| Today 13:30 | Admin John | Banned | Caregiver #4520 | Off-platform payment |
| Today 12:00 | Admin Sarah | Exported | Report | Verification metrics CSV |
...
```

### 10.2 Logged Actions

**All admin actions logged with details**:

**User Management**:
- User profile viewed (who, when, which user)
- User profile edited (field changed, old value, new value)
- User suspended (duration, reason)
- User banned (reason, evidence)
- Suspension lifted early (reason)

**Verification**:
- Verification approved (which verification type, admin name)
- Verification rejected (reason, notification sent)
- Verification escalated to senior admin (reason)
- Verification documents viewed (which documents, timestamp)

**Booking Management**:
- Booking viewed (who, when, which booking)
- Booking cancelled by admin (reason)
- Dispute resolved (outcome, refund amount, rationale)
- Manual refund issued (amount, reason)
- Booking status overridden (from status, to status, reason)

**Content Moderation**:
- Flagged message reviewed (decision, rationale)
- Profile moderation action (approved/rejected/requested changes)
- Message deleted (reason, content preserved in log)

**Safeguarding**:
- Safety report viewed (who, when)
- Safety report responded to (action taken, notes)
- User suspended immediately (safeguarding reason)
- External authority contacted (which authority, reference number)

**System Actions**:
- Admin user logged in (IP address, timestamp)
- Admin user logged out
- Failed login attempts (IP address, count)
- Platform settings changed (setting name, old value, new value)
- Admin user created/modified/deleted
- Data exported (report type, date range, admin user)

### 10.3 Audit Log Export

```
Export Audit Log

Date Range:
From: [DD/MM/YYYY] To: [DD/MM/YYYY]

Filters:
Admin User: [All ▼]
Action Types: [✓] All | [ ] User Management | [ ] Verifications | [ ] Bookings |
              [ ] Content Moderation | [ ] Safeguarding | [ ] System

Format:
(*) CSV (recommended for large exports)
( ) PDF (max 1000 events)

Include Sensitive Data:
[ ] Include deleted content (messages, profiles)
[ ] Include payment details (transaction IDs, amounts)
    ⚠️ Requires Super Admin authorization

Purpose (required for sensitive data exports):
[Dropdown: Regulatory audit | Internal review | External audit | Legal request | Other]

[Cancel] [Generate Export]
```

---

## 11. Safeguarding Tools

### 11.1 Safeguarding Incident Dashboard

**Safeguarding Home** (accessible to Super Admin and Safeguarding Officer):

```
Safeguarding Incident Management

🚨 Urgent Attention Required: 1 incident

+---------------------------------------------------------------------------------+
| URGENT | Incident #42 | Reported: 35 minutes ago                              |
| Type: Caregiver No-Show | Reporter: Care Receiver Emma Wilson #2345            |
| Severity: High (vulnerable adult left without care)                             |
| Assigned to: Safeguarding Officer John                                          |
| Status: Investigating                                                            |
| [Respond Now]                                                                    |
+---------------------------------------------------------------------------------+

Recent Incidents (Last 30 days): 5 total
  - Resolved: 4
  - Investigating: 1
  - Escalated to external authorities: 0

By Category:
  - Off-platform payment requests: 2
  - Inappropriate behavior: 1
  - Caregiver no-show: 1
  - Care receiver no-show reported: 1

By Severity:
  - Critical: 0
  - High: 2
  - Medium: 2
  - Low: 1

[View All Incidents] [View Escalated Cases] [View Closed Cases]
```

### 11.2 Incident Response Interface

**Incident Detail View**:

```
Safeguarding Incident #42 | URGENT

Incident Type: Caregiver No-Show
Severity: High (vulnerable adult left without care)
Status: Investigating
Assigned to: Safeguarding Officer John
Reported: Today, 14:35 (35 minutes ago)

Reporter:
  Name: Emma Wilson (Care Receiver #2345)
  Age: 78 years old
  Contact: +44 7700 900234
  Emergency Contact: Sarah Wilson (Daughter) +44 7700 900235

Reported User:
  Name: Tom Brown (Caregiver #4526)
  Contact: +44 7700 900567
  Status: Account suspended immediately (automatic)
  [View Full Profile]

Incident Description:
"My caregiver Tom was supposed to arrive at 2pm for our 3-hour session. It's now
2:30pm and he hasn't shown up or called. I tried calling him twice but no answer.
I was really looking forward to going to the shops today and now I'm stuck at home."

Evidence Attached:
  - Screenshot of unanswered calls (2 attempts)
  - Booking confirmation showing 2pm start time
  [View All Evidence]

Booking Details:
  Booking ID: #7823
  Date: Today, 14:00-17:00 (3 hours)
  Service: Companionship, Shopping/errands
  Amount: £63.00

Reporter's History:
  - Account age: 45 days
  - Total bookings: 8 (all completed successfully)
  - Previous reports: 0
  - Reliability: No previous issues

Reported User's History:
  - Account age: 12 days
  - Total bookings: 3 completed, 1 no-show (this incident)
  - Average rating: 4.3 stars (3 reviews)
  - Previous reports: 0
  - Late cancellations: 1 (within first week)

Investigation Log:
  [Add entry]

Today, 14:36 | Officer John: Account suspended immediately per policy
Today, 14:37 | Officer John: Attempted to contact Tom Brown (no answer)
Today, 14:40 | Officer John: Contacted Emma Wilson to confirm she's safe
Today, 14:45 | Officer John: Sent SMS to Tom Brown requesting immediate response

Actions Taken:
[✓] Caregiver account suspended immediately
[✓] Care receiver contacted (welfare check)
[✓] Full refund processed (£63.00)
[ ] Caregiver contacted (explanation requested)
[ ] Evidence reviewed
[ ] Decision made

Immediate Actions:
[Contact Care Receiver] [Contact Caregiver] [Contact Emergency Contact]
[Call 999 (Emergency Services)] [Escalate to Senior Admin]

Investigation Decision:
(*) Confirm No-Show (pending caregiver response)
    - Permanent ban recommended
    - Full refund confirmed
    - Safeguarding incident recorded

( ) Dismiss Report (if false or misunderstanding)
    - Requires strong evidence
    - Reinstate caregiver account

( ) Needs More Investigation
    - Extend investigation timeline
    - Request additional evidence

Rationale (required):
[Text area]

External Escalation Required?
[ ] Yes - contact police
[ ] Yes - contact local safeguarding board
[✓] No - handle internally

[Save Progress] [Close Incident] [Escalate Externally]
```

### 11.3 Emergency Contact List

**Safeguarding Quick Reference**:

```
Emergency Contacts | Quick Access

🚨 EMERGENCY SERVICES
  Police/Ambulance/Fire: 999
  Non-emergency police: 101
  NHS 111: 111

🛡️ SAFEGUARDING AUTHORITIES
  London Safeguarding Adults Board: 020 XXXX XXXX
  Adult Social Services (Westminster): 020 XXXX XXXX
  CQC General Enquiries: 03000 616161

⚖️ REGULATORY & LEGAL
  Action Fraud (identity fraud reporting): 0300 123 2040
  ICO (data breach reporting): 0303 123 1113
  Platform Legal Counsel: [Contact details]

📞 INTERNAL ESCALATION
  Super Admin (On-call): +44 7XXX XXXXXX
  Safeguarding Officer Primary: +44 7XXX XXXXXX
  Safeguarding Officer Backup: +44 7XXX XXXXXX

[Print Reference Card] [Add Contact] [Edit Contacts]
```

### 11.4 Safeguarding Policy Quick Access

```
Safeguarding Policy | Quick Reference

Care Act 2014 Six Safeguarding Principles:
1. Empowerment: Supporting people to make informed choices
2. Prevention: Taking action before harm occurs
3. Proportionality: Proportionate and least intrusive response
4. Protection: Support and representation for those in greatest need
5. Partnership: Local solutions through services working together
6. Accountability: Transparency in delivering safeguarding

Platform Safeguarding Duties:
- Respond to all reports within 2 hours (urgent) or 24 hours (standard)
- Contact emergency services immediately if life at risk
- Report suspected abuse to local safeguarding board
- Maintain detailed records of all incidents
- Preserve evidence for potential investigations
- Support vulnerable adults throughout process

Incident Severity Levels:
- Critical: Immediate danger, life-threatening (call 999 first, then act)
- High: Serious concern, vulnerable adult at risk (respond within 2 hours)
- Medium: Policy violation, potential exploitation (respond within 24 hours)
- Low: Minor concern, user education needed (respond within 48 hours)

[View Full Safeguarding Policy] [Safeguarding Training Materials]
```

---

## 12. Data Requirements

### 12.1 Admin User Data Model

```
admin_users {
  id: UUID (primary key)
  email: VARCHAR(255) UNIQUE
  password_hash: VARCHAR(255) (bcrypt)
  full_name: VARCHAR(255)
  role: ENUM (super_admin, safeguarding_officer, operations_manager, customer_support)

  // 2FA
  totp_secret: VARCHAR(255) (encrypted, for authenticator app)
  totp_enabled: BOOLEAN (mandatory for super_admin, safeguarding_officer, operations_manager)
  backup_codes: JSONB (array of 10 single-use codes, hashed)

  // Status
  status: ENUM (active, suspended, deleted)
  last_login_at: TIMESTAMP
  last_login_ip: VARCHAR(45)
  failed_login_attempts: INTEGER (reset on successful login)
  locked_until: TIMESTAMP (15-min lockout after 10 failures)

  // Permissions
  permissions: JSONB (granular permissions override for custom roles)

  // Metadata
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
  created_by: UUID (admin who created this account)
}
```

### 12.2 Audit Log Data Model

```
audit_logs {
  id: UUID (primary key)
  admin_user_id: UUID (foreign key -> admin_users, null if system action)
  action_type: VARCHAR(100) (e.g., "verification_approved", "user_suspended")
  entity_type: VARCHAR(50) (e.g., "user", "booking", "message")
  entity_id: UUID (ID of affected entity)

  // Action Details
  description: TEXT (human-readable description)
  old_value: JSONB (before state, if applicable)
  new_value: JSONB (after state, if applicable)
  metadata: JSONB (additional context, e.g., reason, evidence)

  // Context
  ip_address: VARCHAR(45)
  user_agent: TEXT

  // Immutability
  timestamp: TIMESTAMP (creation time, cannot be modified)
  hash: VARCHAR(64) (SHA-256 of log entry for integrity verification)
}

// Index on timestamp, admin_user_id, action_type for fast queries
```

### 12.3 Safeguarding Incident Data Model

```
safeguarding_incidents {
  id: UUID (primary key)
  incident_number: VARCHAR(20) (human-readable, e.g., "SAF-2026-042")

  // Reporter
  reporter_id: UUID (foreign key -> users)
  reporter_type: ENUM (care_receiver, caregiver, family_member, admin, external)

  // Reported User
  reported_user_id: UUID (foreign key -> users, nullable if system-reported)
  reported_user_type: ENUM (care_receiver, caregiver)

  // Incident Details
  incident_type: ENUM (no_show, inappropriate_behavior, off_platform_payment,
                       suspected_abuse, financial_exploitation, other)
  severity: ENUM (critical, high, medium, low)
  description: TEXT
  evidence_urls: JSONB (array of S3 URLs for uploaded evidence)

  // Related Entities
  related_booking_id: UUID (foreign key -> bookings, nullable)
  related_message_ids: JSONB (array of message IDs for context)

  // Investigation
  assigned_to: UUID (foreign key -> admin_users, safeguarding officer)
  status: ENUM (reported, investigating, resolved, escalated, closed)
  investigation_notes: TEXT (admin internal notes)
  resolution: TEXT (outcome and actions taken)

  // External Escalation
  escalated_to: VARCHAR(255) (e.g., "Metropolitan Police", "Westminster SAB")
  escalation_reference: VARCHAR(100) (external case reference number)
  escalated_at: TIMESTAMP

  // Timestamps
  reported_at: TIMESTAMP
  responded_at: TIMESTAMP (SLA tracking)
  resolved_at: TIMESTAMP
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
}
```

### 12.4 Flagged Content Data Model

```
flagged_content {
  id: UUID (primary key)

  // Content Reference
  content_type: ENUM (message, profile_photo, profile_bio, review)
  content_id: UUID (foreign key to messages, user_profiles, reviews)
  content_text: TEXT (copy of flagged content at time of flagging)

  // Flag Details
  flag_type: ENUM (automated, user_reported, admin_flagged)
  flag_reason: VARCHAR(255) (e.g., "off_platform_payment_keyword", "profanity")
  flagged_keywords: JSONB (array of matched keywords if automated)

  // Users Involved
  content_author_id: UUID (foreign key -> users)
  reporter_id: UUID (foreign key -> users, nullable if automated)

  // Moderation
  status: ENUM (pending, reviewing, dismissed, actioned)
  reviewed_by: UUID (foreign key -> admin_users)
  review_decision: ENUM (approve, warn_user, suspend_user, delete_content, escalate)
  review_notes: TEXT (admin rationale)

  // Timestamps
  flagged_at: TIMESTAMP
  reviewed_at: TIMESTAMP
}
```

### 12.5 Admin Session Data Model

```
admin_sessions {
  id: UUID (primary key)
  admin_user_id: UUID (foreign key -> admin_users)
  session_token: VARCHAR(255) (hashed JWT or session ID)

  // Session Details
  ip_address: VARCHAR(45)
  user_agent: TEXT
  expires_at: TIMESTAMP (30-day session duration)

  // Security
  last_activity_at: TIMESTAMP (for idle timeout)
  invalidated_at: TIMESTAMP (null if active, set on logout or security event)
  invalidation_reason: VARCHAR(255) (e.g., "user_logout", "password_changed", "security_event")

  // Timestamps
  created_at: TIMESTAMP
}
```

---

## 13. Edge Cases

### 13.1 Verification Edge Cases

**EC-VER-001: Caregiver Resubmits After Rejection Multiple Times**
- **Scenario**: Caregiver's ID rejected 5 times for various reasons (poor quality, expired, etc.)
- **Handling**: After 3 rejections, flag for senior admin review. After 5 rejections, temporary account suspension pending identity verification via video call.

**EC-VER-002: DBS Certificate Shared Between Multiple Caregivers (Fraud)**
- **Scenario**: Two caregivers upload same DBS certificate number
- **Handling**: System detects duplicate certificate number. Both accounts suspended immediately. Senior admin investigates. Legitimate owner reinstated, fraudster permanently banned.

**EC-VER-003: Admin Accidentally Approves Fake ID**
- **Scenario**: Admin approves profile, later discovered ID was fake
- **Handling**: Immediate account suspension. Safeguarding incident created. Review all bookings with affected caregiver. Contact care receivers. Update admin training. Quality control sampling increased.

**EC-VER-004: Visa Expires During Active Booking**
- **Scenario**: Caregiver's visa expires tomorrow, but they have booking scheduled for next week
- **Handling**: Automated reminder sent 60/30/7 days before expiry. If visa expires without renewal, booking auto-cancelled with full refund. Profile deactivated. Care receiver notified and offered alternative caregivers.

---

### 13.2 User Management Edge Cases

**EC-USER-001: Admin Accidentally Bans Wrong User**
- **Scenario**: Admin meant to ban Caregiver #4523 but clicked Caregiver #4532
- **Handling**: Super Admin can reverse permanent bans (with justification logged). Banned-in-error user notified with apology. Compensation offered (e.g., account credit). Admin receives additional training.

**EC-USER-002: Suspended User Creates New Account (Ban Evasion)**
- **Scenario**: Banned caregiver creates new account with different email but same phone number
- **Handling**: System detects phone number match. New account flagged for review. Senior admin confirms identity match. New account banned. Original ban extended.

**EC-USER-003: User Requests Account Deletion During Active Booking**
- **Scenario**: Care receiver wants to delete account but has booking scheduled tomorrow
- **Handling**: Account deletion blocked if active bookings exist. User prompted to cancel bookings first. After all bookings cancelled/completed, deletion proceeds with 30-day grace period.

**EC-USER-004: Caregiver Profile Suspended But Admin Wants to Issue Refund**
- **Scenario**: Suspended caregiver has disputed booking requiring refund
- **Handling**: Admin can issue refunds to suspended accounts. Payment processed. Suspension remains in effect. Refund noted in suspension record.

---

### 13.3 Booking Oversight Edge Cases

**EC-BOOK-001: Disputed Booking Admin Forgets to Respond Within 7 Days**
- **Scenario**: Dispute raised, admin assigned but doesn't respond, SLA breached
- **Handling**: Automated escalation on day 8. Senior admin notified. Dispute resolved within 24 hours. Admin performance reviewed. Apology sent to both parties.

**EC-BOOK-002: Both Parties Provide Conflicting Evidence in Dispute**
- **Scenario**: Care receiver claims session was 2 hours, caregiver claims 4 hours. No objective evidence.
- **Handling**: Admin reviews: messages (timing of communication), completion timestamp, patterns (user histories). If cannot determine truth, default to 50/50 split (partial refund). Document as "inconclusive evidence."

**EC-BOOK-003: No-Show Report But Caregiver Has GPS Proof of Arrival**
- **Scenario**: Care receiver reports no-show, caregiver provides GPS location showing they arrived
- **Handling**: Admin reviews GPS evidence, attempted contact proof, timestamps. If credible, care receiver warned (possible memory issue or false report). Caregiver compensated. Safeguarding concern raised (cognitive decline in care receiver?).

**EC-BOOK-004: Booking Cancelled by Admin But Payment Already Released**
- **Scenario**: Admin cancels booking (policy violation) but payment already released to caregiver
- **Handling**: Platform claws back payment from caregiver's next booking. If no future bookings, invoice sent to caregiver. If unrecoverable, platform absorbs cost. Improved timing checks implemented.

---

### 13.4 Content Moderation Edge Cases

**EC-MOD-001: Message Flagged for "Pay me directly" But Context is Innocent**
- **Scenario**: Message: "I'll pay me directly out of pocket for any supplies we need for crafts"
- **Handling**: Admin reviews full context. False positive dismissed. User not penalized. Content filter keyword tweaked to reduce false positives.

**EC-MOD-002: Caregiver Changes Profile Photo to Inappropriate Image After Approval**
- **Scenario**: Caregiver approved with professional photo, later changes to party photo
- **Handling**: Profile photo changes trigger re-review queue. Inappropriate photo flagged. Profile hidden. Caregiver required to revert to appropriate photo or upload new one. Warning issued.

**EC-MOD-003: User Cleverly Bypasses Content Filter ("Pay Me in KaSh")**
- **Scenario**: User uses creative spelling to avoid keyword detection
- **Handling**: Manual detection by admin or user report. Immediate suspension (zero tolerance). Content filter updated with pattern variations. Machine learning considered for evasion detection.

---

### 13.5 Safeguarding Edge Cases

**EC-SAFE-001: Urgent Report Filed at 3am (Outside Business Hours)**
- **Scenario**: No-show report filed at 3am, no admin online
- **Handling**: Automated response sent: "Report received, on-call safeguarding officer will respond within 2 hours." SMS alert sent to on-call officer. Officer responds remotely via phone/email. Full investigation next business day.

**EC-SAFE-002: Safeguarding Concern But Caregiver Has 10 Perfect Reviews**
- **Scenario**: Single concerning report against highly-rated caregiver. Possible false accusation?
- **Handling**: Take all safeguarding reports seriously. Suspend caregiver during investigation (erring on side of safety). Thorough investigation including contacting previous care receivers. If false accusation confirmed, reinstate caregiver with apology and compensation.

**EC-SAFE-003: Care Receiver Reports Financial Exploitation But Has Dementia**
- **Scenario**: Care receiver claims caregiver stole money, but family says care receiver has memory issues
- **Handling**: Investigate thoroughly regardless of cognitive state. Contact family, review messages, check payment records. If evidence inconclusive, cannot penalize caregiver. But flag case and monitor future bookings closely. Suggest family oversight for future bookings.

---

### 13.6 System & Technical Edge Cases

**EC-SYS-001: Admin Dashboard Down During SLA-Critical Verification**
- **Scenario**: Platform down for 4 hours, pushing verification past 48h SLA
- **Handling**: SLA window automatically extended by downtime duration. Admins notified of extension. Users informed of technical issue. Verification processed immediately when system restored.

**EC-SYS-002: Admin Accidentally Clicks "Approve" Instead of "Reject"**
- **Scenario**: Misclick approves bad verification
- **Handling**: Admin can reverse approval within 10 minutes (undo button). After 10 minutes, requires senior admin approval to reverse. If profile already received bookings, more complex reversal (contact care receivers, suspend account, review bookings).

**EC-SYS-003: Multiple Admins Review Same Caregiver Simultaneously**
- **Scenario**: Two admins open same verification review, both make decisions
- **Handling**: Database locking prevents duplicate actions. First decision to save wins. Second admin receives error: "This verification has already been reviewed." Audit log records both attempts.

---

## 14. Acceptance Criteria

### 14.1 Dashboard Home

**AC-HOME-001: Overview Metrics Display**
- [ ] Dashboard displays 4 key metric cards: Pending Verifications, Active Bookings, Today's Bookings, Urgent Reports
- [ ] Metrics update in real-time (or every 30 seconds)
- [ ] Click metric card navigates to relevant detail page
- [ ] Average wait time displayed for pending verifications

**AC-HOME-002: Urgent Action Cards**
- [ ] SLA breach alert shown if any verifications >48h pending (red banner)
- [ ] Safeguarding escalation card shown for urgent safety reports (red banner)
- [ ] Dispute resolution card shown for pending disputes (yellow banner)
- [ ] No-show investigation card shown for new no-show reports (yellow banner)
- [ ] Cards only shown if items exist (dynamic display)

**AC-HOME-003: Recent Activity Feed**
- [ ] Last 20 platform events displayed in chronological order
- [ ] Events include: verifications approved/rejected, bookings completed, disputes resolved, users suspended
- [ ] Admin name shown for admin actions
- [ ] Activity filters work correctly (all, my actions, verifications, bookings, safeguarding)

---

### 14.2 User Management

**AC-USER-001: User Search**
- [ ] Search bar accepts: name, email, phone, postcode, user ID
- [ ] Search results display within 2 seconds
- [ ] Results show: user type, status, registration date, verification badges
- [ ] Click result opens user detail page
- [ ] "No results found" message if no matches

**AC-USER-002: User Detail View**
- [ ] User profile displays all key information: personal details, platform activity, verification status
- [ ] Tabs work correctly: Overview, Verification Details, Booking History, Messages, Reports, Admin Notes, Audit Log
- [ ] Admin can edit user profile (name, email, phone) with changes logged
- [ ] Admin can view verification documents (ID images, DBS certificate) with access logged

**AC-USER-003: Suspend User**
- [ ] "Suspend Account" button opens modal with duration options (7, 14, 30 days, custom)
- [ ] Suspension reason required (dropdown + optional details)
- [ ] Impact summary shown before confirmation (active bookings cancelled, refunds processed)
- [ ] Confirmation triggers immediate account lockout
- [ ] Email notification sent to user explaining suspension
- [ ] Suspension recorded in user profile and audit log

**AC-USER-004: Ban User Permanently**
- [ ] "Ban Permanently" button requires confirmation (type "BAN USER #[ID]")
- [ ] Ban reason required with detailed justification (min 100 chars)
- [ ] Option to escalate to external authorities (police, safeguarding board)
- [ ] Ban triggers immediate lockout, booking cancellations, refunds
- [ ] Email notification sent with appeal instructions
- [ ] Ban recorded in user profile, audit log, and ban evasion detection system

---

### 14.3 Verification Queue

**AC-VER-001: Verification Queue Display**
- [ ] Queue shows all pending caregivers sorted by registration date (oldest first)
- [ ] SLA status indicators: green (<24h), yellow (24-36h), orange (36-48h), red (>48h)
- [ ] Queue displays: caregiver name, registration date, hours pending, verification status
- [ ] Filters work: SLA breaches only, approaching SLA, with DBS, non-UK nationals, assigned to me
- [ ] Bulk actions functional: assign to me, assign to specific admin, flag for senior review

**AC-VER-002: Identity Verification Review**
- [ ] Document viewer displays ID images and selfie in high resolution
- [ ] Zoom controls work ([+] [-] [Reset])
- [ ] Side-by-side comparison view available for ID photo vs selfie
- [ ] Stripe Identity automated result displayed if available
- [ ] Admin checklist guides review (ID clear, not expired, name matches, selfie matches, genuine)
- [ ] Approve button creates "Identity Verified" badge and makes profile searchable
- [ ] Reject button requires reason selection and sends email to caregiver

**AC-VER-003: Right to Work Verification**
- [ ] UK passport holders auto-approved (no UKVI check needed)
- [ ] Non-UK nationals display UKVI share code field
- [ ] Link to UKVI online service opens in new tab
- [ ] Admin records visa type, expiry date, work restrictions
- [ ] Visa expiry triggers automated reminder schedule (60d, 30d, 7d before)
- [ ] Profile auto-deactivates if visa expires without renewal

**AC-VER-004: DBS Verification (Voluntary)**
- [ ] DBS queue separate from identity queue
- [ ] Certificate image displayed in viewer
- [ ] Admin checklist guides review (number present, not expired, name matches, DOB matches, level identified)
- [ ] Certificate level recorded (Basic, Standard, Enhanced)
- [ ] DBS Update Service check link functional
- [ ] Approve adds "DBS Verified" badge
- [ ] Reject sends email with reason

**AC-VER-005: Approval/Rejection Workflow**
- [ ] Approval triggers: badge creation, profile goes live, email sent, calendar becomes available
- [ ] Rejection triggers: email sent with reason, profile stays hidden, resubmission allowed
- [ ] Request resubmission option available (softer than rejection)
- [ ] All decisions logged in audit trail with admin name, timestamp, reason
- [ ] Average verification time tracked and displayed on dashboard

---

### 14.4 Booking Oversight

**AC-BOOK-001: Booking List View**
- [ ] All platform bookings displayed with filters (status, date range, disputed only, high-value only)
- [ ] Search works (booking ID, user name, postcode)
- [ ] Bookings display: ID, date/time, care receiver, caregiver, status, amount
- [ ] Click booking opens detail view
- [ ] Export to CSV functional

**AC-BOOK-002: Booking Detail View**
- [ ] Booking detail page shows all information: booking details, service details, care receiver info, caregiver info, financial breakdown, payment status
- [ ] Timeline tab shows chronological events (requested, accepted, started, completed, confirmed, payment released)
- [ ] Messages tab displays message thread between parties
- [ ] Admin can click through to user profiles from booking detail

**AC-BOOK-003: Dispute Resolution**
- [ ] Disputed bookings appear in dedicated queue with age indicator
- [ ] Dispute view shows: care receiver claim, caregiver response, evidence uploads, message thread context
- [ ] Admin can review user histories for pattern analysis
- [ ] Decision interface offers: full refund, partial refund (25%, 50%, 75%, custom %), no refund
- [ ] Rationale field required (min 50 chars)
- [ ] Decision triggers automatic refund processing and notifications to both parties
- [ ] Decision logged in audit trail with reasoning

**AC-BOOK-004: No-Show Investigation**
- [ ] No-show reports flagged as urgent in queue
- [ ] Investigation view shows: evidence (timestamps, GPS, contact attempts), user histories, booking details
- [ ] Admin can contact both parties from investigation interface
- [ ] Decision options: confirm no-show (suspend/ban reporter), dismiss report (warn reporter), needs more evidence
- [ ] Confirmed caregiver no-show: full refund + suspension/ban
- [ ] Confirmed care receiver no-show: full payment to caregiver + warning
- [ ] Investigation logged in safeguarding system

---

### 14.5 Content Moderation

**AC-MOD-001: Flagged Messages**
- [ ] Flagged message queue displays priority levels (urgent, high, medium, low)
- [ ] Urgent flags (safeguarding keywords) highlighted in red
- [ ] High flags (off-platform payment) highlighted in yellow
- [ ] Click flagged message opens full thread for context
- [ ] Flag reason and detected keywords displayed
- [ ] Admin decision options: dismiss flag, warn user, suspend user, escalate to safeguarding
- [ ] Decision triggers appropriate action (warning email, suspension, safeguarding incident creation)

**AC-MOD-002: Flagged Profiles**
- [ ] Flagged profile queue shows: caregiver name, flag reason, flagged date
- [ ] Profile hidden automatically while flagged
- [ ] Admin can view profile and flag reason
- [ ] Decision options: approve (dismiss flag), request changes (send email with guidance), suspend profile
- [ ] Request changes hides profile until caregiver resubmits and re-approved
- [ ] Decision logged in audit trail

---

### 14.6 Safeguarding

**AC-SAFE-001: Incident Dashboard**
- [ ] Urgent incidents displayed prominently with red banners
- [ ] Incident counts displayed: urgent, by category, by status
- [ ] Click incident opens detail view
- [ ] Recent incidents summary (last 30 days)

**AC-SAFE-002: Incident Response**
- [ ] Incident detail shows: reporter, reported user, description, evidence, booking context, user histories
- [ ] Investigation log tracks admin actions with timestamps
- [ ] Quick actions available: contact care receiver, contact caregiver, contact emergency contact, call 999, escalate
- [ ] Decision options: confirm incident (suspend/ban), dismiss report, needs more investigation
- [ ] External escalation form captures: authority contacted, reference number, date
- [ ] Incident resolution triggers notifications, account actions, and logging

**AC-SAFE-003: Emergency Contacts**
- [ ] Emergency contact list accessible from all safeguarding pages
- [ ] Key contacts displayed: 999, police, safeguarding boards, legal counsel, internal escalation
- [ ] Print reference card functional

---

### 14.7 Reporting & Analytics

**AC-REPORT-001: Platform Metrics**
- [ ] Analytics dashboard displays key metrics: users, bookings, revenue, refunds
- [ ] Date range filter works (last 7/30/90 days, custom range)
- [ ] Comparison to previous period shown (% change)
- [ ] Graphs/charts display trends over time

**AC-REPORT-002: Verification Metrics**
- [ ] Verification analytics show: total applications, approval rate, average review time, SLA compliance
- [ ] Rejection reasons breakdown displayed
- [ ] Voluntary DBS uptake rate tracked
- [ ] Export to CSV functional

**AC-REPORT-003: Booking Analytics**
- [ ] Booking funnel displayed: requests → accepted → started → completed → reviewed
- [ ] Conversion rates calculated at each stage
- [ ] Cancellation and dispute rates tracked
- [ ] Average booking value and session duration displayed

**AC-REPORT-004: Safeguarding Analytics**
- [ ] Total reports tracked by category and severity
- [ ] Response times displayed (urgent <2h, others <24h)
- [ ] Actions taken breakdown (warnings, suspensions, bans)
- [ ] External escalations tracked

---

### 14.8 Audit Logging

**AC-AUDIT-001: Audit Log Viewer**
- [ ] Audit log displays last 500 events by default
- [ ] Filters work: date range, admin user, action type, entity type
- [ ] Log displays: timestamp, admin user, action, entity, details
- [ ] All admin actions logged: user management, verifications, bookings, content moderation, safeguarding, system actions
- [ ] System actions logged: automated triggers, scheduled jobs

**AC-AUDIT-002: Audit Log Export**
- [ ] Export functionality available
- [ ] Date range selectable
- [ ] Filters applicable to export
- [ ] Format options: CSV (recommended), PDF (max 1000 events)
- [ ] Sensitive data export requires Super Admin authorization and purpose documentation
- [ ] Export completion notification sent to admin email

---

### 14.9 Security & Access Control

**AC-SEC-001: Admin Login**
- [ ] Admin login requires email + password
- [ ] 2FA mandatory for Super Admin, Safeguarding Officer, Operations Manager
- [ ] TOTP authenticator app integration functional
- [ ] Backup codes generated on 2FA setup (10 codes)
- [ ] Failed login lockout after 10 attempts (15-minute lockout)

**AC-SEC-002: Role-Based Permissions**
- [ ] Permissions enforced per role (Super Admin, Safeguarding Officer, Operations Manager, Customer Support)
- [ ] Unauthorized actions blocked with error message
- [ ] Permission checks applied at API level (not just UI hiding)
- [ ] Admin can only perform actions allowed by their role

**AC-SEC-003: Session Management**
- [ ] Admin sessions expire after 30 days of inactivity
- [ ] Session invalidated on password change
- [ ] Concurrent sessions supported (multiple devices)
- [ ] "Logout" button ends session immediately

---

### 14.10 Performance & UX

**AC-PERF-001: Page Load Times**
- [ ] Dashboard home loads within 2 seconds
- [ ] User search results display within 2 seconds
- [ ] Verification queue loads within 3 seconds
- [ ] Booking list loads within 3 seconds

**AC-PERF-002: Real-Time Updates**
- [ ] Dashboard metrics update every 30 seconds (or real-time via WebSocket)
- [ ] New urgent reports trigger immediate notification
- [ ] No manual refresh required for queue updates

**AC-UX-001: Responsive Design**
- [ ] Admin dashboard usable on desktop (primary), tablet, and mobile (secondary)
- [ ] Critical functions accessible on mobile for on-call admins

**AC-UX-002: Error Handling**
- [ ] Clear error messages displayed for failures (e.g., "Failed to suspend user: [reason]")
- [ ] Timeout errors handled gracefully with retry option
- [ ] User-friendly messages (no technical jargon exposed to admins)

---

## 15. Out of Scope (Tier 1)

### 15.1 Features Deferred to Tier 2

**Qualification Verification Workflows**:
- Verification of Care Certificate, NVQ Level 2/3, nursing qualifications
- Training certificate upload and review
- Expiry tracking for time-limited qualifications
- Skill-specific verification (hoisting, catheter care, etc.)

**Insurance Verification**:
- Public liability insurance certificate review
- Insurance expiry tracking and renewal reminders
- Platform group insurance scheme management

**Reference Checks**:
- Professional reference contact and verification
- Employment history verification
- Gap analysis in employment timeline

**Mandatory DBS Integration**:
- DBS umbrella body API integration
- Platform-initiated DBS applications
- Automated DBS status checks

---

### 15.2 Features Deferred to Tier 3

**Medical Condition Management**:
- Care receiver medical condition profile management
- Caregiver medical condition experience verification
- Risk assessment review workflows
- Care complexity scoring and oversight

**Clinical Safety Monitoring**:
- Medication assistance logging review
- Falls and injury report management
- Behavioral change monitoring dashboards
- Clinical incident audit trails

**Live-In Care Administration**:
- Live-in care booking approval workflows
- DoLS (Deprivation of Liberty Safeguards) guidance administration
- Enhanced safeguarding for extended care arrangements

---

### 15.3 Features Deferred to Tier 4

**Care Coordination**:
- Care plan document management
- Multi-caregiver team coordination oversight
- Care notes and handover review
- Outcome tracking and reporting

**B2B/Commissioner Tools**:
- NHS/Local Authority liaison dashboards
- Commissioning reports and analytics
- Bulk booking management for agencies
- Referral pathway administration

---

### 15.4 Advanced Features (Post-Launch Optimizations)

**AI/ML-Powered Tools**:
- Automated fake ID detection
- Predictive safeguarding risk scoring
- Intelligent dispute outcome suggestions
- Fraud detection patterns

**Advanced Analytics**:
- Cohort analysis and retention tracking
- Predictive booking demand forecasting
- Caregiver churn prediction
- Market segmentation analysis

**Workflow Automation**:
- Automated verification for trusted providers
- Smart queue prioritization based on urgency + capacity
- Automated response drafts for common scenarios
- Intelligent escalation routing

**Multi-Admin Collaboration**:
- Case assignment and reassignment
- Internal admin messaging
- Collaborative investigation notes
- Workload balancing across admin team

---

## Appendix A: Admin Dashboard Wireframes

(Note: Wireframes would be created in design tool like Figma, linked here)

**Key Screens**:
1. Dashboard Home (overview metrics + urgent actions)
2. Verification Queue (pending caregivers list)
3. Verification Review Interface (document viewer + checklist)
4. User Detail View (tabbed interface)
5. Booking Detail View (booking information + timeline)
6. Dispute Resolution Interface (evidence review + decision)
7. Safeguarding Incident Dashboard (urgent incidents + response)
8. Analytics Dashboard (metrics + graphs)

---

## Appendix B: Admin Training Materials

**Admin Onboarding Checklist**:
- [ ] Platform mission and values training
- [ ] Safeguarding adults training (Care Act 2014)
- [ ] Identity verification best practices (spotting fake IDs)
- [ ] DBS check overview (types, Update Service, validity)
- [ ] Right to work verification (UKVI portal walkthrough)
- [ ] Dispute resolution principles (fairness, evidence-based)
- [ ] Content moderation guidelines (safeguarding keywords)
- [ ] Emergency response procedures (999 escalation, SAB contact)
- [ ] GDPR and data protection compliance
- [ ] Audit logging and documentation standards
- [ ] 2FA setup and security protocols

**Ongoing Training**:
- Monthly safeguarding case reviews (lessons learned)
- Quarterly verification quality audits (consistency checks)
- Annual refresher training (Care Act 2014, GDPR updates)

---

## Appendix C: SLA Definitions

| Process | SLA Target | Measurement | Escalation |
|---------|-----------|-------------|------------|
| **Caregiver Identity Verification** | 48 hours | From document upload to approval/rejection | >48h: Escalate to Operations Manager lead |
| **DBS Verification (Voluntary)** | 48 hours | From certificate upload to approval/rejection | >48h: Reminder to assigned admin |
| **Dispute Resolution** | 7 days | From dispute raised to admin decision | >5 days: Reminder, >7 days: Escalate to senior admin |
| **No-Show Investigation** | 24 hours | From report to resolution | >12h: Reminder, >24h: Escalate to Safeguarding Officer |
| **Urgent Safeguarding Response** | 2 hours | From report to first response | >1h: SMS alert to on-call officer, >2h: Escalate to Super Admin |
| **Standard Safeguarding Response** | 24 hours | From report to first response | >12h: Reminder, >24h: Escalate to Safeguarding Officer |
| **Flagged Content Review** | 48 hours | From flag to moderation decision | >48h: Reassign to available admin |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-06 | Product Manager | Initial Tier 1 Admin Dashboard specification created |

---

**END OF DOCUMENT**
