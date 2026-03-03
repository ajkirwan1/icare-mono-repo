import { Link, useParams } from "react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import "./carereceiver-pages.css";
import { hasProtectionHit, sanitizeMessage } from "~/utils/contact-protection";
import {
    getConversationMessages,
    sendConversationMessage,
    threadTimeLabel
} from "./messages/messages-api-client";

const MAX_CONTACT_SHARE_ATTEMPTS = 3;
const MAX_MESSAGE_LENGTH = 1000;

function asFriendlyError(value, fallback) {
    if (typeof value !== "string" || !value.trim()) {
        return fallback;
    }
    if (/^[a-z0-9_]+$/i.test(value)) {
        return fallback;
    }
    return value;
}

function messageStatusLabel(message) {
    if (message.sender !== "own") {
        return "";
    }

    if (message.readAt) {
        return "\u2713\u2713 Read";
    }

    return "\u2713 Sent";
}

function notifyMessagesStateChanged() {
    if (typeof window === "undefined") {
        return;
    }

    window.dispatchEvent(new CustomEvent("carereceiver:messages_state_changed"));
}

export default function CarereceiverMessageThread() {
    const { conversationId } = useParams();

    const [draft, setDraft] = useState("");
    const [messages, setMessages] = useState([]);
    const [conversation, setConversation] = useState({
        id: conversationId,
        protectionMode: "contact-protection",
        contactProtectionEnabled: true,
        participantName: "Caregiver",
        bookingLabel: "Booking conversation"
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [contactShareAttempts, setContactShareAttempts] = useState(0);
    const endOfMessagesRef = useRef(null);
    const isWriteBlocked = contactShareAttempts >= MAX_CONTACT_SHARE_ATTEMPTS;

    const timelineItems = useMemo(() => {
        const items = [];
        let previousLabel = "";

        for (const message of messages) {
            const timestamp = message.createdAt ? new Date(message.createdAt) : null;
            const label = timestamp && !Number.isNaN(timestamp.getTime())
                ? new Intl.DateTimeFormat("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                }).format(timestamp)
                : "Today";

            const todayLabel = new Intl.DateTimeFormat("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric"
            }).format(new Date());
            const dayLabel = label === todayLabel ? "Today" : label;

            if (dayLabel !== previousLabel) {
                items.push({ type: "separator", id: `sep-${message.id}-${dayLabel}`, label: dayLabel });
                previousLabel = dayLabel;
            }

            items.push({ type: "message", id: message.id, message });
        }

        return items;
    }, [messages]);

    async function loadThread() {
        if (!conversationId) {
            return;
        }

        setLoading(true);
        setError("");
        try {
            const payload = await getConversationMessages(conversationId, { page: 1, limit: 200 });
            const threadConversation = payload?.conversation || null;

            setConversation({
                id: threadConversation?.id || conversationId,
                protectionMode: "contact-protection",
                contactProtectionEnabled: true,
                participantName: String(threadConversation?.otherParty?.name || "Caregiver").trim() || "Caregiver",
                bookingLabel: threadConversation?.bookingContext?.label || "Booking conversation"
            });

            const hydrated = (payload?.messages || []).map((message) => {
                const safeText = sanitizeMessage(message.text || "");
                const isMasked = Boolean(message?.metadata?.contactProtection?.masked) || Object.values(safeText.flags).some(Boolean);

                return {
                    id: String(message.id),
                    sender: message.senderRole === "care_receiver" ? "own" : "other",
                    text: safeText.sanitizedText,
                    time: threadTimeLabel(message.sentAt),
                    createdAt: message.sentAt || null,
                    readAt: message.readAt || null,
                    masked: isMasked
                };
            });

            setMessages(hydrated);
            notifyMessagesStateChanged();
        } catch (fetchError) {
            setError(asFriendlyError(fetchError?.message, "Something went wrong while loading the conversation."));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadThread();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conversationId]);

    useEffect(() => {
        if (loading) {
            return;
        }
        endOfMessagesRef.current?.scrollIntoView({ block: "end", behavior: "auto" });
    }, [loading, messages.length]);

    async function handleSend() {
        const messageText = draft.trim();
        if (!messageText || !conversationId || isWriteBlocked) {
            return;
        }

        const isContactShareAttempt = hasProtectionHit(messageText);
        if (isContactShareAttempt) {
            const nextAttempts = contactShareAttempts + 1;
            setContactShareAttempts(nextAttempts);
            if (nextAttempts >= MAX_CONTACT_SHARE_ATTEMPTS) {
                setError("Messaging has been paused after repeated attempts to share contact details outside ICare.");
                return;
            }
        }

        setSending(true);
        setError("");
        try {
            await sendConversationMessage(conversationId, messageText);
            setDraft("");
            await loadThread();
        } catch (sendError) {
            setError(asFriendlyError(sendError?.message, "Could not send the message."));
        } finally {
            setSending(false);
        }
    }

    return (
        <div className="cr-page">
            <div className="cr-shell">
                <nav className="cr-breadcrumbs">
                    <span>Dashboard</span><span>›</span><Link to="/carereceiver/messages">Messages</Link><span>›</span><strong>Conversation {conversationId}</strong>
                </nav>

                <section className="cr-grid cr-grid--2-1">
                    <article className="cr-card">
                        <div className="cr-inline" style={{ alignItems: "center", marginBottom: "10px", justifyContent: "space-between" }}>
                            <div className="cr-inline" style={{ alignItems: "center" }}>
                                <div className="cr-avatar">{conversation.participantName.charAt(0).toUpperCase()}</div>
                                <div>
                                    <h2 style={{ margin: 0 }}>{conversation.participantName}</h2>
                                    <p className="cr-muted" style={{ margin: 0 }}>Caregiver</p>
                                </div>
                            </div>
                            {conversation.contactProtectionEnabled ? <span className="cr-chip cr-chip--orange">Protection enabled</span> : null}
                        </div>

                        {error ? (
                            <div className="cr-alert" style={{ marginBottom: "10px" }}>
                                <p>{error}</p>
                                <p
                                    className="cr-muted"
                                    style={{ marginBottom: 0 }}
                                    title="How this works: If a message includes contact details or links, they will be automatically hidden to protect both sides."
                                >
                                    Why?
                                </p>
                            </div>
                        ) : null}

                        <div className="cr-message-thread">
                            {loading ? <p className="cr-muted">Loading conversation...</p> : null}
                            {!loading && messages.length === 0 ? <p className="cr-muted">No messages in this conversation yet.</p> : null}

                            {timelineItems.map((item) => {
                                if (item.type === "separator") {
                                    return (
                                        <p key={item.id} className="cr-thread-day">{item.label}</p>
                                    );
                                }

                                const message = item.message;
                                return (
                                    <div key={message.id} className={`cr-bubble ${message.sender === "own" ? "cr-bubble--own" : "cr-bubble--other"}`}>
                                        <p style={{ margin: 0 }}>{message.text}</p>
                                        {message.masked ? (
                                            <p className="cr-muted" style={{ margin: "6px 0 0", fontSize: "12px" }}>
                                                Contact details are hidden to keep you safe on ICare.
                                            </p>
                                        ) : null}
                                        <p className="cr-muted" style={{ margin: "6px 0 0", fontSize: "12px" }}>
                                            {message.time}{messageStatusLabel(message) ? ` \u2022 ${messageStatusLabel(message)}` : ""}
                                        </p>
                                    </div>
                                );
                            })}
                            <div ref={endOfMessagesRef} />
                        </div>

                        <div className="cr-grid" style={{ marginTop: "14px" }}>
                            <textarea
                                className="cr-textarea"
                                maxLength={MAX_MESSAGE_LENGTH}
                                placeholder={isWriteBlocked ? "Messaging is disabled after 3 attempts." : "Type your message..."}
                                value={draft}
                                onChange={(event) => setDraft(event.target.value)}
                                disabled={isWriteBlocked}
                            />
                            <div className="cr-inline" style={{ justifyContent: "space-between" }}>
                                <span className="cr-muted">{draft.length}/{MAX_MESSAGE_LENGTH}</span>
                                <button type="button" className="cr-button cr-button--primary cr-send-button" onClick={handleSend} disabled={sending || isWriteBlocked || !draft.trim()}>
                                    {sending ? "Sending..." : "Send"}
                                </button>
                            </div>
                            {isWriteBlocked ? <p className="cr-muted">Messaging is paused after repeated attempts to share contact details outside ICare.</p> : null}
                        </div>
                    </article>

                    <aside className="cr-grid">
                        <article className="cr-card">
                            <h3>Contact details protection</h3>
                            <p className="cr-inline" style={{ gap: "10px", opacity: 0.95, margin: 0 }}>
                                <span>Always on</span>
                            </p>
                            <p className="cr-muted" style={{ marginTop: "8px" }}>
                                Protection: <span className="cr-active-status">Active</span>
                            </p>
                            <p
                                className="cr-muted"
                                title="How this works: If a message includes contact details or links, they will be automatically hidden to protect both sides."
                            >
                                Phone numbers, emails, physical addresses and links are automatically hidden.
                            </p>
                        </article>

                        <article className="cr-card">
                            <h3>Booking Context</h3>
                            <p className="cr-muted">{conversation.bookingLabel}</p>
                            <span className="cr-chip cr-chip--green">Active conversation</span>
                            <p className="cr-muted" style={{ marginTop: "8px" }}>
                                Keep communication in ICare to maintain safety logs and read receipts.
                            </p>
                        </article>

                        <article className="cr-card">
                            <h3>Quick Actions</h3>
                            <div className="cr-grid">
                                <Link className="cr-button cr-button--secondary" to="/carereceiver/bookings">View bookings</Link>
                                <Link className="cr-button cr-button--orange-outline" to="/carereceiver/search">Find caregivers</Link>
                            </div>
                        </article>
                    </aside>
                </section>
            </div>
        </div>
    );
}
