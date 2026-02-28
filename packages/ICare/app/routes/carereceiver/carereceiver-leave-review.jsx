import { Link, useParams } from "react-router";
import { useMemo, useState } from "react";
import "./carereceiver-pages.css";

const reviewLabels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

const booking = {
  caregiverName: "Mary Thompson",
  date: "Wednesday, March 6, 2026",
  time: "10:00 AM - 2:00 PM",
  duration: "4 hours",
  service: "Companionship",
  rating: 4.8,
  reviewCount: 24
};

function initials(name) {
  return String(name)
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function CarereceiverLeaveReview() {
  const { bookingId } = useParams();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const charCount = useMemo(() => `${reviewText.length} / 500`, [reviewText.length]);

  function handleSubmit() {
    if (!rating) {
      setError("Please select a star rating.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="cr-page">
        <div className="cr-shell">
          <section className="cr-card" style={{ maxWidth: "860px", margin: "0 auto" }}>
            <h1 style={{ marginTop: 0 }}>Review Submitted</h1>
            <p className="cr-muted">Thank you for sharing your feedback. Your review is now visible for other families.</p>
            <p className="cr-row-sub" style={{ marginTop: "12px" }}>
              Your review: <strong>{"★".repeat(rating).padEnd(5, "☆")}</strong> {rating} / 5
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
          <span>Dashboard</span><span>›</span><span>My Bookings</span><span>›</span>
          <span>Booking Details</span><span>›</span><strong>Leave Review</strong>
        </nav>

        <section className="cr-card cr-review-layout">
          <h1 style={{ margin: 0 }}>Leave a Review</h1>
          <p className="cr-muted" style={{ marginTop: "6px" }}>Share your experience with Mary</p>

          <article className="cr-card" style={{ background: "#fff" }}>
            <p className="cr-muted" style={{ marginTop: 0, fontSize: "12px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Booking summary
            </p>
            <div className="cr-inline" style={{ alignItems: "center" }}>
              <div className="cr-avatar" style={{ width: "64px", height: "64px" }}>{initials(booking.caregiverName)}</div>
              <div>
                <p className="cr-row-title" style={{ margin: 0 }}>{booking.caregiverName}</p>
                <p className="cr-row-sub" style={{ margin: "4px 0" }}>✓ Identity Verified  ✓ DBS Verified</p>
                <p className="cr-row-sub" style={{ margin: 0, color: "#dd8b4f" }}>★★★★★ <span style={{ color: "#5f6878" }}>{booking.rating} ({booking.reviewCount} reviews)</span></p>
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
            <h2 style={{ marginBottom: "8px" }}>How would you rate your experience? *</h2>
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
              placeholder="e.g., Mary was punctual, kind, and made my father feel very comfortable..."
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

          {error ? <p className="cr-error" role="alert">{error}</p> : null}

          <div className="cr-inline" style={{ marginTop: "8px" }}>
            <Link className="cr-button cr-button--secondary" to="/carereceiver/bookings">Cancel</Link>
            <button type="button" className="cr-button cr-button--primary" onClick={handleSubmit}>Submit Review</button>
          </div>
        </section>
      </div>
    </div>
  );
}
