export const MAX_INTRO_VIDEO_SECONDS = 30;
export const MAX_INTRO_VIDEO_SIZE_BYTES = 40 * 1024 * 1024;

export const ALLOWED_INTRO_VIDEO_MIME_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime"
];

export function isAllowedIntroVideoType(file) {
  const mime = String(file?.type || "").toLowerCase();
  return ALLOWED_INTRO_VIDEO_MIME_TYPES.includes(mime);
}

export function validateIntroVideoFileBasics(file) {
  if (!file) {
    return "Please choose a video file.";
  }

  if (!isAllowedIntroVideoType(file)) {
    return "Unsupported video format. Please upload MP4, WebM, or MOV.";
  }

  if (file.size > MAX_INTRO_VIDEO_SIZE_BYTES) {
    return "Video file is too large. Please upload a file up to 40 MB.";
  }

  return null;
}

export function validateIntroVideoDuration(durationSeconds) {
  if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) {
    return "Could not read video length. Please choose a different file.";
  }

  if (durationSeconds > MAX_INTRO_VIDEO_SECONDS) {
    return "Video is too long. Please upload a clip up to 30 seconds.";
  }

  return null;
}

export function readVideoDurationSeconds(file) {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const video = document.createElement("video");

    const cleanup = () => {
      URL.revokeObjectURL(objectUrl);
      video.removeAttribute("src");
      video.load();
    };

    video.preload = "metadata";
    video.onloadedmetadata = () => {
      const duration = Number(video.duration);
      cleanup();
      resolve(duration);
    };

    video.onerror = () => {
      cleanup();
      reject(new Error("video_metadata_read_failed"));
    };

    video.src = objectUrl;
  });
}
