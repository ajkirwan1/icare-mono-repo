import React, { useState, useRef, useEffect } from "react";

export function OurImpactSection() {
    const images = [
        "https://images.unsplash.com/photo-1524508762098-fd966ffb6ef9?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1521769841580-94d38f06e7a6?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1530023367847-a683933f4177?auto=format&fit=crop&w=1200&q=80",
    ];

    const [index, setIndex] = useState(0);
    const intervalRef = useRef(null);

    const next = () => setIndex((i) => (i + 1) % images.length);
    const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

    useEffect(() => {
        startAutoplay();
        return () => stopAutoplay();
    }, []);

    const startAutoplay = () => {
        stopAutoplay();
        intervalRef.current = setInterval(next, 6000);
    };

    const stopAutoplay = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    return (
        <section
            id="impact"
            style={{
                width: "min(1100px,92vw)",
                margin: "8rem auto",
                padding: "0 clamp(20px,3vw,32px)",
                fontFamily: "Inter, system-ui, sans-serif",
            }}
        >
            {/* HEADER */}
            <h2
                style={{
                    fontWeight: 900,
                    fontSize: "clamp(2rem,2.8vw,2.6rem)",
                    color: "#0F172A",
                    marginBottom: "1.4rem",
                }}
            >
                Our Impact
            </h2>
            {/* STORY-STYLE PRACTICAL TEXT */}
            <div
                style={{
                    maxWidth: "68ch",
                    fontSize: "1.12rem",
                    color: "#475569",
                    lineHeight: 1.7,
                    marginBottom: "2.8rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.6rem",
                }}
            >
                {/* INTRO */}
                <p style={{ margin: 0 }}>
                    We’re building a clearer, simpler way for families and caregivers to connect.
                    No agencies deciding for you. No outdated processes. Just transparent tools
                    that help two people meet, talk and decide together.
                </p>

                {/* BULLETS */}
                <div
                    style={{
                        display: "grid",
                        gap: "0.85rem",
                        paddingLeft: "1.2rem",
                        color: "#334155",
                        fontSize: "1.05rem",
                    }}
                >
                    <div style={{ display: "flex", gap: ".6rem" }}>
                        <span style={{ fontWeight: 700 }}>•</span>
                        <span>You see caregiver profiles directly — skills, availability and preferences.</span>
                    </div>

                    <div style={{ display: "flex", gap: ".6rem" }}>
                        <span style={{ fontWeight: 700 }}>•</span>
                        <span>Caregivers see exactly what families need before applying.</span>
                    </div>

                    <div style={{ display: "flex", gap: ".6rem" }}>
                        <span style={{ fontWeight: 700 }}>•</span>
                        <span>Both sides communicate without middle layers or hidden conditions.</span>
                    </div>

                    <div style={{ display: "flex", gap: ".6rem" }}>
                        <span style={{ fontWeight: 700 }}>•</span>
                        <span>Matching happens naturally when expectations align.</span>
                    </div>

                    <div style={{ display: "flex", gap: ".6rem" }}>
                        <span style={{ fontWeight: 700 }}>•</span>
                        <span>The process is guided but never controlled — you stay in charge.</span>
                    </div>
                </div>

                {/* OUTRO */}
                <p style={{ margin: 0 }}>
                    It’s care designed around people, not systems — giving families clarity and
                    caregivers the dignity of choosing where and how they work.
                </p>
            </div>


            {/* ========================== */}
            {/*         CAROUSEL           */}
            {/* ========================== */}

            <div
                style={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "32px",
                    boxShadow: "0 10px 34px rgba(0,0,0,0.12)",
                    width: "min(820px, 100%)",     // ← ZMNIEJSZONA SZEROKOŚĆ
                    margin: "0 auto",              // ← WYŚRODKOWANA
                }}
                onMouseEnter={stopAutoplay}
                onMouseLeave={startAutoplay}
            >
                <div
                    style={{
                        display: "flex",
                        transform: `translateX(-${index * 100}%)`,
                        transition: "transform .7s cubic-bezier(0.25,0.1,0.25,1)",
                    }}
                >
                    {images.map((src, i) => (
                        <div key={i} style={{ minWidth: "100%", position: "relative" }}>
                            <img
                                src={src}
                                alt=""
                                style={{
                                    width: "100%",
                                    height: "290px", // ← 30% MNIEJSZA WYSOKOŚĆ
                                    objectFit: "cover",
                                    display: "block",
                                }}
                            />

                            {/* Airbnb-like gradient */}
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background:
                                        "linear-gradient(to top, rgba(0,0,0,0.20), rgba(0,0,0,0.04))",
                                    pointerEvents: "none",
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* ARROWS */}
                <button onClick={prev} style={arrowStyle("left")}>‹</button>
                <button onClick={next} style={arrowStyle("right")}>›</button>
            </div>

            {/* DOTS */}
            <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                marginTop: "1.6rem"
            }}>
                {images.map((_, i) => (
                    <div
                        key={i}
                        onClick={() => setIndex(i)}
                        style={{
                            width: index === i ? 14 : 8,
                            height: 8,
                            borderRadius: 999,
                            background: index === i ? "#0F3D20" : "rgba(0,0,0,0.15)",
                            transition: "all .3s ease",
                            cursor: "pointer",
                        }}
                    />
                ))}
            </div>
        </section>
    );
}

const arrowStyle = (side) => ({
    position: "absolute",
    top: "50%",
    [side]: "14px",
    transform: "translateY(-50%)",
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.9)",
    border: "1px solid rgba(0,0,0,0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.6rem",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    transition: "all .25s ease",
});
