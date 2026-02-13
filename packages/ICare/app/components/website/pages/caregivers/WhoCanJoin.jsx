import React from "react";
import styles from "./who-can-join.module.scss";

export default function WhoCanJoin() {
    const [openIndex, setOpenIndex] = React.useState(0);

    function AccordionHeader({ index, title, isOpen, onClick }) {
        const headerId = `acc-header-${index}`;
        const panelId = `acc-panel-${index}`;

        return (
            <h3 className={styles.accTitle}>
                <button
                    type="button"
                    id={headerId}
                    onClick={onClick}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className={styles.accHeader}
                >
                    {title}
                    <span
                        aria-hidden="true"
                        className={`${styles.plus} ${isOpen ? styles.open : ""}`}
                    />
                </button>
            </h3>
        );
    }

    function AccordionItem({ index, title, children }) {
        const isOpen = openIndex === index;
        const innerRef = React.useRef(null);
        const [h, setH] = React.useState(0);
        const headerId = `acc-header-${index}`;
        const panelId = `acc-panel-${index}`;

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
                    index={index}
                    title={title}
                    isOpen={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                />

                <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headerId}
                    hidden={!isOpen}
                    className={`${styles.accContent} ${isOpen ? styles.open : ""}`}
                    style={{ maxHeight: isOpen ? `${h}px` : "0px" }}
                >
                    <div ref={innerRef} className={styles.accInner}>
                        {children}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section
            aria-labelledby="who-can-join-heading"
            className={styles.section}
        >
            <div className={styles.container}>
                <h2 id="who-can-join-heading" className={styles.h2}>How ICare supports caregivers</h2>

                <div className={styles.grid}>
                    {/* IMAGE */}
                    <div>
                        <img
                            src="images/web/icare-for-caregivers/how-icare-supports-caregivers.webp"
                            alt="Caregiver providing home care support"
                            className={styles.image}
                        />
                    </div>

                    {/* ACCORDION */}
                    <div className={styles.panel}>
                        <AccordionItem index={0} title="Find care work without agency control">
                            <p className={styles.p}>
                                ICare is not an agency. We don’t assign shifts, manage rotas or tell
                                you where to work.
                            </p>
                            <p className={styles.p}>
                                You decide your availability, who you work with, and whether an
                                arrangement feels right.
                            </p>
                        </AccordionItem>

                        <div className={styles.separator} />

                        <AccordionItem index={1} title="Choose the work that fits you">
                            <p className={styles.p}>
                                This is your practice. You choose the type of companionship you want
                                to provide and the pace you work at — without pressure to rush or take
                                unsuitable roles.
                            </p>
                        </AccordionItem>

                        <div className={styles.separator} />

                        <AccordionItem index={2} title="Work directly with families">
                            <p className={styles.p}>
                                You speak directly with families and build real relationships.
                            </p>
                            <p className={styles.p}>
                                No intermediaries. No 15-minute visits. Care is about people, not
                                ticking boxes.
                            </p>
                        </AccordionItem>

                        <div className={styles.separator} />

                        <AccordionItem index={3} title="Agree details upfront">
                            <p className={styles.p}>
                                Care details, schedules and expectations are discussed openly from the
                                start, so everyone knows where they stand before work begins.
                            </p>
                        </AccordionItem>

                        <div className={styles.separator} />

                        <AccordionItem index={4} title="Stay flexible over time">
                            <p className={styles.p}>Needs change - and so can arrangements.</p>
                            <p className={styles.p}>
                                ICare is designed to support flexibility without disruption or
                                unnecessary stress.
                            </p>
                        </AccordionItem>

                        <div className={styles.separator} />

                        <AccordionItem index={5} title="Support for safe, professional care">
                            <p className={styles.p}>Caregiving is skilled, meaningful work.</p>
                            <p className={styles.p}>
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
