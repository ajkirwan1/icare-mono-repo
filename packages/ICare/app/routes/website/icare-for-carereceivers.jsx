import ICareNavbar from "../../components/website/pages/shared/icare-navbar";
import ICareForCareReceiversHero from "../../components/website/pages/carereceivers/icare-for-care-receivers-hero";
import ReceiversCompareICareVsAgency from "../../components/website/pages/carereceivers/ReceiversCompareICareVsAgency";
import MobileMockupSection from "../../components/website/pages/carereceivers/mobile-mockup-section";
import ICareFooter from "../../components/website/pages/shared/footers/icare-footer";
import CareThatFitsRealLifeSection from "../../components/website/pages/carereceivers/care-that-fits-real-life-section";
import ICareEarlyAccessCarereceiversSection from "~/components/website/pages/carereceivers/icare-early-access-carereceivers-section";

export const meta = () => {
  return [
    { title: "iCare for Care Receivers - Find Trusted Companionship Care | iCare" },
    { name: "description", content: "Find verified, independent caregivers for companionship support. Browse profiles, message directly, and agree clear terms with no agency pressure." },
    { name: "keywords", content: "companionship care UK, find caregiver, elderly care, independent caregiver, home care support" },

    // Open Graph
    { property: "og:type", content: "website" },
    { property: "og:title", content: "iCare for Care Receivers - Trusted Companionship Care" },
    { property: "og:description", content: "Find verified caregivers for companionship support. Browse profiles, message directly, and agree clear terms." },
    { property: "og:url", content: "https://icare-app.co.uk/icare-for-carereceivers" },
    { property: "og:image", content: "https://icare-app.co.uk/images/og/carereceivers.jpg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "iCare for Care Receivers: Find trusted companionship care" },

    // Twitter Card
    { name: "twitter:title", content: "iCare for Care Receivers" },
    { name: "twitter:description", content: "Find verified caregivers for companionship support. No agency pressure, clear terms agreed upfront." },
    { name: "twitter:image", content: "https://icare-app.co.uk/images/og/carereceivers.jpg" },
    { name: "twitter:image:alt", content: "iCare for Care Receivers" }
  ];
};

export const links = () => {
  return [
    { rel: "canonical", href: "https://icare-app.co.uk/icare-for-carereceivers" }
  ];
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "iCare for Care Receivers",
  "description": "Find verified, independent caregivers for companionship support. Browse profiles, message directly, and agree clear terms.",
  "url": "https://icare-app.co.uk/icare-for-carereceivers"
};

export default function ICareForCareReceivers() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ICareNavbar />

      <main>
        <ICareForCareReceiversHero />
        <CareThatFitsRealLifeSection />
        <MobileMockupSection />
        <ReceiversCompareICareVsAgency />
        <ICareEarlyAccessCarereceiversSection />
      </main>

      <ICareFooter />
    </>
  );
}
