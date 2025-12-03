const BRAND = "#1FAB1F";

export default function PrivacyAccordion() {
    const sections = [
        {
            id: "rights",
            q: "6. Your rights (GDPR/RODO)",
            a: (
                <>
                    Access, rectification, deletion (‘right to be forgotten’),
                    restriction/objection, portability.
                    Use the DSAR form below or contact our DPO.
                </>
            ),
        },
        {
            id: "cookies",
            q: "7. Cookies & tracking",
            a: (
                <>
                    We use essential cookies for session, and optional analytics (opt-in).
                    Manage preferences below in Cookie Settings.
                </>
            ),
        },
        {
            id: "security",
            q: "8. Security measures",
            a: (
                <>
                    Encryption in transit/at rest (provider-level), role-based access,
                    least-privilege security, regular reviews and incident response playbook.
                </>
            ),
        },
        {
            id: "transfers",
            q: "9. International transfers",
            a: (
                <>
                    If data leaves the EU/UK, we use appropriate safeguards (e.g., SCCs)
                    with our processors.
                </>
            ),
        },
    ];

    return (
        <section
            style={{
                margin: "0 auto 3.5rem",
                maxWidth: 1100,
                padding: "0 clamp(16px,4vw,32px)",
                display: "grid",
                gap: "14px",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            {sections.map((sec) => (
                <details
                    key={sec.id}
                    id={sec.id}
                    style={{
                        background: "#FFFFFF",
                        border: "1px solid rgba(15,23,42,.10)",
                        borderRadius: 14,
                        padding: "12px 14px",
                    }}
                >
                    <summary
                        style={{
                            listStyle: "none",
                            cursor: "pointer",
                            fontWeight: 900,
                            color: "#0F172A",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 12,
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.color = BRAND)}
                        onMouseOut={(e) => (e.currentTarget.style.color = "#0F172A")}
                    >
                        {sec.q}
                        <span aria-hidden="true" style={{ color: BRAND, fontWeight: 900 }}>
                            +
                        </span>
                    </summary>

                    <div
                        style={{
                            marginTop: 8,
                            color: "#334155",
                            lineHeight: 1.65,
                        }}
                    >
                        {sec.a}
                    </div>
                </details>
            ))}
        </section>
    );
}
