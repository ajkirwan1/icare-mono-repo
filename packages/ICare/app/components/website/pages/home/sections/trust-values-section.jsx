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
            alt: "Caregiver and elderly person reviewing a clear profile together",
        },
        {
            k: "Care",
            descShort: "Human support, not bureaucracy.",
            descFull:
                "Care is a relationship. We prioritise dignity, consistency and real presence  - from companionship visits to live-in continuity, matched to your needs.",
            img: "/images/web/homepage/care.jpg",
            alt: "Caregiver providing compassionate support at home",
        },
        {
            k: "Community",
            descShort: "Support that scales locally.",
            descFull:
                "Families and caregivers benefit from shared clarity and better matching over time. Early access helps us prioritise the right towns first - starting with your area.",
            img: "/images/web/homepage/community.jpg",
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
                    ICare was created in response to what many families find overwhelming about traditional care agencies: pressure to decide quickly, unclear costs and limited visibility of who is providing care.
                </p>

                <p className={styles.subinfo}>
                    We are a transparent marketplace not a care agency.<br />
                    Families connect directly with independent caregivers, talk openly, agree companionship, everyday support and costs upfront, and stay in control of the care relationship at every stage.
                    <br /><br />
                    ICare supports the process with structure, tools and&nbsp;guidance - but the care arrangement is always between the family and the caregiver.
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
                                <img src={item.img} alt={item.alt} className={styles.image} />

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
