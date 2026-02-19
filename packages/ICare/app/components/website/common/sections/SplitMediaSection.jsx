import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./split-image-section.module.scss";
import slider from "./media-slider.module.scss";

export default function SplitMediaSection({
    imageSide = "left",
    unstyledImage = false,
    children,
    media = [],
}) {
    const isRight = imageSide === "right";
    const [index, setIndex] = useState(0);
    const videoRef = useRef(null);
    const swipeStartRef = useRef({ x: 0, y: 0, fromVideo: false });

    const timerRef = useRef(null);
    const [autoEnabled, setAutoEnabled] = useState(true);
    const [videoStarted, setVideoStarted] = useState(false);

    const clearTimer = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const scheduleNext = useCallback(() => {
        clearTimer();
        if (!autoEnabled) return;
        if (media.length <= 1) return;

        timerRef.current = setTimeout(() => {
            setIndex((i) => (i + 1) % media.length);
        }, 8000);
    }, [clearTimer, media.length, autoEnabled]);

    const goTo = useCallback(
        (i) => {
            setIndex(i);
            scheduleNext();
        },
        [scheduleNext]
    );

    const goPrev = useCallback(() => {
        if (media.length <= 1) return;
        setIndex((i) => (i - 1 + media.length) % media.length);
        scheduleNext();
    }, [media.length, scheduleNext]);

    const goNext = useCallback(() => {
        if (media.length <= 1) return;
        setIndex((i) => (i + 1) % media.length);
        scheduleNext();
    }, [media.length, scheduleNext]);

    // autoplay
    useEffect(() => {
        scheduleNext();
        return () => clearTimer();
    }, [index, scheduleNext, clearTimer]);

    // on slide change: reset video + overlay
    useEffect(() => {
        setVideoStarted(false);

        const v = videoRef.current;
        if (v) {
            try {
                v.pause();
                v.currentTime = 0;
                v.load(); // ✅ przywraca poster/stan początkowy bez usuwania src
            } catch { }
        }

        const active = media[index];
        if (active?.type !== "video") setAutoEnabled(true);
    }, [index, media]);

    const playWithSound = async () => {
        const active = media[index];
        if (active?.type !== "video") return;

        setAutoEnabled(false);
        clearTimer();

        const v = videoRef.current;
        if (!v) return;

        try {
            v.playsInline = true;
            v.muted = false;  // user gesture => można odmutować
            v.load();         // ✅ upewnia się że źródło/poster są zsynchronizowane
            await v.play();
            setVideoStarted(true);
        } catch {
            setVideoStarted(false);
        }
    };

    const isActiveVideo = media[index]?.type === "video";
    const swipeEnabled = media.length > 1 && !(isActiveVideo && videoStarted);

    const onTouchStart = useCallback(
        (e) => {
            if (!swipeEnabled) return;
            const touch = e.touches?.[0];
            if (!touch) return;
            const fromVideo = e.target instanceof Element ? Boolean(e.target.closest("video")) : false;
            swipeStartRef.current = { x: touch.clientX, y: touch.clientY, fromVideo };
        },
        [swipeEnabled]
    );

    const onTouchEnd = useCallback(
        (e) => {
            if (!swipeEnabled) return;
            if (swipeStartRef.current.fromVideo) return;
            const touch = e.changedTouches?.[0];
            if (!touch) return;

            const dx = touch.clientX - swipeStartRef.current.x;
            const dy = touch.clientY - swipeStartRef.current.y;
            const isHorizontalSwipe = Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy);
            if (!isHorizontalSwipe) return;

            if (dx > 0) goPrev();
            else goNext();
        },
        [goNext, goPrev, swipeEnabled]
    );

    return (
        <div className={styles.container}>
            <div className={`${styles.grid} ${isRight ? styles.reverse : ""}`}>
                <div className={slider.mediaWrap} aria-label="Media slider">
                    {media.length > 1 && (
                        <>
                            <button
                                type="button"
                                className={`${slider.arrow} ${slider.arrowLeft}`}
                                onClick={goPrev}
                                aria-label="Previous slide"
                            />
                            <button
                                type="button"
                                className={`${slider.arrow} ${slider.arrowRight}`}
                                onClick={goNext}
                                aria-label="Next slide"
                            />
                        </>
                    )}

                    <div
                        className={slider.ratioBox}
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (media.length <= 1) return;
                            if (e.key === "ArrowLeft") {
                                e.preventDefault();
                                goPrev();
                            }
                            if (e.key === "ArrowRight") {
                                e.preventDefault();
                                goNext();
                            }
                        }}
                        onTouchStart={onTouchStart}
                        onTouchEnd={onTouchEnd}
                    >
                        <div
                            className={slider.track}
                            style={{ transform: `translateX(-${index * 100}%)` }}
                        >
                            {media.map((item, i) => (
                                <div className={slider.slide} key={i}>
                                    {item.type === "image" ? (
                                        <img
                                            src={item.src}
                                            alt={item.alt || ""}
                                            className={unstyledImage ? undefined : styles.image}
                                        />
                                    ) : (
                                        <div className={slider.videoWrap}>
                                            <video
                                                ref={i === index ? videoRef : null}
                                                src={item.src}
                                                poster={item.poster}
                                                playsInline
                                                preload="none"
                                                muted // ✅ start w stanie muted; odmutowujemy po kliknięciu
                                                controls={i === index && videoStarted}
                                                className={slider.video}
                                                onEnded={() => {
                                                    const v = videoRef.current;
                                                    if (!v) return;
                                                    try {
                                                        v.pause();
                                                        v.currentTime = 0;
                                                        v.load(); // ✅ wróć do poster
                                                    } catch { }
                                                    setVideoStarted(false);
                                                }}
                                            >
                                                {item.captionTrackSrc && (
                                                    <track
                                                        kind="captions"
                                                        src={item.captionTrackSrc}
                                                        srcLang={item.captionTrackLang || "en"}
                                                        label={item.captionTrackLabel || "English"}
                                                        default
                                                    />
                                                )}
                                            </video>

                                            {i === index && isActiveVideo && !videoStarted && (
                                                <button
                                                    type="button"
                                                    className={slider.playOverlay}
                                                    onClick={playWithSound}
                                                    aria-label="Play video"
                                                >
                                                    <span className={slider.playTriangle} aria-hidden />
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {media.length > 1 && (
                        <div className={slider.dots} aria-label="Slider pagination">
                            {media.map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    className={`${slider.dot} ${i === index ? slider.dotActive : ""}`}
                                    onClick={() => goTo(i)}
                                    aria-label={`Go to slide ${i + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.content}>{children}</div>
            </div>
        </div>
    );
}
