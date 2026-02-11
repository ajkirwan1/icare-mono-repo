# Caregiver Onboarding Wireframes (SCR-CG-002)

**Document Purpose**: ASCII wireframes and complete element inventory for Caregiver Onboarding (SCR-CG-002)

**Screen ID**: SCR-CG-002
**Screen Name**: Caregiver Onboarding
**User Role**: Caregiver (pending_verification)
**Route**: `/caregiver/onboarding`
**R0/R1**: R0 (Supply-side critical)
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
8. [Compliance & GDPR](#8-compliance--gdpr)
9. [Design Notes](#9-design-notes)

---

## 1. Screen Purpose

### 1.1 Purpose Statement

The Caregiver Onboarding screen guides newly registered caregivers through a 5-step wizard to complete their profile and submit for admin verification. This is the critical supply-side activation funnel.

**Key Functions**:
- Step 1 (Profile): Upload photo, write bio, enter experience
- Step 2 (Services): Select service types and radius
- Step 3 (Availability): Set recurring weekly schedule
- Step 4 (Rate): Set hourly rate with market guidance
- Step 5 (Verification): Link to ID, Right to Work, DBS verification screens
- Submit completed profile for admin review

### 1.2 Entry Points

- SCR-AUTH-004 (Phone Verification) → After registration + phone verify
- SCR-CG-001 (Caregiver Dashboard) → If onboarding incomplete, banner links here

### 1.3 Exit Points

- SCR-CG-008 (Identity Verification) → From Step 5
- SCR-CG-009 (Right to Work) → From Step 5
- SCR-CG-010 (DBS Submission) → From Step 5
- SCR-CG-001 (Dashboard) → After submission or "Save and Continue Later"

---

## 2. Element Inventory

### 2.1 Content Blocks

#### Block 1: Minimal Navigation Header
- **Elements**:
  - Platform logo → Homepage
  - "Save and Continue Later" link (right-aligned)
  - User name (no full nav — onboarding is a focused flow)

#### Block 2: Progress Bar
- **Elements**:
  - Step indicator: "Step X of 5"
  - 5 steps labelled: Profile, Services, Availability, Rate, Verification
  - Visual: circles with checkmarks for completed, filled for current, empty for future
  - Connecting lines between steps

#### Step 1: Profile

- **Section Label**: "Create Your Professional Profile"
- **Fields**:
  - Profile photo upload (required, max 5MB, JPG/PNG)
    - Upload area with camera icon
    - Guidance: "Upload a clear, professional photo. This will be visible to care receivers."
    - Preview circle (150px)
  - Professional bio (textarea, required)
    - Label: "About you"
    - Placeholder: "Tell care receivers about yourself, your experience, and why you enjoy caregiving..."
    - Validation: 100-500 characters
    - Character count: "0/500"
    - Helper text: "Minimum 100 characters. Share your personality and approach to care."
  - Years of experience (number input, required)
    - Label: "Years of experience in care"
    - Placeholder: "e.g., 3"
    - Validation: 0-50

#### Step 2: Services

- **Section Label**: "What services do you offer?"
- **Helper text**: "Tier 1 services only — companionship and light support. Personal care services will be available in future tiers."
- **Fields**:
  - Service types (checkboxes, at least one required):
    - [ ] Companionship (conversation, activities, outings)
    - [ ] Light housework and cleaning
    - [ ] Shopping and errands
    - [ ] Meal preparation (no feeding assistance)
    - [ ] Transportation (if you have a vehicle)
  - Service radius (dropdown, required):
    - Label: "How far are you willing to travel?"
    - Options: 5 miles, 10 miles, 15 miles, 20 miles, 30 miles

#### Step 3: Availability

- **Section Label**: "Set your availability"
- **Helper text**: "Set your recurring weekly schedule. You can update this anytime from your dashboard."
- **Fields**:
  - Weekly schedule grid:
    - Rows: Monday–Sunday
    - Columns: Morning (6am-12pm), Afternoon (12pm-5pm), Evening (5pm-9pm)
    - Toggle cells on/off (checkbox or click-to-toggle)
  - Validation: At least one time slot required

#### Step 4: Rate

- **Section Label**: "Set your hourly rate"
- **Fields**:
  - Hourly rate (number input with £ prefix, required)
    - Label: "Your hourly rate"
    - Placeholder: "e.g., 15"
    - Validation: £10-£100
    - Error: "Rate must be between £10 and £100 per hour"
  - Market guidance (info box):
    - "Typical companionship rates in your area: £12-£18/hour"
    - "Set a competitive rate to attract more bookings"
  - Commission info box:
    - "Platform commission: 15% of your hourly rate"
    - "For a £15/hour rate, you'll earn £12.75 per hour after commission"

#### Step 5: Verification

- **Section Label**: "Verification Documents"
- **Helper text**: "Complete identity and right to work verification. DBS is optional for companionship services."
- **Elements**:
  - Identity Verification card:
    - Status badge (Not Submitted / Pending / Verified / Rejected)
    - "Verify Identity" button → SCR-CG-008
  - Right to Work card:
    - Status badge
    - "Verify Right to Work" button → SCR-CG-009
  - DBS Check card (OPTIONAL):
    - "OPTIONAL" badge (blue)
    - Status badge
    - "Submit DBS" button → SCR-CG-010
    - "Skip" text link
    - Helper: "DBS is optional for companionship. Submit for a 'DBS Verified' badge."

#### Block 3: Navigation Buttons
- **Elements**:
  - "Back" button (secondary, left-aligned) — hidden on Step 1
  - "Next" button (primary, right-aligned) — Steps 1-4
  - "Submit for Review" button (primary, right-aligned) — Step 5 only
  - "Save and Continue Later" text link (centered below buttons)

---

### 2.2 Validation Rules

| Field | Validation | Error Message |
|-------|-----------|---------------|
| Profile photo | Required, max 5MB, JPG/PNG | "Please upload a profile photo" |
| Bio | Required, 100-500 chars | "Bio must be 100-500 characters" |
| Experience | Required, 0-50 | "Please enter years of experience" |
| Services | At least one checked | "Please select at least one service" |
| Radius | Required | "Please select a service radius" |
| Availability | At least one slot | "Please select at least one time slot" |
| Hourly rate | Required, £10-100 | "Rate must be between £10 and £100" |
| Identity | Must be submitted (Pending+) | "Identity verification required" |
| Right to Work | Must be submitted (Pending+) | "Right to work verification required" |

---

## 3. ASCII Wireframes

### 3.1 Desktop — Step 1: Profile

```
+------------------------------------------------------------------------------+
|  [LOGO]                                       Save and Continue Later  Emma  |
+------------------------------------------------------------------------------+
|                                                                              |
|        (1)---------(2)---------(3)---------(4)---------(5)                   |
|      Profile     Services   Availability    Rate    Verification             |
|                                                                              |
|              H2: Create Your Professional Profile                            |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |                                                                        |  |
|  |              +------------------+                                      |  |
|  |              |    📷            |                                      |  |
|  |              |  Upload Photo    |                                      |  |
|  |              +------------------+                                      |  |
|  |       Upload a clear, professional photo.                              |  |
|  |                                                                        |  |
|  |  About you *                                                           |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | Tell care receivers about yourself, your experience, and why     |  |  |
|  |  | you enjoy caregiving...                                          |  |  |
|  |  |                                                                  |  |  |
|  |  |                                                                  |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  0/500 characters (minimum 100)                                        |  |
|  |                                                                        |  |
|  |  Years of experience in care *                                         |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | e.g., 3                                                          |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|                                                      [ NEXT → ]              |
|                                                                              |
|                     Save and Continue Later                                   |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 3.2 Desktop — Step 3: Availability

```
+------------------------------------------------------------------------------+
|  [LOGO]                                       Save and Continue Later  Emma  |
+------------------------------------------------------------------------------+
|                                                                              |
|        (✓)---------(✓)---------(3)---------(4)---------(5)                   |
|      Profile     Services   Availability    Rate    Verification             |
|                                                                              |
|                    H2: Set your availability                                 |
|       Set your recurring weekly schedule. Update anytime.                    |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |           | Morning (6am-12pm) | Afternoon (12-5pm) | Evening (5-9pm) |  |
|  |  ---------|--------------------|--------------------|-----------------|  |
|  |  Monday   |       [✓]          |       [✓]          |       [ ]       |  |
|  |  Tuesday  |       [✓]          |       [✓]          |       [ ]       |  |
|  |  Wednesday|       [ ]          |       [✓]          |       [ ]       |  |
|  |  Thursday |       [✓]          |       [✓]          |       [ ]       |  |
|  |  Friday   |       [✓]          |       [ ]          |       [ ]       |  |
|  |  Saturday |       [ ]          |       [ ]          |       [ ]       |  |
|  |  Sunday   |       [ ]          |       [ ]          |       [ ]       |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|                    [ ← BACK ]                [ NEXT → ]                      |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 3.3 Desktop — Step 5: Verification

```
+------------------------------------------------------------------------------+
|  [LOGO]                                       Save and Continue Later  Emma  |
+------------------------------------------------------------------------------+
|                                                                              |
|        (✓)---------(✓)---------(✓)---------(✓)---------(5)                   |
|      Profile     Services   Availability    Rate    Verification             |
|                                                                              |
|                 H2: Verification Documents                                   |
|     Complete identity and right to work verification.                        |
|     DBS is optional for companionship services.                              |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  Identity Verification                    ⚪ Not Submitted              |  |
|  |  Upload a government-issued ID                                         |  |
|  |                                                  [ VERIFY IDENTITY ]   |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  Right to Work Verification               ⚪ Not Submitted              |  |
|  |  Confirm your right to work in the UK                                  |  |
|  |                                             [ VERIFY RIGHT TO WORK ]   |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  DBS Check                    🔵 OPTIONAL   ⚪ Not Submitted            |  |
|  |  Submit existing DBS certificate for 'DBS Verified' badge              |  |
|  |                                                    [ SUBMIT DBS ]      |  |
|  |                                                    Skip for now        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|          [ ← BACK ]                          [ SUBMIT FOR REVIEW ]           |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 3.4 Mobile — Step 1

```
+--------------------------------------+
|  [LOGO]              Save Later      |
+--------------------------------------+
|                                      |
|  (1)---(2)---(3)---(4)---(5)        |
|  Profile                             |
|                                      |
|  H2: Create Your Profile             |
|                                      |
|         +------------------+         |
|         |    📷 Upload     |         |
|         +------------------+         |
|                                      |
|  About you *                         |
|  +--------------------------------+  |
|  | Tell care receivers about      |  |
|  | yourself...                    |  |
|  |                                |  |
|  +--------------------------------+  |
|  0/500 (min 100)                     |
|                                      |
|  Years of experience *               |
|  +--------------------------------+  |
|  | e.g., 3                        |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |           NEXT →               |  |
|  +--------------------------------+  |
|                                      |
|       Save and Continue Later        |
|                                      |
+--------------------------------------+
```

---

## 4. Responsive Behavior

| Viewport | Layout Changes |
|----------|----------------|
| **Mobile** (320px-767px) | Full-width, stacked. Availability grid scrolls horizontally. Step labels hidden (numbers only). |
| **Tablet** (768px-1439px) | Centered form max-width 700px. Full step labels. |
| **Desktop** (1440px+) | Centered form max-width 700px. Full step labels. Side-by-side Back/Next buttons. |

---

## 5. UI States

### 5.1 Step Incomplete Warning

```
+----------------------------------------------------------------------+
|  ⚠️  Complete all required fields before proceeding.                  |
+----------------------------------------------------------------------+
```

### 5.2 Submitted State

```
+----------------------------------------------------------------------+
|                                                                      |
|  ✅  Profile submitted for review!                                    |
|                                                                      |
|  Admin review typically takes 24-48 hours.                           |
|  We'll email you at emma@example.com when verified.                  |
|                                                                      |
|                  [ GO TO DASHBOARD ]                                 |
|                                                                      |
+----------------------------------------------------------------------+
```

### 5.3 Photo Upload Progress

```
  +------------------+
  |  ████████░░  80%  |
  |  Uploading...     |
  +------------------+
```

---

## 6. Accessibility Requirements

### 6.1 Focus Order (per step)

1. Skip to main content
2. Logo
3. Save and Continue Later
4. Step indicator (informational, not interactive)
5. Form fields in order
6. Back button (if visible)
7. Next / Submit button
8. Save and Continue Later link

### 6.2 Screen Reader Announcements

- **Step Change**: "Step 2 of 5: Services. Define the services you offer."
- **Step Complete**: "Step 1 complete. Moving to Step 2: Services."
- **Photo Uploaded**: "Profile photo uploaded successfully."
- **Submitted**: "Profile submitted for review. Admin review takes 24-48 hours."

### 6.3 Availability Grid

- Grid uses `role="grid"` with `role="row"` and `role="gridcell"`
- Each cell is a checkbox: "Monday Morning, unchecked"
- Arrow key navigation between cells

---

## 7. Navigation & Interactions

### 7.1 Primary User Flow

1. Caregiver arrives at `/caregiver/onboarding` after phone verification
2. Completes Step 1 (Profile): photo, bio, experience → Next
3. Completes Step 2 (Services): selects services, radius → Next
4. Completes Step 3 (Availability): sets schedule → Next
5. Completes Step 4 (Rate): enters hourly rate → Next
6. Step 5 (Verification): completes ID and Right to Work verifications
7. Clicks "Submit for Review"
8. Confirmation: "Admin review takes 24-48 hours"
9. Redirected to SCR-CG-001 (Dashboard) with "Pending Review" status

**Estimated Time**: 10-15 minutes (excluding verification document uploads)

### 7.2 Save and Continue Later

1. At any step, click "Save and Continue Later"
2. Progress saved to server
3. Redirected to Dashboard with "Complete Onboarding" banner
4. Returning resumes at last incomplete step

---

## 8. Compliance & GDPR

- **Lawful basis**: Contract (profile creation for service delivery)
- **Data minimisation**: Only fields necessary for caregiver matching
- **Photo consent**: Caregiver consents to photo being visible on profile
- **Commission transparency**: 15% rate shown at Step 4 (GDPR transparency)
- **Self-employed status**: Already acknowledged at registration (SCR-AUTH-003)

---

## 9. Design Notes

### 9.1 Design Principles

**1. Progressive Disclosure**: One step at a time, reducing cognitive load.
**2. Save Progress**: Never lose work — save at every step.
**3. Clear Guidance**: Market rate hints, character counts, photo guidelines.
**4. Optional DBS**: Clearly marked as optional with "Skip" option.

### 9.2 Component Reuse

- Step indicator (5 steps)
- Input field, textarea, dropdown, checkbox
- File upload (photo)
- Availability grid (new component)
- Button (primary, secondary)
- Alert banner (warning, success)
- Verification status cards

---

## 10. Cross-References

- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` — SCR-CG-002
- `/docs/product/features/tier1-verification-specification.md` — Verification flow
- `/docs/tiers/tier1/draft-design-specs/user-flows/caregiver-onboarding.md` — User flow
- SCR-CG-008: Identity Verification
- SCR-CG-009: Right to Work Verification
- SCR-CG-010: DBS Check Submission

---

## 11. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-11 | UX Designer | Initial wireframes and element inventory |

---

**END OF DOCUMENT**

**Status**: READY FOR FIGMA HANDOFF
