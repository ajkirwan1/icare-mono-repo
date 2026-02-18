# Screen-to-API Mapping: Auth Screens

**Document Purpose**: Maps each auth screen to the specific API endpoints required, including page-load calls, user-interaction calls, and identified gaps where no endpoint currently exists.

**Document Owner**: Technical Architect
**Created**: 2026-02-18
**Status**: CANONICAL
**Tier**: Tier 1

**Source Documents**:
- Wireframes: `docs/tiers/tier1/draft-design-specs/wireframes/auth/`
- Screen JSONs: `docs/tiers/tier1/figma/screens/`
- API Specification: `docs/technical/api-specification-tier1.md`

---

## Table of Contents

1. [How to Read This Document](#1-how-to-read-this-document)
2. [SCR-AUTH-005: Login](#2-scr-auth-005-login)
3. [SCR-AUTH-006: Password Reset](#3-scr-auth-006-password-reset)
4. [SCR-AUTH-004: Phone Verification](#4-scr-auth-004-phone-verification)
5. [SCR-AUTH-001: Care Receiver Registration](#5-scr-auth-001-care-receiver-registration)
6. [SCR-AUTH-002: Family Member Registration](#6-scr-auth-002-family-member-registration)
7. [SCR-AUTH-003: Caregiver Registration](#7-scr-auth-003-caregiver-registration)
8. [Gap Summary](#8-gap-summary)
9. [Recommended API Additions](#9-recommended-api-additions)

---

## 1. How to Read This Document

### Trigger Types

| Symbol | Meaning |
|--------|---------|
| **PAGE LOAD** | Called automatically when the screen first renders |
| **USER ACTION** | Called only when the user explicitly interacts (button click, form submit) |
| **CLIENT-SIDE ONLY** | Logic handled entirely in the browser, no API call involved |

### Gap Flags

Sections marked **GAP** identify data the screen requires that has no matching endpoint in the current API specification. Each gap includes a recommended resolution in Section 9.

### API Base Path

All endpoints below are relative to `{base}/api/v1`. Full base URLs:
- Production: `https://api.icare-app.co.uk/api/v1`
- Development: `http://localhost:3000/api/v1`

### Auth Screens are Predominantly Action-Driven

Unlike dashboards, which make multiple page-load calls to populate data widgets, the auth screens are almost entirely form-based. Their page-load call count is zero or one. Almost all API activity is triggered by user actions (form submissions, button clicks). This is by design — auth screens should be fast to load.

---

## 2. SCR-AUTH-005: Login

**Route**: `/login`
**Role**: All registered users (unauthenticated)
**Screen JSON**: `docs/tiers/tier1/figma/screens/auth-login.json`
**Wireframe**: `docs/tiers/tier1/draft-design-specs/wireframes/auth/scr-auth-005-login.md`

### 2.1 Page Load Calls

This screen has **no page-load API calls**. The form renders immediately from static markup. The email field auto-focuses client-side via `autoFocus`.

**One conditional render from URL parameter**: If the URL contains `?redirect=/dashboard` (set by a session-expiry redirect), the client renders a banner — "Your session has expired. Please log in again." This is driven by the query string, not an API call.

---

### 2.2 User Interaction Calls (SCR-AUTH-005)

---

#### Interaction 1: Log In (Form Submit)

**Trigger**: USER ACTION — clicking the "Log In" button or pressing Enter in any form field
**Pre-condition**: Client-side validation passes (non-empty email with valid format, non-empty password)

**Endpoint**: `POST /auth/login`
**Auth**: None (public endpoint)

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Screen Elements Affected**:
- "Log In" button transitions to loading state ("Logging in...", spinner, disabled)
- All form fields disabled during the in-flight request
- The `rememberMe` checkbox state is handled client-side only: if checked, the client stores the returned `accessToken` with a 30-day expiry policy; the API does not have a separate "remember me" parameter

**On Success (200)**:

```
data.accessToken         → stored in client (localStorage or memory)
data.refreshToken        → set as httpOnly cookie by the server
data.user.userType       → drives the redirect destination
data.user.id             → stored in client auth state
data.user.firstName      → stored for immediate display on destination dashboard
data.user.phoneVerified  → guard: if false, redirect to /verify/phone instead of dashboard
```

**Redirect Logic (client-side)**:
```
IF data.user.phoneVerified === false
  → redirect to /verify/phone
ELSE IF data.user.userType === "care_receiver" OR "family"
  → redirect to ?redirect param (if set) OR /dashboard
ELSE IF data.user.userType === "caregiver"
  AND data.user.accountStatus === "pending_verification"
  → redirect to /caregiver/onboarding
ELSE IF data.user.userType === "caregiver"
  → redirect to /caregiver/dashboard
ELSE IF data.user.userType === "admin"
  → redirect to /admin
```

**On Error (401 — Invalid Credentials)**:
- Show `alert-banner` in warning variant: "Invalid email or password. [N] attempts remaining."
- Clear password field, keep email field populated
- Decrement displayed attempt counter from the value returned in the server error response

**GAP-AUTH-001**: The `POST /auth/login` 401 error response does not include a `remainingAttempts` field. The wireframe shows "4 attempts remaining" in the error banner, which requires the server to return the current attempt count. Without this field, the client cannot display the countdown accurately and must either omit it or guess. See Section 9.

**On Error (403 — Account Locked)**:
- Show `alert-banner` in error variant: "Too many failed login attempts. Account locked for 10 minutes."
- All form fields disabled
- "Log In" button disabled
- Countdown timer displays "Wait X:XX to try again" — computed client-side from the lockout expiry timestamp in the server response

**GAP-AUTH-002**: The `POST /auth/login` 403 (account locked) error response does not include a `lockoutExpiresAt` timestamp. The client needs the exact lockout expiry to display an accurate countdown timer. Without it, the client must estimate from the moment it receives the 403, which will drift incorrectly if the user refreshes the page. See Section 9.

**On Error (403 — Account Suspended or Banned)**:
- Show `alert-banner` in error variant: "Your account has been suspended. Contact support for assistance."
- All form fields disabled
- "Log In" button disabled
- "Contact Support" CTA navigates to the support page (client-side navigation, no API call)

**Notes**: The wireframe and API spec both specify that the error message for 401 must be generic ("Invalid email or password") and must not reveal whether the email address exists in the system. This is already aligned between the spec and wireframe.

---

### 2.3 Login — Call Summary Table

| # | Endpoint | Method | Trigger | Screen Element |
|---|----------|--------|---------|----------------|
| 1 | `/auth/login` | POST | User action (Log In button) | Form submit → redirect on success |
| — | *(none)* | — | Page load | No page-load calls |

**Total page-load calls**: 0
**Total potential user-action calls**: 1

---

## 3. SCR-AUTH-006: Password Reset

**Route**: `/forgot-password`
**Role**: All users (unauthenticated)
**Screen JSON**: `docs/tiers/tier1/figma/screens/auth-password-reset.json`
**Wireframe**: `docs/tiers/tier1/draft-design-specs/wireframes/auth/scr-auth-006-password-reset.md`

### 3.1 Page Load Calls

This screen has **no page-load API calls**. It renders immediately from static markup. The email field auto-focuses client-side on load.

---

### 3.2 User Interaction Calls (SCR-AUTH-006)

---

#### Interaction 1: Send Reset Link (Form Submit)

**Trigger**: USER ACTION — clicking the "Send Reset Link" button or pressing Enter in the email field
**Pre-condition**: Client-side email format validation passes

**Endpoint**: `POST /auth/forgot-password`
**Auth**: None (public endpoint)

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Screen Elements Affected**:
- "Send Reset Link" button transitions to loading state ("Sending...", spinner, disabled)
- Email field disabled during the in-flight request

**On Success (200)**:
- Always shown regardless of whether the email exists (security measure — prevents account enumeration)
- Render `alert-banner` in success variant:
  - Heading: "Check your email"
  - Body: "We've sent a password reset link to [email entered]"
  - Helper: "The link will expire in 1 hour. If you don't see the email, check your spam folder."
- Email field remains populated but disabled
- "Send Reset Link" button remains disabled with label: "Link sent. Check your email."
- Reveal the "Didn't receive the email?" troubleshooting list (client-side show/hide, no API call)

**Response Fields Used**:
```
data.message  → informational only, not displayed to the user
```

**On Error (429 — Rate Limited)**:
- Show `alert-banner` in warning variant: "Too many reset requests. Please try again in X minutes."
- "Send Reset Link" button disabled with countdown: "Try again in 14:32"

**GAP-AUTH-003**: The `POST /auth/forgot-password` 429 error response does not include a `retryAfterSeconds` value. The wireframe shows a specific countdown ("Try again in 14:32"), but without a server-provided retry window the client can only display a generic message or count from the moment it received the 429. The standard HTTP `Retry-After` header should also be set. See Section 9.

**On Network Error**:
- Show `alert-banner` in error variant: "Unable to send reset email. Please check your internet connection and try again."
- "Retry" CTA re-enables the form

**Notes**: The success response is identical whether the email is registered or not. The client must never indicate whether an account exists — this is both a product requirement and a security requirement documented in the wireframe. The `POST /auth/reset-password` endpoint (section 2.6 of the API spec) is used when the user clicks the link in the email and lands on `/reset-password?token=[token]`. That destination screen is not in R0 scope per the wireframe document and is therefore not covered here.

---

### 3.3 Password Reset — Call Summary Table

| # | Endpoint | Method | Trigger | Screen Element |
|---|----------|--------|---------|----------------|
| 1 | `/auth/forgot-password` | POST | User action (Send Reset Link button) | Success banner or error banner |
| — | *(none)* | — | Page load | No page-load calls |

**Total page-load calls**: 0
**Total potential user-action calls**: 1

---

## 4. SCR-AUTH-004: Phone Verification

**Route**: `/verify/phone`
**Role**: All newly registered users (authenticated, `status: pending_phone_verification`)
**Screen JSON**: `docs/tiers/tier1/figma/screens/auth-phone-verification.json`
**Wireframe**: `docs/tiers/tier1/draft-design-specs/wireframes/auth/scr-auth-004-phone-verification.md`

### 4.1 Page Load Calls

---

#### Call 1: Current User (for masked phone display and redirect guard)

**Trigger**: PAGE LOAD
**Endpoint**: `GET /users/me`
**Auth**: Bearer JWT

**Screen Elements Populated**:
- `section-form` subtitle — "We've sent a 6-digit code to ****1234" — uses the last 4 digits of `data.phone` to render the masked number. The screen JSON confirms this via the `sampleData.phone.masked` field (`"07*** ***456"`).
- The OTP was already dispatched server-side as a side effect of `POST /auth/register` — no separate "send OTP" call is needed on page load unless this screen is reached via direct navigation after a session restore.

**Response Fields Used**:
```
data.phone           → mask to display last 4 digits:
                       "+447700900456" → "****0456"
data.phoneVerified   → guard: if true, this screen was reached in error
                       → redirect immediately to appropriate dashboard
data.userType        → determines the success redirect destination:
                         care_receiver / family → /dashboard
                         caregiver             → /caregiver/onboarding
data.accountStatus   → if not "pending_phone_verification", redirect appropriately
```

**Notes**: The JWT is available because `POST /auth/register` returns `accessToken` in its 201 response — the user is authenticated even before phone verification completes. If `data.phoneVerified === true`, the user has already verified and has somehow reached this screen in error; redirect immediately without showing the form.

**GAP-AUTH-004**: The `GET /users/me` response does not include an `otpSentAt` timestamp. The 10-minute countdown timer on this screen needs to know when the OTP was sent in order to display the accurate time remaining. If the user closes the browser and reopens the page mid-session, the countdown would reset to 10:00 from page load — which may show more time than actually remains. Without `otpSentAt`, the client cannot restore the correct countdown position. See Section 9.

---

### 4.2 User Interaction Calls (SCR-AUTH-004)

---

#### Interaction 1: Submit OTP Code (Verify)

**Trigger**: USER ACTION — clicking the "Verify Code" button, OR auto-submit when all 6 digits are entered (the wireframe documents this as optional but recommended for elderly users)
**Pre-condition**: All 6 OTP boxes contain digits

**Endpoint**: `POST /auth/verify-phone`
**Auth**: Bearer JWT

**Request Body**:
```json
{
  "otp": "543219"
}
```

**Screen Elements Affected**:
- "Verify Code" button transitions to loading state ("Verifying...", spinner, disabled)
- OTP input boxes disabled during the in-flight request

**On Success (200)**:
```
data.phoneVerified  → true (confirmed)
```
- Immediate redirect based on `userType` (already known from the page-load call to `GET /users/me`):
  - `care_receiver` / `family` → `/dashboard`
  - `caregiver` → `/caregiver/onboarding`
- No success message is displayed on this screen — the redirect is immediate

**On Error (400 — Invalid OTP)**:
- Clear all 6 OTP boxes
- Re-focus first OTP box
- Show error text below boxes: "Invalid code. [N] attempts remaining. Please check the code and try again."
- OTP boxes show red border styling

**GAP-AUTH-005**: The `POST /auth/verify-phone` 400 error response does not include a `remainingAttempts` field. The wireframe shows "Invalid code. 2 attempts remaining." Without this field the client cannot display the accurate attempt count and must either omit the counter or guess. See Section 9.

**On Error (429 — Too Many Attempts)**:
- Show error text: "Too many attempts. Request a new code in 10 minutes."
- "Verify Code" button disabled
- "Resend code" link disabled with a 10-minute cooldown countdown

---

#### Interaction 2: Resend OTP Code

**Trigger**: USER ACTION — clicking the "Resend code" link
**Pre-condition**: The resend link is enabled (not rate-limited, not mid-cooldown)

**Endpoint**: `POST /auth/resend-phone-otp`
**Auth**: Bearer JWT

**Request**: No body required

**Screen Elements Affected**:
- "Resend code" link transitions to disabled state immediately on click
- On success: countdown timer resets to 10:00 (driven by `data.expiresIn`)
- On success: all 6 OTP boxes clear and first box re-focuses

**On Success (200)**:
```
data.message    → "OTP sent to +447700900000" (not surfaced verbatim to the user)
data.expiresIn  → 600 (seconds) — used to reset the countdown timer to 10:00
```
- OTP boxes cleared
- Countdown timer reset to `data.expiresIn` seconds
- "Resend code" link enters per-resend cooldown: "Resend available in 5:00" (client-side 5-minute countdown before re-enabling the link)
- Brief inline confirmation: "A new code has been sent to ****0456"

**On Error (429 — Rate Limited)**:
- "Resend code" link remains disabled
- Show cooldown text: "Resend available in X:XX"

**Notes**: The API spec (section 2.9) documents the rate limit as "Max 3 OTPs per 15 minutes". The wireframe documents a 5-minute per-resend display cooldown. These are compatible: the server enforces the 3-in-15-minutes hard limit, while the client enforces a 5-minute visual cooldown between each resend tap. If the user exhausts all 3 server-side resends, the next request returns 429 and the client disables the link for the remainder of the 15-minute window.

---

#### Interaction 3: Countdown Timer Expiry (Client-Side)

**Trigger**: CLIENT-SIDE ONLY — the 10-minute countdown timer reaches 0:00
**API call**: None

When the timer expires:
- Display "Code expired" text in place of the countdown
- Disable the "Verify Code" button
- Enable the "Resend code" link (if not separately rate-limited)
- OTP boxes switch to warning styling (amber border)
- Screen reader announcement: "Code expired. Please request a new code."

---

### 4.3 Phone Verification — Call Summary Table

| # | Endpoint | Method | Trigger | Screen Element |
|---|----------|--------|---------|----------------|
| 1 | `/users/me` | GET | Page load | Masked phone number display, redirect guard |
| 2 | `/auth/verify-phone` | POST | User action (Verify Code button) | Redirect on success, error text on failure |
| 3 | `/auth/resend-phone-otp` | POST | User action (Resend code link) | Countdown reset, OTP boxes cleared |

**Total page-load calls**: 1
**Total potential user-action calls**: 2

---

## 5. SCR-AUTH-001: Care Receiver Registration

**Route**: `/register/care-receiver`
**Role**: Unauthenticated visitors (prospective care receivers)
**Screen JSON**: `docs/tiers/tier1/figma/screens/auth-care-receiver-registration.json`
**Wireframe**: `docs/tiers/tier1/draft-design-specs/wireframes/auth/scr-auth-001-care-receiver-registration.md`

### 5.1 Page Load Calls

This screen has **no page-load API calls**. All content is static. The form renders immediately.

---

### 5.2 User Interaction Calls (SCR-AUTH-001)

---

#### Interaction 1: Create Account (Form Submit)

**Trigger**: USER ACTION — clicking the "Create Account" button
**Pre-condition**: All client-side validation passes for all required fields

**Client-Side Validation Before API Call**:
- Full name: 2-100 characters (the screen JSON splits this into `firstName` and `lastName` fields)
- Email: valid format
- Password: 8+ chars, 1 uppercase, 1 number (the `password-strength-meter` component guides the user in real-time)
- Phone: UK mobile format (07xxx xxxxxx)
- Postcode: UK postcode format
- Date of birth: calculated age must be 65+ OR the "documented care needs" checkbox must be checked
- Emergency contact name: 2-100 characters
- Emergency contact phone: UK phone format
- Emergency contact relationship: selected from dropdown
- Terms of Service: checked
- Privacy Policy: checked

**Endpoint**: `POST /auth/register`
**Auth**: None (public endpoint)

**Request Body**:
```json
{
  "userType": "care_receiver",
  "firstName": "Sarah",
  "lastName": "Johnson",
  "email": "sarah@example.com",
  "password": "SecurePassword123!",
  "phone": "+447700900000",
  "phoneCountryCode": "+44",
  "dateOfBirth": "1958-03-15",
  "postcode": "SW1A 1AA",
  "undocumentedCareNeeds": false,
  "gdprConsent": true,
  "marketingConsent": false,
  "emergencyContact": {
    "name": "John Johnson",
    "phone": "+447700900001",
    "relationship": "son"
  }
}
```

**GAP-AUTH-006**: The `POST /auth/register` request body in the API spec (section 2.1) does not include a `postcode` field or an `emergencyContact` object. The care receiver registration form collects both. The postcode is essential for location-based caregiver search immediately after the user's first login. The emergency contact is a safeguarding requirement captured at registration. Without these fields in the API spec, engineers must infer the schema from the wireframe — a dangerous gap that could result in missing fields in the database schema. See Section 9.

**GAP-AUTH-007**: The `POST /auth/register` request body does not include an `undocumentedCareNeeds` (or equivalent) boolean field. The care receiver registration form has a conditional checkbox: "I am under 65 but have documented care needs." This flag must be stored with a timestamp as a self-attestation record for eligibility purposes. Without this field, the API cannot record the under-65 exemption in the database. See Section 9.

**Screen Elements Affected**:
- "Create Account" button transitions to loading state ("Creating account...", spinner, disabled)
- All form fields disabled during the in-flight request

**On Success (201)**:
```
data.userId                → stored in client state
data.phoneVerificationSent → true (confirms OTP was dispatched to the phone number)
```
- Immediate redirect to `/verify/phone` (SCR-AUTH-004)
- No success message displayed on this screen

**On Error (409 — Email Already Registered)**:
- Show `alert-banner` in warning variant: "This email is already registered. Please log in or use a different email address."
- Two CTAs:
  - "Log In" → navigates to `/login?email=sarah@example.com` (pre-filled)
  - "Try Different Email" → re-enables the email field only, all other fields remain populated

**On Error (400 — Validation Error)**:
- Show `alert-banner`: "Please correct the errors below to continue"
- Inline errors appear below each invalid field (server returns field-level errors in the response body)
- Page scrolls to first error

**On Network Error**:
- Show `alert-banner` in error variant: "Unable to create account. Please check your internet connection and try again."
- "Retry" CTA re-submits the same form data

---

#### Interaction 2: Age Verification Conditional (Client-Side Only)

**Trigger**: CLIENT-SIDE ONLY — user enters a date of birth indicating age under 65
**API call**: None

When the calculated age from the date of birth input is under 65:
- Reveal the conditional checkbox: "I am under 65 but have documented care needs"
- If the user does not check this checkbox, client-side validation blocks form submission
- The checkbox state is sent in the registration API call as the `undocumentedCareNeeds` boolean

---

#### Interaction 3: Password Strength Meter (Client-Side Only)

**Trigger**: CLIENT-SIDE ONLY — user types in the password field
**API call**: None

The `password-strength-meter` component in the screen JSON evaluates the password in real-time and shows strength level (Weak / Fair / Strong) plus individual criteria checkmarks. No API call is involved.

---

### 5.3 Care Receiver Registration — Call Summary Table

| # | Endpoint | Method | Trigger | Screen Element |
|---|----------|--------|---------|----------------|
| 1 | `/auth/register` | POST | User action (Create Account button) | Redirect to phone verification on success |
| — | *(none)* | — | Page load | No page-load calls |
| — | *(client-side)* | — | DOB field input | Shows/hides care needs checkbox |
| — | *(client-side)* | — | Password field input | Password strength meter |

**Total page-load calls**: 0
**Total potential user-action calls**: 1

---

## 6. SCR-AUTH-002: Family Member Registration

**Route**: `/register/family`
**Role**: Unauthenticated visitors (family members acting as proxy for a care receiver)
**Screen JSON**: `docs/tiers/tier1/figma/screens/auth-family-member-registration.json`
**Wireframe**: `docs/tiers/tier1/draft-design-specs/wireframes/auth/scr-auth-002-family-member-registration.md`

### 6.1 Page Load Calls

This screen has **no page-load API calls**. All content is static.

---

### 6.2 User Interaction Calls (SCR-AUTH-002)

---

#### Interaction 1: Create Accounts (Form Submit)

**Trigger**: USER ACTION — clicking the "Create Accounts" button
**Pre-condition**: All client-side validation passes for all required fields in both the family member section and the care receiver section

**Client-Side Validation Before API Call**:

Family member fields:
- Full name: 2-100 characters
- Email: valid format
- Password: 8+ chars, 1 uppercase, 1 number
- Phone: UK mobile format
- Relationship to care receiver: selected from dropdown

Care receiver fields:
- Name: 2-100 characters
- Date of birth: 65+ OR under-65 care needs checkbox checked
- Postcode: UK postcode format
- Phone: UK phone format (optional)

Consent fields:
- Proxy consent attestation: checked ("I confirm I have the care receiver's consent")
- Terms of Service: checked
- Privacy Policy: checked

**Endpoint**: `POST /auth/register`
**Auth**: None (public endpoint)

**Request Body (as required by the screen — see GAP-AUTH-008)**:
```json
{
  "userType": "family",
  "firstName": "John",
  "lastName": "Smith",
  "email": "john@example.com",
  "password": "SecurePassword123!",
  "phone": "+447700900000",
  "phoneCountryCode": "+44",
  "relationshipToCareReceiver": "son",
  "gdprConsent": true,
  "marketingConsent": false,
  "proxyConsent": true,
  "careReceiver": {
    "firstName": "Mary",
    "lastName": "Johnson",
    "dateOfBirth": "1950-06-20",
    "postcode": "SW1A 1AA",
    "phone": "+447700900001",
    "undocumentedCareNeeds": false
  },
  "emergencyContact": {
    "useFamilyMemberDetails": true,
    "name": null,
    "phone": null,
    "relationship": null
  }
}
```

**GAP-AUTH-008**: The `POST /auth/register` request body in the API spec has a single flat structure that cannot accommodate the dual-account nature of family member registration. The family registration requires:
- A nested `careReceiver` object (a separate user account to be created atomically with the family member account)
- A `proxyConsent` boolean (critical legal and safeguarding audit record — the family member attests that the care receiver has given consent to proxy management)
- A `relationshipToCareReceiver` field
- An `emergencyContact` object with a `useFamilyMemberDetails` flag

Without these fields in the spec, the API cannot create the two linked accounts (family member proxy + care receiver principal) that this registration flow is designed to produce. This is the highest-priority gap in the auth screens because family member registration is a functionally distinct flow that cannot be wedged into the existing single-user `POST /auth/register` schema. See Section 9.

**GAP-AUTH-009**: There is no documented response structure for family member registration in the API spec. The single `POST /auth/register` 201 response shows `userId` and `userType` for one user. For family registration, the server creates two accounts. The client needs the care receiver's ID — at minimum — to store in session state so the correct `careReceiverId` is used when making bookings (caregivers see the care receiver's name, not the family member's). The response must include both `familyMemberId` and `careReceiverId`. See Section 9.

**Screen Elements Affected**:
- "Create Accounts" button transitions to loading state ("Creating accounts...", spinner, disabled)
- All form fields disabled during the in-flight request

**On Success (201)**:
```
data.userId (familyMemberId)   → family member's userId (authenticated user going forward)
data.careReceiverId            → (GAP-AUTH-009) care receiver's userId
data.phoneVerificationSent     → true
```
- Immediate redirect to `/verify/phone` (SCR-AUTH-004)
- The OTP is sent to the family member's phone (the family member is the authenticated actor)

**On Error (409 — Email Already Registered)**:
- Same banner pattern as SCR-AUTH-001

**On Error (400 — Validation)**:
- Same inline error pattern as SCR-AUTH-001

---

#### Interaction 2: Emergency Contact Toggle (Client-Side Only)

**Trigger**: CLIENT-SIDE ONLY — user selects "Use a different emergency contact" radio button
**API call**: None

The default state ("Use my details as the emergency contact") hides the separate emergency contact fields. Selecting the alternative radio button reveals name, phone, and relationship fields. This is a pure client-side show/hide. The final state is encoded in the registration request body via `emergencyContact.useFamilyMemberDetails` and, if false, the additional contact name/phone/relationship fields.

---

#### Interaction 3: Care Receiver Age Verification Conditional (Client-Side Only)

**Trigger**: CLIENT-SIDE ONLY — user enters a care receiver date of birth indicating age under 65
**API call**: None

Identical pattern to SCR-AUTH-001, but applies to the care receiver's date of birth field in the "Care Receiver Details" section.

---

### 6.3 Family Member Registration — Call Summary Table

| # | Endpoint | Method | Trigger | Screen Element |
|---|----------|--------|---------|----------------|
| 1 | `/auth/register` | POST | User action (Create Accounts button) | Redirect to phone verification on success |
| — | *(none)* | — | Page load | No page-load calls |
| — | *(client-side)* | — | Emergency contact radio toggle | Shows/hides additional emergency contact fields |
| — | *(client-side)* | — | Care receiver DOB input | Shows/hides care needs checkbox |

**Total page-load calls**: 0
**Total potential user-action calls**: 1

---

## 7. SCR-AUTH-003: Caregiver Registration

**Route**: `/register/caregiver`
**Role**: Unauthenticated visitors (prospective caregivers)
**Screen JSON**: `docs/tiers/tier1/figma/screens/auth-caregiver-registration.json`
**Wireframe**: `docs/tiers/tier1/draft-design-specs/wireframes/auth/scr-auth-003-caregiver-registration.md`

### 7.1 Page Load Calls

This screen has **no page-load API calls**. All content is static, including the commission rate info box (the screen JSON hardcodes `sampleData.commissionRate: "15%"` — this value is a placeholder pending FDR-008).

---

### 7.2 User Interaction Calls (SCR-AUTH-003)

---

#### Interaction 1: Create Account (Form Submit)

**Trigger**: USER ACTION — clicking the "Create Account" button
**Pre-condition**: All client-side validation passes

**Client-Side Validation Before API Call**:
- Full name: 2-100 characters
- Email: valid format
- Password: 8+ chars, 1 uppercase, 1 number
- Phone: UK mobile format
- Postcode: UK postcode format
- Self-employed status checkbox: must be checked (required by FDR-001)
- Terms of Service for Caregivers: checked
- Privacy Policy: checked

**Endpoint**: `POST /auth/register`
**Auth**: None (public endpoint)

**Request Body**:
```json
{
  "userType": "caregiver",
  "firstName": "Emma",
  "lastName": "Wilson",
  "email": "emma@example.com",
  "password": "SecurePassword123!",
  "phone": "+447700900000",
  "phoneCountryCode": "+44",
  "postcode": "SW1A 1AA",
  "selfEmployedAcknowledgment": true,
  "gdprConsent": true,
  "marketingConsent": false
}
```

**GAP-AUTH-010**: The `POST /auth/register` request body in the API spec does not include:
- `postcode` — the caregiver's work location, required immediately to seed the PostGIS search index so the caregiver appears in location-based search results after completing onboarding
- `selfEmployedAcknowledgment` — a boolean that must be stored with a server-recorded timestamp and IP address as the legal audit record for the IR35/employment status attestation. This is a core requirement of the Introduction Agency model (FDR-001). If this field is omitted from the spec, the audit trail for self-employed status does not exist in the database and the platform is exposed to employment status disputes

See Section 9.

**Screen Elements Affected**:
- "Create Account" button transitions to loading state ("Creating account...", spinner, disabled)
- All form fields disabled during the in-flight request

**On Success (201)**:
```
data.userId                → stored in client state
data.userType              → "caregiver"
data.phoneVerificationSent → true
```
- Immediate redirect to `/verify/phone` (SCR-AUTH-004)
- After phone verification completes, the phone verification screen redirects to `/caregiver/onboarding` (driven by `userType === "caregiver"` from the `GET /users/me` call on that screen)

**On Error (409 — Email Already Registered)**:
- Same banner pattern as SCR-AUTH-001

**On Error (400 — Validation)**:
- Same inline error pattern as SCR-AUTH-001

---

#### Interaction 2: Password Strength Meter (Client-Side Only)

**Trigger**: CLIENT-SIDE ONLY — user types in the password field
**API call**: None

Same real-time behaviour as SCR-AUTH-001. No API call involved.

---

### 7.3 Caregiver Registration — Call Summary Table

| # | Endpoint | Method | Trigger | Screen Element |
|---|----------|--------|---------|----------------|
| 1 | `/auth/register` | POST | User action (Create Account button) | Redirect to phone verification on success |
| — | *(none)* | — | Page load | No page-load calls |
| — | *(client-side)* | — | Password field input | Password strength meter |

**Total page-load calls**: 0
**Total potential user-action calls**: 1

---

## 8. Gap Summary

| Gap ID | Screen(s) | Description | Priority |
|--------|-----------|-------------|----------|
| **GAP-AUTH-001** | SCR-AUTH-005 | `POST /auth/login` 401 response does not include `remainingAttempts`. The "4 attempts remaining" error banner cannot be rendered accurately without this field. | HIGH |
| **GAP-AUTH-002** | SCR-AUTH-005 | `POST /auth/login` 403 (account locked) response does not include `lockoutExpiresAt`. The lockout countdown timer cannot be displayed accurately or restored on page refresh without a server-anchored expiry timestamp. | HIGH |
| **GAP-AUTH-003** | SCR-AUTH-006 | `POST /auth/forgot-password` 429 response does not include `retryAfterSeconds`. The rate-limit countdown timer ("Try again in 14:32") cannot be rendered accurately. | MEDIUM |
| **GAP-AUTH-004** | SCR-AUTH-004 | `GET /users/me` response does not include `otpSentAt`. The 10-minute OTP countdown timer cannot be restored accurately if the user refreshes the page or returns mid-session. | MEDIUM |
| **GAP-AUTH-005** | SCR-AUTH-004 | `POST /auth/verify-phone` 400 response does not include `remainingAttempts`. The "2 attempts remaining" error text cannot be rendered accurately. | HIGH |
| **GAP-AUTH-006** | SCR-AUTH-001, SCR-AUTH-002, SCR-AUTH-003 | `POST /auth/register` request body does not include `postcode` or `emergencyContact` fields. The care receiver and caregiver forms collect a postcode at registration. The care receiver form also collects a full emergency contact object. Neither is in the API spec body, creating a gap between the spec and the required database schema. | HIGH |
| **GAP-AUTH-007** | SCR-AUTH-001, SCR-AUTH-002 | `POST /auth/register` request body does not include `undocumentedCareNeeds` boolean. The under-65 care needs self-attestation checkbox has no corresponding field in the API spec. The self-attestation cannot be stored or audited. | MEDIUM |
| **GAP-AUTH-008** | SCR-AUTH-002 | `POST /auth/register` does not support the dual-account family registration payload. The spec's flat request body cannot represent the creation of two linked accounts. Missing: nested `careReceiver` object, `proxyConsent` boolean, `relationshipToCareReceiver` field, and `emergencyContact.useFamilyMemberDetails` flag. | HIGH |
| **GAP-AUTH-009** | SCR-AUTH-002 | `POST /auth/register` 201 response does not include `careReceiverId` for family registrations. After creating two accounts, the client needs the care receiver's UUID to store in session state for booking attribution. | HIGH |
| **GAP-AUTH-010** | SCR-AUTH-003 | `POST /auth/register` request body does not include `selfEmployedAcknowledgment` boolean. This field must be stored server-side with a timestamp and IP address as the legal audit record for the IR35/employment status acknowledgment required by FDR-001. | HIGH |

---

## 9. Recommended API Additions

The following additions to `docs/technical/api-specification-tier1.md` are recommended to close the gaps identified above, listed in priority order.

---

### 9.1 HIGH PRIORITY

#### ADD-AUTH-1: Add `remainingAttempts` to POST /auth/login 401 Response

Closes: GAP-AUTH-001

Add `remainingAttempts: number` to the 401 error response body.

**Updated 401 Response**:
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password",
    "remainingAttempts": 3
  }
}
```

`remainingAttempts` counts down from 5 toward 0. When it reaches 0, the next failed attempt returns 403 ACCOUNT_LOCKED instead.

---

#### ADD-AUTH-2: Add `lockoutExpiresAt` to POST /auth/login 403 Response

Closes: GAP-AUTH-002

Add `lockoutExpiresAt: ISO8601 string` to the 403 ACCOUNT_LOCKED response body.

**Updated 403 Response (account locked)**:
```json
{
  "success": false,
  "error": {
    "code": "ACCOUNT_LOCKED",
    "message": "Too many failed login attempts. Account locked.",
    "lockoutExpiresAt": "2026-02-18T14:35:00Z"
  }
}
```

The client computes `lockoutExpiresAt - now()` to render the countdown. Because the expiry is a server-anchored absolute timestamp, the timer is correct even after page refresh.

---

#### ADD-AUTH-3: Add `remainingAttempts` to POST /auth/verify-phone 400 Response

Closes: GAP-AUTH-005

Add `remainingAttempts: number` to the 400 INVALID_OTP error response.

**Updated 400 Response**:
```json
{
  "success": false,
  "error": {
    "code": "INVALID_OTP",
    "message": "Invalid verification code",
    "remainingAttempts": 2
  }
}
```

---

#### ADD-AUTH-4: Extend POST /auth/register Request Body

Closes: GAP-AUTH-006, GAP-AUTH-007, GAP-AUTH-010

The `POST /auth/register` request body must be extended with the following fields. All fields are conditional on `userType`.

**For `care_receiver` registrations**:
```json
{
  "postcode": "SW1A 1AA",
  "undocumentedCareNeeds": false,
  "emergencyContact": {
    "name": "John Smith",
    "phone": "+447700900001",
    "relationship": "son"
  }
}
```

**For `caregiver` registrations**:
```json
{
  "postcode": "SW1A 1AA",
  "selfEmployedAcknowledgment": true
}
```

**Server behaviour for each new field**:
- `postcode`: Validated against UK postcode format. Stored in the user record. For caregivers, also used to seed the PostGIS `location` point for proximity search.
- `undocumentedCareNeeds`: If `dateOfBirth` indicates age under 65 and this field is `false`, the server returns `400`. If `true`, stored as `care_needs_attested_at: timestamp` in the user record.
- `emergencyContact`: Stored in the `emergency_contacts` table linked by `userId`. Required for `care_receiver` `userType`; server returns `400` if absent.
- `selfEmployedAcknowledgment`: Must be `true`; if `false` or absent for `caregiver` `userType`, server returns `400`. Stored as `self_employed_acknowledged_at: timestamp` and `self_employed_acknowledged_ip: string` for legal audit trail.

---

#### ADD-AUTH-5: Create POST /auth/register/family as a Dedicated Endpoint

Closes: GAP-AUTH-008, GAP-AUTH-009

The dual-account family registration is sufficiently different from single-user registration to warrant its own endpoint path. The transactional nature (two accounts created atomically; one failure rolls back both) requires distinct server logic that cannot be cleanly implemented inside the existing `POST /auth/register` handler.

**Endpoint**: `POST /auth/register/family`
**Access**: Public

**Request Body**:
```json
{
  "familyMember": {
    "firstName": "John",
    "lastName": "Smith",
    "email": "john@example.com",
    "password": "SecurePassword123!",
    "phone": "+447700900000",
    "phoneCountryCode": "+44",
    "relationshipToCareReceiver": "son",
    "gdprConsent": true,
    "marketingConsent": false,
    "proxyConsent": true
  },
  "careReceiver": {
    "firstName": "Mary",
    "lastName": "Johnson",
    "dateOfBirth": "1950-06-20",
    "postcode": "SW1A 1AA",
    "phone": "+447700900001",
    "undocumentedCareNeeds": false
  },
  "emergencyContact": {
    "useFamilyMemberDetails": true,
    "name": null,
    "phone": null,
    "relationship": null
  }
}
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "familyMemberId": "uuid-family",
    "careReceiverId": "uuid-care-receiver",
    "proxyRelationshipId": "uuid-proxy-link",
    "phoneVerificationSent": true,
    "otpSentTo": "+447700900000"
  }
}
```

**Server behaviour**:
- Creates two user records atomically: family member (`userType: "family"`) and care receiver (`userType: "care_receiver"`)
- Creates a `proxy_relationships` record linking `familyMemberId` to `careReceiverId`
- Stores `proxyConsentAt: timestamp` and `proxyConsentIp: string` on the proxy relationship record for legal audit
- Sends OTP to the family member's phone only (the family member is the authenticated actor)
- Both accounts start with `status: "pending_phone_verification"`; phone verification is completed by the family member for their own account
- If either user creation fails (e.g., email already taken), the entire transaction rolls back and a clear error is returned

**Note**: The existing `POST /auth/register` endpoint is retained for `care_receiver` and `caregiver` `userType` values.

---

### 9.2 MEDIUM PRIORITY

#### ADD-AUTH-6: Add `retryAfterSeconds` to POST /auth/forgot-password 429 Response

Closes: GAP-AUTH-003

Add `retryAfterSeconds: number` to the 429 RATE_LIMIT_EXCEEDED response. Also set the standard `Retry-After` HTTP response header.

**Updated 429 Response**:
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many password reset requests",
    "retryAfterSeconds": 900
  }
}
```

The client converts `retryAfterSeconds` to a mm:ss countdown display.

---

#### ADD-AUTH-7: Add `otpSentAt` to GET /users/me Response

Closes: GAP-AUTH-004

Add `otpSentAt: ISO8601 string | null` to the `GET /users/me` response. This field is non-null when `accountStatus === "pending_phone_verification"` and is `null` at all other times.

**Addition to existing response**:
```json
{
  "otpSentAt": "2026-02-18T14:20:00Z"
}
```

The phone verification screen computes:
```
expiresAt     = otpSentAt + 600 seconds
timeRemaining = expiresAt - now()
```

If `timeRemaining <= 0` on page load, the code is already expired — display "Code expired" immediately rather than starting a misleading fresh 10-minute countdown.

---

*End of document*
