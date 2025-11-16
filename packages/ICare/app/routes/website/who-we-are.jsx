import React from "react";
import styles from "./who-we-are.module.scss";
import { Footer } from "../../components/layout/footer";
import { FirstSection } from "../../components/website/pages/who-we-are/sections/first-section";
import { SecondSection } from "../../components/website/pages/who-we-are/sections/second-section";
import { ThirdSection } from "../../components/website/pages/who-we-are/sections/third-section";
import { FourthSection } from "../../components/website/pages/who-we-are/sections/fourth-section";
import { FifthSection } from "../../components/website/pages/who-we-are/sections/fifth-section";
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
            <FirstSection />
            <SecondSection />
            <ThirdSection />
            <FourthSection />
            <FifthSection />
            <Footer />
        </div>
    );
}
