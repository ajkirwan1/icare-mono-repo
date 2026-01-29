import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faIdCard,
    faComments,
    faCalendarCheck,
    faScaleBalanced,
} from "@fortawesome/free-solid-svg-icons";

export default function HowICareWorksForCaregiversSystem() {
    const COLORS = {
        bgTop: "rgba(167,182,129,0.20)",
        bgBottom: "rgba(255,249,239,0.92)",
        text: "#0F172A",
        muted: "rgba(15,23,42,0.55)",
        border: "rgba(15,23,42,0.10)",
        olive: "#61674d",
    };

    const steps = [
        {
            step: "01",
            icon: faIdCard,
            title: "Create a clear caregiver profile",
            desc: "Introduce yourself, your care experience and availability.",
            image:
                "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=1200&q=80",
            alt: "Photo ID and profile details for verification",
        },
        {
            step: "02",
            icon: faComments,
            title: "Speak directly with families",
            desc: "Message families directly to discuss care needs.",
            image:
                "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
            alt: "Caregiver and family talking at home",
        },
        {
            step: "03",
            icon: faCalendarCheck,
            title: "Agree schedules and expectations",
            desc: "Agree hours, tasks and start dates upfront.",
            image:
                "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=1200&q=80",
            alt: "Planning schedules and expectations",
        },
        {
            step: "04",
            icon: faScaleBalanced,
            title: "Work within a fairer system",
            desc: "Care is organised transparently, with clear fees.",
            image:
                "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80",
            alt: "Fair and balanced care system",
        },
    ];

    const stepCardImageWrap = {
        marginTop: "1rem",
        borderRadius: 18,
        overflow: "hidden",
        background: "rgba(15,23,42,0.03)",
        border: `1px solid ${COLORS.border}`,
        aspectRatio: "16 / 10",
    };

    const stepCardImage = {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
    };

    return (
        <section
            id="how-it-works"
            aria-label="How ICare works for caregivers"
            style={{
                width: "100%",
                padding: "clamp(4rem, 7vw, 5rem) 0",
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
                            fontSize: "1.4rem",
                            lineHeight: 1.65,
                            fontWeight: 400,
                        }}
                    >
                        A clearer way to organise care - built around transparency,
                        autonomy and mutual respect.
                    </p>
                </header>

                {/* STEPS GRID */}
                <div className="icare-caregivers-steps-grid">
                    {steps.map((s) => (
                        <div
                            key={s.step}
                            style={{
                                borderRadius: 22,
                                padding: "20px 10px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            <div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "flex-start",
                                        marginBottom: "0.6rem",
                                    }}
                                >
                                    <h3
                                        style={{
                                            margin: "0.4rem 0 0",
                                            fontSize: "1.5rem",
                                            fontWeight: 500,
                                            paddingRight: "20px",
                                            lineHeight: 1.3,
                                        }}
                                    >
                                        {s.title}
                                    </h3>

                                </div>

                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: "1.2rem",
                                        lineHeight: 1.6,
                                        fontWeight: 400,
                                    }}
                                >
                                    {s.desc}
                                </p>
                            </div>

                            <div style={stepCardImageWrap}>
                                <img
                                    src={s.image}
                                    alt={s.alt}
                                    style={stepCardImage}
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
              .icare-caregivers-steps-grid{
                display: grid;
                grid-template-columns: repeat(4, minmax(0, 1fr));
                gap: 20px;
                align-items: stretch;
                margin: 0 -8px;
              }

              @media (max-width: 860px){
                .icare-caregivers-steps-grid{
                  grid-template-columns: 1fr !important;
                }
              }
            `}</style>
        </section>
    );
}
