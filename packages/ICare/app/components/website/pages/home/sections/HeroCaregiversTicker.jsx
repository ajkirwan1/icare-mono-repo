import React, { useState } from "react";

/**
 * ICare — New caregivers ticker + expandable list
 */
export default function ICareNewCaregiversTickerSection() {
    const [showAll, setShowAll] = useState(false);

    const TEXT = "#0F172A";
    const BG = "rgba(217, 215, 189, 0.55)";
    const PANEL = "rgba(255,255,255,0.78)";
    const BORDER = "rgba(15,23,42,0.14)";

    const wrap = {
        width: "100%",
        background: "rgb(236 221 209 / 55%)",
        color: TEXT,
        padding: "clamp(3.6rem, 5.6vw, 5rem) 0",
        fontFamily:
            "Nunito, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    };

    const container = {
        width: "min(96vw, 1580px)",
        margin: "0 auto"
    };

    const header = {
        maxWidth: "78ch",
        display: "grid",
        gap: 10,
        marginBottom: 24
    };

    const h2 = {
        margin: 0,
        fontWeight: 600,
        fontSize: "clamp(1.55rem, 2.2vw, 1.9rem)"
    };

    const lead = {
        margin: 0,
        fontWeight: 400,
        fontSize: "1.4rem",
        lineHeight: 1.6
    };

    const rail = {
        width: "100%",
        overflow: "hidden",
        padding: "18px 0"
    };

    const track = {
        display: "flex",
        width: "max-content",
        animation: "icareMarquee 150s linear infinite"
    };

    const group = {
        display: "flex",
        gap: 14,
        paddingRight: 14
    };

    const card = {
        minWidth: 340,
        borderRadius: 22,
        border: `1px solid ${BORDER}`,
        background: PANEL,
        padding: "16px 18px",
        display: "grid",
        gridTemplateColumns: "56px 1fr",
        gap: 14,
        alignItems: "center",
        flex: "0 0 auto"
    };

    const avatarImg = {
        width: 52,
        height: 52,
        borderRadius: 999,
        objectFit: "cover",
        border: "1px solid rgba(15,23,42,0.12)"
    };

    const people = [
        { n: "Zita", age: 34, city: "Amsterdam", joined: "Jan 2026", imgId: "d2KfqHOZsCE" },
        { n: "Valerie", age: 41, city: "Berlin", joined: "Jan 2026", imgId: "eXYuC9k6P_c" },
        { n: "Polico", age: 29, city: "Lisbon", joined: "Feb 2026", imgId: "v7Jja2ChN6s" },
        { n: "Paulina", age: 48, city: "Vienna", joined: "Feb 2026", imgId: "Xmy_E8diY4w" },
        { n: "Elena", age: 37, city: "Barcelona", joined: "Jan 2026", imgId: "c_GmwfHBDzk" },
        { n: "Marta", age: 45, city: "Prague", joined: "Feb 2026", imgId: "iFgRcqHznqg" }
    ];

    const base = [...people, ...people, ...people, ...people];

    return (
        <section style={wrap}>
            <div style={container}>
                <div style={header}>
                    <h2 style={h2}>New people just joined ICare</h2>
                    <p style={lead}>More people are joining ICare and completing their profiles.</p>
                </div>

                {/* MARQUEE */}
                <div style={rail}>
                    <div className="icare-marquee" style={track}>
                        <div style={group}>
                            {base.map((x, i) => (
                                <div key={`a-${i}`} style={card}>
                                    <img
                                        src={`https://source.unsplash.com/${x.imgId}/140x140`}
                                        alt=""
                                        style={avatarImg}
                                    />
                                    <div>
                                        <strong>{x.n}</strong> · Age {x.age}
                                        <div>Joined {x.joined}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* VIEW ALL */}
                <div style={{ marginTop: 12 }}>
                    <button
                        onClick={() => setShowAll(v => !v)}
                        style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                            fontWeight: 600,
                            cursor: "pointer",
                            color: TEXT
                        }}
                    >
                        {showAll ? "Show less people" : "View all people"}
                    </button>
                </div>

                {/* EXPANDED GRID */}
                {showAll && (
                    <div
                        style={{
                            marginTop: 24,
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                            gap: 16
                        }}
                    >
                        {people.map((x, i) => (
                            <div key={`grid-${i}`} style={card}>
                                <img
                                    src={`https://source.unsplash.com/${x.imgId}/140x140`}
                                    alt=""
                                    style={avatarImg}
                                />
                                <div>
                                    <strong>{x.n}</strong> · Age {x.age} · {x.city}
                                    <div>Joined {x.joined}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style>{`
              @keyframes icareMarquee {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
              }

              @media (prefers-reduced-motion: reduce) {
                .icare-marquee { animation: none !important; }
              }
            `}</style>
        </section>
    );
}
