# Caregiver Verification Queue Wireframe (SCR-ADM-007)

**Document Purpose**: Complete wireframe specification and element inventory for the Admin Caregiver Verification Queue, enabling admins to review and process pending caregiver identity, right to work, and DBS verifications.

**Screen ID**: SCR-ADM-007
**Screen Name**: Caregiver Verification Queue
**Route**: `/admin/verifications`
**User Roles**: Admin (Operations Manager, Verification Officer)
**R0/R1**: R0 (safeguarding-critical verification workflow)

**Document Owner**: UX/UI Design Team
**Created**: 2026-02-11
**Status**: READY FOR FIGMA HANDOFF

---

## Table of Contents

1. [Screen Purpose](#1-screen-purpose)
2. [Entry Points and Navigation](#2-entry-points-and-navigation)
3. [Content Blocks and Hierarchy](#3-content-blocks-and-hierarchy)
4. [Complete Element Inventory](#4-complete-element-inventory)
5. [ASCII Wireframes](#5-ascii-wireframes)
6. [State Coverage](#6-state-coverage)
7. [Responsive Design Notes](#7-responsive-design-notes)
8. [Accessibility Requirements](#8-accessibility-requirements)
9. [Component Reuse](#9-component-reuse)
10. [Design Notes for Figma](#10-design-notes-for-figma)

---

## 1. Screen Purpose

### 1.1 Primary Purpose

The Caregiver Verification Queue provides admins with a prioritized workflow to:
- Review pending caregiver verifications (identity documents, right to work checks, DBS certificates)
- Triage verification submissions by age and SLA status (urgent >48h breaches highlighted)
- View uploaded verification documents with zoom/download capability
- Approve or reject verifications with required rationale
- Track verification processing metrics and SLA performance
- Ensure safeguarding compliance before caregivers can accept bookings

### 1.2 Key User Tasks

**Primary Tasks**:
1. View verification queue sorted by submission date (oldest first)
2. Identify SLA breaches (verifications pending >48 hours) flagged in red
3. Select next verification to review (oldest or SLA breach priority)
4. View caregiver profile summary + submitted documents
5. Approve verification (identity/right to work/DBS confirmed valid)
6. Reject verification with reason (document expired, unclear photo, etc.) and allow resubmission
7. Navigate to detailed document review screens (SCR-ADM-005 for caregiver application, SCR-ADM-008 for DBS review)

**Context of Use**:
- Operations Manager performs daily verification processing (target: <48h SLA)
- Verification Officer triages urgent items (SLA breaches flagged by dashboard alerts)
- Admin identifies patterns (e.g., common rejection reasons for caregiver education)

### 1.3 Relationship to Other Admin Screens

**Within Admin Section**:
- **SCR-ADM-001** (Admin Dashboard): Links to this screen via "Review Queue" button in Verification Queue widget
- **SCR-ADM-005** (Caregiver Application Review): Detailed caregiver profile + full application documents (linked from queue items)
- **SCR-ADM-008** (DBS Review): Detailed DBS certificate review (linked from queue items if DBS submitted)
- **SCR-CG-008** (Identity Verification, caregiver-facing): Submission screen for identity documents
- **SCR-CG-009** (Right to Work Verification, caregiver-facing): Submission screen for right to work documents
- **SCR-CG-010** (DBS Check Submission, caregiver-facing): Submission screen for DBS certificates

**Navigation Pattern**: Admin Dashboard → Verification Queue → Individual Verification Detail (SCR-ADM-005 or SCR-ADM-008)

---

## 2. Entry Points and Navigation

### 2.1 Entry Points

**How admins arrive at this screen**:
- From Admin Dashboard (SCR-ADM-001): Click "Review Queue" button in Verification Queue widget
- From Admin Navigation: Click "Verifications" in global admin sidebar
- From email/SMS alert: Urgent SLA breach notification links to this screen with SLA filter applied
- From Caregiver Onboarding (SCR-CG-002): Admin clicks "View Pending Verifications" link
- Direct URL navigation: `/admin/verifications`

**Preconditions**:
- User authenticated as Admin role
- 2FA enabled (mandatory for admin accounts)
- Admin has "verification_review" permission (role-based access)

### 2.2 Navigation Exits

**From This Screen**:

| Element | Destination | Screen ID |
|---------|------------|-----------|
| Caregiver name link (queue item) | Caregiver Application Review | SCR-ADM-005 |
| "Review ID" button | Identity Verification Detail | SCR-ADM-005 (verification tab) |
| "Review Right to Work" button | Right to Work Verification Detail | SCR-ADM-005 (verification tab) |
| "Review DBS" button | DBS Review Detail | SCR-ADM-008 |
| Admin Dashboard link (breadcrumb) | Admin Dashboard | SCR-ADM-001 |
| User Management link (sidebar) | User Management | SCR-ADM-005 |
| Safeguarding Reports link (sidebar) | Safeguarding Reports Queue | SCR-ADM-014 |
| Logout (user menu) | Login | SCR-AUTH-005 |

**Global Admin Navigation** (sidebar):
- Dashboard (SCR-ADM-001)
- Users (SCR-ADM-005)
- Verifications (this screen)
- Safeguarding (SCR-ADM-014)
- Bookings (future)
- Analytics (future)
- Audit Log (future)

---

## 3. Content Blocks and Hierarchy

### 3.1 Page Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ TOP: Admin Navigation Header                                    │
├─────────────────────────────────────────────────────────────────┤
│ BREADCRUMB: Dashboard > Verifications                           │
├─────────────────────────────────────────────────────────────────┤
│ PAGE TITLE: Caregiver Verification Queue                        │
│ SUBTITLE: Review and process pending verifications              │
├─────────────────────────────────────────────────────────────────┤
│ SLA ALERT BANNER (conditional - only if SLA breaches exist)     │
│ - "3 verifications over 48h SLA require urgent review"          │
├─────────────────────────────────────────────────────────────────┤
│ FILTER BAR                                                       │
│ - Verification type filter, SLA status filter, Sort by dropdown │
├─────────────────────────────────────────────────────────────────┤
│ SUMMARY METRICS (4 cards)                                       │
│ - Pending Verifications, Identity, Right to Work, DBS           │
├─────────────────────────────────────────────────────────────────┤
│ VERIFICATION QUEUE (main content - card list)                   │
│ - Caregiver cards with verification checklist + SLA indicator   │
│ - Actions: Review ID, Review RTW, Review DBS, View Profile      │
├─────────────────────────────────────────────────────────────────┤
│ FOOTER: Standard global footer                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Content Block Breakdown

**Block 1: Admin Navigation Header** (shared component)
- **Purpose**: Global admin navigation
- **Priority**: PRIMARY (always visible)
- **Component Reference**: `NAV-HEADER-AUTH` with `role: "admin"`

**Block 2: Breadcrumb Navigation**
- **Purpose**: Show navigation path, allow quick return to Dashboard
- **Priority**: SECONDARY (context)
- **Elements**: "Dashboard" link > "Verifications" (current page)

**Block 3: Page Title & Subtitle**
- **Purpose**: Clearly identify screen purpose
- **Priority**: PRIMARY
- **Elements**:
  - H1: "Caregiver Verification Queue"
  - Subtitle: "Review and process pending verifications"
  - SLA status: "3 over 48h SLA" (red text, if applicable)

**Block 4: SLA Alert Banner** (conditional)
- **Purpose**: Urgent alert for SLA breaches (>48h pending)
- **Priority**: PRIMARY (highest urgency)
- **Condition**: Only shown if ≥1 verification >48h pending
- **Elements**:
  - Icon: Clock (red)
  - Title: "SLA BREACH ALERT"
  - Description: "3 verifications over 48 hours require urgent review"
  - CTA: "Review Oldest First" (filters queue to oldest items)
  - Dismiss: X button (closes banner, can reopen from dashboard)

**Block 5: Filter Bar**
- **Purpose**: Filter and sort verification queue
- **Priority**: PRIMARY (workflow efficiency)
- **Elements**:
  - Verification type filter: All, Identity, Right to Work, DBS
  - SLA status filter: All, On Track, Approaching SLA (24-48h), Breached (>48h)
  - Sort by: Oldest First (default), Newest First, SLA Breach First
  - Clear Filters button

**Block 6: Summary Metrics**
- **Purpose**: At-a-glance verification queue statistics
- **Priority**: SECONDARY (context)
- **Elements**: 4 metric cards in horizontal row
  - Total Pending: Count of all pending verifications
  - Identity: Count of pending identity verifications
  - Right to Work: Count of pending right to work verifications
  - DBS: Count of pending DBS verifications (voluntary at T1)

**Block 7: Verification Queue (Card List)**
- **Purpose**: Display all pending verifications as caregiver cards with verification checklist
- **Priority**: PRIMARY (core content)
- **Elements**:
  - Caregiver verification cards (stacked vertically)
  - Each card: Avatar, name, submission date, SLA indicator, verification checklist, action buttons
  - Pagination controls (if >20 items)

**Block 8: Footer**
- **Purpose**: Legal links and support contact
- **Priority**: TERTIARY
- **Elements**: About | Privacy | Terms | Support | Version

---

## 4. Complete Element Inventory

### 4.1 Block 1: Admin Navigation Header

**Component Reference**: See Admin Dashboard (SCR-ADM-001) and User Management (SCR-ADM-005) for full specification.

---

### 4.2 Block 2: Breadcrumb Navigation

**Elements**:
- **Link 1**: "Dashboard" (link to /admin)
- **Separator**: ">" or "/"
- **Current Page**: "Verifications" (plain text, not a link)

**Accessibility**: Same as User Management screen (SCR-ADM-005)

---

### 4.3 Block 3: Page Title & Subtitle

**Elements**:
- **H1 Title**: "Caregiver Verification Queue"
  - Typography: 32px bold
  - Color: `$txt` (#0F172A)
- **Subtitle**: "Review and process pending verifications"
  - Typography: 16px regular
  - Color: `$txt-muted` (rgba(15,23,42,0.72))
- **SLA Status** (conditional, if breaches exist):
  - Text: "3 over 48h SLA"
  - Typography: 14px bold
  - Color: #DC2626 (red)
  - Icon: Clock icon (red)

**Spacing**:
- Title: 24px margin-bottom
- Subtitle: 16px margin-bottom (before alert banner or filter bar)

---

### 4.4 Block 4: SLA Alert Banner (Conditional)

**Condition**: Only displayed if ≥1 verification pending >48 hours

**Elements**:
- **Background**: Yellow (#FEF3C7, light yellow)
- **Border**: Left border 4px, orange (#F59E0B)
- **Icon**: Clock icon (orange/red, 32px)
- **Title**: "SLA BREACH ALERT"
  - Typography: 18px bold
  - Color: #DC2626 (red)
- **Description**: "3 verifications over 48 hours require urgent review"
  - Typography: 16px regular
  - Color: #0F172A
- **CTA Button**: "Review Oldest First"
  - Style: Primary button (orange background #F59E0B)
  - Action: Sorts queue by oldest first, filters to SLA breached items
- **Dismiss Button**: X icon (top-right)
  - Action: Closes banner (user can dismiss if already aware)

**Accessibility**:
- `<div role="alert" aria-live="assertive">`
- Screen reader announces immediately: "SLA breach alert. 3 verifications over 48 hours require urgent review."

**Design Tokens**:
- Background: #FEF3C7
- Border-left: 4px solid #F59E0B
- Padding: 16px 24px
- Border-radius: 8px
- Button height: 48px

---

### 4.5 Block 5: Filter Bar

**Layout**: Horizontal row, wraps on smaller screens

**Elements**:

**1. Verification Type Filter Dropdown**:
- Label: "Verification Type"
- Options:
  - All (default)
  - Identity
  - Right to Work
  - DBS (Voluntary)
- Width: 200px
- Icon: Document icon (left side), chevron down (right side)

**2. SLA Status Filter Dropdown**:
- Label: "SLA Status"
- Options:
  - All (default)
  - On Track (<24h pending)
  - Approaching SLA (24-48h pending)
  - Breached (>48h pending)
- Width: 200px
- Icon: Clock icon (left side), chevron down (right side)

**3. Sort By Dropdown**:
- Label: "Sort By"
- Options:
  - Oldest First (default - earliest submission date)
  - Newest First (most recent submission)
  - SLA Breach First (>48h at top)
- Width: 200px

**4. Clear Filters Button**:
- Label: "Clear Filters"
- Style: Secondary button
- Action: Resets all filters to default (All, All, Oldest First)
- Disabled state: If no filters applied

**Filter Behavior**:
- Filters apply immediately on dropdown change
- Active filters displayed as removable tags above queue: "[X] SLA Status: Breached"
- Queue updates in real-time (no Apply button needed)

**Accessibility**:
- All dropdowns have visible labels
- Keyboard accessible (Tab, Enter, Arrow keys)
- Screen reader announces filter changes: "Filtering by SLA Status: Breached. 3 verifications found."

**Design Tokens**:
- Dropdown height: 48px
- Dropdown background: #ffffff
- Dropdown border: 1px solid #D1D5DB
- Dropdown border-radius: 8px
- Dropdown padding: 12px 16px

---

### 4.6 Block 6: Summary Metrics

**Layout**: 4 cards in horizontal row (2x2 grid on tablet, stacked on mobile)

**Metric Card Structure** (reusable component from Admin Dashboard):

**Card 1: Total Pending Verifications**:
- Icon: Clipboard checklist icon (blue)
- Label: "Pending Verifications"
- Value: "12 caregivers" (dynamic count)
- Subtext: "Average wait: 18 hours"
- SLA indicator: "3 over 48h SLA" (red text, if applicable)

**Card 2: Identity Verifications**:
- Icon: ID card icon (blue)
- Label: "Identity"
- Value: "8 pending" (dynamic count)
- Subtext: "Passport, driver's license, or national ID"

**Card 3: Right to Work Verifications**:
- Icon: Document icon (green)
- Label: "Right to Work"
- Value: "4 pending" (dynamic count)
- Subtext: "UK passport, share code, or settled status"

**Card 4: DBS Verifications**:
- Icon: Shield checkmark icon (purple)
- Label: "DBS (Voluntary)"
- Value: "3 pending" (dynamic count)
- Subtext: "Optional at Tier 1, trust signal"

**Data Sources**:
- API endpoint: `GET /api/admin/verifications/summary`
- Response includes: total_pending, identity_pending, rtw_pending, dbs_pending, sla_breaches, average_wait_hours

**Accessibility**:
- Each card is `<article>` with heading
- Metrics use `<dl>` structure (definition list)

**Design Tokens**: Same as Admin Dashboard (SCR-ADM-001) metric cards

---

### 4.7 Block 7: Verification Queue (Caregiver Cards)

**Layout**: Vertical stack of caregiver verification cards, 20 per page (paginated if >20)

**Caregiver Verification Card Structure**:

```
+-------------------------------------------------------------------------+
| [Avatar] John Smith                                    [SLA: Breached] |
|          Applied: 3 days ago (15/01/2026)              ⚠️ 72h pending   |
|                                                                         |
| Verification Checklist:                                                 |
| ☑️ Identity: Submitted (15/01/26)          [Review ID]                 |
| ☑️ Right to Work: Submitted (15/01/26)     [Review Right to Work]      |
| ☐ DBS: Not submitted (voluntary)                                       |
|                                                                         |
| [View Full Profile]                                                     |
+-------------------------------------------------------------------------+
```

**Card Elements**:

**1. Header Section**:
- **Avatar**: Caregiver photo or initials (64px circular)
- **Name**: "John Smith" (20px bold, link to SCR-ADM-005)
- **Submission Date**: "Applied: 3 days ago (15/01/2026)"
  - Typography: 14px regular, gray
- **SLA Indicator** (right side):
  - Badge: "On Track" (green), "Approaching SLA" (yellow), "Breached" (red)
  - Subtext: "72h pending" (if breached), "18h pending" (if on track)

**2. Verification Checklist** (middle section):

List of 3 verification types with status indicators:

**Identity Verification**:
- Icon: ☑️ (checkmark, if submitted) or ☐ (empty checkbox, if not submitted)
- Label: "Identity"
- Status: "Submitted (15/01/26)" or "Not submitted"
- Action Button: "Review ID" (primary button, small)
  - Action: Opens SCR-ADM-005 (Caregiver Application Review) with Identity tab active
  - Disabled state: If not submitted (grayed out)

**Right to Work Verification**:
- Icon: ☑️ or ☐
- Label: "Right to Work"
- Status: "Submitted (15/01/26)" or "Not submitted"
- Action Button: "Review Right to Work" (primary button, small)
  - Action: Opens SCR-ADM-005 with Right to Work tab active
  - Disabled state: If not submitted

**DBS Verification** (voluntary):
- Icon: ☑️ or ☐
- Label: "DBS (Voluntary)"
- Status: "Submitted (16/01/26)" or "Not submitted (voluntary)"
- Action Button: "Review DBS" (primary button, small)
  - Action: Opens SCR-ADM-008 (DBS Review Detail)
  - Disabled state: If not submitted
  - Tooltip: "DBS is optional at Tier 1 but provides trust signal"

**3. Footer Section**:
- **View Full Profile Button**: Secondary button (link style)
  - Action: Opens SCR-ADM-005 (Caregiver Application Review)
  - Shows full caregiver profile, all verifications, booking history, messages, safeguarding history

**Card States**:

**Default State**:
- White background, gray border
- SLA indicator: Green "On Track" badge
- Action buttons enabled for submitted verifications

**SLA Breach State** (>48h pending):
- Light red border (#FEE2E2 background, #DC2626 border)
- SLA indicator: Red "Breached" badge
- Icon: ⚠️ warning triangle next to SLA text
- Card appears at top of queue (if sorted by SLA breach)

**Approaching SLA State** (24-48h pending):
- Light yellow border (#FEF3C7 background, #F59E0B border)
- SLA indicator: Yellow "Approaching SLA" badge
- Icon: Clock icon next to SLA text

**All Verifications Complete State**:
- This card would not appear in queue (queue only shows pending)
- Once all verifications approved, caregiver removed from queue

**Pagination**:
- 20 cards per page (default)
- Pagination controls at bottom:
  - "Previous" button (disabled on page 1)
  - Page numbers: "1 2 3" (show 5 pages max)
  - "Next" button (disabled on last page)
- Results count: "Showing 1-12 of 12 caregivers"

**Empty State** (no pending verifications):
- Icon: Checkmark circle (green, large 64px)
- Heading: "All Clear!"
- Message: "No pending verifications. All caregivers have been reviewed."
- Subtext: "Last verification reviewed: 2 hours ago by Admin Sarah"
- No CTA (nothing to do)

**Loading State**:
- Skeleton cards (gray animated placeholders for 3 cards)
- No interactive elements while loading

**Error State**:
- Red error message above queue: "Unable to load verification queue. [Retry]"
- Retry button attempts to reload data

**Accessibility**:
- Each card is `<article>` with heading (caregiver name)
- Verification checklist uses `<ul>` list structure
- SLA indicator: `<span role="status" aria-label="SLA breached, 72 hours pending">Breached</span>`
- Action buttons: `<button aria-label="Review identity verification for John Smith">Review ID</button>`

**Design Tokens**:
- Card background: #ffffff
- Card border: 1px solid #E5E7EB (default), 2px solid #DC2626 (SLA breach)
- Card border-radius: 12px
- Card padding: 24px
- Card shadow: 0 1px 3px rgba(0,0,0,0.1)
- Avatar size: 64px
- Name font size: 20px bold
- Checklist font size: 14px regular
- Button height: 40px (small buttons for actions)
- Spacing between cards: 16px vertical gap

---

### 4.8 Block 8: Footer

**Component Reference**: Standard global footer (see dashboard shared components).

---

## 5. ASCII Wireframes

### 5.1 Desktop Layout (1440px+)

#### State 1: Default (Verifications Pending, SLA Breach Alert)

```
+---------------------------------------------------------------------------------+
|  [Logo]  iCare Admin            [Search: users, bookings...] [🔔 4] [👤 Sarah] |
+---------------------------------------------------------------------------------+
|  Dashboard > Verifications                                                      |
+---------------------------------------------------------------------------------+
|                                                                                 |
|  Caregiver Verification Queue                      3 over 48h SLA ⚠️           |
|  Review and process pending verifications                                      |
|                                                                                 |
|  +-----------------------------------------------------------------------------+|
|  | 🕐 SLA BREACH ALERT                                                  [X]   ||
|  | 3 verifications over 48 hours require urgent review                        ||
|  | [Review Oldest First]                                                      ||
|  +-----------------------------------------------------------------------------+|
|                                                                                 |
|  +-----------------------------------------------------------------------------+|
|  | [Type: All ▾] [SLA Status: All ▾] [Sort: Oldest First ▾] [Clear Filters] ||
|  +-----------------------------------------------------------------------------+|
|                                                                                 |
|  +-----------------+  +-----------------+  +-----------------+  +-------------+ |
|  | 📋 Pending      |  | 🆔 Identity     |  | 📄 Right to     |  | 🛡️ DBS      | |
|  | Verifications   |  | 8 pending       |  | Work            |  | (Voluntary) | |
|  | 12 caregivers   |  |                 |  | 4 pending       |  | 3 pending   | |
|  | Avg: 18h wait   |  |                 |  |                 |  |             | |
|  | ⚠️ 3 over 48h   |  |                 |  |                 |  |             | |
|  +-----------------+  +-----------------+  +-----------------+  +-------------+ |
|                                                                                 |
|  Showing 1-12 of 12 caregivers                                                 |
|                                                                                 |
|  +-----------------------------------------------------------------------------+|
|  | [JSD] John Smith                                    [SLA: Breached ⚠️]     ||
|  |       Applied: 3 days ago (15/01/2026)              72h pending            ||
|  |                                                                            ||
|  | Verification Checklist:                                                   ||
|  | ☑️ Identity: Submitted (15/01/26)          [Review ID]                    ||
|  | ☑️ Right to Work: Submitted (15/01/26)     [Review Right to Work]         ||
|  | ☐ DBS: Not submitted (voluntary)                                          ||
|  |                                                                            ||
|  | [View Full Profile]                                                       ||
|  +-----------------------------------------------------------------------------+|
|  (Card has light red background + red border indicating SLA breach)           |
|                                                                                 |
|  +-----------------------------------------------------------------------------+|
|  | [MK] Mary Kelly                                     [SLA: Breached ⚠️]     ||
|  |      Applied: 5 days ago (13/01/2026)               120h pending           ||
|  |                                                                            ||
|  | Verification Checklist:                                                   ||
|  | ☑️ Identity: Submitted (13/01/26)          [Review ID]                    ||
|  | ☑️ Right to Work: Submitted (13/01/26)     [Review Right to Work]         ||
|  | ☑️ DBS: Submitted (13/01/26)               [Review DBS]                   ||
|  |                                                                            ||
|  | [View Full Profile]                                                       ||
|  +-----------------------------------------------------------------------------+|
|  (Card has light red background + red border)                                  |
|                                                                                 |
|  +-----------------------------------------------------------------------------+|
|  | [AC] Anna Chen                                      [SLA: Approaching 🕐]  ||
|  |      Applied: 1 day ago (10/02/2026)                30h pending            ||
|  |                                                                            ||
|  | Verification Checklist:                                                   ||
|  | ☑️ Identity: Submitted (10/02/26)          [Review ID]                    ||
|  | ☑️ Right to Work: Submitted (10/02/26)     [Review Right to Work]         ||
|  | ☐ DBS: Not submitted (voluntary)                                          ||
|  |                                                                            ||
|  | [View Full Profile]                                                       ||
|  +-----------------------------------------------------------------------------+|
|  (Card has light yellow background + yellow border)                            |
|                                                                                 |
|  +-----------------------------------------------------------------------------+|
|  | [TB] Tom Brown                                      [SLA: On Track ✓]      ||
|  |      Applied: 8 hours ago (11/02/2026)              8h pending             ||
|  |                                                                            ||
|  | Verification Checklist:                                                   ||
|  | ☑️ Identity: Submitted (11/02/26)          [Review ID]                    ||
|  | ☑️ Right to Work: Submitted (11/02/26)     [Review Right to Work]         ||
|  | ☐ DBS: Not submitted (voluntary)                                          ||
|  |                                                                            ||
|  | [View Full Profile]                                                       ||
|  +-----------------------------------------------------------------------------+|
|  (Card has white background + gray border, no urgency)                         |
|                                                                                 |
|  ... (8 more cards)                                                            |
|                                                                                 |
|  Showing 1-12 of 12 caregivers                                                 |
|  [< Previous]  [1]  [Next >]  (pagination disabled, only 1 page)               |
|                                                                                 |
+---------------------------------------------------------------------------------+
|  Footer: About | Privacy | Terms | Support | Version 1.0.0                     |
+---------------------------------------------------------------------------------+
```

**Key Layout Features**:
- SLA alert banner at top (yellow/orange, dismissible)
- Filter bar with 3 dropdowns
- 4 summary metric cards in horizontal row
- Verification cards stacked vertically, color-coded by SLA status
- SLA breach cards (red) appear at top when sorted by SLA breach
- Pagination at bottom (simple, few items at launch)

---

#### State 2: Empty Queue (All Clear)

```
+---------------------------------------------------------------------------------+
|  [Logo]  iCare Admin            [Search: users, bookings...] [🔔 0] [👤 Sarah] |
+---------------------------------------------------------------------------------+
|  Dashboard > Verifications                                                      |
+---------------------------------------------------------------------------------+
|                                                                                 |
|  Caregiver Verification Queue                                                  |
|  Review and process pending verifications                                      |
|                                                                                 |
|  (No SLA alert banner - no breaches)                                           |
|                                                                                 |
|  +-----------------------------------------------------------------------------+|
|  | [Type: All ▾] [SLA Status: All ▾] [Sort: Oldest First ▾] [Clear Filters] ||
|  +-----------------------------------------------------------------------------+|
|                                                                                 |
|  +-----------------+  +-----------------+  +-----------------+  +-------------+ |
|  | 📋 Pending      |  | 🆔 Identity     |  | 📄 Right to     |  | 🛡️ DBS      | |
|  | Verifications   |  | 0 pending       |  | Work            |  | (Voluntary) | |
|  | 0 caregivers    |  |                 |  | 0 pending       |  | 0 pending   | |
|  | ✅ All clear    |  |                 |  |                 |  |             | |
|  +-----------------+  +-----------------+  +-----------------+  +-------------+ |
|                                                                                 |
|  +-----------------------------------------------------------------------------+|
|  |                                                                            ||
|  |                           ✅ (large green checkmark)                       ||
|  |                                                                            ||
|  |                        All Clear!                                         ||
|  |                                                                            ||
|  |           No pending verifications. All caregivers have been reviewed.    ||
|  |                                                                            ||
|  |           Last verification reviewed: 2 hours ago by Admin Sarah          ||
|  |                                                                            ||
|  +-----------------------------------------------------------------------------+|
|                                                                                 |
+---------------------------------------------------------------------------------+
```

**Empty State**:
- Large green checkmark icon (64px)
- Positive message: "All Clear!"
- Explanation: "No pending verifications"
- Context: Last review timestamp and admin name
- No CTA (nothing actionable)

---

### 5.2 Tablet Layout (768px - 1439px)

```
+---------------------------------------------------------------+
|  [Logo] iCare Admin    [🔍] [🔔 4] [👤]                      |
+---------------------------------------------------------------+
|  Dashboard > Verifications                                    |
+---------------------------------------------------------------+
|                                                               |
|  Caregiver Verification Queue          3 over 48h SLA ⚠️     |
|                                                               |
|  +-----------------------------------------------------------+|
|  | 🕐 SLA BREACH ALERT                               [X]    ||
|  | 3 verifications over 48h. [Review Oldest]                ||
|  +-----------------------------------------------------------+|
|                                                               |
|  [Type: All ▾] [SLA: All ▾] [Sort: Oldest ▾] [Clear]         |
|                                                               |
|  +-------------------------+  +------------------------------+|
|  | 📋 Pending: 12          |  | 🆔 Identity: 8               ||
|  | ⚠️ 3 over 48h           |  |                              ||
|  +-------------------------+  +------------------------------+|
|  +-------------------------+  +------------------------------+|
|  | 📄 Right to Work: 4     |  | 🛡️ DBS: 3                    ||
|  +-------------------------+  +------------------------------+|
|                                                               |
|  +-----------------------------------------------------------+|
|  | [JSD] John Smith                   [SLA: Breached ⚠️]     ||
|  | Applied: 3 days ago (15/01/26)     72h pending            ||
|  |                                                           ||
|  | ☑️ Identity: Submitted        [Review ID]                ||
|  | ☑️ Right to Work: Submitted   [Review RTW]               ||
|  | ☐ DBS: Not submitted                                     ||
|  | [View Full Profile]                                      ||
|  +-----------------------------------------------------------+|
|  (Red background card)                                       |
|                                                               |
|  +-----------------------------------------------------------+|
|  | [MK] Mary Kelly                    [SLA: Breached ⚠️]     ||
|  | Applied: 5 days ago                120h pending            ||
|  | (Checklist + buttons same as above)                      ||
|  +-----------------------------------------------------------+|
|                                                               |
|  ... (10 more cards)                                         |
|                                                               |
|  [< Previous]  [1]  [Next >]                                  |
+---------------------------------------------------------------+
```

**Tablet Changes**:
- Filter bar: Dropdowns stack (single column, full width each)
- Metrics: 2x2 grid
- Cards: Same layout as desktop (full-width cards)
- Action buttons: Same size, fit within card

---

### 5.3 Mobile Layout (320px - 767px)

```
+-----------------------------+
| [☰] iCare Admin   [🔔4][👤]|
+-----------------------------+
| Dashboard > Verifications   |
+-----------------------------+
|                            |
| Verification Queue         |
| 3 over 48h SLA ⚠️          |
|                            |
| 🕐 SLA BREACH        [X]   |
| 3 over 48h                 |
| [Review Oldest]            |
|                            |
| [Type: All ▾]              |
| [SLA: All ▾]               |
| [Sort: Oldest ▾]           |
|                            |
| Pending: 12                |
| ⚠️ 3 over 48h              |
|                            |
| Identity: 8                |
| Right to Work: 4           |
| DBS: 3                     |
|                            |
| +--------------------------+|
| | [JSD] John Smith         ||
| | SLA: Breached ⚠️         ||
| | 72h pending              ||
| |                          ||
| | ☑️ ID: Submitted         ||
| | [Review ID]              ||
| |                          ||
| | ☑️ RTW: Submitted        ||
| | [Review RTW]             ||
| |                          ||
| | ☐ DBS: Not submitted     ||
| |                          ||
| | [View Profile]           ||
| +--------------------------+|
| (Red background)           |
|                            |
| +--------------------------+|
| | [MK] Mary Kelly          ||
| | SLA: Breached ⚠️         ||
| | (Same layout)            ||
| +--------------------------+|
|                            |
| ... (10 more cards)        |
|                            |
| [< Prev] [1] [Next >]      |
+-----------------------------+
```

**Mobile Changes**:
- Hamburger menu for admin nav
- All elements stack vertically
- Alert banner: Condensed (1-2 lines)
- Filters: Full-width dropdowns
- Metrics: 4 rows (stacked), condensed text
- Cards: Simplified layout, action buttons full-width

---

## 6. State Coverage

### 6.1 All Required States

| State Name | Condition | Visual Changes | Components Affected |
|------------|----------|----------------|---------------------|
| **Default** | Verifications pending, sorted by oldest first | Queue shows all pending verifications as cards | All blocks |
| **SLA Breach Alert** | ≥1 verification >48h pending | Yellow/orange alert banner at top, SLA breach cards highlighted red | Alert banner, queue cards |
| **Filtered by Type** | Filter applied (Identity, RTW, DBS) | Active filter tag visible, queue shows only selected type | Filter bar, queue |
| **Filtered by SLA** | Filter applied (On Track, Approaching, Breached) | Active filter tag, queue shows only selected SLA status | Filter bar, queue |
| **Loading** | Initial page load | Skeleton cards (3 cards), metrics show loading spinners | Metrics, queue |
| **Empty (All Clear)** | No pending verifications | Green checkmark + "All Clear!" message, no cards | Queue area |
| **Empty (Filtered)** | Filter applied, no matches | "No verifications found matching filters" + Clear Filters button | Queue area |
| **Error** | API failure | Red error message above queue: "Unable to load verification queue. [Retry]" | Queue area |
| **Card Action Click** | Admin clicks "Review ID" or "Review RTW" or "Review DBS" | Navigates to detail screen (SCR-ADM-005 or SCR-ADM-008) | Navigation |

### 6.2 State Transition Diagram

```
┌─────────────┐
│   LOADING   │ (Initial page load)
└──────┬──────┘
       ↓
┌──────────────────┐
│    DEFAULT       │ (Verifications displayed)
└────┬─────────┬───┘
     │         │
     │         ↓
     │   ┌────────────────┐
     │   │ SLA BREACH     │ (Alert banner visible, red cards at top)
     │   └────────┬───────┘
     │            │
     │            ↓
     │   ┌────────────────┐
     ├──→│ FILTERED       │ (Type or SLA filter applied)
     │   └────────────────┘
     │
     │   ┌────────────────┐
     ├──→│ EMPTY (ALL     │ (No pending verifications)
     │   │ CLEAR)         │
     │   └────────────────┘
     │
     ↓
┌────────────────┐
│     ERROR      │ (API failure)
│ [Retry]        │
└────────────────┘
```

### 6.3 State-Specific Element Changes

**Default State**:
- All filters at default (All, All, Oldest First)
- No alert banner (if no SLA breaches)
- Queue shows all pending verifications
- Cards color-coded by SLA: Red (>48h), Yellow (24-48h), White (<24h)

**SLA Breach Alert State**:
- Alert banner visible at top (yellow background, orange border)
- Alert text: "3 verifications over 48 hours require urgent review"
- SLA breach cards (red background, red border) appear at top if sorted by SLA
- Page title shows SLA count: "3 over 48h SLA ⚠️"

**Filtered State**:
- Active filter tag above queue: "[X] Type: Identity" or "[X] SLA Status: Breached"
- Queue shows only matching verifications
- Results count updated: "Showing 1-3 of 3 caregivers"

**Loading State**:
- Metrics show loading spinners
- Queue shows 3 skeleton cards (gray animated placeholders)
- No interactive elements (buttons disabled)

**Empty (All Clear) State**:
- Queue area replaced with empty state:
  - Green checkmark icon (64px)
  - Heading: "All Clear!"
  - Message: "No pending verifications. All caregivers have been reviewed."
  - Subtext: "Last verification reviewed: 2 hours ago by Admin Sarah"
- Metrics show 0 values
- No pagination

**Error State**:
- Red error banner above queue: "Unable to load verification queue. [Retry]"
- Retry button attempts to reload data
- Other page elements remain visible

---

## 7. Responsive Design Notes

### 7.1 Breakpoint Strategy

Same as User Management screen (SCR-ADM-005):

| Breakpoint | Width | Layout |
|------------|-------|--------|
| **Desktop** | 1440px+ | Full-width cards, 4 metrics horizontal |
| **Tablet** | 768px - 1023px | Full-width cards, 2x2 metrics grid |
| **Mobile** | 320px - 767px | Simplified cards, metrics stacked |

### 7.2 Responsive Layout Changes

**Desktop → Tablet**:
- Filter bar: Dropdowns stack vertically
- Metrics: 2x2 grid
- Cards: Same full-width layout

**Tablet → Mobile**:
- All elements stack
- Metrics: 4 rows (stacked)
- Alert banner: Condensed text
- Cards: Simplified (less padding, smaller buttons)

### 7.3 Touch Target Sizing

Same as User Management screen:
- Buttons: 48x48px minimum
- Dropdowns: 48px height
- Action buttons in cards: 48px height (mobile), 40px (desktop)

---

## 8. Accessibility Requirements

### 8.1 WCAG 2.1 AA Compliance

**Screen-Level Requirements** (same as User Management):

**Perceivable**:
- [ ] SLA indicators use text + icon + color (not color alone)
- [ ] Verification checklist uses checkmarks + text
- [ ] Empty state messages clear and informative
- [ ] Color contrast: 4.5:1 for text

**Operable**:
- [ ] Full keyboard navigation
- [ ] Focus visible (2px blue outline)
- [ ] Skip link at page top
- [ ] No keyboard traps

**Understandable**:
- [ ] Page title: "Caregiver Verification Queue - iCare Admin"
- [ ] Heading hierarchy: H1 (page title), H2 (card headings)
- [ ] Form labels for filter dropdowns
- [ ] Clear error messages

**Robust**:
- [ ] Semantic HTML (header, main, article, footer)
- [ ] ARIA landmarks
- [ ] ARIA live regions for alerts and filter changes
- [ ] Screen reader tested

### 8.2 Focus Order

1. Skip link
2. Logo
3. Global search
4. Notifications bell
5. User menu
6. Breadcrumb links
7. SLA alert "Review Oldest First" button (if present)
8. SLA alert dismiss button (if present)
9. Verification type filter dropdown
10. SLA status filter dropdown
11. Sort by dropdown
12. Clear filters button
13. Metric cards (non-interactive, skip)
14. Queue cards (each card):
    - Caregiver name link
    - Review ID button
    - Review Right to Work button
    - Review DBS button
    - View Full Profile button
15. Pagination controls
16. Footer links

### 8.3 Screen Reader Annotations

**SLA Alert Banner**:
- `<div role="alert" aria-live="assertive">`
- Screen reader announces: "SLA breach alert. 3 verifications over 48 hours require urgent review. Review oldest first button."

**Verification Card**:
- `<article aria-labelledby="caregiver-CG-12345">`
- Heading: `<h2 id="caregiver-CG-12345">John Smith</h2>`
- SLA indicator: `<span role="status" aria-label="SLA breached, 72 hours pending">Breached</span>`
- Checklist: `<ul aria-label="Verification checklist">`
- Action button: `<button aria-label="Review identity verification for John Smith">Review ID</button>`

**Empty State**:
- `<div role="status">All clear. No pending verifications. All caregivers have been reviewed.</div>`

### 8.4 Color Contrast Compliance

Same as User Management screen. All status badges use text + icon, not color alone.

---

## 9. Component Reuse

### 9.1 Shared Components

1. **Navigation Header (Admin Variant)**: `NAV-HEADER-AUTH`
2. **Breadcrumb**: `BREADCRUMB`
3. **Metric Card**: `METRIC-CARD`
4. **Empty State**: `EMPTY-STATE`
5. **Button**: `BUTTON` (Primary, Secondary variants)
6. **Status Badge**: `STATUS-BADGE` (SLA indicators)
7. **Footer**: `FOOTER-GLOBAL`

### 9.2 New Components

1. **SLA Alert Banner**: `SLA-ALERT-BANNER`
   - Props: SLA breach count, CTA text, dismiss callback
   - Variants: Yellow (approaching), Orange/Red (breached)

2. **Verification Queue Card**: `VERIFICATION-CARD`
   - Props: Caregiver object, verification checklist, SLA status
   - Features: Color-coded by SLA, action buttons, checklist items

3. **Verification Checklist Item**: `VERIFICATION-CHECKLIST-ITEM`
   - Props: Type (identity/RTW/DBS), status (submitted/not submitted), submission date, review callback
   - States: Submitted, Not submitted, Disabled (if not submitted)

---

## 10. Design Notes for Figma

### 10.1 Key Design Considerations

1. **SLA Color Coding**: Red (breached) must dominate to signal urgency
2. **Card Hierarchy**: Caregiver name and SLA indicator are primary focus
3. **Checklist Clarity**: Checkmarks + text + buttons make actions obvious
4. **Empty State Tone**: Positive ("All Clear!") not negative

### 10.2 Figma File Structure

**Pages**:
1. Verification Queue - Default (SLA breach alert visible)
2. Verification Queue - Filtered (by Type or SLA)
3. Verification Queue - Empty (All Clear)
4. Verification Queue - Tablet (768px)
5. Verification Queue - Mobile (375px)

**Components to Create**:
- SLA Alert Banner (yellow/orange variants)
- Verification Queue Card (with SLA color variants)
- Verification Checklist Item (submitted/not submitted states)

---

## Appendix A: Content Specifications

### A.1 Page Title & Subtitle

- **Page Title (H1)**: "Caregiver Verification Queue"
- **Subtitle**: "Review and process pending verifications"

### A.2 SLA Alert Banner

- **Title**: "SLA BREACH ALERT"
- **Description**: "[N] verifications over 48 hours require urgent review"
- **CTA**: "Review Oldest First"

### A.3 Metric Card Labels

- **Card 1**: "Pending Verifications" (value: "12 caregivers", subtext: "Average wait: 18 hours", warning: "3 over 48h SLA")
- **Card 2**: "Identity" (value: "8 pending")
- **Card 3**: "Right to Work" (value: "4 pending")
- **Card 4**: "DBS (Voluntary)" (value: "3 pending")

### A.4 Verification Checklist Labels

- **Identity**: "Identity: Submitted (DD/MM/YY)" or "Identity: Not submitted"
- **Right to Work**: "Right to Work: Submitted (DD/MM/YY)" or "Right to Work: Not submitted"
- **DBS**: "DBS: Submitted (DD/MM/YY)" or "DBS: Not submitted (voluntary)"

### A.5 Action Button Labels

- "Review ID"
- "Review Right to Work"
- "Review DBS"
- "View Full Profile"

### A.6 Empty State Messages

- **All Clear**: "No pending verifications. All caregivers have been reviewed."
- **Filtered (No Results)**: "No verifications found matching filters. Try adjusting your filters."

---

## Appendix B: Data API Endpoints

### B.1 Verification Queue API

**Endpoint**: `GET /api/admin/verifications`

**Query Parameters**:
```
?type=identity          // Filter by type (identity, right_to_work, dbs)
&sla_status=breached    // Filter by SLA (on_track, approaching, breached)
&sort_by=oldest         // Sort (oldest, newest, sla_breach)
&page=1
&per_page=20
```

**Response**:
```json
{
  "verifications": [
    {
      "caregiver_id": "CG-12345",
      "caregiver_name": "John Smith",
      "caregiver_avatar_url": "https://...",
      "applied_date": "2026-01-15T10:00:00Z",
      "sla_status": "breached",
      "hours_pending": 72,
      "verifications": {
        "identity": { "status": "submitted", "date": "2026-01-15T10:05:00Z" },
        "right_to_work": { "status": "submitted", "date": "2026-01-15T10:10:00Z" },
        "dbs": { "status": "not_submitted", "date": null }
      }
    },
    // ... more caregivers
  ],
  "pagination": { "current_page": 1, "total_pages": 1, "total_count": 12 },
  "summary": {
    "total_pending": 12,
    "identity_pending": 8,
    "rtw_pending": 4,
    "dbs_pending": 3,
    "sla_breaches": 3,
    "average_wait_hours": 18
  }
}
```

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-11 | elderly-care-ux-ui-designer | Initial wireframe for SCR-ADM-007 |

---

**STATUS: READY FOR FIGMA HANDOFF**

**END OF DOCUMENT**
