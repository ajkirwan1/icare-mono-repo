import React from "react";
import { NavLink } from "react-router";

export function ContactCard() {
    return (
        <div
            style={{
                width: "min(760px, 92vw)",
                margin: "6rem auto 4rem",
                padding: "0", // ← no outer box
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                display: "grid",
                gap: "1.6rem",
                textAlign: "center", // ← center everything
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
                    margin: "0 auto",
                    color: "#475569",
                    lineHeight: 1.62,
                    fontSize: "1.15rem",       // ← restored bigger text
                    maxWidth: "60ch",
                    fontWeight: 450,
                }}
            >
                We’re happy to talk. Tell us about your needs — we’ll get back within
                1–2 business days.
            </p>

            {/* ACTIONS — only Email CTA */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "0.8rem",
                }}
            >
                {/* BEIGE EMAIL BUTTON */}
                <a
                    href="mailto:hello@icare.example"
                    style={{
                        padding: "0.85rem 2rem",   // ← 25% smaller
                        borderRadius: 999,
                        background: "rgb(185, 122, 87",      // ← beige

                        color: "#ffffffff",
                        textDecoration: "none",
                        fontWeight: 800,
                        fontSize: "1rem",
                        letterSpacing: ".02em",

                        transition: "all .25s ease",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(0px)";
                        e.currentTarget.style.filter = "brightness(1.05)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.filter = "brightness(1.2)";
                    }}
                >
                    Email us
                    {/* Feather-style arrow */}
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffffff"
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
    );
}
