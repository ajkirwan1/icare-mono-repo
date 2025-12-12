import React, { useEffect, useRef } from "react";
import { IcareHeroNew, IcareButton } from "react-library";
import { Link } from "react-router";
import navLinks from "./nav-links";

export default function HeroComponent({ imgSrc }) {
    const heroRef = useRef(null);

    /* PARALLAX */
    useEffect(() => {
        const hero = heroRef.current;
        if (!hero) return;
        const img = hero.querySelector("img");

        const handleScroll = () => {
            const rect = hero.getBoundingClientRect();
            const offset = rect.top * 0.12;
            if (img) img.style.transform = `translateY(${offset}px) scale(1.05)`;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <IcareHeroNew
            imageSrc={imgSrc}
            slot="hero-content"
            ref={heroRef}
            style={{ overflow: "hidden" }}
        >

            {/* ========================= NAV ========================= */}
            {navLinks.map((link) => (
                <li slot="nav-links" key={link.to} style={{ listStyle: "none", margin: 0 }}>
                    <Link
                        to={link.to}
                        style={{
                            color: "rgba(255,255,255,.92)",
                            padding: ".35rem 0",
                            textDecoration: "none",
                            fontSize: "1.15rem",
                            fontWeight: 500,
                            letterSpacing: "-0.25px",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.color = "rgba(255,255,255,.92)")
                        }
                    >
                        {link.text}
                    </Link>
                </li>
            ))}

            {/* ========================= HEADER BUTTON ========================= */}
            <li slot="header-buttons" style={{ listStyle: "none" }}>
                <IcareButton
                    href="/register"
                    style={{
                        borderRadius: "999px",
                        padding: ".65rem 1.1rem",
                        fontWeight: 700,
                        fontSize: "1rem",
                        background: "rgba(255,255,255,.15)",
                        border: "1.5px solid rgba(255,255,255,.75)",
                        color: "#ffffff",
                        backdropFilter: "blur(6px)",
                        transition: "all .25s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,1)";
                        e.currentTarget.style.background = "rgba(255,255,255,.25)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,.75)";
                        e.currentTarget.style.background = "rgba(255,255,255,.15)";
                    }}
                >
                    Get Started
                </IcareButton>
            </li>

            {/* ========================= HEADER CONTENT ========================= */}
            <span
                slot="header-content"
                style={{
                    display: "block",
                    width: "min(92vw, 1100px)",
                    marginTop: "6rem",
                    textAlign: "left",
                    color: "#fff",
                    textShadow: "0 2px 16px rgba(0,0,0,.35)",
                    transform: "translateX(-25%) scale(1.1)",
                    transformOrigin: "top left",
                }}
            >
                <h1
                    style={{
                        margin: ".35rem 0 0",
                        fontWeight: 900,
                        letterSpacing: "-0.35px",
                        lineHeight: 1.05,
                        fontSize: "clamp(3rem, 5.2vw, 4.2rem)",
                        color: "#fdfdfd",
                    }}
                >
                    ICare
                </h1>
            </span>

            {/* ========================= SUBHEADER ========================= */}
            <span
                slot="subheader-content"
                style={{
                    display: "block",
                    width: "min(92vw, 1100px)",
                    marginTop: "1rem",
                    textAlign: "left",
                    color: "rgba(255,255,255,.94)",
                    fontSize: "clamp(1.25rem, 2vw, 1.55rem)",
                    lineHeight: 1.55,
                    letterSpacing: "-0.25px",
                    transform: "translateX(-25%) scale(1.1)",
                    transformOrigin: "top left",
                }}
            >
                <span style={{ display: "block", maxWidth: 600 }}>
                    <strong
                        style={{
                            display: "block",
                            marginBottom: ".25rem",
                            fontSize: "1.8rem",
                            fontWeight: 800,
                        }}
                    >

                        Find a trusted and verified caregiver in your local area

                    </strong>

                </span>
                <div style={{ marginTop: "2.2rem", maxWidth: "48ch" }}>
                    <h2
                        style={{
                            fontSize: "1.45rem",
                            fontWeight: 800,
                            color: "#fff",
                            margin: 0,
                            letterSpacing: "-0.3px",
                        }}
                    >
                        ICare is launching soon
                    </h2>

                    <p
                        style={{
                            marginTop: ".7rem",
                            fontSize: "1.05rem",
                            color: "rgba(255,255,255,0.9)",
                            lineHeight: 1.55,
                        }}
                    >
                        We’re preparing trusted caregivers and finalising our platform.
                        Join the early access list to be notified when ICare becomes available in your area.
                    </p>

                    {/* Bullets */}
                    <ul
                        style={{
                            listStyle: "none",
                            padding: 0,
                            margin: "1.2rem 0 1.6rem 0",
                            display: "grid",
                            gap: "0.65rem",
                        }}
                    >
                        {[
                            "Verified caregivers arriving soon",
                            "Secure messaging & transparent pricing",
                            "Early access to care matches",
                        ].map((text) => (
                            <li
                                key={text}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    fontSize: "1rem",
                                    color: "rgba(255,255,255,0.9)",
                                }}
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#1FAB1F"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                {text}
                            </li>
                        ))}
                    </ul>

                    {/* Email form */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            alert("You're on the early access list!");
                        }}
                        style={{
                            display: "flex",
                            gap: "8px",
                            maxWidth: "420px",
                        }}
                    >
                        <input
                            name="email"
                            placeholder="Enter your email"
                            required
                            style={{
                                flex: 1,
                                padding: "12px 14px",
                                borderRadius: "10px",
                                border: "1px solid rgba(255,255,255,0.35)",
                                background: "rgba(255,255,255,0.12)",
                                color: "#fff",
                                fontSize: "0.95rem",
                                outline: "none",
                            }}
                        />

                        <button
                            type="submit"
                            style={{
                                padding: "12px 18px",
                                borderRadius: "10px",
                                background: "#1FAB1F",
                                color: "#fff",
                                border: "none",
                                fontWeight: 700,
                                fontSize: "0.95rem",
                                cursor: "pointer",
                            }}
                        >
                            JOIN WAITING LIST
                        </button>
                    </form>
                </div>

                {/* ========================= CTAS ========================= */}
                {/* ========================= CTAS ========================= */}
                <div
                    style={{
                        display: "flex",
                        gap: "1rem",
                        marginTop: "2rem",
                        transform: "translateX(0) scale(1)",
                    }}
                >

                    {/* JEDYNY BUTTON — EARTH CLAY CTA */}
                    <a
                        href="#how-it-works"
                        style={{
                            padding: ".9rem 1.4rem",
                            borderRadius: "999px",
                            border: "2px solid #B97A57",
                            background: "#B97A57",
                            color: "#fff",
                            fontWeight: 600,
                            letterSpacing: "-0.2px",
                            fontSize: "clamp(1rem, 1.3vw, 1rem)",
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.55rem",
                            transition: "all .25s ease",
                            boxShadow: "0 6px 16px rgba(0,0,0,0.16)",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#C89A80";
                            e.currentTarget.style.borderColor = "#C89A80";
                            e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#B97A57";
                            e.currentTarget.style.borderColor = "#B97A57";
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        How ICare works

                        {/* MINIMALISTYCZNA STRZAŁKA → */}
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                                transition: "transform .3s ease, opacity .3s ease",
                                opacity: 0.9,
                            }}
                            className="arrow-icon"
                        >
                            <path d="M5 12h14" />
                            <path d="M13 5l7 7-7 7" />
                        </svg>
                    </a>

                </div>

            </span>

        </IcareHeroNew>
    );
}
