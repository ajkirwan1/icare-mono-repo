import React from "react";
import { Link } from "react-router";
import whoWeAreHeroSrc from "/images/heros/who-we-are.jpg";
import styles from "./how-it-works-hero.module.scss"; // optional (you can remove if not using SCSS)

export default function HowItWorksHero() {
    return (
        <section
            aria-label="How it works hero"
            style={{
                position: "relative",
                height: "clamp(520px, 72vh, 760px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                overflow: "hidden",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            {/* Background Image */}
            <img
                src={whoWeAreHeroSrc}
                alt="Care coordination background"
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "brightness(0.62) contrast(1.08) saturate(1.08)",
                }}
            />

            {/* Overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.75) 100%)",
                }}
            />

            {/* Header Navigation */}
            <header
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    padding: "1.1rem clamp(16px,4vw,36px)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    zIndex: 20,
                }}
            >
                <Link
                    to="/"
                    style={{
                        color: "#fff",
                        textDecoration: "none",
                        fontWeight: 900,
                        letterSpacing: "-0.3px",
                        fontSize: "1.25rem",
                    }}
                >
                    ICare
                </Link>

                <nav
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.75rem 1.1rem",
                        alignItems: "center",
                    }}
                >
                    {[
                        { to: "/", label: "Home" },
                        { to: "/how-it-works", label: "How it Works" },
                        { to: "/who-we-are", label: "Who We Are" },
                        { to: "/privacy", label: "Privacy" },
                        { to: "/icare-for-caregivers", label: "ICare For Caregivers" },
                        { to: "/icare-for-carereceivers", label: "ICare For Care Receivers" },
                    ].map((l) => (
                        <Link
                            key={l.to}
                            to={l.to}
                            style={{
                                color: "rgba(255,255,255,0.92)",
                                textDecoration: "none",
                                fontSize: "clamp(.9rem,1.2vw,.95rem)",
                                fontWeight: 600,
                                letterSpacing: ".01em",
                                padding: ".2rem 0",
                                textUnderlineOffset: "6px",
                                transition:
                                    "color .22s ease, text-decoration-color .22s ease, text-underline-offset .22s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = "#fff";
                                e.currentTarget.style.textDecoration = "underline";
                                e.currentTarget.style.textDecorationThickness = "2px";
                                e.currentTarget.style.textUnderlineOffset = "7px";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = "rgba(255,255,255,0.92)";
                                e.currentTarget.style.textDecoration = "none";
                            }}
                        >
                            {l.label}
                        </Link>
                    ))}
                </nav>
            </header>

            {/* HERO COPY */}
            <div
                style={{
                    position: "relative",
                    zIndex: 10,
                    width: "min(92vw, 1100px)",
                    margin: "0 auto",
                    padding: "0 clamp(16px, 4vw, 32px)",
                    color: "#fff",
                    textAlign: "left",
                    transform: "translateY(10%)",
                }}
            >
                {/* Tagline */}
                <span
                    style={{
                        display: "inline-block",
                        marginBottom: "2.4rem",
                        fontSize: ".95rem",
                        fontWeight: 700,
                        letterSpacing: ".16em",
                        textTransform: "uppercase",
                        color: "#E9F8EC",
                        padding: ".55rem 1.2rem",
                        borderRadius: 999,
                        background: "rgba(255,255,255,0.14)",
                        border: "1px solid rgba(255,255,255,0.26)",
                        backdropFilter: "blur(4px)",
                    }}
                >
                    Direct • Fair • Transparent
                </span>

                {/* Title */}
                <h1
                    style={{
                        margin: "0 0 1.6rem",
                        fontWeight: 900,
                        lineHeight: 1.03,
                        letterSpacing: "-0.5px",
                        fontSize: "clamp(2.7rem, 5vw, 3.4rem)",
                        textShadow: "0 6px 26px rgba(0,0,0,.55), 0 2px 10px rgba(0,0,0,.35)",
                    }}
                >
                    How it works
                </h1>

                {/* Body Copy */}
                <p
                    style={{
                        margin: "0 0 .5rem",
                        lineHeight: 1.68,
                        fontSize: "clamp(1.15rem,1.3vw,1.2rem)",
                        color: "rgba(255,255,255,0.96)",
                        maxWidth: "62ch",
                        fontWeight: 400,
                        textShadow: "0 2px 8px rgba(0,0,0,.35)",
                    }}
                >
                    <b>Why choose ICare instead of going through an agency?</b>
                </p>

                <p
                    style={{
                        margin: "0 0 .5rem",
                        lineHeight: 1.68,
                        fontSize: "clamp(1.15rem,1.3vw,1.2rem)",
                        color: "rgba(255,255,255,0.96)",
                        maxWidth: "62ch",
                        fontWeight: 400,
                        textShadow: "0 2px 8px rgba(0,0,0,.35)",
                    }}
                >
                    <b>We don’t charge high margins for matching or management.</b>
                </p>

                <p
                    style={{
                        margin: ".2rem 0 0",
                        lineHeight: 1.68,
                        fontSize: "clamp(1.15rem,1.3vw,1.2rem)",
                        color: "rgba(255,255,255,0.96)",
                        maxWidth: "62ch",
                        fontWeight: 400,
                        textShadow: "0 2px 8px rgba(0,0,0,.35)",
                    }}
                >
                    <b>You save money — and the caregiver earns more.</b>
                </p>
            </div>
        </section>
    );
}
