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
        <p className={styles.copy}>
          Every caregiver on ICare has previous care experience and has supported
          families in the UK. We verify DBS status and right-to-work so families can
          choose with confidence.
        </p>

        <div className={styles.badgesWrap}>
          <TrustBadges badges={SECTION_BADGES} size="large" />
        </div>
      </div>
    </section>
  );
}
