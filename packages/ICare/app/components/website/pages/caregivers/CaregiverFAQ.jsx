import React from "react";

export default function CaregiverFAQ() {
    const BRAND = "#1FAB1F";
    const NEUTRAL = "#0F172A";

    const sectionTitle = {
        margin: 0,
        fontWeight: 900,
        color: "#1f2a37",
        fontSize: "clamp(1.35rem,2.6vw,1.9rem)",
        letterSpacing: ".2px",
        lineHeight: 1.25,
        textAlign: "left",
    };

    const container = {
        width: "min(1100px, 92vw)",
        margin: "0 auto",
        padding: "0 clamp(16px,4vw,32px)",
    };

    const faqs = [
        {
            q: "Is registration really free?",
            a: "Yes. You only pay a flat 10% fee on the contract when you agree terms with a family.",
        },
        {
            q: "Can I negotiate my rate?",
            a: "Absolutely. You agree the hourly/daily rate directly with the family in the chat and contract.",
        },
        {
            q: "How do contracts and payments work?",
            a: "Set schedule and rate, e-sign your agreement, then manage everything in one place in ICare.",
        },
        {
            q: "Do I need documents?",
            a: "We recommend a CV/resume and any checks/certifications to increase trust and visibility.",
        },
    ];

    return (
        <section
            aria-label="Caregivers FAQ"
            style={{
                margin: "6rem auto 4rem",
                width: "min(900px, 92vw)",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            {/* HEADER */}
            <header style={{ marginBottom: "2.6rem" }}>
                <h2
                    style={{
                        margin: 0,
                        fontWeight: 900,
                        letterSpacing: "-0.5px",
                        fontSize: "clamp(1.9rem,2.7vw,2.4rem)",
                        color: "#0F172A",
                        lineHeight: 1.14,
                    }}
                >
                    Frequently asked questions
                </h2>

                {/* Soft Luxe divider */}
                <div
                    style={{
                        marginTop: "1.2rem",
                        width: "100%",
                        height: 1,
                        background: "rgba(15,23,42,0.06)",
                    }}
                />
            </header>

            {/* FAQ LIST */}
            <div style={{ display: "grid", gap: "1rem" }}>
                {faqs.map((f, idx) => (
                    <details
                        key={f.q}
                        style={{
                            background: "#FFFFFF",
                            borderRadius: 18,
                            border: "1px solid rgba(15,23,42,0.08)",
                            padding: "1.1rem 1.2rem",
                            boxShadow: "0 8px 22px rgba(0,0,0,0.04)",
                            transition: "all .25s ease",
                        }}
                        onToggle={(e) => {
                            const icon = e.currentTarget.querySelector(".faq-icon");
                            if (e.currentTarget.open) {
                                icon.style.transform = "rotate(45deg)";
                                icon.style.opacity = 0.85;
                            } else {
                                icon.style.transform = "rotate(0deg)";
                                icon.style.opacity = 0.6;
                            }
                        }}
                    >
                        <summary
                            style={{
                                listStyle: "none",
                                cursor: "pointer",
                                fontWeight: 800,
                                fontSize: "1.05rem",
                                color: "#0F172A",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: "1rem",
                                padding: 0,
                                transition: "color .2s ease",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#1FAB1F")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "#0F172A")}
                        >
                            {f.q}

                            {/* ICON */}
                            <span
                                className="faq-icon"
                                aria-hidden="true"
                                style={{
                                    fontSize: "1.4rem",
                                    fontWeight: 700,
                                    lineHeight: 1,
                                    opacity: 0.6,
                                    color: "#1FAB1F",
                                    transition: "transform .25s ease, opacity .25s ease",
                                    display: "inline-block",
                                }}
                            >
                                +
                            </span>
                        </summary>

                        {/* ANSWER */}
                        <div
                            style={{
                                marginTop: "0.8rem",
                                color: "#475569",
                                fontSize: "1rem",
                                lineHeight: 1.66,
                                fontWeight: 400,
                                paddingRight: "0.3rem",
                            }}
                        >
                            {f.a}
                        </div>
                    </details>
                ))}
            </div>
        </section>

    );
}
