import heroImage from "/images/heros/icare-hero-new.jpg";
import CareTimeline from "../components/website/pages/home/CareTimeline";

import HomePageCareCTA from "../components/website/pages/home/HomePageCareCTA";
import HomePageHero from "../components/website/pages/shared/home-page-hero";
import TrustValuesSection from "../components/website/pages/home/sections/trust-values-section";
import IcareSafetyBlock from "../components/website/pages/home/sections/IcareSafetyBlock";
import ICareFooter from "../components/website/pages/shared/footers/ICareFooter";
import ICareCostEstimator from "../components/website/pages/home/sections/ICareCostEstimator";
import ICareTypesOfCareSEO from "../components/website/pages/home/sections/ICareTypesOfCareSEO";
import ICareWaitlistFinal from "../components/website/pages/home/sections/ICareWaitlistFinal";

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
            <TrustValuesSection />

            <HomePageCareCTA />
            <IcareSafetyBlock />
            <ICareCostEstimator />
            <ICareTypesOfCareSEO />
            <ICareWaitlistFinal />
            <ICareFooter />
        </>
    );
}
