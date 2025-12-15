import React from "react";

export default function CompareSectionHeader({ label, title }) {
    return (
        <>
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
                {label}
            </p>

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
                {title}
            </h3>
        </>
    );
}
