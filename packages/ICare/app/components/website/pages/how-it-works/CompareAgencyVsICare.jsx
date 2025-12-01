import React from "react";

export default function CompareAgencyVsICare() {
    const BRAND = "#1FAB1F";

    return (
        <section
            id="compare"
            aria-label="Compare agency vs ICare"
            style={{
                background: "#FFFFFF",
                borderTop: "1px solid rgba(15,23,42,0.06)",
                borderBottom: "1px solid rgba(15,23,42,0.06)",
                padding: "clamp(5rem,7vw,6.5rem) clamp(24px,6vw,60px)",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <div
                style={{
                    maxWidth: 1180,
                    margin: "0 auto",
                    animation: "fadeUp 1s ease both",
                }}
            >
                {/* ===================== */}
                {/* Page Title */}
                {/* ===================== */}
                <h2
                    style={{
                        margin: 0,
                        fontWeight: 900,
                        color: "#0F172A",
                        fontSize: "clamp(2.2rem,3vw,2.7rem)",
                        letterSpacing: ".25px",
                        lineHeight: 1.2,
                    }}
                >
                    Why families choose ICare?
                </h2>

                <p
                    style={{
                        margin: "1rem 0 3rem",
                        color: "#475569",
                        maxWidth: "65ch",
                        lineHeight: 1.7,
                        fontSize: "1.1rem",
                        fontWeight: 500,
                    }}
                >
                    A modern, transparent alternative to traditional agencies — created for
                    families and caregivers who value clarity, trust and fair pay.
                </p>

                {/* ===================== */}
                {/* Cards Wrapper */}
                {/* ===================== */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))",
                        gap: "clamp(30px,4vw,40px)",
                    }}
                >
                    {/* ===================== */}
                    {/* AGENCY CARD */}
                    {/* ===================== */}
                    <article
                        style={{
                            background: "#FAFAFA",
                            border: "1px solid rgba(120,20,20,0.12)",
                            borderRadius: 24,
                            overflow: "hidden",
                            boxShadow: "0 8px 28px rgba(0,0,0,0.06)",
                            transition: "transform .35s ease, box-shadow .35s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-4px)";
                            e.currentTarget.style.boxShadow =
                                "0 12px 34px rgba(0,0,0,0.08)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                                "0 8px 28px rgba(0,0,0,0.06)";
                        }}
                    >
                        <img
                            src="/images/agency-dark.jpg"
                            alt="Traditional Agency"
                            style={{
                                width: "100%",
                                height: 240,
                                objectFit: "cover",
                            }}
                        />

                        <div style={{ padding: "28px" }}>
                            <h3
                                style={{
                                    margin: 0,
                                    fontSize: "1.35rem",
                                    fontWeight: 800,
                                    color: "#7F1D1D",
                                }}
                            >
                                Typical Agency
                            </h3>

                            <ul
                                style={{
                                    padding: 0,
                                    margin: "18px 0 0",
                                    listStyle: "none",
                                    display: "grid",
                                    gap: 14,
                                }}
                            >
                                {[
                                    "High margins (25–40%)",
                                    "Limited choice of caregiver",
                                    "Locked contracts",
                                    "Extra fees for changes",
                                    "Limited transparency",
                                ].map((item) => (
                                    <li
                                        key={item}
                                        style={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: 10,
                                            color: "#7F1D1D",
                                            fontSize: "1rem",
                                            lineHeight: 1.5,
                                        }}
                                    >
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            stroke="#B91C1C"
                                            strokeWidth="1.5"
                                            fill="none"
                                        >
                                            <path
                                                d="M18 6L6 18M6 6l12 12"
                                                strokeLinecap="round"
                                            />
                                        </svg>

                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>

                    {/* ===================== */}
                    {/* ICARE CARD */}
                    {/* ===================== */}
                    <article
                        style={{
                            background: "#FFFFFF",
                            border: `1px solid ${BRAND}22`,
                            borderRadius: 24,
                            overflow: "hidden",
                            boxShadow: "0 8px 28px rgba(0,0,0,0.06)",
                            transition: "transform .35s ease, box-shadow .35s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-4px)";
                            e.currentTarget.style.boxShadow =
                                "0 12px 34px rgba(31,171,31,0.18)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                                "0 8px 28px rgba(0,0,0,0.06)";
                        }}
                    >
                        <img
                            src="/images/icare-bright.jpg"
                            alt="ICare Matching"
                            style={{
                                width: "100%",
                                height: 240,
                                objectFit: "cover",
                            }}
                        />

                        <div style={{ padding: "28px" }}>
                            <h3
                                style={{
                                    margin: 0,
                                    fontSize: "1.35rem",
                                    fontWeight: 800,
                                    color: BRAND,
                                }}
                            >
                                ICare
                            </h3>

                            <ul
                                style={{
                                    padding: 0,
                                    margin: "18px 0 0",
                                    listStyle: "none",
                                    display: "grid",
                                    gap: 14,
                                }}
                            >
                                {[
                                    "Flat 10% fee on contract",
                                    "You pick the right caregiver",
                                    "Full transparency",
                                    "Direct agreements",
                                    "Better pay for caregivers",
                                ].map((item) => (
                                    <li
                                        key={item}
                                        style={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: 10,
                                            color: "#14532D",
                                            fontSize: "1rem",
                                            lineHeight: 1.5,
                                        }}
                                    >
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            stroke={BRAND}
                                            strokeWidth="1.7"
                                            fill="none"
                                        >
                                            <path
                                                d="M5 13l4 4L19 7"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>

                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>
                </div>
            </div>

            {/* ANIMATION */}
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(18px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
}
