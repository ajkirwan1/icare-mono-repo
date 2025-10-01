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
                        <button className={styles.primaryBtn}>More information</button>
                    </div>
                </div>
            </section>

            <section aria-label="Mission pillars" className={styles.sectionShell}>
                {[
                    {
                        t: "FOR FAMILIES",
                        d: "Faster answers, dependable caregivers, and smoother coordination — so families can focus on what matters most.."
                    },
                    {
                        t: "PRINCIPLES",
                        d: "Clarity, privacy-first design, and respectful collaboration guide every decision."
                    },
                    {
                        t: "CRAFT",
                        d: "We iterate with real-world feedback to make workflows lighter and more intuitive."
                    },
                    {
                        t: "IMPACT",
                        d: "Better coordination means fewer delays, less stress, and improved outcomes."
                    }
                ].map(p => (
                    <div key={p.t} className={styles.infoCard}>
                        <h3 className={styles.infoTitle}>{p.t}</h3>
                        <p className={styles.infoP}>{p.d}</p>
                    </div>
                ))}
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
