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


/* ===== QUICK FINDER — Airbnb-style bar with icons, centered higher ===== */
function QuickFinderCard() {
    const BRAND = "#1FAB1F";
    const [where, setWhere] = React.useState("");
    const [type, setType] = React.useState("live-in");
    const [lang, setLang] = React.useState("en");

    const handleSearch = (e) => {
        e.preventDefault();
        const q = new URLSearchParams({ where, type, lang }).toString();
        window.location.href = `/search?${q}`;
    };

    return (
        <div
            style={{
                position: "absolute",
                left: "75%",
                top: "15%", // ⬆️ 30% wysokości hero
                transform: "translateX(-50%)",
                zIndex: 30,
                width: "min(880px, 92vw)",
            }}
        >
            <form
                onSubmit={handleSearch}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 0,
                    height: 54,
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,.55)",
                    background: "rgba(255, 255, 255, 0.29)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    boxShadow: "0 8px 28px rgba(15,23,42,.25)",
                    overflow: "hidden",
                    transition: "box-shadow .25s ease, transform .2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 12px 38px rgba(15,23,42,.3)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 8px 28px rgba(15,23,42,.25)")}
            >
                {/* Location */}
                <div style={{ display: "flex", alignItems: "center", flex: "1.4", padding: "0 20px" }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ color: BRAND, marginRight: 10 }}
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input
                        type="text"
                        placeholder="City or postcode"
                        value={where}
                        onChange={(e) => setWhere(e.target.value)}
                        style={{
                            flex: 1,
                            border: "none",
                            outline: "none",
                            background: "transparent",
                            fontSize: "0.95rem",
                            fontWeight: 600,
                            color: "#0F172A",
                        }}
                    />
                </div>

                {/* Divider */}
                <div style={{ width: 1, height: 32, background: "rgba(0,0,0,.12)" }} />

                {/* Type */}
                <div style={{ display: "flex", alignItems: "center", flex: ".9", padding: "0 18px" }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ color: BRAND, marginRight: 10 }}
                    >
                        <path d="M3 12h18M12 3v18" />
                    </svg>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        style={{
                            flex: 1,
                            border: "none",
                            outline: "none",
                            background: "transparent",
                            fontSize: "0.95rem",
                            fontWeight: 600,
                            color: "#0F172A",
                            cursor: "pointer",
                        }}
                    >
                        <option value="live-in">Live-in</option>
                        <option value="hourly">Hourly</option>
                        <option value="night">Night care</option>
                        <option value="specialist">Specialist</option>
                    </select>
                </div>

                {/* Divider */}
                <div style={{ width: 1, height: 32, background: "rgba(0,0,0,.12)" }} />

                {/* Language */}
                <div style={{ display: "flex", alignItems: "center", flex: ".9", padding: "0 18px" }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ color: BRAND, marginRight: 10 }}
                    >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" />
                    </svg>
                    <select
                        value={lang}
                        onChange={(e) => setLang(e.target.value)}
                        style={{
                            flex: 1,
                            border: "none",
                            outline: "none",
                            background: "transparent",
                            fontSize: "0.95rem",
                            fontWeight: 600,
                            color: "#0F172A",
                            cursor: "pointer",
                        }}
                    >
                        <option value="en">English</option>
                        <option value="pl">Polski</option>
                        <option value="de">Deutsch</option>
                        <option value="nl">Nederlands</option>
                        <option value="it">Italiano</option>
                    </select>
                </div>

                {/* Search button */}
                <button
                    type="submit"
                    style={{
                        flexShrink: 0,
                        height: 64,
                        width: 100,
                        background: BRAND,
                        color: "#fff",
                        border: "none",
                        fontWeight: 900,
                        fontSize: "1rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    Search
                </button>
            </form>

            {/* Responsywność */}
            <style>{`
        @media (max-width: 900px) {
          form {
            flex-direction: column;
            height: auto;
            border-radius: 20px;
            padding: 16px;
            gap: 10px;
          }
          form select, form input, form button {
            width: 100%;
            height: 46px;
            border-radius: 12px;
            background: rgba(255,255,255,.95);
          }
          form button {
            background: ${BRAND};
            color: #fff;
          }
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

            <HeroComponent imgSrc={heroImage} />
            {/* 🔍 QUICK FINDER (formularz wyszukiwania) */}
            <QuickFinderCard />

            <section
                aria-label="Care timeline with photos"
                style={{
                    width: "100%",
                    background: "#FFFFFF",
                    padding: "clamp(5rem, 8vw, 7rem) 0",
                    fontFamily:
                        "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                }}
            >
                <div style={{ width: "min(1180px, 92vw)", margin: "0 auto" }}>

                    {/* HEADER */}
                    <header style={{ textAlign: "center", marginBottom: "clamp(3rem,5vw,4.8rem)" }}>
                        <h2
                            style={{
                                margin: 0,
                                fontWeight: 900,
                                fontSize: "clamp(2.2rem,3vw,2.8rem)",
                                color: "#0F172A",
                                letterSpacing: "-0.4px",
                            }}
                        >
                            A guided - human way to find trusted care
                        </h2>

                        <p
                            style={{
                                marginTop: "1.2rem",
                                maxWidth: "60ch",
                                marginInline: "auto",
                                color: "#475569",
                                fontSize: "1.18rem",
                                lineHeight: 1.75,
                                fontWeight: 500,
                            }}
                        >
                            Clear and transparent steps to finding the caregiver who fits your family.
                        </p>
                    </header>

                    {/* TIMELINE */}
                    <div style={{ position: "relative", maxWidth: 1050, margin: "0 auto", paddingTop: "4rem" }}>

                        {/* connecting line */}
                        <div
                            style={{
                                position: "absolute",
                                top: "88px",
                                left: "8%",
                                right: "8%",
                                height: "2px",
                                background: "rgba(76,120,101,0.20)",
                                zIndex: 1,
                            }}
                        />

                        {/* 3 STEPS */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3,1fr)",
                                gap: "clamp(1rem,2vw,2rem)",
                                position: "relative",
                                zIndex: 2,
                            }}
                        >
                            {[
                                {
                                    title: "Explore profiles",
                                    desc: "See experience, languages, personality & care style.",
                                    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80",
                                    iconBg: "#E6F5EE",
                                    iconColor: "#4C7865",
                                    icon: (
                                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                                            <circle cx="11" cy="11" r="7" stroke="#4C7865" strokeWidth="1.2" />
                                            <line x1="21" y1="21" x2="16.2" y2="16.2" stroke="#4C7865" strokeWidth="1.2" strokeLinecap="round" />
                                        </svg>
                                    ),
                                },
                                {
                                    title: "Start a conversation",
                                    desc: "Private, safe and warm messaging for families.",
                                    img: "https://images.unsplash.com/photo-1598971639058-cd7e5f9f01aa?auto=format&fit=crop&w=800&q=80",
                                    iconBg: "#EDF3FB",
                                    iconColor: "#5F6C80",
                                    icon: (
                                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                                            <rect x="3" y="10" width="18" height="11" rx="2" stroke="#5F6C80" strokeWidth="1.2" />
                                            <path d="M7 10V7a5 5 0 0 1 10 0v3" stroke="#5F6C80" strokeWidth="1.2" />
                                        </svg>
                                    ),
                                },
                                {
                                    title: "Agree fair terms",
                                    desc: "Set expectations and rate in a calm, transparent way.",
                                    img: "https://images.unsplash.com/photo-1521165943319-5b4dc3f26f32?auto=format&fit=crop&w=900&q=80",
                                    iconBg: "#F3F0FA",
                                    iconColor: "#7E69B6",
                                    icon: (
                                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                                            <rect x="4" y="10" width="16" height="10" rx="2" stroke="#7E69B6" strokeWidth="1.2" />
                                            <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="#7E69B6" strokeWidth="1.2" />
                                        </svg>
                                    ),
                                },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    style={{
                                        textAlign: "center",
                                        animation: `fadeUp .7s ease forwards ${0.15 + i * 0.22}s`,
                                        opacity: 0,
                                        transform: "translateY(20px)",
                                    }}
                                >
                                    {/* ICON */}
                                    <div
                                        style={{
                                            width: 92,
                                            height: 92,
                                            borderRadius: "50%",
                                            background: item.iconBg,
                                            display: "grid",
                                            placeItems: "center",
                                            border: `1px solid ${item.iconColor}33`,
                                            margin: "0 auto 1.4rem",
                                            boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                                        }}
                                    >
                                        {item.icon}
                                    </div>

                                    {/* MINI PHOTO */}
                                    <div
                                        style={{
                                            width: 82,
                                            height: 82,
                                            borderRadius: 18,
                                            overflow: "hidden",
                                            margin: "0 auto 1.2rem",
                                            boxShadow: "0 10px 26px rgba(0,0,0,0.08)",
                                        }}
                                    >
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                objectPosition: "center",
                                            }}
                                        />
                                    </div>

                                    {/* TEXT */}
                                    <h3
                                        style={{
                                            margin: 0,
                                            fontWeight: 800,
                                            fontSize: "1.22rem",
                                            color: "#0F172A",
                                            marginBottom: ".4rem",
                                        }}
                                    >
                                        {item.title}
                                    </h3>

                                    <p
                                        style={{
                                            margin: 0,
                                            maxWidth: "32ch",
                                            marginInline: "auto",
                                            color: "#475569",
                                            lineHeight: 1.65,
                                            fontSize: "1rem",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <style>{`
        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `}</style>
            </section>






            {/* === BLOK 1: ICare (image left) === */}
            <IcareWebBlock
                imgSrc={cardImage}
                style={{
                    background: "#F4F5F4",
                    borderRadius: "28px",
                    padding: "clamp(3.2rem, 5vw, 4.2rem) clamp(1.5rem, 4vw, 3rem)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "2.5rem",
                    flexDirection: "row",
                    boxShadow: "0 6px 24px rgba(0,0,0,0.04)",
                    marginBottom: "clamp(48px, 6vw, 72px)",
                    maxWidth: 1200,
                    marginInline: "auto",
                    border: "1px solid rgba(0,0,0,0.04)",
                }}
            >
                {/* === HEADER (Airbnb typography) ==================================== */}
                <span
                    slot="header-contents"
                    style={{
                        display: "block",
                        fontSize: "clamp(2.05rem, 3.8vw, 2.35rem)", // bardziej “airy”
                        fontWeight: 900,
                        color: "#0F172A",
                        marginBottom: "1.25rem",
                        lineHeight: 1.12, // Airbnb: ciaśniejszy heading
                        letterSpacing: "-0.35px", // Airbnb signature
                        fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial",
                    }}
                >
                    Connecting care with trust
                </span>

                {/* === BODY (Airbnb body text) ====================================== */}
                <span
                    slot="body-contents"
                    style={{
                        fontSize: "clamp(1rem, 1.2vw, 1.1rem)",
                        lineHeight: 1.82, // bardziej airy
                        color: "rgba(15, 23, 42, 0.72)", // delikatny, premium neutral
                        fontWeight: 400, // lżejszy tekst
                        maxWidth: "640px",
                        display: "block",
                        marginBottom: "1.75rem",
                        letterSpacing: "0.25px", // Airbnb micro-tracking
                        fontFamily:
                            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                    }}
                >
                    Easily connect with trusted caregivers or people who need care — right from your
                    phone or computer. Quickly find the right match based on location, needs, and
                    qualifications. Set up and manage care agreements with simple tools for scheduling
                    and contracts.
                </span>
            </IcareWebBlock>


            {/* === BLOK 2: Safety (image right) === */}
            <IcareSection
                style={{
                    backgroundColor: "#ffffff",
                    padding: "clamp(2.5rem, 5vw, 4rem) 0",
                }}
            >
                <IcareWebBlock
                    imgSrc={cardImage3}
                    style={{
                        background: "#F7F5F0",                  // premium warm beige
                        borderRadius: "28px",
                        padding: "clamp(3rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3rem)",
                        boxShadow: "0 6px 22px rgba(0,0,0,0.03)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "2.5rem",
                        flexDirection: "row-reverse",           // IMG RIGHT
                        maxWidth: 1200,
                        marginInline: "auto",
                        border: "1px solid rgba(0,0,0,0.04)",
                        fontFamily:
                            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                    }}
                >

                    {/* ================= HEADER ================= */}
                    <span
                        slot="header-contents"
                        style={{
                            display: "block",
                            fontSize: "clamp(2rem, 3.3vw, 2.35rem)",
                            fontWeight: 900,
                            color: "#0F172A",
                            marginBottom: "1.1rem",
                            lineHeight: 1.13,
                            letterSpacing: "-0.25px",           // Airbnb headline
                        }}
                    >
                        Safety comes first
                    </span>

                    {/* ================= BODY (Airbnb light) ================= */}
                    <span
                        slot="body-contents"
                        style={{
                            fontSize: "clamp(1rem, 1.2vw, 1.1rem)",
                            lineHeight: 1.82,                   // airy text
                            color: "rgba(15,23,42,0.72)",       // soft premium neutral
                            fontWeight: 400,                    // Airbnb-style lightweight
                            maxWidth: "620px",
                            display: "block",
                            marginBottom: "1.75rem",
                            letterSpacing: "0.25px",            // premium micro-tracking
                        }}
                    >
                        Your information stays safe and private thanks to strong built-in security
                        and encrypted communication. Every caregiver profile is verified and
                        reviewed for authenticity — so you can focus on what truly matters.
                    </span>

                    {/* ================= CTA BUTTON ================= */}
                    <a
                        href="/register"
                        style={{
                            display: "inline-block",
                            padding: "1.05rem 2.4rem",
                            background: "linear-gradient(90deg, #4C7865 0%, #6CAF8E 100%)",
                            color: "#fff",
                            fontWeight: 800,
                            fontSize: "1.05rem",
                            letterSpacing: "0.04em",
                            borderRadius: 999,
                            textDecoration: "none",
                            boxShadow: "0 4px 14px rgba(76,120,101,0.25)",
                            transition: "all .3s ease",
                            textAlign: "center",
                            cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-3px)";
                            e.currentTarget.style.filter = "brightness(1.08)";
                            e.currentTarget.style.boxShadow = "0 8px 24px rgba(76,120,101,0.35)";
                            e.currentTarget.style.background =
                                "linear-gradient(90deg, #6CAF8E 0%, #4C7865 100%)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.filter = "brightness(1)";
                            e.currentTarget.style.boxShadow = "0 4px 14px rgba(76,120,101,0.25)";
                            e.currentTarget.style.background =
                                "linear-gradient(90deg, #4C7865 0%, #6CAF8E 100%)";
                        }}
                    >
                        Learn More
                    </a>

                </IcareWebBlock>

            </IcareSection>



            <IcareSection className="full-bleed">
                <IcareBanner className="full-bleed" imgSrc={bannerImage1} />
            </IcareSection>
            <IcareSection>
                <section
                    aria-label="Trust & Care — photography-forward"
                    style={{
                        marginLeft: "calc(50% - 50vw)",
                        marginRight: "calc(50% - 50vw)",
                        width: "100vw",
                        background: "linear-gradient(180deg, #FAF9F7 0%, #FFFFFF 80%)",
                        padding: "96px 0 110px",
                        fontFamily:
                            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                    }}
                >
                    <div
                        style={{
                            maxWidth: 1480,
                            margin: "0 auto",
                            padding: "0 clamp(24px, 4vw, 48px)",
                        }}
                    >
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(520px, 1fr))",
                                gap: 56,
                                alignItems: "stretch",
                            }}
                        >
                            {[
                                {
                                    k: "Trust",
                                    desc: "Clear, transparent and predictable — so every family feels safe.",
                                    img: cardImage2,

                                    /* NOWY KOLOR: ZIELONY BRAND */
                                    color: "#4C7865",
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
                                    iconBg: "rgba(76,120,101,0.14)",
                                },

                                {
                                    k: "Care",
                                    desc: "Human support — from companionship to full live-in continuity.",
                                    img: cardImage7,

                                    /* NOWY KOLOR: ROSE-TAN */
                                    color: "#A6725A",
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
                                    iconBg: "rgba(166,114,90,0.16)",
                                },
                            ].map((c, i) => (
                                <article
                                    key={i}
                                    style={{
                                        borderRadius: 32,
                                        background: "#FFFFFF",
                                        overflow: "hidden",
                                        border: "1px solid rgba(0,0,0,0.05)",
                                        display: "flex",
                                        flexDirection: "column",
                                        boxShadow: "0 10px 28px rgba(0,0,0,0.06)",
                                        transition: "transform .3s ease, box-shadow .3s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-6px)";
                                        e.currentTarget.style.boxShadow =
                                            "0 18px 38px rgba(0,0,0,0.10)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.boxShadow =
                                            "0 10px 28px rgba(0,0,0,0.06)";
                                    }}
                                >
                                    {/* IMAGE */}
                                    <div
                                        style={{
                                            height: "420px",
                                            width: "100%",
                                            overflow: "hidden",
                                            borderBottom: "1px solid rgba(0,0,0,0.06)",
                                        }}
                                    >
                                        <img
                                            src={c.img}
                                            alt={c.k}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </div>

                                    {/* TEXT */}
                                    <div style={{ padding: "32px 36px 42px" }}>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 18,
                                                marginBottom: "1.4rem",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: 60,
                                                    height: 60,
                                                    borderRadius: "50%",
                                                    background: c.iconBg,
                                                    display: "grid",
                                                    placeItems: "center",
                                                    border: `1px solid ${c.color}33`,
                                                }}
                                            >
                                                {c.icon}
                                            </div>

                                            <h3
                                                style={{
                                                    margin: 0,
                                                    fontSize: "clamp(1.85rem, 2.9vw, 2.35rem)",
                                                    fontWeight: 800,
                                                    lineHeight: 1.12,
                                                    color: c.color, // NOWY KOLOR
                                                    letterSpacing: "-0.4px",
                                                }}
                                            >
                                                {c.k}
                                            </h3>
                                        </div>

                                        <p
                                            style={{
                                                margin: 0,
                                                color: "#3A3A3A",
                                                fontSize: "1.02rem",
                                                lineHeight: 1.68,
                                                maxWidth: "48ch",
                                                fontWeight: 450,
                                            }}
                                        >
                                            {c.desc}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
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
