import React from "react";
import { Link } from "react-router";
import whoWeAreHeroSrc from "/images/heros/who-we-are.jpg";
import styles from "./how-it-works.module.scss";

export default function HowItWorks() {
    return (
        <div className={styles.page}>
            <section className={styles.heroWrap} aria-label="How it works hero">
                <img
                    src={whoWeAreHeroSrc}
                    alt="Care coordination background"
                    className={styles.heroImg}
                />
                <div className={styles.heroOverlay} />

                {/* ===== HEADER (nawigacja jako linki, spójne z hero) ===== */}
                <header className={styles.headerOverlay}>
                    <Link to="/" className={styles.brand} style={{ color: "#fff", textDecoration: "none", fontWeight: 900 }}>
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
                                    color: "rgba(255,255,255,.9)",
                                    textDecoration: "none",
                                    fontSize: "clamp(.85rem, 1.2vw, .95rem)", // mniejsze, lekkie
                                    fontWeight: 600,
                                    letterSpacing: ".01em",
                                    padding: ".2rem 0",
                                    textUnderlineOffset: "6px",
                                    transition:
                                        "color .22s ease, text-decoration-color .22s ease, text-underline-offset .22s ease",
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

                {/* ===== HERO COPY (spójnie z brand green #1FAB1F) ===== */}
                <div
                    style={{
                        position: "relative",
                        zIndex: 10,
                        width: "min(92vw, 1100px)",
                        margin: "0 auto",
                        padding: "0 clamp(16px, 4vw, 32px)",
                        color: "#fff",
                        textAlign: "left",
                        fontFamily:
                            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                    }}
                >
                    {/* eyebrow */}
                    <span
                        style={{
                            display: "inline-block",
                            marginBottom: "3.2rem",
                            marginTop: "-3.2rem",
                            fontSize: "1.12rem",
                            fontWeight: 700,
                            letterSpacing: ".12em",
                            textTransform: "uppercase",
                            color: "#EAF7EA",
                            padding: ".56rem 1.12rem",
                            borderRadius: 999,
                            background: "rgba(31,171,31,0.20)", // #1FAB1F z transparencją
                            border: "2px solid rgba(31,171,31,0.45)",
                            textShadow: "0 1px 2px rgba(0,0,0,.25)",
                        }}
                    >
                        Direct Fair Transparent
                    </span>

                    <h1
                        style={{
                            margin: "0 0 2rem",
                            fontWeight: 800,
                            lineHeight: 1.05,
                            letterSpacing: ".2px",
                            fontSize: "clamp(2.2rem, 4.4vw, 3.2rem)",
                            textShadow: "0 4px 18px rgba(0,0,0,.45), 0 2px 6px rgba(0,0,0,.35)",
                            color: "#fff",
                        }}
                    >
                        How it works
                    </h1>

                    <p
                        style={{
                            margin: ".25rem 0 0",
                            lineHeight: 1.6,
                            fontSize: "clamp(1.1rem, 1.1vw, 1.125rem)",
                            color: "rgba(255,255,255,.96)",
                            textShadow: "0 2px 8px rgba(0,0,0,.35)",
                            maxWidth: "62ch",
                        }}
                    >
                        <b>Why choose ICare instead of going through an agency?</b>
                    </p>
                    <p
                        style={{
                            margin: ".35rem 0 0",
                            lineHeight: 1.6,
                            fontSize: "clamp(1.1rem, 1.2vw, 1.125rem)",
                            color: "rgba(255,255,255,.96)",
                            textShadow: "0 2px 8px rgba(0,0,0,.35)",
                            maxWidth: "62ch",
                        }}
                    >
                        <b>Unlike traditional agencies, we don’t charge high margins for matching or management.</b>
                    </p>
                    <p
                        style={{
                            margin: ".35rem 0 0",
                            lineHeight: 1.6,
                            fontSize: "clamp(1.1rem, 1.2vw, 1.125rem)",
                            color: "rgba(255,255,255,.96)",
                            textShadow: "0 2px 8px rgba(0,0,0,.35)",
                            maxWidth: "62ch",
                        }}
                    >
                        <b>That means you save money, and the caregiver earns more.</b>
                    </p>
                </div>
            </section>

            {/* ===== MISSION PILLARS (akcenty #1FAB1F, bez gradientów) ===== */}
            <section
                aria-label="Mission pillars"
                style={{
                    margin: "4.5rem auto 3.75rem",
                    maxWidth: 1200,
                    padding: "0 clamp(16px, 4vw, 32px)",
                    fontFamily:
                        "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                }}
            >
                <h1
                    style={{
                        margin: 0,
                        textAlign: "center",
                        fontWeight: 900,
                        letterSpacing: ".2px",
                        color: "#1f2a37",
                        fontSize: "clamp(1.6rem, 3vw, 2.35rem)",
                        lineHeight: 1.2,
                    }}
                >
                    Connect directly. Save together.
                    <br />
                    <span
                        style={{
                            color: "#1FAB1F", // stały brand green
                            fontWeight: 900,
                        }}
                    >
                        Fair pay for caregivers — fair prices for families.
                    </span>
                </h1>

                <div
                    aria-hidden="true"
                    style={{
                        width: "min(820px, 92%)",
                        height: 4,
                        background: "#1FAB1F",
                        borderRadius: 999,
                        margin: "1rem auto 2.25rem",
                        opacity: 0.9,
                    }}
                />

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "clamp(16px, 2.4vw, 24px)",
                    }}
                >
                    {[
                        {
                            t: "Registration is simple and free",
                            d: "Registering an account is simple, free, and safe. You will only need to provide limited and non-sensitive information to create an account, explore our app, and connect with a caregiver or someone who needs care.",
                        },
                        {
                            t: "No other third parties or intermediaries",
                            d: "Clarity, privacy-first design, and respectful collaboration guide every decision.",
                        },
                        {
                            t: "ICare charges a 10% flat rate on contract agreement",
                            d: "Our model is based on a flat 10% fee on contractual agreements between both parties. This means you get all features of the app for free, and only pay when you earn or save.",
                        },
                    ].map((p, i) => (
                        <article
                            key={p.t}
                            style={{
                                position: "relative",
                                borderRadius: 20,
                                padding: "clamp(22px, 2.2vw, 28px)",
                                color: "#334155",
                                boxShadow: "0 10px 26px rgba(15,23,42,0.08)",
                                overflow: "hidden",
                                border: "1px solid rgba(15,23,42,0.06)",
                                background: i % 2 === 1 ? "#FAFAF7" : "#FFFFFF", // delikatny beż co druga
                            }}
                        >
                            {/* pasek akcentu po lewej */}
                            <span
                                aria-hidden="true"
                                style={{
                                    position: "absolute",
                                    inset: "0 auto 0 0",
                                    width: 6,
                                    background: "#1FAB1F",
                                    opacity: 0.9,
                                }}
                            />

                            {/* ikona (medalion) */}
                            <div
                                style={{
                                    width: 82,
                                    height: 82,
                                    borderRadius: 999,
                                    display: "grid",
                                    placeItems: "center",
                                    background: "rgba(31,171,31,0.08)",
                                    color: "#1FAB1F",
                                    border: "1px solid rgba(31,171,31,0.22)",
                                    marginBottom: "1rem",
                                }}
                            >
                                {{
                                    0: (
                                        <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true">
                                            <path
                                                d="M16 21v-1.5a4.5 4.5 0 0 0-4.5-4.5H9.5A4.5 4.5 0 0 0 5 19.5V21"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                            />
                                            <circle
                                                cx="11"
                                                cy="8"
                                                r="3.5"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            />
                                            <path
                                                d="M18 8h4M20 6v4"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    ),
                                    1: (
                                        <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true">
                                            <path
                                                d="M3 8h10M9 4l4 4-4 4"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M21 16H11M15 12l-4 4 4 4"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    ),
                                    2: (
                                        <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true">
                                            <path
                                                d="M5 11c0-3 3-5 7-5h2c4 0 7 2 7 5v2a3 3 0 0 1-3 3h-1l-.5 2h-3l.5-2H10l-.6 2H6l.8-2A3 3 0 0 1 5 13v-2z"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinejoin="round"
                                            />
                                            <circle cx="20" cy="12" r="1.2" fill="currentColor" />
                                            <path
                                                d="M10 7l1.8-1.6L12.3 8"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M11 9h4"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    ),
                                }[i]}
                            </div>

                            <h3
                                style={{
                                    margin: "0 0 .4rem",
                                    color: "#1f2a37",
                                    fontSize: "clamp(1.08rem, 2.1vw, 1.28rem)",
                                    lineHeight: 1.25,
                                    fontWeight: 800,
                                    letterSpacing: ".2px",
                                }}
                            >
                                {p.t}
                            </h3>

                            <p
                                style={{
                                    margin: 0,
                                    lineHeight: 1.65,
                                    fontSize: "clamp(.97rem, 1vw, 1rem)",
                                    color: "#334155",
                                }}
                            >
                                {p.d}
                            </p>
                        </article>
                    ))}
                </div>

                {/* CTA pod kartami — spójne zielone */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 12,
                        marginTop: "2.1rem",
                        flexWrap: "wrap",
                    }}
                >
                    <button
                        style={{
                            border: "none",
                            background: "#1FAB1F", // solid brand green
                            color: "#FFFFFF",
                            padding: ".9rem 1.35rem",
                            borderRadius: 999,
                            fontWeight: 800,
                            letterSpacing: ".4px",
                            fontSize: ".95rem",
                            boxShadow: "0 12px 28px rgba(2,8,23,.15)",
                            cursor: "pointer",
                        }}
                    >
                        Register
                    </button>
                    <button
                        style={{
                            border: "1.5px solid rgba(31,171,31,.45)",
                            background: "#fff",
                            color: "#0F172A",
                            padding: ".86rem 1.2rem",
                            borderRadius: 999,
                            fontWeight: 800,
                            letterSpacing: ".3px",
                            fontSize: ".95rem",
                            cursor: "pointer",
                        }}
                    >
                        Terms & conditions
                    </button>
                </div>
            </section>

            <footer className={styles.footer}>
                <ul className={styles.listReset}>
                    <li><Link to="/" className={styles.footerLink}>Home</Link></li>
                    <li><Link to="/landing" className={styles.footerLink}>Landing</Link></li>
                    <li><Link to="/privacy" className={styles.footerLink}>Privacy</Link></li>
                </ul>
                <div className={styles.copy}>
                    © {new Date().getFullYear()} ICare. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
