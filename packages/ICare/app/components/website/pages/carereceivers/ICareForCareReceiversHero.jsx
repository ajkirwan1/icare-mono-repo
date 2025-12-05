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
                minHeight: "clamp(580px, 78vh, 920px)",
                width: "100%",
                overflow: "hidden",
                display: "grid",
                placeItems: "center",
                color: "#fff",
                background: "#0f172a",
            }}
        >
            {/* Background Image */}
            <img
                src={heroImage}
                alt="Care support background"
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    filter: "brightness(.90) contrast(1.0) saturate(1.05)",
                    zIndex: 0,
                }}
            />

            {/* Overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(180deg, rgba(38,50,56,0.4) 0%, rgba(15, 23, 42, 0.43) 90%)",
                    zIndex: 1,
                }}
            />

            {/* Sticky Nav */}
            <header
                id="nav-icare"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1rem clamp(20px,4vw,48px)",
                    transition: "all .3s ease",
                    background: "rgba(0,0,0,0.25)",
                    backdropFilter: "blur(10px)",
                    borderBottom: "1px solid rgba(255,255,255,0.15)",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
                }}
            >
                <Link
                    to="/"
                    style={{
                        fontWeight: 900,
                        color: "#ffffff",
                        fontSize: "clamp(1.3rem,2.4vw,1.6rem)",
                        textDecoration: "none",
                        textShadow: "0 2px 10px rgba(0,0,0,0.45)",
                    }}
                >
                    ICare
                </Link>

                <nav
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "1.1rem 1.6rem",
                    }}
                >
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
                                padding: ".2rem 0",
                                transition: "all .18s ease",
                                textShadow: "0 2px 12px rgba(0,0,0,0.35)",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-2px)";
                                e.currentTarget.style.textShadow =
                                    "0 4px 18px rgba(0,0,0,0.55)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.textShadow =
                                    "0 2px 12px rgba(0,0,0,0.35)";
                            }}
                        >
                            {l.label}
                        </Link>
                    ))}
                </nav>
            </header>

            {/* HERO CONTENT */}
            <div
                style={{
                    zIndex: 2,
                    width: "min(1100px, 92vw)",
                    marginInline: "auto",
                    padding: "clamp(3rem,5vw,6rem) 0",
                }}
            >
                {/* Badge */}
                <span
                    style={{
                        display: "inline-block",
                        marginBottom: "1.6rem",
                        padding: ".55rem 1.1rem",
                        fontSize: ".82rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: ".12em",
                        color: "#EAF7EA",
                        background: "rgba(76,120,101,0.32)",
                        border: "1.5px solid rgba(76,120,101,0.55)",
                        borderRadius: 999,
                    }}
                >
                    Safe • Direct • Trusted
                </span>

                {/* Title */}
                <h1
                    style={{
                        margin: 0,
                        fontWeight: 800,
                        letterSpacing: "-0.3px",
                        fontSize: "clamp(2.4rem,4vw,3.6rem)",
                        lineHeight: 1.07,
                        color: "#fff",
                        maxWidth: "22ch",
                        textShadow: "0 2px 14px rgba(0,0,0,.55)",
                    }}
                >
                    ICare for Care Receivers
                </h1>

                {/* Subcopy */}
                <p
                    style={{
                        marginTop: "1.4rem",
                        fontSize: "clamp(1.08rem,1.4vw,1.25rem)",
                        lineHeight: 1.75,
                        color: "rgba(255,255,255,.92)",
                        maxWidth: "55ch",
                    }}
                >
                    <b>
                        Create a free account, browse verified caregivers, and agree fair terms
                        directly.
                    </b>
                </p>

                {/* Bullet List */}
                <ul
                    style={{
                        listStyle: "none",
                        padding: 0,
                        margin: "1.6rem 0 2.2rem",
                        display: "grid",
                        gap: ".75rem",
                        maxWidth: 700,
                        color: "rgba(255,255,255,.96)",
                    }}
                >
                    {[
                        "Find trusted caregivers tailored to your needs",
                        "Communicate privately and securely",
                        "Agree transparent terms without agencies",
                        "Only a one-time fee when you sign an agreement",
                    ].map((text) => (
                        <li
                            key={text}
                            style={{
                                position: "relative",
                                paddingLeft: "2rem",
                                fontSize: "1.08rem",
                                lineHeight: 1.6,
                                textShadow: "0 1px 8px rgba(0,0,0,.5)",
                            }}
                        >
                            <span
                                style={{
                                    position: "absolute",
                                    left: 0,
                                    top: 0,
                                    fontWeight: 900,
                                    color: "#EAF7EA",
                                }}
                            >
                                ✓
                            </span>
                            {text}
                        </li>
                    ))}
                </ul>

                {/* CTA Button */}
                <Link
                    to="/register"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "1rem 1.5rem",
                        background: BRAND,
                        color: "#fff",
                        borderRadius: 999,
                        fontWeight: 700,
                        fontSize: "1.05rem",
                        textDecoration: "none",
                        boxShadow: "0 14px 32px rgba(0,0,0,0.22)",
                        transition: "all .22s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-3px)";
                        e.currentTarget.style.boxShadow =
                            "0 18px 36px rgba(0,0,0,0.28)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                            "0 14px 32px rgba(0,0,0,0.22)";
                    }}
                >
                    Join us in just 2 minutes
                </Link>
            </div>
        </section>
    );
}
