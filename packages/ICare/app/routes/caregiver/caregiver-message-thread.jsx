import { Link, useParams } from "react-router";
import { useEffect, useMemo, useState } from "react";
import "../carereceiver/carereceiver-pages.css";
import { sanitizeMessage } from "~/utils/contact-protection";

const DEFAULT_API = "http://localhost:4001";
const PROTECTION_MESSAGE = "For everyone’s safety, phone numbers, email addresses, physical addresses and links are automatically hidden. Please keep the conversation within ICare.";

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

function toBlockMessage(blockedUntil) {
  if (!blockedUntil) {
    return `${PROTECTION_MESSAGE} Why? This helps protect both sides and keeps communication safe on ICare.`;
  }
  const until = new Date(blockedUntil);
  if (Number.isNaN(until.getTime())) {
    return `${PROTECTION_MESSAGE} Please try again later.`;
  }
  return `Sending is temporarily paused until ${until.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}. ${PROTECTION_MESSAGE}`;
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

export default function CaregiverMessageThread() {
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
  const [blockedUntil, setBlockedUntil] = useState(null);

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
        sender: message.senderRole === "caregiver" ? "own" : "other",
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

  async function registerModerationAttempt(flags) {
    const response = await fetch(`${apiBase}/api/conversations/${conversationId}/moderation-attempt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        senderRole: "caregiver",
        flags,
        metadata: { source: "caregiver-thread" }
      })
    });

    const data = await response.json();
    if (data?.blockedUntil) {
      setBlockedUntil(data.blockedUntil);
    }
    setError(toBlockMessage(data?.blockedUntil));
  }

  async function handleSend() {
    const messageText = draft.trim();
    if (!messageText || !conversationId) {
      return;
    }

    if (blockedUntil && new Date(blockedUntil).getTime() > Date.now()) {
      setError(toBlockMessage(blockedUntil));
      return;
    }

    const localCheck = sanitizeMessage(messageText);
    if (localCheck.blocked) {
      await registerModerationAttempt(localCheck.flags);
      return;
    }

    setSending(true);
    setError("");
    try {
      const response = await fetch(`${apiBase}/api/conversations/${conversationId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderRole: "caregiver",
          bodyPlain: messageText,
          metadata: { source: "caregiver-thread" }
        })
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 422 || response.status === 429) {
          if (data?.blockedUntil) {
            setBlockedUntil(data.blockedUntil);
          }
          throw new Error(toBlockMessage(data?.blockedUntil));
        }
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
          <span>Dashboard</span><span>›</span><Link to="/caregiver/messages">Messages</Link><span>›</span><strong>Conversation {conversationId}</strong>
        </nav>

        <section className="cr-grid cr-grid--2-1">
          <article className="cr-card">
            <div className="cr-inline" style={{ alignItems: "center", marginBottom: "10px", justifyContent: "space-between" }}>
              <div className="cr-inline" style={{ alignItems: "center" }}>
                <div className="cr-avatar">MT</div>
                <div>
                  <h2 style={{ margin: 0 }}>Mary Thompson</h2>
                  <p className="cr-muted" style={{ margin: 0 }}>Care receiver • Online</p>
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
                  <Link to="/caregiver/bookings/confirmed-1">View booking</Link>
                  <Link to="/caregiver/profile/preview">View profile</Link>
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
                placeholder="Type a message..."
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
              />
              <div className="cr-inline" style={{ justifyContent: "space-between" }}>
                <span className="cr-muted">{draft.length}/1000</span>
                <button type="button" className="cr-button cr-button--primary cr-send-button" onClick={handleSend} disabled={sending}>
                  {sending ? "Sending..." : "Send"}
                </button>
              </div>
            </div>
          </article>

          <aside className="cr-grid">
            <article className="cr-card">
              <h3>Contact details protection</h3>
              <label className="cr-inline" style={{ gap: "10px", opacity: 0.95 }}>
                <input type="checkbox" checked disabled />
                <span>(always on)</span>
              </label>
              <p className="cr-muted" style={{ marginTop: "8px" }}>
                Protection: Active
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
              <p className="cr-muted">Thursday, February 20 at 10:00 AM</p>
              <span className="cr-chip cr-chip--green">Confirmed</span>
              <p className="cr-muted" style={{ marginTop: "8px" }}>
                If you need to contact someone, please use official ICare channels.
              </p>
            </article>

            <article className="cr-card">
              <h3>Quick Actions</h3>
              <div className="cr-grid">
                <Link className="cr-button cr-button--secondary" to="/caregiver/bookings/confirmed-1">View booking</Link>
                <Link className="cr-button cr-button--orange-outline" to="/caregiver/profile/preview">View profile</Link>
              </div>
            </article>
          </aside>
        </section>
      </div>
    </div>
  );
}
