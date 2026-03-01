import { Link, useParams } from "react-router";
import { useEffect, useMemo, useState } from "react";
import "./carereceiver-pages.css";
import { getConversationMessages, sendConversationMessage, threadTimeLabel } from "./messages/messages-api-client";

function toThreadMessage(rawMessage) {
    return {
        id: String(rawMessage?.id || ""),
        senderRole: String(rawMessage?.senderRole || "caregiver"),
        senderName: String(rawMessage?.senderName || "Caregiver"),
        text: String(rawMessage?.text || ""),
        sentAt: rawMessage?.sentAt || null,
        readAt: rawMessage?.readAt || null
    };
}

export default function CarereceiverMessageThread() {
    const { conversationId } = useParams();
    const [draft, setDraft] = useState("");
    const [sending, setSending] = useState(false);
    const [state, setState] = useState({
        loading: true,
        error: "",
        conversationId: "",
        bookingId: "",
        conversation: null,
        messages: []
    });

    useEffect(() => {
        const controller = new AbortController();
        let mounted = true;

        async function loadThread() {
            if (!conversationId) {
                return;
            }

            setState((prev) => ({ ...prev, loading: true, error: "" }));

            try {
                const payload = await getConversationMessages(conversationId, {
                    signal: controller.signal,
                    page: 1,
                    limit: 100
                });

                if (!mounted) {
                    return;
                }

                setState({
                    loading: false,
                    error: "",
                    conversationId: payload.conversationId || conversationId,
                    bookingId: payload.bookingId || payload.conversation?.bookingId || "",
                    conversation: payload.conversation,
                    messages: (payload.messages || []).map(toThreadMessage)
                });
            } catch {
                if (!mounted) {
                    return;
                }

                setState({
                    loading: false,
                    error: "Could not load conversation.",
                    conversationId: "",
                    bookingId: "",
                    conversation: null,
                    messages: []
                });
            }
        }

        loadThread();

        return () => {
            mounted = false;
            controller.abort();
        };
    }, [conversationId]);

    const participantName = useMemo(
        () => state.conversation?.otherParty?.name || "Caregiver",
        [state.conversation]
    );

    const bookingId = useMemo(() => {
        if (state.bookingId) {
            return state.bookingId;
        }
        if (String(conversationId || "").startsWith("bk-")) {
            return conversationId;
        }
        return "";
    }, [state.bookingId, conversationId]);

    const callPhone = String(state.conversation?.otherParty?.phone || "").trim();
    const activeConversationId = state.conversationId || conversationId;

    async function handleSend() {
        const cleanDraft = draft.trim();
        if (!cleanDraft || sending || !activeConversationId) {
            return;
        }

        setSending(true);

        try {
            const sent = await sendConversationMessage(activeConversationId, cleanDraft);
            const optimisticMessage = {
                id: String(sent?.messageId || `local-${Date.now()}`),
                senderRole: "care_receiver",
                senderName: "You",
                text: String(sent?.text || cleanDraft),
                sentAt: sent?.sentAt || new Date().toISOString(),
                readAt: null
            };

            setState((prev) => ({
                ...prev,
                error: "",
                conversationId: sent?.conversationId || prev.conversationId || activeConversationId,
                messages: [...prev.messages, optimisticMessage]
            }));
            setDraft("");
        } catch (error) {
            setState((prev) => ({
                ...prev,
                error: error instanceof Error ? error.message : "Could not send message."
            }));
        } finally {
            setSending(false);
        }
    }

    return (
        <div className="cr-page">
            <div className="cr-shell">
                <nav className="cr-breadcrumbs" aria-label="Breadcrumb navigation">
                    <Link to="/carereceiver/dashboard">Dashboard</Link><span>›</span>
                    <Link to="/carereceiver/messages">Messages</Link><span>›</span>
                    <strong>{participantName}</strong>
                </nav>

                <section className="cr-grid cr-grid--2-1">
                    <article className="cr-card">
                        <div className="cr-inline" style={{ alignItems: "center", marginBottom: "10px" }}>
                            <div className="cr-avatar">{participantName.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "CG"}</div>
                            <div>
                                <h2 style={{ margin: 0 }}>{participantName}</h2>
                                <p className="cr-muted" style={{ margin: 0 }}>Caregiver</p>
                                <div className="cr-inline" style={{ marginTop: "6px" }}>
                                    <span className="cr-chip cr-chip--green">Identity</span>
                                    <span className="cr-chip cr-chip--green">DBS</span>
                                </div>
                            </div>
                        </div>

                        <article className="cr-card cr-thread-context-card">
                            <p className="cr-thread-context-title">ABOUT THIS CONVERSATION</p>
                            <p className="cr-muted">{state.conversation?.bookingContext?.label || (bookingId ? `Booking #${String(bookingId).toUpperCase()}` : "General conversation")}</p>
                            {state.conversation?.bookingContext?.bookingDate ? (
                                <p className="cr-muted">{state.conversation.bookingContext.bookingDate} {state.conversation.bookingContext.bookingStartTime ? `at ${state.conversation.bookingContext.bookingStartTime}` : ""}</p>
                            ) : null}
                            {state.conversation?.bookingContext?.status ? <span className="cr-chip cr-chip--green">{state.conversation.bookingContext.status.replaceAll("_", " ")}</span> : null}
                            {bookingId ? (
                                <p style={{ margin: "10px 0 0" }}>
                                    <Link className="cr-thread-context-link" to={`/carereceiver/bookings/${bookingId}`}>View Booking Details →</Link>
                                </p>
                            ) : null}
                        </article>

                        {state.error ? <p className="cr-muted" style={{ marginBottom: "10px" }}>{state.error}</p> : null}

                        <div className="cr-message-thread">
                            {state.loading ? <p className="cr-thread-day">Loading messages...</p> : null}

                            {!state.loading && state.messages.length === 0 ? (
                                <p className="cr-thread-day">Start the conversation</p>
                            ) : null}

                            {!state.loading && state.messages.length > 0 ? <p className="cr-thread-day">Conversation</p> : null}
                            {state.messages.map((message) => {
                                const isOwn = message.senderRole !== "caregiver";

                                return (
                                    <div key={message.id} className={`cr-bubble ${isOwn ? "cr-bubble--own" : "cr-bubble--other"}`}>
                                        <p style={{ margin: 0 }}>{message.text}</p>
                                        <p className="cr-muted" style={{ margin: "6px 0 0", fontSize: "12px" }}>
                                            {!isOwn ? `${message.senderName} • ` : ""}
                                            {threadTimeLabel(message.sentAt)}
                                            {isOwn ? (message.readAt ? "  ✓✓ Read" : "  ✓ Sent") : ""}
                                        </p>
                                    </div>
                                );
                            })}
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
                                <button type="button" className="cr-button cr-button--primary" onClick={handleSend} disabled={sending || !activeConversationId}>
                                    {sending ? "Sending..." : "Send Message"}
                                </button>
                            </div>
                        </div>
                    </article>

                    <aside className="cr-grid">
                        <article className="cr-card">
                            <h3>Quick Actions</h3>
                            <div className="cr-grid">
                                {bookingId ? <Link className="cr-button cr-button--secondary" to={`/carereceiver/bookings/${bookingId}`}>View Booking</Link> : null}
                                {callPhone ? (
                                    <a href={`tel:${callPhone}`} className="cr-button cr-button--orange-outline">Call caregiver</a>
                                ) : (
                                    <button type="button" className="cr-button cr-button--orange-outline" disabled>Call caregiver</button>
                                )}
                            </div>
                        </article>
                    </aside>
                </section>
            </div>
        </div>
    );
}
