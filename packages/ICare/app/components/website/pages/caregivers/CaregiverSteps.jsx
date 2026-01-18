import React, { useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faSliders,
    faWallet,
    faUsers,
    faUserGroup, // optional: if not available in your version, fallback to faUsers
    faChevronDown,
    faChevronUp,
    faPenNib,
    faBriefcase,
    faClock,
    faHandHoldingHeart,
    faBan,
    faLocationDot,
    faLanguage,
    faFileCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

/**
 * ICare — Combined section:
 * 1) We guide you every step of the way
 * 2) Collapsible: What makes a great profile (mini-guide)
 * ✅ Smooth scroll on expand
 * ✅ Profile section ~30%+ smaller + more condensed
 * ✅ No gradient, no green background
 * ✅ Button further away from the expanded section
 * ✅ No copy changes
 * ✅ Profile cards: titles 1.22rem, p 1.1rem, a bit more padding, icons +10%
 */
export default function CaregiverStepsWithProfileGuide() {
    const groupIcon = useMemo(() => faUserGroup || faUsers, []);
    const [isOpen, setIsOpen] = useState(false);
    const guideRef = useRef(null);

    const highlights = [
        { icon: faCircleCheck, t: "No fee", d: "Create your profile for free." },
        { icon: faSliders, t: "Flexibility", d: "Choose hours, clients and rates." },
        { icon: faWallet, t: "Keep more", d: "Agency-free, direct agreements." },
        { icon: groupIcon, t: "Direct matching", d: "Families contact you directly." },
    ];

    const steps = [
        {
            t: "Tell us about yourself",
            d: "Your skills, experience and availability help families understand who you are.",
        },
        {
            t: "Complete your checks",
            d: "Upload your ID, references and documents safely. We're here to guide you.",
        },
        {
            t: "Start talking to families",
            d: "Families reach out when your profile feels right. Ask questions, take your time.",
        },
        {
            t: "Agree the details together",
            d: "You decide the hours, responsibilities and rate — openly and without pressure.",
        },
        {
            t: "Begin supporting someone",
            d: "Your care makes a real difference. Update availability anytime.",
        },
    ];

    // --- What makes a great profile (condensed + neutral background) ---
    const P = {
        bg: "rgba(255,255,255,0.92)",
        panel: "rgba(255,255,255,0.96)",
        text: "#0F172A",
        muted: "rgba(15,23,42,0.62)",
        border: "rgba(15,23,42,0.12)",
        shadow: "0 16px 46px rgba(15,23,42,0.10)",
        olive: "#61674d",
    };

    const profileItems = [
        {
            icon: faPenNib,
            title: "A clear opening sentence",
            desc:
                "Start with who you are and the type of care you provide. One sentence is enough to set context.",
        },
        {
            icon: faBriefcase,
            title: "Relevant experience",
            desc:
                "Briefly describe your background: years of experience, conditions you’ve supported, or environments you’ve worked in (home care, live-in, dementia care, companionship).",
        },
        {
            icon: faClock,
            title: "Availability & schedule",
            desc:
                "Be specific about days, hours, live-in or hourly options, and any flexibility you offer.",
        },
        {
            icon: faHandHoldingHeart,
            title: "Type of care you provide",
            desc:
                "Explain what support you offer: personal care, companionship, mobility support, household help, overnight presence, or specialist care.",
        },
        {
            icon: faBan,
            title: "Boundaries & preferences",
            desc:
                "Clear boundaries prevent misunderstandings. Mention tasks you do not provide or situations you prefer to avoid.",
        },
        {
            icon: faLocationDot,
            title: "Location & travel radius",
            desc:
                "State where you are based and how far you’re willing to travel or relocate.",
        },
        {
            icon: faLanguage,
            title: "Language & communication",
            desc:
                "List the languages you speak and your level of fluency — this matters for comfort and trust.",
        },
        {
            icon: faFileCircleCheck,
            title: "References & verification",
            desc:
                "If you have references, certifications or checks available, mention them clearly so families can assess trust at a glance.",
        },
    ];

    // Condensed sizing (keep neutral, no gradient)
    const profileWrap = {
        width: "100%",
        padding: "clamp(1.9rem, 2.8vw, 2.4rem) 0",
        background: P.bg,
        color: P.text,
        fontFamily:
            "Nunito, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        borderRadius: 22,
        border: `1px solid ${P.border}`,
        boxShadow: P.shadow,
    };

    const profileContainer = {
        width: "min(94vw, 1120px)",
        margin: "0 auto",
        padding: "0 clamp(14px, 2.4vw, 26px)",
    };

    const profileHeader = {
        maxWidth: "78ch",
        marginBottom: "clamp(1.0rem, 1.6vw, 1.3rem)",
    };

    const profileH2 = {
        margin: 0,
        fontWeight: 600,
        letterSpacing: "-0.45px",
        lineHeight: 1.12,
        fontSize: "1.6rem",
    };

    const profileLead = {
        marginTop: "0.55rem",
        marginBottom: 0,
        fontSize: "1.22rem",
        lineHeight: 1.55,
        fontWeight: 400,
        color: P.text,
        maxWidth: "72ch",
    };

    const profileGrid = {
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: "clamp(10px, 1.4vw, 14px)",
        alignItems: "stretch",
    };

    // ✅ more padding in cards
    const profileCard = {
        background: P.panel,
        border: `1px solid ${P.border}`,
        borderRadius: 16,
        padding: "clamp(14px, 1.9vw, 18px)",
        boxShadow: "0 10px 24px rgba(15,23,42,0.06)",
        display: "grid",
        gap: 10,
    };

    const profileTopRow = {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12,
    };

    // ✅ titles 1.22rem
    const profileTitle = {
        margin: 0,
        fontSize: "1.1rem",
        fontWeight: 600,
        lineHeight: 1.22,
        letterSpacing: "-0.12px",
        color: P.text,
    };

    const profileIconWrap = {
        width: 30, // slight bump to fit bigger icon
        height: 30,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: P.olive,
        opacity: 0.92,
        flex: "0 0 auto",
        marginTop: 1,
    };

    // ✅ icons +10% (16 -> ~18)
    const profileIconStyle = { fontSize: 18, lineHeight: 1 };

    // ✅ p 1.1rem
    const profileDesc = {
        margin: 0,
        fontSize: "1.1rem",
        lineHeight: 1.48,
        fontWeight: 400,
        color: "rgba(15,23,42,0.92)",
    };

    const profileNote = {
        marginTop: "clamp(1.0rem, 1.6vw, 1.2rem)",
        paddingTop: "clamp(10px, 1.4vw, 14px)",
        borderTop: "1px dashed rgba(15,23,42,0.18)",
        maxWidth: "84ch",
        color: "rgba(15,23,42,0.9)",
    };

    const profileNoteTitle = {
        margin: 0,
        fontSize: "1.1rem",
        fontWeight: 800,
        letterSpacing: "-0.08px",
    };

    const profileNoteText = {
        margin: "0.4rem 0 0",
        fontSize: "0.94rem",
        lineHeight: 1.5,
        fontWeight: 400,
        color: P.muted,
    };

    // --- Toggle + smooth scroll ---
    const toggleWrap = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "2.4rem",
        marginBottom: isOpen ? "2.6rem" : "0",
    };

    const toggleBtn = {
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "0.9rem 1.2rem",
        borderRadius: 999,
        border: "1px solid rgba(15,23,42,0.18)",
        background: "rgba(255,255,255,0.70)",
        color: "#0F172A",
        fontFamily:
            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        fontSize: "0.98rem",
        fontWeight: 700,
        textDecoration: "none",
        cursor: "pointer",
        boxShadow: "0 10px 26px rgba(15,23,42,0.10)",
    };

    const handleToggle = () => {
        setIsOpen((prev) => {
            const next = !prev;

            if (!prev) {
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        guideRef.current?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        });
                    });
                });
            }

            return next;
        });
    };

    return (
        <section
            id="caregiver-steps"
            aria-label="Caregiver steps"
            style={{
                width: "100vw",
                marginLeft: "calc(50% - 50vw)",
                marginRight: "calc(50% - 50vw)",
                background: "#d9d7bd",
                padding: "4.6rem 0 5.6rem",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <div style={{ width: "min(1200px, 92vw)", margin: "0 auto" }}>
                {/* HEADER */}
                <header style={{ marginBottom: "2.1rem", maxWidth: "820px" }}>
                    <h2
                        style={{
                            margin: 0,
                            fontWeight: 500,
                            fontSize: "2.6rem",
                            letterSpacing: "-0.35px",
                            color: "#0F172A",
                            lineHeight: 1.15,
                        }}
                    >
                        We guide you every step of the way
                    </h2>

                    <p
                        style={{
                            marginTop: ".75rem",
                            marginBottom: 0,
                            color: "#0f172a",
                            fontSize: "1.22rem",
                            lineHeight: 1.55,
                            maxWidth: "70ch",
                            fontWeight: 400,
                        }}
                    >
                        A simple way to take control of your care work and earnings.
                    </p>
                </header>

                {/* WHY + BENEFITS */}
                <div
                    className="icare-whygrid"
                    style={{
                        display: "grid",
                        gap: "1.75rem",
                        alignItems: "start",
                        marginBottom: "3.1rem",
                        borderRadius: "40px",
                        maxWidth: "800px",
                    }}
                >
                    {/* LEFT */}
                    <div>
                        <h3
                            style={{
                                margin: 0,
                                fontSize: "1.6rem",
                                fontWeight: 600,
                                color: "#0F172A",
                                letterSpacing: "-0.2px",
                                lineHeight: 1.2,
                            }}
                        >
                            Why ICare?
                        </h3>

                        <p
                            style={{
                                marginTop: ".85rem",
                                marginBottom: 0,
                                fontSize: "1.22rem",
                                lineHeight: 1.5,
                                color: "#0f172a",
                                fontWeight: 400,
                                maxWidth: "66ch",
                            }}
                        >
                            ICare is built for independent caregivers — not agencies. <br />
                            You stay in control of your working life: speak directly with
                            families,<br />
                            agree the right support and work on terms that fit you.
                        </p>

                        <p
                            style={{
                                marginTop: "1.05rem",
                                marginBottom: 0,
                                fontSize: "1.01rem",
                                lineHeight: 1.6,
                                color: "#0f172a",
                                fontWeight: 600,
                                opacity: 0.9,
                                maxWidth: "72ch",
                            }}
                        />
                    </div>

                    {/* RIGHT */}
                    <div
                        aria-label="Caregiver benefits highlights"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                            gap: "2rem",
                            padding: 0,
                            background: "transparent",
                            border: "none",
                            boxShadow: "none",
                        }}
                    >
                        {highlights.map((h) => (
                            <div
                                key={h.t}
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "34px 1fr",
                                    gap: ".75rem",
                                    alignItems: "start",
                                }}
                            >
                                <div
                                    aria-hidden="true"
                                    style={{
                                        width: 34,
                                        height: 34,
                                        borderRadius: 12,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#0F3D20",
                                        transform: "translateY(-4px)",
                                    }}
                                >
                                    <FontAwesomeIcon icon={h.icon} style={{ fontSize: 16 }} />
                                </div>

                                <div>
                                    <div
                                        style={{
                                            fontWeight: 600,
                                            color: "#0F172A",
                                            fontSize: "1.35rem",
                                            letterSpacing: "-0.12px",
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        {h.t}
                                    </div>
                                    <div
                                        style={{
                                            marginTop: ".25rem",
                                            color: "#0f172a",
                                            fontSize: "1.2rem",
                                            lineHeight: 1.35,
                                        }}
                                    >
                                        {h.d}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* MAIN GRID */}
                <div
                    className="icare-main-grid"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1.2fr .8fr",
                        gap: "3rem",
                        marginTop: "6rem",
                        alignItems: "flex-start",
                    }}
                >
                    {/* LEFT — STEPS */}
                    <div style={{ display: "grid", gap: "1.35rem" }}>
                        {steps.map((s, i) => (
                            <div
                                key={i}
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "60px 1fr",
                                    gap: "2rem",
                                    paddingBottom: "1.15rem",
                                }}
                            >
                                <div
                                    style={{
                                        marginTop: "-3px",
                                        fontSize: "1.5rem",
                                        fontWeight: 700,
                                        color: "#0F3D20",
                                        opacity: 0.75,
                                        paddingRight: "20px",
                                        lineHeight: "1.6",
                                        borderRight: "1px solid rgba(0,0,0,0.5)",
                                    }}
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </div>

                                <div>
                                    <h3
                                        style={{
                                            margin: "0 0 .25rem",
                                            fontSize: "1.22rem",
                                            fontWeight: 600,
                                            color: "#0F172A",
                                        }}
                                    >
                                        {s.t}
                                    </h3>

                                    <p
                                        style={{
                                            margin: 0,
                                            fontSize: "1.1rem",
                                            color: "#0f172a",
                                            lineHeight: 1.45,
                                        }}
                                    >
                                        {s.d}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT — IMAGE */}
                    <figure
                        style={{
                            margin: 0,
                            width: "100%",
                            height: "380px",
                            borderRadius: "22px",
                            overflow: "hidden",
                            border: "1px solid rgba(0,0,0,0.06)",
                            boxShadow: "0 18px 48px rgba(0,0,0,0.16)",
                        }}
                    >
                        <img
                            src="images/web/icare-for-caregivers/registering.jpg"
                            alt="Caregiver registering on a mobile phone"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                objectPosition: "center",
                            }}
                        />
                    </figure>
                </div>

                {/* CTA */}
                <div style={{ marginTop: "2.9rem" }}>
                    <a
                        href="/register"
                        style={{
                            display: "inline-flex",
                            padding: "0.85rem 1.8rem",
                            borderRadius: 999,
                            background: "#778d43",
                            color: "#fff",
                            fontSize: ".95rem",
                            fontWeight: 700,
                            textDecoration: "none",
                            letterSpacing: ".01em",
                        }}
                    >
                        Join as a caregiver
                    </a>
                </div>

                {/* TOGGLE */}
                <div style={toggleWrap}>
                    <button
                        type="button"
                        onClick={handleToggle}
                        aria-expanded={isOpen}
                        aria-controls="caregiver-profile-guide"
                        style={toggleBtn}
                    >
                        <span>What makes a great profile</span>
                        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
                    </button>
                </div>

                {/* COLLAPSIBLE CONTENT (scroll target) */}
                <div
                    id="caregiver-profile-guide"
                    ref={guideRef}
                    style={{
                        marginTop: "0.2rem",
                        display: isOpen ? "block" : "none",
                    }}
                >
                    <section aria-label="What makes a great caregiver profile" style={profileWrap}>
                        <div style={profileContainer}>
                            <header style={profileHeader}>
                                <h2 style={profileH2}>What makes a great profile</h2>
                                <p style={profileLead}>
                                    A strong profile helps families understand you quickly and reach
                                    out with confidence. Think of it as a short, structured
                                    introduction — clear, honest and easy to scan.
                                </p>
                            </header>

                            <div className="icare-profile-grid" style={profileGrid}>
                                {profileItems.map((x) => (
                                    <article key={x.title} style={profileCard}>
                                        <div style={profileTopRow}>
                                            <h3 style={profileTitle}>{x.title}</h3>
                                            <span style={profileIconWrap} aria-hidden="true">
                                                <FontAwesomeIcon icon={x.icon} style={profileIconStyle} />
                                            </span>
                                        </div>
                                        <p style={profileDesc}>{x.desc}</p>
                                    </article>
                                ))}
                            </div>

                            <div style={profileNote}>
                                <p style={profileNoteTitle}>Why this structure works</p>
                                <p style={profileNoteText}>
                                    Families often compare profiles quickly. Clear sections reduce
                                    uncertainty, speed up decisions, and lead to better-matched
                                    conversations from the start.
                                </p>
                            </div>
                        </div>

                        <style>{`
              @media (max-width: 900px){
                .icare-profile-grid{ grid-template-columns: 1fr !important; }
              }
            `}</style>
                    </section>
                </div>

                <style>{`
          @media (max-width: 980px) {
            .icare-whygrid { grid-template-columns: 1fr !important; gap: 1.6rem !important; padding: 26px 22px 28px !important; }
            [aria-label="Caregiver benefits highlights"] { grid-template-columns: 1fr !important; }
            .icare-main-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
            </div>
        </section>
    );
}
