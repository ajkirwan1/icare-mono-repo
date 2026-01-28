import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHandsHolding,
    faUserShield,
    faScaleBalanced,
    faShieldHeart,
} from "@fortawesome/free-solid-svg-icons";

export function OurValuesSection() {
    const faIconStyle = {
        fontSize: 23,
        color: "#000",
        opacity: 0.85,
        lineHeight: 1,
        flexShrink: 0,
    };

    const ValuesCard = ({ icon, title, description, bg }) => (
        <div
            style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1.4rem",
                padding: "1.8rem 1.6rem",

            }}
        >
            <div style={{ display: "flex", alignItems: "flex-start", paddingTop: 2 }}>
                {icon}
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: ".4rem",
                }}
            >
                {/* ✅ h3 — 1.5rem / 600 */}
                <h3
                    style={{
                        margin: 0,
                        fontSize: "1.35rem",
                        fontWeight: 600,
                        lineHeight: 1.25,
                        color: "#1B1F1A",
                    }}
                >
                    {title}
                </h3>

                {/* ✅ p — 1.22rem / 400 */}
                <p
                    style={{
                        margin: 0,
                        fontSize: "1.15rem",
                        fontWeight: 400,
                        lineHeight: 1.6,
                        color: "#0f172a",
                    }}
                >
                    {description}
                </p>
            </div>
        </div>
    );

    const cards = [
        {
            key: "dignity",
            title: "Dignity & Respect",
            description:
                "Care is organised around people, not transactions.",
            bg: "#fff9ef",
            icon: <FontAwesomeIcon icon={faHandsHolding} style={faIconStyle} />,
        },
        {
            key: "privacy",
            title: "Privacy by Design",
            description:
                "Data protection and security are built into the platform from the start.",
            bg: "#fff9ef",
            icon: <FontAwesomeIcon icon={faUserShield} style={faIconStyle} />,
        },
        {
            key: "fair",
            title: "Fair & Transparent",
            description:
                "No hidden fees. Clear agreements and upfront expectations.",
            bg: "#fff9ef",
            icon: <FontAwesomeIcon icon={faScaleBalanced} style={faIconStyle} />,
        },
        {
            key: "trust",
            title: "Trust & Safety",
            description:
                "Identity verification, secure messaging and clear documentation where required.",
            bg: "#fff9ef",
            icon: <FontAwesomeIcon icon={faShieldHeart} style={faIconStyle} />,
        },
    ];

    return (
        <section
            id="values"
            aria-label="ICare values"
            style={{
                width: "100%",
                padding: "5rem 0",
                background: "#FFFFFF",
            }}
        >
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "4rem",
                    padding: "0 2rem",
                }}
            >
                {/* LEFT CONTENT */}
                <header>
                    <h2
                        style={{
                            fontSize: "2.8rem",
                            margin: 0,
                            fontWeight: 500,
                            color: "#0f172a",
                        }}
                    >
                        Our standards
                    </h2>

                    <p
                        style={{
                            fontSize: "1.4rem",
                            marginTop: "1rem",
                            color: "#0f172a",
                            fontWeight: 500,
                        }}
                    >
                        Care is built on trust, responsibility and mutual respect.
                        ICare supports arrangements that treat families and caregivers as equals.

                    </p>


                    <div
                        style={{
                            marginTop: "2rem",
                            borderRadius: "18px",
                            overflow: "hidden",
                        }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80"
                            alt="Kind caregiver supporting an elderly person"
                            style={{ width: "100%", display: "block" }}
                        />
                    </div>
                </header>

                {/* RIGHT CARDS */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr",
                        gap: "1.6rem",
                    }}
                >
                    {cards.map((card) => (
                        <ValuesCard key={card.key} {...card} />
                    ))}
                </div>
            </div>
        </section>
    );
}
