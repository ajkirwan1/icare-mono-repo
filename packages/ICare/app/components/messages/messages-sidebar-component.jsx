import React, { useState, useEffect } from "react";

export default function MessagesSidebar({ threads }) {
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [visibleThreads, setVisibleThreads] = useState(threads || []);

    useEffect(() => {
        // fade animation when filters/search change
        setVisibleThreads([]);
        const timeout = setTimeout(() => {
            let filtered = threads || [];
            if (filter === "online") filtered = filtered.filter((t) => t.online);
            if (filter === "unread") filtered = filtered.filter((t) => t.unreadCount > 0);
            if (search.trim()) {
                const query = search.toLowerCase();
                filtered = filtered.filter((t) => t.name.toLowerCase().includes(query));
            }
            setVisibleThreads(filtered);
        }, 150);
        return () => clearTimeout(timeout);
    }, [filter, search, threads]);

    const styles = {
        sidebar: {
            display: "flex",
            flexDirection: "column",
            background: "linear-gradient(180deg, #f8fbfa 0%, #edf4f1 100%)",
            borderRight: "1px solid #e0ece7",
            width: "100%",
            maxWidth: "400px",
            minHeight: "100vh",
            padding: "2.5rem 2rem",
            boxShadow: "6px 0 24px rgba(0,0,0,0.05)",
            backdropFilter: "blur(10px)",
            overflowY: "auto",
            transition: "all 0.3s ease",
            fontFamily: "Nunito, sans-serif",
        },
        header: {
            fontWeight: 800,
            fontSize: "1.6rem",
            color: "#375d4f",
            marginBottom: "2rem",
            letterSpacing: "0.3px",
        },
        filterSection: {
            display: "flex",
            flexDirection: "column",
            gap: "0.8rem",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            border: "1px solid #d8e7e1",
            borderRadius: "18px",
            padding: "1rem 1.2rem",
            marginBottom: "1.8rem",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
        },
        filterRow: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        filterLabel: {
            color: "#4c7865",
            fontWeight: 600,
            fontSize: "0.95rem",
        },
        select: {
            border: "none",
            background: "transparent",
            fontSize: "1rem",
            color: "#375d4f",
            fontWeight: 600,
            cursor: "pointer",
            outline: "none",
        },
        searchBox: {
            position: "relative",
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.9)",
            border: "1px solid #d8e7e1",
            borderRadius: "14px",
            padding: "0.4rem 0.9rem",
            boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
        },
        searchInput: {
            border: "none",
            outline: "none",
            width: "100%",
            fontSize: "1rem",
            background: "transparent",
            color: "#375d4f",
            paddingLeft: "1.8rem",
            fontFamily: "Nunito, sans-serif",
        },
        searchIcon: {
            position: "absolute",
            left: "8px",
            color: "#7a9289",
            fontSize: "1.1rem",
        },
        messageList: {
            flex: 1,
            overflowY: "auto",
            paddingRight: "0.5rem",
            borderRadius: "14px",
            scrollbarWidth: "thin",
            paddingBottom: "1rem",
        },
        threadCard: {
            position: "relative",
            background: "rgba(255, 255, 255, 0.75)",
            border: "1px solid #e0ece7",
            borderRadius: "22px",
            marginBottom: "1.2rem",
            padding: "1.2rem 1.3rem",
            cursor: "pointer",
            transition: "all 0.4s ease",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)",
            opacity: 0,
            transform: "translateY(10px)",
            animation: "fadeSlideUp 0.45s ease forwards",
        },
        threadHeader: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "0.6rem",
        },
        nameGroup: {
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
            position: "relative",
        },
        avatar: {
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            backgroundColor: "#7bb89f",
            color: "white",
            fontWeight: "700",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textTransform: "uppercase",
            flexShrink: 0,
            boxShadow: "0 0 0 3px #ffffff",
            position: "relative",
        },
        onlineDot: {
            position: "absolute",
            right: "2px",
            bottom: "2px",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "#4CAF50",
            border: "2px solid white",
            boxShadow: "0 0 3px rgba(76,175,80,0.6)",
        },
        name: {
            fontWeight: 700,
            color: "#375d4f",
            fontSize: "1.05rem",
            lineHeight: 1.2,
        },
        timestamp: {
            fontSize: "0.85rem",
            color: "#7a9289",
            fontWeight: 500,
        },
        lastMessage: {
            color: "#4c7865",
            fontSize: "1rem",
            lineHeight: 1.5,
            opacity: 0.95,
            marginTop: "0.4rem",
            letterSpacing: "0.2px",
        },
        unreadBadge: {
            position: "absolute",
            top: "10px",
            right: "16px",
            backgroundColor: "#7bb89f",
            color: "white",
            fontWeight: 700,
            fontSize: "0.8rem",
            borderRadius: "12px",
            padding: "0.2rem 0.6rem",
            boxShadow: "0 2px 6px rgba(123,184,159,0.3)",
        },
        emptyState: {
            color: "#7a9289",
            fontSize: "1rem",
            textAlign: "center",
            padding: "2rem 0",
            transition: "opacity 0.3s ease",
        },
    };

    return (
        <div style={styles.sidebar}>
            <style>
                {`
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
            </style>

            <h2 style={styles.header}>Messages</h2>

            {/* Filter & Search section */}
            <div style={styles.filterSection}>
                <div style={styles.filterRow}>
                    <span style={styles.filterLabel}>Filter:</span>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        style={styles.select}
                    >
                        <option value="all">All</option>
                        <option value="online">Online</option>
                        <option value="unread">Unread</option>
                    </select>
                </div>

                {/* Search input */}
                <div style={styles.searchBox}>
                    <span style={styles.searchIcon}>🔍</span>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={styles.searchInput}
                    />
                </div>
            </div>

            {/* Threads */}
            <div style={styles.messageList}>
                {visibleThreads && visibleThreads.length > 0 ? (
                    visibleThreads.map((thread, i) => (
                        <div
                            key={i}
                            style={{
                                ...styles.threadCard,
                                animationDelay: `${i * 0.06}s`,
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.transform = "translateY(-2px)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.transform = "translateY(0)")
                            }
                        >
                            <div style={styles.threadHeader}>
                                <div style={styles.nameGroup}>
                                    <div style={styles.avatar}>
                                        {thread.name?.charAt(0) || "?"}
                                        {thread.online && <div style={styles.onlineDot}></div>}
                                    </div>
                                    <div style={styles.name}>{thread.name}</div>
                                </div>
                                <div style={styles.timestamp}>{thread.timestamp}</div>
                            </div>
                            <div style={styles.lastMessage}>
                                {thread.lastMessage?.length > 60
                                    ? thread.lastMessage.slice(0, 60) + "..."
                                    : thread.lastMessage || "No messages yet."}
                            </div>
                            {thread.unreadCount > 0 && (
                                <div style={styles.unreadBadge}>{thread.unreadCount}</div>
                            )}
                        </div>
                    ))
                ) : (
                    <div style={styles.emptyState}>No messages found.</div>
                )}
            </div>
        </div>
    );
}
