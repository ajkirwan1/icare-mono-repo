import { NavLink } from "react-router";
import styles from "./navigation-button.module.scss";

/**
 * @typedef {"default" | "primary" | "secondary" | "tertiary" | "outline"} ButtonVariant
 */

/**
 * @typedef {Object} NavigationButtonProps
 * @property {React.ReactNode} children
 * @property {string} [to]
 * @property {ButtonVariant} [variant]
 * @property {(e: React.MouseEvent) => void} [onClick]
 */

/**
 * @param {NavigationButtonProps} props
 */
export default function NavigationButton({ children, to, variant = "default", onClick }) {
    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) =>
                `${styles.link} ${styles[variant]} ${isActive ? styles.active : ""}`
            }
        >
            {children}
        </NavLink>
    );
}
