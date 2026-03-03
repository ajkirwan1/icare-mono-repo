import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import styles from "./caregiver-dashboard.module.scss";

const upcomingBookings = [
    {
        bookingId: "confirmed-2",
        name: "John W.",
        date: "2026-01-15",
        startTime: "10:00",
        endTime: "14:00",
        durationHours: 4,
        status: "Confirmed",
        statusHint: "Confirmed and ready for your visit.",
        avatar: "/images/avatars/male.webp"
    },
    {
        bookingId: "confirmed-1",
        name: "Margaret S.",
        date: "2026-01-16",
        startTime: "09:00",
        endTime: "13:00",
        durationHours: 4,
        status: "Confirmed",
        statusHint: "Confirmed. Review notes before arrival.",
        avatar: "/images/avatars/female.webp"
    }
];

const pendingRequests = [
    {
        bookingId: "pending-1",
        name: "Margaret S.",
        date: "2026-01-17",
        startTime: "12:00",
        endTime: "16:00",
        durationHours: 4,
        status: "Pending Response",
        statusHint: "Please respond within 24 hours.",
        avatar: "/images/avatars/female.webp"
    },
    {
        bookingId: "pending-2",
        name: "John W.",
        date: "2026-01-18",
        startTime: "08:00",
        endTime: "12:00",
        durationHours: 4,
        status: "Pending Response",
        statusHint: "Please respond within 24 hours.",
        avatar: "/images/avatars/male.webp"
    }
];

const dtfWeekday = new Intl.DateTimeFormat("en-GB", { weekday: "short" });
const dtfDayMonth = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" });

function formatBookingSlot(item) {
    const dateObj = new Date(`${item.date}T00:00:00`);
    return `${dtfWeekday.format(dateObj)} ${dtfDayMonth.format(dateObj)} · ${item.startTime}\u2013${item.endTime} (${item.durationHours}h)`;
}

function isToday(dateISO) {
    const now = new Date();
    const bookingDate = new Date(`${dateISO}T00:00:00`);
    return (
        bookingDate.getFullYear() === now.getFullYear()
        && bookingDate.getMonth() === now.getMonth()
        && bookingDate.getDate() === now.getDate()
    );
}

function BookingItem({ item, requested = false, onViewDetails }) {
    return (
        <article className={`${styles.bookingItem} ${requested ? styles.bookingItemPending : styles.bookingItemUpcoming}`}>
            <div className={styles.avatar}>
                <img src={item.avatar} alt={item.name} />
            </div>
            <div className={styles.meta}>
                <p>{item.name}</p>
                <small>{formatBookingSlot(item)}</small>
                <span className={requested ? styles.requested : styles.confirmed}>
                    {requested ? "Needs your response" : item.status}
                </span>
                <p className={styles.statusHint}>{item.statusHint}</p>
            </div>
            <button type="button" onClick={() => onViewDetails(item.bookingId)}>View booking</button>
        </article>
    );
}

export default function CaregiverDashboard() {
    const [isProfileVisible, setIsProfileVisible] = useState(true);
    const navigate = useNavigate();
    const pendingSectionRef = useRef(null);

    const profileCompletion = 75;
    const profileChecks = useMemo(
        () => ({
            dbsVerified: true,
            idVerified: true,
            referencesVerified: true
        }),
        []
    );

    const pendingCount = pendingRequests.length;
    const todayConfirmedCount = useMemo(
        () => upcomingBookings.filter((booking) => isToday(booking.date)).length,
        []
    );
    const isFullyVerified = profileCompletion >= 100
        && profileChecks.dbsVerified
        && profileChecks.idVerified
        && profileChecks.referencesVerified;

    const handleViewDetails = (bookingId) => {
        navigate(bookingId ? `/caregiver/bookings/${bookingId}` : "/caregiver/bookings");
    };

    const handleScrollToPending = () => {
        if (!pendingSectionRef.current) { return; }
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        pendingSectionRef.current.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "start"
        });
    };

    const todayAtGlance = todayConfirmedCount > 0
        ? `Today: ${todayConfirmedCount} booking${todayConfirmedCount > 1 ? "s" : ""}`
        : "Today: No bookings today";

    const thisMonthCompletedBookings = 6;

    return (
        <div className={styles.page}>
            <div className={styles.shell}>
                <header className={styles.header}>
                    <h1>Welcome back, Margaret S.</h1>
                    <p>Tuesday, 7 February 2026</p>
                    <p className={styles.todayAtGlance}>
                        {todayAtGlance}
                        {pendingCount > 0 ? ` \u00b7 ${pendingCount} request${pendingCount > 1 ? "s" : ""} waiting` : ""}
                    </p>
                </header>

                {pendingCount > 0 ? (
                    <section className={`${styles.alertBanner} ${styles.sectionEnter}`} aria-live="polite">
                        <span className={styles.alertIcon}>i</span>
                        <div className={styles.alertContent}>
                            <p className={styles.alertTitle}>
                                {pendingCount} booking request{pendingCount > 1 ? "s" : ""} awaiting your response
                            </p>
                            <p className={styles.alertSub}>Please review within 24 hours.</p>
                        </div>
                        <button type="button" className={styles.bannerCta} onClick={handleScrollToPending}>
                            Review requests
                        </button>
                    </section>
                ) : null}

                <div className={styles.grid}>
                    <div className={styles.leftColumn}>
                        <section ref={pendingSectionRef} id="pending-booking-requests" className={`${styles.card} ${styles.blackTitleCard} ${styles.pendingCard} ${styles.sectionEnter}`}>
                            <h2>Pending Booking Requests</h2>
                            <div className={styles.list}>
                                {pendingRequests.map((item) => (
                                    <BookingItem key={`${item.name}-${item.date}`} item={item} requested onViewDetails={handleViewDetails} />
                                ))}
                            </div>
                        </section>

                        <section className={`${styles.card} ${styles.blackTitleCard} ${styles.upcomingCard} ${styles.sectionEnter}`}>
                            <h2>Upcoming Bookings</h2>
                            <div className={styles.list}>
                                {upcomingBookings.map((item) => (
                                    <BookingItem key={`${item.name}-${item.date}`} item={item} onViewDetails={handleViewDetails} />
                                ))}
                            </div>
                        </section>

                        <section className={`${styles.card} ${styles.blackTitleCard} ${styles.sectionEnter}`}>
                            <h2>Earnings Summary</h2>
                            <div className={styles.earningsGrid}>
                                <div>
                                    <p className={styles.earningsLabel}>This Month</p>
                                    <p className={styles.earningsValue}>GBP 450.00</p>
                                    <p className={styles.earningsDelta}>+GBP 120 from last month</p>
                                    <p className={styles.earningsHelper}>From {thisMonthCompletedBookings} completed bookings</p>
                                </div>
                                <div>
                                    <p className={styles.earningsLabel}>Pending Payouts</p>
                                    <p className={styles.earningsValue}>GBP 120.00</p>
                                    <p className={styles.earningsHelper}>Pending payouts are awaiting confirmation.</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <aside className={styles.rightColumn}>
                        <section className={`${styles.card} ${styles.blackTitleCard} ${styles.sectionEnter}`}>
                            <h2>Profile Status</h2>
                            <div className={styles.progressTrack}>
                                <span style={{ width: `${profileCompletion}%` }} />
                            </div>
                            <p className={styles.progressText}>{profileCompletion}%</p>
                            <div className={styles.chips}>
                                {profileChecks.dbsVerified ? <span>DBS verified</span> : <span>DBS pending</span>}
                                {profileChecks.idVerified ? <span>ID verified</span> : <span>ID pending</span>}
                                {profileChecks.referencesVerified ? <span>References verified</span> : <span>References pending</span>}
                            </div>
                            <p className={styles.verificationNote}>
                                {isFullyVerified
                                    ? "Profile complete and visible to families"
                                    : "Complete your profile to appear in matches"}
                            </p>
                            <div className={styles.toggleRow}>
                                <span className={styles.toggleLabel}>
                                    Profile visible to families
                                    <button
                                        type="button"
                                        className={styles.helpButton}
                                        aria-label="Profile visibility help"
                                        title="You can hide your profile at any time."
                                    >
                                        ?
                                    </button>
                                </span>
                                <button
                                    type="button"
                                    className={`${styles.toggle} ${isProfileVisible ? styles.toggleOn : styles.toggleOff}`}
                                    aria-label="Toggle profile visibility"
                                    aria-pressed={isProfileVisible}
                                    onClick={() => setIsProfileVisible((prev) => !prev)}
                                >
                                    <span />
                                </button>
                            </div>
                        </section>

                        <section className={`${styles.card} ${styles.blackTitleCard} ${styles.sectionEnter}`}>
                            <h2>Quick Actions</h2>
                            <div className={styles.quickActions}>
                                <button
                                    type="button"
                                    className={`${styles.quickAction} ${styles.quickActionPrimary}`}
                                    onClick={() => navigate("/caregiver/profile")}
                                >
                                    Edit Profile
                                </button>
                                <button
                                    type="button"
                                    className={styles.quickAction}
                                    onClick={() => navigate("/caregiver/payout-setup")}
                                >
                                    View Earnings
                                </button>
                                {!profileChecks.dbsVerified ? (
                                    <button
                                        type="button"
                                        className={styles.quickAction}
                                        onClick={() => navigate("/caregiver/onboarding/dbs-submission")}
                                    >
                                        Upload DBS check
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className={styles.quickAction}
                                        onClick={() => navigate("/caregiver/profile/preview")}
                                    >
                                        Preview public profile
                                    </button>
                                )}
                            </div>
                        </section>
                    </aside>
                </div>
            </div>
        </div>
    );
}
