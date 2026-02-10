import React from "react";

export default function CompareAgencyVsICare() {
    const BRAND = "#1FAB1F";
    const TEXT = "#0F172A";

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
        margin: "0.9rem 0 3rem",
        color: TEXT,
        maxWidth: "50ch",
        lineHeight: 1.65,
        fontSize: "1.4rem",
        fontWeight: 400,
    };

    const DISCLAIMER = {
        marginTop: "1.2rem",
        fontSize: "0.85rem",
        lineHeight: 1.5,
        color: "rgba(15,23,42,0.65)",
        maxWidth: "65ch",
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
        top: "7px",
    };

    return (
        <section
            id="compare"
            aria-label="Compare agency vs ICare"
            style={{
                background: "white",
                borderTop: "1px solid rgba(15,23,42,0.06)",
                borderBottom: "1px solid rgba(15,23,42,0.06)",
                padding: "4rem",
            }}
        >
            <div
                style={{
                    maxWidth: 1180,
                    margin: "0 auto",
                    animation: "fadeUp 1s ease both",
                }}
            >
                <h2 style={H1}>A calmer alternative to traditional agencies</h2>

                <p style={LEAD}>
                    Arrange companionship at home with more clarity and more control.
                    ICare helps families connect with independent caregivers directly - with
                    transparent terms and a clear platform fee.
                </p>

                {/* Legal / trust micro-disclaimer */}
                <p style={DISCLAIMER}>
                    Comparison reflects common industry structures. Experiences, fees and terms may vary
                    between providers.
                </p>

                {/* GRID */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "clamp(50px,6vw,70px)",
                        alignItems: "start",
                        marginTop: "3rem",
                    }}
                >
                    {/* PHOTO — Traditional Agency */}
                    <img
                        src="images/web/how-it-works/paperwork.jpg"
                        alt="Paperwork and costs often associated with traditional agencies"
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
                    <article>
                        <div>
                            <h3 style={CARD_TITLE}>Typical agency structure</h3>

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
                                    "Agency fees can vary and may be higher",
                                    "Choice may be limited to the agency’s pool",
                                    "Terms can feel restrictive",
                                    "Changes may involve additional charges",
                                    "Pricing can be less transparent",
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
                                            <path
                                                d="M18 6L6 18M6 6l12 12"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>

                    {/* PHOTO — ICare */}
                    <img
                        src="/images/web/how-it-works/icare-how-it-works.webp"
                        alt="Companionship at home with a supportive caregiver"
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
                    <article>
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
                                    style={{
                                        height: 35,
                                        width: "auto",
                                        display: "block",
                                    }}
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

                                    "Choose the caregiver you feel comfortable with",
                                    "Transparent terms from the start",
                                    "Direct family–caregiver agreements",
                                    "Fairer pay for caregivers",
                                    "More control over care decisions",
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
                                            <path
                                                d="M5 13l4 4L19 7"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
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
