import { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import styles from "./icare-early-access.module.scss";

const DEFAULT_WHATSAPP_NUMBER = "447448016876";

const FALLBACK_CARERS = [
    {
        id: "faye",
        name: "Faye",
        location: "West Yorkshire",
        description: "Faye is based in West Yorkshire and is open to discussing opportunities in other areas depending on availability. She has over 16 years of experience supporting people in their daily lives, helping them feel comfortable, safe and respected at home. Faye has an NVQ Level 2 in Health & Social Care and a background in nursing and midwifery studies. Her approach is warm and she enjoys spending time with people, listening, talking, sharing everyday moments and helping with small routines that make life easier. Faye believes that companionship, patience and kindness can make a real difference to someone’s day. She is open to hourly companionship support and is happy to talk with families to see if it feels like a good match.",
        photoUrl: "/images/Faye.jpeg",
        photoAlt: "Faye featured caregiver profile",
        whatsAppNumber: ""
    },
    {
        id: "lynn",
        name: "Lynn",
        location: "",
        description: "With nearly 20 years of care experience, Lynn brings warmth, calm and a reassuring presence. She values dignity, respect and meaningful connection, helping older people feel at ease at home.",
        photoUrl: "/images/Lynn2.jpeg",
        photoAlt: "Lynn providing companionship support"
    },
    {
        id: "priscilla",
        name: "Priscilla",
        location: "Midlands and Yorkshire",
        description: "Priscilla has 9 years of experience in care and is known for her calm, practical and reliable nature. She supports people through companionship and live-in care, with experience supporting individuals living with dementia, taking time to understand routines, preferences and what truly matters day to day.",
        photoUrl: "/images/Priscilla.jpeg",
        photoAlt: "Priscilla providing companionship and live-in care support"
    },
    {
        id: "taslima",
        name: "Taslima",
        location: "London and nearby areas",
        description: "Taslima is a compassionate and patient companion with experience supporting individuals living with Alzheimer's and those needing comfort-focused support. She offers calm, respectful companionship and gentle assistance with everyday routines, always prioritising dignity, reassurance, and individual preferences. She provides support with daily living activities, personal care, meaningful conversation, and gentle medication reminders where appropriate. Taslima takes a person-centred approach, valuing trust, empathy, and clear communication, and aims to create a safe and reassuring presence where people feel heard, respected, and at ease.",
        photoUrl: "/images/tasmina.jpeg",
        photoAlt: "Taslima providing calm companionship support"
    }
];

function toCardId(value, index) {
    const normalized = String(value || `carer-${index + 1}`)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    return normalized || `carer-${index + 1}`;
}

function withPreview(text) {
    if (!text) {
        return "";
    }

    if (text.length <= 100) {
        return text;
    }

    return `${text.slice(0, 100).trimEnd()}...`;
}

function toDigitsOnly(value) {
    return String(value || "").replace(/\D/g, "");
}

export default function ICareEarlyAccessHomeSection({ carers = [] }) {
    const sliderRef = useRef(null);
    const crossfadeTimerRef = useRef(null);
    const scrollSyncRafRef = useRef(null);
    const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);
    const [isMobileCrossfading, setIsMobileCrossfading] = useState(false);
    const [mobileSlideIndex, setMobileSlideIndex] = useState(0);
    const [expandedId, setExpandedId] = useState(null);
    const [isMobileViewport, setIsMobileViewport] = useState(false);
    const [hasHorizontalOverflow, setHasHorizontalOverflow] = useState(false);

    const featuredCarers = useMemo(() => {
        const source = Array.isArray(carers) && carers.length > 0 ? carers : FALLBACK_CARERS;

        return source.map((carer, index) => {
            const cardId = toCardId(carer?._id || carer?.id || carer?.name, index);
            return {
                ...carer,
                cardId,
                name: carer?.name || `Carer ${index + 1}`,
                description: carer?.description || "",
                location: carer?.location || "",
                photoAlt: carer?.photoAlt || carer?.name || `Featured carer ${index + 1}`,
                photoUrl: carer?.photoUrl || null,
                whatsAppNumber: toDigitsOnly(carer?.whatsAppNumber),
                whatsAppMessage: carer?.whatsAppMessage || ""
            };
        });
    }, [carers]);

    const slideCount = featuredCarers.length;

    useEffect(() => {
        if (slideCount <= 0) {
            return;
        }

        setMobileSlideIndex((current) => {
            if (current < slideCount) {
                return current;
            }
            return 0;
        });
    }, [slideCount]);

    const createWhatsAppHref = (carer) => {
        const message = carer.whatsAppMessage || `Hi ICare, I'd like to contact ${carer.name}.`;
        return `https://wa.me/${carer.whatsAppNumber}?text=${encodeURIComponent(message)}`;
    };
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

    const syncSliderState = () => {
        const metrics = getSlideMetrics();
        if (!metrics) {
            setHasHorizontalOverflow(false);
            return;
        }

        setHasHorizontalOverflow(metrics.maxLeft > 1);

        if (slideCount <= 0 || metrics.slideStep <= 0) {
            return;
        }

        const computedIndex = Math.round(metrics.sliderElement.scrollLeft / metrics.slideStep);
        const boundedIndex = Math.max(0, Math.min(slideCount - 1, computedIndex));
        setMobileSlideIndex((current) => (current === boundedIndex ? current : boundedIndex));
    };

    const handleSliderScroll = () => {
        if (typeof window === "undefined") {
            return;
        }

        if (scrollSyncRafRef.current) {
            return;
        }

        scrollSyncRafRef.current = window.requestAnimationFrame(() => {
            scrollSyncRafRef.current = null;
            syncSliderState();
        });
    };

    const scrollFeatured = (direction) => {
        if (expandedId || slideCount <= 1) {
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
            ? (mobileSlideIndex + 1) % slideCount
            : (mobileSlideIndex - 1 + slideCount) % slideCount;

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
        syncSliderState();

        const handleResize = () => {
            syncSliderState();
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            if (scrollSyncRafRef.current) {
                window.cancelAnimationFrame(scrollSyncRafRef.current);
                scrollSyncRafRef.current = null;
            }
        };
    }, [slideCount, isMobileViewport]);

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
        if (!isAutoplayEnabled || expandedId || slideCount <= 1) {
            return undefined;
        }

        const intervalId = window.setInterval(() => {
            const metrics = getSlideMetrics();
            if (!metrics) {
                return;
            }

            const nextIndex = (mobileSlideIndex + 1) % slideCount;
            setMobileSlideIndex(nextIndex);
            const targetLeft = Math.min(metrics.maxLeft, nextIndex * metrics.slideStep);
            if (!isDesktopViewport()) {
                collapseAllDescriptions();
            }
            triggerCrossfade();
            metrics.sliderElement.scrollTo({ left: targetLeft, behavior: "smooth" });
        }, 1470);

        return () => {
            window.clearInterval(intervalId);
            if (crossfadeTimerRef.current) {
                window.clearTimeout(crossfadeTimerRef.current);
                crossfadeTimerRef.current = null;
            }
        };
    }, [isAutoplayEnabled, mobileSlideIndex, expandedId, slideCount]);

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

    const expandedCard = featuredCarers.find((carer) => carer.cardId === expandedId) || null;

    return (
        <section id="featured-carers" aria-label="Featured carers" className={styles.wrap}>
            <h2 className={styles.featuredCaregiversTitle}>Meet one of our carers</h2>
            <div className={styles.mobileSliderWrap}>
                {slideCount > 1 && hasHorizontalOverflow && (
                    <button
                        type="button"
                        className={`${styles.mobileSliderArrow} ${styles.mobileSliderArrowPrev}`}
                        aria-label="Show previous carer"
                        onClick={() => {
                            setIsAutoplayEnabled(false);
                            scrollFeatured("prev");
                        }}
                    />
                )}

                <div
                    ref={sliderRef}
                    className={`${styles.featuredCaregivers} ${isMobileCrossfading ? styles.mobileCrossfade : ""}`}
                    onScroll={handleSliderScroll}
                >
                    {featuredCarers.map((carer) => {
                        const isPriscillaCard = carer.cardId.includes("priscilla");
                        const imageClassName = isPriscillaCard
                            ? `${styles.featuredLynnImage} ${styles.featuredPriscillaImage}`
                            : styles.featuredLynnImage;

                        return (
                        <section
                            key={carer.cardId}
                            className={styles.featuredLynnCard}
                            aria-label={`Featured caregiver ${carer.name}`}
                            onClickCapture={() => setIsAutoplayEnabled(false)}
                        >
                            <div className={styles.featuredCardTop}>
                                <img
                                    className={imageClassName}
                                    src={carer.photoUrl || "/images/Lynn2.jpeg"}
                                    alt={carer.photoAlt}
                                    loading="lazy"
                                />
                                <div className={styles.featuredCardMeta}>
                                    <p className={styles.featuredLynnTitle}>{carer.name}</p>
                                    {carer.location ? (
                                        <small className={styles.featuredLynnLocation}>
                                            <FontAwesomeIcon icon={faLocationDot} />
                                            {carer.location}
                                        </small>
                                    ) : (
                                        <small className={`${styles.featuredLynnLocation} ${styles.featuredLynnLocationPlaceholder}`}>
                                            &nbsp;
                                        </small>
                                    )}
                                    <p className={styles.featuredLynnText}>{withPreview(carer.description)}</p>
                                    <button
                                        type="button"
                                        className={styles.readMoreButton}
                                        aria-expanded={isCardExpanded(carer.cardId)}
                                        aria-controls={`card-details-${carer.cardId}`}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            handleToggleCard(carer.cardId);
                                        }}
                                    >
                                        {isCardExpanded(carer.cardId) ? "Read less" : "Read more"}
                                    </button>
                                    {carer.whatsAppNumber ? (
                                        <a
                                            className={styles.contactButton}
                                            href={createWhatsAppHref(carer)}
                                            target="_blank"
                                            rel="noreferrer"
                                            onClick={(event) => event.stopPropagation()}
                                        >
                                            Contact
                                        </a>
                                    ) : null}
                                </div>
                            </div>
                            {!isMobileViewport && isCardExpanded(carer.cardId) && (
                                <div
                                    id={`card-details-${carer.cardId}`}
                                    className={styles.cardOverlay}
                                    role="dialog"
                                    aria-label={`About ${carer.name}`}
                                    onClick={() => handleCloseCard(carer.cardId)}
                                >
                                    <div className={styles.cardOverlayPanel} onClick={(event) => event.stopPropagation()}>
                                        <h3 className={styles.cardOverlayTitle}>About {carer.name}</h3>
                                        <p className={styles.cardOverlayText}>{carer.description}</p>
                                        <div className={styles.cardOverlayActions}>
                                            <button type="button" className={styles.overlayCloseButton} onClick={() => handleCloseCard(carer.cardId)}>
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </section>
                        );
                    })}
                </div>

                {slideCount > 1 && hasHorizontalOverflow && (
                    <button
                        type="button"
                        className={`${styles.mobileSliderArrow} ${styles.mobileSliderArrowNext}`}
                        aria-label="Show next carer"
                        onClick={() => {
                            setIsAutoplayEnabled(false);
                            scrollFeatured("next");
                        }}
                    />
                )}

                {isMobileViewport && expandedCard && (
                    <div className={styles.mobileOverlayBackdrop} onClick={() => setExpandedId(null)}>
                        <div
                            className={styles.mobileOverlayDialog}
                            role="dialog"
                            aria-label={`About ${expandedCard.name}`}
                            onClick={(event) => event.stopPropagation()}
                        >
                            <h3 className={styles.cardOverlayTitle}>About {expandedCard.name}</h3>
                            <p className={styles.cardOverlayText}>{expandedCard.description}</p>
                            <div className={styles.cardOverlayActions}>
                                <button type="button" className={styles.overlayCloseButton} onClick={() => setExpandedId(null)}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </section>
    );
}
