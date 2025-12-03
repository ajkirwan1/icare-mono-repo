import React from "react";

const BRAND = "#1FAB1F";

export default function PrivacyRetentionTable() {
    return (
        <section
            id="retention"
            style={{
                margin: "0 auto 3.5rem",
                maxWidth: 1100,
                padding: "0 clamp(16px,4vw,32px)",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <h2
                style={{
                    margin: 0,
                    color: "#1f2a37",
                    fontWeight: 900,
                    fontSize: "clamp(1.1rem,2vw,1.35rem)",
                }}
            >
                5. Storage & retention
            </h2>

            <div
                style={{
                    width: 180,
                    height: 3,
                    background: BRAND,
                    borderRadius: 999,
                    margin: ".6rem 0 1rem",
                }}
            />

            {/* Table container */}
            <div
                style={{
                    overflowX: "auto",
                    border: "1px solid rgba(15,23,42,.10)",
                    borderRadius: 12,
                    background: "#fff",
                    boxShadow: "0 8px 22px rgba(2,8,23,.06)",
                }}
            >
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        minWidth: 640,
                    }}
                >
                    <thead>
                        <tr style={{ background: "rgba(31,171,31,0.06)" }}>
                            <th style={thCell}>Category</th>
                            <th style={thCell}>Purpose</th>
                            <th style={thCell}>Retention</th>
                            <th style={thCell}>Notes</th>
                        </tr>
                    </thead>

                    <tbody>
                        {[
                            [
                                "Account",
                                "Provide services",
                                "While active account",
                                "Deleted within 30 days after closure",
                            ],
                            [
                                "Care-related",
                                "Matching/agreements",
                                "While necessary / contract term",
                                "Minimization applied",
                            ],
                            [
                                "Invoices",
                                "Legal obligations",
                                "5–10 years",
                                "Accounting/tax law",
                            ],
                            [
                                "Support tickets",
                                "Customer support",
                                "24 months",
                                "For quality & disputes",
                            ],
                        ].map((row, i) => (
                            <tr key={i} style={{ borderTop: "1px solid #e5e7eb" }}>
                                {row.map((cell, idx) => (
                                    <td key={idx} style={tdCell}>
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

/* ===== Cell styles (kept inside component scope) ===== */

const thCell = {
    textAlign: "left",
    padding: "12px 14px",
    fontWeight: 900,
    color: "#0F172A",
    fontSize: ".95rem",
};

const tdCell = {
    textAlign: "left",
    padding: "12px 14px",
    color: "#334155",
    fontSize: ".95rem",
    verticalAlign: "top",
};
