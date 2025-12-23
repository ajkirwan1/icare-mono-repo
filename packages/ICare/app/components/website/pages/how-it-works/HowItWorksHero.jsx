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
                    transform: "scale(1.06)",
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
                    backdropFilter: "blur(1px)",
                }}
            >
                <ICareNavbar />
            </header>

            {/* HERO COPY — LEFT ANCHORED */}
            <div
                style={{
                    position: "relative",
                    zIndex: 10,
                    width: "100%",
                    padding: "0 clamp(26px,4vw,46px)",
                    color: "#fff",
                    textAlign: "left",
                    transform: "translateY(6%)",
                    animation: "fadeSlide 1.1s ease forwards",
                    opacity: 0,
                }}
            >
                <div style={{ maxWidth: "720px" }}>
                    {/* Title */}
                    <h1
                        style={{
                            margin: "0 0 1.6rem",
                            fontWeight: 850,
                            lineHeight: 1.04,
                            letterSpacing: "-0.55px",
                            fontSize: "clamp(2.2rem,5.6vw,2rem)",
                            color: "#fff",
                            textShadow: "0 8px 24px rgba(0,0,0,0.45)",
                        }}
                    >
                        How it works
                    </h1>

                    {/* Improved copy */}
                    {[
                        "Care made simple. No agency markups.",
                        "Browse. Message. Match.",
                        "Clear pricing.",
                        "Fair pay with peace of mind.",
                    ].map((line, i) => (
                        <p
                            key={i}
                            style={{
                                margin: i === 0 ? "0 0 12px" : "0 0 10px",
                                lineHeight: 1.65,
                                fontSize: "clamp(1.08rem, 1.35vw, 1.22rem)",
                                maxWidth: "62ch",
                                color: "rgba(255,255,255,0.95)",
                                fontWeight: 450,
                                textShadow: "0 4px 16px rgba(0,0,0,0.4)",
                            }}
                        >
                            {line}
                        </p>
                    ))}
                    {/* CTA */}
                    <div style={{ marginTop: "2rem" }}>
                        <button
                            type="button"
                            onClick={() => {
                                const el = document.getElementById("how-it-works-steps"); // <- ID sekcji niżej
                                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                            }}
                            style={{
                                appearance: "none",
                                border: 0,
                                cursor: "pointer",
                                background: "#b97a57",
                                color: "#ffffffff",
                                fontWeight: 700,
                                letterSpacing: "-0.2px",
                                fontSize: "1.05rem",
                                padding: "14px 22px",
                                borderRadius: "999px",
                                boxShadow:
                                    "0 14px 34px rgba(0,0,0,0.35), 0 6px 16px rgba(255,138,30,0.24)",
                                transition:
                                    "transform .18s ease, box-shadow .18s ease, filter .18s ease",
                                whiteSpace: "nowrap",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-2px)";
                                e.currentTarget.style.filter = "brightness(1.02)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.filter = "none";
                            }}
                        >

                            Get started
                        </button>
                    </div>
                </div>
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
