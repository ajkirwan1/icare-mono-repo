import heroImage from "/images/heros/icare-companionship.webp";
import CareTimeline from "../components/website/pages/home/CareTimeline";
import HomePageCareCTA from "../components/website/pages/home/HomePageCareCTA";
import HomePageHero from "../components/website/pages/shared/home-page-hero";
import TrustValuesSection from "../components/website/pages/home/sections/trust-values-section";
import IcareSafetyBlock from "../components/website/pages/home/sections/IcareSafetyBlock";
import ICareFooter from "../components/website/pages/shared/footers/icare-footer";
import ICareCostEstimator from "../components/website/pages/home/sections/ICareCostEstimator";
import ICareTypesOfCareSEO from "../components/website/pages/home/sections/ICareTypesOfCareSEO";
import HeroCaregiversTicker from "../components/website/pages/home/sections/HeroCaregiversTicker";
import AboutICareSection from "../components/website/pages/home/sections/about-icare-section";
import ICareEarlyAccessHomeSection from "~/components/website/pages/home/sections/icare-early-access-home";

export const meta = () => {
  return [
    { title: "ICare | Trusted Home Companionship Across the UK" },
    { name: "description", content: "Find trusted companions for elderly relatives or join our community of caregivers. iCare connects families with caring professionals directly, without agencies or intermediaries." },
    { name: "keywords", content: "elderly companionship UK, companionship care for elderly, companion for elderly parent, caregiver jobs UK, trusted caregivers" },

    // Open Graph
    { property: "og:type", content: "website" },
    { property: "og:title", content: "iCare - Trusted Companionship for Elderly Adults" },
    { property: "og:description", content: "Find trusted companions for elderly relatives or join our community of caregivers. Be among the first when we launch." },
    { property: "og:url", content: "https://icare-app.co.uk/" },
    { property: "og:image", content: "https://icare-app.co.uk/images/og/home.jpg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "Caregiver greeting an elderly person at the door with a warm handshake" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "iCare - Trusted Companionship for Elderly Adults" },
    { name: "twitter:description", content: "We're building a better way to find trusted companionship care. Join the waitlist today." },
    { name: "twitter:image", content: "https://icare-app.co.uk/images/og/home.jpg" },
    { name: "twitter:image:alt", content: "Caregiver greeting an elderly person at the door with a warm handshake" }
  ];
};

export const links = () => {
  return [
    { rel: "canonical", href: "https://icare-app.co.uk/" }
  ];
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "iCare",
  "url": "https://icare-app.co.uk",
  "description": "Trusted companionship care connecting families with caring professionals across the UK."
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HomePageHero imgSrc={heroImage} />
      <main>
        <AboutICareSection />
        <CareTimeline />
        <TrustValuesSection />
        <HomePageCareCTA />
        <IcareSafetyBlock />
        <ICareCostEstimator />
        <ICareTypesOfCareSEO />
        <HeroCaregiversTicker />
        <ICareEarlyAccessHomeSection />
      </main>
      <ICareFooter />
    </>
  );
}
