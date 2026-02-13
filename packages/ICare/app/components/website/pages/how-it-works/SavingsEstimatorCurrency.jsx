import { useEffect, useMemo, useState } from "react";
import styles from "./SavingsEstimatorCurrency.module.scss";

export default function ICareCostEstimatorExpanded() {
    const BRAND = "rgb(119, 141, 67)";

    const [currency, setCurrency] = useState("GBP");
    const [hourly, setHourly] = useState(13);
    const [hoursWeek, setHoursWeek] = useState(30);
    const [icareFeePct, setIcareFeePct] = useState(10);
    const [agencyMarkupPct, setAgencyMarkupPct] = useState(35);

    const range = useMemo(() => {
        if (currency === "PLN") return { min: 35, max: 120, step: 1, default: 55 };
        if (currency === "EUR") return { min: 10, max: 40, step: 0.5, default: 16 };
        return { min: 12.21, max: 35, step: 0.1, default: 13 };
    }, [currency]);

    useEffect(() => {
        setHourly((v) => {
            const next = Number.isFinite(v) ? v : range.default;
            return Math.min(range.max, Math.max(range.min, next));
        });
    }, [range.min, range.max, range.default]);

    const weeksPerMonth = 52 / 12;
    const baseCost = hourly * hoursWeek * weeksPerMonth;
    const agencyTotal = baseCost * (1 + agencyMarkupPct / 100);
    const icareTotal = baseCost * (1 + icareFeePct / 100);
    const youSave = agencyTotal - icareTotal;
    const savePct = agencyTotal > 0 ? (youSave / agencyTotal) * 100 : 0;

    const nf = useMemo(() => {
        return new Intl.NumberFormat(undefined, {
            style: "currency",
            currency,
            maximumFractionDigits: 2,
        });
    }, [currency]);

    return (
        <section className={styles.section} aria-label="ICare cost estimator expanded">
            <div className={styles.row}>
                {/* LEFT */}
                <div className={styles.infoGrid}>
                    <div className={styles.infoCard}>
                        <h3 className={styles.infoHead}>Live-in care: typical weekly range (UK)</h3>

                        <p className={styles.infoP}>
                            Live-in care is usually priced as a <strong>weekly rate</strong>.{" "}
                            A common UK guide range is <strong>£950–£1,400/week</strong>, depending on needs and area.
                        </p>

                        <div className={styles.pills}>
                            <div className={styles.pillRow}>
                                <span className={styles.pillLabel}>Everyday support</span>
                                <span>~£950–£1,100</span>
                            </div>
                            <div className={styles.pillRow}>
                                <span className={styles.pillLabel}>Higher needs</span>
                                <span>~£1,100–£1,350</span>
                            </div>
                            <div className={styles.pillRow}>
                                <span className={styles.pillLabel}>Extra night support</span>
                                <span>~£1,250–£1,400</span>
                            </div>
                            <div className={styles.pillRow}>
                                <span className={styles.pillLabel}>Couples (one carer)</span>
                                <span>~£1,350–£1,600</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.infoCard}>
                        <h3 className={styles.infoHead}>What affects cost most</h3>

                        <ul className={styles.bullets}>
                            <li><strong>Level of support:</strong> dementia, mobility, complex routines</li>
                            <li><strong>Nights:</strong> sleeping vs waking nights</li>
                            <li><strong>Location:</strong> London / South East often higher</li>
                            <li><strong>Experience:</strong> specialist skills and proven experience</li>
                        </ul>
                    </div>

                    {/* Funding accordion */}
                    <details className="icare-funding-details">
                        <summary className="icare-funding-summary">
                            <span className={styles.subHead}>Funding options (UK) — general guidance</span>
                            <span className={`icare-chevronBtn ${styles.chevronBtn}`} aria-hidden="true">
                                <span className="icare-chevronArrow" />
                            </span>
                        </summary>

                        <div className={styles.fundingContent}>
                            <p className={styles.infoP}>
                                Depending on your circumstances, you may be able to access support through the routes below.
                            </p>

                            <div className={styles.divider} />

                            <ul className={styles.bullets}>
                                <li>Local authority assessment and personal budget (if eligible)</li>
                                <li>NHS Continuing Healthcare (for complex health needs; sometimes fully funded)</li>
                                <li>Direct payments / personal budgets (where available)</li>
                                <li>Benefits and allowances that may support costs (eligibility varies)</li>
                            </ul>

                            <p className={styles.infoPDisclaimer}>
                                We can't assess eligibility or provide financial advice. Funding information is general guidance only.
                                Eligibility and availability depend on individual circumstances and local authority decisions.
                            </p>
                        </div>
                    </details>

                    <div className={styles.infoCard}>
                        <h3 className={styles.infoHead}>Note</h3>

                        <p className={styles.infoP}>
                            Estimates are based on your selected rate and weekly hours.
                            Final pricing depends on care needs and the caregiver's rate.
                        </p>

                        <p className={styles.infoPNote}>
                            Ranges are indicative and based on publicly available UK care cost guides and industry summaries.
                            Figures vary by region and needs.
                        </p>
                    </div>
                </div>

                {/* RIGHT */}
                <div className={styles.cardsStack}>
                    {/* INPUTS */}
                    <div className={styles.card}>
                        <h3 className={styles.infoHead}>Your inputs</h3>

                        <div className={styles.inputsGrid}>
                            {/* Currency row */}
                            <div className={styles.fieldRow}>
                                <span id="currency-label" className={styles.label}>Currency</span>

                                <div className={styles.currWrap} role="radiogroup" aria-labelledby="currency-label">
                                    <button
                                        type="button"
                                        role="radio"
                                        aria-checked={currency === "GBP"}
                                        className={currency === "GBP" ? styles.currBtnActive : styles.currBtn}
                                        onClick={() => setCurrency("GBP")}
                                    >
                                        GBP £
                                    </button>
                                    <button
                                        type="button"
                                        role="radio"
                                        aria-checked={currency === "EUR"}
                                        className={currency === "EUR" ? styles.currBtnActive : styles.currBtn}
                                        onClick={() => setCurrency("EUR")}
                                    >
                                        EUR €
                                    </button>
                                </div>
                            </div>

                            {/* Hourly rate */}
                            <div className={styles.fieldGroup}>
                                <div className={styles.fieldRowFlex}>
                                    <label htmlFor="hourly-rate" className={styles.label}>Hourly rate</label>
                                    <input
                                        id="hourly-rate"
                                        min={range.min}
                                        max={range.max}
                                        step={range.step}
                                        type="number"
                                        value={hourly}
                                        onChange={(e) => setHourly(Number(e.target.value))}
                                        className={styles.fieldMini}
                                    />
                                </div>

                                <input
                                    min={range.min}
                                    max={range.max}
                                    step={range.step}
                                    type="range"
                                    value={hourly}
                                    onChange={(e) => setHourly(Number(e.target.value))}
                                    className={styles.rangeInput}
                                    style={{ accentColor: BRAND }}
                                />

                                <div className={styles.rangeLabels}>
                                    <span>{range.min}</span>
                                    <span>{range.max}</span>
                                </div>

                                <p className={styles.helper}>
                                    Tip: choose a rate that's fair and sustainable for the carer.
                                </p>
                            </div>

                            {/* Hours per week */}
                            <div className={styles.fieldGroup}>
                                <div className={styles.fieldRowFlex}>
                                    <label htmlFor="hours-week" className={styles.label}>Hours per week</label>
                                    <input
                                        id="hours-week"
                                        type="number"
                                        value={hoursWeek}
                                        min={1}
                                        max={168}
                                        onChange={(e) => setHoursWeek(Number(e.target.value))}
                                        className={styles.fieldMini}
                                    />
                                </div>

                                <p className={styles.helperTight}>
                                    A helpful starting point is 20–40 hours/week.
                                </p>
                            </div>

                            {/* Agency markup */}
                            <div className={styles.fieldGroupWide}>
                                <div className={styles.fieldRow}>
                                    <label htmlFor="agency-markup" className={styles.label}>Agency markup</label>
                                    <select
                                        id="agency-markup"
                                        value={agencyMarkupPct}
                                        onChange={(e) => setAgencyMarkupPct(Number(e.target.value))}
                                        className={styles.selectLike}
                                    >
                                        <option value={25}>25%</option>
                                        <option value={30}>30%</option>
                                        <option value={35}>35%</option>
                                        <option value={40}>40%</option>
                                    </select>
                                </div>

                                <p className={styles.helperSmall}>
                                    Used for an illustrative &ldquo;typical agency total&rdquo;.
                                </p>
                            </div>

                            {/* ICare fee */}
                            <div className={styles.fieldGroupWide}>
                                <div className={styles.fieldRow}>
                                    <label htmlFor="icare-fee" className={styles.label}>ICare service fee</label>
                                    <select
                                        id="icare-fee"
                                        value={icareFeePct}
                                        onChange={(e) => setIcareFeePct(Number(e.target.value))}
                                        className={styles.selectLike}
                                    >
                                        <option value={5}>5%</option>
                                        <option value={10}>10%</option>
                                        <option value={12}>12%</option>
                                        <option value={15}>15%</option>
                                    </select>
                                </div>

                                <p className={styles.helperSmall}>
                                    Used only to show &ldquo;Estimated with ICare&rdquo; (illustrative).
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RESULTS */}
                    <div className={styles.card}>
                        <h3 className={styles.infoHead}>Monthly estimate</h3>

                        <div className={styles.resultGrid}>
                            <div className={styles.resultBox}>
                                <div className={styles.resultKey}>Care cost (no fees)</div>
                                <div className={styles.resultVal}>{nf.format(baseCost)}</div>
                            </div>

                            <div className={styles.resultBox}>
                                <div className={styles.resultKey}>
                                    Typical agency total
                                    <span className="icare-tip">
                                        <button type="button" className={styles.infoIcon} aria-label="Agency total info">i</button>
                                        <span className="icare-tip-bubble" role="tooltip">
                                            A market estimate for comparison only. Agency totals can include overheads and margins and may vary by provider, location and care needs.
                                        </span>
                                    </span>
                                </div>
                                <div className={styles.resultVal}>{nf.format(agencyTotal)}</div>
                            </div>

                            <div className={styles.resultBox}>
                                <div className={styles.resultKey}>
                                    Estimated with ICare
                                    <span className="icare-tip">
                                        <button type="button" className={styles.infoIcon} aria-label="ICare estimate info">i</button>
                                        <span className="icare-tip-bubble" role="tooltip">
                                            Includes an estimated ICare service fee based on your inputs. This is not a quote and does not include any optional extras you may agree separately.
                                        </span>
                                    </span>
                                </div>
                                <div className={styles.resultVal}>{nf.format(icareTotal)}</div>
                            </div>

                            <div className={styles.resultBoxAccent}>
                                <div className={styles.resultKey}>Estimated savings</div>
                                <div className={styles.resultValAccent}>{nf.format(youSave)}</div>
                            </div>
                        </div>

                        <div className={styles.bar} role="progressbar" aria-valuenow={Math.round(savePct)} aria-valuemin={0} aria-valuemax={100} aria-label="Estimated savings percentage">
                            <div className={styles.barFill} style={{ width: `${Math.max(0, Math.min(100, savePct))}%` }} />
                        </div>

                        <p className={styles.savingsText}>
                            You may save around{" "}
                            <span className={styles.savingsHighlight}>
                                {Math.round(savePct)}%
                            </span>{" "}
                            compared with a typical agency.
                        </p>

                        <p className={styles.disclaimer}>
                            This calculator provides indicative estimates only. ICare is a matching platform and does not provide care services, set rates, or employ caregivers.
                            Final rates and arrangements are agreed directly between families and caregivers. Agency figures are illustrative and vary by provider, region and care needs.
                        </p>
                    </div>
                </div>
            </div>

            {/* Global CSS for tooltip, details, chevron */}
            <style>{`
        .icare-funding-summary{
          list-style:none;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:14px;
          cursor:pointer;
          user-select:none;
          padding:0;
          margin:0;
        }
        .icare-funding-summary::-webkit-details-marker{ display:none; }

        .icare-chevronArrow{
          width: 10px;
          height: 10px;
          border-right: 2px solid rgba(255,255,255,0.95);
          border-bottom: 2px solid rgba(255,255,255,0.95);
          transform: rotate(45deg);
          transition: transform 160ms ease;
          margin-top: -2px;
        }
        details[open] .icare-chevronArrow{
          transform: rotate(-135deg);
          margin-top: 2px;
        }

        .icare-tip { position: relative; display: inline-flex; align-items: center; }
        .icare-tip-bubble {
          position: absolute;
          left: 50%;
          bottom: calc(100% + 10px);
          transform: translateX(-50%);
          width: min(320px, 72vw);
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
        .icare-tip button{ cursor: help; }
        .icare-tip:hover .icare-tip-bubble,
        .icare-tip:focus-within .icare-tip-bubble{
          opacity: 1;
          pointer-events: auto;
          transform: translateX(-50%) translateY(-2px);
        }
      `}</style>
        </section>
    );
}
