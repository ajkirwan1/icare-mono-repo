import bannerImage1 from "/images/banners/banner-image-1.jpg";
import heroImage from "/images/heros/icare-hero-new.jpg";
import {
    IcareBanner,
    IcareSection,
} from "react-library";
import CareTimeline from "../components/website/pages/home/CareTimeline";
import HomePageCareCTA from "../components/website/pages/home/HomePageCareCTA";
import HomePageHero from "../components/website/pages/shared/HomePageHero";
import TrustIntroSection from "../components/website/pages/home/sections/TrustIntroSection";
import TrustValuesSection from "../components/website/pages/home/sections/TrustValuesSection";

export function meta() {
    return [
        { title: "ICare | Home" },
        {
            name: "description",
            content: "ICare – Supporting better care through intuitive tools.",
        },
    ];
}

export default function Home() {
    const NEUTRAL = "#0F172A";
    const pageWrap = {
        fontFamily:
            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: NEUTRAL,
        background: "linear-gradient(180deg, #FAFCFD 0%, #FFFFFF 70%)",
    };

    return (
        <div style={pageWrap}>
            <HomePageHero imgSrc={heroImage} />
            <CareTimeline />
            <TrustIntroSection />
            <TrustValuesSection />
            <IcareSection className="full-bleed">
                <IcareBanner imgSrc={bannerImage1} />
            </IcareSection>
            <HomePageCareCTA />
        </div>
    );
}
