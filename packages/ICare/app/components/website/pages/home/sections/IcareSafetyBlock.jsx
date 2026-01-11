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
        text: "#0F172A",
        muted: "rgba(15,23,42,0.72)",
        olive: "#61674d",
    };

    const boxes = [
        {
            icon: faIdBadge,
            title: "Identity & eligibility",
            desc: "Photo ID and Right to Work required",
            image:
                "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=1200&h=900&q=75",
            alt: "Identity verification documents",
        },
        {
            icon: faUserCheck,
            title: "Relevant experience",
            desc: "Carers with references and appropriate experience",
            image:
                "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=1200&h=900&q=75",
            alt: "Caregiver helping at home",
        },
        {
            icon: faShieldHalved, // ✅ fixed
            title: "Checks where applicable",
            desc: "DBS and insurance shown when available (depends on location and documents).",
            image:
                "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&h=900&q=75",
            alt: "Safety checks and protection",
        },
    ];

    const wrap = {
        position: "relative",
        width: "100%",
        fontFamily:
            "Nunito, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: COLORS.text,
        padding: "clamp(4.3rem, 6.0vw, 5.6rem) 0",
        background: `linear-gradient(180deg, ${COLORS.sectionBgTop} 0%, ${COLORS.sectionBgBottom} 100%)`,
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
        fontWeight: 800,
        letterSpacing: "-0.35px",
        lineHeight: 1.25,
        fontSize: "clamp(1.25rem, 1.8vw, 1.45rem)",
        color: COLORS.text,
    };

    const leadStyle = {
        margin: "0.35rem 0 0",
        color: "rgba(15,23,42,1)",
        fontSize: "1.22rem",
        lineHeight: 1.65,
        fontWeight: 500,
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
        borderRadius: 20,
        padding: "clamp(16px, 2.1vw, 22px)",
        boxShadow: "0 14px 34px rgba(15,23,42,0.06)",
        display: "grid",
        gap: 10,
        minHeight: 280,
    };

    const topRow = {
        display: "flex",
        alignItems: "center",
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
        fontSize: "18px",
        lineHeight: 1,
    };

    const title = {
        margin: 0,
        fontWeight: 900,
        fontSize: "1.25rem",
        color: COLORS.text,
        lineHeight: 1.2,
        letterSpacing: "-0.15px",
    };

    const desc = {
        margin: 0,
        color: "rgba(15,23,42,0.86)",
        fontWeight: 600,
        lineHeight: 1.55,
        fontSize: "1.02rem",
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
                                    <FontAwesomeIcon style={icon} icon={b.icon} />
                                </span>
                                <h3 style={title}>{b.title}</h3>
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
