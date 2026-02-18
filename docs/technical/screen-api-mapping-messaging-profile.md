# Screen-to-API Mapping: Messaging, Review & Profile Screens

**Document Purpose**: Maps each screen to the specific API endpoints required to populate it, including page-load calls, user-interaction calls, and identified gaps where no endpoint currently exists.

**Document Owner**: Technical Architect
**Created**: 2026-02-18
**Status**: CANONICAL
**Tier**: Tier 1

**Source Documents**:
- Wireframes: `docs/tiers/tier1/draft-design-specs/wireframes/messaging/` and `review/`
- Screen JSONs: `docs/tiers/tier1/figma/screens/`
- API Specification: `docs/technical/api-specification-tier1.md`

**Related Document**: `docs/technical/screen-api-mapping-dashboards.md` (same format and conventions)

---

## Table of Contents

1. [How to Read This Document](#1-how-to-read-this-document)
2. [SCR-CR-012: Message Inbox](#2-scr-cr-012-message-inbox)
3. [SCR-CR-011: Message Thread](#3-scr-cr-011-message-thread)
4. [SCR-CR-015: Leave Review](#4-scr-cr-015-leave-review)
5. [SCR-CG-003: Caregiver Profile Edit](#5-scr-cg-003-caregiver-profile-edit)
6. [Gap Summary](#6-gap-summary)
7. [Recommended API Additions](#7-recommended-api-additions)

---

## 1. How to Read This Document

### Trigger Types

| Symbol | Meaning |
|--------|---------|
| **PAGE LOAD** | Called automatically when the screen first renders |
| **USER ACTION** | Called only when the user explicitly interacts (button click, filter, form submit) |
| **REAL-TIME** | Delivered by WebSocket connection, not a poll |

### Gap Flags

Sections marked **GAP** identify data the screen requires that has no matching endpoint in the current API specification. Each gap includes a recommended resolution in Section 7.

### Gap ID Sequence

This document continues the gap numbering from `screen-api-mapping-dashboards.md`. Gaps established in that document (GAP-CR-001 through GAP-ADM-008) are referenced where they apply to these screens. New gaps introduced in this document are numbered GAP-MSG-001 onwards.

### API Base Path

All endpoints below are relative to `{base}/api/v1`. Full base URLs:
- Production: `https://api.icare-app.co.uk/api/v1`
- Development: `http://localhost:3000/api/v1`

---

## 2. SCR-CR-012: Message Inbox

**Route**: `/messages`
**Role**: Care Receiver, Family Member, Caregiver (shared screen, role determines which conversations are shown)
**Screen JSON**: `docs/tiers/tier1/figma/screens/message-inbox.json`
**Wireframe**: No standalone wireframe markdown — specification lives in the screen JSON and the messaging feature spec

**Screen Description**: Centralised messaging inbox listing all conversations sorted by most recent message. Each row displays participant photo, name, booking context label, last message preview, timestamp, and an unread message badge.

### 2.1 Page Load Calls

The following calls must resolve before the conversation list renders. The navigation header renders immediately. The conversation list renders with skeleton states until calls complete.

---

#### Call 1: Current User Profile

**Trigger**: PAGE LOAD
**Endpoint**: `GET /users/me`
**Auth**: Bearer JWT

**Screen Elements Populated**:
- `nav` — navigation header `userName` and role badge
- `nav` — `notificationCount` badge requires a separate call (see Call 2)
- Drives which role variant of the navigation header to render

**Response Fields Used**:
```
data.firstName       → navigation header display name
data.userType        → determines nav variant (care-receiver or caregiver)
data.accountStatus   → if suspended, redirect to account status page
```

**Notes**: A 401 response must redirect to `/login?redirect=/messages`.

---

#### Call 2: Conversation List

**Trigger**: PAGE LOAD
**Endpoint**: `GET /conversations`
**Auth**: Bearer JWT
**Query Parameters**: `page=1&limit=25`

**Screen Elements Populated**:
- `conversation-list` — the full list of `conversation-row` components
  - If results: renders one row per conversation with all fields below
  - If empty array: renders the `no-messages` empty state ("You have no conversations yet")
- `toolbar` — the `tab-bar` counts for each tab (All, Unread, Booking-linked, Inquiries, Archived)
- `sort-bar` — "8 conversations" total count label (`pagination.totalCount`)
- `pagination` — current page / total pages controls

**Response Fields Used Per Conversation Row**:
```
data.conversations[n].id                      → click target for navigation to /messages/:id
data.conversations[n].otherParty.name         → participant name displayed on each row
data.conversations[n].otherParty.profilePhotoUrl → participant avatar
data.conversations[n].bookingId               → used to construct the thread type label (see GAP-MSG-001)
data.conversations[n].lastMessage.text        → message preview text (truncated at ~80 chars)
data.conversations[n].lastMessage.sentAt      → relative timestamp ("2 hours ago", "Yesterday")
data.conversations[n].lastMessage.senderName  → implicit — to determine if preview is "You: ..." or sender name
data.conversations[n].unreadCount             → drives the numeric unread badge on each row
pagination.totalCount                         → drives total conversations count label
```

**Notes**: The sort-by dropdown (Most Recent, Unread First, Upcoming Booking, Alphabetical) must be reflected in the query parameter `sort`. The screen JSON shows `sort=Most Recent` as the default. The API spec for `GET /conversations` does not currently include a `sort` parameter — see GAP-MSG-002.

**Tab Filtering**: The tab bar (All / Unread / Booking-linked / Inquiries / Archived) requires the ability to filter conversations by type. These tabs require additional query parameters on `GET /conversations` — see GAP-MSG-003.

**GAP-MSG-001**: The `GET /conversations` response includes `bookingId` but does not include a human-readable booking context label (e.g., "Booking #1042 — Confirmed for Thu 20 Feb"). The screen JSON `threadType` field requires both the booking reference number and the booking status. The client must call `GET /bookings/:id` for each conversation to resolve this, or the conversations endpoint must embed a `bookingContext` object. See Section 7.

**GAP-MSG-002**: The `GET /conversations` endpoint has no `sort` query parameter. The sort-by dropdown offers "Unread First" and "Upcoming Booking" sort modes that cannot be expressed with existing parameters.

**GAP-MSG-003**: The `GET /conversations` endpoint has no filter for conversation type (booking-linked vs pre-booking inquiry vs archived). The tab bar counts and filtered views cannot be populated without this.

---

#### Call 3: Unread Count (Navigation Badge)

**Trigger**: PAGE LOAD (then maintained by WebSocket)
**Endpoint**: `GET /conversations`
**Auth**: Bearer JWT
**Query Parameters**: `page=1&limit=25`

**Screen Elements Populated**:
- `nav` → `notificationCount` badge in the navigation header

**Response Fields Used**:
```
data.conversations[n].unreadCount → summed across all conversations = total badge number
```

**Notes**: This is the same call as Call 2 — the client sums `unreadCount` across all returned conversations after the list call resolves. This avoids a separate badge call at the cost of not being accurate if pagination is required (more than 25 conversations). This is the same shared gap documented as GAP-CR-004 in the dashboard mapping document.

---

### 2.2 User Interaction Calls (SCR-CR-012)

---

#### Interaction 1: Open Conversation

**Trigger**: USER ACTION — clicking a `conversation-row`
**Action**: Client-side navigation to `/messages/:conversationId`
**API call**: None on the inbox — the navigation to the message thread screen triggers its own page-load calls there.

---

#### Interaction 2: Sort Change

**Trigger**: USER ACTION — changing the sort-by dropdown
**Endpoint**: `GET /conversations`
**Auth**: Bearer JWT
**Query Parameters**: `page=1&limit=25&sort={sortMode}`

**GAP-MSG-002**: No `sort` parameter exists on `GET /conversations`. This interaction cannot be fulfilled without the API addition documented in Section 7.

---

#### Interaction 3: Tab Filter Change

**Trigger**: USER ACTION — clicking a tab (Unread / Booking-linked / Inquiries / Archived)
**Endpoint**: `GET /conversations`
**Auth**: Bearer JWT
**Query Parameters**: `page=1&limit=25&filter={tabType}`

**GAP-MSG-003**: No `filter` parameter exists on `GET /conversations`. This interaction cannot be fulfilled without the API addition documented in Section 7.

---

#### Interaction 4: Pagination

**Trigger**: USER ACTION — clicking a page navigation button
**Endpoint**: `GET /conversations`
**Auth**: Bearer JWT
**Query Parameters**: `page={n}&limit=25`

**On Success**: Replaces the conversation list with the results for the new page.

---

#### Interaction 5: WebSocket — New Message Updates Inbox Row

**Trigger**: REAL-TIME — `new_message` WebSocket event

**WebSocket Event**:
```json
{
  "event": "new_message",
  "data": {
    "conversationId": "uuid",
    "messageId": "uuid",
    "senderId": "uuid",
    "senderName": "Sarah M.",
    "text": "Looking forward to Tuesday!",
    "sentAt": "2026-02-06T10:30:00Z"
  }
}
```

**Screen Elements Updated**:
- The matching `conversation-row` moves to the top of the list (sort = Most Recent)
- `lastMessage.text` and `lastMessage.sentAt` on that row update
- `unreadCount` badge on that row increments by 1
- Navigation header `notificationCount` badge increments by 1

**Notes**: If the conversation is not currently in the visible page (paginated off-screen), the client may need to refetch the list. If the conversation is on screen, the update can be applied in-place without a network call.

---

### 2.3 Message Inbox — Call Summary Table

| # | Endpoint | Method | Trigger | Section Populated |
|---|----------|--------|---------|-------------------|
| 1 | `/users/me` | GET | Page load | Nav header (name, role) |
| 2 | `/conversations?page=1&limit=25` | GET | Page load | Conversation list, tab counts, sort-bar total |
| 3 | `/conversations` (same call) | GET | Page load | Nav header unread badge (summed from call 2) |
| 4 | `/conversations?sort=` (**GAP**) | GET | User action (sort change) | Reordered conversation list |
| 5 | `/conversations?filter=` (**GAP**) | GET | User action (tab change) | Filtered conversation list |
| 6 | `/conversations?page={n}` | GET | User action (pagination) | Next/previous page of conversations |
| — | WebSocket `new_message` | WS | Real-time | Updates row preview, unread badge, row position |

**Total page-load calls**: 2 (calls 1 and 2; call 3 reuses call 2 result)
**Total potential user-action calls**: 3 (sort, filter, pagination)

---

## 3. SCR-CR-011: Message Thread

**Route**: `/messages/:conversationId`
**Role**: Care Receiver, Family Member, Caregiver (both parties use this same route)
**Screen JSON**: `docs/tiers/tier1/figma/screens/message-thread.json`
**Wireframe**: `docs/tiers/tier1/draft-design-specs/wireframes/messaging/scr-cr-011-message-thread.md`

**Screen Description**: Individual conversation view. Displays participant info, booking context, paginated message history, contact-redaction alerts, system messages, typing indicator, and a fixed message input area with safeguarding report and block actions.

### 3.1 Page Load Calls

All three calls below must resolve before the thread is considered fully loaded. The conversation header and booking context render with skeleton states until their calls complete. The message input area renders immediately (textarea is interactive before message history loads).

---

#### Call 1: Current User Profile

**Trigger**: PAGE LOAD
**Endpoint**: `GET /users/me`
**Auth**: Bearer JWT

**Screen Elements Populated**:
- `section-header` — navigation header `userName` and role variant
- Provides the current user's ID (`data.id`) so the client knows which messages to right-align ("own") vs left-align ("other")

**Response Fields Used**:
```
data.id          → identifies which messages are "own" (right-aligned, blue bubble)
data.firstName   → navigation header display name
data.userType    → determines nav variant and which "View Booking Details" route to use
                   (care receiver: /bookings/:id, caregiver: /caregiver/bookings/:id)
```

---

#### Call 2: Conversation Metadata

**Trigger**: PAGE LOAD
**Endpoint**: **GAP-MSG-004** — No `GET /conversations/:id` endpoint exists

The conversation header (`section-conversation-header`) requires:
- Other participant's name, photo, role, online/offline status
- Verification badges (if the other party is a caregiver)
- Booking reference number, date, time, and current booking status
- The `bookingId` (to construct the "View Booking Details" link)

The current API provides:
- `GET /conversations` (list) — includes `otherParty.name`, `otherParty.profilePhotoUrl`, and `bookingId`
- `GET /conversations/:id/messages` — provides the message list only; does not return conversation metadata

There is no single-conversation metadata endpoint. The client must fetch either:
- The full conversation list and locate the matching entry, then separately call `GET /bookings/:id` using the `bookingId` to get booking status, date, and reference; or
- A new `GET /conversations/:id` endpoint (recommended).

**What is needed per section**:

For `participant-card` (left column of conversation header):
```
otherParty.name             → "Mary Thompson"
otherParty.profilePhotoUrl  → participant avatar (80px)
otherParty.role             → "Caregiver" or "Care Receiver" label
otherParty.isOnline         → "● Online" / "○ Offline" (see GAP-MSG-005)
otherParty.verificationBadges → identity and DBS badges (caregiver only)
```

For `booking-context-card` (right column of conversation header):
```
booking.id      → used in "View Booking Details →" link
booking.ref     → "Booking #12345"
booking.date    → "Wednesday, March 6 at 10:00 AM"
booking.status  → drives status badge ("Requested", "Accepted", "In Progress", "Completed")
```

The booking context data is available via `GET /bookings/:id` (the booking detail endpoint), which the client should call using the `bookingId` from the conversation list. This results in two calls at page load where one consolidated endpoint would suffice.

**Recommended workaround until GAP-MSG-004 is closed**: On page load, use `GET /conversations` (fetching only the current conversation by ID from the cached list if already loaded, otherwise fetching a small page) to get the `bookingId` and participant info, then call `GET /bookings/:id` for the full booking context.

---

#### Call 3: Message History

**Trigger**: PAGE LOAD
**Endpoint**: `GET /conversations/:id/messages`
**Auth**: Bearer JWT
**Path Param**: `:id` = `conversationId` from the URL
**Query Parameters**: `page=1&limit=50`

**Screen Elements Populated**:
- `section-messages` — the scrollable message list
  - If messages: renders `date-divider`, `message-bubble` (own/other/system), and `typing-indicator` components
  - If empty (`totalCount === 0`): renders the `empty-state` variant ("Start the conversation")

**Response Fields Used Per Message**:
```
data.messages[n].id             → keyed list identity
data.messages[n].senderId       → compared against data.id from Call 1 to determine own/other alignment
data.messages[n].senderName     → displayed below other-party bubbles
data.messages[n].text           → message body (may contain "[REDACTED]" if contact info was stripped)
data.messages[n].sentAt         → formatted timestamp ("Today at 2:30 PM", "Yesterday at 10:30 AM")
data.messages[n].readAt         → null = "✓ Sent", non-null = "✓✓ Read" on own messages
data.messages[n].isSystemMessage → true = yellow system bubble, no sender name
data.messages[n].isFlagged      → may drive a "under review" indicator (see GAP-MSG-006)
pagination.totalCount           → if > 50, infinite scroll upwards loads older messages
```

**Notes**:
- The API returns messages in ascending `sentAt` order. The screen renders newest at the bottom. The client scrolls to the bottom on initial load.
- If `pagination.totalPages > 1`, infinite scroll upward fires `GET /conversations/:id/messages?page={n+1}` to load older messages. The page loads the most recent page first (i.e., the last page by `sentAt`).
- Date dividers ("Today", "Yesterday", "[Date]") are computed client-side from `sentAt` timestamps.

**GAP-MSG-005**: The `GET /conversations/:id/messages` response (and any conversation metadata endpoint) does not include an `isOnline` or `lastActiveAt` field for the other participant. The participant card in the conversation header shows an online/offline indicator that requires this data. There is no online status endpoint in the current API specification.

**GAP-MSG-006**: The `GET /conversations/:id/messages` response includes `isFlagged: boolean` per message, but the wireframe documents a "Your message is under review" state that should appear when a message was flagged for admin review. The API spec does not define a `flagReason` or `reviewStatus` field on the message object. The client cannot differentiate between "flagged and awaiting review" and "flagged but cleared" without additional data.

---

#### Mark Messages as Read (Triggered by Page Load)

**Trigger**: PAGE LOAD — automatically called after messages render and are in viewport
**Endpoint**: `PUT /messages/:id/read`
**Auth**: Bearer JWT
**Path Param**: `:id` = each message ID where `data.readAt === null` and `data.senderId !== currentUserId`

**Screen Elements Updated**: No immediate visual change on this screen. The `message_read` WebSocket event fires back to the sender's screen, updating their "✓ Sent" to "✓✓ Read".

**Notes**: Read receipts are debounced (500ms) and sent only once per message. The client should batch this: call `PUT /messages/:id/read` for each unread message in the initial load. This can result in multiple sequential calls on first visit to a conversation with many unread messages.

**GAP-MSG-007**: There is no `PUT /conversations/:id/read-all` bulk endpoint. Marking a full conversation as read requires one `PUT /messages/:id/read` call per unread message. For a conversation with 20 unread messages, this is 20 sequential API calls. A bulk endpoint is strongly recommended.

---

### 3.2 User Interaction Calls (SCR-CR-011)

---

#### Interaction 1: Send Message

**Trigger**: USER ACTION — clicking "Send Message" button or pressing Enter in the textarea (when not empty)

**Endpoint**: `POST /conversations/:id/messages`
**Auth**: Bearer JWT
**Path Param**: `:id` = `conversationId` from the URL
**Request Body**:
```json
{
  "text": "Looking forward to seeing you on Wednesday!"
}
```

**Optimistic Update**: The message appears in the list immediately with a "⏳ Sending..." timestamp and no read receipt, before the API responds.

**On Success (201)**:
- Replace the optimistic message with the server-confirmed message
- Update timestamp to `data.sentAt` formatted relative time
- Show "✓ Sent" read receipt
- Clear the textarea, reset character counter to "0 / 1000"
- Scroll the message list to bottom

**On Error**:
- 400: Message too long (over the spec limit — note: wireframe states 1000 chars but API spec states 2000; use API spec as authoritative)
- 403: Not a conversation participant — session issue, redirect to `/messages`
- Replace optimistic bubble with "⚠️ Failed to send" state showing a "Retry" link

**Contact Redaction**: If the server detects a phone number or email address in `text`, it redacts the content and returns the sanitised version. The optimistic message must be replaced with the redacted version. The message bubble then shows the `⚠️ Contact info removed for your safety` redaction alert.

---

#### Interaction 2: Typing Indicator (Emit)

**Trigger**: USER ACTION — user starts typing in the textarea (after 300ms debounce)
**Mechanism**: WebSocket outbound event (no REST call)

**WebSocket Event Sent** (client to server):
```json
{
  "event": "user_typing",
  "data": {
    "conversationId": "uuid",
    "isTyping": true
  }
}
```

A second event with `"isTyping": false` is sent after 3 seconds of inactivity, or when the message is sent.

---

#### Interaction 3: Load Older Messages (Infinite Scroll)

**Trigger**: USER ACTION — user scrolls to the top of the message list (when `pagination.totalPages > 1`)
**Endpoint**: `GET /conversations/:id/messages`
**Auth**: Bearer JWT
**Query Parameters**: `page={nextPage}&limit=50`

**On Success**: Prepend the older messages above the current list. Maintain the user's scroll position.

---

#### Interaction 4: Report Conversation

**Trigger**: USER ACTION — "Report Conversation" in the three-dot menu → Report modal → clicking "Submit Report"

**Endpoint**: `POST /safeguarding/report`
**Auth**: Bearer JWT
**Request Body**:
```json
{
  "reportedUserId": "uuid",
  "incidentType": "off_platform_payment",
  "severity": "urgent",
  "incidentDescription": "Optional details text",
  "incidentDate": "2026-02-18"
}
```

**Field Mapping from Modal**:
- `incidentType`: mapped from the modal's reason dropdown:
  - "Inappropriate content" → `inappropriate_conduct`
  - "Attempted off-platform payment" → `off_platform_payment`
  - "Contact information sharing violation" → `policy_violation`
  - "Harassment or abuse" → `emotional_abuse`
  - "Suspected scam" → `financial_abuse`
  - "Other safeguarding concern" → `policy_violation`
- `reportedUserId`: obtained from `otherParty.id` (conversation metadata, fetched at page load)
- `incidentDescription`: optional textarea content from the modal
- `severity`: default to `urgent` (user-submitted reports are treated as urgent pending admin triage)

**On Success (201)**:
- Close the report modal
- Show success confirmation modal: "Report Submitted — Report ID: #SF-2026-XXXX"
- The case number is `data.caseNumber` from the response

**On Error**:
- 400: Missing required fields — show inline validation in the modal
- 403: Not authenticated — redirect to login

---

#### Interaction 5: Block User

**Trigger**: USER ACTION — "Block User" in the three-dot menu → Confirmation modal → clicking "Block User"
**Endpoint**: **GAP-MSG-008** — No user-blocking endpoint exists

The wireframe documents a "Block User" action that locks the conversation in both directions. There is no endpoint in the API specification that implements user-to-user blocking. The `POST /safeguarding/report` endpoint handles reports, but blocking is a distinct action.

**On Success (expected)**:
- Replace `section-message-input` with the `blocked` state variant (informational banner + "Unblock User" button)
- Update participant card to remove the online status indicator

**GAP-MSG-008**: No `POST /users/:id/block` or `POST /conversations/:id/block` endpoint exists. The "Block User" feature shown in the wireframe and screen JSON has no backend. See Section 7.

---

#### Interaction 6: Unblock User

**Trigger**: USER ACTION — clicking "Unblock User" in the blocked conversation state
**Endpoint**: **GAP-MSG-008** (same gap) — No unblock endpoint exists

---

#### Interaction 7: WebSocket — Receive New Message

**Trigger**: REAL-TIME — `new_message` WebSocket event

**WebSocket Event**:
```json
{
  "event": "new_message",
  "data": {
    "conversationId": "uuid",
    "messageId": "uuid",
    "senderId": "uuid",
    "senderName": "Sarah M.",
    "text": "Looking forward to Tuesday!",
    "sentAt": "2026-02-06T10:30:00Z"
  }
}
```

**Screen Elements Updated**:
- If `conversationId` matches the currently open conversation: append the new message bubble at the bottom of `section-messages`
- Auto-scroll to bottom (if user was already at or near the bottom)
- Show "New messages ↓" button if user had scrolled up
- Immediately fire `PUT /messages/:messageId/read` to mark it as read (since the user is viewing the thread)

---

#### Interaction 8: WebSocket — Read Receipt Update

**Trigger**: REAL-TIME — `message_read` WebSocket event (counterparty read one of the current user's messages)

**Screen Elements Updated**:
- The matching message bubble's read receipt updates from "✓ Sent" to "✓✓ Read"

---

#### Interaction 9: WebSocket — Typing Indicator (Receive)

**Trigger**: REAL-TIME — `user_typing` WebSocket event

**Screen Elements Updated**:
- `typing-indicator` at the bottom of `section-messages` appears: "[Participant Name] is typing..."
- Indicator auto-disappears after 3 seconds if no further typing event is received

---

#### Interaction 10: WebSocket — Booking Status Change (System Message)

**Trigger**: REAL-TIME — `booking_status_changed` WebSocket event

**Screen Elements Updated**:
- A new system message bubble (yellow, centered) is appended to the message list: e.g., "Booking accepted by Mary on Wednesday, March 6 at 4:20 PM"
- The booking context card (`booking-context-card`) status badge updates to the new status
- If `newStatus === 'accepted'`, the contact warning banner in `section-contact-warning` is hidden (contact info no longer needs redacting after acceptance)

---

### 3.3 Message Thread — Call Summary Table

| # | Endpoint | Method | Trigger | Section Populated |
|---|----------|--------|---------|-------------------|
| 1 | `/users/me` | GET | Page load | Nav header, own-message identification |
| 2a | `/conversations` (**GAP — no single-conversation endpoint**) | GET | Page load | Participant card, booking context card |
| 2b | `/bookings/:id` | GET | Page load (follow-up to 2a) | Booking context card (ref, date, status) |
| 3 | `/conversations/:id/messages?page=1` | GET | Page load | Message list |
| 4 | `/messages/:id/read` (×N calls) | PUT | Page load (auto, per unread) | Read receipts (updates sender's screen) |
| 5 | `/conversations/:id/messages?page={n}` | GET | User action (scroll up) | Older messages prepended |
| 6 | `/conversations/:id/messages` | POST | User action (send message) | New message bubble appended |
| 7 | `/safeguarding/report` | POST | User action (submit report modal) | Success modal with case number |
| 8 | *(no endpoint)* | — | User action (block/unblock) | **GAP-MSG-008** |
| — | WebSocket `new_message` | WS | Real-time | New message appended, auto-scroll |
| — | WebSocket `message_read` | WS | Real-time | Read receipt updated (own messages) |
| — | WebSocket `user_typing` | WS | Real-time | Typing indicator shown/hidden |
| — | WebSocket `booking_status_changed` | WS | Real-time | System message, booking context badge |

**Total page-load calls**: 4 REST + 1 auto-batch (mark-read) calls
**Total potential user-action calls**: 3 (scroll-up, send, report)

---

## 4. SCR-CR-015: Leave Review

**Route**: `/bookings/:bookingId/review`
**Role**: Care Receiver, Family Member
**Screen JSON**: `docs/tiers/tier1/figma/screens/leave-review.json`
**Wireframe**: `docs/tiers/tier1/draft-design-specs/wireframes/review/scr-cr-015-leave-review.md`

**Screen Description**: Single-purpose form screen for submitting a star rating and optional text review after a completed booking. Includes a booking summary card (caregiver info + booking details), an interactive 5-star rating input, an optional text textarea, a review guidelines info box, and submit/cancel buttons.

### 4.1 Page Load Calls

Both calls must resolve before the review form renders. The form renders in a skeleton state until Call 2 returns the booking and caregiver data. The page header (H1 "Leave a Review") renders immediately from the URL (no data needed).

---

#### Call 1: Current User Profile

**Trigger**: PAGE LOAD
**Endpoint**: `GET /users/me`
**Auth**: Bearer JWT

**Screen Elements Populated**:
- `section-header` — navigation header `userName`
- Verifies the user is a care receiver or family member. A caregiver who navigates to this URL must receive a 403 from Call 2 or be redirected client-side.

**Response Fields Used**:
```
data.firstName    → navigation header display name
data.userType     → must be "care_receiver" or "family"; else redirect to /dashboard
data.accountStatus → if suspended, redirect
```

---

#### Call 2: Booking Details (and Review Eligibility Check)

**Trigger**: PAGE LOAD
**Endpoint**: `GET /bookings/:id`
**Auth**: Bearer JWT
**Path Param**: `:id` = `bookingId` from the URL

**Screen Elements Populated**:
- `booking-summary-card` — the top card showing caregiver info and booking details
- Review eligibility gate — the screen must show the `not-eligible` error state if the booking status is not `completed` or `payment_released`
- Must also detect if a review already exists for this booking — drives the `already-reviewed` state (see GAP-CR-002 from the dashboard mapping)

**Response Fields Used**:
```
data.status                    → eligibility check: must be "completed" or "payment_released"
data.caregiver.id              → caregiver reference for the review submission (Call on submit)
data.caregiver.firstName       → "Mary" — subtitle "Share your experience with Mary"
data.caregiver.lastName        → last initial "M" — displayed as "Mary T." or "Mary Thompson"
data.caregiver.profilePhotoUrl → 80x80px caregiver photo in booking summary card
data.caregiver.verification    → idVerified, dbsVerified → drives verification badge row
data.bookingDate               → "Wednesday, March 6, 2026"
data.startTime                 → "10:00 AM"
data.endTime                   → "2:00 PM"
data.durationHours             → "4 hours"
data.serviceTypes              → ["companionship"] → "Companionship" service label
```

**GAP note on caregiver rating**: The `booking-summary-card` also shows the caregiver's current average rating and review count (e.g., "★★★★☆ 4.8 (24 reviews)"). The `GET /bookings/:id` response does not include `caregiver.averageRating` or `caregiver.totalReviews`. The client must either call `GET /caregivers/:id` separately or this data must be added to the booking response. See GAP-REV-001.

**Eligibility States**:
- `data.status` is `completed` or `payment_released`: Render the review form
- `data.status` is anything else (requested, accepted, in_progress, cancelled, disputed): Render the `not-eligible` state
- `data.hasReview === true` (see GAP-CR-002): Render the `already-reviewed` state

**Notes**: The `GET /bookings/:id` endpoint is the authoritative source for eligibility. The server also enforces this: `POST /bookings/:id/review` returns 422 if the booking is ineligible.

---

#### Call 2b: Caregiver Rating (Optional Supplementary)

**Trigger**: PAGE LOAD (conditional on Call 2 succeeding)
**Endpoint**: `GET /caregivers/:id`
**Auth**: Bearer JWT (Public access also works)
**Path Param**: `:id` = `data.caregiver.id` from Call 2

**Screen Elements Populated**:
- `booking-summary-card` → caregiver rating display: "★★★★☆ 4.8 (24 reviews)"

**Response Fields Used**:
```
data.averageRating    → "4.8" displayed in star rating display
data.totalReviews     → "(24 reviews)" count
```

**GAP-REV-001**: `GET /bookings/:id` does not include `caregiver.averageRating` or `caregiver.totalReviews`. This requires a supplementary call to `GET /caregivers/:id` solely for the rating display in the booking summary card. Adding these fields to the booking response's `caregiver` embedded object would eliminate this additional call. See Section 7.

---

### 4.2 User Interaction Calls (SCR-CR-015)

---

#### Interaction 1: Star Rating Selection

**Trigger**: USER ACTION — clicking a star
**API call**: None. Star rating is client-side state only until the form is submitted.

**Screen Elements Updated**:
- Stars fill yellow up to the clicked star
- Star label updates below the selected star ("Very Good", "Excellent", etc.)
- Submit button transitions from Disabled to Default state when any star is selected

---

#### Interaction 2: Text Review Typing

**Trigger**: USER ACTION — typing in the textarea
**API call**: None. Text is client-side state only until the form is submitted.

**Screen Elements Updated**:
- Character counter updates: "0 / 500" → "167 / 500"
- Counter colour: gray (<450), orange (450–499), red (500)

---

#### Interaction 3: Submit Review

**Trigger**: USER ACTION — clicking "Submit Review" (only enabled when star rating > 0)

**Endpoint**: `POST /bookings/:id/review`
**Auth**: Bearer JWT
**Path Param**: `:id` = `bookingId` from the URL

**Request Body**:
```json
{
  "rating": 5,
  "reviewText": "Mary was punctual, kind, and made my father feel very comfortable. She helped with light housework and we had a lovely afternoon. I would highly recommend her to other families."
}
```

**Notes**: The API spec also accepts `reviewTags` (e.g., `["punctual", "friendly", "reliable"]`). The wireframe and screen JSON do not include a tag-selection UI, so `reviewTags` is omitted from the form. The field is optional in the API spec and can be added to the UI in a future iteration without a schema change.

**On Success (201)**:
- Show the `success` state variation (the form is replaced by the success modal inline)
- Success modal displays the submitted rating and truncated review text
- Two CTAs: "Back to Dashboard" → `/dashboard` and "Book [Caregiver Name] Again" → `/search` with caregiver pre-selected (or `/bookings/new?caregiverId={id}`)

**On Error**:
- 422 `REVIEW_ALREADY_EXISTS`: Show the `already-reviewed` state — "You have already submitted a review for this booking"
- 422 `BOOKING_NOT_ELIGIBLE`: Show the `not-eligible` state — "This booking is not eligible for review"
- 400: Validation error (rating out of range, text too long) — show inline field error
- 403: Not the booking's care receiver — redirect to dashboard

---

#### Interaction 4: Cancel Review

**Trigger**: USER ACTION — clicking "Cancel" (if no data entered: navigate directly; if data entered: show confirmation modal)
**API call**: None. Client-side navigation back to `GET /bookings/:bookingId` (SCR-CR-008).

---

### 4.3 Leave Review — Call Summary Table

| # | Endpoint | Method | Trigger | Section Populated |
|---|----------|--------|---------|-------------------|
| 1 | `/users/me` | GET | Page load | Nav header (name), role validation |
| 2 | `/bookings/:id` | GET | Page load | Booking summary card, eligibility gate |
| 2b | `/caregivers/:id` (**GAP-REV-001**) | GET | Page load (follow-up) | Caregiver rating in booking summary card |
| 3 | `/bookings/:id/review` | POST | User action (submit) | Success state / error state |

**Total page-load calls**: 2 (3 if GAP-REV-001 not resolved)
**Total potential user-action calls**: 1 (review submission)

---

## 5. SCR-CG-003: Caregiver Profile Edit

**Route**: `/caregiver/profile/edit`
**Role**: Caregiver
**Screen JSON**: `docs/tiers/tier1/figma/screens/caregiver-profile-edit.json`
**Wireframe**: No standalone wireframe markdown — specification lives in the screen JSON

**Screen Description**: Self-service profile editor for caregivers. Allows editing all public-facing profile fields organised in named sections: Profile Photo, About You (bio, years of experience, languages, interests), Services You Offer (checkboxes), Hourly Rate (with commission info box), Availability (weekly grid), and Location and Travel (postcode, service radius). Changes save on clicking "Save Changes".

### 5.1 Page Load Calls

Both calls must resolve before the form renders with pre-populated values. The form renders in a skeleton/disabled state until data loads. The page header ("Edit Your Profile") renders immediately.

---

#### Call 1: Current User Profile

**Trigger**: PAGE LOAD
**Endpoint**: `GET /users/me`
**Auth**: Bearer JWT

**Screen Elements Populated**:
- `nav` — navigation header `userName`, `notificationCount`
- Role check: if `data.userType !== 'caregiver'`, redirect to appropriate dashboard

**Response Fields Used**:
```
data.firstName      → navigation header display name
data.userType       → must be "caregiver"; else redirect
data.accountStatus  → if suspended, redirect
```

---

#### Call 2: Caregiver Own Profile Data

**Trigger**: PAGE LOAD
**Endpoint**: **GAP-CG-001** (from dashboard mapping) — No `GET /caregivers/me` endpoint exists

The entire form pre-population depends on the caregiver's own profile data. This is the same gap identified for the caregiver dashboard. The existing endpoints do not provide a suitable self-view:

- `GET /caregivers/:id` (public profile) — accessible to all, but omits internal fields such as `profileVisible`, `profileApproved`, and payout status; requires knowing the caregiver's own ID
- `PUT /caregivers/me` (update) — write-only; no GET counterpart defined
- `GET /verification/status` — provides verification data only

**Fields required to pre-populate each form section**:

For `photo-section`:
```
data.profilePhotoUrl         → current profile photo preview (120px circle)
```

For `about-section`:
```
data.bio                     → pre-filled textarea (100–500 chars)
data.yearsExperience         → pre-filled number input
data.languagesSpoken         → pre-selected tags in multi-select-tags
data.interests               → pre-selected tags (see GAP-CG-005 below)
```

For `services-section`:
```
data.servicesOffered         → determines which service checkboxes are checked
data.hasVehicle              → determines whether "I have my own vehicle" checkbox is checked
```

For `rate-section`:
```
data.hourlyRate              → pre-filled £ amount in the rate input field
```

For `availability-section`:
```
data.availability.recurring  → drives the weekly availability grid pre-selection
```

For `location-section`:
```
data.postcode                → pre-filled postcode input
data.serviceRadiusMiles      → pre-selected radius dropdown value
```

**GAP-CG-001 (continued)**: This is the same gap documented in the dashboard mapping. For the profile edit screen it is even more critical — without `GET /caregivers/me`, the entire form cannot be pre-populated. The profile edit screen is non-functional without this endpoint. All field values would render as blank rather than the caregiver's existing saved values.

**GAP-CG-005**: The screen JSON includes an `interests` multi-select-tags field (hobbies: Gardening, Reading, Walking, etc.). The `PUT /caregivers/me` request body in the API spec does not include an `interests` or `hobbiesAndInterests` field. This field is not currently part of the API schema. See Section 7.

**Recommended workaround until GAP-CG-001 is closed**: Call `GET /caregivers/:id` using the caregiver's own user ID (available from Call 1 if `GET /users/me` returns the caregiver profile ID, which it currently does not — see GAP-CG-006). The public profile response omits some fields but covers most of what the form needs.

**GAP-CG-006**: `GET /users/me` returns the user's account-level data but does not return the `caregiverId` (the ID used in `GET /caregivers/:id`). Without this, the client cannot call the public profile endpoint for the currently authenticated caregiver. The `GET /users/me` response should include a `profileId` field for caregivers.

---

### 5.2 User Interaction Calls (SCR-CG-003)

---

#### Interaction 1: Upload Profile Photo

**Trigger**: USER ACTION — selecting a file via the `file-upload` component
**Endpoint**: **GAP-MSG-009** — No profile photo upload endpoint exists

The screen JSON `file-upload` component allows uploading a JPG or PNG up to 5MB. There is no endpoint in the API specification for uploading a profile photo. The `PUT /caregivers/me` endpoint accepts a `profilePhotoUrl` string (a URL to an already-uploaded image), but no multipart upload endpoint is defined.

**GAP-MSG-009**: No `POST /users/me/photo` or `POST /caregivers/me/photo` multipart upload endpoint exists. The profile photo `file-upload` component in the profile edit screen has no backend. See Section 7.

---

#### Interaction 2: Preview Public Profile

**Trigger**: USER ACTION — clicking "Preview Public Profile" button
**Endpoint**: `GET /caregivers/:id`
**Auth**: Bearer JWT (public access)
**Path Param**: `:id` = the caregiver's own ID (requires GAP-CG-006 to be resolved, or the ID cached from login)

**Action**: Opens the caregiver's public-facing profile (SCR-CR-005) in a new tab or a preview overlay.

---

#### Interaction 3: Save Changes

**Trigger**: USER ACTION — clicking "Save Changes"

**Endpoint**: `PUT /caregivers/me`
**Auth**: Bearer JWT
**Request Body**:
```json
{
  "bio": "Updated bio text...",
  "servicesOffered": ["companionship", "light_housework", "shopping"],
  "hourlyRate": 18.00,
  "languagesSpoken": ["english", "polish"],
  "hasVehicle": true,
  "serviceRadiusMiles": 10
}
```

**Additional fields needed in the request body that are NOT currently in the API spec**:
- `yearsExperience: number` — drives the "years of experience" field (see GAP-CG-007)
- `interests: string[]` — drives the interests/hobbies tags (see GAP-CG-005)
- `postcode: string` — drives the location/postcode field (see GAP-CG-008)
- `profileVisible: boolean` — drives the visibility toggle from the dashboard (see GAP-CG-004 from dashboard mapping)

**On Success (200)**:
- Show toast notification: "Profile updated successfully"
- Update "Last saved: Today at [time]" label in the `actions` section
- If `hourlyRate` changed: Update the commission info box calculation to reflect the new rate

**On Error**:
- 400 `VALIDATION_ERROR`: Inline field errors per field (bio too short, rate out of range, etc.)
- 422 `INVALID_SERVICES`: Services selected are not available at Tier 1
- 403: Not a caregiver account

**Business Rule**: If `hourlyRate` is changed significantly (e.g., >20% change), the API may trigger an admin review of the profile. The response should indicate if the change is pending review (`profileApproved: false`). No flag currently exists in the `PUT /caregivers/me` response for this.

---

#### Interaction 4: Save Availability

**Trigger**: USER ACTION — clicking "Save Changes" (availability grid is part of the same form)
**Endpoint**: `POST /caregivers/me/availability`
**Auth**: Bearer JWT

**Request Body** (constructed from the availability grid state):
```json
{
  "recurring": [
    { "dayOfWeek": 1, "startTime": "06:00", "endTime": "12:00" },
    { "dayOfWeek": 1, "startTime": "12:00", "endTime": "17:00" },
    { "dayOfWeek": 2, "startTime": "06:00", "endTime": "12:00" },
    { "dayOfWeek": 2, "startTime": "12:00", "endTime": "17:00" },
    { "dayOfWeek": 3, "startTime": "12:00", "endTime": "17:00" },
    { "dayOfWeek": 4, "startTime": "06:00", "endTime": "12:00" },
    { "dayOfWeek": 4, "startTime": "12:00", "endTime": "17:00" },
    { "dayOfWeek": 5, "startTime": "06:00", "endTime": "12:00" }
  ],
  "oneOff": [],
  "unavailable": []
}
```

**Notes**: The availability grid in the screen JSON uses `morning/afternoon/evening` period labels. These map to the `startTime/endTime` pairs in the API request body:
- Morning: `06:00–12:00`
- Afternoon: `12:00–17:00`
- Evening: `17:00–21:00`

**On Success (201)**: Update the form with new availability data; show success toast.

**On Error**:
- 400: Overlapping time slots
- 422 `BELOW_MINIMUM_HOURS`: Profile visibility requires minimum 10 hours/week. If the new availability falls below this threshold, the API returns 422 with error code `BELOW_MINIMUM_HOURS`. The form should display: "Your profile will be hidden from search results — a minimum of 10 hours per week is required."

**Notes on Save Sequencing**: The "Save Changes" button fires both `PUT /caregivers/me` (profile fields) and `POST /caregivers/me/availability` (availability grid) concurrently. Both calls must succeed for the save to be considered complete. If one fails, the form must show the appropriate field-level error without reverting successful changes.

**GAP-CG-009**: There is no idempotent `PUT /caregivers/me/availability` (replace all) variant. The current `POST /caregivers/me/availability` endpoint likely appends or replaces availability slots. The spec does not clearly indicate whether it is additive or a full replacement. The profile edit form treats availability as a full replacement (the user sets their complete weekly schedule). The API must be a full replacement — not additive — to avoid accumulating duplicate slots. This should be clarified in the API spec.

---

#### Interaction 5: Discard Changes

**Trigger**: USER ACTION — clicking "Discard Changes"
**API call**: None. Re-populates the form from the cached data loaded at page load.

---

### 5.3 Caregiver Profile Edit — Call Summary Table

| # | Endpoint | Method | Trigger | Section Populated |
|---|----------|--------|---------|-------------------|
| 1 | `/users/me` | GET | Page load | Nav header, role validation |
| 2 | `/caregivers/me` (**GAP-CG-001**) | GET | Page load | All form fields pre-populated |
| 3 | *(no endpoint)* | — | User action (photo upload) | **GAP-MSG-009** — photo file-upload |
| 4 | `/caregivers/:id` | GET | User action (preview profile) | Opens public profile view |
| 5 | `/caregivers/me` | PUT | User action (save changes) | Saves profile fields |
| 6 | `/caregivers/me/availability` | POST | User action (save changes) | Saves availability grid |

**Total page-load calls**: 2 (both required; form is blank without call 2)
**Total potential user-action calls**: 3 (photo, save, preview)

---

## 6. Gap Summary

Gaps from the dashboard mapping document that are directly relevant to these screens are listed for cross-reference. New gaps introduced by these screens are listed separately.

### 6.1 Cross-Referenced Gaps (from Dashboard Mapping)

| Gap ID | Originating Screen | Impact on These Screens |
|--------|--------------------|------------------------|
| **GAP-CR-002** | SCR-CR-001 | `GET /bookings/:id` has no `hasReview` field. The `already-reviewed` state on SCR-CR-015 cannot be detected without an additional review lookup. |
| **GAP-CR-004** | SCR-CR-001, SCR-CG-001 | No `/conversations/unread-count` endpoint. Inbox (SCR-CR-012) must sum unread counts from the full list call. |
| **GAP-CG-001** | SCR-CG-001 | No `GET /caregivers/me` (self-view) endpoint. SCR-CG-003 cannot pre-populate any form field without this. **CRITICAL for profile edit.** |
| **GAP-CG-004** | SCR-CG-001 | `PUT /caregivers/me` missing `profileVisible` field. Also affects SCR-CG-003 if profile visibility toggle is added to the profile edit screen. |

### 6.2 New Gaps (This Document)

| Gap ID | Screen | Description | Priority |
|--------|--------|-------------|----------|
| **GAP-MSG-001** | SCR-CR-012 | `GET /conversations` response does not include a `bookingContext` object (booking reference number and booking status). The `threadType` label in each inbox row (e.g., "Booking #1042 — Confirmed for Thu 20 Feb") cannot be displayed without a per-conversation call to `GET /bookings/:id`. | HIGH |
| **GAP-MSG-002** | SCR-CR-012 | `GET /conversations` has no `sort` query parameter. The sort-by dropdown (Most Recent, Unread First, Upcoming Booking, Alphabetical) cannot be supported. | MEDIUM |
| **GAP-MSG-003** | SCR-CR-012 | `GET /conversations` has no `filter` query parameter for conversation type (booking-linked, pre-booking inquiry, archived). The tab bar and tab counts cannot be populated. | HIGH |
| **GAP-MSG-004** | SCR-CR-011 | No `GET /conversations/:id` single-conversation metadata endpoint. Participant card (name, photo, role, online status, verification badges) and booking context card are unpopulated without a separate `GET /conversations` list call plus a `GET /bookings/:id` call. | HIGH |
| **GAP-MSG-005** | SCR-CR-011 | No `isOnline` / `lastActiveAt` field on any participant data source. The "● Online" / "○ Offline" indicator in the participant card has no data source. | LOW |
| **GAP-MSG-006** | SCR-CR-011 | `GET /conversations/:id/messages` returns `isFlagged: boolean` per message but no `flagReason` or `reviewStatus`. The "Your message is under review" UI state cannot distinguish between pending review and cleared. | LOW |
| **GAP-MSG-007** | SCR-CR-011 | No `PUT /conversations/:id/read-all` bulk read endpoint. Marking a conversation as read requires one `PUT /messages/:id/read` call per unread message, which is inefficient for conversations with many unread messages. | MEDIUM |
| **GAP-MSG-008** | SCR-CR-011 | No `POST /users/:id/block` or `POST /conversations/:id/block` endpoint. The "Block User" and "Unblock User" actions in the conversation three-dot menu have no backend implementation. | MEDIUM |
| **GAP-REV-001** | SCR-CR-015 | `GET /bookings/:id` does not include `caregiver.averageRating` or `caregiver.totalReviews`. Displaying the caregiver's current rating in the booking summary card requires a supplementary `GET /caregivers/:id` call. | LOW |
| **GAP-CG-005** | SCR-CG-003 | `PUT /caregivers/me` request body does not include an `interests` (hobbies) field. The interests multi-select-tags component in the profile edit form cannot be saved. | MEDIUM |
| **GAP-CG-006** | SCR-CG-003 | `GET /users/me` response does not include a `caregiverProfileId` or `profileId` field. The client cannot construct a call to `GET /caregivers/:id` for the currently authenticated caregiver without knowing their profile ID. | HIGH |
| **GAP-CG-007** | SCR-CG-003 | `PUT /caregivers/me` request body does not include a `yearsExperience` field. The "Years of experience" input in the About You section cannot be saved. | MEDIUM |
| **GAP-CG-008** | SCR-CG-003 | `PUT /caregivers/me` request body does not include a `postcode` field. The postcode input in the Location and Travel section cannot be saved. | HIGH |
| **GAP-MSG-009** | SCR-CG-003 | No `POST /users/me/photo` or `POST /caregivers/me/photo` multipart file upload endpoint exists. The profile photo file-upload component has no backend. | HIGH |
| **GAP-CG-009** | SCR-CG-003 | `POST /caregivers/me/availability` behaviour (additive vs full replacement) is not explicitly specified. Profile edit requires full replacement semantics to prevent duplicate slots accumulating on repeated saves. | MEDIUM |

---

## 7. Recommended API Additions

The following additions to `docs/technical/api-specification-tier1.md` are recommended to close the gaps identified above. Listed in priority order. Gaps already documented in the dashboard mapping (ADD-1 through ADD-13) are not repeated here; the relevant ones are referenced.

---

### 7.1 HIGH PRIORITY (Screens Cannot Function Without These)

#### ADD-14: GET /caregivers/me (Close GAP-CG-001 and GAP-CG-006)

Already documented as ADD-1 in the dashboard mapping. For the profile edit screen this is a hard blocker — the form cannot pre-populate without it. The `GET /caregivers/me` response should also include `caregiverProfileId` to address GAP-CG-006, making the `profileId` available via `GET /users/me` unnecessary as a separate lookup.

---

#### ADD-15: GET /conversations/:id

Closes: GAP-MSG-004

**Endpoint**: `GET /conversations/:id`
**Access**: Authenticated (conversation participant)
**Purpose**: Returns metadata for a single conversation, including the other participant's profile snapshot and the linked booking context. Eliminates the need for a list call + booking call on every thread page load.

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "bookingId": "uuid",
    "status": "active",
    "createdAt": "2026-01-20T10:00:00Z",
    "otherParty": {
      "id": "uuid",
      "name": "Mary Thompson",
      "profilePhotoUrl": "https://s3.amazonaws.com/...",
      "role": "caregiver",
      "isOnline": false,
      "lastActiveAt": "2026-02-18T09:45:00Z",
      "verification": {
        "idVerified": true,
        "dbsVerified": true
      }
    },
    "bookingContext": {
      "id": "uuid",
      "ref": "BK-12345",
      "date": "2026-03-06T10:00:00Z",
      "status": "accepted"
    },
    "unreadCount": 2,
    "isBlocked": false,
    "isArchived": false
  }
}
```

**Notes**: `isOnline` is derived from `lastActiveAt < now() - 5 minutes`. Including it in this response partially addresses GAP-MSG-005 without requiring a dedicated presence endpoint.

---

#### ADD-16: Add `bookingContext` to GET /conversations List Response

Closes: GAP-MSG-001

Add a `bookingContext` embedded object to each conversation in the `GET /conversations` list response:

```json
"bookingContext": {
  "ref": "BK-1042",
  "status": "accepted",
  "bookingDate": "2026-02-20T14:00:00Z",
  "threadType": "booking-linked"
}
```

The `threadType` field values: `booking-linked`, `inquiry`, `archived`. This closes GAP-MSG-001 and GAP-MSG-003 (tab filtering can use `threadType`). It also provides the data the inbox needs to display the thread type label without additional calls.

---

#### ADD-17: Add `postcode` and `yearsExperience` to PUT /caregivers/me

Closes: GAP-CG-008, GAP-CG-007

Add to the `PUT /caregivers/me` request body:
```json
{
  "postcode": "SW1A 1AA",
  "yearsExperience": 5
}
```

Both are displayed in the profile edit form and are required caregiver profile fields.

---

#### ADD-18: POST /caregivers/me/photo (Profile Photo Upload)

Closes: GAP-MSG-009

**Endpoint**: `POST /caregivers/me/photo`
**Access**: Authenticated (Caregiver)
**Content-Type**: `multipart/form-data`
**Request**: `photo: <file>` (JPG or PNG, max 5MB)

**Response** (200):
```json
{
  "success": true,
  "data": {
    "profilePhotoUrl": "https://s3.amazonaws.com/icare/photos/uuid.jpg"
  }
}
```

**Implementation**: Upload file to S3 (or equivalent UK-resident storage), validate MIME type and size server-side, return the CDN URL. Update `caregiver_profiles.profile_photo_url` atomically.

---

### 7.2 MEDIUM PRIORITY

#### ADD-19: Add `sort` and `filter` Parameters to GET /conversations

Closes: GAP-MSG-002, GAP-MSG-003

**Sort parameter** (`sort`): Values: `recent` (default), `unread_first`, `upcoming_booking`, `alphabetical`

**Filter parameter** (`filter`): Values: `all` (default), `unread`, `booking_linked`, `inquiry`, `archived`

These two parameters together enable the inbox sort dropdown and tab bar.

---

#### ADD-20: PUT /conversations/:id/read-all (Bulk Mark Read)

Closes: GAP-MSG-007

**Endpoint**: `PUT /conversations/:id/read-all`
**Access**: Authenticated (conversation participant)
**Request**: No body required

**Response** (200):
```json
{
  "success": true,
  "data": {
    "conversationId": "uuid",
    "messagesMarkedRead": 12,
    "readAt": "2026-02-18T10:30:00Z"
  }
}
```

**Purpose**: Marks all unread messages in the conversation as read in a single call. Called automatically when the user opens a conversation thread.

---

#### ADD-21: POST /users/:id/block and DELETE /users/:id/block

Closes: GAP-MSG-008

**Block endpoint**: `POST /users/:id/block`
**Unblock endpoint**: `DELETE /users/:id/block`
**Access**: Authenticated

**Block Response** (200):
```json
{
  "success": true,
  "data": {
    "blockedUserId": "uuid",
    "blockedAt": "2026-02-18T10:30:00Z"
  }
}
```

**Business Rules**:
- Blocking is bidirectional (neither party can send messages)
- Existing bookings are not affected (the block applies only to new messages)
- The conversation enters the `blocked` UI state on both sides

---

#### ADD-22: Add `interests` to PUT /caregivers/me

Closes: GAP-CG-005

Add `interests: string[]` to the `PUT /caregivers/me` request body. Values match the options in the multi-select-tags component: `gardening`, `reading`, `walking`, `cooking`, `board_games`, `knitting`, `music`, `art`, `puzzles`, `bird_watching`, `photography`, `cinema`, `theatre`, `baking`, `card_games`, `swimming`, `yoga`, `dancing`, `history`, `travel_stories`.

The `GET /caregivers/:id` (public profile) and the future `GET /caregivers/me` responses should also include this field.

---

#### ADD-23: Clarify POST /caregivers/me/availability as Full Replacement

Closes: GAP-CG-009

Update the API specification for `POST /caregivers/me/availability` to explicitly state that the request body is a **full replacement** of the caregiver's availability schedule (not additive). Include a note: "Sending this request replaces all existing recurring slots, one-off slots, and unavailability periods with the new values provided."

Alternatively, rename the endpoint to `PUT /caregivers/me/availability` to make the idempotent replacement semantics clearer.

---

### 7.3 LOW PRIORITY

#### ADD-24: Add `averageRating` and `totalReviews` to Booking Response

Closes: GAP-REV-001

Add to the `caregiver` embedded object in `GET /bookings/:id`:
```json
"caregiver": {
  "id": "uuid",
  "firstName": "Mary",
  "lastName": "M",
  "profilePhotoUrl": "...",
  "averageRating": 4.8,
  "totalReviews": 24,
  "verification": {...}
}
```

This eliminates the supplementary `GET /caregivers/:id` call on the Leave Review screen.

---

#### ADD-25: Add `hasReview` to Booking Responses

Closes: GAP-CR-002 (cross-reference from dashboard mapping; critical for SCR-CR-015)

Already documented as ADD-4 in the dashboard mapping. Critical for the Leave Review screen's `already-reviewed` guard state.

---

#### ADD-26: Add `flagReason` to Message Objects

Closes: GAP-MSG-006

Add `flagReason: string | null` to the message object in `GET /conversations/:id/messages`. Values: `contact_info`, `profanity`, `payment_request`, `suspicious_url`, `admin_flagged`. When `isFlagged === true` and `flagReason` is not null, the client can display "Your message is under review" with context.

---

*End of document*
