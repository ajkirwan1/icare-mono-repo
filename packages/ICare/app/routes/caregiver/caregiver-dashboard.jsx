import { useState } from "react";
import styles from "./caregiver-dashboard.module.scss";

const upcomingBookings = [
  { name: "John W.", date: "Mon 15 Jan - 10:00 - 14:00 (4h)", status: "Confirmed", avatar: "/images/avatars/male.webp" },
  { name: "Margaret S.", date: "Tue 16 Jan - 09:00 - 13:00 (4h)", status: "Confirmed", avatar: "/images/avatars/female.webp" }
];

const pendingRequests = [
  { name: "Margaret S.", date: "Wed 17 Jan - 12:00 - 16:00 (4h)", status: "Pending Response", avatar: "/images/avatars/female.webp" },
  { name: "John W.", date: "Thu 18 Jan - 08:00 - 12:00 (4h)", status: "Pending Response", avatar: "/images/avatars/male.webp" }
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
      <button type="button">View Details</button>
    </article>
  );
}

export default function CaregiverDashboard() {
  const [isProfileVisible, setIsProfileVisible] = useState(true);

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <h1>Welcome back, Margaret S.</h1>
          <p>Tuesday, 7 February 2026</p>
        </header>

        <section className={styles.alertBanner}>
          <span className={styles.alertIcon}>!</span>
          <div>
            <p className={styles.alertTitle}>2 booking requests awaiting your response</p>
            <p className={styles.alertSub}>Please respond within 24 hours.</p>
          </div>
        </section>

        <div className={styles.grid}>
          <div className={styles.leftColumn}>
            <section className={`${styles.card} ${styles.blackTitleCard}`}>
              <h2>Pending Booking Requests</h2>
              <div className={styles.list}>
                {pendingRequests.map((item) => (
                  <BookingItem key={`${item.name}-${item.date}`} item={item} requested />
                ))}
              </div>
            </section>

            <section className={`${styles.card} ${styles.blackTitleCard}`}>
              <h2>Upcoming Bookings</h2>
              <div className={styles.list}>
                {upcomingBookings.map((item) => (
                  <BookingItem key={`${item.name}-${item.date}`} item={item} />
                ))}
              </div>
            </section>

            <section className={`${styles.card} ${styles.blackTitleCard}`}>
              <h2>Earnings Summary</h2>
              <div className={styles.earningsGrid}>
                <div>
                  <p className={styles.earningsLabel}>This Month</p>
                  <p className={styles.earningsValue}>GBP 450.00</p>
                  <p className={styles.earningsDelta}>+GBP 120 from last month</p>
                </div>
                <div>
                  <p className={styles.earningsLabel}>Pending Payouts</p>
                  <p className={styles.earningsValue}>GBP 120.00</p>
                </div>
              </div>
            </section>
          </div>

          <aside className={styles.rightColumn}>
            <section className={`${styles.card} ${styles.blackTitleCard}`}>
              <h2>Profile Status</h2>
              <div className={styles.progressTrack}>
                <span style={{ width: "75%" }} />
              </div>
              <p className={styles.progressText}>75%</p>
              <div className={styles.chips}>
                <span>DBS Uploaded &amp; Verified</span>
                <span>ID Verified</span>
                <span>References Verified</span>
              </div>
              <p className={styles.verificationNote}>All checks and documents have been uploaded and verified.</p>
              <div className={styles.toggleRow}>
                <span>Profile visible to families</span>
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

            <section className={`${styles.card} ${styles.blackTitleCard}`}>
              <h2>Quick Actions</h2>
              <div className={styles.quickActions}>
                <button type="button" className={styles.quickAction}>manage availability</button>
                <button type="button" className={styles.quickAction}>view earnings</button>
                <button type="button" className={styles.quickAction}>upload DBS check</button>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
