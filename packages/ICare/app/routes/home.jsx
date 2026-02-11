import heroImage from "/images/heros/icare-companionship.webp";
import CareTimeline from "../components/website/pages/home/CareTimeline";
import HomePageCareCTA from "../components/website/pages/home/HomePageCareCTA";
import HomePageHero from "../components/website/pages/shared/home-page-hero";
import TrustValuesSection from "../components/website/pages/home/sections/trust-values-section";
import IcareSafetyBlock from "../components/website/pages/home/sections/IcareSafetyBlock";
import ICareFooter from "../components/website/pages/shared/footers/icare-footer";
import { buildSeo } from "../utils/seo/seo";
import ICareCostEstimator from "../components/website/pages/home/sections/ICareCostEstimator";
import ICareTypesOfCareSEO from "../components/website/pages/home/sections/ICareTypesOfCareSEO";
import HeroCaregiversTicker from "../components/website/pages/home/sections/HeroCaregiversTicker";
import AboutICareSection from "../components/website/pages/home/sections/about-icare-section";
import ICareEarlyAccessHomeSection from "~/components/website/pages/home/sections/icare-early-access-home";
import AiChat from "../components/website/common/modals/AiChat";


export function meta() {
  const seo = buildSeo({
    title: "Companionship & home support platform",
    description:
      "Find trusted companionship and everyday support at home. ICare connects families and independent carers directly, without agencies or intermediaries.",
    imagePath: "/images/og/home.png"
  });

  return [
    { title: seo.title },
    { name: "description", content: seo.description },

    { property: "og:title", content: seo.title },
    { property: "og:description", content: seo.description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: seo.url },
    { property: "og:image", content: seo.image }

    // { name: "twitter:card", content: "summary_large_image" },
    // { name: "twitter:title", content: seo.title },
    // { name: "twitter:description", content: seo.description },
    // { name: "twitter:image", content: seo.image },
  ];
}

export default function Home() {

  return (
    <>
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
      <AiChat />
    </>
  );
}
