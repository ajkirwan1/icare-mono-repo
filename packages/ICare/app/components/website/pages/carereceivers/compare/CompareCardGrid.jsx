import React from "react";

export default function CompareCardGrid({ children }) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
                gap: 26,
            }}
        >
            {children}
        </div>
    );
}
