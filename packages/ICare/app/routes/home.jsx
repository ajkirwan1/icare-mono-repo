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
            <section
                aria-label="Trust, care & community"
                style={{
                    width: "100%",
                    margin: "8rem 0",
                    padding: "clamp(60px,8vw,110px) clamp(20px,6vw,70px)",
                    display: "grid",
                    gap: "3.5rem",
                    background: "#FFFFFF",
                    fontFamily:
                        "Inter, system-ui, -apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
                }}
            >
                <header>
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
                </header>

                {(() => {
                    const cards = [
                        {
                            k: "Trust",
                            descShort: "Transparent terms and predictable care.",
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
                            descShort: "Supportive families & caregivers.",
                            descFull: `Knowledge shared between families helps everyone make better decisions and feel supported.
Our growing community connects people with similar needs, experiences and challenges — so nobody navigates care alone.
Stronger together. That’s what care should always feel like.`,

                            img: "images/web/homepage/community.jpg",
                        },
                    ];


                    const [hoverIndex, setHoverIndex] = React.useState(null);

                    return (
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
                                gap: "clamp(32px,4vw,48px)",
                            }}
                        >
                            {cards.map((item, idx) => {
                                const isOpen = hoverIndex === idx;

                                return (
                                    <div
                                        key={item.k}
                                        style={{
                                            position: "relative",
                                            borderRadius: 32,
                                            overflow: "hidden",
                                            cursor: "pointer",
                                            background: "#000",
                                            boxShadow: "0 10px 30px rgba(15,23,42,0.18)",
                                            transition: "box-shadow .35s ease",
                                        }}
                                        onMouseEnter={() => setHoverIndex(idx)}
                                        onMouseLeave={() => setHoverIndex(null)}
                                    >
                                        {/* ⬇️⬇️ TUTAJ JEST POPRAWIONY FRAGMENT */}
                                        <img
                                            src={item.img}
                                            alt={item.k}
                                            style={{
                                                width: "100%",
                                                height: "380px",
                                                objectFit: "cover",
                                                borderRadius: 32,

                                                /* JAŚNIEJSZY obraz, tylko lekko przyciemnia się na hoverze */
                                                filter: isOpen ? "brightness(0.8)" : "brightness(1)",
                                                transition: "filter .45s ease",
                                            }}
                                        />

                                        {/* ⬆️⬆️ KONIEC ZMIANY */}

                                        {/* overlay */}
                                        <div
                                            style={{
                                                position: "absolute",
                                                inset: 0,
                                                background: isOpen
                                                    ? "rgba(0,0,0,0.35)"   // było 0.75 — bardzo ciemne
                                                    : "rgba(0,0,0,0.25)",  // było 0.55 — ciemne
                                                transition: "background .75s cubic-bezier(.25,.1,.25,1)",
                                            }}
                                        />

                                        <div
                                            style={{
                                                position: "absolute",
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                padding: "2.4rem",
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
                                                    textShadow: "0 2px 10px rgba(0,0,0,0.55)",
                                                }}
                                            >
                                                {item.k}
                                            </strong>

                                            <p
                                                style={{
                                                    margin: 0,
                                                    fontSize: "1.15rem",
                                                    lineHeight: 1.62,
                                                    opacity: isOpen ? 0.85 : 0.95,
                                                    transition: "opacity 1s ease",
                                                    color: "#fff",
                                                    textShadow: "0 2px 8px rgba(0,0,0,0.55)",
                                                }}
                                            >
                                                {item.descShort}
                                            </p>

                                            {!isOpen && (
                                                <span
                                                    style={{
                                                        marginTop: ".15rem",
                                                        fontSize: "1.04rem",
                                                        opacity: 0.95,
                                                        textDecoration: "underline",
                                                        textUnderlineOffset: "4px",
                                                        fontWeight: 400,
                                                        color: "#fff",
                                                        textShadow: "0 2px 8px rgba(0,0,0,0.55)",
                                                    }}
                                                >
                                                    Learn more
                                                </span>
                                            )}

                                            <div
                                                style={{
                                                    overflow: "hidden",
                                                    maxHeight: isOpen ? "260px" : "0px",
                                                    transition: "max-height 1.3s ease",
                                                    marginTop: isOpen ? ".6rem" : "0",
                                                }}
                                            >
                                                <p
                                                    style={{
                                                        margin: 0,
                                                        fontSize: "1.12rem",
                                                        lineHeight: 1.72,
                                                        opacity: isOpen ? 1 : 0,
                                                        transition: "opacity 1.3s ease",
                                                        color: "rgba(255,255,255,0.98)",
                                                        textShadow: "0 2px 8px rgba(0,0,0,0.60)",
                                                    }}
                                                >
                                                    {item.descFull}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })()}
            </section>




            <IcareSection className="full-bleed">
                <IcareBanner className="full-bleed" imgSrc={bannerImage1} />
            </IcareSection>
            <IcareSection>

            </IcareSection>


            <IcareSection>
                <div
                    style={{
                        display: "flex",
                        gap: "2.4rem",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        padding: "80px 0",
                        fontFamily: "Inter, system-ui",
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
                        <div
                            key={i}
                            style={{
                                position: "relative",
                                width: "min(620px, 46vw)",
                                height: "430px",
                                borderRadius: "34px",
                                overflow: "hidden",
                                backgroundColor: "#000",
                                boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
                            }}
                        >
                            {/* IMAGE */}
                            <img
                                src={c.img}
                                alt={c.title}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    filter: "brightness(.92)",
                                }}
                            />

                            {/* OVERLAY */}
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background:
                                        "linear-gradient(to bottom, rgba(0,0,0,0.20), rgba(0,0,0,0.55))",
                                }}
                            />

                            {/* TEXT WRAPPER */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "85%",
                                    textAlign: "center",
                                }}
                            >
                                {/* TITLE */}
                                <h3
                                    style={{
                                        color: "#fff",
                                        fontSize: "clamp(1.9rem, 3vw, 2.4rem)",
                                        fontWeight: 600,
                                        marginBottom: "1rem",
                                        letterSpacing: "-0.25px",
                                        lineHeight: 1.15,
                                        textShadow: "0 6px 20px rgba(0,0,0,0.5)",
                                    }}
                                >
                                    {c.title}
                                </h3>

                                {/* EXPLORE → */}
                                <a
                                    href={c.href}
                                    style={{
                                        marginBottom: "1.6rem",
                                        fontSize: "1.08rem",
                                        color: "rgba(255,255,255,0.9)",
                                        fontWeight: 400,
                                        letterSpacing: "-0.2px",
                                        opacity: 0.95,
                                        textDecoration: "none",
                                    }}
                                >
                                    Explore →
                                </a>

                                {/* GET STARTED BUTTON */}
                                <a
                                    href="/register"
                                    style={{
                                        display: "inline-block",
                                        backgroundColor: "#b97a57",
                                        color: "#fff",
                                        fontWeight: 600,
                                        padding: "0.85rem 2.4rem",
                                        borderRadius: "999px",
                                        fontSize: "1.04rem",
                                        letterSpacing: "-0.15px",
                                        transition: "all .25s ease",
                                        boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
                                        textDecoration: "none",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = "#b97a57";
                                        e.currentTarget.style.boxShadow =
                                            "0 10px 26px rgba(0,0,0,0.22)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = "#b97a57";
                                        e.currentTarget.style.boxShadow =
                                            "0 8px 20px rgba(0,0,0,0.18)";
                                    }}
                                >
                                    Get started
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </IcareSection>


        </IcarePage>
    );
}
