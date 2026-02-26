import styles from "./kasia-dashboard.module.scss";
import PrimaryActionButton from "./PrimaryActionButton";
import StatusPill from "./StatusPill";

export default function BookingRow({ name, dateTime, avatarSrc, statusLabel, statusVariant, onViewDetails }) {
  return (
    <article className={styles.bookingRow}>
      <div className={styles.avatar}>
        {avatarSrc ? <img src={avatarSrc} alt={name} /> : null}
      </div>
      <div>
        <p className={styles.metaName}>{name}</p>
        <p className={styles.metaDate}>{dateTime}</p>
        <StatusPill label={statusLabel} variant={statusVariant} />
      </div>
      <PrimaryActionButton label="View Details" onClick={onViewDetails} />
    </article>
  );
}
