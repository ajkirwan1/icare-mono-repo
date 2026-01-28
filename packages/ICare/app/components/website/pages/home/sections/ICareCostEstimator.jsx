import React from "react";

/**
 * ICare — Budget Estimator (caring tone)
 * (updated)
 * ✅ Tooltips now show on hover/focus (custom tooltip, not native title)
 * ✅ Email opt-in no longer changes hero/background size (fixed minHeight)
 * ✅ Removed "See carers available at this budget" button
 */
export default function ICareCostEstimator({
    icareFeePct = 10,
    agencyMarginPct = 35,
    waitlistHref = "#waitlist",
}) {
    const BRAND = "#b97a57";
    const TEXT = "#0F172A";
    const OLIVE = "#61674d";

    // Live-in average (UK) used as default for GBP (editable)
    const UK_LIVE_IN_AVG_HOURLY_GBP = 13;

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
    const [hourly, setHourly] = React.useState(UK_LIVE_IN_AVG_HOURLY_GBP);
    const [hoursWeek, setHoursWeek] = React.useState(30);

    // ✅ Soft lead (email me this estimate)
    const [emailOptIn, setEmailOptIn] = React.useState(false);
    const [email, setEmail] = React.useState("");

    const range = hourlyRanges[currency] ?? hourlyRanges.GBP;

    React.useEffect(() => {
        if (currency === "GBP") {
            setHourly(snapToStep(UK_LIVE_IN_AVG_HOURLY_GBP, range.step));
            return;
        }
        const mid = (range.min + range.max) / 2;
        setHourly(snapToStep(mid, range.step));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);

    const nf = React.useMemo(
        () =>
            new Intl.NumberFormat(undefined, {
                style: "currency",
                currency,
            }),
        [currency]
    );

    const { baseCost, agencyTotal, icareTotal, youSave, savePct } = React.useMemo(() => {
        const weeksPerMonth = 4.33;
        const base = hourly * hoursWeek * weeksPerMonth;
        const agency = base * (1 + agencyMarginPct / 100);
        const icare = base * (1 + icareFeePct / 100);
        const save = Math.max(0, agency - icare);
        const pct = agency > 0 ? (save / agency) * 100 : 0;

        return { baseCost: base, agencyTotal: agency, icareTotal: icare, youSave: save, savePct: pct };
    }, [hourly, hoursWeek, agencyMarginPct, icareFeePct]);

    const wrap = {
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        padding: "clamp(3.2rem, 5vw, 4rem) 0",
        borderTop: "1px solid rgba(15,23,42,0.06)",
        borderBottom: "1px solid rgba(15,23,42,0.06)",
        fontFamily: "Nunito, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        backgroundImage:
            "linear-gradient(160deg, rgba(0,0,0,0.7), rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.7)), url('/images/banners/banner-image-1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        // ✅ prevents background/hero resizing when email section expands
        minHeight: "clamp(860px, 88vh, 980px)",
    };

    const container = {
        width: "min(92vw, 1100px)",
        margin: "0 auto",
        display: "grid",
        gap: "clamp(16px, 2.4vw, 24px)",
        alignItems: "start",
    };

    const header = {
        maxWidth: "72ch",
        textAlign: "left",
    };

    const h1 = {
        margin: "0 0 1.5rem",
        fontWeight: 500,
        letterSpacing: "-0.6px",
        lineHeight: 1.14,
        fontSize: "clamp(2.25rem, 3vw, 2.6rem)",
        color: "#fff",
    };

    const h2Mini = {
        margin: "10px 0 0",
        fontWeight: 400,
        letterSpacing: "-0.2px",
        fontSize: "1.4rem",
        color: "#fff",
        opacity: 0.95,
    };

    const lead = {
        margin: "0.9rem 0 0",
        color: "rgba(255,255,255,0.92)",
        fontWeight: 400,
        lineHeight: 1.65,
        fontSize: "1.4rem",
    };

    const cardsRow = {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(16px, 2.4vw, 24px)",
        alignItems: "stretch",
    };

    const card = {
        height: "100%",
        background: "#ffffff",
        border: "1px solid rgba(15,23,42,0.10)",
        borderRadius: 22,
        boxShadow: "0 18px 44px rgba(15,23,42,0.08)",
        padding: "clamp(14px, 1.8vw, 18px)",
        color: TEXT,
        display: "flex",
        flexDirection: "column",
    };

    const label = {
        fontWeight: 700,
        color: TEXT,
        fontSize: "1rem",
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
        marginTop: 20,
        color: TEXT,
        fontWeight: 500,
        fontSize: "1.1rem",
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
        border: `1px solid ${highlight ? "rgba(185,122,87,0.3)" : "rgba(15,23,42,0.2)"}`,
    });

    const k = {
        fontSize: "1rem",
        fontWeight: 700,
        color: TEXT,
        marginBottom: 4,
        display: "flex",
        alignItems: "center",
        gap: 8,
    };

    const v = (highlight) => ({
        fontWeight: 700,
        fontSize: "1.2rem",
        color: highlight ? "rgb(119, 141, 67)" : TEXT,
        letterSpacing: "-0.2px",
    });

    const infoIcon = {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 18,
        height: 18,
        borderRadius: 999,
        border: "1px solid rgba(15,23,42,0.25)",
        fontSize: 12,
        fontWeight: 900,
        lineHeight: 1,
        color: "rgba(15,23,42,0.75)",
        cursor: "help",
        userSelect: "none",
        transform: "translateY(-0.5px)",
    };

    const tooltipWrap = {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
    };

    const bar = {
        marginTop: "2rem",
        height: 9,
        width: "100%",
        background: "rgba(15,23,42,0.10)",
        borderRadius: 999,
        overflow: "hidden",
    };

    const barFill = {
        height: "100%",
        width: `${Math.max(0, Math.min(100, savePct)).toFixed(0)}%`,
        background: "rgb(119, 141, 67)",
        transition: "width .45s ease",
    };

    const avgPayBox = {
        marginTop: 12,
        padding: "20px 24px",
        borderRadius: 18,
        background: "#ffffff",
        border: "1px solid rgba(15,23,42,0.10)",
        color: TEXT,
        fontWeight: 500,
        lineHeight: 1.7,
        fontSize: "1.1rem",
    };

    const sourceLink = {
        color: OLIVE,
        fontWeight: 900,
        textDecoration: "underline",
    };

    const microCSS = `
    @media (max-width: 920px){
      .icare-est-cards{ grid-template-columns: 1fr !important; }
    }
    .icare-est-input:focus{
      border-color: rgba(185,122,87,0.55) !important;
      box-shadow: 0 0 0 4px rgba(185,122,87,0.14) !important;
    }

    /* ✅ Tooltip bubble (shows on hover OR keyboard focus) */
    .icare-tip { position: relative; display: inline-flex; align-items: center; }
    .icare-tip-bubble {
      position: absolute;
      left: 50%;
      bottom: calc(100% + 10px);
      transform: translateX(-50%);
      width: min(280px, 68vw);
      background: rgba(15,23,42,0.96);
      color: rgba(255,255,255,0.96);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 12px;
      padding: 10px 12px;
      font-size: 0.92rem;
      line-height: 1.35;
      box-shadow: 0 18px 44px rgba(15,23,42,0.22);
      opacity: 0;
      pointer-events: none;
      transition: opacity .14s ease, transform .14s ease;
      transform-origin: bottom center;
    }
    .icare-tip-bubble::after{
      content: "";
      position: absolute;
      left: 50%;
      top: 100%;
      transform: translateX(-50%);
      border: 7px solid transparent;
      border-top-color: rgba(15,23,42,0.96);
    }
    .icare-tip:hover .icare-tip-bubble,
    .icare-tip:focus-within .icare-tip-bubble{
      opacity: 1;
      pointer-events: auto;
      transform: translateX(-50%) translateY(-2px);
    }
  `;

    const mailtoHref = React.useMemo(() => {
        const subject = encodeURIComponent("ICare — Monthly care estimate");
        const body = encodeURIComponent(
            [
                "Here’s your estimate:",
                `Currency: ${currency}`,
                `Hourly rate: ${hourly}`,
                `Hours per week: ${hoursWeek}`,
                "",
                `Care cost (no fees): ${nf.format(baseCost)}`,
                `Typical agency total: ${nf.format(agencyTotal)}`,
                `ICare total: ${nf.format(icareTotal)}`,
                `Estimated savings: ${nf.format(youSave)} (~${Math.round(savePct)}%)`,
                "",
                "Note: This is an estimate — needs, cities and experience can change rates.",
            ].join("\n")
        );
        const to = (email || "").trim();
        return `mailto:${encodeURIComponent(to)}?subject=${subject}&body=${body}`;
    }, [currency, hourly, hoursWeek, nf, baseCost, agencyTotal, icareTotal, youSave, savePct, email]);

    return (
        <section aria-label="Cost estimator" style={wrap}>
            <style>{microCSS}</style>

            <div style={container}>
                {/* HEADER */}
                <div style={header}>
                    <h1 style={h1}>
                        A simple estimate to support <br />
                        your care decisions
                    </h1>
                    <h2 style={h2Mini}>Budget clarity in under a minute</h2>
                    <p style={lead}>
                        Caring is emotional - money shouldn’t add extra stress. <br />
                        Adjust rate and hours/week for a monthly estimate.
                    </p>
                </div>

                {/* 2 BOXES (same height) */}
                <div className="icare-est-cards" style={cardsRow}>
                    {/* LEFT = controls */}
                    <div style={card}>
                        <div style={{ fontWeight: 700, fontSize: "1.2rem", letterSpacing: "-0.2px" }}>Your inputs</div>

                        <div style={{ display: "grid", gap: 14, marginTop: 10 }}>
                            <label style={{ display: "grid", gap: 6 }}>
                                <span style={label}>Currency</span>
                                <select value={currency} onChange={(e) => setCurrency(e.target.value)} style={field}>
                                    <option value="GBP">GBP — £</option>
                                    <option value="EUR">EUR — €</option>
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
                                    style={{ width: "100%", accentColor: "rgb(119, 141, 67)", cursor: "pointer" }}
                                />
                                <div style={{ display: "flex", justifyContent: "space-between", ...small, marginTop: 0 }}>
                                    <span>{range.min}</span>
                                    <span>{range.max}</span>
                                </div>
                                <div style={small}>Tip: choose a rate that’s fair and sustainable for the carer.</div>
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
                                <div style={small}>A helpful starting point is 20–40 hours/week.</div>
                            </label>
                        </div>

                        <div style={{ marginTop: "auto" }} />
                    </div>

                    {/* RIGHT = results */}
                    <div style={card}>
                        <div style={{ fontWeight: 600, fontSize: "1.2rem", letterSpacing: "-0.2px" }}>Monthly estimate</div>

                        <div style={resultGrid}>
                            <div style={pill(false)}>
                                <div style={k}>Care cost (no fees)</div>
                                <div style={v(false)}>{nf.format(baseCost)}</div>
                            </div>

                            <div style={pill(false)}>
                                <div style={k}>
                                    Typical agency total
                                    <span className="icare-tip" style={tooltipWrap}>
                                        <span style={infoIcon} aria-label="Agency total info" tabIndex={0}>
                                            i
                                        </span>
                                        <span className="icare-tip-bubble" role="tooltip">
                                            Typical agency pricing includes overheads, admin fees and margins that don’t go to the carer.
                                        </span>
                                    </span>
                                </div>
                                <div style={v(false)}>{nf.format(agencyTotal)}</div>
                            </div>

                            <div style={pill(false)}>
                                <div style={k}>
                                    ICare total
                                    <span className="icare-tip" style={tooltipWrap}>
                                        <span style={infoIcon} aria-label="ICare total info" tabIndex={0}>
                                            i
                                        </span>
                                        <span className="icare-tip-bubble" role="tooltip">
                                            Includes estimated iCare service fee. No placement fees. No long-term contracts.
                                        </span>
                                    </span>
                                </div>
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

                        <div style={{ marginTop: 30, color: TEXT, fontWeight: 600, fontSize: "1.1rem" }}>
                            You may save around{" "}
                            <span style={{ color: "rgb(119, 141, 67)", fontWeight: 950 }}>{Math.round(savePct)}%</span> compared with a typical agency.
                        </div>

                        ate


                        <div style={{ marginTop: 10, ...small }}>
                            This is an estimate - needs, cities and experience can change rates.
                        </div>

                        <div style={{ marginTop: "auto" }} />
                    </div>
                </div>

                {/* ✅ more legit reference note (multiple sources) */}
                <div style={avgPayBox}>
                    <strong style={{ color: TEXT }}>UK pay reference (live-in):</strong>{" "}
                    Hourly equivalents can vary because many live-in roles are described per day/week and include different
                    expectations around “active” hours. As a rough benchmark, Glassdoor estimates about{" "}
                    <strong>~£11/hour average</strong> for “Live-in Carer” (UK) and shows higher reports around{" "}
                    <strong>~£13/hour</strong>. The UK National Living Wage from{" "}
                    <strong>1 April 2026</strong> is <strong>£12.71/hour</strong> (21+).<br /> Some market guides also describe live-in as{" "}
                    <strong>~£120/day or ~£800/week</strong> (example platform guidance).
                    <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 12 }}>
                        <a
                            href="https://www.glassdoor.co.uk/Salaries/live-in-carer-salary-SRCH_KO0%2C13.htm"
                            target="_blank"
                            rel="noreferrer"
                            style={sourceLink}
                        >
                            Glassdoor
                        </a>
                        <a
                            href="https://www.gov.uk/government/publications/minimum-wage-rates-for-2026"
                            target="_blank"
                            rel="noreferrer"
                            style={sourceLink}
                        >
                            GOV.UK (2026 rates)
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
