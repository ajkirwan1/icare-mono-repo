# Message Thread Wireframes (SCR-CR-011)

**Document Purpose**: ASCII wireframes and complete element inventory for Message Thread screen (SCR-CR-011)

**Screen ID**: SCR-CR-011
**Screen Name**: Message Thread
**User Role**: Care Receiver, Family Member, Caregiver
**Route**: `/messages/:conversationId`
**R0/R1**: R0 (Decision CB-005)
**Created**: 2026-02-11
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
8. [Content Moderation & Safeguarding](#8-content-moderation--safeguarding)
9. [Design Notes](#9-design-notes)

---

## 1. Screen Purpose

### 1.1 Purpose Statement

The Message Thread screen enables secure communication between care receivers (and family members) and caregivers within a booking context. The system protects contact information, moderates content for safeguarding, and maintains an audit trail.

**Key Functions**:
- Display conversation history (chronological, newest at bottom)
- Send and receive messages within booking context
- Show booking context link (quick access to booking details)
- Display participant information (caregiver or care receiver)
- Report/block functionality for safeguarding
- Automated contact information redaction
- Show typing indicators and read receipts
- System messages for booking status changes

**Critical Constraints**:
- Contact information (phone, email) automatically redacted until booking accepted
- All messages monitored for safeguarding (automated filtering)
- Messages tied to booking lifecycle (cannot delete, only archive)
- Admin oversight available for safeguarding reviews

### 1.2 Entry Points

**From Booking Detail**:
- SCR-CR-008 (Care Receiver Booking Detail) → "Message Caregiver" button → Load conversation
- SCR-CG-013 (Caregiver Booking Detail) → "Message Care Receiver" button → Load conversation

**From Dashboard** (Future R1):
- Message notification → Click → Load conversation

**From Email Notification**:
- "View Message" link → Load conversation (requires login)

### 1.3 Exit Points

**Booking Context**:
- "View Booking Details" link → SCR-CR-008 or SCR-CG-013 (depending on role)

**Safeguarding Actions**:
- "Report Conversation" → Opens report modal → Creates safeguarding report

**Global Navigation**:
- Header "Dashboard" → SCR-CR-001 or SCR-CG-001 (depending on role)
- Header "My Bookings" → Booking list

---

## 2. Element Inventory

### 2.1 Content Blocks

#### Block 1: Header (Global)
- **Component Reuse**: NAV-HEADER-AUTH (from dashboard-shared-components.md)

#### Block 2: Conversation Header
- **Purpose**: Show conversation context and participant info
- **Priority**: Primary
- **Elements**:
  - Breadcrumb: "Dashboard > Messages > [Participant Name]"
  - Back button (mobile): "← Back" → Returns to previous screen
  - **Participant Card** (left):
    - Profile photo (80x80px)
    - Full name (H2): "[Participant Name]"
    - Role badge: "Caregiver" or "Care Receiver"
    - Status indicator: "● Online" (green) or "○ Offline" (gray)
    - Verification badges (if caregiver): "✓ Identity" "✓ DBS"
  - **Booking Context Card** (right):
    - Label: "About this conversation"
    - Booking reference: "Booking #[ID]"
    - Date: "[Day], [Date] at [Time]"
    - Status badge: [Requested/Accepted/In Progress/Completed]
    - Link: "View Booking Details →" → SCR-CR-008 or SCR-CG-013

**Component Reuse**: USER-AVATAR, STATUS-BADGE, VERIFICATION-BADGE-ROW

#### Block 3: Messages Container
- **Purpose**: Display conversation history with chronological ordering
- **Priority**: Primary
- **Elements**:
  - **Message List** (scrollable, reverse chronological on load, newest at bottom):
    - Each message displays:
      - Sender name (if system message: "System")
      - Message timestamp: "Today at 2:45 PM" or "Yesterday at 10:30 AM"
      - Message body text (max 1000 characters)
      - Alignment: Own messages right-aligned, other participant left-aligned
      - Background: Own messages (light blue), other participant (light gray), system (yellow)
      - Read receipt (own messages only): "✓✓ Read" or "✓ Sent"
      - **Contact Redaction Alert** (if automated redaction occurred):
        - Badge: "⚠️ Contact info removed for your safety"
        - Tooltip: "Phone numbers and email addresses are hidden until booking is accepted"

  - **System Messages** (centered, yellow background):
    - Examples:
      - "Booking requested on [Date] at [Time]"
      - "Booking accepted by [Caregiver Name] on [Date]"
      - "Booking completed on [Date]"
      - "Payment released to [Caregiver Name]"
    - Format: Icon + text, no sender name

  - **Date Dividers** (centered, gray):
    - "Today", "Yesterday", "[Date]"

  - **Typing Indicator** (if participant is typing):
    - Format: "[Participant Name] is typing..."
    - Animation: Three dots pulsing
    - Position: Above message input

**Component Reuse**: MESSAGE-BUBBLE, TYPING-INDICATOR, DATE-DIVIDER

#### Block 4: Message Input
- **Purpose**: Compose and send new messages
- **Priority**: Primary
- **Elements**:
  - **Textarea**:
    - Placeholder: "Type your message..."
    - Max length: 1000 characters
    - Auto-resize: Grows as user types (max 5 lines, then scrolls)
    - Character counter: "250 / 1000" (shown when >700 characters)
    - Validation: Cannot send empty messages

  - **Contact Warning Banner** (conditional, if booking status = requested):
    - Icon: ⚠️
    - Text: "Don't share phone numbers or email addresses until the booking is accepted. Messages are monitored for your safety."
    - Color: Yellow background

  - **Send Button**:
    - Label: "Send" (or paper plane icon)
    - States: Default, Disabled (if textarea empty), Sending ("Sending...")
    - Keyboard shortcut: Enter (Shift+Enter for new line)

  - **Report Button** (secondary, small):
    - Label: "Report Conversation" (or flag icon)
    - Action: Opens report modal

**Component Reuse**: TEXTAREA, BUTTON

#### Block 5: Safeguarding Actions (Dropdown Menu)
- **Purpose**: Enable reporting and blocking
- **Priority**: Secondary (safety-critical)
- **Elements**:
  - Three-dot menu icon (top right of conversation header)
  - **Dropdown Options**:
    - "Report Conversation" → Opens report modal
    - "Block User" → Opens block confirmation modal
    - "View Safeguarding Policy" → SCR-PUB-008

  - **Report Modal**:
    - H2: "Report this conversation"
    - Body: "Please tell us why you're reporting this conversation. Our safeguarding team will review it within 24 hours."
    - Reason dropdown (required):
      - "Inappropriate content"
      - "Attempted off-platform payment"
      - "Contact information sharing violation"
      - "Harassment or abuse"
      - "Suspected scam"
      - "Other safeguarding concern"
    - Details textarea (optional, 500 chars): "Additional details (optional)"
    - Actions: [Cancel] [Submit Report]

  - **Block Confirmation Modal**:
    - H2: "Block [Participant Name]?"
    - Body: "You will no longer receive messages from this user. This cannot be undone. Your existing booking will not be affected, but you won't be able to send or receive messages."
    - Warning: "Are you sure you want to block this user?"
    - Actions: [Cancel] [Block User]

**Component Reuse**: DROPDOWN-MENU, MODAL

#### Block 6: Empty State (No Messages)
- **Purpose**: First message in conversation
- **Priority**: Primary (if shown)
- **Elements**:
  - Icon: Speech bubble
  - H2: "Start the conversation"
  - Body: "Send a message to [Participant Name] to get started. Messages are monitored for your safety."
  - Booking context card (same as Block 2)

**Component Reuse**: EMPTY-STATE

#### Block 7: Footer (Global)
- **Component Reuse**: FOOTER (from dashboard-shared-components.md)

---

### 2.2 Message Types & Layouts

#### User-to-User Messages
**Own Messages** (right-aligned):
```
                                        +---------------------------+
                                        |  Message text here. This  |
                                        |  is my message.           |
                                        +---------------------------+
                                        Today at 2:45 PM     ✓✓ Read
```

**Other Participant Messages** (left-aligned):
```
+---------------------------+
|  Message text from the    |
|  other person.            |
+---------------------------+
Mary Thompson
Today at 2:30 PM
```

#### System Messages (centered):
```
                    ┌─────────────────────────────────┐
                    │  Booking accepted by Mary on    │
                    │  Wednesday, March 6 at 4:20 PM  │
                    └─────────────────────────────────┘
                              System message
```

#### Contact Redaction Alert:
```
+-----------------------------------------------------------+
|  Hi! My number is [REDACTED] - call me anytime.          |
+-----------------------------------------------------------+
Mary Thompson                         ⚠️ Contact info removed
Today at 2:30 PM
```

---

### 2.3 Interactive Elements

1. **Send Message Button**
   - Type: Primary CTA
   - Action: POST /api/messages → Append message to thread → Scroll to bottom
   - Validation: Cannot send if textarea empty
   - States: Default, Disabled, Sending
   - Keyboard: Enter key (Shift+Enter for new line)

2. **Report Conversation Button**
   - Type: Secondary (safety)
   - Action: Open report modal → Submit report → Create safeguarding record
   - Keyboard: Focusable

3. **Block User Button**
   - Type: Destructive
   - Action: Confirmation modal → Block user → Prevent message sending/receiving
   - Keyboard: Focusable

4. **View Booking Details Link**
   - Type: Text link
   - Action: Navigate to booking detail screen (role-dependent)
   - Keyboard: Focusable

5. **Message List Scrolling**
   - Behavior: Auto-scroll to bottom when new message arrives
   - Keyboard: Arrow keys for scrolling
   - Accessibility: `role="log"` for screen reader updates

---

### 2.4 Data Display Elements

#### Dynamic Data

1. **Participant information** (Block 2)
   - Source: `users` table via conversation participants
   - Displays: Name, photo, role, online status
   - Caregiver badges: From `caregiver_profiles.verification_status`

2. **Booking context** (Block 2)
   - Source: `bookings` table via `conversations.booking_id`
   - Displays: Booking reference, date, time, status

3. **Message list** (Block 3)
   - Source: `messages` table ordered by `created_at ASC`
   - Pagination: Load last 50 messages, infinite scroll up for older
   - Real-time updates: New messages appear at bottom via WebSocket

4. **Read receipts** (Block 3)
   - Source: `message_read_receipts` table
   - Display: "✓ Sent" or "✓✓ Read" on own messages

5. **Typing indicator** (Block 3)
   - Source: Real-time WebSocket event from other participant
   - Display: "[Name] is typing..." with animated dots

6. **Online status** (Block 2)
   - Source: User session activity (last active within 5 minutes)
   - Display: "● Online" (green) or "○ Offline" (gray)

#### Static Content

- Section headings, placeholders, help text (defined above)

---

## 3. ASCII Wireframes

### 3.1 Desktop (1440px+) - Active Conversation

```
+------------------------------------------------------------------------------+
|  [LOGO]           Dashboard   My Bookings   Messages              [USER▼]   |
+------------------------------------------------------------------------------+
|                                                                              |
|  Breadcrumb: Dashboard > Messages > Mary Thompson                           |
|                                                                              |
|  +--------------------------------+  +-----------------------------------+   |
|  |  [Photo]  Mary Thompson        |  |  ABOUT THIS CONVERSATION          |   |
|  |           Caregiver            |  |                                   |   |
|  |           ● Online             |  |  Booking #12345                   |   |
|  |           ✓ Identity  ✓ DBS    |  |  Wednesday, March 6 at 10:00 AM   |   |
|  |                                |  |  [ACCEPTED]                       |   |
|  +--------------------------------+  |                                   |   |
|                                     |  View Booking Details →           |   |
|                                     +-----------------------------------+   |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  MESSAGES                                              [⋮ Menu]       |  |
|  |                                                                        |  |
|  |  ────────────── Today ──────────────                                  |  |
|  |                                                                        |  |
|  |  +-------------------------------------+                               |  |
|  |  |  Hi Sarah, I'm looking forward to   |                               |  |
|  |  |  meeting you on Wednesday!          |                               |  |
|  |  +-------------------------------------+                               |  |
|  |  Mary Thompson                                                        |  |
|  |  Today at 2:30 PM                                                     |  |
|  |                                                                        |  |
|  |                       +-------------------------------------+         |  |
|  |                       |  Thank you, Mary! I'm excited too. |         |  |
|  |                       |  Do you have any dietary            |         |  |
|  |                       |  restrictions I should know about?  |         |  |
|  |                       +-------------------------------------+         |  |
|  |                       Today at 2:45 PM              ✓✓ Read          |  |
|  |                                                                        |  |
|  |  +-------------------------------------+                               |  |
|  |  |  No dietary restrictions, thank you |                               |  |
|  |  |  for asking!                        |                               |  |
|  |  +-------------------------------------+                               |  |
|  |  Mary Thompson                                                        |  |
|  |  Today at 3:00 PM                                                     |  |
|  |                                                                        |  |
|  |  Mary is typing...                                                    |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  ⚠️  Don't share phone numbers or email until booking is accepted.    |  |
|  |     Messages are monitored for your safety.                           |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  [Type your message...]                                       250/1000|  |
|  |                                                                        |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                            [Send Message]   |
|                                                                              |
+------------------------------------------------------------------------------+
| About | How It Works | Safety | Terms | Privacy | Safeguarding | Contact    |
| © 2026 Platform Name. All rights reserved.                                  |
+------------------------------------------------------------------------------+
```

---

### 3.2 Desktop - Empty State (First Message)

```
+------------------------------------------------------------------------------+
|  [LOGO]           Dashboard   My Bookings   Messages              [USER▼]   |
+------------------------------------------------------------------------------+
|                                                                              |
|  Breadcrumb: Dashboard > Messages > Mary Thompson                           |
|                                                                              |
|  +--------------------------------+  +-----------------------------------+   |
|  |  [Photo]  Mary Thompson        |  |  ABOUT THIS CONVERSATION          |   |
|  |           Caregiver            |  |                                   |   |
|  |           ○ Offline            |  |  Booking #12345                   |   |
|  |           ✓ Identity  ✓ DBS    |  |  Wednesday, March 6 at 10:00 AM   |   |
|  |                                |  |  [REQUESTED]                      |   |
|  +--------------------------------+  |                                   |   |
|                                     |  View Booking Details →           |   |
|                                     +-----------------------------------+   |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  MESSAGES                                                              |  |
|  |                                                                        |  |
|  |                          💬                                            |  |
|  |                                                                        |  |
|  |              Start the conversation                                   |  |
|  |                                                                        |  |
|  |              Send a message to Mary to get started.                   |  |
|  |              Messages are monitored for your safety.                  |  |
|  |                                                                        |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  ⚠️  Don't share phone numbers or email until booking is accepted.    |  |
|  |     Messages are monitored for your safety.                           |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  [Type your message...]                                       0/1000  |  |
|  |                                                                        |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                            [Send Message]   |
|                                                                              |
+------------------------------------------------------------------------------+
```

---

### 3.3 Desktop - Contact Redaction Example

```
+------------------------------------------------------------------------------+
|  MESSAGES                                                                    |
|                                                                              |
|  +---------------------------------------------+                             |
|  |  Hi! Looking forward to Wednesday. My       |                             |
|  |  number is [REDACTED] if you need to reach  |                             |
|  |  me before then.                            |                             |
|  +---------------------------------------------+                             |
|  Mary Thompson                      ⚠️ Contact info removed for your safety |
|  Today at 2:30 PM                                                           |
|  Tooltip: "Phone numbers and email addresses are hidden until booking is    |
|  accepted. Contact Mary through this messaging system."                     |
|                                                                              |
+------------------------------------------------------------------------------+
```

---

### 3.4 Mobile (320px-767px) - Active Conversation

```
+--------------------------------------+
|  ← Back        Messages     [⋮ Menu] |
+--------------------------------------+
|                                      |
|  +--------------------------------+  |
|  |  [Photo]  Mary Thompson        |  |
|  |           Caregiver  ● Online  |  |
|  |           ✓ ID  ✓ DBS          |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  BOOKING                       |  |
|  |  #12345                        |  |
|  |  Wed, March 6 at 10:00 AM      |  |
|  |  [ACCEPTED]                    |  |
|  |  View Details →                |  |
|  +--------------------------------+  |
|                                      |
|  ──────────── Today ────────────     |
|                                      |
|  +------------------------------+    |
|  |  Hi Sarah, I'm looking       |    |
|  |  forward to meeting you!     |    |
|  +------------------------------+    |
|  Mary                                |
|  2:30 PM                             |
|                                      |
|       +---------------------------+  |
|       |  Thank you, Mary!         |  |
|       +---------------------------+  |
|       2:45 PM            ✓✓ Read     |
|                                      |
|  +------------------------------+    |
|  |  See you on Wednesday!       |    |
|  +------------------------------+    |
|  Mary                                |
|  3:00 PM                             |
|                                      |
|  Mary is typing...                   |
|                                      |
+--------------------------------------+
|  ⚠️ No phone/email until accepted   |
+--------------------------------------+
|  [Type your message...]       0/1000|
|                                      |
|                          [Send] →    |
+--------------------------------------+
```

---

### 3.5 Report Modal

```
+------------------------------------------------+
|  Report this conversation                  [X] |
+------------------------------------------------+
|                                                |
|  Please tell us why you're reporting this      |
|  conversation. Our safeguarding team will      |
|  review it within 24 hours.                    |
|                                                |
|  Reason *                                      |
|  [Inappropriate content          ▼]            |
|                                                |
|  Options:                                      |
|  - Inappropriate content                       |
|  - Attempted off-platform payment              |
|  - Contact information sharing violation       |
|  - Harassment or abuse                         |
|  - Suspected scam                              |
|  - Other safeguarding concern                  |
|                                                |
|  Additional details (optional)                 |
|  +------------------------------------------+  |
|  |                                          |  |
|  |                                          |  |
|  +------------------------------------------+  |
|  0 / 500 characters                            |
|                                                |
|  [Cancel]                    [Submit Report]   |
|                                                |
+------------------------------------------------+
```

---

## 4. Responsive Behavior

### 4.1 Breakpoints

| Viewport | Layout Changes | Priority |
|----------|----------------|----------|
| **Mobile** (320px-767px) | Single column, conversation header stacked, fixed message input at bottom | Conversation-first |
| **Tablet** (768px-1439px) | Single column, condensed conversation header | Balanced |
| **Desktop** (1440px+) | Two-column header (participant left, booking context right) | Full layout |

### 4.2 Layout Changes by Viewport

#### Desktop (1440px+)
- **Layout**: Two-column conversation header
  - Left: Participant card (photo, name, badges, online status)
  - Right: Booking context card (reference, date, status, link)
- **Message Container**: Centered, max-width 900px
- **Message Input**: Fixed at bottom, full width with max-width 900px

#### Tablet (768px-1439px)
- **Layout**: Single column, conversation header condensed
  - Participant card: Smaller photo (60x60px), inline badges
  - Booking context: Below participant, condensed format
- **Message Container**: Full width
- **Message Input**: Fixed at bottom

#### Mobile (320px-767px)
- **Layout**: Single column, stacked
  - Back button: Top left (← Back)
  - Participant card: Compact (40x40px photo, name + status only)
  - Booking context: Collapsible card (tap to expand)
- **Message Container**: Full height, scrollable
- **Message Input**: Fixed at bottom, full width
- **Contact Warning**: Condensed ("⚠️ No phone/email until accepted")

### 4.3 Touch Target Sizes

**Mobile Requirements**:
- Send button: **56px height**, full width
- Message bubbles: **44px minimum height** (tappable for context menu)
- Report button: **48x48px** minimum
- Booking context link: **44px height**
- Menu icon: **48x48px**

---

## 5. UI States

### 5.1 Loading State

**Initial Page Load**:
```
+------------------------------------------------------------------------------+
|  [LOGO]           Dashboard   My Bookings   Messages              [USER▼]   |
+------------------------------------------------------------------------------+
|                                                                              |
|  Breadcrumb: Dashboard > Messages > Loading...                              |
|                                                                              |
|  [Loading skeleton - Conversation header]                                   |
|  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░         |
|                                                                              |
|  [Loading skeleton - Messages]                                              |
|  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░         |
|                                                                              |
+------------------------------------------------------------------------------+
```

**Sending Message**:
- Send button: "Sending..." (disabled, loading spinner)
- Message appears in list with "⏳ Sending..." status
- On success: Status changes to "✓ Sent"

### 5.2 Empty States

**No Messages** (shown above in 3.2)

**Conversation Blocked**:
```
+------------------------------------------------------------------------+
|      ⚠️  This conversation is blocked                                  |
|                                                                        |
|      You have blocked this user. You can no longer send or receive    |
|      messages. Your booking is not affected.                          |
|                                                                        |
|      [Unblock User]                                                   |
+------------------------------------------------------------------------+
```

**Conversation Archived** (after booking completed >30 days):
```
+------------------------------------------------------------------------+
|      ℹ️  This conversation is archived                                 |
|                                                                        |
|      This booking was completed more than 30 days ago. You can view   |
|      messages but cannot send new ones.                               |
|                                                                        |
|      [View Booking Details]                                           |
+------------------------------------------------------------------------+
```

### 5.3 Error States

**Failed to Load Conversation**:
```
+------------------------------------------------------------------------+
| ⚠️  Unable to load messages                                             |
|     We couldn't retrieve this conversation. Please try again or        |
|     contact support.                                                   |
|                                                         [Try Again]    |
+------------------------------------------------------------------------+
```

**Failed to Send Message**:
```
Message appears with:
                       +-------------------------------------+
                       |  Message text here                  |
                       +-------------------------------------+
                       ⚠️ Failed to send                [Retry]
```

**Contact Redaction Warning**:
```
+------------------------------------------------------------------------+
| ⚠️  Contact information removed                                         |
|     Phone numbers and email addresses are hidden until your booking   |
|     is accepted. Messages are monitored for your safety.              |
+------------------------------------------------------------------------+
```

### 5.4 Success States

**Report Submitted**:
```
+------------------------------------------------+
|                                                |
|      ✅  Report Submitted                      |
|                                                |
|      Thank you for reporting. Our safeguarding |
|      team will review this conversation within |
|      24 hours and take appropriate action.     |
|                                                |
|      Report ID: #SAF-12345                     |
|                                                |
|           [OK]                                 |
|                                                |
+------------------------------------------------+
```

**User Blocked**:
```
+------------------------------------------------+
|                                                |
|      ✅  User Blocked                          |
|                                                |
|      You will no longer receive messages from  |
|      this user. Your existing booking is not   |
|      affected.                                 |
|                                                |
|           [OK]                                 |
|                                                |
+------------------------------------------------+
```

---

## 6. Accessibility Requirements

### 6.1 WCAG 2.1 AA Compliance

#### Perceivable

- **Text Alternatives**:
  - ✅ Profile photos: alt text "[Name] profile photo"
  - ✅ Status indicators: Text + icon ("● Online" not just green dot)
  - ✅ Read receipts: "Read" or "Sent" text alongside checkmark icons

- **Distinguishable**:
  - ✅ Color contrast: 4.5:1 for message text, 3.0:1 for backgrounds
  - ✅ Message alignment: Visual (left/right) + semantic (sender name always shown)
  - ✅ Online status: Text + color (not color alone)
  - ✅ Font sizes: 16px minimum for message text
  - ✅ Message bubbles: 8px border radius, 16px padding

#### Operable

- **Keyboard Accessible**:
  - ✅ Tab order: Conversation header → Message list → Textarea → Send button → Report button
  - ✅ Enter key: Send message
  - ✅ Shift+Enter: New line in textarea
  - ✅ Arrow keys: Scroll message list
  - ✅ Escape: Close modals (report, block)

- **Navigable**:
  - ✅ Skip to main content link
  - ✅ Page title: "[Platform Name] - Messages with [Participant Name]"
  - ✅ Heading hierarchy: H1 (participant name) → H2 (section headings)
  - ✅ Landmark regions: `<header>`, `<main role="log">`, `<footer>`

#### Understandable

- **Readable**:
  - ✅ Language declared: `<html lang="en-GB">`
  - ✅ Clear labels: "Send Message" not "Send"
  - ✅ Contact warning: Plain language explanation
  - ✅ Error messages: Specific ("Failed to send message. Please try again.")

- **Predictable**:
  - ✅ Consistent navigation (header/footer same across all screens)
  - ✅ New messages always append at bottom (chronological)
  - ✅ Auto-scroll to bottom on new message (user can scroll up to override)

- **Input Assistance**:
  - ✅ Textarea placeholder: "Type your message..."
  - ✅ Character counter: "250 / 1000" (shown when >700 characters)
  - ✅ Contact warning: Preventative guidance before user types

#### Robust

- **Compatible**:
  - ✅ Valid HTML5 semantic markup
  - ✅ ARIA roles: `role="log"` for message container (live region), `role="status"` for typing indicator
  - ✅ Screen reader announcements: New messages announced via `aria-live="polite"`

### 6.2 Focus Order

**Tab Order** (Desktop):
1. Skip to main content link
2. Header navigation
3. User profile dropdown
4. Breadcrumb links
5. **Conversation Header**:
   - "View Booking Details" link
   - Menu icon (report/block dropdown)
6. **Message List**:
   - Focusable for keyboard scrolling (arrow keys)
   - Individual messages not focusable (read-only)
7. **Message Input**:
   - Textarea (primary focus on page load)
   - Send button
8. Footer links

### 6.3 Screen Reader Announcements

**Page Load**:
- "Messages with [Participant Name]. [Role]. [Online/Offline]. [N] messages loaded."

**New Message Received**:
- `aria-live="polite"`: "[Sender Name] says: [Message text]"

**Typing Indicator**:
- `aria-live="polite"`: "[Participant Name] is typing"

**Message Sent**:
- `role="status"`: "Message sent"

**Contact Redaction**:
- "Contact information removed for your safety. Phone numbers and email addresses are hidden until booking is accepted."

**Report Submitted**:
- `role="alert"`: "Report submitted. Our safeguarding team will review this conversation within 24 hours."

### 6.4 Elderly User Considerations

**Cognitive Load Reduction**:
- ✅ Chronological message order (newest at bottom, familiar pattern)
- ✅ Date dividers for context ("Today", "Yesterday")
- ✅ Booking context always visible (reminder of conversation purpose)
- ✅ Contact warning prominent (prevent accidental violations)

**Vision Support**:
- ✅ Large message text (16px minimum)
- ✅ High contrast message bubbles (own: light blue on white, other: light gray on white)
- ✅ Large send button (56px height on mobile)
- ✅ Clear visual distinction between own/other messages (alignment + color)

**Motor Control**:
- ✅ Large touch targets (48x48px minimum)
- ✅ Fixed message input (always accessible, no scrolling)
- ✅ Enter key to send (no precise button click required)

**Trust & Safety**:
- ✅ Contact warning prominent (yellow banner)
- ✅ Report button easily accessible (menu icon)
- ✅ Booking context link visible (quick access to booking details)
- ✅ Moderation notice: "Messages are monitored for your safety"

---

## 7. Navigation & Interactions

### 7.1 Primary User Flows

**Flow 1: Send First Message**
1. User lands on conversation (from booking detail "Message Caregiver")
2. Empty state displayed: "Start the conversation"
3. Booking context visible (reference, date, status)
4. Contact warning banner shown (if status = requested)
5. User types message in textarea
6. User clicks "Send" or presses Enter
7. Message sent → Appears at bottom with "✓ Sent" status
8. System sends email notification to recipient

**Flow 2: Receive and Reply to Message**
1. User receives email notification: "New message from [Participant Name]"
2. User clicks "View Message" link → Login (if not authenticated) → Load conversation
3. New message visible at bottom
4. User reads message
5. Read receipt sent to sender ("✓✓ Read")
6. User types reply
7. User sends reply → Appears at bottom

**Flow 3: Contact Redaction Triggered**
1. User types message including phone number or email
2. User sends message
3. System detects contact information (regex: phone patterns, email patterns)
4. System redacts contact info: "Hi! My number is [REDACTED]"
5. Message displayed with redaction alert: "⚠️ Contact info removed for your safety"
6. Recipient sees redacted message
7. Contact warning banner remains visible

**Flow 4: Report Conversation**
1. User sees inappropriate message
2. User clicks menu icon (⋮) → "Report Conversation"
3. Report modal opens
4. User selects reason: "Inappropriate content"
5. User adds details (optional): "This message contains offensive language"
6. User clicks "Submit Report"
7. System creates safeguarding report (REP-SAF-XXXXX)
8. System notifies safeguarding team
9. Success modal: "Report submitted. Review within 24 hours."
10. Conversation remains accessible (not auto-blocked)

**Flow 5: Block User**
1. User clicks menu icon → "Block User"
2. Confirmation modal: "Block [Participant Name]?"
3. Warning: "You will no longer receive messages. Booking not affected."
4. User confirms
5. System blocks user in both directions
6. Conversation locked (no new messages)
7. Success modal: "User blocked"
8. Conversation displayed with "This conversation is blocked" banner

### 7.2 Alternative Paths

**Path A: Typing Indicator**
1. User A starts typing in textarea
2. System sends typing event to user B (via WebSocket)
3. User B sees "User A is typing..." at bottom of message list
4. User A stops typing (3 seconds idle)
5. Typing indicator disappears

**Path B: Auto-Archive After 30 Days**
1. Booking completed on March 6
2. 30 days pass (April 5)
3. System auto-archives conversation
4. User visits conversation → "This conversation is archived" banner
5. Messages visible (read-only), no new messages allowed

**Path C: Message Fails to Send**
1. User sends message
2. Network error or server error
3. Message appears with "⚠️ Failed to send" status
4. Retry button displayed
5. User clicks "Retry" → Message sent successfully

### 7.3 Interaction Patterns

**Auto-Scroll Behavior**:
- On page load: Scroll to bottom (newest message visible)
- On new message received: Auto-scroll to bottom (if user is near bottom)
- If user scrolled up: Show "New messages ↓" button to scroll to bottom
- Mobile: Keyboard open → Auto-scroll to keep textarea visible

**Read Receipts**:
- Sent when user opens conversation and message is in viewport
- Debounced (500ms) to avoid multiple sends
- Only sent once per message
- Visible to sender: "✓ Sent" → "✓✓ Read" transition

**Typing Indicator**:
- Triggered after 300ms of typing (debounce)
- Cleared after 3 seconds of inactivity
- Not stored in database (ephemeral WebSocket event)
- Accessible: `aria-live="polite"` announcement

**Contact Redaction**:
- Automated regex patterns:
  - UK phone: `07\d{3}\s?\d{6}` or `\+44\s?7\d{3}\s?\d{6}`
  - Email: `\S+@\S+\.\S+`
- Redaction: Replace matched text with `[REDACTED]`
- Alert displayed: "⚠️ Contact info removed for your safety"
- Both users see redacted version

---

## 8. Content Moderation & Safeguarding

### 8.1 Automated Content Filtering

**Contact Information Redaction** (REQ-MSG-009):
- Phone numbers (UK mobile and landline)
- Email addresses
- Redaction occurs before message storage
- Both sender and recipient see redacted version

**Prohibited Content Detection** (REQ-MSG-010):
- Profanity and offensive language
- Suspected payment requests ("send £50 to...")
- Suspicious URLs (non-platform links)
- Flagged messages sent to admin review queue
- User notified: "Your message is under review"

### 8.2 User Reporting Mechanism (REQ-MSG-011)

**Report Reasons**:
1. Inappropriate content
2. Attempted off-platform payment
3. Contact information sharing violation
4. Harassment or abuse
5. Suspected scam
6. Other safeguarding concern

**Report Process**:
1. User submits report via modal
2. System creates safeguarding record (REP-SAF-XXXXX)
3. Admin team notified (Slack + email)
4. Review within 24 hours
5. Actions: Warning, account suspension, conversation lock, police referral

### 8.3 Admin Oversight (REQ-MSG-013)

**Admin Access**:
- All conversations accessible via admin dashboard
- Flagged conversations prioritized
- Conversation search by user, booking ID, keywords
- Read-only access (admins cannot send messages as users)

**Safeguarding Actions**:
- Lock conversation (no new messages)
- Suspend user account
- Flag for police referral (Care Act 2014 duty to report)
- Send warning message to user

---

## 9. Design Notes

### 9.1 Design Principles Applied

**1. Safety-First Design**
- Contact warning banner prominent (yellow, top of input area)
- Report button always accessible (menu icon)
- Redaction automatic (user doesn't need to self-moderate)
- Moderation notice: "Messages are monitored for your safety"

**2. Clarity & Context**
- Booking context always visible (reference, date, status)
- Participant info prominent (name, role, online status)
- Date dividers for temporal context
- System messages explain status changes

**3. Familiar Messaging Patterns**
- Chronological ordering (newest at bottom)
- Own messages right-aligned, other left-aligned
- Read receipts ("✓✓ Read")
- Typing indicators ("[Name] is typing...")
- Familiar to users from WhatsApp, iMessage

**4. Accessibility First**
- Message list as `role="log"` (live region)
- Keyboard navigation (Enter to send, arrow keys to scroll)
- Screen reader announcements for new messages
- High contrast message bubbles

**5. Elderly-Friendly**
- Large text (16px minimum)
- Large send button (56px height on mobile)
- Fixed message input (no scrolling to access)
- Booking context reminder (prevents disorientation)

### 9.2 Content Hierarchy

**Visual Hierarchy**:
1. **Conversation Header** (top): Participant + booking context
2. **Messages Container** (center): Chronological conversation
3. **Contact Warning** (above input): Safety reminder
4. **Message Input** (bottom): Fixed, always accessible

**Information Priority**:
- Participant name and online status (top left)
- Booking context link (top right)
- New messages (bottom of list, auto-scroll)
- Send button (primary CTA, fixed)

### 9.3 Color & Status Indicators

**Message Bubble Colors**:
| Type | Background | Text | Border |
|------|------------|------|--------|
| Own message | Light blue (#E0F2FE) | Black (#1F2937) | None |
| Other message | Light gray (#F3F4F6) | Black (#1F2937) | None |
| System message | Yellow (#FEF3C7) | Black (#1F2937) | None |

**Status Colors**:
| Status | Color | Icon |
|--------|-------|------|
| Online | Green (#10B981) | ● |
| Offline | Gray (#6B7280) | ○ |
| Typing | Blue (#3B82F6) | ... (animated) |
| Sent | Gray (#6B7280) | ✓ |
| Read | Blue (#3B82F6) | ✓✓ |

**Component Reuse**:
- Message bubbles: MESSAGE-BUBBLE component (new)
- Typing indicator: TYPING-INDICATOR component (new)
- User avatar: USER-AVATAR component
- Status badge: STATUS-BADGE component
- Modal: MODAL component

### 9.4 Typography Scale

**Recommended Sizes**:
- **Participant name** (H2): 20px (desktop), 18px (mobile)
- **Message text**: 16px (all viewports)
- **Timestamp**: 14px (gray)
- **Contact warning**: 14px (bold)
- **Button text**: 16px (send button)
- **Helper text**: 14px (character counter)

**Font Weights**:
- **Participant name**: Semibold (600)
- **Message text**: Regular (400)
- **Timestamp**: Regular (400)
- **Send button**: Semibold (600)

### 9.5 Spacing & Layout

**Section Spacing**:
- Conversation header to messages: 24px
- Messages to contact warning: 16px
- Contact warning to input: 8px
- Message bubbles: 12px vertical gap
- Own/other message transition: 20px vertical gap

**Message Bubble Padding**:
- Horizontal: 16px
- Vertical: 12px
- Border radius: 8px

**Input Area**:
- Textarea padding: 16px
- Textarea to send button: 12px
- Send button height: 48px (desktop), 56px (mobile)

### 9.6 New Components Introduced

1. **MESSAGE-BUBBLE**: Own, other, system variants with alignment, background, timestamp
2. **TYPING-INDICATOR**: Animated three-dot display with sender name
3. **DATE-DIVIDER**: Centered gray divider with date text
4. **CONTACT-WARNING-BANNER**: Yellow banner with icon and safety message
5. **CONVERSATION-HEADER**: Participant + booking context two-column layout
6. **MESSAGE-INPUT**: Textarea with character counter and send button

---

## 10. Cross-References

### Source Documents

**Feature Specifications**:
- `/docs/product/features/tier1-messaging-specification.md` - Complete messaging system requirements (REQ-MSG-001 to REQ-MSG-013)

**Screen Inventory**:
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` - SCR-CR-011 details (lines 885-951)

**Route Map**:
- `/docs/product/tier1-route-map.md` - SCR-CR-011 route definition and RBAC

**User Flows**:
- `/docs/tiers/tier1/draft-design-specs/user-flows/care-receiver-first-booking.md` - Messaging context in booking flow

**Components**:
- `/docs/tiers/tier1/draft-design-specs/components/dashboard-shared-components.md` - Shared component specs

**Related Screens**:
- SCR-CR-008: Booking Detail (Care Receiver) - Entry point via "Message Caregiver"
- SCR-CG-013: Booking Request Detail (Caregiver) - Entry point via "Message Care Receiver"
- SCR-PUB-008: Safeguarding Policy - Exit point via "View Safeguarding Policy"
- SCR-ADM-014: Safeguarding Reports Queue - Admin view of reported conversations

---

## 11. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-11 | UX Designer | Initial wireframes for messaging thread screen |

---

**END OF DOCUMENT**

**Status**: ✅ READY FOR FIGMA HANDOFF

**Next Steps**:
1. Figma designer creates high-fidelity mockups for message bubbles and input area
2. Visual design applies brand colors to message bubbles (own vs other)
3. Interactive prototype for typing indicator and read receipts (WebSocket simulation)
4. Engineering handoff with WebSocket event specifications and contact redaction regex patterns
