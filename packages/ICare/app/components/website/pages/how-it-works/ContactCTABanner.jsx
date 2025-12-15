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

                background: "rgba(31,171,31,0.06)",
                borderTop: "1px solid rgba(0,0,0,0.04)",
                padding: "clamp(5rem,7vw,6rem) 0",

                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <div
                style={{
                    maxWidth: 1100,
                    margin: "0 auto",
                    padding: "0 clamp(28px,4vw,48px)",

                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "3.4rem",
                    alignItems: "center",
                }}
            >
                {/* TEXT */}
                <div>
                    <h3
                        style={{
                            margin: 0,
                            color: "#0F172A",
                            fontWeight: 800,
                            fontSize: "clamp(2rem,2.8vw,2.3rem)",
                            lineHeight: 1.12,
                            letterSpacing: "-0.35px",
                        }}
                    >
                        Questions about ICare?
                    </h3>

                    <p
                        style={{
                            margin: "1rem 0 0",
                            color: "#475569",
                            fontSize: "clamp(1.08rem,1.25vw,1.18rem)",
                            lineHeight: 1.7,
                            fontWeight: 400,
                            maxWidth: "60ch",
                        }}
                    >
                        We’re here to help you understand matching, agreements and setup —
                        with clarity and no pressure.
                    </p>
                </div>

                {/* CTA BUTTON */}
                <a
                    href="/contact"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 12,
                        textDecoration: "none",

                        padding: "1.1rem 2.4rem",
                        borderRadius: 999,

                        fontWeight: 800,
                        letterSpacing: ".02em",
                        fontSize: "1.05rem",

                        background: "#0f3d20e5",
                        border: "2px solid #0f3d20e5",
                        color: "#FFFFFF",

                        transition: "all .22s ease",
                        whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.border = "2px solid #0f3d20e5";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
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
                        style={{ opacity: 0.9 }}
                    >
                        <path d="M5 12h14" />
                        <path d="M13 5l6 7-6 7" />
                    </svg>
                </a>
            </div>
        </section>


    );
}
