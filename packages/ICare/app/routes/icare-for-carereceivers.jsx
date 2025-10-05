import React from "react";
import { Link } from "react-router";
import iCareForCarereceiversSrc from "/images/heros/icare-for-carereceivers.jpg";
import styles from "./icare-for-carereceivers.module.scss";

export default function ICareForCaregivers() {
    return (
        <div className={styles.page}>
            <section className={styles.heroWrap} aria-label="ICare for Care Receivers hero">
                <img
                    src={iCareForCarereceiversSrc}
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
                        ].map(l => (
                            <Link key={l.to} to={l.to} className={styles.navLink}>
                                {l.label}
                            </Link>
                        ))}
                    </nav>
                </header>

                <div className={styles.content}>
                    <h1 className={styles.title}>ICare for Carereceivers</h1>
                    <p className={styles.lead}>Find caregivers with skills that match your needs</p>
                    <p className={styles.lead}>Manage everything in one place</p>
                    <p className={styles.lead}>Free registration — no subscription</p>

                    <div className={styles.ctaRow}>
                        <button className={styles.primaryBtn}>MORE INFORMATION</button>
                    </div>
                </div>
            </section>

            <section
                aria-label="ICare banner"
                style={{
                    marginLeft: "calc(50% - 50vw)",
                    marginRight: "calc(50% - 50vw)",
                    width: "100vw",
                    background: "#c8bea92b",            // bardzo delikatny niebieski
                    borderTop: "1px solid #ffffffff",
                    borderBottom: "1px solid #fcfcfcff",
                    borderRadius: "25px,"
                }}
            >
                <div
                    style={{
                        maxWidth: 1400,
                        margin: "0 auto",
                        padding: "50px 40px",
                        textAlign: "center",
                        fontFamily:
                            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                    }}
                >
                    <p
                        style={{
                            margin: 0,
                            color: "#2b2b2bba",
                            fontWeight: 700,
                            fontSize: "clamp(27px, 2.5vw, 28px)",
                            letterSpacing: "0.8px",
                            lineHeight: 1.35,
                        }}
                    >
                        Whether you are managing care for yourself or a loved one
                        <span style={{ color: "#1eafafff" }}> ICare </span> simplifies the process and saves money for everyone
                    </p>
                </div>
            </section>

            <section
                aria-label="For care receivers"
                style={{
                    // full-bleed nawet wewnątrz wąskiego kontenera

                    width: "100vw",

                    background: "linear-gradient(180deg, #8bea92b, #FFFFFF 60%)",
                    padding: "72px 32px", // trochę więcej oddechu na szerokich ekranach
                }}
            >
                <div
                    style={{
                        // pełna szerokość siatki
                        width: "100%",
                        maxWidth: "none",
                        margin: "0",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                        gap: 34,
                        alignItems: "center",
                    }}
                >
                    {/* BOX: ikona + tytuł + opis + lista + CTA */}
                    <div
                        style={{
                            position: "relative",
                            background: "#FFFFFF",
                            border: "1px solid #DFE9FF",
                            borderRadius: 20,
                            padding: 32,
                            boxShadow: "0 10px 30px rgba(59,130,246,0.08)",

                        }}
                    >
                        {/* Ikona */}
                        {/* Ikona — duże minimalistyczne serce */}
                        <div
                            aria-hidden="true"
                            style={{
                                width: 90,
                                height: 90,
                                borderRadius: "50%",
                                display: "grid",
                                placeItems: "center",
                                background: "#EFF6FF",
                                border: "1px solid #dfe9ff",
                                marginBottom: 22,
                            }}
                        >
                            <svg
                                width="56"
                                height="56"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#3a7777ff"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                role="img"
                                aria-label="Heart icon"
                            >
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                        </div>


                        <h2
                            style={{
                                margin: 0,
                                color: "#3a7777ff",
                                fontWeight: 600,
                                fontFamily:
                                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                                letterSpacing: "0.3px",
                                fontSize: "clamp(28px, 2.5vw, 40px)",
                                lineHeight: 1.7,
                                paddingBottom: 16,
                                borderBottom: "1px solid #DFE9FF",
                            }}
                        >
                            FIND TRUSTED CARE IN JUST 3 QUICK STEPS
                        </h2>

                        <p
                            style={{
                                margin: "16px 0 0",
                                color: "#334155",
                                lineHeight: 1.6,
                                fontSize: 16,
                                maxWidth: 880, // czytelna długość linii na desktopie
                            }}
                        >
                            <b>Our application for caregivers provides a unified platform to find your next care-giving role, and arrange and manage your contracts. Registration is completely free and non-binding – the only cost is a one-time fee, paid only after signing an agreement with your chosen caregiver.</b>
                        </p>

                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                                margin: "20px 0 0",
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                                gap: 14,
                                color: "#0F172A",
                                fontSize: 18,
                                maxWidth: 1000,
                            }}
                        >
                            {[
                                "Browse verified caregiver profiles",
                                "Match by skills, language & availability",
                                "Secure messaging & clear pricing",
                                "Contracts and payments in one place",
                            ].map((item) => (
                                <li
                                    key={item}
                                    style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: 10,
                                        padding: 12,
                                        borderRadius: 15,
                                        background: "#c8bea92b",
                                        border: "1px solid #EEF3FF",
                                    }}
                                >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#3B82F6"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{ marginTop: 2 }}
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    <span style={{ color: "#334155", lineHeight: 1.55 }}>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div
                            style={{
                                display: "flex",
                                gap: 12,
                                marginTop: 22,
                                flexWrap: "wrap",
                            }}
                        >
                            <button
                                type="button"
                                style={{
                                    appearance: "none",
                                    border: "none",
                                    background: "#3a7777ff",
                                    color: "#FFFFFF",
                                    padding: "14px 18px",
                                    borderRadius: 25,
                                    fontWeight: 600,
                                    fontSize: 16,
                                    letterSpacing: "0.2px",
                                    cursor: "pointer",
                                    boxShadow: "0 8px 24px rgba(59,130,246,0.25)",

                                }}


                            >
                                Register with us
                            </button>

                            <button
                                type="button"
                                style={{
                                    appearance: "none",
                                    background: "#FFFFFF",
                                    color: "#0000009e",
                                    padding: "16px 20px",
                                    borderRadius: 25,
                                    fontWeight: 600,
                                    fontSize: 16,
                                    letterSpacing: "0.2px",
                                    cursor: "pointer",
                                    border: "1px solid #CFE0FF",

                                }}
                            >
                                Explore caregivers
                            </button>
                        </div>
                    </div>



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
