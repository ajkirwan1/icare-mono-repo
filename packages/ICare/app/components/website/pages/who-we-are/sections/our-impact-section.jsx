import React from "react";

export function OurImpactSection() {
    const items = [
        {
            title: "Transparent care choices",
            desc: "Clear caregiver profiles show experience, availability and care style before conversation begins.",
        },
        {
            title: "Direct communication",
            desc: "Families and caregivers speak directly, without intermediaries shaping decisions.",
        },
        {
            title: "Fair, clear agreements",
            desc: "Care details, schedules and rates are agreed openly between families and caregivers.",
        },
        {
            title: "Freedom on both sides",
            desc: "Caregivers choose who they work with. Families choose who supports their home.",
        },
    ];

    return (
        <section
            id="impact"
            aria-label="Our impact"
            style={{
                width: "100%",
                background: "#ecddd18c",
                padding: "clamp(4.4rem, 7vw, 6.2rem) 0",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <div
                style={{
                    width: "min(1180px, 92vw)",
                    margin: "0 auto",
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1.1fr",
                        gap: "clamp(2.6rem, 5vw, 4.2rem)",
                        alignItems: "start",
                    }}
                >
                    {/* ================= LEFT — TEXT ================= */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            maxWidth: "54ch",
                        }}
                    >
                        <header style={{ marginBottom: "2.1rem" }}>
                            <h2
                                style={{
                                    margin: 0,
                                    fontWeight: 500,
                                    fontSize: "2.4rem",
                                    color: "#000",
                                    letterSpacing: "-0.35px",
                                }}
                            >
                                Our approach is built on a few simple principles
                            </h2>

                            <p
                                style={{
                                    marginTop: "1.1rem",
                                    fontSize: "1.22rem",
                                    lineHeight: 1.65,
                                    color: "rgba(0,0,0,0.9)",
                                    fontWeight: 400,
                                }}
                            >
                                Care is personal and rarely predictable.
                                <br />
                                ICare provides calm structure and clear agreements,
                                while leaving decisions where they belong — with people.
                            </p>
                        </header>

                        {/* ================= PRINCIPLES LIST ================= */}
                        <div style={{ display: "grid", gap: "1.6rem" }}>
                            {items.map((item, i) => (
                                <div
                                    key={item.title}
                                    style={{
                                        paddingBottom: "1.2rem",
                                        borderBottom:
                                            i !== items.length - 1
                                                ? "1px solid rgba(0,0,0,0.18)"
                                                : "none",
                                    }}
                                >
                                    <h3
                                        style={{
                                            margin: 0,
                                            fontSize: "1.22rem",
                                            fontWeight: 600,
                                            letterSpacing: "-0.15px",
                                            color: "#000",
                                        }}
                                    >
                                        {item.title}
                                    </h3>

                                    <p
                                        style={{
                                            marginTop: ".35rem",
                                            marginBottom: 0,
                                            fontSize: "1.15rem",
                                            lineHeight: 1.55,
                                            color: "rgba(0,0,0,0.88)",
                                            fontWeight: 400,
                                        }}
                                    >
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ================= RIGHT — IMAGE ================= */}
                    <div>
                        <div
                            style={{
                                position: "relative",
                                overflow: "hidden",
                                borderRadius: "28px",
                                boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
                                height: "clamp(420px, 52vw, 620px)",
                            }}
                        >
                            <img
                                src="images/web/who-we-are/homecare.jpg"
                                alt="Caregiver talking with senior man at home in the UK"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    display: "block",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
