import React from "react";
import styles from "./safety-block.module.scss";

export default function SafetyComesFirstThreeBoxes() {
    const boxes = [
        {
            title: "Before profiles go live",
            desc: (
                <>
                    To join ICare, caregivers must provide{" "}
                    <strong className={styles.strong}>photo ID</strong> and proof of{" "}
                    <strong className={styles.strong}>right to work in the UK</strong>.
                </>
            ),
            image: "/images/web/homepage/verified-caregiver-profiles.webp",
            alt: "Identity verification documents",
        },
        {
            title: "Required checks",
            desc: (
                <>
                    Caregivers must also provide a{" "}
                    <strong className={styles.strong}>DBS check</strong> and{" "}
                    <strong className={styles.strong}>public liability insurance</strong>{" "}
                    to join ICare.
                </>
            ),
            image: "/images/web/homepage/safety-comes-first.webp",
            alt: "Caregiver helping at home",
        },
        {
            title: "Reviewed before joining",
            desc: (
                <>
                    We review this information before profiles go live, so families can see clear, reassuring details when choosing who to contact.
                </>
            ),
            image: "/images/web/homepage/DBS-and-insurance.webp",
            alt: "Safety checks and protection",
        },
    ];

    return (
        <section aria-label="Safety comes first" className={styles.section}>
            <div className={styles.dividerTop} />
            <div className={styles.dividerBottom} />

            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.h1}>Trust &amp; Safety</h2>
                    <h3 className={styles.h2}>Clear entry requirements for caregivers</h3>

                    <p className={styles.lead}>
                        ICare is a matching platform, not a care agency.
                        <br />
                        To join ICare, caregivers must provide ID, right to work in the UK, a DBS check, and public liability insurance. We review this information before profiles go live.
                    </p>
                </div>

                <div className={styles.grid}>
                    {boxes.map((b) => (
                        <div key={b.title} className={styles.card}>
                            {/* IMAGE FIRST */}
                            <div className={styles.thumbWrap}>
                                <img
                                    src={b.image}
                                    alt={b.alt}
                                    className={styles.thumb}
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                />
                            </div>

                            {/* TEXT */}
                            <div className={styles.cardText}>
                                <h3 className={styles.title}>{b.title}</h3>
                                <p className={styles.desc}>{b.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
