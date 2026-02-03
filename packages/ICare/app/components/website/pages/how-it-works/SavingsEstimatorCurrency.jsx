import React, { useEffect, useMemo, useState } from "react";

/**
 * ICare — Expanded cost estimator (2 columns)
 * LEFT: info cards + funding accordion
 * RIGHT: 2 cards (inputs + monthly estimate) — styled close to your reference
 */
export default function ICareCostEstimatorExpanded() {
    const BRAND = "rgb(119, 141, 67)"; // template green
    const ACCENT = "rgb(221, 139, 79)"; // orange
    const TEXT = "rgb(15, 23, 42)";

    const [currency, setCurrency] = useState("GBP"); // GBP | EUR | PLN
    const [hourly, setHourly] = useState(13);
    const [hoursWeek, setHoursWeek] = useState(30);
    const [icareFeePct, setIcareFeePct] = useState(10); // example fee for "Estimated with ICare"
    const [agencyMarkupPct, setAgencyMarkupPct] = useState(35);

    const range = useMemo(() => {
        if (currency === "PLN") return { min: 35, max: 120, step: 1, default: 55 };
        if (currency === "EUR") return { min: 10, max: 40, step: 0.5, default: 16 };
        return { min: 12.21, max: 35, step: 0.1, default: 13 }; // GBP
    }, [currency]);

    // keep hourly within range on currency change
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

    // ====== STYLES (aligned to your reference) ======
    const page = {
        width: "100%",
        padding: "4rem 0",
        color: TEXT,
        background: "rgb(242, 242, 242)",
        fontFamily:
            "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    };

    // 2 columns max
    const row = {
        display: "grid",
        gridTemplateColumns: "1fr 1.05fr",
        gap: "clamp(22px, 3vw, 40px)",
        alignItems: "start",
        maxWidth: "1000px",
        margin: "0 auto"

    };

    // shared card look (same vibe as your 2 boxes)
    const card = {
        height: "100%",
        borderRadius: 24,
        border: "1px solid rgba(15, 23, 42, 0.10)",
        boxShadow: "0 18px 44px rgba(15, 23, 42, 0.08)",
        background: "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(10px)",
        padding: "clamp(18px, 2.4vw, 26px)",
        display: "flex",
        flexDirection: "column",
    };

    const cardTitle = {
        margin: 0,
        fontWeight: 700,
        letterSpacing: "-0.15px",
        color: "rgba(15, 23, 42, 0.92)",
        fontSize: "1.05rem",
    };

    // left side info cards
    const infoGrid = { display: "grid", gap: 12 };

    const infoCard = {
        borderRadius: 22,
        border: "1px solid rgba(15, 23, 42, 0.12)",
        background: "rgba(255, 255, 255, 0.70)",
        boxShadow: "0 16px 36px rgba(15, 23, 42, 0.06)",
        padding: "clamp(16px, 2vw, 22px)",
    };

    const infoHead = {
        fontWeight: 320,
        fontSize: "1.22rem",
        letterSpacing: "-0.2px",
        borderBottom: "1px solid rgba(15, 23, 42, 0.1)",
        paddingBottom: "0.55rem",
        textAlign: "center",
        margin: "0px 0px 1.1rem",
        color: "rgba(15, 23, 42, 0.92)",
    };

    const subHead = {
        margin: 0,
        fontWeight: 520,
        color: "rgba(15, 23, 42, 0.90)",
        fontSize: "1rem",
        letterSpacing: "-0.05px",
    };

    const infoP = {
        margin: 0,
        color: "rgba(15, 23, 42, 0.92)",
        fontWeight: 420,
        fontSize: "0.98rem",
        lineHeight: 1.55,
    };

    const pills = {
        display: "grid",
        gap: 10,
        marginTop: 14,
    };

    const pillRow = {
        display: "flex",
        justifyContent: "space-between",
        gap: 12,
        padding: "10px 12px",
        borderRadius: 16,
        border: "1px solid rgba(15, 23, 42, 0.12)",
        background: "rgba(255, 255, 255, 0.5)",
        color: "rgba(15, 23, 42, 0.92)",
        fontWeight: 520,
        fontSize: "0.98rem",
        letterSpacing: "-0.05px",
    };

    const bullets = {
        margin: 0,
        paddingLeft: "1.05rem",
        display: "grid",
        gap: 10,
        color: "rgba(15, 23, 42, 0.92)",
        lineHeight: 1.55,
        fontSize: "0.98rem",
        fontWeight: 420,
        listStyle: "decimal"
    };

    const cardsRow = {
        display: "grid",
        gridTemplateColumns: "1fr", // ✅ stack
        gap: "clamp(14px, 2.2vw, 22px)",
        alignItems: "stretch",
    };

    // labels like your reference
    const label = {
        fontWeight: 520,
        color: "rgba(15, 23, 42, 0.9)",
        fontSize: "1rem",
        letterSpacing: "-0.05px",
    };

    const helper = {
        marginTop: 8,
        color: "rgba(15, 23, 42, 0.92)",
        fontWeight: 420,
        fontSize: "0.98rem",
        lineHeight: 1.55,
    };

    // small pill input like your reference
    const fieldMini = {
        width: "fit-content",
        minWidth: 92,
        border: "1px solid rgba(15, 23, 42, 0.12)",
        borderRadius: 999,
        padding: "8px 10px",
        background: "rgba(255, 255, 255, 0.5)",
        fontSize: "0.98rem",
        color: TEXT,
        outline: "none",
        textAlign: "center",
    };

    const selectLike = {
        border: "1px solid rgba(15, 23, 42, 0.12)",
        borderRadius: 999,
        padding: "9px 12px",
        background: "rgba(255, 255, 255, 0.5)",
        fontSize: "0.98rem",
        color: TEXT,
        outline: "none",
        fontWeight: 520,
    };

    // Currency Toggle (button group)
    const currWrap = {
        display: "inline-flex",
        gap: 8,
        padding: 4,
        borderRadius: 999,
        border: "1px solid rgba(15, 23, 42, 0.12)",
        background: "rgba(255,255,255,0.40)",
    };

    const currBtn = (active) => ({
        border: "none",
        cursor: "pointer",
        padding: "8px 12px",
        borderRadius: 999,
        fontSize: "0.96rem",
        fontWeight: 650,
        letterSpacing: "-0.05px",
        color: active ? "rgba(255,255,255,0.96)" : "rgba(15,23,42,0.82)",
        background: active ? BRAND : "transparent",
        boxShadow: active ? "0 10px 24px rgba(15,23,42,0.12)" : "none",
    });

    // Results grid 2x2 (like your reference)
    const resultGrid = {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12,
        marginTop: 10,
    };

    const resultBox = (accent) => ({
        borderRadius: 16,
        padding: 12,
        border: accent
            ? "1px solid rgba(221, 139, 79, 0.28)"
            : "1px solid rgba(15, 23, 42, 0.16)",
        background: accent ? "rgba(221, 139, 79, 0.06)" : "rgba(255, 255, 255, 0.5)",
    });

    const resultK = {
        fontSize: "0.97rem",
        fontWeight: 420,
        color: "rgba(15, 23, 42, 0.88)",
        marginBottom: 4,
        display: "flex",
        alignItems: "center",
        gap: 8,
    };

    const resultV = (accent) => ({
        fontWeight: 620,
        fontSize: "1.1rem",
        color: accent ? BRAND : TEXT,
        letterSpacing: "-0.2px",
    });

    const tooltipWrap = {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
    };

    const infoIcon = {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 18,
        height: 18,
        borderRadius: 999,
        border: "1px solid rgba(15, 23, 42, 0.22)",
        fontSize: 12,
        fontWeight: 900,
        lineHeight: 1,
        color: "rgba(15, 23, 42, 0.7)",
        cursor: "help",
        userSelect: "none",
        transform: "translateY(-0.5px)",
        background: "rgba(255, 255, 255, 0.85)",
    };

    const disclaimer = {
        marginTop: 14,
        borderRadius: 16,
        padding: 12,
        border: "1px solid rgba(15, 23, 42, 0.12)",
        background: "rgba(255, 255, 255, 0.5)",
        color: "rgba(15, 23, 42, 0.86)",
        fontWeight: 420,
        fontSize: "0.95rem",
        lineHeight: 1.55,
    };

    // bar
    const bar = {
        marginTop: 14,
        height: 8,
        borderRadius: 999,
        background: "rgba(15,23,42,0.10)",
        overflow: "hidden",
    };

    const barFill = {
        width: `${Math.max(0, Math.min(100, savePct))}%`,
        height: "100%",
        background: BRAND,
    };

    // Accordion chevron button (big, green, white arrow, max 2px lines)
    const chevronBtn = {
        width: 34,
        height: 34,
        borderRadius: 999,
        background: BRAND,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "0 0 auto",
    };

    return (
        <section style={page} aria-label="ICare cost estimator expanded">
            <div className="icare-est-row" style={row}>
                {/* LEFT */}
                <div style={infoGrid}>
                    <div style={infoCard}>
                        <div style={infoHead}>Live-in care: typical weekly range (UK)</div>

                        <p style={infoP}>
                            Live-in care is usually priced as a <strong>weekly rate</strong>.{" "}
                            A common UK guide range is <strong>£950–£1,400/week</strong>, depending on needs and area.
                        </p>

                        <div style={pills}>
                            <div style={pillRow}>
                                <span style={{ fontWeight: 400 }}>Everyday support</span>
                                <span>~£950–£1,100</span>
                            </div>
                            <div style={pillRow}>
                                <span style={{ fontWeight: 400 }}>Higher needs</span>
                                <span>~£1,100–£1,350</span>
                            </div>
                            <div style={pillRow}>
                                <span style={{ fontWeight: 400 }}>Extra night support</span>
                                <span>~£1,250–£1,400</span>
                            </div>
                            <div style={pillRow}>
                                <span style={{ fontWeight: 400 }}>Couples (one carer)</span>
                                <span>~£1,350–£1,600</span>
                            </div>
                        </div>
                    </div>

                    <div style={infoCard}>
                        <div style={infoHead}>What affects cost most</div>

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
                    <details className="icare-funding-details" style={infoCard}>
                        <summary className="icare-funding-summary">
                            <span style={subHead}>Funding options (UK) — general guidance</span>

                            <span className="icare-chevronBtn" aria-hidden="true" style={chevronBtn}>
                                <span className="icare-chevronArrow" />
                            </span>
                        </summary>

                        <div style={{ marginTop: 14 }}>
                            <p style={infoP}>
                                Depending on your circumstances, you may be able to access support through the routes below.
                            </p>

                            <div
                                style={{
                                    height: 1,
                                    background: "rgba(15, 23, 42, 0.10)",
                                    margin: "14px 0",
                                }}
                            />

                            <ul style={bullets}>
                                <li>Local authority assessment and personal budget (if eligible)</li>
                                <li>NHS Continuing Healthcare (for complex health needs; sometimes fully funded)</li>
                                <li>Direct payments / personal budgets (where available)</li>
                                <li>Benefits and allowances that may support costs (eligibility varies)</li>
                            </ul>

                            <p style={{ ...infoP, marginTop: 14, opacity: 0.88 }}>
                                We can’t assess eligibility or provide financial advice. Funding information is general guidance only.
                                Eligibility and availability depend on individual circumstances and local authority decisions.
                            </p>
                        </div>
                    </details>

                    <div style={infoCard}>
                        <div style={infoHead}>Note</div>

                        <p style={infoP}>
                            Estimates are based on your selected rate and weekly hours.
                            Final pricing depends on care needs and the caregiver’s rate.
                        </p>

                        <p style={{ ...infoP, marginTop: 10, opacity: 0.78 }}>
                            Ranges are indicative and based on publicly available UK care cost guides and industry summaries.
                            Figures vary by region and needs.
                        </p>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="icare-est-cards" style={cardsRow}>
                    {/* INPUTS */}
                    <div style={card}>
                        <div style={infoHead}>Your inputs</div>

                        <div style={{ display: "grid", gap: 12, marginTop: 10 }}>
                            {/* Currency row — EXACT layout you asked */}
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr auto",
                                    alignItems: "center",
                                    gap: 12,
                                }}
                            >
                                <span style={label}>Currency</span>

                                <div className="icare-curr" aria-label="Currency selector" style={currWrap}>
                                    <button
                                        type="button"
                                        className={`icare-curr-btn ${currency === "GBP" ? "is-active" : ""}`}
                                        style={currBtn(currency === "GBP")}
                                        onClick={() => setCurrency("GBP")}
                                    >
                                        GBP £
                                    </button>
                                    <button
                                        type="button"
                                        className={`icare-curr-btn ${currency === "EUR" ? "is-active" : ""}`}
                                        style={currBtn(currency === "EUR")}
                                        onClick={() => setCurrency("EUR")}
                                    >
                                        EUR €
                                    </button>
                                </div>
                            </div>

                            {/* Hourly rate — EXACT vibe you pasted */}
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

                                    <input
                                        className="icare-est-input"
                                        min={range.min}
                                        max={range.max}
                                        step={range.step}
                                        aria-label="Hourly rate"
                                        type="number"
                                        value={hourly}
                                        onChange={(e) => setHourly(Number(e.target.value))}
                                        style={fieldMini}
                                    />
                                </div>

                                <input
                                    min={range.min}
                                    max={range.max}
                                    step={range.step}
                                    type="range"
                                    value={hourly}
                                    onChange={(e) => setHourly(Number(e.target.value))}
                                    style={{
                                        width: "100%",
                                        accentColor: BRAND,
                                        cursor: "pointer",
                                    }}
                                />

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginTop: 2,
                                        color: "rgba(15, 23, 42, 0.62)",
                                        fontWeight: 450,
                                        fontSize: "0.94rem",
                                    }}
                                >
                                    <span>{range.min}</span>
                                    <span>{range.max}</span>
                                </div>

                                <div style={helper}>
                                    Tip: choose a rate that’s fair and sustainable for the carer.
                                </div>
                            </div>

                            {/* Hours per week */}
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
                                        min={1}
                                        max={168}
                                        onChange={(e) => setHoursWeek(Number(e.target.value))}
                                        style={fieldMini}
                                        aria-label="Hours per week"
                                    />
                                </div>

                                <div style={{ ...helper, marginTop: 1 }}>
                                    A helpful starting point is 20–40 hours/week.
                                </div>
                            </div>

                            {/* Agency markup */}
                            <div style={{ display: "grid", gap: 8 }}>
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr auto",
                                        alignItems: "center",
                                        gap: 12,
                                    }}
                                >
                                    <span style={label}>Agency markup</span>

                                    <select
                                        className="icare-est-input"
                                        value={agencyMarkupPct}
                                        onChange={(e) => setAgencyMarkupPct(Number(e.target.value))}
                                        style={selectLike}
                                        aria-label="Agency markup percent"
                                    >
                                        <option value={25}>25%</option>
                                        <option value={30}>30%</option>
                                        <option value={35}>35%</option>
                                        <option value={40}>40%</option>
                                    </select>
                                </div>

                                <div style={{ ...helper, marginTop: 2 }}>
                                    Used for an illustrative “typical agency total”.
                                </div>
                            </div>

                            {/* ICare fee (optional, but matches your 2x2 reference) */}
                            <div style={{ display: "grid", gap: 8 }}>
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr auto",
                                        alignItems: "center",
                                        gap: 12,
                                    }}
                                >
                                    <span style={label}>ICare service fee</span>

                                    <select
                                        className="icare-est-input"
                                        value={icareFeePct}
                                        onChange={(e) => setIcareFeePct(Number(e.target.value))}
                                        style={selectLike}
                                        aria-label="ICare service fee percent"
                                    >
                                        <option value={5}>5%</option>
                                        <option value={10}>10%</option>
                                        <option value={12}>12%</option>
                                        <option value={15}>15%</option>
                                    </select>
                                </div>

                                <div style={{ ...helper, marginTop: 2 }}>
                                    Used only to show “Estimated with ICare” (illustrative).
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: "auto" }} />
                    </div>

                    {/* RESULTS */}
                    <div style={card}>
                        <div style={infoHead}>Monthly estimate</div>

                        <div style={resultGrid}>
                            <div style={resultBox(false)}>
                                <div style={resultK}>Care cost (no fees)</div>
                                <div style={resultV(false)}>{nf.format(baseCost)}</div>
                            </div>

                            <div style={resultBox(false)}>
                                <div style={resultK}>
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
                                <div style={resultV(false)}>{nf.format(agencyTotal)}</div>
                            </div>

                            <div style={resultBox(false)}>
                                <div style={resultK}>
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
                                <div style={resultV(false)}>{nf.format(icareTotal)}</div>
                            </div>

                            <div style={resultBox(true)}>
                                <div style={resultK}>Estimated savings</div>
                                <div style={resultV(true)}>{nf.format(youSave)}</div>
                            </div>
                        </div>

                        <div style={bar}>
                            <div style={barFill} />
                        </div>

                        <div style={{ ...helper, marginTop: 12 }}>
                            You may save around{" "}
                            <span style={{ color: BRAND, fontWeight: 650 }}>
                                {Math.round(savePct)}%
                            </span>{" "}
                            compared with a typical agency.
                        </div>

                        <div style={disclaimer}>
                            This calculator provides indicative estimates only. ICare is a matching platform and does not provide care services, set rates, or employ caregivers.
                            Final rates and arrangements are agreed directly between families and caregivers. Agency figures are illustrative and vary by provider, region and care needs.
                        </div>

                        <div style={{ marginTop: "auto" }} />
                    </div>
                </div>
            </div>

            {/* minimal CSS: tooltip bubble + details summary + chevron arrow */}
            <style>{`
        /* Details summary reset */
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

        /* Chevron arrow (max 2px) */
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

        /* Tooltip bubble (same as your earlier pattern) */
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
        .icare-tip:hover .icare-tip-bubble,
        .icare-tip:focus-within .icare-tip-bubble{
          opacity: 1;
          pointer-events: auto;
          transform: translateX(-50%) translateY(-2px);
        }

        /* Responsive */
        @media (max-width: 980px){
          .icare-est-row{ grid-template-columns: 1fr !important; }
        }
        @media (max-width: 860px){
          .icare-est-cards{ grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    );
}
