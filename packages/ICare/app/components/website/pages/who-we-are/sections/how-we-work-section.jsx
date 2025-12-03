import React from "react";
import styles from "@styles/components/website/pages/who-we-are/sections/third-section.module.scss";
import { HowWeWorkCard } from "../cards/how-we-work-card";

export function HowWeWorkSection() {
    const steps = [
        {
            step: 1,
            title: "Brief & preferences",
            description:
                "Tell us your needs, schedule and preferred skills. We minimise data — only what’s necessary.",
            variant: "green"
        },
        {
            step: 2,
            title: "Direct matching",
            description:
                "We show verified profiles that fit your brief — you speak directly with candidates.",
            variant: "blue"
        },
        {
            step: 3,
            title: "Agree & start",
            description:
                "You agree terms directly with the caregiver. We provide guidance and safer-practice templates.",
            variant: "orange"
        }
    ];

    return (
        <section
            id="howwework"
            aria-label="How We Work"
            style={{
                width: "min(1100px, 92vw)",
                margin: "6rem auto",
                padding: "clamp(40px,5vw,60px)",
                background: "#FFFFFF",
                borderRadius: "32px",
                border: "1px solid rgba(15,23,42,0.06)",
                boxShadow: "0 12px 36px rgba(0,0,0,0.04)",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            {/* HEADING */}
            <h2
                style={{
                    margin: 0,
                    fontWeight: 900,
                    fontSize: "clamp(2rem,2.6vw,2.4rem)",
                    color: "#0F172A",
                    letterSpacing: "-0.4px",
                    textAlign: "left", // ← SPÓJNIE Z RESZTĄ
                    lineHeight: 1.14,
                }}
            >
                How We Work
            </h2>

            {/* SUBHEADING */}
            <p
                style={{
                    margin: "1rem 0 0",
                    textAlign: "left", // ← SPÓJNIE
                    fontSize: "1.15rem",
                    maxWidth: "62ch",
                    color: "#475569",
                    lineHeight: 1.65,
                    fontWeight: 400,
                }}
            >
                A clear, privacy-first process that connects families and caregivers directly.
            </p>

            {/* NO DIVIDER – REMOVED FOR MINIMALISM */}

            {/* GRID */}
            <div
                style={{
                    marginTop: "3rem", // spacing jak w Airbnb Luxe
                    display: "grid",
                    gap: "clamp(24px,2.5vw,34px)",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))",
                }}
            >
                {steps.map((s, i) => (
                    <HowWeWorkCard
                        key={s.step}
                        step={s.step}
                        title={s.title}
                        description={s.description}
                        variant={s.variant}
                    />
                ))}
            </div>

            {/* CTA WRAP */}
            <div style={{ marginTop: "3.6rem", textAlign: "left" }}>
                <a
                    href="/how-it-works"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "1rem 1.6rem",
                        borderRadius: "999px",

                        /* premium luxe CTA */
                        color: "#ffffffff",
                        background: "#0f3d20e5",
                        border: "2px solid #0f3d20e5",

                        fontWeight: 800,
                        fontSize: "clamp(1rem,1.25vw,1.05rem)",
                        letterSpacing: ".02em",
                        textDecoration: "none",

                        boxShadow: "0 10px 26px rgba(0,0,0,0.10)",
                        transition: "all .25s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#0f3d20cf";
                        e.currentTarget.style.transform = "translateY(-3px)";
                        e.currentTarget.style.boxShadow = "0 0px 0px #0f3d20e5";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#0f3d20e5";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 0px 0px #0f3d20c4";
                    }}
                >
                    Explore full process
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
                    >
                        <path d="M5 12h14" />
                        <path d="M13 5l7 7-7 7" />
                    </svg>
                </a>
            </div>
        </section>

    );
}
