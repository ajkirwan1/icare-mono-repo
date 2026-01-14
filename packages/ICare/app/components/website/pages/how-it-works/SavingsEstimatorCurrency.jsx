import React from "react";

/**
 * MVP Estimator (SIMPLE)
 * ✅ ONLY care cost = hourly × hours/week × (weekly/monthly)
 * ✅ NO info about ICare fee
 * ✅ Left: UK market context
 * ✅ Subtle separators between list items
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

    const { careCost, label } = React.useMemo(() => {
        const weeksPerMonth = 4.33;
        const multiplier = period === "monthly" ? weeksPerMonth : 1;
        const base = hourly * hoursWeek * multiplier;

        return {
            careCost: base,
            label: period === "monthly" ? "Monthly" : "Weekly",
        };
    }, [hourly, hoursWeek, period]);

    const microCSS = `
    @media (max-width: 860px) {
      .icare-est-row { grid-template-columns: 1fr !important; }
    }

    .icare-est-input:focus{
      border-color: rgba(31,171,31,0.45) !important;
      box-shadow: 0 0 0 4px rgba(31,171,31,0.12) !important;
      outline: none !important;
    }

    /* ✅ subtle separators between list items */
    .icare-left-boxes ul li{
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(15,23,42,0.10);
    }
    .icare-left-boxes ul li:last-child{
      border-bottom: 0;
      padding-bottom: 0;
    }
  `;

    // Home typography (same sizes/weights) — ✅ reduced spacing
    const homeH1 = {
        margin: 0,
        fontWeight: 500,
        letterSpacing: "-0.6px",
        lineHeight: 1.14,
        fontSize: "clamp(2.25rem, 3vw, 2.6rem)",
        color: TEXT,
    };

    const homeH2 = {
        margin: "14px 0 0", // ✅ less spacing
        fontWeight: 600,
        letterSpacing: "-0.2px",
        lineHeight: 1.25,
        fontSize: "1.25rem",
        color: TEXT,
    };

    const homeLead = {
        margin: "12px 0 0", // ✅ less spacing
        color: TEXT,
        fontWeight: 400,
        lineHeight: 1.72,
        fontSize: "1.22rem",
        maxWidth: "58ch",
    };

    // ✅ right intro as paragraph (like P), left-aligned
    const rightIntroP = {
        margin: "0 0 20px",
        color: TEXT,
        fontWeight: 400,
        lineHeight: 1.65,
        fontSize: "1.1rem",
        textAlign: "left",
    };

    const labelStyle = {
        fontWeight: 900,
        fontSize: ".88rem",
        color: TEXT,
        letterSpacing: "-0.1px",
    };

    const fieldStyle = {
        border: "1px solid rgba(15,23,42,0.12)",
        borderRadius: 12,
        padding: "10px 12px",
        fontSize: "0.98rem",
        background: "#fff",
        color: TEXT,
    };

    const hintStyle = {
        fontSize: ".86rem",
        opacity: 0.74,
        fontWeight: 650,
        lineHeight: 1.55,
        color: TEXT,
    };

    // Left boxes (stacked)
    const leftBoxesGrid = {
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 18,
        alignItems: "stretch",
        maxWidth: "62ch",
    };

    const infoCard = {
        padding: "26px 26px",
        borderRadius: 24,
        background: "rgba(255, 255, 255, 0.72)",
        border: "1px solid rgba(15,23,42,0.10)",
        boxShadow: "0 10px 24px rgba(15,23,42,0.06)",
    };

    const infoTitle = {
        margin: 0,
        fontWeight: 900,
        fontSize: "1.12rem",
        letterSpacing: "-0.15px",
        color: TEXT,
        lineHeight: 1.25,
    };

    const divider = {
        height: 1,
        background: "rgba(15,23,42,0.08)",
        marginTop: 14,
        marginBottom: 14,
        width: "100%",
    };

    const infoText = {
        margin: 0,
        fontSize: "1.05rem",
        opacity: 0.92,
        fontWeight: 400,
        lineHeight: 1.72,
        color: TEXT,
    };

    const pillRow = {
        marginTop: 14,
        display: "grid",
        gap: 10,
    };

    const pill = {
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: 10,
        alignItems: "center",
        padding: "12px 14px",
        borderRadius: 18,
        background: "rgba(15,23,42,0.04)",
        border: "1px solid rgba(15,23,42,0.08)",
        fontSize: "1.0rem",
        fontWeight: 750,
        color: TEXT,
        lineHeight: 1.4,
    };

    const bullets = {
        margin: 0,
        paddingLeft: 18,
        display: "grid",
        gap: 12,
        color: TEXT,
        opacity: 0.92,
        fontWeight: 400,
        lineHeight: 1.7,
        fontSize: "1.03rem",
    };

    const sourceNote = {
        marginTop: 14,
        paddingTop: 14,
        fontSize: ".92rem",
        opacity: 0.78,
        fontWeight: 650,
        lineHeight: 1.6,
        color: TEXT,
        borderTop: "1px dashed rgba(15,23,42,0.14)",
    };

    return (
        <section
            id="estimator"
            aria-label="Care cost estimator"
            style={{
                padding: "clamp(72px, 8.6vw, 104px) 0",
                background: "#e8e7d7",
                borderTop: "1px solid rgba(15,23,42,0.06)",
                borderBottom: "1px solid rgba(15,23,42,0.06)",
                color: TEXT,
                fontFamily:
                    "Nunito, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <style>{microCSS}</style>

            <div
                style={{
                    maxWidth: 1180,
                    margin: "0 auto",
                    padding: "0 clamp(18px, 3.2vw, 34px)",
                }}
            >
                {/* HEADER ABOVE GRID */}
                <div style={{ color: TEXT }}>
                    <h1 style={homeH1}>Quick Cost Estimator</h1>
                    <h2 style={homeH2}>Clear numbers. Calm decisions.</h2>
                    <p style={homeLead}>UK pricing context (live-in & hourly)</p>
                </div>

                <div style={{ height: "1.55rem" }} />

                <div
                    className="icare-est-row"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1.15fr",
                        gap: "clamp(28px, 4.2vw, 56px)",
                        alignItems: "start",
                    }}
                >
                    {/* LEFT BOXES */}
                    <div className="icare-left-boxes" style={leftBoxesGrid}>
                        <div style={infoCard}>
                            <div style={infoTitle}>UK pricing context (live-in)</div>
                            <div style={divider} />
                            <p style={infoText}>
                                Live-in care is often discussed as a <strong>weekly rate</strong>. <br />
                                As a broad market guide, you’ll commonly see ranges around{" "}
                                <strong>£950–£1,400/week</strong>, depending on needs and location.
                            </p>

                            <div style={pillRow}>
                                <div style={pill}>
                                    <span>Everyday live-in support</span>
                                    <span>~£950–£1,100</span>
                                </div>
                                <div style={pill}>
                                    <span>Higher needs / specialist</span>
                                    <span>~£1,100–£1,350</span>
                                </div>
                                <div style={pill}>
                                    <span>Extra night input</span>
                                    <span>~£1,250–£1,400</span>
                                </div>
                                <div style={pill}>
                                    <span>Couples (one carer)</span>
                                    <span>~£1,350–£1,600</span>
                                </div>
                            </div>
                        </div>

                        <div style={infoCard}>
                            <div style={infoTitle}>What changes the cost most</div>
                            <div style={divider} />
                            <ul style={bullets}>
                                <li>
                                    <strong>Care needs:</strong> dementia, mobility, complex routines, clinical tasks
                                </li>
                                <li>
                                    <strong>Nights:</strong> sleeping vs waking nights can shift weekly pricing
                                </li>
                                <li>
                                    <strong>Location:</strong> some areas (e.g. London/South East) are often higher
                                </li>
                                <li>
                                    <strong>Experience:</strong> specialist skills and proven experience can cost more
                                </li>
                            </ul>
                        </div>

                        <div style={infoCard}>
                            <div style={infoTitle}>Funding routes to explore (UK)</div>
                            <div style={divider} />
                            <ul style={bullets}>
                                <li>Local authority assessment + personal budget (if eligible)</li>
                                <li>NHS Continuing Healthcare for complex health needs (in some cases fully funded)</li>
                                <li>Direct payments / personal budgets (where available)</li>
                                <li>Benefits and allowances that can support costs (eligibility varies)</li>
                            </ul>

                            <div style={{ height: 12 }} />

                            <p style={{ ...infoText, opacity: 0.92 }}>

                            </p>
                        </div>

                        <div style={infoCard}>
                            <div style={infoTitle}>Note</div>
                            <div style={divider} />
                            <p style={{ ...infoText, opacity: 0.92 }}>
                                This estimator is based on your inputs.<br /> Final pricing depends on the caregiver’s rate and your care needs.
                            </p>

                            <div style={sourceNote}>
                                Pricing ranges are based on publicly available UK care cost guides and industry summaries.<br /> Figures are
                                indicative and will vary by region and needs.
                            </div>
                        </div>
                    </div>

                    {/* RIGHT ESTIMATOR */}
                    <div style={{ display: "grid", gap: 18 }}>
                        {/* ✅ now as paragraph + left aligned */}

                        <form
                            onSubmit={(e) => e.preventDefault()}
                            style={{
                                padding: "clamp(18px, 2vw, 24px)",
                                display: "grid",
                                gap: 14,
                                background: "#fff",
                                borderRadius: 20,
                                boxShadow: "0 16px 36px rgba(15,23,42,0.08)",
                                border: "1px solid rgba(15,23,42,0.08)",
                            }}
                        >

                            <p style={rightIntroP}>Choose a rate and weekly hours that fit your situation.<br /> We will show an estimated total for your selected period.</p>
                            <label style={{ display: "grid", gap: 6 }}>
                                <span style={labelStyle}>Currency</span>
                                <select
                                    className="icare-est-input"
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    style={fieldStyle}
                                >
                                    <option value="PLN">PLN — zł</option>
                                    <option value="EUR">EUR — €</option>
                                    <option value="GBP">GBP — £</option>
                                </select>
                                <span style={hintStyle}>Typical range suggested — you can change the rate freely.</span>
                            </label>

                            <label style={{ display: "grid", gap: 6 }}>
                                <span style={labelStyle}>Show totals as</span>
                                <select
                                    className="icare-est-input"
                                    value={period}
                                    onChange={(e) => setPeriod(e.target.value)}
                                    style={fieldStyle}
                                >
                                    <option value="monthly">Monthly</option>
                                    <option value="weekly">Weekly</option>
                                </select>
                            </label>

                            <label style={{ display: "grid", gap: 8 }}>
                                <span style={labelStyle}>Hourly rate</span>

                                <input
                                    className="icare-est-input"
                                    type="number"
                                    value={hourly}
                                    min={range.min}
                                    max={range.max}
                                    step={range.step}
                                    onChange={(e) => setHourly(Number(e.target.value))}
                                    style={fieldStyle}
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

                            <label style={{ display: "grid", gap: 6 }}>
                                <span style={labelStyle}>Hours per week</span>
                                <input
                                    className="icare-est-input"
                                    type="number"
                                    value={hoursWeek}
                                    min={1}
                                    max={168}
                                    onChange={(e) => setHoursWeek(Number(e.target.value))}
                                    style={fieldStyle}
                                />
                                <span style={hintStyle}>Example: 20h/week for part-time support.</span>
                            </label>
                        </form>

                        <div
                            style={{
                                padding: "clamp(18px, 2vw, 24px)",
                                display: "grid",
                                gap: 12,
                                background: "#fff",
                                borderRadius: 20,
                                boxShadow: "0 16px 36px rgba(15,23,42,0.08)",
                                border: "1px solid rgba(15,23,42,0.08)",
                                color: TEXT,
                            }}
                        >
                            <h3 style={{ margin: 0, fontWeight: 950, fontSize: "clamp(1.08rem, 1.5vw, 1.22rem)" }}>
                                {label} estimate
                            </h3>

                            <div
                                style={{
                                    borderRadius: 18,
                                    padding: "16px",
                                    background: "rgba(31,171,31,0.10)",
                                    border: "1px solid rgba(31,171,31,0.18)",
                                }}
                            >
                                <div style={{ fontSize: ".9rem", opacity: 0.82, marginBottom: 6, fontWeight: 900 }}>
                                    Estimated total
                                </div>
                                <div style={{ fontWeight: 980, fontSize: "1.28rem" }}>{nf.format(careCost)}</div>
                            </div>

                            <div style={{ fontSize: ".92rem", opacity: 0.76, fontWeight: 650, lineHeight: 1.6 }}>
                                Updates instantly as you adjust the rate and hours.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
