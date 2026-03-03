import { useEffect, useState } from "react";
import { Link, useLoaderData, useLocation } from "react-router";
import { TERMS_ACCEPTED_AT_KEY, createTermsAcceptedAt, persistTermsAcceptedAt } from "../../../../utils/terms-acceptance";
import { acceptCaregiverBooking } from "../../../caregiver/bookings/caregiver-bookings-api-client";
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
            "Contact details are now available. Your booking is ${booking.dateFormatted}, ${booking.timeFormatted}.",
        alertActions: [],
        showContactDetails: true,
        enableMessaging: true,
        showTimeline: false,
        paymentTag: "Payment Held",
        showEmergencyContactCard: false,
        stateActions: [
            { label: "Message Caregiver", variant: "primary", action: "navigate:/carereceiver/messages/${booking.id}" },
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
        stateActions: [{ label: "Message Caregiver", variant: "secondary", action: "navigate:/carereceiver/messages/${booking.id}" }]
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
            { label: "Leave Review (Optional)", variant: "text-link", action: "navigate:/carereceiver/bookings/${booking.id}/review" }
        ]
    },
    payment_released: {
        statusVariant: "completed",
        showCountdownTimer: false,
        showAlertBanner: true,
        alertVariant: "success",
        alertMessage:
            "Payment of £${payment.total} has been released to ${caregiver.name}. How was your experience? Leave a review to help other families.",
        alertActions: [{ label: "Leave Review", variant: "primary", action: "navigate:/carereceiver/bookings/${booking.id}/review" }],
        showContactDetails: true,
        enableMessaging: true,
        showTimeline: true,
        paymentTag: "Payment Released",
        showEmergencyContactCard: false,
        stateActions: [
            { label: "Leave Review", variant: "primary", action: "navigate:/carereceiver/bookings/${booking.id}/review" },
            { label: "Book ${caregiver.name} Again", variant: "secondary", action: "navigate:/carereceiver/bookings/new/${caregiver.id}" }
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
            { label: "Book ${caregiver.name} Again", variant: "primary", action: "navigate:/carereceiver/bookings/new/${caregiver.id}" },
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
        alertActions: [{ label: "Search for Another Caregiver", variant: "primary", action: "navigate:/carereceiver/search" }],
        showContactDetails: false,
        enableMessaging: false,
        showTimeline: false,
        paymentTag: "Authorization Released",
        showEmergencyContactCard: false,
        stateActions: [{ label: "Search for Another Caregiver", variant: "primary", action: "navigate:/carereceiver/search" }]
    },
    expired: {
        statusVariant: "cancelled",
        showCountdownTimer: false,
        showAlertBanner: true,
        alertVariant: "warning",
        alertMessage:
            "${caregiver.name} did not respond within 24 hours. Your payment authorization has been released. No charge applied.",
        alertActions: [{ label: "Search for Another Caregiver", variant: "primary", action: "navigate:/carereceiver/search" }],
        showContactDetails: false,
        enableMessaging: false,
        showTimeline: false,
        paymentTag: "Authorization Released",
        showEmergencyContactCard: false,
        stateActions: [{ label: "Search for Another Caregiver", variant: "primary", action: "navigate:/carereceiver/search" }]
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
        alertActions: [{ label: "Search for Another Caregiver", variant: "primary", action: "navigate:/carereceiver/search" }],
        showContactDetails: false,
        enableMessaging: false,
        showTimeline: false,
        paymentTag: "Refunded",
        showEmergencyContactCard: false,
        stateActions: [{ label: "Search for Another Caregiver", variant: "primary", action: "navigate:/carereceiver/search" }]
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
            { label: "Update Payment", variant: "primary", action: "navigate:/carereceiver/settings/payment" },
            { label: "Cancel", variant: "text-link", action: "modal:cancel-failed-booking" }
        ],
        showContactDetails: false,
        enableMessaging: false,
        showTimeline: false,
        paymentTag: "Payment Failed",
        showEmergencyContactCard: false,
        stateActions: [
            { label: "Update Payment Method", variant: "primary", action: "navigate:/carereceiver/settings/payment" },
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
        serviceFee: 10.8,
        serviceFeePercentage: 15,
        total: 82.8,
        paymentMethod: "Visa ending in 4242",
        refundAmount: 82.8
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

function formatLongDate(value) {
    if (!value) { return ""; }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) { return String(value); }
    return new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(date);
}

function normalizeTimeRange(value) {
    if (!value) { return ""; }
    const normalized = String(value).replace(/\s*-\s*/g, "\u2013").replace(/\s+/g, " ").trim();
    return normalized
        .replace(" AM", "")
        .replace(" PM", "")
        .replace(" am", "")
        .replace(" pm", "");
}

function formatDurationHours(duration) {
    const match = String(duration || "").match(/(\d+(?:\.\d+)?)/);
    if (!match) { return String(duration || ""); }
    const n = Number(match[1]);
    if (Number.isNaN(n)) { return String(duration || ""); }
    return `${n} ${n === 1 ? "hour" : "hours"}`;
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
    const root = payload.data && typeof payload.data === "object" ? payload.data : payload;
    const booking = root.booking || root;
    const caregiver = root.caregiver || booking.caregiver || root.provider || {};
    const payment = root.payment || booking.payment || root.pricing || {};
    const emergencyContact =
        root.emergencyContact || booking.emergencyContact || root.emergency || caregiver.emergencyContact || {};

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

async function tryFetchJson(url, request) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);
    try {
        const headers = { Accept: "application/json" };
        const cookieHeader = request?.headers?.get?.("Cookie");
        if (cookieHeader) {
            headers.Cookie = cookieHeader;
        }

        const response = await fetch(url, {
            headers,
            signal: controller.signal,
            cache: "no-store"
        });
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

function buildBookingDetailEndpoint(baseUrl, bookingId) {
    const normalizedBase = String(baseUrl || "").trim().replace(/\/$/, "");
    if (!normalizedBase) {
        return "";
    }

    if (normalizedBase.endsWith("/api/v1")) {
        return `${normalizedBase}/bookings/${bookingId}`;
    }

    if (normalizedBase.endsWith("/api")) {
        return `${normalizedBase}/v1/bookings/${bookingId}`;
    }

    return `${normalizedBase}/api/v1/bookings/${bookingId}`;
}

async function loadBookingDetail(apiBase, bookingId, request) {
    if (!bookingId) { return null; }
    if (/^(confirmed|pending)-/i.test(String(bookingId))) {
        // Legacy dashboard mock ids should not trigger API retries.
        return null;
    }

    const baseCandidates = [];
    const pushBase = (value) => {
        const normalized = String(value || "").trim().replace(/\/$/, "");
        if (!normalized || baseCandidates.includes(normalized)) {
            return;
        }
        baseCandidates.push(normalized);
    };

    const normalizedApiBase = String(apiBase || "").trim();
    if (normalizedApiBase) {
        pushBase(normalizedApiBase);
    }

    try {
        const requestOrigin = new URL(request.url).origin;
        if (requestOrigin && /:(4000|4001)\b/.test(requestOrigin)) {
            pushBase(requestOrigin);
        }
    } catch {
        // ignore malformed request url
    }

    pushBase("http://localhost:4001");

    const candidates = baseCandidates
        .map((base) => buildBookingDetailEndpoint(base, bookingId))
        .filter(Boolean);

    for (const endpoint of candidates) {
        const payload = await tryFetchJson(endpoint, request);
        const normalized = normalizePayload(payload, bookingId);
        if (normalized) { return normalized; }
    }
    return null;
}

export async function loader({ request, params }) {
    const url = new URL(request.url);
    const bookingId = params?.bookingId || url.searchParams.get("bookingId") || SAMPLE_DATA.booking.id;
    const statusOverride = url.searchParams.get("status");

    const backendData = await loadBookingDetail(API_BASE, bookingId, request);
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

function adaptActionForViewer(action, isCaregiverView) {
    if (!isCaregiverView || !action) {
        return action;
    }

    if (action.startsWith("navigate:/carereceiver/messages/")) {
        const conversationId = action.replace("navigate:/carereceiver/messages/", "");
        return `navigate:/caregiver/messages/${conversationId}`;
    }

    if (action.startsWith("navigate:/carereceiver/caregivers/")) {
        return "navigate:/caregiver/profile/preview";
    }

    if (action.startsWith("navigate:/carereceiver/bookings/new/")) {
        return "navigate:/caregiver/bookings";
    }

    if (action.startsWith("navigate:/carereceiver/bookings/") && action.endsWith("/review")) {
        const bookingId = action.replace("navigate:/carereceiver/bookings/", "").replace("/review", "");
        return `navigate:/caregiver/bookings/${bookingId}`;
    }

    if (action === "navigate:/carereceiver/search") {
        return "navigate:/caregiver/bookings";
    }

    if (action === "navigate:/carereceiver/settings/payment") {
        return "navigate:/caregiver/bookings?tab=completed";
    }

    if (action.startsWith("navigate:/carereceiver/")) {
        return action.replace("navigate:/carereceiver/", "navigate:/caregiver/");
    }

    return action;
}

function resolveViewerAction(action, isCaregiverView, bookingId) {
    const adapted = adaptActionForViewer(action, isCaregiverView);
    if (!isCaregiverView || !adapted?.startsWith("modal:")) {
        return adapted;
    }

    if (adapted === "modal:cancel-booking" || adapted === "modal:cancel-booking-warning" || adapted === "modal:cancel-booking-confirmation") {
        return `navigate:/caregiver/bookings?tab=upcoming&action=cancel&bookingId=${bookingId}`;
    }

    return `navigate:/caregiver/bookings/${bookingId}?action=${adapted.replace("modal:", "")}`;
}

function readStoredTermsAcceptedAt() {
    if (typeof window === "undefined") {
        return "";
    }

    try {
        const direct = String(window.localStorage.getItem(TERMS_ACCEPTED_AT_KEY) || "").trim();
        if (direct) {
            return direct;
        }
    } catch {
        // ignore localStorage read errors
    }

    try {
        const rawUser = window.localStorage.getItem("icare_user");
        if (!rawUser) {
            return "";
        }

        const parsedUser = JSON.parse(rawUser);
        return String(parsedUser?.termsAcceptedAt || "").trim();
    } catch {
        return "";
    }
}

export default function CareRecipientMyAccountPage() {
    const location = useLocation();
    const { detail, state } = useLoaderData();
    const { booking, caregiver, payment, emergencyContact } = detail;
    const isCaregiverView = location.pathname.startsWith("/caregiver/");
    const activeAction = new URLSearchParams(location.search).get("action");
    const showAcceptFairUseConfirm = isCaregiverView && activeAction === "accept";
    const [confirmTermsChecked, setConfirmTermsChecked] = useState(false);
    const [confirmTermsError, setConfirmTermsError] = useState("");
    const [storedTermsAcceptedAt, setStoredTermsAcceptedAt] = useState("");
    const [confirmSubmitting, setConfirmSubmitting] = useState(false);
    const serviceTypes = Array.isArray(booking.serviceTypes) && booking.serviceTypes.length
        ? booking.serviceTypes
        : [booking.serviceType].filter(Boolean);
    const glanceDate = (() => {
        const date = new Date(booking.date || "");
        if (Number.isNaN(date.getTime())) { return booking.dateFormatted || booking.date || ""; }
        return new Intl.DateTimeFormat("en-GB", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric"
        }).format(date);
    })();
    const glanceTime = normalizeTimeRange(booking.timeFormatted || booking.time);
    const glanceDuration = formatDurationHours(booking.duration);
    const glanceService = serviceTypes[0] || "Companionship";
    const normalizedAlertRole = state.alertVariant === "warning" || state.alertVariant === "error" ? "alert" : "status";
    const hasHeldPayment = String(state.paymentTag || "").toLowerCase().includes("held");
    const alertBody = (booking.status === "accepted" || booking.status === "confirmed")
        ? `Contact details are now available. Your booking is ${glanceDate}, ${glanceTime}.`
        : state.alertMessage;

    useEffect(() => {
        if (!showAcceptFairUseConfirm) {
            return;
        }

        const value = readStoredTermsAcceptedAt();
        setStoredTermsAcceptedAt(value);
    }, [showAcceptFairUseConfirm]);

    const onConfirmWithTerms = async () => {
        if (confirmSubmitting) {
            return;
        }

        if (!storedTermsAcceptedAt && !confirmTermsChecked) {
            setConfirmTermsError("Please accept the Terms of Service before confirming.");
            return;
        }

        let acceptedAt = storedTermsAcceptedAt;
        if (!acceptedAt) {
            acceptedAt = createTermsAcceptedAt();
            persistTermsAcceptedAt(acceptedAt);
            setStoredTermsAcceptedAt(acceptedAt);

            try {
                const rawUser = window.localStorage.getItem("icare_user");
                if (rawUser) {
                    const parsedUser = JSON.parse(rawUser);
                    window.localStorage.setItem("icare_user", JSON.stringify({
                        ...parsedUser,
                        termsAcceptedAt: acceptedAt
                    }));
                }
            } catch {
                // ignore localStorage write errors
            }
        }

        try {
            setConfirmSubmitting(true);
            await acceptCaregiverBooking(booking.id, { termsAcceptedAt: acceptedAt });
            setConfirmTermsError("");
            window.location.assign(`/caregiver/bookings/${booking.id}`);
        } catch (error) {
            setConfirmTermsError(error?.message || "Could not confirm booking. Please try again.");
        } finally {
            setConfirmSubmitting(false);
        }
    };

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
                <button className="booking-menu-toggle" type="button" aria-label="Open menu">
                    <span />
                    <span />
                    <span />
                </button>
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
                    <div className="booking-title-main">
                        <h1>Booking with {caregiver.name}</h1>
                        <p className="booking-at-a-glance">
                            {glanceDate} · {glanceTime} · {glanceDuration} · {glanceService}
                        </p>
                    </div>
                    <div className="booking-title-meta">
                        <span className={`booking-status booking-status--${state.statusVariant || "pending"}`}>
                            {booking.statusLabel || STATUS_LABELS[booking.status] || "Status"}
                        </span>
                        {state.showCountdownTimer && state.countdownText ? <span className="booking-countdown">{state.countdownText}</span> : null}
                    </div>
                </section>

                {state.showAlertBanner ? (
                    <section className={`booking-alert booking-alert--${state.alertVariant || "info"}`} role={normalizedAlertRole} aria-live="polite">
                        <h3 className="booking-alert-title">
                            {(booking.status === "accepted" || booking.status === "confirmed") ? "Booking confirmed" : "Booking update"}
                        </h3>
                        <p>{alertBody}</p>
                        {(booking.status === "accepted" || booking.status === "confirmed") ? (
                            <p className="booking-alert-helper">Please keep arrangements in ICare where possible.</p>
                        ) : null}
                        {state.alertActions?.length ? (
                            <div className="booking-alert-actions">
                                {state.alertActions.map((action) => (
                                    <ActionControl
                                        key={`${action.label}-${action.action}`}
                                        action={resolveViewerAction(action.action, isCaregiverView, booking.id)}
                                        variant={action.variant}
                                        label={action.label}
                                    />
                                ))}
                            </div>
                        ) : null}
                    </section>
                ) : null}

                {showAcceptFairUseConfirm ? (
                    <section className="booking-alert booking-alert--warning" role="alert" aria-live="polite">
                        <h3 className="booking-alert-title">Confirm Booking</h3>
                        <div className="booking-confirm-terms">
                            <label className="booking-confirm-terms-row" htmlFor="confirm-terms-acceptance">
                                <input
                                    id="confirm-terms-acceptance"
                                    type="checkbox"
                                    checked={storedTermsAcceptedAt ? true : confirmTermsChecked}
                                    onChange={(event) => {
                                        setConfirmTermsChecked(event.target.checked);
                                        setConfirmTermsError("");
                                    }}
                                    disabled={Boolean(storedTermsAcceptedAt)}
                                />
                                <span className="booking-confirm-terms-label">
                                    I confirm I accept the{" "}
                                    <a href="/terms#introduction-fair-use">Terms of Service (including Introduction &amp; Fair Use)</a>.
                                </span>
                            </label>
                            {confirmTermsError ? <p className="booking-confirm-terms-error">{confirmTermsError}</p> : null}
                            <div className="booking-confirm-terms-actions">
                                <button
                                    type="button"
                                    className="booking-action booking-action--primary"
                                    onClick={onConfirmWithTerms}
                                    disabled={confirmSubmitting}
                                >
                                    {confirmSubmitting ? "Confirming..." : "Confirm"}
                                </button>
                                <Link className="booking-action booking-action--secondary" to={`/caregiver/bookings/${booking.id}`}>
                                    Back
                                </Link>
                            </div>
                        </div>
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
                                            <p className="booking-contact-title">Contact details</p>
                                            <p><span className="booking-contact-label">Phone</span><span>📞 {caregiver.phone}</span></p>
                                            {caregiver.email ? (
                                                <p>
                                                    <span className="booking-contact-label">Email</span>
                                                    <span className="booking-contact-email">✉️ {caregiver.email}</span>
                                                </p>
                                            ) : null}
                                            <p className="booking-contact-helper">These details are shared after booking confirmation.</p>
                                        </div>
                                    ) : (
                                        <p className="booking-contact-hidden">
                                            Contact details will be shared after {caregiver.name} accepts your booking.
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="booking-inline-actions">
                                <ActionControl
                                    action={resolveViewerAction(`navigate:/carereceiver/caregivers/${caregiver.id}`, isCaregiverView, booking.id)}
                                    label="View full profile"
                                    variant="text-link"
                                />
                            </div>
                        </article>

                        <article className="booking-card">
                            <h2>Booking Details</h2>
                            <dl className="booking-detail-list">
                                <dt>Reference</dt><dd>{booking.ref}</dd>
                                <dt>Date</dt><dd>{formatLongDate(booking.date || booking.dateFormatted)}</dd>
                                <dt>Time</dt><dd>{normalizeTimeRange(booking.timeFormatted || booking.time)} ({formatDurationHours(booking.duration)})</dd>
                                <dt>Service</dt>
                                <dd className="booking-service-chips">
                                    {serviceTypes.map((service) => (
                                        <span key={service} className="booking-service-chip">{service}</span>
                                    ))}
                                </dd>
                                <dt>Address</dt><dd className="booking-address-value">{booking.address}</dd>
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
                                <span className="booking-payment-tag" title={hasHeldPayment ? "Held until the booking is completed." : undefined}>{state.paymentTag}</span>
                            </div>
                            {hasHeldPayment ? <p className="booking-payment-helper">Held until the booking is completed.</p> : null}
                            <dl className="booking-payment-list">
                                <dt>Rate &amp; duration</dt><dd>{formatCurrency(payment.hourlyRate)} × {payment.duration}h</dd>
                                <dt>Subtotal</dt><dd>{formatCurrency(payment.subtotal)}</dd>
                                <dt>Service fee</dt>
                                <dd>
                                    {formatCurrency(payment.serviceFee)}
                                    <small className="booking-inline-note">Platform fee</small>
                                </dd>
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
                                        <div key={`${action.label}-${action.action}`} className="booking-sidebar-action-wrap">
                                            <ActionControl
                                                action={resolveViewerAction(action.action, isCaregiverView, booking.id)}
                                                variant={
                                                    String(action.label).toLowerCase().includes("cancel")
                                                        ? "destructive-outlined"
                                                        : String(action.label).toLowerCase().includes("message")
                                                            ? "primary"
                                                            : action.variant
                                                }
                                                label={
                                                    action.label === "Message Caregiver"
                                                        ? "Message caregiver"
                                                        : action.label === "Cancel Booking"
                                                            ? "Cancel booking"
                                                            : action.label
                                                }
                                            />
                                            {String(action.label).toLowerCase().includes("cancel") ? (
                                                <p className="booking-action-helper">You can request a cancellation.</p>
                                            ) : null}
                                        </div>
                                    ))
                                ) : (
                                    <p className="booking-muted">No available actions for this status.</p>
                                )}
                            </div>
                        </article>
                    </aside>
                </section>
            </div>

            <footer className="booking-footer">
                <a href="/privacy">Privacy Policy</a>
                <a href="/terms">Terms of Service</a>
                <a href="/safeguarding">Safeguarding</a>
                <a href="/contact-us">Contact Us</a>
                <a href="/frequently-asked-questions">Help Centre</a>
                <span>© 2026 iCare Platform. All rights reserved.</span>
            </footer>
        </main>
    );
}
