import ICareNavbar from "./icare-navbar";
import styles from "./home-page-hero.module.scss";
import heroCopyStyles from "../../common/sections/hero-copy.module.scss";
import HeroImage from "../../common/media/HeroImage";

export default function HomePageHero({
    imgSrc,
    imgMobileSrc,
    imgWidth = 2560,
    imgHeight = 1707,
}) {

    return (
        <>
            <ICareNavbar noShadow />

            <header
                aria-label="ICare homepage hero"
                className={styles.hero}
            >
                <HeroImage
                    src={imgSrc}
                    mobileSrc={imgMobileSrc}
                    width={imgWidth}
                    height={imgHeight}
                    alt="Care support background"
                    className={styles.backgroundImage}
                />

                <div className={styles.content}>
                    <div className={`${styles.homeTextWrapper} ${heroCopyStyles.textWrapper}`}>
                        <div className={styles.copyBlock}>
                            <h1 className={styles.heading}>
                                Local care in Cheltenham &amp; the Cotswolds
                            </h1>

                            <p className={`${styles.homeLead} ${styles.desktopOnly}`}><b>Find trusted, independent caregivers near you - without the agency.</b></p>

                            <p className={`${styles.homeLead} ${styles.mobileOnly}`} aria-hidden="true"><b>Find trusted, independent caregivers near you - without the agency.</b></p>

                            <p className={`${styles.homeLead} ${styles.trustLine}`}>
                                Built locally for families here
                            </p>

                            <p className={styles.trustIntro}>
                                Each carer is matched individually to help create a safe, comfortable experience, and every carer must have the documents below:
                            </p>

                            <div className={styles.trustStrip} aria-label="Caregiver checks">
                                <span className={styles.trustStripItem}>
                                    <span className={styles.trustStripCheck} aria-hidden="true">✔</span>
                                    <span>Right to work in the UK</span>
                                </span>
                                <span className={styles.trustStripItem}>
                                    <span className={styles.trustStripCheck} aria-hidden="true">✔</span>
                                    <span>DBS checked</span>
                                </span>
                                <span className={styles.trustStripItem}>
                                    <span className={styles.trustStripCheck} aria-hidden="true">✔</span>
                                    <span>Public liability insurance</span>
                                </span>
                            </div>

                            <a href="/how-it-works" className={styles.heroLink}>
                                <span className={styles.heroLinkLabel}>Find local support</span>
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
