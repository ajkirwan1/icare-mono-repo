import React from "react";

/**
 * ICare — New caregivers ticker (seamless, always visible)
 * ✅ rectangular cards
 * ✅ ALWAYS visible (no gaps)
 * ✅ big avatars
 * ✅ very slow, calm motion
 * ✅ reduced motion support
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

    const container = {
        width: "min(92vw, 1100px)",
        margin: "0 auto",
    };

    const header = {
        maxWidth: "78ch",
        display: "grid",
        gap: 10,
        margin: "0 0 clamp(18px, 3.0vw, 26px)",
        padding: 0,
        textAlign: "left",
    };

    const h2 = {
        margin: 0,
        padding: 0,
        fontWeight: 600,
        letterSpacing: "-0.35px",
        lineHeight: 1.2,
        fontSize: "clamp(1.55rem, 2.2vw, 1.9rem)",
        color: TEXT,
    };

    const lead = {
        margin: 0,
        padding: 0,
        fontWeight: 600,
        lineHeight: 1.65,
        fontSize: "1.18rem",
        color: TEXT,
        maxWidth: "78ch",
    };

    const rail = {
        width: "100%",
        overflow: "hidden",
        borderTop: `1px solid ${BORDER}`,
        borderBottom: `1px solid ${BORDER}`,
        padding: "18px 0",
    };

    // ✅ outer track: contains TWO identical groups for seamless loop
    const track = {
        display: "flex",
        width: "max-content",
        alignItems: "stretch",
        willChange: "transform",
        animation: "icareMarquee 150s linear infinite", // very slow
    };

    const group = {
        display: "flex",
        gap: 14,
        alignItems: "stretch",
        paddingRight: 14, // tiny buffer so the seam never “kisses”
    };

    const card = {
        minWidth: 340,
        borderRadius: 22,
        border: `1px solid ${BORDER}`,
        background: PANEL,
        boxShadow: "0 14px 34px rgba(15,23,42,0.08)",
        padding: "14px 16px",
        display: "grid",
        gridTemplateColumns: "56px 1fr",
        gap: 14,
        alignItems: "center",
        boxSizing: "border-box",
        flex: "0 0 auto",
    };

    const avatarImg = {
        width: 52,
        height: 52,
        borderRadius: 999,
        objectFit: "cover",
        border: `1px solid rgba(15,23,42,0.12)`,
        boxShadow: "0 12px 26px rgba(15,23,42,0.10)",
        background: "rgba(15,23,42,0.06)",
        display: "block",
        flex: "0 0 auto",
    };

    const content = {
        display: "grid",
        gap: 7,
        minWidth: 0,
    };

    const nameRow = {
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        gap: 12,
    };

    const name = {
        margin: 0,
        fontWeight: 900,
        letterSpacing: "-0.15px",
        fontSize: "1.1rem",
        lineHeight: 1.15,
        color: TEXT,
        minWidth: 0,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    };

    const age = {
        margin: 0,
        fontWeight: 800,
        fontSize: "1.0rem",
        lineHeight: 1.15,
        color: "rgba(15,23,42,0.78)",
        whiteSpace: "nowrap",
        flex: "0 0 auto",
    };

    const note = {
        margin: 0,
        fontWeight: 700,
        fontSize: "1.02rem",
        lineHeight: 1.4,
        color: "rgba(15,23,42,0.88)",
    };

    const people = [
        { n: "Zita", age: 34, imgId: "d2KfqHOZsCE" },
        { n: "Valerie", age: 41, imgId: "eXYuC9k6P_c" },
        { n: "Polico", age: 29, imgId: "v7Jja2ChN6s" },
        { n: "Paulina", age: 48, imgId: "Xmy_E8diY4w" },
    ];

    // Make list longer so it fills screen nicely even on wide monitors
    const base = [...people, ...people, ...people, ...people];

    const renderCard = (x, i, suffix) => (
        <div key={`${x.n}-${suffix}-${i}`} className="icare-ticker-card" style={card}>
            <img
                src={`https://source.unsplash.com/${x.imgId}/140x140`}
                alt={`${x.n} avatar`}
                style={avatarImg}
                loading="lazy"
            />
            <div style={content}>
                <div style={nameRow}>
                    <div style={name}>{x.n}</div>
                    <div style={age}>Age {x.age}</div>
                </div>
                <div style={note}>Just joined ICare</div>
            </div>
        </div>
    );

    return (
        <section aria-label="New caregivers just joined" style={wrap}>
            <div style={container}>
                <div style={header}>
                    <h2 style={h2}>New caregivers just joined ICare</h2>
                    <p style={lead}>More carers are joining ICare and completing their profiles.</p>
                </div>

                <div style={rail}>
                    <div className="icare-marquee" style={track} aria-hidden="true">
                        {/* Group A */}
                        <div className="icare-marquee-group" style={group}>
                            {base.map((x, i) => renderCard(x, i, "a"))}
                        </div>
                        {/* Group B (duplicate for seamless loop) */}
                        <div className="icare-marquee-group" style={group}>
                            {base.map((x, i) => renderCard(x, i, "b"))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        /* Seamless: move exactly one group's width */
        @keyframes icareMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* keep it slow across screens */
        @media (max-width: 900px) {
          .icare-marquee { animation-duration: 170s !important; }
          .icare-ticker-card { min-width: 290px !important; border-radius: 20px !important; }
        }

        @media (max-width: 640px) {
          .icare-marquee { animation-duration: 190s !important; }
          .icare-ticker-card { min-width: 260px !important; border-radius: 18px !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .icare-marquee { animation: none !important; transform: translateX(0) !important; }
        }
      `}</style>
        </section>
    );
}
