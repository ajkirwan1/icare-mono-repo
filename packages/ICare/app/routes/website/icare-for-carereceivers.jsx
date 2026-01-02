import ICareForCareReceiversHero from "../../components/website/pages/carereceivers/ICareForCareReceiversHero";
import ReceiversThreeSteps from "../../components/website/pages/carereceivers/receivers-three-steps";
import ReceiversCompareICareVsAgency from "../../components/website/pages/carereceivers/ReceiversCompareICareVsAgency";
import MobileMockupSection from "../../components/website/pages/carereceivers/mobile-mockup-section";
import ReceiversFAQ from "../../components/website/pages/carereceivers/ReceiversFAQ";
import ReceiversFooter from "../../components/website/pages/shared/footers/ICareFooter";
import ProtectionSection from "../../components/website/pages/carereceivers/protection-section";

export default function ICareForCareReceivers() {

  return (
    <>
      <ICareForCareReceiversHero />
      <ReceiversThreeSteps />
      <MobileMockupSection />
      <ReceiversCompareICareVsAgency />
      <ProtectionSection />
      <ReceiversFAQ />
      <ReceiversFooter />
    </>
  );
}
