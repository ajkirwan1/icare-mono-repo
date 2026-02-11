# Identity Verification Wireframes (SCR-CG-008)

**Document Purpose**: ASCII wireframes and complete element inventory for Caregiver Identity Verification (SCR-CG-008)

**Screen ID**: SCR-CG-008
**Screen Name**: Identity Verification
**User Role**: Caregiver (pending_verification)
**Route**: `/caregiver/verify/identity`
**R0/R1**: R0 (Safeguarding requirement)
**Created**: 2026-02-11
**Status**: READY FOR FIGMA HANDOFF

> **Shared Layout Pattern**: This screen shares the "Verification Document Upload" layout with SCR-CG-009 (Right to Work) and SCR-CG-010 (DBS). All three use: minimal header, document type selector, file upload area, status display, and submit/back actions.

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

The Identity Verification screen enables caregivers to upload a government-issued ID document for admin verification. This is a safeguarding requirement — caregivers cannot be activated without verified identity.

**Key Functions**:
- Select ID document type (Passport or Driving Licence)
- Upload clear photo of ID document
- View upload progress and verification status
- Resubmit if rejected with reason displayed

### 1.2 Entry Points

- SCR-CG-002 (Caregiver Onboarding) → Step 5, "Verify Identity" button

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
- H1: "Identity Verification"
- Subtitle: "Upload a government-issued ID to verify your identity"
- Status badge: Not Submitted / Pending Review / Verified / Rejected

#### Block 3: Instructions
- Info box:
  - "Upload a clear photo of your passport photo page or driving licence (front)."
  - "Ensure all text is readable and the photo is not blurry."
  - Accepted formats: JPG, PNG, PDF
  - Maximum file size: 5MB

#### Block 4: Document Upload Form
- **Fields**:
  - ID document type (dropdown, required)
    - Options: "UK Passport", "Driving Licence"
  - File upload area
    - Drag-and-drop zone with dashed border
    - "Drag and drop your file here, or click to browse"
    - File icon
    - Upload progress bar (when uploading)
  - Uploaded file preview (thumbnail + filename + file size)
  - "Remove" link (to re-upload different file)

#### Block 5: Submit Actions
- "Submit for Review" button (primary)
- "Back to Onboarding" link

#### Block 6: Status Display (after submission)
- **Pending**: "Your ID has been submitted and is awaiting admin review. This typically takes 24-48 hours."
- **Approved**: Green badge "Identity Verified" with checkmark
- **Rejected**: Red badge "Rejected" with reason + "Resubmit" button

#### Block 7: Footer
- Minimal footer

---

### 2.2 Validation Rules

| Field | Validation | Error Message |
|-------|-----------|---------------|
| Document type | Required | "Please select your document type" |
| File upload | Required, max 5MB, JPG/PNG/PDF | "Please upload a valid document (JPG, PNG, or PDF, max 5MB)" |

---

## 3. ASCII Wireframes

### 3.1 Desktop — Upload State

```
+------------------------------------------------------------------------------+
|  [LOGO]                                           ← Back to Onboarding      |
+------------------------------------------------------------------------------+
|                                                                              |
|                    H1: Identity Verification                                 |
|          Upload a government-issued ID to verify your identity               |
|                                                                              |
|                    Status: ⚪ Not Submitted                                   |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  ℹ️  Upload a clear photo of your passport photo page or driving       |  |
|  |     licence (front). Ensure all text is readable.                      |  |
|  |     Accepted: JPG, PNG, PDF — Max 5MB                                 |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |                                                                        |  |
|  |  Document type *                                                       |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | Select document type                                        ▼   |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  |                                                                  |  |  |
|  |  |            📄  Drag and drop your file here                      |  |  |
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

### 3.2 Desktop — Approved State

```
+------------------------------------------------------------------------------+
|  [LOGO]                                           ← Back to Onboarding      |
+------------------------------------------------------------------------------+
|                                                                              |
|                    H1: Identity Verification                                 |
|                                                                              |
|                    Status: ✅ Identity Verified                               |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  ✅  Your identity has been verified.                                   |  |
|  |     Document: UK Passport                                              |  |
|  |     Verified on: 12 Feb 2026                                           |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|                        ← Back to Onboarding                                  |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 3.3 Desktop — Rejected State

```
+------------------------------------------------------------------------------+
|  [LOGO]                                           ← Back to Onboarding      |
+------------------------------------------------------------------------------+
|                                                                              |
|                    H1: Identity Verification                                 |
|                                                                              |
|                    Status: ❌ Rejected                                        |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  ❌  Your ID verification was rejected.                                 |  |
|  |                                                                        |  |
|  |  Reason: "Photo is blurry. Please upload a clearer image."             |  |
|  |                                                                        |  |
|  |                       [ RESUBMIT ]                                     |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 3.4 Mobile

```
+--------------------------------------+
|  [LOGO]         ← Back               |
+--------------------------------------+
|                                      |
|  H1: Identity Verification           |
|  Status: ⚪ Not Submitted             |
|                                      |
|  +--------------------------------+  |
|  |  ℹ️  Upload passport or        |  |
|  |     driving licence photo.     |  |
|  |     JPG/PNG/PDF, max 5MB       |  |
|  +--------------------------------+  |
|                                      |
|  Document type *                     |
|  +--------------------------------+  |
|  | Select type                 ▼  |  |
|  +--------------------------------+  |
|                                      |
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

---

## 4. Responsive Behavior

| Viewport | Layout Changes |
|----------|----------------|
| **Mobile** (320px-767px) | Full-width, upload area shows "Tap to upload" (no drag-drop) |
| **Tablet** (768px-1439px) | Centered form max-width 600px |
| **Desktop** (1440px+) | Centered form max-width 600px, drag-and-drop supported |

---

## 5. UI States

### 5.1 Uploading

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

---

## 6. Accessibility Requirements

### 6.1 Focus Order

1. Skip to main content → Logo → Back to Onboarding
2. Status badge (informational)
3. Document type dropdown
4. File upload area (button role)
5. Submit for Review / Resubmit button
6. Back to Onboarding link

### 6.2 Screen Reader Announcements

- **Page Load**: "Identity Verification page. Status: Not Submitted. Upload government-issued ID."
- **File Selected**: "File selected: passport-photo.jpg, 2.3 megabytes."
- **Upload Complete**: "File uploaded successfully."
- **Submitted**: "ID submitted for review. Admin review takes 24-48 hours."
- **Approved**: "Identity verified successfully."
- **Rejected**: "Identity verification rejected. Reason: Photo is blurry."

---

## 7. Navigation & Interactions

### 7.1 Primary Flow

1. Caregiver arrives from Onboarding Step 5
2. Selects document type
3. Uploads file (drag-drop or click-browse)
4. Clicks "Submit for Review"
5. Sees "Pending Review" status
6. Returns to Onboarding

---

## 8. Compliance & GDPR

- **Lawful basis**: Legal obligation (safeguarding — identity verification)
- **Data sensitivity**: HIGH — government-issued ID contains name, DOB, photo, document number
- **Storage**: Encrypted at rest, access restricted to admin verification team
- **Retention**: Retained for duration of caregiver account + 6 years (regulatory requirement)
- **Right to erasure**: Can request deletion but subject to safeguarding retention requirements
- **Audit trail**: Timestamp of upload, admin review decision, and admin ID recorded

---

## 9. Design Notes

### 9.1 Component Reuse

- Shared "Verification Document Upload" layout (used by CG-008, CG-009, CG-010)
- File upload component (drag-drop + click-browse)
- Status badge (Not Submitted / Pending / Verified / Rejected)
- Alert banner (info, success, error)
- Button (primary)

---

## 10. Cross-References

- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` — SCR-CG-008
- `/docs/product/features/tier1-verification-specification.md` — Section 4.1-4.2
- SCR-CG-002: Caregiver Onboarding (parent screen)
- SCR-CG-009: Right to Work (sister verification screen)
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
