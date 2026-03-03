import ICareNavbar from "~/components/website/pages/shared/icare-navbar";
import heroSrc from "/images/heros/privacy.webp";
import heroMobileSrc from "/images/heros/privacy-1200.webp";
import styles from "./terms-hero.module.scss";
import heroCopyStyles from "../../common/sections/hero-copy.module.scss";
import HeroImage from "../../common/media/HeroImage";

export default function TermsHero() {
    return (
        <>
            <ICareNavbar />
            <section aria-label="Terms of service introduction" className={styles.hero}>
                <HeroImage
                    src={heroSrc}
                    mobileSrc={heroMobileSrc}
                    width={2560}
                    height={1707}
                    alt=""
                    className={styles.bgImage}
                />
                <div className={styles.overlay} />
                <div className={styles.headerLayer} />

                <div className={styles.content}>
                    <div className={heroCopyStyles.textWrapper}>
                        <h1 className={heroCopyStyles.heading}>Terms of Service</h1>
                        <div className={heroCopyStyles.copy}>
                            <p className={heroCopyStyles.copyPrimary}>
                                Clear terms that support fairness, safety and sustainability for families and caregivers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
