import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFileLines,
    faComments,
    faRotate,
} from "@fortawesome/free-solid-svg-icons";
import LayoutSection from "../../common/layout/layout-section";
import imageSrc from "/images/web/icare-for-carereceivers/calmprocess2.png";
import styles from "./protection-section.module.scss";

export default function ProtectionSection() {
    const Proof = [
        {
            icon: faFileLines,
            t: "Keep everything organised in one place",
            d: "Store the essentials clearly — care notes, agreed routines, start date and practical details — so the whole family stays aligned.",
        },
        {
            icon: faComments,
            t: "Clear communication that reduces misunderstandings",
            d: "Use one private thread to confirm changes, ask follow-ups and keep a record of what was agreed — calmer than scattered calls and texts.",
        },
        {
            icon: faRotate,
            t: "If it’s not the right fit, you can change direction",
            d: "Care can take a few tries to get right. If something isn’t working, you can give notice under your agreed terms and find a better match on ICare.",
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

    // ✅ ICON STYLE — black + 15% bigger
    const iconStyle = {
        fontSize: "23px", // ~15% bigger than standard 20px
        color: "#000",
        lineHeight: 1,
    };

    return (
        <LayoutSection background="#fff9ef">
            <div className={`${styles.container} ${styles.compact}`}>
                <h2 className={styles.title}>
                    Clarity you can rely on — before and after care starts
                </h2>

                <div className={styles.seoText}>
                    <p className={styles.subtitle}>
                        Home care works best when information stays clear and everyone stays aligned —
                        even when plans change.
                    </p>

                    <p className={styles.supporting}>
                        ICare helps you keep key details in one place, communicate privately,
                        and adjust smoothly if you need to.
                    </p>
                </div>

                <div className={styles.grid}>
                    <div className={styles.proofGrid}>
                        {Proof.map((p) => (
                            <div key={p.t} className={styles.card}>
                                <div className={styles.cardTop}>
                                    <div className={styles.iconWrap} aria-hidden="true">
                                        <FontAwesomeIcon icon={p.icon} style={iconStyle} />
                                    </div>
                                    <h3 className={styles.proofTitle}>{p.t}</h3>
                                </div>
                                <p className={styles.proofDesc}>{p.d}</p>
                            </div>
                        ))}
                    </div>

                    {/* IMAGE — unchanged */}
                    <div className={styles.photoWrap}>
                        <img
                            src={imageSrc}
                            alt="Family home care support — calm home care process"
                            className={styles.photo}
                            loading="lazy"
                        />
                    </div>
                </div>

                <div
                    className={styles.seoBlock}
                    aria-label="Common care needs families search for"
                >
                    <h3 className={styles.seoTitlePlain}>
                        Common care needs families search for
                    </h3>

                    <div className={styles.tagRow} aria-label="Care needs tags">
                        {CareTags.map((t) => (
                            <span key={t} className={styles.tag}>
                                {t}
                            </span>
                        ))}
                    </div>

                    <p className={styles.note}>
                        ICare is a marketplace — families and caregivers communicate and agree care
                        directly (see <strong>Terms</strong>).
                    </p>
                </div>
            </div>
        </LayoutSection>
    );
}
