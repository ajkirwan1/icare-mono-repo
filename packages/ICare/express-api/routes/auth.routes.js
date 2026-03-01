import crypto from "node:crypto";
import { Router } from "express";
import { z } from "zod";
import { pool } from "../db/db.js";

const router = Router();
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
    marketingConsent: z.boolean().optional().default(false)
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

async function verifyPassword(plainPassword, passwordHash) {
    const result = await pool.query("SELECT crypt($1, $2) = $2 AS ok", [plainPassword, passwordHash]);
    return Boolean(result.rows?.[0]?.ok);
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

router.post("/register", async (req, res) => {
    const parsed = registerSchema.safeParse(req.body || {});
    if (!parsed.success) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Please fix validation errors.",
                details: zodFieldErrors(parsed.error)
            }
        });
    }

    const payload = parsed.data;
    if ((payload.userType === "care_receiver" || payload.userType === "family") && payload.dateOfBirth && !isAdult(payload.dateOfBirth)) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Please fix validation errors.",
                details: {
                    dateOfBirth: "Care receiver/family account holder must be 18+."
                }
            }
        });
    }

    try {
        const hashResult = await pool.query("SELECT crypt($1, gen_salt('bf', 10)) AS hash", [payload.password]);
        const passwordHash = String(hashResult.rows?.[0]?.hash || "");
        if (!passwordHash) {
            throw new Error("Password hash generation failed.");
        }

        const insert = await pool.query(
            `
            INSERT INTO users (
              email, email_verified, email_verified_at, password_hash,
              phone, phone_verified, phone_verified_at, phone_country_code,
              user_type, first_name, last_name, date_of_birth,
              account_status, gdpr_consent, gdpr_consent_date, marketing_consent,
              created_at, updated_at
            ) VALUES (
              $1, FALSE, NULL, $2,
              $3, FALSE, NULL, $4,
              $5, $6, $7, $8,
              'active', $9, NOW(), $10,
              NOW(), NOW()
            )
            RETURNING id, email, user_type
            `,
            [
                payload.email.toLowerCase(),
                passwordHash,
                payload.phone,
                payload.phoneCountryCode || null,
                payload.userType,
                payload.firstName,
                payload.lastName,
                payload.dateOfBirth || null,
                payload.gdprConsent,
                payload.marketingConsent
            ]
        );

        const created = insert.rows[0];
        return res.status(201).json({
            success: true,
            data: {
                userId: created.id,
                email: created.email,
                userType: created.user_type,
                emailVerificationSent: true,
                phoneVerificationSent: true
            }
        });
    } catch (error) {
        if (error?.code === "23505") {
            return res.status(409).json({
                success: false,
                error: {
                    code: "RESOURCE_CONFLICT",
                    message: "Email already registered."
                }
            });
        }

        if (error?.code === "42P01") {
            return res.status(500).json({
                success: false,
                error: {
                    code: "DATABASE_NOT_READY",
                    message: "Users table does not exist. Run DB migrations first."
                }
            });
        }

        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: "Registration failed."
            }
        });
    }
});

router.post("/login", async (req, res) => {
    const parsed = loginSchema.safeParse(req.body || {});
    if (!parsed.success) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Please fix validation errors.",
                details: zodFieldErrors(parsed.error)
            }
        });
    }

    const payload = parsed.data;

    try {
        const userQuery = await pool.query(
            `
            SELECT
              id, email, password_hash, user_type, first_name, last_name,
              email_verified, phone_verified, account_status,
              failed_login_attempts, account_locked_until
            FROM users
            WHERE email = $1 AND deleted_at IS NULL
            LIMIT 1
            `,
            [payload.email.toLowerCase()]
        );

        const user = userQuery.rows?.[0];
        if (!user) {
            return res.status(401).json(genericInvalidCredentials(LOGIN_MAX_ATTEMPTS - 1));
        }

        if (user.account_status === "suspended" || user.account_status === "banned" || user.account_status === "deactivated") {
            return res.status(403).json({
                success: false,
                error: {
                    code: "ACCOUNT_UNAVAILABLE",
                    message: "Your account is not active. Contact support for assistance."
                }
            });
        }

        const lockUntil = user.account_locked_until ? new Date(user.account_locked_until) : null;
        if (lockUntil && lockUntil.getTime() > Date.now()) {
            return res.status(403).json({
                success: false,
                error: {
                    code: "ACCOUNT_LOCKED",
                    message: "Too many failed login attempts. Account locked for 10 minutes.",
                    lockoutExpiresAt: lockUntil.toISOString()
                }
            });
        }

        const passwordOk = await verifyPassword(payload.password, user.password_hash);
        if (!passwordOk) {
            const nextAttempts = Number(user.failed_login_attempts || 0) + 1;
            const remainingAttempts = Math.max(0, LOGIN_MAX_ATTEMPTS - nextAttempts);

            if (nextAttempts >= LOGIN_MAX_ATTEMPTS) {
                const locked = await pool.query(
                    `
                    UPDATE users
                    SET failed_login_attempts = $2,
                        last_failed_login = NOW(),
                        account_locked_until = NOW() + ($3::text || ' minutes')::interval,
                        updated_at = NOW()
                    WHERE id = $1
                    RETURNING account_locked_until
                    `,
                    [user.id, nextAttempts, LOGIN_LOCK_MINUTES]
                );

                return res.status(403).json({
                    success: false,
                    error: {
                        code: "ACCOUNT_LOCKED",
                        message: "Too many failed login attempts. Account locked for 10 minutes.",
                        lockoutExpiresAt: new Date(locked.rows?.[0]?.account_locked_until || Date.now()).toISOString()
                    }
                });
            }

            await pool.query(
                `
                UPDATE users
                SET failed_login_attempts = $2,
                    last_failed_login = NOW(),
                    account_locked_until = NULL,
                    updated_at = NOW()
                WHERE id = $1
                `,
                [user.id, nextAttempts]
            );

            return res.status(401).json(genericInvalidCredentials(remainingAttempts));
        }

        await pool.query(
            `
            UPDATE users
            SET failed_login_attempts = 0,
                last_failed_login = NULL,
                account_locked_until = NULL,
                last_login_at = NOW(),
                last_login_ip = $2::inet,
                updated_at = NOW()
            WHERE id = $1
            `,
            [user.id, req.ip || null]
        );

        const accessToken = issueToken(32);
        const refreshToken = issueToken(48);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/"
        });

        return res.status(200).json({
            success: true,
            data: {
                accessToken,
                refreshToken,
                expiresIn: 86400,
                user: {
                    id: user.id,
                    email: user.email,
                    userType: user.user_type,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    emailVerified: Boolean(user.email_verified),
                    phoneVerified: Boolean(user.phone_verified),
                    accountStatus: user.account_status
                }
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: "Login failed."
            }
        });
    }
});

router.post("/forgot-password", async (req, res) => {
    const parsed = forgotPasswordSchema.safeParse(req.body || {});
    if (!parsed.success) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Please fix validation errors.",
                details: zodFieldErrors(parsed.error)
            }
        });
    }

    const payload = parsed.data;
    const genericSuccess = {
        success: true,
        data: {
            message: "If an account with that email exists, a password reset link has been sent."
        }
    };

    try {
        const userResult = await pool.query(
            "SELECT id FROM users WHERE email = $1 AND deleted_at IS NULL LIMIT 1",
            [payload.email.toLowerCase()]
        );
        const user = userResult.rows?.[0];
        if (!user) {
            return res.status(200).json(genericSuccess);
        }

        const rateResult = await pool.query(
            `
            SELECT
              COUNT(*)::int AS count,
              MIN(created_at) AS oldest_created_at
            FROM password_reset_tokens
            WHERE user_id = $1
              AND created_at > NOW() - ($2::text || ' minutes')::interval
            `,
            [user.id, RESET_WINDOW_MINUTES]
        );
        const requestCount = Number(rateResult.rows?.[0]?.count || 0);
        if (requestCount >= RESET_MAX_REQUESTS) {
            const oldest = new Date(rateResult.rows?.[0]?.oldest_created_at || Date.now());
            const elapsed = Math.floor((Date.now() - oldest.getTime()) / 1000);
            const retryAfterSeconds = Math.max(1, RESET_WINDOW_MINUTES * 60 - elapsed);
            res.setHeader("Retry-After", String(retryAfterSeconds));
            return res.status(429).json({
                success: false,
                error: {
                    code: "RATE_LIMIT_EXCEEDED",
                    message: "Too many reset requests. Please try again later.",
                    retryAfterSeconds
                }
            });
        }

        const resetToken = issueToken(32);
        const tokenHash = hashSha256(resetToken);
        const inserted = await pool.query(
            `
            INSERT INTO password_reset_tokens (
              user_id, token_hash, expires_at, requested_ip, created_at
            ) VALUES (
              $1, $2, NOW() + ($3::text || ' minutes')::interval, $4::inet, NOW()
            )
            RETURNING id
            `,
            [user.id, tokenHash, RESET_TOKEN_EXPIRY_MINUTES, req.ip || null]
        );

        if (process.env.NODE_ENV !== "production") {
            return res.status(200).json({
                ...genericSuccess,
                data: {
                    ...genericSuccess.data,
                    debugResetToken: resetToken,
                    debugResetRecordId: inserted.rows?.[0]?.id || null
                }
            });
        }

        return res.status(200).json(genericSuccess);
    } catch (error) {
        if (error?.code === "42P01") {
            return res.status(500).json({
                success: false,
                error: {
                    code: "DATABASE_NOT_READY",
                    message: "Password reset table does not exist. Run DB migrations first."
                }
            });
        }

        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: "Could not process password reset request."
            }
        });
    }
});

router.post("/reset-password", async (req, res) => {
    const parsed = resetPasswordSchema.safeParse(req.body || {});
    if (!parsed.success) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Please fix validation errors.",
                details: zodFieldErrors(parsed.error)
            }
        });
    }

    const payload = parsed.data;
    const tokenHash = hashSha256(payload.token);
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const tokenResult = await client.query(
            `
            SELECT prt.id, prt.user_id
            FROM password_reset_tokens prt
            JOIN users u ON u.id = prt.user_id
            WHERE prt.token_hash = $1
              AND prt.used_at IS NULL
              AND prt.expires_at > NOW()
              AND u.deleted_at IS NULL
            LIMIT 1
            `,
            [tokenHash]
        );
        const tokenRow = tokenResult.rows?.[0];
        if (!tokenRow) {
            await client.query("ROLLBACK");
            return res.status(400).json({
                success: false,
                error: {
                    code: "INVALID_RESET_TOKEN",
                    message: "Reset token is invalid or expired."
                }
            });
        }

        await client.query(
            `
            UPDATE users
            SET password_hash = crypt($1, gen_salt('bf', 10)),
                updated_at = NOW()
            WHERE id = $2
            `,
            [payload.newPassword, tokenRow.user_id]
        );

        await client.query(
            `
            UPDATE password_reset_tokens
            SET used_at = NOW()
            WHERE user_id = $1
              AND used_at IS NULL
            `,
            [tokenRow.user_id]
        );

        await client.query("COMMIT");
        return res.status(200).json({
            success: true,
            data: {
                message: "Password reset successfully. Please log in with your new password."
            }
        });
    } catch (error) {
        await client.query("ROLLBACK");
        if (error?.code === "42P01") {
            return res.status(500).json({
                success: false,
                error: {
                    code: "DATABASE_NOT_READY",
                    message: "Password reset table does not exist. Run DB migrations first."
                }
            });
        }

        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: "Password reset failed."
            }
        });
    } finally {
        client.release();
    }
});

export default router;
