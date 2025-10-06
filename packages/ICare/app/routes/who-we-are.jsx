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
                style={{
                    margin: "5rem 0",
                    marginRight: "auto",            // ⬅️ wyrównanie do lewej
                    marginLeft: "3rem",             // ⬅️ 3rem od lewej krawędzi
                    width: "clamp(320px, 36vw, 560px)",
                    maxWidth: "60ch",
                    boxSizing: "border-box",
                    paddingTop: "2.5rem",
                    paddingRight: "clamp(2rem, 5vw, 4rem)",
                    paddingBottom: "2.5rem",
                    paddingLeft: "clamp(2rem, 5vw, 4rem)",
                    background: "#eee",
                    borderRadius: "2rem",
                    textAlign: "left",
                }}
            >
                <h2 style={{ color: "#33aebaff", fontSize: "2rem", margin: 0 }}>Our Foundation</h2>

                <div
                    style={{
                        width: "100%",
                        height: "3px",
                        background: "#33aebaff",
                        marginTop: "0.75rem",
                        borderRadius: "999px",
                    }}
                />

                <p style={{ marginTop: "1rem", lineHeight: 1.6, color: "#334155" }}>
                    <span
                        style={{
                            display: "block",
                            fontSize: "clamp(12px, 2vw, 20px)",
                            lineHeight: 1.25,
                            fontWeight: 800,
                            letterSpacing: "0.6px",
                            color: "#494848ff",
                            marginBottom: "0.5rem",
                        }}
                    >
                        Finding the right care shouldn’t be overwhelming.
                    </span>
                    When a loved one’s health begins to decline, families are often left navigating
                    complicated choices — searching for the right caregiver, worrying about high costs,
                    and wondering where to even start.
                    <br />
                    At the same time, caregivers deserve respect, fair pay, and the tools they need to
                    provide safe, effective care.
                </p>

                <p style={{ marginTop: "1rem", lineHeight: 1.6, color: "#334155" }}>
                    <span
                        style={{
                            display: "block",
                            fontSize: "clamp(12px, 2vw, 20px)",
                            lineHeight: 1.25,
                            fontWeight: 800,
                            letterSpacing: "0.6px",
                            color: "#494848ff",
                            marginBottom: "0.5rem",
                        }}
                    >
                        Families naturally ask:
                    </span>
                    —— How do I begin?<br />
                    —— Does this caregiver have the right skills?<br />
                    —— Will they be fairly paid?<br />
                    —— Is my information secure?<br /><br />
                    At ICare, we’ve been there.<br /><br />
                    That’s why we created a platform built on dignity, empathy, and trust — giving families peace of mind and giving caregivers the recognition they deserve.
                </p>
            </section>

            <section
                className="who-section"
                style={{
                    position: "relative",
                    margin: "2rem 0 0 0",                       // pod spodem poprzedniej sekcji
                    // przesuń w prawo ~60% ekranu, ale nie pozwól wyjść poza krawędź
                    marginLeft: "min(60vw, calc(50vw - 540px - 24px))",
                    marginRight: 0,
                    width: "clamp(320px, 36vw, 560px)",         // czytelna szerokość
                    maxWidth: "60ch",
                    boxSizing: "border-box",
                    paddingTop: "3rem",
                    paddingRight: "clamp(2rem, 5vw, 3.5rem)",
                    paddingBottom: "3rem",
                    paddingLeft: "clamp(1rem, 6vw, 2rem)",
                    background: "#e2e8f0",
                    borderRadius: "2.5rem",
                }}
            >
                <h2 style={{ color: "#33aebaff", fontSize: "2rem", margin: 0 }}>Our mission</h2>

                <div
                    style={{
                        width: "100%",
                        height: "3px",
                        background: "#33aebaff",
                        marginTop: ".75rem",
                        borderRadius: "999px",
                    }}
                />
                <br />

                <span
                    style={{
                        display: "block",
                        fontSize: "clamp(12px, 2vw, 20px)",
                        lineHeight: 1.25,
                        fontWeight: 800,
                        letterSpacing: ".6px",
                        color: "#494848ff",
                        marginBottom: ".5rem",
                    }}
                >
                    ICare came out of real experience.
                </span>
                Our founders bring together years of expertise in both healthcare and technology —
                a unique combination that allows us to understand the challenges from every angle.
                <br /><br />
                First-hand 24/7 live-in care across Europe exposed real gaps in traditional systems — and
                drove us to build something more compassionate.
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
