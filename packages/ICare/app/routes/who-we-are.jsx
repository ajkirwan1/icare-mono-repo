import React from "react";
import { Link } from "react-router";
import heroImage from "/images/heros/who-we-are.jpg";
import styles from "./who-we-are.module.scss";

const BRAND = "#1FAB1F";
const BRAND_DARK = "#146513";

/* ===== Smooth scroll helper ===== */
function scrollToId(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function WhoWeAre() {
    const [active, setActive] = React.useState("hero");
    // Sekcje: hero, foundation, values, howwework, impact, contact
    const sectionIds = React.useMemo(
        () => ["hero", "foundation", "values", "howwework", "impact", "contact"],
        []
    );

    React.useEffect(() => {
        const sections = sectionIds
            .map((id) => document.getElementById(id))
            .filter(Boolean);

        if (!sections.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible?.target?.id) setActive(visible.target.id);
            },
            { root: null, rootMargin: "-35% 0px -55% 0px", threshold: [0.1, 0.25, 0.5, 0.75] }
        );

        sections.forEach((sec) => observer.observe(sec));
        return () => observer.disconnect();
    }, [sectionIds]);

    const navLinkStyle = (id) => ({
        color: active === id ? "#fff" : "rgba(255,255,255,.9)",
        textDecoration: active === id ? "underline" : "none",
        textDecorationThickness: active === id ? "2px" : "initial",
        textUnderlineOffset: active === id ? "7px" : "6px",
        fontSize: "clamp(.85rem, 1.2vw, .95rem)",
        fontWeight: 700,
        letterSpacing: ".01em",
        padding: ".2rem 0",
        cursor: "pointer",
        background: "none",
        border: 0
    });

    return (
        <div
            className={styles.page}
            style={{
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                color: "#0F172A"
            }}
        >
            {/* ===== HERO (lewa kolumna, wyrównanie do lewej, wzmocniona zielona obramówka badga) ===== */}
            <section id="hero" className={styles.heroWrap} aria-label="Who We Are hero" style={{ position: "relative" }}>
                <img
                    src={heroImage}
                    alt="Care coordination background"
                    className={styles.heroImg}
                    style={{ width: "100%", height: "min(76vh, 820px)", objectFit: "cover", filter: "brightness(.78) contrast(1.06)" }}
                />
                <div
                    className={styles.heroOverlay}
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "radial-gradient(80% 60% at 50% 45%, rgba(0,0,0,.25) 0%, rgba(0,0,0,.45) 55%, rgba(0,0,0,.6) 100%)"
                    }}
                />

                {/* Header with scroll-spy */}
                <header
                    className={styles.headerOverlay}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 16,
                        padding: "14px clamp(16px,4vw,32px)",
                        background: "rgba(2,8,23,0.28)",
                        backdropFilter: "saturate(1.05) blur(4px)",
                        borderBottom: "1px solid rgba(255,255,255,0.14)"
                    }}
                >
                    <Link
                        to="/"
                        className={styles.brand}
                        style={{
                            color: "#fff",
                            textDecoration: "none",
                            fontWeight: 900,
                            letterSpacing: "0.3px",
                            fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)",
                            textShadow: "0 1px 10px rgba(0,0,0,.4)"
                        }}
                    >
                        ICare
                    </Link>

                    <nav className={styles.nav} style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem 1.1rem", alignItems: "center" }}>
                        {[
                            { id: "hero", label: "Top" },
                            { id: "foundation", label: "Who We Are" },
                            { id: "values", label: "Values" },
                            { id: "howwework", label: "How We Work" },
                            { id: "impact", label: "Impact" },
                            { id: "contact", label: "Contact" }
                        ].map((l) => (
                            <button key={l.id} onClick={() => scrollToId(l.id)} className={styles.navLink} style={navLinkStyle(l.id)}>
                                {l.label}
                            </button>
                        ))}
                    </nav>
                </header>

                {/* Hero content — SZTYWNY LEWY GUTTER i wspólny lewy start */}
                <div
                    className={styles.content}
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "grid",
                        alignItems: "center"
                    }}
                >
                    {/* Wewnętrzna kolumna o stałej szerokości: lewy padding = globalny gutter,
              wszystko w środku wyrównane do lewej i zaczynające się w tym samym punkcie */}
                    <div
                        style={{
                            width: "100%",
                            maxWidth: "1100px",
                            marginInline: "auto",
                            paddingInline: "clamp(16px,4vw,32px)"
                        }}
                    >
                        <div style={{ maxWidth: "62ch", color: "#fff", textAlign: "left" }}>
                            {/* Eyebrow / badge — WYRAŹNIEJSZA ZIELONA OBRAMÓWKA */}
                            <span
                                style={{
                                    display: "inline-block",
                                    marginBottom: "1rem",
                                    fontSize: "clamp(.84rem, 1.52vw, 1.08rem)",
                                    fontWeight: 800,
                                    letterSpacing: ".16em",
                                    textTransform: "uppercase",
                                    color: "#EAF7EA",
                                    padding: ".56rem .9rem",
                                    borderRadius: 999,
                                    background: "rgba(31,171,31,0.16)",
                                    border: `2px solid ${BRAND}`,          // mocniejsze zielone obramowanie
                                    textShadow: "0 1px 2px rgba(0,0,0,.25)"
                                }}
                            >
                                who we are
                            </span>

                            <h1
                                className={styles.title}
                                style={{
                                    margin: "0 0 .75rem",
                                    fontWeight: 900,
                                    lineHeight: 1.05,
                                    letterSpacing: ".2px",
                                    fontSize: "clamp(2.2rem, 4.4vw, 3.2rem)",
                                    color: "#fff",
                                    textShadow: "0 4px 18px rgba(0,0,0,.45), 0 2px 6px rgba(0,0,0,.35)"
                                }}
                            >
                                We build <span style={{ color: BRAND }}>direct</span> and safe care.
                            </h1>

                            <p
                                className={styles.lead}
                                style={{
                                    margin: "0 0 .35rem",
                                    lineHeight: 1.6,
                                    fontSize: "clamp(1.05rem, 1.25vw, 1.15rem)",
                                    color: "rgba(255,255,255,.96)",
                                    textShadow: "0 1px 8px rgba(0,0,0,.40)"
                                }}
                            >
                                <b>Fair pay for caregivers — fair prices for families.</b>
                            </p>
                            <p
                                className={styles.lead}
                                style={{
                                    margin: "0 0 1.1rem",
                                    lineHeight: 1.6,
                                    fontSize: "clamp(1.05rem, 1.25vw, 1.15rem)",
                                    color: "rgba(255,255,255,.96)",
                                    textShadow: "0 1px 8px rgba(0,0,0,.40)"
                                }}
                            >
                                We connect people directly and remove middlemen — with clarity, dignity and privacy by design.
                            </p>

                            {/* CTA — również wyrównany do LEWEJ, bez przesunięć */}
                            <div className={styles.ctaRow} style={{ display: "flex", gap: ".9rem", alignItems: "center", flexWrap: "wrap" }}>
                                <a
                                    href="/how-it-works"
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 8,
                                        textDecoration: "none",
                                        fontWeight: 800,
                                        letterSpacing: ".3px",
                                        fontSize: "clamp(.95rem, 1.1vw, 1rem)",
                                        padding: ".8rem 1.15rem",
                                        borderRadius: 999,
                                        color: "#0F172A",
                                        background: "#FFFFFF",
                                        border: "1.5px solid rgba(255,255,255,0)"
                                    }}
                                >
                                    How it works
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M5 12h14" />
                                        <path d="M13 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== FOUNDATION & MISSION ===== */}
            <section id="foundation" aria-label="Our foundation and mission" style={{ maxWidth: 1100, margin: "5rem auto 0", padding: "0 clamp(16px,4vw,32px)" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(320px, 1fr))", gap: "clamp(18px,2.8vw,28px)", alignItems: "start" }}>
                    {/* Foundation */}
                    <article
                        aria-labelledby="foundation-title"
                        style={{
                            position: "relative",
                            background: "rgba(31,171,31,.06)",
                            border: "1px solid rgba(31,171,31,.22)",
                            borderRadius: "28px",
                            padding: "clamp(2rem, 3.5vw, 3rem)",
                            boxShadow: "0 12px 36px rgba(2,8,23,0.06)",
                            textAlign: "left"
                        }}
                    >
                        <span
                            aria-hidden="true"
                            style={{
                                position: "absolute",
                                left: "-8%",
                                top: "-14%",
                                width: 300,
                                height: 150,
                                borderRadius: "50%",
                                background: "radial-gradient(closest-side, rgba(31,171,31,.12), rgba(31,171,31,0) 70%)",
                                filter: "blur(10px)",
                                pointerEvents: "none"
                            }}
                        />
                        <h2
                            id="foundation-title"
                            style={{ margin: 0, color: "#0F172A", fontWeight: 900, fontSize: "clamp(1.6rem, 2.6vw, 2.1rem)", letterSpacing: ".2px", lineHeight: 1.2 }}
                        >
                            Our Foundation
                        </h2>
                        <div aria-hidden="true" style={{ width: "100%", height: 4, background: BRAND, borderRadius: 999, margin: ".8rem 0 1.1rem", opacity: 0.9 }} />
                        <p style={{ marginTop: 0, lineHeight: 1.75, color: "#334155", fontSize: "clamp(1rem, 1.05vw, 1.06rem)" }}>
                            <span style={{ display: "block", fontWeight: 800, color: "#475569", marginBottom: ".5rem" }}>
                                Finding the right care shouldn’t be overwhelming.
                            </span>
                            Families face complex choices — finding trusted caregivers, managing costs, and organising day-to-day life.
                            Caregivers deserve respect, fair pay, and tools that help them deliver safe, effective care.
                        </p>

                        <div style={{ marginTop: "1rem", lineHeight: 1.75, color: "#334155", fontSize: "clamp(1rem, 1.05vw, 1.06rem)" }}>
                            <span style={{ display: "block", fontWeight: 800, color: "#475569", marginBottom: ".6rem" }}>Families naturally ask:</span>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: ".5rem" }}>
                                {["How do we start?", "Does this caregiver have the right skills?", "Will they be fairly paid?", "Is our information secure?"].map((q) => (
                                    <li key={q} style={{ display: "flex", alignItems: "flex-start", gap: ".6rem" }}>
                                        <span
                                            aria-hidden="true"
                                            style={{
                                                flexShrink: 0,
                                                width: 18,
                                                height: 18,
                                                borderRadius: "999px",
                                                border: `2px solid ${BRAND}`,
                                                display: "inline-grid",
                                                placeItems: "center",
                                                marginTop: 2
                                            }}
                                        >
                                            <span style={{ width: 8, height: 8, borderRadius: "999px", background: BRAND, display: "block" }} />
                                        </span>
                                        <span>{q}</span>
                                    </li>
                                ))}
                            </ul>

                            <p style={{ margin: "1rem 0 0 0" }}>
                                <b>At ICare, we’ve been there.</b> That’s why we built a platform grounded in dignity, empathy, and trust — peace of mind for families and
                                recognition for caregivers.
                            </p>
                        </div>
                    </article>

                    {/* Mission */}
                    <article
                        aria-labelledby="mission-title"
                        style={{
                            position: "relative",
                            background: "linear-gradient(180deg, #FFFFFF 0%, #FAFEFF 100%)",
                            border: "1px solid #E4F3E6",
                            borderRadius: "28px",
                            padding: "clamp(2rem, 3.5vw, 3rem)",
                            boxShadow: "0 12px 36px rgba(2,8,23,0.06)",
                            textAlign: "left"
                        }}
                    >
                        <span
                            aria-hidden="true"
                            style={{
                                position: "absolute",
                                right: "-8%",
                                top: "-14%",
                                width: 300,
                                height: 150,
                                borderRadius: "50%",
                                background: "radial-gradient(closest-side, rgba(31,171,31,.12), rgba(31,171,31,0) 70%)",
                                filter: "blur(10px)",
                                pointerEvents: "none"
                            }}
                        />
                        <h2
                            id="mission-title"
                            style={{ margin: 0, color: "#0F172A", fontWeight: 900, fontSize: "clamp(1.6rem, 2.6vw, 2.1rem)", letterSpacing: ".2px", lineHeight: 1.2 }}
                        >
                            Our Mission
                        </h2>

                        <div aria-hidden="true" style={{ width: "100%", height: 4, background: BRAND, borderRadius: 999, margin: ".8rem 0 1.1rem", opacity: 0.9 }} />

                        <p style={{ marginTop: 0, lineHeight: 1.75, color: "#334155", fontSize: "clamp(1rem, 1.05vw, 1.06rem)" }}>
                            ICare grew from first-hand 24/7 live-in care experience across Europe. We combine healthcare and technology expertise to create a more
                            compassionate, transparent, and secure way to match families and caregivers.
                        </p>
                        <p style={{ marginTop: "1rem", lineHeight: 1.75, color: "#334155", fontSize: "clamp(1rem, 1.05vw, 1.06rem)" }}>
                            We minimise friction, prioritise privacy, and keep costs fair — so great care can start sooner.
                        </p>
                    </article>
                </div>
            </section>

            {/* ===== VALUES ===== */}
            <section
                id="values"
                aria-label="ICare values"
                style={{
                    background: "#eaeaeaff",
                    borderTop: "1px solid rgba(31,171,31,.08)",
                    borderBottom: "1px solid rgba(31,171,31,.08)",
                    margin: "4.5rem 0 0",
                    padding: "clamp(3rem,5vw,5rem) clamp(16px,4vw,32px)"
                }}
            >
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <h2 style={{ margin: 0, fontWeight: 900, letterSpacing: ".2px", color: "#0F172A", fontSize: "clamp(1.7rem,3.4vw,2.2rem)", lineHeight: 1.15 }}>
                        Our Values
                    </h2>
                    <p style={{ margin: "0.6rem 0 1.8rem", color: "#475569", maxWidth: "62ch", lineHeight: 1.6 }}>
                        People first. Privacy by design. Clear, fair collaboration between families and caregivers.
                    </p>
                    <div aria-hidden="true" style={{ width: 200, height: 4, background: BRAND, borderRadius: 999, margin: ".4rem 0 2rem", opacity: 0.9 }} />

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "clamp(16px,2.8vw,28px)" }}>
                        {[
                            {
                                t: "Dignity & respect",
                                d: "We put people first — families and caregivers — in every choice we make.",
                                icon: (
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                )
                            },
                            {
                                t: "Privacy by design",
                                d: "Data minimisation, clear controls, and secure processes from day one.",
                                icon: (
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <rect x="3" y="11" width="18" height="10" rx="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                )
                            },
                            {
                                t: "Fair & transparent",
                                d: "Simple pricing and no hidden fees. Everyone knows where they stand.",
                                icon: (
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M21 15V8a2 2 0 0 0-2-2h-5" />
                                        <path d="M3 8v7a2 2 0 0 0 2 2h5" />
                                        <path d="M7 10h3" />
                                        <path d="M14 14h3" />
                                    </svg>
                                )
                            },
                            {
                                t: "Trust & safety",
                                d: "Verified profiles, guidance, and safer matching practices.",
                                icon: (
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                )
                            }
                        ].map((card) => (
                            <article
                                key={card.t}
                                style={{
                                    position: "relative",
                                    borderRadius: 20,
                                    background: "rgba(255,255,255,0.9)",
                                    border: "1px solid rgba(31,171,31,.15)",
                                    boxShadow: "0 6px 18px rgba(2,8,23,.05)",
                                    padding: "clamp(20px,2vw,26px)",
                                    color: "#334155",
                                    textAlign: "left",
                                    backdropFilter: "blur(6px)"
                                }}
                            >
                                <span aria-hidden="true" style={{ position: "absolute", inset: "0 auto 0 0", width: 4, background: BRAND, opacity: 0.85, borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }} />
                                <div
                                    style={{
                                        width: 46, height: 46, borderRadius: 12, display: "grid", placeItems: "center",
                                        background: "rgba(31,171,31,.08)", border: "1px solid rgba(31,171,31,.22)", color: BRAND_DARK, marginBottom: 12
                                    }}
                                    aria-hidden="true"
                                >
                                    {card.icon}
                                </div>

                                <h3 style={{ margin: "0 0 .4rem", color: "#0F172A", fontWeight: 900, letterSpacing: ".2px", fontSize: "clamp(1.06rem,2vw,1.22rem)", lineHeight: 1.25 }}>
                                    {card.t}
                                </h3>
                                <p style={{ margin: 0, lineHeight: 1.65, fontSize: ".98rem" }}>{card.d}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== HOW WE WORK ===== */}
            <section
                id="howwework"
                aria-label="How We Work"
                style={{ maxWidth: 1100, margin: "4.5rem auto 0", padding: "0 clamp(16px,4vw,32px)" }}
            >
                <h2 style={{ margin: 0, fontWeight: 900, letterSpacing: ".2px", color: "#0F172A", fontSize: "clamp(1.7rem,3.4vw,2.2rem)", lineHeight: 1.15 }}>
                    How We Work
                </h2>
                <p style={{ margin: "8px 0 18px", color: "#475569", maxWidth: "62ch", lineHeight: 1.6 }}>
                    A clear, privacy-first process that connects families and caregivers directly — no middlemen, no hidden fees.
                </p>
                <div aria-hidden="true" style={{ width: 200, height: 4, background: BRAND, borderRadius: 999, margin: ".4rem 0 1.6rem", opacity: 0.9 }} />

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, minmax(220px,1fr))",
                        gap: "clamp(14px,2.4vw,22px)"
                    }}
                >
                    {/* Step 1 */}
                    <article
                        style={{
                            borderRadius: 18,
                            background: "linear-gradient(180deg,#FFFFFF 0%, #F7FFF8 100%)",
                            border: "1px solid rgba(31,171,31,.22)",
                            boxShadow: "0 10px 24px rgba(2,8,23,.05)",
                            padding: "clamp(16px,2vw,20px)"
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                            <div
                                aria-hidden="true"
                                style={{
                                    width: 40, height: 40, borderRadius: 12, display: "grid", placeItems: "center",
                                    background: "rgba(31,171,31,.10)", border: "1px solid rgba(31,171,31,.25)", color: BRAND_DARK, fontWeight: 900
                                }}
                            >
                                1
                            </div>
                            <h3 style={{ margin: 0, fontWeight: 900, fontSize: "1.05rem", color: "#0F172A" }}>Brief & preferences</h3>
                        </div>
                        <p style={{ margin: 0, color: "#334155", lineHeight: 1.65 }}>
                            Tell us your needs, schedule and preferred skills. We minimise data — only what’s necessary.
                        </p>
                    </article>

                    {/* Step 2 */}
                    <article
                        style={{
                            borderRadius: 18,
                            background: "linear-gradient(180deg,#FFFFFF 0%, #F5FBFF 100%)",
                            border: "1px solid rgba(2,132,199,.18)",
                            boxShadow: "0 10px 24px rgba(2,8,23,.05)",
                            padding: "clamp(16px,2vw,20px)"
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                            <div
                                aria-hidden="true"
                                style={{
                                    width: 40, height: 40, borderRadius: 12, display: "grid", placeItems: "center",
                                    background: "rgba(2,132,199,.1)", border: "1px solid rgba(2,132,199,.25)", color: "#075985", fontWeight: 900
                                }}
                            >
                                2
                            </div>
                            <h3 style={{ margin: 0, fontWeight: 900, fontSize: "1.05rem", color: "#0F172A" }}>Direct matching</h3>
                        </div>
                        <p style={{ margin: 0, color: "#334155", lineHeight: 1.65 }}>
                            We show verified profiles that fit your brief — you speak directly with candidates.
                        </p>
                    </article>

                    {/* Step 3 */}
                    <article
                        style={{
                            borderRadius: 18,
                            background: "linear-gradient(180deg,#FFFFFF 0%, #FFF7F3 100%)",
                            border: "1px solid rgba(234,88,12,.18)",
                            boxShadow: "0 10px 24px rgba(2,8,23,.05)",
                            padding: "clamp(16px,2vw,20px)"
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                            <div
                                aria-hidden="true"
                                style={{
                                    width: 40, height: 40, borderRadius: 12, display: "grid", placeItems: "center",
                                    background: "rgba(234,88,12,.08)", border: "1px solid rgba(234,88,12,.22)", color: "#9A3412", fontWeight: 900
                                }}
                            >
                                3
                            </div>
                            <h3 style={{ margin: 0, fontWeight: 900, fontSize: "1.05rem", color: "#0F172A" }}>Agree & start</h3>
                        </div>
                        <p style={{ margin: 0, color: "#334155", lineHeight: 1.65 }}>
                            You agree terms directly with the caregiver. We provide guidance and safer-practice templates.
                        </p>
                    </article>
                </div>

                <div style={{ marginTop: 16 }}>
                    <a
                        href="/how-it-works"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            textDecoration: "none",
                            fontWeight: 800,
                            letterSpacing: ".3px",
                            fontSize: ".95rem",
                            padding: ".75rem 1.1rem",
                            borderRadius: 999,
                            color: "#fff",
                            background: BRAND,               // zielony przycisk
                            border: "1px solid rgba(31,171,31,.35)",
                            boxShadow: "0 10px 24px rgba(2,8,23,.12)"
                        }}
                    >
                        Explore full process
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14" />
                            <path d="M13 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </section>

            {/* ===== OUR IMPACT ===== */}
            <section
                id="impact"
                aria-label="Impact metrics"
                style={{ maxWidth: 1100, margin: "4.5rem auto 0", padding: "0 clamp(16px,4vw,32px)" }}
            >
                <h2 style={{ margin: 0, fontWeight: 900, letterSpacing: ".2px", color: "#0F172A", fontSize: "clamp(1.7rem,3.4vw,2.2rem)", lineHeight: 1.15 }}>
                    Our Impact
                </h2>
                <p style={{ margin: "8px 0 18px", color: "#475569", maxWidth: "62ch", lineHeight: 1.6 }}>
                    We measure what matters: safer matches, fairer pay, and faster starts.
                </p>
                <div aria-hidden="true" style={{ width: 200, height: 4, background: BRAND, borderRadius: 999, margin: ".4rem 0 1.6rem", opacity: 0.9 }} />

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, minmax(140px,1fr))",
                        gap: "clamp(12px,2.2vw,20px)"
                    }}
                >
                    {[
                        { n: "2.3×", l: "Faster matching", d: "from first call to start date" },
                        { n: "94%", l: "5-star feedback", d: "from families & caregivers" },
                        { n: "−18%", l: "Lower total cost", d: "vs. traditional agencies" },
                        { n: "100%", l: "Profiles verified", d: "ID + references" }
                    ].map((k) => (
                        <div
                            key={k.l}
                            style={{
                                borderRadius: 16,
                                background: "#fff",
                                border: "1px solid rgba(31,171,31,.18)",
                                boxShadow: "0 8px 18px rgba(2,8,23,.05)",
                                padding: "16px"
                            }}
                        >
                            <div style={{ fontWeight: 900, fontSize: "clamp(1.2rem,2vw,1.6rem)", color: BRAND_DARK }}>{k.n}</div>
                            <div style={{ fontWeight: 800, marginTop: 4 }}>{k.l}</div>
                            <div style={{ color: "#64748b", fontSize: ".95rem" }}>{k.d}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== CONTACT CTA ===== */}
            <section id="contact" aria-label="Contact us" style={{ margin: "3.5rem 0 4.5rem", padding: "0 clamp(16px,4vw,32px)" }}>
                <div
                    style={{
                        maxWidth: 1100,
                        margin: "0 auto",
                        borderRadius: 18,
                        border: "1px solid rgba(31,171,31,.22)",
                        background: "#FFFFFF",
                        boxShadow: "0 12px 28px rgba(2,8,23,.06)",
                        padding: "clamp(18px,2vw,26px)",
                        display: "grid",
                        gap: 10,
                        alignItems: "center"
                    }}
                >
                    <h3 style={{ margin: 0, color: "#0F172A", fontWeight: 900, fontSize: "clamp(1.2rem,2.4vw,1.6rem)" }}>
                        Want to learn more or partner with us?
                    </h3>
                    <p style={{ margin: 0, color: "#334155", lineHeight: 1.65 }}>
                        We’re happy to talk. Tell us about your needs — we’ll get back within 1–2 business days.
                    </p>
                    <div style={{ display: "flex", gap: 12, marginTop: 6, flexWrap: "wrap" }}>
                        <a
                            href="mailto:hello@icare.example"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                textDecoration: "none",
                                fontWeight: 800,
                                letterSpacing: ".3px",
                                fontSize: ".95rem",
                                padding: ".75rem 1.1rem",
                                borderRadius: 999,
                                color: "#fff",
                                background: BRAND,
                                border: "1px solid rgba(31,171,31,.35)",
                                boxShadow: "0 10px 24px rgba(2,8,23,.12)"
                            }}
                        >
                            Email us
                        </a>
                        <Link
                            to="/how-it-works"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                textDecoration: "none",
                                fontWeight: 800,
                                letterSpacing: ".3px",
                                fontSize: ".95rem",
                                padding: ".75rem 1.1rem",
                                borderRadius: 999,
                                color: "#0F172A",
                                background: "#FFFFFF",
                                border: "1.5px solid rgba(31,171,31,.45)"
                            }}
                        >
                            Explore how it works
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className={styles.footer} style={{ borderTop: "1px solid #e2e8f0", background: "#fff" }}>
                <ul
                    className={styles.listReset}
                    style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", gap: ".75rem", flexWrap: "wrap", justifyContent: "center" }}
                >
                    <li><Link to="/" className={styles.footerLink} style={{ textDecoration: "none", color: BRAND_DARK }}>Home</Link></li>
                    <li><Link to="/landing" className={styles.footerLink} style={{ textDecoration: "none", color: BRAND_DARK }}>Landing</Link></li>
                    <li><Link to="/privacy" className={styles.footerLink} style={{ textDecoration: "none", color: BRAND_DARK }}>Privacy</Link></li>
                </ul>
                <div className={styles.copy} style={{ marginTop: ".75rem", textAlign: "center", color: "#64748b" }}>
                    © {new Date().getFullYear()} ICare. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
