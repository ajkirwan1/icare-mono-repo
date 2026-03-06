/* global console, process */
import { z } from "zod";

function asyncHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((error) => {
            console.error("[stripe api] error:", error.message);
            res.status(500).json({ error: error.message || "Stripe request failed" });
        });
    };
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

const subscriptionSchema = z.object({
    priceId: z.string().min(1),
    customerEmail: z.string().email().optional(),
    customerId: z.string().optional(),
    connectedAccountId: z.string().optional(),
    successUrl: z.string().url().optional(),
    cancelUrl: z.string().url().optional(),
    metadata: z.record(z.string(), z.string()).optional()
});

const connectSchema = z.object({
    email: z.string().email().optional(),
    country: z.string().trim().length(2).default("GB"),
    refreshUrl: z.string().url().optional(),
    returnUrl: z.string().url().optional(),
    metadata: z.record(z.string(), z.string()).optional()
});

const loginLinkSchema = z.object({
    accountId: z.string().min(1)
});

const payoutSchema = z.object({
    accountId: z.string().min(1),
    amount: z.number().int().positive(),
    currency: z.string().trim().min(3).max(3).default("gbp"),
    description: z.string().optional()
});

export {
    asyncHandler,
    getSiteUrl,
    getPlatformFeeRate,
    calculateFeeBreakdown,
    checkoutSchema,
    subscriptionSchema,
    connectSchema,
    loginLinkSchema,
    payoutSchema
};
