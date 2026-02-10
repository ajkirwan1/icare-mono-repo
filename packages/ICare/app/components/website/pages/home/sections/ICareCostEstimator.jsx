import React from "react";
import styles from "./cost-estimator.module.scss";

/**
 * ICare — Budget Estimator (refined UI + compact inputs)
 * ✅ Hourly rate: small number pill + slider underneath
 * ✅ Inputs have same "soft" background as result pills (Care cost)
 * ✅ Same treatment for Hours per week
 *
 * Copy goals (legal-safe):
 * ✅ show what families may pay (total estimates)
 * ✅ explain what agency pricing can include (neutral, factual)
 * ✅ avoid blame/accusations; use "estimate / varies / comparison only"
 *
 * Logic update:
 * ✅ show "carer share of total" (agency vs ICare) so families understand where the budget goes
 * ✅ agency margin is an adjustable assumption (default chosen for day/week style pricing)
 */
export default function ICareCostEstimator({
    icareFeePct = 10,
    agencyMarginPct = 170,
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

    // kept but unused (future lead capture)
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

    const {
        baseCost,
        agencyTotal,
        icareTotal,
        youSave,
        savePct,
        agencyCarerSharePct,
        icareCarerSharePct,
    } = React.useMemo(() => {
        const weeksPerMonth = 4.33;
        const base = hourly * hoursWeek * weeksPerMonth;

        // Agency total = care pay base + estimated overhead/margin (assumption for comparison)
        const agency = base * (1 + agencyMarginPct / 100);

        // ICare total = care pay base + platform service fee (assumption)
        const icare = base * (1 + icareFeePct / 100);

        const save = Math.max(0, agency - icare);
        const pct = agency > 0 ? (save / agency) * 100 : 0;

        const agencyShare = agency > 0 ? (base / agency) * 100 : 0;
        const icareShare = icare > 0 ? (base / icare) * 100 : 0;

        return {
            baseCost: base,
            agencyTotal: agency,
            icareTotal: icare,
            youSave: save,
            savePct: pct,
            agencyCarerSharePct: agencyShare,
            icareCarerSharePct: icareShare,
        };
    }, [hourly, hoursWeek, agencyMarginPct, icareFeePct]);

    const savePctClamped = Math.max(0, Math.min(100, savePct));
    const savePctRounded = Math.round(savePct);

    const agencyCarerShareRounded = Math.max(0, Math.min(100, Math.round(agencyCarerSharePct)));
    const icareCarerShareRounded = Math.max(0, Math.min(100, Math.round(icareCarerSharePct)));

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
                        Adjust rate and hours/week to see an illustrative monthly family budget estimate.
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
                                    Tip: choose a rate that’s fair, sustainable — and clear for both sides.
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

                                <div className={styles.helper}>
                                    A helpful starting point is 20–40 hours/week (adjust to your family’s routine).
                                </div>
                            </div>
                        </div>

                        <div className={styles.cardSpacer} />
                    </div>

                    {/* RIGHT = results */}
                    <div className={styles.card}>
                        <div className={styles.cardTitle}>Monthly estimate</div>

                        <div className={styles.resultGrid}>
                            <div className={styles.pill}>
                                <div className={styles.k}>
                                    Care pay (carer earnings, no fees)
                                    <span className={styles.tip}>
                                        <span className={styles.infoIcon} aria-label="Care pay info" tabIndex={0}>
                                            i
                                        </span>
                                        <span className={styles.tipBubble} role="tooltip">
                                            Estimated amount going to the carer for the hours and rate you selected
                                            (before any third-party fees). Shown to help families understand the “care
                                            pay” portion of the monthly budget.
                                        </span>
                                    </span>
                                </div>
                                <div className={styles.v}>{nf.format(baseCost)}</div>
                            </div>

                            <div className={styles.pill}>
                                <div className={styles.k}>
                                    Agency estimate (family pays)
                                    <span className={styles.tip}>
                                        <span className={styles.infoIcon} aria-label="Agency total info" tabIndex={0}>
                                            i
                                        </span>
                                        <span className={styles.tipBubble} role="tooltip">
                                            Illustrative estimate for comparison only (not a market survey and not a
                                            quote). Agency pricing often includes the carer’s pay plus overheads (e.g.
                                            recruitment, admin, support, compliance) and a business margin. Totals can
                                            vary by provider, location and care needs.
                                            <br />
                                            <br />
                                            Based on the assumptions used in this calculator, “care pay” is about{" "}
                                            <strong>{agencyCarerShareRounded}%</strong> of this agency estimate.
                                        </span>
                                    </span>
                                </div>
                                <div className={styles.v}>{nf.format(agencyTotal)}</div>
                            </div>

                            <div className={styles.pill}>
                                <div className={styles.k}>
                                    Estimated via ICare (family budget)
                                    <span className={styles.tip}>
                                        <span className={styles.infoIcon} aria-label="ICare estimate info" tabIndex={0}>
                                            i
                                        </span>
                                        <span className={styles.tipBubble} role="tooltip">
                                            Includes an estimated ICare service fee based on your inputs. This is an
                                            estimate (not a quote). Any optional extras are agreed separately between
                                            families and carers.
                                            <br />
                                            <br />
                                            Based on the assumptions used in this calculator, “care pay” is about{" "}
                                            <strong>{icareCarerShareRounded}%</strong> of the estimated ICare total.
                                        </span>
                                    </span>
                                </div>
                                <div className={styles.v}>{nf.format(icareTotal)}</div>
                            </div>

                            <div className={`${styles.pill} ${styles.pillHighlight}`}>
                                <div className={styles.k}>Estimated comparison</div>
                                <div className={`${styles.v} ${styles.vHighlight}`}>{nf.format(youSave)}</div>
                            </div>
                        </div>

                        <div className={styles.bar}>
                            <div className={styles.barFill} />
                        </div>

                        <div className={styles.saveLine}>
                            Illustrative difference of{" "}
                            <span className={styles.savePct}>{savePctRounded}%</span>{" "}
                            versus the agency estimate (for comparison only).
                        </div>

                        <div className={styles.helper}>
                            Estimates vary — care needs, schedules, location and experience can change rates and totals.
                        </div>

                        <div className={styles.microNote}>
                            Families are often quoted a day or week rate (especially for live-in care). We show an
                            hourly/monthly equivalent here to make comparisons easier. This tool is illustrative and not
                            a quote.
                        </div>

                        <div className={styles.cardSpacer} />
                    </div>
                </div>

                {/* Reference note */}
                <div className={styles.avgPayBox}>
                    <strong className={styles.avgStrong}>UK pay reference (live-in):</strong>{" "}
                    Hourly equivalents can vary because many live-in roles are described per day/week and include
                    different expectations around “active” hours. As a rough benchmark, Glassdoor estimates about{" "}
                    <strong className={styles.avgStrong}>~£11/hour average</strong> for “Live-in Carer” (UK) and shows
                    higher reports around <strong className={styles.avgStrong}>~£13/hour</strong>. The UK National Living
                    Wage from <strong className={styles.avgStrong}>1 April 2026</strong> is{" "}
                    <strong className={styles.avgStrong}>£12.71/hour</strong> (21+){" "}
                    <strong className={styles.avgStrong}>(for reference only)</strong>. Some market guides also describe
                    live-in as <strong className={styles.avgStrong}>~£120/day or ~£800/week</strong> (example guidance).
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
