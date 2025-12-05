import React from "react";

export default function ICareProtectionSection() {
    const accent = {
        width: "8px",
        background: "rgba(18, 96, 18, 0.784)",
        borderRadius: 6,
        flexShrink: 0,
    };

    const itemStyle = {
        display: "flex",
        gap: "1rem",
    };

    const titleStyle = {
        fontSize: "1.15rem",
        fontWeight: 700,
        color: "#0F172A",
        marginBottom: ".35rem",
    };

    const descStyle = {
        color: "#475569",
        lineHeight: 1.55,
        fontSize: "1rem",
    };

    return (
        <section
            aria-label="ICare Protection"
            style={{
                margin: "120px auto",
                width: "min(92vw,1100px)",
                padding: "0", // removed outer padding/card
            }}
        >
            {/* HEADER */}
            <h2
                style={{
                    fontSize: "clamp(1.9rem, 3vw, 2.4rem)",
                    fontWeight: 800,
                    color: "#0F172A",
                    marginBottom: "0.75rem",
                }}
            >
                Safety & Peace of mind
            </h2>

            <p
                style={{
                    fontSize: "1.2rem",
                    color: "#475569",
                    marginBottom: "3.4rem",
                }}
            >
                Your safety comes first. Every step of the way.
            </p>

            {/* GRID */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "2.4rem",
                }}
            >
                {/* 1 — VERIFIED */}
                <div style={itemStyle}>
                    <div style={accent} />
                    <div>
                        <h4 style={titleStyle}>Verified caregivers</h4>
                        <p style={descStyle}>
                            ID, Right to Work, references and DBS checks when provided.
                        </p>
                    </div>
                </div>

                {/* 2 — SECURE MESSAGING */}
                <div style={itemStyle}>
                    <div style={accent} />
                    <div>
                        <h4 style={titleStyle}>Secure communication</h4>
                        <p style={descStyle}>
                            All conversations stay protected inside ICare’s secure messaging system.
                        </p>
                    </div>
                </div>

                {/* 3 — SAFE PAYMENTS */}
                <div style={itemStyle}>
                    <div style={accent} />
                    <div>
                        <h4 style={titleStyle}>Protected payments</h4>
                        <p style={descStyle}>
                            Payments are processed safely through ICare — never directly or in cash.
                        </p>
                    </div>
                </div>

                {/* 4 — DOCUMENTATION */}
                <div style={itemStyle}>
                    <div style={accent} />
                    <div>
                        <h4 style={titleStyle}>Clear documentation</h4>
                        <p style={descStyle}>
                            Invoices, agreements and care details stay organised in one secure place.
                        </p>
                    </div>
                </div>

                {/* 5 — SUPPORT */}
                <div style={itemStyle}>
                    <div style={accent} />
                    <div>
                        <h4 style={titleStyle}>Support if anything changes</h4>
                        <p style={descStyle}>
                            If your needs change, ICare helps you adjust or find alternative support.
                        </p>
                    </div>
                </div>

                {/* 6 — NO CONTRACTS */}
                <div style={itemStyle}>
                    <div style={accent} />
                    <div>
                        <h4 style={titleStyle}>No long-term contracts</h4>
                        <p style={descStyle}>
                            You stay in control. Adjust or cancel care anytime, directly with your caregiver.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
