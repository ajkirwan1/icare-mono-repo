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
            k: "Local",
            descShort: "A trusted network being built locally.",
            descFull:
                "ICare is starting in Cheltenham and the Cotswolds and building local availability steadily. Depending on the area and the kind of support needed, some caregivers may be nearby while others may come from further afield.",
            img: "/images/web/homepage/icare-trust.webp",
            imgMobile: "/images/web/homepage/icare-trust-1000.webp",
            alt: "Caregiver and elderly person reviewing a clear profile together",
        },
        {
            k: "Flexible",
            descShort: "No contracts and no fixed agency structure.",
            descFull:
                "Some people need a few hours each week. Others need more regular help. Families and caregivers can agree what works for them directly, without being pushed into a set arrangement.",
            img: "/images/web/homepage/secondpic-1400.webp",
            imgMobile: "/images/web/homepage/secondpic-1000.webp",
            alt: "Caregiver providing compassionate support at home",
        },
        {
            k: "Direct",
            descShort: "Straightforward conversations from the start.",
            descFull:
                "You can message caregivers directly, ask about routines, and agree details together. That often feels calmer and more natural than speaking through a middle layer.",
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
                <h2 className={styles.title}>Why families choose ICare</h2>

                <p className={styles.subtitle}>
                    Local-first, honest, and personal.
                </p>

                <p className={styles.subinfo}>
                    ICare is not a care agency. We introduce families to independent caregivers and help them find available support in their area.
                    <br /><br />
                    We are building a trusted network locally in the Cotswolds, starting in and around Cheltenham, while availability continues to grow.
                    <br /><br />
                    That means being clear about where support is available now, while steadily growing stronger local coverage over time.
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

                                    {!isOpen && <span className={styles.learnMore} aria-hidden="true">Read more</span>}

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
