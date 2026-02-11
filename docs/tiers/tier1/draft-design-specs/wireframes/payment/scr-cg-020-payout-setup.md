# Payout Setup Wireframes (SCR-CG-020)

**Document Purpose**: ASCII wireframes and complete element inventory for Payout Setup via Stripe Connect (SCR-CG-020)

**Screen ID**: SCR-CG-020
**Screen Name**: Payout Setup (Stripe Connect)
**User Role**: Caregiver
**Route**: `/caregiver/earnings/setup`
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

The Payout Setup screen enables caregivers to connect their bank account via Stripe Connect so they can receive earnings from completed bookings. Stripe handles all KYC verification and bank account validation.

**Key Functions**:
- Initiate Stripe Connect onboarding (iframe or redirect)
- Display connected bank account summary
- Show earnings summary and payout timeline
- Allow updating payout method
- Display warning when bank not connected

### 1.2 Entry Points

- SCR-CG-001 (Caregiver Dashboard) → Earnings section or "Set up payouts" prompt
- SCR-CG-013 (After accepting first booking) → Prompt to set up payouts

### 1.3 Exit Points

- "Back to Dashboard" → SCR-CG-001 (Caregiver Dashboard)

---

## 2. Element Inventory

### 2.1 Content Blocks

#### Block 1: Navigation Header (Authenticated — Caregiver)
- **Purpose**: Standard caregiver navigation
- **Elements**:
  - Platform logo → Dashboard
  - Navigation: My Bookings, Messages, Availability
  - User avatar + name dropdown

#### Block 2: Page Header
- **Elements**:
  - Breadcrumb: Dashboard > Earnings > Payout Setup
  - H1: "Payout Setup"
  - Subtitle: "Connect your bank account to receive earnings from bookings"

#### Block 3: Warning Banner (if bank not connected)
- **Elements**:
  - Warning alert (yellow): "You need to add a bank account to receive payouts. Set up your payout method to start earning."

#### Block 4: Payout Status Card
- **Purpose**: Show current payout connection status
- **Elements** (when connected):
  - "Connected" status badge (green)
  - Bank name (e.g., "Barclays")
  - Account ending: "•••• 5678"
  - "Update Payout Method" button
- **Elements** (when not connected):
  - "Not Connected" status badge (grey)
  - "Set Up Payouts" button (primary, prominent)

#### Block 5: Earnings Summary
- **Purpose**: Show earnings overview
- **Elements**:
  - Total earned: "£0.00" (or actual amount)
  - Pending payouts: "£0.00"
  - Next payout: "No payouts scheduled" (or date)
  - Payout schedule info: "Payouts arrive within 2-3 business days after booking completion"

#### Block 6: Commission Information
- **Purpose**: Transparency about platform fees
- **Elements**:
  - Info box (blue background):
    - "Platform commission: 15% of your hourly rate"
    - "This covers payment processing, insurance, and platform services."
    - "You'll receive 85% of each booking total."

#### Block 7: Self-Employed Tax Guidance
- **Purpose**: Legal compliance reminder
- **Elements**:
  - Info text: "As a self-employed professional, you are responsible for reporting your earnings to HMRC."
  - Link: "Learn about self-employment tax obligations" → external HMRC guidance

#### Block 8: Stripe Connect Onboarding (when active)
- **Purpose**: Secure bank account connection
- **Elements**:
  - Stripe-hosted onboarding iframe or redirect notice
  - "You'll be redirected to Stripe to securely add your bank details."
  - Security notice: "Your bank details are handled by Stripe. We never see your full account number."
  - Lock icon + "Powered by Stripe" badge

#### Block 9: Footer
- Standard authenticated footer

---

### 2.2 Interactive Elements

1. **"Set Up Payouts" button** → Initiates Stripe Connect onboarding
2. **"Update Payout Method" button** → Opens Stripe account management
3. **"Back to Dashboard" link** → SCR-CG-001

---

## 3. ASCII Wireframes

### 3.1 Desktop Wireframe (1440px+)

#### Not Connected State

```
+------------------------------------------------------------------------------+
|  [LOGO]    My Bookings  Messages  Availability          [Avatar] Emma ▼     |
+------------------------------------------------------------------------------+
|                                                                              |
|  Dashboard > Earnings > Payout Setup                                         |
|                                                                              |
|                      H1: Payout Setup                                        |
|          Connect your bank account to receive earnings from bookings         |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  ⚠️  You need to add a bank account to receive payouts.                |  |
|  |     Set up your payout method to start earning.                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  PAYOUT STATUS                                                         |  |
|  |                                                                        |  |
|  |  Status: ⚪ Not Connected                                              |  |
|  |                                                                        |  |
|  |                   [ SET UP PAYOUTS ]                                   |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  EARNINGS SUMMARY                                                      |  |
|  |                                                                        |  |
|  |  Total Earned         Pending Payouts        Next Payout               |  |
|  |  £0.00                £0.00                   No payouts scheduled      |  |
|  |                                                                        |  |
|  |  Payouts arrive within 2-3 business days after booking completion.     |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  ℹ️  Platform commission: 15% of your hourly rate                      |  |
|  |     This covers payment processing, insurance, and platform services.  |  |
|  |     You'll receive 85% of each booking total.                          |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  As a self-employed professional, you are responsible for reporting your      |
|  earnings to HMRC. Learn about self-employment tax obligations →             |
|                                                                              |
+------------------------------------------------------------------------------+
| Terms | Privacy | Safeguarding | Contact | © 2026 Platform Name              |
+------------------------------------------------------------------------------+
```

#### Connected State

```
+------------------------------------------------------------------------------+
|  [LOGO]    My Bookings  Messages  Availability          [Avatar] Emma ▼     |
+------------------------------------------------------------------------------+
|                                                                              |
|  Dashboard > Earnings > Payout Setup                                         |
|                                                                              |
|                      H1: Payout Setup                                        |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  PAYOUT STATUS                                                         |  |
|  |                                                                        |  |
|  |  Status: 🟢 Connected                                                  |  |
|  |  Bank: Barclays                                                        |  |
|  |  Account: •••• 5678                                                    |  |
|  |                                                                        |  |
|  |                [ UPDATE PAYOUT METHOD ]                                 |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  EARNINGS SUMMARY                                                      |  |
|  |                                                                        |  |
|  |  Total Earned         Pending Payouts        Next Payout               |  |
|  |  £245.00              £35.00                  14 Feb 2026               |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 3.2 Mobile Wireframe (320px-767px)

```
+--------------------------------------+
|  [LOGO]                    [Avatar]  |
+--------------------------------------+
|                                      |
|  ← Back to Dashboard                 |
|                                      |
|  H1: Payout Setup                    |
|  Connect your bank account           |
|                                      |
|  +--------------------------------+  |
|  |  ⚠️  Add a bank account to     |  |
|  |     receive payouts.           |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  PAYOUT STATUS                 |  |
|  |  ⚪ Not Connected               |  |
|  |                                |  |
|  |  +----------------------------+|  |
|  |  |   SET UP PAYOUTS           ||  |
|  |  +----------------------------+|  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  EARNINGS                      |  |
|  |  Total Earned: £0.00           |  |
|  |  Pending: £0.00                |  |
|  |  Next Payout: --               |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  ℹ️  Commission: 15%           |  |
|  |     You receive 85% of each   |  |
|  |     booking total.            |  |
|  +--------------------------------+  |
|                                      |
+--------------------------------------+
| Terms | Privacy | © 2026             |
+--------------------------------------+
```

---

## 4. Responsive Behavior

| Viewport | Layout Changes |
|----------|----------------|
| **Mobile** (320px-767px) | Single column, stacked earnings metrics |
| **Tablet** (768px-1439px) | Centered layout, max-width 700px |
| **Desktop** (1440px+) | Centered layout, max-width 700px, horizontal earnings metrics |

---

## 5. UI States

### 5.1 Stripe Connect Loading

```
+----------------------------------------------------------------------+
|  Connecting to Stripe...                                              |
|  [Loading spinner]                                                    |
|  You'll be redirected to securely add your bank details.              |
+----------------------------------------------------------------------+
```

### 5.2 Verification Failed

```
+----------------------------------------------------------------------+
|  ❌  Unable to verify your bank account. Please check your details    |
|      or contact support for assistance.                               |
|                                              [ TRY AGAIN ]           |
+----------------------------------------------------------------------+
```

### 5.3 KYC Required

```
+----------------------------------------------------------------------+
|  ⚠️  Additional verification required by Stripe.                     |
|      Please complete identity verification to activate payouts.       |
|                                     [ COMPLETE VERIFICATION ]         |
+----------------------------------------------------------------------+
```

---

## 6. Accessibility Requirements

### 6.1 Focus Order

1. Skip to main content
2. Navigation links
3. Warning banner (if present)
4. Payout status section
5. Set Up Payouts / Update button
6. Earnings summary
7. Commission info
8. Tax guidance link
9. Footer links

### 6.2 Screen Reader Announcements

- **Page Load (not connected)**: "Payout Setup page. Bank account not connected. Set up payouts to receive earnings."
- **Page Load (connected)**: "Payout Setup page. Connected to Barclays account ending in 5678."
- **Setup Complete**: "Bank account connected successfully. You'll receive payouts within 2-3 business days."
- **Error**: "Error: Unable to verify bank account."

---

## 7. Navigation & Interactions

### 7.1 Primary User Flow

1. Caregiver navigates to `/caregiver/earnings/setup`
2. Sees "Not Connected" status with warning banner
3. Clicks "Set Up Payouts"
4. Redirected to Stripe Connect hosted onboarding
5. Enters bank details on Stripe's secure form
6. Stripe verifies account
7. Redirected back to payout setup page
8. Status shows "Connected" with bank summary
9. Warning banner disappears

---

## 8. Compliance & GDPR

### 8.1 Financial Data

- Bank details handled entirely by **Stripe Connect** (PCI-DSS Level 1)
- Platform only stores Stripe Connect account ID, not raw bank details
- Stripe handles KYC/AML verification

### 8.2 Self-Employment

- Commission rate (15%) displayed transparently per GDPR requirements
- Self-employed tax guidance provided (link to HMRC)
- Platform operates as Introduction Agency, not employer

---

## 9. Design Notes

### 9.1 Design Principles

**1. Transparency**: Clear commission rate and earnings breakdown.
**2. Security**: "Powered by Stripe" branding. No raw bank data visible.
**3. Guidance**: Step-by-step flow with clear next actions.

### 9.2 Component Reuse

- Navigation header (caregiver variant)
- Alert banner (warning, info)
- Status badge (connected/not connected)
- Button (primary)
- Info box (commission details)
- Breadcrumb
- Footer

---

## 10. Cross-References

- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` — SCR-CG-020
- `/docs/technical/stripe-integration-spec.md` — Stripe Connect architecture
- SCR-CR-013: Payment Methods (care receiver equivalent)
- SCR-CG-001: Caregiver Dashboard (entry point)

---

## 11. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-11 | UX Designer | Initial wireframes and element inventory |

---

**END OF DOCUMENT**

**Status**: READY FOR FIGMA HANDOFF
