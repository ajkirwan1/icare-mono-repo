import React from "react";
import { Link } from "react-router";
import HeroComponent from "../components/hero/hero-component"
import { IcareHeroNew, IcareButton, IcarePage, IcareSection, IcareCard } from "react-library";
import iCareForCarereceiversSrc from "/images/heros/icare-for-carereceivers.jpg";
import heroImage from "/images/heros/icare-for-caregivers.jpg";
import userIcon from "/images/icons/usersignup.svg";
import navLinks from "../components/hero/nav-links";
import styles from "./icare-for-caregivers.module.scss";





export default function ICareForCaregivers() {


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
                    <h1 className={styles.title}>ICare for Caregivers</h1>
                    <p className={styles.lead}>Find care roles that suite your
                        skills and experience</p>
                    <p className={styles.lead}>Schedule and manage
                        everything in one place</p>
                    <p className={styles.lead}>Keep more of hard-earned income</p>
                    <p className={styles.lead}>Free registration - no subscription</p>


                    <div className={styles.ctaRow}>
                        <button className={styles.primaryBtn}> QUICK REGISTRATION</button>
                    </div>
                </div>
            </section>

            <section
                className="who-section"
                style={{
                    position: "relative",
                    margin: "5rem 0 5rem 14rem",      // ⬅️ stały odstęp 15rem od lewej krawędzi
                    width: "clamp(280px, 30vw, 450px)", // ~1/4–2/5 ekranu; miejsce na foto po prawej
                    boxSizing: "border-box",
                    padding: "3rem 2.6rem",
                    background: "#eee",
                    borderRadius: "2.5rem",
                    fontFamily:
                        "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                    color: "#0F172A",
                    letterSpacing: "0.2px",
                }}
            >
                <h2
                    style={{
                        color: "#33aebaff",
                        fontSize: "1.4rem",
                        margin: 0,
                        lineHeight: 1.5,
                        letterSpacing: "0.6px",
                        fontWeight: 800,
                        textRendering: "optimizeLegibility",
                    }}
                >
                    WE PROVIDE A SIMPLE MODEL IN WHICH YOU AGREE
                    THE TERMS OF CARE WITH YOUR CLIENT
                </h2>

                <div style={{ width: "100%", height: "4px", background: "#33aebaff", marginTop: "0.75rem" }} />
                <br />

                {/* Ikona — identyczna i w tym samym miejscu */}
                <img
                    src={userIcon}
                    width="140"
                    alt=""
                    style={{
                        transform: "translate(-150%, 0)",
                        position: "absolute",
                        pointerEvents: "none",
                        userSelect: "none",
                    }}
                />

                <p style={{ margin: 0, lineHeight: 1.65, fontSize: 15.5, color: "#334155" }}>
                    <b>The ICare application for caregivers provides a unified platform to find your next care-giving role,
                        and arrange and manage your contracts.
                        <br /><br />
                        That’s why we created a platform built on dignity, empathy, and trust — giving families peace of mind
                        and giving caregivers the recognition they deserve.</b>
                </p>


            </section>




            <section
                aria-label="Mission pillars"
                style={{
                    position: "relative",
                    maxWidth: 1000,
                    margin: "0 auto",
                    padding: "32px 24px",
                    fontFamily:
                        "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                }}
            >
                {/* pionowa oś */}
                <span
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        left: 32,
                        top: 24,
                        bottom: 24,
                        width: 2,
                        background: "#E6F3F5",
                    }}
                />

                {[
                    { t: "SIMPLE AND FREE REGISTRATION", d: "Registering an account is simple, free, and safe. You only need to provide base information to create an account." },
                    { t: "CONTACT CLIENTS DIRECTLY", d: "Contact potential clients and their families to understand care needs and family expectations before concluding a contract agreement." },
                    { t: "INCREASE YOUR EARNINGS", d: "We listen to caregivers and families to simplify every step of the process. When you connect and agree on terms directly, there’s no middleman — just fair pay for your valuable work." },
                    { t: "TAILOR YOUR PROFILE", d: "Upload your CV and resume, acquire background checks, and list your specialist skills to enhance your visibility and employability." },
                    { t: "MANAGE YOUR OWN EMPLOYMENT CONTRACTS", d: "By directly contacting and arranging employment contracts." },
                ].map((p, idx) => (
                    <article
                        key={p.t}
                        style={{
                            position: "relative",
                            background: "#c8bea92b",
                            border: "1px solid #D7EEF1",
                            borderRadius: 25,
                            padding: "20px 20px 20px 132px", // było 72px → 132px, miejsce na większy badge
                            boxShadow: "0 2px 2px rgba(0,0,0,0.04)",
                            boxSizing: "border-box",
                            marginBottom: 16,
                            overflow: "visible",
                        }}
                        role="article"
                        aria-label={p.t}
                    >
                        {/* NUMER BADGE x2 */}
                        <span
                            aria-hidden="true"
                            style={{
                                position: "absolute",
                                left: "15px",       // żeby środek badge nadal był na osi 32px
                                top: 10,
                                width: 72,          // było 36
                                height: 72,         // było 36
                                borderRadius: "9999px",
                                background: "#FFFFFF",
                                border: "2px solid #33AEBA",
                                display: "grid",
                                placeItems: "center",
                                fontWeight: 800,
                                fontSize: 36,       // było 16
                                color: "#0E7490",
                                letterSpacing: "0.6px",
                            }}
                        >
                            {idx + 1}
                        </span>

                        <h3
                            style={{
                                margin: 0,
                                paddingBottom: 8,
                                color: "#464647c8",
                                fontWeight: 800,
                                fontVariant: "small-caps",
                                letterSpacing: "0.8px",
                                fontSize: "clamp(18px, 2.1vw, 24px)",
                                lineHeight: 1.25,
                                borderBottom: "1px solid #E6F3F5",
                            }}
                        >
                            {p.t}
                        </h3>

                        <p
                            style={{
                                margin: "12px 0 0",
                                color: "#334155",
                                lineHeight: 1.65,
                                fontSize: 16,
                                letterSpacing: "0.2px",
                            }}
                        >
                            {p.d}
                        </p>
                    </article>
                ))}
                <button
                    style={{ display: "block", margin: "2rem auto 0" }}
                    className={styles.primaryBtn}
                >
                    REGISTER TODAY
                </button>
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
