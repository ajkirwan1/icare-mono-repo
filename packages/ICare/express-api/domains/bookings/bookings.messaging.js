import { pool } from "../../db/db.js";
import {
    formatDateLong,
    buildTimeRangeLabel,
    normalizeSqlDate,
    normalizeSqlTime
} from "./bookings.service.js";

function compactConversationPreview(text, maxLength = 180) {
    const compacted = String(text || "").replace(/\s+/g, " ").trim();
    if (!compacted) {
        return "";
    }
    return compacted.length > maxLength ? `${compacted.slice(0, maxLength - 1)}...` : compacted;
}

export function buildBookingRequestSystemMessage({
    bookingRef,
    bookingDate,
    startTime,
    durationHours,
    specialRequests
}) {
    const reference = String(bookingRef || "").trim() || "Pending";
    const dateLabel = formatDateLong(normalizeSqlDate(bookingDate)) || "To be confirmed";
    const timeLabel = buildTimeRangeLabel(normalizeSqlTime(startTime), durationHours) || "To be confirmed";
    const notes = String(specialRequests || "").trim();
    const lines = [
        `Booking request created (${reference}).`,
        `Schedule: ${dateLabel}, ${timeLabel}.`
    ];
    if (notes) {
        lines.push(`Special requests: ${notes}`);
    }
    return lines.join("\n");
}

export function buildBookingCancellationSystemMessage({
    bookingRef,
    bookingDate,
    startTime,
    durationHours,
    reasonLabel,
    details,
    refundAmount
}) {
    const reference = String(bookingRef || "").trim() || "Pending";
    const dateLabel = formatDateLong(normalizeSqlDate(bookingDate)) || "To be confirmed";
    const timeLabel = buildTimeRangeLabel(normalizeSqlTime(startTime), durationHours) || "To be confirmed";
    const reason = String(reasonLabel || "").trim() || "Other";
    const detailText = String(details || "").trim();
    const lines = [
        `Booking cancelled by care receiver (${reference}).`,
        `Original schedule: ${dateLabel}, ${timeLabel}.`,
        `Reason: ${reason}${detailText ? ` - ${detailText}` : ""}.`
    ];

    if (Number.isFinite(Number(refundAmount))) {
        lines.push(`Refund amount: \u00a3${Number(refundAmount).toFixed(2)}.`);
    }

    return lines.join("\n");
}

export async function ensureConversationForBooking({
    bookingId,
    conversationId,
    careReceiverId,
    caregiverId,
    caregiverName,
    caregiverPhotoUrl,
    caregiverPhone
}) {
    const safeBookingId = String(bookingId || "").trim();
    if (!safeBookingId) {
        return "";
    }

    const safeConversationId = String(conversationId || "").trim() || `conv-${safeBookingId}`;
    await pool.query(
        `
        UPDATE carereceiver_dashboard_bookings
        SET conversation_id = $2,
            updated_at = NOW()
        WHERE id = $1
        `,
        [safeBookingId, safeConversationId]
    );

    await pool.query(
        `
        INSERT INTO carereceiver_conversations (
          id,
          booking_id,
          care_receiver_id,
          caregiver_id,
          caregiver_name,
          caregiver_photo_url,
          caregiver_phone,
          is_active,
          created_at,
          updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, TRUE, NOW(), NOW())
        ON CONFLICT (id) DO UPDATE SET
          booking_id = EXCLUDED.booking_id,
          care_receiver_id = EXCLUDED.care_receiver_id,
          caregiver_id = EXCLUDED.caregiver_id,
          caregiver_name = EXCLUDED.caregiver_name,
          caregiver_photo_url = EXCLUDED.caregiver_photo_url,
          caregiver_phone = EXCLUDED.caregiver_phone,
          is_active = TRUE,
          updated_at = NOW()
        `,
        [
            safeConversationId,
            safeBookingId,
            careReceiverId || null,
            caregiverId || null,
            caregiverName || "Caregiver",
            caregiverPhotoUrl || null,
            caregiverPhone || null
        ]
    );

    return safeConversationId;
}

export async function appendSystemConversationMessage(conversationId, messageText) {
    const safeConversationId = String(conversationId || "").trim();
    const safeMessageText = String(messageText || "").trim();
    if (!safeConversationId || !safeMessageText) {
        return;
    }

    await pool.query(
        `
        INSERT INTO carereceiver_messages (
          conversation_id,
          sender_role,
          sender_name,
          message_text,
          sent_at,
          is_system_message,
          is_flagged
        ) VALUES ($1, 'system', 'ICare System', $2, NOW(), TRUE, FALSE)
        `,
        [safeConversationId, safeMessageText]
    );

    await pool.query(
        `
        UPDATE carereceiver_conversations
        SET
          last_message_preview = $2,
          last_message_at = NOW(),
          updated_at = NOW()
        WHERE id = $1
        `,
        [safeConversationId, compactConversationPreview(safeMessageText)]
    );
}
