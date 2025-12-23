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

    // ✅ replaced with your provided FAQ
    const faqs = [
        {
            q: "Are caregivers verified?",
            a: "Yes. ICare asks for baseline profile checks (identity / experience / documents depending on the country). You can also request references and have a call before starting.",
        },
        {
            q: "Who signs the agreement?",
            a: "You sign directly with the caregiver. ICare supports matching and communication, but is not a party to the contract.",
        },
        {
            q: "What if it’s not a good fit?",
            a: "You can stop conversations or end the cooperation based on your agreed terms. We can also help you find an alternative match quickly.",
        },
        {
            q: "How do payments work?",
            a: "You agree the rate and terms directly with the caregiver. ICare shows costs clearly upfront.",
        },
        {
            q: "Is ICare the employer?",
            a: "No. ICare is a marketplace. Caregivers are independent providers and families contract with caregivers directly.",
        },
        {
            q: "How much does ICare cost?",
            a: "ICare uses a simple, transparent fee (e.g., 10%). No hidden markups or agency-style extras.",
        },
        {
            q: "Can I speak to multiple caregivers?",
            a: "Yes. Talk to a few and choose the best fit—at your own pace, with no pressure.",
        },
        {
            q: "How fast can I find care?",
            a: "It depends on location, budget, and needs. Many families connect with candidates within days and agree a start date together.",
        },
        {
            q: "What about safety and privacy?",
            a: "Your data is protected and messaging is secure. Share sensitive details only when you’re comfortable moving forward.",
        },
        {
            q: "Does ICare help with matching?",
            a: "Yes. We help you clarify needs, compare candidates, and move through the process step by step.",
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
                        color: NEUTRAL,
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
                {faqs.map((f) => (
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
                            if (!icon) return;
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
                                color: NEUTRAL,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: "1rem",
                                padding: 0,
                                transition: "color .2s ease",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = BRAND)}
                            onMouseLeave={(e) => (e.currentTarget.style.color = NEUTRAL)}
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
                                    color: BRAND,
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
