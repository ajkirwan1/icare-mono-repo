import TrustBadges from "./TrustBadges";
import styles from "./TrustSection.module.scss";

const SECTION_BADGES = [
  { id: "dbs-checked", label: "DBS checked", tone: "sage" },
  { id: "right-to-work-uk", label: "Right to work in the UK", tone: "sand" },
  { id: "proven-care-experience", label: "Proven care experience", tone: "stone" }
];

export default function TrustSection() {
  return (
    <section className={styles.section} aria-labelledby="trusted-caregivers-title">
      <div className={styles.card}>
        <h2 id="trusted-caregivers-title" className={styles.title}>
          Trusted caregivers
        </h2>

        <p className={styles.copy}>
          All caregivers featured on ICare are carefully selected, have previous care
          experience, and have supported families in the UK. Each profile includes DBS
          status and right-to-work checks so families can choose with greater confidence.
        </p>

        <div className={styles.badgesWrap}>
          <TrustBadges badges={SECTION_BADGES} />
        </div>
      </div>
    </section>
  );
}
