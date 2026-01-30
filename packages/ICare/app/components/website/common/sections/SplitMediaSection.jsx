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

    const clearTimer = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const scheduleNext = useCallback(() => {
        clearTimer();
        if (media.length <= 1) return;

        timerRef.current = setTimeout(() => {
            setIndex((i) => (i + 1) % media.length);
        }, 8000);
    }, [clearTimer, media.length]);

    const goTo = (i) => {
        setIndex(i);
        scheduleNext(); // reset autoplay after manual change
    };

    // run autoplay; reset after every index change
    useEffect(() => {
        scheduleNext();
        return () => clearTimer();
    }, [index, scheduleNext, clearTimer]);

    // video: restart from beginning when video slide becomes active
    useEffect(() => {
        const active = media[index];
        if (active?.type !== "video") return;

        const v = videoRef.current;
        if (!v) return;

        v.muted = true;
        v.playsInline = true;

        try {
            v.pause();
            v.currentTime = 0;
        } catch { }

        v.play().catch(() => { });
    }, [index, media]);

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
                                        <video
                                            ref={i === index ? videoRef : null}
                                            src={item.src}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            preload="auto"
                                            className={slider.video}
                                        />
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
                                    className={`${slider.dot} ${i === index ? slider.dotActive : ""
                                        }`}
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
