# Booking Request Form Wireframes (SCR-CR-006)

**Document Purpose**: ASCII wireframes and complete element inventory for Booking Request Form (SCR-CR-006)

**Screen ID**: SCR-CR-006
**Screen Name**: Booking Request Form
**User Role**: Care Receiver (family member)
**Route**: `/bookings/new/:caregiverId`
**R0/R1**: R0
**Created**: 2026-02-08
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

The Booking Request Form enables care receivers to create a companionship booking request by specifying date, time, duration, and special requirements. The form displays real-time pricing, validates caregiver availability, and authorizes payment before sending the request to the caregiver.

**Key Functions**:
- Display caregiver profile summary and hourly rate
- Collect booking date, time, and duration
- Show real-time price calculation as duration changes
- Capture special requests and emergency contact
- Validate payment method (or prompt to add)
- Authorize payment (hold, not charge) before sending request
- Display cancellation policy for acceptance

### 1.2 Entry Points

**From Caregiver Profile**:
- SCR-CR-005 (Caregiver Profile) → User clicks "Request Booking" button → Load form with caregiver ID

**From Search Results**:
- SCR-CR-003 (Caregiver Search) → User clicks "Request Booking" on caregiver card → Load form with caregiver ID

**From Dashboard**:
- SCR-CR-001 (Care Receiver Dashboard) → "Find a Caregiver" → Search → Profile → Request Booking

### 1.3 Exit Points

**Successful Submission**:
- Success modal → Navigate to SCR-CR-008 (Booking Detail, status: requested)

**Payment Method Missing**:
- "Add Payment Method" button → SCR-CR-013 (Payment Methods) → Return to this form after adding

**User Cancels**:
- "Cancel" button → Return to SCR-CR-005 (Caregiver Profile)

**Global Navigation**:
- Header "Dashboard" → SCR-CR-001
- Header "Search" → SCR-CR-003

---

## 2. Element Inventory

### 2.1 Content Blocks

#### Block 1: Header (Global)
- **Purpose**: Consistent navigation across all authenticated screens
- **Priority**: Primary
- **Elements**:
  - Platform logo (left-aligned) → Clickable, returns to dashboard
  - Main navigation menu:
    - "Dashboard" link → SCR-CR-001
    - "Search Caregivers" link → SCR-CR-003
    - "My Bookings" link → SCR-CR-008
    - "Messages" link (with unread count badge if applicable)
  - User profile menu (right-aligned)

**Component Reuse**: NAV-HEADER-AUTH (from dashboard-shared-components.md)

#### Block 2: Page Header
- **Purpose**: Establish form context and show progress
- **Priority**: Primary
- **Elements**:
  - Breadcrumb navigation: "Search > [Caregiver Name] > Request Booking"
  - H1: "Request Booking with [Caregiver First Name]"
  - Subtitle: "Complete this form to send a booking request. [Caregiver Name] has 24 hours to respond."

#### Block 3: Caregiver Summary Card
- **Purpose**: Display selected caregiver information for context
- **Priority**: Primary
- **Elements**:
  - Caregiver profile photo (medium size, 80x80px)
  - Caregiver full name
  - Rating display: "4.8 ★ (24 reviews)"
  - Hourly rate: "£18.00/hour"
  - Distance: "3.2 miles from you"
  - Service badge: "Companionship Services Only" (pill badge)
  - Verification badges: "Identity Verified" + "DBS Verified" (if applicable)
  - "View Full Profile" link → SCR-CR-005

#### Block 4: Payment Method Warning Banner (Conditional)
- **Purpose**: Alert user if no payment method on file
- **Priority**: Primary (if shown)
- **Elements**:
  - Warning banner (yellow/amber background):
    - Icon: ⚠️ Alert icon
    - Message: "Add a payment method to continue"
    - Description: "You'll need to add a card before you can send a booking request"
    - CTA button: "Add Payment Method" → SCR-CR-013
  - Dismissible: No (blocks form submission)
- **Visibility Condition**: Show if user has no payment method on file, hide if payment method exists

#### Block 5: Booking Details Form
- **Purpose**: Collect booking date, time, and duration
- **Priority**: Primary
- **Elements**:
  - **Section Heading (H2)**: "Booking Details"
  - **Date Field**:
    - Label: "Booking Date" (required indicator: *)
    - Input: Date picker component
    - Help text: "Select a date when [Caregiver Name] is available"
    - Availability indicator: Calendar shows available dates highlighted in green
    - Validation: Must be future date, must be within caregiver's available dates
    - Error message slot: "This date is not available. Please select another date."
  - **Start Time Field**:
    - Label: "Start Time" (required indicator: *)
    - Input: Dropdown/select
    - Options: 08:00, 08:30, 09:00 ... 20:00 (30-minute increments)
    - Validation: Must be valid time slot
    - Error message slot: "Please select a start time"
  - **Duration Field**:
    - Label: "Duration" (required indicator: *)
    - Input: Dropdown/select or button group
    - Options: 2 hours, 3 hours, 4 hours, 6 hours, 8 hours
    - Help text: "Minimum booking duration is 2 hours"
    - Validation: Minimum 2 hours
    - Error message slot: "Minimum booking duration is 2 hours"

#### Block 6: Service Type Display
- **Purpose**: Show service type (read-only for Tier 1)
- **Priority**: Secondary
- **Elements**:
  - Label: "Service Type"
  - Value: "Companionship" (read-only)
  - Badge: "Companionship Services Only"
  - Help text: "Personal care services are available from Tier 2 onwards"

#### Block 7: Special Requests
- **Purpose**: Allow care receiver to add context or preferences
- **Priority**: Secondary
- **Elements**:
  - Label: "Special Requests or Notes" (optional)
  - Input: Textarea (multi-line)
  - Character limit: 500 characters (live counter: "450 characters remaining")
  - Placeholder text: "Example: I'd like to go for a walk if the weather is nice, or we can stay in and chat. I have a small dog who loves visitors."
  - Validation: Maximum 500 characters
  - Error message slot: "Special requests must be 500 characters or less"

#### Block 8: Emergency Contact
- **Purpose**: Ensure emergency contact is on file and editable
- **Priority**: Primary
- **Elements**:
  - **Section Heading (H2)**: "Emergency Contact"
  - Help text: "This person will be notified if there's an emergency during the booking"
  - **Auto-filled fields** (from care receiver profile, editable):
    - **Name Field**:
      - Label: "Emergency Contact Name" (required indicator: *)
      - Input: Text field
      - Pre-filled from profile
      - Validation: Required, 2-100 characters
    - **Phone Field**:
      - Label: "Emergency Contact Phone" (required indicator: *)
      - Input: Tel field (UK format)
      - Pre-filled from profile
      - Validation: Required, valid UK phone number
    - **Relationship Field**:
      - Label: "Relationship" (required indicator: *)
      - Input: Dropdown or text field
      - Options: Daughter, Son, Spouse, Partner, Friend, Other
      - Pre-filled from profile

#### Block 9: Price Breakdown (Real-Time Calculation)
- **Purpose**: Display transparent pricing as user adjusts duration
- **Priority**: Primary
- **Elements**:
  - **Section Heading (H2)**: "Booking Summary"
  - **Price Display** (updates live as duration changes):
    - Line item: "Service: Companionship ([Duration] hours)"
    - Line item: "Rate: £[Rate]/hour"
    - Line item: "Subtotal: £[Rate × Duration]"
    - Line item: "Platform service fee (15%): £[Subtotal × 0.15]"
    - Divider line
    - **Total** (large, bold): "Total: £[Subtotal + Service Fee]"
  - **Payment Note**: "Payment will be authorized now and charged when [Caregiver Name] accepts."
  - **Example**:
    ```
    Booking Summary
    ───────────────────────
    Service: Companionship (4 hours)
    Rate: £18.00/hour
    Subtotal: £72.00
    Platform service fee (15%): £10.80
    ───────────────────────
    Total: £75.60

    Payment will be authorized now and charged when Mary accepts.
    ```

#### Block 10: Cancellation Policy
- **Purpose**: Ensure care receiver understands and accepts cancellation terms
- **Priority**: Primary
- **Elements**:
  - **Section Heading (H3)**: "Cancellation Policy"
  - Policy summary text:
    - "Full refund if cancelled 24+ hours before start time"
    - "50% refund if cancelled less than 24 hours before start"
    - "No refund if cancelled within 2 hours of start time"
  - **Acceptance Checkbox** (required):
    - Label: "I understand and accept the cancellation policy"
    - Link: "Read full cancellation policy" → Opens SCR-PUB-006 (Terms of Service) in new tab
    - Validation: Must be checked to submit
    - Error message: "You must accept the cancellation policy to continue"

#### Block 11: Form Actions
- **Purpose**: Submit or cancel the booking request
- **Priority**: Primary
- **Elements**:
  - **Primary CTA**: "Send Request" button
    - Action: Validate form → Authorize payment → Create booking request → Navigate to SCR-CR-008 with success modal
    - Disabled state: Gray, not clickable if form invalid or payment method missing
    - Loading state: Spinner + "Sending request..."
    - Size: Large (min 48px height for elderly users)
  - **Secondary Action**: "Cancel" button
    - Action: Confirmation modal → "Are you sure? Your progress will be lost." → Navigate back to SCR-CR-005
    - Style: Secondary button (outlined, no background)

#### Block 12: Footer (Global)
- **Purpose**: Legal links and support
- **Priority**: Tertiary
- **Elements**:
  - Footer links: About | How It Works | Safety | Terms | Privacy | Safeguarding | Contact
  - Copyright: "© 2026 [Platform Name]. All rights reserved."

**Component Reuse**: FOOTER (from dashboard-shared-components.md)

---

### 2.2 Interactive Elements

#### Primary Actions

1. **"Send Request" button**
   - Type: Primary CTA button
   - Action:
     1. Validate form fields
     2. Authorize payment via Stripe (hold, not charge)
     3. Create booking record (status: requested)
     4. Notify caregiver via email/in-app
     5. Show success modal
     6. Navigate to SCR-CR-008 (Booking Detail)
   - Validation states:
     - Disabled if: Form invalid, payment method missing, processing
     - Enabled if: All required fields valid, payment method on file
   - Keyboard: Focusable, Enter/Space to activate
   - Screen reader: "Send booking request, button"

2. **"Cancel" button**
   - Type: Secondary button
   - Action: Confirmation modal → Return to SCR-CR-005
   - Keyboard: Focusable, Enter/Space to activate

3. **"Add Payment Method" button** (if no payment method)
   - Type: Primary CTA within warning banner
   - Action: Navigate to SCR-CR-013 (Payment Methods) with return URL
   - Keyboard: Focusable

#### Secondary Actions

4. **"View Full Profile" link** (in caregiver summary)
   - Type: Text link
   - Action: Navigate to SCR-CR-005 (Caregiver Profile)

5. **"Read full cancellation policy" link**
   - Type: Text link
   - Action: Open SCR-PUB-006 (Terms) in new tab

6. **Date picker** (calendar widget)
   - Type: Custom date input component
   - Interaction: Click field → Calendar overlay → Select date → Close
   - Keyboard: Tab to field, Enter to open, arrow keys to navigate dates, Enter to select

#### Form Fields

7. **Date field** - Date picker component
8. **Start time dropdown** - Select component
9. **Duration dropdown** - Select or button group
10. **Special requests textarea** - Multi-line text input
11. **Emergency contact fields** - Text and tel inputs
12. **Cancellation policy checkbox** - Checkbox input

---

### 2.3 Data Display Elements

#### Dynamic Data

1. **Caregiver information** (Block 3)
   - Source: `caregiver_profiles` table via `:caregiverId` route parameter
   - Data: name, photo, hourly_rate, distance, rating, review_count, verification_status

2. **Payment method status** (Block 4)
   - Source: `stripe_payment_methods` table for current user
   - Logic: If `COUNT(stripe_payment_methods) = 0` → Show warning banner

3. **Price calculation** (Block 9)
   - Source: Real-time calculation
   - Formula:
     - Subtotal = hourly_rate × duration_hours
     - Service fee = Subtotal × 0.15 (15%)
     - Total = Subtotal + Service fee
   - Updates: On duration field change

4. **Emergency contact** (Block 8)
   - Source: `care_receiver_profiles.emergency_contact_*` fields
   - Auto-filled, editable

5. **Caregiver availability** (Block 5, date picker)
   - Source: `caregiver_availability` table
   - Display: Calendar shows available dates highlighted
   - Validation: Selected date must be in available dates array

#### Static Content

- Section headings, labels, help text, policy summary (defined in element inventory above)

---

### 2.4 Validation Rules

**Client-Side Validation**:

| Field | Rules | Error Message |
|-------|-------|---------------|
| Booking Date | Required, must be future date, must be in caregiver's availability | "Please select an available date" |
| Start Time | Required | "Please select a start time" |
| Duration | Required, minimum 2 hours | "Minimum booking duration is 2 hours" |
| Special Requests | Optional, max 500 characters | "Special requests must be 500 characters or less" |
| Emergency Contact Name | Required, 2-100 characters | "Emergency contact name is required" |
| Emergency Contact Phone | Required, valid UK phone format | "Please enter a valid UK phone number" |
| Emergency Contact Relationship | Required | "Please specify relationship to emergency contact" |
| Cancellation Policy Acceptance | Required (must be checked) | "You must accept the cancellation policy to continue" |

**Server-Side Validation**:

| Condition | Error Response | User Message |
|-----------|----------------|--------------|
| Caregiver no longer available | 400 Bad Request | "This caregiver is no longer available. Please search for another caregiver." |
| Date/time conflict | 400 Bad Request | "This date and time is no longer available. Please select another slot." |
| Payment authorization failed | 400 Bad Request | "Unable to authorize payment. Please check your payment method or try another card." |
| User has no payment method | 400 Bad Request | Banner: "Add a payment method to continue" |

---

## 3. ASCII Wireframes

### 3.1 Desktop Wireframe (1440px+)

#### State 1: Form Ready (Payment Method Exists)

```
+------------------------------------------------------------------------------+
|  [LOGO]           Dashboard   Search   My Bookings   Messages         [USER▼]|
+------------------------------------------------------------------------------+
|                                                                              |
|  Breadcrumb: Search > Mary Thompson > Request Booking                       |
|                                                                              |
|  H1: Request Booking with Mary                                               |
|  Complete this form to send a booking request. Mary has 24 hours to respond.|
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  CAREGIVER SUMMARY                                                     |  |
|  |                                                                        |  |
|  |  [Photo]  Mary Thompson                    £18.00/hour                |  |
|  |           ★★★★☆ 4.8 (24 reviews)           3.2 miles from you         |  |
|  |           ✓ Identity Verified  ✓ DBS Verified                         |  |
|  |           [Companionship Services Only]                               |  |
|  |                                                                        |  |
|  |           View Full Profile →                                          |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +-----------------------------------+  +--------------------------------+   |
|  |  BOOKING DETAILS                  |  |  BOOKING SUMMARY               |   |
|  |                                   |  |                                |   |
|  |  Booking Date *                   |  |  Service: Companionship (4h)   |   |
|  |  [  Select date...  ▼  ]         |  |  Rate: £18.00/hour             |   |
|  |  Select a date when Mary is       |  |  Subtotal: £72.00              |   |
|  |  available                        |  |  Platform service fee (15%):    |   |
|  |                                   |  |  £10.80                         |   |
|  |  Start Time *                     |  |  ──────────────────────────    |   |
|  |  [  Select time...  ▼  ]         |  |  Total: £75.60                 |   |
|  |                                   |  |                                |   |
|  |  Duration *                       |  |  Payment will be authorized    |   |
|  |  ○ 2 hours  ○ 3 hours             |  |  now and charged when Mary     |   |
|  |  ● 4 hours  ○ 6 hours  ○ 8 hours  |  |  accepts.                      |   |
|  |  Minimum booking duration is 2h   |  |                                |   |
|  |                                   |  |                                |   |
|  |  ─────────────────────────────    |  +--------------------------------+   |
|  |                                   |                                       |
|  |  Service Type                     |                                       |
|  |  Companionship [Companionship     |                                       |
|  |  Services Only]                   |                                       |
|  |  Personal care services are       |                                       |
|  |  available from Tier 2 onwards    |                                       |
|  |                                   |                                       |
|  |  ─────────────────────────────    |                                       |
|  |                                   |                                       |
|  |  Special Requests or Notes        |                                       |
|  |  (optional)                       |                                       |
|  |  +------------------------------+ |                                       |
|  |  | Example: I'd like to go for  | |                                       |
|  |  | a walk if the weather is     | |                                       |
|  |  | nice, or we can stay in...   | |                                       |
|  |  +------------------------------+ |                                       |
|  |  450 characters remaining         |                                       |
|  |                                   |                                       |
|  +-----------------------------------+                                       |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  EMERGENCY CONTACT                                                     |  |
|  |  This person will be notified if there's an emergency during booking  |  |
|  |                                                                        |  |
|  |  Emergency Contact Name *          Emergency Contact Phone *          |  |
|  |  [Jane Smith                 ]     [07700 900123              ]       |  |
|  |                                                                        |  |
|  |  Relationship *                                                        |  |
|  |  [Daughter                   ▼]                                       |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  CANCELLATION POLICY                                                   |  |
|  |                                                                        |  |
|  |  • Full refund if cancelled 24+ hours before start time               |  |
|  |  • 50% refund if cancelled less than 24 hours before start            |  |
|  |  • No refund if cancelled within 2 hours of start time                |  |
|  |                                                                        |  |
|  |  ☑ I understand and accept the cancellation policy                    |  |
|  |    Read full cancellation policy →                                     |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  [Cancel]                                              [Send Request]       |
|                                                                              |
+------------------------------------------------------------------------------+
| About | How It Works | Safety | Terms | Privacy | Safeguarding | Contact    |
| © 2026 Platform Name. All rights reserved.                                  |
+------------------------------------------------------------------------------+
```

---

#### State 2: Payment Method Missing (Warning Banner)

```
+------------------------------------------------------------------------------+
|  [LOGO]           Dashboard   Search   My Bookings   Messages         [USER▼]|
+------------------------------------------------------------------------------+
|                                                                              |
|  Breadcrumb: Search > Mary Thompson > Request Booking                       |
|                                                                              |
|  H1: Request Booking with Mary                                               |
|  Complete this form to send a booking request. Mary has 24 hours to respond.|
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  | ⚠️  Add a payment method to continue                                    |  |
|  |     You'll need to add a card before you can send a booking request   |  |
|  |                                                        [Add Payment →] |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  CAREGIVER SUMMARY                                                     |  |
|  |                                                                        |  |
|  |  [Photo]  Mary Thompson                    £18.00/hour                |  |
|  |           ★★★★☆ 4.8 (24 reviews)           3.2 miles from you         |  |
|  |           ✓ Identity Verified  ✓ DBS Verified                         |  |
|  |           [Companionship Services Only]                               |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +-----------------------------------+  +--------------------------------+   |
|  |  BOOKING DETAILS                  |  |  BOOKING SUMMARY               |   |
|  |  (Form fields shown but disabled) |  |  (Price calculation visible)   |   |
|  |                                   |  |                                |   |
|  +-----------------------------------+  +--------------------------------+   |
|                                                                              |
|  [Cancel]                                   [Send Request] (DISABLED)       |
|                                                                              |
+------------------------------------------------------------------------------+
```

---

#### State 3: Validation Errors

```
+------------------------------------------------------------------------------+
|  [LOGO]           Dashboard   Search   My Bookings   Messages         [USER▼]|
+------------------------------------------------------------------------------+
|                                                                              |
|  Breadcrumb: Search > Mary Thompson > Request Booking                       |
|                                                                              |
|  H1: Request Booking with Mary                                               |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  CAREGIVER SUMMARY                                                     |  |
|  |  [Photo]  Mary Thompson   ★★★★☆ 4.8   £18.00/hour   3.2 miles        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +-----------------------------------+  +--------------------------------+   |
|  |  BOOKING DETAILS                  |  |  BOOKING SUMMARY               |   |
|  |                                   |  |                                |   |
|  |  Booking Date *                   |  |  Service: Companionship        |   |
|  |  [  Select date...  ▼  ]         |  |  Please complete booking       |   |
|  |  ⚠️ Please select an available    |  |  details to see price          |   |
|  |     date                          |  |                                |   |
|  |                                   |  |                                |   |
|  |  Start Time *                     |  |                                |   |
|  |  [  Select time...  ▼  ]         |  |                                |   |
|  |  ⚠️ Please select a start time    |  |                                |   |
|  |                                   |  |                                |   |
|  |  Duration *                       |  |                                |   |
|  |  ○ 2 hours  ○ 3 hours  ○ 4 hours  |  |                                |   |
|  |  ○ 6 hours  ○ 8 hours             |  |                                |   |
|  |  ⚠️ Please select a duration      |  |                                |   |
|  +-----------------------------------+  +--------------------------------+   |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  CANCELLATION POLICY                                                   |  |
|  |  ☐ I understand and accept the cancellation policy                    |  |
|  |  ⚠️ You must accept the cancellation policy to continue               |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  [Cancel]                                              [Send Request]       |
|                                                                              |
+------------------------------------------------------------------------------+
```

---

#### State 4: Submitting (Loading)

```
+------------------------------------------------------------------------------+
|  [LOGO]           Dashboard   Search   My Bookings   Messages         [USER▼]|
+------------------------------------------------------------------------------+
|                                                                              |
|  Breadcrumb: Search > Mary Thompson > Request Booking                       |
|                                                                              |
|  H1: Request Booking with Mary                                               |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  CAREGIVER SUMMARY                                                     |  |
|  |  [Photo]  Mary Thompson   ★★★★☆ 4.8   £18.00/hour   3.2 miles        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +-----------------------------------+  +--------------------------------+   |
|  |  BOOKING DETAILS                  |  |  BOOKING SUMMARY               |   |
|  |  (All fields disabled)            |  |  Total: £75.60                 |   |
|  +-----------------------------------+  +--------------------------------+   |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  ⏳ Sending your booking request...                                    |  |
|  |     Please wait while we authorize payment and notify Mary            |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  [Cancel] (DISABLED)                        [⏳ Sending request...] (DISABLED)|
|                                                                              |
+------------------------------------------------------------------------------+
```

---

### 3.2 Tablet Wireframe (768px-1439px)

```
+----------------------------------------------------------+
|  [LOGO]     Dashboard   Search   Bookings         [USER▼]|
|             Messages                                     |
+----------------------------------------------------------+
|                                                          |
|  Search > Mary Thompson > Request Booking                |
|                                                          |
|  H1: Request Booking with Mary                           |
|  Complete this form to send a booking request.           |
|  Mary has 24 hours to respond.                           |
|                                                          |
|  +----------------------------------------------------+  |
|  |  [Photo]  Mary Thompson          £18.00/hour      |  |
|  |           ★★★★☆ 4.8 (24)         3.2 miles        |  |
|  |           ✓ Identity  ✓ DBS                       |  |
|  |           [Companionship Only]                    |  |
|  |           View Full Profile →                      |  |
|  +----------------------------------------------------+  |
|                                                          |
|  +----------------------------------------------------+  |
|  |  BOOKING DETAILS                                   |  |
|  |                                                    |  |
|  |  Booking Date *                                    |  |
|  |  [  Select date...  ▼  ]                          |  |
|  |                                                    |  |
|  |  Start Time *          Duration *                 |  |
|  |  [Select time ▼]       ● 4 hours                  |  |
|  |                                                    |  |
|  |  Service Type                                      |  |
|  |  Companionship [Companionship Services Only]      |  |
|  |                                                    |  |
|  |  Special Requests (optional)                      |  |
|  |  +----------------------------------------------+  |  |
|  |  | Type your notes here...                      |  |  |
|  |  +----------------------------------------------+  |  |
|  |  450 characters remaining                         |  |
|  +----------------------------------------------------+  |
|                                                          |
|  +----------------------------------------------------+  |
|  |  BOOKING SUMMARY                                   |  |
|  |  Service: Companionship (4 hours)                 |  |
|  |  Rate: £18.00/hour                                |  |
|  |  Subtotal: £72.00                                 |  |
|  |  Platform service fee (15%): £10.80                 |  |
|  |  ────────────────────────────────                 |  |
|  |  Total: £75.60                                    |  |
|  +----------------------------------------------------+  |
|                                                          |
|  +----------------------------------------------------+  |
|  |  EMERGENCY CONTACT                                 |  |
|  |  Emergency Contact Name *                          |  |
|  |  [Jane Smith                           ]           |  |
|  |  Emergency Contact Phone *                         |  |
|  |  [07700 900123                         ]           |  |
|  |  Relationship *                                    |  |
|  |  [Daughter                             ▼]          |  |
|  +----------------------------------------------------+  |
|                                                          |
|  +----------------------------------------------------+  |
|  |  CANCELLATION POLICY                               |  |
|  |  ☑ I understand and accept the policy             |  |
|  |    Read full policy →                              |  |
|  +----------------------------------------------------+  |
|                                                          |
|  [Cancel]                           [Send Request]      |
|                                                          |
+----------------------------------------------------------+
| About | Terms | Privacy | Contact                        |
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
|  Search > Mary > Booking             |
|                                      |
|  H1: Request Booking                 |
|      with Mary                       |
|  Complete this form. Mary has 24h    |
|  to respond.                         |
|                                      |
|  +--------------------------------+  |
|  |  [Photo]  Mary Thompson        |  |
|  |           ★★★★☆ 4.8 (24)       |  |
|  |           £18.00/hour          |  |
|  |           3.2 miles            |  |
|  |           ✓ ID  ✓ DBS          |  |
|  |           [Companionship Only] |  |
|  |           View Profile →        |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  BOOKING DETAILS               |  |
|  |                                |  |
|  |  Booking Date *                |  |
|  |  [  Select date...  ▼  ]      |  |
|  |                                |  |
|  |  Start Time *                  |  |
|  |  [  Select time...  ▼  ]      |  |
|  |                                |  |
|  |  Duration *                    |  |
|  |  ○ 2h  ○ 3h  ● 4h  ○ 6h  ○ 8h  |  |
|  |                                |  |
|  |  Service: Companionship        |  |
|  |                                |  |
|  |  Special Requests (optional)   |  |
|  |  +---------------------------+ |  |
|  |  | Notes here...             | |  |
|  |  +---------------------------+ |  |
|  |  450 chars remaining           |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  BOOKING SUMMARY               |  |
|  |                                |  |
|  |  Companionship (4h)            |  |
|  |  Rate: £18/hour                |  |
|  |  Subtotal: £72.00              |  |
|  |  service fee (15%): £10.80       |  |
|  |  ──────────────────            |  |
|  |  Total: £75.60                 |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  EMERGENCY CONTACT             |  |
|  |  Name *                        |  |
|  |  [Jane Smith            ]      |  |
|  |  Phone *                       |  |
|  |  [07700 900123          ]      |  |
|  |  Relationship *                |  |
|  |  [Daughter              ▼]     |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  ☑ I accept cancellation       |  |
|  |    policy  Read policy →       |  |
|  +--------------------------------+  |
|                                      |
|  [Cancel]                            |
|  [Send Request]                      |
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
| **Mobile** (320px-767px) | Single column, stacked sections, condensed caregiver card, vertical button stack | Essential fields only |
| **Tablet** (768px-1439px) | Single column with sidebar for summary, 2-column emergency contact fields | Condensed layouts |
| **Desktop** (1440px+) | 2-column layout (form left, summary sidebar right), full caregiver card | Full layout |

### 4.2 Layout Changes by Viewport

#### Desktop (1440px+)
- **Layout**: 2-column (60% form / 40% sidebar)
  - Left column: Booking Details, Service Type, Special Requests, Emergency Contact, Cancellation Policy
  - Right sidebar: Booking Summary (sticky on scroll)
- **Caregiver Summary**: Full horizontal card with all details visible
- **Buttons**: Horizontal (Cancel left, Send Request right)

#### Tablet (768px-1439px)
- **Layout**: Single column, Booking Summary below form (not sidebar)
- **Emergency Contact**: 2-column grid (Name + Phone on one row, Relationship below)
- **Buttons**: Horizontal (smaller)

#### Mobile (320px-767px)
- **Layout**: Single column, all stacked
- **Caregiver Summary**: Compact vertical card
- **Duration**: Button group wraps (2-3-4-6-8 hours)
- **Emergency Contact**: All fields stacked vertically
- **Buttons**: Stacked vertically (Cancel, then Send Request)

### 4.3 Touch Target Sizes

**Mobile Requirements** (elderly-friendly):
- Minimum touch target: **48x48px** (WCAG AAA)
- Primary "Send Request" button: **56px height minimum**, full width
- Dropdown triggers: **48px height**
- Radio buttons (duration): **44x44px** tap area
- Checkbox (cancellation policy): **32x32px** visible box, **44x44px** tap area
- Spacing between fields: **16px minimum**

---

## 5. UI States

### 5.1 Loading State

**Initial Page Load**:
```
+------------------------------------------------------------------------------+
|  [LOGO]           Dashboard   Search   My Bookings   Messages         [USER▼]|
+------------------------------------------------------------------------------+
|                                                                              |
|  Breadcrumb: Search > Mary Thompson > Request Booking                       |
|                                                                              |
|  H1: Request Booking with Mary                                               |
|  Loading booking form...                                                     |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  [Loading skeleton - Caregiver card]                                   |  |
|  |  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░         |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +-----------------------------------+  +--------------------------------+   |
|  |  [Loading skeleton - Form]        |  |  [Loading skeleton - Summary]  |   |
|  |  ░░░░░░░░░░░░░░░░░░░░░░░░░░       |  |  ░░░░░░░░░░░░░░░░░░░░░░       |   |
|  +-----------------------------------+  +--------------------------------+   |
+------------------------------------------------------------------------------+
```

**Submitting Request**:
- Overlay: Semi-transparent gray over entire form
- Spinner: Center of screen with message "Sending your booking request..."
- All form fields: Disabled
- "Send Request" button: Disabled, text changes to "Sending request..."
- "Cancel" button: Disabled

### 5.2 Empty States

**No Payment Method on File**:
- Warning banner at top (yellow/amber background)
- Form fields visible but not functional
- "Send Request" button disabled
- "Add Payment Method" button prominent in banner

### 5.3 Error States

**Form Validation Errors** (inline):
- Date field: Red border + error icon + message below "Please select an available date"
- Start time: Red border + message "Please select a start time"
- Duration: Red border + message "Please select a duration"
- Emergency contact fields: Red border + specific messages
- Cancellation checkbox: Red outline + message "You must accept the cancellation policy to continue"

**Server Errors**:

**Payment Authorization Failed**:
```
+------------------------------------------------------------------------+
| ⚠️  Payment authorization failed                                        |
|     Unable to authorize payment. Please check your payment method or   |
|     try another card.                                                  |
|                                                         [Try Again]    |
+------------------------------------------------------------------------+
```

**Caregiver No Longer Available**:
```
+------------------------------------------------------------------------+
| ⚠️  Caregiver no longer available                                       |
|     This caregiver is no longer accepting bookings. Please search for  |
|     another caregiver.                                                 |
|                                                   [Back to Search]     |
+------------------------------------------------------------------------+
```

**Generic Server Error**:
```
+------------------------------------------------------------------------+
| ⚠️  Unable to send request                                              |
|     Something went wrong. Please try again or contact support.         |
|                                                         [Try Again]    |
+------------------------------------------------------------------------+
```

### 5.4 Success State

**Booking Request Sent** (modal overlay):
```
+------------------------------------------------+
|                                                |
|      ✅  Booking Request Sent!                 |
|                                                |
|      Your request has been sent to Mary.       |
|      She has 24 hours to respond.              |
|                                                |
|      You'll receive an email and notification  |
|      when she accepts or declines.             |
|                                                |
|           [View Booking Details]               |
|                                                |
+------------------------------------------------+
```
- Auto-redirect to SCR-CR-008 (Booking Detail, status: requested) after 3 seconds
- User can click "View Booking Details" to go immediately

### 5.5 Price Calculation State

**Real-Time Price Update**:
- Triggers: User changes duration dropdown
- Updates immediately (no delay)
- Animation: Subtle fade-in when price changes
- Format:
  - Duration changes: "Companionship (2 hours)" → "Companionship (4 hours)"
  - Subtotal recalculates: "£36.00" → "£72.00"
  - Service fee recalculates: "£1.80" → "£10.80"
  - Total recalculates: "£37.80" → "£75.60"

---

## 6. Accessibility Requirements

### 6.1 WCAG 2.1 AA Compliance

#### Perceivable

- **Text Alternatives**:
  - ✅ All icons have `aria-label`: Warning icon has "Warning", success checkmark has "Success"
  - ✅ Caregiver photo has alt text: "Mary Thompson profile photo"
  - ✅ Verification badges have text + icons: "Identity Verified" not just checkmark icon

- **Distinguishable**:
  - ✅ Color contrast: 4.5:1 for body text, 3.0:1 for large text
  - ✅ Error states: Red border + icon + text message (not color alone)
  - ✅ Required field indicator: Asterisk (*) + `aria-required="true"`
  - ✅ Font sizes: 16px minimum body, 18px buttons, 20px headings
  - ✅ Spacing: Line height 1.5, field spacing 16px

#### Operable

- **Keyboard Accessible**:
  - ✅ All form fields focusable via Tab
  - ✅ Date picker: Keyboard navigable (arrow keys for date selection)
  - ✅ Duration radio buttons: Arrow keys to switch selection
  - ✅ Focus order: Caregiver summary → Date → Time → Duration → Special requests → Emergency contact (Name → Phone → Relationship) → Policy checkbox → Cancel button → Send Request button
  - ✅ Focus indicators: 3px solid border with high contrast color

- **Enough Time**:
  - ✅ No time limits on form completion
  - ✅ Session timeout warning: 15 minutes before expiry

- **Navigable**:
  - ✅ Skip to main content link
  - ✅ Page title: "[Platform Name] - Request Booking with Mary Thompson"
  - ✅ Heading hierarchy: H1 (page title) → H2 (section headings) → H3 (subsections)
  - ✅ Landmark regions: `<header>`, `<main>`, `<form>`, `<aside>` (summary), `<footer>`

#### Understandable

- **Readable**:
  - ✅ Language declared: `<html lang="en-GB">`
  - ✅ Jargon avoided: "Booking Date" not "Service request date"
  - ✅ Clear labels: "Special Requests or Notes" with help text example
  - ✅ Error messages: Specific and actionable ("Please select an available date" not "Invalid input")

- **Predictable**:
  - ✅ Consistent button placement (Cancel left, Primary action right)
  - ✅ No unexpected navigation (form doesn't auto-submit)
  - ✅ Price updates indicated visually (subtle animation)

- **Input Assistance**:
  - ✅ All fields have labels
  - ✅ Required fields marked with * and `aria-required="true"`
  - ✅ Help text for complex fields (date picker, special requests)
  - ✅ Inline validation with clear error messages
  - ✅ Error summary at form submission if multiple errors (top of form)

#### Robust

- **Compatible**:
  - ✅ Valid HTML5 semantic markup
  - ✅ ARIA roles: `role="alert"` for error messages, `role="status"` for loading states
  - ✅ Form semantics: `<form>`, `<label for="fieldId">`, `<fieldset>` for grouped fields
  - ✅ Tested with screen readers (NVDA, JAWS, VoiceOver)

### 6.2 Focus Order

**Tab Order** (Desktop):
1. Skip to main content link
2. Platform logo
3. Header navigation (Dashboard, Search, Bookings, Messages)
4. User profile dropdown
5. Breadcrumb links
6. Caregiver summary "View Full Profile" link
7. "Add Payment Method" button (if payment method missing)
8. **Form fields (in order)**:
   - Booking date field
   - Start time dropdown
   - Duration radio buttons (Tab to group, arrow keys to select)
   - Special requests textarea
   - Emergency contact name
   - Emergency contact phone
   - Emergency contact relationship dropdown
   - Cancellation policy checkbox
   - "Read full cancellation policy" link
9. "Cancel" button
10. "Send Request" button
11. Footer links

### 6.3 Screen Reader Announcements

**Page Load**:
- "Request Booking with Mary Thompson. Form page. Complete this form to send a booking request. Mary has 24 hours to respond."

**Field Focus**:
- Date field: "Booking date, required. Select a date when Mary is available. Date picker."
- Duration: "Duration, required. Radio button group. 2 hours, 3 hours, 4 hours, 6 hours, 8 hours."
- Cancellation checkbox: "I understand and accept the cancellation policy. Required checkbox, not checked."

**Error Announcement**:
- On submit with errors: "Form submission failed. 3 errors found. Please correct the highlighted fields."
- Individual field error: "Booking date, required. Error: Please select an available date."

**Price Update**:
- `aria-live="polite"` on booking summary: "Total updated. £75.60"

**Success Modal**:
- `role="dialog"` + `aria-labelledby`: "Booking Request Sent! Your request has been sent to Mary. She has 24 hours to respond."

### 6.4 Elderly User Considerations

**Cognitive Load Reduction**:
- ✅ Single-column form (no overwhelming multi-column layouts)
- ✅ One question at a time (fields grouped logically)
- ✅ Clear visual hierarchy (large headings, distinct sections)
- ✅ Generous white space (24px+ between sections)
- ✅ Familiar patterns (standard date picker, dropdowns)

**Vision Support**:
- ✅ Large font sizes (16px minimum, 18px for CTAs)
- ✅ High contrast colors
- ✅ Icons paired with text labels
- ✅ Zoom support: Page readable at 200% zoom
- ✅ No fixed-size containers that break on zoom

**Motor Control**:
- ✅ Large touch targets (48x48px minimum, 56px for primary button)
- ✅ Ample spacing between fields (16px minimum)
- ✅ No hover-only interactions (all actions accessible via tap/click)
- ✅ Error tolerance: Cancellation checkbox easy to find and click

**Trust & Transparency**:
- ✅ Real-time price display (no hidden fees)
- ✅ Clear cancellation policy before submission
- ✅ Payment note: "Payment will be authorized now and charged when Mary accepts"
- ✅ Emergency contact always visible

---

## 7. Navigation & Interactions

### 7.1 Primary User Flow

**Happy Path**:
1. User lands on form from SCR-CR-005 (Caregiver Profile) after clicking "Request Booking"
2. Page loads with caregiver summary pre-filled
3. User checks if payment method banner is present:
   - If yes → Click "Add Payment Method" → Navigate to SCR-CR-013 → Add card → Return to form
   - If no → Continue
4. User selects booking date from date picker (calendar shows available dates)
5. User selects start time from dropdown (08:00-20:00)
6. User selects duration (radio button group: 2, 3, 4, 6, 8 hours)
7. Price summary updates in real-time
8. User optionally adds special requests (textarea, 500 char limit)
9. User reviews auto-filled emergency contact (editable)
10. User checks cancellation policy checkbox
11. User clicks "Send Request" button
12. System validates form:
    - If errors → Display inline error messages, focus first error field
    - If valid → Continue
13. System authorizes payment via Stripe (card hold, not charge)
14. System creates booking record (status: requested)
15. System notifies caregiver via email/in-app
16. Success modal appears: "Booking Request Sent!"
17. Auto-redirect to SCR-CR-008 (Booking Detail, status: requested) after 3 seconds

### 7.2 Alternative Paths

**Path A: User Cancels**
1. User clicks "Cancel" button at any time
2. Confirmation modal appears: "Are you sure? Your progress will be lost."
3. User confirms → Navigate back to SCR-CR-005 (Caregiver Profile)
4. User declines → Close modal, stay on form

**Path B: Payment Authorization Fails**
1. User submits form (step 12 above)
2. Stripe payment authorization fails (card declined, insufficient funds)
3. Error banner appears: "Payment authorization failed. Please check your payment method or try another card."
4. User clicks "Update Payment Method" → Navigate to SCR-CR-013 → Update card → Return to form
5. User retries submission

**Path C: Caregiver No Longer Available**
1. User submits form (step 12 above)
2. Server validates caregiver availability
3. Caregiver has just been booked by another user (conflict)
4. Error banner appears: "This caregiver is no longer available for the selected date/time. Please select another date or search for another caregiver."
5. User options:
   - Select different date → Retry submission
   - Click "Back to Search" → Navigate to SCR-CR-003

**Path D: Validation Errors**
1. User submits form without completing required fields
2. Inline error messages appear below each invalid field
3. Error summary appears at top of form: "Please correct 3 errors below"
4. Focus moves to first error field
5. User corrects errors
6. User resubmits

### 7.3 Interaction Patterns

**Date Picker Interaction**:
- Click date field → Calendar overlay appears
- Calendar shows:
  - Available dates: Green highlight
  - Unavailable dates: Gray, not clickable
  - Today: Bold border
- User clicks available date → Date populates field → Calendar closes
- Keyboard: Arrow keys navigate dates, Enter selects, Escape closes

**Duration Selection**:
- Radio button group (single selection)
- Click any option → Price summary updates immediately
- Keyboard: Arrow keys move between options
- Visual feedback: Selected option has filled circle + bold label

**Price Summary Updates**:
- Triggers: Duration field changes
- Update pattern:
  1. User selects new duration
  2. Subtotal recalculates (rate × duration)
  3. Service fee recalculates (subtotal × 0.15)
  4. Total recalculates (subtotal + service fee)
  5. Subtle fade-in animation (200ms)
- No loading state (instant update)

**Character Counter (Special Requests)**:
- Live counter: "450 characters remaining"
- Updates on every keystroke
- Warning threshold: <50 chars remaining → Yellow text
- Limit reached: 0 chars → Red text, prevent further input
- Accessible: `aria-live="polite"` announcement at 50, 10, 0 chars

**Cancellation Policy Checkbox**:
- Required field
- User must check to enable "Send Request" button
- Link "Read full cancellation policy" opens SCR-PUB-006 in new tab
- Keyboard: Space to toggle, Enter on link to open

---

## 8. Design Notes

### 8.1 Design Principles Applied

**1. Transparency & Trust**
- Real-time price calculation visible at all times
- No hidden fees: "Platform service fee (15%)" clearly stated
- Payment note: "Payment will be authorized now and charged when Mary accepts"
- Cancellation policy displayed before submission
- Caregiver verification badges visible

**2. Simplicity & Clarity**
- Single-column form layout (no overwhelming multi-column)
- Logical field grouping: Booking Details → Special Requests → Emergency Contact → Policy
- Clear labels: "Booking Date" not "Service Request Date"
- Minimal required fields (only 7 required fields)

**3. Error Prevention**
- Date picker shows only available dates (can't select unavailable)
- Duration minimum enforced (2 hours)
- Character counter prevents over-limit input
- Payment method check before form submission
- Confirmation modal for cancel action

**4. Accessibility First**
- Large font sizes (16px minimum)
- High contrast colors
- Large touch targets (48x48px minimum)
- Clear focus indicators
- Keyboard accessible throughout

**5. Elderly-Friendly**
- Familiar form patterns (date picker, dropdowns)
- Generous white space
- Icons paired with text
- No time pressure (no countdown timers)
- Auto-filled emergency contact (reduces cognitive load)

### 8.2 Content Hierarchy

**Visual Hierarchy**:
1. **H1**: "Request Booking with [Caregiver]" (largest, boldest)
2. **Caregiver Summary Card**: Prominent at top, provides context
3. **H2**: Section headings (Booking Details, Emergency Contact, Cancellation Policy)
4. **Form Fields**: Clearly labeled, adequate spacing
5. **Booking Summary**: Sidebar (desktop) or below form (mobile), always visible
6. **Buttons**: "Send Request" primary (brand color, large), "Cancel" secondary (outlined)

**Information Priority**:
- **Most Important**: Caregiver summary (who you're booking), date/time (when), price (how much)
- **Important**: Special requests (optional context), emergency contact (safety)
- **Secondary**: Cancellation policy (required acceptance, but less urgent)

### 8.3 Color & Status Indicators

**Color Usage**:
- **Primary CTA** (Send Request): Brand color (sage green #84A98C)
- **Secondary Button** (Cancel): Outlined, no fill
- **Warning Banner** (Payment method missing): Yellow/amber background (#FEF3C7), amber border (#F59E0B)
- **Error States**: Red border (#EF4444), red text for messages
- **Success Modal**: Green checkmark (#10B981), white background

**Component Reuse**:
- Warning banner: ALERT-BANNER component (dashboard-shared-components.md)
- Buttons: BUTTON component (primary, secondary variants)
- Success modal: MODAL component with success variant

### 8.4 Typography Scale

**Recommended Sizes** (minimum):
- **H1** (Page title): 28px (desktop), 24px (tablet), 20px (mobile)
- **H2** (Section headings): 22px (desktop), 20px (tablet), 18px (mobile)
- **Body text** (labels, help text): 16px (all viewports)
- **Field input text**: 16px (all viewports, prevents zoom on iOS)
- **Button text**: 18px (primary), 16px (secondary)
- **Price total**: 24px (bold)

**Font Weights**:
- **H1**: Bold (700)
- **H2**: Semibold (600)
- **Body**: Regular (400)
- **Buttons**: Semibold (600)
- **Price total**: Bold (700)

### 8.5 Spacing & Layout

**Section Spacing**:
- Between sections (Caregiver → Booking Details → Emergency Contact): 32px (desktop), 24px (mobile)
- Between form fields: 16px (desktop), 12px (mobile)
- Field padding: 12px vertical, 16px horizontal

**Button Spacing**:
- Between Cancel and Send Request: 16px horizontal (desktop), 12px vertical (mobile stacked)
- Button padding: 16px horizontal, 14px vertical (primary), 12px/10px (secondary)

### 8.6 Component Reuse

**Shared Components** (from dashboard-shared-components.md):
1. **NAV-HEADER-AUTH**: Global navigation header
2. **FOOTER**: Legal links footer
3. **BUTTON**: Primary, secondary, destructive variants
4. **ALERT-BANNER**: Warning variant (payment method missing)
5. **MODAL**: Success variant (booking request sent)
6. **STATUS-BADGE**: "Companionship Services Only" badge
7. **USER-AVATAR**: Caregiver profile photo

**New Components Introduced** (to be added to design system):
1. **DATE-PICKER**: Calendar widget for date selection with availability highlighting
2. **PRICE-SUMMARY-CARD**: Real-time price calculation display
3. **CAREGIVER-SUMMARY-CARD**: Compact caregiver info for booking context

---

## 9. Cross-References

### Source Documents

**Route Map**:
- `/docs/product/tier1-route-map.md` - SCR-CR-006 definition

**Feature Specifications**:
- `/docs/product/features/tier1-booking-specification.md` - Booking request creation (REQ-BR-001 to REQ-BR-006)

**User Flows**:
- `/docs/tiers/tier1/draft-design-specs/user-flows/care-receiver-first-booking.md` - Steps 16-18 (booking request flow)

**Screen Inventory**:
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` - SCR-CR-006 details (lines 647-719)

**Components**:
- `/docs/tiers/tier1/draft-design-specs/components/dashboard-shared-components.md` - Shared component specs

**Related Screens**:
- SCR-CR-005: Caregiver Profile (entry point)
- SCR-CR-003: Caregiver Search (entry point)
- SCR-CR-008: Booking Detail (exit point on success)
- SCR-CR-013: Payment Methods (exit point if no payment method)
- SCR-PUB-006: Terms of Service (cancellation policy link)

---

## 10. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-08 | UX Designer | Initial wireframes and element inventory for Figma handoff |

---

**END OF DOCUMENT**

**Status**: ✅ READY FOR FIGMA HANDOFF

**Next Steps**:
1. Figma designer creates high-fidelity mockups based on these wireframes
2. Visual design applies brand colors, typography, and imagery
3. Interactive prototype for date picker and price calculation
4. Engineering handoff with form validation specifications
