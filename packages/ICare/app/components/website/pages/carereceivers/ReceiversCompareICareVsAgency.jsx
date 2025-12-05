import React, { useEffect, useRef } from "react";

import CompareSectionHeader from "./compare/CompareSectionHeader";
import CompareTagList from "./compare/CompareTagList";
import CompareCardGrid from "./compare/CompareCardGrid";
import CompareCard from "./compare/CompareCard";

export default function ReceiversCompareICareVsAgency() {
    const icareRef = useRef(null);
    const agencyRef = useRef(null);

    // ===== Scroll fade-in animation =====
    useEffect(() => {
        const reveal = (el) => {
            if (!el) return;
            const obs = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.style.opacity = 1;
                            entry.target.style.transform = "translateY(0)";
                            obs.disconnect();
                        }
                    });
                },
                { threshold: 0.2 }
            );
            obs.observe(el);
        };

        reveal(icareRef.current);
        reveal(agencyRef.current);
    }, []);

    return (
        <section
            aria-label="ICare vs Agency"
            style={{
                margin: "110px auto",
                width: "min(92vw,1100px)",
                padding: 0,
                background: "transparent",
            }}
        >
            <CompareSectionHeader
                label="ICare vs Agencies"
                title="Why families choose ICare"
                style={{ marginBottom: "3.2rem" }}
            />

            <CompareTagList
                tags={[
                    "Direct agreement",
                    "Transparent pricing",
                    "Secure messaging",
                    "Fair pay for caregivers",
                    "Consistent, familiar care",
                ]}
                style={{ marginBottom: "3rem" }}
            />

            <CompareCardGrid gap="3rem">

                {/* ========================= ICARE CARD ========================= */}
                <div
                    ref={icareRef}
                    style={{
                        background: "#F0FDF4",
                        borderRadius: 26,
                        opacity: 0,
                        transform: "translateY(20px)",
                        transition: "opacity .7s ease, transform .7s ease",

                        /* ==== FIX: equal height ==== */
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        height: "100%",
                    }}
                >
                    <CompareCard
                        title="ICare"
                        icon="check"
                        iconColor="#3a683ac8"
                        iconBg="#ECFDF5"

                        background="#12601214"
                        items={[
                            "Direct agreement with your caregiver",
                            "Transparent 10% service fee",
                            "Secure messaging and digital contracts",
                            "Fair pay for caregivers & lower family cost",
                            "Caregivers keep 90% of their earnings",
                        ]}
                        style={{
                            padding: "48px 40px",
                            lineHeight: 2.2,
                            fontSize: "1.15rem",
                            fontWeight: 600,
                            color: "#2F4F3E",

                            /* ==== FIX: stretches card content to full height ==== */
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    />
                </div>

                {/* ========================= AGENCY CARD ========================= */}
                <div
                    ref={agencyRef}
                    style={{
                        background: "#FAFAFA",
                        borderRadius: 26,
                        boxShadow: "0 6px 14px rgba(0,0,0,0.02)",
                        opacity: 0,
                        transform: "translateY(20px)",
                        transition: "opacity .7s ease, transform .7s ease",

                        /* ==== FIX: equal height ==== */
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        height: "100%",
                    }}
                >
                    <CompareCard
                        title="Traditional agency"
                        icon="dash"
                        iconColor="#CBD5E1"
                        iconBg="#F8FAFC"
                        borderColor="#E2E8F0"
                        background="transparent"
                        items={[
                            "Intermediary in every step",
                            "Recurring fees and markups",
                            "Fragmented communication",
                            "Lower pay for caregivers",
                        ]}
                        style={{
                            padding: "48px 40px",
                            lineHeight: 2.2,
                            fontSize: "1.12rem",
                            color: "#94A3B8",
                            opacity: 0.85,

                            /* ==== FIX: stretches card content to full height ==== */
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    />
                </div>

            </CompareCardGrid>

        </section>
    );
}
