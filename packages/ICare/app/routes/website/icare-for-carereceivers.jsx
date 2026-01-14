import ICareForCareReceiversHero from "../../components/website/pages/carereceivers/icare-for-care-receivers-hero";
import ReceiversThreeSteps from "../../components/website/pages/carereceivers/receivers-three-steps";
import ReceiversCompareICareVsAgency from "../../components/website/pages/carereceivers/ReceiversCompareICareVsAgency";
import MobileMockupSection from "../../components/website/pages/carereceivers/mobile-mockup-section";
import ReceiversFAQ from "../../components/website/pages/carereceivers/ReceiversFAQ";
import ICareFooter from "../../components/website/pages/shared/footers/icare-footer";
import ProtectionSection from "../../components/website/pages/carereceivers/protection-section";
import AboutICareSection from "../../components/website/pages/home/sections/about-icare-section";

export default function ICareForCareReceivers() {

  return (
    <>
      <ICareForCareReceiversHero />
      <AboutICareSection />
      <ReceiversThreeSteps />
      <MobileMockupSection />
      <ReceiversCompareICareVsAgency />
      <ProtectionSection />
      <ReceiversFAQ />

      <ICareFooter />
    </>
  );
}
