// components/data-display/Card.jsx
import { PillButton } from "../../ui/pill-button";
import styles from "./card.module.scss";

function SectionHeader({ title, subtitle, cta }) {
  const hasCTA = Boolean(cta);

  return (
    <header className={styles.header}>
      <div>
        <h3 className={styles.title}>{title}</h3>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      {hasCTA ? (
        <PillButton
          aria-label={cta.label}
          onClick={cta.onClick}
          className={styles.subtle}
        />
      ) : null}
    </header>
  );
}

export default function Card({ title, subtitle, cta, children }) {
  return (
    <article className={styles.card}>
      {(title || subtitle || cta) && (
        <SectionHeader title={title} subtitle={subtitle} cta={cta} />
      )}
      {children}
    </article>
  );
}
