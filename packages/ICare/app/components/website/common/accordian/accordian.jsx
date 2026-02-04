import React from "react";
import styles from "./accordian.module.scss";

export default function Accordion({ items, className = "", itemClassName = "" }) {
    return (
        <ul className={`${styles.list} ${className}`}>
            {items.map((item, i) => (
                <li key={item.id ?? item.q ?? i} className={styles.listItem}>
                    <details className={`${styles.item} ${itemClassName}`}>
                        <summary className={styles.summary}>
                            <span className={styles.question}>{item.q}</span>

                            <svg
                                className={styles.arrow}
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="rgba(100,100,100,0.9)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
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
