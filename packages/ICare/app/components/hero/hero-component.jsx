import React, { useEffect, useRef } from "react";
import { IcareHeroNew, IcareButton } from "react-library";
import { Link } from "react-router";
import navLinks from "./nav-links";

export default function HeroComponent({ imgSrc }) {
    const heroRef = useRef(null);

    /* ===================== PARALLAX — delikatny, elegancki ===================== */
    useEffect(() => {
        const hero = heroRef.current;
        if (!hero) return;

        const img = hero.querySelector("img");

        const handleScroll = () => {
            const rect = hero.getBoundingClientRect();
            const offset = rect.top * 0.12; // ← delikatny parallax
            if (img) img.style.transform = `translateY(${offset}px) scale(1.05)`;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <IcareHeroNew imageSrc={imgSrc} slot="hero-content" ref={heroRef}
            style={{
                overflow: "hidden",
            }}
        >

            {/* ========================= NAV LINKS ========================= */}
            {navLinks.map((link) => (
                <li slot="nav-links" key={link.to} style={{ listStyle: "none", margin: 0 }}>
                    <Link
                        to={link.to}
                        style={{
                            position: "relative",
                            display: "inline-block",
                            padding: ".32rem 0",
                            textDecoration: "none",
                            fontSize: "1.18rem",
                            fontWeight: 500,
                            letterSpacing: "-0.25px",
                            color: "rgba(255,255,255,.92)",
                            marginInline: "0.65rem",
                            transition: "color .25s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#fff";
                            const underline = e.currentTarget.querySelector(".underline-anim");
                            underline.style.transform = "scaleX(1)";
                            underline.style.opacity = "1";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = "rgba(255,255,255,.92)";
                            const underline = e.currentTarget.querySelector(".underline-anim");
                            underline.style.transform = "scaleX(0)";
                            underline.style.opacity = "0";
                        }}
                    >
                        {link.text}

                        {/* animated underline */}
                        <span
                            className="underline-anim"
                            style={{
                                position: "absolute",
                                left: 0,
                                bottom: "-2px",
                                width: "100%",
                                height: "2px",
                                backgroundColor: "#fff",
                                transform: "scaleX(0)",
                                transformOrigin: "left",
                                opacity: 0,
                                transition: "transform .28s ease, opacity .28s ease",
                                borderRadius: 999,
                            }}
                        />
                    </Link>

                </li>
            ))}

            {/* ========================= CTA BUTTON ========================= */}
            <li slot="header-buttons" style={{ listStyle: "none" }}>
                <IcareButton
                    href="/register"
                    style={{
                        appearance: "none",
                        borderRadius: 999,
                        padding: ".85rem 1.25rem",
                        fontWeight: 800,
                        letterSpacing: "-0.15px",
                        fontSize: "1.05rem",
                        cursor: "pointer",
                        background: "transparent",
                        color: "#ffffff",
                        border: "2px solid rgba(255,255,255,.78)",
                        boxShadow: "0 8px 24px rgba(0,0,0,.28)",
                        transition: "all .25s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-1px)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,.98)";
                        e.currentTarget.style.background = "rgba(2,8,23,.22)";
                        e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,.36)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,.78)";
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,.28)";
                    }}
                >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                        Get Started
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14" />
                            <path d="M13 5l7 7-7 7" />
                        </svg>
                    </span>
                </IcareButton>
            </li>

            {/* ========================= HEADER CONTENT ========================= */}
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
                    fontFamily:
                        "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",

                    /* przesunięcie w lewo + powiększenie o 10% */
                    transform: "translateX(-25%) scale(1.1)",
                    transformOrigin: "top left",
                }}
            >

                {/* EYEBROW */}
                <span
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: ".56rem .8rem",
                        borderRadius: 999,
                        fontSize: "clamp(.84rem, 1.52vw, 1.08rem)",
                        letterSpacing: ".16em",
                        textTransform: "uppercase",
                        fontWeight: 900,
                        color: "#cffafe",
                        border: "1px solid rgba(207,250,254,.5)",
                        background: "#1fab1f3e",
                        backdropFilter: "blur(4px)",
                        marginBottom: ".8rem",
                    }}
                >
                    platform for better care
                </span>

                {/* H1 */}
                <h1
                    style={{
                        margin: ".35rem 0 0",
                        fontWeight: 900,
                        letterSpacing: "-0.35px",
                        lineHeight: 1.05,
                        fontSize: "clamp(3rem, 5.2vw, 4.2rem)",
                        color: "#AD7A66",
                        textShadow: "none",
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
                    textAlign: "left",
                    marginTop: "1rem",
                    color: "rgba(255,255,255,.94)",
                    fontSize: "clamp(1.25rem, 2vw, 1.55rem)",
                    lineHeight: 1.55,
                    letterSpacing: "-0.25px",
                    textShadow: "0 1px 12px rgba(0,0,0,.3)",
                    fontWeight: 500,

                    /* przesunięcie w lewo + powiększenie o 10% */
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
                            letterSpacing: "-0.3px",
                            fontWeight: 800,
                        }}
                    >
                        We are not an agency.
                    </strong>
                    ICare is the answer to the real needs of families — helping them safely connect
                    with trusted caregivers.
                </span>
            </span>


        </IcareHeroNew>
    );
}
