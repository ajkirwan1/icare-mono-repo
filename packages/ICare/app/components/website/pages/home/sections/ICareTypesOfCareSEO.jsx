import React, { useEffect, useRef } from "react";
import styles from "./icare-types-of-care-seo.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHandHoldingHeart,
    faClock,
    faMoon,
    faBrain,
    faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

export default function ICareTypesOfCareSEO() {
    const careAtHomeRef = useRef(null);

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
            t: "Companionship",
            d: "Friendly company at home, conversation, walks, and time together that feels steady and kind.",
        },
        {
            icon: faClock,
            t: "Help around the home",
            d: "Light practical help with meals, tidying, shopping, and other everyday bits of life.",
        },
        {
            icon: faMoon,
            t: "Routines",
            d: "Support with familiar daily patterns, gentle reminders, and keeping the day feeling settled.",
        },
        {
            icon: faClock,
            t: "Everyday support",
            d: "Flexible help that can be agreed directly, whether that is a few visits or more regular support.",
        },
        {
            icon: faBrain,
            t: "Short breaks for family carers",
            d: "A bit of breathing space for family members who need someone trusted to step in for a while.",
        },
        {
            icon: faCircleInfo,
            t: "A gentle note",
            d: "This is everyday, non-medical support. ICare does not provide nursing or clinical care.",
        },
    ];

    return (
        <section
            aria-label="Types of support we help you arrange"
            className={styles.wrap}
        >
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.h1}>Types of support</h2>
                    <h3 className={styles.h2}>Everyday help that feels personal and local</h3>

                    <p className={styles.lead}>
                        ICare helps families connect with independent caregivers for{" "}
                        <strong className={styles.strong}>companionship</strong>, help around the home,
                        routines, and everyday support agreed directly together.
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
                            <h3 className={styles.sectionTitle}>Why people often choose support at home</h3>

                            <p className={styles.sectionText}>
                                Staying at home can help people keep familiar routines, comfort, and a sense of self. Support fits around daily life, rather than asking someone to settle into somewhere new.
                            </p>

                            <p className={styles.sectionText}>
                                For many families, knowing there is a local person they know and trust brings real peace of mind. Familiar surroundings can also make everyday life feel calmer.
                            </p>

                            <p className={styles.sectionText}>
                                Support at home can start small and change over time. There is room to keep things flexible, without long contracts or a fixed agency setup.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}
