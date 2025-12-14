import React from "react";
import bannerImage1 from "/images/banners/banner-image-1.jpg";
import heroImage from "/images/heros/icare-hero-new.jpg";
import {
    IcareBanner,
    IcareSection,
} from "react-library";
import CareTimeline from "../components/website/pages/home/CareTimeline";
import HomePageHero from "../components/website/pages/shared/HomePageHero";



export function meta() {
    return [
        { title: "ICare | Home" },
        {
            name: "description",
            content: "ICare – Supporting better care through intuitive tools.",
        },
    ];
}

export default function Home() {
    const NEUTRAL = "#0F172A";
    const pageWrap = {
        fontFamily:
            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: NEUTRAL,
        background: "linear-gradient(180deg, #FAFCFD 0%, #FFFFFF 70%)",
    };

    return (
        <div style={pageWrap}>
            <HomePageHero imgSrc={heroImage} />
            <CareTimeline />
            <section
                aria-label="Trust, care & community"
                style={{
                    width: "100vw",
                    marginLeft: "calc(50% - 50vw)",
                    marginRight: "calc(50% - 50vw)",
                    background: "#FFF9EF",
                }}
            >
                <div
                    style={{
                        margin: "8rem auto",
                        padding:
                            "clamp(60px,8vw,110px) clamp(20px,6vw,70px)",
                        display: "grid",
                        gap: "3.5rem",
                        width: "100%",
                        fontFamily:
                            "Inter, system-ui, -apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
                    }}
                >
                    <header>
                        <h2
                            style={{
                                margin: 0,
                                fontWeight: 900,
                                fontSize:
                                    "clamp(2.1rem,3.2vw,2.6rem)",
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
                            Three values that define everything we do — safe,
                            human and connected.
                        </p>
                    </header>

                    {(() => {
                        const cards = [
                            {
                                k: "Trust",
                                descShort:
                                    "Transparent terms and predictable care.",
                                descFull: `Families always know what to expect — full transparency, no hidden margins and clear agreements.
You see who you are talking to, what the terms are, and how your caregiver works.
Trust isn’t built through marketing — it’s built through honest relationships between families and caregivers.`,
                                img: "images/web/homepage/trust.jpg",
                            },
                            {
                                k: "Care",
                                descShort: "Warm, human support.",
                                descFull: `Care is not just a service — it’s a relationship. Our caregivers focus on dignity, comfort and emotional connection.
From companionship visits to full live-in continuity, families receive genuine human support with real presence.
We focus on people first – not processes, margins or bureaucracy.`,
                                img: "images/web/homepage/care.jpg",
                            },
                            {
                                k: "Community",
                                descShort:
                                    "Supportive families & caregivers.",
                                descFull: `Knowledge shared between families helps everyone make better decisions and feel supported.
Our growing community connects people with similar needs, experiences and challenges — so nobody navigates care alone.
Stronger together. That’s what care should always feel like.`,
                                img: "images/web/homepage/community.jpg",
                            },
                        ];

                        const [hoverIndex, setHoverIndex] =
                            React.useState(null);

                        return (
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns:
                                        "repeat(auto-fit,minmax(300px,1fr))",
                                    gap: "clamp(32px,4vw,48px)",
                                }}
                            >
                                {cards.map((item, idx) => {
                                    const isOpen =
                                        hoverIndex === idx;

                                    return (
                                        <div
                                            key={item.k}
                                            onMouseEnter={() =>
                                                setHoverIndex(idx)
                                            }
                                            onMouseLeave={() =>
                                                setHoverIndex(null)
                                            }
                                            style={{
                                                position: "relative",
                                                borderRadius: 32,
                                                overflow: "hidden",
                                                cursor: "pointer",
                                                background: "#000",
                                                boxShadow:
                                                    "0 10px 30px rgba(15,23,42,0.18)",
                                            }}
                                        >
                                            {/* ⬇️ IMG – 1:1 JAK BYŁO */}
                                            <img
                                                src={item.img}
                                                alt={item.k}
                                                style={{
                                                    width: "100%",
                                                    height: "380px",
                                                    objectFit: "cover",
                                                    filter: isOpen
                                                        ? "brightness(0.8)"
                                                        : "brightness(1)",
                                                    transition:
                                                        "filter .45s ease",
                                                }}
                                            />

                                            <div
                                                style={{
                                                    position:
                                                        "absolute",
                                                    inset: 0,
                                                    background: isOpen
                                                        ? "rgba(0,0,0,0.35)"
                                                        : "rgba(0,0,0,0.25)",
                                                    transition:
                                                        "background .75s cubic-bezier(.25,.1,.25,1)",
                                                }}
                                            />

                                            <div
                                                style={{
                                                    position:
                                                        "absolute",
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    padding:
                                                        "2.4rem",
                                                    color: "#fff",
                                                    display:
                                                        "grid",
                                                    gap: ".65rem",
                                                }}
                                            >
                                                <strong
                                                    style={{
                                                        fontSize:
                                                            "1.48rem",
                                                        fontWeight: 800,
                                                        letterSpacing:
                                                            "-0.25px",
                                                        textShadow:
                                                            "0 2px 10px rgba(0,0,0,0.55)",
                                                    }}
                                                >
                                                    {item.k}
                                                </strong>

                                                <p
                                                    style={{
                                                        margin: 0,
                                                        fontSize:
                                                            "1.15rem",
                                                        lineHeight:
                                                            1.62,
                                                        opacity: isOpen
                                                            ? 0.85
                                                            : 0.95,
                                                        transition:
                                                            "opacity 1s ease",
                                                        textShadow:
                                                            "0 2px 8px rgba(0,0,0,0.55)",
                                                    }}
                                                >
                                                    {
                                                        item.descShort
                                                    }
                                                </p>

                                                {!isOpen && (
                                                    <span
                                                        style={{
                                                            marginTop:
                                                                ".15rem",
                                                            fontSize:
                                                                "1.04rem",
                                                            opacity:
                                                                0.95,
                                                            textDecoration:
                                                                "underline",
                                                            textUnderlineOffset:
                                                                "4px",
                                                            textShadow:
                                                                "0 2px 8px rgba(0,0,0,0.55)",
                                                        }}
                                                    >
                                                        Learn more
                                                    </span>
                                                )}

                                                <div
                                                    style={{
                                                        overflow:
                                                            "hidden",
                                                        maxHeight:
                                                            isOpen
                                                                ? "260px"
                                                                : "0px",
                                                        transition:
                                                            "max-height 1.3s ease",
                                                        marginTop:
                                                            isOpen
                                                                ? ".6rem"
                                                                : "0",
                                                    }}
                                                >
                                                    <p
                                                        style={{
                                                            margin: 0,
                                                            fontSize:
                                                                "1.12rem",
                                                            lineHeight:
                                                                1.72,
                                                            opacity:
                                                                isOpen
                                                                    ? 1
                                                                    : 0,
                                                            transition:
                                                                "opacity 1.3s ease",
                                                        }}
                                                    >
                                                        {
                                                            item.descFull
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })()}
                </div>
            </section>

            <IcareSection className="full-bleed">
                <IcareBanner imgSrc={bannerImage1} />
            </IcareSection>
        </div>
    );
}
