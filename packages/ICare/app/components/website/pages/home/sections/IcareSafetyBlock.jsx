import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdBadge, faUserCheck, faShieldHalved } from "@fortawesome/free-solid-svg-icons";

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
                    <strong style={{ fontWeight: 500 }}>Photo ID</strong> and{" "}
                    <strong style={{ fontWeight: 500 }}>Right to Work</strong> are required before a profile becomes visible.
                </>
            ),
            image: "/images/web/homepage/id.png",
            alt: "Identity verification documents",
        },
        {
            icon: faUserCheck,
            title: "Relevant experience",
            desc: (
                <>
                    Carers with <strong style={{ fontWeight: 500 }}>references</strong> and appropriate{" "}
                    <strong style={{ fontWeight: 500 }}>experience</strong>, with references shown where available.
                </>
            ),
            image: "/images/web/homepage/interview.png",
            alt: "Caregiver helping at home",
        },
        {
            icon: faShieldHalved,
            title: "Checks shown where applicable",
            desc: (
                <>
                    <strong style={{ fontWeight: 500 }}>DBS</strong> and{" "}
                    <strong style={{ fontWeight: 500 }}>insurance</strong> are displayed when provided and relevant —
                    depending on location and the nature of support.
                </>
            ),
            image: "/images/web/homepage/confirmeddocs.png",
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
        background: "rgba(255, 249, 239, 0.85)",
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
        fontWeight: 600,
        letterSpacing: "-0.6px",
        lineHeight: 1.14,
        fontSize: "2.4rem",
        color: COLORS.text,
    };

    const h2 = {
        margin: 0,
        marginTop: "8px",
        fontWeight: 500,
        letterSpacing: "-0.35px",
        lineHeight: 1.25,
        fontSize: "clamp(1.25rem, 1.8vw, 1.45rem)",
        color: COLORS.text,
    };

    const leadStyle = {
        margin: "0.35rem 0 0.5rem",
        color: "rgba(15,23,42,1)",
        fontSize: "1.05rem",
        lineHeight: 1.65,
        fontWeight: 400,
        maxWidth: "55ch",
    };

    const grid = {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "clamp(14px, 1.9vw, 18px)",
        alignItems: "stretch",
        margin: "0 -18px",
    };

    const cardBase = {
        padding: "16px",
        display: "grid",
        gap: 10,
        minHeight: 300,
        alignContent: "flex-start",
    };

    const cardText = {
        display: "flex",
        flexDirection: "column",
    };

    const title = {
        margin: 0,
        fontWeight: 500,
        fontSize: "1.15rem",
        color: COLORS.text,
        lineHeight: 1.25,
        letterSpacing: "-0.1px",
    };

    const desc = {
        margin: "0 0 0.25rem",
        color: "rgba(0, 0, 0, 0.85)",
        fontWeight: 400,
        lineHeight: 1.55,
        fontSize: "1.05rem",
        paddingTop: "0.75rem",
    };

    const thumbWrap = {
        marginBottom: 6,
        borderRadius: 16,
        overflow: "hidden",
        background: "rgba(15,23,42,0.03)",
        aspectRatio: "16 / 9",
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
                    <h2 style={h2}>A safer way to start companionship at home</h2>

                    <p style={leadStyle}>
                        Trust in home care depends on clear standards, not assumptions.
                        <br />
                        ICare uses defined verification steps covering identity, right to work and relevant background
                        information.
                    </p>
                </div>

                <div className="icare-safety-3boxes" style={grid}>
                    {boxes.map((b) => (
                        <div key={b.title} style={cardBase}>

                            {/* IMAGE FIRST */}
                            <div style={thumbWrap}>
                                <img
                                    src={b.image}
                                    alt={b.alt}
                                    style={thumb}
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                />
                            </div>

                            {/* TEXT */}
                            <div style={cardText}>
                                <h3 style={title}>{b.title}</h3>
                                <p style={desc}>{b.desc}</p>
                            </div>

                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @media (max-width: 980px){
                    .icare-safety-3boxes{
                        grid-template-columns: 1fr 1fr !important;
                        margin: 0 !important;
                    }
                }
                @media (max-width: 640px){
                    .icare-safety-3boxes{
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </section>
    );
}
