import styles from "./kasia-dashboard.module.scss";

export default function VerificationChips({ items = [] }) {
  return (
    <div className={styles.chips}>
      {items.map((item) => (
        <span className={styles.chip} key={item.id ?? item.label}>{item.label}</span>
      ))}
    </div>
  );
}
