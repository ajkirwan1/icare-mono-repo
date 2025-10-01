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

                <div className={styles.content}>
                    <h1 className={styles.title}>How it works</h1>

                    <p className={styles.lead}>
                        Why choose ICare instead of going through an agency?
                    </p>
                    <p className={styles.lead}>
                        Unlike traditional agencies, we don’t charge high margins for matching or management.
                    </p>
                    <p className={styles.lead}>
                        That means you save money, and the caregiver earns more.
                    </p>


                </div>
            </section>

            <h1 className={styles.sectionTitle}>
                ICare can help bypass several agencies saving everyone money
            </h1>

            <section aria-label="Mission pillars" className={styles.sectionShell}>
                {[
                    {
                        t: "Registration is simple and free",
                        d: "Registering an account is simple, free, and safe. You will only need to provide limited and non-sensitive information to create an account, explore our app, and connect with a caregiver or someone who needs care."
                    },
                    {
                        t: "No other third parties or intermediaries",
                        d: "Clarity, privacy-first design, and respectful collaboration guide every decision."
                    },
                    {
                        t: "ICare charges a 10% flat rate on contract agreement",
                        d: "Our model is based on a flat 10% fee on contractual agreements between both parties. This means you get all features of the app for free, and only pay when you earn or save."
                    }
                ].map((p) => (
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
