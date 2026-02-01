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

                <h2 style={h2Style}>
                    How ICare supports caregivers
                </h2>

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
                                display: "block"
                            }}
                        />
                    </div>

                    {/* RIGHT — ACCORDION */}
                    <div style={{ background: "rgba(255, 255, 255, 0.7)", padding: "2rem 2.5rem", borderRadius: "22px" }}>
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
                                        ICare is not an agency.
                                        We don’t assign shifts, manage rotas or decide who you work with.
                                    </p>
                                    <p style={pStyle}>
                                        Instead, ICare gives you a clear, organised way to connect directly
                                        with families who are looking for care — and to decide together if the
                                        arrangement is right.
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
                                    <p style={pStyle}>As a caregiver on ICare, you decide:</p>
                                    <p style={{ ...pStyle, marginTop: ".35rem" }}>
                                        • when you’re available,
                                        <br />• what type of care you offer (hourly, overnight, live-in),
                                        <br />• and the rate that reflects your experience.
                                    </p>
                                    <p style={pStyle}>
                                        Families contact you based on your profile.
                                        You choose who you respond to and what you accept.
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
                                        All conversations happen privately and directly.
                                        You can ask questions, clarify expectations and understand the
                                        situation before agreeing to anything  without pressure from intermediaries.
                                    </p>
                                    <p style={pStyle}>
                                        This leads to clearer starts and fewer misunderstandings later.
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
                                    <p style={pStyle}>Before care begins, key details are agreed together:</p>
                                    <p style={{ ...pStyle, marginTop: ".35rem" }}>
                                        • hours and schedule,
                                        <br />• responsibilities and boundaries,
                                        <br />• start date and rate.
                                    </p>
                                    <p style={pStyle}>
                                        ICare provides structure and guidance so agreements are clear,
                                        documented and easy to refer back to.
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
                                <p style={pStyle}>
                                    Care needs change and so does your availability.
                                    You can update your profile, adjust your schedule or pause work whenever
                                    needed, without fixed contracts or long-term tie-ins.
                                </p>
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
                                    <p style={pStyle}>ICare includes tools that help you work confidently:</p>
                                    <p style={{ ...pStyle, marginTop: ".35rem" }}>
                                        • clear agreements and expectations,
                                        <br />• secure messaging,
                                        <br />• guidance on boundaries, safeguarding and good practice,
                                        <br />• verification where required (ID, documents, references).
                                    </p>
                                    <p style={pStyle}>
                                        You remain independent with structure where it genuinely helps.
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
