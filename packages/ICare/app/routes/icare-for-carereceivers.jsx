import React from "react";
import { Link } from "react-router";
import iCareForCarereceiversSrc from "/images/heros/icare-for-carereceivers.jpg";
import styles from "./icare-for-carereceivers.module.scss";

export default function ICareForCareReceivers() {
    return (
        <div className={styles.page}>
            {/* === HERO (spójny z caregivers, bez zmian copy) === */}
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
                    background: "#0b1220",
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

                {/* overlay (subtelna winieta, bez gradientów kolorystycznych) */}
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

                {/* header */}
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
                            { to: "/icare-for-carereceivers", label: "ICare For Care Receivers" },
                        ].map((l) => (
                            <Link
                                key={l.to}
                                to={l.to}
                                style={{
                                    display: "inline-block",
                                    padding: "0.24rem 0",
                                    textDecoration: "none",
                                    fontSize: "1.05rem",
                                    fontWeight: 600,
                                    letterSpacing: ".01em",
                                    color: "rgba(255,255,255,.9)",
                                    marginInline: "0.45rem",
                                    textUnderlineOffset: "6px",
                                    transition:
                                        "color .22s ease, text-decoration-color .22s ease, text-underline-offset .22s ease",
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
                                {l.label}
                            </Link>
                        ))}
                    </nav>
                </header>

                {/* HERO content */}
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
                            textShadow: "0 2px 18px rgba(0,0,0,.45), 0 0 2px rgba(0,0,0,.35)",
                        }}
                    >
                        ICare for{" "}
                        <span
                            style={{
                                display: "inline-block",
                                color: "#1FAB1F",
                            }}
                        >
                            Care Receivers
                        </span>
                    </h1>

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
                            WE PROVIDE A SIMPLE MODEL IN WHICH YOU AGREE THE TERMS OF CARE DIRECTLY WITH YOUR
                            CAREGIVER
                        </strong>
                    </p>

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
                                fontSize: 15,
                                letterSpacing: ".6px",
                                borderRadius: 999,
                                background: "#1FAB1F",
                                color: "#ffffffff",
                                transition: "transform .18s ease, box-shadow .18s ease, filter .18s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-1px)";
                                e.currentTarget.style.boxShadow = "0 1px 1px #1fab1f, inset 0 1px 0 #1fab1f";
                                e.currentTarget.style.filter = "saturate(1.06)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 1px 1px #1fab1f, inset 0 1px 0 #1fab1f";
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
                                color: "#ffffffff",
                                fontWeight: 600,
                                fontSize: 15,
                                textDecoration: "none",
                                border: "1px solid #7d7f82",
                                background: "#7d7f82",
                                transition: "border-color .18s ease, background .18s ease, transform .18s ease",
                                textShadow: "0 1px 8px rgba(0,0,0,.45)",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-1px)";
                                e.currentTarget.style.borderColor = "#6b6c6f";
                                e.currentTarget.style.background = "#6b6c6f";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.borderColor = "#7d7f82";
                                e.currentTarget.style.background = "#7d7f82";
                            }}
                        >
                            SEE HOW IT WORKS
                        </a>
                    </div>
                </div>
            </section>

            {/* === FOR CARE RECEIVERS — tytuł spójny, bez gradientu + BADGE see-through === */}
            <section
                aria-label="For care receivers"
                style={{
                    marginLeft: "calc(50% - 50vw)",
                    marginRight: "calc(50% - 50vw)",
                    width: "100vw",
                    background: "#FFFFFF",
                    padding: "88px 32px 72px",
                    borderTop: "1px solid #E5E7EB",
                    fontFamily:
                        "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                }}
            >
                <div
                    style={{
                        width: "min(1200px, 92vw)",
                        margin: "0 auto",
                    }}
                >
                    <div
                        style={{
                            position: "relative",
                            background: "rgba(103, 103, 116, 0.05)",
                            border: "1px solid #EEF2F7",
                            borderRadius: 24,
                            padding: "28px 24px 30px",
                        }}
                    >
                        {/* Tytuł — spójny, bez gradientu */}
                        <h2
                            style={{
                                margin: 0,
                                color: "#1f2a37",
                                fontWeight: 700,
                                letterSpacing: "0.2px",
                                fontSize: "clamp(24px, 2.4vw, 32px)",
                                lineHeight: 1.24,
                                paddingBottom: 12,
                            }}
                        >
                            FIND TRUSTED CARE IN JUST 3 QUICK STEPS
                        </h2>
                        <div
                            aria-hidden="true"
                            style={{
                                width: 0,
                                height: 3,
                                background: "#1FAB1F",
                                borderRadius: 999,
                                opacity: 0.85,
                                margin: "10px 0 22px 0",
                            }}
                        />

                        {/* — Bardzo delikatne, jasne badge (see-through + ikony) — */}
                        <section
                            aria-label="Safety & Trust"
                            style={{
                                marginTop: 18,
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                                gap: 12,
                            }}
                        >
                            {[
                                { t: "ID Verified", i: "shield", base: "31,171,31" }, // green
                                { t: "Background Check", i: "file", base: "59,130,246" }, // blue
                                { t: "References", i: "user-check", base: "139,92,246" }, // violet
                                { t: "Secure Messaging", i: "lock", base: "45,212,191" }, // teal
                                { t: "e-Sign Contracts", i: "pen", base: "251,146,60" }, // orange
                            ].map((b) => (
                                <div
                                    key={b.t}
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "60px 1fr",
                                        alignItems: "center",
                                        gap: 12,
                                        padding: "14px 14px",
                                        borderRadius: 16,
                                        background: `rgba(${b.base}, 0.10)`,
                                        border: `1px solid rgba(${b.base}, 0.22)`,
                                        boxShadow: "0 8px 18px rgba(2,8,23,.03)",
                                        transition: "transform .15s ease, box-shadow .15s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-2px)";
                                        e.currentTarget.style.boxShadow = "0 10px 22px rgba(2,8,23,.06)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.boxShadow = "0 8px 18px rgba(2,8,23,.03)";
                                    }}
                                >
                                    <span
                                        aria-hidden="true"
                                        style={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: 14,
                                            display: "grid",
                                            placeItems: "center",
                                            background: "rgba(255,255,255,0.85)",
                                            border: `1px solid rgba(${b.base}, 0.28)`,
                                            color: `rgb(${b.base})`,
                                        }}
                                    >
                                        {b.i === "shield" && (
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                                            </svg>
                                        )}
                                        {b.i === "file" && (
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" />
                                            </svg>
                                        )}
                                        {b.i === "user-check" && (
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                                                <circle cx="9" cy="7" r="4" />
                                                <polyline points="16 11 18 13 22 9" />
                                            </svg>
                                        )}
                                        {b.i === "lock" && (
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="11" width="18" height="11" rx="2" />
                                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                            </svg>
                                        )}
                                        {b.i === "pen" && (
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M12 20h9" />
                                                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                                            </svg>
                                        )}
                                    </span>

                                    <div>
                                        <strong
                                            style={{
                                                display: "block",
                                                color: "#1f2a37",
                                                fontSize: "clamp(1rem,1.2vw,1.08rem)",
                                                letterSpacing: ".2px",
                                            }}
                                        >
                                            {b.t}
                                        </strong>
                                        <span style={{ color: "#334155", opacity: 0.9, fontSize: 14, lineHeight: 1.55 }}>
                                            Extra visibility for verified profiles and safer cooperation.
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </section>

                        {/* lead */}
                        <p
                            style={{
                                margin: "28px auto 0",
                                color: "#1f2a37",
                                lineHeight: 1.8,
                                fontSize: "clamp(16px, 1.4vw, 18px)",
                                maxWidth: "800px",
                                textAlign: "center",
                                fontWeight: 500,
                            }}
                        >
                            <b>
                                Create a free account, browse verified caregivers, and agree on the terms directly.
                                There’s no subscription — only a one-time fee payable after you sign an agreement
                                with your chosen caregiver.
                            </b>
                        </p>
                    </div>
                </div>
            </section>

            {/* === BANNER (szare tło + see-through pills, z obrazkiem po prawej) === */}
            <section
                aria-label="ICare banner"
                style={{
                    marginLeft: "calc(50% - 50vw)",
                    marginRight: "calc(50% - 50vw)",
                    width: "100vw",
                    background: "#F3F4F6",
                    borderTop: "1px solid #E5E7EB",
                    borderBottom: "1px solid #E5E7EB",
                }}
            >
                <div
                    style={{
                        maxWidth: 1200,
                        margin: "0 auto",
                        padding: "72px clamp(20px,4vw,48px)",
                        display: "grid",
                        gridTemplateColumns: "1.1fr .9fr",
                        gap: "clamp(18px, 4vw, 40px)",
                        alignItems: "center",
                        fontFamily:
                            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                    }}
                >
                    {/* Lewa kolumna: nagłówek + divider + pills */}
                    <div>
                        <h2
                            style={{
                                margin: 0,
                                color: "#1f2a37",
                                fontWeight: 700,
                                fontSize: "clamp(22px, 2.4vw, 34px)",
                                letterSpacing: ".2px",
                                lineHeight: 1.35,
                            }}
                        >
                            Whether you are managing care for yourself or a loved one
                            <br style={{ display: "none" }} />
                            <span style={{ display: "inline" }}>
                                {" "}
                                ICare simplifies the process and saves money for everyone
                            </span>
                        </h2>

                        <div
                            aria-hidden="true"
                            style={{
                                width: "min(760px, 86%)",
                                height: 2,
                                margin: "18px 0 24px 0",
                                borderRadius: 999,
                                background: "rgba(15,23,42,.14)",
                                opacity: 0.8,
                            }}
                        />

                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "10px",
                                maxWidth: 920,
                            }}
                        >
                            {[
                                {
                                    tag: "No subscription",
                                    bg: "rgba(16,185,129,.10)",
                                    br: "rgba(16,185,129,.22)",
                                    ico: "rgba(16,185,129,.95)",
                                },
                                {
                                    tag: "Direct agreement",
                                    bg: "rgba(20,184,166,.10)",
                                    br: "rgba(20,184,166,.22)",
                                    ico: "rgba(20,184,166,.95)",
                                },
                                {
                                    tag: "Secure messaging",
                                    bg: "rgba(99,102,241,.10)",
                                    br: "rgba(99,102,241,.22)",
                                    ico: "rgba(99,102,241,.95)",
                                },
                                {
                                    tag: "Transparent pricing",
                                    bg: "rgba(245,158,11,.10)",
                                    br: "rgba(245,158,11,.22)",
                                    ico: "rgba(245,158,11,.95)",
                                },
                            ].map((p) => (
                                <li
                                    key={p.tag}
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 8,
                                        padding: "10px 14px",
                                        borderRadius: 999,
                                        background: p.bg,
                                        border: `1px solid ${p.br}`,
                                        color: "#0f172a",
                                        fontWeight: 600,
                                        fontSize: "14.5px",
                                        letterSpacing: ".2px",
                                        boxShadow: "0 1px 0 rgba(2, 8, 23, 0.02)",
                                        backdropFilter: "saturate(1.05)",
                                    }}
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke={p.ico}
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                        style={{ opacity: 0.9 }}
                                    >
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M16 12H8" />
                                    </svg>
                                    {p.tag}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Prawa kolumna: ilustracja */}
                    <figure
                        style={{
                            margin: 0,
                            position: "relative",
                            display: "block",
                            width: "100%",
                            height: "min(380px, 48vh)",
                            borderRadius: 16,
                            overflow: "hidden",
                            background: "#E5E7EB",
                            border: "1px solid rgba(15,23,42,.08)",
                            boxShadow: "0 12px 30px rgba(2,8,23,.08)",
                        }}
                    >
                        <img
                            src="/images/banners/family-care.jpg"
                            alt="Family discussing care plan"
                            loading="lazy"
                            style={{
                                position: "absolute",
                                inset: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                objectPosition: "50% 50%",
                                filter: "saturate(1.02) contrast(1.02) brightness(.98)",
                            }}
                        />
                    </figure>
                </div>
            </section>

            {/* === CARE NEEDS CHECKLIST — na środek, jedna szeroka karta ~80% === */}
            <section
                aria-label="Care Needs Checklist"
                style={{
                    marginLeft: "calc(50% - 50vw)",
                    marginRight: "calc(50% - 50vw)",
                    width: "100vw",
                    background: "#F3F4F6",
                    borderTop: "1px solid #E5E7EB",
                    borderBottom: "1px solid #E5E7EB",
                    padding: "56px 20px 64px",
                    fontFamily:
                        "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                }}
            >
                <div
                    style={{
                        width: "min(1400px, 92vw)",
                        margin: "0 auto",
                        display: "grid",
                        justifyItems: "center",
                    }}
                >
                    <div
                        style={{
                            width: "min(1100px, 80vw)", // ~80% ekranu
                            background: "#FFFFFF",
                            border: "1px solid rgba(15,23,42,.08)",
                            borderRadius: 16,
                            padding: "26px 22px 24px",
                            boxShadow: "0 10px 22px rgba(2,8,23,.05)",
                        }}
                    >
                        <header
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: "16px",
                                flexWrap: "wrap",
                                padding: "10px 0 20px",
                                marginBottom: "12px",
                                borderBottom: "1px solid rgba(15,23,42,0.06)",
                            }}
                        >
                            <h4
                                style={{
                                    margin: 0,
                                    color: "#1f2a37",
                                    fontWeight: 800,
                                    letterSpacing: ".2px",
                                    fontSize: "1.5rem",
                                    lineHeight: 1.2,
                                }}
                            >
                                Tell us what you need
                            </h4>

                            <button
                                type="button"
                                style={{
                                    appearance: "none",
                                    border: "none",
                                    borderRadius: 999,
                                    background: "#1FAB1F",
                                    color: "#fff",
                                    padding: "12px 18px",
                                    fontWeight: 700,
                                    letterSpacing: ".02em",
                                    cursor: "pointer",
                                    boxShadow: "0 2px 6px rgba(31,171,31,0.15)",
                                    transition: "transform .2s ease, box-shadow .2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                    e.currentTarget.style.boxShadow = "0 4px 10px rgba(31,171,31,0.22)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "0 2px 6px rgba(31,171,31,0.15)";
                                }}
                            >
                                Show matching caregivers
                            </button>
                        </header>

                        <p
                            style={{
                                margin: "0 0 14px",
                                color: "#334155",
                                fontSize: 15,
                                lineHeight: 1.65,
                            }}
                        >
                            Choose the areas you need help with. We’ll use them to match you with suitable caregivers.
                        </p>

                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                                margin: "8px 0 0",
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                                gap: "10px",
                            }}
                        >
                            {[
                                "Dementia care",
                                "Mobility support",
                                "Post-surgery",
                                "Overnight care",
                                "Live-in",
                                "Hourly",
                                "Driving",
                                "Polish language",
                                "German language",
                                "English language",
                            ].map((k) => (
                                <li key={k}>
                                    <label
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 8,
                                            padding: "10px 12px",
                                            borderRadius: 12,
                                            background: "rgba(31,171,31,0.08)",
                                            border: "1px solid rgba(31,171,31,0.22)",
                                            color: "#0f172a",
                                            fontWeight: 600,
                                            fontSize: 14,
                                            cursor: "pointer",
                                            transition: "background .15s ease, border-color .15s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = "rgba(31,171,31,0.12)";
                                            e.currentTarget.style.borderColor = "rgba(31,171,31,0.30)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = "rgba(31,171,31,0.08)";
                                            e.currentTarget.style.borderColor = "rgba(31,171,31,0.22)";
                                        }}
                                    >
                                        <input type="checkbox" style={{ transform: "scale(1.15)" }} />
                                        {k}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* === ICare vs Agency — mocniej podkreślone porównanie === */}
            <section
                aria-label="ICare vs Agency"
                style={{
                    margin: "48px auto 24px",
                    width: "min(92vw, 1100px)",
                    padding: "0 clamp(16px, 4vw, 32px)",
                    fontFamily:
                        "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                }}
            >
                <h3
                    style={{
                        margin: "0 0 28px",
                        fontWeight: 900,
                        letterSpacing: ".2px",
                        fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)",
                        color: "#1f2a37",
                        textAlign: "center",
                    }}
                >
                    Why families choose ICare
                </h3>

                {/* Pasek pomocniczy: 4 skróty-benefity */}
                <ul
                    style={{
                        listStyle: "none",
                        padding: 0,
                        margin: "0 auto 18px",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                        gap: 10,
                        maxWidth: 1000,
                    }}
                >
                    {[
                        { label: "Direct agreement", col: "31,171,31" },
                        { label: "Transparent pricing", col: "245,158,11" },
                        { label: "Secure messaging", col: "99,102,241" },
                        { label: "More pay for caregivers", col: "20,184,166" },
                    ].map((t) => (
                        <li
                            key={t.label}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "10px 12px",
                                borderRadius: 12,
                                background: `rgba(${t.col},.10)`,
                                border: `1px solid rgba(${t.col},.22)`,
                                color: "#0f172a",
                                fontWeight: 600,
                                fontSize: 14,
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={`rgba(${t.col},.95)`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            {t.label}
                        </li>
                    ))}
                </ul>

                <div
                    style={{
                        marginTop: 16,
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 14,
                    }}
                >
                    {/* ICare card — zielone see-through tło, wyraźnie wyróżnione */}
                    <article
                        style={{
                            borderRadius: 18,
                            padding: 18,
                            background: "rgba(31,171,31,0.10)",
                            border: "1px solid rgba(31,171,31,0.30)",
                            boxShadow: "0 10px 24px rgba(2,8,23,0.06)",
                        }}
                    >
                        <header style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                            <span
                                aria-hidden="true"
                                style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 99,
                                    display: "grid",
                                    placeItems: "center",
                                    background: "rgba(31,171,31,0.18)",
                                    border: "1px solid rgba(31,171,31,0.42)",
                                    color: "#166016",
                                    fontWeight: 900,
                                }}
                            >
                                ✓
                            </span>
                            <strong style={{ fontSize: 16, letterSpacing: ".2px", color: "#1f2a37" }}>
                                ICare
                            </strong>
                        </header>

                        <ul
                            style={{
                                margin: 0,
                                padding: "0 0 0 1rem",
                                lineHeight: 1.6,
                                color: "#334155",
                                fontSize: 15,
                                fontWeight: 500,
                            }}
                        >
                            <li>Direct agreement with caregiver</li>
                            <li>Transparent, one-time fee after agreement</li>
                            <li>Secure messaging & contracts in one place</li>
                            <li>More pay for caregivers, lower costs for families</li>
                        </ul>
                    </article>

                    {/* Agency card — chłodny, neutralny */}
                    <article
                        style={{
                            borderRadius: 18,
                            padding: 18,
                            background: "rgba(148,163,184,.10)",
                            border: "1px solid rgba(148,163,184,.35)",
                            boxShadow: "0 8px 22px rgba(2,8,23,.05)",
                        }}
                    >
                        <header style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                            <span
                                aria-hidden="true"
                                style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 99,
                                    display: "grid",
                                    placeItems: "center",
                                    background: "rgba(148,163,184,.2)",
                                    border: "1px solid rgba(148,163,184,.45)",
                                    color: "#64748b",
                                    fontWeight: 900,
                                }}
                            >
                                —
                            </span>
                            <strong style={{ fontSize: 16, letterSpacing: ".2px", color: "#475569" }}>
                                Traditional agency
                            </strong>
                        </header>
                        <ul
                            style={{
                                margin: 0,
                                padding: "0 0 0 1rem",
                                lineHeight: 1.6,
                                color: "#334155",
                                fontSize: 15,
                                fontWeight: 500,
                            }}
                        >
                            <li>Intermediary in every step</li>
                            <li>Recurring margins/mark-ups</li>
                            <li>Fragmented tools & communication</li>
                            <li>Less pay for caregivers, higher family costs</li>
                        </ul>
                    </article>
                </div>
            </section>

            {/* === FAQ === */}
            <section
                aria-label="FAQ"
                style={{
                    margin: "28px auto 0",
                    width: "min(92vw, 1100px)",
                    padding: "0 clamp(16px, 4vw, 32px)",
                    fontFamily:
                        "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                }}
            >
                <h3
                    style={{
                        margin: "0 0 10px",
                        fontWeight: 900,
                        letterSpacing: ".2px",
                        fontSize: "clamp(1.3rem,2.2vw,1.6rem)",
                        color: "#1f2a37",
                    }}
                >
                    Frequently asked questions
                </h3>

                {[
                    {
                        q: "Do I pay anything to register?",
                        a: "No. Registration is free. ICare charges a one-time flat fee only after both sides sign an agreement.",
                    },
                    {
                        q: "How do I verify a caregiver?",
                        a: "Profiles include experience, checks, skills and availability. You can message privately, schedule a call, and request documents before agreeing terms.",
                    },
                    {
                        q: "Is my data secure?",
                        a: "Yes. We use encrypted messaging and store only the minimum required data to provide the service.",
                    },
                ].map((item) => (
                    <details
                        key={item.q}
                        style={{
                            background: "#fff",
                            border: "1px solid rgba(148,163,184,.35)",
                            borderRadius: 14,
                            padding: "14px 16px",
                            margin: "10px 0",
                            boxShadow: "0 6px 18px rgba(2,8,23,.05)",
                        }}
                    >
                        <summary
                            style={{
                                cursor: "pointer",
                                listStyle: "none",
                                fontWeight: 700,
                                color: "#0f172a",
                                letterSpacing: ".2px",
                                outline: "none",
                            }}
                        >
                            {item.q}
                        </summary>
                        <p style={{ margin: "10px 0 0", color: "#334155", lineHeight: 1.65, fontSize: 15 }}>
                            {item.a}
                        </p>
                    </details>
                ))}
            </section>

            {/* === TRUST BAR === */}
            <section
                aria-label="Trust bar"
                style={{
                    margin: "34px 0 0",
                    width: "100%",
                    background: "linear-gradient(180deg, #F7FCFD 0%, #FFFFFF 70%)",
                }}
            >
                <div
                    style={{
                        width: "min(92vw, 1100px)",
                        margin: "0 auto",
                        padding: "18px clamp(16px, 4vw, 32px) 26px",
                        display: "grid",
                        gap: 16,
                    }}
                >
                    <ul
                        style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                            gap: 12,
                            alignItems: "center",
                            justifyItems: "center",
                        }}
                    >
                        {[
                            { n: "12k+", l: "Profiles viewed monthly" },
                            { n: "4.8★", l: "Average review score" },
                            { n: "98%", l: "Secure messaging uptime" },
                            { n: "24/7", l: "Support & guidance" },
                        ].map((s) => (
                            <li
                                key={s.l}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 12,
                                    padding: "10px 12px",
                                    borderRadius: 14,
                                    background: "#fff",
                                    border: "1px solid rgba(3,105,118,.14)",
                                    boxShadow: "0 6px 18px rgba(2,8,23,.05)",
                                    width: "100%",
                                    maxWidth: 320,
                                }}
                            >
                                <span
                                    aria-hidden="true"
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 999,
                                        display: "grid",
                                        placeItems: "center",
                                        background: "rgba(51,174,186,.12)",
                                        border: "1px solid rgba(51,174,186,.35)",
                                        color: "#0f766e",
                                        fontWeight: 900,
                                    }}
                                >
                                    ✓
                                </span>
                                <div style={{ display: "grid" }}>
                                    <strong style={{ fontSize: 18, color: "#0f172a", lineHeight: 1.25 }}>{s.n}</strong>
                                    <span style={{ fontSize: 13.5, color: "#475569" }}>{s.l}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* === CONTACT CTA === */}
            <section
                aria-label="Contact CTA"
                style={{
                    margin: "26px 0 0",
                    width: "100vw",
                    marginLeft: "calc(50% - 50vw)",
                    marginRight: "calc(50% - 50vw)",
                    background: "#1fab1f",
                    color: "#e6edf6",
                }}
            >
                <div
                    style={{
                        position: "relative",
                        width: "min(92vw, 1100px)",
                        margin: "0 auto",
                        padding: "28px clamp(16px, 4vw, 32px) 36px",
                        display: "grid",
                        gap: 14,
                        alignItems: "center",
                    }}
                >
                    <h4
                        style={{
                            margin: 0,
                            fontSize: "clamp(1.25rem, 2.2vw, 1.6rem)",
                            fontWeight: 900,
                            letterSpacing: ".2px",
                            lineHeight: 1.2,
                            color: "#ffffff",
                        }}
                    >
                        Ready to start? Register
                    </h4>

                    <p
                        style={{
                            margin: 0,
                            maxWidth: 720,
                            color: "rgba(255,255,255,.9)",
                            fontSize: "clamp(.98rem, 1.2vw, 1.05rem)",
                            lineHeight: 1.6,
                        }}
                    >
                        Tell us what you need — we’ll help you find the right caregiver and set clear,
                        fair terms together.
                    </p>

                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 6 }}>
                        <a
                            href="mailto:hello@icare.example"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "10px 14px",
                                borderRadius: 999,
                                border: "2px solid rgba(255,255,255,.78)",
                                color: "#ffffff",
                                textDecoration: "none",
                                boxShadow: "0 10px 28px rgba(0,0,0,.28)",
                                transition:
                                    "transform .18s ease, box-shadow .25s ease, border-color .25s ease, background .25s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-1px)";
                                e.currentTarget.style.borderColor = "rgba(255,255,255,.98)";
                                e.currentTarget.style.boxShadow = "0 12px 34px rgba(0,0,0,.34)";
                                e.currentTarget.style.background = "rgba(2,8,23,.22)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.borderColor = "rgba(255,255,255,.78)";
                                e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,.28)";
                                e.currentTarget.style.background = "transparent";
                            }}
                        >
                            Register
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
