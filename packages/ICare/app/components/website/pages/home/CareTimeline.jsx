import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHandHoldingHeart,
    faBroom,
    faPersonWalking,
    faPills,
    faMoon,
    faClock,
    faBed,
    faBrain,
} from "@fortawesome/free-solid-svg-icons";

export default function CareTimelineSection() {
    return (
        <section
            aria-label="Care timeline"
            style={{
                width: "100%",
                background: "#FFFFFF",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            {/* ===== FULL-WIDTH HEADER ===== */}
            <div
                style={{
                    width: "100vw",
                    marginLeft: "calc(50% - 50vw)",
                    position: "relative",
                    overflow: "hidden",

                    /* ✅ nowy kolor tła */
                    background: "#b97a57",

                    padding: "clamp(2.8rem, 4.4vw, 3.8rem) 0",
                    marginBottom: "clamp(2.0rem, 3vw, 2.8rem)",
                }}
            >
                {/* subtle light wash (dopasowane do #b97a57) */}
                <div
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "#b97a57",
                        pointerEvents: "none",
                    }}
                />

                <header
                    style={{
                        width: "min(1180px, 92vw)",
                        margin: "0 auto",
                        textAlign: "center",
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    <h2
                        style={{
                            margin: 0,
                            fontWeight: 900,
                            fontSize: "clamp(1.85rem, 2.6vw, 2.35rem)",
                            color: "#fff",
                            letterSpacing: "-0.65px",
                            lineHeight: 1.08,
                        }}
                    >
                        A guided — human way to find trusted care
                    </h2>

                    <p
                        style={{
                            margin: "0.85rem auto 0",
                            maxWidth: "68ch",
                            color: "rgba(255,255,255,0.92)",
                            fontSize: "clamp(1.02rem, 1.25vw, 1.18rem)",
                            lineHeight: 1.75,
                            fontWeight: 450,
                        }}
                    >
                        Clear, step-by-step support to help you find the caregiver who truly fits your family.
                    </p>
                </header>
            </div>


            {/* ===== CONTENT ===== */}
            <div style={{ width: "min(1180px, 92vw)", margin: "0 auto" }}>
                {/* ================= FULL-WIDTH TYPES OF CARE ================= */}
                <section
                    aria-label="Types of care (full width)"
                    style={{
                        width: "100vw",
                        marginLeft: "calc(50% - 50vw)",
                        background: "#f7e7d9",
                        marginTop: "-5.4rem",
                        padding: "8.64rem 0 5.76rem",
                    }}
                >
                    <div
                        style={{
                            width: "min(980px, 92vw)",
                            margin: "0 auto",
                        }}
                    >
                        <h3
                            style={{
                                fontSize: "clamp(1.55rem, 2.2vw, 2.2rem)",
                                fontWeight: 800,
                                margin: 0,
                                color: "#0F172A",
                                letterSpacing: "-0.25px",
                                textAlign: "left",
                            }}
                        >
                            Types of care we support
                        </h3>

                        <p
                            style={{
                                margin: ".8rem 0 0",
                                color: "#475569",
                                fontSize: "1.05rem",
                                maxWidth: "56ch",
                                lineHeight: 1.65,
                                textAlign: "left",
                            }}
                        >
                            Choose the support your family needs. ICare connects you with
                            trusted, independent caregivers for flexible home care.
                        </p>

                        <div
                            className="careBoxesGrid"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                                gap: "1.68rem",
                                marginTop: "2.88rem",
                            }}
                        >
                            {[
                                {
                                    label: "Elderly care",
                                    desc: "Daily support & companionship",
                                    icon: faHandHoldingHeart,
                                },
                                {
                                    label: "Household help",
                                    desc: "Cleaning, cooking & chores",
                                    icon: faBroom,
                                },
                                {
                                    label: "Mobility support",
                                    desc: "Walking & transfers",
                                    icon: faPersonWalking,
                                },
                                {
                                    label: "Medication support",
                                    desc: "Reminders & stability",
                                    icon: faPills,
                                },
                                {
                                    label: "Night care",
                                    desc: "Overnight presence & safety",
                                    icon: faMoon,
                                },
                                {
                                    label: "Hourly care",
                                    desc: "Short visits, flexible",
                                    icon: faClock,
                                },
                                {
                                    label: "Live-in care",
                                    desc: "Full-time home assistance",
                                    icon: faBed,
                                },
                                {
                                    label: "Specialist care",
                                    desc: "Dementia & extra needs",
                                    icon: faBrain,
                                },
                            ].map((box) => (
                                <div
                                    key={box.label}
                                    style={{
                                        padding: "1.68rem 1.62rem",
                                        borderRadius: "19px",
                                        background: "rgba(249,245,240,0.6)",
                                        textAlign: "left",
                                        position: "relative",
                                    }}
                                >
                                    {/* IKONA: lewy-górny róg (bez białego tła i bez obramówki) */}
                                    <div
                                        style={{
                                            display: "inline-flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: "54px",
                                            height: "54px",
                                            borderRadius: "17px",
                                            background: "transparent", // ✅ usunięte białe tło
                                            color: "#61674d",
                                            boxShadow: "none", // ✅ bez “badge look”
                                            fontSize: "24px",
                                            marginBottom: "1.05rem",
                                        }}
                                    >
                                        <FontAwesomeIcon icon={box.icon} />
                                    </div>

                                    <h4
                                        style={{
                                            fontWeight: 700,
                                            margin: "0 0 .55rem 0",
                                            color: "#0F172A",
                                            fontSize: "1.3rem",
                                            lineHeight: 1.35,
                                        }}
                                    >
                                        {box.label}
                                    </h4>

                                    <p
                                        style={{
                                            margin: 0,
                                            color: "#475569",
                                            fontSize: "1.08rem",
                                            lineHeight: 1.55,
                                        }}
                                    >
                                        {box.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <style>{`
        @media (max-width: 980px) {
          .careBoxesGrid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 620px) {
          .careBoxesGrid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    );
}



