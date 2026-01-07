import ICareForCaregiversHero from "../../components/website/pages/caregivers/icare-for-caregivers-hero";
import CaregiverSteps from "../../components/website/pages/caregivers/CaregiverSteps";
import WhoCanJoin from "../../components/website/pages/caregivers/WhoCanJoin";
import CaregiverFAQ from "../../components/website/pages/caregivers/CaregiverFAQ";
import ContactCTA from "../../components/website/pages/caregivers/ContactCTA";
import ICareFooter from "../../components/website/pages/shared/footers/ICareFooter";
import AboutICareSection from "../../components/website/pages/home/sections/about-icare-section";

export default function ICareForCaregivers() {

  return (
    <>
      <ICareForCaregiversHero />
      <AboutICareSection />
      <CaregiverSteps />
      <WhoCanJoin />
      <CaregiverFAQ />
      <ContactCTA />
      <ICareFooter />
    </>
  );
}
