import { useMemo } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router";
import { DashboardShell } from "~/components/application/kasia";
import styles from "./caregiver-messages.module.scss";

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

export default function CaregiverMessages() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") ?? "all";
  const currentSort = searchParams.get("sort") ?? "recent";
  const currentPage = Number(searchParams.get("page") ?? "1");

  const setParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    next.set(key, value);
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
      { id: "unread", label: `Unread (${unreadCount})` },
      { id: "booking", label: `Booking-linked (${bookingCount})` },
      { id: "inquiry", label: `Inquiries (${inquiryCount})` },
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

        <section className={styles.tabsSection} aria-label="Message categories">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`${styles.tabButton} ${activeTab === tab.id ? styles.tabButtonActive : ""}`.trim()}
              onClick={() => setParam("tab", tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </section>

        <section className={styles.controls}>
          <p className={styles.countLabel}>{filteredConversations.length} conversations</p>
          <button
            type="button"
            className={styles.sortButton}
            onClick={() => setParam("sort", currentSort === "recent" ? "oldest" : "recent")}
          >
            Sort by: {currentSort === "recent" ? "Most Recent" : "Oldest"}
          </button>
        </section>

        <section className={styles.list} aria-label="Conversation list">
          {filteredConversations.map((thread) => (
            <article
              key={thread.id}
              className={`${styles.row} ${thread.unread > 0 ? styles.rowUnread : ""}`.trim()}
              role="button"
              tabIndex={0}
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
                <p className={styles.threadMeta}>{thread.meta}</p>
                <p className={styles.threadPreview}>{thread.preview}</p>
              </div>

              <div className={styles.threadRight}>
                <p className={styles.when}>{thread.when}</p>
                {thread.unread > 0 ? <span className={styles.unreadBadge}>{thread.unread}</span> : null}
              </div>
            </article>
          ))}
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
