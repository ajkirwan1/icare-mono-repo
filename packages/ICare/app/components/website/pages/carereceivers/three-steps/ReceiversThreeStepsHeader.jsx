import React from "react";

export default function ReceiversThreeStepsHeader() {
    return (
        <header
            className="sr"
            style={{
                opacity: 0,
                transform: "translateY(25px)",
                transition: "all .8s cubic-bezier(0.25,0.1,0.25,1)",
                textAlign: "center",
                marginBottom: "4rem",
            }}
        >
            <h2
                style={{
                    margin: 0,
                    fontWeight: 800,
                    color: "#1A1A1A",
                    fontSize: "clamp(2.4rem, 3vw, 3rem)",
                    letterSpacing: "-0.5px",
                    lineHeight: 1.1,
                }}
            >
                Find your caregiver in 3 simple steps
            </h2>

            <p
                style={{
                    maxWidth: "60ch",
                    margin: "22px auto 0",
                    fontSize: "1.15rem",
                    color: "#444",
                    lineHeight: 1.75,
                    fontWeight: 400,
                }}
            >
                A calm, human-centered process designed for clarity, trust and ease.
            </p>
        </header>
    );
}
