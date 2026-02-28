import { useMemo } from "react";
import { NavLink, useSearchParams } from "react-router";
import { DashboardShell } from "~/components/application/kasia";
import styles from "./carereceiver-messages.module.scss";

const PAGE_SIZE = 6;

const sortOptions = [
    { id: "recent", label: "Most Recent" },
    { id: "oldest", label: "Oldest First" },
    { id: "unread", label: "Unread First" },
    { id: "name", label: "Name (A-Z)" }
];

const conversations = [
    {
        id: "conv-1001",
        name: "Sarah Johnson",
        meta: "Booking #1042 - Confirmed for Thu 20 Feb",
        preview: "Looking forward to seeing you on Thursday. I will be ready at 10:00.",
        when: "2 hours ago",
        unread: 2,
        kind: "booking",
        archived: false,
        updatedAt: "2026-02-20T12:00:00Z"
    },
    {
        id: "conv-1002",
        name: "Mary Kelly",
        meta: "Booking #1038 - Completed",
        preview: "Thank you for today. The walk really helped and I appreciate your support.",
        when: "Yesterday",
        unread: 1,
        kind: "booking",
        archived: false,
        updatedAt: "2026-02-19T18:00:00Z"
    },
    {
        id: "conv-1003",
        name: "Anna Chen",
        meta: "Pre-booking inquiry",
        preview: "Hi, are you available next Tuesday for companionship and shopping support?",
        when: "2 days ago",
        unread: 1,
        kind: "inquiry",
        archived: false,
        updatedAt: "2026-02-18T09:00:00Z"
    },
    {
        id: "conv-1004",
        name: "Tom Richards",
        meta: "Booking #1035 - Completed",
        preview: "Great meeting you today. Hope you had a comfortable walk and lunch.",
        when: "5 days ago",
        unread: 0,
        kind: "booking",
        archived: false,
        updatedAt: "2026-02-15T15:00:00Z"
    },
    {
        id: "conv-1005",
        name: "Emma Wilson",
        meta: "Pre-booking inquiry",
        preview: "Would Wednesday afternoon work for a first companionship visit?",
        when: "1 week ago",
        unread: 0,
        kind: "inquiry",
        archived: true,
        updatedAt: "2026-02-13T10:00:00Z"
    },
    {
        id: "conv-1006",
        name: "John Anderson",
        meta: "Booking #1025 - Completed",
        preview: "Thanks again. Let me know if you want to rebook next month.",
        when: "2 weeks ago",
        unread: 0,
        kind: "booking",
        archived: false,
        updatedAt: "2026-02-07T11:00:00Z"
    },
    {
        id: "conv-1007",
        name: "James O'Brien",
        meta: "Pre-booking inquiry",
        preview: "Thanks for your interest! I specialise in companionship and shopping support.",
        when: "2 weeks ago",
        unread: 0,
        kind: "inquiry",
        archived: false,
        updatedAt: "2026-02-06T15:30:00Z"
    },
    {
        id: "conv-1008",
        name: "Emma Wright",
        meta: "Booking #1020 - Completed",
        preview: "Glad you enjoyed the afternoon. Take care and I hope to hear from you soon.",
        when: "3 weeks ago",
        unread: 0,
        kind: "booking",
        archived: false,
        updatedAt: "2026-02-01T10:20:00Z"
    }
];

const tabIds = ["all", "unread", "booking", "inquiry", "archived"];

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

export default function CarereceiverMessages() {
    const [searchParams, setSearchParams] = useSearchParams();

    const rawTab = searchParams.get("tab") ?? "all";
    const activeTab = tabIds.includes(rawTab) ? rawTab : "all";

    const rawSort = searchParams.get("sort") ?? "recent";
    const activeSort = sortOptions.some((option) => option.id === rawSort) ? rawSort : "recent";

    const requestedPage = Number(searchParams.get("page") ?? "1");

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

    const sortedConversations = useMemo(() => {
        const sorted = [...filteredConversations];

        if (activeSort === "oldest") {
            sorted.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
            return sorted;
        }

        if (activeSort === "unread") {
            sorted.sort((a, b) => {
                if (b.unread !== a.unread) {
                    return b.unread - a.unread;
                }

                return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
            });
            return sorted;
        }

        if (activeSort === "name") {
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            return sorted;
        }

        sorted.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        return sorted;
    }, [filteredConversations, activeSort]);

    const totalPages = Math.max(1, Math.ceil(sortedConversations.length / PAGE_SIZE));
    const currentPage = Number.isFinite(requestedPage) && requestedPage > 0 ? Math.min(requestedPage, totalPages) : 1;

    const pagedConversations = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        return sortedConversations.slice(start, start + PAGE_SIZE);
    }, [sortedConversations, currentPage]);

    return (
        <DashboardShell>
            <div className={styles.page}>
                <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
                    <NavLink to="/carereceiver">Dashboard</NavLink>
                    <span>›</span>
                    <strong>Messages</strong>
                </nav>

                <header className={styles.header}>
                    <h1>Messages</h1>
                    <p>View and manage your conversations with caregivers.</p>
                </header>

                <section className={styles.tabsSection} aria-label="Message categories">
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

                <section className={styles.controls}>
                    <p className={styles.countLabel}>{filteredConversations.length} conversations</p>
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

                <section className={styles.list} aria-label="Conversation list">
                    {pagedConversations.map((thread) => (
                        <article key={thread.id} className={`${styles.row} ${thread.unread > 0 ? styles.rowUnread : ""}`.trim()}>
                            <div className={styles.avatar} aria-hidden="true">{thread.name.charAt(0)}</div>

                            <div className={styles.threadMain}>
                                <p className={styles.threadName}>{thread.name}</p>
                                <p className={styles.threadMeta}>{thread.meta}</p>
                                <p className={styles.threadPreview}>{thread.preview}</p>
                            </div>

                            <div className={styles.threadRight}>
                                <p className={styles.when}>{thread.when}</p>
                                <div className={styles.rightActions}>
                                    {thread.unread > 0 ? <span className={styles.unreadBadge}>{thread.unread}</span> : null}
                                    <NavLink className={styles.openLink} to={`/carereceiver/messages/${thread.id}`}>Open</NavLink>
                                </div>
                            </div>
                        </article>
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
