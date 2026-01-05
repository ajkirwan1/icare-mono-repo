import heroImage from "/images/heros/icare-hero-new.jpg";
import CareTimeline from "../components/website/pages/home/CareTimeline";
import IcareBanner2 from "../components/website/pages/home/IcareBanner2";
import HomePageCareCTA from "../components/website/pages/home/home-page-care-cta";
import HomePageHero from "../components/website/pages/shared/home-page-hero";
import TrustIntroSection from "../components/website/pages/home/sections/TrustIntroSection";
import TrustValuesSection from "../components/website/pages/home/sections/trust-values-section";
import ICareFooter from "../components/website/pages/shared/footers/ICareFooter";
import { buildSeo } from "../utils/seo/seo";

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
      <CareTimeline />
      <TrustIntroSection />
      <TrustValuesSection />
      <IcareBanner2 />
      <HomePageCareCTA />
      <ICareFooter />
    </>
  );
}
