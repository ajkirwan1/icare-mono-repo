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
                borderTop: "1px solid rgba(15,23,42,0.06)",
                borderBottom: "1px solid rgba(15,23,42,0.06)",
                padding: "clamp(6rem,10vw,9rem) 0",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <div
                style={{
                    maxWidth: 1280,
                    margin: "0 auto",
                    padding: "0 clamp(28px,5vw,52px)",
                }}
            >
                {/* HEADER */}
                <h2
                    style={{
                        margin: 0,
                        fontWeight: 800,
                        color: "#0F172A",
                        fontSize: "clamp(2.4rem,3.3vw,3rem)",
                        lineHeight: 1.15,
                        letterSpacing: "-0.5px",
                        animation: "fadeUp .8s ease both",
                    }}
                >
                    Get started in 3 simple steps
                </h2>

                <div style={{ height: "clamp(3.5rem,5vw,4.5rem)" }} />

                {/* STEPS GRID */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
                        gap: "clamp(40px,5vw,64px)",
                    }}
                >
                    {steps.map((step) => (
                        <article
                            key={step.title}
                            style={{
                                position: "relative",
                                borderRadius: 28,
                                overflow: "hidden",
                                background: "#fff",

                                // Airbnb Luxe: NO SHADOW, NO HOVER FLOAT
                                border: "1px solid rgba(0,0,0,0.05)",

                                transition: "background-color .25s ease, border-color .25s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(248,248,248,0.7)";
                                e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "#fff";
                                e.currentTarget.style.borderColor = "rgba(0,0,0,0.05)";
                            }}
                        >
                            {/* IMAGE */}
                            <div
                                style={{
                                    width: "100%",
                                    height: 240,
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

                                        // No zoom on hover — Luxe style
                                        transform: "scale(1)",
                                    }}
                                />
                            </div>

                            {/* TEXT */}
                            <div style={{ padding: "32px 32px 40px" }}>
                                <h3
                                    style={{
                                        margin: 0,
                                        fontSize: "1.42rem",
                                        color: "#0F172A",
                                        fontWeight: 800,
                                        letterSpacing: "-0.2px",
                                    }}
                                >
                                    {step.title}
                                </h3>

                                <p
                                    style={{
                                        marginTop: 14,
                                        marginBottom: 0,
                                        color: "#475569",
                                        fontSize: "1.05rem",
                                        lineHeight: 1.72,
                                    }}
                                >
                                    {step.desc}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>

                {/* CTA BUTTON */}
                <div style={{ marginTop: "clamp(64px,6vw,88px)" }}>
                    <a
                        href="/register"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 12,
                            textDecoration: "none",
                            color: "#fff",

                            // ICare Green Luxe
                            background: "#0f3d20e5",
                            padding: "1.25rem 2.4rem",
                            borderRadius: 999,
                            fontWeight: 800,
                            letterSpacing: ".02em",
                            fontSize: "1.05rem",

                            border: "1px solid rgba(0,0,0,0.08)",

                            transition:
                                "background .2s ease, transform .2s ease, opacity .2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#17931A";
                            e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#1FAB1F";
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        Create your free account
                    </a>
                </div>
            </div>

            {/* ANIMATION */}
            <style>{`
        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(18px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `}</style>
        </section>

    );
}
