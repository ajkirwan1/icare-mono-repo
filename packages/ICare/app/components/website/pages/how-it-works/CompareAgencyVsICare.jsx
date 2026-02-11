import React from "react";
import styles from "./compare-agency-vs-icare.module.scss";

export default function CompareAgencyVsICare() {
  return (
    <section
      id="compare"
      aria-label="Compare agency vs ICare"
      className={styles.section}
    >
      <div className={styles.container}>
        <h2 className={styles.heading}>
          An alternative to traditional care agencies
        </h2>

        <p className={styles.lead}>
          ICare offers a modern way to arrange care at home - without agency lock-ins,
          unclear pricing or unnecessary complexity. Families stay in control,
          with clear terms and direct contact from the start.
        </p>

        {/* GRID */}
        <div className={styles.grid}>
          {/* PHOTO — Traditional Agency */}
          <img
            src="images/web/how-it-works/paperwork.jpg"
            alt="Traditional agency paperwork"
            className={styles.image}
          />

          {/* AGENCY CARD */}
          <article>
            <h3 className={styles.cardTitle}>
              Traditional agency model
            </h3>

            <ul className={styles.list}>
              {[
                "Often higher agency fees",
                "More limited caregiver choice",
                "Contracts may be restrictive",
                "Changes can involve extra fees",
                "Less pricing transparency"
              ].map((item) => (
                <li key={item} className={styles.listItem}>
                  <svg
                    className={styles.icon}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    stroke="#1f2a37"
                    strokeWidth="1.6"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      strokeLinecap="round"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </article>

          {/* PHOTO — ICare */}
          <img
            src="/images/web/how-it-works/icare-how-it-works.webp"
            alt="Caregiver supportive environment"
            className={styles.image}
          />

          {/* ICARE CARD */}
          <article>
            <h3 className={`${styles.cardTitle} ${styles.icareTitle}`}>
              <img
                src="/images/logo/icareblack.svg"
                alt=""
                className={styles.logo}
              />
              <span className="sr-only">ICare</span>
            </h3>

            <ul className={styles.list}>
              {[
                "Clear flat platform fee",
                "Choose your preferred caregiver",
                "Transparent terms",
                "Direct family-caregiver agreements",
                "Fairer pay for caregivers"
              ].map((item) => (
                <li key={item} className={styles.listItem}>
                  <svg
                    className={styles.icon}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    stroke="#1f2a37"
                    strokeWidth="1.7"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
