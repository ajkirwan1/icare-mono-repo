import PrivacyHero from "../../components/website/pages/privacy/privacy-hero";
import PrivacyContent from "../../components/website/pages/privacy/privacy-content";
import ICareFooter from "../../components/website/pages/shared/footers/icare-footer";
import { buildSeo } from "../../utils/seo/seo";

export function meta() {
  const seo = buildSeo({
    title: "Privacy Policy",
    description:
      "Learn how iCare collects, uses, and protects your personal information. Our commitment to data privacy and GDPR compliance.",
    imagePath: "/images/og/og-default.jpg"
  });

  return [
    { title: seo.title },
    { name: "description", content: seo.description },
    { name: "keywords", content: "iCare privacy policy, data protection, GDPR compliance, email data privacy" },

    { property: "og:title", content: seo.title },
    { property: "og:description", content: "How iCare collects, uses, and protects your personal information. Read our privacy policy." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: seo.url },
    { property: "og:image", content: seo.image }
  ];
}

export const links = () => [
  { rel: "canonical", href: "https://icare.co.uk/privacy" }
];

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Privacy Policy",
            description:
              "iCare's privacy policy explaining how we collect, use, and protect personal information.",
            url: "https://icare.co.uk/privacy",
            datePublished: "2026-02-01",
            dateModified: "2026-02-01"
          })
        }}
      />
      <PrivacyHero />
      <main>
        <PrivacyContent />
      </main>
      <ICareFooter />
    </>
  );
}
