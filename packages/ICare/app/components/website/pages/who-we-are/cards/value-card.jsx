import React from "react";
import styles from "@styles/components/website/pages/who-we-are/cards/values-card.module.scss";

export function ValuesCard({ icon, title, description, bg }) {
  return (
    <article className={styles.card} style={{ background: bg }}>
      <div className={styles.iconBox}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </article>
  );
}
