import WaitinglistForm from "~/components/website/common/forms/waitinglist-form";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import styles from "./icare-early-access.module.scss";

export default function ICareEarlyAccessHomeSection() {
    const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);
    const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
    const [isLynnExpanded, setIsLynnExpanded] = useState(false);
    const [isTaslimaExpanded, setIsTaslimaExpanded] = useState(false);
    const [isPriscillaExpanded, setIsPriscillaExpanded] = useState(false);

    const lynnDescription = "With nearly 20 years of care experience, Lynn brings warmth, calm and a reassuring presence. She values dignity, respect and meaningful connection, helping older people feel at ease at home.";
    const priscillaDescription = "Priscilla has 9 years of experience in care and is known for her calm, practical and reliable nature. She supports people through companionship and live-in care, with experience supporting individuals living with dementia, taking time to understand routines, preferences and what truly matters day to day.";
    const taslimaDescription = "Taslima is a compassionate and patient companion with experience supporting individuals living with Alzheimer's and those needing comfort-focused support. She offers calm, respectful companionship and gentle assistance with everyday routines, always prioritising dignity, reassurance, and individual preferences. She provides support with daily living activities, personal care, meaningful conversation, and gentle medication reminders where appropriate. Taslima takes a person-centred approach, valuing trust, empathy, and clear communication, and aims to create a safe and reassuring presence where people feel heard, respected, and at ease.";

    const withPreview = (text) => `${text.slice(0, 100).trimEnd()}...`;
    const createWhatsAppHref = (caregiverName) =>
        `https://wa.me/447448016876?text=${encodeURIComponent(`Hi ICare, I'd like to contact ${caregiverName}.`)}`;

    const scrollFeatured = (direction) => {
        setMobileActiveIndex((currentIndex) => {
            if (direction === "next") {
                return (currentIndex + 1) % 3;
            }

            return (currentIndex - 1 + 3) % 3;
        });
    };

    useEffect(() => {
        if (!isAutoplayEnabled) {
            return undefined;
        }

        const intervalId = window.setInterval(() => {
            if (window.innerWidth > 920) {
                return;
            }

            setMobileActiveIndex((currentIndex) => (currentIndex + 1) % 3);
        }, 2800);

        return () => window.clearInterval(intervalId);
    }, [isAutoplayEnabled]);

    return (
        <section id="waitlist" aria-label="Early access signup" className={styles.wrap}>
            <h2 className={styles.featuredCaregiversTitle}>Meet one of our carers</h2>
            <div className={styles.mobileSliderWrap}>
                <button
                    type="button"
                    className={`${styles.mobileSliderArrow} ${styles.mobileSliderArrowPrev}`}
                    aria-label="Show previous carer"
                    onClick={() => {
                        setIsAutoplayEnabled(false);
                        scrollFeatured("prev");
                    }}
                />

                <div className={styles.featuredCaregivers}>
                <section
                    className={`${styles.featuredLynnCard} ${styles.mobileSlide} ${mobileActiveIndex === 0 ? styles.mobileSlideActive : ""}`}
                    aria-label="Featured caregiver Lynn"
                >
                    <div className={styles.featuredCardTop}>
                        <img
                            className={styles.featuredLynnImage}
                            src="/images/Lynn2.jpeg"
                            alt="Lynn providing companionship support"
                            loading="lazy"
                        />
                        <div className={styles.featuredCardMeta}>
                            <p className={styles.featuredLynnTitle}>Lynn</p>
                            <p className={styles.featuredLynnText}>
                                {isLynnExpanded ? lynnDescription : withPreview(lynnDescription)}
                            </p>
                            <button
                                type="button"
                                className={styles.readMoreButton}
                                onClick={() => setIsLynnExpanded((currentValue) => !currentValue)}
                            >
                                {isLynnExpanded ? "Read less" : "Read more"}
                            </button>
                            <a
                                className={styles.contactButton}
                                href={createWhatsAppHref("Lynn")}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Contact
                            </a>
                        </div>
                    </div>
                </section>

                <section
                    className={`${styles.featuredLynnCard} ${styles.mobileSlide} ${mobileActiveIndex === 1 ? styles.mobileSlideActive : ""}`}
                    aria-label="Featured caregiver Priscilla"
                >
                    <div className={styles.featuredCardTop}>
                        <img
                            className={`${styles.featuredLynnImage} ${styles.featuredPriscillaImage}`}
                            src="/images/Priscilla.jpeg"
                            alt="Priscilla providing companionship and live-in care support"
                            loading="lazy"
                        />
                        <div className={styles.featuredCardMeta}>
                            <p className={styles.featuredLynnTitle}>Priscilla</p>
                            <small className={styles.featuredLynnLocation}>
                                <FontAwesomeIcon icon={faLocationDot} />
                                Midlands and Yorkshire
                            </small>
                            <p className={styles.featuredLynnText}>
                                {isPriscillaExpanded ? priscillaDescription : withPreview(priscillaDescription)}
                            </p>
                            <button
                                type="button"
                                className={styles.readMoreButton}
                                onClick={() => setIsPriscillaExpanded((currentValue) => !currentValue)}
                            >
                                {isPriscillaExpanded ? "Read less" : "Read more"}
                            </button>
                            <a
                                className={styles.contactButton}
                                href={createWhatsAppHref("Priscilla")}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Contact
                            </a>
                        </div>
                    </div>
                </section>

                <section
                    className={`${styles.featuredLynnCard} ${styles.mobileSlide} ${mobileActiveIndex === 2 ? styles.mobileSlideActive : ""}`}
                    aria-label="Featured caregiver Taslima"
                >
                    <div className={styles.featuredCardTop}>
                        <img
                            className={styles.featuredLynnImage}
                            src="/images/tasmina.jpeg"
                            alt="Taslima providing calm companionship support"
                            loading="lazy"
                        />
                        <div className={styles.featuredCardMeta}>
                            <p className={styles.featuredLynnTitle}>Taslima</p>
                            <small className={styles.featuredLynnLocation}>
                                <FontAwesomeIcon icon={faLocationDot} />
                                London and nearby areas
                            </small>
                            <p className={styles.featuredLynnText}>
                                {isTaslimaExpanded ? taslimaDescription : withPreview(taslimaDescription)}
                            </p>
                            <button
                                type="button"
                                className={styles.readMoreButton}
                                onClick={() => setIsTaslimaExpanded((currentValue) => !currentValue)}
                            >
                                {isTaslimaExpanded ? "Read less" : "Read more"}
                            </button>
                            <a
                                className={styles.contactButton}
                                href={createWhatsAppHref("Taslima")}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Contact
                            </a>
                        </div>
                    </div>
                </section>
                </div>

                <button
                    type="button"
                    className={`${styles.mobileSliderArrow} ${styles.mobileSliderArrowNext}`}
                    aria-label="Show next carer"
                    onClick={() => {
                        setIsAutoplayEnabled(false);
                        scrollFeatured("next");
                    }}
                />
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
