import React from "react";
import styles from "../../../../../styles/components/website/pages/who-we-are/sections/third-section.module.scss";

export function ThirdSection() {
  return (
    <section id="howwework" aria-label="How We Work" className={styles.section}>
      <h2 className={styles.heading}>How We Work</h2>

      <p className={styles.subheading}>
        A clear, privacy-first process that connects families and caregivers directly.
      </p>

      <div aria-hidden="true" className={styles.divider} />

      <div className={styles.grid}>
        {/* === CARD 1 === */}
        <article className={`${styles.card} ${styles.cardGreen}`}>
          <div className={styles.cardTop}>
            <div className={styles.stepBadgeGreen}>1</div>
            <h3 className={styles.cardTitle}>Brief & preferences</h3>
          </div>
          <p className={styles.cardText}>
            Tell us your needs, schedule and preferred skills. We minimise data — only what’s necessary.
          </p>
        </article>

        {/* === CARD 2 === */}
        <article className={`${styles.card} ${styles.cardBlue}`}>
          <div className={styles.cardTop}>
            <div className={styles.stepBadgeBlue}>2</div>
            <h3 className={styles.cardTitle}>Direct matching</h3>
          </div>
          <p className={styles.cardText}>
            We show verified profiles that fit your brief — you speak directly with candidates.
          </p>
        </article>

        {/* === CARD 3 === */}
        <article className={`${styles.card} ${styles.cardOrange}`}>
          <div className={styles.cardTop}>
            <div className={styles.stepBadgeOrange}>3</div>
            <h3 className={styles.cardTitle}>Agree & start</h3>
          </div>
          <p className={styles.cardText}>
            You agree terms directly with the caregiver. We provide guidance and safer-practice templates.
          </p>
        </article>
      </div>

      <div className={styles.ctaWrap}>
        <a href="/how-it-works" className={styles.ctaButton}>
          Explore full process
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M13 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
