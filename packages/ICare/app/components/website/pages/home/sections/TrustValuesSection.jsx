import React from "react";

export default function TrustValuesSection() {
    const cards = [
        {
            k: "Trust",
            descShort: "Transparent terms and predictable care.",
            descFull: `Families always know what to expect — full transparency, no hidden margins and clear agreements.
You see who you are talking to, what the terms are, and how your caregiver works.
Trust isn’t built through marketing — it’s built through honest relationships between families and caregivers.`,
            img: "images/web/homepage/trust.jpg",
        },
        {
            k: "Care",
            descShort: "Warm, human support.",
            descFull: `Care is not just a service — it’s a relationship. Our caregivers focus on dignity, comfort and emotional connection.
From companionship visits to full live-in continuity, families receive genuine human support with real presence.
We focus on people first – not processes, margins or bureaucracy.`,
            img: "images/web/homepage/care.jpg",
        },
        {
            k: "Community",
            descShort: "Supportive families & caregivers.",
            descFull: `Knowledge shared between families helps everyone make better decisions and feel supported.
Our growing community connects people with similar needs, experiences and challenges — so nobody navigates care alone.
Stronger together. That’s what care should always feel like.`,
            img: "images/web/homepage/community.jpg",
        },
    ];

    const [hoverIndex, setHoverIndex] = React.useState(null);

    return (
        <section
            aria-label="Trust care and community values"
            style={{
                margin: "0 auto 8rem",
                padding: "0 clamp(20px,6vw,70px)",
                maxWidth: "1100px",
                fontFamily:
                    "Inter, system-ui, -apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
            }}
        >
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(300px,1fr))",
                    gap: "clamp(32px,4vw,48px)",
                }}
            >
                {cards.map((item, idx) => {
                    const isOpen = hoverIndex === idx;

                    return (
                        <div
                            key={item.k}
                            onMouseEnter={() => setHoverIndex(idx)}
                            onMouseLeave={() => setHoverIndex(null)}
                            style={{
                                position: "relative",
                                borderRadius: 32,
                                overflow: "hidden",
                                cursor: "pointer",
                                background: "#000",
                                boxShadow:
                                    "0 10px 30px rgba(15,23,42,0.18)",
                            }}
                        >
                            <img
                                src={item.img}
                                alt={item.k}
                                style={{
                                    width: "100%",
                                    height: "380px",
                                    objectFit: "cover",
                                    filter: isOpen
                                        ? "brightness(0.8)"
                                        : "brightness(1)",
                                    transition: "filter .45s ease",
                                }}
                            />

                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: isOpen
                                        ? "rgba(0,0,0,0.35)"
                                        : "rgba(0,0,0,0.25)",
                                }}
                            />

                            <div
                                style={{
                                    position: "absolute",
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    padding: "2.4rem",
                                    color: "#fff",
                                    display: "grid",
                                    gap: ".65rem",
                                }}
                            >
                                <strong
                                    style={{
                                        fontSize: "1.48rem",
                                        fontWeight: 800,
                                        letterSpacing: "-0.25px",
                                    }}
                                >
                                    {item.k}
                                </strong>

                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: "1.15rem",
                                        lineHeight: 1.62,
                                        opacity: isOpen ? 0.85 : 0.95,
                                    }}
                                >
                                    {item.descShort}
                                </p>

                                {!isOpen && (
                                    <span
                                        style={{
                                            fontSize: "1.04rem",
                                            textDecoration: "underline",
                                        }}
                                    >
                                        Learn more
                                    </span>
                                )}

                                <div
                                    style={{
                                        overflow: "hidden",
                                        maxHeight: isOpen ? "260px" : 0,
                                        transition:
                                            "max-height 1.3s ease",
                                    }}
                                >
                                    <p
                                        style={{
                                            margin: 0,
                                            fontSize: "1.12rem",
                                            lineHeight: 1.72,
                                        }}
                                    >
                                        {item.descFull}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
