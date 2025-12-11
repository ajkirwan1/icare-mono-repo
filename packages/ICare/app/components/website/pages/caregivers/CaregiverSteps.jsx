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
                margin: "4.5rem auto",             // mniejsze marginesy
                width: "min(980px, 92vw)",         // węższa o ~20%
                paddingInline: "1rem",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            {/* HEADER */}
            <header style={{ textAlign: "center", marginBottom: "2.6rem" }}>
                <h3
                    style={{
                        margin: 0,
                        fontWeight: 900,
                        letterSpacing: "-0.45px",
                        fontSize: "clamp(1.7rem,2.3vw,2.1rem)", // mniejsze
                        color: "#0F172A",
                        lineHeight: 1.12,
                    }}
                >
                    Get started in 5 clear steps
                </h3>

                <p
                    style={{
                        marginTop: ".6rem",
                        color: "#475569",
                        fontSize: "1.02rem", // mniejsze
                        fontWeight: 400,
                    }}
                >
                    From signup to your first match.
                </p>

                {/* soft divider */}
                <div
                    aria-hidden="true"
                    style={{
                        width: "100%",
                        height: 1,
                        background: "rgba(15,23,42,0.06)",
                        margin: "1.2rem auto 0",
                    }}
                />
            </header>

            {/* GRID */}
            <div
                style={{
                    display: "grid",
                    gap: "2.2rem",                  // mniejsze odstępy
                    width: "min(760px, 90vw)",     // ciaśniej
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
                                gridTemplateColumns: alt ? "1fr 130px" : "130px 1fr", // mniejsze obrazki
                                gap: "1.6rem",
                                alignItems: "center",
                                padding: "20px 22px",    // mniejszy padding
                                background: "#FFFFFF",
                                borderRadius: "18px",
                                border: "1px solid rgba(15,23,42,0.06)",
                                boxShadow: "0 6px 16px rgba(0,0,0,0.04)",

                                opacity: 0,
                                transform: "translateY(14px)", // mniejsza animacja
                                animation: `fadeUp .6s ease forwards ${0.12 + idx * 0.12}s`,
                            }}
                        >
                            {/* IMAGE */}
                            <figure
                                style={{
                                    order: alt ? 2 : 0,
                                    margin: 0,
                                    width: "100%",
                                    height: "130px",        // mniejsze
                                    borderRadius: "16px",
                                    overflow: "hidden",
                                    border: "1px solid rgba(15,23,42,0.06)",
                                    boxShadow: "0 6px 14px rgba(0,0,0,0.05)",
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
                                {/* step number */}
                                <div
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "12px",
                                        background: "rgba(15,23,42,0.06)",
                                        border: "1px solid rgba(15,23,42,0.12)",
                                        display: "grid",
                                        placeItems: "center",
                                        fontWeight: 900,
                                        fontSize: "1.05rem",
                                        color: "#0F172A",
                                        marginBottom: ".9rem",
                                    }}
                                >
                                    {idx + 1}
                                </div>

                                <h4
                                    style={{
                                        margin: "0 0 .4rem",
                                        fontSize: "clamp(1.06rem,1.4vw,1.28rem)", // mniejsze
                                        fontWeight: 850,
                                        color: "#0F172A",
                                        letterSpacing: "-0.2px",
                                    }}
                                >
                                    {p.t}
                                </h4>

                                <p
                                    style={{
                                        margin: 0,
                                        color: "#475569",
                                        fontSize: ".98rem", // mniejsze
                                        lineHeight: 1.52,
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
            <div style={{ marginTop: "3rem", textAlign: "center" }}>
                <a
                    href="/register"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: ".9rem 1.8rem",        // mniejsze
                        borderRadius: 999,
                        background: "#126012c8",
                        color: "#fff",
                        fontWeight: 800,
                        letterSpacing: ".02em",
                        fontSize: "1rem",
                        textDecoration: "none",
                        transition: "all .25s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#126012dd";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#126012c8";
                    }}
                >
                    CREATE YOUR FREE ACCOUNT
                </a>
            </div>


            {/* ANIMATIONS */}
            <style>{`
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 760px) {
  article {
      grid-template-columns: 1fr !important;
  }
  figure {
      height: 120px !important;
  }
}
`}</style>
        </section>


    );
}
