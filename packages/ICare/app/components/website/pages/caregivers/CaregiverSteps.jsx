import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faSliders,
    faWallet,
    faUsers,
    faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./caregivers-steps.module.scss";

export default function CaregiverStepsWithProfileGuide() {
    const groupIcon = useMemo(() => faUserGroup || faUsers, []);

    const highlights = [
        { icon: faCircleCheck, t: "Free to start", d: "Create a profile at no cost." },
        { icon: faSliders, t: "Work your way", d: "Set hours, rates and preferences." },
        { icon: faWallet, t: "Keep more", d: "No agency margins in the middle." },
        { icon: groupIcon, t: "Direct contact", d: "Families reach out to you." },
    ];

    const modules = [
        { t: "Your profile setup", d: "Add experience, services and availability." },
        { t: "Verification", d: "Upload ID and supporting documents." },
        { t: "Direct conversations", d: "Chat privately with families." },
        { t: "Clear agreements", d: "Agree hours, tasks and rates upfront." },
        { t: "Ongoing flexibility", d: "Update availability anytime." },
    ];

    return (
        <section
            id="caregiver-steps"
            aria-label="Caregiver steps"
            className={styles.section}
        >
            <div className={styles.container}>
                {/* HEADER */}
                <header className={styles.header}>
                    <h2 className={styles.h2}>A clearer way to organise care work</h2>
                    <p className={styles.lead}>
                        Build a profile, speak with families directly, and agree arrangements upfront.
                    </p>
                </header>

                {/* WHY + BENEFITS */}
                <div className={styles.whyGrid}>
                    {/* LEFT */}
                    <div className={styles.whyLeft}>
                        <h3 className={styles.whyTitle}>Why ICare?</h3>

                        <p className={styles.whyText}>
                            Made for independent caregivers - not agencies. <br />
                            Manage your work directly with families, with clear terms and fewer complications.
                        </p>

                        <p className={styles.whySpacer} />
                    </div>

                    {/* RIGHT */}
                    <ul
                        aria-label="Caregiver benefits highlights"
                        className={styles.highlights}
                    >
                        {highlights.map((h) => (
                            <li key={h.t} className={styles.highlightItem}>
                                <span aria-hidden="true" className={styles.highlightIcon}>
                                    <FontAwesomeIcon icon={h.icon} className={styles.iconLg} />
                                </span>

                                <div className={styles.highlightText}>
                                    <h3 className={styles.highlightTitle}>{h.t}</h3>
                                    <p className={styles.highlightDesc}>{h.d}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* MAIN GRID */}
                <div className={styles.mainGrid}>
                    {/* LEFT — IMAGE */}
                    <figure className={styles.figure}>
                        <img
                            src="images/web/icare-for-caregivers/icare-register.webp"
                            alt="Caregiver registering on a mobile phone"
                            className={styles.figureImg}
                        />
                        <figcaption className={styles.figcaption}>
                            Caregiver registration on iCare
                        </figcaption>
                    </figure>

                    {/* RIGHT — MODULES */}
                    <ol className={styles.modules}>
                        {modules.map((s) => (
                            <li key={s.t} className={styles.moduleItem}>
                                <span aria-hidden="true" className={styles.moduleIcon}>
                                    <FontAwesomeIcon icon={faCircleCheck} className={styles.iconMd} />
                                </span>

                                <div className={styles.moduleText}>
                                    <h3 className={styles.moduleTitle}>{s.t}</h3>
                                    <p className={styles.moduleDesc}>{s.d}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>

                {/* CTA */}
                <div className={styles.cta} />
            </div>
        </section>
    );
}
