import { useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router";
import { DashboardShell } from "~/components/application/kasia";
import CustomSelect from "~/forms/inputs/CustomSelect";
import {
    getCaregiverConversations,
    relativeTimeLabel
} from "./messages/caregiver-messages-api-client";
import styles from "./caregiver-messages.module.scss";

const SAFETY_BANNER_STORAGE_KEY = "icare.caregiver.messages.safety-banner-dismissed.v1";

const fallbackConversations = [
    {
        id: "conv-1011",
        name: "Emma Wilson",
        avatar: "/images/avatars/female.webp",
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
        avatar: "/images/avatars/female.webp",
        meta: "Booking #1038 - Completed",
        preview: "Thank you for today. The walk really helped and I appreciate your support.",
        when: "Yesterday",
        unread: 1,
        kind: "booking",
        archived: false,
        updatedAt: "2026-02-19T18:00:00Z"
    }
];

function normalizeConversation(rawThread) {
    const id = String(rawThread?.id || "").trim();
    if (!id) {
        return null;
    }

    const name = String(rawThread?.otherParty?.name || "Care receiver").trim() || "Care receiver";
    const lastMessageText = String(rawThread?.lastMessage?.text || "").trim();
    const lastMessageSentAt = rawThread?.lastMessage?.sentAt || null;
    const updatedAt = lastMessageSentAt || rawThread?.updatedAt || rawThread?.createdAt || new Date().toISOString();
    const threadType = String(rawThread?.threadType || "").trim();
    const isInquiry = threadType === "inquiry" || !rawThread?.bookingId;
    const unread = Number(rawThread?.unreadCount || 0);

    if (!lastMessageText && !lastMessageSentAt && unread === 0) {
        return null;
    }

    return {
        id,
        name,
        avatar: "",
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

function getConversationStatus(thread) {
    const meta = String(thread.meta || "").toLowerCase();

    if (thread.unread > 0) {
        return { id: "needs-reply", label: "Needs reply" };
    }

    if (thread.kind === "booking" && meta.includes("completed")) {
        return { id: "completed", label: "Completed" };
    }

    if (thread.kind === "booking") {
        return { id: "booking-confirmed", label: "Booking" };
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
    const [state, setState] = useState({
        loading: true,
        error: "",
        conversations: fallbackConversations
    });

    const activeTab = searchParams.get("tab") ?? "all";
    const rawSort = searchParams.get("sort") ?? "recent";
    const currentSort = ["recent", "needs-reply", "name"].includes(rawSort) ? rawSort : "recent";
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

    useEffect(() => {
        const controller = new AbortController();
        let active = true;

        async function loadConversations() {
            try {
                const payload = await getCaregiverConversations({ signal: controller.signal, page: 1, limit: 200 });
                const normalized = (payload.conversations || []).map(normalizeConversation).filter(Boolean);

                if (!active) {
                    return;
                }

                setState({
                    loading: false,
                    error: "",
                    conversations: normalized.length > 0 ? normalized : []
                });
            } catch {
                if (!active) {
                    return;
                }

                setState({
                    loading: false,
                    error: "",
                    conversations: fallbackConversations
                });
            }
        }

        loadConversations();

        return () => {
            active = false;
            controller.abort();
        };
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
        const allCount = state.conversations.length;
        const unreadCount = state.conversations.filter((thread) => thread.unread > 0).length;
        const bookingCount = state.conversations.filter((thread) => thread.kind === "booking").length;
        const inquiryCount = state.conversations.filter((thread) => thread.kind === "inquiry").length;
        const archivedCount = state.conversations.filter((thread) => thread.archived).length;

        return [
            { id: "all", label: `All (${allCount})` },
            { id: "unread", label: `Needs reply (${unreadCount})` },
            { id: "booking", label: `Bookings (${bookingCount})` },
            { id: "inquiry", label: `New requests (${inquiryCount})` },
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

        if (currentSort === "needs-reply") {
            sorted.sort((left, right) => {
                if (right.unread !== left.unread) {
                    return right.unread - left.unread;
                }

                return sortableTimestamp(right.updatedAt) - sortableTimestamp(left.updatedAt);
            });
            return sorted;
        }

        if (currentSort === "name") {
            sorted.sort((left, right) => left.name.localeCompare(right.name));
            return sorted;
        }

        sorted.sort((left, right) => sortableTimestamp(right.updatedAt) - sortableTimestamp(left.updatedAt));
        return sorted;
    }, [currentSort, filteredConversations]);

    const totalPages = Math.max(1, Math.ceil(sortedConversations.length / 8));
    const safePage = Number.isFinite(currentPage) ? Math.max(1, Math.min(currentPage, totalPages)) : 1;
    const pagedConversations = useMemo(() => {
        const start = (safePage - 1) * 8;
        return sortedConversations.slice(start, start + 8);
    }, [safePage, sortedConversations]);

    return (
        <DashboardShell fullWidth>
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
                        <span id="messages-sort-label">Sort by</span>
                        <CustomSelect
                            id="messages-sort"
                            name="messages-sort"
                            labelId="messages-sort-label"
                            className={styles.sortSelect}
                            controlClassName={styles.sortSelectControl}
                            value={currentSort}
                            onChange={(nextValue) => setParam("sort", nextValue, { resetPage: true })}
                            options={[
                                { value: "recent", label: "Most recent" },
                                { value: "needs-reply", label: "Needs reply first" },
                                { value: "name", label: "Name (A-Z)" }
                            ]}
                        />
                    </label>
                </section>

                <section className={`${styles.list} ${mounted ? styles.listMounted : ""}`} aria-label="Conversation list">
                    {state.loading ? <p className={styles.countLabel}>Loading conversations...</p> : null}

                    {!state.loading && pagedConversations.length === 0 ? (
                        <div className={styles.emptyState}>
                            <p>{getEmptyStateCopy(activeTab)}</p>
                        </div>
                    ) : null}

                    {!state.loading ? pagedConversations.map((thread, index) => {
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
                    }) : null}
                </section>

                <nav className={styles.pagination} aria-label="Pagination">
                    <button
                        type="button"
                        className={styles.pageButton}
                        onClick={() => setParam("page", String(Math.max(1, safePage - 1)))}
                        disabled={safePage <= 1}
                    >
                        ← Prev
                    </button>

                    <span className={`${styles.pageNumber} ${styles.currentPage}`.trim()}>{safePage}</span>

                    <button
                        type="button"
                        className={styles.pageButton}
                        onClick={() => setParam("page", String(Math.min(totalPages, safePage + 1)))}
                        disabled={safePage >= totalPages}
                    >
                        Next →
                    </button>
                </nav>
            </div>
        </DashboardShell>
    );
}
