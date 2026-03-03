import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import styles from "./icare-early-access.module.scss";

const DEFAULT_WHATSAPP_NUMBER = "447448016876";
const AUTOPLAY_DELAY_MS = 2600;
const EDGE_RESISTANCE = 0.35;
const MOMENTUM_MULTIPLIER = 240;

const FALLBACK_CARERS = [
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

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

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

function findFallbackCarerByName(name) {
    if (!name) {
        return null;
    }

    const normalizedName = String(name).trim().toLowerCase();
    return FALLBACK_CARERS.find((carer) => carer.name.toLowerCase() === normalizedName) || null;
}

export default function ICareEarlyAccessHomeSection({ carers = [] }) {
    const viewportRef = useRef(null);
    const trackRef = useRef(null);

    const resizeRafRef = useRef(null);
    const slideRafRef = useRef(null);
    const autoplayRafRef = useRef(null);
    const autoplayLastTickRef = useRef(0);

    const offsetRef = useRef(0);
    const currentIndexRef = useRef(0);

    const isDraggingRef = useRef(false);
    const dragPointerIdRef = useRef(null);
    const dragStartXRef = useRef(0);
    const dragStartOffsetRef = useRef(0);
    const lastPointerXRef = useRef(0);
    const lastPointerTimeRef = useRef(0);
    const velocityRef = useRef(0);

    const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);
    const [expandedId, setExpandedId] = useState(null);
    const [isMobileViewport, setIsMobileViewport] = useState(false);
    const [layout, setLayout] = useState({
        cardWidth: 320,
        gap: 16,
        positions: [0],
        maxOffset: 0,
        slidesPerView: 1
    });

    const featuredCarers = useMemo(() => {
        const source = Array.isArray(carers) && carers.length > 0 ? carers : FALLBACK_CARERS;

        return source.map((carer, index) => {
            const cardId = toCardId(carer?._id || carer?.id || carer?.name, index);
            const fallbackCarer = findFallbackCarerByName(carer?.name);
            return {
                ...carer,
                cardId,
                name: carer?.name || `Carer ${index + 1}`,
                description: carer?.description || "",
                location: carer?.location || "",
                photoAlt: carer?.photoAlt || fallbackCarer?.photoAlt || carer?.name || `Featured carer ${index + 1}`,
                photoUrl: carer?.photoUrl || fallbackCarer?.photoUrl || null,
                whatsAppNumber: toDigitsOnly(carer?.whatsAppNumber) || DEFAULT_WHATSAPP_NUMBER,
                whatsAppMessage: carer?.whatsAppMessage || ""
            };
        });
    }, [carers]);

    const stopAutoplay = useCallback(() => {
        setIsAutoplayEnabled(false);
    }, []);

    const applyTrackTransform = useCallback((offset) => {
        if (!trackRef.current) {
            return;
        }

        trackRef.current.style.transform = `translate3d(${-offset}px, 0, 0)`;
    }, []);

    const cancelSlideAnimation = useCallback(() => {
        if (slideRafRef.current) {
            window.cancelAnimationFrame(slideRafRef.current);
            slideRafRef.current = null;
        }
    }, []);

    const cancelAutoplayAnimation = useCallback(() => {
        if (autoplayRafRef.current) {
            window.cancelAnimationFrame(autoplayRafRef.current);
            autoplayRafRef.current = null;
        }
    }, []);

    const nearestIndexForOffset = useCallback((offset, positions) => {
        if (!positions.length) {
            return 0;
        }

        let closestIndex = 0;
        let closestDistance = Math.abs(positions[0] - offset);

        for (let index = 1; index < positions.length; index += 1) {
            const distance = Math.abs(positions[index] - offset);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        }

        return closestIndex;
    }, []);

    const animateToOffset = useCallback((targetOffset, duration = 420) => {
        const safeTarget = clamp(targetOffset, 0, layout.maxOffset);
        const startOffset = offsetRef.current;
        const distance = safeTarget - startOffset;

        if (Math.abs(distance) < 0.5) {
            offsetRef.current = safeTarget;
            applyTrackTransform(safeTarget);
            const staticIndex = nearestIndexForOffset(safeTarget, layout.positions);
            currentIndexRef.current = staticIndex;
            return;
        }

        cancelSlideAnimation();
        const startTime = performance.now();

        const step = (now) => {
            const progress = clamp((now - startTime) / duration, 0, 1);
            const eased = easeOutCubic(progress);
            const nextOffset = startOffset + distance * eased;
            offsetRef.current = nextOffset;
            applyTrackTransform(nextOffset);

            if (progress < 1) {
                slideRafRef.current = window.requestAnimationFrame(step);
                return;
            }

            slideRafRef.current = null;
            offsetRef.current = safeTarget;
            applyTrackTransform(safeTarget);
            currentIndexRef.current = nearestIndexForOffset(safeTarget, layout.positions);
        };

        slideRafRef.current = window.requestAnimationFrame(step);
    }, [applyTrackTransform, cancelSlideAnimation, layout.maxOffset, layout.positions, nearestIndexForOffset]);

    const goToIndex = useCallback((index, duration = 420) => {
        if (!layout.positions.length) {
            return;
        }

        const safeIndex = clamp(index, 0, layout.positions.length - 1);
        currentIndexRef.current = safeIndex;
        animateToOffset(layout.positions[safeIndex], duration);
    }, [animateToOffset, layout.positions]);

    const computeLayout = useCallback(() => {
        const viewport = viewportRef.current;
        if (!viewport) {
            return;
        }

        const viewportWidth = viewport.clientWidth;
        if (!viewportWidth) {
            return;
        }

        const slidesPerView = viewportWidth > 1180 ? 3 : viewportWidth > 760 ? 2 : 1;
        const gap = viewportWidth <= 920 ? 12 : 16;
        const cardWidth = (viewportWidth - gap * (slidesPerView - 1)) / slidesPerView;

        const trackWidth = featuredCarers.length * cardWidth + Math.max(0, featuredCarers.length - 1) * gap;
        const maxOffset = Math.max(0, trackWidth - viewportWidth);

        const step = cardWidth + gap;
        const maxIndex = Math.max(0, Math.ceil(maxOffset / step));
        const positions = Array.from({ length: maxIndex + 1 }, (_, idx) => clamp(idx * step, 0, maxOffset));

        const safeOffset = clamp(offsetRef.current, 0, maxOffset);
        offsetRef.current = safeOffset;
        applyTrackTransform(safeOffset);

        const safeIndex = nearestIndexForOffset(safeOffset, positions);
        currentIndexRef.current = safeIndex;

        setIsMobileViewport(viewportWidth <= 920);
        setLayout({
            cardWidth,
            gap,
            positions,
            maxOffset,
            slidesPerView
        });
    }, [applyTrackTransform, featuredCarers.length, nearestIndexForOffset]);

    const scheduleLayoutRecalc = useCallback(() => {
        if (resizeRafRef.current) {
            window.cancelAnimationFrame(resizeRafRef.current);
        }

        resizeRafRef.current = window.requestAnimationFrame(() => {
            resizeRafRef.current = null;
            computeLayout();
        });
    }, [computeLayout]);

    const handleSwipeRelease = useCallback(() => {
        const projectedOffset = offsetRef.current - velocityRef.current * MOMENTUM_MULTIPLIER;
        const boundedProjected = clamp(projectedOffset, 0, layout.maxOffset);
        const nextIndex = nearestIndexForOffset(boundedProjected, layout.positions);
        goToIndex(nextIndex, 520);
    }, [goToIndex, layout.maxOffset, layout.positions, nearestIndexForOffset]);

    const onPointerMove = useCallback((event) => {
        if (!isDraggingRef.current) {
            return;
        }

        const dx = event.clientX - dragStartXRef.current;
        let nextOffset = dragStartOffsetRef.current - dx;

        if (nextOffset < 0) {
            nextOffset *= EDGE_RESISTANCE;
        } else if (nextOffset > layout.maxOffset) {
            nextOffset = layout.maxOffset + (nextOffset - layout.maxOffset) * EDGE_RESISTANCE;
        }

        const now = performance.now();
        const dt = Math.max(now - lastPointerTimeRef.current, 1);
        const deltaX = event.clientX - lastPointerXRef.current;
        const instantVelocity = deltaX / dt;

        velocityRef.current = velocityRef.current * 0.82 + instantVelocity * 0.18;
        lastPointerXRef.current = event.clientX;
        lastPointerTimeRef.current = now;

        offsetRef.current = nextOffset;
        applyTrackTransform(nextOffset);
    }, [applyTrackTransform, layout.maxOffset]);

    const endDrag = useCallback((pointerId) => {
        if (!isDraggingRef.current) {
            return;
        }

        isDraggingRef.current = false;

        if (viewportRef.current && pointerId !== null) {
            try {
                viewportRef.current.releasePointerCapture(pointerId);
            } catch {
                // no-op
            }
        }

        handleSwipeRelease();
    }, [handleSwipeRelease]);

    const onPointerDown = useCallback((event) => {
        if (event.pointerType === "mouse" && event.button !== 0) {
            return;
        }

        const interactiveTarget = event.target instanceof Element
            ? event.target.closest("button, a, input, textarea, select, [role='button']")
            : null;
        if (interactiveTarget) {
            return;
        }

        stopAutoplay();
        cancelSlideAnimation();

        isDraggingRef.current = true;
        dragPointerIdRef.current = event.pointerId;
        dragStartXRef.current = event.clientX;
        dragStartOffsetRef.current = offsetRef.current;
        lastPointerXRef.current = event.clientX;
        lastPointerTimeRef.current = performance.now();
        velocityRef.current = 0;

        if (viewportRef.current) {
            viewportRef.current.setPointerCapture(event.pointerId);
        }
    }, [cancelSlideAnimation, stopAutoplay]);

    const onPointerUp = useCallback((event) => {
        endDrag(event.pointerId ?? dragPointerIdRef.current);
        dragPointerIdRef.current = null;
    }, [endDrag]);

    const onPointerCancel = useCallback((event) => {
        endDrag(event.pointerId ?? dragPointerIdRef.current);
        dragPointerIdRef.current = null;
    }, [endDrag]);

    const createWhatsAppHref = useCallback((carer) => {
        const message = carer.whatsAppMessage || `Hi ICare, I'd like to contact ${carer.name}.`;
        return `https://wa.me/${carer.whatsAppNumber}?text=${encodeURIComponent(message)}`;
    }, []);

    const handleToggleCard = useCallback((cardId) => {
        stopAutoplay();
        setExpandedId((current) => (current === cardId ? null : cardId));
    }, [stopAutoplay]);

    const handleCloseCard = useCallback((cardId) => {
        setExpandedId((current) => (current === cardId ? null : current));
    }, []);

    const scrollFeatured = useCallback((direction) => {
        if (expandedId || layout.positions.length <= 1) {
            return;
        }

        stopAutoplay();

        const delta = direction === "next" ? 1 : -1;
        const targetIndex = (currentIndexRef.current + delta + layout.positions.length) % layout.positions.length;
        goToIndex(targetIndex);
    }, [expandedId, goToIndex, layout.positions.length, stopAutoplay]);

    useEffect(() => {
        scheduleLayoutRecalc();

        const resizeListener = () => scheduleLayoutRecalc();
        window.addEventListener("resize", resizeListener, { passive: true });

        const viewport = viewportRef.current;
        let resizeObserver = null;

        if (viewport && "ResizeObserver" in window) {
            resizeObserver = new ResizeObserver(() => {
                scheduleLayoutRecalc();
            });
            resizeObserver.observe(viewport);
        }

        return () => {
            window.removeEventListener("resize", resizeListener);
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        };
    }, [featuredCarers.length, scheduleLayoutRecalc]);

    useEffect(() => {
        if (!isAutoplayEnabled || expandedId || layout.positions.length <= 1 || isDraggingRef.current) {
            cancelAutoplayAnimation();
            return undefined;
        }

        autoplayLastTickRef.current = 0;

        const tick = (now) => {
            if (!autoplayLastTickRef.current) {
                autoplayLastTickRef.current = now;
            }

            if (now - autoplayLastTickRef.current >= AUTOPLAY_DELAY_MS) {
                const nextIndex = (currentIndexRef.current + 1) % layout.positions.length;
                goToIndex(nextIndex, 460);
                autoplayLastTickRef.current = now;
            }

            autoplayRafRef.current = window.requestAnimationFrame(tick);
        };

        autoplayRafRef.current = window.requestAnimationFrame(tick);

        return () => {
            cancelAutoplayAnimation();
        };
    }, [cancelAutoplayAnimation, expandedId, goToIndex, isAutoplayEnabled, layout.positions.length]);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setExpandedId(null);
            }
        };

        window.addEventListener("keydown", handleEscape);
        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, []);

    useEffect(() => {
        if (!(isMobileViewport && expandedId)) {
            return undefined;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [expandedId, isMobileViewport]);

    useEffect(() => {
        return () => {
            if (resizeRafRef.current) {
                window.cancelAnimationFrame(resizeRafRef.current);
            }
            cancelSlideAnimation();
            cancelAutoplayAnimation();
        };
    }, [cancelAutoplayAnimation, cancelSlideAnimation]);

    const expandedCard = featuredCarers.find((carer) => carer.cardId === expandedId) || null;
    const arrowBaseStyle = {
        display: "inline-flex",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: "43px",
        height: "43px",
        borderRadius: "999px",
        border: "0",
        background: "rgb(119, 141, 67)",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 40,
        cursor: "pointer",
        opacity: 0.98
    };
    const desktopArrowOffset = "-100px";
    const mobileArrowOffset = "12px";
    const arrowOffset = isMobileViewport ? mobileArrowOffset : desktopArrowOffset;

    return (
        <section id="featured-carers" aria-label="Featured carers" className={styles.wrap}>
            <h2 className={styles.featuredCaregiversTitle}>Meet one of our carers</h2>
            <div
                className={styles.mobileSliderWrap}
                onMouseEnter={stopAutoplay}
                onTouchStart={stopAutoplay}
            >
                <button
                    type="button"
                    className={`${styles.mobileSliderArrow} ${styles.mobileSliderArrowPrev}`}
                    aria-label="Show previous carer"
                    onClick={() => scrollFeatured("prev")}
                    style={{ ...arrowBaseStyle, left: arrowOffset }}
                >
                    <FontAwesomeIcon icon={faChevronLeft} className={styles.mobileSliderArrowIcon} aria-hidden="true" />
                </button>

                <div
                    ref={viewportRef}
                    className={styles.featuredCaregivers}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerCancel={onPointerCancel}
                    style={{
                        display: "block",
                        overflow: "hidden",
                        touchAction: "pan-y",
                        cursor: isDraggingRef.current ? "grabbing" : "grab"
                    }}
                >
                    <div
                        ref={trackRef}
                        style={{
                            display: "flex",
                            gap: `${layout.gap}px`,
                            willChange: "transform",
                            transform: "translate3d(0, 0, 0)",
                            backfaceVisibility: "hidden",
                            WebkitBackfaceVisibility: "hidden"
                        }}
                    >
                        {featuredCarers.map((carer) => {
                            const isPriscillaCard = String(carer.name || "").toLowerCase().includes("priscilla");
                            const imageClassName = isPriscillaCard
                                ? `${styles.featuredLynnImage} ${styles.featuredPriscillaImage}`
                                : styles.featuredLynnImage;

                            return (
                                <section
                                    key={carer.cardId}
                                    className={styles.featuredLynnCard}
                                    aria-label={`Featured caregiver ${carer.name}`}
                                    onClickCapture={stopAutoplay}
                                    style={{
                                        flex: `0 0 ${layout.cardWidth}px`,
                                        width: `${layout.cardWidth}px`,
                                        minWidth: `${layout.cardWidth}px`
                                    }}
                                >
                                    <div className={styles.featuredCardTop}>
                                        <img
                                            className={imageClassName}
                                            src={carer.photoUrl || "/images/Priscilla.jpeg"}
                                            alt={carer.photoAlt}
                                            loading="lazy"
                                            style={isPriscillaCard ? {
                                                objectFit: "cover",
                                                objectPosition: "50% 6%"
                                            } : undefined}
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
                                                aria-expanded={expandedId === carer.cardId}
                                                aria-controls={`card-details-${carer.cardId}`}
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    handleToggleCard(carer.cardId);
                                                }}
                                            >
                                                {expandedId === carer.cardId ? "Read less" : "Read more"}
                                            </button>
                                            <a
                                                className={styles.contactButton}
                                                href={createWhatsAppHref(carer)}
                                                target="_blank"
                                                rel="noreferrer"
                                                onClick={(event) => event.stopPropagation()}
                                            >
                                                Contact
                                            </a>
                                        </div>
                                    </div>
                                    {!isMobileViewport && expandedId === carer.cardId && (
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
                                                    <button
                                                        type="button"
                                                        className={styles.overlayCloseButton}
                                                        onClick={() => handleCloseCard(carer.cardId)}
                                                    >
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
                </div>

                <button
                    type="button"
                    className={`${styles.mobileSliderArrow} ${styles.mobileSliderArrowNext}`}
                    aria-label="Show next carer"
                    onClick={() => scrollFeatured("next")}
                    style={{ ...arrowBaseStyle, right: arrowOffset }}
                >
                    <FontAwesomeIcon icon={faChevronRight} className={styles.mobileSliderArrowIcon} aria-hidden="true" />
                </button>

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
