import React from "react";

/**
 * ICare — For Caregivers: Introduction + What we're creating
 * ✅ calm / elder-like copy
 * ✅ simple 2-column editorial layout (mobile -> 1 col)
 * ✅ minimal but more readable (cards + chips + subtle accents)
 */
export default function ICareForCaregiversIntroduction() {
    const COLORS = {
        bg: "#fff",
        text: "#0F172A",
        muted: "rgba(15,23,42,0.72)",
        border: "rgba(15,23,42,0.10)",
        borderStrong: "rgba(15,23,42,0.14)",
        accent: "#61674d",
        accentSoft: "rgba(97,103,77,0.14)",
        card: "rgba(221, 139, 79,0.06)",
    };

    const wrap = {
        width: "100%",
        padding: "clamp(4rem, 6vw, 5rem) 0",
        background: COLORS.bg,
        fontFamily:
            "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: COLORS.text,
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
    };

    const header = {
        maxWidth: "92ch",
        marginBottom: "clamp(1.6rem, 2.8vw, 2.4rem)",
    };

    const kicker = {
        margin: 0,
        fontSize: "0.92rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: COLORS.accent,
        fontWeight: 800,
    };

    const h2 = {
        margin: "0.65rem 0 0",
        fontWeight: 520,
        letterSpacing: "-0.6px",
        lineHeight: 1.14,
        fontSize: "clamp(2.05rem, 2.8vw, 2.45rem)",
        color: COLORS.text,
    };

    const lead = {
        margin: "0.85rem 0 0",
        fontWeight: 400,
        lineHeight: 1.65,
        fontSize: "1.18rem",
        maxWidth: "86ch",
    };

    const chipsRow = {
        marginTop: "1.05rem",
        display: "flex",
        flexWrap: "wrap",
        gap: "0.55rem",
    };

    const chip = {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.55rem",
        padding: "0.55rem 0.85rem",
        borderRadius: 999,
        border: `1px solid ${COLORS.border}`,
        background: "rgba(255,255,255,0.72)",
        fontSize: "0.98rem",
        color: "rgba(15,23,42,0.92)",
        letterSpacing: "-0.01em",
        fontWeight: 520,
    };

    const dot = {
        width: 9,
        height: 9,
        borderRadius: 999,
        background: COLORS.accent,
        boxShadow: `0 0 0 4px ${COLORS.accentSoft}`,
    };

    const grid = {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(1.3rem, 2.6vw, 1.9rem)",
        alignItems: "stretch",
    };

    const card = {
        border: `1px solid ${COLORS.border}`,
        background: COLORS.card,
        borderRadius: 18,
        padding: "clamp(1.25rem, 2.4vw, 1.75rem)",
        boxShadow: "0 14px 40px rgba(15,23,42,0.06)",
        position: "relative",
        overflow: "hidden",
    };

    // tiny top accent line (very subtle)
    const cardTopAccent = {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background:
            "linear-gradient(90deg, rgba(97,103,77,0.55), rgba(97,103,77,0.08))",
    };

    const sectionTitleRow = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        marginBottom: "0.15rem",
    };

    const sectionTitle = {
        margin: 0,
        fontWeight: 600,
        letterSpacing: "-0.25px",
        fontSize: "1.28rem",
        lineHeight: 1.25,
        color: COLORS.text,
    };

    const sectionRule = {
        marginTop: "0.75rem",
        height: 1,
        background: COLORS.borderStrong,
        border: "none",
    };

    const p = {
        margin: "0.85rem 0 0",
        fontSize: "1.12rem",
        lineHeight: 1.75,
        fontWeight: 400,
        color: "rgba(15,23,42,0.92)",
    };

    const highlight = {
        marginTop: "1.05rem",
        padding: "1.5rem",
        borderRadius: 14,
        border: `1px solid rgba(221, 139, 79, 0.5)`,
        background: "rgba(255,255,255,0.7)",
        fontSize: "1.1rem",
        fontWeight: "500",
        lineHeight: 1.6,
    };

    const hrSoft = {
        margin: "clamp(1.2rem, 2.2vw, 1.6rem) 0",
        height: 1,
        background: COLORS.border,
        border: "none",
    };

    return (
        <section id="caregivers-introduction" aria-label="Caregivers introduction" style={wrap}>
            <div style={{ ...divider, top: 0 }} />
            <div style={{ ...divider, bottom: 0 }} />

            <div style={container}>
                {/* HEADER */}
                <header style={header}>
                    <h2 style={h2}>Built for independent care work</h2>
                    <p style={lead}>
                        ICare is being built to support caregivers who value clarity, flexibility and respectful
                        working relationships — with families, directly.
                    </p>

                    {/* ✅ small scan-friendly chips (minimal but adds structure) */}
                    <div style={chipsRow} aria-label="Key benefits">
                        <span style={chip}>
                            <span style={dot} aria-hidden="true" />
                            Direct communication
                        </span>
                        <span style={chip}>
                            <span style={dot} aria-hidden="true" />
                            Clear expectations
                        </span>
                        <span style={chip}>
                            <span style={dot} aria-hidden="true" />
                            Respectful matches
                        </span>
                    </div>
                </header>

                {/* CONTENT */}
                <div className="icare-caregivers-intro-grid" style={grid}>
                    {/* LEFT — INTRODUCTION */}
                    <article style={card}>
                        <div style={sectionTitleRow}>
                            <h3 style={sectionTitle}>Introduction</h3>
                        </div>
                        <hr style={sectionRule} />

                        <p style={p}>If you’re a caregiver, you know the realities of this work.</p>

                        <p style={p}>
                            Short visits, changing schedules, unpaid travel time — and too often, feeling treated
                            like a task rather than a professional. Most caregivers didn’t choose this work for that.
                        </p>

                        <p style={p}>
                            You chose care to support people properly, build trust, and make a real difference in
                            everyday life.
                        </p>

                        <div style={highlight}>
                            ICare is being built for caregivers who want calm, direct working relationships — with clarity from the start.
                        </div>

                    </article>

                    {/* RIGHT — WHAT WE’RE CREATING */}
                    <article style={card}>

                        <div style={sectionTitleRow}>
                            <h3 style={sectionTitle}>What we’re creating</h3>
                        </div>
                        <hr style={sectionRule} />

                        <p style={p}>
                            ICare is a platform for caregivers who value quality and human connection.
                        </p>

                        <p style={p}>
                            It’s not a traditional care agency, and it’s not a basic job board. ICare gives you
                            space to build your own independent practice — with control over your availability,
                            who you work with, and how care is agreed.
                        </p>

                        <hr style={hrSoft} />

                        <p style={p}>
                            We’re starting with companionship support, where presence and trust matter most. This
                            means spending real time together: conversation, routines, everyday activities and reassurance.
                        </p>

                        <div style={highlight}>
                            Clarity, fair conditions and direct communication — built in by default.
                        </div>

                    </article>
                </div>
            </div>

            <style>{`
        @media (max-width: 960px){
          .icare-caregivers-intro-grid{
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </section>
    );
}
