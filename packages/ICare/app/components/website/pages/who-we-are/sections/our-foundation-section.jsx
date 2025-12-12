import React from "react";
import { InfoCard } from "../cards/info-card";
import styles from "../../../../../styles/components/website/pages/who-we-are/sections/first-section.module.scss";

export function OurFoundationSection() {
    return (
        <section
            id="foundation"
            aria-label="Our foundation and mission"
            style={{
                width: "100vw",
                marginLeft: "calc(50% - 50vw)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            {/* ================= LEFT — OUR FOUNDATION ================= */}
            <div
                style={{
                    background: "#f1e2c9",
                    padding: "clamp(5.4rem, 7vw, 7.2rem) clamp(4vw, 6vw, 6rem)", // ↓ delikatnie
                    display: "flex",
                    justifyContent: "flex-end",
                }}
            >
                <div style={{ maxWidth: "600px", color: "#2f2f2f" }}>
                    <h2
                        style={{
                            fontSize: "clamp(1.95rem, 2.7vw, 2.35rem)", // ↓ minimalnie
                            fontWeight: 800,
                            lineHeight: 1.22,
                            letterSpacing: "-0.3px",
                            marginBottom: "1.4rem",
                            color: "#1B1F1A",
                        }}
                    >
                        Our foundation
                    </h2>

                    <p
                        style={{
                            fontSize: "1.13rem",
                            lineHeight: 1.65,
                            marginBottom: "1.8rem",
                        }}
                    >
                        Families navigate big decisions — choosing a trusted caregiver,
                        managing costs, and organising daily life. Caregivers, in turn,
                        deserve respect, fair pay, and tools that help them deliver safe,
                        attentive support.
                    </p>

                    <h4
                        style={{
                            fontSize: "1.15rem",
                            fontWeight: 700,
                            marginBottom: "1rem",
                        }}
                    >
                        Families naturally ask:
                    </h4>

                    <ul
                        style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            display: "grid",
                            gap: "0.65rem", // ↓ ciaśniej
                        }}
                    >
                        {[
                            "Where do we start?",
                            "Does this caregiver have the right experience?",
                            "Will they be fairly paid?",
                            "Is our information secure?",
                        ].map((q) => (
                            <li
                                key={q}
                                style={{
                                    position: "relative",
                                    paddingLeft: "1.1rem",
                                    fontSize: "1.05rem",
                                    lineHeight: 1.55,
                                }}
                            >
                                <span
                                    style={{
                                        position: "absolute",
                                        left: 0,
                                        top: ".6em",
                                        width: "6px",
                                        height: "6px",
                                        borderRadius: "50%",
                                        background: "#B97A57",
                                    }}
                                />
                                {q}
                            </li>
                        ))}
                    </ul>

                    <p
                        style={{
                            marginTop: "2rem",
                            fontSize: "1.08rem",
                            lineHeight: 1.6,
                        }}
                    >
                        <strong>At ICare, we’ve lived this journey.</strong>{" "}
                        That’s why we built a platform centred on dignity, empathy,
                        and trust — bringing peace of mind to families and recognition
                        to caregivers.
                    </p>
                </div>
            </div>

            {/* ================= RIGHT — OUR MISSION ================= */}
            <div
                style={{
                    background: "#fff9ef",
                    padding: "clamp(5.4rem, 7vw, 7.2rem) clamp(4vw, 6vw, 6rem)", // ↓ delikatnie
                    display: "flex",
                    justifyContent: "flex-start",
                }}
            >
                <div style={{ maxWidth: "600px", color: "#2f2f2f" }}>
                    <h2
                        style={{
                            fontSize: "clamp(1.95rem, 2.7vw, 2.35rem)",
                            fontWeight: 800,
                            lineHeight: 1.22,
                            letterSpacing: "-0.3px",
                            marginBottom: "1.4rem",
                            color: "#1B1F1A",
                        }}
                    >
                        Our mission
                    </h2>

                    <p
                        style={{
                            fontSize: "1.13rem",
                            lineHeight: 1.65,
                            marginBottom: "1.6rem",
                        }}
                    >
                        ICare grew from first-hand 24/7 live-in care experience across Europe.
                        We combine healthcare and technology expertise to create a more
                        compassionate, transparent, and secure way to match families and
                        caregivers.
                    </p>

                    <p
                        style={{
                            fontSize: "1.13rem",
                            lineHeight: 1.65,
                        }}
                    >
                        Our mission is to reduce stress, increase clarity, and make every
                        stage of the care journey feel more human — minimising friction,
                        prioritising privacy, and keeping costs fair so great care can start sooner.
                    </p>
                </div>
            </div>
        </section>






    );
}
