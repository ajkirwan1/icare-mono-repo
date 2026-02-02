import React from "react";

export default function WhoCanJoin() {
    const [openIndex, setOpenIndex] = React.useState(0);

    const separator = {
        height: "1px",
        background: "rgba(15,23,42,0.12)",
        margin: "1.5rem 0",
        width: "100%",
    };

    const h2Style = {
        margin: 0,
        fontWeight: 500,
        fontSize: "2.6rem",
        color: "#0F172A",
        lineHeight: 1.15,
        letterSpacing: "-0.4px",
    };

    const pStyle = {
        marginTop: ".5rem",
        fontSize: "1.1rem",
        lineHeight: 1.5,
        color: "#0f172a",
    };

    function AccordionHeader({ title, isOpen, onClick }) {
        return (
            <button
                type="button"
                onClick={onClick}
                aria-expanded={isOpen}
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    textAlign: "left",
                    color: "#0F172A",
                }}
            >
                <h3
                    style={{
                        margin: 0,
                        fontSize: "1.3rem",
                        fontWeight: 500,
                        color: "#0F172A",
                        paddingRight: "1rem",
                        lineHeight: 1.25,
                    }}
                >
                    {title}
                </h3>

                {/* plus turns into x when open */}
                <span
                    aria-hidden="true"
                    style={{
                        fontSize: "1.8rem",
                        fontWeight: 300,
                        lineHeight: 1,
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                        color: "rgba(15,23,42,1)",
                        flex: "0 0 auto",
                    }}
                >
                    +
                </span>
            </button>
        );
    }

    return (
        <section
            aria-label="How ICare supports caregivers"
            style={{
                width: "100vw",
                marginLeft: "calc(50% - 50vw)",
                marginRight: "calc(50% - 50vw)",
                background: "#f2eee6",
                padding: "4rem 0",
                fontFamily:
                    "Inter, system-ui, -apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
            }}
        >
            <div style={{ width: "min(1200px,92vw)", margin: "0 auto" }}>
                <h2 style={h2Style}>How ICare supports caregivers</h2>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "2.6rem",
                        alignItems: "stretch",
                        marginTop: "2rem",
                    }}
                >
                    {/* LEFT — TITLE + IMAGE */}
                    <div>
                        <img
                            src="images/web/icare-for-caregivers/blackcarer.jpg"
                            alt="Caregiver providing home care support"
                            style={{
                                width: "100%",
                                height: "520px",
                                objectFit: "cover",
                                borderRadius: "22px",
                                boxShadow: "0 18px 48px rgba(0,0,0,0.16)",
                                display: "block",
                            }}
                        />
                    </div>

                    {/* RIGHT — ACCORDION */}
                    <div
                        style={{
                            background: "rgba(255, 255, 255, 0.7)",
                            padding: "2rem 2.5rem",
                            borderRadius: "22px",
                        }}
                    >
                        {/* SECTION 1 (open by default) */}
                        <div>
                            <AccordionHeader
                                title="Find care work without agency control"
                                isOpen={openIndex === 0}
                                onClick={() => setOpenIndex(openIndex === 0 ? null : 0)}
                            />

                            {openIndex === 0 && (
                                <>
                                    <p style={pStyle}>
                                        ICare is not an agency. We don’t assign shifts, manage rotas or
                                        tell you where to work.
                                    </p>
                                    <p style={pStyle}>
                                        You decide your availability, who you work with, and whether an
                                        arrangement feels right.
                                    </p>
                                </>
                            )}
                        </div>

                        <div style={separator} />

                        {/* SECTION 2 */}
                        <div>
                            <AccordionHeader
                                title="Choose the work that fits you"
                                isOpen={openIndex === 1}
                                onClick={() => setOpenIndex(openIndex === 1 ? null : 1)}
                            />

                            {openIndex === 1 && (
                                <>
                                    <p style={pStyle}>
                                        This is your practice. You choose the type of companionship you
                                        want to provide and the pace you work at — without pressure to
                                        rush or take unsuitable roles.
                                    </p>
                                </>
                            )}
                        </div>

                        <div style={separator} />

                        {/* SECTION 3 */}
                        <div>
                            <AccordionHeader
                                title="Work directly with families"
                                isOpen={openIndex === 2}
                                onClick={() => setOpenIndex(openIndex === 2 ? null : 2)}
                            />

                            {openIndex === 2 && (
                                <>
                                    <p style={pStyle}>
                                        You speak directly with families and build real relationships.
                                    </p>
                                    <p style={pStyle}>
                                        No intermediaries. No 15-minute visits. Care is about people,
                                        not ticking boxes.
                                    </p>
                                </>
                            )}
                        </div>

                        <div style={separator} />

                        {/* SECTION 4 */}
                        <div>
                            <AccordionHeader
                                title="Agree details upfront"
                                isOpen={openIndex === 3}
                                onClick={() => setOpenIndex(openIndex === 3 ? null : 3)}
                            />

                            {openIndex === 3 && (
                                <>
                                    <p style={pStyle}>
                                        Care details, schedules and expectations are discussed openly
                                        from the start, so everyone knows where they stand before work
                                        begins.
                                    </p>
                                </>
                            )}
                        </div>

                        <div style={separator} />

                        {/* SECTION 5 */}
                        <div>
                            <AccordionHeader
                                title="Stay flexible over time"
                                isOpen={openIndex === 4}
                                onClick={() => setOpenIndex(openIndex === 4 ? null : 4)}
                            />

                            {openIndex === 4 && (
                                <>
                                    <p style={pStyle}>
                                        Needs change - and so can arrangements.
                                    </p>
                                    <p style={pStyle}>
                                        ICare is designed to support flexibility without disruption or
                                        unnecessary stress.
                                    </p>
                                </>
                            )}
                        </div>

                        <div style={separator} />

                        {/* SECTION 6 */}
                        <div>
                            <AccordionHeader
                                title="Support for safe, professional care"
                                isOpen={openIndex === 5}
                                onClick={() => setOpenIndex(openIndex === 5 ? null : 5)}
                            />

                            {openIndex === 5 && (
                                <>
                                    <p style={pStyle}>
                                        Caregiving is skilled, meaningful work.
                                    </p>
                                    <p style={pStyle}>
                                        ICare is built on respect for caregivers as professionals, with
                                        clear standards and fair expectations.
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
