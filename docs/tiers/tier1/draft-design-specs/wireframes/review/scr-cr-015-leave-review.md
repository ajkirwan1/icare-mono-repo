# Leave Review Wireframes (SCR-CR-015)

**Document Purpose**: ASCII wireframes and complete element inventory for Leave Review screen (SCR-CR-015)

**Screen ID**: SCR-CR-015
**Screen Name**: Leave Review
**User Role**: Care Receiver, Family Member
**Route**: `/bookings/:bookingId/review`
**R0/R1**: R0 (Decision CB-006)
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
8. [Design Notes](#8-design-notes)

---

## 1. Screen Purpose

### 1.1 Purpose Statement

The Leave Review screen enables care receivers (and family members) to submit a star rating and optional text review for a caregiver after a completed booking. Reviews build caregiver trust signals and support platform quality monitoring.

**Key Functions**:
- Display booking summary (caregiver, date, service type)
- Collect star rating (1-5 stars, required)
- Collect optional text review (500 characters max)
- Submit review and update booking status to `reviewed`
- Display review confirmation and next steps (book again, back to dashboard)

**Critical Constraints**:
- Only available for bookings with status `completed` or `payment_released`
- User must be the care receiver or linked family member
- One review per booking (cannot edit or delete after submission)
- Review published immediately (no admin approval required for R0)

### 1.2 Entry Points

**From Booking Detail**:
- SCR-CR-008 (Booking Detail) → "Leave Review" button → Load review form
  - Available when status = `payment_released` or `reviewed` (if not already reviewed)

**From Dashboard**:
- SCR-CR-001 (Care Receiver Dashboard) → "Review completed booking" prompt → Load review form

**From Email Notification**:
- "Leave a review for [Caregiver Name]" email → Click link → Load review form (requires login)

### 1.3 Exit Points

**After Submission**:
- Success confirmation → "Back to Dashboard" → SCR-CR-001
- Success confirmation → "Book [Caregiver Name] Again" → SCR-CR-006 (pre-filled with caregiver)

**Alternative Paths**:
- "Cancel" → Back to SCR-CR-008 (Booking Detail)
- Breadcrumb → SCR-CR-001 (Dashboard) or SCR-CR-008 (Booking Detail)

---

## 2. Element Inventory

### 2.1 Content Blocks

#### Block 1: Header (Global)
- **Component Reuse**: NAV-HEADER-AUTH (from dashboard-shared-components.md)

#### Block 2: Page Header
- **Purpose**: Set context and confirm which booking is being reviewed
- **Priority**: Primary
- **Elements**:
  - Breadcrumb: "Dashboard > My Bookings > Booking Details > Leave Review"
  - H1: "Leave a Review"
  - Subtitle: "Share your experience with [Caregiver Name]"

#### Block 3: Booking Summary Card
- **Purpose**: Confirm booking context (which session is being reviewed)
- **Priority**: Primary
- **Elements**:
  - **Caregiver Information**:
    - Profile photo (80x80px)
    - Full name (H2): "[Caregiver First Name] [Last Initial]"
    - Verification badges: "✓ Identity Verified" "✓ DBS Verified"
    - Current average rating: "★★★★☆ 4.8 (24 reviews)"
  - **Booking Details**:
    - Date: "Wednesday, March 6, 2026"
    - Time: "10:00 AM - 2:00 PM"
    - Duration: "4 hours"
    - Service: "Companionship"
  - **Divider**

**Component Reuse**: USER-AVATAR, VERIFICATION-BADGE-ROW, STAR-RATING

#### Block 4: Review Form
- **Purpose**: Collect rating and optional text review
- **Priority**: Primary
- **Elements**:

##### Star Rating Section
- **Label**: "How would you rate your experience?" (H2)
- **Helper text**: "Click a star to rate (1 = Poor, 5 = Excellent)"
- **Star Rating Input** (required):
  - 5 clickable stars (large, 48x48px each on desktop, 56x56px on mobile)
  - States:
    - Empty: Outlined gray stars
    - Hover: Filled yellow stars (up to hovered star)
    - Selected: Filled yellow stars (up to selected star)
  - Accessible: Radio buttons visually hidden, stars as labels
  - Validation: Must select at least 1 star
  - Error: "Please select a star rating"

- **Rating Labels** (below stars):
  - 1 star: "Poor"
  - 2 stars: "Fair"
  - 3 stars: "Good"
  - 4 stars: "Very Good"
  - 5 stars: "Excellent"

##### Text Review Section (Optional)
- **Label**: "Tell us more about your experience (optional)" (H2)
- **Helper text**: "Share what you liked or areas for improvement. Your review will be visible to other families."
- **Textarea**:
  - Placeholder: "e.g., Mary was punctual, kind, and made my father feel very comfortable. She helped with light housework and we had a lovely afternoon."
  - Max length: 500 characters
  - Auto-resize: Grows as user types (max 8 lines, then scrolls)
  - Character counter: "250 / 500" (always visible below textarea)
  - Validation: Optional (can submit with star rating only)

**Component Reuse**: STAR-RATING (interactive variant), TEXTAREA

#### Block 5: Review Guidelines
- **Purpose**: Set expectations and encourage constructive feedback
- **Priority**: Secondary
- **Elements**:
  - **Info Box** (light blue background):
    - Icon: ℹ️
    - Heading: "Review guidelines"
    - Bullet points:
      - "Be honest and constructive"
      - "Focus on the service provided"
      - "Avoid sharing personal contact information"
      - "Reviews cannot be edited or deleted once submitted"

#### Block 6: Form Actions
- **Purpose**: Submit or cancel
- **Priority**: Primary
- **Elements**:
  - **Primary Action**: "Submit Review" button
    - Type: Primary CTA (large, prominent)
    - States: Default, Disabled (if no star rating selected), Submitting ("Submitting...")
    - Action: POST /api/reviews → Update booking status to `reviewed` → Show success modal

  - **Secondary Action**: "Cancel" button
    - Type: Secondary (outlined, left-aligned)
    - Action: Confirmation modal → "Are you sure? Your review will not be saved." → Navigate back to SCR-CR-008

**Component Reuse**: BUTTON (primary, secondary variants), MODAL

#### Block 7: Footer (Global)
- **Component Reuse**: FOOTER (from dashboard-shared-components.md)

---

### 2.2 Interactive Elements

1. **Star Rating Input**
   - Type: Radio button group (5 options: 1-5 stars)
   - Interaction: Click star → Fill stars up to clicked star → Store rating value
   - Keyboard: Left/Right arrows to select star
   - Accessibility: `role="radiogroup"`, each star is `role="radio"`

2. **Text Review Textarea**
   - Type: Multiline text input
   - Max length: 500 characters
   - Character counter: Updates on keypress
   - Keyboard: Tab to focus, Type to enter text

3. **Submit Review Button**
   - Type: Primary CTA
   - Validation: Disabled if no star rating selected
   - Action: POST /api/reviews → Success modal → Navigate to dashboard or booking detail
   - Keyboard: Focusable, Enter to submit

4. **Cancel Button**
   - Type: Secondary
   - Action: Confirmation modal → "Discard review?" → Navigate back
   - Keyboard: Focusable

---

### 2.3 Data Display Elements

#### Dynamic Data

1. **Caregiver information** (Block 3)
   - Source: `caregiver_profiles` via `bookings.caregiver_id`
   - Displays: Name, photo, verification badges, current average rating

2. **Booking details** (Block 3)
   - Source: `bookings` table
   - Displays: Date, time, duration, service type

3. **Review submission** (Block 4)
   - Inputs: Star rating (1-5), optional text (0-500 chars)
   - Outputs: Create record in `reviews` table, update `bookings.status` to `reviewed`

#### Static Content

- Section headings, helper text, guidelines, labels (defined above)

---

## 3. ASCII Wireframes

### 3.1 Desktop (1440px+) - Empty Form

```
+------------------------------------------------------------------------------+
|  [LOGO]           Dashboard   My Bookings   Messages              [USER▼]   |
+------------------------------------------------------------------------------+
|                                                                              |
|  Breadcrumb: Dashboard > My Bookings > Booking Details > Leave Review       |
|                                                                              |
|  H1: Leave a Review                                                          |
|  Share your experience with Mary                                             |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  BOOKING SUMMARY                                                       |  |
|  |                                                                        |  |
|  |  [Photo]  Mary Thompson                                               |  |
|  |           ✓ Identity Verified  ✓ DBS Verified                         |  |
|  |           ★★★★☆ 4.8 (24 reviews)                                      |  |
|  |                                                                        |  |
|  |  Date: Wednesday, March 6, 2026                                       |  |
|  |  Time: 10:00 AM - 2:00 PM                                             |  |
|  |  Duration: 4 hours                                                    |  |
|  |  Service: Companionship                                               |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  REVIEW FORM                                                           |  |
|  |                                                                        |  |
|  |  How would you rate your experience? *                                |  |
|  |  Click a star to rate (1 = Poor, 5 = Excellent)                       |  |
|  |                                                                        |  |
|  |       ☆       ☆       ☆       ☆       ☆                               |  |
|  |     Poor    Fair    Good  Very Good Excellent                         |  |
|  |                                                                        |  |
|  |  ────────────────────────────────────────────────────────────         |  |
|  |                                                                        |  |
|  |  Tell us more about your experience (optional)                        |  |
|  |  Share what you liked or areas for improvement. Your review will be   |  |
|  |  visible to other families.                                           |  |
|  |                                                                        |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  |  [Type your review here...]                                      |  |  |
|  |  |                                                                  |  |  |
|  |  |                                                                  |  |  |
|  |  |                                                                  |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  0 / 500 characters                                                   |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  ℹ️  Review guidelines                                                 |  |
|  |                                                                        |  |
|  |  • Be honest and constructive                                         |  |
|  |  • Focus on the service provided                                      |  |
|  |  • Avoid sharing personal contact information                         |  |
|  |  • Reviews cannot be edited or deleted once submitted                 |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  [Cancel]                                                   [Submit Review] |
|                                                                              |
+------------------------------------------------------------------------------+
| About | How It Works | Safety | Terms | Privacy | Safeguarding | Contact    |
| © 2026 Platform Name. All rights reserved.                                  |
+------------------------------------------------------------------------------+
```

---

### 3.2 Desktop - With Star Rating Selected (4 stars)

```
+------------------------------------------------------------------------------+
|  REVIEW FORM                                                                 |
|                                                                              |
|  How would you rate your experience? *                                      |
|  Click a star to rate (1 = Poor, 5 = Excellent)                             |
|                                                                              |
|       ★       ★       ★       ★       ☆                                      |
|     Poor    Fair    Good  Very Good Excellent                               |
|                                                                              |
|  ────────────────────────────────────────────────────────────               |
|                                                                              |
|  Tell us more about your experience (optional)                              |
|  Share what you liked or areas for improvement.                             |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  [Type your review here...]                                            |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|  0 / 500 characters                                                         |
|                                                                              |
+------------------------------------------------------------------------------+
|  [Cancel]                                                   [Submit Review] |
+------------------------------------------------------------------------------+
```

**Visual States**:
- Filled stars: Yellow (#F59E0B)
- Empty star: Gray outline (#D1D5DB)
- Hover state: Stars fill as cursor moves left to right

---

### 3.3 Desktop - With Text Review Entered

```
+------------------------------------------------------------------------------+
|  REVIEW FORM                                                                 |
|                                                                              |
|  How would you rate your experience? *                                      |
|                                                                              |
|       ★       ★       ★       ★       ★                                      |
|     Poor    Fair    Good  Very Good Excellent                               |
|                                                                              |
|  ────────────────────────────────────────────────────────────               |
|                                                                              |
|  Tell us more about your experience (optional)                              |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  Mary was punctual, kind, and made my father feel very comfortable.   |  |
|  |  She helped with light housework and we had a lovely afternoon. I     |  |
|  |  would highly recommend her to other families.                        |  |
|  +------------------------------------------------------------------------+  |
|  167 / 500 characters                                                       |
|                                                                              |
+------------------------------------------------------------------------------+
|  [Cancel]                                                   [Submit Review] |
+------------------------------------------------------------------------------+
```

---

### 3.4 Mobile (320px-767px) - Empty Form

```
+--------------------------------------+
|  ☰  [LOGO]                  [USER▼]  |
+--------------------------------------+
|                                      |
|  Dashboard > Bookings > Review       |
|                                      |
|  H1: Leave a Review                  |
|  Share your experience with Mary     |
|                                      |
|  +--------------------------------+  |
|  |  BOOKING SUMMARY               |  |
|  |                                |  |
|  |  [Photo]  Mary Thompson        |  |
|  |           ✓ ID  ✓ DBS          |  |
|  |           ★★★★☆ 4.8 (24)       |  |
|  |                                |  |
|  |  Date: Wed, March 6, 2026      |  |
|  |  Time: 10:00 AM - 2:00 PM      |  |
|  |  Duration: 4 hours             |  |
|  |  Service: Companionship        |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  REVIEW                        |  |
|  |                                |  |
|  |  Rate your experience *        |  |
|  |                                |  |
|  |    ☆    ☆    ☆    ☆    ☆       |  |
|  |  (Larger stars, 56x56px each)  |  |
|  |                                |  |
|  |  Poor     Good     Excellent   |  |
|  |                                |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  Tell us more (optional)       |  |
|  |                                |  |
|  |  [Type your review...]         |  |
|  |                                |  |
|  |                                |  |
|  |                                |  |
|  +--------------------------------+  |
|  0 / 500 characters                  |
|                                      |
|  +--------------------------------+  |
|  |  ℹ️  Review guidelines         |  |
|  |  • Be honest                   |  |
|  |  • Focus on service            |  |
|  |  • No contact info             |  |
|  |  • Cannot edit after submit    |  |
|  +--------------------------------+  |
|                                      |
|  [Cancel]                            |
|  [Submit Review]                     |
|                                      |
+--------------------------------------+
| About | Terms | Privacy              |
| © 2026 Platform Name                 |
+--------------------------------------+
```

---

### 3.5 Success Modal (After Submission)

```
+------------------------------------------------+
|                                                |
|      ✅  Review Submitted                      |
|                                                |
|      Thank you for sharing your feedback!      |
|      Your review has been published and will   |
|      help other families find great care.      |
|                                                |
|      Your review:                              |
|      ★★★★★ 5 stars                             |
|      "Mary was punctual, kind, and made my     |
|      father feel very comfortable..."          |
|                                                |
|      [Back to Dashboard]                       |
|      [Book Mary Again]                         |
|                                                |
+------------------------------------------------+
```

---

### 3.6 Validation Error (No Star Rating)

```
+------------------------------------------------------------------------------+
|  REVIEW FORM                                                                 |
|                                                                              |
|  How would you rate your experience? *                                      |
|  Click a star to rate (1 = Poor, 5 = Excellent)                             |
|                                                                              |
|       ☆       ☆       ☆       ☆       ☆                                      |
|     Poor    Fair    Good  Very Good Excellent                               |
|                                                                              |
|  ⚠️  Please select a star rating                                            |
|                                                                              |
+------------------------------------------------------------------------------+
|  [Cancel]                                      [Submit Review] (Disabled)   |
+------------------------------------------------------------------------------+
```

---

## 4. Responsive Behavior

### 4.1 Breakpoints

| Viewport | Layout Changes | Priority |
|----------|----------------|----------|
| **Mobile** (320px-767px) | Single column, stacked sections, larger stars (56x56px) | Essential content only |
| **Tablet** (768px-1439px) | Single column, medium stars (48x48px) | Condensed |
| **Desktop** (1440px+) | Single column (centered, max-width 800px), standard stars (48x48px) | Full layout |

### 4.2 Layout Changes by Viewport

#### Desktop (1440px+)
- **Layout**: Single column, centered (max-width 800px)
- **Booking summary**: Horizontal card (photo left, details right)
- **Star rating**: 48x48px stars, horizontal labels below
- **Action buttons**: Horizontal (Cancel left, Submit Review right)

#### Tablet (768px-1439px)
- **Layout**: Single column, full width
- **Booking summary**: Condensed horizontal card
- **Star rating**: 48x48px stars
- **Action buttons**: Horizontal (smaller spacing)

#### Mobile (320px-767px)
- **Layout**: Single column, full width
- **Booking summary**: Vertical card (photo top, details below)
- **Star rating**: **56x56px stars** (larger for easier tapping)
- **Star labels**: Condensed (only show "Poor", "Good", "Excellent")
- **Action buttons**: Stacked vertically, full width
- **Character counter**: Below textarea (always visible)

### 4.3 Touch Target Sizes

**Mobile Requirements**:
- Star rating buttons: **56x56px** each
- Submit button: **56px height**, full width
- Cancel button: **48px height**, full width
- Textarea: **48px minimum height** (auto-grows)

---

## 5. UI States

### 5.1 Loading State

**Initial Page Load**:
```
+------------------------------------------------------------------------------+
|  [LOGO]           Dashboard   My Bookings   Messages              [USER▼]   |
+------------------------------------------------------------------------------+
|                                                                              |
|  Breadcrumb: Dashboard > My Bookings > Loading...                           |
|                                                                              |
|  H1: Loading...                                                              |
|                                                                              |
|  [Loading skeleton - Booking summary]                                       |
|  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░         |
|                                                                              |
|  [Loading skeleton - Review form]                                           |
|  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░         |
|                                                                              |
+------------------------------------------------------------------------------+
```

**Submitting Review**:
- Submit button: "Submitting..." (disabled, loading spinner)
- Form disabled (cannot edit while submitting)

### 5.2 Empty States

**Already Reviewed** (if user navigates to this URL after already submitting):
```
+------------------------------------------------------------------------+
|      ℹ️  Review already submitted                                      |
|                                                                        |
|      You have already submitted a review for this booking.            |
|      Reviews cannot be edited or deleted once submitted.              |
|                                                                        |
|      [View Your Review]    [Back to Dashboard]                        |
+------------------------------------------------------------------------+
```

**Booking Not Eligible for Review**:
```
+------------------------------------------------------------------------+
|      ⚠️  Cannot review this booking                                    |
|                                                                        |
|      This booking is not eligible for review. You can only review     |
|      completed bookings.                                              |
|                                                                        |
|      Current status: [Requested/Accepted/In Progress/Cancelled]       |
|                                                                        |
|      [Back to Booking Details]                                        |
+------------------------------------------------------------------------+
```

### 5.3 Error States

**Failed to Load Booking**:
```
+------------------------------------------------------------------------+
| ⚠️  Unable to load booking                                              |
|     We couldn't retrieve booking details. Please try again or contact |
|     support.                                                           |
|                                                         [Try Again]    |
+------------------------------------------------------------------------+
```

**Failed to Submit Review**:
```
+------------------------------------------------------------------------+
| ⚠️  Unable to submit review                                             |
|     Something went wrong. Please try again or contact support.        |
|                                                         [Try Again]    |
+------------------------------------------------------------------------+
```

**Validation Error (No Star Rating)**:
```
(Shown in wireframe 3.6 above)
```

### 5.4 Success States

**Review Submitted** (modal shown in wireframe 3.5 above)

---

## 6. Accessibility Requirements

### 6.1 WCAG 2.1 AA Compliance

#### Perceivable

- **Text Alternatives**:
  - ✅ Caregiver photo: alt text "[Name] profile photo"
  - ✅ Star icons: Text labels ("1 star", "2 stars", etc.) for screen readers
  - ✅ Verification badges: "Identity Verified" and "DBS Verified" text

- **Distinguishable**:
  - ✅ Color contrast: 4.5:1 for body text, 3.0:1 for star icons
  - ✅ Star rating: Not color alone (filled vs outlined)
  - ✅ Font sizes: 16px minimum for body text
  - ✅ Star rating labels: Visible text ("Poor", "Fair", "Good", etc.)

#### Operable

- **Keyboard Accessible**:
  - ✅ Tab order: Breadcrumb → Star rating → Textarea → Cancel button → Submit button
  - ✅ Star rating: Left/Right arrow keys to select, Space/Enter to confirm
  - ✅ All buttons focusable via Tab
  - ✅ Focus indicators: 3px solid border with high contrast

- **Navigable**:
  - ✅ Skip to main content link
  - ✅ Page title: "[Platform Name] - Leave Review for [Caregiver Name]"
  - ✅ Heading hierarchy: H1 (page title) → H2 (section headings)
  - ✅ Landmark regions: `<header>`, `<main>`, `<footer>`

#### Understandable

- **Readable**:
  - ✅ Language declared: `<html lang="en-GB">`
  - ✅ Clear labels: "How would you rate your experience?" not "Rating?"
  - ✅ Helper text: "Click a star to rate (1 = Poor, 5 = Excellent)"
  - ✅ Error messages: Specific ("Please select a star rating")

- **Predictable**:
  - ✅ Consistent navigation (header/footer same across all screens)
  - ✅ Submit button disabled until required field (star rating) completed
  - ✅ Confirmation modal for cancel action (prevent accidental loss)

- **Input Assistance**:
  - ✅ Required field marked with asterisk (*)
  - ✅ Helper text for star rating and textarea
  - ✅ Character counter for textarea (always visible)
  - ✅ Guidelines box with expectations

#### Robust

- **Compatible**:
  - ✅ Valid HTML5 semantic markup
  - ✅ ARIA roles: `role="radiogroup"` for star rating, `role="radio"` for each star
  - ✅ ARIA labels: `aria-label="Rate 4 out of 5 stars"` on each star

### 6.2 Focus Order

**Tab Order** (Desktop):
1. Skip to main content link
2. Header navigation
3. User profile dropdown
4. Breadcrumb links
5. **Star Rating**:
   - Radio button group (1 star, 2 stars, 3 stars, 4 stars, 5 stars)
   - Left/Right arrows to navigate, Space to select
6. **Textarea** (optional review text)
7. **Cancel Button**
8. **Submit Review Button**
9. Footer links

### 6.3 Screen Reader Announcements

**Page Load**:
- "Leave a Review for [Caregiver Name]. Booking from [Date] at [Time]."

**Star Rating Selection**:
- `aria-live="polite"`: "4 out of 5 stars selected"

**Character Counter**:
- `aria-live="polite"`: "167 of 500 characters" (announced every 50 characters)

**Validation Error**:
- `role="alert"`: "Please select a star rating"

**Submit Success**:
- `role="alert"`: "Review submitted successfully. Thank you for your feedback."

### 6.4 Elderly User Considerations

**Cognitive Load Reduction**:
- ✅ Clear booking summary (confirms which session is being reviewed)
- ✅ Simple star rating (familiar 1-5 scale)
- ✅ Optional text review (star rating only is sufficient)
- ✅ Guidelines box sets clear expectations
- ✅ One primary action: "Submit Review"

**Vision Support**:
- ✅ Large stars (48x48px desktop, 56x56px mobile)
- ✅ High contrast stars (yellow filled vs gray outlined)
- ✅ Large font sizes (16px minimum)
- ✅ Star labels below stars ("Poor", "Fair", "Good", etc.)

**Motor Control**:
- ✅ Large touch targets (56x56px stars on mobile)
- ✅ Ample spacing between stars (16px minimum)
- ✅ No hover-only interactions (tap/click to select)
- ✅ Full-width buttons on mobile

**Trust & Safety**:
- ✅ Guidelines box explains review will be public
- ✅ Warning: "Cannot edit or delete once submitted"
- ✅ Confirmation of booking details before review

---

## 7. Navigation & Interactions

### 7.1 Primary User Flows

**Flow 1: Submit Review with Star Rating Only**
1. User lands on review form (from SCR-CR-008 "Leave Review")
2. Booking summary displayed (caregiver, date, service)
3. User clicks 4th star → 4 stars filled (yellow)
4. Star rating stored (rating = 4)
5. User clicks "Submit Review" (text review left blank)
6. Confirmation modal: "Are you sure? You can add more details." → User confirms
7. System creates review record (rating = 4, text = null)
8. System updates booking status to `reviewed`
9. Success modal: "Review Submitted. Thank you!"
10. User clicks "Back to Dashboard" → Navigate to SCR-CR-001

**Flow 2: Submit Review with Star Rating and Text**
1. User lands on review form
2. User clicks 5th star → 5 stars filled
3. User types in textarea: "Mary was punctual, kind, and made my father feel very comfortable. She helped with light housework and we had a lovely afternoon. I would highly recommend her to other families."
4. Character counter updates: "167 / 500"
5. User clicks "Submit Review"
6. System creates review record (rating = 5, text = "[review text]")
7. System updates booking status to `reviewed`
8. Success modal: "Review Submitted. Your review: ★★★★★ 5 stars '[review text]'"
9. User clicks "Book Mary Again" → Navigate to SCR-CR-006 (pre-filled with Mary)

**Flow 3: Cancel Review**
1. User starts filling review form
2. User selects 3 stars
3. User types partial review text
4. User clicks "Cancel"
5. Confirmation modal: "Are you sure? Your review will not be saved."
6. User confirms
7. Navigate back to SCR-CR-008 (Booking Detail)

**Flow 4: Validation Error (No Star Rating)**
1. User lands on review form
2. User types review text (no star rating selected)
3. User clicks "Submit Review"
4. Validation error: "⚠️ Please select a star rating"
5. Submit button disabled
6. User selects 4 stars
7. Validation error clears
8. Submit button enabled
9. User clicks "Submit Review" → Success

### 7.2 Alternative Paths

**Path A: Already Reviewed**
1. User navigates to `/bookings/:bookingId/review`
2. System checks: User already reviewed this booking
3. Display empty state: "Review already submitted"
4. User clicks "View Your Review" → Navigate to SCR-CR-008 (scroll to review section)

**Path B: Booking Not Eligible**
1. User navigates to `/bookings/:bookingId/review`
2. System checks: Booking status is `requested` (not completed)
3. Display error state: "Cannot review this booking. Current status: Requested."
4. User clicks "Back to Booking Details" → Navigate to SCR-CR-008

**Path C: Star Rating Hover Interaction** (Desktop)
1. User hovers over 3rd star
2. Stars 1, 2, 3 fill yellow (preview)
3. User moves cursor away → Stars reset to empty
4. User clicks 3rd star → Stars 1, 2, 3 fill yellow (selected)
5. User hovers over 5th star → Stars 1, 2, 3, 4, 5 fill yellow (preview)
6. User clicks 5th star → Stars 1, 2, 3, 4, 5 fill yellow (selected, rating = 5)

### 7.3 Interaction Patterns

**Star Rating Selection**:
- Click interaction: Click star → Fill stars up to clicked star → Store rating
- Hover interaction (desktop only): Hover star → Preview fill → Remove cursor → Reset
- Keyboard interaction: Left/Right arrows → Navigate stars → Space/Enter → Select
- Visual feedback: Filled stars yellow (#F59E0B), outlined stars gray (#D1D5DB)
- Labels below: "Poor" (1), "Fair" (2), "Good" (3), "Very Good" (4), "Excellent" (5)

**Character Counter**:
- Updates on keypress
- Format: "167 / 500 characters"
- Color: Gray if <450, Orange if 450-500, Red if at 500 (cannot type more)
- Accessible: `aria-live="polite"` announcement every 50 characters

**Cancel Confirmation**:
- Triggered if user has entered any data (star rating or text)
- Modal: "Are you sure? Your review will not be saved."
- Actions: [Continue Editing] [Discard Review]
- If user clicks "Discard" → Navigate to SCR-CR-008

---

## 8. Design Notes

### 8.1 Design Principles Applied

**1. Simplicity & Clarity**
- Star rating is large and prominent (most important input)
- Text review optional (reduces pressure)
- Booking summary confirms context (which session is being reviewed)
- Guidelines box sets clear expectations

**2. Trust & Transparency**
- Warning: "Reviews cannot be edited or deleted once submitted"
- Review will be public (stated in helper text)
- Booking details visible (confirms authenticity)

**3. Accessibility First**
- Large star rating buttons (56x56px on mobile)
- Keyboard navigation (Left/Right arrows for stars)
- Screen reader labels for each star ("Rate 4 out of 5 stars")
- High contrast stars (yellow vs gray)

**4. Elderly-Friendly**
- Large touch targets (56x56px stars on mobile)
- Simple 1-5 star scale (familiar pattern)
- Optional text review (no pressure to write)
- Guidelines box explains what happens to review

**5. Quality Monitoring**
- Reviews published immediately (no admin approval)
- Cannot edit or delete (prevents manipulation)
- Star rating required (ensures every review has quantitative data)
- Text review optional (encourages participation)

### 8.2 Content Hierarchy

**Visual Hierarchy**:
1. **Booking Summary** (top): Confirms which session is being reviewed
2. **Star Rating** (center): Primary input, most prominent
3. **Text Review** (below stars): Secondary input, optional
4. **Guidelines** (bottom): Sets expectations
5. **Submit Button** (primary CTA, right-aligned)

**Information Priority**:
- Caregiver name and photo (booking summary)
- Star rating input (required)
- Text review input (optional)
- Guidelines (transparency)

### 8.3 Color & Star Indicators

**Star Rating Colors**:
| State | Color | Icon |
|-------|-------|------|
| Empty | Gray outline (#D1D5DB) | ☆ |
| Hover (preview) | Yellow (#F59E0B) | ★ |
| Selected | Yellow (#F59E0B) | ★ |

**Star Labels**:
| Rating | Label |
|--------|-------|
| 1 star | "Poor" |
| 2 stars | "Fair" |
| 3 stars | "Good" |
| 4 stars | "Very Good" |
| 5 stars | "Excellent" |

**Component Reuse**:
- Star rating: STAR-RATING component (interactive variant)
- User avatar: USER-AVATAR component
- Verification badges: VERIFICATION-BADGE-ROW component
- Buttons: BUTTON component (primary, secondary variants)
- Modal: MODAL component
- Textarea: TEXTAREA component

### 8.4 Typography Scale

**Recommended Sizes**:
- **H1** (Page title): 28px (desktop), 24px (mobile)
- **H2** (Section headings): 22px (desktop), 20px (mobile)
- **Caregiver name**: 20px (semibold)
- **Body text**: 16px (all viewports)
- **Helper text**: 14px (gray)
- **Star labels**: 14px (below stars)
- **Character counter**: 14px (gray)
- **Button text**: 18px (submit), 16px (cancel)

**Font Weights**:
- **H1, H2**: Semibold (600)
- **Caregiver name**: Semibold (600)
- **Body text**: Regular (400)
- **Helper text**: Regular (400)
- **Buttons**: Semibold (600)

### 8.5 Spacing & Layout

**Section Spacing**:
- Page header to booking summary: 24px
- Booking summary to review form: 32px
- Review form to guidelines: 24px
- Guidelines to action buttons: 32px

**Star Rating Spacing**:
- Between stars: 16px (desktop), 12px (mobile)
- Stars to labels: 8px
- Star size: 48x48px (desktop), 56x56px (mobile)

**Button Spacing**:
- Between Cancel and Submit: 16px horizontal (desktop)
- Stacked on mobile: 12px vertical

### 8.6 New Components Introduced

1. **STAR-RATING-INPUT**: Interactive 5-star rating input with hover/click states
2. **REVIEW-GUIDELINES-BOX**: Info box with bullet points and light blue background

---

## 9. Cross-References

### Source Documents

**Screen Inventory**:
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` - SCR-CR-015 details (lines 952-1013)

**Route Map**:
- `/docs/product/tier1-route-map.md` - SCR-CR-015 route definition and RBAC

**Feature Specifications**:
- `/docs/product/features/tier1-booking-specification.md` - Review submission requirements (REQ-BR-001 to REQ-BR-003)

**User Flows**:
- `/docs/tiers/tier1/draft-design-specs/user-flows/care-receiver-first-booking.md` - Review submission context (after booking completion)

**Components**:
- `/docs/tiers/tier1/draft-design-specs/components/dashboard-shared-components.md` - Shared component specs

**Related Screens**:
- SCR-CR-008: Booking Detail - Entry point via "Leave Review" button
- SCR-CR-001: Care Receiver Dashboard - Exit point via "Back to Dashboard"
- SCR-CR-006: Booking Request Form - Exit point via "Book [Caregiver] Again"
- SCR-CR-005: Caregiver Profile - View caregiver's existing reviews

---

## 10. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-11 | UX Designer | Initial wireframes for leave review screen |

---

**END OF DOCUMENT**

**Status**: ✅ READY FOR FIGMA HANDOFF

**Next Steps**:
1. Figma designer creates high-fidelity mockups for star rating input (hover/click states)
2. Visual design applies brand colors to stars (yellow filled, gray outlined)
3. Interactive prototype for star rating hover interaction (desktop)
4. Engineering handoff with review submission API specifications
