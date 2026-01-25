import React from "react";
import styles from "./layout-section.module.scss";

export default function LayoutSection({ children, background }) {
    return (
        <section
            className={styles.section}
            style={background ? { "--section-bg": background } : undefined}
        >
            <div className={styles.inner}>{children}</div>
        </section>
    );
}
