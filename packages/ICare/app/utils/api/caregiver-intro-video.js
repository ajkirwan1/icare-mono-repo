const DEFAULT_API = "http://localhost:4001";

function getApiBase() {
  return import.meta.env.VITE_API_URL || DEFAULT_API;
}

function readStoredViewer() {
  if (typeof window === "undefined") {
    return { id: "", role: "" };
  }

  try {
    const raw = window.localStorage.getItem("icare_user");
    const parsed = raw ? JSON.parse(raw) : null;
    return {
      id: String(parsed?.id || "").trim(),
      role: String(parsed?.userType || "").trim().toLowerCase()
    };
  } catch {
    return { id: "", role: "" };
  }
}

function resolveViewerHeaders({ profileId, userRole = "", userId = "" } = {}) {
  const stored = readStoredViewer();
  const resolvedRole = String(userRole || stored.role || "caregiver").trim().toLowerCase();
  const resolvedId = String(userId || stored.id || profileId || "").trim();

  return {
    "x-user-role": resolvedRole,
    "x-user-id": resolvedId
  };
}

function toResponseError(payload, fallback) {
  return payload?.message || payload?.error || fallback;
}

function parseResponsePayload(xhr) {
  try {
    return xhr.responseText ? JSON.parse(xhr.responseText) : {};
  } catch {
    return {};
  }
}

export async function fetchCaregiverProfile(profileId) {
  const response = await fetch(`${getApiBase()}/api/caregiver-profiles/${encodeURIComponent(profileId)}/public`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(toResponseError(data, "Could not load profile data."));
  }

  return data;
}

export async function saveCaregiverProfile({
  profileId,
  profileData,
  userRole,
  userId
}) {
  const headers = {
    "Content-Type": "application/json",
    ...resolveViewerHeaders({ profileId, userRole, userId })
  };

  const response = await fetch(`${getApiBase()}/api/caregiver-profiles/${encodeURIComponent(profileId)}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ profileData: profileData || {} })
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(toResponseError(data, "Could not save profile."));
  }

  return data;
}

export function uploadCaregiverProfilePhoto({
  profileId,
  file,
  mimeType,
  userRole,
  userId,
  onProgress
}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const viewerHeaders = resolveViewerHeaders({ profileId, userRole, userId });
    const extension = String(file?.name || "").split(".").pop()?.trim().toLowerCase() || "";
    const extensionFallbackMime = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      webp: "image/webp"
    };
    const resolvedMime = String(mimeType || file?.type || extensionFallbackMime[extension] || "").trim().toLowerCase();

    xhr.open("PUT", `${getApiBase()}/api/caregiver-profiles/${encodeURIComponent(profileId)}/photo`);
    xhr.setRequestHeader("Content-Type", resolvedMime || "application/octet-stream");
    xhr.setRequestHeader("x-file-name", file.name);
    xhr.setRequestHeader("x-user-role", viewerHeaders["x-user-role"]);
    xhr.setRequestHeader("x-user-id", viewerHeaders["x-user-id"]);

    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable || typeof onProgress !== "function") {
        return;
      }
      onProgress(Math.round((event.loaded / event.total) * 100));
    };

    xhr.onerror = () => {
      reject(new Error("Photo upload failed. Please try again."));
    };

    xhr.onload = () => {
      const data = parseResponsePayload(xhr);
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(data);
        return;
      }
      reject(new Error(toResponseError(data, "Photo upload failed. Please try again.")));
    };

    xhr.send(file);
  });
}

export function uploadCaregiverIntroVideo({
  profileId,
  userRole,
  userId,
  file,
  durationSec,
  onProgress
}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const viewerHeaders = resolveViewerHeaders({ profileId, userRole, userId });

    xhr.open("PUT", `${getApiBase()}/api/caregiver-profiles/${encodeURIComponent(profileId)}/intro-video`);
    xhr.setRequestHeader("Content-Type", file.type);
    xhr.setRequestHeader("x-file-name", file.name);
    xhr.setRequestHeader("x-video-duration-sec", String(durationSec));
    xhr.setRequestHeader("x-user-role", viewerHeaders["x-user-role"]);
    xhr.setRequestHeader("x-user-id", viewerHeaders["x-user-id"]);

    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable || typeof onProgress !== "function") {
        return;
      }
      onProgress(Math.round((event.loaded / event.total) * 100));
    };

    xhr.onerror = () => {
      reject(new Error("Upload failed. Please try again."));
    };

    xhr.onload = () => {
      const data = parseResponsePayload(xhr);

      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(data);
        return;
      }

      reject(new Error(toResponseError(data, "Upload failed. Please try again.")));
    };

    xhr.send(file);
  });
}

export async function removeCaregiverIntroVideo({ profileId, userRole, userId }) {
  const headers = resolveViewerHeaders({ profileId, userRole, userId });
  const response = await fetch(`${getApiBase()}/api/caregiver-profiles/${encodeURIComponent(profileId)}/intro-video`, {
    method: "DELETE",
    headers
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(toResponseError(data, "Could not remove intro video."));
  }

  return data;
}
