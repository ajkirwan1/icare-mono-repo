import { useMemo } from "react";
import { NavLink, useSearchParams } from "react-router";
import { DashboardShell, StatusPill } from "~/components/application/kasia";
import styles from "./carereceiver-bookings.module.scss";

// icons for date/time display
import { FiCalendar, FiClock } from "react-icons/fi";

const PAGE_SIZE = 6;

const sortOptions = [
    { id: "newest", label: "Date (newest)" },
    { id: "oldest", label: "Date (oldest)" },
    { id: "amount-high", label: "Amount (highest)" },
    { id: "amount-low", label: "Amount (lowest)" }
];

const bookings = [
    {
        id: "bk-2026-0142",
        caregiverId: "cg-sarah-johnson",
        conversationId: "conv-1001",
        name: "Sarah Johnson",
        date: "Thu 20 Feb 2026",
        timeRange: "10:00 AM - 2:00 PM",
        duration: "4 hours",
        details: "Companionship, Light housework",
        amountValue: 75.6,
        amount: "£75.60",
        status: "Confirmed",
        statusVariant: "confirmed",
        avatar: "/images/avatars/female.webp"
    },
    {
        id: "bk-2026-0149",
        caregiverId: "cg-anna-chen",
        conversationId: "conv-1003",
        name: "Anna Chen",
        date: "Sat 22 Feb 2026",
        timeRange: "2:00 PM - 5:00 PM",
        duration: "3 hours",
        details: "Companionship, Shopping assistance",
        amountValue: 56.7,
        amount: "£56.70",
        status: "Pending",
        statusVariant: "pending",
        countdown: "18h 32m remaining",
        avatar: "/images/avatars/female.webp"
    },
    {
        id: "bk-2026-0161",
        caregiverId: "cg-sarah-johnson",
        conversationId: "conv-1001",
        name: "Sarah Johnson",
        date: "Thu 27 Feb 2026",
        timeRange: "10:00 AM - 1:00 PM",
        duration: "3 hours",
        details: "Companionship",
        amountValue: 56.7,
        amount: "£56.70",
        status: "Confirmed",
        statusVariant: "confirmed",
        avatar: "/images/avatars/female.webp"
    },
    {
        id: "bk-2026-0151",
        caregiverId: "cg-mary-kelly",
        conversationId: "conv-1002",
        name: "Mary Kelly",
        date: "Mon 10 Feb 2026",
        timeRange: "11:00 AM - 3:00 PM",
        duration: "4 hours",
        details: "Companionship, Meal preparation",
        amountValue: 75.6,
        amount: "£75.60",
        status: "Completed",
        statusVariant: "info",
        canReview: true,
        canBookAgain: true,
        avatar: "/images/avatars/female.webp"
    },
    {
        id: "bk-2026-0154",
        caregiverId: "cg-tom-richards",
        conversationId: "conv-1004",
        name: "Tom Richards",
        date: "Fri 7 Feb 2026",
        timeRange: "9:00 AM - 12:00 PM",
        duration: "3 hours",
        details: "Companionship",
        amountValue: 56.7,
        amount: "£56.70",
        status: "Completed",
        statusVariant: "info",
        canReview: false,
        canBookAgain: false,
        avatar: "/images/avatars/male.webp"
    },
    {
        id: "bk-2026-0132",
        caregiverId: "cg-lisa-park",
        conversationId: "conv-1006",
        name: "Lisa Park",
        date: "Wed 5 Feb 2026",
        timeRange: "1:00 PM - 4:00 PM",
        duration: "3 hours",
        details: "Companionship, Meal preparation",
        amountValue: 56.7,
        amount: "£56.70",
        status: "Cancelled",
        statusVariant: "cancelled",
        avatar: "/images/avatars/female.webp"
    },
    {
        id: "bk-2026-0128",
        caregiverId: "cg-emma-wright",
        conversationId: "conv-1012",
        name: "Emma Wright",
        date: "Tue 4 Feb 2026",
        timeRange: "10:00 AM - 1:00 PM",
        duration: "3 hours",
        details: "Companionship",
        amountValue: 56.7,
        amount: "£56.70",
        status: "Completed",
        statusVariant: "info",
        canReview: true,
        canBookAgain: true,
        avatar: "/images/avatars/female.webp"
    },
    {
        id: "bk-2026-0124",
        caregiverId: "cg-james-obrien",
        conversationId: "conv-1013",
        name: "James O'Brien",
        date: "Mon 3 Feb 2026",
        timeRange: "2:00 PM - 5:00 PM",
        duration: "3 hours",
        details: "Companionship",
        amountValue: 56.7,
        amount: "£56.70",
        status: "Completed",
        statusVariant: "info",
        canReview: true,
        canBookAgain: false,
        avatar: "/images/avatars/male.webp"
    },
    {
        id: "bk-2026-0119",
        caregiverId: "cg-anna-chen",
        conversationId: "conv-1003",
        name: "Anna Chen",
        date: "Sun 2 Feb 2026",
        timeRange: "11:00 AM - 2:00 PM",
        duration: "3 hours",
        details: "Companionship, Shopping assistance",
        amountValue: 56.7,
        amount: "£56.70",
        status: "Completed",
        statusVariant: "info",
        canReview: true,
        canBookAgain: true,
        avatar: "/images/avatars/female.webp"
    },
    {
        id: "bk-2026-0116",
        caregiverId: "cg-mary-kelly",
        conversationId: "conv-1002",
        name: "Mary Kelly",
        date: "Sat 1 Feb 2026",
        timeRange: "9:00 AM - 12:00 PM",
        duration: "3 hours",
        details: "Companionship",
        amountValue: 56.7,
        amount: "£56.70",
        status: "Completed",
        statusVariant: "info",
        canReview: false,
        canBookAgain: false,
        avatar: "/images/avatars/female.webp"
    },
    {
        id: "bk-2026-0112",
        caregiverId: "cg-john-anderson",
        conversationId: "conv-1011",
        name: "John Anderson",
        date: "Fri 31 Jan 2026",
        timeRange: "1:00 PM - 4:00 PM",
        duration: "3 hours",
        details: "Companionship",
        amountValue: 56.7,
        amount: "£56.70",
        status: "Cancelled",
        statusVariant: "cancelled",
        avatar: "/images/avatars/male.webp"
    },
    {
        id: "bk-2026-0107",
        caregiverId: "cg-lisa-park",
        conversationId: "conv-1006",
        name: "Lisa Park",
        date: "Thu 30 Jan 2026",
        timeRange: "10:00 AM - 2:00 PM",
        duration: "4 hours",
        details: "Companionship, Light housework",
        amountValue: 75.6,
        amount: "£75.60",
        status: "Completed",
        statusVariant: "info",
        canReview: true,
        canBookAgain: false,
        avatar: "/images/avatars/female.webp"
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

function BookingStatus({ booking }) {
    if (booking.statusVariant === "cancelled") {
        return <span className={styles.declinedPill}>{booking.status}</span>;
    }

    return <StatusPill label={booking.status} variant={booking.statusVariant} />;
}

function BookingActions({ booking }) {
    const actions = [{ label: "View Details", to: `/carereceiver/bookings/${booking.id}`, primary: false }];

    if (booking.status === "Pending") {
        actions.push({ label: "Cancel Request", to: `/carereceiver/bookings/${booking.id}`, primary: true });
    }

    if (booking.status === "Confirmed") {
        actions.push({ label: "Message", to: `/carereceiver/messages/${booking.conversationId}`, primary: false });
        actions.push({ label: "Cancel", to: `/carereceiver/bookings/${booking.id}`, primary: false });
    }

    if (booking.status === "Completed") {
        if (booking.canReview) {
            actions.unshift({ label: "Leave Review", to: `/carereceiver/bookings/${booking.id}/review`, primary: true });
        }
        if (booking.canBookAgain) {
            actions.push({ label: "Book Again", to: `/carereceiver/bookings/new/${booking.caregiverId}`, primary: false });
        }
    }

    return (
        <div className={styles.actions}>
            {actions.map((action) => (
                <NavLink
                    key={`${booking.id}-${action.label}`}
                    className={action.primary ? styles.acceptButton : styles.outlineButton}
                    to={action.to}
                >
                    {action.label}
                </NavLink>
            ))}
        </div>
    );
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
                    <BookingActions booking={booking} />
                    {booking.countdown ? <p className={styles.countdown}>⏳ {booking.countdown}</p> : null}
                </div>
            </div>
        </article>
    );
}

export default function CarereceiverBookings() {
    const [searchParams, setSearchParams] = useSearchParams();

    const tabCounts = useMemo(() => {
        const all = bookings.length;
        const upcoming = bookings.filter((booking) => booking.status === "Confirmed").length;
        const pending = bookings.filter((booking) => booking.status === "Pending").length;
        const completed = bookings.filter((booking) => booking.status === "Completed").length;
        const cancelled = bookings.filter((booking) => booking.status === "Cancelled").length;

        return { all, upcoming, pending, completed, cancelled };
    }, []);

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
            return bookings.filter((booking) => booking.status === "Pending");
        }

        if (activeTab === "upcoming") {
            return bookings.filter((booking) => booking.status === "Confirmed");
        }

        if (activeTab === "completed") {
            return bookings.filter((booking) => booking.status === "Completed");
        }

        if (activeTab === "cancelled") {
            return bookings.filter((booking) => booking.status === "Cancelled");
        }

        return bookings;
    }, [activeTab]);

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
            return sorted.reverse();
        }

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
                        <span className={styles.sortLabel}>Sort by</span>
                        <select
                            className={styles.sortSelect}
                            value={activeSort}
                            onChange={(event) => {
                                setSearchParams((prev) => {
                                    const next = new URLSearchParams(prev);
                                    next.set("sort", event.target.value);
                                    next.set("page", "1");
                                    return next;
                                });
                            }}
                        >
                            {sortOptions.map((option) => (
                                <option key={option.id} value={option.id}>{option.label}</option>
                            ))}
                        </select>
                    </label>
                </section>

                <section className={styles.list}>
                    {pagedBookings.map((booking) => (
                        <BookingCard key={booking.id} booking={booking} />
                    ))}
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
            </div>
        </DashboardShell>
    );
}
