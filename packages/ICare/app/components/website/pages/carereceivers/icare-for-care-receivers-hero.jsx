import heroImage from "/images/heros/icare-receivers-hero.webp";
import heroImageMobile from "/images/heros/icare-receivers-hero-1200.webp";
import styles from "./icare-for-care-receivers-hero.module.scss";
import heroCopyStyles from "../../common/sections/hero-copy.module.scss";
import HeroImage from "../../common/media/HeroImage";

export default function ICareForCareReceiversHero() {
    return (
        <section aria-label="ICare for Care Receivers hero" className={styles.hero}>
            <HeroImage
                src={heroImage}
                mobileSrc={heroImageMobile}
                width={2560}
                height={1695}
                alt=""
                role="presentation"
                className={styles.image}
            />
            <div aria-hidden="true" className={styles.overlay} />

            <div className={styles.content}>
                <div className={heroCopyStyles.textWrapper}>
                    <h1 className={heroCopyStyles.heading}>ICare for Care receivers</h1>
                    <div className={heroCopyStyles.copy}>
                        <p className={heroCopyStyles.copyPrimary}>Get personalised help for your family.</p>
                        <ul className={heroCopyStyles.list}>
                            <li>Verified caregiver profiles</li>
                            <li>Clear terms agreed upfront</li>
                            <li>No agency markups or pressure</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
