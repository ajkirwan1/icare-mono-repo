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

  return (
    <section aria-label="Trust care and community intro + values" className={styles.section}>
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
          Clear expectations. Human care. Flexible support — with visibility from the start.
        </p>

        {/* ✅ gentle CTA (text link) */}
        <div className={styles.ctaRow}>
          <a href="#waitlist" className={styles.ctaLink}>
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
                className={styles.card}
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                {/* ✅ keep existing images */}
                <img src={item.img} alt={item.k} className={styles.image} />

                <div className={styles.gradient} />

                <div className={styles.cardContent}>
                  <strong className={styles.cardTitle}>{item.k}</strong>

                  <p className={styles.cardShort}>{item.descShort}</p>

                  {!isOpen && <span className={styles.learnMore}>Learn more</span>}

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
                      <a href="#waitlist" className={styles.inlineCta}>
                        Get early access in your area →
                      </a>
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
