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
            "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    };

    const container = {
        width: "min(96vw, 1580px)",
        margin: "0 auto",
    };

    const header = {
        maxWidth: "78ch",
        display: "grid",
        gap: 12,
        marginBottom: 28,
    };

    const h2 = {
        margin: 0,
        fontWeight: 600,
        fontSize: "clamp(1.55rem, 2.2vw, 1.9rem)",
    };

    const lead = {
        margin: 0,
        fontWeight: 400,
        fontSize: "1.4rem",
        lineHeight: 1.65,
    };

    const rail = {
        width: "100%",
        overflow: "hidden",
        padding: "22px 0",
    };

    const track = {
        display: "flex",
        width: "max-content",
        animation: "icareMarquee 150s linear infinite",
    };

    const group = {
        display: "flex",
        gap: 18,
        paddingRight: 18,
    };

    // ⬇️ WIĘKSZE, WYŻSZE, MNIEJ SZEROKIE BOXY
    const card = {
        minWidth: 290, // było 340 (-15%)
        borderRadius: 26,
        border: `1px solid ${BORDER}`,
        background: PANEL,
        padding: "40px 22px", // więcej pionu
        display: "grid",
        gridTemplateColumns: "72px 1fr", // większy avatar
        gap: 18,
        alignItems: "center",
        flex: "0 0 auto",
    };

    const avatarImg = {
        width: 64,
        height: 64,
        borderRadius: 999,
        objectFit: "cover",
        border: "1px solid rgba(15,23,42,0.12)",
    };

    const people = [
        { n: "Ann", age: 34, city: "Amsterdam", joined: "Jan 2026", imgId: "d2KfqHOZsCE" },
        { n: "Valerie", age: 41, city: "Berlin", joined: "Jan 2026", imgId: "eXYuC9k6P_c" },
        { n: "Margaret", age: 29, city: "Lisbon", joined: "Feb 2026", imgId: "v7Jja2ChN6s" },
        { n: "Paulina", age: 48, city: "Vienna", joined: "Feb 2026", imgId: "Xmy_E8diY4w" },
        { n: "Elena", age: 37, city: "Barcelona", joined: "Jan 2026", imgId: "c_GmwfHBDzk" },
        { n: "Marta", age: 45, city: "Prague", joined: "Feb 2026", imgId: "iFgRcqHznqg" },
    ];

    const base = [...people, ...people, ...people, ...people];

    return (
        <section style={wrap}>
            <div style={container}>
                <div style={header}>
                    <h2 style={h2}>New people on ICare</h2>
                    <p style={lead}>People are joining ICare and setting up their profiles.</p>
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
                                    <div style={{ lineHeight: 1.55 }}>
                                        <strong style={{ fontSize: "1.05rem" }}>{x.n}</strong>
                                        <div style={{ opacity: 0.75, marginTop: 4 }}>
                                            Joined {x.joined}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* VIEW ALL */}
                <div style={{ marginTop: 14 }}>
                    <button
                        onClick={() => setShowAll((v) => !v)}
                        style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                            fontWeight: 600,
                            cursor: "pointer",
                            color: TEXT,
                        }}
                    >
                        {showAll ? "Show fewer people" : "View all people"}
                    </button>
                </div>

                {/* EXPANDED GRID */}
                {showAll && (
                    <div
                        style={{
                            marginTop: 28,
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
                            gap: 20,
                        }}
                    >
                        {people.map((x, i) => (
                            <div key={`grid-${i}`} style={card}>
                                <img
                                    src={`https://source.unsplash.com/${x.imgId}/140x140`}
                                    alt=""
                                    style={avatarImg}
                                />
                                <div style={{ lineHeight: 1.55 }}>
                                    <strong style={{ fontSize: "1.05rem" }}>
                                        {x.n}
                                    </strong>{" "}
                                    · {x.city}
                                    <div style={{ opacity: 0.75, marginTop: 4 }}>
                                        Joined {x.joined}
                                    </div>
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
