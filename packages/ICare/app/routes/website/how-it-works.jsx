import HowItWorksHero from "../../components/website/pages/how-it-works/how-it-works-hero";
import ThreeStepGuide from "../../components/website/pages/how-it-works/ThreeStepGuide";
import CompareAgencyVsICare from "../../components/website/pages/how-it-works/CompareAgencyVsICare";
import ContactCTABanner from "../../components/website/pages/how-it-works/ContactCTABanner";
import SavingsEstimatorCurrency from "../../components/website/pages/how-it-works/SavingsEstimatorCurrency";
import HowItWorksFooter from "../../components/website/pages/shared/footers/HowItWorksFooter";


export default function HowItWorks() {
  return (
    <>
      <HowItWorksHero />
      <ThreeStepGuide />
      <CompareAgencyVsICare />
      <SavingsEstimatorCurrency />
      <ContactCTABanner />
      <HowItWorksFooter />
    </>
  );
}
