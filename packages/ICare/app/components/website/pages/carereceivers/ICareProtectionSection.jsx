import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faShieldHalved, faComments } from "@fortawesome/free-solid-svg-icons";

export default function ICareTrustSEOSection({
    imageSrc = "images/web/icare-for-carereceivers/calmprocess2.png",
}) {
    const COLORS = {
        bg: "#e8e7d7",
        text: "#0F172A",
        muted: "#0F172A",
        border: "rgba(15,23,42,0.10)",
        card: "rgba(255,255,255,0.55)",
        cardHover: "rgba(255,255,255,0.62)",
        icon: "#61674d",
        iconBg: "rgba(97,103,77,0.12)",
        iconBorder: "rgba(97,103,77,0.24)",
    };

    const microCSS = `
    @media (max-width: 980px){
      .icare-trust-grid{ grid-template-columns: 1fr !important; }
      .icare-photo{ order: -1; }
    }
    .icare-trust-card{
      transition: background .14s ease, box-shadow .14s ease, border-color .14s ease;
    }
    .icare-trust-card:hover{
      background: ${COLORS.cardHover};
      box-shadow: 0 14px 34px rgba(15,23,42,0.08);
      border-color: rgba(15,23,42,0.14);
    }
  `;

    const wrap = {
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        background: COLORS.bg,
        padding: "clamp(4.8rem, 6.2vw, 6.4rem) 0",
        fontFamily:
            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: COLORS.text,
    };

    const container = {
        width: "min(92vw, 1100px)",
        margin: "0 auto",
        color: COLORS.text,
    };

    const grid = {
        display: "grid",
        gridTemplateColumns: "1.15fr 0.85fr",
        gap: "clamp(26px, 3.4vw, 52px)",
        alignItems: "start",
    };

    const h2 = {
        fontSize: "clamp(1.85rem, 2.8vw, 2.25rem)",
        fontWeight: 950,
        color: COLORS.text,
        margin: "0 0 .7rem",
        letterSpacing: "-0.45px",
        lineHeight: 1.1,
    };

    const leadHighlight = {
        fontSize: "1.27rem",
        color: COLORS.text,
        fontWeight: 800,
        lineHeight: 1.65,
        margin: "0 0 0.95rem",
        maxWidth: "72ch",
        letterSpacing: "-0.15px",
    };

    const leadRest = {
        fontSize: "1.06rem",
        color: COLORS.muted,
        margin: "0 0 2.1rem",
        maxWidth: "75ch",
        lineHeight: 1.7,
        fontWeight: 600,
    };

    const card = {
        padding: "18px 18px",
        borderRadius: 18,
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        boxShadow: "0 10px 26px rgba(15,23,42,0.05)",
        display: "grid",
        gap: 10,
        color: COLORS.text,
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
        flex: "0 0 auto",
    };

    const proofTitle = {
        margin: 0,
        fontWeight: 950,
        color: COLORS.text,
        fontSize: "1.04rem",
        letterSpacing: "-0.15px",
    };

    const proofDesc = {
        margin: "8px 0 0",
        color: COLORS.muted,
        lineHeight: 1.62,
        fontSize: ".99rem",
        fontWeight: 600,
    };

    const proofGrid = {
        display: "grid",
        gap: 14,
        marginTop: 4,
    };

    const photoCard = {
        borderRadius: 22,
        background: "rgba(255,255,255,0.62)",
        border: `1px solid ${COLORS.border}`,
        boxShadow: "0 18px 44px rgba(15,23,42,0.08)",
        display: "grid",
        gap: 12,
        color: COLORS.text,
        padding: 12,
    };

    const photoWrap = {
        borderRadius: 18,
        overflow: "hidden",
        border: `1px solid rgba(15,23,42,0.10)`,
        background: "rgba(255,255,255,0.65)",
        aspectRatio: "4 / 5",
    };

    const seoBlock = {
        marginTop: "clamp(30px, 3.8vw, 44px)",
        paddingTop: "clamp(18px, 2.4vw, 26px)",
        borderTop: `1px solid ${COLORS.border}`,
        maxWidth: "78ch",
        color: COLORS.text,
    };

    // ✅ title (no badge)
    const seoTitlePlain = {
        margin: 0,
        fontWeight: 950,
        color: COLORS.text,
        fontSize: "1.08rem",
        letterSpacing: "-0.2px",
    };

    // ✅ only badges (no long sentences)
    const tagRow = {
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        marginTop: 14,
    };

    const tag = {
        padding: "7px 11px",
        borderRadius: 999,
        border: "1px solid rgba(15,23,42,0.14)",
        background: "rgba(255,255,255,0.58)",
        fontSize: ".86rem",
        fontWeight: 850,
        color: COLORS.text,
        letterSpacing: "-0.1px",
    };

    const Proof = [
        {
            icon: faUserCheck,
            t: "Profiles built for trust",
            d: "Clear caregiver information so families can compare calmly — experience, availability and what support is offered.",
        },
        {
            icon: faShieldHalved,
            t: "A safer way to choose home care",
            d: "Structured steps that reduce risk and confusion. Families stay in control of decisions from first message to start date.",
        },
        {
            icon: faComments,
            t: "Direct communication, fewer misunderstandings",
            d: "Speak with carers directly and agree expectations early — tasks, hours, start date and boundaries.",
        },
    ];

    // ✅ badges only
    const CareTags = [
        "Companionship",
        "Light household help",
        "Meal support",
        "Daily routines",
        "Mobility support",
        "Medication reminders",
        "Post-hospital recovery",
        "Overnight care",
        "Dementia support",
    ];

    return (
        <section aria-label="Home care trust section" style={wrap}>
            <style>{microCSS}</style>

            <div style={container}>
                <h2 style={h2}>Home care with a calmer process</h2>

                <p style={leadHighlight}>
                    ICare is a caregiver marketplace designed for families looking for{" "}
                    <strong>home care</strong> (hourly or <strong>live-in care</strong>) and reliable{" "}
                    <strong>carers</strong>.
                </p>

                <p style={leadRest}>
                    We focus on clear information, direct communication, and a structured flow
                    <br />
                    that helps you choose with confidence - without the usual agency pressure.
                </p>

                <div className="icare-trust-grid" style={grid}>
                    {/* LEFT */}
                    <div>
                        <div style={proofGrid}>
                            {Proof.map((p) => (
                                <div key={p.t} className="icare-trust-card" style={card}>
                                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                                        <div style={iconWrap} aria-hidden="true">
                                            <FontAwesomeIcon icon={p.icon} />
                                        </div>
                                        <h3 style={proofTitle}>{p.t}</h3>
                                    </div>
                                    <p style={proofDesc}>{p.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: IMAGE */}
                    <aside className="icare-photo" aria-label="Care photo" style={photoCard}>
                        <div style={photoWrap}>
                            <img
                                src={imageSrc}
                                alt="Family home care support — elderly care and trusted carers"
                                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                loading="lazy"
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                    e.currentTarget.parentElement.style.display = "flex";
                                    e.currentTarget.parentElement.style.alignItems = "center";
                                    e.currentTarget.parentElement.style.justifyContent = "center";
                                    e.currentTarget.parentElement.style.color = "#0F172A";
                                    e.currentTarget.parentElement.style.fontWeight = 800;
                                    e.currentTarget.parentElement.style.fontSize = ".95rem";
                                    e.currentTarget.parentElement.textContent = "Add a care photo (update imageSrc)";
                                }}
                            />
                        </div>
                    </aside>
                </div>

                {/* ✅ SEO block: title plain + ONLY badges */}
                <div style={seoBlock} aria-label="Common care needs families search for">
                    <h3 style={seoTitlePlain}>Common care needs families search for</h3>

                    <div style={tagRow} aria-label="Care needs tags">
                        {CareTags.map((t) => (
                            <span key={t} style={tag}>
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
