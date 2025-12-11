import React from "react";

export default function TrustSafetySection() {
    const items = [
        {
            title: "Verification",
            desc: "ID check, right to work, DBS, professional references and certificates.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" stroke="#1FAB1F" fill="none" strokeWidth="1.7">
                    <path d="M12 2l7 4v5c0 5-3.5 9-7 11-3.5-2-7-6-7-11V6l7-4z" />
                    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            title: "Profile Completeness",
            desc: "Bio, experience, core skills, photo and weekly availability — everything families need to trust you.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" stroke="#1FAB1F" fill="none" strokeWidth="1.7">
                    <circle cx="12" cy="7" r="4" />
                    <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
                </svg>
            ),
        },
        {
            title: "Transparent Communication",
            desc: "Clear expectations about duties, schedule, boundaries and communication style.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" stroke="#1FAB1F" fill="none" strokeWidth="1.7">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
            ),
        },
    ];

    return (
        <section
            aria-label="Trust & Safety Essentials"
            style={{
                marginLeft: "calc(50% - 50vw)",
                marginRight: "calc(50% - 50vw)",
                width: "100vw",
                background: "#FAF8F5",
                borderTop: "1px solid #e8e4df",
                borderBottom: "1px solid #e8e4df",
                padding: "120px 0",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <div
                style={{
                    maxWidth: 1280,
                    margin: "0 auto",
                    padding: "0 clamp(24px,6vw,64px)",
                    display: "grid",
                    gridTemplateColumns: "0.95fr 1.05fr",
                    gap: "clamp(40px, 6vw, 80px)",
                    alignItems: "center",
                }}
            >
                {/* LEFT — TEXT BLOCK */}
                <div style={{ paddingRight: "2vw" }}>
                    <h2
                        style={{
                            margin: 0,
                            fontWeight: 800,
                            color: "#1A1A1A",
                            fontSize: "clamp(2.3rem, 3vw, 3rem)",
                            lineHeight: 1.15,
                            letterSpacing: "-0.5px",
                        }}
                    >
                        Trust & Safety Essentials
                    </h2>

                    <p
                        style={{
                            marginTop: "1.6rem",
                            maxWidth: "60ch",
                            fontSize: "1.15rem",
                            lineHeight: 1.75,
                            color: "#4A4A4A",
                            fontWeight: 400,
                        }}
                    >
                        Every caregiver on ICare builds trust through transparency, verified credentials,
                        and clear communication — ensuring peace of mind for every family.
                    </p>

                    {/* LIST */}
                    <div
                        style={{
                            marginTop: "2.4rem",
                            display: "grid",
                            gap: "1.4rem",
                        }}
                    >
                        {/* 1 — VERIFICATION */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 12,
                            }}
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#A67A63"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ marginTop: 4 }}
                            >
                                <polyline points="20 6 9 17 4 12" />
                            </svg>

                            <div>
                                <div
                                    style={{
                                        fontWeight: 700,
                                        fontSize: "1.08rem",
                                        color: "#5C4638",
                                        marginBottom: ".25rem",
                                    }}
                                >
                                    Verification & Safety Checks
                                </div>

                                <div
                                    style={{
                                        fontSize: "1.05rem",
                                        color: "#3A3A3A",
                                        lineHeight: 1.55,
                                        fontWeight: 400,
                                    }}
                                >
                                    ID, right to work, DBS, references, certificates.
                                </div>
                            </div>
                        </div>

                        {/* 2 — PROFILE COMPLETENESS */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 12,
                            }}
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#A67A63"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ marginTop: 4 }}
                            >
                                <polyline points="20 6 9 17 4 12" />
                            </svg>

                            <div>
                                <div
                                    style={{
                                        fontWeight: 700,
                                        fontSize: "1.08rem",
                                        color: "#5C4638",
                                        marginBottom: ".25rem",
                                    }}
                                >
                                    Complete, Trust-Building Profile
                                </div>

                                <div
                                    style={{
                                        fontSize: "1.05rem",
                                        color: "#3A3A3A",
                                        lineHeight: 1.55,
                                    }}
                                >
                                    Bio, experience, skills, clear photo, availability.
                                </div>
                            </div>
                        </div>

                        {/* 3 — COMMUNICATION */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 12,
                            }}
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#A67A63"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ marginTop: 4 }}
                            >
                                <polyline points="20 6 9 17 4 12" />
                            </svg>

                            <div>
                                <div
                                    style={{
                                        fontWeight: 700,
                                        fontSize: "1.08rem",
                                        color: "#5C4638",
                                        marginBottom: ".25rem",
                                    }}
                                >
                                    Transparent Expectations
                                </div>

                                <div
                                    style={{
                                        fontSize: "1.05rem",
                                        color: "#3A3A3A",
                                        lineHeight: 1.55,
                                    }}
                                >
                                    Clear responsibilities, open communication, shared understanding.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT — IMAGE */}
                <figure
                    style={{
                        margin: 0,
                        position: "relative",
                        height: "min(480px, 55vh)",
                        borderRadius: 28,
                        overflow: "hidden",
                        border: "1px solid rgba(0,0,0,0.08)",
                        boxShadow: "0 18px 40px rgba(0,0,0,0.07)",
                    }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80"
                        alt="Trust and safety in caregiving"
                        style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "50% 50%",
                        }}
                    />
                </figure>
            </div>
        </section>

    );
}
