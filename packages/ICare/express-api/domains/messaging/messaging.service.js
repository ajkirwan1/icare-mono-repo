import { sanitizeMessage } from "../../../app/utils/contact-protection.js";

function compactMessagePreview(text, maxLength = 100) {
    const compact = String(text || "").replace(/\s+/g, " ").trim();
    if (compact.length <= maxLength) {
        return compact;
    }
    return `${compact.slice(0, maxLength - 1)}\u2026`;
}

function sanitizeMessagePayload(text) {
    const sanitized = sanitizeMessage(String(text || ""));
    const hasMaskedContent = Object.values(sanitized.flags).some(Boolean);

    return {
        text: sanitized.sanitizedText,
        flags: sanitized.flags,
        hasMaskedContent
    };
}

function mapMessageForResponse(message, conversation, viewer, opts = {}) {
    const sanitized = sanitizeMessagePayload(message.text);
    const explicitFlag = Boolean(message.isFlagged);
    const isMasked = explicitFlag || sanitized.hasMaskedContent;
    const caregiverSenderId = opts.caregiverSenderId || conversation.caregiverId || "caregiver";
    const careReceiverSenderId = opts.careReceiverSenderId || conversation.careReceiverId || viewer?.id || "care_receiver";

    return {
        id: String(message.id),
        senderId: message.senderRole === "caregiver"
            ? caregiverSenderId
            : careReceiverSenderId,
        senderName: message.senderName,
        senderRole: message.senderRole,
        text: sanitized.text,
        sentAt: message.sentAt,
        readAt: message.readAt,
        isSystemMessage: Boolean(message.isSystemMessage),
        isFlagged: isMasked,
        metadata: {
            contactProtection: {
                masked: isMasked,
                flags: sanitized.flags
            },
            ...(opts.metadata || {})
        }
    };
}

function bookingContextLabel(row) {
    const bookingRef = String(row?.bookingRef || row?.bookingId || "").toUpperCase();
    const status = String(row?.bookingStatus || "").replaceAll("_", " ").trim();

    if (!bookingRef && !status) {
        return "Booking conversation";
    }
    if (!status) {
        return `Booking #${bookingRef}`;
    }
    if (!bookingRef) {
        return status.charAt(0).toUpperCase() + status.slice(1);
    }

    return `Booking #${bookingRef} - ${status.charAt(0).toUpperCase()}${status.slice(1)}`;
}

function makeScopeClause(viewerId, alias = "c", startAt = 1) {
    if (!viewerId) {
        return {
            sql: "",
            params: [],
            nextIndex: startAt
        };
    }

    return {
        sql: `WHERE (${alias}.care_receiver_id IS NULL OR ${alias}.care_receiver_id = $${startAt})`,
        params: [viewerId],
        nextIndex: startAt + 1
    };
}

function buildConversationDto(row) {
    const safeLastMessage = sanitizeMessagePayload(row.lastMessageText || row.lastMessagePreview || "");

    return {
        id: row.id,
        bookingId: row.bookingId || null,
        otherParty: {
            id: row.caregiverId || "",
            name: row.caregiverName || "Caregiver",
            profilePhotoUrl: row.caregiverPhotoUrl || "",
            phone: row.caregiverPhone || ""
        },
        bookingContext: {
            label: bookingContextLabel(row),
            status: row.bookingStatus || null,
            bookingDate: row.bookingDate || null,
            bookingStartTime: row.bookingStartTime || null
        },
        lastMessage: {
            id: row.lastMessageId ? String(row.lastMessageId) : null,
            senderName: row.lastMessageSenderName || row.caregiverName || "",
            text: safeLastMessage.text,
            sentAt: row.lastMessageSentAt || row.lastMessageAt || null,
            read: Boolean(row.lastMessageReadAt)
        },
        unreadCount: Number(row.unreadCount || 0),
        isActive: row.isActive !== false,
        createdAt: row.createdAt || null,
        updatedAt: row.updatedAt || null,
        threadType: row.bookingId ? "booking-linked" : "inquiry"
    };
}

function buildCaregiverConversationDto(row) {
    const careReceiverName = row.careReceiverName || "Care receiver";
    const safeLastMessage = sanitizeMessagePayload(row.lastMessageText || row.lastMessagePreview || "");

    return {
        id: row.id,
        bookingId: row.bookingId || null,
        otherParty: {
            id: row.careReceiverId || "",
            name: careReceiverName,
            profilePhotoUrl: row.careReceiverPhotoUrl || "",
            phone: row.careReceiverPhone || ""
        },
        bookingContext: {
            label: bookingContextLabel(row),
            status: row.bookingStatus || null,
            bookingDate: row.bookingDate || null,
            bookingStartTime: row.bookingStartTime || null
        },
        lastMessage: {
            id: row.lastMessageId ? String(row.lastMessageId) : null,
            senderName: row.lastMessageSenderName || careReceiverName,
            text: safeLastMessage.text,
            sentAt: row.lastMessageSentAt || row.lastMessageAt || null,
            read: Boolean(row.lastMessageReadAt)
        },
        unreadCount: Number(row.unreadCount || 0),
        isActive: row.isActive !== false,
        createdAt: row.createdAt || null,
        updatedAt: row.updatedAt || null,
        threadType: row.bookingId ? "booking-linked" : "inquiry"
    };
}

export {
    compactMessagePreview,
    sanitizeMessagePayload,
    mapMessageForResponse,
    bookingContextLabel,
    makeScopeClause,
    buildConversationDto,
    buildCaregiverConversationDto
};
