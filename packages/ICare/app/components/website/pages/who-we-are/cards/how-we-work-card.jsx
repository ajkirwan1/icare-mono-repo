import React from "react";
import styles from "@styles/components/website/pages/who-we-are/sections/third-section.module.scss";

export function HowWeWorkCard({ step, title, description, variant }) {
  const cardClass =
    variant === "green"
      ? styles.cardGreen
      : variant === "blue"
        ? styles.cardBlue
        : styles.cardOrange;

  const badgeClass =
    variant === "green"
      ? styles.stepBadgeGreen
      : variant === "blue"
        ? styles.stepBadgeBlue
        : styles.stepBadgeOrange;

  return (
    <article className={`${styles.card} ${cardClass}`}>
      <div className={styles.cardTop}>
        <div className={badgeClass}>{step}</div>
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
      <p className={styles.cardText}>{description}</p>
    </article>
  );
}
