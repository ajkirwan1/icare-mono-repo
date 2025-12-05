import React from "react";
import { Link } from "react-router";
import heroImage from "/images/heros/icare-for-carereceivers.jpg";

const BRAND = "#4C7865";

export default function ICareForCareReceiversHero() {
    return (
        <section
            aria-label="ICare for Care Receivers hero"
            style={{
                position: "relative",
                minHeight: "clamp(480px, 66vh, 760px)",
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
                alt="Care support background"
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "brightness(.72) saturate(.97)",
                }}
            />

            {/* Soft overlay */}
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
                        fontSize: "clamp(1.2rem,1.7vw,1.45rem)",
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
                    paddingTop: "clamp(4.5rem,8vw,7rem)",
                    paddingBottom: "clamp(3.5rem,5vw,5.5rem)",
                }}
            >

                {/* H1 — NEW */}
                <h1
                    style={{
                        fontWeight: 900,
                        lineHeight: 1.05,
                        fontSize: "clamp(2.4rem,4.2vw,2.6rem)",
                        margin: "0 0 1.5rem 0",
                        color: "#fff",
                        maxWidth: "16ch",
                    }}
                >
                    Find trusted caregivers near you
                </h1>

                {/* Lead paragraph — NEW */}
                <p
                    style={{
                        fontSize: "clamp(1.05rem,1.25vw,1.2rem)",
                        lineHeight: 1.65,
                        maxWidth: "60ch",
                        color: "rgba(255,255,255,.96)",
                        marginBottom: "2.2rem",
                    }}
                >
                    Get personalised help for your family — verified caregivers, clear terms, no agency markups.
                </p>

                {/* LIST — UPDATED TEXT */}
                <ul
                    style={{
                        listStyle: "none",
                        padding: 0,
                        margin: "0 0 2.8rem 0",
                        display: "grid",
                        gap: "0.95rem",
                        maxWidth: 760,
                    }}
                >
                    {[
                        "Care tailored to your needs",
                        "Private & secure messaging",
                        "Transparent one-time fee",
                        "Caregivers keep 90%",
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
                                    width: "10px",
                                    height: "10px",
                                    borderRadius: "50%",
                                    border: "2px solid #ffffff",
                                }}
                            ></span>

                            {text}
                        </li>
                    ))}
                </ul>

                {/* CTA BUTTONS — TWO BUTTONS */}
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    {/* Primary CTA */}
                    <Link
                        to="/register"
                        style={{
                            padding: "1rem 2rem",
                            borderRadius: 999,
                            background: "rgba(18, 96, 18, 1)",
                            color: "#fff",
                            fontWeight: 700,
                            letterSpacing: ".02em",
                            textDecoration: "none",
                            fontSize: "clamp(1rem,1.2vw,1rem)",
                            transition: "all .22s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-2px)";

                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";

                        }}
                    >
                        Find a caregiver
                    </Link>

                    {/* Secondary CTA */}
                    <Link
                        to="/how-it-works"
                        style={{
                            padding: "1rem 2rem",
                            borderRadius: 999,
                            border: "2px solid rgba(255,255,255,0.65)",
                            background: "rgba(255,255,255,0.10)",
                            backdropFilter: "blur(6px)",
                            color: "#FFFFFF",
                            fontWeight: 700,
                            letterSpacing: ".02em",
                            textDecoration: "none",
                            fontSize: "clamp(1rem,1.2vw,1rem)",
                            transition: "all .22s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(255,255,255,0.22)";
                            e.currentTarget.style.border = "2px solid rgba(255,255,255,0.85)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(255,255,255,0.10)";
                            e.currentTarget.style.border = "2px solid rgba(255,255,255,0.65)";
                        }}
                    >
                        How ICare Works
                    </Link>
                </div>
            </div>
        </section>

    );
}
