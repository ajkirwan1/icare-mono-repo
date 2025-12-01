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
                minHeight: "clamp(560px, 76vh, 900px)",
                width: "100%",
                overflow: "hidden",
                display: "grid",
                placeItems: "center",
                color: "#fff",
                background: "#0f172a",
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
                    filter: "brightness(.78) saturate(.95)",
                    zIndex: 1,
                }}
            />

            {/* Overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(180deg, rgba(0,0,0,.15) 0%, rgba(0,0,0,.45) 70%)",
                    zIndex: 2,
                }}
            />

            {/* Top navigation */}
            <header
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    padding: "1.1rem clamp(16px,4vw,36px)",
                    zIndex: 5,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backdropFilter: "blur(6px)",
                }}
            >
                <Link
                    to="/"
                    style={{
                        fontWeight: 900,
                        fontSize: "clamp(1.4rem,2.2vw,1.6rem)",
                        color: "#fff",
                        textDecoration: "none",
                        letterSpacing: "-0.5px",
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
                                color: "rgba(255,255,255,.92)",
                                textDecoration: "none",
                                padding: ".45rem .75rem",
                                borderRadius: 999,
                                fontWeight: 600,
                                fontSize: "clamp(.85rem,1.15vw,1rem)",
                                backdropFilter: "blur(4px)",
                                transition: "all .25s ease",
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

            {/* Main hero content */}
            <div
                style={{
                    position: "relative",
                    zIndex: 5,
                    width: "min(1100px, 92vw)",
                    marginInline: "auto",
                    padding: "clamp(4rem, 6vw, 6rem) 0",
                    textAlign: "left",
                    transform: "translateX(-8%)",
                }}
            >
                <span
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: ".55rem 1rem",
                        borderRadius: 999,
                        letterSpacing: ".15em",
                        fontWeight: 800,
                        fontSize: "clamp(.82rem, 1.2vw, 1rem)",
                        color: "#EAF7EA",
                        background: "rgba(31,171,31,0.22)",
                        border: "2px solid rgba(31,171,31,0.32)",
                        marginBottom: "1.4rem",
                    }}
                >
                    direct · fair · transparent
                </span>

                <h1
                    style={{
                        fontWeight: 900,
                        lineHeight: 1.05,
                        fontSize: "clamp(2.4rem, 5vw, 3.4rem)",
                        margin: "0 0 1rem 0",
                        color: "#fff",
                    }}
                >
                    ICare for Caregivers
                </h1>

                <p
                    style={{
                        fontSize: "clamp(1.05rem,1.2vw,1.2rem)",
                        lineHeight: 1.65,
                        maxWidth: "62ch",
                        color: "rgba(255,255,255,.95)",
                        fontWeight: 500,
                        marginBottom: "1.8rem",
                    }}
                >
                    <strong>Easily agree your care terms directly with your client.</strong>{" "}
                    No agency markup. No hidden fees.
                </p>

                <ul
                    style={{
                        listStyle: "none",
                        padding: 0,
                        margin: "1.2rem 0 2rem 0",
                        display: "grid",
                        gap: ".7rem",
                        maxWidth: 820,
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
                                fontSize: "clamp(1rem, 1.2vw, 1.12rem)",
                                color: "rgba(255,255,255,.98)",
                            }}
                        >
                            <span
                                style={{
                                    position: "absolute",
                                    left: 0,
                                    top: "0.2rem",
                                    fontWeight: 800,
                                }}
                            >
                                ✓
                            </span>

                            {i < 3 ? (
                                <>
                                    {text.split(" ").slice(0, 4).join(" ")}{" "}
                                    <strong>{text.split(" ").slice(4).join(" ")}</strong>
                                </>
                            ) : (
                                <strong>{text}</strong>
                            )}
                        </li>
                    ))}
                </ul>

                <Link
                    to="/register"
                    style={{
                        display: "inline-block",
                        padding: "1rem 2rem",
                        borderRadius: 999,
                        background: "rgb(76, 120, 101)",
                        color: "#fff",
                        fontWeight: 800,
                        letterSpacing: ".03em",
                        textDecoration: "none",
                        fontSize: "clamp(1rem,1.2vw,1.1rem)",
                        boxShadow: "0 10px 28px rgba(0,0,0,.25)",
                        transition: "all .25s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-3px)";
                        e.currentTarget.style.background = "rgb(86, 138, 115)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.background = "rgb(76, 120, 101)";
                    }}
                >
                    QUICK REGISTRATION
                </Link>
            </div>
        </section>
    );
}
