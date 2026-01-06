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
 * ✅ no heavy boxes
 * ✅ one-under-another, airy
 * ✅ good keywords without stuffing
 */
export default function ICareTypesOfCareSEO() {
    const TEXT = "#0F172A";
    const BRAND = "#b97a57";
    const ICON = "#61674d";

    const wrap = {
        width: "100%",
        background: "#ffffff",
        color: TEXT,
        padding: "clamp(3.4rem, 4.8vw, 4.4rem) 0",
        fontFamily:
            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    };

    const container = {
        width: "min(92vw, 1100px)",
        margin: "0 auto",
    };

    const topMini = {
        fontSize: "1.08rem",
        fontWeight: 850,
        color: BRAND,
        letterSpacing: "-0.1px",
        marginBottom: 10,
    };

    const h2 = {
        margin: 0,
        fontWeight: 950,
        letterSpacing: "-0.55px",
        lineHeight: 1.1,
        fontSize: "clamp(1.55rem, 2.1vw, 1.95rem)",
        color: TEXT,
    };

    const lead = {
        margin: "0.95rem 0 0",
        color: TEXT,
        opacity: 0.78,
        fontWeight: 650,
        lineHeight: 1.75,
        fontSize: "1.04rem",
        maxWidth: "78ch",
    };

    const list = {
        marginTop: "clamp(18px, 2.6vw, 26px)",
        display: "grid",
        gap: 14,
        maxWidth: "78ch",
    };

    const item = {
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        padding: "12px 0",
        borderBottom: "1px solid rgba(15,23,42,0.08)",
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
        fontWeight: 950,
        letterSpacing: "-0.15px",
        color: TEXT,
        fontSize: "1.03rem",
        lineHeight: 1.2,
    };

    const desc = {
        margin: "6px 0 0",
        color: TEXT,
        opacity: 0.75,
        fontWeight: 650,
        lineHeight: 1.65,
        fontSize: ".99rem",
    };

    const types = [
        { icon: faHandHoldingHeart, t: "Elderly care & companionship", d: "Day-to-day support at home with calm routines and human presence." },
        { icon: faClock, t: "Hourly home care", d: "Flexible visits — from short check-ins to regular daily support." },
        { icon: faBed, t: "Live-in care", d: "Consistent help at home for families who need ongoing support." },
        { icon: faMoon, t: "Night care & overnight support", d: "Overnight peace of mind, safety and reassurance." },
        { icon: faPersonWalking, t: "Mobility support", d: "Walking, transfers and practical help around the home." },
        { icon: faPills, t: "Medication reminders", d: "Support with routines and prompts (as agreed with the family)." },
        { icon: faBrain, t: "Dementia support", d: "Consistent, familiar care matched to the person’s needs." },
        { icon: faBroom, t: "Light household help", d: "Meals, tidying and household routines that make daily life easier." },
    ];

    return (
        <section aria-label="Types of care we support" style={wrap}>
            <div style={container}>
                <div style={topMini}>Types of care we support</div>
                <h2 style={h2}>Home care matched to real life</h2>
                <p style={lead}>
                    Families use ICare to find reliable carers for <strong>home care</strong>, including{" "}
                    <strong>hourly</strong> and <strong>live-in care</strong> — with flexible support that fits the person
                    and the routine.
                </p>

                <div style={list}>
                    {types.map((x) => (
                        <div key={x.t} style={item}>
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
        </section>
    );
}
