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
                padding: "clamp(5rem, 8vw, 7rem) 0",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: "0 clamp(20px,5vw,40px)",
                }}
            >
                <h2
                    style={{
                        margin: 0,
                        fontWeight: 800,
                        color: "#0F172A",
                        fontSize: "clamp(2.2rem,3vw,2.5rem)", // +15% większy
                        letterSpacing: ".25px",
                        textAlign: "left",
                        lineHeight: 1.25,
                        animation: "fadeUp 1s ease both",
                    }}
                >
                    Get started in 3 quick steps
                </h2>

                {/* Odstęp pod tytułem */}
                <div style={{ height: "clamp(2.8rem,5vw,4rem)" }} />

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
                        gap: "clamp(32px,3.5vw,48px)",
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
                                padding: "clamp(32px,3vw,44px)",
                                boxShadow: "0 10px 26px rgba(15,23,42,.05)",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                                textAlign: "left",
                                minHeight: 240,
                                opacity: 0,
                                transform: "translateY(18px)",
                                animation: `fadeCard 0.8s ease ${0.3 + i * 0.2}s forwards`, // 👈 opóźnienie kaskadowe
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
                                        fontSize: "clamp(1.1rem,1.7vw,1.3rem)",
                                        color: "#0F172A",
                                        letterSpacing: ".25px",
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
                                    fontSize: "clamp(.95rem,1vw,1.05rem)",
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
                        marginTop: "clamp(40px,3vw,56px)",
                        flexWrap: "wrap",
                    }}
                >
                    <a
                        href="/register"
                        style={{
                            textDecoration: "none",
                            color: "#FFFFFF",
                            background: "rgb(76, 120, 101)",
                            padding: "1.1rem 1.8rem",
                            borderRadius: 999,
                            fontWeight: 800,
                            letterSpacing: ".03em",
                            boxShadow: "0 12px 28px rgba(31,171,31,.15)",
                            border: "1px solid rgba(31,171,31,.4)",
                            animation: "pulseGlow 3s ease-in-out infinite", // 💫 pulsujący efekt
                        }}
                    >
                        CREATE YOUR FREE ACCOUNT
                    </a>
                </div>
            </div>

            <style>{`
    @keyframes fadeUp {
      from {
        opacity: 0;
        transform: translateY(12px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeCard {
      from {
        opacity: 0;
        transform: translateY(18px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes pulseGlow {
      0% {
        box-shadow: 0 0 0 rgba(31,171,31,0.2);
        transform: scale(1);
      }
      50% {
        box-shadow: 0 0 20px rgba(31,171,31,0.35);
        transform: scale(1.015);
      }
      100% {
        box-shadow: 0 0 0 rgba(31,171,31,0.2);
        transform: scale(1);
      }
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
                background: "linear-gradient(180deg, #F9FAF9 0%, #FFFFFF 100%)",
                borderTop: "1px solid rgba(15,23,42,0.06)",
                borderBottom: "1px solid rgba(15,23,42,0.06)",
                padding: "clamp(5rem,7vw,6.5rem) clamp(24px,6vw,60px)",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <div
                style={{
                    maxWidth: 1100,
                    margin: "0 auto",
                    animation: "fadeUp 1s ease both",
                }}
            >
                <h2
                    style={{
                        margin: 0,
                        fontWeight: 800,
                        color: "#0F172A",
                        fontSize: "clamp(2rem,3vw,2.6rem)",
                        letterSpacing: ".25px",
                        textAlign: "left",
                        lineHeight: 1.25,
                    }}
                >
                    Why choose <span style={{ color: "rgb(76, 120, 101)" }}>ICare</span> instead of an agency?
                </h2>

                <p
                    style={{
                        margin: "1rem 0 2.6rem",
                        color: "#475569",
                        maxWidth: "62ch",
                        lineHeight: 1.75,
                        fontSize: "1.15rem",
                        fontWeight: "600",
                    }}
                >
                    Fair, transparent and direct — families and caregivers connect without hidden fees or intermediaries.
                </p>

                <div
                    style={{
                        overflowX: "auto",
                        borderRadius: 24,
                        boxShadow: "0 12px 32px rgba(15,23,42,0.06)",
                    }}
                >
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            fontSize: "clamp(.9rem,1vw,1rem)",
                            borderRadius: 20,
                            overflow: "hidden",
                        }}
                    >
                        <thead>
                            <tr>
                                <th
                                    style={{
                                        textAlign: "left",
                                        padding: "18px 22px",
                                        background: "#F8FAFC",
                                        borderBottom: "2px solid #E2E8F0",
                                        color: HEAD_NEUTRAL,
                                        fontWeight: 800,
                                        fontSize: "1.1rem",
                                    }}
                                >
                                    Feature
                                </th>
                                <th
                                    style={{
                                        textAlign: "left",
                                        padding: "18px 22px",
                                        background: "#FEF2F2",
                                        borderBottom: "2px solid #FECACA",
                                        color: HEAD_AGENCY,
                                        fontWeight: 700,
                                        fontSize: "1.1rem",
                                    }}
                                >
                                    Typical Agency
                                </th>
                                <th
                                    style={{
                                        textAlign: "left",
                                        padding: "18px 22px",
                                        background: "linear-gradient(90deg, rgba(31,171,31,0.08), rgba(31,171,31,0.18))",
                                        borderBottom: `2px solid ${BRAND}`,
                                        color: BRAND,
                                        fontWeight: 800,
                                        fontSize: "1.1rem",
                                    }}
                                >
                                    ICARE
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {rows.map((r, idx) => (
                                <tr
                                    key={r.k}
                                    style={{
                                        background: idx % 2 === 0 ? "#FFFFFF" : "#F7F9F7",
                                        transition: "background 0.3s ease",
                                    }}
                                >
                                    <td
                                        style={{
                                            padding: "14px 20px",
                                            borderBottom: "1px solid #E2E8F0",
                                            color: "#1F2937",
                                            fontWeight: 600,
                                            fontSize: ".95rem",
                                            lineHeight: 1.5,
                                        }}
                                    >
                                        {r.k}
                                    </td>
                                    <td
                                        style={{
                                            padding: "14px 20px",
                                            borderBottom: "1px solid #E2E8F0",
                                            color: "#7F1D1D",
                                            fontWeight: 500,
                                            fontSize: ".9rem",
                                        }}
                                    >
                                        {r.agency}
                                    </td>
                                    <td
                                        style={{
                                            padding: "14px 20px",
                                            borderBottom: "1px solid rgba(31,171,31,.15)",
                                            color: "#14532D",
                                            fontWeight: 700,
                                            fontSize: ".95rem",
                                        }}
                                    >
                                        {r.icare}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (hover: hover) {
          table tbody tr:hover td {
            background: rgba(31,171,31,0.05);
          }
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
