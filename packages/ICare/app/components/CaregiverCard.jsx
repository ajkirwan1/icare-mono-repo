import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import TrustBadges from "./TrustBadges";
import styles from "./CaregiverCard.module.scss";

function formatCareTypes(careTypes = []) {
  return careTypes.slice(0, 3).join(" • ");
}

export default function CaregiverCard({ caregiver }) {
  return (
    <article className={styles.card}>
      <div className={styles.mediaWrap}>
        <img
          className={styles.photo}
          src={caregiver.photoUrl}
          alt={caregiver.photoAlt}
          loading="lazy"
          style={{ objectPosition: caregiver.photoPosition }}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            {caregiver.location ? (
              <p className={styles.location}>
                <FontAwesomeIcon icon={faLocationDot} className={styles.locationIcon} />
                <span>{caregiver.location}</span>
              </p>
            ) : null}
            <h2 className={styles.name}>{caregiver.name}</h2>
          </div>
          <span className={styles.workType}>{caregiver.workType}</span>
        </div>

        <p className={styles.description}>{caregiver.shortBio}</p>
        <TrustBadges />
        <p className={styles.careTypes}>{formatCareTypes(caregiver.careTypes)}</p>

        <Link className={styles.button} to={`/caregivers/${caregiver.slug}`}>
          View profile
        </Link>
      </div>
    </article>
  );
}
