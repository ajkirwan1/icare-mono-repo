// components/ui/NotificationsLabel.jsx
import React from "react";

// If chipIconWrap lives elsewhere, import it instead of redefining.
function chipIconWrap(stroke = "#1F2937", bg = "rgba(31,41,55,.12)") {
  return {
    width: 28,
    height: 28,
    display: "grid",
    placeItems: "center",
    borderRadius: 999,
    background: bg,
    color: stroke,
    border: `1px solid ${stroke}20` /* 12% */
  };
}

export default function NotificationsLabel() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {/* bell icon */}
      <span
        aria-hidden="true"
        style={chipIconWrap("#0EA5E9", "rgba(14,165,233,.15)")}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      </span>

      {/* <strong style={{ color: "#111827", letterSpacing: ".2px" }}>
        Notifications
      </strong> */}
    </div>
  );
}
