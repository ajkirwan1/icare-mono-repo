import React from "react";

export function ContactCard() {
    return (
        /* ===== FULL-WIDTH SECTION ===== */
        <section
            style={{
                width: "100vw",
                marginLeft: "calc(50% - 50vw)",
                background: "#F7F4EF",
                padding: "5.5rem 0",
            }}
        >
            {/* ===== CONTENT WRAPPER ===== */}
            <div
                style={{
                    width: "min(760px, 92vw)",
                    margin: "0 auto",
                    display: "grid",
                    gap: "1.6rem",
                    textAlign: "left", // ← TEXT LEFT
                    fontFamily:
                        "Nunito, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                }}
            >
                {/* HEADING */}
                <h3
                    style={{
                        margin: 0,
                        fontWeight: 900,
                        fontSize: "clamp(1.6rem,2.3vw,1.9rem)",
                        letterSpacing: "-0.4px",
                        color: "#0F172A",
                        lineHeight: 1.18,
                    }}
                >
                    Want to learn more or partner with us?
                </h3>

                {/* TEXT */}
                <p
                    style={{
                        margin: 0,
                        color: "#475569",
                        lineHeight: 1.62,
                        fontSize: "1.15rem",
                        maxWidth: "60ch",
                        fontWeight: 450,
                    }}
                >
                    We’re happy to talk. Tell us about your needs — we’ll get back within
                    1–2 business days.
                </p>

                {/* CTA — LEFT ALIGNED */}
                <div
                    style={{
                        marginTop: "0.8rem",
                        display: "flex",
                        justifyContent: "flex-start", // ← CTA LEFT
                    }}
                >
                    <a
                        href="mailto:hello@icare.example"
                        style={{
                            padding: "0.9rem 2.1rem",
                            borderRadius: 999,
                            background: "rgb(185, 122, 87)",
                            color: "#fff",
                            textDecoration: "none",
                            fontWeight: 800,
                            fontSize: "1rem",
                            letterSpacing: ".02em",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "10px",
                            transition: "all .25s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.filter = "brightness(1.08)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.filter = "brightness(1)";
                        }}
                    >
                        Email us
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 12h14" />
                            <path d="M13 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
