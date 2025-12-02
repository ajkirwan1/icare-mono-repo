import React from "react";
import heroImage from "/images/heros/who-we-are.jpg";
import { NavLink } from "react-router";
import styles from "../../../../../styles/components/website/pages/who-we-are/sections/who-we-are-hero.module.scss";

export function WhoWeAreHero() {
    return (
        <section
            id="hero"
            className={styles.heroWrap}
            aria-label="Who We Are hero"
        >
            {/* Background */}
            <img
                src={heroImage}
                alt="Care coordination background"
                className={styles.heroImg}
            />

            {/* Soft Luxe Overlay — identical to How It Works */}
            <div className={styles.heroOverlay} />

            {/* NAV — identical styling */}
            <header className={styles.headerOverlay}>
                <NavLink to="/" className={styles.brand}>
                    ICare
                </NavLink>
            </header>

            {/* CONTENT */}
            <div className={styles.content}>
                <div className={styles.inner}>
                    <div className={styles.copyBlock}>

                        {/* BADGE — identical How It Works badge style */}
                        <span className={styles.badge}>
                            DIRECT FAIR TRANSPARENT
                        </span>

                        {/* TITLE — original text, styled like How It Works */}
                        <h1 className={styles.title}>
                            Who we are
                        </h1>

                        {/* LEAD TEXT — same text, same spacing as How It Works */}
                        <p className={styles.lead}>
                            <b>Fair pay for caregivers — fair prices for families.</b>
                        </p>

                        <p className={styles.lead}>
                            We connect people directly and remove middlemen —
                            with clarity, dignity and privacy by design.
                        </p>

                        {/* CTA — identical luxe CTA button from How It Works */}
                        <div className={styles.ctaRow}>
                            <a
                                href="/how-it-works"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    padding: "1rem 1.6rem",
                                    borderRadius: "999px",

                                    color: "#FFFFFF",
                                    background: "rgba(255,255,255,0.10)",
                                    border: "1px solid rgba(255,255,255,0.35)",

                                    fontWeight: 600,
                                    fontSize: "clamp(.95rem,1.1vw,1rem)",
                                    letterSpacing: ".02em",
                                    textDecoration: "none",

                                    transition: "all .25s ease",
                                    boxShadow: "0 8px 26px rgba(0,0,0,0.20)",
                                    backdropFilter: "blur(3px)",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "rgba(255,255,255,0.18)";
                                    e.currentTarget.style.transform = "translateY(-3px)";
                                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.26)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "rgba(255,255,255,0.10)";
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "0 8px 26px rgba(0,0,0,0.20)";
                                }}
                            >
                                How it works
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                    style={{ opacity: 0.95 }}
                                >
                                    <path d="M5 12h14" />
                                    <path d="M13 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>


                    </div>
                </div>
            </div>
        </section>

    );
}
