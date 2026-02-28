import { useState } from "react";
import { Link } from "react-router";
import styles from "./carereceiver-dashboard.module.scss";

const pendingRequests = [
    {
        id: "bk-2026-1101",
        name: "Emma Wilson",
        date: "Wed 17 Jan - 12:00 - 16:00 (4h)",
        status: "Pending Response",
        avatar: "/images/avatars/female.webp"
    },
    {
        id: "bk-2026-1102",
        name: "John W.",
        date: "Thu 18 Jan - 08:00 - 12:00 (4h)",
        status: "Pending Response",
        avatar: "/images/avatars/male.webp"
    }
];

const upcomingBookings = [
    {
        id: "bk-2026-1201",
        name: "Mary Thompson",
        date: "Mon 15 Jan - 10:00 - 14:00 (4h)",
        status: "Confirmed",
        avatar: "/images/avatars/female.webp"
    },
    {
        id: "bk-2026-1202",
        name: "Tom Richards",
        date: "Tue 16 Jan - 09:00 - 13:00 (4h)",
        status: "Confirmed",
        avatar: "/images/avatars/male.webp"
    }
];

function BookingItem({ item, requested = false }) {
    return (
        <article className={styles.bookingItem}>
            <div className={styles.avatar}>
                <img src={item.avatar} alt={item.name} />
            </div>
            <div className={styles.meta}>
                <p>{item.name}</p>
                <small>{item.date}</small>
                <span className={requested ? styles.requested : styles.confirmed}>{item.status}</span>
            </div>
            <Link className={styles.detailsAction} to={`/carereceiver/bookings/${item.id}`}>
                View Details
            </Link>
        </article>
    );
}

export default function CarereceiverDashboard() {
    const [isProfileVisible, setIsProfileVisible] = useState(true);

    return (
        <div className={styles.page}>
            <div className={styles.shell}>
                <header className={styles.header}>
                    <h1>Welcome back, Sarah M.</h1>
                    <p>Tuesday, 7 February 2026</p>
                </header>

                <section className={styles.alertBanner}>
                    <span className={styles.alertIcon}>!</span>
                    <div>
                        <p className={styles.alertTitle}>2 booking updates need your attention</p>
                        <p className={styles.alertSub}>Review pending responses and confirm your next visit details.</p>
                    </div>
                </section>

                <div className={styles.grid}>
                    <div className={styles.leftColumn}>
                        <section className={`${styles.card} ${styles.blackTitleCard}`.trim()}>
                            <h2>Pending Booking Requests</h2>
                            <div className={styles.list}>
                                {pendingRequests.map((item) => (
                                    <BookingItem key={item.id} item={item} requested />
                                ))}
                            </div>
                        </section>

                        <section className={`${styles.card} ${styles.blackTitleCard}`.trim()}>
                            <h2>Upcoming Bookings</h2>
                            <div className={styles.list}>
                                {upcomingBookings.map((item) => (
                                    <BookingItem key={item.id} item={item} />
                                ))}
                            </div>
                        </section>

                        <section className={`${styles.card} ${styles.blackTitleCard}`.trim()}>
                            <h2>Care Budget Summary</h2>
                            <div className={styles.earningsGrid}>
                                <div>
                                    <p className={styles.earningsLabel}>This Month</p>
                                    <p className={styles.earningsValue}>GBP 450.00</p>
                                    <p className={styles.earningsDelta}>+GBP 120 from last month</p>
                                </div>
                                <div>
                                    <p className={styles.earningsLabel}>Pending Charges</p>
                                    <p className={styles.earningsValue}>GBP 120.00</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <aside className={styles.rightColumn}>
                        <section className={`${styles.card} ${styles.blackTitleCard}`.trim()}>
                            <h2>Profile Status</h2>
                            <div className={styles.progressTrack}>
                                <span style={{ width: "75%" }} />
                            </div>
                            <p className={styles.progressText}>75%</p>
                            <div className={styles.chips}>
                                <span>Address Verified</span>
                                <span>Payment Method Added</span>
                                <span>Emergency Contact Added</span>
                            </div>
                            <p className={styles.verificationNote}>Your booking profile is ready. Complete the remaining fields for faster caregiver matching.</p>
                            <div className={styles.toggleRow}>
                                <span>Profile visible to caregivers</span>
                                <button
                                    type="button"
                                    className={`${styles.toggle} ${isProfileVisible ? styles.toggleOn : styles.toggleOff}`.trim()}
                                    aria-label="Toggle profile visibility"
                                    aria-pressed={isProfileVisible}
                                    onClick={() => setIsProfileVisible((prev) => !prev)}
                                >
                                    <span />
                                </button>
                            </div>
                        </section>

                        <section className={`${styles.card} ${styles.blackTitleCard}`.trim()}>
                            <h2>Quick Actions</h2>
                            <div className={styles.quickActions}>
                                <Link to="/carereceiver/search" className={styles.quickAction}>find caregiver</Link>
                                <Link to="/carereceiver/bookings" className={styles.quickAction}>view bookings</Link>
                                <Link to="/carereceiver/messages" className={styles.quickAction}>open messages</Link>
                                <Link to="/carereceiver/settings/payment" className={styles.quickAction}>payment methods</Link>
                            </div>
                        </section>
                    </aside>
                </div>
            </div>
        </div>
    );
}
