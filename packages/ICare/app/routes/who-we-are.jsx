import React from "react";
import { Link } from "react-router";
import heroImage from "/images/heros/who-we-are.jpg";
import styles from "./who-we-are.module.scss";

const BRAND = "#1FAB1F";
const BRAND_DARK = "#146513";

export default function WhoWeAre() {
    return (
        <div className={styles.page} style={{ fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>
            {/* ===== HERO ===== */}
            <section className={styles.heroWrap} aria-label="Who We Are hero">
                {/* Tło */}
                <img
                    src={heroImage}
                    alt="Care coordination background"
                    className={styles.heroImg}
                    style={{ filter: "brightness(.78) contrast(1.06)" }}
                />
                {/* Przyciemnienie */}
                <div
                    className={styles.heroOverlay}
                    style={{
                        background:
                            "radial-gradient(80% 60% at 50% 45%, rgba(0,0,0,.25) 0%, rgba(0,0,0,.45) 55%, rgba(0,0,0,.6) 100%)",
                    }}
                />

                {/* Header (spójny z innymi: linki–tekst, underline on hover) */}
                <header className={styles.headerOverlay} style={{
                    background: "rgba(2,8,23,0.28)",
                    backdropFilter: "saturate(1.05) blur(4px)",
                    borderBottom: "1px solid rgba(255,255,255,0.14)"
                }}>
                    <Link
                        to="/"
                        className={styles.brand}
                        style={{
                            color: "#fff",
                            textDecoration: "none",
                            fontWeight: 900,
                            letterSpacing: "0.3px",
                            fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)",
                            textShadow: "0 1px 10px rgba(0,0,0,.4)"
                        }}
                    >
                        ICare
                    </Link>

                    <nav className={styles.nav} style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem 1.1rem", alignItems: "center" }}>
                        {[
                            { to: "/", label: "Home" },
                            { to: "/how-it-works", label: "How it Works" },
                            { to: "/who-we-are", label: "Who We Are" },
                            { to: "/privacy", label: "Privacy" },
                            { to: "/icare-for-caregivers", label: "ICare For Caregivers" },
                            { to: "/icare-for-carereceivers", label: "ICare For Care Receivers" }
                        ].map((l) => (
                            <Link
                                key={l.to}
                                to={l.to}
                                className={styles.navLink}
                                style={{
                                    color: "rgba(255,255,255,.9)",
                                    textDecoration: "none",
                                    fontSize: "clamp(.85rem, 1.2vw, .95rem)",
                                    fontWeight: 600,
                                    letterSpacing: ".01em",
                                    padding: ".2rem 0",
                                    textUnderlineOffset: "6px",
                                    transition: "color .22s ease, text-decoration-color .22s ease, text-underline-offset .22s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = "#fff";
                                    e.currentTarget.style.textDecoration = "underline";
                                    e.currentTarget.style.textDecorationThickness = "2px";
                                    e.currentTarget.style.textUnderlineOffset = "7px";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = "rgba(255,255,255,.9)";
                                    e.currentTarget.style.textDecoration = "none";
                                    e.currentTarget.style.textUnderlineOffset = "6px";
                                }}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>
                </header>

                {/* Treść hero – spójny „lewy start” i zielone akcenty */}
                <div
                    className={styles.content}
                    style={{
                        position: "relative",
                        zIndex: 10,
                        width: "min(92vw, 1100px)",
                        margin: "0 auto",
                        padding: "0 clamp(16px, 4vw, 32px)",
                        color: "#fff",
                        textAlign: "left"
                    }}
                >
                    {/* Eyebrow / badge */}
                    <span
                        style={{
                            display: "inline-block",
                            marginBottom: "1rem",
                            fontSize: "clamp(.84rem, 1.52vw, 1.08rem)",
                            fontWeight: 800,
                            letterSpacing: ".16em",
                            textTransform: "uppercase",
                            color: "#EAF7EA",
                            padding: ".56rem .9rem",
                            borderRadius: 999,
                            background: "rgba(31,171,31,0.20)",
                            border: "2px solid rgba(31,171,31,0.45)",
                            textShadow: "0 1px 2px rgba(0,0,0,.25)",
                        }}
                    >
                        who we are
                    </span>

                    <h1
                        className={styles.title}
                        style={{
                            margin: "0 0 .75rem",
                            fontWeight: 900,
                            lineHeight: 1.05,
                            letterSpacing: ".2px",
                            fontSize: "clamp(2.2rem, 4.4vw, 3.2rem)",
                            color: "#fff",
                            textShadow: "0 4px 18px rgba(0,0,0,.45), 0 2px 6px rgba(0,0,0,.35)",
                        }}
                    >
                        We build <span style={{ color: BRAND }}>direct</span>, fair and safe care.
                    </h1>

                    <p
                        className={styles.lead}
                        style={{
                            margin: "0 0 .35rem",
                            lineHeight: 1.6,
                            fontSize: "clamp(1.05rem, 1.25vw, 1.15rem)",
                            color: "rgba(255,255,255,.96)",
                            textShadow: "0 1px 8px rgba(0,0,0,.40)",
                            maxWidth: "62ch",
                        }}
                    >
                        <b>Fair pay for caregivers — fair prices for families.</b>
                    </p>
                    <p
                        className={styles.lead}
                        style={{
                            margin: "0 0 1.1rem",
                            lineHeight: 1.6,
                            fontSize: "clamp(1.05rem, 1.25vw, 1.15rem)",
                            color: "rgba(255,255,255,.96)",
                            textShadow: "0 1px 8px rgba(0,0,0,.40)",
                            maxWidth: "62ch",
                        }}
                    >
                        We connect people directly and remove middlemen — with clarity, dignity and privacy by design.
                    </p>

                    <div className={styles.ctaRow} style={{ display: "flex", gap: ".9rem", alignItems: "center", flexWrap: "wrap" }}>
                        <button
                            className={styles.primaryBtn}
                            style={{
                                appearance: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: ".95rem 1.25rem",
                                fontWeight: 800,
                                letterSpacing: ".4px",
                                borderRadius: 999,
                                background: BRAND,
                                color: "#fff",
                                boxShadow: "0 12px 28px rgba(2,8,23,.15)",
                                transition: "transform .18s ease, box-shadow .18s ease, filter .18s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-1px)";
                                e.currentTarget.style.filter = "saturate(1.05)";
                                e.currentTarget.style.boxShadow = "0 14px 34px rgba(2,8,23,.2)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.filter = "saturate(1)";
                                e.currentTarget.style.boxShadow = "0 12px 28px rgba(2,8,23,.15)";
                            }}
                        >
                            MORE INFORMATION
                        </button>
                        <a
                            href="/how-it-works"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                textDecoration: "none",
                                fontWeight: 800,
                                letterSpacing: ".3px",
                                fontSize: "clamp(.95rem, 1.1vw, 1rem)",
                                padding: ".7rem 1rem",
                                borderRadius: 999,
                                color: "#ffffff",
                                border: "1.5px solid rgba(255,255,255,.55)",
                                background: "rgba(255,255,255,.08)",
                                transition: "transform .18s ease, background .18s ease, border-color .18s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-1px)";
                                e.currentTarget.style.borderColor = "#fff";
                                e.currentTarget.style.background = "rgba(255,255,255,.14)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.borderColor = "rgba(255,255,255,.55)";
                                e.currentTarget.style.background = "rgba(255,255,255,.08)";
                            }}
                        >
                            How it works
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M5 12h14" />
                                <path d="M13 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            {/* ===== SECTION: Our Foundation (zielone akcenty) ===== */}
            <section
                className="who-section"
                aria-labelledby="foundation-title"
                style={{
                    position: "relative",
                    margin: "5rem 0",
                    marginLeft: "clamp(1rem, 6vw, 3rem)",
                    width: "clamp(340px, 46vw, 640px)",
                    maxWidth: "60ch",
                }}
            >
                {/* zielona poświata */}
                <span
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        left: "-12%",
                        top: "-14%",
                        width: 360,
                        height: 180,
                        borderRadius: "50%",
                        background: "radial-gradient(closest-side, rgba(31,171,31,.14), rgba(31,171,31,0) 70%)",
                        filter: "blur(10px)",
                        pointerEvents: "none",
                    }}
                />
                {/* karta */}
                <div
                    style={{
                        position: "relative",
                        background: "linear-gradient(180deg, #FFFFFF 0%, #FAFEFF 100%)",
                        border: "1px solid #E4F3E6",
                        borderRadius: "28px",
                        padding: "clamp(2rem, 3.5vw, 3rem)",
                        boxShadow: "0 12px 36px rgba(2,8,23,0.06)",
                        textAlign: "left",
                        zIndex: 1,
                    }}
                >
                    <h2
                        id="foundation-title"
                        style={{
                            margin: 0,
                            color: "#0F172A",
                            fontWeight: 900,
                            fontSize: "clamp(1.6rem, 2.6vw, 2.1rem)",
                            letterSpacing: ".2px",
                            lineHeight: 1.2,
                        }}
                    >
                        Our Foundation
                    </h2>
                    {/* akcentowa linia */}
                    <div
                        aria-hidden="true"
                        style={{
                            width: "100%",
                            height: 4,
                            background: BRAND,
                            borderRadius: 999,
                            marginTop: ".8rem",
                            marginBottom: "1.1rem",
                            opacity: .9
                        }}
                    />
                    <p style={{ marginTop: 0, lineHeight: 1.75, color: "#334155", fontSize: "clamp(1rem, 1.05vw, 1.06rem)" }}>
                        <span style={{ display: "block", fontWeight: 800, color: "#475569", marginBottom: ".5rem" }}>
                            Finding the right care shouldn’t be overwhelming.
                        </span>
                        When a loved one’s health begins to decline, families are often left navigating complicated choices —
                        searching for the right caregiver, worrying about high costs, and wondering where to even start. At the same
                        time, caregivers deserve respect, fair pay, and the tools they need to provide safe, effective care.
                    </p>

                    <div style={{ marginTop: "1rem", lineHeight: 1.75, color: "#334155", fontSize: "clamp(1rem, 1.05vw, 1.06rem)" }}>
                        <span style={{ display: "block", fontWeight: 800, color: "#475569", marginBottom: ".6rem" }}>
                            Families naturally ask:
                        </span>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: ".5rem" }}>
                            {["How do I begin?", "Does this caregiver have the right skills?", "Will they be fairly paid?", "Is my information secure?"].map((q) => (
                                <li key={q} style={{ display: "flex", alignItems: "flex-start", gap: ".6rem" }}>
                                    <span
                                        aria-hidden="true"
                                        style={{
                                            flexShrink: 0, width: 18, height: 18, borderRadius: "999px",
                                            border: `2px solid ${BRAND}`, display: "inline-grid", placeItems: "center", marginTop: 2,
                                        }}
                                    >
                                        <span style={{ width: 8, height: 8, borderRadius: "999px", background: BRAND, display: "block" }} />
                                    </span>
                                    <span>{q}</span>
                                </li>
                            ))}
                        </ul>

                        <p style={{ margin: "1rem 0 0 0" }}>
                            <b>At ICare, we’ve been there.</b>
                            <br />
                            That’s why we created a platform built on dignity, empathy, and trust — giving families peace of mind and
                            giving caregivers the recognition they deserve.
                        </p>
                    </div>
                </div>
            </section>

            {/* ===== SECTION: Our Mission (lustrzane ułożenie, te same zielone akcenty) ===== */}
            <section
                className="who-section"
                aria-labelledby="mission-title"
                style={{
                    position: "relative",
                    margin: "2rem 0 0 0",
                    marginLeft: "min(58vw, calc(100vw - 3rem - 640px))",
                    width: "clamp(340px, 46vw, 640px)",
                    maxWidth: "60ch",
                }}
            >
                <span
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        right: "-12%",
                        top: "-14%",
                        width: 360,
                        height: 180,
                        borderRadius: "50%",
                        background: "radial-gradient(closest-side, rgba(31,171,31,.14), rgba(31,171,31,0) 70%)",
                        filter: "blur(10px)",
                        pointerEvents: "none",
                    }}
                />
                <div
                    style={{
                        position: "relative",
                        background: "linear-gradient(180deg, #FFFFFF 0%, #FAFEFF 100%)",
                        border: "1px solid #E4F3E6",
                        borderRadius: "28px",
                        padding: "clamp(2rem, 3.5vw, 3rem)",
                        boxShadow: "0 12px 36px rgba(2,8,23,0.06)",
                        textAlign: "left",
                        zIndex: 1,
                    }}
                >
                    <h2
                        id="mission-title"
                        style={{
                            margin: 0,
                            color: "#0F172A",
                            fontWeight: 900,
                            fontSize: "clamp(1.6rem, 2.6vw, 2.1rem)",
                            letterSpacing: ".2px",
                            lineHeight: 1.2,
                        }}
                    >
                        Our Mission
                    </h2>

                    <div
                        aria-hidden="true"
                        style={{
                            width: "100%",
                            height: 4,
                            background: BRAND,
                            borderRadius: 999,
                            marginTop: ".8rem",
                            marginBottom: "1.1rem",
                            opacity: .9
                        }}
                    />

                    <p style={{ marginTop: 0, lineHeight: 1.75, color: "#334155", fontSize: "clamp(1rem, 1.05vw, 1.06rem)" }}>
                        <span style={{ display: "block", fontWeight: 800, color: "#475569", marginBottom: ".6rem" }}>
                            ICare came out of real experience.
                        </span>
                        Our founders bring together years of expertise in both healthcare and technology — a unique combination that
                        allows us to understand the challenges from every angle.
                    </p>

                    <p style={{ marginTop: "1rem", lineHeight: 1.75, color: "#334155", fontSize: "clamp(1rem, 1.05vw, 1.06rem)" }}>
                        First-hand 24/7 live-in care across Europe exposed real gaps in traditional systems — and drove us to build
                        something more compassionate.
                    </p>
                </div>
            </section>
            {/* ===== VALUES ===== */}
            <section
                aria-label="ICare values"
                style={{
                    maxWidth: 1100,
                    margin: "4rem auto 0",
                    padding: "0 clamp(16px,4vw,32px)",
                    fontFamily:
                        "Inter, system-ui, -apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
                }}
            >
                <h2
                    style={{
                        margin: 0,
                        fontWeight: 900,
                        letterSpacing: ".2px",
                        color: "#0F172A",
                        fontSize: "clamp(1.6rem,3vw,2.1rem)",
                        lineHeight: 1.2,
                        textAlign: "left",
                    }}
                >
                    Our values
                </h2>
                <div
                    aria-hidden="true"
                    style={{
                        width: 180,
                        height: 4,
                        background: "#1FAB1F",
                        borderRadius: 999,
                        margin: ".75rem 0 1.75rem",
                        opacity: .9,
                    }}
                />
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
                        gap: "clamp(14px,2.4vw,22px)",
                    }}
                >
                    {[
                        {
                            t: "Dignity & respect",
                            d: "We put people first — families and caregivers — in every choice we make.",
                        },
                        {
                            t: "Privacy by design",
                            d: "Data minimization, clear controls, and secure processes from day one.",
                        },
                        {
                            t: "Fair & transparent",
                            d: "Simple pricing and no hidden fees. Everyone knows where they stand.",
                        },
                        {
                            t: "Trust & safety",
                            d: "Verified profiles, guidance, and safer matching practices.",
                        },
                    ].map((card) => (
                        <article
                            key={card.t}
                            style={{
                                position: "relative",
                                borderRadius: 18,
                                background: "#FFFFFF",
                                border: "1px solid rgba(15,23,42,0.08)",
                                boxShadow: "0 10px 26px rgba(2,8,23,.06)",
                                padding: "clamp(18px,2vw,22px)",
                                color: "#334155",
                                overflow: "hidden",
                            }}
                        >
                            {/* lewy pasek akcentu */}
                            <span
                                aria-hidden="true"
                                style={{
                                    position: "absolute",
                                    inset: "0 auto 0 0",
                                    width: 6,
                                    background: "#1FAB1F",
                                    opacity: .9,
                                }}
                            />
                            {/* ikona (kółko) */}
                            <div
                                style={{
                                    width: 64,
                                    height: 64,
                                    borderRadius: "999px",
                                    display: "grid",
                                    placeItems: "center",
                                    background: "rgba(31,171,31,.08)",
                                    border: "1px solid rgba(31,171,31,.22)",
                                    color: "#1FAB1F",
                                    marginBottom: 12,
                                    fontWeight: 900,
                                }}
                                aria-hidden="true"
                            >
                                ✓
                            </div>

                            <h3
                                style={{
                                    margin: "0 0 .35rem",
                                    color: "#0F172A",
                                    fontWeight: 800,
                                    letterSpacing: ".2px",
                                    fontSize: "clamp(1.05rem,2vw,1.22rem)",
                                    lineHeight: 1.22,
                                }}
                            >
                                {card.t}
                            </h3>
                            <p style={{ margin: 0, lineHeight: 1.65, fontSize: ".98rem" }}>{card.d}</p>
                        </article>
                    ))}
                </div>
            </section>
            {/* ===== MEET THE TEAM ===== */}
            <section
                aria-label="Meet the team"
                style={{
                    maxWidth: 1100,
                    margin: "3.5rem auto 0",
                    padding: "0 clamp(16px,4vw,32px)",
                    fontFamily:
                        "Inter, system-ui, -apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
                }}
            >
                <h2
                    style={{
                        margin: 0,
                        fontWeight: 900,
                        letterSpacing: ".2px",
                        color: "#0F172A",
                        fontSize: "clamp(1.6rem,3vw,2.1rem)",
                        lineHeight: 1.2,
                    }}
                >
                    Meet the team
                </h2>
                <div
                    aria-hidden="true"
                    style={{
                        width: 200,
                        height: 4,
                        background: "#1FAB1F",
                        borderRadius: 999,
                        margin: ".75rem 0 1.75rem",
                        opacity: .9,
                    }}
                />
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                        gap: "clamp(14px,2.4vw,22px)",
                    }}
                >
                    {[
                        { n: "Alex Nowak", r: "Co-founder, Product", img: null },
                        { n: "Marta Zielińska", r: "Co-founder, Care Ops", img: null },
                        { n: "Kasia Wiśniewska", r: "Community & Trust", img: null },
                        { n: "Piotr Lewandowski", r: "Engineering", img: null },
                    ].map((p) => (
                        <figure
                            key={p.n}
                            style={{
                                margin: 0,
                                borderRadius: 16,
                                background: "#FFFFFF",
                                border: "1px solid rgba(15,23,42,0.08)",
                                boxShadow: "0 10px 26px rgba(2,8,23,.06)",
                                padding: 16,
                                display: "grid",
                                gap: 10,
                                alignContent: "start",
                            }}
                        >
                            <div
                                style={{
                                    width: "100%",
                                    aspectRatio: "1/1",
                                    borderRadius: 12,
                                    background:
                                        "linear-gradient(180deg, rgba(31,171,31,.10), rgba(31,171,31,.04))",
                                    border: "1px solid rgba(31,171,31,.22)",
                                    display: "grid",
                                    placeItems: "center",
                                    color: "#1FAB1F",
                                    fontWeight: 900,
                                }}
                                aria-label={`${p.n} avatar`}
                            >
                                {p.img ? (
                                    <img
                                        src={p.img}
                                        alt={`${p.n} portrait`}
                                        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 12 }}
                                    />
                                ) : (
                                    <span aria-hidden="true" style={{ fontSize: "1.6rem" }}>IC</span>
                                )}
                            </div>
                            <figcaption>
                                <div style={{ fontWeight: 900, color: "#0F172A" }}>{p.n}</div>
                                <div style={{ color: "#475569", fontSize: ".95rem" }}>{p.r}</div>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </section>
            {/* ===== PRIVACY COMMITMENT ===== */}
            <section
                aria-label="Our commitment to privacy"
                style={{
                    maxWidth: 1100,
                    margin: "3.5rem auto 0",
                    padding: "0 clamp(16px,4vw,32px)",
                    fontFamily:
                        "Inter, system-ui, -apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
                }}
            >
                <div
                    style={{
                        border: "1px solid rgba(31,171,31,.22)",
                        background: "rgba(31,171,31,.06)",
                        borderRadius: 16,
                        padding: "clamp(16px,2vw,22px)",
                        display: "grid",
                        gap: 10,
                    }}
                >
                    <h3
                        style={{
                            margin: 0,
                            color: "#0F172A",
                            fontWeight: 900,
                            fontSize: "clamp(1.1rem,2vw,1.25rem)",
                        }}
                    >
                        Our commitment to privacy
                    </h3>
                    <ul style={{ margin: 0, paddingLeft: "1.1rem", color: "#334155", lineHeight: 1.7 }}>
                        <li>Data minimization & clear consent.</li>
                        <li>Secure storage and restricted access.</li>
                        <li>Tools to view, export and delete your data (DSAR).</li>
                    </ul>
                    <div style={{ marginTop: 6 }}>
                        <Link
                            to="/privacy"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                textDecoration: "none",
                                fontWeight: 800,
                                letterSpacing: ".3px",
                                fontSize: ".95rem",
                                padding: ".65rem .95rem",
                                borderRadius: 999,
                                color: "#fff",
                                background: "#1FAB1F",
                                border: "1px solid rgba(31,171,31,.35)",
                                boxShadow: "0 10px 24px rgba(2,8,23,.12)",
                            }}
                        >
                            Read our Privacy Policy
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M5 12h14" />
                                <path d="M13 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
            {/* ===== CONTACT CTA ===== */}
            <section
                aria-label="Contact us"
                style={{
                    margin: "3.5rem 0 4.5rem",
                    padding: "0 clamp(16px,4vw,32px)",
                    fontFamily:
                        "Inter, system-ui, -apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
                }}
            >
                <div
                    style={{
                        maxWidth: 1100,
                        margin: "0 auto",
                        borderRadius: 18,
                        border: "1px solid rgba(31,171,31,.22)",
                        background: "#FFFFFF",
                        boxShadow: "0 12px 28px rgba(2,8,23,.06)",
                        padding: "clamp(18px,2vw,26px)",
                        display: "grid",
                        gap: 10,
                        alignItems: "center",
                    }}
                >
                    <h3
                        style={{
                            margin: 0,
                            color: "#0F172A",
                            fontWeight: 900,
                            fontSize: "clamp(1.2rem,2.4vw,1.6rem)",
                        }}
                    >
                        Want to learn more or partner with us?
                    </h3>
                    <p style={{ margin: 0, color: "#334155", lineHeight: 1.65 }}>
                        We’re happy to talk. Tell us about your needs — we’ll get back within 1–2 business days.
                    </p>
                    <div style={{ display: "flex", gap: 12, marginTop: 6, flexWrap: "wrap" }}>
                        <a
                            href="mailto:hello@icare.example"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                textDecoration: "none",
                                fontWeight: 800,
                                letterSpacing: ".3px",
                                fontSize: ".95rem",
                                padding: ".75rem 1.1rem",
                                borderRadius: 999,
                                color: "#fff",
                                background: "#1FAB1F",
                                border: "1px solid rgba(31,171,31,.35)",
                                boxShadow: "0 10px 24px rgba(2,8,23,.12)",
                            }}
                        >
                            Email us
                        </a>
                        <Link
                            to="/how-it-works"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                textDecoration: "none",
                                fontWeight: 800,
                                letterSpacing: ".3px",
                                fontSize: ".95rem",
                                padding: ".75rem 1.1rem",
                                borderRadius: 999,
                                color: "#0F172A",
                                background: "#FFFFFF",
                                border: "1.5px solid rgba(31,171,31,.45)",
                            }}
                        >
                            Explore how it works
                        </Link>
                    </div>
                </div>
            </section>


            {/* ===== STOPKA ===== */}
            <footer className={styles.footer} style={{ borderTop: "1px solid #e2e8f0", background: "#fff" }}>
                <ul className={styles.listReset} style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", gap: ".75rem", flexWrap: "wrap", justifyContent: "center" }}>
                    <li><Link to="/" className={styles.footerLink} style={{ textDecoration: "none", color: BRAND_DARK }}>Home</Link></li>
                    <li><Link to="/landing" className={styles.footerLink} style={{ textDecoration: "none", color: BRAND_DARK }}>Landing</Link></li>
                    <li><Link to="/privacy" className={styles.footerLink} style={{ textDecoration: "none", color: BRAND_DARK }}>Privacy</Link></li>
                </ul>
                <div className={styles.copy} style={{ marginTop: ".75rem", textAlign: "center", color: "#64748b" }}>
                    © {new Date().getFullYear()} ICare. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
