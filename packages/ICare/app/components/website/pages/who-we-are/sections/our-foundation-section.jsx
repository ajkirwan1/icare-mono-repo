import React from "react";
import { InfoCard } from "../cards/info-card";
import styles from "../../../../../styles/components/website/pages/who-we-are/sections/first-section.module.scss";

export function OurFoundationSection() {
    const TEXT = "#0F172A";

    return (
        <section
            id="foundation"
            aria-label="Our foundation and mission"
            style={{
                width: "100vw",
                marginLeft: "calc(50% - 50vw)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                fontFamily:
                    "Nunito, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                color: TEXT, // ✅ default for whole section
            }}
        >
            {/* ================= LEFT — OUR FOUNDATION ================= */}
            <div
                style={{
                    background: "#f1e2c9",
                    padding: "4rem",
                    display: "flex",
                    justifyContent: "flex-end",
                    color: TEXT, // ✅
                }}
            >
                <div style={{ maxWidth: "500px", color: TEXT }}>
                    <h2
                        style={{
                            fontSize: "2.8rem",
                            fontWeight: 500,
                            lineHeight: 1.22,
                            letterSpacing: "-0.3px",
                            marginBottom: "1.4rem",
                            color: TEXT, // ✅
                        }}
                    >
                        Our foundation
                    </h2>

                    <p
                        style={{
                            fontSize: "1.22rem",
                            lineHeight: 1.65,
                            marginBottom: "1.8rem",
                            color: TEXT, // ✅
                            fontWeight: 400,
                        }}
                    >
                        Care often begins with a simple intention - helping someone stay safe and comfortable at home.

                    </p>
                    <p
                        style={{
                            fontSize: "1.22rem",
                            lineHeight: 1.65,
                            marginBottom: "1.8rem",
                            color: TEXT, // ✅
                            fontWeight: 400,
                        }}
                    >

                        In practice, families quickly face uncertainty: how to find the right person, how to organise support, and how to know what’s really happening day to day.
                    </p>
                    <p

                        style={{
                            marginTop: "2rem",
                            fontSize: "1.22rem",
                            lineHeight: 1.6,
                            color: TEXT, // ✅
                        }}>


                        ICare was shaped by first-hand experience of live-in care.
                        We saw how difficult it can be to balance trust, responsibility and everyday life — both for families and for caregivers.
                    </p>

                    <p

                        style={{
                            marginTop: "2rem",
                            fontSize: "1.22rem",
                            lineHeight: 1.6,
                            color: TEXT, // ✅
                        }}>


                        That experience led us to build ICare: a platform that brings structure and clarity to care arrangements, while keeping relationships direct and respectful.
                        Caregivers remain independent. Families gain confidence. Expectations stay clear from the start
                    </p>





                </div>
            </div >

            {/* ================= RIGHT — OUR MISSION ================= */}
            < div
                style={{
                    background: "#fff9ef",
                    padding: "4rem",
                    display: "flex",
                    justifyContent: "flex-start",
                    color: TEXT, // ✅
                }
                }
            >
                <div style={{ maxWidth: "500px", color: TEXT }}>
                    <h2
                        style={{
                            fontSize: "2.8rem",
                            fontWeight: 500,
                            lineHeight: 1.22,
                            letterSpacing: "-0.3px",
                            marginBottom: "1.4rem",
                            color: TEXT, // ✅
                        }}
                    >
                        Our mission
                    </h2>

                    <p
                        style={{
                            fontSize: "1.22rem",
                            lineHeight: 1.65,
                            marginBottom: "1.6rem",
                            color: TEXT, // ✅
                        }}
                    >
                        ICare grew from first-hand experience of live-in care across Europe.<br /><br />
                        That experience showed how important clarity, trust and good communication are - for both families and caregivers.
                    </p>

                    <p
                        style={{
                            fontSize: "1.22rem",
                            lineHeight: 1.65,
                            color: TEXT, // ✅
                        }}
                    >
                        Our focus is simple: reduce unnecessary stress, make arrangements clearer, and support care that feels respectful and well-organised from the start.
                        <br /> By keeping communication direct, information secure and costs transparent, we help care begin on steady, confident terms.
                    </p>
                </div>
            </div >
        </section >
    );
}
