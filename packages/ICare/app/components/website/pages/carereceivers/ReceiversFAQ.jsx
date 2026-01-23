import React from "react";
import Accordion from "../../../../components/website/common/accordian/accordian";

export default function ReceiversFAQ() {
    const faqs = [
        {
            q: "Do I pay anything to register?",
            a: "No. Creating an account and browsing caregiver profiles is free. You only pay a clear service fee if you decide to go ahead with care.",
        },
        {
            q: "How much does care cost?",
            a: "Caregivers set their own rates based on experience and the support required. You see the rate clearly on the profile and confirm the total before starting care.",
        },
        {
            q: "Are caregivers verified?",
            a: "Before profiles are visible, ICare checks key information such as identity and eligibility where applicable. Profiles also show experience and supporting details so you can make an informed choice.",
        },
        {
            q: "How do I know if a caregiver is the right fit?",
            a: "You can message caregivers privately, ask about routines and expectations, and arrange a call before agreeing anything. Many families speak to more than one caregiver before deciding.",
        },
        {
            q: "What happens if it’s not working out?",
            a: "Care arrangements are agreed directly with the caregiver. If it’s not the right fit, you can give notice under your agreed terms and look for a different caregiver on ICare.",
        },
        {
            q: "Does ICare manage the care or employ caregivers?",
            a: "No. ICare is a marketplace, not a care agency. Caregivers work independently, and families and caregivers agree care arrangements directly.",
        },
        {
            q: "Is support available if I need help?",
            a: "Yes. ICare provides guidance throughout the process and can help you understand next steps if you need to change or adjust a care arrangement.",
        },
    ];

    return (
        <section
            aria-label="FAQ"
            style={{
                maxWidth: "920px",
                margin: "0 auto",
                padding: "clamp(3.6rem, 5vw, 5.6rem) 1.2rem",
            }}
        >
            <h2
                style={{
                    fontSize: "clamp(1.9rem, 2.4vw, 2.3rem)",
                    lineHeight: 1.2,
                    fontWeight: 500, // ✅ wymagane
                    letterSpacing: "-0.02em",
                    paddingBottom: "clamp(1.6rem, 2.6vw, 2.2rem)", // ✅ powietrze
                    margin: 0,
                }}
            >
                Frequently asked questions
            </h2>

            {/* GLOBAL OVERRIDES — działają nawet bez SCSS */}
            <style>{`
        /* FAQ accordion boxes */
        .accordion-item,
        [class*="accordion"] {
          box-shadow: none !important;
          transform: none !important;
          transition: none !important;
        }

        .accordion-item:hover,
        [class*="accordion"]:hover {
          box-shadow: none !important;
          transform: none !important;
        }

        /* Padding inside FAQ boxes */
        .accordion-header,
        .accordion-title {
          padding: 1.4rem 1.5rem !important;
          font-weight: 500;
        }

        .accordion-content,
        .accordion-body {
          padding: 0.8rem 1.5rem 1.4rem !important;
          line-height: 1.6;
        }
      `}</style>

            <Accordion items={faqs} />
        </section>
    );
}
