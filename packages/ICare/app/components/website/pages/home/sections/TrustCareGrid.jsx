import React from "react";

export default function TrustCareGrid({ items }) {
    return (
        <section
            style={{
                marginLeft: "calc(50% - 50vw)",
                marginRight: "calc(50% - 50vw)",
                width: "100vw",
                background: "linear-gradient(180deg, #FAF9F7 0%, #FFFFFF 80%)",
                padding: "96px 0 110px",
            }}
        >
            <div
                style={{
                    maxWidth: 1480,
                    margin: "0 auto",
                    padding: "0 clamp(24px, 4vw, 48px)",
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(520px, 1fr))",
                        gap: 56,
                    }}
                >
                    {items.map((c, i) => (
                        <article
                            key={i}
                            style={{
                                borderRadius: 32,
                                background: "#FFFFFF",
                                overflow: "hidden",
                                border: "1px solid rgba(0,0,0,0.05)",
                                display: "flex",
                                flexDirection: "column",
                                boxShadow: "0 10px 28px rgba(0,0,0,0.06)",
                            }}
                        >
                            <div style={{ height: "420px", width: "100%", overflow: "hidden" }}>
                                <img
                                    src={c.img}
                                    alt={c.k}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </div>

                            <div style={{ padding: "32px 36px 42px" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 18,
                                        marginBottom: "1.4rem",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: "50%",
                                            background: c.iconBg,
                                            display: "grid",
                                            placeItems: "center",
                                            border: `1px solid ${c.color}33`,
                                        }}
                                    >
                                        {c.icon}
                                    </div>

                                    <h3
                                        style={{
                                            margin: 0,
                                            fontSize: "clamp(1.85rem, 2.9vw, 2.35rem)",
                                            fontWeight: 800,
                                            color: c.color,
                                        }}
                                    >
                                        {c.k}
                                    </h3>
                                </div>

                                <p style={{ margin: 0, fontSize: "1.02rem", color: "#3A3A3A" }}>
                                    {c.desc}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
