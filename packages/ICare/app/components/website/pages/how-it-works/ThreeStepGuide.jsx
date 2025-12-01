import React from "react";

export default function ThreeStepGuide() {
    const BRAND = "#1FAB1F";

    const steps = [
        {
            title: "Create your profile",
            desc: "Introduce yourself, choose your role, and tell us what support you need — or offer.",
            img: "https://images.unsplash.com/photo-1581579184439-1f3a5c7f1b5f?auto=format&fit=crop&w=1000&q=80",
        },
        {
            title: "Get matched instantly",
            desc: "Browse verified caregivers or care receivers that match your needs and preferences.",
            img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1000&q=80",
        },
        {
            title: "Start working together",
            desc: "Agree on the details, sign the contract, and begin high-quality, safe care.",
            img: "https://images.unsplash.com/photo-1587502537745-84bb8a0d4a01?auto=format&fit=crop&w=1000&q=80",
        },
    ];

    return (
        <section
            id="steps"
            aria-label="Three steps"
            style={{
                marginLeft: "calc(50% - 50vw)",
                marginRight: "calc(50% - 50vw)",
                width: "100vw",
                background: "#FFFFFF",
                borderTop: "1px solid rgba(15,23,42,.06)",
                borderBottom: "1px solid rgba(15,23,42,.06)",
                padding: "clamp(5rem,8vw,8rem) 0",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <div
                style={{
                    maxWidth: 1280,
                    margin: "0 auto",
                    padding: "0 clamp(24px,5vw,48px)",
                }}
            >
                {/* HEADER */}
                <h2
                    style={{
                        margin: 0,
                        fontWeight: 900,
                        color: "#0F172A",
                        fontSize: "clamp(2.2rem,3vw,2.8rem)",
                        lineHeight: 1.2,
                        letterSpacing: ".25px",
                        animation: "fadeUp .8s ease both",
                    }}
                >
                    Get started in 3 simple steps
                </h2>

                <div style={{ height: "clamp(2.5rem,4vw,3.5rem)" }} />

                {/* STEPS GRID */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
                        gap: "clamp(32px,4vw,48px)",
                    }}
                >
                    {steps.map((step) => (
                        <article
                            key={step.title}
                            style={{
                                position: "relative",
                                borderRadius: 24,
                                overflow: "hidden",
                                background: "#fff",
                                boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
                                transition: "all .35s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-6px)";
                                e.currentTarget.style.boxShadow =
                                    "0 16px 38px rgba(0,0,0,0.12)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0px)";
                                e.currentTarget.style.boxShadow =
                                    "0 6px 20px rgba(0,0,0,0.05)";
                            }}
                        >
                            {/* IMAGE */}
                            <div
                                style={{
                                    width: "100%",
                                    height: 220,
                                    overflow: "hidden",
                                }}
                            >
                                <img
                                    src={step.img}
                                    alt=""
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        transition: "transform .45s ease",
                                    }}
                                    onMouseEnter={(e) =>
                                        (e.currentTarget.style.transform = "scale(1.05)")
                                    }
                                    onMouseLeave={(e) =>
                                        (e.currentTarget.style.transform = "scale(1)")
                                    }
                                />
                            </div>

                            {/* TEXT */}
                            <div style={{ padding: "24px 26px 30px" }}>
                                <h3
                                    style={{
                                        margin: 0,
                                        fontSize: "1.35rem",
                                        color: "#0F172A",
                                        fontWeight: 800,
                                    }}
                                >
                                    {step.title}
                                </h3>

                                <p
                                    style={{
                                        marginTop: 10,
                                        marginBottom: 0,
                                        color: "#475569",
                                        fontSize: "1rem",
                                        lineHeight: 1.65,
                                    }}
                                >
                                    {step.desc}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>

                {/* CTA BUTTON */}
                <div style={{ marginTop: "clamp(48px,4vw,64px)" }}>
                    <a
                        href="/register"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 10,
                            textDecoration: "none",
                            color: "#FFFFFF",
                            background: "#1F7A4A",
                            padding: "1.1rem 2rem",
                            borderRadius: 999,
                            fontWeight: 900,
                            letterSpacing: ".03em",
                            boxShadow: "0 10px 28px rgba(0,0,0,.12)",
                            border: "1px solid rgba(0,0,0,.12)",
                            transition: "all .25s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#16653C";
                            e.currentTarget.style.transform = "translateY(-3px)";
                            e.currentTarget.style.boxShadow =
                                "0 14px 34px rgba(0,0,0,.16)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#1F7A4A";
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                                "0 10px 28px rgba(0,0,0,.12)";
                        }}
                    >
                        Create your free account
                    </a>
                </div>
            </div>

            {/* ANIMATION */}
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(14px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
}
