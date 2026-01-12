import HowItWorksHero from "../../components/website/pages/how-it-works/how-it-works-hero";
import ThreeStepGuide from "../../components/website/pages/how-it-works/ThreeStepGuide";
import CompareAgencyVsICare from "../../components/website/pages/how-it-works/CompareAgencyVsICare";
import ContactCTABanner from "../../components/website/pages/how-it-works/ContactCTABanner";
import SavingsEstimatorCurrency from "../../components/website/pages/how-it-works/SavingsEstimatorCurrency";
// import HowItWorksFooter from "../../components/website/pages/shared/footers/HowItWorksFooter";
import { buildSeo } from "../../utils/seo/seo";
import ICareFooter from "../../components/website/pages/shared/footers/icare-footer";

export function meta() {
  const seo = buildSeo({
    title: "How Icare Works",
    description:
      "How ICare works.",
    imagePath: "/images/og/how-it-works.jpg"
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

export default function HowItWorks() {
  return (
    <>
      <HowItWorksHero />
      <ThreeStepGuide />
      <CompareAgencyVsICare />
      <SavingsEstimatorCurrency />
      <ContactCTABanner />
      {/* <HowItWorksFooter /> */}
      <ICareFooter />
    </>
  );
}
