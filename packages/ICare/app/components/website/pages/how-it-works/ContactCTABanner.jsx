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

                background: "#fff", // ✅ changed to #ffff (white)
                borderTop: "1px solid rgba(0,0,0,0.04)",
                padding: "clamp(2.8rem,4.4vw,3.8rem) 0" // ✅ smaller section
            }}
        >
            <div
                style={{
                    maxWidth: 1100,
                    margin: "0 auto",

                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "2.2rem", // ✅ smaller gap
                    alignItems: "center",
                }}
            >
                {/* TEXT */}
                <div>
                    <h3
                        style={{
                            margin: 0,
                            color: "#0F172A",
                            fontWeight: 500,
                            fontSize: "2.4rem", // ✅ smaller title
                            lineHeight: 1.12,
                            letterSpacing: "-0.35px",
                        }}
                    >
                        Questions about ICare?
                    </h3>

                    <p
                        style={{
                            margin: "0.75rem 0 0", // ✅ tighter spacing
                            color: "#1f2a37",
                            fontSize: "1.25rem", // ✅ smaller text
                            lineHeight: 1.7,
                            fontWeight: 400,
                            maxWidth: "60ch",
                        }}
                    >
                        We are here to help you understand matching, <br />agreements and setup
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

                        padding: "0.9rem 2rem", // ✅ smaller button
                        borderRadius: 999,

                        fontWeight: 800,
                        letterSpacing: ".02em",
                        fontSize: "1rem", // ✅ slightly smaller text

                        background: "#778d43",

                        color: "#FFFFFF",

                        transition: "all .22s ease",
                        whiteSpace: "nowrap",
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
