import React from "react";
import styles from "@styles/components/website/pages/who-we-are/sections/fourth-section.module.scss";

export function OurImpactSection() {
    const metrics = [
        {
            n: "2.3×",
            l: "Faster Matching",
            d: "From first contact to confirmed start date"
        },
        {
            n: "94%",
            l: "5-Star Feedback",
            d: "From families & caregivers who matched successfully"
        },
        {
            n: "−18%",
            l: "Lower Total Cost",
            d: "Compared to traditional care agencies"
        },
        {
            n: "100%",
            l: "Profiles Verified",
            d: "Every caregiver verified by ID and references"
        }
    ];

    return (
        <section
            id="impact"
            aria-label="Impact metrics — ICare dashboard edition"
            style={{
                width: "min(1100px,92vw)",
                margin: "7rem auto",
                padding: "0 clamp(16px,3vw,28px)",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            {/* HEADER */}
            <h2
                style={{
                    margin: 0,
                    fontWeight: 900,
                    fontSize: "clamp(2rem,2.7vw,2.4rem)",
                    letterSpacing: "-0.4px",
                    color: "#0F172A",
                    lineHeight: 1.14,
                }}
            >
                Our Impact
            </h2>

            <p
                style={{
                    margin: "1rem 0 2.8rem",
                    color: "#475569",
                    maxWidth: "60ch",
                    fontSize: "1.12rem",
                    lineHeight: 1.65,
                }}
            >
                We measure what matters — safer matches, fairer pay, and faster starts.
            </p>

            {/* GRID */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))",
                    gap: "4rem 3rem",
                    paddingTop: "2.6rem",
                    borderTop: "1px solid rgba(15,23,42,0.06)",
                    position: "relative",
                }}
            >
                {metrics.map((m, i) => (
                    <div
                        key={m.l}
                        style={{
                            display: "grid",
                            gap: "0.7rem",
                            paddingLeft: "0.4rem",
                            paddingRight: "0.4rem",
                            position: "relative",
                            animation: `impactFade .8s ease forwards`,
                            animationDelay: `${i * 0.12}s`,
                            opacity: 0,
                            transform: "translateY(16px)"
                        }}
                    >
                        {/* ICON — UNIQUE FOR EACH KPI */}
                        {/* ICON CONTAINER */}
                        <div
                            style={{
                                width: 56,
                                height: 56,
                                borderRadius: 18,
                                background: "rgba(31,171,31,0.07)",
                                border: "1px solid rgba(31,171,31,0.14)",
                                display: "grid",
                                placeItems: "center",
                                marginBottom: "0.6rem",
                                backdropFilter: "blur(2px)",
                            }}
                        >
                            {/* UNIQUE ICONS */}
                            {i === 0 && (
                                // ⚡ Faster Matching
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                                    stroke="#1FAB1F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="9" />
                                    <path d="M12 7v5l3 2" />
                                    <path d="M8 3l2 2" />
                                </svg>
                            )}

                            {i === 1 && (
                                // ★ Feedback
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                                    stroke="#1FAB1F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 4l2.4 4.8 5.3.7-3.9 3.8.9 5.3L12 16.6l-4.7 2.5.9-5.3-3.9-3.8 5.3-.7L12 4z" />
                                </svg>
                            )}

                            {i === 2 && (
                                // ↓ Cost Reduction
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                                    stroke="#1FAB1F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="9" />
                                    <path d="M12 8v8" />
                                    <path d="M9 13l3 3 3-3" />
                                </svg>
                            )}

                            {i === 3 && (
                                // 🛡 Verification
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                                    stroke="#1FAB1F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6z" />
                                    <path d="M9.5 12.5l2 2 4-4" />
                                </svg>
                            )}
                        </div>

                        {/* NUMBER */}
                        <div
                            style={{
                                fontWeight: 900,
                                fontSize: "clamp(2.4rem,3.5vw,3rem)",
                                letterSpacing: "-0.45px",
                                color: "#0F172A",
                                lineHeight: 1,
                            }}
                        >
                            {m.n}
                        </div>

                        {/* LABEL */}
                        <div
                            style={{
                                fontSize: "1.08rem",
                                fontWeight: 700,
                                color: "#1E293B",
                            }}
                        >
                            {m.l}
                        </div>

                        {/* DESCRIPTION */}
                        <p
                            style={{
                                margin: 0,
                                fontSize: ".97rem",
                                color: "#475569",
                                lineHeight: 1.58,
                                maxWidth: "48ch",
                            }}
                        >
                            {m.d}
                        </p>

                        {/* VERTICAL SEPARATOR (desktop only) */}
                        {i < metrics.length - 1 && (
                            <div
                                style={{
                                    position: "absolute",
                                    right: "-1.5rem",
                                    top: "8%",
                                    bottom: "8%",
                                    width: "1px",
                                    background: "rgba(15,23,42,0.08)",
                                    display: "none",
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>

            <style>{`
        @keyframes impactFade {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @media (min-width: 860px) {
            #impact div[style*="position: relative"] > div[style*="height:"] + div[style*="position: absolute"] {
                display: block !important;
            }
        }
    `}</style>
        </section>

    );
}
