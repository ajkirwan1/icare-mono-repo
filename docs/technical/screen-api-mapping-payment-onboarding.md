# Screen-to-API Mapping: Payment & Onboarding Screens

**Document version**: 1.0
**Generated**: 2026-02-18
**Tier scope**: Tier 1
**Related specs**: `api-specification-tier1.md`, `stripe-integration-spec.md`

---

## 1. How to Read This Document

### Trigger Type Symbols

| Symbol | Meaning |
|--------|---------|
| `[PAGE LOAD]` | Called automatically when the screen mounts |
| `[USER ACTION]` | Called in response to a button click, form submit, or similar interaction |
| `[STRIPE CLIENT]` | Handled by Stripe.js in the browser — no call to the platform backend |
| `[WEBHOOK]` | Asynchronous event pushed from Stripe to the platform backend |

### Gap Flags

Lines marked `[GAP]` identify data the screen requires for which no endpoint currently exists in `api-specification-tier1.md`. Each gap has a unique ID (e.g., `GAP-PM-001`) and is summarised in the gap table in Section 8.

### Stripe Integration Note

Screens that involve Stripe have two separate call chains:

1. The platform backend creates or retrieves a Stripe client secret (`POST` to platform API).
2. The browser calls Stripe.js directly using that secret (never touches the platform backend).
3. On completion, Stripe sends a webhook to the platform backend.

Only step 1 and step 3 appear as platform API calls in this document.

---

## 2. SCR-CR-013 — Payment Methods

**Route**: `/settings/payment`
**Role**: Care receiver (also family member)
**Screen JSON**: `docs/tiers/tier1/figma/screens/payment-methods.json`
**Wireframe**: `docs/tiers/tier1/draft-design-specs/wireframes/payment/scr-cr-013-payment-methods.md`

### 2.1 Page Load Calls

| # | Method + Path | Section Populated | Trigger |
|---|--------------|-------------------|---------|
| 1 | `GET /payments/methods` | `section-saved-cards` — renders the `saved-card-item` list; `section-expired-warning` alert visibility; `empty-state` when array is empty | `[PAGE LOAD]` |
| 2 | `GET /users/me` | `section-header` — `userName` prop on `navigation-header` | `[PAGE LOAD]` |

### 2.2 User Interaction Calls

| # | Trigger Element | Method + Path | Notes |
|---|----------------|--------------|-------|
| 1 | "Add Payment Method" button | `POST /payments/setup-intent` | Returns `clientSecret` for Stripe Elements. Sets screen to `adding-card` state. |
| 2 | Stripe Elements form (card number, expiry, CVC, name, postcode) | `[STRIPE CLIENT]` `stripe.confirmCardSetup(clientSecret)` | Browser calls Stripe directly. Returns `setupIntent.payment_method` on success. |
| 3 | "Save Card" button (after Stripe.js success) | `[GAP] POST /payments/methods` | Platform must register the tokenised payment method ID returned by Stripe. No endpoint exists. See GAP-PM-001. |
| 4 | "Set as Default" button on a saved card | `[GAP] PUT /payments/methods/:id/default` | No endpoint exists to set a saved card as the default. See GAP-PM-002. |
| 5 | "Remove" button → confirmation modal → "Remove" | `DELETE /payments/methods/:id` | Removes card. Screen re-fetches `GET /payments/methods` or removes card from local state. |
| 6 | Stripe webhook | `[WEBHOOK]` `setup_intent.succeeded` | Stripe confirms the SetupIntent; platform backend attaches the payment method to the Stripe Customer. |

### 2.3 Gaps

| Gap ID | Missing Endpoint | Severity |
|--------|-----------------|----------|
| GAP-PM-001 | `POST /payments/methods` — register tokenised Stripe payment method with platform | HIGH |
| GAP-PM-002 | `PUT /payments/methods/:id/default` — set a saved card as the default payment method | HIGH |
| GAP-PM-003 | `GET /payments/methods` response does not include `isDefault` or `isExpired` flags per card | MEDIUM |

---

## 3. SCR-CG-020 — Payout Setup

**Route**: `/caregiver/earnings/setup`
**Role**: Caregiver
**Screen JSON**: `docs/tiers/tier1/figma/screens/payout-setup.json`
**Wireframe**: `docs/tiers/tier1/draft-design-specs/wireframes/payment/scr-cg-020-payout-setup.md`

### 3.1 Page Load Calls

| # | Method + Path | Section Populated | Trigger |
|---|--------------|-------------------|---------|
| 1 | `GET /caregivers/me/earnings` | `section-earnings` — `earnings-metric-row` metrics (Total Earned, Pending Payouts, Next Payout) | `[PAGE LOAD]` |
| 2 | `[GAP] GET /caregivers/me/connect-status` | `section-payout-status` — `payout-status-card` variant (`not-connected` vs `connected`); `section-warning-banner` visibility; bank name and account ending | `[PAGE LOAD]` |
| 3 | `GET /users/me` | `section-header` — `userName` prop on `navigation-header` | `[PAGE LOAD]` |

### 3.2 User Interaction Calls

| # | Trigger Element | Method + Path | Notes |
|---|----------------|--------------|-------|
| 1 | "Set Up Payouts" / "Connect Bank Account" button | `[GAP] POST /caregivers/me/connect-onboarding` | Returns a Stripe Connect Express onboarding URL. Platform redirects caregiver to Stripe-hosted flow. Documented in `stripe-integration-spec.md` but absent from `api-specification-tier1.md`. See GAP-PS-001. |
| 2 | Stripe Connect onboarding redirect (return URL) | `[WEBHOOK]` `account.updated` | Stripe notifies platform when KYC is complete. Platform updates internal connect status. Screen renders `connected` state on return. |
| 3 | "Disconnect" / "Update Bank Account" button (connected state) | `[GAP] POST /caregivers/me/connect-onboarding` | Same endpoint re-used for updates to banking details. Stripe Connect Express supports re-entry. See GAP-PS-001. |

### 3.3 Gaps

| Gap ID | Missing Endpoint | Severity |
|--------|-----------------|----------|
| GAP-PS-001 | `POST /caregivers/me/connect-onboarding` — initiate Stripe Connect Express flow; exists in Stripe integration spec but not in API spec | HIGH |
| GAP-PS-002 | `GET /caregivers/me/connect-status` — retrieve current Stripe Connect account status (not-connected, pending, connected, restricted), bank name, account ending | HIGH |
| GAP-PS-003 | `GET /caregivers/me/earnings` response missing `nextPayoutDate` field; screen requires it for the "Next Payout" metric | MEDIUM |

---

## 4. SCR-CG-002 — Caregiver Onboarding

**Route**: `/caregiver/onboarding`
**Role**: Caregiver
**Screen JSON**: `docs/tiers/tier1/figma/screens/onboarding-caregiver.json`
**Wireframe**: `docs/tiers/tier1/draft-design-specs/wireframes/caregiver/scr-cg-002-caregiver-onboarding.md`

The onboarding screen is a 5-step wizard: (1) Profile, (2) Services, (3) Availability, (4) Rate, (5) Verification.

### 4.1 Page Load Calls

| # | Method + Path | Section Populated | Trigger |
|---|--------------|-------------------|---------|
| 1 | `[GAP] GET /caregivers/me/onboarding` | `step-indicator` — highlights current step; pre-fills all form fields across all 5 steps; determines whether to render "Resume" flow or fresh start | `[PAGE LOAD]` |
| 2 | `GET /caregivers/me` | Step 1 (Profile) fields — first name, last name, bio; Step 5 (Verification) — `verification-status-card` components for identity, right-to-work, DBS | `[PAGE LOAD]` |
| 3 | `GET /verification/status` | Step 5 (Verification) — `verification-status-card` variant per document type (`not-submitted`, `pending-review`, `approved`, `rejected`, `skipped`) | `[PAGE LOAD]` |

### 4.2 User Interaction Calls

| # | Trigger Element | Method + Path | Notes |
|---|----------------|--------------|-------|
| 1 | "Save and Continue" on Step 1 (Profile) | `PUT /caregivers/me` | Updates first name, last name, bio. Also triggers `POST /caregivers/me/photo` if a profile photo was uploaded. |
| 2 | Profile photo upload (Step 1) | `[GAP] POST /caregivers/me/photo` | No endpoint exists for profile photo upload. See GAP-OB-001. |
| 3 | "Save and Continue" on Step 2 (Services) | `PUT /caregivers/me` | Updates `services` array (service type selection). |
| 4 | "Save and Continue" on Step 3 (Availability) | `POST /caregivers/me/availability` | Updates availability grid (days/hours). |
| 5 | "Save and Continue" on Step 4 (Rate) | `PUT /caregivers/me` | Updates `hourlyRate`. |
| 6 | "Save and Continue Later" (any step) | `[GAP] PATCH /caregivers/me/onboarding` | No endpoint exists to save partial onboarding progress with current step index. See GAP-OB-002. |
| 7 | "Submit Profile for Review" (Step 5) | `[GAP] POST /caregivers/me/submit-for-review` | Transitions profile status from `draft` to `pending-review`. No endpoint exists. See GAP-OB-003. |

### 4.3 Gaps

| Gap ID | Missing Endpoint | Severity |
|--------|-----------------|----------|
| GAP-OB-001 | `POST /caregivers/me/photo` — upload profile photo; `PUT /caregivers/me` does not handle file uploads | HIGH |
| GAP-OB-002 | `PATCH /caregivers/me/onboarding` or `GET /caregivers/me/onboarding` — save/retrieve current wizard step and partial form data for resume flow | HIGH |
| GAP-OB-003 | `POST /caregivers/me/submit-for-review` — lifecycle transition from `draft` to `pending-review` status | HIGH |

---

## 5. SCR-CG-008 — Identity Verification

**Route**: `/caregiver/verify/identity`
**Role**: Caregiver
**Screen JSON**: `docs/tiers/tier1/figma/screens/onboarding-identity-verification.json`
**Wireframe**: `docs/tiers/tier1/draft-design-specs/wireframes/caregiver/scr-cg-008-identity-verification.md`

### 5.1 Page Load Calls

| # | Method + Path | Section Populated | Trigger |
|---|--------------|-------------------|---------|
| 1 | `GET /verification/status` | `status-badge` component — current verification state (`Not Submitted`, `Pending Review`, `Verified`, `Rejected`); alert banners for `approved` and `rejected` states with `rejectionReason` | `[PAGE LOAD]` |

### 5.2 User Interaction Calls

| # | Trigger Element | Method + Path | Notes |
|---|----------------|--------------|-------|
| 1 | "Submit for Review" button | `POST /verification/identity` | Submits document file + document type selection. Screen transitions to `pending-review` state. |

### 5.3 Gaps

| Gap ID | Missing Endpoint | Severity |
|--------|-----------------|----------|
| GAP-IV-001 | `GET /verification/status` response missing `status`, `rejectionReason`, and `documentType` fields for identity; current response schema does not support the `approved` and `rejected` screen states | HIGH |
| GAP-IV-002 | **Architecture decision required**: wireframe shows a direct file upload form (supported by `POST /verification/identity`), but `api-specification-tier1.md` documents a Stripe Identity hosted redirect flow requiring `POST /verification/identity/session` to return a `clientSecret`. These are mutually exclusive. See DECISION-001 in Section 9. | DECISION |

---

## 6. SCR-CG-009 — Right to Work Verification

**Route**: `/caregiver/verify/right-to-work`
**Role**: Caregiver
**Screen JSON**: `docs/tiers/tier1/figma/screens/onboarding-right-to-work.json`
**Wireframe**: `docs/tiers/tier1/draft-design-specs/wireframes/caregiver/scr-cg-009-right-to-work.md`

The screen has two paths selected via radio button: UK Passport (file upload) and UKVI Share Code (text input + DOB).

### 6.1 Page Load Calls

| # | Method + Path | Section Populated | Trigger |
|---|--------------|-------------------|---------|
| 1 | `GET /verification/status` | `status-badge` — current right-to-work status; alert banners for `approved` and `rejected` states including `rejectionReason` and `verifiedMethod` | `[PAGE LOAD]` |

### 6.2 User Interaction Calls

| # | Trigger Element | Method + Path | Notes |
|---|----------------|--------------|-------|
| 1 | Radio button: "I am a UK passport holder" | (client-side state change) | Swaps form fields between file upload and share code input. No API call. |
| 2 | Radio button: "I have a UKVI share code" | (client-side state change) | Same as above. No API call. |
| 3 | "Submit for Review" button (UK Passport path) | `POST /verification/right-to-work` | Body: `{ method: "uk-passport", documentFile: <multipart> }`. Transitions to `pending-review`. |
| 4 | "Submit for Review" button (Share Code path) | `POST /verification/right-to-work` | Body: `{ method: "share-code", shareCode: "XXX-XXX-XXX", dateOfBirth: "YYYY-MM-DD" }`. No file upload. |

### 6.3 Gaps

| Gap ID | Missing Endpoint | Severity |
|--------|-----------------|----------|
| GAP-RTW-001 | `GET /verification/status` response missing `status`, `rejectionReason`, and `verificationMethod` fields for right-to-work; required to render the `approved` and `rejected` screen states | HIGH |
| GAP-RTW-002 | `POST /verification/right-to-work` request schema underdefined — spec does not document the `method` discriminator field or the share-code path body (`shareCode`, `dateOfBirth`) vs. passport path body (file upload) | MEDIUM |

---

## 7. SCR-CG-010 — DBS Check Submission

**Route**: `/caregiver/verify/dbs`
**Role**: Caregiver
**Screen JSON**: `docs/tiers/tier1/figma/screens/onboarding-dbs-submission.json`
**Wireframe**: `docs/tiers/tier1/draft-design-specs/wireframes/caregiver/scr-cg-010-dbs-submission.md`

DBS submission is optional at Tier 1 (companionship services only). The screen has a "Skip for Now" path.

### 7.1 Page Load Calls

| # | Method + Path | Section Populated | Trigger |
|---|--------------|-------------------|---------|
| 1 | `GET /verification/status` | `status-badge` — current DBS status (`Not Submitted`, `Pending Review`, `DBS Verified`, `Rejected`, `Skipped`); alert banners for all states including `skipped`; pre-fills `certificateNumber` and `issueDate` fields if previously submitted | `[PAGE LOAD]` |

### 7.2 User Interaction Calls

| # | Trigger Element | Method + Path | Notes |
|---|----------------|--------------|-------|
| 1 | "Submit for Review" button | `POST /verification/dbs` | Body: `{ certificateFile: <multipart>, certificateNumber?: string, issueDate: string }`. Transitions to `pending-review`. |
| 2 | "Skip for Now" button | `[GAP] POST /verification/dbs/skip` | Records that the caregiver explicitly skipped DBS at this time. Required so the `skipped` state can be rendered on return visits and to distinguish from `not-submitted`. See GAP-DBS-001. |
| 3 | "Resubmit" button (rejected state) | `POST /verification/dbs` | Same endpoint as initial submission. |

### 7.3 Gaps

| Gap ID | Missing Endpoint | Severity |
|--------|-----------------|----------|
| GAP-DBS-001 | `POST /verification/dbs/skip` — record explicit skip; without this, `skipped` and `not-submitted` states are indistinguishable | HIGH |
| GAP-DBS-002 | `GET /verification/status` response missing `skipped` boolean and `rejectionReason` fields for DBS; also missing `certificateNumber` and `issueDate` for pre-fill on return visit | MEDIUM |

---

## 8. Gap Summary

| Gap ID | Screen | Missing Endpoint / Field | Severity |
|--------|--------|--------------------------|----------|
| GAP-PM-001 | SCR-CR-013 | `POST /payments/methods` — register tokenised payment method after Stripe.js | HIGH |
| GAP-PM-002 | SCR-CR-013 | `PUT /payments/methods/:id/default` — set default card | HIGH |
| GAP-PM-003 | SCR-CR-013 | `GET /payments/methods` response missing `isDefault` and `isExpired` per card | MEDIUM |
| GAP-PS-001 | SCR-CG-020 | `POST /caregivers/me/connect-onboarding` — initiate Stripe Connect Express (in Stripe spec, not API spec) | HIGH |
| GAP-PS-002 | SCR-CG-020 | `GET /caregivers/me/connect-status` — Stripe Connect account status, bank name, account ending | HIGH |
| GAP-PS-003 | SCR-CG-020 | `GET /caregivers/me/earnings` response missing `nextPayoutDate` | MEDIUM |
| GAP-OB-001 | SCR-CG-002 | `POST /caregivers/me/photo` — profile photo upload | HIGH |
| GAP-OB-002 | SCR-CG-002 | `GET/PATCH /caregivers/me/onboarding` — wizard step persistence and resume | HIGH |
| GAP-OB-003 | SCR-CG-002 | `POST /caregivers/me/submit-for-review` — lifecycle transition draft → pending-review | HIGH |
| GAP-IV-001 | SCR-CG-008 | `GET /verification/status` missing `status`, `rejectionReason`, `documentType` for identity | HIGH |
| GAP-IV-002 | SCR-CG-008 | Architecture conflict: direct upload vs. Stripe Identity hosted flow — requires decision | DECISION |
| GAP-RTW-001 | SCR-CG-009 | `GET /verification/status` missing `status`, `rejectionReason`, `verificationMethod` for right-to-work | HIGH |
| GAP-RTW-002 | SCR-CG-009 | `POST /verification/right-to-work` request schema missing `method` discriminator and share-code path body | MEDIUM |
| GAP-DBS-001 | SCR-CG-010 | `POST /verification/dbs/skip` — record explicit skip to distinguish from not-submitted | HIGH |
| GAP-DBS-002 | SCR-CG-010 | `GET /verification/status` missing `skipped`, `rejectionReason`, `certificateNumber`, `issueDate` for DBS | MEDIUM |

**Totals**: 9 HIGH, 5 MEDIUM, 1 DECISION

---

## 9. Recommended API Additions

### 9.1 HIGH Priority — Required Before Development

**ADD-1: `POST /payments/methods`**

Register a tokenised payment method with the platform after Stripe.js confirms the SetupIntent.

```
POST /payments/methods
Authorization: Bearer <token>
Body: { "paymentMethodId": "pm_xxxxx" }
Response 201: { "id": "pm_xxxxx", "brand": "visa", "last4": "4242", "expiry": "03/27", "isDefault": true }
```

**ADD-2: `PUT /payments/methods/:id/default`**

Set a saved card as the default for future bookings.

```
PUT /payments/methods/:id/default
Authorization: Bearer <token>
Response 200: { "id": "pm_xxxxx", "isDefault": true }
```

**ADD-3: Extend `GET /payments/methods` response**

Add `isDefault: boolean` and `isExpired: boolean` to each item in the returned array. `isExpired` is derived server-side from expiry month/year vs. current date.

**ADD-4: `POST /caregivers/me/connect-onboarding`**

Already documented in `stripe-integration-spec.md`. Must be added to `api-specification-tier1.md` and implemented.

```
POST /caregivers/me/connect-onboarding
Authorization: Bearer <token>
Body: { "returnUrl": "https://app.icare.com/caregiver/earnings/setup", "refreshUrl": "https://app.icare.com/caregiver/earnings/setup?refresh=true" }
Response 200: { "url": "https://connect.stripe.com/express/oauth/..." }
```

**ADD-5: `GET /caregivers/me/connect-status`**

```
GET /caregivers/me/connect-status
Authorization: Bearer <token>
Response 200: {
  "status": "not-connected" | "pending" | "connected" | "restricted",
  "bankName": "Barclays" | null,
  "accountEnding": "5678" | null,
  "payoutsEnabled": true | false
}
```

**ADD-6: `POST /caregivers/me/photo`**

Multipart upload for profile photo.

```
POST /caregivers/me/photo
Authorization: Bearer <token>
Content-Type: multipart/form-data
Body: { "photo": <file> }
Response 200: { "photoUrl": "https://cdn.icare.com/photos/..." }
```

**ADD-7: `GET /caregivers/me/onboarding` and `PATCH /caregivers/me/onboarding`**

Resume wizard from saved step.

```
GET /caregivers/me/onboarding
Response 200: { "currentStep": 3, "completedSteps": [1, 2], "formData": { ... } }

PATCH /caregivers/me/onboarding
Body: { "currentStep": 3, "stepData": { ... } }
Response 200: { "currentStep": 3 }
```

**ADD-8: `POST /caregivers/me/submit-for-review`**

```
POST /caregivers/me/submit-for-review
Authorization: Bearer <token>
Response 200: { "profileStatus": "pending-review", "submittedAt": "2026-02-18T10:00:00Z" }
Response 422: { "error": "INCOMPLETE_PROFILE", "missingFields": ["bio", "hourlyRate"] }
```

**ADD-9: `POST /verification/dbs/skip`**

```
POST /verification/dbs/skip
Authorization: Bearer <token>
Response 200: { "status": "skipped", "skippedAt": "2026-02-18T10:00:00Z" }
```

### 9.2 MEDIUM Priority — Required for Complete Screen Rendering

**ADD-10: Extend `GET /verification/status` response**

The current response schema is underdefined. The following fields must be added for all three verification types (identity, right-to-work, dbs):

```json
{
  "identity": {
    "status": "not-submitted" | "pending-review" | "approved" | "rejected",
    "rejectionReason": "string | null",
    "documentType": "passport" | "driving-licence" | null,
    "verifiedAt": "ISO-8601 | null"
  },
  "rightToWork": {
    "status": "not-submitted" | "pending-review" | "approved" | "rejected",
    "rejectionReason": "string | null",
    "verificationMethod": "uk-passport" | "share-code" | null,
    "verifiedAt": "ISO-8601 | null"
  },
  "dbs": {
    "status": "not-submitted" | "pending-review" | "approved" | "rejected" | "skipped",
    "skipped": true | false,
    "rejectionReason": "string | null",
    "certificateNumber": "string | null",
    "issueDate": "ISO-8601 | null",
    "verifiedAt": "ISO-8601 | null"
  }
}
```

**ADD-11: Extend `GET /caregivers/me/earnings` response**

Add `nextPayoutDate: "ISO-8601 | null"` to the response.

**ADD-12: Document `POST /verification/right-to-work` request schema**

The API spec must define the `method` discriminator and both path bodies:
- UK passport path: `{ method: "uk-passport", documentFile: <multipart> }`
- Share code path: `{ method: "share-code", shareCode: string, dateOfBirth: "YYYY-MM-DD" }`

### 9.3 Human Decision Required

**DECISION-001: Identity Verification Flow — Direct Upload vs. Stripe Identity**

Two conflicting designs exist for `SCR-CG-008`:

| | Option A: Direct Upload | Option B: Stripe Identity Hosted |
|--|------------------------|-----------------------------------|
| **Wireframe** | Matches (file upload form in UI) | Does not match (would require removing the form) |
| **API spec** | Does not match (`POST /verification/identity/session` not documented) | Documented in API spec as current intent |
| **User experience** | Form stays in-app; caregiver uploads file directly | Caregiver redirected to Stripe-hosted verification flow |
| **Admin review** | Platform admin reviews uploaded documents | Stripe performs automated verification; results via webhook |
| **Cost** | Storage cost only | Stripe Identity fee per verification (~$1.50 USD per verification) |
| **Compliance** | Platform is data controller for identity documents | Stripe handles biometric data; reduces platform liability |
| **Tier progression** | Direct upload can be augmented with DBS integration at Tier 2 | Stripe Identity is limited to passport/driving licence; does not cover DBS |

**Recommendation**: Option A (direct upload) is the lower-cost path for Tier 1 and aligns with the wireframe already approved by design. Option B should be reconsidered at Tier 3 when biometric verification becomes relevant. However, the API specification must be updated to remove the `POST /verification/identity/session` endpoint and replace it with a straightforward multipart `POST /verification/identity`.

**Action required**: Founder decision on which option to proceed with. Update either the wireframe (if Option B) or the API spec (if Option A) before development begins on this screen.
