import React, { useEffect, useRef, useState } from "react";
import styles from "./icare-types-of-care-seo.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHandHoldingHeart,
    faClock,
    faMoon,
    faBrain,
    faCircleInfo,
    faChevronDown,
    faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";

export default function ICareTypesOfCareSEO() {
    const careAtHomeRef = useRef(null);
    const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

    useEffect(() => {
        const node = careAtHomeRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add(styles.fadeIn);
                });
            },
            { threshold: 0.18, rootMargin: "0px 0px -80px 0px" }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const types = [
        {
            icon: faHandHoldingHeart,
            t: "Companionship & everyday support",
            d: "Friendly company at home, conversation, walks and everyday routines.",
        },
        {
            icon: faClock,
            t: "Hourly companionship visits",
            d: "Flexible check-ins — from short visits to regular daily companionship.",
        },
        {
            icon: faMoon,
            t: "Overnight companionship (as agreed)",
            d: "Reassurance and presence through the night. Non-clinical support only.",
        },
        {
            icon: faClock,
            t: "Respite companionship (short-term)",
            d: "Short-term cover so family carers can rest or step away for a little while.",
        },
        {
            icon: faBrain,
            t: "Memory & routine support",
            d: "Consistent, familiar support matched to the person’s routines and preferences.",
        },
        {
            icon: faClock,
            t: "Routine reminders (non-clinical)",
            d: "Gentle prompts for agreed routines. No prescribing, administering or clinical decisions.",
        },
    ];

    return (
        <section
            aria-label="Types of support we help you arrange"
            className={styles.wrap}
        >
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.h1}>Companionship and everyday support</h2>
                    <h3 className={styles.h2}>A calm, practical way to find the right match</h3>

                    <p className={styles.lead}>
                        ICare helps families connect with independent companions for{" "}
                        <strong className={styles.strong}>everyday support</strong> - friendly presence,
                        routines and practical help agreed directly between you.
                    </p>
                </div>

                <ul className={styles.typesGrid}>
                    {types.map((x) => (
                        <li key={x.t} className={styles.typesItem}>
                            <span className={styles.iconWrap} aria-hidden="true">
                                <FontAwesomeIcon className={styles.icon} icon={x.icon} />
                            </span>

                            <div className={styles.itemText}>
                                <h3 className={styles.itemTitle}>{x.t}</h3>
                                <p className={styles.itemDesc}>{x.d}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <div
                    id="care-at-home"
                    ref={careAtHomeRef}
                    className={`${styles.fade} ${styles.section}`}
                >
                    <div className={styles.careHomeRow}>
                        <div className={styles.imgWrap}>
                            <img
                                className={styles.img}
                                alt="Older person comfortable at home"
                                src="images/web/homepage/icare-support-at-home.webp"
                                loading="lazy"
                            />
                        </div>

                        <div>
                            <h3 className={styles.sectionTitle}>Why choose support at home?</h3>

                            <p className={styles.sectionText}>
                                Staying at home helps people keep familiar routines, comfort and independence - with the
                                right everyday support in place. Support fits around daily life at home, rather than asking
                                someone to adjust to a new environment.
                            </p>

                            <p className={styles.sectionText}>
                                For many families, knowing someone reliable is there brings reassurance and peace of mind.
                                Familiar surroundings
                                can reduce stress and confusion, especially when routines and personal space matter.
                            </p>

                            <p className={styles.sectionText}>
                                Support at home is flexible by nature. You can start small with occasional visits and adjust
                                over time without difficult moves or long-term commitments.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}
