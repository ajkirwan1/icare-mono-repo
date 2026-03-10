import styles from "./kasia-dashboard.module.scss";

export default function DashboardShell({
  title,
  subtitle,
  topBanner,
  main,
  aside,
  children,
  fullWidth = false,
  className = ""
}) {
  const hasAside = aside !== null && aside !== undefined;
  const content = children ?? (
    hasAside ? (
      <div className={styles.layout}>
        <div className={styles.mainColumn}>{main}</div>
        <aside className={styles.asideColumn}>{aside}</aside>
      </div>
    ) : (
      <div className={styles.mainColumn}>{main}</div>
    )
  );

  return (
    <div className={`${styles.shell} ${fullWidth ? styles.shellFull : ""} ${className}`.trim()}>
      {(title || subtitle) && (
        <header className={styles.header}>
          {title ? <h1 className={styles.title}>{title}</h1> : null}
          {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
        </header>
      )}
      {topBanner}
      {content}
    </div>
  );
}
