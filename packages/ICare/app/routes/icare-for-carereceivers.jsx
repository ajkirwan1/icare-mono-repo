import React, { useEffect } from "react";
import { Link } from "react-router";
import heroImage from "/images/heros/icare-for-carereceivers.jpg";

export default function ICareForCareReceivers() {

    // === SIMPLE SCROLL REVEAL ===
    useEffect(() => {
        const items = document.querySelectorAll(".sr");
        const reveal = () => {
            items.forEach((el) => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.85) {
                    el.style.opacity = 1;
                    el.style.transform = "translateY(0)";
                }
            });
        };
        reveal();
        window.addEventListener("scroll", reveal);
        return () => window.removeEventListener("scroll", reveal);
    }, []);

    const BRAND = "#1FAB1F";
    const NEUTRAL = "#0F172A";

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

    return (
        <div style={pageWrap}>

            {/* ============================
                HERO — DARK GRADIENT (same as caregivers)
            ============================== */}
            {/* ============================================
   HERO — ICare Premium (beige + green, spójny)
=============================================== */}
            <section
                aria-label="ICare for Care Receivers hero"
                style={{
                    position: "relative",
                    minHeight: "clamp(580px, 78vh, 920px)",
                    width: "100%",
                    overflow: "hidden",
                    display: "grid",
                    placeItems: "center",
                    color: "#fff",
                    background: "#0f172a",
                }}
            >
                {/* BACKGROUND IMAGE */}
                <img
                    src={heroImage}
                    alt="Care support background"
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        filter: "brightness(.90) contrast(1.0) saturate(1.05)",
                        zIndex: 0,
                    }}
                />

                {/* SOFT GREEN–BEIGE OVERLAY (spójne z resztą strony) */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(180deg, rgba(38,50,56,0.4) 0%, rgba(15, 23, 42, 0.43) 90%)",
                        zIndex: 1,
                    }}
                />

                {/* ============================
        STICKY TOP NAV — ICare style
    ============================= */}
                <header
                    id="nav-icare"
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "1rem clamp(20px,4vw,48px)",
                        transition: "all .3s ease",
                        background: "rgba(0,0,0,0.25)",
                        backdropFilter: "blur(10px)",
                        borderBottom: "1px solid rgba(255,255,255,0.15)",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
                    }}
                >
                    {/* LOGO */}
                    <Link
                        to="/"
                        style={{
                            fontWeight: 900,
                            color: "#ffffff",
                            fontSize: "clamp(1.3rem,2.4vw,1.6rem)",
                            textDecoration: "none",
                            textShadow: "0 2px 10px rgba(0,0,0,0.45)",
                        }}
                    >
                        ICare
                    </Link>

                    {/* CLEAN NAV LINKS — bez obramowań */}
                    <nav
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "1.1rem 1.6rem",
                        }}
                    >
                        {[
                            { to: "/", label: "Home" },
                            { to: "/how-it-works", label: "How it Works" },
                            { to: "/who-we-are", label: "Who We Are" },
                            { to: "/privacy", label: "Privacy" },
                            { to: "/icare-for-caregivers", label: "Caregivers" },
                            { to: "/icare-for-carereceivers", label: "Care Receivers" },
                        ].map((l) => (
                            <Link
                                key={l.to}
                                to={l.to}
                                style={{
                                    color: "#ffffff",
                                    fontSize: "1.05rem",
                                    fontWeight: 600,
                                    textDecoration: "none",
                                    letterSpacing: ".2px",
                                    padding: ".2rem 0",
                                    transition: "all .18s ease",
                                    textShadow: "0 2px 12px rgba(0,0,0,0.35)",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                    e.currentTarget.style.color = "#ffffff";
                                    e.currentTarget.style.textShadow =
                                        "0 4px 18px rgba(0,0,0,0.55)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.textShadow =
                                        "0 2px 12px rgba(0,0,0,0.35)";
                                }}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>
                </header>


                {/* ============================
        HERO CONTENT (spójne kolory!)
    ============================= */}
                <div
                    style={{
                        zIndex: 2,
                        width: "min(1100px, 92vw)",
                        marginInline: "auto",
                        padding: "clamp(3rem,5vw,6rem) 0",
                    }}
                >
                    <div style={{ width: "min(1100px,92vw)", margin: "0 auto" }}>
                        {/* BADGE — kolorystyka zgodna z Twoim projektem */}
                        <span
                            style={{
                                display: "inline-block",
                                marginBottom: "1.6rem",
                                padding: ".55rem 1.1rem",
                                fontSize: ".82rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: ".12em",
                                color: "#EAF7EA",
                                background: "rgba(76,120,101,0.32)",
                                border: "1.5px solid rgba(76,120,101,0.55)",
                                borderRadius: 999,
                            }}
                        >
                            Safe • Direct • Trusted
                        </span>

                        {/* TITLE */}
                        <h1
                            style={{
                                margin: 0,
                                fontWeight: 800,
                                letterSpacing: "-0.3px",
                                fontSize: "clamp(2.4rem,4vw,3.6rem)",
                                lineHeight: 1.07,
                                color: "#fff",
                                maxWidth: "22ch",
                                textShadow: "0 2px 14px rgba(0,0,0,.55)",
                            }}
                        >
                            ICare for Care Receivers
                        </h1>

                        {/* SUBTEXT */}
                        <p
                            style={{
                                marginTop: "1.4rem",
                                fontSize: "clamp(1.08rem,1.4vw,1.25rem)",
                                lineHeight: 1.75,
                                color: "rgba(255,255,255,.92)",
                                maxWidth: "55ch",
                            }}
                        >
                            <b>
                                Create a free account, browse verified caregivers, and agree fair
                                terms directly.
                            </b>
                        </p>

                        {/* LIST */}
                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                                margin: "1.6rem 0 2.2rem",
                                display: "grid",
                                gap: ".75rem",
                                maxWidth: 700,
                                color: "rgba(255,255,255,.96)",
                            }}
                        >
                            {[
                                "Find trusted caregivers tailored to your needs",
                                "Communicate privately and securely",
                                "Agree transparent terms without agencies",
                                "Only a one-time fee when you sign an agreement",
                            ].map((text) => (
                                <li
                                    key={text}
                                    style={{
                                        position: "relative",
                                        paddingLeft: "2rem",
                                        fontSize: "1.08rem",
                                        lineHeight: 1.6,
                                        textShadow: "0 1px 8px rgba(0,0,0,.5)",
                                    }}
                                >
                                    <span
                                        style={{
                                            position: "absolute",
                                            left: 0,
                                            top: 0,
                                            fontWeight: 900,
                                            color: "#EAF7EA",
                                        }}
                                    >
                                        ✓
                                    </span>
                                    {text}
                                </li>
                            ))}
                        </ul>

                        {/* CTA BUTTON */}
                        <Link
                            to="/register"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                padding: "1rem 1.5rem",
                                background: "#4C7865",
                                color: "#fff",
                                borderRadius: 999,
                                fontWeight: 700,
                                fontSize: "1.05rem",
                                textDecoration: "none",
                                boxShadow: "0 14px 32px rgba(0,0,0,0.22)",
                                transition: "all .22s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-3px)";
                                e.currentTarget.style.boxShadow =
                                    "0 18px 36px rgba(0,0,0,0.28)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow =
                                    "0 14px 32px rgba(0,0,0,0.22)";
                            }}
                        >
                            Join us in just 2 minutes
                        </Link>
                    </div>
                </div>
            </section>


            {/* =====================================================================
                FROM HERE ON — ALL SECTIONS ARE IMPORTED FROM YOUR BIG CARE RECEIVERS PAGE
                AND RESTYLED TO MATCH CAREGIVERS COLOR SYSTEM
            ====================================================================== */}

            {/* BADGES SECTION */}
            {/* EXACT copy of your internal logic — updated only color values 
                & spacing to match caregiver page */}
            <section
                aria-label="3 Steps Minimal"
                style={{
                    marginLeft: "calc(50% - 50vw)",
                    marginRight: "calc(50% - 50vw)",
                    width: "100vw",
                    background: "#FAF8F5",
                    padding: "120px 0",
                    borderTop: "1px solid #EAE6E1",
                }}
            >
                <div
                    style={{
                        width: "min(980px,90vw)", // MAXIMALNIE MINIMALISTYCZNE
                        margin: "0 auto",
                        padding: "0 24px",
                    }}
                >
                    {/* ===== TITLE ===== */}
                    <header
                        className="sr"
                        style={{
                            opacity: 0,
                            transform: "translateY(25px)",
                            transition: "all .8s cubic-bezier(0.25,0.1,0.25,1)",
                            textAlign: "center",
                            marginBottom: "4rem",
                        }}
                    >
                        <h2
                            style={{
                                margin: 0,
                                fontWeight: 800,
                                color: "#1A1A1A",
                                fontSize: "clamp(2.4rem, 3vw, 3rem)",
                                letterSpacing: "-0.5px",
                                lineHeight: 1.1,
                            }}
                        >
                            Find your caregiver in 3 simple steps
                        </h2>

                        <p
                            style={{
                                maxWidth: "60ch",
                                margin: "22px auto 0",
                                fontSize: "1.15rem",
                                color: "#444",
                                lineHeight: 1.75,
                                fontWeight: 400,
                            }}
                        >
                            A calm, human-centered process designed for clarity, trust and ease.
                        </p>
                    </header>

                    {/* ===== 3 STEP GRID ===== */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr",
                            gap: "3.6rem",
                            padding: "0 12px",
                        }}
                    >
                        {[
                            {
                                n: "1",
                                t: "Browse verified caregivers",
                                d: "Review experience, languages, skills and availability — all clearly laid out.",
                            },
                            {
                                n: "2",
                                t: "Start a private conversation",
                                d: "Message directly, ask questions and exchange documents securely.",
                            },
                            {
                                n: "3",
                                t: "Agree terms together",
                                d: "Set hours, expectations and rate — transparent, simple and human.",
                            },
                        ].map((s, i) => (
                            <div
                                key={s.n}
                                className="sr"
                                style={{
                                    opacity: 0,
                                    transform: "translateY(30px)",
                                    transition: `all .9s ${0.15 + i * 0.15}s cubic-bezier(0.25,0.1,0.25,1)`,
                                    display: "grid",
                                    gridTemplateColumns: "auto 1fr",
                                    gap: "1.6rem",
                                    alignItems: "start",
                                }}
                            >
                                {/* NUMBER ICON */}
                                <div
                                    style={{
                                        width: 52,
                                        height: 52,
                                        borderRadius: "50%",
                                        border: "2px solid #A67A63",
                                        display: "grid",
                                        placeItems: "center",
                                        fontWeight: 700,
                                        fontSize: "1.35rem",
                                        color: "#A67A63",
                                    }}
                                >
                                    {s.n}
                                </div>

                                {/* TEXT */}
                                <div>
                                    <h3
                                        style={{
                                            margin: "0 0 0.4rem",
                                            fontSize: "1.32rem",
                                            fontWeight: 700,
                                            color: "#1A1A1A",
                                            letterSpacing: "-0.2px",
                                        }}
                                    >
                                        {s.t}
                                    </h3>

                                    <p
                                        style={{
                                            margin: 0,
                                            fontSize: "1.05rem",
                                            lineHeight: 1.65,
                                            color: "#4A4A4A",
                                        }}
                                    >
                                        {s.d}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ===== BUTTON ===== */}
                    <div
                        className="sr"
                        style={{
                            opacity: 0,
                            transform: "translateY(25px)",
                            transition: "all .9s .45s cubic-bezier(0.25,0.1,0.25,1)",
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "4rem",
                        }}
                    >
                        <Link
                            to="/register"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 10,
                                padding: "14px 40px",
                                borderRadius: 999,
                                background: "#A67A63",
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: "1.05rem",
                                textDecoration: "none",
                                letterSpacing: ".3px",
                                boxShadow: "0 10px 26px rgba(166,122,99,0.22)",
                                transition: "all .25s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-2px)";
                                e.currentTarget.style.boxShadow =
                                    "0 14px 34px rgba(166,122,99,0.26)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow =
                                    "0 10px 26px rgba(166,122,99,0.22)";
                            }}
                        >
                            Continue
                        </Link>
                    </div>
                </div>
            </section>



            {/* =====================================================
                BANNER SECTION (family image on right)
            ===================================================== */}
            <section
                aria-label="Banner Editorial"
                style={{
                    marginLeft: "calc(50% - 50vw)",
                    marginRight: "calc(50% - 50vw)",
                    width: "100vw",
                    background: "#FAF8F5",
                    borderTop: "1px solid #e8e4df",
                    borderBottom: "1px solid #e8e4df",
                    padding: "120px 0",
                }}
            >
                <div
                    style={{
                        maxWidth: 1280,
                        margin: "0 auto",
                        padding: "0 clamp(24px,6vw,64px)",
                        display: "grid",
                        gridTemplateColumns: "0.95fr 1.05fr",
                        gap: "clamp(40px, 6vw, 80px)",
                        alignItems: "center",
                    }}
                >
                    {/* LEFT — TEXT */}
                    <div style={{ paddingRight: "2vw" }}>
                        <h2
                            style={{
                                margin: 0,
                                fontWeight: 800,
                                color: "#1A1A1A",
                                fontSize: "clamp(2.3rem, 3vw, 3rem)",
                                lineHeight: 1.15,
                                letterSpacing: "-0.5px",
                            }}
                        >
                            Care that adapts to your rhythm.
                        </h2>

                        <p
                            style={{
                                marginTop: "1.6rem",
                                maxWidth: "60ch",
                                fontSize: "1.15rem",
                                lineHeight: 1.75,
                                color: "#4A4A4A",
                                fontWeight: 400,
                            }}
                        >
                            A more human way to find care — calm, honest and beautifully simple.
                            Whether it’s support for yourself or someone you love, we help you make
                            decisions with confidence, clarity and warmth.
                        </p>

                        <div
                            style={{
                                marginTop: "2.4rem",
                                display: "grid",
                                gap: "1rem",
                            }}
                        >
                            {[
                                "No subscriptions or hidden fees",
                                "Direct agreement with caregivers",
                                "Secure private messaging",
                            ].map((text) => (
                                <div
                                    key={text}
                                    style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: 12,
                                    }}
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#A67A63"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{ marginTop: 4 }}
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>

                                    <span
                                        style={{
                                            fontSize: "1.05rem",
                                            color: "#3A3A3A",
                                            lineHeight: 1.55,
                                            fontWeight: 500,
                                        }}
                                    >
                                        {text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT — CAREGIVING IMAGE */}
                    <figure
                        style={{
                            margin: 0,
                            position: "relative",
                            height: "min(480px, 55vh)",
                            borderRadius: 28,
                            overflow: "hidden",
                            border: "1px solid rgba(0,0,0,0.08)",
                            boxShadow: "0 18px 40px rgba(0,0,0,0.07)",
                        }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1600&q=80"
                            alt="Caregiving support moment — reading together"
                            style={{
                                position: "absolute",
                                inset: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                objectPosition: "50% 50%",
                            }}
                        />
                    </figure>
                </div>
            </section>

            {/* =====================================================
                CHECKLIST SECTION
            ===================================================== */}
            <section
                aria-label="Care Needs"
                style={{
                    marginLeft: "calc(50% - 50vw)",
                    marginRight: "calc(50% - 50vw)",
                    width: "100vw",
                    background: "#FAF8F5",
                    borderTop: "1px solid #EDE7E2",
                    borderBottom: "1px solid #EDE7E2",
                    padding: "120px 20px 140px",
                }}
            >
                <div
                    style={{
                        width: "min(1200px,92vw)",
                        margin: "0 auto",
                        display: "grid",
                        justifyItems: "center",
                    }}
                >
                    <div
                        style={{
                            width: "min(1000px,85vw)",
                            background: "#FFFFFF",
                            borderRadius: 32,
                            border: "1px solid rgba(166,122,99,0.18)",
                            boxShadow: "0 18px 48px rgba(0,0,0,0.06)",
                            padding: "56px 48px 68px",
                        }}
                    >
                        {/* HEADER */}
                        <header
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                borderBottom: "1px solid rgba(166,122,99,0.18)",
                                paddingBottom: 22,
                                marginBottom: 36,
                                flexWrap: "wrap",
                                gap: 20,
                            }}
                        >
                            <h3
                                style={{
                                    margin: 0,
                                    fontWeight: 800,
                                    letterSpacing: "-0.2px",
                                    fontSize: "clamp(2rem,2.6vw,2.4rem)",
                                    color: "#1A1A1A",
                                    lineHeight: 1.25,
                                }}
                            >
                                Tell us what you need
                            </h3>

                            <Link
                                to="/register"
                                style={{
                                    background: "#A67A63",
                                    color: "#fff",
                                    padding: "14px 28px",
                                    borderRadius: 999,
                                    fontWeight: 700,
                                    fontSize: "1rem",
                                    textDecoration: "none",
                                    boxShadow: "0 10px 28px rgba(166,122,99,0.25)",
                                    transition: "all .25s",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                    e.currentTarget.style.boxShadow =
                                        "0 16px 34px rgba(166,122,99,0.32)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow =
                                        "0 10px 28px rgba(166,122,99,0.25)";
                                }}
                            >
                                Show matching caregivers
                            </Link>
                        </header>

                        {/* SUBTEXT */}
                        <p
                            style={{
                                margin: "0 auto 34px",
                                textAlign: "center",
                                maxWidth: 640,
                                color: "#6B5F58",
                                fontSize: "1.1rem",
                                lineHeight: 1.75,
                            }}
                        >
                            Choose the support you need — we’ll connect you with the right
                            caregivers who match your situation and preferences.
                        </p>

                        {/* GRID OF OPTIONS */}
                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
                                gap: 20,
                            }}
                        >
                            {[
                                "Dementia care",
                                "Mobility support",
                                "Post-surgery recovery",
                                "Overnight assistance",
                                "Live-in care",
                                "Hourly visits",
                                "Driving & errands",
                                "Polish language",
                                "German language",
                                "English language",
                            ].map((k) => (
                                <li key={k}>
                                    <label
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 12,
                                            padding: "14px 18px",
                                            borderRadius: 18,
                                            background: "#FAF8F5",
                                            border: "1px solid rgba(166,122,99,0.25)",
                                            cursor: "pointer",
                                            transition: "all .25s",
                                            fontWeight: 600,
                                            color: "#4A4A4A",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = "#F2ECE8";
                                            e.currentTarget.style.transform =
                                                "translateY(-2px)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = "#FAF8F5";
                                            e.currentTarget.style.transform =
                                                "translateY(0)";
                                        }}
                                    >
                                        {/* Minimalist icon */}
                                        <svg
                                            width="22"
                                            height="22"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#A67A63"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <rect x="3" y="7" width="18" height="13" rx="2" />
                                            <path d="M8 7V5a4 4 0 0 1 8 0v2" />
                                        </svg>

                                        <input
                                            type="checkbox"
                                            style={{
                                                transform: "scale(1.2)",
                                                accentColor: "#A67A63",
                                            }}
                                        />
                                        {k}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>


            {/* =====================================================
                ICare vs Agency
            ===================================================== */}
            <section
                aria-label="ICare vs Agency"
                style={{
                    margin: "90px auto",
                    width: "min(92vw,1100px)",
                    background: "#FFFFFF",
                    borderRadius: 24,
                    padding: "80px clamp(24px,4vw,48px)",
                    border: "1px solid #E5E7EB",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.04)",
                }}
            >
                {/* SMALL LABEL */}
                <p
                    style={{
                        textAlign: "center",
                        color: "#6B7280",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        fontSize: 12.5,
                        letterSpacing: ".12em",
                        margin: 0,
                    }}
                >
                    ICare vs Agencies
                </p>

                {/* TITLE */}
                <h3
                    style={{
                        margin: "12px 0 36px",
                        textAlign: "center",
                        fontWeight: 800,
                        fontSize: "clamp(1.9rem, 2.8vw, 2.3rem)",
                        color: "#0F172A",
                        letterSpacing: "-0.3px",
                    }}
                >
                    Why families choose ICare
                </h3>

                {/* TAGS */}
                <ul
                    style={{
                        listStyle: "none",
                        padding: 0,
                        margin: "0 auto 40px",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 10,
                        justifyContent: "center",
                        maxWidth: 820,
                    }}
                >
                    {[
                        "Direct agreement",
                        "Transparent pricing",
                        "Secure messaging",
                        "Fair pay for caregivers",
                    ].map((label) => (
                        <li
                            key={label}
                            style={{
                                padding: "8px 16px",
                                borderRadius: 999,
                                background: "#F3F4F6",
                                border: "1px solid #E2E4E8",
                                fontWeight: 600,
                                color: "#374151",
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                            }}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#4C7865"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            {label}
                        </li>
                    ))}
                </ul>

                {/* CARDS */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
                        gap: 26,
                    }}
                >
                    {/* ICare */}
                    <article
                        style={{
                            borderRadius: 22,
                            padding: "32px 28px",
                            background: "#F9FAFB",
                            border: "1px solid #D1D5DB",
                            boxShadow: "0 8px 18px rgba(0,0,0,0.03)",
                        }}
                    >
                        <header
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 14,
                                marginBottom: 18,
                            }}
                        >
                            <span
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: "50%",
                                    background: "#ECFDF5",
                                    border: "1px solid #A7F3D0",
                                    display: "grid",
                                    placeItems: "center",
                                    color: "#167C5F",
                                    fontWeight: 900,
                                }}
                            >
                                ✓
                            </span>

                            <strong
                                style={{
                                    color: "#0F172A",
                                    fontSize: "1.15rem",
                                    fontWeight: 800,
                                    letterSpacing: "-0.2px",
                                }}
                            >
                                ICare
                            </strong>
                        </header>

                        <ul
                            style={{
                                paddingLeft: "1.1rem",
                                margin: 0,
                                lineHeight: 1.7,
                                color: "#374151",
                                fontWeight: 500,
                                fontSize: "1rem",
                            }}
                        >
                            <li>Direct agreement with caregiver</li>
                            <li>Transparent one-time fee</li>
                            <li>Secure messaging and contracts</li>
                            <li>Fair pay for caregivers & lower family cost</li>
                        </ul>
                    </article>

                    {/* Agency */}
                    <article
                        style={{
                            borderRadius: 22,
                            padding: "32px 28px",
                            background: "#FFFFFF",
                            border: "1px solid #E5E7EB",
                            boxShadow: "0 8px 20px rgba(0,0,0,0.03)",
                        }}
                    >
                        <header
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 14,
                                marginBottom: 18,
                            }}
                        >
                            <span
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: "50%",
                                    background: "#F3F4F6",
                                    border: "1px solid #D1D5DB",
                                    color: "#64748B",
                                    display: "grid",
                                    placeItems: "center",
                                    fontSize: 22,
                                }}
                            >
                                —
                            </span>

                            <strong
                                style={{
                                    color: "#475569",
                                    fontSize: "1.15rem",
                                    fontWeight: 800,
                                    letterSpacing: "-0.2px",
                                }}
                            >
                                Traditional agency
                            </strong>
                        </header>

                        <ul
                            style={{
                                paddingLeft: "1.1rem",
                                margin: 0,
                                lineHeight: 1.7,
                                color: "#475569",
                                fontWeight: 500,
                                fontSize: "1rem",
                            }}
                        >
                            <li>Intermediary in every step</li>
                            <li>Recurring fees and markups</li>
                            <li>Fragmented communication</li>
                            <li>Less pay for caregivers</li>
                        </ul>
                    </article>
                </div>
            </section>


            {/* =====================================================
                FAQ
            ===================================================== */}
            <section
                aria-label="FAQ"
                style={{
                    ...container,
                    margin: "60px auto 80px",
                    paddingTop: 10,
                }}
            >
                {/* ----- TITLE ----- */}
                <h3
                    style={{
                        margin: "0 0 28px",
                        fontWeight: 800,
                        fontSize: "clamp(1.8rem, 3vw, 2.2rem)",
                        color: "#1A1A1A",
                        letterSpacing: "-0.4px",
                        textAlign: "left",
                    }}
                >
                    Frequently asked questions
                </h3>

                {/* ----- FAQ LIST ----- */}
                <ul
                    style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        display: "grid",
                        gap: 16,
                    }}
                >
                    {[
                        {
                            q: "Do I pay anything to register?",
                            a: "No. Registration is free. ICare charges a one-time flat fee only after both sides sign an agreement.",
                        },
                        {
                            q: "How do I verify a caregiver?",
                            a: "Profiles include experience, checks, skills and availability. You can message privately, schedule a call, and request documents before agreeing terms.",
                        },
                        {
                            q: "Is my data secure?",
                            a: "Yes. We use encrypted messaging and store only the minimum data needed to provide the service.",
                        },
                    ].map((item, i) => (
                        <li key={i}>
                            <details
                                style={{
                                    background: "#FFFFFF",
                                    borderRadius: 18,
                                    border: "1px solid rgba(76,120,101,0.20)",
                                    padding: "18px 22px",
                                    cursor: "pointer",
                                    transition: "all .25s ease",
                                    boxShadow: "0 6px 16px rgba(0,0,0,0.04)",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = "0 10px 26px rgba(0,0,0,0.08)";
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.04)";
                                    e.currentTarget.style.transform = "translateY(0)";
                                }}
                            >
                                <summary
                                    style={{
                                        listStyle: "none",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        fontSize: "1.05rem",
                                        fontWeight: 700,
                                        color: "#1F2A37",
                                        padding: "6px 0",
                                    }}
                                >
                                    {item.q}

                                    {/* ARROW ICON */}
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="rgba(76,120,101,0.9)"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{
                                            marginLeft: 12,
                                            transition: "transform .25s ease",
                                        }}
                                        className="faq-arrow"
                                    >
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </summary>

                                <p
                                    style={{
                                        marginTop: 12,
                                        paddingRight: 8,
                                        color: "#475569",
                                        lineHeight: 1.65,
                                        fontSize: "1rem",
                                    }}
                                >
                                    {item.a}
                                </p>
                            </details>
                        </li>
                    ))}
                </ul>
            </section>


            {/* =====================================================
                TRUST BAR
            ===================================================== */}
            <section
                aria-label="Trust bar"
                style={{
                    marginTop: 48,
                    width: "100%",
                    background: "linear-gradient(180deg, #F6FAF8 0%, #FFFFFF 70%)",
                    padding: "70px 0",
                    borderTop: "1px solid rgba(0,0,0,0.05)",
                }}
            >
                <div
                    style={{
                        width: "min(92vw,1100px)",
                        margin: "0 auto",
                        padding: "0 clamp(16px,4vw,32px)",
                    }}
                >
                    <ul
                        style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                            gap: 20,
                            justifyItems: "center",
                        }}
                    >
                        {[
                            { n: "12k+", l: "Profiles viewed monthly" },
                            { n: "4.8★", l: "Average review score" },
                            { n: "98%", l: "Secure messaging uptime" },
                            { n: "24/7", l: "Support & guidance" },
                        ].map((stat) => (
                            <li
                                key={stat.l}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 16,
                                    padding: "18px 20px",
                                    borderRadius: 18,
                                    background: "#FFFFFF",
                                    border: "1px solid rgba(76,120,101,0.14)",
                                    boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
                                    maxWidth: 300,
                                    width: "100%",
                                    transition: "transform .2s ease, box-shadow .2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                    e.currentTarget.style.boxShadow =
                                        "0 10px 26px rgba(0,0,0,0.09)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow =
                                        "0 6px 20px rgba(0,0,0,0.05)";
                                }}
                            >
                                {/* ICON CIRCLE */}
                                <span
                                    style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: "50%",
                                        display: "grid",
                                        placeItems: "center",
                                        background: "rgba(166,122,99,0.12)",
                                        border: "1px solid rgba(166,122,99,0.22)",
                                        color: "#6A4D3A",
                                        fontWeight: 900,
                                        fontSize: "1rem",
                                        flexShrink: 0,
                                    }}
                                >
                                    ✓
                                </span>

                                {/* TEXT */}
                                <div style={{ lineHeight: 1.35 }}>
                                    <strong
                                        style={{
                                            fontSize: "1.2rem",
                                            color: "#0F172A",
                                            fontWeight: 800,
                                            display: "block",
                                            marginBottom: 2,
                                        }}
                                    >
                                        {stat.n}
                                    </strong>

                                    <span
                                        style={{
                                            fontSize: ".95rem",
                                            color: "#475569",
                                            display: "block",
                                        }}
                                    >
                                        {stat.l}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* =====================================================
                CONTACT CTA (green full width)
            ===================================================== */}
            <section
                aria-label="Contact CTA"
                style={{
                    marginTop: 64,
                    marginLeft: "calc(50% - 50vw)",
                    marginRight: "calc(50% - 50vw)",
                    width: "100vw",
                    background:
                        "linear-gradient(135deg, #4C7865 0%, #3D5F50 40%, #2E4A3D 100%)",
                    color: "#F3F7F5",
                    paddingTop: 80,
                    paddingBottom: 80,
                    boxShadow: "0 -4px 22px rgba(0,0,0,0.15)",
                }}
            >
                <div
                    style={{
                        width: "min(92vw, 1100px)",
                        margin: "0 auto",
                        padding: "0 clamp(20px,4vw,48px)",
                        display: "grid",
                        gap: 24,
                    }}
                >
                    {/* TITLE */}
                    <h4
                        style={{
                            margin: 0,
                            fontSize: "clamp(1.8rem, 3vw, 2.3rem)",
                            fontWeight: 900,
                            letterSpacing: "-0.5px",
                            color: "#ffffff",
                            textShadow: "0 2px 8px rgba(0,0,0,0.35)",
                        }}
                    >
                        Ready to start?
                    </h4>

                    {/* SUBTEXT */}
                    <p
                        style={{
                            margin: 0,
                            maxWidth: 760,
                            fontSize: "1.15rem",
                            lineHeight: 1.65,
                            color: "rgba(255,255,255,0.92)",
                            textShadow: "0 1px 5px rgba(0,0,0,0.3)",
                        }}
                    >
                        Tell us what you need — we’ll help you find trusted caregivers that match your situation.
                    </p>

                    {/* CTA BUTTON */}
                    <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 20 }}>
                        <Link
                            to="/register"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 10,
                                padding: "14px 32px",
                                borderRadius: 999,
                                background: "#FFFFFF",
                                color: "#2E4A3D",
                                fontWeight: 800,
                                fontSize: "1.1rem",
                                textDecoration: "none",
                                letterSpacing: ".3px",
                                boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
                                transition: "all .25s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-2px)";
                                e.currentTarget.style.boxShadow = "0 16px 36px rgba(0,0,0,0.32)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.25)";
                            }}
                        >
                            Register
                        </Link>
                    </div>
                </div>

                {/* MINI FOOTER */}
                <footer
                    style={{
                        marginTop: 64,
                        background: "rgba(0,0,0,0.18)",
                        borderTop: "1px solid rgba(255,255,255,0.15)",
                        padding: "26px clamp(20px,4vw,48px)",
                        backdropFilter: "blur(4px)",
                    }}
                >
                    <div
                        style={{
                            maxWidth: 1100,
                            margin: "0 auto",
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            alignItems: "center",
                            gap: 20,
                            color: "rgba(255,255,255,0.95)",
                        }}
                    >
                        {/* LOGO */}
                        <span
                            style={{
                                fontWeight: 900,
                                fontSize: "1.2rem",
                                letterSpacing: ".2px",
                            }}
                        >
                            ICare
                        </span>

                        {/* LINKS */}
                        <nav style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                            {["Privacy", "Terms", "Contact"].map((item) => (
                                <Link
                                    key={item}
                                    to={`/${item.toLowerCase()}`}
                                    style={{
                                        textDecoration: "none",
                                        color: "rgba(255,255,255,0.9)",
                                        fontWeight: 600,
                                        fontSize: "1rem",
                                        letterSpacing: ".2px",
                                        transition: "opacity .2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.opacity = "1";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.opacity = "0.85";
                                    }}
                                >
                                    {item}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </footer>
            </section>

        </div>
    );
}
