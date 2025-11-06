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
                aria-label="Caregiver intro"
                style={{
                    width: "min(1100px,92vw)",
                    margin: "4rem auto 3rem",
                    padding: "0 clamp(16px,4vw,32px)",
                }}
            >
                <h2
                    style={{
                        margin: "0 0 .75rem 0",
                        fontWeight: 900,
                        fontSize: "clamp(1.8rem,3vw,2.3rem)",
                        letterSpacing: ".3px",
                        lineHeight: 1.2,
                        color: NEUTRAL,
                    }}
                >
                    How it works for caregivers
                </h2>

                <p
                    style={{
                        margin: "0 0 .6rem 0",
                        maxWidth: "62ch",
                        lineHeight: 1.7,
                        fontSize: "1.05rem",
                        color: "#475569",
                    }}
                >
                    Choose when and how you work — connect directly with families who value your care,
                    agree on transparent terms, and manage your schedule in one place.
                </p>

                <p
                    style={{
                        margin: 0,
                        fontWeight: 700,
                        color: BRAND, // delikatny akcent tylko w tekście
                        letterSpacing: ".2px",
                    }}
                >
                    No middlemen. No confusion. Just clarity and respect.
                </p>
            </section>

            {/* === GET STARTED (ulepszone, airy + reveal) === */}
            <section
                id="caregiver-steps"
                aria-label="Caregiver steps"
                style={{
                    margin: "3.5rem auto 4rem",
                    width: "min(1100px, 92vw)",
                }}
            >
                <header style={{ marginBottom: "1.2rem" }}>
                    <h3
                        style={{
                            margin: 0,
                            fontWeight: 900,
                            letterSpacing: ".2px",
                            fontSize: "clamp(1.25rem, 2.2vw, 1.5rem)",
                        }}
                    >
                        Get started in 5 clear steps
                    </h3>
                    <div
                        aria-hidden="true"
                        style={{
                            width: 220,
                            height: 3,
                            background: BRAND,
                            borderRadius: 999,
                            marginTop: ".6rem",
                            opacity: 0.85,
                        }}
                    />
                </header>

                <div
                    style={{
                        borderRadius: 20,
                        overflow: "hidden",
                        border: `1px solid ${BORDER}`,
                        background:
                            "linear-gradient(180deg, rgba(27,171,31,0.03) 0%, rgba(27,171,31,0.00) 40%)",
                        boxShadow: "0 12px 30px rgba(2,8,23,0.06)",
                    }}
                >
                    <div style={{ padding: "6px 0" }} aria-hidden="true" />

                    {steps.map((p, idx) => {
                        const alt = idx % 2 === 1;
                        const bg = alt ? SUBTLE : "#FFFFFF";
                        return (
                            <article
                                key={p.t}
                                ref={(el) => (stepRefs.current[idx] = el)}
                                className="reveal"
                                style={{
                                    background: bg,
                                    padding: "clamp(22px, 2.6vw, 28px) clamp(18px, 3vw, 32px)",
                                    borderTop: idx === 0 ? "none" : `1px solid ${BORDER}`,
                                }}
                            >
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "48px 1fr",
                                        alignItems: "start",
                                        gap: "16px clamp(14px, 2vw, 18px)",
                                    }}
                                >
                                    <div
                                        aria-hidden="true"
                                        style={{
                                            position: "relative",
                                            width: 42,
                                            height: 42,
                                            borderRadius: "50%",
                                            background: "#fff",
                                            border: `1px solid ${BORDER}`,
                                            display: "grid",
                                            placeItems: "center",
                                            fontWeight: 900,
                                            color: NEUTRAL,
                                            boxShadow: "0 2px 6px rgba(2,8,23,.05)",
                                        }}
                                    >
                                        {idx + 1}
                                        <span
                                            style={{
                                                position: "absolute",
                                                inset: -4,
                                                borderRadius: "50%",
                                                border: `2px solid ${BRAND}`,
                                                opacity: 0.12,
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <h4
                                            style={{
                                                margin: 0,
                                                fontSize: "clamp(1.06rem, 1.55vw, 1.2rem)",
                                                lineHeight: 1.22,
                                                fontWeight: 850,
                                                letterSpacing: ".2px",
                                                color: "#1F2A37",
                                            }}
                                        >
                                            {p.t}
                                        </h4>
                                        <p
                                            style={{
                                                margin: "8px 0 0",
                                                color: "#334155",
                                                lineHeight: 1.75,
                                                fontSize: "clamp(.98rem, 1.05vw, 1.06rem)",
                                                maxWidth: "70ch",
                                            }}
                                        >
                                            {p.d}
                                        </p>
                                    </div>
                                </div>
                            </article>
                        );
                    })}

                    <div style={{ padding: "6px 0" }} aria-hidden="true" />
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: 12,
                        alignItems: "center",
                        marginTop: 18,
                        flexWrap: "wrap",
                    }}
                >
                    <Link
                        to="/register"
                        style={{
                            appearance: "none",
                            border: "none",
                            borderRadius: 999,
                            background: BRAND,
                            color: "#fff",
                            padding: "12px 16px",
                            fontWeight: 900,
                            letterSpacing: ".02em",
                            textDecoration: "none",
                            boxShadow: "0 10px 24px rgba(27,171,31,.18)",
                            transition: "transform .15s ease, filter .15s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-1px)";
                            e.currentTarget.style.filter = "saturate(1.06)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.filter = "none";
                        }}
                    >
                        REGISTER TODAY
                    </Link>

                    <Link
                        to="/terms"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "12px 14px",
                            borderRadius: 999,
                            border: `1px solid ${BORDER}`,
                            color: NEUTRAL,
                            background: "#fff",
                            textDecoration: "none",
                            fontWeight: 800,
                        }}
                    >
                        Terms &amp; conditions
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={NEUTRAL}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M5 12h14" />
                            <path d="M13 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                {/* local styles for scroll reveal */}
                <style>{`
          @keyframes revealUp {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .reveal { opacity: 0; transform: translateY(16px); will-change: transform, opacity; }
          .reveal--in { animation: revealUp .48s ease forwards; }
          @media (prefers-reduced-motion: reduce) {
            .reveal, .reveal--in { opacity: 1 !important; transform: none !important; animation: none !important; }
          }
        `}</style>
            </section>

            {/* === WHO CAN JOIN === */}
            <section aria-label="Who can join" style={{ ...container, margin: "3.5rem auto" }}>
                <h2 style={sectionTitle}>Who can join ICare</h2>
                <div
                    style={{
                        width: 280,
                        maxWidth: "80%",
                        height: 4,
                        background: BRAND,
                        borderRadius: 999,
                        margin: ".75rem 0 1.5rem 0",
                        opacity: 0.95,
                    }}
                />
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                        gap: "clamp(14px,2.2vw,20px)",
                    }}
                >
                    {[
                        { t: "Professional caregivers & nurses", d: "With verifiable experience and references." },
                        { t: "Live-in & hourly support", d: "Flexible availability and clear hourly or daily rates." },
                        { t: "Specialist skills", d: "Dementia, mobility support, post-surgery care, and more." },
                        { t: "Language & driving", d: "Extra plus for multilingual caregivers and drivers." },
                    ].map((item) => (
                        <article
                            key={item.t}
                            style={{
                                background: "#FFFFFF",
                                border: "1px solid rgba(15,23,42,0.08)",
                                borderRadius: 16,
                                padding: "18px 18px",
                                boxShadow: "0 8px 22px rgba(2,8,23,.06)",
                                display: "grid",
                                gap: 8,
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <span
                                    aria-hidden="true"
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 10,
                                        background: "rgba(31,171,31,.10)",
                                        border: "1px solid rgba(31,171,31,.25)",
                                        display: "grid",
                                        placeItems: "center",
                                    }}
                                >
                                    <svg
                                        width="22"
                                        height="22"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke={BRAND}
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </span>
                                <strong style={{ color: "#1f2a37", fontSize: "1.02rem", letterSpacing: ".2px" }}>
                                    {item.t}
                                </strong>
                            </div>
                            <p style={{ margin: 0, color: "#334155", lineHeight: 1.6 }}>{item.d}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section aria-label="Success stories" style={{ ...container, margin: "0 auto 3.75rem" }}>
                <h2 style={sectionTitle}>Success stories</h2>

                <div
                    style={{
                        width: 240,
                        maxWidth: "80%",
                        height: 4,
                        background: BRAND,
                        borderRadius: 999,
                        margin: ".75rem 0 1.5rem 0",
                        opacity: 0.95,
                    }}
                />

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "clamp(16px,2.4vw,24px)",
                    }}
                >
                    {[
                        {
                            img: "/images/people/anna.jpg", // <- PODMIEŃ NA SWÓJ PLIK
                            q: "I matched in 3 days and kept a higher rate than via agency.",
                            a: "Simple chat, clear terms, e-signed agreement — everything in one place.",
                            n: "Anna • Live-in caregiver",
                        },
                        {
                            img: "/images/people/marta.jpg", // <- PODMIEŃ NA SWÓJ PLIK
                            q: "Finally, transparent profiles and contracts.",
                            a: "Family felt safe; I felt respected. We set the schedule together.",
                            n: "Marta • Dementia care",
                        },
                        {
                            img: "/images/people/kasia.jpg", // <- PODMIEŃ NA SWÓJ PLIK
                            q: "No monthly fee — I only pay when I earn.",
                            a: "That’s fair. More money stays with me.",
                            n: "Kasia • Hourly support",
                        },
                    ].map((t, idx) => (
                        <figure
                            key={t.q}
                            style={{
                                margin: 0,
                                borderRadius: 18,
                                overflow: "hidden",
                                border: "1px solid rgba(15,23,42,0.10)",
                                background: "#fff",
                                boxShadow: "0 12px 28px rgba(2,8,23,0.06)",
                                transition: "transform .28s ease, box-shadow .28s ease, border-color .28s ease",
                                cursor: "default",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-4px)";
                                e.currentTarget.style.boxShadow = "0 16px 36px rgba(2,8,23,0.10)";
                                e.currentTarget.style.borderColor = "rgba(31,171,31,0.25)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 12px 28px rgba(2,8,23,0.06)";
                                e.currentTarget.style.borderColor = "rgba(15,23,42,0.10)";
                            }}
                            className="story-card"
                        >
                            {/* DUŻE ZDJĘCIE */}
                            <div
                                style={{
                                    position: "relative",
                                    width: "100%",
                                    aspectRatio: "4 / 3", // duże proporcje
                                    background: "linear-gradient(135deg, #E2E8F0 0%, #F8FAFC 100%)",
                                }}
                            >
                                <img
                                    src={t.img}
                                    alt={t.n}
                                    loading="lazy"
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        objectPosition: "center",
                                        transform: "scale(1)",
                                        transition: "transform .6s ease",
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                    onError={(e) => {
                                        // fallback tła jeśli obrazek nie istnieje
                                        e.currentTarget.style.display = "none";
                                    }}
                                />

                                {/* lekki gradient pod podpisem */}
                                <div
                                    aria-hidden="true"
                                    style={{
                                        position: "absolute",
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        height: "40%",
                                        background:
                                            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(2,8,23,0.45) 100%)",
                                    }}
                                />
                                {/* podpis na zdjęciu (imię/rola) */}
                                <figcaption
                                    style={{
                                        position: "absolute",
                                        left: 12,
                                        right: 12,
                                        bottom: 10,
                                        color: "#FFFFFF",
                                        fontWeight: 800,
                                        letterSpacing: ".2px",
                                        textShadow: "0 2px 10px rgba(0,0,0,.35)",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8,
                                    }}
                                >
                                    <span
                                        aria-hidden="true"
                                        style={{
                                            display: "inline-grid",
                                            placeItems: "center",
                                            width: 28,
                                            height: 28,
                                            borderRadius: 999,
                                            background: "rgba(255,255,255,.2)",
                                            border: "1px solid rgba(255,255,255,.3)",
                                            backdropFilter: "blur(2px)",
                                            fontSize: 14,
                                        }}
                                    >
                                        ★
                                    </span>
                                    {t.n}
                                </figcaption>
                            </div>

                            {/* TEKST: cytat + opis */}
                            <blockquote
                                style={{
                                    margin: 0,
                                    padding: "16px 16px 18px",
                                }}
                            >
                                <p
                                    style={{
                                        margin: 0,
                                        color: "#0F172A",
                                        fontWeight: 800,
                                        lineHeight: 1.45,
                                        fontSize: "clamp(1rem, 1.2vw, 1.05rem)",
                                    }}
                                >
                                    {t.q}
                                </p>
                                <p
                                    style={{
                                        margin: "8px 0 0",
                                        color: "#334155",
                                        lineHeight: 1.7,
                                    }}
                                >
                                    {t.a}
                                </p>
                            </blockquote>
                        </figure>
                    ))}
                </div>

                {/* Local styles: delikatne reveal przy scrollu + preferencje dostępności */}
                <style>{`
    @keyframes cardIn {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .story-card { opacity: 0; transform: translateY(10px); animation: cardIn .5s ease forwards; }
    .story-card:nth-child(1) { animation-delay: .05s; }
    .story-card:nth-child(2) { animation-delay: .12s; }
    .story-card:nth-child(3) { animation-delay: .18s; }

    @media (prefers-reduced-motion: reduce) {
      .story-card { opacity: 1 !important; transform: none !important; animation: none !important; }
    }
  `}</style>
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
