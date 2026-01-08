import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faUserCheck, faShieldHalved } from "@fortawesome/free-solid-svg-icons";

export default function SafetyComesFirstThreeBoxes() {
    const COLORS = {
        sectionBg: "#f7e7d952",
        boxBg: "#0f172a12",
        border: "rgba(15,23,42,0.10)",
        text: "#0F172A",
        muted: "rgba(15,23,42,0.72)",
        accent: "#b97a57",
        olive: "#61674d",
        oliveBg: "rgba(97,103,77,0.10)",
    };

    const boxes = [
        {
            icon: faIdCard,
            title: "Identity & eligibility",
            desc: "Photo ID and Right to Work required",
        },
        {
            icon: faUserCheck,
            title: "Relevant experience",
            desc: "Carers with references and appropriate experience",
        },
        {
            icon: faShieldHalved,
            title: "Checks where applicable",
            desc: "DBS and insurance shown when available (depends on location and documents).",
        },
    ];

    const wrap = {
        position: "relative",
        width: "100%",
        fontFamily:
            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: COLORS.text,
        padding: "clamp(4.3rem, 6.0vw, 5.6rem) 0",
        background: COLORS.sectionBg,
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

    // ✅ H1 10% smaller
    const h1 = {
        margin: 0,
        fontWeight: 950,
        letterSpacing: "-0.55px",
        lineHeight: 1.12,
        fontSize: "clamp(2.16rem, 2.52vw, 2.52rem)",
        color: COLORS.text,
    };

    const h2 = {
        margin: 0,
        marginTop: "10px",
        fontWeight: 900,
        letterSpacing: "-0.35px",
        lineHeight: 1.25,
        fontSize: "clamp(1.35rem, 1.8vw, 1.4rem)",
        color: COLORS.text,
    };

    const leadStyle = {
        margin: "0.25rem 0 0",
        color: COLORS.text,
        fontSize: "1.1rem",
        lineHeight: 1.65,
        fontWeight: 650,
        maxWidth: "78ch",
    };

    const grid = {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "clamp(14px, 1.9vw, 18px)",
        alignItems: "stretch",
    };

    const cardBase = {
        background: COLORS.boxBg,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 18,
        padding: "clamp(16px, 2.1vw, 20px)",
        boxShadow: "0 14px 34px rgba(15,23,42,0.06)",
        display: "grid",
        gap: 10,
        minHeight: 192,
    };

    const topRow = {
        display: "flex",
        alignItems: "center",
        gap: 12,
    };

    const iconWrap = {
        width: 44,
        height: 44,
        borderRadius: 16,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: COLORS.olive,
        background: COLORS.oliveBg,
        border: "1px solid rgba(97,103,77,0.18)",
        flex: "0 0 auto",
        fontSize: "1.05rem",
    };

    const title = {
        margin: 0,
        fontWeight: 900,
        fontSize: "1.265rem",
        color: COLORS.text,
        lineHeight: 1.2,
    };

    const desc = {
        margin: 0,
        color: COLORS.text,
        fontWeight: 650,
        lineHeight: 1.55,
        fontSize: "1.0rem",
    };

    return (
        <section aria-label="Safety comes first" style={wrap}>
            <div style={container}>
                <div style={header}>
                    <h1 style={h1}>Safety comes first</h1>
                    <h2 style={h2}>A safer way to start home care</h2>
                    <p style={leadStyle}>
                        Once you’ve chosen your path, it helps to know what “verified” really means. ICare
                        publishes profiles only when key details are in place — so families can reach out
                        with confidence and caregivers can be understood clearly from day one.
                    </p>
                </div>

                <div className="icare-safety-3boxes" style={grid}>
                    {boxes.map((b) => (
                        <div key={b.title} style={cardBase}>
                            <div style={topRow}>
                                <span style={iconWrap} aria-hidden="true">
                                    <FontAwesomeIcon icon={b.icon} />
                                </span>
                                <h3 style={title}>{b.title}</h3>
                            </div>

                            <p style={desc}>{b.desc}</p>
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
