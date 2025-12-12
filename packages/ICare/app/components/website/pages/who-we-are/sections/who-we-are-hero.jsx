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
            {/* BACKGROUND */}
            <img
                src={heroImage}
                alt="Care coordination background"
                className={styles.heroImg}
                style={{
                    transform: "scale(1.12)",
                    objectFit: "cover",
                }}
            />

            {/* OVERLAY — IDENTYCZNY */}
            <div
                className={styles.heroOverlay}
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.65) 100%)",
                }}
            />

            {/* NAV */}
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

            {/* ================= HERO CONTENT — APOLLO / LANDING STRUCTURE ================= */}
            <div className={styles.content}>
                <div className={styles.inner}>

                    {/* HEADER BLOCK — IDENTYCZNY JAK LANDING */}
                    <span
                        style={{
                            display: "block",
                            width: "min(92vw, 1100px)",
                            marginTop: "6rem",
                            textAlign: "left",
                            color: "#fff",
                            textShadow: "0 2px 16px rgba(0,0,0,.35)",
                            transform: "translateX(-25%) scale(1.1)",
                            transformOrigin: "top left",
                        }}
                    >
                        <h1
                            style={{
                                margin: ".35rem 0 0",
                                fontWeight: 900,
                                letterSpacing: "-0.35px",
                                lineHeight: 1.05,
                                fontSize: "clamp(3rem, 5.2vw, 4.2rem)",
                                color: "#fdfdfd",
                            }}
                        >
                            Who we are
                        </h1>
                    </span>

                    {/* ================= SUBHEADER ================= */}
                    <span
                        style={{
                            display: "block",
                            width: "min(92vw, 1100px)",
                            marginTop: "1rem",
                            textAlign: "left",
                            color: "rgba(255,255,255,.94)",
                            fontSize: "clamp(1.25rem, 2vw, 1.55rem)",
                            lineHeight: 1.55,
                            letterSpacing: "-0.25px",
                            transform: "translateX(-25%) scale(1.1)",
                            transformOrigin: "top left",
                        }}
                    >
                        <span style={{ display: "block", maxWidth: 600 }}>
                            <strong
                                style={{
                                    display: "block",
                                    marginBottom: ".35rem",
                                    fontSize: "1.55rem",
                                    fontWeight: 800,
                                    color: "#fff",
                                }}
                            >
                                Fair pay for caregivers — fair prices for families.
                            </strong>
                        </span>

                        <p
                            style={{
                                marginTop: ".4rem",
                                maxWidth: "650px",
                                color: "rgba(255,255,255,0.95)",
                            }}
                        >
                            We connect people directly and remove middlemen —
                            with clarity, dignity and privacy by design.
                        </p>

                        {/* ================= CTA — IDENTYCZNY ================= */}
                        <div
                            style={{
                                display: "flex",
                                gap: "1rem",
                                marginTop: "2.2rem",
                            }}
                        >
                            <a
                                href="/how-it-works"
                                style={{
                                    padding: ".9rem 1.4rem",
                                    borderRadius: "999px",
                                    border: "2px solid #B97A57",
                                    background: "#B97A57",
                                    color: "#fff",
                                    fontWeight: 600,
                                    letterSpacing: "-0.2px",
                                    fontSize: "clamp(1rem, 1.3vw, 1rem)",
                                    textDecoration: "none",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.55rem",
                                    transition: "all .25s ease",
                                    boxShadow: "0 6px 16px rgba(0,0,0,0.16)",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "#C89A80";
                                    e.currentTarget.style.borderColor = "#C89A80";
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "#B97A57";
                                    e.currentTarget.style.borderColor = "#B97A57";
                                    e.currentTarget.style.transform = "translateY(0)";
                                }}
                            >
                                How ICare works
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    style={{ opacity: 0.9 }}
                                >
                                    <path d="M5 12h14" />
                                    <path d="M13 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </span>
                </div>
            </div>
        </section>



    );
}
