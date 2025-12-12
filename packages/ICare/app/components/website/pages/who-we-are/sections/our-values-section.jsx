import React from "react";

export function OurValuesSection() {
    const iconBase = {
        width: 30,
        height: 30,
        stroke: "#2F3A32",
        strokeWidth: 2.2,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        flexShrink: 0,
    };

    const ValuesCard = ({ icon, title, description, bg }) => (
        <div
            style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1.4rem",
                padding: "1.8rem 1.6rem",
                borderRadius: "20px",
                background: bg,
                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
            }}
        >
            <div style={{ display: "flex", alignItems: "flex-start" }}>{icon}</div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: ".35rem",
                }}
            >
                <h3
                    style={{
                        margin: 0,
                        fontSize: "1.15rem",
                        color: "#1B1F1A",
                        fontWeight: 700,
                    }}
                >
                    {title}
                </h3>
                <p
                    style={{
                        margin: 0,
                        lineHeight: "1.45",
                        color: "#2F3A32",
                        fontSize: ".95rem",
                    }}
                >
                    {description}
                </p>
            </div>
        </div>
    );

    const cards = [
        {
            key: "dignity",
            title: "Dignity & Respect",
            description:
                "We put people first — families and caregivers — in every decision we make.",
            bg: "#fff9ef",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" style={iconBase}>
                    <path d="M20 6L9 17l-5-5" />
                </svg>
            ),
        },

        {
            key: "privacy",
            title: "Privacy by Design",
            description:
                "Built-in data protection and security. Your privacy is never an afterthought.",
            bg: "#fff9ef",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" style={iconBase}>
                    <rect x="3" y="11" width="18" height="10" rx="3" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
            ),
        },

        {
            key: "fair",
            title: "Fair & Transparent",
            description:
                "No hidden fees, no surprises. All agreements are clear, honest, and accessible.",
            bg: "#fff9ef", // airy sage tint
            icon: (
                <svg viewBox="0 0 24 24" fill="none" style={iconBase}>
                    <path d="M4 9h16" />
                    <path d="M4 15h16" />
                </svg>
            ),
        },

        {
            key: "trust",
            title: "Trust & Safety",
            description:
                "Verified caregivers, secure payments, and encrypted communication — always.",
            bg: "#fff9ef",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" style={iconBase}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
            ),
        },
    ];

    return (
        <section
            id="values"
            aria-label="ICare values"
            style={{
                width: "100%",
                padding: "5rem 0",
                background: "#FFFFFF",
            }}
        >
            <div
                style={{
                    maxWidth: "1160px",
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "4rem",
                    padding: "0 2rem",
                }}
            >
                {/* LEFT COLUMN */}
                <header>
                    <h2
                        style={{
                            fontSize: "2.4rem",
                            margin: 0,
                            fontWeight: 800,
                            color: "#1B1F1A",
                        }}
                    >
                        Our Values
                    </h2>

                    <p
                        style={{
                            fontSize: "1.25rem",
                            marginTop: "1rem",
                            color: "#2F3A32",
                            fontWeight: 600,
                        }}
                    >
                        “Care isn’t a service. It’s a shared human value.”
                    </p>

                    <p
                        style={{
                            marginTop: "1rem",
                            lineHeight: "1.6",
                            fontSize: "1rem",
                            color: "#2F3A32",
                        }}
                    >
                        We build trust through fairness, clarity, and respect — every step of
                        the way. Together, we’re shaping a care system built on trust —
                        empowering families and caregivers to work as equals.
                    </p>

                    <div style={{ marginTop: "2rem", borderRadius: "18px", overflow: "hidden" }}>
                        <img
                            src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80"
                            alt="Kind caregiver supporting an elderly person"
                            style={{ width: "100%", display: "block" }}
                        />
                    </div>
                </header>

                {/* RIGHT COLUMN — CARDS */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr",
                        gap: "1.6rem",
                    }}
                >
                    {cards.map((card) => (
                        <ValuesCard key={card.key} {...card} />
                    ))}
                </div>
            </div>
        </section>
    );
}
