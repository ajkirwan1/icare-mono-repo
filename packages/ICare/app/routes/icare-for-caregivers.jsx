import React from "react";
import { Link } from "react-router";
import HeroComponent from "../components/hero/hero-component"
import { IcareHeroNew, IcareButton, IcarePage, IcareSection, IcareCard } from "react-library";
import iCareForCarereceiversSrc from "/images/heros/icare-for-carereceivers.jpg";
import heroImage from "/images/heros/icare-for-caregivers.jpg";
import userIcon from "/images/icons/usersignup.svg";
import navLinks from "../components/hero/nav-links";
import styles from "./icare-for-caregivers.module.scss";





export default function ICareForCaregivers() {
    return (
        <div className={styles.page}>
            {/* === HERO (bez niebieskiego prostokąta / glass panelu) === */}
            <section
                aria-label="ICare for Caregivers hero"
                style={{
                    position: "relative",
                    minHeight: "clamp(600px, 76vh, 900px)",
                    width: "100%",
                    overflow: "hidden",
                    display: "grid",
                    placeItems: "center",
                    color: "#fff",
                    background:
                        "radial-gradient(80rem 40rem at 10% 10%, rgba(51,174,186,.06), transparent 60%), radial-gradient(80rem 40rem at 90% 90%, rgba(17,119,128,.06), transparent 60%), linear-gradient(160deg, #0b1220 0%, #0f172a 65%, #0b1220 100%)",
                }}
            >
                {/* tło zdjęciowe */}
                <img
                    src={heroImage}
                    alt="Care coordination background"
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        filter: "brightness(.7) contrast(1.06) saturate(.98)",
                        zIndex: 0,
                    }}
                />

                {/* overlay przyciemniający (vignette dla czytelności) */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "radial-gradient(75% 55% at 50% 45%, rgba(0,0,0,.22) 0%, rgba(0,0,0,.38) 60%, rgba(0,0,0,.52) 100%)",
                        zIndex: 1,
                        pointerEvents: "none",
                    }}
                />

                {/* header (brand + nawigacja) */}
                <header
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem",
                        padding: "1rem clamp(1rem, 4vw, 2rem)",
                        background: "rgba(2,8,23,0.28)",
                        backdropFilter: "saturate(1.05) blur(4px)",
                        borderBottom: "1px solid rgba(255,255,255,0.14)",
                    }}
                >
                    <Link
                        to="/"
                        style={{
                            fontFamily:
                                "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                            fontWeight: 900,
                            letterSpacing: "0.3px",
                            color: "#ffffff",
                            textDecoration: "none",
                            fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)",
                            textShadow: "0 1px 10px rgba(0,0,0,.4)",
                        }}
                    >
                        ICare
                    </Link>

                    <nav
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0.75rem 1.1rem",
                            alignItems: "center",
                        }}
                    >
                        {[
                            { to: "/", label: "Home" },
                            { to: "/how-it-works", label: "How it Works" },
                            { to: "/who-we-are", label: "Who We Are" },
                            { to: "/privacy", label: "Privacy" },
                            { to: "/icare-for-caregivers", label: "ICare For Caregivers" },
                            { to: "/icare-for-carereceivers", label: "ICare For Carereceivers" },
                        ].map((l) => (
                            <Link
                                key={l.to}
                                to={l.to}
                                style={{
                                    color: "rgba(255,255,255,.95)",
                                    textDecoration: "none",
                                    fontSize: "clamp(.9rem, 1.2vw, 1rem)",
                                    padding: ".45rem .7rem",
                                    borderRadius: "999px",
                                    border: "1px solid rgba(255,255,255,.20)",
                                    background: "rgba(255,255,255,.06)",
                                    transition:
                                        "transform .15s ease, background .15s ease, border-color .15s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                    e.currentTarget.style.background = "rgba(255,255,255,.12)";
                                    e.currentTarget.style.borderColor = "rgba(255,255,255,.32)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.background = "rgba(255,255,255,.06)";
                                    e.currentTarget.style.borderColor = "rgba(255,255,255,.20)";
                                }}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>
                </header>

                {/* HERO content — bez tła/panelu, tylko typografia + cień */}
                <div
                    style={{
                        position: "relative",
                        zIndex: 2,
                        width: "min(92vw, 1080px)",
                        marginInline: "auto",
                        textAlign: "center",
                        padding: "clamp(2rem, 4vw, 4rem) 0",
                        fontFamily:
                            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                    }}
                >
                    <h1
                        style={{
                            fontWeight: 800,
                            letterSpacing: ".2px",
                            lineHeight: 1.05,
                            fontSize: "clamp(2rem, 4vw, 3.5rem)",
                            margin: "0 0 .9rem 0",
                            color: "#ffffff",
                            textShadow:
                                "0 2px 18px rgba(0,0,0,.45), 0 0 2px rgba(0,0,0,.35)",
                        }}
                    >
                        ICare for <span style={{ color: "#1fab1fff" }}>Caregivers</span>
                    </h1>

                    <p
                        style={{
                            margin: "0 0 1.15rem 0",
                            fontSize: "clamp(.98rem, 1.2vw, 1.15rem)",
                            letterSpacing: ".14em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,.96)",
                            textShadow: "0 1px 10px rgba(0,0,0,.45)",
                        }}
                    >

                    </p>

                    {/* lead */}
                    <p
                        style={{
                            margin: "0 auto 2rem auto",
                            fontSize: "clamp(1.2rem, 1.35vw, 1.15rem)",
                            lineHeight: 2,
                            color: "rgba(255,255,255,.98)",
                            maxWidth: 500,
                            textShadow: "0 1px 10px rgba(0,0,0,.45)",
                        }}
                    >
                        <strong>
                            PROVIDES A SIMPLE MODEL IN WHICH YOU AGREE THE TERMS OF CARE WITH YOUR CLIENT
                        </strong>
                    </p>

                    {/* punkty */}
                    <ul
                        style={{
                            listStyle: "none",
                            padding: 0,
                            margin: "0 auto clamp(1.6rem, 3.5vw, 2.6rem) auto",
                            maxWidth: 820,
                            display: "grid",
                            gap: ".7rem",
                            textAlign: "left",
                            color: "rgba(255,255,255,.98)",
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
                                    fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
                                    lineHeight: 1.6,
                                    textShadow: "0 1px 8px rgba(0,0,0,.5)",
                                }}
                            >
                                <span
                                    aria-hidden="true"
                                    style={{
                                        position: "absolute",
                                        left: 0,
                                        top: 0,
                                        transform: "translateY(.05rem)",
                                        fontWeight: 800,
                                        fontSize: "1.05em",
                                        color: "#ffffffff",
                                        textShadow: "0 0 10px rgba(0,0,0,.45)",
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

                    {/* CTA */}
                    <div
                        style={{
                            display: "flex",
                            gap: ".9rem",
                            alignItems: "center",
                            justifyContent: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <button
                            style={{
                                appearance: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: ".95rem 1.25rem",
                                fontWeight: 600,
                                letterSpacing: ".6px",
                                borderRadius: 999,
                                background: "linear-gradient(90deg, #0f970fff, #0f970fff)",
                                color: "#ffffffff",
                                boxShadow:
                                    "0 1px 1px rgba(4, 4, 4, 0.45), inset 0 1px 0 rgba(255,255,255,.55)",
                                transition:
                                    "transform .18s ease, box-shadow .18s ease, filter .18s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-1px)";
                                e.currentTarget.style.boxShadow =
                                    "0 1px 1px rgba(51,174,186,.52), inset 0 1px 0 rgba(255,255,255,.65)";
                                e.currentTarget.style.filter = "saturate(1.06)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow =
                                    "0 1px 1px rgba(51,174,186,.45), inset 0 1px 0 rgba(255,255,255,.55)";
                                e.currentTarget.style.filter = "saturate(1)";
                            }}
                        >
                            QUICK REGISTRATION
                        </button>

                        <a
                            href="#how-it-works"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: ".4rem",
                                padding: ".9rem 1.1rem",
                                borderRadius: 999,
                                color: "#e7eaff",
                                textDecoration: "none",
                                border: "1px solid rgba(231,234,255,.4)",
                                background: "rgba(99,102,241,.14)",
                                transition:
                                    "border-color .18s ease, background .18s ease, transform .18s ease",
                                textShadow: "0 1px 8px rgba(0,0,0,.45)",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-1px)";
                                e.currentTarget.style.borderColor = "rgba(231,234,255,.65)";
                                e.currentTarget.style.background = "rgba(99,102,241,.2)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.borderColor = "rgba(231,234,255,.4)";
                                e.currentTarget.style.background = "rgba(99,102,241,.14)";
                            }}
                        >
                            See how it works
                        </a>
                    </div>
                </div>
            </section>



            {/* === MISSION PILLARS (alt beige, no hover, more spacing, no vertical line) === */}
            <section
                aria-label="Mission pillars"
                style={{
                    position: "relative",
                    maxWidth: 1100,
                    margin: "0 auto",
                    padding: "88px 32px",
                    fontFamily:
                        "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                    background: "linear-gradient(180deg, #FAFCFD 0%, #FFFFFF 70%)",
                    borderRadius: 20,
                }}
            >
                {/* miękkie poświaty (zostawiam subtelne, możesz usunąć jeśli chcesz jeszcze czyściej) */}
                <span
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        left: -160,
                        top: -120,
                        width: 520,
                        height: 260,
                        borderRadius: "50%",
                        background:
                            "radial-gradient(closest-side, rgba(51,174,186,.12), rgba(51,174,186,0) 70%)",
                        filter: "blur(8px)",
                        pointerEvents: "none",
                    }}
                />
                <span
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        right: -200,
                        bottom: -160,
                        width: 560,
                        height: 280,
                        borderRadius: "50%",
                        background:
                            "radial-gradient(closest-side, rgba(17,119,128,.10), rgba(17,119,128,0) 70%)",
                        filter: "blur(12px)",
                        pointerEvents: "none",
                    }}
                />

                {[
                    { t: "SIMPLE AND FREE REGISTRATION", d: "Registering an account is simple, free, and safe. You only need to provide base information to create an account." },
                    { t: "CONTACT CLIENTS DIRECTLY", d: "Contact potential clients and their families to understand care needs and family expectations before concluding a contract agreement." },
                    { t: "INCREASE YOUR EARNINGS", d: "We listen to caregivers and families to simplify every step of the process. When you connect and agree on terms directly, there’s no middleman — just fair pay for your valuable work." },
                    { t: "TAILOR YOUR PROFILE", d: "Upload your CV and resume, acquire background checks, and list your specialist skills to enhance your visibility and employability." },
                    { t: "MANAGE YOUR OWN EMPLOYMENT CONTRACTS", d: "By directly contacting and arranging employment contracts." },
                ].map((p, idx) => {
                    const isAlt = idx % 2 === 1;
                    // delikatny beż dla co drugiej karty
                    const beige = "rgba(246, 241, 233, 0.64)";          // #F6F1E9 z lekką przezroczystością
                    const beigeBorder = "1px solid rgba(210, 195, 170, 0.31)"; // ciepła, subtelna ramka
                    const whiteBorder = "1px solid #D7EEF1";

                    return (
                        <article
                            key={p.t}
                            role="article"
                            aria-label={p.t}
                            style={{
                                position: "relative",
                                background: isAlt ? beige : "#FFFFFF",
                                border: isAlt ? beigeBorder : whiteBorder,
                                borderRadius: 24,
                                padding: "36px 28px 36px clamp(118px, 13vw, 168px)", // więcej „oddechu”
                                boxShadow: "0 10px 26px rgba(2,8,23,0.05)",
                                boxSizing: "border-box",
                                margin: "34px 0", // większe odstępy między kartami
                            }}
                        >
                            {/* brak pionowej listwy po lewej — usunięta */}
                            {/* numer badge */}
                            <span
                                aria-hidden="true"
                                style={{
                                    position: "absolute",
                                    left: 12,
                                    top: 14,
                                    width: 72,
                                    height: 72,
                                    borderRadius: "9999px",
                                    background: "#FFFFFF",
                                    border: "2px solid #33AEBA",
                                    display: "grid",
                                    placeItems: "center",
                                    fontWeight: 800,
                                    fontSize: 32,
                                    color: "#0E7490",
                                    letterSpacing: "0.4px",
                                    boxShadow: "0 6px 16px rgba(4, 47, 46, .08)",
                                    textShadow: "0 1px 0 rgba(255,255,255,.6)",
                                }}
                            >
                                {idx + 1}
                            </span>

                            <h3
                                style={{
                                    margin: 0,
                                    color: "#7c7c7cff",
                                    fontWeight: 900,
                                    letterSpacing: "0.6px",
                                    fontSize: "clamp(19px, 2.1vw, 24px)",
                                    lineHeight: 1.25,
                                }}
                            >
                                {p.t}
                            </h3>

                            {/* akcentowa linia pod nagłówkiem (delikatna) */}
                            <div
                                style={{
                                    width: "100%",
                                    height: 2,
                                    marginTop: 10,
                                    marginBottom: 14,
                                    borderRadius: 999,
                                    background:
                                        "linear-gradient(90deg, rgba(0,0,0,0), #33aeba 25%, #33aeba 75%, rgba(0,0,0,0))",
                                    opacity: 0.45,
                                }}
                            />

                            <p
                                style={{
                                    margin: 0,
                                    color: "#334155",
                                    lineHeight: 1.7,
                                    fontSize: 16,
                                    letterSpacing: "0.2px",
                                }}
                            >
                                {p.d}
                            </p>
                        </article>
                    );
                })}

                {/* CTA (bez hoverów) */}
                <div style={{ display: "flex", justifyContent: "center", marginTop: "2.2rem" }}>
                    <button
                        className={styles.primaryBtn}
                        style={{
                            appearance: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "1.05rem 1.35rem",
                            fontWeight: 600,
                            letterSpacing: ".6px",
                            borderRadius: 999,
                            background: "linear-gradient(90deg, #166016, #166016)",
                            color: "#ffffffff",
                            boxShadow:
                                "0 10px 24px rgba(51,174,186,.30), inset 0 1px 0 rgba(255,255,255,.50)",
                        }}
                    >
                        REGISTER TODAY
                    </button>
                </div>
            </section>


            <footer className={styles.footer}>
                <ul className={styles.listReset}>
                    <li><Link to="/" className={styles.footerLink}>Home</Link></li>
                    <li><Link to="/landing" className={styles.footerLink}>Landing</Link></li>
                    <li><Link to="/privacy" className={styles.footerLink}>Privacy</Link></li>
                </ul>
                <div className={styles.copy}>
                    © {new Date().getFullYear()} ICare. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
