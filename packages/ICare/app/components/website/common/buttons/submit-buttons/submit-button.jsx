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
 * @property {() => void} [onClick]
 * @property {"submit" | "button"} [type]
 */

export default function SubmitButton({
  children,
  disabled,
  onClick,
  type = "submit",
  variant = "primary"
}) {
  return (
    <button
      type={type}
      className={clsx(styles.button, styles[variant])}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
