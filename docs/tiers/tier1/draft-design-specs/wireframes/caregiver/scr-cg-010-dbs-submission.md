# DBS Check Submission Wireframes (SCR-CG-010)

**Document Purpose**: ASCII wireframes and complete element inventory for Caregiver DBS Check Submission (SCR-CG-010)

**Screen ID**: SCR-CG-010
**Screen Name**: DBS Check Submission (Voluntary)
**User Role**: Caregiver (pending_verification)
**Route**: `/caregiver/verify/dbs`
**R0/R1**: R0 (Voluntary trust badge — NOT mandatory at Tier 1)
**Created**: 2026-02-11
**Status**: READY FOR FIGMA HANDOFF

> **Shared Layout Pattern**: This screen shares the "Verification Document Upload" layout with SCR-CG-008 (Identity) and SCR-CG-009 (Right to Work). All three use: minimal header, document type selector, file upload area, status display, and submit/back actions.

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

The DBS Check Submission screen enables caregivers to voluntarily upload an existing DBS certificate to earn the "DBS Verified" badge. This is a TRUST SIGNAL, NOT a mandatory requirement at Tier 1 (companionship services do not constitute "regulated activity" under the Safeguarding Vulnerable Groups Act 2006).

**Key Functions**:
- Explain why DBS is optional at Tier 1 but valuable (trust badge, prepares for Tier 2)
- Upload existing DBS certificate (Enhanced level preferred)
- Enter certificate details (number, issue date)
- SKIP option clearly available (no pressure to submit)
- View upload progress and verification status
- Resubmit if rejected with reason displayed

**CRITICAL**: This screen must NOT feel mandatory. Design must emphasize "OPTIONAL" and provide clear "Skip for Now" option.

### 1.2 Entry Points

- SCR-CG-002 (Caregiver Onboarding) → Step 5, "Upload DBS Certificate (Optional)" button

### 1.3 Exit Points

- "Skip for Now" → SCR-CG-002 (return to onboarding without DBS submission)
- "Back to Onboarding" → SCR-CG-002
- Admin reviews via SCR-ADM-008 (DBS Verification Review)

---

## 2. Element Inventory

### 2.1 Content Blocks

#### Block 1: Minimal Header
- Platform logo → Dashboard
- "Back to Onboarding" link

#### Block 2: Page Header
- H1: "DBS Check Submission"
- Badge: "OPTIONAL" (blue, prominent)
- Subtitle: "Upload your DBS certificate to earn the 'DBS Verified' badge"
- Status badge: Not Submitted / Pending Review / Verified / Rejected / Skipped

#### Block 3: Why Upload DBS? (Informational Box)
- Info box (blue background, friendly tone):
  - **Heading**: "Why submit a DBS certificate?"
  - **Benefit 1**: "🔒 Stand out to families — caregivers with 'DBS Verified' badge receive more bookings"
  - **Benefit 2**: "✅ Prepare for Tier 2 — personal care services require mandatory DBS"
  - **Benefit 3**: "💼 Meet care sector standards — show your commitment to safety"
  - **Note**: "DBS checks are VOLUNTARY for companionship services (Tier 1). You can activate your profile without submitting."

#### Block 4: Document Upload Form
- **Fields**:
  - DBS certificate upload (file input)
    - Drag-and-drop zone with dashed border
    - "Drag and drop your DBS certificate here, or click to browse"
    - File icon
    - Upload progress bar (when uploading)
    - Accepted formats: JPG, PNG, PDF
    - Maximum file size: 5MB
  - Uploaded file preview (thumbnail + filename + file size)
  - "Remove" link (to re-upload different file)
  - DBS certificate number (text input, optional)
    - Help text: "Certificate number helps admin verify authenticity (optional)"
  - Issue date (date picker, required)
    - Help text: "Certificate issue date (recommended: within 3 years)"

#### Block 5: Submit Actions
- "Submit for Review" button (primary)
- "Skip for Now" button (secondary, equally prominent)
- "Back to Onboarding" link

#### Block 6: Status Display (after submission)
- **Pending**: "Your DBS certificate has been submitted and is awaiting admin review. This typically takes 48 hours."
- **Approved**: Green badge "DBS Verified" with checkmark + certificate level (Basic/Standard/Enhanced) + issue date
- **Rejected**: Red badge "Rejected" with reason + "Resubmit" button
  - Common rejection reasons:
    - "Certificate expired (issued >3 years ago). Please obtain a new DBS."
    - "Certificate not Enhanced level. Enhanced DBS required for badge."
    - "Name on certificate does not match profile. Please verify correct certificate."
    - "Certificate image unclear. Please upload clearer scan/photo."
- **Skipped**: Grey badge "DBS Not Submitted" with note: "You can add DBS certificate later from Settings > Verification"

#### Block 7: Footer
- Minimal footer

---

### 2.2 Validation Rules

| Field | Validation | Error Message |
|-------|-----------|---------------|
| DBS certificate upload | Optional (can skip), max 5MB, JPG/PNG/PDF | "File too large (max 5MB)" OR "Invalid format (JPG, PNG, or PDF only)" |
| Certificate number | Optional, alphanumeric | "Invalid certificate number (alphanumeric only)" |
| Issue date | Required if uploading, past date, recommended within 3 years | "Please enter certificate issue date" OR "Certificate >3 years old (best practice: renew)" |

---

## 3. ASCII Wireframes

### 3.1 Desktop — Upload State (Default)

```
+------------------------------------------------------------------------------+
|  [LOGO]                                           ← Back to Onboarding      |
+------------------------------------------------------------------------------+
|                                                                              |
|            H1: DBS Check Submission          [OPTIONAL BADGE]                |
|        Upload your DBS certificate to earn the 'DBS Verified' badge          |
|                                                                              |
|                    Status: ⚪ Not Submitted                                   |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  ℹ️  Why submit a DBS certificate?                                      |  |
|  |                                                                        |  |
|  |  🔒 Stand out to families — caregivers with 'DBS Verified' badge       |  |
|  |     receive more bookings                                              |  |
|  |  ✅ Prepare for Tier 2 — personal care services require mandatory DBS  |  |
|  |  💼 Meet care sector standards — show your commitment to safety        |  |
|  |                                                                        |  |
|  |  Note: DBS checks are VOLUNTARY for companionship services (Tier 1).  |  |
|  |        You can activate your profile without submitting.               |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |                                                                        |  |
|  |  Upload DBS Certificate                                                |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  |                                                                  |  |  |
|  |  |            📄  Drag and drop your DBS certificate here           |  |  |
|  |  |                or click to browse                                |  |  |
|  |  |                                                                  |  |  |
|  |  |            JPG, PNG, or PDF — Max 5MB                            |  |  |
|  |  |                                                                  |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  DBS Certificate Number (optional)                                     |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  |                                                                  |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  Helps admin verify authenticity                                       |  |
|  |                                                                        |  |
|  |  Issue Date *                                                          |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | DD / MM / YYYY                                              📅   |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  Recommended: Certificate issued within 3 years                        |  |
|  |                                                                        |  |
|  |            [ SUBMIT FOR REVIEW ]     [ SKIP FOR NOW ]                  |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|                        ← Back to Onboarding                                  |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 3.2 Desktop — Approved State (Enhanced DBS)

```
+------------------------------------------------------------------------------+
|  [LOGO]                                           ← Back to Onboarding      |
+------------------------------------------------------------------------------+
|                                                                              |
|            H1: DBS Check Submission          [OPTIONAL BADGE]                |
|                                                                              |
|                    Status: ✅ DBS Verified                                   |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  ✅  Your DBS certificate has been verified.                            |  |
|  |                                                                        |  |
|  |     Certificate Level: Enhanced                                        |  |
|  |     Issue Date: 15 Jan 2023                                            |  |
|  |     Verified on: 12 Feb 2026                                           |  |
|  |                                                                        |  |
|  |     You now have the 'DBS Verified' badge on your profile!             |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|                        ← Back to Onboarding                                  |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 3.3 Desktop — Rejected State (Expired Certificate)

```
+------------------------------------------------------------------------------+
|  [LOGO]                                           ← Back to Onboarding      |
+------------------------------------------------------------------------------+
|                                                                              |
|            H1: DBS Check Submission          [OPTIONAL BADGE]                |
|                                                                              |
|                    Status: ❌ Rejected                                        |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  ❌  Your DBS certificate was rejected.                                 |  |
|  |                                                                        |  |
|  |  Reason: "Certificate expired (issued 4 years ago, >3 year best        |  |
|  |           practice). Please obtain a new DBS certificate."             |  |
|  |                                                                        |  |
|  |  How to obtain a new DBS:                                              |  |
|  |  • Via umbrella body: Trustid, UKCBC, Disclosure Scotland              |  |
|  |  • Cost: £40-60 (self-funded at Tier 1)                                |  |
|  |  • Processing time: 4-8 weeks (Enhanced level)                         |  |
|  |                                                                        |  |
|  |                [ RESUBMIT ]       [ SKIP FOR NOW ]                     |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 3.4 Desktop — Skipped State

```
+------------------------------------------------------------------------------+
|  [LOGO]                                           ← Back to Onboarding      |
+------------------------------------------------------------------------------+
|                                                                              |
|            H1: DBS Check Submission          [OPTIONAL BADGE]                |
|                                                                              |
|                Status: ⚪ DBS Not Submitted (Skipped)                        |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  ℹ️  You skipped DBS certificate submission.                            |  |
|  |                                                                        |  |
|  |     Your profile can still be activated without DBS. You can add DBS   |  |
|  |     certificate later from Settings > Verification.                    |  |
|  |                                                                        |  |
|  |     Remember: Caregivers with 'DBS Verified' badge receive more        |  |
|  |     booking requests from families.                                    |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|                        ← Back to Onboarding                                  |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 3.5 Mobile — Upload State

```
+--------------------------------------+
|  [LOGO]         ← Back               |
+--------------------------------------+
|                                      |
|  H1: DBS Check                       |
|      Submission                      |
|  [OPTIONAL]                          |
|  Status: ⚪ Not Submitted             |
|                                      |
|  +--------------------------------+  |
|  |  ℹ️  Why submit DBS?           |  |
|  |  • Stand out to families       |  |
|  |  • Prepare for Tier 2          |  |
|  |  • Meet care standards         |  |
|  |                                |  |
|  |  DBS is VOLUNTARY at Tier 1.   |  |
|  |  You can skip and activate.    |  |
|  +--------------------------------+  |
|                                      |
|  Upload DBS Certificate              |
|  +--------------------------------+  |
|  |   📄 Tap to upload file        |  |
|  |   JPG, PNG, PDF — Max 5MB      |  |
|  +--------------------------------+  |
|                                      |
|  Certificate Number (optional)       |
|  +--------------------------------+  |
|  |                                |  |
|  +--------------------------------+  |
|                                      |
|  Issue Date *                        |
|  +--------------------------------+  |
|  | DD / MM / YYYY            📅   |  |
|  +--------------------------------+  |
|  Recommended: <3 years old           |
|                                      |
|  +--------------------------------+  |
|  |     SUBMIT FOR REVIEW          |  |
|  +--------------------------------+  |
|  +--------------------------------+  |
|  |     SKIP FOR NOW               |  |
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
| **Mobile** (320px-767px) | Full-width, upload area shows "Tap to upload" (no drag-drop), "Skip for Now" button stacked below "Submit" |
| **Tablet** (768px-1439px) | Centered form max-width 600px, buttons side-by-side |
| **Desktop** (1440px+) | Centered form max-width 600px, drag-and-drop supported, buttons side-by-side |

---

## 5. UI States

### 5.1 Uploading

```
  +------------------------------------------------------------------+
  |  dbs-certificate.pdf                         ████████░░  80%      |
  |  3.1 MB                                     Uploading...          |
  +------------------------------------------------------------------+
```

### 5.2 Upload Error

```
  +------------------------------------------------------------------+
  |  ❌  File too large. Maximum size is 5MB.                         |
  |      Please compress or upload smaller file.      [ RETRY ]      |
  +------------------------------------------------------------------+
```

### 5.3 Certificate Too Old Warning (Non-Blocking)

```
  +------------------------------------------------------------------+
  |  ⚠️  Warning: Certificate issued 4 years ago.                    |
  |      DBS best practice recommends renewal every 3 years.          |
  |      You can still submit, but admin may request newer DBS.       |
  +------------------------------------------------------------------+
```

---

## 6. Accessibility Requirements

### 6.1 Focus Order

1. Skip to main content → Logo → Back to Onboarding
2. Status badge (informational)
3. "Why submit DBS?" info box (informational, not focusable)
4. File upload area (button role)
5. DBS certificate number input (optional)
6. Issue date picker
7. Submit for Review button
8. Skip for Now button (secondary)
9. Back to Onboarding link

### 6.2 Screen Reader Announcements

- **Page Load**: "DBS Check Submission page. Optional. Status: Not Submitted. Upload DBS certificate to earn 'DBS Verified' badge."
- **Optional Badge**: "DBS verification is optional for companionship services."
- **File Selected**: "File selected: dbs-certificate.pdf, 3.1 megabytes."
- **Upload Complete**: "File uploaded successfully."
- **Submitted**: "DBS certificate submitted for review. Admin review takes 48 hours."
- **Approved**: "DBS certificate verified successfully. You now have the 'DBS Verified' badge."
- **Rejected**: "DBS certificate verification rejected. Reason: [rejection reason]."
- **Skipped**: "DBS certificate submission skipped. You can add DBS later from Settings."

### 6.3 ARIA Labels

- Upload area: `role="button" aria-label="Upload DBS certificate" aria-describedby="upload-help"`
- Certificate number: `aria-describedby="cert-number-help"`
- Issue date: `aria-describedby="issue-date-help"`
- Skip button: `aria-label="Skip DBS certificate submission (optional)"`

---

## 7. Navigation & Interactions

### 7.1 Primary Flow — Upload DBS

1. Caregiver arrives from Onboarding Step 5
2. Reads "Why submit DBS?" info box
3. Uploads DBS certificate file (drag-drop or click-browse)
4. Enters certificate number (optional)
5. Enters issue date
6. Clicks "Submit for Review"
7. Sees "Pending Review" status
8. Returns to Onboarding

### 7.2 Alternative Flow — Skip DBS

1. Caregiver arrives from Onboarding Step 5
2. Reads "Why submit DBS?" info box
3. Decides not to submit (no existing DBS, or prefers to skip)
4. Clicks "Skip for Now"
5. Sees "DBS Not Submitted (Skipped)" status
6. Returns to Onboarding
7. Profile can still be activated without DBS

### 7.3 Admin Verification Flow

1. Admin reviews uploaded DBS certificate image
2. Checks certificate authenticity:
   - Certificate number present
   - Name on certificate matches caregiver profile
   - Issue date within 3 years (recommended, not mandatory)
   - Certificate level (Basic/Standard/Enhanced)
3. If Enhanced DBS + valid: Approve → "DBS Verified" badge awarded
4. If Basic/Standard DBS: Reject with reason: "Enhanced DBS required for badge"
5. If expired (>3 years): Reject with reason: "Certificate >3 years old, please renew"
6. If name mismatch: Reject with reason: "Name does not match profile"

---

## 8. Compliance & GDPR

### 8.1 Safeguarding Vulnerable Groups Act 2006

- **Legal Status**: DBS checks are NOT mandatory for companionship services at Tier 1
- **Rationale**: Companionship does NOT constitute "regulated activity" (no personal care)
- **Voluntary Submission**: Caregiver explicitly consents to DBS verification (explicit consent = GDPR Article 9(2)(a))
- **Tier 2 Requirement**: DBS becomes mandatory for personal care services (Tier 2+)

### 8.2 GDPR Compliance

- **Lawful basis**: Explicit consent (Article 9(2)(a)) — caregiver voluntarily uploads for trust badge
- **Data sensitivity**: VERY HIGH — criminal record check data (Article 10)
- **Storage**: Certificate image encrypted at rest (AWS S3 with KMS), access restricted to admin verification team
- **Retention**: Certificate image deleted 7 days after verification, certificate number + issue date + level retained for badge display and renewal tracking
- **Right to erasure**: Can request deletion, but verification status (badge) may be retained for platform integrity
- **Audit trail**: Timestamp of upload, admin review decision, and admin ID recorded

### 8.3 DBS Certificate Levels

| Level | Coverage | Tier 1 Acceptance | Badge Awarded |
|-------|----------|-------------------|---------------|
| **Basic DBS** | Unspent convictions only | Accepted | NO (not sufficient for badge) |
| **Standard DBS** | Spent + unspent convictions | Accepted | NO (not sufficient for badge) |
| **Enhanced DBS** | Standard + local police records + barred list check | Accepted | YES (required for "DBS Verified" badge) |

### 8.4 DBS Expiry and Renewal

- DBS certificates do NOT have statutory expiry date
- Industry best practice: Re-check every 3 years
- Platform recommendation: 3-year cycle for DBS renewal
- If certificate >3 years old: Admin may reject OR accept with warning ("Last checked: [date]")
- DBS Update Service subscribers: Admin can check certificate validity online (no re-upload needed)

---

## 9. Design Notes

### 9.1 Component Reuse

- Shared "Verification Document Upload" layout (used by CG-008, CG-009, CG-010)
- File upload component (drag-drop + click-browse)
- Text input (certificate number)
- Date picker (issue date)
- Status badge (Not Submitted / Pending / Verified / Rejected / Skipped)
- Alert banner (info, success, error, warning)
- Button (primary, secondary)

### 9.2 Optional vs. Mandatory Design Pattern

**CRITICAL**: This screen must NOT feel mandatory. Design strategies:
1. **"OPTIONAL" badge** prominently displayed next to H1
2. **"Skip for Now" button** equally prominent as "Submit for Review" (same visual weight)
3. **Friendly tone** in "Why submit DBS?" box (benefits, not requirements)
4. **No validation errors** if user skips (no guilt-tripping)
5. **Positive framing** of skipped state: "You can add DBS later" (not "You haven't completed this")

### 9.3 Trust Badge Psychology

- Emphasize benefits of DBS badge (more bookings, trust signal) without pressure
- Show social proof: "Caregivers with 'DBS Verified' badge receive 2x more booking requests" (if metric available)
- Link to Tier 2 preparation: "Prepare for personal care services (Tier 2)" (future-proofing)

### 9.4 Admin Rejection Guidance

- Rejection reasons must be actionable and specific
- Provide guidance on obtaining new DBS: umbrella bodies (Trustid, UKCBC), cost (£40-60), processing time (4-8 weeks)
- Offer "Resubmit" OR "Skip for Now" options after rejection (no dead ends)

---

## 10. Cross-References

- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` — SCR-CG-010 (lines 1174-1220)
- `/docs/product/features/tier1-verification-specification.md` — Section 6.1-6.7 (DBS Voluntary)
- SCR-CG-002: Caregiver Onboarding (parent screen)
- SCR-CG-008: Identity Verification (sister verification screen)
- SCR-CG-009: Right to Work (sister verification screen)
- SCR-ADM-008: Admin DBS Verification Review

---

## 11. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-11 | UX Designer | Initial wireframes and element inventory |

---

**END OF DOCUMENT**

**Status**: READY FOR FIGMA HANDOFF
