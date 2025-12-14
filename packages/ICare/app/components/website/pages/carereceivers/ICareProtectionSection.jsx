import React from "react";

export default function ICareProtectionSection() {
    const accent = {
        width: "8px",
        background: "rgba(18, 96, 18, 0.784)",
        borderRadius: 6,
        flexShrink: 0,
    };

    const itemStyle = {
        display: "flex",
        gap: "1rem",
    };

    const titleStyle = {
        fontSize: "1.15rem",
        fontWeight: 700,
        color: "#0F172A",
        marginBottom: ".35rem",
    };

    const descStyle = {
        color: "#475569",
        lineHeight: 1.55,
        fontSize: "1rem",
    };

    return (
        <section
            aria-label="ICare safety for families"
            style={{
                width: "100vw",
                marginLeft: "calc(50% - 50vw)",
                background: "#e8e7d7",
                padding: "clamp(4.2rem, 5.6vw, 5.4rem) 0", // ⬅️ było ~6.8rem
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <div
                style={{
                    width: "min(92vw,1100px)",
                    margin: "0 auto",
                }}
            >
                {/* HEADER */}
                <h2
                    style={{
                        fontSize: "clamp(1.7rem, 2.7vw, 2.15rem)", // ⬅️ lekko mniejsze
                        fontWeight: 800,
                        color: "#0F172A",
                        marginBottom: "0.55rem",
                    }}
                >
                    Peace of mind for families
                </h2>

                <p
                    style={{
                        fontSize: "1.08rem", // ⬅️ było 1.18
                        color: "#475569",
                        marginBottom: "2.6rem", // ⬅️ było 3.4rem
                        maxWidth: "60ch",
                        lineHeight: 1.6,
                    }}
                >
                    Choosing care for a loved one is a serious decision.
                    ICare is built to help families feel confident, informed
                    and supported at every stage.
                </p>

                {/* GRID */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                        gap: "2rem", // ⬅️ było 2.4rem
                    }}
                >
                    <div style={itemStyle}>
                        <div style={accent} />
                        <div>
                            <h4 style={titleStyle}>Verified caregivers</h4>
                            <p style={descStyle}>
                                Caregivers share verified identity, experience and,
                                where available, DBS checks — so families can make
                                informed choices.
                            </p>
                        </div>
                    </div>

                    <div style={itemStyle}>
                        <div style={accent} />
                        <div>
                            <h4 style={titleStyle}>Direct, secure communication</h4>
                            <p style={descStyle}>
                                Families communicate directly with caregivers
                                through ICare’s secure messaging — no intermediaries,
                                no information gaps.
                            </p>
                        </div>
                    </div>

                    <div style={itemStyle}>
                        <div style={accent} />
                        <div>
                            <h4 style={titleStyle}>Safe, transparent payments</h4>
                            <p style={descStyle}>
                                Payments are handled securely through ICare,
                                with clear records and no cash handling.
                            </p>
                        </div>
                    </div>

                    <div style={itemStyle}>
                        <div style={accent} />
                        <div>
                            <h4 style={titleStyle}>Clear care agreements</h4>
                            <p style={descStyle}>
                                Care arrangements, schedules and expectations
                                are documented clearly, so everyone knows
                                what has been agreed.
                            </p>
                        </div>
                    </div>

                    <div style={itemStyle}>
                        <div style={accent} />
                        <div>
                            <h4 style={titleStyle}>Flexibility as needs change</h4>
                            <p style={descStyle}>
                                If care needs evolve, families can adjust arrangements
                                or explore alternatives without long-term lock-ins.
                            </p>
                        </div>
                    </div>

                    <div style={itemStyle}>
                        <div style={accent} />
                        <div>
                            <h4 style={titleStyle}>Family stays in control</h4>
                            <p style={descStyle}>
                                Decisions remain with the family and the caregiver —
                                ICare supports the relationship, it does not control it.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}
