import Stripe from "stripe";

const STRIPE_API_VERSION = "2024-06-20";

let stripeClient = null;

function getStripeSecretKey() {
    return String(
        process.env.STRIPE_SECRET_KEY ||
        process.env.STRIPE_SECRET_KEY_TEST ||
        ""
    ).trim();
}

function stripeErrorMessage(error, fallback = "Stripe operation failed.") {
    const message = error?.raw?.message || error?.message || "";
    return String(message || fallback).trim();
}

function toMinorUnits(amount) {
    return Math.max(0, Math.round(Number(amount || 0) * 100));
}

function assertStripeClient() {
    const secretKey = getStripeSecretKey();
    if (!secretKey) {
        const error = new Error("Stripe is not configured on API.");
        error.code = "STRIPE_NOT_CONFIGURED";
        throw error;
    }

    if (!stripeClient) {
        stripeClient = new Stripe(secretKey, { apiVersion: STRIPE_API_VERSION });
    }

    return stripeClient;
}

export function isStripeServerConfigured() {
    const key = getStripeSecretKey();
    return key.startsWith("sk_test_") || key.startsWith("sk_live_");
}

export async function captureBookingPaymentIntent({
    paymentIntentId,
    bookingId = "",
    amount = null
}) {
    const stripe = assertStripeClient();
    const id = String(paymentIntentId || "").trim();
    if (!id.startsWith("pi_")) {
        const error = new Error("Invalid payment intent id.");
        error.code = "PAYMENT_INTENT_INVALID";
        throw error;
    }

    const intent = await stripe.paymentIntents.retrieve(id);
    if (intent.status === "succeeded") {
        return intent;
    }

    if (intent.status === "canceled") {
        const error = new Error("Payment authorization was already cancelled.");
        error.code = "PAYMENT_INTENT_CANCELED";
        throw error;
    }

    if (intent.status !== "requires_capture") {
        const error = new Error(`Payment intent is not capturable (status: ${intent.status}).`);
        error.code = "PAYMENT_INTENT_NOT_CAPTURABLE";
        throw error;
    }

    const captureArgs = {};
    const minorAmount = toMinorUnits(amount);
    if (minorAmount > 0 && Number(intent.amount_capturable || 0) > 0) {
        captureArgs.amount_to_capture = Math.min(minorAmount, Number(intent.amount_capturable || 0));
    }

    return stripe.paymentIntents.capture(id, captureArgs, {
        idempotencyKey: `icare-booking-${String(bookingId || id)}-capture-v1`
    });
}

export async function cancelBookingPaymentIntent({ paymentIntentId, bookingId = "" }) {
    const stripe = assertStripeClient();
    const id = String(paymentIntentId || "").trim();
    if (!id.startsWith("pi_")) {
        const error = new Error("Invalid payment intent id.");
        error.code = "PAYMENT_INTENT_INVALID";
        throw error;
    }

    const intent = await stripe.paymentIntents.retrieve(id);
    if (intent.status === "canceled") {
        return intent;
    }

    return stripe.paymentIntents.cancel(id, {}, {
        idempotencyKey: `icare-booking-${String(bookingId || id)}-cancel-v1`
    });
}

export async function refundCapturedBookingPaymentIntent({
    paymentIntentId,
    amount = null,
    bookingId = "",
    reason = "requested_by_customer"
}) {
    const stripe = assertStripeClient();
    const id = String(paymentIntentId || "").trim();
    if (!id.startsWith("pi_")) {
        const error = new Error("Invalid payment intent id.");
        error.code = "PAYMENT_INTENT_INVALID";
        throw error;
    }

    const refundData = {
        payment_intent: id,
        reason
    };
    const minorAmount = toMinorUnits(amount);
    if (minorAmount > 0) {
        refundData.amount = minorAmount;
    }

    return stripe.refunds.create(refundData, {
        idempotencyKey: `icare-booking-${String(bookingId || id)}-refund-${minorAmount || "full"}-v1`
    });
}

export async function attachBookingMetadataToPaymentIntent({
    paymentIntentId,
    bookingId,
    careReceiverId = "",
    caregiverId = ""
}) {
    const stripe = assertStripeClient();
    const id = String(paymentIntentId || "").trim();
    if (!id.startsWith("pi_")) {
        return null;
    }

    return stripe.paymentIntents.update(id, {
        metadata: {
            source: "icare-booking-request",
            booking_id: String(bookingId || ""),
            care_receiver_id: String(careReceiverId || ""),
            caregiver_id: String(caregiverId || "")
        }
    });
}

export function readableStripeError(error, fallback = "Stripe operation failed.") {
    return stripeErrorMessage(error, fallback);
}
