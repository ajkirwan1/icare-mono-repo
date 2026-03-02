import { Link, useParams } from "react-router";
import { useEffect, useMemo, useState } from "react";
import "./carereceiver-pages.css";

import { FiCheck } from "react-icons/fi";
import RatingStars from "./rating-stars";
import { getCarereceiverBookingDetail, submitCarereceiverBookingReview } from "./bookings/bookings-api-client";

const reviewLabels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

function initials(name) {
    return String(name)
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

function mapReviewBooking(detail) {
    const booking = detail?.booking || {};
    const caregiver = detail?.caregiver || {};

    return {
        caregiverName: caregiver.name || "Caregiver",
        date: booking.dateFormatted || booking.date || "Date TBD",
        time: booking.timeFormatted || "Time TBD",
        duration: booking.duration || "Duration TBD",
        service: Array.isArray(booking.serviceTypes) && booking.serviceTypes.length > 0
            ? booking.serviceTypes.join(", ")
            : booking.serviceType || "Companionship",
        rating: Number(caregiver.rating || 0),
        reviewCount: Number(caregiver.reviewCount || 0),
        verificationBadges: Array.isArray(caregiver.verificationBadges) ? caregiver.verificationBadges : []
    };
}

const fallbackBooking = {
    caregiverName: "Caregiver",
    date: "Date TBD",
    time: "Time TBD",
    duration: "Duration TBD",
    service: "Companionship",
    rating: 0,
    reviewCount: 0,
    verificationBadges: ["Identity Verified", "DBS Verified"]
};

export default function CarereceiverLeaveReview() {
    const { bookingId } = useParams();
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [state, setState] = useState({ loading: true, booking: fallbackBooking });
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        let mounted = true;

        async function loadBookingSummary() {
            if (!bookingId) {
                if (mounted) {
                    setState({ loading: false, booking: fallbackBooking });
                }
                return;
            }

            try {
                const payload = await getCarereceiverBookingDetail(bookingId, { signal: controller.signal });
                if (!mounted) {
                    return;
                }

                setState({ loading: false, booking: mapReviewBooking(payload) });
            } catch {
                if (!mounted) {
                    return;
                }

                setState({ loading: false, booking: fallbackBooking });
            }
        }

        loadBookingSummary();

        return () => {
            mounted = false;
            controller.abort();
        };
    }, [bookingId]);

    const charCount = useMemo(() => `${reviewText.length} / 500`, [reviewText.length]);

    async function handleSubmit() {
        if (!rating) {
            setError("Please select a star rating.");
            return;
        }

        if (!bookingId) {
            setError("Booking id is missing.");
            return;
        }

        setError("");
        setSubmitting(true);

        try {
            await submitCarereceiverBookingReview(bookingId, {
                rating,
                reviewText,
                reviewTags: []
            });
            setSubmitted(true);
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : "Could not submit review.");
        } finally {
            setSubmitting(false);
        }
    }

    const booking = state.booking;

    if (submitted) {
        return (
            <div className="cr-page">
                <div className="cr-shell">
                    <section className="cr-card" style={{ maxWidth: "860px", margin: "0 auto" }}>
                        <h1 style={{ marginTop: 0 }}>Review Submitted</h1>
                        <p className="cr-muted">Thank you for sharing your feedback. Your review is now visible for other families.</p>
                        <p className="cr-row-sub" style={{ marginTop: "12px" }}>
                            Your review: <strong className="cr-stars-inline"><RatingStars value={rating} /></strong> {rating} / 5
                        </p>
                        <div className="cr-inline" style={{ marginTop: "16px" }}>
                            <Link className="cr-button cr-button--primary" to="/carereceiver/bookings">Back to Bookings</Link>
                            <Link className="cr-button cr-button--secondary" to="/carereceiver/dashboard">Back to Dashboard</Link>
                        </div>
                    </section>
                </div>
            </div>
        );
    }

    return (
        <div className="cr-page">
            <div className="cr-shell">
                <nav className="cr-breadcrumbs" aria-label="Breadcrumb navigation">
                    <Link to="/carereceiver/dashboard">Dashboard</Link><span>›</span>
                    <Link to="/carereceiver/bookings">My Bookings</Link><span>›</span>
                    <Link to={`/carereceiver/bookings/${bookingId}`}>Booking Details</Link><span>›</span>
                    <strong>Leave Review</strong>
                </nav>

                <section className="cr-card cr-review-layout">
                    <h1 style={{ margin: 0 }}>Leave a Review</h1>
                    <p className="cr-muted" style={{ marginTop: "6px" }}>Share your experience with {booking.caregiverName}</p>

                    <article className="cr-card" style={{ background: "#fff" }}>
                        <p className="cr-muted" style={{ marginTop: 0, fontSize: "12px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                            Booking summary
                        </p>
                        <div className="cr-inline" style={{ alignItems: "center" }}>
                            <div className="cr-avatar" style={{ width: "64px", height: "64px" }}>{initials(booking.caregiverName)}</div>
                            <div>
                                <p className="cr-row-title" style={{ margin: 0 }}>{booking.caregiverName}</p>
                                <p className="cr-row-sub" style={{ margin: "4px 0", display: "inline-flex", alignItems: "center", gap: "10px", whiteSpace: "nowrap" }}>
                                    {(booking.verificationBadges.length ? booking.verificationBadges : ["Identity Verified", "DBS Verified"]).slice(0, 2).map((badge) => (
                                        <span key={badge} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><FiCheck /> {badge}</span>
                                    ))}
                                </p>
                                <p className="cr-row-sub cr-rating-line" style={{ margin: 0 }}>
                                    <span className="cr-stars-inline"><RatingStars value={booking.rating} /></span>
                                    <span style={{ color: "#5f6878" }}>{booking.rating.toFixed(1)} ({booking.reviewCount} reviews)</span>
                                </p>
                            </div>
                        </div>
                        <div className="cr-grid" style={{ gap: "6px", marginTop: "12px" }}>
                            <p className="cr-row-sub"><strong>Date:</strong> {booking.date}</p>
                            <p className="cr-row-sub"><strong>Time:</strong> {booking.time}</p>
                            <p className="cr-row-sub"><strong>Duration:</strong> {booking.duration}</p>
                            <p className="cr-row-sub"><strong>Service:</strong> {booking.service}</p>
                            <p className="cr-row-sub"><strong>Booking ID:</strong> {bookingId}</p>
                        </div>
                    </article>

                    <section>
                        <h2 style={{ marginBottom: "8px" }}>How was your experience with this caregiver? *</h2>
                        <p className="cr-muted" style={{ marginTop: 0 }}>Click a star to rate (1 = Poor, 5 = Excellent)</p>

                        <div className="cr-review-stars" role="radiogroup" aria-label="Rate your experience">
                            {reviewLabels.map((label, index) => {
                                const value = index + 1;
                                const active = value <= rating;
                                return (
                                    <button
                                        key={label}
                                        type="button"
                                        className={`cr-star ${active ? "is-active" : ""}`}
                                        aria-label={`${value} star${value > 1 ? "s" : ""} - ${label}`}
                                        onClick={() => setRating(value)}
                                    >
                                        ★
                                        <span>{label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    <section>
                        <h2 style={{ marginBottom: "8px" }}>Tell us more about your experience (optional)</h2>
                        <p className="cr-muted" style={{ marginTop: 0 }}>
                            Share what you liked or areas for improvement. Your review will be visible to other families.
                        </p>
                        <textarea
                            className="cr-textarea"
                            maxLength={500}
                            placeholder="e.g., The caregiver was punctual, kind, and made my father feel very comfortable..."
                            value={reviewText}
                            onChange={(event) => setReviewText(event.target.value)}
                        />
                        <p className="cr-muted" style={{ marginTop: "6px" }}>{charCount}</p>
                    </section>

                    <section className="cr-alert" style={{ marginTop: "6px" }}>
                        <p style={{ marginBottom: "8px", fontWeight: 700 }}>Review guidelines</p>
                        <p className="cr-row-sub" style={{ margin: "2px 0" }}>• Be honest and constructive</p>
                        <p className="cr-row-sub" style={{ margin: "2px 0" }}>• Focus on the service provided</p>
                        <p className="cr-row-sub" style={{ margin: "2px 0" }}>• Avoid sharing personal contact information</p>
                        <p className="cr-row-sub" style={{ margin: "2px 0" }}>• Reviews cannot be edited or deleted once submitted</p>
                    </section>

                    {state.loading ? <p className="cr-muted">Loading booking summary...</p> : null}
                    {error ? <p className="cr-error" role="alert">{error}</p> : null}

                    <div className="cr-inline" style={{ marginTop: "8px" }}>
                        <Link className="cr-button cr-button--secondary" to="/carereceiver/bookings">Cancel</Link>
                        <button type="button" className="cr-button cr-button--primary" onClick={handleSubmit} disabled={submitting || state.loading}>
                            {submitting ? "Submitting..." : "Submit Review"}
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}
