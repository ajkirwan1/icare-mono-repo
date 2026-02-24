import styles from "./kasia-dashboard.module.scss";

export default function QuickActions({ actions = [] }) {
  return (
    <div className={styles.quickActions}>
      {actions.map((action) => (
        <button
          className={styles.quickAction}
          key={action.id ?? action.label}
          onClick={() => action.onClick?.()}
          type="button"
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}
