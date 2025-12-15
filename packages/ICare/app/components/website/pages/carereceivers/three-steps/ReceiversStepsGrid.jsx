import React from "react";

export default function ReceiversStepsGrid({ children }) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "3.6rem",
                padding: "0 12px",
            }}
        >
            {children}
        </div>
    );
}
