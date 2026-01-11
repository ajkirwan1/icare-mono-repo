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
 * ✅ NO bottom separators (removed borders)
 * ✅ more space between H1 and H2
 * ✅ lead text black (not grey)
 * ✅ icons: no background, slightly larger
 * ✅ equal heights per row (no "stair" effect)
 * ✅ no text cutting
 */
export default function ICareTypesOfCareSEO() {
    const TEXT = "#0F172A";
    const ICON = "#61674d";

    const wrap = {
        width: "100%",
        background: "rgba(255, 249, 239, 0.85)",
        color: TEXT,
        padding: "clamp(4.8rem, 6.6vw, 6.2rem) 0",
        fontFamily:
            "Nunito, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
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

    const h2 = {
        margin: 0,
        paddingTop: "14px",
        fontWeight: 600,
        letterSpacing: "-0.2px",
        lineHeight: 1.25,
        fontSize: "1.25rem",
        color: TEXT,
    };

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
        alignItems: "stretch",
    };

    // ✅ no borderBottom
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

    const icon = {
        fontSize: "20px",
        lineHeight: 1,
    };

    const content = {
        display: "flex",
        flexDirection: "column",
        gap: 6,
        minWidth: 0,
    };

    const title = {
        margin: 0,
        padding: 0,
        fontWeight: 900,
        letterSpacing: "-0.15px",
        color: TEXT,
        fontSize: "1.05rem",
        lineHeight: 1.2,
        whiteSpace: "normal",
        overflow: "visible",
    };

    const desc = {
        margin: 0,
        color: TEXT,
        fontWeight: 600,
        lineHeight: 1.65,
        fontSize: "1.0rem",
        whiteSpace: "normal",
        overflow: "visible",
    };

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
                        Families use ICare to find reliable carers for{" "}
                        <strong>home care</strong>, including <strong>hourly</strong> and{" "}
                        <strong>live in care</strong> with <strong>flexible support</strong>  that fits the person
                        and the routine.
                    </p>
                </div>

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
            </div>

            {/* responsive columns only (no border rules anymore) */}
            <style>{`
        @media (max-width: 1020px){
          .icare-types-grid{ grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (max-width: 640px){
          .icare-types-grid{ grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    );
}
