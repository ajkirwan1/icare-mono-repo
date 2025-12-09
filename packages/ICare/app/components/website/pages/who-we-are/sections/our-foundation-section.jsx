import React from "react";
import { InfoCard } from "../cards/info-card";
import styles from "../../../../../styles/components/website/pages/who-we-are/sections/first-section.module.scss";

export function OurFoundationSection() {
    return (
        <section
            id="foundation"
            aria-label="Our foundation and mission"
            className={styles.section}
            style={{
                padding: "7rem 0",
                background: "transparent",

                /* ⭐ PRZESUWA CAŁĄ SEKCJĘ O 20% W LEWO */
                transform: "translateX(-27%) translateY(-15%)",

                overflow: "visible",

                /* ⭐ poszerzona sekcja, aby przesunięcie nie ucinało treści */
                width: "140vw",
            }}
        >
            <div
                className={styles.grid}
                style={{
                    display: "grid",
                    gap: "3.4rem",
                    gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",

                    width: "min(120vw, 1600px)",
                    marginLeft: "2vw",
                }}
            >


                {/* === LEFT CARD — OUR FOUNDATION === */}
                <InfoCard
                    title="Our foundation"
                    accent="left"
                    style={{
                        background: "rgba(185,122,87,0.05)",
                        borderRadius: "20px",
                        padding: "2.8rem 3rem",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
                        color: "#2f2f2f",
                        borderLeft: "5px solid rgba(185,122,87,0.45)", // clay accent bar
                    }}
                >
                    {/* LEADING STATEMENT */}
                    <p
                        style={{
                            fontSize: "1.32rem",
                            lineHeight: 1.65,
                            fontWeight: 600,
                            marginBottom: "1.6rem",
                            color: "#1f1f1f",
                        }}
                    >
                        Finding the right care shouldn’t be overwhelming.
                    </p>

                    {/* MAIN BODY */}
                    <p
                        style={{
                            fontSize: "1.15rem",
                            lineHeight: 1.72,
                            color: "#2f2f2f",
                            marginBottom: "2.2rem",
                            maxWidth: "60ch",
                        }}
                    >
                        Families navigate big decisions — choosing a trusted caregiver,
                        managing costs, and organising daily life. Caregivers, in turn,
                        deserve respect, fair pay, and tools that help them deliver safe,
                        attentive support.
                    </p>

                    {/* SUBHEADER */}
                    <h4
                        style={{
                            fontSize: "1.22rem",
                            fontWeight: 700,
                            marginBottom: "1.2rem",
                            color: "#2f2f2f",
                            letterSpacing: "-0.2px",
                        }}
                    >
                        Families naturally ask:
                    </h4>

                    {/* LIST */}
                    <ul
                        style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.9rem",
                        }}
                    >
                        {[
                            "Where do we start?",
                            "Does this caregiver have the right experience?",
                            "Will they be fairly paid?",
                            "Is our information secure?",
                        ].map((q) => (
                            <li
                                key={q}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: ".75rem",
                                    color: "#3f3f3f",
                                    fontSize: "1.08rem",
                                    lineHeight: 1.6,
                                }}
                            >
                                <span
                                    style={{
                                        width: "11px",
                                        height: "11px",
                                        borderRadius: "50%",
                                        background: "#B97A57",
                                        opacity: 0.9,
                                    }}
                                />
                                <span>{q}</span>
                            </li>
                        ))}
                    </ul>

                    {/* FINAL STATEMENT */}
                    <p
                        style={{
                            marginTop: "2.4rem",
                            fontSize: "1.18rem",
                            color: "#2f2f2f",
                            lineHeight: 1.72,
                            maxWidth: "60ch",
                        }}
                    >
                        <b style={{ fontWeight: 700 }}>At ICare, we’ve lived this journey.</b>{" "}
                        That’s why we built a platform centred on dignity, empathy,
                        and trust — bringing peace of mind to families and recognition
                        to caregivers.
                    </p>
                </InfoCard>




                {/* === RIGHT CARD — OUR MISSION === */}
                <InfoCard
                    title="Our mission"
                    accent="right"
                    style={{
                        background: "rgba(185,122,87,0.05)", // subtle clay tint
                        borderRadius: "20px",
                        padding: "2.8rem 3rem",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
                        color: "#2f2f2f",

                        /* ⭐ right clay accent bar – spójny z foundation */
                        borderRight: "5px solid rgba(185,122,87,0.45)",
                    }}
                >
                    {/* LEADING STATEMENT */}
                    <p
                        style={{
                            fontSize: "1.32rem",
                            lineHeight: 1.65,
                            fontWeight: 600,
                            marginBottom: "1.7rem",
                            color: "#1f1f1f",
                            maxWidth: "60ch",
                        }}
                    >
                        ICare grew from first-hand 24/7 live-in care experience across Europe.
                    </p>

                    {/* MAIN BODY */}
                    <p
                        style={{
                            fontSize: "1.16rem",
                            lineHeight: 1.72,
                            marginBottom: "1.6rem",
                            color: "#2f2f2f",
                            maxWidth: "62ch",
                        }}
                    >
                        We combine healthcare and technology expertise to create a more
                        compassionate, transparent, and secure way to match families and
                        caregivers. Our mission is to reduce stress, increase clarity, and
                        make every stage of the care journey feel more human.
                    </p>

                    {/* SUPPORTING STATEMENT */}
                    <p
                        style={{
                            fontSize: "1.16rem",
                            lineHeight: 1.72,
                            marginTop: "1.2rem",
                            color: "#2f2f2f",
                            maxWidth: "62ch",
                        }}
                    >
                        We minimise friction, prioritise privacy, and keep costs fair — so great
                        care can start sooner, with dignity and confidence for everyone involved.
                    </p>
                </InfoCard>



            </div>
        </section>



    );
}
