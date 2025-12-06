import React from "react";
import cardImage from "/images/web-cards/web-card-image-1.jpg";
import cardImage3 from "/images/web-cards/web-card-image-3.jpg";
import cardImage5 from "/images/heros/who-we-are.jpg";
import cardImage4 from "/images/web-cards/web-card-image-4.jpg";
import bannerImage1 from "/images/banners/banner-image-1.jpg";
import cardImage2 from "/images/web-cards/web-card-image-2.jpg";
import cardImage6 from "/images/heros/icare-for-caregivers.jpg";
import cardImage7 from "/images/heros/icare-for-carereceivers.jpg";
import heroImage from "/images/heros/icare-hero-new.jpg";
import { IcareBanner, IcareCard, IcarePage, IcareSection, IcareWebBlock, IcareWebMinihero } from "react-library";
import HeroComponent from "../components/hero/hero-component";
import CareTimeline from "../components/website/pages/home/CareTimeline";
import FeatureBlockLeft from "../components/website/pages/home/sections/FeatureBlockLeft";
import FeatureBlockRight from "../components/website/pages/home/sections/FeatureBlockRight";
import TrustCareGrid from "../components/website/pages/home/sections/TrustCareGrid";




function ICareReviewBadge() {
    const reviews = [
        "Trusted by 8,000+ families",
        "Rated 4.9 ★★★★★",
        "Safe • Verified • Human-centered",
    ];

    const [i, setI] = React.useState(0);

    React.useEffect(() => {
        const t = setInterval(() => {
            setI((prev) => (prev + 1) % reviews.length);
        }, 4200);
        return () => clearInterval(t);
    }, []);

    return (
        <div
            style={{
                position: "absolute",

                /* 🔽 jeszcze niżej: +100px */
                top: "calc(10% + 120px)",
                right: "3%",

                zIndex: 90,
                display: "inline-flex",
                alignItems: "center",

                /* +20% bigger */
                gap: ".85rem",
                padding: ".9rem 1.6rem",
                borderRadius: "20px",

                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                border: "1px solid rgba(255,255,255,0.28)",

                boxShadow: "0 6px 14px rgba(0,0,0,0.20)",

                animation: "softFadeIn 0.8s ease forwards",
                opacity: 0.92,
            }}
        >
            {/* ICON — +20% */}
            <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ opacity: 0.9 }}
            >
                <path d="M12 2l7 4v5c0 5-3.5 9-7 11-3.5-2-7-6-7-11V6l7-4z" />
                <path d="M9 12l2 2 4-4" />
            </svg>

            {/* TEXT — +20% */}
            <span
                key={i}
                style={{
                    fontSize: "1.24rem",
                    fontWeight: 600,
                    color: "white",
                    letterSpacing: "0.01em",
                    animation: "fadeSlide .35s ease",
                    whiteSpace: "nowrap",
                }}
            >
                {reviews[i]}
            </span>

            <style>{`
                @keyframes fadeSlide {
                    0% { opacity: 0; transform: translateY(4px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                @keyframes softFadeIn {
                    0% { opacity: 0; transform: translateY(4px); }
                    100% { opacity: 0.92; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}









export function meta() {
    return [
        { title: "ICare | Home" },
        { name: "description", content: "ICare – Supporting better care through intuitive tools." }
    ];
}

export default function Home() {

    return (
        <IcarePage>

            {/* HERO */}
            <HeroComponent imgSrc={heroImage} />

            {/* ⭐⭐⭐ BADGE W HERO */}
            <ICareReviewBadge />



            {/* === DALEJ CAŁA TWOJA STRONA — BEZ ZMIAN === */}
            {/* ...TWÓJ PEŁNY KOD PONIŻEJ – NIC NIE ZMIENIAŁAM... */}



            <CareTimeline />
            <FeatureBlockLeft
                imgSrc={cardImage}
                header="Connecting care with trust"
                body="Easily connect with trusted caregivers or people who need care — right from your phone or computer. Quickly find the right match based on location, needs, and qualifications. Set up and manage care agreements with simple tools for scheduling and contracts.

Get Started
"
            />
            <FeatureBlockRight
                imgSrc={cardImage3}
                header="Safety comes first"
                body="YYour information stays safe and private thanks to strong built-in security and encrypted communication. Every caregiver profile is verified and reviewed for authenticity — so you can focus on what truly matters."
                cta={
                    <a href="/register" className="your-button-styles">
                        Learn More
                    </a>
                }
            />
            <TrustCareGrid
                items={[
                    {
                        k: "Trust",
                        desc: "Clear, transparent and predictable — so every family feels safe.",
                        img: cardImage2,
                        color: "#4C7865",
                        iconBg: "rgba(76,120,101,0.14)",

                        icon: (
                            <svg
                                viewBox="0 0 24 24"
                                width="38"
                                height="38"
                                stroke="#4C7865"
                                fill="none"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 3l7 3v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" />
                                <path d="M9.2 12.5l2.1 2.2 4.2-4.4" />
                            </svg>
                        ),
                    },

                    {
                        k: "Care",
                        desc: "Human support — from companionship to full live-in continuity.",
                        img: cardImage7,
                        color: "#A6725A",
                        iconBg: "rgba(166,114,90,0.16)",

                        icon: (
                            <svg
                                viewBox="0 0 24 24"
                                width="38"
                                height="38"
                                stroke="#A6725A"
                                fill="none"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 20c4.8-3 8-6.8 8-11V7l-8-4-8 4v2c0 4.2 3.2 8 8 11z" />
                                <path d="M9 12l2 2 4-4" />
                            </svg>
                        ),
                    },
                ]}
            />

            <IcareSection className="full-bleed">
                <IcareBanner className="full-bleed" imgSrc={bannerImage1} />
            </IcareSection>
            <IcareSection>

            </IcareSection>


            <IcareSection>
                <div
                    style={{
                        display: "flex",
                        gap: "2rem",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        padding: "40px 0",
                        fontFamily:
                            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                    }}
                >
                    {[
                        {
                            img: cardImage4,
                            href: "/icare-for-caregivers",
                            title: "ICare for Caregivers",
                        },
                        {
                            img: cardImage5,
                            href: "/icare-for-carereceivers",
                            title: "ICare for Care Receivers",
                        },
                    ].map((c, i) => (
                        <a
                            key={i}
                            href={c.href}
                            style={{
                                position: "relative",
                                display: "block",
                                width: "min(640px, 46vw)",
                                height: "420px",
                                borderRadius: "26px",
                                overflow: "hidden",
                                boxShadow: "0 8px 28px rgba(0,0,0,0.12)",
                                textDecoration: "none",
                                backgroundColor: "#000",
                                transition: "transform 0.4s ease",
                            }}
                            onMouseEnter={(e) => {
                                const img = e.currentTarget.querySelector("img");
                                if (img) {
                                    img.style.transform = "scale(1.1)";
                                    img.style.filter = "brightness(1.20)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                const img = e.currentTarget.querySelector("img");
                                if (img) {
                                    img.style.transform = "scale(1)";
                                    img.style.filter = "brightness(1)";
                                }
                            }}
                        >
                            {/* Background image */}
                            <img
                                src={c.img}
                                alt={c.title}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    transition: "transform 0.6s ease, filter 0.6s ease",
                                    transform: "scale(1)",
                                    filter: "brightness(1)",
                                }}
                            />

                            {/* Overlay */}
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background:
                                        "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.55))",
                                }}
                            />

                            {/* Center content */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    textAlign: "center",
                                    width: "85%",
                                }}
                            >
                                <h3
                                    style={{
                                        color: "#fff",
                                        fontSize: "clamp(2rem, 3vw, 2.4rem)", // editorial
                                        fontWeight: 900, // stronger, Airbnb style
                                        marginBottom: "1.5rem",
                                        letterSpacing: "-0.35px",
                                        lineHeight: 1.14,
                                        textShadow: "0 3px 12px rgba(0,0,0,0.4)",
                                    }}
                                >
                                    {c.title}
                                </h3>

                                {/* Button */}
                                <div
                                    style={{
                                        display: "inline-block",
                                        backgroundColor: "#a5a5a5",
                                        color: "#fff",
                                        fontWeight: 700,
                                        padding: "0.9rem 2.4rem",
                                        borderRadius: "999px",
                                        fontSize: "1.05rem",
                                        letterSpacing: "-0.2px", // cleaner editorial
                                        boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                                        transition: "all 0.3s ease",
                                        backdropFilter: "blur(4px)",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = "#000";
                                        e.currentTarget.style.transform = "scale(1.05)";
                                        e.currentTarget.style.boxShadow =
                                            "0 6px 18px rgba(0,0,0,0.25)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = "#a5a5a5";
                                        e.currentTarget.style.transform = "scale(1)";
                                        e.currentTarget.style.boxShadow =
                                            "0 4px 14px rgba(0,0,0,0.15)";
                                    }}
                                >
                                    Get started
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </IcareSection>

        </IcarePage>
    );
}
