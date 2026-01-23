import React from "react";
import { Link } from "react-router";

export default function ReceiversThreeStepsStyledLikeHowWeWork() {
    const steps = [
        {
            step: 1,
            title: "Choose your route: browse or request matches",
            description:
                "Browse caregiver profiles yourself, or share your needs so suitable caregivers can come to you — whichever feels easier.",
            img: "images/web/icare-for-carereceivers/browsing.png",
            alt: "Browsing caregiver profiles",
        },
        {
            step: 2,
            title: "Message and shortlist with confidence",
            description:
                "Ask questions, discuss routines and availability, and get a feel for fit — privately, before you decide.",
            img: "https://source.unsplash.com/VVEwJJRRHgk/1200x900",
            alt: "Messaging and discussing care",
        },
        {
            step: 3,
            title: "Confirm the plan and start care",
            description:
                "Agree tasks, schedule, start date and rate upfront — then begin when you’re ready, with everything clearly set out.",
            img: "https://source.unsplash.com/tV-RX0beDpY/1200x900",
            alt: "Agreeing a plan and schedule",
        },
    ];

    return (
        <section
            id="receivers-3-steps"
            aria-label="Two ways to find a caregiver"
            style={{
                width: "100%",
                background: "#fff9ef",
                padding: "8rem 0",
                fontFamily:
                    "Nunito, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <div
                style={{
                    width: "min(1100px, 92vw)",
                    margin: "0 auto",
                }}
            >
                {/* HEADING BLOCK — Curam-like: “two ways” */}
                <div style={{ maxWidth: "900px", marginBottom: "3.6rem" }}>
                    <h2
                        style={{
                            margin: 0,
                            fontWeight: 500,
                            fontSize: "2.6rem",
                            color: "#0F172A",
                            letterSpacing: "-0.5px",
                            lineHeight: 1.15,
                        }}
                    >
                        Two simple ways to find the right caregiver
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
                                Browse yourself — or get matched.
                            </strong>
                        </span>

                        <span style={{ display: "block" }}>
                            Then message privately and confirm the details before care starts — so everyone knows what to expect.
                        </span>
                    </p>
                </div>

                {/* STEPS GRID — identyczny layout jak u Ciebie */}
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
                            {/* TEXT BLOCK */}
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1.4rem",
                                }}
                            >
                                <h3
                                    style={{
                                        margin: 0,
                                        fontSize: "1.5rem",
                                        fontWeight: 600,
                                        color: "#0f172a",
                                    }}
                                >
                                    <span style={{ marginRight: "10px" }}>{s.step}.</span>
                                    {s.title}
                                </h3>

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

                            {/* IMAGE — always aligned */}
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
                                        src={s.img}
                                        alt={s.alt}
                                        loading="lazy"
                                        referrerPolicy="no-referrer"
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

                {/* CTA — bez zmian */}
                <div
                    style={{
                        marginTop: "3.6rem",
                        display: "flex",
                        gap: "14px",
                        flexWrap: "wrap",
                        alignItems: "center",
                    }}
                >
                    <Link
                        to="/signup"
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
                        Create your free account
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
                    </Link>

                    <Link
                        to="/caregivers"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "1.1rem 1.6rem",
                            borderRadius: "999px",
                            background: "rgba(255,255,255,0.72)",
                            color: "#0F172A",
                            fontWeight: 800,
                            fontSize: "1.05rem",
                            letterSpacing: ".01em",
                            textDecoration: "none",
                            border: "1px solid rgba(15,23,42,0.12)",
                        }}
                    >
                        Browse caregivers
                    </Link>
                </div>

                {/* reassurance — krótko i MVP-friendly */}
                <p
                    style={{
                        marginTop: "1.2rem",
                        color: "rgba(15,23,42,0.75)",
                        fontSize: "1.05rem",
                        lineHeight: 1.55,
                        maxWidth: "70ch",
                    }}
                >
                    Prefer not to browse? Share your needs and we’ll highlight relevant options — you still choose who to contact.
                </p>
            </div>
        </section>
    );
}
