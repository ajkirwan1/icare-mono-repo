import { OurFoundationSection } from "../../components/website/pages/who-we-are/sections/our-foundation-section";
import { OurValuesSection } from "../../components/website/pages/who-we-are/sections/our-values-section";
import { HowWeWorkSection } from "../../components/website/pages/who-we-are/sections/how-we-work-section";
import { OurImpactSection } from "../../components/website/pages/who-we-are/sections/our-impact-section";
import { WhoWeAreHero } from "../../components/website/pages/who-we-are/sections/who-we-are-hero";
import { buildSeo } from "../../utils/seo/seo";
import ICareNavbar from "../../components/website/pages/shared/icare-navbar";
import ICareFooter from "../../components/website/pages/shared/footers/icare-footer";

export function meta() {
  const seo = buildSeo({
    title: "Who We Are",
    description:
      "Learn about iCare's mission, values and approach to connecting families with trusted companions for elderly adults across the UK.",
    imagePath: "/images/og/who-we-are.webp",
    path: "/who-we-are"
  });

  return [
    { title: seo.title },
    { name: "description", content: seo.description },

    { property: "og:title", content: seo.title },
    { property: "og:description", content: seo.description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: seo.url },
    { property: "og:image", content: seo.image },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: seo.title },
    { name: "twitter:description", content: seo.description },
    { name: "twitter:image", content: seo.image }
  ];
}

export const links = () => [
  { rel: "canonical", href: "https://icare-app.co.uk/who-we-are" }
];

export default function WhoWeAre() {
  return (
    <>
      <ICareNavbar />
      <main>
        <WhoWeAreHero />
        <OurFoundationSection />
        <OurValuesSection />
        <HowWeWorkSection />
        <OurImpactSection />
      </main>
      <ICareFooter />
    </>
  );
}
