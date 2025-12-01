import React from "react";

export default function WhoCanJoin() {
    return (
        <section
            aria-label="Who can join – Luxe Black & White"
            style={{
                margin: "5rem auto",
                width: "min(1100px, 92vw)",
                padding: "clamp(32px, 4vw, 48px)",
                borderRadius: 32,
                background: "linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)",
                boxShadow: "0 12px 36px rgba(0,0,0,0.04)",
                border: "1px solid rgba(0,0,0,0.08)",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            {/* HEADER */}
            <header style={{ marginBottom: "2.6rem" }}>
                <h2
                    style={{
                        margin: 0,
                        fontWeight: 900,
                        fontSize: "clamp(1.9rem,2.6vw,2.5rem)",
                        letterSpacing: "-0.5px",
                        lineHeight: 1.18,
                        color: "#111",
                    }}
                >
                    Who can join ICare
                </h2>

                <p
                    style={{
                        marginTop: "0.7rem",
                        color: "#444",
                        fontSize: "1.05rem",
                        lineHeight: 1.65,
                        maxWidth: "58ch",
                        fontWeight: 500,
                    }}
                >
                    Verified, trusted caregivers with real experience and a human approach.
                </p>

                <div
                    style={{
                        width: 80,
                        height: 3,
                        background: "#000",
                        borderRadius: 999,
                        marginTop: "1rem",
                        opacity: 0.9,
                    }}
                />
            </header>

            {/* CARDS */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "clamp(22px,2vw,30px)",
                }}
            >
                {[
                    {
                        t: "Professional caregivers & nurses",
                        d: "Verified experience, strong references and excellent communication.",
                        icon: (
                            <svg
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#111"
                                strokeWidth="1.6"
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
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#111"
                                strokeWidth="1.6"
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
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#111"
                                strokeWidth="1.6"
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
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#111"
                                strokeWidth="1.6"
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
                            border: "1px solid rgba(0,0,0,0.10)",
                            padding: "26px 24px",
                            boxShadow: "0 14px 32px rgba(0,0,0,0.05)",
                            display: "grid",
                            gap: 14,
                            transition:
                                "transform .28s ease, box-shadow .28s ease, border-color .28s ease",
                            opacity: 0,
                            transform: "translateY(20px)",
                            animation: `fadeUpBW .7s ease forwards ${i * 0.10}s`,
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-5px)";
                            e.currentTarget.style.boxShadow =
                                "0 18px 42px rgba(0,0,0,0.10)";
                            e.currentTarget.style.borderColor = "rgba(0,0,0,0.20)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                                "0 14px 32px rgba(0,0,0,0.05)";
                            e.currentTarget.style.borderColor = "rgba(0,0,0,0.10)";
                        }}
                    >
                        {/* ICON */}
                        <div
                            style={{
                                width: 58,
                                height: 58,
                                borderRadius: 18,
                                background: "#E6F4EF",
                                border: "1px solid #C9E4D9",
                                display: "grid",
                                placeItems: "center",
                                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
                            }}
                        >
                            {item.icon}
                        </div>

                        <strong
                            style={{
                                color: "#111",
                                fontSize: "1.12rem",
                                fontWeight: 900,
                                letterSpacing: "-0.25px",
                            }}
                        >
                            {item.t}
                        </strong>

                        <p
                            style={{
                                margin: 0,
                                color: "#333",
                                lineHeight: 1.65,
                                fontSize: "1.02rem",
                                fontWeight: 450,
                            }}
                        >
                            {item.d}
                        </p>
                    </article>
                ))}
            </div>

            <style>{`
                @keyframes fadeUpBW {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
}
