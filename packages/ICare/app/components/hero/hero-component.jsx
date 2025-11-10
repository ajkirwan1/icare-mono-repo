import React from "react";
import { IcareHeroNew, IcareButton } from "react-library";
import { Link } from "react-router";
import navLinks from "./nav-links";

export default function HeroComponent({ imgSrc }) {
    return (
        <IcareHeroNew imageSrc={imgSrc} slot="hero-content">
            {/* NAV LINKS — większe + smooth hover */}
            {navLinks.map((link) => (
                <li slot="nav-links" key={link.to} style={{ listStyle: "none", margin: 0 }}>
                    <Link
                        to={link.to}
                        style={{
                            display: "inline-block",
                            padding: "0.24rem 0",
                            textDecoration: "none",
                            fontSize: "1.05rem",             // ← większe nav linki
                            fontWeight: 600,
                            letterSpacing: ".01em",
                            color: "rgba(255,255,255,.9)",
                            marginInline: "0.45rem",
                            textUnderlineOffset: "6px",
                            transition:
                                "color .22s ease, text-decoration-color .22s ease, text-underline-offset .22s ease"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#fff";
                            e.currentTarget.style.textDecoration = "underline";
                            e.currentTarget.style.textDecorationThickness = "2px";
                            e.currentTarget.style.textUnderlineOffset = "7px";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = "rgba(255,255,255,.9)";
                            e.currentTarget.style.textDecoration = "none";
                            e.currentTarget.style.textUnderlineOffset = "6px";
                        }}
                    >
                        {link.text}
                    </Link>
                </li>
            ))}

            {/* CTA — neutralny outline (bez zielonego) */}
            <li slot="header-buttons" style={{ listStyle: "none" }}>
                <IcareButton
                    href="/register"
                    style={{
                        appearance: "none",
                        borderRadius: 999,
                        padding: ".85rem 1.15rem",
                        fontWeight: 800,
                        letterSpacing: ".05em",
                        cursor: "pointer",
                        background: "transparent",
                        color: "#ffffff",
                        border: "2px solid rgba(255,255,255,.78)",
                        boxShadow: "0 8px 24px rgba(0,0,0,.28)",
                        transition:
                            "transform .18s ease, box-shadow .25s ease, border-color .25s ease, background .25s ease, color .25s ease"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-1px)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,.98)";
                        e.currentTarget.style.background = "rgba(2,8,23,.22)";
                        e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,.36)";
                        e.currentTarget.style.color = "#ffffff";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,.78)";
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,.28)";
                        e.currentTarget.style.color = "#ffffff";
                    }}
                >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                        Get Started
                        <svg
                            width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M5 12h14" />
                            <path d="M13 5l7 7-7 7" />
                        </svg>
                    </span>
                </IcareButton>
            </li>

            {/* HEADER CONTENT — wszystko startuje z tej samej lewej linii */}
            <span
                slot="header-content"
                style={{
                    display: "block",
                    width: "min(92vw, 1100px)", // ← główna szerokość linii dla hero
                    marginTop: "6rem",
                    textAlign: "left",
                    color: "#fff",
                    textShadow: "0 2px 16px rgba(0,0,0,.35)",
                    fontFamily:
                        "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                    marginLeft: 0,
                }}
            >
                {/* eyebrow */}
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
                        marginLeft: 0,
                        transform: "translateX(-15%)",   // ← było -30%
                        willChange: "transform",
                    }}
                >
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
                            background: "#1fab1f78",
                            backdropFilter: "blur(4px)",
                            marginBottom: ".6rem",
                        }}
                    >
                        platform for better care
                    </span>

                    <h1
                        style={{
                            margin: ".35rem 0 0",
                            fontWeight: 900,
                            letterSpacing: ".2px",
                            lineHeight: 1.05,
                            fontSize: "clamp(2.4rem, 5.2vw, 4.4rem)",
                            color: "#4C7865",
                            textShadow: "none",
                        }}
                    >
                        ICare
                    </h1>
                </span>

                <span
                    slot="subheader-content"
                    style={{
                        display: "block",
                        width: "min(92vw, 1100px)",
                        textAlign: "left",
                        marginTop: "1rem",
                        color: "rgba(255,255,255,.94)",
                        fontSize: "clamp(1.2rem, 2vw, 1.45rem)",
                        lineHeight: 1.6,
                        textShadow: "0 1px 12px rgba(0,0,0,.3)",
                        marginLeft: 0,
                        transform: "translateX(-15%)",   // ← było -30%
                        willChange: "transform",
                    }}
                >
                    <span style={{ display: "block", maxWidth: 600 }}>
                        <strong style={{ display: "block", marginBottom: ".15rem" }}>
                            We are not an agency.
                        </strong>
                        ICare is the answer to the real needs of families — helping them safely connect with
                        trusted caregivers.
                    </span>
                </span>

            </span>
        </IcareHeroNew>

    );

}
