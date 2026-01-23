import React from "react";

export default function CaregiverFAQ() {
    const NEUTRAL = "#0F172A";

    // ✅ Caregivers FAQ (based on common Curam/Elder-style questions, adapted for ICare)
    const faqs = [
        {
            q: "How does ICare work for caregivers?",
            a: "ICare is a platform that connects independent caregivers directly with families looking for care. You create a profile, set your availability and rates, and families can message you to discuss support — without an agency middleman.",
        },
        {
            q: "Do I have to pay to join ICare?",
            a: "No. Creating your profile is free. If there is a platform fee, it is shown clearly and agreed upfront — so you always know what you keep from your earnings.",
        },
        {
            q: "Can I choose the hours I work?",
            a: "Yes. You decide your hours, days, and the type of care you offer. You can accept or decline enquiries based on what fits your life.",
        },
        {
            q: "What do I need to join (DBS, insurance, Right to Work)?",
            a: "Requirements depend on the type of care you provide. Typically you’ll need Right to Work and ID, and you may add DBS, insurance, training certificates and references to strengthen your profile and build trust with families.",
        },
        {
            q: "How do families find and contact me?",
            a: "Families view caregiver profiles (experience, skills, availability) and contact you directly through secure messaging on ICare to discuss needs, rates and schedules.",
        },
        {
            q: "How does ICare help protect caregivers?",
            a: "ICare provides tools and guidance to support safer, more professional work - secure messaging, clear agreements and expectations, and practical safeguarding and boundary guidance.",
        },
        {
            q: "What if a client isn’t the right fit?",
            a: "Care arrangements are agreed directly between you and the family. If something needs to change, you can clarify expectations, adjust the arrangement, or agree next steps together — with ICare guidance and support resources available where needed.",
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
                    "Nunito, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            {/* HEADER */}
            <header style={{ marginBottom: "1.8rem" }}>
                <h2
                    style={{
                        margin: 0,
                        fontWeight: 500,
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
                                padding: "1.5rem 1.5rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: "1rem",
                            }}
                        >
                            <span
                                style={{
                                    fontWeight: 700,
                                    fontSize: "1.1rem",
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
                                padding: "0 1.5rem 1.5rem",
                                color: "#0f172a",
                                fontSize: "1.1rem",
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
