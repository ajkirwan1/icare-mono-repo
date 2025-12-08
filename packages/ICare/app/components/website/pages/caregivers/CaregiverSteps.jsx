import React, { useEffect, useRef } from "react";

export default function CaregiverSteps() {
    const BRAND = "#1FAB1F";
    const stepsRef = useRef([]);

    useEffect(() => {
        const els = stepsRef.current.filter(Boolean);
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("reveal--in");
                        io.unobserve(e.target);
                    }
                });
            },
            { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
        );

        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    const steps = [
        {
            t: "Simple and free registration",
            d: "Create your account safely with base information only.",
        },
        {
            t: "Contact clients directly",
            d: "Message families to understand needs and expectations before you agree.",
        },
        {
            t: "Increase your earnings",
            d: "Agree terms directly — keep more of your hard-earned income.",
        },
        {
            t: "Tailor your profile",
            d: "Upload CV/resume, add checks and specialist skills to boost visibility.",
        },
        {
            t: "Manage your own employment contracts",
            d: "Set schedule & rate, e-sign your agreement and keep everything in one place.",
        },
    ];

    const images = [
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1604882737206-599d53f4f524?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=900&q=80",
    ];

    return (
        <section
            id="caregiver-steps"
            aria-label="Caregiver steps"
            style={{
                margin: "6rem auto",
                width: "min(1100px, 92vw)",
                paddingInline: "1.4rem",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            {/* HEADER */}
            <header style={{ textAlign: "center", marginBottom: "3.6rem" }}>
                <h3
                    style={{
                        margin: 0,
                        fontWeight: 900,
                        letterSpacing: "-0.45px",
                        fontSize: "clamp(2rem,2.7vw,2.45rem)",
                        color: "#0F172A",
                        lineHeight: 1.12,
                    }}
                >
                    Get started in 5 clear steps
                </h3>

                <p
                    style={{
                        marginTop: "0.9rem",
                        color: "#475569",
                        fontSize: "1.12rem",
                        fontWeight: 400,
                    }}
                >
                    From signup to your first match.
                </p>

                {/* soft luxe divider — no green */}
                <div
                    aria-hidden="true"
                    style={{
                        width: "100%",
                        height: 1,
                        background: "rgba(15,23,42,0.06)",
                        margin: "1.6rem auto 0",
                    }}
                />
            </header>

            {/* GRID */}
            <div
                style={{
                    display: "grid",
                    gap: "3rem",
                    width: "min(860px, 90vw)",
                    margin: "0 auto",
                }}
            >
                {steps.map((p, idx) => {
                    const alt = idx % 2 === 1;

                    return (
                        <article
                            key={p.t}
                            ref={(el) => (stepsRef.current[idx] = el)}
                            style={{
                                display: "grid",
                                gridTemplateColumns: alt ? "1fr 160px" : "160px 1fr",
                                gap: "2rem",
                                alignItems: "center",
                                padding: "clamp(24px,2.6vw,34px)",
                                background: "#FFFFFF",
                                borderRadius: "22px",

                                /* consistent with Compare + Who can join + Estimator */
                                border: "1px solid rgba(15,23,42,0.06)",
                                boxShadow: "0 10px 24px rgba(0,0,0,0.04)",

                                opacity: 0,
                                transform: "translateY(18px)",
                                animation: `fadeUp .7s ease forwards ${0.15 + idx * 0.15}s`,
                            }}
                        >
                            {/* IMAGE */}
                            <figure
                                style={{
                                    order: alt ? 2 : 0,
                                    margin: 0,
                                    width: "100%",
                                    height: "160px",
                                    borderRadius: "18px",
                                    overflow: "hidden",

                                    /* subtle luxe border */
                                    border: "1px solid rgba(15,23,42,0.06)",
                                    boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
                                }}
                            >
                                <img
                                    src={images[idx % images.length]}
                                    alt=""
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </figure>

                            {/* TEXT */}
                            <div style={{ order: alt ? 1 : 1 }}>
                                {/* step number -- neutral luxe */}
                                <div
                                    style={{
                                        width: "48px",
                                        height: "48px",
                                        borderRadius: "14px",
                                        background: "rgba(15,23,42,0.06)",
                                        border: "1px solid rgba(15,23,42,0.12)",
                                        display: "grid",
                                        placeItems: "center",
                                        fontWeight: 900,
                                        fontSize: "1.18rem",
                                        color: "#0F172A",
                                        marginBottom: "1.2rem",
                                    }}
                                >
                                    {idx + 1}
                                </div>

                                <h4
                                    style={{
                                        margin: "0 0 .55rem",
                                        fontSize: "clamp(1.2rem,1.7vw,1.45rem)",
                                        fontWeight: 850,
                                        color: "#0F172A",
                                        letterSpacing: "-0.25px",
                                    }}
                                >
                                    {p.t}
                                </h4>

                                <p
                                    style={{
                                        margin: 0,
                                        color: "#475569",
                                        fontSize: "1.05rem",
                                        lineHeight: 1.6,
                                        fontWeight: 400,
                                    }}
                                >
                                    {p.d}
                                </p>
                            </div>
                        </article>
                    );
                })}
            </div>

            {/* CTA */}
            <div style={{ marginTop: "4.2rem", textAlign: "center" }}>
                <a
                    href="/register"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "1.05rem 2.1rem",
                        borderRadius: 999,
                        background: "#126012c8",
                        border: " #126012c8",
                        color: "#ffffffff",
                        fontWeight: 900,
                        letterSpacing: ".02em",
                        fontSize: "1.07rem",
                        textDecoration: "none",
                        transition: "all .25s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#126012c8";
                        e.currentTarget.style.transform = "brightness(1)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#126012c8";
                        e.currentTarget.style.transform = "brightness(1.2)";
                    }}
                >
                    CREATE YOUR FREE ACCOUNT
                </a>
            </div>

            {/* ANIMATIONS */}
            <style>{`
        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(18px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 760px) {
            article {
                grid-template-columns: 1fr !important;
            }
            figure {
                height: 140px !important;
            }
        }
    `}</style>
        </section>

    );
}
