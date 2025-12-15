import React from "react";

const BRAND = "#1FAB1F";

export default function PrivacyCoreCards() {
    const boxes = [
        {
            id: "data-we-collect",
            title: "1. Data we collect",
            items: [
                "Personal: name, email, phone, city/region.",
                "Account: login metadata, settings.",
                "Care-related: needs/preferences, availability/schedule (minimized, purpose-bound).",
                "Technical: cookies, IP, device/browser.",
                "Payments: via provider — no card stored on our servers (if applicable).",
            ],
        },
        {
            id: "how-we-use",
            title: "2. How we use data",
            items: [
                "Provide and improve ICare features (matching, messaging, agreements).",
                "Security, fraud prevention, abuse detection.",
                "Customer support and essential communications.",
                "Analytics for usability (aggregated; no data sales).",
            ],
        },
        {
            id: "legal-basis",
            title: "3. Legal basis (GDPR/RODO)",
            items: [
                "Consent (registration, optional features).",
                "Contract (to deliver requested services).",
                "Legitimate interest (security, product integrity).",
                "Legal obligation (tax, accounting).",
            ],
        },
        {
            id: "sharing",
            title: "4. Sharing",
            items: [
                "With families/caregivers only as needed to match and contract.",
                "With vetted processors (hosting, payments, communications).",
                "No sale of personal data.",
            ],
        },
    ];

    return (
        <section
            style={{
                margin: "0 auto 3.5rem",
                maxWidth: 1100,
                padding: "0 clamp(16px,4vw,32px)",
                display: "grid",
                gap: "16px",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            {boxes.map((box) => (
                <article
                    key={box.id}
                    id={box.id}
                    style={{
                        background: "#FFFFFF",
                        border: "1px solid rgba(15,23,42,.10)",
                        borderRadius: 16,
                        padding: "18px 18px",
                        boxShadow: "0 8px 22px rgba(2,8,23,.06)",
                    }}
                >
                    <h2
                        style={{
                            margin: 0,
                            color: "#1f2a37",
                            fontWeight: 900,
                            letterSpacing: ".2px",
                            fontSize: "clamp(1.15rem,2.2vw,1.5rem)",
                        }}
                    >
                        {box.title}
                    </h2>

                    <div
                        style={{
                            width: 180,
                            height: 3,
                            background: BRAND,
                            borderRadius: 999,
                            margin: ".6rem 0 1rem",
                        }}
                    />

                    <ul
                        style={{
                            margin: 0,
                            paddingLeft: 18,
                            color: "#334155",
                            lineHeight: 1.7,
                            fontSize: "1rem",
                        }}
                    >
                        {box.items.map((li) => (
                            <li key={li} style={{ margin: ".25rem 0" }}>
                                {li}
                            </li>
                        ))}
                    </ul>
                </article>
            ))}
        </section>
    );
}
