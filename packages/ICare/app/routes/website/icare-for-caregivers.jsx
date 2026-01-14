import ICareForCaregiversHero from "../../components/website/pages/caregivers/icare-for-caregivers-hero";
import CaregiverSteps from "../../components/website/pages/caregivers/CaregiverSteps";
import WhoCanJoin from "../../components/website/pages/caregivers/WhoCanJoin";
import CaregiverFAQ from "../../components/website/pages/caregivers/CaregiverFAQ";
// import ContactCTA from "../../components/website/pages/caregivers/ContactCTA";
import ICareFooter from "../../components/website/pages/shared/footers/icare-footer";
// import AboutICareSection from "../../components/website/pages/home/sections/about-icare-section";
import AboutICareForCaregiversSection from "../../components/website/pages/caregivers/about-icare-for-caregivers-section";
import CaregiversPageCTA from "../../components/website/pages/caregivers/CaregiversPageCTA";

export default function ICareForCaregivers() {

  return (
    <>
      <ICareForCaregiversHero />
      <AboutICareForCaregiversSection />
      <CaregiverSteps />
      <CaregiversPageCTA />
      <WhoCanJoin />
      <CaregiverFAQ />
      <ICareFooter />
    </>
  );
}
