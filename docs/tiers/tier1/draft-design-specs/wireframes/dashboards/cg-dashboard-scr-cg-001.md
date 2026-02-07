# Caregiver Dashboard Wireframe: SCR-CG-001

**Document Purpose**: ASCII wireframes and complete element inventory for the Caregiver Dashboard (SCR-CG-001) - the central hub for active caregivers.

**Document Owner**: UX/UI Design Team
**Created**: 2026-02-07
**Status**: DRAFT FOR FIGMA HANDOFF
**Screen ID**: SCR-CG-001
**Route**: `/caregiver/dashboard`
**User Role**: Caregiver
**Priority**: R0 CRITICAL - Primary caregiver landing page

---

## Table of Contents

1. [Screen Purpose & Context](#1-screen-purpose--context)
2. [Entry Points](#2-entry-points)
3. [Content Blocks & Hierarchy](#3-content-blocks--hierarchy)
4. [Element Inventory](#4-element-inventory)
5. [Screen States](#5-screen-states)
6. [Desktop Wireframe (1440px+)](#6-desktop-wireframe-1440px)
7. [Tablet Wireframe (768px-1439px)](#7-tablet-wireframe-768px-1439px)
8. [Mobile Wireframe (320px-767px)](#8-mobile-wireframe-320px-767px)
9. [Navigation](#9-navigation)
10. [Accessibility Requirements](#10-accessibility-requirements)
11. [Component Specifications](#11-component-specifications)
12. [Open Questions](#12-open-questions)

---

## 1. Screen Purpose & Context

### 1.1 Purpose

The Caregiver Dashboard (SCR-CG-001) is the **central operational hub** for active caregivers, prioritizing **supply-side needs**:

- **Immediate visibility** of incoming booking requests (24-hour response window)
- **Countdown timers** for urgent pending requests
- **Earnings tracking** (monthly total + pending payouts)
- **Profile completion status** (gamification to reach 100%)
- **Verification badges** (trust signals)
- **Visibility control** (active/inactive toggle for search appearance)

### 1.2 Strategic Differentiation from Care Receiver Dashboard

**Supply-Side Focus** (Caregivers):
- Urgent: Incoming opportunities (booking requests expire if not responded to)
- Motivational: Earnings visibility front-and-center
- Control: Profile visibility toggle (caregivers control when they appear in search)
- Gamification: Profile completion percentage

**Demand-Side Focus** (Care Receivers - for contrast):
- Urgent: Upcoming bookings confirmation
- Planning: Next booking countdown
- Action: "Find Caregivers" CTA prominent

### 1.3 Tier 1 Constraints

**Services Enabled**:
- Companionship only (no personal care)
- Light housework, shopping, meal prep, transportation

**Verification Requirements**:
- Identity verified (mandatory)
- Right to work verified (mandatory)
- DBS voluntary (competitive advantage)

**Dashboard Context**:
- Caregiver account created, onboarding may or may not be complete
- Dashboard adapts based on profile completion status

---

## 2. Entry Points

### 2.1 Primary Entry Points

**After Login**:
- Route: `/caregiver/dashboard`
- User authenticates with email/password
- System redirects to dashboard (default landing page)

**From Onboarding Completion**:
- Route: `/caregiver/onboarding` → `/caregiver/dashboard`
- Caregiver completes onboarding wizard
- System redirects to dashboard with welcome message

**From Email Notifications**:
- Booking request email: "View Request" link → `/caregiver/dashboard` (highlights pending request)
- Booking reminder email: "View Booking" link → `/caregiver/dashboard` (highlights upcoming booking)
- Verification approved email: "View Dashboard" link → `/caregiver/dashboard`

**From Navigation Menu**:
- Global header: "Dashboard" menu item
- Always accessible from any authenticated caregiver screen

### 2.2 Preconditions

**Authentication**:
- User authenticated as caregiver role
- Session valid (30-day expiry with "Remember me", 24-hour default)

**Account Status**:
- Caregiver account created (email + phone verified)
- Account not suspended or banned
- Account may be pending verification (dashboard shows verification status)

---

## 3. Content Blocks & Hierarchy

### 3.1 Information Hierarchy (Priority Order)

**Priority 1: URGENT ACTIONS** (Top of viewport)
- Pending booking requests widget (24-hour countdown timers)
- Profile completion status banner (if <100% complete)
- Verification status banner (if pending admin review)

**Priority 2: UPCOMING WORK** (Mid-viewport)
- Upcoming bookings summary (next 3 bookings in next 7 days)

**Priority 3: PERFORMANCE TRACKING** (Lower-viewport)
- Earnings summary (this month + pending payouts)

**Priority 4: PROFILE MANAGEMENT** (Sidebar or lower section)
- Verification status badges
- Profile visibility toggle (active/inactive)
- Quick actions (Manage Availability, View Earnings)

### 3.2 Content Blocks Definition

#### Block 1: Header Navigation
- **Purpose**: Global navigation and user context
- **Priority**: Essential (always visible)
- **Components**:
  - Platform logo (link to dashboard)
  - Main navigation menu (Dashboard, Bookings, Earnings, Availability, Profile)
  - Notifications icon with unread badge
  - User avatar + name dropdown (settings, logout)

#### Block 2: Welcome Message
- **Purpose**: Personalized greeting and context
- **Priority**: Secondary (nice-to-have)
- **Components**:
  - "Welcome back, [First Name]"
  - Date/time display (e.g., "Tuesday, 7 February 2026")

#### Block 3: Alert Banners (Conditional)
- **Purpose**: Critical alerts requiring immediate attention
- **Priority**: Urgent (displayed above all other content if present)
- **Components**:
  - Profile completion status (if <100%): "Complete your profile to receive booking requests"
  - Verification pending (if under review): "Your profile is under admin review. This usually takes 24-48 hours."
  - Verification rejected (if rejected): "Your verification was rejected. Please resubmit documents."
  - Account suspension warning (if late cancellations): "You have 2 late cancellations this month. One more may result in suspension."

#### Block 4: Pending Booking Requests Widget
- **Purpose**: Display incoming booking requests awaiting caregiver response
- **Priority**: PRIMARY (most urgent content)
- **Components**:
  - Section title: "Pending Booking Requests" with count badge (e.g., "2")
  - Booking request cards (sorted by urgency: earliest deadline first)
  - Empty state message (if no pending requests)
- **Data Source**: `bookings` table where `status = 'requested'` AND `caregiver_id = current_user.id`

#### Block 5: Upcoming Bookings Widget
- **Purpose**: Display confirmed bookings in next 7 days
- **Priority**: SECONDARY (important but not urgent)
- **Components**:
  - Section title: "Upcoming Bookings" with count (e.g., "3")
  - Booking cards (sorted by date: soonest first)
  - Empty state message (if no upcoming bookings)
- **Data Source**: `bookings` table where `status = 'accepted'` AND `caregiver_id = current_user.id` AND `booking_date >= today` AND `booking_date <= today + 7 days`

#### Block 6: Earnings Summary Widget
- **Purpose**: Motivational earnings visibility
- **Priority**: TERTIARY (performance tracking)
- **Components**:
  - Section title: "Earnings Summary"
  - This month total (e.g., "£450.00")
  - Pending payouts (e.g., "£120.00 pending completion")
  - "View Full Earnings" link
- **Data Source**: `bookings` table where `caregiver_id = current_user.id` AND `status IN ('completed', 'payment_released')` AND `booking_date` in current month

#### Block 7: Profile Status Sidebar
- **Purpose**: Verification badges, profile completion, visibility control
- **Priority**: TERTIARY (profile management)
- **Components**:
  - Profile completion progress bar (e.g., "85% complete")
  - Verification badges (Identity Verified, Right to Work Verified, DBS Verified)
  - Profile visibility toggle: "Active" / "Inactive" (controls search visibility)
  - Quick actions: "Complete Profile", "Manage Availability", "View Earnings"

#### Block 8: Footer
- **Purpose**: Legal links and support
- **Priority**: Low (always available)
- **Components**:
  - Help & Support link
  - Terms of Service
  - Privacy Policy
  - Safeguarding Policy

---

## 4. Element Inventory

### 4.1 Pending Booking Request Card (Component)

**Purpose**: Display single booking request awaiting caregiver response

**Elements**:
- Care receiver name (first name only, e.g., "Margaret S.")
- Date and time (e.g., "Tuesday 10 Feb, 2-5pm")
- Duration (e.g., "3 hours")
- Location: Postcode + distance (e.g., "SW1A 1AA • 2.3 miles")
- Service types icons/text (e.g., "Companionship, Light housework")
- Special requests preview (truncated, e.g., "I'd like help organizing...")
- Earnings display (e.g., "£51.00" after commission)
- **Countdown timer** (e.g., "18 hours remaining" - color-coded: green >6h, yellow 2-6h, red <2h)
- Primary CTA: "View Details" button

**States**:
- Default (>6 hours remaining): Green timer, normal card styling
- Warning (2-6 hours remaining): Yellow timer, yellow border
- Urgent (<2 hours remaining): Red timer, red border, pulsing animation

**Accessibility**:
- Countdown timer: `aria-live="polite"` (announces time updates)
- Focus order: Card wrapper → View Details button
- Touch target: Button minimum 48x48px

**Data Source**:
```javascript
{
  care_receiver_name: "Margaret S.",
  booking_date: "2026-02-10",
  start_time: "14:00",
  end_time: "17:00",
  duration_hours: 3,
  postcode: "SW1A 1AA",
  distance_miles: 2.3,
  service_types: ["companionship", "light_housework"],
  special_requests: "I'd like help organizing my photo albums...",
  caregiver_earnings: 51.00,
  requested_at: "2026-02-08T10:00:00Z",
  response_deadline: "2026-02-09T10:00:00Z",
  hours_remaining: 18
}
```

### 4.2 Upcoming Booking Card (Component)

**Purpose**: Display confirmed booking in next 7 days

**Elements**:
- Care receiver name + photo (if available)
- Date and time (e.g., "Tomorrow, 10am-1pm")
- Duration (e.g., "3 hours")
- Location: Postcode + distance
- Service types icons/text
- Status badge (e.g., "Confirmed")
- Countdown to booking (e.g., "In 1 day")
- Secondary CTA: "View Details" button

**States**:
- Default (>24 hours away): Blue "Confirmed" badge
- Soon (<24 hours away): Orange "Starting Soon" badge
- Today: Green "Today" badge with time

**Accessibility**:
- Status badge: `aria-label` describing status
- Countdown: Dynamic text, no rapid updates

**Data Source**:
```javascript
{
  care_receiver_name: "John W.",
  care_receiver_photo_url: "/uploads/photos/123.jpg",
  booking_date: "2026-02-08",
  start_time: "10:00",
  end_time: "13:00",
  duration_hours: 3,
  postcode: "E1 6AN",
  distance_miles: 1.8,
  service_types: ["companionship", "shopping"],
  status: "accepted",
  time_until_start: "1 day"
}
```

### 4.3 Earnings Summary Widget

**Purpose**: Display current month earnings and pending payouts

**Elements**:
- Section title: "Earnings Summary"
- This month total:
  - Label: "This Month"
  - Value: "£450.00" (large, prominent)
  - Change indicator: "+£120 from last month" (optional)
- Pending payouts:
  - Label: "Pending Payouts"
  - Value: "£120.00" (medium size)
  - Subtext: "2 bookings awaiting completion"
- Link: "View Full Earnings" (→ SCR-CG-015)

**States**:
- Default: Current month data displayed
- No earnings yet: "£0.00" with encouragement message "Complete your first booking to start earning"

**Accessibility**:
- Currency values: `aria-label` includes full amount (e.g., "450 pounds")
- Link: Clear indication it navigates to detailed view

**Data Source**:
```javascript
{
  current_month_total: 450.00,
  last_month_total: 330.00,
  pending_payouts_total: 120.00,
  pending_bookings_count: 2
}
```

### 4.4 Profile Completion Progress Bar

**Purpose**: Gamification to encourage profile completion

**Elements**:
- Progress bar (0-100%)
- Percentage text (e.g., "85% complete")
- Completion checklist (collapsed by default, expand on click):
  - Profile photo: ✓
  - Bio (min 100 chars): ✓
  - Services selected: ✓
  - Hourly rate set: ✓
  - Availability added: ✗ (missing)
  - Bank account connected: ✓
  - Identity verified: ✓
  - Right to work verified: ✓
  - DBS uploaded (optional): ✗

**States**:
- <100% complete: Yellow/orange progress bar, "Complete Profile" CTA visible
- 100% complete: Green checkmark, "Profile Complete!" message

**Accessibility**:
- Progress bar: `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Checklist: `role="list"`, each item `role="listitem"`

### 4.5 Verification Badges

**Purpose**: Display trust signals for care receivers

**Elements**:
- Identity Verified badge: Checkmark icon + "Identity Verified"
- Right to Work Verified badge: Checkmark icon + "Right to Work Verified"
- DBS Verified badge (optional): Shield icon + "DBS Verified"

**States**:
- Verified: Green checkmark icon, full color
- Pending: Grey clock icon, muted color, "Pending Review" text
- Not submitted: Grey X icon, muted color, "Not Submitted" text

**Accessibility**:
- Each badge: `aria-label` describing verification status
- Tooltip on hover: "What does this mean?" with explanation

### 4.6 Profile Visibility Toggle

**Purpose**: Allow caregiver to control when they appear in search results

**Elements**:
- Toggle switch (Active / Inactive)
- Label: "Profile Visibility"
- Subtext:
  - Active: "Your profile is visible in search results"
  - Inactive: "Your profile is hidden from search results"
- Help text: "Turn off visibility when you're not available for new bookings"

**States**:
- Active (ON): Green toggle, profile searchable
- Inactive (OFF): Grey toggle, profile hidden from search

**Accessibility**:
- Toggle: `role="switch"`, `aria-checked` true/false
- Label: Clear indication of current state

**Business Rule**: Profile must be 100% complete AND verified to toggle to Active

### 4.7 Quick Actions Section

**Purpose**: Fast navigation to common tasks

**Elements**:
- "Manage Availability" button → SCR-CG-011
- "View Earnings" button → SCR-CG-015
- "Complete Profile" button (if <100% complete) → SCR-CG-003
- "Get Verified" button (if not verified) → SCR-CG-008 or SCR-CG-009

**States**:
- Default: All buttons visible
- Profile complete: "Complete Profile" button hidden
- Verified: "Get Verified" button hidden

**Accessibility**:
- Each button: `aria-label` describing action
- Keyboard navigation: Focus visible, logical tab order

---

## 5. Screen States

### 5.1 State Definitions

The Caregiver Dashboard adapts based on four primary states:

| State ID | State Name | Trigger Condition | Primary Content |
|----------|------------|------------------|-----------------|
| **ST-01** | Empty State | Profile incomplete, no bookings yet | Welcome message, onboarding checklist, "Complete Profile" CTA |
| **ST-02** | Pending Requests | ≥1 booking request awaiting response | Pending requests widget at top, countdown timers |
| **ST-03** | Active Bookings | ≥1 confirmed booking in next 7 days | Upcoming bookings widget, earnings summary |
| **ST-04** | Earnings Summary | ≥1 completed booking | Earnings widget showing monthly total + pending payouts |

**Note**: States are not mutually exclusive (caregiver can have pending requests AND upcoming bookings simultaneously)

### 5.2 ST-01: Empty State (New Caregiver, Profile Incomplete)

**Trigger**:
- Caregiver account created <7 days ago
- Profile completion <100%
- No bookings (requested, accepted, or completed)

**Primary Message**:
- Welcome banner: "Welcome to iCare, [First Name]! Complete your profile to start receiving booking requests."

**Content Blocks Visible**:
- Header navigation
- Welcome message
- Profile completion banner (prominent, top of page)
- Profile completion progress bar (expanded checklist)
- Verification status section
- Quick actions: "Complete Profile", "Get Verified"
- Empty states for:
  - Pending Requests: "No pending requests yet. Complete your profile to appear in search results."
  - Upcoming Bookings: "No upcoming bookings yet."
  - Earnings: "£0.00 - Complete your first booking to start earning."

**Primary CTA**: "Complete Profile" button (large, prominent)

**Secondary CTA**: "Get Verified" button (if not verified)

**Accessibility**:
- Focus on primary CTA on page load
- Screen reader: "Your profile is 45% complete. Complete remaining steps to start receiving bookings."

### 5.3 ST-02: Pending Requests State (Incoming Opportunities)

**Trigger**:
- ≥1 booking request where `status = 'requested'` AND `response_deadline > now()`

**Primary Message**:
- Alert banner (yellow/orange): "[N] booking requests awaiting your response. Please respond within 24 hours."

**Content Blocks Visible**:
- Header navigation
- Alert banner (if multiple pending requests)
- **Pending Requests Widget** (top of page, above upcoming bookings)
  - Each request card with countdown timer
  - Sorted by urgency (earliest deadline first)
- Upcoming Bookings Widget (below pending requests)
- Earnings Summary Widget
- Profile Status Sidebar

**Visual Hierarchy**:
1. Alert banner (if >1 pending)
2. Pending Requests Widget (largest, top)
3. Upcoming Bookings Widget (smaller, below)
4. Earnings Summary (sidebar or bottom)

**Countdown Timer Colors**:
- Green: >6 hours remaining
- Yellow: 2-6 hours remaining
- Red: <2 hours remaining (urgent)

**Accessibility**:
- Screen reader: "You have [N] pending booking requests. [First request] has [X] hours remaining."
- Countdown timers: `aria-live="polite"` region
- Focus on first pending request card on page load

### 5.4 ST-03: Active Bookings State (Confirmed Work Scheduled)

**Trigger**:
- ≥1 confirmed booking where `status = 'accepted'` AND `booking_date >= today` AND `booking_date <= today + 7 days`
- No pending requests (or pending requests widget appears above this)

**Primary Message**:
- Welcome message: "Welcome back, [First Name]! You have [N] upcoming bookings."

**Content Blocks Visible**:
- Header navigation
- Welcome message
- **Upcoming Bookings Widget** (prominent)
  - Next booking highlighted ("Next up: Tomorrow at 10am")
  - Booking cards sorted by date (soonest first)
  - Max 3 bookings shown, "View All Bookings" link if >3
- Earnings Summary Widget
- Profile Status Sidebar

**Next Booking Highlight**:
- Larger card with prominent "Starting Soon" badge if <24 hours
- "In 2 days" countdown text

**Accessibility**:
- Screen reader: "You have [N] upcoming bookings. Your next booking is with [Care Receiver Name] on [Date] at [Time]."
- Focus on next booking card on page load

### 5.5 ST-04: Earnings Summary State (Performance Tracking)

**Trigger**:
- ≥1 completed booking this month OR pending payouts >£0

**Content Blocks Visible**:
- All blocks visible (this state co-exists with other states)
- **Earnings Summary Widget** displays actual data (not £0.00 placeholder)

**Earnings Widget Content**:
- This month total: Prominent, large font
- Change from last month: "+£120 from last month" (green if positive)
- Pending payouts: "£120.00 pending" with subtext "2 bookings awaiting completion"
- "View Full Earnings" link → SCR-CG-015

**Accessibility**:
- Currency values: Screen reader announces full amount
- Change indicator: "Up 120 pounds from last month" or "Down 50 pounds from last month"

---

## 6. Desktop Wireframe (1440px+)

### 6.1 ST-02: Pending Requests State (Desktop)

```
+-------------------------------------------------------------------------------------------+
|  [iCare Logo]          Dashboard | Bookings | Earnings | Availability      [🔔 2] [@]   |
+-------------------------------------------------------------------------------------------+
|                                                                                           |
|  Welcome back, Sarah!                                            Tuesday, 7 February 2026 |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |  ⚠️  2 booking requests awaiting your response. Please respond within 24 hours.   |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
|  +-------------------------------------------------------------------+  +-------------+  |
|  |  PENDING BOOKING REQUESTS (2)                                     |  | PROFILE     |  |
|  +-------------------------------------------------------------------+  | STATUS      |  |
|  |  +--------------------------------------------------------------+  |  |             |  |
|  |  |  [Photo]  Margaret S.                        18 hours left  |  |  | ⚪⚪⚪⚪🟢 85% |  |
|  |  |           Tuesday 10 Feb, 2-5pm (3 hours)   🟡 URGENT      |  |  | complete    |  |
|  |  |           SW1A 1AA • 2.3 miles                              |  |  |             |  |
|  |  |           💬 Companionship, Light housework                 |  |  | ✓ Identity  |  |
|  |  |           "I'd like help organizing..."                     |  |  | ✓ Right to  |  |
|  |  |           💰 £51.00 (after commission)                       |  |  |   Work      |  |
|  |  |                                          [View Details] ───► |  |  | ✗ DBS       |  |
|  |  +--------------------------------------------------------------+  |  |             |  |
|  |                                                                   |  | Profile     |  |
|  |  +--------------------------------------------------------------+  |  | Visibility: |  |
|  |  |  [Photo]  John W.                             6 hours left  |  |  | ⚫ ACTIVE   |  |
|  |  |           Wednesday 11 Feb, 10am-1pm (3h)    🟢 OK         |  |  |             |  |
|  |  |           E1 6AN • 1.8 miles                                |  |  | QUICK       |  |
|  |  |           💬 Companionship, Shopping                        |  |  | ACTIONS     |  |
|  |  |           "Would like to go to..."                          |  |  |             |  |
|  |  |           💰 £51.00 (after commission)                       |  |  | [Manage     |  |
|  |  |                                          [View Details] ───► |  |  | Availabil.] |  |
|  |  +--------------------------------------------------------------+  |  |             |  |
|  +-------------------------------------------------------------------+  | [View       |  |
|                                                                          | Earnings]   |  |
|  +-------------------------------------------------------------------+  |             |  |
|  |  UPCOMING BOOKINGS (1)                                            |  | [Upload     |  |
|  +-------------------------------------------------------------------+  | DBS Cert]   |  |
|  |  +--------------------------------------------------------------+  |  |             |  |
|  |  |  [Photo]  Anne P.                          In 2 days        |  |  +-------------+  |
|  |  |           Saturday 14 Feb, 3-6pm (3 hours)  ✅ CONFIRMED   |  |                   |
|  |  |           SW7 2AZ • 3.1 miles                               |  |                   |
|  |  |           💬 Companionship, Meal prep                       |  |                   |
|  |  |                                          [View Details] ───► |  |                   |
|  |  +--------------------------------------------------------------+  |                   |
|  +-------------------------------------------------------------------+                   |
|                                                                                           |
|  +-------------------------------------------------------------------+                   |
|  |  EARNINGS SUMMARY                                                 |                   |
|  +-------------------------------------------------------------------+                   |
|  |  This Month                           Pending Payouts             |                   |
|  |  £450.00                              £120.00                     |                   |
|  |  +£120 from last month                2 bookings awaiting         |                   |
|  |                                       completion                  |                   |
|  |                                                                   |                   |
|  |                                      [View Full Earnings] ──────► |                   |
|  +-------------------------------------------------------------------+                   |
|                                                                                           |
+-------------------------------------------------------------------------------------------+
|  Help & Support | Terms | Privacy | Safeguarding Policy                                  |
+-------------------------------------------------------------------------------------------+
```

### 6.2 ST-01: Empty State (Desktop)

```
+-------------------------------------------------------------------------------------------+
|  [iCare Logo]          Dashboard | Bookings | Earnings | Availability      [🔔 0] [@]   |
+-------------------------------------------------------------------------------------------+
|                                                                                           |
|  Welcome to iCare, Sarah!                                    Tuesday, 7 February 2026     |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |  📋 Complete your profile to start receiving booking requests (45% complete)       |  |
|  |                                                         [Complete Profile] ────────►|  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
|  +-------------------------------------------------------------------+  +-------------+  |
|  |  PROFILE COMPLETION CHECKLIST                                     |  | PROFILE     |  |
|  +-------------------------------------------------------------------+  | STATUS      |  |
|  |                                                                   |  |             |  |
|  |  ✅ Profile Photo                                                 |  | ⚪⚪⚫⚫⚫ 45% |  |
|  |  ✅ Bio (min 100 characters)                                      |  | complete    |  |
|  |  ✅ Services Selected (companionship only at Tier 1)              |  |             |  |
|  |  ❌ Hourly Rate                                            [Add]  |  | ⏳ Identity |  |
|  |  ❌ Availability                                           [Add]  |  | ⏳ Right to |  |
|  |  ❌ Bank Account                                           [Add]  |  |   Work      |  |
|  |  ⏳ Identity Verification (under review)                          |  | ✗ DBS       |  |
|  |  ⏳ Right to Work Verification (under review)                     |  |             |  |
|  |  ✗ DBS Certificate (optional)                             [Add]  |  | Profile     |  |
|  |                                                                   |  | Visibility: |  |
|  |  [Complete Profile] ────────────────────────────────────────────► |  | ⚫ INACTIVE |  |
|  +-------------------------------------------------------------------+  | (Complete   |  |
|                                                                          | profile to  |  |
|  +-------------------------------------------------------------------+  | activate)   |  |
|  |  PENDING BOOKING REQUESTS                                         |  |             |  |
|  +-------------------------------------------------------------------+  | QUICK       |  |
|  |                                                                   |  | ACTIONS     |  |
|  |  📭 No pending requests yet.                                      |  |             |  |
|  |                                                                   |  | [Complete   |  |
|  |  Complete your profile to appear in search results and receive    |  | Profile]    |  |
|  |  booking requests from care receivers.                            |  |             |  |
|  |                                                                   |  | [Get        |  |
|  +-------------------------------------------------------------------+  | Verified]   |  |
|                                                                          |             |  |
|  +-------------------------------------------------------------------+  +-------------+  |
|  |  UPCOMING BOOKINGS                                                |                   |
|  +-------------------------------------------------------------------+                   |
|  |  📭 No upcoming bookings yet.                                     |                   |
|  +-------------------------------------------------------------------+                   |
|                                                                                           |
|  +-------------------------------------------------------------------+                   |
|  |  EARNINGS SUMMARY                                                 |                   |
|  +-------------------------------------------------------------------+                   |
|  |  This Month                           Pending Payouts             |                   |
|  |  £0.00                                £0.00                       |                   |
|  |                                                                   |                   |
|  |  Complete your first booking to start earning!                    |                   |
|  +-------------------------------------------------------------------+                   |
|                                                                                           |
+-------------------------------------------------------------------------------------------+
|  Help & Support | Terms | Privacy | Safeguarding Policy                                  |
+-------------------------------------------------------------------------------------------+
```

### 6.3 ST-03: Active Bookings State (Desktop)

```
+-------------------------------------------------------------------------------------------+
|  [iCare Logo]          Dashboard | Bookings | Earnings | Availability      [🔔 1] [@]   |
+-------------------------------------------------------------------------------------------+
|                                                                                           |
|  Welcome back, Sarah!                                        Tuesday, 7 February 2026     |
|  You have 3 upcoming bookings.                                                            |
|                                                                                           |
|  +-------------------------------------------------------------------+  +-------------+  |
|  |  UPCOMING BOOKINGS (3)                                            |  | PROFILE     |  |
|  +-------------------------------------------------------------------+  | STATUS      |  |
|  |  +--------------------------------------------------------------+  |  |             |  |
|  |  |  NEXT UP                                                     |  |  | 🟢🟢🟢🟢🟢100% |  |
|  |  |  [Photo]  Margaret S.                       Tomorrow        |  |  | complete    |  |
|  |  |           Wednesday 8 Feb, 2-5pm (3 hours)  🟠 STARTING SOON|  |  |             |  |
|  |  |           SW1A 1AA • 2.3 miles                              |  |  | ✅ Identity |  |
|  |  |           💬 Companionship, Light housework                 |  |  | ✅ Right to |  |
|  |  |                                          [View Details] ───► |  |  |   Work      |  |
|  |  +--------------------------------------------------------------+  |  | ✅ DBS      |  |
|  |                                                                   |  |             |  |
|  |  +--------------------------------------------------------------+  |  | Profile     |  |
|  |  |  [Photo]  John W.                            In 3 days      |  |  | Visibility: |  |
|  |  |           Friday 10 Feb, 10am-1pm (3h)       ✅ CONFIRMED   |  |  | 🟢 ACTIVE   |  |
|  |  |           E1 6AN • 1.8 miles                                |  |  |             |  |
|  |  |           💬 Companionship, Shopping                        |  |  | QUICK       |  |
|  |  |                                          [View Details] ───► |  |  | ACTIONS     |  |
|  |  +--------------------------------------------------------------+  |  |             |  |
|  |                                                                   |  | [Manage     |  |
|  |  +--------------------------------------------------------------+  |  | Availabil.] |  |
|  |  |  [Photo]  Anne P.                            In 6 days      |  |  |             |  |
|  |  |           Monday 13 Feb, 3-6pm (3h)          ✅ CONFIRMED   |  |  | [View       |  |
|  |  |           SW7 2AZ • 3.1 miles                               |  |  | Earnings]   |  |
|  |  |           💬 Companionship, Meal prep                       |  |  |             |  |
|  |  |                                          [View Details] ───► |  |  +-------------+  |
|  |  +--------------------------------------------------------------+  |                   |
|  |                                                                   |                   |
|  |                                         [View All Bookings] ────► |                   |
|  +-------------------------------------------------------------------+                   |
|                                                                                           |
|  +-------------------------------------------------------------------+                   |
|  |  EARNINGS SUMMARY                                                 |                   |
|  +-------------------------------------------------------------------+                   |
|  |  This Month                           Pending Payouts             |                   |
|  |  £675.00                              £153.00                     |                   |
|  |  +£120 from last month                3 bookings awaiting         |                   |
|  |                                       completion                  |                   |
|  |                                                                   |                   |
|  |                                      [View Full Earnings] ──────► |                   |
|  +-------------------------------------------------------------------+                   |
|                                                                                           |
+-------------------------------------------------------------------------------------------+
|  Help & Support | Terms | Privacy | Safeguarding Policy                                  |
+-------------------------------------------------------------------------------------------+
```

---

## 7. Tablet Wireframe (768px-1439px)

### 7.1 ST-02: Pending Requests State (Tablet)

```
+-----------------------------------------------------------------------+
|  [Logo]      Dashboard | Bookings | Earnings      [🔔 2] [@]         |
+-----------------------------------------------------------------------+
|                                                                       |
|  Welcome back, Sarah!                      Tuesday, 7 February 2026   |
|                                                                       |
|  +------------------------------------------------------------------+ |
|  |  ⚠️  2 booking requests awaiting response. Respond within 24h.  | |
|  +------------------------------------------------------------------+ |
|                                                                       |
|  PENDING BOOKING REQUESTS (2)                                         |
|  +------------------------------------------------------------------+ |
|  |  [Photo]  Margaret S.                           18 hours left   | |
|  |           Tuesday 10 Feb, 2-5pm (3h)           🟡 URGENT       | |
|  |           SW1A 1AA • 2.3 miles                                 | |
|  |           💬 Companionship, Light housework                    | |
|  |           💰 £51.00 (after commission)                          | |
|  |                                         [View Details] ───────► | |
|  +------------------------------------------------------------------+ |
|                                                                       |
|  +------------------------------------------------------------------+ |
|  |  [Photo]  John W.                                6 hours left   | |
|  |           Wednesday 11 Feb, 10am-1pm (3h)      🟢 OK          | |
|  |           E1 6AN • 1.8 miles                                   | |
|  |           💬 Companionship, Shopping                           | |
|  |           💰 £51.00 (after commission)                          | |
|  |                                         [View Details] ───────► | |
|  +------------------------------------------------------------------+ |
|                                                                       |
|  UPCOMING BOOKINGS (1)                                                |
|  +------------------------------------------------------------------+ |
|  |  [Photo]  Anne P.                               In 2 days       | |
|  |           Saturday 14 Feb, 3-6pm (3h)          ✅ CONFIRMED    | |
|  |           SW7 2AZ • 3.1 miles                                  | |
|  |           💬 Companionship, Meal prep                          | |
|  |                                         [View Details] ───────► | |
|  +------------------------------------------------------------------+ |
|                                                                       |
|  PROFILE STATUS                                                       |
|  +------------------------------------------------------------------+ |
|  |  ⚪⚪⚪⚪🟢 85% complete     Profile Visibility: 🟢 ACTIVE         | |
|  |  ✅ Identity Verified  ✅ Right to Work  ✗ DBS (optional)      | |
|  |                                                                  | |
|  |  [Manage Availability]  [View Earnings]  [Upload DBS Cert]     | |
|  +------------------------------------------------------------------+ |
|                                                                       |
|  EARNINGS SUMMARY                                                     |
|  +------------------------------------------------------------------+ |
|  |  This Month: £450.00          Pending Payouts: £120.00          | |
|  |  +£120 from last month        2 bookings awaiting completion    | |
|  |                                       [View Full Earnings] ────► | |
|  +------------------------------------------------------------------+ |
|                                                                       |
+-----------------------------------------------------------------------+
|  Help & Support | Terms | Privacy | Safeguarding Policy               |
+-----------------------------------------------------------------------+
```

---

## 8. Mobile Wireframe (320px-767px)

### 8.1 ST-02: Pending Requests State (Mobile)

```
+---------------------------------------------+
|  [☰]  Dashboard               [🔔2] [@]    |
+---------------------------------------------+
|                                             |
|  Welcome back, Sarah!                       |
|  Tuesday, 7 February                        |
|                                             |
|  +----------------------------------------+ |
|  |  ⚠️  2 requests awaiting response     | |
|  |  Please respond within 24 hours.      | |
|  +----------------------------------------+ |
|                                             |
|  PENDING REQUESTS (2)                       |
|                                             |
|  +----------------------------------------+ |
|  |  [Photo]                               | |
|  |  Margaret S.                           | |
|  |  Tue 10 Feb, 2-5pm (3h)                | |
|  |  SW1A 1AA • 2.3 mi                     | |
|  |                                        | |
|  |  💬 Companionship, Housework           | |
|  |  💰 £51.00                             | |
|  |                                        | |
|  |  ⏱️ 18 hours left  🟡 URGENT          | |
|  |                                        | |
|  |  [View Details] ──────────────────────►| |
|  +----------------------------------------+ |
|                                             |
|  +----------------------------------------+ |
|  |  [Photo]                               | |
|  |  John W.                               | |
|  |  Wed 11 Feb, 10am-1pm (3h)             | |
|  |  E1 6AN • 1.8 mi                       | |
|  |                                        | |
|  |  💬 Companionship, Shopping            | |
|  |  💰 £51.00                             | |
|  |                                        | |
|  |  ⏱️ 6 hours left  🟢 OK               | |
|  |                                        | |
|  |  [View Details] ──────────────────────►| |
|  +----------------------------------------+ |
|                                             |
|  UPCOMING BOOKINGS (1)                      |
|                                             |
|  +----------------------------------------+ |
|  |  [Photo]                               | |
|  |  Anne P.                               | |
|  |  Sat 14 Feb, 3-6pm (3h)                | |
|  |  SW7 2AZ • 3.1 mi                      | |
|  |                                        | |
|  |  💬 Companionship, Meal prep           | |
|  |  In 2 days  ✅ CONFIRMED              | |
|  |                                        | |
|  |  [View Details] ──────────────────────►| |
|  +----------------------------------------+ |
|                                             |
|  PROFILE STATUS                             |
|  +----------------------------------------+ |
|  |  ⚪⚪⚪⚪🟢 85% complete                  | |
|  |  Visibility: 🟢 ACTIVE                 | |
|  |                                        | |
|  |  ✅ Identity Verified                  | |
|  |  ✅ Right to Work                      | |
|  |  ✗ DBS (optional)                      | |
|  |                                        | |
|  |  [Manage Availability]                 | |
|  |  [View Earnings]                       | |
|  |  [Upload DBS Certificate]              | |
|  +----------------------------------------+ |
|                                             |
|  EARNINGS SUMMARY                           |
|  +----------------------------------------+ |
|  |  This Month                            | |
|  |  £450.00                               | |
|  |  +£120 from last month                 | |
|  |                                        | |
|  |  Pending Payouts                       | |
|  |  £120.00                               | |
|  |  2 bookings awaiting completion        | |
|  |                                        | |
|  |  [View Full Earnings] ────────────────►| |
|  +----------------------------------------+ |
|                                             |
+---------------------------------------------+
|  [☰] Help | Terms | Privacy                 |
+---------------------------------------------+
```

### 8.2 ST-01: Empty State (Mobile)

```
+---------------------------------------------+
|  [☰]  Dashboard               [🔔0] [@]    |
+---------------------------------------------+
|                                             |
|  Welcome to iCare, Sarah!                   |
|  Tuesday, 7 February                        |
|                                             |
|  +----------------------------------------+ |
|  |  📋 Complete your profile to start     | |
|  |  receiving booking requests            | |
|  |                                        | |
|  |  [Complete Profile] ──────────────────►| |
|  +----------------------------------------+ |
|                                             |
|  PROFILE COMPLETION (45%)                   |
|  +----------------------------------------+ |
|  |  ⚪⚪⚫⚫⚫                               | |
|  |                                        | |
|  |  ✅ Profile Photo                      | |
|  |  ✅ Bio                                | |
|  |  ✅ Services                           | |
|  |  ❌ Hourly Rate            [Add]       | |
|  |  ❌ Availability           [Add]       | |
|  |  ❌ Bank Account           [Add]       | |
|  |  ⏳ Identity (under review)            | |
|  |  ⏳ Right to Work (under review)       | |
|  |  ✗ DBS (optional)          [Add]       | |
|  |                                        | |
|  |  [Complete Profile] ──────────────────►| |
|  +----------------------------------------+ |
|                                             |
|  PENDING REQUESTS                           |
|  +----------------------------------------+ |
|  |  📭 No pending requests yet.           | |
|  |                                        | |
|  |  Complete your profile to appear in    | |
|  |  search results.                       | |
|  +----------------------------------------+ |
|                                             |
|  UPCOMING BOOKINGS                          |
|  +----------------------------------------+ |
|  |  📭 No upcoming bookings yet.          | |
|  +----------------------------------------+ |
|                                             |
|  EARNINGS SUMMARY                           |
|  +----------------------------------------+ |
|  |  This Month: £0.00                     | |
|  |  Pending: £0.00                        | |
|  |                                        | |
|  |  Complete your first booking to start  | |
|  |  earning!                              | |
|  +----------------------------------------+ |
|                                             |
+---------------------------------------------+
|  [☰] Help | Terms | Privacy                 |
+---------------------------------------------+
```

---

## 9. Navigation

### 9.1 Navigation Exits (Where Links Go)

**From Pending Request Card**:
- "View Details" button → SCR-CG-013 (Booking Request Detail - Caregiver View)
  - Route: `/caregiver/bookings/:bookingId`
  - Caregiver can accept or decline request

**From Upcoming Booking Card**:
- "View Details" button → SCR-CR-008 (Booking Detail - Shared View)
  - Route: `/bookings/:bookingId`
  - Role-based view (caregiver sees caregiver actions)

**From Earnings Summary**:
- "View Full Earnings" link → **⚠️ NAVIGATION AMBIGUITY** (see Section 12)
  - **Option A**: SCR-CG-015 (Earnings Dashboard) - Route: `/caregiver/earnings`
  - **Option B**: SCR-CG-020 (Payout Setup) - Route: `/caregiver/earnings/setup` (if payouts not configured)

**From Quick Actions**:
- "Manage Availability" button → SCR-CG-011 (Availability Calendar)
  - Route: `/caregiver/availability`
- "View Earnings" button → SCR-CG-015 (Earnings Dashboard)
  - Route: `/caregiver/earnings`
- "Complete Profile" button → SCR-CG-003 (Profile Management)
  - Route: `/caregiver/profile/edit`
- "Get Verified" button → Verification flows
  - Identity: SCR-CG-008 (Identity Verification) - Route: `/caregiver/verify/identity`
  - Right to Work: SCR-CG-009 (Right to Work Verification) - Route: `/caregiver/verify/right-to-work`
  - DBS: SCR-CG-010 (DBS Check Submission) - Route: `/caregiver/verify/dbs`

**From Header Navigation**:
- "Dashboard" → Current screen (refresh)
- "Bookings" → `/caregiver/bookings` (full booking list, filtered by status)
- "Earnings" → SCR-CG-015 (Earnings Dashboard)
- "Availability" → SCR-CG-011 (Availability Calendar)
- "Profile" → SCR-CG-003 (Profile Management)
- Notifications icon → SCR-CR-012 (Message Inbox) or notification panel (TBD)
- User avatar dropdown:
  - "Settings" → Account settings (future)
  - "Help & Support" → Help center (future)
  - "Logout" → `/logout`

**From Footer**:
- "Help & Support" → Help center (future)
- "Terms" → SCR-PUB-006 (Terms of Service)
- "Privacy" → SCR-PUB-007 (Privacy Policy)
- "Safeguarding Policy" → SCR-PUB-008 (Safeguarding Policy)

### 9.2 Back Navigation

**Browser Back Button**:
- Dashboard is typically the landing page after login
- Back from dashboard likely returns to login or previous authenticated screen
- No explicit "Back" button on dashboard (it's a top-level navigation destination)

### 9.3 Global Navigation (Header)

**Persistent Across All Authenticated Caregiver Screens**:
- Logo (link to dashboard)
- Main menu: Dashboard | Bookings | Earnings | Availability | Profile
- Notifications icon (unread count badge)
- User avatar + name (dropdown menu)

**Mobile**: Hamburger menu (☰) collapses main menu items

---

## 10. Accessibility Requirements

### 10.1 WCAG 2.1 AA Compliance

**Perceivable**:
- [ ] All booking cards have `alt` text for caregiver/care receiver photos
- [ ] Countdown timers have `aria-live="polite"` region (announces time updates without interrupting)
- [ ] Color is not the only indicator of urgency (countdown timers include text: "URGENT", "OK")
- [ ] Color contrast minimum 4.5:1 for normal text, 3:1 for large text
- [ ] Icons include `aria-label` (e.g., 💬 "Service types", 💰 "Earnings")

**Operable**:
- [ ] All interactive elements keyboard accessible (tab navigation)
- [ ] Focus indicators visible (2px solid border, high contrast)
- [ ] Touch targets minimum 48x48px (elderly-friendly)
- [ ] No time limits on dashboard interactions (countdown timers for information only)
- [ ] Skip link: "Skip to main content" (bypass header navigation)

**Understandable**:
- [ ] Page title: "Caregiver Dashboard - iCare"
- [ ] Language declared: `lang="en-GB"`
- [ ] Labels clear and jargon-free
- [ ] Error messages descriptive (e.g., "Cannot toggle profile to Active: Profile incomplete. Complete remaining steps.")

**Robust**:
- [ ] Semantic HTML (header, nav, main, article, aside, footer)
- [ ] ARIA landmarks: `role="banner"` (header), `role="main"` (dashboard content), `role="complementary"` (sidebar)
- [ ] Screen reader testing with NVDA/JAWS

### 10.2 Focus Order

**Logical Tab Order** (ST-02: Pending Requests State):

1. Skip link ("Skip to main content")
2. Logo (link to dashboard)
3. Main navigation: Dashboard
4. Main navigation: Bookings
5. Main navigation: Earnings
6. Main navigation: Availability
7. Main navigation: Profile
8. Notifications icon
9. User avatar dropdown
10. Alert banner (if present)
11. First pending request card:
    - "View Details" button
12. Second pending request card:
    - "View Details" button
13. First upcoming booking card:
    - "View Details" button
14. Earnings summary: "View Full Earnings" link
15. Quick actions: "Manage Availability" button
16. Quick actions: "View Earnings" button
17. Footer links

**Mobile Focus Order**: Same logical order, adjusted for stacked layout

### 10.3 Screen Reader Announcements

**Page Load** (ST-02: Pending Requests State):
```
"Caregiver Dashboard. You have 2 pending booking requests.
First request: Margaret S., Tuesday 10 February, 2 to 5 PM, 18 hours remaining, urgent.
You have 1 upcoming booking. You have earned 450 pounds this month."
```

**Countdown Timer Updates** (every 30 minutes, `aria-live="polite"`):
```
"Margaret S. booking request: 17 hours 30 minutes remaining"
```

**Alert Banner** (ST-01: Empty State):
```
"Alert: Complete your profile to start receiving booking requests. 45% complete.
View profile completion checklist."
```

### 10.4 Color Contrast Requirements

**Text Contrast** (minimum 4.5:1):
- Body text (#0f172a) on background (#f7f7f2): ✅ 12.6:1
- Muted text (rgba(15, 23, 42, 0.72)) on background: ✅ 7.2:1

**Interactive Element Contrast** (minimum 3:1):
- Primary button (secondary green) text on button background: ✅ 4.1:1
- Status badges: Ensure sufficient contrast for all status colors

**Countdown Timer Colors** (ensure accessibility):
- Green (>6h): `#16a34a` on white background ✅
- Yellow (2-6h): `#ca8a04` on white background ✅
- Red (<2h): `#dc2626` on white background ✅

### 10.5 Elderly-Specific Accessibility

**Touch Targets**:
- Minimum 48x48px for all buttons (larger than WCAG 44x44px)
- Generous spacing between clickable elements (16px minimum)

**Typography**:
- Body text minimum 16px (18px preferred)
- Prominent headings: 20px minimum
- Primary CTAs: 18px minimum

**Cognitive Load**:
- One primary action per screen state (e.g., "View Details" on pending request)
- Clear visual hierarchy (urgent items at top)
- Generous white space
- Consistent layout patterns

---

## 11. Component Specifications

### 11.1 Booking Request Card (Pending State)

**Component ID**: `CG-BOOKING-REQUEST-CARD`

**Variants**:
- `urgency: "ok"` (>6 hours remaining) - Green timer, white card
- `urgency: "warning"` (2-6 hours remaining) - Yellow timer, yellow border
- `urgency: "urgent"` (<2 hours remaining) - Red timer, red border, subtle pulsing animation

**Props**:
```typescript
{
  care_receiver_name: string,          // "Margaret S."
  care_receiver_photo_url: string,     // "/uploads/photos/123.jpg"
  booking_date: string,                // "2026-02-10"
  start_time: string,                  // "14:00"
  end_time: string,                    // "17:00"
  duration_hours: number,              // 3
  postcode: string,                    // "SW1A 1AA"
  distance_miles: number,              // 2.3
  service_types: string[],             // ["companionship", "light_housework"]
  special_requests: string,            // "I'd like help organizing..."
  caregiver_earnings: number,          // 51.00
  hours_remaining: number,             // 18
  urgency: "ok" | "warning" | "urgent" // Calculated from hours_remaining
}
```

**Accessibility**:
- Card wrapper: `role="article"`, `aria-labelledby="request-[id]-name"`
- Countdown timer: `aria-live="polite"`, updates every 30 minutes
- Button: `aria-label="View booking request details for [care_receiver_name]"`

**Responsive Behavior**:
- Desktop: Horizontal layout, photo left, details center, CTA right
- Tablet: Horizontal layout, slightly condensed
- Mobile: Vertical stack, photo top, details below, CTA bottom (full width)

**Interactions**:
- Hover: Subtle shadow increase, CTA button color change
- Focus: 2px solid blue border around card
- Click: Navigate to SCR-CG-013 (Booking Request Detail)

### 11.2 Booking Card (Upcoming Bookings)

**Component ID**: `CG-BOOKING-CARD`

**Variants**:
- `timing: "default"` (>24 hours away) - Blue "Confirmed" badge
- `timing: "soon"` (<24 hours away) - Orange "Starting Soon" badge
- `timing: "today"` (today) - Green "Today" badge

**Props**:
```typescript
{
  care_receiver_name: string,
  care_receiver_photo_url: string,
  booking_date: string,
  start_time: string,
  end_time: string,
  duration_hours: number,
  postcode: string,
  distance_miles: number,
  service_types: string[],
  status: "accepted",
  time_until_start: string,           // "In 2 days" or "Tomorrow" or "Today"
  timing: "default" | "soon" | "today"
}
```

**Accessibility**:
- Similar to booking request card
- Status badge: `aria-label="Booking status: Confirmed, starting in 2 days"`

### 11.3 Countdown Timer

**Component ID**: `COUNTDOWN-TIMER`

**Variants**:
- `urgency: "ok"` - Green text
- `urgency: "warning"` - Yellow/orange text
- `urgency: "urgent"` - Red text + optional pulsing icon

**Props**:
```typescript
{
  hours_remaining: number,             // 18
  urgency: "ok" | "warning" | "urgent"
}
```

**Display Format**:
- >24 hours: "[N] hours left" (e.g., "18 hours left")
- <24 hours: "[H]h [M]m left" (e.g., "6h 30m left")
- <1 hour: "[M] minutes left" (e.g., "45 minutes left")
- <30 minutes: "URGENT: [M] min left" (red, bold)

**Accessibility**:
- `aria-live="polite"` region
- Updates every 30 minutes (not every second - avoid screen reader spam)
- Manual refresh on page focus

**Urgency Thresholds**:
- Green (OK): >6 hours
- Yellow (Warning): 2-6 hours
- Red (Urgent): <2 hours

### 11.4 Status Badge

**Component ID**: `STATUS-BADGE`

**Variants** (Booking Statuses):
- `requested` - Orange, "Pending Response"
- `accepted` - Blue, "Confirmed"
- `in_progress` - Green, "In Progress"
- `completed` - Green, "Completed"
- `payment_released` - Green, "Paid"
- `cancelled` - Grey, "Cancelled"
- `disputed` - Red, "Disputed"

**Variants** (Verification Statuses):
- `verified` - Green checkmark, "Verified"
- `pending` - Grey clock, "Pending Review"
- `rejected` - Red X, "Rejected"

**Props**:
```typescript
{
  status: string,
  label: string,                       // Display text
  color: "green" | "blue" | "yellow" | "orange" | "red" | "grey",
  icon?: "checkmark" | "clock" | "x"
}
```

**Accessibility**:
- `aria-label` includes full status description (e.g., "Booking status: Confirmed")
- Icon is decorative (`aria-hidden="true"`)

### 11.5 Profile Completion Progress Bar

**Component ID**: `PROFILE-COMPLETION-BAR`

**Props**:
```typescript
{
  completion_percentage: number,       // 0-100
  checklist: Array<{
    label: string,                     // "Profile Photo"
    completed: boolean,                // true/false
    required: boolean,                 // true/false (optional items)
    action_url?: string                // "/caregiver/profile/edit"
  }>
}
```

**Visual**:
- Progress bar: 0-100% fill
- Color: Yellow/orange (<100%), green (100%)
- Percentage text: "[N]% complete"

**Checklist**:
- Expandable/collapsible (default: collapsed if >50% complete)
- Each item: Checkmark (completed), X (not completed), Clock (pending)
- "Add" link for incomplete items

**Accessibility**:
- `role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`
- Checklist: `role="list"`, items `role="listitem"`

### 11.6 Profile Visibility Toggle

**Component ID**: `PROFILE-VISIBILITY-TOGGLE`

**Props**:
```typescript
{
  is_active: boolean,                  // true/false
  can_toggle: boolean,                 // false if profile incomplete/unverified
  profile_completion: number,          // 0-100
  is_verified: boolean                 // true/false
}
```

**Visual**:
- Toggle switch: ON (green) / OFF (grey)
- Label: "Profile Visibility"
- Subtext:
  - Active: "Your profile is visible in search results"
  - Inactive: "Your profile is hidden from search results"
- Disabled state: Grey toggle, tooltip explaining why ("Complete profile and verification to activate")

**Business Rule**:
- Can only toggle to Active if:
  - `profile_completion === 100%`
  - `is_verified === true`

**Accessibility**:
- `role="switch"`, `aria-checked` (true/false), `aria-disabled` (if can_toggle === false)
- `aria-label`: "Profile visibility: Active" or "Profile visibility: Inactive"

---

## 12. Open Questions

### OQ-001: Earnings Navigation Ambiguity

**Issue**: Conflicting information for "View Earnings" navigation in source documents.

**Conflicting References**:

**FIGMA_PRODUCTION_PLAN.md** (lines 100-103):
```
**Navigation Exits**:
- "View Details" on request -> SCR-CG-013 (Booking Request Detail)
- "View Details" on booking -> SCR-CR-008 (Booking Detail, role-based view)
- "View Full Earnings" -> SCR-CG-015 (Earnings Dashboard)
- "Update Profile" -> SCR-CG-003 (Profile Management)
```

**Route Map** (`tier1-route-map.md`, line 177):
```
| **SCR-CG-020** | Payout Setup (Stripe Connect) | `/caregiver/earnings/setup` | Caregiver | R0 | Feature map 7.4 |
```

**Route Map** (`tier1-route-map.md`, line 211):
```
| **SCR-CG-015** | Earnings Dashboard | `/caregiver/earnings` | Caregiver | R1 | Feature map 7.5 |
```

**Interpretation**:
- SCR-CG-015 (Earnings Dashboard) is the primary earnings view (R1)
- SCR-CG-020 (Payout Setup) is a sub-flow for configuring payouts (R0)

**Proposed Resolution** (for wireframe):
- **"View Full Earnings" link** → SCR-CG-015 (Earnings Dashboard)
  - Route: `/caregiver/earnings`
  - If caregiver has not set up payouts, SCR-CG-015 displays a banner: "Set up payouts to receive your earnings" with link to SCR-CG-020
- **"View Earnings" quick action button** → SCR-CG-015 (same destination)

**Assumption**: SCR-CG-015 is the parent screen, SCR-CG-020 is a child flow accessible from SCR-CG-015 if payouts not configured.

**Action Required**: Product team to confirm navigation hierarchy and update route map if needed.

---

## 13. Design Handoff Notes

### 13.1 For Figma Designer

**Phase 1 Deliverables** (Low-Fidelity Wireframes):
1. Desktop wireframe: All 4 states (Empty, Pending Requests, Active Bookings, Earnings Summary)
2. Tablet wireframe: ST-02 (Pending Requests) and ST-01 (Empty State) minimum
3. Mobile wireframe: ST-02 (Pending Requests) and ST-01 (Empty State) minimum

**Phase 2 Deliverables** (High-Fidelity Designs):
1. Full visual design for all 4 states (desktop, tablet, mobile)
2. Component library:
   - Booking Request Card (3 urgency variants)
   - Booking Card (3 timing variants)
   - Countdown Timer (3 urgency variants)
   - Status Badge (booking + verification variants)
   - Profile Completion Progress Bar
   - Profile Visibility Toggle
   - Earnings Summary Widget
   - Alert Banner (info, warning, error)
3. Design system documentation (colors, typography, spacing extracted from dashboard)

**Accessibility Checklist**:
- [ ] Touch targets ≥48px
- [ ] Color contrast ≥4.5:1 (text), ≥3:1 (interactive elements)
- [ ] Focus indicators visible
- [ ] Screen reader annotations documented
- [ ] Countdown timer `aria-live` regions specified

### 13.2 Component Reuse Opportunities

**Shared with Care Receiver Dashboard (SCR-CR-001)**:
- Alert Banner (different content, same structure)
- Status Badge (shared booking statuses)
- Header Navigation (role-specific menu items)
- Footer

**Shared with Admin Dashboard (SCR-ADM-001)**:
- Status Badge (booking statuses for admin view)
- Metric Card (similar to Earnings Summary Widget)

**Dashboard-Specific** (unique to Caregiver Dashboard):
- Booking Request Card (countdown timer unique to caregiver side)
- Profile Completion Progress Bar
- Profile Visibility Toggle
- Earnings Summary Widget

### 13.3 Design System Extraction Priorities

**From Caregiver Dashboard, extract**:
1. **Colors**:
   - Urgency colors (green, yellow, red for countdown timers)
   - Status badge colors (booking states + verification states)
   - Background colors (card, alert banners)
2. **Typography**:
   - Dashboard title (H1)
   - Widget titles (H2)
   - Card titles (H3)
   - Body text (booking details)
   - Emphasis (earnings amounts)
3. **Spacing**:
   - Card padding
   - Widget spacing
   - Grid gaps
4. **Components**:
   - All components listed in Section 11

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-07 | UX/UI Design Team | Initial wireframes and element inventory for SCR-CG-001 |

---

## Source Dependencies

**This wireframe document was derived from**:

| Source Document | Path | Sections Used |
|----------------|------|---------------|
| Route Map | `/docs/product/tier1-route-map.md` | Lines 617-627 (SCR-CG-001 definition) |
| Booking Specification | `/docs/product/features/tier1-booking-specification.md` | Booking states, request flow, caregiver acceptance |
| Admin Specification | `/docs/product/features/tier1-admin-specification.md` | Dashboard requirements context |
| Verification Specification | `/docs/product/features/tier1-verification-specification.md` | Profile completion, verification badges |
| Figma Production Plan | `/docs/tiers/tier1/FIGMA_PRODUCTION_PLAN.md` | Jobs 1-4 context, dashboard strategy |
| Screen Inventory | `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` | SCR-CG-001 initial content definition |

---

**END OF DOCUMENT**
