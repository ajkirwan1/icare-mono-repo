import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import "./carereceiver-pages.css";

// icon for verification rows
import { FiCheck } from "react-icons/fi";
import RatingStars from "./rating-stars";

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

const REVIEWS = [
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
    const bookingUrl = `/carereceiver/bookings/new/${caregiverId || CAREGIVER.id}`;
    const [sortMode, setSortMode] = useState("newest");
    const [visibleReviewCount, setVisibleReviewCount] = useState(3);

    const sortedReviews = useMemo(() => {
        const copy = [...REVIEWS];
        if (sortMode === "highest") {
            copy.sort((a, b) => b.rating - a.rating || new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime());
            return copy;
        }

        copy.sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime());
        return copy;
    }, [sortMode]);

    const visibleReviews = sortedReviews.slice(0, visibleReviewCount);
    const canShowMoreReviews = visibleReviewCount < sortedReviews.length;

    return (
        <div className="cr-page">
            <div className="cr-shell">
                <nav className="cr-breadcrumbs" aria-label="Breadcrumb navigation">
                    <Link to="/carereceiver/dashboard">Dashboard</Link><span>›</span>
                    <Link to="/carereceiver/search">Search</Link><span>›</span>
                    <strong>{CAREGIVER.name}</strong>
                </nav>

                <Link className="cr-back-link" to="/carereceiver/search">← Back to Search Results</Link>

                <section className="cr-card cr-profile-hero">
                    <div className="cr-avatar cr-profile-avatar">{initials(CAREGIVER.name)}</div>

                    <div>
                        <h1 style={{ margin: "0 0 6px" }}>{CAREGIVER.name}</h1>
                        <p className="cr-muted" style={{ margin: "0 0 8px" }}>{CAREGIVER.location} • {CAREGIVER.distance}</p>
                        <p className="cr-muted cr-rating-line" style={{ margin: "0 0 8px" }}>
                            <span className="cr-stars-inline"><RatingStars value={CAREGIVER.rating} /></span>
                            <span>{CAREGIVER.rating} ({CAREGIVER.reviewCount} reviews)</span>
                        </p>
                        <p style={{ margin: "0 0 10px", fontWeight: 700 }}>£{CAREGIVER.hourlyRate}/hour</p>
                        <div className="cr-inline">
                            <span className="cr-chip cr-chip--green">DBS Verified</span>
                            <span className="cr-chip cr-chip--green">ID Verified</span>
                            <span className="cr-chip cr-chip--green">Right to Work Verified</span>
                        </div>
                    </div>

                    <div className="cr-profile-hero-actions">
                        <Link className="cr-button cr-button--primary" to={bookingUrl}>Request Booking</Link>
                    </div>
                </section>

                <section className="cr-profile-layout">
                    <div className="cr-grid">
                        <article className="cr-card">
                            <h2>About Sarah</h2>
                            <p className="cr-muted">{CAREGIVER.about}</p>

                            <div className="cr-grid" style={{ gap: "6px", marginTop: "10px" }}>
                                <p className="cr-row-sub"><strong>Experience:</strong> {CAREGIVER.experience}</p>
                                <p className="cr-row-sub"><strong>Languages:</strong> {CAREGIVER.languages}</p>
                                <p className="cr-row-sub"><strong>Interests:</strong> {CAREGIVER.interests}</p>
                                <p className="cr-row-sub"><strong>Transportation:</strong> {CAREGIVER.transportation}</p>
                            </div>
                        </article>

                        <article className="cr-card">
                            <h2>Services I Offer</h2>
                            <ul className="cr-list">
                                {CAREGIVER.services.map((service) => (
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
                            <div className="cr-inline" style={{ justifyContent: "space-between" }}>
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
                                <div><span className="cr-stars-inline"><span className="cr-star-glyph">★</span> 5</span><progress max="100" value="60" /><span>60%</span></div>
                                <div><span className="cr-stars-inline"><span className="cr-star-glyph">★</span> 4</span><progress max="100" value="25" /><span>25%</span></div>
                                <div><span className="cr-stars-inline"><span className="cr-star-glyph">★</span> 3</span><progress max="100" value="10" /><span>10%</span></div>
                                <div><span className="cr-stars-inline"><span className="cr-star-glyph">★</span> 2</span><progress max="100" value="3" /><span>3%</span></div>
                                <div><span className="cr-stars-inline"><span className="cr-star-glyph">★</span> 1</span><progress max="100" value="2" /><span>2%</span></div>
                            </div>

                            <ul className="cr-list" style={{ marginTop: "12px" }}>
                                {visibleReviews.map((review) => (
                                    <li key={review.id} className="cr-row" style={{ gridTemplateColumns: "1fr" }}>
                                        <div>
                                            <p className="cr-row-title">{review.name}</p>
                                            <p className="cr-row-sub">{review.date}</p>
                                            <p className="cr-row-sub">
                                                <span className="cr-stars-inline"><RatingStars value={review.rating} /></span>
                                            </p>
                                            <p className="cr-row-sub" style={{ marginTop: "6px" }}>{review.text}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <button
                                type="button"
                                className="cr-button cr-button--primary"
                                style={{ marginTop: "12px" }}
                                onClick={() => setVisibleReviewCount((count) => (canShowMoreReviews ? count + 3 : 3))}
                            >
                                {canShowMoreReviews ? "Show more reviews" : "Show less reviews"}
                            </button>
                        </article>
                    </div>

                    <aside className="cr-grid">
                        <article className="cr-card">
                            <h3>Verification Status</h3>
                            <ul className="cr-list">
                                {CAREGIVER.verificationItems.map((item) => (
                                    <li key={item} className="cr-row" style={{ gridTemplateColumns: "1fr auto", padding: "10px 12px" }}>
                                        <span>{item}</span>
                                        <span className="cr-chip cr-chip--green">Verified</span>
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
                    <p className="cr-muted" style={{ margin: 0 }}>Response time: Usually within 2 hours</p>
                    <p className="cr-muted" style={{ margin: 0 }}>Acceptance rate: 85%</p>
                </section>

                <div className="cr-mobile-sticky-cta">
                    <Link className="cr-button cr-button--primary" to={bookingUrl}>Request Booking</Link>
                </div>
            </div>
        </div>
    );
}
