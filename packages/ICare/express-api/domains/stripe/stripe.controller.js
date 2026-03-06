/* global console, process */
import { pool } from "../../db/db.js";
import { getStripeClient } from "../../utils/stripe-client.js";
import {
    getSiteUrl,
    getPlatformFeeRate,
    calculateFeeBreakdown,
    checkoutSchema,
    subscriptionSchema,
    connectSchema,
    loginLinkSchema,
    payoutSchema
} from "./stripe.service.js";

export function getConfig(req, res) {
    const feeRate = getPlatformFeeRate();
    const secretKey = String(process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY_TEST || "").trim();
    const publishableKey = String(process.env.STRIPE_PUBLISHABLE_KEY || process.env.STRIPE_PUBLISHABLE_KEY_TEST || "").trim();
    const webhookSecret = String(process.env.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET_TEST || "").trim();
    res.json({
        publishableKey,
        hasStripeSecretKey: Boolean(secretKey),
        hasWebhookSecret: Boolean(webhookSecret),
        platformFeePercent: Math.round(feeRate * 100)
    });
}

export async function createCheckoutSession(req, res) {
    const parsed = checkoutSchema.safeParse(req.body || {});
    if (!parsed.success) {
        return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
    }

    const stripe = getStripeClient();
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
}

export async function createSubscriptionSession(req, res) {
    const parsed = subscriptionSchema.safeParse(req.body || {});
    if (!parsed.success) {
        return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
    }

    const stripe = getStripeClient();
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
}

export async function createConnectAccount(req, res) {
    const parsed = connectSchema.safeParse(req.body || {});
    if (!parsed.success) {
        return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
    }

    const stripe = getStripeClient();
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
}

export async function createDashboardLink(req, res) {
    const parsed = loginLinkSchema.safeParse(req.body || {});
    if (!parsed.success) {
        return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
    }

    const stripe = getStripeClient();
    const link = await stripe.accounts.createLoginLink(parsed.data.accountId);
    return res.json({ url: link.url });
}

export async function createPayout(req, res) {
    const parsed = payoutSchema.safeParse(req.body || {});
    if (!parsed.success) {
        return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
    }

    const stripe = getStripeClient();
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
}

export async function handleStripeWebhook(req, res) {
    try {
        const signature = req.headers["stripe-signature"];
        const webhookSecret = String(process.env.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET_TEST || "").trim();
        const stripe = getStripeClient();
        let event;
        const rawBody = Buffer.isBuffer(req.body)
            ? req.body.toString("utf8")
            : typeof req.body === "string"
                ? req.body
                : JSON.stringify(req.body || {});

        if (webhookSecret) {
            if (!signature) {
                return res.status(400).send("Missing stripe-signature header");
            }
            event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
        } else {
            event = typeof req.body === "object" && !Buffer.isBuffer(req.body)
                ? req.body
                : JSON.parse(rawBody || "{}");
        }

        const object = event?.data?.object || {};
        const paymentIntentId = String(object?.id?.startsWith("pi_") ? object.id : object?.payment_intent || "").trim();

        const syncBookingPaymentStatus = async ({
            status = null,
            lastError = null,
            refundId = null,
            capturedAt = null,
            cancelledAt = null,
            refundedAt = null
        }) => {
            if (!paymentIntentId) {
                return;
            }

            try {
                await pool.query(
                    `
          UPDATE carereceiver_dashboard_bookings
          SET
            payment_status = COALESCE($2, payment_status),
            payment_last_error = $3,
            payment_refund_id = COALESCE($4, payment_refund_id),
            payment_captured_at = COALESCE($5::timestamp, payment_captured_at),
            payment_cancelled_at = COALESCE($6::timestamp, payment_cancelled_at),
            payment_refunded_at = COALESCE($7::timestamp, payment_refunded_at),
            updated_at = NOW()
          WHERE payment_intent_id = $1
          `,
                    [paymentIntentId, status, lastError, refundId, capturedAt, cancelledAt, refundedAt]
                );
            } catch (error) {
                const missingColumn = error?.code === "42703" && /payment_/i.test(String(error?.message || ""));
                if (!missingColumn) {
                    throw error;
                }
                console.warn("[stripe webhook] payment columns missing, skipping booking sync");
            }
        };

        switch (event.type) {
            case "payment_intent.amount_capturable_updated":
                await syncBookingPaymentStatus({ status: "authorized", lastError: null });
                console.log(`[stripe webhook] ${event.type}`, paymentIntentId || object?.id || "");
                break;
            case "payment_intent.succeeded":
                await syncBookingPaymentStatus({
                    status: "captured",
                    lastError: null,
                    capturedAt: new Date().toISOString()
                });
                console.log(`[stripe webhook] ${event.type}`, paymentIntentId || object?.id || "");
                break;
            case "payment_intent.canceled":
                await syncBookingPaymentStatus({
                    status: "authorization_released",
                    lastError: null,
                    cancelledAt: new Date().toISOString()
                });
                console.log(`[stripe webhook] ${event.type}`, paymentIntentId || object?.id || "");
                break;
            case "payment_intent.payment_failed":
                await syncBookingPaymentStatus({
                    status: "failed",
                    lastError: String(object?.last_payment_error?.message || "Payment failed.")
                });
                console.log(`[stripe webhook] ${event.type}`, paymentIntentId || object?.id || "");
                break;
            case "refund.created":
                await syncBookingPaymentStatus({
                    status: "refunded",
                    lastError: null,
                    refundId: String(object?.id || "").trim() || null,
                    refundedAt: new Date().toISOString()
                });
                console.log(`[stripe webhook] ${event.type}`, paymentIntentId || object?.id || "");
                break;
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
