import React from "react";
import { Link } from "react-router";
import iCareForCarereceiversSrc from "/images/heros/icare-for-carereceivers.jpg";
import styles from "./icare-for-carereceivers.module.scss";

export default function ICareForCaregivers() {
    return (
        <div className={styles.page}>
            {/* === HERO: identyczny układ jak w "Caregivers" (bez niebieskiego panelu) === */}
            <section
                aria-label="ICare for Care Receivers hero"
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
                    src={iCareForCarereceiversSrc}
                    alt="Care coordination background"
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        filter: "brightness(.72) contrast(1.06) saturate(.98)",
                        zIndex: 0,
                    }}
                />

                {/* overlay (vignette) */}
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

                {/* header (brand + nav na szkle) */}
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
                            // zostawiam ścieżkę, poprawiam tylko label
                            { to: "/icare-for-carereceivers", label: "ICare For Care Receivers" },
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

                {/* HERO content (bez panelu) */}
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
                            fontWeight: 900,
                            letterSpacing: ".2px",
                            lineHeight: 1.05,
                            fontSize: "clamp(1.8rem, 4vw, 3.6rem)",
                            margin: "0 0 .9rem 0",
                            color: "#ffffff",
                            textShadow:
                                "0 2px 18px rgba(0,0,0,.45), 0 0 2px rgba(0,0,0,.35)",
                        }}
                    >
                        ICare for {" "}
                        <span
                            style={{
                                display: "inline-block",
                                backgroundImage:
                                    "linear-gradient(90deg, #1fab1fff 0%, #1fab1fff 45%, #1fab1fff 100%)",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                color: "transparent",
                                WebkitTextFillColor: "transparent",
                                textShadow: "none",
                            }}
                        >
                            Care receivers
                        </span>
                    </h1>

                    <p
                        style={{
                            margin: "0 0 1.15rem 0",
                            fontSize: "clamp(.98rem, 1.2vw, 1.15rem)",
                            letterSpacing: ".12em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,.96)",
                            textShadow: "0 1px 10px rgba(0,0,0,.45)",
                        }}
                    >

                    </p>

                    {/* lead */}
                    <p
                        style={{
                            margin: "0 auto .8rem auto",
                            fontSize: "clamp(1rem, 1.35vw, 1.15rem)",
                            lineHeight: 1.65,
                            color: "rgba(255,255,255,.98)",
                            maxWidth: 600,
                            textShadow: "0 1px 10px rgba(0,0,0,.45)",
                        }}
                    >
                        <strong>
                            WE PROVIDE A SIMPLE MODEL IN WHICH YOU AGREE THE TERMS OF CARE DIRECTLY WITH YOUR CAREGIVER
                        </strong>
                    </p>

                    {/* punkty (jak u caregivers, ale pod odbiorców opieki) */}
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
                            "Find caregivers that match your needs",
                            "Compare experience, languages and rates",
                            "Message securely and agree clear terms",
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
                                        {text.split(" ").slice(0, 3).join(" ")}{" "}
                                        <strong>{text.split(" ").slice(3).join(" ")}</strong>
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
                                fontWeight: 800,
                                letterSpacing: ".6px",
                                borderRadius: 999,
                                background: "linear-gradient(90deg, #1fab1fff, #1fab1fff)",
                                color: "#ffffffff",
                                transition:
                                    "transform .18s ease, box-shadow .18s ease, filter .18s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-1px)";
                                e.currentTarget.style.boxShadow =
                                    "0 1px 1px #1fab1fff, inset 0 1px 0 #1fab1fff";
                                e.currentTarget.style.filter = "saturate(1.06)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow =
                                    "0 1px 1px #1fab1fff, inset 0 1px 0 #1fab1fff";
                                e.currentTarget.style.filter = "saturate(1)";
                            }}
                        >
                            FIND A CAREGIVER
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

            {/* === BANNER full-bleed (drobne poprawki: borderRadius, kolory) === */}
            <section
                aria-label="ICare banner"
                style={{
                    marginLeft: "calc(50% - 50vw)",
                    marginRight: "calc(50% - 50vw)",
                    width: "100vw",
                    background: "#c8bea90e",
                    borderTop: "1px solid #ffffff",
                    borderBottom: "1px solid #fcfcfc",
                    borderRadius: "25px",
                }}
            >
                <div
                    style={{
                        maxWidth: 1400,
                        margin: "0 auto",
                        padding: "50px 40px",
                        textAlign: "center",
                        fontFamily:
                            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                    }}
                >
                    <section
                        aria-label="ICare banner"
                        style={{
                            marginLeft: "calc(50% - 50vw)",
                            marginRight: "calc(50% - 50vw)",
                            width: "100vw",
                            position: "relative",
                            overflow: "hidden",
                            padding: "72px 0",

                            borderTop: "1px solid #fff",
                            borderBottom: "1px solid #eef2f7",
                        }}
                    >
                        {/* dekoracyjne poświaty */}
                        <span
                            aria-hidden="true"
                            style={{
                                position: "absolute",
                                left: "-12%",
                                top: "-30%",
                                width: 620,
                                height: 320,
                                borderRadius: "50%",

                            }}
                        />


                        <div
                            style={{
                                maxWidth: 1100,
                                margin: "0 auto",
                                padding: "0 50px",
                                textAlign: "center",
                                fontFamily:
                                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                            }}
                        >
                            <h2
                                style={{
                                    margin: 0,
                                    color: "#444",
                                    fontWeight: 800,
                                    fontSize: "clamp(20px, 2.2vw, 32px)",
                                    letterSpacing: ".2px",
                                    lineHeight: 1.40,
                                }}
                            >
                                Whether you are managing care for yourself or a loved one{" "}
                                <span
                                    style={{
                                        display: "inline-block",
                                        backgroundImage:
                                            "linear-gradient(90deg, #166016 0%, #166016 45%, #166016 100%)",
                                        WebkitBackgroundClip: "text",
                                        backgroundClip: "text",
                                        color: "transparent",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    ICare
                                </span>{" "}
                                simplifies the process and saves money for everyone
                            </h2>

                            {/* pills z kluczowymi atutami */}
                            <ul
                                style={{
                                    listStyle: "none",
                                    padding: 0,
                                    margin: "18px auto 0",
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "10px",
                                    justifyContent: "center",
                                    maxWidth: 860,
                                }}
                            >
                                {[
                                    "No subscription",
                                    "Direct agreement",
                                    "Secure messaging",
                                    "Transparent pricing",
                                ].map((tag) => (
                                    <li
                                        key={tag}
                                        style={{
                                            padding: "8px 12px",
                                            borderRadius: 999,
                                            border: "1px solid rgba(3,105,118,.18)",
                                            background: "#99a",
                                            color: "#ffffffff",
                                            fontWeight: 600,
                                            fontSize: "14px",
                                            letterSpacing: ".2px",
                                        }}
                                    >
                                        {tag}
                                    </li>
                                ))}
                            </ul>

                            {/* akcentowa linia pod treścią */}
                            <div
                                style={{
                                    width: "min(72ch, 92%)",
                                    height: 2,
                                    margin: "18px auto 0",
                                    borderRadius: 999,
                                    background:
                                        "linear-gradient(90deg, rgba(0,0,0,0), #166016 35%, #166016 65%, rgba(0,0,0,0))",
                                    opacity: 0.55,
                                }}
                            />

                            {/* CTA (opcjonalne) */}
                            <div
                                style={{
                                    display: "flex",
                                    gap: ".9rem",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexWrap: "wrap",
                                    marginTop: 18,
                                }}
                            >

                            </div>
                        </div>
                    </section>

                </div>
            </section>

            {/* === SEKCJA: For care receivers (refined) === */}
            <section
                aria-label="For care receivers"
                style={{
                    marginLeft: "calc(50% - 50vw)",
                    marginRight: "calc(50% - 50vw)",
                    width: "100vw",
                    background: "linear-gradient(180deg, #F2FAFB 0%, #FFFFFF 65%)",
                    padding: "88px 32px 96px",
                    fontFamily:
                        "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                }}
            >
                <div
                    style={{
                        width: "min(1200px, 92vw)",
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                        gap: 40,
                        alignItems: "center",
                    }}
                >
                    {/* BOX: ikona + tytuł + opis + lista + CTA */}
                    <div
                        style={{
                            position: "relative",
                            background: "rgba(103, 103, 116, 0.05)",
                            border: "2px solid #ffffffff",
                            borderRadius: 24,
                            padding: 36,                    // więcej oddechu
                            boxShadow: "0 12px 36px rgba(59,130,246,0.08)",
                        }}
                    >
                        {/* Ikona — serce */}
                        <div
                            aria-hidden="true"
                            style={{
                                width: 96,
                                height: 96,
                                borderRadius: "50%",
                                display: "grid",
                                placeItems: "center",
                                background: "#EFF6FF",
                                border: "1px solid  #166016",
                                marginBottom: 24,
                            }}
                        >
                            <svg
                                width="56"
                                height="56"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke=" #166016"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                role="img"
                                aria-label="Heart icon"
                            >
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                        </div>

                        <h2
                            style={{
                                margin: 0,
                                color: "rgba(103, 103, 116, 1)",
                                fontWeight: 700,
                                letterSpacing: "0.3px",
                                fontSize: "clamp(25px, 2.5vw, 36px)",
                                lineHeight: 1.25,
                                paddingBottom: 16,
                                borderBottom: "2px solid #053b3b75",
                            }}
                        >
                            FIND TRUSTED CARE IN JUST 3 QUICK STEPS
                        </h2>

                        <p
                            style={{
                                margin: "18px 0 0",
                                color: "#334155",
                                lineHeight: 1.7,
                                fontSize: 16,
                                maxWidth: 880,
                            }}
                        >
                            <b>
                                Create a free account, browse verified caregivers, and agree on the terms directly.
                                There’s no subscription — only a one-time fee payable after you sign an agreement with
                                your chosen caregiver.
                            </b>
                        </p>

                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                                margin: "22px 0 0",
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                                gap: 14,
                                color: "#0F172A",
                                fontSize: 18,
                                maxWidth: 1000,
                            }}
                        >
                            {[
                                "Browse verified caregiver profiles",
                                "Match by skills, language & availability",
                                "Secure messaging & clear pricing",
                                "Contracts and payments in one place",
                            ].map((item) => (
                                <li
                                    key={item}
                                    style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: 10,
                                        padding: 14,
                                        borderRadius: 16,
                                        background: "rgba(45, 190, 203, 0.08)",
                                        border: "1px solid #57575780",
                                        marginBottom: 24,
                                    }}
                                >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#3B82F6"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{ marginTop: 2, flexShrink: 0 }}
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    <span style={{ color: "#334155", lineHeight: 1.6 }}>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div
                            style={{
                                display: "flex",
                                gap: 12,
                                marginTop: 26,
                                flexWrap: "wrap",
                            }}
                        >
                            <button
                                type="button"
                                style={{
                                    appearance: "none",
                                    border: "none",
                                    background: "linear-gradient(90deg,#1fab1fff, #1fab1fff",
                                    color: "#ffffffff",
                                    padding: "14px 20px",
                                    borderRadius: 28,
                                    fontWeight: 700,
                                    fontSize: 16,
                                    letterSpacing: ".4px",
                                    cursor: "pointer",
                                    boxShadow: "0 10px 24px rgba(51,174,186,.28), inset 0 1px 0 rgba(255,255,255,.55)",
                                }}
                            >
                                Register with us
                            </button>

                            <button
                                type="button"
                                style={{
                                    appearance: "none",
                                    background: "#FFFFFF",
                                    color: "#0F172A",
                                    padding: "16px 22px",
                                    borderRadius: 28,
                                    fontWeight: 700,
                                    fontSize: 16,
                                    letterSpacing: ".2px",
                                    cursor: "pointer",
                                    border: "1px solid #CFE0FF",
                                }}
                            >
                                Explore caregivers
                            </button>
                        </div>
                    </div>
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
