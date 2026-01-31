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

    // autoplay timer (resettable)
    const timerRef = useRef(null);

    // autoplay enabled/disabled (disabled after clicking Play on video)
    const [autoEnabled, setAutoEnabled] = useState(true);

    // whether current video slide has started (to show/hide overlay + enable controls)
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

    const goTo = (i) => {
        setIndex(i);
        // reset autoplay timer (only if enabled)
        scheduleNext();
    };

    // run autoplay; reset after every index change (respects autoEnabled)
    useEffect(() => {
        scheduleNext();
        return () => clearTimer();
    }, [index, scheduleNext, clearTimer]);

    // when slide changes: stop/reset video + reset overlay state
    // AND: if we moved to a non-video slide, allow autoplay again
    useEffect(() => {
        setVideoStarted(false);

        const v = videoRef.current;
        if (v) {
            try {
                v.pause();
                v.currentTime = 0;
            } catch { }
        }

        const active = media[index];
        if (active?.type !== "video") {
            setAutoEnabled(true); // autoplay may return on non-video slides
        }
    }, [index, media]);

    const playWithSound = async () => {
        const active = media[index];
        if (active?.type !== "video") return;

        // user clicked play => disable autoplay completely and stop timer
        setAutoEnabled(false);
        clearTimer();

        const v = videoRef.current;
        if (!v) return;

        v.muted = false;
        v.playsInline = true;

        try {
            await v.play();
            setVideoStarted(true);
        } catch {
            setVideoStarted(false);
        }
    };

    const isActiveVideo = media[index]?.type === "video";

    return (
        <div className={styles.container}>
            <div className={`${styles.grid} ${isRight ? styles.reverse : ""}`}>
                <div className={slider.mediaWrap}>
                    <div className={slider.ratioBox}>
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
                                                poster="/images/web/icare-for-carereceivers/video-placeholder.webp"
                                                playsInline
                                                preload="metadata"
                                                controls={i === index && videoStarted}
                                                className={slider.video}
                                                onEnded={() => {
                                                    const v = videoRef.current;
                                                    if (!v) return;
                                                    try {
                                                        v.pause();
                                                        v.currentTime = 0;
                                                    } catch { }
                                                    setVideoStarted(false);
                                                }}
                                            />


                                            {/* Big play overlay (only when active video slide and not started) */}
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
