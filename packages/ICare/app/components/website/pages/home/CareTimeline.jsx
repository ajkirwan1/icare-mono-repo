import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faComments, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

/**
 * ICare — How it works (3 steps)
 * ✅ new layout: 3 columns desktop, 2 columns tablet (last spans), 1 column mobile
 * ✅ same background + CTA button style
 * ✅ ONLY: "Step 1/2/3" labels 20% bigger
 */
export default function HowItWorksThreeSteps() {
    const COLORS = {
        bg: "#ffffff",
        text: "#0F172A",
        muted: "rgba(15,23,42,0.72)",
        border: "rgba(15,23,42,0.30)",
        accent: "rgb(221, 139, 79)",
        accent2: "rgb(119, 141, 67)",
    };

    const wrap = {
        width: "100%",
        background: "#f2f2f2", // ✅ CHANGED: new background
        fontFamily:
            "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: COLORS.text,
        padding: "clamp(3.2rem, 4.6vw, 4.2rem) 0",
    };

    const container = {
        width: "min(92vw, 1100px)",
        margin: "0 auto",
    };

    const header = {
        maxWidth: "1000px",
        margin: "0 auto",
        textAlign: "center",
    };

    const title = {
        margin: 0,
        fontSize: "2.4rem",
        letterSpacing: "-0.6px",
        lineHeight: 1.14,
        fontWeight: 500,
        color: "#0f172a",
    };

    const sub = {
        margin: "0.9rem auto 0",
        maxWidth: "72ch",
        color: "#0f172a",
        fontSize: "1.4rem",
        lineHeight: 1.66,
        fontWeight: 400,
    };

    const grid = {
        marginTop: "clamp(1.8rem, 3vw, 2.4rem)",
        display: "grid",
        gap: "clamp(14px, 2vw, 22px)",
        alignItems: "stretch",
    };

    const card = {
        borderRadius: 18,
        padding: "clamp(18px, 2.4vw, 26px)",
        background: "rgba(255, 255, 255, 0.86)",
        display: "grid",
        gap: 12,

    };

    const top = {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12,
    };

    const stepPill = {
        display: "inline-flex",
        alignItems: "center",
        fontSize: "1.4rem", // ✅ was 0.98rem (+20%)
        fontWeight: 400,
        paddingBottom: "0.45rem",
        whiteSpace: "nowrap",
    };

    const iconWrap = {
        width: 42,
        height: 42,
        borderRadius: 18,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: COLORS.text,
        flex: "0 0 auto",
    };

    const icon = { fontSize: "20px" };

    const h3 = {
        margin: 0,
        fontWeight: 700,
        fontSize: "1.2rem",
        lineHeight: 1.25,
        color: "rgb(167 87 27)"
    };

    const p = {
        margin: 0,
        color: COLORS.text,
        lineHeight: 1.65,
        fontSize: "1.1rem",
        fontWeight: 400,
    };

    const ctaWrap = {
        marginTop: "clamp(3.0rem, 4.2vw, 3.8rem)",
        display: "grid",
        justifyItems: "center",
        gap: 14,
        paddingTop: "clamp(14px, 2vw, 18px)",
        textAlign: "center",
    };

    const ctaText = {
        margin: 0,
        color: "#000",
        fontWeight: 500,
        lineHeight: 1.6,
        fontSize: "1.4rem",
        maxWidth: "80ch",
        textAlign: "center",
    };

    const btn = {
        borderRadius: 36,
        color: "white",
        borderWidth: "3px",
        borderStyle: "solid",
        borderColor: COLORS.accent,
        backgroundColor: "rgb(221, 139, 79)",
        fontWeight: 400,
        fontSize: "1.2rem",
        padding: "10px 12px",
        cursor: "pointer",
        width: "min(240px, 88vw)",
        alignSelf: "center",
        transition: "filter .14s ease, background .14s ease",
        marginTop: "1rem",
    };

    const onEnter = (e) => {
        e.currentTarget.style.filter = "brightness(1.06)";
    };
    const onLeave = (e) => {
        e.currentTarget.style.filter = "brightness(1)";
    };

    const steps = [
        {
            n: "1",
            icon: faMagnifyingGlass,
            t: "Browse and compare carers",
            d: "See clear profiles, availability and support - so you can shortlist with confidence.",
        },
        {
            n: "2",
            icon: faComments,
            t: "Message and agree the details",
            d: "Talk directly and confirm tasks, hours, start date and expectations - in one place.",
        },
        {
            n: "3",
            icon: faCircleCheck,
            t: "Start care with clarity",
            d: "Begin support knowing what’s agreed. No agency pressure - just a clear arrangement.",
        },
    ];

    return (
        <section id="how-it-works" aria-label="How ICare works" style={wrap}>
            <div style={container}>
                <div style={header}>
                    <h2 style={title}>What makes ICare different from agencies</h2>
                    <p style={sub}>
                        A calmer path through a big decision with clear steps and no pressure.
                    </p>
                </div>

                <div className="hiwGrid" style={grid}>
                    {steps.map((x) => (
                        <div key={x.t} className="hiwCard" style={card}>
                            <h3 style={h3}>{x.t}</h3>
                            <p style={p}>{x.d}</p>
                        </div>
                    ))}
                </div>

                <div style={ctaWrap}>
                    <p style={ctaText}>
                        Want early access in your area?<br />Join the waiting list - we’ll notify you when ICare opens near you.
                    </p>

                    <a href="#waitlist" style={{ textDecoration: "none" }}>
                        <button type="button" style={btn} onMouseEnter={onEnter} onMouseLeave={onLeave}>
                            Join the waiting list
                        </button>
                    </a>
                </div>
            </div>

            <style>{`
        /* Desktop: 3 columns */
        .hiwGrid{ grid-template-columns: repeat(3, 1fr); }

        /* Tablet: 2 columns, last card spans full width */
        @media (max-width: 980px){
          .hiwGrid{ grid-template-columns: repeat(2, 1fr) !important; }
          .hiwCard:last-child{ grid-column: 1 / -1; }
        }

        /* Mobile: 1 column */
        @media (max-width: 640px){
          .hiwGrid{ grid-template-columns: 1fr !important; }
          .hiwCard:last-child{ grid-column: auto; }
        }
      `}</style>
        </section>
    );
}
