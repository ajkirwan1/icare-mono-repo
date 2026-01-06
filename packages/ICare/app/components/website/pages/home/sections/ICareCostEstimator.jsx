import React from "react";

/**
 * ICare — Cost Estimator (calm, compact)
 * ✅ decision helper (not a CTA-heavy form)
 * ✅ gentle link to #waitlist
 * ✅ global text #0F172A
 */
export default function ICareCostEstimator({ icareFeePct = 10, waitlistHref = "#waitlist" }) {
    const BRAND = "#b97a57";
    const TEXT = "#0F172A";
    const OLIVE = "#61674d";

    const hourlyRanges = React.useMemo(
        () => ({
            PLN: { min: 30.5, max: 60, step: 0.5 },
            EUR: { min: 12.82, max: 30, step: 0.1 },
            GBP: { min: 12.21, max: 35, step: 0.1 },
        }),
        []
    );

    const snapToStep = (value, step) => {
        const decimals = (step.toString().split(".")[1] || "").length;
        const snapped = Math.round(value / step) * step;
        return Number(snapped.toFixed(decimals));
    };

    const [currency, setCurrency] = React.useState("GBP");
    const [period, setPeriod] = React.useState("monthly"); // monthly | weekly
    const [hourly, setHourly] = React.useState(18);
    const [hoursWeek, setHoursWeek] = React.useState(30);
    const [agencyMargin, setAgencyMargin] = React.useState(35);

    const range = hourlyRanges[currency] ?? hourlyRanges.GBP;

    React.useEffect(() => {
        const mid = (range.min + range.max) / 2;
        setHourly(snapToStep(mid, range.step));
    }, [currency, range.min, range.max, range.step]);

    const nf = React.useMemo(
        () =>
            new Intl.NumberFormat(undefined, {
                style: "currency",
                currency,
            }),
        [currency]
    );

    const { baseCost, agencyTotal, icareTotal, youSave, savePct, periodLabel } = React.useMemo(() => {
        const weeksPerMonth = 4.33;
        const multiplier = period === "monthly" ? weeksPerMonth : 1;

        const base = hourly * hoursWeek * multiplier;
        const agency = base * (1 + agencyMargin / 100);
        const icare = base * (1 + icareFeePct / 100);
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
    }, [hourly, hoursWeek, agencyMargin, period, icareFeePct]);

    const wrap = {
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        background: "#e8e7d7",
        color: TEXT,
        padding: "clamp(4.2rem, 5.6vw, 5.4rem) 0",
        borderTop: "1px solid rgba(15,23,42,0.06)",
        borderBottom: "1px solid rgba(15,23,42,0.06)",
        fontFamily:
            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    };

    const container = {
        width: "min(92vw, 1100px)",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1.15fr",
        gap: "clamp(22px, 3.2vw, 44px)",
        alignItems: "start",
    };

    const topMini = {
        fontSize: "1.08rem",
        fontWeight: 850,
        color: BRAND,
        letterSpacing: "-0.1px",
        marginBottom: 10,
    };

    const h2 = {
        margin: 0,
        fontWeight: 950,
        letterSpacing: "-0.55px",
        lineHeight: 1.1,
        fontSize: "clamp(1.6rem, 2.2vw, 2rem)",
        color: TEXT,
    };

    const lead = {
        margin: "0.95rem 0 0",
        color: TEXT,
        opacity: 0.78,
        fontWeight: 650,
        lineHeight: 1.75,
        fontSize: "1.04rem",
        maxWidth: "72ch",
    };

    const hint = {
        marginTop: 12,
        padding: "12px 14px",
        borderRadius: 18,
        background: "rgba(255,255,255,0.52)",
        border: "1px solid rgba(15,23,42,0.10)",
        color: TEXT,
        fontWeight: 700,
        lineHeight: 1.7,
        fontSize: ".98rem",
        maxWidth: "72ch",
    };

    const card = {
        background: "rgba(255,255,255,0.78)",
        border: "1px solid rgba(15,23,42,0.10)",
        borderRadius: 22,
        boxShadow: "0 18px 44px rgba(15,23,42,0.08)",
        padding: "clamp(16px, 2vw, 22px)",
        color: TEXT,
    };

    const label = {
        fontWeight: 900,
        color: TEXT,
        fontSize: ".88rem",
        letterSpacing: "-0.1px",
    };

    const field = {
        width: "100%",
        border: "1px solid rgba(15,23,42,0.12)",
        borderRadius: 14,
        padding: "10px 12px",
        background: "#fff",
        fontSize: "0.98rem",
        color: TEXT,
        outline: "none",
    };

    const small = {
        marginTop: 6,
        color: TEXT,
        opacity: 0.65,
        fontWeight: 650,
        fontSize: ".86rem",
        lineHeight: 1.45,
    };

    const resultGrid = {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12,
        marginTop: 12,
    };

    const pill = (highlight) => ({
        borderRadius: 18,
        padding: "12px 12px",
        background: highlight ? "rgba(185,122,87,0.10)" : "rgba(15,23,42,0.04)",
        border: `1px solid ${highlight ? "rgba(185,122,87,0.18)" : "rgba(15,23,42,0.08)"}`,
    });

    const k = {
        fontSize: ".84rem",
        fontWeight: 850,
        color: TEXT,
        opacity: 0.7,
        marginBottom: 4,
    };

    const v = (highlight) => ({
        fontWeight: 950,
        fontSize: "1.12rem",
        color: highlight ? BRAND : TEXT,
        letterSpacing: "-0.2px",
    });

    const bar = {
        marginTop: 14,
        height: 9,
        width: "100%",
        background: "rgba(15,23,42,0.10)",
        borderRadius: 999,
        overflow: "hidden",
    };

    const barFill = {
        height: "100%",
        width: `${Math.max(0, Math.min(100, savePct)).toFixed(0)}%`,
        background: BRAND,
        transition: "width .45s ease",
    };

    const softLink = {
        marginTop: 16,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        textDecoration: "none",
        color: OLIVE,
        fontWeight: 900,
        borderBottom: "1px solid rgba(97,103,77,0.35)",
        paddingBottom: 2,
        width: "fit-content",
    };

    const microCSS = `
    @media (max-width: 920px){
      .icare-est-grid{ grid-template-columns: 1fr !important; }
    }
    .icare-est-input:focus{
      border-color: rgba(185,122,87,0.55) !important;
      box-shadow: 0 0 0 4px rgba(185,122,87,0.14) !important;
    }
  `;

    return (
        <section aria-label="Cost estimator" style={wrap}>
            <style>{microCSS}</style>

            <div className="icare-est-grid" style={container}>
                {/* LEFT */}
                <div>
                    <div style={topMini}>Budget clarity — quick estimate</div>
                    <h2 style={h2}>Cost & savings estimator</h2>
                    <p style={lead}>
                        A calm way to sense-check your budget. Adjust hourly rate and hours/week — results update instantly.
                    </p>

                    <div style={hint}>
                        <strong style={{ color: TEXT }}>How to use:</strong>{" "}
                        Choose currency → set the hourly rate → set hours/week.
                        <br />
                        You’ll see typical agency cost vs ICare with a simple {icareFeePct}% fee.
                    </div>
                </div>

                {/* RIGHT */}
                <div style={{ display: "grid", gap: 14 }}>
                    {/* CONTROLS */}
                    <div style={card}>
                        <div style={{ display: "grid", gap: 14 }}>
                            <label style={{ display: "grid", gap: 6 }}>
                                <span style={label}>Currency</span>
                                <select value={currency} onChange={(e) => setCurrency(e.target.value)} style={field}>
                                    <option value="GBP">GBP — £</option>
                                    <option value="EUR">EUR — €</option>
                                    <option value="PLN">PLN — zł</option>
                                </select>
                                <div style={small}>We set a typical starting rate based on the selected currency.</div>
                            </label>

                            <label style={{ display: "grid", gap: 6 }}>
                                <span style={label}>Show results as</span>
                                <select value={period} onChange={(e) => setPeriod(e.target.value)} style={field}>
                                    <option value="monthly">Monthly</option>
                                    <option value="weekly">Weekly</option>
                                </select>
                            </label>

                            <label style={{ display: "grid", gap: 8 }}>
                                <span style={label}>Hourly rate</span>
                                <input
                                    className="icare-est-input"
                                    type="number"
                                    value={hourly}
                                    min={range.min}
                                    max={range.max}
                                    step={range.step}
                                    onChange={(e) => setHourly(Number(e.target.value))}
                                    style={field}
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
                                <div style={{ display: "flex", justifyContent: "space-between", ...small, marginTop: 0 }}>
                                    <span>{range.min}</span>
                                    <span>{range.max}</span>
                                </div>
                            </label>

                            <label style={{ display: "grid", gap: 6 }}>
                                <span style={label}>Hours per week</span>
                                <input
                                    className="icare-est-input"
                                    type="number"
                                    value={hoursWeek}
                                    onChange={(e) => setHoursWeek(Number(e.target.value))}
                                    style={field}
                                />
                                <div style={small}>Most families choose 20–40 hours/week (adjust to your needs).</div>
                            </label>

                            <label style={{ display: "grid", gap: 6 }}>
                                <span style={label}>Typical agency markup (%)</span>
                                <input
                                    className="icare-est-input"
                                    type="number"
                                    value={agencyMargin}
                                    onChange={(e) => setAgencyMargin(Number(e.target.value))}
                                    style={field}
                                />
                                <div style={small}>If you know the real markup, set it here.</div>
                            </label>
                        </div>
                    </div>

                    {/* RESULTS */}
                    <div style={card}>
                        <div style={{ fontWeight: 950, fontSize: "1.12rem", letterSpacing: "-0.2px" }}>
                            {periodLabel} estimate
                        </div>

                        <div style={resultGrid}>
                            <div style={pill(false)}>
                                <div style={k}>Care cost (no fees)</div>
                                <div style={v(false)}>{nf.format(baseCost)}</div>
                            </div>

                            <div style={pill(false)}>
                                <div style={k}>Typical agency total</div>
                                <div style={v(false)}>{nf.format(agencyTotal)}</div>
                            </div>

                            <div style={pill(false)}>
                                <div style={k}>ICare total</div>
                                <div style={v(false)}>{nf.format(icareTotal)}</div>
                            </div>

                            <div style={pill(true)}>
                                <div style={k}>Estimated savings</div>
                                <div style={v(true)}>{nf.format(youSave)}</div>
                            </div>
                        </div>

                        <div style={bar}>
                            <div style={barFill} />
                        </div>

                        <div style={{ marginTop: 10, color: TEXT, fontWeight: 800, opacity: 0.85 }}>
                            You save about <span style={{ color: BRAND, fontWeight: 950 }}>{Math.round(savePct)}%</span>{" "}
                            compared to a typical agency price.
                        </div>

                        <a href={waitlistHref} style={softLink}>
                            Get early access in your area <span aria-hidden="true">→</span>
                        </a>

                        <div style={{ marginTop: 10, ...small }}>
                            These are estimates. Rates vary by city, experience and care needs.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
