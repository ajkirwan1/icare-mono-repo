import { Link, useParams } from "react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import "../carereceiver/carereceiver-pages.css";
import { hasProtectionHit, sanitizeMessage } from "~/utils/contact-protection";
import styles from "./caregiver-message-thread.module.scss";

const DEFAULT_API_ROOT = "http://localhost:4001";
const MAX_MESSAGE_LENGTH = 1000;
const INTERNAL_API_PREFIX = "/rr-api";

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
  if (/^[a-z0-9_]+$/i.test(value)) {
    return fallback;
  }
  return value;
}

function parseErrorPayload(text) {
  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}

async function requestApi({ apiRoots, path, method = "GET", body, endpointName }) {
  let lastError = null;

  for (const root of apiRoots) {
    const normalizedRoot = root ? root.replace(/\/$/, "") : "";
    const url = normalizedRoot
      ? `${normalizedRoot}/api${path}`
      : `${INTERNAL_API_PREFIX}${path}`;

    try {
      const response = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: body ? JSON.stringify(body) : undefined
      });

      const contentType = response.headers.get("content-type") || "";
      const raw = await response.text();
      const payload = parseErrorPayload(raw);

      // If same-origin route is missing (common in local setups), continue to next API root.
      if (!response.ok && response.status === 404 && !normalizedRoot && contentType.includes("text/html")) {
        continue;
      }

      if (!response.ok) {
        const err = new Error(asFriendlyError(payload?.message || payload?.error, "Request failed."));
        err.details = {
          endpointName,
          status: response.status,
          url
        };
        throw err;
      }

      return payload;
    } catch (error) {
      if (import.meta.env.DEV) {
        const status = error?.details?.status || "network";
        console.error(`[thread] ${endpointName} failed (${status})`, {
          url,
          message: error?.message
        });
      }
      lastError = error;
    }
  }

  throw lastError || new Error("Request failed.");
}

function ErrorBanner({ onRetry }) {
  return (
    <div className={styles.errorBanner} role="alert" aria-live="polite">
      <h3>We couldn&apos;t load booking details</h3>
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

export default function CaregiverMessageThread() {
  const { conversationId } = useParams();
  const apiRoots = useMemo(() => {
    const envRoot = String(import.meta.env.VITE_API_URL || "").trim();
    return ["", envRoot, DEFAULT_API_ROOT].filter((value, index, array) => value !== "" ? array.indexOf(value) === index : index === 0);
  }, []);

  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState({
    id: conversationId,
    protectionMode: "contact-protection",
    contactProtectionEnabled: true,
    participantName: "Mary Thompson"
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
      const data = await requestApi({
        apiRoots,
        path: `/conversations/${conversationId}`,
        endpointName: "conversation"
      });

      setConversation((prev) => ({
        ...prev,
        id: data?.conversation?.id || conversationId,
        protectionMode: data?.conversation?.protectionMode || "contact-protection",
        contactProtectionEnabled: data?.conversation?.contactProtectionEnabled !== false,
        participantName: data?.conversation?.participantName || prev.participantName || "Care receiver"
      }));

      const hydrated = (data?.messages || []).map((message) => ({
        id: message.id,
        sender: message.senderRole === "caregiver" ? "own" : "other",
        text: sanitizeMessage(message.bodyPlain || "").sanitizedText,
        time: formatWhen(message.createdAt),
        createdAt: message.createdAt || null,
        masked: Boolean(message?.metadata?.contactProtection?.masked)
      }));

      setMessages(hydrated);
    } catch (error) {
      if (error?.details?.status === 404) {
        setLoadingError("not-available");
      } else {
        setLoadingError("load-failed");
      }
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

    const sanitized = sanitizeMessage(messageText);
    const hasMaskedContent = Object.values(sanitized.flags).some(Boolean);

    setSending(true);
    setSendError("");

    try {
      await requestApi({
        apiRoots,
        path: `/conversations/${conversationId}/messages`,
        method: "POST",
        endpointName: "conversation-message-create",
        body: {
          senderRole: "caregiver",
          bodyPlain: sanitized.sanitizedText,
          metadata: {
            source: "caregiver-thread",
            contactProtection: {
              masked: hasMaskedContent,
              flags: sanitized.flags
            }
          }
        }
      });

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
                <div className="cr-avatar">MT</div>
                <div>
                  <h2 style={{ margin: 0 }}>{conversation.participantName || "Care receiver"}</h2>
                  <p className="cr-muted" style={{ margin: 0 }}>Care receiver • Online</p>
                </div>
              </div>
              {conversation.contactProtectionEnabled ? <span className="cr-chip cr-chip--orange">🔒 Protection enabled</span> : null}
            </div>

            {loadingError === "load-failed" ? <ErrorBanner onRetry={loadThread} /> : null}
            {loadingError === "not-available" ? (
              <div className={styles.notAvailableState} role="status" aria-live="polite">
                <h3>Details are not available yet</h3>
                <p>This conversation context is not available right now. Please try again shortly.</p>
                <button type="button" className="cr-button cr-button--primary" onClick={loadThread}>
                  Retry
                </button>
              </div>
            ) : null}

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
                      <p className="cr-muted" style={{ margin: "6px 0 0", fontSize: "12px" }}>{message.time}</p>
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
                <span>🛡️ Always on</span>
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
