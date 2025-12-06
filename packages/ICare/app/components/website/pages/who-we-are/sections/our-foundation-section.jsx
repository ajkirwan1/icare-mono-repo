import React from "react";
import { InfoCard } from "../cards/info-card";
import styles from "../../../../../styles/components/website/pages/who-we-are/sections/first-section.module.scss";

export function OurFoundationSection() {
    return (
        <section
            id="foundation"
            aria-label="Our foundation and mission"
            className={styles.section}
            style={{
                padding: "6rem 0",
                background: "transparent",
            }}
        >
            <div
                className={styles.grid}
                style={{
                    display: "grid",
                    gap: "3rem",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    width: "min(92vw,1100px)",
                    margin: "0 auto",
                }}
            >

                {/* === LEFT — NOW WITHOUT OUTER CARD === */}
                <InfoCard
                    title="Our foundation"
                    accent="left"
                    style={{
                        background: "transparent",    // ❌ removed card bg
                        borderRadius: "0",            // ❌ removed rounded card
                        padding: "0",                 // ❌ removed inner padding
                        boxShadow: "none",            // ❌ removed shadow
                        color: "#2f2f2f",
                    }}
                >
                    <p style={{ fontSize: "1.15rem", lineHeight: 1.6 }}>
                        <span
                            style={{
                                display: "block",
                                fontSize: "1.35rem",
                                fontWeight: 700,
                                marginBottom: ".6rem",
                                color: "#2f2f2f",
                            }}
                        >
                            Finding the right care shouldn’t be overwhelming.
                        </span>
                        Families navigate big decisions — choosing a trusted caregiver,
                        managing costs, and organising daily life. Caregivers, in turn,
                        deserve respect, fair pay, and tools that help them deliver safe,
                        attentive support.
                    </p>

                    <div style={{ marginTop: "2rem" }}>
                        <span
                            style={{
                                fontWeight: 700,
                                marginBottom: ".8rem",
                                display: "block",
                                color: "#2f2f2f",
                            }}
                        >
                            Families naturally ask:
                        </span>

                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                                display: "flex",
                                flexDirection: "column",
                                gap: ".65rem",
                            }}
                        >
                            {[
                                "Where do we start?",
                                "Does this caregiver have the right experience?",
                                "Will they be fairly paid?",
                                "Is our information secure?"
                            ].map((q) => (
                                <li
                                    key={q}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: ".65rem",
                                        color: "#3f3f3f",
                                        fontSize: "1.05rem",
                                    }}
                                >
                                    <span
                                        style={{
                                            width: "10px",
                                            height: "10px",
                                            borderRadius: "50%",
                                            background: "#B97A57",
                                        }}
                                    />
                                    <span>{q}</span>
                                </li>
                            ))}
                        </ul>

                        <p
                            style={{
                                marginTop: "1.6rem",
                                fontSize: "1.1rem",
                                color: "#2f2f2f",
                                lineHeight: 1.6,
                            }}
                        >
                            <b>At ICare, we’ve lived this journey.</b>
                            That’s why we built a platform centred on dignity, empathy,
                            and trust — bringing peace of mind to families and recognition
                            to caregivers.
                        </p>
                    </div>
                </InfoCard>

                {/* === RIGHT — SAME, JUST WITHOUT CARD === */}
                <InfoCard
                    title="Our mission"
                    accent="right"
                    style={{
                        background: "transparent",     // ❌ removed card bg
                        borderRadius: "0",
                        padding: "0",
                        boxShadow: "none",
                        color: "#2f2f2f",
                    }}
                >
                    <p
                        style={{
                            fontSize: "1.15rem",
                            lineHeight: 1.6,
                            color: "#2f2f2f",
                        }}
                    >
                        ICare grew from first-hand 24/7 live-in care experience across
                        Europe. We combine healthcare and technology expertise to create a
                        more compassionate, transparent, and secure way to match families
                        and caregivers.
                    </p>

                    <p
                        style={{
                            fontSize: "1.15rem",
                            lineHeight: 1.6,
                            marginTop: "1rem",
                            color: "#2f2f2f",
                        }}
                    >
                        We minimise friction, prioritise privacy, and keep costs fair —
                        so great care can start sooner.
                    </p>
                </InfoCard>

            </div>
        </section>
    );
}
