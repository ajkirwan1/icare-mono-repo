import React from "react";

export default function ReceiversThreeStepsHeroSplit() {
    const steps = [
        {
            n: "1",
            t: "Browse trusted caregivers",
            d: "Compare experience, skills and availability — all clearly presented.",
        },
        {
            n: "2",
            t: "Connect privately",
            d: "Message caregivers directly and get a sense of who feels right.",
        },
        {
            n: "3",
            t: "Agree the plan together",
            d: "Set hours, expectations and rate — openly and transparently.",
        },
    ];

    return (
        <section
            style={{
                width: "100vw",
                marginLeft: "calc(50% - 50vw)",
                marginRight: "calc(50% - 50vw)",
                padding: "120px 0 130px",
                background: "#e8e7d7",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <div
                style={{
                    width: "min(92vw, 1280px)",
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: "1.2fr 0.8fr",
                    gap: "3.5rem",
                    alignItems: "center",
                }}
            >
                {/* ================= LEFT — TEXT + STEPS ================= */}
                <div style={{ paddingRight: "1rem" }}>
                    <h2
                        style={{
                            margin: 0,
                            fontWeight: 800,
                            fontSize: "clamp(2.5rem, 3vw, 2.8rem)",
                            color: "#1A1A1A",
                            letterSpacing: "-0.6px",
                            lineHeight: 1.14,
                        }}
                    >
                        Find your caregiver
                        <br />
                        in 3 simple steps
                    </h2>

                    <p
                        style={{
                            marginTop: "1.1rem",
                            fontSize: "1.22rem",
                            color: "#4A4A4A",
                            maxWidth: "60ch",
                            lineHeight: 1.66,
                        }}
                    >
                        A calm, human-centered process designed for clarity and trust.
                    </p>

                    {/* STEPS */}
                    <div
                        style={{
                            marginTop: "2.6rem",
                            display: "grid",
                            gap: "2.2rem",
                        }}
                    >
                        {steps.map((s) => (
                            <div
                                key={s.n}
                                style={{
                                    display: "flex",
                                    gap: "1.3rem",
                                    alignItems: "flex-start",
                                }}
                            >
                                {/* NUMBER */}
                                <div
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: "50%",
                                        background: "#0f3d2014", // ✅ NEW COLOR
                                        border: "1px solid #E0DBD4",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: 700,
                                        fontSize: "1.2rem",
                                        color: "#6C5F52",
                                        boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                                        flexShrink: 0,
                                    }}
                                >
                                    {s.n}
                                </div>

                                {/* TEXT */}
                                <div>
                                    <div
                                        style={{
                                            fontSize: "1.35rem",
                                            fontWeight: 700,
                                            color: "#2F2A24",
                                            letterSpacing: "-0.25px",
                                            marginBottom: "0.3rem",
                                        }}
                                    >
                                        {s.t}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "1.05rem",
                                            color: "#4C4842",
                                            lineHeight: 1.62,
                                            opacity: 0.95,
                                        }}
                                    >
                                        {s.d}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div style={{ marginTop: "3rem" }}>
                        <a
                            href="/find-a-caregiver"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "12px 18px",
                                borderRadius: "999px",
                                background: "#61674d",
                                color: "#fff",
                                border: "none",
                                fontWeight: 700,
                                fontSize: "0.95rem",
                                textDecoration: "none",
                                boxShadow: "0 8px 22px rgba(0,0,0,0.12)",
                                transition: "all .25s ease",
                            }}
                        >
                            Find a caregiver
                        </a>
                    </div>
                </div>

                {/* ================= RIGHT — IMAGE ================= */}
                <figure
                    style={{
                        margin: 0,
                        position: "relative",
                        borderRadius: "24px",
                        overflow: "hidden",
                        border: "1px solid rgba(0,0,0,0.06)",
                        boxShadow: "0 14px 40px rgba(0,0,0,0.08)",
                        aspectRatio: "1 / 1",
                        maxWidth: "88%",          // ✅ 10% WIDER (was 80%)
                        justifySelf: "center",
                    }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1600"
                        alt="Caregiver assisting a senior"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "50% 50%",
                            display: "block",
                        }}
                    />
                </figure>
            </div>
        </section>

    );
}
