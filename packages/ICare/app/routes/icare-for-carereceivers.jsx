import React from "react";
import { Link } from "react-router";
import heroImage from "/images/heros/icare-for-carereceivers.jpg";

export default function ICareForCareReceivers() {
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
            <section
                aria-label="ICare for Care Receivers hero"
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
                {/* BACKGROUND IMAGE */}
                <img
                    src={heroImage}
                    alt="Family care support background"
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        filter: "brightness(.68) contrast(1.04)",
                        zIndex: 0,
                    }}
                />

                {/* DARK OVERLAY */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "radial-gradient(75% 55% at 50% 45%, rgba(0,0,0,.22) 0%, rgba(0,0,0,.38) 60%, rgba(0,0,0,.52) 100%)",
                        zIndex: 1,
                    }}
                />

                {/* TOP NAV (identical to caregivers) */}
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
                        padding: "1rem clamp(16px,4vw,32px)",
                        background: "rgba(2,8,23,0.28)",
                        backdropFilter: "blur(4px)",
                        borderBottom: "1px solid rgba(255,255,255,0.14)",
                    }}
                >
                    <Link
                        to="/"
                        style={{
                            fontWeight: 900,
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

                {/* HERO CONTENT */}
                <div
                    style={{
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
                                marginBottom: "1.4rem",
                                fontSize: "1.01rem",
                                fontWeight: 800,
                                letterSpacing: ".13em",
                                textTransform: "uppercase",
                                color: "#EAF7EA",
                                padding: ".55rem 1.05rem",
                                borderRadius: 999,
                                background: "rgba(31,171,31,0.22)",
                                border: "2.3px solid rgba(31,171,31,0.5)",
                                textShadow: "0 1px 3px rgba(0,0,0,.28)",
                            }}
                        >
                            Safe  Direct  Trusted
                        </span>

                        <h1
                            style={{
                                fontWeight: 800,
                                letterSpacing: ".2px",
                                lineHeight: 1.05,
                                fontSize: "clamp(2rem, 4.2vw, 3.2rem)",
                                margin: "0 0 .7rem",
                                color: "#ffffff",
                                textShadow: "0 2px 18px rgba(0,0,0,.45)",
                            }}
                        >
                            ICare for Care Receivers
                        </h1>

                        <p
                            style={{
                                margin: 0,
                                fontSize: "clamp(1.02rem, 1.2vw, 1.12rem)",
                                lineHeight: 1.7,
                                color: "rgba(255,255,255,.96)",
                                maxWidth: "62ch",
                                textShadow: "0 1px 8px rgba(0,0,0,.35)",
                            }}
                        >
                            <b>Create a free account, browse verified caregivers, and agree fair terms directly.</b>
                        </p>

                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                                margin: "1.2rem 0 1.6rem",
                                maxWidth: 820,
                                display: "grid",
                                gap: ".6rem",
                                color: "rgba(255,255,255,.98)",
                            }}
                        >
                            {[
                                "Find trusted caregivers tailored to your needs",
                                "Communicate privately and securely",
                                "Agree transparent terms without agencies",
                                "Only a one-time fee when you sign an agreement",
                            ].map((text, idx) => (
                                <li
                                    key={idx}
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
                                            fontWeight: 800,
                                            fontSize: "1.05em",
                                            color: "#ffffff",
                                            textShadow: "0 0 10px rgba(0,0,0,.45)",
                                        }}
                                    >
                                        ✓
                                    </span>

                                    {idx < 3 ? (
                                        <>
                                            {text.split(" ").slice(0, 3).join(" ")}{" "}
                                            <strong>{text.split(" ").slice(3).join(" ")}</strong>
                                        </>
                                    ) : (
                                        <strong>{text}</strong>
                                    )}
                                </li>
                            ))}
                        </ul>

                        <Link
                            to="/register"
                            style={{
                                display: "inline-block",
                                padding: ".95rem 1.3rem",
                                fontWeight: 700,
                                borderRadius: 999,
                                background: "rgb(76,120,101)",
                                color: "#ffffff",
                                textDecoration: "none",
                                boxShadow: "0 12px 28px rgba(2,8,23,.18)",
                                letterSpacing: ".4px",
                            }}
                        >
                            JOIN US IN JUST 2 MINUTES
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
                aria-label="Safety & Trust"
                style={{
                    marginLeft: "calc(50% - 50vw)",
                    marginRight: "calc(50% - 50vw)",
                    width: "100vw",
                    background: "#FFFFFF",
                    padding: "90px 32px",
                    borderTop: "1px solid #E5E7EB",
                }}
            >
                <h2
                    style={{
                        margin: 0,
                        color: "#1f2a37",
                        textAlign: "center",
                        fontWeight: 700,
                        fontSize: "clamp(26px, 2.2vw, 36px)",
                        letterSpacing: "0.2px",
                        lineHeight: 1.25,
                        marginBottom: "3rem"
                    }}
                >
                    CARE IN JUST 3 QUICK STEPS
                </h2>

                <div
                    style={{
                        width: "min(1100px, 92vw)",
                        margin: "0 auto",
                        background: "#F7FAF8",
                        border: "1px solid #E4EFEA",
                        borderRadius: 30,
                        padding: "56px 42px 60px",
                        boxShadow: "0 6px 20px rgba(2,8,23,.04)",
                    }}
                >

                    <div
                        aria-hidden="true"
                        style={{
                            width: 0,
                            height: 4,
                            background: BRAND,
                            borderRadius: 999,
                            margin: "14px auto 38px",
                            opacity: 0.85,
                        }}
                    />

                    {/* BADGES GRID */}
                    {/* -------------------------- */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                            gap: "38px 28px",
                        }}
                    >
                        {[
                            {
                                t: "Verified caregivers",
                                d: "Profiles with essential checks, experience and references.",
                                iconBg: "rgba(76,120,101,0.10)",
                                iconColor: "#4C7865",
                                icon: (
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="1.7"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                                    </svg>
                                ),
                            },
                            {
                                t: "Direct agreement",
                                d: "Set expectations, hours and rate directly with your caregiver.",
                                iconBg: "rgba(255,182,193,0.18)",
                                iconColor: "#C36A7E",
                                icon: (
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="1.7"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                ),
                            },
                            {
                                t: "Secure messaging",
                                d: "Private chat and simple document sharing before signing.",
                                iconBg: "rgba(173,216,230,0.22)",
                                iconColor: "#5B89A6",
                                icon: (
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="1.7"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                ),
                            },
                            {
                                t: "Transparent pricing",
                                d: "No subscriptions. One small fee after agreement.",
                                iconBg: "rgba(250,214,165,0.22)",
                                iconColor: "#D19A56",
                                icon: (
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="1.7"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 1v22" />
                                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" />
                                    </svg>
                                ),
                            },
                            {
                                t: "Digital contracts",
                                d: "Review terms, sign digitally, everything stored securely.",
                                iconBg: "rgba(209,213,252,0.25)",
                                iconColor: "#7A80C0",
                                icon: (
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="1.7"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 20h9" />
                                        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                                    </svg>
                                ),
                            },
                            {
                                t: "Human support",
                                d: "Real people ready to guide you with any questions.",
                                iconBg: "rgba(196,239,207,0.24)",
                                iconColor: "#4F9261",
                                icon: (
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="1.7"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 16v.01" />
                                        <path d="M12 8v4" />
                                    </svg>
                                ),
                            },
                        ].map((b) => (
                            <div
                                key={b.t}
                                style={{
                                    maxWidth: 300,
                                    width: "100%",
                                    margin: "0 auto",
                                    paddingBottom: 20,
                                    borderBottom: "1px solid rgba(15,23,42,.08)",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 6,
                                    overflowWrap: "break-word",
                                    wordBreak: "break-word",
                                    transition: "all .18s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderBottom =
                                        "1px solid rgba(76,120,101,0.35)";
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderBottom =
                                        "1px solid rgba(15,23,42,.08)";
                                    e.currentTarget.style.transform = "translateY(0)";
                                }}
                            >
                                <div
                                    style={{
                                        width: 42,
                                        height: 42,
                                        borderRadius: 12,
                                        background: b.iconBg,
                                        color: b.iconColor,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginBottom: 8,
                                        border: `1px solid ${b.iconColor}22`,
                                        flexShrink: 0,
                                    }}
                                >
                                    {b.icon}
                                </div>

                                <h3
                                    style={{
                                        margin: 0,
                                        fontSize: "1.08rem",
                                        fontWeight: 700,
                                        color: "#1f2a37",
                                    }}
                                >
                                    {b.t}
                                </h3>

                                <p
                                    style={{
                                        margin: 0,
                                        color: "#475569",
                                        fontSize: "0.94rem",
                                        lineHeight: 1.55,
                                    }}
                                >
                                    {b.d}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* LEAD TEXT */}
                    <p
                        style={{
                            margin: "40px auto 0",
                            color: "#1f2a37",
                            lineHeight: 1.8,
                            fontSize: "clamp(16px, 1.4vw, 18px)",
                            maxWidth: "760px",
                            textAlign: "center",
                        }}
                    >
                        <b style={{ color: "#375d4f", fontSize: "1.4rem" }}>
                            Browse verified caregivers and contact them directly.
                        </b>
                        <br />
                        No subscription — only a one-time fee payable after agreement.
                    </p>

                    {/* CTA */}
                    <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
                        <Link
                            to="/register"
                            style={{
                                backgroundColor: "rgb(76,120,101)",
                                color: "#fff",
                                borderRadius: 999,
                                padding: "14px 34px",
                                fontSize: "1.05rem",
                                fontWeight: 700,
                                textDecoration: "none",
                                boxShadow: "0 8px 18px rgba(76,120,101,0.25)",
                                transition: "all .25s",
                            }}
                        >
                            Register with us in just 2 minutes
                        </Link>
                    </div>
                </div>
            </section>

            {/* =====================================================
                BANNER SECTION (family image on right)
            ===================================================== */}
            <section
                aria-label="Banner"
                style={{
                    marginLeft: "calc(50% - 50vw)",
                    marginRight: "calc(50% - 50vw)",
                    width: "100vw",
                    background: "#F9FAFB",
                    borderTop: "1px solid #e5e7eb",
                    borderBottom: "1px solid #e5e7eb",
                }}
            >
                <div
                    style={{
                        maxWidth: 1180,
                        margin: "0 auto",
                        padding: "80px clamp(20px,4vw,48px)",
                        display: "grid",
                        gridTemplateColumns: "1.1fr 0.9fr",
                        gap: "clamp(24px, 4vw, 48px)",
                        alignItems: "center",
                    }}
                >
                    <div>
                        <h2
                            style={{
                                margin: 0,
                                color: "#1f2a37",
                                fontWeight: 900,
                                fontSize: "clamp(24px,2.6vw,36px)",
                                lineHeight: 1.35,
                            }}
                        >
                            Whether you're finding care for yourself
                            <br />
                            or someone you love,
                            <span style={{ color: BRAND }}>
                                ICare simplifies the process.
                            </span>
                        </h2>

                        <div
                            aria-hidden="true"
                            style={{
                                width: "min(720px,85%)",
                                height: 3,
                                background: `linear-gradient(90deg,${BRAND} 0%, #6ea191 100%)`,
                                borderRadius: 999,
                                margin: "22px 0 28px",
                                opacity: 0.85,
                            }}
                        />

                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 12,
                            }}
                        >
                            {[
                                "No subscription",
                                "Direct agreement",
                                "Secure messaging",
                                "Transparent pricing",
                            ].map((text) => (
                                <li
                                    key={text}
                                    style={{
                                        padding: "10px 16px",
                                        borderRadius: 999,
                                        background: "rgba(255,255,255,.4)",
                                        border: "1px solid rgba(76,120,101,.25)",
                                        fontWeight: 600,
                                        letterSpacing: ".2px",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 8,
                                        backdropFilter: "blur(6px)",
                                    }}
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#4c7865"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M5 12l5 5L20 7" />
                                    </svg>
                                    {text}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <figure
                        style={{
                            margin: 0,
                            position: "relative",
                            height: "min(360px, 46vh)",
                            borderRadius: 24,
                            overflow: "hidden",
                            border: "1px solid rgba(15,23,42,.06)",
                            boxShadow: "0 10px 28px rgba(2,8,23,.05)",
                        }}
                    >
                        <img
                            src="/images/banners/family-care.jpg"
                            alt="Family discussing care"
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
                    background: "#E9F4F0",
                    borderTop: "1px solid #DDEAE6",
                    borderBottom: "1px solid #DDEAE6",
                    padding: "80px 20px 90px",
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
                            borderRadius: 28,
                            border: "1px solid rgba(15,23,42,.06)",
                            boxShadow: "0 12px 36px rgba(2,8,23,.08)",
                            padding: "42px 36px 48px",
                        }}
                    >
                        <header
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                borderBottom: "1px solid rgba(15,23,42,0.06)",
                                paddingBottom: 16,
                                marginBottom: 24,
                                flexWrap: "wrap",
                                gap: 16,
                            }}
                        >
                            <h3
                                style={{
                                    margin: 0,
                                    fontWeight: 900,
                                    letterSpacing: ".2px",
                                    fontSize: "clamp(22px,2.2vw,30px)",
                                    color: NEUTRAL,
                                }}
                            >
                                Tell us what you need
                            </h3>

                            <Link
                                to="/register"
                                style={{
                                    background: "rgb(76,120,101)",
                                    color: "#fff",
                                    padding: "12px 22px",
                                    borderRadius: 999,
                                    fontWeight: 700,
                                    textDecoration: "none",
                                }}
                            >
                                Show matching caregivers
                            </Link>
                        </header>

                        <p
                            style={{
                                margin: "0 auto 26px",
                                textAlign: "center",
                                maxWidth: 720,
                                color: "#375d4f",
                                lineHeight: 1.7,
                            }}
                        >
                            Choose the help you need. We’ll match you with qualified caregivers.
                        </p>

                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                                gap: 14,
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
                                            gap: 8,
                                            padding: "12px 16px",
                                            borderRadius: 16,
                                            background: "rgba(76,120,101,0.06)",
                                            border: "1px solid rgba(76,120,101,0.25)",
                                            fontWeight: 600,
                                            cursor: "pointer",
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            style={{
                                                transform: "scale(1.2)",
                                                accentColor: "#4c7865",
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
                    margin: "64px auto",
                    width: "min(92vw,1100px)",
                    background: "#F7F8F9",
                    borderRadius: 24,
                    padding: "56px clamp(16px,4vw,32px)",
                    boxShadow: "0 8px 28px rgba(2,8,23,0.04)",
                    border: "1px solid #E5E7EB",
                }}
            >
                <p
                    style={{
                        textAlign: "center",
                        color: "#6B7280",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        fontSize: 13,
                        letterSpacing: ".1em",
                    }}
                >
                    ICare vs Agencies
                </p>

                <h3
                    style={{
                        margin: "0 0 28px",
                        textAlign: "center",
                        fontWeight: 900,
                        fontSize: "clamp(1.35rem,2.5vw,1.75rem)",
                        color: "#1f2a37",
                    }}
                >
                    Why families choose ICare
                </h3>

                <ul
                    style={{
                        listStyle: "none",
                        padding: 0,
                        margin: "0 auto 30px",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 12,
                        justifyContent: "center",
                        maxWidth: 860,
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
                                padding: "8px 14px",
                                borderRadius: 999,
                                background: "rgba(255,255,255,0.8)",
                                border: "1px solid rgba(76,120,101,0.25)",
                                fontWeight: 600,
                                color: "#375d4f",
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
                                stroke="#4c7865"
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

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
                        gap: 20,
                        marginTop: 16,
                    }}
                >
                    {/* ICare Card */}
                    <article
                        style={{
                            borderRadius: 20,
                            padding: 24,
                            background: "rgba(76,160,120,0.18)",
                            border: "1px solid rgba(76,160,120,0.45)",
                            boxShadow: "0 10px 28px rgba(2,8,23,0.08)",
                        }}
                    >
                        <header
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                marginBottom: 14,
                            }}
                        >
                            <span
                                style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: "50%",
                                    background: "rgba(76,160,120,0.25)",
                                    border: "1px solid rgba(76,160,120,0.55)",
                                    display: "grid",
                                    placeItems: "center",
                                    color: "#1f2a37",
                                    fontWeight: 900,
                                }}
                            >
                                ✓
                            </span>
                            <strong style={{ color: "#1f2a37", fontSize: 16 }}>
                                ICare
                            </strong>
                        </header>

                        <ul
                            style={{
                                paddingLeft: "1rem",
                                margin: 0,
                                lineHeight: 1.65,
                                color: "#1f2a37",
                                fontWeight: 500,
                                fontSize: 15,
                            }}
                        >
                            <li>Direct agreement with caregiver</li>
                            <li>Transparent one-time fee</li>
                            <li>Secure messaging and contracts</li>
                            <li>Fair pay for caregivers & lower family cost</li>
                        </ul>
                    </article>

                    {/* Agency Card */}
                    <article
                        style={{
                            borderRadius: 20,
                            padding: 24,
                            background: "#FFFFFF",
                            border: "1px solid rgba(148,163,184,.25)",
                            boxShadow: "0 8px 20px rgba(2,8,23,0.04)",
                        }}
                    >
                        <header
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                marginBottom: 14,
                            }}
                        >
                            <span
                                style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: "50%",
                                    background: "rgba(148,163,184,.15)",
                                    border: "1px solid rgba(148,163,184,.35)",
                                    color: "#64748b",
                                    display: "grid",
                                    placeItems: "center",
                                }}
                            >
                                —
                            </span>
                            <strong style={{ color: "#475569", fontSize: 16 }}>
                                Traditional agency
                            </strong>
                        </header>

                        <ul
                            style={{
                                paddingLeft: "1rem",
                                margin: 0,
                                lineHeight: 1.65,
                                color: "#334155",
                                fontWeight: 500,
                                fontSize: 15,
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
            <section aria-label="FAQ" style={{ ...container, margin: "28px auto" }}>
                <h3
                    style={{
                        marginBottom: 10,
                        fontWeight: 900,
                        fontSize: "clamp(1.3rem,2.2vw,1.6rem)",
                        color: "#1f2a37",
                    }}
                >
                    Frequently asked questions
                </h3>

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
                ].map((item) => (
                    <details
                        key={item.q}
                        style={{
                            background: "#fff",
                            border: "1px solid rgba(148,163,184,.35)",
                            borderRadius: 14,
                            padding: "14px 16px",
                            margin: "10px 0",
                        }}
                    >
                        <summary
                            style={{
                                cursor: "pointer",
                                fontWeight: 700,
                                color: "#0f172a",
                            }}
                        >
                            {item.q}
                        </summary>
                        <p style={{ marginTop: 10, color: "#334155" }}>{item.a}</p>
                    </details>
                ))}
            </section>

            {/* =====================================================
                TRUST BAR
            ===================================================== */}
            <section
                aria-label="Trust bar"
                style={{
                    marginTop: 34,
                    width: "100%",
                    background: "linear-gradient(180deg, #F7FCFD 0%, #FFFFFF 70%)",
                }}
            >
                <div
                    style={{
                        width: "min(92vw,1100px)",
                        margin: "0 auto",
                        padding: "18px clamp(16px,4vw,32px) 26px",
                    }}
                >
                    <ul
                        style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit,minmax(220px,1fr))",
                            gap: 12,
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
                                    gap: 12,
                                    padding: "10px 12px",
                                    borderRadius: 14,
                                    background: "#fff",
                                    border: "1px solid rgba(3,105,118,.14)",
                                    boxShadow: "0 6px 18px rgba(2,8,23,.05)",
                                    maxWidth: 320,
                                    width: "100%",
                                }}
                            >
                                <span
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 999,
                                        display: "grid",
                                        placeItems: "center",
                                        background: "rgba(51,174,186,.12)",
                                        border: "1px solid rgba(51,174,186,.35)",
                                        color: "#0f766e",
                                        fontWeight: 900,
                                    }}
                                >
                                    ✓
                                </span>
                                <div>
                                    <strong
                                        style={{
                                            fontSize: 18,
                                            color: "#0f172a",
                                            lineHeight: 1.25,
                                        }}
                                    >
                                        {stat.n}
                                    </strong>
                                    <span
                                        style={{ fontSize: 13.5, color: "#475569" }}
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
                    marginTop: 48,
                    marginLeft: "calc(50% - 50vw)",
                    marginRight: "calc(50% - 50vw)",
                    width: "100vw",
                    background: "#4C7865",
                    color: "#f4f8f6",
                    boxShadow: "0 8px 28px rgba(2,8,23,0.12)",
                }}
            >
                <div
                    style={{
                        width: "min(92vw,1100px)",
                        margin: "0 auto",
                        padding: "56px clamp(20px,4vw,48px) 60px",
                        display: "grid",
                        gap: 18,
                    }}
                >
                    <h4
                        style={{
                            margin: 0,
                            fontSize: "clamp(1.35rem,2.4vw,1.75rem)",
                            fontWeight: 900,
                            lineHeight: 1.25,
                            color: "#ffffff",
                        }}
                    >
                        Ready to start?
                    </h4>

                    <p
                        style={{
                            margin: 0,
                            maxWidth: 720,
                        }}
                    >
                        Tell us what you need — we will help you find the right caregiver.
                    </p>

                    <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                        <Link
                            to="/register"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "12px 22px",
                                borderRadius: 999,
                                background: "#ffffff",
                                color: "#4C7865",
                                textDecoration: "none",
                                fontWeight: 700,
                                boxShadow: "0 8px 26px rgba(0,0,0,0.15)",
                            }}
                        >
                            Register
                        </Link>
                    </div>
                </div>

                {/* MINI FOOTER */}
                <footer
                    style={{
                        background: "rgba(255,255,255,0.08)",
                        borderTop: "1px solid rgba(255,255,255,0.12)",
                        padding: "22px clamp(20px,4vw,48px)",
                    }}
                >
                    <div
                        style={{
                            maxWidth: 1100,
                            margin: "0 auto",
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            color: "rgba(255,255,255,0.9)",
                        }}
                    >
                        <span
                            style={{
                                fontWeight: 800,
                                color: "#fff",
                                fontSize: 16,
                            }}
                        >
                            ICare
                        </span>

                        <nav style={{ display: "flex", gap: "1.6rem", flexWrap: "wrap" }}>
                            {["Privacy", "Terms", "Contact"].map((item) => (
                                <Link
                                    key={item}
                                    to={`/${item.toLowerCase()}`}
                                    style={{
                                        color: "rgba(255,255,255,0.95)",
                                        textDecoration: "none",
                                        fontWeight: 600,
                                        borderBottom: "2px solid transparent",
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
