import React from "react";

export default function ReceiversStepItem({ number, title, description, delay }) {
    return (
        <div
            className="sr"
            style={{
                opacity: 0,
                transform: "translateY(30px)",
                transition: `all .9s ${delay}s cubic-bezier(0.25,0.1,0.25,1)`,
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "1.6rem",
                alignItems: "start",
            }}
        >
            {/* NUMBER */}
            <div
                style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    border: "2px solid #A67A63",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 700,
                    fontSize: "1.35rem",
                    color: "#A67A63",
                }}
            >
                {number}
            </div>

            {/* TEXT */}
            <div>
                <h3
                    style={{
                        margin: "0 0 0.4rem",
                        fontSize: "1.32rem",
                        fontWeight: 700,
                        color: "#1A1A1A",
                        letterSpacing: "-0.2px",
                    }}
                >
                    {title}
                </h3>

                <p
                    style={{
                        margin: 0,
                        fontSize: "1.05rem",
                        lineHeight: 1.65,
                        color: "#4A4A4A",
                    }}
                >
                    {description}
                </p>
            </div>
        </div>
    );
}
