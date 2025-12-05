import React from "react";

export default function CompareTag({ label }) {
    return (
        <li
            style={{
                padding: "8px 16px",
                borderRadius: 999,
                background: "#F3F4F6",
                border: "1px solid #E2E4E8",
                fontWeight: 600,
                color: "#374151",
                display: "flex",
                alignItems: "center",
                gap: 8,
            }}
        >
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4C7865"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polyline points="20 6 9 17 4 12" />
            </svg>
            {label}
        </li>
    );
}
