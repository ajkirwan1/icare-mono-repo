import { requestApiJson } from "./http-client.js";

function toNonEmptyString(value, fallback = "") {
    const normalized = String(value || "").trim();
    return normalized || fallback;
}

function normalizeRecommendedCaregiver(item, index) {
    if (!item || typeof item !== "object") {
        return null;
    }

    const id = toNonEmptyString(item.id, `recommended-${index + 1}`);
    const name = toNonEmptyString(item.name, "Caregiver");
    const imgSrc = toNonEmptyString(item.imgSrc || item.avatarUrl || item.avatar || item.photoUrl, "/images/web/icare-for-carereceivers/senior-placeholder.webp");
    const imgAlt = toNonEmptyString(item.imgAlt, `${name} profile photo`);
    const bio = toNonEmptyString(item.bio || item.summary, "No profile summary provided yet.");

    return { id, name, imgSrc, imgAlt, bio };
}

function toRecommendedCaregiverList(payload) {
    const rawList = Array.isArray(payload)
        ? payload
        : (Array.isArray(payload?.caregivers) ? payload.caregivers : []);

    return rawList
        .map((item, index) => normalizeRecommendedCaregiver(item, index))
        .filter(Boolean);
}

export async function getRecommendedCaregivers({ signal } = {}) {
    const endpoints = [
        "/api/v1/care-receiver/recommended-caregivers",
        "/api/v1/caregivers/recommended",
        "/api/recommended-caregivers"
    ];
    const errors = [];

    for (const endpoint of endpoints) {
        try {
            const payload = await requestApiJson(endpoint, {
                signal,
                errorLabel: "Recommended caregivers request failed.",
                networkErrorHint: "Could not connect to recommended caregivers API."
            });
            return toRecommendedCaregiverList(payload);
        } catch (error) {
            if (error?.name === "AbortError") {
                throw error;
            }
            errors.push(error instanceof Error ? error.message : String(error));
        }
    }

    throw new Error(errors[0] || "Recommended caregivers request failed.");
}
