import styles from "./kasia-dashboard.module.scss";
import BookingRow from "./BookingRow";

export default function BookingList({ items = [], statusVariant = "pending", onViewDetails }) {
  return (
    <div className={styles.bookingList}>
      {items.map((item) => (
        <BookingRow
          key={item.id ?? `${item.name}-${item.date}`}
          name={item.name}
          dateTime={item.date}
          avatarSrc={item.avatar}
          statusLabel={item.status}
          statusVariant={item.statusVariant ?? statusVariant}
          onViewDetails={() => onViewDetails?.(item)}
        />
      ))}
    </div>
  );
}
