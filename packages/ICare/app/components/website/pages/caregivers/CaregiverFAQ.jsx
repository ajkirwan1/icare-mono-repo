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
        <section aria-label="Caregivers FAQ" style={{ ...container, margin: "0 auto 3.75rem" }}>
            <h2 style={sectionTitle}>Frequently asked questions</h2>

            <div
                style={{
                    width: 420,
                    maxWidth: "90%",
                    height: 4,
                    background: BRAND,
                    borderRadius: 999,
                    margin: ".75rem 0 1.5rem 0",
                    opacity: 0.95,
                }}
            />

            <div style={{ display: "grid", gap: 10 }}>
                {faqs.map((f) => (
                    <details
                        key={f.q}
                        style={{
                            background: "#FFFFFF",
                            border: "1px solid rgba(15,23,42,0.10)",
                            borderRadius: 14,
                            padding: "12px 14px",
                        }}
                    >
                        <summary
                            style={{
                                listStyle: "none",
                                cursor: "pointer",
                                fontWeight: 800,
                                color: NEUTRAL,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 12,
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.color = BRAND)}
                            onMouseOut={(e) => (e.currentTarget.style.color = NEUTRAL)}
                        >
                            {f.q}
                            <span aria-hidden="true" style={{ color: BRAND }}>
                                +
                            </span>
                        </summary>
                        <div style={{ marginTop: 8, color: "#334155", lineHeight: 1.65 }}>
                            {f.a}
                        </div>
                    </details>
                ))}
            </div>
        </section>
    );
}
