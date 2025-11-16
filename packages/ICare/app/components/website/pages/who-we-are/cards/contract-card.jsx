import React from "react";
import { NavLink } from "react-router";
import styles from "@styles/components/website/pages/who-we-are/cards/contract-card.module.scss";

export function ContactCard() {
  return (
    <div className={styles.card}>
      <h3 className={styles.heading}>
        Want to learn more or partner with us?
      </h3>

      <p className={styles.text}>
        We’re happy to talk. Tell us about your needs — we’ll get back within
        1–2 business days.
      </p>

      <div className={styles.actions}>
        <a
          href="mailto:hello@icare.example"
          className={styles.primaryBtn}
        >
          Email us
        </a>

        <NavLink
          to="/how-it-works"
          className={styles.secondaryBtn}
        >
          Explore how it works
        </NavLink>
      </div>
    </div>
  );
}
