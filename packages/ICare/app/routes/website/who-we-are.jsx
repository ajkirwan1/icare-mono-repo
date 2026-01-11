import styles from "./who-we-are.module.scss";
// import { Footer } from "../../components/layout/footer";
import { OurFoundationSection } from "../../components/website/pages/who-we-are/sections/our-foundation-section";
import { OurValuesSection } from "../../components/website/pages/who-we-are/sections/our-values-section";
import { HowWeWorkSection } from "../../components/website/pages/who-we-are/sections/how-we-work-section";
import { OurImpactSection } from "../../components/website/pages/who-we-are/sections/our-impact-section";
import { CtaSection } from "../../components/website/pages/who-we-are/sections/cta-section";
import { WhoWeAreHero } from "../../components/website/pages/who-we-are/sections/who-we-are-hero";
import { buildSeo } from "../../utils/seo/seo";
import ICareFooter from "../../components/website/pages/shared/footers/ICareFooter";


export function meta() {
  const seo = buildSeo({
    title: "Who We are",
    description:
      "Who we are.",
    imagePath: "/images/og/who-we-are.jpg"
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

export default function WhoWeAre() {

  return (
    <div
      className={styles.page}
      style={{
        fontFamily:
          "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: "#0F172A"
      }}
    >
      <WhoWeAreHero />
      <OurFoundationSection />
      <OurValuesSection />
      <HowWeWorkSection />
      <OurImpactSection />
      {/* <CtaSection /> */}
      <ICareFooter />
    </div>
  );
}
