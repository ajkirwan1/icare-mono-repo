# Admin Dashboard Wireframes and Element Inventory (SCR-ADM-001)

**Document Purpose**: Complete wireframes (ASCII) and element inventory for the Admin Dashboard screen, including all three states (default, alert, empty queue).

**Screen ID**: SCR-ADM-001
**Screen Name**: Admin Dashboard
**Route**: `/admin`
**User Roles**: Platform Admin, Safeguarding Officer, Operations Manager
**R0/R1**: R0 (launch-critical)

**Document Owner**: UX/UI Design Team
**Created**: 2026-02-07
**Status**: READY FOR FIGMA HANDOFF

---

## Table of Contents

1. [Screen Purpose](#1-screen-purpose)
2. [Design Strategy](#2-design-strategy)
3. [Entry Points and Navigation](#3-entry-points-and-navigation)
4. [Content Blocks and Hierarchy](#4-content-blocks-and-hierarchy)
5. [Complete Element Inventory](#5-complete-element-inventory)
6. [ASCII Wireframes](#6-ascii-wireframes)
7. [State Coverage](#7-state-coverage)
8. [Responsive Design Notes](#8-responsive-design-notes)
9. [Accessibility Requirements](#9-accessibility-requirements)
10. [Component Reuse](#10-component-reuse)

---

## 1. Screen Purpose

### 1.1 Primary Purpose

The Admin Dashboard serves as the **central command center** for platform operations, enabling administrators to:
- Monitor and respond to urgent safeguarding alerts
- Manage verification queues (identity, right to work, DBS)
- Track platform health metrics
- Review recent system activity
- Access all administrative functions

### 1.2 Key Differences from User Dashboards

Unlike Care Receiver and Caregiver dashboards which focus on personal bookings and earnings:

**Admin Dashboard Characteristics**:
- **Operations-focused**: Queue management, not personal tasks
- **Higher information density**: More data per viewport
- **SLA monitoring**: Time-sensitive verification queue with urgency indicators
- **Safeguarding priority**: High-severity reports front-and-center
- **System-wide view**: Platform health, not individual user journey
- **Different layout pattern**: Dense information display, tabular data, chart widgets

**Visual Tone**:
- Professional/technical (not friendly/conversational)
- Urgent alerts highly visible
- Efficiency over aesthetics (quick scanning, rapid action)

### 1.3 User Context

**Primary Users**:
- Operations Manager: Verification queue, booking oversight
- Safeguarding Officer: Safety reports, user suspensions
- Super Admin: Full platform access, configuration

**Access Pattern**:
- Check multiple times daily for urgent items
- Desktop-first (not mobile-optimized, though responsive fallback exists)
- Focus mode required (high-stakes decisions)

---

## 2. Design Strategy

### 2.1 Admin Dashboard Design Principles

**1. Alert Hierarchy**: Critical alerts (safeguarding, SLA breaches) must be immediately visible.

**2. Action-Oriented**: Every widget leads to a specific action or queue (no passive information).

**3. SLA Transparency**: Verification queue shows time-pending with clear SLA indicators (green/yellow/red).

**4. Professional Aesthetic**: More like internal business tools than consumer-facing product.

**5. Scannable Layout**: Admin can assess platform status in 3-5 seconds.

### 2.2 Dashboard vs Jobs 1-2 (User Dashboards)

| Aspect | Care Receiver/Caregiver Dashboards | Admin Dashboard |
|--------|-----------------------------------|-----------------|
| Layout Density | Generous white space, 2-3 cards | Dense, 6-8 widgets, compact |
| Color Coding | Subtle status badges | Prominent red/yellow/green alerts |
| Navigation | Simple top nav | Sidebar navigation + top nav |
| Data Display | Personal (my bookings) | System-wide (all users) |
| Metrics | Simple counts (3 upcoming) | Complex metrics (trends, SLAs) |
| Interaction | Browsing, planning | Triage, decision-making |

### 2.3 Dashboard Widget Priority

**Top Priority (above fold)**:
1. Urgent Alert Banner (if any safeguarding/SLA issues)
2. Verification Queue Widget (pending caregivers)
3. Safeguarding Monitoring Widget (active reports)

**Mid Priority**:
4. Platform Health Metrics (bookings, users, system status)
5. Recent Activity Log (last 24h system events)

**Lower Priority**:
6. User Activity Summary (registrations, conversions)
7. Revenue & Commission Tracking (if applicable)

---

## 3. Entry Points and Navigation

### 3.1 Entry Points

**How admins arrive at this screen**:
- Direct navigation to `/admin` after login
- Redirect from admin login (role-based routing)
- Return from other admin pages (breadcrumb, logo click)
- Urgent email notification link (e.g., "New safeguarding report" -> lands on dashboard with alert)

**Preconditions**:
- User authenticated as Admin role
- 2FA enabled (mandatory for admin accounts)

### 3.2 Navigation Exits

**From This Dashboard**:

| Element | Destination | Screen ID |
|---------|------------|-----------|
| "Review Queue" button (Verification Widget) | Verification Queue | SCR-ADM-002 (future spec) |
| Verification count link | Verification Queue | SCR-ADM-002 |
| "View Reports" button (Safeguarding Widget) | Safeguarding Reports Queue | SCR-ADM-014 |
| Safeguarding count link | Safeguarding Reports Queue | SCR-ADM-014 |
| Specific verification item | Verification Detail | SCR-ADM-003 (or SCR-ADM-007/008) |
| Specific safeguarding report | Safeguarding Report Detail | SCR-ADM-015 |
| User name link (Activity Log) | User Detail | SCR-ADM-016 |
| "Platform Settings" (nav) | Admin Settings | Future spec |
| "Logout" (user menu) | Login | SCR-AUTH-005 |

**Global Admin Navigation** (sidebar/top nav):
- Dashboard (this screen)
- Verifications
- Safeguarding
- Bookings
- Users
- Disputes (future)
- Analytics (future)
- Audit Log (future)

---

## 4. Content Blocks and Hierarchy

### 4.1 Page Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ TOP: Admin Navigation Header (logo, search, notifications, user)│
├─────────────────────────────────────────────────────────────────┤
│ ALERT BANNER (conditional - only if urgent alerts exist)        │
├─────────────────────────────────────────────────────────────────┤
│ MAIN CONTENT AREA (two-column layout)                           │
│ ┌────────────────────────────┬──────────────────────────────┐  │
│ │ LEFT COLUMN (wider)        │ RIGHT COLUMN (narrower)      │  │
│ │ - Verification Queue Widget│ - Quick Actions Sidebar      │  │
│ │ - Safeguarding Widget      │ - Platform Health Summary    │  │
│ │ - Recent Activity Log      │                              │  │
│ └────────────────────────────┴──────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│ BOTTOM: Footer (links, version, support contact)                │
└──────────────────────────────────────────────────────���──────────┘
```

### 4.2 Content Block Breakdown

**Block 1: Admin Navigation Header** (shared across all admin screens)
- **Purpose**: Global admin navigation and user context
- **Priority**: PRIMARY (always visible)
- **Elements**:
  - Platform logo (link to dashboard)
  - Search bar (users, bookings, verification IDs)
  - Notifications bell icon (unread count badge)
  - Admin user menu (name, role, logout)

**Block 2: Urgent Alert Banner** (conditional)
- **Purpose**: Critical system alerts requiring immediate attention
- **Priority**: PRIMARY (highest visibility)
- **Conditions**: Only shown if urgent alerts exist
- **Types**:
  - Safeguarding report >24h old without action (RED)
  - Verification queue >48h SLA (YELLOW)
  - System outage or payment processing failure (RED)

**Block 3: Verification Queue Widget**
- **Purpose**: Monitor and triage pending caregiver verifications
- **Priority**: PRIMARY (operations core function)
- **Data Displayed**:
  - Total pending verifications (count)
  - Pending by type: Identity, Right to Work, DBS
  - SLA status: "3 over 48h SLA" (in red)
  - Average queue wait time: "18 hours"
- **Action**: "Review Queue" button

**Block 4: Safeguarding Monitoring Widget**
- **Purpose**: Monitor and respond to safety reports
- **Priority**: PRIMARY (legal duty)
- **Data Displayed**:
  - Active safeguarding reports (count)
  - Reports requiring urgent attention (high severity)
  - Recent safeguarding activity timeline (last 7 days)
- **Action**: "View Reports" button

**Block 5: Platform Health Metrics**
- **Purpose**: High-level system status at-a-glance
- **Priority**: SECONDARY (context, not action)
- **Data Displayed**:
  - Active bookings (current count)
  - Bookings this week (trend: ↑5% from last week)
  - Active caregivers (verified, profile complete)
  - Active care receivers (registered, payment added)
  - Platform uptime / system status (green/yellow/red)

**Block 6: User Activity Summary**
- **Purpose**: Track growth and conversion metrics
- **Priority**: SECONDARY (insights, not urgent)
- **Data Displayed**:
  - New caregiver registrations (this week)
  - New care receiver registrations (this week)
  - Total bookings created (this week)
  - Conversion rate: registrations → first booking

**Block 7: Revenue & Commission Tracking** (optional, if applicable)
- **Purpose**: Financial oversight
- **Priority**: TERTIARY (business intelligence)
- **Data Displayed**:
  - Total bookings value (this month)
  - Platform commission (10% of bookings)
  - Pending payouts to caregivers

**Block 8: Recent Activity Log**
- **Purpose**: Real-time system event monitoring
- **Priority**: SECONDARY (audit trail)
- **Data Displayed**:
  - Latest system events (max 10 items)
  - Event types: bookings created, verifications submitted, safeguarding reports
  - Timestamp + event type + user link

**Block 9: Quick Actions Sidebar**
- **Purpose**: Rapid access to common admin tasks
- **Priority**: SECONDARY (shortcuts)
- **Actions**:
  - Review Next Verification
  - Search User
  - View Today's Bookings
  - Emergency Contacts (safeguarding)

---

## 5. Complete Element Inventory

### 5.1 Block 1: Admin Navigation Header

**Elements**:
- **Logo**: iCare logo (link to /admin dashboard)
- **Search Bar**:
  - Input field: "Search users, bookings, or verifications..."
  - Search icon button
  - Dropdown suggestions (real-time)
- **Notifications Bell**:
  - Icon: Bell with badge count (e.g., "3")
  - Dropdown: Recent notifications list
- **Admin User Menu**:
  - Avatar: Admin photo or initials
  - Name: "Admin Sarah"
  - Role badge: "Operations Manager"
  - Dropdown: Profile, Settings, Logout

**Data Sources**:
- Current admin user (session data)
- Unread notification count (notifications API)
- Search results (unified search API)

**Accessibility**:
- Skip navigation link: "Skip to main content"
- Search bar ARIA label: "Search platform"
- Notifications ARIA live region for count updates
- User menu keyboard accessible (Enter to open, Arrow keys to navigate)

---

### 5.2 Block 2: Urgent Alert Banner (Conditional)

**State Conditions**:
- **High Priority (Red)**: Safeguarding report >24h without action, system outage
- **Medium Priority (Yellow)**: Verification queue >48h SLA
- **Low Priority (Blue)**: New feature announcements

**Elements (High Priority Example)**:
- **Icon**: Warning triangle (red)
- **Title**: "URGENT SAFEGUARDING REPORT"
- **Description**: "Report #SR-00423 submitted 35 minutes ago requires immediate review"
- **CTA Button**: "Review Report Now"
- **Dismiss Icon**: X button (close alert)

**Elements (SLA Breach Example)**:
- **Icon**: Clock (yellow)
- **Title**: "SLA BREACH ALERT"
- **Description**: "3 caregiver verifications pending >48 hours"
- **CTA Button**: "Review Queue"
- **Dismiss Icon**: X button

**Data Sources**:
- Safeguarding reports API (filter: urgent=true, unread=true)
- Verification queue API (filter: pending_hours>48)
- System health API (uptime, payment status)

**Accessibility**:
- ARIA role="alert" (screen reader announces immediately)
- ARIA live="assertive" for critical alerts
- Color contrast: 4.5:1 minimum (red on light background)
- Focus trap: Keyboard focus moves to "Review" button on alert appearance

---

### 5.3 Block 3: Verification Queue Widget

**Elements**:
- **Widget Title**: "Verification Queue"
- **Subtitle**: "Caregivers awaiting admin review"
- **Metric Row 1 - Total Pending**:
  - Label: "Pending Verifications"
  - Value: "12 caregivers"
  - Link: (clickable, goes to SCR-ADM-002)
- **Metric Row 2 - Breakdown**:
  - Label: "Identity" | Value: "8 pending"
  - Label: "Right to Work" | Value: "4 pending"
  - Label: "DBS (Voluntary)" | Value: "3 pending"
- **SLA Indicator**:
  - Icon: Red warning if >48h breaches exist
  - Text: "3 over 48h SLA" (red text, bold)
- **Average Wait Time**:
  - Label: "Average Wait Time"
  - Value: "18 hours"
  - Status: "On Track" (green) | "Approaching SLA" (yellow) | "Breached" (red)
- **CTA Button**: "Review Queue" (primary button, links to SCR-ADM-002)

**Data Sources**:
- Verification queue API: `GET /api/admin/verifications/summary`
  - Total pending count
  - Breakdown by type (identity, right_to_work, dbs)
  - SLA breach count (pending_hours > 48)
  - Average wait time calculation

**Interaction States**:
- Default: All metrics displayed
- Loading: Skeleton placeholders
- Error: "Unable to load verification data. Retry?"

**Accessibility**:
- Widget heading: H2 "Verification Queue"
- Metrics: `<dl>` definition list structure
- SLA warning: ARIA label "3 verifications over 48-hour SLA, urgent review required"
- CTA button: 48x48px minimum touch target

---

### 5.4 Block 4: Safeguarding Monitoring Widget

**Elements**:
- **Widget Title**: "Safeguarding Reports"
- **Subtitle**: "Active safety concerns requiring attention"
- **Metric Row 1 - Active Reports**:
  - Label: "Active Reports"
  - Value: "2 cases"
  - Link: (clickable, goes to SCR-ADM-014)
- **Metric Row 2 - Urgent**:
  - Icon: Red warning triangle
  - Label: "Urgent (High Severity)"
  - Value: "1 report"
  - Subtext: "Submitted 35 minutes ago"
- **Recent Activity Timeline** (last 7 days):
  - List item 1: "Feb 6: Report #SR-00421 resolved (outcome: no action)"
  - List item 2: "Feb 5: Report #SR-00420 escalated to SAB"
  - List item 3: "Feb 3: Report #SR-00419 resolved (user suspended)"
  - Link: "View All Activity"
- **CTA Button**: "View Reports" (primary button, links to SCR-ADM-014)

**Data Sources**:
- Safeguarding reports API: `GET /api/admin/safeguarding/summary`
  - Active reports count (status: open, investigating)
  - Urgent reports count (severity: high, critical)
  - Recent activity (last 7 days, limit 3)

**Interaction States**:
- Default: Metrics + timeline displayed
- Empty: "No active safeguarding reports" (green checkmark, positive message)
- Loading: Skeleton placeholders

**Accessibility**:
- Widget heading: H2 "Safeguarding Reports"
- Timeline: `<ul>` with ARIA label "Recent safeguarding activity"
- Urgent indicator: ARIA label "1 urgent report requiring immediate attention"
- CTA button: 48x48px minimum touch target

---

### 5.5 Block 5: Platform Health Metrics

**Elements**:
- **Widget Title**: "Platform Health"
- **Grid Layout**: 2x2 metric cards (4 cards total)
- **Metric Card 1 - Active Bookings**:
  - Icon: Calendar checkmark
  - Label: "Active Bookings"
  - Value: "45 in progress"
  - Subtext: "0 issues"
  - Status: Green indicator
- **Metric Card 2 - Bookings This Week**:
  - Icon: Chart up arrow
  - Label: "Bookings This Week"
  - Value: "67 bookings"
  - Trend: "↑5% from last week" (green text)
- **Metric Card 3 - Active Caregivers**:
  - Icon: User checkmark
  - Label: "Active Caregivers"
  - Value: "89 verified"
  - Subtext: "12 pending"
  - Link: "View All"
- **Metric Card 4 - Active Care Receivers**:
  - Icon: Home
  - Label: "Active Care Receivers"
  - Value: "156 registered"
  - Subtext: "89 payment added"
- **System Status Bar** (below cards):
  - Label: "System Status"
  - Indicator: "All Systems Operational" (green dot)
  - Subtext: "Uptime: 99.8% (last 30 days)"

**Data Sources**:
- Platform metrics API: `GET /api/admin/platform/health`
  - Active bookings count (status: accepted, in_progress)
  - Weekly bookings count + trend vs previous week
  - Caregiver counts (verified, pending)
  - Care receiver counts (registered, payment_method_added)
  - System uptime percentage

**Interaction States**:
- Default: All metrics displayed
- Loading: Skeleton cards
- Error: "Unable to load platform metrics"

**Accessibility**:
- Widget heading: H2 "Platform Health"
- Each metric card: `<article>` with heading and content
- System status: ARIA live="polite" for status changes
- Color-coded status uses icons + text (not color alone)

---

### 5.6 Block 6: User Activity Summary

**Elements**:
- **Widget Title**: "User Activity (This Week)"
- **Metric Row 1 - New Caregivers**:
  - Icon: User plus
  - Label: "New Caregiver Registrations"
  - Value: "18 registrations"
  - Trend: "↑3 from last week" (green)
  - Link: "View All Caregivers"
- **Metric Row 2 - New Care Receivers**:
  - Icon: Home plus
  - Label: "New Care Receiver Registrations"
  - Value: "24 registrations"
  - Trend: "↓2 from last week" (red)
- **Metric Row 3 - Bookings Created**:
  - Icon: Calendar
  - Label: "Total Bookings Created"
  - Value: "67 bookings"
  - Trend: "↑5 from last week" (green)
- **Metric Row 4 - Conversion Rate**:
  - Icon: Chart
  - Label: "Registration → First Booking"
  - Value: "38% conversion"
  - Subtext: "Target: 40%"

**Data Sources**:
- User activity API: `GET /api/admin/users/activity?period=week`
  - Caregiver registrations (this week, last week comparison)
  - Care receiver registrations (this week, last week comparison)
  - Bookings created count
  - Conversion rate calculation (users with ≥1 booking / total registrations)

**Interaction States**:
- Default: All metrics displayed
- Loading: Skeleton rows
- No data: "No user activity this week"

**Accessibility**:
- Widget heading: H2 "User Activity"
- Metrics: Definition list `<dl>` structure
- Trend indicators: Include text + icon (not color alone)

---

### 5.7 Block 7: Revenue & Commission Tracking (Optional)

**Elements** (if feature enabled):
- **Widget Title**: "Revenue Summary (This Month)"
- **Metric Row 1 - Total Bookings Value**:
  - Label: "Total Bookings Value"
  - Value: "£12,450.00"
  - Subtext: "87 bookings"
- **Metric Row 2 - Platform Commission**:
  - Label: "Platform Commission (10%)"
  - Value: "£1,245.00"
  - Trend: "↑8% from last month" (green)
- **Metric Row 3 - Pending Payouts**:
  - Label: "Pending Payouts to Caregivers"
  - Value: "£8,920.50"
  - Subtext: "23 caregivers awaiting payout"
  - Link: "View Payout Queue"

**Data Sources**:
- Revenue API: `GET /api/admin/revenue/summary?period=month`
  - Total bookings value (sum of booking amounts)
  - Platform commission (10% of total)
  - Pending payouts (bookings completed, awaiting payout)

**Note**: This widget may be deprioritized at Tier 1 (founder finance tracking via Stripe dashboard acceptable initially).

---

### 5.8 Block 8: Recent Activity Log

**Elements**:
- **Widget Title**: "Recent Activity"
- **Subtitle**: "Last 24 hours"
- **Activity List** (max 10 items):
  - **List Item Structure**:
    - Timestamp: "Today, 14:32"
    - Admin name: "Admin Sarah" (if admin action)
    - Action: "approved caregiver verification:"
    - Subject: "John Smith (#4523)" (link to user profile)
  - **Example Items**:
    1. "Today, 14:32 | Admin Sarah approved caregiver verification: John Smith (#4523)"
    2. "Today, 14:15 | Booking #7821 completed successfully (Jane D. → Mary K.)"
    3. "Today, 13:47 | Admin Sarah rejected caregiver verification: David Jones (#4522) - ID expired"
    4. "Today, 12:05 | Dispute raised on Booking #7803 by Tom H."
    5. "Today, 11:23 | Admin Sarah resolved dispute on Booking #7789 - Partial refund (50%)"
- **Filter Dropdown**:
  - All activity (default)
  - My actions only
  - Verifications only
  - Bookings only
  - Safeguarding only
- **Link**: "View Full Audit Log" (goes to SCR-ADM-023, future)

**Data Sources**:
- Activity feed API: `GET /api/admin/activity?hours=24&limit=10`
  - System events (bookings, verifications, reports)
  - Admin actions (approvals, rejections, suspensions)
  - User activities (registrations, cancellations)

**Interaction States**:
- Default: 10 most recent items displayed
- Loading: Skeleton list items
- Empty: "No activity in the last 24 hours"

**Accessibility**:
- Widget heading: H2 "Recent Activity"
- List: `<ul>` with ARIA label "Recent platform activity"
- Filter dropdown: Keyboard accessible, ARIA label "Filter activity by type"
- User links: Clear link text (not "click here")

---

### 5.9 Block 9: Quick Actions Sidebar

**Elements**:
- **Heading**: "Quick Actions"
- **Action Button 1**:
  - Icon: Checkmark clipboard
  - Label: "Review Next Verification"
  - Action: Opens oldest pending verification in queue
- **Action Button 2**:
  - Icon: Search magnifying glass
  - Label: "Search User"
  - Action: Focus on global search bar
- **Action Button 3**:
  - Icon: Calendar today
  - Label: "View Today's Bookings"
  - Action: Goes to bookings filtered by today
- **Action Button 4**:
  - Icon: Phone emergency
  - Label: "Emergency Contacts"
  - Action: Opens modal with safeguarding emergency contacts

**Divider**

- **Section Heading**: "Resources"
- **Link 1**: "Safeguarding Policy" (opens policy page)
- **Link 2**: "Admin Guide" (opens documentation)
- **Link 3**: "Contact Support" (opens support modal/email)

**Interaction States**:
- Default: All actions available
- Disabled: "Review Next Verification" disabled if queue empty (with tooltip: "No pending verifications")

**Accessibility**:
- Heading: H2 "Quick Actions"
- Buttons: 48x48px minimum touch targets
- Disabled state: ARIA disabled="true" with tooltip explaining why

---

## 6. ASCII Wireframes

### 6.1 Desktop Layout (1440px+)

#### State 1: Default (Normal Operations)

```
+---------------------------------------------------------------------------------+
|  [Logo]  iCare Admin            [Search: users, bookings...] [🔔 3] [👤 Sarah] |
+---------------------------------------------------------------------------------+
|                                                                                 |
|  +-------------------------------------------------------------------+  +------+|
|  | MAIN CONTENT (Left Column - 70%)                                  |  |RIGHT ||
|  |                                                                   |  |COL   ||
|  |  +--------------------------------------------------------------+ |  |(30%) ||
|  |  | VERIFICATION QUEUE                                           | |  |      ||
|  |  | Caregivers awaiting admin review                             | |  |+-----+||
|  |  |                                                              | |  ||QUICK|||
|  |  | Pending Verifications: 12 caregivers                  [View]| |  ||ACTS |||
|  |  |                                                              | |  ||     |||
|  |  | • Identity: 8 pending                                       | |  ||[📋] |||
|  |  | • Right to Work: 4 pending                                  | |  ||Review|||
|  |  | • DBS (Voluntary): 3 pending                                | |  ||Next  |||
|  |  |                                                              | |  ||Verif |||
|  |  | ⚠️ SLA Status: 3 over 48h SLA (red)                        | |  ||     |||
|  |  | Average Wait: 18 hours | Status: On Track ✓                | |  ||[🔍] |||
|  |  |                                                              | |  ||Search|||
|  |  | [Review Queue] (primary button)                             | |  ||User  |||
|  |  +--------------------------------------------------------------+ |  ||     |||
|  |                                                                   |  ||[📅] |||
|  |  +--------------------------------------------------------------+ |  ||Today |||
|  |  | SAFEGUARDING REPORTS                                         | |  ||Book. |||
|  |  | Active safety concerns requiring attention                    | |  ||     |||
|  |  |                                                              | |  ||[📞] |||
|  |  | Active Reports: 2 cases                               [View]| |  ||Emerg.|||
|  |  |                                                              | |  ||Cont. |||
|  |  | 🚨 Urgent (High Severity): 1 report                         | |  ||     |||
|  |  |    Submitted 35 minutes ago                                 | |  |+-----+||
|  |  |                                                              | |  |      ||
|  |  | Recent Activity (last 7 days):                               | |  |+-----+||
|  |  | • Feb 6: Report #SR-00421 resolved (no action)              | |  ||PLAT |||
|  |  | • Feb 5: Report #SR-00420 escalated to SAB                  | |  ||HLTH |||
|  |  | • Feb 3: Report #SR-00419 resolved (user suspended)         | |  ||     |||
|  |  |   [View All Activity]                                       | |  ||Active|||
|  |  |                                                              | |  ||Book.:|||
|  |  | [View Reports] (primary button)                             | |  ||45 ✓  |||
|  |  +--------------------------------------------------------------+ |  ||     |||
|  |                                                                   |  ||Week: |||
|  |  +--------------------------------------------------------------+ |  ||67 ↑5%|||
|  |  | RECENT ACTIVITY (Last 24 hours)                              | |  ||     |||
|  |  |                                                              | |  ||CGs:  |||
|  |  | Filter: [All activity ▾] [My actions] [Verifications] ...    | |  ||89 ✓  |||
|  |  |                                                              | |  ||     |||
|  |  | Today, 14:32 | Admin Sarah approved caregiver verification: | |  ||CRs:  |||
|  |  |                John Smith (#4523)                           | |  ||156   |||
|  |  |                                                              | |  ||     |||
|  |  | Today, 14:15 | Booking #7821 completed successfully          | |  ||Status|||
|  |  |                (Jane D. → Mary K.)                          | |  ||All ✓ |||
|  |  |                                                              | |  |+-----+||
|  |  | Today, 13:47 | Admin Sarah rejected caregiver verification: | |  |      ||
|  |  |                David Jones (#4522) - ID expired             | |  |      ||
|  |  |                                                              | |  |      ||
|  |  | Today, 12:05 | Dispute raised on Booking #7803 by Tom H.   | |  |      ||
|  |  |                                                              | |  |      ||
|  |  | Today, 11:23 | Admin Sarah resolved dispute on Booking #7789| |  |      ||
|  |  |                - Partial refund (50%)                       | |  |      ||
|  |  |                                                              | |  |      ||
|  |  | ... (5 more items)                                          | |  |      ||
|  |  |                                                              | |  |      ||
|  |  | [View Full Audit Log]                                       | |  |      ||
|  |  +--------------------------------------------------------------+ |  |      ||
|  +-------------------------------------------------------------------+  +------+|
|                                                                                 |
+---------------------------------------------------------------------------------+
|  Footer: About | Privacy | Terms | Support | Version 1.0.0                     |
+---------------------------------------------------------------------------------+
```

**Key Layout Notes**:
- Two-column layout: 70% main content, 30% right sidebar
- Verification Queue at top (highest priority)
- Safeguarding Reports below (second priority)
- Recent Activity fills remaining left column space
- Right sidebar: Quick Actions above Platform Health

---

#### State 2: Alert State (Urgent Safeguarding Report)

```
+---------------------------------------------------------------------------------+
|  [Logo]  iCare Admin            [Search: users, bookings...] [🔔 5] [👤 Sarah] |
+---------------------------------------------------------------------------------+
| 🚨 URGENT SAFEGUARDING REPORT                                          [X]     |
| Report #SR-00423 submitted 35 minutes ago requires immediate review            |
| [Review Report Now] (red button, prominent)                                    |
+---------------------------------------------------------------------------------+
|                                                                                 |
|  +-------------------------------------------------------------------+  +------+|
|  | MAIN CONTENT                                                      |  |RIGHT ||
|  |                                                                   |  |COL   ||
|  |  (Same layout as State 1, but alert banner pushes content down)  |  |      ||
|  |                                                                   |  |      ||
|  |  VERIFICATION QUEUE widget...                                     |  |QUICK ||
|  |  SAFEGUARDING REPORTS widget...                                   |  |ACTS  ||
|  |  RECENT ACTIVITY widget...                                        |  |...   ||
|  |                                                                   |  |      ||
|  +-------------------------------------------------------------------+  +------+|
|                                                                                 |
+---------------------------------------------------------------------------------+
```

**Alert Banner Specifications**:
- **Background**: Red (#FEE2E2 light red)
- **Border**: Red left border (4px, #DC2626)
- **Icon**: Warning triangle (red)
- **Typography**:
  - Title: 18px bold, red (#DC2626)
  - Description: 16px regular, dark gray
- **CTA Button**: Red background (#DC2626), white text, 48px height
- **Close Icon**: X button, top-right, accessible
- **Height**: Auto-height to fit content, minimum 80px

**Variations**:
- **SLA Breach Alert** (Yellow):
  - Background: Yellow (#FEF3C7)
  - Border: Orange (#F59E0B)
  - Title: "SLA BREACH ALERT"
  - Description: "3 caregiver verifications pending >48 hours"
  - CTA: "Review Queue" (orange button)

---

#### State 3: Empty Queue State (All Clear)

```
+---------------------------------------------------------------------------------+
|  [Logo]  iCare Admin            [Search: users, bookings...] [🔔 0] [👤 Sarah] |
+---------------------------------------------------------------------------------+
|                                                                                 |
|  +-------------------------------------------------------------------+  +------+|
|  | MAIN CONTENT                                                      |  |RIGHT ||
|  |                                                                   |  |COL   ||
|  |  +--------------------------------------------------------------+ |  |      ||
|  |  | VERIFICATION QUEUE                                           | |  |QUICK ||
|  |  | Caregivers awaiting admin review                             | |  |ACTS  ||
|  |  |                                                              | |  |...   ||
|  |  | ✅ All Clear! No pending verifications.                     | |  |      ||
|  |  |                                                              | |  |PLAT  ||
|  |  | Pending Verifications: 0 caregivers                          | |  |HLTH  ||
|  |  |                                                              | |  |...   ||
|  |  | Last verification reviewed: 2 hours ago by Admin Sarah       | |  |      ||
|  |  |                                                              | |  |      ||
|  |  | [View Queue] (secondary button, low emphasis)               | |  |      ||
|  |  +--------------------------------------------------------------+ |  |      ||
|  |                                                                   |  |      ||
|  |  +--------------------------------------------------------------+ |  |      ||
|  |  | SAFEGUARDING REPORTS                                         | |  |      ||
|  |  | Active safety concerns requiring attention                    | |  |      ||
|  |  |                                                              | |  |      ||
|  |  | ✅ No active safeguarding reports.                          | |  |      ||
|  |  |                                                              | |  |      ||
|  |  | Active Reports: 0 cases                                      | |  |      ||
|  |  |                                                              | |  |      ||
|  |  | Recent Activity (last 7 days):                               | |  |      ||
|  |  | • Feb 6: Report #SR-00421 resolved (no action)              | |  |      ||
|  |  | • Feb 5: Report #SR-00420 escalated to SAB                  | |  |      ||
|  |  |                                                              | |  |      ||
|  |  | [View Reports] (secondary button)                           | |  |      ||
|  |  +--------------------------------------------------------------+ |  |      ||
|  |                                                                   |  |      ||
|  |  (Recent Activity continues as normal)                            |  |      ||
|  +-------------------------------------------------------------------+  +------+|
|                                                                                 |
+---------------------------------------------------------------------------------+
```

**Empty State Specifications**:
- **Icon**: Green checkmark (large, 48px)
- **Message**: "All Clear! No pending verifications." (18px, green text)
- **Subtext**: "Last verification reviewed: X hours ago by [Admin Name]"
- **Tone**: Positive, reassuring (not alarming)
- **Button**: Secondary style (low emphasis, since no action needed)

---

### 6.2 Tablet Layout (768px - 1439px)

```
+---------------------------------------------------------------+
|  [Logo] iCare Admin    [🔍] [🔔 3] [👤]                      |
+---------------------------------------------------------------+
| 🚨 URGENT ALERT (if present)                          [X]    |
| [Review Now]                                                  |
+---------------------------------------------------------------+
|                                                               |
| +-----------------------------------------------------------+ |
| | VERIFICATION QUEUE                                        | |
| | Pending: 12 caregivers                            [View] | |
| |                                                           | |
| | • Identity: 8  • Right to Work: 4  • DBS: 3              | |
| |                                                           | |
| | ⚠️ 3 over 48h SLA | Avg: 18h                             | |
| |                                                           | |
| | [Review Queue]                                           | |
| +-----------------------------------------------------------+ |
|                                                               |
| +-----------------------------------------------------------+ |
| | SAFEGUARDING REPORTS                                      | |
| | Active: 2 cases                                   [View] | |
| |                                                           | |
| | 🚨 Urgent: 1 report (35 min ago)                         | |
| |                                                           | |
| | Recent Activity:                                          | |
| | • Feb 6: #SR-00421 resolved                              | |
| | • Feb 5: #SR-00420 escalated                             | |
| |                                                           | |
| | [View Reports]                                           | |
| +-----------------------------------------------------------+ |
|                                                               |
| +-------------------------+  +------------------------------+ |
| | PLATFORM HEALTH         |  | USER ACTIVITY                | |
| | Active Bookings: 45     |  | New CGs: 18                  | |
| | This Week: 67 ↑5%       |  | New CRs: 24                  | |
| | CGs: 89 ✓ | CRs: 156    |  | Bookings: 67 ↑5%             | |
| +-------------------------+  +------------------------------+ |
|                                                               |
| +-----------------------------------------------------------+ |
| | RECENT ACTIVITY                                           | |
| | Filter: [All ▾]                                           | |
| |                                                           | |
| | Today, 14:32 | Admin Sarah approved verification...       | |
| | Today, 14:15 | Booking #7821 completed...                  | |
| | ... (5 more items)                                        | |
| |                                                           | |
| | [View Full Log]                                          | |
| +-----------------------------------------------------------+ |
|                                                               |
+---------------------------------------------------------------+
```

**Tablet Layout Notes**:
- Single column layout (no right sidebar)
- Verification Queue and Safeguarding widgets stack vertically (full width)
- Platform Health and User Activity: 2-column grid (side-by-side)
- Recent Activity: Full width, below metrics
- Quick Actions: Moved to hamburger menu or bottom navigation

---

### 6.3 Mobile Layout (320px - 767px)

```
+-----------------------------+
| [☰] iCare Admin   [🔔3][👤]|
+-----------------------------+
| 🚨 URGENT ALERT       [X]  |
| [Review Now]               |
+-----------------------------+
|                            |
| +--------------------------+|
| | VERIFICATION QUEUE       ||
| | Pending: 12 caregivers   ||
| |                          ||
| | ⚠️ 3 over 48h SLA        ||
| |                          ||
| | [Review Queue]           ||
| +--------------------------+|
|                            |
| +--------------------------+|
| | SAFEGUARDING REPORTS     ||
| | Active: 2 cases          ||
| |                          ||
| | 🚨 1 urgent (35 min ago) ||
| |                          ||
| | [View Reports]           ||
| +--------------------------+|
|                            |
| +--------------------------+|
| | PLATFORM HEALTH          ||
| | Active: 45               ||
| | Week: 67 ↑5%             ||
| | CGs: 89 | CRs: 156       ||
| +--------------------------+|
|                            |
| +--------------------------+|
| | RECENT ACTIVITY          ||
| | [All ▾]                  ||
| |                          ||
| | 14:32 | Sarah approved..||
| | 14:15 | Booking #7821...||
| | ... (3 more items)       ||
| |                          ||
| | [View Full Log]          ||
| +--------------------------+|
|                            |
+-----------------------------+
```

**Mobile Layout Notes**:
- Hamburger menu for navigation (admin sidebar collapsed)
- All widgets stack vertically (single column)
- Condensed widget content (only most critical info)
- Recent Activity: Show 3 items max (not 10)
- Touch targets: 48px minimum (buttons, links)
- Fewer metrics per widget (prioritize what's visible)

**Mobile Interaction Notes**:
- Admin dashboard primarily desktop-only (mobile fallback acceptable)
- Critical actions still functional (review queue, view reports)
- Full audit log, detailed metrics require desktop

---

## 7. State Coverage

### 7.1 All Required States

| State Name | Condition | Visual Changes | Components Affected |
|------------|----------|----------------|---------------------|
| **Default** | Normal operations, no urgent alerts | Standard layout, all widgets visible | All blocks |
| **Alert (Safeguarding)** | Urgent safeguarding report exists | Red alert banner at top | Alert Banner (new), content pushed down |
| **Alert (SLA Breach)** | Verification queue >48h SLA | Yellow alert banner at top | Alert Banner, Verification Widget (red SLA indicator) |
| **Empty Queue** | No pending verifications | Green checkmark, positive message in Verification Widget | Verification Widget only |
| **No Safeguarding Reports** | No active reports | Green checkmark, positive message in Safeguarding Widget | Safeguarding Widget only |
| **Loading** | Initial page load | Skeleton placeholders for all widgets | All blocks |
| **Error** | API failure | Error message with retry button | Affected widgets |

### 7.2 State Transition Diagram

```
┌─────────────┐
│   LOADING   │ (Initial page load)
└──────┬──────┘
       ↓
┌──────────────────┐
│    DEFAULT       │ (Normal operations)
└────┬─────────┬───┘
     │         │
     │         ↓
     │   ┌────────────────┐
     │   │ ALERT STATE    │ (Urgent reports or SLA breach)
     │   │ - Safeguarding │
     │   │ - SLA Breach   │
     │   └────────┬───────┘
     │            │
     │            ↓
     │   ┌────────────────┐
     ├──→│ EMPTY QUEUE    │ (All verifications reviewed)
     │   └────────────────┘
     │
     ↓
┌────────────────┐
│     ERROR      │ (API failure)
│ [Retry]        │
└────────────────┘
```

### 7.3 State-Specific Element Changes

**Default State**:
- Alert Banner: Hidden
- Verification Widget: Standard display with counts
- Safeguarding Widget: Standard display with counts
- All other widgets: Standard display

**Alert State (Safeguarding)**:
- Alert Banner: Visible (red background, urgent message)
- Safeguarding Widget: Urgent indicator prominent
- Notifications Bell: Badge count increases
- Screen reader: Immediate announcement of alert

**Alert State (SLA Breach)**:
- Alert Banner: Visible (yellow background, SLA warning)
- Verification Widget: Red SLA text, bold "3 over 48h SLA"
- Notifications Bell: Badge count increases

**Empty Queue State**:
- Verification Widget: Green checkmark, "All Clear!" message
- Button: Secondary style (low emphasis)
- Recent Activity: Shows last verification reviewed time/admin

**Loading State**:
- All widgets: Skeleton placeholders (gray boxes)
- Buttons: Disabled
- No interactive elements until data loads

**Error State**:
- Affected widget: Red border, error icon
- Message: "Unable to load [widget name]. [Retry]"
- Other widgets: Continue displaying (graceful degradation)

---

## 8. Responsive Design Notes

### 8.1 Breakpoint Strategy

| Breakpoint | Width | Layout | Notes |
|------------|-------|--------|-------|
| **Desktop** | 1440px+ | Two-column (70/30 split) | Primary admin experience |
| **Desktop Small** | 1024px - 1439px | Two-column (65/35 split) | Slightly narrower columns |
| **Tablet** | 768px - 1023px | Single column, stacked widgets | Quick Actions to menu |
| **Mobile** | 320px - 767px | Single column, condensed | Minimal content, touch-optimized |

### 8.2 Responsive Layout Changes

**Desktop → Tablet**:
- Right sidebar collapses (Quick Actions → hamburger menu)
- Verification Queue: Full width
- Safeguarding: Full width
- Platform Health + User Activity: 2-column grid (side-by-side)
- Recent Activity: Full width

**Tablet → Mobile**:
- All widgets: Single column, full width
- Widget content: Condensed (fewer metrics visible)
- Recent Activity: 3 items max (instead of 10)
- Navigation: Hamburger menu (all nav items)
- Font sizes: Slightly larger for readability (18px body)

### 8.3 Touch Target Sizing

**Minimum Touch Targets** (per accessibility guidelines for elderly users):
- **Buttons**: 48x48px minimum (primary actions: 48x56px)
- **Links**: 44x44px minimum clickable area
- **Dropdown selectors**: 48px height
- **Icon buttons**: 48x48px (e.g., close alert X button)

**Mobile-Specific**:
- Increase padding around touch elements (8px minimum)
- Avoid adjacent clickable elements <8px apart
- Large CTAs: 56px height on mobile

---

## 9. Accessibility Requirements

### 9.1 WCAG 2.1 AA Compliance

**Screen-Level Requirements**:

**Perceivable**:
- [ ] All alert banners have text alternatives (not color alone)
- [ ] SLA warnings include text + icon (not just red color)
- [ ] All metrics have descriptive labels
- [ ] Graphs/charts (if added) have text alternatives
- [ ] Color contrast: 4.5:1 for normal text, 3:1 for large text/icons

**Operable**:
- [ ] Full keyboard navigation (Tab, Shift+Tab, Enter, Escape)
- [ ] Focus visible on all interactive elements (2px blue outline)
- [ ] Skip link: "Skip to main content" at page top
- [ ] No keyboard traps (can escape all modals/dropdowns)
- [ ] Alert banners do not auto-dismiss (require user action)

**Understandable**:
- [ ] Page title: "Admin Dashboard - iCare Platform"
- [ ] Heading hierarchy: H1 (page title), H2 (widget titles), H3 (subsections)
- [ ] Form labels associated with inputs (global search)
- [ ] Error messages clear and actionable ("Unable to load verifications. Retry?")

**Robust**:
- [ ] Semantic HTML (header, nav, main, section, article, footer)
- [ ] ARIA landmarks: role="banner", role="main", role="complementary"
- [ ] ARIA live regions for alerts (alert banners, notification badge)
- [ ] Works with screen readers (NVDA, JAWS, VoiceOver tested)

### 9.2 Focus Order

**Keyboard Navigation Sequence**:
1. Skip link ("Skip to main content")
2. Logo (link to dashboard)
3. Global search bar
4. Notifications bell (opens dropdown)
5. User menu (opens dropdown)
6. Alert banner (if present): "Review Now" button
7. Verification Queue: "Review Queue" button
8. Safeguarding Reports: "View Reports" button
9. Platform Health metrics (non-interactive, skip)
10. Recent Activity: Filter dropdown
11. Recent Activity: User links (first item)
12. Recent Activity: "View Full Log" link
13. Quick Actions: "Review Next Verification"
14. Quick Actions: "Search User"
15. Quick Actions: "View Today's Bookings"
16. Quick Actions: "Emergency Contacts"
17. Footer links

**Focus Indicators**:
- 2px solid blue outline (#2563EB)
- Offset: 2px from element edge
- Visible on all interactive elements (buttons, links, inputs)

### 9.3 Screen Reader Annotations

**Key Elements**:

**Alert Banner** (Urgent Safeguarding):
- Role: `role="alert"` (ARIA live region)
- ARIA live: `aria-live="assertive"` (announces immediately)
- ARIA label: "Urgent safeguarding alert. Report number SR-00423 submitted 35 minutes ago requires immediate review. Review report now button."

**Verification Queue Widget**:
- Heading: H2 "Verification Queue"
- Metrics: `<dl>` definition list
  - `<dt>Pending Verifications</dt><dd>12 caregivers</dd>`
- SLA warning:
  - ARIA label: "Warning: 3 verifications over 48-hour service level agreement. Urgent review required."

**Safeguarding Widget**:
- Heading: H2 "Safeguarding Reports"
- Urgent indicator:
  - ARIA label: "Urgent: 1 high severity report submitted 35 minutes ago."

**Recent Activity**:
- List: `<ul>` with ARIA label "Recent platform activity in the last 24 hours"
- Each item: `<li>` with timestamp and description

**Platform Health**:
- Each metric card: `<article>` with heading
- Status indicator: ARIA label "All systems operational"

### 9.4 Color Contrast Compliance

**Text on Background**:
- Dark text (#0F172A) on light background (#F7F7F2): **15:1 ratio** ✅
- Muted text (rgba(15,23,42,0.72)) on light: **5.2:1 ratio** ✅
- White text on red button (#DC2626): **5.1:1 ratio** ✅
- White text on green (#22C55E): **3.8:1 ratio** (use darker green #16A34A for 4.5:1) ⚠️

**Status Indicators**:
- Red SLA warning (#DC2626) on light background: **5.8:1** ✅
- Green success (#22C55E) on light background: **3.1:1** (add icon + text, not color alone) ⚠️
- Yellow warning (#F59E0B) on light background: **3.2:1** (add icon + text, not color alone) ⚠️

**Solution**: All status indicators include icon + text, not color alone (meets WCAG success criterion).

---

## 10. Component Reuse

### 10.1 Shared Components (from Jobs 1-2)

**Components Reused from Care Receiver/Caregiver Dashboards**:

1. **Navigation Header**:
   - Modified: Admin-specific search, role badge, admin menu
   - Shared: Logo, notifications bell, user menu structure

2. **Status Badge**:
   - Same component from booking cards
   - Statuses: SLA status (On Track, Approaching, Breached), system status (Operational, Degraded, Down)

3. **Empty State Pattern**:
   - Same structure as empty booking lists
   - Icon: Checkmark (instead of illustration)
   - Message: Positive tone

### 10.2 Admin-Specific Components (New)

**Components Unique to Admin Dashboard**:

1. **Urgent Alert Banner**:
   - Variants: Safeguarding (red), SLA breach (yellow), system alert (red), info (blue)
   - Props: Icon, title, description, CTA button, dismiss button
   - States: Default, hover (CTA button), dismissed (hidden)

2. **Metric Widget Card**:
   - Layout: Vertical, with title, value, subtext, link
   - Variants: Standard, with SLA indicator, with trend arrow
   - Props: Title, value, status (green/yellow/red), link

3. **Activity Feed Item**:
   - Layout: Horizontal, timestamp + admin/user + action + subject
   - Props: Timestamp, actor (admin/user), action verb, subject (link)
   - States: Default, hover (subject link)

4. **Quick Action Button**:
   - Layout: Icon + label, vertical or horizontal
   - Variants: Enabled, disabled (with tooltip)
   - Props: Icon, label, action (onClick handler)

5. **Admin Navigation Sidebar** (for larger admin section):
   - List of admin sections: Dashboard, Verifications, Safeguarding, Bookings, Users, etc.
   - Active state indicator
   - Collapsible on tablet/mobile

---

## 11. Design Notes for Figma Designer

### 11.1 Key Design Considerations

**1. Information Hierarchy**:
- Urgent alerts must dominate (red banner, top of page)
- Verification queue and safeguarding widgets are equal priority (side-by-side if space allows)
- Metrics are context (secondary visual weight)

**2. Tone and Aesthetics**:
- **Professional, not playful**: Admin dashboard is serious business tool
- **Efficient, not decorative**: Minimize visual flourishes, maximize data density
- **Clear, not clever**: Labels and CTAs should be obvious (no cute copy)

**3. Color-Coding Strategy**:
- **Red**: Urgent/critical (safeguarding, SLA breaches, errors)
- **Yellow/Orange**: Warning (approaching SLA, medium priority)
- **Green**: Success/healthy (all clear, on track, operational)
- **Blue**: Info (new features, neutral notices)
- **Gray**: Neutral/inactive (disabled states, secondary content)

**4. Layout Density**:
- Admin dashboard can be denser than user dashboards (more data per screen)
- Aim for "dashboard at a glance" (admin assesses status in 3-5 seconds)
- Balance: Not cluttered, but more compact than consumer UI

**5. Interaction Patterns**:
- Hover states on all links/buttons (cursor change, subtle background change)
- Loading states: Skeleton placeholders (not spinners, too distracting)
- Error states: Red border, error icon, retry button

### 11.2 Figma File Structure Suggestions

**Pages**:
1. Admin Dashboard - Default State (1440px desktop)
2. Admin Dashboard - Alert State (Safeguarding)
3. Admin Dashboard - Alert State (SLA Breach)
4. Admin Dashboard - Empty Queue State
5. Admin Dashboard - Tablet (768px)
6. Admin Dashboard - Mobile (375px)

**Components to Create** (in Design System):
- Alert Banner (variants: safeguarding, SLA, info)
- Metric Widget Card (variants: standard, SLA indicator, trend)
- Activity Feed Item
- Quick Action Button
- Admin Navigation Header
- Admin Sidebar Navigation (for future admin screens)

**Design Tokens to Use** (from existing `_tokens.scss`):
- Background: #F7F7F2
- Secondary: #B0C47F (sage green)
- Tertiary: #E79961 (terracotta)
- Text: #0F172A
- Success: #22C55E (or darker #16A34A for contrast)
- Error: #DC2626
- Warning: #F59E0B
- Border radius: 12px (sm), 18px (lg)
- Spacing: 8px, 16px, 24px, 32px

### 11.3 Missing Content (to be filled during design)

**Content Gaps** (can use placeholder):
- Alert banner copy (safeguarding vs SLA breach) - provided in element inventory
- Metric labels (Platform Health, User Activity) - provided in element inventory
- Activity feed item examples - provided in wireframes
- Quick Actions labels - provided in element inventory

**Content Decisions** (for product team):
- What revenue metrics to show (if any) - marked optional in spec
- What filters for Recent Activity - provided (All, My actions, Verifications, Bookings, Safeguarding)
- Emergency contacts list - not specified (placeholder: "View Emergency Contacts")

---

## 12. Next Steps

### 12.1 Pre-Design Checklist

**Before Figma Work Begins**:
- [x] Wireframes complete (this document)
- [x] Element inventory complete
- [x] All states defined (default, alert, empty)
- [x] Responsive layouts documented
- [x] Accessibility requirements listed
- [ ] Product team review of wireframes (approval required)
- [ ] Content specifications finalized (copy for alerts, metrics, labels)
- [ ] Design tokens formalized (Job 7 from Figma Production Plan)

### 12.2 Figma Designer Deliverables

**Expected Outputs**:
1. **Low-Fidelity Mockups** (Phase 1):
   - Desktop default state
   - Desktop alert state (2 variants)
   - Desktop empty queue state
   - Tablet layout
   - Mobile layout
2. **High-Fidelity Designs** (Phase 2):
   - All states with final visual design
   - Component library (alert banner, metric card, activity item, quick action button)
   - Annotations for developers
   - Accessibility notes (focus order, ARIA labels)
3. **Developer Handoff**:
   - Assets export (icons, images)
   - Design specs (spacing, colors, typography)
   - Component documentation (props, states, variants)

### 12.3 Open Questions for Product Team

**Questions to Resolve**:
1. **Revenue Metrics**: Should Admin Dashboard show revenue/commission at Tier 1, or defer to Stripe dashboard?
2. **Quick Actions Priority**: Are these 4 quick actions the right set, or should we include others?
3. **Activity Feed Filter Options**: Are 5 filters (All, My actions, Verifications, Bookings, Safeguarding) sufficient?
4. **Emergency Contacts Modal**: What contacts should be listed (safeguarding hotline, police, local SABs)?

---

## Appendix A: Content Specifications

### A.1 Alert Banner Copy

**Safeguarding Alert (High Priority)**:
- **Title**: "URGENT SAFEGUARDING REPORT"
- **Description**: "Report #[ID] submitted [time] ago requires immediate review"
- **CTA**: "Review Report Now"

**SLA Breach Alert (Medium Priority)**:
- **Title**: "SLA BREACH ALERT"
- **Description**: "[N] caregiver verifications pending >48 hours"
- **CTA**: "Review Queue"

**System Alert (High Priority)**:
- **Title**: "SYSTEM ALERT"
- **Description**: "Payment processing is currently unavailable. [Issue description]"
- **CTA**: "View System Status"

### A.2 Metric Labels

**Verification Queue**:
- Widget Title: "Verification Queue"
- Subtitle: "Caregivers awaiting admin review"
- Pending label: "Pending Verifications"
- SLA warning: "[N] over 48h SLA"
- Average wait: "Average Wait Time"
- Status labels: "On Track" (green), "Approaching SLA" (yellow), "Breached" (red)

**Safeguarding Reports**:
- Widget Title: "Safeguarding Reports"
- Subtitle: "Active safety concerns requiring attention"
- Active reports: "Active Reports"
- Urgent: "Urgent (High Severity)"
- Recent activity: "Recent Activity (last 7 days)"

**Platform Health**:
- Widget Title: "Platform Health"
- Active bookings: "Active Bookings"
- Bookings week: "Bookings This Week"
- Caregivers: "Active Caregivers"
- Care receivers: "Active Care Receivers"
- System status: "System Status"
- Uptime: "Uptime: [%] (last 30 days)"

**User Activity**:
- Widget Title: "User Activity (This Week)"
- New CGs: "New Caregiver Registrations"
- New CRs: "New Care Receiver Registrations"
- Bookings: "Total Bookings Created"
- Conversion: "Registration → First Booking"

### A.3 Button Labels

**Primary Actions**:
- "Review Queue" (Verification Widget)
- "View Reports" (Safeguarding Widget)
- "Review Report Now" (Alert Banner)
- "Review Next Verification" (Quick Actions)

**Secondary Actions**:
- "View All Activity"
- "View Full Audit Log"
- "Search User"
- "View Today's Bookings"
- "Emergency Contacts"

---

## Appendix B: Data API Endpoints

### B.1 Dashboard Summary API

**Endpoint**: `GET /api/admin/dashboard/summary`

**Response**:
```json
{
  "verifications": {
    "total_pending": 12,
    "identity_pending": 8,
    "right_to_work_pending": 4,
    "dbs_pending": 3,
    "sla_breaches": 3,
    "average_wait_hours": 18,
    "status": "on_track" // "on_track" | "approaching" | "breached"
  },
  "safeguarding": {
    "active_reports": 2,
    "urgent_reports": 1,
    "urgent_report_details": {
      "id": "SR-00423",
      "submitted_at": "2026-02-07T14:05:00Z",
      "severity": "high"
    },
    "recent_activity": [
      {
        "date": "2026-02-06",
        "report_id": "SR-00421",
        "outcome": "resolved_no_action"
      }
    ]
  },
  "platform_health": {
    "active_bookings": 45,
    "bookings_this_week": 67,
    "bookings_trend": 5, // percentage change from last week
    "active_caregivers": 89,
    "pending_caregivers": 12,
    "active_care_receivers": 156,
    "payment_method_added": 89,
    "system_status": "operational", // "operational" | "degraded" | "down"
    "uptime_percentage": 99.8
  },
  "user_activity": {
    "new_caregivers_this_week": 18,
    "new_caregivers_trend": 3,
    "new_care_receivers_this_week": 24,
    "new_care_receivers_trend": -2,
    "bookings_created_this_week": 67,
    "conversion_rate": 38 // percentage
  },
  "revenue": { // optional, if feature enabled
    "bookings_value_this_month": 12450.00,
    "commission": 1245.00,
    "pending_payouts": 8920.50
  },
  "alerts": [
    {
      "type": "safeguarding",
      "severity": "high",
      "message": "Report #SR-00423 submitted 35 minutes ago requires immediate review",
      "action_url": "/admin/safeguarding/SR-00423"
    }
  ]
}
```

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-07 | elderly-care-ux-ui-designer | Initial wireframes and element inventory for SCR-ADM-001 |

---

**END OF DOCUMENT**
