import React from "react";

export default function ReceiversTrustBar() {
    const stats = [
        { n: "12k+", l: "Profiles viewed monthly" },
        { n: "4.8★", l: "Average review score" },
        { n: "98%", l: "Secure messaging uptime" },
        { n: "24/7", l: "Support & guidance" },
    ];

    return (
        <section
            aria-label="Trust bar"
            style={{
                marginTop: 48,
                width: "100%",
                background: "linear-gradient(180deg, #F6FAF8 0%, #FFFFFF 70%)",
                padding: "70px 0",
                borderTop: "1px solid rgba(0,0,0,0.05)",
            }}
        >
            <div
                style={{
                    width: "min(92vw,1100px)",
                    margin: "0 auto",
                    padding: "0 clamp(16px,4vw,32px)",
                }}
            >
                <ul
                    style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                        gap: 20,
                        justifyItems: "center",
                    }}
                >
                    {stats.map((stat) => (
                        <li
                            key={stat.l}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 16,
                                padding: "18px 20px",
                                borderRadius: 18,
                                background: "#FFFFFF",
                                border: "1px solid rgba(76,120,101,0.14)",
                                boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
                                maxWidth: 300,
                                width: "100%",
                                transition: "transform .2s ease, box-shadow .2s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-2px)";
                                e.currentTarget.style.boxShadow =
                                    "0 10px 26px rgba(0,0,0,0.09)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow =
                                    "0 6px 20px rgba(0,0,0,0.05)";
                            }}
                        >
                            {/* ICON CIRCLE */}
                            <span
                                style={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: "50%",
                                    display: "grid",
                                    placeItems: "center",
                                    background: "rgba(166,122,99,0.12)",
                                    border: "1px solid rgba(166,122,99,0.22)",
                                    color: "#6A4D3A",
                                    fontWeight: 900,
                                    fontSize: "1rem",
                                    flexShrink: 0,
                                }}
                            >
                                ✓
                            </span>

                            {/* STAT */}
                            <div style={{ lineHeight: 1.35 }}>
                                <strong
                                    style={{
                                        fontSize: "1.2rem",
                                        color: "#0F172A",
                                        fontWeight: 800,
                                        display: "block",
                                        marginBottom: 2,
                                    }}
                                >
                                    {stat.n}
                                </strong>

                                <span
                                    style={{
                                        fontSize: ".95rem",
                                        color: "#475569",
                                        display: "block",
                                    }}
                                >
                                    {stat.l}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
