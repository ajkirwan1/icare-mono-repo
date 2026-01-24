import React from "react";
import Accordion from "../../../../components/website/common/accordian/accordian";

export default function CaregiverFAQ() {
    const faqs = [
        {
            q: "How does ICare work for caregivers?",
            a: "ICare is a platform that connects independent caregivers directly with families looking for care. You create a profile, set your availability and rates, and families can message you to discuss support — without an agency middleman.",
        },
        {
            q: "Do I have to pay to join ICare?",
            a: "No. Creating your profile is free. If there is a platform fee, it is shown clearly and agreed upfront — so you always know what you keep from your earnings.",
        },
        {
            q: "Can I choose the hours I work?",
            a: "Yes. You decide your hours, days, and the type of care you offer. You can accept or decline enquiries based on what fits your life.",
        },
        {
            q: "What do I need to join (DBS, insurance, Right to Work)?",
            a: "Requirements depend on the type of care you provide. Typically you’ll need Right to Work and ID, and you may add DBS, insurance, training certificates and references to strengthen your profile and build trust with families.",
        },
        {
            q: "How do families find and contact me?",
            a: "Families view caregiver profiles (experience, skills, availability) and contact you directly through secure messaging on ICare to discuss needs, rates and schedules.",
        },
        {
            q: "How does ICare help protect caregivers?",
            a: "ICare provides tools and guidance to support safer, more professional work — secure messaging, clear agreements and expectations, and practical safeguarding and boundary guidance.",
        },
        {
            q: "What if a client isn’t the right fit?",
            a: "Care arrangements are agreed directly between you and the family. If something needs to change, you can clarify expectations, adjust the arrangement, or agree next steps together — with ICare guidance and support resources available where needed.",
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
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    paddingBottom: "clamp(1.6rem, 2.6vw, 2.2rem)",
                    margin: 0,
                }}
            >
                Frequently asked questions
            </h2>

            {/* GLOBAL OVERRIDES — identycznie jak w ReceiversFAQ */}
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
