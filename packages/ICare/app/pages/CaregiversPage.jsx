import CaregiverCard from "../components/CaregiverCard";
import TrustSection from "../components/TrustSection";
import ICareFooter from "../components/website/pages/shared/footers/icare-footer";
import ICareAppNavbar from "../components/website/pages/shared/icare-navbar";
import styles from "./caregivers-page.module.scss";

export default function CaregiversPage({ caregivers }) {
  return (
    <>
      <ICareAppNavbar />

      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.copy}>
              <span className={styles.eyebrow}>Find the right fit</span>
              <h1 className={styles.title}>Find a caregiver who feels right for your family</h1>
            </div>
          </div>
        </section>

        <TrustSection />

        <section className={styles.gridSection}>
          <div className={styles.grid}>
            {caregivers.map((caregiver) => (
              <CaregiverCard key={caregiver._id} caregiver={caregiver} />
            ))}
          </div>
        </section>
      </main>

      <ICareFooter />
    </>
  );
}
