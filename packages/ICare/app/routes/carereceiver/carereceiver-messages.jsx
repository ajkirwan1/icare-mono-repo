import { useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router";
import { DashboardShell } from "~/components/application/kasia";
import CustomSelect from "~/forms/inputs/CustomSelect";
import styles from "./carereceiver-messages.module.scss";
import { getConversations, relativeTimeLabel } from "./messages/messages-api-client";

const PAGE_SIZE = 6;

const sortOptions = [
    { id: "recent", label: "Most Recent" },
    { id: "oldest", label: "Oldest First" },
    { id: "unread", label: "Unread First" },
    { id: "name", label: "Name (A-Z)" }
];

const fallbackConversations = [
    {
        id: "conv-1011",
        name: "John Anderson",
        meta: "Booking #BK-2026-1203 - In progress",
        preview: "Will do. Looking forward to this afternoon session.",
        when: "2 hours ago",
        unread: 2,
        kind: "booking",
        archived: false,
        updatedAt: "2026-03-01T14:21:04Z"
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

function normalizeConversation(rawThread) {
    const id = String(rawThread?.id || "").trim();
    if (!id) {
        return null;
    }

    const name = String(rawThread?.otherParty?.name || rawThread?.name || "Caregiver").trim() || "Caregiver";
    const lastMessageText = String(rawThread?.lastMessage?.text || "").trim();
    const lastMessageSentAt = rawThread?.lastMessage?.sentAt || null;
    const updatedAt = lastMessageSentAt || rawThread?.updatedAt || rawThread?.createdAt || new Date().toISOString();
    const threadType = String(rawThread?.threadType || "").trim();
    const isInquiry = threadType === "inquiry" || !rawThread?.bookingId;
    const unread = Number(rawThread?.unreadCount || 0);

    // Hide not-yet-started conversation shells (no messages and no unread items).
    if (!lastMessageText && !lastMessageSentAt && unread === 0) {
        return null;
    }

    return {
        id,
        name,
        meta: rawThread?.bookingContext?.label || (isInquiry ? "Pre-booking inquiry" : `Booking #${String(rawThread?.bookingId || "").toUpperCase()}`),
        preview: lastMessageText || "No messages yet",
        when: relativeTimeLabel(updatedAt),
        unread,
        kind: isInquiry ? "inquiry" : "booking",
        archived: rawThread?.isActive === false || threadType === "archived",
        updatedAt
    };
}

function sortableTimestamp(value) {
    const time = new Date(value).getTime();
    return Number.isFinite(time) ? time : 0;
}

export default function CarereceiverMessages() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [state, setState] = useState({
        loading: true,
        error: "",
        conversations: fallbackConversations
    });

    useEffect(() => {
        const controller = new AbortController();
        let mounted = true;

        async function loadConversations() {
            try {
                const payload = await getConversations({ signal: controller.signal, page: 1, limit: 200 });
                const normalized = (payload.conversations || []).map(normalizeConversation).filter(Boolean);

                if (!mounted) {
                    return;
                }

                setState({
                    loading: false,
                    error: "",
                    conversations: normalized.length > 0 ? normalized : []
                });
            } catch {
                if (!mounted) {
                    return;
                }

                setState({
                    loading: false,
                    error: "Could not load conversations from API. Showing fallback data.",
                    conversations: fallbackConversations
                });
            }
        }

        loadConversations();

        return () => {
            mounted = false;
            controller.abort();
        };
    }, []);

    const rawTab = searchParams.get("tab") ?? "all";
    const activeTab = tabIds.includes(rawTab) ? rawTab : "all";

    const rawSort = searchParams.get("sort") ?? "recent";
    const activeSort = sortOptions.some((option) => option.id === rawSort) ? rawSort : "recent";

    const requestedPage = Number(searchParams.get("page") ?? "1");

    const tabs = useMemo(() => {
        const allCount = state.conversations.length;
        const unreadCount = state.conversations.filter((thread) => thread.unread > 0).length;
        const bookingCount = state.conversations.filter((thread) => thread.kind === "booking").length;
        const inquiryCount = state.conversations.filter((thread) => thread.kind === "inquiry").length;
        const archivedCount = state.conversations.filter((thread) => thread.archived).length;

        return [
            { id: "all", label: `All (${allCount})` },
            { id: "unread", label: `Unread (${unreadCount})` },
            { id: "booking", label: `Booking-linked (${bookingCount})` },
            { id: "inquiry", label: `Inquiries (${inquiryCount})` },
            { id: "archived", label: `Archived (${archivedCount})` }
        ];
    }, [state.conversations]);

    const filteredConversations = useMemo(() => {
        if (activeTab === "unread") {
            return state.conversations.filter((thread) => thread.unread > 0);
        }

        if (activeTab === "booking") {
            return state.conversations.filter((thread) => thread.kind === "booking");
        }

        if (activeTab === "inquiry") {
            return state.conversations.filter((thread) => thread.kind === "inquiry");
        }

        if (activeTab === "archived") {
            return state.conversations.filter((thread) => thread.archived);
        }

        return state.conversations;
    }, [activeTab, state.conversations]);

    const sortedConversations = useMemo(() => {
        const sorted = [...filteredConversations];

        if (activeSort === "oldest") {
            sorted.sort((a, b) => sortableTimestamp(a.updatedAt) - sortableTimestamp(b.updatedAt));
            return sorted;
        }

        if (activeSort === "unread") {
            sorted.sort((a, b) => {
                if (b.unread !== a.unread) {
                    return b.unread - a.unread;
                }

                return sortableTimestamp(b.updatedAt) - sortableTimestamp(a.updatedAt);
            });
            return sorted;
        }

        if (activeSort === "name") {
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            return sorted;
        }

        sorted.sort((a, b) => sortableTimestamp(b.updatedAt) - sortableTimestamp(a.updatedAt));
        return sorted;
    }, [filteredConversations, activeSort]);

    const totalPages = Math.max(1, Math.ceil(sortedConversations.length / PAGE_SIZE));
    const currentPage = Number.isFinite(requestedPage) && requestedPage > 0 ? Math.min(requestedPage, totalPages) : 1;

    const pagedConversations = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        return sortedConversations.slice(start, start + PAGE_SIZE);
    }, [sortedConversations, currentPage]);

    return (
        <DashboardShell fullWidth>
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
                        <span id="carereceiver-messages-sort-label" className={styles.sortLabel}>Sort by</span>
                        <CustomSelect
                            id="carereceiver-messages-sort"
                            name="carereceiver-messages-sort"
                            labelId="carereceiver-messages-sort-label"
                            className={styles.sortSelect}
                            controlClassName={styles.sortSelectControl}
                            value={activeSort}
                            onChange={(nextValue) => {
                                setSearchParams((prev) => {
                                    const next = new URLSearchParams(prev);
                                    next.set("sort", nextValue);
                                    next.set("page", "1");
                                    return next;
                                });
                            }}
                            options={sortOptions.map((option) => ({ value: option.id, label: option.label }))}
                        />
                    </label>
                </section>

                {state.error ? <p className={styles.countLabel}>{state.error}</p> : null}

                <section className={styles.list} aria-label="Conversation list">
                    {state.loading ? <p className={styles.countLabel}>Loading conversations...</p> : null}

                    {!state.loading && pagedConversations.length === 0 ? (
                        <article className={styles.row}>
                            <div className={styles.threadMain}>
                                <p className={styles.threadName}>No conversations yet</p>
                                <p className={styles.threadMeta}>Once a caregiver conversation starts, it will appear here.</p>
                            </div>
                        </article>
                    ) : null}

                    {!state.loading ? pagedConversations.map((thread) => (
                        <article
                            key={thread.id}
                            className={`${styles.row} ${thread.unread > 0 ? styles.rowUnread : ""}`.trim()}
                            role="button"
                            tabIndex={0}
                            onClick={() => navigate(`/carereceiver/messages/${thread.id}`)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault();
                                    navigate(`/carereceiver/messages/${thread.id}`);
                                }
                            }}
                        >
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
                    )) : null}
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
