import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHandHoldingHeart,
    faClock,
    faBed,
    faMoon,
    faPersonWalking,
    faPills,
    faBrain,
    faBroom,
} from "@fortawesome/free-solid-svg-icons";

/**
 * ICare — Types of care (SEO, short, calm)
 * ✅ no boxes (only separators)
 * ✅ 4 columns desktop, 2 columns tablet, 1 column mobile
 * ✅ descriptions clamped to 2 lines
 * ✅ titles clamped to 1 line (fixes “3rd row” unevenness)
 * ✅ header aligned (h1/h2/lead)
 */
export default function ICareTypesOfCareSEO() {
    const TEXT = "#0F172A";
    const ICON = "#61674d";

    const wrap = {
        width: "100%",
        background: "#ffffff",
        color: TEXT,
        padding: "clamp(4.1rem, 5.6vw, 5.2rem) 0",
        fontFamily:
            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    };

    const container = {
        width: "min(92vw, 1100px)",
        margin: "0 auto",
    };

    const header = {
        maxWidth: "78ch",
        display: "grid",
        gap: 12,
        margin: "0 0 clamp(22px, 3.2vw, 34px)",
        padding: 0,
        textAlign: "left",
    };

    const h1 = {
        margin: 0,
        padding: 0,
        fontWeight: 950,
        letterSpacing: "-0.55px",
        lineHeight: 1.12,
        fontSize: "clamp(1.85rem, 2.25vw, 2.2rem)",
        color: TEXT,
    };

    // ✅ H2 20% smaller
    const h2 = {
        margin: 0,
        padding: 0,
        fontWeight: 950,
        letterSpacing: "-0.55px",
        lineHeight: 1.1,
        fontSize: "clamp(1.08rem, 1.52vw, 1.36rem)",
        color: TEXT,
    };

    // ✅ same color as H1
    const lead = {
        margin: 0,
        padding: 0,
        color: TEXT,
        fontWeight: 650,
        lineHeight: 1.75,
        fontSize: "1.04rem",
        maxWidth: "78ch",
    };

    const list = {
        marginTop: "clamp(18px, 2.6vw, 26px)",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "clamp(14px, 1.6vw, 18px)",
        alignItems: "start",
    };

    const item = {
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        padding: "14px 0",
    };

    const iconWrap = {
        width: 38,
        height: 38,
        borderRadius: 16,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(97,103,77,0.10)",
        border: "1px solid rgba(97,103,77,0.22)",
        color: ICON,
        flex: "0 0 auto",
        marginTop: 2,
    };

    const title = {
        margin: 0,
        padding: 0,
        fontWeight: 950,
        letterSpacing: "-0.15px",
        color: TEXT,
        fontSize: "1.03rem",
        lineHeight: 1.2,

        // ✅ clamp title to 1 line (prevents uneven row heights)
        display: "-webkit-box",
        WebkitLineClamp: 1,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
    };

    const desc = {
        margin: "6px 0 0",
        color: TEXT,
        opacity: 0.75,
        fontWeight: 650,
        lineHeight: 1.65,
        fontSize: ".99rem",

        // ✅ clamp to 2 lines
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
    };

    const types = [
        {
            icon: faHandHoldingHeart,
            t: "Elderly care & companionship",
            d: "Day-to-day support at home with calm routines and human presence.",
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
            d: "Overnight peace of mind, safety and reassurance.",
        },
        {
            icon: faPersonWalking,
            t: "Mobility support",
            d: "Walking, transfers and practical help around the home.",
        },
        {
            icon: faPills,
            t: "Medication reminders",
            d: "Support with routines and prompts (as agreed with the family).",
        },
        {
            icon: faBrain,
            t: "Dementia support",
            d: "Consistent, familiar care matched to the person’s needs.",
        },
        {
            icon: faBroom,
            t: "Light household help",
            d: "Meals, tidying and household routines that make daily life easier.",
        },
    ];

    return (
        <section aria-label="Types of care we support" style={wrap}>
            <div style={container}>
                <div style={header}>
                    <h1 style={h1}>Types of care we support</h1>
                    <h2 style={h2}>Home care matched to real life</h2>
                    <p style={lead}>
                        Families use ICare to find reliable carers for home care, including hourly and live-in care — with flexible
                        support that fits the person and the routine.
                    </p>
                </div>

                <div className="icare-types-grid" style={list}>
                    {types.map((x) => (
                        <div key={x.t} className="icare-types-item" style={item}>
                            <span style={iconWrap} aria-hidden="true">
                                <FontAwesomeIcon icon={x.icon} />
                            </span>
                            <div>
                                <h3 style={title}>{x.t}</h3>
                                <p style={desc}>{x.d}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        /* separators only (no boxes) */
        .icare-types-item{
          border-bottom: 1px solid rgba(15,23,42,0.08);
        }

        /* Desktop: 4 columns => last row = last 4 items (5-8) */
        .icare-types-item:nth-last-child(-n+4){
          border-bottom: none;
        }

        @media (max-width: 1020px){
          .icare-types-grid{ grid-template-columns: repeat(2, 1fr) !important; }
          /* Tablet: 2 columns => last row = last 2 items */
          .icare-types-item:nth-last-child(-n+4){ border-bottom: 1px solid rgba(15,23,42,0.08); }
          .icare-types-item:nth-last-child(-n+2){ border-bottom: none; }
        }

        @media (max-width: 640px){
          .icare-types-grid{ grid-template-columns: 1fr !important; }
          /* Mobile: last item only */
          .icare-types-item:nth-last-child(-n+2){ border-bottom: 1px solid rgba(15,23,42,0.08); }
          .icare-types-item:last-child{ border-bottom: none; }
        }
      `}</style>
        </section>
    );
}
