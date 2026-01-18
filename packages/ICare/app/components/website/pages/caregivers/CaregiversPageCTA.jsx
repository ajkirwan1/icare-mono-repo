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
 * ✅ 5–7+ bullets (practical, scan-friendly)
 * ✅ Calm + informative
 * ✅ Strong titles, body 1.22rem
 * ✅ Works right under "How ICare works for caregivers"
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

    const items = [
        {
            icon: faPenNib,
            title: "A clear opening sentence",
            desc:
                "Start with who you are and the type of care you provide. One sentence is enough to set context.",
        },
        {
            icon: faBriefcase,
            title: "Relevant experience",
            desc:
                "Briefly describe your background: years of experience, conditions, etc.",
        },
        {
            icon: faClock,
            title: "Availability & schedule",
            desc:
                "Be specific about days, hours, live-in or hourly options, and any flexibility you offer.",
        },
        {
            icon: faHandHoldingHeart,
            title: "Type of care you provide",
            desc:
                "Explain what support you offer: personal care, companionship, mobility support, household help, overnight presence, or specialist care.",
        },
        {
            icon: faBan,
            title: "Boundaries & preferences",
            desc:
                "Clear boundaries prevent misunderstandings. Mention tasks you do not provide or situations you prefer to avoid.",
        },
        {
            icon: faLocationDot,
            title: "Location & travel radius",
            desc:
                "State where you are based and how far you’re willing to travel or relocate.",
        },
        {
            icon: faLanguage,
            title: "Language & communication",
            desc:
                "List the languages you speak and your level of fluency — this matters for comfort and trust.",
        },
        {
            icon: faFileCircleCheck,
            title: "References & verification",
            desc:
                "If you have references, certifications or checks available, mention them clearly so families can assess trust at a glance.",
        },
    ];

    const wrap = {
        width: "100%",
        padding: "clamp(4.6rem, 6.8vw, 6.0rem) 0",
        background: `linear-gradient(180deg, ${COLORS.bgTop} 0%, ${COLORS.bgBottom} 100%)`,
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

    const lead = {
        marginTop: "0.9rem",
        marginBottom: 0,
        fontSize: "1.22rem",
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
    };

    const card = {
        background: "rgba(255, 255, 255, 0.3)",
        border: `1px solid ${COLORS.border}`,
        borderRadius: 22,
        padding: "20px 25px 18px",
        boxShadow: "0 14px 34px rgba(15,23,42,0.06)",
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
        fontSize: "1.3rem",
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
        marginRight: -8
    };

    const iconStyle = { fontSize: 20, lineHeight: 1 };

    const desc = {
        margin: 0,
        fontSize: "1.1rem",
        lineHeight: 1.5,
        fontWeight: 400,
        color: "rgba(15,23,42,0.92)",
    };

    const note = {
        marginTop: "3rem",
        paddingTop: "clamp(14px, 2vw, 18px)",
        color: "rgba(15,23,42,0.9)",
        maxWidth: "50%"
    };

    const noteTitle = {
        margin: 0,
        fontSize: "1.25rem",
        fontWeight: 700,
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
        <section id="great-profile-section" aria-label="What makes a great caregiver profile" style={wrap}>
            <div style={{ ...divider, top: 0 }} />
            <div style={{ ...divider, bottom: 0 }} />

            <div style={container}>
                <header style={header}>
                    <h2 style={h2}>What makes a great profile</h2>
                    <p style={lead}>
                        A strong profile helps families understand you quickly and reach out
                        with confidence.<br />Think of it as a short, structured introduction —
                        clear, honest and easy to scan.
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
                    <p style={noteTitle}>Why this structure works</p>
                    <p style={noteText}>
                        Families often compare profiles quickly.<br />Clear sections reduce
                        uncertainty, speed up decisions, and lead to better-matched
                        conversations from the start.
                    </p>
                </div>
            </div>

            <style>{`
        @media (max-width: 900px){
          .icare-profile-grid{ grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    );
}
