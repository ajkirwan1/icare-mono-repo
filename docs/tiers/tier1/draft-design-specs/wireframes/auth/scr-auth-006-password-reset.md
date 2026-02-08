# Password Reset Wireframes (SCR-AUTH-006)

**Document Purpose**: ASCII wireframes and complete element inventory for Password Reset Request (SCR-AUTH-006)

**Screen ID**: SCR-AUTH-006
**Screen Name**: Password Reset Request
**User Role**: All registered users
**Route**: `/forgot-password`
**R0/R1**: R0 (High-volume elderly user need)
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

The Password Reset Request screen enables users to reset forgotten passwords via email link. This is a critical feature for elderly users who frequently forget passwords.

**Key Functions**:
- Request password reset email
- Send reset link (valid for 1 hour)
- Rate limit reset requests (prevent abuse)
- Generic success message (security: don't reveal account existence)
- Support users who can't remember their email

**Security Design**:
- **Generic success message**: Always shows "Check your email" even if account doesn't exist (prevents account enumeration)
- **Rate limiting**: Max 3 reset requests per email per hour
- **Time-limited token**: Reset link expires after 1 hour
- **One-time use**: Reset token invalidated after use

**Note**: This screen is the **reset request** form. The actual password reset form (from email link) is not in R0 scope - handled via email service or future R1 screen.

### 1.2 Entry Points

**From Login**:
- SCR-AUTH-005 (Login) → "Forgot password?" link

**From Account Lockout**:
- SCR-AUTH-005 (Login) → Account locked banner → "Reset password" CTA

**From Public Pages**:
- Direct URL: `/forgot-password`

### 1.3 Exit Points

**Success State**:
- Success message displayed → User checks email → User clicks reset link in email → External reset flow (not R0 scope)

**Alternative Paths**:
- "Remember your password? Log in" → SCR-AUTH-005 (Login)
- "Don't have an account? Sign up" → SCR-AUTH-001 or SCR-AUTH-003

---

## 2. Element Inventory

### 2.1 Content Blocks

#### Block 1: Page Header (Public Navigation)
- **Purpose**: Minimal navigation for unauthenticated users
- **Priority**: Secondary
- **Elements**:
  - Platform logo (left-aligned) → Clickable, returns to homepage
  - "Remember your password? Log in" link (right-aligned) → SCR-AUTH-005

#### Block 2: Form Header
- **Purpose**: Set context and reassure user
- **Priority**: Primary
- **Elements**:
  - H1: "Reset Your Password"
  - Subtitle: "Enter your email address and we'll send you a link to reset your password"

#### Block 3: Reset Request Form
- **Purpose**: Capture user's email address
- **Priority**: Primary
- **Elements**:

  - Email Address (email input, required)
    - Label: "Email address"
    - Placeholder: "your.email@example.com"
    - Validation: Valid email format
    - Error: "Please enter a valid email address"
    - Helper text: "Enter the email address you used to register"

#### Block 4: Form Actions
- **Purpose**: Submit or navigate away
- **Priority**: Primary
- **Elements**:

  - "Send Reset Link" button (primary, full-width on mobile)
    - Type: Submit button
    - States: Default, Loading ("Sending..."), Disabled
    - Action: POST /api/auth/forgot-password

  - "Remember your password? Log in" link (centered below button)

#### Block 5: Help Section
- **Purpose**: Support users who can't remember email
- **Priority**: Secondary
- **Elements**:
  - "Can't remember your email?" (bold, small heading)
  - Helper text: "Try the email address you use most often, or contact support for help."
  - "Contact support" link → Support page

#### Block 6: Footer (Public)
- **Purpose**: Legal compliance
- **Priority**: Tertiary
- **Elements**:
  - Footer links: Terms, Privacy, Contact
  - Copyright notice

---

### 2.2 Interactive Elements

#### Primary Actions
1. **"Send Reset Link" button**
   - Type: Primary submit button
   - Action: Validate email → POST to API → Show success message
   - Keyboard: Focusable, Enter to submit
   - States: Default, Hover, Focus, Disabled, Loading

#### Secondary Actions
2. **"Log in" link**
3. **"Contact support" link**

---

### 2.3 Validation Rules

| Field | Validation Rule | Error Message |
|-------|-----------------|---------------|
| Email | Required, valid email format | "Please enter a valid email address" |
| Email (server) | Account may or may not exist | Generic success message (security: no account existence check revealed) |
| Rate Limit | Max 3 requests per email per hour | "Too many reset requests. Try again in X minutes." |

---

## 3. ASCII Wireframes

### 3.1 Desktop Wireframe (1440px+)

#### Default State (Empty Form)

```
+------------------------------------------------------------------------------+
|  [LOGO]                                    Remember your password? Log in    |
+------------------------------------------------------------------------------+
|                                                                              |
|                                                                              |
|                         H1: Reset Your Password                              |
|         Enter your email address and we'll send you a link to reset          |
|                            your password                                     |
|                                                                              |
|                                                                              |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |                                                                        |  |
|  |  Email address *                                                       |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | your.email@example.com                                           |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  Enter the email address you used to register                          |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|                                                                              |
|                       [ SEND RESET LINK ]                                    |
|                                                                              |
|                                                                              |
|                   Remember your password? Log in                             |
|                                                                              |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  Can't remember your email?                                            |  |
|  |                                                                        |  |
|  |  Try the email address you use most often, or contact support for      |  |
|  |  help.                                                                 |  |
|  |                                                                        |  |
|  |  Contact support                                                       |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
+------------------------------------------------------------------------------+
| Terms of Service | Privacy Policy | Contact Us                               |
| © 2026 Platform Name                                                        |
+------------------------------------------------------------------------------+
```

---

#### Validation Error State (Invalid Email Format)

```
+------------------------------------------------------------------------------+
|  [LOGO]                                    Remember your password? Log in    |
+------------------------------------------------------------------------------+
|                                                                              |
|                         H1: Reset Your Password                              |
|         Enter your email address and we'll send you a link to reset          |
|                            your password                                     |
|                                                                              |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |                                                                        |  |
|  |  Email address *                                                       |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | sarah@                                                           |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  ❌ Please enter a valid email address                                 |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|                       [ SEND RESET LINK ]                                    |
|                                                                              |
+------------------------------------------------------------------------------+
```

---

#### Success State (Reset Email Sent)

```
+------------------------------------------------------------------------------+
|  [LOGO]                                    Remember your password? Log in    |
+------------------------------------------------------------------------------+
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  | ✅  Check your email                                                   |  |
|  |                                                                        |  |
|  |     We've sent a password reset link to sarah@example.com              |  |
|  |                                                                        |  |
|  |     The link will expire in 1 hour.                                    |  |
|  |                                                                        |  |
|  |     If you don't see the email, check your spam folder.                |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|                         H1: Reset Your Password                              |
|         Enter your email address and we'll send you a link to reset          |
|                            your password                                     |
|                                                                              |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |                                                                        |  |
|  |  Email address *                                                       |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | sarah@example.com                                            ✓   |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  Enter the email address you used to register                          |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|                                                                              |
|                   [ SEND RESET LINK ] (Disabled)                             |
|                   Link sent. Check your email.                               |
|                                                                              |
|                                                                              |
|                   Remember your password? Log in                             |
|                                                                              |
|                                                                              |
|  Didn't receive the email?                                                   |
|  • Check your spam or junk folder                                            |
|  • Make sure you entered the correct email address                           |
|  • Wait a few minutes - emails can take up to 5 minutes to arrive            |
|  • Still having trouble? Contact support                                     |
|                                                                              |
+------------------------------------------------------------------------------+
```

---

#### Rate Limited State (Too Many Requests)

```
+------------------------------------------------------------------------------+
|  [LOGO]                                    Remember your password? Log in    |
+------------------------------------------------------------------------------+
|                                                                              |
|  ⚠️  Too many reset requests                                                 |
|     You've requested too many password resets. Please try again in           |
|     15 minutes, or contact support if you need immediate help.               |
|                                                                              |
|                         H1: Reset Your Password                              |
|         Enter your email address and we'll send you a link to reset          |
|                            your password                                     |
|                                                                              |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |                                                                        |  |
|  |  Email address *                                                       |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | sarah@example.com                                                |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|                                                                              |
|                   [ SEND RESET LINK ] (Disabled)                             |
|                   Try again in 14:32                                         |
|                                                                              |
|                                                                              |
|                   Remember your password? Log in                             |
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
|                                      |
|  H1: Reset Your Password             |
|                                      |
|  Enter your email address and        |
|  we'll send you a reset link         |
|                                      |
|                                      |
|  +--------------------------------+  |
|  |                                |  |
|  |  Email address *               |  |
|  |  +--------------------------+  |  |
|  |  | your.email@example.com   |  |  |
|  |  +--------------------------+  |  |
|  |  Enter the email you used to   |  |
|  |  register                      |  |
|  |                                |  |
|  +--------------------------------+  |
|                                      |
|                                      |
|  +--------------------------------+  |
|  |    SEND RESET LINK             |  |
|  +--------------------------------+  |
|                                      |
|                                      |
|  Remember your password? Log in      |
|                                      |
|                                      |
|  +--------------------------------+  |
|  |  Can't remember your email?    |  |
|  |                                |  |
|  |  Try your most used email, or  |  |
|  |  contact support.              |  |
|  |                                |  |
|  |  Contact support               |  |
|  +--------------------------------+  |
|                                      |
+--------------------------------------+
| Terms | Privacy | Contact            |
| © 2026 Platform Name                 |
+--------------------------------------+
```

---

#### Mobile Success State

```
+--------------------------------------+
|  [LOGO]                      Log in  |
+--------------------------------------+
|                                      |
|  +--------------------------------+  |
|  | ✅  Check your email            |  |
|  |                                |  |
|  |    We've sent a reset link to  |  |
|  |    sarah@example.com           |  |
|  |                                |  |
|  |    Link expires in 1 hour.     |  |
|  |                                |  |
|  |    Check spam folder if you    |  |
|  |    don't see it.               |  |
|  +--------------------------------+  |
|                                      |
|  H1: Reset Your Password             |
|                                      |
|  +--------------------------------+  |
|  |  Email address *               |  |
|  |  +--------------------------+  |  |
|  |  | sarah@example.com    ✓   |  |  |
|  |  +--------------------------+  |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |    SEND RESET LINK             |  |
|  |    (Disabled)                  |  |
|  +--------------------------------+  |
|  Link sent. Check your email.        |
|                                      |
|  Remember your password? Log in      |
|                                      |
|                                      |
|  Didn't receive the email?           |
|  • Check spam folder                 |
|  • Correct email address?            |
|  • Wait a few minutes                |
|  • Contact support                   |
|                                      |
+--------------------------------------+
```

---

## 4. Responsive Behavior

### 4.1 Breakpoints

| Viewport | Layout Changes | Priority |
|----------|----------------|----------|
| **Mobile** (320px-767px) | Single column, full-width, condensed help text | Essential elements only |
| **Tablet** (768px-1439px) | Single column, max-width 600px centered | Full layout |
| **Desktop** (1440px+) | Centered form (max 500px) | Full layout |

### 4.2 Touch Target Sizes

**Mobile Requirements**:
- Input field: **56px height**
- Button: **56px height**
- Links: **48px height** touch target (with padding)

---

## 5. UI States

### 5.1 Loading State

```
+----------------------------------------------------------------------+
|                       [ ⏳ Sending... ]                               |
+----------------------------------------------------------------------+
```

**Loading Indicators**:
- Button shows spinner + "Sending..." text
- Email field disabled
- Timeout: 10 seconds

---

### 5.2 Success State

**Transition**:
1. User enters email address
2. User clicks "Send Reset Link"
3. Loading spinner: "Sending..."
4. Server processes request (sends email if account exists, silent fail if not)
5. Success banner appears (always, regardless of account existence)
6. Email field disabled
7. Button disabled with text: "Link sent. Check your email."

**Success Banner Content**:
```
✅  Check your email

    We've sent a password reset link to [user's email]

    The link will expire in 1 hour.

    If you don't see the email, check your spam folder.
```

**Note**: Success message shown even if email doesn't exist in database (security measure to prevent account enumeration).

---

### 5.3 Error States

#### Invalid Email Format (Client-Side)

```
Email address *
+------------------------------------------------------------------+
| sarah@                                                           |
+------------------------------------------------------------------+
❌ Please enter a valid email address
```

#### Rate Limited (Server-Side)

```
⚠️  Too many reset requests
    You've requested too many password resets. Please try again in
    15 minutes, or contact support if you need immediate help.
```

**Banner Styling**:
- Yellow/amber background
- Warning icon
- Countdown timer (if available): "Try again in 14:32"
- Button disabled

#### Network Error

```
⚠️  Unable to send reset email
    We couldn't send the reset email. Please check your internet
    connection and try again.
    [Retry]
```

**Banner Styling**:
- Red background
- Error icon
- Retry button

---

### 5.4 Countdown Timer (Rate Limit)

**Timer Format**:
- 15:00 → 14:59 → ... → 0:00
- Updates every second

**When Timer Reaches 0:00**:
- Remove rate limit banner
- Re-enable email field and button
- User can submit new request

---

## 6. Accessibility Requirements

### 6.1 WCAG 2.1 AA Compliance

**All requirements from SCR-AUTH-001 apply**

#### Additional Requirements

- **Success Banner**:
  - `role="alert"` with `aria-live="polite"`
  - Screen reader announces: "Check your email. We've sent a password reset link to [email]. The link will expire in 1 hour."

- **Rate Limit Banner**:
  - `role="alert"` with `aria-live="assertive"`
  - Screen reader announces: "Too many reset requests. You've requested too many password resets. Please try again in 15 minutes."

---

### 6.2 Focus Order

**Tab Order**:
1. Skip to main content
2. Logo
3. "Log in" link
4. Email input (auto-focused on page load)
5. "Send Reset Link" button
6. "Log in" link (duplicate)
7. "Contact support" link
8. Footer links

---

### 6.3 Screen Reader Announcements

**Page Load**:
- "Reset your password page. Enter your email address and we'll send you a link to reset your password."

**Email Field Focus**:
- "Email address, required, edit text, example: your.email@example.com. Enter the email address you used to register."

**Success Announcement**:
- "Check your email. We've sent a password reset link to sarah@example.com. The link will expire in 1 hour. If you don't see the email, check your spam folder."

**Rate Limit Announcement**:
- "Too many reset requests. You've requested too many password resets. Please try again in 15 minutes, or contact support if you need immediate help."

---

## 7. Navigation & Interactions

### 7.1 Primary User Flow

**Happy Path: Reset Email Sent**

1. User lands on `/forgot-password` (from login page or direct URL)
2. User enters email address
3. User clicks "Send Reset Link" OR presses Enter
4. Client-side validation passes
5. Form submits: `POST /api/auth/forgot-password`
6. Server checks if email exists in database:
   - **If exists**: Send password reset email with one-time token (valid 1 hour)
   - **If not exists**: Silent fail (no email sent, but same success message shown)
7. Success banner appears: "Check your email. We've sent a password reset link..."
8. Button disabled: "Link sent. Check your email."
9. User checks email
10. User clicks reset link in email → External reset flow (not R0 scope)

**Estimated Time**: 30 seconds - 2 minutes

**Security Note**: Generic success message prevents account enumeration attacks (attacker cannot determine if email exists in database).

---

### 7.2 Alternative Flows

#### Flow 2: Remember Password (Return to Login)

1. User lands on `/forgot-password`
2. User remembers password
3. User clicks "Remember your password? Log in"
4. Navigate to `/login` (SCR-AUTH-005)

#### Flow 3: Can't Remember Email (Contact Support)

1. User lands on `/forgot-password`
2. User can't remember which email they used
3. User clicks "Contact support" link
4. Navigate to support page (contact form or live chat)

#### Flow 4: Rate Limited

1. User submits reset request
2. User submits again within 1 hour (2nd request)
3. User submits again within 1 hour (3rd request)
4. User submits again within 1 hour (4th request - **blocked**)
5. Server returns error: "Rate limit exceeded"
6. Error banner: "Too many reset requests. Try again in 15 minutes."
7. Button disabled with countdown timer
8. User waits 15 minutes OR contacts support

#### Flow 5: Didn't Receive Email

1. User submits reset request
2. Success banner appears
3. User waits 5+ minutes, no email received
4. User checks spam folder (no email)
5. User clicks "Contact support" → Support page
6. OR user re-submits request (if not rate limited)

---

### 7.3 Interaction Patterns

#### Generic Success Message (Security)

```javascript
POST /api/auth/forgot-password:
  - Input: email address

  - Server checks if email exists:
      IF email exists in database:
        - Generate one-time reset token
        - Store token with expiry (1 hour)
        - Send email with reset link: /reset-password?token=[token]
        - Return success: 200 OK
      ELSE:
        - Do NOT send email (silent fail)
        - Return success: 200 OK (same response as if email exists)

  - Client receives 200 OK:
      - Always show success banner (regardless of email existence)
      - Disable form
      - Show help text: "Didn't receive email? Check spam, wait a few minutes, or contact support"
```

**Why Generic?**: Prevents attackers from enumerating accounts by testing different email addresses. Same success message whether account exists or not.

#### Rate Limiting

```javascript
RATE LIMIT RULES:
  - Max 3 reset requests per email per hour
  - Tracked by email address (hashed)

IF rate limit exceeded:
  - Return 429 Too Many Requests
  - Disable form for 15 minutes (client-side countdown)
  - Show error banner with countdown timer
  - After 15 minutes, re-enable form
```

#### Email Reset Link (Not R0 Scope)

**Email Content** (sent to user):
```
Subject: Reset Your Password - [Platform Name]

Hi [User Name],

We received a request to reset your password.

Click the link below to reset your password:
[Reset Password Link] (valid for 1 hour)

If you didn't request this, you can safely ignore this email.

Your password will not be changed until you create a new one via the link above.

Need help? Contact support at [support email]

Thanks,
The [Platform Name] Team
```

**Reset Link**:
- URL: `/reset-password?token=[one-time-token]`
- Token: UUID, stored in database with expiry timestamp
- Valid: 1 hour
- One-time use: Token invalidated after use

**Reset Password Form** (Not in R0 scope - future R1 screen):
- User clicks link in email
- Lands on `/reset-password?token=[token]`
- Form: New password + Confirm new password
- Submit → Validate token → Update password → Redirect to login

---

## 8. Design Notes

### 8.1 Design Principles Applied

**1. Simplicity**
- Single field: Email address
- Single primary action: "Send Reset Link"
- Clear success state

**2. Security**
- Generic success message (prevents account enumeration)
- Rate limiting (prevents abuse)
- Time-limited reset token (1 hour expiry)
- One-time use token

**3. Accessibility**
- Large input field (56px height on mobile)
- Clear label and helper text
- Success banner prominently displayed
- Screen reader announcements

**4. Trust-Building**
- Clear explanation: "We'll send you a link to reset your password"
- Success banner confirms email was sent (even if it wasn't - security)
- Help text for users who don't receive email
- Support link for users who can't remember email

**5. Error Prevention**
- Client-side email validation (format check)
- Clear help text: "Enter the email address you used to register"
- Success message includes email address (confirms correct email)

---

### 8.2 Content Hierarchy

**Visual Hierarchy**:
1. **Success Banner**: Green background, most prominent (if present)
2. **H1**: "Reset Your Password" (large)
3. **Subtitle**: Explanation of process (medium)
4. **Email Input**: Large, high contrast
5. **Button**: Large, brand color
6. **Help Section**: Smaller, gray text

---

### 8.3 Component Reuse

**Shared Components**:
- Header (minimal public header)
- Footer (public footer)
- Button (primary variant)
- Input Field (email)
- Alert Banner (success, error, warning variants)

---

### 8.4 Security Considerations

**Account Enumeration Prevention**:
- Same success message whether email exists or not
- Same response time (no timing attacks)
- Silent fail if email doesn't exist

**Rate Limiting**:
- Max 3 requests per email per hour
- Prevents spam/abuse
- Countdown timer transparency

**Token Security**:
- One-time use token (invalidated after password reset)
- Time-limited (1 hour expiry)
- Securely generated UUID
- Stored hashed in database

---

## 9. Cross-References

### Source Documents

**Route Map**:
- `/docs/product/tier1-route-map.md` - SCR-AUTH-006 definition (lines 154, 297-308)

**Screen Inventory**:
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` - SCR-AUTH-006 detailed spec (lines 287-321)

**Related Screens**:
- SCR-AUTH-005: Login (entry point, alternative path)
- Future R1 screen: Reset Password Form (from email link - not R0 scope)

---

## 10. Document History

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

**Note**: The actual password reset form (accessed from email link) is not in R0 scope. This screen only handles the **reset request** (email sending).
