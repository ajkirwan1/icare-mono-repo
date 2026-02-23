import { Link, useLoaderData } from "react-router";
import "./my-account.css";

const API_BASE = globalThis.process?.env?.API_INTERNAL_URL || import.meta.env.VITE_API_URL;
const ALLOWED_STATUSES = new Set([
  "requested",
  "accepted",
  "confirmed",
  "in_progress",
  "completed",
  "payment_released",
  "reviewed",
  "declined",
  "expired",
  "cancelled_by_cr",
  "cancelled_by_cg",
  "disputed",
  "payment_failed",
  "under_review"
]);

const STATUS_LABELS = {
  requested: "Requested",
  accepted: "Confirmed",
  confirmed: "Confirmed",
  in_progress: "In Progress",
  completed: "Completed",
  payment_released: "Payment Released",
  reviewed: "Reviewed",
  declined: "Declined",
  expired: "Expired",
  cancelled_by_cr: "Cancelled",
  cancelled_by_cg: "Cancelled",
  disputed: "Disputed",
  payment_failed: "Payment Failed",
  under_review: "Under Review"
};

const STATE_VARIATIONS = {
  requested: {
    statusVariant: "pending",
    showCountdownTimer: true,
    showAlertBanner: true,
    alertVariant: "info",
    alertMessage:
      "${caregiver.name} has 24 hours to accept or decline your request. You'll receive an email and notification when they respond.",
    alertActions: [{ label: "Cancel Request", variant: "text-link", action: "modal:cancel-booking" }],
    showContactDetails: false,
    enableMessaging: false,
    showTimeline: false,
    paymentTag: "Payment Authorized",
    showEmergencyContactCard: false,
    stateActions: [{ label: "Cancel Booking", variant: "destructive", action: "modal:cancel-booking-confirmation" }]
  },
  accepted: {
    statusVariant: "confirmed",
    showCountdownTimer: false,
    showAlertBanner: true,
    alertVariant: "success",
    alertMessage:
      "${caregiver.name} has accepted your booking. Contact details are now available. Your booking is on ${booking.dateFormatted} at ${booking.timeFormatted}.",
    alertActions: [],
    showContactDetails: true,
    enableMessaging: true,
    showTimeline: false,
    paymentTag: "Payment Held",
    showEmergencyContactCard: false,
    stateActions: [
      { label: "Message Caregiver", variant: "primary", action: "navigate:/messages/${booking.id}" },
      { label: "Cancel Booking", variant: "destructive-outlined", action: "modal:cancel-booking-warning" }
    ]
  },
  confirmed: { extends: "accepted" },
  in_progress: {
    statusVariant: "in-progress",
    showCountdownTimer: false,
    showAlertBanner: true,
    alertVariant: "warning",
    alertMessage:
      "Emergency Contact: ${emergencyContact.name} (${emergencyContact.relationship}) - ${emergencyContact.phone}",
    alertActions: [{ label: "Call Emergency", variant: "destructive", action: "tel:${emergencyContact.phone}" }],
    showContactDetails: true,
    enableMessaging: true,
    showTimeline: false,
    paymentTag: "Payment Held",
    showEmergencyContactCard: true,
    stateActions: [{ label: "Message Caregiver", variant: "secondary", action: "navigate:/messages/${booking.id}" }]
  },
  completed: {
    statusVariant: "completed",
    showCountdownTimer: true,
    showAlertBanner: true,
    alertVariant: "warning",
    alertMessage:
      "Please confirm the service was provided or raise a dispute. Payment will be released to ${caregiver.name} after confirmation.",
    alertActions: [
      { label: "Confirm Completion", variant: "primary", action: "modal:confirm-completion" },
      { label: "Raise Dispute", variant: "destructive", action: "modal:raise-dispute" }
    ],
    showContactDetails: true,
    enableMessaging: true,
    showTimeline: true,
    paymentTag: "Pending Release",
    showEmergencyContactCard: false,
    stateActions: [
      { label: "Confirm Completion", variant: "primary", action: "modal:confirm-completion" },
      { label: "Raise Dispute", variant: "destructive-outlined", action: "modal:raise-dispute" },
      { label: "Leave Review (Optional)", variant: "text-link", action: "navigate:/reviews/new?booking=${booking.id}" }
    ]
  },
  payment_released: {
    statusVariant: "completed",
    showCountdownTimer: false,
    showAlertBanner: true,
    alertVariant: "success",
    alertMessage:
      "Payment of £${payment.total} has been released to ${caregiver.name}. How was your experience? Leave a review to help other families.",
    alertActions: [{ label: "Leave Review", variant: "primary", action: "navigate:/reviews/new?booking=${booking.id}" }],
    showContactDetails: true,
    enableMessaging: true,
    showTimeline: true,
    paymentTag: "Payment Released",
    showEmergencyContactCard: false,
    stateActions: [
      { label: "Leave Review", variant: "primary", action: "navigate:/reviews/new?booking=${booking.id}" },
      { label: "Book ${caregiver.name} Again", variant: "secondary", action: "navigate:/bookings/new/${caregiver.id}" }
    ]
  },
  reviewed: {
    statusVariant: "completed",
    showCountdownTimer: false,
    showAlertBanner: false,
    showContactDetails: true,
    enableMessaging: true,
    showTimeline: true,
    paymentTag: "Payment Released",
    showEmergencyContactCard: false,
    stateActions: [
      { label: "Book ${caregiver.name} Again", variant: "primary", action: "navigate:/bookings/new/${caregiver.id}" },
      { label: "View My Review", variant: "text-link", action: "scroll:review-section" }
    ]
  },
  declined: {
    statusVariant: "cancelled",
    showCountdownTimer: false,
    showAlertBanner: true,
    alertVariant: "warning",
    alertMessage:
      "${caregiver.name} declined your request. Reason: ${booking.declineReason}. Your payment authorization has been released. No charge applied.",
    alertActions: [{ label: "Search for Another Caregiver", variant: "primary", action: "navigate:/search" }],
    showContactDetails: false,
    enableMessaging: false,
    showTimeline: false,
    paymentTag: "Authorization Released",
    showEmergencyContactCard: false,
    stateActions: [{ label: "Search for Another Caregiver", variant: "primary", action: "navigate:/search" }]
  },
  expired: {
    statusVariant: "cancelled",
    showCountdownTimer: false,
    showAlertBanner: true,
    alertVariant: "warning",
    alertMessage:
      "${caregiver.name} did not respond within 24 hours. Your payment authorization has been released. No charge applied.",
    alertActions: [{ label: "Search for Another Caregiver", variant: "primary", action: "navigate:/search" }],
    showContactDetails: false,
    enableMessaging: false,
    showTimeline: false,
    paymentTag: "Authorization Released",
    showEmergencyContactCard: false,
    stateActions: [{ label: "Search for Another Caregiver", variant: "primary", action: "navigate:/search" }]
  },
  cancelled_by_cr: {
    statusVariant: "cancelled",
    showCountdownTimer: false,
    showAlertBanner: true,
    alertVariant: "info",
    alertMessage:
      "You cancelled this booking on ${booking.cancelledDate}. Refund: £${payment.refundAmount} (processed in 3-5 business days).",
    alertActions: [],
    showContactDetails: false,
    enableMessaging: false,
    showTimeline: false,
    paymentTag: "Refunded",
    showEmergencyContactCard: false,
    stateActions: []
  },
  cancelled_by_cg: {
    statusVariant: "cancelled",
    showCountdownTimer: false,
    showAlertBanner: true,
    alertVariant: "warning",
    alertMessage:
      "${caregiver.name} cancelled this booking on ${booking.cancelledDate}. Full refund: £${payment.refundAmount} (processed in 3-5 business days).",
    alertActions: [{ label: "Search for Another Caregiver", variant: "primary", action: "navigate:/search" }],
    showContactDetails: false,
    enableMessaging: false,
    showTimeline: false,
    paymentTag: "Refunded",
    showEmergencyContactCard: false,
    stateActions: [{ label: "Search for Another Caregiver", variant: "primary", action: "navigate:/search" }]
  },
  disputed: {
    statusVariant: "disputed",
    showCountdownTimer: false,
    showAlertBanner: true,
    alertVariant: "warning",
    alertMessage: "Your dispute is being reviewed by our admin team. You'll receive an update within 24 hours. Payment is on hold.",
    alertActions: [{ label: "Contact Support", variant: "secondary", action: "navigate:/support" }],
    showContactDetails: false,
    enableMessaging: false,
    showTimeline: true,
    paymentTag: "Payment On Hold",
    showEmergencyContactCard: false,
    stateActions: [{ label: "Contact Support", variant: "secondary", action: "navigate:/support" }]
  },
  payment_failed: {
    statusVariant: "cancelled",
    showCountdownTimer: false,
    showAlertBanner: true,
    alertVariant: "error",
    alertMessage: "We couldn't process your payment. Please update your payment method to rebook this caregiver.",
    alertActions: [
      { label: "Update Payment", variant: "primary", action: "navigate:/account/payment-methods" },
      { label: "Cancel", variant: "text-link", action: "modal:cancel-failed-booking" }
    ],
    showContactDetails: false,
    enableMessaging: false,
    showTimeline: false,
    paymentTag: "Payment Failed",
    showEmergencyContactCard: false,
    stateActions: [
      { label: "Update Payment Method", variant: "primary", action: "navigate:/account/payment-methods" },
      { label: "Cancel Booking", variant: "destructive-outlined", action: "modal:cancel-failed-booking" }
    ]
  },
  under_review: {
    statusVariant: "disputed",
    showCountdownTimer: false,
    showAlertBanner: true,
    alertVariant: "warning",
    alertMessage: "This booking is under review by our team. We'll contact you within 24 hours with an update.",
    alertActions: [{ label: "Contact Support", variant: "secondary", action: "navigate:/support" }],
    showContactDetails: false,
    enableMessaging: false,
    showTimeline: true,
    paymentTag: "Payment On Hold",
    showEmergencyContactCard: false,
    stateActions: [{ label: "Contact Support", variant: "secondary", action: "navigate:/support" }]
  }
};

const SAMPLE_DATA = {
  booking: {
    id: "bk-2026-0142",
    ref: "BK-2026-0142",
    status: "accepted",
    statusLabel: "Confirmed",
    date: "2026-02-20",
    dateFormatted: "Thursday, February 20, 2026",
    time: "10:00 - 14:00",
    timeFormatted: "10:00 AM - 2:00 PM",
    startTime: "2026-02-20T10:00:00Z",
    endTime: "2026-02-20T14:00:00Z",
    duration: "4 hours",
    serviceType: "Companionship",
    serviceTypes: ["Companionship", "Light housework"],
    specialRequests: "Mum enjoys gardening and would love help in the garden if weather permits.",
    address: "42 Rosemary Lane, Islington, London N1 2AB",
    responseDeadline: "2026-02-11T14:32:00Z",
    confirmationDeadline: "2026-02-20T16:15:00Z",
    requestedAt: "2026-02-10T14:32:00Z",
    acceptedAt: "2026-02-10T16:15:00Z",
    declineReason: "Scheduling conflict",
    cancelledDate: "2026-02-12",
    timeline: [
      {
        timestamp: "2026-02-10T14:32:00Z",
        timestampFormatted: "February 10, 2026 at 2:32 PM",
        title: "Booking Requested",
        description: "You submitted a booking request",
        isActive: false
      },
      {
        timestamp: "2026-02-10T16:15:00Z",
        timestampFormatted: "February 10, 2026 at 4:15 PM",
        title: "Booking Accepted",
        description: "Sarah Thompson accepted your request",
        isActive: true
      }
    ]
  },
  caregiver: {
    id: "cg-001",
    name: "Sarah Thompson",
    photo: "",
    phone: "07700 900123",
    email: "sarah.t@example.com",
    rating: 4.8,
    reviewCount: 24,
    verificationBadges: ["Identity Verified", "DBS Verified"]
  },
  payment: {
    hourlyRate: 18,
    duration: 4,
    subtotal: 72,
    serviceFee: 3.6,
    serviceFeePercentage: 5,
    total: 75.6,
    paymentMethod: "Visa ending in 4242",
    refundAmount: 75.6
  },
  emergencyContact: {
    name: "David Harrison",
    phone: "07700 900456",
    relationship: "Son"
  }
};

export function meta() {
  return [
    { title: "ICare | Booking Detail" },
    { name: "description", content: "Booking detail view for care receiver." }
  ];
}

export const handle = { breadcrumb: "Booking Detail" };

function initials(name) {
  return String(name || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function getByPath(input, path) {
  const parts = String(path).split(".");
  let value = input;
  for (const part of parts) {
    if (value === null || value === undefined) { return ""; }
    value = value[part];
  }
  if (value === null || value === undefined) { return ""; }
  return typeof value === "number" ? String(Number.isInteger(value) ? value : value.toFixed(2)) : String(value);
}

function interpolate(text, context) {
  if (!text) { return ""; }
  return String(text).replace(/\$\{([^}]+)\}/g, (_, expression) => getByPath(context, expression.trim()));
}

function resolveStateConfig(status) {
  const base = STATE_VARIATIONS[status] || STATE_VARIATIONS.accepted;
  if (!base.extends) { return base; }
  return { ...resolveStateConfig(base.extends), ...base };
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(Number(value || 0));
}

function computeCountdown(deadline) {
  const target = Date.parse(deadline || "");
  if (Number.isNaN(target)) { return null; }
  const diff = target - Date.now();
  if (diff <= 0) { return "Expired"; }
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m remaining`;
}

function normalizePayload(payload, fallbackId) {
  if (!payload || typeof payload !== "object") { return null; }
  const booking = payload.booking || payload;
  const caregiver = payload.caregiver || booking.caregiver || payload.provider || {};
  const payment = payload.payment || booking.payment || payload.pricing || {};
  const emergencyContact =
    payload.emergencyContact || booking.emergencyContact || payload.emergency || caregiver.emergencyContact || {};

  return {
    booking: {
      ...SAMPLE_DATA.booking,
      ...booking,
      id: booking.id || fallbackId || SAMPLE_DATA.booking.id,
      ref: booking.ref || booking.reference || SAMPLE_DATA.booking.ref,
      status: booking.status || SAMPLE_DATA.booking.status,
      statusLabel: booking.statusLabel || STATUS_LABELS[booking.status] || SAMPLE_DATA.booking.statusLabel,
      duration: booking.duration || `${payment.duration || SAMPLE_DATA.payment.duration} hours`,
      timeFormatted: booking.timeFormatted || booking.time || SAMPLE_DATA.booking.timeFormatted,
      dateFormatted: booking.dateFormatted || booking.date || SAMPLE_DATA.booking.dateFormatted,
      timeline: Array.isArray(booking.timeline) && booking.timeline.length ? booking.timeline : SAMPLE_DATA.booking.timeline
    },
    caregiver: {
      ...SAMPLE_DATA.caregiver,
      ...caregiver,
      verificationBadges: Array.isArray(caregiver.verificationBadges)
        ? caregiver.verificationBadges.map((item) => (typeof item === "string" ? item : item.label)).filter(Boolean)
        : SAMPLE_DATA.caregiver.verificationBadges
    },
    payment: { ...SAMPLE_DATA.payment, ...payment },
    emergencyContact: { ...SAMPLE_DATA.emergencyContact, ...emergencyContact }
  };
}

async function tryFetchJson(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3000);
  try {
    const response = await fetch(url, { headers: { Accept: "application/json" }, signal: controller.signal });
    if (!response.ok) { return null; }
    const text = await response.text();
    if (!text) { return null; }
    return JSON.parse(text);
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function loadBookingDetail(apiBase, bookingId) {
  if (!apiBase || !bookingId) { return null; }
  const cleanBase = apiBase.replace(/\/$/, "");
  const candidates = [
    `${cleanBase}/api/v1/bookings/${bookingId}`,
    `${cleanBase}/api/bookings/${bookingId}`,
    `${cleanBase}/bookings/${bookingId}`
  ];

  for (const endpoint of candidates) {
    const payload = await tryFetchJson(endpoint);
    const normalized = normalizePayload(payload, bookingId);
    if (normalized) { return normalized; }
  }
  return null;
}

export async function loader({ request, params }) {
  const url = new URL(request.url);
  const bookingId = params?.bookingId || url.searchParams.get("bookingId") || SAMPLE_DATA.booking.id;
  const statusOverride = url.searchParams.get("status");

  const backendData = await loadBookingDetail(API_BASE, bookingId);
  const detail = backendData || normalizePayload(SAMPLE_DATA, bookingId);

  const effectiveStatus = ALLOWED_STATUSES.has(statusOverride) ? statusOverride : detail.booking.status;
  const state = resolveStateConfig(effectiveStatus);
  const context = {
    booking: { ...detail.booking, status: effectiveStatus, statusLabel: STATUS_LABELS[effectiveStatus] || detail.booking.statusLabel },
    caregiver: detail.caregiver,
    payment: detail.payment,
    emergencyContact: detail.emergencyContact
  };

  return {
    detail: context,
    state: {
      ...state,
      alertMessage: interpolate(state.alertMessage, context),
      alertActions: (state.alertActions || []).map((action) => ({
        ...action,
        label: interpolate(action.label, context),
        action: interpolate(action.action, context)
      })),
      stateActions: (state.stateActions || []).map((action) => ({
        ...action,
        label: interpolate(action.label, context),
        action: interpolate(action.action, context)
      })),
      countdownText: computeCountdown(context.booking.responseDeadline || context.booking.confirmationDeadline)
    }
  };
}

function ActionControl({ action, variant = "secondary", label }) {
  const className = `booking-action booking-action--${variant}`;
  if (action?.startsWith("navigate:")) {
    return (
      <Link className={className} to={action.replace("navigate:", "")}>
        {label}
      </Link>
    );
  }
  if (action?.startsWith("tel:")) {
    return (
      <a className={className} href={action}>
        {label}
      </a>
    );
  }
  return (
    <button className={className} type="button">
      {label}
    </button>
  );
}

export default function CareRecipientMyAccountPage() {
  const { detail, state } = useLoaderData();
  const { booking, caregiver, payment, emergencyContact } = detail;

  return (
    <main className="booking-detail-page">
      <header className="booking-top-nav">
        <div className="booking-logo">iCare</div>
        <nav className="booking-main-nav" aria-label="Main">
          <span>Dashboard</span>
          <span>My Bookings</span>
          <span>Messages</span>
          <span>Search</span>
        </nav>
        <div className="booking-user">Sarah</div>
      </header>

      <div className="booking-shell">
        <nav className="booking-breadcrumbs" aria-label="Breadcrumb navigation">
          <span>Home</span>
          <span>›</span>
          <span>Bookings</span>
          <span>›</span>
          <strong>Booking #{booking.ref}</strong>
        </nav>

        <section className="booking-title-row">
          <h1>Booking with {caregiver.name}</h1>
          <div className="booking-title-meta">
            <span className={`booking-status booking-status--${state.statusVariant || "pending"}`}>
              {booking.statusLabel || STATUS_LABELS[booking.status] || "Status"}
            </span>
            {state.showCountdownTimer && state.countdownText ? <span className="booking-countdown">{state.countdownText}</span> : null}
          </div>
        </section>

        {state.showAlertBanner ? (
          <section className={`booking-alert booking-alert--${state.alertVariant || "info"}`} role="alert" aria-live="polite">
            <p>{state.alertMessage}</p>
            {state.alertActions?.length ? (
              <div className="booking-alert-actions">
                {state.alertActions.map((action) => (
                  <ActionControl key={`${action.label}-${action.action}`} action={action.action} variant={action.variant} label={action.label} />
                ))}
              </div>
            ) : null}
          </section>
        ) : null}

        <section className="booking-content-grid">
          <div className="booking-main-column">
            <article className="booking-card">
              <h2>Caregiver</h2>
              <div className="booking-caregiver-grid">
                <div className="booking-avatar" aria-label={caregiver.name}>{initials(caregiver.name)}</div>
                <div>
                  <h3>{caregiver.name}</h3>
                  <p className="booking-rating">
                    <span aria-hidden="true">★★★★☆</span> ({caregiver.reviewCount})
                  </p>
                  <div className="booking-badges">
                    {(caregiver.verificationBadges || []).map((badge) => (
                      <span key={badge} className="booking-badge">{badge}</span>
                    ))}
                  </div>
                  {state.showContactDetails ? (
                    <div className="booking-contact">
                      <p>Contact Details</p>
                      <p>📞 {caregiver.phone}</p>
                      {caregiver.email ? <p>✉️ {caregiver.email}</p> : null}
                    </div>
                  ) : (
                    <p className="booking-contact-hidden">
                      Contact details will be shared after {caregiver.name} accepts your booking.
                    </p>
                  )}
                </div>
              </div>
              <div className="booking-inline-actions">
                {state.enableMessaging ? (
                  <ActionControl action={`navigate:/messages/${booking.id}`} label="Message Caregiver" variant="secondary" />
                ) : null}
                <ActionControl action={`navigate:/caregivers/${caregiver.id}`} label="View Full Profile" variant="text-link" />
              </div>
            </article>

            <article className="booking-card">
              <h2>Booking Details</h2>
              <dl className="booking-detail-list">
                <dt>Reference</dt><dd>{booking.ref}</dd>
                <dt>Date</dt><dd>{booking.dateFormatted || booking.date}</dd>
                <dt>Time</dt><dd>{booking.timeFormatted || booking.time}</dd>
                <dt>Duration</dt><dd>{booking.duration}</dd>
                <dt>Service</dt><dd>{Array.isArray(booking.serviceTypes) ? booking.serviceTypes.join(", ") : booking.serviceType}</dd>
                <dt>Address</dt><dd>{booking.address}</dd>
              </dl>
            </article>

            {state.showTimeline ? (
              <article className="booking-card">
                <h2>Timeline</h2>
                <ol className="booking-timeline">
                  {(booking.timeline || []).map((event) => (
                    <li key={`${event.title}-${event.timestamp}`} className={event.isActive ? "is-active" : ""}>
                      <strong>{event.title}</strong>
                      <span>{event.timestampFormatted || event.timestamp}</span>
                      {event.description ? <p>{event.description}</p> : null}
                    </li>
                  ))}
                </ol>
              </article>
            ) : null}
          </div>

          <aside className="booking-sidebar-column">
            <article className="booking-card">
              <div className="booking-payment-head">
                <h2>Payment</h2>
                <span className="booking-payment-tag">{state.paymentTag}</span>
              </div>
              <dl className="booking-payment-list">
                <dt>Hourly rate</dt><dd>{formatCurrency(payment.hourlyRate)}</dd>
                <dt>Duration</dt><dd>{payment.duration} hours</dd>
                <dt>Subtotal</dt><dd>{formatCurrency(payment.subtotal)}</dd>
                <dt>Service fee</dt><dd>{formatCurrency(payment.serviceFee)}</dd>
                <dt className="total">Total</dt><dd className="total">{formatCurrency(payment.total)}</dd>
              </dl>
            </article>

            {state.showEmergencyContactCard ? (
              <article className="booking-emergency-card">
                <h2>Emergency Contact</h2>
                <p>{emergencyContact.name}</p>
                <p>{emergencyContact.relationship}</p>
                <p>📞 {emergencyContact.phone}</p>
                <ActionControl action={`tel:${emergencyContact.phone}`} label="Call Emergency Contact" variant="destructive" />
                <ActionControl action="tel:999" label="Call 999" variant="destructive" />
              </article>
            ) : null}

            <article className="booking-card">
              <h2>Actions</h2>
              <div className="booking-sidebar-actions">
                {(state.stateActions || []).length ? (
                  state.stateActions.map((action) => (
                    <ActionControl key={`${action.label}-${action.action}`} action={action.action} variant={action.variant} label={action.label} />
                  ))
                ) : (
                  <p className="booking-muted">No available actions for this status.</p>
                )}
              </div>
            </article>
          </aside>
        </section>
      </div>
    </main>
  );
}
