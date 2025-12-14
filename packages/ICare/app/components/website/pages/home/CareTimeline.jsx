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
                {/* TYPES OF CARE */}
                {/* ================= FULL-WIDTH TYPES OF CARE ================= */}
                <section
                    aria-label="Types of care (full width)"
                    style={{
                        width: "100vw",
                        marginLeft: "calc(50% - 50vw)",   // full-bleed
                        background: "#f7e7d9",

                        marginTop: "-5.4rem",             // ⬅️ tło „dochodzi” do sekcji wyżej
                        padding: "8.64rem 0 5.76rem",     // ⬅️ paddingTop = 5.04rem + 3.6rem
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
                            }}
                        >
                            Types of care we support
                        </h3>

                        <p
                            style={{
                                marginTop: ".8rem",
                                color: "#475569",
                                fontSize: "1.05rem",
                                maxWidth: "56ch",
                                lineHeight: 1.65,
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
                                { label: "Elderly care", desc: "Daily support & companionship" },
                                { label: "Household help", desc: "Cleaning, cooking & chores" },
                                { label: "Mobility support", desc: "Walking & transfers" },
                                { label: "Medication support", desc: "Reminders & stability" },
                                { label: "Night care", desc: "Overnight presence & safety" },
                                { label: "Hourly care", desc: "Short visits, flexible" },
                                { label: "Live-in care", desc: "Full-time home assistance" },
                                { label: "Specialist care", desc: "Dementia & extra needs" },
                            ].map((box) => (
                                <div
                                    key={box.label}
                                    style={{
                                        padding: "1.4rem 1.35rem",
                                        borderRadius: "16px",
                                        background: "rgba(249,245,240,0.6)",
                                    }}
                                >
                                    <div style={{ fontSize: "1.7rem", marginBottom: ".65rem" }}>
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


