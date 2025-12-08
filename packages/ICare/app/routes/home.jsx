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
                aria-label="Trust, Care & Community"
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
                {/* TITLE */}
                <header>
                    <h2
                        style={{
                            margin: 0,
                            fontWeight: 800,
                            fontSize: "clamp(2rem,3vw,2.6rem)",
                            letterSpacing: "-0.4px",
                            color: "#0F172A",
                        }}
                    >
                        Trust, Care & Community
                    </h2>

                    <p
                        style={{
                            marginTop: "1rem",
                            fontSize: "1.08rem",
                            lineHeight: 1.65,
                            color: "#475569",
                            maxWidth: "60ch",
                            fontWeight: 400,
                        }}
                    >
                        Three values that define everything we do — safe, human and connected.
                    </p>
                </header>

                {/* GRID + HOVER LOGIC (IIFE z useState) */}
                {(() => {
                    const cards = [
                        {
                            k: "Trust",
                            descShort: "Transparent terms and predictable care.",
                            descFull:
                                "Families always know what to expect — full transparency, no hidden margins and clear agreements.",
                            img: cardImage2,
                        },
                        {
                            k: "Care",
                            descShort: "Warm, human support.",
                            descFull:
                                "From companionship visits to live-in continuity — every caregiver brings empathy and experience.",
                            img: cardImage7,
                        },
                        {
                            k: "Community",
                            descShort: "Supportive families & caregivers.",
                            descFull:
                                "Practical help, knowledge sharing and a sense of belonging — everyone grows together.",
                            img: cardImage4,
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
                                            display: "block",
                                            boxShadow: "0 10px 30px rgba(15,23,42,0.18)",
                                            transition: "box-shadow .3s ease",
                                        }}
                                        onMouseEnter={() => setHoverIndex(idx)}
                                        onMouseLeave={() => setHoverIndex(null)}
                                    >
                                        {/* IMAGE */}
                                        <img
                                            src={item.img}
                                            alt={item.k}
                                            style={{
                                                width: "100%",
                                                height: "360px",
                                                objectFit: "cover",
                                                borderRadius: 32,
                                                filter: "brightness(.9)",
                                                display: "block",
                                            }}
                                        />

                                        {/* OVERLAY */}
                                        <div
                                            style={{
                                                position: "absolute",
                                                inset: 0,
                                                background:
                                                    "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,.60) 100%)",
                                            }}
                                        />

                                        {/* TEXT CONTENT */}
                                        <div
                                            style={{
                                                position: "absolute",
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                padding: "1.9rem 2rem 2rem",
                                                color: "#fff",
                                                display: "grid",
                                                gap: ".45rem",
                                            }}
                                        >
                                            <strong
                                                style={{
                                                    fontSize: "1.35rem",
                                                    fontWeight: 700,
                                                    letterSpacing: "-0.22px",
                                                }}
                                            >
                                                {item.k}
                                            </strong>

                                            {/* SHORT LINE – zawsze widoczny, minimalna zmiana */}
                                            <p
                                                style={{
                                                    margin: 0,
                                                    fontSize: "1rem",
                                                    lineHeight: 1.5,
                                                    fontWeight: 400,
                                                    opacity: isOpen ? 0.55 : 0.9,
                                                    transition: "opacity .6s ease",
                                                }}
                                            >
                                                {item.descShort}
                                            </p>

                                            {/* "Learn more" label (tylko gdy nie hover) */}
                                            {!isOpen && (
                                                <span
                                                    style={{
                                                        marginTop: ".15rem",
                                                        fontSize: ".9rem",
                                                        opacity: 0.9,
                                                        textDecoration: "underline",
                                                        textUnderlineOffset: "3px",
                                                        fontWeight: 400,
                                                    }}
                                                >
                                                    Learn more
                                                </span>
                                            )}

                                            {/* FULL TEXT – SOFT, SLOW FADE */}
                                            <div
                                                style={{
                                                    overflow: "hidden",
                                                    maxHeight: isOpen ? "130px" : "0px",
                                                    transition:
                                                        "max-height .8s ease",
                                                    marginTop: isOpen ? ".35rem" : "0",
                                                }}
                                            >
                                                <p
                                                    style={{
                                                        margin: 0,
                                                        fontSize: ".96rem",
                                                        lineHeight: 1.6,
                                                        fontWeight: 400,
                                                        opacity: isOpen ? 1 : 0,
                                                        transition: "opacity .8s ease",
                                                        color: "rgba(241,245,249,0.96)",
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
