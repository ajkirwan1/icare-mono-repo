import { useEffect, useMemo, useState } from "react";
import { NavLink, useSearchParams } from "react-router";
import { DashboardShell, StatusPill } from "~/components/application/kasia";
import { getCaregiverBookings } from "./bookings/caregiver-bookings-api-client";
import styles from "./caregiver-bookings.module.scss";

const tabs = [
    { id: "upcoming", label: "Upcoming" },
    { id: "completed", label: "Completed" },
    { id: "declined", label: "Declined" }
];

const PAGE_SIZE = 6;
const STATUS_VARIANT_BY_ID = {
    requested: "pending",
    accepted: "confirmed",
    confirmed: "confirmed",
    in_progress: "confirmed",
    completed: "confirmed",
    payment_released: "confirmed",
    reviewed: "confirmed",
    declined: "declined",
    expired: "declined",
    cancelled: "declined",
    cancelled_by_cr: "declined",
    cancelled_by_cg: "declined"
};

function toCurrency(value) {
    return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(Number(value || 0));
}

function statusLabel(statusId) {
    const status = String(statusId || "").toLowerCase();
    if (status === "requested") return "Pending";
    if (status === "accepted" || status === "confirmed") return "Confirmed";
    if (status === "in_progress") return "In Progress";
    if (status === "payment_released") return "Payment Released";
    if (status === "cancelled" || status === "cancelled_by_cr" || status === "cancelled_by_cg") return "Cancelled";
    if (status === "declined") return "Declined";
    if (status === "reviewed") return "Reviewed";
    if (status === "completed") return "Completed";
    if (status === "expired") return "Expired";
    return "Pending";
}

function statusBucket(statusId) {
    const status = String(statusId || "").toLowerCase();
    if (["completed", "payment_released", "reviewed"].includes(status)) return "completed";
    if (["declined", "expired", "cancelled", "cancelled_by_cr", "cancelled_by_cg"].includes(status)) return "declined";
    return "upcoming";
}

function parseTimeToMinutes(timeText) {
    const match = String(timeText || "").trim().match(/^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i);
    if (!match) return null;
    let hour = Number(match[1]);
    const minute = Number(match[2]);
    const ampm = String(match[3] || "").toUpperCase();
    if (ampm === "PM" && hour < 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;
    return (hour * 60) + minute;
}

function formatMinutesTo12h(totalMinutes) {
    const normalized = ((Math.floor(totalMinutes) % 1440) + 1440) % 1440;
    const hour24 = Math.floor(normalized / 60);
    const minute = normalized % 60;
    const period = hour24 >= 12 ? "PM" : "AM";
    const hour12 = hour24 % 12 || 12;
    return `${hour12}:${String(minute).padStart(2, "0")} ${period}`;
}

function formatDateLabel(isoDate) {
    const parsed = new Date(`${isoDate}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) return "Date TBD";
    return new Intl.DateTimeFormat("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric"
    }).format(parsed);
}

function buildTimeRangeLabel(startTime, durationHours) {
    const startMinutes = parseTimeToMinutes(startTime);
    if (startMinutes === null) return startTime || "Time TBD";
    const durationMinutes = Math.max(0, Math.round(Number(durationHours || 0) * 60));
    const endMinutes = startMinutes + durationMinutes;
    return `${formatMinutesTo12h(startMinutes)} - ${formatMinutesTo12h(endMinutes)}`;
}

function countdownLabel(deadline) {
    const target = Date.parse(deadline || "");
    if (Number.isNaN(target)) return "";
    const diff = target - Date.now();
    if (diff <= 0) return "Expired";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m to respond`;
}

function normalizeBooking(raw) {
    const id = String(raw?.id || "").trim();
    if (!id) return null;

    const statusId = String(raw?.status || "").toLowerCase();
    const duration = Number(raw?.durationHours || 0);
    const serviceTypes = Array.isArray(raw?.serviceTypes) && raw.serviceTypes.length > 0
        ? raw.serviceTypes
        : [raw?.serviceType].filter(Boolean);
    const subtotal = Number(raw?.paymentSubtotal || 0);
    const serviceFee = Number(raw?.paymentServiceFee || 0);
    const total = Number(raw?.paymentTotal || 0);
    const payout = subtotal > 0 ? subtotal : Math.max(0, total - serviceFee);

    const actions = (() => {
        if (statusId === "requested") return ["accept", "decline", "message"];
        if (["accepted", "confirmed", "in_progress"].includes(statusId)) return ["details", "message", "cancel"];
        return ["details"];
    })();

    return {
        id,
        conversationId: String(raw?.conversationId || "").trim(),
        name: String(raw?.careReceiverName || "Care receiver").trim(),
        dateTime: `📅 ${formatDateLabel(raw?.bookingDate)}   ⏰ ${buildTimeRangeLabel(raw?.startTime, duration)}   ⏱ ${duration || 0} hour${duration === 1 ? "" : "s"}`,
        details: serviceTypes.join(", ") || "Companionship",
        amount: toCurrency(payout || total),
        payoutNote: serviceFee > 0 ? `after ${toCurrency(serviceFee)} platform fee` : "payout estimate",
        status: statusLabel(statusId),
        statusVariant: STATUS_VARIANT_BY_ID[statusId] || "pending",
        rawStatus: statusId,
        statusBucket: statusBucket(statusId),
        countdown: statusId === "requested" ? countdownLabel(raw?.responseDeadline) : "",
        avatar: "/images/avatars/female.webp",
        actions,
        updatedAt: raw?.updatedAt || raw?.createdAt || "",
        createdAt: raw?.createdAt || ""
    };
}

function BookingActions({ actions, bookingId, conversationId }) {
    const messageTarget = conversationId ? `/caregiver/messages/${conversationId}` : "/caregiver/messages";
    return (
        <div className={styles.actions}>
            {actions.includes("accept") ? <NavLink className={styles.acceptButton} to={`/caregiver/bookings/${bookingId}?action=accept`}>Accept</NavLink> : null}
            {actions.includes("details") ? <NavLink className={styles.outlineButton} to={`/caregiver/bookings/${bookingId}`}>View Details</NavLink> : null}
            {actions.includes("decline") ? <NavLink className={styles.outlineButton} to={`/caregiver/bookings/${bookingId}?action=decline`}>Decline</NavLink> : null}
            {actions.includes("message") ? <NavLink className={styles.outlineButton} to={messageTarget}>Message</NavLink> : null}
            {actions.includes("cancel") ? <NavLink className={styles.outlineButton} to={`/caregiver/bookings?tab=upcoming&action=cancel&bookingId=${bookingId}`}>Cancel</NavLink> : null}
        </div>
    );
}

function BookingStatus({ booking }) {
    if (booking.statusVariant === "declined") {
        return <span className={styles.declinedPill}>{booking.status}</span>;
    }

    return <StatusPill label={booking.status} variant={booking.statusVariant} />;
}

function BookingCard({ booking }) {
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
                        <p className={styles.payoutNote}>{booking.payoutNote}</p>
                    </div>
                </div>

                <p className={styles.dateTime}>{booking.dateTime}</p>
                <p className={styles.details}>{booking.details}</p>

                <div className={styles.footerRow}>
                    <BookingActions actions={booking.actions} bookingId={booking.id} conversationId={booking.conversationId} />
                    {booking.countdown ? <p className={styles.countdown}>⏳ {booking.countdown}</p> : null}
                </div>
            </div>
        </article>
    );
}

export default function CaregiverBookings() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [state, setState] = useState({
        loading: true,
        error: "",
        bookings: []
    });
    const activeTab = searchParams.get("tab") ?? "upcoming";
    const currentSort = searchParams.get("sort") ?? "newest";
    const currentPage = Number(searchParams.get("page") ?? "1");

    const setParam = (key, value) => {
        const next = new URLSearchParams(searchParams);
        next.set(key, value);
        setSearchParams(next);
    };

    useEffect(() => {
        const controller = new AbortController();
        let mounted = true;

        async function loadBookings() {
            try {
                const payload = await getCaregiverBookings({ signal: controller.signal, page: 1, limit: 200, sort: "newest" });
                const normalized = (payload.bookings || []).map(normalizeBooking).filter(Boolean);

                if (!mounted) return;
                setState({
                    loading: false,
                    error: "",
                    bookings: normalized
                });
            } catch (error) {
                if (!mounted) return;
                setState({
                    loading: false,
                    error: error?.message || "Could not load caregiver bookings.",
                    bookings: []
                });
            }
        }

        loadBookings();
        return () => {
            mounted = false;
            controller.abort();
        };
    }, []);

    const sortedBookings = useMemo(() => {
        const list = [...state.bookings];
        if (currentSort === "oldest") {
            list.sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime());
        } else {
            list.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        }
        return list;
    }, [state.bookings, currentSort]);

    const filteredBookings = useMemo(() => {
        return sortedBookings.filter((booking) => booking.statusBucket === activeTab);
    }, [sortedBookings, activeTab]);

    const totalPages = Math.max(1, Math.ceil(filteredBookings.length / PAGE_SIZE));
    const safePage = Number.isFinite(currentPage) && currentPage > 0 ? Math.min(currentPage, totalPages) : 1;
    const pageStart = (safePage - 1) * PAGE_SIZE;
    const pagedBookings = filteredBookings.slice(pageStart, pageStart + PAGE_SIZE);

    const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? "Upcoming";
    const paginationItems = useMemo(() => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, index) => index + 1);
        }

        const items = [1];
        const start = Math.max(2, safePage - 1);
        const end = Math.min(totalPages - 1, safePage + 1);

        if (start > 2) {
            items.push("start-ellipsis");
        }

        for (let page = start; page <= end; page += 1) {
            items.push(page);
        }

        if (end < totalPages - 1) {
            items.push("end-ellipsis");
        }

        items.push(totalPages);
        return items;
    }, [safePage, totalPages]);

    return (
        <DashboardShell fullWidth>
            <div className={styles.page}>
                <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
                    <NavLink to="/caregiver">Dashboard</NavLink>
                    <span>›</span>
                    <strong>My Bookings</strong>
                </nav>

                <header className={styles.pageHeader}>
                    <p className={styles.pageTitle}>My Bookings</p>
                    <p className={styles.pageSubtitle}>Manage your booking requests and scheduled sessions</p>
                </header>

                <section className={styles.tabsSection} aria-label="Booking categories">
                    {tabs.map((tab) => (
                        <NavLink
                            key={tab.id}
                            to={`/caregiver/bookings?tab=${tab.id}`}
                            className={`${styles.tabButton} ${activeTab === tab.id ? styles.tabButtonActive : ""}`.trim()}
                        >
                            {tab.label}
                        </NavLink>
                    ))}
                </section>

                <section className={styles.topRow}>
                    <p className={styles.pendingCount}>{filteredBookings.length} {activeTabLabel.toLowerCase()} bookings</p>
                    <button
                        type="button"
                        className={styles.sortButton}
                        onClick={() => setParam("sort", currentSort === "newest" ? "oldest" : "newest")}
                    >
                        Sort by: Date ({currentSort}) ▾
                    </button>
                </section>

                <section className={styles.list}>
                    {state.loading ? <p className={styles.pendingCount}>Loading bookings...</p> : null}
                    {!state.loading && pagedBookings.length === 0 ? <p className={styles.pendingCount}>No bookings found.</p> : null}
                    {pagedBookings.map((booking) => (
                        <BookingCard key={booking.id} booking={booking} />
                    ))}
                </section>

                <nav className={styles.pagination} aria-label="Pagination">
                    <button
                        type="button"
                        className={styles.pageButton}
                        disabled={safePage <= 1}
                        onClick={() => setParam("page", String(Math.max(1, safePage - 1)))}
                    >
                        ← Prev
                    </button>

                    {paginationItems.map((item) => {
                        if (typeof item !== "number") {
                            return <span key={item} className={styles.pageEllipsis}>…</span>;
                        }

                        return (
                            <button
                                key={item}
                                type="button"
                                className={`${styles.pageNumber} ${safePage === item ? styles.currentPage : ""}`.trim()}
                                onClick={() => setParam("page", String(item))}
                                aria-current={safePage === item ? "page" : undefined}
                            >
                                {item}
                            </button>
                        );
                    })}

                    <p className={styles.paginationInfo}>Page {safePage} of {totalPages}</p>

                    <button
                        type="button"
                        className={styles.pageButton}
                        disabled={safePage >= totalPages}
                        onClick={() => setParam("page", String(Math.min(totalPages, safePage + 1)))}
                    >
                        Next →
                    </button>
                </nav>
            </div>
        </DashboardShell>
    );
}
