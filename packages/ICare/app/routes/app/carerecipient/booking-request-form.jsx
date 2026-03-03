import { Form, Link, redirect, useActionData, useLoaderData, useLocation, useNavigation } from "react-router";
import { useEffect, useMemo, useState } from "react";
import ICareAppNavbar from "~/components/application/app-navbar/icare-app-navbar";
import { careReceiverNavItems } from "~/components/application/app-navbar/nav-items";
import ICareFooter from "~/components/website/pages/shared/footers/icare-footer";
import "./account/my-account.css";
import "./booking-request-form.css";

const API_BASE = globalThis.process?.env?.API_INTERNAL_URL || import.meta.env.VITE_API_URL;
const STRIPE_BOOKING_AUTH_ENABLED = String(globalThis.process?.env?.ICARE_ENABLE_BOOKING_STRIPE_AUTH || "").trim() !== "0";
const RELATIONSHIP_OPTIONS = ["Daughter", "Son", "Spouse", "Partner", "Friend", "Other"];
const DURATION_OPTIONS = [2, 3, 4, 6, 8];
const BOOKING_DRAFT_STORAGE_PREFIX = "icare:booking-request-draft:";

const SAMPLE_DATA = {
    caregiver: {
        id: "cg-001",
        name: "Sarah Thompson",
        photoUrl: "",
        rating: 4.8,
        reviewCount: 23,
        hourlyRate: 18,
        distance: "3.2 miles",
        isVerified: true
    },
    pricing: {
        hourlyRate: 18,
        serviceFeePercent: 5
    },
    availableDates: [
        "2026-03-15",
        "2026-03-16",
        "2026-03-18",
        "2026-03-20",
        "2026-03-22",
        "2026-03-23",
        "2026-03-25",
        "2026-03-27",
        "2026-03-29",
        "2026-03-30"
    ],
    availableTimes: ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"],
    emergencyContact: {
        name: "",
        phone: "",
        relationship: ""
    },
    paymentMethodCount: 1
};

const LOCAL_CAREGIVER_DIRECTORY = {
    "cg-001": { id: "cg-001", name: "Sarah Thompson", hourlyRate: 18, rating: 4.9, reviewCount: 27, distance: "1.2 miles" },
    "cg-002": { id: "cg-002", name: "Mary Johnson", hourlyRate: 17, rating: 4.8, reviewCount: 19, distance: "2.4 miles" },
    "cg-003": { id: "cg-003", name: "Emma Collins", hourlyRate: 20, rating: 4.7, reviewCount: 14, distance: "3.1 miles" },
    "cg-004": { id: "cg-004", name: "Anna Nowak", hourlyRate: 16, rating: 4.6, reviewCount: 11, distance: "3.8 miles" },
    "cg-005": { id: "cg-005", name: "Tom Richards", hourlyRate: 19, rating: 4.8, reviewCount: 22, distance: "4.4 miles" },
    "cg-006": { id: "cg-006", name: "Lina Patel", hourlyRate: 18, rating: 4.9, reviewCount: 31, distance: "5.0 miles" },
    "cg-007": { id: "cg-007", name: "Margaret Shaw", hourlyRate: 19, rating: 4.9, reviewCount: 16, distance: "2.1 miles" },
    "cg-emma-wilson": { id: "cg-emma-wilson", name: "Emma Wilson", hourlyRate: 18, rating: 4.7, reviewCount: 18, distance: "2.0 miles" },
    "cg-john-anderson": { id: "cg-john-anderson", name: "John Anderson", hourlyRate: 19, rating: 4.6, reviewCount: 21, distance: "2.6 miles" },
    "cg-margaret-thompson": { id: "cg-margaret-thompson", name: "Margaret Thompson", hourlyRate: 20, rating: 4.9, reviewCount: 31, distance: "3.2 miles" },
    "cg-mary-thompson": { id: "cg-mary-thompson", name: "Mary Thompson", hourlyRate: 18, rating: 4.8, reviewCount: 24, distance: "2.8 miles" }
};

export function meta() {
    return [
        { title: "ICare | Booking Request Form" },
        { name: "description", content: "Create a booking request for a caregiver." }
    ];
}

export const handle = { breadcrumb: "Request Booking" };

function toCurrency(value) {
    return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(Number(value || 0));
}

function initials(name) {
    return String(name || "")
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() || "")
        .join("");
}

function titleCaseFromId(id) {
    return String(id || "")
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

function normalizeCaregiver(raw, fallbackId) {
    if (!raw || typeof raw !== "object") { return null; }
    const hourly = Number(raw.hourlyRate || raw.rate || raw.pricePerHour || 18);
    return {
        id: raw.id || fallbackId || SAMPLE_DATA.caregiver.id,
        name: raw.name || titleCaseFromId(fallbackId) || SAMPLE_DATA.caregiver.name,
        photoUrl: raw.photoUrl || raw.photo || raw.imgSrc || "",
        rating: Number(raw.rating || raw.averageRating || SAMPLE_DATA.caregiver.rating),
        reviewCount: Number(raw.reviewCount || raw.reviewsCount || raw.reviews?.length || SAMPLE_DATA.caregiver.reviewCount),
        hourlyRate: Number.isFinite(hourly) ? hourly : SAMPLE_DATA.caregiver.hourlyRate,
        distance: raw.distance || SAMPLE_DATA.caregiver.distance,
        isVerified: Boolean(raw.isVerified ?? raw.verified ?? SAMPLE_DATA.caregiver.isVerified)
    };
}

function normalizePaymentMethodsCount(raw) {
    if (!raw) { return null; }
    if (Array.isArray(raw)) { return raw.length; }
    if (Array.isArray(raw.methods)) { return raw.methods.length; }
    if (Array.isArray(raw.paymentMethods)) { return raw.paymentMethods.length; }
    if (typeof raw.count === "number") { return raw.count; }
    return null;
}

function normalizePercent(rawValue, fallback = 5) {
    const parsed = Number(rawValue);
    if (!Number.isFinite(parsed)) {
        return fallback;
    }
    return Math.max(0, Math.min(100, Number(parsed.toFixed(2))));
}

function dateToYMD(dateObj) {
    const year = dateObj.getUTCFullYear();
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function parseYmdToUtcDate(value) {
    const ymd = String(value || "").trim();
    const match = ymd.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) {
        return null;
    }
    const parsed = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
    return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function toUtcMonthStart(dateObj) {
    return new Date(Date.UTC(dateObj.getUTCFullYear(), dateObj.getUTCMonth(), 1));
}

function addUtcMonths(monthStart, deltaMonths) {
    return new Date(Date.UTC(
        monthStart.getUTCFullYear(),
        monthStart.getUTCMonth() + Number(deltaMonths || 0),
        1
    ));
}

function parseTimeToMinutes(value) {
    const match = String(value || "").trim().match(/^([01]?\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/);
    if (!match) {
        return null;
    }
    return (Number(match[1]) * 60) + Number(match[2]);
}

function minutesToTime(minutes) {
    const clamped = Math.max(0, Math.min(1439, Number(minutes || 0)));
    const hours = Math.floor(clamped / 60);
    const mins = clamped % 60;
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

function buildFlexibleStartTimes(availableTimes) {
    const EARLIEST_MINUTES = 6 * 60;
    const LATEST_MINUTES = 22 * 60;
    const STEP_MINUTES = 15;
    const minuteSet = new Set();

    for (let minutes = EARLIEST_MINUTES; minutes <= LATEST_MINUTES; minutes += STEP_MINUTES) {
        minuteSet.add(minutes);
    }

    for (const rawTime of (availableTimes || [])) {
        const parsed = parseTimeToMinutes(rawTime);
        if (parsed !== null) {
            minuteSet.add(parsed);
        }
    }

    return Array.from(minuteSet)
        .sort((a, b) => a - b)
        .map((minutes) => minutesToTime(minutes));
}

async function tryFetchJson(url, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);
    try {
        const response = await fetch(url, { ...options, signal: controller.signal });
        const text = await response.text().catch(() => "");
        const payload = text ? JSON.parse(text) : null;
        return { ok: response.ok, status: response.status, payload };
    } catch {
        return { ok: false, status: 0, payload: null };
    } finally {
        clearTimeout(timeout);
    }
}

async function loadCaregiver(apiBase, caregiverId) {
    const localCandidates = [
        `http://localhost:4001/api/v1/caregivers/${caregiverId}`,
        `http://localhost:4001/caregivers/${caregiverId}`,
        `http://localhost:4001/caregivers?id=${caregiverId}`
    ];

    const candidates = apiBase
        ? [
            `${apiBase.replace(/\/$/, "")}/api/v1/caregivers/${caregiverId}`,
            `${apiBase.replace(/\/$/, "")}/api/caregivers/${caregiverId}`,
            `${apiBase.replace(/\/$/, "")}/caregivers/${caregiverId}`,
            ...localCandidates
        ]
        : localCandidates;

    for (const url of candidates) {
        const result = await tryFetchJson(url, { headers: { Accept: "application/json" } });
        if (!result.ok || !result.payload) { continue; }
        const payload = Array.isArray(result.payload) ? result.payload[0] : result.payload;
        const caregiver = normalizeCaregiver(payload, caregiverId);
        if (caregiver) { return caregiver; }
    }

    const normalizedId = String(caregiverId || "").trim();
    const localFallback = LOCAL_CAREGIVER_DIRECTORY[normalizedId];
    if (localFallback) {
        return {
            ...SAMPLE_DATA.caregiver,
            ...localFallback,
            isVerified: true
        };
    }

    return {
        ...SAMPLE_DATA.caregiver,
        id: normalizedId || SAMPLE_DATA.caregiver.id,
        name: titleCaseFromId(normalizedId) || SAMPLE_DATA.caregiver.name
    };
}

async function loadPaymentMethodCount(apiBase, request) {
    const base = apiBase ? apiBase.replace(/\/$/, "") : new URL(request.url).origin;
    const candidates = [
        `${base}/api/v1/payments/methods`,
        `${base}/api/payments/methods`,
        `${base}/payments/methods`
    ];
    const cookieHeader = request.headers.get("Cookie");
    for (const url of candidates) {
        const headers = { Accept: "application/json" };
        if (cookieHeader) { headers.Cookie = cookieHeader; }
        const result = await tryFetchJson(url, { headers });
        if (!result.ok) { continue; }
        const count = normalizePaymentMethodsCount(result.payload);
        if (typeof count === "number") { return count; }
    }
    return SAMPLE_DATA.paymentMethodCount;
}

async function loadPlatformPricingSettings(apiBase, request) {
    const base = apiBase ? apiBase.replace(/\/$/, "") : new URL(request.url).origin;
    const candidates = [
        `${base}/api/v1/platform/settings`,
        `${base}/api/v1/admin/system-settings`,
        "http://localhost:4001/api/v1/platform/settings",
        "http://localhost:4001/api/v1/admin/system-settings"
    ];
    const cookieHeader = request.headers.get("Cookie");

    for (const url of candidates) {
        const headers = { Accept: "application/json" };
        if (cookieHeader) { headers.Cookie = cookieHeader; }
        const result = await tryFetchJson(url, { headers });
        if (!result.ok || !result.payload) { continue; }
        const source = result.payload?.data || result.payload;
        const percent = normalizePercent(source?.payments?.bookingServiceFeePercent, SAMPLE_DATA.pricing.serviceFeePercent);
        return { bookingServiceFeePercent: percent };
    }

    return { bookingServiceFeePercent: SAMPLE_DATA.pricing.serviceFeePercent };
}

export async function loader({ params, request }) {
    const url = new URL(request.url);
    const caregiverId = params?.caregiverId || url.searchParams.get("caregiverId") || SAMPLE_DATA.caregiver.id;
    const noPaymentOverride = url.searchParams.get("noPayment") === "1";
    const stripeCheckoutStatus = String(url.searchParams.get("stripeCheckout") || "").trim().toLowerCase();
    const stripeCheckoutSessionId = String(url.searchParams.get("session_id") || "").trim();
    const caregiver = await loadCaregiver(API_BASE, caregiverId);
    const paymentMethodCount = noPaymentOverride ? 0 : await loadPaymentMethodCount(API_BASE, request);
    const platformPricing = await loadPlatformPricingSettings(API_BASE, request);
    const stripeCheckout = {
        required: false,
        stripeConfigured: false,
        status: stripeCheckoutStatus,
        error: "",
        authorization: null
    };

    if (STRIPE_BOOKING_AUTH_ENABLED) {
        try {
            const stripeTools = await import("~/lib/stripe-payments.server");
            stripeCheckout.stripeConfigured = Boolean(stripeTools.isStripeConfigured());
            stripeCheckout.required = stripeCheckout.stripeConfigured;

            if (stripeCheckoutStatus === "success" && stripeCheckoutSessionId.startsWith("cs_") && stripeCheckout.stripeConfigured) {
                const session = await stripeTools.getStripeCheckoutSessionWithPayment(stripeCheckoutSessionId);
                if (!isCheckoutAuthorizationReady(session)) {
                    stripeCheckout.error = "Stripe checkout completed, but payment authorization is not ready yet. Please try again.";
                } else {
                    stripeCheckout.authorization = {
                        sessionId: stripeCheckoutSessionId,
                        authorizationId: session.paymentIntentId,
                        authorizationStatus: normalizeCheckoutAuthorizationStatus(session),
                        amount: Number(session.amountTotal || 0),
                        amountLabel: toCurrency(session.amountTotal),
                        currency: session.currency,
                        checkoutPaymentStatus: session.checkoutPaymentStatus || session.paymentStatus,
                        paymentIntentStatus: session.paymentIntentStatus,
                        paymentMethodId: session.paymentMethodId || ""
                    };
                }
            }
        } catch (error) {
            stripeCheckout.error = error?.message || "Could not verify Stripe checkout session.";
        }
    }

    return {
        caregiver,
        pricing: {
            hourlyRate: Number(caregiver.hourlyRate || SAMPLE_DATA.pricing.hourlyRate),
            serviceFeePercent: normalizePercent(platformPricing.bookingServiceFeePercent, SAMPLE_DATA.pricing.serviceFeePercent)
        },
        availableDates: SAMPLE_DATA.availableDates,
        availableTimes: SAMPLE_DATA.availableTimes,
        emergencyContact: SAMPLE_DATA.emergencyContact,
        paymentMethodCount,
        stripeCheckout
    };
}

function validateForm(values) {
    const errors = {};
    const normalizedEmergencyPhone = String(values.emergencyPhone || "").replace(/[^\d+]/g, "");
    const emergencyPhoneIsValid =
        /^\+[1-9]\d{7,14}$/.test(normalizedEmergencyPhone) ||
        /^0\d{9,10}$/.test(normalizedEmergencyPhone);

    if (!values.bookingDate) { errors.bookingDate = "Please select an available date."; }
    if (!values.startTime) { errors.startTime = "Please select a start time."; }
    if (!values.durationHours || Number(values.durationHours) < 2 || Number(values.durationHours) > 8) {
        errors.durationHours = "Duration must be between 2 and 8 hours.";
    }
    if (!values.emergencyName || values.emergencyName.trim().length < 2) { errors.emergencyName = "Emergency contact name is required."; }
    if (!values.emergencyPhone || !emergencyPhoneIsValid) {
        errors.emergencyPhone = "Enter a valid phone number (e.g. +447700900123 or 07700900123).";
    }
    if (!values.emergencyRelationship) { errors.emergencyRelationship = "Please specify relationship to emergency contact."; }
    if (!values.acceptCancellation) { errors.acceptCancellation = "You must accept the cancellation policy to continue."; }
    return errors;
}

function redirectWithCookie(path, setCookie) {
    if (setCookie) {
        return redirect(path, { headers: { "Set-Cookie": setCookie } });
    }
    return redirect(path);
}

function normalizeCheckoutAuthorizationStatus(session) {
    const intentStatus = String(session?.paymentIntentStatus || "").trim().toLowerCase();
    if (intentStatus) {
        return intentStatus;
    }

    const checkoutPaymentStatus = String(session?.checkoutPaymentStatus || session?.paymentStatus || "").trim().toLowerCase();
    if (checkoutPaymentStatus === "paid") {
        return "authorized";
    }

    return "authorized";
}

function isCheckoutAuthorizationReady(session) {
    const paymentIntentId = String(session?.paymentIntentId || "").trim();
    if (!paymentIntentId.startsWith("pi_")) {
        return false;
    }

    const checkoutPaymentStatus = String(session?.checkoutPaymentStatus || session?.paymentStatus || "").trim().toLowerCase();
    const paymentIntentStatus = String(session?.paymentIntentStatus || "").trim().toLowerCase();

    if (checkoutPaymentStatus === "paid") {
        return true;
    }

    return [
        "requires_capture",
        "requires_confirmation",
        "processing",
        "succeeded"
    ].includes(paymentIntentStatus);
}

async function submitBookingRequest(apiBase, payload, request, { viewerId = "", viewerEmail = "", viewerToken = "" } = {}) {
    const baseCandidates = [];
    const normalizedApiBase = String(apiBase || "").trim();
    if (normalizedApiBase) {
        baseCandidates.push(normalizedApiBase.replace(/\/$/, ""));
    }
    try {
        const requestOrigin = new URL(request.url).origin;
        if (requestOrigin) {
            baseCandidates.push(requestOrigin.replace(/\/$/, ""));
        }
    } catch {
        // ignore malformed request url
    }
    baseCandidates.push("http://localhost:4001");

    const uniqueBases = Array.from(new Set(baseCandidates));
    const candidates = uniqueBases.flatMap((base) => [
        `${base}/api/v1/bookings`,
        `${base}/api/bookings`,
        `${base}/bookings`
    ]);
    let lastErrorResult = { ok: false, status: 0, payload: null };

    for (const endpoint of candidates) {
        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(viewerId ? { "X-User-Id": viewerId } : {}),
            ...(viewerEmail ? { "X-User-Email": viewerEmail } : {}),
            ...(viewerToken ? { Authorization: `Bearer ${viewerToken}` } : {})
        };
        const result = await tryFetchJson(endpoint, {
            method: "POST",
            headers,
            body: JSON.stringify(payload)
        });
        if (result.ok) { return result; }
        if (!lastErrorResult.status || result.status >= 400) {
            lastErrorResult = result;
        }
    }

    return lastErrorResult;
}

export async function action({ request, params }) {
    const formData = await request.formData();
    const intent = String(formData.get("intent") || "send_request").trim().toLowerCase();
    const caregiverId = params?.caregiverId || String(formData.get("caregiverId") || SAMPLE_DATA.caregiver.id);
    const values = {
        caregiverId,
        bookingDate: String(formData.get("bookingDate") || ""),
        startTime: String(formData.get("startTime") || ""),
        durationHours: String(formData.get("durationHours") || ""),
        hourlyRate: Number(formData.get("hourlyRate") || 0),
        serviceFeePercent: Number(formData.get("serviceFeePercent") || 0),
        notes: String(formData.get("notes") || ""),
        emergencyName: String(formData.get("emergencyName") || ""),
        emergencyPhone: String(formData.get("emergencyPhone") || ""),
        emergencyRelationship: String(formData.get("emergencyRelationship") || ""),
        acceptCancellation: formData.get("acceptCancellation") === "on",
        viewerId: String(formData.get("viewerId") || "").trim(),
        viewerEmail: String(formData.get("viewerEmail") || "").trim().toLowerCase(),
        viewerToken: String(formData.get("viewerToken") || "").trim()
    };

    const errors = validateForm(values);
    if (Object.keys(errors).length) {
        return { ok: false, errors };
    }

    const duration = Number(values.durationHours);
    const hourlyRate = Number.isFinite(values.hourlyRate) && values.hourlyRate > 0
        ? Number(values.hourlyRate)
        : SAMPLE_DATA.pricing.hourlyRate;
    const serviceFeePercent = normalizePercent(values.serviceFeePercent, SAMPLE_DATA.pricing.serviceFeePercent);
    const subtotal = Number((hourlyRate * duration).toFixed(2));
    const serviceFee = Number((subtotal * (serviceFeePercent / 100)).toFixed(2));
    const total = Number((subtotal + serviceFee).toFixed(2));

    const payload = {
        caregiverId: values.caregiverId,
        bookingDate: values.bookingDate,
        startTime: values.startTime,
        durationHours: duration,
        serviceType: "Companionship",
        specialRequests: values.notes.trim(),
        emergencyContact: {
            name: values.emergencyName.trim(),
            phone: values.emergencyPhone.trim(),
            relationship: values.emergencyRelationship
        },
        pricing: { hourlyRate, subtotal, serviceFeePercent, serviceFee, total }
    };

    let paymentAuthorization = null;
    let stripeTools = null;
    let stripeConfigured = false;

    if (STRIPE_BOOKING_AUTH_ENABLED) {
        try {
            stripeTools = await import("~/lib/stripe-payments.server");
            stripeConfigured = Boolean(stripeTools.isStripeConfigured());
        } catch {
            stripeConfigured = false;
        }
    }

    if (intent === "start_checkout") {
        if (!STRIPE_BOOKING_AUTH_ENABLED || !stripeConfigured || !stripeTools) {
            return {
                ok: false,
                formError: "Stripe checkout is not configured yet in this environment."
            };
        }

        try {
            const { customerId, setCookie } = await stripeTools.ensureStripeCustomer(request);
            const currentUrl = new URL(request.url);
            const successUrl = `${currentUrl.origin}${currentUrl.pathname}?stripeCheckout=success&session_id={CHECKOUT_SESSION_ID}`;
            const cancelUrl = `${currentUrl.origin}${currentUrl.pathname}?stripeCheckout=cancel`;

            const session = await stripeTools.createStripeBookingCheckoutSession({
                customerId,
                amount: total,
                currency: "gbp",
                successUrl,
                cancelUrl,
                metadata: {
                    caregiver_id: values.caregiverId,
                    booking_date: values.bookingDate,
                    start_time: values.startTime
                }
            });

            return redirectWithCookie(session.url, setCookie);
        } catch (error) {
            return {
                ok: false,
                formError: error?.message || "Could not start Stripe checkout. Please try again."
            };
        }
    }

    if (stripeConfigured) {
        const checkoutSessionId = String(formData.get("checkoutSessionId") || "").trim();
        if (!checkoutSessionId.startsWith("cs_")) {
            return {
                ok: false,
                formError: "Please complete Stripe checkout before sending the booking request."
            };
        }

        try {
            const checkoutSession = await stripeTools.getStripeCheckoutSessionWithPayment(checkoutSessionId);
            if (!isCheckoutAuthorizationReady(checkoutSession)) {
                return {
                    ok: false,
                    formError: "Stripe checkout was not authorized yet. Please try checkout again."
                };
            }

            const checkoutAmount = Number(checkoutSession.amountTotal || 0);
            if (Math.abs(checkoutAmount - total) > 0.01) {
                return {
                    ok: false,
                    formError: "Booking details changed after checkout. Please run Stripe checkout again for the updated amount."
                };
            }

            paymentAuthorization = {
                id: checkoutSession.paymentIntentId,
                status: normalizeCheckoutAuthorizationStatus(checkoutSession),
                paymentMethodId: String(checkoutSession.paymentMethodId || "").trim(),
                amount: checkoutAmount || total,
                sessionId: checkoutSessionId
            };

            payload.payment = {
                authorizationId: paymentAuthorization.id,
                authorizationStatus: paymentAuthorization.status,
                paymentMethodId: paymentAuthorization.paymentMethodId || undefined
            };
        } catch (error) {
            return {
                ok: false,
                formError: error?.message || "Could not verify Stripe checkout session. Please try again."
            };
        }
    }

    const result = await submitBookingRequest(API_BASE, payload, request, {
        viewerId: values.viewerId,
        viewerEmail: values.viewerEmail,
        viewerToken: values.viewerToken
    });
    if (!result.ok) {
        if (paymentAuthorization?.id && stripeTools?.cancelStripePaymentIntent) {
            try {
                await stripeTools.cancelStripePaymentIntent(paymentAuthorization.id);
            } catch {
                // Best-effort rollback; if this fails we still return the booking error.
            }
        }
        const apiErrorMessage = result.payload?.error?.message || result.payload?.message || "";

        return {
            ok: false,
            formError: apiErrorMessage || "Could not create booking request in the API. Please try again."
        };
    }

    const createdBookingId = result.payload?.data?.bookingId ||
        result.payload?.data?.id ||
        result.payload?.bookingId ||
        result.payload?.id ||
        null;

    return {
        ok: true,
        successMessage: paymentAuthorization
            ? `Booking request sent. ${toCurrency(paymentAuthorization.amount)} was authorized in Stripe and will be captured after caregiver acceptance.`
            : "Booking request sent. Caregiver has 24 hours to respond.",
        bookingId: createdBookingId,
        paymentAuthorizationId: paymentAuthorization?.id || null
    };
}

function buildCalendar(visibleMonthStart) {
    const seed = visibleMonthStart instanceof Date && !Number.isNaN(visibleMonthStart.getTime())
        ? visibleMonthStart
        : new Date();
    const monthStartSeed = toUtcMonthStart(seed);
    const month = monthStartSeed.getUTCMonth();
    const year = monthStartSeed.getUTCFullYear();
    const monthStart = new Date(Date.UTC(year, month, 1));
    const firstWeekday = (monthStart.getUTCDay() + 6) % 7;
    const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

    const cells = [];
    for (let i = 0; i < firstWeekday; i += 1) { cells.push(null); }
    for (let day = 1; day <= daysInMonth; day += 1) {
        const date = new Date(Date.UTC(year, month, day));
        cells.push({
            day,
            ymd: dateToYMD(date)
        });
    }
    while (cells.length % 7 !== 0) { cells.push(null); }

    return {
        title: monthStart.toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" }),
        cells
    };
}

function ErrorText({ message }) {
    if (!message) { return null; }
    return <p className="booking-form-error" role="alert">{message}</p>;
}

export default function BookingRequestFormPage() {
    const location = useLocation();
    const loaderData = useLoaderData();
    const actionData = useActionData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    const { caregiver, pricing, availableDates, availableTimes, emergencyContact, paymentMethodCount, stripeCheckout } = loaderData;
    const [bookingDate, setBookingDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [durationHours, setDurationHours] = useState(4);
    const [customDurationSelected, setCustomDurationSelected] = useState(false);
    const [customDurationHours, setCustomDurationHours] = useState("");
    const [notes, setNotes] = useState("");
    const [emergencyName, setEmergencyName] = useState(emergencyContact?.name || "");
    const [emergencyPhone, setEmergencyPhone] = useState(emergencyContact?.phone || "");
    const [emergencyRelationship, setEmergencyRelationship] = useState(emergencyContact?.relationship || "");
    const [acceptCancellation, setAcceptCancellation] = useState(false);
    const [viewerIdentity, setViewerIdentity] = useState({ id: "", email: "", token: "" });
    const [draftHydrated, setDraftHydrated] = useState(false);
    const [calendarMonth, setCalendarMonth] = useState(() => {
        const seededDate = parseYmdToUtcDate(availableDates?.[0]) || new Date();
        return toUtcMonthStart(seededDate);
    });

    const calendar = useMemo(() => buildCalendar(calendarMonth), [calendarMonth]);
    const availableDateSet = useMemo(() => new Set(availableDates), [availableDates]);
    const startTimeOptions = useMemo(() => {
        const options = buildFlexibleStartTimes(availableTimes);
        if (startTime && !options.includes(startTime)) {
            return [startTime, ...options];
        }
        return options;
    }, [availableTimes, startTime]);

    const parsedCustomDuration = Number(customDurationHours);
    const effectiveDurationHours = customDurationSelected && Number.isFinite(parsedCustomDuration)
        ? parsedCustomDuration
        : Number(durationHours || 0);

    const hourlyRate = Number(pricing?.hourlyRate || 18);
    const serviceFeePercent = normalizePercent(pricing?.serviceFeePercent, SAMPLE_DATA.pricing.serviceFeePercent);
    const subtotal = Number((hourlyRate * Number(effectiveDurationHours || 0)).toFixed(2));
    const serviceFee = Number((subtotal * Number(serviceFeePercent / 100)).toFixed(2));
    const total = Number((subtotal + serviceFee).toFixed(2));
    const draftStorageKey = `${BOOKING_DRAFT_STORAGE_PREFIX}${caregiver.id}`;
    const checkoutAuthorization = stripeCheckout?.authorization || null;
    const checkoutReady = Boolean(checkoutAuthorization?.authorizationId);
    const stripeCheckoutRequired = Boolean(stripeCheckout?.required);
    const checkoutAmount = Number(checkoutAuthorization?.amount || 0);
    const checkoutAmountMatches = checkoutReady ? Math.abs(checkoutAmount - total) <= 0.01 : false;
    const canSendWithCheckout = checkoutReady && checkoutAmountMatches;
    const currentIntent = stripeCheckoutRequired && !canSendWithCheckout ? "start_checkout" : "send_request";
    const submittingIntent = String(navigation.formData?.get("intent") || "");
    const primaryLabel = (() => {
        if (isSubmitting) {
            if (submittingIntent === "start_checkout") {
                return "Redirecting to Payment...";
            }
            return "Sending request...";
        }
        if (currentIntent === "start_checkout") {
            return "Continue to Payment";
        }
        return "Send Request";
    })();

    const sendDisabledBase = isSubmitting;
    const isCarereceiverPath = location.pathname.startsWith("/carereceiver");
    const dashboardPath = isCarereceiverPath ? "/carereceiver/dashboard" : "/";
    const searchPath = isCarereceiverPath ? "/carereceiver/search" : "/carerecipient";
    const caregiverProfilePath = isCarereceiverPath ? `/carereceiver/caregivers/${caregiver.id}` : null;
    const sendDisabled = sendDisabledBase;
    const bookingDetailPathBase = actionData?.bookingId
        ? (isCarereceiverPath ? `/carereceiver/bookings/${actionData.bookingId}` : `/bookings/${actionData.bookingId}`)
        : "";
    const bookingDetailPath = bookingDetailPathBase ? `${bookingDetailPathBase}?status=requested` : "";

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        let nextId = "";
        let nextEmail = "";
        let nextToken = "";

        try {
            const rawUser = window.localStorage.getItem("icare_user");
            if (rawUser) {
                const parsedUser = JSON.parse(rawUser);
                nextId = String(parsedUser?.id || "").trim();
                nextEmail = String(parsedUser?.email || "").trim().toLowerCase();
            }
        } catch {
            // keep empty identity fields
        }

        try {
            nextToken = String(window.localStorage.getItem("icare_access_token") || "").trim();
        } catch {
            nextToken = "";
        }

        setViewerIdentity({ id: nextId, email: nextEmail, token: nextToken });
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        try {
            const rawDraft = window.localStorage.getItem(draftStorageKey);
            if (!rawDraft) {
                setDraftHydrated(true);
                return;
            }

            const draft = JSON.parse(rawDraft);
            if (draft && typeof draft === "object") {
                setBookingDate(String(draft.bookingDate || ""));
                setStartTime(String(draft.startTime || ""));
                setDurationHours(Number(draft.durationHours || 4));
                setCustomDurationSelected(Boolean(draft.customDurationSelected));
                setCustomDurationHours(String(draft.customDurationHours || ""));
                setNotes(String(draft.notes || ""));
                setEmergencyName(String(draft.emergencyName || ""));
                setEmergencyPhone(String(draft.emergencyPhone || ""));
                setEmergencyRelationship(String(draft.emergencyRelationship || ""));
                setAcceptCancellation(Boolean(draft.acceptCancellation));
            }
        } catch {
            // ignore malformed draft payload
        } finally {
            setDraftHydrated(true);
        }
    }, [draftStorageKey]);

    useEffect(() => {
        if (!draftHydrated || typeof window === "undefined") {
            return;
        }

        const draft = {
            bookingDate,
            startTime,
            durationHours,
            customDurationSelected,
            customDurationHours,
            notes,
            emergencyName,
            emergencyPhone,
            emergencyRelationship,
            acceptCancellation
        };

        try {
            window.localStorage.setItem(draftStorageKey, JSON.stringify(draft));
        } catch {
            // ignore localStorage write errors
        }
    }, [
        draftHydrated,
        draftStorageKey,
        bookingDate,
        startTime,
        durationHours,
        customDurationSelected,
        customDurationHours,
        notes,
        emergencyName,
        emergencyPhone,
        emergencyRelationship,
        acceptCancellation
    ]);

    useEffect(() => {
        if (!actionData?.ok || typeof window === "undefined") {
            return;
        }

        try {
            window.localStorage.removeItem(draftStorageKey);
        } catch {
            // ignore localStorage write errors
        }
    }, [actionData?.ok, draftStorageKey]);

    useEffect(() => {
        if (!actionData?.ok || !bookingDetailPath || typeof window === "undefined") {
            return undefined;
        }

        const timer = window.setTimeout(() => {
            window.location.assign(bookingDetailPath);
        }, 1200);

        return () => window.clearTimeout(timer);
    }, [actionData?.ok, bookingDetailPath]);

    useEffect(() => {
        const selectedDate = parseYmdToUtcDate(bookingDate);
        if (!selectedDate) {
            return;
        }
        const selectedMonth = toUtcMonthStart(selectedDate);
        setCalendarMonth((currentMonth) => (
            dateToYMD(currentMonth) === dateToYMD(selectedMonth)
                ? currentMonth
                : selectedMonth
        ));
    }, [bookingDate]);

    const persistDraftNow = () => {
        if (typeof window === "undefined") {
            return;
        }

        const draft = {
            bookingDate,
            startTime,
            durationHours,
            customDurationSelected,
            customDurationHours,
            notes,
            emergencyName,
            emergencyPhone,
            emergencyRelationship,
            acceptCancellation
        };

        try {
            window.localStorage.setItem(draftStorageKey, JSON.stringify(draft));
        } catch {
            // ignore localStorage write errors
        }
    };

    return (
        <>
            <ICareAppNavbar navItems={careReceiverNavItems} />

            <main className="booking-detail-page">
                <div className="booking-shell booking-request-shell">
                    <nav className="booking-breadcrumbs" aria-label="Breadcrumb navigation">
                        <Link to={dashboardPath}>Dashboard</Link>
                        <span>›</span>
                        <Link to={searchPath}>Search</Link>
                        <span>›</span>
                        {caregiverProfilePath ? <Link to={caregiverProfilePath}>{caregiver.name}</Link> : <span>{caregiver.name}</span>}
                        <span>›</span>
                        <strong>Request Booking</strong>
                    </nav>

                    <section className="booking-request-head">
                        <h1>Request Booking with {caregiver.name.split(" ")[0]}</h1>
                        <p>Complete this form to send a booking request. {caregiver.name.split(" ")[0]} has 24 hours to respond.</p>
                    </section>

                    {paymentMethodCount === 0 ? (
                        <section className="booking-alert booking-alert--warning" role="alert" aria-live="polite">
                            <p>No saved card detected yet. You can still continue and enter card details in Stripe Checkout.</p>
                            <div className="booking-alert-actions">
                                <ActionLink to="/carereceiver/settings/payment" label="Add Payment Method" />
                            </div>
                        </section>
                    ) : null}

                    <section className="booking-card booking-request-caregiver-summary">
                        <div className="booking-request-avatar">{initials(caregiver.name)}</div>
                        <div className="booking-request-caregiver-meta">
                            <strong>{caregiver.name}</strong>
                            <span>★★★★★ {caregiver.rating} ({caregiver.reviewCount})</span>
                            <span>{toCurrency(hourlyRate)}/hr</span>
                        </div>
                        <Link className="booking-request-profile-link booking-request-profile-button" to={`/carereceiver/caregivers/${caregiver.id}`}>
                            View Profile ›
                        </Link>
                    </section>

                    {actionData?.formError ? (
                        <section className="booking-alert booking-alert--error" role="alert">
                            <p>{actionData.formError}</p>
                        </section>
                    ) : null}

                    {stripeCheckout?.status === "cancel" ? (
                        <section className="booking-alert booking-alert--warning" role="alert">
                            <p>Payment checkout was cancelled. Continue to Payment again to authorize payment before sending this request.</p>
                        </section>
                    ) : null}

                    {stripeCheckout?.error ? (
                        <section className="booking-alert booking-alert--error" role="alert">
                            <p>{stripeCheckout.error}</p>
                        </section>
                    ) : null}

                    {stripeCheckout?.status === "success" && checkoutAuthorization ? (
                        <section className="booking-alert booking-alert--success" role="status" aria-live="polite">
                            <p>Stripe authorization is ready: <strong>{checkoutAuthorization.amountLabel}</strong>.</p>
                            <p className="booking-alert-helper">
                                Payment Intent: {checkoutAuthorization.authorizationId} ({checkoutAuthorization.paymentIntentStatus || checkoutAuthorization.checkoutPaymentStatus || "authorized"})
                            </p>
                        </section>
                    ) : null}

                    {stripeCheckoutRequired && checkoutReady && !checkoutAmountMatches ? (
                        <section className="booking-alert booking-alert--warning" role="alert">
                            <p>Booking details changed after checkout. Continue to Payment again to authorize the updated total.</p>
                        </section>
                    ) : null}

                    {actionData?.ok ? (
                        <section className="booking-alert booking-alert--success" role="status" aria-live="polite">
                            <p>{actionData.successMessage}</p>
                            {bookingDetailPath ? (
                                <p>
                                    <Link to={bookingDetailPath}>Open booking details</Link>
                                </p>
                            ) : null}
                        </section>
                    ) : null}

                    <Form method="post" className="booking-request-form-layout" onSubmit={persistDraftNow}>
                        <input type="hidden" name="caregiverId" value={caregiver.id} />
                        <input type="hidden" name="bookingDate" value={bookingDate} />
                        <input type="hidden" name="durationHours" value={String(effectiveDurationHours)} />
                        <input type="hidden" name="hourlyRate" value={String(hourlyRate)} />
                        <input type="hidden" name="serviceFeePercent" value={String(serviceFeePercent)} />
                        <input type="hidden" name="checkoutSessionId" value={checkoutAuthorization?.sessionId || ""} />
                        <input type="hidden" name="viewerId" value={viewerIdentity.id} />
                        <input type="hidden" name="viewerEmail" value={viewerIdentity.email} />
                        <input type="hidden" name="viewerToken" value={viewerIdentity.token} />

                        <div className="booking-request-main">
                            <section className="booking-card">
                                <h2>Booking Details</h2>

                                <label className="booking-form-label">Booking Date *</label>
                                <div className="booking-calendar">
                                    <div className="booking-calendar-head">
                                        <button
                                            type="button"
                                            className="booking-calendar-nav"
                                            aria-label="Previous month"
                                            onClick={() => setCalendarMonth((current) => addUtcMonths(current, -1))}
                                        >
                                            ‹
                                        </button>
                                        <strong>{calendar.title}</strong>
                                        <button
                                            type="button"
                                            className="booking-calendar-nav"
                                            aria-label="Next month"
                                            onClick={() => setCalendarMonth((current) => addUtcMonths(current, 1))}
                                        >
                                            ›
                                        </button>
                                    </div>
                                    <div className="booking-calendar-weekdays">
                                        <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
                                    </div>
                                    <div className="booking-calendar-grid">
                                        {calendar.cells.map((cell, index) => {
                                            if (!cell) { return <span key={`empty-${index}`} className="booking-calendar-empty" />; }
                                            const isAvailable = availableDateSet.has(cell.ymd);
                                            const isSelected = bookingDate === cell.ymd;
                                            return (
                                                <button
                                                    key={cell.ymd}
                                                    type="button"
                                                    className={`booking-calendar-day ${isAvailable ? "is-available" : "is-unavailable"} ${isSelected ? "is-selected" : ""}`}
                                                    onClick={() => { if (isAvailable) { setBookingDate(cell.ymd); } }}
                                                    disabled={!isAvailable}
                                                    aria-pressed={isSelected}
                                                >
                                                    {cell.day}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                                <ErrorText message={actionData?.errors?.bookingDate} />

                                <label className="booking-form-label" htmlFor="startTime">Start Time *</label>
                                <select
                                    id="startTime"
                                    name="startTime"
                                    value={startTime}
                                    onChange={(event) => setStartTime(event.target.value)}
                                    className="booking-form-input booking-form-select"
                                >
                                    <option value="">Select time...</option>
                                    {startTimeOptions.map((time) => (
                                        <option key={time} value={time}>{time}</option>
                                    ))}
                                </select>
                                <ErrorText message={actionData?.errors?.startTime} />
                                <p className="booking-form-help">Flexible slots every 15 minutes.</p>

                                <label className="booking-form-label">Duration *</label>
                                <div className="booking-duration-row" role="radiogroup" aria-label="Select duration">
                                    {DURATION_OPTIONS.map((hours) => {
                                        const selected = !customDurationSelected && durationHours === hours;
                                        return (
                                            <button
                                                key={hours}
                                                type="button"
                                                role="radio"
                                                aria-checked={selected}
                                                className={`booking-duration-chip ${selected ? "is-selected" : ""}`}
                                                onClick={() => {
                                                    setCustomDurationSelected(false);
                                                    setDurationHours(hours);
                                                }}
                                            >
                                                {hours}h
                                            </button>
                                        );
                                    })}
                                    <button
                                        type="button"
                                        className={`booking-duration-chip ${customDurationSelected ? "is-selected" : ""}`}
                                        onClick={() => setCustomDurationSelected(true)}
                                    >
                                        Custom
                                    </button>
                                </div>
                                {customDurationSelected ? (
                                    <div style={{ marginTop: "10px" }}>
                                        <label className="booking-form-label" htmlFor="customDurationHours">Custom duration (2-8h)</label>
                                        <input
                                            id="customDurationHours"
                                            type="number"
                                            min="2"
                                            max="8"
                                            step="0.5"
                                            className="booking-form-input"
                                            value={customDurationHours}
                                            onChange={(event) => setCustomDurationHours(event.target.value)}
                                            placeholder="e.g. 5.5"
                                        />
                                    </div>
                                ) : null}
                                <ErrorText message={actionData?.errors?.durationHours} />

                                <label className="booking-form-label" htmlFor="serviceType">Service Type</label>
                                <input id="serviceType" className="booking-form-input booking-form-input--readonly" value="Companionship" readOnly />

                                <label className="booking-form-label" htmlFor="notes">Special Requests or Notes</label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    className="booking-form-textarea"
                                    maxLength={500}
                                    value={notes}
                                    onChange={(event) => setNotes(event.target.value)}
                                    placeholder="Example: I'd like to go for a walk if the weather is nice..."
                                />
                                <p className="booking-form-counter">{notes.length}/500</p>
                            </section>

                            <section className="booking-card">
                                <h2>Emergency Contact</h2>
                                <p className="booking-form-help booking-form-help--top">
                                    This person will be notified if there&apos;s an emergency during the booking.
                                </p>

                                <label className="booking-form-label" htmlFor="emergencyName">Emergency Contact Name *</label>
                                <input
                                    id="emergencyName"
                                    name="emergencyName"
                                    className="booking-form-input"
                                    value={emergencyName}
                                    onChange={(event) => setEmergencyName(event.target.value)}
                                    placeholder="e.g. Jane Smith"
                                />
                                <ErrorText message={actionData?.errors?.emergencyName} />

                                <label className="booking-form-label" htmlFor="emergencyPhone">Emergency Contact Phone *</label>
                                <input
                                    id="emergencyPhone"
                                    name="emergencyPhone"
                                    className="booking-form-input"
                                    value={emergencyPhone}
                                    onChange={(event) => setEmergencyPhone(event.target.value)}
                                    placeholder="+447700900123"
                                />
                                <ErrorText message={actionData?.errors?.emergencyPhone} />

                                <label className="booking-form-label" htmlFor="emergencyRelationship">Relationship *</label>
                                <select
                                    id="emergencyRelationship"
                                    name="emergencyRelationship"
                                    className="booking-form-input booking-form-select"
                                    value={emergencyRelationship}
                                    onChange={(event) => setEmergencyRelationship(event.target.value)}
                                >
                                    <option value="">Select relationship...</option>
                                    {RELATIONSHIP_OPTIONS.map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                                <ErrorText message={actionData?.errors?.emergencyRelationship} />
                            </section>

                            <section className="booking-card">
                                <h3>Cancellation Policy</h3>
                                <p className="booking-policy-text">
                                    • Full refund if cancelled 24+ hours before start time
                                    <br />
                                    • 50% refund if cancelled less than 24 hours before start
                                    <br />
                                    • No refund if cancelled within 2 hours of start time
                                </p>

                                <label className="booking-checkbox-row">
                                    <input
                                        type="checkbox"
                                        name="acceptCancellation"
                                        checked={acceptCancellation}
                                        onChange={(event) => setAcceptCancellation(event.target.checked)}
                                    />
                                    <span>I understand and accept the cancellation policy</span>
                                </label>
                                <ErrorText message={actionData?.errors?.acceptCancellation} />
                                <a className="booking-policy-link" href="/terms/cancellation-policy">Read full cancellation policy →</a>
                            </section>
                        </div>

                        <aside className="booking-request-sidebar">
                            <section className="booking-card booking-request-price-card" aria-live="polite">
                                <h2>Price Summary</h2>
                                <dl className="booking-payment-list">
                                    <dt>Hourly rate</dt><dd>{toCurrency(hourlyRate)}</dd>
                                    <dt>Duration</dt><dd>{effectiveDurationHours} hours</dd>
                                    <dt>Subtotal</dt><dd>{toCurrency(subtotal)}</dd>
                                    <dt>Service fee ({serviceFeePercent}%)</dt><dd>{toCurrency(serviceFee)}</dd>
                                    <dt className="total">Total</dt><dd className="total">{toCurrency(total)}</dd>
                                </dl>
                                <p className="booking-form-help booking-form-help--top">
                                    {stripeCheckoutRequired && currentIntent === "start_checkout"
                                        ? "You will be redirected to payment to authorize this amount before sending the request."
                                        : `Payment has been authorized and will be captured when ${caregiver.name.split(" ")[0]} accepts.`}
                                </p>
                            </section>
                        </aside>

                        <section className="booking-request-actions">
                            <button type="button" className="booking-action booking-action--secondary" onClick={() => window.history.back()}>
                                Cancel
                            </button>
                            <button
                                type="submit"
                                name="intent"
                                value={currentIntent}
                                className="booking-action booking-action--primary booking-request-submit"
                                disabled={sendDisabled}
                            >
                                {primaryLabel}
                            </button>
                        </section>
                    </Form>
                </div>
            </main>

            <ICareFooter />
        </>
    );
}

function ActionLink({ to, label }) {
    return (
        <Link className="booking-action booking-action--destructive-outlined" to={to}>
            {label}
        </Link>
    );
}
