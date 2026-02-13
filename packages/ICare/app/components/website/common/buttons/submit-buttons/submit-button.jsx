import styles from "./submit-button.module.scss";
import clsx from "clsx";

/**
 * @typedef {"primary" | "secondary" | "tertiary"} ButtonVariant
 */

/**
 * @typedef {Object} SubmitButtonProps
 * @property {React.ReactNode} children
 * @property {ButtonVariant} [variant]
 * @property {boolean} [disabled]
 * @property {boolean} [loading]
 * @property {string} [loadingText]
 * @property {() => void} [onClick]
 * @property {"submit" | "button"} [type]
 */

export default function SubmitButton({
  children,
  disabled,
  loading,
  loadingText = "Submitting\u2026",
  onClick,
  type = "submit",
  variant = "primary"
}) {
  return (
    <button
      type={type}
      className={clsx(styles.button, styles[variant])}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? (
        <span className={styles.spinnerWrap}>
          <span className={styles.spinner} aria-hidden="true" />
          {loadingText}
        </span>
      ) : children}
    </button>
  );
}
