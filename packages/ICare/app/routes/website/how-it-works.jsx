import { Link } from "react-router";
import styles from "./how-it-works.module.scss";
import HowItWorksHero from "../../components/website/pages/how-it-works/HowItWorksHero";
import StickySubnav from "../../components/website/pages/how-it-works/StickySubnav";
import ThreeStepGuide from "../../components/website/pages/how-it-works/ThreeStepGuide";
import CompareAgencyVsICare from "../../components/website/pages/how-it-works/CompareAgencyVsICare";
import ContactCTABanner from "../../components/website/pages/how-it-works/ContactCTABanner";
import SavingsEstimatorCurrency from "../../components/website/pages/how-it-works/SavingsEstimatorCurrency";


export default function HowItWorks() {
    return (
        <div className={styles.page}>
            <HowItWorksHero />
            <StickySubnav />
            <ThreeStepGuide />
            <CompareAgencyVsICare />
            <SavingsEstimatorCurrency />
            <ContactCTABanner />
            {/* FOOTER — przeniesiony na sam dół strony */}
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
                <div className={styles.copy}>© {new Date().getFullYear()} ICare. All rights reserved.</div>
            </footer>
        </div>
    );
}
