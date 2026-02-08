# Family Member Registration Wireframes (SCR-AUTH-002)

**Document Purpose**: ASCII wireframes and complete element inventory for Family Member Registration (SCR-AUTH-002)

**Screen ID**: SCR-AUTH-002
**Screen Name**: Family Member Registration
**User Role**: Unauthenticated visitors (family members acting as proxy)
**Route**: `/register/family`
**R0/R1**: R0 (Safeguarding-critical - proxy users essential)
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

The Family Member Registration screen enables family members to register **on behalf of** a care receiver (vulnerable adult proxy access). This is critical for elderly users who may not be comfortable with technology or need assistance managing care.

**Key Functions**:
- Capture family member details (proxy user account)
- Capture care receiver details (the person receiving care)
- Document relationship between family member and care receiver
- Obtain proxy consent attestation (family member confirms care receiver has consented)
- GDPR consent collection for both parties
- Create two linked accounts: family member (proxy) + care receiver (principal)

**Difference from SCR-AUTH-001**:
- **SCR-AUTH-001**: Care receiver registers for themselves
- **SCR-AUTH-002**: Family member registers on behalf of care receiver
- **Result**: Two accounts created, family member has proxy access to care receiver's account

### 1.2 Entry Points

**From Public Pages**:
- SCR-PUB-001 (Homepage) → "Register on behalf of family member" link
- SCR-AUTH-001 (Care Receiver Registration) → "Register on behalf of a family member" link

**From Authentication**:
- SCR-AUTH-005 (Login) → "Don't have an account? Sign up" → "Register on behalf of family member"

### 1.3 Exit Points

**Successful Registration**:
- → SCR-AUTH-004 (Phone Verification)

**Alternative Paths**:
- "Already have an account? Log in" → SCR-AUTH-005 (Login)
- "Register for yourself" link → SCR-AUTH-001 (Care Receiver Registration)
- "Register as a Caregiver" link → SCR-AUTH-003 (Caregiver Registration)

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
- **Purpose**: Set context and explain proxy registration
- **Priority**: Primary
- **Elements**:
  - H1: "Register on Behalf of a Family Member"
  - Subtitle: "Create an account to manage care for your loved one"
  - Badge: "Companionship Services Only" (informational)
  - Info banner (blue):
    - Icon: ℹ️
    - Message: "You'll create an account for yourself and link it to your family member's care needs"

#### Block 3: Registration Form

##### Section 1: Your Details (Family Member)
- **Label**: "Your Details (Family Member)"
- **Helper text**: "This is your account that you'll use to log in"
- **Fields**:

  - Your Full Name (text input, required)
    - Label: "Your full name"
    - Placeholder: "e.g., John Smith"
    - Validation: 2-100 characters
    - Error: "Please enter your full name (2-100 characters)"

  - Your Email Address (email input, required)
    - Label: "Your email address"
    - Placeholder: "your.email@example.com"
    - Validation: Valid email format, unique
    - Error: "Please enter a valid email address"
    - Error (server): "This email is already registered"

  - Your Password (password input, required)
    - Label: "Create a password"
    - Placeholder: "Create a strong password"
    - Validation: 8+ characters, 1 uppercase, 1 number
    - Show/hide toggle button
    - Helper text: "At least 8 characters, including 1 uppercase letter and 1 number"

  - Your Phone Number (tel input, required)
    - Label: "Your mobile number"
    - Placeholder: "07xxx xxxxxx"
    - Validation: UK mobile format
    - Helper text: "We'll send you a verification code"

  - Relationship to Care Receiver (dropdown, required)
    - Label: "Your relationship to the care receiver"
    - Options: "Daughter", "Son", "Spouse/Partner", "Sibling", "Grandchild", "Other relative", "Friend", "Professional carer"
    - Error: "Please select your relationship"

##### Section 2: Care Receiver Details
- **Label**: "Care Receiver Details"
- **Helper text**: "Details of the person who will receive care"
- **Fields**:

  - Care Receiver Full Name (text input, required)
    - Label: "Care receiver's full name"
    - Placeholder: "e.g., Mary Johnson"
    - Validation: 2-100 characters
    - Error: "Please enter the care receiver's full name"

  - Care Receiver Date of Birth (date input, required)
    - Label: "Care receiver's date of birth"
    - Placeholder: "DD/MM/YYYY"
    - Validation: Must be 65+ OR "under 65 with care needs" checkbox checked
    - Error: "Care receiver must be 65 or older, or have documented care needs"

  - Care Needs Override (checkbox, optional)
    - Label: "The care receiver is under 65 but has documented care needs"
    - Visibility: Only shown if DOB indicates <65

  - Care Receiver Postcode (text input, required)
    - Label: "Care receiver's postcode"
    - Placeholder: "SW1A 1AA"
    - Validation: UK postcode format
    - Helper text: "We'll show caregivers in this area"
    - Error: "Please enter a valid UK postcode"

  - Care Receiver Phone Number (tel input, optional)
    - Label: "Care receiver's phone number (optional)"
    - Placeholder: "07xxx xxxxxx or landline"
    - Validation: UK phone format (if entered)
    - Helper text: "If different from yours"

##### Section 3: Emergency Contact
- **Label**: "Emergency Contact"
- **Helper text**: "This person will be contacted in case of emergency during care visits"
- **Fields**:

  - Use Your Details (radio button, option 1)
    - Label: "Use my details as the emergency contact"
    - Default: Selected
    - Action: Auto-populate emergency contact fields with family member's details

  - Use Different Contact (radio button, option 2)
    - Label: "Use a different emergency contact"
    - Action: Show emergency contact fields below

  - Emergency Contact Name (text input, conditionally required)
    - Label: "Emergency contact name"
    - Placeholder: "e.g., Sarah Williams"
    - Visibility: Only shown if "Use different contact" selected
    - Validation: Required if visible

  - Emergency Contact Phone (tel input, conditionally required)
    - Label: "Emergency contact phone"
    - Placeholder: "07xxx xxxxxx"
    - Visibility: Only shown if "Use different contact" selected
    - Validation: Required if visible

  - Emergency Contact Relationship (dropdown, conditionally required)
    - Label: "Relationship to care receiver"
    - Options: Same as family member relationship dropdown
    - Visibility: Only shown if "Use different contact" selected

##### Section 4: Consent
- **Label**: "Consent and Terms"
- **Fields**:

  - Proxy Consent Attestation (checkbox, required)
    - Label: "I confirm I have the care receiver's consent to register on their behalf"
    - Helper text: "You are confirming that the care receiver has agreed to you managing their care through this platform"
    - Validation: Must be checked
    - Error: "You must confirm you have the care receiver's consent"

  - Terms of Service Consent (checkbox, required)
    - Label: "I accept the [Terms of Service](link)"
    - Validation: Must be checked

  - Privacy Policy Consent (checkbox, required)
    - Label: "I accept the [Privacy Policy](link) on behalf of myself and the care receiver"
    - Helper text: "This covers both your account and the care receiver's account"
    - Validation: Must be checked

  - Marketing Consent (checkbox, optional)
    - Label: "I'd like to receive helpful tips and updates about care services via email"
    - Helper text: "You can unsubscribe anytime"

#### Block 4: Form Actions
- **Purpose**: Submit or navigate away
- **Priority**: Primary
- **Elements**:
  - "Create Accounts" button (primary, full-width on mobile)
    - Type: Submit button
    - States: Default, Loading ("Creating accounts..."), Disabled
    - Action: POST /api/auth/register/family

  - "Already have an account? Log in" link (centered below button)

#### Block 5: Alternative Registration Options
- **Purpose**: Guide users to correct registration flow
- **Priority**: Secondary
- **Elements**:
  - Divider: "OR" (centered)
  - "Register for yourself" link → SCR-AUTH-001
  - "Register as a Caregiver" link → SCR-AUTH-003

#### Block 6: Footer (Public)
- **Purpose**: Legal compliance and support
- **Priority**: Tertiary
- **Elements**:
  - Footer links: Terms, Privacy, Safeguarding, Contact
  - Copyright notice

---

### 2.2 Interactive Elements

#### Primary Actions
1. **"Create Accounts" button**
   - Type: Primary submit button
   - Action: Validate form → POST to API → Create two linked accounts → Redirect to SCR-AUTH-004
   - Keyboard: Focusable, Enter to submit
   - States: Default, Hover, Focus, Disabled, Loading

#### Secondary Actions
2. **Show/Hide Password toggle**
3. **Emergency contact radio buttons** (toggle field visibility)
4. **Navigation links** (Log in, Register for yourself, Register as Caregiver)

---

### 2.3 Validation Rules

| Field | Validation Rule | Error Message |
|-------|-----------------|---------------|
| Your Full Name | Required, 2-100 chars | "Please enter your full name (2-100 characters)" |
| Your Email | Required, valid email, unique | "Please enter a valid email address" / "This email is already registered" |
| Your Password | Required, 8+ chars, 1 uppercase, 1 number | "Password must be at least 8 characters with 1 uppercase letter and 1 number" |
| Your Phone | Required, UK mobile format | "Please enter a valid UK mobile number (e.g., 07123 456789)" |
| Relationship | Required, selected | "Please select your relationship" |
| Care Receiver Name | Required, 2-100 chars | "Please enter the care receiver's full name" |
| Care Receiver DOB | Required, 65+ OR care needs checked | "Care receiver must be 65 or older, or have documented care needs" |
| Care Receiver Postcode | Required, UK postcode format | "Please enter a valid UK postcode" |
| Proxy Consent | Required, checked | "You must confirm you have the care receiver's consent" |
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
|                H1: Register on Behalf of a Family Member                     |
|                  Create an account to manage care for your loved one         |
|                      🔵 Companionship Services Only                          |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  | ℹ️  You'll create an account for yourself and link it to your family   |  |
|  |     member's care needs                                                |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  YOUR DETAILS (FAMILY MEMBER)                                          |  |
|  |  This is your account that you'll use to log in                        |  |
|  |                                                                        |  |
|  |  Your full name *                                                      |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | e.g., John Smith                                                 |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  Your email address *                                                  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | your.email@example.com                                           |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  Create a password *                                                   |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | Create a strong password                                   [👁️]  |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  At least 8 characters, including 1 uppercase letter and 1 number      |  |
|  |                                                                        |  |
|  |  Your mobile number *                                                  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | 07xxx xxxxxx                                                     |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  We'll send you a verification code                                    |  |
|  |                                                                        |  |
|  |  Your relationship to the care receiver *                              |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | Select relationship                                          [▼] |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  CARE RECEIVER DETAILS                                                 |  |
|  |  Details of the person who will receive care                           |  |
|  |                                                                        |  |
|  |  Care receiver's full name *                                           |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | e.g., Mary Johnson                                               |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  Care receiver's date of birth *                                       |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | DD/MM/YYYY                                                       |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  [ ] The care receiver is under 65 but has documented care needs       |  |
|  |                                                                        |  |
|  |  Care receiver's postcode *                                            |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | SW1A 1AA                                                         |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  We'll show caregivers in this area                                    |  |
|  |                                                                        |  |
|  |  Care receiver's phone number (optional)                               |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | 07xxx xxxxxx or landline                                         |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  If different from yours                                               |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  EMERGENCY CONTACT                                                     |  |
|  |  This person will be contacted in case of emergency during care visits |  |
|  |                                                                        |  |
|  |  (•) Use my details as the emergency contact                           |  |
|  |                                                                        |  |
|  |  ( ) Use a different emergency contact                                 |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  CONSENT AND TERMS                                                     |  |
|  |                                                                        |  |
|  |  [✓] I confirm I have the care receiver's consent to register on       |  |
|  |      their behalf                                                      |  |
|  |      You are confirming that the care receiver has agreed to you       |  |
|  |      managing their care through this platform                         |  |
|  |                                                                        |  |
|  |  [✓] I accept the Terms of Service                                     |  |
|  |                                                                        |  |
|  |  [✓] I accept the Privacy Policy on behalf of myself and the care      |  |
|  |      receiver                                                          |  |
|  |      This covers both your account and the care receiver's account     |  |
|  |                                                                        |  |
|  |  [ ] I'd like to receive helpful tips and updates via email            |  |
|  |      You can unsubscribe anytime                                       |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|                                                                              |
|                      [ CREATE ACCOUNTS ]                                     |
|                                                                              |
|                     Already have an account? Log in                          |
|                                                                              |
|                                                                              |
|                                   OR                                         |
|                                                                              |
|                          Register for yourself                               |
|                         Register as a Caregiver                              |
|                                                                              |
+------------------------------------------------------------------------------+
| Terms of Service | Privacy Policy | Safeguarding Policy | Contact Us         |
| © 2026 Platform Name. All rights reserved.                                  |
+------------------------------------------------------------------------------+
```

---

#### Alternative Emergency Contact State

```
[Showing only Emergency Contact section when "Use different contact" is selected]

|  +------------------------------------------------------------------------+  |
|  |  EMERGENCY CONTACT                                                     |  |
|  |  This person will be contacted in case of emergency during care visits |  |
|  |                                                                        |  |
|  |  ( ) Use my details as the emergency contact                           |  |
|  |                                                                        |  |
|  |  (•) Use a different emergency contact                                 |  |
|  |                                                                        |  |
|  |  Emergency contact name *                                              |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | e.g., Sarah Williams                                             |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  Emergency contact phone *                                             |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | 07xxx xxxxxx                                                     |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  Relationship to care receiver *                                       |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | Select relationship                                          [▼] |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
```

---

### 3.2 Mobile Wireframe (320px-767px)

```
+--------------------------------------+
|  [LOGO]                      Log in  |
+--------------------------------------+
|                                      |
|  H1: Register on Behalf of           |
|      a Family Member                 |
|  Create an account to manage         |
|  care for your loved one             |
|                                      |
|  🔵 Companionship Services Only      |
|                                      |
|  +--------------------------------+  |
|  | ℹ️  You'll create accounts for  |  |
|  |    yourself and your family    |  |
|  |    member                      |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  YOUR DETAILS                  |  |
|  |  (FAMILY MEMBER)               |  |
|  |  This is your login account    |  |
|  |                                |  |
|  |  Your full name *              |  |
|  |  +--------------------------+  |  |
|  |  | e.g., John Smith         |  |  |
|  |  +--------------------------+  |  |
|  |                                |  |
|  |  Your email *                  |  |
|  |  +--------------------------+  |  |
|  |  | your.email@example.com   |  |  |
|  |  +--------------------------+  |  |
|  |                                |  |
|  |  Create a password *           |  |
|  |  +--------------------------+  |  |
|  |  | Create password    [👁️]  |  |  |
|  |  +--------------------------+  |  |
|  |  At least 8 characters, 1      |  |
|  |  uppercase, 1 number           |  |
|  |                                |  |
|  |  Your mobile number *          |  |
|  |  +--------------------------+  |  |
|  |  | 07xxx xxxxxx             |  |  |
|  |  +--------------------------+  |  |
|  |  We'll send a code             |  |
|  |                                |  |
|  |  Your relationship *           |  |
|  |  +--------------------------+  |  |
|  |  | Select              [▼]  |  |  |
|  |  +--------------------------+  |  |
|  |                                |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  CARE RECEIVER DETAILS         |  |
|  |  Person receiving care         |  |
|  |                                |  |
|  |  Care receiver's name *        |  |
|  |  +--------------------------+  |  |
|  |  | e.g., Mary Johnson       |  |  |
|  |  +--------------------------+  |  |
|  |                                |  |
|  |  Date of birth *               |  |
|  |  +--------------------------+  |  |
|  |  | DD/MM/YYYY               |  |  |
|  |  +--------------------------+  |  |
|  |                                |  |
|  |  [ ] Under 65 with care needs  |  |
|  |                                |  |
|  |  Postcode *                    |  |
|  |  +--------------------------+  |  |
|  |  | SW1A 1AA                 |  |  |
|  |  +--------------------------+  |  |
|  |  We'll show local caregivers   |  |
|  |                                |  |
|  |  Phone (optional)              |  |
|  |  +--------------------------+  |  |
|  |  | 07xxx xxxxxx             |  |  |
|  |  +--------------------------+  |  |
|  |  If different from yours       |  |
|  |                                |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  EMERGENCY CONTACT             |  |
|  |  In case of emergency          |  |
|  |                                |  |
|  |  (•) Use my details            |  |
|  |                                |  |
|  |  ( ) Use different contact     |  |
|  |                                |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  CONSENT AND TERMS             |  |
|  |                                |  |
|  |  [✓] I have the care           |  |
|  |      receiver's consent        |  |
|  |      You're confirming they    |  |
|  |      agreed to this            |  |
|  |                                |  |
|  |  [✓] I accept the Terms of     |  |
|  |      Service                   |  |
|  |                                |  |
|  |  [✓] I accept the Privacy      |  |
|  |      Policy on behalf of both  |  |
|  |      accounts                  |  |
|  |                                |  |
|  |  [ ] Receive tips and updates  |  |
|  |      via email (optional)      |  |
|  |                                |  |
|  +--------------------------------+  |
|                                      |
|                                      |
|  +--------------------------------+  |
|  |    CREATE ACCOUNTS             |  |
|  +--------------------------------+  |
|                                      |
|  Already have an account? Log in     |
|                                      |
|  ────────────── OR ──────────────    |
|                                      |
|  Register for yourself               |
|  Register as a Caregiver             |
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
| **Mobile** (320px-767px) | Single column, full-width inputs, stacked sections | Essential fields only |
| **Tablet** (768px-1439px) | Single column, max-width 600px centered | Full form |
| **Desktop** (1440px+) | Centered form (max 600px), possible two-column for emergency contact | Full form |

### 4.2 Touch Target Sizes

**Mobile Requirements**:
- Input fields: **56px height minimum**
- Buttons: **56px height minimum**
- Radio buttons: **24x24px** with **48x48px** touch target
- Checkboxes: **24x24px** with **48x48px** touch target

---

## 5. UI States

### 5.1 Loading State

```
+----------------------------------------------------------------------+
|                    [ ⏳ Creating accounts... ]                        |
+----------------------------------------------------------------------+
```

**Loading Indicators**:
- Button shows spinner + "Creating accounts..." text
- All fields disabled
- Timeout: 30 seconds

---

### 5.2 Error States

#### Proxy Consent Not Checked

```
[✓] I accept the Terms of Service

[ ] I accept the Privacy Policy on behalf of myself and the care receiver
    This covers both your account and the care receiver's account

[ ] I confirm I have the care receiver's consent to register on their behalf
❌ You must confirm you have the care receiver's consent
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

### 5.3 Conditional Field Display

**Emergency Contact Toggle**:

```
WHEN "Use my details" is selected:
  - Hide: Emergency contact name, phone, relationship fields
  - Auto-populate backend: Use family member's name + phone as emergency contact

WHEN "Use different contact" is selected:
  - Show: Emergency contact name, phone, relationship fields
  - Validate: All three fields required
```

---

## 6. Accessibility Requirements

### 6.1 WCAG 2.1 AA Compliance

**All requirements from SCR-AUTH-001 apply, plus**:

#### Additional Requirements

- **Radio Button Groups**:
  - `role="radiogroup"` for emergency contact options
  - `aria-labelledby` linking to section label
  - Arrow keys navigate between options
  - Space selects option

- **Conditional Fields**:
  - Use `aria-hidden="true"` when emergency contact fields hidden
  - Announce when fields appear: "Emergency contact fields now visible"

- **Proxy Consent**:
  - Critical checkbox must be clearly labeled
  - `aria-required="true"`
  - Error announcement: "Error: You must confirm you have the care receiver's consent"

---

### 6.2 Focus Order

**Tab Order**:
1. Skip to main content
2. Logo
3. Login link
4. Your full name
5. Your email
6. Your password
7. Password toggle
8. Your mobile number
9. Relationship dropdown
10. Care receiver's name
11. Care receiver's DOB
12. Care needs checkbox (if visible)
13. Care receiver's postcode
14. Care receiver's phone (optional)
15. Emergency contact radio 1 (Use my details)
16. Emergency contact radio 2 (Use different contact)
17. Emergency contact name (if radio 2 selected)
18. Emergency contact phone (if radio 2 selected)
19. Emergency contact relationship (if radio 2 selected)
20. Proxy consent checkbox
21. Terms checkbox
22. Privacy checkbox
23. Marketing checkbox
24. Create Accounts button
25. Footer links

---

### 6.3 Screen Reader Announcements

**Page Load**:
- "Register on behalf of a family member page. You'll create an account for yourself and link it to your family member's care needs."

**Section Focus**:
- "Your details, family member. This is your account that you'll use to log in."
- "Care receiver details. Details of the person who will receive care."

**Proxy Consent Focus**:
- "I confirm I have the care receiver's consent to register on their behalf, required checkbox, unchecked. You are confirming that the care receiver has agreed to you managing their care through this platform."

**Radio Button Selection**:
- "Use my details as the emergency contact, selected"
- "Use a different emergency contact, not selected"
- When toggling: "Emergency contact fields now visible" / "Emergency contact fields hidden"

---

## 7. Navigation & Interactions

### 7.1 Primary User Flow

**Happy Path: Successful Proxy Registration**

1. User lands on `/register/family`
2. User fills in their own details (family member section)
3. User selects relationship to care receiver
4. User fills in care receiver's details
5. User selects emergency contact option (default: use my details)
6. User checks all three consent checkboxes (proxy consent, terms, privacy)
7. User clicks "Create Accounts" button
8. Client-side validation passes
9. Form submits: `POST /api/auth/register/family`
10. Server creates two linked accounts:
    - Family member account (proxy, `status: pending_phone_verification`)
    - Care receiver account (principal, `proxy_user_id: family_member.id`)
11. Server sends SMS OTP to family member's phone
12. Redirect to `/verify/phone` (SCR-AUTH-004)

**Result**:
- Family member logs in with their own credentials
- Family member has proxy access to care receiver's bookings, messages, profile
- Caregivers see care receiver's name (not family member) on bookings
- Family member receives all notifications

---

### 7.2 Alternative Flows

#### Flow 2: User Wants to Register for Themselves

1. User lands on `/register/family`
2. User realizes this is proxy registration
3. User clicks "Register for yourself"
4. Navigate to `/register/care-receiver` (SCR-AUTH-001)

#### Flow 3: Different Emergency Contact

1. User fills form
2. User selects "Use a different emergency contact" radio button
3. Emergency contact fields appear (name, phone, relationship)
4. User fills emergency contact fields
5. Form submission includes separate emergency contact

---

### 7.3 Interaction Patterns

#### Emergency Contact Radio Toggle

```javascript
WHEN radio "Use my details" is selected:
  - Hide emergency contact fields (slide up animation)
  - Remove "required" validation from hidden fields
  - Auto-populate backend: emergency_contact = family_member

WHEN radio "Use different contact" is selected:
  - Show emergency contact fields (slide down animation)
  - Add "required" validation to fields
  - Clear auto-populated values
```

---

## 8. Compliance & GDPR

### 8.1 Proxy Consent (Critical)

**Legal Requirement**: Family member must have care receiver's consent to act as proxy

**Implementation**:

- **Attestation checkbox**: "I confirm I have the care receiver's consent to register on their behalf"
- **Helper text**: Explains what consent means
- **No verification**: Self-attestation only (no documentary evidence required at registration)
- **Audit trail**: Store timestamp of attestation + IP address
- **Safeguarding**: Admins can review proxy relationships in case of disputes

**Mental Capacity Consideration**:
- Platform assumes care receiver has mental capacity to consent
- If care receiver lacks capacity, family member should have Lasting Power of Attorney (LPA)
- LPA documentation not required at registration (may be requested by admin if dispute arises)

---

### 8.2 Dual Consent (GDPR)

**Privacy Policy Consent**:
- Family member consents on behalf of **both** accounts
- Label: "I accept the Privacy Policy on behalf of myself and the care receiver"
- Helper text: "This covers both your account and the care receiver's account"
- Stored separately for each account with timestamp

**Data Controller**:
- Platform is data controller for both accounts
- Family member is data processor (acting on behalf of care receiver)
- Privacy Policy explains proxy relationship

---

### 8.3 Data Processing

**Family Member Data**:
- Name, email, phone, relationship
- Stored in `users` table with `role: family_member`

**Care Receiver Data**:
- Name, DOB, postcode, phone (optional)
- Stored in `users` table with `role: care_receiver`, `proxy_user_id: family_member.id`

**Linked Accounts**:
- `care_receiver.proxy_user_id` → `family_member.id`
- Family member can manage care receiver's bookings, messages, profile
- Care receiver's name shown to caregivers (not family member's name)

---

## 9. Design Notes

### 9.1 Design Principles Applied

**1. Clarity & Guidance**
- Info banner explains what happens: "You'll create accounts for yourself and your family member"
- Clear section labels distinguish "Your Details" from "Care Receiver Details"
- Helper text explains each section's purpose

**2. Proxy Transparency**
- Prominent attestation checkbox for consent
- Explains proxy relationship throughout
- Clear about which account is for login (family member)

**3. Flexibility**
- Emergency contact can be family member (default) or someone else
- Care receiver phone is optional (if same as family member)

**4. Safeguarding**
- Proxy consent attestation (audit trail for disputes)
- Care receiver details captured (for caregiver matching)
- Emergency contact separate from proxy user (if needed)

---

### 9.2 Content Hierarchy

**Visual Hierarchy**:
1. **H1**: "Register on Behalf of a Family Member"
2. **Info Banner**: Blue background, explains dual accounts
3. **Section Labels**: YOUR DETAILS (FAMILY MEMBER), CARE RECEIVER DETAILS (uppercase, bold)
4. **Field Labels**: Regular weight, clear
5. **Helper Text**: Gray, smaller, explains purpose
6. **Proxy Consent Checkbox**: Bold, critical importance

---

### 9.3 Component Reuse

**Shared Components**:
- Header (minimal public header)
- Footer (public footer)
- Button (primary variant)
- Input Field (text, email, password, tel, date)
- Checkbox (with helper text)
- Radio Button (new: emergency contact toggle)
- Dropdown (select)
- Alert Banner (info variant for dual account explanation)

---

## 10. Cross-References

### Source Documents

**Route Map**:
- `/docs/product/tier1-route-map.md` - SCR-AUTH-002 definition (lines 149, 249-260)

**Screen Inventory**:
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` - SCR-AUTH-002 detailed spec (lines 100-151)

**Compliance**:
- `/docs/tiers/tier1/compliance.md` - Proxy consent, GDPR requirements

**Related Screens**:
- SCR-AUTH-001: Care Receiver Registration (alternative path)
- SCR-AUTH-003: Caregiver Registration (alternative path)
- SCR-AUTH-004: Phone Verification (exit point)
- SCR-AUTH-005: Login (alternative path)

---

## 11. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-08 | UX Designer | Initial wireframes and element inventory for Figma handoff |

---

**END OF DOCUMENT**

**Status**: ✅ READY FOR FIGMA HANDOFF
