# User Flow: Admin Verification Workflow

**Primary Actor**: Admin (platform operator with verification permissions)
**Goal**: Review and approve/reject caregiver applications to ensure platform safety and compliance
**Preconditions**:
- Admin has valid admin account with 2FA enabled
- Caregiver has submitted onboarding application (status: pending_verification)
- Verification documents uploaded (ID, Right to Work, optional DBS)

**Success Outcome**: Caregiver application reviewed, decision made (approve/reject/request clarification), caregiver notified, profile live (if approved)
**Estimated Duration**: 10-20 minutes per application (ID + Right to Work + optional DBS review)

---

## Flow Diagram (ASCII)

```
[START: Admin receives notification of new application]
    |
    v
+-------------------+
| Email/In-App      |
| Notification:     |
| "New caregiver    |
| application"      |
+-------------------+
    |
    | [Admin clicks notification link]
    v
+-------------------+
| SCR-AUTH-005      |
| Admin Login       |
+-------------------+
    |
    | [Admin enters email + password]
    v
    /\
   /  \
  / Credentials valid? \
  \      /
   \    /
    \  /
     \/
    / \
   /   \
  Yes   No
  |     |
  |     v
  |   [Error: "Invalid credentials"]
  |     |
  |     | [Admin retries OR resets password]
  |     +---------> [Back to login]
  |
  v
+-------------------+
| 2FA Verification  |
| (Admin mandatory) |
+-------------------+
    |
    | [Admin enters 2FA code (SMS or authenticator app)]
    v
    /\
   /  \
  / 2FA valid? \
  \      /
   \    /
    \  /
     \/
    / \
   /   \
  Yes   No
  |     |
  |     v
  |   [Error: "Invalid 2FA code"]
  |     |
  |     | [Admin retries]
  |     +---------> [Back to 2FA]
  |
  v
[Admin authenticated]
  |
  v
+-------------------+
| SCR-ADM-001       |
| Admin Dashboard   |
+-------------------+
    |
    | [Admin sees: "5 Pending Verifications" badge]
    | [Admin clicks "Caregiver Verifications" card]
    v
+-------------------+
| Verification Queue|
| (List view)       |
+-------------------+
    |
    | [Display list of pending applications:]
    | - Caregiver name
    | - Registration date (oldest first)
    | - SLA indicator: GREEN (< 24h), AMBER (24-48h), RED (> 48h)
    | - Verification types: ID, Right to Work, DBS (if submitted)
    |
    v
[Admin selects application from queue]
  |
  v
+-------------------+
| SCR-ADM-005       |
| Caregiver         |
| Application Review|
+-------------------+
    |
    | [Display caregiver profile summary:]
    | - Name, Email, Phone, Postcode
    | - Services offered (Tier 1: Companionship only)
    | - Hourly rate, Service radius, Availability
    | - Bio, Profile photo
    | - Registration timestamp
    |
    | [Display verification checklist:]
    | [ ] Identity Verification (REQUIRED)
    | [ ] Right to Work Verification (REQUIRED)
    | [ ] DBS Check (OPTIONAL)
    |
    v
[Admin clicks "Review ID"]
  |
  v
+-------------------+
| SCR-ADM-007       |
| ID Verification   |
| Review            |
+-------------------+
    |
    | [Display ID document image (zoomable)]
    | [Display caregiver profile photo (side-by-side for comparison)]
    | [Display ID details extracted (if OCR available):]
    | - Document type: Passport OR Driving License
    | - Name on document
    | - Date of birth
    | - Issue date, Expiry date (if applicable)
    | - Document number
    |
    v
[Admin checks:]
  |
  | [ ] Document is clear and readable
  | [ ] Document is not expired
  | [ ] Photo matches profile photo
  | [ ] Name matches registration name
  | [ ] Document appears authentic (no tampering)
  | [ ] Date of birth indicates age 18+
  |
  v
    /\
   /  \
  / All checks pass? \
  \      /
   \    /
    \  /
     \/
    / | \
   /  |  \
Pass  Fail  Unclear
  |    |    |
  |    |    v
  |    |  [Admin clicks "Request Clarification"]
  |    |  [Admin enters clarification request: "Photo unclear. Re-upload higher quality"]
  |    |  [Email caregiver: "Clarification needed: [X]"]
  |    |  [Application remains PENDING]
  |    |    |
  |    |    +---------> [Return to queue, wait for resubmission]
  |    |
  |    v
  |  [Admin clicks "Reject ID"]
  |  [Admin selects rejection reason:]
  |  - [ ] Document expired
  |  - [ ] Photo does not match
  |  - [ ] Document appears fake/tampered
  |  - [ ] Document not readable
  |  - [ ] Name does not match registration
  |  - [ ] Other (enter reason)
  |    |
  |    v
  |  [Rejection reason captured]
  |  [ID status: REJECTED]
  |    |
  |    +---------> [Continue to final decision at bottom]
  |
  v
[Admin clicks "Approve ID"]
[ID status: VERIFIED]
[Return to SCR-ADM-005]
  |
  v
[Admin clicks "Review Right to Work"]
  |
  v
+-------------------+
| SCR-ADM-007       |
| Right to Work     |
| Review            |
+-------------------+
    |
    | [IF UKVI Share Code submitted:]
    |   [Display: "Auto-verified via UKVI API"]
    |   [Display: Share code, verification date, expiry date]
    |   [Status: VERIFIED (auto)]
    |   [Admin reviews for accuracy]
    |   [Skip to Step: Admin approves Right to Work]
    |
    | [IF Document uploaded:]
    |   [Display document image (zoomable)]
    |   [Display document type: Passport, Visa, BRP card, Settlement letter]
    |   [Display expiry date (if applicable)]
    |
    v
[Admin checks:]
  |
  | [ ] Document is clear and readable
  | [ ] Document is not expired (or no expiry if British passport/indefinite leave)
  | [ ] Document grants right to work in UK (check visa type/conditions)
  | [ ] Document appears authentic (no tampering)
  | [ ] Name matches ID document
  |
  v
    /\
   /  \
  / All checks pass? \
  \      /
   \    /
    \  /
     \/
    / | \
   /  |  \
Pass  Fail  Unclear
  |    |    |
  |    |    v
  |    |  [Admin clicks "Request Clarification"]
  |    |  [Admin enters clarification request: "Visa expiry date not visible. Re-upload"]
  |    |  [Email caregiver]
  |    |  [Application remains PENDING]
  |    |    |
  |    |    +---------> [Return to queue]
  |    |
  |    v
  |  [Admin clicks "Reject Right to Work"]
  |  [Admin selects rejection reason:]
  |  - [ ] Document expired
  |  - [ ] Document does not grant right to work (tourist visa, student visa with restrictions)
  |  - [ ] Document appears fake
  |  - [ ] Document not readable
  |  - [ ] Other (enter reason)
  |    |
  |    v
  |  [Rejection reason captured]
  |  [Right to Work status: REJECTED]
  |    |
  |    +---------> [Continue to final decision]
  |
  v
[Admin clicks "Approve Right to Work"]
[Right to Work status: VERIFIED]
[Return to SCR-ADM-005]
  |
  v
    /\
   /  \
  / DBS submitted? \
  \      /
   \    /
    \  /
     \/
    / \
   /   \
  Yes   No
  |     |
  |     v
  |   [Skip DBS review]
  |   [DBS status: NOT SUBMITTED]
  |     |
  |     +---------> [Continue to final decision]
  |
  v
[Admin clicks "Review DBS"]
  |
  v
+-------------------+
| SCR-ADM-008       |
| DBS Review        |
+-------------------+
    |
    | [Display DBS certificate image (zoomable)]
    | [Display DBS details (if readable):]
    | - Certificate number
    | - Issue date
    | - DBS level: Basic, Standard, Enhanced
    | - Name on certificate
    | - Check type: Child, Adult, Both
    |
    v
[Admin checks:]
  |
  | [ ] Certificate is clear and readable
  | [ ] Certificate is Enhanced level (required for "DBS Verified" badge)
  | [ ] Certificate issued within 3 years (platform policy)
  | [ ] Name matches ID document
  | [ ] Certificate appears authentic (DBS watermark, correct format)
  | [ ] No concerning disclosures listed (if visible)
  |
  v
    /\
   /  \
  / All checks pass? \
  \      /
   \    /
    \  /
     \/
    / | \
   /  |  \
Pass  Fail  Unclear
  |    |    |
  |    |    v
  |    |  [Admin clicks "Request Clarification"]
  |    |  [Admin enters clarification request: "DBS certificate expired (> 3 years). Upload recent one"]
  |    |  [Email caregiver]
  |    |  [Application remains PENDING]
  |    |    |
  |    |    +---------> [Return to queue]
  |    |
  |    v
  |  [Admin clicks "Reject DBS"]
  |  [Admin selects rejection reason:]
  |  - [ ] Certificate expired (> 3 years)
  |  - [ ] Not Enhanced level (Basic or Standard)
  |  - [ ] Name does not match
  |  - [ ] Certificate appears fake
  |  - [ ] Concerning disclosures listed
  |  - [ ] Certificate not readable
  |  - [ ] Other (enter reason)
  |    |
  |    v
  |  [DBS status: REJECTED]
  |  [Caregiver will NOT receive "DBS Verified" badge]
  |  [Note: DBS rejection does NOT block profile approval at Tier 1 (voluntary)]
  |    |
  |    +---------> [Continue to final decision]
  |
  v
[Admin clicks "Approve DBS"]
[DBS status: VERIFIED]
[Caregiver will receive "DBS Verified" badge]
[Return to SCR-ADM-005]
  |
  v
+-------------------+
| SCR-ADM-005       |
| Final Decision    |
+-------------------+
    |
    | [Display verification summary:]
    | - ID: VERIFIED / REJECTED / PENDING
    | - Right to Work: VERIFIED / REJECTED / PENDING
    | - DBS: VERIFIED / REJECTED / NOT SUBMITTED
    |
    v
    /\
   /  \
  / All REQUIRED verifications approved? \
  \      /  (ID + Right to Work)
   \    /
    \  /
     \/
    / \
   /   \
  Yes   No
  |     |
  |     v
  |   [If any REQUIRED verification REJECTED:]
  |   [Admin cannot approve application]
  |   [Admin must reject application with reason]
  |     |
  |     v
  |   +-------------------+
  |   | Reject Application|
  |   +-------------------+
  |         |
  |         | [Admin clicks "Reject Application"]
  |         | [Admin enters rejection summary (optional additional notes)]
  |         | [System compiles rejection reasons from ID/Right to Work reviews]
  |         |
  |         v
  |   [Caregiver status: REJECTED]
  |   [Email caregiver: "Application rejected. Reasons: [X]. Resubmit corrected documents?"]
  |   [Admin action logged (audit trail)]
  |         |
  |         v
  |   [Return to verification queue]
  |         |
  |         +---------> [END or await resubmission]
  |
  v
[All REQUIRED verifications approved]
[Admin reviews full profile one more time]
[Admin checks for any red flags: suspicious activity, policy violations]
  |
  v
    /\
   /  \
  / Approve OR Flag for review? \
  \      /
   \    /
    \  /
     \/
    / \
   /   \
Approve  Flag
  |     |
  |     v
  |   [Admin clicks "Flag for Senior Review"]
  |   [Admin enters concern: e.g., "Profile bio contains concerning language"]
  |   [Application escalated to senior admin]
  |   [Status: PENDING_SENIOR_REVIEW]
  |     |
  |     v
  |   [Senior admin reviews, makes final decision]
  |     |
  |     +---------> [Return to approval/rejection decision]
  |
  v
+-------------------+
| Approve Application|
+-------------------+
    |
    | [Admin clicks "Approve Application"]
    | [Admin confirms approval]
    |
    v
[Caregiver status: ACTIVE]
[Profile made searchable by care receivers]
[If DBS verified: "DBS Verified" badge displayed on profile]
["Companionship Services Only" badge displayed (Tier 1)]
[Admin action logged (audit trail)]
  |
  v
[Email caregiver: "Congratulations! Your profile is approved and live."]
[SMS caregiver: "Profile approved! You can now receive bookings."]
  |
  v
+-------------------+
| Update Dashboard  |
+-------------------+
    |
    | [Remove application from verification queue]
    | [Update dashboard counter: "4 Pending Verifications" (was 5)]
    | [Log verification completion time for SLA tracking]
    |
    v
[Admin sees success confirmation: "Application approved. Caregiver profile is now live."]
  |
  v
    /\
   /  \
  / More applications in queue? \
  \      /
   \    /
    \  /
     \/
    / \
   /   \
  Yes   No
  |     |
  |     v
  |   [Admin clicks "Back to Queue"]
  |   [Display queue with remaining applications]
  |     |
  |     +---------> [END session OR continue to next application]
  |
  v
[Admin clicks "Review Next Application"]
[Return to SCR-ADM-005 with next application]
  |
  v
[Loop: Review next caregiver application]
  |
  +---------> [Back to SCR-ADM-005 for next application]

[END: Admin completes verification session]
```

---

## Step-by-Step Narrative

| Step | Screen | Admin Action | System Response | Success Path | Error Path |
|------|--------|--------------|-----------------|--------------|------------|
| 1 | Email/In-App | Admin receives notification: "New caregiver application from [Name]" | Display notification with link to application | Admin clicks link → Step 2 | N/A |
| 2 | SCR-AUTH-005 | Admin enters email + password | Validate credentials | If valid → Step 3 (2FA), If invalid → Show error | Show error: "Invalid credentials. Try again" |
| 3 | 2FA | Admin enters 2FA code (SMS or authenticator app) | Validate 2FA code | If valid → Step 4, If invalid → Show error | Show error: "Invalid 2FA code. X attempts remaining" |
| 4 | SCR-ADM-001 | Admin sees dashboard with "5 Pending Verifications" badge | Display admin dashboard overview | Admin clicks "Caregiver Verifications" → Step 5 | N/A |
| 5 | Verification Queue | Admin sees list of pending applications (oldest first, SLA indicators: green < 24h, amber 24-48h, red > 48h) | Display queue list | Admin selects application → Step 6 | N/A |
| 6 | SCR-ADM-005 | Admin views caregiver profile summary (name, email, services, rate, bio, photo, registration date) | Display full application | Admin clicks "Review ID" → Step 7 | N/A |
| 7 | SCR-ADM-007 (ID) | Admin views ID document image (zoomable), profile photo side-by-side | Display ID document with zoom controls | Admin reviews → Step 8 | N/A |
| 8 | SCR-ADM-007 (ID) | Admin checks: Document clear, not expired, photo matches, name matches, appears authentic, age 18+ | Admin performs visual checks | Step 9 | N/A |
| 9a | SCR-ADM-007 (ID) | Admin clicks "Approve ID" | Update ID status to VERIFIED, return to SCR-ADM-005 | Step 10 | N/A |
| 9b | SCR-ADM-007 (ID) | Admin clicks "Reject ID", selects rejection reason | Update ID status to REJECTED, log reason | Return to SCR-ADM-005 → Step 18 (final rejection) | N/A |
| 9c | SCR-ADM-007 (ID) | Admin clicks "Request Clarification", enters clarification note | Email caregiver: "Clarification needed: [note]", status remains PENDING | Return to queue, wait for resubmission | N/A |
| 10 | SCR-ADM-005 | Admin clicks "Review Right to Work" | Navigate to SCR-ADM-007 (Right to Work) | Step 11 | N/A |
| 11 | SCR-ADM-007 (RtW) | If UKVI share code: Display "Auto-verified via UKVI", show share code + expiry. If document: Display document image | Display Right to Work verification details | Admin reviews → Step 12 | N/A |
| 12 | SCR-ADM-007 (RtW) | Admin checks: Document clear, not expired, grants right to work, appears authentic, name matches ID | Admin performs visual checks | Step 13 | N/A |
| 13a | SCR-ADM-007 (RtW) | Admin clicks "Approve Right to Work" | Update Right to Work status to VERIFIED, return to SCR-ADM-005 | Step 14 | N/A |
| 13b | SCR-ADM-007 (RtW) | Admin clicks "Reject Right to Work", selects rejection reason | Update Right to Work status to REJECTED, log reason | Return to SCR-ADM-005 → Step 18 (final rejection) | N/A |
| 13c | SCR-ADM-007 (RtW) | Admin clicks "Request Clarification", enters clarification note | Email caregiver, status remains PENDING | Return to queue | N/A |
| 14 | SCR-ADM-005 | Check if DBS submitted | System checks DBS verification record | If DBS submitted → Step 15, If not → Step 17 | N/A |
| 15 | SCR-ADM-008 (DBS) | Admin views DBS certificate image, checks: Certificate clear, Enhanced level, issued within 3 years, name matches, appears authentic | Display DBS certificate with zoom controls | Admin reviews → Step 16 | N/A |
| 16a | SCR-ADM-008 (DBS) | Admin clicks "Approve DBS" | Update DBS status to VERIFIED, caregiver will receive "DBS Verified" badge, return to SCR-ADM-005 | Step 17 | N/A |
| 16b | SCR-ADM-008 (DBS) | Admin clicks "Reject DBS", selects rejection reason | Update DBS status to REJECTED, caregiver will NOT receive badge (but can still be approved for Tier 1), return to SCR-ADM-005 | Step 17 | N/A |
| 16c | SCR-ADM-008 (DBS) | Admin clicks "Request Clarification", enters clarification note | Email caregiver, status remains PENDING | Return to queue | N/A |
| 17 | SCR-ADM-005 (Summary) | Admin views verification summary: ID (status), Right to Work (status), DBS (status) | Display final summary | Step 18 | N/A |
| 18 | SCR-ADM-005 (Decision) | Check if all REQUIRED verifications approved (ID + Right to Work) | System checks verification statuses | If both approved → Step 19 (final check), If any rejected → Step 20 (rejection) | N/A |
| 19 | SCR-ADM-005 (Final) | Admin reviews full profile one more time, checks for red flags (suspicious activity, policy violations) | Display full profile for final review | Step 21 | N/A |
| 20 | SCR-ADM-005 (Reject) | Admin clicks "Reject Application", system compiles rejection reasons from verification reviews | Create rejection record, log admin action, email caregiver with rejection reasons | Return to queue, application removed from pending | N/A |
| 21a | SCR-ADM-005 (Approve) | Admin clicks "Approve Application", confirms approval | Set caregiver status to ACTIVE, make profile searchable, award badges ("Companionship Services Only", "DBS Verified" if applicable), log admin action | Step 22 | N/A |
| 21b | SCR-ADM-005 (Flag) | Admin clicks "Flag for Senior Review", enters concern note | Escalate to senior admin queue, status = PENDING_SENIOR_REVIEW | Senior admin reviews → Make final decision (approve/reject) | N/A |
| 22 | System | Send approval notifications | Email caregiver: "Profile approved! Live now." SMS caregiver: "Profile approved!" | Step 23 | N/A |
| 23 | SCR-ADM-001 | Update dashboard: Remove application from queue, decrement pending counter | Dashboard shows updated count: "4 Pending Verifications" (was 5) | Step 24 | N/A |
| 24 | Success Confirmation | Admin sees: "Application approved. Caregiver profile is now live." | Display success message with option to review next application | Admin clicks "Review Next Application" → Loop to Step 6 OR clicks "Back to Dashboard" → End session | N/A |

---

## Decision Points

| Decision Point | Question | Yes Path | No Path |
|----------------|----------|----------|---------|
| Credentials valid? | Email + password correct? | 2FA verification (Step 3) | Show error: "Invalid credentials. Try again" |
| 2FA valid? | 2FA code correct, not expired? | Admin dashboard (Step 4) | Show error: "Invalid 2FA code. X attempts remaining" |
| ID checks pass? | Document clear, not expired, photo matches, name matches, authentic, age 18+? | Approve ID (Step 9a) | Reject ID (Step 9b) OR Request clarification (Step 9c) |
| Right to Work checks pass? | Document clear, not expired, grants right to work, authentic, name matches? | Approve Right to Work (Step 13a) | Reject Right to Work (Step 13b) OR Request clarification (Step 13c) |
| DBS submitted? | Caregiver uploaded DBS certificate? | Review DBS (Step 15) | Skip DBS review (Step 17) - DBS status: NOT SUBMITTED |
| DBS checks pass? | Certificate clear, Enhanced level, issued < 3 years ago, name matches, authentic? | Approve DBS (Step 16a) - Award "DBS Verified" badge | Reject DBS (Step 16b) - No badge, but can still approve profile OR Request clarification (Step 16c) |
| All REQUIRED verifications approved? | ID + Right to Work both VERIFIED? | Final profile review (Step 19) | Reject application (Step 20) - Cannot approve without ID + Right to Work |
| Red flags detected? | Profile bio, photo, or behavior suspicious? | Flag for senior review (Step 21b) | Approve application (Step 21a) |
| More applications in queue? | Pending applications remaining? | Review next application (loop to Step 6) | End session OR return to dashboard |

---

## Error Paths

| Error Scenario | Trigger | Admin Sees | Recovery Path |
|----------------|---------|------------|---------------|
| Invalid admin credentials | Admin enters wrong email or password | Error: "Invalid credentials. Try again" | Admin re-enters correct credentials OR clicks "Forgot password?" |
| Invalid 2FA code | Admin enters wrong 2FA code | Error: "Invalid 2FA code. X attempts remaining" | Admin re-enters correct code OR requests new 2FA code |
| Account locked (too many failed 2FA attempts) | Admin exceeds 2FA retry limit (e.g., 3 attempts) | Error: "Account locked for security. Contact admin support." | Senior admin unlocks account |
| ID document not readable | Blurry photo, glare, poor lighting | Admin clicks "Request Clarification": "Photo unclear. Re-upload higher quality" | Caregiver resubmits clearer photo, admin re-reviews |
| ID photo does not match profile photo | Different person OR significant appearance change | Admin clicks "Reject ID": "Photo does not match profile photo" | Caregiver resubmits correct documents OR appeals |
| ID document expired | Expiry date in past | Admin clicks "Reject ID": "Document expired. Upload current ID" | Caregiver uploads current ID, admin re-reviews |
| ID document appears fake | Fake watermark, wrong format, tampered | Admin clicks "Reject ID": "Document appears fake/tampered" + escalate to senior admin | Permanent ban (fraud) OR caregiver appeals with authentic document |
| Right to Work document expired | Visa or BRP expiry date in past | Admin clicks "Reject Right to Work": "Document expired. Renew visa and resubmit" | Caregiver renews visa, uploads new document, admin re-reviews |
| Right to Work does not grant work permission | Tourist visa, student visa with work restrictions | Admin clicks "Reject Right to Work": "Document does not grant right to work in UK" | Caregiver obtains correct visa OR appeals if admin error |
| UKVI share code invalid | UKVI API returns "not found" or "expired" | Admin clicks "Request Clarification": "Share code invalid. Upload document instead" | Caregiver switches to document upload OR corrects share code |
| DBS certificate expired (> 3 years) | Issue date > 3 years ago | Admin clicks "Reject DBS": "Certificate expired (> 3 years). Upload recent DBS" | Caregiver applies for new DBS, uploads when received (can proceed without DBS at Tier 1) |
| DBS certificate not Enhanced level | Basic or Standard level | Admin clicks "Reject DBS": "Must be Enhanced level for 'DBS Verified' badge" | Caregiver applies for Enhanced DBS OR proceeds without badge |
| DBS certificate contains concerning disclosures | Criminal record visible | Admin escalates to senior admin + safeguarding team for risk assessment | Senior admin decides: approve with restrictions, reject, OR request more info |
| Application flagged for suspicious activity | Multiple red flags: fake-looking documents, suspicious bio, policy violations | Admin clicks "Flag for Senior Review" with concerns documented | Senior admin investigates → Approve, reject, OR request more info |

---

## Data Captured Per Step

| Step | Data Input | Validation Rules | Where Stored |
|------|------------|------------------|--------------|
| 2 | Admin email | Valid format, registered admin account | admin_sessions.user_id |
| 2 | Admin password | Correct password hash match | admin_sessions.user_id |
| 3 | 2FA code | 6 digits, matches TOTP or SMS code, not expired | admin_sessions.two_factor_verified_at |
| 9a | ID approval decision | Status = VERIFIED | verifications.status = verified, verifications.admin_id, verifications.reviewed_at |
| 9b | ID rejection reason | Selected from dropdown OR free text | verifications.status = rejected, verifications.rejection_reason, verifications.admin_id |
| 9c | ID clarification request | Free text (500 chars max) | verifications.clarification_notes, verifications.status = pending |
| 13a | Right to Work approval decision | Status = VERIFIED | verifications.status = verified, verifications.admin_id |
| 13b | Right to Work rejection reason | Selected from dropdown OR free text | verifications.status = rejected, verifications.rejection_reason |
| 13c | Right to Work clarification request | Free text (500 chars max) | verifications.clarification_notes |
| 16a | DBS approval decision | Status = VERIFIED | verifications.status = verified, verifications.admin_id |
| 16b | DBS rejection reason | Selected from dropdown OR free text | verifications.status = rejected, verifications.rejection_reason |
| 16c | DBS clarification request | Free text (500 chars max) | verifications.clarification_notes |
| 20 | Application rejection decision | Rejection summary (compiled from verification rejection reasons) | caregiver_profiles.status = rejected, admin_actions.action_type = reject, admin_actions.reason |
| 21a | Application approval decision | Status = ACTIVE | caregiver_profiles.status = active, caregiver_profiles.admin_approved = true, caregiver_profiles.admin_approved_at, admin_actions.action_type = approve |
| 21b | Flag for senior review | Concern notes (free text) | caregiver_profiles.status = pending_senior_review, admin_actions.action_type = flag, admin_actions.reason |

---

## Notifications Triggered

| Step | Notification Type | Recipient | Content Summary | Trigger |
|------|-------------------|-----------|-----------------|---------|
| 9c | Email | Caregiver | "ID verification: Clarification needed. Please resubmit: [clarification notes]" | Admin requests clarification on ID |
| 13c | Email | Caregiver | "Right to Work verification: Clarification needed. Please resubmit: [clarification notes]" | Admin requests clarification on Right to Work |
| 16c | Email | Caregiver | "DBS verification: Clarification needed. Please resubmit: [clarification notes]" | Admin requests clarification on DBS |
| 20 | Email | Caregiver | "Application rejected. Reasons: [compiled rejection reasons]. Resubmit corrected documents or appeal." | Admin rejects application |
| 21a | Email | Caregiver | "Congratulations! Your profile is approved and live. You can now receive bookings." | Admin approves application |
| 21a | SMS | Caregiver | "Profile approved! You can now receive bookings via iCare." | Admin approves application |
| 21b | Email | Senior Admin | "Caregiver application flagged for review by [Admin Name]. Concern: [notes]. Review urgently." | Admin flags application for senior review |
| (Throughout) | In-app | Admin | "New caregiver application submitted" (notification badge) | Caregiver submits onboarding application |

---

## Edge Cases & Alternative Paths

### Edge Case 1: Multiple Admins Review Same Application Simultaneously
**Trigger**: Admin A opens application, Admin B opens same application at same time
**System Behavior**:
- Lock application when admin opens (soft lock: "Admin [Name] is reviewing this application")
- If Admin B tries to take action → Show warning: "Application locked by [Admin A]. Changes not saved."
- Timeout lock after 30 minutes of inactivity (prevent permanent lock)

### Edge Case 2: Caregiver Resubmits Documents While Admin Reviewing
**Trigger**: Admin reviewing application → Caregiver uploads new ID document (after clarification request)
**System Behavior**:
- Show alert to admin: "Caregiver submitted updated documents. Refresh to view latest."
- Admin clicks "Refresh" → Reload application with updated documents
- Previous review notes preserved (audit trail)

### Edge Case 3: Admin Accidentally Rejects Application (Meant to Approve)
**Trigger**: Admin clicks "Reject" by mistake
**System Behavior**:
- Confirmation modal: "Are you sure you want to REJECT this application? This will notify the caregiver."
- Admin clicks "Cancel" → Return to application review
- If admin confirms rejection → Email sent, logged, admin can reverse decision via "Reinstate Application" button (available for 24h)

### Edge Case 4: DBS Certificate Shows Criminal Record
**Trigger**: Admin reviews DBS, sees disclosed offences
**System Behavior**:
- Admin cannot approve/reject immediately (requires safeguarding risk assessment)
- Admin clicks "Flag for Safeguarding Review" → Escalate to safeguarding officer
- Safeguarding officer assesses: Nature of offence, relevance to care work, time elapsed, rehabilitation
- Safeguarding decision: Approve (if low-risk and rehabilitated), Reject (if high-risk), Approve with restrictions (e.g., no vulnerable adults with dementia)

### Edge Case 5: UKVI API Down (Cannot Auto-Verify Share Code)
**Trigger**: Caregiver submitted UKVI share code, but UKVI API unavailable during admin review
**System Behavior**:
- Show warning: "UKVI API unavailable. Manual verification required."
- Admin requests caregiver upload document as backup OR admin retries UKVI API later
- If UKVI API down > 24h → Admin proceeds with manual document verification

### Edge Case 6: Admin Discovers Caregiver Is Registered Twice (Duplicate Accounts)
**Trigger**: Admin reviews application, recognizes name/photo from previous application
**System Behavior**:
- Admin searches for duplicate accounts (by name, email, phone)
- If duplicate found → Admin flags both accounts for senior review
- Senior admin investigates: Genuine duplicate (ban both accounts for fraud) OR innocent error (merge accounts, notify caregiver)

### Edge Case 7: Caregiver Appeals Rejection
**Trigger**: Caregiver receives rejection email, clicks "Appeal" link
**System Behavior**:
- Caregiver submits appeal (free text explanation + optional new documents)
- Appeal assigned to senior admin (different from original reviewer - independent review)
- Senior admin reviews appeal + original rejection reason → Uphold rejection OR overturn and approve

### Edge Case 8: Application SLA Breached (> 48h Pending)
**Trigger**: Application in queue > 48 hours without admin review
**System Behavior**:
- SLA indicator turns RED on verification queue
- Auto-escalate to senior admin: Email notification: "SLA breach: Application pending > 48h"
- Senior admin assigns to admin OR reviews personally

### Edge Case 9: Admin Identifies Caregiver Photo as Stock Image
**Trigger**: Admin reviews profile photo, recognizes as stock photo (reverse image search)
**System Behavior**:
- Admin clicks "Reject ID": "Profile photo appears to be stock image. Upload real photo of yourself."
- Caregiver resubmits real photo OR appeals (if genuine photo mistaken for stock image)

### Edge Case 10: Right to Work Document Valid But Expires Soon (< 3 months)
**Trigger**: Admin reviews Right to Work, sees expiry date in 2 months
**System Behavior**:
- Admin approves (document valid NOW) BUT adds warning note: "Right to Work expires [Date]. Monitor and request renewal."
- System auto-reminds admin 1 month before expiry: "Caregiver [Name]'s Right to Work expires soon. Request renewal."
- Admin contacts caregiver to renew BEFORE expiry (prevent illegal work)

---

## Compliance & Safeguarding Checkpoints

### Immigration Act 2014 Compliance

| Requirement | Implementation | Flow Stage |
|-------------|----------------|-----------|
| Right to Work verification | Admin checks UKVI share code (auto-verify) OR manually reviews visa/passport/BRP (manual verify) | Step 11-13 |
| Document retention | All Right to Work documents retained for 7 years (legal obligation) | Step 13a (document URL stored securely) |
| Expiry date monitoring | Admin checks expiry date, system monitors expiry, auto-alerts 1 month before | Step 12 (admin checks), System background job (alerts) |
| No illegal workers | Caregiver profile NOT made live until Right to Work VERIFIED (approval gate) | Step 21a (final approval gate) |
| Audit trail | All admin actions logged (who approved, when, what documents reviewed) | Step 21a (admin_actions table) |

### Safeguarding Vulnerable Groups Act 2006 (DBS)

| Requirement | Implementation | Flow Stage |
|-------------|----------------|-----------|
| DBS voluntary at Tier 1 | DBS verification optional (companionship not regulated activity) | Step 14-16 (optional review) |
| Enhanced level required for badge | Admin checks DBS level: Basic/Standard rejected for badge, Enhanced approved for badge | Step 15-16 |
| 3-year validity policy | Admin checks DBS issue date, rejects if > 3 years old (platform policy, not legal requirement) | Step 15 |
| Disclosure review | If disclosed offences visible, escalate to safeguarding officer for risk assessment | Edge Case 4 (safeguarding escalation) |

### Care Act 2014 Compliance

| Requirement | Implementation | Flow Stage |
|-------------|----------------|-----------|
| Safeguarding duty | Platform verifies all caregivers BEFORE allowing bookings (admin approval gate) | Step 21a (final approval) |
| Document authenticity check | Human admin reviews all documents (no fully automated approval) | Step 8, 12, 15 (admin reviews) |
| Rejection documentation | All rejection reasons documented (audit trail for safeguarding) | Step 9b, 13b, 16b, 20 (rejection reasons logged) |
| Escalation for concerning disclosures | DBS disclosures or suspicious activity escalated to safeguarding officer | Edge Case 4, Step 21b (flag for senior review) |

### GDPR Compliance

| Requirement | Implementation | Flow Stage |
|-------------|----------------|-----------|
| Data minimization | Admin reviews only documents necessary for verification (ID, Right to Work, optional DBS) | Step 7, 11, 15 (document review) |
| Audit trail | All admin actions logged (who, what, when, why) for accountability | Step 21a (admin_actions table) |
| Right to explanation | Rejection reasons documented and shared with caregiver (transparency) | Step 20 (rejection email with reasons) |
| Data retention | Verification documents retained for 7 years (legal obligation), deleted after | Step 13a (secure storage with 7-year retention policy) |

---

## Success Metrics

| Metric | Target | Measurement Point |
|--------|--------|------------------|
| Average verification time | < 24 hours (registration to approval) | Step 21a timestamp - Step 1 timestamp |
| SLA compliance rate | 90% (applications reviewed within 48h) | Count RED SLA indicators / Total applications |
| Approval rate | 85% (applications approved on first review) | Step 21a count / Total applications |
| Rejection rate | 10% (applications rejected on first review) | Step 20 count / Total applications |
| Clarification rate | 5% (applications requiring resubmission) | Step 9c + 13c + 16c count / Total applications |
| DBS upload rate | 40% (caregivers voluntarily upload DBS) | Step 14 "Yes" / Total applications |
| DBS approval rate | 90% (of uploaded DBS certificates approved) | Step 16a / Step 15 total |
| Admin time per application | < 15 minutes (ID + Right to Work + DBS review) | Step 21a timestamp - Step 6 timestamp |
| Appeal rate | < 2% (rejected caregivers appeal) | Edge Case 7 count / Step 20 count |
| Appeal overturn rate | 20% (appeals result in approval) | Edge Case 7 "Overturn" / Edge Case 7 total |

---

## Product Gaps Identified

### GAP 1: Automated ID Verification (Future Enhancement)
**Issue**: Admin manually reviews ID documents (time-consuming, potential for human error)
**Recommendation**:
- Integrate Stripe Identity or similar service (automated ID verification + liveness check)
- Admin reviews automated result (pass/fail/needs review)
- Cost: £1-2 per verification
- Reduces admin time from 5-10 min to 1-2 min per application

### GAP 2: DBS Update Service Integration Not Implemented
**Issue**: Admin cannot auto-verify DBS validity if caregiver has DBS Update Service subscription (must rely on uploaded certificate)
**Recommendation**:
- Integrate DBS Update Service API (check DBS validity in real-time)
- If caregiver has Update Service subscription → Admin sees auto-verified status
- Reduces admin time, ensures DBS always current

### GAP 3: Reverse Image Search for Profile Photos Not Implemented
**Issue**: Admin relies on visual inspection to detect stock images or fake photos (Edge Case 9)
**Recommendation**:
- Integrate reverse image search API (Google Images, TinEye)
- Auto-flag if profile photo matches stock image database
- Admin reviews flagged photos, rejects if fake

### GAP 4: Senior Admin Review Queue Not Implemented
**Issue**: Step 21b "Flag for Senior Review" mentioned, but no dedicated senior admin queue screen
**Recommendation**:
- Create SCR-ADM-002: Senior Admin Queue (separate from standard verification queue)
- Filter: Applications flagged for senior review OR SLA breached (> 48h)
- Senior admin reviews flagged applications, makes final decision

### GAP 5: Admin Performance Dashboard Not Implemented
**Issue**: No visibility into admin verification performance (average time, SLA compliance, approval rate)
**Recommendation**:
- Create SCR-ADM-003: Admin Performance Dashboard
- Displays: Average verification time, SLA compliance %, approval/rejection rates per admin
- Identifies bottlenecks, training needs, fraud patterns

### GAP 6: Appeal Workflow Not Fully Documented
**Issue**: Edge Case 7 mentions appeal process, but no dedicated appeal screen or workflow
**Recommendation**:
- Create SCR-ADM-004: Appeal Review Screen (senior admin only)
- Display: Original rejection reason, caregiver appeal text, new documents (if any)
- Senior admin makes final decision: Uphold rejection OR overturn and approve

### GAP 7: Right to Work Expiry Monitoring Not Automated
**Issue**: Edge Case 10 mentions expiry monitoring, but no automated alert system documented
**Recommendation**:
- Implement background job: Check Right to Work expiry dates daily
- Auto-send email to admin 1 month before expiry: "Caregiver [Name]'s Right to Work expires [Date]. Request renewal."
- Auto-suspend caregiver profile if Right to Work expires without renewal (prevent illegal work)

---

## Next Steps for Engineering

### Frontend Implementation
1. Build admin login screen (SCR-AUTH-005) with 2FA support
2. Build admin dashboard (SCR-ADM-001) with verification queue counter badge
3. Build verification queue screen (list view with SLA indicators: green/amber/red)
4. Build caregiver application review screen (SCR-ADM-005) with verification checklist
5. Build ID verification review screen (SCR-ADM-007) with zoomable image, side-by-side profile photo
6. Build Right to Work verification review screen (SCR-ADM-007) with document display and UKVI share code auto-verify status
7. Build DBS review screen (SCR-ADM-008) with certificate image and Enhanced level check
8. Build approval/rejection confirmation modals with reason dropdowns
9. Build "Flag for Senior Review" workflow
10. Build success confirmation screen with "Review Next Application" button

### Backend Implementation
1. Admin authentication API with 2FA enforcement
2. Verification queue API (list pending applications, filter by SLA status)
3. Caregiver application detail API (fetch profile + verification documents)
4. UKVI share code validation API (integration with UKVI Right to Work Checking Service)
5. Verification approval/rejection API (update verification status, log admin actions)
6. Application approval API (set caregiver status to ACTIVE, make profile searchable, award badges)
7. Application rejection API (set status to REJECTED, send rejection email)
8. Clarification request API (send email to caregiver, update verification notes)
9. Flag for senior review API (escalate to senior admin queue, send notification)
10. Admin action logging (audit trail: who, what, when, why for all admin actions)

### QA Test Cases
1. Happy path: Admin login → Review application (ID + Right to Work + DBS) → Approve → Profile live (end-to-end)
2. Error path: Invalid admin credentials (wrong password, wrong 2FA code)
3. Error path: Reject ID (expired, photo mismatch, fake document)
4. Error path: Reject Right to Work (expired visa, no work permission)
5. Edge case: UKVI share code auto-verify (success and failure)
6. Edge case: DBS certificate expired (> 3 years) → Reject DBS but approve profile (Tier 1 voluntary)
7. Edge case: DBS contains criminal record → Flag for safeguarding review
8. Edge case: Admin accidentally rejects → Confirmation modal → Cancel rejection
9. Edge case: Multiple admins review same application → Soft lock warning
10. Edge case: SLA breach (> 48h) → RED indicator → Escalate to senior admin
11. Accessibility: Keyboard navigation, screen reader support (WCAG 2.1 AA)
12. Performance: Verification queue load < 2 sec, document image load < 3 sec

---

**Document Status**: COMPLETE
**Last Updated**: 2026-02-02
**Version**: 1.0
**Source Documents**:
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md`
- `/docs/tiers/tier1/draft-design-specs/route-map.md`
- `/docs/tiers/common/spec/state-maps.md` (Registration Flow, Account Suspension Flow)
- `/docs/tiers/tier1/TIER1_COMPREHENSIVE_ANALYSIS.md` (Journey 4)
