import ICareNavbar from "./icare-navbar";
import SubmitButton from "../../common/buttons/submit-buttons/submit-button";
import NavigationButton from "../../common/buttons/navigation-buttons/navigation-button";
import styles from "./home-page-hero.module.scss";

export default function HomePageHero({ imgSrc }) {

    const emit = (active) => {
        window.dispatchEvent(
            new CustomEvent("hero-hover", {
                detail: { active }
            })
        );
    };

    return (
        <>
            <ICareNavbar />

            <section
                aria-label="ICare homepage hero"
                className={styles.hero}
                onMouseEnter={() => emit(true)}
            >
                <img
                    src={imgSrc}
                    alt="Care support background"
                    className={styles.backgroundImage}
                />

                <div className={styles.content}>
                    <div className={styles.textWrapper}>
                        <div className={styles.copyBlock}>

                            {/* HEADLINE */}
                            <h1 className={styles.heading}>
                                Direct home care without agency barriers

                            </h1>




                            <p className={styles.homeLead}><b style={{ fontWeight: 500, fontSize: "1.6rem", display: "inline-block", marginBottom: "0.6rem" }}>A transparent way to arrange home <br />care directly and on your terms.</b><br />ICare helps families and independent caregivers <br />connect directly,
                                with clear expectations,<br />open communication and transparent costs.</p>



                            {/* CTA */}
                            <div className={styles.form}>
                                <a href="#waitlist" style={{ textDecoration: "none" }}>
                                    <SubmitButton>Join our waiting list</SubmitButton>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </section >
        </>
    );
}
