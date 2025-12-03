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
                minHeight: "clamp(480px, 66vh, 760px)", // mniejsze ~20%
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
                    background: "rgba(0,0,0,0.32)",
                }}
            />

            {/* NAV */}
            <header
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    padding: "1.3rem clamp(20px,4vw,40px)", // mniej
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
                        fontSize: "clamp(1.2rem,1.7vw,1.45rem)", // mniejsze logo
                        color: "#fff",
                        textDecoration: "none",
                        letterSpacing: "-0.3px",
                    }}
                >
                    ICare
                </Link>

                <nav style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
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
                                color: "rgba(255,255,255,.9)",
                                textDecoration: "none",
                                padding: ".35rem .75rem",
                                borderRadius: 999,
                                fontWeight: 600,
                                fontSize: "clamp(.8rem,1vw,.95rem)",
                                transition: "all .22s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,.18)";
                                e.currentTarget.style.color = "#fff";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.color = "rgba(255,255,255,.9)";
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
                    paddingTop: "clamp(4.5rem,8vw,7rem)", // mniej
                    paddingBottom: "clamp(3.5rem,5vw,5.5rem)", // mniej
                }}
            >
                {/* BADGE */}
                <span
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: ".6rem 1.3rem",
                        borderRadius: 999,
                        letterSpacing: ".14em",
                        fontWeight: 800,
                        fontSize: "clamp(.72rem,1vw,.88rem)",
                        color: "#fff",
                        background: "rgba(31,171,31,0.22)",
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
                        lineHeight: 1.05,
                        fontSize: "clamp(2.4rem,4.2vw,3.2rem)", // ~15% mniejsze
                        margin: "0 0 1.5rem 0",
                        color: "#fff",
                        maxWidth: "14ch",
                    }}
                >
                    ICare for Caregivers
                </h1>

                {/* LEAD PARAGRAPH */}
                <p
                    style={{
                        fontSize: "clamp(1.05rem,1.25vw,1.2rem)", // mniejsze
                        lineHeight: 1.65,
                        maxWidth: "60ch",
                        color: "rgba(255,255,255,.96)",
                        marginBottom: "2.2rem",
                    }}
                >
                    <strong>Agree your care terms directly.</strong><br />
                    <strong>Direct contract, no third-party commissions.</strong>
                </p>

                {/* LIST */}
                <ul
                    style={{
                        listStyle: "none",
                        padding: 0,
                        margin: "0 0 2.8rem 0", // mniej
                        display: "grid",
                        gap: "0.95rem", // mniej
                        maxWidth: 760,
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
                                fontSize: "clamp(1rem,1.15vw,1.15rem)",
                                color: "rgba(255,255,255,.98)",
                                lineHeight: 1.65,
                            }}
                        >
                            <span
                                style={{
                                    position: "absolute",
                                    left: 0,
                                    top: ".3rem",
                                    width: "12px",
                                    height: "12px",
                                    borderRadius: "50%",
                                    border: "2px solid #ffffffff",
                                }}
                            ></span>

                            {text}
                        </li>
                    ))}
                </ul>

                {/* BUTTON */}
                <Link
                    to="/register"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "1rem 2.1rem", // mniejsze
                        borderRadius: 999,
                        background: "rgba(255,255,255,0.10)",
                        border: "2px solid rgba(255,255,255,0.65)",
                        backdropFilter: "blur(6px)",
                        color: "#FFFFFF",
                        fontWeight: 700,
                        letterSpacing: ".02em",
                        textDecoration: "none",
                        fontSize: "clamp(1rem,1.2vw,1.1rem)", // mniejsze
                        transition: "all .22s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.22)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.border = "2px solid rgba(255,255,255,0.85)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.10)";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.border = "2px solid rgba(255,255,255,0.65)";
                    }}
                >
                    QUICK REGISTRATION
                </Link>
            </div>
        </section>


    );
}
