import React from "react";

export default function CompareAgencyVsICare() {
    const BRAND = "#1FAB1F";
    const TEXT = "#0F172A";

    // Home-page typography (same feel)
    const H1 = {
        margin: 0,
        fontWeight: 500,
        letterSpacing: "-0.6px",
        lineHeight: 1.14,
        fontSize: "clamp(2.25rem, 3vw, 2.6rem)",
        color: TEXT,
    };

    const H2 = {
        margin: "10px 0 0",
        fontWeight: 600,
        letterSpacing: "-0.2px",
        lineHeight: 1.25,
        fontSize: "1.30rem",
        color: TEXT,
    };

    const LEAD = {
        margin: "0.9rem 0 4rem",
        color: TEXT,
        maxWidth: "65ch",
        lineHeight: 1.65,
        fontSize: "1.35rem",
        fontWeight: 400, // ✅ was 600
    };

    const CARD_TITLE = {
        margin: 0,
        fontSize: "1.50rem",
        fontWeight: 500,
        color: TEXT,
        letterSpacing: "-0.15px",
        lineHeight: 1.25,
    };

    const LI_TEXT = {
        display: "flex",
        gap: 12,
        color: "#1f2a37",
        fontSize: "1.25rem",
        lineHeight: 1.55,
        fontWeight: 400,
    };


    const LI_SVG = {
        position: "relative",
        top: "5px"
    }

    return (
        <section
            id="compare"
            aria-label="Compare agency vs ICare"
            style={{
                background: "#fff9ef",
                borderTop: "1px solid rgba(15,23,42,0.06)",
                borderBottom: "1px solid rgba(15,23,42,0.06)",
                padding: "clamp(6rem,9vw,8rem) clamp(24px,6vw,60px) clamp(4rem,6vw,6rem)"
            }}
        >
            <div
                style={{
                    maxWidth: 1180,
                    margin: "0 auto",
                    animation: "fadeUp 1s ease both",
                }}
            >
                {/* Home-like header typography */}
                <h1 style={H1}>Why families choose ICare</h1>
                <h2 style={H2}>A clearer alternative to agencies</h2>

                <p style={LEAD}>
                    A modern, transparent alternative to traditional agencies where families retain
                    choice, clarity, and fair pricing.
                </p>

                {/* GRID */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "clamp(50px,6vw,70px)",
                        alignItems: "start",
                    }}
                >
                    {/* PHOTO — Traditional Agency */}
                    <img
                        src="images/web/how-it-works/paperwork.jpg"
                        alt="Traditional agency paperwork"
                        style={{
                            width: "100%",
                            height: "340px",
                            objectFit: "cover",
                            borderRadius: 28,
                            border: "1px solid rgba(0,0,0,0.05)",
                            boxShadow: "0 12px 28px rgba(0,0,0,0.06)",
                        }}
                    />

                    {/* AGENCY CARD */}
                    <article
                        style={{

                            transition: "background .25s ease, border .25s ease",
                        }}
                    >
                        <div>
                            <h3 style={CARD_TITLE}>Traditional Agency</h3>

                            <ul
                                style={{
                                    padding: 0,
                                    margin: "22px 0 0",
                                    listStyle: "none",
                                    display: "grid",
                                    gap: 14,
                                }}
                            >
                                {[
                                    "High margins (25–40%)",
                                    "Limited choice of caregiver",
                                    "Locked contracts",
                                    "Extra fees for changes",
                                    "Limited transparency",
                                ].map((item) => (
                                    <li key={item} style={LI_TEXT}>
                                        <svg
                                            style={LI_SVG}
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            stroke="#1f2a37"
                                            strokeWidth="1.6"
                                            fill="none"
                                        >
                                            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>

                    {/* PHOTO — ICare */}
                    <img
                        src="/images/web/how-it-works/icare.jpg"
                        alt="Caregiver supportive environment"
                        style={{
                            width: "100%",
                            height: "340px",
                            objectFit: "cover",
                            borderRadius: 28,
                            border: "1px solid rgba(0,0,0,0.05)",
                            boxShadow: "0 12px 28px rgba(0,0,0,0.06)",
                        }}
                    />

                    {/* ICARE CARD */}
                    <article
                        style={{
                            transition: "background .25s ease, border .25s ease",
                        }}
                    >
                        <div>
                            <h3
                                style={{
                                    ...CARD_TITLE,
                                    color: BRAND,
                                }}
                            >
                                <img
                                    src="/images/logo/icareblack.svg"
                                    alt="ICare"
                                    style={{ height: 35, width: "auto", display: "block" }}
                                />
                            </h3>

                            <ul
                                style={{
                                    padding: 0,
                                    margin: "22px 0 0",
                                    listStyle: "none",
                                    display: "grid",
                                    gap: 14,
                                }}
                            >
                                {[
                                    "Flat 10% fee per agreement",
                                    "Choose your preferred caregiver",
                                    "Full transparency",
                                    "Direct agreements",
                                    "Better pay for caregivers",
                                ].map((item) => (
                                    <li key={item} style={LI_TEXT}>
                                        <svg
                                            style={LI_SVG}
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            stroke="#1f2a37"
                                            strokeWidth="1.7"
                                            fill="none"
                                        >
                                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>
                </div>
            </div>

            <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </section>
    );
}
