import React from "react";

const BRAND = "#1FAB1F";

export default function CookieSettingsPanel() {
    const [analytics, setAnalytics] = React.useState(false);
    const [marketing, setMarketing] = React.useState(false);

    return (
        <section
            id="cookies"
            style={{
                margin: "0 auto 3.5rem",
                maxWidth: 1100,
                padding: "0 clamp(16px,4vw,32px)",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <article
                style={{
                    background: "#FFFFFF",
                    border: "1px solid rgba(15,23,42,.10)",
                    borderRadius: 16,
                    padding: "18px 18px",
                    boxShadow: "0 8px 22px rgba(2,8,23,.06)",
                    display: "grid",
                    gap: 14,
                }}
            >
                <h2
                    style={{
                        margin: 0,
                        color: "#1f2a37",
                        fontWeight: 900,
                        fontSize: "clamp(1.05rem,2vw,1.25rem)",
                    }}
                >
                    Cookie Settings
                </h2>

                <div
                    style={{
                        width: 140,
                        height: 3,
                        background: BRAND,
                        borderRadius: 999,
                        margin: ".6rem 0 1rem",
                    }}
                />

                {/* OPTIONS */}
                <div style={{ display: "grid", gap: 12 }}>
                    <label style={cookieRow}>
                        <input type="checkbox" disabled defaultChecked />
                        <span>Essential cookies (required for login/session)</span>
                    </label>

                    <label style={cookieRow}>
                        <input
                            type="checkbox"
                            checked={analytics}
                            onChange={(e) => setAnalytics(e.target.checked)}
                        />
                        <span>Analytics (usage insights)</span>
                    </label>

                    <label style={cookieRow}>
                        <input
                            type="checkbox"
                            checked={marketing}
                            onChange={(e) => setMarketing(e.target.checked)}
                        />
                        <span>Marketing (personalised content)</span>
                    </label>
                </div>

                {/* BUTTONS */}
                <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                    <button style={btnPrimary}>Save preferences</button>
                    <button style={btnGhost}>Decline non-essential</button>
                </div>
            </article>
        </section>
    );
}

/* ===== Styles ===== */

const cookieRow = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    color: "#334155",
    fontWeight: 600,
};

const btnPrimary = {
    border: "none",
    background: BRAND,
    color: "#fff",
    padding: ".75rem 1rem",
    borderRadius: 999,
    fontWeight: 800,
    letterSpacing: ".3px",
    cursor: "pointer",
};

const btnGhost = {
    border: "1.5px solid rgba(31,171,31,.45)",
    background: "#fff",
    color: "#0F172A",
    padding: ".7rem 1rem",
    borderRadius: 999,
    fontWeight: 800,
    letterSpacing: ".3px",
    cursor: "pointer",
};
