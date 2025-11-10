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


            <IcareSection>
                <IcareCard variant="flat">
                    <span
                        slot="contents"
                        style={{
                            display: "block",
                            backgroundColor: "transparent",
                        }}
                    >
                        <section
                            aria-label="ICare intro"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                minHeight: "65vh",
                                padding: "clamp(28px, 4vw, 56px) 0",
                                background: "#FFFFFF",
                                fontFamily:
                                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                            }}
                        >
                            <div
                                style={{
                                    maxWidth: 1100,
                                    margin: "0 auto",
                                    padding: "0 clamp(20px, 4vw, 40px)",
                                    textAlign: "center",
                                }}
                            >
                                {/* === TITLE === */}
                                <h2
                                    id="icare-intro-title"
                                    style={{
                                        margin: 0,
                                        fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)",
                                        lineHeight: 1.18,
                                        fontWeight: 800,
                                        color: "#1F2A37",
                                        letterSpacing: ".2px",
                                    }}
                                >
                                    <span style={{ display: "block" }}>Where families meet caregivers.</span>
                                    <span style={{ display: "block", color: "#4C7865" }}>
                                        Care made personal.
                                    </span>
                                </h2>

                                {/* === UNDERLINE === */}
                                <div
                                    aria-hidden="true"
                                    style={{
                                        width: "min(70ch, 92%)",
                                        height: 4,
                                        background: "#1FAB1F",
                                        borderRadius: 999,
                                        margin: "1.1rem auto 1.6rem",
                                        opacity: 0.9,
                                    }}
                                />

                                {/* === TEXT === */}
                                <div style={{ maxWidth: 760, margin: "0 auto" }}>
                                    <p
                                        style={{
                                            margin: "0 0 0.6rem",
                                            color: "#334155",
                                            lineHeight: 1.6,
                                            fontSize: "clamp(1rem, 1.1vw, 1.1rem)",
                                            fontWeight: 600,
                                        }}
                                    >
                                        We understand care — from the family’s expectations to the caregiver’s
                                        everyday commitment.
                                    </p>

                                    <p
                                        style={{
                                            margin: "0 0 0.6rem",
                                            color: "#334155",
                                            lineHeight: 1.6,
                                            fontSize: "clamp(1rem, 1.1vw, 1.1rem)",
                                            fontWeight: 600,
                                        }}
                                    >
                                        ICare connects you directly with verified, trusted caregivers through
                                        transparent profiles and secure private chat.
                                    </p>

                                    <p
                                        style={{
                                            marginTop: "1.2rem",
                                            color: "#1F2A37",
                                            lineHeight: 1.6,
                                            fontSize: "clamp(1.15rem, 1.25vw, 1.25rem)",
                                            fontWeight: 700,
                                            letterSpacing: "0.3px",
                                        }}
                                    >
                                        No agencies. No hidden fees. Just safe, transparent, personal care.
                                    </p>
                                </div>

                                {/* === PILLARS (20% smaller) === */}
                                <ul
                                    role="list"
                                    style={{
                                        listStyle: "none",
                                        padding: 0,
                                        margin: "30px auto 0",
                                        display: "flex",
                                        flexWrap: "wrap",
                                        justifyContent: "center",
                                        gap: "14px",
                                        maxWidth: 900,
                                    }}
                                >
                                    {[
                                        {
                                            icon: (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="#ffffffff"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            ),
                                            label: "Verified caregivers",
                                        },
                                        {
                                            icon: (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="#ffffffff"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <rect x="3" y="11" width="18" height="11" rx="2" />
                                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                                </svg>
                                            ),
                                            label: "Secure & private",
                                        },
                                        {
                                            icon: (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="#ffffffff"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h7" />
                                                </svg>
                                            ),
                                            label: "Direct messaging",
                                        },
                                        {
                                            icon: (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="#ffffffff"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M4 20h16" />
                                                    <path d="M18 17V8a6 6 0 1 0-12 0v9" />
                                                </svg>
                                            ),
                                            label: "Transparent pricing",
                                        },
                                    ].map((f) => (
                                        <li
                                            key={f.label}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 8,
                                                padding: "9px 16px", // 🔹 zmniejszone
                                                borderRadius: 22, // 🔹 proporcjonalnie mniejszy radius
                                                background: "#458f6fb7", // see-through pastel
                                                border: "1.3px solid #ffffff",
                                                color: "#ffffffff",
                                                fontWeight: 700,
                                                fontSize: 15, // 🔹 mniejsze fonty
                                                letterSpacing: ".2px",
                                                boxShadow: "0 1px 3px rgba(31,171,31,0.05)",
                                            }}
                                        >
                                            {f.icon}
                                            <span>{f.label}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* === DIVIDER === */}
                                <div
                                    aria-hidden="true"
                                    style={{
                                        width: "min(1000px, 90%)",
                                        height: 1,
                                        background: "#E5E7EB",
                                        margin: "32px auto 0",
                                    }}
                                />
                            </div>
                        </section>

                    </span>
                </IcareCard>
            </IcareSection>

            {/* === BLOK 1: ICare (image left) === */}
            <IcareWebBlock
                imgSrc={cardImage}
                style={{
                    backgroundColor: "#f8faf9",
                    borderRadius: "28px",
                    padding: "clamp(36px, 5vw, 52px) clamp(20px, 4vw, 48px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "2rem",
                    flexDirection: "row", // 🟢 obrazek po lewej
                    boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                    marginBottom: "clamp(36px, 4vw, 60px)", // 🔽 mniejszy odstęp między blokami
                }}
            >
                <span
                    slot="header-contents"
                    style={{
                        display: "block",
                        fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                        fontWeight: 900,
                        color: "#1F2A37",
                        marginBottom: "1.2rem",
                    }}
                >
                    ICare.{" "}
                    <span style={{ color: "#4C7865" }}>Connecting care with trust.</span>
                </span>

                <span
                    slot="body-contents"
                    style={{
                        fontSize: "clamp(1rem, 1.2vw, 1.15rem)",
                        lineHeight: 1.7,
                        color: "#374151",
                        fontWeight: 800,
                        maxWidth: "640px",
                        display: "block",
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
                    padding: "clamp(24px, 4vw, 56px) 0", // 🔽 mniej pionowego luzu
                }}
            >
                <IcareWebBlock
                    imgSrc={cardImage3}
                    style={{
                        backgroundColor: "#f9faf9",
                        borderRadius: "28px",
                        padding: "clamp(32px, 5vw, 48px) clamp(20px, 4vw, 48px)", // 🔽 lekko ciaśniej
                        boxShadow: "0 4px 18px rgba(0,0,0,0.02)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "2rem",
                        flexDirection: "row-reverse", // 🔵 obrazek po prawej
                    }}
                >
                    <span
                        slot="header-contents"
                        style={{
                            display: "block",
                            fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                            fontWeight: 900,
                            color: "#1F2A37",
                            marginBottom: "1rem",
                        }}
                    >
                        Safety comes first.{" "}
                        <span style={{ color: "#1FAB1F" }}>Always.</span>
                    </span>

                    <span
                        slot="body-contents"
                        style={{
                            fontSize: "clamp(1rem, 1.2vw, 1.15rem)",
                            lineHeight: 1.7,
                            color: "#374151",
                            fontWeight: 500,
                            maxWidth: "620px",
                            display: "block",
                        }}
                    >
                        Your information stays safe and private, thanks to strong built-in security
                        and encrypted communication.
                        Every caregiver profile is verified and reviewed for authenticity —
                        so you can focus on what truly matters.
                    </span>
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
                                    k: "TRUST",
                                    desc: "Transparent process, no hidden fees.",
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
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M9 12l2.2 2.2L15 10.5"
                                                fill="none"
                                                stroke="#1FAB1F"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    ),
                                },
                                {
                                    k: "CARE",
                                    desc: "From daily support live in care",
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
                                        border: "1.5px solid #E5E7EB",
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
                                                fontSize: "clamp(1.25rem, 1.5vw, 1.3rem)", // ⬆️ +15%
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
                                            borderTop: "1px solid #E6F1F5",
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
                                        backgroundColor: "#fff",
                                        color: "#1F2A37",
                                        fontWeight: 700,
                                        padding: "0.9rem 2.4rem",
                                        borderRadius: "999px",
                                        fontSize: "1.05rem",
                                        letterSpacing: "0.3px",
                                        boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                                        transition: "all 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = "#f7f7f7";
                                        e.currentTarget.style.transform = "scale(1.05)";
                                        e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.25)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = "#fff";
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
