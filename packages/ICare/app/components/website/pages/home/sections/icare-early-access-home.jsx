import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import styles from "./icare-early-access.module.scss";

export default function ICareEarlyAccessHomeSection() {
    const sliderRef = useRef(null);
    const crossfadeTimerRef = useRef(null);
    const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);
    const [isMobileCrossfading, setIsMobileCrossfading] = useState(false);
    const [mobileSlideIndex, setMobileSlideIndex] = useState(0);
    const [expandedId, setExpandedId] = useState(null);
    const [isMobileViewport, setIsMobileViewport] = useState(false);

    const lynnDescription = "With nearly 20 years of care experience, Lynn brings warmth, calm and a reassuring presence. She values dignity, respect and meaningful connection, helping older people feel at ease at home.";
    const priscillaDescription = "Priscilla has 9 years of experience in care and is known for her calm, practical and reliable nature. She supports people through companionship and live-in care, with experience supporting individuals living with dementia, taking time to understand routines, preferences and what truly matters day to day.";
    const taslimaDescription = "Taslima is a compassionate and patient companion with experience supporting individuals living with Alzheimer's and those needing comfort-focused support. She offers calm, respectful companionship and gentle assistance with everyday routines, always prioritising dignity, reassurance, and individual preferences. She provides support with daily living activities, personal care, meaningful conversation, and gentle medication reminders where appropriate. Taslima takes a person-centred approach, valuing trust, empathy, and clear communication, and aims to create a safe and reassuring presence where people feel heard, respected, and at ease.";

    const withPreview = (text) => `${text.slice(0, 100).trimEnd()}...`;
    const createWhatsAppHref = (caregiverName) =>
        `https://wa.me/447448016876?text=${encodeURIComponent(`Hi ICare, I'd like to contact ${caregiverName}.`)}`;
    const isDesktopViewport = () => typeof window !== "undefined" && window.innerWidth > 920;
    const isCardExpanded = (cardId) => expandedId === cardId;
    const handleToggleCard = (cardId) => {
        setIsAutoplayEnabled(false);
        setExpandedId((current) => (current === cardId ? null : cardId));
    };
    const handleCloseCard = (cardId) => {
        setExpandedId((current) => (current === cardId ? null : current));
    };
    const collapseAllDescriptions = () => {
        setExpandedId(null);
    };
    const triggerCrossfade = () => {
        if (isDesktopViewport()) {
            return;
        }

        if (crossfadeTimerRef.current) {
            window.clearTimeout(crossfadeTimerRef.current);
        }

        setIsMobileCrossfading(true);
        crossfadeTimerRef.current = window.setTimeout(() => {
            setIsMobileCrossfading(false);
            crossfadeTimerRef.current = null;
        }, 500);
    };

    const getSlideMetrics = () => {
        const sliderElement = sliderRef.current;
        if (!sliderElement) {
            return null;
        }

        const firstCard = sliderElement.querySelector("section");
        if (!firstCard) {
            return null;
        }

        const sliderStyles = window.getComputedStyle(sliderElement);
        const gapValue = Number.parseFloat(sliderStyles.columnGap || sliderStyles.gap || "0") || 0;
        const slideStep = firstCard.getBoundingClientRect().width + gapValue;
        const maxLeft = Math.max(0, sliderElement.scrollWidth - sliderElement.clientWidth);
        return { sliderElement, slideStep, maxLeft };
    };

    const scrollFeatured = (direction) => {
        if (expandedId) {
            return;
        }

        const metrics = getSlideMetrics();
        if (!metrics) {
            return;
        }
        if (!isDesktopViewport()) {
            collapseAllDescriptions();
        }
        const nextIndex = direction === "next"
            ? (mobileSlideIndex + 1) % 3
            : (mobileSlideIndex - 1 + 3) % 3;
        setMobileSlideIndex(nextIndex);
        const targetLeft = Math.min(metrics.maxLeft, nextIndex * metrics.slideStep);
        triggerCrossfade();

        metrics.sliderElement.scrollTo({
            left: targetLeft,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        const syncViewport = () => {
            setIsMobileViewport(window.innerWidth <= 920);
        };

        syncViewport();
        window.addEventListener("resize", syncViewport);
        return () => {
            window.removeEventListener("resize", syncViewport);
        };
    }, []);

    useEffect(() => {
        if (!expandedId) {
            return undefined;
        }

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setExpandedId(null);
            }
        };

        window.addEventListener("keydown", handleEscape);
        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, [expandedId]);

    useEffect(() => {
        if (!isAutoplayEnabled) {
            return undefined;
        }
        if (expandedId) {
            return undefined;
        }

        const intervalId = window.setInterval(() => {
            const metrics = getSlideMetrics();
            if (!metrics) {
                return;
            }

            const nextIndex = (mobileSlideIndex + 1) % 3;
            setMobileSlideIndex(nextIndex);
            const targetLeft = Math.min(metrics.maxLeft, nextIndex * metrics.slideStep);
            if (!isDesktopViewport()) {
                collapseAllDescriptions();
            }
            triggerCrossfade();
            metrics.sliderElement.scrollTo({ left: targetLeft, behavior: "smooth" });
        }, 2800);

        return () => {
            window.clearInterval(intervalId);
            if (crossfadeTimerRef.current) {
                window.clearTimeout(crossfadeTimerRef.current);
                crossfadeTimerRef.current = null;
            }
        };
    }, [isAutoplayEnabled, mobileSlideIndex, expandedId]);

    useEffect(() => {
        if (!(isMobileViewport && expandedId)) {
            return undefined;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isMobileViewport, expandedId]);

    const expandedCardData = expandedId === "lynn"
        ? { title: "About Lynn", text: lynnDescription }
        : expandedId === "priscilla"
            ? { title: "About Priscilla", text: priscillaDescription }
            : expandedId === "taslima"
                ? { title: "About Taslima", text: taslimaDescription }
                : null;

    return (
        <section id="featured-carers" aria-label="Featured carers" className={styles.wrap}>
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

                <div
                    ref={sliderRef}
                    className={`${styles.featuredCaregivers} ${isMobileCrossfading ? styles.mobileCrossfade : ""}`}
                >
                <section
                    className={styles.featuredLynnCard}
                    aria-label="Featured caregiver Lynn"
                    onClickCapture={() => setIsAutoplayEnabled(false)}
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
                            <small className={`${styles.featuredLynnLocation} ${styles.featuredLynnLocationPlaceholder}`}>
                                &nbsp;
                            </small>
                            <p className={styles.featuredLynnText}>{withPreview(lynnDescription)}</p>
                            <button
                                type="button"
                                className={styles.readMoreButton}
                                aria-expanded={isCardExpanded("lynn")}
                                aria-controls="card-details-lynn"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    handleToggleCard("lynn");
                                }}
                            >
                                {isCardExpanded("lynn") ? "Read less" : "Read more"}
                            </button>
                            <a
                                className={styles.contactButton}
                                href={createWhatsAppHref("Lynn")}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(event) => event.stopPropagation()}
                            >
                                Contact
                            </a>
                        </div>
                    </div>
                    {!isMobileViewport && isCardExpanded("lynn") && (
                        <div
                            id="card-details-lynn"
                            className={styles.cardOverlay}
                            role="dialog"
                            aria-label="About Lynn"
                            onClick={() => handleCloseCard("lynn")}
                        >
                            <div className={styles.cardOverlayPanel} onClick={(event) => event.stopPropagation()}>
                                <h3 className={styles.cardOverlayTitle}>About Lynn</h3>
                                <p className={styles.cardOverlayText}>{lynnDescription}</p>
                                <div className={styles.cardOverlayActions}>
                                    <button type="button" className={styles.overlayCloseButton} onClick={() => handleCloseCard("lynn")}>
                                        Close
                                    </button>
                                    <button type="button" className={styles.overlayCloseButton} onClick={() => handleCloseCard("lynn")}>
                                        Read less
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                <section
                    className={styles.featuredLynnCard}
                    aria-label="Featured caregiver Priscilla"
                    onClickCapture={() => setIsAutoplayEnabled(false)}
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
                            <p className={styles.featuredLynnText}>{withPreview(priscillaDescription)}</p>
                            <button
                                type="button"
                                className={styles.readMoreButton}
                                aria-expanded={isCardExpanded("priscilla")}
                                aria-controls="card-details-priscilla"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    handleToggleCard("priscilla");
                                }}
                            >
                                {isCardExpanded("priscilla") ? "Read less" : "Read more"}
                            </button>
                            <a
                                className={styles.contactButton}
                                href={createWhatsAppHref("Priscilla")}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(event) => event.stopPropagation()}
                            >
                                Contact
                            </a>
                        </div>
                    </div>
                    {!isMobileViewport && isCardExpanded("priscilla") && (
                        <div
                            id="card-details-priscilla"
                            className={styles.cardOverlay}
                            role="dialog"
                            aria-label="About Priscilla"
                            onClick={() => handleCloseCard("priscilla")}
                        >
                            <div className={styles.cardOverlayPanel} onClick={(event) => event.stopPropagation()}>
                                <h3 className={styles.cardOverlayTitle}>About Priscilla</h3>
                                <p className={styles.cardOverlayText}>{priscillaDescription}</p>
                                <div className={styles.cardOverlayActions}>
                                    <button type="button" className={styles.overlayCloseButton} onClick={() => handleCloseCard("priscilla")}>
                                        Close
                                    </button>
                                    <button type="button" className={styles.overlayCloseButton} onClick={() => handleCloseCard("priscilla")}>
                                        Read less
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                <section
                    className={styles.featuredLynnCard}
                    aria-label="Featured caregiver Taslima"
                    onClickCapture={() => setIsAutoplayEnabled(false)}
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
                            <p className={styles.featuredLynnText}>{withPreview(taslimaDescription)}</p>
                            <button
                                type="button"
                                className={styles.readMoreButton}
                                aria-expanded={isCardExpanded("taslima")}
                                aria-controls="card-details-taslima"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    handleToggleCard("taslima");
                                }}
                            >
                                {isCardExpanded("taslima") ? "Read less" : "Read more"}
                            </button>
                            <a
                                className={styles.contactButton}
                                href={createWhatsAppHref("Taslima")}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(event) => event.stopPropagation()}
                            >
                                Contact
                            </a>
                        </div>
                    </div>
                    {!isMobileViewport && isCardExpanded("taslima") && (
                        <div
                            id="card-details-taslima"
                            className={styles.cardOverlay}
                            role="dialog"
                            aria-label="About Taslima"
                            onClick={() => handleCloseCard("taslima")}
                        >
                            <div className={styles.cardOverlayPanel} onClick={(event) => event.stopPropagation()}>
                                <h3 className={styles.cardOverlayTitle}>About Taslima</h3>
                                <p className={styles.cardOverlayText}>{taslimaDescription}</p>
                                <div className={styles.cardOverlayActions}>
                                    <button type="button" className={styles.overlayCloseButton} onClick={() => handleCloseCard("taslima")}>
                                        Close
                                    </button>
                                    <button type="button" className={styles.overlayCloseButton} onClick={() => handleCloseCard("taslima")}>
                                        Read less
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
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

                {isMobileViewport && expandedCardData && (
                    <div className={styles.mobileOverlayBackdrop} onClick={() => setExpandedId(null)}>
                        <div
                            className={styles.mobileOverlayDialog}
                            role="dialog"
                            aria-label={expandedCardData.title}
                            onClick={(event) => event.stopPropagation()}
                        >
                            <h3 className={styles.cardOverlayTitle}>{expandedCardData.title}</h3>
                            <p className={styles.cardOverlayText}>{expandedCardData.text}</p>
                            <div className={styles.cardOverlayActions}>
                                <button type="button" className={styles.overlayCloseButton} onClick={() => setExpandedId(null)}>
                                    Close
                                </button>
                                <button type="button" className={styles.overlayCloseButton} onClick={() => setExpandedId(null)}>
                                    Read less
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </section>
    );
}
