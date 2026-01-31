import React from "react";

/**
 * MVP Estimator (SIMPLE + Agency comparison)
 * ✅ care cost = hourly × hours/week × (weekly/monthly)
 * ✅ adds: Agency estimate (markup %) + Estimated savings
 * ✅ Funding in accordion (Elder-like)
 */

export default function SavingsEstimatorCurrency() {
    const BRAND = "rgb(123, 171, 12)";
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

    // ✅ NEW: agency markup selector (typical range you used earlier)
    const [agencyMarkupPct, setAgencyMarkupPct] = React.useState(30); // 25–40

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

    // ✅ NEW: agency comparison
    const { agencyCost, savings } = React.useMemo(() => {
        const markup = Math.max(0, Number(agencyMarkupPct) || 0) / 100;
        const agency = careCost * (1 + markup);
        return {
            agencyCost: agency,
            savings: Math.max(0, agency - careCost),
        };
    }, [careCost, agencyMarkupPct]);

    const microCSS = `
    @media (max-width: 860px) {
      .icare-est-row { grid-template-columns: 1fr !important; }
    }

    .icare-est-input:focus{
      border-color: ${BRAND} !important;
      box-shadow: 0 0 0 4px rgba(31,171,31,0.12) !important;
      outline: none !important;
    }

    .icare-left-boxes ul li{
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(15,23,42,0.10);
    }
    .icare-left-boxes ul li:last-child{
      border-bottom: 0;
      padding-bottom: 0;
    }

    /* Funding accordion (details) */
    .icare-funding-details{
      border: 1px solid rgba(15,23,42,0.10);
      background: rgba(255,255,255,0.72);
      border-radius: 24px;
      box-shadow: 0 10px 24px rgba(15,23,42,0.06);
      padding: 18px 18px;
    }
    .icare-funding-summary{
      cursor: pointer;
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      font-weight: 650;
      font-size: 1.25rem;
      color: ${TEXT};
      letter-spacing: -0.15px;
      padding: 10px 8px;
      border-radius: 14px;
    }
    .icare-funding-summary::-webkit-details-marker { display:none; }
    .icare-funding-summary:focus-visible{
      outline: none;
      box-shadow: 0 0 0 4px rgba(31,171,31,0.10);
    }
    .icare-funding-body{
      padding: 6px 8px 10px;
    }
    .icare-funding-teaser{
      margin: 8px 0 0;
      font-size: 1.05rem;
      line-height: 1.55;
      font-weight: 550;
      color: rgba(15,23,42,0.86);
    }
    .icare-chevron{
      width: 34px;
      height: 34px;
      display:flex;
      align-items:center;
      justify-content:center;
      border-radius: 12px;
      border: 1px solid rgba(15,23,42,0.10);
      background: rgba(255,255,255,0.65);
      font-size: 14px;
      opacity: 0.9;
      transform: rotate(0deg);
      transition: transform 160ms ease;
    }
    details[open] .icare-chevron{
      transform: rotate(180deg);
    }
  `;

    const homeH1 = {
        margin: 0,
        fontWeight: 500,
        letterSpacing: "-0.6px",
        lineHeight: 1.14,
        fontSize: "clamp(2.25rem, 3vw, 2.6rem)",
        color: TEXT,
    };

    const homeLead = {
        margin: "12px 0 0",
        color: TEXT,
        fontWeight: 400,
        lineHeight: 1.72,
        fontSize: "1.4rem",
        maxWidth: "58ch",
    };

    const rightIntroP = {
        margin: "0 0 20px",
        color: TEXT,
        fontWeight: 400,
        lineHeight: 1.65,
        fontSize: "1.15rem",
        textAlign: "left",
    };

    const labelStyle = {
        fontWeight: 600,
        fontSize: "1.1rem",
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
        fontSize: "1rem",
        fontWeight: 600,
        lineHeight: 1.55,
        color: TEXT,
    };

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
        fontWeight: 600,
        fontSize: "1.4rem",
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
        fontSize: "1.15rem",
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
        padding: "12px 0",
        borderRadius: 18,
        fontSize: "1.0rem",
        fontWeight: 750,
        color: TEXT,
        lineHeight: 1.4,
    };

    const bullets = {
        margin: 0,
        display: "grid",
        gap: 12,
        color: TEXT,
        fontWeight: 400,
        lineHeight: 1.7,
        fontSize: "1.15rem",
    };

    const sourceNote = {
        marginTop: 14,
        paddingTop: 14,
        fontSize: "0.98rem",
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
                padding: "4rem",
                backgroundColor: "rgb(242, 242, 242)",
                borderTop: "1px solid rgba(15,23,42,0.06)",
                borderBottom: "1px solid rgba(15,23,42,0.06)",
                color: TEXT,
                fontFamily:
                    "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
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
                    <p style={homeLead}>
                        Clear numbers, at a glance.
                        <br />
                        UK pricing context (live-in and hourly)
                    </p>
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
                            <div style={infoTitle}>Live-in care: typical weekly range (UK)</div>
                            <div style={divider} />
                            <p style={infoText}>
                                Live-in care is usually priced as a <strong>weekly rate</strong>. <br />
                                A common UK guide range is <strong>£950–£1,400/week</strong>, depending on needs and area.
                            </p>

                            <div style={pillRow}>
                                <div style={pill}>
                                    <span>Everyday support</span>
                                    <span>~£950–£1,100</span>
                                </div>
                                <div style={pill}>
                                    <span>Higher needs</span>
                                    <span>~£1,100–£1,350</span>
                                </div>
                                <div style={pill}>
                                    <span>Extra night support</span>
                                    <span>~£1,250–£1,400</span>
                                </div>
                                <div style={pill}>
                                    <span>Couples (one carer)</span>
                                    <span>~£1,350–£1,600</span>
                                </div>
                            </div>
                        </div>

                        <div style={infoCard}>
                            <div style={infoTitle}>What affects cost most</div>
                            <div style={divider} />
                            <ul style={bullets}>
                                <li>
                                    <strong>Level of support:</strong> dementia, mobility, complex routines
                                </li>
                                <li>
                                    <strong>Nights:</strong> sleeping vs waking nights
                                </li>
                                <li>
                                    <strong>Location:</strong> London / South East often higher
                                </li>
                                <li>
                                    <strong>Experience:</strong> specialist skills and proven experience
                                </li>
                            </ul>
                        </div>

                        {/* Funding accordion */}
                        <details className="icare-funding-details">
                            <summary className="icare-funding-summary">
                                <span>Funding options (UK)</span>
                                <span className="icare-chevron" aria-hidden="true">
                                    ⌄
                                </span>
                            </summary>

                            <div className="icare-funding-body">
                                <p className="icare-funding-teaser">
                                    If you’re eligible, there may be funding routes worth exploring.
                                </p>

                                <div style={divider} />

                                <ul style={bullets}>
                                    <li>Local authority assessment and personal budget (if eligible)</li>
                                    <li>NHS Continuing Healthcare (for complex health needs; sometimes fully funded)</li>
                                    <li>Direct payments / personal budgets (where available)</li>
                                    <li>Benefits and allowances that may support costs (eligibility varies)</li>
                                </ul>
                            </div>
                        </details>

                        <div style={infoCard}>
                            <div style={infoTitle}>Note</div>
                            <div style={divider} />
                            <p style={{ ...infoText, opacity: 0.92 }}>
                                Estimates are based on your selected rate and weekly hours.<br />
                                Final pricing depends on care needs and the caregiver’s rate.
                            </p>

                            <div style={sourceNote}>
                                Ranges are indicative and based on publicly available UK care cost guides and industry summaries.
                                <br />
                                Figures vary by region and needs.
                            </div>
                        </div>
                    </div>

                    {/* RIGHT ESTIMATOR */}
                    <div style={{ display: "grid", gap: 18 }}>
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
                            <p style={rightIntroP}>
                                Choose an hourly rate and weekly hours.<br />
                                We’ll show an estimated total for your selected period.
                            </p>

                            <label style={{ display: "grid", gap: 6 }}>
                                <span style={labelStyle}>Currency</span>
                                <select
                                    className="icare-est-input"
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    style={fieldStyle}
                                >

                                    <option value="EUR">EUR — €</option>
                                    <option value="GBP">GBP — £</option>
                                </select>
                                <span style={hintStyle}>Suggested ranges are shown — you can set any rate.</span>
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
                                <span style={hintStyle}>Example: 20 hours/week for part-time support.</span>
                            </label>

                            {/* ✅ NEW: Agency markup selector */}
                            <label style={{ display: "grid", gap: 6 }}>
                                <span style={labelStyle}>Agency markup (typical)</span>
                                <select
                                    className="icare-est-input"
                                    value={agencyMarkupPct}
                                    onChange={(e) => setAgencyMarkupPct(Number(e.target.value))}
                                    style={fieldStyle}
                                >
                                    <option value={25}>25%</option>
                                    <option value={30}>30%</option>
                                    <option value={35}>35%</option>
                                    <option value={40}>40%</option>
                                </select>
                                <span style={hintStyle}>Used to estimate how agency pricing can differ.</span>
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
                                color: TEXT,
                            }}
                        >
                            <h3 style={{ margin: 0, fontWeight: 950, fontSize: "clamp(1.08rem, 1.5vw, 1.22rem)" }}>
                                {label} estimate
                            </h3>

                            <div>
                                <div style={{ fontSize: "1.05rem", marginBottom: 6, fontWeight: 700 }}>
                                    Direct estimate
                                </div>
                                <div style={{ fontWeight: 800, fontSize: "1.6rem", color: BRAND }}>
                                    {nf.format(careCost)}
                                </div>
                            </div>

                            {/* ✅ NEW: Agency + savings */}
                            <div style={{ height: 6 }} />

                            <div style={{ display: "grid", gap: 8 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: "1.02rem", fontWeight: 650, opacity: 0.9 }}>
                                    <span>Agency estimate (+{agencyMarkupPct}%)</span>
                                    <span>{nf.format(agencyCost)}</span>
                                </div>

                                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: "1.05rem", fontWeight: 800 }}>
                                    <span>Estimated savings</span>
                                    <span style={{ color: BRAND }}>{nf.format(savings)}</span>
                                </div>
                            </div>

                            <div style={{ fontSize: ".92rem", opacity: 0.76, fontWeight: 650, lineHeight: 1.6 }}>
                                Updates instantly as you adjust rate, hours and agency markup.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
