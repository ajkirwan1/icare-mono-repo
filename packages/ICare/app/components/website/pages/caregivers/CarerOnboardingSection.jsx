import React from "react";

export default function CarerOnboardingSection() {
    const steps = [
        {
            title: "Create your profile",
            desc: "Add your bio, experience, skills and a clear profile photo.",
        },
        {
            title: "Upload required documents",
            desc: "ID, Right to Work, DBS (if available), certificates and references.",
        },
        {
            title: "Verification",
            desc: "Our team checks your documents and profile quality to keep the platform safe.",
        },
        {
            title: "Go live",
            desc: "Families can now discover your profile and contact you directly.",
        },
    ];

    return (
        <section
            aria-label="Carer Onboarding Flow"
            style={{
                marginLeft: "calc(50% - 50vw)",
                marginRight: "calc(50% - 50vw)",
                width: "100vw",
                background: "#FAF8F5",
                borderTop: "1px solid #e8e4df",
                borderBottom: "1px solid #e8e4df",
                padding: "72px 0", // 🔹 40% smaller
                fontFamily: "Inter, system-ui",
            }}
        >
            <div
                style={{
                    maxWidth: 1280,
                    margin: "0 auto",
                    padding: "0 clamp(18px,4vw,40px)", // 🔹 smaller padding
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "clamp(28px,4vw,50px)", // 🔹 40% smaller
                    alignItems: "center",
                }}
            >
                {/* LEFT — TEXT */}
                <div style={{ paddingRight: "1vw" }}>
                    <h2
                        style={{
                            margin: 0,
                            fontWeight: 800,
                            color: "#1A1A1A",
                            fontSize: "clamp(1.6rem,2.2vw,2.1rem)", // 🔹 smaller
                            lineHeight: 1.15,
                            letterSpacing: "-0.4px",
                        }}
                    >
                        <span style={{ display: "block" }}>Simple onboarding.</span>
                        <span style={{ display: "block" }}>Designed for real caregivers.</span>
                    </h2>

                    <p
                        style={{
                            marginTop: "1rem",
                            maxWidth: "50ch",
                            fontSize: "0.95rem", // 🔹 smaller
                            lineHeight: 1.65,
                            color: "#4A4A4A",
                        }}
                    >
                        Join the platform in just a few steps. Once verified, families can
                        reach out directly — no agencies, no intermediaries, no deductions.
                    </p>

                    {/* LIST OF STEPS */}
                    <div
                        style={{
                            marginTop: "1.6rem",
                            display: "grid",
                            gap: "1rem", // 🔹 tighter
                        }}
                    >
                        {steps.map((s, i) => (
                            <div
                                key={s.title}
                                style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 10,
                                }}
                            >
                                {/* STEP NUMBER ICON */}
                                <div
                                    style={{
                                        width: 26,
                                        height: 26,
                                        borderRadius: "50%",
                                        background: "rgba(185,122,87,0.12)",
                                        border: "1px solid rgba(185,122,87,0.28)",
                                        color: "#A67A63",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: 700,
                                        fontSize: "0.85rem",
                                        flexShrink: 0,
                                    }}
                                >
                                    {i + 1}
                                </div>

                                <div>
                                    <h3
                                        style={{
                                            margin: 0,
                                            fontSize: "1.05rem", // 🔹 smaller
                                            fontWeight: 700,
                                            color: "#1A1A1A",
                                        }}
                                    >
                                        {s.title}
                                    </h3>
                                    <p
                                        style={{
                                            margin: ".2rem 0 0",
                                            fontSize: "0.92rem",
                                            color: "#4A4A4A",
                                            lineHeight: 1.5,
                                        }}
                                    >
                                        {s.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT — TIMELINE */}
                <div style={{ position: "relative", padding: "1rem 0" }}>
                    {/* Vertical Line */}
                    <div
                        style={{
                            position: "absolute",
                            left: "20px",
                            top: 0,
                            bottom: 0,
                            width: "2px", // 🔹 thinner
                            background: "rgba(185,122,87,0.25)",
                            borderRadius: 99,
                        }}
                    />

                    {/* Timeline Items */}
                    <div style={{ display: "grid", gap: "2.2rem" }}>
                        {steps.map((s, i) => (
                            <div
                                key={s.title}
                                style={{
                                    paddingLeft: "50px",
                                    position: "relative",
                                }}
                            >
                                {/* Dot with number inside */}
                                <div
                                    style={{
                                        position: "absolute",
                                        left: "8px",
                                        top: "4px",
                                        width: 26,
                                        height: 26,
                                        borderRadius: "50%",
                                        background: "#fff",
                                        border: "2px solid #A67A63",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "0.85rem",
                                        fontWeight: 700,
                                        color: "#A67A63",
                                        boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
                                    }}
                                >
                                    {i + 1}
                                </div>

                                <h4
                                    style={{
                                        margin: 0,
                                        fontSize: "1.05rem",
                                        fontWeight: 700,
                                        color: "#1A1A1A",
                                    }}
                                >
                                    {s.title}
                                </h4>
                                <p
                                    style={{
                                        margin: ".25rem 0 0",
                                        fontSize: "0.92rem",
                                        lineHeight: 1.5,
                                        color: "#4A4A4A",
                                        maxWidth: "40ch",
                                    }}
                                >
                                    {s.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

    );
}
