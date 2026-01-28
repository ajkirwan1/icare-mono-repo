import styles from "./submit-button.module.scss";
import clsx from "clsx";

/**
 * @typedef {"primary" | "secondary" | "tertiary"} ButtonVariant
 */

/**
 * @typedef {Object} SubmitButtonProps
 * @property {React.ReactNode} children
 * @property {ButtonVariant} [variant]
 * @property {boolean} [disabled]  Whether the button is disabled
 */

/**
 * @param {SubmitButtonProps} props
 */
export default function SubmitButton({ children, disabled, variant = "primary" }) {
    return (
        <button type='submit' className={clsx(styles.button, styles[variant])} disabled={disabled}>
            {children}

        </button>
    );
}
