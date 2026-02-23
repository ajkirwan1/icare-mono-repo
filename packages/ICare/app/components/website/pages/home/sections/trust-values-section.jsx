import React from "react";
import styles from "./trust-values-section.module.scss";

/**
 * TrustValuesSection (Home)
 * ✅ calmer, less text, more “sales”
 * ✅ keeps existing images
 * ✅ adds a gentle CTA to #waitlist
 * ✅ shorter hover content (less chaos)
 */

export default function TrustValuesSection() {
    const cards = [
        {
            k: "Trust",
            descShort: "Clear profiles, clear agreements.",
            descFull:
                "See who you’re speaking with, what support is offered, and what it costs - without hidden agency markups. A calmer way to decide, with expectations agreed upfront.",
            img: "/images/web/homepage/icare-trust.webp",
            imgMobile: "/images/web/homepage/icare-trust-1000.webp",
            alt: "Caregiver and elderly person reviewing a clear profile together",
        },
        {
            k: "Care",
            descShort: "Human support, not bureaucracy.",
            descFull:
                "Care is a relationship. We prioritise dignity, consistency and real presence  - from companionship visits to live-in continuity, matched to your needs.",
            img: "/images/web/homepage/secondpic-1400.webp",
            imgMobile: "/images/web/homepage/secondpic-1000.webp",
            alt: "Caregiver providing compassionate support at home",
        },
        {
            k: "Community",
            descShort: "Support that scales locally.",
            descFull:
                "Families and caregivers benefit from shared clarity and better matching over time. Early access helps us prioritise the right towns first - starting with your area.",
            img: "/images/web/homepage/community-1400.webp",
            imgMobile: "/images/web/homepage/community-1000.webp",
            alt: "Families and caregivers connecting in a local community",
        },
    ];

    const [hoverIndex, setHoverIndex] = React.useState(null);
    const ease = "cubic-bezier(0.18, 0.95, 0.18, 1)";

    return (
        <section aria-label="Trust care and community intro + values" className={styles.section}>
            <div className={`${styles.headerSection} ${styles.header}`}>
                <h2 className={styles.title}>Trust, care &amp; community</h2>

                <p className={styles.subtitle}>
                    ICare was created to offer a calmer alternative for families who need support -
                </p>

                <p className={styles.subinfo}>
                    We saw how overwhelming care decisions can feel, especially when there&apos;s pressure to decide quickly or a lack of clarity around who is involved.
                    <br /><br />
                    ICare exists to bring people together, create space for conversation, and help families and caregivers find support that feels right for them.
                    <br /><br />
                    We offer structure, tools and guidance along the way - while the care relationship itself always remains between the family and the caregiver.
                </p>
            </div>

            <div className={styles.fullBleed}>
                <div className={styles.grid}>
                    {cards.map((item, idx) => {
                        const isOpen = hoverIndex === idx;

                        return (
                            <div
                                key={item.k}
                                className={styles.card}
                                onMouseEnter={() => setHoverIndex(idx)}
                                onMouseLeave={() => setHoverIndex(null)}
                            >
                                {/* ✅ keep existing images */}
                                {item.imgMobile ? (
                                    <picture>
                                        <source media="(max-width: 600px)" srcSet={item.imgMobile} />
                                        <img
                                            src={item.img}
                                            alt={item.alt}
                                            className={styles.image}
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </picture>
                                ) : (
                                    <img
                                        src={item.img}
                                        alt={item.alt}
                                        className={styles.image}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                )}

                                <div className={styles.gradient} />

                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>{item.k}</h3>

                                    <p className={styles.cardShort}>{item.descShort}</p>

                                    {!isOpen && <span className={styles.learnMore} aria-hidden="true">Learn more</span>}

                                    <div
                                        className={`${styles.expandWrapper} ${isOpen ? styles.expandWrapperOpen : ""}`}
                                        style={{ transitionTimingFunction: ease }}
                                    >
                                        <div
                                            className={`${styles.expandInner} ${isOpen ? styles.expandInnerOpen : ""}`}
                                            style={{
                                                transitionTimingFunction: ease,
                                                transitionDelay: isOpen ? "200ms" : "0ms",
                                            }}
                                        >
                                            <p className={styles.expandText}>{item.descFull}</p>

                                            {/* ✅ small inline CTA inside expanded state */}
                                            {/*
                                            <a href="#waitlist" className={styles.inlineCta}>
                                                Get early access in your area →
                                            </a>
                                            */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
