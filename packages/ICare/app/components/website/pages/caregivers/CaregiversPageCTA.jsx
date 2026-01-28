import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPenNib,
    faBriefcase,
    faClock,
    faHandHoldingHeart,
    faBan,
    faLocationDot,
    faLanguage,
    faFileCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

/**
 * ICare — What makes a great profile (mini-guide)
 * ✅ 8 bullets (scan-friendly)
 * ✅ Elder-like: short, factual, no coaching tone
 * ✅ Layout untouched (only copy)
 */
export default function WhatMakesAGreatProfile() {
    const COLORS = {
        bgTop: "rgba(167,182,129,0.18)",
        bgBottom: "rgba(255,249,239,0.92)",
        text: "#0F172A",
        muted: "rgba(15,23,42,0.62)",
        border: "rgba(15,23,42,0.10)",
        cardBg: "rgba(255,255,255,0.92)",
        olive: "#61674d",
    };

    // ✅ Elder-like: short titles + 1 sentence each
    const items = [
        {
            icon: faPenNib,
            title: "Opening line",
            desc: "Who you are and the type of care you offer.",
        },
        {
            icon: faBriefcase,
            title: "Experience",
            desc: "Your background, years in care and relevant conditions.",
        },
        {
            icon: faClock,
            title: "Availability",
            desc: "Days, hours, live-in or hourly, and any flexibility.",
        },
        {
            icon: faHandHoldingHeart,
            title: "Care you provide",
            desc: "Personal care, companionship, mobility, household help and nights.",
        },
        {
            icon: faBan,
            title: "Boundaries",
            desc: "Tasks you don’t do and situations you avoid.",
        },
        {
            icon: faLocationDot,
            title: "Location",
            desc: "Where you’re based and how far you can travel or relocate.",
        },
        {
            icon: faLanguage,
            title: "Languages",
            desc: "Languages spoken and level of fluency.",
        },
        {
            icon: faFileCircleCheck,
            title: "References & checks",
            desc: "References, checks and insurance shown where available.",
        },
    ];

    const wrap = {
        width: "100%",
        padding: "clamp(4.6rem, 6.8vw, 6.0rem) 0",
        background: "#fff9ef",
        color: COLORS.text,
        fontFamily:
            "Nunito, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        position: "relative",
    };

    const divider = {
        position: "absolute",
        left: 0,
        right: 0,
        height: 1,
        background: COLORS.border,
    };

    const container = {
        width: "min(96vw, 1240px)",
        margin: "0 auto",
        padding: "0 clamp(18px, 3.2vw, 34px)",
    };

    const header = {
        maxWidth: "82ch",
        marginBottom: "clamp(1.8rem, 3.2vw, 2.4rem)",
    };

    const h2 = {
        margin: 0,
        fontWeight: 500,
        letterSpacing: "-0.6px",
        lineHeight: 1.14,
        fontSize: "clamp(2.1rem, 2.9vw, 2.5rem)",
    };

    // ✅ Shorter + less bloggy
    const lead = {
        marginTop: "0.9rem",
        marginBottom: 0,
        fontSize: "1.4rem",
        lineHeight: 1.65,
        fontWeight: 400,
        color: COLORS.text,
        maxWidth: "78ch",
    };

    const grid = {
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        gap: "clamp(14px, 1.9vw, 18px)",
        alignItems: "stretch",
        margin: "0 -25px",
    };

    const card = {
        padding: "0px 30px 0 20px",
        marginTop: "20px",
        marginBottom: "20px",
        display: "grid",
        gap: 10,
    };

    const topRow = {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12,
    };

    const title = {
        margin: 0,
        fontSize: "1.35rem",
        fontWeight: 600,
        lineHeight: 1.25,
        letterSpacing: "-0.15px",
        color: COLORS.text,
    };

    const iconWrap = {
        width: 34,
        height: 34,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: COLORS.olive,
        opacity: 0.92,
        flex: "0 0 auto",
        marginTop: -3,
        marginRight: -8,
    };

    const iconStyle = { fontSize: 20, lineHeight: 1 };

    const desc = {
        margin: 0,
        fontSize: "1.2rem",
        lineHeight: 1.5,
        fontWeight: 400,
        color: "rgba(15,23,42,0.92)",
    };

    // ✅ Elder-like note: 1 line, not a mini essay
    const note = {
        marginTop: "3rem",
        paddingTop: "clamp(14px, 2vw, 18px)",
        color: "rgba(15,23,42,0.9)",
        maxWidth: "50%",
    };

    const noteTitle = {
        margin: 0,
        fontSize: "1.4rem",
        fontWeight: 600,
        letterSpacing: "-0.1px",
    };

    const noteText = {
        margin: "0.5rem 0 0",
        fontSize: "1.25rem",
        lineHeight: 1.6,
        fontWeight: 400,
        color: COLORS.text,
    };

    return (
        <section
            id="great-profile-section"
            aria-label="What makes a great caregiver profile"
            style={wrap}
        >
            <div style={{ ...divider, top: 0 }} />
            <div style={{ ...divider, bottom: 0 }} />

            <div style={container}>
                <header style={header}>
                    <h2 style={h2}>What makes a great profile</h2>
                    <p style={lead}>
                        A clear profile helps families understand fit quickly and contact you with confidence.
                    </p>
                </header>

                <div className="icare-profile-grid" style={grid}>
                    {items.map((x) => (
                        <article key={x.title} style={card}>
                            <div style={topRow}>
                                <h3 style={title}>{x.title}</h3>
                                <span style={iconWrap} aria-hidden="true">
                                    <FontAwesomeIcon icon={x.icon} style={iconStyle} />
                                </span>
                            </div>
                            <p style={desc}>{x.desc}</p>
                        </article>
                    ))}
                </div>

                <div style={note}>
                    <p style={noteTitle}>Why this works?</p>
                    <p style={noteText}>
                        Clear sections make profiles faster to compare and easier to trust.
                    </p>
                </div>
            </div>

            <style>{`
              .icare-profile-grid > article {
                border-right: 1px solid rgba(15,23,42,0.4);
              }

              .icare-profile-grid > article:nth-child(4n) {
                border-right: none;
              }

              @media (max-width: 900px){
                .icare-profile-grid{
                  grid-template-columns: 1fr !important;
                }

                .icare-profile-grid > article {
                  border-right: none;
                }
              }
            `}</style>
        </section>
    );
}
