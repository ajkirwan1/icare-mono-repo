import React from "react";

/**
 * ICare — Budget Estimator (refined UI + compact inputs)
 * ✅ Hourly rate: small number pill + slider underneath
 * ✅ Inputs have same "soft" background as result pills (Care cost)
 * ✅ Same treatment for Hours per week
 */
export default function ICareCostEstimator({
    icareFeePct = 10,
    agencyMarginPct = 35,
    waitlistHref = "#waitlist",
}) {
    const TEXT = "#0F172A";

    const ACCENT = "rgb(119, 141, 67)"; // green
    const ACCENT2 = "rgb(221, 139, 79)"; // peach
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

    // kept but unused
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

        return {
            baseCost: base,
            agencyTotal: agency,
            icareTotal: icare,
            youSave: save,
            savePct: pct,
        };
    }, [hourly, hoursWeek, agencyMarginPct, icareFeePct]);

    // ---------- STYLES ----------
    const wrap = {
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        padding: "clamp(2.8rem, 4.2vw, 3.6rem) 0",
        borderTop: "1px solid rgba(15,23,42,0.06)",
        borderBottom: "1px solid rgba(15,23,42,0.06)",
        fontFamily:
            "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        backgroundImage:
            "linear-gradient(160deg, rgba(0,0,0,0.70), rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.70)), url('/images/banners/banner-image-1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "clamp(840px, 86vh, 960px)",
    };

    const container = {
        width: "min(92vw, 1100px)",
        margin: "0 auto",
        display: "grid",
        gap: "clamp(14px, 2vw, 22px)",
        alignItems: "start",
    };

    const header = {
        maxWidth: "74ch",
        textAlign: "left",
    };

    const h1 = {
        margin: "0 0 1.2rem",
        fontWeight: 520,
        letterSpacing: "-0.6px",
        lineHeight: 1.12,
        fontSize: "clamp(2.05rem, 2.7vw, 2.45rem)",
        color: "#fff",
    };

    const h2Mini = {
        margin: "8px 0 0",
        fontWeight: 420,
        letterSpacing: "-0.2px",
        fontSize: "1.25rem",
        color: "rgba(255,255,255,0.96)",
    };

    const lead = {
        margin: "0.85rem 0 0",
        color: "rgba(255,255,255,0.90)",
        fontWeight: 380,
        lineHeight: 1.65,
        fontSize: "1.18rem",
    };

    const cardsRow = {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(14px, 2vw, 22px)",
        alignItems: "stretch",
    };

    const card = {
        height: "100%",
        background: "rgba(255, 255, 255, 0.92)",
        border: "1px solid rgba(15,23,42,0.10)",
        borderRadius: 22,
        boxShadow: "0 18px 44px rgba(15,23,42,0.08)",
        padding: "clamp(14px, 1.7vw, 18px)",
        color: TEXT,
        display: "flex",
        flexDirection: "column",
    };

    const cardTitle = {
        fontWeight: 320,
        fontSize: "1.22rem",
        letterSpacing: "-0.2px",
        borderBottom: "1px solid rgba(15,23,42,0.10)",
        paddingBottom: "0.55rem",
        textAlign: "center",
        margin: "0 0 1.1rem",
        color: "rgba(15,23,42,0.92)",
    };

    const label = {
        fontWeight: 520,
        color: "rgba(15,23,42,0.90)",
        fontSize: "1rem",
        letterSpacing: "-0.05px",
    };

    // same "soft" background as pills on the right
    const inputBg = "rgba(255, 255, 255, 0.50)";

    const field = {
        width: "100%",
        border: "1px solid rgba(15,23,42,0.12)",
        borderRadius: 14,
        padding: "10px 12px",
        background: inputBg,
        fontSize: "0.98rem",
        color: TEXT,
        outline: "none",
    };

    // small pill input for hourly/hours (compact)
    const fieldMini = {
        width: "fit-content",
        minWidth: 92,
        border: "1px solid rgba(15,23,42,0.12)",
        borderRadius: 999,
        padding: "8px 10px",
        background: inputBg,
        fontSize: "0.98rem",
        color: TEXT,
        outline: "none",
        textAlign: "center",
    };

    const helper = {
        marginTop: 8,
        color: "rgba(15,23,42,0.92)",
        fontWeight: 420,
        fontSize: "0.98rem",
        lineHeight: 1.55,
    };

    const resultGrid = {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12,
        marginTop: 10,
    };

    const pill = (highlight) => ({
        borderRadius: 16,
        padding: "12px 12px",
        border: `1px solid ${highlight ? "rgba(221,139,79,0.28)" : "rgba(15,23,42,0.16)"
            }`,
        background: highlight ? "rgba(221,139,79,0.06)" : "rgba(255, 255, 255, .5)",
    });

    const k = {
        fontSize: "0.97rem",
        fontWeight: 420,
        color: "rgba(15,23,42,0.88)",
        marginBottom: 4,
        display: "flex",
        alignItems: "center",
        gap: 8,
    };

    const v = (highlight) => ({
        fontWeight: 620,
        fontSize: "1.1rem",
        color: highlight ? ACCENT : TEXT,
        letterSpacing: "-0.2px",
    });

    const infoIcon = {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 18,
        height: 18,
        borderRadius: 999,
        border: "1px solid rgba(15,23,42,0.22)",
        fontSize: 12,
        fontWeight: 900,
        lineHeight: 1,
        color: "rgba(15,23,42,0.70)",
        cursor: "help",
        userSelect: "none",
        transform: "translateY(-0.5px)",
        background: "rgba(255,255,255,0.85)",
    };

    const tooltipWrap = {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
    };

    const bar = {
        marginTop: "1.5rem",
        height: 9,
        width: "100%",
        background: "rgba(15,23,42,0.10)",
        borderRadius: 999,
        overflow: "hidden",
    };

    const barFill = {
        height: "100%",
        width: `${Math.max(0, Math.min(100, savePct)).toFixed(0)}%`,
        background: ACCENT,
        transition: "width .45s ease",
    };

    const avgPayBox = {
        marginTop: 12,
        padding: "18px 22px",
        borderRadius: 18,
        border: "1px solid rgba(15,23,42,0.10)",
        color: TEXT,
        fontWeight: 420,
        lineHeight: 1.8,
        fontSize: "1rem",
        textAlign: "justify",
        background: "rgba(255, 255, 255, 0.92)",
        backdropFilter: "blur(10px)",
    };

    const sourceLink = {
        color: TEXT,
        fontWeight: 600,
        textDecoration: "underline",
    };

    const microNote = {
        marginTop: 10,
        color: "rgba(15,23,42,0.74)",
        fontWeight: 420,
        lineHeight: 1.6,
        fontSize: "0.98rem",
    };

    const microCSS = `
    @media (max-width: 920px){
      .icare-est-cards{ grid-template-columns: 1fr !important; }
    }

    /* IMPORTANT: class sets background for both number inputs */
    .icare-est-input{
      background: ${inputBg} !important;
    }

    .icare-est-input:focus{
      border-color: rgba(221,139,79,0.70) !important;
      box-shadow: 0 0 0 4px rgba(221,139,79,0.16) !important;
    }

    /* Tooltip bubble */
    .icare-tip { position: relative; display: inline-flex; align-items: center; }
    .icare-tip-bubble {
      position: absolute;
      left: 50%;
      bottom: calc(100% + 10px);
      transform: translateX(-50%);
      width: min(320px, 74vw);
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

    /* Currency toggle */
    .icare-curr {
      display: inline-flex;
      gap: 8px;
      align-items: center;
      justify-content: flex-end;
    }
    .icare-curr-btn{
      border: 1px solid rgba(15,23,42,0.14);
      background: rgba(255,255,255,0.9);
      color: rgba(15,23,42,0.88);
      border-radius: 999px;
      padding: 8px 12px;
      font-size: 0.92rem;
      font-weight: 600;
      letter-spacing: -0.1px;
      cursor: pointer;
      transition: transform .12s ease, background .12s ease, border-color .12s ease;
      user-select: none;
      line-height: 1;
    }
    .icare-curr-btn:hover{ transform: translateY(-1px); }
    .icare-curr-btn.is-active{
      background: ${ACCENT};
      border-color: rgba(119,141,67,0.40);
      color: #fff;
      box-shadow: 0 10px 26px rgba(15,23,42,0.12);
    }
    .icare-curr-btn:focus-visible{
      outline: none;
      box-shadow: 0 0 0 4px rgba(221,139,79,0.18);
      border-color: rgba(221,139,79,0.55);
    }

    /* Hide spinners (optional, cleaner) */
    input[type=number]::-webkit-outer-spin-button,
    input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
    input[type=number]{ -moz-appearance: textfield; }
  `;

    // ---------- UI bits ----------
    const CurrencyToggle = () => (
        <div className="icare-curr" aria-label="Currency selector">
            <button
                type="button"
                className={`icare-curr-btn ${currency === "GBP" ? "is-active" : ""}`}
                onClick={() => setCurrency("GBP")}
            >
                GBP £
            </button>
            <button
                type="button"
                className={`icare-curr-btn ${currency === "EUR" ? "is-active" : ""}`}
                onClick={() => setCurrency("EUR")}
            >
                EUR €
            </button>
        </div>
    );

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
                        Caring is emotional — money shouldn’t add extra stress. <br />
                        Adjust rate and hours/week for a monthly estimate.
                    </p>
                </div>

                {/* 2 BOXES */}
                <div className="icare-est-cards" style={cardsRow}>
                    {/* LEFT = controls */}
                    <div style={card}>
                        <div style={cardTitle}>Your inputs</div>

                        <div style={{ display: "grid", gap: 12, marginTop: 6 }}>
                            {/* Currency row */}
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr auto",
                                    alignItems: "center",
                                    gap: 12,
                                }}
                            >
                                <span style={label}>Currency</span>
                                <CurrencyToggle />
                            </div>

                            {/* 1) Hourly rate: small number input + slider under */}
                            <div style={{ display: "grid", gap: 7 }}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        gap: 12,
                                    }}
                                >
                                    <span style={label}>Hourly rate</span>

                                    {/* small number-only pill */}
                                    <input
                                        className="icare-est-input"
                                        type="number"
                                        value={hourly}
                                        min={range.min}
                                        max={range.max}
                                        step={range.step}
                                        onChange={(e) => setHourly(Number(e.target.value))}
                                        style={fieldMini}
                                        aria-label="Hourly rate"
                                    />
                                </div>

                                <input
                                    type="range"
                                    min={range.min}
                                    max={range.max}
                                    step={range.step}
                                    value={hourly}
                                    onChange={(e) => setHourly(Number(e.target.value))}
                                    style={{ width: "100%", accentColor: ACCENT, cursor: "pointer" }}
                                />

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginTop: 2,
                                        color: "rgba(15,23,42,0.62)",
                                        fontWeight: 450,
                                        fontSize: "0.94rem",
                                    }}
                                >
                                    <span>{range.min}</span>
                                    <span>{range.max}</span>
                                </div>

                                <div style={helper}>Tip: choose a rate that’s fair and sustainable for the carer.</div>
                            </div>

                            {/* 2+3) Hours per week: same background + compact pill */}
                            <div style={{ display: "grid", gap: 7 }}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        gap: 12,
                                    }}
                                >
                                    <span style={label}>Hours per week</span>

                                    <input
                                        className="icare-est-input"
                                        type="number"
                                        value={hoursWeek}
                                        onChange={(e) => setHoursWeek(Number(e.target.value))}
                                        style={fieldMini}
                                        aria-label="Hours per week"
                                    />
                                </div>

                                <div style={helper}>A helpful starting point is 20–40 hours/week.</div>
                            </div>
                        </div>

                        <div style={{ marginTop: "auto" }} />
                    </div>

                    {/* RIGHT = results */}
                    <div style={card}>
                        <div style={cardTitle}>Monthly estimate</div>

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
                                            A market estimate for comparison only. Agency totals can include overheads and margins and may vary by provider, location and care needs.
                                        </span>
                                    </span>
                                </div>
                                <div style={v(false)}>{nf.format(agencyTotal)}</div>
                            </div>

                            <div style={pill(false)}>
                                <div style={k}>
                                    Estimated with ICare
                                    <span className="icare-tip" style={tooltipWrap}>
                                        <span style={infoIcon} aria-label="ICare estimate info" tabIndex={0}>
                                            i
                                        </span>
                                        <span className="icare-tip-bubble" role="tooltip">
                                            Includes an estimated ICare service fee based on your inputs. This is not a quote and does not include any optional extras you may agree separately.
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

                        <div
                            style={{
                                marginTop: 18,
                                color: "rgba(15,23,42,0.90)",
                                fontWeight: 520,
                                fontSize: "1.04rem",
                                lineHeight: 1.55,
                            }}
                        >
                            You may save around{" "}
                            <span style={{ color: ACCENT, fontWeight: 850 }}>{Math.round(savePct)}%</span>{" "}
                            compared with a typical agency.
                        </div>

                        <div style={helper}>
                            This is an estimate — needs, cities and experience can change rates.
                        </div>

                        <div style={microNote}>
                            Live-in care is often priced per day or per week. Hourly equivalents are shown for comparison only.
                        </div>

                        <div style={{ marginTop: "auto" }} />
                    </div>
                </div>

                {/* Reference note */}
                <div style={avgPayBox}>
                    <strong style={{ color: TEXT, fontWeight: 600 }}>UK pay reference (live-in):</strong>{" "}
                    Hourly equivalents can vary because many live-in roles are described per day/week and include different
                    expectations around “active” hours. As a rough benchmark, Glassdoor estimates about{" "}
                    <strong style={{ fontWeight: 600 }}>~£11/hour average</strong> for “Live-in Carer” (UK) and shows higher reports around{" "}
                    <strong style={{ fontWeight: 600 }}>~£13/hour</strong>. The UK National Living Wage from{" "}
                    <strong style={{ fontWeight: 600 }}>1 April 2026</strong> is{" "}
                    <strong style={{ fontWeight: 600 }}>£12.71/hour</strong> (21+){" "}
                    <strong style={{ fontWeight: 600 }}>(for reference only)</strong>.
                    Some market guides also describe live-in as{" "}
                    <strong style={{ fontWeight: 600 }}>~£120/day or ~£800/week</strong> (example platform guidance).
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
