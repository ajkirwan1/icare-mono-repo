# Platform Analytics Wireframe (SCR-ADM-015)

**Document Purpose**: Complete wireframe specification and element inventory for the Admin Platform Analytics screen, enabling admins to view platform-wide metrics, growth trends, revenue analysis, and operational KPIs with date range filtering and export capabilities.

**Screen ID**: SCR-ADM-015
**Screen Name**: Platform Analytics
**Route**: `/admin/analytics`
**User Roles**: Admin (all admin roles)
**R0/R1**: R1 (manual reporting acceptable at R0, automated dashboard for R1+)

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

The Platform Analytics screen provides admins with a comprehensive business intelligence interface to:
- Monitor platform growth trends (user registrations, booking volume)
- Track revenue metrics (GMV, commission earned, average booking value)
- Analyze user demographics (care receivers vs caregivers, geographic distribution)
- Measure caregiver performance (verification rates, acceptance rates, ratings)
- Export analytics data for external reporting and compliance
- Compare time periods to identify growth or decline patterns

### 1.2 Key User Tasks

**Primary Tasks**:
1. View key platform metrics at-a-glance (total users, active bookings, revenue, average rating)
2. Filter analytics by date range (last 7 days, 30 days, 90 days, custom range)
3. Analyze user registration trends over time (line chart)
4. Analyze booking volume trends over time (bar chart)
5. View user breakdown by role (pie chart: care receivers, family members, caregivers)
6. Identify top geographic regions by user count (horizontal bar chart)
7. Review revenue metrics (total revenue, commission breakdown, average booking value)
8. Monitor caregiver supply metrics (verification rate, average response time, top-rated caregivers)
9. Export displayed data as CSV for offline analysis or board reporting
10. Compare current period to previous period (e.g., "Last 30 days vs. previous 30 days")

**Context of Use**:
- Operations Manager: Weekly review of platform health and growth metrics
- Super Admin: Monthly board reports, investor updates, strategic planning
- Safeguarding Officer: Monitor platform activity for anomaly detection
- Finance team: Revenue tracking, commission reconciliation

### 1.3 Key Analytics Metrics Defined

**User Metrics**:
- **Total Users**: Count of all registered users (care receivers + family members + caregivers)
- **Active Users**: Users who logged in within last 30 days
- **New Registrations This Period**: Users registered within selected date range
- **User Growth Rate**: Percentage increase/decrease vs. previous period

**Booking Metrics**:
- **Active Bookings**: Bookings with status "confirmed" or "in_progress"
- **Completed Bookings This Period**: Bookings completed within selected date range
- **Booking Completion Rate**: (Completed bookings / All bookings) × 100
- **Average Booking Value**: Total booking value ÷ number of bookings

**Revenue Metrics**:
- **GMV (Gross Merchandise Value)**: Total value of all completed bookings (caregiver rate × hours)
- **Platform Commission**: Total commission earned (caregiver commission % + service fee %)
- **Effective Take Rate**: Platform commission ÷ GMV × 100
- **Revenue Growth Rate**: Percentage increase/decrease vs. previous period

**Caregiver Metrics**:
- **Verification Completion Rate**: (Verified caregivers / Total caregivers) × 100
- **Average Response Time**: Average time from booking request to caregiver response
- **Average Acceptance Rate**: (Accepted bookings / Total requests) × 100
- **Average Caregiver Rating**: Mean star rating across all caregivers with reviews

### 1.4 Relationship to Other Admin Screens

**Within Admin Section**:
- **SCR-ADM-001** (Admin Dashboard): Links to this screen via "View Analytics" or "Platform Health" widget
- **SCR-ADM-005** (User Management): User count metrics link to filtered user list
- **SCR-ADM-007** (Verification Queue): Verification metrics link to verification queue
- **SCR-ADM-014** (System Settings): Commission rate settings affect revenue calculations displayed here

**Navigation Pattern**: Admin Dashboard → Platform Analytics

---

## 2. Entry Points and Navigation

### 2.1 Entry Points

**How admins arrive at this screen**:
- From Admin Dashboard (SCR-ADM-001): Click "View Analytics" link in Platform Health widget
- From Admin Navigation: Click "Analytics" in global admin sidebar
- From System Settings (SCR-ADM-014): Click "View Revenue Impact" after changing commission rates
- Direct URL navigation: `/admin/analytics`

**Preconditions**:
- User authenticated as Admin role (any admin permission level)
- 2FA enabled (mandatory for admin accounts)
- Platform has collected sufficient data (minimum 1 day of operation for meaningful analytics)

### 2.2 Navigation Exits

**From This Screen**:

| Element | Destination | Screen ID |
|---------|------------|-----------|
| Admin Dashboard link (breadcrumb) | Admin Dashboard | SCR-ADM-001 |
| "Total Users" metric | User Management (all users) | SCR-ADM-005 |
| "Verification Rate" metric | Verification Queue | SCR-ADM-007 |
| "View Commission Settings" link | System Settings (Payments tab) | SCR-ADM-014 |
| Export CSV button | Downloads CSV file | N/A (file download) |
| Logout (user menu) | Login | SCR-AUTH-005 |

**Global Admin Navigation** (sidebar):
- Dashboard (SCR-ADM-001)
- Users (SCR-ADM-005)
- Verifications (SCR-ADM-007)
- Safeguarding (SCR-ADM-014)
- Analytics (this screen)
- Audit Log (future)

---

## 3. Content Blocks and Hierarchy

### 3.1 Page Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ TOP: Admin Navigation Header                                    │
├─────────────────────────────────────────────────────────────────┤
│ BREADCRUMB: Dashboard > Analytics                               │
├─────────────────────────────────────────────────────────────────┤
│ PAGE TITLE: Platform Analytics                                  │
│ SUBTITLE: Last Updated: Today, 15:00                            │
├─────────────────────────────────────────────────────────────────┤
│ DATE RANGE SELECTOR & EXPORT BAR                                │
│ [Last 30 days ▾]  [Compare to: Previous 30 days ▾]  [Export CSV]│
├─────────────────────────────────────────────────────────────────┤
│ KEY METRICS ROW (4 metric cards)                                │
│ [Total Users] [Active Bookings] [Revenue] [Avg Rating]         │
├─────────────────────────────────────────────────────────────────┤
│ GROWTH TRENDS SECTION (2 charts side-by-side)                   │
│ [User Registrations Line Chart] [Bookings Bar Chart]           │
├─────────────────────────────────────────────────────────────────┤
│ USER DEMOGRAPHICS SECTION                                        │
│ [User Role Breakdown Pie Chart] [Top 10 Regions Bar Chart]     │
├─────────────────────────────────────────────────────────────────┤
│ REVENUE METRICS SECTION                                          │
│ [Revenue Cards Grid] [Commission Breakdown]                     │
├─────────────────────────────────────────────────────────────────┤
│ CAREGIVER METRICS SECTION                                        │
│ [Verification Rate] [Avg Response Time] [Top Caregivers Table]  │
├─────────────────────────────────────────────────────────────────┤
│ FOOTER: Standard global footer                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Content Block Breakdown

**Block 1: Admin Navigation Header** (shared component)
- **Purpose**: Global admin navigation
- **Priority**: PRIMARY (always visible)
- **Elements**: Logo, search bar, notifications bell, admin user menu
- **Component Reference**: `NAV-HEADER-AUTH` with `role: "admin"`

**Block 2: Breadcrumb Navigation**
- **Purpose**: Show navigation path, allow quick return to Dashboard
- **Priority**: SECONDARY (context)
- **Elements**: "Dashboard" link > "Analytics" (current page)

**Block 3: Page Title & Subtitle**
- **Purpose**: Clearly identify screen purpose and data freshness
- **Priority**: PRIMARY
- **Elements**:
  - H1: "Platform Analytics"
  - Subtitle: "Last Updated: Today, 15:00" (timestamp of last data refresh)

**Block 4: Date Range Selector & Export Bar**
- **Purpose**: Control analytics time period and export data
- **Priority**: PRIMARY (core filtering functionality)
- **Elements**:
  - Date range dropdown: "Last 30 days" (default)
  - Comparison dropdown: "Compare to: Previous 30 days"
  - Export CSV button
- **Layout**: Horizontal row, sticky on scroll (remains visible when scrolling down)

**Block 5: Key Metrics Row**
- **Purpose**: At-a-glance platform summary (4 most important KPIs)
- **Priority**: PRIMARY (first data users see)
- **Elements**: 4 metric cards in horizontal row
  - Total Users
  - Active Bookings
  - Revenue (GMV this period)
  - Average Rating

**Block 6: Growth Trends Section**
- **Purpose**: Visualize user and booking growth over time
- **Priority**: PRIMARY (core business intelligence)
- **Elements**: 2 charts side-by-side (50% width each on desktop)
  - User Registrations Line Chart (care receivers, caregivers, family members)
  - Bookings Bar Chart (volume by week or day)

**Block 7: User Demographics Section**
- **Purpose**: Understand platform user composition and geographic reach
- **Priority**: SECONDARY (strategic insights)
- **Elements**: 2 visualizations side-by-side
  - User Role Breakdown Pie Chart (care receivers, family members, caregivers)
  - Top 10 Regions Horizontal Bar Chart (by postcode district)

**Block 8: Revenue Metrics Section**
- **Purpose**: Track platform financial performance
- **Priority**: PRIMARY (business-critical)
- **Elements**:
  - Revenue cards grid (3 cards: Total Revenue, Platform Commission, Avg Booking Value)
  - Commission breakdown explanation (caregiver % + service fee %)

**Block 9: Caregiver Metrics Section**
- **Purpose**: Monitor caregiver supply and quality
- **Priority**: SECONDARY (operational insights)
- **Elements**:
  - Verification completion rate card
  - Average response time card
  - Top-rated caregivers table (top 10 by rating, with booking count)

**Block 10: Footer**
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
- **Separator**: ">" (non-interactive)
- **Current Page**: "Analytics" (plain text, not a link)

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
- **H1 Title**: "Platform Analytics"
  - Typography: 32px bold
  - Color: `$txt` (#0F172A)
- **Subtitle**: "Last Updated: Today, 15:00"
  - Typography: 14px regular
  - Color: `$txt-muted` (rgba(15,23,42,0.72))
  - Icon: Refresh icon (left of timestamp)
  - Update frequency: Auto-refreshes every 15 minutes (or manual refresh button)

**Spacing**:
- Title: 16px margin-bottom
- Subtitle: 24px margin-bottom (before date range selector)

---

### 4.4 Block 4: Date Range Selector & Export Bar

**Layout**: Horizontal row, sticky on scroll (position: sticky, top: 64px)

**Elements**:

**1. Date Range Dropdown**:
- Label: "Date Range:"
- Current selection: "Last 30 days" (default)
- Dropdown options:
  - Last 7 days
  - Last 30 days (default)
  - Last 90 days
  - Custom range... (opens date picker modal)
- Width: 200px
- Icon: Calendar icon (left side), chevron down (right side)
- Behavior: On change, reload all analytics data for selected period

**2. Comparison Dropdown**:
- Label: "Compare to:"
- Current selection: "Previous 30 days" (default)
- Dropdown options:
  - Previous period (auto-calculates based on main date range)
  - Same period last year
  - None (no comparison)
- Width: 220px
- Icon: Compare arrows icon (left side), chevron down (right side)
- Behavior: On change, update all metric cards to show percentage change vs. comparison period

**3. Export CSV Button**:
- Label: "Export CSV"
- Style: Secondary button (white background, gray border)
- Icon: Download icon (left of text)
- Width: Auto (fits content)
- Action: Generates CSV file with all displayed metrics and downloads to user's device
- File name format: `icare-analytics-YYYY-MM-DD.csv`
- CSV contents: All metric values, chart data points, table rows

**4. Manual Refresh Button** (optional):
- Label: Icon only (refresh/reload icon)
- Style: Icon button (no background, just icon)
- Tooltip: "Refresh data now"
- Action: Reload all analytics data from API, update "Last Updated" timestamp

**Sticky Behavior**:
- Default position: Below page title
- On scroll down: Sticks to top of viewport (below navigation header) so date range controls remain accessible
- Background: White with subtle shadow to separate from content below

**Loading State**:
- When date range changes: All charts/metrics show skeleton loaders, Export button disabled

---

### 4.5 Block 5: Key Metrics Row

**Layout**: Horizontal row of 4 cards, equal width (25% each on desktop)

**Card Structure** (all 4 cards):
- Background: White
- Border: 1px solid `$border-soft` (rgba(0,0,0,0.06))
- Border radius: 8px
- Padding: 24px
- Shadow: Subtle shadow on hover

**Metric Card 1: Total Users**:

**Elements**:
- **Metric Label**: "Total Users"
  - Typography: 14px medium
  - Color: `$txt-muted` (rgba(15,23,42,0.72))
- **Metric Value**: "1,247"
  - Typography: 32px bold
  - Color: `$txt` (#0F172A)
- **Trend Indicator**: "+12% vs. previous 30 days"
  - Typography: 13px regular
  - Color: Green (#10B981) if positive, Red (#EF4444) if negative
  - Icon: Up arrow (green) or down arrow (red)
- **Link**: "View all users →"
  - Typography: 13px medium
  - Color: `$primary` (#2563EB)
  - Destination: SCR-ADM-005 (User Management)

**Data Source**: `GET /api/admin/analytics/users/total?date_range=last_30_days`

**Metric Card 2: Active Bookings**:

**Elements**:
- **Metric Label**: "Active Bookings"
- **Metric Value**: "42"
- **Trend Indicator**: "+5% vs. previous 30 days"
- **Subtext**: "8 confirmed, 34 in progress"
  - Typography: 12px regular
  - Color: `$txt-muted`
- **Link**: None (future: link to booking management screen)

**Data Source**: `GET /api/admin/analytics/bookings/active?date_range=last_30_days`

**Metric Card 3: Revenue (This Period)**:

**Elements**:
- **Metric Label**: "Revenue (GMV)"
- **Metric Value**: "£3,120"
  - Currency symbol: £ (British pound)
  - Format: Comma-separated thousands
- **Trend Indicator**: "+28% vs. previous 30 days"
- **Subtext**: "£468 platform commission (15% take rate)"
  - Typography: 12px regular
  - Color: `$txt-muted`
- **Link**: "View commission settings →"
  - Destination: SCR-ADM-014 (System Settings, Payments tab)

**Data Source**: `GET /api/admin/analytics/revenue/gmv?date_range=last_30_days`

**Metric Card 4: Average Rating**:

**Elements**:
- **Metric Label**: "Average Rating"
- **Metric Value**: "4.7"
  - Typography: 32px bold
  - Icon: 5 stars, 4.7 filled (visual representation)
- **Trend Indicator**: "+0.2 vs. previous 30 days"
- **Subtext**: "Based on 156 reviews"
  - Typography: 12px regular
  - Color: `$txt-muted`
- **Link**: None (future: link to reviews moderation screen)

**Data Source**: `GET /api/admin/analytics/reviews/average?date_range=last_30_days`

**Responsive Behavior**:
- Desktop (≥1024px): 4 cards in single row (25% width each)
- Tablet (768-1023px): 2 cards per row (50% width each)
- Mobile (≤767px): 1 card per row (100% width), stacked vertically

---

### 4.6 Block 6: Growth Trends Section

**Section Header**:
- H2: "Growth Trends"
- Subtitle: "User registrations and booking volume over time"

**Layout**: Two-column (50% width each on desktop)

**Chart 1: User Registrations Over Time (Line Chart)**:

**Elements**:
- **Chart Title**: "User Registrations"
- **Chart Type**: Multi-line chart (3 lines)
  - Line 1: Care Receivers (blue)
  - Line 2: Caregivers (green)
  - Line 3: Family Members (orange)
- **X-Axis**: Time period (daily for 7d/30d, weekly for 90d)
  - Label: "Date"
  - Format: "1 Feb", "8 Feb", "15 Feb" (day + month)
- **Y-Axis**: Count of registrations
  - Label: "New Registrations"
  - Scale: Auto-adjusts based on max value (e.g., 0-50)
- **Legend**: Top-right corner
  - Care Receivers (blue square)
  - Caregivers (green square)
  - Family Members (orange square)
- **Tooltips**: On hover, show exact values
  - Example: "8 Feb: 12 care receivers, 8 caregivers, 3 family members"
- **Trend Line**: Dotted line showing overall growth trend (optional)

**Data Source**: `GET /api/admin/analytics/users/registrations?date_range=last_30_days&group_by=day`

**Sample Data**:
```
[
  { date: "2026-01-12", care_receivers: 8, caregivers: 5, family_members: 2 },
  { date: "2026-01-13", care_receivers: 12, caregivers: 7, family_members: 3 },
  { date: "2026-01-14", care_receivers: 10, caregivers: 6, family_members: 1 },
  ... (30 data points for 30-day range)
]
```

**Chart 2: Booking Volume Over Time (Bar Chart)**:

**Elements**:
- **Chart Title**: "Booking Volume"
- **Chart Type**: Vertical bar chart
  - Bar color: Blue (#2563EB) for all bars
  - Bar width: Responsive (adjusts based on number of data points)
- **X-Axis**: Time period (daily for 7d/30d, weekly for 90d)
  - Label: "Date"
  - Format: "1 Feb", "8 Feb", "15 Feb"
- **Y-Axis**: Count of bookings
  - Label: "Bookings Created"
  - Scale: Auto-adjusts (e.g., 0-30)
- **Tooltips**: On hover, show exact value + status breakdown
  - Example: "8 Feb: 18 bookings (14 completed, 3 confirmed, 1 cancelled)"
- **Bar Segments** (stacked bar variant, future enhancement):
  - Completed (dark blue)
  - Confirmed (medium blue)
  - Cancelled (light red)

**Data Source**: `GET /api/admin/analytics/bookings/volume?date_range=last_30_days&group_by=day`

**Sample Data**:
```
[
  { date: "2026-01-12", total: 15, completed: 12, confirmed: 2, cancelled: 1 },
  { date: "2026-01-13", total: 18, completed: 14, confirmed: 3, cancelled: 1 },
  { date: "2026-01-14", total: 22, completed: 18, confirmed: 3, cancelled: 1 },
  ... (30 data points)
]
```

**Responsive Behavior**:
- Desktop (≥1024px): Two charts side-by-side (50% width each)
- Tablet (768-1023px): Two charts side-by-side (50% width each, smaller height)
- Mobile (≤767px): Charts stacked vertically (100% width each)

---

### 4.7 Block 7: User Demographics Section

**Section Header**:
- H2: "User Demographics"
- Subtitle: "Platform user composition and geographic distribution"

**Layout**: Two-column (50% width each on desktop)

**Chart 1: User Role Breakdown (Pie/Donut Chart)**:

**Elements**:
- **Chart Title**: "Users by Role"
- **Chart Type**: Donut chart (hollow center with total user count)
  - Segment 1: Care Receivers (blue, largest segment typically)
  - Segment 2: Caregivers (green)
  - Segment 3: Family Members (orange)
- **Center Display**: Total user count (e.g., "1,247 Users")
  - Typography: 24px bold
- **Legend**: Below chart or to the right
  - Care Receivers: 623 (50%)
  - Caregivers: 412 (33%)
  - Family Members: 212 (17%)
- **Tooltips**: On hover, show percentage + count
  - Example: "Care Receivers: 623 users (50%)"

**Data Source**: `GET /api/admin/analytics/users/breakdown?date_range=last_30_days`

**Sample Data**:
```
{
  care_receivers: 623,
  caregivers: 412,
  family_members: 212,
  total: 1247
}
```

**Chart 2: Top 10 Regions by User Count (Horizontal Bar Chart)**:

**Elements**:
- **Chart Title**: "Top 10 Regions"
- **Chart Type**: Horizontal bar chart (bars extend right from Y-axis)
- **Y-Axis**: Postcode district (e.g., "SW1", "W1", "E1")
  - Label: "Postcode District"
  - Sort: Descending by user count (most users at top)
  - Limit: Top 10 only
- **X-Axis**: Count of users
  - Label: "Total Users"
  - Scale: 0 to max value (e.g., 0-150)
- **Bar Color**: Gradient from light blue (left) to dark blue (right)
- **Tooltips**: On hover, show exact count + breakdown
  - Example: "SW1: 145 users (78 care receivers, 45 caregivers, 22 family members)"
- **Data Labels**: Show count at end of each bar (e.g., "145")

**Data Source**: `GET /api/admin/analytics/users/geographic?date_range=last_30_days&limit=10`

**Sample Data**:
```
[
  { postcode_district: "SW1", total_users: 145, care_receivers: 78, caregivers: 45, family_members: 22 },
  { postcode_district: "W1", total_users: 132, care_receivers: 70, caregivers: 42, family_members: 20 },
  { postcode_district: "E1", total_users: 118, care_receivers: 65, caregivers: 38, family_members: 15 },
  ... (10 rows)
]
```

**Responsive Behavior**:
- Desktop (≥1024px): Two charts side-by-side (50% width each)
- Tablet (768-1023px): Two charts side-by-side (50% width each, smaller)
- Mobile (≤767px): Charts stacked vertically (100% width each)

---

### 4.8 Block 8: Revenue Metrics Section

**Section Header**:
- H2: "Revenue Metrics"
- Subtitle: "Platform financial performance and commission breakdown"

**Layout**: 3 metric cards (33% width each) + explanation box below

**Revenue Card 1: Total Revenue (GMV)**:

**Elements**:
- **Metric Label**: "Total Revenue (GMV)"
- **Metric Value**: "£3,120"
  - Typography: 28px bold
  - Color: `$txt` (#0F172A)
- **Trend Indicator**: "+28% vs. previous 30 days"
  - Color: Green if positive, red if negative
  - Icon: Up/down arrow
- **Subtext**: "From 156 completed bookings"
  - Typography: 12px regular
  - Color: `$txt-muted`

**Revenue Card 2: Platform Commission**:

**Elements**:
- **Metric Label**: "Platform Commission"
- **Metric Value**: "£468"
  - Typography: 28px bold
  - Color: `$primary` (#2563EB) (highlight as platform earnings)
- **Trend Indicator**: "+30% vs. previous 30 days"
- **Subtext**: "15% effective take rate"
  - Typography: 12px regular
  - Color: `$txt-muted`
- **Link**: "View commission settings →" (links to SCR-ADM-014, Payments tab)

**Revenue Card 3: Average Booking Value**:

**Elements**:
- **Metric Label**: "Avg Booking Value"
- **Metric Value**: "£20.00"
  - Typography: 28px bold
- **Trend Indicator**: "+3% vs. previous 30 days"
- **Subtext**: "Mean value per completed booking"
  - Typography: 12px regular
  - Color: `$txt-muted`

**Commission Breakdown Explanation Box**:

**Elements**:
- **Box Title**: "Commission Breakdown"
- **Box Type**: Info box (light blue background, bordered)
- **Content**:
  ```
  Platform Revenue Model:

  Care Receiver Service Fee: 5%
    - Added to booking total
    - Example: £60 booking → £3.00 service fee

  Caregiver Commission: 15%
    - Deducted from caregiver earnings
    - Example: £60 booking → £9.00 commission

  Total Platform Revenue per Booking: 20%
    - Effective take rate: £12.00 per £60 booking

  Note: Commission rates are configurable in System Settings.
  [View Commission Settings →]
  ```

**Data Sources**:
- Total Revenue: `GET /api/admin/analytics/revenue/gmv?date_range=last_30_days`
- Platform Commission: `GET /api/admin/analytics/revenue/commission?date_range=last_30_days`
- Average Booking Value: `GET /api/admin/analytics/revenue/average_booking?date_range=last_30_days`

---

### 4.9 Block 9: Caregiver Metrics Section

**Section Header**:
- H2: "Caregiver Metrics"
- Subtitle: "Caregiver supply, quality, and performance indicators"

**Layout**: 2 metric cards (left side, 50% width) + table (right side, 50% width)

**Metric Card 1: Verification Completion Rate**:

**Elements**:
- **Metric Label**: "Verification Completion Rate"
- **Metric Value**: "86%"
  - Typography: 28px bold
  - Color: Green (#10B981) if >80%, Yellow if 60-80%, Red if <60%
- **Progress Bar**: Visual representation of 86%
  - Filled portion: Green
  - Empty portion: Light gray
- **Subtext**: "354 of 412 caregivers fully verified"
  - Typography: 12px regular
  - Color: `$txt-muted`
- **Link**: "View verification queue →" (links to SCR-ADM-007)

**Data Source**: `GET /api/admin/analytics/caregivers/verification_rate?date_range=last_30_days`

**Metric Card 2: Average Response Time**:

**Elements**:
- **Metric Label**: "Avg Response Time"
- **Metric Value**: "3.2 hours"
  - Typography: 28px bold
  - Color: Green if <6h, Yellow if 6-24h, Red if >24h
- **Trend Indicator**: "-1.5h vs. previous 30 days" (negative is good here)
  - Color: Green (faster response = good)
  - Icon: Down arrow (green)
- **Subtext**: "Time from booking request to caregiver response"
  - Typography: 12px regular
  - Color: `$txt-muted`

**Data Source**: `GET /api/admin/analytics/caregivers/avg_response_time?date_range=last_30_days`

**Table: Top-Rated Caregivers**:

**Elements**:
- **Table Title**: "Top 10 Caregivers by Rating"
- **Columns**:
  1. Rank (1-10)
  2. Caregiver Name (e.g., "Sarah M." - first name + last initial)
  3. Rating (e.g., "5.0 ★")
  4. Reviews (e.g., "23 reviews")
  5. Completed Bookings (e.g., "67 bookings")
- **Row Actions**: Click row to view caregiver detail (future screen)
- **Sorting**: Pre-sorted by rating (descending), then by review count

**Sample Data**:
```
Rank | Caregiver    | Rating | Reviews | Bookings
-----|--------------|--------|---------|----------
1    | Sarah M.     | 5.0 ★  | 23      | 67
2    | James T.     | 5.0 ★  | 19      | 54
3    | Emma W.      | 4.9 ★  | 31      | 89
4    | Michael B.   | 4.9 ★  | 27      | 72
5    | Lucy P.      | 4.8 ★  | 22      | 58
6    | David R.     | 4.8 ★  | 18      | 45
7    | Sophie L.    | 4.8 ★  | 16      | 41
8    | Oliver H.    | 4.7 ★  | 20      | 53
9    | Grace C.     | 4.7 ★  | 15      | 38
10   | Thomas D.    | 4.7 ★  | 14      | 36
```

**Data Source**: `GET /api/admin/analytics/caregivers/top_rated?limit=10`

**Responsive Behavior**:
- Desktop (≥1024px): 2 metric cards (left, 50%) + table (right, 50%)
- Tablet (768-1023px): Cards and table stacked vertically (100% width each)
- Mobile (≤767px): Cards and table stacked (100% width), table scrolls horizontally

---

## 5. ASCII Wireframes

### 5.1 Desktop Layout (1440px) - Default State

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ [iCare Logo]         [Search: users, bookings...]  [🔔 3]  [SA ▾ Admin Sarah]       │
├──────────────────────────────────────────────────────────────────────────────────────┤
│ Dashboard > Analytics                                                                 │
├──────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                       │
│  Platform Analytics                                                                   │
│  🔄 Last Updated: Today, 15:00                                                        │
│                                                                                       │
├──────────────────────────────────────────────────────────────────────────────────────┤
│ [📅 Last 30 days ▾]  [↔ Compare to: Previous 30 days ▾]  [⬇ Export CSV]             │
├──────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                       │
│  ┌─────────────┬──────────────┬─────────────────┬────────────────┐                  │
│  │ Total Users │ Active       │ Revenue (GMV)   │ Avg Rating     │                  │
│  │             │ Bookings     │                 │                │                  │
│  │ 1,247       │ 42           │ £3,120          │ 4.7 ★★★★★      │                  │
│  │ +12% ↑      │ +5% ↑        │ +28% ↑          │ +0.2 ↑         │                  │
│  │             │ 8 confirmed  │ £468 commission │ 156 reviews    │                  │
│  │             │ 34 in prog.  │ (15% take rate) │                │                  │
│  │ View all →  │              │ Settings →      │                │                  │
│  └─────────────┴──────────────┴─────────────────┴────────────────┘                  │
│                                                                                       │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  GROWTH TRENDS                                                                        │
│  User registrations and booking volume over time                                     │
│                                                                                       │
│  ┌──────────────────────────────────────┬────────────────────────────────────────┐  │
│  │ User Registrations                   │ Booking Volume                         │  │
│  │                                      │                                        │  │
│  │  15│                                 │  30│                                   │  │
│  │  12│     ╱───╲                       │  24│         ┃                         │  │
│  │   9│   ╱       ╲     ╱──             │  18│       ┃ ┃   ┃                     │  │
│  │   6│ ╱           ╲ ╱                 │  12│   ┃   ┃ ┃ ┃ ┃ ┃                   │  │
│  │   3│╱              ╲                 │   6│ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃                 │  │
│  │   0├─────────────────────────────    │   0├───────────────────────────────    │  │
│  │    1   8   15  22  29  (Feb 2026)    │    1   8   15  22  29  (Feb 2026)      │  │
│  │                                      │                                        │  │
│  │ Legend:                              │ Tooltip (on hover):                    │  │
│  │ ─ Care Receivers (blue)              │ "8 Feb: 18 bookings                    │  │
│  │ ─ Caregivers (green)                 │  (14 completed, 3 confirmed, 1 canc.)" │  │
│  │ ─ Family Members (orange)            │                                        │  │
│  └──────────────────────────────────────┴────────────────────────────────────────┘  │
│                                                                                       │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  USER DEMOGRAPHICS                                                                    │
│  Platform user composition and geographic distribution                               │
│                                                                                       │
│  ┌──────────────────────────────────────┬────────────────────────────────────────┐  │
│  │ Users by Role                        │ Top 10 Regions                         │  │
│  │                                      │                                        │  │
│  │         1,247                        │ SW1  ████████████ 145                  │  │
│  │         Users                        │ W1   ███████████  132                  │  │
│  │                                      │ E1   ██████████   118                  │  │
│  │      ╱───────╲                       │ N1   █████████    105                  │  │
│  │    ╱ 50%  CR  ╲                      │ SE1  ████████     98                   │  │
│  │   │            │                     │ NW1  ████████     94                   │  │
│  │   │  17%  33%  │                     │ EC1  ███████      87                   │  │
│  │    ╲  FM   CG ╱                      │ WC1  ███████      82                   │  │
│  │      ╲───────╱                       │ SW3  ██████       76                   │  │
│  │                                      │ W2   ██████       71                   │  │
│  │ Legend:                              │                                        │  │
│  │ CR: Care Receivers (623)             │ Hover for breakdown by role            │  │
│  │ CG: Caregivers (412)                 │                                        │  │
│  │ FM: Family Members (212)             │                                        │  │
│  └──────────────────────────────────────┴────────────────────────────────────────┘  │
│                                                                                       │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  REVENUE METRICS                                                                      │
│  Platform financial performance and commission breakdown                             │
│                                                                                       │
│  ┌──────────────────┬─────────────────────┬──────────────────────┐                  │
│  │ Total Revenue    │ Platform Commission │ Avg Booking Value    │                  │
│  │ (GMV)            │                     │                      │                  │
│  │ £3,120           │ £468                │ £20.00               │                  │
│  │ +28% ↑           │ +30% ↑              │ +3% ↑                │                  │
│  │ 156 bookings     │ 15% take rate       │ Per completed booking│                  │
│  │                  │ Settings →          │                      │                  │
│  └──────────────────┴─────────────────────┴──────────────────────┘                  │
│                                                                                       │
│  ┌──────────────────────────────────────────────────────────────────────────────┐   │
│  │ ℹ️  Commission Breakdown                                                      │   │
│  │                                                                               │   │
│  │ Platform Revenue Model:                                                       │   │
│  │                                                                               │   │
│  │ Care Receiver Service Fee: 5%                                                 │   │
│  │   • Added to booking total                                                    │   │
│  │   • Example: £60 booking → £3.00 service fee                                  │   │
│  │                                                                               │   │
│  │ Caregiver Commission: 15%                                                     │   │
│  │   • Deducted from caregiver earnings                                          │   │
│  │   • Example: £60 booking → £9.00 commission                                   │   │
│  │                                                                               │   │
│  │ Total Platform Revenue per Booking: 20%                                       │   │
│  │   • Effective take rate: £12.00 per £60 booking                               │   │
│  │                                                                               │   │
│  │ Note: Commission rates are configurable in System Settings.                   │   │
│  │ [View Commission Settings →]                                                  │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                       │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  CAREGIVER METRICS                                                                    │
│  Caregiver supply, quality, and performance indicators                                │
│                                                                                       │
│  ┌──────────────────────────────────────┬────────────────────────────────────────┐  │
│  │ Verification Completion Rate         │ Top 10 Caregivers by Rating           │  │
│  │                                      │                                        │  │
│  │ 86%                                  │ Rank | Name      | Rating | Reviews   │  │
│  │ ████████████████████░░░░  86%        │ ─────│───────────│────────│────────── │  │
│  │ 354 of 412 caregivers verified       │  1   │ Sarah M.  │ 5.0 ★  │ 23 / 67  │  │
│  │ View verification queue →            │  2   │ James T.  │ 5.0 ★  │ 19 / 54  │  │
│  │                                      │  3   │ Emma W.   │ 4.9 ★  │ 31 / 89  │  │
│  │ ─────────────────────────────────    │  4   │ Michael B.│ 4.9 ★  │ 27 / 72  │  │
│  │                                      │  5   │ Lucy P.   │ 4.8 ★  │ 22 / 58  │  │
│  │ Average Response Time                │  6   │ David R.  │ 4.8 ★  │ 18 / 45  │  │
│  │                                      │  7   │ Sophie L. │ 4.8 ★  │ 16 / 41  │  │
│  │ 3.2 hours                            │  8   │ Oliver H. │ 4.7 ★  │ 20 / 53  │  │
│  │ -1.5h ↓ (improvement)                │  9   │ Grace C.  │ 4.7 ★  │ 15 / 38  │  │
│  │ Time from request to response        │  10  │ Thomas D. │ 4.7 ★  │ 14 / 36  │  │
│  │                                      │                                        │  │
│  └──────────────────────────────────────┴────────────────────────────────────────┘  │
│                                                                                       │
├──────────────────────────────────────────────────────────────────────────────────────┤
│ About │ Privacy │ Terms │ Support │ v1.0.0                                           │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Mobile Layout (375px) - Key Metrics & Growth Trends

```
┌─────────────────────────────────────┐
│ [☰]  iCare         [🔔 3]  [SA ▾]  │
├─────────────────────────────────────┤
│ ← Dashboard                          │
├─────────────────────────────────────┤
│                                     │
│ Platform Analytics                  │
│ 🔄 Last Updated: Today, 15:00       │
│                                     │
├─────────────────────────────────────┤
│ [📅 Last 30 days ▾]                 │
│ [↔ Compare: Previous 30d ▾]         │
│ [⬇ Export CSV]                      │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Total Users                     │ │
│ │ 1,247                           │ │
│ │ +12% ↑ vs. previous 30 days     │ │
│ │ View all users →                │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Active Bookings                 │ │
│ │ 42                              │ │
│ │ +5% ↑ vs. previous 30 days      │ │
│ │ 8 confirmed, 34 in progress     │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Revenue (GMV)                   │ │
│ │ £3,120                          │ │
│ │ +28% ↑ vs. previous 30 days     │ │
│ │ £468 commission (15% take rate) │ │
│ │ View settings →                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Average Rating                  │ │
│ │ 4.7 ★★★★★                       │ │
│ │ +0.2 ↑ vs. previous 30 days     │ │
│ │ Based on 156 reviews            │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│ GROWTH TRENDS                       │
│                                     │
│ User Registrations                  │
│  15│                                │
│  12│     ╱───╲                      │
│   9│   ╱       ╲     ╱──            │
│   6│ ╱           ╲ ╱                │
│   3│╱              ╲                │
│   0├─────────────────────           │
│    1   8   15  22  29               │
│                                     │
│ Legend:                             │
│ ─ Care Receivers                    │
│ ─ Caregivers                        │
│ ─ Family Members                    │
│                                     │
│ ─────────────────────────────────   │
│                                     │
│ Booking Volume                      │
│  30│                                │
│  24│         ┃                      │
│  18│       ┃ ┃   ┃                  │
│  12│   ┃   ┃ ┃ ┃ ┃ ┃                │
│   6│ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃              │
│   0├───────────────────             │
│    1   8   15  22  29               │
│                                     │
├─────────────────────────────────────┤
│ ... (scroll for more sections) ...  │
└─────────────────────────────────────┘
```

---

## 6. State Coverage

### 6.1 Default State (30-Day View)

**Conditions**:
- Admin authenticated
- Date range: "Last 30 days" (default)
- Comparison: "Previous 30 days" (default)
- All analytics data loaded successfully

**Display**:
- Date range selector: "Last 30 days" selected
- All 4 key metric cards: Populated with current values
- All charts: Rendered with 30 data points (daily granularity)
- Tables: Top 10 caregivers displayed
- Export button: Enabled

### 6.2 Loading State (Initial Page Load)

**Conditions**:
- User navigates to `/admin/analytics`
- API requests in progress

**Display**:
- Date range selector: Visible and enabled
- Key metric cards: Skeleton loaders (4 pulsing gray rectangles)
- Charts: Empty chart frames with loading spinners
- Tables: Loading spinner
- Export button: Disabled (grayed out)

**Duration**: Typically 2-3 seconds for all API calls to complete

### 6.3 Date Range Change State

**Conditions**:
- User selects different date range (e.g., "Last 7 days" or "Custom range")
- API requests triggered

**Display**:
- Date range dropdown: Shows new selection, disabled during load
- Key metric cards: Skeleton loaders (replace current values)
- Charts: Fade out current data, show loading spinners
- Tables: Loading spinner overlay
- Export button: Disabled
- Sticky bar: Loading indicator (thin progress bar at top)

**Behavior**:
- All metrics refresh to show data for new date range
- Comparison period auto-updates (e.g., "Last 7 days" → "Compare to: Previous 7 days")
- Chart X-axis adjusts (7 days = daily, 90 days = weekly)

### 6.4 Custom Date Range Selection State

**Conditions**:
- User selects "Custom range..." from date range dropdown
- Date picker modal opens

**Display**:
- **Modal Overlay**: Semi-transparent black background
- **Date Picker Modal**:
  - Title: "Select Custom Date Range"
  - Start Date input: Date picker (calendar widget)
  - End Date input: Date picker (calendar widget)
  - Preset buttons: "Last 7 days", "Last 30 days", "Last 90 days", "This year"
  - Validation: End date must be after start date
  - Buttons: "Apply" (primary), "Cancel" (secondary)

**Actions**:
- Click "Apply": Close modal, reload analytics with custom date range, update date range dropdown label to "12 Jan - 11 Feb 2026"
- Click "Cancel": Close modal, keep current date range

**Date Range Limits**:
- Minimum: 1 day
- Maximum: 1 year (365 days)
- Validation error if range >365 days: "Date range cannot exceed 1 year. Please select a shorter period."

### 6.5 Empty State (New Platform, No Data)

**Conditions**:
- Platform recently launched (R0 first week)
- No users registered, no bookings created, no revenue

**Display**:
- Date range selector: Visible but shows "No data available"
- Key metric cards: All show "0" or "—" (no trend indicators)
  - Total Users: "0"
  - Active Bookings: "0"
  - Revenue: "£0.00"
  - Average Rating: "—" (no reviews yet)
- Charts: Empty state illustrations
  - User Registrations: "No registrations yet"
  - Booking Volume: "No bookings yet"
- Tables: Empty state "No caregivers rated yet"
- Export button: Disabled with tooltip "No data to export"

**Empty State Message** (top of page):
```
┌────────────────────────────────────────────────┐
│ ℹ️  Platform Analytics Not Yet Available       │
│                                                │
│ Analytics will populate once users register    │
│ and bookings are created. Check back soon!     │
└────────────────────────────────────────────────┘
```

### 6.6 Export CSV Success State

**Conditions**:
- User clicks "Export CSV" button
- CSV generation successful

**Display**:
- Export button: Shows loading spinner + "Generating..." for 1-2 seconds
- Toast notification (top-right):
  - Icon: Green checkmark
  - Message: "Analytics data exported successfully. File downloaded."
  - Auto-dismiss: 3 seconds
- Browser download: File `icare-analytics-2026-02-11.csv` downloads to user's device

**CSV Contents** (example):
```
iCare Platform Analytics Export
Generated: 2026-02-11 15:30:45
Date Range: 2026-01-12 to 2026-02-11 (Last 30 days)
Comparison Period: 2025-12-13 to 2026-01-11

KEY METRICS
Metric,Value,Change vs Previous Period
Total Users,1247,+12%
Active Bookings,42,+5%
Revenue (GMV),£3120,+28%
Average Rating,4.7,+0.2

USER REGISTRATIONS (Daily)
Date,Care Receivers,Caregivers,Family Members
2026-01-12,8,5,2
2026-01-13,12,7,3
... (30 rows)

BOOKING VOLUME (Daily)
Date,Total Bookings,Completed,Confirmed,Cancelled
2026-01-12,15,12,2,1
... (30 rows)

TOP 10 REGIONS
Postcode,Total Users,Care Receivers,Caregivers,Family Members
SW1,145,78,45,22
W1,132,70,42,20
... (10 rows)

TOP 10 CAREGIVERS
Rank,Name,Rating,Reviews,Bookings
1,Sarah M.,5.0,23,67
2,James T.,5.0,19,54
... (10 rows)
```

### 6.7 Export CSV Error State

**Conditions**:
- User clicks "Export CSV" button
- CSV generation fails (server error, timeout, permissions issue)

**Display**:
- Export button: Returns to enabled state
- Error toast notification (top-right):
  - Icon: Red X
  - Message: "Failed to export analytics data. Please try again or contact support."
  - Action button: "Retry"
  - Auto-dismiss: 5 seconds
- No file downloaded

### 6.8 Comparison Period State

**Conditions**:
- User selects comparison period (e.g., "Previous 30 days" or "Same period last year")

**Display**:
- All key metric cards: Show trend indicators
  - Green up arrow + percentage: "+12%" (growth)
  - Red down arrow + percentage: "-8%" (decline)
  - Gray horizontal line: "0%" (no change)
- Charts: Optional comparison overlay (dotted line showing previous period data, future enhancement)
- Comparison dropdown: Shows selected comparison period

**Behavior**:
- If "None" selected for comparison: Trend indicators hidden, only absolute values shown
- If "Same period last year" selected: Shows year-over-year growth (e.g., "Feb 2026 vs. Feb 2025")

### 6.9 Error State (API Failure)

**Conditions**:
- Analytics API endpoint returns error (500 server error, network timeout)
- Unable to load metrics data

**Display**:
- Error alert banner (top of page, below date range selector):
  - Icon: Red warning triangle
  - Message: "Unable to load analytics data. This may be a temporary issue."
  - Action button: "Retry" (reload all analytics)
  - Secondary button: "Contact Support"
- Key metric cards: Show error state "Failed to load"
- Charts: Error state "Unable to display chart data"
- Tables: Error state "Data unavailable"
- Export button: Disabled

**Retry Behavior**:
- Click "Retry": Reload all API calls, show loading state
- If retry fails again: Show persistent error with "Contact Support" escalation

---

## 7. Responsive Design Notes

### 7.1 Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Mobile | 320px - 767px | Single column, stacked cards, simplified charts, horizontal scroll tables |
| Tablet | 768px - 1023px | 2-column layouts, responsive charts, maintained tables |
| Desktop | 1024px+ | Full layouts, side-by-side charts, full tables |

### 7.2 Mobile Adaptations (≤767px)

**Date Range Selector**:
- Layout: Stack vertically (full-width dropdowns)
- Export button: Full-width below dropdowns

**Key Metric Cards**:
- Layout: 1 card per row (100% width), stacked
- Order: Total Users → Active Bookings → Revenue → Rating

**Charts**:
- Width: 100% (full viewport width)
- Height: Reduced to 250px (from 400px desktop)
- Layout: Stacked vertically (User Registrations above Booking Volume)
- Tooltips: Larger touch targets (easier to tap data points)

**Pie Chart (User Role Breakdown)**:
- Size: Smaller diameter (200px)
- Legend: Below chart (not to the side)

**Bar Chart (Top 10 Regions)**:
- Layout: Vertical orientation maintained
- Labels: Abbreviated if needed (e.g., "SW1" instead of "South West 1")

**Tables**:
- Layout: Horizontal scroll (table wider than viewport)
- Alternative: Transform to card layout (each row becomes a vertical card)

**Top Caregivers Table** (mobile card layout):
```
┌───────────────────────────────┐
│ #1 Sarah M.                   │
│ ★★★★★ 5.0                     │
│ 23 reviews | 67 bookings      │
└───────────────────────────────┘
┌───────────────────────────────┐
│ #2 James T.                   │
│ ★★★★★ 5.0                     │
│ 19 reviews | 54 bookings      │
└───────────────────────────────┘
... (10 cards)
```

### 7.3 Tablet Adaptations (768px - 1023px)

**Key Metric Cards**:
- Layout: 2 cards per row (50% width each)
- Order: Total Users + Active Bookings (row 1), Revenue + Rating (row 2)

**Charts**:
- Layout: 2 charts per row (50% width each) maintained
- Height: Reduced to 350px (from 400px desktop)

**Tables**:
- Width: Full container width
- Font size: Slightly reduced (13px instead of 14px)

### 7.4 Desktop Optimizations (≥1024px)

**Sticky Date Range Selector**:
- Position: Sticky (sticks to top on scroll, below navigation header)
- Z-index: 10 (above content, below navigation)

**Charts**:
- Width: Side-by-side layouts (50% each)
- Height: 400px (generous space for data visualization)
- Hover tooltips: Rich information on hover

**Tables**:
- Full width: No horizontal scroll
- Row hover: Subtle background color change for clarity

---

## 8. Accessibility Requirements

### 8.1 WCAG 2.1 AA Compliance

#### Perceivable

**Text Alternatives**:
- All charts: Provide data table alternative (hidden but accessible to screen readers)
- Chart tooltips: ARIA live regions announce values on hover
- Icons: ARIA labels (e.g., trend arrows: `aria-label="12% increase"`)

**Color Contrast**:
- Text on white background: 4.5:1 minimum
- Chart colors: Distinguishable by pattern as well as color (solid, dashed, dotted lines)
- Trend indicators: Not reliant on color alone (icons + text: "↑ +12%")

**Charts Accessibility**:
- Line charts: Each line has unique pattern (solid, dashed, dotted) in addition to color
- Bar charts: Data labels on bars for screen reader users
- Pie charts: Include percentage labels inside or outside segments

#### Operable

**Keyboard Accessible**:
- Date range dropdown: Tab to focus, Arrow keys to navigate options, Enter to select
- Export button: Tab to focus, Enter to trigger download
- Chart interactions: Tab to focus chart, Arrow keys to navigate data points, Enter to show tooltip

**Focus Order**:
1. Skip navigation link ("Skip to analytics content")
2. Date range selector
3. Comparison dropdown
4. Export button
5. Key metric cards (left to right, top to bottom)
6. Charts (top to bottom)
7. Tables (row by row)

**Focus Indicators**:
- Visible outline: 2px solid blue (#2563EB) on focus
- Chart data points: Enlarged on focus (keyboard navigation)

#### Understandable

**Data Table Alternatives for Charts**:
- Each chart accompanied by hidden `<table>` element (visually hidden but screen-reader accessible)
- Example for User Registrations chart:
  ```html
  <table aria-label="User Registrations Data Table" class="sr-only">
    <caption>User registrations by role from 12 Jan to 11 Feb 2026</caption>
    <thead>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Care Receivers</th>
        <th scope="col">Caregivers</th>
        <th scope="col">Family Members</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>12 January 2026</td>
        <td>8</td>
        <td>5</td>
        <td>2</td>
      </tr>
      ... (30 rows)
    </tbody>
  </table>
  ```

**Metric Card Announcements**:
- Total Users card: "Total users: 1,247. Increased by 12% compared to previous 30 days. Link: View all users."
- Revenue card: "Revenue (Gross Merchandise Value): £3,120. Increased by 28% compared to previous 30 days. Platform commission: £468 (15% take rate). Link: View commission settings."

**Chart Tooltips**:
- ARIA live region: `<div aria-live="polite" aria-atomic="true">`
- Announces on hover/focus: "8 February 2026: 18 bookings. 14 completed, 3 confirmed, 1 cancelled."

#### Robust

**Semantic HTML**:
- Section headings: `<h2>` for major sections (Growth Trends, Revenue Metrics, etc.)
- Metric labels: `<dt>` (definition term) and metric values: `<dd>` (definition description)
- Tables: Proper `<table>`, `<thead>`, `<tbody>`, `<th scope="col">` structure

**ARIA Attributes**:
- Charts: `role="img"`, `aria-label="[Chart description]"`
- Trend indicators: `aria-label="Increased by 12%"` (not just "↑ +12%")
- Loading states: `aria-busy="true"` during data load
- Empty states: `aria-live="polite"` to announce "No data available"

### 8.2 Screen Reader Experience

**Page Load**:
- "Platform Analytics. Last updated today at 15:00. Date range: Last 30 days. Comparison: Previous 30 days."

**Key Metrics Row**:
- "Total users: 1,247. Increased by 12% compared to previous 30 days. Link: View all users."
- "Active bookings: 42. Increased by 5% compared to previous 30 days. 8 confirmed, 34 in progress."
- "Revenue (Gross Merchandise Value): £3,120. Increased by 28%. Platform commission: £468 (15% take rate). Link: View commission settings."
- "Average rating: 4.7 out of 5 stars. Increased by 0.2. Based on 156 reviews."

**Chart Navigation** (keyboard users):
- Tab to chart: "User registrations line chart. Use arrow keys to navigate data points. Press T to view data table."
- Arrow right: "13 January 2026: Care receivers: 12, Caregivers: 7, Family members: 3."
- Press T: Focus moves to hidden data table, announced as "User registrations data table. 30 rows, 4 columns. Date, Care receivers, Caregivers, Family members."

**Export Action**:
- Focus on Export button: "Export CSV button. Downloads analytics data as CSV file."
- Click/Enter: "Generating analytics export. Please wait."
- Success: "Analytics data exported successfully. File downloaded: icare-analytics-2026-02-11.csv"

---

## 9. Component Reuse

### 9.1 Existing Components (from dashboard-shared-components.md)

**Navigation**:
- `NAV-HEADER-AUTH` (role: "admin") - Block 1

**Data Display**:
- `METRIC-CARD` (with trend indicator) - Key Metrics Row (Block 5)
- `TABLE` (with sortable headers) - Top Caregivers Table
- `PROGRESS-BAR` - Verification Completion Rate

**Interactive**:
- `BUTTON` (secondary variant) - Export CSV button
- `DROPDOWN-MENU` (select) - Date range selector, Comparison dropdown

**Feedback**:
- `TOAST-NOTIFICATION` (success, error variants) - Export success/error
- `ALERT-BANNER` (error variant) - API failure state
- `LOADING-SKELETON` - Metric card loading state

**Layout**:
- `TWO-COLUMN-LAYOUT` - Charts side-by-side
- `SECTION-CONTAINER` (heading + content) - Each analytics section

### 9.2 New Components (to be added to component library)

**Line Chart Component**:
- **Component ID**: `CHART-LINE`
- **Type**: Organism
- **Props**: `data: Array<{x, y}>`, `series: Array<{name, color}>`, `xLabel: string`, `yLabel: string`, `legend: boolean`
- **Used In**: User Registrations chart
- **Library Recommendation**: Recharts, Chart.js, or D3.js wrapper

**Bar Chart Component**:
- **Component ID**: `CHART-BAR`
- **Type**: Organism
- **Props**: `data: Array<{x, y}>`, `color: string`, `xLabel: string`, `yLabel: string`, `tooltips: boolean`
- **Used In**: Booking Volume chart, Top 10 Regions chart

**Pie/Donut Chart Component**:
- **Component ID**: `CHART-PIE`
- **Type**: Organism
- **Props**: `data: Array<{label, value, color}>`, `centerLabel: string`, `centerValue: string`, `legend: boolean`
- **Used In**: User Role Breakdown chart

**Date Range Picker Component**:
- **Component ID**: `DATE-RANGE-PICKER`
- **Type**: Molecule
- **Props**: `startDate: Date`, `endDate: Date`, `onChange: function`, `presets: Array<string>`, `maxRange: number (days)`
- **Used In**: Custom date range selection (modal)

**Metric Card with Trend Component** (enhanced from existing):
- **Component ID**: `METRIC-CARD-TREND`
- **Type**: Molecule
- **Props**: `label: string`, `value: string`, `trend: {percentage: number, direction: "up"|"down", comparison: string}`, `subtext: string`, `link: {label, href}`
- **Used In**: All key metric cards (Total Users, Active Bookings, Revenue, Rating)

---

## 10. Design Notes for Figma

### 10.1 Visual Hierarchy

**Primary Elements** (highest prominence):
- Page title "Platform Analytics" (32px bold)
- Key metric values (32px or 28px bold)
- Chart visualizations (large, colorful, data-rich)
- Export CSV button (prominent, always accessible)

**Secondary Elements** (supporting information):
- Date range selector (16px regular)
- Section headings (24px semibold)
- Chart labels and axes (13px regular)
- Trend indicators (13px with icons)
- Table headers (14px medium)

**Tertiary Elements** (low emphasis):
- Breadcrumb (14px regular, muted)
- Subtitles (14px regular, muted)
- Help text and subtext (12px regular, muted)

### 10.2 Color Palette

**Chart Colors** (multi-series line chart):
- Care Receivers: #2563EB (blue)
- Caregivers: #10B981 (green)
- Family Members: #F59E0B (orange)
- Bookings: #2563EB (blue)

**Trend Indicators**:
- Positive (growth): #10B981 (green) + up arrow
- Negative (decline): #EF4444 (red) + down arrow
- Neutral (no change): #6B7280 (gray) + horizontal line

**Status Colors**:
- Good performance: #10B981 (green) - e.g., verification rate >80%
- Warning: #F59E0B (orange) - e.g., verification rate 60-80%
- Poor performance: #EF4444 (red) - e.g., verification rate <60%

**Neutral Grays**:
- Text primary: #0F172A
- Text muted: rgba(15,23,42,0.72)
- Border: rgba(0,0,0,0.06)
- Background subtle: #F8FAFC

### 10.3 Typography Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 (Page Title) | 32px | Bold (700) | 40px |
| H2 (Section Heading) | 24px | Semibold (600) | 32px |
| Metric Value (Large) | 32px | Bold (700) | 40px |
| Metric Value (Medium) | 28px | Bold (700) | 36px |
| Metric Label | 14px | Medium (500) | 20px |
| Chart Label | 13px | Regular (400) | 18px |
| Trend Indicator | 13px | Regular (400) | 18px |
| Table Cell | 14px | Regular (400) | 20px |
| Subtext | 12px | Regular (400) | 16px |

### 10.4 Spacing System (8px Grid)

**Section Spacing**:
- Page title → Date range selector: 24px
- Date range selector → Key metrics: 32px
- Between sections (Growth Trends, User Demographics, etc.): 48px
- Section heading → Content: 24px

**Card Spacing**:
- Internal padding: 24px all sides
- Gap between cards (horizontal): 16px
- Gap between cards (vertical): 24px

**Chart Spacing**:
- Chart title → Chart area: 16px
- Chart area internal padding: 16px
- Legend spacing: 8px between items

### 10.5 Chart Design Specifications

**Line Chart**:
- Line width: 2px
- Data point markers: 6px diameter circles (optional, only on hover)
- Grid lines: Horizontal only, light gray (rgba(0,0,0,0.06))
- Axis lines: 1px solid gray
- Tooltips: White background, subtle shadow, 12px padding

**Bar Chart**:
- Bar width: Responsive (fills available space with 8px gaps)
- Bar corners: Rounded (4px top corners)
- Bar color: Solid fill, lighter on hover
- Hover state: Slightly darker shade + tooltip

**Pie/Donut Chart**:
- Outer diameter: 300px (desktop), 200px (mobile)
- Inner diameter (donut hole): 50% of outer diameter
- Segment borders: 2px white (separates segments)
- Center label: 24px bold
- Legend: 14px regular, 8px gap between items

### 10.6 Interaction States

**Date Range Dropdown**:
- Default: White background, gray border
- Hover: Light gray background (#F8FAFC)
- Focus: Blue border (#2563EB)
- Open: Dropdown menu appears below, blue border on trigger

**Export CSV Button**:
- Default: White background, gray border, dark text
- Hover: Light gray background
- Active (clicked): Darker gray background
- Loading: Spinner inside button, text "Generating...", disabled state
- Disabled: Light gray background, gray text, cursor not-allowed

**Metric Card**:
- Default: White background, subtle border
- Hover: Subtle shadow elevation (0 2px 8px rgba(0,0,0,0.1))
- Focus (if clickable): Blue border

**Chart Hover/Focus**:
- Data point hover: Enlarged marker (8px), tooltip appears
- Keyboard focus: Blue outline around chart area, instructions appear ("Use arrow keys to navigate")

### 10.7 Figma Layer Structure (Recommended)

```
📁 SCR-ADM-015 Platform Analytics
├── 🖼️ Frame: Desktop (1440x900+)
│   ├── 📦 Component Instance: NAV-HEADER-AUTH (admin)
│   ├── 📦 Component: Breadcrumb
│   ├── 📦 Component: Page Title + Subtitle
│   ├── 📁 Group: Date Range Selector (sticky bar)
│   │   ├── 📦 Component: Dropdown (Date Range)
│   │   ├── 📦 Component: Dropdown (Comparison)
│   │   └── 📦 Component: Button (Export CSV)
│   ├── 📁 Group: Key Metrics Row
│   │   ├── 📦 Component: Metric Card (Total Users)
│   │   ├── 📦 Component: Metric Card (Active Bookings)
│   │   ├── 📦 Component: Metric Card (Revenue)
│   │   └── 📦 Component: Metric Card (Avg Rating)
│   ├── 📁 Group: Growth Trends Section
│   │   ├── 📦 Component: Section Header
│   │   ├── 📦 Component: Chart-Line (User Registrations)
│   │   └── 📦 Component: Chart-Bar (Booking Volume)
│   ├── 📁 Group: User Demographics Section
│   │   ├── 📦 Component: Section Header
│   │   ├── 📦 Component: Chart-Pie (User Breakdown)
│   │   └── 📦 Component: Chart-Bar-Horizontal (Top Regions)
│   ├── 📁 Group: Revenue Metrics Section
│   │   ├── 📦 Component: Section Header
│   │   ├── 📦 Component: Metric Card (Total Revenue)
│   │   ├── 📦 Component: Metric Card (Commission)
│   │   ├── 📦 Component: Metric Card (Avg Value)
│   │   └── 📦 Component: Info Box (Commission Breakdown)
│   ├── 📁 Group: Caregiver Metrics Section
│   │   ├── 📦 Component: Section Header
│   │   ├── 📦 Component: Metric Card (Verification Rate)
│   │   ├── 📦 Component: Metric Card (Response Time)
│   │   └── 📦 Component: Table (Top Caregivers)
│   └── 📦 Component Instance: Footer
├── 🖼️ Frame: Tablet (768x1024)
├── 🖼️ Frame: Mobile (375x812)
├── 🖼️ Frame: Empty State (No Data)
├── 🖼️ Frame: Loading State
└── 🖼️ Frame: Modal - Custom Date Range Picker
```

### 10.8 Prototype Interactions

**Date Range Selection**:
- Click "Last 30 days" dropdown → Show options (7 days, 30 days, 90 days, Custom)
- Select "Last 7 days" → Show loading state (1 sec) → Update all metrics/charts to 7-day data

**Custom Date Range**:
- Click "Custom range..." → Show date picker modal
- Select start date → Select end date → Click "Apply" → Show loading state → Update analytics

**Export CSV**:
- Click "Export CSV" → Button shows loading spinner (2 sec) → Success toast appears → Simulate file download

**Metric Card Links**:
- Click "View all users →" (Total Users card) → Navigate to Frame "User Management" (or external link placeholder)
- Click "View commission settings →" (Revenue card) → Navigate to Frame "System Settings"

**Chart Interactions** (simulated):
- Hover data point on line chart → Show tooltip with exact values
- Hover bar on bar chart → Show tooltip with breakdown

---

## 11. Cross-References

### 11.1 Source Documents

**Product Specifications**:
- `/docs/product/tier1-route-map.md` - Route definition for `/admin/analytics`
- `/docs/product/features/tier1-admin-specification.md` - Admin analytics section 9.1, Platform Metrics Dashboard
- `/docs/product/features/tier1-booking-specification.md` - Revenue calculation, commission rates

**Design System**:
- `/docs/tiers/tier1/draft-design-specs/components/dashboard-shared-components.md` - Reusable components
- `/packages/ICare/app/styles/_tokens.scss` - Design tokens

**Related Wireframes**:
- `/docs/tiers/tier1/draft-design-specs/wireframes/dashboards/adm-dashboard-scr-adm-001.md` - Admin Dashboard (entry point)
- `/docs/tiers/tier1/draft-design-specs/wireframes/admin/scr-adm-005-user-management.md` - User Management (linked from Total Users metric)
- `/docs/tiers/tier1/draft-design-specs/wireframes/admin/scr-adm-014-system-settings.md` - System Settings (linked from Revenue metric, commission settings)

### 11.2 Related Screens

**Admin Screens**:
- **SCR-ADM-001** (Admin Dashboard): Entry point, links to this screen
- **SCR-ADM-005** (User Management): "Total Users" metric links here
- **SCR-ADM-007** (Verification Queue): "Verification Rate" metric links here
- **SCR-ADM-014** (System Settings): "View Commission Settings" link goes here

**Data Dependencies**:
- All booking screens (SCR-CR-006, SCR-CR-008, SCR-CG-013): Booking data feeds analytics
- Payment screens (SCR-CR-013, SCR-CG-020): Revenue and commission data feeds analytics
- Review system (future): Average rating data feeds analytics

### 11.3 API Endpoints (Assumed)

**Analytics APIs**:
- `GET /api/admin/analytics/users/total?date_range=last_30_days&compare_to=previous_30_days`
- `GET /api/admin/analytics/bookings/active?date_range=last_30_days`
- `GET /api/admin/analytics/revenue/gmv?date_range=last_30_days`
- `GET /api/admin/analytics/reviews/average?date_range=last_30_days`
- `GET /api/admin/analytics/users/registrations?date_range=last_30_days&group_by=day`
- `GET /api/admin/analytics/bookings/volume?date_range=last_30_days&group_by=day`
- `GET /api/admin/analytics/users/breakdown?date_range=last_30_days`
- `GET /api/admin/analytics/users/geographic?date_range=last_30_days&limit=10`
- `GET /api/admin/analytics/revenue/commission?date_range=last_30_days`
- `GET /api/admin/analytics/revenue/average_booking?date_range=last_30_days`
- `GET /api/admin/analytics/caregivers/verification_rate?date_range=last_30_days`
- `GET /api/admin/analytics/caregivers/avg_response_time?date_range=last_30_days`
- `GET /api/admin/analytics/caregivers/top_rated?limit=10`
- `GET /api/admin/analytics/export?date_range=last_30_days&format=csv`

### 11.4 Compliance Requirements

**GDPR Considerations**:
- Anonymized data: Top caregivers table shows first name + last initial only (not full names)
- Aggregated metrics: No individual user data exposed in analytics (only aggregate counts/averages)
- Export audit: CSV exports logged in audit trail (who exported, when, date range)

**Business Intelligence**:
- Real-time vs. cached: Analytics data refreshed every 15 minutes (acceptable latency for business intelligence)
- Historical data retention: Platform stores daily analytics snapshots for trend analysis (minimum 2 years)

### 11.5 Open Questions / Design Gaps

**Product Gaps**:
1. **Chart Library Choice**: Design assumes modern chart library (Recharts, Chart.js, or D3.js). Technical team to confirm preference.

2. **Real-Time Updates**: Should analytics auto-refresh while admin is viewing page, or require manual refresh? (Recommend auto-refresh every 15 min with timestamp update)

3. **Drill-Down Interactions**: Should clicking chart data points navigate to detailed views? (e.g., click "8 Feb" bar → see all bookings created that day). Defer to R1+.

4. **Export Formats**: R0 supports CSV only. R1+ may add PDF reports, Excel format. Design extensible for future formats.

5. **Custom Metrics**: R1+ may allow admins to create custom metric dashboards (drag-and-drop widgets). R0 is fixed layout.

6. **Alert Thresholds**: Should platform send email alerts if metrics drop below thresholds (e.g., "Booking volume down 30% week-over-week")? Defer to R1.

**Technical Questions**:
1. **Chart Performance**: For 90-day date range with daily data (90 data points), ensure chart renders smoothly (<2 seconds). Test with large datasets.

2. **CSV File Size Limits**: If platform scales to 10,000+ users, CSV export may become very large. Consider pagination or date range limits (max 1 year enforced).

3. **Browser Compatibility**: Chart library must support IE11+ or define minimum browser requirements (recommend modern browsers only: Chrome, Firefox, Safari, Edge).

---

**DOCUMENT STATUS**: READY FOR FIGMA HANDOFF

**Next Steps**:
1. Figma designer: Create low-fidelity mockups for all analytics sections (Key Metrics, Growth Trends, Demographics, Revenue, Caregiver Metrics)
2. Select and integrate chart library (Recharts recommended for React/TypeScript compatibility)
3. Implement analytics API endpoints (data aggregation queries)
4. Define data refresh schedule (recommend 15-minute cache)
5. Test CSV export with large datasets (ensure <5 second generation time)
6. Product team: Confirm comparison period logic (previous period vs. year-over-year)
