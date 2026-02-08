# Care Receiver Registration Wireframes (SCR-AUTH-001)

**Document Purpose**: ASCII wireframes and complete element inventory for Care Receiver Registration (SCR-AUTH-001)

**Screen ID**: SCR-AUTH-001
**Screen Name**: Care Receiver Registration
**User Role**: Unauthenticated visitors
**Route**: `/register/care-receiver`
**R0/R1**: R0 (Launch-critical)
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

The Care Receiver Registration screen enables care receivers (65+) or family members to create accounts to find and book caregivers. This is the primary entry point for demand-side users.

**Key Functions**:
- Capture essential user information (name, contact, emergency contact)
- Age verification (65+) or documented care needs
- GDPR consent collection (Terms, Privacy Policy, marketing opt-in)
- Create account with `pending_phone_verification` status
- Redirect to phone verification (SCR-AUTH-004)

### 1.2 Entry Points

**From Public Pages**:
- SCR-PUB-001 (Homepage) → "Get Started" or "Register as Care Receiver" button
- SCR-PUB-001 (Homepage) → "Find Care" CTA

**From Authentication**:
- SCR-AUTH-005 (Login) → "Don't have an account? Sign up" link
- SCR-AUTH-003 (Caregiver Registration) → "Looking for care? Register here" link

### 1.3 Exit Points

**Successful Registration**:
- → SCR-AUTH-004 (Phone Verification)

**Alternative Paths**:
- "Already have an account? Log in" → SCR-AUTH-005 (Login)
- "Register as a Caregiver" link → SCR-AUTH-003 (Caregiver Registration)
- "Register on behalf of family member" link → SCR-AUTH-002 (Family Member Registration)

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
- **Purpose**: Set context and guide user
- **Priority**: Primary
- **Elements**:
  - H1: "Create Your Account"
  - Subtitle: "Find trusted caregivers for companionship and support"
  - Badge: "Companionship Services Only" (informational)

#### Block 3: Registration Form
- **Purpose**: Collect required user data
- **Priority**: Primary
- **Elements**:

##### Personal Information Section
- **Label**: "Your Details"
- **Fields**:
  - Full Name (text input, required)
    - Label: "Full name"
    - Placeholder: "e.g., Sarah Johnson"
    - Validation: 2-100 characters, letters and spaces only
    - Error: "Please enter your full name (2-100 characters)"

  - Email Address (email input, required)
    - Label: "Email address"
    - Placeholder: "your.email@example.com"
    - Validation: Valid email format
    - Error: "Please enter a valid email address"
    - Error (server): "This email is already registered. Please log in or use a different email."

  - Password (password input, required)
    - Label: "Password"
    - Placeholder: "Create a strong password"
    - Validation: 8+ characters, 1 uppercase, 1 number
    - Show/hide toggle button (eye icon)
    - Helper text: "At least 8 characters, including 1 uppercase letter and 1 number"
    - Error: "Password must be at least 8 characters with 1 uppercase letter and 1 number"

  - Phone Number (tel input, required)
    - Label: "Mobile number"
    - Placeholder: "07xxx xxxxxx"
    - Validation: UK mobile format (07xxx xxxxxx)
    - Helper text: "We'll send you a verification code"
    - Error: "Please enter a valid UK mobile number (e.g., 07123 456789)"

##### Location Section
- **Label**: "Where do you need care?"
- **Fields**:
  - Postcode (text input, required)
    - Label: "Postcode"
    - Placeholder: "SW1A 1AA"
    - Validation: UK postcode format
    - Helper text: "We'll show you caregivers in your area"
    - Error: "Please enter a valid UK postcode (e.g., SW1A 1AA)"

##### Age Verification Section
- **Label**: "Age verification"
- **Fields**:
  - Date of Birth (date input, required)
    - Label: "Date of birth"
    - Placeholder: "DD/MM/YYYY"
    - Validation: Must be 65+ years old OR user must check "I have documented care needs" checkbox
    - Error: "You must be 65 or older, or have documented care needs, to use this service"

  - Care Needs Override (checkbox, optional)
    - Label: "I am under 65 but have documented care needs"
    - Helper text: "You may be asked to provide documentation"
    - Visibility: Only shown if date of birth indicates <65

##### Emergency Contact Section
- **Label**: "Emergency contact"
- **Helper text**: "This person will be contacted in case of emergency during care visits"
- **Fields**:
  - Emergency Contact Name (text input, required)
    - Label: "Emergency contact name"
    - Placeholder: "e.g., John Smith"
    - Validation: 2-100 characters
    - Error: "Please enter an emergency contact name"

  - Emergency Contact Phone (tel input, required)
    - Label: "Emergency contact phone"
    - Placeholder: "07xxx xxxxxx or landline"
    - Validation: UK phone format
    - Error: "Please enter a valid UK phone number"

  - Relationship (dropdown, required)
    - Label: "Relationship to you"
    - Options: "Spouse/Partner", "Daughter", "Son", "Sibling", "Friend", "Neighbour", "Other"
    - Error: "Please select a relationship"

##### Consent Section
- **Label**: "Terms and consent"
- **Fields**:
  - Terms of Service Consent (checkbox, required)
    - Label: "I accept the [Terms of Service](link)" (clickable link)
    - Validation: Must be checked
    - Error: "You must accept the Terms of Service to create an account"

  - Privacy Policy Consent (checkbox, required)
    - Label: "I accept the [Privacy Policy](link)" (clickable link)
    - Validation: Must be checked
    - Error: "You must accept the Privacy Policy to create an account"

  - Marketing Consent (checkbox, optional)
    - Label: "I'd like to receive helpful tips and updates about care services via email"
    - Helper text: "You can unsubscribe anytime"

#### Block 4: Form Actions
- **Purpose**: Submit or navigate away
- **Priority**: Primary
- **Elements**:
  - "Create Account" button (primary, full-width on mobile)
    - Type: Submit button
    - States: Default, Loading ("Creating account..."), Disabled (form invalid)
    - Action: POST /api/auth/register/care-receiver

  - "Already have an account? Log in" link (centered below button)
    - Action: Navigate to SCR-AUTH-005 (Login)

#### Block 5: Alternative Registration Options
- **Purpose**: Guide users to correct registration flow
- **Priority**: Secondary
- **Elements**:
  - Divider: "OR" (centered)
  - "Register as a Caregiver" link → SCR-AUTH-003
  - "Register on behalf of a family member" link → SCR-AUTH-002

#### Block 6: Footer (Public)
- **Purpose**: Legal compliance and support
- **Priority**: Tertiary
- **Elements**:
  - Footer links (horizontal list):
    - "Terms of Service" → SCR-PUB-006
    - "Privacy Policy" → SCR-PUB-007
    - "Safeguarding Policy" → SCR-PUB-008
    - "Contact Us"
  - Copyright notice: "© 2026 [Platform Name]. All rights reserved."

---

### 2.2 Interactive Elements

#### Primary Actions
1. **"Create Account" button**
   - Type: Primary submit button
   - Action: Validate form → POST to API → Redirect to SCR-AUTH-004
   - Keyboard: Focusable, Enter to submit
   - Screen reader: "Create account, button"
   - States: Default, Hover, Focus, Disabled, Loading

#### Secondary Actions
2. **Show/Hide Password toggle**
   - Type: Icon button
   - Action: Toggle password visibility
   - Keyboard: Focusable, Enter/Space to toggle
   - Screen reader: "Show password, button" / "Hide password, button"

3. **"Log in" link**
   - Type: Text link
   - Action: Navigate to `/login`
   - Keyboard: Focusable

4. **"Register as Caregiver" link**
   - Type: Text link
   - Action: Navigate to `/register/caregiver`

5. **"Register on behalf of family member" link**
   - Type: Text link
   - Action: Navigate to `/register/family`

#### Form Validation
- **Inline validation**: Triggered on blur (lose focus)
- **Real-time validation**: Password strength indicator updates as user types
- **Submit validation**: All fields validated on submit attempt
- **Server-side validation**: Email uniqueness check on submit

---

### 2.3 Data Display Elements

#### Static Content
- H1: "Create Your Account"
- Section labels: "Your Details", "Where do you need care?", "Age verification", "Emergency contact", "Terms and consent"
- Helper text for each field (see field definitions above)
- Footer links and copyright

#### Dynamic Data
- **Error messages**: Display inline below fields when validation fails
- **Success message**: Not shown on this screen (redirect to phone verification)
- **Loading state**: "Creating account..." text replaces button label

---

### 2.4 Validation Rules

| Field | Validation Rule | Error Message |
|-------|-----------------|---------------|
| Full Name | Required, 2-100 chars, letters/spaces | "Please enter your full name (2-100 characters)" |
| Email | Required, valid email format | "Please enter a valid email address" |
| Email (server) | Unique (not already registered) | "This email is already registered. Please log in or use a different email." |
| Password | Required, 8+ chars, 1 uppercase, 1 number | "Password must be at least 8 characters with 1 uppercase letter and 1 number" |
| Phone | Required, UK mobile format (07xxx) | "Please enter a valid UK mobile number (e.g., 07123 456789)" |
| Postcode | Required, UK postcode format | "Please enter a valid UK postcode (e.g., SW1A 1AA)" |
| Date of Birth | Required, 65+ OR care needs checked | "You must be 65 or older, or have documented care needs, to use this service" |
| Emergency Contact Name | Required, 2-100 chars | "Please enter an emergency contact name" |
| Emergency Contact Phone | Required, UK phone format | "Please enter a valid UK phone number" |
| Relationship | Required, selected from dropdown | "Please select a relationship" |
| Terms Consent | Required, checked | "You must accept the Terms of Service to create an account" |
| Privacy Consent | Required, checked | "You must accept the Privacy Policy to create an account" |

---

## 3. ASCII Wireframes

### 3.1 Desktop Wireframe (1440px+)

#### Default State (Empty Form)

```
+------------------------------------------------------------------------------+
|  [LOGO]                                        Already have an account? Log in |
+------------------------------------------------------------------------------+
|                                                                              |
|                        H1: Create Your Account                               |
|                 Find trusted caregivers for companionship and support        |
|                   🔵 Companionship Services Only                             |
|                                                                              |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  YOUR DETAILS                                                          |  |
|  |                                                                        |  |
|  |  Full name *                                                           |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | e.g., Sarah Johnson                                              |  |  |
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
|  |  WHERE DO YOU NEED CARE?                                               |  |
|  |                                                                        |  |
|  |  Postcode *                                                            |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | SW1A 1AA                                                         |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  We'll show you caregivers in your area                                |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  AGE VERIFICATION                                                      |  |
|  |                                                                        |  |
|  |  Date of birth *                                                       |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | DD/MM/YYYY                                                       |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  [ ] I am under 65 but have documented care needs                      |  |
|  |      You may be asked to provide documentation                         |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  EMERGENCY CONTACT                                                     |  |
|  |  This person will be contacted in case of emergency during care visits |  |
|  |                                                                        |  |
|  |  Emergency contact name *                                              |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | e.g., John Smith                                                 |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  Emergency contact phone *                                             |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | 07xxx xxxxxx or landline                                         |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  Relationship to you *                                                 |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | Select relationship                                          [▼] |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  TERMS AND CONSENT                                                     |  |
|  |                                                                        |  |
|  |  [✓] I accept the Terms of Service                                     |  |
|  |                                                                        |  |
|  |  [✓] I accept the Privacy Policy                                       |  |
|  |                                                                        |  |
|  |  [ ] I'd like to receive helpful tips and updates via email            |  |
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
|                         Register as a Caregiver                              |
|                  Register on behalf of a family member                       |
|                                                                              |
+------------------------------------------------------------------------------+
| Terms of Service | Privacy Policy | Safeguarding Policy | Contact Us         |
| © 2026 Platform Name. All rights reserved.                                  |
+------------------------------------------------------------------------------+
```

---

#### Validation Error State (Form Submitted with Errors)

```
+------------------------------------------------------------------------------+
|  [LOGO]                                        Already have an account? Log in |
+------------------------------------------------------------------------------+
|                                                                              |
|  ⚠️  Please correct the errors below to continue                             |
|                                                                              |
|                        H1: Create Your Account                               |
|                 Find trusted caregivers for companionship and support        |
|                   🔵 Companionship Services Only                             |
|                                                                              |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  YOUR DETAILS                                                          |  |
|  |                                                                        |  |
|  |  Full name *                                                           |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | Sarah Johnson                                                ✓   |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  Email address *                                                       |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | sarah.johnson@example.com                                    ✓   |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  Password *                                                            |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | password123                                                  [👁️]  |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  ❌ Password must include at least 1 uppercase letter                  |  |
|  |                                                                        |  |
|  |  Mobile number *                                                       |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | 1234567890                                                       |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  ❌ Please enter a valid UK mobile number (e.g., 07123 456789)         |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  WHERE DO YOU NEED CARE?                                               |  |
|  |                                                                        |  |
|  |  Postcode *                                                            |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | SW1A 1AA                                                     ✓   |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  We'll show you caregivers in your area                                |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  AGE VERIFICATION                                                      |  |
|  |                                                                        |  |
|  |  Date of birth *                                                       |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | 15/03/1998                                                       |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  ❌ You must be 65 or older, or have documented care needs             |  |
|  |                                                                        |  |
|  |  [ ] I am under 65 but have documented care needs                      |  |
|  |      You may be asked to provide documentation                         |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  EMERGENCY CONTACT                                                     |  |
|  |  This person will be contacted in case of emergency during care visits |  |
|  |                                                                        |  |
|  |  Emergency contact name *                                              |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | John Smith                                                   ✓   |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  Emergency contact phone *                                             |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | 07123 456789                                                 ✓   |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  Relationship to you *                                                 |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | Son                                                          ✓   |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  TERMS AND CONSENT                                                     |  |
|  |                                                                        |  |
|  |  [ ] I accept the Terms of Service                                     |  |
|  |  ❌ You must accept the Terms of Service to create an account          |  |
|  |                                                                        |  |
|  |  [✓] I accept the Privacy Policy                                       |  |
|  |                                                                        |  |
|  |  [ ] I'd like to receive helpful tips and updates via email            |  |
|  |      You can unsubscribe anytime                                       |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|                                                                              |
|                      [ CREATE ACCOUNT ]                                      |
|                                                                              |
|                     Already have an account? Log in                          |
|                                                                              |
+------------------------------------------------------------------------------+
```

---

### 3.2 Mobile Wireframe (320px-767px)

```
+--------------------------------------+
|  [LOGO]                      Log in  |
+--------------------------------------+
|                                      |
|  H1: Create Your Account             |
|  Find trusted caregivers for         |
|  companionship and support           |
|                                      |
|  🔵 Companionship Services Only      |
|                                      |
|  +--------------------------------+  |
|  |  YOUR DETAILS                  |  |
|  |                                |  |
|  |  Full name *                   |  |
|  |  +--------------------------+  |  |
|  |  | e.g., Sarah Johnson      |  |  |
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
|  |  We'll send a verification     |  |
|  |  code                          |  |
|  |                                |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  WHERE DO YOU NEED CARE?       |  |
|  |                                |  |
|  |  Postcode *                    |  |
|  |  +--------------------------+  |  |
|  |  | SW1A 1AA                 |  |  |
|  |  +--------------------------+  |  |
|  |  We'll show caregivers in      |  |
|  |  your area                     |  |
|  |                                |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  AGE VERIFICATION              |  |
|  |                                |  |
|  |  Date of birth *               |  |
|  |  +--------------------------+  |  |
|  |  | DD/MM/YYYY               |  |  |
|  |  +--------------------------+  |  |
|  |                                |  |
|  |  [ ] I am under 65 but have    |  |
|  |      documented care needs     |  |
|  |                                |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  EMERGENCY CONTACT             |  |
|  |  In case of emergency          |  |
|  |                                |  |
|  |  Contact name *                |  |
|  |  +--------------------------+  |  |
|  |  | e.g., John Smith         |  |  |
|  |  +--------------------------+  |  |
|  |                                |  |
|  |  Contact phone *               |  |
|  |  +--------------------------+  |  |
|  |  | 07xxx xxxxxx             |  |  |
|  |  +--------------------------+  |  |
|  |                                |  |
|  |  Relationship *                |  |
|  |  +--------------------------+  |  |
|  |  | Select              [▼]  |  |  |
|  |  +--------------------------+  |  |
|  |                                |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  TERMS AND CONSENT             |  |
|  |                                |  |
|  |  [✓] I accept the Terms of     |  |
|  |      Service                   |  |
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
|  Register as a Caregiver             |
|  Register on behalf of family        |
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
| **Mobile** (320px-767px) | Single column, stacked inputs, full-width button | Essential fields only |
| **Tablet** (768px-1439px) | Single column, slightly wider form (max 600px) | Full form |
| **Desktop** (1440px+) | Centered form (max 600px width), two-column for some fields | Full form |

### 4.2 Layout Changes by Viewport

#### Desktop (1440px+)
- **Form container**: Max-width 600px, centered
- **Input fields**: Full width within container
- **Button**: Centered, max-width 400px
- **Two-column layout**: Emergency contact name + phone side-by-side (optional)

#### Tablet (768px-1439px)
- **Form container**: Max-width 600px, centered
- **Input fields**: Full width
- **Button**: Full width

#### Mobile (320px-767px)
- **Form container**: Full width with 16px padding
- **Input fields**: Full width
- **Button**: Full width
- **Labels**: Above fields (not side-by-side)
- **Helper text**: Condensed

### 4.3 Touch Target Sizes

**Mobile Requirements** (elderly-friendly):
- Input fields: **56px height minimum**
- Buttons: **56px height minimum**
- Checkboxes: **24x24px** with **48x48px** touch target (padding)
- Dropdown: **56px height**
- Password toggle: **48x48px** touch target

---

## 5. UI States

### 5.1 Loading State

**Form Submission in Progress**:

```
+----------------------------------------------------------------------+
|  [LOGO]                                  Already have an account? Log in |
+----------------------------------------------------------------------+
|                                                                      |
|                    H1: Create Your Account                           |
|             Find trusted caregivers for companionship and support    |
|                 🔵 Companionship Services Only                       |
|                                                                      |
|  [Form fields shown but disabled...]                                |
|                                                                      |
|                                                                      |
|                 [ ⏳ Creating account... ]                           |
|                                                                      |
+----------------------------------------------------------------------+
```

**Loading Indicators**:
- Button shows spinner icon + "Creating account..." text
- All form fields disabled (grayed out)
- No user interaction possible during submission
- Timeout: 30 seconds (show error if no response)

---

### 5.2 Error States

#### Inline Field Errors

**Pattern**: Error message appears below field with red text and error icon

```
Email address *
+------------------------------------------------------------------+
| sarah@johnson                                                    |
+------------------------------------------------------------------+
❌ Please enter a valid email address
```

#### Server Error (Email Already Registered)

```
+----------------------------------------------------------------------+
|  ⚠️  This email is already registered                                |
|     Please log in or use a different email address.                 |
|     [Log In] [Try Different Email]                                  |
+----------------------------------------------------------------------+
```

#### Network Error

```
+----------------------------------------------------------------------+
|  ⚠️  Unable to create account                                        |
|     We couldn't connect to the server. Please check your internet    |
|     connection and try again.                                        |
|     [Retry]                                                          |
+----------------------------------------------------------------------+
```

---

### 5.3 Success State

**Not Shown on This Screen**:
- Successful registration immediately redirects to SCR-AUTH-004 (Phone Verification)
- No intermediate success message displayed

---

### 5.4 Validation States

#### Real-Time Password Strength Indicator

```
Password *
+------------------------------------------------------------------+
| MyPassword123                                                [👁️]  |
+------------------------------------------------------------------+
✓ At least 8 characters
✓ 1 uppercase letter
✓ 1 number
Password strength: Strong
```

#### Age Verification State Change

**When user enters DOB showing <65**:

```
Date of birth *
+------------------------------------------------------------------+
| 15/03/1998                                                       |
+------------------------------------------------------------------+
⚠️ You appear to be under 65

[ ] I am under 65 but have documented care needs
    You may be asked to provide documentation
```

---

## 6. Accessibility Requirements

### 6.1 WCAG 2.1 AA Compliance

#### Perceivable
- **Text Alternatives**:
  - ✅ All icons have `aria-label` (eye icon: "Show password")
  - ✅ Required field indicators: `*` accompanied by screen reader text "required"
  - ✅ Error icons have alt text

- **Distinguishable**:
  - ✅ Color contrast ratios: 4.5:1 for text, 3.0:1 for UI components
  - ✅ Error states: Red color + icon + text (not color alone)
  - ✅ Success indicators: Green checkmark + text
  - ✅ Font sizes: 16px minimum for inputs and labels

#### Operable
- **Keyboard Accessible**:
  - ✅ All form fields focusable via Tab key
  - ✅ Tab order: Logo → Login link → Full name → Email → Password → Password toggle → Phone → Postcode → DOB → Care needs checkbox → Emergency name → Emergency phone → Relationship dropdown → Terms checkbox → Privacy checkbox → Marketing checkbox → Create Account button → Footer links
  - ✅ Focus indicators: 3px solid border with high contrast color
  - ✅ Enter key submits form from any field

- **Enough Time**:
  - ✅ No time limits on form completion
  - ✅ Session does not expire during registration

- **Navigable**:
  - ✅ Page title: "[Platform Name] - Register as Care Receiver"
  - ✅ Headings hierarchy: H1 (Create Your Account), H2 (section labels - visually styled as labels)
  - ✅ Skip to main content link (hidden until focused)
  - ✅ Landmark regions: `<header>`, `<main>`, `<form>`, `<footer>`

#### Understandable
- **Readable**:
  - ✅ Language declared: `<html lang="en-GB">`
  - ✅ Jargon avoided: "Mobile number" not "Phone", "Emergency contact" not "NOK"
  - ✅ Clear labels: Every field has visible label + helper text

- **Predictable**:
  - ✅ Consistent navigation (logo, login link)
  - ✅ No unexpected context changes (form doesn't submit until button clicked)
  - ✅ Errors appear in predictable location (below field)

- **Input Assistance**:
  - ✅ Clear error messages with recovery instructions
  - ✅ Labels and instructions before fields
  - ✅ Placeholders provide example format
  - ✅ Helper text explains requirements

#### Robust
- **Compatible**:
  - ✅ Valid HTML5 semantic markup (`<form>`, `<label>`, `<input>`)
  - ✅ ARIA attributes: `aria-required="true"`, `aria-invalid="true"`, `aria-describedby` for error messages
  - ✅ Tested with screen readers (NVDA, JAWS, VoiceOver)

---

### 6.2 Focus Order

**Tab Order**:
1. Skip to main content link (hidden until focused)
2. Platform logo
3. "Already have an account? Log in" link
4. Full name input
5. Email address input
6. Password input
7. Show/hide password toggle button
8. Mobile number input
9. Postcode input
10. Date of birth input
11. "I am under 65 but have documented care needs" checkbox (if visible)
12. Emergency contact name input
13. Emergency contact phone input
14. Relationship dropdown
15. Terms of Service checkbox
16. Privacy Policy checkbox
17. Marketing consent checkbox
18. "Create Account" button
19. "Already have an account? Log in" link (duplicate)
20. "Register as a Caregiver" link
21. "Register on behalf of family member" link
22. Footer links

---

### 6.3 Screen Reader Announcements

**Page Load**:
- "Create your account page. Registration form for care receivers. Find trusted caregivers for companionship and support. Companionship services only."

**Field Focus**:
- "Full name, required, edit text"
- "Email address, required, edit text, example: your.email@example.com"
- "Password, required, password field. At least 8 characters, including 1 uppercase letter and 1 number"
- "Show password, button" (toggle button)

**Error Announcement**:
- "Error: Please enter a valid email address" (announced immediately after validation)
- "Alert: Please correct the errors below to continue" (page-level error banner)

**Checkbox Focus**:
- "I accept the Terms of Service, required, checkbox, unchecked"
- "I'd like to receive helpful tips and updates via email, checkbox, unchecked. You can unsubscribe anytime."

**Form Submission**:
- "Creating account, please wait" (loading state)
- On error: "Alert: Unable to create account. [Error details]"

---

### 6.4 Elderly User Considerations

**Cognitive Load Reduction**:
- ✅ One field per row (no multi-column layouts except optional desktop emergency contact)
- ✅ Clear visual hierarchy (sections grouped with labels)
- ✅ Helper text for every field
- ✅ Plain language (no technical jargon)

**Vision Support**:
- ✅ Large font sizes (16px minimum, 18px for labels)
- ✅ High contrast (4.5:1 minimum)
- ✅ Large input fields (56px height on mobile)
- ✅ Generous spacing between fields (24px minimum)

**Motor Control**:
- ✅ Large touch targets (56px height for inputs and buttons)
- ✅ Ample spacing between interactive elements (16px minimum)
- ✅ Large checkbox targets (24x24px with 48x48px touch area)
- ✅ Forgiving tap areas (entire input field clickable)

**Error Prevention**:
- ✅ Inline validation (immediate feedback on blur)
- ✅ Password strength indicator (real-time)
- ✅ Confirmation for required checkboxes (clear error if unchecked)
- ✅ Example formats in placeholders (e.g., "07xxx xxxxxx")

---

## 7. Navigation & Interactions

### 7.1 Primary User Flow

**Happy Path: Successful Registration**

1. User lands on `/register/care-receiver` (from homepage or login page)
2. User fills in all required fields
3. User checks Terms and Privacy checkboxes
4. User clicks "Create Account" button
5. Client-side validation passes
6. Form submits to API: `POST /api/auth/register/care-receiver`
7. Server creates user account with `status: pending_phone_verification`
8. Server sends SMS OTP to user's phone
9. Redirect to `/verify/phone` (SCR-AUTH-004)

**Estimated Time**: 3-5 minutes for elderly users

---

### 7.2 Alternative Flows

#### Flow 2: User Already Has Account

1. User lands on `/register/care-receiver`
2. User clicks "Already have an account? Log in"
3. Navigate to `/login` (SCR-AUTH-005)

#### Flow 3: User Wants to Register as Caregiver

1. User lands on `/register/care-receiver`
2. User realizes they want to offer care, not receive it
3. User clicks "Register as a Caregiver"
4. Navigate to `/register/caregiver` (SCR-AUTH-003)

#### Flow 4: User Wants to Register on Behalf of Family Member

1. User lands on `/register/care-receiver`
2. User is family member acting as proxy
3. User clicks "Register on behalf of a family member"
4. Navigate to `/register/family` (SCR-AUTH-002)

#### Flow 5: Email Already Registered (Server Error)

1. User fills form with email `sarah@example.com`
2. User submits form
3. Server returns error: "Email already registered"
4. Error banner appears: "This email is already registered. Please log in or use a different email."
5. User can click "Log In" button → Navigate to `/login?email=sarah@example.com` (pre-filled)
6. OR user can change email address and resubmit

#### Flow 6: Validation Errors

1. User fills form incompletely or with invalid data
2. User clicks "Create Account"
3. Client-side validation runs
4. Errors appear below invalid fields (inline)
5. Page scrolls to first error
6. Alert banner appears at top: "Please correct the errors below to continue"
7. User corrects errors
8. User resubmits → Validation passes → API call proceeds

---

### 7.3 Interaction Patterns

#### Inline Validation Timing

- **On Blur** (field loses focus): Validate and show error if invalid
- **On Change** (after first blur): Re-validate and clear error if now valid
- **On Submit**: Validate all fields, show all errors, scroll to first error

#### Password Strength Indicator

- **Real-time updates** as user types
- **Visual indicator**: Color-coded bar (red=weak, yellow=fair, green=strong)
- **Text feedback**: "Weak", "Fair", "Strong"
- **Criteria checklist**: Shows which requirements are met (✓ or ❌)

#### Age Verification Logic

```
IF date_of_birth indicates age < 65:
  SHOW warning: "You appear to be under 65"
  SHOW checkbox: "I am under 65 but have documented care needs"
  REQUIRE checkbox to be checked OR user changes DOB
ELSE:
  HIDE checkbox
  PASS validation
```

#### Show/Hide Password Toggle

- **Click eye icon** → Password text becomes visible
- **Icon changes**: Eye with slash → Eye open
- **Screen reader announces**: "Password shown" / "Password hidden"
- **Security**: Password re-hidden on blur (optional, for extra security)

---

## 8. Compliance & GDPR

### 8.1 GDPR Consent Requirements

**Lawful Basis**: Consent (GDPR Article 6(1)(a))

**Consent Mechanisms**:

1. **Terms of Service Consent** (Required)
   - Label: "I accept the [Terms of Service](link)"
   - Link opens Terms in new tab
   - Must be explicitly checked (pre-checked checkboxes NOT allowed)
   - Stored as: `user.consents.terms_accepted_at: timestamp`

2. **Privacy Policy Consent** (Required)
   - Label: "I accept the [Privacy Policy](link)"
   - Link opens Privacy Policy in new tab
   - Must be explicitly checked
   - Stored as: `user.consents.privacy_accepted_at: timestamp`

3. **Marketing Consent** (Optional)
   - Label: "I'd like to receive helpful tips and updates about care services via email"
   - Helper text: "You can unsubscribe anytime"
   - Unchecked by default
   - Stored as: `user.consents.marketing_emails: boolean`, `marketing_consented_at: timestamp`

**Consent Recording**:
- Store timestamp of each consent
- Store IP address (for audit trail)
- Store version of Terms/Privacy Policy accepted
- User can withdraw consent anytime via account settings

---

### 8.2 Data Processing Notices

**Transparency Requirements**:

- **Purpose of data collection**: Stated in page subtitle ("Find trusted caregivers...")
- **Data recipients**: Explained in Privacy Policy
- **Data retention**: Explained in Privacy Policy
- **User rights**: Link to Privacy Policy (includes GDPR rights: access, rectification, erasure, portability)

**Privacy Policy Link**:
- Clickable link in checkbox label
- Also in footer (for users who want to read before consenting)

---

### 8.3 Age Verification Compliance

**Care Act 2014 Consideration**:
- Platform designed for adults 65+
- Users <65 can register if they have "documented care needs"
- Documentation not required at registration (self-attestation)
- Admin may request evidence during onboarding or in disputes

**Data Protection**:
- Date of birth is Standard Personal Data (not Special Category)
- Used for age verification only (not shown to caregivers)
- Not required for service provision after verification

---

### 8.4 Emergency Contact Data

**Lawful Basis**: Legitimate Interest (GDPR Article 6(1)(f))

**Legitimate Interest Assessment**:
- **Purpose**: Safeguarding during care visits
- **Necessity**: Essential for vulnerable adult protection
- **Balancing test**: User safety outweighs privacy intrusion
- **Transparency**: Clearly explained in helper text ("This person will be contacted in case of emergency during care visits")

**Data Minimization**:
- Only collect: Name, phone, relationship
- Do NOT collect: Email, address (not necessary)

---

## 9. Design Notes

### 9.1 Design Principles Applied

**1. Simplicity & Clarity**
- One-column layout (no visual clutter)
- Clear section headings (Your Details, Where do you need care?, etc.)
- Plain language labels (no jargon)

**2. Trust-Building**
- "Companionship Services Only" badge (sets expectations)
- Emergency contact explanation (shows care about safety)
- Clear consent checkboxes (transparency)
- Links to legal policies (accessible compliance)

**3. Accessibility First**
- Large input fields (56px height on mobile)
- Clear labels with helper text
- High contrast error messages
- Keyboard navigable

**4. Progressive Disclosure**
- Sections grouped logically
- Helper text revealed below fields (not overwhelming)
- Age verification checkbox only shown if needed

**5. Error Prevention**
- Inline validation (immediate feedback)
- Password strength indicator (guide user to valid password)
- Example formats in placeholders
- Required field indicators

---

### 9.2 Content Hierarchy

**Visual Hierarchy**:
1. **H1**: "Create Your Account" (largest, boldest)
2. **Section Labels**: YOUR DETAILS, WHERE DO YOU NEED CARE? (uppercase, bold, medium size)
3. **Field Labels**: Full name, Email address, etc. (regular weight, with asterisk for required)
4. **Input Fields**: Large, prominent, high contrast border
5. **Helper Text**: Smaller, gray, below fields
6. **Error Messages**: Red, with icon, below fields
7. **Button**: Large, brand color, centered
8. **Footer**: Small, gray, least prominent

---

### 9.3 Color & Status Indicators

**Field States**:
- **Default**: Gray border (neutral)
- **Focus**: Blue border (active)
- **Valid**: Green border + checkmark icon (success)
- **Invalid**: Red border + error icon + error message (error)
- **Disabled**: Light gray background + gray border (inactive)

**Error Styling**:
- Red color: `#dc2626` (error red)
- Error icon: ❌ or ⚠️
- Error text contrast: 4.5:1 on white background

**Success Styling**:
- Green color: `#16a34a` (success green)
- Success icon: ✓
- Checkmark shown inline in input field (right side)

---

### 9.4 Typography Scale

**Recommended Sizes**:
- **H1** (Create Your Account): 32px (desktop), 28px (tablet), 24px (mobile)
- **Subtitle**: 18px (desktop), 16px (mobile)
- **Section Labels**: 14px uppercase, bold (600 weight)
- **Field Labels**: 16px, regular (400 weight)
- **Input Text**: 16px (all viewports) - CRITICAL for iOS to prevent zoom
- **Helper Text**: 14px, gray
- **Error Messages**: 14px, red, regular weight
- **Button**: 18px, semibold (600 weight)
- **Footer Links**: 14px, gray

**Font Weights**:
- **H1**: Bold (700)
- **Section Labels**: Semibold (600)
- **Labels**: Regular (400)
- **Button**: Semibold (600)

---

### 9.5 Spacing & Layout

**Section Spacing**:
- Between sections: 40px (desktop), 32px (tablet), 24px (mobile)
- Between fields within section: 20px (desktop), 16px (mobile)
- Field label to input: 8px
- Input to helper text: 4px
- Helper text to error: 4px

**Input Field Dimensions**:
- Height: 56px (mobile), 48px (desktop)
- Padding: 16px horizontal, 16px vertical
- Border: 1px solid
- Border radius: 12px

**Button Dimensions**:
- Height: 56px (mobile), 48px (desktop)
- Padding: 16px horizontal
- Border radius: 12px
- Max-width: 400px (desktop)

**Checkbox Dimensions**:
- Checkbox: 24x24px
- Touch target: 48x48px (padding around checkbox)
- Label: 16px, left-aligned with checkbox

---

### 9.6 Component Reuse

**Shared Components** (from design system):
- **Header**: Minimal public header (logo + login link)
- **Footer**: Public footer (legal links)
- **Button**: Primary button variant
- **Input Field**: Text, email, password, tel types
- **Checkbox**: Standard checkbox with label
- **Dropdown**: Standard select dropdown
- **Alert Banner**: Error variant (for page-level errors)

**New Components** (specific to forms):
- **Password Strength Indicator**: Real-time validation feedback
- **Inline Error Message**: Field-level error display

---

## 10. Cross-References

### Source Documents

**Route Map**:
- `/docs/product/tier1-route-map.md` - SCR-AUTH-001 definition (lines 148, 237-248)

**Screen Inventory**:
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` - SCR-AUTH-001 detailed spec (lines 52-98)

**User Flows**:
- `/docs/tiers/tier1/draft-design-specs/user-flows/care-receiver-first-booking.md` - Registration entry point

**Compliance**:
- `/docs/tiers/tier1/compliance.md` - GDPR consent requirements, ICO registration

**Related Screens**:
- SCR-AUTH-002: Family Member Registration (alternative path)
- SCR-AUTH-003: Caregiver Registration (alternative path)
- SCR-AUTH-004: Phone Verification (exit point)
- SCR-AUTH-005: Login (alternative path)
- SCR-PUB-006: Terms of Service (linked in consent)
- SCR-PUB-007: Privacy Policy (linked in consent)

---

## 11. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-08 | UX Designer | Initial wireframes and element inventory for Figma handoff |

---

**END OF DOCUMENT**

**Status**: ✅ READY FOR FIGMA HANDOFF

**Next Steps**:
1. Figma designer creates high-fidelity mockups based on these wireframes
2. Visual design applies brand colors, typography, and imagery
3. Interactive prototype for user testing
4. Engineering handoff with component specifications
