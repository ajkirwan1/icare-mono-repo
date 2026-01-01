import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faIdCard,
    faShieldHalved,
    faUserCheck,
    faFileCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function IcareBanner2() {
    const TRUST_ITEMS = [

        { icon: faIdCard, text: "Photo ID + Right to Work required" },
        { icon: faUserCheck, text: "Carers with references and relevant experience" },
        { icon: faFileCircleCheck, text: "DBS checked and insured" },
    ];

    return (
        <section
            aria-label="ICare Banner"
            style={{
                width: "100%",
                background: "#FFFFFF",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <div
                style={{
                    width: "100vw",
                    marginLeft: "calc(50% - 50vw)",
                    position: "relative",
                    overflow: "hidden",
                    padding: "clamp(3.3rem, 5.2vw, 4.4rem) 0",
                }}
            >
                <div
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "#61674db8",
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
                            fontSize: "clamp(1.9rem, 2.7vw, 2.45rem)",
                            color: "#fff",
                            letterSpacing: "-0.65px",
                            lineHeight: 1.08,
                        }}
                    >
                        Safety comes first
                    </h2>

                    <p
                        style={{
                            margin: "1.05rem auto 0",
                            maxWidth: "70ch",
                            color: "rgba(255,255,255,0.92)",
                            fontSize: "clamp(1.04rem, 1.25vw, 1.18rem)",
                            lineHeight: 1.75,
                            fontWeight: 450,
                        }}
                    >
                        We publish profiles only after the required documents are in place — so families can feel confident before reaching out.
                    </p>

                    {/* ✅ TRUST BAR — NO CUT: wraps only if needed (still horizontal layout) */}
                    <div
                        aria-label="Trust bar"
                        style={{
                            margin: "1.9rem auto 0",
                            width: "min(1120px, 96vw)",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexWrap: "wrap",          // ✅ key fix: no more right cut
                                rowGap: 14,
                                columnGap: 0,
                                padding: "6px 0",
                            }}
                        >
                            {TRUST_ITEMS.map((item, idx) => (
                                <React.Fragment key={item.text}>
                                    <div
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: 10,
                                            padding: "10px 14px", // ✅ smaller
                                            borderRadius: 999,
                                            background: "rgba(255,255,255,0.10)",
                                            border: "1px solid rgba(255,255,255,0.20)",
                                            backdropFilter: "blur(8px)",
                                            WebkitBackdropFilter: "blur(8px)",
                                            color: "rgba(255,255,255,0.93)",
                                            fontWeight: 700,
                                            fontSize: "clamp(0.90rem, 0.95vw, 0.98rem)", // ✅ responsive
                                            letterSpacing: "-0.12px",
                                            lineHeight: 1.15,
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={item.icon}
                                            style={{ fontSize: "0.95rem", opacity: 0.95 }}
                                        />
                                        <span>{item.text}</span>
                                    </div>

                                    {/* ✅ separator as separate element, but tighter so it fits */}
                                    {idx < TRUST_ITEMS.length - 1 ? (
                                        <div
                                            aria-hidden="true"
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                width: "clamp(18px, 1.7vw, 44px)", // ✅ smaller than before
                                                height: 40,
                                            }}
                                        >
                                            <span
                                                style={{
                                                    width: 1,
                                                    height: 20,
                                                    background: "rgba(255,255,255,0.26)",
                                                    borderRadius: 99,
                                                }}
                                            />
                                        </div>
                                    ) : null}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* ✅ Assurance BELOW + more air */}
                    <div
                        style={{
                            margin: "22px auto 0",
                            maxWidth: "920px",
                            color: "rgba(255,255,255,0.88)",
                            fontSize: "0.98rem",
                            fontWeight: 520,
                            lineHeight: 1.6,
                        }}
                    >

                    </div>
                </header>
            </div>
        </section>
    );
}
