import whoWeAreHeroSrc from "/images/heros/who-we-are.jpg";
import whoWeAreHeroMobileSrc from "/images/heros/who-we-are-1200.webp";
import ICareNavbar from "../shared/icare-navbar";
import styles from "./how-it-works-hero.module.scss";
import heroCopyStyles from "../../common/sections/hero-copy.module.scss";
import HeroImage from "../../common/media/HeroImage";

export default function HowItWorksHero() {
    return (
        <>
            <ICareNavbar />
            <header aria-label="How it works hero" className={styles.hero}>
                <HeroImage
                    src={whoWeAreHeroSrc}
                    mobileSrc={whoWeAreHeroMobileSrc}
                    width={1728}
                    height={1092}
                    alt="Care coordination background"
                    className={styles.image}
                />
                <div className={styles.overlay} />

                <div className={styles.content}>
                    <div className={heroCopyStyles.textWrapper}>
                        <h1 className={heroCopyStyles.heading}>How ICare works</h1>
                        <div className={heroCopyStyles.copy}>
                            <p className={heroCopyStyles.copyPrimary}>A simple way to find care locally.<br />Browse profiles, message, and agree terms directly.</p>
                        </div>
                    </div>
                </div>

            </header>
        </>
    );
}
