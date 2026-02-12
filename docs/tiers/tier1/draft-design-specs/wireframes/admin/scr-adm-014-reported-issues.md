# Reported Issues Dashboard Wireframe (SCR-ADM-014)

**Document Purpose**: Complete wireframe specification and element inventory for the Admin Reported Issues Dashboard (also known as Safeguarding Reports Queue), enabling admins to view, triage, investigate, and manage all safeguarding concerns and platform issues.

**Screen ID**: SCR-ADM-014
**Screen Name**: Reported Issues Dashboard (Safeguarding Reports Queue)
**Route**: `/admin/safeguarding`
**User Roles**: Admin (Safeguarding Officer, Safeguarding Lead, Operations Manager)
**R0/R1**: R0 (Care Act 2014 compliance, safeguarding-critical)

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

The Reported Issues Dashboard (Safeguarding Reports Queue) provides admins with a centralized interface to:
- View all safeguarding incident reports and platform complaints in priority order
- Triage reports by severity (Critical, High, Medium, Low) with urgent items highlighted
- Filter and search reports by type, severity, status, reporter, and reported user
- View report details including incident description, evidence, timeline
- Assign reports to team members and update investigation status
- Escalate qualifying incidents to Safeguarding Adults Boards (SAB) and police
- Resolve reports with documented outcomes and notify reporters
- Track safeguarding SLAs (<2h for urgent, <48h for non-urgent)

### 1.2 Safeguarding Context (Care Act 2014 Compliance)

**Legal Framework**:
- **Care Act 2014 Section 42**: Platform has duty to report qualifying safeguarding concerns to local authority Safeguarding Adults Boards
- **Section 42 Criteria**: Adult with care needs, experiencing abuse/neglect, unable to protect self
- **Abuse Categories**: Physical, emotional, sexual, financial, neglect, discriminatory, domestic, self-neglect, institutional, modern slavery
- **Platform Duty**: Investigate reports, escalate to SAB within 24 hours if criteria met, cooperate with external investigations

**Response SLAs** (per Safeguarding Specification):
- **Critical**: <2 hours (sexual assault, physical assault, abandonment with immediate risk)
- **High**: <4 hours (financial theft >£100, pattern of abuse, vulnerable adult at risk)
- **Medium**: <24 hours (single instance verbal abuse, off-platform payment request, self-neglect)
- **Low**: <48 hours (boundary confusion, unprofessional conduct)

### 1.3 Key User Tasks

**Primary Tasks**:
1. View safeguarding reports queue sorted by urgency and submission date
2. Identify urgent reports (red flag) and SLA breaches (>2h for urgent, >48h for non-urgent)
3. Filter reports by incident type, severity, status, date range
4. Open individual report to view full details
5. Assign report to team member (Safeguarding Officer, Safeguarding Lead)
6. Update report status (New → Triaging → Investigating → Escalated → Resolved)
7. Escalate to SAB (Section 42 qualifying incidents)
8. Escalate to police (criminal activity suspected)
9. Suspend or ban reported user immediately (safeguarding action)
10. Resolve report with outcome (substantiated, unsubstantiated, inconclusive) and notify reporter
11. Add internal notes to audit trail

**Context of Use**:
- Safeguarding Officer monitors queue daily for new reports
- On-call officer receives SMS/email alerts for urgent reports (24/7 coverage)
- Safeguarding Lead reviews complex cases and makes escalation decisions
- Operations Manager reviews resolved incidents for learning and policy improvements

### 1.4 Relationship to Other Admin Screens

**Within Admin Section**:
- **SCR-ADM-001** (Admin Dashboard): Links to this screen via "View Reports" button in Safeguarding Monitoring widget, displays active report count
- **SCR-ADM-015** (Safeguarding Report Detail, R0): Individual report detail page with full investigation interface (linked from queue items)
- **SCR-ADM-005** (User Management): Links to reported user profiles for suspension/ban actions
- **SCR-ADM-007** (Verification Queue): May link to caregiver verifications if safeguarding concern relates to unverified caregiver

**Navigation Pattern**: Admin Dashboard → Safeguarding Reports Queue (this screen) → Individual Report Detail (SCR-ADM-015)

---

## 2. Entry Points and Navigation

### 2.1 Entry Points

**How admins arrive at this screen**:
- From Admin Dashboard (SCR-ADM-001): Click "View Reports" button in Safeguarding Monitoring widget
- From Admin Navigation: Click "Safeguarding" in global admin sidebar
- From email/SMS alert: Urgent report notification links directly to specific report (auto-opens SCR-ADM-015)
- From User Management (SCR-ADM-005): Click "View Safeguarding History" on user profile (opens this screen with user filter applied)
- From Booking Detail (SCR-CR-008): Click "Report Safeguarding Concern" button (opens report form, then redirects here after submission)
- Direct URL navigation: `/admin/safeguarding`

**Preconditions**:
- User authenticated as Admin role
- 2FA enabled (mandatory for admin accounts)
- Admin has "safeguarding_officer" or "safeguarding_lead" permission (role-based access)

### 2.2 Navigation Exits

**From This Screen**:

| Element | Destination | Screen ID |
|---------|------------|-----------|
| Report card (click anywhere) | Safeguarding Report Detail | SCR-ADM-015 |
| Reported user name link | User Detail View | SCR-ADM-016 (R1) or User Management (SCR-ADM-005) |
| Reporter name link | User Detail View | SCR-ADM-016 (R1) |
| Admin Dashboard link (breadcrumb) | Admin Dashboard | SCR-ADM-001 |
| User Management link (sidebar) | User Management | SCR-ADM-005 |
| Verifications link (sidebar) | Verification Queue | SCR-ADM-007 |
| Logout (user menu) | Login | SCR-AUTH-005 |

**Global Admin Navigation** (sidebar):
- Dashboard (SCR-ADM-001)
- Users (SCR-ADM-005)
- Verifications (SCR-ADM-007)
- Safeguarding (this screen)
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
│ BREADCRUMB: Dashboard > Safeguarding                            │
├─────────────────────────────────────────────────────────────────┤
│ PAGE TITLE: Safeguarding Reports                                │
│ SUBTITLE: Review and manage safety concerns and incidents       │
├─────────────────────────────────────────────────────────────────┤
│ URGENT ALERT BANNER (conditional - only if urgent reports)      │
│ - "URGENT: 2 critical reports require immediate action"         │
├─────────────────────────────────────────────────────────────────┤
│ FILTER & SEARCH BAR                                             │
│ - Search, Type, Severity, Status, Date range filters            │
├─────────────────────────────────────────────────────────────────┤
│ SUMMARY METRICS (4 cards)                                       │
│ - Active Reports, Urgent, Resolved This Week, Avg Response Time │
├─────────────────────────────────────────────────────────────────┤
│ REPORTS QUEUE TABLE (main content)                              │
│ - Columns: Case ID, Reporter, Reported User, Type, Severity,    │
│   Status, Submitted, Age, Actions                               │
│ - Pagination controls at bottom                                 │
├─────────────────────────────────────────────────────────────────┤
│ FOOTER: Standard global footer + Safeguarding Policy link       │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Content Block Breakdown

**Block 1: Admin Navigation Header** (shared component)
- **Purpose**: Global admin navigation
- **Priority**: PRIMARY (always visible)
- **Component Reference**: `NAV-HEADER-AUTH` with `role: "admin"`

**Block 2: Breadcrumb Navigation**
- **Purpose**: Show navigation path
- **Priority**: SECONDARY (context)
- **Elements**: "Dashboard" link > "Safeguarding" (current page)

**Block 3: Page Title & Subtitle**
- **Purpose**: Clearly identify screen purpose
- **Priority**: PRIMARY
- **Elements**:
  - H1: "Safeguarding Reports"
  - Subtitle: "Review and manage safety concerns and incidents"
  - Urgent count: "2 urgent reports" (red text, if applicable)

**Block 4: Urgent Alert Banner** (conditional)
- **Purpose**: Critical alert for urgent reports requiring immediate action
- **Priority**: PRIMARY (highest urgency)
- **Condition**: Only shown if ≥1 report with severity "Critical" or SLA breach >2h
- **Elements**:
  - Icon: Warning triangle (red)
  - Title: "URGENT SAFEGUARDING REPORT" or "URGENT: 2 CRITICAL REPORTS"
  - Description: "Report #SR-00423 submitted 35 minutes ago requires immediate review"
  - CTA: "Review Now" (red button, links to oldest urgent report SCR-ADM-015)
  - Dismiss: X button (closes banner)

**Block 5: Filter & Search Bar**
- **Purpose**: Filter and search safeguarding reports
- **Priority**: PRIMARY (workflow efficiency)
- **Elements**:
  - Search input: Search by case ID, reporter name, reported user name, keywords
  - Incident type filter: All, Physical Abuse, Emotional Abuse, Sexual Abuse, Financial Abuse, Neglect, etc.
  - Severity filter: All, Critical, High, Medium, Low
  - Status filter: All, New, Triaging, Investigating, Escalated, Resolved
  - Date range picker: Submitted between [date] and [date]
  - Clear Filters button
  - Apply Filters button

**Block 6: Summary Metrics**
- **Purpose**: At-a-glance safeguarding statistics
- **Priority**: SECONDARY (context)
- **Elements**: 4 metric cards in horizontal row
  - Active Reports: Count of reports with status New/Triaging/Investigating/Escalated
  - Urgent Reports: Count of reports with severity Critical or SLA breach
  - Resolved This Week: Count of reports resolved in last 7 days
  - Avg Response Time: Average time from submission to first action (hours)

**Block 7: Reports Queue Table**
- **Purpose**: Display all safeguarding reports in sortable table
- **Priority**: PRIMARY (core content)
- **Elements**:
  - Table header with sortable columns
  - Table rows (20 reports per page, paginated)
  - Urgent reports highlighted (red background)
  - Click row to open report detail (SCR-ADM-015)
  - Pagination controls

**Block 8: Footer**
- **Purpose**: Legal links and safeguarding policy access
- **Priority**: TERTIARY
- **Elements**: About | Privacy | Terms | Safeguarding Policy | Support | Version

---

## 4. Complete Element Inventory

### 4.1 Block 1: Admin Navigation Header

**Component Reference**: See Admin Dashboard (SCR-ADM-001) for full specification.

---

### 4.2 Block 2: Breadcrumb Navigation

**Elements**:
- **Link 1**: "Dashboard" (link to /admin)
- **Separator**: ">"
- **Current Page**: "Safeguarding" (plain text, not a link)

**Accessibility**: Same as previous admin screens

---

### 4.3 Block 3: Page Title & Subtitle

**Elements**:
- **H1 Title**: "Safeguarding Reports"
  - Typography: 32px bold
  - Color: `$txt` (#0F172A)
- **Subtitle**: "Review and manage safety concerns and incidents"
  - Typography: 16px regular
  - Color: `$txt-muted` (rgba(15,23,42,0.72))
- **Urgent Count** (conditional, if urgent reports exist):
  - Text: "2 urgent reports"
  - Typography: 14px bold
  - Color: #DC2626 (red)
  - Icon: Warning triangle (red)

**Spacing**:
- Title: 24px margin-bottom
- Subtitle: 16px margin-bottom (before alert banner or filter bar)

---

### 4.4 Block 4: Urgent Alert Banner (Conditional)

**Condition**: Only displayed if ≥1 report with severity "Critical" or SLA breach

**Elements**:
- **Background**: Red (#FEE2E2, light red)
- **Border**: Left border 4px, red (#DC2626)
- **Icon**: Warning triangle (red, 32px)
- **Title**: "URGENT SAFEGUARDING REPORT" or "URGENT: [N] CRITICAL REPORTS"
  - Typography: 18px bold
  - Color: #DC2626 (red)
- **Description**: "Report #SR-00423 submitted 35 minutes ago requires immediate review"
  - Typography: 16px regular
  - Color: #0F172A
  - If multiple urgent reports: "2 critical reports require immediate action"
- **CTA Button**: "Review Now"
  - Style: Primary button (red background #DC2626, white text)
  - Action: Navigates to oldest urgent report detail (SCR-ADM-015)
- **Dismiss Button**: X icon (top-right)
  - Action: Closes banner (user can dismiss if already aware)

**Accessibility**:
- `<div role="alert" aria-live="assertive">`
- Screen reader announces immediately: "Urgent safeguarding report. Report number SR-00423 submitted 35 minutes ago requires immediate review. Review now button."

**Design Tokens**:
- Background: #FEE2E2
- Border-left: 4px solid #DC2626
- Padding: 16px 24px
- Border-radius: 8px
- Button height: 48px
- Button background: #DC2626

---

### 4.5 Block 5: Filter & Search Bar

**Layout**: Horizontal row on desktop, wraps to multiple rows on smaller screens

**Elements**:

**1. Search Input**:
- Placeholder: "Search by case ID, reporter, reported user, or keywords..."
- Width: 400px (desktop), full-width (mobile)
- Icon: Magnifying glass (left side)
- Clear button: X icon (right side, appears when text entered)
- Real-time search: Debounced 300ms after last keystroke

**2. Incident Type Filter Dropdown**:
- Label: "Incident Type"
- Options:
  - All (default)
  - Physical Abuse
  - Emotional Abuse
  - Sexual Abuse
  - Financial Abuse
  - Neglect
  - Discriminatory Abuse
  - Domestic Abuse
  - Self-Neglect
  - Institutional Abuse
  - Modern Slavery
  - Off-Platform Payments
  - Inappropriate Conduct
  - Policy Violation
  - Service Quality Dispute
  - Other
- Width: 220px
- Icon: Warning triangle (left side), chevron down (right side)

**3. Severity Filter Dropdown**:
- Label: "Severity"
- Options:
  - All (default)
  - Critical (immediate danger)
  - High (significant risk)
  - Medium (moderate concern)
  - Low (minor concern)
- Width: 180px
- Icon: Severity indicator (left side), chevron down (right side)
- Color-coded options: Red (Critical), Orange (High), Yellow (Medium), Gray (Low)

**4. Status Filter Dropdown**:
- Label: "Status"
- Options:
  - All (default)
  - New (just submitted, not triaged)
  - Triaging (admin reviewing)
  - Investigating (evidence gathering)
  - Escalated (sent to SAB/police)
  - Resolved - Substantiated
  - Resolved - Unsubstantiated
  - Resolved - Inconclusive
- Width: 200px
- Icon: Status indicator (left side), chevron down (right side)

**5. Date Range Picker**:
- Label: "Submitted"
- Format: "DD/MM/YYYY - DD/MM/YYYY"
- Opens calendar picker on click
- Preset options: Today, Last 7 days, Last 30 days, Last 90 days, All time
- Width: 240px

**6. Clear Filters Button**:
- Label: "Clear Filters"
- Style: Secondary button
- Action: Resets all filters to default
- Disabled state: If no filters applied

**7. Apply Filters Button**:
- Label: "Apply Filters"
- Style: Primary button
- Action: Updates table with filtered results
- Loading state: Spinner + "Filtering..." text

**Filter Behavior**:
- Filters apply immediately on dropdown change
- Search input applies on Enter key or after 300ms
- Active filters displayed as removable tags above table: "[X] Severity: Critical" "[X] Status: New"

**Accessibility**:
- All inputs have associated labels
- Dropdowns keyboard accessible
- Date picker keyboard accessible
- Screen reader announces filter changes

**Design Tokens**:
- Input height: 48px
- Input background: #ffffff
- Input border: 1px solid #D1D5DB
- Input border-radius: 8px
- Input padding: 12px 16px
- Button height: 48px

---

### 4.6 Block 6: Summary Metrics

**Layout**: 4 cards in horizontal row (2x2 grid on tablet, stacked on mobile)

**Metric Card Structure** (reusable component):

**Card 1: Active Reports**:
- Icon: Alert circle (orange)
- Label: "Active Reports"
- Value: "12 cases" (dynamic count)
- Subtext: "Requiring action"
- Breakdown: "New: 3 | Investigating: 7 | Escalated: 2"

**Card 2: Urgent Reports**:
- Icon: Warning triangle (red)
- Label: "Urgent Reports"
- Value: "2 critical" (dynamic count)
- Subtext: "Require immediate review"
- SLA warning: "1 over 2h SLA" (red text, if applicable)

**Card 3: Resolved This Week**:
- Icon: Checkmark circle (green)
- Label: "Resolved This Week"
- Value: "8 cases" (dynamic count)
- Breakdown: "Substantiated: 3 | Unsubstantiated: 4 | Inconclusive: 1"

**Card 4: Avg Response Time**:
- Icon: Clock (blue)
- Label: "Avg Response Time"
- Value: "3.2 hours" (dynamic average)
- Status: "On Track" (green) if <4h, "Approaching SLA" (yellow) if 4-48h, "Breached" (red) if >48h
- Subtext: "Target: <4h for high severity"

**Data Sources**:
- API endpoint: `GET /api/admin/safeguarding/summary`
- Response includes: active_reports, urgent_reports, resolved_this_week, avg_response_hours, sla_breaches

**Accessibility**:
- Each card is `<article>` with heading
- Metrics use `<dl>` structure

**Design Tokens**: Same as previous admin screens

---

### 4.7 Block 7: Reports Queue Table

**Table Structure**:

| Column | Width | Sortable | Content |
|--------|-------|----------|---------|
| Case ID | 120px | Yes | SAF-2026-00123 (link to detail) |
| Reporter | 150px | Yes | Name or "Anonymous" |
| Reported User | 150px | Yes | Name + role badge |
| Incident Type | 180px | Yes | Badge: Physical Abuse, Financial Abuse, etc. |
| Severity | 100px | Yes | Badge: Critical, High, Medium, Low |
| Status | 120px | Yes | Badge: New, Investigating, Resolved, etc. |
| Submitted | 120px | Yes | Date + time (DD/MM/YY HH:MM) |
| Age | 100px | Yes | "35 min ago", "3 days ago" |
| Actions | 80px | No | 3-dot menu (View, Assign, Escalate) |

**Column Details**:

**1. Case ID**:
- Format: "SAF-2026-00123"
- Link: Opens report detail page (SCR-ADM-015)
- Hover state: Underline
- Color: Blue (#2563EB)

**2. Reporter**:
- Name: "Sarah Johnson" (Care Receiver, Caregiver, Family Member, External Professional)
- If anonymous: "Anonymous Reporter"
- Icon: User icon next to name
- Link: Opens reporter's user detail (if authenticated user, not anonymous)

**3. Reported User**:
- Name: "John Smith"
- Role badge: Caregiver, Care Receiver, Family Member (small pill)
- Icon: User icon next to name
- Link: Opens reported user's detail page

**4. Incident Type**:
- Badge component with icon + text
- Examples: "Physical Abuse", "Financial Abuse", "Neglect", "Off-Platform Payments"
- Color: Red (abuse types), Orange (safeguarding concerns), Yellow (policy violations), Gray (service quality)
- Icon: Warning triangle (abuse), dollar sign (financial), ban (policy)

**5. Severity**:
- Badge component with icon + text
- Critical: Red background, ban icon
- High: Orange background, warning triangle
- Medium: Yellow background, exclamation mark
- Low: Gray background, info icon

**6. Status**:
- Badge component with icon + text
- New: Blue background, circle icon
- Triaging: Blue background, magnifying glass
- Investigating: Purple background, search icon
- Escalated: Orange background, arrow up
- Resolved - Substantiated: Green background, checkmark
- Resolved - Unsubstantiated: Gray background, X icon
- Resolved - Inconclusive: Gray background, question mark

**7. Submitted**:
- Date format: "15/01/26 14:32"
- Sortable: Click header to sort by date (ascending/descending)
- Tooltip on hover: Full timestamp "15 January 2026, 14:32"

**8. Age**:
- Format: "35 min ago", "3 hours ago", "2 days ago"
- Color: Red if urgent and >2h, Orange if high and >4h, Gray otherwise
- Sortable: Click header to sort by age

**9. Actions Dropdown**:
- 3-dot vertical icon (kebab menu)
- Click opens dropdown menu with options:
  - "View Details" (link to SCR-ADM-015)
  - "Assign to Me" (assigns report to current admin)
  - "Assign to Team Member" (opens assign modal)
  - "Escalate to SAB" (opens escalation form)
  - "Escalate to Police" (opens escalation form)
  - "Suspend Reported User" (immediate suspension)
- Dropdown closes on click outside or Escape key

**Table Features**:

**Row Highlighting** (urgent reports):
- Reports with severity "Critical" or SLA breach >2h: Light red background (#FEE2E2)
- Reports with severity "High" or SLA breach >4h: Light orange background (#FEF3C7)
- Default reports: White background

**Sorting**:
- Click column header to sort (ascending)
- Click again to reverse sort (descending)
- Sorted column header shows arrow icon (up/down)
- Default sort: Submitted (most recent first), but Urgent reports always at top

**Pagination**:
- 20 reports per page (default)
- Pagination controls at bottom:
  - "Previous" button (disabled on page 1)
  - Page numbers: "1 2 3 ... 15" (show 5 pages max, with ellipsis)
  - "Next" button (disabled on last page)
- Results count: "Showing 1-20 of 287 reports"
- Per-page selector: "Show: [20 ▾] per page" (options: 10, 20, 50, 100)

**Empty State** (no reports):
- Icon: Checkmark circle (green, large 64px)
- Heading: "No Safeguarding Reports"
- Message: "All is well! No active safeguarding reports at this time."
- Subtext: "Last report resolved: 3 days ago by Admin Sarah"
- No CTA (nothing to do)

**Empty State** (no matches from filter):
- Icon: Magnifying glass (gray, 64px)
- Heading: "No Reports Found"
- Message: "No reports match your current filters"
- CTA: "Clear All Filters" button

**Loading State**:
- Skeleton rows (gray animated placeholders for 5 rows)
- No interactive elements while loading

**Error State**:
- Red error message above table: "Unable to load safeguarding reports. [Retry]"
- Retry button attempts to reload data

**Accessibility**:
- `<table>` with `<thead>`, `<tbody>`, `<th>`, `<td>`
- Caption: "Safeguarding reports list with filters and actions"
- Sortable column headers: `aria-sort="ascending"` or `aria-sort="descending"`
- Urgent rows: `<tr class="urgent" aria-label="Urgent report, critical severity">`
- Actions dropdown: `aria-label="Actions for report SAF-2026-00123"`

**Design Tokens**:
- Table background: #ffffff
- Table border: 1px solid #E5E7EB
- Header row background: #F9FAFB
- Row hover background: #F3F4F6
- Urgent row background: #FEE2E2 (light red)
- High priority row background: #FEF3C7 (light orange)
- Row height: 72px
- Cell padding: 12px 16px
- Font size: 14px (body), 12px (subtext)

---

### 4.8 Block 8: Footer

**Component Reference**: Standard global footer

**Additional Element** (Safeguarding-specific):
- **Safeguarding Policy Link**: Prominently displayed in footer
  - Label: "Safeguarding Policy"
  - Link: Opens public safeguarding policy page (SCR-PUB-008)
  - Purpose: Quick access for admins to reference policy during investigations

---

## 5. ASCII Wireframes

### 5.1 Desktop Layout (1440px+)

#### State 1: Default (Reports Active, Urgent Alert)

```
+---------------------------------------------------------------------------------+
|  [Logo]  iCare Admin            [Search: users, bookings...] [🔔 5] [👤 Sarah] |
+---------------------------------------------------------------------------------+
|  Dashboard > Safeguarding                                                       |
+---------------------------------------------------------------------------------+
|                                                                                 |
|  Safeguarding Reports                              2 urgent reports ⚠️          |
|  Review and manage safety concerns and incidents                               |
|                                                                                 |
|  +-----------------------------------------------------------------------------+|
|  | 🚨 URGENT: 2 CRITICAL REPORTS                                        [X]   ||
|  | Reports #SR-00423 and #SR-00424 require immediate action                  ||
|  | [Review Now]                                                               ||
|  +-----------------------------------------------------------------------------+|
|                                                                                 |
|  +-----------------------------------------------------------------------------+|
|  | [🔍] Search by case ID, reporter, user...  [Type: All ▾] [Severity: All ▾]||
|  | [Status: All ▾] [Date: All time ▾]         [Clear Filters] [Apply]        ||
|  +-----------------------------------------------------------------------------+|
|                                                                                 |
|  +-----------------+  +-----------------+  +-----------------+  +-------------+ |
|  | 🔶 Active       |  | ⚠️ Urgent       |  | ✓ Resolved      |  | 🕐 Avg Time | |
|  | Reports         |  | Reports         |  | This Week       |  | 3.2 hours   | |
|  | 12 cases        |  | 2 critical      |  | 8 cases         |  | On Track ✓  | |
|  | Requiring action|  | ⚠️ 1 over 2h SLA|  | Sub: 3 | Unsub:4|  | Target: <4h | |
|  +-----------------+  +-----------------+  +-----------------+  +-------------+ |
|                                                                                 |
|  Active Filters: [X] Severity: Critical                                        |
|  Showing 1-2 of 2 reports                                                      |
|                                                                                 |
|  +-----------------------------------------------------------------------------+|
|  | Case ID     | Reporter | Reported | Type       | Severity | Status | Age  ||
|  |             |          | User     |            |          |        |      ||
|  +-----------------------------------------------------------------------------+|
|  | SAF-2026-423| Sarah J. | John S.  | Physical   | Critical | New    | 35min||
|  |             | Care Rec.| Caregvr  | Abuse      | 🚨       | 🔵     | ⚠️   ||
|  |             |          | ✓Verified| ⚠️         |          |        | [⋮]  ||
|  +-----------------------------------------------------------------------------+|
|  (Row has light red background indicating critical urgency)                    |
|                                                                                 |
|  +-----------------------------------------------------------------------------+|
|  | SAF-2026-424| Tom H.   | Mary K.  | Financial  | Critical | Triaging| 2h  ||
|  |             | Family   | Caregvr  | Abuse      | 🚨       | 🔍     | ⚠️   ||
|  |             | Member   | ✓Verified| 💰         |          |        | [⋮]  ||
|  +-----------------------------------------------------------------------------+|
|  (Row has light red background indicating critical urgency + SLA breach)       |
|                                                                                 |
|  Showing 1-2 of 2 reports                                                      |
|  [< Previous]  [1]  [Next >]  (pagination disabled, filtered view)             |
|                                                                                 |
+---------------------------------------------------------------------------------+
|  Footer: About | Privacy | Terms | Safeguarding Policy | Support | Version     |
+---------------------------------------------------------------------------------+
```

**Key Layout Features**:
- Urgent alert banner at top (red background, prominent)
- Filter bar with 5 inputs (search + 4 dropdowns)
- 4 summary metric cards in horizontal row
- Table with 9 columns, sortable headers
- Urgent rows highlighted with red background
- Actions dropdown (3-dot menu) on each row
- Pagination at bottom

---

#### State 2: Empty State (No Active Reports)

```
+---------------------------------------------------------------------------------+
|  [Logo]  iCare Admin            [Search: users, bookings...] [🔔 0] [👤 Sarah] |
+---------------------------------------------------------------------------------+
|  Dashboard > Safeguarding                                                       |
+---------------------------------------------------------------------------------+
|                                                                                 |
|  Safeguarding Reports                                                          |
|  Review and manage safety concerns and incidents                               |
|                                                                                 |
|  (No urgent alert banner - no critical reports)                                |
|                                                                                 |
|  (Filter bar same as State 1)                                                  |
|                                                                                 |
|  +-----------------+  +-----------------+  +-----------------+  +-------------+ |
|  | 🔶 Active       |  | ⚠️ Urgent       |  | ✓ Resolved      |  | 🕐 Avg Time | |
|  | Reports         |  | Reports         |  | This Week       |  | 2.8 hours   | |
|  | 0 cases         |  | 0 critical      |  | 8 cases         |  | On Track ✓  | |
|  | ✅ All clear    |  | ✅ All clear    |  | Sub: 3 | Unsub:4|  |             | |
|  +-----------------+  +-----------------+  +-----------------+  +-------------+ |
|                                                                                 |
|  +-----------------------------------------------------------------------------+|
|  |                                                                            ||
|  |                           ✅ (large green checkmark)                       ||
|  |                                                                            ||
|  |                   No Safeguarding Reports                                 ||
|  |                                                                            ||
|  |      All is well! No active safeguarding reports at this time.            ||
|  |                                                                            ||
|  |      Last report resolved: 3 days ago by Admin Sarah                      ||
|  |                                                                            ||
|  +-----------------------------------------------------------------------------+|
|                                                                                 |
+---------------------------------------------------------------------------------+
```

**Empty State**:
- Large green checkmark icon (64px)
- Positive message: "No Safeguarding Reports"
- Explanation: "All is well!"
- Context: Last resolution timestamp
- No CTA (nothing actionable)

---

#### State 3: Actions Dropdown Open

```
+---------------------------------------------------------------------------------+
|  (Same header and filter sections)                                             |
|                                                                                 |
|  +-----------------------------------------------------------------------------+|
|  | SAF-2026-423| Sarah J. | John S.  | Physical   | Critical | New    | 35min||
|  |             | Care Rec.| Caregvr  | Abuse      | 🚨       | 🔵     | ⚠️[⋮]||
|  |             |          | ✓Verified| ⚠️         |          |        +-------+|
|  |             |          |          |            |          |  Dropdown:     ||
|  |             |          |          |            |          |  ┌─────────────+|
|  |             |          |          |            |          |  │ View Details||
|  |             |          |          |            |          |  │ Assign to Me||
|  |             |          |          |            |          |  │ Assign to...||
|  |             |          |          |            |          |  │ Escalate SAB||
|  |             |          |          |            |          |  │ Escalate Pol||
|  |             |          |          |            |          |  │ Suspend User||
|  |             |          |          |            |          |  └─────────────+|
+---------------------------------------------------------------------------------+
```

**Actions Dropdown**:
- Positioned below 3-dot icon, right-aligned
- Background: White, shadow
- Width: 200px
- Each item: 48px height, full-width clickable
- Hover state: Light gray background
- Critical actions (Suspend User) in red text

---

### 5.2 Tablet Layout (768px - 1439px)

```
+---------------------------------------------------------------+
|  [Logo] iCare Admin    [🔍] [🔔 5] [👤]                      |
+---------------------------------------------------------------+
|  Dashboard > Safeguarding                                     |
+---------------------------------------------------------------+
|                                                               |
|  Safeguarding Reports              2 urgent ⚠️               |
|                                                               |
|  +-----------------------------------------------------------+|
|  | 🚨 URGENT: 2 CRITICAL REPORTS                      [X]   ||
|  | [Review Now]                                              ||
|  +-----------------------------------------------------------+|
|                                                               |
|  [🔍] Search...                                               |
|  [Type: All ▾] [Severity: All ▾]                             |
|  [Status: All ▾] [Date: All ▾]                               |
|  [Clear] [Apply]                                              |
|                                                               |
|  +-------------------------+  +------------------------------+|
|  | 🔶 Active: 12           |  | ⚠️ Urgent: 2                 ||
|  +-------------------------+  +------------------------------+|
|  +-------------------------+  +------------------------------+|
|  | ✓ Resolved: 8           |  | 🕐 Avg: 3.2h                 ||
|  +-------------------------+  +------------------------------+|
|                                                               |
|  Showing 1-2 of 2 reports                                    |
|  +-----------------------------------------------------------+|
|  | SAF-2026-423  [Critical 🚨]  [New 🔵]      35 min ago    ||
|  | Reporter: Sarah J. (Care Receiver)                       ||
|  | Reported: John S. (Caregiver)                            ||
|  | Type: Physical Abuse                                     ||
|  | [View Details] [Assign] [Escalate]                       ||
|  +-----------------------------------------------------------+|
|  (Card has light red background)                             |
|                                                               |
|  +-----------------------------------------------------------+|
|  | SAF-2026-424  [Critical 🚨]  [Triaging 🔍]  2 hours ago  ||
|  | Reporter: Tom H. (Family Member)                         ||
|  | Reported: Mary K. (Caregiver)                            ||
|  | Type: Financial Abuse                                    ||
|  | [View Details] [Assign] [Escalate]                       ||
|  +-----------------------------------------------------------+|
|                                                               |
|  [< Previous]  [1]  [Next >]                                  |
+---------------------------------------------------------------+
```

**Tablet Changes**:
- Filter bar: Inputs stack vertically
- Metrics: 2x2 grid
- Table: Converts to card layout (report cards stacked)
- Actions: Buttons visible in card (not dropdown)

---

### 5.3 Mobile Layout (320px - 767px)

```
+-----------------------------+
| [☰] iCare Admin   [🔔5][👤]|
+-----------------------------+
| Dashboard > Safeguarding    |
+-----------------------------+
|                            |
| Safeguarding Reports       |
| 2 urgent ⚠️                |
|                            |
| 🚨 URGENT: 2       [X]     |
| [Review Now]               |
|                            |
| [🔍] Search...             |
| [Type: All ▾]              |
| [Severity: All ▾]          |
| [Status: All ▾]            |
| [Date: All ▾]              |
| [Clear] [Apply]            |
|                            |
| Active: 12                 |
| Urgent: 2 ⚠️               |
| Resolved: 8                |
| Avg: 3.2h ✓                |
|                            |
| Showing 1-2 of 2           |
|                            |
| +--------------------------+|
| | SAF-2026-423             ||
| | Critical 🚨 | New 🔵     ||
| | 35 min ago ⚠️            ||
| |                          ||
| | Reporter: Sarah J.       ||
| | Reported: John S.        ||
| | Type: Physical Abuse     ||
| |                          ||
| | [View] [Assign]          ||
| +--------------------------+|
| (Red background)           |
|                            |
| +--------------------------+|
| | SAF-2026-424             ||
| | Critical 🚨 | Triaging   ||
| | 2h ago ⚠️                ||
| | (Same layout)            ||
| +--------------------------+|
|                            |
| [< Prev] [1] [Next >]      |
+-----------------------------+
```

**Mobile Changes**:
- Hamburger menu for admin nav
- All elements stack vertically
- Alert banner: Condensed
- Filters: Full-width dropdowns
- Metrics: 4 rows (stacked)
- Table: Card layout (simplified)

---

## 6. State Coverage

### 6.1 All Required States

| State Name | Condition | Visual Changes | Components Affected |
|------------|----------|----------------|---------------------|
| **Default** | Reports active, no urgent | Table shows all reports, sorted by submission date | All blocks |
| **Urgent Alert** | ≥1 critical report or SLA breach | Red alert banner at top, urgent rows highlighted red | Alert banner, table rows |
| **Filtered** | Filters applied | Active filter tags visible, table shows filtered results | Filter bar, table |
| **Loading** | Initial page load | Skeleton rows (5 rows), metrics show spinners | Table, metrics |
| **Empty (No Reports)** | No reports in system | Green checkmark + "No Safeguarding Reports" message | Table area |
| **Empty (No Results)** | Filters applied, no matches | "No reports found matching filters" + Clear Filters button | Table area |
| **Actions Dropdown Open** | Admin clicks 3-dot icon | Dropdown menu visible with action options | Table row |
| **Error** | API failure | Red error message above table: "Unable to load reports. [Retry]" | Table area |

### 6.2 State Transition Diagram

```
┌─────────────┐
│   LOADING   │ (Initial page load)
└──────┬──────┘
       ↓
┌──────────────────┐
│    DEFAULT       │ (Reports displayed)
└────┬─────────┬───┘
     │         │
     │         ↓
     │   ┌────────────────┐
     │   │ URGENT ALERT   │ (Critical reports visible, red banner)
     │   └────────┬───────┘
     │            │
     │            ↓
     │   ┌────────────────┐
     ├──→│ FILTERED       │ (Type/Severity/Status filters applied)
     │   └────────────────┘
     │
     │   ┌────────────────┐
     ├──→│ EMPTY (NO      │ (No active reports)
     │   │ REPORTS)       │
     │   └────────────────┘
     │
     ↓
┌────────────────┐
│     ERROR      │ (API failure)
│ [Retry]        │
└────────────────┘
```

---

## 7. Responsive Design Notes

Same breakpoint strategy and responsive patterns as previous admin screens (SCR-ADM-005, SCR-ADM-007).

---

## 8. Accessibility Requirements

Same WCAG 2.1 AA compliance requirements, focus order, and screen reader annotations as previous admin screens.

**Additional Safeguarding-Specific Considerations**:
- Urgent reports announced immediately by screen readers (ARIA live region)
- Severity indicators use text + icon + color (not color alone)
- Critical actions (Suspend User) require confirmation modal with clear warning

---

## 9. Component Reuse

### 9.1 Shared Components

1. **Navigation Header (Admin Variant)**: `NAV-HEADER-AUTH`
2. **Breadcrumb**: `BREADCRUMB`
3. **Metric Card**: `METRIC-CARD`
4. **Empty State**: `EMPTY-STATE`
5. **Button**: `BUTTON`
6. **Status Badge**: `STATUS-BADGE` (severity and status badges)
7. **Footer**: `FOOTER-GLOBAL`
8. **Filter Bar**: `FILTER-BAR` (from User Management)
9. **Active Filter Tags**: `FILTER-TAG`

### 9.2 New Components (Safeguarding-Specific)

1. **Urgent Alert Banner**: `URGENT-ALERT-BANNER`
   - Props: Report count, description, CTA text, dismiss callback
   - Variants: Red (critical), Orange (high)

2. **Report Row (Desktop Table)**: `REPORT-TABLE-ROW`
   - Props: Report object (case ID, reporter, reported user, type, severity, status, dates)
   - Features: Color-coded by severity, actions dropdown

3. **Report Card (Mobile/Tablet)**: `REPORT-CARD`
   - Props: Report object
   - Layout: Vertical stack with action buttons

4. **Severity Badge**: `SEVERITY-BADGE`
   - Props: Severity level (critical, high, medium, low)
   - Variants: Color-coded (red, orange, yellow, gray)

5. **Incident Type Badge**: `INCIDENT-TYPE-BADGE`
   - Props: Incident type
   - Variants: Color-coded by category (abuse types, safeguarding concerns, policy violations)

---

## 10. Design Notes for Figma

### 10.1 Key Design Considerations

1. **Urgency Hierarchy**: Red (critical) must dominate to signal immediate action required
2. **Severity Color Coding**: Consistent across all admin screens (red = critical, orange = high, yellow = medium, gray = low)
3. **Safeguarding Tone**: Serious, professional (not playful or casual)
4. **Empty State Tone**: Positive ("All is well!") to reduce anxiety

### 10.2 Figma File Structure

**Pages**:
1. Safeguarding Reports - Default (urgent alert visible)
2. Safeguarding Reports - Filtered (by Type or Severity)
3. Safeguarding Reports - Empty (no reports)
4. Safeguarding Reports - Actions Dropdown
5. Safeguarding Reports - Tablet (768px)
6. Safeguarding Reports - Mobile (375px)

**Components to Create**:
- Urgent Alert Banner (red variant)
- Report Table Row (with severity color variants)
- Report Card (mobile/tablet layout)
- Severity Badge (4 color variants)
- Incident Type Badge

---

## Appendix A: Content Specifications

### A.1 Page Title & Subtitle

- **Page Title (H1)**: "Safeguarding Reports"
- **Subtitle**: "Review and manage safety concerns and incidents"

### A.2 Urgent Alert Banner

- **Title**: "URGENT SAFEGUARDING REPORT" or "URGENT: [N] CRITICAL REPORTS"
- **Description**: "Report #SR-00423 submitted 35 minutes ago requires immediate review"
- **CTA**: "Review Now"

### A.3 Metric Card Labels

- **Card 1**: "Active Reports" (value: "12 cases", subtext: "Requiring action", breakdown: "New: 3 | Investigating: 7 | Escalated: 2")
- **Card 2**: "Urgent Reports" (value: "2 critical", subtext: "Require immediate review", warning: "1 over 2h SLA")
- **Card 3**: "Resolved This Week" (value: "8 cases", breakdown: "Substantiated: 3 | Unsubstantiated: 4 | Inconclusive: 1")
- **Card 4**: "Avg Response Time" (value: "3.2 hours", status: "On Track", subtext: "Target: <4h for high severity")

### A.4 Table Column Headers

- "Case ID" (sortable)
- "Reporter" (sortable)
- "Reported User" (sortable)
- "Incident Type" (sortable)
- "Severity" (sortable)
- "Status" (sortable)
- "Submitted" (sortable, date)
- "Age" (sortable, relative time)
- "Actions" (not sortable)

### A.5 Empty State Messages

- **No Reports**: "No Safeguarding Reports. All is well! No active safeguarding reports at this time. Last report resolved: 3 days ago by Admin Sarah"
- **No Results from Filter**: "No Reports Found. No reports match your current filters. [Clear All Filters]"

---

## Appendix B: Data API Endpoints

### B.1 Safeguarding Reports API

**Endpoint**: `GET /api/admin/safeguarding`

**Query Parameters**:
```
?search=sarah          // Search by case ID, reporter, reported user, keywords
&type=physical_abuse   // Filter by incident type
&severity=critical     // Filter by severity (critical, high, medium, low)
&status=new            // Filter by status (new, triaging, investigating, escalated, resolved)
&submitted_from=2025-01-01  // Date range: start
&submitted_to=2026-02-11    // Date range: end
&sort_by=submitted     // Sort column (case_id, reporter, severity, status, submitted, age)
&sort_order=desc       // Sort direction (asc, desc)
&page=1                // Pagination: page number
&per_page=20           // Pagination: results per page
```

**Response**:
```json
{
  "reports": [
    {
      "id": "SAF-2026-00423",
      "case_id": "SAF-2026-00423",
      "reporter": {
        "id": "CR-12345",
        "name": "Sarah Johnson",
        "role": "care_receiver",
        "is_anonymous": false
      },
      "reported_user": {
        "id": "CG-67890",
        "name": "John Smith",
        "role": "caregiver",
        "verified": true
      },
      "incident_type": "physical_abuse",
      "severity": "critical",
      "status": "new",
      "submitted_at": "2026-02-11T14:05:00Z",
      "age_hours": 0.58,
      "sla_breached": false
    },
    // ... more reports
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 20,
    "total_pages": 15,
    "total_count": 287
  },
  "summary": {
    "active_reports": 12,
    "urgent_reports": 2,
    "resolved_this_week": 8,
    "avg_response_hours": 3.2,
    "sla_breaches": 1
  }
}
```

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-11 | elderly-care-ux-ui-designer | Initial wireframe for SCR-ADM-014 (Safeguarding Reports Queue) |

---

**STATUS: READY FOR FIGMA HANDOFF**

**END OF DOCUMENT**
