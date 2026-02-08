# Phone Verification Wireframes (SCR-AUTH-004)

**Document Purpose**: ASCII wireframes and complete element inventory for Phone Verification (SCR-AUTH-004)

**Screen ID**: SCR-AUTH-004
**Screen Name**: Phone Verification
**User Role**: Care Receiver, Family Member, Caregiver (pending_phone_verification status)
**Route**: `/verify/phone`
**R0/R1**: R0 (Safeguarding-critical)
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

The Phone Verification screen verifies the user's phone number via SMS OTP (One-Time Password) to prevent fake accounts and ensure contact reachability. This is a critical safeguarding measure for the elderly care platform.

**Key Functions**:
- Display masked phone number (last 4 digits visible: "****1234")
- Provide 6-digit OTP input field
- Show countdown timer (10 minutes until code expires)
- Verify OTP code against server
- Rate limit resend requests (3 per hour)
- Redirect to appropriate next screen based on user type

**Safeguarding Importance**:
- Prevents bot/spam accounts
- Ensures user can be contacted in emergencies
- Validates UK mobile number ownership
- Required before any booking can be made

### 1.2 Entry Points

**From Registration**:
- SCR-AUTH-001 (Care Receiver Registration) → Account created → Redirect to `/verify/phone`
- SCR-AUTH-002 (Family Member Registration) → Account created → Redirect to `/verify/phone`
- SCR-AUTH-003 (Caregiver Registration) → Account created → Redirect to `/verify/phone`

**Direct Access** (if user navigates away and returns):
- User with `status: pending_phone_verification` navigates to any authenticated route → Redirect to `/verify/phone`

### 1.3 Exit Points

**Successful Verification** (redirects based on user type):
- Care Receiver → `/dashboard` (SCR-CR-001)
- Family Member → `/dashboard` (SCR-CR-001 - proxy access)
- Caregiver → `/caregiver/onboarding` (SCR-CG-002)

**Change Phone Number**:
- "Change phone number" link → Return to registration screen (pre-fill existing data)

---

## 2. Element Inventory

### 2.1 Content Blocks

#### Block 1: Page Header (Minimal)
- **Purpose**: Simple navigation during verification
- **Priority**: Secondary
- **Elements**:
  - Platform logo (left-aligned) → Clickable, returns to homepage (confirmation modal: "Are you sure? You'll need to verify your phone later.")
  - No user menu (not authenticated yet)

#### Block 2: Verification Header
- **Purpose**: Set context and reassure user
- **Priority**: Primary
- **Elements**:
  - H1: "Verify Your Phone Number"
  - Subtitle: "We've sent a 6-digit code to ****[last 4 digits]"
  - Helper text: "Enter the code below to complete your registration"

#### Block 3: OTP Input
- **Purpose**: Capture 6-digit SMS code
- **Priority**: Primary
- **Elements**:

  - 6-Digit Code Input (custom input, required)
    - Type: Numeric input, 6 separate boxes OR single input field with 6-character mask
    - Label: "Enter verification code"
    - Placeholder: "○ ○ ○ ○ ○ ○" (empty circles) or "------"
    - Validation: Exactly 6 digits
    - Auto-focus on page load
    - Auto-submit when 6 digits entered (optional)
    - Error: "Invalid code. Please check and try again."

  - Countdown Timer (read-only text)
    - Label: "Code expires in"
    - Format: "9:32" (minutes:seconds)
    - Updates: Real-time countdown from 10:00 to 0:00
    - Expired state: "Code expired" (red text)

#### Block 4: Verification Actions
- **Purpose**: Submit code or request new code
- **Priority**: Primary
- **Elements**:

  - "Verify" button (primary)
    - Type: Submit button
    - States: Default, Loading ("Verifying..."), Disabled (if code length ≠ 6)
    - Action: POST /api/auth/verify-phone with code

  - "Resend code" button (secondary)
    - Type: Button
    - States: Default, Disabled (rate limited), Loading ("Sending...")
    - Action: POST /api/auth/resend-otp
    - Rate limit: 3 requests per hour
    - Cooldown: "Resend available in 5:00" (if rate limited)

  - "Change phone number" link (tertiary)
    - Type: Text link
    - Action: Return to registration screen with confirmation modal
    - Modal: "Are you sure you want to change your phone number? You'll need to start registration again."

#### Block 5: Help Text
- **Purpose**: Guide user if they encounter issues
- **Priority**: Secondary
- **Elements**:
  - "Didn't receive a code?" (bold, small heading)
  - Bullet list:
    - "Check your phone's message app (SMS)"
    - "Make sure you entered the correct phone number: ****[last 4]"
    - "Wait a few minutes - codes can take up to 2 minutes to arrive"
    - "Check spam/junk folder (if using messaging app with filters)"
  - "Still having trouble? Contact support" link

#### Block 6: Footer (Minimal)
- **Purpose**: Legal compliance
- **Priority**: Tertiary
- **Elements**:
  - Footer links: Terms, Privacy, Contact
  - Copyright notice

---

### 2.2 Interactive Elements

#### Primary Actions
1. **"Verify" button**
   - Type: Primary submit button
   - Action: Validate code → POST to API → Redirect based on user type
   - Keyboard: Focusable, Enter to submit
   - States: Default, Hover, Focus, Disabled, Loading

2. **6-Digit Code Input**
   - Type: Numeric input (6 separate boxes or single masked input)
   - Auto-focus on page load
   - Auto-advance to next box when digit entered (if using 6-box design)
   - Backspace deletes current digit and moves to previous box
   - Paste support: Auto-populate all 6 boxes from clipboard

#### Secondary Actions
3. **"Resend code" button**
   - Type: Secondary button
   - Action: Request new OTP → Reset countdown timer
   - Rate limited: 3 per hour
   - Disabled state: "Resend available in X:XX"

4. **"Change phone number" link**
   - Type: Text link
   - Action: Show confirmation modal → Return to registration

---

### 2.3 Data Display Elements

#### Dynamic Data
1. **Masked Phone Number**
   - Source: `users.phone_number` (masked)
   - Display: "****1234" (last 4 digits visible)
   - Updates if user changes phone

2. **Countdown Timer**
   - Source: Calculated from `otp.created_at + 10 minutes - current_time`
   - Updates: Every second
   - Format: "9:32" (MM:SS)
   - Expired: "Code expired" (red)

3. **Attempt Counter**
   - Source: Count of failed OTP attempts
   - Display: "Invalid code. 2 attempts remaining."
   - Max attempts: 3 (then user must request new code)

4. **Resend Cooldown**
   - Source: Rate limit tracking
   - Display: "Resend available in 5:00" (if cooldown active)

---

### 2.4 Validation Rules

| Field | Validation Rule | Error Message |
|-------|-----------------|---------------|
| OTP Code | Required, exactly 6 digits, numeric | "Please enter the 6-digit code" |
| OTP Code (server) | Matches server-generated OTP | "Invalid code. Please check and try again." |
| OTP Expiry | Code created <10 minutes ago | "Code expired. Please request a new code." |
| OTP Attempts | <3 failed attempts | "Too many attempts. Request a new code in 10 minutes." |

---

## 3. ASCII Wireframes

### 3.1 Desktop Wireframe (1440px+)

#### Default State (Code Sent, Awaiting Input)

```
+------------------------------------------------------------------------------+
|  [LOGO]                                                                      |
+------------------------------------------------------------------------------+
|                                                                              |
|                                                                              |
|                       H1: Verify Your Phone Number                           |
|                  We've sent a 6-digit code to ****1234                       |
|                Enter the code below to complete your registration            |
|                                                                              |
|                                                                              |
|                                                                              |
|                      Enter verification code                                 |
|                                                                              |
|              +-----+  +-----+  +-----+  +-----+  +-----+  +-----+            |
|              |     |  |     |  |     |  |     |  |     |  |     |            |
|              |  ○  |  |  ○  |  |  ○  |  |  ○  |  |  ○  |  |  ○  |            |
|              |     |  |     |  |     |  |     |  |     |  |     |            |
|              +-----+  +-----+  +-----+  +-----+  +-----+  +-----+            |
|                                                                              |
|                                                                              |
|                         Code expires in 9:32                                 |
|                                                                              |
|                                                                              |
|                          [ VERIFY ]                                          |
|                                                                              |
|                        [Resend code]                                         |
|                                                                              |
|                      Change phone number                                     |
|                                                                              |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  Didn't receive a code?                                                |  |
|  |                                                                        |  |
|  |  • Check your phone's message app (SMS)                               |  |
|  |  • Make sure you entered the correct phone number: ****1234           |  |
|  |  • Wait a few minutes - codes can take up to 2 minutes to arrive      |  |
|  |  • Check spam/junk folder (if using messaging app with filters)       |  |
|  |                                                                        |  |
|  |  Still having trouble? Contact support                                |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
+------------------------------------------------------------------------------+
| Terms of Service | Privacy Policy | Contact Us                               |
| © 2026 Platform Name                                                        |
+------------------------------------------------------------------------------+
```

---

#### Entering Code State (User Typing)

```
+------------------------------------------------------------------------------+
|  [LOGO]                                                                      |
+------------------------------------------------------------------------------+
|                                                                              |
|                       H1: Verify Your Phone Number                           |
|                  We've sent a 6-digit code to ****1234                       |
|                Enter the code below to complete your registration            |
|                                                                              |
|                                                                              |
|                      Enter verification code                                 |
|                                                                              |
|              +-----+  +-----+  +-----+  +-----+  +-----+  +-----+            |
|              |     |  |     |  |     |  |     |  |     |  |     |            |
|              |  5  |  |  4  |  |  3  |  |  2  |  |  1  |  |  ▋  |            |
|              |     |  |     |  |     |  |     |  |     |  |     |            |
|              +-----+  +-----+  +-----+  +-----+  +-----+  +-----+            |
|                                                                              |
|                         Code expires in 8:45                                 |
|                                                                              |
|                                                                              |
|                          [ VERIFY ]                                          |
|                                                                              |
+------------------------------------------------------------------------------+
```

---

#### Error State (Invalid Code)

```
+------------------------------------------------------------------------------+
|  [LOGO]                                                                      |
+------------------------------------------------------------------------------+
|                                                                              |
|                       H1: Verify Your Phone Number                           |
|                  We've sent a 6-digit code to ****1234                       |
|                Enter the code below to complete your registration            |
|                                                                              |
|                                                                              |
|                      Enter verification code                                 |
|                                                                              |
|              +-----+  +-----+  +-----+  +-----+  +-----+  +-----+            |
|              | ❌  |  | ❌  |  | ❌  |  | ❌  |  | ❌  |  | ❌  |            |
|              |  5  |  |  4  |  |  3  |  |  2  |  |  1  |  |  9  |            |
|              |     |  |     |  |     |  |     |  |     |  |     |            |
|              +-----+  +-----+  +-----+  +-----+  +-----+  +-----+            |
|                                                                              |
|                    ❌ Invalid code. 2 attempts remaining.                    |
|                    Please check the code and try again.                      |
|                                                                              |
|                         Code expires in 7:18                                 |
|                                                                              |
|                          [ VERIFY ]                                          |
|                                                                              |
|                        [Resend code]                                         |
|                                                                              |
+------------------------------------------------------------------------------+
```

---

#### Expired Code State

```
+------------------------------------------------------------------------------+
|  [LOGO]                                                                      |
+------------------------------------------------------------------------------+
|                                                                              |
|                       H1: Verify Your Phone Number                           |
|                  We've sent a 6-digit code to ****1234                       |
|                Enter the code below to complete your registration            |
|                                                                              |
|                                                                              |
|                      Enter verification code                                 |
|                                                                              |
|              +-----+  +-----+  +-----+  +-----+  +-----+  +-----+            |
|              | ⚠️  |  | ⚠️  |  | ⚠️  |  | ⚠️  |  | ⚠️  |  | ⚠️  |            |
|              |  ○  |  |  ○  |  |  ○  |  |  ○  |  |  ○  |  |  ○  |            |
|              |     |  |     |  |     |  |     |  |     |  |     |            |
|              +-----+  +-----+  +-----+  +-----+  +-----+  +-----+            |
|                                                                              |
|                      ⚠️ Code expired (10 minutes elapsed)                    |
|                      Please request a new code below.                        |
|                                                                              |
|                       Code expires in 0:00                                   |
|                                                                              |
|                         [ VERIFY ]                                           |
|                         (Disabled)                                           |
|                                                                              |
|                       [Resend code]                                          |
|                                                                              |
+------------------------------------------------------------------------------+
```

---

#### Rate Limited State (Resend Disabled)

```
+------------------------------------------------------------------------------+
|  [LOGO]                                                                      |
+------------------------------------------------------------------------------+
|                                                                              |
|                       H1: Verify Your Phone Number                           |
|                  We've sent a 6-digit code to ****1234                       |
|                Enter the code below to complete your registration            |
|                                                                              |
|                                                                              |
|                      Enter verification code                                 |
|                                                                              |
|              +-----+  +-----+  +-----+  +-----+  +-----+  +-----+            |
|              |     |  |     |  |     |  |     |  |     |  |     |            |
|              |  ○  |  |  ○  |  |  ○  |  |  ○  |  |  ○  |  |  ○  |            |
|              |     |  |     |  |     |  |     |  |     |  |     |            |
|              +-----+  +-----+  +-----+  +-----+  +-----+  +-----+            |
|                                                                              |
|                         Code expires in 9:32                                 |
|                                                                              |
|                          [ VERIFY ]                                          |
|                                                                              |
|                   [Resend code] (Disabled)                                   |
|                   Resend available in 5:00                                   |
|                                                                              |
+------------------------------------------------------------------------------+
```

---

### 3.2 Mobile Wireframe (320px-767px)

```
+--------------------------------------+
|  [LOGO]                              |
+--------------------------------------+
|                                      |
|                                      |
|  H1: Verify Your                     |
|      Phone Number                    |
|                                      |
|  We've sent a 6-digit code to        |
|  ****1234                            |
|                                      |
|  Enter the code below to complete    |
|  your registration                   |
|                                      |
|                                      |
|  Enter verification code             |
|                                      |
|  +----+  +----+  +----+              |
|  |    |  |    |  |    |              |
|  | ○  |  | ○  |  | ○  |              |
|  |    |  |    |  |    |              |
|  +----+  +----+  +----+              |
|                                      |
|  +----+  +----+  +----+              |
|  |    |  |    |  |    |              |
|  | ○  |  | ○  |  | ○  |              |
|  |    |  |    |  |    |              |
|  +----+  +----+  +----+              |
|                                      |
|  Code expires in 9:32                |
|                                      |
|                                      |
|  +--------------------------------+  |
|  |    VERIFY                      |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |    Resend code                 |  |
|  +--------------------------------+  |
|                                      |
|  Change phone number                 |
|                                      |
|                                      |
|  Didn't receive a code?              |
|                                      |
|  • Check your SMS app                |
|  • Correct number: ****1234          |
|  • Wait a few minutes                |
|                                      |
|  Still having trouble?               |
|  Contact support                     |
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
| **Mobile** (320px-767px) | 6 boxes in 2 rows (3x2), full-width buttons | Essential elements only |
| **Tablet** (768px-1439px) | 6 boxes in 1 row, centered | Full layout |
| **Desktop** (1440px+) | 6 boxes in 1 row, centered, max-width 600px | Full layout |

### 4.2 OTP Input Design Options

**Option A: 6 Separate Boxes** (Recommended for elderly users)
- Each digit in its own box
- Large boxes: 64x64px on desktop, 56x56px on mobile
- Clear visual separation
- Auto-advance to next box when digit entered

**Option B: Single Masked Input**
- One input field with 6-character mask: "---123" or "○○○123"
- Simpler implementation
- Less visually distinct

**Recommendation**: Option A (6 boxes) for better visual clarity and elderly accessibility

### 4.3 Touch Target Sizes

**Mobile Requirements**:
- Each OTP box: **56x56px minimum**
- Buttons: **56px height**
- Tap area includes padding around boxes

---

## 5. UI States

### 5.1 Loading State (Verification in Progress)

```
+----------------------------------------------------------------------+
|                    [ ⏳ Verifying... ]                                |
+----------------------------------------------------------------------+
```

**Loading Indicators**:
- Button shows spinner + "Verifying..." text
- OTP input disabled (grayed out)
- Timeout: 10 seconds

---

### 5.2 Success State (Code Verified)

**Transition**:
1. User enters correct 6-digit code
2. "Verify" button clicked OR auto-submit
3. Loading spinner shown: "Verifying..."
4. Server validates code
5. Success → Immediate redirect (no success message on this screen)

**Redirect Targets**:
- Care Receiver → `/dashboard` (SCR-CR-001)
- Family Member → `/dashboard` (SCR-CR-001)
- Caregiver → `/caregiver/onboarding` (SCR-CG-002)

---

### 5.3 Error States

#### Invalid Code (Wrong Digits)

```
❌ Invalid code. 2 attempts remaining.
Please check the code and try again.
```

- Red text below OTP boxes
- OTP boxes show red border
- Clear OTP input (user can re-enter)
- Attempt counter decrements

#### Too Many Failed Attempts

```
❌ Too many attempts. Request a new code in 10 minutes.
```

- Red text below OTP boxes
- "Verify" button disabled
- "Resend code" button disabled with cooldown timer
- User must wait 10 minutes before requesting new code

#### Expired Code

```
⚠️ Code expired (10 minutes elapsed)
Please request a new code below.
```

- Yellow/amber warning text
- OTP boxes disabled
- "Verify" button disabled
- "Resend code" button enabled (user must request new code)

#### Rate Limited (Too Many Resend Requests)

```
Resend available in 5:00
```

- Gray text below "Resend code" button
- "Resend code" button disabled
- Countdown timer updates every second
- After countdown reaches 0:00, button re-enabled

---

### 5.4 Countdown Timer Behavior

**Timer Format**:
- 10:00 → 9:59 → 9:58 → ... → 0:01 → 0:00
- Updates every second

**Visual Indicators**:
- >2 minutes: Green or neutral color
- 1-2 minutes: Yellow/amber warning
- <1 minute: Red urgent
- 0:00: "Code expired" (red)

**Expiry Action**:
- When timer reaches 0:00:
  - Stop countdown
  - Display "Code expired" message
  - Disable "Verify" button
  - Enable "Resend code" button

---

## 6. Accessibility Requirements

### 6.1 WCAG 2.1 AA Compliance

#### Perceivable
- **OTP Boxes**:
  - Large, high contrast boxes (4.5:1 border on white)
  - Clear visual separation between boxes
  - Numbers large enough to read: 24px font size minimum

- **Countdown Timer**:
  - Color not sole indicator of urgency (text changes too: "Code expires in X:XX")
  - Red color + text: "Code expired"

- **Error Messages**:
  - Icon + text (not color alone)
  - High contrast (4.5:1 minimum)

#### Operable
- **Keyboard Accessible**:
  - Tab to OTP input (auto-focus on page load)
  - Arrow keys navigate between boxes (if 6-box design)
  - Backspace deletes current digit, moves to previous box
  - Enter submits form (same as clicking "Verify")

- **Touch Targets**:
  - OTP boxes: 56x56px minimum (mobile)
  - Buttons: 56px height minimum

#### Understandable
- **Clear Instructions**:
  - "Enter verification code" label
  - "We've sent a 6-digit code to ****1234"
  - Error messages explain what went wrong and how to fix

- **Predictable**:
  - Timer updates predictably every second
  - Errors appear below OTP boxes (consistent location)

#### Robust
- **Semantic Markup**:
  - OTP input: `role="textbox"`, `inputmode="numeric"`, `pattern="[0-9]*"`
  - Countdown timer: `aria-live="polite"` (announces time remaining)
  - Error messages: `role="alert"`, `aria-live="assertive"`

---

### 6.2 Focus Order

**Tab Order**:
1. Logo
2. OTP input box 1 (auto-focus on page load)
3. OTP input box 2
4. OTP input box 3
5. OTP input box 4
6. OTP input box 5
7. OTP input box 6
8. "Verify" button
9. "Resend code" button
10. "Change phone number" link
11. "Contact support" link
12. Footer links

**Auto-Focus**:
- First OTP box auto-focused on page load (elderly-friendly)

---

### 6.3 Screen Reader Announcements

**Page Load**:
- "Verify your phone number page. We've sent a 6-digit code to [last 4 digits]. Enter the code below to complete your registration."

**OTP Input Focus**:
- "Enter verification code, digit 1 of 6, numeric input"
- "Digit 2 of 6, numeric input"
- ... (repeat for each box)

**Timer Updates**:
- `aria-live="polite"`: Announces every minute: "9 minutes remaining", "8 minutes remaining", etc.
- <1 minute: Announces every 10 seconds: "50 seconds remaining", "40 seconds remaining", etc.
- Expired: "Code expired. Please request a new code."

**Error Announcements**:
- `aria-live="assertive"`: "Error: Invalid code. 2 attempts remaining. Please check the code and try again."
- Too many attempts: "Error: Too many attempts. Request a new code in 10 minutes."

**Success**:
- "Phone verified successfully. Redirecting..." (brief announcement before redirect)

---

## 7. Navigation & Interactions

### 7.1 Primary User Flow

**Happy Path: Successful Verification**

1. User completes registration (SCR-AUTH-001, 002, or 003)
2. Server sends SMS OTP to user's phone
3. User redirected to `/verify/phone`
4. Page loads, first OTP box auto-focused
5. User receives SMS (can take up to 2 minutes)
6. User enters 6-digit code (auto-advance between boxes)
7. User clicks "Verify" OR form auto-submits when 6 digits entered
8. Loading spinner: "Verifying..."
9. Server validates code
10. Success → User's `phone_verified` = true, `status` = active
11. Redirect based on user type:
    - Care Receiver → `/dashboard`
    - Family Member → `/dashboard`
    - Caregiver → `/caregiver/onboarding`

**Estimated Time**: 30 seconds - 2 minutes

---

### 7.2 Alternative Flows

#### Flow 2: Invalid Code (Retry)

1. User enters incorrect 6-digit code
2. User clicks "Verify"
3. Server returns error: "Invalid code"
4. Error message displayed: "Invalid code. 2 attempts remaining."
5. OTP input cleared (or highlighted in red)
6. User re-enters code
7. Repeat until correct code or max attempts reached

#### Flow 3: Code Expired

1. User waits >10 minutes (timer reaches 0:00)
2. Countdown displays: "Code expired"
3. "Verify" button disabled
4. User clicks "Resend code"
5. New SMS OTP sent
6. Timer resets to 10:00
7. User enters new code

#### Flow 4: Too Many Failed Attempts

1. User enters wrong code 3 times
2. Server blocks verification attempts
3. Error: "Too many attempts. Request a new code in 10 minutes."
4. "Verify" button disabled
5. "Resend code" button disabled with 10-minute cooldown
6. User waits 10 minutes
7. "Resend code" button re-enabled
8. User requests new code

#### Flow 5: Didn't Receive SMS

1. User waits 2+ minutes, no SMS received
2. User clicks "Resend code"
3. Server sends new SMS OTP
4. Timer resets to 10:00
5. User receives SMS
6. User enters code

#### Flow 6: Change Phone Number

1. User realizes phone number is wrong
2. User clicks "Change phone number" link
3. Confirmation modal: "Are you sure you want to change your phone number? You'll need to start registration again."
4. User confirms
5. Return to registration screen (SCR-AUTH-001, 002, or 003)
6. Pre-fill existing data (except phone number)
7. User updates phone number
8. Re-submit registration → New SMS sent

---

### 7.3 Interaction Patterns

#### OTP Input Behavior (6-Box Design)

```javascript
ON DIGIT ENTRY:
  - If box is empty:
      - Insert digit
      - Auto-advance to next box
  - If box has digit (overwrite mode):
      - Replace existing digit
      - Auto-advance to next box

ON BACKSPACE:
  - If current box has digit:
      - Clear digit
      - Stay in current box
  - If current box is empty:
      - Move to previous box
      - Clear previous box's digit

ON PASTE (clipboard contains "543219"):
  - Auto-populate all 6 boxes: "5" "4" "3" "2" "1" "9"
  - Focus moves to last box

ON AUTO-SUBMIT (all 6 boxes filled):
  - Automatically trigger "Verify" button click (optional)
  - Prevents need to click button
```

#### Countdown Timer Updates

```javascript
EVERY SECOND:
  - Decrement timer by 1 second
  - Update display: "9:32" → "9:31"

WHEN TIMER REACHES 0:00:
  - Stop countdown
  - Display "Code expired"
  - Disable "Verify" button
  - Enable "Resend code" button
  - Announce to screen reader: "Code expired. Please request a new code."
```

---

## 8. Design Notes

### 8.1 Design Principles Applied

**1. Simplicity**
- Single purpose: Verify phone number
- Clear visual focus: 6 large OTP boxes
- Minimal distractions

**2. Accessibility First**
- Large OTP boxes (64px desktop, 56px mobile)
- High contrast
- Auto-focus on first box (elderly-friendly)
- Screen reader announcements for timer and errors

**3. Error Prevention**
- Clear instructions: "We've sent a 6-digit code to ****1234"
- Real-time countdown timer (user knows how much time left)
- Rate limiting prevents spam (max 3 resends per hour)
- Auto-advance between boxes (reduces user effort)

**4. Trust-Building**
- Masked phone number shows last 4 digits (confirms correct number)
- Countdown timer creates urgency but not panic (10 minutes is generous)
- Help text explains common issues ("Didn't receive a code?")

**5. Safeguarding**
- Phone verification is mandatory (cannot be skipped)
- Rate limiting prevents abuse
- Failed attempt tracking (max 3 attempts per code)

---

### 8.2 Content Hierarchy

**Visual Hierarchy**:
1. **H1**: "Verify Your Phone Number" (largest)
2. **Subtitle**: "We've sent a 6-digit code to ****1234" (medium)
3. **OTP Input Boxes**: Largest, most prominent UI element (64x64px)
4. **Countdown Timer**: Medium, below OTP boxes
5. **Verify Button**: Large, primary CTA
6. **Resend Button**: Secondary CTA
7. **Help Text**: Smallest, bottom of page

---

### 8.3 Component Reuse

**Shared Components**:
- Header (minimal, logo only)
- Footer (minimal, legal links)
- Button (primary and secondary variants)

**New Components**:
- **OTP Input**: 6-box numeric input (reusable for future 2FA features)
- **Countdown Timer**: Real-time updating timer component

---

## 9. Cross-References

### Source Documents

**Route Map**:
- `/docs/product/tier1-route-map.md` - SCR-AUTH-004 definition (lines 152, 273-284)

**Screen Inventory**:
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` - SCR-AUTH-004 detailed spec (lines 200-240)

**Related Screens**:
- SCR-AUTH-001: Care Receiver Registration (entry point)
- SCR-AUTH-002: Family Member Registration (entry point)
- SCR-AUTH-003: Caregiver Registration (entry point)
- SCR-CR-001: Care Receiver Dashboard (exit point for care receivers)
- SCR-CG-002: Caregiver Onboarding (exit point for caregivers)

---

## 10. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-08 | UX Designer | Initial wireframes and element inventory for Figma handoff |

---

**END OF DOCUMENT**

**Status**: ✅ READY FOR FIGMA HANDOFF
