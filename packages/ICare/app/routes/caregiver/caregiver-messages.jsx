import { useMemo, useState } from "react";
import { NavLink } from "react-router";
import { DashboardShell } from "~/components/application/kasia";
import styles from "./caregiver-messages.module.scss";

const conversations = [
  {
    id: "thread-1",
    name: "Margaret S.",
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
    meta: "Booking #1020 - Completed",
    preview: "Glad you enjoyed the afternoon. Take care and I hope to see you soon.",
    when: "3 weeks ago",
    unread: 0,
    kind: "booking",
    archived: false
  }
];

export default function CaregiverMessages() {
  const [activeTab, setActiveTab] = useState("all");

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
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </section>

        <section className={styles.controls}>
          <p className={styles.countLabel}>{filteredConversations.length} conversations</p>
          <button type="button" className={styles.sortButton}>Sort by: Most Recent</button>
        </section>

        <section className={styles.list} aria-label="Conversation list">
          {filteredConversations.map((thread) => (
            <article key={thread.id} className={`${styles.row} ${thread.unread > 0 ? styles.rowUnread : ""}`.trim()}>
              <div className={styles.avatar} aria-hidden="true">{thread.name.charAt(0)}</div>

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
          <button type="button" className={styles.pageButton}>← Prev</button>
          <button type="button" className={`${styles.pageNumber} ${styles.currentPage}`.trim()}>1</button>
          <button type="button" className={styles.pageButton}>Next →</button>
        </nav>
      </div>
    </DashboardShell>
  );
}
