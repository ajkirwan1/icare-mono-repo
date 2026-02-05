import React, { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHandHoldingHeart,
    faClock,
    faMoon,
    faBrain,
    faCircleInfo,
    faChevronDown,
    faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";

/**
 * ICare — Types of support (Companionship-first, SEO, calm)
 * ✅ Types grid (companionship-only wording)
 * ✅ Soft disclaimer (callout + key cards + accordion)
 * ✅ Care-at-home section
 * ✅ Live-in / specialist sections REMOVED for companionship-only MVP
 * ✅ Fade-in on scroll (IntersectionObserver)
 *
 * Legal/Platform safeguards:
 * ✅ Matching platform statement
 * ✅ Direct agreement between users, not employer/agency/provider
 * ✅ Verification docs retention principles
 * ✅ No medical data by default + functional needs language
 * ✅ Support language = everyday support / companionship / agreed tasks
 */
export default function ICareTypesOfCareSEO() {
    const TEXT = "#0F172A";
    const ICON = "#dd8b4f";
    const BRAND = "#778d43";
    const MUTED = "rgba(15,23,42,0.72)";

    const careAtHomeRef = useRef(null);

    // Accordion state
    const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add("icare-fade--in");
                });
            },
            { threshold: 0.18, rootMargin: "0px 0px -80px 0px" }
        );

        if (careAtHomeRef.current) observer.observe(careAtHomeRef.current);

        return () => observer.disconnect();
    }, []);

    const wrap = {
        width: "100%",
        background: "rgba(255, 249, 239, 0.85)",
        color: TEXT,
        padding: "clamp(3rem, 5vw, 4rem) 0",
        fontFamily:
            "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    };

    const container = { width: "min(92vw, 1100px)", margin: "0 auto" };

    const header = {
        maxWidth: "78ch",
        display: "grid",
        gap: 0,
        margin: "0 0 clamp(26px, 3.8vw, 42px)",
        padding: 0,
        textAlign: "left",
    };

    const h1 = {
        margin: 0,
        padding: 0,
        fontWeight: 600,
        letterSpacing: "-0.6px",
        lineHeight: 1.14,
        fontSize: "2.4rem",
        color: TEXT,
    };

    const h2 = {
        margin: 0,
        paddingTop: "14px",
        fontWeight: 500,
        letterSpacing: "-0.2px",
        lineHeight: 1.25,
        fontSize: "1.4rem",
        color: TEXT,
    };

    const lead = {
        margin: "12px 0 0",
        padding: 0,
        color: TEXT,
        fontWeight: 500,
        lineHeight: 1.65,
        fontSize: "1.3rem",
        maxWidth: "78ch",
    };

    const list = {
        marginTop: "clamp(22px, 3.2vw, 34px)",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "clamp(18px, 2.2vw, 26px)",
        alignItems: "stretch",
    };

    const item = {
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
        padding: "18px 0",
        height: "100%",
        alignSelf: "stretch",
    };

    const iconWrap = {
        width: 30,
        height: 38,
        display: "inline-flex",
        alignItems: "start",
        justifyContent: "center",
        color: ICON,
        flex: "0 0 auto",
        marginTop: 2,
    };

    const icon = { fontSize: "24px", lineHeight: 1 };

    const content = { display: "flex", flexDirection: "column", gap: 6, minWidth: 0 };

    const title = {
        margin: 0,
        padding: 0,
        fontWeight: 700,
        letterSpacing: "-0.15px",
        color: TEXT,
        fontSize: "1.2rem",
        lineHeight: 1.4,
        whiteSpace: "normal",
        overflow: "visible",
    };

    const desc = {
        margin: 0,
        color: TEXT,
        fontWeight: 500,
        lineHeight: 1.65,
        fontSize: "1.1rem",
        whiteSpace: "normal",
        overflow: "visible",
    };

    const section = {
        marginTop: "clamp(26px, 3.6vw, 44px)",
        paddingTop: "40px",
        borderTop: "1px solid rgba(15, 23, 42, 0.10)",
        maxWidth: "110ch",
        scrollMarginTop: 30,
    };

    const sectionTitle = {
        margin: 0,
        fontWeight: 600,
        letterSpacing: "-0.2px",
        fontSize: "1.6rem",
        lineHeight: 1.35,
        color: TEXT,
    };

    const sectionText = {
        margin: "12px 0 0",
        color: TEXT,
        fontWeight: 400,
        lineHeight: 1.6,
        fontSize: "1.2rem",
    };

    const careHomeRow = {
        display: "grid",
        gridTemplateColumns: "440px 1fr",
        gap: "clamp(16px, 2.5vw, 28px)",
        alignItems: "start",
    };

    const imgWrap = {
        width: 440,
        height: 500,
        borderRadius: 18,
        overflow: "hidden",
        border: "1px solid rgba(15,23,42,0.12)",
        background: "#ffffffd7",
    };

    const img = {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
        objectPosition: "65% 50%",
        transform: "scale(1.2)",
    };

    // ✅ Disclaimer redesign (calm + scannable)
    const infoBox = {
        marginTop: "18px",
        border: "1px solid rgba(15,23,42,0.10)",
        borderRadius: "24px",
        background: "rgba(255, 255, 255, 0.78)",
        padding: "18px",
        maxWidth: "110ch",
        boxShadow: "0 1px 0 rgba(15,23,42,0.02)",
    };

    const callout = {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 14,
        padding: "14px 14px",
        borderRadius: "18px",
        background: "rgba(119, 141, 67, 0.10)",
        border: "1px solid rgba(119, 141, 67, 0.22)",
    };

    const calloutLeft = {
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        minWidth: 0,
    };

    const calloutIcon = {
        width: 28,
        height: 28,
        borderRadius: 10,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: TEXT,
        background: "rgba(255,255,255,0.9)",
        border: "1px solid rgba(15,23,42,0.10)",
        flex: "0 0 auto",
        marginTop: 2,
    };

    const calloutTitle = {
        margin: 0,
        fontWeight: 800,
        letterSpacing: "-0.2px",
        fontSize: "1.05rem",
        lineHeight: 1.35,
        color: TEXT,
    };

    const calloutText = {
        margin: "6px 0 0",
        color: MUTED,
        fontWeight: 400,
        lineHeight: 1.6,
        fontSize: "1.02rem",
    };

    const keyGrid = {
        marginTop: 14,
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: 12,
    };

    const keyCard = {
        borderRadius: 18,
        border: "1px solid rgba(15,23,42,0.10)",
        background: "rgba(255,249,239,0.55)",
        padding: "12px 12px",
    };

    const keyLabelRow = {
        display: "flex",
        alignItems: "center",
        gap: 8,
    };

    const keyDot = {
        width: 8,
        height: 8,
        borderRadius: 99,
        background: BRAND,
        flex: "0 0 auto",
    };

    const keyTitle = {
        margin: 0,
        fontWeight: 800,
        letterSpacing: "-0.1px",
        fontSize: "0.95rem",
        color: TEXT,
    };

    const keyBody = {
        margin: "6px 0 0",
        fontSize: "0.98rem",
        lineHeight: 1.6,
        color: MUTED,
    };

    const infoBtn = {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 14,
        border: "none",
        background: "transparent",
        padding: "14px 6px 6px",
        cursor: "pointer",
        textAlign: "left",
        color: TEXT,
    };

    const infoLeft = {
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        minWidth: 0,
    };

    const infoIconWrap = {
        width: 26,
        height: 26,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: TEXT,
        flex: "0 0 auto",
        marginTop: 1,
    };

    const infoTitle = {
        margin: 0,
        fontWeight: 800,
        letterSpacing: "-0.15px",
        fontSize: "1.0rem",
        lineHeight: 1.35,
        color: TEXT,
    };

    const infoIntro = {
        margin: "6px 0 0",
        color: MUTED,
        fontWeight: 400,
        lineHeight: 1.55,
        fontSize: "0.98rem",
    };

    const infoChevron = {
        color: TEXT,
        flex: "0 0 auto",
        marginLeft: 10,
    };

    const infoPanel = {
        marginTop: 10,
        paddingTop: 12,
        borderTop: "1px solid rgba(15,23,42,0.10)",
    };

    const infoSectionTitle = {
        margin: "14px 0 0",
        fontWeight: 800,
        fontSize: "0.98rem",
        letterSpacing: "-0.1px",
        color: TEXT,
    };

    const infoList = {
        margin: "10px 0 0",
        paddingLeft: "18px",
        color: MUTED,
        lineHeight: 1.65,
        fontSize: "0.98rem",
    };

    const infoItem = { margin: "6px 0" };

    // ✅ Companionship-first types (legal-safe wording)
    const types = [
        {
            icon: faHandHoldingHeart,
            t: "Companionship & everyday support",
            d: "Friendly company at home, conversation, walks and everyday routines.",
        },
        {
            icon: faClock,
            t: "Hourly companionship visits",
            d: "Flexible check-ins — from short visits to regular daily companionship.",
        },
        {
            icon: faMoon,
            t: "Overnight companionship (as agreed)",
            d: "Reassurance and presence through the night. Non-clinical support only.",
        },
        {
            icon: faClock,
            t: "Respite companionship (short-term)",
            d: "Short-term cover so family carers can rest or step away for a little while.",
        },
        {
            icon: faBrain,
            t: "Memory & routine support",
            d: "Consistent, familiar support matched to the person’s routines and preferences.",
        },
        {
            icon: faClock,
            t: "Routine reminders (non-clinical)",
            d: "Gentle prompts for agreed routines. No prescribing, administering or clinical decisions.",
        },
    ];

    return (
        <section aria-label="Types of support we help you arrange" style={wrap}>
            <div style={container}>
                <div style={header}>
                    <h1 style={h1}>Companionship and everyday support</h1>
                    <h2 style={h2}>A calm, practical way to find the right match</h2>
                    <p style={lead}>
                        ICare helps families connect with independent companions for{" "}
                        <strong style={{ fontWeight: 600 }}>everyday support</strong> — friendly
                        presence, routines and practical help agreed directly between you.
                    </p>
                </div>

                {/* TYPES GRID (layout stays the same) */}
                <div className="icare-types-grid" style={list}>
                    {types.map((x) => (
                        <div key={x.t} className="icare-types-item" style={item}>
                            <span style={iconWrap} aria-hidden="true">
                                <FontAwesomeIcon style={icon} icon={x.icon} />
                            </span>
                            <div style={content}>
                                <h3 style={title}>{x.t}</h3>
                                <p style={desc}>{x.d}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Disclaimer (callout + key cards + accordion details) */}
                <div style={infoBox}>
                    {/* Top callout */}
                    <div style={callout}>
                        <div style={calloutLeft}>
                            <span style={calloutIcon} aria-hidden="true">
                                <FontAwesomeIcon icon={faShieldHalved} />
                            </span>
                            <div style={{ minWidth: 0 }}>
                                <p style={calloutTitle}>Important information</p>
                                <p style={calloutText}>
                                    ICare is a matching platform. We do not provide regulated care services,
                                    and any support is agreed directly between users.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Key terms cards */}
                    <div style={keyGrid} aria-label="Key terms summary">
                        <div style={keyCard}>
                            <div style={keyLabelRow}>
                                <span style={keyDot} aria-hidden="true" />
                                <p style={keyTitle}>Direct agreement</p>
                            </div>
                            <p style={keyBody}>
                                Families/care receivers and companions agree details directly between
                                themselves.
                            </p>
                        </div>

                        <div style={keyCard}>
                            <div style={keyLabelRow}>
                                <span style={keyDot} aria-hidden="true" />
                                <p style={keyTitle}>Not an employer</p>
                            </div>
                            <p style={keyBody}>
                                ICare is not the employer of companions and does not supervise their work.
                            </p>
                        </div>

                        <div style={keyCard}>
                            <div style={keyLabelRow}>
                                <span style={keyDot} aria-hidden="true" />
                                <p style={keyTitle}>Non-clinical focus</p>
                            </div>
                            <p style={keyBody}>
                                We focus on companionship and everyday support — not clinical or nursing
                                care.
                            </p>
                        </div>
                    </div>

                    {/* Details accordion */}
                    <button
                        type="button"
                        style={infoBtn}
                        onClick={() => setIsDisclaimerOpen((v) => !v)}
                        aria-expanded={isDisclaimerOpen}
                        aria-controls="icare-disclaimer-panel"
                    >
                        <span style={infoLeft}>
                            <span style={infoIconWrap} aria-hidden="true">
                                <FontAwesomeIcon icon={faCircleInfo} />
                            </span>
                            <span style={{ minWidth: 0 }}>
                                <p style={infoTitle}>Disclaimer details</p>
                                <p style={infoIntro}>
                                    Verification, privacy and how we describe support.
                                    {isDisclaimerOpen ? "" : " Read more."}
                                </p>
                            </span>
                        </span>

                        <span style={infoChevron} aria-hidden="true">
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                style={{
                                    transform: isDisclaimerOpen ? "rotate(180deg)" : "rotate(0deg)",
                                    transition: "transform 180ms ease",
                                }}
                            />
                        </span>
                    </button>

                    {isDisclaimerOpen ? (
                        <div id="icare-disclaimer-panel" style={infoPanel}>
                            <p style={infoSectionTitle}>Verification documents (ID/DBS)</p>
                            <ul style={infoList}>
                                <li style={infoItem}>
                                    We collect and store only the minimum needed to complete verification.
                                </li>
                                <li style={infoItem}>
                                    Verification documents are <strong>not displayed publicly</strong> and
                                    access is restricted to authorised administrators only.
                                </li>
                                <li style={infoItem}>
                                    Where possible, documents are removed after verification is completed in
                                    line with our retention policy.
                                </li>
                            </ul>

                            <p style={infoSectionTitle}>Health information</p>
                            <ul style={infoList}>
                                <li style={infoItem}>
                                    ICare does not request medical diagnoses in forms by default.
                                </li>
                                <li style={infoItem}>
                                    Families should describe needs in <strong>functional language</strong>{" "}
                                    (e.g. “needs help with meals and routines”), not clinical details.
                                </li>
                            </ul>

                            <p style={infoSectionTitle}>How we describe support</p>
                            <ul style={infoList}>
                                <li style={infoItem}>
                                    We focus on everyday support — routines, practical help and agreed
                                    tasks.
                                </li>
                                <li style={infoItem}>
                                    If you need clinical or nursing care (for example, treatment or medical
                                    procedures), please speak to an appropriately qualified healthcare
                                    professional.
                                </li>
                            </ul>
                        </div>
                    ) : null}
                </div>

                {/* CARE AT HOME (fade-in) */}
                <div id="care-at-home" ref={careAtHomeRef} className="icare-fade" style={section}>
                    <div className="icare-carehome-row" style={careHomeRow}>
                        <div style={imgWrap}>
                            <img
                                style={img}
                                alt="Older person comfortable at home"
                                src="images/web/homepage/garden.png"
                                loading="lazy"
                            />
                        </div>

                        <div>
                            <h3 style={sectionTitle}>Why choose support at home?</h3>

                            <p style={sectionText}>
                                Staying at home can help people keep familiar routines, comfort and
                                independence. Instead of adjusting to a new environment, support fits
                                around everyday life — at home, on their terms.
                            </p>

                            <p style={sectionText}>
                                For many families, having a trusted companion brings peace of mind.
                                Familiar surroundings can reduce stress and confusion, especially when
                                routines and personal space matter.
                            </p>

                            <p style={sectionText}>
                                Support at home is flexible by nature. You can start small with occasional
                                visits and adjust over time — without forcing difficult moves or long-term
                                commitments.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        /* responsive columns (layout unchanged) */
        @media (max-width: 1020px){
          .icare-types-grid{ grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 720px){
          .icare-carehome-row{ grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px){
          .icare-types-grid{ grid-template-columns: 1fr !important; }
        }
        @media (max-width: 900px){
          .icare-key-grid{ grid-template-columns: 1fr !important; }
        }

        /* fade-in on scroll */
        .icare-fade{
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.7s ease, transform 0.7s ease;
          will-change: opacity, transform;
        }
        .icare-fade--in{
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
        </section>
    );
}
