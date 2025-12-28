import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHandsHolding,     // ✅ dignity / respect (more caring)
    faUserShield,       // privacy by design
    faScaleBalanced,    // fair & transparent
    faShieldHeart,      // trust & safety
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
                borderRadius: "20px",
                background: bg,
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
                    gap: ".35rem",
                }}
            >
                <h3
                    style={{
                        margin: 0,
                        fontSize: "1.09rem",
                        color: "#1B1F1A",
                        fontWeight: 700,
                    }}
                >
                    {title}
                </h3>

                <p
                    style={{
                        margin: 0,
                        lineHeight: "1.45",
                        color: "#0f172a",
                        fontSize: "1rem",
                    }}
                >
                    {description}
                </p>
            </div>
        </div >
    );

    const cards = [
        {
            key: "dignity",
            title: "Dignity & Respect",
            description:
                "We put people first — families and caregivers — in every decision we make.",
            bg: "#fff9ef",
            icon: <FontAwesomeIcon icon={faHandsHolding} style={faIconStyle} />,
        },
        {
            key: "privacy",
            title: "Privacy by Design",
            description:
                "Built-in data protection and security. Your privacy is never an afterthought.",
            bg: "#fff9ef",
            icon: <FontAwesomeIcon icon={faUserShield} style={faIconStyle} />,
        },
        {
            key: "fair",
            title: "Fair & Transparent",
            description:
                "No hidden fees, no surprises. All agreements are clear, honest, and accessible.",
            bg: "#fff9ef",
            icon: <FontAwesomeIcon icon={faScaleBalanced} style={faIconStyle} />,
        },
        {
            key: "trust",
            title: "Trust & Safety",
            description:
                "Verified caregivers, secure payments, and encrypted communication — always.",
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
                    maxWidth: "1160px",
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "4rem",
                    padding: "0 2rem",
                }}
            >
                <header>
                    <h2
                        style={{
                            fontSize: "2.4rem",
                            margin: 0,
                            fontWeight: 800,
                            color: "#0f172a",
                        }}
                    >
                        Our Values
                    </h2>

                    <p
                        style={{
                            fontSize: "1.25rem",
                            marginTop: "1rem",
                            color: "#0f172a",
                            fontWeight: 600,
                        }}
                    >
                        “Care isn’t a service. It’s a shared human value.”
                    </p>

                    <p
                        style={{
                            marginTop: "1rem",
                            lineHeight: "1.6",
                            fontSize: "1rem",
                            color: "#0f172a",
                        }}
                    >
                        We build trust through fairness, clarity, and respect — every step of
                        the way. Together, we’re shaping a care system built on trust —
                        empowering families and caregivers to work as equals.
                    </p>

                    <div style={{ marginTop: "2rem", borderRadius: "18px", overflow: "hidden" }}>
                        <img
                            src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80"
                            alt="Kind caregiver supporting an elderly person"
                            style={{ width: "100%", display: "block" }}
                        />
                    </div>
                </header>

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
