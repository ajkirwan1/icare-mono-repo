import React from "react";

export default function CaregiverStepsEmpathy() {
    const steps = [
        {
            t: "Tell us about yourself",
            d: "Your skills, experience and availability help families understand who you are.",
        },
        {
            t: "Complete your checks",
            d: "Upload your ID, references and documents safely. We're here to guide you.",
        },
        {
            t: "Start talking to families",
            d: "Families reach out when your profile feels right. Ask questions, take your time.",
        },
        {
            t: "Agree the details together",
            d: "You decide the hours, responsibilities and rate — openly and without pressure.",
        },
        {
            t: "Begin supporting someone",
            d: "Your care makes a real difference. Update availability anytime.",
        },
    ];

    return (
        <section
            id="caregiver-steps"
            aria-label="Caregiver steps"
            style={{
                width: "100vw",
                marginLeft: "calc(50% - 50vw)",
                marginRight: "calc(50% - 50vw)",
                background: "#d9d7bd",
                padding: "4.6rem 0",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <div
                style={{
                    width: "min(1200px, 92vw)", // ⬅️ IDENTYCZNE jak sekcja black carer
                    margin: "0 auto",
                }}
            >
                {/* HEADER */}
                <header style={{ marginBottom: "2.6rem", maxWidth: "620px" }}>
                    <h2
                        style={{
                            margin: 0,
                            fontWeight: 800,
                            fontSize: "clamp(1.7rem,2.2vw,2.1rem)",
                            letterSpacing: "-0.35px",
                            color: "#0F172A",
                            lineHeight: 1.15,
                        }}
                    >
                        We guide you every step of the way
                    </h2>

                    <p
                        style={{
                            marginTop: ".55rem",
                            color: "#475569",
                            fontSize: "1rem",
                            lineHeight: 1.5,
                        }}
                    >
                        A simple, supportive process — designed for real caregivers.
                    </p>
                </header>

                {/* MAIN GRID */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr", // ⬅️ identyczny układ
                        gap: "3rem",
                        alignItems: "center",
                    }}
                >
                    {/* LEFT — STEPS */}
                    <div style={{ display: "grid", gap: "1.35rem" }}>
                        {steps.map((s, i) => (
                            <div
                                key={i}
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "26px 1fr",
                                    gap: "1.15rem",
                                    paddingBottom: "1.15rem",
                                    borderBottom:
                                        i !== steps.length - 1
                                            ? "1px solid rgba(0,0,0,0.06)"
                                            : "none",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "0.9rem",
                                        fontWeight: 700,
                                        color: "#0F3D20",
                                        opacity: 0.55,
                                        lineHeight: "1.6",
                                    }}
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </div>

                                <div>
                                    <h3
                                        style={{
                                            margin: "0 0 .25rem",
                                            fontSize: "1.08rem",
                                            fontWeight: 700,
                                            color: "#0F172A",
                                        }}
                                    >
                                        {s.t}
                                    </h3>

                                    <p
                                        style={{
                                            margin: 0,
                                            fontSize: ".95rem",
                                            color: "#475569",
                                            lineHeight: 1.45,
                                        }}
                                    >
                                        {s.d}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT — IMAGE (IDENTYCZNA SZEROKOŚĆ JAK blackcarer.jpg) */}
                    <figure
                        style={{
                            margin: 0,
                            width: "100%",
                            height: "380px", // ⬅️ IDENTYCZNA wysokość
                            borderRadius: "22px",
                            overflow: "hidden",
                            border: "1px solid rgba(0,0,0,0.06)",
                            boxShadow: "0 18px 48px rgba(0,0,0,0.16)", // ⬅️ ten sam cień
                        }}
                    >
                        <img
                            src="images/web/icare-for-caregivers/registering.jpg"
                            alt="Caregiver registering on a mobile phone"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                objectPosition: "center",
                            }}
                        />
                    </figure>
                </div>

                {/* CTA */}
                <div style={{ marginTop: "2.6rem" }}>
                    <a
                        href="/register"
                        style={{
                            display: "inline-flex",
                            padding: "0.85rem 1.8rem",
                            borderRadius: 999,
                            background: "#61674d",
                            color: "#fff",
                            fontSize: ".95rem",
                            fontWeight: 700,
                            textDecoration: "none",
                            letterSpacing: ".01em",
                        }}
                    >
                        Create your free account
                    </a>
                </div>
            </div>
        </section>

    );
}
