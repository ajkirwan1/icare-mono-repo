import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faComments, faRotate } from "@fortawesome/free-solid-svg-icons";
import LayoutSection from "../../common/layout/layout-section";
import imageSrc from "/images/web/icare-for-carereceivers/calmprocess2.webp";
import styles from "./protection-section.module.scss";

export default function ProtectionSection() {
    const Proof = [
        {
            icon: faFileLines,
            t: "Keep everything organised in one place",
            d: "Store the essentials clearly - care notes, agreed routines, start date and practical details — so the whole family stays aligned.",
        },
        {
            icon: faComments,
            t: "Clear communication that reduces misunderstandings",
            d: "Use one private thread to confirm changes, ask follow-ups and keep a record of what was agreed calmer than scattered calls and texts.",
        },
        {
            icon: faRotate,
            t: "If it’s not the right fit, you can change direction",
            d: "Care can take a few tries to get right. If something isn’t working, you can give notice under your agreed terms and find a better match on ICare.",
        },
    ];

    return (
        <LayoutSection background="#fff9ef">
            <div className={`${styles.container} ${styles.compact}`}>
                <h2 className={styles.title}>Clarity you can rely on before and after care starts</h2>

                <div className={styles.seoText}>
                    <p className={styles.subtitle}>
                        Home care works best when information stays clear and everyone stays aligned even when
                        plans change. ICare helps you keep key details in one place, communicate privately, and adjust smoothly
                        if you need to.
                    </p>
                </div>

                <div className={styles.grid}>
                    <ul className={styles.proofGrid}>
                        {Proof.map((p) => (
                            <li key={p.t} className={styles.card}>
                                <div className={styles.cardTop}>
                                    <div className={styles.iconWrap} aria-hidden="true">
                                        <FontAwesomeIcon icon={p.icon} className={styles.proofIcon} />
                                    </div>
                                    <h3 className={styles.proofTitle}>{p.t}</h3>
                                </div>
                                <p className={styles.proofDesc}>{p.d}</p>
                            </li>
                        ))}
                    </ul>

                    {/* IMAGE — moved slightly lower so it doesn't collide with text */}
                    <div className={styles.photoWrap}>
                        <img
                            src={imageSrc}
                            alt="Family home care support — calm home care process"
                            className={styles.photo}
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </LayoutSection>
    );
}
