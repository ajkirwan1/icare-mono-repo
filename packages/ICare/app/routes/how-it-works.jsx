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
                background: "#F8FAFC",
                borderTop: "1px solid rgba(15,23,42,.06)",
                borderBottom: "1px solid rgba(15,23,42,.06)",
            }}
        >
            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: "clamp(48px,6vw,88px) clamp(20px,5vw,40px)",
                }}
            >
                <h2
                    style={{
                        margin: 0,
                        fontWeight: 900,
                        color: "#1f2a37",
                        fontSize: "clamp(1.45rem,2.3vw,1.9rem)",
                        letterSpacing: ".2px",
                        textAlign: "left",
                        lineHeight: 1.25,
                    }}
                >
                    Get started in 3 quick steps
                </h2>

                <div
                    aria-hidden="true"
                    style={{
                        width: 220,
                        height: 4,
                        background: BRAND,
                        borderRadius: 999,
                        margin: "1rem 0 2.4rem 0",
                        opacity: 0.95,
                    }}
                />

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
                        gap: "clamp(28px,3vw,36px)",
                    }}
                >
                    {steps.map((s, i) => (
                        <article
                            key={s.t}
                            style={{
                                position: "relative",
                                border: "1px solid rgba(15,23,42,.08)",
                                borderRadius: 24,
                                background: colors[i % colors.length],
                                padding: "clamp(30px,3vw,40px)",
                                boxShadow: "0 10px 26px rgba(15,23,42,.05)",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                                textAlign: "left",
                                minHeight: 220,
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    justifyContent: "flex-start",
                                    gap: 16,
                                    marginBottom: 10,
                                }}
                            >
                                <div
                                    style={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: 999,
                                        background: "rgba(31,171,31,0.1)",
                                        border: "1px solid rgba(31,171,31,0.25)",
                                        display: "grid",
                                        placeItems: "center",
                                        fontWeight: 900,
                                        color: "#14532D",
                                        fontSize: "1.1rem",
                                        flexShrink: 0,
                                    }}
                                >
                                    {i + 1}
                                </div>

                                <strong
                                    style={{
                                        fontSize: "clamp(1.08rem,1.6vw,1.25rem)",
                                        color: "#0F172A",
                                        letterSpacing: ".2px",
                                        lineHeight: 1.25,
                                        textAlign: "left",
                                        marginTop: 6,
                                    }}
                                >
                                    {s.t}
                                </strong>
                            </div>

                            <p
                                style={{
                                    margin: 0,
                                    marginTop: 4,
                                    color: "#334155",
                                    lineHeight: 1.75,
                                    fontSize: "clamp(.95rem,1vw,1.02rem)",
                                    maxWidth: "94%",
                                    textAlign: "left",
                                }}
                            >
                                {s.d}
                            </p>
                        </article>
                    ))}
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        gap: 14,
                        marginTop: "clamp(32px,3vw,44px)",
                        flexWrap: "wrap",
                    }}
                >
                    <a
                        href="/register"
                        style={{
                            textDecoration: "none",
                            color: "#FFFFFF",
                            background: BRAND,
                            padding: "1rem 1.6rem",
                            borderRadius: 999,
                            fontWeight: 900,
                            letterSpacing: ".02em",
                            boxShadow: "0 12px 28px rgba(2,8,23,.15)",
                            border: "1px solid rgba(31,171,31,.45)",
                        }}
                    >
                        CREATE YOUR FREE ACCOUNT
                    </a>
                </div>
            </div>
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

    const underline = (color) => ({
        display: "inline-block",
        paddingBottom: 3,
        borderBottom: `2.6px solid ${color}`,
        lineHeight: 1.1,
    });

    return (
        <section
            id="compare"
            aria-label="Compare agency vs ICare"
            style={{
                margin: "4rem auto",
                maxWidth: 1100,
                padding: "clamp(24px,4vw,48px) clamp(16px,3vw,28px)",
                background: "#FFFFFF",
                borderRadius: 24,
                boxShadow: "0 6px 22px rgba(15,23,42,0.06)",
                border: "1px solid rgba(15,23,42,0.05)",
                fontFamily: "Inter, system-ui, sans-serif",
            }}
        >
            <h2
                style={{
                    margin: 0,
                    fontWeight: 900,
                    color: "#1f2a37",
                    fontSize: "clamp(1.45rem,2.4vw,1.9rem)",
                    letterSpacing: ".2px",
                    textAlign: "left",
                    lineHeight: 1.25,
                }}
            >
                Why ICare vs an agency?
            </h2>

            <div
                aria-hidden="true"
                style={{
                    width: 200,
                    height: 4,
                    background: BRAND,
                    borderRadius: 999,
                    margin: "1rem 0 2rem 0",
                    opacity: 0.9,
                }}
            />

            <div style={{ overflowX: "auto" }}>
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "separate",
                        borderSpacing: 0,
                        borderRadius: 20,
                        overflow: "hidden",
                        fontSize: "clamp(.82rem,0.95vw,.9rem)",
                        boxShadow: "0 3px 10px rgba(15,23,42,0.04)",
                    }}
                >
                    <thead>
                        <tr>
                            <th
                                style={{
                                    textAlign: "left",
                                    padding: "16px 18px 12px",
                                    background: "#F8FAFC",
                                    border: "1px solid #E2E8F0",
                                    color: HEAD_NEUTRAL,
                                    fontWeight: 900,
                                    fontSize: "1.15rem",
                                    letterSpacing: ".3px",
                                }}
                            >
                                <span style={underline(HEAD_NEUTRAL)}>Feature</span>
                            </th>
                            <th
                                style={{
                                    textAlign: "left",
                                    padding: "16px 18px 12px",
                                    background: "#F8FAFC",
                                    border: "1px solid #E2E8F0",
                                    color: HEAD_AGENCY,
                                    fontWeight: 800,
                                    fontSize: "1.15rem",
                                }}
                            >
                                <span style={underline(HEAD_AGENCY)}>Typical agency</span>
                            </th>
                            <th
                                style={{
                                    textAlign: "left",
                                    padding: "16px 18px 12px",
                                    background: "rgba(31,171,31,.08)",
                                    border: "1px solid #BDE7BD",
                                    color: BRAND,
                                    fontWeight: 900,
                                    fontSize: "1.15rem",
                                }}
                            >
                                <span style={underline(BRAND)}>ICare</span>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map((r, idx) => (
                            <tr key={r.k} style={{ background: idx % 2 ? "#FFFFFF" : "#FAFAF7" }}>
                                <td
                                    style={{
                                        padding: "12px 16px",
                                        border: "1px solid #E2E8F0",
                                        color: "#334155",
                                        fontWeight: 600,
                                        fontSize: "0.78rem",
                                        lineHeight: 1.5,
                                    }}
                                >
                                    {r.k}
                                </td>
                                <td
                                    style={{
                                        padding: "12px 16px",
                                        border: "1px solid #E2E8F0",
                                        color: "#475569",
                                        fontWeight: 400,
                                        fontSize: "0.76rem",
                                        lineHeight: 1.45,
                                    }}
                                >
                                    {r.agency}
                                </td>
                                <td
                                    style={{
                                        padding: "12px 16px",
                                        border: "1px solid #BDE7BD",
                                        color: "#14532D",
                                        fontWeight: 700,
                                        fontSize: "0.78rem",
                                        lineHeight: 1.5,
                                    }}
                                >
                                    {r.icare}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
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
            style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)", width: "100vw", background: "#F7FFF7" }}
        >
            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: "36px clamp(16px,4vw,32px)",
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: 16,
                    alignItems: "center",
                }}
            >
                <div>
                    <h3 style={{ margin: 0, color: "#0F172A", fontWeight: 900, fontSize: "clamp(1.2rem,2.2vw,1.6rem)" }}>
                        Questions about how ICare works?
                    </h3>
                    <p style={{ margin: "6px 0 0", color: "#334155", maxWidth: "70ch" }}>
                        We’ll gladly walk you through setup, matching, and agreements — in under 10 minutes.
                    </p>
                </div>
                <a
                    href="/contact"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 10,
                        textDecoration: "none",
                        color: "#FFFFFF",
                        background: BRAND,
                        padding: ".9rem 1.35rem",
                        borderRadius: 999,
                        fontWeight: 900,
                        letterSpacing: ".02em",
                        boxShadow: "0 10px 24px rgba(2,8,23,.12)",
                        border: "1px solid rgba(31,171,31,.45)",
                    }}
                >
                    Contact us
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14" />
                        <path d="M13 5l7 7-7 7" />
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
                margin: "3.5rem auto 3.75rem",
                maxWidth: 1200,
                padding: "0 clamp(16px, 4vw, 32px)",
                fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <h2
                style={{
                    margin: 0,
                    fontWeight: 900,
                    letterSpacing: ".2px",
                    color: "#1f2a37",
                    fontSize: "clamp(1.35rem, 2.6vw, 1.9rem)",
                    lineHeight: 1.2,
                    textAlign: "left",
                }}
            >
                Cost & Savings Estimator
            </h2>
            <div
                aria-hidden="true"
                style={{
                    width: 220,
                    height: 4,
                    background: BRAND,
                    borderRadius: 999,
                    margin: ".75rem 0 1.75rem 0",
                    opacity: 0.9,
                }}
            />

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "clamp(16px, 2.4vw, 24px)",
                    alignItems: "stretch",
                }}
            >
                <form
                    onSubmit={(e) => e.preventDefault()}
                    style={{
                        border: "1px solid rgba(15,23,42,0.08)",
                        borderRadius: 16,
                        padding: "clamp(18px, 2vw, 22px)",
                        background: "#FFFFFF",
                        boxShadow: "0 10px 26px rgba(15,23,42,0.06)",
                        display: "grid",
                        gap: 14,
                    }}
                >
                    <label style={{ display: "grid", gap: 8 }}>
                        <span style={{ fontWeight: 800, color: "#1f2a37", fontSize: ".95rem" }}>Currency</span>
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            style={{ border: "1px solid rgba(15,23,42,0.18)", borderRadius: 12, padding: "12px 14px", fontSize: "1rem", outline: "none", background: "#fff" }}
                        >
                            <option value="PLN">PLN — zł</option>
                            <option value="EUR">EUR — €</option>
                            <option value="GBP">GBP — £</option>
                            <option value="USD">USD — $</option>
                        </select>
                    </label>

                    <label style={{ display: "grid", gap: 8 }}>
                        <span style={{ fontWeight: 800, color: "#1f2a37", fontSize: ".95rem" }}>Hourly rate</span>
                        <input
                            type="number"
                            value={hourly}
                            min={0}
                            step={1}
                            onChange={(e) => setHourly(Number(e.target.value || 0))}
                            style={{ border: "1px solid rgba(15,23,42,0.18)", borderRadius: 12, padding: "12px 14px", fontSize: "1rem", outline: "none" }}
                        />
                    </label>

                    <label style={{ display: "grid", gap: 8 }}>
                        <span style={{ fontWeight: 800, color: "#1f2a37", fontSize: ".95rem" }}>Hours per week</span>
                        <input
                            type="number"
                            value={hoursWeek}
                            min={0}
                            step={1}
                            onChange={(e) => setHoursWeek(Number(e.target.value || 0))}
                            style={{ border: "1px solid rgba(15,23,42,0.18)", borderRadius: 12, padding: "12px 14px", fontSize: "1rem", outline: "none" }}
                        />
                    </label>

                    <label style={{ display: "grid", gap: 8 }}>
                        <span style={{ fontWeight: 800, color: "#1f2a37", fontSize: ".95rem" }}>Agency margin (%)</span>
                        <input
                            type="number"
                            value={agencyMargin}
                            min={0}
                            max={100}
                            step={1}
                            onChange={(e) => setAgencyMargin(Number(e.target.value || 0))}
                            style={{ border: "1px solid rgba(15,23,42,0.18)", borderRadius: 12, padding: "12px 14px", fontSize: "1rem", outline: "none" }}
                        />
                    </label>

                    <div
                        style={{
                            marginTop: 4,
                            padding: "10px 12px",
                            borderRadius: 12,
                            background: "rgba(31,171,31,0.08)",
                            border: "1px solid rgba(31,171,31,0.20)",
                            color: "#1f2a37",
                            fontWeight: 700,
                            fontSize: ".95rem",
                        }}
                    >
                        ICare fee: <span style={{ color: BRAND }}>flat 10%</span> on contract
                    </div>
                </form>

                <div
                    style={{
                        border: "1px solid rgba(15,23,42,0.08)",
                        borderRadius: 16,
                        padding: "clamp(18px, 2vw, 22px)",
                        background: "#FFFFFF",
                        boxShadow: "0 10px 26px rgba(15,23,42,0.06)",
                        display: "grid",
                        gap: 14,
                    }}
                >
                    <h3 style={{ margin: 0, fontWeight: 900, color: "#1f2a37", fontSize: "clamp(1.05rem, 2vw, 1.25rem)" }}>Monthly estimate</h3>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
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
                                    borderRadius: 12,
                                    padding: "12px 14px",
                                    background: row.highlight ? "rgba(31,171,31,0.06)" : "#FFFFFF",
                                }}
                            >
                                <div style={{ fontSize: ".85rem", color: "#475569", marginBottom: 4, fontWeight: 700 }}>{row.k}</div>
                                <div style={{ fontWeight: 900, fontSize: "1.15rem", color: row.highlight ? BRAND : "#1f2a37" }}>{nf.format(row.v)}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: 6 }}>
                        <div style={{ height: 10, width: "100%", background: "#F1F5F9", borderRadius: 999, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${Math.max(0, Math.min(100, savePct)).toFixed(0)}%`, background: BRAND }} />
                        </div>
                        <div
                            style={{
                                marginTop: 6,
                                fontSize: ".92rem",
                                color: "#334155",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "baseline",
                                gap: 12,
                            }}
                        >
                            <span>Estimated savings vs agency (monthly)</span>
                            <strong style={{ color: BRAND }}>{savePct.toFixed(0)}%</strong>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ===== PAGE ===== */
export default function HowItWorks() {
    return (
        <div className={styles.page}>
            {/* HERO */}
            <section className={styles.heroWrap} aria-label="How it works hero">
                <img src={whoWeAreHeroSrc} alt="Care coordination background" className={styles.heroImg} />
                <div className={styles.heroOverlay} />

                {/* HEADER */}
                <header className={styles.headerOverlay}>
                    <Link to="/" className={styles.brand} style={{ color: "#fff", textDecoration: "none", fontWeight: 900 }}>
                        ICare
                    </Link>

                    <nav style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem 1.1rem", alignItems: "center" }}>
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
                                    color: "rgba(255,255,255,.9)",
                                    textDecoration: "none",
                                    fontSize: "clamp(.85rem, 1.2vw, .95rem)",
                                    fontWeight: 600,
                                    letterSpacing: ".01em",
                                    padding: ".2rem 0",
                                    textUnderlineOffset: "6px",
                                    transition: "color .22s ease, text-decoration-color .22s ease, text-underline-offset .22s ease",
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

                {/* HERO COPY */}
                <div
                    style={{
                        position: "relative",
                        zIndex: 10,
                        width: "min(92vw, 1100px)",
                        margin: "0 auto",
                        padding: "0 clamp(16px, 4vw, 32px)",
                        color: "#fff",
                        textAlign: "left",
                        fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                    }}
                >
                    <span
                        style={{
                            display: "inline-block",
                            marginBottom: "3.2rem",
                            marginTop: "-3.2rem",
                            fontSize: "1.12rem",
                            fontWeight: 700,
                            letterSpacing: ".12em",
                            textTransform: "uppercase",
                            color: "#EAF7EA",
                            padding: ".56rem 1.12rem",
                            borderRadius: 999,
                            background: "rgba(31,171,31,0.20)",
                            border: "2px solid rgba(31,171,31,0.45)",
                            textShadow: "0 1px 2px rgba(0,0,0,.25)",
                        }}
                    >
                        Direct Fair Transparent
                    </span>

                    <h1
                        style={{
                            margin: "0 0 2rem",
                            fontWeight: 800,
                            lineHeight: 1.05,
                            letterSpacing: ".2px",
                            fontSize: "clamp(2.2rem, 4.4vw, 3.2rem)",
                            textShadow: "0 4px 18px rgba(0,0,0,.45), 0 2px 6px rgba(0,0,0,.35)",
                            color: "#fff",
                        }}
                    >
                        How it works
                    </h1>

                    <p
                        style={{
                            margin: ".25rem 0 0",
                            lineHeight: 1.6,
                            fontSize: "clamp(1.1rem, 1.1vw, 1.125rem)",
                            color: "rgba(255,255,255,.96)",
                            textShadow: "0 2px 8px rgba(0,0,0,.35)",
                            maxWidth: "62ch",
                        }}
                    >
                        <b>Why choose ICare instead of going through an agency?</b>
                    </p>
                    <p
                        style={{
                            margin: ".35rem 0 0",
                            lineHeight: 1.6,
                            fontSize: "clamp(1.1rem, 1.2vw, 1.125rem)",
                            color: "rgba(255,255,255,.96)",
                            textShadow: "0 2px 8px rgba(0,0,0,.35)",
                            maxWidth: "62ch",
                        }}
                    >
                        <b>Unlike traditional agencies, we don’t charge high margins for matching or management.</b>
                    </p>
                    <p
                        style={{
                            margin: ".35rem 0 0",
                            lineHeight: 1.6,
                            fontSize: "clamp(1.1rem, 1.2vw, 1.125rem)",
                            color: "rgba(255,255,255,.96)",
                            textShadow: "0 2px 8px rgba(0,0,0,.35)",
                            maxWidth: "62ch",
                        }}
                    >
                        <b>That means you save money, and the caregiver earns more.</b>
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
