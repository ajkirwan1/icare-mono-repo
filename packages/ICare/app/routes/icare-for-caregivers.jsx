import React, { useEffect, useRef } from "react";
import { Link } from "react-router";
import heroImage from "/images/heros/icare-for-caregivers.jpg";

export default function ICareForCaregivers() {
    const BRAND = "#1FAB1F";
    const NEUTRAL = "#0F172A";
    const BORDER = "#E5E7EB";
    const SUBTLE = "#F7FAF8"; // delikatny papier z nutą brandu

    const pageWrap = {
        fontFamily:
            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: NEUTRAL,
        background: "linear-gradient(180deg, #FAFCFD 0%, #FFFFFF 70%)",
    };

    const container = {
        width: "min(1100px, 92vw)",
        margin: "0 auto",
        padding: "0 clamp(16px,4vw,32px)",
    };

    const sectionTitle = {
        margin: 0,
        fontWeight: 900,
        color: "#1f2a37",
        fontSize: "clamp(1.35rem,2.6vw,1.9rem)",
        letterSpacing: ".2px",
        lineHeight: 1.25,
        textAlign: "left",
    };

    // Scroll-reveal refs
    const stepRefs = useRef([]);
    useEffect(() => {
        const els = stepRefs.current.filter(Boolean);
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("reveal--in");
                        io.unobserve(e.target);
                    }
                });
            },
            { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    const steps = [
        {
            t: "Simple and free registration",
            d: "Create your account safely with base information only.",
        },
        {
            t: "Contact clients directly",
            d: "Message families to understand needs and expectations before you agree.",
        },
        {
            t: "Increase your earnings",
            d: "Agree terms directly — keep more of your hard-earned income.",
        },
        {
            t: "Tailor your profile",
            d: "Upload CV/resume, add checks and specialist skills to boost visibility.",
        },
        {
            t: "Manage your own employment contracts",
            d: "Set schedule & rate, e-sign your agreement and keep everything in one place.",
        },
    ];

    return (
        <div style={pageWrap}>
            {/* === HERO === */}
            <section
                aria-label="ICare for Caregivers hero"
                style={{
                    position: "relative",
                    minHeight: "clamp(560px, 76vh, 900px)",
                    width: "100%",
                    overflow: "hidden",
                    display: "grid",
                    placeItems: "center",
                    color: "#fff",
                    background:
                        "radial-gradient(80rem 40rem at 10% 10%, rgba(51,174,186,.06), transparent 60%), radial-gradient(80rem 40rem at 90% 90%, rgba(17,119,128,.06), transparent 60%), linear-gradient(160deg, #0b1220 0%, #0f172a 65%, #0b1220 100%)",
                }}
            >
                {/* tło zdjęciowe */}
                <img
                    src={heroImage}
                    alt="Care coordination background"
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        filter: "brightness(.7) contrast(1.06) saturate(.98)",
                        zIndex: 0,
                    }}
                />

                {/* overlay */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "radial-gradient(75% 55% at 50% 45%, rgba(0,0,0,.22) 0%, rgba(0,0,0,.38) 60%, rgba(0,0,0,.52) 100%)",
                        zIndex: 1,
                        pointerEvents: "none",
                    }}
                />

                {/* header */}
                <header
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem",
                        padding: "1rem clamp(16px,4vw,32px)",
                        background: "rgba(2,8,23,0.28)",
                        backdropFilter: "saturate(1.05) blur(4px)",
                        borderBottom: "1px solid rgba(255,255,255,0.14)",
                    }}
                >
                    <Link
                        to="/"
                        style={{
                            fontWeight: 900,
                            letterSpacing: "0.3px",
                            color: "#ffffff",
                            textDecoration: "none",
                            fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)",
                            textShadow: "0 1px 10px rgba(0,0,0,.4)",
                        }}
                    >
                        ICare
                    </Link>

                    <nav
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0.75rem 1.1rem",
                            alignItems: "center",
                        }}
                    >
                        {[
                            { to: "/", label: "Home" },
                            { to: "/how-it-works", label: "How it Works" },
                            { to: "/who-we-are", label: "Who We Are" },
                            { to: "/privacy", label: "Privacy" },
                            { to: "/icare-for-caregivers", label: "ICare For Caregivers" },
                            { to: "/icare-for-carereceivers", label: "ICare For Care Receivers" },
                        ].map((l) => (
                            <Link
                                key={l.to}
                                to={l.to}
                                style={{
                                    color: "rgba(255,255,255,.95)",
                                    textDecoration: "none",
                                    fontSize: "clamp(.9rem, 1.2vw, 1rem)",
                                    padding: ".45rem .7rem",
                                    borderRadius: 999,
                                    border: "1px solid rgba(255,255,255,.20)",
                                    background: "rgba(255,255,255,.06)",
                                    transition:
                                        "transform .15s ease, background .15s ease, border-color .15s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                    e.currentTarget.style.background = "rgba(255,255,255,.12)";
                                    e.currentTarget.style.borderColor = "rgba(255,255,255,.32)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.background = "rgba(255,255,255,.06)";
                                    e.currentTarget.style.borderColor = "rgba(255,255,255,.20)";
                                }}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>
                </header>

                {/* HERO content – lewostronnie jak na innych stronach */}
                <div
                    style={{
                        position: "relative",
                        zIndex: 2,
                        width: "min(1100px, 92vw)",
                        marginInline: "auto",
                        padding: "clamp(2rem, 4vw, 4rem) 0",
                        textAlign: "left",
                    }}
                >
                    <div style={{ ...container, padding: 0 }}>
                        <span
                            style={{
                                display: "inline-block",
                                marginBottom: "1.2rem",
                                fontSize: "0.88rem",
                                fontWeight: 800,
                                letterSpacing: ".12em",
                                textTransform: "uppercase",
                                color: "#EAF7EA",
                                padding: ".48rem .9rem",
                                borderRadius: 999,
                                background: "rgba(31,171,31,0.20)",
                                border: "2px solid rgba(31,171,31,0.45)",
                                textShadow: "0 1px 2px rgba(0,0,0,.25)",
                            }}
                        >
                            Direct  Fair  Transparent
                        </span>

                        <h1
                            style={{
                                fontWeight: 800,
                                letterSpacing: ".2px",
                                lineHeight: 1.05,
                                fontSize: "clamp(2rem, 4.2vw, 3.2rem)",
                                margin: "0 0 .7rem 0",
                                color: "#ffffff",
                                textShadow: "0 2px 18px rgba(0,0,0,.45), 0 0 2px rgba(0,0,0,.35)",
                            }}
                        >
                            ICare for <span style={{ color: BRAND }}>Caregivers</span>
                        </h1>

                        <p
                            style={{
                                margin: 0,
                                fontSize: "clamp(1.02rem, 1.2vw, 1.12rem)",
                                lineHeight: 1.7,
                                color: "rgba(255,255,255,.96)",
                                textShadow: "0 1px 10px rgba(0,0,0,.35)",
                                maxWidth: "62ch",
                            }}
                        >
                            <b>
                                Provides a simple model in which you agree the terms of care with your client.
                            </b>
                        </p>

                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                                margin: "1.2rem 0 1.6rem 0",
                                maxWidth: 820,
                                display: "grid",
                                gap: ".6rem",
                                textAlign: "left",
                                color: "rgba(255,255,255,.98)",
                            }}
                        >
                            {[
                                "Find care roles that suit your skills and experience",
                                "Schedule and manage everything in one place",
                                "Keep more of your hard-earned income",
                                "Free registration — no subscription",
                            ].map((text, i) => (
                                <li
                                    key={i}
                                    style={{
                                        position: "relative",
                                        paddingLeft: "2rem",
                                        fontSize: "clamp(1rem, 1.15vw, 1.08rem)",
                                        lineHeight: 1.6,
                                        textShadow: "0 1px 8px rgba(0,0,0,.5)",
                                    }}
                                >
                                    <span
                                        aria-hidden="true"
                                        style={{
                                            position: "absolute",
                                            left: 0,
                                            top: 0,
                                            transform: "translateY(.05rem)",
                                            fontWeight: 800,
                                            fontSize: "1.05em",
                                            color: "#ffffff",
                                            textShadow: "0 0 10px rgba(0,0,0,.45)",
                                        }}
                                    >
                                        ✓
                                    </span>
                                    {i < 3 ? (
                                        <>
                                            {text.split(" ").slice(0, 4).join(" ")}{" "}
                                            <strong>{text.split(" ").slice(4).join(" ")}</strong>
                                        </>
                                    ) : (
                                        <strong>{text}</strong>
                                    )}
                                </li>
                            ))}
                        </ul>

                        <div
                            style={{
                                display: "flex",
                                gap: ".9rem",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                flexWrap: "wrap",
                            }}
                        >
                            <Link
                                to="/register"
                                style={{
                                    appearance: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    padding: ".95rem 1.3rem",
                                    fontWeight: 700,
                                    letterSpacing: ".4px",
                                    borderRadius: 999,
                                    background: BRAND,
                                    color: "#ffffff",
                                    boxShadow: "0 12px 28px rgba(2,8,23,.18)",
                                    textDecoration: "none",
                                }}
                            >
                                QUICK REGISTRATION
                            </Link>


                        </div>
                    </div>
                </div>
            </section>

            {/* === CAREGIVER INTRO — bez zielonej kreski, spójna kolorystyka === */}
            <section
                id="caregiver-steps"
                aria-label="Caregiver steps"
                style={{
                    margin: "6rem auto 6rem",
                    width: "min(1100px, 92vw)",
                    fontFamily:
                        "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                    paddingLeft: "2.4rem",
                    paddingRight: "2.4rem",
                }}
            >
                <header style={{ marginBottom: "2.5rem" }}>
                    <h3
                        style={{
                            margin: 0,
                            fontWeight: 800,
                            letterSpacing: ".2px",
                            fontSize: "clamp(1.4rem,2.4vw,2.4rem)",
                            color: "#0F172A",
                            lineHeight: 1.2,
                        }}
                    >
                        Get started in 5 clear steps
                    </h3>
                    <p
                        style={{
                            margin: ".6rem 0 0",
                            color: "#475569",
                            fontSize: "1.3rem",
                            fontWeight: 600,
                            letterSpacing: ".15px",
                            marginBottom: "1.2rem"
                        }}
                    >
                        From signup to your first match.
                    </p>
                    <div
                        aria-hidden="true"
                        style={{
                            width: 0,
                            height: 4,
                            background: "#14532D",
                            borderRadius: 999,
                            marginTop: "1.2rem",
                            marginBottom: "1.2rem",
                            opacity: 0.95,
                        }}
                    />
                </header>

                <div style={{ display: "grid", rowGap: "3rem" }}>
                    {steps.map((p, idx) => {
                        const alt = idx % 2 === 1;
                        const bg = alt ? "#EFFDF8" : "#FFFFFF";
                        return (
                            <article
                                key={p.t}
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "auto 1fr",
                                    gap: "1.6rem",
                                    padding: "clamp(20px,2.8vw,32px)",
                                    background: bg,
                                    borderRadius: "14px",
                                    boxShadow: "0 6px 16px rgba(2,8,23,0.08)",
                                    transform: "translateX(0)",
                                    opacity: 0,
                                    animation: `stepFadeIn .6s ease forwards ${0.2 + idx * 0.15}s`,
                                }}
                            >
                                <div style={{ position: "relative", width: "48px", height: "48px" }}>
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "0",
                                            left: "50%",
                                            transform: "translateX(-50%) translateY(-50%)",
                                            width: "48px",
                                            height: "48px",
                                            borderRadius: "50%",
                                            background: "#fff",
                                            border: "2px solid #14532D",
                                            display: "grid",
                                            placeItems: "center",
                                            fontWeight: 900,
                                            color: "#14532D",
                                            fontSize: "1.2rem",
                                        }}
                                    >
                                        {idx + 1}
                                    </div>
                                </div>

                                <div>
                                    <h4
                                        style={{
                                            margin: "0 0 .9rem 0",
                                            fontSize: "clamp(1.1rem,1.6vw,1.35rem)",
                                            lineHeight: 1.25,
                                            fontWeight: 850,
                                            letterSpacing: ".2px",
                                            color: "#0F172A",
                                        }}
                                    >
                                        {p.t}
                                    </h4>
                                    <p
                                        style={{
                                            margin: 0,
                                            color: "#334155",
                                            lineHeight: 1.75,
                                            fontSize: "clamp(.98rem,1.1vw,1.1rem)",
                                            maxWidth: "68ch",
                                        }}
                                    >
                                        {p.d}
                                    </p>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* CTA BUTTON */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        marginTop: "3.5rem",
                    }}
                >
                    <a
                        href="/register"
                        style={{
                            display: "inline-block",
                            background: "rgb(76, 120, 101)",
                            color: "#fff",
                            fontWeight: 900,
                            letterSpacing: ".02em",
                            padding: "1rem 1.8rem",
                            borderRadius: 999,
                            textDecoration: "none",
                            boxShadow: "0 10px 24px rgba(27,171,31,.18)",
                            border: "1px solid rgba(27,171,31,.4)",
                            transition: "all .25s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.filter = "brightness(1.05)";
                            e.currentTarget.style.boxShadow =
                                "0 14px 30px rgba(27,171,31,.28)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.filter = "none";
                            e.currentTarget.style.boxShadow =
                                "0 10px 24px rgba(27,171,31,.18)";
                        }}
                    >
                        CREATE YOUR FREE ACCOUNT
                    </a>
                </div>

                <style>{`
    @keyframes stepFadeIn {
      from { opacity: 0; transform: translateY(18px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @media (prefers-reduced-motion: reduce) {
      article { animation: none !important; opacity: 1 !important; transform: none !important; }
    }
  `}</style>
            </section>

            {/* === WHO CAN JOIN === */}
            <section
                aria-label="Who can join"
                style={{
                    margin: "4rem auto 3rem",
                    width: "min(1100px, 92vw)",
                    padding: "0 clamp(16px, 4vw, 32px)",
                }}
            >
                <h2
                    style={{
                        margin: "0 0 .75rem 0",
                        fontWeight: 900,
                        fontSize: "clamp(1.8rem,3vw,2.3rem)",
                        letterSpacing: ".3px",
                        lineHeight: 1.2,
                        color: "#1F2A37",
                    }}
                >
                    Who can join ICare
                </h2>

                <div
                    style={{
                        width: 280,
                        maxWidth: "80%",
                        height: 4,
                        background: "#1FAB1F",
                        borderRadius: 999,
                        margin: ".75rem 0 2rem 0",
                        opacity: 0.95,
                    }}
                />

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                        gap: "clamp(18px,2.4vw,24px)",
                    }}
                >
                    {[
                        {
                            t: "Professional caregivers & nurses",
                            d: "With verifiable experience and references.",
                            img: "/images/icons/nurse.png",
                        },
                        {
                            t: "Live-in & hourly support",
                            d: "Flexible availability and clear hourly or daily rates.",
                            img: "/images/icons/clock.png",
                        },
                        {
                            t: "Specialist skills",
                            d: "Dementia, mobility support, post-surgery care, and more.",
                            img: "/images/icons/skills.png",
                        },
                        {
                            t: "Language & driving",
                            d: "Extra plus for multilingual caregivers and drivers.",
                            img: "/images/icons/language.png",
                        },
                    ].map((item) => (
                        <article
                            key={item.t}
                            style={{
                                background: "#FFFFFF",
                                border: "1px solid rgba(15,23,42,0.10)",
                                borderRadius: 16,
                                padding: "22px 20px 26px",
                                boxShadow: "0 8px 24px rgba(2,8,23,0.08)",
                                display: "grid",
                                gap: 12,
                                alignItems: "start",
                                transition: "transform .25s ease, box-shadow .25s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-3px)";
                                e.currentTarget.style.boxShadow = "0 14px 30px rgba(2,8,23,0.10)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 8px 24px rgba(2,8,23,0.08)";
                            }}
                        >
                            {/* GÓRNA CZĘŚĆ — mini grafika + tytuł */}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 12,
                                }}
                            >
                                <div
                                    aria-hidden="true"
                                    style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: 12,
                                        background: "rgba(31,171,31,0.10)",
                                        border: "1px solid rgba(31,171,31,0.25)",
                                        display: "grid",
                                        placeItems: "center",
                                        overflow: "hidden",
                                    }}
                                >
                                    <img
                                        src={item.img}
                                        alt=""
                                        loading="lazy"
                                        style={{
                                            width: "70%",
                                            height: "70%",
                                            objectFit: "contain",
                                            filter: "grayscale(20%)",
                                        }}
                                    />
                                </div>
                                <strong
                                    style={{
                                        color: "#1F2A37",
                                        fontSize: "1.08rem",
                                        fontWeight: 800,
                                        letterSpacing: ".2px",
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {item.t}
                                </strong>
                            </div>

                            {/* OPIS */}
                            <p
                                style={{
                                    margin: 0,
                                    color: "#334155",
                                    lineHeight: 1.65,
                                    fontSize: "1rem",
                                }}
                            >
                                {item.d}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            {/* === FAQ === */}
            <section aria-label="Caregivers FAQ" style={{ ...container, margin: "0 auto 3.75rem" }}>
                <h2 style={sectionTitle}>Frequently asked questions</h2>
                <div
                    style={{
                        width: 420,
                        maxWidth: "90%",
                        height: 4,
                        background: BRAND,
                        borderRadius: 999,
                        margin: ".75rem 0 1.5rem 0",
                        opacity: 0.95,
                    }}
                />
                <div style={{ display: "grid", gap: 10 }}>
                    {[
                        {
                            q: "Is registration really free?",
                            a: "Yes. You only pay a flat 10% fee on the contract when you agree terms with a family.",
                        },
                        {
                            q: "Can I negotiate my rate?",
                            a: "Absolutely. You agree the hourly/daily rate directly with the family in the chat and contract.",
                        },
                        {
                            q: "How do contracts and payments work?",
                            a: "Set schedule and rate, e-sign your agreement, then manage everything in one place in ICare.",
                        },
                        {
                            q: "Do I need documents?",
                            a: "We recommend a CV/resume and any checks/certifications to increase trust and visibility.",
                        },
                    ].map((f) => (
                        <details
                            key={f.q}
                            style={{
                                background: "#FFFFFF",
                                border: "1px solid rgba(15,23,42,0.10)",
                                borderRadius: 14,
                                padding: "12px 14px",
                            }}
                        >
                            <summary
                                style={{
                                    listStyle: "none",
                                    cursor: "pointer",
                                    fontWeight: 800,
                                    color: NEUTRAL,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: 12,
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.color = BRAND)}
                                onMouseOut={(e) => (e.currentTarget.style.color = NEUTRAL)}
                            >
                                {f.q}
                                <span aria-hidden="true" style={{ color: BRAND }}>
                                    +
                                </span>
                            </summary>
                            <div style={{ marginTop: 8, color: "#334155", lineHeight: 1.65 }}>{f.a}</div>
                        </details>
                    ))}
                </div>
            </section>

            {/* === CONTACT CTA (full-bleed green) === */}
            <section
                aria-label="Contact CTA"
                style={{
                    marginLeft: "calc(50% - 50vw)",
                    marginRight: "calc(50% - 50vw)",
                    width: "100vw",
                    background: BRAND,
                    color: "#FFFFFF",
                }}
            >
                <div
                    style={{
                        ...container,
                        maxWidth: 1200,
                        padding: "28px clamp(16px,4vw,32px)",
                        display: "grid",
                        gridTemplateColumns: "1fr auto",
                        gap: 16,
                        alignItems: "center",
                    }}
                >
                    <div>
                        <h3
                            style={{
                                margin: 0,
                                fontWeight: 900,
                                fontSize: "clamp(1.15rem,2.2vw,1.5rem)",
                                color: "#FFFFFF",
                            }}
                        >
                            Need help setting up your profile?
                        </h3>
                        <p style={{ margin: "6px 0 0", color: "rgba(252, 251, 251, 1)" }}>
                            We’ll guide you through matching and agreements — quick and friendly.
                        </p>
                    </div>
                    <a
                        href="/contact"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            textDecoration: "none",
                            color: BRAND,
                            background: "#FFFFFF",
                            padding: ".9rem 1.2rem",
                            borderRadius: 999,
                            fontWeight: 900,
                            letterSpacing: ".02em",
                            border: "1px solid rgba(255,255,255,.6)",
                            boxShadow: "0 10px 24px rgba(2,8,23,.10)",
                            transition: "transform .15s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        Contact us
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M5 12h14" />
                            <path d="M13 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </section>
        </div>
    );
}
