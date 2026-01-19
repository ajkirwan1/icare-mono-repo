import React from "react";

/**
 * ICare — New caregivers ticker (seamless, always visible)
 * ✅ rectangular cards
 * ✅ ALWAYS visible (no gaps)
 * ✅ big avatars
 * ✅ very slow, calm motion
 * ✅ reduced motion support
 * ✅ wider section
 * ✅ NO box shadow
 */
export default function ICareNewCaregiversTickerSection() {
    const TEXT = "#0F172A";

    const BG = "rgba(217, 215, 189, 0.55)";
    const PANEL = "rgba(255,255,255,0.78)";
    const BORDER = "rgba(15,23,42,0.14)";

    const wrap = {
        width: "100%",
        background: BG,
        color: TEXT,
        padding: "clamp(3.6rem, 5.6vw, 4.8rem) 0",
        fontFamily:
            "Nunito, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    };

    // ✅ wider section
    const container = {
        width: "min(96vw, 1580px)",
        margin: "0 auto",
    };

    const header = {
        maxWidth: "78ch",
        display: "grid",
        gap: 10,
        margin: "0 0 clamp(18px, 3.0vw, 26px)",
        textAlign: "left",
    };

    const h2 = {
        margin: 0,
        fontWeight: 600,
        letterSpacing: "-0.35px",
        lineHeight: 1.2,
        fontSize: "clamp(1.55rem, 2.2vw, 1.9rem)",
        color: TEXT,
    };

    const lead = {
        margin: 0,
        fontWeight: 600,
        lineHeight: 1.65,
        fontSize: "1.18rem",
        color: TEXT,
        maxWidth: "78ch",
    };

    const rail = {
        width: "100%",
        overflow: "hidden",
        padding: "18px 0",
    };

    const track = {
        display: "flex",
        width: "max-content",
        alignItems: "stretch",
        willChange: "transform",
        animation: "icareMarquee 150s linear infinite",
    };

    const group = {
        display: "flex",
        gap: 14,
        alignItems: "stretch",
        paddingRight: 14,
    };

    // ❗ FLAT CARDS — NO SHADOW
    const card = {
        minWidth: 340,
        borderRadius: 22,
        border: `1px solid ${BORDER}`,
        background: PANEL,
        padding: "14px 16px",
        display: "grid",
        gridTemplateColumns: "56px 1fr",
        gap: 14,
        alignItems: "center",
        flex: "0 0 auto",
    };

    const avatarImg = {
        width: 52,
        height: 52,
        borderRadius: 999,
        objectFit: "cover",
        border: `1px solid rgba(15,23,42,0.12)`,
        background: "rgba(15,23,42,0.06)",
    };

    const people = [
        { n: "Zita", age: 34, imgId: "d2KfqHOZsCE" },
        { n: "Valerie", age: 41, imgId: "eXYuC9k6P_c" },
        { n: "Polico", age: 29, imgId: "v7Jja2ChN6s" },
        { n: "Paulina", age: 48, imgId: "Xmy_E8diY4w" },
    ];

    const base = [...people, ...people, ...people, ...people];

    return (
        <section aria-label="New caregivers just joined" style={wrap}>
            <div style={container}>
                <div style={header}>
                    <h2 style={h2}>New people just joined ICare</h2>
                    <p style={lead}>More people are joining ICare and completing their profiles.</p>
                </div>

                <div style={rail}>
                    <div className="icare-marquee" style={track} aria-hidden="true">
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
                                        <div>Just joined ICare</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={group}>
                            {base.map((x, i) => (
                                <div key={`b-${i}`} style={card}>
                                    <img
                                        src={`https://source.unsplash.com/${x.imgId}/140x140`}
                                        alt=""
                                        style={avatarImg}
                                    />
                                    <div>
                                        <strong>{x.n}</strong> · Age {x.age}
                                        <div>Just joined ICare</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes icareMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .icare-marquee { animation: none !important; }
        }
      `}</style>
        </section>
    );
}
