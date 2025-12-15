import React from "react";
import { Link } from "react-router";

export default function ReceiversContactCTA() {
    return (
        <section
            aria-label="Contact CTA"
            style={{
                marginTop: 64,
                marginLeft: "calc(50% - 50vw)",
                marginRight: "calc(50% - 50vw)",
                width: "100vw",
                background:
                    "linear-gradient(135deg, #4C7865 0%, #3D5F50 40%, #2E4A3D 100%)",
                color: "#F3F7F5",
                paddingTop: 80,
                paddingBottom: 80,
                boxShadow: "0 -4px 22px rgba(0,0,0,0.15)",
            }}
        >
            <div
                style={{
                    width: "min(92vw, 1100px)",
                    margin: "0 auto",
                    padding: "0 clamp(20px,4vw,48px)",
                    display: "grid",
                    gap: 24,
                }}
            >
                {/* TITLE */}
                <h4
                    style={{
                        margin: 0,
                        fontSize: "clamp(1.8rem, 3vw, 2.3rem)",
                        fontWeight: 900,
                        letterSpacing: "-0.5px",
                        color: "#ffffff",
                        textShadow: "0 2px 8px rgba(0,0,0,0.35)",
                    }}
                >
                    Ready to start?
                </h4>

                {/* SUBTEXT */}
                <p
                    style={{
                        margin: 0,
                        maxWidth: 760,
                        fontSize: "1.15rem",
                        lineHeight: 1.65,
                        color: "rgba(255,255,255,0.92)",
                        textShadow: "0 1px 5px rgba(0,0,0,0.3)",
                    }}
                >
                    Tell us what you need — we’ll help you find trusted caregivers that match
                    your situation.
                </p>

                {/* CTA BUTTON */}
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 20 }}>
                    <Link
                        to="/register"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "14px 32px",
                            borderRadius: 999,
                            background: "#FFFFFF",
                            color: "#2E4A3D",
                            fontWeight: 800,
                            fontSize: "1.1rem",
                            textDecoration: "none",
                            letterSpacing: ".3px",
                            boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
                            transition: "all .25s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow =
                                "0 16px 36px rgba(0,0,0,0.32)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                                "0 12px 28px rgba(0,0,0,0.25)";
                        }}
                    >
                        Register
                    </Link>
                </div>
            </div>
        </section>
    );
}
