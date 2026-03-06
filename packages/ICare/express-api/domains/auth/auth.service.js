import crypto from "node:crypto";
import { z } from "zod";

const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_LOCK_MINUTES = 10;
const RESET_WINDOW_MINUTES = 15;
const RESET_MAX_REQUESTS = 3;
const RESET_TOKEN_EXPIRY_MINUTES = 60;

const strongPasswordSchema = z
    .string()
    .min(8)
    .regex(/[a-z]/, "Password must include a lowercase letter.")
    .regex(/[A-Z]/, "Password must include an uppercase letter.")
    .regex(/\d/, "Password must include a number.")
    .regex(/[^\w\s]/, "Password must include a special character.");

const registerSchema = z.object({
    userType: z.enum(["care_receiver", "family", "caregiver"]),
    email: z.string().trim().email(),
    password: strongPasswordSchema,
    firstName: z.string().trim().min(1),
    lastName: z.string().trim().min(1),
    phone: z
        .string()
        .trim()
        .regex(/^\+[1-9]\d{7,14}$/, "Phone must use international format, e.g. +447700900123."),
    phoneCountryCode: z.string().trim().regex(/^\+[1-9]\d{0,3}$/).optional(),
    dateOfBirth: z.string().date().optional(),
    gdprConsent: z.literal(true),
    marketingConsent: z.boolean().optional().default(false),
    termsAcceptedAt: z.string().trim().optional()
});
const loginSchema = z.object({
    email: z.string().trim().email(),
    password: z.string().min(1)
});
const forgotPasswordSchema = z.object({
    email: z.string().trim().email()
});
const resetPasswordSchema = z.object({
    token: z.string().trim().min(20),
    newPassword: strongPasswordSchema
});

function zodFieldErrors(error) {
    const details = {};
    for (const issue of error?.issues || []) {
        const key = issue.path?.[0];
        if (!key || details[key]) continue;
        details[key] = issue.message;
    }
    return details;
}

function isAdult(dateOfBirthIso) {
    if (!dateOfBirthIso) return true;
    const dob = new Date(`${dateOfBirthIso}T00:00:00Z`);
    if (Number.isNaN(dob.getTime())) return false;
    const now = new Date();
    let age = now.getUTCFullYear() - dob.getUTCFullYear();
    const monthDiff = now.getUTCMonth() - dob.getUTCMonth();
    const dayDiff = now.getUTCDate() - dob.getUTCDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age -= 1;
    return age >= 18;
}

function hashSha256(value) {
    return crypto.createHash("sha256").update(String(value)).digest("hex");
}

function issueToken(bytes = 32) {
    return crypto.randomBytes(bytes).toString("hex");
}

function genericInvalidCredentials(remainingAttempts = 0) {
    return {
        success: false,
        error: {
            code: "INVALID_CREDENTIALS",
            message: "Invalid email or password.",
            remainingAttempts
        }
    };
}

export {
    LOGIN_MAX_ATTEMPTS,
    LOGIN_LOCK_MINUTES,
    RESET_WINDOW_MINUTES,
    RESET_MAX_REQUESTS,
    RESET_TOKEN_EXPIRY_MINUTES,
    registerSchema,
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    zodFieldErrors,
    isAdult,
    hashSha256,
    issueToken,
    genericInvalidCredentials
};
