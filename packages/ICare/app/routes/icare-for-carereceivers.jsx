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
                    fontFamily:
                        "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                }}
            >
                {/* === BACKGROUND IMAGE === */}
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

                {/* === OVERLAY === */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "radial-gradient(75% 55% at 50% 45%, rgba(0,0,0,.22) 0%, rgba(0,0,0,.38) 60%, rgba(0,0,0,.52) 100%)",
                        zIndex: 1,
                    }}
                />

                {/* === NAVBAR (identyczny jak w caregivers) === */}
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
                                    e.currentTarget.style.color = "#4c7865";
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

                {/* === HERO CONTENT === */}
                <div
                    style={{
                        position: "relative",
                        zIndex: 2,
                        width: "min(92vw, 1080px)",
                        marginInline: "auto",
                        textAlign: "left",
                        padding: "clamp(2rem, 4vw, 4rem) 0",
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
                            textShadow: "0 2px 18px rgba(0,0,0,.45)",
                        }}
                    >
                        ICare for{" "}
                        <span
                            style={{
                                color: "#188b5bff", // 💚 brandowy zielony

                            }}
                        >
                            Care Receivers
                        </span>
                    </h1>

                    <p
                        style={{
                            margin: "0 auto .8rem 0",
                            fontSize: "clamp(1rem, 1.35vw, 1.15rem)",
                            lineHeight: 1.65,
                            color: "rgba(255,255,255,.98)",
                            maxWidth: 620,
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: ".02em",
                        }}
                    >
                        WE PROVIDE A SIMPLE MODEL IN WHICH YOU AGREE THE TERMS OF CARE DIRECTLY
                        WITH YOUR CAREGIVER
                    </p>

                    <ul
                        style={{
                            listStyle: "none",
                            padding: 0,
                            margin: "1.4rem 0 2.4rem 0",
                            maxWidth: 820,
                            display: "grid",
                            gap: ".7rem",
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
                                        color: "#4C7865", // ✓ spójna zieleń
                                        textShadow: "0 0 10px rgba(0,0,0,.45)",
                                    }}
                                >
                                    ✓
                                </span>
                                {text}
                            </li>
                        ))}
                    </ul>

                    {/* CTA BUTTONS */}
                    <div
                        style={{
                            display: "flex",
                            gap: ".9rem",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            flexWrap: "wrap",
                        }}
                    >
                        <button
                            style={{
                                border: "none",
                                cursor: "pointer",
                                padding: "0.9rem 1.4rem",
                                fontWeight: 700,
                                fontSize: 15,
                                borderRadius: 999,
                                background: "#4C7865",
                                color: "#fff",
                                boxShadow: "0 4px 10px rgba(76,120,101,.25)",
                                transition: "all .18s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#3E6253";
                                e.currentTarget.style.boxShadow =
                                    "0 8px 16px rgba(76,120,101,.35)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "#4C7865";
                                e.currentTarget.style.boxShadow =
                                    "0 4px 10px rgba(76,120,101,.25)";
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
                                padding: "0.85rem 1.25rem",
                                borderRadius: 999,
                                color: "#ffffff",
                                fontWeight: 700,
                                fontSize: 15,
                                textDecoration: "none",
                                border: "1px solid #7d7f82",
                                background: "#7d7f82",
                                transition: "all .18s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#6b6c6f";
                                e.currentTarget.style.borderColor = "#6b6c6f";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "#7d7f82";
                                e.currentTarget.style.borderColor = "#7d7f82";
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
                    padding: "90px 32px 90px",
                    borderTop: "1px solid #E5E7EB",
                    fontFamily:
                        "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                }}
            >
                <div
                    style={{
                        width: "min(1100px, 92vw)",
                        margin: "0 auto",
                        background: "#f8faf9",
                        borderRadius: 30,
                        border: "1px solid #e4efea",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
                        padding: "56px 42px 60px",
                    }}
                >
                    {/* TYTUŁ */}
                    <h2
                        style={{
                            margin: 0,
                            color: "#1f2a37",
                            fontWeight: 800,
                            fontSize: "clamp(26px, 2.2vw, 32px)",
                            letterSpacing: "0.2px",
                            lineHeight: 1.25,
                            textAlign: "center",
                        }}
                    >
                        FIND TRUSTED CARE IN JUST 3 QUICK STEPS
                    </h2>

                    <div
                        aria-hidden="true"
                        style={{
                            width: 0,
                            height: 4,
                            background: "#4c7865",
                            borderRadius: 999,
                            opacity: 0.85,
                            margin: "14px auto 38px",
                        }}
                    />

                    {/* BADGES */}
                    <section
                        aria-label="Safety & Trust"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                            gap: 14,
                            padding: "0 6px",
                        }}
                    >
                        {[
                            { t: "ID Verified", i: "shield", base: "31,171,31" },
                            { t: "Background Check", i: "file", base: "59,130,246" },
                            { t: "References", i: "user-check", base: "139,92,246" },
                            { t: "Secure Messaging", i: "lock", base: "45,212,191" },
                            { t: "e-Sign Contracts", i: "pen", base: "251,146,60" },
                        ].map((b) => (
                            <div
                                key={b.t}
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "48px 1fr",
                                    alignItems: "center",
                                    gap: 10,
                                    padding: "10px 12px",
                                    borderRadius: 18,
                                    background: `rgba(${b.base}, 0.06)`,
                                    border: `1px solid rgba(${b.base}, 0.18)`,
                                    boxShadow: "0 4px 10px rgba(2,8,23,.04)",
                                    transition: "transform .18s ease, box-shadow .18s ease, background .18s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-3px)";
                                    e.currentTarget.style.boxShadow = "0 8px 18px rgba(2,8,23,.08)";
                                    e.currentTarget.style.background = `rgba(${b.base}, 0.10)`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "0 4px 10px rgba(2,8,23,.04)";
                                    e.currentTarget.style.background = `rgba(${b.base}, 0.06)`;
                                }}
                            >
                                <span
                                    aria-hidden="true"
                                    style={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: 12,
                                        display: "grid",
                                        placeItems: "center",
                                        background: "rgba(255,255,255,0.9)",
                                        border: `1px solid rgba(${b.base}, 0.25)`,
                                        color: `rgb(${b.base})`,
                                    }}
                                >
                                    {b.i === "shield" && (
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                                        </svg>
                                    )}
                                    {b.i === "file" && (
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                            <path d="M14 2v6h6" />
                                        </svg>
                                    )}
                                    {b.i === "user-check" && (
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <polyline points="16 11 18 13 22 9" />
                                        </svg>
                                    )}
                                    {b.i === "lock" && (
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <rect x="3" y="11" width="18" height="11" rx="2" />
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        </svg>
                                    )}
                                    {b.i === "pen" && (
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
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
                                            fontSize: "clamp(0.95rem,1.1vw,1rem)",
                                            letterSpacing: ".15px",
                                            marginBottom: 2,
                                        }}
                                    >
                                        {b.t}
                                    </strong>
                                    <span
                                        style={{
                                            color: "#334155",
                                            opacity: 0.85,
                                            fontSize: 13.5,
                                            lineHeight: 1.5,
                                        }}
                                    >
                                        Safer matches and verified caregivers.
                                    </span>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* LEAD PARAGRAPH */}
                    <p
                        style={{
                            margin: "40px auto 0",
                            color: "#1f2a37",
                            lineHeight: 1.8,
                            fontSize: "clamp(16px, 1.4vw, 18px)", // ⬇️ ~10% mniejszy
                            maxWidth: "760px",
                            textAlign: "center",
                            fontWeight: 500,
                        }}
                    >
                        <b style={{ color: "#375d4f" }}>
                            Create a free account, browse verified caregivers, and agree on the terms directly.{" "}
                        </b>
                        <br />
                        There’s no subscription — only a one-time fee payable after you sign an agreement
                        with your chosen caregiver.
                    </p>

                    {/* CTA BUTTON */}
                    <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
                        <button
                            style={{
                                backgroundColor: "#4c7865",
                                color: "#fff",
                                border: "none",
                                borderRadius: 999,
                                padding: "14px 34px",
                                fontSize: "1.05rem",
                                fontWeight: 700,
                                cursor: "pointer",
                                boxShadow: "0 8px 18px rgba(76,120,101,0.25)",
                                transition: "all 0.25s ease",
                                letterSpacing: "0.3px",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#3e6555";
                                e.currentTarget.style.boxShadow = "0 10px 22px rgba(76,120,101,0.32)";
                                e.currentTarget.style.transform = "translateY(-2px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "#4c7865";
                                e.currentTarget.style.boxShadow = "0 8px 18px rgba(76,120,101,0.25)";
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                        >
                            JOIN US IN JUST 2 MINUTES
                        </button>
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
                    background: "#f9fafb",
                    borderTop: "1px solid #e5e7eb",
                    borderBottom: "1px solid #e5e7eb",
                    fontFamily:
                        "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                }}
            >
                <div
                    style={{
                        maxWidth: 1180,
                        margin: "0 auto",
                        padding: "80px clamp(20px,4vw,48px)",
                        display: "grid",
                        gridTemplateColumns: "1.1fr 0.9fr",
                        gap: "clamp(24px, 4vw, 48px)",
                        alignItems: "center",
                    }}
                >
                    {/* Lewa kolumna: nagłówek + divider + pills */}
                    <div>
                        <h2
                            style={{
                                margin: 0,
                                color: "#1f2a37",
                                fontWeight: 800,
                                fontSize: "clamp(24px, 2.6vw, 36px)",
                                letterSpacing: "0.3px",
                                lineHeight: 1.35,
                            }}
                        >
                            Whether you are managing care for yourself or a loved one,
                            <br />
                            <span style={{ color: "#4c7865" }}>
                                ICare simplifies the process and saves money for everyone.
                            </span>
                        </h2>

                        <div
                            aria-hidden="true"
                            style={{
                                width: "min(720px, 85%)",
                                height: 3,
                                margin: "22px 0 28px 0",
                                borderRadius: 999,
                                background: "linear-gradient(90deg,#4c7865 0%,#6ea191 100%)",
                                opacity: 0.85,
                            }}
                        />

                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "12px",
                                maxWidth: 920,
                            }}
                        >
                            {[
                                {
                                    tag: "No subscription",
                                    bg: "rgba(255,255,255,.4)",
                                    br: "rgba(76,120,101,.25)",
                                    ico: "#4c7865",
                                },
                                {
                                    tag: "Direct agreement",
                                    bg: "rgba(255,255,255,.4)",
                                    br: "rgba(103,116,109,.22)",
                                    ico: "#4c7865",
                                },
                                {
                                    tag: "Secure messaging",
                                    bg: "rgba(255,255,255,.4)",
                                    br: "rgba(76,120,101,.22)",
                                    ico: "#4c7865",
                                },
                                {
                                    tag: "Transparent pricing",
                                    bg: "rgba(255,255,255,.4)",
                                    br: "rgba(103,116,109,.22)",
                                    ico: "#4c7865",
                                },
                            ].map((p) => (
                                <li
                                    key={p.tag}
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 8,
                                        padding: "10px 16px",
                                        borderRadius: 999,
                                        background: p.bg,
                                        border: `1px solid ${p.br}`,
                                        color: "#1f2a37",
                                        fontWeight: 600,
                                        fontSize: "15px",
                                        letterSpacing: "0.2px",
                                        boxShadow:
                                            "0 4px 8px rgba(15,23,42,0.04), inset 0 1px 1px rgba(255,255,255,0.4)",
                                        backdropFilter: "blur(6px) saturate(1.2)",
                                        WebkitBackdropFilter: "blur(6px) saturate(1.2)",
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
                                        <path d="M5 12l5 5L20 7" />
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
                            width: "100%",
                            height: "min(360px, 46vh)",
                            borderRadius: 24,
                            overflow: "hidden",
                            background: "#E5E7EB",
                            border: "1px solid rgba(15,23,42,.06)",
                            boxShadow: "0 10px 28px rgba(2,8,23,.05)",
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
                                filter: "saturate(1.01) contrast(1.02) brightness(.98)",
                            }}
                        />
                    </figure>
                </div>
            </section>


            {/* === CARE NEEDS CHECKLIST — pastel green background, ICare style === */}
            <section
                aria-label="Care Needs Checklist"
                style={{
                    marginLeft: "calc(50% - 50vw)",
                    marginRight: "calc(50% - 50vw)",
                    width: "100vw",
                    background: "#E9F4F0", // pastel green background
                    borderTop: "1px solid #DDEAE6",
                    borderBottom: "1px solid #DDEAE6",
                    padding: "80px 20px 90px",
                    fontFamily:
                        "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                }}
            >
                <div
                    style={{
                        width: "min(1200px, 92vw)",
                        margin: "0 auto",
                        display: "grid",
                        justifyItems: "center",
                    }}
                >
                    <div
                        style={{
                            width: "min(1000px, 85vw)",
                            background: "#FFFFFF",
                            border: "1px solid rgba(15,23,42,.06)",
                            borderRadius: 28,
                            padding: "42px 36px 48px",
                            boxShadow: "0 12px 36px rgba(2,8,23,.08)",
                        }}
                    >
                        {/* === Header === */}
                        <header
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 16,
                                flexWrap: "wrap",
                                borderBottom: "1px solid rgba(15,23,42,0.06)",
                                paddingBottom: 16,
                                marginBottom: 24,
                            }}
                        >
                            <h3
                                style={{
                                    margin: 0,
                                    color: "#1f2a37",
                                    fontWeight: 800,
                                    letterSpacing: ".2px",
                                    fontSize: "clamp(22px, 2.2vw, 30px)",
                                    lineHeight: 1.25,
                                }}
                            >
                                Tell us what you need
                            </h3>

                            <button
                                type="button"
                                style={{
                                    appearance: "none",
                                    border: "none",
                                    borderRadius: 999,
                                    background: "#4c7865",
                                    color: "#fff",
                                    padding: "12px 22px",
                                    fontWeight: 700,
                                    letterSpacing: ".02em",
                                    cursor: "pointer",
                                    boxShadow: "0 3px 8px rgba(76,120,101,0.25)",
                                    transition: "all .25s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "#3f6656";
                                    e.currentTarget.style.boxShadow =
                                        "0 4px 10px rgba(76,120,101,0.28)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "#4c7865";
                                    e.currentTarget.style.boxShadow =
                                        "0 3px 8px rgba(76,120,101,0.25)";
                                }}
                            >
                                Show matching caregivers
                            </button>
                        </header>

                        {/* === Description === */}
                        <p
                            style={{
                                margin: "0 0 26px",
                                color: "#375d4f",
                                fontSize: "clamp(15px, 1.2vw, 16px)",
                                lineHeight: 1.7,
                                textAlign: "center",
                                maxWidth: 720,
                                marginInline: "auto",
                            }}
                        >
                            Choose the areas you need help with. This helps us match you with
                            qualified caregivers suited to your situation.
                        </p>

                        {/* === Checklist grid === */}
                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                                gap: "14px",
                            }}
                        >
                            {[
                                "Dementia care",
                                "Mobility support",
                                "Post-surgery recovery",
                                "Overnight assistance",
                                "Live-in care",
                                "Hourly visits",
                                "Driving & errands",
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
                                            padding: "12px 16px",
                                            borderRadius: 16,
                                            background: "rgba(76,120,101,0.06)",
                                            border: "1px solid rgba(76,120,101,0.25)",
                                            color: "#1f2a37",
                                            fontWeight: 600,
                                            fontSize: 15,
                                            cursor: "pointer",
                                            boxShadow: "0 2px 5px rgba(15,23,42,0.04)",
                                            transition: "background .25s ease, border-color .25s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = "rgba(76,120,101,0.1)";
                                            e.currentTarget.style.borderColor =
                                                "rgba(76,120,101,0.35)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = "rgba(76,120,101,0.06)";
                                            e.currentTarget.style.borderColor =
                                                "rgba(76,120,101,0.25)";
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            style={{
                                                transform: "scale(1.2)",
                                                accentColor: "#4c7865",
                                                cursor: "pointer",
                                            }}
                                        />
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
                    margin: "64px auto 64px",
                    width: "min(92vw, 1100px)",
                    padding: "56px clamp(16px, 4vw, 32px)",
                    background: "#F7F8F9",
                    borderRadius: 24,
                    boxShadow: "0 8px 28px rgba(2,8,23,0.04)",
                    border: "1px solid #E5E7EB",
                    fontFamily:
                        "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                }}
            >
                {/* === Eyebrow label === */}
                <p
                    style={{
                        textAlign: "center",
                        color: "#6B7280",
                        textTransform: "uppercase",
                        letterSpacing: ".1em",
                        fontWeight: 700,
                        fontSize: 13,
                        margin: "0 0 10px",
                    }}
                >
                    ICare vs Agencies
                </p>

                {/* === Header === */}
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

                {/* === Benefit tags === */}
                <ul
                    style={{
                        listStyle: "none",
                        padding: 0,
                        margin: "0 auto 30px",
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: 12,
                        maxWidth: 860,
                    }}
                >
                    {[
                        "Direct agreement",
                        "Transparent pricing",
                        "Secure messaging",
                        "Fair pay for caregivers",
                    ].map((label) => (
                        <li
                            key={label}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "8px 14px",
                                borderRadius: 999,
                                background: "rgba(255,255,255,0.8)",
                                border: "1px solid rgba(76,120,101,0.25)",
                                color: "#375d4f",
                                fontWeight: 600,
                                fontSize: "14.5px",
                                boxShadow: "0 2px 4px rgba(2,8,23,0.03)",
                            }}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#4c7865"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            {label}
                        </li>
                    ))}
                </ul>

                {/* === Comparison cards === */}
                <div
                    style={{
                        marginTop: 16,
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: 20,
                    }}
                >
                    {/* === ICare card — vivid green === */}
                    <article
                        style={{
                            borderRadius: 20,
                            padding: 24,
                            background: "rgba(76, 160, 120, 0.18)", // 🌿 vivid, fresh green
                            border: "1px solid rgba(76, 160, 120, 0.45)",
                            boxShadow: "0 10px 28px rgba(2,8,23,0.08)",
                            transition: "all .25s ease",
                        }}
                    >
                        <header
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                marginBottom: 14,
                            }}
                        >
                            <span
                                aria-hidden="true"
                                style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 99,
                                    display: "grid",
                                    placeItems: "center",
                                    background: "rgba(76,160,120,0.25)",
                                    border: "1px solid rgba(76,160,120,0.55)",
                                    color: "#1f2a37",
                                    fontWeight: 900,
                                }}
                            >
                                ✓
                            </span>
                            <strong
                                style={{
                                    fontSize: 16,
                                    letterSpacing: ".2px",
                                    color: "#1f2a37", // stays black for contrast
                                }}
                            >
                                ICare
                            </strong>
                        </header>

                        <ul
                            style={{
                                margin: 0,
                                padding: "0 0 0 1rem",
                                lineHeight: 1.65,
                                color: "#1f2a37",
                                fontSize: 15,
                                fontWeight: 500,
                            }}
                        >
                            <li>Direct agreement with caregiver</li>
                            <li>Transparent, one-time fee after signing</li>
                            <li>Secure messaging and contracts in one place</li>
                            <li>Fair pay for caregivers, lower costs for families</li>
                        </ul>
                    </article>

                    {/* === Agency card — neutral === */}
                    <article
                        style={{
                            borderRadius: 20,
                            padding: 24,
                            background: "#FFFFFF",
                            border: "1px solid rgba(148,163,184,.25)",
                            boxShadow: "0 8px 20px rgba(2,8,23,0.04)",
                        }}
                    >
                        <header
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                marginBottom: 14,
                            }}
                        >
                            <span
                                aria-hidden="true"
                                style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 99,
                                    display: "grid",
                                    placeItems: "center",
                                    background: "rgba(148,163,184,.15)",
                                    border: "1px solid rgba(148,163,184,.35)",
                                    color: "#64748b",
                                    fontWeight: 900,
                                }}
                            >
                                —
                            </span>
                            <strong
                                style={{
                                    fontSize: 16,
                                    letterSpacing: ".2px",
                                    color: "#475569",
                                }}
                            >
                                Traditional agency
                            </strong>
                        </header>

                        <ul
                            style={{
                                margin: 0,
                                padding: "0 0 0 1rem",
                                lineHeight: 1.65,
                                color: "#334155",
                                fontSize: 15,
                                fontWeight: 500,
                            }}
                        >
                            <li>Intermediary in every step</li>
                            <li>Recurring fees and markups</li>
                            <li>Fragmented communication tools</li>
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
                    margin: "48px 0 0",
                    width: "100vw",
                    marginLeft: "calc(50% - 50vw)",
                    marginRight: "calc(50% - 50vw)",
                    background: "#4C7865", // 🌿 oliwkowo-zielony ICare
                    color: "#f4f8f6",
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                    fontFamily:
                        "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                    boxShadow: "0 8px 28px rgba(2,8,23,0.12)",
                }}
            >
                <div
                    style={{
                        position: "relative",
                        width: "min(92vw, 1100px)",
                        margin: "0 auto",
                        padding: "56px clamp(20px, 4vw, 48px) 60px",
                        display: "grid",
                        gap: 18,
                        alignItems: "center",
                    }}
                >
                    <h4
                        style={{
                            margin: 0,
                            fontSize: "clamp(1.35rem, 2.4vw, 1.75rem)",
                            fontWeight: 900,
                            letterSpacing: ".25px",
                            lineHeight: 1.25,
                            color: "#ffffff",
                            textShadow: "0 2px 8px rgba(0,0,0,0.25)",
                        }}
                    >
                        Ready to start? Register
                    </h4>

                    <p
                        style={{
                            margin: 0,
                            maxWidth: 720,
                            color: "rgba(255,255,255,.9)",
                            fontSize: "clamp(1rem, 1.25vw, 1.1rem)",
                            lineHeight: 1.65,
                            fontWeight: 500,
                        }}
                    >
                        Tell us what you need — we’ll help you find the right caregiver and set
                        clear, fair terms together.
                    </p>

                    <div
                        style={{
                            display: "flex",
                            gap: 14,
                            flexWrap: "wrap",
                            marginTop: 10,
                        }}
                    >
                        <a
                            href="mailto:hello@icare.example"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "12px 22px",
                                borderRadius: 999,
                                border: "1.8px solid #ffffff",
                                color: "#4C7865", // zielony tekst na białym tle
                                background: "#ffffff",
                                textDecoration: "none",
                                fontWeight: 700,
                                fontSize: "1rem",
                                letterSpacing: ".2px",
                                boxShadow: "0 8px 26px rgba(0,0,0,0.15)",
                                transition:
                                    "transform .18s ease, box-shadow .25s ease, background .25s ease, color .25s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-2px)";
                                e.currentTarget.style.background = "#e9f4f0";
                                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.25)";
                                e.currentTarget.style.color = "#375d4f";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.background = "#ffffff";
                                e.currentTarget.style.boxShadow = "0 8px 26px rgba(0,0,0,0.15)";
                                e.currentTarget.style.color = "#4C7865";
                            }}
                        >
                            Register
                        </a>
                    </div>
                </div>

                {/* === MINI FOOTER === */}
                <footer
                    style={{
                        background: "rgba(255,255,255,0.08)",
                        borderTop: "1px solid rgba(255,255,255,0.12)",
                        padding: "22px clamp(20px, 4vw, 48px)",
                    }}
                >
                    <div
                        style={{
                            maxWidth: 1100,
                            margin: "0 auto",
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            alignItems: "center",
                            color: "rgba(255,255,255,0.9)",
                            fontSize: 15,
                            fontWeight: 500,
                        }}
                    >
                        <span
                            style={{
                                fontWeight: 800,
                                letterSpacing: ".4px",
                                color: "#ffffff",
                                fontSize: 16,
                            }}
                        >
                            ICare
                        </span>

                        <nav
                            style={{
                                display: "flex",
                                gap: "1.6rem",
                                flexWrap: "wrap",
                            }}
                        >
                            {["Privacy", "Terms", "Contact"].map((item) => (
                                <a
                                    key={item}
                                    href={`/${item.toLowerCase()}`}
                                    style={{
                                        color: "rgba(255,255,255,0.95)",
                                        textDecoration: "none",
                                        fontWeight: 600,
                                        letterSpacing: ".25px",
                                        borderBottom: "2px solid transparent",
                                        transition:
                                            "color .25s ease, border-color .25s ease, transform .25s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = "#ffffff";
                                        e.currentTarget.style.borderBottom = "2px solid #ffffff";
                                        e.currentTarget.style.transform = "translateY(-1px)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = "rgba(255,255,255,0.95)";
                                        e.currentTarget.style.borderBottom = "2px solid transparent";
                                        e.currentTarget.style.transform = "translateY(0)";
                                    }}
                                >
                                    {item}
                                </a>
                            ))}
                        </nav>
                    </div>
                </footer>
            </section>

        </div>
    );
}
