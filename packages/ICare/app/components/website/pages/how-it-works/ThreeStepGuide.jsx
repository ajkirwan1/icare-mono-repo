import React from "react";
import VideoSection from "../../common/sections/VideoSection";

export default function ThreeStepGuide() {
    const steps = [
        {
            title: "Create your profile",
            desc: "Introduce yourself, choose your role, and tell us what support you need or offer.",
            img: "images/web/how-it-works/first.png",
        },
        {
            title: "Get matched instantly",
            desc: "Browse verified caregivers or care receivers that match your needs and preferences.",
            img: "images/web/how-it-works/digital.png",
        },
        {
            title: "Start working together",
            desc: "Agree on the details, sign the contract, and begin high-quality, safe care.",
            img: "images/web/how-it-works/typing.png",
        },
    ];

    return (
        <section
            id="how-it-works-steps"
            aria-label="Three steps"
            style={{
                marginLeft: "calc(50% - 50vw)",
                marginRight: "calc(50% - 50vw)",
                width: "100vw",
                background: "rgba(255, 249, 239, 0.85)",
                borderTop: "1px solid rgba(15,23,42,0.06)",
                borderBottom: "1px solid rgba(15,23,42,0.06)",
                padding: "clamp(3.8rem, 6.2vw, 5.6rem) 0",
                scrollMarginTop: "110px",
                fontFamily:
                    "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <div
                style={{
                    maxWidth: 1180,
                    margin: "0 auto",
                    padding: "0 clamp(22px,4vw,44px)",
                }}
            >
                {/* HEADER (match HomePage: H1 + H2 + P sizing/weights) */}
                <h2
                    style={{
                        margin: 0,
                        fontWeight: 500,
                        letterSpacing: "-0.6px",
                        lineHeight: 1.14,
                        fontSize: "clamp(2.25rem, 3vw, 2.6rem)",
                        color: "#0F172A",
                    }}
                >
                    Get started in 3 simple steps
                </h2>

                <p
                    style={{
                        margin: "18px 0 0",
                        color: "#0F172A",
                        fontWeight: 400,
                        lineHeight: 1.65,
                        fontSize: "1.4rem",
                        maxWidth: "78ch",
                    }}
                >
                    A calmer, guided process.<br />A simpler way to search, speak and agree care directly.
                </p>

                <div style={{ height: "30px" }} />



                <VideoSection
                    videoSrc="images/web/how-it-works/howitworks.mp4"
                >
                </VideoSection>



                <div style={{ height: "clamp(2.0rem, 3.2vw, 2.8rem)" }} />

                {/* CTA BUTTON (orange) */}
                <div>
                    <a
                        href="/register"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 12,
                            textDecoration: "none",
                            color: "#fff",
                            background: "#778d43",
                            padding: "0.95rem 1.8rem",
                            borderRadius: 999,
                            fontWeight: 850,
                            letterSpacing: ".01em",
                            fontSize: "1rem",
                            border: "1px solid rgba(0,0,0,0.08)",
                            transition: "transform .18s ease, filter .18s ease",
                        }}

                    >
                        Create your free account
                    </a>
                </div>
            </div>
        </section>
    );
}
