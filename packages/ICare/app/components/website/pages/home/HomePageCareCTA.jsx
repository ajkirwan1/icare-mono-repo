import NavigationButton from "~/components/website/common/buttons/navigation-buttons/navigation-button";
import styles from "./home-page-care-cta.module.scss";

export default function WhoIsICareForSection() {
  return (
    <section aria-label="Support available near you" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.h2}>
            Support available near you
          </h2>

          <p className={styles.sub}>
            ICare is starting in Cheltenham and the Cotswolds, and building local availability step by step.
          </p>
        </header>

        <div className={styles.card}>
          <div className={styles.col}>
            <div>
              <h3 className={styles.h3}>Starting close to home</h3>

              <p className={styles.lead}>
                Our local focus starts in Cheltenham and the surrounding Cotswolds towns and villages. We match families with available caregivers in their area, and that availability is growing.
              </p>

              <ul className={styles.list}>
                <li>
                  Cheltenham
                </li>
                <li>
                  Winchcombe
                </li>
                <li>
                  Broadway
                </li>
                <li>
                  Chipping Campden
                </li>
              </ul>

            </div>

            <div className={styles.ctaWrap}>
              <NavigationButton
                to="/icare-for-carereceivers"
                variant="outline"
                className={`${styles.ctaButton} ${styles.ctaButtonOutline}`}
              >
              Ask about availability
              </NavigationButton>

              <p className={styles.ctaNote}>We can let you know what support is currently available in your area.</p>
            </div>
          </div>

          <div className={styles.col}>
            <div>
              <h3 className={styles.h3}>Growing the caregiver network</h3>

              <p className={styles.lead}>
                Many caregivers on ICare are currently based in London, and we are actively building stronger local availability across the Cotswolds. If you are a caregiver nearby, we would love to hear from you.
              </p>

              <ul className={styles.list}>
                <li>Stow-on-the-Wold</li>
                <li>Cirencester</li>
                <li>More Cotswolds towns and villages as the local network grows</li>
              </ul>
            </div>

            <div className={styles.ctaWrap}>
              <NavigationButton to="/icare-for-caregivers" className={`${styles.ctaButton} ${styles.ctaButtonFill}`}>
                Join as a caregiver
              </NavigationButton>

              <p className={styles.ctaNote}>For independent caregivers who want to help build trusted local availability.</p>
            </div>
          </div>
        </div>

        <p className={styles.legal}>
          ICare introduces people. Families and caregivers make arrangements directly with each other.
        </p>
      </div>
    </section>
  );
}
