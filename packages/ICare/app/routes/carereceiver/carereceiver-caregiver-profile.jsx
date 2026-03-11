import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import "./carereceiver-pages.css";

// icon for verification rows
import { FiCheck, FiHeart } from "react-icons/fi";
import RatingStars from "./rating-stars";
import { getCaregiverPublicProfile, getCaregiverReviews } from "./bookings/bookings-api-client";
import {
    readFavoriteCaregivers,
    toggleFavoriteCaregiver,
    writeFavoriteCaregivers
} from "./favorites-storage";

const CAREGIVER = {
    id: "cg-001",
    name: "Sarah Thompson",
    location: "SW1A area",
    distance: "1.2 miles from you",
    hourlyRate: 18,
    rating: 4.8,
    reviewCount: 24,
    experience: "5 years of experience in elderly care",
    languages: "English, Polish",
    interests: "Gardening, reading, gentle walks, cooking, board games",
    transportation: "Has own vehicle",
    about:
        "I'm a friendly and experienced companion with over 5 years of caring experience. I love chatting, going for walks, and helping with everyday tasks. I have a special interest in gardening and board games!",
    services: [
        { name: "Companionship", description: "Conversation, activities, social support" },
        { name: "Light housework", description: "Cleaning, tidying, laundry (no heavy lifting)" },
        { name: "Shopping and errands", description: "Grocery shopping, pharmacy visits, post office" },
        { name: "Meal preparation", description: "Preparing meals (no feeding or eating assistance)" },
        { name: "Transportation", description: "Transport to appointments, social outings" }
    ],
    verificationItems: ["Identity Verified", "Enhanced DBS Check", "References Checked", "Right to Work"]
};

const CAREGIVER_OVERRIDES = {
    "cg-001": {
        name: "Sarah Thompson",
        location: "SW1A area",
        distance: "1.2 miles from you",
        hourlyRate: 18,
        rating: 4.8,
        reviewCount: 24,
        languages: "English, Polish"
    },
    "cg-002": {
        name: "Mary Johnson",
        location: "W1H area",
        distance: "2.4 miles from you",
        hourlyRate: 17,
        rating: 4.8,
        reviewCount: 19,
        languages: "English"
    },
    "cg-003": {
        name: "Emma Collins",
        location: "SE1 area",
        distance: "3.1 miles from you",
        hourlyRate: 20,
        rating: 4.7,
        reviewCount: 14,
        languages: "English, Romanian"
    },
    "cg-004": {
        name: "Anna Nowak",
        location: "N1 area",
        distance: "3.8 miles from you",
        hourlyRate: 16,
        rating: 4.6,
        reviewCount: 11,
        languages: "English, Polish"
    },
    "cg-005": {
        name: "Tom Richards",
        location: "EC1 area",
        distance: "4.4 miles from you",
        hourlyRate: 19,
        rating: 4.8,
        reviewCount: 22,
        languages: "English"
    },
    "cg-006": {
        name: "Lina Patel",
        location: "E2 area",
        distance: "5.0 miles from you",
        hourlyRate: 18,
        rating: 4.9,
        reviewCount: 31,
        languages: "English, Hindi"
    },
    "cg-007": {
        name: "Margaret Shaw",
        location: "NW1 area",
        distance: "2.1 miles from you",
        hourlyRate: 19,
        rating: 4.9,
        reviewCount: 16,
        languages: "English"
    }
};

function resolveCaregiverProfile(caregiverId) {
    const normalizedId = String(caregiverId || CAREGIVER.id).trim() || CAREGIVER.id;
    return {
        ...CAREGIVER,
        ...CAREGIVER_OVERRIDES[normalizedId],
        id: normalizedId
    };
}

const FALLBACK_REVIEWS = [
    { id: "rv-1", name: "Margaret H.", date: "15 Jan 2026", dateISO: "2026-01-15", rating: 5, text: "Wonderful caregiver, very reliable and caring. Highly recommended." },
    { id: "rv-2", name: "David P.", date: "28 Dec 2025", dateISO: "2025-12-28", rating: 4, text: "Very professional and kind, communication was excellent." },
    { id: "rv-3", name: "Linda K.", date: "10 Nov 2025", dateISO: "2025-11-10", rating: 5, text: "Always punctual and brings calm energy. Great with routines." },
    { id: "rv-4", name: "John C.", date: "25 Oct 2025", dateISO: "2025-10-25", rating: 5, text: "Excellent communication before and during every visit." },
    { id: "rv-5", name: "Eleanor T.", date: "14 Sep 2025", dateISO: "2025-09-14", rating: 4, text: "Very kind and patient, made my mother feel comfortable quickly." },
    { id: "rv-6", name: "Paul R.", date: "30 Aug 2025", dateISO: "2025-08-30", rating: 5, text: "Dependable and warm personality. We will book again." }
];

const SIMILAR = [
    { id: "cg-002", name: "Mary Johnson", rate: 16, rating: 4.5 },
    { id: "cg-003", name: "Emma Collins", rate: 20, rating: 5.0 }
];

function initials(name) {
    return String(name)
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

const CALENDAR_ROWS = [
    [null, null, null, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25],
    [26, 27, 28, null, null, null, null]
];

export default function CarereceiverCaregiverProfile() {
    const { caregiverId } = useParams();
    const activeCaregiverId = caregiverId || CAREGIVER.id;
    const caregiver = useMemo(() => resolveCaregiverProfile(activeCaregiverId), [activeCaregiverId]);
    const bookingUrl = `/carereceiver/bookings/new/${caregiver.id}`;
    const [sortMode, setSortMode] = useState("newest");
    const [visibleReviewCount, setVisibleReviewCount] = useState(3);
    const [favoriteCaregivers, setFavoriteCaregivers] = useState(() => readFavoriteCaregivers());
    const [reviewState, setReviewState] = useState({
        loading: true,
        reviews: [],
        summary: null,
        usedFallback: false
    });
    const [responseMetrics, setResponseMetrics] = useState(null);
    const [introVideoUrl, setIntroVideoUrl] = useState("");
    const [loadingIntroVideo, setLoadingIntroVideo] = useState(true);
    const introVideoRef = useRef(null);
    const isFavorite = useMemo(
        () => favoriteCaregivers.some((entry) => entry.id === caregiver.id),
        [favoriteCaregivers, caregiver.id]
    );

    useEffect(() => {
        writeFavoriteCaregivers(favoriteCaregivers);
    }, [favoriteCaregivers]);

    useEffect(() => {
        setVisibleReviewCount(3);
    }, [activeCaregiverId, sortMode]);

    useEffect(() => {
        const controller = new AbortController();
        let mounted = true;

        async function loadReviews() {
            setReviewState((prev) => ({ ...prev, loading: true }));
            try {
                const payload = await getCaregiverReviews(activeCaregiverId, {
                    signal: controller.signal,
                    sort: sortMode === "highest" ? "highest" : "newest",
                    limit: 100
                });
                if (!mounted) {
                    return;
                }

                setReviewState({
                    loading: false,
                    reviews: Array.isArray(payload?.reviews) ? payload.reviews : [],
                    summary: payload?.summary || null,
                    usedFallback: false
                });
            } catch {
                if (!mounted) {
                    return;
                }

                setReviewState({
                    loading: false,
                    reviews: FALLBACK_REVIEWS,
                    summary: {
                        averageRating: caregiver.rating,
                        reviewCount: FALLBACK_REVIEWS.length,
                        distribution: { 1: 2, 2: 3, 3: 10, 4: 25, 5: 60 }
                    },
                    usedFallback: true
                });
            }
        }

        loadReviews();

        return () => {
            mounted = false;
            controller.abort();
        };
    }, [activeCaregiverId, caregiver.rating, sortMode]);

    useEffect(() => {
        const controller = new AbortController();
        let mounted = true;

        async function loadResponseMetrics() {
            try {
                const payload = await getCaregiverPublicProfile(activeCaregiverId, {
                    signal: controller.signal
                });
                if (!mounted) {
                    return;
                }

                const metrics = payload?.responseMetrics && typeof payload.responseMetrics === "object"
                    ? payload.responseMetrics
                    : null;
                const resolvedIntroVideoUrl = String(
                    payload?.introVideoUrl ||
                    payload?.introVideo?.url ||
                    payload?.profile?.introVideoUrl ||
                    ""
                ).trim();
                setResponseMetrics(metrics);
                setIntroVideoUrl(resolvedIntroVideoUrl);
                setLoadingIntroVideo(false);
            } catch {
                if (!mounted) {
                    return;
                }
                setResponseMetrics(null);
                setIntroVideoUrl("");
                setLoadingIntroVideo(false);
            }
        }

        loadResponseMetrics();

        return () => {
            mounted = false;
            controller.abort();
        };
    }, [activeCaregiverId]);

    const sortedReviews = useMemo(() => {
        return Array.isArray(reviewState.reviews) ? reviewState.reviews : [];
    }, [reviewState.reviews]);

    const visibleReviews = sortedReviews.slice(0, visibleReviewCount);
    const canShowMoreReviews = visibleReviewCount < sortedReviews.length;
    const summary = reviewState.summary;
    const displayRating = summary ? Number(summary.averageRating || 0) : caregiver.rating;
    const displayReviewCount = summary ? Number(summary.reviewCount || 0) : caregiver.reviewCount;
    const ratingDistribution = summary?.distribution || { 1: 2, 2: 3, 3: 10, 4: 25, 5: 60 };
    const acceptanceRateText = Number.isFinite(Number(responseMetrics?.acceptanceRate))
        ? `${Math.round(Number(responseMetrics.acceptanceRate) * 100)}%`
        : "";
    const averageResponseHours = Number(responseMetrics?.averageResponseTimeHours);
    const responseTimeText = Number.isFinite(averageResponseHours)
        ? `Usually within ${Math.max(1, Math.round(averageResponseHours))} hours`
        : "";
    const showResponseStats = Boolean(responseMetrics && acceptanceRateText && responseTimeText);
    const hasIntroVideo = introVideoUrl.length > 0;

    function handleOpenVideoFullscreen() {
        const videoElement = introVideoRef.current;
        if (!videoElement) {
            return;
        }

        if (typeof videoElement.requestFullscreen === "function") {
            videoElement.requestFullscreen();
            return;
        }

        if (typeof videoElement.webkitEnterFullscreen === "function") {
            videoElement.webkitEnterFullscreen();
        }
    }

    function handleToggleFavorite() {
        setFavoriteCaregivers((current) => toggleFavoriteCaregiver(current, {
            id: caregiver.id,
            name: caregiver.name,
            location: caregiver.location,
            distanceMiles: Number.parseFloat(String(caregiver.distance || "").split(" ")[0]) || 0,
            hourlyRate: caregiver.hourlyRate,
            rating: displayRating,
            reviewCount: displayReviewCount,
            languages: caregiver.languages,
            services: Array.isArray(caregiver.services) ? caregiver.services.map((service) => service.name) : [],
            badges: ["DBS Verified", "ID Verified", "Right to Work Verified"]
        }));
    }

    return (
        <div className="cr-page cr-page--caregiver-profile">
            <div className="cr-shell cr-shell--caregiver-profile">
                <nav className="cr-breadcrumbs" aria-label="Breadcrumb navigation">
                    <Link to="/carereceiver/dashboard">Dashboard</Link><span>›</span>
                    <Link to="/carereceiver/search">Search</Link><span>›</span>
                    <strong>{caregiver.name}</strong>
                </nav>

                <Link className="cr-back-link" to="/carereceiver/search">← Back to Search Results</Link>

                <section className="cr-card cr-profile-hero">
                    <div className="cr-avatar cr-profile-avatar">{initials(caregiver.name)}</div>

                    <div>
                        <h1 style={{ margin: "0 0 6px" }}>{caregiver.name}</h1>
                        <p className="cr-muted" style={{ margin: "0 0 8px" }}>{caregiver.location} • {caregiver.distance}</p>
                        <p className="cr-muted cr-rating-line" style={{ margin: "0 0 8px" }}>
                            <span className="cr-stars-inline"><RatingStars value={displayRating} /></span>
                            <span>{displayRating.toFixed(1)} ({displayReviewCount} reviews)</span>
                        </p>
                        <p style={{ margin: "0 0 10px", fontWeight: 700 }}>£{caregiver.hourlyRate}/hour</p>
                        <div className="cr-inline">
                            <span className="cr-chip cr-chip--green">DBS Verified</span>
                            <span className="cr-chip cr-chip--blue">ID Verified</span>
                            <span className="cr-chip cr-chip--orange">Right to Work Verified</span>
                        </div>
                    </div>

                    <div className="cr-profile-hero-actions">
                        <div className="cr-grid" style={{ gap: "8px" }}>
                            <button
                                type="button"
                                className={`cr-favorite-action ${isFavorite ? "is-active" : ""}`}
                                onClick={handleToggleFavorite}
                            >
                                <span className="cr-heart-glyph" aria-hidden="true"><FiHeart /></span>
                                {isFavorite ? (
                                    <span className="cr-favorite-label-switch">
                                        <span className="cr-favorite-label-default">Saved to favorites</span>
                                        <span className="cr-favorite-label-hover" aria-hidden="true">Remove from favorites</span>
                                    </span>
                                ) : "Add to favorites"}
                            </button>
                            <Link className="cr-button cr-button--primary" to={bookingUrl}>Request Booking</Link>
                        </div>
                    </div>
                </section>

                <section className="cr-profile-layout">
                    <div className="cr-grid">
                        <article className="cr-card">
                            <h2>About {caregiver.name.split(" ")[0]}</h2>
                            <p className="cr-muted">{caregiver.about}</p>

                            <div className="cr-grid" style={{ gap: "6px", marginTop: "10px" }}>
                                <p className="cr-row-sub"><strong>Experience:</strong> {caregiver.experience}</p>
                                <p className="cr-row-sub"><strong>Languages:</strong> {caregiver.languages}</p>
                                <p className="cr-row-sub"><strong>Interests:</strong> {caregiver.interests}</p>
                                <p className="cr-row-sub"><strong>Transportation:</strong> {caregiver.transportation}</p>
                            </div>
                        </article>

                        <article className="cr-card">
                            <h2>Services I Offer</h2>
                            <ul className="cr-list">
                                {caregiver.services.map((service) => (
                                    <li key={service.name} className="cr-row" style={{ gridTemplateColumns: "1fr" }}>
                                        <div>
                                            <p className="cr-row-title cr-row-title-inline"><FiCheck /> {service.name}</p>
                                            <p className="cr-row-sub">{service.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <p className="cr-muted" style={{ marginTop: "10px" }}>
                                Looking for personal care services? We&apos;ll be adding these services soon. Join the waitlist for updates.
                            </p>
                        </article>

                        <article className="cr-card cr-intro-video-card">
                            <h2>Intro Video</h2>
                            {loadingIntroVideo ? (
                                <p className="cr-muted">Loading intro video...</p>
                            ) : hasIntroVideo ? (
                                <div className="cr-video-preview">
                                    <video
                                        ref={introVideoRef}
                                        src={introVideoUrl}
                                        controls
                                        preload="metadata"
                                        playsInline
                                        poster="/images/avatars/female.webp"
                                    />
                                    <button
                                        type="button"
                                        className="cr-button cr-button--secondary"
                                        onClick={handleOpenVideoFullscreen}
                                    >
                                        Open Full Screen
                                    </button>
                                </div>
                            ) : (
                                <p className="cr-muted">This caregiver has not uploaded an intro video yet.</p>
                            )}
                        </article>

                        <article className="cr-card">
                            <h2>Availability</h2>
                            <p className="cr-muted">Next 30 days</p>

                            <div className="cr-mini-calendar" role="grid" aria-label="Availability calendar">
                                <div className="cr-mini-calendar-head">February 2026</div>
                                <div className="cr-mini-calendar-days">
                                    <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
                                </div>
                                {CALENDAR_ROWS.map((week, index) => (
                                    <div key={`week-${index}`} className="cr-mini-calendar-days">
                                        {week.map((day, dayIndex) => {
                                            if (!day) { return <span key={`empty-${index}-${dayIndex}`} className="cr-day is-empty" />; }
                                            const booked = day % 3 === 0;
                                            return (
                                                <span key={`${index}-${day}`} className={`cr-day ${booked ? "is-booked" : "is-available"}`}>
                                                    {day}
                                                </span>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>

                            <div className="cr-inline" style={{ marginTop: "10px" }}>
                                <span className="cr-chip cr-chip--green">Available</span>
                                <span className="cr-chip cr-chip--orange">Booked</span>
                            </div>
                        </article>

                        <article className="cr-card">
                            <div className="cr-inline" style={{ justifyContent: "space-between", marginBottom: "20px" }}>
                                <h2 style={{ margin: 0 }}>Reviews & Ratings</h2>
                                <button
                                    type="button"
                                    className="cr-button cr-button--secondary"
                                    onClick={() => setSortMode((mode) => (mode === "newest" ? "highest" : "newest"))}
                                >
                                    Sort: {sortMode === "newest" ? "Newest" : "Highest Rated"}
                                </button>
                            </div>

                            <div className="cr-rating-bars">
                                <div><span className="cr-stars-inline"><span className="cr-star-glyph">★</span> 5</span><progress max="100" value={ratingDistribution[5] || 0} /><span>{ratingDistribution[5] || 0}%</span></div>
                                <div><span className="cr-stars-inline"><span className="cr-star-glyph">★</span> 4</span><progress max="100" value={ratingDistribution[4] || 0} /><span>{ratingDistribution[4] || 0}%</span></div>
                                <div><span className="cr-stars-inline"><span className="cr-star-glyph">★</span> 3</span><progress max="100" value={ratingDistribution[3] || 0} /><span>{ratingDistribution[3] || 0}%</span></div>
                                <div><span className="cr-stars-inline"><span className="cr-star-glyph">★</span> 2</span><progress max="100" value={ratingDistribution[2] || 0} /><span>{ratingDistribution[2] || 0}%</span></div>
                                <div><span className="cr-stars-inline"><span className="cr-star-glyph">★</span> 1</span><progress max="100" value={ratingDistribution[1] || 0} /><span>{ratingDistribution[1] || 0}%</span></div>
                            </div>

                            <ul className="cr-list" style={{ marginTop: "12px" }}>
                                {visibleReviews.length === 0 ? (
                                    <li className="cr-row" style={{ gridTemplateColumns: "1fr" }}>
                                        <p className="cr-row-sub" style={{ margin: 0 }}>No reviews yet for this caregiver.</p>
                                    </li>
                                ) : visibleReviews.map((review) => (
                                    <li key={review.id} className="cr-row" style={{ gridTemplateColumns: "1fr" }}>
                                        <div>
                                            <p className="cr-row-title">{review.name}</p>
                                            <p className="cr-row-sub">{review.date || review.dateISO}</p>
                                            <p className="cr-row-sub">
                                                <span className="cr-stars-inline"><RatingStars value={review.rating} /></span>
                                            </p>
                                            <p className="cr-row-sub" style={{ marginTop: "6px" }}>{review.text}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            {sortedReviews.length > 3 ? (
                                <button
                                    type="button"
                                    className="cr-button cr-button--primary"
                                    style={{ marginTop: "12px" }}
                                    onClick={() => setVisibleReviewCount((count) => (canShowMoreReviews ? count + 3 : 3))}
                                >
                                    {canShowMoreReviews ? "Show more reviews" : "Show less reviews"}
                                </button>
                            ) : null}
                            {reviewState.loading ? <p className="cr-muted" style={{ marginTop: "12px" }}>Loading reviews...</p> : null}
                            {reviewState.usedFallback ? (
                                <p className="cr-muted" style={{ marginTop: "8px" }}>
                                    Showing fallback reviews. Start API to load reviews from database.
                                </p>
                            ) : null}
                        </article>
                    </div>

                    <aside className="cr-grid">
                        <article className="cr-card">
                            <h3>Verification Status</h3>
                            <ul className="cr-list">
                                {caregiver.verificationItems.map((item) => (
                                    <li key={item} className="cr-row" style={{ gridTemplateColumns: "1fr auto", padding: "10px 12px" }}>
                                        <span>{item}</span>
                                        <span className="cr-chip cr-chip--green cr-chip--verified-strong">Verified</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="cr-muted" style={{ marginTop: "8px" }}>
                                All caregivers undergo identity verification before joining the platform.
                            </p>
                        </article>

                        <article className="cr-card">
                            <h3>Similar Caregivers</h3>
                            <p className="cr-muted">Near you</p>
                            <ul className="cr-list">
                                {SIMILAR.map((item) => (
                                    <li key={item.id} className="cr-row">
                                        <div className="cr-inline" style={{ alignItems: "center" }}>
                                            <div className="cr-avatar">{initials(item.name)}</div>
                                            <div>
                                                <p className="cr-row-title">{item.name}</p>
                                                <p className="cr-row-sub" style={{ whiteSpace: "nowrap" }}>
                                                    £{item.rate}/hr • <span className="cr-stars-inline"><RatingStars value={item.rating} /> {item.rating}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <Link className="cr-button cr-button--text" to={`/carereceiver/caregivers/${item.id}`}>Open</Link>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    </aside>
                </section>

                <section className="cr-card cr-profile-cta">
                    <Link className="cr-button cr-button--primary" to={bookingUrl}>Request Booking</Link>
                    {showResponseStats ? (
                        <>
                            <p className="cr-muted" style={{ margin: 0 }}>Response time: {responseTimeText}</p>
                            <p className="cr-muted" style={{ margin: 0 }}>Acceptance rate: {acceptanceRateText}</p>
                        </>
                    ) : null}
                </section>

                <div className="cr-mobile-sticky-cta">
                    <Link className="cr-button cr-button--primary" to={bookingUrl}>Request Booking</Link>
                </div>
            </div>
        </div>
    );
}
