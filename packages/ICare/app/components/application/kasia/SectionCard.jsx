import { NavLink } from "react-router";
import styles from "./kasia-dashboard.module.scss";

export default function SectionCard({ title, actionLabel, actionTo, compact = false, children }) {
  return (
    <section className={`${styles.card} ${compact ? styles.cardCompact : ""}`.trim()}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>{title}</h2>
        {actionLabel && actionTo ? (
          <NavLink className={styles.cardAction} to={actionTo}>
            {actionLabel}
          </NavLink>
        ) : null}
      </div>
      {children}
    </section>
  );
}
