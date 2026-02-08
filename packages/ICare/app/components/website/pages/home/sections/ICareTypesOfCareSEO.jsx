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
                        <strong className={styles.strong}>everyday support</strong> — friendly presence,
                        routines and practical help agreed directly between you.
                    </p>
                </div>

                <div className={styles.typesGrid}>
                    {types.map((x) => (
                        <div key={x.t} className={styles.typesItem}>
                            <span className={styles.iconWrap} aria-hidden="true">
                                <FontAwesomeIcon className={styles.icon} icon={x.icon} />
                            </span>

                            <div className={styles.itemText}>
                                <h3 className={styles.itemTitle}>{x.t}</h3>
                                <p className={styles.itemDesc}>{x.d}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Disclaimer — flat, no cards */}
                {/*    <div className={styles.infoBox}>
                    <div className={styles.callout}>
                        <span className={styles.calloutIcon} aria-hidden="true">
                            <FontAwesomeIcon icon={faShieldHalved} />
                        </span>

                        <div className={styles.calloutTextWrap}>
                            <p className={styles.calloutTitle}>Important information</p>
                            <p className={styles.calloutText}>
                                ICare is a matching platform. We do not provide regulated care services,
                                and any support is agreed directly between users.
                            </p>
                        </div>
                    </div>

                    <div className={styles.keyGrid} aria-label="Key terms summary">
                        <div className={styles.keyItem}>
                            <p className={styles.keyTitle}>Direct agreement</p>
                            <p className={styles.keyBody}>
                                Families/care receivers and companions agree details directly between
                                themselves.
                            </p>
                        </div>

                        <div className={styles.keyItem}>
                            <p className={styles.keyTitle}>Not an employer</p>
                            <p className={styles.keyBody}>
                                ICare is not the employer of companions and does not supervise their work.
                            </p>
                        </div>

                        <div className={styles.keyItem}>
                            <p className={styles.keyTitle}>Non-clinical focus</p>
                            <p className={styles.keyBody}>
                                We focus on companionship and everyday support — not clinical or nursing care.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        className={styles.disclaimerBtn}
                        onClick={() => setIsDisclaimerOpen((v) => !v)}
                        aria-expanded={isDisclaimerOpen}
                        aria-controls="icare-disclaimer-panel"
                    >
                        <span className={styles.infoLeft}>
                            <span className={styles.infoIconWrap} aria-hidden="true">
                                <FontAwesomeIcon icon={faCircleInfo} />
                            </span>

                            <span className={styles.infoText}>
                                <p className={styles.infoTitle}>Disclaimer details</p>
                                <p className={styles.infoIntro}>
                                    Verification, privacy and how we describe support.
                                    {isDisclaimerOpen ? "" : " Read more."}
                                </p>
                            </span>
                        </span>

                        <span className={styles.infoChevron} aria-hidden="true">
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className={`${styles.chevron} ${isDisclaimerOpen ? styles.chevronOpen : ""}`}
                            />
                        </span>
                    </button>

                    {isDisclaimerOpen ? (
                        <div id="icare-disclaimer-panel" className={styles.infoPanel}>
                            <p className={styles.infoSectionTitle}>Verification documents (ID/DBS)</p>
                            <ul className={styles.infoList}>
                                <li className={styles.infoItem}>
                                    We collect and store only the minimum needed to complete verification.
                                </li>
                                <li className={styles.infoItem}>
                                    Verification documents are <strong>not displayed publicly</strong> and access is
                                    restricted to authorised administrators only.
                                </li>
                                <li className={styles.infoItem}>
                                    Where possible, documents are removed after verification is completed in line with
                                    our retention policy.
                                </li>
                            </ul>

                            <p className={styles.infoSectionTitle}>Health information</p>
                            <ul className={styles.infoList}>
                                <li className={styles.infoItem}>ICare does not request medical diagnoses in forms by default.</li>
                                <li className={styles.infoItem}>
                                    Families should describe needs in <strong>functional language</strong>{" "}
                                    (e.g. “needs help with meals and routines”), not clinical details.
                                </li>
                            </ul>

                            <p className={styles.infoSectionTitle}>How we describe support</p>
                            <ul className={styles.infoList}>
                                <li className={styles.infoItem}>
                                    We focus on everyday support — routines, practical help and agreed tasks.
                                </li>
                                <li className={styles.infoItem}>
                                    If you need clinical or nursing care (for example, treatment or medical procedures),
                                    please speak to an appropriately qualified healthcare professional.
                                </li>
                            </ul>
                        </div>

                    ) : null}
                     
            </div>
                        */}
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
                                Staying at home can help people keep familiar routines, comfort and independence, with
                                the right everyday support in place. Instead of adjusting to a new environment, support
                                fits around everyday life — at home, on their terms.
                            </p>

                            <p className={styles.sectionText}>
                                For many families, having a trusted companion brings peace of mind. Familiar surroundings
                                can reduce stress and confusion, especially when routines and personal space matter.
                            </p>

                            <p className={styles.sectionText}>
                                Support at home is flexible by nature. You can start small with occasional visits and adjust
                                over time — without forcing difficult moves or long-term commitments.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}
