import React from "react";

export default function CaregiverStepsEmpathy() {
    const steps = [
        {
            t: "Tell us about yourself",
            d: "Your skills, experience and availability help families understand who you are.",
            img: "/images/steps/profile-small.jpg",
        },
        {
            t: "Complete your checks",
            d: "Upload your ID, references and documents safely. We're here to guide you.",
            img: "/images/steps/checks-small.jpg",
        },
        {
            t: "Start talking to families",
            d: "Families reach out when your profile feels right. Ask questions, take your time.",
            img: "/images/steps/messages-small.jpg",
        },
        {
            t: "Agree the details together",
            d: "You decide the hours, responsibilities and rate — openly and without pressure.",
            img: "/images/steps/agreement-small.jpg",
        },
        {
            t: "Begin supporting someone",
            d: "Your care makes a real difference. Update availability anytime.",
            img: "/images/steps/support-small.jpg",
        },
    ];

    return (
        <section
            id="caregiver-steps"
            aria-label="Caregiver steps"
            style={{
                margin: "5rem auto",
                width: "min(760px, 92vw)",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            {/* HEADER */}
            <header style={{ textAlign: "center", marginBottom: "2.8rem" }}>
                <h2
                    style={{
                        margin: 0,
                        fontWeight: 800,
                        fontSize: "clamp(1.8rem,2.3vw,2.2rem)",
                        letterSpacing: "-0.35px",
                        color: "#0F172A",
                        lineHeight: 1.15,
                    }}
                >
                    We guide you every step of the way
                </h2>

                <p
                    style={{
                        marginTop: ".6rem",
                        color: "#475569",
                        fontSize: "1.05rem",
                        lineHeight: 1.55,
                    }}
                >
                    A simple, supportive process — designed for real caregivers.
                </p>
            </header>

            {/* LIST OF STEPS */}
            <div style={{ display: "grid", gap: "1.9rem" }}>
                {steps.map((s, i) => (
                    <div
                        key={i}
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 130px",
                            gap: "1.4rem",
                            alignItems: "center",
                            padding: "16px 0",
                            borderBottom: "1px solid rgba(0,0,0,0.08)",
                        }}
                    >
                        {/* LEFT SIDE — NUMBER + TEXT */}
                        <div>
                            {/* BIG NUMBER */}
                            <div
                                style={{
                                    fontSize: "2.4rem",
                                    fontWeight: 800,
                                    color: "rgba(18,96,18,0.8)",
                                    marginBottom: ".4rem",
                                    lineHeight: 1,
                                }}
                            >
                                {i + 1}
                            </div>

                            {/* TITLE */}
                            <h3
                                style={{
                                    margin: "0 0 .25rem",
                                    fontSize: "1.15rem",
                                    fontWeight: 750,
                                    color: "#0F172A",
                                }}
                            >
                                {s.t}
                            </h3>

                            {/* DESCRIPTION — shorter & warmer */}
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: ".98rem",
                                    color: "#475569",
                                    lineHeight: 1.48,
                                }}
                            >
                                {s.d}
                            </p>
                        </div>

                        {/* RIGHT SIDE — SMALL IMAGE */}
                        <figure
                            style={{
                                margin: 0,
                                width: "100%",
                                height: "100px",
                                borderRadius: "14px",
                                overflow: "hidden",
                                border: "1px solid rgba(0,0,0,0.06)",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                            }}
                        >
                            <img
                                src={s.img}
                                alt=""
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </figure>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div style={{ textAlign: "center", marginTop: "2.8rem" }}>
                <a
                    href="/register"
                    style={{
                        display: "inline-flex",
                        padding: "0.9rem 1.9rem",
                        borderRadius: 999,
                        background: "#126012",
                        color: "#fff",
                        fontSize: "1rem",
                        fontWeight: 750,
                        textDecoration: "none",
                        letterSpacing: ".01em",
                        transition: "background .25s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#147414")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#126012")}
                >
                    Create your free account
                </a>
            </div>
        </section>
    );
}
