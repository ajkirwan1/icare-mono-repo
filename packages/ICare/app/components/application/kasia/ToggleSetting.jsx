import styles from "./kasia-dashboard.module.scss";

export default function ToggleSetting({ label, checked, onChange, ariaLabel }) {
  return (
    <div className={styles.toggleRow}>
      <span className={styles.toggleLabel}>{label}</span>
      <button
        type="button"
        className={`${styles.toggle} ${checked ? styles.toggleOn : styles.toggleOff}`}
        aria-label={ariaLabel ?? label}
        aria-pressed={checked}
        onClick={() => onChange?.(!checked)}
      />
    </div>
  );
}
