import React from "react";
import { Link } from "react-router";
import whoWeAreHeroSrc from "/images/heros/who-we-are.jpg";
import { IcareCard, IcarePage, IcareSection } from "react-library";
import HeroComponent from "../components/hero/hero-component";
import heroImage from "/images/heros/who-we-are.jpg";
import styles from "./who-we-are.module.scss";

export default function WhoWeAre() {

    return (

        <div className={styles.page}>
            <section className={styles.heroWrap} aria-label="ICare for Care Receivers hero">
                <img
                    src={heroImage}
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
                    <h1 className={styles.title}>Who we are</h1>
                    <p className={styles.lead}>Find caregivers with skills that match your needs</p>
                    <p className={styles.lead}>Manage everything in one place</p>
                    <p className={styles.lead}>Free registration — no subscription</p>

                    <div className={styles.ctaRow}>
                        <button className={styles.primaryBtn}>MORE INFORMATION</button>
                    </div>
                </div>
            </section>

            <section
                className="who-section"
                aria-labelledby="foundation-title"
                style={{
                    position: "relative",
                    margin: "5rem 0",
                    marginRight: "auto",
                    marginLeft: "3rem",
                    width: "clamp(340px, 40vw, 620px)",
                    maxWidth: "60ch",
                    boxSizing: "border-box",
                    fontFamily:
                        "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                }}
            >
                {/* subtelne tło/glow za kartą */}
                <span
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        left: "-12%",
                        top: "-14%",
                        width: 360,
                        height: 180,
                        borderRadius: "50%",
                        background:
                            "radial-gradient(closest-side, rgba(51,174,186,.14), rgba(51,174,186,0) 70%)",
                        filter: "blur(10px)",
                        pointerEvents: "none",
                    }}
                />

                {/* karta treści */}
                <div
                    style={{
                        position: "relative",
                        background: "linear-gradient(180deg, #FFFFFF 0%, #FAFEFF 100%)",
                        border: "1px solid #D7EEF1",
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

                    {/* akcentowa linia pod nagłówkiem */}
                    <div
                        aria-hidden="true"
                        style={{
                            width: "100%",
                            height: 6,
                            background:
                                "linear-gradient(90deg, #33aeba 0%, rgba(51,174,186,.25) 100%)",
                            borderRadius: 999,
                            marginTop: ".8rem",
                            marginBottom: "1.1rem",
                        }}
                    />

                    <p
                        style={{
                            marginTop: 0,
                            lineHeight: 1.75,
                            color: "#334155",
                            fontSize: "clamp(1rem, 1.05vw, 1.06rem)",
                        }}
                    >
                        <span
                            style={{
                                display: "block",
                                fontSize: "clamp(.9rem, 1.2vw, 1.05rem)",
                                lineHeight: 1.25,
                                fontWeight: 800,
                                letterSpacing: ".6px",
                                color: "#475569",
                                marginBottom: ".5rem",
                            }}
                        >
                            Finding the right care shouldn’t be overwhelming.
                        </span>
                        When a loved one’s health begins to decline, families are often left
                        navigating complicated choices — searching for the right caregiver,
                        worrying about high costs, and wondering where to even start.
                        <br />
                        At the same time, caregivers deserve respect, fair pay, and the tools
                        they need to provide safe, effective care.
                    </p>

                    <div
                        style={{
                            marginTop: "1rem",
                            lineHeight: 1.75,
                            color: "#334155",
                            fontSize: "clamp(1rem, 1.05vw, 1.06rem)",
                        }}
                    >
                        <span
                            style={{
                                display: "block",
                                fontSize: "clamp(.9rem, 1.2vw, 1.05rem)",
                                lineHeight: 1.25,
                                fontWeight: 800,
                                letterSpacing: ".6px",
                                color: "#475569",
                                marginBottom: ".6rem",
                            }}
                        >
                            Families naturally ask:
                        </span>

                        {/* lista pytań – spójna z resztą UI */}
                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                                display: "grid",
                                gap: ".5rem",
                            }}
                        >
                            {[
                                "How do I begin?",
                                "Does this caregiver have the right skills?",
                                "Will they be fairly paid?",
                                "Is my information secure?",
                            ].map((q) => (
                                <li
                                    key={q}
                                    style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: ".6rem",
                                    }}
                                >
                                    <span
                                        aria-hidden="true"
                                        style={{
                                            flexShrink: 0,
                                            width: 18,
                                            height: 18,
                                            borderRadius: "999px",
                                            border: "2px solid #33aeba",
                                            display: "inline-grid",
                                            placeItems: "center",
                                            marginTop: "2px",
                                        }}
                                    >
                                        <span
                                            style={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: "999px",
                                                background: "#33aeba",
                                                display: "block",
                                            }}
                                        />
                                    </span>
                                    <span>{q}</span>
                                </li>
                            ))}
                        </ul>

                        <p style={{ margin: "1rem 0 0 0" }}>
                            <b>At ICare, we’ve been there.</b>
                            <br />
                            That’s why we created a platform built on dignity, empathy, and trust —
                            giving families peace of mind and giving caregivers the recognition they
                            deserve.
                        </p>
                    </div>
                </div>
            </section>


            <section
                className="who-section"
                aria-labelledby="mission-title"
                style={{
                    position: "relative",
                    margin: "2rem 0 0 0",
                    /* dosuń w prawo, ale nie wyjedź poza krawędź (3rem marginesu od prawej) */
                    marginLeft: "min(58vw, calc(100vw - 3rem - 620px))",
                    marginRight: 0,
                    width: "clamp(340px, 40vw, 620px)",
                    maxWidth: "60ch",
                    boxSizing: "border-box",
                    fontFamily:
                        "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                }}
            >
                {/* delikatna poświata jak w Foundation */}
                <span
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        right: "-12%",
                        top: "-14%",
                        width: 360,
                        height: 180,
                        borderRadius: "50%",
                        background:
                            "radial-gradient(closest-side, rgba(51,174,186,.14), rgba(51,174,186,0) 70%)",
                        filter: "blur(10px)",
                        pointerEvents: "none",
                    }}
                />

                {/* karta */}
                <div
                    style={{
                        position: "relative",
                        background: "linear-gradient(180deg, #FFFFFF 0%, #FAFEFF 100%)",
                        border: "1px solid #D7EEF1",
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
                        Our mission
                    </h2>

                    {/* akcentowa linia */}
                    <div
                        aria-hidden="true"
                        style={{
                            width: "100%",
                            height: 6,
                            background:
                                "linear-gradient(90deg, #33aeba 0%, rgba(51,174,186,.25) 100%)",
                            borderRadius: 999,
                            marginTop: ".8rem",
                            marginBottom: "1.1rem",
                        }}
                    />

                    <p
                        style={{
                            marginTop: 0,
                            lineHeight: 1.75,
                            color: "#334155",
                            fontSize: "clamp(1rem, 1.05vw, 1.06rem)",
                        }}
                    >
                        <span
                            style={{
                                display: "block",
                                fontSize: "clamp(.9rem, 1.2vw, 1.05rem)",
                                lineHeight: 1.25,
                                fontWeight: 800,
                                letterSpacing: ".6px",
                                color: "#475569",
                                marginBottom: ".6rem",
                            }}
                        >
                            ICare came out of real experience.
                        </span>
                        Our founders bring together years of expertise in both healthcare and
                        technology — a unique combination that allows us to understand the
                        challenges from every angle.
                    </p>

                    <p
                        style={{
                            marginTop: "1rem",
                            lineHeight: 1.75,
                            color: "#334155",
                            fontSize: "clamp(1rem, 1.05vw, 1.06rem)",
                        }}
                    >
                        First-hand 24/7 live-in care across Europe exposed real gaps in
                        traditional systems — and drove us to build something more compassionate.
                    </p>
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
        </div >


    );
}
