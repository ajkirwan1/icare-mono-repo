import React from "react";
import { Link } from "react-router";
import whoWeAreHeroSrc from "/images/heros/who-we-are.jpg";
import styles from "./how-it-works-hero.module.scss"; // optional (you can remove if not using SCSS)
import ICareNavbar from "../shared/ICareNavbar";


export default function HowItWorksHero() {
    return (
        <section
            aria-label="How it works hero"
            style={{
                position: "relative",
                height: "clamp(600px, 78vh, 880px)",
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
                    objectPosition: "50% 40%",
                    filter: "brightness(0.68) saturate(1.08) contrast(1.02)",
                    transform: "scale(1.06)", // subtle depth
                }}
            />

            {/* Luxe Film Overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.38))",
                }}
            />

            {/* Navigation */}
            <header
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    padding: "1.8rem clamp(26px,4vw,46px)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    zIndex: 20,
                    backdropFilter: "blur(1px)", // Luxe micro-blur
                }}
            >
                <ICareNavbar />
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
                    transform: "translateY(6%)",
                    animation: "fadeSlide 1.1s ease forwards",
                    opacity: 0,
                }}
            >
                {/* Title */}
                <h1
                    style={{
                        margin: "0 0 2rem",
                        fontWeight: 800,
                        lineHeight: 1.04,
                        letterSpacing: "-0.55px",
                        fontSize: "clamp(3.2rem,5.6vw,4rem)",
                        color: "#fff",
                        textShadow: "0 8px 24px rgba(0,0,0,0.45)",
                    }}
                >
                    How it works
                </h1>

                {/* Paragraphs */}
                {[
                    "Why choose ICare instead of going through an agency?",
                    "We don’t charge high margins for matching or management.",
                    "You save money — and the caregiver earns more.",
                ].map((text, i) => (
                    <p
                        key={i}
                        style={{
                            margin: i === 0 ? "0 0 1rem" : "0 0 .7rem",
                            lineHeight: 1.72,
                            fontSize: "clamp(1.18rem,1.45vw,1.32rem)",
                            maxWidth: "62ch",
                            color: "rgba(255,255,255,0.95)",
                            fontWeight: 500,
                            textShadow: "0 4px 16px rgba(0,0,0,0.4)",
                        }}
                    >
                        <b>{text}</b>
                    </p>
                ))}
            </div>

            {/* Animation */}
            <style>{`
        @keyframes fadeSlide {
            0% { opacity: 0; transform: translateY(18px); }
            100% { opacity: 1; transform: translateY(6%); }
        }
    `}</style>
        </section>

    );
}
