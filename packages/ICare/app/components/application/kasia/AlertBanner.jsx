import styles from "./kasia-dashboard.module.scss";

export default function AlertBanner({ title, message, variant = "warning", icon = "!", className = "" }) {
  const variantClass =
    variant === "success" ? styles.alertSuccess : variant === "info" ? styles.alertInfo : "";

  return (
    <section className={`${styles.alert} ${variantClass} ${className}`.trim()}>
      <span className={styles.alertIcon}>{icon}</span>
      <div>
        <p className={styles.alertTitle}>{title}</p>
        {message ? <p className={styles.alertText}>{message}</p> : null}
      </div>
    </section>
  );
}
