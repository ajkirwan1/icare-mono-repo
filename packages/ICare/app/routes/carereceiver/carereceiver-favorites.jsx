import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import RatingStars from "./rating-stars";
import "./carereceiver-pages.css";
import { readFavoriteCaregivers, writeFavoriteCaregivers } from "./favorites-storage";

function initials(name) {
    return String(name)
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

export default function CarereceiverFavorites() {
    const [favorites, setFavorites] = useState(() => readFavoriteCaregivers());

    useEffect(() => {
        writeFavoriteCaregivers(favorites);
    }, [favorites]);

    const sortedFavorites = useMemo(() => {
        const list = [...favorites];
        list.sort((left, right) => new Date(right.addedAt).getTime() - new Date(left.addedAt).getTime());
        return list;
    }, [favorites]);

    function handleRemove(id) {
        setFavorites((prev) => prev.filter((entry) => entry.id !== id));
    }

    return (
        <div className="cr-page">
            <div className="cr-shell">
                <nav className="cr-breadcrumbs" aria-label="Breadcrumb navigation">
                    <Link to="/carereceiver/dashboard">Dashboard</Link><span>›</span>
                    <Link to="/carereceiver/search">Search</Link><span>›</span>
                    <strong>Favorites</strong>
                </nav>

                <section className="cr-card">
                    <div className="cr-inline" style={{ justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                            <h1 style={{ margin: 0 }}>Favorite Caregivers</h1>
                            <p className="cr-muted" style={{ margin: "6px 0 0" }}>
                                {sortedFavorites.length} saved {sortedFavorites.length === 1 ? "caregiver" : "caregivers"}
                            </p>
                        </div>
                        <Link className="cr-button cr-button--secondary" to="/carereceiver/search">
                            Back to Search
                        </Link>
                    </div>
                </section>

                {sortedFavorites.length === 0 ? (
                    <section className="cr-card">
                        <h3 style={{ marginTop: 0 }}>No favorites yet</h3>
                        <p className="cr-muted" style={{ marginBottom: "12px" }}>
                            Add caregivers from search results and they will appear here.
                        </p>
                        <Link className="cr-button cr-button--primary" to="/carereceiver/search">
                            Find Caregivers
                        </Link>
                    </section>
                ) : (
                    <section className="cr-results-grid">
                        {sortedFavorites.map((caregiver) => (
                            <article key={caregiver.id} className="cr-card cr-caregiver-card">
                                <div className="cr-inline" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                                    <div className="cr-avatar cr-caregiver-avatar">{initials(caregiver.name)}</div>
                                    <button
                                        type="button"
                                        className="cr-heart-btn is-active"
                                        aria-label={`Remove ${caregiver.name} from favorites`}
                                        onClick={() => handleRemove(caregiver.id)}
                                    >
                                        <span className="cr-heart-glyph" aria-hidden="true">♥</span>
                                    </button>
                                </div>

                                <h3 style={{ marginBottom: "4px" }}>{caregiver.name}</h3>
                                <p className="cr-row-sub" style={{ marginBottom: "8px" }}>
                                    {caregiver.location}
                                    {Number.isFinite(caregiver.distanceMiles) ? ` • ${caregiver.distanceMiles.toFixed(1)} miles` : ""}
                                </p>

                                <p className="cr-row-sub cr-rating-line" style={{ marginBottom: "8px" }}>
                                    <span className="cr-stars-inline">
                                        <RatingStars value={caregiver.rating} />
                                    </span>
                                    <span>{caregiver.rating} ({caregiver.reviewCount})</span>
                                </p>

                                <p style={{ margin: "0 0 8px", fontWeight: 700 }}>£{caregiver.hourlyRate}/hour</p>

                                {caregiver.services.length > 0 ? (
                                    <div className="cr-inline" style={{ marginBottom: "10px" }}>
                                        {caregiver.services.map((service) => (
                                            <span key={`${caregiver.id}-${service}`} className="cr-chip cr-chip--green">{service}</span>
                                        ))}
                                    </div>
                                ) : null}

                                {caregiver.badges.length > 0 ? (
                                    <div className="cr-inline" style={{ marginBottom: "10px" }}>
                                        {caregiver.badges.map((badge) => (
                                            <span key={`${caregiver.id}-${badge}`} className="cr-chip cr-chip--blue">{badge}</span>
                                        ))}
                                    </div>
                                ) : null}

                                {caregiver.languages ? (
                                    <p className="cr-row-sub" style={{ marginBottom: "10px" }}>Languages: {caregiver.languages}</p>
                                ) : null}

                                <div className="cr-grid" style={{ gap: "8px" }}>
                                    <Link className="cr-button cr-button--primary" to={`/carereceiver/caregivers/${caregiver.id}`}>
                                        View Profile
                                    </Link>
                                    <button type="button" className="cr-favorite-action is-active" onClick={() => handleRemove(caregiver.id)}>
                                        ♥ Remove from favorites
                                    </button>
                                </div>
                            </article>
                        ))}
                    </section>
                )}
            </div>
        </div>
    );
}
