const DEFAULT_API = "http://localhost:4001";

function getApiBase() {
  return import.meta.env.VITE_API_URL || DEFAULT_API;
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
    throw new Error(data?.message || data?.error || "Could not load profile data.");
  }

  return data;
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

    xhr.open("PUT", `${getApiBase()}/api/caregiver-profiles/${encodeURIComponent(profileId)}/intro-video`);
    xhr.setRequestHeader("Content-Type", file.type);
    xhr.setRequestHeader("x-file-name", file.name);
    xhr.setRequestHeader("x-video-duration-sec", String(durationSec));
    xhr.setRequestHeader("x-user-role", userRole);
    xhr.setRequestHeader("x-user-id", userId);

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

      reject(new Error(data?.message || data?.error || "Upload failed. Please try again."));
    };

    xhr.send(file);
  });
}

export async function removeCaregiverIntroVideo({ profileId, userRole, userId }) {
  const response = await fetch(`${getApiBase()}/api/caregiver-profiles/${encodeURIComponent(profileId)}/intro-video`, {
    method: "DELETE",
    headers: {
      "x-user-role": userRole,
      "x-user-id": userId
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || data?.error || "Could not remove intro video.");
  }

  return data;
}
