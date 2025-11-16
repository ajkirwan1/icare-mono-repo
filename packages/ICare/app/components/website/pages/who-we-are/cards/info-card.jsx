import React from "react";
import clsx from "clsx";
import styles from "@styles/components/website/pages/info-card.module.scss";

export function InfoCard({
  title,
  accent = "left",
  variant = "green",
  children
}) {
  return (
    <article className={clsx(styles.card, styles[variant])}>
      <span
        aria-hidden="true"
        className={clsx(styles.accentBlob, styles[`accent-${accent}`])}
      />
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.underline} aria-hidden="true" />
      <div className={styles.content}>{children}</div>
    </article>
  );
}
