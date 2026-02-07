# Tier 1 Messaging System Specification

**Document Purpose**: Comprehensive specification for the Tier 1 messaging system enabling secure communication between care receivers, family members, and caregivers on the UK elderly care marketplace.

**Document Owner**: Product Team
**Created**: 2026-02-06
**Status**: ACTIVE
**Tier**: Tier 1 (Companionship MVP)

---

## Table of Contents

1. [Overview](#1-overview)
2. [User Stories](#2-user-stories)
3. [Message Types](#3-message-types)
4. [Conversation Threads](#4-conversation-threads)
5. [Pre-Booking Inquiries](#5-pre-booking-inquiries)
6. [Booking-Linked Messages](#6-booking-linked-messages)
7. [Contact Information Protection](#7-contact-information-protection)
8. [Content Moderation](#8-content-moderation)
9. [Notification System](#9-notification-system)
10. [Read Receipts & Real-Time Features](#10-read-receipts--real-time-features)
11. [Admin Oversight](#11-admin-oversight)
12. [Data Requirements](#12-data-requirements)
13. [Edge Cases](#13-edge-cases)
14. [Acceptance Criteria](#14-acceptance-criteria)
15. [Out of Scope](#15-out-of-scope)

---

## 1. Overview

### 1.1 Purpose

The Tier 1 messaging system provides secure, monitored communication between care receivers (and their families) and caregivers throughout the booking lifecycle. The system is designed to:

- Facilitate coordination and relationship building before, during, and after bookings
- Protect vulnerable adults through content moderation and admin oversight
- Prevent off-platform transactions that bypass safeguarding measures
- Maintain an audit trail for safeguarding investigations
- Enable families to stay informed about care arrangements

### 1.2 Scope

**Messaging Capabilities at Tier 1:**
- Text-only messages (2000 character limit per message)
- Booking-linked conversation threads
- Pre-booking inquiries (before booking request submitted)
- Automated system messages for booking state changes
- Real-time message delivery (WebSocket with polling fallback)
- Email notifications for new messages
- Message reporting mechanism for safety concerns

**NOT Available at Tier 1:**
- File attachments or photo sharing (deferred to post-launch)
- Video/audio messages (deferred to Tier 3)
- Group messaging (deferred to Tier 4 - care coordination)
- Message editing or deletion (immutable for safeguarding)
- Voice/video calling (out of scope for platform)

### 1.3 Tier 1 Constraints

**Data Protection:**
- Messages contain standard personal data only (no medical/health data)
- Contact information automatically redacted before delivery
- All messages retained for 2 years after last booking (safeguarding evidence)
- Messages cannot be deleted by users (immutable audit trail)

**Safeguarding Requirements:**
- All messages visible to admin team (safeguarding oversight)
- Automated content filtering for prohibited keywords
- Manual moderation triggers for flagged content
- Instant admin alerts for serious safeguarding concerns

**Platform Model:**
- Messages must keep transactions on-platform (Introduction Agency model)
- Off-platform payment requests trigger immediate account suspension
- Contact sharing only after booking accepted (prevents circumvention)

---

## 2. User Stories

### 2.1 Care Receiver / Family Member Stories

**US-MSG-CR-01: Inquire Before Booking**
- **As a** care receiver or family member
- **I want to** message a caregiver before requesting a booking
- **So that** I can ask questions and assess compatibility before committing

**US-MSG-CR-02: Coordinate Booking Details**
- **As a** care receiver or family member
- **I want to** message the caregiver after booking is accepted
- **So that** I can coordinate arrival time, parking, and specific preferences

**US-MSG-CR-03: Receive Real-Time Responses**
- **As a** care receiver or family member
- **I want to** see when the caregiver is typing and receive messages in real-time
- **So that** I can have a natural conversation and plan accordingly

**US-MSG-CR-04: Get Notified of Messages**
- **As a** care receiver or family member
- **I want to** receive email notifications when I have a new message
- **So that** I don't miss important communications even when not logged in

**US-MSG-CR-05: Report Inappropriate Messages**
- **As a** care receiver or family member
- **I want to** report messages that make me uncomfortable or seem unsafe
- **So that** the platform can investigate and protect me

**US-MSG-CR-06: View Message History**
- **As a** care receiver or family member
- **I want to** view all past messages with each caregiver
- **So that** I can reference previous conversations and commitments

**US-MSG-CR-07: Message Multiple Caregivers**
- **As a** care receiver or family member
- **I want to** inquire with multiple caregivers simultaneously
- **So that** I can compare responses and find the best match

### 2.2 Caregiver Stories

**US-MSG-CG-01: Respond to Inquiries Efficiently**
- **As a** caregiver
- **I want to** quickly respond to care receiver inquiries
- **So that** I can convert inquiries into bookings and grow my client base

**US-MSG-CG-02: Use Message Templates**
- **As a** caregiver
- **I want to** create and use message templates for common questions
- **So that** I can respond quickly without typing the same information repeatedly

**US-MSG-CG-03: Confirm Booking Details**
- **As a** caregiver
- **I want to** message the care receiver after accepting a booking
- **So that** I can confirm arrival time, ask about parking, and introduce myself

**US-MSG-CG-04: Set Availability Expectations**
- **As a** caregiver
- **I want to** communicate my response time expectations
- **So that** care receivers know when to expect a reply

**US-MSG-CG-05: Report Concerning Messages**
- **As a** caregiver
- **I want to** report messages that request off-platform payments or seem suspicious
- **So that** the platform can investigate and protect me from exploitation

**US-MSG-CG-06: Follow Up After Bookings**
- **As a** caregiver
- **I want to** message care receivers after completed bookings
- **So that** I can maintain relationships and encourage repeat bookings

### 2.3 Admin Stories

**US-MSG-AD-01: Monitor All Conversations**
- **As an** admin
- **I want to** view all message threads across the platform
- **So that** I can identify safeguarding concerns and policy violations

**US-MSG-AD-02: Investigate Reported Messages**
- **As an** admin
- **I want to** view full conversation context when a message is reported
- **So that** I can make informed decisions about warnings, suspensions, or escalations

**US-MSG-AD-03: Detect Off-Platform Payment Requests**
- **As an** admin
- **I want to** automatically flag messages containing payment-related keywords
- **So that** I can quickly investigate and prevent financial exploitation

**US-MSG-AD-04: View Message Statistics**
- **As an** admin
- **I want to** see metrics on message volume, response times, and flagged content
- **So that** I can identify patterns and improve platform safety

**US-MSG-AD-05: Send Platform Announcements**
- **As an** admin
- **I want to** send messages to users directly or broadcast announcements
- **So that** I can communicate policy changes, safety guidance, and platform updates

---

## 3. Message Types

### 3.1 User-to-User Messages

**Type: Standard Text Message**
- Sent by care receivers, family members, or caregivers
- Maximum length: 2000 characters
- Plain text only (no rich formatting at Tier 1)
- Delivered in real-time or via polling
- Persisted permanently in database
- Cannot be edited or deleted after sending

**Content Rules:**
- Must pass profanity filter (configurable word list)
- Contact information automatically redacted (email, phone, address patterns)
- Off-platform payment keywords flagged for admin review
- Safeguarding keywords trigger immediate admin alert

**Character Count:**
- Live character counter displayed while typing
- Warning at 1900 characters: "200 characters remaining"
- Disabled submit button if exceeds 2000 characters
- Multi-line messages supported (line breaks preserved)

### 3.2 System Messages

System messages are automated messages triggered by booking state changes. They appear in the conversation thread but are clearly marked as system-generated.

**Type: Booking Request Sent (to Caregiver)**
```
System: [Care Receiver Name] has sent you a booking request for [Date] at [Time].
You have 24 hours to accept or decline this request.
[View Booking Request]
```

**Type: Booking Accepted (to Care Receiver)**
```
System: [Caregiver Name] has accepted your booking request for [Date] at [Time].
Your payment has been processed and is held in escrow until the service is completed.
[View Booking Details]
```

**Type: Booking Declined (to Care Receiver)**
```
System: [Caregiver Name] has declined your booking request.
Reason: [Decline Reason]
[Optional Message from Caregiver]
Your payment authorization has been released. You can search for another caregiver.
```

**Type: Booking Cancelled (to Both Parties)**
```
System: This booking for [Date] at [Time] has been cancelled by [User Name].
Reason: [Cancellation Reason]
Refund: [Refund Amount] will be processed within 5-10 business days.
```

**Type: Booking Reminder (24 Hours Before)**
```
System: Reminder - Your booking with [Counterparty Name] is tomorrow at [Time].
Address: [Full Address]
Emergency Contact: [Name] [Phone]
[View Booking Details]
```

**Type: Booking Completed (to Care Receiver)**
```
System: [Caregiver Name] has marked your booking as complete.
Please confirm the service was provided as expected within 48 hours.
[Confirm Completion] [Report Issue]
```

**Type: Payment Released (to Caregiver)**
```
System: Payment for booking #[ID] has been released and will appear in your bank account within 2-3 business days.
Earnings: £[Amount]
[View Transaction]
```

**System Message Characteristics:**
- Clearly labeled with "System:" prefix
- Displayed in distinct visual style (e.g., grey background, system icon)
- Cannot be replied to directly (but users can send follow-up messages in thread)
- Included in message history and search
- Counted in unread message badges

### 3.3 Admin Messages

Admin messages are sent by platform administrators for moderation, support, or announcements.

**Type: Admin Warning**
```
Admin: We've noticed that your recent messages violate our Community Guidelines.
Please review our policies: [Link]
Continued violations may result in account suspension.
```

**Type: Admin Resolution Communication**
```
Admin: We've reviewed your dispute regarding booking #[ID].
Decision: [Outcome]
Rationale: [Brief explanation]
If you have questions, please reply to this message.
```

**Type: Platform Announcement**
```
Admin: Important Update - New Safety Features Available
We've added enhanced verification options for caregivers. Learn more: [Link]
```

**Admin Message Characteristics:**
- Clearly labeled with "Admin:" prefix and platform logo
- High-priority notification (email + in-app alert)
- Users can reply directly to admin (creates support ticket)
- Logged in admin audit trail
- Visible to other admins for continuity

---

## 4. Conversation Threads

### 4.1 Thread Structure

**Definition:**
A conversation thread is a sequence of messages between a care receiver (or family member) and a caregiver. Threads are organized by relationship and optionally linked to specific bookings.

**Thread Types:**

**Type 1: Pre-Booking Inquiry Thread**
- Created when care receiver sends first message to caregiver (before booking request)
- NOT linked to a booking (exploratory conversation)
- Remains accessible indefinitely
- Converted to booking-linked thread if care receiver requests a booking

**Type 2: Booking-Linked Thread**
- Created when booking request is submitted OR when first message sent after acceptance
- Permanently linked to specific booking ID
- Displays booking details at top of thread (date, time, service types)
- Thread status mirrors booking status (requested, accepted, completed, etc.)
- Archived after booking completion but remains searchable

**Thread Hierarchy:**
- Care receiver can have multiple threads with same caregiver (one per booking + general inquiry thread)
- Threads are grouped by caregiver in message inbox UI
- Most recent thread per caregiver displayed first
- Unread message count shown per thread and per caregiver

### 4.2 Thread Lifecycle

**Creation:**
- Pre-booking inquiry thread: Created when care receiver sends first message before booking
- Booking-linked thread: Created when booking request submitted

**Active State:**
- Both parties can send messages
- Real-time delivery (or polling)
- Unread message badges increment
- Notifications sent per user preferences

**Archived State:**
- Booking completed and reviewed (terminal state reached)
- Thread moves to "Archived" section of inbox
- Still fully accessible and searchable
- No notifications for new messages (rare for archived threads)
- Admin can un-archive if investigation needed

**Deleted State (GDPR):**
- User requests account deletion
- Personal identifiers in messages anonymized (replaced with "User #123456")
- Message content retained for safeguarding audit
- Thread structure maintained for analytics (anonymized)

### 4.3 Thread Permissions

**Who Can Message:**

**Pre-Booking Inquiry Thread:**
- Care receiver or family member (initiator): Always
- Caregiver: Only after receiving first message (cannot initiate to prevent spam)
- Admin: Always (for moderation or support)

**Booking-Linked Thread (Before Acceptance):**
- Care receiver or family member: Always
- Caregiver: After viewing booking request (enables Q&A before accepting)
- Admin: Always

**Booking-Linked Thread (After Acceptance):**
- Care receiver or family member: Always
- Caregiver: Always
- Admin: Always

**Booking-Linked Thread (After Completion):**
- Both parties: Always (for follow-up, thank you messages, repeat booking discussions)
- Admin: Always

**Blocked Users:**
- If either party is suspended or banned, messaging disabled
- Existing messages remain visible for admin review
- "This user is no longer available" message displayed

### 4.4 Thread Display & Sorting

**Inbox View:**
```
[Message Inbox]

Conversations (3 unread)

[Caregiver Profile Photo] Sarah Johnson
  Pre-booking inquiry
  "Yes, I'm available next Tuesday. I'd love to..."
  2 hours ago • UNREAD (2)

[Caregiver Profile Photo] James Smith
  Booking #12345 - Confirmed for Tomorrow 2pm
  "I'll bring my own cleaning supplies unless you..."
  Yesterday • READ

[Caregiver Profile Photo] Emma Williams
  Booking #12340 - Completed Jan 5
  "Thank you so much for the lovely afternoon!"
  5 days ago • READ
```

**Sort Options:**
- By most recent message (default)
- By unread messages (unread threads first)
- By upcoming booking date (soonest bookings first)
- By caregiver name (alphabetical)

**Filter Options:**
- All threads
- Unread only
- Booking-linked only
- Pre-booking inquiries only
- Archived threads

### 4.5 Message Thread Context Display

**Thread Header (Booking-Linked):**
```
[Back to Inbox]

Booking #12345
Sarah Johnson [Profile Link] [DBS Verified Badge]

Confirmed: Tuesday, Feb 7 at 2:00pm - 5:00pm (3 hours)
Services: Companionship, Light housework
Address: [Full address shown after acceptance]

[View Full Booking Details] [Report Concern]
```

**Thread Header (Pre-Booking):**
```
[Back to Inbox]

Conversation with Sarah Johnson [Profile Link] [DBS Verified Badge]

[Request Booking with Sarah] [Report Concern]
```

---

## 5. Pre-Booking Inquiries

### 5.1 Purpose & Flow

Pre-booking inquiries allow care receivers to ask questions and assess caregiver compatibility before committing to a booking request (which authorizes payment).

**User Journey:**

1. Care receiver searches caregivers and views profile
2. Care receiver clicks "Message [Caregiver]" button on profile
3. Message modal opens with pre-populated context: "You're messaging Sarah Johnson about companionship services in [Postcode]"
4. Care receiver types inquiry (e.g., "Are you available next Tuesday? Do you have experience with vision impairment?")
5. System creates pre-booking inquiry thread
6. Caregiver receives notification of new inquiry
7. Caregiver responds (e.g., "Yes, I'm available Tuesday! I worked with a visually impaired gentleman for 3 years...")
8. Care receiver evaluates response and decides whether to proceed with booking request
9. If care receiver requests booking, system prompts: "Continue this conversation in your booking?" → Yes creates booking-linked thread

**Benefits:**
- Reduces booking declines (caregiver can indicate availability/interest before formal request)
- Builds relationship and trust before payment commitment
- Allows care receiver to assess communication style
- Gives caregiver opportunity to ask clarifying questions (e.g., "How many hours are you thinking?")

### 5.2 Contact Protection in Pre-Booking

**Challenge**: Pre-booking inquiries happen before booking acceptance, so contact details must remain hidden to prevent off-platform transactions.

**Solution - Contact Redaction:**

All messages in pre-booking inquiry threads are scanned and redacted for:
- Email addresses (pattern: `[...]@[...].com` replaced with `[EMAIL REDACTED]`)
- Phone numbers (pattern: UK mobile/landline formats replaced with `[PHONE REDACTED]`)
- Addresses (pattern: postcodes, street names replaced with `[ADDRESS REDACTED]`)
- Social media handles (pattern: @username, facebook.com/[...] replaced with `[CONTACT INFO REDACTED]`)

**Redaction Examples:**

**Original Message:**
```
I'd love to work with you! You can call me on 07700 900123 or email sarah@example.com
I live near you at 123 Oak Street, SW1A 1AA.
```

**Delivered Message:**
```
I'd love to work with you! You can call me on [PHONE REDACTED] or email [EMAIL REDACTED]
I live near you at [ADDRESS REDACTED].
```

**User Education:**
- Tooltip on message box: "Contact information will be shared automatically when a booking is accepted. Please don't share personal details in messages."
- Warning displayed if redaction triggered: "We've removed contact information from your message. Contact details will be shared automatically after booking acceptance."

### 5.3 Inquiry Conversion to Booking

**Scenario 1: Care Receiver Proceeds with Booking After Inquiry**

1. Care receiver clicks "Request Booking" from message thread or caregiver profile
2. Booking request form pre-fills with context from messages (e.g., discussed date/time)
3. Booking request submitted
4. System prompts: "Would you like to continue your conversation with Sarah in your booking?"
   - [Yes, link this conversation] (default)
   - [No, start a new conversation]
5. If "Yes": Pre-booking messages copied into new booking-linked thread (message history preserved)
6. If "No": New booking-linked thread created (pre-booking thread remains separate)

**Scenario 2: Caregiver Suggests Booking in Message**

Caregiver message:
```
That sounds perfect! I'm available next Tuesday 2-5pm. Would you like to send me a booking request?
```

System detects inquiry → booking suggestion pattern and displays contextual action:
```
[Create Booking Request for Next Tuesday 2-5pm]
```

Care receiver clicks action → booking form pre-filled with suggested details.

### 5.4 Multiple Inquiry Management

**Care Receiver Perspective:**

Care receivers can message multiple caregivers simultaneously to compare options:

```
Active Conversations (5)

Sarah Johnson
  "Yes, I'm available Tuesday! I worked with a visually..."
  2 hours ago • UNREAD (1)

James Smith
  "I'd be happy to help! My rate is £22/hour for..."
  3 hours ago • READ

Emma Williams
  [No response yet]
  Yesterday • READ
```

**Workflow:**
1. Care receiver messages 5 caregivers from search results
2. Receives responses from 3 within 24 hours
3. Compares responses, rates, and profiles
4. Selects preferred caregiver and requests booking
5. Optionally sends polite message to other caregivers: "Thank you for your response. I've decided to book with another caregiver, but I appreciate your time!"

**Anti-Spam Measures:**
- Limit: 10 new inquiry threads per day (prevents spam/abuse)
- If limit exceeded: "You've reached your daily inquiry limit. Please wait 24 hours or request a booking with one of your existing conversations."
- Admin can adjust limit for verified users

**Caregiver Perspective:**

Caregivers receive multiple inquiries from different care receivers:

```
Inquiry Notifications (3 new)

Mary Thompson
  "I'm looking for companionship support on Wednesdays..."
  1 hour ago

John Davis
  "My mother needs help with light housework and..."
  2 hours ago

Susan Brown
  "Do you have experience with wheelchair users?"
  3 hours ago
```

**Caregiver Response Expectations:**
- Encouraged to respond within 24 hours (builds trust)
- Response time displayed on caregiver profile: "Usually responds within 4 hours"
- Slow response time may reduce inquiry volume (algorithm adjustment)

---

## 6. Booking-Linked Messages

### 6.1 Purpose & Timing

Booking-linked messages are tied to specific bookings and facilitate coordination throughout the booking lifecycle.

**Message Timing by Booking State:**

| Booking State | Primary Message Purpose | Common Topics |
|---------------|-------------------------|---------------|
| **Requested** | Q&A before caregiver acceptance | Clarifying service needs, availability confirmation, rate negotiation (if allowed) |
| **Accepted** | Coordination before session | Arrival time, parking instructions, access codes, special preferences |
| **In Progress** | Real-time updates (rare) | Running late, extending session, emergency communication |
| **Completed** | Post-service follow-up | Thank you messages, feedback, rebooking discussions |

### 6.2 Pre-Acceptance Messaging (Requested State)

**Scenario**: Caregiver receives booking request but has questions before accepting.

**Caregiver Inquiry:**
```
Caregiver: "Hi Mary, I've received your booking request for Tuesday 2-5pm.
I'd love to accept! Just to confirm - you mentioned light housework.
Are there any specific tasks you'd like me to focus on?"
```

**Care Receiver Response:**
```
Care Receiver: "Thank you! I'd appreciate help with dusting and vacuuming the living room.
I also have a few dishes in the sink if you have time."
```

**Caregiver Acceptance:**
```
Caregiver: "Perfect! That's no problem at all. I'm accepting your booking now.
I'll see you Tuesday at 2pm!"
```

**System Message (Automatic):**
```
System: Sarah Johnson has accepted your booking request for Tuesday, Feb 7 at 2:00pm.
```

**Benefits:**
- Reduces booking declines due to unclear service needs
- Builds rapport before in-person meeting
- Ensures caregiver is comfortable with requested tasks
- Gives care receiver confidence in caregiver's professionalism

### 6.3 Post-Acceptance Messaging (Accepted State)

**Common Scenarios:**

**Scenario 1: Arrival Coordination**

Care Receiver (24 hours before):
```
"Hi Sarah, just a reminder that parking is tight on our street.
There's a visitor space in front of #25 you're welcome to use.
Ring the doorbell and I'll meet you at the door!"
```

Caregiver:
```
"Thank you for letting me know! I'll plan to arrive a few minutes early
to find parking. Looking forward to meeting you tomorrow!"
```

**Scenario 2: Running Late**

Caregiver (10 minutes before start time):
```
"Hi Mary, I'm so sorry but I'm running about 10 minutes late due to traffic.
I'll be there as soon as possible!"
```

Care Receiver:
```
"No problem at all, Sarah. See you soon!"
```

System: No automated extension of booking duration. If care receiver wants to extend session to make up time, both parties must agree and care receiver contacts admin to adjust booking.

**Scenario 3: Special Requests**

Care Receiver:
```
"I forgot to mention - I have a small dog named Buster.
He's friendly but barks when new people arrive. Just wanted to give you a heads up!"
```

Caregiver:
```
"Thanks for letting me know! I love dogs, so that's no problem.
I'm looking forward to meeting Buster too!"
```

### 6.4 In-Progress Messaging (Rare)

Messaging during active sessions is uncommon (caregiver is with care receiver in person) but supported for specific situations:

**Emergency Communication:**
- Caregiver uses emergency button → System message sent to care receiver's emergency contact
- Family member can message caregiver to check in (e.g., "How is my mother doing?")

**Family Coordination:**
- Family member (not present) messages to coordinate: "I'll be arriving at 4:30pm if you need to leave then"

**Third-Party Coordination:**
- Care receiver messages family member: "Sarah is helping me with grocery shopping. We'll be back by 4pm"

**Platform Guidance:**
- Platform discourages in-progress messaging (caregiver's focus should be on care receiver)
- Emergency situations should use phone call or emergency button (faster than messaging)

### 6.5 Post-Completion Messaging

**Scenario 1: Thank You & Feedback**

Care Receiver (after session):
```
"Thank you so much, Sarah! My living room looks wonderful and I really
enjoyed our conversation about gardening. I'd love to book you again!"
```

Caregiver:
```
"It was my absolute pleasure, Mary! I had such a lovely time with you.
I'd be delighted to come back next week if you'd like!"
```

**Scenario 2: Rebooking Discussion**

Care Receiver:
```
"Are you available next Tuesday at the same time?"
```

Caregiver:
```
"Yes, I am! Would you like to send me a booking request?"
```

Care Receiver clicks [Request Booking] → booking form pre-fills with previous booking details.

**Scenario 3: Addressing Minor Issues**

Care Receiver:
```
"Everything was great, but I realized after you left that the vacuum wasn't
put back in the closet. No big deal, but wanted to mention it for next time!"
```

Caregiver:
```
"Oh, I'm so sorry about that! I must have forgotten in my rush to get to my
next booking. I'll make sure to be more thorough next time. Thank you for
letting me know!"
```

**System Integration:**
- Post-completion messages visible to admin (inform review moderation)
- Positive messages may prompt system suggestion: "Sarah seems like a great match! Book again?"
- Negative messages may prompt system: "Having issues? Report a concern or contact support"

---

## 7. Contact Information Protection

### 7.1 Why Contact Protection Matters

**Safeguarding Rationale:**
- Platform operates as Introduction Agency (caregivers are self-employed)
- Caregivers could circumvent platform and arrange direct payment (financial exploitation risk)
- Off-platform transactions bypass safeguarding measures (no booking records, payment escrow, admin oversight)
- Care Act 2014 requires platform to maintain duty of care even for self-employed caregivers

**Business Rationale:**
- Platform revenue depends on on-platform transactions
- Contact sharing before commitment enables "window shopping" without booking
- Early contact sharing reduces conversion from inquiry to booking

### 7.2 Contact Sharing Rules

**Stage 1: Pre-Booking Inquiry (Before Request Submitted)**
- Contact information HIDDEN from both parties
- Messages automatically redacted for email, phone, address, social media
- Redaction warning displayed to users if triggered

**Stage 2: Booking Requested (Awaiting Caregiver Response)**
- Contact information HIDDEN (booking not yet confirmed)
- Care receiver's full name and postcode visible to caregiver (for acceptance decision)
- Care receiver can see caregiver's full name and general location

**Stage 3: Booking Accepted**
- Contact information SHARED automatically
- Care receiver receives: Caregiver's full name, phone number, email (optional)
- Caregiver receives: Care receiver's full name, full address, phone number, emergency contact details
- System message confirms: "Contact information has been shared. You can now coordinate directly if needed."

**Stage 4: After Booking Completion**
- Contact information REMAINS SHARED
- Both parties can continue messaging on platform (encouraged)
- Platform cannot prevent off-platform contact at this stage (legal and practical limits)

**Rationale for Post-Acceptance Sharing:**
- Booking confirmed = both parties committed
- Payment captured in escrow (off-platform payment no longer viable for this booking)
- Practical necessity: Care receiver needs caregiver's phone for day-of coordination (running late, etc.)
- Safety: Care receiver's emergency contact needs caregiver's phone if incident occurs

### 7.3 Automated Contact Redaction

**Redaction Patterns (Regular Expressions):**

**Email Addresses:**
- Pattern: `\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b`
- Replacement: `[EMAIL REDACTED]`

**UK Phone Numbers:**
- Pattern: `\b(?:(?:\+44\s?|0)(?:\d{2}\s?\d{4}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4}|\d{4}\s?\d{6}))\b`
- Replacement: `[PHONE REDACTED]`

**UK Postcodes:**
- Pattern: `\b[A-Z]{1,2}\d{1,2}\s?\d[A-Z]{2}\b`
- Replacement: `[POSTCODE REDACTED]` (if not already visible)

**Street Addresses:**
- Pattern: `\b\d{1,5}\s[A-Za-z\s]+(?:Street|St|Road|Rd|Avenue|Ave|Lane|Ln|Drive|Dr|Close|Way)\b`
- Replacement: `[ADDRESS REDACTED]`

**Social Media:**
- Pattern: `@[A-Za-z0-9_]+` or `facebook\.com/[A-Za-z0-9.]+` or `instagram\.com/[A-Za-z0-9._]+`
- Replacement: `[SOCIAL MEDIA REDACTED]`

**Website URLs:**
- Pattern: `\bhttps?://[^\s]+\b`
- Replacement: `[LINK REDACTED]`

**Implementation:**
- Redaction applied server-side before message persisted to database
- Original unredacted message NOT stored (privacy and legal protection)
- Redaction log created (admin audit trail): "Message #12345 redacted: 1 email, 1 phone"
- User notification if redaction occurred: "Your message contained contact information that was removed. Contact details will be shared automatically after booking acceptance."

### 7.4 Manual Contact Sharing Workarounds (Abuse Prevention)

**Common Workarounds Users Attempt:**

**Numeric Spelling:**
```
"Call me on oh seven seven double oh nine double oh one two three"
```
Detection: NLP model detects number words → flags for manual review (not auto-redacted to avoid false positives)

**Character Separation:**
```
"Email me at sarah @ example . com"
```
Detection: Pattern still matches with spaces → redacted

**Visual Obfuscation:**
```
"My number is 0 7 7 0 0 9 0 0 1 2 3"
```
Detection: Pattern matches → redacted

**Spelling Out:**
```
"My email is sarah AT example DOT com"
```
Detection: Replace `AT` with `@` and `DOT` with `.` before pattern matching → redacted

**Requesting Off-Platform Contact:**
```
"Can you text me your number?"
```
Detection: Keyword "text" + "number" → flagged for admin review (suspicious intent)

**Offering Off-Platform Payment:**
```
"I can pay you directly in cash if you come"
```
Detection: Keywords "pay directly", "cash" → flagged for admin review + automatic warning to user

**Abuse Response:**
- First instance: Automated warning message: "Please keep all communication and payments on-platform. This ensures your safety and protection under our safeguarding policies."
- Second instance: Admin investigation + warning email
- Third instance: Account suspension (3-7 days) pending review
- Persistent abuse: Permanent ban (high risk of exploitation)

### 7.5 Contact Information Display After Acceptance

**Care Receiver View (After Acceptance):**
```
Booking #12345 - Confirmed

Caregiver Contact Information:
Full Name: Sarah Johnson
Phone: 07700 900123
Email: sarah.j@example.com (optional - caregiver can choose to hide)

[Call Sarah] [Send Email] [Message on Platform]
```

**Caregiver View (After Acceptance):**
```
Booking #12345 - Confirmed

Care Receiver Information:
Full Name: Mary Thompson
Address: 123 Oak Street, London, SW1A 1AA
Phone: 020 7946 0958
Email: mary.t@example.com

Emergency Contact:
Name: John Thompson (Son)
Phone: 07700 900456
Relationship: Son

[Call Mary] [Get Directions] [Message on Platform]
```

**Display Rules:**
- Contact information displayed prominently in booking detail page
- Contact information also shown in message thread header (quick access)
- Contact information remains visible after booking completion (for rebooking coordination)
- Contact information NOT displayed if booking cancelled before acceptance (prevents circumvention)

---

## 8. Content Moderation

### 8.1 Automated Content Filtering

**Filter Categories:**

**Category 1: Profanity & Abusive Language**
- Purpose: Maintain respectful communication, protect vulnerable adults from abuse
- Approach: Word list matching (configurable)
- Action: Replace with `***` or block message if severe
- User notification: "Your message contained language that violates our Community Guidelines. Please revise your message."

**Category 2: Off-Platform Payment Requests**
- Purpose: Prevent financial exploitation and maintain platform safety
- Keywords: "cash", "pay directly", "off-platform", "outside the app", "venmo", "paypal", "bank transfer", "avoid platform fee"
- Action: Block message immediately + create admin alert
- User notification: "Your message was blocked because it appeared to request off-platform payment. All payments must be processed through the platform for your protection."

**Category 3: Contact Information (See Section 7.3)**
- Purpose: Maintain introduction agency model, prevent early circumvention
- Action: Automatic redaction
- User notification: "Contact information will be shared automatically after booking acceptance."

**Category 4: Safeguarding Concerns**
- Purpose: Detect potential abuse, neglect, exploitation
- Keywords: "hurt", "hit", "scared", "threatened", "unsafe", "stole", "forced", "coerced"
- Action: Flag for immediate admin review + safeguarding alert
- User notification: None (silent flag to avoid alerting potential abuser)

**Category 5: Personal Health Information (Tier 1 Restriction)**
- Purpose: Avoid collecting special category health data at Tier 1
- Keywords: "dementia", "Alzheimer's", "Parkinson's", "diabetes", "medication", "doctor", "hospital", "diagnosis"
- Action: Allow message but flag for admin review (health data may trigger DPIA requirements)
- Admin notification: "Message contains health information. Confirm Tier 1 compliance."

### 8.2 Moderation Workflow

**Step 1: Automated Scan (Real-Time)**
```
User sends message
  ↓
Server receives message
  ↓
Apply content filters (profanity, contact info, keywords)
  ↓
  IF blocked → Reject message, notify user, log incident
  IF flagged → Deliver message, create admin alert, log flag
  IF clean → Deliver message, log normally
```

**Step 2: Admin Review Queue**

Flagged messages appear in admin moderation queue:

```
[Moderation Queue]

Priority: URGENT (Safeguarding keyword detected)
Message #12345 - 2 minutes ago
From: Mary Thompson (Care Receiver) → Sarah Johnson (Caregiver)
Flagged for: Safeguarding keyword ("scared")
Message: "I'm a bit nervous about trying a new caregiver. What if I'm
         scared and you're not there?"
Context: Pre-booking inquiry thread
Previous messages: [View Thread]

Admin Actions:
[No Action Required - False Positive] [Contact Care Receiver] [Escalate to Safeguarding Team]
```

**Step 3: Admin Decision**
- **False Positive**: Mark as reviewed, no action (e.g., "scared" used in benign context)
- **Policy Violation**: Warn user, document in account history
- **Serious Concern**: Escalate to safeguarding team, suspend account, contact authorities if needed

**Step 4: User Notification (If Applicable)**

Violation warning email:
```
Subject: Community Guidelines Violation - Message Review

Dear [User],

We've reviewed your recent message and determined it violated our Community Guidelines.

Violation: Off-platform payment request
Message: "[Redacted quote]"
Consequence: Official warning

Please review our Community Guidelines: [Link]

Future violations may result in account suspension or permanent ban.

If you believe this was a mistake, please reply to this email.

[Platform Name] Team
```

### 8.3 User Reporting Mechanism

**Report Button Placement:**
- "Report Message" button visible on every message (hover or long-press)
- "Report Conversation" button at top of thread (reports entire conversation)

**Report Flow:**

1. User clicks "Report Message" or "Report Conversation"
2. Modal opens with report categories:
   - Inappropriate language or harassment
   - Off-platform payment request
   - Safety concern (vulnerable adult at risk)
   - Spam or scam
   - Fake profile or identity fraud
   - Other (please describe)
3. User selects category and optionally adds details (500 char limit)
4. User submits report
5. Confirmation: "Thank you for reporting. We'll review this within 24 hours (urgent reports reviewed immediately)."
6. Admin receives notification in moderation queue (urgent reports trigger SMS/phone alert)

**Report Handling SLA:**
- Safety concerns: Immediate (within 1 hour)
- Off-platform payment: 4 hours
- Inappropriate language: 24 hours
- Other: 48 hours

**Reporter Anonymity:**
- Reported user does NOT see who reported (prevents retaliation)
- Admin sees reporter identity (investigation context)
- Reporter receives outcome notification: "We've reviewed your report and taken appropriate action. Thank you for helping keep our community safe."

### 8.4 False Positive Handling

**Challenge**: Automated filters flag benign messages, creating admin workload and user frustration.

**Mitigation Strategies:**

**1. Machine Learning Model Training:**
- Collect false positive feedback from admins
- Retrain NLP model monthly with labeled data
- Improve keyword context understanding (e.g., "hurt" in "my back hurt after gardening" vs. "he hurt me")

**2. Whitelist Common Phrases:**
- "I'm nervous" (acceptable anxiety expression)
- "Let me know if you need cash for shopping" (context: reimbursement for errands, not off-platform payment)
- Admin can add phrases to whitelist as false positives identified

**3. User Reputation Scoring:**
- Users with good history (no previous flags, positive reviews) = lower moderation threshold
- New users or users with warnings = higher sensitivity

**4. Admin Bulk Review:**
- Admin can mark multiple flags as false positives in batch
- Bulk action: "Dismiss all flags from [User] today" (if user's phrasing consistently triggers false positives)

### 8.5 Message Deletion Policy (Immutability)

**Core Principle**: Messages CANNOT be deleted or edited by users (safeguarding audit trail).

**Rationale:**
- Messages may be evidence in safeguarding investigations, disputes, or legal cases
- Allows users to delete incriminating messages = destroys audit trail
- Care Act 2014 requires maintaining records for vulnerable adult protection

**User Requests to Delete:**
- User: "I made a typo in my message. Can I edit it?"
- Response: "Messages cannot be edited or deleted to maintain a complete record for safety. You can send a follow-up message to clarify."

**Exception: Admin Removal**
- Admin CAN hide messages from user view (e.g., abusive message removed after report)
- Message remains in database and admin view (audit trail preserved)
- Replaced in user view with: "[This message was removed by admin for violating Community Guidelines]"

**GDPR Right to Erasure:**
- User account deletion → messages anonymized (name replaced with "User #123456")
- Message content retained (safeguarding requirement overrides right to erasure per GDPR Article 17(3)(e) - public interest in protection of vulnerable adults)

---

## 9. Notification System

### 9.1 Notification Types

**NT-001: New Message Notification**
- **Trigger**: User receives new message in any thread
- **Channels**: In-app (real-time), email (immediate), SMS (optional, if enabled)
- **Content**:
  - In-app: "[Sender Name] sent you a message"
  - Email: Subject: "New message from [Sender Name]", Body: Message preview (first 100 chars) + link to thread
  - SMS: "[Platform]: New message from [Sender]. View: [Link]"

**NT-002: Unread Message Reminder**
- **Trigger**: User has unread messages for 24 hours without opening
- **Channels**: Email only
- **Content**: "You have [X] unread messages from [Caregiver/Care Receiver Name]. View: [Link]"
- **Frequency**: Once per 24 hours per thread (not spammy)

**NT-003: Inquiry Response Reminder (Caregiver)**
- **Trigger**: Caregiver received inquiry but hasn't responded within 12 hours
- **Channels**: Email + in-app
- **Content**: "You have an unanswered inquiry from [Care Receiver Name]. Respond quickly to increase your booking chances!"

**NT-004: System Message Notification (Booking State Change)**
- **Trigger**: Booking state changes (accepted, declined, cancelled, completed, etc.)
- **Channels**: In-app + email (high priority)
- **Content**: Matches system message content (see Section 3.2)

**NT-005: Admin Message Notification**
- **Trigger**: Admin sends message to user
- **Channels**: In-app + email (high priority) + SMS (if urgent)
- **Content**: "Platform admin sent you an important message. View: [Link]"

**NT-006: Message Reported Confirmation**
- **Trigger**: User reports message
- **Channels**: In-app + email
- **Content**: "Thank you for reporting. We're reviewing your report and will take appropriate action."

### 9.2 Notification Delivery

**In-App Notifications:**
- Real-time delivery via WebSocket connection (if user online)
- Displayed as banner notification at top of screen: "[Sender Name] sent you a message"
- Click notification → navigates to message thread
- Notification badge on message icon in navigation: "🔔 (3)"

**Email Notifications:**
- Sent immediately upon message receipt (within 1 minute)
- Templated email with message preview and CTA: "View Message"
- Unsubscribe link at bottom (user can disable email notifications)
- Includes context: Booking-linked thread shows booking details, pre-booking inquiry shows caregiver/care receiver name

**SMS Notifications (Optional):**
- Disabled by default (SMS costs)
- User can enable in settings: "Send me SMS for urgent messages"
- Reserved for: Admin messages, emergency alerts, booking reminders
- Not sent for routine messages (would be spammy)

**Push Notifications (Mobile App - Future):**
- Native mobile push notifications (iOS/Android)
- Identical content to in-app notifications
- Delivered even when app closed

### 9.3 Notification Preferences

**User Settings:**

```
[Notification Preferences]

Message Notifications:
☑ Email me when I receive a new message
☐ Send SMS for urgent messages (optional)
☑ Send me daily digests of unread messages (instead of per-message emails)

Email Frequency:
○ Immediate (as messages arrive)
● Daily digest (once per day at 9am)
○ Weekly digest (Mondays at 9am)

Booking Notifications:
☑ Email me when booking is accepted/declined
☑ Send booking reminders 24 hours before
☐ Send SMS reminders (optional)

Admin & Safety:
☑ Email me for admin messages (cannot be disabled)
☑ Alert me to reported messages (requires response)

Do Not Disturb:
☑ Quiet hours: 10:00pm - 8:00am (no notifications during this time except emergencies)

[Save Preferences]
```

**Default Settings (New Users):**
- Email: Enabled for all message types
- SMS: Disabled (opt-in)
- Daily digest: Disabled (immediate notifications)
- Quiet hours: 10pm-8am

**Cannot Be Disabled:**
- Admin messages (safety and compliance)
- Emergency alerts (safeguarding)
- Account suspension/ban notifications

### 9.4 Notification Delivery Failures

**Scenario 1: Email Bounces**
- Stripe/SendGrid detects hard bounce (invalid email)
- System marks email as undeliverable
- In-app notification to user: "We couldn't send you email notifications. Please update your email address."
- Future email notifications paused until email updated

**Scenario 2: SMS Delivery Failure**
- Twilio reports failed SMS (invalid number, carrier block)
- System marks SMS as undeliverable
- In-app notification: "We couldn't send you SMS notifications. Please verify your phone number."
- SMS notifications disabled until number updated

**Scenario 3: User Email Full (Mailbox Quota)**
- Soft bounce detected
- System retries 3 times over 24 hours
- If still failing, in-app notification: "Your email inbox may be full. Check your email and free up space."

**Fallback Strategy:**
- If all notification channels fail, system creates high-priority in-app alert (red banner)
- Alert: "We couldn't reach you by email or SMS. Please check your notification settings."

---

## 10. Read Receipts & Real-Time Features

### 10.1 Read Receipts

**Definition**: Visual indicator showing whether recipient has read a message.

**Tier 1 Implementation: Basic Read Receipts**

**Read Status Indicators:**
- **Sent**: Message delivered to server (checkmark icon)
- **Delivered**: Message delivered to recipient's inbox (double checkmark icon)
- **Read**: Recipient opened thread containing message (blue double checkmark OR "Read at [timestamp]")

**Display Rules:**
- Sender sees read status below their sent message: "Read at 3:45pm"
- Recipient does NOT see read status on received messages (no "I saw this" indicator to sender)
- Read timestamp = when recipient opened thread (not when they literally read specific message)

**Privacy Control:**
- User can disable read receipts in settings: "Don't show when I've read messages"
- If disabled, sender sees "Delivered" status only (never "Read")
- Rationale: Some users feel pressured to respond immediately if sender knows they've read message

**Group Threads (Future - Out of Scope for Tier 1):**
- Multiple recipients (e.g., care receiver + 2 family members)
- Read receipt shows: "Read by 2 of 3 recipients"

### 10.2 Typing Indicators

**Definition**: Real-time indicator showing when counterparty is actively typing a message.

**Tier 1 Implementation: Basic Typing Indicator**

**Visual Display:**
- Recipient sees: "[Sender Name] is typing..." (animated ellipsis)
- Displayed at bottom of message thread
- Visible for 3 seconds after user stops typing (prevents flickering)

**Technical Implementation:**
- User types → Client sends "typing start" event via WebSocket every 3 seconds
- If no "typing start" received for 5 seconds → "typing" indicator disappears
- Typing events NOT persisted to database (ephemeral, no privacy concern)

**Privacy Consideration:**
- Typing indicator only visible to current conversation counterparty (not visible to admin)
- User can disable: "Don't show when I'm typing" (settings)

**Use Cases:**
- Care receiver types question → Caregiver sees typing indicator → Waits to send their message (avoids message collision)
- Real-time conversation feels more natural (mimics in-person interaction)

### 10.3 Real-Time Message Delivery (WebSocket)

**Architecture:**

**WebSocket Connection:**
- Client establishes WebSocket connection on login
- Connection authenticated with JWT token
- Server pushes new messages immediately upon receipt
- Client displays message in thread (no page refresh needed)

**Fallback: Long Polling (If WebSocket Unavailable):**
- Client polls server every 10 seconds: "Any new messages?"
- Server responds with new messages since last poll
- Higher latency but works on restricted networks

**Connection Management:**
- Connection timeout: 5 minutes of inactivity → server closes connection
- Client reconnects automatically on close (exponential backoff)
- Client sends heartbeat ping every 30 seconds (keeps connection alive)

**Message Delivery Flow:**
```
Sender sends message
  ↓
Server receives message via HTTP POST
  ↓
Server persists message to database
  ↓
Server pushes message to recipient via WebSocket (if connected)
  ↓
Recipient's client displays message in thread (real-time)
  ↓
If WebSocket fails, recipient gets message on next poll or page refresh
```

**Delivery Confirmation:**
- Sender's client updates message status from "Sending..." to "Sent" upon server acknowledgment
- If message fails to send (network error), sender sees "Failed to send. [Retry]"

### 10.4 Online Status Indicator (Out of Scope for Tier 1 MVP)

**Rationale for Exclusion:**
- Online status creates pressure to respond immediately (stressful for elderly users)
- "Last seen" timestamps raise privacy concerns
- Adds complexity to WebSocket infrastructure
- Not essential for booking coordination (email notifications sufficient)

**Potential Future Enhancement (Post-Tier 1):**
- "Usually responds within X hours" badge on caregiver profile (calculated from historical response times)
- No real-time online status (privacy-preserving alternative)

---

## 11. Admin Oversight

### 11.1 Admin Message View

**Admin Capability**: Admins can view ALL messages across ALL threads for safeguarding oversight.

**Admin Dashboard - Messages Section:**

```
[Admin Dashboard]

Messages Overview

Total Threads: 1,247
Active Threads (last 7 days): 543
Flagged Messages (pending review): 12
Reported Messages (pending review): 5

[Search Messages] [View Flagged] [View Reported] [View All]

Recent Flagged Messages:

Priority: URGENT
Message #45678 - 15 minutes ago
From: John Smith (Caregiver) → Mary Brown (Care Receiver)
Flagged for: Safeguarding keyword ("hurt")
Message: "Did you hurt yourself when you fell last week?"
Thread: Booking #987 - Completed
[View Thread] [Mark Safe] [Escalate to Safeguarding Team]

Priority: HIGH
Message #45670 - 1 hour ago
From: Susan Davis (Care Receiver) → Emma Williams (Caregiver)
Flagged for: Off-platform payment keyword ("cash")
Message: "I'll give you cash for the groceries when you arrive"
Thread: Booking #985 - Accepted
[View Thread] [Mark Safe - Legitimate Reimbursement] [Issue Warning]
```

**Search & Filter:**
- Search by user (care receiver or caregiver)
- Search by booking ID
- Search by keyword (free text)
- Filter by date range
- Filter by thread status (active, archived)
- Filter by flag type (safeguarding, payment, contact info)

### 11.2 Admin Viewing Individual Thread

**Thread View (Admin):**

```
[Back to Message Dashboard]

Conversation Thread #123
Between: Mary Thompson (Care Receiver) and Sarah Johnson (Caregiver)
Booking: #12345 - Confirmed for Tomorrow 2:00pm
Thread Status: Active
Created: Jan 15, 2026

[Export Thread] [Flag for Review] [Send Admin Message] [Suspend User]

Messages:

[AUTOMATED FLAG: Contact info redacted in message #45601]

Jan 15, 2:30pm - Mary Thompson:
  "Hi Sarah, I'm looking forward to meeting you tomorrow!
  I'd love to know more about your experience."

Jan 15, 3:00pm - Sarah Johnson:
  "Hi Mary! I've been a caregiver for 8 years and specialize in
  companionship. I'd love to hear what activities you enjoy!"

Jan 15, 3:15pm - Mary Thompson:
  "I enjoy gardening and reading. Do you have experience with gardening?"

Jan 15, 3:30pm - Sarah Johnson:
  "Absolutely! I love gardening too. I can help you with planting
  or just keep you company while you garden."

[SYSTEM MESSAGE] - Jan 15, 4:00pm:
  "Sarah Johnson has accepted your booking request."

[AUTOMATED FLAG: Potential reimbursement discussion - flagged for context]

Jan 15, 4:15pm - Mary Thompson:
  "Great! I'd like to go to the garden center tomorrow.
  I'll give you cash for any plants we buy."

[ADMIN NOTE: Reviewed - Legitimate reimbursement, not off-platform payment]

Jan 15, 4:20pm - Sarah Johnson:
  "Perfect! See you tomorrow at 2pm!"

---

Admin Actions:
[Mark All Flags as Safe] [Escalate to Safeguarding] [Issue Warning to User]
[Close Thread (Archive)] [Export for Investigation]

Admin Notes (Internal Only):
[Add Note]
```

**Admin Actions Available:**

**1. Mark Flag as Safe (False Positive):**
- Dismiss automated flag
- Add internal note explaining rationale
- No user notification

**2. Issue Warning to User:**
- Select user (sender or recipient)
- Select warning type: Policy violation, Inappropriate language, Off-platform payment attempt, Other
- Add internal notes
- Send automated warning email to user
- Log in user's account history (visible to admins only)

**3. Escalate to Safeguarding Team:**
- Create safeguarding incident report
- Link message thread to incident
- Assign to safeguarding officer
- Trigger safeguarding investigation workflow (see safeguarding spec)

**4. Suspend User:**
- Temporary suspension (7, 14, or 30 days)
- Permanent ban
- Add suspension reason (required)
- User cannot send/receive messages during suspension
- Existing threads remain visible to admin

**5. Export Thread:**
- Download thread as PDF or JSON (for investigations, legal proceedings)
- Includes all messages, system messages, admin notes, flags
- Redaction option: Anonymize user names (GDPR compliance for data sharing)

**6. Send Admin Message:**
- Admin can inject message into thread
- Appears as "Admin: [Message]" (clearly labeled)
- User can reply to admin (creates support ticket)

### 11.3 Admin Reporting & Analytics

**Admin Report: Messaging Health Dashboard**

```
[Messaging Analytics]

Date Range: Last 30 Days

Volume Metrics:
- Total Messages Sent: 15,432
- Avg Messages per Thread: 8.2
- Avg Response Time (Caregivers): 4.3 hours
- Avg Response Time (Care Receivers): 6.1 hours

Safety Metrics:
- Flagged Messages: 234 (1.5% of total)
- False Positives: 187 (79.9% of flagged)
- Legitimate Flags: 47 (20.1%)
- Reported Messages: 12
- Warnings Issued: 8
- Accounts Suspended: 2

Flag Breakdown:
- Contact Information: 102 (43.6%)
- Safeguarding Keywords: 56 (23.9%)
- Off-Platform Payment: 34 (14.5%)
- Profanity: 28 (12.0%)
- Health Information (Tier 1): 14 (6.0%)

Conversion Metrics:
- Pre-booking Inquiries: 1,243
- Inquiries → Booking Requests: 34.2%
- Booking Requests → Acceptances: 78.5%

[Export Report] [Filter by Date] [View User-Level Data]
```

**Insights & Actions:**
- High false positive rate (79.9%) → Review and tune automated filters
- Low inquiry-to-booking conversion (34.2%) → Improve inquiry response guidance for caregivers
- High response time (6.1 hours for care receivers) → Send reminder notifications sooner

### 11.4 Admin Message Templates (Efficiency)

**Template: Off-Platform Payment Warning**
```
Subject: Important Reminder - Keep Payments On-Platform

Dear [User Name],

We noticed that your recent message appeared to request payment outside our platform.

For your safety and protection, all payments must be processed through [Platform Name].
This ensures:
- Payment protection (escrow until service completed)
- Dispute resolution support
- Safeguarding oversight
- Clear booking records

Off-platform payments bypass these protections and violate our Terms of Service.

Please review our Payment Policy: [Link]

If this was a misunderstanding (e.g., discussing reimbursement for errands), no action is needed.
However, repeated violations may result in account suspension.

Thank you for helping us maintain a safe community.

[Platform Name] Team
```

**Template: Inappropriate Language Warning**
```
Subject: Community Guidelines Reminder

Dear [User Name],

We've reviewed your recent message and found it contained language that violated our Community Guidelines.

Our platform serves vulnerable adults, and we require all users to communicate respectfully.

Please review our Community Guidelines: [Link]

Future violations may result in account suspension or permanent ban.

If you believe this was a mistake, please reply to this email.

Thank you for your understanding.

[Platform Name] Team
```

**Template: Safeguarding Concern Follow-Up**
```
Subject: Safety Check-In

Dear [User Name],

We're reaching out because we noticed a message that raised a potential safety concern.

Your safety is our top priority. We want to ensure you feel safe and supported using our platform.

If you have any concerns about your caregiver or your safety, please contact us immediately:

Emergency (immediate danger): Call 999
Platform Safeguarding Team: [Phone] (24/7)
Email: safeguarding@[platform].com

All reports are confidential and taken seriously.

[Platform Name] Safeguarding Team
```

---

## 12. Data Requirements

### 12.1 Message Entity Data Model

**Primary Message Table:**

```sql
messages {
  id: UUID (primary key)
  thread_id: UUID (foreign key -> message_threads)
  sender_id: UUID (foreign key -> users)
  recipient_id: UUID (foreign key -> users)

  -- Message Content
  message_text: TEXT (max 2000 chars)
  message_type: ENUM ('user', 'system', 'admin')

  -- Redaction Tracking
  original_text_redacted: BOOLEAN (true if contact info removed)
  redaction_log: JSONB (e.g., {"email": 1, "phone": 1})

  -- Moderation
  flagged: BOOLEAN
  flag_type: VARCHAR(100) (e.g., "safeguarding_keyword", "off_platform_payment")
  flag_reason: TEXT
  reviewed_by_admin: BOOLEAN
  reviewed_at: TIMESTAMP
  admin_decision: VARCHAR(50) (e.g., "safe", "warning_issued", "escalated")

  -- Reporting
  reported: BOOLEAN
  reported_by: UUID (foreign key -> users, nullable)
  reported_at: TIMESTAMP
  report_reason: VARCHAR(255)
  report_details: TEXT

  -- Delivery & Read Status
  delivery_status: ENUM ('sending', 'sent', 'delivered', 'failed')
  read_at: TIMESTAMP (nullable - when recipient opened thread)

  -- Metadata
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
  deleted_at: TIMESTAMP (soft delete for GDPR - anonymize, don't truly delete)
}
```

**Message Threads Table:**

```sql
message_threads {
  id: UUID (primary key)
  care_receiver_id: UUID (foreign key -> users)
  caregiver_id: UUID (foreign key -> users)
  booking_id: UUID (foreign key -> bookings, nullable for pre-booking threads)

  -- Thread Type
  thread_type: ENUM ('pre_booking_inquiry', 'booking_linked')

  -- Thread Status
  status: ENUM ('active', 'archived')
  archived_at: TIMESTAMP

  -- Convenience Fields
  last_message_at: TIMESTAMP (updated on each new message for sorting)
  unread_count_care_receiver: INTEGER (updated on new message from caregiver)
  unread_count_caregiver: INTEGER (updated on new message from care receiver)

  -- Metadata
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
}
```

**Supporting Tables:**

```sql
message_flags {
  id: UUID (primary key)
  message_id: UUID (foreign key -> messages)
  flag_type: VARCHAR(100)
  flagged_at: TIMESTAMP
  flagged_by: VARCHAR(50) (e.g., "system_auto", "admin_manual", "user_report")
  reviewed_by_admin_id: UUID (foreign key -> users, nullable)
  reviewed_at: TIMESTAMP
  admin_decision: TEXT
}

message_reports {
  id: UUID (primary key)
  message_id: UUID (foreign key -> messages)
  reported_by: UUID (foreign key -> users)
  report_reason: VARCHAR(255)
  report_details: TEXT
  reported_at: TIMESTAMP
  resolved: BOOLEAN
  resolved_by_admin_id: UUID (foreign key -> users)
  resolution_notes: TEXT
  resolved_at: TIMESTAMP
}

admin_notes_on_threads {
  id: UUID (primary key)
  thread_id: UUID (foreign key -> message_threads)
  admin_id: UUID (foreign key -> users)
  note_text: TEXT
  created_at: TIMESTAMP
}
```

### 12.2 Indexes for Performance

**Critical Indexes:**

```sql
-- Fetch threads for user's inbox (sorted by recent activity)
CREATE INDEX idx_threads_care_receiver_last_message
ON message_threads (care_receiver_id, last_message_at DESC);

CREATE INDEX idx_threads_caregiver_last_message
ON message_threads (caregiver_id, last_message_at DESC);

-- Fetch messages in thread (chronological order)
CREATE INDEX idx_messages_thread_created
ON messages (thread_id, created_at ASC);

-- Admin moderation queue (flagged messages first, then by created date)
CREATE INDEX idx_messages_flagged_created
ON messages (flagged, created_at DESC)
WHERE flagged = true;

-- Admin reports queue
CREATE INDEX idx_reports_resolved_created
ON message_reports (resolved, created_at DESC);

-- Search messages by user
CREATE INDEX idx_messages_sender
ON messages (sender_id, created_at DESC);

CREATE INDEX idx_messages_recipient
ON messages (recipient_id, created_at DESC);

-- Full-text search on message content (PostgreSQL specific)
CREATE INDEX idx_messages_text_search
ON messages USING gin(to_tsvector('english', message_text));
```

### 12.3 Data Retention & GDPR Compliance

**Active Users:**
- Messages retained indefinitely while accounts active

**Completed Bookings:**
- Messages linked to completed bookings retained 2 years after booking completion
- Rationale: Safeguarding evidence, dispute resolution, legal defense

**Pre-Booking Inquiry Threads (No Booking Created):**
- Retained 1 year after last message
- Rationale: Less critical than booking-linked threads

**User Account Deletion (GDPR Right to Erasure):**
- User requests account deletion
- 30-day grace period (user can cancel deletion)
- After grace period:
  - User's name replaced with "User #[ID]" in all messages
  - Message content retained (safeguarding requirement)
  - Thread structure maintained (anonymized)
  - Audit trail preserved

**Legal Hold (Exceptions to Retention Limits):**
- If message thread involved in safeguarding investigation, legal claim, or dispute: Retained 7 years (or until legal matter resolved)
- Legal hold flag prevents automated deletion

**Data Deletion Automation:**
```sql
-- Nightly cron job
DELETE FROM messages
WHERE deleted_at IS NOT NULL
  AND deleted_at < NOW() - INTERVAL '30 days'
  AND NOT EXISTS (
    SELECT 1 FROM legal_holds WHERE entity_id = messages.id
  );
```

### 12.4 Data Access Controls

**Care Receiver Access:**
- Can read: Own messages (sent and received), messages in threads they're part of
- Cannot read: Messages in other users' threads, admin notes, flagging details
- Can write: New messages in own threads

**Caregiver Access:**
- Same as care receiver

**Family Member Access:**
- Can read: All messages in care receiver's threads (if permissions granted)
- Cannot read: Messages in other care receiver accounts
- Can write: Messages on behalf of care receiver (if Full Access permission)

**Admin Access:**
- Can read: ALL messages across ALL threads, admin notes, flagging details, reports
- Can write: Admin messages, admin notes (internal)
- Access logged in audit trail (who viewed which thread, when)

**Database-Level Security:**
- Row-level security policies (PostgreSQL) enforce access controls
- API endpoints validate user permissions before returning data
- Message API never returns full table scans (always filtered by user_id or thread_id)

---

## 13. Edge Cases

### 13.1 Communication Edge Cases

**EC-MSG-001: Caregiver Doesn't Respond to Pre-Booking Inquiry**
- **Scenario**: Care receiver sends inquiry, caregiver never responds
- **Handling**:
  - After 48 hours, system sends reminder to caregiver: "You have an unanswered inquiry from [Care Receiver Name]. Respond quickly to increase bookings!"
  - After 7 days, thread auto-archived with note: "No response from caregiver"
  - Care receiver can still send follow-up messages (un-archives thread)
  - Pattern of non-response tracked: Caregivers with low response rates deprioritized in search rankings

**EC-MSG-002: Message Sent While User Suspended**
- **Scenario**: User tries to send message but account suspended between page load and send action
- **Handling**:
  - Server rejects message with error: "Your account is currently suspended. You cannot send messages."
  - User redirected to suspension notice page
  - Draft message NOT saved (potential abuse vector)

**EC-MSG-003: Recipient Deletes Account Before Message Read**
- **Scenario**: Sender sends message, recipient deletes account before reading
- **Handling**:
  - Message marked as "delivered" but never "read"
  - Sender sees: "This user's account is no longer active"
  - Message remains in database (anonymized when deletion completes)

**EC-MSG-004: Both Parties Send Message Simultaneously**
- **Scenario**: Both users send message at same time (race condition)
- **Handling**:
  - Both messages delivered successfully
  - Each user sees counterparty's message appear after sending their own
  - Typing indicator stops on send (prevents confusion)

**EC-MSG-005: Message Exceeds Character Limit**
- **Scenario**: User attempts to submit message >2000 characters
- **Handling**:
  - Submit button disabled when character count >2000
  - Error message: "Your message is too long. Please shorten it to 2000 characters or less."
  - Remaining character count displays as negative (e.g., "-50 characters")

### 13.2 Booking Lifecycle Integration Edge Cases

**EC-MSG-006: Booking Cancelled While Message in Transit**
- **Scenario**: Sender sends message, booking cancelled before message delivered
- **Handling**:
  - Message delivered successfully (thread still exists after cancellation)
  - System message added to thread: "This booking has been cancelled."
  - Users can continue messaging (e.g., to discuss rebooking)

**EC-MSG-007: Booking Request Sent After Messaging**
- **Scenario**: Care receiver messages caregiver (pre-booking), then later requests booking
- **Handling**:
  - System prompts: "You have an existing conversation with [Caregiver]. Link to your booking?"
  - If yes: Messages copied to booking-linked thread
  - If no: Separate booking-linked thread created (two threads with same caregiver)

**EC-MSG-008: Multiple Bookings with Same Caregiver**
- **Scenario**: Care receiver books same caregiver 3 times (past, current, future bookings)
- **Handling**:
  - Each booking has own thread (prevents confusion)
  - Threads grouped by caregiver in inbox UI
  - Most recent thread displayed first
  - User can switch between threads: "View other conversations with [Caregiver]" dropdown

### 13.3 Moderation & Reporting Edge Cases

**EC-MSG-009: User Reports Own Message**
- **Scenario**: User accidentally reports their own sent message
- **Handling**:
  - System blocks self-report: "You cannot report your own message."
  - Alternative: "Need to clarify something? Send a follow-up message."

**EC-MSG-010: Multiple Users Report Same Message**
- **Scenario**: Care receiver reports message, then family member also reports same message
- **Handling**:
  - Admin sees duplicate reports with note: "This message has been reported by 2 users"
  - Admin resolves once (applies to all reports)
  - Both reporters notified of outcome

**EC-MSG-011: User Edits Message After Sending (Attempted Workaround)**
- **Scenario**: User sends inappropriate message, realizes mistake, tries to "edit" by sending correction
- **Handling**:
  - Original message remains (immutable)
  - User sends follow-up: "Sorry, I meant to say..."
  - Admin sees both messages (full context)
  - Rationale: No editing prevents covering up violations

**EC-MSG-012: Flagged Message is Actually Safe (False Positive)**
- **Scenario**: Automated filter flags message: "I'm nervous about meeting a new caregiver"
- **Handling**:
  - Admin reviews context
  - Admin marks as "Safe - False Positive"
  - Adds note: "Benign anxiety expression, not safeguarding concern"
  - Machine learning model learns from feedback (reduces future false positives)

**EC-MSG-013: User Attempts to Report Every Message (Report Spam)**
- **Scenario**: User maliciously reports multiple messages to harass counterparty
- **Handling**:
  - Admin detects pattern (>5 reports in 24 hours from same user)
  - Admin investigates reports
  - If abuse confirmed: Reporter warned or suspended (report feature abuse)
  - Counterparty not notified (prevents retaliation)

### 13.4 Technical Edge Cases

**EC-MSG-014: WebSocket Connection Lost Mid-Message**
- **Scenario**: User types long message, WebSocket disconnects before send
- **Handling**:
  - Draft message saved to local storage (browser)
  - System attempts reconnect (exponential backoff)
  - When reconnected, user clicks "Send" again
  - If message already sent (idempotency check via message UUID), server rejects duplicate

**EC-MSG-015: Notification Delivery Failure**
- **Scenario**: System attempts email notification but email bounces
- **Handling**:
  - Stripe/SendGrid reports bounce
  - System logs failed notification
  - In-app notification remains (user sees message next login)
  - User warned: "We couldn't send you email notifications. Please update your email."

**EC-MSG-016: Message Sent to Deactivated User**
- **Scenario**: Caregiver profile deactivated (failed verification renewal) while care receiver sends message
- **Handling**:
  - Message rejected: "This caregiver is no longer available."
  - Thread remains visible (historical messages preserved)
  - Care receiver sees: "This caregiver's profile is no longer active"

**EC-MSG-017: High Message Volume (Rate Limiting)**
- **Scenario**: User sends 50 messages in 1 minute (spam or bot)
- **Handling**:
  - Rate limit: 20 messages per minute per user
  - If exceeded: Error message: "You're sending messages too quickly. Please wait a moment."
  - Cooldown: 1 minute before next message allowed
  - Admin alerted if pattern suggests bot/abuse

---

## 14. Acceptance Criteria

### 14.1 Core Messaging Functionality

**AC-MSG-001: Send and Receive Messages**
- [ ] Care receiver can send message to caregiver from pre-booking inquiry
- [ ] Caregiver receives notification (email + in-app) within 1 minute
- [ ] Caregiver can reply to message
- [ ] Care receiver receives notification of reply
- [ ] Messages appear in chronological order in thread
- [ ] Character counter displays remaining characters (2000 max)
- [ ] Submit button disabled if message exceeds 2000 characters

**AC-MSG-002: Pre-Booking Inquiry Thread Creation**
- [ ] Care receiver clicks "Message [Caregiver]" button on caregiver profile
- [ ] Message modal opens with caregiver context
- [ ] Care receiver sends first message
- [ ] Pre-booking inquiry thread created in database
- [ ] Thread visible in both users' inboxes
- [ ] Thread type = "pre_booking_inquiry"

**AC-MSG-003: Booking-Linked Thread Creation**
- [ ] Care receiver submits booking request
- [ ] Booking-linked thread created automatically
- [ ] Thread linked to booking ID in database
- [ ] System message added: "Booking request sent"
- [ ] Booking details displayed at top of thread (date, time, services)
- [ ] Both parties can message in booking-linked thread

**AC-MSG-004: Thread Conversion (Inquiry to Booking)**
- [ ] Care receiver with existing pre-booking thread requests booking with same caregiver
- [ ] System prompts: "Link existing conversation to this booking?"
- [ ] If yes: Pre-booking messages appear in booking-linked thread
- [ ] If no: New separate booking-linked thread created

### 14.2 Contact Information Protection

**AC-CONTACT-001: Contact Redaction in Pre-Booking**
- [ ] Care receiver sends message containing phone number in pre-booking thread
- [ ] System automatically redacts phone number: "[PHONE REDACTED]"
- [ ] Caregiver receives message with phone number redacted
- [ ] Warning displayed to sender: "Contact information removed. Details shared after booking acceptance."
- [ ] Original unredacted message NOT stored in database

**AC-CONTACT-002: Contact Redaction for Email**
- [ ] User sends message containing email address
- [ ] System redacts email: "[EMAIL REDACTED]"
- [ ] Pattern matches common email formats (name@example.com)

**AC-CONTACT-003: Contact Redaction for Address**
- [ ] User sends message containing street address or postcode
- [ ] System redacts address: "[ADDRESS REDACTED]"
- [ ] Pattern matches UK postcode formats and street name patterns

**AC-CONTACT-004: Contact Sharing After Acceptance**
- [ ] Caregiver accepts booking
- [ ] Contact information displayed in booking detail page
- [ ] Care receiver sees: Caregiver full name, phone, email
- [ ] Caregiver sees: Care receiver full name, full address, phone, emergency contact
- [ ] Contact information NO LONGER redacted in messages after acceptance
- [ ] System message confirms: "Contact information has been shared"

### 14.3 Content Moderation

**AC-MOD-001: Off-Platform Payment Detection**
- [ ] User sends message: "I can pay you directly in cash"
- [ ] System flags message for off-platform payment keyword
- [ ] Admin receives immediate alert
- [ ] Message delivered to recipient (not blocked)
- [ ] Flagged message appears in admin moderation queue

**AC-MOD-002: Safeguarding Keyword Detection**
- [ ] User sends message: "I'm scared of the caregiver"
- [ ] System flags message for safeguarding keyword ("scared")
- [ ] Admin receives urgent alert (SMS + email)
- [ ] Message delivered to recipient
- [ ] Flagged message marked as "URGENT" in admin queue

**AC-MOD-003: Profanity Filter**
- [ ] User sends message with profanity
- [ ] System replaces profanity with "***"
- [ ] Filtered message delivered to recipient
- [ ] Admin notified if severe profanity detected

**AC-MOD-004: User Report Mechanism**
- [ ] User clicks "Report Message" on any message
- [ ] Report modal opens with reason options
- [ ] User selects reason and adds details
- [ ] Report submitted successfully
- [ ] Confirmation: "Thank you for reporting. We'll review within 24 hours."
- [ ] Admin receives report in moderation queue

**AC-MOD-005: Admin Moderation Review**
- [ ] Admin views flagged message in queue
- [ ] Admin can see full thread context
- [ ] Admin can mark as "Safe - False Positive" or "Escalate to Safeguarding"
- [ ] Admin decision updates message record
- [ ] Reporter notified of outcome (if report, not automated flag)

### 14.4 Notification System

**AC-NOTIF-001: Email Notification for New Message**
- [ ] User receives message
- [ ] Email notification sent within 1 minute
- [ ] Email contains: Sender name, message preview (first 100 chars), link to thread
- [ ] Clicking link navigates user to message thread (authenticated session)

**AC-NOTIF-002: In-App Notification**
- [ ] User receives message while online
- [ ] In-app notification banner appears: "[Sender] sent you a message"
- [ ] Notification badge increments on message icon: "🔔 (3)"
- [ ] Clicking notification navigates to message thread

**AC-NOTIF-003: Unread Message Count**
- [ ] User receives messages in multiple threads
- [ ] Unread count displayed per thread in inbox: "UNREAD (2)"
- [ ] Total unread count displayed in navigation badge: "🔔 (5)"
- [ ] Opening thread marks messages as read
- [ ] Unread counts decrement immediately

**AC-NOTIF-004: Notification Preferences**
- [ ] User can disable email notifications in settings
- [ ] User can enable daily digest (instead of per-message emails)
- [ ] User can set quiet hours (no notifications 10pm-8am)
- [ ] Preferences saved and respected for future notifications
- [ ] Admin and emergency notifications cannot be disabled

### 14.5 Real-Time Features

**AC-REALTIME-001: Typing Indicator**
- [ ] User types message in thread
- [ ] Counterparty sees: "[User] is typing..." (animated ellipsis)
- [ ] Typing indicator disappears 3 seconds after user stops typing
- [ ] Typing indicator only visible to current conversation counterparty

**AC-REALTIME-002: Real-Time Message Delivery (WebSocket)**
- [ ] User A sends message
- [ ] User B (online) receives message instantly without page refresh
- [ ] Message appears in User B's thread in real-time
- [ ] WebSocket connection maintained during session

**AC-REALTIME-003: Fallback to Polling (WebSocket Unavailable)**
- [ ] WebSocket connection fails
- [ ] System falls back to long polling (10-second intervals)
- [ ] User still receives messages (with slight delay)
- [ ] No error displayed to user (transparent fallback)

**AC-REALTIME-004: Read Receipts**
- [ ] User A sends message
- [ ] User B opens thread
- [ ] User A sees: "Read at [timestamp]" below their message
- [ ] User B can disable read receipts in settings
- [ ] If disabled, User A sees "Delivered" only (never "Read")

### 14.6 Admin Oversight

**AC-ADMIN-001: View All Messages**
- [ ] Admin can access message dashboard
- [ ] Admin can search messages by user, booking ID, or keyword
- [ ] Admin can view any thread (care receiver ↔ caregiver)
- [ ] Admin can see full message history including deleted users (anonymized)

**AC-ADMIN-002: Flag Message for Review**
- [ ] Admin manually flags message as suspicious
- [ ] Flagged message appears in moderation queue
- [ ] Admin can add internal note explaining flag reason

**AC-ADMIN-003: Send Admin Message**
- [ ] Admin can send message to user from admin dashboard
- [ ] Message appears in thread with "Admin:" prefix
- [ ] User receives high-priority notification
- [ ] User can reply to admin (creates support ticket)

**AC-ADMIN-004: Export Thread for Investigation**
- [ ] Admin clicks "Export Thread" button
- [ ] System generates PDF or JSON export of all messages
- [ ] Export includes: Message text, timestamps, sender/recipient names, system messages, admin notes
- [ ] Export downloaded successfully

### 14.7 Edge Case Handling

**AC-EDGE-001: Message to Suspended User**
- [ ] User attempts to send message to suspended user
- [ ] System blocks message
- [ ] Error message: "This user is no longer available"
- [ ] Draft message NOT saved

**AC-EDGE-002: Message During Booking Cancellation**
- [ ] User sends message
- [ ] Booking cancelled while message in transit
- [ ] Message delivered successfully
- [ ] System message added: "This booking has been cancelled"
- [ ] Thread remains accessible

**AC-EDGE-003: Character Limit Enforcement**
- [ ] User types message >2000 characters
- [ ] Submit button disabled
- [ ] Character counter shows negative count: "-50 characters"
- [ ] User cannot submit until under limit

**AC-EDGE-004: Rate Limiting**
- [ ] User sends 20 messages in 1 minute
- [ ] 21st message blocked
- [ ] Error: "You're sending messages too quickly. Please wait."
- [ ] User can send again after 1-minute cooldown

---

## 15. Out of Scope (Tier 1)

### 15.1 Features Explicitly Deferred to Post-Launch

**File Attachments & Media Sharing:**
- Photo uploads (e.g., care receiver shares photo of care plan, caregiver shares qualifications)
- Document attachments (PDFs, Word docs)
- Video/audio messages
- Rationale: Increases storage costs, moderation complexity, GDPR concerns (what if attachment contains sensitive health data?). Text-only sufficient for Tier 1.

**Group Messaging:**
- Multiple family members in same conversation with caregiver
- Care coordination between multiple caregivers for same care receiver
- Rationale: Requires complex threading model, notification logic. Tier 4 feature (care coordination).

**Voice/Video Calling:**
- In-app voice calls (VoIP)
- In-app video calls
- Rationale: Significant technical complexity, bandwidth costs, moderation challenges (can't review calls), safeguarding concerns (no audit trail). Out of scope permanently - users can call via shared phone numbers.

**Message Search (Advanced):**
- Full-text search across all threads
- Filter messages by date range, keyword, sender
- Rationale: Search infrastructure (Elasticsearch) adds complexity. Basic search (by caregiver/care receiver name) sufficient for Tier 1. Advanced search post-launch.

**Message Translation:**
- Automatic translation for non-English speakers
- Rationale: UK market (English primary language). Translation introduces accuracy risks, especially for care-related terminology. Future enhancement if demand from non-English speakers.

**Message Reactions/Emoji:**
- React to messages with emoji (👍, ❤️, etc.)
- Animated emoji or GIFs
- Rationale: Not essential for care coordination. Adds complexity to data model and UI. May seem unprofessional in care context.

**Message Scheduling:**
- Schedule message to send at specific time
- Rationale: Rare use case. Adds complexity. Not essential for Tier 1.

**Message Templates (Caregiver Efficiency - Tier 1.5):**
- Caregiver creates reusable message templates for common inquiries
- Quick-reply buttons
- Rationale: Efficiency feature, not essential for MVP. Post-launch enhancement after caregiver feedback.

### 15.2 Features Deferred to Higher Tiers

**Advanced Safeguarding Features (Tier 3):**
- AI-powered sentiment analysis (detect distress, coercion)
- Pattern detection across multiple threads (identify problematic users)
- Integration with Safeguarding Adults Boards (SAB) reporting API
- Rationale: Require machine learning infrastructure, legal/regulatory guidance, higher tier complexity.

**Clinical Notes & Handover (Tier 4):**
- Structured clinical notes (for condition-specific care)
- Care handover notes (between caregivers for same care receiver)
- Integration with care plans
- Rationale: Tier 4 feature (care coordination). Not needed for Tier 1 companionship services.

**B2B Messaging Features (Tier 4):**
- Messages between platform and care agencies
- Bulk messaging to multiple caregivers
- Automated caregiver assignments
- Rationale: B2B features require separate product spec. Tier 1 focuses on individual caregivers.

### 15.3 Technical Limitations at Tier 1

**End-to-End Encryption:**
- WhatsApp-style E2E encryption
- Rationale: Conflicts with safeguarding requirement (admin must be able to review messages). Platform security (TLS, database encryption) sufficient for Tier 1.

**Offline Messaging:**
- Send messages while offline (queued until online)
- Rationale: Rare use case (users typically have internet when using platform). Adds complexity. Not essential for web platform.

**Message Editing/Deletion:**
- Users cannot edit or delete sent messages
- Rationale: Immutability required for safeguarding audit trail. Cannot be changed at any tier.

**Anonymous Reporting:**
- User cannot report messages anonymously (admin sees reporter identity)
- Rationale: Admin needs context for investigation. Prevents abuse of report system.

---

## Appendix A: Message Flow Diagrams

### A.1 Pre-Booking Inquiry Flow

```
Care Receiver                Platform                 Caregiver
     |                          |                          |
     |--Search Caregivers------>|                          |
     |<--Caregiver Results------|                          |
     |                          |                          |
     |--View Profile----------->|                          |
     |<--Profile Details--------|                          |
     |                          |                          |
     |--Click "Message"-------->|                          |
     |<--Message Modal----------|                          |
     |                          |                          |
     |--Send Inquiry Message--->|                          |
     |   (Create Thread)        |--Email Notification----->|
     |                          |--In-App Notification---->|
     |                          |                          |
     |                          |<--Read Message-----------|
     |                          |   (Mark Thread Read)     |
     |                          |                          |
     |                          |<--Send Reply-------------|
     |<--Email Notification-----|                          |
     |<--In-App Notification----|                          |
     |                          |                          |
     |--Read Reply------------->|                          |
     |   (Mark Read)            |                          |
     |                          |                          |
     |--Request Booking-------->|                          |
     |   (Link Thread Option)   |                          |
     |                          |--Create Booking Thread-->|
     |                          |--Copy Inquiry Messages-->|
```

### A.2 Booking-Linked Message Flow

```
Care Receiver                Platform                 Caregiver
     |                          |                          |
     |--Submit Booking Request->|                          |
     |   (Authorize Payment)    |--System Message--------->|
     |                          |   "Booking Requested"    |
     |                          |--Email Notification----->|
     |                          |                          |
     |                          |<--View Request-----------|
     |                          |<--Send Question----------|
     |<--Email Notification-----|                          |
     |                          |                          |
     |--Reply to Question------>|------------------------>|
     |                          |                          |
     |                          |<--Accept Booking---------|
     |                          |   (Capture Payment)      |
     |<--System Message---------|--System Message--------->|
     |   "Booking Accepted"     |   "Booking Accepted"     |
     |<--Contact Info Shared----|--Contact Info Shared---->|
     |                          |                          |
     |--Send Coordination Msg-->|------------------------>|
     |   ("Parking info")       |                          |
     |                          |<--Reply------------------|
     |<-------------------------|                          |
     |                          |                          |
     |   [Session Occurs]       |                          |
     |                          |                          |
     |                          |<--Mark Complete----------|
     |<--System Message---------|                          |
     |   "Confirm Completion"   |                          |
     |                          |                          |
     |--Confirm Completion----->|--Release Payment-------->|
     |                          |--System Message--------->|
     |                          |   "Payment Released"     |
     |                          |                          |
     |--Send Thank You--------->|------------------------>|
     |                          |<--Reply------------------|
     |<-------------------------|                          |
```

### A.3 Admin Moderation Flow

```
User A                       Platform                 Admin
  |                             |                        |
  |--Send Message-------------->|--Auto Scan (Content)-->|
  |   (Contains "cash")         |                        |
  |                             |--Flag: Off-Platform--->|
  |                             |   Payment Detected     |
  |                             |                        |
  |                             |<--Review Flag----------|
  |                             |   (View Full Thread)   |
  |                             |                        |
  |                             |<--Admin Decision-------|
  |                             |   "Issue Warning"      |
  |                             |                        |
  |<--Warning Email-------------|                        |
  |   "Keep payments on-platform"|                       |
  |                             |                        |
  |                             |<--Add Admin Note-------|
  |                             |   "First offense,      |
  |                             |    warning issued"     |
```

---

## Appendix B: Database Schema (Complete)

```sql
-- Message Threads
CREATE TABLE message_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  care_receiver_id UUID NOT NULL REFERENCES users(id),
  caregiver_id UUID NOT NULL REFERENCES users(id),
  booking_id UUID REFERENCES bookings(id) NULL,
  thread_type VARCHAR(50) NOT NULL CHECK (thread_type IN ('pre_booking_inquiry', 'booking_linked')),
  status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived')),
  archived_at TIMESTAMP NULL,
  last_message_at TIMESTAMP NOT NULL DEFAULT NOW(),
  unread_count_care_receiver INTEGER NOT NULL DEFAULT 0,
  unread_count_caregiver INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID NOT NULL REFERENCES message_threads(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES users(id),
  recipient_id UUID NOT NULL REFERENCES users(id),
  message_text TEXT NOT NULL CHECK (char_length(message_text) <= 2000),
  message_type VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (message_type IN ('user', 'system', 'admin')),
  original_text_redacted BOOLEAN NOT NULL DEFAULT false,
  redaction_log JSONB NULL,
  flagged BOOLEAN NOT NULL DEFAULT false,
  flag_type VARCHAR(100) NULL,
  flag_reason TEXT NULL,
  reviewed_by_admin BOOLEAN NOT NULL DEFAULT false,
  reviewed_at TIMESTAMP NULL,
  admin_decision VARCHAR(50) NULL,
  reported BOOLEAN NOT NULL DEFAULT false,
  reported_by UUID REFERENCES users(id) NULL,
  reported_at TIMESTAMP NULL,
  report_reason VARCHAR(255) NULL,
  report_details TEXT NULL,
  delivery_status VARCHAR(20) NOT NULL DEFAULT 'sent' CHECK (delivery_status IN ('sending', 'sent', 'delivered', 'failed')),
  read_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMP NULL
);

-- Message Flags (Audit Trail)
CREATE TABLE message_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  flag_type VARCHAR(100) NOT NULL,
  flagged_at TIMESTAMP NOT NULL DEFAULT NOW(),
  flagged_by VARCHAR(50) NOT NULL,
  reviewed_by_admin_id UUID REFERENCES users(id) NULL,
  reviewed_at TIMESTAMP NULL,
  admin_decision TEXT NULL
);

-- Message Reports
CREATE TABLE message_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  reported_by UUID NOT NULL REFERENCES users(id),
  report_reason VARCHAR(255) NOT NULL,
  report_details TEXT NULL,
  reported_at TIMESTAMP NOT NULL DEFAULT NOW(),
  resolved BOOLEAN NOT NULL DEFAULT false,
  resolved_by_admin_id UUID REFERENCES users(id) NULL,
  resolution_notes TEXT NULL,
  resolved_at TIMESTAMP NULL
);

-- Admin Notes on Threads (Internal)
CREATE TABLE admin_notes_on_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID NOT NULL REFERENCES message_threads(id) ON DELETE CASCADE,
  admin_id UUID NOT NULL REFERENCES users(id),
  note_text TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_threads_care_receiver_last_message ON message_threads (care_receiver_id, last_message_at DESC);
CREATE INDEX idx_threads_caregiver_last_message ON message_threads (caregiver_id, last_message_at DESC);
CREATE INDEX idx_messages_thread_created ON messages (thread_id, created_at ASC);
CREATE INDEX idx_messages_flagged_created ON messages (flagged, created_at DESC) WHERE flagged = true;
CREATE INDEX idx_reports_resolved_created ON message_reports (resolved, created_at DESC);
CREATE INDEX idx_messages_sender ON messages (sender_id, created_at DESC);
CREATE INDEX idx_messages_recipient ON messages (recipient_id, created_at DESC);
CREATE INDEX idx_messages_text_search ON messages USING gin(to_tsvector('english', message_text));

-- Triggers
CREATE TRIGGER update_thread_last_message
  AFTER INSERT ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_thread_timestamp();

CREATE TRIGGER increment_unread_count
  AFTER INSERT ON messages
  FOR EACH ROW
  EXECUTE FUNCTION increment_thread_unread();
```

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-06 | Product Team | Initial Tier 1 messaging system specification created |

---

**END OF DOCUMENT**
