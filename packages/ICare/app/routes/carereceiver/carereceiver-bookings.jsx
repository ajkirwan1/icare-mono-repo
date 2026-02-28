import { useMemo } from "react";
import { NavLink, useSearchParams } from "react-router";
import { DashboardShell, StatusPill } from "~/components/application/kasia";
import styles from "./carereceiver-bookings.module.scss";

const PAGE_SIZE = 4;

const tabs = [
  { id: "upcoming", label: "Upcoming" },
  { id: "pending", label: "Pending" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" }
];

const sortOptions = [
  { id: "newest", label: "Date (newest)" },
  { id: "oldest", label: "Date (oldest)" },
  { id: "amount-high", label: "Amount (highest)" },
  { id: "amount-low", label: "Amount (lowest)" }
];

const bookings = [
  {
    id: "bk-2026-0149",
    caregiverId: "cg-anna-chen",
    conversationId: "conv-1003",
    name: "Anna Chen",
    dateTime: "📅 Sat 22 Feb 2026   ⏰ 2:00 PM - 5:00 PM   ⏱ 3 hours",
    details: "Companionship, Shopping assistance",
    amountValue: 56.7,
    amount: "£56.70",
    status: "Pending",
    statusVariant: "pending",
    countdown: "18h 32m to review",
    avatar: "/images/avatars/female.webp"
  },
  {
    id: "bk-2026-0150",
    caregiverId: "cg-sarah-johnson",
    conversationId: "conv-1001",
    name: "Sarah Johnson",
    dateTime: "📅 Sun 23 Feb 2026   ⏰ 10:00 AM - 1:00 PM   ⏱ 3 hours",
    details: "Companionship",
    amountValue: 48.6,
    amount: "£48.60",
    status: "Pending",
    statusVariant: "pending",
    countdown: "22h 15m to review",
    avatar: "/images/avatars/female.webp"
  },
  {
    id: "bk-2026-0142",
    caregiverId: "cg-mary-kelly",
    conversationId: "conv-1002",
    name: "Mary Kelly",
    dateTime: "📅 Thu 20 Feb 2026   ⏰ 10:00 AM - 2:00 PM   ⏱ 4 hours",
    details: "Companionship, Light housework",
    amountValue: 75.6,
    amount: "£75.60",
    status: "Confirmed",
    statusVariant: "confirmed",
    avatar: "/images/avatars/female.webp"
  },
  {
    id: "bk-2026-0161",
    caregiverId: "cg-emma-wilson",
    conversationId: "conv-1010",
    name: "Emma Wilson",
    dateTime: "📅 Thu 27 Feb 2026   ⏰ 10:00 AM - 1:00 PM   ⏱ 3 hours",
    details: "Companionship",
    amountValue: 48.2,
    amount: "£48.20",
    status: "Confirmed",
    statusVariant: "confirmed",
    avatar: "/images/avatars/female.webp"
  },
  {
    id: "bk-2026-0151",
    caregiverId: "cg-mary-kelly",
    conversationId: "conv-1002",
    name: "Mary Kelly",
    dateTime: "📅 Mon 10 Feb 2026   ⏰ 11:00 AM - 3:00 PM   ⏱ 4 hours",
    details: "Companionship, Meal preparation",
    amountValue: 75.6,
    amount: "£75.60",
    status: "Completed",
    statusVariant: "info",
    avatar: "/images/avatars/female.webp"
  },
  {
    id: "bk-2026-0154",
    caregiverId: "cg-tom-richards",
    conversationId: "conv-1004",
    name: "Tom Richards",
    dateTime: "📅 Fri 7 Feb 2026   ⏰ 9:00 AM - 12:00 PM   ⏱ 3 hours",
    details: "Companionship",
    amountValue: 56.7,
    amount: "£56.70",
    status: "Completed",
    statusVariant: "info",
    avatar: "/images/avatars/male.webp"
  },
  {
    id: "bk-2026-0132",
    caregiverId: "cg-john-anderson",
    conversationId: "conv-1011",
    name: "John Anderson",
    dateTime: "📅 Wed 5 Feb 2026   ⏰ 1:00 PM - 4:00 PM   ⏱ 3 hours",
    details: "Companionship, Meal preparation",
    amountValue: 56.7,
    amount: "£56.70",
    status: "Cancelled",
    statusVariant: "cancelled",
    avatar: "/images/avatars/male.webp"
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
  const actions = [
    { label: "View Details", to: `/carereceiver/bookings/${booking.id}`, primary: false },
    { label: "Message", to: `/carereceiver/messages/${booking.conversationId}`, primary: false }
  ];

  if (booking.status === "Pending") {
    actions.unshift({ label: "Edit Request", to: `/carereceiver/bookings/new/${booking.caregiverId}`, primary: true });
  }

  if (booking.status === "Confirmed") {
    actions.push({ label: "Reschedule", to: `/carereceiver/bookings/new/${booking.caregiverId}`, primary: false });
  }

  if (booking.status === "Completed") {
    actions.unshift({ label: "Leave Review", to: `/carereceiver/bookings/${booking.id}/review`, primary: true });
  }

  if (booking.status === "Cancelled") {
    actions.unshift({ label: "Book Again", to: `/carereceiver/bookings/new/${booking.caregiverId}`, primary: true });
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

        <p className={styles.dateTime}>{booking.dateTime}</p>
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

  const rawTab = searchParams.get("tab") ?? "upcoming";
  const activeTab = tabs.some((tab) => tab.id === rawTab) ? rawTab : "upcoming";

  const rawSort = searchParams.get("sort") ?? "newest";
  const activeSort = sortOptions.some((option) => option.id === rawSort) ? rawSort : "newest";

  const requestedPage = Number(searchParams.get("page") ?? "1");

  const filteredBookings = useMemo(() => {
    if (activeTab === "pending") {
      return bookings.filter((booking) => booking.status === "Pending");
    }

    if (activeTab === "completed") {
      return bookings.filter((booking) => booking.status === "Completed");
    }

    if (activeTab === "cancelled") {
      return bookings.filter((booking) => booking.status === "Cancelled");
    }

    return bookings.filter((booking) => booking.status === "Pending" || booking.status === "Confirmed");
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

  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? "Upcoming";

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
          <p className={styles.pageSubtitle}>Manage your booking requests and scheduled sessions</p>
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
          <p className={styles.pendingCount}>{filteredBookings.length} {activeTabLabel.toLowerCase()} bookings</p>
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
