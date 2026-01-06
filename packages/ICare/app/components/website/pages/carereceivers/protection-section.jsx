import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faShieldHalved, faComments } from "@fortawesome/free-solid-svg-icons";
import LayoutSection from "../../common/layout/layout-section";
import imageSrc from "/images/web/icare-for-carereceivers/calmprocess2.png";
import styles from "./protection-section.module.scss";

export default function ProtectionSection() {
    const Proof = [
        {
            icon: faUserCheck,
            t: "Profiles built for trust",
            d: "Clear caregiver information so families can compare calmly — experience, availability and what support is offered.",
        },
        {
            icon: faShieldHalved,
            t: "A safer way to choose home care",
            d: "Structured steps that reduce confusion. Families stay in control from first message to start date.",
        },
        {
            icon: faComments,
            t: "Direct communication, fewer misunderstandings",
            d: "Speak with carers directly and agree expectations early — tasks, hours, start date and boundaries.",
        },
    ];

    const CareTags = [
        "Companionship",
        "Light household help",
        "Meal support",
        "Daily routines",
        "Mobility support",
        "Medication reminders",
        "Post-hospital recovery",
        "Overnight care",
        "Dementia support",
    ];

    return (
        <LayoutSection background="#fff9ef">
            {/* ✅ compact modifier */}
            <div className={`${styles.container} ${styles.compact}`}>
                <h2 className={styles.title}>Home care with a calmer process</h2>

                {/* ✅ SEO intro with air + strongs */}
                <div className={styles.seoText}>
                    <p className={styles.subtitle}>
                        <strong>ICare</strong> is a caregiver marketplace for families arranging{" "}
                        <strong>hourly</strong> or <strong>live-in</strong> home care — with{" "}
                        <strong>clear information</strong> and <strong>reliable carers</strong>.
                    </p>

                    <p className={styles.supporting}>
                        We focus on <strong>transparency</strong>, <strong>direct communication</strong> and a{" "}
                        <strong>structured step-by-step flow</strong> — so you can{" "}
                        <strong>choose with confidence</strong>, without the usual{" "}
                        <strong>agency pressure</strong>.
                    </p>
                </div>

                <div className={styles.grid}>
                    <div className={styles.proofGrid}>
                        {Proof.map((p) => (
                            <div key={p.t} className={styles.card}>
                                <div className={styles.cardTop}>
                                    <div className={styles.iconWrap} aria-hidden="true">
                                        <FontAwesomeIcon icon={p.icon} />
                                    </div>
                                    <h3 className={styles.proofTitle}>{p.t}</h3>
                                </div>
                                <p className={styles.proofDesc}>{p.d}</p>
                            </div>
                        ))}
                    </div>

                    <div className={styles.photoWrap}>
                        <img
                            src={imageSrc}
                            alt="Family home care support — elderly care and trusted carers"
                            className={styles.photo}
                            loading="lazy"
                        />
                    </div>
                </div>

                <div className={styles.seoBlock} aria-label="Common care needs families search for">
                    <h3 className={styles.seoTitlePlain}>Common care needs families search for</h3>

                    <div className={styles.tagRow} aria-label="Care needs tags">
                        {CareTags.map((t) => (
                            <span key={t} className={styles.tag}>
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </LayoutSection>
    );
}
