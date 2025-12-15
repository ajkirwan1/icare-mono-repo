import React from "react";

export default function CareTypesSection() {
    const items = [
        { title: "Hourly Care", desc: "Flexible support for daily tasks, companionship, and errands.", icon: "🕒" },
        { title: "Live-in Care", desc: "24/7 support while living in the client’s home.", icon: "🏠" },
        { title: "Overnight Care", desc: "Night-time assistance and reassurance.", icon: "🌙" },
        { title: "Respite Care", desc: "Short-term relief for families and caregivers.", icon: "💛" },
        { title: "Emergency Care", desc: "Same-day urgent support in unexpected situations.", icon: "⚡" },
        { title: "Post-operative Care", desc: "Recovery support after surgery or hospital discharge.", icon: "🩺" },
        { title: "Dementia Support", desc: "Specialised care focused on safety, patience and structure.", icon: "🧠" },
        { title: "Disability Support", desc: "Support tailored to mobility, sensory and daily living needs.", icon: "♿" },
        { title: "Chronic Condition Support", desc: "Long-term help for conditions such as Parkinson’s or MS.", icon: "💚" },
    ];

    return (
        <section
            id="care-types"
            aria-label="Types of care offered"
            style={{
                width: "100%",
                background: "#FFFFFF",
                padding: "clamp(3rem, 6vw, 5rem) 0", // 🔹 MNIEJSZA sekcja
                fontFamily: "Inter, system-ui",
            }}
        >
            <div style={{ width: "min(1180px, 92vw)", margin: "0 auto" }}>

                {/* HEADER — shifted slightly left + up */}
                <header style={{ textAlign: "left", marginBottom: "2.8rem" }}>
                    <h2
                        style={{
                            margin: 0,
                            fontWeight: 900,
                            fontSize: "clamp(2rem,2.6vw,2.3rem)", // 🔹 trochę mniejszy tytuł
                            color: "#0F172A",
                            letterSpacing: "-0.45px",
                            lineHeight: 1.1,
                            transform: "translateY(-4px)", // 🔹 lekko do góry
                        }}
                    >
                        Types of care you can offer
                    </h2>

                    <p
                        style={{
                            margin: "0.9rem 0 0",
                            maxWidth: "54ch",
                            color: "#475569",
                            fontSize: "0.97rem", // 🔹 mniejszy tekst
                            lineHeight: 1.55,
                            transform: "translateY(-2px)", // 🔹 lekko w górę
                        }}
                    >
                        Tailor your support to each family’s needs — from occasional visits to complex care.
                    </p>

                    <div
                        aria-hidden="true"
                        style={{

                            background: "rgba(185,122,87,0.35)",
                            borderRadius: 99,
                            marginTop: "1rem",
                        }}
                    />
                </header>

                {/* GRID — compact */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "1.6rem", // 🔹 ciaśniejszy grid
                    }}
                >
                    {items.map((item) => (
                        <div
                            key={item.title}
                            style={{

                                borderRadius: "16px",          // 🔹 mniejszy radius
                                padding: "1.2rem 1.2rem",      // 🔹 MNIEJSZY padding
                                boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                                border: "1px solid rgba(185,122,87,0.18)",
                                display: "flex",
                                flexDirection: "column",
                                gap: ".5rem",                   // 🔹 mniejsza przerwa
                                transform: "translateY(-3px)", // 🔹 lekko wyżej
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "1.4rem",         // 🔹 ikony 30% mniejsze
                                    marginBottom: ".2rem",
                                    transform: "translateY(-4px)",
                                }}
                            >
                                {item.icon}
                            </div>

                            <h3
                                style={{
                                    margin: 0,
                                    fontSize: "1.05rem",        // 🔹 mniejszy nagłówek
                                    fontWeight: 700,
                                    color: "#1E293B",
                                    letterSpacing: "-0.12px",
                                }}
                            >
                                {item.title}
                            </h3>

                            <p
                                style={{
                                    margin: 0,
                                    color: "#475569",
                                    fontSize: "0.9rem",         // 🔹 mniejszy tekst
                                    lineHeight: 1.45,
                                }}
                            >
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
