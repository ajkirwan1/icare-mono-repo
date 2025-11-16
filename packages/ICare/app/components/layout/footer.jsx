import { NavLink } from "react-router";
import styles from "../../styles/components/website/layout/footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.listReset}>
        <li>
          <NavLink to="/" className={styles.footerLink}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/landing" className={styles.footerLink}>
            Landing
          </NavLink>
        </li>
        <li>
          <NavLink to="/privacy" className={styles.footerLink}>
            Privacy
          </NavLink>
        </li>
      </ul>

      <div className={styles.copy}>
        © {new Date().getFullYear()} ICare. All rights reserved.
      </div>
    </footer>
  );
}
