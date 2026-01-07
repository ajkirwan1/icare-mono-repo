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
                "See who you’re speaking with, what support is offered, and what it costs — without hidden agency markups. A calmer way to decide, with expectations agreed upfront.",
            img: "/images/web/homepage/trust.jpg",
        },
        {
            k: "Care",
            descShort: "Human support, not bureaucracy.",
            descFull:
                "Care is a relationship. We prioritise dignity, consistency and real presence — from companionship visits to live-in continuity, matched to your needs.",
            img: "/images/web/homepage/care.jpg",
        },
        {
            k: "Community",
            descShort: "Support that scales locally.",
            descFull:
                "Families and caregivers benefit from shared clarity and better matching over time. Early access helps us prioritise the right towns first — starting with your area.",
            img: "/images/web/homepage/community.jpg",
        },
    ];

    const [hoverIndex, setHoverIndex] = React.useState(null);
    const ease = "cubic-bezier(0.18, 0.95, 0.18, 1)";


    const sectionStyles = {
        background: "rgba(228, 233, 216, 1)",
        margin: "0",
        padding: "4rem 0"
    }

    const ctaStyles = {
        fontSize: "1.2rem",
        margin: "0.5rem 0 2rem",
        borderBottom: "1px solid"
    }

    return (
        <section aria-label="Trust care and community intro + values" className={styles.section} style={sectionStyles}>
            <div className={`${styles.fullBleed} ${styles.header}`}>
                <h2 className={styles.title}>Trust, care &amp; community</h2>

                <p className={styles.subtitle}>
                    <strong>Built for families who want a calmer way to choose home care — with clarity, dignity and control.</strong>
                </p>

                {/* ✅ simplified, more “sales” */}
                <p className={styles.subinfo}>
                    ICare is a transparent marketplace — not a traditional care agency.
                    <br />
                    Families connect directly with independent caregivers, agree support and costs clearly, and stay in control.
                </p>

                {/* ✅ single clean line (instead of multiple blocks) */}
                <p className={styles.subsubtitle}>
                    <span>Clear expectations.</span> <span>Human care.</span> <span>Flexible support — with visibility from the start.</span>
                </p>

                {/* ✅ gentle CTA (text link) */}
                <div className={styles.ctaRow}>
                    <a href="#waitlist" className={styles.ctaLink} style={ctaStyles}>
                        Join the waiting list to get early access →
                    </a>
                </div>
            </div>


            <div className={styles.fullBleed}>
                <div className={styles.grid}>
                    {cards.map((item, idx) => {
                        const isOpen = hoverIndex === idx;

                        return (
                            <div
                                key={item.k}
                                className={`${styles.card} ${isOpen ? styles.isOpen : ""}`}
                                onMouseEnter={() => setHoverIndex(idx)}
                                onMouseLeave={() => setHoverIndex(null)}
                            >
                                <img src={item.img} alt={item.k} className={styles.image} />
                                <div className={styles.gradient} />

                                <div className={styles.cardContent}>
                                    <strong className={styles.cardTitle}>{item.k}</strong>
                                    <p className={styles.cardShort}>{item.descShort}</p>

                                    <span className={styles.learnMore}>Learn more</span>

                                    <div className={styles.expandWrapper}>
                                        <div className={styles.expandInner}>
                                            <p className={styles.expandText}>{item.descFull}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>



        </section >
    );
}
