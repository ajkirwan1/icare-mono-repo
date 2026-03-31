import heroImage from "/images/heros/icare-companionship.webp";
import heroImageMobile from "/images/heros/icare-companionship-1200.webp";
import CareTimeline from "../components/website/pages/home/CareTimeline";
import HomePageCareCTA from "../components/website/pages/home/HomePageCareCTA";
import HomePageHero from "../components/website/pages/shared/home-page-hero";
import TrustValuesSection from "../components/website/pages/home/sections/trust-values-section";
import IcareSafetyBlock from "../components/website/pages/home/sections/IcareSafetyBlock";
import ICareFooter from "../components/website/pages/shared/footers/icare-footer";
import ICareCostEstimator from "../components/website/pages/home/sections/ICareCostEstimator";
import ICareTypesOfCareSEO from "../components/website/pages/home/sections/ICareTypesOfCareSEO";
import AboutICareSection from "../components/website/pages/home/sections/about-icare-section";
import ICareEarlyAccessHomeSection from "~/components/website/pages/home/sections/icare-early-access-home";
import ICareWaitlistFinalSection from "../components/website/pages/home/sections/ICareWaitlistFinal";
import { useEffect } from "react";
import { useLoaderData } from "react-router";

export const meta = () => {
  return [
    { title: "Home care in Cheltenham & the Cotswolds | Find trusted caregivers | ICare" },
    { name: "description", content: "ICare helps families connect with independent caregivers and find available support in their area. We are building local availability in Cheltenham and across the Cotswolds. ICare is not a care agency." },
    { name: "keywords", content: "Cheltenham caregiver support, Cotswolds caregiver network, companionship care Cheltenham, independent caregivers Cotswolds, local care introductions" },

    // Open Graph
    { property: "og:type", content: "website" },
    { property: "og:title", content: "ICare - Growing local caregiver support in Cheltenham and the Cotswolds" },
    { property: "og:description", content: "ICare helps families connect with independent caregivers and find available support in their area. Local availability in the Cotswolds is growing." },
    { property: "og:url", content: "https://icare-app.co.uk/" },
    { property: "og:image", content: "https://icare-app.co.uk/images/og/home.jpg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "Caregiver greeting an elderly person at the door with a warm handshake" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "ICare - Growing local caregiver support in Cheltenham and the Cotswolds" },
    { name: "twitter:description", content: "A calm, local-first way to connect with independent caregivers as availability grows across the Cotswolds." },
    { name: "twitter:image", content: "https://icare-app.co.uk/images/og/home.jpg" },
    { name: "twitter:image:alt", content: "Caregiver greeting an elderly person at the door with a warm handshake" }
  ];
};

export const links = () => {
  return [
    { rel: "canonical", href: "https://icare-app.co.uk/" }
  ];
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "iCare",
  "url": "https://icare-app.co.uk",
  "description": "Local-first introductions between families and independent caregivers, with availability growing in Cheltenham and the Cotswolds."
};

export async function loader() {
  try {
    const { getHomeFeaturedCarers } = await import("../lib/homeFeaturedCarers.server");
    const { getCaregivers } = await import("../lib/caregivers.server");
    const featuredCarers = await getHomeFeaturedCarers();
    const caregivers = await getCaregivers({ includeHidden: true });
    const caregiverDataByName = new Map(
      caregivers.map((caregiver) => [
        String(caregiver?.name || "").trim().toLowerCase(),
        {
          photoUrl: caregiver?.photoUrl,
          photoAlt: caregiver?.photoAlt,
          experienceYears: caregiver?.experienceYears
        }
      ])
    );

    const normalizedFeaturedCarers = featuredCarers.map((carer) => {
      const normalizedName = String(carer?.name || "").trim().toLowerCase();
      const caregiverData = caregiverDataByName.get(normalizedName);

      return {
        ...carer,
        photoUrl: caregiverData?.photoUrl || carer.photoUrl,
        photoAlt: caregiverData?.photoAlt || carer.photoAlt,
        experienceYears:
          typeof caregiverData?.experienceYears === "number"
            ? caregiverData.experienceYears
            : carer.experienceYears
      };
    });

    return { featuredCarers: normalizedFeaturedCarers };
  } catch (error) {
    console.error("Failed to load home featured carers from Sanity:", error);
    return { featuredCarers: [] };
  }
}

export default function Home() {
  const { featuredCarers } = useLoaderData();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.location.hash) {
      return;
    }

    const targetSection = document.getElementById("featured-carers");

    if (!targetSection) {
      return;
    }

    const timerId = window.setTimeout(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const targetTop = targetSection.getBoundingClientRect().top + window.scrollY;
      const scrollOffset = 120;

      window.scrollTo({
        top: Math.max(targetTop - scrollOffset, 0),
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    }, 450);

    return () => window.clearTimeout(timerId);
  }, []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HomePageHero
        imgSrc={heroImage}
        imgMobileSrc={heroImageMobile}
        imgWidth={2560}
        imgHeight={1707}
      />
      <main>
        <ICareEarlyAccessHomeSection carers={featuredCarers} />
        <AboutICareSection />
        <CareTimeline />
        <TrustValuesSection />
        <HomePageCareCTA />
        <IcareSafetyBlock />
        <ICareCostEstimator />
        <ICareTypesOfCareSEO />
        <ICareWaitlistFinalSection />
      </main>
      <ICareFooter />
    </>
  );
}
