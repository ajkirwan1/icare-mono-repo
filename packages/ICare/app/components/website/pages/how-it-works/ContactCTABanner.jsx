import React from "react";
import { NavLink } from "react-router";
import styles from "./contact-cta-banner.module.scss";

export default function ContactCTABanner() {
    return (
        <section
            id="contact"
            aria-label="Contact CTA"
            className={styles.section}
        >
            <div className={styles.container}>
                {/* TEXT */}
                <div>
                    <h2 className={styles.heading}>
                        Questions about ICare?
                    </h2>

                    <p className={styles.text}>
                        We can walk you through matching, agreements and getting started - step by step and with no pressure.
                    </p>
                </div>

                {/* CTA BUTTON */}
                <NavLink to="/contact-us" className={styles.cta}>
                    Contact us

                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className={styles.icon}
                    >
                        <path d="M5 12h14" />
                        <path d="M13 5l6 7-6 7" />
                    </svg>
                </NavLink>
            </div>
        </section>
    );
}
