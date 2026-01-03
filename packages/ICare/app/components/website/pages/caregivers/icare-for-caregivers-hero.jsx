import { Link } from "react-router";
import heroImage from "/images/heros/icare-for-caregivers.jpg";
import ICareNavbar from "../shared/ICareNavbar";
import styles from "./icare-for-caregivers-hero.module.scss";

export default function ICareForCaregiversHero() {
  return (
    <>
      <ICareNavbar />
      <section
        aria-label="ICare for Caregivers hero"
        className={styles.hero}
      >
        <img
          src={heroImage}
          alt="Care support background"
          className={styles.image}
        />
        <div className={styles.overlay} />
        <div className={styles.content}>
          <div>
            <h1 className={styles.heading}>
              ICare for Caregivers
            </h1>

            <div className={styles.copy}>
              <p className={styles.copyPrimary}>
                Work directly with families.
              </p>
              <p className={styles.copySecondary}>
                No agencies.
              </p>
              <p className={styles.copySecondaryLast}>
                No unfair commissions.
              </p>
            </div>

            <Link
              to="/register"
              className={styles.cta}
            >
              Quick registration
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
