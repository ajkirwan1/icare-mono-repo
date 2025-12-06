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
                style={{
                    transform: "scale(1.12)",
                    objectFit: "cover",
                }}
            />

            {/* Soft Luxe Overlay — identical to homepage */}
            <div
                className={styles.heroOverlay}
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.65) 100%)",
                    backdropFilter: "blur(2px)",
                }}
            />

            {/* NAV — same styling as homepage */}
            <header
                className={styles.headerOverlay}
                style={{
                    color: "#FFF",
                    fontWeight: 900,
                    fontSize: "1.4rem",
                    letterSpacing: "-0.3px",
                    textShadow: "0 3px 12px rgba(0,0,0,0.35)",
                }}
            >
                <NavLink to="/" className={styles.brand}>
                    ICare
                </NavLink>
            </header>

            {/* CONTENT */}
            <div className={styles.content}>
                <div className={styles.inner}>
                    <div
                        className={styles.copyBlock}
                        style={{
                            transform: "translateX(-22%) scale(1.06)",
                            transformOrigin: "top left",
                            textAlign: "left",
                            width: "min(92vw,1100px)",
                            color: "#fff",
                            textShadow: "0 2px 14px rgba(0,0,0,0.35)",
                        }}
                    >

                        {/* TITLE — matched to homepage hero */}
                        <h1
                            className={styles.title}
                            style={{
                                margin: 0,
                                fontSize: "clamp(3rem,5vw,3.8rem)",
                                fontWeight: 900,
                                letterSpacing: "-0.35px",
                                lineHeight: 1.05,
                                color: "#fdfdfd",
                                textShadow: "0 2px 12px rgba(0,0,0,0.25)",
                            }}
                        >
                            Who we are
                        </h1>

                        {/* LEADS — spaced like homepage */}
                        <p
                            className={styles.lead}
                            style={{
                                fontSize: "clamp(1.25rem,1.9vw,1.55rem)",
                                lineHeight: 1.55,
                                marginTop: "1.2rem",
                                maxWidth: "600px",
                                letterSpacing: "-0.2px",
                            }}
                        >
                            <b
                                style={{
                                    fontSize: "1.55rem",
                                    fontWeight: 800,
                                    letterSpacing: "-0.3px",
                                }}
                            >
                                Fair pay for caregivers — fair prices for families.
                            </b>
                        </p>

                        <p
                            className={styles.lead}
                            style={{
                                fontSize: "clamp(1.2rem,1.8vw,1.45rem)",
                                lineHeight: 1.55,
                                maxWidth: "650px",
                                marginTop: ".2rem",
                                color: "rgba(255,255,255,0.95)",
                            }}
                        >
                            We connect people directly and remove middlemen —
                            with clarity, dignity and privacy by design.
                        </p>

                        {/* CTA — fully matched to homepage */}
                        <div className={styles.ctaRow} style={{ marginTop: "2.4rem" }}>
                            <a
                                href="/how-it-works"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    padding: ".9rem 1.4rem",
                                    borderRadius: "999px",

                                    // EARTHY CLAY — same as homepage new CTA
                                    background: "#B97A57",
                                    border: "2px solid #B97A57",
                                    color: "#fff",

                                    fontWeight: 600,
                                    fontSize: "clamp(.95rem,1.15vw,1rem)",
                                    letterSpacing: ".01em",
                                    textDecoration: "none",

                                    boxShadow: "0 6px 16px rgba(0,0,0,0.18)",
                                    transition: "all .25s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "#C89A80";
                                    e.currentTarget.style.borderColor = "#C89A80";
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                    e.currentTarget.querySelector("svg").style.transform =
                                        "translateX(3px)";
                                    e.currentTarget.querySelector("svg").style.opacity = "1";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "#B97A57";
                                    e.currentTarget.style.borderColor = "#B97A57";
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.querySelector("svg").style.transform =
                                        "translateX(0)";
                                    e.currentTarget.querySelector("svg").style.opacity = "0.95";
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
                                    style={{
                                        opacity: 0.95,
                                        transition: "transform .25s ease, opacity .25s ease",
                                    }}
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
