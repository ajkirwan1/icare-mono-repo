import styles from "./kasia-dashboard.module.scss";

export default function PrimaryActionButton({ label, onClick, type = "button" }) {
  return (
    <button className={styles.primaryButton} onClick={onClick} type={type}>
      {label}
    </button>
  );
}
