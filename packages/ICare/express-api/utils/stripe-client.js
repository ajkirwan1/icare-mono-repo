import Stripe from "stripe";

const STRIPE_API_VERSION = "2024-06-20";

let cachedClient = null;

function getStripeSecretKey() {
    return String(
        process.env.STRIPE_SECRET_KEY ||
        process.env.STRIPE_SECRET_KEY_TEST ||
        ""
    ).trim();
}

export function getStripeClient() {
    const secretKey = getStripeSecretKey();
    if (!secretKey) {
        const error = new Error("Stripe is not configured on API.");
        error.code = "STRIPE_NOT_CONFIGURED";
        throw error;
    }

    if (!cachedClient) {
        cachedClient = new Stripe(secretKey, { apiVersion: STRIPE_API_VERSION });
    }

    return cachedClient;
}

export function getStripeClientIfConfigured() {
    const secretKey = getStripeSecretKey();
    if (!secretKey) {
        return null;
    }

    if (!cachedClient) {
        cachedClient = new Stripe(secretKey, { apiVersion: STRIPE_API_VERSION });
    }

    return cachedClient;
}

export function isStripeConfigured() {
    const key = getStripeSecretKey();
    return key.startsWith("sk_test_") || key.startsWith("sk_live_");
}
