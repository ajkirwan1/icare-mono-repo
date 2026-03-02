import { Link, useParams } from "react-router";
import { useEffect, useMemo, useState } from "react";
import "./carereceiver-pages.css";
import { hasProtectionHit, sanitizeMessage } from "~/utils/contact-protection";

const DEFAULT_API = "http://localhost:4001";
const MAX_CONTACT_SHARE_ATTEMPTS = 3;
function formatWhen(value) {
  if (!value) {
    return "Now";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Now";
  }
  return date.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
}

function asFriendlyError(value, fallback) {
  if (typeof value !== "string" || !value.trim()) {
    return fallback;
  }
  if (/^[a-z0-9_]+$/.test(value)) {
    return fallback;
  }
  return value;
}

export default function CarereceiverMessageThread() {
  const { conversationId } = useParams();
  const apiBase = useMemo(() => import.meta.env.VITE_API_URL || DEFAULT_API, []);

  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState({
    id: conversationId,
    protectionMode: "contact-protection",
    contactProtectionEnabled: true
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [contactShareAttempts, setContactShareAttempts] = useState(0);
  const isWriteBlocked = contactShareAttempts >= MAX_CONTACT_SHARE_ATTEMPTS;

  async function loadThread() {
    if (!conversationId) {
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${apiBase}/api/conversations/${conversationId}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(asFriendlyError(data?.message || data?.error, "Could not load this conversation."));
      }

      setConversation({
        id: data?.conversation?.id || conversationId,
        protectionMode: data?.conversation?.protectionMode || "contact-protection",
        contactProtectionEnabled: data?.conversation?.contactProtectionEnabled !== false
      });

      const hydrated = (data?.messages || []).map((message) => ({
        id: message.id,
        sender: message.senderRole === "carereceiver" ? "own" : "other",
        text: sanitizeMessage(message.bodyPlain || "").sanitizedText,
        time: formatWhen(message.createdAt)
      }));

      setMessages(hydrated);
    } catch (fetchError) {
      setError(fetchError?.message || "Something went wrong while loading the conversation.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadThread();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId, apiBase]);

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
      const response = await fetch(`${apiBase}/api/conversations/${conversationId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderRole: "carereceiver",
          bodyPlain: messageText,
          metadata: { source: "carereceiver-thread" }
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(asFriendlyError(data?.message || data?.error, "Could not send the message."));
      }

      setDraft("");
      await loadThread();
    } catch (sendError) {
      setError(sendError?.message || "Could not send the message.");
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
                <div className="cr-avatar">MT</div>
                <div>
                  <h2 style={{ margin: 0 }}>Mary Thompson</h2>
                  <p className="cr-muted" style={{ margin: 0 }}>Caregiver • Online</p>
                </div>
              </div>
              {conversation.contactProtectionEnabled ? <span className="cr-chip cr-chip--orange">🔒 Protection enabled</span> : null}
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
                <div className="cr-inline" style={{ marginTop: "8px", gap: "10px" }}>
                  <Link to="/carereceiver/bookings/bk-2026-0142">View booking</Link>
                  <Link to="/carereceiver/search">View profile</Link>
                </div>
              </div>
            ) : null}

            <div className="cr-message-thread">
              {loading ? <p className="cr-muted">Loading conversation...</p> : null}
              {!loading && messages.length === 0 ? <p className="cr-muted">No messages in this conversation yet.</p> : null}
              {messages.map((message) => (
                <div key={message.id} className={`cr-bubble ${message.sender === "own" ? "cr-bubble--own" : "cr-bubble--other"}`}>
                  <p style={{ margin: 0 }}>{message.text}</p>
                  <p className="cr-muted" style={{ margin: "6px 0 0", fontSize: "12px" }}>{message.time}</p>
                </div>
              ))}
            </div>

            <div className="cr-grid" style={{ marginTop: "14px" }}>
              <textarea
                className="cr-textarea"
                maxLength={1000}
                placeholder={isWriteBlocked ? "Messaging is disabled after 3 attempts." : "Type your message..."}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                disabled={isWriteBlocked}
              />
              <div className="cr-inline" style={{ justifyContent: "space-between" }}>
                <span className="cr-muted">{draft.length}/1000</span>
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
                <span>🛡️ Always on</span>
              </p>
              <p className="cr-muted" style={{ marginTop: "8px" }}>
                Protection: <span className="cr-active-status">Active</span>
              </p>
              <p
                className="cr-muted"
                title="How this works: If a message includes contact details or links, they will be automatically hidden to protect both sides."
              >
                Why? To protect the privacy and safety of both sides, phone numbers, email addresses, physical addresses and links are automatically hidden. This helps keep the conversation safe and within ICare.
              </p>
            </article>

            <article className="cr-card">
              <h3>Booking Context</h3>
              <p className="cr-muted">Booking #BK-12345</p>
              <p className="cr-muted">Wednesday, March 6 at 10:00 AM</p>
              <span className="cr-chip cr-chip--green">Accepted</span>
              <p className="cr-muted" style={{ marginTop: "8px" }}>
                If you need to contact someone, please use official ICare channels.
              </p>
            </article>

            <article className="cr-card">
              <h3>Quick Actions</h3>
              <div className="cr-grid">
                <Link className="cr-button cr-button--secondary" to="/carereceiver/bookings/bk-2026-0142">View booking</Link>
                <button type="button" className="cr-button cr-button--orange-outline">Call caregiver</button>
              </div>
            </article>
          </aside>
        </section>
      </div>
    </div>
  );
}
