import React, { useEffect, useRef } from "react";
import styles from "@styles/components/website/pages/who-we-are/sections/third-section.module.scss";
import { HowWeWorkCard } from "../cards/how-we-work-card";

export function HowWeWorkSection() {
    const sectionRef = useRef(null);

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

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const cards = section.querySelectorAll(".hwwCard");

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    cards.forEach((card) => card.classList.add("is-visible"));
                    observer.disconnect(); // animacja tylko raz
                }
            },
            { threshold: 0.25 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="howwework"
            aria-label="How We Work"
            ref={sectionRef}
            style={{
                width: "100%",
                background: "#f2f2f2",
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
                <div style={{ maxWidth: "1000px", marginBottom: "3.6rem" }}>
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
                        }}
                    >
                        <span style={{ display: "block", marginBottom: "0.4rem" }}>
                            <strong style={{ color: "rgb(119, 141, 67)", fontWeight: 600, fontSize: "1.5rem" }}>
                                A simple, transparent way to arrange companionship at home.
                            </strong>
                        </span>

                        <span style={{ display: "block" }}>
                            A calmer, transparent way to arrange companionship at home.
                            <br />
                            Browse verified caregiver profiles, message directly, and agree support
                            that fits your routine.
                        </span>
                    </p>
                </div>

                {/* STEPS GRID */}
                <div
                    style={{
                        display: "grid",
                        gap: "30px",
                        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    }}
                >
                    {steps.map((s) => (
                        <div
                            key={s.step}
                            className="hwwCard"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                height: "100%",
                            }}
                        >
                            <div
                                style={{
                                    marginBottom: "1rem",
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        height: "200px",
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
                                                    : "images/web/who-we-are/icare-agree-and-start.webp"
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

                            {/* ===== TEXT BLOCK ===== */}
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.5rem",
                                }}
                            >
                                {/* TITLE */}
                                <h3
                                    style={{
                                        margin: 0,
                                        fontSize: "1.3rem",
                                        fontWeight: 500,
                                        color: "#0f172a",
                                    }}
                                >
                                    <span style={{ marginRight: "10px" }}>{s.step}.</span>
                                    {s.title}
                                </h3>

                                {/* DESCRIPTION */}
                                <p
                                    style={{
                                        margin: 0,
                                        color: "#000000ff",
                                        lineHeight: 1.55,
                                        fontSize: "1.1rem",
                                    }}
                                >
                                    {s.description}
                                </p>
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

            <style>{`
        /* animation */
        .hwwCard{
          opacity: 0;
          transform: translateY(22px);
          transition:
            opacity 1.1s ease,
            transform 1.1s cubic-bezier(.22,.61,.36,1);
          will-change: opacity, transform;
        }

        .hwwCard.is-visible{
          opacity: 1;
          transform: translateY(0);
        }

        /* sekwencja 1 -> 2 -> 3 */
        .hwwCard:nth-child(1).is-visible{ transition-delay: 0ms; }
        .hwwCard:nth-child(2).is-visible{ transition-delay: 200ms; }
        .hwwCard:nth-child(3).is-visible{ transition-delay: 400ms; }

        /* accessibility */
        @media (prefers-reduced-motion: reduce){
          .hwwCard{
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
        </section>
    );
}
