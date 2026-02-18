import { useEffect, useRef, useState } from "react";

export default function AiChat() {
    const API_BASE = (import.meta.env.VITE_CHAT_API_URL || import.meta.env.VITE_API_URL || "http://localhost:4001").replace(/\/$/, "");
    const CHAT_URL = `${API_BASE}/api/chat`;
    const BRAND_GREEN = "rgb(119, 141, 67)";

    const quickActions = [
        { label: "View FAQs", href: "/frequently-asked-questions" },
        { label: "Join waiting list", href: "/#waitlist" },
        { label: "Contact form", href: "/contact-us#form-heading" },
    ];

    const starterQuestions = [
        "What is ICare and how does it work?",
        "How do I join the waiting list?",
        "How do I contact your team?",
        "Is ICare a care agency?",
    ];

    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content:
                "Hi! Welcome to ICare.\n\nI can help you understand how it works and guide you step by step.\n\nJust ask anything.",
        },
    ]);
    const [loading, setLoading] = useState(false);

    const listRef = useRef(null);
    const inputRef = useRef(null);
    const dialogRef = useRef(null);
    const launcherRef = useRef(null);

    useEffect(() => {
        if (!listRef.current) return;
        listRef.current.scrollTop = listRef.current.scrollHeight;
    }, [messages, loading]);

    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 0);
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e) => {
            if (e.key === "Escape") {
                setOpen(false);
                return;
            }
            if (e.key !== "Tab" || !dialogRef.current) return;
            const nodes = dialogRef.current.querySelectorAll(
                'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
            );
            if (!nodes.length) return;
            const first = nodes[0];
            const last = nodes[nodes.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [open]);

    useEffect(() => {
        if (!open) {
            launcherRef.current?.focus();
        }
    }, [open]);

    useEffect(() => {
        const syncMobile = () => setIsMobile(window.innerWidth <= 760);
        syncMobile();
        window.addEventListener("resize", syncMobile);
        return () => window.removeEventListener("resize", syncMobile);
    }, []);

    function localFallbackReply(raw) {
        const text = String(raw || "").toLowerCase();

        if (/(https?:\/\/|www\.|elder\.org|curam|homeinstead|bluebird care|right at home)/i.test(text)) {
            return "I can’t compare specific companies. I can explain general differences and what to look for in a safe care arrangement.";
        }

        if (/\b(price|pricing|cost|fees?|cheap|cheaper|compare)\b/i.test(text)) {
            return "ICare is currently in early access across the UK, so final pricing and fees are not published yet. Please join the waiting list and we’ll share updates at launch.";
        }

        if (/\b(waiting list|waitlist|join)\b/i.test(text)) {
            return "You can join here: /#waitlist. If you want, I can also direct you to our contact form.";
        }

        if (/\b(contact|phone|email|speak|team)\b/i.test(text)) {
            return "You can contact our team here: /contact-us. We’ll get back to you as soon as possible.";
        }

        if (/\b(what is icare|how does icare work|how it works)\b/i.test(text)) {
            return "ICare helps families connect with independent caregivers through clear profiles, direct communication, and a guided process.";
        }

        return "Thanks for your question. I can help with how ICare works, joining the waiting list, trust and safety, or contacting our team.";
    }

    async function send(prefilledText = "") {
        const text = (prefilledText || input).trim();
        if (!text || loading) return;

        // optimistic append user
        setMessages((m) => [...m, { role: "user", content: text }]);
        setInput("");
        setLoading(true);

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);

        try {
            const r = await fetch(CHAT_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // ✅ pass recent history (excluding the new user msg, which backend also gets via "message")
                body: JSON.stringify({ message: text, history: messages.slice(-10) }),
                signal: controller.signal,
            });

            const data = await r.json().catch(() => null);

            if (!r.ok) {
                setMessages((m) => [
                    ...m,
                    { role: "assistant", content: localFallbackReply(text) },
                ]);
                return;
            }

            const reply =
                typeof data?.reply === "string" && data.reply.trim()
                    ? data.reply.trim()
                    : "I can help with ICare. What would you like to know?";

            setMessages((m) => [...m, { role: "assistant", content: reply }]);
        } catch (err) {
            setMessages((m) => [
                ...m,
                {
                    role: "assistant",
                    content:
                        err?.name === "AbortError"
                            ? localFallbackReply(text)
                            : localFallbackReply(text),
                },
            ]);
        } finally {
            clearTimeout(timeout);
            setLoading(false);
        }
    }

    function onKeyDown(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    }

    return (
        <>
            <button
                ref={launcherRef}
                onClick={() => setOpen((v) => !v)}
                aria-label="Open ICare chat"
                aria-expanded={open}
                aria-controls="icare-chat-dialog"
                className="icare-chat-launcher"
                style={{
                    position: "fixed",
                    right: 20,
                    bottom: 20,
                    width: 64.4,
                    height: 64.4,
                    borderRadius: "50%",
                    background: BRAND_GREEN,
                    color: "#fff",
                    fontSize: 25.3,
                    border: "none",
                    cursor: "pointer",
                    zIndex: 1000,
                }}
            >
                💬
            </button>

            {open && (
                <div
                    ref={dialogRef}
                    id="icare-chat-dialog"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="icare-chat-title"
                    style={{
                        position: "fixed",
                        right: isMobile ? 12 : 24,
                        bottom: isMobile ? 92 : 96,
                        width: isMobile ? "min(360px, calc(100vw - 24px))" : 360,
                        height: isMobile ? "min(72vh, 520px)" : 520,
                        background: "#fff",
                        borderRadius: 26,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                        display: "flex",
                        flexDirection: "column",
                        zIndex: 1000,
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            padding: "14px 18px",
                            fontWeight: 500,
                            color: "#fff",
                            background: BRAND_GREEN,
                            fontSize: 16,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <span id="icare-chat-title">How can we help you today?</span>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            aria-label="Close chat"
                            style={{
                                border: "none",
                                background: "transparent",
                                color: "#fff",
                                fontSize: 20,
                                lineHeight: 1,
                                cursor: "pointer",
                                padding: 0,
                                marginLeft: 12,
                            }}
                        >
                            ×
                        </button>
                    </div>

                    <div
                        style={{
                            padding: "10px 12px",
                            borderBottom: "1px solid rgba(15,23,42,0.08)",
                            display: "flex",
                            gap: 8,
                            flexWrap: "wrap",
                            background: "#fff",
                        }}
                    >
                        {quickActions.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                style={{
                                    textDecoration: "none",
                                    background: "#F1F5F9",
                                    color: "#0F172A",
                                    borderRadius: 999,
                                    padding: "7px 11px",
                                    fontSize: 12,
                                    fontWeight: 500,
                                    lineHeight: 1.2,
                                }}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    <div
                        ref={listRef}
                        style={{
                            flex: 1,
                            padding: 16,
                            overflowY: "auto",
                            fontSize: 18,
                            lineHeight: 1.35,
                        }}
                    >
                        {messages.length === 1 && (
                            <div style={{ marginBottom: 14 }}>
                                <div
                                    style={{
                                        marginBottom: 8,
                                        color: "rgba(15,23,42,0.7)",
                                        fontSize: 13,
                                        fontWeight: 500,
                                    }}
                                >
                                    Popular questions
                                </div>
                                <div style={{ display: "grid", gap: 8 }}>
                                    {starterQuestions.map((q) => (
                                        <button
                                            key={q}
                                            type="button"
                                            onClick={() => send(q)}
                                            style={{
                                                textAlign: "left",
                                                border: "1px solid rgba(15,23,42,0.12)",
                                                borderRadius: 12,
                                                background: "#fff",
                                                color: "#0F172A",
                                                padding: "10px 12px",
                                                cursor: "pointer",
                                                fontSize: 14,
                                                lineHeight: 1.3,
                                            }}
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {messages.map((m, i) => (
                            <div
                                key={i}
                                style={{
                                    marginBottom: 12,
                                    textAlign: m.role === "user" ? "right" : "left",
                                }}
                            >
                                <span
                                    style={{
                                        display: "inline-block",
                                        padding: "12px 14px",
                                        borderRadius: 14,
                                        background: m.role === "user" ? "#0F172A" : "#F1F5F9",
                                        color: m.role === "user" ? "#fff" : "#0F172A",
                                        maxWidth: "88%",
                                        whiteSpace: "pre-wrap",
                                        overflowWrap: "anywhere",
                                    }}
                                >
                                    {m.content}
                                </span>
                            </div>
                        ))}
                        {loading && <div style={{ color: "rgba(15,23,42,0.6)" }}>…</div>}
                    </div>

                    <div
                        style={{
                            padding: 14,
                            borderTop: "1px solid rgba(15,23,42,0.08)",
                            display: "flex",
                            gap: 10,
                        }}
                    >
                        <input
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={onKeyDown}
                            placeholder="Write a message…"
                            style={{
                                flex: 1,
                                padding: "12px 12px",
                                fontSize: 18,
                                borderRadius: 10,
                                border: "2px solid #94A3B8",
                                outline: "none",
                            }}
                        />
                        <button
                            type="button"
                            onClick={send}
                            disabled={loading || !input.trim()}
                            aria-label="Send message"
                            style={{
                                width: 54,
                                height: 54,
                                borderRadius: 10,
                                border: "none",
                                background: BRAND_GREEN,
                                color: "#fff",
                                cursor: "pointer",
                                opacity: loading || !input.trim() ? 0.6 : 1,
                                display: "grid",
                                placeItems: "center",
                                fontSize: 20,
                            }}
                        >
                            ➤
                        </button>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes icareChatPulse {
                    0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(119, 141, 67, 0.18); }
                    50% { transform: scale(1.02); box-shadow: 0 0 0 8px rgba(119, 141, 67, 0.06); }
                }

                .icare-chat-launcher {
                    animation: icareChatPulse 2.8s ease-in-out infinite;
                }

                @media (prefers-reduced-motion: reduce) {
                    .icare-chat-launcher {
                        animation: none;
                    }
                }
            `}</style>
        </>
    );
}
