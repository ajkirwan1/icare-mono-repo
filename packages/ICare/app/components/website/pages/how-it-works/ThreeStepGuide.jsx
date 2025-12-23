import React from "react";

export default function ThreeStepGuide() {
    const steps = [
        {
            title: "Create your profile",
            desc: "Introduce yourself, choose your role, and tell us what support you need — or offer.",
            img: "images/web/how-it-works/signup.jpg",
        },
        {
            title: "Get matched instantly",
            desc: "Browse verified caregivers or care receivers that match your needs and preferences.",
            img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1000&q=80",
        },
        {
            title: "Start working together",
            desc: "Agree on the details, sign the contract, and begin high-quality, safe care.",
            img: "images/web/how-it-works/handshake2.png",
        },
    ];

    return (
        <section
            id="how-it-works-steps"
            aria-label="Three steps"
            style={{
                marginLeft: "calc(50% - 50vw)",
                marginRight: "calc(50% - 50vw)",
                width: "100vw",
                background: "#e8e7d7",
                borderTop: "1px solid rgba(15,23,42,0.06)",
                borderBottom: "1px solid rgba(15,23,42,0.06)",
                padding: "clamp(3.5rem,6vw,5.2rem) 0",
                scrollMarginTop: "110px",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <div
                style={{
                    maxWidth: 1180,
                    margin: "0 auto",
                    padding: "0 clamp(22px,4vw,44px)",
                }}
            >
                {/* HEADER */}
                <h2
                    style={{
                        margin: 0,
                        fontWeight: 850,
                        color: "#0F172A",
                        fontSize: "clamp(1.9rem,2.5vw,2.35rem)",
                        lineHeight: 1.15,
                        letterSpacing: "-0.45px",
                        animation: "fadeUp .8s ease both",
                    }}
                >
                    Get started in 3 simple steps
                </h2>

                {/* ✅ more space + calmer Curam-style line */}
                <p
                    style={{
                        margin: "16px 0 0", // ✅ more space from heading
                        color: "#334155",
                        fontSize: "clamp(1.04rem, 1.2vw, 1.14rem)",
                        lineHeight: 1.65,
                        fontWeight: 400,
                        maxWidth: "72ch",
                    }}
                >
                    A simple way to search, speak  and agree care directly.
                </p>

                {/* ✅ bigger spacer before cards */}
                <div style={{ height: "clamp(2.2rem,3.6vw,3rem)" }} />

                {/* STEPS GRID */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
                        gap: "clamp(20px,3.2vw,34px)",
                    }}
                >
                    {steps.map((step) => (
                        <article
                            key={step.title}
                            style={{
                                position: "relative",
                                borderRadius: 22,
                                overflow: "hidden",
                                background: "#fff",
                                border: "1px solid rgba(0,0,0,0.08)",
                                transition: "background-color .2s ease, border-color .2s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.92)";
                                e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "#fff";
                                e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
                            }}
                        >
                            {/* IMAGE */}
                            <div
                                style={{
                                    width: "100%",
                                    height: 180,
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
                                        transform: "scale(1)",
                                    }}
                                />
                            </div>

                            {/* TEXT */}
                            <div style={{ padding: "22px 22px 26px" }}>
                                <h3
                                    style={{
                                        margin: 0,
                                        fontSize: "1.18rem",
                                        color: "#0F172A",
                                        fontWeight: 850,
                                        letterSpacing: "-0.2px",
                                    }}
                                >
                                    {step.title}
                                </h3>

                                <p
                                    style={{
                                        marginTop: 10,
                                        marginBottom: 0,
                                        color: "#475569",
                                        fontSize: "0.98rem",
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
                <div style={{ marginTop: "clamp(34px,4vw,48px)" }}>
                    <a
                        href="/register"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 12,
                            textDecoration: "none",
                            color: "#fff",
                            background: "#b97a57",
                            padding: "0.95rem 1.8rem",
                            borderRadius: 999,
                            fontWeight: 850,
                            letterSpacing: ".01em",
                            fontSize: "1rem",
                            border: "1px solid rgba(0,0,0,0.08)",
                            transition: "transform .18s ease, filter .18s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-1px)";
                            e.currentTarget.style.filter = "brightness(1.02)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.filter = "none";
                        }}
                    >
                        Create your free account
                    </a>
                </div>
            </div>

            <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </section>

    );
}

