import React from "react";

export default function ReceiversFAQ() {
    const container = {
        width: "min(92vw,1100px)",
        margin: "60px auto 80px",
        paddingTop: 10,
    };

    const faqs = [
        {
            q: "Do I pay anything to register?",
            a: "No. Registration is free. ICare charges a one-time flat fee only after both sides sign an agreement.",
        },
        {
            q: "How do I verify a caregiver?",
            a: "Profiles include experience, checks, skills and availability. You can message privately, schedule a call, and request documents before agreeing terms.",
        },
        {
            q: "Is my data secure?",
            a: "Yes. We use encrypted messaging and store only the minimum data needed to provide the service.",
        },
    ];

    return (
        <section aria-label="FAQ" style={container}>
            {/* TITLE */}
            <h3
                style={{
                    margin: "0 0 28px",
                    fontWeight: 800,
                    fontSize: "clamp(1.8rem, 3vw, 2.2rem)",
                    color: "#1A1A1A",
                    letterSpacing: "-0.4px",
                    textAlign: "left",
                }}
            >
                Frequently asked questions
            </h3>

            {/* FAQ LIST */}
            <ul
                style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "grid",
                    gap: 16,
                }}
            >
                {faqs.map((item, i) => (
                    <li key={i}>
                        <details
                            style={{
                                background: "#FFFFFF",
                                borderRadius: 18,
                                border: "1px solid rgba(76,120,101,0.20)",
                                padding: "18px 22px",
                                cursor: "pointer",
                                transition: "all .25s ease",
                                boxShadow: "0 6px 16px rgba(0,0,0,0.04)",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = "0 10px 26px rgba(0,0,0,0.08)";
                                e.currentTarget.style.transform = "translateY(-2px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.04)";
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                        >
                            <summary
                                style={{
                                    listStyle: "none",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    fontSize: "1.05rem",
                                    fontWeight: 700,
                                    color: "#1F2A37",
                                    padding: "6px 0",
                                }}
                            >
                                {item.q}

                                {/* ARROW ICON */}
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="rgba(76,120,101,0.9)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    style={{
                                        marginLeft: 12,
                                        transition: "transform .25s ease",
                                    }}
                                    className="faq-arrow"
                                >
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </summary>

                            <p
                                style={{
                                    marginTop: 12,
                                    paddingRight: 8,
                                    color: "#475569",
                                    lineHeight: 1.65,
                                    fontSize: "1rem",
                                }}
                            >
                                {item.a}
                            </p>
                        </details>
                    </li>
                ))}
            </ul>
        </section>
    );
}
