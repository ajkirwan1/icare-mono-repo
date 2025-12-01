import React from "react";

export default function ContactCTABanner() {
    const BRAND = "#1FAB1F";

    return (
        <section
            id="contact"
            aria-label="Contact CTA"
            style={{
                marginLeft: "calc(50% - 50vw)",
                marginRight: "calc(50% - 50vw)",
                width: "100vw",
                background: "#E8F2EC", // soft premium green
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
                        Questions about how ICare works?
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
                        We’ll gladly walk you through setup, matching, and agreements —
                        in under 10 minutes.
                    </p>
                </div>

                {/* BUTTON */}
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
                        color: "#fff",
                        background:
                            "linear-gradient(90deg, #4C7865 0%, #6CAF8E 100%)",
                        boxShadow: "0 8px 22px rgba(76,120,101,0.28)",
                        border: "1px solid rgba(76,120,101,0.4)",
                        transition: "all .28s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-3px)";
                        e.currentTarget.style.filter = "brightness(1.08)";
                        e.currentTarget.style.boxShadow =
                            "0 12px 32px rgba(76,120,101,0.35)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.filter = "brightness(1)";
                        e.currentTarget.style.boxShadow =
                            "0 8px 22px rgba(76,120,101,0.28)";
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
