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
                            aria-labelledby="icare-intro-title"
                            style={{
                                marginLeft: "calc(50% - 50vw)",
                                marginRight: "calc(50% - 50vw)",
                                width: "100vw",
                                background: "linear-gradient(180deg, #F2FAFB 0%, #FFFFFF 70%)",
                                padding: "86px 0 96px",
                                fontFamily:
                                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            {/* glow left */}
                            <span
                                aria-hidden="true"
                                style={{
                                    position: "absolute",
                                    left: "-12%",
                                    top: "-22%",
                                    width: 560,
                                    height: 280,
                                    borderRadius: "50%",
                                    background:
                                        "radial-gradient(closest-side, rgba(51,174,186,.20), rgba(51,174,186,0) 70%)",
                                    filter: "blur(12px)",
                                    pointerEvents: "none",
                                }}
                            />
                            {/* glow right */}
                            <span
                                aria-hidden="true"
                                style={{
                                    position: "absolute",
                                    right: "-14%",
                                    bottom: "-28%",
                                    width: 600,
                                    height: 300,
                                    borderRadius: "50%",
                                    background:
                                        "radial-gradient(closest-side, rgba(17,119,128,.18), rgba(17,119,128,0) 70%)",
                                    filter: "blur(12px)",
                                    pointerEvents: "none",
                                }}
                            />

                            <div
                                style={{
                                    maxWidth: 1200,
                                    margin: "0 auto",
                                    padding: "0 clamp(16px, 4vw, 40px)",
                                    position: "relative",
                                    zIndex: 1,
                                    textAlign: "center",
                                }}
                            >
                                <h2
                                    id="icare-intro-title"
                                    style={{
                                        margin: 0,
                                        fontSize: "clamp(1.7rem, 2.8vw, 2.3rem)",
                                        lineHeight: 1.25,
                                        fontWeight: 900,
                                        color: "#444444",
                                        letterSpacing: ".2px",
                                    }}
                                >
                                    Where families meet caregivers.
                                    <br />
                                    <span
                                        style={{
                                            display: "inline-block",
                                            backgroundImage:
                                                "linear-gradient(90deg, #166016 0%, #166016 45%, #166016 100%)",
                                            WebkitBackgroundClip: "text",
                                            backgroundClip: "text",
                                            color: "transparent",
                                            WebkitTextFillColor: "transparent",
                                        }}
                                    >
                                        Care made personal.
                                    </span>
                                </h2>

                                <div
                                    aria-hidden="true"
                                    style={{
                                        width: "min(72ch, 92%)",
                                        height: 3,
                                        background:
                                            "#0f970f",
                                        borderRadius: 999,
                                        margin: "1rem auto 1.75rem",
                                        opacity: 0.65,
                                    }}
                                />

                                <div
                                    style={{
                                        maxWidth: 980,
                                        margin: "0 auto",
                                        textAlign: "center",
                                    }}
                                >
                                    <p
                                        style={{
                                            margin: "0 0 0.9rem 0",
                                            color: "#334155",
                                            lineHeight: 1.7,
                                            fontSize: "clamp(1rem, 1.05vw, 1.06rem)",
                                        }}
                                    >
                                        <b>
                                            With years of experience in healthcare, we understand the realities on both sides —
                                            what families need and what caregivers deliver every day.
                                        </b>
                                    </p>
                                    <p
                                        style={{
                                            margin: "0 0 0.9rem 0",
                                            color: "#334155",
                                            lineHeight: 1.7,
                                            fontSize: "clamp(1rem, 1.05vw, 1.06rem)",
                                        }}
                                    >
                                        <b>
                                            ICare connects you directly with trusted, verified caregivers in your area — with clear
                                            profiles, transparent terms, and private, secure messaging. No agencies, no guesswork.
                                        </b>
                                    </p>
                                    <p
                                        style={{
                                            margin: 0,
                                            color: "#334155",
                                            lineHeight: 1.7,
                                            fontSize: "clamp(1rem, 1.05vw, 1.06rem)",
                                        }}
                                    >
                                        <b>
                                            Whether you need live-in support, hourly help, or specialized care, you set the terms
                                            and stay in control. Dignity for the person receiving care. Peace of mind for the family.
                                        </b>
                                    </p>
                                </div>

                                <ul
                                    style={{
                                        listStyle: "none",
                                        padding: 0,
                                        margin: "24px auto 0",
                                        display: "grid",
                                        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                                        gap: "12px",
                                        maxWidth: 1000,
                                    }}
                                >
                                    {[
                                        {
                                            icon: (
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            ),
                                            label: "Verified caregivers",
                                        },
                                        {
                                            icon: (
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                                    <rect x="3" y="11" width="18" height="11" rx="2" />
                                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                                </svg>
                                            ),
                                            label: "Secure & private",
                                        },
                                        {
                                            icon: (
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                                    <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h7" />
                                                </svg>
                                            ),
                                            label: "Direct messaging",
                                        },
                                        {
                                            icon: (
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
                                                gap: 10,
                                                padding: "12px 14px",
                                                borderRadius: 999,
                                                background: "#16601635",
                                                border: "1px solid rgba(3,105,118,.20)",
                                                color: "#0F172A",
                                                fontWeight: 700,
                                                fontSize: 14,
                                                letterSpacing: ".2px",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <span
                                                aria-hidden="true"
                                                style={{
                                                    display: "inline-grid",
                                                    placeItems: "center",
                                                    width: 26,
                                                    height: 26,
                                                    borderRadius: 999,
                                                    background: "linear-gradient(90deg, #ffffffff)",
                                                    color: "#062026",
                                                    boxShadow: "inset 0 1px 0 rgba(255,255,255,.65)",
                                                    flexShrink: 0,
                                                }}
                                            >
                                                {f.icon}
                                            </span>
                                            <span>{f.label}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div
                                    aria-hidden="true"
                                    style={{
                                        width: "min(1100px, 92%)",
                                        height: 1,
                                        background: "linear-gradient(90deg, rgba(0,0,0,0), #E6F3F5 50%, rgba(0,0,0,0))",
                                        margin: "22px auto 0",
                                    }}
                                />
                            </div>
                        </section>
                    </span>
                </IcareCard>
            </IcareSection>

            <IcareWebBlock imgSrc={cardImage}>
                <span slot="header-contents">ICare.</span>
                <span slot="body-contents">
                    Easily connect with trusted caregivers or people who need care - right from your phone or computer. Quickly find the right match based on location, needs, and qualifications. Set up and manage care agreements with simple tools for scheduling and contracts
                </span>
            </IcareWebBlock>

            <IcareSection>
                <IcareWebBlock layout='text-right' imgSrc={cardImage3}>
                    <span slot="header-contents">Safety comes first.</span>
                    <span slot="body-contents">Your information stays safe and private, thanks to strong built-in security.</span>
                </IcareWebBlock>
            </IcareSection>

            <IcareSection className="full-bleed">
                <IcareBanner className="full-bleed" imgSrc={bannerImage1} />
            </IcareSection>

            {/* ===== ZOSTAJE TYLKO DRUGA SEKCJA TRUST & CARE (z ikonami) ===== */}
            <IcareSection>
                <section
                    aria-label="Trust & Care — centered images smaller with icons"
                    style={{
                        marginLeft: "calc(50% - 50vw)",
                        marginRight: "calc(50% - 50vw)",
                        width: "100vw",
                        background: "linear-gradient(180deg, #F7FCFD 0%, #FFFFFF 70%)",
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
                                gap: 28,
                                alignItems: "stretch",
                            }}
                        >
                            {[
                                {
                                    k: "TRUST",
                                    img: cardImage2,
                                    desc: " Transparent process, no hidden fees.",
                                    icon: (
                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                            style={{ width: "3.35em", height: "3.35em", flexShrink: 0 }}
                                        >
                                            <defs>
                                                <linearGradient id="gradTrust" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="#0f970f" />
                                                    <stop offset="45%" stopColor="#0f970f" />
                                                    <stop offset="100%" stopColor="#0f970f" />
                                                </linearGradient>
                                            </defs>
                                            <path
                                                d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z"
                                                fill="none"
                                                stroke="url(#gradTrust)"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M9 12l2.2 2.2L15 10.5"
                                                fill="none"
                                                stroke="url(#gradTrust)"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    ),
                                },
                                {
                                    k: "CARE",
                                    img: cardImage7,
                                    desc: "From daily support to specialized help.",
                                    icon: (
                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                            style={{ width: "3.35em", height: "3.35em", flexShrink: 0 }}
                                        >
                                            <defs>
                                                <linearGradient id="gradCare" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="#0f970f" />
                                                    <stop offset="45%" stopColor="#0f970f" />
                                                    <stop offset="100%" stopColor="#0f970f" />
                                                </linearGradient>
                                            </defs>
                                            <path
                                                d="M7 14c-1.5 0-3 .8-3 2.5S5.5 19 7 19h2.2c.5 0 1 .2 1.4.5l1.4 1.1"
                                                fill="none"
                                                stroke="url(#gradCare)"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M17 14c1.5 0 3 .8 3 2.5S18.5 19 17 19h-2.2c-.5 0-1 .2-1.4.5L12 21.6"
                                                fill="none"
                                                stroke="url(#gradCare)"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M12 6.8l-.9-.9a3 3 0 0 0-4.2 4.2L12 15l5.1-4.9a3 3 0 0 0-4.2-4.2L12 6.8z"
                                                fill="none"
                                                stroke="url(#gradCare)"
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
                                        borderRadius: 28,
                                        //padding: 2,
                                        background: "#0f970f", // spójny teal
                                        boxShadow: "0 14px 36px rgba(2,8,23,0.10)",
                                        overflow: "hidden",
                                    }}
                                >
                                    <div
                                        style={{
                                            borderRadius: 25,
                                            background: "#fff",
                                            overflow: "hidden",
                                            display: "grid",
                                            gridTemplateRows: "auto 1fr",
                                            rowGap: 16,
                                            padding: 24,
                                        }}
                                    >
                                        <header>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 12,
                                                }}
                                            >
                                                {c.icon}
                                                <h3
                                                    style={{
                                                        margin: 0,
                                                        fontSize: "clamp(1.55rem, 3.2vw, 2.25rem)",
                                                        lineHeight: 1.12,
                                                        fontWeight: 800,
                                                        letterSpacing: ".8px",
                                                        backgroundImage:
                                                            "linear-gradient(90deg, #0f970f 0%, #0f970f 45%, #0f970f 100%)",
                                                        WebkitBackgroundClip: "text",
                                                        backgroundClip: "text",
                                                        color: "transparent",
                                                        WebkitTextFillColor: "transparent",
                                                    }}
                                                >
                                                    {c.k}
                                                </h3>
                                            </div>
                                            <p
                                                style={{
                                                    margin: "10px 0 0 0",
                                                    color: "#334155",
                                                    fontSize: "clamp(1.2rem, 1.1vw, 1.1rem)",
                                                    fontWeight: "500",
                                                    lineHeight: 1.7,
                                                    maxWidth: "60ch",
                                                }}
                                            >
                                                {c.desc}
                                            </p>
                                        </header>

                                        <div
                                            style={{
                                                position: "relative",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                background: "#F8FBFD",
                                                border: "1px solid #E6F1F5",
                                                borderRadius: 20,
                                                padding: 16,
                                                minHeight: 504,
                                                overflow: "hidden",
                                            }}

                                        >
                                            <img
                                                src={c.img}
                                                alt=""
                                                style={{
                                                    display: "block",
                                                    width: "100%",
                                                    height: "100%",
                                                    maxWidth: "900px",
                                                    objectFit: "cover",
                                                    borderRadius: 14,
                                                    transform: "scale(1)",
                                                    transition: "transform .3s ease",
                                                }}
                                            />
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
                            <a
                                href="#how-it-works"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 8,
                                    textDecoration: "none",
                                    fontWeight: 900,
                                    letterSpacing: ".6px",
                                    fontSize: "clamp(1rem, 1.2vw, 1.05rem)",
                                    padding: "10px 12px",
                                    borderRadius: 999,
                                    color: "#0F172A",
                                    border: "1px solid rgba(3,105,118,.22)",
                                    background: "rgba(51,174,186,.10)",
                                }}
                            >
                                How it works
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 48 48"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M5 12h14" />
                                    <path d="M13 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </section>
            </IcareSection>

            <IcareSection>
                <div style={{ display: "flex", gap: "2rem" }}>
                    <IcareWebMinihero imgSrc={cardImage4} href="/icare-for-caregivers">
                        <span slot="header">ICare for Caregivers</span>
                        <span slot="text">Find out more</span>
                    </IcareWebMinihero>
                    <IcareWebMinihero imgSrc={cardImage5} href="/icare-for-carereceivers">
                        <span slot="header">ICare for Carereceivers</span>
                        <span slot="text">Find out more</span>
                    </IcareWebMinihero>
                </div>
            </IcareSection>
        </IcarePage>
    );
}
