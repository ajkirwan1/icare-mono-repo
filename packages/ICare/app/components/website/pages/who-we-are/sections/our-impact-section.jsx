import React, { useState, useRef, useEffect } from "react";

export function OurImpactSection() {
    const images = [
        "https://images.unsplash.com/photo-1524508762098-fd966ffb6ef9?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1521769841580-94d38f06e7a6?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1530023367847-a683933f4177?auto=format&fit=crop&w=1200&q=80",
    ];

    const items = [
        {
            title: "Transparent care choices",
            desc: "Families see real caregiver profiles — experience, availability and care style — before starting a conversation.",
        },
        {
            title: "Direct communication",
            desc: "Private messaging without agencies or intermediaries deciding for either side.",
        },
        {
            title: "Fair, clear agreements",
            desc: "Care details, schedules and rates are agreed openly between families and caregivers.",
        },
        {
            title: "Freedom on both sides",
            desc: "Caregivers choose who they work with. Families choose who supports their home.",
        },
    ];

    const [open, setOpen] = useState(0);
    const [index, setIndex] = useState(0);
    const intervalRef = useRef(null);

    const next = () => setIndex((i) => (i + 1) % images.length);
    const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

    useEffect(() => {
        startAutoplay();
        return stopAutoplay;
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
            aria-label="Our impact"
            style={{
                width: "100%",
                background: "#bfc09c",
                padding: "clamp(4.4rem, 7vw, 6.2rem) 0",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <div
                style={{
                    width: "min(1180px, 92vw)",
                    margin: "0 auto",
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1.1fr",
                        gap: "clamp(2.6rem, 5vw, 4.2rem)",
                        alignItems: "stretch",
                    }}
                >
                    {/* ================= LEFT — CONDENSED ACCORDION ================= */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            maxWidth: "52ch",
                        }}
                    >
                        <header style={{ marginBottom: "1.8rem" }}>
                            <h2
                                style={{
                                    margin: 0,
                                    fontWeight: 800,
                                    fontSize: "clamp(1.9rem, 2.6vw, 2.2rem)",
                                    color: "#000000",           // ← BLACK
                                    letterSpacing: "-0.35px",
                                }}
                            >
                                How ICare changes home care
                            </h2>
                        </header>

                        <div style={{ display: "grid", gap: "1rem" }}>
                            {items.map((item, i) => {
                                const isOpen = open === i;

                                return (
                                    <div
                                        key={item.title}
                                        style={{
                                            borderBottom: "1px solid rgba(0,0,0,0.35)", // ← BLACK TONE
                                            paddingBottom: ".85rem",
                                        }}
                                    >
                                        <button
                                            onClick={() => setOpen(isOpen ? null : i)}
                                            style={{
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                background: "transparent",
                                                border: "none",
                                                padding: 0,
                                                cursor: "pointer",
                                                textAlign: "left",
                                                color: "#000000",   // ← BLACK
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize: "1.05rem",
                                                    fontWeight: 600,
                                                    letterSpacing: "-0.15px",
                                                }}
                                            >
                                                {item.title}
                                            </span>

                                            <span
                                                style={{
                                                    transform: isOpen
                                                        ? "rotate(90deg)"
                                                        : "rotate(0deg)",
                                                    transition: "transform .2s ease",
                                                    fontSize: "1.2rem",
                                                }}
                                            >
                                                →
                                            </span>
                                        </button>

                                        {isOpen && (
                                            <p
                                                style={{
                                                    marginTop: ".45rem",
                                                    fontSize: ".95rem",
                                                    lineHeight: 1.55,
                                                    color: "rgba(0,0,0,0.9)", // ← BLACK
                                                }}
                                            >
                                                {item.desc}
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ================= RIGHT — CAROUSEL ================= */}
                    <div>
                        <div
                            style={{
                                position: "relative",
                                overflow: "hidden",
                                borderRadius: "28px",
                                boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
                            }}
                            onMouseEnter={stopAutoplay}
                            onMouseLeave={startAutoplay}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    transform: `translateX(-${index * 100}%)`,
                                    transition: "transform .7s cubic-bezier(.25,.1,.25,1)",
                                }}
                            >
                                {images.map((src, i) => (
                                    <img
                                        key={i}
                                        src={src}
                                        alt=""
                                        style={{
                                            minWidth: "100%",
                                            height: "300px",
                                            objectFit: "cover",
                                        }}
                                    />
                                ))}
                            </div>

                            <button onClick={prev} style={arrowStyle("left")}>‹</button>
                            <button onClick={next} style={arrowStyle("right")}>›</button>
                        </div>

                        {/* DOTS */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "10px",
                                marginTop: "1.2rem",
                            }}
                        >
                            {images.map((_, i) => (
                                <div
                                    key={i}
                                    onClick={() => setIndex(i)}
                                    style={{
                                        width: index === i ? 14 : 8,
                                        height: 8,
                                        borderRadius: 999,
                                        background:
                                            index === i
                                                ? "#000000"                // ← BLACK
                                                : "rgba(0,0,0,0.6)",       // ← BLACK
                                        transition: "all .25s ease",
                                        cursor: "pointer",
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

const arrowStyle = (side) => ({
    position: "absolute",
    top: "50%",
    [side]: "14px",
    transform: "translateY(-50%)",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.9)",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
});
