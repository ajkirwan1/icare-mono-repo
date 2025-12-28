import React from "react";

export default function TrustValuesSection() {
    const cards = [
        {
            k: "Trust",
            descShort: "Transparent terms and predictable care.",
            descFull: `Families always know what to expect — full transparency, no hidden margins and clear agreements.
You see who you are talking to, what the terms are, and how your caregiver works.
Trust isn’t built through marketing — it’s built through honest relationships between families and caregivers.`,
            img: "/images/web/homepage/trust.jpg",
        },
        {
            k: "Care",
            descShort: "Warm, human support.",
            descFull: `Care is not just a service — it’s a relationship. Our caregivers focus on dignity, comfort and emotional connection.
From companionship visits to full live-in continuity, families receive genuine human support with real presence.
We focus on people first – not processes, margins or bureaucracy.`,
            img: "/images/web/homepage/care.jpg",
        },
        {
            k: "Community",
            descShort: "Supportive families & caregivers.",
            descFull: `Knowledge shared between families helps everyone make better decisions and feel supported.
Our growing community connects people with similar needs, experiences and challenges — so nobody navigates care alone.
Stronger together. That’s what care should always feel like.`,
            img: "/images/web/homepage/community.jpg",
        },
    ];

    const [hoverIndex, setHoverIndex] = React.useState(null);

    const pagePad = "clamp(18px, 4vw, 70px)";
    const ease = "cubic-bezier(0.18, 0.95, 0.18, 1)";

    return (
        <section
            aria-label="Trust care and community intro + values"
            style={{
                width: "100%",
                margin: "8rem 0 8rem",
                fontFamily:
                    "Inter, system-ui, -apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
            }}
        >
            {/* HEADER: dokładnie wyrównany do lewego brzegu zdjęć */}
            <div
                style={{
                    width: "100vw",
                    marginLeft: "calc(50% - 50vw)",
                    marginRight: "calc(50% - 50vw)",
                    paddingLeft: pagePad,
                    paddingRight: pagePad,
                    boxSizing: "border-box",
                    textAlign: "left",
                    marginBottom: "2.2rem",
                }}
            >
                <h2
                    style={{
                        margin: 0,
                        fontWeight: 900,
                        fontSize: "clamp(2.1rem,3.2vw,2.6rem)",
                        letterSpacing: "-0.35px",
                        color: "#0F172A",
                    }}
                >
                    Trust, care & community
                </h2>

                <p
                    style={{
                        marginTop: "1rem",
                        fontSize: "1.22rem",
                        lineHeight: 1.72,
                        color: "#475569",
                        maxWidth: "60ch",
                    }}
                >
                    Three values that define everything we do — safe, human and connected.
                </p>
            </div>

            {/* GRID: full width, z tym samym paddingiem co nagłówek */}
            <div
                style={{
                    width: "100vw",
                    marginLeft: "calc(50% - 50vw)",
                    marginRight: "calc(50% - 50vw)",
                    paddingLeft: pagePad,
                    paddingRight: pagePad,
                    boxSizing: "border-box",
                }}
            >
                <div
                    className="trustValuesGrid"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                        gap: "40px",
                    }}
                >
                    {cards.map((item, idx) => {
                        const isOpen = hoverIndex === idx;

                        return (
                            <div
                                key={item.k}
                                onMouseEnter={() => setHoverIndex(idx)}
                                onMouseLeave={() => setHoverIndex(null)}
                                style={{
                                    position: "relative",
                                    borderRadius: 30,
                                    overflow: "hidden",
                                    cursor: "pointer",
                                    background: "#000",
                                    boxShadow: "0 10px 30px rgba(15,23,42,0.14)",
                                }}
                            >
                                <img
                                    src={item.img}
                                    alt={item.k}
                                    style={{
                                        width: "100%",
                                        height: "420px",
                                        objectFit: "cover",
                                        display: "block",
                                        // bez hover-scale
                                        transform: "none",
                                        transition: "none",
                                    }}
                                />

                                {/* gradient pod tekst */}
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        background:
                                            "linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.06) 100%)",
                                    }}
                                />

                                <div
                                    style={{
                                        position: "absolute",
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        padding: "2.2rem",
                                        color: "#fff",
                                        display: "grid",
                                        gap: ".65rem",
                                    }}
                                >
                                    <strong
                                        style={{
                                            fontSize: "1.48rem",
                                            fontWeight: 800,
                                            letterSpacing: "-0.25px",
                                        }}
                                    >
                                        {item.k}
                                    </strong>

                                    <p
                                        style={{
                                            margin: 0,
                                            fontSize: "1.15rem",
                                            lineHeight: 1.62,
                                            opacity: 0.95,
                                        }}
                                    >
                                        {item.descShort}
                                    </p>

                                    {!isOpen && (
                                        <span
                                            style={{
                                                fontSize: "1.04rem",
                                                textDecoration: "underline",
                                                opacity: 0.95,
                                            }}
                                        >
                                            Learn more
                                        </span>
                                    )}

                                    {/* wolniej + płynnie + mniejszy skok */}
                                    <div
                                        style={{
                                            overflow: "hidden",
                                            maxHeight: isOpen ? "280px" : "0px",
                                            transitionProperty: "max-height",
                                            transitionDuration: "1850ms",
                                            transitionTimingFunction: ease,
                                        }}
                                    >
                                        <div
                                            style={{
                                                paddingTop: "0.65rem",
                                                transform: isOpen
                                                    ? "translateY(0)"
                                                    : "translateY(14px)", // mniejszy skok
                                                opacity: isOpen ? 1 : 0,
                                                transitionProperty: "transform, opacity",
                                                transitionDuration: "1350ms",
                                                transitionTimingFunction: ease,
                                                transitionDelay: isOpen ? "260ms" : "0ms", // ✅ jak chciałaś
                                                willChange: "transform, opacity",
                                            }}
                                        >
                                            <p
                                                style={{
                                                    margin: 0,
                                                    fontSize: "1.05rem",
                                                    lineHeight: 1.68,
                                                    opacity: 0.9,
                                                }}
                                            >
                                                {item.descFull}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* responsywność */}
            <style>{`
        @media (max-width: 980px) {
          .trustValuesGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 26px !important;
          }
        }
        @media (max-width: 620px) {
          .trustValuesGrid {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
          }
        }
      `}</style>
        </section>
    );
}
