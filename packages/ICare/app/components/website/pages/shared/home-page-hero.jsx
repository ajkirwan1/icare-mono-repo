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

                            {/* HEADLINE */}
                            <h1 className={styles.heading}>
                                Find a more human way to care
                            </h1>

                            <p className={`${styles.homeLead} ${styles.desktopOnly}`}><b>Bringing families and independent carers together across the UK - directly.</b><br /><span className={styles.whatIfLine}>What if care was about people first?</span></p>

                            <p className={`${styles.homeLead} ${styles.mobileOnly}`} aria-hidden="true"><b>Bringing families and independent carers together across the UK - directly.</b><br /><span className={styles.whatIfLine}>What if care was about people first?</span></p>

                            <a href="/how-it-works" className={styles.heroLink}>
                                <span className={styles.heroLinkLabel}>Discover how ICare works for you</span>
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
