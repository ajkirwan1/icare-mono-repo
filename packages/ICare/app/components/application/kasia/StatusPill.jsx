import styles from "./kasia-dashboard.module.scss";

export default function StatusPill({ label, variant = "pending" }) {
  const variantClass =
    variant === "confirmed"
      ? styles.pillConfirmed
      : variant === "info"
        ? styles.pillInfo
        : styles.pillPending;

  return <span className={`${styles.pill} ${variantClass}`}>{label}</span>;
}
