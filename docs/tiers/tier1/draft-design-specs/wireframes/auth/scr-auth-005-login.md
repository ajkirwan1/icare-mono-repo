# Login Wireframes (SCR-AUTH-005)

**Document Purpose**: ASCII wireframes and complete element inventory for Login (SCR-AUTH-005)

**Screen ID**: SCR-AUTH-005
**Screen Name**: Login
**User Role**: All registered users
**Route**: `/login`
**R0/R1**: R0 (Access-critical)
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
8. [Design Notes](#8-design-notes)

---

## 1. Screen Purpose

### 1.1 Purpose Statement

The Login screen authenticates returning users to access their accounts. This is the primary entry point for all registered users (care receivers, family members, caregivers, admins).

**Key Functions**:
- Authenticate users with email + password
- Redirect to role-appropriate dashboard after successful login
- Support "Remember me" functionality
- Provide password reset link
- Handle account lockout after failed attempts
- Prevent access to suspended/banned accounts

### 1.2 Entry Points

**From Public Pages**:
- SCR-PUB-001 (Homepage) → "Log In" button in header
- Any public page → "Log In" link in header

**From Registration**:
- SCR-AUTH-001 (Care Receiver Registration) → "Already have an account? Log in"
- SCR-AUTH-002 (Family Member Registration) → "Already have an account? Log in"
- SCR-AUTH-003 (Caregiver Registration) → "Already have an account? Log in"
- SCR-AUTH-006 (Password Reset) → "Remember your password? Log in"

**From Session Expiry**:
- Any authenticated screen → Session expires → Redirect to `/login?redirect=[current-url]`

### 1.3 Exit Points

**Successful Login** (redirects based on user role):
- Care Receiver → `/dashboard` (SCR-CR-001)
- Family Member → `/dashboard` (SCR-CR-001 - proxy access)
- Caregiver (verified) → `/caregiver/dashboard` (SCR-CG-001)
- Caregiver (pending verification) → `/caregiver/onboarding` (SCR-CG-002)
- Admin → `/admin` (SCR-ADM-001)

**Alternative Paths**:
- "Forgot password?" → SCR-AUTH-006 (Password Reset)
- "Don't have an account? Sign up" → Links to SCR-AUTH-001 and SCR-AUTH-003

---

## 2. Element Inventory

### 2.1 Content Blocks

#### Block 1: Page Header (Public Navigation)
- **Purpose**: Minimal navigation for unauthenticated users
- **Priority**: Secondary
- **Elements**:
  - Platform logo (left-aligned) → Clickable, returns to homepage
  - "Don't have an account? Sign up" link (right-aligned) → Dropdown or direct link

#### Block 2: Form Header
- **Purpose**: Set context
- **Priority**: Primary
- **Elements**:
  - H1: "Welcome Back"
  - Subtitle: "Log in to your account"

#### Block 3: Login Form
- **Purpose**: Authenticate user
- **Priority**: Primary
- **Elements**:

##### Credentials Section
- **Fields**:

  - Email Address (email input, required)
    - Label: "Email address"
    - Placeholder: "your.email@example.com"
    - Validation: Valid email format
    - Error: "Please enter a valid email address"
    - Autocomplete: "email"

  - Password (password input, required)
    - Label: "Password"
    - Placeholder: "Enter your password"
    - Validation: Required (no other validation at login)
    - Show/hide toggle button
    - Error: "Please enter your password"
    - Autocomplete: "current-password"

##### Login Options
- **Fields**:

  - Remember Me (checkbox, optional)
    - Label: "Remember me on this device"
    - Helper text: "Stay logged in for 30 days"
    - Default: Unchecked
    - Stored: Creates persistent session cookie

  - Forgot Password Link (text link)
    - Label: "Forgot password?"
    - Action: Navigate to `/forgot-password` (SCR-AUTH-006)
    - Position: Right-aligned, same row as "Remember me" checkbox

#### Block 4: Form Actions
- **Purpose**: Submit or navigate away
- **Priority**: Primary
- **Elements**:

  - "Log In" button (primary, full-width on mobile)
    - Type: Submit button
    - States: Default, Loading ("Logging in..."), Disabled
    - Action: POST /api/auth/login

  - "Don't have an account? Sign up" link (centered below button)
    - Expandable dropdown OR direct links:
      - "Register as Care Receiver" → SCR-AUTH-001
      - "Register as Caregiver" → SCR-AUTH-003
      - "Register on behalf of family member" → SCR-AUTH-002

#### Block 5: Footer (Public)
- **Purpose**: Legal compliance and support
- **Priority**: Tertiary
- **Elements**:
  - Footer links: Terms, Privacy, Safeguarding, Contact
  - Copyright notice

---

### 2.2 Interactive Elements

#### Primary Actions
1. **"Log In" button**
   - Type: Primary submit button
   - Action: Validate form → POST to API → Redirect based on user role
   - Keyboard: Focusable, Enter to submit
   - States: Default, Hover, Focus, Disabled, Loading

#### Secondary Actions
2. **Show/Hide Password toggle**
3. **"Forgot password?" link**
4. **"Sign up" links** (care receiver, caregiver, family)

---

### 2.3 Validation Rules

| Field | Validation Rule | Error Message |
|-------|-----------------|---------------|
| Email | Required, valid email format | "Please enter a valid email address" |
| Password | Required | "Please enter your password" |
| Email (server) | Account exists | "Invalid email or password" (generic for security) |
| Password (server) | Matches stored hash | "Invalid email or password" (generic for security) |
| Account Status | Not suspended/banned | "Your account has been suspended. Contact support." |
| Failed Attempts | <5 attempts | "Too many failed login attempts. Account locked for 10 minutes." |

---

## 3. ASCII Wireframes

### 3.1 Desktop Wireframe (1440px+)

#### Default State (Empty Form)

```
+------------------------------------------------------------------------------+
|  [LOGO]                                        Don't have an account? Sign up |
+------------------------------------------------------------------------------+
|                                                                              |
|                                                                              |
|                             H1: Welcome Back                                 |
|                          Log in to your account                              |
|                                                                              |
|                                                                              |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |                                                                        |  |
|  |  Email address *                                                       |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | your.email@example.com                                           |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  Password *                                                            |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | Enter your password                                        [👁️]  |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  [ ] Remember me on this device          Forgot password?             |  |
|  |      Stay logged in for 30 days                                        |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|                                                                              |
|                            [ LOG IN ]                                        |
|                                                                              |
|                                                                              |
|                      Don't have an account? Sign up                          |
|                                                                              |
|                                                                              |
+------------------------------------------------------------------------------+
| Terms of Service | Privacy Policy | Safeguarding Policy | Contact Us         |
| © 2026 Platform Name. All rights reserved.                                  |
+------------------------------------------------------------------------------+
```

---

#### Validation Error State (Invalid Credentials)

```
+------------------------------------------------------------------------------+
|  [LOGO]                                        Don't have an account? Sign up |
+------------------------------------------------------------------------------+
|                                                                              |
|  ⚠️  Invalid email or password                                               |
|     Please check your credentials and try again. 4 attempts remaining.       |
|                                                                              |
|                             H1: Welcome Back                                 |
|                          Log in to your account                              |
|                                                                              |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |                                                                        |  |
|  |  Email address *                                                       |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | sarah@example.com                                            ✓   |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  Password *                                                            |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | •••••••••                                                    [👁️]  |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  ❌ Invalid email or password                                          |  |
|  |                                                                        |  |
|  |  [ ] Remember me on this device          Forgot password?             |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|                            [ LOG IN ]                                        |
|                                                                              |
+------------------------------------------------------------------------------+
```

---

#### Account Locked State (Too Many Failed Attempts)

```
+------------------------------------------------------------------------------+
|  [LOGO]                                        Don't have an account? Sign up |
+------------------------------------------------------------------------------+
|                                                                              |
|  ⚠️  Too many failed login attempts                                          |
|     Your account has been locked for 10 minutes for security.                |
|     [Reset password] or wait 8:45 to try again.                             |
|                                                                              |
|                             H1: Welcome Back                                 |
|                          Log in to your account                              |
|                                                                              |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |                                                                        |  |
|  |  Email address *                                                       |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | sarah@example.com                                                |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  Password *                                                            |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | (Disabled)                                                       |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|                        [ LOG IN ] (Disabled)                                 |
|                                                                              |
+------------------------------------------------------------------------------+
```

---

#### Account Suspended State

```
+------------------------------------------------------------------------------+
|  [LOGO]                                        Don't have an account? Sign up |
+------------------------------------------------------------------------------+
|                                                                              |
|  ⚠️  Your account has been suspended                                         |
|     Please contact support for assistance.                                   |
|     [Contact Support]                                                        |
|                                                                              |
|                             H1: Welcome Back                                 |
|                          Log in to your account                              |
|                                                                              |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |                                                                        |  |
|  |  Email address *                                                       |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | sarah@example.com                                                |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  Password *                                                            |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | (Disabled)                                                       |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|                        [ LOG IN ] (Disabled)                                 |
|                                                                              |
+------------------------------------------------------------------------------+
```

---

### 3.2 Mobile Wireframe (320px-767px)

```
+--------------------------------------+
|  [LOGO]                    Sign up ▼ |
+--------------------------------------+
|                                      |
|                                      |
|  H1: Welcome Back                    |
|  Log in to your account              |
|                                      |
|                                      |
|  +--------------------------------+  |
|  |                                |  |
|  |  Email address *               |  |
|  |  +--------------------------+  |  |
|  |  | your.email@example.com   |  |  |
|  |  +--------------------------+  |  |
|  |                                |  |
|  |  Password *                    |  |
|  |  +--------------------------+  |  |
|  |  | Enter password     [👁️]  |  |  |
|  |  +--------------------------+  |  |
|  |                                |  |
|  |  [ ] Remember me               |  |
|  |      Stay logged in for 30     |  |
|  |      days                      |  |
|  |                                |  |
|  |  Forgot password?              |  |
|  |                                |  |
|  +--------------------------------+  |
|                                      |
|                                      |
|  +--------------------------------+  |
|  |    LOG IN                      |  |
|  +--------------------------------+  |
|                                      |
|                                      |
|  Don't have an account?              |
|  Sign up                             |
|                                      |
+--------------------------------------+
| Terms | Privacy | Contact            |
| © 2026 Platform Name                 |
+--------------------------------------+
```

---

## 4. Responsive Behavior

### 4.1 Breakpoints

| Viewport | Layout Changes | Priority |
|----------|----------------|----------|
| **Mobile** (320px-767px) | Single column, full-width, stacked "Remember me" + "Forgot password" | Essential fields only |
| **Tablet** (768px-1439px) | Single column, max-width 600px centered | Full layout |
| **Desktop** (1440px+) | Centered form (max 500px), "Remember me" and "Forgot password" on same row | Full layout |

### 4.2 Touch Target Sizes

**Mobile Requirements**:
- Input fields: **56px height**
- Button: **56px height**
- Checkbox: **24x24px** with **48x48px** touch target
- "Forgot password" link: **48px height** touch target

---

## 5. UI States

### 5.1 Loading State

```
+----------------------------------------------------------------------+
|                       [ ⏳ Logging in... ]                            |
+----------------------------------------------------------------------+
```

**Loading Indicators**:
- Button shows spinner + "Logging in..." text
- All fields disabled
- Timeout: 10 seconds

---

### 5.2 Success State

**Transition**:
1. User enters valid email + password
2. User clicks "Log In"
3. Loading spinner: "Logging in..."
4. Server validates credentials
5. Success → Immediate redirect (no success message on this screen)

**Redirect Targets** (based on user role and status):
- Care Receiver → `/dashboard`
- Family Member → `/dashboard`
- Caregiver (verified) → `/caregiver/dashboard`
- Caregiver (pending verification) → `/caregiver/onboarding`
- Admin → `/admin`

---

### 5.3 Error States

#### Invalid Credentials

```
⚠️  Invalid email or password
    Please check your credentials and try again. 4 attempts remaining.
```

**Banner Styling**:
- Yellow/amber background
- Warning icon
- Attempt counter (security transparency)
- Generic message (does not reveal which field is wrong)

#### Too Many Failed Attempts (Account Locked)

```
⚠️  Too many failed login attempts
    Your account has been locked for 10 minutes for security.
    [Reset password] or wait 8:45 to try again.
```

**Banner Styling**:
- Red background
- Error icon
- Countdown timer (updates every second)
- Password reset CTA (user can bypass lockout by resetting password)

#### Account Suspended

```
⚠️  Your account has been suspended
    Please contact support for assistance.
    [Contact Support]
```

**Banner Styling**:
- Red background
- Error icon
- Support CTA
- Login form disabled

#### Account Banned

```
❌  Your account has been permanently banned
    Contact support if you believe this is an error.
    [Contact Support]
```

**Banner Styling**:
- Red background
- Error icon
- Support CTA
- Login form disabled

---

## 6. Accessibility Requirements

### 6.1 WCAG 2.1 AA Compliance

**All requirements from SCR-AUTH-001 apply**

#### Additional Requirements

- **Error Announcements**:
  - Login errors use `role="alert"` with `aria-live="assertive"`
  - Screen reader announces: "Error: Invalid email or password. 4 attempts remaining."

- **Disabled State**:
  - When account locked, form fields have `aria-disabled="true"`
  - Screen reader announces: "Login form disabled. Account locked for 10 minutes."

---

### 6.2 Focus Order

**Tab Order**:
1. Skip to main content
2. Logo
3. "Sign up" link
4. Email input
5. Password input
6. Show/hide password toggle
7. "Remember me" checkbox
8. "Forgot password" link
9. "Log In" button
10. "Sign up" link (duplicate)
11. Footer links

**Auto-Focus**:
- Email field auto-focused on page load (if no `?redirect` parameter)
- If redirected from session expiry, banner message: "Your session expired. Please log in again." (auto-focus email)

---

### 6.3 Screen Reader Announcements

**Page Load**:
- "Welcome back page. Log in to your account."

**Page Load (Redirected from Session Expiry)**:
- "Your session has expired. Please log in again."

**Email Field Focus**:
- "Email address, required, edit text, example: your.email@example.com, autocomplete: email"

**Password Field Focus**:
- "Password, required, password field, autocomplete: current-password"

**Remember Me Checkbox**:
- "Remember me on this device, checkbox, unchecked. Stay logged in for 30 days."

**Error Announcement**:
- "Error: Invalid email or password. Please check your credentials and try again. 4 attempts remaining."

**Account Locked Announcement**:
- "Error: Too many failed login attempts. Your account has been locked for 10 minutes for security. Reset password or wait to try again."

---

## 7. Navigation & Interactions

### 7.1 Primary User Flow

**Happy Path: Successful Login**

1. User lands on `/login`
2. User enters email address
3. User enters password
4. (Optional) User checks "Remember me"
5. User clicks "Log In" OR presses Enter
6. Client-side validation passes
7. Form submits: `POST /api/auth/login`
8. Server validates credentials
9. Server checks account status (active, not suspended/banned)
10. Server creates session (persistent if "Remember me" checked)
11. Redirect based on user role:
    - Care Receiver/Family → `/dashboard`
    - Caregiver (verified) → `/caregiver/dashboard`
    - Caregiver (pending) → `/caregiver/onboarding`
    - Admin → `/admin`

**Estimated Time**: 10-30 seconds

---

### 7.2 Alternative Flows

#### Flow 2: Forgot Password

1. User lands on `/login`
2. User clicks "Forgot password?"
3. Navigate to `/forgot-password` (SCR-AUTH-006)

#### Flow 3: Sign Up

1. User lands on `/login`
2. User clicks "Don't have an account? Sign up"
3. Dropdown expands OR navigate to:
   - "Register as Care Receiver" → `/register/care-receiver`
   - "Register as Caregiver" → `/register/caregiver`
   - "Register on behalf of family member" → `/register/family`

#### Flow 4: Invalid Credentials (Retry)

1. User enters email + password
2. User clicks "Log In"
3. Server returns error: "Invalid credentials"
4. Error banner: "Invalid email or password. 4 attempts remaining."
5. User corrects email or password
6. User retries
7. Success OR repeat until max attempts

#### Flow 5: Account Locked (Too Many Attempts)

1. User fails login 5 times
2. Server locks account for 10 minutes
3. Error banner: "Too many failed login attempts. Locked for 10 minutes."
4. Login form disabled
5. Countdown timer: "Wait 8:45 to try again" (updates every second)
6. User waits OR clicks "Reset password" → `/forgot-password`

#### Flow 6: Account Suspended

1. User enters valid email + password
2. Server checks account status: `status = suspended`
3. Error banner: "Your account has been suspended. Contact support."
4. Login form disabled
5. User clicks "Contact Support" → Support page

---

### 7.3 Interaction Patterns

#### Remember Me Functionality

```javascript
IF "Remember me" is checked:
  - Create persistent session cookie (expires in 30 days)
  - Store session token in localStorage (optional, for auto-login)
ELSE:
  - Create session cookie (expires on browser close)
```

#### Failed Attempt Tracking

```javascript
EACH FAILED LOGIN:
  - Increment failed_attempts counter in database
  - Display: "X attempts remaining" (5 - failed_attempts)

IF failed_attempts >= 5:
  - Lock account for 10 minutes
  - Store lockout_until timestamp
  - Disable login form
  - Show countdown timer

AFTER 10 MINUTES:
  - Clear lockout
  - Reset failed_attempts to 0
  - Re-enable login form
```

#### Auto-Redirect on Session Expiry

```javascript
IF user navigates to protected route AND session expired:
  - Capture current URL: /dashboard
  - Redirect to: /login?redirect=/dashboard
  - Show banner: "Your session has expired. Please log in again."

AFTER successful login:
  - Redirect to captured URL: /dashboard
```

---

## 8. Design Notes

### 8.1 Design Principles Applied

**1. Simplicity**
- Two fields only: Email + Password
- Single primary action: "Log In"
- Minimal distractions

**2. Security**
- Generic error messages ("Invalid email or password" - doesn't reveal which is wrong)
- Failed attempt tracking (max 5 attempts)
- Account lockout (10 minutes)
- "Remember me" clearly labeled (user understands implications)

**3. Accessibility**
- Large input fields (56px height on mobile)
- Clear labels
- Show/hide password toggle
- High contrast error messages

**4. Error Prevention**
- Autocomplete attributes ("email", "current-password") for browser autofill
- Clear error messages with recovery actions
- Password reset CTA in lockout banner

**5. Trust-Building**
- "Remember me" clearly explains duration (30 days)
- Lockout countdown timer (transparency about security measures)
- Generic error messages prevent account enumeration attacks

---

### 8.2 Content Hierarchy

**Visual Hierarchy**:
1. **H1**: "Welcome Back" (largest)
2. **Error Banner**: Red/yellow background, most prominent (if present)
3. **Input Fields**: Large, high contrast
4. **Log In Button**: Large, brand color
5. **Forgot Password Link**: Secondary action
6. **Sign Up Link**: Tertiary action

---

### 8.3 Component Reuse

**Shared Components**:
- Header (minimal public header)
- Footer (public footer)
- Button (primary variant)
- Input Field (email, password)
- Checkbox ("Remember me")
- Alert Banner (error, warning variants)

---

## 9. Cross-References

### Source Documents

**Route Map**:
- `/docs/product/tier1-route-map.md` - SCR-AUTH-005 definition (lines 153, 285-296)

**Screen Inventory**:
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` - SCR-AUTH-005 detailed spec (lines 243-284)

**Related Screens**:
- SCR-AUTH-001: Care Receiver Registration (alternative path)
- SCR-AUTH-003: Caregiver Registration (alternative path)
- SCR-AUTH-006: Password Reset (alternative path)
- SCR-CR-001: Care Receiver Dashboard (exit point)
- SCR-CG-001: Caregiver Dashboard (exit point)
- SCR-ADM-001: Admin Dashboard (exit point)

---

## 10. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-08 | UX Designer | Initial wireframes and element inventory for Figma handoff |

---

**END OF DOCUMENT**

**Status**: ✅ READY FOR FIGMA HANDOFF
