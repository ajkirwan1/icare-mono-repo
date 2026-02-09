# Booking Request Detail Wireframes (SCR-CG-013 - Caregiver View)

**Document Purpose**: ASCII wireframes and complete element inventory for Booking Request Detail screen (Caregiver perspective)

**Screen ID**: SCR-CG-013
**Screen Name**: Booking Request Detail (Caregiver View)
**User Role**: Caregiver
**Route**: `/bookings/:bookingId` (shared with SCR-CR-008, role-based rendering)
**R0/R1**: R0
**Created**: 2026-02-08
**Status**: READY FOR FIGMA HANDOFF

**Architecture Note**: This screen and SCR-CR-008 share the SAME booking entity with role-based conditional rendering. Implementation uses a single screen component with route `/bookings/:bookingId` for both roles. The UI adapts based on authenticated user role (care receiver vs caregiver). Caregivers see: Accept, Decline, Mark Complete, Earnings breakdown. Care receivers see: Cancel, Confirm Completion, Dispute, Leave Review.

---

## Table of Contents

1. [Screen Purpose](#1-screen-purpose)
2. [Element Inventory](#2-element-inventory)
3. [ASCII Wireframes (Key States)](#3-ascii-wireframes-key-states)
4. [Responsive Behavior](#4-responsive-behavior)
5. [UI States](#5-ui-states)
6. [Accessibility Requirements](#6-accessibility-requirements)
7. [Navigation & Interactions](#7-navigation--interactions)
8. [Design Notes](#8-design-notes)

---

## 1. Screen Purpose

### 1.1 Purpose Statement

The Booking Request Detail screen (Caregiver view) enables caregivers to review incoming booking requests and make accept/decline decisions within a 24-hour window. After acceptance, it displays confirmed booking details, earnings breakdown, and provides actions to mark sessions complete or handle issues.

**Key Functions (Caregiver-Specific)**:
- Display booking request details with 24h countdown timer
- Show care receiver information (limited until acceptance)
- Display earnings breakdown (hourly rate minus platform commission)
- Provide Accept/Decline buttons with decline reason collection
- Show booking details after acceptance (care receiver contact info)
- Enable "Mark Complete" action when session finished
- Display caregiver earnings instead of total charge

**Key Difference from Care Receiver View (SCR-CR-008)**:
- **Earnings focus** (not payment charge)
- **Accept/Decline** actions (not cancel)
- **Care receiver info** limited until acceptance
- **Mark Complete** action (not confirm completion)
- **Commission deduction** shown in pricing

### 1.2 Entry Points

**From Caregiver Dashboard**:
- SCR-CG-001 (Caregiver Dashboard) → Click pending request card → Load this screen (status: pending)

**From Email Notification**:
- Email notification "New Booking Request" → "View Request" link → Load this screen

**From In-App Notification**:
- Click notification → Load this screen

**From Booking List** (future R1):
- SCR-CG-002 (Caregiver Bookings List) → Click booking → Load detail view

### 1.3 Exit Points

**Accept/Decline Actions**:
- "Accept Booking" → Booking accepted, page reloads with accepted state, redirect to SCR-CG-001 (dashboard) optional
- "Decline Booking" → Decline reason modal → Booking declined, redirect to SCR-CG-001

**Post-Acceptance**:
- "Message Care Receiver" → SCR-CG-011 (Message Thread) - future R1, use email for R0
- "Mark Complete" → Booking marked complete, page reloads with completed state

**Global Navigation**:
- Header "Dashboard" → SCR-CG-001
- Header "My Bookings" → SCR-CG-002 (list view)

---

## 2. Element Inventory

### 2.1 Content Blocks (Caregiver-Specific)

#### Block 1: Header (Global)
- **Component Reuse**: NAV-HEADER-AUTH (caregiver variant from dashboard-shared-components.md)

#### Block 2: Page Header
- **Purpose**: Show booking status and countdown timer
- **Priority**: Primary
- **Elements**:
  - Breadcrumb: "Dashboard > My Bookings > Booking Request"
  - H1: "Booking Request from [Care Receiver First Name]"
  - Status Badge (large, prominent):
    - **Pending**: "⏳ PENDING YOUR RESPONSE" (yellow)
    - **Accepted**: "✓ ACCEPTED" (green)
    - **Declined**: "DECLINED" (red)
    - **Expired**: "EXPIRED" (gray)
    - **Completed**: "COMPLETED" (gray)
  - **Countdown Timer** (if status = pending):
    - "20 hours, 15 minutes remaining to respond"
    - Format: Large text with clock icon
    - Color: Yellow if <2h, Red if <30min

**Component Reuse**: STATUS-BADGE, COUNTDOWN-TIMER (from dashboard-shared-components.md)

#### Block 3: Alert Banner (State-Dependent)
- **Purpose**: Display urgent messages and primary CTAs
- **Priority**: Primary (if shown)
- **Variants by State**:

**Pending** (awaiting caregiver response):
```
+------------------------------------------------------------------------+
| ⏳  Respond within 24 hours                                            |
|     Review this booking request and accept or decline within 24 hours.|
|     If you don't respond, the request will be automatically declined. |
|                                                                        |
|     [Accept Booking]    [Decline Booking]                             |
+------------------------------------------------------------------------+
```

**Accepted** (booking confirmed):
```
+------------------------------------------------------------------------+
| ✅  Booking accepted                                                    |
|     You accepted this booking. Care receiver contact details are now  |
|     available. Your booking is on [Date] at [Time].                   |
+------------------------------------------------------------------------+
```

**Declined** (caregiver declined):
```
+------------------------------------------------------------------------+
| ℹ️  Booking declined                                                   |
|     You declined this request on [Date]. Reason: [Decline reason]     |
+------------------------------------------------------------------------+
```

**Expired** (24h timeout):
```
+------------------------------------------------------------------------+
| ⚠️  Request expired                                                     |
|     You did not respond within 24 hours. This request has been        |
|     automatically declined.                                           |
+------------------------------------------------------------------------+
```

**Component Reuse**: ALERT-BANNER (from dashboard-shared-components.md)

#### Block 4: Care Receiver Information Card
- **Purpose**: Display care receiver details (privacy-limited until acceptance)
- **Priority**: Primary
- **Elements**:
  - **Before Acceptance** (status = pending):
    - Care receiver first name + last initial: "John S."
    - Location: Town/city only (not full address): "London, SW1A area"
    - Distance: "3.2 miles from you"
    - No profile photo (privacy)
    - No full address
    - No phone number
  - **After Acceptance** (status = accepted, in_progress, completed):
    - Care receiver full name: "John Smith"
    - Care receiver profile photo (if available)
    - Full address: "123 High Street, London SW1A 1AA"
    - Phone number: "07700 900123" with "Call" button
    - Emergency contact: "Jane Smith (Daughter) - 07700 900456"

**Privacy Rules**:
- Full personal details shared ONLY after acceptance
- Protects care receiver privacy until caregiver commits

#### Block 5: Booking Details
- **Purpose**: Display booking specifics
- **Priority**: Primary
- **Elements**:
  - **Section Heading (H2)**: "Booking Details"
  - **Date & Time**:
    - Label: "Date"
    - Value: "Wednesday, March 6, 2026"
    - Label: "Time"
    - Value: "10:00 AM - 2:00 PM" (start - end)
    - Label: "Duration"
    - Value: "4 hours"
  - **Service Type**:
    - Label: "Service Requested"
    - Value: "Companionship" with badge "Companionship Services Only"
    - Icons: 👥 Companionship, 🏠 Light housework (if applicable)
  - **Special Requests** (from care receiver):
    - Label: "Special Requests"
    - Value: "[Care receiver notes]" or "None"
    - Example: "I'd like to go for a walk if the weather is nice."

#### Block 6: Earnings Breakdown (Caregiver-Specific)
- **Purpose**: Display caregiver earnings after platform commission
- **Priority**: Primary
- **Elements**:
  - **Section Heading (H2)**: "Your Earnings"
  - **Earnings Calculation**:
    - Line item: "Service: Companionship (4 hours)"
    - Line item: "Your rate: £18.00/hour"
    - Line item: "Subtotal: £72.00"
    - Line item: "Platform commission (15%): -£10.80"
    - Divider
    - **Net Earnings** (large, bold, green): "£61.20"
  - **Payment Timeline**:
    - "Earnings will be paid 2-3 business days after session completion and care receiver confirmation."

**Commission Rate**: 15% (placeholder, subject to FDR-008 final decision)

**Key Difference from Care Receiver View**:
- Care receiver sees: Total charge (£75.60 = £72 + 5% service fee)
- Caregiver sees: Net earnings (£61.20 = £72 - 15% commission)

#### Block 7: Actions (State-Dependent, Caregiver-Specific)
- **Purpose**: Provide caregiver-specific actions
- **Priority**: Primary
- **Elements by State**:

**Pending**:
- Primary: "Accept Booking" button (large, green)
- Destructive: "Decline Booking" button (outlined, red)

**Accepted** (before start time):
- Secondary: "Message Care Receiver" button (future R1, use email for R0)
- Destructive: "Cancel Booking" button (emergency only)

**In Progress**:
- Primary: "Mark Complete" button (large, green)
- Secondary: "Report Issue" button (if no-show or problem)

**Completed**:
- Disabled: "Marked Complete" (gray, read-only)
- Info: "Awaiting care receiver confirmation. Earnings will be released after confirmation."

**Declined/Expired**:
- No actions (read-only view)

#### Block 8: Footer (Global)
- **Component Reuse**: FOOTER (from dashboard-shared-components.md)

---

### 2.2 Interactive Elements by State

**State 1: PENDING** (awaiting caregiver response, 24h countdown)

Primary Actions:
1. **"Accept Booking" button**
   - Type: Primary CTA (large, green background)
   - Action:
     1. Validate caregiver still available for date/time
     2. Charge care receiver payment (move from authorization hold to escrow)
     3. Update booking status to "accepted"
     4. Share care receiver contact details with caregiver
     5. Share caregiver contact details with care receiver
     6. Block caregiver calendar for booking duration
     7. Send confirmation emails/notifications to both parties
     8. Page reloads with accepted state
   - Keyboard: Focusable, Enter/Space to activate
   - Screen reader: "Accept booking, button. Earnings: £61.20"

2. **"Decline Booking" button**
   - Type: Destructive (outlined, red)
   - Action:
     1. Open decline reason modal
     2. Collect decline reason (dropdown) + optional message (textarea)
     3. Update booking status to "declined"
     4. Release payment authorization (care receiver not charged)
     5. Notify care receiver with decline reason
     6. Log decline in caregiver history (admin oversight)
     7. Redirect to SCR-CG-001 (dashboard) or show declined state
   - Keyboard: Focusable
   - Screen reader: "Decline booking, button. Opens decline reason form."

**Decline Reason Modal**:
```
+------------------------------------------------+
|  Decline Booking Request                       |
|                                                |
|  Please select a reason:                       |
|                                                |
|  Reason *                                      |
|  [Scheduling conflict          ▼]             |
|                                                |
|  Options:                                      |
|  - Scheduling conflict                         |
|  - Too far from my location                    |
|  - Outside my service capability               |
|  - Rate too low                                |
|  - Other                                       |
|                                                |
|  Optional message to care receiver             |
|  (300 characters max)                          |
|  +------------------------------------------+  |
|  | I have another booking at this time.     |  |
|  | Please feel free to request another...   |  |
|  +------------------------------------------+  |
|  280 characters remaining                      |
|                                                |
|  [Cancel]                   [Decline Booking]  |
+------------------------------------------------+
```

---

**State 2: ACCEPTED** (booking confirmed, before start time)

Primary Actions:
1. **"Message Care Receiver" button** (future R1)
   - Action: Navigate to SCR-CG-011 (Message Thread)
   - R0 workaround: Use email address provided

Secondary Actions:
2. **"Cancel Booking" button** (emergency only)
   - Warning modal: "Cancelling a confirmed booking may affect your reliability rating. Are you sure?"
   - If <48h before start: Caregiver flagged for admin review (3 strikes = suspension)
   - If >48h before start: No penalty

---

**State 3: IN_PROGRESS** (session currently happening)

Primary Actions:
1. **"Mark Complete" button**
   - Type: Primary CTA (green)
   - Action:
     1. Log completion timestamp
     2. Optional: Collect session notes (500 chars, admin-visible only)
     3. Update booking status to "completed"
     4. Notify care receiver: "Booking completed. Please confirm within 48 hours."
     5. Start 48h countdown for care receiver confirmation
     6. Page reloads with completed state (awaiting confirmation)
   - Keyboard: Focusable
   - Screen reader: "Mark complete, button. Session will be marked as finished."

Secondary Actions:
2. **"Report Issue" button**
   - Action: Open issue report modal (care receiver no-show, emergency, other)
   - Creates admin alert

---

**State 4: COMPLETED** (awaiting care receiver confirmation, 48h window)

No actions for caregiver:
- Info banner: "Awaiting care receiver confirmation. Earnings of £61.20 will be released after confirmation or auto-confirmation (48 hours)."
- Read-only view

---

**State 5: PAYMENT_RELEASED** (earnings released to caregiver)

Secondary Actions:
1. **"View Earnings Statement" button** (future)
   - Action: Navigate to earnings detail page
   - R0: Not implemented

---

**State 6: DECLINED/EXPIRED** (caregiver declined or 24h timeout)

No actions:
- Read-only view
- Shows decline reason (if declined)
- Shows "Auto-declined due to no response" (if expired)

---

### 2.3 Data Display Elements

#### Dynamic Data

1. **Booking status** (Block 2)
   - Source: `bookings.status` from database
   - Caregiver-relevant states: pending, accepted, in_progress, completed, payment_released, declined, expired

2. **Countdown timer** (Block 2, if pending)
   - Source: `bookings.requested_at + 24 hours - current_time`
   - Updates: Every 60 seconds (client-side)

3. **Care receiver information** (Block 4)
   - Source: `care_receiver_profiles` via `bookings.care_receiver_id`
   - **Before acceptance**: First name + last initial, town/city, distance
   - **After acceptance**: Full name, address, phone, emergency contact

4. **Booking details** (Block 5)
   - Source: `bookings` table (date, start_time, duration_hours, service_type, special_requests)

5. **Earnings breakdown** (Block 6)
   - Source: Calculated from `bookings.caregiver_rate` and `bookings.duration_hours`
   - Formula:
     - Subtotal = caregiver_rate × duration_hours
     - Commission = Subtotal × 0.15 (15%)
     - Net earnings = Subtotal - Commission

#### Static Content

- Section headings, labels, help text (defined above)

---

## 3. ASCII Wireframes (Key States)

### 3.1 State 1: PENDING (Awaiting Caregiver Response, 24h Countdown)

#### Desktop (1440px+)

```
+------------------------------------------------------------------------------+
|  [LOGO]           Dashboard   My Bookings   Availability   Settings  [USER▼]|
+------------------------------------------------------------------------------+
|                                                                              |
|  Breadcrumb: Dashboard > My Bookings > Booking Request                      |
|                                                                              |
|  H1: Booking Request from John                  [⏳ PENDING YOUR RESPONSE]  |
|                                                  ⏱️ 20h 15m remaining        |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  | ⏳  Respond within 24 hours                                            |  |
|  |     Review this booking request and accept or decline within 24 hours.|  |
|  |     If you don't respond, the request will be automatically declined. |  |
|  |                                                                        |  |
|  |     [Accept Booking]    [Decline Booking]                             |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +-----------------------------------+  +--------------------------------+   |
|  |  CARE RECEIVER INFORMATION        |  |  BOOKING DETAILS               |   |
|  |  (Privacy-limited until you       |  |                                |   |
|  |  accept)                          |  |  Date                          |   |
|  |                                   |  |  Wednesday, March 6, 2026      |   |
|  |  Name: John S.                    |  |                                |   |
|  |  Location: London, SW1A area      |  |  Time                          |   |
|  |  Distance: 3.2 miles from you     |  |  10:00 AM - 2:00 PM            |   |
|  |                                   |  |                                |   |
|  |  Full contact details will be     |  |  Duration                      |   |
|  |  shared after you accept this     |  |  4 hours                       |   |
|  |  booking.                         |  |                                |   |
|  |                                   |  |  Service Requested             |   |
|  +-----------------------------------+  |  👥 Companionship              |   |
|                                        |  🏠 Light housework            |   |
|  +-----------------------------------+  |  [Companionship Services Only] |   |
|  |  YOUR EARNINGS                    |  |                                |   |
|  |                                   |  |  Special Requests              |   |
|  |  Service: Companionship (4h)      |  |  "I'd like to go for a walk    |   |
|  |  Your rate: £18.00/hour           |  |  if the weather is nice, or    |   |
|  |  Subtotal: £72.00                 |  |  we can stay in and chat."     |   |
|  |  Platform commission (15%):       |  |                                |   |
|  |  -£10.80                          |  +--------------------------------+   |
|  |  ──────────────────────────────   |                                       |
|  |  Net Earnings: £61.20             |                                       |
|  |                                   |                                       |
|  |  Payment Timeline                 |                                       |
|  |  Earnings will be paid 2-3        |                                       |
|  |  business days after session      |                                       |
|  |  completion and care receiver     |                                       |
|  |  confirmation.                    |                                       |
|  |                                   |                                       |
|  +-----------------------------------+                                       |
|                                                                              |
|  [Decline Booking]                                        [Accept Booking]  |
|                                                                              |
+------------------------------------------------------------------------------+
| About | How It Works | Safety | Terms | Privacy | Safeguarding | Contact    |
| © 2026 Platform Name. All rights reserved.                                  |
+------------------------------------------------------------------------------+
```

---

### 3.2 State 2: ACCEPTED (Booking Confirmed, Contact Details Now Visible)

```
+------------------------------------------------------------------------------+
|  [LOGO]           Dashboard   My Bookings   Availability   Settings  [USER▼]|
+------------------------------------------------------------------------------+
|                                                                              |
|  Breadcrumb: Dashboard > My Bookings > Booking Details                      |
|                                                                              |
|  H1: Booking with John                                  [✓ ACCEPTED]        |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  | ✅  Booking accepted                                                    |  |
|  |     You accepted this booking. Care receiver contact details are now  |  |
|  |     available. Your booking is on Wednesday, March 6 at 10:00 AM.     |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +-----------------------------------+  +--------------------------------+   |
|  |  CARE RECEIVER INFORMATION        |  |  BOOKING DETAILS               |   |
|  |                                   |  |                                |   |
|  |  [Photo]  John Smith              |  |  Date                          |   |
|  |                                   |  |  Wednesday, March 6, 2026      |   |
|  |  Contact Details                  |  |                                |   |
|  |  📞 07700 900123      [Call]      |  |  Time                          |   |
|  |  ✉️ john@example.com              |  |  10:00 AM - 2:00 PM            |   |
|  |                                   |  |                                |   |
|  |  Address                          |  |  Duration                      |   |
|  |  123 High Street                  |  |  4 hours                       |   |
|  |  London SW1A 1AA                  |  |                                |   |
|  |  (3.2 miles from you)             |  |  Service                       |   |
|  |                                   |  |  👥 Companionship              |   |
|  |  Emergency Contact                |  |  🏠 Light housework            |   |
|  |  Jane Smith (Daughter)            |  |                                |   |
|  |  📞 07700 900456                  |  |  Special Requests              |   |
|  |                                   |  |  "I'd like to go for a walk    |   |
|  +-----------------------------------+  |  if the weather is nice."      |   |
|                                        |                                |   |
|  +-----------------------------------+  +--------------------------------+   |
|  |  YOUR EARNINGS                    |                                       |
|  |                                   |                                       |
|  |  Service: Companionship (4h)      |                                       |
|  |  Your rate: £18.00/hour           |                                       |
|  |  Subtotal: £72.00                 |                                       |
|  |  Platform commission (15%):       |                                       |
|  |  -£10.80                          |                                       |
|  |  ──────────────────────────────   |                                       |
|  |  Net Earnings: £61.20             |                                       |
|  |                                   |                                       |
|  |  Payment Timeline                 |                                       |
|  |  Earnings will be paid 2-3        |                                       |
|  |  business days after session      |                                       |
|  |  completion and care receiver     |                                       |
|  |  confirmation.                    |                                       |
|  |                                   |                                       |
|  +-----------------------------------+                                       |
|                                                                              |
|  [Cancel Booking]                                  [Message Care Receiver]  |
|  (Emergency only)                                  (Use email for R0)       |
|                                                                              |
+------------------------------------------------------------------------------+
```

---

### 3.3 State 3: IN_PROGRESS (Session Currently Happening)

```
+------------------------------------------------------------------------------+
|  [LOGO]           Dashboard   My Bookings   Availability   Settings  [USER▼]|
+------------------------------------------------------------------------------+
|                                                                              |
|  Breadcrumb: Dashboard > My Bookings > Booking Details                      |
|                                                                              |
|  H1: Booking with John                              [● IN PROGRESS]         |
|                                                      Started 35 minutes ago  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  | ℹ️  Session in progress                                                |  |
|  |     Mark this booking as complete when the session ends. The care     |  |
|  |     receiver will then have 48 hours to confirm.                      |  |
|  |                                                       [Mark Complete]  |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +-----------------------------------+  +--------------------------------+   |
|  |  CARE RECEIVER INFORMATION        |  |  BOOKING DETAILS               |   |
|  |                                   |  |                                |   |
|  |  [Photo]  John Smith              |  |  Date                          |   |
|  |                                   |  |  Wednesday, March 6, 2026      |   |
|  |  Contact Details                  |  |                                |   |
|  |  📞 07700 900123      [Call]      |  |  Time                          |   |
|  |                                   |  |  10:00 AM - 2:00 PM            |   |
|  |  Address                          |  |  (Started 35 minutes ago)      |   |
|  |  123 High Street                  |  |                                |   |
|  |  London SW1A 1AA                  |  |  Duration                      |   |
|  |                                   |  |  4 hours                       |   |
|  |  Emergency Contact                |  |                                |   |
|  |  Jane Smith (Daughter)            |  |  Service                       |   |
|  |  📞 07700 900456                  |  |  👥 Companionship              |   |
|  |                                   |  |  🏠 Light housework            |   |
|  +-----------------------------------+  |                                |   |
|                                        +--------------------------------+   |
|  +-----------------------------------+                                       |
|  |  YOUR EARNINGS                    |                                       |
|  |                                   |                                       |
|  |  Net Earnings: £61.20             |                                       |
|  |                                   |                                       |
|  |  Payment Timeline                 |                                       |
|  |  Mark complete to start 48-hour   |                                       |
|  |  confirmation window. Earnings    |                                       |
|  |  released after confirmation.     |                                       |
|  |                                   |                                       |
|  +-----------------------------------+                                       |
|                                                                              |
|  [Report Issue]                                          [Mark Complete]    |
|                                                                              |
+------------------------------------------------------------------------------+
```

---

### 3.4 State 4: COMPLETED (Awaiting Care Receiver Confirmation, 48h Window)

```
+------------------------------------------------------------------------------+
|  [LOGO]           Dashboard   My Bookings   Availability   Settings  [USER▼]|
+------------------------------------------------------------------------------+
|                                                                              |
|  Breadcrumb: Dashboard > My Bookings > Booking Details                      |
|                                                                              |
|  H1: Booking with John                              [COMPLETED]             |
|                                                      ⏱️ 47h to confirm       |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  | ℹ️  Awaiting care receiver confirmation                                |  |
|  |     You marked this booking complete. The care receiver has 48 hours  |  |
|  |     to confirm. If they don't respond, completion is auto-confirmed   |  |
|  |     and payment will be released.                                     |  |
|  |                                                                        |  |
|  |     Earnings: £61.20 (pending release)                                |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +-----------------------------------+  +--------------------------------+   |
|  |  CARE RECEIVER INFORMATION        |  |  BOOKING DETAILS               |   |
|  |                                   |  |                                |   |
|  |  [Photo]  John Smith              |  |  Date                          |   |
|  |                                   |  |  Wednesday, March 6, 2026      |   |
|  |  Contact Details                  |  |                                |   |
|  |  📞 07700 900123                  |  |  Time                          |   |
|  |                                   |  |  10:00 AM - 2:00 PM            |   |
|  |  Address                          |  |  (Completed at 2:15 PM)        |   |
|  |  123 High Street                  |  |                                |   |
|  |  London SW1A 1AA                  |  |  Duration                      |   |
|  |                                   |  |  4 hours                       |   |
|  +-----------------------------------+  |                                |   |
|                                        |  Service                       |   |
|  +-----------------------------------+  |  👥 Companionship              |   |
|  |  YOUR EARNINGS                    |  |                                |   |
|  |                                   |  +--------------------------------+   |
|  |  Net Earnings: £61.20             |                                       |
|  |                                   |                                       |
|  |  Payment Status                   |                                       |
|  |  Pending release (awaiting care   |                                       |
|  |  receiver confirmation or auto-   |                                       |
|  |  confirmation in 47 hours)        |                                       |
|  |                                   |                                       |
|  |  Expected payout: 2-3 business    |                                       |
|  |  days after confirmation          |                                       |
|  |                                   |                                       |
|  +-----------------------------------+                                       |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  BOOKING HISTORY                                                       |  |
|  |  • Requested on March 4, 2026 at 3:45 PM                              |  |
|  |  • Accepted by you on March 4, 2026 at 4:20 PM                        |  |
|  |  • Session started on March 6, 2026 at 10:05 AM                       |  |
|  |  • Session completed on March 6, 2026 at 2:15 PM                      |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
+------------------------------------------------------------------------------+
```

---

### 3.5 State 5: DECLINED (Caregiver Declined Request)

```
+------------------------------------------------------------------------------+
|  [LOGO]           Dashboard   My Bookings   Availability   Settings  [USER▼]|
+------------------------------------------------------------------------------+
|                                                                              |
|  Breadcrumb: Dashboard > My Bookings > Booking Details                      |
|                                                                              |
|  H1: Booking Request from John                      [DECLINED]              |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  | ℹ️  Booking declined                                                   |  |
|  |     You declined this request on March 4, 2026 at 4:00 PM.            |  |
|  |     Reason: Scheduling conflict                                       |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +-----------------------------------+  +--------------------------------+   |
|  |  CARE RECEIVER INFORMATION        |  |  BOOKING DETAILS (requested)   |   |
|  |                                   |  |                                |   |
|  |  Name: John S.                    |  |  Date                          |   |
|  |  Location: London, SW1A area      |  |  Wednesday, March 6, 2026      |   |
|  |  Distance: 3.2 miles              |  |                                |   |
|  |                                   |  |  Time                          |   |
|  +-----------------------------------+  |  10:00 AM - 2:00 PM            |   |
|                                        |                                |   |
|  +-----------------------------------+  |  Duration                      |   |
|  |  DECLINE REASON                   |  |  4 hours                       |   |
|  |                                   |  |                                |   |
|  |  Reason: Scheduling conflict      |  |  Service                       |   |
|  |                                   |  |  👥 Companionship              |   |
|  |  Your message to care receiver:   |  |                                |   |
|  |  "I have another booking at this  |  +--------------------------------+   |
|  |  time. Please feel free to        |                                       |
|  |  request another booking for a    |                                       |
|  |  different date."                 |                                       |
|  |                                   |                                       |
|  +-----------------------------------+                                       |
|                                                                              |
+------------------------------------------------------------------------------+
```

---

### 3.6 Mobile Wireframe (320px-767px) - State: PENDING

```
+--------------------------------------+
|  ☰  [LOGO]                  [USER▼]  |
+--------------------------------------+
|                                      |
|  Dashboard > Bookings > Request      |
|                                      |
|  H1: Request from John               |
|  [⏳ PENDING]                         |
|  ⏱️ 20h 15m remaining                 |
|                                      |
|  +--------------------------------+  |
|  | ⏳  Respond within 24h          |  |
|  |     Accept or decline within   |  |
|  |     24h or request will be     |  |
|  |     auto-declined.             |  |
|  |                                |  |
|  |     [Accept]  [Decline]        |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  CARE RECEIVER                 |  |
|  |  (Privacy-limited until you    |  |
|  |  accept)                       |  |
|  |                                |  |
|  |  Name: John S.                 |  |
|  |  Location: London, SW1A area   |  |
|  |  Distance: 3.2 miles from you  |  |
|  |                                |  |
|  |  Full details shared after     |  |
|  |  acceptance                    |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  BOOKING DETAILS               |  |
|  |                                |  |
|  |  Date                          |  |
|  |  Wed, March 6, 2026            |  |
|  |                                |  |
|  |  Time                          |  |
|  |  10:00 AM - 2:00 PM            |  |
|  |                                |  |
|  |  Duration                      |  |
|  |  4 hours                       |  |
|  |                                |  |
|  |  Service                       |  |
|  |  👥 Companionship              |  |
|  |  🏠 Light housework            |  |
|  |                                |  |
|  |  Special Requests              |  |
|  |  "I'd like to go for a walk    |  |
|  |  if the weather is nice."      |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  YOUR EARNINGS                 |  |
|  |                                |  |
|  |  Companionship (4h)            |  |
|  |  Rate: £18/hour                |  |
|  |  Subtotal: £72.00              |  |
|  |  Commission (15%): -£10.80     |  |
|  |  ──────────────────            |  |
|  |  Net Earnings: £61.20          |  |
|  |                                |  |
|  |  Paid 2-3 days after           |  |
|  |  completion & confirmation     |  |
|  +--------------------------------+  |
|                                      |
|  [Decline Booking]                   |
|  [Accept Booking]                    |
|                                      |
+--------------------------------------+
| About | Terms | Privacy              |
| © 2026 Platform Name                 |
+--------------------------------------+
```

---

## 4. Responsive Behavior

### 4.1 Breakpoints

| Viewport | Layout Changes | Priority |
|----------|----------------|----------|
| **Mobile** (320px-767px) | Single column, stacked sections, compact cards | Essential content only |
| **Tablet** (768px-1439px) | 2-column layout, condensed cards | Condensed layouts |
| **Desktop** (1440px+) | 2-column layout (60% details / 40% summary), full cards | Full layout |

### 4.2 Touch Target Sizes

**Mobile Requirements** (elderly caregivers may also be 65+):
- Minimum touch target: **48x48px**
- Primary action buttons: **56px height**, full width
- "Accept" and "Decline" buttons: **48px height minimum**, equal width (side-by-side or stacked)
- "Call" buttons: **48x48px**
- Spacing between action buttons: **12px minimum**

---

## 5. UI States

### 5.1 Loading State

**Initial Page Load**:
```
+------------------------------------------------------------------------------+
|  [LOGO]           Dashboard   My Bookings   Availability   Settings  [USER▼]|
+------------------------------------------------------------------------------+
|                                                                              |
|  Breadcrumb: Dashboard > My Bookings > Booking Request                      |
|                                                                              |
|  H1: Loading booking request...                                             |
|                                                                              |
|  [Loading skeleton - Alert banner]                                           |
|  [Loading skeleton - Care receiver card] [Loading skeleton - Booking details]|
+------------------------------------------------------------------------------+
```

### 5.2 Error States

**Failed to Load Booking**:
```
+------------------------------------------------------------------------+
| ⚠️  Unable to load booking request                                      |
|     We couldn't retrieve request details. Please try again or contact |
|     support.                                                          |
|                                                         [Try Again]    |
+------------------------------------------------------------------------+
```

**Accept Booking Failed** (caregiver no longer available):
```
+------------------------------------------------------------------------+
| ⚠️  Unable to accept booking                                            |
|     You have a scheduling conflict. Another booking was confirmed for |
|     this date/time. Please decline this request.                      |
|                                                         [Decline]      |
+------------------------------------------------------------------------+
```

### 5.3 Success States (Modals)

**Booking Accepted** (confirmation modal):
```
+------------------------------------------------+
|                                                |
|      ✅  Booking Accepted!                     |
|                                                |
|      You accepted this booking. Care receiver  |
|      contact details are now available.        |
|                                                |
|      Your booking is on:                       |
|      Wednesday, March 6, 2026 at 10:00 AM      |
|                                                |
|      Net earnings: £61.20                      |
|                                                |
|           [View Booking Details]               |
|           [Back to Dashboard]                  |
|                                                |
+------------------------------------------------+
```

**Booking Declined** (confirmation):
```
+------------------------------------------------+
|                                                |
|      ✅  Booking Declined                      |
|                                                |
|      Your decline reason has been sent to the  |
|      care receiver. No earnings for this       |
|      request.                                  |
|                                                |
|           [Back to Dashboard]                  |
|                                                |
+------------------------------------------------+
```

**Session Marked Complete**:
```
+------------------------------------------------+
|                                                |
|      ✅  Session Marked Complete               |
|                                                |
|      The care receiver has 48 hours to confirm.|
|      Your earnings (£61.20) will be released   |
|      after confirmation or auto-confirmation.  |
|                                                |
|           [OK]                                 |
|                                                |
+------------------------------------------------+
```

---

## 6. Accessibility Requirements

### 6.1 WCAG 2.1 AA Compliance

(Same requirements as SCR-CR-008, abbreviated here)

- **Perceivable**: Text + icons for status badges, earnings clearly labeled
- **Operable**: Keyboard accessible, 48px touch targets, clear focus indicators
- **Understandable**: Jargon-free ("Net Earnings" not "Commission-adjusted payout")
- **Robust**: Valid HTML5, ARIA roles for alerts and timers

### 6.2 Focus Order

**Tab Order** (Desktop, State: PENDING):
1. Header navigation
2. User dropdown
3. **Alert Banner**:
   - "Accept Booking" button
   - "Decline Booking" button
4. Care receiver card (read-only, no focusable elements until accepted)
5. Booking details (read-only)
6. Earnings summary (read-only)
7. **Bottom Actions**:
   - "Decline Booking" button
   - "Accept Booking" button
8. Footer links

### 6.3 Screen Reader Announcements

**Page Load** (State: PENDING):
- "Booking request from John. Status: Pending your response. 20 hours, 15 minutes remaining. Net earnings: £61.20. Review details below and accept or decline."

**Accept Button**:
- "Accept booking, button. Earnings: £61.20. Booking on Wednesday, March 6 at 10:00 AM."

**Decline Button**:
- "Decline booking, button. Opens decline reason form."

**Countdown Timer**:
- `aria-live="polite"` announces at 2h, 1h, 30min, 10min remaining

---

## 7. Navigation & Interactions

### 7.1 Primary User Flow

**Flow 1: Accept Booking Request (Happy Path)**
1. Caregiver lands on booking request (status: pending, 20h remaining)
2. Caregiver reads alert banner "Respond within 24 hours"
3. Caregiver reviews care receiver limited info (John S., London, 3.2 miles)
4. Caregiver reviews booking details (date, time, duration, service, special requests)
5. Caregiver reviews earnings breakdown (£61.20 net)
6. Caregiver decides to accept
7. Caregiver clicks "Accept Booking" button
8. System validates:
   - Caregiver still available for date/time ✓
   - Payment authorization still valid ✓
9. System processes acceptance:
   - Charges care receiver (move from hold to escrow)
   - Updates booking status to "accepted"
   - Shares contact details (care receiver address/phone → caregiver, caregiver phone → care receiver)
   - Blocks caregiver calendar
   - Sends confirmation emails/notifications
10. Success modal: "Booking Accepted! Contact details now available. Net earnings: £61.20."
11. Page reloads with accepted state (or redirect to SCR-CG-001 dashboard)

**Flow 2: Decline Booking Request**
1. Caregiver lands on booking request (status: pending)
2. Caregiver reviews details
3. Caregiver decides to decline (reason: scheduling conflict)
4. Caregiver clicks "Decline Booking" button
5. Decline reason modal appears
6. Caregiver selects reason from dropdown: "Scheduling conflict"
7. Caregiver optionally adds message (300 chars): "I have another booking at this time. Please feel free to request another booking for a different date."
8. Caregiver submits decline
9. System processes decline:
   - Updates booking status to "declined"
   - Releases payment authorization (care receiver not charged)
   - Notifies care receiver with decline reason + message
   - Logs decline in caregiver history (admin oversight)
10. Success modal: "Booking Declined. Your decline reason has been sent."
11. Redirect to SCR-CG-001 (dashboard) or show declined state

**Flow 3: Mark Session Complete**
1. Caregiver arrives at care receiver location on booking date
2. Session starts (caregiver marks "Start Session" - future feature)
3. Status updates to "in_progress"
4. Session completes 4 hours later
5. Caregiver clicks "Mark Complete" button
6. Optional: Caregiver adds session notes (500 chars, admin-only)
7. System logs completion timestamp
8. System updates status to "completed"
9. System notifies care receiver: "Booking completed. Please confirm within 48 hours."
10. Success modal: "Session Marked Complete. Earnings pending care receiver confirmation."
11. Page reloads with completed state (awaiting confirmation, 48h countdown)

### 7.2 Alternative Paths

**Path A: Auto-Decline After 24h**
1. Booking request created on March 4 at 3:45 PM
2. 24 hours pass (March 5 at 3:45 PM)
3. Caregiver did not respond
4. System auto-declines booking
5. System updates status to "expired"
6. System releases payment authorization
7. System notifies care receiver: "Caregiver did not respond. Your payment authorization has been released."
8. System logs auto-decline in caregiver history (pattern triggers admin review if frequent)
9. If caregiver visits booking detail → Shows expired state

**Path B: Accept Booking Conflict (Caregiver Double-Booked)**
1. Caregiver clicks "Accept Booking"
2. System validates caregiver availability
3. Another booking was just confirmed for the same date/time (race condition)
4. System prevents acceptance
5. Error modal: "Unable to accept booking. You have a scheduling conflict. Please decline this request."
6. Caregiver forced to decline

---

## 8. Design Notes

### 8.1 Design Principles Applied (Caregiver-Specific)

**1. Earnings Transparency**
- Net earnings displayed prominently (not gross amount)
- Platform commission clearly shown as deduction (15%)
- Payment timeline explained ("2-3 business days after confirmation")
- Different from care receiver view (care receiver sees total charge + service fee)

**2. Privacy Protection**
- Care receiver personal details hidden until acceptance
- Only first name + last initial shown before acceptance
- Full address/contact shared ONLY after caregiver commits
- Protects care receiver from unsolicited contact

**3. Decision Support**
- Clear earnings calculation (helps caregiver decide if worthwhile)
- Distance from caregiver displayed (travel consideration)
- Special requests visible (helps assess compatibility)
- 24h countdown creates urgency but not pressure

**4. Accessibility First**
- Same accessibility standards as care receiver view
- Large touch targets (caregivers may also be elderly)
- Clear focus indicators
- Countdown timer warnings (color + text + size)

### 8.2 Content Hierarchy

**Visual Hierarchy**:
1. **Status Badge + Countdown** (top right): Time-sensitive, urgent
2. **Alert Banner** (full width): Primary actions (Accept/Decline)
3. **Earnings Breakdown** (left column): Decision-critical information
4. **Care Receiver Info** (left column): Who you'll be helping
5. **Booking Details** (right column): When and what

**Information Priority**:
- **Most Important**: Earnings (£61.20 net), countdown timer (20h remaining), accept/decline actions
- **Important**: Care receiver location/distance, booking date/time, special requests
- **Secondary**: Service type, payment timeline

### 8.3 Color & Status Indicators

**Status Badge Colors** (same as care receiver view):
| Status | Color | Icon |
|--------|-------|------|
| Pending | Yellow (#F59E0B) | ⏳ Clock |
| Accepted | Green (#10B981) | ✓ Checkmark |
| In Progress | Blue (#3B82F6) | ● Dot |
| Completed | Gray (#6B7280) | ✓ Checkmark |
| Declined | Red (#EF4444) | ✗ X |
| Expired | Gray (#6B7280) | ⏱️ Clock |

**Earnings Display**:
- Net earnings: **Large, bold, green** (#10B981) to emphasize positive outcome
- Commission deduction: Red text (-£10.80) to show cost

### 8.4 Component Reuse

**Shared Components** (from dashboard-shared-components.md):
1. **NAV-HEADER-AUTH** (caregiver variant)
2. **FOOTER**
3. **STATUS-BADGE**
4. **COUNTDOWN-TIMER**
5. **ALERT-BANNER**
6. **BUTTON** (primary, secondary, destructive)
7. **MODAL** (confirmation dialogs)

**Caregiver-Specific Components**:
1. **EARNINGS-BREAKDOWN-CARD**: Displays net earnings with commission deduction
2. **CARE-RECEIVER-CARD**: Privacy-limited variant (before acceptance) and full variant (after acceptance)
3. **DECLINE-REASON-MODAL**: Collects decline reason + optional message

---

## 9. Cross-References

### Source Documents

**Route Map**:
- `/docs/product/tier1-route-map.md` - SCR-CG-013 definition

**Feature Specifications**:
- `/docs/product/features/tier1-booking-specification.md` - Caregiver response flow (REQ-BRR-001 to REQ-BRR-006), earnings calculation, commission rates

**Screen Inventory**:
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` - SCR-CG-013 details (lines 1273-1329)

**Components**:
- `/docs/tiers/tier1/draft-design-specs/components/dashboard-shared-components.md` - Shared component specs

**Related Screens**:
- SCR-CG-001: Caregiver Dashboard (entry point)
- SCR-CR-008: Booking Detail (care receiver view, same route, role-based rendering)
- SCR-CG-011: Message Thread (exit point, future R1)

---

## 10. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-08 | UX Designer | Initial wireframes for caregiver booking request detail |

---

**END OF DOCUMENT**

**Status**: ✅ READY FOR FIGMA HANDOFF

**Next Steps**:
1. Figma designer creates high-fidelity mockups for caregiver booking states
2. Visual design applies earnings-focused color scheme (green for net earnings)
3. Interactive prototype for accept/decline flow with decline reason modal
4. Engineering handoff with role-based rendering specifications (single route, two views)
