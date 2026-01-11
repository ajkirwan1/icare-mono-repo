import React from "react";

export default function CompareAgencyVsICare() {
    const BRAND = "#1FAB1F";

    return (

        <section
            id="compare"
            aria-label="Compare agency vs ICare"
            style={{
                background: "#fff9ef",
                borderTop: "1px solid rgba(15,23,42,0.06)",
                borderBottom: "1px solid rgba(15,23,42,0.06)",
                padding:
                    "clamp(6rem,9vw,8rem) clamp(24px,6vw,60px) clamp(4rem,6vw,6rem)",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <div
                style={{
                    maxWidth: 1180,
                    margin: "0 auto",
                    animation: "fadeUp 1s ease both",
                }}
            >
                {/* Title — smaller */}
                <h2
                    style={{
                        margin: 0,
                        fontWeight: 800,
                        color: "#0F172A",
                        fontSize: "clamp(2.05rem,2.7vw,2.55rem)", // ✅ smaller headline, lead unchanged
                        letterSpacing: "-0.4px",
                        lineHeight: 1.15,
                    }}
                >
                    Why families choose ICare
                </h2>

                {/* Lead — unchanged */}
                <p
                    style={{
                        margin: "1.3rem 0 4rem",
                        color: "#0f172a",
                        maxWidth: "65ch",
                        lineHeight: 1.68,
                        fontSize: "1.12rem",
                        fontWeight: 400,
                    }}
                >
                    A modern, transparent alternative to traditional agencies — where families retain
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
                            background: "#44444415",
                            border: "1px solid rgba(31,171,31,0.10)",
                            borderRadius: 28,
                            overflow: "hidden",
                            transition: "background .25s ease, border .25s ease",
                        }}
                    >
                        <div style={{ padding: "32px" }}>
                            <h3
                                style={{
                                    margin: 0,
                                    fontSize: "1.42rem",
                                    fontWeight: 800,
                                    color: "#0f172a",
                                    letterSpacing: "-0.15px",
                                }}
                            >
                                Traditional Agency
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
                                    "High margins (25–40%)",
                                    "Limited choice of caregiver",
                                    "Locked contracts",
                                    "Extra fees for changes",
                                    "Limited transparency",
                                ].map((item) => (
                                    <li
                                        key={item}
                                        style={{
                                            display: "flex",
                                            gap: 12,
                                            color: "#1f2a370",
                                            fontSize: "1.05rem",
                                            lineHeight: 1.55,
                                        }}
                                    >
                                        <svg
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
                            background: "#0aa80a40",
                            border: "1px solid rgba(31,171,31,0.22)",
                            borderRadius: 28,
                            overflow: "hidden",
                            transition: "background .25s ease, border .25s ease",
                        }}
                    >
                        <div style={{ padding: "32px" }}>
                            <h3
                                style={{
                                    margin: 0,
                                    fontSize: "1.42rem",
                                    fontWeight: 800,
                                    color: "#1FAB1F",
                                    letterSpacing: "-0.15px",
                                }}
                            >
                                <img
                                    src="/images/logo/icarelogo20.svg"
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
                                    <li
                                        key={item}
                                        style={{
                                            display: "flex",
                                            gap: 12,
                                            color: "#1f2a37",
                                            fontSize: "1.05rem",
                                            lineHeight: 1.55,
                                        }}
                                    >
                                        <svg
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
            </div >

            <style>{`
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(18px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `}</style>
        </section >

    );
}
