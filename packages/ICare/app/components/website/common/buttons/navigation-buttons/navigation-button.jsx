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
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14" />
        <path d="M13 5l7 7-7 7" />
      </svg>
    </NavLink>
  );
}
