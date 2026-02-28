export default function RatingStars({ value = 0, max = 5, size = "14px", className = "" }) {
    const safeMax = Math.max(1, Number(max) || 5);
    const safeValue = Math.max(0, Math.min(safeMax, Number(value) || 0));
    const fillPercent = `${(safeValue / safeMax) * 100}%`;
    const label = `${safeValue.toFixed(1)} out of ${safeMax} stars`;

    return (
        <span
            aria-label={label}
            className={`cr-rating-stars ${className}`.trim()}
            role="img"
            style={{
                "--cr-star-fill-percent": fillPercent,
                "--cr-star-size": size
            }}
        />
    );
}
