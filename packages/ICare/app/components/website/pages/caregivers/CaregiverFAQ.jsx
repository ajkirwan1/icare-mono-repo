import React from "react";

export default function CaregiverFAQ() {
    const NEUTRAL = "#0F172A";

    // ✅ 6 most important questions (condensed)
    const faqs = [
        {
            q: "Are caregivers verified?",
            a: "Yes. We request basic checks (ID, experience and documents depending on the country). You can also ask for references and have a call before starting.",
        },
        {
            q: "Who signs the agreement?",
            a: "You agree terms and sign directly with the caregiver. ICare supports the process but isn’t part of the contract.",
        },
        {
            q: "How do payments work?",
            a: "You agree the rate and schedule with the caregiver. Costs are shown clearly upfront (and in-app payments can be supported if enabled).",
        },
        {
            q: "What if it’s not a good fit?",
            a: "You can end care based on your agreed terms. We can help you find another match.",
        },
        {
            q: "Is ICare the employer?",
            a: "No. ICare is a marketplace — caregivers work independently and families contract with them directly.",
        },
        {
            q: "How much does ICare cost?",
            a: "A simple fee (e.g., 10%). No agency-style markups or hidden extras.",
        },
    ];

    const handleToggle = (e) => {
        const arrow = e.currentTarget.querySelector(".faq-arrow");
        if (!arrow) return;
        arrow.style.transform = e.currentTarget.open ? "rotate(180deg)" : "rotate(0deg)";
        arrow.style.opacity = e.currentTarget.open ? 0.95 : 0.65;
    };

    return (
        <section
            aria-label="FAQ"
            style={{
                margin: "6rem auto 4rem",
                width: "min(980px, 92vw)",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            {/* HEADER */}
            <header style={{ marginBottom: "1.8rem" }}>
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

                <div
                    style={{
                        marginTop: "1.3rem",
                        width: "100%",
                        height: 1,
                        background: "rgba(15,23,42,0.08)",
                    }}
                />
            </header>

            {/* FAQ LIST */}
            <div style={{ display: "grid", gap: "12px" }}>
                {faqs.map((f) => (
                    <details
                        key={f.q}
                        onToggle={handleToggle}
                        style={{
                            background: "rgba(255,255,255,0.92)",
                            borderRadius: 18,
                            border: "1px solid rgba(15,23,42,0.10)",
                            boxShadow: "0 10px 26px rgba(15,23,42,0.06)",
                            overflow: "hidden",
                            transition: "border-color .2s ease, background-color .2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "rgba(15,23,42,0.14)";
                            e.currentTarget.style.background = "rgba(255,255,255,0.98)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "rgba(15,23,42,0.10)";
                            e.currentTarget.style.background = "rgba(255,255,255,0.92)";
                        }}
                    >
                        <summary
                            style={{
                                listStyle: "none",
                                cursor: "pointer",
                                padding: "1.05rem 1.1rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: "1rem",
                            }}
                        >
                            <span
                                style={{
                                    fontWeight: 850,
                                    fontSize: "1.03rem",
                                    color: NEUTRAL,
                                    letterSpacing: "-0.1px",
                                    lineHeight: 1.25,
                                }}
                            >
                                {f.q}
                            </span>

                            {/* ✅ BLACK ARROW (no green) */}
                            <span
                                className="faq-arrow"
                                aria-hidden="true"
                                style={{
                                    width: 34,
                                    height: 34,
                                    borderRadius: 999,
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: "rgba(15,23,42,0.06)",
                                    border: "1px solid rgba(15,23,42,0.14)",
                                    color: NEUTRAL,
                                    transition: "transform .22s ease, opacity .22s ease",
                                    opacity: 0.65,
                                    flexShrink: 0,
                                }}
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </span>
                        </summary>

                        <div
                            style={{
                                padding: "0 1.1rem 1.15rem",
                                color: "#0f172a",
                                fontSize: "1rem",
                                lineHeight: 1.66,
                                fontWeight: 450,
                                maxWidth: "78ch",
                            }}
                        >
                            {f.a}
                        </div>
                    </details>
                ))}
            </div>

            <style>{`
        summary::-webkit-details-marker { display: none; }
      `}</style>
        </section>
    );
}
