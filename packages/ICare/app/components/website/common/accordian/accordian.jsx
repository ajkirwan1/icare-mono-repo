import styles from "./accordian.module.scss";

export default function Accordion({ items, className = "", itemClassName = "" }) {
  return (
    <ul className={`${styles.list} ${className}`}>
      {items.map((item, i) => (
        <li key={item.id ?? item.q ?? i} className={styles.listItem}>
          <details className={`${styles.item} ${itemClassName}`}>
            <summary className={styles.summary}>
              <span className={styles.question}>{item.q}</span>

              <span className={styles.arrow} aria-hidden="true">
                <span className={styles.arrowHead} />
              </span>
            </summary>

            <div className={styles.panel}>
              <p className={styles.answer}>{item.a}</p>
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}
