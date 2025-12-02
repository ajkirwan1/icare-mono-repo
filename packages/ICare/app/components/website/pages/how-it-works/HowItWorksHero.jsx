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
                height: "clamp(560px, 78vh, 840px)", // Airbnb Luxe: większe, spokojne hero
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
                    filter: "brightness(0.74) saturate(1.06)",
                }}
            />

            {/* Luxe Overlay – very soft, no blur, no gradient */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.24)", // soft, muted, premium
                }}
            />

            {/* Navigation */}
            <header
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    padding: "1.6rem clamp(24px,4vw,40px)", // Luxe: bigger breathing room
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
                        fontWeight: 900,
                        fontSize: "1.35rem",
                        letterSpacing: "-0.3px",
                        textDecoration: "none",
                    }}
                >
                    ICare
                </Link>

                <nav
                    style={{
                        display: "flex",
                        gap: "1.2rem 1.6rem", // Luxe spacing
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
                                color: "rgba(255,255,255,0.94)",
                                textDecoration: "none",
                                fontSize: "clamp(.95rem,1.2vw,1.05rem)",
                                fontWeight: 600,
                                padding: ".35rem 0",
                                transition: "opacity .2s ease",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.94")}
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
                    padding: "0 clamp(24px,4vw,32px)",
                    color: "#fff",
                    textAlign: "left",
                    transform: "translateY(10%)", // calmer
                }}
            >
                {/* Luxe ICare Badge */}
                <span
                    style={{
                        display: "inline-block",
                        marginBottom: "3rem", // Luxe big spacing
                        fontSize: ".95rem",
                        fontWeight: 700,
                        letterSpacing: ".14em",
                        textTransform: "uppercase",
                        color: "#fff",

                        padding: ".65rem 1.55rem",
                        borderRadius: 999,

                        /* ICare Green with Airbnb Luxe opacity (~20%) */
                        background: "rgba(31,171,31,0.22)",

                        border: "1px solid rgba(255,255,255,0.28)",
                    }}
                >
                    Direct • Fair • Transparent
                </span>

                {/* Title */}
                <h1
                    style={{
                        margin: "0 0 1.8rem",
                        fontWeight: 800,
                        lineHeight: 1.04,
                        letterSpacing: "-0.5px",
                        fontSize: "clamp(3rem,5.2vw,3.7rem)", // Luxe: bigger
                        color: "#fff",
                    }}
                >
                    How it works
                </h1>

                {/* Paragraphs */}
                <p
                    style={{
                        margin: "0 0 .6rem",
                        lineHeight: 1.68,
                        fontSize: "clamp(1.18rem,1.4vw,1.28rem)",
                        maxWidth: "62ch",
                        color: "rgba(255,255,255,0.96)",
                    }}
                >
                    <b>Why choose ICare instead of going through an agency?</b>
                </p>

                <p
                    style={{
                        margin: "0 0 .6rem",
                        lineHeight: 1.68,
                        fontSize: "clamp(1.18rem,1.4vw,1.28rem)",
                        maxWidth: "62ch",
                        color: "rgba(255,255,255,0.96)",
                    }}
                >
                    <b>We don’t charge high margins for matching or management.</b>
                </p>

                <p
                    style={{
                        margin: "0",
                        lineHeight: 1.68,
                        fontSize: "clamp(1.18rem,1.4vw,1.28rem)",
                        maxWidth: "62ch",
                        color: "rgba(255,255,255,0.96)",
                    }}
                >
                    <b>You save money — and the caregiver earns more.</b>
                </p>
            </div>
        </section>

    );
}
