import express from "express";
import Stripe from "stripe";
import { z } from "zod";

const router = express.Router();

function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      console.error("[stripe api] error:", error.message);
      res.status(500).json({ error: error.message || "Stripe request failed" });
    });
  };
}

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(secretKey, { apiVersion: "2024-06-20" });
}

function getSiteUrl() {
  return process.env.PUBLIC_SITE_URL || process.env.VITE_SITE_URL || "http://localhost:5173";
}

function getPlatformFeeRate() {
  const raw = Number(process.env.STRIPE_PLATFORM_FEE_PERCENT || 15);
  if (!Number.isFinite(raw) || raw < 0 || raw > 100) {
    return 0.15;
  }
  return raw / 100;
}

function calculateFeeBreakdown(amount) {
  const feeRate = getPlatformFeeRate();
  const platformFeeAmount = Math.round(amount * feeRate);
  const caregiverAmount = amount - platformFeeAmount;
  return { feeRate, platformFeeAmount, caregiverAmount };
}

router.get("/config", (req, res) => {
  const feeRate = getPlatformFeeRate();
  res.json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || "",
    hasStripeSecretKey: Boolean(process.env.STRIPE_SECRET_KEY),
    hasWebhookSecret: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
    platformFeePercent: Math.round(feeRate * 100)
  });
});

const checkoutSchema = z.object({
  amount: z.number().int().positive().optional(),
  currency: z.string().trim().min(3).max(3).default("gbp"),
  customerEmail: z.string().email().optional(),
  customerId: z.string().optional(),
  connectedAccountId: z.string().optional(),
  priceId: z.string().optional(),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
  metadata: z.record(z.string(), z.string()).optional()
});

router.post("/checkout-session", asyncHandler(async (req, res) => {
  const parsed = checkoutSchema.safeParse(req.body || {});
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
  }

  const stripe = getStripe();
  const data = parsed.data;
  const siteUrl = getSiteUrl();

  if (!data.priceId && !data.amount) {
    return res.status(400).json({ error: "Provide either priceId or amount." });
  }

  const paymentIntentData = data.connectedAccountId && data.amount
    ? {
      application_fee_amount: calculateFeeBreakdown(data.amount).platformFeeAmount,
      transfer_data: { destination: data.connectedAccountId }
    }
    : undefined;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: data.successUrl || `${siteUrl}/caregiver/stripe-payments?status=checkout-success`,
    cancel_url: data.cancelUrl || `${siteUrl}/caregiver/stripe-payments?status=checkout-cancel`,
    customer: data.customerId,
    customer_email: data.customerId ? undefined : data.customerEmail,
    payment_intent_data: paymentIntentData,
    metadata: data.metadata,
    line_items: data.priceId
      ? [{ price: data.priceId, quantity: 1 }]
      : [{
        quantity: 1,
        price_data: {
          currency: data.currency,
          unit_amount: data.amount,
          product_data: { name: "ICare booking payment" }
        }
      }]
  });

  return res.json({
    id: session.id,
    url: session.url,
    platformFeePercent: Math.round(getPlatformFeeRate() * 100)
  });
}));

const subscriptionSchema = z.object({
  priceId: z.string().min(1),
  customerEmail: z.string().email().optional(),
  customerId: z.string().optional(),
  connectedAccountId: z.string().optional(),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
  metadata: z.record(z.string(), z.string()).optional()
});

router.post("/subscription-session", asyncHandler(async (req, res) => {
  const parsed = subscriptionSchema.safeParse(req.body || {});
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
  }

  const stripe = getStripe();
  const data = parsed.data;
  const siteUrl = getSiteUrl();

  const subscriptionData = data.connectedAccountId
    ? {
      application_fee_percent: Number((getPlatformFeeRate() * 100).toFixed(2)),
      transfer_data: { destination: data.connectedAccountId }
    }
    : undefined;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    success_url: data.successUrl || `${siteUrl}/caregiver/stripe-payments?status=subscription-success`,
    cancel_url: data.cancelUrl || `${siteUrl}/caregiver/stripe-payments?status=subscription-cancel`,
    customer: data.customerId,
    customer_email: data.customerId ? undefined : data.customerEmail,
    subscription_data: subscriptionData,
    metadata: data.metadata,
    line_items: [{ price: data.priceId, quantity: 1 }]
  });

  return res.json({
    id: session.id,
    url: session.url,
    platformFeePercent: Math.round(getPlatformFeeRate() * 100)
  });
}));

const connectSchema = z.object({
  email: z.string().email().optional(),
  country: z.string().trim().length(2).default("GB"),
  refreshUrl: z.string().url().optional(),
  returnUrl: z.string().url().optional(),
  metadata: z.record(z.string(), z.string()).optional()
});

router.post("/connect/account", asyncHandler(async (req, res) => {
  const parsed = connectSchema.safeParse(req.body || {});
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
  }

  const stripe = getStripe();
  const data = parsed.data;
  const siteUrl = getSiteUrl();

  const account = await stripe.accounts.create({
    type: "express",
    country: data.country,
    email: data.email,
    metadata: data.metadata,
    capabilities: {
      transfers: { requested: true }
    }
  });

  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    type: "account_onboarding",
    refresh_url: data.refreshUrl || `${siteUrl}/caregiver/stripe-payments?status=connect-refresh`,
    return_url: data.returnUrl || `${siteUrl}/caregiver/stripe-payments?status=connect-return&account=${account.id}`
  });

  return res.json({
    accountId: account.id,
    onboardingUrl: accountLink.url
  });
}));

const loginLinkSchema = z.object({
  accountId: z.string().min(1)
});

router.post("/connect/dashboard-link", asyncHandler(async (req, res) => {
  const parsed = loginLinkSchema.safeParse(req.body || {});
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
  }

  const stripe = getStripe();
  const link = await stripe.accounts.createLoginLink(parsed.data.accountId);
  return res.json({ url: link.url });
}));

const payoutSchema = z.object({
  accountId: z.string().min(1),
  amount: z.number().int().positive(),
  currency: z.string().trim().min(3).max(3).default("gbp"),
  description: z.string().optional()
});

router.post("/connect/payout", asyncHandler(async (req, res) => {
  const parsed = payoutSchema.safeParse(req.body || {});
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
  }

  const stripe = getStripe();
  const data = parsed.data;
  const breakdown = calculateFeeBreakdown(data.amount);

  const transfer = await stripe.transfers.create({
    amount: breakdown.caregiverAmount,
    currency: data.currency,
    destination: data.accountId,
    description: data.description || "ICare caregiver payout transfer"
  });

  const payout = await stripe.payouts.create(
    {
      amount: breakdown.caregiverAmount,
      currency: data.currency,
      statement_descriptor: "ICARE PAYOUT"
    },
    { stripeAccount: data.accountId }
  );

  return res.json({
    transferId: transfer.id,
    payoutId: payout.id,
    grossAmount: data.amount,
    platformFeeAmount: breakdown.platformFeeAmount,
    caregiverAmount: breakdown.caregiverAmount,
    platformFeePercent: Math.round(breakdown.feeRate * 100)
  });
}));

export async function handleStripeWebhook(req, res) {
  try {
    const signature = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const stripe = getStripe();
    let event;

    if (webhookSecret) {
      if (!signature) {
        return res.status(400).send("Missing stripe-signature header");
      }
      event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
    } else {
      event = req.body;
    }

    switch (event.type) {
      case "checkout.session.completed":
      case "invoice.paid":
      case "customer.subscription.created":
      case "customer.subscription.deleted":
      case "account.updated":
      case "payout.paid":
      case "payout.failed":
      case "transfer.created":
        console.log(`[stripe webhook] ${event.type}`, event.data?.object?.id || "");
        break;
      default:
        console.log(`[stripe webhook] unhandled ${event.type}`);
        break;
    }

    return res.json({ received: true });
  } catch (error) {
    console.error("[stripe webhook] error:", error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }
}

export default router;
