import React from "react";

/**
 * ==========================
 * OLD ESTIMATOR (COMMENTED OUT)
 * ==========================
 * Wklej tutaj swój obecny kod SavingsEstimatorCurrency
 * i zostaw go jako komentarz, żeby nie był używany w MVP.
 *
 * 1) Wklej CAŁY swój stary komponent poniżej
 * 2) Zostaw zakomentowany
 *
 * Przykład:
 *
 * export default function SavingsEstimatorCurrency() {
 *   ...twój stary kod...
 * }
 *
 */

/* 
export default function SavingsEstimatorCurrency() {
  // <-- WKLEJ TU CAŁY STARY KOD i zostaw w komentarzu
}
*/


/**
 * ==========================
 * MVP Estimator (SIMPLE)
 * ==========================
 * - Nie pokazuje porównań do agencji ani “modelu”
 * - Tylko: stawka x godziny + 10% ICare fee
 * - Prosty komunikat i disclaimer
 */

export default function SavingsEstimatorCurrency() {
    const BRAND = "#1FAB1F";
    const TEXT = "#0F172A";

    const ranges = React.useMemo(
        () => ({
            PLN: { min: 30, max: 65, step: 1, default: 40 },
            EUR: { min: 12, max: 35, step: 0.5, default: 18 },
            GBP: { min: 12, max: 40, step: 0.5, default: 16 },
        }),
        []
    );

    const [currency, setCurrency] = React.useState("PLN");
    const [period, setPeriod] = React.useState("monthly"); // weekly | monthly
    const [hourly, setHourly] = React.useState(ranges.PLN.default);
    const [hoursWeek, setHoursWeek] = React.useState(20);

    const range = ranges[currency] ?? ranges.PLN;

    React.useEffect(() => {
        setHourly(range.default);
    }, [currency, range.default]);

    const nf = React.useMemo(
        () =>
            new Intl.NumberFormat(undefined, {
                style: "currency",
                currency,
            }),
        [currency]
    );

    const { careCost, icareFee, total, label } = React.useMemo(() => {
        const weeksPerMonth = 4.33;
        const multiplier = period === "monthly" ? weeksPerMonth : 1;

        const base = hourly * hoursWeek * multiplier;
        const fee = base * 0.1; // MVP: simple 10% fee
        const sum = base + fee;

        return {
            careCost: base,
            icareFee: fee,
            total: sum,
            label: period === "monthly" ? "Monthly" : "Weekly",
        };
    }, [hourly, hoursWeek, period]);

    const microCSS = `
      @media (max-width: 860px) {
        .icare-est-grid { grid-template-columns: 1fr !important; }
      }
    `;

    return (
        <section
            id="estimator"
            aria-label="Care cost estimator"
            style={{
                padding: "clamp(64px, 8vw, 96px) 0",
                background: "#e8e7d7",
                borderTop: "1px solid rgba(15,23,42,0.06)",
                borderBottom: "1px solid rgba(15,23,42,0.06)",
                color: TEXT,
            }}
        >
            <style>{microCSS}</style>

            <div
                className="icare-est-grid"
                style={{
                    maxWidth: 1180,
                    margin: "0 auto",
                    padding: "0 clamp(18px, 3.2vw, 34px)",
                    display: "grid",
                    gridTemplateColumns: "1fr 1.15fr",
                    gap: "clamp(28px, 4vw, 54px)",
                    alignItems: "start",
                }}
            >
                {/* LEFT */}
                <div style={{ color: TEXT }}>
                    <h2
                        style={{
                            margin: 0,
                            fontWeight: 900,
                            letterSpacing: "-0.3px",
                            color: TEXT,
                            fontSize: "clamp(1.9rem, 2.6vw, 2.35rem)",
                            lineHeight: 1.1,
                        }}
                    >
                        Quick Cost Estimator
                    </h2>

                    <p
                        style={{
                            color: TEXT,
                            opacity: 0.9,
                            marginTop: "1.05rem",
                            fontSize: "1.06rem",
                            lineHeight: 1.7,
                            maxWidth: "58ch",
                            fontWeight: 550,
                        }}
                    >
                        <strong>  See how much you could save with Icare.<br /></strong>

                        Estimate care costs in seconds. <br />Set an hourly rate, weekly hours and see your total.
                    </p>

                    <div
                        style={{
                            marginTop: "1.1rem",
                            padding: "12px 14px",
                            borderRadius: 16,
                            background: "rgba(255, 255, 255, 0.40)",
                            border: "1px solid rgba(15,23,42,0.10)",
                            boxShadow: "0 10px 24px rgba(15,23,42,0.06)",
                            maxWidth: "60ch",
                        }}
                    >
                        <div style={{ fontWeight: 900, fontSize: ".92rem", marginBottom: 6 }}>
                            Note:
                        </div>
                        <div style={{ fontSize: ".92rem", opacity: 0.82, fontWeight: 650, lineHeight: 1.55 }}>
                            This is an estimate.<br />Final pricing depends on the caregiver’s rate and your care needs.
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div
                    style={{
                        display: "grid",
                        gap: 18,
                    }}
                >
                    {/* FORM */}
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        style={{
                            padding: "clamp(18px, 2vw, 24px)",
                            display: "grid",
                            gap: 14,
                            background: "#fff",
                            borderRadius: 20,
                            boxShadow: "0 16px 36px rgba(15,23,42,0.08)",
                        }}
                    >
                        {/* Currency */}
                        <label style={{ display: "grid", gap: 6 }}>
                            <span style={{ fontWeight: 900, fontSize: ".88rem", color: TEXT }}>Currency</span>
                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                style={{
                                    border: "1px solid rgba(15,23,42,0.12)",
                                    borderRadius: 12,
                                    padding: "10px 12px",
                                    fontSize: "0.98rem",
                                    background: "#fff",
                                    color: TEXT,
                                }}
                            >
                                <option value="PLN">PLN — zł</option>
                                <option value="EUR">EUR — €</option>
                                <option value="GBP">GBP — £</option>
                            </select>
                            <span style={{ fontSize: ".82rem", opacity: 0.7, fontWeight: 650 }}>
                                Typical range suggested — you can change the rate freely.
                            </span>
                        </label>

                        {/* Period */}
                        <label style={{ display: "grid", gap: 6 }}>
                            <span style={{ fontWeight: 900, fontSize: ".88rem", color: TEXT }}>Show totals as</span>
                            <select
                                value={period}
                                onChange={(e) => setPeriod(e.target.value)}
                                style={{
                                    border: "1px solid rgba(15,23,42,0.12)",
                                    borderRadius: 12,
                                    padding: "10px 12px",
                                    fontSize: "0.98rem",
                                    background: "#fff",
                                    color: TEXT,
                                }}
                            >
                                <option value="monthly">Monthly</option>
                                <option value="weekly">Weekly</option>
                            </select>
                        </label>

                        {/* Hourly */}
                        <label style={{ display: "grid", gap: 8 }}>
                            <span style={{ fontWeight: 900, fontSize: ".88rem", color: TEXT }}>Hourly rate</span>

                            <input
                                type="number"
                                value={hourly}
                                min={range.min}
                                max={range.max}
                                step={range.step}
                                onChange={(e) => setHourly(Number(e.target.value))}
                                style={{
                                    border: "1px solid rgba(15,23,42,0.12)",
                                    borderRadius: 12,
                                    padding: "10px 12px",
                                    fontSize: "0.98rem",
                                    color: TEXT,
                                }}
                            />

                            <input
                                type="range"
                                min={range.min}
                                max={range.max}
                                step={range.step}
                                value={hourly}
                                onChange={(e) => setHourly(Number(e.target.value))}
                                style={{ width: "100%", accentColor: BRAND, cursor: "pointer" }}
                            />

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontSize: ".82rem",
                                    color: TEXT,
                                    opacity: 0.72,
                                    fontWeight: 800,
                                }}
                            >
                                <span>{range.min}</span>
                                <span>{range.max}</span>
                            </div>
                        </label>

                        {/* Hours */}
                        <label style={{ display: "grid", gap: 6 }}>
                            <span style={{ fontWeight: 900, fontSize: ".88rem", color: TEXT }}>
                                Hours per week
                            </span>
                            <input
                                type="number"
                                value={hoursWeek}
                                min={1}
                                max={168}
                                onChange={(e) => setHoursWeek(Number(e.target.value))}
                                style={{
                                    border: "1px solid rgba(15,23,42,0.12)",
                                    borderRadius: 12,
                                    padding: "10px 12px",
                                    fontSize: "0.98rem",
                                    color: TEXT,
                                }}
                            />
                            <span style={{ fontSize: ".82rem", opacity: 0.7, fontWeight: 650 }}>
                                Example: 20h/week for part-time support.
                            </span>
                        </label>

                        {/* Fee badge */}
                        <div
                            style={{
                                marginTop: 4,
                                padding: "10px 14px",
                                borderRadius: 12,
                                background: "rgba(31,171,31,0.06)",
                                border: "1px solid rgba(31,171,31,0.18)",
                                fontWeight: 850,
                                fontSize: ".9rem",
                                color: TEXT,
                                width: "fit-content",
                            }}
                        >
                            ICare fee: <span style={{ fontWeight: 950 }}>10%</span>
                        </div>
                    </form>

                    {/* RESULTS */}
                    <div
                        style={{
                            padding: "clamp(18px, 2vw, 24px)",
                            display: "grid",
                            gap: 14,
                            background: "#fff",
                            borderRadius: 20,
                            boxShadow: "0 16px 36px rgba(15,23,42,0.08)",
                            color: TEXT,
                        }}
                    >
                        <h3 style={{ margin: 0, fontWeight: 950, fontSize: "clamp(1.08rem, 1.5vw, 1.22rem)" }}>
                            {label} estimate
                        </h3>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: 14,
                            }}
                        >
                            <div
                                style={{
                                    borderRadius: 16,
                                    padding: "14px",
                                    background: "rgba(241,245,249,0.7)",
                                }}
                            >
                                <div style={{ fontSize: ".84rem", opacity: 0.78, marginBottom: 4, fontWeight: 850 }}>
                                    Care cost
                                </div>
                                <div style={{ fontWeight: 950, fontSize: "1.08rem" }}>{nf.format(careCost)}</div>
                            </div>

                            <div
                                style={{
                                    borderRadius: 16,
                                    padding: "14px",
                                    background: "rgba(241,245,249,0.7)",
                                }}
                            >
                                <div style={{ fontSize: ".84rem", opacity: 0.78, marginBottom: 4, fontWeight: 850 }}>
                                    ICare fee (10%)
                                </div>
                                <div style={{ fontWeight: 950, fontSize: "1.08rem" }}>{nf.format(icareFee)}</div>
                            </div>

                            <div
                                style={{
                                    gridColumn: "1 / -1",
                                    borderRadius: 18,
                                    padding: "16px",
                                    background: "rgba(31,171,31,0.10)",
                                    border: "1px solid rgba(31,171,31,0.18)",
                                }}
                            >
                                <div style={{ fontSize: ".84rem", opacity: 0.8, marginBottom: 6, fontWeight: 900 }}>
                                    Total (estimate)
                                </div>
                                <div style={{ fontWeight: 980, fontSize: "1.28rem" }}>{nf.format(total)}</div>
                            </div>
                        </div>

                        <div style={{ fontSize: ".88rem", opacity: 0.72, fontWeight: 650, lineHeight: 1.55 }}>
                            This estimate updates instantly and is shown before you contact a caregiver.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
