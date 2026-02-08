import ICareForCareReceiversHero from "../../components/website/pages/carereceivers/icare-for-care-receivers-hero";
import ReceiversCompareICareVsAgency from "../../components/website/pages/carereceivers/ReceiversCompareICareVsAgency";
import MobileMockupSection from "../../components/website/pages/carereceivers/mobile-mockup-section";
import ReceiversFAQ from "../../components/website/pages/carereceivers/ReceiversFAQ";
import ICareFooter from "../../components/website/pages/shared/footers/icare-footer";
import ProtectionSection from "../../components/website/pages/carereceivers/protection-section";
import CareThatFitsRealLifeSection from "../../components/website/pages/carereceivers/care-that-fits-real-life-section";
import ICareEarlyAccessCarereceiversSection from "~/components/website/pages/carereceivers/icare-early-access-carereceivers-section";

export default function ICareForCareReceivers() {

    return (
        <>
            <ICareForCareReceiversHero />
            <CareThatFitsRealLifeSection />
            <MobileMockupSection />
            <ReceiversCompareICareVsAgency />
            <ProtectionSection />
            <ICareEarlyAccessCarereceiversSection />
            <ReceiversFAQ />
            <ICareFooter />
        </>
    );
}
