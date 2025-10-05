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

            <section aria-label="Mission pillars" className={styles.sectionShell}>
                {[
                    {
                        t: "SIMPLE AND FREE REGISTRATION",
                        d: "Registering an account is simple, free, and safe. You only need to provide base information to create an account."

                    },
                    {
                        t: "CONTACT CLIENTS DIRECTLY",
                        d: "Contact potential clients and their families to understand care needs and family expectations before concluding a contract agreement."
                    },
                    {
                        t: "INCREASE YOUR EARNINGS",
                        d: "We listen to caregivers and families to simplify every step of the process.When you connect and agree on terms directly, there’s no middleman — just fair pay for your valuable work."
                    },
                    {
                        t: "TAILOR YOUR PROFILE",
                        d: "Upload your CV and resume, acquire background checks, and list your specialist skills to enhance your visibility and employability."
                    },
                    {
                        t: "MANAGE YOUR OWN EMPLOYMENT CONTRACTS",
                        d: "By directly contacting and arranging employment contracts."


                    }

                ].map(p => (
                    <div key={p.t} className={styles.infoCard}>
                        <h3 className={styles.infoTitle}>{p.t}</h3>
                        <p className={styles.infoP}>{p.d}</p>

                    </div>
                ))}

            </section>
            <section className="who-section" style={{ margin: "5rem auto", maxWidth: "800px", padding: "4rem 3.5rem", background: "#eee", borderRadius: "2.5rem" }}>
                <h2 style={{ color: "#33aebaff", fontSize: "1.5rem" }}>We provide a simple model in which you directly<br></br> agree
                    the terms of care with your client</h2>

                <div style={{ width: "100%", height: "3px", background: "#33aebaff" }}></div>
                <br />
                <img
                    src={userIcon}
                    width="120"
                    style={{ transform: "translate(-170%, 0)", position: "absolute" }}
                />

                <p> The ICare application for caregivers provides a unified platform to find your next care-giving role, and arrange and manage your contracts.<br />
                    <br />
                    That’s why we created a platform built on dignity, empathy, and trust — giving families peace of mind and giving caregivers the recognition they deserve.
                </p>
                <button style={{ display: "block", margin: '2.5rem auto 0' }} className={styles.primaryBtn}> REGISTER TODAY</button>
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
