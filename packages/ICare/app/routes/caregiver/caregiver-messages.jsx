import { useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router";
import { DashboardShell } from "~/components/application/kasia";
import styles from "./caregiver-messages.module.scss";

const SAFETY_BANNER_STORAGE_KEY = "icare.caregiver.messages.safety-banner-dismissed.v1";

const conversations = [
  {
    id: "thread-1",
    name: "Margaret S.",
    avatar: "/images/avatars/female.webp",
    meta: "Booking #1042 - Confirmed for Thu 20 Feb",
    preview: "Looking forward to seeing you on Thursday. I will be ready at 10:00.",
    when: "2 hours ago",
    unread: 2,
    kind: "booking",
    archived: false
  },
  {
    id: "thread-2",
    name: "Mary Kelly",
    avatar: "/images/avatars/female.webp",
    meta: "Booking #1038 - Completed",
    preview: "Thank you for today. The walk really helped and I appreciate your support.",
    when: "Yesterday",
    unread: 1,
    kind: "booking",
    archived: false
  },
  {
    id: "thread-3",
    name: "Anna Chen",
    avatar: "/images/avatars/female.webp",
    meta: "Pre-booking inquiry",
    preview: "Hi, are you available next Tuesday for companionship and shopping support?",
    when: "2 days ago",
    unread: 0,
    kind: "inquiry",
    archived: false
  },
  {
    id: "thread-4",
    name: "Sarah Johnson",
    avatar: "/images/avatars/female.webp",
    meta: "Pre-booking inquiry",
    preview: "Would you be available on Saturdays for 3-hour companionship visits?",
    when: "3 days ago",
    unread: 0,
    kind: "inquiry",
    archived: false
  },
  {
    id: "thread-5",
    name: "Tom Richards",
    avatar: "/images/avatars/male.webp",
    meta: "Booking #1035 - Completed",
    preview: "Great meeting you today. Hope you had a comfortable walk and lunch.",
    when: "5 days ago",
    unread: 0,
    kind: "booking",
    archived: false
  },
  {
    id: "thread-6",
    name: "Lisa Park",
    avatar: "/images/avatars/female.webp",
    meta: "Booking #1029 - Completed",
    preview: "I have sent the soup recipe we made together in case you want it.",
    when: "1 week ago",
    unread: 0,
    kind: "booking",
    archived: false
  },
  {
    id: "thread-7",
    name: "James O'Brien",
    avatar: "/images/avatars/male.webp",
    meta: "Pre-booking inquiry",
    preview: "Thanks for your profile details. Do you provide overnight companionship?",
    when: "2 weeks ago",
    unread: 0,
    kind: "inquiry",
    archived: false
  },
  {
    id: "thread-8",
    name: "Emma Wright",
    avatar: "/images/avatars/female.webp",
    meta: "Booking #1020 - Completed",
    preview: "Glad you enjoyed the afternoon. Take care and I hope to see you soon.",
    when: "3 weeks ago",
    unread: 0,
    kind: "booking",
    archived: false
  }
];

function getConversationStatus(thread) {
  const meta = String(thread.meta || "").toLowerCase();

  // Assumption: when explicit sender tracking is unavailable, unread is used as a "needs reply" proxy.
  if (thread.unread > 0) {
    return { id: "needs-reply", label: "Needs reply" };
  }

  if (thread.kind === "booking" && meta.includes("completed")) {
    return { id: "completed", label: "Completed" };
  }

  if (thread.kind === "booking" && meta.includes("confirmed")) {
    return { id: "booking-confirmed", label: "Booking confirmed" };
  }

  if (thread.kind === "inquiry") {
    return { id: "inquiry", label: "Inquiry" };
  }

  return { id: "inquiry", label: "Inquiry" };
}

function getStatusClassName(statusId) {
  if (statusId === "needs-reply") {
    return styles.statusNeedsReply;
  }
  if (statusId === "booking-confirmed") {
    return styles.statusBookingConfirmed;
  }
  if (statusId === "completed") {
    return styles.statusCompleted;
  }
  return styles.statusInquiry;
}

function parseUpcomingBookingDate(meta) {
  const match = /for\s+[A-Za-z]{3}\s+(\d{1,2})\s+([A-Za-z]{3})/i.exec(String(meta || ""));
  if (!match) {
    return null;
  }

  const day = Number(match[1]);
  const monthRaw = match[2].toLowerCase();
  const monthIndexMap = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dec: 11
  };

  const monthIndex = monthIndexMap[monthRaw];
  if (monthIndex === undefined || !day) {
    return null;
  }

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const date = new Date(now.getFullYear(), monthIndex, day, 9, 0, 0, 0);

  if (date < todayStart) {
    date.setFullYear(date.getFullYear() + 1);
  }

  return date.getTime();
}

function getEmptyStateCopy(activeTab) {
  if (activeTab === "unread") {
    return "You’re all caught up. New messages will appear here.";
  }
  if (activeTab === "inquiry") {
    return "No new requests right now.";
  }
  if (activeTab === "archived") {
    return "Nothing archived yet.";
  }
  return "No conversations found for this filter.";
}

export default function CaregiverMessages() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showSafetyBanner, setShowSafetyBanner] = useState(true);
  const [mounted, setMounted] = useState(false);

  const activeTab = searchParams.get("tab") ?? "all";
  const rawSort = searchParams.get("sort") ?? "recent";
  const currentSort = ["recent", "needs-reply", "upcoming-bookings"].includes(rawSort) ? rawSort : "recent";
  const currentPage = Number(searchParams.get("page") ?? "1");

  useEffect(() => {
    setMounted(true);

    try {
      const dismissed = window.localStorage.getItem(SAFETY_BANNER_STORAGE_KEY) === "1";
      if (dismissed) {
        setShowSafetyBanner(false);
      }
    } catch {
      // Ignore localStorage access issues.
    }
  }, []);

  const setParam = (key, value, options = {}) => {
    const next = new URLSearchParams(searchParams);
    next.set(key, value);

    if (options.resetPage) {
      next.set("page", "1");
    }

    setSearchParams(next);
  };

  const tabs = useMemo(() => {
    const allCount = conversations.length;
    const unreadCount = conversations.filter((thread) => thread.unread > 0).length;
    const bookingCount = conversations.filter((thread) => thread.kind === "booking").length;
    const inquiryCount = conversations.filter((thread) => thread.kind === "inquiry").length;
    const archivedCount = conversations.filter((thread) => thread.archived).length;

    return [
      { id: "all", label: `All (${allCount})` },
      { id: "unread", label: `Needs reply (${unreadCount})` },
      { id: "booking", label: `Bookings (${bookingCount})` },
      { id: "inquiry", label: `New requests (${inquiryCount})` },
      { id: "archived", label: `Archived (${archivedCount})` }
    ];
  }, []);

  const filteredConversations = useMemo(() => {
    if (activeTab === "unread") {
      return conversations.filter((thread) => thread.unread > 0);
    }

    if (activeTab === "booking") {
      return conversations.filter((thread) => thread.kind === "booking");
    }

    if (activeTab === "inquiry") {
      return conversations.filter((thread) => thread.kind === "inquiry");
    }

    if (activeTab === "archived") {
      return conversations.filter((thread) => thread.archived);
    }

    return conversations;
  }, [activeTab]);

  const sortedConversations = useMemo(() => {
    const indexById = Object.fromEntries(conversations.map((thread, index) => [thread.id, index]));
    const byMostRecent = (left, right) => (indexById[left.id] ?? 0) - (indexById[right.id] ?? 0);
    const sorted = [...filteredConversations];

    if (currentSort === "needs-reply") {
      return sorted.sort((left, right) => {
        const leftStatus = getConversationStatus(left);
        const rightStatus = getConversationStatus(right);
        const leftRank = leftStatus.id === "needs-reply" ? 0 : 1;
        const rightRank = rightStatus.id === "needs-reply" ? 0 : 1;

        if (leftRank !== rightRank) {
          return leftRank - rightRank;
        }

        return byMostRecent(left, right);
      });
    }

    if (currentSort === "upcoming-bookings") {
      return sorted.sort((left, right) => {
        const leftStatus = getConversationStatus(left);
        const rightStatus = getConversationStatus(right);

        const leftIsUpcoming = leftStatus.id === "booking-confirmed";
        const rightIsUpcoming = rightStatus.id === "booking-confirmed";

        if (leftIsUpcoming !== rightIsUpcoming) {
          return leftIsUpcoming ? -1 : 1;
        }

        if (leftIsUpcoming && rightIsUpcoming) {
          const leftTime = parseUpcomingBookingDate(left.meta) ?? Number.POSITIVE_INFINITY;
          const rightTime = parseUpcomingBookingDate(right.meta) ?? Number.POSITIVE_INFINITY;

          if (leftTime !== rightTime) {
            return leftTime - rightTime;
          }
        }

        return byMostRecent(left, right);
      });
    }

    return sorted.sort(byMostRecent);
  }, [currentSort, filteredConversations]);

  return (
    <DashboardShell>
      <div className={styles.page}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <NavLink to="/caregiver">Dashboard</NavLink>
          <span>›</span>
          <strong>Messages</strong>
        </nav>

        <header className={styles.header}>
          <h1>Messages</h1>
          <p>View and manage your conversations with care receivers.</p>
        </header>

        {showSafetyBanner ? (
          <section className={styles.safetyBanner} aria-label="Messaging safety reminder">
            <div>
              <p className={styles.safetyTitle}>Keep communication on ICare</p>
              <p className={styles.safetyBody}>
                For safety and clarity, it&apos;s best to keep messages and arrangements in one place.
              </p>
            </div>
            <button
              type="button"
              className={styles.dismissButton}
              aria-label="Dismiss safety reminder"
              onClick={() => {
                setShowSafetyBanner(false);
                try {
                  window.localStorage.setItem(SAFETY_BANNER_STORAGE_KEY, "1");
                } catch {
                  // Ignore localStorage write issues.
                }
              }}
            >
              ×
            </button>
          </section>
        ) : null}

        <section className={styles.tabsSection} aria-label="Message categories">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`${styles.tabButton} ${activeTab === tab.id ? styles.tabButtonActive : ""}`.trim()}
              onClick={() => setParam("tab", tab.id, { resetPage: true })}
            >
              {tab.label}
            </button>
          ))}
        </section>

        <section className={styles.controls}>
          <p className={styles.countLabel}>{sortedConversations.length} conversations</p>
          <label className={styles.sortLabel} htmlFor="messages-sort">
            Sort by
            <select
              id="messages-sort"
              className={styles.sortSelect}
              value={currentSort}
              onChange={(event) => setParam("sort", event.target.value, { resetPage: true })}
            >
              <option value="recent">Most recent</option>
              <option value="needs-reply">Needs reply first</option>
              <option value="upcoming-bookings">Upcoming bookings</option>
            </select>
          </label>
        </section>

        <section className={`${styles.list} ${mounted ? styles.listMounted : ""}`} aria-label="Conversation list">
          {sortedConversations.length === 0 ? (
            <div className={styles.emptyState}>
              <p>{getEmptyStateCopy(activeTab)}</p>
            </div>
          ) : sortedConversations.map((thread, index) => {
            const status = getConversationStatus(thread);

            return (
              <article
                key={thread.id}
                className={`${styles.row} ${status.id === "needs-reply" ? styles.rowNeedsReply : ""} ${status.id === "completed" ? styles.rowCompleted : ""}`.trim()}
                role="button"
                tabIndex={0}
                style={{ "--row-index": index }}
                onClick={() => navigate(`/caregiver/messages/${thread.id}`)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    navigate(`/caregiver/messages/${thread.id}`);
                  }
                }}
              >
                <div className={styles.avatar} aria-hidden="true">
                  {thread.avatar ? (
                    <img className={styles.avatarImage} src={thread.avatar} alt="" />
                  ) : (
                    <span>{thread.name.charAt(0)}</span>
                  )}
                </div>

                <div className={styles.threadMain}>
                  <p className={styles.threadName}>{thread.name}</p>
                  <div className={styles.metaRow}>
                    <p className={styles.threadMeta}>{thread.meta}</p>
                    <span className={`${styles.statusPill} ${getStatusClassName(status.id)}`.trim()}>
                      {status.label}
                    </span>
                  </div>
                  <p className={styles.threadPreview}>{thread.preview}</p>
                </div>

                <div className={styles.threadRight}>
                  <p className={styles.when}>{thread.when}</p>
                  {thread.unread > 0 ? <span className={styles.unreadBadge}>{thread.unread}</span> : null}
                </div>
              </article>
            );
          })}
        </section>

        <nav className={styles.pagination} aria-label="Pagination">
          <button
            type="button"
            className={styles.pageButton}
            onClick={() => setParam("page", String(Math.max(1, currentPage - 1)))}
          >
            ← Prev
          </button>
          <button
            type="button"
            className={`${styles.pageNumber} ${currentPage === 1 ? styles.currentPage : ""}`.trim()}
            onClick={() => setParam("page", "1")}
          >
            1
          </button>
          <button
            type="button"
            className={`${styles.pageNumber} ${currentPage === 2 ? styles.currentPage : ""}`.trim()}
            onClick={() => setParam("page", "2")}
          >
            2
          </button>
          <button
            type="button"
            className={styles.pageButton}
            onClick={() => setParam("page", String(Math.min(2, currentPage + 1)))}
          >
            Next →
          </button>
        </nav>
      </div>
    </DashboardShell>
  );
}
