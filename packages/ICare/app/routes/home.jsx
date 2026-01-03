import heroImage from "/images/heros/icare-hero-new.jpg";
import CareTimeline from "../components/website/pages/home/CareTimeline";
import IcareBanner2 from "../components/website/pages/home/IcareBanner2";
import HomePageCareCTA from "../components/website/pages/home/home-page-care-cta";
import HomePageHero from "../components/website/pages/shared/home-page-hero";
import TrustIntroSection from "../components/website/pages/home/sections/TrustIntroSection";
import TrustValuesSection from "../components/website/pages/home/sections/trust-values-section";
import ICareFooter from "../components/website/pages/shared/footers/ICareFooter";

export function meta() {
  return [
    { title: "ICare | Home" },
    {
      name: "description",
      content: "ICare – Supporting better care through intuitive tools."
    }
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
