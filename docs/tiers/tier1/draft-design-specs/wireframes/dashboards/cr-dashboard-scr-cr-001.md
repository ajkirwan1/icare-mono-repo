# Care Receiver Dashboard Wireframes (SCR-CR-001)

**Document Purpose**: ASCII wireframes and complete element inventory for Care Receiver Dashboard (SCR-CR-001)

**Screen ID**: SCR-CR-001
**Screen Name**: Care Receiver Dashboard
**User Role**: Care Receiver (family member)
**Route**: `/dashboard`
**R0/R1**: R0 (Decision CB-001 - 2026-02-02)
**Created**: 2026-02-07
**Status**: READY FOR FIGMA HANDOFF

---

## Table of Contents

1. [Screen Purpose](#1-screen-purpose)
2. [Element Inventory](#2-element-inventory)
3. [ASCII Wireframes](#3-ascii-wireframes)
4. [Responsive Behavior](#4-responsive-behavior)
5. [UI States](#5-ui-states)
6. [Accessibility Requirements](#6-accessibility-requirements)
7. [Navigation & Interactions](#7-navigation--interactions)
8. [Design Notes](#8-design-notes)

---

## 1. Screen Purpose

### 1.1 Purpose Statement

The Care Receiver Dashboard serves as the primary landing page after login, providing:
- Quick overview of upcoming bookings (next 7 days)
- Pending booking requests awaiting caregiver response
- Quick action buttons to find caregivers and manage bookings
- Recent activity notifications
- Account status indicators

### 1.2 Entry Points

**From Registration Flow**:
- SCR-AUTH-004 (Phone Verification) → Phone verified → Redirect to `/dashboard`

**From Authentication**:
- SCR-AUTH-005 (Login) → Login success → Redirect to `/dashboard`

**From Other Screens** (header navigation):
- SCR-CR-003 (Search) → "Dashboard" link in header
- SCR-CR-008 (Booking Detail) → "Dashboard" link in header
- SCR-CR-013 (Payment Methods) → "Dashboard" link in header
- Any authenticated screen → "Dashboard" in main navigation

### 1.3 Exit Points

**Primary Actions**:
- "Find a Caregiver" button → SCR-CR-003 (Caregiver Search)
- "View All Bookings" link → SCR-CR-008 (Bookings list view)
- "Messages" notification → SCR-CR-011 (Message Thread)

**Secondary Actions**:
- Booking card click → SCR-CR-008 (Booking Detail)
- Account status banner → Profile completion flow
- Payment method warning → SCR-CR-013 (Payment Methods)

**Global Navigation**:
- Header "Search" → SCR-CR-003
- Header "My Bookings" → SCR-CR-008
- Header "Messages" → SCR-CR-012 (Message Inbox)
- Header "Settings" → SCR-CR-017 (Account Settings)

---

## 2. Element Inventory

### 2.1 Content Blocks

#### Block 1: Header (Global)
- **Purpose**: Consistent navigation and user context across all authenticated screens
- **Priority**: Primary
- **Elements**:
  - Platform logo (left-aligned) → Clickable, returns to dashboard
  - Main navigation menu (center):
    - "Dashboard" link (current, highlighted)
    - "Search Caregivers" link → SCR-CR-003
    - "My Bookings" link → SCR-CR-008
    - "Messages" link → SCR-CR-012 (with unread count badge if >0)
  - User profile menu (right-aligned):
    - User name display with avatar (clickable dropdown)
    - Dropdown options:
      - "Account Settings" → SCR-CR-017
      - "Payment Methods" → SCR-CR-013
      - "Help & Support" → Help center
      - "Logout" → Logout action

#### Block 2: Page Header
- **Purpose**: Welcome user and establish context
- **Priority**: Primary
- **Elements**:
  - H1: "Welcome back, [First Name]"
  - Subtitle/breadcrumb: "Your dashboard" or timestamp "Last updated: Today at 14:32"

#### Block 3: Account Status Banner (Conditional)
- **Purpose**: Alert user to incomplete setup or urgent actions
- **Priority**: Primary (if shown)
- **Elements**:
  - Warning banner (yellow/amber background):
    - Icon: ⚠️ Alert icon
    - Message: "[Action needed]" headline
    - Description: Specific action required
    - CTA button: "[Complete Action]" → Relevant screen
  - Dismissible close button (X)
- **Visibility Conditions**:
  - Show if no payment method added: "Add a payment method to request bookings" → SCR-CR-013
  - Show if profile incomplete: "Complete your profile to find better matches" → Profile edit
  - Show if verification pending: "Phone verification pending" (should not appear if logged in)
  - Hide if all setup complete

#### Block 4: Quick Actions
- **Purpose**: Primary CTAs for core user tasks
- **Priority**: Primary
- **Elements**:
  - "Find a Caregiver" button (primary, large)
    - Icon: 🔍 Search icon
    - Action: Navigate to SCR-CR-003 (Search)
  - "View All Bookings" button (secondary)
    - Icon: 📅 Calendar icon
    - Action: Navigate to SCR-CR-008 (Bookings list)
  - "Messages" button (secondary)
    - Icon: 💬 Message icon with unread count badge (if >0)
    - Action: Navigate to SCR-CR-012 (Message Inbox)

#### Block 5: Pending Booking Requests
- **Purpose**: Show booking requests awaiting caregiver response (24h window)
- **Priority**: Primary
- **Elements**:
  - Section heading (H2): "Pending Requests"
  - Subheading: "Awaiting caregiver response"
  - Request cards (list, max 3 visible, "View all" link if >3):
    - Each card contains:
      - Caregiver name and profile photo (small thumbnail)
      - Date and time: "Tuesday, March 5 at 2:00 PM"
      - Duration: "3 hours"
      - Status indicator: "⏳ Awaiting response"
      - Countdown timer: "20 hours remaining"
      - Action buttons:
        - "View Details" → SCR-CR-008 (Booking Detail)
        - "Cancel Request" → Cancellation confirmation modal
  - Empty state (if no pending requests):
    - Icon: ✓ Checkmark or empty state illustration
    - Message: "No pending requests"
    - Description: "Your caregiver requests will appear here"

#### Block 6: Upcoming Bookings
- **Purpose**: Show confirmed bookings in next 7 days
- **Priority**: Primary
- **Elements**:
  - Section heading (H2): "Upcoming Bookings"
  - Subheading: "Next 7 days"
  - Booking cards (list, max 3 visible, "View all" link if >3):
    - Each card contains:
      - Status badge: "Confirmed" (green) or "In Progress" (blue)
      - Caregiver name and profile photo
      - Date and time: "Wednesday, March 6 at 10:00 AM"
      - Duration: "4 hours"
      - Service types: Icons + labels (Companionship, Light housework, etc.)
      - Location: Care receiver address (abbreviated)
      - Action buttons:
        - "View Details" → SCR-CR-008 (Booking Detail)
        - "Message Caregiver" → SCR-CR-011 (Message Thread)
  - Empty state (if no upcoming bookings):
    - Icon: 📅 Calendar icon or empty state illustration
    - Message: "No upcoming bookings"
    - Description: "Find a caregiver to get started"
    - CTA button: "Find a Caregiver" → SCR-CR-003

#### Block 7: Recent Activity
- **Purpose**: Show recent bookings requiring action (completion confirmation, reviews)
- **Priority**: Secondary
- **Elements**:
  - Section heading (H2): "Recent Activity"
  - Activity cards (list, max 3):
    - Each card contains:
      - Activity type icon: ✅ (completed), ⭐ (review requested), ⚠️ (issue)
      - Message: "[Caregiver Name]'s visit on [Date] is complete"
      - Timestamp: "2 hours ago"
      - Action buttons:
        - "Confirm Completion" → Confirmation action
        - "Leave Review" → SCR-CR-015 (Review form)
        - "Report Issue" → Dispute/safeguarding flow
  - Empty state (if no recent activity):
    - Message: "No recent activity"
    - Description: "Your booking history will appear here"

#### Block 8: Footer (Global)
- **Purpose**: Legal links, support, secondary navigation
- **Priority**: Tertiary
- **Elements**:
  - Footer links (horizontal list):
    - "About Us"
    - "How It Works"
    - "Safety & Support"
    - "Terms of Service" → SCR-PUB-006
    - "Privacy Policy" → SCR-PUB-007
    - "Safeguarding Policy" → SCR-PUB-008
    - "Contact Us"
  - Copyright notice: "© 2026 [Platform Name]. All rights reserved."

---

### 2.2 Interactive Elements

#### Primary Actions
1. **"Find a Caregiver" button**
   - Type: Primary CTA button
   - Action: Navigate to `/search` (SCR-CR-003)
   - Styling: Large, prominent, brand color
   - Keyboard: Focusable, Enter/Space to activate
   - Screen reader: "Find a caregiver, button"

2. **"View All Bookings" button**
   - Type: Secondary CTA button
   - Action: Navigate to `/bookings` (SCR-CR-008 list view)
   - Styling: Secondary button style
   - Keyboard: Focusable, Enter/Space to activate

3. **"Messages" button**
   - Type: Secondary CTA button with badge
   - Action: Navigate to `/messages` (SCR-CR-012)
   - Badge: Unread count (if >0)
   - Keyboard: Focusable, Enter/Space to activate

#### Secondary Actions
4. **Booking card "View Details" buttons**
   - Type: Link or button
   - Action: Navigate to `/bookings/:bookingId` (SCR-CR-008)
   - Keyboard: Focusable

5. **"Message Caregiver" buttons**
   - Type: Link or button
   - Action: Navigate to `/messages/:conversationId` (SCR-CR-011)
   - Keyboard: Focusable

6. **"Leave Review" buttons**
   - Type: Link or button
   - Action: Navigate to `/bookings/:bookingId/review` (SCR-CR-015)
   - Keyboard: Focusable

7. **"Cancel Request" buttons**
   - Type: Destructive button
   - Action: Open cancellation confirmation modal
   - Keyboard: Focusable, requires confirmation

#### Tertiary Actions
8. **User profile dropdown**
   - Type: Dropdown menu
   - Trigger: Click user name/avatar
   - Items: Settings, Payment Methods, Help, Logout
   - Keyboard: Tab to trigger, Arrow keys to navigate items, Enter to select

9. **Account status banner dismiss**
   - Type: Close button (X)
   - Action: Hide banner (session-persistent)
   - Keyboard: Focusable, Enter/Space to dismiss

---

### 2.3 Data Display Elements

#### Dynamic Data
1. **User first name** (Block 2)
   - Source: `users.first_name` from database
   - Fallback: "Welcome back" (if name missing)

2. **Pending booking requests count** (Block 5)
   - Source: Count of bookings with `status = 'requested'` for this user
   - Real-time or refreshed on page load

3. **Countdown timers** (Block 5)
   - Source: Calculated from `bookings.requested_at + 24 hours - current_time`
   - Updates: Real-time (e.g., "20 hours remaining" → "19 hours, 58 minutes")
   - Display format: "X hours, Y minutes remaining" or "Less than 1 hour remaining"

4. **Upcoming bookings** (Block 6)
   - Source: Bookings with `status IN ('accepted', 'in_progress')` and `start_time BETWEEN now() AND now() + 7 days`
   - Sorted by: `start_time ASC` (soonest first)
   - Limit: 3 cards visible, "View all X bookings" link if >3

5. **Unread message count** (Block 4, Header navigation)
   - Source: Count of unread messages for this user
   - Display: Badge with number (e.g., "3") or dot if >99

6. **Recent activity** (Block 7)
   - Source: Bookings with `status IN ('completed', 'payment_released')` and `completed_at > now() - 7 days`
   - Filter: Show only if action required (confirm completion, leave review)

#### Static Content
- Section headings, labels, empty state messages (defined in element inventory above)

---

### 2.4 Navigation Context

**Breadcrumb** (optional, not critical for dashboard):
- Home → Dashboard

**Current Page Indicator**:
- "Dashboard" link in header highlighted/bolded

**Back Button**:
- Not applicable (dashboard is top-level navigation hub)

---

## 3. ASCII Wireframes

### 3.1 Desktop Wireframe (1440px+)

#### State 1: Empty State (New User, No Bookings)

```
+------------------------------------------------------------------------------+
|  [LOGO]               Dashboard   Search   My Bookings   Messages   [USER▼] |
+------------------------------------------------------------------------------+
|                                                                              |
|  H1: Welcome back, Sarah                                                     |
|  Last updated: Today at 14:32                                                |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  | ⚠️  Add a payment method to request bookings                           |  |
|  |     You'll need to add a card before you can book caregivers    [Add →]|  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +----------------------+  +----------------------+  +----------------------+ |
|  | 🔍                  |  | 📅                  |  | 💬                  | |
|  | Find a Caregiver    |  | View All Bookings   |  | Messages            | |
|  |                     |  |                     |  |                     | |
|  | [Search Now]        |  | [View Bookings]     |  | [View Messages]     | |
|  +----------------------+  +----------------------+  +----------------------+ |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  PENDING REQUESTS                                                      |  |
|  |  Awaiting caregiver response                                           |  |
|  |                                                                        |  |
|  |      ✓                                                                 |  |
|  |      No pending requests                                               |  |
|  |      Your caregiver requests will appear here                          |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  UPCOMING BOOKINGS                                                     |  |
|  |  Next 7 days                                                           |  |
|  |                                                                        |  |
|  |      📅                                                                 |  |
|  |      No upcoming bookings                                              |  |
|  |      Find a caregiver to get started                                   |  |
|  |                                                                        |  |
|  |      [Find a Caregiver]                                                |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  RECENT ACTIVITY                                                       |  |
|  |                                                                        |  |
|  |      No recent activity                                                |  |
|  |      Your booking history will appear here                             |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
+------------------------------------------------------------------------------+
| About | How It Works | Safety | Terms | Privacy | Safeguarding | Contact    |
| © 2026 Platform Name. All rights reserved.                                  |
+------------------------------------------------------------------------------+
```

---

#### State 2: Active Bookings State (Confirmed Upcoming Bookings)

```
+------------------------------------------------------------------------------+
|  [LOGO]               Dashboard   Search   My Bookings   Messages (2) [USER▼]|
+------------------------------------------------------------------------------+
|                                                                              |
|  H1: Welcome back, Sarah                                                     |
|  Last updated: Today at 14:32                                                |
|                                                                              |
|  +----------------------+  +----------------------+  +----------------------+ |
|  | 🔍                  |  | 📅                  |  | 💬  2               | |
|  | Find a Caregiver    |  | View All Bookings   |  | Messages            | |
|  |                     |  |                     |  |                     | |
|  | [Search Now]        |  | [View Bookings]     |  | [View Messages]     | |
|  +----------------------+  +----------------------+  +----------------------+ |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  PENDING REQUESTS                                                      |  |
|  |  Awaiting caregiver response                                           |  |
|  |                                                                        |  |
|  |      ✓                                                                 |  |
|  |      No pending requests                                               |  |
|  |      Your caregiver requests will appear here                          |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  UPCOMING BOOKINGS                                                     |  |
|  |  Next 7 days                                           [View all 5 →]  |  |
|  |                                                                        |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | ✓ CONFIRMED                                                      |  |  |
|  |  |                                                                  |  |  |
|  |  | [Photo]  Mary Thompson                                           |  |  |
|  |  |          Wednesday, March 6 at 10:00 AM • 4 hours                |  |  |
|  |  |          👥 Companionship • 🏠 Light housework                    |  |  |
|  |  |          📍 123 High Street, SW1A 1AA                             |  |  |
|  |  |                                                                  |  |  |
|  |  |          [View Details]     [Message Caregiver]                  |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | ✓ CONFIRMED                                                      |  |  |
|  |  |                                                                  |  |  |
|  |  | [Photo]  Emma Wilson                                             |  |  |
|  |  |          Friday, March 8 at 2:00 PM • 3 hours                    |  |  |
|  |  |          👥 Companionship • 🛒 Shopping                           |  |  |
|  |  |          📍 123 High Street, SW1A 1AA                             |  |  |
|  |  |                                                                  |  |  |
|  |  |          [View Details]     [Message Caregiver]                  |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | ● IN PROGRESS                                                    |  |  |
|  |  |                                                                  |  |  |
|  |  | [Photo]  John Anderson                                           |  |  |
|  |  |          Today at 2:00 PM • 3 hours (started 15 minutes ago)     |  |  |
|  |  |          👥 Companionship • 🍳 Meal preparation                   |  |  |
|  |  |          📍 123 High Street, SW1A 1AA                             |  |  |
|  |  |                                                                  |  |  |
|  |  |          [View Details]     [Emergency Contact]                  |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  RECENT ACTIVITY                                                       |  |
|  |                                                                        |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | ⭐  Leave a review                                               |  |  |
|  |  |     Mary Thompson's visit on March 4 is complete                 |  |  |
|  |  |     2 hours ago                                                  |  |  |
|  |  |                                                                  |  |  |
|  |  |     [Leave Review]     [Not now]                                 |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
+------------------------------------------------------------------------------+
| About | How It Works | Safety | Terms | Privacy | Safeguarding | Contact    |
| © 2026 Platform Name. All rights reserved.                                  |
+------------------------------------------------------------------------------+
```

---

#### State 3: Pending Requests State (Awaiting Caregiver Response)

```
+------------------------------------------------------------------------------+
|  [LOGO]               Dashboard   Search   My Bookings   Messages   [USER▼] |
+------------------------------------------------------------------------------+
|                                                                              |
|  H1: Welcome back, Sarah                                                     |
|  Last updated: Today at 14:32                                                |
|                                                                              |
|  +----------------------+  +----------------------+  +----------------------+ |
|  | 🔍                  |  | 📅                  |  | 💬                  | |
|  | Find a Caregiver    |  | View All Bookings   |  | Messages            | |
|  |                     |  |                     |  |                     | |
|  | [Search Now]        |  | [View Bookings]     |  | [View Messages]     | |
|  +----------------------+  +----------------------+  +----------------------+ |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  PENDING REQUESTS                                                      |  |
|  |  Awaiting caregiver response                           [View all 3 →]  |  |
|  |                                                                        |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | ⏳ AWAITING RESPONSE                                             |  |  |
|  |  |                                                                  |  |  |
|  |  | [Photo]  Emma Wilson                                             |  |  |
|  |  |          Tuesday, March 5 at 2:00 PM • 3 hours                   |  |  |
|  |  |          👥 Companionship • 🏠 Light housework                    |  |  |
|  |  |          📍 123 High Street, SW1A 1AA                             |  |  |
|  |  |                                                                  |  |  |
|  |  |          ⏱️ 20 hours, 15 minutes remaining                        |  |  |
|  |  |                                                                  |  |  |
|  |  |          [View Details]     [Cancel Request]                     |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | ⏳ AWAITING RESPONSE                                             |  |  |
|  |  |                                                                  |  |  |
|  |  | [Photo]  John Anderson                                           |  |  |
|  |  |          Wednesday, March 6 at 10:00 AM • 4 hours                |  |  |
|  |  |          👥 Companionship • 🛒 Shopping                           |  |  |
|  |  |          📍 123 High Street, SW1A 1AA                             |  |  |
|  |  |                                                                  |  |  |
|  |  |          ⏱️ 5 hours, 42 minutes remaining                         |  |  |
|  |  |                                                                  |  |  |
|  |  |          [View Details]     [Cancel Request]                     |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  UPCOMING BOOKINGS                                                     |  |
|  |  Next 7 days                                                           |  |
|  |                                                                        |  |
|  |      📅                                                                 |  |
|  |      No upcoming bookings                                              |  |
|  |      Your confirmed bookings will appear here                          |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  RECENT ACTIVITY                                                       |  |
|  |                                                                        |  |
|  |      No recent activity                                                |  |
|  |      Your booking history will appear here                             |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
+------------------------------------------------------------------------------+
| About | How It Works | Safety | Terms | Privacy | Safeguarding | Contact    |
| © 2026 Platform Name. All rights reserved.                                  |
+------------------------------------------------------------------------------+
```

---

### 3.2 Tablet Wireframe (768px-1439px)

```
+----------------------------------------------------------+
|  [LOGO]         Dashboard   Search   Bookings   [USER▼]  |
|                 Messages (2)                             |
+----------------------------------------------------------+
|                                                          |
|  H1: Welcome back, Sarah                                 |
|  Last updated: Today at 14:32                            |
|                                                          |
|  +----------------------------------------------------+  |
|  | 🔍 Find a Caregiver                                |  |
|  | [Search Now]                                       |  |
|  +----------------------------------------------------+  |
|                                                          |
|  +----------------------------------------------------+  |
|  | 📅 View All Bookings     💬 Messages (2)          |  |
|  | [View Bookings]          [View Messages]           |  |
|  +----------------------------------------------------+  |
|                                                          |
|  +----------------------------------------------------+  |
|  |  PENDING REQUESTS                   [View all 3 →] |  |
|  |  Awaiting caregiver response                       |  |
|  |                                                    |  |
|  |  +----------------------------------------------+  |  |
|  |  | ⏳ AWAITING RESPONSE                         |  |  |
|  |  |                                              |  |  |
|  |  | [Photo]  Emma Wilson                         |  |  |
|  |  |          Tue, Mar 5 at 2:00 PM • 3h          |  |  |
|  |  |          👥 Companionship • 🏠 Housework      |  |  |
|  |  |          ⏱️ 20h 15m remaining                 |  |  |
|  |  |                                              |  |  |
|  |  |          [View Details]  [Cancel]            |  |  |
|  |  +----------------------------------------------+  |  |
|  |                                                    |  |
|  +----------------------------------------------------+  |
|                                                          |
|  +----------------------------------------------------+  |
|  |  UPCOMING BOOKINGS                  [View all 5 →] |  |
|  |  Next 7 days                                       |  |
|  |                                                    |  |
|  |  +----------------------------------------------+  |  |
|  |  | ✓ CONFIRMED                                  |  |  |
|  |  |                                              |  |  |
|  |  | [Photo]  Mary Thompson                       |  |  |
|  |  |          Wed, Mar 6 at 10:00 AM • 4h         |  |  |
|  |  |          👥 Companionship • 🏠 Housework      |  |  |
|  |  |                                              |  |  |
|  |  |          [View Details]  [Message]           |  |  |
|  |  +----------------------------------------------+  |  |
|  |                                                    |  |
|  |  +----------------------------------------------+  |  |
|  |  | ● IN PROGRESS                                |  |  |
|  |  |                                              |  |  |
|  |  | [Photo]  John Anderson                       |  |  |
|  |  |          Today at 2:00 PM • 3h               |  |  |
|  |  |          (started 15 minutes ago)            |  |  |
|  |  |          👥 Companionship • 🍳 Meal prep      |  |  |
|  |  |                                              |  |  |
|  |  |          [View Details]  [Emergency]         |  |  |
|  |  +----------------------------------------------+  |  |
|  |                                                    |  |
|  +----------------------------------------------------+  |
|                                                          |
|  +----------------------------------------------------+  |
|  |  RECENT ACTIVITY                                   |  |
|  |                                                    |  |
|  |  +----------------------------------------------+  |  |
|  |  | ⭐  Leave a review                           |  |  |
|  |  |     Mary's visit on Mar 4 is complete        |  |  |
|  |  |     2h ago                                   |  |  |
|  |  |                                              |  |  |
|  |  |     [Leave Review]  [Not now]                |  |  |
|  |  +----------------------------------------------+  |  |
|  |                                                    |  |
|  +----------------------------------------------------+  |
|                                                          |
+----------------------------------------------------------+
| About | How It Works | Safety | Terms | Privacy |       |
| © 2026 Platform Name                                     |
+----------------------------------------------------------+
```

---

### 3.3 Mobile Wireframe (320px-767px)

```
+--------------------------------------+
|  ☰  [LOGO]                  [USER▼]  |
+--------------------------------------+
|                                      |
|  H1: Welcome back,                   |
|      Sarah                           |
|  Last updated: Today at 14:32        |
|                                      |
|  +--------------------------------+  |
|  | 🔍 Find a Caregiver            |  |
|  | [Search Now]                   |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  | 📅 Bookings     💬 Messages (2)|  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  PENDING REQUESTS [View all →] |  |
|  |  Awaiting response             |  |
|  |                                |  |
|  |  +--------------------------+  |  |
|  |  | ⏳ AWAITING              |  |  |
|  |  |                          |  |  |
|  |  | [Photo] Emma Wilson      |  |  |
|  |  | Tue, Mar 5 • 2:00 PM     |  |  |
|  |  | 3 hours                  |  |  |
|  |  | 👥 Companionship         |  |  |
|  |  |                          |  |  |
|  |  | ⏱️ 20h 15m remaining     |  |  |
|  |  |                          |  |  |
|  |  | [View Details]           |  |  |
|  |  | [Cancel Request]         |  |  |
|  |  +--------------------------+  |  |
|  |                                |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  UPCOMING BOOKINGS             |  |
|  |  Next 7 days    [View all 5 →] |  |
|  |                                |  |
|  |  +--------------------------+  |  |
|  |  | ✓ CONFIRMED              |  |  |
|  |  |                          |  |  |
|  |  | [Photo] Mary Thompson    |  |  |
|  |  | Wed, Mar 6 • 10:00 AM    |  |  |
|  |  | 4 hours                  |  |  |
|  |  | 👥 🏠                    |  |  |
|  |  |                          |  |  |
|  |  | [View Details]           |  |  |
|  |  | [Message]                |  |  |
|  |  +--------------------------+  |  |
|  |                                |  |
|  |  +--------------------------+  |  |
|  |  | ● IN PROGRESS            |  |  |
|  |  |                          |  |  |
|  |  | [Photo] John Anderson    |  |  |
|  |  | Today • 2:00 PM          |  |  |
|  |  | Started 15m ago          |  |  |
|  |  |                          |  |  |
|  |  | [View Details]           |  |  |
|  |  | [Emergency]              |  |  |
|  |  +--------------------------+  |  |
|  |                                |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  RECENT ACTIVITY               |  |
|  |                                |  |
|  |  +--------------------------+  |  |
|  |  | ⭐ Leave a review        |  |  |
|  |  | Mary's visit on Mar 4    |  |  |
|  |  | 2h ago                   |  |  |
|  |  |                          |  |  |
|  |  | [Leave Review]           |  |  |
|  |  | [Not now]                |  |  |
|  |  +--------------------------+  |  |
|  |                                |  |
|  +--------------------------------+  |
|                                      |
+--------------------------------------+
| About | Terms | Privacy | Contact    |
| © 2026 Platform Name                 |
+--------------------------------------+
```

---

## 4. Responsive Behavior

### 4.1 Breakpoints

| Viewport | Layout Changes | Priority |
|----------|----------------|----------|
| **Mobile** (320px-767px) | Single column, stacked sections, hamburger menu | Essential content only |
| **Tablet** (768px-1439px) | 2-column quick actions, condensed cards, horizontal nav | Condensed layouts |
| **Desktop** (1440px+) | 3-column quick actions, full cards, horizontal nav | Full layout |

### 4.2 Layout Changes by Viewport

#### Desktop (1440px+)
- **Header**: Full horizontal navigation (Dashboard, Search, My Bookings, Messages)
- **Quick Actions**: 3-column layout (Find Caregiver, View Bookings, Messages side-by-side)
- **Booking cards**: Full width with all details visible
- **Footer**: Full horizontal link list

#### Tablet (768px-1439px)
- **Header**: Condensed navigation (Dashboard, Search, Bookings, Messages wrap to 2 lines if needed)
- **Quick Actions**: 2-column layout (Find Caregiver full width, View Bookings + Messages side-by-side)
- **Booking cards**: Slightly condensed, service icons instead of full labels
- **Footer**: Condensed link list

#### Mobile (320px-767px)
- **Header**: Hamburger menu (☰) for navigation, logo center/left, user menu right
- **Quick Actions**: Single column stacked (Find Caregiver, then Bookings + Messages in 2-column row)
- **Booking cards**: Compact cards with minimal details, icons for service types
- **Footer**: Vertical list or collapsed accordion

### 4.3 Touch Target Sizes

**Mobile Requirements** (elderly-friendly):
- Minimum touch target: **48x48px** (WCAG AAA compliant)
- Primary CTA buttons: **56px height minimum**
- Card tap areas: Entire card clickable (not just button)
- Spacing between tappable elements: **8px minimum**

---

## 5. UI States

### 5.1 Loading State

**Initial Page Load**:
```
+------------------------------------------------------------------------------+
|  [LOGO]               Dashboard   Search   My Bookings   Messages   [USER▼] |
+------------------------------------------------------------------------------+
|                                                                              |
|  H1: Welcome back, Sarah                                                     |
|  Loading...                                                                  |
|                                                                              |
|  +----------------------+  +----------------------+  +----------------------+ |
|  | 🔍                  |  | 📅                  |  | 💬                  | |
|  | Find a Caregiver    |  | View All Bookings   |  | Messages            | |
|  |                     |  |                     |  |                     | |
|  | [Search Now]        |  | [View Bookings]     |  | [View Messages]     | |
|  +----------------------+  +----------------------+  +----------------------+ |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  PENDING REQUESTS                                                      |  |
|  |  Awaiting caregiver response                                           |  |
|  |                                                                        |  |
|  |  [Loading skeleton cards...]                                           |  |
|  |  ░░░░░░░░░░░��░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░         |  |
|  |  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░         |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  UPCOMING BOOKINGS                                                     |  |
|  |  Next 7 days                                                           |  |
|  |                                                                        |  |
|  |  [Loading skeleton cards...]                                           |  |
|  |  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░         |  |
|  |  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░         |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
+------------------------------------------------------------------------------+
```

**Loading Indicators**:
- Skeleton screens for booking cards (gray placeholder boxes)
- Spinner for delayed loading (>2 seconds)
- Progressive loading: Quick actions visible immediately, booking data loads async

### 5.2 Empty States

**No Pending Requests** (see State 1 wireframe):
- Icon: ✓ Checkmark
- Message: "No pending requests"
- Description: "Your caregiver requests will appear here"
- No CTA (neutral empty state)

**No Upcoming Bookings** (see State 1 wireframe):
- Icon: 📅 Calendar
- Message: "No upcoming bookings"
- Description: "Find a caregiver to get started"
- CTA: "Find a Caregiver" button → SCR-CR-003

**No Recent Activity**:
- Icon: None or document icon
- Message: "No recent activity"
- Description: "Your booking history will appear here"
- No CTA

**Account Status Banner (Payment Method Missing)**:
- Icon: ⚠️ Warning
- Message: "Add a payment method to request bookings"
- Description: "You'll need to add a card before you can book caregivers"
- CTA: "Add Payment Method" → SCR-CR-013

### 5.3 Error States

**Failed to Load Bookings**:
```
+------------------------------------------------------------------------+
|  UPCOMING BOOKINGS                                                     |
|  Next 7 days                                                           |
|                                                                        |
|      ⚠️ Unable to load bookings                                        |
|      We couldn't retrieve your bookings. Please try again.             |
|                                                                        |
|      [Retry]                                                           |
|                                                                        |
+------------------------------------------------------------------------+
```

**Network Error** (global banner):
```
+------------------------------------------------------------------------------+
| ⚠️  You appear to be offline. Some features may not be available. [Dismiss] |
+------------------------------------------------------------------------------+
```

**Session Expired** (redirect to login):
- Automatic redirect to `/login?redirect=/dashboard`
- Banner message: "Your session has expired. Please log in again."

### 5.4 Success States

**Booking Request Sent** (toast notification):
```
+----------------------------------------+
| ✅  Booking request sent to Emma Wilson |
| They have 24 hours to respond          |
| [View Request]  [Dismiss]              |
+----------------------------------------+
```

**Review Submitted** (toast notification):
```
+----------------------------------------+
| ✅  Thank you for your review!          |
| Your feedback helps other families     |
| [Dismiss]                              |
+----------------------------------------+
```

### 5.5 In-Progress States

**Booking Currently Happening**:
- Status badge: "● IN PROGRESS" (blue, animated pulse)
- Countdown timer: "Started 15 minutes ago" (live updating)
- Emergency contact button visible: "[Emergency Contact]"

**Countdown Timer Warnings**:
- <2 hours remaining: Yellow indicator
- <30 minutes remaining: Red indicator, more prominent
- Timer format: "20 hours, 15 minutes remaining" or "Less than 1 hour remaining"

---

## 6. Accessibility Requirements

### 6.1 WCAG 2.1 AA Compliance

#### Perceivable
- **Text Alternatives**:
  - ✅ All icons have `aria-label` or adjacent text (e.g., "Find a Caregiver" label with 🔍 icon)
  - ✅ Profile photos have alt text: "Mary Thompson profile photo"
  - ✅ Status indicators have text labels: "Confirmed" badge, not just green color

- **Distinguishable**:
  - ✅ Color contrast ratios meet 4.5:1 for normal text, 3.0:1 for large text
  - ✅ Status communicated via text + color (not color alone): "✓ CONFIRMED" badge
  - ✅ Font sizes: Minimum 16px body text, 20px+ for primary CTAs
  - ✅ Spacing: Line height 1.5, paragraph spacing 2em

#### Operable
- **Keyboard Accessible**:
  - ✅ All interactive elements focusable via Tab key
  - ✅ Focus order: Header nav → Quick actions → Pending requests → Upcoming bookings → Recent activity → Footer
  - ✅ Focus indicators: 3px solid border with high contrast color
  - ✅ Keyboard shortcuts: None required for dashboard (browse-only page)

- **Enough Time**:
  - ✅ Countdown timers do not auto-refresh page (static page with opt-in refresh)
  - ✅ Session timeout warning: 15 minutes before expiry, option to extend

- **Navigable**:
  - ✅ Skip to main content link (hidden until focused)
  - ✅ Page title: "[Platform Name] - Dashboard"
  - ✅ Headings hierarchy: H1 (Welcome back), H2 (section headings), H3 (card titles if needed)
  - ✅ Landmark regions: `<header>`, `<main>`, `<footer>`, `<nav>`

#### Understandable
- **Readable**:
  - ✅ Language declared: `<html lang="en-GB">`
  - ✅ Jargon avoided: "Pending Requests" instead of "Requests in queue"
  - ✅ Clear labels: "Find a Caregiver" not "Search"

- **Predictable**:
  - ✅ Consistent navigation across all screens (header/footer identical)
  - ✅ Consistent button styles (primary, secondary, destructive)
  - ✅ No auto-refresh or unexpected navigation

- **Input Assistance**:
  - ✅ Error messages: Clear, specific, helpful (see Error States)
  - ✅ Labels: All buttons and links have clear text labels

#### Robust
- **Compatible**:
  - ✅ Valid HTML5 semantic markup
  - ✅ ARIA roles where needed: `role="status"` for live countdown timers
  - ✅ Tested with screen readers (NVDA, JAWS, VoiceOver)

### 6.2 Focus Order

**Tab Order** (Desktop):
1. Skip to main content link (hidden until focused)
2. Platform logo
3. Header navigation: Dashboard → Search → My Bookings → Messages
4. User profile dropdown trigger
5. Quick actions: Find Caregiver → View Bookings → Messages
6. Pending Requests section:
   - "View all" link (if >3)
   - Each request card: View Details → Cancel Request
7. Upcoming Bookings section:
   - "View all" link (if >3)
   - Each booking card: View Details → Message Caregiver (or Emergency Contact)
8. Recent Activity section:
   - Each activity card: Primary action → Secondary action
9. Footer links: About → How It Works → ... → Contact

**Mobile Focus Order**:
- Hamburger menu button → Logo → User menu → (rest same as desktop)

### 6.3 Screen Reader Announcements

**Page Load**:
- "Dashboard page loaded. Welcome back, Sarah. You have 2 pending requests and 5 upcoming bookings."

**Countdown Timer Updates**:
- `aria-live="polite"` region: "20 hours remaining" (announced when timer updates)

**Dynamic Content Updates**:
- New message notification: "You have 1 new message" (aria-live announcement)
- Booking status change: "Booking with Emma Wilson confirmed" (toast notification announced)

**Card Focus**:
- Pending request card: "Booking request with Emma Wilson. Tuesday, March 5 at 2:00 PM, 3 hours. Companionship and light housework. 20 hours remaining. View details button, Cancel request button."
- Upcoming booking card: "Confirmed booking with Mary Thompson. Wednesday, March 6 at 10:00 AM, 4 hours. Companionship and light housework. Location: 123 High Street. View details button, Message caregiver button."

### 6.4 Elderly User Considerations

**Cognitive Load Reduction**:
- ✅ One primary action per section (Find Caregiver most prominent)
- ✅ Clear visual hierarchy (H1 → H2 → cards)
- ✅ Generous white space (24px+ between sections)
- ✅ Familiar patterns (card-based layout, standard buttons)

**Vision Support**:
- ✅ Large font sizes (16px minimum, 20px+ for CTAs)
- ✅ High contrast colors (brand colors tested for AA compliance)
- ✅ Icons paired with text labels (not icons alone)
- ✅ Zoom support: Page readable at 200% zoom

**Motor Control**:
- ✅ Large touch targets (48x48px minimum, 56px for primary CTAs)
- ✅ Ample spacing between clickable elements (8px minimum)
- ✅ Entire card clickable (not just small buttons)
- ✅ No hover-only interactions (all actions accessible via tap/click)

---

## 7. Navigation & Interactions

### 7.1 Primary User Flows

#### Flow 1: Find Caregiver (New Booking)
1. User lands on dashboard (SCR-CR-001)
2. User clicks "Find a Caregiver" button
3. Navigate to `/search` (SCR-CR-003)
4. [Search and booking flow continues...]

#### Flow 2: View Booking Details
1. User lands on dashboard (SCR-CR-001)
2. User sees upcoming booking card
3. User clicks "View Details" button on card
4. Navigate to `/bookings/:bookingId` (SCR-CR-008)

#### Flow 3: Message Caregiver
1. User lands on dashboard (SCR-CR-001)
2. User sees confirmed booking with "Message Caregiver" button
3. User clicks "Message Caregiver"
4. Navigate to `/messages/:conversationId` (SCR-CR-011)

#### Flow 4: Leave Review
1. User lands on dashboard (SCR-CR-001)
2. User sees recent activity: "Leave a review" prompt
3. User clicks "Leave Review" button
4. Navigate to `/bookings/:bookingId/review` (SCR-CR-015)

#### Flow 5: Cancel Booking Request
1. User lands on dashboard (SCR-CR-001)
2. User sees pending request card
3. User clicks "Cancel Request" button
4. Confirmation modal appears: "Are you sure? Your payment authorization will be released."
5. User confirms cancellation
6. Booking status updated to "cancelled"
7. Card removed from Pending Requests section
8. Toast notification: "Booking request cancelled"

### 7.2 Secondary Actions

#### Add Payment Method
- Trigger: Click "Add Payment Method" in account status banner
- Action: Navigate to `/settings/payment` (SCR-CR-013)

#### View All Bookings
- Trigger: Click "View all X bookings" link in Upcoming Bookings section
- Action: Navigate to `/bookings` (SCR-CR-008 list view with filter)

#### View All Requests
- Trigger: Click "View all X requests" link in Pending Requests section
- Action: Navigate to `/bookings?status=requested` (SCR-CR-008 list view filtered)

#### Emergency Contact (In-Progress Booking)
- Trigger: Click "[Emergency Contact]" button on in-progress booking card
- Action: Modal appears with emergency contact details (name, phone, relationship)
- Modal content: "Emergency Contact: [Name], [Relationship], [Phone Number]"
- Button: "Call Now" (opens phone dialer on mobile)

### 7.3 Interaction Patterns

#### Booking Card Interaction
- **Entire card clickable**: Clicking anywhere on card (except specific buttons) navigates to booking detail
- **Button hierarchy**:
  - Primary: "View Details" (default action)
  - Secondary: "Message Caregiver" or "Cancel Request"
- **Hover state** (desktop): Card elevates with shadow, cursor pointer
- **Focus state**: 3px border around card, focus indicator on active button

#### Countdown Timer Updates
- **Real-time updates**: Timer refreshes every minute
- **Format changes**:
  - >24 hours: "X days remaining"
  - 2-24 hours: "X hours remaining"
  - <2 hours: "X hours, Y minutes remaining"
  - <1 hour: "Less than 1 hour remaining" (red warning)
  - <30 minutes: Pulsing red indicator
- **No auto-refresh**: Timers update in place, page does not reload

#### Toast Notifications
- **Duration**: 5 seconds (dismissible)
- **Position**: Top-right corner (desktop), top center (mobile)
- **Types**: Success (green), Warning (yellow), Error (red), Info (blue)
- **Accessibility**: `role="alert"` for screen reader announcement

---

## 8. Design Notes

### 8.1 Design Principles Applied

**1. Simplicity & Clarity**
- Dashboard focuses on 3 key sections: Pending Requests, Upcoming Bookings, Recent Activity
- Single primary action: "Find a Caregiver" (largest, most prominent)
- Jargon-free language: "Awaiting caregiver response" not "Request status: pending_acceptance"

**2. Trust-Building**
- Status indicators clearly visible: "✓ CONFIRMED" badge
- Countdown timers create urgency transparency: "20 hours remaining"
- Profile photos humanize caregivers
- Emergency contact button visible during in-progress bookings (safety signal)

**3. Accessibility First**
- Large font sizes (16px body, 20px+ CTAs)
- High contrast colors (4.5:1 minimum)
- Large touch targets (48x48px minimum)
- Text + icon labels (not icons alone)

**4. Progressive Disclosure**
- Dashboard shows summary (3 cards max per section)
- "View all" links for full lists
- Details hidden until user clicks "View Details"

**5. Error Prevention**
- Confirmation modals for destructive actions (Cancel Request)
- Clear status indicators prevent confusion
- Account status banner prompts setup completion

### 8.2 Content Hierarchy

**Visual Hierarchy**:
1. **H1**: Welcome message (largest, boldest)
2. **Quick Actions**: Primary CTAs (large buttons, brand color)
3. **H2**: Section headings (Pending Requests, Upcoming Bookings, Recent Activity)
4. **Booking Cards**: Structured content (photo, name, date, status, actions)
5. **Footer**: Tertiary links (smallest, gray)

**Information Priority**:
- **Most Important**: Pending requests (awaiting response, time-sensitive)
- **Important**: Upcoming bookings (confirmed, need awareness)
- **Secondary**: Recent activity (completed, optional review)

### 8.3 Color & Status Indicators

**Status Badge Colors**:
- **Green** (✓ CONFIRMED): Booking accepted, confirmed
- **Blue** (● IN PROGRESS): Session currently happening
- **Yellow** (⏳ AWAITING RESPONSE): Pending caregiver acceptance
- **Gray**: Completed (no action needed)
- **Red**: Cancelled, disputed, issue

**Color Contrast Requirements**:
- All status badges: Text contrast 4.5:1 on background
- Countdown timer warnings: Yellow (<2h), Red (<30m)

**Color Usage Rules**:
- Status NEVER communicated by color alone (always text + color)
- Icons reinforce status (✓, ●, ⏳)

### 8.4 Typography Scale

**Recommended Sizes** (minimum):
- **H1** (Welcome message): 32px (desktop), 28px (tablet), 24px (mobile)
- **H2** (Section headings): 24px (desktop), 22px (tablet), 20px (mobile)
- **Body text**: 16px (all viewports)
- **Card content**: 14px (secondary info), 16px (primary info)
- **Primary CTAs**: 18px (desktop), 16px (mobile)
- **Secondary buttons**: 16px (all viewports)

**Font Weights**:
- **H1**: Bold (700)
- **H2**: Semibold (600)
- **Body**: Regular (400)
- **CTA buttons**: Semibold (600)

### 8.5 Spacing & Layout

**Section Spacing**:
- Between sections (Pending → Upcoming → Recent): 40px (desktop), 32px (tablet), 24px (mobile)
- Between cards within section: 16px (desktop), 12px (mobile)
- Card padding: 24px (desktop), 20px (tablet), 16px (mobile)

**Button Spacing**:
- Between primary and secondary buttons: 12px horizontal
- Padding: 16px horizontal, 12px vertical (primary), 12px/10px (secondary)

### 8.6 Component Reuse

**Shared Components** (design system):
- **Header**: Global navigation (used across all authenticated screens)
- **Footer**: Legal links (used across all screens)
- **Booking Card**: Reusable component (used on dashboard, bookings list, search results)
- **Status Badge**: Reusable component (used on cards, booking detail)
- **Button**: Primary, Secondary, Destructive variants
- **Toast Notification**: Success, Error, Warning, Info variants
- **Empty State**: Icon + message + description + optional CTA

---

## 9. Cross-References

### Source Documents

**Route Map**:
- `/docs/product/tier1-route-map.md` - SCR-CR-001 definition (lines 565-576)

**Feature Specifications**:
- `/docs/product/features/tier1-booking-specification.md` - Booking states and lifecycle
- `/docs/product/features/tier1-admin-specification.md` - Dashboard requirements (lines 1-500)

**Planning**:
- `/docs/tiers/tier1/planning/r0-launch-scope.md` - R0 inclusion (CB-001 decision)
- `/docs/tiers/tier1/FIGMA_PRODUCTION_PLAN.md` - Job 1 context

**Related Screens**:
- SCR-CR-003: Caregiver Search (exit point)
- SCR-CR-008: Booking Detail (exit point)
- SCR-CR-011: Message Thread (exit point)
- SCR-CR-012: Message Inbox (exit point)
- SCR-CR-013: Payment Methods (exit point)
- SCR-CR-015: Leave Review (exit point)
- SCR-CR-017: Account Settings (exit point)

---

## 10. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-07 | UX Designer | Initial wireframes and element inventory for Figma handoff |

---

**END OF DOCUMENT**

**Status**: ✅ READY FOR FIGMA HANDOFF

**Next Steps**:
1. Figma designer creates high-fidelity mockups based on these wireframes
2. Visual design applies brand colors, typography, and imagery
3. Interactive prototype for user testing
4. Engineering handoff with component specifications
