import { Link } from "react-router";
import styles from "./how-it-works-footer.module.scss"; // optional if you want separate styling

export default function HowItWorksFooter() {
    return (
        <footer className={styles.footer}>
            <ul className={styles.listReset}>
                <li>
                    <Link to="/" className={styles.footerLink}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/landing" className={styles.footerLink}>
                        Landing
                    </Link>
                </li>
                <li>
                    <Link to="/privacy" className={styles.footerLink}>
                        Privacy
                    </Link>
                </li>
            </ul>

            <div className={styles.copy}>
                © {new Date().getFullYear()} ICare. All rights reserved.
            </div>
        </footer>
    );
}
