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
                            fontSize: "1.6rem",
                            fontWeight: 800,
                        }}
                    >
                        Find a trusted caregiver
                    </strong>
                    Independent, verified carers. No agency markup.
                    Simple, safe and affordable home care.
                </span>

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
