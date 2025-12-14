import React from "react";
import { Link } from "react-router";

export default function ICareNavbar() {
    return (
        <header
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem clamp(20px,4vw,48px)",
                backdropFilter: "blur(10px)",
                background: "rgba(0,0,0,0.25)",
                borderBottom: "1px solid rgba(255,255,255,0.15)",
            }}
        >
            {/* BRAND */}
            <Link
                to="/"
                style={{
                    fontWeight: 900,
                    color: "#ffffff",
                    fontSize: "clamp(1.3rem,2.4vw,1.6rem)",
                    textDecoration: "none",
                }}
            >
                ICare
            </Link>

            {/* NAV */}
            <nav style={{ display: "flex", gap: "1.1rem 1.6rem", flexWrap: "wrap" }}>
                {[
                    { to: "/", label: "Home" },
                    { to: "/how-it-works", label: "How it Works" },
                    { to: "/who-we-are", label: "Who We Are" },
                    { to: "/privacy", label: "Privacy" },
                    { to: "/icare-for-caregivers", label: "Caregivers" },
                    { to: "/icare-for-carereceivers", label: "Care Receivers" },
                ].map((l) => (
                    <Link
                        key={l.to}
                        to={l.to}
                        style={{
                            color: "#ffffff",
                            fontSize: "1.05rem",
                            fontWeight: 600,
                            textDecoration: "none",
                            letterSpacing: ".2px",
                        }}
                    >
                        {l.label}
                    </Link>
                ))}
            </nav>
        </header>
    );
}
