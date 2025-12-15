import styles from "./who-we-are.module.scss";
import { Footer } from "../../components/layout/footer";
import { OurFoundationSection } from "../../components/website/pages/who-we-are/sections/our-foundation-section";
import { OurValuesSection } from "../../components/website/pages/who-we-are/sections/our-values-section";
import { HowWeWorkSection } from "../../components/website/pages/who-we-are/sections/how-we-work-section";
import { OurImpactSection } from "../../components/website/pages/who-we-are/sections/our-impact-section";
import { CtaSection } from "../../components/website/pages/who-we-are/sections/cta-section";
import { WhoWeAreHero } from "../../components/website/pages/who-we-are/sections/who-we-are-hero";

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
            <CtaSection />
            <Footer />
        </div>
    );
}
