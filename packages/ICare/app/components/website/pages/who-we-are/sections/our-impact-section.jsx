import React, { useState } from "react";

export function OurImpactSection() {
    const items = [
        {
            title: "Transparent care choices",
            desc: "Families see real caregiver profiles — experience, availability and care style — before starting a conversation.",
        },
        {
            title: "Direct communication",
            desc: "Private messaging without agencies or intermediaries deciding for either side.",
        },
        {
            title: "Fair, clear agreements",
            desc: "Care details, schedules and rates are agreed openly between families and caregivers.",
        },
        {
            title: "Freedom on both sides",
            desc: "Caregivers choose who they work with. Families choose who supports their home.",
        },
    ];

    const [open, setOpen] = useState(0);

    return (
        <section
            id="impact"
            aria-label="Our impact"
            style={{
                width: "100%",
                background: "#bfc09c",
                padding: "clamp(4.4rem, 7vw, 6.2rem) 0",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <div
                style={{
                    width: "min(1180px, 92vw)",
                    margin: "0 auto",
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1.1fr",
                        gap: "clamp(2.6rem, 5vw, 4.2rem)",
                        alignItems: "stretch",
                    }}
                >
                    {/* ================= LEFT — ACCORDION ================= */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            maxWidth: "52ch",
                        }}
                    >
                        <header style={{ marginBottom: "1.8rem" }}>
                            <h2
                                style={{
                                    margin: 0,
                                    fontWeight: 800,
                                    fontSize: "clamp(1.9rem, 2.6vw, 2.2rem)",
                                    color: "#000",
                                    letterSpacing: "-0.35px",
                                }}
                            >
                                How ICare changes home care
                            </h2>
                        </header>

                        <div style={{ display: "grid", gap: "1rem" }}>
                            {items.map((item, i) => {
                                const isOpen = open === i;

                                return (
                                    <div
                                        key={item.title}
                                        style={{
                                            borderBottom: "1px solid rgba(0,0,0,0.35)",
                                            paddingBottom: ".85rem",
                                        }}
                                    >
                                        <button
                                            onClick={() => setOpen(isOpen ? null : i)}
                                            style={{
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                background: "transparent",
                                                border: "none",
                                                padding: 0,
                                                cursor: "pointer",
                                                textAlign: "left",
                                                color: "#000",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize: "1.05rem",
                                                    fontWeight: 600,
                                                    letterSpacing: "-0.15px",
                                                }}
                                            >
                                                {item.title}
                                            </span>

                                            <span
                                                style={{
                                                    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                                                    transition: "transform .2s ease",
                                                    fontSize: "1.2rem",
                                                }}
                                            >
                                                →
                                            </span>
                                        </button>

                                        {isOpen && (
                                            <p
                                                style={{
                                                    marginTop: ".45rem",
                                                    fontSize: ".95rem",
                                                    lineHeight: 1.55,
                                                    color: "rgba(0,0,0,0.9)",
                                                }}
                                            >
                                                {item.desc}
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ================= RIGHT — SINGLE IMAGE ================= */}
                    <div>
                        <div
                            style={{
                                position: "relative",
                                overflow: "hidden",
                                borderRadius: "28px",
                                boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
                            }}
                        >
                            <img
                                src="images/web/who-we-are/homecare.jpg"
                                alt="Caregiver talking with senior man at home in the UK"
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
            </div>
        </section>
    );
}
