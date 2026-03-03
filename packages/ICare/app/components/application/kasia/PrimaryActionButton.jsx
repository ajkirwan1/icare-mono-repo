import styles from "./kasia-dashboard.module.scss";

export default function PrimaryActionButton({ label, onClick, type = "button", className = "", disabled = false }) {
    return (
        <button className={`${styles.primaryButton} ${className}`.trim()} disabled={disabled} onClick={onClick} type={type}>
            {label}
        </button>
    );
}
