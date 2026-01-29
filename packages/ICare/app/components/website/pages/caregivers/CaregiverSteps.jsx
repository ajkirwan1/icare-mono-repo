import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faSliders,
    faWallet,
    faUsers,
    faUserGroup,
    faChevronDown
} from "@fortawesome/free-solid-svg-icons";

/**
 * ICare — Combined section:
 * 1) We guide you every step of the way
 * ✅ Button scrolls to next section: #great-profile-section
 * ✅ No expand/collapse logic
 */
export default function CaregiverStepsWithProfileGuide() {
    const groupIcon = useMemo(() => faUserGroup || faUsers, []);

    // ✅ Elder-like: shorter + factual + calm (no salesy lines)
    const highlights = [
        { icon: faCircleCheck, t: "Free to start", d: "Create a profile at no cost." },
        { icon: faSliders, t: "Work your way", d: "Set hours, rates and preferences." },
        { icon: faWallet, t: "Keep more", d: "No agency margins in the middle." },
        { icon: groupIcon, t: "Direct contact", d: "Families reach out to you." }
    ];

    // ✅ Elder-like steps: one short sentence each (process only)
    const steps = [
        {
            t: "Share your basics",
            d: "Add experience, services and availability."
        },
        {
            t: "Add verification details",
            d: "Upload ID and supporting documents."
        },
        {
            t: "Connect with families",
            d: "Chat privately to understand the situation."
        },
        {
            t: "Confirm the arrangement",
            d: "Agree hours, tasks and rate in advance."
        },
        {
            t: "Start care and stay flexible",
            d: "Begin support and update availability anytime."
        }
    ];

    const P = {
        text: "#0F172A",
        olive: "#61674d"
    };

    const toggleWrap = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "2.4rem",
        marginBottom: "0"
    };

    const toggleBtn = {
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "0.9rem 1.2rem",
        borderRadius: 999,
        border: "1px solid rgba(15,23,42,0.18)",
        background: "rgba(255,255,255,0.70)",
        color: P.text,
        fontFamily:
            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        fontSize: "0.98rem",
        fontWeight: 700,
        textDecoration: "none",
        cursor: "pointer",
        boxShadow: "0 10px 26px rgba(15,23,42,0.10)"
    };

    const scrollToGreatProfile = () => {
        const el = document.getElementById("great-profile-section");
        if (!el) { return; }

        const yOffset = -30; // space above the title
        const y =
            el.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
    };

    return (
        <section
            id="caregiver-steps"
            aria-label="Caregiver steps"
            style={{
                width: "100vw",
                marginLeft: "calc(50% - 50vw)",
                marginRight: "calc(50% - 50vw)",
                background: "#ecddd18c",
                padding: "4.6rem 0 5.6rem",
                fontFamily:
                    "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
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
                            lineHeight: 1.15
                        }}
                    >
                        A clearer way to organise care work
                    </h2>

                    <p
                        style={{
                            marginTop: ".75rem",
                            marginBottom: 0,
                            color: "#0f172a",
                            fontSize: "1.4rem",
                            lineHeight: 1.55,
                            maxWidth: "70ch",
                        }}
                    >
                        Build a profile, speak with families directly, and agree arrangements upfront.
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
                        maxWidth: "800px"
                    }}
                >
                    {/* LEFT */}
                    <div>
                        <h3
                            style={{
                                margin: 0,
                                fontSize: "1.8rem",
                                fontWeight: 600,
                                color: "#0F172A",
                                letterSpacing: "-0.2px",
                                lineHeight: 1.2
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
                                maxWidth: "66ch"
                            }}
                        >
                            Made for independent caregivers - not agencies. <br />
                            Manage your work directly with families, with clear terms and fewer complications.
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
                                maxWidth: "72ch"
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
                            boxShadow: "none"
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
                                        transform: "translateY(-4px)"
                                    }}
                                >
                                    <FontAwesomeIcon icon={h.icon} style={{ fontSize: 16 }} />
                                </div>

                                <div>
                                    <div
                                        style={{
                                            fontWeight: 500,
                                            color: "#0F172A",
                                            fontSize: "1.4rem",
                                            letterSpacing: "-0.12px",
                                            lineHeight: 1.2
                                        }}
                                    >
                                        {h.t}
                                    </div>
                                    <div
                                        style={{
                                            marginTop: ".25rem",
                                            color: "#0f172a",
                                            fontSize: "1.2rem",
                                            lineHeight: 1.35
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
                        alignItems: "flex-start"
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
                                    paddingBottom: "1.15rem"
                                }}
                            >
                                <div
                                    style={{
                                        marginTop: "-3px",
                                        fontSize: "1.5rem",
                                        fontWeight: 700,
                                        color: "#4b7637",
                                        paddingRight: "20px",
                                        lineHeight: "1.6",
                                        borderRight: "1px solid rgba(0,0,0,0.5)"
                                    }}
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </div>

                                <div>
                                    <h3
                                        style={{
                                            margin: "0 0 .25rem",
                                            fontSize: "1.4rem",
                                            fontWeight: 600,
                                            color: "#0F172A"
                                        }}
                                    >
                                        {s.t}
                                    </h3>

                                    <p
                                        style={{
                                            margin: 0,
                                            fontSize: "1.2rem",
                                            color: "#0f172a",
                                            lineHeight: 1.45
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
                            boxShadow: "0 18px 48px rgba(0,0,0,0.16)"
                        }}
                    >
                        <img
                            src="images/web/icare-for-caregivers/registering.jpg"
                            alt="Caregiver registering on a mobile phone"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                objectPosition: "center"
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
                            letterSpacing: ".01em"
                        }}
                    >
                        Create your caregiver profile
                    </a>
                </div>
            </div>
        </section>
    );
}
