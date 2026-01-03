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
            variant: "green",
        },
        {
            step: 2,
            title: "Direct matching",
            description:
                "We show verified caregiver profiles that fit your brief — you speak directly with candidates.",
            variant: "blue",
        },
        {
            step: 3,
            title: "Agree & start",
            description:
                "You agree terms directly with the caregiver. We provide guidance and safer-practice templates.",
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
                padding: "8rem 0",
                fontFamily: "open sans",
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
                            fontWeight: 900,
                            fontSize: "clamp(2.4rem,3vw,2.8rem)",
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
                            fontSize: "1.2rem",
                            color: "#0f172a",
                            lineHeight: 1.65,
                            maxWidth: "60ch",
                        }}
                    >
                        <span style={{ display: "block", marginBottom: "0.4rem" }}>
                            <strong style={{ fontWeight: 900 }}>
                                A simple, transparent way to arrange care at home.
                            </strong>
                        </span>

                        <span style={{ display: "block" }}>
                            Browse verified caregiver profiles, speak directly, and agree the right level of support — from short
                            visits to overnight or live-in care.
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
                                {/* BADGE */}
                                <div
                                    style={{
                                        width: "48px",
                                        height: "48px",
                                        borderRadius: "14px",
                                        background: "rgba(15,61,32,0.08)",
                                        color: "#0F3D20",
                                        fontWeight: 800,
                                        fontSize: "1.15rem",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {s.step}
                                </div>

                                {/* TITLE */}
                                <h3
                                    style={{
                                        margin: 0,
                                        fontSize: "1.25rem",
                                        fontWeight: 700,
                                        color: "#0f172a",
                                    }}
                                >
                                    {s.title}
                                </h3>

                                {/* DESCRIPTION */}
                                <p
                                    style={{
                                        margin: 0,
                                        color: "#0f172a",
                                        lineHeight: 1.55,
                                        fontSize: "1rem",
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
                                        width: "92%",
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
                            background: "#b97a57",
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
