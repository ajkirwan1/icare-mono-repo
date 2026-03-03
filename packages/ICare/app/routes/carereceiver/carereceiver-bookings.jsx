import { useEffect, useMemo, useState } from "react";
import { NavLink, useSearchParams } from "react-router";
import { DashboardShell, StatusPill } from "~/components/application/kasia";
import CustomSelect from "~/forms/inputs/CustomSelect";
import styles from "./carereceiver-bookings.module.scss";

import { FiCalendar, FiClock } from "react-icons/fi";
import { cancelCarereceiverBooking, getCarereceiverBookings } from "./bookings/bookings-api-client";

const PAGE_SIZE = 6;

const sortOptions = [
    { id: "newest", label: "Date (newest)" },
    { id: "oldest", label: "Date (oldest)" },
    { id: "amount-high", label: "Amount (highest)" },
    { id: "amount-low", label: "Amount (lowest)" }
];
const cancelReasonOptions = [
    { id: "no_longer_needed", label: "No longer needed" },
    { id: "schedule_change", label: "Schedule change" },
    { id: "emergency", label: "Emergency" },
    { id: "other", label: "Other" }
];

const fallbackBookings = [
    {
        id: "bk-2026-1203",
        caregiverId: "cg-john-anderson",
        conversationId: "conv-1011",
        name: "John Anderson",
        date: "Sun 01 Mar 2026",
        timeRange: "2:00 PM - 5:00 PM",
        duration: "3 hours",
        details: "Companionship",
        amountValue: 59.85,
        amount: "£59.85",
        status: "In Progress",
        statusVariant: "info",
        statusBucket: "upcoming",
        canReview: false,
        canBookAgain: false,
        avatar: "/images/avatars/male.webp",
        sortTimestamp: Date.parse("2026-03-01T14:00:00Z")
    }
];

function buildSearch(searchParams, updates) {
    const next = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
            next.delete(key);
            return;
        }

        next.set(key, String(value));
    });

    return `?${next.toString()}`;
}

function formatCurrency(value) {
    return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(Number(value || 0));
}

function formatDateLabel(isoDate) {
    if (!isoDate) {
        return "Date TBD";
    }

    const parsed = new Date(`${isoDate}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) {
        return String(isoDate);
    }

    return new Intl.DateTimeFormat("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric"
    }).format(parsed);
}

function parseTime12(timeLabel) {
    const match = String(timeLabel || "").trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) {
        return null;
    }

    let hours = Number(match[1]);
    const minutes = Number(match[2]);
    const meridiem = match[3].toUpperCase();

    if (meridiem === "PM" && hours < 12) {
        hours += 12;
    }
    if (meridiem === "AM" && hours === 12) {
        hours = 0;
    }

    const date = new Date(2000, 0, 1, hours, minutes, 0);
    return Number.isNaN(date.getTime()) ? null : date;
}

function formatTimeRange(startTimeLabel, durationHours) {
    const start = parseTime12(startTimeLabel);
    if (!start) {
        return startTimeLabel || "Time TBD";
    }

    const minutes = Math.max(0, Math.round(Number(durationHours || 0) * 60));
    if (!minutes) {
        return new Intl.DateTimeFormat("en-GB", { hour: "numeric", minute: "2-digit" }).format(start);
    }

    const end = new Date(start.getTime() + minutes * 60 * 1000);
    const formatter = new Intl.DateTimeFormat("en-GB", { hour: "numeric", minute: "2-digit" });
    return `${formatter.format(start)} - ${formatter.format(end)}`;
}

function countdownLabel(deadlineIso) {
    if (!deadlineIso) {
        return "";
    }

    const deadline = Date.parse(deadlineIso);
    if (!Number.isFinite(deadline)) {
        return "";
    }

    const diffMs = deadline - Date.now();
    if (diffMs <= 0) {
        return "Response window ending soon";
    }

    const totalMinutes = Math.ceil(diffMs / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m remaining`;
}

function statusPresentation(status) {
    const normalized = String(status || "").toLowerCase();

    if (normalized === "requested") {
        return { label: "Pending", variant: "pending", bucket: "pending" };
    }

    if (normalized === "accepted") {
        return { label: "Confirmed", variant: "confirmed", bucket: "upcoming" };
    }

    if (normalized === "in_progress") {
        return { label: "In Progress", variant: "info", bucket: "upcoming" };
    }

    if (["completed", "payment_released", "reviewed"].includes(normalized)) {
        return { label: "Completed", variant: "info", bucket: "completed" };
    }

    return { label: "Cancelled", variant: "cancelled", bucket: "cancelled" };
}

function bookingTimestamp(isoDate, startTimeLabel) {
    if (!isoDate) {
        return 0;
    }

    const base = new Date(`${isoDate}T00:00:00`);
    if (Number.isNaN(base.getTime())) {
        return 0;
    }

    const start = parseTime12(startTimeLabel);
    if (start) {
        base.setHours(start.getHours(), start.getMinutes(), 0, 0);
    }

    return base.getTime();
}

function normalizeBooking(rawBooking) {
    const id = String(rawBooking?.id || "").trim();
    if (!id) {
        return null;
    }

    const status = statusPresentation(rawBooking?.status);
    const rawStatus = String(rawBooking?.status || "").toLowerCase();
    const durationHours = Number(rawBooking?.durationHours || 0);
    const hourlyRate = Number(rawBooking?.hourlyRate || 0);
    const paymentTotal = Number(rawBooking?.paymentTotal || (durationHours > 0 && hourlyRate > 0 ? durationHours * hourlyRate : 0));

    const serviceTypes = Array.isArray(rawBooking?.serviceTypes)
        ? rawBooking.serviceTypes.map((item) => String(item || "").trim()).filter(Boolean)
        : [];

    const details = serviceTypes.length > 0
        ? serviceTypes.join(", ")
        : (String(rawBooking?.serviceType || "").trim() || "Companionship");

    const startTimeLabel = String(rawBooking?.startTime || "").trim();

    return {
        id,
        caregiverId: String(rawBooking?.caregiverId || "").trim(),
        conversationId: rawBooking?.conversationId ? String(rawBooking.conversationId) : "",
        name: String(rawBooking?.caregiverName || "Caregiver").trim() || "Caregiver",
        date: formatDateLabel(rawBooking?.bookingDate),
        timeRange: formatTimeRange(startTimeLabel, durationHours),
        duration: durationHours > 0 ? `${durationHours} hour${durationHours === 1 ? "" : "s"}` : "Duration TBD",
        details,
        amountValue: paymentTotal,
        amount: formatCurrency(paymentTotal),
        status: status.label,
        statusVariant: status.variant,
        statusBucket: status.bucket,
        rawStatus,
        canReview: status.bucket === "completed" && rawBooking?.hasReview !== true,
        canBookAgain: status.bucket === "completed",
        avatar: rawBooking?.caregiverPhotoUrl || "/images/avatars/female.webp",
        countdown: status.bucket === "pending" ? countdownLabel(rawBooking?.responseDeadline) : "",
        sortTimestamp: bookingTimestamp(rawBooking?.bookingDate, startTimeLabel)
    };
}

function BookingStatus({ booking }) {
    if (booking.statusVariant === "cancelled") {
        return <span className={styles.declinedPill}>{booking.status}</span>;
    }

    return <StatusPill label={booking.status} variant={booking.statusVariant} />;
}

function BookingActions({ booking, onCancelClick }) {
    const actions = [{ label: "View Details", to: `/carereceiver/bookings/${booking.id}`, primary: false }];

    if (booking.statusBucket === "pending") {
        actions.push({ label: "Cancel Request", kind: "cancel" });
    }

    if (booking.statusBucket === "upcoming") {
        if (booking.conversationId) {
            actions.push({ label: "Message", to: `/carereceiver/messages/${booking.conversationId}`, primary: false });
        }
        if (booking.rawStatus === "accepted") {
            actions.push({ label: "Cancel", kind: "cancel" });
        }
    }

    if (booking.statusBucket === "completed") {
        if (booking.canReview) {
            actions.unshift({ label: "Leave Review", to: `/carereceiver/bookings/${booking.id}/review`, primary: true });
        }
        if (booking.canBookAgain && booking.caregiverId) {
            actions.push({ label: "Book Again", to: `/carereceiver/bookings/new/${booking.caregiverId}`, primary: false });
        }
    }

    return (
        <div className={styles.actions}>
            {actions.map((action) => (
                action.kind === "cancel" ? (
                    <button
                        key={`${booking.id}-${action.label}`}
                        type="button"
                        className={`${styles.outlineButton} ${styles.cancelTrigger}`.trim()}
                        onClick={() => onCancelClick(booking)}
                    >
                        {action.label}
                    </button>
                ) : (
                    <NavLink
                        key={`${booking.id}-${action.label}`}
                        className={action.primary ? styles.acceptButton : styles.outlineButton}
                        to={action.to}
                    >
                        {action.label}
                    </NavLink>
                )
            ))}
        </div>
    );
}

function BookingCard({ booking, onCancelClick }) {
    return (
        <article className={styles.bookingCard}>
            <div className={styles.avatar}>
                <img src={booking.avatar} alt={booking.name} />
            </div>

            <div className={styles.content}>
                <div className={styles.headerRow}>
                    <div className={styles.nameRow}>
                        <p className={styles.name}>{booking.name}</p>
                        <BookingStatus booking={booking} />
                    </div>

                    <div className={styles.amountWrap}>
                        <p className={styles.amount}>{booking.amount}</p>
                        <p className={styles.payoutNote}>estimated total cost</p>
                    </div>
                </div>

                <p className={styles.dateTime}>
                    <span className={styles.dateTimeItem}><FiCalendar /> <span>{booking.date}</span></span>
                    <span className={styles.dateTimeItem}><FiClock /> <span>{booking.timeRange}</span></span>
                    <span className={styles.dateTimeItem}><FiClock /> <span>{booking.duration}</span></span>
                </p>
                <p className={styles.details}>{booking.details}</p>

                <div className={styles.footerRow}>
                    <BookingActions booking={booking} onCancelClick={onCancelClick} />
                    {booking.countdown ? <p className={styles.countdown}>⏳ {booking.countdown}</p> : null}
                </div>
            </div>
        </article>
    );
}

export default function CarereceiverBookings() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [state, setState] = useState({ loading: true, error: "", bookings: fallbackBookings });
    const [cancelDialog, setCancelDialog] = useState({ booking: null, submitting: false, error: "" });
    const [cancelReason, setCancelReason] = useState("no_longer_needed");
    const [cancelDetails, setCancelDetails] = useState("");
    const [toastMessage, setToastMessage] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        let mounted = true;

        async function loadBookings() {
            try {
                const payload = await getCarereceiverBookings({ signal: controller.signal, page: 1, limit: 200 });
                const normalized = (payload.bookings || []).map(normalizeBooking).filter(Boolean);

                if (!mounted) {
                    return;
                }

                setState({
                    loading: false,
                    error: "",
                    bookings: normalized.length > 0 ? normalized : []
                });
            } catch {
                if (!mounted) {
                    return;
                }

                setState({
                    loading: false,
                    error: "Could not load bookings from API. Showing fallback data.",
                    bookings: fallbackBookings
                });
            }
        }

        loadBookings();

        return () => {
            mounted = false;
            controller.abort();
        };
    }, []);

    useEffect(() => {
        if (!toastMessage) {
            return undefined;
        }

        const timer = window.setTimeout(() => {
            setToastMessage("");
        }, 2800);

        return () => window.clearTimeout(timer);
    }, [toastMessage]);

    function openCancelDialog(booking) {
        setCancelReason("no_longer_needed");
        setCancelDetails("");
        setCancelDialog({ booking, submitting: false, error: "" });
    }

    function closeCancelDialog() {
        setCancelDialog((prev) => (prev.submitting ? prev : { booking: null, submitting: false, error: "" }));
    }

    async function confirmCancellation() {
        const booking = cancelDialog.booking;
        if (!booking || cancelDialog.submitting) {
            return;
        }

        const normalizedDetails = String(cancelDetails || "").trim();
        if (cancelReason === "other" && !normalizedDetails) {
            setCancelDialog((prev) => ({
                ...prev,
                error: "Please add a short reason when selecting Other."
            }));
            return;
        }

        setCancelDialog((prev) => ({ ...prev, submitting: true, error: "" }));

        try {
            const response = await cancelCarereceiverBooking(booking.id, {
                reason: cancelReason,
                details: normalizedDetails
            });

            const nextStatus = statusPresentation(response?.status || "cancelled");
            setState((prev) => ({
                ...prev,
                bookings: prev.bookings.map((item) => (
                    item.id === booking.id
                        ? {
                            ...item,
                            status: nextStatus.label,
                            statusVariant: nextStatus.variant,
                            statusBucket: nextStatus.bucket,
                            countdown: ""
                        }
                        : item
                ))
            }));

            setCancelDialog({ booking: null, submitting: false, error: "" });
            setToastMessage("Booking request cancelled.");
        } catch (error) {
            setCancelDialog((prev) => ({
                ...prev,
                submitting: false,
                error: error instanceof Error ? error.message : "Could not cancel booking."
            }));
        }
    }

    const tabCounts = useMemo(() => {
        const all = state.bookings.length;
        const upcoming = state.bookings.filter((booking) => booking.statusBucket === "upcoming").length;
        const pending = state.bookings.filter((booking) => booking.statusBucket === "pending").length;
        const completed = state.bookings.filter((booking) => booking.statusBucket === "completed").length;
        const cancelled = state.bookings.filter((booking) => booking.statusBucket === "cancelled").length;

        return { all, upcoming, pending, completed, cancelled };
    }, [state.bookings]);

    const tabs = useMemo(() => ([
        { id: "all", label: `All (${tabCounts.all})` },
        { id: "upcoming", label: `Upcoming (${tabCounts.upcoming})` },
        { id: "pending", label: `Pending (${tabCounts.pending})` },
        { id: "completed", label: `Completed (${tabCounts.completed})` },
        { id: "cancelled", label: `Cancelled (${tabCounts.cancelled})` }
    ]), [tabCounts]);

    const rawTab = searchParams.get("tab") ?? "all";
    const activeTab = tabs.some((tab) => tab.id === rawTab) ? rawTab : "all";

    const rawSort = searchParams.get("sort") ?? "newest";
    const activeSort = sortOptions.some((option) => option.id === rawSort) ? rawSort : "newest";

    const requestedPage = Number(searchParams.get("page") ?? "1");

    const filteredBookings = useMemo(() => {
        if (activeTab === "pending") {
            return state.bookings.filter((booking) => booking.statusBucket === "pending");
        }

        if (activeTab === "upcoming") {
            return state.bookings.filter((booking) => booking.statusBucket === "upcoming");
        }

        if (activeTab === "completed") {
            return state.bookings.filter((booking) => booking.statusBucket === "completed");
        }

        if (activeTab === "cancelled") {
            return state.bookings.filter((booking) => booking.statusBucket === "cancelled");
        }

        return state.bookings;
    }, [activeTab, state.bookings]);

    const sortedBookings = useMemo(() => {
        const sorted = [...filteredBookings];

        if (activeSort === "amount-high") {
            sorted.sort((a, b) => b.amountValue - a.amountValue);
            return sorted;
        }

        if (activeSort === "amount-low") {
            sorted.sort((a, b) => a.amountValue - b.amountValue);
            return sorted;
        }

        if (activeSort === "oldest") {
            sorted.sort((a, b) => a.sortTimestamp - b.sortTimestamp);
            return sorted;
        }

        sorted.sort((a, b) => b.sortTimestamp - a.sortTimestamp);
        return sorted;
    }, [filteredBookings, activeSort]);

    const totalPages = Math.max(1, Math.ceil(sortedBookings.length / PAGE_SIZE));
    const currentPage = Number.isFinite(requestedPage) && requestedPage > 0 ? Math.min(requestedPage, totalPages) : 1;

    const pagedBookings = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        return sortedBookings.slice(start, start + PAGE_SIZE);
    }, [sortedBookings, currentPage]);

    return (
        <DashboardShell>
            <div className={styles.page}>
                <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
                    <NavLink to="/carereceiver">Dashboard</NavLink>
                    <span>›</span>
                    <strong>My Bookings</strong>
                </nav>

                <header className={styles.pageHeader}>
                    <p className={styles.pageTitle}>My Bookings</p>
                    <p className={styles.pageSubtitle}>View and manage all your bookings</p>
                </header>

                <section className={styles.tabsSection} aria-label="Booking categories">
                    {tabs.map((tab) => (
                        <NavLink
                            key={tab.id}
                            to={buildSearch(searchParams, { tab: tab.id, page: 1 })}
                            className={`${styles.tabButton} ${activeTab === tab.id ? styles.tabButtonActive : ""}`.trim()}
                        >
                            {tab.label}
                        </NavLink>
                    ))}
                </section>

                <section className={styles.topRow}>
                    <p className={styles.pendingCount}>{filteredBookings.length} bookings</p>
                    <label className={styles.sortWrap}>
                        <span id="carereceiver-bookings-sort-label" className={styles.sortLabel}>Sort by</span>
                        <CustomSelect
                            id="carereceiver-bookings-sort"
                            name="carereceiver-bookings-sort"
                            labelId="carereceiver-bookings-sort-label"
                            className={styles.sortSelect}
                            controlClassName={styles.sortSelectControl}
                            value={activeSort}
                            onChange={(nextValue) => {
                                setSearchParams((prev) => {
                                    const next = new URLSearchParams(prev);
                                    next.set("sort", nextValue);
                                    next.set("page", "1");
                                    return next;
                                });
                            }}
                            options={sortOptions.map((option) => ({ value: option.id, label: option.label }))}
                            placeholder="Sort"
                        />
                    </label>
                </section>

                {toastMessage ? (
                    <section className={styles.toastSuccess} role="status" aria-live="polite">
                        {toastMessage}
                    </section>
                ) : null}

                {state.error ? <p className={styles.pendingCount}>{state.error}</p> : null}

                <section className={styles.list}>
                    {state.loading ? <p className={styles.pendingCount}>Loading bookings...</p> : null}

                    {!state.loading && pagedBookings.length === 0 ? (
                        <article className={styles.bookingCard}>
                            <div className={styles.content}>
                                <p className={styles.name}>No bookings found</p>
                                <p className={styles.details}>Try another tab or create a new booking from caregiver search.</p>
                            </div>
                        </article>
                    ) : null}

                    {!state.loading ? pagedBookings.map((booking) => (
                        <BookingCard key={booking.id} booking={booking} onCancelClick={openCancelDialog} />
                    )) : null}
                </section>

                <nav className={styles.pagination} aria-label="Pagination">
                    {currentPage > 1 ? (
                        <NavLink className={styles.pageButton} to={buildSearch(searchParams, { page: currentPage - 1 })}>← Prev</NavLink>
                    ) : (
                        <span className={`${styles.pageButton} ${styles.pageButtonDisabled}`.trim()}>← Prev</span>
                    )}

                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                        <NavLink
                            key={pageNumber}
                            className={`${styles.pageNumber} ${pageNumber === currentPage ? styles.currentPage : ""}`.trim()}
                            to={buildSearch(searchParams, { page: pageNumber })}
                        >
                            {pageNumber}
                        </NavLink>
                    ))}

                    {currentPage < totalPages ? (
                        <NavLink className={styles.pageButton} to={buildSearch(searchParams, { page: currentPage + 1 })}>Next →</NavLink>
                    ) : (
                        <span className={`${styles.pageButton} ${styles.pageButtonDisabled}`.trim()}>Next →</span>
                    )}
                </nav>

                {cancelDialog.booking ? (
                    <div className={styles.modalBackdrop} role="presentation" onClick={closeCancelDialog}>
                        <section
                            className={styles.modalCard}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="cancel-booking-title"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <h2 id="cancel-booking-title" className={styles.modalTitle}>Cancel this booking?</h2>
                            <p className={styles.modalText}>
                                You are about to cancel booking with <strong>{cancelDialog.booking.name}</strong>.
                            </p>
                            <p className={styles.modalMeta}>
                                {cancelDialog.booking.date} • {cancelDialog.booking.timeRange}
                            </p>
                            <p className={styles.modalText}>
                                This action will update booking status to cancelled and process refund rules based on policy.
                            </p>

                            <div className={styles.modalForm}>
                                <label className={styles.modalField} htmlFor="cancel-reason">
                                    <span id="cancel-reason-label">Reason</span>
                                    <CustomSelect
                                        id="cancel-reason"
                                        name="cancel-reason"
                                        labelId="cancel-reason-label"
                                        className={styles.modalSelect}
                                        controlClassName={styles.modalSelectControl}
                                        value={cancelReason}
                                        onChange={(nextValue) => {
                                            setCancelReason(nextValue);
                                            setCancelDialog((prev) => ({ ...prev, error: "" }));
                                        }}
                                        options={cancelReasonOptions.map((option) => ({ value: option.id, label: option.label }))}
                                    />
                                </label>

                                <label className={styles.modalField} htmlFor="cancel-details">
                                    <span>Details (optional)</span>
                                    <textarea
                                        id="cancel-details"
                                        className={styles.modalTextarea}
                                        value={cancelDetails}
                                        maxLength={300}
                                        onChange={(event) => {
                                            setCancelDetails(event.target.value);
                                            setCancelDialog((prev) => ({ ...prev, error: "" }));
                                        }}
                                        placeholder="Add context for caregiver (optional)"
                                    />
                                </label>
                            </div>

                            {cancelDialog.error ? (
                                <p className={styles.modalError} role="alert">{cancelDialog.error}</p>
                            ) : null}

                            <div className={styles.modalActions}>
                                <button
                                    type="button"
                                    className={styles.modalSecondary}
                                    onClick={closeCancelDialog}
                                    disabled={cancelDialog.submitting}
                                >
                                    Keep booking
                                </button>
                                <button
                                    type="button"
                                    className={styles.modalDanger}
                                    onClick={confirmCancellation}
                                    disabled={cancelDialog.submitting}
                                >
                                    {cancelDialog.submitting ? "Cancelling..." : "Confirm Cancellation"}
                                </button>
                            </div>
                        </section>
                    </div>
                ) : null}
            </div>
        </DashboardShell>
    );
}
