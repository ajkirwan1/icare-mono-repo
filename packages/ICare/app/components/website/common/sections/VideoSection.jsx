import { useRef, useState } from "react";
import styles from "./video-section.module.scss";

export default function VideoSection({
    videoSrc,
    poster,
    imageSide = "left", // "left" | "right"
    children,
}) {
    const isRight = imageSide === "right";
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = async () => {
        const v = videoRef.current;
        if (!v) return;

        try {
            if (v.paused) {
                await v.play(); // plays with sound if allowed (after user click)
                setIsPlaying(true);
            } else {
                v.pause();
                setIsPlaying(false);
            }
        } catch {
            // autoplay policies etc. (should be fine because it's user click)
        }
    };

    const onEnded = () => setIsPlaying(false);

    return (
        <div className={styles.container}>
            <div className={`${styles.grid} ${isRight ? styles.reverse : ""}`}>
                <div
                    className={styles.mediaWrap}
                    style={{
                        overflow: "hidden",
                    }}
                >
                    <video
                        className={styles.video}
                        ref={videoRef}
                        src={videoSrc}
                        poster={poster}
                        controls
                        playsInline
                        preload="metadata"
                    />
                </div>

                <div className={styles.content}>{children}</div>
            </div>
        </div>
    );

}
