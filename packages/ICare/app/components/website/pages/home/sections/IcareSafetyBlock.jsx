import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faUserCheck, faFileCircleCheck } from "@fortawesome/free-solid-svg-icons";

/**
 * ICare — SafetyBlock (compact, calm)
 * ✅ ideal AFTER "Two paths" (Families / Caregivers)
 * ✅ calm block, lots of air, not a hero banner
 * ✅ icons in #61674d, accent line in #b97a57
 */
export default function IcareSafetyBlock() {
    const COLORS = {
        bg: "#ffffff",
        text: "#0F172A",
        muted: "rgba(15,23,42,0.72)",
        border: "rgba(15,23,42,0.10)",
        card: "rgba(255,255,255,0.70)",
        accent: "#b97a57",
        icon: "#61674d",
        iconBg: "rgba(97,103,77,0.12)",
        iconBorder: "rgba(97,103,77,0.24)",
        soft: "rgba(15,23,42,0.02)",
        softBorder: "rgba(15,23,42,0.06)",
    };

    const ITEMS = [
        { icon: faIdCard, title: "Identity & eligibility", text: "Photo ID and Right to Work required." },
        { icon: faUserCheck, title: "Relevant experience", text: "Carers with references and appropriate experience." },
        {
            icon: faFileCircleCheck,
            title: "Checks where applicable",
            text: "DBS and insurance shown when available (depends on location and documents).",
        },
    ];

    const wrap = {
        width: "100%",
        background: COLORS.bg,
        color: COLORS.text,
        padding: "clamp(3.2rem, 4.6vw, 4.2rem) 0",
        fontFamily:
            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    };

    const container = {
        width: "min(92vw, 1100px)",
        margin: "0 auto",
    };

    const shell = {
        borderRadius: 24,
        border: `1px solid ${COLORS.border}`,
        background: COLORS.card,
        boxShadow: "0 16px 44px rgba(15,23,42,0.06)",
        padding: "clamp(18px, 2.4vw, 26px)",
        display: "grid",
        gap: "clamp(14px, 2vw, 18px)",
    };

    const header = {
        maxWidth: "78ch",
        display: "grid",
        gap: 10,
    };

    const mini = {
        fontSize: "1.1rem", // ~20% bigger
        fontWeight: 850,
        color: COLORS.accent,
        letterSpacing: "-0.1px",
        marginBottom: 2,
    };

    const h3 = {
        margin: 0,
        fontWeight: 950,
        letterSpacing: "-0.45px",
        lineHeight: 1.12,
        fontSize: "clamp(1.35rem, 1.8vw, 1.55rem)",
        color: COLORS.text,
    };

    const p = {
        margin: 0,
        color: COLORS.muted,
        fontWeight: 650,
        lineHeight: 1.75,
        fontSize: "1.02rem",
        maxWidth: "74ch",
    };

    const grid = {
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: "clamp(12px, 1.6vw, 16px)",
        marginTop: 4,
    };

    const item = {
        borderRadius: 20,
        background: COLORS.soft,
        border: `1px solid ${COLORS.softBorder}`,
        padding: "14px 14px",
        display: "grid",
        gap: 10,
    };

    const iconWrap = {
        width: 40,
        height: 40,
        borderRadius: 16,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: COLORS.iconBg,
        border: `1px solid ${COLORS.iconBorder}`,
        color: COLORS.icon,
    };

    const itemTitle = {
        margin: 0,
        fontWeight: 950,
        color: COLORS.text,
        letterSpacing: "-0.15px",
        fontSize: "1.02rem",
        lineHeight: 1.2,
    };

    const itemText = {
        margin: 0,
        color: COLORS.muted,
        fontWeight: 650,
        lineHeight: 1.65,
        fontSize: ".98rem",
    };

    const foot = {
        marginTop: 4,
        paddingTop: 12,
        borderTop: `1px solid ${COLORS.border}`,
        color: COLORS.muted,
        fontWeight: 650,
        lineHeight: 1.6,
        fontSize: ".95rem",
        maxWidth: "90ch",
    };

    const microCSS = `
    @media (max-width: 980px){
      .icare-safety-grid{ grid-template-columns: 1fr !important; }
    }
  `;

    return (
        <section aria-label="Safety comes first" style={wrap}>
            <style>{microCSS}</style>

            <div style={container}>
                <div style={shell}>
                    <div style={header}>
                        <div style={mini}>Safety comes first</div>
                        <h3 style={h3}>A safer way to start home care</h3>
                        <p style={p}>
                            Once you’ve chosen your path, it helps to know what “verified” really means.
                            ICare publishes profiles only when key details are in place — so families can reach out
                            with confidence and caregivers can be understood clearly from day one.
                        </p>
                    </div>

                    <div className="icare-safety-grid" style={grid} aria-label="Safety checks">
                        {ITEMS.map((x) => (
                            <div key={x.title} style={item}>
                                <div style={iconWrap} aria-hidden="true">
                                    <FontAwesomeIcon icon={x.icon} />
                                </div>

                                <div style={{ display: "grid", gap: 6 }}>
                                    <h4 style={itemTitle}>{x.title}</h4>
                                    <p style={itemText}>{x.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={foot}>
                        Note: verification steps can vary by country and availability of documents. We show what is provided
                        transparently on each profile.
                    </div>
                </div>
            </div>
        </section>
    );
}
