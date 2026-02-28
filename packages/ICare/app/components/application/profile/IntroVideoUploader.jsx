import { useRef, useState } from "react";
import {
  validateIntroVideoDuration,
  validateIntroVideoFileBasics,
  readVideoDurationSeconds
} from "~/utils/intro-video-validation";
import styles from "./intro-video-uploader.module.scss";

export default function IntroVideoUploader({
  canEdit,
  introVideoUrl,
  introVideoDurationSec,
  onUpload,
  onRemove
}) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");

  const hasVideo = Boolean(introVideoUrl);

  const openFilePicker = () => {
    if (!canEdit || uploading) {
      return;
    }
    inputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    const basicError = validateIntroVideoFileBasics(file);
    if (basicError) {
      setError(basicError);
      return;
    }

    setError("");

    try {
      const durationSec = await readVideoDurationSeconds(file);
      const durationError = validateIntroVideoDuration(durationSec);

      if (durationError) {
        setError(durationError);
        return;
      }

      setUploading(true);
      setUploadProgress(0);
      await onUpload(file, durationSec, setUploadProgress);
      setUploadProgress(100);
    } catch (uploadError) {
      setError(uploadError?.message || "Could not upload video.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    if (!canEdit || uploading) {
      return;
    }

    setError("");
    try {
      await onRemove();
      setUploadProgress(0);
    } catch (removeError) {
      setError(removeError?.message || "Could not remove video.");
    }
  };

  return (
    <div className={styles.wrap}>
      <p className={styles.helper}>Upload a short video (up to 30 seconds). Keep it friendly and simple.</p>

      {hasVideo ? (
        <div className={styles.playerWrap}>
          <video className={styles.player} src={introVideoUrl} controls preload="metadata" poster="/images/avatars/female.webp" />
          {introVideoDurationSec ? (
            <p className={styles.meta}>Duration: {Math.round(introVideoDurationSec)}s</p>
          ) : null}
        </div>
      ) : (
        <div className={styles.emptyState} role="status" aria-live="polite">
          <img src="/images/avatars/female.webp" alt="Caregiver avatar placeholder" />
          <p>Upload your video here</p>
          {canEdit ? (
            <button type="button" className={styles.primaryBtn} onClick={openFilePicker} disabled={uploading}>
              Upload video
            </button>
          ) : null}
        </div>
      )}

      {canEdit ? (
        <>
          <input
            ref={inputRef}
            type="file"
            accept="video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov"
            className={styles.hiddenInput}
            onChange={handleFileChange}
          />

          <div className={styles.actions}>
            {hasVideo ? (
              <button type="button" className={styles.primaryBtn} onClick={openFilePicker} disabled={uploading}>
                Replace video
              </button>
            ) : null}
            {hasVideo ? (
              <button type="button" className={styles.secondaryBtn} onClick={handleRemove} disabled={uploading}>
                Remove video
              </button>
            ) : null}
          </div>

          {uploading ? (
            <div className={styles.progressWrap}>
              <div className={styles.progressBar}>
                <span style={{ width: `${uploadProgress}%` }} />
              </div>
              <p className={styles.progressText}>Uploading: {uploadProgress}%</p>
            </div>
          ) : null}

          {error ? <p className={styles.error}>{error}</p> : null}
        </>
      ) : null}
    </div>
  );
}
