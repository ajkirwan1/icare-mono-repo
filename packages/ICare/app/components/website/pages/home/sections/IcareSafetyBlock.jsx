import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faIdBadge,
    faUserCheck,
    faShieldHalved, // ✅ zamiast faShieldCheck
} from "@fortawesome/free-solid-svg-icons";

export default function SafetyComesFirstThreeBoxes() {
    const COLORS = {
        sectionBgTop: "rgba(167,182,129,0.20)",
        sectionBgBottom: "rgba(255,249,239,0.90)",
        boxBg: "#ffffff",
        border: "rgba(15,23,42,0.10)",
        text: "#000000ff",
        muted: "rgba(15,23,42,0.72)",
        olive: "#61674d",
    };

    const boxes = [
        {
            icon: faIdBadge,
            title: "Identity & eligibility",
            desc: (
                <>
                    <strong style={{ fontWeight: 600 }}>Photo ID</strong> and <strong style={{ fontWeight: 600 }}>Right to Work</strong> required before a profile becomes visible.
                </>
            ),
            image:
                "/images/web/homepage/id.png",
            alt: "Identity verification documents",
        },
        {
            icon: faUserCheck,
            title: "Relevant experience",
            desc: (
                <>
                    Carers with <strong style={{ fontWeight: 600 }}>references</strong> and appropriate{" "}
                    <strong style={{ fontWeight: 600 }}>experience</strong>, with references shown where available.
                </>
            ),
            image:
                "/images/web/homepage/interview.png",
            alt: "Caregiver helping at home",
        },
        {
            icon: faShieldHalved,
            title: "Checks where applicable",
            desc: (
                <>
                    <strong style={{ fontWeight: 600 }}>DBS</strong> and <strong style={{ fontWeight: 600 }}>insurance</strong> displayed when provided and relevant
                    - depending on location and the nature of care.
                </>
            ),
            image:
                "/images/web/homepage/confirmeddocs.png",
            alt: "Safety checks and protection",
        },
    ];

    const wrap = {
        position: "relative",
        width: "100%",
        fontFamily:
            "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: COLORS.text,
        padding: "clamp(3.1rem, 5vw, 4rem) 0",
        background: "rgba(236, 221, 209, 0.55)",
    };

    const dividerTop = {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        background: "rgba(15,23,42,0.10)",
    };

    const dividerBottom = {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 1,
        background: "rgba(15,23,42,0.10)",
    };

    const container = {
        position: "relative",
        width: "min(92vw, 1100px)",
        margin: "0 auto",
    };

    const header = {
        display: "grid",
        gap: 10,
        margin: "0 0 clamp(22px, 3.2vw, 34px)",
        maxWidth: "78ch",
        textAlign: "left",
    };

    const h1 = {
        margin: 0,
        fontWeight: 500,
        letterSpacing: "-0.6px",
        lineHeight: 1.14,
        fontSize: "clamp(2.25rem, 3vw, 2.6rem)",
        color: COLORS.text,
    };

    const h2 = {
        margin: 0,
        marginTop: "8px",
        fontWeight: 600,
        letterSpacing: "-0.35px",
        lineHeight: 1.25,
        fontSize: "clamp(1.25rem, 1.8vw, 1.45rem)",
        color: COLORS.text,
    };

    const leadStyle = {
        margin: "0.35rem 0 1.5rem",
        color: "rgba(15,23,42,1)",
        fontSize: "1.35rem",
        lineHeight: 1.65,
        fontWeight: 400,
        maxWidth: "50ch",
    };

    const grid = {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "clamp(14px, 1.9vw, 18px)",
        alignItems: "stretch",
    };

    const cardBase = {
        padding: "18px",
        display: "grid",
        gap: 6,
        minHeight: 280,
    };

    const topRow = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
    };

    // ✅ icons: no background, no border
    const iconWrap = {
        width: 30,
        height: 30,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: COLORS.olive,
        flex: "0 0 auto",
    };

    const icon = {
        fontSize: "20px",
        lineHeight: 1,
    };

    const title = {
        margin: 0,
        fontWeight: 600,
        fontSize: "1.4rem",
        color: COLORS.text,
        lineHeight: 1.2,
        letterSpacing: "-0.15px",
    };

    const desc = {
        margin: "0 0 1rem",
        color: "rgba(0, 0, 0, 0.86)",
        fontWeight: 400,
        lineHeight: 1.55,
        fontSize: "1.25rem",
        paddingTop: "1rem"
    };

    // ✅ taller ratio so image isn't a wide banner
    const thumbWrap = {
        marginTop: 10,
        borderRadius: 16,
        overflow: "hidden",
        background: "rgba(15,23,42,0.03)",
        aspectRatio: "4 / 3",
    };

    const thumb = {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
    };

    return (
        <section aria-label="Safety comes first" style={wrap}>
            <div style={dividerTop} />
            <div style={dividerBottom} />

            <div style={container}>
                <div style={header}>
                    <h1 style={h1}>Safety comes first</h1>
                    <h2 style={h2}>A safer way to start home care</h2>
                    <p style={leadStyle}>
                        Trust in home care depends on clear standards, not assumptions.<br />
                        ICare operates with defined verification requirements covering identity, right to work and relevant background information.
                        <br /><br />Profiles are made visible only once these foundations are met, ensuring consistency and accountability across the platform.
                        This approach helps families make informed choices while giving caregivers a fair, accurate way to present their experience.
                    </p>
                </div>

                <div className="icare-safety-3boxes" style={grid}>
                    {boxes.map((b) => (
                        <div key={b.title} style={cardBase}>
                            <div style={topRow}>
                                <h3 style={title}>{b.title}</h3>
                                <span style={iconWrap} aria-hidden="true">
                                    <FontAwesomeIcon style={icon} icon={b.icon} />
                                </span>
                            </div>

                            <p style={desc}>{b.desc}</p>

                            <div style={thumbWrap}>
                                <img
                                    src={b.image}
                                    alt={b.alt}
                                    style={thumb}
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        @media (max-width: 980px){
          .icare-safety-3boxes{ grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px){
          .icare-safety-3boxes{ grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    );
}
