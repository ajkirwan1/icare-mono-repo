import heroImage from "/images/heros/heromen2.png";
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
import ICareWaitlistFinal from "../components/website/pages/home/sections/ICareWaitlistFinal";
import AboutICareSection from "../components/website/pages/home/sections/about-icare-section";
import ICareEarlyAccessHomeSection from "~/components/website/pages/home/sections/icare-early-access-home";


export function meta() {
  const seo = buildSeo({
    title: "Home",
    description:
      "ICare – Supporting better care through intuitive tools.",
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
      <AboutICareSection />
      <CareTimeline />
      {/* <TrustIntroSection /> */}
      <TrustValuesSection />
      <HomePageCareCTA />
      <IcareSafetyBlock />
      <ICareCostEstimator />
      <ICareTypesOfCareSEO />
      <HeroCaregiversTicker />
      {/* <ICareWaitlistFinal /> */}
      <ICareEarlyAccessHomeSection />
      <ICareFooter />
    </>
  );
}
