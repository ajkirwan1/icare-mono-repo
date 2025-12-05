import styles from "./how-it-works.module.scss";
import HowItWorksHero from "../../components/website/pages/how-it-works/HowItWorksHero";
import StickySubnav from "../../components/website/pages/how-it-works/StickySubnav";
import ThreeStepGuide from "../../components/website/pages/how-it-works/ThreeStepGuide";
import CompareAgencyVsICare from "../../components/website/pages/how-it-works/CompareAgencyVsICare";
import ContactCTABanner from "../../components/website/pages/how-it-works/ContactCTABanner";
import SavingsEstimatorCurrency from "../../components/website/pages/how-it-works/SavingsEstimatorCurrency";
import HowItWorksFooter from "../../components/website/pages/shared/footers/HowItWorksFooter";


export default function HowItWorks() {
    return (
        <div className={styles.page}>
            <HowItWorksHero />
            <StickySubnav />
            <ThreeStepGuide />
            <CompareAgencyVsICare />
            <SavingsEstimatorCurrency />
            <ContactCTABanner />
            <HowItWorksFooter />
        </div>
    );
}
