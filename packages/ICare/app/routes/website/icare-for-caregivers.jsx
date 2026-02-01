import ICareForCaregiversHero from "../../components/website/pages/caregivers/icare-for-caregivers-hero";
import CaregiverSteps from "../../components/website/pages/caregivers/CaregiverSteps";
import WhoCanJoin from "../../components/website/pages/caregivers/WhoCanJoin";
import CaregiverFAQ from "../../components/website/pages/caregivers/CaregiverFAQ";
import ICareFooter from "../../components/website/pages/shared/footers/icare-footer";
import AboutICareForCaregiversSection from "../../components/website/pages/caregivers/about-icare-for-caregivers-section";
import ICareForCaregiversIntroduction from "../../components/website/pages/caregivers/icare-for-caregivers-introduction";
import CaregiversPageCTA from "../../components/website/pages/caregivers/CaregiversPageCTA";
import ICareEarlyAccessCaregiversSection from "~/components/website/pages/caregivers/icare-early-access-caregivers";

export default function ICareForCaregivers() {

    return (
        <>
            <ICareForCaregiversHero />
            <ICareForCaregiversIntroduction />
            <AboutICareForCaregiversSection />
            <CaregiverSteps />
            <CaregiversPageCTA />
            <WhoCanJoin />
            <ICareEarlyAccessCaregiversSection />
            <CaregiverFAQ />
            <ICareFooter />
        </>
    );
}
