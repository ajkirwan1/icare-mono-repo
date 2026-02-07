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

export default function ICareTypesOfCareSEO() {
    const TEXT = "#0F172A";
    const MUTED = "rgba(15,23,42,0.68)";
    const LINE = "rgba(15,23,42,0.08)";
    const ACCENT = "#778d43"; // brand green (only accent)

    const careAtHomeRef = useRef(null);
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

    // page
    const wrap = {
        width: "100%",
        background: "#ffffff",
        color: TEXT,
        padding: "clamp(3rem, 5vw, 4.5rem) 0",
        fontFamily:
            "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    };

    const container = { width: "min(92vw, 1100px)", margin: "0 auto" };

    // header
    const header = {
        maxWidth: "78ch",
        margin: "0 0 clamp(26px, 3.8vw, 46px)",
    };

    const h1 = {
        margin: 0,
        fontWeight: 620,
        letterSpacing: "-0.6px",
        lineHeight: 1.12,
        fontSize: "2.45rem",
        color: TEXT,
    };

    const h2 = {
        margin: "12px 0 0",
        fontWeight: 480,
        letterSpacing: "-0.2px",
        lineHeight: 1.3,
        fontSize: "1.35rem",
        color: "rgba(15,23,42,0.92)",
    };

    const lead = {
        margin: "14px 0 0",
        color: "rgba(15,23,42,0.88)",
        fontWeight: 420,
        lineHeight: 1.7,
        fontSize: "1.18rem",
        maxWidth: "78ch",
    };

    // types grid
    const list = {
        marginTop: "clamp(18px, 3vw, 28px)",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "clamp(18px, 2.2vw, 26px)",
        alignItems: "start",
    };

    const item = {
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        padding: "10px 0",
    };

    const iconWrap = {
        width: 28,
        height: 28,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: ACCENT,
        flex: "0 0 auto",
        marginTop: 2,
    };

    const icon = { fontSize: "18px", lineHeight: 1 };

    const title = {
        margin: 0,
        fontWeight: 600,
        letterSpacing: "-0.15px",
        color: TEXT,
        fontSize: "1.1rem",
        lineHeight: 1.4,
    };

    const desc = {
        margin: "6px 0 0",
        fontWeight: 400,
        lineHeight: 1.65,
        fontSize: "1.02rem",
    };

    // disclaimer (flat)
    const infoBox = {
        marginTop: "34px",
        paddingTop: "26px",
        maxWidth: "110ch",
    };

    const callout = {
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: 12,
        alignItems: "start",
        padding: "0 0 10px",
    };

    const calloutIcon = {
        width: 32,
        height: 32,
        borderRadius: 999,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: ACCENT,
        background: "rgba(119,141,67,0.10)",
        flex: "0 0 auto",
        marginTop: 1,
    };

    const calloutTitle = {
        margin: 0,
        fontWeight: 650,
        letterSpacing: "-0.15px",
        fontSize: "1.05rem",
        lineHeight: 1.35,
        color: TEXT,
    };

    const calloutText = {
        margin: "6px 0 0",
        color: MUTED,
        fontWeight: 420,
        lineHeight: 1.65,
        fontSize: "1.02rem",
        maxWidth: "90ch",
    };

    // key terms -> plain list (no cards)
    const keyGrid = {
        margin: "2rem 0",
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: 16,
        padding: "0 3rem"
    };

    const keyItem = {
        paddingLeft: 14,
        borderLeft: `3px solid rgba(119, 141, 67,0.7)`,
    };

    const keyTitle = {
        margin: 0,
        fontWeight: 620,
        fontSize: "1.02rem",
        letterSpacing: "-0.1px",
        color: TEXT,
    };

    const keyBody = {
        margin: "8px 0 0",
        fontSize: "1.0rem",
        lineHeight: 1.65,
        color: MUTED,
    };

    // accordion button
    const infoBtn = {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 14,
        border: "none",
        background: "transparent",
        padding: "18px 0 0",
        cursor: "pointer",
        textAlign: "left",
        color: TEXT,
        marginTop: "1rem"
    };

    const infoLeft = {
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: 10,
        alignItems: "start",
        minWidth: 0,
    };

    const infoIconWrap = {
        width: 26,
        height: 26,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(15,23,42,0.72)",
        marginTop: 2,
    };

    const infoTitle = {
        margin: 0,
        fontWeight: 620,
        letterSpacing: "-0.12px",
        fontSize: "1.02rem",
        color: TEXT,
    };

    const infoIntro = {
        margin: "6px 0 0",
        color: MUTED,
        fontWeight: 420,
        lineHeight: 1.6,
        fontSize: "0.98rem",
    };

    const infoChevron = { color: "rgba(15,23,42,0.7)", flex: "0 0 auto" };

    const infoPanel = {
        marginTop: 10,
        paddingTop: 12,
        paddingLeft: "3rem"
    };

    const infoSectionTitle = {
        margin: "14px 0 0",
        fontWeight: 620,
        fontSize: "0.98rem",
        letterSpacing: "-0.1px",
        color: TEXT,
    };

    const infoList = {
        margin: "10px 0 0",
        paddingLeft: "18px",
        color: MUTED,
        lineHeight: 1.75,
        fontSize: "0.98rem",
        listStyle: "disc"
    };

    const infoItem = { margin: "7px 0" };

    // care at home
    const section = {
        marginTop: "clamp(30px, 4vw, 54px)",
        paddingTop: "42px",
        borderTop: `1px solid ${LINE}`,
        maxWidth: "110ch",
        scrollMarginTop: 30,
    };

    const sectionTitle = {
        margin: 0,
        fontWeight: 620,
        letterSpacing: "-0.2px",
        fontSize: "1.6rem",
        lineHeight: 1.35,
        color: TEXT,
    };

    const sectionText = {
        margin: "12px 0 0",
        color: "rgba(15,23,42,0.86)",
        fontWeight: 400,
        lineHeight: 1.7,
        fontSize: "1.18rem",
    };

    const careHomeRow = {
        display: "grid",
        gridTemplateColumns: "440px 1fr",
        gap: "clamp(18px, 2.8vw, 34px)",
        alignItems: "start",
    };

    const imgWrap = {
        width: 440,
        height: 500,
        borderRadius: 18,
        overflow: "hidden",
        background: "rgba(15,23,42,0.03)",
        border: "none",
    };

    const img = {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
        objectPosition: "65% 50%",
        transform: "scale(1.16)",
    };

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
                    <h2 style={h1}>Companionship and everyday support</h2>
                    <h3 style={h2}>A calm, practical way to find the right match</h3>
                    <p style={lead}>
                        ICare helps families connect with independent companions for{" "}
                        <strong style={{ fontWeight: 600 }}>everyday support</strong> — friendly presence,
                        routines and practical help agreed directly between you.
                    </p>
                </div>

                <div className="icare-types-grid" style={list}>
                    {types.map((x) => (
                        <div key={x.t} className="icare-types-item" style={item}>
                            <span style={iconWrap} aria-hidden="true">
                                <FontAwesomeIcon style={icon} icon={x.icon} />
                            </span>
                            <div style={{ minWidth: 0 }}>
                                <h3 style={title}>{x.t}</h3>
                                <p style={desc}>{x.d}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Disclaimer — flat, no cards */}
                <div style={infoBox}>
                    <div style={callout}>
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

                    <div style={keyGrid} aria-label="Key terms summary">
                        <div style={keyItem}>
                            <p style={keyTitle}>Direct agreement</p>
                            <p style={keyBody}>
                                Families/care receivers and companions agree details directly between
                                themselves.
                            </p>
                        </div>

                        <div style={keyItem}>
                            <p style={keyTitle}>Not an employer</p>
                            <p style={keyBody}>
                                ICare is not the employer of companions and does not supervise their work.
                            </p>
                        </div>

                        <div style={keyItem}>
                            <p style={keyTitle}>Non-clinical focus</p>
                            <p style={keyBody}>
                                We focus on companionship and everyday support — not clinical or nursing
                                care.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        style={infoBtn}
                        className="icare-disclaimer-btn"
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

                <div id="care-at-home" ref={careAtHomeRef} className="icare-fade" style={section}>
                    <div className="icare-carehome-row" style={careHomeRow}>
                        <div style={imgWrap}>
                            <img
                                style={img}
                                alt="Older person comfortable at home"
                                src="images/web/homepage/icare-support-at-home.webp"
                                loading="lazy"
                            />
                        </div>

                        <div>
                            <h3 style={sectionTitle}>Why choose support at home?</h3>

                            <p style={sectionText}>
                                Staying at home can help people keep familiar routines, comfort and independence, with the right everyday support in place. Instead of adjusting to a new environment, support fits around everyday life — at home, on their terms.
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

        /* clean focus for accordion */
        .icare-disclaimer-btn:focus-visible{
          outline: none;
          box-shadow: 0 0 0 4px rgba(119,141,67,0.18);
          border-radius: 10px;
        }
      `}</style>
        </section>
    );
}
