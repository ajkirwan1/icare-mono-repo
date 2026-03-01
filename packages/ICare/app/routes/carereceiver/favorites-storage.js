const FAVORITES_STORAGE_KEY = "icare_carereceiver_favorites_v1";

function normalizeFavorite(rawFavorite) {
    const id = String(rawFavorite?.id || "").trim();
    if (!id) {
        return null;
    }

    return {
        id,
        name: String(rawFavorite?.name || "Caregiver").trim(),
        location: String(rawFavorite?.location || "").trim(),
        distanceMiles: Number(rawFavorite?.distanceMiles || 0),
        hourlyRate: Number(rawFavorite?.hourlyRate || 0),
        rating: Number(rawFavorite?.rating || 0),
        reviewCount: Number(rawFavorite?.reviewCount || 0),
        languages: String(rawFavorite?.languages || "").trim(),
        services: Array.isArray(rawFavorite?.services) ? rawFavorite.services.map((entry) => String(entry)).filter(Boolean) : [],
        badges: Array.isArray(rawFavorite?.badges) ? rawFavorite.badges.map((entry) => String(entry)).filter(Boolean) : [],
        addedAt: rawFavorite?.addedAt || new Date().toISOString()
    };
}

export function readFavoriteCaregivers() {
    if (typeof window === "undefined") {
        return [];
    }

    try {
        const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
        if (!raw) {
            return [];
        }

        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) {
            return [];
        }

        const normalized = parsed
            .map(normalizeFavorite)
            .filter(Boolean);

        const uniqueById = new Map();
        normalized.forEach((entry) => {
            uniqueById.set(entry.id, entry);
        });

        return Array.from(uniqueById.values());
    } catch {
        return [];
    }
}

export function writeFavoriteCaregivers(favorites) {
    if (typeof window === "undefined") {
        return;
    }

    const normalized = Array.isArray(favorites)
        ? favorites.map(normalizeFavorite).filter(Boolean)
        : [];

    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(normalized));
}

export function toggleFavoriteCaregiver(currentFavorites, caregiver) {
    const normalized = normalizeFavorite(caregiver);
    if (!normalized) {
        return Array.isArray(currentFavorites) ? currentFavorites : [];
    }

    const list = Array.isArray(currentFavorites) ? currentFavorites : [];
    const alreadyExists = list.some((entry) => entry.id === normalized.id);
    if (alreadyExists) {
        return list.filter((entry) => entry.id !== normalized.id);
    }

    return [{ ...normalized, addedAt: new Date().toISOString() }, ...list];
}
