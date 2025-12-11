

import React from "react";

export default function CaregiverPricingBadges() {
    const rates = [
        { label: "Hourly care", value: "£15–£22/hr" },
        { label: "Overnight care", value: "£120–£160/night" },
        { label: "Live-in care", value: "£750–£1,100/week" },
    ];

    return (
        <section
            id="pricing-caregivers"
            style={{
                width: "100%",
                background: "#FFFFFF",
                padding: "clamp(2.4rem, 6vw, 3rem) 0",
                fontFamily: "Inter, system-ui",
            }}
        >
            <div style={{ width: "min(1180px, 92vw)", margin: "0 auto" }}>

                {/* HEADER — compact */}
                <header style={{ marginBottom: "1.6rem" }}>
                    <h2
                        style={{
                            margin: 0,
                            fontWeight: 900,
                            fontSize: "clamp(1.9rem,2.5vw,2.2rem)",
                            color: "#0F172A",
                            letterSpacing: "-0.45px",
                        }}
                    >
                        Pricing for Caregivers
                    </h2>

                    <p
                        style={{
                            margin: ".75rem 0 0",
                            maxWidth: "55ch",
                            color: "#475569",
                            fontSize: "1rem",
                            lineHeight: 1.55,
                        }}
                    >
                        We recommend setting your own rate based on experience, skills and location.
                        Most caregivers in the UK charge:
                    </p>
                </header>

                {/* BADGES */}
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.75rem",
                        marginTop: "1.4rem",
                    }}
                >
                    {rates.map((r) => (
                        <div
                            key={r.label}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.55rem",
                                padding: "0.65rem 1.1rem",

                                /* BADGE SHAPE */
                                borderRadius: "999px",
                                border: "1px solid rgba(185,122,87,0.45)",
                                background: "#fff",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.04)",

                                /* TEXT */
                                fontSize: "0.95rem",
                                fontWeight: 600,
                                color: "#1E293B",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {/* Label */}
                            <span>{r.label}:</span>

                            {/* Price */}
                            <span
                                style={{
                                    color: "#B97A57",
                                    fontWeight: 800,
                                    fontSize: "1.02rem",
                                }}
                            >
                                {r.value}
                            </span>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
