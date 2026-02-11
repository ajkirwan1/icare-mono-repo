# Right to Work Verification Wireframes (SCR-CG-009)

**Document Purpose**: ASCII wireframes and complete element inventory for Caregiver Right to Work Verification (SCR-CG-009)

**Screen ID**: SCR-CG-009
**Screen Name**: Right to Work Verification
**User Role**: Caregiver (pending_verification)
**Route**: `/caregiver/verify/right-to-work`
**R0/R1**: R0 (Immigration Act compliance)
**Created**: 2026-02-11
**Status**: READY FOR FIGMA HANDOFF

> **Shared Layout Pattern**: This screen shares the "Verification Document Upload" layout with SCR-CG-008 (Identity) and SCR-CG-010 (DBS). All three use: minimal header, document type selector, file upload area, status display, and submit/back actions.

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

The Right to Work Verification screen enables caregivers to prove legal right to work in the UK (Immigration Act 2006 compliance). This is a mandatory safeguarding requirement — caregivers cannot be activated without verified right to work.

**Key Functions**:
- Select verification method: UK Passport OR UKVI Share Code
- Upload passport document OR enter share code
- View upload progress and verification status
- Resubmit if rejected with reason displayed

**CRITICAL**: Two distinct verification paths:
1. **UK Passport Holders**: Confirm UK passport + upload document (auto right to work)
2. **Non-UK Nationals**: Enter UKVI Share Code + date of birth for online verification

### 1.2 Entry Points

- SCR-CG-002 (Caregiver Onboarding) → Step 5, "Verify Right to Work" button

### 1.3 Exit Points

- "Back to Onboarding" → SCR-CG-002
- Admin reviews via SCR-ADM-007 (Verification Review)

---

## 2. Element Inventory

### 2.1 Content Blocks

#### Block 1: Minimal Header
- Platform logo → Dashboard
- "Back to Onboarding" link

#### Block 2: Page Header
- H1: "Right to Work Verification"
- Subtitle: "Confirm you have legal right to work in the UK"
- Status badge: Not Submitted / Pending Review / Verified / Rejected

#### Block 3: Instructions
- Info box:
  - "All caregivers must prove they can legally work in the UK (Immigration Act 2006)."
  - "UK passport holders: Confirm you have a UK passport."
  - "Non-UK nationals: Enter your UKVI share code (generate at gov.uk/prove-right-to-work)."

#### Block 4: Verification Method Selection
- Radio buttons:
  - ( ) I am a UK passport holder
  - ( ) I have a UKVI share code (visa/settled status)

#### Block 5A: UK Passport Path (if selected)
- **Fields**:
  - Checkbox: "I confirm I am a UK passport holder"
  - File upload area (passport photo page)
    - Drag-and-drop zone with dashed border
    - "Drag and drop your passport photo page, or click to browse"
    - File icon
    - Upload progress bar (when uploading)
  - Uploaded file preview (thumbnail + filename + file size)
  - "Remove" link (to re-upload different file)

#### Block 5B: UKVI Share Code Path (if selected)
- **Fields**:
  - UKVI share code (text input, 9 characters, format: XXX-XXX-XXX)
  - Date of birth (date picker, required for UKVI verification)
  - Link: "Generate your share code at gov.uk/prove-right-to-work" (opens in new tab)
  - Help text: "Your share code is valid for 90 days. Enter your DOB as registered with UKVI."

#### Block 6: Submit Actions
- "Submit for Review" button (primary)
- "Back to Onboarding" link

#### Block 7: Status Display (after submission)
- **Pending**: "Your right to work has been submitted and is awaiting admin review. This typically takes 24-48 hours."
- **Approved**: Green badge "Right to Work Verified" with checkmark
- **Rejected**: Red badge "Rejected" with reason + "Resubmit" button
  - Common rejection reasons:
    - "Visa expired. Please renew and resubmit."
    - "Invalid share code. Please check code or upload passport."
    - "Share code expired (>90 days old). Generate new code."

#### Block 8: Footer
- Minimal footer

---

### 2.2 Validation Rules

| Field | Validation | Error Message |
|-------|-----------|---------------|
| Verification method | Required selection | "Please select your verification method" |
| UK passport checkbox | Required if UK path selected | "Please confirm you are a UK passport holder" |
| Passport upload | Required if UK path, max 5MB, JPG/PNG/PDF | "Please upload your passport photo page (JPG, PNG, or PDF, max 5MB)" |
| UKVI share code | Required if share code path, 9 chars, format XXX-XXX-XXX | "Invalid share code format (must be 9 characters: XXX-XXX-XXX)" |
| Date of birth | Required if share code path, past date | "Please enter your date of birth as registered with UKVI" |

---

## 3. ASCII Wireframes

### 3.1 Desktop — UK Passport Path

```
+------------------------------------------------------------------------------+
|  [LOGO]                                           ← Back to Onboarding      |
+------------------------------------------------------------------------------+
|                                                                              |
|                  H1: Right to Work Verification                              |
|         Confirm you have legal right to work in the UK                       |
|                                                                              |
|                    Status: ⚪ Not Submitted                                   |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  ℹ️  All caregivers must prove they can legally work in the UK         |  |
|  |     (Immigration Act 2006).                                            |  |
|  |     • UK passport holders: Confirm you have a UK passport.             |  |
|  |     • Non-UK nationals: Enter UKVI share code.                         |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |                                                                        |  |
|  |  Verification Method *                                                 |  |
|  |                                                                        |  |
|  |  (●) I am a UK passport holder                                         |  |
|  |  ( ) I have a UKVI share code (visa/settled status)                    |  |
|  |                                                                        |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  |  ☑ I confirm I am a UK passport holder                           |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  Upload Passport Photo Page *                                          |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  |                                                                  |  |  |
|  |  |            📄  Drag and drop your passport photo page            |  |  |
|  |  |                or click to browse                                |  |  |
|  |  |                                                                  |  |  |
|  |  |            JPG, PNG, or PDF — Max 5MB                            |  |  |
|  |  |                                                                  |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |                      [ SUBMIT FOR REVIEW ]                             |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|                        ← Back to Onboarding                                  |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 3.2 Desktop — UKVI Share Code Path

```
+------------------------------------------------------------------------------+
|  [LOGO]                                           ← Back to Onboarding      |
+------------------------------------------------------------------------------+
|                                                                              |
|                  H1: Right to Work Verification                              |
|         Confirm you have legal right to work in the UK                       |
|                                                                              |
|                    Status: ⚪ Not Submitted                                   |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  ℹ️  All caregivers must prove they can legally work in the UK         |  |
|  |     (Immigration Act 2006).                                            |  |
|  |     • UK passport holders: Confirm you have a UK passport.             |  |
|  |     • Non-UK nationals: Enter UKVI share code.                         |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |                                                                        |  |
|  |  Verification Method *                                                 |  |
|  |                                                                        |  |
|  |  ( ) I am a UK passport holder                                         |  |
|  |  (●) I have a UKVI share code (visa/settled status)                    |  |
|  |                                                                        |  |
|  |  UKVI Share Code *                                                     |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | XXX-XXX-XXX                                                      |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  Generate your share code at: gov.uk/prove-right-to-work →            |  |
|  |                                                                        |  |
|  |  Date of Birth *                                                       |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | DD / MM / YYYY                                              📅   |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  Enter your DOB as registered with UKVI                               |  |
|  |                                                                        |  |
|  |                      [ SUBMIT FOR REVIEW ]                             |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|                        ← Back to Onboarding                                  |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 3.3 Desktop — Approved State

```
+------------------------------------------------------------------------------+
|  [LOGO]                                           ← Back to Onboarding      |
+------------------------------------------------------------------------------+
|                                                                              |
|                  H1: Right to Work Verification                              |
|                                                                              |
|                Status: ✅ Right to Work Verified                             |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  ✅  Your right to work has been verified.                              |  |
|  |     Method: UK Passport                                                |  |
|  |     Verified on: 12 Feb 2026                                           |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|                        ← Back to Onboarding                                  |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 3.4 Desktop — Rejected State (Share Code Expired)

```
+------------------------------------------------------------------------------+
|  [LOGO]                                           ← Back to Onboarding      |
+------------------------------------------------------------------------------+
|                                                                              |
|                  H1: Right to Work Verification                              |
|                                                                              |
|                    Status: ❌ Rejected                                        |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  ❌  Your right to work verification was rejected.                      |  |
|  |                                                                        |  |
|  |  Reason: "Share code expired (issued >90 days ago). Generate a new     |  |
|  |           share code and resubmit."                                    |  |
|  |                                                                        |  |
|  |                       [ RESUBMIT ]                                     |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 3.5 Mobile — UK Passport Path

```
+--------------------------------------+
|  [LOGO]         ← Back               |
+--------------------------------------+
|                                      |
|  H1: Right to Work                   |
|      Verification                    |
|  Status: ⚪ Not Submitted             |
|                                      |
|  +--------------------------------+  |
|  |  ℹ️  Prove legal right to      |  |
|  |     work in UK.                |  |
|  |     • UK passport: Upload      |  |
|  |     • Non-UK: UKVI code        |  |
|  +--------------------------------+  |
|                                      |
|  Verification Method *               |
|  (●) UK passport holder              |
|  ( ) UKVI share code                 |
|                                      |
|  ☑ I confirm I am a UK               |
|    passport holder                   |
|                                      |
|  Upload Passport Photo Page *        |
|  +--------------------------------+  |
|  |   📄 Tap to upload file        |  |
|  |   JPG, PNG, PDF — Max 5MB      |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |     SUBMIT FOR REVIEW          |  |
|  +--------------------------------+  |
|                                      |
|       ← Back to Onboarding          |
|                                      |
+--------------------------------------+
```

### 3.6 Mobile — UKVI Share Code Path

```
+--------------------------------------+
|  [LOGO]         ← Back               |
+--------------------------------------+
|                                      |
|  H1: Right to Work                   |
|      Verification                    |
|  Status: ⚪ Not Submitted             |
|                                      |
|  +--------------------------------+  |
|  |  ℹ️  Prove legal right to      |  |
|  |     work in UK.                |  |
|  |     • UK passport: Upload      |  |
|  |     • Non-UK: UKVI code        |  |
|  +--------------------------------+  |
|                                      |
|  Verification Method *               |
|  ( ) UK passport holder              |
|  (●) UKVI share code                 |
|                                      |
|  UKVI Share Code *                   |
|  +--------------------------------+  |
|  | XXX-XXX-XXX                    |  |
|  +--------------------------------+  |
|  Generate code: gov.uk →             |
|                                      |
|  Date of Birth *                     |
|  +--------------------------------+  |
|  | DD / MM / YYYY            📅   |  |
|  +--------------------------------+  |
|  Enter DOB as registered             |
|  with UKVI                           |
|                                      |
|  +--------------------------------+  |
|  |     SUBMIT FOR REVIEW          |  |
|  +--------------------------------+  |
|                                      |
|       ← Back to Onboarding          |
|                                      |
+--------------------------------------+
```

---

## 4. Responsive Behavior

| Viewport | Layout Changes |
|----------|----------------|
| **Mobile** (320px-767px) | Full-width, radio buttons stacked, upload area shows "Tap to upload" (no drag-drop), help links abbreviated |
| **Tablet** (768px-1439px) | Centered form max-width 600px |
| **Desktop** (1440px+) | Centered form max-width 600px, drag-and-drop supported |

---

## 5. UI States

### 5.1 Uploading (Passport Path)

```
  +------------------------------------------------------------------+
  |  passport-photo.jpg                          ████████░░  80%      |
  |  2.3 MB                                     Uploading...          |
  +------------------------------------------------------------------+
```

### 5.2 Upload Error

```
  +------------------------------------------------------------------+
  |  ❌  File too large. Maximum size is 5MB.                         |
  |      Please choose a smaller file.                    [ RETRY ]   |
  +------------------------------------------------------------------+
```

### 5.3 Invalid Share Code Format

```
  +------------------------------------------------------------------+
  |  ❌  Invalid share code format.                                   |
  |      Share codes are 9 characters: XXX-XXX-XXX                    |
  +------------------------------------------------------------------+
```

### 5.4 Share Code Verification Loading (Admin Side)

```
  +------------------------------------------------------------------+
  |  🔄  Verifying share code with UKVI...                            |
  |      This may take up to 48 hours.                                |
  +------------------------------------------------------------------+
```

---

## 6. Accessibility Requirements

### 6.1 Focus Order

1. Skip to main content → Logo → Back to Onboarding
2. Status badge (informational)
3. Verification method radio group (UK passport / Share code)
4. If UK passport selected:
   - Confirmation checkbox
   - File upload area (button role)
5. If share code selected:
   - UKVI share code input
   - Date of birth picker
   - "Generate share code" link
6. Submit for Review / Resubmit button
7. Back to Onboarding link

### 6.2 Screen Reader Announcements

- **Page Load**: "Right to Work Verification page. Status: Not Submitted. Confirm legal right to work in the UK."
- **UK Passport Selected**: "UK passport verification method selected. Upload passport photo page."
- **Share Code Selected**: "UKVI share code verification method selected. Enter 9-character share code and date of birth."
- **File Selected**: "File selected: passport-photo.jpg, 2.3 megabytes."
- **Upload Complete**: "File uploaded successfully."
- **Submitted**: "Right to work submitted for review. Admin review takes 24-48 hours."
- **Approved**: "Right to work verified successfully."
- **Rejected**: "Right to work verification rejected. Reason: [rejection reason]."

### 6.3 ARIA Labels

- Radio group: `role="radiogroup" aria-labelledby="verification-method-label"`
- UK passport checkbox: `aria-describedby="uk-passport-help"`
- UKVI share code input: `aria-describedby="share-code-help"`
- Date of birth picker: `aria-describedby="dob-help"`

---

## 7. Navigation & Interactions

### 7.1 Primary Flow — UK Passport

1. Caregiver arrives from Onboarding Step 5
2. Selects "I am a UK passport holder" radio button
3. Checks confirmation checkbox "I confirm I am a UK passport holder"
4. Uploads passport photo page (drag-drop or click-browse)
5. Clicks "Submit for Review"
6. Sees "Pending Review" status
7. Returns to Onboarding

### 7.2 Primary Flow — UKVI Share Code

1. Caregiver arrives from Onboarding Step 5
2. Selects "I have a UKVI share code" radio button
3. Clicks "Generate your share code at gov.uk/prove-right-to-work" link (opens in new tab)
4. Generates share code on gov.uk (external flow)
5. Returns to platform, enters 9-character share code (format: XXX-XXX-XXX)
6. Enters date of birth (as registered with UKVI)
7. Clicks "Submit for Review"
8. Sees "Pending Review" status
9. Returns to Onboarding

### 7.3 Admin Verification Flow (UKVI Share Code)

1. Admin navigates to gov.uk/view-right-to-work
2. Enters caregiver's share code + DOB
3. UKVI service displays visa status:
   - Visa type (Skilled Worker, Spouse, Graduate, etc.)
   - Work restrictions (full-time, part-time, hours limited)
   - Visa expiry date
4. Admin records result in platform
5. If valid: Approve right to work
6. If expired or no work permission: Reject with reason

---

## 8. Compliance & GDPR

### 8.1 Immigration Act 2006 Compliance

- **Lawful basis**: Legal obligation (Immigration, Asylum and Nationality Act 2006, Section 15)
- **Platform duty**: Introduction Agency must prevent illegal working (civil penalty up to £20,000 per illegal worker)
- **Verification methods**:
  1. UK passport = automatic right to work (no UKVI check needed)
  2. UKVI share code = online verification via gov.uk/view-right-to-work
- **Data captured**:
  - Verification method (UK passport / share code)
  - Share code (if applicable, deleted after verification)
  - Visa type (if applicable)
  - Visa expiry date (if applicable)
  - Work restrictions (if applicable)

### 8.2 GDPR Compliance

- **Data sensitivity**: HIGH — visa status, immigration data
- **Storage**: Share code deleted after verification (not needed long-term), visa expiry date retained for renewal reminders
- **Retention**: Verification status retained indefinitely, verification date retained (audit trail)
- **Right to erasure**: Can request deletion but subject to Immigration Act retention requirements (7 years)
- **Audit trail**: Timestamp of submission, admin review decision, and admin ID recorded

### 8.3 Visa Expiry Tracking

- Visa expiry date stored in caregiver profile
- Automated email reminders sent: 60 days, 30 days, 7 days before expiry
- Email content: "Your visa expires soon. Please renew and update your share code to keep your profile active."
- If visa expires without renewal: Profile auto-deactivated, bookings cancelled, caregiver notified

---

## 9. Design Notes

### 9.1 Component Reuse

- Shared "Verification Document Upload" layout (used by CG-008, CG-009, CG-010)
- Radio button group (verification method selection)
- File upload component (drag-drop + click-browse) — UK passport path
- Text input (UKVI share code)
- Date picker (date of birth)
- Status badge (Not Submitted / Pending / Verified / Rejected)
- Alert banner (info, success, error)
- Button (primary)

### 9.2 Two-Path Design Pattern

**CRITICAL**: This screen has TWO mutually exclusive verification paths. Design must clearly indicate which path is active:
- Radio buttons for path selection (clear visual hierarchy)
- Conditional rendering: Only show UK passport fields OR share code fields (not both simultaneously)
- Help text contextual to selected path
- Validation specific to selected path

### 9.3 UKVI Share Code Format

- Format: 9 characters, 3 groups of 3 separated by hyphens (XXX-XXX-XXX)
- Example: `ABC-123-XYZ`
- Generated at: gov.uk/prove-right-to-work
- Valid for: 90 days
- Admin checks at: gov.uk/view-right-to-work

---

## 10. Cross-References

- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` — SCR-CG-009 (lines 1125-1170)
- `/docs/product/features/tier1-verification-specification.md` — Section 5.1-5.5 (Right to Work)
- SCR-CG-002: Caregiver Onboarding (parent screen)
- SCR-CG-008: Identity Verification (sister verification screen)
- SCR-CG-010: DBS Submission (sister verification screen)
- SCR-ADM-007: Admin Verification Review

---

## 11. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-11 | UX Designer | Initial wireframes and element inventory |

---

**END OF DOCUMENT**

**Status**: READY FOR FIGMA HANDOFF
