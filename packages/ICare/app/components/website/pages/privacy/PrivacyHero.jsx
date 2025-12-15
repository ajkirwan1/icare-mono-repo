import React from "react";
import { Link } from "react-router";
import privacySrc from "/images/heros/privacy.jpg";
import ICareNavbar from "../shared/ICareNavbar";

const BRAND = "#1FAB1F";

export default function PrivacyHero() {
    return (
        <section
            aria-label="Privacy hero"
            style={{
                position: "relative",
                minHeight: "clamp(640px, 78vh, 920px)",
                width: "100%",
                overflow: "hidden",
                display: "grid",
                placeItems: "center",
                color: "#fff",
                background: "#0f172a",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            {/* Background */}
            <img
                src={privacySrc}
                alt="Privacy background"
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "brightness(.75) contrast(1.05)",
                }}
            />

            {/* Overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(180deg, rgba(0,0,0,.38), rgba(0,0,0,.55))",
                }}
            />
            <ICareNavbar />
            {/* Header */}
            <header
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1rem clamp(1rem, 4vw, 2rem)",
                    background: "rgba(2,8,23,0.28)",
                    backdropFilter: "saturate(1.05) blur(4px)",
                    borderBottom: "1px solid rgba(255,255,255,0.14)",
                }}
            >
            </header>

            {/* Hero Copy */}
            <div
                style={{
                    position: "relative",
                    zIndex: 2,
                    width: "min(92vw, 1100px)",
                    margin: "0 auto",
                    padding: "0 clamp(16px, 4vw, 32px)",
                }}
            >
                <span
                    style={{
                        display: "inline-block",
                        marginBottom: "3.2rem",
                        marginTop: "-3.2rem",
                        fontSize: "1.12rem",
                        fontWeight: 800,
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        color: "#EAF7EA",
                        padding: ".56rem 1.12rem",
                        borderRadius: 999,
                        background: "rgba(31,171,31,0.20)",
                        border: "2px solid rgba(31,171,31,0.45)",
                    }}
                >
                    Privacy & data protection
                </span>

                <h1
                    style={{
                        margin: "0 0 1rem",
                        fontWeight: 900,
                        fontSize: "clamp(2.2rem, 4.4vw, 3.2rem)",
                        color: "#fff",
                    }}
                >
                    Privacy
                </h1>

                <p
                    style={{
                        margin: ".35rem 0 0",
                        fontSize: "clamp(1.1rem, 1.2vw, 1.125rem)",
                        color: "rgba(255,255,255,.96)",
                        maxWidth: "62ch",
                    }}
                >
                    We design ICare with privacy-first principles. Below you’ll find
                    what we collect, why, and how to exercise your rights.
                </p>
            </div>
        </section>
    );
}
