import React from "react";
import { Link } from "react-router";
import heroImage from "/images/heros/icare-for-caregivers.jpg";

export default function ICareForCaregiversHero() {
    const BRAND = "#1FAB1F";

    return (
        <section
            aria-label="ICare for Caregivers hero"
            style={{
                position: "relative",
                minHeight: "clamp(580px, 78vh, 900px)",
                width: "100%",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                color: "#fff",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            {/* Background image */}
            <img
                src={heroImage}
                alt="Care coordination background"
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "brightness(.72) saturate(.97)",
                }}
            />

            {/* Soft luxe overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.32)", // soft, clean, no gradient
                }}
            />

            {/* NAV */}
            <header
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    padding: "1.3rem clamp(20px,4vw,40px)",
                    zIndex: 5,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Link
                    to="/"
                    style={{
                        fontWeight: 900,
                        fontSize: "clamp(1.4rem,2vw,1.6rem)",
                        color: "#fff",
                        textDecoration: "none",
                        letterSpacing: "-0.4px",
                    }}
                >
                    ICare
                </Link>

                <nav style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
                    {[
                        { to: "/", label: "Home" },
                        { to: "/how-it-works", label: "How it Works" },
                        { to: "/who-we-are", label: "Who We Are" },
                        { to: "/privacy", label: "Privacy" },
                        { to: "/icare-for-caregivers", label: "ICare For Caregivers" },
                        { to: "/icare-for-carereceivers", label: "ICare For Care Receivers" },
                    ].map((l) => (
                        <Link
                            key={l.to}
                            to={l.to}
                            style={{
                                color: "rgba(255,255,255,.92)",
                                textDecoration: "none",
                                padding: ".45rem .85rem",
                                borderRadius: 999,
                                fontWeight: 600,
                                fontSize: "clamp(.86rem,1.1vw,1rem)",
                                transition: "all .22s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,.18)";
                                e.currentTarget.style.color = "#fff";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.color = "rgba(255,255,255,.92)";
                            }}
                        >
                            {l.label}
                        </Link>
                    ))}
                </nav>
            </header>

            {/* CONTENT */}
            <div
                style={{
                    position: "relative",
                    zIndex: 5,
                    width: "min(1100px, 92vw)",
                    marginInline: "auto",
                    paddingTop: "clamp(6rem,10vw,10rem)",
                    paddingBottom: "clamp(4rem,6vw,6rem)",
                }}
            >
                {/* BADGE */}
                <span
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: ".65rem 1.4rem",
                        borderRadius: 999,
                        letterSpacing: ".14em",
                        fontWeight: 800,
                        fontSize: "clamp(.78rem,1vw,.95rem)",
                        color: "#fff",
                        background: "rgba(31,171,31,0.22)", // ICare Luxe Green
                        border: "1px solid rgba(31,171,31,0.32)",
                        marginBottom: "1.8rem",
                    }}
                >
                    DIRECT • FAIR • TRANSPARENT
                </span>

                {/* TITLE */}
                <h1
                    style={{
                        fontWeight: 900,
                        lineHeight: 1.04,
                        fontSize: "clamp(2.7rem,5vw,3.7rem)",
                        margin: "0 0 1.4rem 0",
                        color: "#fff",
                        maxWidth: "14ch",
                    }}
                >
                    ICare for Caregivers
                </h1>

                {/* LEAD PARAGRAPH */}
                <p
                    style={{
                        fontSize: "clamp(1.15rem,1.35vw,1.28rem)",
                        lineHeight: 1.7,
                        maxWidth: "65ch",
                        color: "rgba(255,255,255,.96)",
                        fontWeight: 400,
                        marginBottom: "2.2rem",
                    }}
                >
                    <strong>Agree your care terms directly.</strong><br />
                    <strong>No agency markup. No hidden fees.</strong><br />
                    <span style={{ opacity: .95 }}>More earnings for you.</span>
                </p>



                {/* LIST */}
                <ul
                    style={{
                        listStyle: "none",
                        padding: 0,
                        margin: "0 0 3rem 0",
                        display: "grid",
                        gap: "0.9rem",
                        maxWidth: 800,
                    }}
                >
                    {[
                        "Find care roles that suit your skills and experience",
                        "Schedule and manage everything in one place",
                        "Keep more of your hard-earned income",
                        "Free registration — no subscription",
                    ].map((text, i) => (
                        <li
                            key={i}
                            style={{
                                position: "relative",
                                paddingLeft: "2rem",
                                fontSize: "clamp(1.05rem,1.25vw,1.2rem)",
                                color: "rgba(255,255,255,.98)",
                                lineHeight: 1.6,
                            }}
                        >
                            <span
                                style={{
                                    position: "absolute",
                                    left: 0,
                                    top: "0.2rem",
                                    fontWeight: 800,
                                    fontSize: "1.2rem",
                                    color: "#1FAB1F",
                                }}
                            >
                                ✓
                            </span>

                            {text}
                        </li>
                    ))}
                </ul>

                {/* BUTTON — Luxe ICare button */}
                <Link
                    to="/register"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "1.1rem 2.4rem",
                        borderRadius: 999,
                        background: "#FFFFFF",
                        border: "2px solid #1FAB1F",
                        color: "#0F172A",
                        fontWeight: 800,
                        letterSpacing: ".02em",
                        textDecoration: "none",
                        fontSize: "clamp(1.05rem,1.25vw,1.1rem)",
                        transition: "all .22s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(31,171,31,0.10)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#FFFFFF";
                        e.currentTarget.style.transform = "translateY(0)";
                    }}
                >
                    QUICK REGISTRATION
                </Link>
            </div>
        </section>

    );
}
