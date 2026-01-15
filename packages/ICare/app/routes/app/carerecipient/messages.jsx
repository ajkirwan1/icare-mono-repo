import React, { useState, useEffect, useRef } from "react";
import { json } from "@remix-run/node";
import { useLoaderData, useFetcher, NavLink } from "react-router";
import { getCaregiverMessageThread } from "../../utils/db/get-caregiver-message-thread";
import { appendCaregiverMessage } from "../../utils/db/addCaregiverMessage";

export async function loader({ params }) {
    const { caregiverId } = params;
    const data = await getCaregiverMessageThread(caregiverId);
    return json(data);
}

export async function action({ request, params }) {
    const { caregiverId } = params;
    const formData = await request.formData();
    const text = formData.get("text");

    if (!text || !text.trim()) {
        return json({ error: "Message cannot be empty" }, { status: 400 });
    }

    try {
        const newMessage = await appendCaregiverMessage(caregiverId, text);
        return json({ newMessage });
    } catch (e) {
        const status = e?.status ?? 500;
        return json({ error: e?.message || "Failed to send message" }, { status });
    }
}

export default function MessagesPage() {
    const { caregiver, messages: initialMessages } = useLoaderData();
    const [messages, setMessages] = useState(initialMessages);
    const [newMessageText, setNewMessageText] = useState("");
    const [isSending, setIsSending] = useState(false);
    const fetcher = useFetcher();
    const endRef = useRef(null);

    // Auto-scroll to latest message
    useEffect(() => {
        if (endRef.current) {
            endRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Append new message when sent
    useEffect(() => {
        if (fetcher.data?.newMessage) {
            const msg = {
                ...fetcher.data.newMessage,
                createdAt: new Date().toISOString(),
                status: "delivered",
            };
            setMessages((prev) => [...prev, msg]);
        }
    }, [fetcher.data]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessageText.trim()) return;
        setIsSending(true);
        const formData = new FormData();
        formData.append("text", newMessageText);
        fetcher.submit(formData, { method: "post" });
        setNewMessageText("");
        setIsSending(false);
    };

    const formatTime = (ts) => {
        const d = new Date(ts || new Date());
        return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    };

    const formatDate = (ts) =>
        new Date(ts || new Date()).toLocaleDateString("en-GB", {
            weekday: "short",
            day: "numeric",
            month: "short",
        });

    // Group messages by date
    const grouped = messages.reduce((acc, msg) => {
        const day = formatDate(msg.createdAt);
        if (!acc[day]) acc[day] = [];
        acc[day].push(msg);
        return acc;
    }, {});

    const colors = {
        bg: "#f2f5f4",
        card: "#ffffff",
        userBubble: "#619482",
        caregiverBubble: "#cdddf0",
        text: "#222",
        timeLight: "rgba(255,255,255,0.9)",
        timeDark: "#555",
        read: "#619482",
        delivered: "#888",
        dayLabel: "#94a79d",
    };

    const styles = {
        wrapper: {
            backgroundColor: colors.bg,
            minHeight: "100vh",
            fontFamily: "Nunito, sans-serif",
            display: "flex",
            justifyContent: "center",
        },
        chat: {
            backgroundColor: colors.card,
            width: "96%",
            maxWidth: "1200px",
            borderRadius: "24px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden",
        },
        header: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 2rem",
            borderBottom: "1px solid #dce3e0",
            backgroundColor: "#f8fbfa",
            position: "sticky",
            top: 0,
            zIndex: 10,
        },
        backBtn: {
            textDecoration: "none",
            color: colors.userBubble,
            fontSize: "1.1rem",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
        },
        title: { fontSize: "1.5rem", color: colors.userBubble, fontWeight: 700 },
        messagesContainer: {
            flexGrow: 1,
            overflowY: "auto",
            padding: "1.5rem 2rem",
            display: "flex",
            flexDirection: "column",
        },
        daySeparator: {
            textAlign: "center",
            margin: "1.5rem 0 0.5rem",
            position: "relative",
            fontSize: "0.9rem",
            color: colors.dayLabel,
        },
        line: {
            position: "absolute",
            top: "50%",
            left: 0,
            width: "100%",
            height: "1px",
            backgroundColor: "#e0e0e0",
            zIndex: 0,
        },
        dayText: {
            position: "relative",
            backgroundColor: colors.card,
            padding: "0 0.6rem",
            zIndex: 1,
        },
        messageRow: (fromUser) => ({
            display: "flex",
            flexDirection: fromUser ? "row-reverse" : "row",
            alignItems: "flex-end",
            gap: "0.8rem",
            margin: "0.4rem 0",
            animation: "fadeIn 0.5s ease",
        }),
        avatar: {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            objectFit: "cover",
            backgroundColor: "#ccc",
        },
        bubble: (fromUser) => ({
            backgroundColor: fromUser ? colors.userBubble : colors.caregiverBubble,
            color: fromUser ? "#fff" : colors.text,
            padding: "1rem 1.3rem",
            borderRadius: fromUser
                ? "18px 18px 4px 18px"
                : "18px 18px 18px 4px",
            maxWidth: "65%",
            fontSize: "1.1rem",
            lineHeight: 1.6,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }),
        meta: (fromUser) => ({
            fontSize: "0.9rem",
            color: fromUser ? colors.timeLight : colors.timeDark,
            display: "flex",
            justifyContent: "space-between",
            marginTop: "0.3rem",
        }),
        status: (status) => ({
            color: status === "read" ? colors.read : colors.delivered,
            marginLeft: "8px",
        }),
        inputBar: {
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            padding: "1rem 2rem",
            borderTop: "1px solid #dce3e0",
            backgroundColor: "#f8fbfa",
        },
        input: {
            flexGrow: 1,
            padding: "0.9rem 1rem",
            borderRadius: "18px",
            border: "1px solid #cddbd7",
            fontSize: "1.05rem",
            outline: "none",
        },
        sendBtn: {
            backgroundColor: colors.userBubble,
            color: "#fff",
            border: "none",
            borderRadius: "20px",
            padding: "0.8rem 1.6rem",
            fontSize: "1rem",
            cursor: "pointer",
            fontWeight: 600,
            transition: "background 0.3s ease",
        },
        fade: `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `,
    };

    return (
        <main style={styles.wrapper}>
            <style>{styles.fade}</style>
            <div style={styles.chat}>
                <header style={styles.header}>
                    <NavLink to="/carerecipient" style={styles.backBtn}>
                        ← Back
                    </NavLink>
                    <h1 style={styles.title}>{caregiver.name}</h1>
                    <div style={{ width: "40px" }}></div>
                </header>

                <div style={styles.messagesContainer}>
                    {Object.entries(grouped).map(([day, msgs]) => (
                        <div key={day}>
                            <div style={styles.daySeparator}>
                                <div style={styles.line}></div>
                                <span style={styles.dayText}>{day}</span>
                            </div>
                            {msgs.map((msg, i) => (
                                <div key={i} style={styles.messageRow(msg.fromUser)}>
                                    <img
                                        src={
                                            msg.fromUser
                                                ? "/images/user-avatar.png"
                                                : caregiver.imgSrc || "/images/caregiver-avatar.png"
                                        }
                                        alt="avatar"
                                        style={styles.avatar}
                                    />
                                    <div>
                                        <div style={styles.bubble(msg.fromUser)}>{msg.text}</div>
                                        <div style={styles.meta(msg.fromUser)}>
                                            <span>{formatTime(msg.createdAt)}</span>
                                            {msg.fromUser && (
                                                <span style={styles.status(msg.status || "delivered")}>
                                                    {msg.status === "read" ? "✔✔ Read" : "✔ Delivered"}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                    <div ref={endRef}></div>
                </div>

                <form style={styles.inputBar} onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessageText}
                        onChange={(e) => setNewMessageText(e.target.value)}
                        style={styles.input}
                    />
                    <button type="submit" style={styles.sendBtn} disabled={isSending}>
                        Send
                    </button>
                </form>
            </div>
        </main>
    );
}
