import React from "react";
import { NavLink } from "react-router";
import styles from "@styles/components/website/pages/who-we-are/cards/contract-card.module.scss";

export function ContactCard() {
    return (
        <div
            style={{
                width: "min(760px, 92vw)",
                margin: "6rem auto 4rem",
                padding: "clamp(36px,4.6vw,52px)",
                background: "#E8F2EC", // identyczny vibe jak HOW IT WORKS soft-green
                borderRadius: "32px",
                border: "1px solid rgba(31,171,31,0.20)",
                boxShadow: "0 14px 32px rgba(31,171,31,0.08)",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                display: "grid",
                gap: "1.6rem",
                textAlign: "left",
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
                    color: "#3A4A42",
                    lineHeight: 1.62,
                    fontSize: "1.07rem",
                    maxWidth: "60ch",
                    fontWeight: 450,
                }}
            >
                We’re happy to talk. Tell us about your needs — we’ll get back within
                1–2 business days.
            </p>

            {/* ACTIONS */}
            <div
                style={{
                    display: "flex",
                    gap: "1rem",
                    marginTop: "0.8rem",
                    flexWrap: "wrap",
                }}
            >
                {/* SECONDARY BUTTON (now primary visual — premium) */}
                <a
                    href="mailto:hello@icare.example"
                    style={{
                        padding: "0.95rem 1.8rem",
                        borderRadius: 999,
                        background: "#0f3d20e5",
                        border: "2px solid #0f3d20e5",
                        color: "#ffffffff",
                        textDecoration: "none",
                        fontWeight: 900,
                        fontSize: "1rem",
                        letterSpacing: ".02em",
                        boxShadow: "0 10px 24px rgba(31,171,31,0.12)",
                        transition: "all .25s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#0f3d20e5";
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow =
                            "0 12px 28px rgba(31,171,31,0.15)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#0f3d20e5";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                            "0 10px 24px rgba(31,171,31,0.12)";
                    }}
                >
                    Email us
                </a>

                {/* PRIMARY BUTTON (green) */}
                <NavLink
                    to="/how-it-works"
                    style={{
                        padding: "0.95rem 1.8rem",
                        borderRadius: 999,
                        background: "#1fab1fcb",
                        color: "#FFFFFF",
                        textDecoration: "none",
                        fontWeight: 900,
                        fontSize: "1rem",
                        letterSpacing: ".02em",
                        boxShadow: "0 10px 24px rgba(31,171,31,0.22)",
                        transition: "all .25s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.filter = "brightness(1.06)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.filter = "brightness(1)";
                    }}
                >
                    Explore how it works
                </NavLink>
            </div>
        </div>

    );
}
