import React from "react";
import styles from "./safety-block.module.scss";

export default function SafetyComesFirstThreeBoxes() {
    const boxes = [
        {
            title: "Identity & eligibility",
            desc: (
                <>
                    <strong className={styles.strong}>Photo ID</strong> and{" "}
                    <strong className={styles.strong}>Right to Work</strong> are required before a
                    profile becomes visible.
                </>
            ),
            image: "/images/web/homepage/verified-caregiver-profiles.webp",
            alt: "Identity verification documents",
        },
        {
            title: "Relevant experience",
            desc: (
                <>
                    Carers with <strong className={styles.strong}>references</strong> and
                    appropriate <strong className={styles.strong}>experience</strong>, with
                    references shown where available.
                </>
            ),
            image: "/images/web/homepage/safety-comes-first.webp",
            alt: "Caregiver helping at home",
        },
        {
            title: "Checks shown where applicable",
            desc: (
                <>
                    <strong className={styles.strong}>DBS</strong> and{" "}
                    <strong className={styles.strong}>insurance</strong> are displayed when
                    provided and relevant — depending on location and the nature of support.
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
                    <h2 className={styles.h1}>Safety comes first</h2>
                    <h3 className={styles.h2}>A safer way to start companionship at home</h3>

                    <p className={styles.lead}>
                        Trust in home care depends on clear standards, not assumptions.
                        <br />
                        ICare uses defined verification steps covering identity, right to work and
                        relevant background information.
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
