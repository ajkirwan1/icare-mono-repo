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
 * ✅ Smaller titles + smaller desc, black text
 * ✅ Icons on the LEFT (same pattern as icare-types-grid)
 * ✅ No right-border lines
 * ✅ Spójne spacing/typography z ICareTypesOfCareSEO
 */
export default function WhatMakesAGreatProfile() {
    const TEXT = "#0F172A";
    const ICON = "#dd8b4f"; // spójnie z ICareTypesOfCareSEO (możesz zmienić na #61674d jeśli wolisz olive)

    const items = [
        { icon: faPenNib, title: "Opening line", desc: "Who you are and the type of care you offer." },
        { icon: faBriefcase, title: "Experience", desc: "Your background, years in care and relevant conditions." },
        { icon: faClock, title: "Availability", desc: "Days, hours, live-in or hourly, and any flexibility." },
        { icon: faHandHoldingHeart, title: "Care you provide", desc: "Personal care, companionship, mobility, household help and nights." },
        { icon: faBan, title: "Boundaries", desc: "Tasks you don’t do and situations you avoid." },
        { icon: faLocationDot, title: "Location", desc: "Where you’re based and how far you can travel or relocate." },
        { icon: faLanguage, title: "Languages", desc: "Languages spoken and level of fluency." },
        { icon: faFileCircleCheck, title: "References & checks", desc: "References, checks and insurance shown where available." },
    ];

    const COLORS = {
        border: "rgba(15,23,42,0.10)",
    };

    const wrap = {
        width: "100%",
        padding: "clamp(4.2rem, 6.2vw, 5.6rem) 0",
        background: "#fff9ef",
        color: TEXT,
        fontFamily:
            "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
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
        width: "min(92vw, 1100px)",
        margin: "0 auto",
    };

    const header = {
        maxWidth: "78ch",
        display: "grid",
        gap: 0,
        margin: "0 0 clamp(26px, 3.8vw, 42px)",
        padding: 0,
        textAlign: "left",
    };

    const h2 = {
        margin: 0,
        padding: 0,
        fontWeight: 500,
        letterSpacing: "-0.6px",
        lineHeight: 1.14,
        fontSize: "clamp(2.05rem, 2.8vw, 2.4rem)",
        color: TEXT,
    };

    const lead = {
        margin: "12px 0 0",
        padding: 0,
        color: TEXT,
        fontWeight: 500,
        lineHeight: 1.65,
        fontSize: "1.25rem",
        maxWidth: "78ch",
    };

    // grid podobny do .icare-types-grid
    const grid = {
        marginTop: "clamp(22px, 3.2vw, 34px)",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "clamp(18px, 2.2vw, 26px)",
        alignItems: "stretch",
    };

    // item podobny do item w types
    const item = {
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
        padding: "18px 0",
        height: "100%",
        alignSelf: "stretch",
    };

    const iconWrap = {
        width: 30,
        height: 38,
        display: "inline-flex",
        alignItems: "start",
        justifyContent: "center",
        color: ICON,
        flex: "0 0 auto",
        marginTop: 2,
    };

    const iconStyle = { fontSize: "22px", lineHeight: 1 };

    const content = { display: "flex", flexDirection: "column", gap: 6, minWidth: 0 };

    // mniejsze nagłówki
    const title = {
        margin: 0,
        padding: 0,
        fontWeight: 600,
        letterSpacing: "-0.15px",
        color: TEXT,
        fontSize: "1.12rem",
        lineHeight: 1.4,
        whiteSpace: "normal",
        overflow: "visible",
    };

    // mniejszy opis + czarny
    const desc = {
        margin: 0,
        color: TEXT,
        fontWeight: 400,
        lineHeight: 1.6,
        fontSize: "1.02rem",
        whiteSpace: "normal",
        overflow: "visible",
    };

    const note = {
        marginTop: "clamp(26px, 4vw, 44px)",
        paddingTop: "clamp(14px, 2vw, 18px)",
        borderTop: "1px solid rgba(15,23,42,0.10)",
        color: TEXT,
        maxWidth: "78ch",
    };

    const noteTitle = {
        margin: 0,
        fontSize: "1.15rem",
        fontWeight: 600,
        letterSpacing: "-0.1px",
        color: TEXT,
    };

    const noteText = {
        margin: "0.55rem 0 0",
        fontSize: "1.05rem",
        lineHeight: 1.65,
        fontWeight: 400,
        color: TEXT,
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
                <div style={header}>
                    <h2 style={h2}>What makes a great profile</h2>
                    <p style={lead}>
                        A clear profile helps families understand fit quickly and contact you with confidence.
                    </p>
                </div>

                <div className="icare-profile-types-grid" style={grid}>
                    {items.map((x) => (
                        <div key={x.title} className="icare-profile-types-item" style={item}>
                            <span style={iconWrap} aria-hidden="true">
                                <FontAwesomeIcon icon={x.icon} style={iconStyle} />
                            </span>
                            <div style={content}>
                                <h3 style={title}>{x.title}</h3>
                                <p style={desc}>{x.desc}</p>
                            </div>
                        </div>
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
        @media (max-width: 1020px){
          .icare-profile-types-grid{ grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px){
          .icare-profile-types-grid{ grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    );
}
