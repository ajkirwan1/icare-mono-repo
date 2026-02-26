import { NavLink, useSearchParams } from "react-router";
import { DashboardShell, StatusPill } from "~/components/application/kasia";
import styles from "./caregiver-bookings.module.scss";

const tabs = [
  { id: "upcoming", label: "Upcoming" },
  { id: "completed", label: "Completed" },
  { id: "declined", label: "Declined" }
];

const bookings = [
  {
    id: "pending-1",
    name: "Margaret Thompson",
    dateTime: "📅 Sat 22 Feb 2026   ⏰ 2:00 PM - 5:00 PM   ⏱ 3 hours",
    details: "Companionship, Shopping assistance",
    amount: "£48.60",
    payoutNote: "after 15% commission",
    status: "Pending",
    statusVariant: "pending",
    countdown: "18h 32m to respond",
    avatar: "/images/avatars/female.webp",
    actions: ["accept", "decline", "message"]
  },
  {
    id: "pending-2",
    name: "Dorothy Williams",
    dateTime: "📅 Sun 23 Feb 2026   ⏰ 10:00 AM - 1:00 PM   ⏱ 3 hours",
    details: "Companionship",
    amount: "£48.60",
    payoutNote: "after 15% commission",
    status: "Pending",
    statusVariant: "pending",
    countdown: "22h 15m to respond",
    avatar: "/images/avatars/female.webp",
    actions: ["accept", "decline", "message"]
  },
  {
    id: "pending-3",
    name: "Robert Hughes",
    dateTime: "📅 Mon 24 Feb 2026   ⏰ 1:00 PM - 4:00 PM   ⏱ 3 hours",
    details: "Companionship, Light housework",
    amount: "£48.60",
    payoutNote: "after 15% commission",
    status: "Pending",
    statusVariant: "pending",
    countdown: "1d 6h to respond",
    avatar: "/images/avatars/male.webp",
    actions: ["accept", "decline", "message"]
  },
  {
    id: "confirmed-1",
    name: "Margaret Thompson",
    dateTime: "📅 Thu 20 Feb 2026   ⏰ 10:00 AM - 2:00 PM   ⏱ 4 hours",
    details: "Companionship, Light housework",
    amount: "£64.26",
    payoutNote: "after 15% commission",
    status: "Confirmed",
    statusVariant: "confirmed",
    avatar: "/images/avatars/female.webp",
    actions: ["details", "message", "cancel"]
  },
  {
    id: "confirmed-2",
    name: "Margaret Thompson",
    dateTime: "📅 Thu 27 Feb 2026   ⏰ 10:00 AM - 1:00 PM   ⏱ 3 hours",
    details: "Companionship",
    amount: "£48.20",
    payoutNote: "after 15% commission",
    status: "Confirmed",
    statusVariant: "confirmed",
    avatar: "/images/avatars/female.webp",
    actions: ["details", "message", "cancel"]
  },
  {
    id: "completed-1",
    name: "Dorothy Williams",
    dateTime: "📅 Mon 10 Feb 2026   ⏰ 11:00 AM - 3:00 PM   ⏱ 4 hours",
    details: "Companionship, Meal preparation",
    amount: "£64.26",
    payoutNote: "after 15% commission",
    status: "Completed",
    statusVariant: "confirmed",
    avatar: "/images/avatars/female.webp",
    actions: ["details"]
  },
  {
    id: "completed-2",
    name: "Edward Brown",
    dateTime: "📅 Fri 7 Feb 2026   ⏰ 9:00 AM - 12:00 PM   ⏱ 3 hours",
    details: "Companionship",
    amount: "£48.20",
    payoutNote: "after 15% commission",
    status: "Completed",
    statusVariant: "confirmed",
    avatar: "/images/avatars/male.webp",
    actions: ["details"]
  },
  {
    id: "declined-1",
    name: "Patricia Green",
    dateTime: "📅 Wed 5 Feb 2026   ⏰ 1:00 PM - 4:00 PM   ⏱ 3 hours",
    details: "Companionship, Meal preparation",
    amount: "£48.20",
    payoutNote: "after 15% commission",
    status: "Declined",
    statusVariant: "declined",
    avatar: "/images/avatars/female.webp",
    actions: ["details"]
  }
];

function BookingActions({ actions }) {
  return (
    <div className={styles.actions}>
      {actions.includes("accept") ? <button className={styles.acceptButton} type="button">Accept</button> : null}
      {actions.includes("details") ? <button className={styles.outlineButton} type="button">View Details</button> : null}
      {actions.includes("decline") ? <button className={styles.outlineButton} type="button">Decline</button> : null}
      {actions.includes("message") ? <NavLink className={styles.outlineButton} to="/caregiver/messages">Message</NavLink> : null}
      {actions.includes("cancel") ? <button className={styles.outlineButton} type="button">Cancel</button> : null}
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
          <BookingActions actions={booking.actions} />
          {booking.countdown ? <p className={styles.countdown}>⏳ {booking.countdown}</p> : null}
        </div>
      </div>
    </article>
  );
}

export default function CaregiverBookings() {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") ?? "upcoming";

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "completed") {
      return booking.status === "Completed";
    }

    if (activeTab === "declined") {
      return booking.status === "Declined";
    }

    return booking.status === "Confirmed";
  });

  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? "Upcoming";

  return (
    <DashboardShell>
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
          <button type="button" className={styles.sortButton}>Sort by: Date (newest) ▾</button>
        </section>

        <section className={styles.list}>
          {filteredBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </section>

        <nav className={styles.pagination} aria-label="Pagination">
          <button type="button" className={styles.pageButton}>← Prev</button>
          <button type="button" className={`${styles.pageNumber} ${styles.currentPage}`.trim()}>1</button>
          <button type="button" className={styles.pageNumber}>2</button>
          <button type="button" className={styles.pageButton}>Next →</button>
        </nav>
      </div>
    </DashboardShell>
  );
}
