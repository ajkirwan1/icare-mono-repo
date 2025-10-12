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

                <header className={styles.headerOverlay}>
                    <Link to="/" className={styles.brand}>ICare</Link>
                    <nav className={styles.nav}>
                        {[
                            { to: "/", label: "Home" },
                            { to: "/how-it-works", label: "How it Works" },
                            { to: "/who-we-are", label: "Who We Are" },
                            { to: "/privacy", label: "Privacy" },
                            { to: "/icare-for-caregivers", label: "ICare For Caregivers" },
                            { to: "/icare-for-carereceivers", label: "ICare For Carereceivers" }
                        ].map((l) => (
                            <Link key={l.to} to={l.to} className={styles.navLink}>
                                {l.label}
                            </Link>
                        ))}
                    </nav>
                </header>

                <div
                    style={{
                        position: "relative",
                        zIndex: 10,
                        width: "min(92vw, 1100px)",     // ten sam „lewy start” co hero
                        margin: "0 auto",
                        padding: "0 clamp(16px, 4vw, 32px)",
                        color: "#fff",
                        textAlign: "left",
                        fontFamily:
                            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                    }}
                >
                    {/* Eyebrow — 20% mniejsze */}
                    <span
                        style={{
                            display: "inline-block",
                            marginBottom: "3.2rem",   // 4rem → 3.2rem
                            marginTop: "-3.2rem",     // -4rem → -3.2rem
                            fontSize: "1.12rem",      // 1.4rem → ~1.12rem (−20%)
                            fontWeight: 700,
                            letterSpacing: ".12em",
                            textTransform: "uppercase",
                            color: "#D9F3F5",
                            padding: ".56rem 1.12rem", // .7/.1.4 → .56/1.12 (−20%)
                            borderRadius: "999px",
                            background: "rgba(51,174,186,0.18)",
                            border: "2px solid rgba(51,174,186,0.45)",
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

                    {/* Lead copy */}
                    <p
                        style={{
                            margin: ".25rem 0 0",
                            lineHeight: 1.6,
                            fontSize: "clamp(1.2rem, 1.15vw, 1.125rem)",
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
                            fontSize: "clamp(1.2rem, 1.25vw, 1.125rem)",
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
                            fontSize: "clamp(1.2rem, 1.25vw, 1.125rem)",
                            color: "rgba(255,255,255,.96)",
                            textShadow: "0 2px 8px rgba(0,0,0,.35)",
                            maxWidth: "62ch",
                        }}
                    >
                        <b>That means you save money, and the caregiver earns more.</b>
                    </p>
                </div>


            </section>

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
                {/* Tytuł */}
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
                            backgroundImage:
                                "linear-gradient(90deg, #2ca0ab 0%, #33aeba 50%, #7ae0ff 100%)",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            color: "transparent",
                            WebkitTextFillColor: "transparent",
                            fontWeight: 900,
                        }}
                    >
                        Fair pay for caregivers — fair prices for families.
                    </span>
                </h1>

                {/* Akcent pod tytułem */}
                <div
                    aria-hidden="true"
                    style={{
                        width: "min(820px, 92%)",
                        height: 4,
                        background:
                            "linear-gradient(90deg, rgba(0,0,0,0), #33aeba 30%, #33aeba 70%, rgba(0,0,0,0))",
                        borderRadius: 999,
                        margin: "1rem auto 2.25rem",
                        opacity: 0.8,
                    }}
                />

                {/* Siatka kart */}
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
                            accent: "#33aeba",
                        },
                        {
                            t: "No other third parties or intermediaries",
                            d: "Clarity, privacy-first design, and respectful collaboration guide every decision.",
                            accent: "#5b7573",
                        },
                        {
                            t: "ICare charges a 10% flat rate on contract agreement",
                            d: "Our model is based on a flat 10% fee on contractual agreements between both parties. This means you get all features of the app for free, and only pay when you earn or save.",
                            accent: "#7BB7A2",
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
                                background:
                                    i % 2 === 1
                                        ? "linear-gradient(180deg, #F8F6F2 0%, #FBFAF8 100%)" // delikatny beż co druga
                                        : "linear-gradient(180deg, #F8FEFF 0%, #FFFFFF 100%)", // bardzo jasny teal
                            }}
                        >
                            {/* Subtelny pasek akcentu z lewej */}
                            <span
                                aria-hidden="true"
                                style={{
                                    position: "absolute",
                                    inset: "0 auto 0 0",
                                    width: 6,
                                    background: p.accent,
                                    opacity: 0.8,
                                }}
                            />

                            {/* Ikona w „medalionie” */}
                            <div
                                style={{
                                    width: 82,
                                    height: 82,
                                    borderRadius: 999,
                                    display: "grid",
                                    placeItems: "center",
                                    background: "rgba(15,23,42,0.04)",
                                    color: p.accent,
                                    marginBottom: "1rem",
                                }}
                            >
                                {{
                                    0: (
                                        // User + plus
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
                                        // Dwie strzałki „direct”
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
                                        // Świnka-skarbonka
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

                {/* Dolne CTA */}
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
                            background:
                                "linear-gradient(90deg, #33aeba 0%, #2ca0ab 100%)",
                            color: "#062026",
                            padding: ".9rem 1.35rem",
                            borderRadius: 999,
                            fontWeight: 800,
                            letterSpacing: ".4px",
                            fontSize: ".95rem",
                            boxShadow:
                                "0 12px 28px rgba(51,174,186,.35), inset 0 1px 0 rgba(255,255,255,.6)",
                            cursor: "pointer",
                        }}
                    >
                        Register
                    </button>
                    <button
                        style={{
                            border: "1.5px solid rgba(15,23,42,.45)",
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
