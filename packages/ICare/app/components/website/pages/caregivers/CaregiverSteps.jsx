import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faSliders,
    faWallet,
    faUsers,
    faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

/**
 * ICare — Combined section:
 * 1) We guide you every step of the way
 * ✅ No expand/collapse logic
 */
export default function CaregiverStepsWithProfileGuide() {
    const groupIcon = useMemo(() => faUserGroup || faUsers, []);

    // Elder-like: shorter + factual + calm
    const highlights = [
        { icon: faCircleCheck, t: "Free to start", d: "Create a profile at no cost." },
        { icon: faSliders, t: "Work your way", d: "Set hours, rates and preferences." },
        { icon: faWallet, t: "Keep more", d: "No agency margins in the middle." },
        { icon: groupIcon, t: "Direct contact", d: "Families reach out to you." },
    ];

    const P = {
        text: "#0F172A",
        icon: "rgb(221, 139, 79)",
        iconGrey: "rgba(0,0,0,0.7)"
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
                    "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <div style={{ width: "min(1200px, 92vw)", margin: "0 auto" }}>
                {/* HEADER */}
                <header style={{ marginBottom: "2.1rem", maxWidth: "1100px" }}>
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
                        marginTop: "3rem",
                        marginBottom: "2.5rem",
                        borderRadius: "40px",
                        maxWidth: "1000px",
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
                                maxWidth: "72ch",
                            }}
                        />
                    </div>

                    {/* RIGHT — highlights in icare-types-item style */}
                    <div
                        aria-label="Caregiver benefits highlights"
                        className="icare-why-highlights"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                            gap: "clamp(18px, 2.2vw, 26px)",
                            alignItems: "stretch",
                            padding: 0,
                            background: "transparent",
                            border: "none",
                            boxShadow: "none",
                        }}
                    >
                        {highlights.map((h) => (
                            <div
                                key={h.t}
                                className="icare-types-item"
                                style={{
                                    display: "flex",
                                    gap: 14,
                                    alignItems: "flex-start",
                                    padding: "18px 0px",
                                    height: "100%",
                                    alignSelf: "stretch",
                                }}
                            >
                                <span
                                    aria-hidden="true"
                                    style={{
                                        width: 30,
                                        height: 38,
                                        display: "inline-flex",
                                        alignItems: "start",
                                        justifyContent: "center",
                                        color: P.icon,
                                        flex: "0 0 auto",
                                        marginTop: 2,
                                    }}
                                >
                                    <FontAwesomeIcon icon={h.icon} style={{ fontSize: 24, lineHeight: 1 }} />
                                </span>

                                <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
                                    <h3
                                        style={{
                                            margin: 0,
                                            padding: 0,
                                            fontWeight: 700,
                                            letterSpacing: "-0.15px",
                                            color: P.text,
                                            fontSize: "1.2rem",
                                            lineHeight: 1.4,
                                            whiteSpace: "normal",
                                            overflow: "visible",
                                        }}
                                    >
                                        {h.t}
                                    </h3>
                                    <p
                                        style={{
                                            margin: 0,
                                            color: P.text,
                                            fontWeight: 500,
                                            lineHeight: 1.65,
                                            fontSize: "1.1rem",
                                            whiteSpace: "normal",
                                            overflow: "visible",
                                        }}
                                    >
                                        {h.d}
                                    </p>
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
                        gridTemplateColumns: "1fr 1fr",
                        gap: "2rem",
                        marginTop: "2.4rem",
                        alignItems: "flex-start",
                    }}
                >


                    {/* LEFT — IMAGE */}
                    <figure
                        style={{
                            margin: 0,
                            width: "100%",
                            height: "460px",
                            borderRadius: "22px",
                            overflow: "hidden",
                            border: "1px solid rgba(0,0,0,0.06)",
                            boxShadow: "0 18px 48px rgba(0,0,0,0.16)",
                        }}
                    >
                        <img
                            src="images/web/icare-for-caregivers/icare-register.webp"
                            alt="Caregiver registering on a mobile phone"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                objectPosition: "center",
                            }}
                        />
                    </figure>

                    {/* RIGHT — MODULES (no numbers) */}
                    <div style={{ display: "grid", gap: ".75rem" }}>
                        {[
                            { t: "Your profile setup", d: "Add experience, services and availability." },
                            { t: "Verification", d: "Upload ID and supporting documents." },
                            { t: "Direct conversations", d: "Chat privately with families." },
                            { t: "Clear agreements", d: "Agree hours, tasks and rates upfront." },
                            { t: "Ongoing flexibility", d: "Update availability anytime." },
                        ].map((s) => (
                            <div
                                key={s.t}
                                className="icare-types-item"
                                style={{
                                    display: "flex",
                                    gap: 14,
                                    alignItems: "flex-start",
                                    padding: ".75rem 0",
                                    height: "100%",
                                    alignSelf: "stretch",
                                    borderBottom: "1px solid rgba(0,0,0,0.14)",
                                }}
                            >
                                <span
                                    aria-hidden="true"
                                    style={{
                                        width: 30,
                                        height: 38,
                                        display: "inline-flex",
                                        alignItems: "start",
                                        justifyContent: "center",
                                        color: P.iconGrey,
                                        flex: "0 0 auto",
                                        marginTop: 4,
                                    }}
                                >
                                    <FontAwesomeIcon icon={faCircleCheck} style={{ fontSize: 20, lineHeight: 1 }} />
                                </span>

                                <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
                                    <h3
                                        style={{
                                            margin: 0,
                                            padding: 0,
                                            fontWeight: 600,
                                            letterSpacing: "-0.15px",
                                            color: P.text,
                                            fontSize: "1.1rem",
                                            lineHeight: 1.4,
                                            whiteSpace: "normal",
                                            overflow: "visible",
                                        }}
                                    >
                                        {s.t}
                                    </h3>

                                    <p
                                        style={{
                                            margin: 0,
                                            color: P.text,
                                            fontWeight: 400,
                                            lineHeight: 1.65,
                                            fontSize: "1.1rem",
                                            whiteSpace: "normal",
                                            overflow: "visible",
                                        }}
                                    >
                                        {s.d}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
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
                        Create your caregiver profile
                    </a>
                </div>
            </div>

            {/* ✅ responsive only (rest untouched) */}
            <style>{`
            .icare-types-item:last-child{border:0 !important;}
        @media (max-width: 900px){
          .icare-whygrid{
            grid-template-columns: 1fr !important;
          }
          .icare-why-highlights{
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
          .icare-main-grid{
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px){
          .icare-why-highlights{
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </section>
    );
}
