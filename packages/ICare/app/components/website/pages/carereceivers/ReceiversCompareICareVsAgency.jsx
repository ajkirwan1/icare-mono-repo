import React from "react";
import { Link } from "react-router";
import styles from "./receivers-three-steps.module.scss";

export default function ReceiversThreeStepsStyledLikeHowWeWork() {
    const steps = [
        {
            step: 1,
            title: "Browse or get matched to vetted caregivers",
            description:
                "Review profiles with key details upfront — experience, availability, documents and checks shown clearly.",
            img: "images/web/icare-for-carereceivers/browsing.png",
            alt: "Browsing caregiver profiles",
        },
        {
            step: 2,
            title: "Message privately in one place",
            description:
                "Ask questions, request references, and understand fit before you commit — without intermediaries.",
            img: "images/web/icare-for-carereceivers/privately.png",
            alt: "Messaging and discussing care",
        },
        {
            step: 3,
            title: "Agree the plan upfront",
            description:
                "Confirm tasks, schedule and rate before care starts — with clear terms and transparent pricing (no hidden fees).",
            img: "images/web/icare-for-carereceivers/agreed.png",
            alt: "Agreeing a plan and schedule",
        },
    ];

    return (
        <section
            id="receivers-3-steps"
            aria-label="Arrange home care with structure and safeguards"
            style={{
                width: "100%",
                background: "#fff9ef",
                padding: "4rem 0",
                fontFamily:
                    "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <div style={{ width: "min(1100px, 92vw)", margin: "0 auto" }}>
                {/* HEADING BLOCK */}
                <div style={{ maxWidth: "720px", marginBottom: "3.6rem" }}>
                    {/* ✅ SCSS controls weight/size */}
                    <h2 className={styles.title}>
                        Find care with agency level safeguards without agency control
                    </h2>

                    {/* ✅ SCSS controls spacing, font-size, font-weight */}
                    <p className={styles.subtitle}>
                        <span style={{ display: "block", marginBottom: "0.4rem" }}>
                            <strong style={{ fontWeight: 500, fontSize: "1.6rem" }}>
                                Browse yourself or get matched.
                            </strong>
                        </span>

                        <span style={{ display: "block", fontSize: "1.4rem" }}>
                            Choose to browse yourself or get matched - then arrange care directly with{" "}
                            <strong style={{ fontWeight: 600 }}>clear information</strong>, <strong style={{ fontWeight: 600 }}>structured agreements</strong> and{" "}
                            <strong style={{ fontWeight: 600 }}>support built around safety.</strong>
                        </span>
                    </p>
                </div>

                {/* STEPS GRID (layout jak u Ciebie) */}
                <div
                    style={{
                        display: "grid",
                        gap: "clamp(34px,3vw,50px)",
                        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    }}
                >
                    {steps.map((s) => (
                        <div
                            key={s.step}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                height: "100%",
                            }}
                        >
                            <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
                                {/* ✅ SCSS class for title weight/size */}
                                <h3 className={styles.stepTitle} style={{ margin: 0, color: "#0f172a" }}>
                                    <span style={{ marginRight: "10px" }}>{s.step}.</span>
                                    {s.title}
                                </h3>

                                {/* ✅ SCSS class for desc */}
                                <p className={styles.stepDesc} style={{ margin: 0, color: "#000000ff" }}>
                                    {s.description}
                                </p>
                            </div>

                            {/* IMAGE */}
                            <div style={{ marginTop: "1.6rem", width: "100%", display: "flex", justifyContent: "center" }}>
                                <div
                                    style={{
                                        width: "100%",
                                        height: "240px",
                                        borderRadius: "16px",
                                        overflow: "hidden",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                        background: "#f3f4f6",
                                    }}
                                >
                                    <img
                                        src={s.img}
                                        alt={s.alt}
                                        loading="lazy"
                                        referrerPolicy="no-referrer"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            display: "block",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div
                    className={styles.ctaRow}
                    style={{
                        marginTop: "3.6rem",
                        display: "flex",
                        gap: "14px",
                        flexWrap: "wrap",
                        alignItems: "center",
                    }}
                >
                    <Link to="/signup" className={styles.primaryBtn}>
                        Create your free account
                    </Link>

                    <Link to="/caregivers" className={styles.secondaryBtn}>
                        Browse caregivers
                    </Link>
                </div>

                {/* reassurance */}
                <p
                    style={{
                        marginTop: "2rem",
                        fontSize: "1.2rem",
                        lineHeight: 1.55,
                        maxWidth: "70ch",
                    }}
                >
                    Need support?
                    <br />
                    ICare can guide the process and help you adjust or change a match - without agency pressure.
                </p>
            </div>
        </section>
    );
}
