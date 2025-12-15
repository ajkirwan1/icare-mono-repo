import React from "react";

export default function ContactCTA() {
    const BRAND = "#1FAB1F";

    const container = {
        width: "min(1100px, 92vw)",
        margin: "0 auto",
        padding: "0 clamp(16px,4vw,32px)",
    };

    return (
        <section
            aria-label="Contact CTA"
            style={{
                marginLeft: "calc(50% - 50vw)",
                marginRight: "calc(50% - 50vw)",
                width: "100vw",
                background: "#E8F2EC", // Soft ICare luxe green
                borderTop: "1px solid rgba(0,0,0,0.05)",
                padding: "clamp(3.4rem,6vw,4.6rem) 0",
            }}
        >
            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: "0 clamp(16px,4vw,32px)",
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "2.4rem",
                    alignItems: "center",
                    fontFamily:
                        "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                }}
            >
                {/* TEXT */}
                <div>
                    <h3
                        style={{
                            margin: 0,
                            color: "#0F172A",
                            fontWeight: 900,
                            fontSize: "clamp(1.7rem,2.4vw,2rem)",
                            lineHeight: 1.18,
                            letterSpacing: "-0.25px",
                        }}
                    >
                        Need help setting up your profile?
                    </h3>

                    <p
                        style={{
                            margin: "0.75rem 0 0",
                            color: "#3A3A3A",
                            fontSize: "clamp(1rem,1.15vw,1.1rem)",
                            lineHeight: 1.7,
                            fontWeight: 500,
                            maxWidth: "62ch",
                        }}
                    >
                        We’ll guide you through matching and agreements — quick, friendly and clear.
                    </p>
                </div>

                {/* BUTTON — Luxe ICare style */}
                <a
                    href="/contact"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 12,
                        textDecoration: "none",
                        padding: "1rem 2rem",
                        borderRadius: 999,
                        fontWeight: 900,
                        letterSpacing: ".03em",
                        fontSize: "1rem",
                        color: "#0F172A",

                        background: "#FFFFFF", // clean luxe button
                        border: "1px solid rgba(76,120,101,0.22)",
                        boxShadow: "0 8px 22px rgba(76,120,101,0.15)",
                        transition: "all .28s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-3px)";
                        e.currentTarget.style.background = "rgba(255,255,255,0.92)";
                        e.currentTarget.style.boxShadow = "0 12px 32px rgba(76,120,101,0.22)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.background = "#FFFFFF";
                        e.currentTarget.style.boxShadow = "0 8px 22px rgba(76,120,101,0.15)";
                    }}
                >
                    Contact us
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        style={{ opacity: 0.95 }}
                    >
                        <path d="M5 12h14" />
                        <path d="M13 5l6 7-6 7" />
                    </svg>
                </a>
            </div>
        </section>

    );
}
