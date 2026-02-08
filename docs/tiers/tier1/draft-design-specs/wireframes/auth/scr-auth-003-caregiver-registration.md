# Caregiver Registration Wireframes (SCR-AUTH-003)

**Document Purpose**: ASCII wireframes and complete element inventory for Caregiver Registration (SCR-AUTH-003)

**Screen ID**: SCR-AUTH-003
**Screen Name**: Caregiver Registration
**User Role**: Unauthenticated visitors (professional caregivers)
**Route**: `/register/caregiver`
**R0/R1**: R0 (Supply-side critical)
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
8. [Compliance & GDPR](#8-compliance--gdpr)
9. [Design Notes](#9-design-notes)

---

## 1. Screen Purpose

### 1.1 Purpose Statement

The Caregiver Registration screen enables professional caregivers to create accounts to offer companionship services. This is the primary entry point for supply-side users.

**Key Functions**:
- Capture essential caregiver information (name, contact, location)
- Establish self-employed status acknowledgment (legal requirement)
- Set expectations: companionship services only (not regulated personal care)
- GDPR consent collection
- Create account with `pending_phone_verification` status
- Redirect to phone verification, then onboarding wizard

**Difference from Care Receiver Registration**:
- **Simpler form**: Fewer fields (no emergency contact, no age verification)
- **Self-employed status**: Required checkbox acknowledging contractor relationship
- **Next steps**: Redirect to onboarding wizard (SCR-CG-002) after phone verification
- **Commission rate**: Placeholder 15% shown (not editable at registration)

### 1.2 Entry Points

**From Public Pages**:
- SCR-PUB-001 (Homepage) → "Become a Caregiver" or "Register as Caregiver" button
- SCR-AUTH-001 (Care Receiver Registration) → "Register as a Caregiver" link
- SCR-AUTH-002 (Family Registration) → "Register as a Caregiver" link

**From Authentication**:
- SCR-AUTH-005 (Login) → "Don't have an account? Sign up" → "Register as a Caregiver"

### 1.3 Exit Points

**Successful Registration**:
- → SCR-AUTH-004 (Phone Verification) → SCR-CG-002 (Caregiver Onboarding)

**Alternative Paths**:
- "Already have an account? Log in" → SCR-AUTH-005 (Login)
- "Looking for care?" link → SCR-AUTH-001 (Care Receiver Registration)

---

## 2. Element Inventory

### 2.1 Content Blocks

#### Block 1: Page Header (Public Navigation)
- **Purpose**: Minimal navigation for unauthenticated users
- **Priority**: Secondary
- **Elements**:
  - Platform logo (left-aligned) → Clickable, returns to homepage
  - "Already have an account? Log in" link (right-aligned) → SCR-AUTH-005

#### Block 2: Form Header
- **Purpose**: Set context and expectations for caregivers
- **Priority**: Primary
- **Elements**:
  - H1: "Become a Caregiver"
  - Subtitle: "Join our community and provide companionship to those who need it"
  - Badge: "Companionship Services Only" (informational, blue)
  - Info banner (blue):
    - Icon: ℹ️
    - Message: "At Tier 1, caregivers offer companionship, light housework, shopping, and meal preparation. Personal care services are not available yet."

#### Block 3: Registration Form

##### Personal Information Section
- **Label**: "Your Details"
- **Fields**:

  - Full Name (text input, required)
    - Label: "Full name"
    - Placeholder: "e.g., Emma Wilson"
    - Validation: 2-100 characters
    - Error: "Please enter your full name (2-100 characters)"

  - Email Address (email input, required)
    - Label: "Email address"
    - Placeholder: "your.email@example.com"
    - Validation: Valid email format, unique
    - Error: "Please enter a valid email address"
    - Error (server): "This email is already registered. Please log in or use a different email."

  - Password (password input, required)
    - Label: "Password"
    - Placeholder: "Create a strong password"
    - Validation: 8+ characters, 1 uppercase, 1 number
    - Show/hide toggle button
    - Helper text: "At least 8 characters, including 1 uppercase letter and 1 number"

  - Phone Number (tel input, required)
    - Label: "Mobile number"
    - Placeholder: "07xxx xxxxxx"
    - Validation: UK mobile format
    - Helper text: "We'll send you a verification code"

##### Location Section
- **Label**: "Where do you work?"
- **Fields**:

  - Postcode (text input, required)
    - Label: "Postcode"
    - Placeholder: "SW1A 1AA"
    - Validation: UK postcode format
    - Helper text: "We'll show you care receivers in your area"

##### Employment Status Section
- **Label**: "Employment Status"
- **Helper text**: "Legal requirement: You must acknowledge your status as a self-employed professional"
- **Fields**:

  - Self-Employed Status Acknowledgment (checkbox, required)
    - Label: "I understand I am registering as a self-employed professional, not an employee"
    - Helper text: "You will be responsible for your own tax, National Insurance, and insurance. You set your own rates and availability."
    - Validation: Must be checked
    - Error: "You must acknowledge your self-employed status to continue"

  - Commission Rate Info (read-only text)
    - Label: "Platform commission"
    - Value: "15% of your hourly rate"
    - Helper text: "This covers payment processing, insurance, and platform services. You'll set your hourly rate during onboarding."
    - Style: Info box, blue background, not editable

##### Consent Section
- **Label**: "Terms and Consent"
- **Fields**:

  - Terms of Service Consent (checkbox, required)
    - Label: "I accept the [Terms of Service for Caregivers](link)"
    - Validation: Must be checked
    - Error: "You must accept the Terms of Service to create an account"

  - Privacy Policy Consent (checkbox, required)
    - Label: "I accept the [Privacy Policy](link)"
    - Validation: Must be checked
    - Error: "You must accept the Privacy Policy to create an account"

  - Marketing Consent (checkbox, optional)
    - Label: "I'd like to receive tips for caregivers and updates via email"
    - Helper text: "You can unsubscribe anytime"

#### Block 4: Form Actions
- **Purpose**: Submit or navigate away
- **Priority**: Primary
- **Elements**:
  - "Create Account" button (primary, full-width on mobile)
    - Type: Submit button
    - States: Default, Loading ("Creating account..."), Disabled
    - Action: POST /api/auth/register/caregiver

  - "Already have an account? Log in" link (centered below button)

#### Block 5: Alternative Registration Options
- **Purpose**: Guide users to correct registration flow
- **Priority**: Secondary
- **Elements**:
  - Divider: "OR" (centered)
  - "Looking for care? Register here" link → SCR-AUTH-001

#### Block 6: Footer (Public)
- **Purpose**: Legal compliance and support
- **Priority**: Tertiary
- **Elements**:
  - Footer links: Terms, Privacy, Safeguarding, Contact
  - Copyright notice

---

### 2.2 Interactive Elements

#### Primary Actions
1. **"Create Account" button**
   - Type: Primary submit button
   - Action: Validate form → POST to API → Redirect to SCR-AUTH-004
   - Keyboard: Focusable, Enter to submit
   - States: Default, Hover, Focus, Disabled, Loading

#### Secondary Actions
2. **Show/Hide Password toggle**
3. **Navigation links** (Log in, Register for care)

---

### 2.3 Validation Rules

| Field | Validation Rule | Error Message |
|-------|-----------------|---------------|
| Full Name | Required, 2-100 chars | "Please enter your full name (2-100 characters)" |
| Email | Required, valid email, unique | "Please enter a valid email address" / "This email is already registered" |
| Password | Required, 8+ chars, 1 uppercase, 1 number | "Password must be at least 8 characters with 1 uppercase letter and 1 number" |
| Phone | Required, UK mobile format | "Please enter a valid UK mobile number (e.g., 07123 456789)" |
| Postcode | Required, UK postcode format | "Please enter a valid UK postcode" |
| Self-Employed Status | Required, checked | "You must acknowledge your self-employed status to continue" |
| Terms Consent | Required, checked | "You must accept the Terms of Service" |
| Privacy Consent | Required, checked | "You must accept the Privacy Policy" |

---

## 3. ASCII Wireframes

### 3.1 Desktop Wireframe (1440px+)

#### Default State (Empty Form)

```
+------------------------------------------------------------------------------+
|  [LOGO]                                        Already have an account? Log in |
+------------------------------------------------------------------------------+
|                                                                              |
|                         H1: Become a Caregiver                               |
|            Join our community and provide companionship to those who need it |
|                      🔵 Companionship Services Only                          |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  | ℹ️  At Tier 1, caregivers offer companionship, light housework,        |  |
|  |     shopping, and meal preparation. Personal care services are not     |  |
|  |     available yet.                                                     |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  YOUR DETAILS                                                          |  |
|  |                                                                        |  |
|  |  Full name *                                                           |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | e.g., Emma Wilson                                                |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  Email address *                                                       |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | your.email@example.com                                           |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  Password *                                                            |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | Create a strong password                                   [👁️]  |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  At least 8 characters, including 1 uppercase letter and 1 number      |  |
|  |                                                                        |  |
|  |  Mobile number *                                                       |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | 07xxx xxxxxx                                                     |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  We'll send you a verification code                                    |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  WHERE DO YOU WORK?                                                    |  |
|  |                                                                        |  |
|  |  Postcode *                                                            |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | SW1A 1AA                                                         |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  We'll show you care receivers in your area                            |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  EMPLOYMENT STATUS                                                     |  |
|  |  Legal requirement: You must acknowledge your status as a              |  |
|  |  self-employed professional                                            |  |
|  |                                                                        |  |
|  |  [✓] I understand I am registering as a self-employed professional,    |  |
|  |      not an employee                                                   |  |
|  |      You will be responsible for your own tax, National Insurance,     |  |
|  |      and insurance. You set your own rates and availability.           |  |
|  |                                                                        |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | ℹ️  Platform commission: 15% of your hourly rate                 |  |  |
|  |  |                                                                  |  |  |
|  |  |    This covers payment processing, insurance, and platform       |  |  |
|  |  |    services. You'll set your hourly rate during onboarding.      |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  TERMS AND CONSENT                                                     |  |
|  |                                                                        |  |
|  |  [✓] I accept the Terms of Service for Caregivers                      |  |
|  |                                                                        |  |
|  |  [✓] I accept the Privacy Policy                                       |  |
|  |                                                                        |  |
|  |  [ ] I'd like to receive tips for caregivers and updates via email     |  |
|  |      You can unsubscribe anytime                                       |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|                                                                              |
|                      [ CREATE ACCOUNT ]                                      |
|                                                                              |
|                     Already have an account? Log in                          |
|                                                                              |
|                                                                              |
|                                   OR                                         |
|                                                                              |
|                       Looking for care? Register here                        |
|                                                                              |
+------------------------------------------------------------------------------+
| Terms of Service | Privacy Policy | Safeguarding Policy | Contact Us         |
| © 2026 Platform Name. All rights reserved.                                  |
+------------------------------------------------------------------------------+
```

---

#### Validation Error State

```
+------------------------------------------------------------------------------+
|  [LOGO]                                        Already have an account? Log in |
+------------------------------------------------------------------------------+
|                                                                              |
|  ⚠️  Please correct the errors below to continue                             |
|                                                                              |
|                         H1: Become a Caregiver                               |
|            Join our community and provide companionship to those who need it |
|                      🔵 Companionship Services Only                          |
|                                                                              |
|  [Info banner...]                                                            |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  YOUR DETAILS                                                          |  |
|  |                                                                        |  |
|  |  Full name *                                                           |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | Emma Wilson                                                  ✓   |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  Email address *                                                       |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | emma.wilson@example.com                                      ✓   |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  Password *                                                            |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | MyPass123                                                    ✓   |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  Mobile number *                                                       |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | 07123 456789                                                 ✓   |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  WHERE DO YOU WORK?                                                    |  |
|  |                                                                        |  |
|  |  Postcode *                                                            |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | invalid                                                          |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  ❌ Please enter a valid UK postcode                                   |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  EMPLOYMENT STATUS                                                     |  |
|  |                                                                        |  |
|  |  [ ] I understand I am registering as a self-employed professional,    |  |
|  |      not an employee                                                   |  |
|  |  ❌ You must acknowledge your self-employed status to continue         |  |
|  |                                                                        |  |
|  |  [Commission rate info box...]                                         |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  TERMS AND CONSENT                                                     |  |
|  |                                                                        |  |
|  |  [✓] I accept the Terms of Service for Caregivers                      |  |
|  |                                                                        |  |
|  |  [✓] I accept the Privacy Policy                                       |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|                      [ CREATE ACCOUNT ]                                      |
+------------------------------------------------------------------------------+
```

---

### 3.2 Mobile Wireframe (320px-767px)

```
+--------------------------------------+
|  [LOGO]                      Log in  |
+--------------------------------------+
|                                      |
|  H1: Become a Caregiver              |
|  Join our community and provide      |
|  companionship to those who need it  |
|                                      |
|  🔵 Companionship Services Only      |
|                                      |
|  +--------------------------------+  |
|  | ℹ️  At Tier 1, caregivers offer |  |
|  |    companionship, light         |  |
|  |    housework, shopping, and     |  |
|  |    meal preparation.            |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  YOUR DETAILS                  |  |
|  |                                |  |
|  |  Full name *                   |  |
|  |  +--------------------------+  |  |
|  |  | e.g., Emma Wilson        |  |  |
|  |  +--------------------------+  |  |
|  |                                |  |
|  |  Email address *               |  |
|  |  +--------------------------+  |  |
|  |  | your.email@example.com   |  |  |
|  |  +--------------------------+  |  |
|  |                                |  |
|  |  Password *                    |  |
|  |  +--------------------------+  |  |
|  |  | Create password    [👁️]  |  |  |
|  |  +--------------------------+  |  |
|  |  At least 8 characters, 1      |  |
|  |  uppercase, 1 number           |  |
|  |                                |  |
|  |  Mobile number *               |  |
|  |  +--------------------------+  |  |
|  |  | 07xxx xxxxxx             |  |  |
|  |  +--------------------------+  |  |
|  |  We'll send a code             |  |
|  |                                |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  WHERE DO YOU WORK?            |  |
|  |                                |  |
|  |  Postcode *                    |  |
|  |  +--------------------------+  |  |
|  |  | SW1A 1AA                 |  |  |
|  |  +--------------------------+  |  |
|  |  We'll show you care receivers |  |
|  |  in your area                  |  |
|  |                                |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  EMPLOYMENT STATUS             |  |
|  |  Legal requirement             |  |
|  |                                |  |
|  |  [✓] I understand I am         |  |
|  |      registering as a          |  |
|  |      self-employed             |  |
|  |      professional, not an      |  |
|  |      employee                  |  |
|  |      You'll be responsible     |  |
|  |      for tax, NI, insurance.   |  |
|  |                                |  |
|  |  +--------------------------+  |  |
|  |  | ℹ️  Platform commission:  |  |  |
|  |  |    15% of your hourly    |  |  |
|  |  |    rate                  |  |  |
|  |  |                          |  |  |
|  |  |    You'll set your rate  |  |  |
|  |  |    during onboarding.    |  |  |
|  |  +--------------------------+  |  |
|  |                                |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  TERMS AND CONSENT             |  |
|  |                                |  |
|  |  [✓] I accept the Terms of     |  |
|  |      Service for Caregivers    |  |
|  |                                |  |
|  |  [✓] I accept the Privacy      |  |
|  |      Policy                    |  |
|  |                                |  |
|  |  [ ] Receive tips and updates  |  |
|  |      via email (optional)      |  |
|  |                                |  |
|  +--------------------------------+  |
|                                      |
|                                      |
|  +--------------------------------+  |
|  |    CREATE ACCOUNT              |  |
|  +--------------------------------+  |
|                                      |
|  Already have an account? Log in     |
|                                      |
|  ────────────── OR ──────────────    |
|                                      |
|  Looking for care? Register here     |
|                                      |
+--------------------------------------+
| Terms | Privacy | Safeguarding       |
| © 2026 Platform Name                 |
+--------------------------------------+
```

---

## 4. Responsive Behavior

### 4.1 Breakpoints

| Viewport | Layout Changes | Priority |
|----------|----------------|----------|
| **Mobile** (320px-767px) | Single column, full-width, stacked | Essential fields only |
| **Tablet** (768px-1439px) | Single column, max-width 600px centered | Full form |
| **Desktop** (1440px+) | Centered form (max 600px) | Full form |

### 4.2 Touch Target Sizes

**Mobile Requirements**:
- Input fields: **56px height**
- Button: **56px height**
- Checkboxes: **24x24px** with **48x48px** touch target

---

## 5. UI States

### 5.1 Loading State

```
+----------------------------------------------------------------------+
|                    [ ⏳ Creating account... ]                         |
+----------------------------------------------------------------------+
```

**Loading Indicators**:
- Button shows spinner + "Creating account..." text
- All fields disabled

---

### 5.2 Error States

#### Self-Employed Status Not Acknowledged

```
[ ] I understand I am registering as a self-employed professional,
    not an employee
❌ You must acknowledge your self-employed status to continue
```

#### Email Already Registered

```
+----------------------------------------------------------------------+
|  ⚠️  This email is already registered                                |
|     Please log in or use a different email address.                 |
|     [Log In] [Try Different Email]                                  |
+----------------------------------------------------------------------+
```

---

## 6. Accessibility Requirements

### 6.1 WCAG 2.1 AA Compliance

**All requirements from SCR-AUTH-001 apply**

#### Additional Requirements

- **Commission Rate Info Box**:
  - `role="note"` for informational content
  - Blue background with 4.5:1 contrast ratio on text
  - Not interactive (read-only)

- **Self-Employed Checkbox**:
  - Critical checkbox, clearly labeled
  - `aria-required="true"`
  - Error announced if unchecked on submit

---

### 6.2 Focus Order

**Tab Order**:
1. Skip to main content
2. Logo
3. Login link
4. Full name
5. Email
6. Password
7. Password toggle
8. Mobile number
9. Postcode
10. Self-employed status checkbox
11. Terms checkbox
12. Privacy checkbox
13. Marketing checkbox
14. Create Account button
15. Footer links

---

### 6.3 Screen Reader Announcements

**Page Load**:
- "Become a caregiver page. Join our community and provide companionship to those who need it. Companionship services only."

**Info Banner**:
- "Information: At Tier 1, caregivers offer companionship, light housework, shopping, and meal preparation. Personal care services are not available yet."

**Self-Employed Checkbox Focus**:
- "I understand I am registering as a self-employed professional, not an employee, required checkbox, unchecked. You will be responsible for your own tax, National Insurance, and insurance. You set your own rates and availability."

**Commission Rate Info Box**:
- "Platform commission: 15% of your hourly rate. This covers payment processing, insurance, and platform services. You'll set your hourly rate during onboarding."

---

## 7. Navigation & Interactions

### 7.1 Primary User Flow

**Happy Path: Successful Registration**

1. User lands on `/register/caregiver`
2. User fills in personal details
3. User enters postcode (work location)
4. User checks self-employed status checkbox
5. User checks Terms and Privacy checkboxes
6. User clicks "Create Account" button
7. Client-side validation passes
8. Form submits: `POST /api/auth/register/caregiver`
9. Server creates caregiver account with `status: pending_phone_verification`
10. Server sends SMS OTP to caregiver's phone
11. Redirect to `/verify/phone` (SCR-AUTH-004)
12. After phone verification → Redirect to `/caregiver/onboarding` (SCR-CG-002)

**Estimated Time**: 2-3 minutes

---

### 7.2 Alternative Flows

#### Flow 2: User Wants Care (Not Offering Care)

1. User lands on `/register/caregiver`
2. User realizes they need care, not offering it
3. User clicks "Looking for care? Register here"
4. Navigate to `/register/care-receiver` (SCR-AUTH-001)

#### Flow 3: User Already Has Account

1. User lands on `/register/caregiver`
2. User clicks "Already have an account? Log in"
3. Navigate to `/login` (SCR-AUTH-005)

---

## 8. Compliance & GDPR

### 8.1 Self-Employed Status Acknowledgment

**Legal Requirement**: Platform operates as Introduction Agency (not employer)

**Implementation**:
- **Attestation checkbox**: "I understand I am registering as a self-employed professional, not an employee"
- **Helper text**: Explains tax, NI, insurance responsibilities
- **Audit trail**: Store timestamp of acknowledgment + IP address
- **Legal protection**: Prevents employment status disputes

**IR35 Consideration**:
- Platform does not control caregiver hours, rates, or methods
- Caregivers set own rates and availability
- Platform facilitates introductions only
- Self-employed status consistent with IR35 guidelines

---

### 8.2 Commission Rate Transparency

**GDPR Transparency Requirement**: Clear about fees before registration

**Implementation**:
- **Visible during registration**: 15% commission rate shown
- **Read-only info box**: Blue background, not editable
- **Explanation**: "This covers payment processing, insurance, and platform services"
- **Full details in Terms**: Link to Terms of Service for Caregivers

**Note**: Placeholder 15% rate shown. Actual rate may vary (see product spec).

---

### 8.3 GDPR Consent

**Same as SCR-AUTH-001**:
- Terms of Service (required) - caregiver-specific version
- Privacy Policy (required)
- Marketing emails (optional)

---

## 9. Design Notes

### 9.1 Design Principles Applied

**1. Simplicity**
- Fewer fields than care receiver registration (no emergency contact, no age verification)
- Clear sections: Your Details, Location, Employment Status, Consent

**2. Transparency**
- Commission rate shown upfront (15%)
- Self-employed status clearly explained
- Service scope badge: "Companionship Services Only"

**3. Trust-Building**
- Info banner explains what caregivers can offer at Tier 1
- Clear about next steps: "You'll set your hourly rate during onboarding"
- Professional tone (not informal)

**4. Legal Compliance**
- Self-employed status acknowledgment (critical for tax/employment law)
- Commission transparency (GDPR requirement)
- Caregiver-specific Terms of Service

---

### 9.2 Content Hierarchy

**Visual Hierarchy**:
1. **H1**: "Become a Caregiver"
2. **Info Banner**: Blue, explains service scope
3. **Section Labels**: YOUR DETAILS, WHERE DO YOU WORK?, EMPLOYMENT STATUS (uppercase, bold)
4. **Commission Rate Info Box**: Blue background, prominent
5. **Self-Employed Checkbox**: Critical importance, bold label

---

### 9.3 Component Reuse

**Shared Components**:
- Header (minimal public header)
- Footer (public footer)
- Button (primary variant)
- Input Field (text, email, password, tel)
- Checkbox (with helper text)
- Alert Banner (info variant for service scope explanation)
- Info Box (new: commission rate display)

---

## 10. Cross-References

### Source Documents

**Route Map**:
- `/docs/product/tier1-route-map.md` - SCR-AUTH-003 definition (lines 151, 261-272)

**Screen Inventory**:
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` - SCR-AUTH-003 detailed spec (lines 154-197)

**User Flows**:
- `/docs/tiers/tier1/draft-design-specs/user-flows/caregiver-onboarding.md` - Registration entry point

**Compliance**:
- `/docs/tiers/tier1/compliance.md` - Self-employed status, commission transparency

**Related Screens**:
- SCR-AUTH-001: Care Receiver Registration (alternative path)
- SCR-AUTH-004: Phone Verification (exit point)
- SCR-AUTH-005: Login (alternative path)
- SCR-CG-002: Caregiver Onboarding (final exit point after phone verification)

---

## 11. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-08 | UX Designer | Initial wireframes and element inventory for Figma handoff |

---

**END OF DOCUMENT**

**Status**: ✅ READY FOR FIGMA HANDOFF
