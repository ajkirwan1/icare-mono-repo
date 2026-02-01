import React from "react";
import VideoSection from "../../common/sections/VideoSection";

export default function HowICareWorksForCaregiversSystem() {
    const COLORS = {
        bgTop: "rgba(167,182,129,0.20)",
        bgBottom: "rgba(255,249,239,0.92)",
        text: "#0F172A",
        muted: "rgba(15,23,42,0.60)",
        border: "rgba(15,23,42,0.10)",
        accent: "#61674d", // olive accent
    };

    const steps = [
        {
            no: "01",
            title: "Create your profile",
            desc: "Tell us about your experience and availability.",
        },
        {
            no: "02",
            title: "Get matched",
            desc: "Families contact you directly.",
        },
        {
            no: "03",
            title: "Start working together",
            desc: "Agree details and begin.",
        },
    ];

    return (
        <section
            id="how-it-works"
            aria-label="How ICare works for caregivers"
            style={{
                width: "100%",
                padding: "clamp(4rem, 7vw, 5.4rem) 0",
                background: `linear-gradient(180deg, ${COLORS.bgTop} 0%, ${COLORS.bgBottom} 100%)`,
                fontFamily:
                    "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                color: COLORS.text,
                position: "relative",
            }}
        >
            {/* separators */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: COLORS.border,
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: COLORS.border,
                }}
            />

            <div style={{ width: "min(96vw, 1240px)", margin: "0 auto" }}>
                {/* HEADER */}
                <header style={{ maxWidth: "78ch", marginBottom: "2.6rem" }}>
                    <h2
                        style={{
                            margin: 0,
                            fontWeight: 500,
                            letterSpacing: "-0.6px",
                            lineHeight: 1.14,
                            fontSize: "clamp(2.25rem, 3vw, 2.6rem)",
                        }}
                    >
                        How ICare works for caregivers
                    </h2>

                    <p
                        style={{
                            marginTop: "0.9rem",
                            fontSize: "1.35rem",
                            lineHeight: 1.65,
                            fontWeight: 400,
                            color: COLORS.TEXT,
                        }}
                    >
                        A clearer way to organise care — built around transparency,
                        autonomy and mutual respect.
                    </p>
                </header>

                {/* VIDEO + STEPS */}
                <div
                    className="icare-caregivers-video-steps"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1.1fr 1fr",
                        gap: "clamp(2.6rem, 5vw, 4.2rem)",
                        alignItems: "center",
                    }}
                >
                    {/* LEFT — VIDEO */}
                    <div
                        style={{
                            borderRadius: 26,
                            overflow: "hidden",
                            boxShadow: "0 14px 34px rgba(15,23,42,0.18)",
                            background: "rgba(255,255,255,0.6)",
                        }}
                    >
                        <VideoSection videoSrc="images/web/icare-for-caregivers/voice.mp4" />
                    </div>

                    {/* RIGHT — STEPS */}
                    <div style={{ maxWidth: "46ch" }}>
                        <ol
                            style={{
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                                display: "grid",
                                gap: "1.9rem",
                            }}
                        >
                            {steps.map((s) => (
                                <li
                                    key={s.no}
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "auto 1fr",
                                        gap: "1.2rem",
                                        alignItems: "flex-start",
                                    }}
                                >
                                    {/* NUMBER */}
                                    <div
                                        style={{
                                            fontSize: "1.1rem",
                                            fontWeight: 700,
                                            color: COLORS.accent,
                                            letterSpacing: "0.04em",
                                            lineHeight: 1,
                                            marginTop: "0.35rem",
                                        }}
                                    >
                                        {s.no}
                                    </div>

                                    {/* TEXT */}
                                    <div>
                                        <h3
                                            style={{
                                                margin: 0,
                                                fontSize: "1.45rem",
                                                fontWeight: 500,
                                                letterSpacing: "-0.2px",
                                                lineHeight: 1.3,
                                            }}
                                        >
                                            {s.title}
                                        </h3>

                                        <p
                                            style={{
                                                marginTop: ".35rem",
                                                marginBottom: 0,
                                                fontSize: "1.15rem",
                                                lineHeight: 1.6,
                                                fontWeight: 400,
                                                color: COLORS.TEXT,
                                            }}
                                        >
                                            {s.desc}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>

            {/* RESPONSIVE */}
            <style>{`
        @media (max-width: 960px){
          .icare-caregivers-video-steps{
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </section>
    );
}
