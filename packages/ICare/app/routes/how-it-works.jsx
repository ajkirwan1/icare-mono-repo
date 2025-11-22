import React from "react";
import { Link } from "react-router";
import whoWeAreHeroSrc from "/images/heros/who-we-are.jpg";
import styles from "./how-it-works.module.scss";

/* ===== STICKY SUBNAV (samozaczepna) ===== */
function StickySubnav() {
    const BRAND = "#1FAB1F";
    const linkStyle = {
        textDecoration: "none",
        color: "#0F172A",
        fontWeight: 800,
        letterSpacing: ".02em",
        fontSize: "clamp(.9rem, 1.2vw, 1rem)",
        padding: ".55rem .9rem",
        borderRadius: 999,
        border: "1px solid rgba(31,171,31,.25)",
        background: "rgba(31,171,31,.08)",
        transition: "background .2s ease, transform .15s ease, border-color .2s ease",
    };
    return (
        <nav
            aria-label="Page quick nav"
            style={{
                position: "sticky",
                top: 0,
                zIndex: 50,
                background: "rgba(255,255,255,.92)",
                backdropFilter: "saturate(1.1) blur(6px)",
                borderBottom: "1px solid rgba(15,23,42,.06)",
            }}
        >
            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: "10px clamp(16px,4vw,32px)",
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {[

                ].map((l) => (
                    <a
                        key={l.href}
                        href={l.href}
                        style={linkStyle}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(31,171,31,.14)";
                            e.currentTarget.style.transform = "translateY(-1px)";
                            e.currentTarget.style.borderColor = BRAND;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(31,171,31,.08)";
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.borderColor = "rgba(31,171,31,.25)";
                        }}
                    >
                        {l.label}
                    </a>
                ))}
            </div>
        </nav>
    );
}

/* ===== 3-KROKOWY PRZEWODNIK ===== */
function ThreeStepGuide() {
    const BRAND = "#1FAB1F";
    const steps = [
        {
            t: "Create your profile",
            d: "Register for free, set care needs or skills, choose languages and availability.",
            icon: (
                <svg viewBox="0 0 24 24" width="36" height="36" aria-hidden="true">
                    <circle cx="12" cy="7.5" r="3.25" fill="none" stroke={BRAND} strokeWidth="2" />
                    <path d="M5 20v-1.2A5.8 5.8 0 0 1 10.8 13h2.4A5.8 5.8 0 0 1 19 18.8V20" fill="none" stroke={BRAND} strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
        },
        {
            t: "Match & message",
            d: "Browse verified caregivers, match on skills and location, chat securely.",
            icon: (
                <svg viewBox="0 0 24 24" width="36" height="36" aria-hidden="true">
                    <path d="M21 15a4 4 0 0 1-4 4H8l-4 4V7a4 4 0 0 1 4-4h7" fill="none" stroke={BRAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15.5 3.5l5 5" fill="none" stroke={BRAND} strokeWidth="2" />
                    <path d="M20.5 3.5l-5 5" fill="none" stroke={BRAND} strokeWidth="2" />
                </svg>
            ),
        },
        {
            t: "Agree terms & start",
            d: "Set schedule and rate, e-sign your agreement, keep everything in one place.",
            icon: (
                <svg viewBox="0 0 24 24" width="36" height="36" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="14" rx="2" fill="none" stroke={BRAND} strokeWidth="2" />
                    <path d="M7 8h6M7 12h10" fill="none" stroke={BRAND} strokeWidth="2" strokeLinecap="round" />
                    <path d="M16 17l2 2 4-4" fill="none" stroke={BRAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
    ];
    const colors = ["#F0FAF0", "#F9F9FB", "#FFF9F0"];
    return (
        <section
            id="steps"
            aria-label="Three steps"
            style={{
                marginLeft: "calc(50% - 50vw)",
                marginRight: "calc(50% - 50vw)",
                width: "100vw",
                background: "#FFFFFF",
                borderTop: "1px solid rgba(15,23,42,.06)",
                borderBottom: "1px solid rgba(15,23,42,.06)",
                padding: "clamp(5rem,8vw,8rem) 0",
                fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <div
                style={{
                    maxWidth: 1280,
                    margin: "0 auto",
                    padding: "0 clamp(24px,5vw,48px)",
                }}
            >
                <h2
                    style={{
                        margin: 0,
                        fontWeight: 900,
                        color: "#0F172A",
                        fontSize: "clamp(2.2rem,3vw,2.8rem)",
                        lineHeight: 1.2,
                        letterSpacing: ".25px",
                        animation: "fadeUp .8s ease both",
                    }}
                >
                    Get started in 3 simple steps
                </h2>

                <div style={{ height: "clamp(2.5rem,4vw,3.5rem)" }} />

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
                        gap: "clamp(32px,4vw,48px)",
                    }}
                >
                    {[
                        {
                            title: "Create your profile",
                            desc: "Introduce yourself, choose your role, and tell us what support you need — or offer.",
                            img: "https://images.unsplash.com/photo-1581579184439-1f3a5c7f1b5f?auto=format&fit=crop&w=1000&q=80",
                        },
                        {
                            title: "Get matched instantly",
                            desc: "Browse verified caregivers or care receivers that match your needs and preferences.",
                            img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1000&q=80",
                        },
                        {
                            title: "Start working together",
                            desc: "Agree on the details, sign the contract, and begin high-quality, safe care.",
                            img: "https://images.unsplash.com/photo-1587502537745-84bb8a0d4a01?auto=format&fit=crop&w=1000&q=80",
                        },
                    ].map((step, i) => (
                        <article
                            key={step.title}
                            style={{
                                position: "relative",
                                borderRadius: 24,
                                overflow: "hidden",
                                background: "#fff",
                                boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
                                transition: "all .35s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-6px)";
                                e.currentTarget.style.boxShadow = "0 16px 38px rgba(0,0,0,0.12)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0px)";
                                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.05)";
                            }}
                        >
                            {/* IMAGE */}
                            <div
                                style={{
                                    width: "100%",
                                    height: 220,
                                    overflow: "hidden",
                                }}
                            >
                                <img
                                    src={step.img}
                                    alt=""
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        transition: "transform .45s ease",
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                />
                            </div>

                            {/* TEXT BLOCK */}
                            <div style={{ padding: "24px 26px 30px" }}>
                                <h3
                                    style={{
                                        margin: 0,
                                        fontSize: "1.35rem",
                                        color: "#0F172A",
                                        fontWeight: 800,
                                    }}
                                >
                                    {step.title}
                                </h3>

                                <p
                                    style={{
                                        marginTop: 10,
                                        marginBottom: 0,
                                        color: "#475569",
                                        fontSize: "1rem",
                                        lineHeight: 1.65,
                                    }}
                                >
                                    {step.desc}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>

                {/* CTA BUTTON */}
                <div style={{ marginTop: "clamp(48px,4vw,64px)" }}>
                    <a
                        href="/register"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 10,
                            textDecoration: "none",
                            color: "#FFFFFF",
                            background: "#1F7A4A",
                            padding: "1.1rem 2rem",
                            borderRadius: 999,
                            fontWeight: 900,
                            letterSpacing: ".03em",
                            boxShadow: "0 10px 28px rgba(0,0,0,.12)",
                            border: "1px solid rgba(0,0,0,.12)",
                            transition: "all .25s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#16653C";
                            e.currentTarget.style.transform = "translateY(-3px)";
                            e.currentTarget.style.boxShadow = "0 14px 34px rgba(0,0,0,.16)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#1F7A4A";
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,.12)";
                        }}
                    >
                        Create your free account
                    </a>
                </div>
            </div>

            <style>{`
        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(14px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `}</style>
        </section>

    );
}

/* ===== PORÓWNANIE: Agency vs ICare ===== */
function CompareAgencyVsICare() {
    const BRAND = "#1FAB1F";
    const HEAD_NEUTRAL = "#0F172A";
    const HEAD_AGENCY = "#7F1D1D";

    const rows = [
        { k: "Monthly platform fee", agency: "Often recurring", icare: "None" },
        { k: "Matching margin", agency: "20–50%+", icare: "0%" },
        { k: "Contract fee", agency: "Hidden or bundled", icare: "Flat 10% on agreement" },
        { k: "Direct contact", agency: "Limited", icare: "Yes — private & secure" },
        { k: "Transparency", agency: "Varies", icare: "Clear profiles & pricing" },
    ];

    return (
        <section
            id="compare"
            aria-label="Compare agency vs ICare"
            style={{
                background: "#FFFFFF",
                borderTop: "1px solid rgba(15,23,42,0.06)",
                borderBottom: "1px solid rgba(15,23,42,0.06)",
                padding: "clamp(5rem,7vw,6.5rem) clamp(24px,6vw,60px)",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <div style={{ maxWidth: 1180, margin: "0 auto", animation: "fadeUp 1s ease both" }}>

                {/* === TITLE === */}
                <h2
                    style={{
                        margin: 0,
                        fontWeight: 900,
                        color: "#0F172A",
                        fontSize: "clamp(2.2rem,3vw,2.7rem)",
                        letterSpacing: ".25px",
                        lineHeight: 1.2,
                    }}
                >
                    Why families choose ICare?
                </h2>

                <p
                    style={{
                        margin: "1rem 0 3rem",
                        color: "#475569",
                        maxWidth: "65ch",
                        lineHeight: 1.7,
                        fontSize: "1.1rem",
                        fontWeight: 500,
                    }}
                >
                    A modern, transparent alternative to traditional agencies — created for families and caregivers who value clarity, trust and fair pay.
                </p>

                {/* === CARDS WRAPPER === */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))",
                        gap: "clamp(30px,4vw,40px)",
                    }}
                >
                    {/* =======================
                AGENCY CARD
            ======================= */}
                    <article
                        style={{
                            background: "#FAFAFA",
                            border: "1px solid rgba(120,20,20,0.12)",
                            borderRadius: 24,
                            overflow: "hidden",
                            boxShadow: "0 8px 28px rgba(0,0,0,0.06)",
                            transition: "transform .35s ease, box-shadow .35s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-4px)";
                            e.currentTarget.style.boxShadow = "0 12px 34px rgba(0,0,0,0.08)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.06)";
                        }}
                    >
                        <img
                            src="/images/agency-dark.jpg"
                            alt="Traditional Agency"
                            style={{ width: "100%", height: 240, objectFit: "cover" }}
                        />

                        <div style={{ padding: "28px" }}>
                            <h3
                                style={{
                                    margin: 0,
                                    fontSize: "1.35rem",
                                    fontWeight: 800,
                                    color: "#7F1D1D",
                                }}
                            >
                                Typical Agency
                            </h3>

                            <ul style={{ padding: 0, margin: "18px 0 0", listStyle: "none", display: "grid", gap: 14 }}>
                                {[
                                    "High margins (25–40%)",
                                    "Limited choice of caregiver",
                                    "Locked contracts",
                                    "Extra fees for changes",
                                    "Limited transparency",
                                ].map((item) => (
                                    <li
                                        key={item}
                                        style={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: 10,
                                            color: "#7F1D1D",
                                            fontSize: "1rem",
                                            lineHeight: 1.5,
                                        }}
                                    >
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            stroke="#B91C1C"
                                            strokeWidth="1.5"
                                            fill="none"
                                        >
                                            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>

                    {/* =======================
                ICARE CARD
            ======================= */}
                    <article
                        style={{
                            background: "#FFFFFF",
                            border: `1px solid ${BRAND}22`,
                            borderRadius: 24,
                            overflow: "hidden",
                            boxShadow: "0 8px 28px rgba(0,0,0,0.06)",
                            transition: "transform .35s ease, box-shadow .35s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-4px)";
                            e.currentTarget.style.boxShadow = "0 12px 34px rgba(31,171,31,0.18)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.06)";
                        }}
                    >
                        <img
                            src="/images/icare-bright.jpg"
                            alt="ICare Matching"
                            style={{ width: "100%", height: 240, objectFit: "cover" }}
                        />

                        <div style={{ padding: "28px" }}>
                            <h3
                                style={{
                                    margin: 0,
                                    fontSize: "1.35rem",
                                    fontWeight: 800,
                                    color: BRAND,
                                }}
                            >
                                ICare
                            </h3>

                            <ul style={{ padding: 0, margin: "18px 0 0", listStyle: "none", display: "grid", gap: 14 }}>
                                {[
                                    "Flat 10% fee on contract",
                                    "You pick the right caregiver",
                                    "Full transparency",
                                    "Direct agreements",
                                    "Better pay for caregivers",
                                ].map((item) => (
                                    <li
                                        key={item}
                                        style={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: 10,
                                            color: "#14532D",
                                            fontSize: "1rem",
                                            lineHeight: 1.5,
                                        }}
                                    >
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            stroke={BRAND}
                                            strokeWidth="1.7"
                                            fill="none"
                                        >
                                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>
                </div>
            </div>

            <style>{`
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(18px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `}</style>
        </section>

    );
}


/* ===== CTA BANNER: Kontakt / pytania ===== */
function ContactCTABanner() {
    const BRAND = "#1FAB1F";
    return (
        <section
            id="contact"
            aria-label="Contact CTA"
            style={{
                marginLeft: "calc(50% - 50vw)",
                marginRight: "calc(50% - 50vw)",
                width: "100vw",
                background: "#E8F2EC", // 🌿 premium soft green
                borderTop: "1px solid rgba(0,0,0,0.05)",
                padding: "clamp(3.4rem,6vw,4.6rem) 0",
            }}
        >
            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: "0 clamp(16px,4vw,32px)",
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "2.4rem",
                    alignItems: "center",
                    fontFamily:
                        "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                }}
            >
                {/* === TEXT === */}
                <div>
                    <h3
                        style={{
                            margin: 0,
                            color: "#0F172A",
                            fontWeight: 900,
                            fontSize: "clamp(1.7rem,2.4vw,2rem)",
                            lineHeight: 1.18,
                            letterSpacing: "-0.25px",
                        }}
                    >
                        Questions about how ICare works?
                    </h3>

                    <p
                        style={{
                            margin: "0.75rem 0 0",
                            color: "#3A3A3A",
                            fontSize: "clamp(1rem,1.15vw,1.1rem)",
                            lineHeight: 1.7,
                            fontWeight: 500,
                            maxWidth: "62ch",
                        }}
                    >
                        We’ll gladly walk you through setup, matching, and agreements — in under
                        10 minutes.
                    </p>
                </div>

                {/* === CTA BUTTON === */}
                <a
                    href="/contact"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 12,
                        textDecoration: "none",
                        padding: "1rem 2rem",
                        borderRadius: 999,
                        fontWeight: 900,
                        letterSpacing: ".03em",
                        fontSize: "1rem",
                        color: "#fff",
                        background:
                            "linear-gradient(90deg, #4C7865 0%, #6CAF8E 100%)",
                        boxShadow: "0 8px 22px rgba(76,120,101,0.28)",
                        border: "1px solid rgba(76,120,101,0.4)",
                        transition: "all .28s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-3px)";
                        e.currentTarget.style.filter = "brightness(1.08)";
                        e.currentTarget.style.boxShadow =
                            "0 12px 32px rgba(76,120,101,0.35)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.filter = "brightness(1)";
                        e.currentTarget.style.boxShadow =
                            "0 8px 22px rgba(76,120,101,0.28)";
                    }}
                >
                    Contact us

                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        style={{ opacity: 0.95 }}
                    >
                        <path d="M5 12h14" />
                        <path d="M13 5l6 7-6 7" />
                    </svg>
                </a>
            </div>
        </section>
    );
}

/* ===== Cost & Savings Estimator — spójny z #1FAB1F ===== */
function SavingsEstimatorCurrency() {
    const BRAND = "#1FAB1F";
    const [hourly, setHourly] = React.useState(20);
    const [hoursWeek, setHoursWeek] = React.useState(40);
    const [agencyMargin, setAgencyMargin] = React.useState(35);
    const [currency, setCurrency] = React.useState("PLN");

    const nf = React.useMemo(() => new Intl.NumberFormat(undefined, { style: "currency", currency }), [currency]);

    const { monthlyBase, monthlyAgency, monthlyICare, monthlySave, savePct } = React.useMemo(() => {
        const weeks = 4.33;
        const base = hourly * hoursWeek * weeks;
        const agency = base * (1 + agencyMargin / 100);
        const icare = base * 1.1; // ICare 10% flat
        const save = Math.max(0, agency - icare);
        const pct = agency > 0 ? (save / agency) * 100 : 0;
        return { monthlyBase: base, monthlyAgency: agency, monthlyICare: icare, monthlySave: save, savePct: pct };
    }, [hourly, hoursWeek, agencyMargin]);

    return (
        <section
            id="estimator"
            aria-label="Cost & Savings Estimator"
            style={{
                margin: "5.4rem auto",
                maxWidth: 1080, // 👈 zmniejszone o ok. 10%
                padding: "0 clamp(14px, 3.6vw, 28px)",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                display: "grid",
                gridTemplateColumns: "1fr 1.4fr", // 👈 proporcje zachowane, ale całość mniejsza
                gap: "clamp(40px, 4.5vw, 70px)",
                alignItems: "start",
            }}
        >
            {/* === LEWA STRONA === */}
            <div style={{ animation: "fadeEstimator 0.8s ease both" }}>
                <h2
                    style={{
                        margin: 0,
                        fontWeight: 800,
                        letterSpacing: ".2px",
                        color: "#0f172a",
                        fontSize: "clamp(1.9rem, 2.7vw, 2.3rem)", // 👈 tytuł -10%
                        lineHeight: 1.2,
                        textAlign: "left",
                    }}
                >
                    Cost &amp; Savings Estimator
                </h2>

                <div
                    aria-hidden="true"
                    style={{
                        width: 0,
                        height: 4,
                        background: "#1FAB1F",
                        borderRadius: 999,
                        margin: "0.9rem 0 1.3rem 0",
                        opacity: 0.9,
                    }}
                />

                <p
                    style={{
                        textAlign: "left",
                        color: "#475569",
                        margin: 0,
                        fontSize: "1rem",
                        lineHeight: 1.6,
                        maxWidth: "50ch",
                        fontWeight: 600,
                    }}
                >
                    Estimate how much you and your caregiver can save each month when you work
                    directly — without agency margins or hidden fees.
                </p>
            </div>

            {/* === PRAWA STRONA === */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))", // 👈 boxy o 10% mniejsze
                    gap: "clamp(18px, 2.2vw, 26px)",
                    alignItems: "stretch",
                }}
            >
                {/* FORMULARZ */}
                <form
                    onSubmit={(e) => e.preventDefault()}
                    style={{
                        border: "1px solid rgba(15,23,42,0.08)",
                        borderRadius: 18,
                        padding: "clamp(22px, 2vw, 28px)",
                        background: "#FFFFFF",
                        boxShadow: "0 8px 22px rgba(15,23,42,0.05)",
                        display: "grid",
                        gap: 14,
                        animation: "fadeCard 0.8s ease 0.15s both",
                    }}
                >
                    {[
                        {
                            label: "Currency",
                            type: "select",
                            options: ["PLN — zł", "EUR — €", "GBP — £", "USD — $"],
                        },
                        { label: "Hourly rate", type: "number", placeholder: "e.g. 25" },
                        { label: "Hours per week", type: "number", placeholder: "e.g. 40" },
                        { label: "Agency margin (%)", type: "number", placeholder: "e.g. 35" },
                    ].map((field, i) => (
                        <label key={i} style={{ display: "grid", gap: 6 }}>
                            <span
                                style={{
                                    fontWeight: 800,
                                    color: "#1f2a37",
                                    fontSize: ".9rem",
                                }}
                            >
                                {field.label}
                            </span>
                            {field.type === "select" ? (
                                <select
                                    style={{
                                        border: "1px solid rgba(15,23,42,0.18)",
                                        borderRadius: 12,
                                        padding: "11px 13px",
                                        fontSize: ".95rem",
                                        background: "#fff",
                                    }}
                                >
                                    {field.options.map((opt) => (
                                        <option key={opt}>{opt}</option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type="number"
                                    placeholder={field.placeholder}
                                    style={{
                                        border: "1px solid rgba(15,23,42,0.18)",
                                        borderRadius: 12,
                                        padding: "11px 13px",
                                        fontSize: ".95rem",
                                    }}
                                />
                            )}
                        </label>
                    ))}

                    <div
                        style={{
                            marginTop: 2,
                            padding: "9px 11px",
                            borderRadius: 12,
                            background: "rgba(31,171,31,0.08)",
                            border: "1px solid rgba(31,171,31,0.20)",
                            color: "#1f2a37",
                            fontWeight: 700,
                            fontSize: ".9rem",
                        }}
                    >
                        ICare fee: <span style={{ color: "#1FAB1F" }}>flat 10%</span> on contract
                    </div>
                </form>

                {/* WYNIKI */}
                <div
                    style={{
                        border: "1px solid rgba(15,23,42,0.08)",
                        borderRadius: 18,
                        padding: "clamp(22px, 2vw, 28px)",
                        background: "#FFFFFF",
                        boxShadow: "0 8px 22px rgba(15,23,42,0.05)",
                        display: "grid",
                        gap: 14,
                        animation: "fadeCard 0.8s ease 0.25s both",
                    }}
                >
                    <h3
                        style={{
                            margin: 0,
                            fontWeight: 900,
                            color: "#1f2a37",
                            fontSize: "clamp(1.05rem, 1.9vw, 1.25rem)",
                        }}
                    >
                        Monthly estimate
                    </h3>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 10,
                        }}
                    >
                        {[
                            { k: "Base cost", v: monthlyBase },
                            { k: "Agency total", v: monthlyAgency },
                            { k: "ICare total", v: monthlyICare },
                            { k: "You save with ICare", v: monthlySave, highlight: true },
                        ].map((row) => (
                            <div
                                key={row.k}
                                style={{
                                    border: "1px solid rgba(15,23,42,0.08)",
                                    borderRadius: 10,
                                    padding: "12px 14px",
                                    background: row.highlight
                                        ? "rgba(31,171,31,0.06)"
                                        : "rgba(255,255,255,0.96)",
                                    transition: "background .3s ease",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: ".82rem",
                                        color: "#475569",
                                        marginBottom: 3,
                                        fontWeight: 700,
                                    }}
                                >
                                    {row.k}
                                </div>
                                <div
                                    style={{
                                        fontWeight: 900,
                                        fontSize: "1.1rem",
                                        color: row.highlight ? "#1FAB1F" : "#1f2a37",
                                    }}
                                >
                                    {nf.format(row.v)} {currency}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: 8 }}>
                        <div
                            style={{
                                height: 9,
                                width: "100%",
                                background: "#F1F5F9",
                                borderRadius: 999,
                                overflow: "hidden",
                            }}
                        >
                            <div
                                style={{
                                    height: "100%",
                                    width: `${Math.max(0, Math.min(100, savePct)).toFixed(0)}%`,
                                    background: "#1FAB1F",
                                    transition: "width 0.6s ease",
                                }}
                            />
                        </div>
                        <div
                            style={{
                                marginTop: 6,
                                fontSize: ".88rem",
                                color: "#334155",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "baseline",
                            }}
                        >
                            <span>Estimated savings vs agency</span>
                            <strong style={{ color: "#1FAB1F" }}>{savePct.toFixed(0)}%</strong>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animacje */}
            <style>{`
    @keyframes fadeEstimator {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeCard {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `}</style>
        </section>

    );
}

/* ===== PAGE ===== */
export default function HowItWorks() {
    return (
        <div className={styles.page}>
            {/* HERO */}
            <section
                className={styles.heroWrap}
                aria-label="How it works hero"
                style={{
                    position: "relative",
                    height: "clamp(520px, 72vh, 760px)", // identyczna wysokość jak homepage
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    overflow: "hidden",
                }}
            >
                {/* BACKGROUND IMAGE */}
                <img
                    src={whoWeAreHeroSrc}
                    alt="Care coordination background"
                    className={styles.heroImg}
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "brightness(0.62) contrast(1.08) saturate(1.08)", // IDENTYCZNIE JAK HOMEPAGE
                    }}
                />

                {/* GRADIENT OVERLAY – 1:1 HOMEPAGE */}
                <div
                    className={styles.heroOverlay}
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.75) 100%)",
                    }}
                />

                {/* ==== HEADER (navigation) — 1:1 ==== */}
                <header className={styles.headerOverlay}>
                    <Link
                        to="/"
                        className={styles.brand}
                        style={{
                            color: "#fff",
                            textDecoration: "none",
                            fontWeight: 900,
                            letterSpacing: "-0.3px",
                            fontSize: "1.25rem",
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
                            {
                                to: "/icare-for-caregivers",
                                label: "ICare For Caregivers",
                            },
                            {
                                to: "/icare-for-carereceivers",
                                label: "ICare For Care Receivers",
                            },
                        ].map((l) => (
                            <Link
                                key={l.to}
                                to={l.to}
                                style={{
                                    color: "rgba(255,255,255,0.92)",
                                    textDecoration: "none",
                                    fontSize: "clamp(.9rem,1.2vw,.95rem)",
                                    fontWeight: 600,
                                    letterSpacing: ".01em",
                                    padding: ".2rem 0",
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
                                    e.currentTarget.style.color = "rgba(255,255,255,0.92)";
                                    e.currentTarget.style.textDecoration = "none";
                                }}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>
                </header>

                {/* ==== IDENTICAL HERO COPY LAYOUT ==== */}
                <div
                    style={{
                        position: "relative",
                        zIndex: 10,
                        width: "min(92vw, 1100px)",
                        margin: "0 auto",
                        padding: "0 clamp(16px, 4vw, 32px)",
                        color: "#fff",
                        textAlign: "left",
                        fontFamily:
                            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                        transform: "translateY(10%)",
                    }}
                >
                    {/* TAGLINE – EXACT SAME STYLE */}
                    <span
                        style={{
                            display: "inline-block",
                            marginBottom: "2.4rem",
                            fontSize: ".95rem",
                            fontWeight: 700,
                            letterSpacing: ".16em",
                            textTransform: "uppercase",
                            color: "#E9F8EC",
                            padding: ".55rem 1.2rem",
                            borderRadius: 999,
                            background: "rgba(255,255,255,0.14)",
                            border: "1px solid rgba(255,255,255,0.26)",
                            backdropFilter: "blur(4px)",
                        }}
                    >
                        Direct • Fair • Transparent
                    </span>

                    {/* TITLE — 1:1 WE ARE NOT AN AGENCY SIZE */}
                    <h1
                        style={{
                            margin: "0 0 1.6rem",
                            fontWeight: 900,
                            lineHeight: 1.03,
                            letterSpacing: "-0.5px",
                            fontSize: "clamp(2.7rem, 5vw, 3.4rem)",
                            textShadow:
                                "0 6px 26px rgba(0,0,0,.55), 0 2px 10px rgba(0,0,0,.35)",
                        }}
                    >
                        How it works
                    </h1>

                    {/* BODY COPY — SAME STYLE, SAME WIDTH */}
                    <p
                        style={{
                            margin: "0 0 .5rem",
                            lineHeight: 1.68,
                            fontSize: "clamp(1.15rem,1.3vw,1.2rem)",
                            color: "rgba(255,255,255,0.96)",
                            maxWidth: "62ch",
                            fontWeight: 400,
                            textShadow: "0 2px 8px rgba(0,0,0,.35)",
                        }}
                    >
                        <b>Why choose ICare instead of going through an agency?</b>
                    </p>

                    <p
                        style={{
                            margin: "0 0 .5rem",
                            lineHeight: 1.68,
                            fontSize: "clamp(1.15rem,1.3vw,1.2rem)",
                            color: "rgba(255,255,255,0.96)",
                            maxWidth: "62ch",
                            fontWeight: 400,
                            textShadow: "0 2px 8px rgba(0,0,0,.35)",
                        }}
                    >
                        <b>We don’t charge high margins for matching or management.</b>
                    </p>

                    <p
                        style={{
                            margin: ".2rem 0 0",
                            lineHeight: 1.68,
                            fontSize: "clamp(1.15rem,1.3vw,1.2rem)",
                            color: "rgba(255,255,255,0.96)",
                            maxWidth: "62ch",
                            fontWeight: 400,
                            textShadow: "0 2px 8px rgba(0,0,0,.35)",
                        }}
                    >
                        <b>You save money — and the caregiver earns more.</b>
                    </p>
                </div>
            </section>


            {/* Sticky subnav + content sections */}
            <StickySubnav />
            <ThreeStepGuide />
            <CompareAgencyVsICare />
            <SavingsEstimatorCurrency />
            <ContactCTABanner />

            {/* FOOTER — przeniesiony na sam dół strony */}
            <footer className={styles.footer}>
                <ul className={styles.listReset}>
                    <li>
                        <Link to="/" className={styles.footerLink}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/landing" className={styles.footerLink}>
                            Landing
                        </Link>
                    </li>
                    <li>
                        <Link to="/privacy" className={styles.footerLink}>
                            Privacy
                        </Link>
                    </li>
                </ul>
                <div className={styles.copy}>© {new Date().getFullYear()} ICare. All rights reserved.</div>
            </footer>
        </div>
    );
}
