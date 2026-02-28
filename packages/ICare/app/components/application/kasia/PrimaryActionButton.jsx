import styles from "./kasia-dashboard.module.scss";

export default function PrimaryActionButton({ label, onClick, type = "button", className = "" }) {
  return (
    <button className={`${styles.primaryButton} ${className}`.trim()} onClick={onClick} type={type}>
      {label}
    </button>
  );
}
