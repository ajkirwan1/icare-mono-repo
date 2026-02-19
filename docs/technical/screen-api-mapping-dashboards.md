# Screen-to-API Mapping: Dashboard Screens

**Document Purpose**: Maps each dashboard screen to the specific API endpoints required to populate it, including page-load calls, user-interaction calls, and identified gaps where no endpoint currently exists.

**Document Owner**: Technical Architect
**Created**: 2026-02-18
**Status**: CANONICAL
**Tier**: Tier 1

**Source Documents**:
- Wireframes: `docs/tiers/tier1/draft-design-specs/wireframes/dashboards/`
- Screen JSONs: `docs/tiers/tier1/figma/screens/`
- API Specification: `docs/technical/api-specification-tier1.md`

---

## Table of Contents

1. [How to Read This Document](#1-how-to-read-this-document)
2. [SCR-CR-001: Care Receiver Dashboard](#2-scr-cr-001-care-receiver-dashboard)
3. [SCR-CG-001: Caregiver Dashboard](#3-scr-cg-001-caregiver-dashboard)
4. [SCR-ADM-001: Admin Dashboard](#4-scr-adm-001-admin-dashboard)
5. [Gap Summary](#5-gap-summary)
6. [Recommended API Additions](#6-recommended-api-additions)

---

## 1. How to Read This Document

### Trigger Types

| Symbol | Meaning |
|--------|---------|
| **PAGE LOAD** | Called automatically when the screen first renders |
| **USER ACTION** | Called only when the user explicitly interacts (button click, toggle, filter) |
| **REAL-TIME** | Delivered by WebSocket connection, not a poll |

### Gap Flags

Sections marked **GAP** identify data the screen requires that has no matching endpoint in the current API specification. Each gap includes a recommended resolution in Section 6.

### API Base Path

All endpoints below are relative to `{base}/api/v1`. Full base URLs:
- Production: `https://api.icare-app.co.uk/api/v1`
- Development: `http://localhost:3000/api/v1`

---

## 2. SCR-CR-001: Care Receiver Dashboard

**Route**: `/dashboard`
**Role**: Care Receiver (and family member acting on behalf)
**Screen JSON**: `docs/tiers/tier1/figma/screens/dashboard-care-receiver.json`
**Wireframe**: `docs/tiers/tier1/draft-design-specs/wireframes/dashboards/cr-dashboard-scr-cr-001.md`

### 2.1 Page Load Calls

The following endpoints must all resolve before the dashboard is considered fully loaded. The quick-actions section (static navigation links) renders immediately. The three data sections (pending requests, upcoming bookings, recent activity) render with skeleton states until their respective calls complete.

---

#### Call 1: Current User Profile

**Trigger**: PAGE LOAD
**Endpoint**: `GET /users/me`
**Auth**: Bearer JWT

**Screen Elements Populated**:
- `section-page-header` — the H1 "Welcome back, [First Name]" greeting uses `data.firstName`
- Navigation header user avatar and name dropdown
- Account status banner visibility: if `data.accountStatus !== 'active'` the banner may need to display

**Response Fields Used**:
```
data.firstName           → "Welcome back, Sarah"
data.accountStatus       → drive conditional banner logic
data.phoneVerified       → confirm the session is valid
data.emailVerified       → confirm the session is valid
```

**Notes**: This call also verifies the JWT is still valid. A 401 response must redirect to `/login?redirect=/dashboard`.

---

#### Call 2: Payment Method Status (Account Status Banner)

**Trigger**: PAGE LOAD
**Endpoint**: `GET /payments/methods`
**Auth**: Bearer JWT

**Screen Elements Populated**:
- `section-account-status-banner` — the conditional warning banner. Shown if `data.paymentMethods` is an empty array. Hidden if at least one payment method exists.

**Response Fields Used**:
```
data.paymentMethods.length === 0  → show banner "Add a payment method to request bookings"
data.defaultPaymentMethodId       → (stored in client state for later booking creation)
```

**Notes**: The banner CTA "Add Payment Method" navigates to `/settings/payment` (SCR-CR-013). No further API call is triggered from the banner itself on the dashboard.

---

#### Call 3: Pending Booking Requests

**Trigger**: PAGE LOAD
**Endpoint**: `GET /care-receivers/me/bookings`
**Auth**: Bearer JWT
**Query Parameters**: `status=requested&limit=3&page=1`

**Screen Elements Populated**:
- `section-pending-requests` — the entire widget
  - If results: renders up to 3 `booking-card` components in `pending-request` variant
  - If empty array: renders the `empty-state` ("No pending requests")
  - "View all 3 →" header link uses the `pagination.totalCount` to format the label

**Response Fields Used Per Card**:
```
data.bookings[n].id                → used in "View Details" link: /bookings/:id
data.bookings[n].caregiver         → caregiverName (first name + last initial) and photo
data.bookings[n].bookingDate       → "Tuesday, March 5"
data.bookings[n].startTime         → "2:00 PM"
data.bookings[n].durationHours     → "3 hours"
data.bookings[n].serviceTypes      → service type icon labels
data.bookings[n].location.postcode → abbreviated location (postcode only at this stage)
data.bookings[n].requestedAt       → used to calculate the countdown timer client-side
data.bookings[n].responseDeadline  → countdown timer target: hoursRemaining = responseDeadline - now()
data.bookings[n].status            → must equal "requested" to appear in this section
pagination.totalCount              → drives "View all N →" label
```

**Notes**: The countdown timer is calculated client-side from `responseDeadline`. The timer updates every 60 seconds using a `setInterval` — no polling is performed. The full 24-hour window countdown (`responseDeadline - now()`) drives the colour-coded urgency indicator on the caregiver dashboard, but on the care receiver dashboard only a simple "X hours remaining" label is shown.

---

#### Call 4: Upcoming Bookings

**Trigger**: PAGE LOAD
**Endpoint**: `GET /care-receivers/me/bookings`
**Auth**: Bearer JWT
**Query Parameters**: `status=accepted,in_progress&startDate={today}&endDate={today+7days}&limit=3&page=1&sort=startTime_asc`

**Screen Elements Populated**:
- `section-upcoming-bookings` — the entire widget
  - If results: renders up to 3 `booking-card` components in `confirmed` variant (including `in_progress` variant for the currently active booking)
  - If empty array: renders the `empty-state` with "Find a Caregiver" CTA

**Response Fields Used Per Card**:
```
data.bookings[n].id                 → "View Details" link: /bookings/:id
data.bookings[n].status             → drives status badge ("Confirmed" vs "In Progress")
data.bookings[n].caregiver          → caregiverName, caregiverPhotoUrl
data.bookings[n].bookingDate        → "Wednesday, March 6"
data.bookings[n].startTime          → "10:00 AM"
data.bookings[n].durationHours      → "4 hours"
data.bookings[n].serviceTypes       → icon + label pairs
data.bookings[n].location.postcode  → abbreviated location
data.bookings[n].conversationId     → (if present) drives "Message Caregiver" link to /messages/:conversationId
pagination.totalCount               → drives "View all 5 →" label
```

**Notes**: Two separate status values are requested in a single call (`status=accepted,in_progress`). The `in_progress` status is applied automatically by the scheduled background task `TASK-001` when `startTime <= NOW()`. The dashboard differentiates visually: `accepted` shows a "Confirmed" green badge, `in_progress` shows a blue pulsing "In Progress" badge and replaces the "Message Caregiver" CTA with "Emergency Contact". The emergency contact data comes from the booking detail endpoint (Call 2 on the booking detail screen, not on the dashboard).

**GAP-CR-001**: The `GET /care-receivers/me/bookings` endpoint response includes a `conversationId` field in the sample data shown in `GET /conversations`, but the bookings response schema in the API spec does not include `conversationId`. The "Message Caregiver" button on each upcoming booking card needs this value to route to `/messages/:conversationId`. See Section 6 for the recommended fix.

---

#### Call 5: Recent Activity (Completed Bookings Awaiting Review)

**Trigger**: PAGE LOAD
**Endpoint**: `GET /care-receivers/me/bookings`
**Auth**: Bearer JWT
**Query Parameters**: `status=completed,payment_released&limit=3&page=1&sort=completedAt_desc`

**Screen Elements Populated**:
- `section-recent-activity` — the entire widget
  - If results with no review yet: renders `activity-card` with "Leave Review" CTA
  - If empty array: renders `empty-state` ("No recent activity")

**Response Fields Used Per Card**:
```
data.bookings[n].id              → "Leave Review" link: /bookings/:id/review
data.bookings[n].status          → "completed" or "payment_released"
data.bookings[n].caregiver       → caregiverName for the activity message
data.bookings[n].bookingDate     → "March 4"
data.bookings[n].completedAt     → drive relative timestamp "2 hours ago"
data.bookings[n].hasReview       → filter: only show cards where no review exists yet
```

**GAP-CR-002**: The `GET /care-receivers/me/bookings` response does not include a `hasReview` boolean or `reviewId` field. The Recent Activity section must only show completed bookings where the care receiver has not yet left a review. Without this flag, the client must make an additional call per booking to determine whether a review exists, which is inefficient. See Section 6 for the recommended fix.

**GAP-CR-003**: The endpoint does not filter by date range automatically for "recent" activity. The wireframe specifies "last 7 days" for completed bookings. Without a `completedAfter` query parameter, the client must fetch all completed bookings and filter client-side, which fails for users with many historical bookings. See Section 6 for the recommended fix.

---

#### Call 6: Unread Message Count

**Trigger**: PAGE LOAD (then maintained by WebSocket)
**Endpoint**: `GET /conversations`
**Auth**: Bearer JWT
**Query Parameters**: `page=1&limit=1`

**Screen Elements Populated**:
- Navigation header "Messages" link badge (e.g., "(2)")
- Quick Actions "Messages" CTA card badge
- `section-quick-actions` — the "Messages" card shows the aggregate unread count

**Response Fields Used**:
```
data.conversations[n].unreadCount  → sum of all unreadCount values = total badge number
pagination.totalCount              → not directly displayed but useful for inbox
```

**Notes**: This call fetches the full conversation list and sums `unreadCount` across all conversations client-side. The WebSocket connection (established at page load) then keeps this count updated in real-time via the `new_message` event.

**GAP-CR-004**: There is no `/conversations/unread-count` endpoint. Fetching the full conversation list solely to compute a badge count is wasteful for users with many conversations. See Section 6 for the recommended fix.

---

### 2.2 User Interaction Calls (SCR-CR-001)

These calls are triggered only when the user performs a specific action on the dashboard.

---

#### Interaction 1: Cancel Booking Request

**Trigger**: USER ACTION — "Cancel Request" button on a pending request card
**Flow**:
1. User clicks "Cancel Request"
2. A confirmation modal appears (client-side only, no API call)
3. User clicks "Confirm Cancellation" in the modal
4. API call fires

**Endpoint**: `PUT /bookings/:id/cancel`
**Auth**: Bearer JWT
**Path Param**: `:id` = the booking ID from the pending request card
**Request Body**:
```json
{
  "reason": "no_longer_needed"
}
```

**On Success (200)**:
- Remove the cancelled booking card from `section-pending-requests`
- Show toast: "Booking request cancelled"
- If no pending requests remain, display empty state

**On Error**:
- 404: Booking not found (stale state) — refresh the pending requests section
- 403: Not authorised (should not happen — session issue) — redirect to login

**Notes**: The refund policy does not apply to `requested` status bookings (payment was only authorised, not captured). The API releases the authorisation automatically on cancel.

---

#### Interaction 2: WebSocket — Booking Status Change

**Trigger**: REAL-TIME — `booking_status_changed` WebSocket event

**WebSocket Event**:
```json
{
  "event": "booking_status_changed",
  "data": {
    "bookingId": "uuid",
    "oldStatus": "requested",
    "newStatus": "accepted",
    "timestamp": "2026-02-06T10:30:00Z"
  }
}
```

**Screen Elements Updated**:
- If `newStatus === 'accepted'`: Move the booking card from `section-pending-requests` to `section-upcoming-bookings`
- If `newStatus === 'declined'` or `newStatus === 'expired'`: Remove the card from `section-pending-requests`
- Update the unread badge if the status change was accompanied by a new message

**Notes**: The client should not need to refetch after receiving this event if the card data from the initial page load is still in client state. However, if the card is to be displayed in "Upcoming Bookings", the client should fetch `GET /bookings/:id` to get the full booking record (including contact details and conversation ID).

---

#### Interaction 3: WebSocket — New Message Notification

**Trigger**: REAL-TIME — `new_message` WebSocket event

**Screen Elements Updated**:
- Navigation header "Messages" badge count incremented by 1
- Quick Actions "Messages" card badge incremented by 1

**No API call required**: Badge update is driven purely by the WebSocket event.

---

### 2.3 Care Receiver Dashboard — Call Summary Table

| # | Endpoint | Method | Trigger | Section Populated |
|---|----------|--------|---------|-------------------|
| 1 | `/users/me` | GET | Page load | Page header (first name), nav header |
| 2 | `/payments/methods` | GET | Page load | Account status banner (conditional) |
| 3 | `/care-receivers/me/bookings?status=requested` | GET | Page load | Pending Requests widget |
| 4 | `/care-receivers/me/bookings?status=accepted,in_progress` | GET | Page load | Upcoming Bookings widget |
| 5 | `/care-receivers/me/bookings?status=completed,payment_released` | GET | Page load | Recent Activity widget |
| 6 | `/conversations` | GET | Page load | Messages unread badge |
| 7 | `/bookings/:id/cancel` | PUT | User action (Cancel Request) | Removes card from Pending Requests |
| — | WebSocket `booking_status_changed` | WS | Real-time | Moves card between sections |
| — | WebSocket `new_message` | WS | Real-time | Updates Messages badge count |

**Total page-load calls**: 6
**Total potential user-action calls**: 1 (per pending request card, per cancellation)

---

## 3. SCR-CG-001: Caregiver Dashboard

**Route**: `/caregiver/dashboard`
**Role**: Caregiver
**Screen JSON**: `docs/tiers/tier1/figma/screens/dashboard-caregiver.json`
**Wireframe**: `docs/tiers/tier1/draft-design-specs/wireframes/dashboards/cg-dashboard-scr-cg-001.md`

### 3.1 Page Load Calls

---

#### Call 1: Current User Profile

**Trigger**: PAGE LOAD
**Endpoint**: `GET /users/me`
**Auth**: Bearer JWT

**Screen Elements Populated**:
- `section-page-header` — "Welcome back, [First Name]!" greeting uses `data.firstName`
- Navigation header avatar and name

**Response Fields Used**:
```
data.firstName       → greeting
data.accountStatus   → if suspended/banned, redirect or show banner
```

---

#### Call 2: Caregiver Profile and Verification Status

**Trigger**: PAGE LOAD
**Endpoint**: `GET /verification/status`
**Auth**: Bearer JWT

**Screen Elements Populated**:
- `widget-profile-status` (right sidebar) — the entire profile status card
  - Verification badges: Identity, Right to Work, DBS
  - `profile-visibility-toggle` — active/inactive toggle (`data.profileVisibleInSearch`)
  - `profile-completion-bar` — relies on this data to know which verifications are complete

**Response Fields Used**:
```
data.identity.verified           → "Identity Verified" badge (green) or "Pending" (grey)
data.rightToWork.verified        → "Right to Work Verified" badge
data.dbs.verified                → "DBS Verified" badge (optional)
data.profileApproved             → is the overall profile approved by admin
data.profileVisibleInSearch      → current state of the visibility toggle
```

**Notes**: The profile completion percentage shown in `profile-completion-bar` is a composite calculation that also depends on whether the caregiver has set their rate, bio, availability, and bank account. The `GET /verification/status` provides only the verification portion. See GAP-CG-001.

---

#### Call 3: Caregiver Own Profile (for Completion Percentage)

**Trigger**: PAGE LOAD
**Endpoint**: `GET /caregivers/me` (implied — the "me" alias for the caregiver's own profile)
**Auth**: Bearer JWT

**Screen Elements Populated**:
- `profile-completion-bar` — completion percentage (e.g., "85% complete")
- `profile-completion-checklist` — which items are done and which are missing
- Alert banner (if profile completion < 100%)

**Response Fields Used**:
```
data.bio              → truthy/falsy: "Bio written" checklist item
data.hourlyRate       → "Hourly rate set" checklist item
data.servicesOffered  → "Services selected" checklist item
data.hasVehicle       → optional field
data.profilePhotoUrl  → "Profile photo" checklist item
```

**GAP-CG-001**: There is no `GET /caregivers/me` endpoint defined in the API specification. The spec defines `PUT /caregivers/me` (update), `GET /caregivers/:id` (public view), and `GET /caregivers` (search), but no self-view endpoint that returns the logged-in caregiver's own profile data including completion status. The profile completion percentage cannot be computed without this. See Section 6.

**GAP-CG-002**: Neither `GET /caregivers/me` nor `GET /verification/status` returns a computed `profileCompletionPercentage` or a `completionChecklist` structure. The client must derive this by combining data from both calls and applying business rules (which items are required vs optional, what weight each item contributes). This logic should live in the API to avoid client-side business rule duplication. See Section 6.

---

#### Call 4: Pending Booking Requests

**Trigger**: PAGE LOAD
**Endpoint**: `GET /caregivers/me/bookings`
**Auth**: Bearer JWT
**Query Parameters**: `status=requested&limit=3&page=1&sort=responseDeadline_asc`

**Screen Elements Populated**:
- `widget-pending-requests` (left column, priority 1)
  - If results: renders up to 3 `booking-request-card` components sorted by earliest deadline (most urgent first)
  - If empty: renders `empty-state`
- `section-alert-banner` — shown if `pagination.totalCount > 1` (multiple pending requests need urgent attention)
- Badge count on widget header (e.g., "(2)")

**Response Fields Used Per Card**:
```
data.bookings[n].id                  → "View Details" link: /caregiver/bookings/:id
data.bookings[n].careReceiverName    → "Margaret S."
data.bookings[n].careReceiverPhoto   → care receiver photo (if available)
data.bookings[n].bookingDate         → "Tuesday 10 Feb"
data.bookings[n].startTime           → "2-5pm"
data.bookings[n].durationHours       → "3 hours"
data.bookings[n].serviceTypes        → icon + label
data.bookings[n].location            → postcode for distance calculation
data.bookings[n].distance            → "2.3 miles" (pre-computed by server)
data.bookings[n].specialRequests     → truncated preview text
data.bookings[n].totalEarnings       → "£51.00 (after commission)"
data.bookings[n].requestedAt         → used to compute hoursRemaining client-side
data.bookings[n].responseDeadline    → countdown timer target
pagination.totalCount                → drives badge count and alert banner condition
```

**Notes**: Cards are sorted ascending by `responseDeadline` so the most urgent (closest to expiry) appears first. Urgency colour coding is applied client-side from `hoursRemaining`:
- Green: > 6 hours
- Yellow: 2–6 hours
- Red: < 2 hours

---

#### Call 5: Upcoming Confirmed Bookings

**Trigger**: PAGE LOAD
**Endpoint**: `GET /caregivers/me/bookings`
**Auth**: Bearer JWT
**Query Parameters**: `status=accepted&startDate={today}&endDate={today+7days}&limit=3&page=1&sort=startTime_asc`

**Screen Elements Populated**:
- `widget-upcoming-bookings` (left column, priority 2)
  - If results: renders up to 3 `booking-card` components, with the soonest highlighted as "NEXT UP"
  - If empty: renders `empty-state`
- Badge count on widget header

**Response Fields Used Per Card**:
```
data.bookings[n].id                → "View Details" link
data.bookings[n].careReceiverName  → "Margaret S."
data.bookings[n].careReceiverPhoto → photo
data.bookings[n].bookingDate       → date label
data.bookings[n].startTime         → start time
data.bookings[n].durationHours     → duration
data.bookings[n].serviceTypes      → services
data.bookings[n].location          → postcode
data.bookings[n].distance          → distance in miles
data.bookings[n].status            → "accepted" (drives badge: "Confirmed", "Starting Soon", or "Today")
pagination.totalCount              → badge count
```

**Notes**: Timing badge logic is client-side:
- `startTime` is today → "Today" (green badge)
- `startTime` is within 24 hours → "Starting Soon" (orange badge)
- `startTime` is > 24 hours → "In N days" (blue "Confirmed" badge)

---

#### Call 6: Earnings Summary

**Trigger**: PAGE LOAD
**Endpoint**: `GET /caregivers/me/earnings`
**Auth**: Bearer JWT

**Screen Elements Populated**:
- `widget-earnings-summary` (left column, priority 3)
  - "This Month" metric: `data.summary.thisMonth`
  - "Pending Payouts" metric: `data.summary.pending`
  - "2 bookings awaiting completion" subtext: count from `data.pendingPayouts`

**Response Fields Used**:
```
data.summary.thisMonth            → "£450.00" (primary large metric)
data.summary.pending              → "£120.00" (pending payouts metric)
data.pendingPayouts.length        → "N bookings awaiting completion"
```

**GAP-CG-003**: The `GET /caregivers/me/earnings` response includes `data.summary.totalEarnings`, `data.summary.thisMonth`, `data.summary.pending`, and `data.summary.paid`, but does not include a "last month" total or a month-over-month trend figure. The wireframe shows "+£120 from last month" as a motivational trend indicator. Without a `lastMonth` field in the summary, this cannot be displayed. See Section 6.

---

#### Call 7: Unread Message / Notification Count

**Trigger**: PAGE LOAD (then maintained by WebSocket)
**Endpoint**: `GET /conversations`
**Auth**: Bearer JWT
**Query Parameters**: `page=1&limit=1`

**Screen Elements Populated**:
- Navigation header notifications bell badge count
- Drives whether the notifications icon shows a badge

**Response Fields Used**:
```
data.conversations[n].unreadCount → summed across all conversations for total badge
```

**Notes**: Same approach as SCR-CR-001. See GAP-CR-004 in Section 5 for the shared gap.

---

### 3.2 User Interaction Calls (SCR-CG-001)

---

#### Interaction 1: Profile Visibility Toggle

**Trigger**: USER ACTION — toggling the "Profile Visibility" switch in `widget-profile-status`

**Endpoint**: `PUT /caregivers/me`
**Auth**: Bearer JWT
**Request Body**:
```json
{
  "profileVisible": true
}
```

**GAP-CG-004**: The `PUT /caregivers/me` request body in the API spec does not include a `profileVisible` or `isSearchable` field. The spec's request body only covers `bio`, `servicesOffered`, `hourlyRate`, `languagesSpoken`, `hasVehicle`, and `serviceRadiusMiles`. The visibility toggle is a core dashboard interaction on this screen and needs an explicit field in the PATCH body. See Section 6.

**Business Rule**: The toggle cannot be switched to Active if:
- `profileCompletionPercentage < 100%`
- `data.profileApproved !== true` (admin has not approved the profile)

Client should enforce this with a tooltip on the disabled toggle. The API must also enforce it server-side and return a `422` with `PROFILE_INCOMPLETE` or `PROFILE_NOT_APPROVED` error code if the client tries to activate anyway.

**On Success (200)**:
- Update toggle state visually
- If toggled to Active: show brief confirmation toast "Your profile is now visible in search results"
- If toggled to Inactive: show "Your profile is now hidden from search results"

---

#### Interaction 2: WebSocket — Incoming Booking Request

**Trigger**: REAL-TIME — `booking_status_changed` WebSocket event where `newStatus === 'requested'`

**Screen Elements Updated**:
- A new booking request card is prepended to `widget-pending-requests`
- The `section-alert-banner` appears or its count updates
- Navigation notifications bell badge increments

**Follow-up call required**: When a new `requested` booking event arrives via WebSocket, the client must fetch the full booking record to display the card:

**Endpoint**: `GET /bookings/:id`
**Auth**: Bearer JWT

This provides the full care receiver name, date, time, services, location, earnings figure, and special requests needed to render the card.

---

#### Interaction 3: WebSocket — New Message

**Trigger**: REAL-TIME — `new_message` WebSocket event

**Screen Elements Updated**:
- Navigation header notifications bell badge incremented
- No change to booking widgets

---

### 3.3 Caregiver Dashboard — Call Summary Table

| # | Endpoint | Method | Trigger | Section Populated |
|---|----------|--------|---------|-------------------|
| 1 | `/users/me` | GET | Page load | Page header greeting, nav header |
| 2 | `/verification/status` | GET | Page load | Profile status sidebar (badges, toggle state) |
| 3 | `/caregivers/me` (**GAP**) | GET | Page load | Profile completion bar, completion checklist |
| 4 | `/caregivers/me/bookings?status=requested` | GET | Page load | Pending Requests widget |
| 5 | `/caregivers/me/bookings?status=accepted` | GET | Page load | Upcoming Bookings widget |
| 6 | `/caregivers/me/earnings` | GET | Page load | Earnings Summary widget |
| 7 | `/conversations` | GET | Page load | Notifications badge |
| 8 | `/caregivers/me` (**GAP — missing field**) | PUT | User action (visibility toggle) | Profile visibility toggle |
| 9 | `/bookings/:id` | GET | Real-time (new WS event) | New pending request card |
| — | WebSocket `booking_status_changed` | WS | Real-time | Pending/upcoming widget updates |
| — | WebSocket `new_message` | WS | Real-time | Notifications badge |

**Total page-load calls**: 7 (6 if `GET /caregivers/me` is merged with an existing endpoint)
**Total potential user-action calls**: 1 per toggle interaction + 1 per incoming booking (WS follow-up)

---

## 4. SCR-ADM-001: Admin Dashboard

**Route**: `/admin`
**Role**: Admin (Operations Manager, Safeguarding Officer, Super Admin)
**Screen JSON**: `docs/tiers/tier1/figma/screens/dashboard-admin.json`
**Wireframe**: `docs/tiers/tier1/draft-design-specs/wireframes/dashboards/adm-dashboard-scr-adm-001.md`

**Note**: The admin dashboard is designed to be viewed multiple times daily on desktop. It is the most data-dense of the three dashboards and requires the most API calls.

### 4.1 Page Load Calls

---

#### Call 1: Current Admin User

**Trigger**: PAGE LOAD
**Endpoint**: `GET /users/me`
**Auth**: Bearer JWT (admin role)

**Screen Elements Populated**:
- `section-admin-header` — admin name, role badge ("Operations Manager"), avatar
- Drives role-based access control for which admin actions are visible

**Response Fields Used**:
```
data.firstName        → "Admin Sarah" display name
data.lastName         → surname for full display
data.userType         → must be "admin" (else redirect)
data.role             → admin sub-role (operations_manager | safeguarding_officer | super_admin)
```

**Notes**: A 401 response must redirect to the admin login screen. A non-admin `userType` must redirect to the appropriate user dashboard.

---

#### Call 2: Admin Dashboard Summary (Urgent Alerts + Platform Metrics)

**Trigger**: PAGE LOAD
**Endpoint**: **GAP-ADM-001** — No single summary endpoint exists

The admin dashboard wireframe's own Appendix B documents a proposed `GET /api/admin/dashboard/summary` endpoint that would return all dashboard data in one call. This endpoint does not appear in the formal API specification (`docs/technical/api-specification-tier1.md`).

The data required for the admin dashboard must currently be assembled from multiple separate calls:

---

#### Call 2a: Verification Queue Summary

**Trigger**: PAGE LOAD
**Endpoint**: `GET /admin/verifications`
**Auth**: Bearer JWT (admin)
**Query Parameters**: `status=pending&page=1&limit=1`

**Screen Elements Populated**:
- `widget-verification-queue` (left column, priority 1)
  - Total pending count: `pagination.totalCount`
  - SLA breach count: count of items where `data.verifications[n].slaBreached === true`

**Full breakdown call also required**:

**Endpoint**: `GET /admin/verifications`
**Query Parameters**: `status=pending&type=identity&page=1&limit=1` → for identity count
**Query Parameters**: `status=pending&type=right_to_work&page=1&limit=1` → for right to work count
**Query Parameters**: `status=pending&type=dbs&page=1&limit=1` → for DBS count
**Query Parameters**: `status=pending&overdue=true&page=1&limit=1` → for SLA breach count

**GAP-ADM-001**: This breakdown requires 4 separate calls to `GET /admin/verifications` with different `type` and `overdue` parameters, each returning only the `pagination.totalCount`. This is inefficient for a dashboard widget that needs a summary. The `GET /admin/verifications` response does not include aggregated counts by type. A summary endpoint should consolidate this. See Section 6.

**Response Fields Used**:
```
pagination.totalCount                → "12 caregivers" total pending
(call with type=identity)           → "8 pending" identity count
(call with type=right_to_work)      → "4 pending" right-to-work count
(call with type=dbs)                → "3 pending" DBS count
(call with overdue=true)            → "3 over 48h SLA" SLA breach count
data.verifications (average calc)   → average wait time (computed client-side from submittedAt fields)
```

**Urgent Alert Banner**: If the SLA breach count > 0, the `section-urgent-alert-banner` renders in its "sla-breach" variant. The alert data (banner title, description, CTA URL) is constructed client-side from the count.

---

#### Call 2b: Safeguarding Reports Summary

**Trigger**: PAGE LOAD
**Endpoint**: `GET /admin/safeguarding`
**Auth**: Bearer JWT (admin)
**Query Parameters**: `status=open,investigating&page=1&limit=25`

**Screen Elements Populated**:
- `widget-safeguarding-reports` (left column, priority 2)
  - Active reports count: `pagination.totalCount`
  - Urgent reports count: count of items where `data.reports[n].severity === 'high'` or `'critical'`
  - Recent activity timeline: last 3 resolved/updated reports (requires a second call — see below)

**Urgent Alert Banner**: If any report has `severity === 'high'` or `'critical'` AND was submitted within the last 60 minutes, the `section-urgent-alert-banner` renders in "safeguarding-urgent" variant with the specific report ID and time-ago text.

**Response Fields Used**:
```
data.reports[n].id            → alert banner CTA URL: /admin/safeguarding/:id
data.reports[n].severity      → "high"/"critical" drives urgent indicator
data.reports[n].reportedAt    → "35 minutes ago" time-ago calculation
data.reports[n].status        → "open"/"investigating"
pagination.totalCount         → "2 cases" total active count
```

**Safeguarding recent activity timeline call**:

**Endpoint**: `GET /admin/safeguarding`
**Query Parameters**: `status=resolved&limit=3&page=1&sort=resolvedAt_desc`

**Response Fields Used for Timeline**:
```
data.reports[n].id            → "#SR-00421"
data.reports[n].resolvedAt    → "Feb 6"
data.reports[n].outcome       → "resolved (no action)", "escalated to SAB", "resolved (user suspended)"
```

**GAP-ADM-002**: The `GET /admin/safeguarding` response schema in the API spec does not include an `outcome` field. Resolved reports need an outcome recorded (e.g., `no_action`, `escalated`, `user_suspended`) to populate the recent activity timeline in the widget. See Section 6.

---

#### Call 2c: Platform Health Metrics

**Trigger**: PAGE LOAD
**Endpoint**: **GAP-ADM-003** — No platform health metrics endpoint exists

The `widget-platform-health` (right sidebar) requires:
- Active bookings count (status: accepted + in_progress)
- Bookings created this week + trend vs last week
- Active caregivers count (verified + profile approved)
- Pending caregivers count (verification pending)
- Active care receivers count (registered + at least one payment method)
- Care receivers with payment method count
- System uptime percentage

None of these aggregated metrics have a dedicated endpoint. They would require multiple calls to existing endpoints:

| Metric | Approximate Endpoint |
|--------|---------------------|
| Active bookings | `GET /admin/bookings?status=accepted,in_progress&page=1&limit=1` → `pagination.totalCount` |
| Bookings this week | `GET /admin/bookings?startDate={weekStart}&endDate={weekEnd}&page=1&limit=1` → `pagination.totalCount` |
| Active caregivers | `GET /admin/users?userType=caregiver&status=active&page=1&limit=1` → `pagination.totalCount` |
| Pending caregivers | `GET /admin/users?userType=caregiver&status=pending_verification&page=1&limit=1` → `pagination.totalCount` |
| Active care receivers | `GET /admin/users?userType=care_receiver&status=active&page=1&limit=1` → `pagination.totalCount` |
| System uptime | No endpoint — external monitoring (AWS CloudWatch) |

This is 5+ additional API calls solely for the platform health sidebar widget. The admin dashboard spec's Appendix B documents a consolidated `GET /api/admin/dashboard/summary` endpoint as the correct solution. See Section 6.

---

#### Call 2d: User Activity Summary (This Week)

**Trigger**: PAGE LOAD
**Endpoint**: **GAP-ADM-004** — No user activity summary endpoint exists

The `widget-platform-health` sidebar (and the tablet layout's "User Activity" section) requires:
- New caregiver registrations this week + trend vs last week
- New care receiver registrations this week + trend vs last week
- Total bookings created this week
- Conversion rate: users with at least 1 booking / total registrations

The admin wireframe documents a proposed `GET /api/admin/users/activity?period=week` endpoint. This does not exist in the API specification. See Section 6.

---

#### Call 3: Recent Activity Feed

**Trigger**: PAGE LOAD
**Endpoint**: **GAP-ADM-005** — No admin activity feed endpoint exists

The `widget-recent-activity` (left column, priority 3) shows a chronological feed of up to 10 system events from the last 24 hours:
- Verification approvals and rejections (by admin)
- Bookings completed
- Disputes raised and resolved
- Safeguarding reports created

The wireframe documents a proposed `GET /api/admin/activity?hours=24&limit=10` endpoint. This does not appear in the API specification.

**What can be partially assembled from existing endpoints**:
- Verification events: could be inferred from `GET /admin/verifications?status=approved,rejected` sorted by updated time
- Booking events: `GET /admin/bookings` sorted by updated time
- Safeguarding events: `GET /admin/safeguarding` sorted by created/updated time

However, assembling a unified chronological activity feed from three separate endpoints with independent pagination is not practical at the client level. An audit log or activity feed endpoint is the correct solution.

**Filter dropdown** on the widget (All / My actions / Verifications / Bookings / Safeguarding) requires server-side filtering capability that no existing endpoint provides.

---

#### Call 4: Admin Unread Notifications

**Trigger**: PAGE LOAD
**Endpoint**: **GAP-ADM-006** — No admin notifications endpoint exists

The `section-admin-header` shows a notifications bell with a count badge (e.g., "(3)"). This is distinct from messaging unread counts. Admin notifications include:
- New safeguarding reports submitted
- Verification SLA breaches
- Disputes raised requiring admin review

No notifications endpoint exists in the API specification. See Section 6.

---

### 4.2 User Interaction Calls (SCR-ADM-001)

---

#### Interaction 1: Review Queue Button

**Trigger**: USER ACTION — "Review Queue" button in `widget-verification-queue`
**Action**: Client-side navigation to `/admin/verifications` (SCR-ADM-002)
**API call**: None on the dashboard — the navigation to the verification queue screen triggers its own page-load calls there.

---

#### Interaction 2: View Reports Button

**Trigger**: USER ACTION — "View Reports" button in `widget-safeguarding-reports`
**Action**: Client-side navigation to `/admin/safeguarding`
**API call**: None on the dashboard.

---

#### Interaction 3: Review Next Verification (Quick Action)

**Trigger**: USER ACTION — "Review Next Verification" button in `widget-quick-actions`
**Endpoint**: `GET /admin/verifications`
**Auth**: Bearer JWT (admin)
**Query Parameters**: `status=pending&sort=submittedAt_asc&limit=1&page=1`

**Action**: Navigate to `/admin/verifications/:id` using the first item's ID from the response.

**GAP-ADM-007**: There is no `GET /admin/verifications/next` shortcut endpoint. The quick action button is expected to open the "next" (oldest pending) verification directly. This currently requires a full list call to find the oldest item. A dedicated `/admin/verifications/next` endpoint would make this atomic and more efficient. The dashboard JSON sample data references `/admin/verifications/next` as the quick action URL.

---

#### Interaction 4: Activity Feed Filter

**Trigger**: USER ACTION — changing the filter dropdown in `widget-recent-activity`
**Options**: All / My actions only / Verifications only / Bookings only / Safeguarding only
**Endpoint**: **GAP-ADM-005** (same gap as Call 3 above — no activity feed endpoint)

---

#### Interaction 5: Alert Banner "Review Now" CTA

**Trigger**: USER ACTION — clicking "Review Report Now" in `section-urgent-alert-banner`
**Action**: Client-side navigation to `/admin/safeguarding/:reportId`
**API call**: None on the dashboard (navigation triggers page-load calls on the destination screen).

---

#### Interaction 6: Alert Banner Dismiss

**Trigger**: USER ACTION — clicking the X button on `section-urgent-alert-banner`
**Action**: Hides the banner for this session (client-side state only)
**API call**: None. The alert will reappear on next page load if the condition still exists.

**Note**: A more robust implementation would POST to a notifications endpoint to mark the alert as "acknowledged". This requires the notifications endpoint from GAP-ADM-006.

---

#### Interaction 7: Global Search

**Trigger**: USER ACTION — typing in the admin header search bar
**Endpoint**: **GAP-ADM-008** — No unified search endpoint exists

The header search field (`hasSearch: true` in the screen JSON) shows real-time suggestions for users, bookings, and verifications. No unified search endpoint exists in the API specification.

**Workaround using existing endpoints** (slower, multiple calls):
- `GET /admin/users?search={query}` → user results
- `GET /admin/bookings?search={query}` → booking results
- `GET /admin/verifications` does not have a `search` parameter in the spec

---

### 4.3 Admin Dashboard — Call Summary Table

| # | Endpoint | Method | Trigger | Section Populated |
|---|----------|--------|---------|-------------------|
| 1 | `/users/me` | GET | Page load | Admin header (name, role) |
| 2a | `/admin/verifications?status=pending` (×4 calls) | GET | Page load | Verification Queue widget |
| 2b | `/admin/safeguarding?status=open,investigating` | GET | Page load | Safeguarding Reports widget |
| 2b-2 | `/admin/safeguarding?status=resolved&limit=3` | GET | Page load | Safeguarding timeline |
| 2c | `/admin/bookings?status=accepted,in_progress` (**GAP**) | GET | Page load | Platform Health — active bookings |
| 2c | `/admin/users?userType=caregiver` (**GAP**) | GET | Page load | Platform Health — caregiver counts |
| 2c | `/admin/users?userType=care_receiver` (**GAP**) | GET | Page load | Platform Health — care receiver counts |
| 2d | *(no endpoint)* | — | Page load | **GAP** — User Activity Summary widget |
| 3 | *(no endpoint)* | — | Page load | **GAP** — Recent Activity feed |
| 4 | *(no endpoint)* | — | Page load | **GAP** — Notifications bell count |
| 5 | `/admin/verifications?status=pending&limit=1` | GET | User action (Review Next) | Navigation to oldest pending verification |
| — | WebSocket `booking_status_changed` | WS | Real-time | Could refresh platform health counts |

**Total page-load calls with current API**: 8–10 separate calls (inefficient)
**Total page-load calls with proposed summary endpoint**: 2 calls (`/users/me` + `/admin/dashboard/summary`)

---

## 5. Gap Summary

| Gap ID | Screen | Description | Priority |
|--------|--------|-------------|----------|
| **GAP-CR-001** | SCR-CR-001 | `GET /care-receivers/me/bookings` response does not include `conversationId`. "Message Caregiver" button on upcoming booking cards cannot link to the correct message thread. | HIGH |
| **GAP-CR-002** | SCR-CR-001 | No `hasReview` / `reviewId` field on booking records. Recent Activity section cannot filter out bookings where a review already exists without multiple calls. | MEDIUM |
| **GAP-CR-003** | SCR-CR-001 | No `completedAfter` date filter parameter on `GET /care-receivers/me/bookings`. Recent Activity is supposed to show last-7-days activity only. | LOW |
| **GAP-CR-004** | SCR-CR-001, SCR-CG-001 | No `/conversations/unread-count` or equivalent. Getting the total unread message badge requires fetching the full conversation list and summing client-side. | LOW |
| **GAP-CG-001** | SCR-CG-001 | No `GET /caregivers/me` (self-view) endpoint. The caregiver cannot fetch their own profile data (bio, hourlyRate, servicesOffered, profilePhotoUrl) for the completion checklist without a public profile endpoint that exposes all fields including internal ones. | HIGH |
| **GAP-CG-002** | SCR-CG-001 | No `profileCompletionPercentage` or `completionChecklist` in any API response. Must be computed client-side from two calls, duplicating business logic. | MEDIUM |
| **GAP-CG-003** | SCR-CG-001 | `GET /caregivers/me/earnings` does not include `lastMonth` total. The motivational trend indicator "+£N from last month" cannot be displayed. | LOW |
| **GAP-CG-004** | SCR-CG-001 | `PUT /caregivers/me` request body does not include a `profileVisible` field. The profile visibility toggle cannot be saved. | HIGH |
| **GAP-ADM-001** | SCR-ADM-001 | No `/admin/verifications/summary` or aggregated summary endpoint. Verification queue widget requires 4 separate calls. | HIGH |
| **GAP-ADM-002** | SCR-ADM-001 | `GET /admin/safeguarding` response does not include an `outcome` field on resolved reports. The recent activity timeline in the safeguarding widget cannot show resolution outcomes. | MEDIUM |
| **GAP-ADM-003** | SCR-ADM-001 | No platform health metrics endpoint. The Platform Health sidebar widget requires 5+ separate calls to existing endpoints for counts only. | HIGH |
| **GAP-ADM-004** | SCR-ADM-001 | No user activity summary endpoint (`GET /admin/users/activity`). The User Activity section (this week's registrations and conversion rate) has no data source. | HIGH |
| **GAP-ADM-005** | SCR-ADM-001 | No admin activity feed endpoint (`GET /admin/activity`). The Recent Activity feed with filter support cannot be built from existing endpoints. | HIGH |
| **GAP-ADM-006** | SCR-ADM-001 | No admin notifications endpoint. The notifications bell count in the admin header has no data source. | MEDIUM |
| **GAP-ADM-007** | SCR-ADM-001 | No `GET /admin/verifications/next` shortcut. "Review Next Verification" quick action requires a full list call to find the oldest item. | LOW |
| **GAP-ADM-008** | SCR-ADM-001 | No unified admin search endpoint. The admin header search bar has no backend to query for cross-entity results. | MEDIUM |

---

## 6. Recommended API Additions

The following additions to `docs/technical/api-specification-tier1.md` are recommended to close the gaps identified above. These are listed in priority order.

---

### 6.1 HIGH PRIORITY (Required for Dashboard to Function)

#### ADD-1: GET /caregivers/me (Caregiver Self-View)

Closes: GAP-CG-001, GAP-CG-002

**Endpoint**: `GET /caregivers/me`
**Access**: Authenticated (Caregiver)
**Purpose**: Returns the caregiver's own full profile including fields not visible on the public profile (internal status, payout details), plus a computed completion checklist.

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "firstName": "Sarah",
    "bio": "...",
    "profilePhotoUrl": "...",
    "hourlyRate": 20.00,
    "servicesOffered": ["companionship", "light_housework"],
    "languagesSpoken": ["english"],
    "hasVehicle": true,
    "serviceRadiusMiles": 15,
    "postcode": "SW1A",
    "profileVisible": true,
    "profileApproved": true,
    "profileCompletionPercentage": 85,
    "completionChecklist": [
      { "item": "profile_photo", "label": "Profile Photo", "completed": true, "required": true },
      { "item": "bio", "label": "Bio (min 100 characters)", "completed": true, "required": true },
      { "item": "services", "label": "Services selected", "completed": true, "required": true },
      { "item": "hourly_rate", "label": "Hourly Rate", "completed": true, "required": true },
      { "item": "availability", "label": "Availability", "completed": false, "required": true, "actionUrl": "/caregiver/availability" },
      { "item": "bank_account", "label": "Bank Account (Stripe Connect)", "completed": true, "required": true },
      { "item": "identity_verified", "label": "Identity Verified", "completed": true, "required": true },
      { "item": "right_to_work_verified", "label": "Right to Work Verified", "completed": true, "required": true },
      { "item": "dbs_uploaded", "label": "DBS Certificate (optional)", "completed": false, "required": false, "actionUrl": "/caregiver/verify/dbs" }
    ]
  }
}
```

---

#### ADD-2: Add `profileVisible` to PUT /caregivers/me

Closes: GAP-CG-004

Add `profileVisible: boolean` to the request body of `PUT /caregivers/me`.

**Server-side validation**: Return `422` with error code `PROFILE_NOT_READY` if `profileVisible: true` is requested but `profileCompletionPercentage < 100` or `profileApproved !== true`.

---

#### ADD-3: Add `conversationId` to Booking Responses

Closes: GAP-CR-001

Add `conversationId: string | null` to the booking object returned by:
- `GET /care-receivers/me/bookings`
- `GET /caregivers/me/bookings`
- `GET /bookings/:id`

`conversationId` is null until the booking is accepted (before acceptance, no conversation thread exists).

---

#### ADD-4: Add `hasReview` to Booking Responses

Closes: GAP-CR-002

Add `hasReview: boolean` to the booking object in the list responses. This allows the Recent Activity section to filter out completed bookings that have already been reviewed without additional calls.

---

#### ADD-5: GET /admin/dashboard/summary

Closes: GAP-ADM-001, GAP-ADM-003, GAP-ADM-004

**Endpoint**: `GET /admin/dashboard/summary`
**Access**: Admin
**Purpose**: Single aggregated endpoint for the admin dashboard. Consolidates verification, safeguarding, platform health, and user activity data to reduce page-load API calls from 10+ to 2.

The response schema should match what is documented in Appendix B of `docs/tiers/tier1/draft-design-specs/wireframes/dashboards/adm-dashboard-scr-adm-001.md`.

---

#### ADD-6: GET /admin/activity

Closes: GAP-ADM-005

**Endpoint**: `GET /admin/activity`
**Access**: Admin
**Query Parameters**: `hours=24&limit=10&filter=all|my_actions|verifications|bookings|safeguarding`
**Purpose**: Unified chronological activity feed for the admin Recent Activity widget.

---

### 6.2 MEDIUM PRIORITY

#### ADD-7: Add `outcome` field to Safeguarding Response

Closes: GAP-ADM-002

Add `outcome: string | null` to the safeguarding report object in `GET /admin/safeguarding`. Values: `no_action`, `escalated_to_sab`, `user_warned`, `user_suspended`, `user_banned`, `referred_to_police`.

---

#### ADD-8: Add `lastMonth` to Earnings Response

Closes: GAP-CG-003

Add `lastMonth: number` to `data.summary` in `GET /caregivers/me/earnings`. This enables the month-over-month trend indicator on the dashboard.

---

#### ADD-9: GET /admin/notifications/count

Closes: GAP-ADM-006

**Endpoint**: `GET /admin/notifications/count`
**Access**: Admin
**Purpose**: Returns the count of unread admin notifications (new safeguarding reports, SLA breaches, disputes).

---

#### ADD-10: GET /admin/search

Closes: GAP-ADM-008

**Endpoint**: `GET /admin/search?q={query}`
**Access**: Admin
**Purpose**: Unified search across users, bookings, and verifications for the admin header search bar.

---

### 6.3 LOW PRIORITY

#### ADD-11: Add `completedAfter` to Bookings Endpoints

Closes: GAP-CR-003

Add `completedAfter: date` query parameter to `GET /care-receivers/me/bookings` to support date-range filtering for the Recent Activity section.

---

#### ADD-12: GET /conversations/unread-count

Closes: GAP-CR-004

**Endpoint**: `GET /conversations/unread-count`
**Access**: Authenticated
**Purpose**: Returns `{ "total": 2 }`. Avoids fetching the full conversation list to compute a badge count.

---

#### ADD-13: GET /admin/verifications/next

Closes: GAP-ADM-007

**Endpoint**: `GET /admin/verifications/next`
**Access**: Admin
**Purpose**: Returns the oldest pending verification record (redirect or the record itself). Powers the "Review Next Verification" quick action button.

---

*End of document*
