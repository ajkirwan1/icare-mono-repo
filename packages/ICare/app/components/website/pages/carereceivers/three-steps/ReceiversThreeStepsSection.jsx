import React from "react";

export default function ReceiversThreeStepsSection({ children }) {
    return (
        <section
            aria-label="3 Steps Minimal"
            style={{
                marginLeft: "calc(50% - 50vw)",
                marginRight: "calc(50% - 50vw)",
                width: "100vw",
                background: "#FAF8F5",
                padding: "120px 0",
                borderTop: "1px solid #EAE6E1",
            }}
        >
            <div
                style={{
                    width: "min(980px,90vw)",
                    margin: "0 auto",
                    padding: "0 24px",
                }}
            >
                {children}
            </div>
        </section>
    );
}
