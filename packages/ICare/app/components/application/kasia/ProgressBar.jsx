import styles from "./kasia-dashboard.module.scss";

export default function ProgressBar({ value = 0, max = 100, showLabel = true }) {
  const safe = Math.max(0, Math.min(value, max));
  const percent = Math.round((safe / max) * 100);

  return (
    <>
      <div className={styles.progressTrack} role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={safe}>
        <span className={styles.progressFill} style={{ width: `${percent}%` }} />
      </div>
      {showLabel ? <p className={styles.progressLabel}>{percent}%</p> : null}
    </>
  );
}
