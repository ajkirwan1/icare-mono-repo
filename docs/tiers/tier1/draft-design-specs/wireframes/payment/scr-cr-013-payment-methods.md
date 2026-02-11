# Payment Methods Wireframes (SCR-CR-013)

**Document Purpose**: ASCII wireframes and complete element inventory for Payment Methods (SCR-CR-013)

**Screen ID**: SCR-CR-013
**Screen Name**: Payment Methods
**User Role**: Care Receiver, Family Member
**Route**: `/settings/payment`
**R0/R1**: R0
**Created**: 2026-02-11
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

The Payment Methods screen allows care receivers and family members to add, manage, and set default payment cards for booking payments. Card data is handled entirely by Stripe Elements (PCI-DSS compliant) — the platform never stores raw card numbers.

**Key Functions**:
- View saved payment methods (card brand, last 4 digits, expiry, default status)
- Add a new payment method via Stripe Elements secure input
- Set a card as the default payment method
- Remove a saved card (with confirmation)
- Display expired card warnings

### 1.2 Entry Points

- SCR-CR-001 (Care Receiver Dashboard) → "Manage Payment Methods" link
- SCR-CR-006 (Booking Request Form) → "Add Payment Method" if no card on file
- SCR-CR-017 (Account Settings) → Payment section link

### 1.3 Exit Points

- "Back to Dashboard" → SCR-CR-001 (Care Receiver Dashboard)
- Return to booking flow → SCR-CR-006 (if entered from booking)

---

## 2. Element Inventory

### 2.1 Content Blocks

#### Block 1: Navigation Header (Authenticated)
- **Purpose**: Standard authenticated navigation
- **Priority**: Secondary
- **Elements**:
  - Platform logo (left-aligned) → Dashboard
  - Navigation links: Find Caregivers, My Bookings, Messages
  - User avatar + name dropdown (right-aligned)

#### Block 2: Page Header
- **Purpose**: Set context for payment management
- **Priority**: Primary
- **Elements**:
  - Breadcrumb: Dashboard > Settings > Payment Methods
  - H1: "Payment Methods"
  - Subtitle: "Manage your payment cards for booking payments"

#### Block 3: Saved Cards List
- **Purpose**: Display existing payment methods
- **Priority**: Primary
- **Elements** (per card):
  - Card brand icon (Visa, Mastercard, Amex)
  - Card number: "•••• •••• •••• 1234"
  - Expiry date: "Expires 03/27"
  - "Default" badge (green, if default)
  - "Expired" badge (red, if expired within 30 days or already expired)
  - Actions:
    - "Set as Default" button (if not default)
    - "Remove" button (destructive, with confirmation)

#### Block 4: Add Payment Method Section
- **Purpose**: Secure card input via Stripe Elements
- **Priority**: Primary
- **Elements**:
  - "Add Payment Method" button (opens form)
  - Stripe Elements secure card form:
    - Card number (Stripe iframe)
    - Expiry date MM/YY (Stripe iframe)
    - CVC (Stripe iframe)
    - Cardholder name (text input)
    - Billing postcode (text input, UK format)
  - "Save Card" button (primary)
  - "Cancel" button (secondary)
  - Security notice: "Your card details are securely processed by Stripe. We never store your full card number."
  - Lock icon + "256-bit Encrypted" trust badge

#### Block 5: Empty State
- **Purpose**: Guide users who have no cards saved
- **Priority**: Primary (when no cards)
- **Elements**:
  - Icon: Credit card illustration
  - H2: "No payment methods"
  - Text: "Add a payment card to make bookings with caregivers."
  - "Add Payment Method" button (primary, prominent)

#### Block 6: Footer
- Standard authenticated footer

---

### 2.2 Interactive Elements

#### Primary Actions
1. **"Add Payment Method" button** → Opens Stripe Elements form
2. **"Save Card" button** → Tokenise card via Stripe, save to account
3. **"Set as Default" button** → Update default payment method
4. **"Remove" button** → Opens confirmation modal

#### Secondary Actions
5. **"Cancel" button** → Close add card form
6. **"Back to Dashboard" link** → Navigate to SCR-CR-001

---

### 2.3 Validation Rules

| Field | Validation Rule | Error Message |
|-------|-----------------|---------------|
| Card Number | Required, valid card (Stripe validates) | "Please enter a valid card number" |
| Expiry Date | Required, not expired (Stripe validates) | "Please enter a valid expiry date" |
| CVC | Required, 3-4 digits (Stripe validates) | "Please enter a valid security code" |
| Cardholder Name | Required, 2-100 chars | "Please enter the cardholder name" |
| Billing Postcode | Required, valid UK postcode | "Please enter a valid UK postcode" |

---

## 3. ASCII Wireframes

### 3.1 Desktop Wireframe (1440px+)

#### Cards Loaded State

```
+------------------------------------------------------------------------------+
|  [LOGO]    Find Caregivers  My Bookings  Messages         [Avatar] Jane ▼   |
+------------------------------------------------------------------------------+
|                                                                              |
|  Dashboard > Settings > Payment Methods                                      |
|                                                                              |
|                    H1: Payment Methods                                       |
|            Manage your payment cards for booking payments                     |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  SAVED CARDS                                                           |  |
|  |                                                                        |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  |  [VISA]  •••• •••• •••• 4242    Expires 03/27    DEFAULT         |  |  |
|  |  |                                              [Set as Default] [Remove] |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  |  [MC]    •••• •••• •••• 8765    Expires 01/26    ⚠️ EXPIRED      |  |  |
|  |  |                                              [Set as Default] [Remove] |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|                      [ + ADD PAYMENT METHOD ]                                |
|                                                                              |
+------------------------------------------------------------------------------+
| Terms | Privacy | Safeguarding | Contact | © 2026 Platform Name              |
+------------------------------------------------------------------------------+
```

#### Adding Card State

```
+------------------------------------------------------------------------------+
|  [LOGO]    Find Caregivers  My Bookings  Messages         [Avatar] Jane ▼   |
+------------------------------------------------------------------------------+
|                                                                              |
|  Dashboard > Settings > Payment Methods                                      |
|                                                                              |
|                    H1: Payment Methods                                       |
|                                                                              |
|  [Saved cards list...]                                                       |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  ADD NEW CARD                                                          |  |
|  |                                                                        |  |
|  |  Card number *                                                         |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | [Stripe Elements secure input]                                   |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  Expiry date *                 CVC *                                   |  |
|  |  +---------------------------+  +---------------------------+          |  |
|  |  | MM / YY                   |  | CVC                       |          |  |
|  |  +---------------------------+  +---------------------------+          |  |
|  |                                                                        |  |
|  |  Cardholder name *                                                     |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | e.g., Jane Smith                                                 |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  Billing postcode *                                                    |  |
|  |  +------------------------------------------------------------------+  |  |
|  |  | e.g., SW1A 1AA                                                   |  |  |
|  |  +------------------------------------------------------------------+  |  |
|  |                                                                        |  |
|  |  🔒 Your card details are securely processed by Stripe.                |  |
|  |     We never store your full card number.                              |  |
|  |                                                                        |  |
|  |              [ SAVE CARD ]    [ Cancel ]                               |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
+------------------------------------------------------------------------------+
```

---

### 3.2 Mobile Wireframe (320px-767px)

```
+--------------------------------------+
|  [LOGO]                    [Avatar]  |
+--------------------------------------+
|                                      |
|  ← Back to Dashboard                 |
|                                      |
|  H1: Payment Methods                 |
|  Manage your payment cards           |
|                                      |
|  +--------------------------------+  |
|  |  [VISA] •••• 4242              |  |
|  |  Expires 03/27  DEFAULT        |  |
|  |  [Set as Default] [Remove]     |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  [MC] •••• 8765                |  |
|  |  Expires 01/26  ⚠️ EXPIRED     |  |
|  |  [Set as Default] [Remove]     |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |    + ADD PAYMENT METHOD        |  |
|  +--------------------------------+  |
|                                      |
+--------------------------------------+
| Terms | Privacy | Safeguarding       |
| © 2026 Platform Name                |
+--------------------------------------+
```

---

## 4. Responsive Behavior

### 4.1 Breakpoints

| Viewport | Layout Changes |
|----------|----------------|
| **Mobile** (320px-767px) | Single column, full-width cards, stacked expiry/CVC fields |
| **Tablet** (768px-1439px) | Centered card list, max-width 700px |
| **Desktop** (1440px+) | Centered card list, max-width 700px, side-by-side expiry/CVC |

### 4.2 Touch Target Sizes

- Buttons: **56px height** on mobile
- Card action buttons: **44px minimum** touch target
- Stripe Elements inputs: **56px height**

---

## 5. UI States

### 5.1 Empty State

```
+----------------------------------------------------------------------+
|                                                                      |
|                     💳                                                |
|                                                                      |
|              No payment methods                                      |
|     Add a payment card to make bookings with caregivers.             |
|                                                                      |
|                [ + ADD PAYMENT METHOD ]                               |
|                                                                      |
+----------------------------------------------------------------------+
```

### 5.2 Processing State

```
+----------------------------------------------------------------------+
|                    [ ⏳ Saving card... ]                               |
+----------------------------------------------------------------------+
```
- All form fields disabled
- Spinner on Save Card button

### 5.3 Success State

```
+----------------------------------------------------------------------+
|  ✅  Card added successfully                                    [X]  |
+----------------------------------------------------------------------+
```
- Success banner at top of card list
- New card appears in list
- Add card form closes

### 5.4 Error State

```
+----------------------------------------------------------------------+
|  ❌  Unable to save card. Please check your details and try again.   |
+----------------------------------------------------------------------+
```

### 5.5 Remove Card Confirmation Modal

```
+----------------------------------------------------------------------+
|                                                                      |
|              Remove payment method?                                  |
|                                                                      |
|    Are you sure you want to remove the card ending in 4242?          |
|    This action cannot be undone.                                     |
|                                                                      |
|              [ REMOVE ]    [ Cancel ]                                |
|                                                                      |
+----------------------------------------------------------------------+
```

### 5.6 Expired Card Warning

```
+----------------------------------------------------------------------+
|  ⚠️  Your card ending in 8765 has expired. Please update or remove   |
|      this card and add a new one to continue making bookings.        |
+----------------------------------------------------------------------+
```

---

## 6. Accessibility Requirements

### 6.1 WCAG 2.1 AA Compliance

- All form inputs have visible labels
- Stripe Elements meet WCAG AA contrast requirements
- Card brand icons have alt text ("Visa card", "Mastercard card")
- "Default" and "Expired" badges have screen reader text
- Confirmation modal traps focus

### 6.2 Focus Order

1. Skip to main content
2. Navigation header links
3. Breadcrumb links
4. First saved card actions (Set as Default, Remove)
5. Second saved card actions
6. Add Payment Method button
7. (When form open) Card number, Expiry, CVC, Name, Postcode, Save, Cancel
8. Footer links

### 6.3 Screen Reader Announcements

- **Page Load**: "Payment Methods page. You have 2 saved payment methods."
- **Card Added**: "Card added successfully. Visa card ending in 4242."
- **Card Removed**: "Card removed. Mastercard ending in 8765 has been removed."
- **Error**: "Error: Unable to save card. Please check your details."
- **Modal Open**: "Confirmation dialog. Remove payment method ending in 4242?"

---

## 7. Navigation & Interactions

### 7.1 Primary User Flow

**Happy Path: Add Payment Method**

1. User navigates to `/settings/payment`
2. User clicks "Add Payment Method"
3. Stripe Elements card form appears
4. User enters card details
5. User clicks "Save Card"
6. Stripe tokenises card (no raw data sent to platform)
7. Platform saves Stripe payment method token
8. Success banner: "Card added successfully"
9. Card appears in saved list

### 7.2 Alternative Flows

#### Flow 2: Set Default Card
1. User clicks "Set as Default" on a non-default card
2. Card becomes default (badge updates)
3. Previous default loses badge

#### Flow 3: Remove Card
1. User clicks "Remove" on a card
2. Confirmation modal appears
3. User confirms removal
4. Card removed from list
5. If removed card was default, prompt to set new default

---

## 8. Compliance & GDPR

### 8.1 PCI-DSS Compliance

- **No raw card data** stored on platform servers
- All card input handled by **Stripe Elements** (PCI-DSS Level 1 compliant)
- Only Stripe token, card brand, last 4 digits, and expiry stored
- Stripe handles all card validation and tokenisation

### 8.2 GDPR

- **Lawful basis**: Contract (payment processing for booked services)
- **Data minimisation**: Only store tokenised reference, not full card details
- **Right to erasure**: User can remove payment methods at any time
- **Transparency**: Clear notice about Stripe processing

---

## 9. Design Notes

### 9.1 Design Principles

**1. Security First**: Prominent lock icon and encryption notice. Stripe branding visible.
**2. Simplicity**: Clear list of cards with obvious actions.
**3. Trust**: "Powered by Stripe" badge builds confidence in payment security.

### 9.2 Component Reuse

- Navigation header (authenticated variant)
- Footer (authenticated variant)
- Button (primary, secondary, destructive)
- Alert banner (success, error, warning)
- Modal (confirmation)
- Breadcrumb
- Trust badge row (security)

---

## 10. Cross-References

### Source Documents
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` — SCR-CR-013
- `/docs/product/tier1-route-map.md` — Route definition
- `/docs/technical/stripe-integration-spec.md` — Stripe integration

### Related Screens
- SCR-CR-001: Care Receiver Dashboard (entry point)
- SCR-CR-006: Booking Request Form (entry point if no card)
- SCR-CG-020: Payout Setup (caregiver equivalent)

---

## 11. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-11 | UX Designer | Initial wireframes and element inventory |

---

**END OF DOCUMENT**

**Status**: READY FOR FIGMA HANDOFF
