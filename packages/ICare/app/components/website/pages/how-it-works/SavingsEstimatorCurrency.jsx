import React from "react";

export default function SavingsEstimatorCurrency() {
    const BRAND = "#1FAB1F";

    const [hourly, setHourly] = React.useState(20);
    const [hoursWeek, setHoursWeek] = React.useState(40);
    const [agencyMargin, setAgencyMargin] = React.useState(35);
    const [currency, setCurrency] = React.useState("PLN");

    const nf = React.useMemo(
        () =>
            new Intl.NumberFormat(undefined, {
                style: "currency",
                currency,
            }),
        [currency]
    );

    const {
        monthlyBase,
        monthlyAgency,
        monthlyICare,
        monthlySave,
        savePct,
    } = React.useMemo(() => {
        const weeks = 4.33;
        const base = hourly * hoursWeek * weeks;
        const agency = base * (1 + agencyMargin / 100);
        const icare = base * 1.1; // 10% ICare fee
        const save = Math.max(0, agency - icare);
        const pct = agency > 0 ? (save / agency) * 100 : 0;

        return {
            monthlyBase: base,
            monthlyAgency: agency,
            monthlyICare: icare,
            monthlySave: save,
            savePct: pct,
        };
    }, [hourly, hoursWeek, agencyMargin]);

    return (
        <section
            id="estimator"
            aria-label="Cost & Savings Estimator"
            style={{
                margin: "5.4rem auto",
                maxWidth: 1080,
                padding: "0 clamp(14px, 3.6vw, 28px)",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                display: "grid",
                gridTemplateColumns: "1fr 1.4fr",
                gap: "clamp(40px, 4.5vw, 70px)",
                alignItems: "start",
            }}
        >
            {/* ================= LEFT SIDE ================= */}
            <div style={{ animation: "fadeEstimator 0.8s ease both" }}>
                <h2
                    style={{
                        margin: 0,
                        fontWeight: 800,
                        letterSpacing: ".2px",
                        color: "#0f172a",
                        fontSize: "clamp(1.9rem, 2.7vw, 2.3rem)",
                        lineHeight: 1.2,
                    }}
                >
                    Cost & Savings Estimator
                </h2>

                <div
                    aria-hidden="true"
                    style={{
                        width: 0,
                        height: 4,
                        background: BRAND,
                        borderRadius: 999,
                        margin: "0.9rem 0 1.3rem 0",
                        opacity: 0.9,
                    }}
                />

                <p
                    style={{
                        color: "#475569",
                        margin: 0,
                        fontSize: "1rem",
                        lineHeight: "1.6",
                        fontWeight: 600,
                        maxWidth: "50ch",
                    }}
                >
                    Estimate how much you and your caregiver can save each month when you work
                    directly — without agency margins or hidden fees.
                </p>
            </div>

            {/* ================= RIGHT SIDE ================= */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
                    gap: "clamp(18px, 2.2vw, 26px)",
                    alignItems: "stretch",
                }}
            >
                {/* ===== FORM ===== */}
                <form
                    onSubmit={(e) => e.preventDefault()}
                    style={{
                        border: "1px solid rgba(15,23,42,0.08)",
                        borderRadius: 18,
                        padding: "clamp(22px, 2vw, 28px)",
                        background: "#FFFFFF",
                        boxShadow: "0 8px 22px rgba(15,23,42,0.05)",
                        display: "grid",
                        gap: 14,
                        animation: "fadeCard 0.8s ease 0.15s both",
                    }}
                >
                    {/* Currency */}
                    <label style={{ display: "grid", gap: 6 }}>
                        <span
                            style={{
                                fontWeight: 800,
                                color: "#1f2a37",
                                fontSize: ".9rem",
                            }}
                        >
                            Currency
                        </span>
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value.split(" ")[0])}
                            style={{
                                border: "1px solid rgba(15,23,42,0.18)",
                                borderRadius: 12,
                                padding: "11px 13px",
                                fontSize: ".95rem",
                                background: "#fff",
                            }}
                        >
                            <option>PLN — zł</option>
                            <option>EUR — €</option>
                            <option>GBP — £</option>
                            <option>USD — $</option>
                        </select>
                    </label>

                    {/* Hourly rate */}
                    <label style={{ display: "grid", gap: 6 }}>
                        <span style={{ fontWeight: 800, color: "#1f2a37", fontSize: ".9rem" }}>
                            Hourly rate
                        </span>
                        <input
                            type="number"
                            value={hourly}
                            onChange={(e) => setHourly(Number(e.target.value))}
                            style={{
                                border: "1px solid rgba(15,23,42,0.18)",
                                borderRadius: 12,
                                padding: "11px 13px",
                                fontSize: ".95rem",
                            }}
                        />
                    </label>

                    {/* Hours per week */}
                    <label style={{ display: "grid", gap: 6 }}>
                        <span style={{ fontWeight: 800, color: "#1f2a37", fontSize: ".9rem" }}>
                            Hours per week
                        </span>
                        <input
                            type="number"
                            value={hoursWeek}
                            onChange={(e) => setHoursWeek(Number(e.target.value))}
                            style={{
                                border: "1px solid rgba(15,23,42,0.18)",
                                borderRadius: 12,
                                padding: "11px 13px",
                                fontSize: ".95rem",
                            }}
                        />
                    </label>

                    {/* Agency margin */}
                    <label style={{ display: "grid", gap: 6 }}>
                        <span style={{ fontWeight: 800, color: "#1f2a37", fontSize: ".9rem" }}>
                            Agency margin (%)
                        </span>
                        <input
                            type="number"
                            value={agencyMargin}
                            onChange={(e) => setAgencyMargin(Number(e.target.value))}
                            style={{
                                border: "1px solid rgba(15,23,42,0.18)",
                                borderRadius: 12,
                                padding: "11px 13px",
                                fontSize: ".95rem",
                            }}
                        />
                    </label>

                    {/* ICare flat fee */}
                    <div
                        style={{
                            marginTop: 2,
                            padding: "9px 11px",
                            borderRadius: 12,
                            background: "rgba(31,171,31,0.08)",
                            border: "1px solid rgba(31,171,31,0.20)",
                            color: "#1f2a37",
                            fontWeight: 700,
                            fontSize: ".9rem",
                        }}
                    >
                        ICare fee: <span style={{ color: BRAND }}>flat 10%</span> on contract
                    </div>
                </form>

                {/* ===== RESULTS ===== */}
                <div
                    style={{
                        border: "1px solid rgba(15,23,42,0.08)",
                        borderRadius: 18,
                        padding: "clamp(22px, 2vw, 28px)",
                        background: "#FFFFFF",
                        boxShadow: "0 8px 22px rgba(15,23,42,0.05)",
                        display: "grid",
                        gap: 14,
                        animation: "fadeCard 0.8s ease 0.25s both",
                    }}
                >
                    <h3
                        style={{
                            margin: 0,
                            fontWeight: 900,
                            color: "#1f2a37",
                            fontSize: "clamp(1.05rem, 1.9vw, 1.25rem)",
                        }}
                    >
                        Monthly estimate
                    </h3>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 10,
                        }}
                    >
                        {[
                            { k: "Base cost", v: monthlyBase },
                            { k: "Agency total", v: monthlyAgency },
                            { k: "ICare total", v: monthlyICare },
                            { k: "You save with ICare", v: monthlySave, highlight: true },
                        ].map((row) => (
                            <div
                                key={row.k}
                                style={{
                                    border: "1px solid rgba(15,23,42,0.08)",
                                    borderRadius: 10,
                                    padding: "12px 14px",
                                    background: row.highlight
                                        ? "rgba(31,171,31,0.06)"
                                        : "rgba(255,255,255,0.96)",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: ".82rem",
                                        color: "#475569",
                                        marginBottom: 3,
                                        fontWeight: 700,
                                    }}
                                >
                                    {row.k}
                                </div>

                                <div
                                    style={{
                                        fontWeight: 900,
                                        fontSize: "1.1rem",
                                        color: row.highlight ? BRAND : "#1f2a37",
                                    }}
                                >
                                    {nf.format(row.v)} {currency}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ===== SAVINGS BAR ===== */}
                    <div style={{ marginTop: 8 }}>
                        <div
                            style={{
                                height: 9,
                                width: "100%",
                                background: "#F1F5F9",
                                borderRadius: 999,
                                overflow: "hidden",
                            }}
                        >
                            <div
                                style={{
                                    height: "100%",
                                    width: `${Math.max(
                                        0,
                                        Math.min(100, savePct)
                                    ).toFixed(0)}%`,
                                    background: BRAND,
                                    transition: "width 0.6s ease",
                                }}
                            />
                        </div>

                        <div
                            style={{
                                marginTop: 6,
                                fontSize: ".88rem",
                                color: "#334155",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <span>Estimated savings vs agency</span>
                            <strong style={{ color: BRAND }}>
                                {savePct.toFixed(0)}%
                            </strong>
                        </div>
                    </div>
                </div>
            </div>

            {/* ANIMATIONS */}
            <style>{`
                @keyframes fadeEstimator {
                    from { opacity: 0; transform: translateY(16px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeCard {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section >
    );
}
