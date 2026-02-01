import React, { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHandHoldingHeart,
    faClock,
    faBed,
    faMoon,
    faPills,
    faBrain,
    faCircleInfo,
    faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

/**
 * ICare — Types of care (SEO, short, calm)
 * ✅ Types grid
 * ✅ Soft disclaimer
 * ✅ Care-at-home section
 * ✅ Live-in carer duties bullets
 * ✅ Fade-in on scroll (IntersectionObserver)
 *
 * Legal/Platform safeguards:
 * ✅ Accordion disclaimer (default: short intro + info icon)
 * ✅ Matching platform statement
 * ✅ ToS-style summary: agreement between users, not employer/agency/provider
 * ✅ Verification docs retention principles (minimise, admin-only, delete)
 * ✅ No medical data by default + functional needs language
 * ✅ Brand language guardrails (support / routines / agreed tasks) — rewritten for customers
 */
export default function ICareTypesOfCareSEO() {
    const TEXT = "#0F172A";
    const ICON = "#dd8b4f";

    const careAtHomeRef = useRef(null);
    const liveInRef = useRef(null);

    // ✅ NEW: accordion state (default open: intro visible, details collapsed)
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
        if (liveInRef.current) observer.observe(liveInRef.current);

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
        fontWeight: 500,
        letterSpacing: "-0.6px",
        lineHeight: 1.14,
        fontSize: "clamp(2.25rem, 3vw, 2.6rem)",
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
        width: 38,
        height: 38,
        display: "inline-flex",
        alignItems: "center",
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

    const disclaimer = {
        marginTop: "clamp(18px, 2.4vw, 26px)",
        maxWidth: "78ch",
        fontWeight: 400,
        lineHeight: 1.65,
        fontSize: "1.1rem",
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
        boxShadow: "0 18px 44px rgb(0, 0, 0)",
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

    // Bullets (Elder-like)
    const bulletsGrid = {
        margin: "30px -10px",
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: "35px 20px",
        padding: "0.5rem",
        border: "1px solid rgba(221, 139, 79, 0.3)",
        borderRadius: "2rem",
        background: "white",
    };

    const bulletCard = { padding: "0px 1rem 0px 1rem", margin: "1rem 0" };

    const bulletTitle = {
        margin: 0,
        fontWeight: 600,
        letterSpacing: "-0.15px",
        fontSize: "1.3rem",
        lineHeight: 1.35,
        color: TEXT,
    };

    const bulletDesc = {
        margin: "6px 0 0",
        color: "rgba(15,23,42,0.86)",
        fontWeight: 400,
        lineHeight: 1.6,
        fontSize: "1.1rem",
    };

    const subhead = {
        margin: "18px 0 0",
        fontWeight: 900,
        letterSpacing: "-0.15px",
        fontSize: "1.08rem",
        color: TEXT,
    };

    const note = {
        margin: "10px 0 0",
        color: "rgba(15,23,42,0.86)",
        fontWeight: 500,
        lineHeight: 1.65,
        fontSize: "1.02rem",
    };

    // ✅ NEW: Accordion styles
    const infoBox = {
        marginTop: "18px",
        border: "1px solid rgba(15,23,42,0.10)",
        borderRadius: "18px",
        background: "rgba(255, 255, 255, 0.71)",
        padding: "14px 16px",
        maxWidth: "95ch",
    };

    const infoBtn = {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 14,
        border: "none",
        background: "transparent",
        padding: "6px 4px",
        cursor: "pointer",
        textAlign: "left",
        color: TEXT,
    };

    const infoLeft = {
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        minWidth: 0,
    };

    const infoIconWrap = {
        width: 26,
        height: 26,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgb(0, 0, 0)",
        flex: "0 0 auto",
        marginTop: 1,
    };

    const infoTitle = {
        margin: 0,
        fontWeight: 700,
        letterSpacing: "-0.15px",
        fontSize: "1.05rem",
        lineHeight: 1.4,
    };

    const infoIntro = {
        margin: "6px 0 0",
        color: "rgb(0, 0, 0)",
        fontWeight: 400,
        lineHeight: 1.55,
        fontSize: "1.02rem",
    };

    const infoChevron = {
        color: "rgb(0, 0, 0)",
        flex: "0 0 auto",
        marginLeft: 10,
    };

    const infoPanel = {
        marginTop: 10,
        paddingTop: 12,
        borderTop: "1px solid rgba(15,23,42,0.10)",
    };

    const infoSectionTitle = {
        margin: "12px 0 0",
        fontWeight: 700,
        fontSize: "1.0rem",
        letterSpacing: "-0.1px",
        color: TEXT,
    };

    const infoList = {
        margin: "10px 0 0",
        paddingLeft: "18px",
        color: "rgb(0, 0, 0)",
        lineHeight: 1.6,
        fontSize: "1.02rem",
    };

    const infoItem = { margin: "6px 0" };

    const types = [
        {
            icon: faHandHoldingHeart,
            t: "Elderly care & companionship",
            d: "Day-to-day support at home with routines and human presence.",
        },
        {
            icon: faClock,
            t: "Hourly home care",
            d: "Flexible visits — from short check-ins to regular daily support.",
        },
        {
            icon: faBed,
            t: "Live-in care",
            d: "Consistent help at home for families who need ongoing support.",
        },
        {
            icon: faMoon,
            t: "Night care & overnight support",
            d: "Overnight peace of mind, safety and reassurance through the night.",
        },
        {
            icon: faPills,
            t: "Medication prompts & routine support",
            d: "Gentle reminders and support with agreed routines. No prescribing or clinical decision-making.",
        },
        {
            icon: faBed,
            t: "Respite (short-term) care",
            d: "Temporary support to give family carers time to rest or step away, or when a regular carer needs cover.",
        },
        {
            icon: faBrain,
            t: "Memory and routine support",
            d: "Consistent, familiar support matched to the person’s routines and preferences.",
        },
    ];

    const liveInEveryday = [
        {
            t: "Personal support",
            d: "Help with daily routines such as washing, toileting and dressing, with dignity and respect.",
        },
        {
            t: "Meals and nutrition",
            d: "Preparing meals that match dietary needs, preferences and familiar habits.",
        },
        {
            t: "Home upkeep",
            d: "Light housekeeping to keep the home comfortable, safe and organised.",
        },
        {
            t: "Companionship and wellbeing",
            d: "Providing company, conversation and encouragement with hobbies, walks or gentle activities.",
        },
        {
            t: "Mobility and daily movement",
            d: "Supporting safe movement around the home and encouraging suitable activity.",
        },
        {
            t: "Errands and practical help",
            d: "Assisting with shopping, collecting prescriptions and everyday tasks.",
        },
        {
            t: "Pets and household routines",
            d: "Helping with feeding, walking pets and maintaining familiar routines.",
        },
        {
            t: "Paperwork and organisation",
            d: "Support with post, reminders and appointments where helpful.",
        },
        {
            t: "Medication prompting",
            d: "Gentle reminders to take medication as prescribed (no prescribing, medical assessment or clinical decision-making).",
        },
        {
            t: "Home safety checks",
            d: "Helping reduce everyday risks by keeping walkways clear and routines consistent.",
        },
        {
            t: "Family updates (as agreed)",
            d: "Sharing simple updates where helpful and agreed, so everyone stays aligned.",
        },
    ];

    const liveInSpecialist = [
        {
            t: "Oxygen or ventilation support",
            d: "e.g. CPAP or BiPAP — only where the carer is experienced and tasks are clearly agreed in advance.",
        },
        {
            t: "Support with agreed medication routines",
            d: "Support is limited to agreed routines and does not include prescribing, medical assessment or clinical decision-making.",
        },
        {
            t: "PEG support",
            d: "Only where suitable, clearly agreed and within the carer’s competence. Clinical procedures should be handled by appropriately qualified professionals.",
        },
        {
            t: "Stoma support",
            d: "Only where suitable, clearly agreed and within the carer’s competence. Clinical procedures should be handled by appropriately qualified professionals.",
        },
        {
            t: "Wound support",
            d: "Only where suitable, clearly agreed and within the carer’s competence. Clinical procedures should be handled by appropriately qualified professionals.",
        },
    ];

    return (
        <section aria-label="Types of care we support" style={wrap}>
            <div style={container}>
                <div style={header}>
                    <h1 style={h1}>Types of care we support</h1>
                    <h2 style={h2}>Care that fits real life at home</h2>
                    <p style={lead}>
                        Families use ICare to find reliable carers for{" "}
                        <strong style={{ fontWeight: 600 }}>home care</strong>, including{" "}
                        <strong style={{ fontWeight: 600 }}>hourly</strong> and{" "}
                        <strong style={{ fontWeight: 600 }}>live in care</strong> with{" "}
                        <strong style={{ fontWeight: 600 }}>flexible support</strong> shaped
                        around real people, routines and needs.
                    </p>
                </div>

                {/* TYPES GRID */}
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



                {/* ✅ NEW: Collapsible Disclaimer / Important information */}
                <div style={infoBox}>
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
                                <p style={infoTitle}>Disclaimer</p>
                                <p style={infoIntro}>
                                    ICare is a matching platform and does not provide regulated care services.
                                    {isDisclaimerOpen ? "" : "  Read more."}
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
                            <p style={infoSectionTitle}>Key terms (summary)</p>
                            <ul style={infoList}>
                                <li style={infoItem}>
                                    Any agreement for support is made <strong>directly between users</strong>{" "}
                                    (family/care receiver and caregiver).
                                </li>
                                <li style={infoItem}>
                                    ICare is <strong>not</strong> the employer of caregivers and is{" "}
                                    <strong>not</strong> a care agency or “agency provider”.
                                </li>
                            </ul>

                            <p style={infoSectionTitle}>Verification documents (ID/DBS)</p>
                            <ul style={infoList}>
                                <li style={infoItem}>
                                    We collect and store only the minimum needed to complete verification.
                                </li>
                                <li style={infoItem}>
                                    Access to verification documents is restricted to authorised administrators only.
                                </li>
                                <li style={infoItem}>
                                    Where possible, documents are removed after verification is completed in line with our retention policy.
                                </li>
                            </ul>

                            <p style={infoSectionTitle}>Health information</p>
                            <ul style={infoList}>
                                <li style={infoItem}>
                                    ICare does not request medical diagnoses in forms by default.
                                </li>
                                <li style={infoItem}>
                                    Families should describe support needs in <strong>functional language</strong>{" "}
                                    (e.g. “needs help with meals and routines”), not clinical details.
                                </li>
                            </ul>

                            {/* ✅ REWRITTEN: last two lines — customer-friendly and still protective */}
                            <p style={infoSectionTitle}>How we describe support</p>
                            <ul style={infoList}>
                                <li style={infoItem}>
                                    We focus on everyday support — routines, practical help and agreed tasks.
                                </li>
                                <li style={infoItem}>
                                    If you need clinical or nursing care (for example, treatment or medical procedures), please speak to an appropriately qualified healthcare professional.
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
                            <h3 style={sectionTitle}>Why choose care at home?</h3>

                            <p style={sectionText}>
                                Care at home allows older people to stay in familiar surroundings,
                                with routines, comfort and independence preserved. Instead of
                                adjusting to new environments, care fits around everyday life -
                                at home, on their terms.
                            </p>

                            <p style={sectionText}>
                                For many families, home care offers greater peace of mind than
                                residential care. Being in a known place can reduce stress and
                                confusion, especially when routines, memories and personal space
                                matter.
                            </p>

                            <p style={sectionText}>
                                Care at home is flexible by nature. Support can be adjusted over
                                time from occasional visits to live-in care or short-term respite
                                -without forcing difficult moves or long-term commitments.
                            </p>
                        </div>
                    </div>
                </div>

                {/* LIVE-IN CARER DUTIES (fade-in) */}
                <div id="live-in-carer" ref={liveInRef} className="icare-fade" style={section}>
                    <h3 style={sectionTitle}>What does a live-in carer do?</h3>
                    <p style={sectionText}>
                        A live-in carer supports everyday life at home with consistent,
                        agreed help tailored to the person and their routines. The exact
                        support depends on needs, preferences and what’s agreed with the
                        family.
                    </p>

                    <div className="icare-bullets-grid" style={bulletsGrid}>
                        {liveInEveryday.map((b) => (
                            <div key={b.t} style={bulletCard} className="bullet-card">
                                <p style={bulletTitle}>{b.t}</p>
                                {b.d ? <p style={bulletDesc}>{b.d}</p> : null}
                            </div>
                        ))}
                    </div>

                    <p style={subhead}>Specialist support (where agreed and appropriate)</p>
                    <p style={note}>
                        Some specialist tasks may only be suitable where the carer is trained/experienced
                        and the arrangement is clearly agreed. Availability can vary by location and needs.
                    </p>

                    <div className="icare-bullets-grid" style={bulletsGrid}>
                        {liveInSpecialist.map((b) => (
                            <div key={b.t} style={bulletCard} className="bullet-card">
                                <p style={bulletTitle}>{b.t}</p>
                                {b.d ? <p style={bulletDesc}>{b.d}</p> : null}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        /* responsive columns */
        @media (max-width: 1020px){
          .icare-types-grid{ grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 720px){
          .icare-carehome-row{ grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px){
          .icare-types-grid{ grid-template-columns: 1fr !important; }
        }
        @media (max-width: 860px){
          .icare-bullets-grid{ grid-template-columns: 1fr !important; }
        }

        /* bullet borders */
        .icare-bullets-grid > .bullet-card{
          border-right: 2px solid rgba(221, 139, 79, 0.3);
        }
        .icare-bullets-grid > .bullet-card:nth-child(3n){
          border-right: none;
        }
        .icare-bullets-grid > .bullet-card:last-child{
          border-right: none;
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
