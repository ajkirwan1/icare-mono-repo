import {
    sendEmail,
    getSiteUrl,
    escapeHtml,
    loadLogoPngBase64,
    loadLogoPngBase64White,
    wrapEmailHtml
} from "./shared.js";

function formatDateTime(bookingDate, startTime) {
    const date = String(bookingDate || "").trim();
    const time = String(startTime || "").trim();
    if (!date || !time) {
        return "";
    }

    const dateMatch = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    const timeMatch = time.match(/^([01]?\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/);
    if (!dateMatch || !timeMatch) {
        return `${date} ${time}`;
    }

    const parsed = new Date(Date.UTC(
        Number(dateMatch[1]),
        Number(dateMatch[2]) - 1,
        Number(dateMatch[3]),
        Number(timeMatch[1]),
        Number(timeMatch[2]),
        Number(timeMatch[3] || 0)
    ));
    if (Number.isNaN(parsed.getTime())) {
        return `${date} ${time}`;
    }

    return new Intl.DateTimeFormat("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC"
    }).format(parsed);
}

function formatSchedule(bookingDate, startTime, durationHours) {
    const dateTime = formatDateTime(bookingDate, startTime);
    if (!dateTime) {
        return "";
    }

    const duration = Number(durationHours);
    if (!Number.isFinite(duration) || duration <= 0) {
        return dateTime;
    }

    const rounded = Math.round(duration * 10) / 10;
    const label = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
    return `${dateTime} (${label} ${rounded === 1 ? "hour" : "hours"})`;
}

function renderMultilineTextHtml(value) {
    return escapeHtml(String(value || "")).replace(/\r?\n/g, "<br/>");
}

function formatPounds(amount) {
    const parsed = Number(amount);
    if (!Number.isFinite(parsed)) {
        return "";
    }
    return `£${parsed.toFixed(2)}`;
}

export async function sendBookingRequestConfirmationEmail(toEmail, payload) {
    const siteUrl = getSiteUrl();
    const [blackBase64, whiteBase64] = await Promise.all([
        loadLogoPngBase64(),
        loadLogoPngBase64White()
    ]);

    const caregiverName = escapeHtml(payload?.caregiverName || "caregiver");
    const bookingRef = escapeHtml(payload?.bookingRef || "");
    const schedule = escapeHtml(formatSchedule(payload?.bookingDate, payload?.startTime, payload?.durationHours));
    const specialRequests = String(payload?.specialRequests || "").trim();
    const specialRequestsHtml = renderMultilineTextHtml(specialRequests);
    const detailUrl = `${siteUrl}/carereceiver/bookings/${encodeURIComponent(String(payload?.bookingId || ""))}`;

    const html = wrapEmailHtml(
        `
      <h2 style="margin:0 0 12px;">Booking request sent</h2>
      <p style="margin:0 0 12px;line-height:1.6;">
        Your request to <strong>${caregiverName}</strong> has been created.
      </p>
      <div style="margin:16px 0 0;padding:14px 16px;border:1px solid #eee;border-radius:12px;background:#fafafa;">
        <p style="margin:0;line-height:1.6;">
          <strong>Reference:</strong> ${bookingRef || "Pending"}<br/>
          <strong>Schedule:</strong> ${schedule || "To be confirmed"}<br/>
          ${specialRequests ? `<strong>Special requests:</strong><br/>${specialRequestsHtml}` : ""}
        </p>
      </div>
      <p style="margin:16px 0 0;line-height:1.6;">
        <a href="${detailUrl}" style="font-weight:600;">Open booking details</a>
      </p>
    `,
        {
            unsubscribeUrl: null,
            logoCids: { dark: "icare-logo-dark", light: "icare-logo-light" }
        }
    );

    return sendEmail({
        from: process.env.EMAIL_FROM,
        to: toEmail,
        subject: `Booking request sent${bookingRef ? ` (${bookingRef})` : ""} — ICare`,
        html,
        attachments: [
            {
                filename: "icareblack.png",
                content: blackBase64,
                contentType: "image/png",
                contentId: "icare-logo-dark"
            },
            {
                filename: "icarelogo-white.png",
                content: whiteBase64,
                contentType: "image/png",
                contentId: "icare-logo-light"
            }
        ]
    });
}

export async function sendBookingRequestNotificationEmail(toEmail, payload) {
    const siteUrl = getSiteUrl();
    const [blackBase64, whiteBase64] = await Promise.all([
        loadLogoPngBase64(),
        loadLogoPngBase64White()
    ]);

    const careReceiverName = escapeHtml(payload?.careReceiverName || "A care receiver");
    const bookingRef = escapeHtml(payload?.bookingRef || "");
    const schedule = escapeHtml(formatSchedule(payload?.bookingDate, payload?.startTime, payload?.durationHours));
    const specialRequests = String(payload?.specialRequests || "").trim();
    const specialRequestsHtml = renderMultilineTextHtml(specialRequests);
    const listUrl = `${siteUrl}/caregiver/bookings`;

    const html = wrapEmailHtml(
        `
      <h2 style="margin:0 0 12px;">New booking request</h2>
      <p style="margin:0 0 12px;line-height:1.6;">
        ${careReceiverName} sent you a new booking request.
      </p>
      <div style="margin:16px 0 0;padding:14px 16px;border:1px solid #eee;border-radius:12px;background:#fafafa;">
        <p style="margin:0;line-height:1.6;">
          <strong>Reference:</strong> ${bookingRef || "Pending"}<br/>
          <strong>Schedule:</strong> ${schedule || "To be confirmed"}<br/>
          ${specialRequests ? `<strong>Special requests:</strong><br/>${specialRequestsHtml}` : ""}
        </p>
      </div>
      <p style="margin:16px 0 0;line-height:1.6;">
        Please respond within 24 hours.
      </p>
      <p style="margin:8px 0 0;line-height:1.6;">
        <a href="${listUrl}" style="font-weight:600;">Open booking requests</a>
      </p>
    `,
        {
            unsubscribeUrl: null,
            logoCids: { dark: "icare-logo-dark", light: "icare-logo-light" }
        }
    );

    return sendEmail({
        from: process.env.EMAIL_FROM,
        to: toEmail,
        subject: `New booking request${bookingRef ? ` (${bookingRef})` : ""} — ICare`,
        html,
        attachments: [
            {
                filename: "icareblack.png",
                content: blackBase64,
                contentType: "image/png",
                contentId: "icare-logo-dark"
            },
            {
                filename: "icarelogo-white.png",
                content: whiteBase64,
                contentType: "image/png",
                contentId: "icare-logo-light"
            }
        ]
    });
}

export async function sendBookingCancellationConfirmationEmail(toEmail, payload) {
    const siteUrl = getSiteUrl();
    const [blackBase64, whiteBase64] = await Promise.all([
        loadLogoPngBase64(),
        loadLogoPngBase64White()
    ]);

    const caregiverName = escapeHtml(payload?.caregiverName || "caregiver");
    const bookingRef = escapeHtml(payload?.bookingRef || "");
    const schedule = escapeHtml(formatSchedule(payload?.bookingDate, payload?.startTime, payload?.durationHours));
    const reason = escapeHtml(payload?.reason || "");
    const specialRequests = String(payload?.specialRequests || "").trim();
    const specialRequestsHtml = renderMultilineTextHtml(specialRequests);
    const refundLabel = Number.isFinite(Number(payload?.refundAmount))
        ? `£${Number(payload.refundAmount).toFixed(2)}`
        : "";
    const detailUrl = `${siteUrl}/carereceiver/bookings/${encodeURIComponent(String(payload?.bookingId || ""))}`;

    const html = wrapEmailHtml(
        `
      <h2 style="margin:0 0 12px;">Booking cancelled</h2>
      <p style="margin:0 0 12px;line-height:1.6;">
        Your booking with <strong>${caregiverName}</strong> has been cancelled.
      </p>
      <div style="margin:16px 0 0;padding:14px 16px;border:1px solid #eee;border-radius:12px;background:#fafafa;">
        <p style="margin:0;line-height:1.6;">
          <strong>Reference:</strong> ${bookingRef || "Pending"}<br/>
          <strong>Schedule:</strong> ${schedule || "To be confirmed"}<br/>
          ${specialRequests ? `<strong>Special requests:</strong><br/>${specialRequestsHtml}<br/>` : ""}
          ${reason ? `<strong>Reason:</strong> ${reason}<br/>` : ""}
          ${refundLabel ? `<strong>Refund:</strong> ${refundLabel}` : ""}
        </p>
      </div>
      <p style="margin:16px 0 0;line-height:1.6;">
        <a href="${detailUrl}" style="font-weight:600;">Open booking details</a>
      </p>
    `,
        {
            unsubscribeUrl: null,
            logoCids: { dark: "icare-logo-dark", light: "icare-logo-light" }
        }
    );

    return sendEmail({
        from: process.env.EMAIL_FROM,
        to: toEmail,
        subject: `Booking cancelled${bookingRef ? ` (${bookingRef})` : ""} — ICare`,
        html,
        attachments: [
            {
                filename: "icareblack.png",
                content: blackBase64,
                contentType: "image/png",
                contentId: "icare-logo-dark"
            },
            {
                filename: "icarelogo-white.png",
                content: whiteBase64,
                contentType: "image/png",
                contentId: "icare-logo-light"
            }
        ]
    });
}

export async function sendBookingCancellationNotificationEmail(toEmail, payload) {
    const siteUrl = getSiteUrl();
    const [blackBase64, whiteBase64] = await Promise.all([
        loadLogoPngBase64(),
        loadLogoPngBase64White()
    ]);

    const careReceiverName = escapeHtml(payload?.careReceiverName || "A care receiver");
    const bookingRef = escapeHtml(payload?.bookingRef || "");
    const schedule = escapeHtml(formatSchedule(payload?.bookingDate, payload?.startTime, payload?.durationHours));
    const reason = escapeHtml(payload?.reason || "");
    const specialRequests = String(payload?.specialRequests || "").trim();
    const specialRequestsHtml = renderMultilineTextHtml(specialRequests);
    const listUrl = `${siteUrl}/caregiver/bookings`;

    const html = wrapEmailHtml(
        `
      <h2 style="margin:0 0 12px;">Booking cancelled by care receiver</h2>
      <p style="margin:0 0 12px;line-height:1.6;">
        ${careReceiverName} cancelled a booking.
      </p>
      <div style="margin:16px 0 0;padding:14px 16px;border:1px solid #eee;border-radius:12px;background:#fafafa;">
        <p style="margin:0;line-height:1.6;">
          <strong>Reference:</strong> ${bookingRef || "Pending"}<br/>
          <strong>Schedule:</strong> ${schedule || "To be confirmed"}<br/>
          ${specialRequests ? `<strong>Special requests:</strong><br/>${specialRequestsHtml}<br/>` : ""}
          ${reason ? `<strong>Reason:</strong> ${reason}` : ""}
        </p>
      </div>
      <p style="margin:16px 0 0;line-height:1.6;">
        <a href="${listUrl}" style="font-weight:600;">Open bookings</a>
      </p>
    `,
        {
            unsubscribeUrl: null,
            logoCids: { dark: "icare-logo-dark", light: "icare-logo-light" }
        }
    );

    return sendEmail({
        from: process.env.EMAIL_FROM,
        to: toEmail,
        subject: `Booking cancelled${bookingRef ? ` (${bookingRef})` : ""} — ICare`,
        html,
        attachments: [
            {
                filename: "icareblack.png",
                content: blackBase64,
                contentType: "image/png",
                contentId: "icare-logo-dark"
            },
            {
                filename: "icarelogo-white.png",
                content: whiteBase64,
                contentType: "image/png",
                contentId: "icare-logo-light"
            }
        ]
    });
}

export async function sendBookingAcceptedNotificationEmail(toEmail, payload) {
    const siteUrl = getSiteUrl();
    const [blackBase64, whiteBase64] = await Promise.all([
        loadLogoPngBase64(),
        loadLogoPngBase64White()
    ]);

    const caregiverName = escapeHtml(payload?.caregiverName || "Caregiver");
    const bookingRef = escapeHtml(payload?.bookingRef || "");
    const schedule = escapeHtml(formatSchedule(payload?.bookingDate, payload?.startTime, payload?.durationHours));
    const detailUrl = `${siteUrl}/carereceiver/bookings/${encodeURIComponent(String(payload?.bookingId || ""))}`;

    const html = wrapEmailHtml(
        `
      <h2 style="margin:0 0 12px;">Booking confirmed</h2>
      <p style="margin:0 0 12px;line-height:1.6;">
        <strong>${caregiverName}</strong> accepted your booking request.
      </p>
      <div style="margin:16px 0 0;padding:14px 16px;border:1px solid #eee;border-radius:12px;background:#fafafa;">
        <p style="margin:0;line-height:1.6;">
          <strong>Reference:</strong> ${bookingRef || "Pending"}<br/>
          <strong>Schedule:</strong> ${schedule || "To be confirmed"}<br/>
          Contact details are now available in your booking details.
        </p>
      </div>
      <p style="margin:16px 0 0;line-height:1.6;">
        Please keep communication and payment in ICare where possible.
      </p>
      <p style="margin:8px 0 0;line-height:1.6;">
        <a href="${detailUrl}" style="font-weight:600;">Open booking details</a>
      </p>
    `,
        {
            unsubscribeUrl: null,
            logoCids: { dark: "icare-logo-dark", light: "icare-logo-light" }
        }
    );

    return sendEmail({
        from: process.env.EMAIL_FROM,
        to: toEmail,
        subject: `Booking confirmed${bookingRef ? ` (${bookingRef})` : ""} — ICare`,
        html,
        attachments: [
            {
                filename: "icareblack.png",
                content: blackBase64,
                contentType: "image/png",
                contentId: "icare-logo-dark"
            },
            {
                filename: "icarelogo-white.png",
                content: whiteBase64,
                contentType: "image/png",
                contentId: "icare-logo-light"
            }
        ]
    });
}

export async function sendBookingPaymentCapturedReceiptEmail(toEmail, payload) {
    const siteUrl = getSiteUrl();
    const [blackBase64, whiteBase64] = await Promise.all([
        loadLogoPngBase64(),
        loadLogoPngBase64White()
    ]);

    const bookingRef = escapeHtml(payload?.bookingRef || "");
    const caregiverName = escapeHtml(payload?.caregiverName || "Caregiver");
    const schedule = escapeHtml(formatSchedule(payload?.bookingDate, payload?.startTime, payload?.durationHours));
    const amountLabel = escapeHtml(formatPounds(payload?.amount) || "Confirmed");
    const detailUrl = `${siteUrl}/carereceiver/bookings/${encodeURIComponent(String(payload?.bookingId || ""))}`;

    const html = wrapEmailHtml(
        `
      <h2 style="margin:0 0 12px;">Payment confirmed</h2>
      <p style="margin:0 0 12px;line-height:1.6;">
        Your booking payment has been captured in ICare.
      </p>
      <div style="margin:16px 0 0;padding:14px 16px;border:1px solid #eee;border-radius:12px;background:#fafafa;">
        <p style="margin:0;line-height:1.6;">
          <strong>Reference:</strong> ${bookingRef || "Pending"}<br/>
          <strong>Caregiver:</strong> ${caregiverName}<br/>
          <strong>Schedule:</strong> ${schedule || "To be confirmed"}<br/>
          <strong>Amount charged:</strong> ${amountLabel}
        </p>
      </div>
      <p style="margin:16px 0 0;line-height:1.6;">
        <a href="${detailUrl}" style="font-weight:600;">Open booking details</a>
      </p>
    `,
        {
            unsubscribeUrl: null,
            logoCids: { dark: "icare-logo-dark", light: "icare-logo-light" }
        }
    );

    return sendEmail({
        from: process.env.EMAIL_FROM,
        to: toEmail,
        subject: `Payment confirmed${bookingRef ? ` (${bookingRef})` : ""} — ICare`,
        html,
        attachments: [
            {
                filename: "icareblack.png",
                content: blackBase64,
                contentType: "image/png",
                contentId: "icare-logo-dark"
            },
            {
                filename: "icarelogo-white.png",
                content: whiteBase64,
                contentType: "image/png",
                contentId: "icare-logo-light"
            }
        ]
    });
}

export async function sendBookingPaymentCapturedNotificationEmail(toEmail, payload) {
    const siteUrl = getSiteUrl();
    const [blackBase64, whiteBase64] = await Promise.all([
        loadLogoPngBase64(),
        loadLogoPngBase64White()
    ]);

    const bookingRef = escapeHtml(payload?.bookingRef || "");
    const careReceiverName = escapeHtml(payload?.careReceiverName || "Care receiver");
    const schedule = escapeHtml(formatSchedule(payload?.bookingDate, payload?.startTime, payload?.durationHours));
    const amountLabel = escapeHtml(formatPounds(payload?.amount) || "Confirmed");
    const listUrl = `${siteUrl}/caregiver/bookings`;

    const html = wrapEmailHtml(
        `
      <h2 style="margin:0 0 12px;">Booking payment captured</h2>
      <p style="margin:0 0 12px;line-height:1.6;">
        Payment for this booking has been captured from ${careReceiverName}.
      </p>
      <div style="margin:16px 0 0;padding:14px 16px;border:1px solid #eee;border-radius:12px;background:#fafafa;">
        <p style="margin:0;line-height:1.6;">
          <strong>Reference:</strong> ${bookingRef || "Pending"}<br/>
          <strong>Schedule:</strong> ${schedule || "To be confirmed"}<br/>
          <strong>Amount captured:</strong> ${amountLabel}
        </p>
      </div>
      <p style="margin:16px 0 0;line-height:1.6;">
        You can continue managing this booking in your dashboard.
      </p>
      <p style="margin:8px 0 0;line-height:1.6;">
        <a href="${listUrl}" style="font-weight:600;">Open bookings</a>
      </p>
    `,
        {
            unsubscribeUrl: null,
            logoCids: { dark: "icare-logo-dark", light: "icare-logo-light" }
        }
    );

    return sendEmail({
        from: process.env.EMAIL_FROM,
        to: toEmail,
        subject: `Payment captured${bookingRef ? ` (${bookingRef})` : ""} — ICare`,
        html,
        attachments: [
            {
                filename: "icareblack.png",
                content: blackBase64,
                contentType: "image/png",
                contentId: "icare-logo-dark"
            },
            {
                filename: "icarelogo-white.png",
                content: whiteBase64,
                contentType: "image/png",
                contentId: "icare-logo-light"
            }
        ]
    });
}
