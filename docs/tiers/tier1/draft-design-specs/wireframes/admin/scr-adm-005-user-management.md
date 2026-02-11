# User Management Dashboard Wireframe (SCR-ADM-005)

**Document Purpose**: Complete wireframe specification and element inventory for the Admin User Management Dashboard, enabling admins to search, filter, view, and manage all platform users.

**Screen ID**: SCR-ADM-005
**Screen Name**: User Management Dashboard
**Route**: `/admin/users`
**User Roles**: Admin (Operations Manager, Super Admin)
**R0/R1**: R0 (launch-critical admin functionality)

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

The User Management Dashboard provides admins with a centralized interface to:
- View all platform users (care receivers, family members, caregivers) in a searchable, filterable table
- Monitor user account statuses (active, suspended, pending verification)
- Perform bulk and individual user actions (suspend, reactivate, view details)
- Track user registration trends and platform growth
- Quickly access individual user detail pages for deeper investigation

### 1.2 Key User Tasks

**Primary Tasks**:
1. Search for specific user by name, email, or user ID
2. Filter users by role (care receiver, caregiver, family member) and status (active, suspended, pending)
3. View user summary information (name, role, registration date, last active, status)
4. Suspend or reactivate user accounts
5. Navigate to individual user detail pages (SCR-ADM-016, future R1 screen)
6. Export user lists for reporting (future enhancement)

**Context of Use**:
- Admin needs to investigate specific user following a report or inquiry
- Admin performs regular user account audits
- Admin identifies inactive users or suspended accounts for review
- Admin monitors new registrations and verification progress

### 1.3 Relationship to Other Admin Screens

**Within Admin Section**:
- **SCR-ADM-001** (Admin Dashboard): Links to this screen via "View All Users" or user count metric
- **SCR-ADM-007** (Verification Queue): Displays caregivers pending verification (subset of users)
- **SCR-ADM-016** (User Detail View, R1): Individual user profile accessed from this table
- **SCR-ADM-014** (Safeguarding Reports): May link to specific users from this screen

**Navigation Pattern**: Admin Dashboard → User Management → User Detail

---

## 2. Entry Points and Navigation

### 2.1 Entry Points

**How admins arrive at this screen**:
- From Admin Dashboard (SCR-ADM-001): Click "View All Users" link in Platform Health widget
- From Admin Navigation: Click "Users" in global admin sidebar
- From Safeguarding Report (SCR-ADM-014): Click user name link to view all users (with user ID pre-filled in search)
- From Verification Queue (SCR-ADM-007): Click "View All Caregivers" to filter table to caregivers
- Direct URL navigation: `/admin/users`

**Preconditions**:
- User authenticated as Admin role
- 2FA enabled (mandatory for admin accounts)
- Admin has "user_management" permission (role-based access)

### 2.2 Navigation Exits

**From This Screen**:

| Element | Destination | Screen ID |
|---------|------------|-----------|
| User name link (table row) | User Detail View | SCR-ADM-016 (R1) |
| Admin Dashboard link (breadcrumb) | Admin Dashboard | SCR-ADM-001 |
| Verification Queue link (sidebar) | Verification Queue | SCR-ADM-007 |
| Safeguarding Reports link (sidebar) | Safeguarding Reports Queue | SCR-ADM-014 |
| Logout (user menu) | Login | SCR-AUTH-005 |

**Global Admin Navigation** (sidebar):
- Dashboard (SCR-ADM-001)
- Users (this screen)
- Verifications (SCR-ADM-007)
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
│ BREADCRUMB: Dashboard > Users                                   │
├─────────────────────────────────────────────────────────────────┤
│ PAGE TITLE: User Management                                     │
│ SUBTITLE: View and manage all platform users                    │
├─────────────────────────────────────────────────────────────────┤
│ FILTER & SEARCH BAR                                             │
│ - Search input, Role filter, Status filter, Date range          │
├─────────────────────────────────────────────────────────────────┤
│ SUMMARY METRICS (4 cards)                                       │
│ - Total Users, Active Users, Suspended Users, New This Week     │
├─────────────────────────────────────────────────────────────────┤
│ USER TABLE (main content)                                       │
│ - Columns: Avatar, Name, Role, Status, Registered, Last Active  │
│ - Actions: Suspend/Reactivate, View Details                     │
│ - Pagination controls at bottom                                 │
├─────────────────────────────────────────────────────────────────┤
│ FOOTER: Standard global footer                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Content Block Breakdown

**Block 1: Admin Navigation Header** (shared component)
- **Purpose**: Global admin navigation
- **Priority**: PRIMARY (always visible)
- **Elements**: Logo, search bar (global), notifications bell, admin user menu
- **Component Reference**: `NAV-HEADER-AUTH` with `role: "admin"`

**Block 2: Breadcrumb Navigation**
- **Purpose**: Show navigation path, allow quick return to Dashboard
- **Priority**: SECONDARY (context)
- **Elements**: "Dashboard" link > "Users" (current page)

**Block 3: Page Title & Subtitle**
- **Purpose**: Clearly identify screen purpose
- **Priority**: PRIMARY
- **Elements**:
  - H1: "User Management"
  - Subtitle: "View and manage all platform users"

**Block 4: Filter & Search Bar**
- **Purpose**: Enable admins to find specific users or filter by criteria
- **Priority**: PRIMARY (core functionality)
- **Elements**:
  - Search input: "Search by name, email, or user ID..."
  - Role filter dropdown: All Roles, Care Receiver, Caregiver, Family Member
  - Status filter dropdown: All Statuses, Active, Suspended, Pending Verification
  - Date range picker: "Registered between [date] and [date]"
  - Clear Filters button
  - Apply Filters button (primary)

**Block 5: Summary Metrics**
- **Purpose**: At-a-glance platform user statistics
- **Priority**: SECONDARY (context, not action)
- **Elements**: 4 metric cards in horizontal row
  - Total Users: Count of all registered users
  - Active Users: Count of users with status "active"
  - Suspended Users: Count of users with status "suspended"
  - New This Week: Count of users registered in last 7 days

**Block 6: User Table**
- **Purpose**: Display all users matching current filters, with sortable columns and actions
- **Priority**: PRIMARY (core content)
- **Elements**:
  - Table header with sortable columns
  - Table rows (20 users per page, paginated)
  - Bulk actions toolbar (select multiple users)
  - Pagination controls (Previous, Page 1 of N, Next)
  - Results count: "Showing 1-20 of 456 users"

**Block 7: Footer**
- **Purpose**: Legal links and support contact
- **Priority**: TERTIARY
- **Elements**: About | Privacy | Terms | Support | Version

---

## 4. Complete Element Inventory

### 4.1 Block 1: Admin Navigation Header

**Component Reference**: See Admin Dashboard (SCR-ADM-001) for full specification.

**Admin Navigation Variant**:
- Logo: iCare logo (link to /admin)
- Search Bar: Global search for users, bookings, verifications
- Notifications Bell: Unread count badge
- Admin User Menu: Avatar, name, role badge, dropdown (Settings, Logout)

---

### 4.2 Block 2: Breadcrumb Navigation

**Elements**:
- **Link 1**: "Dashboard" (link to /admin)
- **Separator**: ">" or "/" (non-interactive)
- **Current Page**: "Users" (plain text, not a link)

**Accessibility**:
- `<nav aria-label="Breadcrumb">`
- `<ol>` list structure
- Current page has `aria-current="page"`

**Design Tokens**:
- Typography: 14px regular
- Color: Links (#2563EB blue), Current page (#6B7280 gray)
- Spacing: 8px horizontal padding between items

---

### 4.3 Block 3: Page Title & Subtitle

**Elements**:
- **H1 Title**: "User Management"
  - Typography: 32px bold
  - Color: `$txt` (#0F172A)
- **Subtitle**: "View and manage all platform users"
  - Typography: 16px regular
  - Color: `$txt-muted` (rgba(15,23,42,0.72))

**Spacing**:
- Title: 32px margin-bottom
- Subtitle: 16px margin-bottom (before filter bar)

---

### 4.4 Block 4: Filter & Search Bar

**Layout**: Horizontal row, wraps to multiple rows on smaller screens

**Elements**:

**1. Search Input**:
- Placeholder: "Search by name, email, or user ID..."
- Width: 320px (desktop), full-width (mobile)
- Icon: Magnifying glass (left side)
- Clear button: X icon (right side, appears when text entered)
- Real-time search: Debounced 300ms after last keystroke

**2. Role Filter Dropdown**:
- Label: "Role"
- Options:
  - All Roles (default)
  - Care Receiver
  - Caregiver
  - Family Member
- Width: 200px
- Icon: User icon (left side), chevron down (right side)

**3. Status Filter Dropdown**:
- Label: "Status"
- Options:
  - All Statuses (default)
  - Active
  - Suspended
  - Pending Verification (caregivers only)
  - Deactivated (user-initiated account deletion)
- Width: 200px
- Icon: Status indicator (left side), chevron down (right side)

**4. Date Range Picker**:
- Label: "Registered"
- Format: "DD/MM/YYYY - DD/MM/YYYY"
- Opens calendar picker on click
- Preset options: Last 7 days, Last 30 days, Last 90 days, All time
- Width: 240px

**5. Clear Filters Button**:
- Label: "Clear Filters"
- Style: Secondary button (low emphasis)
- Action: Resets all filters to default (All Roles, All Statuses, All time)
- Disabled state: If no filters applied

**6. Apply Filters Button**:
- Label: "Apply Filters"
- Style: Primary button
- Action: Updates table with filtered results
- Loading state: Spinner + "Filtering..." text

**Filter Behavior**:
- Filters apply immediately on dropdown change (no Apply button needed for dropdowns)
- Search input applies on Enter key or after 300ms of no typing
- Active filters displayed as removable tags above table: "[X] Role: Caregiver" "[X] Status: Suspended"
- Clicking X on tag removes that filter

**Accessibility**:
- All inputs have associated labels (visible or aria-label)
- Dropdowns keyboard accessible (Tab, Enter, Arrow keys)
- Date picker keyboard accessible
- Screen reader announces filter changes: "Filtering by Role: Caregiver, Status: Suspended. 23 users found."

**Design Tokens**:
- Input height: 48px
- Input background: #ffffff
- Input border: 1px solid #D1D5DB
- Input border-radius: 8px
- Input padding: 12px 16px
- Button height: 48px

---

### 4.5 Block 5: Summary Metrics

**Layout**: 4 cards in horizontal row (2x2 grid on tablet, stacked on mobile)

**Metric Card Structure** (reusable component):
```
+---------------------------+
| [Icon]                    |
| Label (14px gray)         |
| Value (32px bold black)   |
| Trend (12px green/red)    |
+---------------------------+
```

**Card 1: Total Users**:
- Icon: Users icon (group of people)
- Label: "Total Users"
- Value: "1,234" (dynamic count)
- Trend: "↑12% from last month" (green text)

**Card 2: Active Users**:
- Icon: Checkmark circle (green)
- Label: "Active Users"
- Value: "1,156" (dynamic count)
- Subtext: "93.7% of total"

**Card 3: Suspended Users**:
- Icon: Ban/prohibition icon (red)
- Label: "Suspended Users"
- Value: "23" (dynamic count)
- Subtext: "Requires review" (if >0)

**Card 4: New This Week**:
- Icon: User plus icon (blue)
- Label: "New This Week"
- Value: "87" (dynamic count)
- Trend: "↑15 from last week" (green text)

**Data Sources**:
- API endpoint: `GET /api/admin/users/summary`
- Response includes: total_users, active_users, suspended_users, new_this_week, trends

**Accessibility**:
- Each card is `<article>` with heading
- Metrics use `<dl>` structure (definition list)
- Trend indicators include text (not color alone)

**Design Tokens**:
- Card background: #ffffff
- Card border: 1px solid #E5E7EB
- Card border-radius: 12px
- Card padding: 24px
- Card shadow: 0 1px 3px rgba(0,0,0,0.1)
- Icon size: 32px
- Label color: #6B7280
- Value color: #0F172A
- Trend color: #22C55E (green) or #EF4444 (red)

---

### 4.6 Block 6: User Table

**Table Structure**:

| Column | Width | Sortable | Content |
|--------|-------|----------|---------|
| Select | 48px | No | Checkbox for bulk actions |
| Avatar | 64px | No | User photo or initials |
| Name | 200px | Yes | Full name (link to user detail) |
| Role | 150px | Yes | Badge: Care Receiver, Caregiver, Family Member |
| Status | 150px | Yes | Badge: Active, Suspended, Pending, Deactivated |
| Registered | 120px | Yes | Date (DD/MM/YYYY) |
| Last Active | 120px | Yes | Date or "Never" |
| Actions | 120px | No | Dropdown menu (3-dot icon) |

**Column Details**:

**1. Select Checkbox**:
- Checkbox in header row: Select all visible users on page
- Checkbox in each row: Select individual user
- Selected rows highlighted (light blue background)
- Bulk actions toolbar appears when ≥1 user selected

**2. Avatar**:
- User photo (circular, 48px diameter)
- If no photo: Initials on colored background (color based on user ID hash)
- Verification badge overlay (small checkmark icon) for verified caregivers

**3. Name**:
- Full name: "Sarah Johnson"
- Link: Opens user detail page (SCR-ADM-016)
- Hover state: Underline, cursor pointer
- Accessibility: `<a href="/admin/users/CR-12345">Sarah Johnson</a>`

**4. Role**:
- Badge component with icon + text
- Care Receiver: Home icon, light blue background
- Caregiver: User icon, light green background
- Family Member: Users icon, light purple background
- Admin: Shield icon, light red background (rare, if viewing admin accounts)

**5. Status**:
- Badge component with icon + text
- Active: Green checkmark, green background
- Suspended: Red ban icon, red background
- Pending Verification: Yellow clock, yellow background
- Deactivated: Gray circle, gray background

**6. Registered**:
- Date format: "15/01/2026"
- Sortable: Click header to sort by date (ascending/descending)
- Tooltip on hover: Full timestamp "15 Jan 2026, 14:32"

**7. Last Active**:
- Date format: "Today", "Yesterday", "5 days ago", "Never"
- Sortable: Click header to sort by date
- Tooltip on hover: Full timestamp "10 Feb 2026, 09:15"

**8. Actions Dropdown**:
- 3-dot vertical icon (kebab menu)
- Click opens dropdown menu with options:
  - "View Details" (link to SCR-ADM-016)
  - "Suspend Account" (if status = active)
  - "Reactivate Account" (if status = suspended)
  - "View Safeguarding History" (link to filtered safeguarding reports)
  - "View Bookings" (link to user's booking history)
- Dropdown closes on click outside or Escape key

**Table Features**:

**Sorting**:
- Click column header to sort (ascending)
- Click again to reverse sort (descending)
- Sorted column header shows arrow icon (up/down)
- Default sort: Registered (most recent first)

**Pagination**:
- 20 users per page (default)
- Pagination controls at bottom:
  - "Previous" button (disabled on page 1)
  - Page numbers: "1 2 3 ... 23" (show 5 pages max, with ellipsis)
  - "Next" button (disabled on last page)
- Results count: "Showing 1-20 of 456 users"
- Per-page selector: "Show: [20 ▾] per page" (options: 10, 20, 50, 100)

**Bulk Actions**:
- Toolbar appears above table when ≥1 user selected
- Toolbar content: "2 users selected" + actions:
  - "Suspend Selected" (confirmation modal)
  - "Export Selected" (CSV download)
  - "Clear Selection" (deselect all)

**Empty State** (no users match filters):
- Icon: Empty box or magnifying glass (large, 64px)
- Message: "No users found"
- Subtext: "Try adjusting your filters or search query"
- CTA: "Clear All Filters" button

**Loading State**:
- Skeleton rows (gray animated placeholders for 5 rows)
- No interactive elements while loading

**Error State**:
- Red error message above table: "Unable to load users. [Retry]"
- Retry button attempts to reload data

**Accessibility**:
- `<table>` with `<thead>`, `<tbody>`, `<th>`, `<td>`
- Caption: "Platform users list with filters and actions"
- Sortable column headers: `aria-sort="ascending"` or `aria-sort="descending"`
- Checkbox labels: `aria-label="Select Sarah Johnson"`
- Actions dropdown: `aria-label="Actions for Sarah Johnson"`

**Design Tokens**:
- Table background: #ffffff
- Table border: 1px solid #E5E7EB
- Header row background: #F9FAFB
- Row hover background: #F3F4F6
- Selected row background: #DBEAFE (light blue)
- Row height: 72px
- Cell padding: 12px 16px
- Font size: 14px (body), 12px (subtext)

---

### 4.7 Block 7: Footer

**Component Reference**: Standard global footer (see dashboard shared components).

**Elements**: About | Privacy | Terms | Support | Version 1.0.0

---

## 5. ASCII Wireframes

### 5.1 Desktop Layout (1440px+)

#### State 1: Default (Users Loaded)

```
+---------------------------------------------------------------------------------+
|  [Logo]  iCare Admin            [Search: users, bookings...] [🔔 2] [👤 Sarah] |
+---------------------------------------------------------------------------------+
|  Dashboard > Users                                                              |
+---------------------------------------------------------------------------------+
|                                                                                 |
|  User Management                                                                |
|  View and manage all platform users                                            |
|                                                                                 |
|  +-----------------------------------------------------------------------------+|
|  | [🔍] Search by name, email, or ID...  [Role: All ▾] [Status: All ▾]       ||
|  | [📅] Registered: All time ▾           [Clear Filters] [Apply Filters]      ||
|  +-----------------------------------------------------------------------------+|
|                                                                                 |
|  +-----------------+  +-----------------+  +-----------------+  +-------------+ |
|  | 👥 Total Users  |  | ✓ Active Users  |  | 🚫 Suspended   |  | + New This  | |
|  | 1,234           |  | 1,156           |  | 23             |  | Week        | |
|  | ↑12% last month |  | 93.7% of total  |  | Requires review|  | 87 (↑15)    | |
|  +-----------------+  +-----------------+  +-----------------+  +-------------+ |
|                                                                                 |
|  Active Filters: [X] Role: Caregiver  [X] Status: Suspended                    |
|  Showing 1-20 of 23 users                                                      |
|                                                                                 |
|  +-----------------------------------------------------------------------------+|
|  | [☐] | Avatar | Name           | Role       | Status    | Registered | Last   ||
|  |     |        |                |            |           | Date       | Active ||
|  +-----------------------------------------------------------------------------+|
|  | [☐] | [SJ]   | Sarah Johnson  | Caregiver  | Suspended | 15/01/2026 | 3 days ||
|  |     |        |                | ✓ Verified | 🚫        |            | ago    ||
|  |     |        |                |            |           |            | [⋮]    ||
|  +-----------------------------------------------------------------------------+|
|  | [☐] | [MK]   | Mary Kelly     | Caregiver  | Suspended | 08/12/2025 | 7 days ||
|  |     |        |                | ✓ Verified | 🚫        |            | ago    ||
|  |     |        |                |            |           |            | [⋮]    ||
|  +-----------------------------------------------------------------------------+|
|  | [☐] | [TB]   | Tom Brown      | Care Recv. | Suspended | 22/11/2025 | Never  ||
|  |     |        |                | 🏠         | 🚫        |            |        ||
|  |     |        |                |            |           |            | [⋮]    ||
|  +-----------------------------------------------------------------------------+|
|  | [☐] | [AC]   | Anna Chen      | Caregiver  | Suspended | 05/11/2025 | 14 days||
|  |     |        |                | ✓ Verified | 🚫        |            | ago    ||
|  |     |        |                |            |           |            | [⋮]    ||
|  +-----------------------------------------------------------------------------+|
|  | ... (16 more rows)                                                          ||
|  +-----------------------------------------------------------------------------+|
|                                                                                 |
|  Showing 1-20 of 23 users                                                      |
|  [< Previous]  [1] 2  [Next >]                   Show: [20 ▾] per page         |
|                                                                                 |
+---------------------------------------------------------------------------------+
|  Footer: About | Privacy | Terms | Support | Version 1.0.0                     |
+---------------------------------------------------------------------------------+
```

**Key Layout Features**:
- Full-width layout (no sidebar, admin nav in header)
- Filter bar spans full width with multiple inputs
- Summary metrics: 4 cards in horizontal row
- Table: 8 columns with sortable headers
- Pagination: Centered at bottom with per-page selector

---

#### State 2: Bulk Actions Active (2 Users Selected)

```
+---------------------------------------------------------------------------------+
|  [Logo]  iCare Admin            [Search: users, bookings...] [🔔 2] [👤 Sarah] |
+---------------------------------------------------------------------------------+
|  Dashboard > Users                                                              |
+---------------------------------------------------------------------------------+
|  (Filter bar and metrics same as State 1)                                      |
|                                                                                 |
|  +-----------------------------------------------------------------------------+|
|  | 2 users selected   [Suspend Selected] [Export Selected] [Clear Selection]  ||
|  +-----------------------------------------------------------------------------+|
|                                                                                 |
|  +-----------------------------------------------------------------------------+|
|  | [☑] | Avatar | Name           | Role       | Status    | Registered | Last   ||
|  |     |        |                |            |           | Date       | Active ||
|  +-----------------------------------------------------------------------------+|
|  | [☑] | [SJ]   | Sarah Johnson  | Caregiver  | Suspended | 15/01/2026 | 3 days ||
|  |     |        |                | ✓ Verified | 🚫        |            | ago    ||
|  |     |        | (row highlighted blue)                               | [⋮]    ||
|  +-----------------------------------------------------------------------------+|
|  | [☐] | [MK]   | Mary Kelly     | Caregiver  | Suspended | 08/12/2025 | 7 days ||
|  +-----------------------------------------------------------------------------+|
|  | [☑] | [TB]   | Tom Brown      | Care Recv. | Suspended | 22/11/2025 | Never  ||
|  |     |        |                | 🏠         | 🚫        |            |        ||
|  |     |        | (row highlighted blue)                               | [⋮]    ||
|  +-----------------------------------------------------------------------------+|
|  | ... (remaining rows)                                                        ||
+---------------------------------------------------------------------------------+
```

**Bulk Actions Toolbar**:
- Appears above table when ≥1 checkbox selected
- Background: Light blue (#DBEAFE)
- Height: 56px
- Selected rows have light blue background
- Actions: Suspend, Export, Clear Selection

---

#### State 3: Actions Dropdown Open

```
+---------------------------------------------------------------------------------+
|  (Same header and filter sections)                                             |
|                                                                                 |
|  +-----------------------------------------------------------------------------+|
|  | [☐] | [SJ]   | Sarah Johnson  | Caregiver  | Suspended | 15/01/2026 | 3 days ||
|  |     |        |                | ✓ Verified | 🚫        |            | ago [⋮]||
|  |     |        |                |            |           |            +-------+|
|  |     |        |                |            |           |   Dropdown: |      ||
|  |     |        |                |            |           |   ┌────────────────+|
|  |     |        |                |            |           |   │ View Details   ||
|  |     |        |                |            |           |   │ Reactivate Acc ||
|  |     |        |                |            |           |   │ View Safeguard ||
|  |     |        |                |            |           |   │ View Bookings  ||
|  |     |        |                |            |           |   └────────────────+|
+---------------------------------------------------------------------------------+
```

**Actions Dropdown**:
- Positioned below 3-dot icon, right-aligned
- Background: White, shadow
- Width: 200px
- Each item: 48px height, full-width clickable
- Hover state: Light gray background

---

### 5.2 Tablet Layout (768px - 1439px)

```
+---------------------------------------------------------------+
|  [Logo] iCare Admin    [🔍] [🔔 2] [👤]                      |
+---------------------------------------------------------------+
|  Dashboard > Users                                            |
+---------------------------------------------------------------+
|                                                               |
|  User Management                                              |
|  View and manage all platform users                           |
|                                                               |
|  +-----------------------------------------------------------+|
|  | [🔍] Search by name, email, or ID...                     ||
|  | [Role: All ▾] [Status: All ▾]                             ||
|  | [Registered: All time ▾]                                  ||
|  | [Clear Filters] [Apply Filters]                           ||
|  +-----------------------------------------------------------+|
|                                                               |
|  +-------------------------+  +------------------------------+|
|  | 👥 Total: 1,234         |  | ✓ Active: 1,156              ||
|  +-------------------------+  +------------------------------+|
|  +-------------------------+  +------------------------------+|
|  | 🚫 Suspended: 23        |  | + New: 87                    ||
|  +-------------------------+  +------------------------------+|
|                                                               |
|  Showing 1-20 of 23 users                                    |
|  +-----------------------------------------------------------+|
|  | [☐] | [SJ]  Sarah Johnson                                 ||
|  |     | Caregiver | Suspended | 15/01/2026 | 3 days ago     ||
|  |     | [View Details] [Reactivate]                         ||
|  +-----------------------------------------------------------+|
|  | [☐] | [MK]  Mary Kelly                                    ||
|  |     | Caregiver | Suspended | 08/12/2025 | 7 days ago     ||
|  |     | [View Details] [Reactivate]                         ||
|  +-----------------------------------------------------------+|
|  | ... (18 more cards)                                       ||
|  +-----------------------------------------------------------+|
|                                                               |
|  [< Previous]  [1] 2  [Next >]                                |
+---------------------------------------------------------------+
```

**Tablet Changes**:
- Filter bar: Inputs stack vertically (full width)
- Metrics: 2x2 grid (instead of 4 horizontal)
- Table: Converts to card layout (stacked user cards)
- Actions: Buttons visible in card (not dropdown)

---

### 5.3 Mobile Layout (320px - 767px)

```
+-----------------------------+
| [☰] iCare Admin   [🔔2][👤]|
+-----------------------------+
| Dashboard > Users           |
+-----------------------------+
|                            |
| User Management            |
|                            |
| [🔍] Search...             |
| [Role: All ▾]              |
| [Status: All ▾]            |
| [Date: All ▾]              |
| [Clear] [Apply]            |
|                            |
| Total: 1,234               |
| Active: 1,156              |
| Suspended: 23              |
| New: 87                    |
|                            |
| Showing 1-20 of 23         |
|                            |
| +--------------------------+|
| | [SJ] Sarah Johnson       ||
| | Caregiver | Suspended    ||
| | 15/01/26 | 3 days ago    ||
| | [View] [Reactivate]      ||
| +--------------------------+|
|                            |
| +--------------------------+|
| | [MK] Mary Kelly          ||
| | Caregiver | Suspended    ||
| | 08/12/25 | 7 days ago    ||
| | [View] [Reactivate]      ||
| +--------------------------+|
|                            |
| ... (18 more cards)        |
|                            |
| [< Prev] [1] 2 [Next >]    |
+-----------------------------+
```

**Mobile Changes**:
- Hamburger menu for admin nav
- All filters stack vertically
- Metrics: 4 rows (stacked)
- Table: Card layout (simplified, no checkboxes)
- Pagination: Simplified (fewer page numbers shown)

---

## 6. State Coverage

### 6.1 All Required States

| State Name | Condition | Visual Changes | Components Affected |
|------------|----------|----------------|---------------------|
| **Default** | Users loaded, no filters applied | Full table with all users, sorted by registration date (newest first) | All blocks |
| **Filtered** | Filters applied (role, status, date range) | Active filter tags visible above table, results count updated, table shows filtered users | Filter bar, table, metrics |
| **Search Active** | Search query entered | Table shows matching users, "No results" message if no matches | Search input, table |
| **Loading** | Initial page load or filter change | Skeleton rows in table (5 rows), metrics show loading spinners | Table, metrics |
| **Empty (No Users)** | No users in system (unlikely at launch) | Empty state: Icon + "No users registered yet" message | Table area |
| **Empty (No Results)** | Filters applied, no matches | Empty state: Icon + "No users found. Try adjusting filters." + Clear Filters button | Table area |
| **Bulk Actions Active** | ≥1 user selected via checkbox | Bulk actions toolbar appears above table, selected rows highlighted blue | Table, toolbar |
| **Actions Dropdown Open** | User clicks 3-dot icon on row | Dropdown menu visible with action options | Table row |
| **Error** | API failure | Red error message above table: "Unable to load users. [Retry]" | Table area |
| **Suspended Users Filter** | Status filter = Suspended | Table shows only suspended users, metrics highlight suspended count | Filter bar, table, metrics |

### 6.2 State Transition Diagram

```
┌─────────────┐
│   LOADING   │ (Initial page load)
└──────┬──────┘
       ↓
┌──────────────────┐
│    DEFAULT       │ (All users displayed)
└────┬─────────┬───┘
     │         │
     │         ↓
     │   ┌────────────────┐
     │   │ FILTERED       │ (Role/Status/Date filters applied)
     │   └────────┬───────┘
     │            │
     │            ↓
     │   ┌────────────────┐
     ├──→│ SEARCH ACTIVE  │ (Search query entered)
     │   └────────────────┘
     │
     │   ┌────────────────┐
     ├──→│ EMPTY (NO RES) │ (No matches for filters/search)
     │   └────────────────┘
     │
     ↓
┌────────────────┐
│ BULK ACTIONS   │ (Users selected, toolbar visible)
└────────────────┘

┌────────────────┐
│     ERROR      │ (API failure)
│ [Retry]        │
└────────────────┘
```

### 6.3 State-Specific Element Changes

**Default State**:
- All filters at default values (All Roles, All Statuses, All time)
- No active filter tags
- Table shows all users (paginated)
- Metrics show totals

**Filtered State**:
- Active filters displayed as removable tags above table
- Results count updated: "Showing 1-20 of 23 users" (filtered count)
- Metrics update to reflect filtered subset (e.g., "Active Users: 18 of 23 filtered")
- Clear Filters button enabled

**Search Active State**:
- Search input has text, clear X button visible
- Table shows matching users (name, email, or user ID matches)
- If no matches: Empty state with "No users found matching 'query'"

**Loading State**:
- Table shows 5 skeleton rows (gray animated placeholders)
- Metrics show loading spinners
- No interactive elements (buttons disabled)

**Empty (No Results) State**:
- Table area replaced with empty state:
  - Icon: Magnifying glass or empty box (64px, gray)
  - Heading: "No users found"
  - Message: "Try adjusting your filters or search query"
  - CTA: "Clear All Filters" button
- Metrics still visible (showing 0 results)

**Bulk Actions Active State**:
- Bulk actions toolbar appears above table (light blue background)
- Toolbar content: "2 users selected" + action buttons
- Selected rows have light blue background
- Header checkbox shows indeterminate state if some (not all) selected

**Actions Dropdown Open State**:
- Dropdown menu visible below 3-dot icon
- Dropdown options depend on user status:
  - Active users: "Suspend Account"
  - Suspended users: "Reactivate Account"
- Dropdown closes on click outside, Escape key, or action selection

**Error State**:
- Red error banner above table: "Unable to load users. [Retry]"
- Retry button attempts to reload data
- Other page elements remain visible (not blocked by error)

---

## 7. Responsive Design Notes

### 7.1 Breakpoint Strategy

| Breakpoint | Width | Layout | Notes |
|------------|-------|--------|-------|
| **Desktop** | 1440px+ | Table layout, 4 metric cards horizontal | Primary admin experience |
| **Desktop Small** | 1024px - 1439px | Table layout, 4 metric cards horizontal (narrower) | Slightly narrower columns |
| **Tablet** | 768px - 1023px | Card layout (stacked user cards), 2x2 metrics grid | Actions visible in cards |
| **Mobile** | 320px - 767px | Card layout, metrics stacked, simplified pagination | Touch-optimized, no bulk actions |

### 7.2 Responsive Layout Changes

**Desktop → Tablet**:
- Filter bar: Inputs stack vertically (full width each)
- Metrics: 2x2 grid (instead of 4 horizontal)
- Table: Converts to card layout (user cards stacked vertically)
- Actions: Action buttons visible in each card (not dropdown)
- Bulk actions: Removed (checkboxes hidden)

**Tablet → Mobile**:
- All elements stack vertically (single column)
- Metrics: 4 rows (fully stacked)
- Filter bar: Full-width inputs, buttons stack
- User cards: Simplified (avatar + name + role/status + 2 actions)
- Pagination: Fewer page numbers shown (e.g., "1 ... 23")

### 7.3 Touch Target Sizing

**Minimum Touch Targets** (accessibility for elderly admin users):
- **Buttons**: 48x48px minimum
- **Links**: 44x44px minimum clickable area
- **Checkboxes**: 48x48px (larger than default)
- **Dropdown selectors**: 48px height
- **Table action icons**: 48x48px

**Mobile-Specific**:
- Increase padding around buttons (12px minimum)
- Action buttons in cards: 48px height, full-width
- Pagination buttons: 48x48px (large touch targets)

---

## 8. Accessibility Requirements

### 8.1 WCAG 2.1 AA Compliance

**Screen-Level Requirements**:

**Perceivable**:
- [ ] All status badges have text + icon (not color alone)
- [ ] Table sortable columns announce sort direction to screen readers
- [ ] Metrics have descriptive labels
- [ ] Empty state messages clear and informative
- [ ] Color contrast: 4.5:1 for normal text, 3:1 for large text/icons

**Operable**:
- [ ] Full keyboard navigation (Tab, Shift+Tab, Enter, Escape, Arrow keys)
- [ ] Focus visible on all interactive elements (2px blue outline)
- [ ] Skip link: "Skip to main content" at page top
- [ ] No keyboard traps (can escape dropdowns, modals)
- [ ] Table sortable via keyboard (Enter on header to sort)

**Understandable**:
- [ ] Page title: "User Management - iCare Admin"
- [ ] Heading hierarchy: H1 (page title), H2 (section headings if any), TH (table headers)
- [ ] Form labels associated with inputs (filter dropdowns, search)
- [ ] Error messages clear and actionable
- [ ] Breadcrumb shows navigation path

**Robust**:
- [ ] Semantic HTML (header, nav, main, table, article, footer)
- [ ] ARIA landmarks: role="banner", role="main", role="navigation"
- [ ] ARIA live regions for dynamic updates (results count, filter changes)
- [ ] Works with screen readers (NVDA, JAWS, VoiceOver tested)

### 8.2 Focus Order

**Keyboard Navigation Sequence**:
1. Skip link ("Skip to main content")
2. Logo (link to dashboard)
3. Global search bar (admin header)
4. Notifications bell
5. User menu
6. Breadcrumb: "Dashboard" link
7. Search input (user search)
8. Role filter dropdown
9. Status filter dropdown
10. Date range picker
11. Clear Filters button
12. Apply Filters button
13. Metric cards (non-interactive, skip or tab through for context)
14. Active filter tags (each X button focusable)
15. Bulk select checkbox (header)
16. Table rows (each row focusable):
    - Row checkbox
    - User name link
    - Actions dropdown trigger
17. Pagination controls:
    - Previous button
    - Page number links
    - Next button
18. Per-page selector dropdown
19. Footer links

**Focus Indicators**:
- 2px solid blue outline (#2563EB)
- Offset: 2px from element edge
- Visible on all interactive elements

### 8.3 Screen Reader Annotations

**Key Elements**:

**Page Title**:
- `<h1>User Management</h1>`
- Screen reader announces: "User Management, heading level 1"

**Breadcrumb**:
- `<nav aria-label="Breadcrumb">`
- Screen reader announces: "Breadcrumb navigation. Dashboard link. Users, current page."

**Filter Bar**:
- Search input: `<label for="user-search">Search by name, email, or user ID</label>`
- Role filter: `<label for="role-filter">Filter by role</label>`
- Status filter: `<label for="status-filter">Filter by status</label>`

**Summary Metrics**:
- Each card: `<article aria-labelledby="metric-total-users">`
- Heading: `<h2 id="metric-total-users">Total Users</h2>`
- Value: `<span aria-label="1,234 total users">1,234</span>`

**User Table**:
- Table caption: `<caption>Platform users list with filters and actions</caption>`
- Sortable headers: `<th scope="col" aria-sort="ascending">Name</th>`
- Name cell: `<td><a href="/admin/users/CR-12345">Sarah Johnson</a></td>`
- Status badge: `<span role="status" aria-label="Account suspended">Suspended</span>`
- Actions dropdown: `<button aria-label="Actions for Sarah Johnson" aria-haspopup="true">...</button>`

**Active Filters**:
- `<div role="status" aria-live="polite">Filtering by Role: Caregiver, Status: Suspended. 23 users found.</div>`

**Bulk Actions Toolbar**:
- `<div role="toolbar" aria-label="Bulk user actions">2 users selected. Suspend selected, Export selected, Clear selection.</div>`

**Pagination**:
- `<nav aria-label="User list pagination">`
- Previous button: `<button aria-label="Go to previous page">Previous</button>`
- Current page: `<span aria-current="page">Page 1 of 2</span>`

### 8.4 Color Contrast Compliance

**Text on Background**:
- Dark text (#0F172A) on light background (#ffffff): **15:1 ratio** ✅
- Muted text (rgba(15,23,42,0.72)) on light: **5.2:1 ratio** ✅
- Link text (#2563EB) on light: **4.6:1 ratio** ✅

**Status Badges**:
- Green "Active" (#22C55E) on light green background (#F0FDF4): Text + icon, not color alone ✅
- Red "Suspended" (#DC2626) on light red background (#FEE2E2): Text + icon ✅
- Yellow "Pending" (#F59E0B) on light yellow background (#FEF3C7): Text + icon ✅

**Solution**: All status indicators include icon + text, not color alone (meets WCAG success criterion).

---

## 9. Component Reuse

### 9.1 Shared Components (from Dashboard Phase)

**Components Reused**:

1. **Navigation Header (Admin Variant)**:
   - Component: `NAV-HEADER-AUTH` with `role: "admin"`
   - Source: Admin Dashboard (SCR-ADM-001)
   - Modifications: None (identical)

2. **Status Badge**:
   - Component: `STATUS-BADGE`
   - Source: Booking cards, dashboard widgets
   - Variants: Active, Suspended, Pending Verification, Deactivated
   - New colors: Yellow (pending), Gray (deactivated)

3. **Metric Card**:
   - Component: `METRIC-CARD`
   - Source: Admin Dashboard (SCR-ADM-001), Platform Health widget
   - Props: Icon, label, value, trend (optional)

4. **Empty State Pattern**:
   - Component: `EMPTY-STATE`
   - Source: Care Receiver Dashboard (empty booking list)
   - Props: Icon, heading, message, CTA button

5. **Button**:
   - Component: `BUTTON`
   - Variants: Primary, Secondary, Text (link style)
   - States: Default, Hover, Active, Disabled, Loading

6. **User Avatar**:
   - Component: `USER-AVATAR`
   - Source: Booking cards, header user menu
   - Props: Photo URL or initials, size (48px, 64px, 96px)

7. **Breadcrumb**:
   - Component: `BREADCRUMB`
   - Source: Standard navigation pattern
   - Props: Array of links + current page

8. **Footer**:
   - Component: `FOOTER-GLOBAL`
   - Source: All screens
   - Identical across platform

### 9.2 New Components (User Management Specific)

**New Components Introduced**:

1. **User Table (Desktop)**:
   - Component: `USER-TABLE`
   - Purpose: Display users in sortable, filterable table
   - Props: Users array, columns config, sort state, pagination
   - Features: Sorting, bulk selection, actions dropdown
   - Mobile alternative: User cards

2. **User Card (Mobile/Tablet)**:
   - Component: `USER-CARD`
   - Purpose: Display user summary in card format
   - Props: User object (avatar, name, role, status, dates, actions)
   - Layout: Vertical stack with action buttons

3. **Filter Bar (Multi-Input)**:
   - Component: `FILTER-BAR`
   - Purpose: Search + multiple filter dropdowns + date picker
   - Props: Filter configs array, apply/clear callbacks
   - Features: Active filter tags, clear all

4. **Active Filter Tags**:
   - Component: `FILTER-TAG`
   - Purpose: Show applied filters as removable tags
   - Props: Filter name, filter value, remove callback
   - Style: Small pill with X icon

5. **Bulk Actions Toolbar**:
   - Component: `BULK-ACTIONS-TOOLBAR`
   - Purpose: Actions for selected table rows
   - Props: Selected count, action buttons array
   - Appears above table when items selected

6. **Actions Dropdown Menu**:
   - Component: `ACTIONS-DROPDOWN`
   - Purpose: Contextual actions for table rows
   - Props: Actions array (label, icon, callback, disabled state)
   - Trigger: 3-dot kebab menu icon

---

## 10. Design Notes for Figma

### 10.1 Key Design Considerations

**1. Data Density vs. Scannability**:
- Admin table can be denser than user-facing screens
- But: Still needs to be scannable (clear row separation, adequate padding)
- Balance: 72px row height (not too cramped, not too spacious)

**2. Sorting and Filtering Patterns**:
- Sortable columns: Arrow icons (up/down) next to header text
- Active sort: Bold header text + colored arrow
- Filters: Dropdown menus with clear labels and "All" default

**3. Bulk Actions Design**:
- Toolbar: Light blue background (#DBEAFE) to visually connect with selected rows
- Selected rows: Same light blue background
- Toolbar always visible when items selected (sticky if table scrolls)

**4. Mobile Card Layout**:
- Cards replace table on small screens
- Each card: Avatar + Name + Role/Status badges + 2 action buttons
- Cards stack vertically with 16px gap

**5. Empty State Tone**:
- No results: Helpful (not discouraging)
- Suggest actions: "Clear filters" or "Adjust search"
- Icon: Magnifying glass (search context) or empty box (no data)

### 10.2 Figma File Structure Suggestions

**Pages**:
1. User Management - Default State (1440px desktop)
2. User Management - Filtered State (active filters visible)
3. User Management - Bulk Actions Active (2 users selected)
4. User Management - Actions Dropdown Open
5. User Management - Empty State (no results)
6. User Management - Tablet (768px)
7. User Management - Mobile (375px)

**Components to Create** (in Design System):
- User Table (desktop layout, 8 columns)
- User Card (mobile/tablet layout)
- Filter Bar (search + dropdowns + date picker)
- Active Filter Tag (removable pill)
- Bulk Actions Toolbar
- Actions Dropdown Menu
- Metric Card (reuse from dashboard, add new variants)
- Status Badge (add new statuses: Pending Verification, Deactivated)

**Design Tokens to Use** (from existing `_tokens.scss`):
- Background: #F7F7F2 (page background)
- Card background: #ffffff
- Primary button: #B0C47F (sage green)
- Secondary button: #E5E7EB (light gray)
- Text: #0F172A
- Muted text: rgba(15,23,42,0.72)
- Border: #E5E7EB
- Border radius: 8px (inputs), 12px (cards)
- Spacing: 8px, 16px, 24px, 32px

### 10.3 Open Questions for Product Team

**Questions to Resolve**:
1. **Export Functionality**: Should admins be able to export user lists to CSV? If yes, what data fields?
2. **Bulk Actions**: Beyond suspend/export, what other bulk actions are needed? (Delete? Email users?)
3. **User Detail Page**: SCR-ADM-016 is R1 scope. For R0, what happens if admin clicks user name? (Link disabled? Modal summary?)
4. **Deactivated Users**: Should deactivated users (user-initiated account deletion) appear in table? If yes, can they be reactivated?
5. **Admin User Filtering**: Should this screen show admin accounts, or only care receivers/caregivers/family members?

---

## Appendix A: Content Specifications

### A.1 Page Title & Subtitle

- **Page Title (H1)**: "User Management"
- **Subtitle**: "View and manage all platform users"

### A.2 Filter Bar Labels

- **Search Input Placeholder**: "Search by name, email, or user ID..."
- **Role Filter Label**: "Role"
- **Status Filter Label**: "Status"
- **Date Range Picker Label**: "Registered"
- **Clear Filters Button**: "Clear Filters"
- **Apply Filters Button**: "Apply Filters"

### A.3 Metric Card Labels

- **Card 1**: "Total Users" (value: count, trend: "↑12% from last month")
- **Card 2**: "Active Users" (value: count, subtext: "X% of total")
- **Card 3**: "Suspended Users" (value: count, subtext: "Requires review" if >0)
- **Card 4**: "New This Week" (value: count, trend: "↑X from last week")

### A.4 Table Column Headers

- "Select" (checkbox column, no label)
- "Avatar" (no label, visual only)
- "Name" (sortable)
- "Role" (sortable)
- "Status" (sortable)
- "Registered" (sortable, date)
- "Last Active" (sortable, date)
- "Actions" (not sortable)

### A.5 Status Badge Text

- **Active**: "Active" (green background, checkmark icon)
- **Suspended**: "Suspended" (red background, ban icon)
- **Pending Verification**: "Pending" (yellow background, clock icon)
- **Deactivated**: "Deactivated" (gray background, circle icon)

### A.6 Empty State Messages

**No Results from Search/Filter**:
- Heading: "No users found"
- Message: "Try adjusting your filters or search query"
- CTA: "Clear All Filters"

**No Users in System** (unlikely):
- Heading: "No users registered yet"
- Message: "Users will appear here once they sign up"

### A.7 Bulk Actions Toolbar

- Selected count: "2 users selected"
- Actions:
  - "Suspend Selected"
  - "Export Selected"
  - "Clear Selection"

### A.8 Actions Dropdown Options

**For Active Users**:
- "View Details"
- "Suspend Account"
- "View Safeguarding History"
- "View Bookings"

**For Suspended Users**:
- "View Details"
- "Reactivate Account"
- "View Safeguarding History"
- "View Bookings"

---

## Appendix B: Data API Endpoints

### B.1 User List API

**Endpoint**: `GET /api/admin/users`

**Query Parameters**:
```
?search=sarah          // Search by name, email, or user ID
&role=caregiver        // Filter by role (caregiver, care_receiver, family_member)
&status=suspended      // Filter by status (active, suspended, pending_verification, deactivated)
&registered_from=2025-01-01  // Date range: start
&registered_to=2026-02-11    // Date range: end
&sort_by=registered    // Sort column (name, role, status, registered, last_active)
&sort_order=desc       // Sort direction (asc, desc)
&page=1                // Pagination: page number
&per_page=20           // Pagination: results per page
```

**Response**:
```json
{
  "users": [
    {
      "id": "CG-12345",
      "name": "Sarah Johnson",
      "email": "sarah.j@example.com",
      "role": "caregiver",
      "status": "suspended",
      "avatar_url": "https://...",
      "verified": true,
      "registered_at": "2026-01-15T10:30:00Z",
      "last_active_at": "2026-02-08T14:22:00Z"
    },
    // ... more users
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 20,
    "total_pages": 2,
    "total_count": 23
  },
  "summary": {
    "total_users": 1234,
    "active_users": 1156,
    "suspended_users": 23,
    "new_this_week": 87
  }
}
```

### B.2 User Summary API

**Endpoint**: `GET /api/admin/users/summary`

**Response**:
```json
{
  "total_users": 1234,
  "active_users": 1156,
  "suspended_users": 23,
  "pending_verification": 12,
  "deactivated_users": 43,
  "new_this_week": 87,
  "trends": {
    "total_users_change_percent": 12,
    "new_this_week_change": 15
  }
}
```

### B.3 User Actions API

**Suspend User**:
```
POST /api/admin/users/{userId}/suspend
Body: { "reason": "Safeguarding concern", "duration": "indefinite" }
```

**Reactivate User**:
```
POST /api/admin/users/{userId}/reactivate
Body: { "reason": "Investigation complete, no breach found" }
```

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-11 | elderly-care-ux-ui-designer | Initial wireframe and element inventory for SCR-ADM-005 |

---

**STATUS: READY FOR FIGMA HANDOFF**

**END OF DOCUMENT**
