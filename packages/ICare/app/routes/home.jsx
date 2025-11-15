import React from "react";
import cardImage from "/images/web-cards/web-card-image-1.jpg";
import cardImage3 from "/images/web-cards/web-card-image-3.jpg";
import cardImage5 from "/images/heros/who-we-are.jpg";
import cardImage4 from "/images/web-cards/web-card-image-4.jpg";
import bannerImage1 from "/images/banners/banner-image-1.jpg";
import cardImage2 from "/images/web-cards/web-card-image-2.jpg";
import cardImage6 from "/images/heros/icare-for-caregivers.jpg";
import cardImage7 from "/images/heros/icare-for-carereceivers.jpg";
import heroImage from "/images/heros/hero-landing-page.jpg";
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

            <IcareSection
                style={{
                    background: "linear-gradient(180deg, #F9FAFA 0%, #FFFFFF 100%)",
                    padding: "clamp(3rem, 5vw, 4.5rem) clamp(20px, 5vw, 60px)", // 🔹 było 6rem → teraz mniej pionowego paddingu
                    fontFamily:
                        "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                    marginTop: "16rem", // 🔹 było 18rem — mniej powietrza nad sekcją
                    transform: "scale(0.87)", // 🔹 zmniejszenie całej sekcji o ~13%
                    transformOrigin: "top center",
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr max(400px,40%)",
                        gap: "clamp(1.8rem, 2.5vw, 3rem)", // 🔹 nieco ciaśniejszy gap
                        alignItems: "center",
                        maxWidth: 1150, // 🔹 było 1200 — delikatnie mniejsza szerokość
                        margin: "0 auto",
                    }}
                >
                    {/* === LEWA STRONA – TEKST === */}
                    <div style={{ textAlign: "left" }}>
                        <h2
                            style={{
                                fontWeight: 800,
                                fontSize: "clamp(2.2rem, 3.5vw, 2.4rem)", // 🔹 lekko zmniejszony tytuł
                                color: "#0F172A",
                                lineHeight: 1.12,
                                marginBottom: "2.2rem",
                                marginTop: "2.2rem",
                            }}
                        >
                            Direct care meets trust.
                            <br />
                            <span style={{ color: "#4C7865" }}>
                                Real connection. Real people.
                            </span>
                        </h2>

                        <p
                            style={{
                                maxWidth: "58ch",
                                color: "#374151",
                                fontSize: "1.05rem", // 🔹 mniejszy font
                                lineHeight: 1.65,
                                marginTop: "1.2rem",
                                marginBottom: "1.8rem",
                                fontWeight: 500,
                            }}
                        >
                            With ICare, families and caregivers connect directly — no middlemen,
                            straight to the heart of what matters: care built on honesty, clarity,
                            and respect.
                        </p>


                    </div>

                    {/* === PRAWA STRONA – KAFELKI === */}
                    <div
                        style={{
                            display: "grid",
                            gap: "clamp(0.6rem, 0.8vw, 0.80rem)", // 🔹 kafelki bliżej siebie
                        }}
                    >
                        {[
                            {
                                icon: (
                                    <svg
                                        width="22"
                                        height="22"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#1F2A37"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M9 12l2 2 4-4" />
                                    </svg>
                                ),
                                title: "Fair & Transparent",
                                desc: "No extra commissions, clear rates, direct match.",
                            },
                            {
                                icon: (
                                    <svg
                                        width="22"
                                        height="22"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#1F2A37"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect x="3" y="11" width="18" height="10" rx="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                ),
                                title: "Private & Secure",
                                desc: "Confidential chats, encrypted data, safe payments.",
                            },
                            {
                                icon: (
                                    <svg
                                        width="22"
                                        height="22"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#1F2A37"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h7" />
                                    </svg>
                                ),
                                title: "Genuine Connections",
                                desc: "You pick your caregiver. You decide your terms. Real people, real care.",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: "1rem",
                                    background: "#e6ddc519",
                                    borderRadius: 22, // 🔹 lekko mniejsze zaokrąglenie
                                    padding: "1.2rem",
                                    color: "#1F2A37",
                                    border: "1px solid rgba(31,171,31,0.16)",
                                    boxShadow: "0 4px 14px rgba(2,8,23,0.05)",
                                    transition: "transform .25s ease, box-shadow .25s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-3px)";
                                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(2,8,23,0.10)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "0 4px 14px rgba(2,8,23,0.05)";
                                }}
                            >
                                <div
                                    style={{
                                        minWidth: 44,
                                        minHeight: 44,
                                        borderRadius: "50%",
                                        background: "rgba(31,171,31,0.08)",
                                        display: "grid",
                                        placeItems: "center",
                                        flexShrink: 0,
                                    }}
                                >
                                    {item.icon}
                                </div>
                                <div>
                                    <h3
                                        style={{
                                            margin: "0 0 .3rem 0",
                                            fontSize: "1rem",
                                            fontWeight: 700,
                                            color: "#1F2A37",
                                        }}
                                    >
                                        {item.title}
                                    </h3>
                                    <p
                                        style={{
                                            margin: 0,
                                            fontSize: "0.9rem",
                                            color: "#475569",
                                            lineHeight: 1.55,
                                        }}
                                    >
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </IcareSection>





            {/* === BLOK 1: ICare (image left) === */}
            <IcareWebBlock
                imgSrc={cardImage}
                style={{
                    background: "#F3F4F3", // 🔹 delikatne szare tło zamiast czystej bieli
                    borderRadius: "28px",
                    padding: "clamp(3.2rem, 5vw, 4.2rem) clamp(1.5rem, 4vw, 3rem)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "2.5rem",
                    flexDirection: "row", // 🟢 obrazek po lewej
                    boxShadow: "0 6px 24px rgba(0,0,0,0.04)",
                    marginBottom: "clamp(48px, 6vw, 72px)",
                    maxWidth: 1200,
                    marginInline: "auto",
                    border: "1px solid rgba(0,0,0,0.04)", // 🔹 lekka krawędź
                }}
            >
                <span
                    slot="header-contents"
                    style={{
                        display: "block",
                        fontSize: "clamp(1.9rem, 3.5vw, 2.2rem)",
                        fontWeight: 900,
                        color: "#0F172A",
                        marginBottom: "1.3rem",
                        lineHeight: 1.15,
                    }}
                >
                    <span>Connecting care with trust</span>
                </span>

                <span
                    slot="body-contents"
                    style={{
                        fontSize: "clamp(1rem, 1.2vw, 1.1rem)",
                        lineHeight: 1.75,
                        color: "#374151",
                        fontWeight: 500,
                        maxWidth: "640px",
                        display: "block",
                        marginBottom: "1.8rem",
                    }}
                >
                    Easily connect with trusted caregivers or people who need care — right from your phone or computer.
                    Quickly find the right match based on location, needs, and qualifications.
                    Set up and manage care agreements with simple tools for scheduling and contracts.
                </span>


            </IcareWebBlock>


            {/* === BLOK 2: Safety (image right) === */}
            <IcareSection
                style={{
                    backgroundColor: "#ffffff",
                    padding: "clamp(2.5rem, 5vw, 4rem) 0",
                }}
            ><IcareWebBlock
                imgSrc={cardImage3}
                style={{
                    background: "#f8f4e968", // 🔹 subtelny beż (ciepły, lekko kremowy)
                    borderRadius: "28px",
                    padding: "clamp(3rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3rem)",
                    boxShadow: "0 6px 22px rgba(0,0,0,0.03)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "2.5rem",
                    flexDirection: "row-reverse", // 🔵 obrazek po prawej
                    maxWidth: 1200,
                    marginInline: "auto",
                    border: "1px solid rgba(0,0,0,0.04)", // 🔹 subtelna krawędź dla kontrastu
                }}
            >
                    <span
                        slot="header-contents"
                        style={{
                            display: "block",
                            fontSize: "clamp(1.9rem, 3.5vw, 2.4rem)",
                            fontWeight: 900,
                            color: "#0F172A",
                            marginBottom: "1.2rem",
                            lineHeight: 1.15,
                        }}
                    >
                        Safety comes first
                    </span>

                    <span
                        slot="body-contents"
                        style={{
                            fontSize: "clamp(1rem, 1.2vw, 1.1rem)",
                            lineHeight: 1.75,
                            color: "#374151",
                            fontWeight: 500,
                            maxWidth: "620px",
                            display: "block",
                            marginBottom: "1.8rem",
                        }}
                    >
                        Your information stays safe and private, thanks to strong built-in security
                        and encrypted communication.
                        Every caregiver profile is verified and reviewed for authenticity —
                        so you can focus on what truly matters.
                    </span>

                    <a
                        href="/register"
                        style={{
                            display: "inline-block",
                            padding: "1.05rem 2.4rem",
                            background:
                                "linear-gradient(90deg, rgba(31,171,31,1) 0%, rgba(63,221,153,1) 100%)",
                            color: "#fff",
                            fontWeight: 800,
                            fontSize: "1.05rem",
                            letterSpacing: "0.04em",
                            borderRadius: 999,
                            textDecoration: "none",
                            boxShadow:
                                "0 4px 14px rgba(31,171,31,0.25), inset 0 1px 1px rgba(255,255,255,0.25)",
                            transition:
                                "transform .3s ease, box-shadow .3s ease, background .4s ease, filter .3s ease",
                            textAlign: "center",
                            cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-3px)";
                            e.currentTarget.style.filter = "brightness(1.08)";
                            e.currentTarget.style.boxShadow =
                                "0 8px 24px rgba(31,171,31,0.4), inset 0 1px 1px rgba(255,255,255,0.3)";
                            e.currentTarget.style.background =
                                "linear-gradient(90deg, rgba(63,221,153,1) 0%, rgba(31,171,31,1) 100%)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.filter = "brightness(1)";
                            e.currentTarget.style.boxShadow =
                                "0 4px 14px rgba(31,171,31,0.25), inset 0 1px 1px rgba(255,255,255,0.25)";
                            e.currentTarget.style.background =
                                "linear-gradient(90deg, rgba(31,171,31,1) 0%, rgba(63,221,153,1) 100%)";
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
                    aria-label="Trust & Care — equal images"
                    style={{
                        marginLeft: "calc(50% - 50vw)",
                        marginRight: "calc(50% - 50vw)",
                        width: "100vw",
                        background: "linear-gradient(180deg, #FAFCFB 0%, #FFFFFF 80%)",
                        padding: "72px 0 80px",
                        fontFamily:
                            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                    }}
                >
                    <div
                        style={{
                            maxWidth: 1400,
                            margin: "0 auto",
                            padding: "0 clamp(20px, 4vw, 48px)",
                        }}
                    >
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(520px, 1fr))",
                                gap: 36,
                                alignItems: "stretch",
                            }}
                        >
                            {[
                                {
                                    k: "Trust",
                                    desc: "Transparent process - no hidden fees.",
                                    img: cardImage2,
                                    icon: (
                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                            style={{ width: "3em", height: "3em", flexShrink: 0 }}
                                        >
                                            <path
                                                d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z"
                                                fill="none"
                                                stroke="#1FAB1F"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M9 12l2.2 2.2L15 10.5"
                                                fill="none"
                                                stroke="#1FAB1F"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    ),
                                },
                                {
                                    k: "Care",
                                    desc: "From daily support to live - in care",
                                    img: cardImage7,
                                    icon: (
                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                            style={{ width: "3em", height: "3em", flexShrink: 0 }}
                                        >
                                            <path
                                                d="M12 6.8l-.9-.9a3 3 0 0 0-4.2 4.2L12 15l5.1-4.9a3 3 0 0 0-4.2-4.2L12 6.8z"
                                                fill="none"
                                                stroke="#1FAB1F"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    ),
                                },
                            ].map((c) => (
                                <article
                                    key={c.k}
                                    style={{
                                        borderRadius: 32,
                                        background: "#FFFFFF",
                                        boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
                                        overflow: "hidden",

                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    {/* HEADER */}
                                    <div style={{ padding: "32px 28px 0" }}>
                                        <header
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 12,
                                                marginBottom: "0.8rem",
                                            }}
                                        >
                                            {c.icon}
                                            <h3
                                                style={{
                                                    margin: 0,
                                                    fontSize: "clamp(1.55rem, 3vw, 2rem)",
                                                    lineHeight: 1.15,
                                                    fontWeight: 800,
                                                    letterSpacing: "0.6px",
                                                    color: "#1FAB1F",
                                                }}
                                            >
                                                {c.k}
                                            </h3>
                                        </header>

                                        {/* === POWIĘKSZONY TYTUŁ === */}
                                        <p
                                            style={{
                                                margin: "0 0 1.8rem",
                                                color: "#1F2A37",
                                                fontSize: "clamp(1.25rem, 1.5vw, 1.2rem)", // ⬆️ +15%
                                                fontWeight: 600,
                                                lineHeight: 1.55,
                                                letterSpacing: "0.3px",
                                            }}
                                        >
                                            {c.desc}
                                        </p>
                                    </div>

                                    {/* IMAGE */}
                                    <div
                                        style={{
                                            flex: 1,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            background: "#F9FAFA",

                                            borderRadius: "0 0 32px 32px",
                                            height: "380px", // ✅ równa wysokość
                                        }}
                                    >
                                        <img
                                            src={c.img}
                                            alt={c.k}
                                            style={{
                                                width: "95%",
                                                height: "95%",
                                                objectFit: "cover",
                                                display: "block",
                                                borderRadius: 24,
                                                outline: "1.5px solid #E5E7EB",

                                            }}
                                        />
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
                            {/* Tło */}
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

                            {/* Treść na środku */}
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
                                        fontSize: "clamp(1.8rem, 2.6vw, 2rem)",
                                        fontWeight: 700,
                                        marginBottom: "1.5rem",
                                        letterSpacing: "0.5px",
                                        textShadow: "0 2px 6px rgba(0,0,0,0.3)",
                                    }}
                                >
                                    {c.title}
                                </h3>

                                {/* Button */}
                                <div
                                    style={{
                                        display: "inline-block",
                                        backgroundColor: "#a5a5a5ff",
                                        color: "#ffffffff",
                                        fontWeight: 700,
                                        padding: "0.9rem 2.4rem",
                                        borderRadius: "999px",
                                        fontSize: "1.05rem",
                                        letterSpacing: "0.3px",
                                        boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                                        transition: "all 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = "#000000ff";
                                        e.currentTarget.style.transform = "scale(1.05)";
                                        e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.25)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = "#a5a5a5ff";
                                        e.currentTarget.style.transform = "scale(1)";
                                        e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.15)";
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
