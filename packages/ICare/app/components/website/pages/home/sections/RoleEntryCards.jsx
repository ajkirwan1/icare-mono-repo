import React from "react";

export default function RoleEntryCards({ cards }) {
    return (
        <div
            style={{
                display: "flex",
                gap: "2rem",
                flexWrap: "wrap",
                justifyContent: "center",
                padding: "40px 0",
            }}
        >
            {cards.map((c, i) => (
                <a
                    key={i}
                    href={c.href}
                    style={{
                        position: "relative",
                        display: "block",
                        width: "min(640px, 46vw)",
                        height: "420px",
                        borderRadius: "26px",
                        overflow: "hidden",
                        boxShadow: "0 8px 28px rgba(0,0,0,0.12)",
                        textDecoration: "none",
                        backgroundColor: "#000",
                    }}
                >
                    <img
                        src={c.img}
                        alt={c.title}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "0.6s ease",
                        }}
                    />

                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background:
                                "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.55))",
                        }}
                    />

                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            textAlign: "center",
                        }}
                    >
                        <h3
                            style={{
                                color: "#fff",
                                fontSize: "clamp(2rem, 3vw, 2.4rem)",
                                fontWeight: 900,
                                marginBottom: "1.5rem",
                            }}
                        >
                            {c.title}
                        </h3>

                        <div
                            style={{
                                display: "inline-block",
                                backgroundColor: "#a5a5a5",
                                color: "#fff",
                                fontWeight: 700,
                                padding: "0.9rem 2.4rem",
                                borderRadius: "999px",
                            }}
                        >
                            Get started
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
}
