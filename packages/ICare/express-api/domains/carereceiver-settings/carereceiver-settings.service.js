import { normalizeUserId } from "../../utils/identity.js";

const STRIPE_CUSTOMER_ID_RE = /^cus_[A-Za-z0-9]+$/;
const defaultNotificationSettings = {
    bookingUpdatesEmail: true,
    bookingRemindersEmail: true,
    newMessagesEmail: true,
    productAnnouncementsEmail: false
};

function resolveViewerId(req) {
    const fromHeader = normalizeUserId(req.get("x-user-id"));
    if (fromHeader) {
        return fromHeader;
    }

    const fromQuery = normalizeUserId(req.query.userId || req.query.uid);
    if (fromQuery) {
        return fromQuery;
    }

    const fromBody = normalizeUserId(req.body?.userId || req.body?.uid);
    if (fromBody) {
        return fromBody;
    }

    return "";
}

function toNotificationSettings(row) {
    return {
        bookingUpdatesEmail: row ? Boolean(row.booking_updates_email) : defaultNotificationSettings.bookingUpdatesEmail,
        bookingRemindersEmail: row ? Boolean(row.booking_reminders_email) : defaultNotificationSettings.bookingRemindersEmail,
        newMessagesEmail: row ? Boolean(row.new_messages_email) : defaultNotificationSettings.newMessagesEmail,
        productAnnouncementsEmail: row ? Boolean(row.product_announcements_email) : defaultNotificationSettings.productAnnouncementsEmail
    };
}

export {
    STRIPE_CUSTOMER_ID_RE,
    defaultNotificationSettings,
    resolveViewerId,
    toNotificationSettings
};
