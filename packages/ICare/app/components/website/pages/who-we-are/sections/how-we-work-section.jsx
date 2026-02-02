import React from "react";
import styles from "@styles/components/website/pages/who-we-are/sections/third-section.module.scss";
import { HowWeWorkCard } from "../cards/how-we-work-card";

export function HowWeWorkSection() {
    const steps = [
        {
            step: 1,
            title: "Brief & preferences",
            description:
                "Share your needs, schedule and preferred skills. We only ask for information that helps you find the right match.",
            variant: "green",
        },
        {
            step: 2,
            title: "Browse & message",
            description:
                "View caregiver profiles and message people directly when you feel ready.",
            variant: "blue",
        },
        {
            step: 3,
            title: "Agree & start",
            description:
                "Discuss tasks, hours and start date directly with the caregiver. We share simple guidance to help you set clear expectations.",
            variant: "orange",
        },
    ];

    return (
        <section
            id="howwework"
            aria-label="How We Work"
            style={{
                width: "100%",
                background: "#e8e7d7",
                padding: "4rem 0",
                fontFamily:
                    "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            {/* CONTENT WRAPPER */}
            <div
                style={{
                    width: "min(1100px, 92vw)",
                    margin: "0 auto",
                }}
            >
                {/* HEADING BLOCK */}
                <div style={{ maxWidth: "720px", marginBottom: "3.6rem" }}>
                    <h2
                        style={{
                            margin: 0,
                            fontWeight: 500,
                            fontSize: "2.8rem",
                            color: "#0F172A",
                            letterSpacing: "-0.5px",
                            lineHeight: 1.15,
                        }}
                    >
                        How we work
                    </h2>

                    <p
                        style={{
                            margin: "1.2rem 0 0",
                            fontSize: "1.25rem",
                            color: "#0f172a",
                            lineHeight: 1.65,
                            maxWidth: "60ch",
                        }}
                    >
                        <span style={{ display: "block", marginBottom: "0.4rem" }}>
                            <strong style={{ fontWeight: 600, fontSize: "1.5rem" }}>
                                A simple, transparent way to arrange companionship at home.
                            </strong>
                        </span>

                        <span style={{ display: "block" }}>

                            A calmer, transparent way to arrange companionship at home.<br />
                            Browse verified caregiver profiles, message directly, and agree support that fits your routine.
                        </span>
                    </p>


                </div>

                {/* STEPS GRID */}
                <div
                    style={{
                        display: "grid",
                        gap: "clamp(34px,3vw,50px)",
                        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    }}
                >
                    {steps.map((s) => (
                        <div
                            key={s.step}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                height: "100%",
                            }}
                        >
                            {/* ===== TEXT BLOCK ===== */}
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1.4rem",
                                }}
                            >

                                {/* TITLE */}
                                <h3
                                    style={{
                                        margin: 0,
                                        fontSize: "1.5rem",
                                        fontWeight: 600,
                                        color: "#0f172a",
                                    }}
                                >
                                    <span style={{ marginRight: "10px" }}>{s.step}.</span>{s.title}
                                </h3>

                                {/* DESCRIPTION */}
                                <p
                                    style={{
                                        margin: 0,
                                        color: "#000000ff",
                                        lineHeight: 1.55,
                                        fontSize: "1.12rem",
                                    }}
                                >
                                    {s.description}
                                </p>
                            </div>

                            {/* ===== IMAGE — ALWAYS ALIGNED ===== */}
                            <div
                                style={{
                                    marginTop: "1.6rem",
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <div
                                    style={{
                                        width: "96%",
                                        height: "240px",
                                        borderRadius: "16px",
                                        overflow: "hidden",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                        background: "#f3f4f6",
                                    }}
                                >
                                    <img
                                        src={
                                            s.step === 1
                                                ? "images/web/who-we-are/brief.jpg"
                                                : s.step === 2
                                                    ? "images/web/who-we-are/directmatching.jpg"
                                                    : "images/web/who-we-are/agreed.png"
                                        }
                                        alt=""
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            display: "block",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div style={{ marginTop: "4.2rem" }}>
                    <a
                        href="/how-it-works"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "1.1rem 1.8rem",
                            borderRadius: "999px",
                            background: "#778d43",
                            color: "#fff",
                            fontWeight: 800,
                            fontSize: "1.05rem",
                            letterSpacing: ".02em",
                            textDecoration: "none",
                            boxShadow: "0 8px 22px rgba(0,0,0,0.12)",
                            transition: "all .25s ease",
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
                        >
                            <path d="M5 12h14" />
                            <path d="M13 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
