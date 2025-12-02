import React from "react";

export default function SavingsEstimatorCurrency() {
    const BRAND = "#1FAB1F";

    const [hourly, setHourly] = React.useState(20);
    const [hoursWeek, setHoursWeek] = React.useState(40);
    const [agencyMargin, setAgencyMargin] = React.useState(35);
    const [currency, setCurrency] = React.useState("PLN");

    const nf = React.useMemo(
        () =>
            new Intl.NumberFormat(undefined, {
                style: "currency",
                currency,
            }),
        [currency]
    );

    const {
        monthlyBase,
        monthlyAgency,
        monthlyICare,
        monthlySave,
        savePct,
    } = React.useMemo(() => {
        const weeks = 4.33;
        const base = hourly * hoursWeek * weeks;
        const agency = base * (1 + agencyMargin / 100);
        const icare = base * 1.1; // 10% ICare fee
        const save = Math.max(0, agency - icare);
        const pct = agency > 0 ? (save / agency) * 100 : 0;

        return {
            monthlyBase: base,
            monthlyAgency: agency,
            monthlyICare: icare,
            monthlySave: save,
            savePct: pct,
        };
    }, [hourly, hoursWeek, agencyMargin]);

    return (
        <section
            id="estimator"
            aria-label="Cost & Savings Estimator"
            style={{
                margin: "6rem auto",
                maxWidth: 1180,
                padding: "0 clamp(20px, 4vw, 40px)",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                display: "grid",
                gridTemplateColumns: "1fr 1.4fr",
                gap: "clamp(50px, 6vw, 80px)",
                alignItems: "start",
            }}
        >
            {/* LEFT SIDE */}
            <div style={{ animation: "fadeEstimator 0.8s ease both" }}>
                <h2
                    style={{
                        margin: 0,
                        fontWeight: 800,
                        letterSpacing: "-0.3px",
                        color: "#0F172A",
                        fontSize: "clamp(2.2rem, 3vw, 2.8rem)",
                        lineHeight: 1.1,
                    }}
                >
                    Cost & Savings Estimator
                </h2>

                <p
                    style={{
                        color: "#475569",
                        margin: "1.6rem 0 0",
                        fontSize: "1.14rem",
                        lineHeight: 1.68,
                        fontWeight: 400,
                        maxWidth: "58ch",
                    }}
                >
                    Estimate how much you and your caregiver can save each month when working
                    directly — without agency margins or hidden fees.
                </p>
            </div>

            {/* RIGHT SIDE */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
                    gap: "clamp(26px, 3vw, 36px)",
                    alignItems: "stretch",
                }}
            >
                {/* FORM CARD */}
                <form
                    onSubmit={(e) => e.preventDefault()}
                    style={{
                        border: "1px solid rgba(15,23,42,0.06)",
                        borderRadius: 24,
                        padding: "clamp(26px, 2.4vw, 32px)",
                        background: "#FFFFFF",
                        display: "grid",
                        gap: 18,
                        animation: "fadeCard 0.8s ease 0.15s both",
                    }}
                >
                    {/* Currency */}
                    <label style={{ display: "grid", gap: 6 }}>
                        <span
                            style={{
                                fontWeight: 700,
                                color: "#1f2a37",
                                fontSize: ".9rem",
                                letterSpacing: "-0.2px",
                            }}
                        >
                            Currency
                        </span>
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value.split(" ")[0])}
                            style={{
                                border: "1px solid rgba(15,23,42,0.12)",
                                borderRadius: 14,
                                padding: "12px 14px",
                                fontSize: "1rem",
                                background: "#fff",
                            }}
                        >
                            <option>PLN — zł</option>
                            <option>EUR — €</option>
                            <option>GBP — £</option>
                            <option>USD — $</option>
                        </select>
                    </label>

                    {/* Hourly */}
                    <label style={{ display: "grid", gap: 6 }}>
                        <span style={{ fontWeight: 700, color: "#1f2a37", fontSize: ".9rem" }}>
                            Hourly rate
                        </span>
                        <input
                            type="number"
                            value={hourly}
                            onChange={(e) => setHourly(Number(e.target.value))}
                            style={{
                                border: "1px solid rgba(15,23,42,0.12)",
                                borderRadius: 14,
                                padding: "12px 14px",
                                fontSize: "1rem",
                            }}
                        />
                    </label>

                    {/* Hours */}
                    <label style={{ display: "grid", gap: 6 }}>
                        <span style={{ fontWeight: 700, color: "#1f2a37", fontSize: ".9rem" }}>
                            Hours per week
                        </span>
                        <input
                            type="number"
                            value={hoursWeek}
                            onChange={(e) => setHoursWeek(Number(e.target.value))}
                            style={{
                                border: "1px solid rgba(15,23,42,0.12)",
                                borderRadius: 14,
                                padding: "12px 14px",
                                fontSize: "1rem",
                            }}
                        />
                    </label>

                    {/* Margin */}
                    <label style={{ display: "grid", gap: 6 }}>
                        <span style={{ fontWeight: 700, color: "#1f2a37", fontSize: ".9rem" }}>
                            Agency margin (%)
                        </span>
                        <input
                            type="number"
                            value={agencyMargin}
                            onChange={(e) => setAgencyMargin(Number(e.target.value))}
                            style={{
                                border: "1px solid rgba(15,23,42,0.12)",
                                borderRadius: 14,
                                padding: "12px 14px",
                                fontSize: "1rem",
                            }}
                        />
                    </label>

                    {/* ICare fee info */}
                    <div
                        style={{
                            marginTop: 4,
                            padding: "10px 14px",
                            borderRadius: 14,
                            background: "rgba(31,171,31,0.06)",
                            border: "1px solid rgba(31,171,31,0.18)",
                            fontWeight: 700,
                            fontSize: ".92rem",
                            color: "#14532D",
                        }}
                    >
                        ICare fee:{" "}
                        <span style={{ color: BRAND, fontWeight: 800 }}>flat 10%</span> on contract
                    </div>
                </form>

                {/* RESULTS CARD */}
                <div
                    style={{
                        border: "1px solid rgba(15,23,42,0.06)",
                        borderRadius: 24,
                        padding: "clamp(26px, 2.4vw, 32px)",
                        background: "#FFFFFF",
                        display: "grid",
                        gap: 18,
                        animation: "fadeCard 0.8s ease 0.25s both",
                    }}
                >
                    <h3
                        style={{
                            margin: 0,
                            fontWeight: 800,
                            color: "#0F172A",
                            fontSize: "clamp(1.2rem, 1.8vw, 1.35rem)",
                        }}
                    >
                        Monthly estimate
                    </h3>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 14,
                        }}
                    >
                        {[
                            { k: "Base cost", v: monthlyBase },
                            { k: "Agency total", v: monthlyAgency },
                            { k: "ICare total", v: monthlyICare },
                            { k: "You save with ICare", v: monthlySave, highlight: true },
                        ].map((row) => (
                            <div
                                key={row.k}
                                style={{
                                    border: "1px solid rgba(15,23,42,0.08)",
                                    borderRadius: 14,
                                    padding: "14px",
                                    background: row.highlight
                                        ? "rgba(31,171,31,0.06)"
                                        : "#FFFFFF",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: ".85rem",
                                        color: "#475569",
                                        marginBottom: 4,
                                        fontWeight: 700,
                                    }}
                                >
                                    {row.k}
                                </div>

                                <div
                                    style={{
                                        fontWeight: 900,
                                        fontSize: "1.15rem",
                                        color: row.highlight ? BRAND : "#0F172A",
                                    }}
                                >
                                    {nf.format(row.v)} {currency}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* SAVINGS BAR */}
                    <div style={{ marginTop: 10 }}>
                        <div
                            style={{
                                height: 9,
                                width: "100%",
                                background: "#F1F5F9",
                                borderRadius: 999,
                                overflow: "hidden",
                            }}
                        >
                            <div
                                style={{
                                    height: "100%",
                                    width: `${Math.max(
                                        0,
                                        Math.min(100, savePct)
                                    ).toFixed(0)}%`,
                                    background: BRAND,
                                    transition: "width 0.6s ease",
                                }}
                            />
                        </div>

                        <div
                            style={{
                                marginTop: 6,
                                fontSize: ".88rem",
                                color: "#334155",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <span>Estimated savings vs agency</span>
                            <strong style={{ color: BRAND }}>
                                {savePct.toFixed(0)}%
                            </strong>
                        </div>
                    </div>
                </div>
            </div>

            {/* ANIMATIONS */}
            <style>{`
        @keyframes fadeEstimator {
            from { opacity: 0; transform: translateY(18px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeCard {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `}</style>
        </section>

    );
}
