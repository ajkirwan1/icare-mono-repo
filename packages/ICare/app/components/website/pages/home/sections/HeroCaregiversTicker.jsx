/**
 * ICare — New caregivers ticker
 */
export default function ICareNewCaregiversTickerSection() {
    const TEXT = "#0F172A";
    const PANEL = "rgba(255,255,255,0.78)";
    const BORDER = "rgba(15,23,42,0.14)";

    const wrap = {
        width: "100%",
        background: "rgba(255, 249, 239, 0.85)",
        color: TEXT,
        padding: "4rem 3rem",
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
        gridTemplateColumns: "85px 1fr", // większy avatar
        gap: 18,
        alignItems: "center",
        flex: "0 0 auto",
    };

    const avatarImg = {
        width: 85,
        height: 85,
        borderRadius: 999,
        background: "#bbb",
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
        <section style={wrap} aria-label="New people on ICare">
            <div style={container}>
                <div style={header}>
                    <h2 style={h2}>New people on ICare</h2>
                    <p style={lead}>People are joining ICare and setting up their profiles.</p>
                </div>

                {/* MARQUEE */}
                <div style={rail}>
                    <div className="icare-marquee" style={track}>
                        <ul style={{ ...group, listStyle: "none", margin: 0, padding: 0 }}>
                            {base.map((x, i) => (
                                <li key={`a-${i}`} style={card}>
                                    <img
                                        src={`https://source.unsplash.com/${x.imgId}/140x140`}
                                        alt={`Photo of ${x.n}`}
                                        style={avatarImg}
                                    />
                                    <div style={{ lineHeight: 1.55 }}>
                                        <strong style={{ fontSize: "1.05rem" }}>{x.n}</strong>
                                        <div style={{ opacity: 0.75, marginTop: 4 }}>
                                            Joined {x.joined}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

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
