import React from "react";
import styles from "./cost-estimator.module.scss";

/**
 * ICare — Budget Estimator (MVP: companionship only, no ICare fee shown)
 *
 * ✅ Only companionship defaults (UK)
 * ✅ Direct (family budget) = Care pay (no ICare/platform fee displayed)
 * ✅ Agency overhead default: 10% (editable 10–100)
 * ✅ Very scan-friendly copy + bigger, colored tooltips
 * ✅ Short explainer toggle (readable + clear)
 * ✅ Guards: no negatives, max 2 decimals, clamps
 */
export default function ICareCostEstimator({
    // kept for compatibility but NOT used in MVP
    icareFeePct = 0,
    agencyMarginPct: agencyMarginPctProp = 10,
}) {
    const TEXT = "#221002";
    const ACCENT = "rgb(119, 141, 67)";
    const ACCENT2 = "rgb(221, 139, 79)";

    const to2 = (n) => Number(Number(n).toFixed(2));
    const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
    const safeNumber = (raw, fallback) => {
        const n = typeof raw === "number" ? raw : Number(raw);
        return Number.isFinite(n) ? n : fallback;
    };

    const snapToStep = (value, step) => {
        const decimals = (step.toString().split(".")[1] || "").length;
        const snapped = Math.round(value / step) * step;
        return Number(snapped.toFixed(decimals));
    };

    const hourlyRanges = React.useMemo(
        () => ({
            EUR: { min: 12.82, max: 30, step: 0.1 },
            GBP: { min: 10.5, max: 30, step: 0.1 },
        }),
        []
    );

    const [currency, setCurrency] = React.useState("GBP");

    // Companionship default (UK midpoint)
    const COMPANIONSHIP_DEFAULT_GBP = 12.5;

    const range = hourlyRanges[currency] ?? hourlyRanges.GBP;

    const [hourly, setHourly] = React.useState(() => {
        const d = currency === "GBP" ? COMPANIONSHIP_DEFAULT_GBP : (range.min + range.max) / 2;
        return snapToStep(d, range.step);
    });

    const [hoursWeek, setHoursWeek] = React.useState(30);

    // Agency overhead (editable)
    const [agencyMarginPct, setAgencyMarginPct] = React.useState(() =>
        clamp(safeNumber(agencyMarginPctProp, 10), 10, 100)
    );

    React.useEffect(() => {
        if (currency === "GBP") {
            setHourly((prev) => {
                const next = clamp(safeNumber(prev, COMPANIONSHIP_DEFAULT_GBP), range.min, range.max);
                return snapToStep(next, range.step);
            });
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

    const {
        baseCost,
        agencyTotal,
        diff,
        diffPct,
        diffPctRounded,
        diffPctClamped,
        agencyCarerShareRounded,
    } = React.useMemo(() => {
        const weeksPerMonth = 4.33;

        const h = clamp(to2(safeNumber(hourly, 0)), range.min, range.max);
        const hw = clamp(to2(safeNumber(hoursWeek, 0)), 0, 168);
        const m = clamp(to2(safeNumber(agencyMarginPct, 10)), 10, 100);

        const base = h * hw * weeksPerMonth;

        // Agency total = base + overhead (comparison only)
        const agency = base * (1 + m / 100);

        // MVP: "direct" = base (no ICare fee shown)
        const direct = base;

        const d = Math.max(0, agency - direct);
        const p = agency > 0 ? (d / agency) * 100 : 0;

        const agencyShare = agency > 0 ? (base / agency) * 100 : 0;

        const pctClamped = Math.max(0, Math.min(100, p));
        const pctRounded = Math.round(p);

        return {
            baseCost: base,
            agencyTotal: agency,
            diff: d,
            diffPct: p,
            diffPctClamped: pctClamped,
            diffPctRounded: pctRounded,
            agencyCarerShareRounded: Math.max(0, Math.min(100, Math.round(agencyShare))),
        };
    }, [hourly, hoursWeek, agencyMarginPct, range.min, range.max]);

    const CurrencyToggle = () => (
        <div className={styles.curr} role="radiogroup" aria-labelledby="currency-label-home">
            <button
                type="button"
                role="radio"
                aria-checked={currency === "GBP"}
                className={`${styles.currBtn} ${currency === "GBP" ? styles.isActive : ""}`}
                onClick={() => setCurrency("GBP")}
            >
                GBP £
            </button>
            <button
                type="button"
                role="radio"
                aria-checked={currency === "EUR"}
                className={`${styles.currBtn} ${currency === "EUR" ? styles.isActive : ""}`}
                onClick={() => setCurrency("EUR")}
            >
                EUR €
            </button>
        </div>
    );

    const InfoTip = ({ label, children }) => (
        <span className={styles.tip}>
            <button type="button" className={styles.infoIcon} aria-label={label}>
                i
            </button>
            <span className={styles.tipBubble} role="tooltip">
                {children}
            </span>
        </span>
    );

    return (
        <section
            aria-label="Cost estimator"
            className={styles.wrap}
            style={{
                ["--accent"]: ACCENT,
                ["--accent2"]: ACCENT2,
                ["--text"]: TEXT,
                ["--savePct"]: `${diffPctClamped.toFixed(0)}%`,
                ["--savePctRounded"]: diffPctRounded,
            }}
        >
            <div className={styles.container}>
                {/* HEADER */}
                <div className={styles.header}>
                    <h2 className={styles.h1}>
                        A simple estimate to support <br />
                        your care decisions
                    </h2>
                    <h3 className={styles.h2Mini}>Budget clarity in under a minute</h3>
                    <p className={styles.lead}>
                        Caring is emotional — money shouldn’t add extra stress. <br />
                        Adjust rate and hours/week to see an illustrative monthly estimate.
                    </p>
                </div>

                <div className={styles.cardsRow}>
                    {/* LEFT */}
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Your inputs</h3>

                        <div className={styles.inputsGrid}>
                            {/* Currency */}
                            <div className={styles.currencyRow}>
                                <span id="currency-label-home" className={styles.label}>
                                    Currency
                                </span>
                                <CurrencyToggle />
                            </div>

                            {/* Hourly */}
                            <div className={styles.block}>
                                <div className={styles.blockTop}>
                                    <label htmlFor="hourly-rate-home" className={styles.label}>
                                        Hourly rate (companionship)
                                    </label>

                                    <input
                                        id="hourly-rate-home"
                                        className={`${styles.inputMini} ${styles.estInput}`}
                                        type="number"
                                        inputMode="decimal"
                                        value={hourly}
                                        min={range.min}
                                        max={range.max}
                                        step={range.step}
                                        onChange={(e) => {
                                            const next = safeNumber(e.target.value, hourly);
                                            setHourly(clamp(to2(next), range.min, range.max));
                                        }}
                                    />
                                </div>

                                <input
                                    className={styles.range}
                                    type="range"
                                    min={range.min}
                                    max={range.max}
                                    step={range.step}
                                    value={hourly}
                                    onChange={(e) => {
                                        const next = safeNumber(e.target.value, hourly);
                                        setHourly(clamp(to2(next), range.min, range.max));
                                    }}
                                    aria-label="Hourly rate slider"
                                />

                                <div className={styles.rangeMinMax}>
                                    <span>{range.min}</span>
                                    <span>{range.max}</span>
                                </div>

                                <p className={styles.helper}>
                                    Typical UK companionship pay is often roughly £11–£14/hr (varies by area and experience).
                                </p>
                            </div>

                            {/* Hours/week */}
                            <div className={styles.block}>
                                <div className={styles.blockTop}>
                                    <label htmlFor="hours-week-home" className={styles.label}>
                                        Hours per week
                                    </label>

                                    <input
                                        id="hours-week-home"
                                        className={`${styles.inputMini} ${styles.estInput}`}
                                        type="number"
                                        inputMode="numeric"
                                        value={hoursWeek}
                                        min={0}
                                        max={168}
                                        step={1}
                                        onChange={(e) => {
                                            const next = safeNumber(e.target.value, hoursWeek);
                                            setHoursWeek(clamp(Math.round(next), 0, 168));
                                        }}
                                    />
                                </div>

                                <p className={styles.helper}>
                                    A helpful starting point is 20–40 hours/week (adjust to your family’s routine).
                                </p>
                            </div>

                            {/* Agency overhead */}
                            <div className={styles.block}>
                                <div className={styles.blockTop}>
                                    <label htmlFor="agency-markup-home" className={styles.label}>
                                        Agency overhead (estimate)
                                    </label>

                                    <input
                                        id="agency-markup-home"
                                        className={`${styles.inputMini} ${styles.estInput}`}
                                        type="number"
                                        inputMode="numeric"
                                        value={agencyMarginPct}
                                        min={10}
                                        max={100}
                                        step={1}
                                        onChange={(e) => {
                                            const next = safeNumber(e.target.value, agencyMarginPct);
                                            setAgencyMarginPct(clamp(Math.round(next), 10, 100));
                                        }}
                                    />
                                </div>

                                <input
                                    className={styles.range}
                                    type="range"
                                    min={10}
                                    max={100}
                                    step={1}
                                    value={agencyMarginPct}
                                    onChange={(e) => {
                                        const next = safeNumber(e.target.value, agencyMarginPct);
                                        setAgencyMarginPct(clamp(Math.round(next), 10, 100));
                                    }}
                                    aria-label="Agency overhead slider"
                                />

                                <div className={styles.rangeMinMax}>
                                    <span>10%</span>
                                    <span>100%</span>
                                </div>

                                <p className={styles.helper}>
                                    For comparison only. This overhead can reflect coordination, recruitment checks, ongoing support,
                                    compliance, training and operating costs — and varies by provider and needs.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Monthly estimate</h3>

                        <div className={styles.resultGrid}>
                            <div className={styles.pill}>
                                <div className={styles.k}>
                                    Carer take-home pay
                                    <InfoTip label="Care pay info">
                                        The estimated amount the carer earns for your selected hours and rate.
                                    </InfoTip>
                                </div>
                                <div className={styles.v}>{nf.format(baseCost)}</div>
                            </div>

                            <div className={styles.pill}>
                                <div className={styles.k}>
                                    Typical agency price for the same care
                                    <InfoTip label="Agency estimate info">
                                        An illustrative agency price for the same care. Often includes coordination, support and operating
                                        costs. In this scenario, care pay is about <strong>{agencyCarerShareRounded}%</strong> of the agency
                                        estimate.
                                    </InfoTip>
                                </div>
                                <div className={styles.v}>{nf.format(agencyTotal)}</div>
                            </div>

                            <div className={`${styles.pill} ${styles.pillHighlight} ${styles.pillLarge}`}>
                                <div className={styles.k}>
                                    Your estimated monthly saving
                                    <InfoTip label="Comparison info">
                                        The difference between the agency estimate and the direct care budget in this scenario.
                                    </InfoTip>
                                </div>
                                <div className={`${styles.v} ${styles.vHighlight}`}>{nf.format(diff)}</div>
                            </div>
                        </div>

                        <div
                            className={styles.bar}
                            role="progressbar"
                            aria-valuenow={diffPctRounded}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label="Estimated difference percentage"
                        >
                            <div className={styles.barFill} />
                        </div>

                        <p className={styles.saveLine}>
                            Difference: <span className={styles.savePct}>{diffPctRounded}%</span> vs agency estimate{" "}
                            <span className={styles.mutedInline}>(comparison only)</span>.
                        </p>

                        <p className={styles.microLine}>
                            With agencies, a significant part of the budget typically covers coordination and operating costs, not direct care.
                        </p>

                        <p className={styles.helper}>
                            These figures are illustrative only and not a formal quote, offer, or contract. Final costs may vary based on care
                            needs, schedule, location, experience, and any agreed terms.
                        </p>

                        <div className={styles.explainerStatic}>
                            <ul className={styles.explainerList}>
                                <li>
                                    <strong>Care pay</strong> = what the carer earns.
                                </li>
                                <li>
                                    <strong>Agency estimate</strong> = care pay + agency operating costs (illustrative).
                                </li>
                                <li>
                                    <strong>Direct budget</strong> = the same care cost without agency overhead.
                                </li>
                                <li>
                                    <strong>Comparison</strong> = the estimated difference in this scenario.
                                </li>
                            </ul>
                            <p className={styles.explainerNote}>
                                This tool is for general information and comparison. It does not provide legal, financial, or contractual
                                advice, and final pricing should always be confirmed directly with your chosen provider.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Reference note */}
                <div className={styles.avgPayBox}>
                    <strong className={styles.avgStrong}>UK pay reference (companionship):</strong>{" "}
                    Many basic home-care / companionship roles are commonly advertised around{" "}
                    <strong className={styles.avgStrong}>£11–£14/hr</strong> (varies by region and experience). From{" "}
                    <strong className={styles.avgStrong}>1 April 2026</strong>, the UK National Living Wage is{" "}
                    <strong className={styles.avgStrong}>£12.71/hr</strong> (age 21+).
                    <div className={styles.sourcesRow}>
                        <a
                            href="https://www.gov.uk/national-minimum-wage-rates"
                            target="_blank"
                            rel="noreferrer"
                            className={styles.sourceLink}
                        >
                            GOV.UK (NMW/NLW)
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
