import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPenNib,
    faBriefcase,
    faClock,
    faHandHoldingHeart,
    faBan,
    faLocationDot,
    faLanguage,
    faFileCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./caregivers-page-cta.module.scss";

export default function WhatMakesAGreatProfile() {
    const items = [
        { icon: faPenNib, title: "Opening line", desc: "Who you are and the type of care you offer." },
        { icon: faBriefcase, title: "Experience", desc: "Your background, years in care and relevant conditions." },
        { icon: faClock, title: "Availability", desc: "Days, hours, live-in or hourly, and any flexibility." },
        { icon: faHandHoldingHeart, title: "Care you provide", desc: "Personal care, companionship, mobility, household help and nights." },
        { icon: faBan, title: "Boundaries", desc: "Tasks you don’t do and situations you avoid." },
        { icon: faLocationDot, title: "Location", desc: "Where you’re based and how far you can travel or relocate." },
        { icon: faLanguage, title: "Languages", desc: "Languages spoken and level of fluency." },
        { icon: faFileCircleCheck, title: "References & checks", desc: "References, checks and insurance shown where available." },
    ];

    return (
        <section
            id="great-profile-section"
            aria-label="What makes a great caregiver profile"
            className={styles.section}
        >
            <div className={styles.container}>
                <header className={styles.header}>
                    <h2 className={styles.h2}>What makes a great profile</h2>
                    <p className={styles.lead}>
                        A clear profile helps families understand fit quickly and contact you with confidence.
                    </p>
                </header>

                <ul className={styles.grid}>
                    {items.map((x) => (
                        <li key={x.title} className={styles.item}>
                            <span className={styles.iconWrap} aria-hidden="true">
                                <FontAwesomeIcon icon={x.icon} className={styles.icon} />
                            </span>
                            <div className={styles.content}>
                                <h3 className={styles.title}>{x.title}</h3>
                                <p className={styles.desc}>{x.desc}</p>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className={styles.note}>
                    <p className={styles.noteTitle}>Why this works?</p>
                    <p className={styles.noteText}>
                        Clear sections make profiles faster to compare and easier to trust.
                    </p>
                </div>
            </div>
        </section>
    );
}
