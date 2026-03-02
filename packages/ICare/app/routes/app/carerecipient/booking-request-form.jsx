import { Form, Link, useActionData, useLoaderData, useNavigation } from "react-router";
import { useMemo, useState } from "react";
import ICareAppNavbar from "~/components/application/app-navbar/icare-app-navbar";
import { careReceiverNavItems } from "~/components/application/app-navbar/nav-items";
import ICareFooter from "~/components/website/pages/shared/footers/icare-footer";
import "./account/my-account.css";
import "./booking-request-form.css";

const API_BASE = globalThis.process?.env?.API_INTERNAL_URL || import.meta.env.VITE_API_URL;
const RELATIONSHIP_OPTIONS = ["Daughter", "Son", "Spouse", "Partner", "Friend", "Other"];
const DURATION_OPTIONS = [2, 3, 4, 6, 8];

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
        serviceFeePercent: 15
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
        name: "Jane Smith",
        phone: "07700 900123",
        relationship: "Daughter"
    },
    paymentMethodCount: 1
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

function dateToYMD(dateObj) {
    const year = dateObj.getUTCFullYear();
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
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
        `http://localhost:4000/caregivers/${caregiverId}`,
        `http://localhost:4000/caregivers?id=${caregiverId}`
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

    return { ...SAMPLE_DATA.caregiver, id: caregiverId || SAMPLE_DATA.caregiver.id };
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

export async function loader({ params, request }) {
    const url = new URL(request.url);
    const caregiverId = params?.caregiverId || url.searchParams.get("caregiverId") || SAMPLE_DATA.caregiver.id;
    const noPaymentOverride = url.searchParams.get("noPayment") === "1";
    const caregiver = await loadCaregiver(API_BASE, caregiverId);
    const paymentMethodCount = noPaymentOverride ? 0 : await loadPaymentMethodCount(API_BASE, request);

    return {
        caregiver,
        pricing: {
            hourlyRate: Number(caregiver.hourlyRate || SAMPLE_DATA.pricing.hourlyRate),
            serviceFeePercent: SAMPLE_DATA.pricing.serviceFeePercent
        },
        availableDates: SAMPLE_DATA.availableDates,
        availableTimes: SAMPLE_DATA.availableTimes,
        emergencyContact: SAMPLE_DATA.emergencyContact,
        paymentMethodCount
    };
}

function validateForm(values) {
    const errors = {};
    if (!values.bookingDate) { errors.bookingDate = "Please select an available date."; }
    if (!values.startTime) { errors.startTime = "Please select a start time."; }
    if (!values.durationHours || Number(values.durationHours) < 2) { errors.durationHours = "Minimum booking duration is 2 hours."; }
    if (!values.emergencyName || values.emergencyName.trim().length < 2) { errors.emergencyName = "Emergency contact name is required."; }
    if (!values.emergencyPhone || !/^\+?[0-9\s()-]{8,20}$/.test(values.emergencyPhone.trim())) {
        errors.emergencyPhone = "Please enter a valid phone number.";
    }
    if (!values.emergencyRelationship) { errors.emergencyRelationship = "Please specify relationship to emergency contact."; }
    if (!values.acceptCancellation) { errors.acceptCancellation = "You must accept the cancellation policy to continue."; }
    return errors;
}

async function submitBookingRequest(apiBase, payload) {
    if (!apiBase) { return { ok: false, status: 0 }; }
    const base = apiBase.replace(/\/$/, "");
    const candidates = [`${base}/api/v1/bookings`, `${base}/api/bookings`, `${base}/bookings`];

    for (const endpoint of candidates) {
        const result = await tryFetchJson(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(payload)
        });
        if (result.ok) { return result; }
    }

    return { ok: false, status: 0 };
}

export async function action({ request, params }) {
    const formData = await request.formData();
    const caregiverId = params?.caregiverId || String(formData.get("caregiverId") || SAMPLE_DATA.caregiver.id);
    const values = {
        caregiverId,
        bookingDate: String(formData.get("bookingDate") || ""),
        startTime: String(formData.get("startTime") || ""),
        durationHours: String(formData.get("durationHours") || ""),
        notes: String(formData.get("notes") || ""),
        emergencyName: String(formData.get("emergencyName") || ""),
        emergencyPhone: String(formData.get("emergencyPhone") || ""),
        emergencyRelationship: String(formData.get("emergencyRelationship") || ""),
        acceptCancellation: formData.get("acceptCancellation") === "on"
    };

    const errors = validateForm(values);
    if (Object.keys(errors).length) {
        return { ok: false, errors };
    }

    const duration = Number(values.durationHours);
    const hourlyRate = SAMPLE_DATA.pricing.hourlyRate;
    const subtotal = Number((hourlyRate * duration).toFixed(2));
    const serviceFee = Number((subtotal * 0.15).toFixed(2));
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
        pricing: { hourlyRate, subtotal, serviceFee, total }
    };

    let paymentAuthorization = null;
    let stripeTools = null;

    try {
        stripeTools = await import("~/lib/stripe-payments.server");
        if (stripeTools.isStripeConfigured()) {
            const { customerId } = await stripeTools.ensureStripeCustomer(request);
            const methods = await stripeTools.listStripePaymentMethods(customerId);
            const chosenMethod = methods.find((method) => method.isDefault && !method.isExpired) || methods.find((method) => !method.isExpired);

            if (!chosenMethod) {
                return {
                    ok: false,
                    formError: "No valid payment method found. Please add a card in Payment Methods before sending a booking request."
                };
            }

            if (!chosenMethod.isDefault) {
                await stripeTools.setStripeDefaultPaymentMethod(customerId, chosenMethod.id);
            }

            const authorization = await stripeTools.createStripeBookingAuthorization({
                customerId,
                paymentMethodId: chosenMethod.id,
                amount: total,
                currency: "gbp",
                metadata: {
                    caregiver_id: values.caregiverId,
                    booking_date: values.bookingDate,
                    start_time: values.startTime
                }
            });

            paymentAuthorization = {
                id: authorization.id,
                status: authorization.status,
                paymentMethodId: chosenMethod.id,
                amount: total
            };

            payload.payment = {
                authorizationId: authorization.id,
                authorizationStatus: authorization.status,
                paymentMethodId: chosenMethod.id
            };
        }
    } catch (error) {
        return {
            ok: false,
            formError: error?.message || "Payment authorization failed. Please check your payment method and try again."
        };
    }

    const result = await submitBookingRequest(API_BASE, payload);
    if (!result.ok) {
        if (paymentAuthorization?.id && stripeTools?.cancelStripePaymentIntent) {
            try {
                await stripeTools.cancelStripePaymentIntent(paymentAuthorization.id);
            } catch {
                // Best-effort rollback; if this fails we still return the booking error.
            }
        }

        return {
            ok: false,
            formError: "Nie udalo sie wyslac requestu do backendu. Endpoint tworzenia bookingu nie jest jeszcze dostepny."
        };
    }

    return {
        ok: true,
        successMessage: paymentAuthorization
            ? `Booking request sent. ${toCurrency(paymentAuthorization.amount)} has been authorized and will be captured after caregiver acceptance.`
            : "Booking request sent. Caregiver has 24 hours to respond.",
        bookingId: result.payload?.id || result.payload?.bookingId || null,
        paymentAuthorizationId: paymentAuthorization?.id || null
    };
}

function buildCalendar(availableDates) {
    const dates = availableDates || [];
    const seed = dates[0] || "2026-03-01";
    const seedDate = new Date(`${seed}T00:00:00.000Z`);
    const month = seedDate.getUTCMonth();
    const year = seedDate.getUTCFullYear();
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
    const loaderData = useLoaderData();
    const actionData = useActionData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    const { caregiver, pricing, availableDates, availableTimes, emergencyContact, paymentMethodCount } = loaderData;
    const [bookingDate, setBookingDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [durationHours, setDurationHours] = useState(4);
    const [notes, setNotes] = useState("");
    const [emergencyName, setEmergencyName] = useState(emergencyContact?.name || "");
    const [emergencyPhone, setEmergencyPhone] = useState(emergencyContact?.phone || "");
    const [emergencyRelationship, setEmergencyRelationship] = useState(emergencyContact?.relationship || "Daughter");
    const [acceptCancellation, setAcceptCancellation] = useState(false);

    const calendar = useMemo(() => buildCalendar(availableDates), [availableDates]);
    const availableDateSet = useMemo(() => new Set(availableDates), [availableDates]);

    const hourlyRate = Number(pricing?.hourlyRate || 18);
    const subtotal = Number((hourlyRate * Number(durationHours || 0)).toFixed(2));
    const serviceFee = Number((subtotal * Number((pricing?.serviceFeePercent || 15) / 100)).toFixed(2));
    const total = Number((subtotal + serviceFee).toFixed(2));

    const sendDisabled = paymentMethodCount === 0 || isSubmitting;

    return (
        <>
            <ICareAppNavbar navItems={careReceiverNavItems} />

            <main className="booking-detail-page">
                <div className="booking-shell booking-request-shell">
                    <nav className="booking-breadcrumbs" aria-label="Breadcrumb navigation">
                        <span>Home</span>
                        <span>›</span>
                        <span>Search</span>
                        <span>›</span>
                        <span>{caregiver.name}</span>
                        <span>›</span>
                        <strong>Request Booking</strong>
                    </nav>

                    <section className="booking-request-head">
                        <h1>Request Booking with {caregiver.name.split(" ")[0]}</h1>
                        <p>Complete this form to send a booking request. {caregiver.name.split(" ")[0]} has 24 hours to respond.</p>
                    </section>

                    {paymentMethodCount === 0 ? (
                        <section className="booking-alert booking-alert--warning" role="alert" aria-live="assertive">
                            <p>Add a payment method to continue. You&apos;ll need to add a card before you can send a booking request.</p>
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

                    {actionData?.ok ? (
                        <section className="booking-alert booking-alert--success" role="status" aria-live="polite">
                            <p>{actionData.successMessage}</p>
                        </section>
                    ) : null}

                    <Form method="post" className="booking-request-form-layout">
                        <input type="hidden" name="caregiverId" value={caregiver.id} />
                        <input type="hidden" name="bookingDate" value={bookingDate} />
                        <input type="hidden" name="durationHours" value={String(durationHours)} />

                        <div className="booking-request-main">
                            <section className="booking-card">
                                <h2>Booking Details</h2>

                                <label className="booking-form-label">Booking Date *</label>
                                <div className="booking-calendar">
                                    <div className="booking-calendar-head">
                                        <button type="button" className="booking-calendar-nav" aria-label="Previous month">‹</button>
                                        <strong>{calendar.title}</strong>
                                        <button type="button" className="booking-calendar-nav" aria-label="Next month">›</button>
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
                                    className="booking-form-input"
                                >
                                    <option value="">Select time...</option>
                                    {availableTimes.map((time) => (
                                        <option key={time} value={time}>{time}</option>
                                    ))}
                                </select>
                                <ErrorText message={actionData?.errors?.startTime} />

                                <label className="booking-form-label">Duration *</label>
                                <div className="booking-duration-row" role="radiogroup" aria-label="Select duration">
                                    {DURATION_OPTIONS.map((hours) => {
                                        const selected = durationHours === hours;
                                        return (
                                            <button
                                                key={hours}
                                                type="button"
                                                role="radio"
                                                aria-checked={selected}
                                                className={`booking-duration-chip ${selected ? "is-selected" : ""}`}
                                                onClick={() => setDurationHours(hours)}
                                            >
                                                {hours}h
                                            </button>
                                        );
                                    })}
                                    <button type="button" className="booking-duration-chip">Custom</button>
                                </div>
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
                                />
                                <ErrorText message={actionData?.errors?.emergencyName} />

                                <label className="booking-form-label" htmlFor="emergencyPhone">Emergency Contact Phone *</label>
                                <input
                                    id="emergencyPhone"
                                    name="emergencyPhone"
                                    className="booking-form-input"
                                    value={emergencyPhone}
                                    onChange={(event) => setEmergencyPhone(event.target.value)}
                                />
                                <ErrorText message={actionData?.errors?.emergencyPhone} />

                                <label className="booking-form-label" htmlFor="emergencyRelationship">Relationship *</label>
                                <select
                                    id="emergencyRelationship"
                                    name="emergencyRelationship"
                                    className="booking-form-input"
                                    value={emergencyRelationship}
                                    onChange={(event) => setEmergencyRelationship(event.target.value)}
                                >
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
                                    <dt>Duration</dt><dd>{durationHours} hours</dd>
                                    <dt>Subtotal</dt><dd>{toCurrency(subtotal)}</dd>
                                    <dt>Service fee (15%)</dt><dd>{toCurrency(serviceFee)}</dd>
                                    <dt className="total">Total</dt><dd className="total">{toCurrency(total)}</dd>
                                </dl>
                                <p className="booking-form-help booking-form-help--top">
                                    Payment will be authorized now and charged when {caregiver.name.split(" ")[0]} accepts.
                                </p>
                            </section>
                        </aside>

                        <section className="booking-request-actions">
                            <button type="button" className="booking-action booking-action--secondary" onClick={() => window.history.back()}>
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="booking-action booking-action--primary booking-request-submit"
                                disabled={sendDisabled}
                            >
                                {isSubmitting ? "Sending request..." : "Send Request"}
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
