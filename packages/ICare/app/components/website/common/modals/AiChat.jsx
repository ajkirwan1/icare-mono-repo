import { useEffect, useRef, useState } from "react";

export default function AiChat() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content:
                "I’m ICare’s AI help assistant. I can help explain how ICare works and how to get started.",
        },
    ]);
    const [loading, setLoading] = useState(false);

    const listRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (!listRef.current) return;
        listRef.current.scrollTop = listRef.current.scrollHeight;
    }, [messages, loading]);

    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 0);
    }, [open]);

    async function send() {
        const text = input.trim();
        if (!text || loading) return;

        // optimistic append user
        setMessages((m) => [...m, { role: "user", content: text }]);
        setInput("");
        setLoading(true);

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);

        try {
            const r = await fetch("http://localhost:4001/api/chat", {
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
                    { role: "assistant", content: "Something went wrong. Please try again." },
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
                            ? "It’s taking longer than expected. Please try again."
                            : "Something went wrong. Please try again.",
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
                onClick={() => setOpen((v) => !v)}
                aria-label="Open ICare chat"
                style={{
                    position: "fixed",
                    right: 24,
                    bottom: 24,
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "rgb(119, 141, 67)",
                    color: "#fff",
                    fontSize: 22,
                    border: "none",
                    cursor: "pointer",
                    zIndex: 1000,
                }}
            >
                💬
            </button>

            {open && (
                <div
                    style={{
                        position: "fixed",
                        right: 24,
                        bottom: 96,
                        width: 360,
                        height: 520,
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
                            background: "rgb(119, 141, 67)",
                            fontSize: 20,
                        }}
                    >
                        How can we help you today?
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
                                border: "2px solid #2563EB",
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
                                background: "rgb(119, 141, 67)",
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
        </>
    );
}
