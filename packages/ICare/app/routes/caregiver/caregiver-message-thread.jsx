import { Link, useParams } from "react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import "../carereceiver/carereceiver-pages.css";
import { hasProtectionHit, sanitizeMessage } from "~/utils/contact-protection";
import {
    getCaregiverConversationMessages,
    sendCaregiverConversationMessage,
    threadTimeLabel
} from "./messages/caregiver-messages-api-client";
import styles from "./caregiver-message-thread.module.scss";

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

function ErrorBanner({ onRetry }) {
    return (
        <div className={styles.errorBanner} role="alert" aria-live="polite">
            <h3>We couldn&apos;t load this conversation</h3>
            <p>Please try again. If the issue continues, refresh the page.</p>
            <div className={styles.errorActions}>
                <button type="button" className="cr-button cr-button--primary" onClick={onRetry}>
                    Retry
                </button>
                <button
                    type="button"
                    className="cr-button cr-button--secondary"
                    onClick={() => window.location.reload()}
                >
                    Refresh page
                </button>
            </div>
        </div>
    );
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

export default function CaregiverMessageThread() {
    const { conversationId } = useParams();
    const [draft, setDraft] = useState("");
    const [messages, setMessages] = useState([]);
    const [conversation, setConversation] = useState({
        id: conversationId,
        protectionMode: "contact-protection",
        contactProtectionEnabled: true,
        participantName: "Care receiver",
        bookingLabel: "Booking conversation"
    });
    const [loadingError, setLoadingError] = useState("");
    const [sendError, setSendError] = useState("");
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [showProtectionHelp, setShowProtectionHelp] = useState(false);
    const endOfMessagesRef = useRef(null);

    const canSend = draft.trim().length > 0 && !sending;
    const draftHasRestrictedContent = hasProtectionHit(draft);

    async function loadThread() {
        if (!conversationId) {
            return;
        }

        setLoading(true);
        setLoadingError("");
        setSendError("");

        try {
            const payload = await getCaregiverConversationMessages(conversationId, { page: 1, limit: 200 });
            const threadConversation = payload?.conversation || null;
            const participantName = String(threadConversation?.otherParty?.name || "").trim() || "Care receiver";

            setConversation({
                id: threadConversation?.id || conversationId,
                protectionMode: "contact-protection",
                contactProtectionEnabled: true,
                participantName,
                bookingLabel: threadConversation?.bookingContext?.label || "Booking conversation"
            });

            const hydrated = (payload?.messages || []).map((message) => {
                const safeText = sanitizeMessage(message.text || "");
                const isMasked = Boolean(message?.metadata?.contactProtection?.masked) || Object.values(safeText.flags).some(Boolean);

                return {
                    id: String(message.id),
                    sender: message.senderRole === "caregiver" ? "own" : "other",
                    text: safeText.sanitizedText,
                    time: threadTimeLabel(message.sentAt),
                    createdAt: message.sentAt || null,
                    readAt: message.readAt || null,
                    masked: isMasked
                };
            });

            setMessages(hydrated);
        } catch (error) {
            const message = asFriendlyError(error?.message, "Could not load this conversation.");
            setLoadingError(message);
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

    async function handleSend() {
        const messageText = draft.trim();
        if (!messageText || !conversationId) {
            return;
        }

        setSending(true);
        setSendError("");

        try {
            await sendCaregiverConversationMessage(conversationId, messageText);
            setDraft("");
            await loadThread();
        } catch (error) {
            setSendError(asFriendlyError(error?.message, "We couldn’t send your message. Please try again."));
        } finally {
            setSending(false);
        }
    }

    function handleComposerKeyDown(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            if (canSend) {
                handleSend();
            }
        }
    }

    function insertSuggestedMessage() {
        const firstName = String(conversation.participantName || "there").split(" ")[0] || "there";
        setDraft(
            `Hi ${firstName}, thanks for getting in touch. I’m happy to help — could you share a bit more about the support you’re looking for?`
        );
    }

    return (
        <div className="cr-page">
            <div className="cr-shell cr-shell--encapsulated">
                <nav className="cr-breadcrumbs">
                    <span>Dashboard</span><span>›</span><Link to="/caregiver/messages">Messages</Link><span>›</span><strong>Conversation {conversationId}</strong>
                </nav>

                <section className="cr-grid cr-grid--2-1">
                    <article className="cr-card">
                        <div className="cr-inline" style={{ alignItems: "center", marginBottom: "10px", justifyContent: "space-between" }}>
                            <div className="cr-inline" style={{ alignItems: "center" }}>
                                <div className="cr-avatar">{conversation.participantName.charAt(0).toUpperCase()}</div>
                                <div>
                                    <h2 style={{ margin: 0 }}>{conversation.participantName || "Care receiver"}</h2>
                                    <p className="cr-muted" style={{ margin: 0 }}>Care receiver</p>
                                </div>
                            </div>
                            {conversation.contactProtectionEnabled ? <span className="cr-chip cr-chip--orange">Protection enabled</span> : null}
                        </div>

                        {loadingError ? <ErrorBanner onRetry={loadThread} /> : null}

                        <div className="cr-message-thread">
                            {loading ? <p className="cr-muted">Loading conversation...</p> : null}
                            {!loading && !loadingError && messages.length === 0 ? (
                                <div className={styles.emptyState}>
                                    <p>No messages yet. Send a quick hello to start.</p>
                                    <button type="button" className={styles.insertSuggestion} onClick={insertSuggestedMessage}>
                                        Insert suggested message
                                    </button>
                                </div>
                            ) : null}

                            <div className={styles.messageThread}>
                                {timelineItems.map((item) => {
                                    if (item.type === "separator") {
                                        return (
                                            <div key={item.id} className={styles.daySeparator}>
                                                <span>{item.label}</span>
                                            </div>
                                        );
                                    }

                                    const message = item.message;
                                    return (
                                        <div key={message.id} className={`cr-bubble ${message.sender === "own" ? "cr-bubble--own" : "cr-bubble--other"}`}>
                                            <p style={{ margin: 0 }}>{message.text}</p>
                                            {message.masked ? (
                                                <p className={styles.maskedHelper} aria-live="polite">
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
                        </div>

                        <div className="cr-grid" style={{ marginTop: "14px" }}>
                            <div className={styles.composerWrap}>
                                <textarea
                                    className="cr-textarea"
                                    maxLength={MAX_MESSAGE_LENGTH}
                                    placeholder="Type a message..."
                                    value={draft}
                                    onChange={(event) => setDraft(event.target.value)}
                                    onKeyDown={handleComposerKeyDown}
                                    aria-label="Message composer"
                                />
                                <span className={styles.charCounter} aria-live="polite">{draft.length}/{MAX_MESSAGE_LENGTH}</span>
                            </div>

                            {draftHasRestrictedContent ? (
                                <p className={styles.composerHint} aria-live="polite">
                                    For safety, phone numbers, emails and links will be hidden.
                                </p>
                            ) : null}

                            {sendError ? (
                                <p className={styles.sendError} role="alert" aria-live="polite">
                                    {sendError}
                                </p>
                            ) : null}

                            <div className="cr-inline" style={{ justifyContent: "flex-end" }}>
                                <button
                                    type="button"
                                    className="cr-button cr-button--primary cr-send-button"
                                    onClick={handleSend}
                                    disabled={!canSend}
                                >
                                    {sending ? "Sending..." : "Send"}
                                </button>
                            </div>
                        </div>
                    </article>

                    <aside className="cr-grid">
                        <article className="cr-card">
                            <h3>Contact details protection</h3>
                            <p className="cr-inline" style={{ gap: "10px", opacity: 0.95, margin: 0 }}>
                                <span>Always on</span>
                            </p>
                            <p className="cr-muted" style={{ marginTop: "8px" }}>
                                Protection: <span className={styles.activeStatus}>Active</span>
                            </p>
                            <p className="cr-muted" style={{ marginTop: "4px" }}>
                                Phone numbers, emails and links are hidden.
                            </p>

                            <button
                                type="button"
                                className={styles.learnMoreButton}
                                onClick={() => setShowProtectionHelp((previous) => !previous)}
                                aria-expanded={showProtectionHelp}
                                aria-controls="protection-explainer"
                            >
                                {showProtectionHelp ? "Hide details" : "Learn more"}
                            </button>

                            {showProtectionHelp ? (
                                <p id="protection-explainer" className="cr-muted">
                                    To protect privacy and safety, phone numbers, email addresses, physical addresses and links are automatically hidden.
                                    This helps keep communication safe and in one place.
                                </p>
                            ) : null}
                        </article>

                        <article className="cr-card">
                            <h3>Booking Context</h3>
                            <p className="cr-muted">{conversation.bookingLabel}</p>
                            <span className="cr-chip cr-chip--green">Active conversation</span>
                            <p className="cr-muted" style={{ marginTop: "8px" }}>
                                Keep all communication in ICare for full safety tracking.
                            </p>
                        </article>

                        <article className="cr-card">
                            <h3>Quick Actions</h3>
                            <div className="cr-grid">
                                <Link className="cr-button cr-button--secondary" to="/caregiver/bookings">View bookings</Link>
                                <Link className="cr-button cr-button--orange-outline" to="/caregiver/profile/preview">View profile</Link>
                            </div>
                        </article>
                    </aside>
                </section>
            </div>
        </div>
    );
}
