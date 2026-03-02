import { useEffect, useRef, useState } from "react";

export default function AiChat() {
    const rawChatBase = import.meta.env.VITE_CHAT_API_URL || import.meta.env.VITE_API_URL || "http://localhost:4001";
    const API_BASE = rawChatBase.replace(/\/$/, "");
    const CHAT_URL = API_BASE.endsWith("/api") ? `${API_BASE}/chat` : `${API_BASE}/api/chat`;
    const CONTACT_ACTION_URL = "/contact";
    const PRIVACY_POLICY_PATH = "/privacy";
    const PRIVACY_CONTACT_EMAIL = "hello@icare-app.co.uk";
    const POP_SOUND_SRC = "/sounds/pop-sound.mp3";
    const POP_SOUND_START_AT = 0;
    const POP_SOUND_GAIN = 1.25;
    const POP_SOUND_FALLBACK_VOLUME = 1;
    const CHAT_Z_INDEX = 12000;
    const BRAND_GREEN = "rgb(119, 141, 67)";
    const MOBILE_LAUNCHER_BOTTOM = "calc(26px + env(safe-area-inset-bottom, 0px))";
    const MOBILE_CHAT_TOP = "calc(var(--navbar-height, 92px) + 8px)";
    const MOBILE_CHAT_BOTTOM = "calc(8px + env(safe-area-inset-bottom, 0px))";

    const quickActions = [
        { label: "View FAQs", href: "/frequently-asked-questions", type: "link" },
        { label: "Join waiting list", href: "/#waitlist", type: "link" },
        { label: "Contact form", type: "handoff" },
    ];

    const starterQuestions = [
        "What is ICare and how does it work?",
        "How is ICare different from a care agency?",
        "Is ICare available across the UK?",
        "Can I withdraw or delete my data?",
    ];

    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [input, setInput] = useState("");
    const [showLauncher, setShowLauncher] = useState(false);
    const [showGreetingBubble, setShowGreetingBubble] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [popularOpen, setPopularOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [handoff, setHandoff] = useState(false);
    const [handoffSending, setHandoffSending] = useState(false);
    const [handoffError, setHandoffError] = useState("");
    const [handoffForm, setHandoffForm] = useState({
        name: "",
        email: "",
        phone: "",
        postcode: "",
        message: "",
        website: "",
    });
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
    const handoffNameRef = useRef(null);
    const wasOpenRef = useRef(false);
    const popAudioRef = useRef(null);
    const popAudioCtxRef = useRef(null);
    const popAudioBufferRef = useRef(null);
    const popLastPlayAtRef = useRef(0);

    function closeChat() {
        setExpanded(false);
        setPopularOpen(false);
        setOpen(false);
    }

    useEffect(() => {
        if (!listRef.current) return;
        listRef.current.scrollTop = listRef.current.scrollHeight;
    }, [messages, loading]);

    useEffect(() => {
        if (!open) return;
        setTimeout(() => {
            if (handoff) {
                handoffNameRef.current?.focus();
                return;
            }
            inputRef.current?.focus();
        }, 0);
    }, [open, handoff]);

    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e) => {
            if (e.key === "Escape") {
                closeChat();
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
        if (wasOpenRef.current && !open) {
            launcherRef.current?.focus();
        }
        wasOpenRef.current = open;
    }, [open]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLauncher(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGreetingBubble(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fallbackAudio = new Audio(POP_SOUND_SRC);
        fallbackAudio.preload = "auto";
        fallbackAudio.playsInline = true;
        fallbackAudio.volume = POP_SOUND_FALLBACK_VOLUME;
        fallbackAudio.load();
        popAudioRef.current = fallbackAudio;

        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        const controller = new AbortController();
        let cancelled = false;

        if (AudioContextClass) {
            const audioCtx = new AudioContextClass();
            popAudioCtxRef.current = audioCtx;

            fetch(POP_SOUND_SRC, { signal: controller.signal })
                .then((response) => response.arrayBuffer())
                .then((arrayBuffer) => audioCtx.decodeAudioData(arrayBuffer))
                .then((buffer) => {
                    if (!cancelled) {
                        popAudioBufferRef.current = buffer;
                    }
                })
                .catch(() => {});
        }

        return () => {
            cancelled = true;
            controller.abort();
            popAudioBufferRef.current = null;
            if (popAudioCtxRef.current) {
                popAudioCtxRef.current.close().catch(() => {});
                popAudioCtxRef.current = null;
            }
            if (popAudioRef.current) {
                popAudioRef.current.pause();
                popAudioRef.current = null;
            }
        };
    }, [POP_SOUND_FALLBACK_VOLUME, POP_SOUND_SRC]);

    useEffect(() => {
        const syncMobile = () => setIsMobile(window.innerWidth <= 760);
        syncMobile();
        window.addEventListener("resize", syncMobile);
        return () => window.removeEventListener("resize", syncMobile);
    }, []);

    useEffect(() => {
        const body = document.body;
        const html = document.documentElement;
        const syncMobileMenuState = () => {
            const menuOpen =
                body.classList.contains("icare-mobile-open") ||
                html.classList.contains("icare-mobile-open");
            setMobileMenuOpen(menuOpen);
        };

        syncMobileMenuState();

        const observer = new MutationObserver(syncMobileMenuState);
        observer.observe(body, { attributes: true, attributeFilter: ["class"] });
        observer.observe(html, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isMobile || !mobileMenuOpen) return;
        setExpanded(false);
        setPopularOpen(false);
        setOpen(false);
    }, [isMobile, mobileMenuOpen]);

    useEffect(() => {
        if (!open) return;
        const onPointerDown = (e) => {
            if (dialogRef.current?.contains(e.target)) return;
            if (launcherRef.current?.contains(e.target)) return;
            closeChat();
        };
        document.addEventListener("mousedown", onPointerDown);
        document.addEventListener("touchstart", onPointerDown);
        return () => {
            document.removeEventListener("mousedown", onPointerDown);
            document.removeEventListener("touchstart", onPointerDown);
        };
    }, [open]);

    function playPopSound() {
        const now = Date.now();
        if (now - popLastPlayAtRef.current < 180) return;

        const fallbackPlay = () => {
            const audio = popAudioRef.current;
            if (!audio) return;
            try {
                const hasDuration = Number.isFinite(audio.duration) && audio.duration > 0;
                const seekTo = hasDuration
                    ? Math.min(POP_SOUND_START_AT, Math.max(0, audio.duration - 0.05))
                    : POP_SOUND_START_AT;
                audio.currentTime = seekTo;
                const playPromise = audio.play();
                if (playPromise && typeof playPromise.catch === "function") {
                    playPromise
                        .then(() => {
                            popLastPlayAtRef.current = Date.now();
                        })
                        .catch(() => {});
                } else {
                    popLastPlayAtRef.current = Date.now();
                }
            } catch {}
        };

        const audioCtx = popAudioCtxRef.current;
        const audioBuffer = popAudioBufferRef.current;
        if (!audioCtx || !audioBuffer) {
            fallbackPlay();
            return;
        }

        const playFromBuffer = () => {
            try {
                const source = audioCtx.createBufferSource();
                source.buffer = audioBuffer;
                const gain = audioCtx.createGain();
                gain.gain.value = POP_SOUND_GAIN;
                source.connect(gain);
                gain.connect(audioCtx.destination);
                const offset = Math.min(POP_SOUND_START_AT, Math.max(0, audioBuffer.duration - 0.02));
                source.start(0, offset);
                popLastPlayAtRef.current = Date.now();
            } catch {
                fallbackPlay();
            }
        };

        if (audioCtx.state === "suspended") {
            audioCtx
                .resume()
                .then(playFromBuffer)
                .catch(() => fallbackPlay());
            return;
        }

        playFromBuffer();
    }

    function handleLauncherClick() {
        if (!open) {
            playPopSound();
        } else {
            closeChat();
            return;
        }
        setShowGreetingBubble(false);
        setOpen(true);
    }

    function toggleExpanded() {
        if (expanded) {
            setPopularOpen(false);
        }
        setExpanded((prev) => !prev);
    }

    function wantsHumanIntent(message = "") {
        const m = String(message).toLowerCase();
        return /\b(human|agent|representative|talk to someone|contact|email|call me|support|someone real|person)\b/.test(m);
    }

    function isValidEmail(email = "") {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
    }

    function localFallbackReply(raw) {
        const text = String(raw || "").toLowerCase();

        if (wantsHumanIntent(text)) {
            return (
                "Sure - I can pass this to our team. Please share your name, email or phone, and a short note about what you need."
            );
        }

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

        if (/\b(withdraw|delete|remove|erase)\b.*\b(data|account|information)\b|\bright to be forgotten\b|\bdata deletion\b/i.test(text)) {
            return (
                "Yes - you can ask us to access, correct, or delete your personal data.\n\n" +
                `Email ${PRIVACY_CONTACT_EMAIL} with subject \"Data request\" and we’ll process it under UK GDPR timeframes. ` +
                `Privacy policy: ${PRIVACY_POLICY_PATH}`
            );
        }

        if (/\b(what is icare|how does icare work|how it works)\b/i.test(text)) {
            return (
                "ICare is a UK platform that helps families connect with independent companion caregivers.\n\n" +
                "How it works:\n" +
                "• Create a request (needs, schedule, location)\n" +
                "• Browse verified companion profiles\n" +
                "• Message and arrange a quick call\n" +
                "• Agree hours, tasks, rate, and start date"
            );
        }

        return "Thanks for your question. I can help with how ICare works, joining the waiting list, trust and safety, or contacting our team.";
    }

    async function send(prefilledText = "") {
        const text = (prefilledText || input).trim();
        if (!text || loading) return;

        setMessages((m) => [...m, { role: "user", content: text }]);
        setInput("");
        setLoading(true);

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);

        try {
            const r = await fetch(CHAT_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
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
            if (data?.flags?.human_handoff) {
                setHandoff(true);
            }
        } catch (err) {
            if (wantsHumanIntent(text)) {
                setHandoff(true);
            }
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

    function updateHandoffField(field, value) {
        setHandoffForm((prev) => ({ ...prev, [field]: value }));
    }

    async function submitHandoff(e) {
        e.preventDefault();
        if (handoffSending) return;

        const payload = {
            name: handoffForm.name.trim(),
            email: handoffForm.email.trim(),
            phone: handoffForm.phone.trim(),
            postcode: handoffForm.postcode.trim(),
            message: handoffForm.message.trim(),
            website: handoffForm.website.trim(),
        };

        if (!payload.message) {
            setHandoffError("Please add a short message.");
            return;
        }
        if (payload.email && !isValidEmail(payload.email)) {
            setHandoffError("Please add a valid email address.");
            return;
        }
        if (!payload.email) {
            setHandoffError("Please add an email address.");
            return;
        }

        setHandoffError("");
        setHandoffSending(true);

        try {
            const subjectBits = ["Chat request"];
            if (payload.name) subjectBits.push(payload.name);
            if (payload.postcode) subjectBits.push(payload.postcode);

            const composedMessage =
                `Name: ${payload.name || "-"}\n` +
                `Phone: ${payload.phone || "-"}\n` +
                `Postcode: ${payload.postcode || "-"}\n\n` +
                `${payload.message}`;

            const formData = new FormData();
            formData.set("email", payload.email);
            formData.set("subject", subjectBits.join(" - "));
            formData.set("topic", "general");
            formData.set("message", composedMessage);
            formData.set("company", payload.website);
            formData.set("_delay", "0");

            const r = await fetch(CONTACT_ACTION_URL, {
                method: "POST",
                body: formData,
            });

            const data = await r.json().catch(() => null);
            if (!r.ok) {
                if (data?.errors?.email) setHandoffError(String(data.errors.email));
                else if (data?.errors?.message) setHandoffError(String(data.errors.message));
                else setHandoffError(data?.error || "Couldn’t send right now. Please try again.");
                return;
            }
            if (data?.ok === false) {
                setHandoffError(data?.error || "Couldn’t send right now. Please try again.");
                return;
            }

            setMessages((m) => [
                ...m,
                {
                    role: "assistant",
                    content: "Thanks - I’ve passed this to the team. We’ll get back to you by email or phone.",
                },
            ]);
            setHandoff(false);
            setHandoffForm({
                name: "",
                email: "",
                phone: "",
                postcode: "",
                message: "",
                website: "",
            });
        } catch {
            setHandoffError("Couldn’t send right now. Please try again.");
        } finally {
            setHandoffSending(false);
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
            <div
                className={`icare-chat-launcher-wrap ${showLauncher ? "icare-chat-launcher-wrap--visible" : ""}`}
                style={{
                    position: "fixed",
                    right: 20,
                    bottom: isMobile ? MOBILE_LAUNCHER_BOTTOM : 20,
                    zIndex: CHAT_Z_INDEX,
                    display: open || (isMobile && mobileMenuOpen) ? "none" : undefined,
                    transform: "translateZ(0)",
                    WebkitTransform: "translateZ(0)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                }}
            >
                <button
                    ref={launcherRef}
                    onClick={handleLauncherClick}
                    aria-label="Open ICare chat"
                    aria-expanded={open}
                    aria-controls="icare-chat-dialog"
                    className="icare-chat-bubble-launcher"
                >
                    {showGreetingBubble ? (
                        <>
                            HI it&apos;s Kate
                            <br />
                            Can I help you?
                        </>
                    ) : (
                        "Chat with ICare"
                    )}
                </button>
            </div>

            {open && expanded && (
                <div
                    aria-hidden="true"
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: CHAT_Z_INDEX - 1,
                        background: "rgba(245, 238, 223, 0.72)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        transform: "translateZ(0)",
                        WebkitTransform: "translateZ(0)",
                    }}
                />
            )}

            {open && (
                <div
                    ref={dialogRef}
                    id="icare-chat-dialog"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="icare-chat-title"
                    style={{
                        position: "fixed",
                        right: expanded ? "auto" : (isMobile ? 8 : 24),
                        bottom: expanded ? "auto" : (isMobile ? MOBILE_CHAT_BOTTOM : 96),
                        left: expanded ? "50%" : (isMobile ? 8 : "auto"),
                        top: expanded ? "50%" : (isMobile ? MOBILE_CHAT_TOP : "auto"),
                        width: expanded ? "min(800px, calc(100vw - 40px))" : (isMobile ? "auto" : 360),
                        height: expanded ? "min(86vh, 780px)" : (isMobile ? "auto" : 520),
                        background: "#fff",
                        borderRadius: expanded ? 28 : (isMobile ? 18 : 26),
                        boxShadow: expanded ? "0 26px 60px rgba(15,23,42,0.28)" : "0 20px 40px rgba(0,0,0,0.2)",
                        display: "flex",
                        flexDirection: "column",
                        zIndex: CHAT_Z_INDEX,
                        overflow: "hidden",
                        transform: expanded ? "translate(-50%, -50%)" : "translateZ(0)",
                        WebkitTransform: expanded ? "translate(-50%, -50%)" : "translateZ(0)",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
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
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <button
                                type="button"
                                onClick={toggleExpanded}
                                aria-label={expanded ? "Exit expanded chat" : "Expand chat"}
                                className="icare-chat-expand"
                            >
                                <span className={`icare-chat-expand-icon ${expanded ? "icare-chat-expand-icon--active" : ""}`} />
                            </button>
                            <button
                                type="button"
                                onClick={closeChat}
                                aria-label="Close chat"
                                className="icare-chat-close"
                            >
                                <span />
                                <span />
                            </button>
                        </div>
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
                            item.type === "handoff" ? (
                                <button
                                    key={item.label}
                                    type="button"
                                    onClick={() => {
                                        setHandoff(true);
                                        setPopularOpen(false);
                                        setHandoffError("");
                                        setTimeout(() => handoffNameRef.current?.focus(), 0);
                                    }}
                                    style={{
                                        textDecoration: "none",
                                        background: "#F1F5F9",
                                        color: "#0F172A",
                                        borderRadius: 999,
                                        padding: "7px 11px",
                                        fontSize: 12,
                                        fontWeight: 500,
                                        lineHeight: 1.2,
                                        border: "none",
                                        cursor: "pointer",
                                    }}
                                >
                                    {item.label}
                                </button>
                            ) : (
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
                            )
                        ))}
                    </div>

                    <div
                        ref={listRef}
                        style={{
                            flex: 1,
                            minHeight: 0,
                            display: isMobile && handoff ? "none" : "block",
                            padding: 16,
                            overflowY: "auto",
                            fontSize: 18,
                            lineHeight: 1.35,
                        }}
                    >
                        <div style={{ marginBottom: 14 }}>
                            <button
                                type="button"
                                onClick={() => setPopularOpen((v) => !v)}
                                style={{
                                    marginBottom: 8,
                                    border: "none",
                                    borderRadius: 999,
                                    background: "#221002",
                                    color: "#fff",
                                    fontSize: 13,
                                    fontWeight: 600,
                                    padding: "8px 12px",
                                    cursor: "pointer",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 8,
                                }}
                            >
                                See popular questions
                                <span style={{ fontSize: 14, lineHeight: 1 }}>{popularOpen ? "▴" : "▾"}</span>
                            </button>
                            {popularOpen && (
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
                            )}
                        </div>

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

                    {handoff ? (
                        <form
                            onSubmit={submitHandoff}
                            style={{
                                flex: isMobile ? 1 : undefined,
                                minHeight: 0,
                                overflowY: isMobile ? "auto" : "visible",
                                padding: isMobile ? "12px 12px calc(10px + env(safe-area-inset-bottom, 0px))" : 14,
                                borderTop: "1px solid rgba(15,23,42,0.08)",
                                display: "grid",
                                gap: 8,
                                background: "#fff",
                            }}
                        >
                            <div style={{ fontSize: 12, color: "rgba(15,23,42,0.7)", fontWeight: 600 }}>
                                Contact our team
                            </div>
                            <input
                                ref={handoffNameRef}
                                value={handoffForm.name}
                                onChange={(e) => updateHandoffField("name", e.target.value)}
                                placeholder="Name"
                                autoComplete="name"
                                style={{
                                    padding: "10px 11px",
                                    fontSize: 14,
                                    borderRadius: 10,
                                    border: "1px solid #94A3B8",
                                    outline: "none",
                                }}
                            />
                            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 8 }}>
                                <input
                                    value={handoffForm.email}
                                    onChange={(e) => updateHandoffField("email", e.target.value)}
                                    placeholder="Email (required)"
                                    autoComplete="email"
                                    style={{
                                        minWidth: 0,
                                        padding: "10px 11px",
                                        fontSize: 14,
                                        borderRadius: 10,
                                        border: "1px solid #94A3B8",
                                        outline: "none",
                                    }}
                                />
                                <input
                                    value={handoffForm.phone}
                                    onChange={(e) => updateHandoffField("phone", e.target.value)}
                                    placeholder="Phone"
                                    autoComplete="tel"
                                    style={{
                                        minWidth: 0,
                                        padding: "10px 11px",
                                        fontSize: 14,
                                        borderRadius: 10,
                                        border: "1px solid #94A3B8",
                                        outline: "none",
                                    }}
                                />
                            </div>
                            <input
                                value={handoffForm.postcode}
                                onChange={(e) => updateHandoffField("postcode", e.target.value)}
                                placeholder="Postcode (optional)"
                                autoComplete="postal-code"
                                style={{
                                    padding: "10px 11px",
                                    fontSize: 14,
                                    borderRadius: 10,
                                    border: "1px solid #94A3B8",
                                    outline: "none",
                                }}
                            />
                            <textarea
                                value={handoffForm.message}
                                onChange={(e) => updateHandoffField("message", e.target.value)}
                                placeholder="How can we help?"
                                rows={3}
                                style={{
                                    resize: "vertical",
                                    minHeight: isMobile ? 60 : 72,
                                    padding: "10px 11px",
                                    fontSize: 14,
                                    borderRadius: 10,
                                    border: "1px solid #94A3B8",
                                    outline: "none",
                                }}
                            />
                            <input
                                tabIndex={-1}
                                aria-hidden="true"
                                value={handoffForm.website}
                                onChange={(e) => updateHandoffField("website", e.target.value)}
                                style={{ display: "none" }}
                            />
                            {handoffError ? (
                                <div style={{ fontSize: 12, color: "#b91c1c" }}>{handoffError}</div>
                            ) : null}
                            <div style={{ display: "flex", gap: 8 }}>
                                <button
                                    type="submit"
                                    disabled={handoffSending}
                                    style={{
                                        flex: 1,
                                        height: 42,
                                        borderRadius: 10,
                                        border: "none",
                                        background: BRAND_GREEN,
                                        color: "#fff",
                                        cursor: "pointer",
                                        opacity: handoffSending ? 0.7 : 1,
                                        fontWeight: 600,
                                    }}
                                >
                                    {handoffSending ? "Sending..." : "Send to team"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setHandoff(false);
                                        setHandoffError("");
                                    }}
                                    style={{
                                        height: 42,
                                        borderRadius: 10,
                                        border: "1px solid rgba(15,23,42,0.2)",
                                        background: "#fff",
                                        color: "#0F172A",
                                        cursor: "pointer",
                                        padding: "0 12px",
                                        fontWeight: 500,
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div
                            style={{
                                padding: 14,
                                borderTop: "1px solid rgba(15,23,42,0.08)",
                                display: "flex",
                                gap: 10,
                            }}
                        >
                            <textarea
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={onKeyDown}
                                placeholder="Write a message…"
                                rows={2}
                                style={{
                                    flex: 1,
                                    minHeight: expanded ? 78 : 64,
                                    resize: "none",
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
                                }}
                            >
                                <span className="icare-chat-send-icon" />
                            </button>
                        </div>
                    )}
                </div>
            )}

            <style>{`
                @keyframes icareLauncherIn {
                    from { opacity: 0; transform: translateX(14px) scale(0.98); }
                    to { opacity: 1; transform: translateX(0); }
                }

                .icare-chat-launcher-wrap {
                    opacity: 0;
                    transform: translateX(14px) scale(0.98);
                    pointer-events: none;
                    will-change: transform, opacity;
                    contain: layout paint;
                }

                .icare-chat-launcher-wrap--visible {
                    animation: icareLauncherIn 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
                    pointer-events: auto;
                }

                .icare-chat-bubble-launcher {
                    width: 99px;
                    height: 99px;
                    padding: 13px;
                    border-radius: 999px;
                    background: linear-gradient(150deg, rgba(119, 141, 67, 0.96) 0%, rgba(99, 119, 56, 0.93) 100%);
                    color: #fff;
                    font-size: 13px;
                    font-weight: 500;
                    line-height: 1.25;
                    border: none;
                    box-shadow: none;
                    filter: none;
                    white-space: normal;
                    letter-spacing: 0.01em;
                    animation: icareBubbleIn 260ms cubic-bezier(0.2, 0.9, 0.2, 1);
                    cursor: pointer;
                    text-align: center;
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                    appearance: none;
                    -webkit-appearance: none;
                }

                .icare-chat-bubble-launcher::after {
                    content: none;
                }

                @keyframes icareBubbleIn {
                    from { opacity: 0; transform: translateX(8px) translateY(3px); }
                    to { opacity: 1; transform: translateX(0) translateY(0); }
                }

                @media (max-width: 760px) {
                    .icare-chat-bubble-launcher {
                        width: 102px;
                        height: 102px;
                        padding: 13px;
                        font-size: 12px;
                    }
                }

                .icare-chat-close {
                    position: relative;
                    width: 40px;
                    height: 40px;
                    border: none;
                    background: transparent;
                    border-radius: 10px;
                    cursor: pointer;
                    margin-left: 2px;
                }

                .icare-chat-close:hover {
                    background: rgba(255, 255, 255, 0.12);
                }

                .icare-chat-close span {
                    position: absolute;
                    left: 7px;
                    right: 7px;
                    top: 50%;
                    height: 2px;
                    background: #fff;
                    border-radius: 999px;
                }

                .icare-chat-close span:first-child {
                    transform: translateY(-50%) rotate(45deg);
                }

                .icare-chat-close span:last-child {
                    transform: translateY(-50%) rotate(-45deg);
                }

                .icare-chat-send-icon {
                    width: 0;
                    height: 0;
                    border-top: 8px solid transparent;
                    border-bottom: 8px solid transparent;
                    border-left: 12px solid #fff;
                    transform: translateX(1px);
                }

                .icare-chat-expand {
                    width: 40px;
                    height: 40px;
                    border: none;
                    background: transparent;
                    border-radius: 10px;
                    cursor: pointer;
                }

                .icare-chat-expand:hover {
                    background: rgba(255, 255, 255, 0.12);
                }

                .icare-chat-expand-icon {
                    display: block;
                    width: 16px;
                    height: 16px;
                    margin: 0 auto;
                    position: relative;
                    transition: transform 180ms ease;
                }

                .icare-chat-expand-icon::before,
                .icare-chat-expand-icon::after {
                    content: "";
                    position: absolute;
                    inset: 0;
                    border: 2px solid transparent;
                    border-radius: 2px;
                }

                .icare-chat-expand-icon::before {
                    border-top-color: #fff;
                    border-left-color: #fff;
                }

                .icare-chat-expand-icon::after {
                    border-right-color: #fff;
                    border-bottom-color: #fff;
                }

                .icare-chat-expand-icon--active {
                    transform: none;
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
