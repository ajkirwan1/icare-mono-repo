import React from "react";

export default function ReceiversEditorialBanner() {
    return (
        <section
            aria-label="Banner Editorial"
            style={{
                marginLeft: "calc(50% - 50vw)",
                marginRight: "calc(50% - 50vw)",
                width: "100vw",
                background: "#FAF8F5",
                borderTop: "1px solid #e8e4df",
                borderBottom: "1px solid #e8e4df",
                padding: "120px 0",
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
                {/* LEFT — TEXT */}
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
                        Support that feels personal.
                        Care that feels human.
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
                        Find independent, verified caregivers who offer gentle, consistent support for you or your loved one — without agency pressure, confusion or hidden fees.
                    </p>

                    <div
                        style={{
                            marginTop: "2.4rem",
                            display: "grid",
                            gap: "1rem",
                        }}
                    >
                        {[
                            "No subscriptions or hidden fees",
                            "Direct agreement with caregivers",
                            "Secure private messaging",

                        ].map((text) => (
                            <div
                                key={text}
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

                                <span
                                    style={{
                                        fontSize: "1.05rem",
                                        color: "#3A3A3A",
                                        lineHeight: 1.55,
                                        fontWeight: 500,
                                    }}
                                >
                                    {text}
                                </span>
                            </div>
                        ))}
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
                        src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1600&q=80"
                        alt="Caregiving support moment — reading together"
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
