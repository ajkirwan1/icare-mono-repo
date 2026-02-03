import { useState } from "react";

export default function AiChat() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        { role: "assistant", content: "I’m ICare’s AI help assistant. I can help explain how the platform works, what to expect, and where to find information. I can’t replace human judgement or provide medical or legal advice." },
    ]);
    const [loading, setLoading] = useState(false);

    async function send() {
        if (!input.trim() || loading) return;

        const userMessage = { role: "user", content: input };
        setMessages((m) => [...m, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const r = await fetch("http://localhost:4001/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            const data = await r.json();

            setMessages((m) => [
                ...m,
                { role: "assistant", content: data.reply || "…" },
            ]);
        } catch (e) {
            setMessages((m) => [
                ...m,
                { role: "assistant", content: "Coś poszło nie tak 😕" },
            ]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {/* bubble */}
            <button
                onClick={() => setOpen((v) => !v)}
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

            {/* panel */}
            {open && (
                <div
                    style={{
                        position: "fixed",
                        right: 24,
                        bottom: 96,
                        width: 320,
                        height: 420,
                        background: "#fff",
                        borderTopRightRadius: "20",
                        borderTopLeftRadius: "20",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                        display: "flex",
                        flexDirection: "column",
                        zIndex: 1000,
                    }}
                >
                    {/* header */}
                    <div
                        style={{
                            padding: "12px 14px",
                            borderBottom: "1px solid #eee",
                            fontWeight: 600,
                            color: "white",
                            background: "rgb(119, 141, 67)"
                        }}
                    >
                        Customer Help
                    </div>

                    {/* messages */}
                    <div
                        style={{
                            flex: 1,
                            padding: 12,
                            overflowY: "auto",
                            fontSize: 14,
                        }}
                    >
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                style={{
                                    marginBottom: 10,
                                    textAlign: m.role === "user" ? "right" : "left",
                                }}
                            >
                                <span
                                    style={{
                                        display: "inline-block",
                                        padding: "8px 10px",
                                        borderRadius: 8,
                                        background:
                                            m.role === "user" ? "#0F172A" : "#F1F5F9",
                                        color: m.role === "user" ? "#fff" : "#0F172A",
                                        maxWidth: "85%",
                                    }}
                                >
                                    {m.content}
                                </span>
                            </div>
                        ))}
                        {loading && <div>…</div>}
                    </div>

                    {/* input */}
                    <div
                        style={{
                            padding: 10,
                            borderTop: "1px solid #eee",
                            display: "flex",
                            gap: 8,
                        }}
                    >
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && send()}
                            placeholder="Napisz wiadomość…"
                            style={{
                                flex: 1,
                                padding: 8,
                                fontSize: 14,
                                borderRadius: 6,
                                border: "1px solid #ccc",
                            }}
                        />
                        <button
                            onClick={send}
                            disabled={loading}
                            style={{
                                padding: "8px 10px",
                                borderRadius: 6,
                                border: "none",
                                background: "rgb(119, 141, 67)",
                                color: "#fff",
                                cursor: "pointer",
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
