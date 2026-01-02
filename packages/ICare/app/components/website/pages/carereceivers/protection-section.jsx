import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCheck,
  faShieldHalved,
  faComments
} from "@fortawesome/free-solid-svg-icons";
import LayoutSection from "../../common/layout/layout-section";
import imageSrc from "/images/web/icare-for-carereceivers/calmprocess2.png";
import styles from "./protection-section.module.scss";

export default function ProtectionSection() {
  const Proof = [
    {
      icon: faUserCheck,
      t: "Profiles built for trust",
      d: "Clear caregiver information so families can compare calmly — experience, availability and what support is offered."
    },
    {
      icon: faShieldHalved,
      t: "A safer way to choose home care",
      d: "Structured steps that reduce risk and confusion. Families stay in control of decisions from first message to start date."
    },
    {
      icon: faComments,
      t: "Direct communication, fewer misunderstandings",
      d: "Speak with carers directly and agree expectations early — tasks, hours, start date and boundaries."
    }
  ];

  const CareTags = [
    "Companionship",
    "Light household help",
    "Meal support",
    "Daily routines",
    "Mobility support",
    "Medication reminders",
    "Post-hospital recovery",
    "Overnight care",
    "Dementia support"
  ];

  return (
    <>
      <LayoutSection background="#fff9ef">
        <div className={styles.container}>
          <h2 className={styles.title}>Home care with a calmer process</h2>

          <p className={styles.subtitle}>
            ICare is a caregiver marketplace designed for families looking for
            home care hourly or live-in care and reliable carers.
          </p>

          <p className={styles.subtitle}>
            We focus on clear information, direct communication, and a structured flow
            <br />
            that helps you choose with confidence - without the usual agency pressure.
          </p>

          <div className={styles.grid}>

            <div className={styles.proofGrid}>
              {Proof.map((p) => (
                <div key={p.t} className={styles.card}>
                  <div className={styles.cardTop}>
                    <div className={styles.iconWrap} aria-hidden="true">
                      <FontAwesomeIcon icon={p.icon} />
                    </div>
                    <h3 className={styles.proofTitle}>{p.t}</h3>
                  </div>
                  <p className={styles.proofDesc}>{p.d}</p>
                </div>
              ))}
            </div>


            <div className={styles.photoWrap}>
              <img
                src={imageSrc}
                alt="Family home care support — elderly care and trusted carers"
                className={styles.photo}
              />
            </div>
          </div>
          <div
            className={styles.seoBlock}
            aria-label="Common care needs families search for"
          >
            <h3 className={styles.seoTitlePlain}>
              Common care needs families search for
            </h3>
            <div className={styles.tagRow} aria-label="Care needs tags">
              {CareTags.map((t) => (
                <span key={t} className={styles.tag}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </LayoutSection>
    </>
  );
}
