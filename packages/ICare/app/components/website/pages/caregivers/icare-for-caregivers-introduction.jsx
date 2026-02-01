import React from "react";

/**
 * ICare — For Caregivers: Introduction + What we're creating
 * ✅ calm / elder-like copy
 * ✅ simple 2-column editorial layout (mobile -> 1 col)
 * ✅ consistent typography with other ICare sections
 */
export default function ICareForCaregiversIntroduction() {
    const COLORS = {
        bg: "#fff",
        text: "#0F172A",
        muted: "rgba(15,23,42,0.72)",
        border: "rgba(15,23,42,0.10)",
        accent: "#61674d",
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
        fontSize: "0.95rem",
        letterSpacing: "0.10em",
        textTransform: "uppercase",
        color: COLORS.accent,
        fontWeight: 700,
    };

    const h2 = {
        margin: "0.65rem 0 0",
        fontWeight: 500,
        letterSpacing: "-0.6px",
        lineHeight: 1.14,
        fontSize: "clamp(2.05rem, 2.8vw, 2.45rem)",
        color: COLORS.text,
    };

    const lead = {
        margin: "0.85rem 0 0",
        color: COLORS.muted,
        fontWeight: 400,
        lineHeight: 1.65,
        fontSize: "1.22rem",
        maxWidth: "86ch",
    };

    const grid = {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(2.2rem, 4.2vw, 3.2rem)",
        alignItems: "start",
    };

    const sectionTitle = {
        margin: 0,
        fontWeight: 600,
        letterSpacing: "-0.25px",
        fontSize: "1.35rem",
        lineHeight: 1.25,
        color: COLORS.text,
    };

    const p = {
        margin: "0.85rem 0 0",
        fontSize: "1.15rem",
        lineHeight: 1.75,
        fontWeight: 400,
        color: "rgba(15,23,42,0.92)",
    };

    const hrSoft = {
        margin: "clamp(1.8rem, 3vw, 2.4rem) 0",
        height: 1,
        background: "rgba(15,23,42,0.10)",
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
                </header>

                {/* CONTENT */}
                <div className="icare-caregivers-intro-grid" style={grid}>
                    {/* LEFT — INTRODUCTION */}
                    <div>
                        <h3 style={sectionTitle}>Introduction</h3>

                        <p style={p}>
                            If you’re a caregiver, you know the realities of this work.
                        </p>

                        <p style={p}>
                            Short visits, changing schedules, unpaid travel time — and too often, feeling treated
                            like a task rather than a professional. Most caregivers didn’t choose this work for
                            that.
                        </p>

                        <p style={p}>
                            You chose care to support people properly, build trust, and make a real difference in
                            everyday life.
                        </p>

                        <p style={p}>
                            If that sounds familiar, ICare is being built with you in mind.
                        </p>

                        <p style={p}>
                            This page explains what we’re creating and how ICare supports independent caregivers
                            who value clarity, flexibility and respectful working relationships.
                        </p>
                    </div>

                    {/* RIGHT — WHAT WE’RE CREATING */}
                    <div>
                        <h3 style={sectionTitle}>What we’re creating</h3>

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
                            means spending real time together: conversation, routines, everyday activities and
                            reassurance.
                        </p>

                        <p style={p}>
                            We believe caregivers deserve clarity, fair conditions and direct communication with
                            families. ICare is being built to support that — calmly, transparently and with
                            respect from the start.
                        </p>
                    </div>
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
