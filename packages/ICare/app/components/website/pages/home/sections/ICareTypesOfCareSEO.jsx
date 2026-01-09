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
 * ✅ separators: horizontal only (NO vertical)
 * ✅ more space between H1 and H2
 * ✅ lead text black (not grey)
 * ✅ icons: no background, slightly larger
 */
export default function ICareTypesOfCareSEO() {
    const TEXT = "#0F172A";
    const ICON = "#61674d";
    const SEP = "rgba(15,23,42,0.10)";

    const wrap = {
        width: "100%",
        background: "rgba(255, 249, 239, 0.85)", // subtle beige
        color: TEXT,
        padding: "clamp(4.8rem, 6.6vw, 6.2rem) 0", // more space
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

    // more air between H1 and H2
    const h2 = {
        margin: 0,
        paddingTop: "14px",
        fontWeight: 600,
        letterSpacing: "-0.2px",
        lineHeight: 1.25,
        fontSize: "1.25rem",
        color: TEXT,
    };

    // lead in black (not grey)
    const lead = {
        margin: "12px 0 0",
        padding: 0,
        color: TEXT,
        fontWeight: 600,
        lineHeight: 1.65,
        fontSize: "1.22rem",
        maxWidth: "78ch",
    };

    const list = {
        marginTop: "clamp(22px, 3.2vw, 34px)",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "clamp(18px, 2.2vw, 26px)",
        alignItems: "start",
    };

    const item = {
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
        padding: "18px 0",
        borderBottom: `1px solid ${SEP}`,
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

    const icon = {
        fontSize: "20px", // slightly larger
        lineHeight: 1,
    };

    const title = {
        margin: 0,
        padding: 0,
        fontWeight: 900,
        letterSpacing: "-0.15px",
        color: TEXT,
        fontSize: "1.05rem",
        lineHeight: 1.2,
        display: "-webkit-box",
        WebkitLineClamp: 1,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
    };

    const desc = {
        margin: "6px 0 0",
        color: TEXT, // black
        fontWeight: 600,
        lineHeight: 1.65,
        fontSize: "1.0rem",
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
                    <h1 style={h1}>Care services we support</h1>
                    <h2 style={h2}>Care matched to real life</h2>
                    <p style={lead}>
                        Families use ICare to find reliable carers for home care, including hourly and
                        live-in care with flexible support that fits the person and the routine.
                    </p>
                </div>

                <div className="icare-types-grid" style={list}>
                    {types.map((x) => (
                        <div key={x.t} className="icare-types-item" style={item}>
                            <span style={iconWrap} aria-hidden="true">
                                <FontAwesomeIcon style={icon} icon={x.icon} />
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
        /* Desktop: 4 columns => last row = last 4 items (5-8) */
        .icare-types-item:nth-last-child(-n+4){
          border-bottom: none;
        }

        @media (max-width: 1020px){
          .icare-types-grid{ grid-template-columns: repeat(2, 1fr) !important; }
          /* Tablet: 2 columns => last row = last 2 items */
          .icare-types-item:nth-last-child(-n+4){ border-bottom: 1px solid rgba(15,23,42,0.10); }
          .icare-types-item:nth-last-child(-n+2){ border-bottom: none; }
        }

        @media (max-width: 640px){
          .icare-types-grid{ grid-template-columns: 1fr !important; }
          /* Mobile: last item only */
          .icare-types-item:nth-last-child(-n+2){ border-bottom: 1px solid rgba(15,23,42,0.10); }
          .icare-types-item:last-child{ border-bottom: none; }
        }
      `}</style>
        </section>
    );
}
