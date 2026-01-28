import { NavLink } from "react-router";
import styles from "./navigation-button.module.scss";


/**
 * @typedef {Object} NavigationButtonProps
 * @property {React.ReactNode} children
 * @property {string} [to]
 */

/**
 * @param {NavigationButtonProps} props
 */
export default function NavigationButton({ children, to }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
            }
        >
            {children}

        </NavLink>
    );
}
