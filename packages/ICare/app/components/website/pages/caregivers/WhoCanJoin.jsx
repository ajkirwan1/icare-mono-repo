export default function WhoCanJoin() {
    return (
        <section
            aria-label="Caregiver benefits"
            style={{
                width: "100vw",
                marginLeft: "calc(50% - 50vw)",
                marginRight: "calc(50% - 50vw)",
                background: "#fff9ef",
                padding: "6rem 0",
                fontFamily:
                    "Inter, system-ui, -apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
            }}
        >
            <div
                style={{
                    width: "min(1200px,92vw)",
                    margin: "0 auto",
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "2.6rem",
                        alignItems: "center",
                    }}
                >
                    {/* LEFT PHOTO — CAREER FOCUSED */}
                    <img
                        src="images/web/icare-for-caregivers/blackcarer.jpg"
                        alt="Black caregiver providing home care support"
                        style={{
                            width: "100%",
                            height: "380px",
                            objectFit: "cover",
                            borderRadius: "22px",
                            boxShadow: "0 18px 48px rgba(0,0,0,0.16)",
                        }}
                    />

                    {/* RIGHT TEXT */}
                    <div>
                        <h2
                            style={{
                                margin: 0,
                                fontWeight: 850,
                                fontSize: "clamp(1.7rem,2.8vw,2.2rem)",
                                color: "#0F172A",
                                lineHeight: 1.1,
                                letterSpacing: "-0.4px",
                            }}
                        >
                            Built for caregivers, not agencies
                        </h2>

                        <div style={{ height: "1.4rem" }} />

                        {/* === SECTION 1 === */}
                        <div style={{ marginBottom: "1.6rem" }}>
                            <h3
                                style={{
                                    margin: 0,
                                    fontSize: "1.1rem",
                                    fontWeight: 800,
                                    color: "#0F172A",
                                }}
                            >
                                Earn more with every hour
                            </h3>
                            <p
                                style={{
                                    marginTop: ".4rem",
                                    fontSize: ".95rem",
                                    color: "#475569",
                                    lineHeight: 1.45,
                                }}
                            >
                                Keep <strong style={{ color: "#1FAB1F" }}>90%</strong> of what families pay —
                                usually <strong>£4–£6/h more</strong> than agency work.
                            </p>
                        </div>

                        {/* === SECTION 2 === */}
                        <div style={{ marginBottom: "1.6rem" }}>
                            <h3
                                style={{
                                    margin: 0,
                                    fontSize: "1.1rem",
                                    fontWeight: 800,
                                    color: "#0F172A",
                                }}
                            >
                                Low start-up cost
                            </h3>
                            <p
                                style={{
                                    marginTop: ".4rem",
                                    fontSize: ".95rem",
                                    lineHeight: 1.45,
                                    color: "#475569",
                                }}
                            >
                                No monthly fees.
                                DBS: <strong>£0–£60</strong>.
                                Insurance: <strong>£5–£15/mo</strong>.
                                Self-employment: <strong>free</strong>.
                            </p>
                        </div>

                        {/* === SECTION 3 === */}
                        <div style={{ marginBottom: "1.6rem" }}>
                            <h3
                                style={{
                                    margin: 0,
                                    fontSize: "1.1rem",
                                    fontWeight: 800,
                                    color: "#0F172A",
                                }}
                            >
                                Choose your clients
                            </h3>
                            <p
                                style={{
                                    marginTop: ".4rem",
                                    fontSize: ".95rem",
                                    lineHeight: 1.45,
                                    color: "#475569",
                                }}
                            >
                                Pick the families you support.
                                Set your own schedule.
                                Work on your terms.
                            </p>
                        </div>

                        {/* === SECTION 4 === */}
                        <div>
                            <h3
                                style={{
                                    margin: 0,
                                    fontSize: "1.1rem",
                                    fontWeight: 800,
                                    color: "#0F172A",
                                }}
                            >
                                Simple requirements
                            </h3>
                            <p
                                style={{
                                    marginTop: ".4rem",
                                    fontSize: ".95rem",
                                    lineHeight: 1.45,
                                    color: "#475569",
                                }}
                            >
                                Right to Work, ID, optional DBS,
                                insurance, UTR — and you're ready.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

