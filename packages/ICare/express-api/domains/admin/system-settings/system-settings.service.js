/* global process */
import {
    buildDefaultSystemSettings,
    clampPercent,
    getPlatformFeePercentFromEnv,
    readAdminPlatformSnapshot,
    readAdminSystemSettings,
    updateAdminSystemSettings
} from "./system-settings.repository.js";

function isStripeConfigured() {
    const key = String(process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY_TEST || "").trim();
    return key.startsWith("sk_test_") || key.startsWith("sk_live_");
}

export async function getAdminSystemSettingsSnapshot() {
    const [settings, platformSummary] = await Promise.all([
        readAdminSystemSettings(),
        readAdminPlatformSnapshot()
    ]);

    return {
        payments: settings.payments,
        verification: settings.verification,
        meta: settings.meta,
        platform: {
            stripeConfigured: isStripeConfigured(),
            apiEnvironment: String(process.env.NODE_ENV || "development"),
            totalUsers: platformSummary.totalUsers,
            activeUsers: platformSummary.activeUsers,
            pendingVerifications: platformSummary.pendingVerifications,
            approvedVerifications: platformSummary.approvedVerifications,
            rejectedVerifications: platformSummary.rejectedVerifications
        }
    };
}

export async function getPublicPlatformSettingsSnapshot() {
    const settings = await readAdminSystemSettings();
    return {
        payments: settings.payments,
        verification: settings.verification,
        meta: settings.meta
    };
}

export async function saveAdminSystemSettings(payload, actor = "admin") {
    const defaults = buildDefaultSystemSettings();
    const current = await readAdminSystemSettings();

    const nextPlatformFeePercent = payload.platformFeePercent === undefined
        ? clampPercent(current?.payments?.platformFeePercent, getPlatformFeePercentFromEnv())
        : clampPercent(payload.platformFeePercent, getPlatformFeePercentFromEnv());

    const nextBookingServiceFeePercent = payload.bookingServiceFeePercent === undefined
        ? clampPercent(current?.payments?.bookingServiceFeePercent, defaults.payments.bookingServiceFeePercent)
        : clampPercent(payload.bookingServiceFeePercent, defaults.payments.bookingServiceFeePercent);

    const nextIdentityRequired = payload.identityRequired === undefined
        ? Boolean(current?.verification?.identityRequired)
        : Boolean(payload.identityRequired);

    const nextRightToWorkRequired = payload.rightToWorkRequired === undefined
        ? Boolean(current?.verification?.rightToWorkRequired)
        : Boolean(payload.rightToWorkRequired);

    const nextDbsRequired = payload.dbsRequired === undefined
        ? Boolean(current?.verification?.dbsRequired)
        : Boolean(payload.dbsRequired);

    const updated = await updateAdminSystemSettings({
        platformFeePercent: nextPlatformFeePercent,
        bookingServiceFeePercent: nextBookingServiceFeePercent,
        identityRequired: nextIdentityRequired,
        rightToWorkRequired: nextRightToWorkRequired,
        dbsRequired: nextDbsRequired,
        updatedBy: String(actor || "admin").trim() || "admin"
    });

    return {
        payments: updated.payments,
        verification: updated.verification,
        meta: updated.meta
    };
}
