# Stripe Integration Specification - Tier 1 UK Elderly Care Marketplace

**Document Purpose**: Complete technical specification for Stripe integration covering payments, payouts, identity verification, and commission handling for the Tier 1 companionship-only marketplace.

**Document Owner**: Technical Architect
**Created**: 2026-02-06
**Status**: CANONICAL
**Tier**: Tier 1 (Companionship MVP)

---

## Table of Contents

1. [Integration Overview](#1-integration-overview)
2. [Stripe Connect Setup](#2-stripe-connect-setup)
3. [Payment Flow](#3-payment-flow)
4. [Stripe Identity Integration](#4-stripe-identity-integration)
5. [Webhook Events](#5-webhook-events)
6. [Commission Handling](#6-commission-handling)
7. [Refund Handling](#7-refund-handling)
8. [Error Handling](#8-error-handling)
9. [Testing](#9-testing)
10. [Security](#10-security)
11. [Environment Variables](#11-environment-variables)
12. [Code Examples](#12-code-examples)

---

## 1. Integration Overview

### 1.1 Stripe Products Used

The platform integrates three primary Stripe products:

| Stripe Product | Purpose | Implementation |
|---------------|---------|----------------|
| **Stripe Payments** | Care receiver payment collection (booking payments) | Payment Intents API |
| **Stripe Connect (Express)** | Caregiver payouts and commission handling | Connect Express accounts |
| **Stripe Identity** | Automated caregiver identity verification | Identity Verification Sessions |

### 1.2 Account Structure

```
Platform Account (icare-app.co.uk)
    |
    |-- Stripe Account (Platform)
    |   |-- Receives payments from care receivers
    |   |-- Deducts platform commission
    |   |-- Transfers net earnings to caregivers
    |
    |-- Connected Accounts (Caregivers)
        |-- Caregiver 1 (Express Account)
        |-- Caregiver 2 (Express Account)
        |-- Caregiver 3 (Express Account)
        |-- ...
```

**Account Type**: **Stripe Connect Express Accounts** (Recommended for Tier 1)

**Rationale**:
- Express accounts have simpler onboarding than Custom accounts
- Stripe handles most compliance (KYC, tax reporting)
- Caregivers can access Stripe Dashboard directly
- Lower development complexity
- UK bank account support built-in
- Tax reporting (1099/equivalent) handled by Stripe

### 1.3 Money Flow Diagram

```
Care Receiver                Platform                 Caregiver
     |                          |                          |
     |  1. Request Booking      |                          |
     |------------------------->|                          |
     |                          |                          |
     |  2. Authorize £63        |                          |
     |  (PaymentIntent)         |                          |
     |<-------------------------|                          |
     |  (Funds HELD on card)    |                          |
     |                          |                          |
     |                          |  3. Caregiver Accepts    |
     |                          |<-------------------------|
     |                          |                          |
     |  4. Capture £63          |                          |
     |  (Charge card)           |                          |
     |------------------------->|                          |
     |                          |  (Funds to platform)     |
     |                          |                          |
     |  5. Service Completed    |                          |
     |                          |<-------------------------|
     |                          |                          |
     |  6. Confirm Completion   |                          |
     |------------------------->|                          |
     |                          |                          |
     |                          |  7. Transfer £51         |
     |                          |  (Application Fee: £9)   |
     |                          |------------------------->|
     |                          |  (Caregiver bank account)|
     |                          |                          |
     |  Platform retains:       |  Caregiver receives:     |
     |  £3 (service fee) +      |  £51 (after commission)  |
     |  £9 (commission) = £12   |                          |
```

**Key Concepts**:
- **Authorize** (Step 2): Funds held on care receiver's card, not charged yet
- **Capture** (Step 4): Funds actually charged and transferred to platform account
- **Application Fee** (Step 7): Platform commission deducted from transfer to caregiver
- **Escrow Period**: Funds held on platform account between capture and payout (48-hour confirmation window)

---

## 2. Stripe Connect Setup

### 2.1 Express vs Custom Accounts Comparison

| Feature | Express (Recommended) | Custom | Rationale for Express |
|---------|----------------------|--------|----------------------|
| **Onboarding Complexity** | Simple (Stripe-hosted) | Complex (custom UI) | Faster development |
| **Compliance Burden** | Stripe handles | Platform handles | Reduced liability |
| **Customization** | Limited | Full control | Acceptable for Tier 1 |
| **Caregiver Dashboard** | Stripe Dashboard | Custom dashboard | Caregivers want Stripe brand trust |
| **Tax Reporting** | Stripe handles | Platform handles | Simplified operations |
| **Bank Account Setup** | Stripe UI | Custom UI | Stripe validates accounts |
| **Development Time** | 1-2 weeks | 4-6 weeks | Speed to market |

**Decision**: Use **Stripe Connect Express** for Tier 1. Consider Custom accounts at Tier 3+ if branding/control becomes critical.

### 2.2 Caregiver Onboarding Flow

**Step 1: Create Connected Account**

When caregiver completes profile:

```javascript
// Backend API endpoint: POST /api/v1/caregivers/me/connect-onboarding
const account = await stripe.accounts.create({
  type: 'express',
  country: 'GB',
  email: caregiver.email,
  capabilities: {
    card_payments: { requested: true },
    transfers: { requested: true }
  },
  business_type: 'individual', // Caregivers are self-employed individuals
  individual: {
    first_name: caregiver.firstName,
    last_name: caregiver.lastName,
    email: caregiver.email,
    phone: caregiver.phone
  },
  business_profile: {
    mcc: '8099', // Medical Services and Health Practitioners
    product_description: 'Companionship and light care services'
  },
  settings: {
    payouts: {
      schedule: {
        interval: 'manual' // Platform controls payout timing
      }
    }
  }
});

// Save Stripe account ID to caregiver record
await db.caregivers.update(caregiver.id, {
  stripe_connect_account_id: account.id
});
```

**Step 2: Generate Onboarding Link**

```javascript
const accountLink = await stripe.accountLinks.create({
  account: account.id,
  refresh_url: 'https://app.icare-app.co.uk/caregiver/onboarding/refresh',
  return_url: 'https://app.icare-app.co.uk/caregiver/onboarding/complete',
  type: 'account_onboarding'
});

// Redirect caregiver to Stripe-hosted onboarding
return { onboarding_url: accountLink.url };
```

**Step 3: Stripe-Hosted Onboarding**

Caregiver completes Stripe onboarding form:
- UK bank account details (sort code + account number)
- Date of birth (for identity verification)
- National Insurance number (for tax purposes)
- Business details (self-employed sole trader)
- Terms of Service acceptance

**Step 4: Verify Onboarding Completion**

```javascript
// Webhook: account.updated
// Or poll endpoint: GET /api/v1/caregivers/me/connect-status
const account = await stripe.accounts.retrieve(caregiver.stripe_connect_account_id);

if (account.charges_enabled && account.payouts_enabled) {
  // Onboarding complete - caregiver can receive payouts
  await db.caregivers.update(caregiver.id, {
    stripe_onboarding_complete: true
  });
}
```

### 2.3 Connected Account Requirements

**UK Bank Account Requirements**:
- Sort code (6 digits)
- Account number (8 digits)
- Account holder name must match caregiver profile name

**Identity Verification Requirements** (Stripe handles):
- Date of birth
- National Insurance number OR passport number
- Address (for identity confirmation)

**Tax Requirements** (Stripe handles):
- Self-Assessment UTR (if applicable)
- National Insurance number
- Tax residence confirmation

### 2.4 Payout Schedule

**Platform Control**: Manual payout schedule

**Payout Trigger**: Booking completion + care receiver confirmation (or 48-hour auto-confirm)

**Payout Timing**:
- Platform initiates payout after confirmation window closes
- Funds transfer from platform account to caregiver account: Instant
- Funds arrive in caregiver bank account: 2-3 business days (Stripe Standard)

**Example Timeline**:
```
Day 1: Booking completed at 5pm
Day 2: 48-hour confirmation window opens
Day 3 (5pm): Confirmation window closes, payment released
Day 3 (5:01pm): Platform creates Stripe Transfer
Day 3 (5:01pm): Funds instantly in caregiver Stripe balance
Day 5-6: Funds arrive in caregiver bank account
```

**Payout Schedule Options** (future enhancement):
- **Daily**: Automatic daily payouts for all confirmed bookings
- **Weekly**: Payouts every Friday
- **Monthly**: Payouts on 1st of month
- **On-Demand**: Caregiver requests payout (Instant Payout feature, 1% fee)

### 2.5 Connected Account Dashboard Access

**Caregiver Access**: Caregivers can access Stripe Express Dashboard via login link

```javascript
// Backend API endpoint: GET /api/v1/caregivers/me/stripe-dashboard-link
const loginLink = await stripe.accounts.createLoginLink(
  caregiver.stripe_connect_account_id
);

return { dashboard_url: loginLink.url };
```

**Dashboard Features** (Stripe-provided):
- View balance and payout history
- Update bank account details
- View transaction history
- Download tax documents
- Manage notification preferences

---

## 3. Payment Flow

### 3.1 Step 1: Care Receiver Adds Payment Method (SetupIntent)

**Purpose**: Save payment method for future bookings without charging

**When**: Care receiver creates account or adds new card

```javascript
// Frontend: POST /api/v1/payments/setup-intent
const setupIntent = await stripe.setupIntents.create({
  customer: careReceiver.stripe_customer_id,
  payment_method_types: ['card'],
  usage: 'off_session', // Allow charging without care receiver present
  metadata: {
    care_receiver_id: careReceiver.id,
    user_type: 'care_receiver'
  }
});

// Return client secret to frontend
return { client_secret: setupIntent.client_secret };
```

**Frontend Integration** (React example):

```javascript
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function PaymentMethodForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, setupIntent } = await stripe.confirmCardSetup(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: careReceiver.name,
            email: careReceiver.email,
            address: {
              postal_code: careReceiver.postcode
            }
          }
        }
      }
    );

    if (error) {
      // Display error to user
      console.error(error.message);
    } else {
      // Payment method saved successfully
      // setupIntent.payment_method contains the payment method ID
      await fetch('/api/v1/payments/methods', {
        method: 'POST',
        body: JSON.stringify({
          payment_method_id: setupIntent.payment_method
        })
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Save Card
      </button>
    </form>
  );
}
```

### 3.2 Step 2: Booking Request Creates PaymentIntent (Authorize)

**Purpose**: Authorize payment (hold funds) when care receiver requests booking

**When**: Care receiver clicks "Request Booking"

**Calculation Example**:
```
Hourly Rate: £20/hour
Duration: 3 hours
Caregiver Earnings: £20 × 3 = £60

Platform Service Fee (Care Receiver): 15% of £60 = £9
Total Care Receiver Charge: £60 + £9 = £69

Platform Commission (from Caregiver): 15% of £60 = £9
Caregiver Net Earnings: £60 - £9 = £51

Platform Total Revenue: £9 (service fee) + £9 (commission) = £18
```

```javascript
// Backend: POST /api/v1/bookings (create booking request)
const paymentIntent = await stripe.paymentIntents.create({
  amount: Math.round(totalCareReceiverCharge * 100), // £63.00 = 6300 pence
  currency: 'gbp',
  customer: careReceiver.stripe_customer_id,
  payment_method: careReceiver.default_payment_method_id,
  capture_method: 'manual', // Authorize only, capture later
  off_session: true, // Charging without care receiver present
  confirm: true, // Immediately authorize
  metadata: {
    booking_id: booking.id,
    care_receiver_id: careReceiver.id,
    caregiver_id: caregiver.id,
    hourly_rate: booking.hourlyRate,
    duration_hours: booking.durationHours,
    service_types: booking.serviceTypes.join(',')
  },
  description: `Booking request: ${caregiver.firstName} - ${booking.bookingDate}`,
  statement_descriptor: 'ICARE BOOKING', // Appears on care receiver's bank statement
  application_fee_amount: Math.round(platformCommission * 100), // £9.00 = 900 pence
  transfer_data: {
    destination: caregiver.stripe_connect_account_id
  }
});

// Save PaymentIntent ID to booking
await db.bookings.update(booking.id, {
  payment_intent_id: paymentIntent.id,
  payment_status: 'authorized'
});
```

**PaymentIntent States**:
- `requires_payment_method`: No payment method attached
- `requires_confirmation`: Ready to confirm (shouldn't reach this with `confirm: true`)
- `requires_action`: 3D Secure authentication required (see error handling)
- `processing`: Payment being processed
- `requires_capture`: **Authorized successfully** (funds held on card)
- `succeeded`: Captured (charged)
- `canceled`: Authorization released

### 3.3 Step 3: Booking Accepted Triggers Capture

**Purpose**: Charge care receiver's card when caregiver accepts booking

**When**: Caregiver clicks "Accept Booking"

```javascript
// Backend: PUT /api/v1/bookings/:id/accept
const paymentIntent = await stripe.paymentIntents.capture(
  booking.payment_intent_id,
  {
    application_fee_amount: Math.round(booking.platformCommission * 100) // Confirm commission
  }
);

// Update booking status
await db.bookings.update(booking.id, {
  payment_status: 'captured',
  status: 'accepted',
  accepted_at: new Date()
});

// Funds now in platform account (escrow)
```

**Authorization Timeout**: Payment authorizations expire after 7 days. If caregiver doesn't respond within 24 hours, cancel PaymentIntent to release authorization immediately.

```javascript
// Cron job: Check bookings in "requested" status for >24 hours
const expiredBookings = await db.bookings.findExpired();

for (const booking of expiredBookings) {
  await stripe.paymentIntents.cancel(booking.payment_intent_id);

  await db.bookings.update(booking.id, {
    status: 'expired',
    payment_status: 'authorization_released'
  });
}
```

### 3.4 Step 4: Booking Completed Releases Funds to Caregiver

**Purpose**: Transfer caregiver earnings after service completion + confirmation

**When**: Care receiver confirms completion OR 48-hour auto-confirm

**Payout Amount Calculation**:
```
Total Charged: £63
Platform Service Fee: £3 (retained by platform)
Caregiver Gross: £60
Platform Commission: £9 (deducted via application_fee_amount)
Caregiver Net: £51 (transferred to caregiver)
```

```javascript
// Backend: Booking completion confirmed (or auto-confirmed after 48h)
// PaymentIntent already includes application_fee_amount, so Stripe automatically
// routes £51 to caregiver and £9 to platform as commission

// Create Transfer to finalize payout
const transfer = await stripe.transfers.create({
  amount: Math.round(booking.caregiverEarnings * 100), // £51.00 = 5100 pence
  currency: 'gbp',
  destination: caregiver.stripe_connect_account_id,
  transfer_group: booking.id, // Groups related transfers
  metadata: {
    booking_id: booking.id,
    caregiver_id: caregiver.id,
    care_receiver_id: booking.careReceiverId
  },
  description: `Payout for booking ${booking.id}`
});

// Save transfer ID to booking
await db.bookings.update(booking.id, {
  stripe_transfer_id: transfer.id,
  payment_status: 'payment_released',
  payment_released_at: new Date()
});

// Notify caregiver
await notifications.send({
  to: caregiver.email,
  template: 'payout_released',
  data: {
    amount: booking.caregiverEarnings,
    booking_id: booking.id,
    expected_arrival: '2-3 business days'
  }
});
```

**Important**: The `application_fee_amount` on the PaymentIntent causes Stripe to automatically split the payment:
- Platform account receives: Total charge - application fee = £63 - £9 = £54
- Caregiver receives: Application fee = £9 + Transfer amount = £51
- Platform keeps: Service fee = £3

Actually, this is incorrect. Let me correct the payment flow:

**Correct Payment Flow with Destination Charges**:

```javascript
// Step 2: Create PaymentIntent (Authorization)
const paymentIntent = await stripe.paymentIntents.create({
  amount: 6300, // £63 (total charge to care receiver)
  currency: 'gbp',
  customer: careReceiver.stripe_customer_id,
  payment_method: careReceiver.default_payment_method_id,
  capture_method: 'manual',
  off_session: true,
  confirm: true,
  application_fee_amount: 1200, // £12 (platform total revenue: £3 service fee + £9 commission)
  transfer_data: {
    destination: caregiver.stripe_connect_account_id
  },
  metadata: { /* ... */ }
});

// Money flow:
// Care receiver charged: £69
// Platform receives: £18 (as application fee)
// Caregiver receives: £51 (automatically via transfer_data)
```

**Platform Revenue Breakdown**:
- Service Fee (from care receiver): £9 (included in £69 charge)
- Commission (from caregiver): £9 (deducted from £60 caregiver rate)
- Total Platform Revenue: £18

**Stripe Destination Charges** automatically:
1. Charge care receiver £69
2. Deduct £18 platform fee (application_fee_amount)
3. Transfer remaining £51 to caregiver account

### 3.5 Step 5: Commission Retained by Platform

**Commission Structure** (example, configurable):

| Party | Pays | Amount | Description |
|-------|------|--------|-------------|
| **Care Receiver** | Service Fee | 15% of booking | £60 × 15% = £9 |
| **Caregiver** | Commission | 15% of booking | £60 × 15% = £9 |
| **Platform** | Total Revenue | Service Fee + Commission | £9 + £9 = £18 |
| **Stripe** | Processing Fee | ~1.4% + 20p | £69 × 1.4% + £0.20 = £1.17 |

**Net Platform Revenue** (after Stripe fees):
£18 - £1.17 = £16.83 per £69 booking (24.4% margin)

**Commission Configuration**:

```javascript
// Database: platform_settings table
const platformSettings = {
  care_receiver_service_fee_percentage: 15.0, // 15%
  caregiver_commission_percentage: 15.0, // 15%
  vat_rate: 20.0 // 20% VAT on commission (if applicable)
};

// Calculate pricing
function calculateBookingPricing(hourlyRate, durationHours) {
  const caregiverGross = hourlyRate * durationHours; // £60
  const serviceFee = caregiverGross * (platformSettings.care_receiver_service_fee_percentage / 100); // £3
  const totalCareReceiverCharge = caregiverGross + serviceeFee; // £63

  const commission = caregiverGross * (platformSettings.caregiver_commission_percentage / 100); // £9
  const caregiverNet = caregiverGross - commission; // £51

  const platformRevenue = serviceFee + commission; // £12

  return {
    hourlyRate,
    durationHours,
    caregiverGross,
    serviceFee,
    totalCareReceiverCharge,
    commission,
    caregiverNet,
    platformRevenue
  };
}
```

---

## 4. Stripe Identity Integration

### 4.1 Purpose

Stripe Identity provides automated identity verification for caregivers during onboarding, reducing manual admin workload and providing consistent verification quality.

**Use Case**: Verify caregiver government-issued ID (passport, driving license) and selfie photo to confirm identity.

**Benefits**:
- Automated verification (95%+ success rate for UK IDs)
- Liveness detection (prevents photo fraud)
- Document authenticity checks (holograms, security features)
- Reduced admin workload (manual review only for failures)
- PCI DSS compliant document storage

### 4.2 Verification Session Creation

**When**: Caregiver completes profile and uploads ID documents

```javascript
// Backend: POST /api/v1/verification/identity
const verificationSession = await stripe.identity.verificationSessions.create({
  type: 'document',
  metadata: {
    caregiver_id: caregiver.id,
    user_email: caregiver.email
  },
  options: {
    document: {
      allowed_types: ['passport', 'driving_license'],
      require_id_number: true,
      require_live_capture: true, // Selfie photo required
      require_matching_selfie: true // Selfie must match ID photo
    }
  },
  return_url: 'https://app.icare-app.co.uk/caregiver/verification/complete'
});

// Save verification session ID
await db.verification_documents.create({
  caregiver_id: caregiver.id,
  document_type: 'id_document',
  stripe_verification_id: verificationSession.id,
  verification_status: 'pending'
});

// Return client secret to frontend
return { client_secret: verificationSession.client_secret };
```

### 4.3 Document Types Accepted

**UK Passport**:
- Photo page
- Full document image (required by Stripe)
- Expiry date check
- Name extraction

**UK Driving License**:
- Photocard (front and back)
- Full address visible
- Photo and signature check

**EU National ID Card** (if caregiver has right to work):
- Front and back
- Valid for UK residents with settled/pre-settled status

### 4.4 Frontend Integration

```javascript
import { loadStripe } from '@stripe/stripe-js';

const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const { error } = await stripe.verifyIdentity(clientSecret);

if (error) {
  // Handle error
  console.error(error.message);
} else {
  // Verification submitted, awaiting result
  // Webhook will notify backend of result
}
```

**Stripe-Hosted Verification Flow**:
1. Caregiver clicks "Verify Identity"
2. Redirected to Stripe-hosted verification page
3. Prompted to upload ID document (photo or scan)
4. Prompted to take selfie photo (liveness check)
5. Stripe processes documents (1-5 seconds)
6. Result returned via webhook

### 4.5 Webhook Handling for Verification Results

**Webhook Event**: `identity.verification_session.verified`

```javascript
// Webhook handler: POST /api/v1/webhooks/stripe
switch (event.type) {
  case 'identity.verification_session.verified':
    const verificationSession = event.data.object;

    // Extract verified data
    const verifiedData = verificationSession.verified_outputs;

    await db.caregivers.update(caregiver.id, {
      id_verified: true,
      id_verified_date: new Date(),
      id_verification_method: 'stripe_identity'
    });

    await db.verification_documents.update({
      where: { stripe_verification_id: verificationSession.id },
      data: {
        verification_status: 'approved',
        verified_at: new Date(),
        stripe_verification_result: verifiedData
      }
    });

    // Notify caregiver
    await notifications.send({
      to: caregiver.email,
      template: 'id_verification_approved',
      data: { caregiver_name: caregiver.firstName }
    });
    break;

  case 'identity.verification_session.requires_input':
    // Manual review required or verification failed
    const session = event.data.object;

    await db.verification_documents.update({
      where: { stripe_verification_id: session.id },
      data: {
        verification_status: 'manual_review_required',
        stripe_verification_result: session.last_error
      }
    });

    // Notify admin for manual review
    await notifications.sendAdmin({
      subject: 'Caregiver ID Verification Requires Manual Review',
      caregiver_id: caregiver.id,
      reason: session.last_error.reason
    });
    break;
}
```

### 4.6 Verification Results

**Verified Outputs** (if successful):

```javascript
{
  "id_number": "PASSPORT_NUMBER_123456789",
  "name": "Sarah Johnson",
  "dob": {
    "day": 15,
    "month": 5,
    "year": 1985
  },
  "address": {
    "line1": "10 Downing Street",
    "city": "London",
    "postal_code": "SW1A 1AA",
    "country": "GB"
  },
  "document": {
    "type": "passport",
    "expiration_date": {
      "day": 1,
      "month": 12,
      "year": 2030
    }
  },
  "selfie": {
    "match": "matched" // Selfie matches ID photo
  }
}
```

**Verification Checks**:
- `document.authenticity`: Document is genuine (not fake)
- `document.expiration_date`: Document not expired
- `selfie.liveness`: Selfie is live person (not photo of photo)
- `selfie.match`: Selfie matches ID photo

**Failed Verification Reasons**:
- `document_expired`: ID document expired
- `document_unverified_other`: Document unclear or fake
- `selfie_unverified`: Selfie doesn't match ID photo
- `selfie_manipulated`: Selfie is not live person (photo fraud)

### 4.7 Fallback to Manual Review

**When**: Stripe Identity returns `requires_input` or verification fails

**Admin Workflow**:
1. Admin views uploaded documents in verification queue
2. Admin manually checks document authenticity and selfie match
3. Admin approves or rejects with reason
4. Caregiver notified of manual review result

```javascript
// Admin action: PUT /api/v1/admin/verifications/:id/approve
await db.caregivers.update(caregiver.id, {
  id_verified: true,
  id_verified_date: new Date(),
  id_verification_method: 'manual_admin_review'
});
```

---

## 5. Webhook Events

### 5.1 Webhook Overview

Webhooks notify the platform of Stripe events in real-time (e.g., payment succeeded, payout failed).

**Webhook Endpoint**: `POST /api/v1/webhooks/stripe`

**Security**: Stripe signature verification required (see Security section)

### 5.2 Critical Webhook Events

| Event | Purpose | Action |
|-------|---------|--------|
| `payment_intent.succeeded` | Payment captured successfully | Update booking status to `payment_captured` |
| `payment_intent.payment_failed` | Payment failed (card declined, insufficient funds) | Cancel booking, notify care receiver |
| `payment_intent.amount_capturable_updated` | Authorization amount changed | Update booking pricing (rare) |
| `account.updated` | Connected account status changed (onboarding complete) | Enable caregiver payouts |
| `identity.verification_session.verified` | ID verification succeeded | Approve caregiver identity |
| `identity.verification_session.requires_input` | ID verification needs manual review | Flag for admin review |
| `transfer.created` | Payout initiated to caregiver | Log payout creation |
| `transfer.paid` | Payout succeeded | Notify caregiver of payout success |
| `transfer.failed` | Payout failed (invalid bank account) | Notify caregiver to update bank details |
| `charge.refunded` | Refund processed | Update booking refund status |
| `charge.dispute.created` | Chargeback initiated by care receiver | Suspend booking, notify admin |
| `charge.dispute.closed` | Dispute resolved | Update dispute outcome |
| `payout.paid` | Caregiver bank account received funds | Update payout status to `paid` |
| `payout.failed` | Payout to bank failed | Retry or notify caregiver |

### 5.3 Webhook Handler Implementation

```javascript
// POST /api/v1/webhooks/stripe
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const sig = req.headers.get('stripe-signature');
  const body = await req.text();

  let event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return new Response('Webhook Error', { status: 400 });
  }

  // Handle event
  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentSucceeded(event.data.object);
      break;

    case 'payment_intent.payment_failed':
      await handlePaymentFailed(event.data.object);
      break;

    case 'account.updated':
      await handleAccountUpdated(event.data.object);
      break;

    case 'identity.verification_session.verified':
      await handleIdentityVerified(event.data.object);
      break;

    case 'transfer.paid':
      await handleTransferPaid(event.data.object);
      break;

    case 'transfer.failed':
      await handleTransferFailed(event.data.object);
      break;

    case 'charge.refunded':
      await handleChargeRefunded(event.data.object);
      break;

    case 'charge.dispute.created':
      await handleDisputeCreated(event.data.object);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return new Response('Webhook received', { status: 200 });
}

async function handlePaymentSucceeded(paymentIntent) {
  const booking = await db.bookings.findOne({
    payment_intent_id: paymentIntent.id
  });

  await db.bookings.update(booking.id, {
    payment_status: 'captured',
    status: 'accepted'
  });

  // Notify both parties
  await notifications.sendBoth(booking, 'booking_payment_captured');
}

async function handlePaymentFailed(paymentIntent) {
  const booking = await db.bookings.findOne({
    payment_intent_id: paymentIntent.id
  });

  await db.bookings.update(booking.id, {
    payment_status: 'failed',
    status: 'cancelled'
  });

  // Notify care receiver to update payment method
  await notifications.send({
    to: booking.careReceiver.email,
    template: 'payment_failed',
    data: {
      reason: paymentIntent.last_payment_error.message,
      booking_id: booking.id
    }
  });
}

async function handleTransferFailed(transfer) {
  const booking = await db.bookings.findOne({
    stripe_transfer_id: transfer.id
  });

  // Notify caregiver to update bank account
  await notifications.send({
    to: booking.caregiver.email,
    template: 'payout_failed',
    data: {
      reason: transfer.failure_message,
      action_required: 'Update bank account details'
    }
  });

  // Retry transfer after 24 hours (manual or automated)
}
```

### 5.4 Webhook Testing

**Stripe CLI for Local Testing**:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to Stripe account
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/v1/webhooks/stripe

# Trigger test webhook events
stripe trigger payment_intent.succeeded
stripe trigger payment_intent.payment_failed
stripe trigger transfer.paid
```

### 5.5 Webhook Retry Logic

**Stripe Automatic Retries**:
- Stripe retries failed webhook deliveries for 3 days
- Exponential backoff between retries

**Platform Retry Handling**:
- Return 200 status if event processed successfully
- Return 4xx/5xx status if event processing failed (Stripe will retry)
- Idempotency: Use `event.id` to prevent duplicate processing

```javascript
async function handlePaymentSucceeded(paymentIntent) {
  const existingLog = await db.webhook_logs.findOne({
    stripe_event_id: event.id
  });

  if (existingLog) {
    // Event already processed, skip
    return;
  }

  // Process event
  // ...

  // Log event as processed
  await db.webhook_logs.create({
    stripe_event_id: event.id,
    event_type: event.type,
    processed_at: new Date()
  });
}
```

---

## 6. Commission Handling

### 6.1 Commission Structure

**Platform Revenue Sources**:

| Source | Charged To | Rate | Description |
|--------|-----------|------|-------------|
| **Service Fee** | Care Receiver | 15% of booking | Added to care receiver total |
| **Commission** | Caregiver | 15% of booking | Deducted from caregiver earnings |
| **Total Platform Revenue** | Combined | 30% of booking value | Service Fee + Commission |

**Example Calculation** (£20/hour × 3 hours):

```javascript
const hourlyRate = 20.00;
const durationHours = 3;

// Caregiver gross earnings
const caregiverGross = hourlyRate * durationHours; // £60

// Platform service fee (charged to care receiver)
const serviceFeePercentage = 15.0;
const serviceFee = caregiverGross * (serviceFeePercentage / 100); // £3

// Total charge to care receiver
const totalCareReceiverCharge = caregiverGross + serviceFee; // £63

// Platform commission (deducted from caregiver)
const commissionPercentage = 15.0;
const commission = caregiverGross * (commissionPercentage / 100); // £9

// Caregiver net earnings
const caregiverNet = caregiverGross - commission; // £51

// Platform total revenue
const platformRevenue = serviceFee + commission; // £12

console.log({
  caregiverGross: '£60.00',
  serviceFee: '£9.00',
  totalCareReceiverCharge: '£63.00',
  commission: '£9.00',
  caregiverNet: '£51.00',
  platformRevenue: '£12.00'
});
```

### 6.2 Application Fee Implementation

**Stripe Destination Charges** with application fee:

```javascript
const paymentIntent = await stripe.paymentIntents.create({
  amount: 6300, // £63.00 (total care receiver charge)
  currency: 'gbp',
  application_fee_amount: 1200, // £12.00 (platform revenue: service fee + commission)
  transfer_data: {
    destination: caregiver.stripe_connect_account_id
    // Remaining amount (£51) automatically transferred to caregiver
  }
});
```

**Money Flow**:
1. Care receiver charged: £63
2. Platform receives: £12 (as application fee)
3. Caregiver receives: £51 (automatically via transfer_data)

### 6.3 VAT on Commission

**UK VAT Treatment**:
- Platform service fee: Subject to 20% VAT (if platform VAT-registered)
- Caregiver services: VAT exempt (care services are VAT-exempt)
- Platform commission: Platform charges VAT on commission if VAT-registered

**Example with VAT**:

```javascript
// Platform is VAT-registered
const isVATRegistered = true;
const vatRate = 0.20; // 20%

// Caregiver gross (no VAT)
const caregiverGross = 60.00;

// Service fee (subject to VAT)
const serviceFeeNet = 3.00;
const serviceFeeVAT = serviceFeeNet * vatRate; // £0.60
const serviceFeGross = serviceFeeNet + serviceFeeVAT; // £10.80

// Total care receiver charge (including VAT)
const totalCareReceiverCharge = caregiverGross + serviceFeeGross; // £63.60

// Commission (subject to VAT)
const commissionNet = 9.00;
const commissionVAT = commissionNet * vatRate; // £1.80
const commissionGross = commissionNet + commissionVAT; // £10.80

// Caregiver net earnings (after commission + VAT)
const caregiverNet = caregiverGross - commissionGross; // £49.20

// Platform revenue (including VAT)
const platformRevenueGross = serviceFeeGross + commissionGross; // £14.40
const platformRevenueNet = platformRevenueGross / (1 + vatRate); // £12.00
const platformVAT = platformRevenueGross - platformRevenueNet; // £2.40
```

**Note**: VAT treatment depends on platform VAT registration status and turnover. Consult UK tax advisor. For Tier 1 MVP, assume platform NOT yet VAT-registered (turnover <£85k).

### 6.4 Commission Rate Configuration

**Database Table**: `platform_settings`

```sql
CREATE TABLE platform_settings (
  id UUID PRIMARY KEY,
  care_receiver_service_fee_percentage DECIMAL(5, 2) DEFAULT 15.00,
  caregiver_commission_percentage DECIMAL(5, 2) DEFAULT 15.00,
  vat_registered BOOLEAN DEFAULT false,
  vat_rate DECIMAL(5, 2) DEFAULT 20.00,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Admin Configuration UI**:
- Adjust service fee percentage (e.g., promotional period: 0%)
- Adjust commission percentage (e.g., lower commission for high-volume caregivers)
- Toggle VAT registration status
- Update VAT rate (if UK rate changes)

**Tiered Commission** (future enhancement):

| Caregiver Monthly Revenue | Commission Rate |
|--------------------------|----------------|
| £0 - £1,000 | 15% |
| £1,000 - £5,000 | 12% |
| £5,000+ | 10% |

---

## 7. Refund Handling

### 7.1 Refund Scenarios

| Scenario | Refund Amount | Who Initiates | Timing |
|----------|--------------|---------------|--------|
| **Cancellation >48h before start** | 100% | Care Receiver | Immediate |
| **Cancellation 24-48h before start** | 50% | Care Receiver | Immediate |
| **Cancellation <24h before start** | 0% | Care Receiver | N/A (no refund) |
| **Caregiver Cancellation (any time)** | 100% | Caregiver | Immediate |
| **No-Show (Caregiver)** | 100% | Platform (after investigation) | 24-48 hours |
| **Dispute Resolved (Full)** | 100% | Platform (admin decision) | 7 days |
| **Dispute Resolved (Partial)** | 25-75% | Platform (admin decision) | 7 days |
| **Payment Error** | 100% | Platform (automatic) | Immediate |

### 7.2 Full Refund (Cancellation >48h)

```javascript
// Backend: PUT /api/v1/bookings/:id/cancel
const booking = await db.bookings.findById(bookingId);

// Check cancellation window
const hoursUntilStart = (booking.startTime - new Date()) / (1000 * 60 * 60);

if (hoursUntilStart >= 48) {
  // Full refund eligible
  const refund = await stripe.refunds.create({
    payment_intent: booking.payment_intent_id,
    amount: Math.round(booking.totalCareReceiverCharge * 100), // Full amount
    reason: 'requested_by_customer',
    metadata: {
      booking_id: booking.id,
      cancellation_reason: 'care_receiver_cancelled',
      hours_before_start: hoursUntilStart
    }
  });

  await db.bookings.update(booking.id, {
    status: 'cancelled',
    payment_status: 'refunded',
    refund_amount: booking.totalCareReceiverCharge,
    cancelled_at: new Date(),
    cancelled_by: 'care_receiver'
  });

  await db.refunds.create({
    booking_id: booking.id,
    stripe_refund_id: refund.id,
    amount_gbp: booking.totalCareReceiverCharge,
    refund_reason: 'cancellation_48h_plus',
    status: 'succeeded'
  });

  // Notify both parties
  await notifications.sendBoth(booking, 'cancellation_full_refund');
}
```

### 7.3 Partial Refund (Cancellation 24-48h)

```javascript
if (hoursUntilStart >= 24 && hoursUntilStart < 48) {
  // 50% refund to care receiver
  const refundAmount = booking.totalCareReceiverCharge * 0.5; // £31.50

  const refund = await stripe.refunds.create({
    payment_intent: booking.payment_intent_id,
    amount: Math.round(refundAmount * 100),
    reason: 'requested_by_customer',
    metadata: {
      booking_id: booking.id,
      refund_percentage: 50,
      caregiver_compensation: 50
    }
  });

  // Caregiver compensated with 50% of earnings
  const caregiverCompensation = booking.caregiverEarnings * 0.5; // £25.50

  const transfer = await stripe.transfers.create({
    amount: Math.round(caregiverCompensation * 100),
    currency: 'gbp',
    destination: caregiver.stripe_connect_account_id,
    metadata: {
      booking_id: booking.id,
      compensation_reason: 'late_cancellation_by_care_receiver'
    },
    description: `Cancellation compensation for booking ${booking.id}`
  });

  await db.bookings.update(booking.id, {
    status: 'cancelled',
    payment_status: 'partial_refund',
    refund_amount: refundAmount,
    cancelled_at: new Date()
  });
}
```

### 7.4 Refund to Caregiver Connected Account

**Scenario**: Platform incorrectly deducted too much commission, need to refund caregiver

```javascript
// Create a Transfer to caregiver account
const transfer = await stripe.transfers.create({
  amount: Math.round(refundAmount * 100),
  currency: 'gbp',
  destination: caregiver.stripe_connect_account_id,
  metadata: {
    booking_id: booking.id,
    refund_reason: 'commission_correction'
  },
  description: `Refund for booking ${booking.id}: commission correction`
});

// Or: Reverse existing transfer (if within 180 days)
const reversal = await stripe.transfers.createReversal(
  originalTransfer.id,
  {
    amount: Math.round(refundAmount * 100),
    metadata: {
      booking_id: booking.id,
      reason: 'commission_error'
    }
  }
);
```

### 7.5 Refund Timeline

**Care Receiver Refunds**:
- Refund initiated: Immediate (when admin approves or policy-based)
- Refund processed by Stripe: Immediate
- Funds back in care receiver account: 5-10 business days (bank-dependent)

**Caregiver Transfers**:
- Transfer initiated: Immediate (after confirmation window)
- Funds in caregiver Stripe balance: Immediate
- Funds in caregiver bank account: 2-3 business days (Standard payout)

### 7.6 Refund Status Tracking

```javascript
// Database: refunds table
const refund = {
  id: 'uuid',
  booking_id: 'uuid',
  stripe_refund_id: 'ref_abc123',
  amount_gbp: 31.50,
  refund_reason: 'cancellation_24_48h',
  refund_notes: 'Care receiver cancelled 36 hours before start',
  status: 'pending', // pending | succeeded | failed | canceled
  refund_initiated_at: new Date(),
  refund_completed_at: null
};

// Webhook: charge.refunded
await db.refunds.update({
  where: { stripe_refund_id: refund.id },
  data: {
    status: 'succeeded',
    refund_completed_at: new Date()
  }
});
```

---

## 8. Error Handling

### 8.1 Payment Authorization Errors

**Error Types**:

| Error Code | Meaning | Action |
|------------|---------|--------|
| `card_declined` | Card issuer declined | Ask care receiver to use different card or contact bank |
| `insufficient_funds` | Not enough money on card | Notify care receiver, offer to retry later |
| `incorrect_cvc` | CVC verification failed | Prompt care receiver to re-enter CVC |
| `expired_card` | Card expired | Prompt care receiver to update payment method |
| `authentication_required` | 3D Secure required | Redirect to 3D Secure flow |

```javascript
try {
  const paymentIntent = await stripe.paymentIntents.create({
    // ... payment details
  });
} catch (error) {
  if (error.type === 'StripeCardError') {
    // Card error (declined, insufficient funds, etc.)
    console.error('Card error:', error.code, error.message);

    await notifications.send({
      to: careReceiver.email,
      template: 'payment_authorization_failed',
      data: {
        reason: error.message,
        error_code: error.code,
        action_required: getActionForErrorCode(error.code)
      }
    });

    // Return error to frontend
    return {
      success: false,
      error: {
        code: error.code,
        message: error.message,
        action: getActionForErrorCode(error.code)
      }
    };
  }
}

function getActionForErrorCode(errorCode) {
  switch (errorCode) {
    case 'card_declined':
      return 'Please use a different payment method or contact your bank.';
    case 'insufficient_funds':
      return 'Please ensure you have sufficient funds and try again.';
    case 'authentication_required':
      return 'Please complete 3D Secure authentication.';
    case 'expired_card':
      return 'Please update your payment method with a valid card.';
    default:
      return 'Please update your payment method or contact support.';
  }
}
```

### 8.2 3D Secure Authentication

**Scenario**: Bank requires 3D Secure (Strong Customer Authentication) for payment

```javascript
// PaymentIntent creation with 3D Secure
const paymentIntent = await stripe.paymentIntents.create({
  amount: 6300,
  currency: 'gbp',
  payment_method: careReceiver.default_payment_method_id,
  capture_method: 'manual',
  off_session: false, // 3D Secure requires customer present
  confirm: true,
  return_url: 'https://app.icare-app.co.uk/bookings/payment-complete'
});

// If 3D Secure required
if (paymentIntent.status === 'requires_action' && paymentIntent.next_action.type === 'redirect_to_url') {
  // Redirect care receiver to 3D Secure page
  const redirectUrl = paymentIntent.next_action.redirect_to_url.url;

  return {
    requires_action: true,
    redirect_url: redirectUrl
  };
}

// Frontend: Redirect care receiver
window.location.href = redirectUrl;

// After 3D Secure completion, care receiver returns to return_url
// Backend confirms payment
const confirmedPaymentIntent = await stripe.paymentIntents.retrieve(paymentIntent.id);

if (confirmedPaymentIntent.status === 'requires_capture') {
  // 3D Secure succeeded, authorization successful
  await db.bookings.update(booking.id, {
    payment_status: 'authorized'
  });
}
```

### 8.3 Connect Account Issues

**Error: Caregiver Account Not Onboarded**

```javascript
// Check if caregiver Connect account ready
const account = await stripe.accounts.retrieve(caregiver.stripe_connect_account_id);

if (!account.charges_enabled || !account.payouts_enabled) {
  // Account not ready for payouts
  throw new Error('CAREGIVER_ACCOUNT_NOT_READY');
}
```

**Error: Invalid Bank Account**

```javascript
// Webhook: transfer.failed
async function handleTransferFailed(transfer) {
  const booking = await db.bookings.findOne({
    stripe_transfer_id: transfer.id
  });

  // Notify caregiver
  await notifications.send({
    to: booking.caregiver.email,
    template: 'payout_failed',
    data: {
      reason: transfer.failure_message,
      booking_id: booking.id,
      action: 'Update bank account details in your Stripe Dashboard'
    }
  });

  // Update booking status
  await db.bookings.update(booking.id, {
    payment_status: 'payout_failed'
  });

  // Admin notification
  await notifications.sendAdmin({
    subject: 'Caregiver Payout Failed',
    caregiver_id: booking.caregiver.id,
    booking_id: booking.id,
    failure_reason: transfer.failure_message
  });
}
```

### 8.4 Retry Strategies

**Payment Authorization Retry**:
- Automatic retry: NO (manual retry only)
- Care receiver must update payment method or retry manually

**Payment Capture Retry**:
- Automatic retry: YES (up to 3 times with exponential backoff)
- After 3 failures: Cancel booking, notify care receiver

**Payout Retry**:
- Automatic retry: YES (Stripe retries failed transfers for 3 days)
- After Stripe retries exhausted: Notify caregiver to update bank details

```javascript
// Payment capture retry logic
async function capturePaymentWithRetry(bookingId, attempt = 1) {
  const booking = await db.bookings.findById(bookingId);

  try {
    const paymentIntent = await stripe.paymentIntents.capture(
      booking.payment_intent_id
    );

    await db.bookings.update(booking.id, {
      payment_status: 'captured'
    });

    return paymentIntent;
  } catch (error) {
    if (attempt < 3) {
      // Retry with exponential backoff
      const delayMs = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
      await new Promise(resolve => setTimeout(resolve, delayMs));

      return capturePaymentWithRetry(bookingId, attempt + 1);
    } else {
      // Max retries reached, cancel booking
      await stripe.paymentIntents.cancel(booking.payment_intent_id);

      await db.bookings.update(booking.id, {
        status: 'cancelled',
        payment_status: 'capture_failed'
      });

      await notifications.send({
        to: booking.careReceiver.email,
        template: 'payment_capture_failed',
        data: {
          booking_id: booking.id,
          reason: error.message
        }
      });

      throw error;
    }
  }
}
```

### 8.5 Dispute and Chargeback Handling

**Scenario**: Care receiver disputes charge with bank (chargeback)

```javascript
// Webhook: charge.dispute.created
async function handleDisputeCreated(dispute) {
  const booking = await db.bookings.findOne({
    payment_intent_id: dispute.payment_intent
  });

  // Suspend booking and hold payout
  await db.bookings.update(booking.id, {
    status: 'disputed',
    payment_status: 'chargeback_dispute'
  });

  // Notify admin urgently
  await notifications.sendAdmin({
    subject: 'URGENT: Chargeback Dispute Created',
    booking_id: booking.id,
    dispute_id: dispute.id,
    dispute_reason: dispute.reason,
    amount: dispute.amount / 100,
    care_receiver_id: booking.careReceiverId,
    caregiver_id: booking.caregiverId
  });

  // Gather evidence for Stripe dispute response
  const evidence = {
    customer_communication: `Booking confirmation email, in-app messages`,
    service_documentation: `Session notes, completion confirmation`,
    duplicate_charge_documentation: null,
    refund_policy: `Platform refund policy (visible during booking)`,
    cancellation_policy: `Cancellation policy accepted by care receiver`
  };

  // Admin manually responds to dispute via Stripe Dashboard
  // Or: Automated response API
  await stripe.disputes.update(dispute.id, {
    evidence: evidence
  });
}

// Webhook: charge.dispute.closed
async function handleDisputeClosed(dispute) {
  const booking = await db.bookings.findOne({
    payment_intent_id: dispute.payment_intent
  });

  if (dispute.status === 'won') {
    // Platform won dispute
    await db.bookings.update(booking.id, {
      status: 'completed',
      payment_status: 'dispute_won'
    });

    // Release payout to caregiver
    await releasePayoutToCaregiver(booking.id);
  } else {
    // Platform lost dispute - refund to care receiver
    await db.bookings.update(booking.id, {
      status: 'disputed',
      payment_status: 'dispute_lost',
      refund_amount: dispute.amount / 100
    });

    // Caregiver payout clawed back by Stripe
    // Notify caregiver
    await notifications.send({
      to: booking.caregiver.email,
      template: 'dispute_lost',
      data: {
        booking_id: booking.id,
        reason: dispute.reason
      }
    });
  }
}
```

---

## 9. Testing

### 9.1 Test Mode Setup

**Stripe Test Mode**: Use separate API keys for testing

```bash
# .env.test
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_test_...
STRIPE_CONNECT_CLIENT_ID=ca_test_...
```

### 9.2 Test Card Numbers

**Successful Payments**:

| Card Number | Brand | Description |
|------------|-------|-------------|
| `4242 4242 4242 4242` | Visa | Succeeds immediately |
| `4000 0082 6000 0000` | Visa | Requires 3D Secure |
| `5555 5555 5555 4444` | Mastercard | Succeeds immediately |

**Failed Payments**:

| Card Number | Brand | Error |
|------------|-------|-------|
| `4000 0000 0000 0002` | Visa | Card declined |
| `4000 0000 0000 9995` | Visa | Insufficient funds |
| `4000 0000 0000 0069` | Visa | Expired card |
| `4000 0000 0000 0127` | Visa | Incorrect CVC |

**Expiry Date**: Any future date (e.g., 12/34)
**CVC**: Any 3 digits (e.g., 123)

### 9.3 Simulating Webhook Events

**Stripe CLI**:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/v1/webhooks/stripe

# Trigger test events
stripe trigger payment_intent.succeeded
stripe trigger payment_intent.payment_failed
stripe trigger transfer.created
stripe trigger transfer.paid
stripe trigger transfer.failed
stripe trigger charge.refunded
stripe trigger charge.dispute.created
stripe trigger identity.verification_session.verified
```

**Manual Webhook Testing**:

```bash
# Send custom webhook event
curl -X POST http://localhost:3000/api/v1/webhooks/stripe \
  -H "Content-Type: application/json" \
  -H "Stripe-Signature: whsec_test_..." \
  -d '{
    "id": "evt_test_123",
    "type": "payment_intent.succeeded",
    "data": {
      "object": {
        "id": "pi_test_123",
        "amount": 6300,
        "currency": "gbp",
        "status": "succeeded"
      }
    }
  }'
```

### 9.4 Connect Test Accounts

**Create Test Connect Account**:

```bash
# Via Stripe CLI
stripe connect accounts create \
  --type=express \
  --country=GB \
  --email=test-caregiver@example.com
```

**Or via Dashboard**:
- Stripe Dashboard → Connect → Test Accounts → Create Test Account

**Simulate Onboarding**:
- Use test bank account: Sort code `108800`, Account number `00012345`
- Test DOB: Any valid date
- Test National Insurance: Any valid format (e.g., `AB123456C`)

### 9.5 End-to-End Test Scenarios

**Test 1: Successful Booking Flow**

1. Care receiver adds test card `4242 4242 4242 4242`
2. Care receiver requests booking (£63)
3. PaymentIntent authorized (funds held)
4. Caregiver accepts booking
5. PaymentIntent captured (funds charged)
6. Caregiver completes booking
7. Care receiver confirms completion
8. Transfer created to caregiver (£51)
9. Verify platform balance: £12 (commission + service fee)

**Test 2: Payment Failure**

1. Care receiver adds test card `4000 0000 0000 0002`
2. Care receiver requests booking
3. PaymentIntent authorization fails
4. Booking not created
5. Care receiver notified to update payment method

**Test 3: Cancellation with Refund**

1. Complete Test 1 through step 3
2. Care receiver cancels booking (>48h before start)
3. Refund created for full amount (£63)
4. Verify refund processed
5. Verify caregiver calendar reopened

**Test 4: 3D Secure Authentication**

1. Care receiver adds test card `4000 0082 6000 0000`
2. Care receiver requests booking
3. Redirected to 3D Secure page
4. Complete 3D Secure authentication
5. Return to platform, authorization succeeds

**Test 5: Transfer Failure**

1. Complete Test 1 through step 8
2. Simulate transfer failure (invalid bank account)
3. Verify caregiver notified
4. Verify admin notified
5. Caregiver updates bank account
6. Retry transfer, succeeds

---

## 10. Security

### 10.1 Webhook Signature Verification

**Purpose**: Ensure webhook requests actually come from Stripe (prevent spoofing)

```javascript
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const sig = req.headers.get('stripe-signature');
  const body = await req.text(); // Must be raw body, not parsed JSON

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return new Response('Webhook Error', { status: 400 });
  }

  // Signature verified, process event
  await handleWebhookEvent(event);

  return new Response('Webhook received', { status: 200 });
}
```

**Security Notes**:
- NEVER skip signature verification in production
- Use raw request body (not parsed JSON)
- Return 400 status if verification fails
- Log failed verification attempts (potential attack)

### 10.2 API Key Management

**API Key Types**:

| Key Type | Purpose | Storage | Rotation |
|----------|---------|---------|----------|
| **Publishable Key** | Frontend client-side (public) | Environment variable, exposed to browser | Rarely (low risk) |
| **Secret Key** | Backend API calls | Environment variable, never exposed | Annually or if compromised |
| **Webhook Secret** | Verify webhook signatures | Environment variable, backend only | If webhook endpoint changes |
| **Connect Client ID** | OAuth Connect flow | Environment variable, frontend + backend | Rarely |

**Best Practices**:
- Store keys in environment variables (`.env` files)
- NEVER commit keys to Git
- Use separate keys for test/production
- Restrict secret key access to backend only
- Rotate keys annually or if leaked

**Environment Variables**:

```bash
# .env.production
STRIPE_SECRET_KEY=sk_live_51...
STRIPE_PUBLISHABLE_KEY=pk_live_51...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_CONNECT_CLIENT_ID=ca_...
```

### 10.3 PCI Compliance

**Stripe Handles PCI Compliance**:
- Stripe is PCI DSS Level 1 certified
- Card data never touches platform servers
- Stripe Elements or Stripe.js collects card details directly

**Platform Responsibilities**:
- Use HTTPS throughout (TLS 1.2+)
- Use Stripe Elements or Stripe.js (never custom card forms)
- Never log or store card numbers
- Securely store Stripe customer IDs and payment method IDs (not card data)

**Stripe Elements Integration**:

```javascript
// Frontend: Card input handled by Stripe
import { Elements, CardElement } from '@stripe/react-stripe-js';

<Elements stripe={stripePromise}>
  <CardElement />
</Elements>

// Card data sent directly to Stripe, never to platform backend
```

### 10.4 Encryption and Data Protection

**Data at Rest**:
- Database encryption (AWS RDS encryption or equivalent)
- Stripe IDs (customer, payment method, connected account) stored in database
- NO card numbers or sensitive payment data stored

**Data in Transit**:
- HTTPS/TLS 1.2+ for all API calls
- Stripe API endpoints always HTTPS

**Access Control**:
- Role-based access control (RBAC) for admin users
- 2FA required for admin accounts accessing payment data
- Audit logging for all payment-related actions

**Stripe Data Retention**:
- Stripe retains payment data for 7 years (regulatory requirement)
- Platform only stores Stripe IDs (references)
- Delete Stripe customer when care receiver deletes account

```javascript
// GDPR right to erasure: Delete Stripe customer
await stripe.customers.del(careReceiver.stripe_customer_id);

// Connected accounts deleted when caregiver deletes account
await stripe.accounts.del(caregiver.stripe_connect_account_id);
```

### 10.5 Fraud Prevention

**Stripe Radar** (fraud detection):
- Enabled by default for all Stripe accounts
- Machine learning-based fraud detection
- Blocks suspicious payments automatically
- Rules customizable via Stripe Dashboard

**Platform-Level Fraud Detection**:
- Monitor for duplicate bookings from same care receiver
- Flag caregivers with high chargeback rates
- Monitor for suspicious refund patterns
- Rate limit booking requests (prevent abuse)

**Chargeback Prevention**:
- Clear service descriptions in booking flow
- Require care receiver confirmation before payout
- Detailed booking history and evidence for disputes
- Prompt customer support response

---

## 11. Environment Variables

### 11.1 Required Environment Variables

```bash
# Stripe API Keys
STRIPE_SECRET_KEY=sk_live_51... # Backend only, NEVER expose
STRIPE_PUBLISHABLE_KEY=pk_live_51... # Frontend + backend, public
STRIPE_WEBHOOK_SECRET=whsec_... # Backend only, for webhook signature verification
STRIPE_CONNECT_CLIENT_ID=ca_... # Frontend + backend, for Connect OAuth

# Stripe Test Keys (for development/staging)
STRIPE_SECRET_KEY_TEST=sk_test_51...
STRIPE_PUBLISHABLE_KEY_TEST=pk_test_51...
STRIPE_WEBHOOK_SECRET_TEST=whsec_test_...
STRIPE_CONNECT_CLIENT_ID_TEST=ca_test_...
```

### 11.2 Configuration by Environment

**Development**:
```bash
NODE_ENV=development
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

**Staging**:
```bash
NODE_ENV=staging
STRIPE_SECRET_KEY=sk_test_... # Still use test keys
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

**Production**:
```bash
NODE_ENV=production
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### 11.3 Key Retrieval from Stripe Dashboard

**Publishable and Secret Keys**:
1. Stripe Dashboard → Developers → API keys
2. Copy "Publishable key" (starts with `pk_`)
3. Reveal and copy "Secret key" (starts with `sk_`)

**Webhook Secret**:
1. Stripe Dashboard → Developers → Webhooks
2. Click on webhook endpoint
3. Copy "Signing secret" (starts with `whsec_`)

**Connect Client ID**:
1. Stripe Dashboard → Connect → Settings
2. Copy "Client ID" (starts with `ca_`)

---

## 12. Code Examples

### 12.1 Creating PaymentIntent with Application Fee

```javascript
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function createBookingPayment(booking, careReceiver, caregiver) {
  // Calculate pricing
  const caregiverGross = booking.hourlyRate * booking.durationHours; // £60
  const serviceFee = caregiverGross * 0.15; // £9
  const totalCharge = caregiverGross + serviceFee; // £69
  const commission = caregiverGross * 0.15; // £9
  const caregiverNet = caregiverGross - commission; // £51
  const platformRevenue = serviceFee + commission; // £18

  // Create PaymentIntent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(totalCharge * 100), // £69.00 = 6900 pence
    currency: 'gbp',
    customer: careReceiver.stripe_customer_id,
    payment_method: careReceiver.default_payment_method_id,

    // Authorization (hold funds, don't charge yet)
    capture_method: 'manual',
    off_session: true,
    confirm: true,

    // Commission handling
    application_fee_amount: Math.round(platformRevenue * 100), // £12 = 1200 pence
    transfer_data: {
      destination: caregiver.stripe_connect_account_id
      // Remaining £51 automatically transferred to caregiver
    },

    // Metadata
    metadata: {
      booking_id: booking.id,
      care_receiver_id: careReceiver.id,
      caregiver_id: caregiver.id,
      hourly_rate: booking.hourlyRate,
      duration_hours: booking.durationHours,
      service_types: booking.serviceTypes.join(','),
      platform_service_fee: serviceFee,
      platform_commission: commission
    },

    // Display
    description: `Booking: ${caregiver.firstName} - ${booking.bookingDate}`,
    statement_descriptor: 'ICARE BOOKING',

    // Error handling
    error_on_requires_action: false // Allow 3D Secure
  });

  return {
    paymentIntentId: paymentIntent.id,
    status: paymentIntent.status, // 'requires_capture' if authorized
    totalCharge,
    caregiverNet,
    platformRevenue
  };
}
```

### 12.2 Creating Connect Express Account

```javascript
async function createCaregiverConnectAccount(caregiver) {
  // Create Express Connected Account
  const account = await stripe.accounts.create({
    type: 'express',
    country: 'GB',
    email: caregiver.email,

    // Capabilities
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true }
    },

    // Business info
    business_type: 'individual',
    individual: {
      first_name: caregiver.firstName,
      last_name: caregiver.lastName,
      email: caregiver.email,
      phone: caregiver.phone
    },

    // Business profile
    business_profile: {
      mcc: '8099', // Medical Services and Health Practitioners
      name: `${caregiver.firstName} ${caregiver.lastName}`,
      product_description: 'Companionship and care services',
      support_email: caregiver.email,
      support_phone: caregiver.phone,
      url: `https://app.icare-app.co.uk/caregivers/${caregiver.id}`
    },

    // Payout settings
    settings: {
      payouts: {
        schedule: {
          interval: 'manual' // Platform controls payout timing
        }
      }
    },

    // Metadata
    metadata: {
      caregiver_id: caregiver.id,
      platform_user_type: 'caregiver'
    }
  });

  // Generate onboarding link
  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: 'https://app.icare-app.co.uk/caregiver/onboarding/refresh',
    return_url: 'https://app.icare-app.co.uk/caregiver/onboarding/complete',
    type: 'account_onboarding'
  });

  // Save to database
  await db.caregivers.update(caregiver.id, {
    stripe_connect_account_id: account.id,
    stripe_onboarding_complete: false
  });

  return {
    accountId: account.id,
    onboardingUrl: accountLink.url
  };
}
```

### 12.3 Handling Webhooks

```javascript
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const sig = req.headers.get('stripe-signature');
  const body = await req.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return new Response('Webhook Error', { status: 400 });
  }

  // Handle event
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;

      case 'account.updated':
        await handleAccountUpdated(event.data.object);
        break;

      case 'identity.verification_session.verified':
        await handleIdentityVerified(event.data.object);
        break;

      case 'identity.verification_session.requires_input':
        await handleIdentityRequiresInput(event.data.object);
        break;

      case 'transfer.created':
        await handleTransferCreated(event.data.object);
        break;

      case 'transfer.paid':
        await handleTransferPaid(event.data.object);
        break;

      case 'transfer.failed':
        await handleTransferFailed(event.data.object);
        break;

      case 'charge.refunded':
        await handleChargeRefunded(event.data.object);
        break;

      case 'charge.dispute.created':
        await handleDisputeCreated(event.data.object);
        break;

      case 'charge.dispute.closed':
        await handleDisputeClosed(event.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response('Webhook received', { status: 200 });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return new Response('Webhook handler error', { status: 500 });
  }
}

// Handler functions
async function handlePaymentSucceeded(paymentIntent) {
  const booking = await db.bookings.findOne({
    payment_intent_id: paymentIntent.id
  });

  await db.bookings.update(booking.id, {
    payment_status: 'captured',
    status: 'accepted'
  });

  await notifications.sendBoth(booking, 'booking_payment_captured');
}

async function handleAccountUpdated(account) {
  const caregiver = await db.caregivers.findOne({
    stripe_connect_account_id: account.id
  });

  if (account.charges_enabled && account.payouts_enabled) {
    await db.caregivers.update(caregiver.id, {
      stripe_onboarding_complete: true
    });

    await notifications.send({
      to: caregiver.email,
      template: 'connect_onboarding_complete'
    });
  }
}

async function handleIdentityVerified(verificationSession) {
  const caregiver = await db.caregivers.findOne({
    'verification_documents.stripe_verification_id': verificationSession.id
  });

  const verifiedData = verificationSession.verified_outputs;

  await db.caregivers.update(caregiver.id, {
    id_verified: true,
    id_verified_date: new Date(),
    id_verification_method: 'stripe_identity'
  });

  await db.verification_documents.update({
    where: { stripe_verification_id: verificationSession.id },
    data: {
      verification_status: 'approved',
      verified_at: new Date(),
      stripe_verification_result: verifiedData
    }
  });

  await notifications.send({
    to: caregiver.email,
    template: 'id_verification_approved'
  });
}
```

### 12.4 Creating Stripe Identity Session

```javascript
async function createIdentityVerificationSession(caregiver) {
  const verificationSession = await stripe.identity.verificationSessions.create({
    type: 'document',

    // Metadata
    metadata: {
      caregiver_id: caregiver.id,
      user_email: caregiver.email,
      platform_user_type: 'caregiver'
    },

    // Verification options
    options: {
      document: {
        // Allowed document types
        allowed_types: ['passport', 'driving_license'],

        // Require ID number extraction
        require_id_number: true,

        // Require live selfie capture (liveness check)
        require_live_capture: true,

        // Require selfie to match ID photo
        require_matching_selfie: true
      }
    },

    // Return URL after verification
    return_url: 'https://app.icare-app.co.uk/caregiver/verification/complete'
  });

  // Save to database
  await db.verification_documents.create({
    caregiver_id: caregiver.id,
    document_type: 'id_document',
    stripe_verification_id: verificationSession.id,
    verification_status: 'pending',
    uploaded_at: new Date()
  });

  return {
    verificationSessionId: verificationSession.id,
    clientSecret: verificationSession.client_secret
  };
}

// Frontend integration
import { loadStripe } from '@stripe/stripe-js';

const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const { error } = await stripe.verifyIdentity(clientSecret);

if (error) {
  console.error(error.message);
  // Display error to user
} else {
  // Verification submitted successfully
  // Webhook will notify backend of result
}
```

---

## Appendix A: Stripe Fee Structure

**Stripe Pricing (UK)**:

| Transaction Type | Fee | Notes |
|------------------|-----|-------|
| **Standard Card Payment** | 1.4% + 20p | European cards |
| **Non-European Card Payment** | 2.9% + 20p | International cards |
| **Connect Transfer** | Free | Transfers to connected accounts |
| **Payout to Bank** | Free | Standard payout (2-3 days) |
| **Instant Payout** | 1% (min 50p) | Optional instant payout |
| **Refund** | No fee | Stripe fees refunded |
| **Dispute (Chargeback)** | £15 | If dispute lost |

**Example Fee Calculation** (£63 booking):

```
Booking total: £63.00
Stripe fee: £63 × 1.4% + £0.20 = £1.08
Net platform receipt: £63 - £1.08 = £61.92

Platform revenue (before Stripe fees): £12.00
Platform revenue (after Stripe fees): £12.00 - £1.08 = £10.92
```

---

## Appendix B: Glossary

| Term | Definition |
|------|------------|
| **Application Fee** | Commission retained by platform from Connected Account transaction |
| **Authorization** | Holding funds on card without charging (reserves funds) |
| **Capture** | Charging card after successful authorization |
| **Connected Account** | Caregiver's Stripe Express account for receiving payouts |
| **Destination Charge** | Payment where funds go to Connected Account with platform fee |
| **Escrow** | Funds held on platform account before releasing to caregiver |
| **PaymentIntent** | Stripe object representing care receiver payment |
| **Setup Intent** | Stripe object for saving payment method without charging |
| **Transfer** | Moving funds from platform to Connected Account |
| **Webhook** | Real-time notification from Stripe of event (payment, payout, etc.) |

---

## Appendix C: Related Documents

**Technical Documentation**:
- `/docs/technical/api-specification-tier1.md` - REST API specification
- `/docs/technical/database-schema-tier1.md` - Database schema design

**Product Specifications**:
- `/docs/product/features/tier1-booking-specification.md` - Booking flow requirements
- `/docs/product/features/tier1-verification-specification.md` - Caregiver verification

**Strategic Context**:
- `/docs/ROADMAP.md` - Tiered market entry strategy
- `/docs/compliance/dpia.md` - Data protection impact assessment
- `/docs/compliance/legal-framework.md` - UK regulatory requirements

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-06 | Technical Architect | Initial Stripe integration specification created |

---

**END OF DOCUMENT**
