import React from "react";
import { Link } from "react-router";
import heroImage from "/images/heros/icare-for-carereceivers.jpg";

export default function ICareForCareReceiversHero() {
    return (
        <>
            {/* ==== GLOBAL NAV (Home nav) ==== */}
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

            {/* ==== HERO ==== */}
            {/* ==== HERO ==== */}
            <section
                aria-label="ICare for Care Receivers hero"
                style={{
                    position: "relative",
                    minHeight: "clamp(560px, 76vh, 980px)",
                    width: "100%",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    color: "#fff",
                    paddingTop: "90px",
                }}
            >
                {/* Background */}
                <img
                    src={heroImage}
                    alt="Care support background"
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "brightness(.72) saturate(.97)",
                        zIndex: 0,
                    }}
                />

                {/* Overlay */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(0,0,0,0.32)",
                        zIndex: 1,
                    }}
                />

                <div
                    style={{
                        position: "relative",
                        zIndex: 2,
                        width: "min(1100px, 92vw)",
                        margin: "0 auto",
                    }}
                >
                    {/* ===== WHITE TITLE ===== */}
                    <h1
                        style={{
                            fontSize: "clamp(2.6rem,4vw,3.3rem)",
                            margin: 0,
                            fontWeight: 900,
                            lineHeight: 1.05,
                            color: "#fff",
                            maxWidth: "16ch",
                        }}
                    >
                        Find trusted caregivers
                    </h1>

                    {/* ==== ORIGINAL SHORT DESCRIPTION (must be HERE) ==== */}
                    <p
                        style={{
                            marginTop: "1.2rem",
                            fontSize: "clamp(1.05rem,1.3vw,1.2rem)",
                            maxWidth: "60ch",
                            lineHeight: 1.6,
                            color: "rgba(255,255,255,.92)",
                        }}
                    >
                        Get personalised help for your family — verified caregivers,
                        clear terms, no agency markups.
                    </p>

                    {/* ======================================================
           ICare Launching Soon Block (NOW VISIBLE)
        ======================================================= */}

                </div>
            </section>

        </>
    );
}
