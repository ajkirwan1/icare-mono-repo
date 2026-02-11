import HowItWorksHero from "../../components/website/pages/how-it-works/how-it-works-hero";
import ThreeStepGuide from "../../components/website/pages/how-it-works/ThreeStepGuide";
import CompareAgencyVsICare from "../../components/website/pages/how-it-works/CompareAgencyVsICare";
import ContactCTABanner from "../../components/website/pages/how-it-works/ContactCTABanner";
import SavingsEstimatorCurrency from "../../components/website/pages/how-it-works/SavingsEstimatorCurrency";
import ICareFooter from "../../components/website/pages/shared/footers/icare-footer";

export const meta = () => {
  return [
    { title: "How It Works - Find Trusted Companionship Care | iCare" },
    { name: "description", content: "Discover how iCare connects families with trusted companions for elderly relatives. Browse profiles, message directly, and agree terms - all in 3 simple steps." },
    { name: "keywords", content: "how iCare works, find companion for elderly UK, companionship care process, elderly care platform, compare care agencies" },

    // Open Graph
    { property: "og:type", content: "website" },
    { property: "og:title", content: "How It Works - Find Trusted Companionship Care" },
    { property: "og:description", content: "Browse profiles, message directly, and agree terms. A simpler, fairer alternative to traditional care agencies." },
    { property: "og:url", content: "https://icare-app.co.uk/how-it-works" },
    { property: "og:image", content: "https://icare-app.co.uk/images/og/how-it-works.jpg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "How iCare works: 3 simple steps to find trusted companionship care" },

    // Twitter Card
    { name: "twitter:title", content: "How It Works - Find Trusted Companionship Care" },
    { name: "twitter:description", content: "Find trusted companions for elderly relatives in 3 simple steps. A fairer alternative to traditional care agencies." },
    { name: "twitter:image", content: "https://icare-app.co.uk/images/og/how-it-works.jpg" },
    { name: "twitter:image:alt", content: "How iCare works: 3 simple steps to find trusted companionship care" }
  ];
};

export const links = () => {
  return [
    { rel: "canonical", href: "https://icare-app.co.uk/how-it-works" }
  ];
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Find Companionship Care Through iCare",
  "description": "Step-by-step guide to finding trusted companionship care for elderly relatives through the iCare platform.",
  "url": "https://icare-app.co.uk/how-it-works",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Create your profile",
      "text": "Create a clear profile and describe your needs or availability."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Connect with caregivers or families",
      "text": "Connect instantly with suitable caregivers or families in your area."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Agree terms and begin",
      "text": "Agree care details upfront before anything starts, then begin working together with shared expectations."
    }
  ]
};

export default function HowItWorks() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HowItWorksHero />
      <main>
        <ThreeStepGuide />
        <CompareAgencyVsICare />
        <SavingsEstimatorCurrency />
        <ContactCTABanner />
      </main>
      <ICareFooter />
    </>
  );
}
