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
                                Find companionship and everyday support at home
                            </h1>




                            <p className={styles.homeLead}><b style={{ fontWeight: 500, fontSize: "1.4rem", display: "inline-block", marginBottom: "0.6rem" }}>Interested in working as an independent carer?</b><br />Discover how iCare helps you connect directly <br />with families transparently and on your terms</p>



                            {/* CTA */}
                            <div className={styles.form}>
                                <SubmitButton
                                    type="button"
                                    onClick={() => {
                                        const el = document.getElementById("waitlist");
                                        if (!el) return;

                                        const y =
                                            el.getBoundingClientRect().top + window.pageYOffset - 60;

                                        window.scrollTo({ top: y, behavior: "smooth" });
                                    }}
                                >
                                    Join our waiting list
                                </SubmitButton>
                            </div>

                        </div>
                    </div>
                </div>
            </section >
        </>
    );
}
