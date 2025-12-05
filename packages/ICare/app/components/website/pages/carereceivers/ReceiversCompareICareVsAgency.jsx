import React from "react";

export default function ReceiversCompareICareVsAgency() {
    return (
        <section
            aria-label="ICare vs Agency"
            style={{
                margin: "90px auto",
                width: "min(92vw,1100px)",
                background: "#FFFFFF",
                borderRadius: 24,
                padding: "80px clamp(24px,4vw,48px)",
                border: "1px solid #E5E7EB",
                boxShadow: "0 12px 30px rgba(0,0,0,0.04)",
            }}
        >
            {/* LABEL */}
            <p
                style={{
                    textAlign: "center",
                    color: "#6B7280",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    fontSize: 12.5,
                    letterSpacing: ".12em",
                    margin: 0,
                }}
            >
                ICare vs Agencies
            </p>

            {/* TITLE */}
            <h3
                style={{
                    margin: "12px 0 36px",
                    textAlign: "center",
                    fontWeight: 800,
                    fontSize: "clamp(1.9rem, 2.8vw, 2.3rem)",
                    color: "#0F172A",
                    letterSpacing: "-0.3px",
                }}
            >
                Why families choose ICare
            </h3>

            {/* TAGS */}
            <ul
                style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "0 auto 40px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 10,
                    justifyContent: "center",
                    maxWidth: 820,
                }}
            >
                {[
                    "Direct agreement",
                    "Transparent pricing",
                    "Secure messaging",
                    "Fair pay for caregivers",
                ].map((label) => (
                    <li
                        key={label}
                        style={{
                            padding: "8px 16px",
                            borderRadius: 999,
                            background: "#F3F4F6",
                            border: "1px solid #E2E4E8",
                            fontWeight: 600,
                            color: "#374151",
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                        }}
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#4C7865"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {label}
                    </li>
                ))}
            </ul>

            {/* COMPARISON GRID */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
                    gap: 26,
                }}
            >
                {/* ===== ICare CARD ===== */}
                <article
                    style={{
                        borderRadius: 22,
                        padding: "32px 28px",
                        background: "#F9FAFB",
                        border: "1px solid #D1D5DB",
                        boxShadow: "0 8px 18px rgba(0,0,0,0.03)",
                    }}
                >
                    <header
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                            marginBottom: 18,
                        }}
                    >
                        <span
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                background: "#ECFDF5",
                                border: "1px solid #A7F3D0",
                                display: "grid",
                                placeItems: "center",
                                color: "#167C5F",
                                fontWeight: 900,
                            }}
                        >
                            ✓
                        </span>

                        <strong
                            style={{
                                color: "#0F172A",
                                fontSize: "1.15rem",
                                fontWeight: 800,
                                letterSpacing: "-0.2px",
                            }}
                        >
                            ICare
                        </strong>
                    </header>

                    <ul
                        style={{
                            paddingLeft: "1.1rem",
                            margin: 0,
                            lineHeight: 1.7,
                            color: "#374151",
                            fontWeight: 500,
                            fontSize: "1rem",
                        }}
                    >
                        <li>Direct agreement with caregiver</li>
                        <li>Transparent one-time fee</li>
                        <li>Secure messaging and contracts</li>
                        <li>Fair pay for caregivers & lower family cost</li>
                    </ul>
                </article>

                {/* ===== AGENCY CARD ===== */}
                <article
                    style={{
                        borderRadius: 22,
                        padding: "32px 28px",
                        background: "#FFFFFF",
                        border: "1px solid #E5E7EB",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.03)",
                    }}
                >
                    <header
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                            marginBottom: 18,
                        }}
                    >
                        <span
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                background: "#F3F4F6",
                                border: "1px solid #D1D5DB",
                                color: "#64748B",
                                display: "grid",
                                placeItems: "center",
                                fontSize: 22,
                            }}
                        >
                            —
                        </span>

                        <strong
                            style={{
                                color: "#475569",
                                fontSize: "1.15rem",
                                fontWeight: 800,
                                letterSpacing: "-0.2px",
                            }}
                        >
                            Traditional agency
                        </strong>
                    </header>

                    <ul
                        style={{
                            paddingLeft: "1.1rem",
                            margin: 0,
                            lineHeight: 1.7,
                            color: "#475569",
                            fontWeight: 500,
                            fontSize: "1rem",
                        }}
                    >
                        <li>Intermediary in every step</li>
                        <li>Recurring fees and markups</li>
                        <li>Fragmented communication</li>
                        <li>Less pay for caregivers</li>
                    </ul>
                </article>
            </div>
        </section>
    );
}
