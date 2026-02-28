import { Link, useParams } from "react-router";
import { useState } from "react";
import "./carereceiver-pages.css";

const initialMessages = [
    { id: 1, sender: "other", text: "Hi Sarah, I'm looking forward to meeting you on Wednesday!", time: "Today at 2:30 PM", author: "Mary Thompson" },
    { id: 2, sender: "own", text: "Thank you, Mary. Do you have any dietary restrictions I should know about?", time: "Today at 2:45 PM", read: true },
    { id: 3, sender: "other", text: "No dietary restrictions, thank you for asking!", time: "Today at 3:00 PM", author: "Mary Thompson" }
];

export default function CarereceiverMessageThread() {
    const { conversationId } = useParams();
    const [draft, setDraft] = useState("");
    const [messages, setMessages] = useState(initialMessages);

    function handleSend() {
        if (!draft.trim()) { return; }
        setMessages((prev) => [
            ...prev,
            { id: prev.length + 1, sender: "own", text: draft.trim(), time: "Now" }
        ]);
        setDraft("");
    }

    return (
        <div className="cr-page">
            <div className="cr-shell">
                <nav className="cr-breadcrumbs" aria-label="Breadcrumb navigation">
                    <Link to="/carereceiver/dashboard">Dashboard</Link><span>›</span>
                    <Link to="/carereceiver/messages">Messages</Link><span>›</span>
                    <strong>Mary Thompson</strong>
                </nav>

                <section className="cr-grid cr-grid--2-1">
                    <article className="cr-card">
                        <div className="cr-inline" style={{ alignItems: "center", marginBottom: "10px" }}>
                            <div className="cr-avatar">MT</div>
                            <div>
                                <h2 style={{ margin: 0 }}>Mary Thompson</h2>
                                <p className="cr-muted" style={{ margin: 0 }}>Caregiver • <span className="cr-online-dot" /> Online</p>
                                <div className="cr-inline" style={{ marginTop: "6px" }}>
                                    <span className="cr-chip cr-chip--green">Identity</span>
                                    <span className="cr-chip cr-chip--green">DBS</span>
                                </div>
                            </div>
                        </div>

                        <article className="cr-card cr-thread-context-card">
                            <p className="cr-thread-context-title">ABOUT THIS CONVERSATION</p>
                            <p className="cr-muted">Booking #BK-12345</p>
                            <p className="cr-muted">Wednesday, March 6 at 10:00 AM</p>
                            <span className="cr-chip cr-chip--green">Accepted</span>
                            <p style={{ margin: "10px 0 0" }}>
                                <Link className="cr-thread-context-link" to="/carereceiver/bookings/bk-2026-0142">View Booking Details →</Link>
                            </p>
                        </article>

                        <div className="cr-message-thread">
                            <p className="cr-thread-day">Today</p>
                            {messages.map((message) => (
                                <div key={message.id} className={`cr-bubble ${message.sender === "own" ? "cr-bubble--own" : "cr-bubble--other"}`}>
                                    <p style={{ margin: 0 }}>{message.text}</p>
                                    <p className="cr-muted" style={{ margin: "6px 0 0", fontSize: "12px" }}>
                                        {message.sender === "other" ? `${message.author} • ` : ""}
                                        {message.time}
                                        {message.sender === "own" && message.read ? "  ✓✓ Read" : ""}
                                    </p>
                                </div>
                            ))}
                            <p className="cr-muted" style={{ margin: "2px 0 0", fontSize: "12px" }}>Mary is typing...</p>
                        </div>

                        <section className="cr-alert" style={{ marginTop: "12px" }}>
                            <p>Don&apos;t share phone numbers or email addresses until the booking is accepted. Messages are monitored for your safety.</p>
                        </section>

                        <div className="cr-grid" style={{ marginTop: "14px" }}>
                            <textarea
                                className="cr-textarea"
                                maxLength={1000}
                                placeholder="Type your message..."
                                value={draft}
                                onChange={(event) => setDraft(event.target.value)}
                            />
                            <div className="cr-inline" style={{ justifyContent: "space-between" }}>
                                <span className="cr-muted">{draft.length}/1000</span>
                                <button type="button" className="cr-button cr-button--primary" onClick={handleSend}>Send Message</button>
                            </div>
                        </div>
                    </article>

                    <aside className="cr-grid">
                        <article className="cr-card">
                            <h3>Quick Actions</h3>
                            <div className="cr-grid">
                                <Link className="cr-button cr-button--secondary" to="/carereceiver/bookings/bk-2026-0142">View Booking</Link>
                                <button type="button" className="cr-button cr-button--orange-outline">Call caregiver</button>
                            </div>
                        </article>
                    </aside>
                </section>
            </div>
        </div>
    );
}
