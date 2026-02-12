import ICareNavbar from "../../components/website/pages/shared/icare-navbar";
import ICareForCaregiversHero from "../../components/website/pages/caregivers/icare-for-caregivers-hero";
import CaregiverSteps from "../../components/website/pages/caregivers/CaregiverSteps";
import WhoCanJoin from "../../components/website/pages/caregivers/WhoCanJoin";
import ICareFooter from "../../components/website/pages/shared/footers/icare-footer";
import AboutICareForCaregiversSection from "../../components/website/pages/caregivers/about-icare-for-caregivers-section";
import ICareForCaregiversIntroduction from "../../components/website/pages/caregivers/icare-for-caregivers-introduction";
import CaregiversPageCTA from "../../components/website/pages/caregivers/CaregiversPageCTA";
import ICareEarlyAccessCaregiversSection from "~/components/website/pages/caregivers/icare-early-access-caregivers";

export const meta = () => {
  return [
    { title: "iCare for Caregivers - Work Independently with Families | iCare" },
    { name: "description", content: "Join iCare as an independent caregiver. Set your own rates, choose who you work with, and connect directly with families seeking companionship care in the UK." },
    { name: "keywords", content: "independent caregiver UK, companionship care work, caregiver platform, work directly with families" },

    // Open Graph
    { property: "og:type", content: "website" },
    { property: "og:title", content: "iCare for Caregivers - Work Your Way" },
    { property: "og:description", content: "Set your own rates, choose your families, and keep more of what you earn. Join iCare for independent companionship care work." },
    { property: "og:url", content: "https://icare-app.co.uk/icare-for-caregivers" },
    { property: "og:image", content: "https://icare-app.co.uk/images/og/caregivers.jpg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "iCare for Caregivers: Work independently with families" },

    // Twitter Card
    { name: "twitter:title", content: "iCare for Caregivers" },
    { name: "twitter:description", content: "Independent care work with families. Set your rates, choose your work, keep more of what you earn." },
    { name: "twitter:image", content: "https://icare-app.co.uk/images/og/caregivers.jpg" },
    { name: "twitter:image:alt", content: "iCare for Caregivers" }
  ];
};

export const links = () => {
  return [
    { rel: "canonical", href: "https://icare-app.co.uk/icare-for-caregivers" }
  ];
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "iCare for Caregivers",
  "description": "Join iCare as an independent caregiver. Work directly with families, set your own rates, and provide meaningful companionship care.",
  "url": "https://icare-app.co.uk/icare-for-caregivers"
};

export default function ICareForCaregivers() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ICareNavbar />

      <main>
        <ICareForCaregiversHero />
        <ICareForCaregiversIntroduction />
        <AboutICareForCaregiversSection />
        <CaregiverSteps />
        <CaregiversPageCTA />
        <WhoCanJoin />
        <ICareEarlyAccessCaregiversSection />
      </main>

      <ICareFooter />
    </>
  );
}
