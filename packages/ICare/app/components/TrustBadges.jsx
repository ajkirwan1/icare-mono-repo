import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faBriefcase,
  faShieldHalved
} from "@fortawesome/free-solid-svg-icons";
import styles from "./TrustBadges.module.scss";

const DEFAULT_BADGES = [
  {
    id: "dbs-checked",
    label: "DBS checked",
    icon: faShieldHalved,
    tone: "sage"
  },
  {
    id: "right-to-work",
    label: "Right to work UK",
    icon: faBriefcase,
    tone: "sand"
  },
  {
    id: "experienced-caregiver",
    label: "Proven care experience",
    icon: faCircleCheck,
    tone: "stone"
  }
];

export default function TrustBadges({ badges = DEFAULT_BADGES }) {
  return (
    <div className={styles.badges} aria-label="Caregiver trust badges">
      {badges.map((badge) => (
        <span
          key={badge.id}
          className={`${styles.badge} ${styles[badge.tone] || ""}`}
        >
          <FontAwesomeIcon icon={badge.icon} className={styles.icon} />
          <span>{badge.label}</span>
        </span>
      ))}
    </div>
  );
}
