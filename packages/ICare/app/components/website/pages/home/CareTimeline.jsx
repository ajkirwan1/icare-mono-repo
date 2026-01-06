import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faComments, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

/**
 * ICare — How it works (3 steps)
 * ✅ calm + short + sales-friendly
 * ✅ first section after Hero
 * ✅ anchors: id="how-it-works"
 * ✅ CTA leads to #waitlist
 */

export default function HowItWorksThreeSteps() {
    const COLORS = {
        bg: "#ffffff",
        text: "#0F172A",
        muted: "rgba(15,23,42,0.72)",
        border: "rgba(15,23,42,0.10)",
        chip: "rgba(255,255,255,0.82)",
        accent: "#b97a57",
        icon: "#61674d",
    };

    const wrap = {
        width: "100%",
        background: COLORS.bg,
        fontFamily:
            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: COLORS.text,
        padding: "clamp(3.2rem, 4.6vw, 4.2rem) 0",
    };

    const container = {
        width: "min(92vw, 1100px)",
        margin: "0 auto",
    };

    const title = {
        margin: 0,
        fontWeight: 950,
        letterSpacing: "-0.45px",
        lineHeight: 1.08,
        fontSize: "clamp(1.65rem, 2.4vw, 2.05rem)",
        color: COLORS.text,
    };

    const sub = {
        margin: "0.9rem 0 0",
        maxWidth: "72ch",
        color: COLORS.muted,
        fontSize: "1.02rem",
        lineHeight: 1.7,
        fontWeight: 600,
    };

    const grid = {
        marginTop: "clamp(1.6rem, 2.6vw, 2.1rem)",
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: "clamp(12px, 1.8vw, 18px)",
        alignItems: "stretch",
    };

    const card = {
        background: COLORS.chip,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 18,
        padding: "16px 16px",
        boxShadow: "0 12px 26px rgba(15,23,42,0.06)",
        display: "grid",
        gap: 10,
    };

    const stepRow = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
    };

    const stepPill = {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 10px",
        borderRadius: 999,
        fontSize: ".82rem",
        fontWeight: 900,
        color: COLORS.text,
        background: "rgba(15,23,42,0.04)",
        border: "1px solid rgba(15,23,42,0.08)",
    };

    const iconWrap = {
        width: 38,
        height: 38,
        borderRadius: 16,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(97,103,77,0.12)",
        border: "1px solid rgba(97,103,77,0.24)",
        color: COLORS.icon,
        flex: "0 0 auto",
    };

    const h3 = {
        margin: 0,
        fontWeight: 950,
        color: COLORS.text,
        fontSize: "1.06rem",
        letterSpacing: "-0.15px",
        lineHeight: 1.25,
    };

    const p = {
        margin: 0,
        color: COLORS.muted,
        lineHeight: 1.65,
        fontSize: ".98rem",
        fontWeight: 600,
    };

    const ctaWrap = {
        marginTop: "clamp(1.6rem, 2.6vw, 2.1rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 14,
        flexWrap: "wrap",
        paddingTop: "clamp(14px, 2vw, 18px)",
        borderTop: `1px solid ${COLORS.border}`,
    };

    const ctaText = {
        margin: 0,
        color: COLORS.muted,
        fontWeight: 650,
        lineHeight: 1.6,
        fontSize: ".98rem",
        maxWidth: "68ch",
    };

    const btn = {
        border: "none",
        borderRadius: 20, // ✅ requested feel
        background: COLORS.accent, // ✅ #b97a57
        color: "#fff",
        fontWeight: 900,
        fontSize: "0.98rem",
        padding: "12px 18px",
        cursor: "pointer",
        width: "min(260px, 88vw)", // ✅ ~30% shorter feel
        alignSelf: "center",
        transition: "filter .14s ease, background .14s ease",
    };

    const onEnter = (e) => {
        e.currentTarget.style.filter = "brightness(1.06)";
    };
    const onLeave = (e) => {
        e.currentTarget.style.filter = "brightness(1)";
    };

    return (
        <section id="how-it-works" aria-label="How ICare works" style={wrap}>
            <div style={container}>
                <h2 style={title}>How ICare works</h2>
                <p style={sub}>
                    A simple, guided flow designed to keep families calm and in control — from first search to
                    starting care.
                </p>

                <div className="hiwGrid" style={grid}>
                    {[
                        {
                            n: "Step 1",
                            icon: faMagnifyingGlass,
                            t: "Browse and compare carers",
                            d: "See clear profiles, availability and support — so you can shortlist with confidence.",
                        },
                        {
                            n: "Step 2",
                            icon: faComments,
                            t: "Message and agree the details",
                            d: "Talk directly and confirm tasks, hours, start date and expectations — in one place.",
                        },
                        {
                            n: "Step 3",
                            icon: faCircleCheck,
                            t: "Start care with clarity",
                            d: "Begin support knowing what’s agreed. No agency pressure — just a clear arrangement.",
                        },
                    ].map((x) => (
                        <div key={x.t} style={card}>
                            <div style={stepRow}>
                                <span style={stepPill}>{x.n}</span>
                                <span style={iconWrap} aria-hidden="true">
                                    <FontAwesomeIcon icon={x.icon} />
                                </span>
                            </div>

                            <h3 style={h3}>{x.t}</h3>
                            <p style={p}>{x.d}</p>
                        </div>
                    ))}
                </div>

                <div style={ctaWrap}>
                    <p style={ctaText}>
                        Want early access in your area? Join the waiting list — we’ll notify you when ICare opens
                        near you.
                    </p>

                    <a href="#waitlist" style={{ textDecoration: "none" }}>
                        <button type="button" style={btn} onMouseEnter={onEnter} onMouseLeave={onLeave}>
                            Join the waiting list
                        </button>
                    </a>
                </div>
            </div>

            <style>{`
        @media (max-width: 920px){
          .hiwGrid{ grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    );
}
