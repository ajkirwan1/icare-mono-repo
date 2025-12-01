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
                background: BRAND,
                color: "#FFFFFF",
            }}
        >
            <div
                style={{
                    ...container,
                    maxWidth: 1200,
                    padding: "28px clamp(16px,4vw,32px)",
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: 16,
                    alignItems: "center",
                }}
            >
                <div>
                    <h3
                        style={{
                            margin: 0,
                            fontWeight: 900,
                            fontSize: "clamp(1.15rem,2.2vw,1.5rem)",
                            color: "#FFFFFF",
                        }}
                    >
                        Need help setting up your profile?
                    </h3>

                    <p style={{ margin: "6px 0 0", color: "rgba(252, 251, 251, 1)" }}>
                        We’ll guide you through matching and agreements — quick and friendly.
                    </p>
                </div>

                <a
                    href="/contact"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        textDecoration: "none",
                        color: BRAND,
                        background: "#FFFFFF",
                        padding: ".9rem 1.2rem",
                        borderRadius: 999,
                        fontWeight: 900,
                        letterSpacing: ".02em",
                        border: "1px solid rgba(255,255,255,.6)",
                        boxShadow: "0 10px 24px rgba(2,8,23,.10)",
                        transition: "transform .15s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                    }}
                >
                    Contact us
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M5 12h14" />
                        <path d="M13 5l7 7-7 7" />
                    </svg>
                </a>
            </div>
        </section>
    );
}
