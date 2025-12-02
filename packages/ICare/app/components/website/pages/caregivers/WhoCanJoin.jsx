import React from "react";

export default function WhoCanJoin() {
    return (
        <section
            aria-label="Who can join ICare — Luxe Edition"
            style={{
                margin: "6rem auto",
                width: "min(1100px, 92vw)",
                padding: "clamp(40px,5vw,60px)",
                borderRadius: 32,
                background: "#FFFFFF",
                border: "1px solid rgba(15,23,42,0.06)",  // soft luxe border
            }}
        >
            {/* HEADER */}
            <header style={{ marginBottom: "3.4rem" }}>
                <h2
                    style={{
                        margin: 0,
                        fontWeight: 900,
                        fontSize: "clamp(2rem,2.8vw,2.6rem)",
                        letterSpacing: "-0.4px",
                        lineHeight: 1.12,
                        color: "#0F172A",
                    }}
                >
                    Who can join ICare
                </h2>

                <p
                    style={{
                        marginTop: "1.1rem",
                        color: "#475569",
                        fontSize: "1.14rem",
                        lineHeight: 1.68,
                        maxWidth: "62ch",
                        fontWeight: 400,
                    }}
                >
                    Verified, trusted caregivers with real experience and a human approach.
                </p>

                {/* Subtle divider — Airbnb Luxe style */}
                <div
                    style={{
                        marginTop: "1.6rem",
                        width: "100%",
                        height: 1,
                        background: "rgba(15,23,42,0.06)", // **soft neutral rule**
                    }}
                />
            </header>

            {/* CARDS */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: "clamp(28px,2.6vw,40px)",
                }}
            >
                {[
                    {
                        t: "Professional caregivers & nurses",
                        d: "Verified experience, strong references and excellent communication.",
                        icon: (
                            <svg
                                width="26"
                                height="26"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#0F172A"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="8" r="4" />
                                <path d="M6 20v-1a6 6 0 0 1 12 0v1" />
                            </svg>
                        ),
                    },
                    {
                        t: "Live-in & flexible hours",
                        d: "Full-time, flexible schedules or live-in support tailored to each family.",
                        icon: (
                            <svg
                                width="26"
                                height="26"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#0F172A"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                        ),
                    },
                    {
                        t: "Specialist care expertise",
                        d: "Dementia care, mobility support or post-surgery recovery.",
                        icon: (
                            <svg
                                width="26"
                                height="26"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#0F172A"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 1v22" />
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        ),
                    },
                    {
                        t: "Languages & driving",
                        d: "Multilingual caregivers and certified drivers highly valued.",
                        icon: (
                            <svg
                                width="26"
                                height="26"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#0F172A"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M2 12h20" />
                                <path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10A15 15 0 0 1 12 2z" />
                            </svg>
                        ),
                    },
                ].map((item, i) => (
                    <article
                        key={item.t}
                        style={{
                            background: "#FFFFFF",
                            borderRadius: 24,

                            /* consistent luxe borders */
                            border: "1px solid rgba(15,23,42,0.06)",

                            padding: "30px 28px",
                            display: "grid",
                            gap: 18,
                            transition:
                                "transform .22s ease, border-color .22s ease, background .22s ease",
                            opacity: 0,
                            transform: "translateY(16px)",
                            animation: `fadeUpCards .7s ease forwards ${i * 0.12}s`,
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-4px)";
                            e.currentTarget.style.borderColor = "rgba(31,171,31,0.22)"; // SUBTLE ICare green accent
                            e.currentTarget.style.background = "rgba(31,171,31,0.04)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.borderColor = "rgba(15,23,42,0.06)";
                            e.currentTarget.style.background = "#FFFFFF";
                        }}
                    >
                        {/* ICON */}
                        <div
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 18,
                                background: "rgba(15,23,42,0.05)",   // soft grey, not green
                                border: "1px solid rgba(15,23,42,0.12)",
                                display: "grid",
                                placeItems: "center",
                            }}
                        >
                            {item.icon}
                        </div>

                        <strong
                            style={{
                                color: "#0F172A",
                                fontSize: "1.22rem",
                                fontWeight: 800,
                                letterSpacing: "-0.25px",
                            }}
                        >
                            {item.t}
                        </strong>

                        <p
                            style={{
                                margin: 0,
                                color: "#475569",
                                lineHeight: 1.65,
                                fontSize: "1.06rem",
                                fontWeight: 400,
                            }}
                        >
                            {item.d}
                        </p>
                    </article>
                ))}
            </div>

            <style>{`
        @keyframes fadeUpCards {
            from { opacity: 0; transform: translateY(18px);}
            to { opacity: 1; transform: translateY(0);}
        }
    `}</style>
        </section>

    );
}
