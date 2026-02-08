import React from "react";
import styles from "./cost-estimator.module.scss";

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

    const savePctClamped = Math.max(0, Math.min(100, savePct));
    const savePctRounded = Math.round(savePct);

    // UI bits
    const CurrencyToggle = () => (
        <div className={styles.curr} aria-label="Currency selector">
            <button
                type="button"
                className={`${styles.currBtn} ${currency === "GBP" ? styles.isActive : ""}`}
                onClick={() => setCurrency("GBP")}
            >
                GBP £
            </button>
            <button
                type="button"
                className={`${styles.currBtn} ${currency === "EUR" ? styles.isActive : ""}`}
                onClick={() => setCurrency("EUR")}
            >
                EUR €
            </button>
        </div>
    );

    return (
        <section
            aria-label="Cost estimator"
            className={styles.wrap}
            style={{
                // tylko dynamiczne rzeczy, które wcześniej i tak były dynamiczne
                ["--accent"]: ACCENT,
                ["--accent2"]: ACCENT2,
                ["--text"]: TEXT,
                ["--savePct"]: `${savePctClamped.toFixed(0)}%`,
                ["--savePctRounded"]: savePctRounded,
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
                        Adjust rate and hours/week for a monthly estimate.
                    </p>
                </div>

                {/* 2 BOXES */}
                <div className={styles.cardsRow}>
                    {/* LEFT = controls */}
                    <div className={styles.card}>
                        <div className={styles.cardTitle}>Your inputs</div>

                        <div className={styles.inputsGrid}>
                            {/* Currency row */}
                            <div className={styles.currencyRow}>
                                <span className={styles.label}>Currency</span>
                                <CurrencyToggle />
                            </div>

                            {/* 1) Hourly rate */}
                            <div className={styles.block}>
                                <div className={styles.blockTop}>
                                    <span className={styles.label}>Hourly rate</span>

                                    <input
                                        className={`${styles.inputMini} ${styles.estInput}`}
                                        type="number"
                                        value={hourly}
                                        min={range.min}
                                        max={range.max}
                                        step={range.step}
                                        onChange={(e) => setHourly(Number(e.target.value))}
                                        aria-label="Hourly rate"
                                    />
                                </div>

                                <input
                                    className={styles.range}
                                    type="range"
                                    min={range.min}
                                    max={range.max}
                                    step={range.step}
                                    value={hourly}
                                    onChange={(e) => setHourly(Number(e.target.value))}
                                />

                                <div className={styles.rangeMinMax}>
                                    <span>{range.min}</span>
                                    <span>{range.max}</span>
                                </div>

                                <div className={styles.helper}>
                                    Tip: choose a rate that’s fair and sustainable for the carer.
                                </div>
                            </div>

                            {/* 2) Hours per week */}
                            <div className={styles.block}>
                                <div className={styles.blockTop}>
                                    <span className={styles.label}>Hours per week</span>

                                    <input
                                        className={`${styles.inputMini} ${styles.estInput}`}
                                        type="number"
                                        value={hoursWeek}
                                        onChange={(e) => setHoursWeek(Number(e.target.value))}
                                        aria-label="Hours per week"
                                    />
                                </div>

                                <div className={styles.helper}>A helpful starting point is 20–40 hours/week.</div>
                            </div>
                        </div>

                        <div className={styles.cardSpacer} />
                    </div>

                    {/* RIGHT = results */}
                    <div className={styles.card}>
                        <div className={styles.cardTitle}>Monthly estimate</div>

                        <div className={styles.resultGrid}>
                            <div className={styles.pill}>
                                <div className={styles.k}>Care cost (no fees)</div>
                                <div className={styles.v}>{nf.format(baseCost)}</div>
                            </div>

                            <div className={styles.pill}>
                                <div className={styles.k}>
                                    Typical agency total
                                    <span className={styles.tip}>
                                        <span className={styles.infoIcon} aria-label="Agency total info" tabIndex={0}>
                                            i
                                        </span>
                                        <span className={styles.tipBubble} role="tooltip">
                                            A market estimate for comparison only. Agency totals can include overheads
                                            and margins and may vary by provider, location and care needs.
                                        </span>
                                    </span>
                                </div>
                                <div className={styles.v}>{nf.format(agencyTotal)}</div>
                            </div>

                            <div className={styles.pill}>
                                <div className={styles.k}>
                                    Estimated with ICare
                                    <span className={styles.tip}>
                                        <span className={styles.infoIcon} aria-label="ICare estimate info" tabIndex={0}>
                                            i
                                        </span>
                                        <span className={styles.tipBubble} role="tooltip">
                                            Includes an estimated ICare service fee based on your inputs. This is not a
                                            quote and does not include any optional extras you may agree separately.
                                        </span>
                                    </span>
                                </div>
                                <div className={styles.v}>{nf.format(icareTotal)}</div>
                            </div>

                            <div className={`${styles.pill} ${styles.pillHighlight}`}>
                                <div className={styles.k}>Estimated savings</div>
                                <div className={`${styles.v} ${styles.vHighlight}`}>{nf.format(youSave)}</div>
                            </div>
                        </div>

                        <div className={styles.bar}>
                            <div className={styles.barFill} />
                        </div>

                        <div className={styles.saveLine}>
                            You may save around{" "}
                            <span className={styles.savePct}>{savePctRounded}%</span>{" "}
                            compared with a typical agency.
                        </div>

                        <div className={styles.helper}>
                            This is an estimate — needs, cities and experience can change rates.
                        </div>

                        <div className={styles.microNote}>
                            Live-in care is often priced per day or per week. Hourly equivalents are shown for
                            comparison only.
                        </div>

                        <div className={styles.cardSpacer} />
                    </div>
                </div>

                {/* Reference note */}
                <div className={styles.avgPayBox}>
                    <strong className={styles.avgStrong}>UK pay reference (live-in):</strong>{" "}
                    Hourly equivalents can vary because many live-in roles are described per day/week and
                    include different expectations around “active” hours. As a rough benchmark, Glassdoor
                    estimates about <strong className={styles.avgStrong}>~£11/hour average</strong> for
                    “Live-in Carer” (UK) and shows higher reports around{" "}
                    <strong className={styles.avgStrong}>~£13/hour</strong>. The UK National Living Wage from{" "}
                    <strong className={styles.avgStrong}>1 April 2026</strong> is{" "}
                    <strong className={styles.avgStrong}>£12.71/hour</strong> (21+){" "}
                    <strong className={styles.avgStrong}>(for reference only)</strong>. Some market guides
                    also describe live-in as{" "}
                    <strong className={styles.avgStrong}>~£120/day or ~£800/week</strong> (example platform
                    guidance).
                    <div className={styles.sourcesRow}>
                        <a
                            href="https://www.glassdoor.co.uk/Salaries/live-in-carer-salary-SRCH_KO0%2C13.htm"
                            target="_blank"
                            rel="noreferrer"
                            className={styles.sourceLink}
                        >
                            Glassdoor
                        </a>
                        <a
                            href="https://www.gov.uk/government/publications/minimum-wage-rates-for-2026"
                            target="_blank"
                            rel="noreferrer"
                            className={styles.sourceLink}
                        >
                            GOV.UK (2026 rates)
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
