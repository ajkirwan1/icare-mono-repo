import ICareNavbar from "./ICareNavbar";
import SubmitButton from "../../common/buttons/submit-buttons/submit-button";
import NavigationButton from "../../common/buttons/navigation-buttons/navigation-button";
import styles from "./home-page-hero.module.scss";

export default function HomePageHero({ imgSrc }) {
  return (
    <>
      <ICareNavbar />
      <section
        aria-label="ICare homepage hero"
        className={styles.hero}
      >
        <img
          src={imgSrc}
          alt="Care support background"
          className={styles.backgroundImage}
        />
        <div
          aria-hidden="true"
          className={styles.overlay}
        />
        <div className={styles.content}>
          <div className={styles.textWrapper}>
            <span className={styles.badgeWrapper}>
              <strong className={styles.badge}>
                ICare is launching soon in Cheltenham
              </strong>
            </span>

            <div className={styles.copyBlock}>
              <h1 className={styles.heading}>
                Find trusted care in Cheltenham – without an agency.
              </h1>

              <p className={styles.subheading}>
                <strong>No agency fees – just direct care.</strong>
              </p>

              <ul className={styles.features}>
                {[
                  "Verified caregivers",
                  "Secure messaging",
                  "Early access to care matches",
                  "No agency markup"
                ].map((text) => (
                  <li key={text} className={styles.featureItem}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {text}
                  </li>
                ))}
              </ul>

              <form
                className={styles.form}
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("You're on the early access list!");
                }}
              >
                <SubmitButton>Join waiting list</SubmitButton>
                <NavigationButton to="/">How ICare works</NavigationButton>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
