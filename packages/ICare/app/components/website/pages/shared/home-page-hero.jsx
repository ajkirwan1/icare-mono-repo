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
                                We connect independent carers<br /> with families across the UK<br />

                            </h1>




                            <p className={styles.homeLead}>Interested in working as an independent carer?<br />Discover how iCare helps you connect directly with families transparently and on your terms</p>



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
