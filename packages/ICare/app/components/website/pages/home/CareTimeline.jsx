export default function CareTimeline() {

    return (
        <section
            aria-label="Care timeline"
            style={{
                width: "100%",
                background: "#FFFFFF",
                padding: "0 0 clamp(6rem, 9vw, 8rem)",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            {/* ===== FULL-WIDTH HEADER ===== */}
            <div
                style={{
                    width: "100vw",
                    marginLeft: "calc(50% - 50vw)",
                    background: "#bfc09c",
                    padding: "clamp(4.5rem, 7vw, 6.5rem) 0",
                    marginBottom: "5.4rem",
                }}
            >
                <header
                    style={{
                        width: "min(1180px, 92vw)",
                        margin: "0 auto",
                        textAlign: "center",
                    }}
                >
                    <h2
                        style={{
                            margin: 0,
                            fontWeight: 800,
                            fontSize: "clamp(2.6rem,3.4vw,2.8rem)",
                            color: "#fff",
                            letterSpacing: "-0.5px",
                            lineHeight: 1.12,
                        }}
                    >
                        A guided — human way to find trusted care
                    </h2>

                    <p
                        style={{
                            margin: "1.6rem auto 0",
                            maxWidth: "64ch",
                            color: "#fff",
                            fontSize: "clamp(1.3rem,1.6vw,1.45rem)",
                            lineHeight: 1.7,
                            fontWeight: 450,
                            opacity: 0.95,
                        }}
                    >
                        Clear, step-by-step support to help you find the caregiver who truly fits your family.
                    </p>
                </header>
            </div>

            {/* ===== CONTENT ===== */}
            <div style={{ width: "min(1180px, 92vw)", margin: "0 auto" }}>
                {/* ================= FULL-WIDTH TYPES OF CARE ================= */}
                <section
                    aria-label="Types of care (full width)"
                    style={{
                        width: "100vw",
                        marginLeft: "calc(50% - 50vw)", // full-bleed
                        background: "#f7e7d9",
                        marginTop: "-5.4rem", // tło „dochodzi” do sekcji wyżej
                        padding: "8.64rem 0 5.76rem",
                    }}
                >
                    {/* ===== CONTENT WRAPPER (BEZ ZMIAN) ===== */}
                    <div
                        style={{
                            width: "min(980px, 92vw)",
                            margin: "0 auto",
                        }}
                    >
                        <h3
                            style={{
                                fontSize: "clamp(1.55rem, 2.2vw, 2.2rem)",
                                fontWeight: 800,
                                margin: 0,
                                color: "#0F172A",
                                letterSpacing: "-0.25px",
                                textAlign: "center",
                            }}
                        >
                            Types of care we support
                        </h3>

                        <p
                            style={{
                                margin: ".8rem auto 0",
                                color: "#475569",
                                fontSize: "1.05rem",
                                maxWidth: "56ch",
                                lineHeight: 1.65,
                                textAlign: "center",
                            }}
                        >
                            Choose the support your family needs. ICare connects you with trusted,
                            independent caregivers for flexible home care.
                        </p>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                                gap: "1.4rem",
                                marginTop: "2.4rem",
                            }}
                        >
                            {[
                                {
                                    label: "Elderly care",
                                    desc: "Daily support & companionship",
                                    icon: (
                                        <svg
                                            width="28"
                                            height="28"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M12 21s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9z" />
                                        </svg>
                                    ),
                                },
                                {
                                    label: "Household help",
                                    desc: "Cleaning, cooking & chores",
                                    icon: (
                                        <svg
                                            width="28"
                                            height="28"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M3 10.5 12 3l9 7.5" />
                                            <path d="M5 10v10h14V10" />
                                            <path d="M10 20v-6h4v6" />
                                        </svg>
                                    ),
                                },
                                {
                                    label: "Mobility support",
                                    desc: "Walking & transfers",
                                    icon: (
                                        <svg
                                            width="28"
                                            height="28"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M5 12h6" />
                                            <path d="M9 7l-4 5 4 5" />
                                            <path d="M13 12h6" />
                                            <path d="M15 7l4 5-4 5" />
                                        </svg>
                                    ),
                                },
                                {
                                    label: "Medication support",
                                    desc: "Reminders & stability",
                                    icon: (
                                        <svg
                                            width="28"
                                            height="28"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M10 8l6 6" />
                                            <path d="M8.5 15.5a4 4 0 0 1 0-5.7l1.3-1.3a4 4 0 0 1 5.7 0l.9.9a4 4 0 0 1 0 5.7l-1.3 1.3a4 4 0 0 1-5.7 0z" />
                                        </svg>
                                    ),
                                },
                                {
                                    label: "Night care",
                                    desc: "Overnight presence & safety",
                                    icon: (
                                        <svg
                                            width="28"
                                            height="28"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M21 13a7.5 7.5 0 0 1-10-10 8.5 8.5 0 1 0 10 10z" />
                                        </svg>
                                    ),
                                },
                                {
                                    label: "Hourly care",
                                    desc: "Short visits, flexible",
                                    icon: (
                                        <svg
                                            width="28"
                                            height="28"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M12 7v5l3 2" />
                                            <circle cx="12" cy="12" r="8.5" />
                                        </svg>
                                    ),
                                },
                                {
                                    label: "Live-in care",
                                    desc: "Full-time home assistance",
                                    icon: (
                                        <svg
                                            width="28"
                                            height="28"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M4 12V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5" />
                                            <path d="M3 14h18" />
                                            <path d="M5 14v5h14v-5" />
                                            <path d="M8 10h3" />
                                        </svg>
                                    ),
                                },
                                {
                                    label: "Specialist care",
                                    desc: "Dementia & extra needs",
                                    icon: (
                                        <svg
                                            width="28"
                                            height="28"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M9 4a3 3 0 0 0-3 3v2a3 3 0 0 0 2 2.8V15a3 3 0 0 0 3 3" />
                                            <path d="M15 4a3 3 0 0 1 3 3v2a3 3 0 0 1-2 2.8V15a3 3 0 0 1-3 3" />
                                            <path d="M10 8h1" />
                                            <path d="M13 8h1" />
                                            <path d="M11 12h2" />
                                        </svg>
                                    ),
                                },
                            ].map((box) => (
                                <div
                                    key={box.label}
                                    style={{
                                        padding: "1.4rem 1.35rem",
                                        borderRadius: "16px",
                                        background: "rgba(249,245,240,0.6)",
                                        textAlign: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            margin: "0 auto .85rem",
                                            width: "44px",
                                            height: "44px",
                                            borderRadius: "14px",
                                            background: "rgba(255,255,255,0.55)",
                                            color: "#61674d",
                                            boxShadow: "0 10px 22px rgba(0,0,0,0.06)",
                                            border: "1px solid rgba(15,23,42,0.08)",
                                        }}
                                    >
                                        {box.icon}
                                    </div>

                                    <h4
                                        style={{
                                            fontWeight: 700,
                                            margin: "0 0 .45rem 0",
                                            color: "#0F172A",
                                            fontSize: "1.08rem",
                                            lineHeight: 1.35,
                                        }}
                                    >
                                        {box.label}
                                    </h4>

                                    <p
                                        style={{
                                            margin: 0,
                                            color: "#475569",
                                            fontSize: ".9rem",
                                            lineHeight: 1.55,
                                        }}
                                    >
                                        {box.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <style>{`
        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `}</style>
        </section>

    );
}


