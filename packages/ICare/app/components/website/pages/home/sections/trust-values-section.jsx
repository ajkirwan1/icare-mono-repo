import React from "react";
import styles from "./trust-values-section.module.scss";

export default function TrustValuesSection() {
  const cards = [
    {
      k: "Trust",
      descShort: "Transparent terms and predictable care.",
      descFull: `Families always know what to expect — full transparency, no hidden margins and clear agreements.
You see who you are talking to, what the terms are, and how your caregiver works.
Trust isn’t built through marketing — it’s built through honest relationships between families and caregivers.`,
      img: "/images/web/homepage/trust.jpg"
    },
    {
      k: "Care",
      descShort: "Warm, human support.",
      descFull: `Care is not just a service — it’s a relationship. Our caregivers focus on dignity, comfort and emotional connection.
From companionship visits to full live-in continuity, families receive genuine human support with real presence.
We focus on people first – not processes, margins or bureaucracy.`,
      img: "/images/web/homepage/care.jpg"
    },
    {
      k: "Community",
      descShort: "Supportive families & caregivers.",
      descFull: `Knowledge shared between families helps everyone make better decisions and feel supported.
Our growing community connects people with similar needs, experiences and challenges — so nobody navigates care alone.
Stronger together. That’s what care should always feel like.`,
      img: "/images/web/homepage/community.jpg"
    }
  ];

  const [hoverIndex, setHoverIndex] = React.useState(null);
  const ease = "cubic-bezier(0.18, 0.95, 0.18, 1)";

  return (
    <section
      aria-label="Trust care and community intro + values"
      className={styles.section}
    >
      <div className={`${styles.fullBleed} ${styles.header}`}>
        <h2 className={styles.title}>Trust, care & community</h2>

        <p className={styles.subtitle}>
          Three values that define everything we do — safe, human and connected.
        </p>

        {/* ✅ More informative text (no box, no ticks) */}
        <p className={styles.subinfo}>
          ICare is a transparent marketplace — not a traditional care agency. <br />Families connect directly
          with independent caregivers, agree the support they need, and keep full visibility over who
          they’re working with and what it costs.
        </p>

        <p className={styles.subsubtitle}>What this means in practice:</p>

        <div className={styles.sublines}>
          <p className={styles.subline}>
            <strong>Clear expectations:</strong> routines, tasks and boundaries agreed upfront.
          </p>
          <p className={styles.subline}>
            <strong>Human first care:</strong> dignity, companionship and consistency at home.
          </p>
          <p className={styles.subline}>
            <strong>Care that adapts:</strong> from short visits to overnight or live-in support.
          </p>
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
                <img src={item.img} alt={item.k} className={styles.image} />

                <div className={styles.gradient} />

                <div className={styles.cardContent}>
                  <strong className={styles.cardTitle}>{item.k}</strong>

                  <p className={styles.cardShort}>{item.descShort}</p>

                  {!isOpen && <span className={styles.learnMore}>Learn more</span>}

                  <div
                    className={`${styles.expandWrapper} ${isOpen ? styles.expandWrapperOpen : ""
                      }`}
                    style={{ transitionTimingFunction: ease }}
                  >
                    <div
                      className={`${styles.expandInner} ${isOpen ? styles.expandInnerOpen : ""
                        }`}
                      style={{
                        transitionTimingFunction: ease,
                        transitionDelay: isOpen ? "260ms" : "0ms"
                      }}
                    >
                      <p className={styles.expandText}>{item.descFull}</p>
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
