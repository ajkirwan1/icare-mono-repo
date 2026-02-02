import React from "react";
import VideoSection from "../../../common/sections/VideoSection";

export function OurImpactSection() {
    const items = [
        {
            title: "Transparent care choices",
            desc: "Clear caregiver profiles show experience, availability and care style before any conversation begins.",
        },
        {
            title: "Direct communication",
            desc: "Families and caregivers speak directly, without intermediaries shaping decisions.",
        },
        {
            title: "Fair, clear expectations",
            desc: "Care details, schedules and rates are agreed openly between families and caregivers.",
        },
        {
            title: "Freedom on both sides",
            desc: "Caregivers choose who they work with. Families choose who they welcome into their home.",
        },
    ];

    const BG = "#ecddd18c";
    const TEXT = "#000";

    const section = {
        width: "100%",
        background: BG,
        padding: "clamp(4.4rem, 7vw, 6.2rem) 0",
        fontFamily:
            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    };

    const wrap = {
        width: "min(1180px, 92vw)",
        margin: "0 auto",
    };

    const header = {
        maxWidth: "1100px",
        marginBottom: "clamp(2.2rem, 4vw, 3rem)",
    };

    const h2 = {
        margin: 0,
        fontWeight: 500,
        fontSize: "clamp(2rem, 3vw, 2.4rem)",
        color: TEXT,
        letterSpacing: "-0.35px",
        lineHeight: 1.12,
    };

    const lead = {
        marginTop: "1.1rem",
        marginBottom: 0,
        fontSize: "clamp(1.08rem, 1.4vw, 1.22rem)",
        lineHeight: 1.65,
        color: "rgba(0,0,0,0.9)",
        fontWeight: 400,
    };

    const grid = {
        display: "grid",
        gridTemplateColumns: "1fr 1.1fr",
        gap: "clamp(2.2rem, 4.5vw, 4rem)",
        alignItems: "start",
    };

    const listWrap = {
        maxWidth: "58ch",
    };

    const itemWrap = (isLast) => ({
        paddingBottom: "1.2rem",
        borderBottom: isLast ? "none" : "1px solid rgba(0,0,0,0.18)",
    });

    const itemTitle = {
        margin: 0,
        fontSize: "1.18rem",
        fontWeight: 600,
        letterSpacing: "-0.15px",
        color: TEXT,
    };

    const itemDesc = {
        marginTop: ".35rem",
        marginBottom: 0,
        fontSize: "1.08rem",
        lineHeight: 1.55,
        color: "rgba(0,0,0,0.88)",
        fontWeight: 400,
    };

    const mediaCard = {
        borderRadius: 28,
        overflow: "hidden",
        background: "rgba(255,255,255,0.55)",
    };

    return (
        <section id="impact" aria-label="Our impact" style={section}>
            <div style={wrap}>
                {/* HEADER (FULL WIDTH) */}
                <header style={header}>
                    <h2 style={h2}>Our approach is built on a few simple principles</h2>
                    <p style={lead}>
                        Care is personal and changes over time.

                        <br />
                        ICare helps families and caregivers connect with clarity and calm while keeping decisions where they belong: with people.
                    </p>
                </header>

                {/* CONTENT (LEFT LIST / RIGHT VIDEO) */}
                <div className="impact-grid" style={grid}>
                    <div style={listWrap}>
                        <div style={{ display: "grid", gap: "1.6rem" }}>
                            {items.map((item, i) => (
                                <div key={item.title} style={itemWrap(i === items.length - 1)}>
                                    <h3 style={itemTitle}>{item.title}</h3>
                                    <p style={itemDesc}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div style={mediaCard}>
                            <VideoSection videoSrc="images/web/who-we-are/who-we-are.mp4" />
                        </div>
                    </div>
                </div>

                {/* RESPONSIVE */}
                <style>{`
          @media (max-width: 960px){
            #impact .impact-grid{
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
            </div>
        </section>
    );
}
