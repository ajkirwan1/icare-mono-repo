import React from "react";

export default function WhoCanJoin() {
    const [openIndex, setOpenIndex] = React.useState(0);

    const separator = {
        height: "1px",
        background: "rgba(15,23,42,0.12)",
        margin: "1.2rem 0",
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
                className="icare-accHeader"
            >
                <h3 className="icare-accTitle">{title}</h3>
                <span
                    aria-hidden="true"
                    className={`icare-plus ${isOpen ? "is-open" : ""}`}
                />
            </button>
        );
    }

    function AccordionItem({ index, title, children }) {
        const isOpen = openIndex === index;
        const innerRef = React.useRef(null);
        const [h, setH] = React.useState(0);

        // Mierz wysokość contentu zawsze (działa też gdy content się zawija przy resize)
        React.useEffect(() => {
            const el = innerRef.current;
            if (!el) return;

            const ro = new ResizeObserver(() => {
                setH(el.scrollHeight || 0);
            });

            ro.observe(el);
            setH(el.scrollHeight || 0);

            return () => ro.disconnect();
        }, []);

        return (
            <div>
                <AccordionHeader
                    title={title}
                    isOpen={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                />

                <div
                    className={`icare-accContent ${isOpen ? "is-open" : ""}`}
                    style={{
                        maxHeight: isOpen ? `${h}px` : "0px",
                    }}
                >
                    <div ref={innerRef} className="icare-accContentInner">
                        {children}
                    </div>
                </div>
            </div>
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
                    "Poppins, system-ui, -apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
            }}
        >
            <style>{`
                .icare-accHeader{
                    width:100%;
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    background:transparent;
                    border:none;
                    padding:0;
                    cursor:pointer;
                    text-align:left;
                    color:#0F172A;
                }

                .icare-accTitle{
                    margin:0;
                    font-size:1.2rem;
                    font-weight:500;
                    color:#0F172A;
                    padding-right:1rem;
                    line-height:1.25;
                }

                /* PLUS — smaller, thin 1px */
                .icare-plus{
                    width:24px;
                    height:24px;
                    position:relative;
                    flex:0 0 auto;
                    transform:rotate(0deg);
                    transition:transform 260ms cubic-bezier(.2,.8,.2,1);
                    will-change:transform;
                }
                .icare-plus::before,
                .icare-plus::after{
                    content:"";
                    position:absolute;
                    left:50%;
                    top:50%;
                    background:#000;
                    transform:translate(-50%,-50%);
                }
                .icare-plus::before{ width:18px; height:1px; }
                .icare-plus::after{ width:1px; height:18px; }
                .icare-plus.is-open{ transform:rotate(45deg); }

                /* CONTENT — reliable animation */
                .icare-accContent{
                    overflow:hidden;
                    opacity:0;
                    transform:translateY(-4px);
                    transition:
                        max-height 360ms cubic-bezier(.2,.8,.2,1),
                        opacity 220ms ease,
                        transform 220ms ease;
                    will-change:max-height, opacity, transform;
                }
                .icare-accContent.is-open{
                    opacity:1;
                    transform:translateY(0px);
                }

                .icare-accContentInner{
                    padding-top:.35rem;
                }

                /* UWAGA: usuń to, jeśli masz włączone Reduce Motion i chcesz animacje */
                /* @media (prefers-reduced-motion: reduce){
                    .icare-plus, .icare-accContent{ transition:none !important; }
                } */
            `}</style>

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
                    <div>
                        <img
                            src="images/web/icare-for-caregivers/how-icare-supports-caregivers.webp"
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

                    <div
                        style={{
                            background: "rgba(255, 255, 255, 0.7)",
                            padding: "2rem 2.5rem",
                            borderRadius: "22px",
                        }}
                    >
                        <AccordionItem index={0} title="Find care work without agency control">
                            <p style={pStyle}>
                                ICare is not an agency. We don’t assign shifts, manage rotas or tell
                                you where to work.
                            </p>
                            <p style={pStyle}>
                                You decide your availability, who you work with, and whether an
                                arrangement feels right.
                            </p>
                        </AccordionItem>

                        <div style={separator} />

                        <AccordionItem index={1} title="Choose the work that fits you">
                            <p style={pStyle}>
                                This is your practice. You choose the type of companionship you want
                                to provide and the pace you work at — without pressure to rush or take
                                unsuitable roles.
                            </p>
                        </AccordionItem>

                        <div style={separator} />

                        <AccordionItem index={2} title="Work directly with families">
                            <p style={pStyle}>
                                You speak directly with families and build real relationships.
                            </p>
                            <p style={pStyle}>
                                No intermediaries. No 15-minute visits. Care is about people, not
                                ticking boxes.
                            </p>
                        </AccordionItem>

                        <div style={separator} />

                        <AccordionItem index={3} title="Agree details upfront">
                            <p style={pStyle}>
                                Care details, schedules and expectations are discussed openly from the
                                start, so everyone knows where they stand before work begins.
                            </p>
                        </AccordionItem>

                        <div style={separator} />

                        <AccordionItem index={4} title="Stay flexible over time">
                            <p style={pStyle}>Needs change - and so can arrangements.</p>
                            <p style={pStyle}>
                                ICare is designed to support flexibility without disruption or
                                unnecessary stress.
                            </p>
                        </AccordionItem>

                        <div style={separator} />

                        <AccordionItem index={5} title="Support for safe, professional care">
                            <p style={pStyle}>Caregiving is skilled, meaningful work.</p>
                            <p style={pStyle}>
                                ICare is built on respect for caregivers as professionals, with clear
                                standards and fair expectations.
                            </p>
                        </AccordionItem>
                    </div>
                </div>
            </div>
        </section>
    );
}
