import React from "react";

export default function SavingsEstimatorCurrency() {
    const BRAND = "#1FAB1F";

    // ✅ Suggested hourly ranges:
    // - MIN anchored to statutory minimum wage/hourly minimums (where applicable)
    // - MAX is a practical “typical upper bound” for UX (edit as needed)
    const hourlyRanges = React.useMemo(
        () => ({
            PLN: { min: 30.5, max: 60, step: 0.5 }, // PL minimum hourly rate (umowa zlecenie)
            EUR: { min: 12.82, max: 30, step: 0.1 }, // DE statutory minimum wage
            GBP: { min: 12.21, max: 35, step: 0.1 }, // UK National Living Wage
            USD: { min: 15, max: 45, step: 1 }, // placeholder range (not “official”)
        }),
        []
    );

    const snapToStep = (value, step) => {
        const decimals = (step.toString().split(".")[1] || "").length;
        const snapped = Math.round(value / step) * step;
        return Number(snapped.toFixed(decimals));
    };

    const [currency, setCurrency] = React.useState("PLN");
    const [period, setPeriod] = React.useState("monthly"); // "monthly" | "weekly"
    const [hourly, setHourly] = React.useState(40); // initial; will be auto-set on currency change
    const [hoursWeek, setHoursWeek] = React.useState(40);
    const [agencyMargin, setAgencyMargin] = React.useState(35);

    const [showFeeTip, setShowFeeTip] = React.useState(false);

    const range = hourlyRanges[currency] ?? hourlyRanges.PLN;

    // ✅ Smart default: on currency change, set hourly to midpoint of that currency range
    React.useEffect(() => {
        const midRaw = (range.min + range.max) / 2;
        setHourly(snapToStep(midRaw, range.step));
    }, [currency, range.min, range.max, range.step]);

    const nf = React.useMemo(
        () =>
            new Intl.NumberFormat(undefined, {
                style: "currency",
                currency,
            }),
        [currency]
    );

    const { baseCost, agencyTotal, icareTotal, youSave, savePct, periodLabel } =
        React.useMemo(() => {
            const weeksPerMonth = 4.33;
            const multiplier = period === "monthly" ? weeksPerMonth : 1;

            const base = hourly * hoursWeek * multiplier;
            const agency = base * (1 + agencyMargin / 100);
            const icare = base * 1.1; // 10% ICare fee
            const save = Math.max(0, agency - icare);
            const pct = agency > 0 ? (save / agency) * 100 : 0;

            return {
                baseCost: base,
                agencyTotal: agency,
                icareTotal: icare,
                youSave: save,
                savePct: pct,
                periodLabel: period === "monthly" ? "Monthly" : "Weekly",
            };
        }, [hourly, hoursWeek, agencyMargin, period]);

    const marketingLine = React.useMemo(() => {
        const pct = Math.round(savePct);
        if (youSave <= 0 || pct <= 0) {
            return `Working directly keeps pricing clear and fair — with a simple 10% ICare fee.`;
        }
        return `With a ${agencyMargin}% agency margin, going direct with ICare saves you about ${nf.format(
            youSave
        )} per ${period === "monthly" ? "month" : "week"} — roughly ${pct}% less than an agency.`;
    }, [youSave, savePct, agencyMargin, nf, period]);

    return (
        <section
            id="estimator"
            aria-label="Cost & Savings Estimator"
            style={{
                padding: "clamp(64px, 8vw, 96px) 0",
                background: "#bfc09c",
                borderTop: "1px solid rgba(15,23,42,0.06)",
                borderBottom: "1px solid rgba(15,23,42,0.06)",
            }}
        >
            <div
                style={{
                    maxWidth: 1180,
                    margin: "0 auto",
                    padding: "0 clamp(18px, 3.2vw, 34px)",
                    fontFamily:
                        "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                    display: "grid",
                    gridTemplateColumns: "1fr 1.35fr",
                    gap: "clamp(40px, 5vw, 64px)",
                    alignItems: "start",
                }}
            >
                {/* LEFT */}
                <div style={{ animation: "fadeEstimator 0.8s ease both" }}>
                    <h2
                        style={{
                            margin: 0,
                            fontWeight: 800,
                            letterSpacing: "-0.3px",
                            color: "#0F172A",
                            fontSize: "clamp(1.85rem, 2.6vw, 2.3rem)",
                            lineHeight: 1.1,
                        }}
                    >
                        Cost &amp; Savings Estimator
                    </h2>

                    <p
                        style={{
                            color: "#475569",
                            marginTop: "1.1rem",
                            fontSize: "1.05rem",
                            lineHeight: 1.65,
                            maxWidth: "56ch",
                        }}
                    >
                        Estimate how much you and your caregiver can save when working directly — without
                        agency margins or hidden fees. Simple, transparent, and personalised to your needs.
                    </p>

                    <div
                        style={{
                            marginTop: "1rem",
                            padding: "12px 14px",
                            borderRadius: 16,
                            background: "rgba(255,255,255,0.65)",
                            border: "1px solid rgba(15,23,42,0.10)",
                            color: "#0F172A",
                            fontWeight: 700,
                            lineHeight: 1.5,
                            fontSize: "0.98rem",
                        }}
                    >
                        <span style={{ color: BRAND, fontWeight: 900 }}>Savings highlight:</span>{" "}
                        {marketingLine}
                    </div>
                </div>

                {/* RIGHT */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
                        gap: "clamp(22px, 2.6vw, 32px)",
                        alignItems: "stretch",
                    }}
                >
                    {/* FORM */}
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        style={{
                            padding: "clamp(20px, 2vw, 26px)",
                            display: "grid",
                            gap: 18,
                            background: "#fff",
                            borderRadius: 20,
                            boxShadow: "0 16px 36px rgba(15,23,42,0.08)",
                        }}
                    >
                        {/* Currency */}
                        <label style={{ display: "grid", gap: 6 }}>
                            <span style={{ fontWeight: 800, color: "#1f2a37", fontSize: ".88rem" }}>
                                Currency
                            </span>

                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                style={{
                                    border: "1px solid rgba(15,23,42,0.12)",
                                    borderRadius: 12,
                                    padding: "10px 12px",
                                    fontSize: "0.98rem",
                                    background: "#fff",
                                }}
                            >
                                <option value="PLN">PLN — zł</option>
                                <option value="EUR">EUR — €</option>
                                <option value="GBP">GBP — £</option>
                                <option value="USD">USD — $</option>
                            </select>

                            {/* ✅ Info about “official” basis + smart default */}
                            <span
                                style={{
                                    marginTop: 6,
                                    fontSize: ".84rem",
                                    color: "#64748B",
                                    fontWeight: 650,
                                    lineHeight: 1.35,
                                }}
                            >
                                Suggested hourly ranges use statutory minimum wage levels as a baseline, and the default
                                rate resets to a typical midpoint for the selected currency. Adjust to your local market.
                            </span>

                            {/* ✅ Mini sources note */}
                            <span
                                style={{
                                    marginTop: 4,
                                    fontSize: ".8rem",
                                    color: "#94A3B8",
                                    fontWeight: 700,
                                    lineHeight: 1.35,
                                }}
                            >
                                Sources: UK GOV.UK, DE Destatis, PL gov.pl.
                            </span>
                        </label>

                        {/* Period */}
                        <label style={{ display: "grid", gap: 6 }}>
                            <span style={{ fontWeight: 800, color: "#1f2a37", fontSize: ".88rem" }}>
                                Estimate period
                            </span>
                            <select
                                value={period}
                                onChange={(e) => setPeriod(e.target.value)}
                                style={{
                                    border: "1px solid rgba(15,23,42,0.12)",
                                    borderRadius: 12,
                                    padding: "10px 12px",
                                    fontSize: "0.98rem",
                                    background: "#fff",
                                }}
                            >
                                <option value="monthly">Monthly</option>
                                <option value="weekly">Weekly</option>
                            </select>
                        </label>

                        {/* Hourly (dynamic min/max) */}
                        <label style={{ display: "grid", gap: 8 }}>
                            <span style={{ fontWeight: 800, color: "#1f2a37", fontSize: ".88rem" }}>
                                Hourly rate
                            </span>

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
                                    color: "#64748B",
                                    fontWeight: 700,
                                }}
                            >
                                <span>{range.min}</span>
                                <span>{range.max}</span>
                            </div>
                        </label>

                        {/* Hours */}
                        <label style={{ display: "grid", gap: 6 }}>
                            <span style={{ fontWeight: 800, color: "#1f2a37", fontSize: ".88rem" }}>
                                Hours per week
                            </span>
                            <input
                                type="number"
                                value={hoursWeek}
                                onChange={(e) => setHoursWeek(Number(e.target.value))}
                                style={{
                                    border: "1px solid rgba(15,23,42,0.12)",
                                    borderRadius: 12,
                                    padding: "10px 12px",
                                    fontSize: "0.98rem",
                                }}
                            />
                        </label>

                        {/* Margin */}
                        <label style={{ display: "grid", gap: 6 }}>
                            <span style={{ fontWeight: 800, color: "#1f2a37", fontSize: ".88rem" }}>
                                Agency margin (%)
                            </span>
                            <input
                                type="number"
                                value={agencyMargin}
                                onChange={(e) => setAgencyMargin(Number(e.target.value))}
                                style={{
                                    border: "1px solid rgba(15,23,42,0.12)",
                                    borderRadius: 12,
                                    padding: "10px 12px",
                                    fontSize: "0.98rem",
                                }}
                            />
                        </label>

                        {/* Fee + tooltip */}
                        <div
                            onMouseEnter={() => setShowFeeTip(true)}
                            onMouseLeave={() => setShowFeeTip(false)}
                            style={{
                                position: "relative",
                                marginTop: 2,
                                padding: "10px 14px",
                                borderRadius: 12,
                                background: "rgba(31,171,31,0.06)",
                                border: "1px solid rgba(31,171,31,0.18)",
                                fontWeight: 800,
                                fontSize: ".9rem",
                                color: "#14532D",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 10,
                                width: "fit-content",
                            }}
                        >
                            ICare fee: <span style={{ color: BRAND, fontWeight: 900 }}>flat 10%</span>

                            <span
                                aria-hidden="true"
                                style={{
                                    width: 18,
                                    height: 18,
                                    borderRadius: 999,
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: "rgba(31,171,31,0.14)",
                                    border: "1px solid rgba(31,171,31,0.25)",
                                    color: "#14532D",
                                    fontSize: ".78rem",
                                    fontWeight: 900,
                                }}
                            >
                                i
                            </span>

                            {showFeeTip && (
                                <div
                                    role="tooltip"
                                    style={{
                                        position: "absolute",
                                        left: 0,
                                        top: "calc(100% + 10px)",
                                        background: "#0F172A",
                                        color: "rgba(255,255,255,0.95)",
                                        padding: "10px 12px",
                                        borderRadius: 12,
                                        fontSize: ".88rem",
                                        fontWeight: 750,
                                        boxShadow: "0 18px 40px rgba(15,23,42,0.25)",
                                        width: "max-content",
                                        maxWidth: 280,
                                        zIndex: 50,
                                    }}
                                >
                                    One-time payment — only after successful cooperation begins.
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: -6,
                                            left: 14,
                                            width: 12,
                                            height: 12,
                                            background: "#0F172A",
                                            transform: "rotate(45deg)",
                                            borderRadius: 2,
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </form>

                    {/* RESULTS */}
                    <div
                        style={{
                            padding: "clamp(20px, 2vw, 26px)",
                            display: "grid",
                            gap: 18,
                            background: "#fff",
                            borderRadius: 20,
                            boxShadow: "0 16px 36px rgba(15,23,42,0.08)",
                        }}
                    >
                        <h3
                            style={{
                                margin: 0,
                                fontWeight: 900,
                                color: "#0F172A",
                                fontSize: "clamp(1.1rem, 1.6vw, 1.28rem)",
                            }}
                        >
                            {periodLabel} estimate
                        </h3>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                            {[
                                { k: "Base cost", v: baseCost },
                                { k: "Agency total", v: agencyTotal },
                                { k: "ICare total", v: icareTotal },
                                { k: "You save with ICare", v: youSave, highlight: true },
                            ].map((row) => (
                                <div
                                    key={row.k}
                                    style={{
                                        borderRadius: 14,
                                        padding: "14px",
                                        background: row.highlight
                                            ? "rgba(31,171,31,0.08)"
                                            : "rgba(241,245,249,0.6)",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: ".84rem",
                                            color: "#475569",
                                            marginBottom: 4,
                                            fontWeight: 800,
                                        }}
                                    >
                                        {row.k}
                                    </div>
                                    <div
                                        style={{
                                            fontWeight: 950,
                                            fontSize: "1.08rem",
                                            color: row.highlight ? BRAND : "#0F172A",
                                        }}
                                    >
                                        {nf.format(row.v)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: 6 }}>
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
                                        width: `${Math.max(0, Math.min(100, savePct)).toFixed(0)}%`,
                                        background: BRAND,
                                        transition: "width 0.6s ease",
                                    }}
                                />
                            </div>

                            <div style={{ marginTop: 10, fontSize: ".92rem", color: "#0F172A", fontWeight: 800 }}>
                                Estimated savings:{" "}
                                <span style={{ color: BRAND, fontWeight: 950 }}>{Math.round(savePct)}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes fadeEstimator {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </section>
    );
}
