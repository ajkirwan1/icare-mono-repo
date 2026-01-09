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
        border: "rgba(15,23,42,0.30)",
        chip: "rgba(255,255,255,0.82)",
        beige: "rgb(255, 249, 239)",
        accent: "rgb(231 153 97)",
        accent2: "rgb(119, 141, 67)",
        lightGreen: "rgb(240 247 222)",
        icon: "#111",
    };

    const wrap = {
        width: "100%",
        background: COLORS.lightGreen,
        fontFamily:
            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: COLORS.text,
        padding: "clamp(3.2rem, 4.6vw, 4.2rem) 0",
    };

    const container = {
        width: "min(92vw, 1100px)",
        margin: "0 auto",
        maxWidth: "600px"
    };

    const title = {
        color: COLORS.text,
        margin: 0,
        fontWeight: 800,
        fontSize: "2.6rem",
        color: "#0f172a",
        letterSpacing: "-0.6px",
        lineHeight: 1.14,
        fontWeight: 500
    };

    const sub = {
        margin: "0.9rem 0 0",
        maxWidth: "72ch",
        color: "#0f172a",
        fontSize: "1.4rem",
        lineHeight: 1.66,
        fontWeight: 500
    };

    const grid = {
        marginTop: "clamp(1.6rem, 2.6vw, 2.1rem)",
        display: "grid",
        gap: "clamp(12px, 1.8vw, 18px)",
        alignItems: "stretch",
        maxWidth: "600px"
    };

    const card = {
        border: `1px solid ${COLORS.border}`,
        borderRadius: 18,
        background: "white",
        padding: "32px",
        display: "grid",
        gap: 10,
    };

    const stepRow = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    };

    const stepPill = {
        display: "inline-flex",
        alignItems: "center",
        fontSize: "1.1rem",
        fontWeight: 700,
        color: COLORS.accent2,
        textTransform: "uppercase",
        borderBottom: "1px solid",
        paddingBottom: "0.5rem"
    };

    const iconWrap = {
        width: 36,
        height: 36,
        borderRadius: 16,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: COLORS.text,
        flex: "0 0 auto",
    };

    const icon = {
        fontSize: "26px"
    }

    const h3 = {
        margin: 0,
        fontWeight: 600,
        fontSize: "1.5rem",
        letterSpacing: "-0.15px",
        lineHeight: 1.25,
    };

    const p = {
        margin: 0,
        color: COLORS.step,
        lineHeight: 1.65,
        fontSize: "1.22rem",
        fontWeight: 500,
    };

    const ctaWrap = {
        marginTop: "clamp(3.6rem, 4.6vw, 4.1rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 14,
        flexWrap: "wrap",
        paddingTop: "clamp(14px, 2vw, 18px)",
        textAlign: "center"
    };

    const ctaText = {
        margin: "0 auto",
        color: '#000',
        fontWeight: 600,
        lineHeight: 1.6,
        fontSize: "1.4rem",
        maxWidth: "68ch",
        textAlign: "center"
    };

    const btn = {
        border: "none",
        borderRadius: 36, // ✅ requested feel
        background: COLORS.accent, // ✅ #b97a57
        color: "#fff",
        fontWeight: 700,
        fontSize: "1.2rem",
        padding: "18px 16px",
        cursor: "pointer",
        width: "min(260px, 88vw)", // ✅ ~30% shorter feel
        alignSelf: "center",
        transition: "filter .14s ease, background .14s ease",
        marginTop: "1.5rem"
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
                    A simple, guided flow designed to keep families calm<br />and in control from first search to
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
                                    <FontAwesomeIcon style={icon} icon={x.icon} />
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

                    <a href="#waitlist" style={{ textDecoration: "none", margin: "0 auto" }}>
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
