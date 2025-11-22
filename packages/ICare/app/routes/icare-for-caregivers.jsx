import React, { useEffect, useRef } from "react";
import { Link } from "react-router";
import heroImage from "/images/heros/icare-for-caregivers.jpg";

export default function ICareForCaregivers() {
    const BRAND = "#1FAB1F";
    const NEUTRAL = "#0F172A";
    const BORDER = "#E5E7EB";
    const SUBTLE = "#F7FAF8"; // delikatny papier z nutą brandu

    const pageWrap = {
        fontFamily:
            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: NEUTRAL,
        background: "linear-gradient(180deg, #FAFCFD 0%, #FFFFFF 70%)",
    };

    const container = {
        width: "min(1100px, 92vw)",
        margin: "0 auto",
        padding: "0 clamp(16px,4vw,32px)",
    };

    const sectionTitle = {
        margin: 0,
        fontWeight: 900,
        color: "#1f2a37",
        fontSize: "clamp(1.35rem,2.6vw,1.9rem)",
        letterSpacing: ".2px",
        lineHeight: 1.25,
        textAlign: "left",
    };

    // Scroll-reveal refs
    const stepRefs = useRef([]);
    useEffect(() => {
        const els = stepRefs.current.filter(Boolean);
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("reveal--in");
                        io.unobserve(e.target);
                    }
                });
            },
            { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    const steps = [
        {
            t: "Simple and free registration",
            d: "Create your account safely with base information only.",
        },
        {
            t: "Contact clients directly",
            d: "Message families to understand needs and expectations before you agree.",
        },
        {
            t: "Increase your earnings",
            d: "Agree terms directly — keep more of your hard-earned income.",
        },
        {
            t: "Tailor your profile",
            d: "Upload CV/resume, add checks and specialist skills to boost visibility.",
        },
        {
            t: "Manage your own employment contracts",
            d: "Set schedule & rate, e-sign your agreement and keep everything in one place.",
        },
    ];

    return (
        <div style={pageWrap}>
            {/* === HERO === */}
            <section
                aria-label="ICare for Caregivers hero"
                style={{
                    position: "relative",
                    minHeight: "clamp(560px, 76vh, 900px)",
                    width: "100%",
                    overflow: "hidden",
                    display: "grid",
                    placeItems: "center",
                    color: "#fff",
                    background: "#0f172a",
                    fontFamily:
                        "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                }}
            >
                {/* BACKGROUND IMG */}
                <img
                    src={heroImage}
                    alt="Care coordination background"
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "brightness(.78) saturate(.95)",
                        zIndex: 1,
                    }}
                />

                {/* SOFT OVERLAY — AIRBNB STYLE */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(180deg, rgba(0,0,0,.15) 0%, rgba(0,0,0,.45) 70%)",
                        zIndex: 2,
                    }}
                />

                {/* HEADER – light, premium */}
                <header
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        padding: "1.1rem clamp(16px,4vw,36px)",
                        zIndex: 5,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backdropFilter: "blur(6px)",
                    }}
                >
                    <Link
                        to="/"
                        style={{
                            fontWeight: 900,
                            fontSize: "clamp(1.4rem,2.2vw,1.6rem)",
                            color: "#fff",
                            textDecoration: "none",
                            letterSpacing: "-0.5px",
                            textShadow: "0 2px 8px rgba(0,0,0,.35)",
                        }}
                    >
                        ICare
                    </Link>

                    <nav
                        style={{
                            display: "flex",
                            gap: "1rem",
                            flexWrap: "wrap",
                        }}
                    >
                        {[
                            { to: "/", label: "Home" },
                            { to: "/how-it-works", label: "How it Works" },
                            { to: "/who-we-are", label: "Who We Are" },
                            { to: "/privacy", label: "Privacy" },
                            { to: "/icare-for-caregivers", label: "ICare For Caregivers" },
                            { to: "/icare-for-carereceivers", label: "ICare For Care Receivers" },
                        ].map((l) => (
                            <Link
                                key={l.to}
                                to={l.to}
                                style={{
                                    color: "rgba(255,255,255,.92)",
                                    textDecoration: "none",
                                    padding: ".45rem .75rem",
                                    borderRadius: 999,
                                    fontWeight: 600,
                                    fontSize: "clamp(.85rem,1.15vw,1rem)",
                                    transition: "all .25s ease",
                                    backdropFilter: "blur(4px)",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "rgba(255,255,255,.18)";
                                    e.currentTarget.style.color = "#fff";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "transparent";
                                    e.currentTarget.style.color = "rgba(255,255,255,.92)";
                                }}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>
                </header>

                {/* ======================= HERO COPY ======================= */}
                <div
                    style={{
                        position: "relative",
                        zIndex: 5,
                        width: "min(1100px, 92vw)",
                        marginInline: "auto",
                        padding: "clamp(4rem, 6vw, 6rem) 0",
                        textAlign: "left",
                        transform: "translateX(-8%)", // Airbnb-like left shift
                    }}
                >
                    {/* BADGE Airbnb tag */}
                    <span
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: ".55rem 1rem",
                            borderRadius: 999,
                            fontSize: "clamp(.82rem, 1.2vw, 1rem)",
                            fontWeight: 800,
                            letterSpacing: ".15em",
                            textTransform: "uppercase",
                            color: "#EAF7EA",
                            background: "rgba(31,171,31,0.22)",
                            border: "2px solid rgba(31,171,31,0.32)",
                            backdropFilter: "blur(4px)",
                            marginBottom: "1.4rem",
                            textShadow: "0 1px 3px rgba(0,0,0,.3)",
                        }}
                    >
                        direct · fair · transparent
                    </span>

                    {/* TITLE */}
                    <h1
                        style={{
                            fontWeight: 900,
                            letterSpacing: "-0.3px",
                            lineHeight: 1.05,
                            fontSize: "clamp(2.4rem, 5vw, 3.4rem)",
                            margin: "0 0 1rem 0",
                            color: "#fff",
                            textShadow: "0 3px 12px rgba(0,0,0,.45)",
                        }}
                    >
                        ICare for Caregivers
                    </h1>

                    {/* LEAD TEXT */}
                    <p
                        style={{
                            fontSize: "clamp(1.05rem,1.2vw,1.2rem)",
                            lineHeight: 1.65,
                            maxWidth: "62ch",
                            color: "rgba(255,255,255,.95)",
                            fontWeight: 500,
                            marginBottom: "1.8rem",
                            textShadow: "0 1px 8px rgba(0,0,0,.35)",
                        }}
                    >
                        <strong>Easily agree your care terms directly with your client.</strong>
                        No agency markup. No hidden fees.
                    </p>

                    {/* BULLET LIST – Airbnb style */}
                    <ul
                        style={{
                            listStyle: "none",
                            padding: 0,
                            margin: "1.2rem 0 2rem 0",
                            display: "grid",
                            gap: ".7rem",
                            maxWidth: 820,
                        }}
                    >
                        {[
                            "Find care roles that suit your skills and experience",
                            "Schedule and manage everything in one place",
                            "Keep more of your hard-earned income",
                            "Free registration — no subscription",
                        ].map((text, i) => (
                            <li
                                key={i}
                                style={{
                                    position: "relative",
                                    paddingLeft: "2rem",
                                    fontSize: "clamp(1rem, 1.2vw, 1.12rem)",
                                    lineHeight: 1.62,
                                    color: "rgba(255,255,255,.98)",
                                    textShadow: "0 1px 8px rgba(0,0,0,.45)",
                                }}
                            >
                                <span
                                    style={{
                                        position: "absolute",
                                        left: 0,
                                        top: "0.2rem",
                                        fontWeight: 800,
                                        fontSize: "1.1rem",
                                        color: "#fff",
                                    }}
                                >
                                    ✓
                                </span>

                                {/* bold last part */}
                                {i < 3 ? (
                                    <>
                                        {text.split(" ").slice(0, 4).join(" ")}{" "}
                                        <strong>{text.split(" ").slice(4).join(" ")}</strong>
                                    </>
                                ) : (
                                    <strong>{text}</strong>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* CTA BUTTON */}
                    <Link
                        to="/register"
                        style={{
                            display: "inline-block",
                            padding: "1rem 2rem",
                            borderRadius: 999,
                            background: "rgb(76, 120, 101)",
                            color: "#fff",
                            fontWeight: 800,
                            letterSpacing: ".03em",
                            textDecoration: "none",
                            fontSize: "clamp(1rem,1.2vw,1.1rem)",
                            boxShadow: "0 10px 28px rgba(0,0,0,.25)",
                            transition: "all .25s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-3px)";
                            e.currentTarget.style.background = "rgb(86, 138, 115)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.background = "rgb(76, 120, 101)";
                        }}
                    >
                        QUICK REGISTRATION
                    </Link>
                </div>
            </section>

            {/* === CAREGIVER INTRO — bez zielonej kreski, spójna kolorystyka === */}
            <section
                id="caregiver-steps"
                aria-label="Caregiver steps"
                style={{
                    margin: "4.5rem auto",                    // MNIEJ miejsca u góry i dołu
                    width: "min(1100px, 92vw)",
                    fontFamily:
                        "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                    paddingInline: "1.4rem",                 // węższe marginesy
                }}
            >
                {/* HEADER */}
                <header style={{ textAlign: "center", marginBottom: "3rem" }}>
                    <h3
                        style={{
                            margin: 0,
                            fontWeight: 900,
                            letterSpacing: "-0.5px",
                            fontSize: "clamp(1.8rem,2.6vw,2.4rem)", // MNIEJSZY tytuł
                            color: "#0F172A",
                            lineHeight: 1.15,
                        }}
                    >
                        Get started in 5 clear steps
                    </h3>

                    <p
                        style={{
                            marginTop: ".7rem",
                            color: "#4C7865",
                            fontSize: "1.08rem",            // MNIEJSZY subtitle
                            fontWeight: 600,
                            letterSpacing: ".02em",
                            opacity: 0.9,
                        }}
                    >
                        From signup to your first match.
                    </p>

                    <div
                        aria-hidden="true"
                        style={{
                            width: "70px",                   // CIENIEJSZA linia
                            height: 3,
                            background: "#4C7865",
                            borderRadius: 999,
                            margin: "1.1rem auto 0",
                            opacity: 0.8,
                        }}
                    />
                </header>

                {/* === NEW COMPACT GRID === */}
                <div
                    style={{
                        display: "grid",
                        gap: "2.8rem",                     // MNIEJSZA przerwa między kartami
                        width: "min(860px, 90vw)",         // WĘŻSZA cała sekcja
                        margin: "0 auto",
                    }}
                >
                    {steps.map((p, idx) => {
                        const alt = idx % 2 === 1;

                        const bg = alt ? "#F5FAF7" : "#FFFFFF";

                        const images = [
                            "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=900&q=80",
                            "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=900&q=80",
                            "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?auto=format&fit=crop&w=900&q=80",
                            "https://images.unsplash.com/photo-1604882737206-599d53f4f524?auto=format&fit=crop&w=900&q=80",
                            "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=900&q=80",
                        ];

                        return (
                            <article
                                key={p.t}
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: alt ? "1fr 150px" : "150px 1fr", // MNIEJSZE zdjęcia
                                    gap: "1.6rem",                                         // MNIEJSZY krok
                                    alignItems: "center",
                                    padding: "clamp(20px,2.4vw,30px)",                    // MNIEJ paddingu
                                    background: bg,
                                    borderRadius: "22px",
                                    border: "1px solid rgba(76,120,101,0.18)",
                                    boxShadow: "0 10px 22px rgba(0,0,0,0.05)",            // ciut lżejszy cień
                                    opacity: 0,
                                    transform: "translateY(18px)",
                                    animation: `fadeUp .7s ease forwards ${0.15 + idx * 0.16}s`,
                                }}
                            >
                                {/* IMAGE */}
                                <figure
                                    style={{
                                        order: alt ? 2 : 0,
                                        margin: 0,
                                        width: "100%",
                                        height: "150px",              // ⬅️ KLUCZOWA zmiana: niższe zdjęcia
                                        borderRadius: "18px",
                                        overflow: "hidden",
                                        border: "1px solid rgba(0,0,0,0.06)",
                                        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                                    }}
                                >
                                    <img
                                        src={images[idx % images.length]}
                                        alt=""
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            objectPosition: "center",
                                        }}
                                    />
                                </figure>

                                {/* TEXT */}
                                <div style={{ order: alt ? 1 : 1 }}>
                                    <div
                                        style={{
                                            width: "44px",               // MNIEJSZY badge
                                            height: "44px",
                                            borderRadius: "14px",
                                            background: "#E6F3EC",
                                            border: "1px solid #B9D9CA",
                                            display: "grid",
                                            placeItems: "center",
                                            fontWeight: 900,
                                            fontSize: "1.15rem",
                                            color: "#4C7865",
                                            marginBottom: "1rem",
                                            boxShadow: "0 4px 10px rgba(76,120,101,0.12)",
                                        }}
                                    >
                                        {idx + 1}
                                    </div>

                                    <h4
                                        style={{
                                            margin: "0 0 .45rem",
                                            fontSize: "clamp(1.15rem,1.7vw,1.4rem)",
                                            fontWeight: 850,
                                            color: "#0F172A",
                                            letterSpacing: "-0.25px",
                                            lineHeight: 1.25,
                                        }}
                                    >
                                        {p.t}
                                    </h4>

                                    <p
                                        style={{
                                            margin: 0,
                                            color: "#475569",
                                            fontSize: "1rem",
                                            lineHeight: 1.55,
                                            maxWidth: "54ch",
                                        }}
                                    >
                                        {p.d}
                                    </p>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* CTA BUTTON */}
                <div style={{ marginTop: "3.6rem", textAlign: "center" }}>
                    <a
                        href="/register"
                        style={{
                            display: "inline-block",
                            background: "#4C7865",
                            color: "#fff",
                            fontWeight: 800,
                            padding: "0.95rem 2rem",       // MNIEJSZY button
                            borderRadius: 999,
                            letterSpacing: ".03em",
                            fontSize: "1.05rem",
                            textDecoration: "none",
                            boxShadow: "0 12px 32px rgba(76,120,101,0.22)",
                            transition: "all .25s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow =
                                "0 16px 38px rgba(76,120,101,0.30)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                                "0 12px 32px rgba(76,120,101,0.22)";
                        }}
                    >
                        CREATE YOUR FREE ACCOUNT
                    </a>
                </div>

                <style>{`
    @keyframes fadeUp {
        from { opacity: 0; transform: translateY(18px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @media (max-width: 760px) {
        article {
            grid-template-columns: 1fr !important;
        }
        figure {
            height: 130px !important;
        }
    }
`}</style>
            </section>

            {/* === WHO CAN JOIN === */}
            <section
                aria-label="Who can join – Luxe Black & White"
                style={{
                    margin: "5rem auto 5rem",                             // ⬅️ MNIEJ pionu
                    width: "min(1100px, 92vw)",
                    padding: "clamp(32px, 4vw, 48px)",                    // ⬅️ MNIEJ paddingu
                    borderRadius: 32,
                    background: "linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)",
                    boxShadow: "0 12px 36px rgba(0,0,0,0.04)",            // subtelniej
                    border: "1px solid rgba(0,0,0,0.08)",
                    fontFamily:
                        'Inter, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                }}
            >
                {/* HEADER */}
                <header style={{ marginBottom: "2.6rem" }}>                {/* ⬅️ mniej miejsca */}
                    <h2
                        style={{
                            margin: 0,
                            fontWeight: 900,
                            fontSize: "clamp(1.9rem,2.6vw,2.5rem)",       // ⬅️ mniejsze
                            letterSpacing: "-0.5px",
                            lineHeight: 1.18,
                            color: "#111",
                        }}
                    >
                        Who can join ICare
                    </h2>

                    <p
                        style={{
                            marginTop: "0.7rem",
                            color: "#444",
                            fontSize: "1.05rem",                           // ⬅️ mniejsze, premium
                            lineHeight: 1.65,
                            maxWidth: "58ch",
                            fontWeight: 500,
                        }}
                    >
                        Verified, trusted caregivers with real experience and a human approach.
                    </p>

                    <div
                        style={{
                            width: 80,                                     // ⬅️ krótsza linia
                            height: 3,
                            background: "#000",
                            borderRadius: 999,
                            marginTop: "1rem",
                            opacity: 0.9,
                        }}
                    />
                </header>

                {/* CARDS */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "clamp(22px,2vw,30px)",                       // ⬅️ ciaśniej
                    }}
                >
                    {[
                        {
                            t: "Professional caregivers & nurses",
                            d: "Verified experience, strong references and excellent communication.",
                            icon: (
                                <svg
                                    width="28"
                                    height="28"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#111"
                                    strokeWidth="1.6"                      // ⬅️ smuklej
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="8" r="4" />
                                    <path d="M6 20v-1a6 6 0 0 1 12 0v1" />
                                </svg>
                            ),
                        },
                        {
                            t: "Live-in & flexible hours",
                            d: "Full-time, flexible schedules or live-in support tailored to each family.",
                            icon: (
                                <svg
                                    width="28"
                                    height="28"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#111"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                            ),
                        },
                        {
                            t: "Specialist care expertise",
                            d: "Dementia care, mobility support or post-surgery recovery.",
                            icon: (
                                <svg
                                    width="28"
                                    height="28"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#111"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 1v22" />
                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" />
                                </svg>
                            ),
                        },
                        {
                            t: "Languages & driving",
                            d: "Multilingual caregivers and certified drivers highly valued.",
                            icon: (
                                <svg
                                    width="28"
                                    height="28"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#111"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M2 12h20" />
                                    <path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10A15 15 0 0 1 12 2z" />
                                </svg>
                            ),
                        },
                    ].map((item, i) => (
                        <article
                            key={item.t}
                            style={{
                                background: "#FFFFFF",
                                borderRadius: 24,
                                border: "1px solid rgba(0,0,0,0.10)",
                                padding: "26px 24px",                        // ⬅️ MNIEJSZE
                                boxShadow: "0 14px 32px rgba(0,0,0,0.05)",
                                display: "grid",
                                gap: 14,                                      // ⬅️ ciaśniej
                                transition:
                                    "transform .28s ease, box-shadow .28s ease, border-color .28s ease",
                                opacity: 0,
                                transform: "translateY(20px)",
                                animation: `fadeUpBW .7s ease forwards ${i * 0.10}s`,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-5px)";
                                e.currentTarget.style.boxShadow = "0 18px 42px rgba(0,0,0,0.10)";
                                e.currentTarget.style.borderColor = "rgba(0,0,0,0.20)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 14px 32px rgba(0,0,0,0.05)";
                                e.currentTarget.style.borderColor = "rgba(0,0,0,0.10)";
                            }}
                        >
                            {/* ICON */}
                            <div
                                style={{
                                    width: 58,
                                    height: 58,
                                    borderRadius: 18,
                                    background: "#E6F4EF",                    // ⬅️ pastel mint (bardziej premium)
                                    border: "1px solid #C9E4D9",
                                    display: "grid",
                                    placeItems: "center",
                                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
                                }}
                            >
                                {item.icon}
                            </div>

                            <strong
                                style={{
                                    color: "#111",
                                    fontSize: "1.12rem",                      // ciut mniejsze
                                    fontWeight: 900,
                                    letterSpacing: "-0.25px",
                                }}
                            >
                                {item.t}
                            </strong>

                            <p
                                style={{
                                    margin: 0,
                                    color: "#333",
                                    lineHeight: 1.65,
                                    fontSize: "1.02rem",
                                    fontWeight: 450,
                                }}
                            >
                                {item.d}
                            </p>
                        </article>
                    ))}
                </div>

                <style>{`
        @keyframes fadeUpBW {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `}</style>
            </section>



            {/* === FAQ === */}
            <section aria-label="Caregivers FAQ" style={{ ...container, margin: "0 auto 3.75rem" }}>
                <h2 style={sectionTitle}>Frequently asked questions</h2>
                <div
                    style={{
                        width: 420,
                        maxWidth: "90%",
                        height: 4,
                        background: BRAND,
                        borderRadius: 999,
                        margin: ".75rem 0 1.5rem 0",
                        opacity: 0.95,
                    }}
                />
                <div style={{ display: "grid", gap: 10 }}>
                    {[
                        {
                            q: "Is registration really free?",
                            a: "Yes. You only pay a flat 10% fee on the contract when you agree terms with a family.",
                        },
                        {
                            q: "Can I negotiate my rate?",
                            a: "Absolutely. You agree the hourly/daily rate directly with the family in the chat and contract.",
                        },
                        {
                            q: "How do contracts and payments work?",
                            a: "Set schedule and rate, e-sign your agreement, then manage everything in one place in ICare.",
                        },
                        {
                            q: "Do I need documents?",
                            a: "We recommend a CV/resume and any checks/certifications to increase trust and visibility.",
                        },
                    ].map((f) => (
                        <details
                            key={f.q}
                            style={{
                                background: "#FFFFFF",
                                border: "1px solid rgba(15,23,42,0.10)",
                                borderRadius: 14,
                                padding: "12px 14px",
                            }}
                        >
                            <summary
                                style={{
                                    listStyle: "none",
                                    cursor: "pointer",
                                    fontWeight: 800,
                                    color: NEUTRAL,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: 12,
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.color = BRAND)}
                                onMouseOut={(e) => (e.currentTarget.style.color = NEUTRAL)}
                            >
                                {f.q}
                                <span aria-hidden="true" style={{ color: BRAND }}>
                                    +
                                </span>
                            </summary>
                            <div style={{ marginTop: 8, color: "#334155", lineHeight: 1.65 }}>{f.a}</div>
                        </details>
                    ))}
                </div>
            </section>

            {/* === CONTACT CTA (full-bleed green) === */}
            <section
                aria-label="Contact CTA"
                style={{
                    marginLeft: "calc(50% - 50vw)",
                    marginRight: "calc(50% - 50vw)",
                    width: "100vw",
                    background: BRAND,
                    color: "#FFFFFF",
                }}
            >
                <div
                    style={{
                        ...container,
                        maxWidth: 1200,
                        padding: "28px clamp(16px,4vw,32px)",
                        display: "grid",
                        gridTemplateColumns: "1fr auto",
                        gap: 16,
                        alignItems: "center",
                    }}
                >
                    <div>
                        <h3
                            style={{
                                margin: 0,
                                fontWeight: 900,
                                fontSize: "clamp(1.15rem,2.2vw,1.5rem)",
                                color: "#FFFFFF",
                            }}
                        >
                            Need help setting up your profile?
                        </h3>
                        <p style={{ margin: "6px 0 0", color: "rgba(252, 251, 251, 1)" }}>
                            We’ll guide you through matching and agreements — quick and friendly.
                        </p>
                    </div>
                    <a
                        href="/contact"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            textDecoration: "none",
                            color: BRAND,
                            background: "#FFFFFF",
                            padding: ".9rem 1.2rem",
                            borderRadius: 999,
                            fontWeight: 900,
                            letterSpacing: ".02em",
                            border: "1px solid rgba(255,255,255,.6)",
                            boxShadow: "0 10px 24px rgba(2,8,23,.10)",
                            transition: "transform .15s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        Contact us
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
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
            </section>
        </div>
    );
}
