import WaitinglistForm from "~/components/website/common/forms/waitinglist-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import styles from "./icare-early-access.module.scss";

export default function ICareEarlyAccessHomeSection() {
    return (
        <section id="waitlist" aria-label="Early access signup" className={styles.wrap}>
            <div className={styles.featuredCaregivers}>
                <section className={styles.featuredLynnCard} aria-label="Featured caregiver Lynn">
                    <img
                        className={styles.featuredLynnImage}
                        src="/images/Lynn2.jpeg"
                        alt="Lynn providing companionship support"
                        loading="lazy"
                    />
                    <div className={styles.featuredLynnBody}>
                        <p className={styles.featuredLynnLabel}>Meet one of our carers</p>
                        <p className={styles.featuredLynnTitle}>Lynn T.</p>
                        <p className={styles.featuredLynnText}>
                            With nearly 20 years of care experience, Lynn brings warmth, calm and a reassuring presence. She values dignity,
                            respect and meaningful connection, helping older people feel at ease at home.
                        </p>
                        <small className={styles.featuredLynnSmall}>Companionship support only.</small>
                    </div>
                </section>

                <section className={styles.featuredLynnCard} aria-label="Featured caregiver Priscilla">
                    <img
                        className={`${styles.featuredLynnImage} ${styles.featuredPriscillaImage}`}
                        src="/images/Priscilla.jpeg"
                        alt="Priscilla providing companionship and live-in care support"
                        loading="lazy"
                    />
                    <div className={styles.featuredLynnBody}>
                        <p className={styles.featuredLynnLabel}>Meet one of our carers</p>
                        <p className={styles.featuredLynnTitle}>Priscilla</p>
                        <small className={styles.featuredLynnLocation}>
                            <FontAwesomeIcon icon={faLocationDot} />
                            Midlands and Yorkshire
                        </small>
                        <p className={styles.featuredLynnText}>
                            Priscilla has 9 years of experience in care and is known for her calm, practical and reliable nature. She supports people through companionship and live-in care, with experience supporting individuals living with dementia, taking time to understand routines, preferences and what truly matters day to day.
                        </p>
                    </div>
                </section>
            </div>

            <div className={styles.estimatorHeader}>
                <h2 className={styles.h1}>Join the waiting list</h2>
                <p className={styles.lead}>
                    Leave a few details and we will let you know when ICare becomes available in your area.
                    <br />
                    There is no commitment - just early access and updates.
                </p>
            </div>

            <div className={styles.container}>
                <div className={styles.layout}>
                    {/* LEFT */}
                    <div className={styles.card}>
                        <WaitinglistForm />
                    </div>

                    <img
                        className={styles.image}
                        src="/images/web/homepage/icare-join-the-waiting-list.webp"
                        alt="Join the waiting list"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
}
