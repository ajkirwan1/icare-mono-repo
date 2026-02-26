import styles from "./kasia-dashboard.module.scss";

export default function EarningsSummary({
  monthLabel = "This Month",
  monthAmount,
  monthDelta,
  pendingLabel = "Pending Payouts",
  pendingAmount
}) {
  return (
    <div className={styles.earningsGrid}>
      <div>
        <p className={styles.earningsLabel}>{monthLabel}</p>
        <p className={styles.earningsValue}>{monthAmount}</p>
        {monthDelta ? <p className={styles.earningsDelta}>{monthDelta}</p> : null}
      </div>
      <div>
        <p className={styles.earningsLabel}>{pendingLabel}</p>
        <p className={styles.earningsValue}>{pendingAmount}</p>
      </div>
    </div>
  );
}
