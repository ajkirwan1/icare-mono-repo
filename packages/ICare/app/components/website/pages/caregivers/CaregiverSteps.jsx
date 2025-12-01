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
                margin: "4.5rem auto",
                width: "min(1100px, 92vw)",
                paddingInline: "1.4rem",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            {/* HEADER */}
            <header style={{ textAlign: "center", marginBottom: "3rem" }}>
                <h3
                    style={{
                        margin: 0,
                        fontWeight: 900,
                        letterSpacing: "-0.5px",
                        fontSize: "clamp(1.8rem,2.6vw,2.4rem)",
                        color: "#0F172A",
                        lineHeight: 1.15,
                    }}
                >
                    Get started in 5 clear steps
                </h3>

                <p
                    style={{
                        marginTop: ".7rem",
                        color: "#4C7865",
                        fontSize: "1.08rem",
                        fontWeight: 600,
                        opacity: 0.9,
                    }}
                >
                    From signup to your first match.
                </p>

                <div
                    aria-hidden="true"
                    style={{
                        width: "70px",
                        height: 3,
                        background: "#4C7865",
                        borderRadius: 999,
                        margin: "1.1rem auto 0",
                        opacity: 0.8,
                    }}
                />
            </header>

            {/* GRID */}
            <div
                style={{
                    display: "grid",
                    gap: "2.8rem",
                    width: "min(860px, 90vw)",
                    margin: "0 auto",
                }}
            >
                {steps.map((p, idx) => {
                    const alt = idx % 2 === 1;
                    const bg = alt ? "#F5FAF7" : "#FFFFFF";

                    return (
                        <article
                            key={p.t}
                            ref={(el) => (stepsRef.current[idx] = el)}
                            style={{
                                display: "grid",
                                gridTemplateColumns: alt ? "1fr 150px" : "150px 1fr",
                                gap: "1.6rem",
                                alignItems: "center",
                                padding: "clamp(20px,2.4vw,30px)",
                                background: bg,
                                borderRadius: "22px",
                                border: "1px solid rgba(76,120,101,0.18)",
                                boxShadow: "0 10px 22px rgba(0,0,0,0.05)",
                                opacity: 0,
                                transform: "translateY(18px)",
                                animation: `fadeUp .7s ease forwards ${0.15 + idx * 0.16}s`,
                            }}
                        >
                            {/* IMAGE */}
                            <figure
                                style={{
                                    order: alt ? 2 : 0,
                                    margin: 0,
                                    width: "100%",
                                    height: "150px",
                                    borderRadius: "18px",
                                    overflow: "hidden",
                                    border: "1px solid rgba(0,0,0,0.06)",
                                    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
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
                                <div
                                    style={{
                                        width: "44px",
                                        height: "44px",
                                        borderRadius: "14px",
                                        background: "#E6F3EC",
                                        border: "1px solid #B9D9CA",
                                        display: "grid",
                                        placeItems: "center",
                                        fontWeight: 900,
                                        fontSize: "1.15rem",
                                        color: "#4C7865",
                                        marginBottom: "1rem",
                                        boxShadow: "0 4px 10px rgba(76,120,101,0.12)",
                                    }}
                                >
                                    {idx + 1}
                                </div>

                                <h4
                                    style={{
                                        margin: "0 0 .45rem",
                                        fontSize: "clamp(1.15rem,1.7vw,1.4rem)",
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
                                        fontSize: "1rem",
                                        lineHeight: 1.55,
                                    }}
                                >
                                    {p.d}
                                </p>
                            </div>
                        </article>
                    );
                })}
            </div>

            <div style={{ marginTop: "3.6rem", textAlign: "center" }}>
                <a
                    href="/register"
                    style={{
                        display: "inline-block",
                        background: "#4C7865",
                        color: "#fff",
                        fontWeight: 800,
                        padding: "0.95rem 2rem",
                        borderRadius: 999,
                        fontSize: "1.05rem",
                        textDecoration: "none",
                        boxShadow: "0 12px 32px rgba(76,120,101,0.22)",
                        transition: "all .25s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow =
                            "0 16px 38px rgba(76,120,101,0.30)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                            "0 12px 32px rgba(76,120,101,0.22)";
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
                        height: 130px !important;
                    }
                }
            `}</style>
        </section>
    );
}
