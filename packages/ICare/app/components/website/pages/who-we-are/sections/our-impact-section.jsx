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
                background: "#ecddd18c",
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
                        // ✅ IMPORTANT: don't stretch columns to same height
                        alignItems: "start",
                    }}
                >
                    {/* ================= LEFT — TEXT + ACCORDION ================= */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            maxWidth: "54ch",
                        }}
                    >
                        <header style={{ marginBottom: "1.9rem" }}>
                            <h2
                                style={{
                                    margin: 0,
                                    fontWeight: 500,
                                    fontSize: "2.4rem",
                                    color: "#000",
                                    letterSpacing: "-0.35px",
                                }}
                            >
                                How ICare changes home care
                            </h2>

                            <div
                                style={{
                                    marginTop: "1.1rem",
                                    display: "grid",
                                    gap: ".85rem",
                                    fontSize: "1.22rem",
                                    lineHeight: 1.65,
                                    color: "rgba(0,0,0,0.9)",
                                    fontWeight: 400,
                                }}
                            >
                                <p style={{ margin: 0, fontSize: "1.15rem" }}>
                                    Home care is often shaped by complex structures that limit choice and create unnecessary pressure.
                                </p>
                                <p style={{ margin: 0, fontSize: "1.15rem" }}>
                                    Families struggle to understand costs, processes, and who is really making decisions.
                                </p>
                                <p style={{ margin: 0, fontSize: "1.15rem" }}>
                                    ICare simplifies this system by removing barriers between families and caregivers.
                                </p>
                                <p style={{ margin: 0, fontSize: "1.15rem" }}>
                                    We replace fragmented steps with a clear, guided process built on transparency and fairness.
                                </p>
                                <p style={{ margin: 0, fontSize: "1.15rem" }}>
                                    This shift allows care to be organised with more confidence, dignity, and mutual respect.
                                </p>
                            </div>
                        </header>

                        {/* ================= ACCORDION ================= */}
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
                                                    fontSize: "1.22rem",
                                                    fontWeight: 600,
                                                    letterSpacing: "-0.15px",
                                                }}
                                            >
                                                {item.title}
                                            </span>

                                            <span
                                                style={{
                                                    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                                                    transition: "transform .2.5s ease",
                                                    fontSize: "1.4rem",

                                                }}
                                            >
                                                →
                                            </span>
                                        </button>

                                        {isOpen && (
                                            <p
                                                style={{
                                                    marginTop: ".45rem",
                                                    fontSize: "1.15rem",
                                                    lineHeight: 1.55,
                                                    color: "rgba(0,0,0,0.9)",
                                                    fontWeight: 400,
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

                    {/* ================= RIGHT — IMAGE (fixed height) ================= */}
                    <div>
                        <div
                            style={{
                                position: "relative",
                                overflow: "hidden",
                                borderRadius: "28px",
                                boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
                                // ✅ lock image block height so it doesn't change with accordion
                                height: "clamp(420px, 52vw, 620px)",
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
