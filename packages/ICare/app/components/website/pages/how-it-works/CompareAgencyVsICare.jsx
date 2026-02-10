import React from "react";
import styles from "./compare-agency-vs-icare.module.scss";

export default function CompareAgencyVsICare() {
    return (
        <section
            id="compare"
            aria-label="Compare agency vs ICare"
            className={styles.section}
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
                <div className={styles.grid}>
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
        </section>
    );
}
