import React from "react";
import { json } from "@remix-run/node";
import { getAllMessages } from "../../../utils/db/get-all-messages";
import { useLoaderData, NavLink } from "react-router";
import { IcareAvatar } from "react-library";

export const handle = {
    breadcrumb: "Contacts Home",
};

// Loader runs on server (SSR)
export async function loader() {
    const data = await getAllMessages();
    return json(data);
}

export default function MessagesHomePage() {
    const { data } = useLoaderData();

    const styles = {
        page: {
            background: "linear-gradient(180deg, #f8fbfa 0%, #edf4f1 100%)",
            minHeight: "100vh",
            padding: "2.5rem 3rem",
            fontFamily: "Nunito, sans-serif",
            color: "#375d4f",
            display: "flex",
            flexDirection: "column",
        },
        title: {
            fontSize: "1.9rem",
            fontWeight: 800,
            marginBottom: "2rem",
            letterSpacing: "0.3px",
        },
        navList: {
            display: "flex",
            gap: "1.2rem",
            listStyle: "none",
            padding: 0,
            margin: "0 0 2rem 0",
            borderBottom: "1px solid #d8e7e1",
            paddingBottom: "1rem",
        },
        navLink: {
            textDecoration: "none",
            color: "#4c7865",
            fontWeight: 600,
            fontSize: "0.95rem",
            padding: "0.5rem 1rem",
            borderRadius: "10px",
            transition: "all 0.25s ease",
        },
        navLinkActive: {
            backgroundColor: "#e2f0eb",
            color: "#375d4f",
            boxShadow: "0 2px 6px rgba(123,184,159,0.2)",
        },
        grid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1.8rem",
            listStyle: "none",
            padding: 0,
            margin: 0,
        },
        card: {
            borderRadius: "24px",
            background: "rgba(255,255,255,0.75)",
            border: "1px solid #e0ece7",
            boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1.4rem 1.2rem",
            transition: "all 0.3s ease",
            cursor: "pointer",
            position: "relative",
            minHeight: "240px",
        },
        cardHover: {
            transform: "translateY(-5px)",
            background: "rgba(255,255,255,0.9)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            borderColor: "#cfe3dc",
        },
        avatarWrapper: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.8rem",
            width: "100%",
            textAlign: "center",
        },
        avatarContainer: {
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: "0 0 0 3px #ffffff, 0 4px 12px rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f8fbfa",
        },
        avatarImage: {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "50%",
        },
        name: {
            fontSize: "1.05rem",
            fontWeight: 700,
            color: "#375d4f",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            maxWidth: "150px",
        },
        unread: {
            fontSize: "0.9rem",
            color: "#4c7865",
            backgroundColor: "#e9f4f0",
            borderRadius: "14px",
            padding: "0.3rem 0.8rem",
            fontWeight: 600,
            marginTop: "0.6rem",
        },
        time: {
            fontSize: "0.8rem",
            color: "#7a9289",
            marginTop: "0.3rem",
        },
        badgeDot: {
            position: "absolute",
            top: "14px",
            right: "14px",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: "#4caf50",
            boxShadow: "0 0 6px rgba(76,175,80,0.5)",
        },
    };

    return (
        <div style={styles.page}>
            <h2 style={styles.title}>My contacts</h2>

            {/* Navigation */}
            <ul style={styles.navList}>
                <li>
                    <NavLink
                        to="/carerecipient/messages/all-contacts"
                        style={({ isActive }) =>
                            isActive
                                ? { ...styles.navLink, ...styles.navLinkActive }
                                : styles.navLink
                        }
                    >
                        All contacts
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/carerecipient/messages/diary"
                        style={({ isActive }) =>
                            isActive
                                ? { ...styles.navLink, ...styles.navLinkActive }
                                : styles.navLink
                        }
                    >
                        Diary
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="archived"
                        style={({ isActive }) =>
                            isActive
                                ? { ...styles.navLink, ...styles.navLinkActive }
                                : styles.navLink
                        }
                    >
                        Qualifications
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="settings"
                        style={({ isActive }) =>
                            isActive
                                ? { ...styles.navLink, ...styles.navLinkActive }
                                : styles.navLink
                        }
                    >
                        Bio
                    </NavLink>
                </li>
            </ul>

            {/* Contact cards grid */}
            <ul style={styles.grid}>
                {data.map((thread, i) => (
                    <li
                        key={thread.threadId || i}
                        style={styles.card}
                        onMouseEnter={(e) =>
                            Object.assign(e.currentTarget.style, styles.cardHover)
                        }
                        onMouseLeave={(e) =>
                            Object.assign(e.currentTarget.style, styles.card)
                        }
                    >
                        {thread.online && <div style={styles.badgeDot}></div>}

                        <div style={styles.avatarWrapper}>
                            <div style={styles.avatarContainer}>
                                <img
                                    src={`/${thread.imgSrc}`}
                                    alt={thread.caregiverName || "Caregiver"}
                                    style={styles.avatarImage}
                                />
                            </div>
                            <strong style={styles.name}>
                                {thread.caregiverName || "Unknown Caregiver"}
                            </strong>
                        </div>

                        <div style={{ textAlign: "center" }}>
                            <div style={styles.unread}>
                                Unread: {thread.unreadCount || 0}
                            </div>
                            <div style={styles.time}>
                                {new Date(thread.lastUpdated).toLocaleString()}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
